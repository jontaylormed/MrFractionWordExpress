<#
.SYNOPSIS
    Minimal static file server for local testing.

.DESCRIPTION
    The site is designed to run by opening index.html directly, so this
    is only needed for browser-automation testing (and for anyone who
    prefers a real origin). Zero dependencies - uses .NET HttpListener.

.EXAMPLE
    powershell -File tools/serve.ps1
    powershell -File tools/serve.ps1 -Port 8081
#>

[CmdletBinding()]
param(
    [int]$Port = 8080,
    [string]$Root
)

# $PSScriptRoot is empty under some invocation paths (e.g. -File with a
# relative path from a non-PowerShell shell), so fall back rather than
# failing with an opaque Join-Path error.
if (-not $Root) {
    $here = $PSScriptRoot
    if (-not $here) { $here = Split-Path -Parent $MyInvocation.MyCommand.Definition }
    if (-not $here) { $here = (Get-Location).Path }
    $Root = (Resolve-Path (Join-Path $here '..')).Path
}

# Normalise to a canonical Windows path. The containment check below compares
# $Root against a Resolve-Path result (backslashes); a forward-slash $Root
# passed on the command line would fail that compare and 404 every request.
$Root = (Resolve-Path -LiteralPath $Root).Path.TrimEnd('\')

$ErrorActionPreference = 'Stop'

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.svg'  = 'image/svg+xml'
    '.md'   = 'text/plain; charset=utf-8'
    '.ico'  = 'image/x-icon'
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try { $listener.Start() }
catch { Write-Host "Could not bind $prefix - is something already using port $Port?" -ForegroundColor Red; exit 1 }

Write-Host "Serving $Root" -ForegroundColor Cyan
Write-Host "  $prefix" -ForegroundColor Green
Write-Host "Ctrl+C to stop." -ForegroundColor DarkGray

# A HEAD request must carry the headers and NO body. Writing one anyway throws
# "Bytes to be written to the stream exceed the Content-Length bytes size
# specified" — and because the write sat outside any try/catch, that exception
# unwound the whole loop and TOOK THE SERVER DOWN. One HEAD request from a link
# checker killed it twice while verifying the art paths for deployment, and the
# symptom was every subsequent asset reporting FAILED, which reads exactly like
# ten missing files. The instrument destroyed the subject and then blamed it.
try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        # One bad request must never end the session. Everything inside is
        # per-request now, so a malformed URL or an odd verb returns an error
        # to that caller and the server carries on serving everyone else.
        try {
            $isHead = $ctx.Request.HttpMethod -eq 'HEAD'
            $path = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
            if ($path -eq '/') { $path = '/index.html' }

            $full = Join-Path $Root ($path.TrimStart('/') -replace '/', '\')

            # Keep requests inside the served root.
            $resolved = $null
            try { $resolved = (Resolve-Path -LiteralPath $full -ErrorAction Stop).Path } catch { }

            if ($resolved -and $resolved.StartsWith($Root, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $resolved -PathType Leaf)) {
                $ext = [System.IO.Path]::GetExtension($resolved).ToLower()
                $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
                $bytes = [System.IO.File]::ReadAllBytes($resolved)
                $ctx.Response.StatusCode = 200
                $ctx.Response.ContentLength64 = $bytes.Length
                if (-not $isHead) { $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length) }
                Write-Host ("{0} {1} {2}" -f $ctx.Request.HttpMethod, 200, $path) -ForegroundColor DarkGray
            } else {
                $body = [System.Text.Encoding]::UTF8.GetBytes("404 - $path")
                $ctx.Response.StatusCode = 404
                $ctx.Response.ContentType = 'text/plain; charset=utf-8'
                $ctx.Response.ContentLength64 = $body.Length
                if (-not $isHead) { $ctx.Response.OutputStream.Write($body, 0, $body.Length) }
                Write-Host ("{0} {1} {2}" -f $ctx.Request.HttpMethod, 404, $path) -ForegroundColor Yellow
            }
        } catch {
            Write-Host ("500 {0}" -f $_.Exception.Message) -ForegroundColor Red
            try { $ctx.Response.StatusCode = 500 } catch { }
        }
        try { $ctx.Response.OutputStream.Close() } catch { }
    }
}
finally {
    $listener.Stop()
    $listener.Close()
}
