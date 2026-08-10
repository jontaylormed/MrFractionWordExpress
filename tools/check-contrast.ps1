<#
.SYNOPSIS
    WCAG 2.1 contrast ratio checker for the Mr Fraction design tokens.

.DESCRIPTION
    Zero-dependency (Windows PowerShell 5.1+, no Node, no modules).
    Computes WCAG relative luminance and contrast ratios for every
    foreground/background pairing the design system actually uses, and
    writes docs/contrast-report.md.

    Palette derived from Mr. Fraction's Factory so the two sites read as
    one family. Run this after ANY change to a colour token — Oversight
    will not sign off on a token change without a regenerated report.

.EXAMPLE
    powershell -File tools/check-contrast.ps1
#>

[CmdletBinding()]
param(
    [string]$OutFile = (Join-Path $PSScriptRoot '..\docs\contrast-report.md')
)

# ---------- WCAG math ----------

function Get-Channel {
    param([double]$Value)   # 0..1
    if ($Value -le 0.03928) { return $Value / 12.92 }
    return [Math]::Pow((($Value + 0.055) / 1.055), 2.4)
}

function Get-Luminance {
    param([string]$Hex)
    $h = $Hex.TrimStart('#')
    if ($h.Length -ne 6) { throw "Bad hex: $Hex" }
    $r = Get-Channel ([Convert]::ToInt32($h.Substring(0,2),16) / 255)
    $g = Get-Channel ([Convert]::ToInt32($h.Substring(2,2),16) / 255)
    $b = Get-Channel ([Convert]::ToInt32($h.Substring(4,2),16) / 255)
    return (0.2126 * $r) + (0.7152 * $g) + (0.0722 * $b)
}

function Get-ContrastRatio {
    param([string]$Fg, [string]$Bg)
    $l1 = Get-Luminance $Fg
    $l2 = Get-Luminance $Bg
    if ($l2 -gt $l1) { $t = $l1; $l1 = $l2; $l2 = $t }
    return ($l1 + 0.05) / ($l2 + 0.05)
}

# ---------- Tokens ----------

$Tokens = [ordered]@{
    # surfaces
    'cream'          = '#F5EDE0'
    'cream-light'    = '#FDF8F0'
    'cream-mid'      = '#EDE0CC'
    'brown-dark'     = '#2C2214'   # dark chrome: sign, ticker, night platform
    # ink
    'brown-ink'      = '#2C2214'
    'brown-mid'      = '#5A3E28'
    'brown-muted'    = '#6B5138'   # darkened from reference #7A5C3E - see report
    'ink-on-dark'    = '#F3EDE1'
    # brand + status
    'orange'         = '#C96A1F'   # reference accent - large text, rules, fills
    'orange-deep'    = '#A85413'   # small text on cream + button fills
    'orange-light'   = '#E8843A'   # accent ON dark chrome (reference token)
    'teal'           = '#2B7166'   # reference #2E7A6E darkened to clear AA
    'green'          = '#45742B'   # reference #4A7C2F darkened to clear AA
    'blue'           = '#2A5FA0'
    'red-deep'       = '#A32E22'
    'border'         = '#C8B89A'   # DECORATIVE edges only - see note in report
    'border-strong'  = '#8F7F63'   # edges of interactive controls (WCAG 1.4.11)
    # lines
    'line-change'    = '#45742B'
    'line-compare'   = '#2A5FA0'
    'line-groups'    = '#A85413'
    'line-ratio'     = '#2B7166'
    'line-partwhole' = '#A32E22'
}

# 'text' -> 4.5:1 | 'large' -> 3.0:1 (>=24px or >=19px bold) | 'ui' -> 3.0:1
$Pairs = @(
    @{ Fg='brown-ink';      Bg='cream';       Need='text';  Use='Body text on page' }
    @{ Fg='brown-ink';      Bg='cream-light'; Need='text';  Use='Body text on card' }
    @{ Fg='brown-ink';      Bg='cream-mid';   Need='text';  Use='PROBLEM TEXT on sunken well' }
    @{ Fg='brown-mid';      Bg='cream';       Need='text';  Use='Secondary text' }
    @{ Fg='brown-mid';      Bg='cream-light'; Need='text';  Use='Secondary text on card' }
    @{ Fg='brown-muted';    Bg='cream';       Need='text';  Use='Muted / hint text' }
    @{ Fg='brown-muted';    Bg='cream-light'; Need='text';  Use='Muted text on card' }
    @{ Fg='ink-on-dark';    Bg='brown-dark';  Need='text';  Use='Station sign + ticker text' }
    @{ Fg='border-strong';  Bg='cream';       Need='ui';    Use='CONTROL borders (inputs, buttons)' }
    @{ Fg='border-strong';  Bg='cream-light'; Need='ui';    Use='Control borders on card' }

    @{ Fg='orange';         Bg='cream';       Need='large'; Use='Orange display headings (LARGE)' }
    @{ Fg='orange';         Bg='cream';       Need='ui';    Use='Orange rules, dots, markers' }
    @{ Fg='orange-deep';    Bg='cream';       Need='text';  Use='Orange eyebrow label (SMALL TEXT)' }
    @{ Fg='orange-deep';    Bg='cream-light'; Need='text';  Use='Orange eyebrow on card' }
    @{ Fg='cream-light';    Bg='orange-deep'; Need='text';  Use='Text on orange button fill' }
    @{ Fg='orange-light';   Bg='brown-dark';  Need='text';  Use='Orange accent on dark chrome' }
    @{ Fg='orange-light';   Bg='brown-dark';  Need='ui';    Use='Ticker dots on dark chrome' }

    @{ Fg='teal';           Bg='cream';       Need='text';  Use='Teal text' }
    @{ Fg='green';          Bg='cream';       Need='text';  Use='Success / go text' }
    @{ Fg='blue';           Bg='cream';       Need='text';  Use='Info / hint text' }
    @{ Fg='blue';           Bg='cream';       Need='ui';    Use='FOCUS RING on page' }
    @{ Fg='blue';           Bg='cream-light'; Need='ui';    Use='Focus ring on card' }
    @{ Fg='red-deep';       Bg='cream';       Need='text';  Use='Error text' }
    @{ Fg='red-deep';       Bg='cream-light'; Need='text';  Use='Error text on card' }

    @{ Fg='line-change';    Bg='cream';       Need='text';  Use='Change Line label' }
    @{ Fg='line-compare';   Bg='cream';       Need='text';  Use='Compare Line label' }
    @{ Fg='line-groups';    Bg='cream';       Need='text';  Use='Equal Groups label' }
    @{ Fg='line-ratio';     Bg='cream';       Need='text';  Use='Ratio & Rate label' }
    @{ Fg='line-partwhole'; Bg='cream';       Need='text';  Use='Part-Whole label' }
    @{ Fg='line-change';    Bg='cream-light'; Need='ui';    Use='Change Line marker on card' }
    @{ Fg='line-compare';   Bg='cream-light'; Need='ui';    Use='Compare Line marker on card' }
    @{ Fg='line-groups';    Bg='cream-light'; Need='ui';    Use='Equal Groups marker on card' }
    @{ Fg='line-ratio';     Bg='cream-light'; Need='ui';    Use='Ratio & Rate marker on card' }
    @{ Fg='line-partwhole'; Bg='cream-light'; Need='ui';    Use='Part-Whole marker on card' }
    @{ Fg='cream-light';    Bg='line-change';    Need='text'; Use='Text on Change fill' }
    @{ Fg='cream-light';    Bg='line-compare';   Need='text'; Use='Text on Compare fill' }
    @{ Fg='cream-light';    Bg='line-groups';    Need='text'; Use='Text on Equal Groups fill' }
    @{ Fg='cream-light';    Bg='line-ratio';     Need='text'; Use='Text on Ratio fill' }
    @{ Fg='cream-light';    Bg='line-partwhole'; Need='text'; Use='Text on Part-Whole fill' }
)

$Thresholds = @{ text = 4.5; large = 3.0; ui = 3.0 }

# ---------- Evaluate ----------

$results = foreach ($p in $Pairs) {
    $fgHex = $Tokens[$p.Fg]
    $bgHex = $Tokens[$p.Bg]
    $ratio = Get-ContrastRatio $fgHex $bgHex
    $need  = $Thresholds[$p.Need]
    [pscustomobject]@{
        Use = $p.Use; Fg = $p.Fg; FgHex = $fgHex; Bg = $p.Bg; BgHex = $bgHex
        Ratio = [Math]::Round($ratio, 2); Need = $need; Level = $p.Need
        Pass = ($ratio -ge $need)
    }
}

$failures = @($results | Where-Object { -not $_.Pass })

foreach ($r in $results) {
    $mark = if ($r.Pass) { 'PASS' } else { 'FAIL' }
    $line = '{0,-4} {1,6}:1 (need {2}:1)  {3}' -f $mark, $r.Ratio, $r.Need, $r.Use
    if ($r.Pass) { Write-Host $line -ForegroundColor Green } else { Write-Host $line -ForegroundColor Red }
}
Write-Host ''
Write-Host ("{0} pairs checked, {1} failing." -f $results.Count, $failures.Count)

# ---------- Report ----------

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('# Contrast Report')
[void]$sb.AppendLine('### Mr Fraction''s Word Problem Express')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('> Generated by `tools/check-contrast.ps1`. Do not edit by hand.')
[void]$sb.AppendLine('> Palette derived from Mr. Fraction''s Factory. Regenerate after any colour token change.')
[void]$sb.AppendLine('')
[void]$sb.AppendLine(('**Generated:** {0}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm')))
[void]$sb.AppendLine(('**Pairs checked:** {0} · **Failing:** {1}' -f $results.Count, $failures.Count))
[void]$sb.AppendLine('')
[void]$sb.AppendLine('Thresholds — normal text 4.5:1 · large text 3:1 · UI/graphical 3:1 (WCAG 2.1 AA).')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('**Note on borders.** `border` (`#C8B89A`, inherited from the reference site) is used only for')
[void]$sb.AppendLine('*decorative* card edges and rules, and is deliberately not checked: WCAG 1.4.11 covers visual')
[void]$sb.AppendLine('information *required to identify a control or its state*, which a card outline is not. Every edge')
[void]$sb.AppendLine('that does identify a control — input, button, choice tile — uses `border-strong` (`#8F7F63`),')
[void]$sb.AppendLine('which is checked and passes. This is a scoping decision, not an exemption; if a border ever becomes')
[void]$sb.AppendLine('the only thing distinguishing a control, it must move to `border-strong`.')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('| Result | Ratio | Need | Level | Foreground | Background | Usage |')
[void]$sb.AppendLine('|---|---|---|---|---|---|---|')
foreach ($r in $results) {
    $mark = if ($r.Pass) { 'PASS' } else { '**FAIL**' }
    [void]$sb.AppendLine(('| {0} | {1}:1 | {2}:1 | {3} | `{4}` {5} | `{6}` {7} | {8} |' -f `
        $mark, $r.Ratio, $r.Need, $r.Level, $r.Fg, $r.FgHex, $r.Bg, $r.BgHex, $r.Use))
}
[void]$sb.AppendLine('')

if ($failures.Count -gt 0) {
    [void]$sb.AppendLine('## Failing pairs')
    [void]$sb.AppendLine('')
    foreach ($f in $failures) {
        [void]$sb.AppendLine(('- **{0}** — `{1}` on `{2}` = {3}:1, needs {4}:1' -f $f.Use, $f.Fg, $f.Bg, $f.Ratio, $f.Need))
    }
    [void]$sb.AppendLine('')
}

$dir = Split-Path -Parent $OutFile
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
$sb.ToString() | Out-File -FilePath $OutFile -Encoding utf8
Write-Host ("Report written to {0}" -f (Resolve-Path $OutFile)) -ForegroundColor Cyan

if ($failures.Count -gt 0) { exit 1 }
exit 0
