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
    [string]$OutFile
)

# $PSScriptRoot IS EMPTY UNDER SOME INVOCATION PATHS — notably `-File` with a
# relative path, or when called from a non-PowerShell shell. It was used
# directly in the parameter default, so `Join-Path` got an empty Path and the
# script died before doing anything, with an error naming Join-Path rather than
# the real cause. `serve.ps1` already carries this exact guard and a comment
# explaining it; this file predates that fix and never got it.
if (-not $OutFile) {
    $here = $PSScriptRoot
    if (-not $here) { $here = Split-Path -Parent $MyInvocation.MyCommand.Definition }
    if (-not $here) { $here = (Get-Location).Path }
    $OutFile = Join-Path $here '..\docs\contrast-report.md'
}

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
    # lines — see the note below: these are DISCOVERED from app.css, not listed
}

# ---------- the line colours, READ FROM THE STYLESHEET ----------
#
# TWO DEFECTS IN ONE, BOTH THE PROJECT'S SIGNATURE KIND, AND BOTH FOUND BY THE
# TOOL REPORTING "0 failing" ON A PALETTE IT HAD NEVER SEEN.
#
# 1. The five line colours were hardcoded here as hex COPIES of what app.css
#    declares. An authored duplicate of a derivable fact is drift with a delay
#    on it (VERIFICATION.md §33): change a colour in the CSS and this script
#    goes on cheerfully checking the old one.
# 2. There were exactly five of them, listed by hand. `--line-percent` was added
#    on 2026-08-10 and this script could not see it — while printing "39 pairs
#    checked, 0 failing", which reads as complete coverage rather than as a
#    colour that was never examined. "0 faults" and "0 subjects" print
#    identically; that is now five files and two checkers on this project.
#
# Both go away by asking the stylesheet. Every `--line-*: #hex;` in `:root`
# becomes a swatch, so a sixth line is covered the day it is declared and
# nobody has to remember this file exists.
# NO EM-DASHES INSIDE DOUBLE-QUOTED STRINGS IN THIS FILE. It is UTF-8 with no
# BOM, and PowerShell 5.1 decodes a BOM-less script as ANSI: the em-dash's
# bytes E2 80 94 become three CP1252 characters, the last of which is U+201D,
# a curly closing quote — which PowerShell honours as a string delimiter. The
# string ends early, the rest of the line becomes garbage, and the parser
# reports "Missing closing '}'" pointing at a brace several lines away that is
# perfectly balanced. Comments and single-quoted strings are unaffected, which
# is why the rest of this file has used em-dashes for months without trouble.
# Plain hyphens in double-quoted output.
$CssPath = Join-Path (Split-Path -Parent $OutFile) '..\assets\css\app.css'
if (-not (Test-Path -LiteralPath $CssPath)) {
    Write-Host "Cannot find app.css at $CssPath - the line colours cannot be checked." -ForegroundColor Red
    exit 1
}
$cssText = [System.IO.File]::ReadAllText((Resolve-Path -LiteralPath $CssPath))
$lineTokens = @()
foreach ($m in [regex]::Matches($cssText, '--(?<n>line-[a-z]+)\s*:\s*(?<v>#[0-9A-Fa-f]{6})\s*;')) {
    $n = $m.Groups['n'].Value
    # NB the palette variable is $Tokens, not $Palette. Writing to the wrong
    # name here would have added the colours to nothing and left every
    # generated pair looking up an empty hex.
    if (-not $Tokens.Contains($n)) { $Tokens[$n] = $m.Groups['v'].Value; $lineTokens += $n }
}
if ($lineTokens.Count -eq 0) {
    Write-Host "Read app.css but found no --line-* colours. Refusing to report a clean run on nothing." -ForegroundColor Red
    exit 1
}
Write-Host ("Line colours discovered in app.css: {0}" -f ($lineTokens -join ', ')) -ForegroundColor Cyan

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

    # the per-line pairs are appended below, one set per colour discovered
)

# THREE PAIRS PER LINE COLOUR, GENERATED RATHER THAN TYPED. The same fifteen
# rows were written out by hand for five lines; a sixth line meant remembering
# to add three more, and nobody did when `--line-percent` arrived. Generated
# from whatever the stylesheet declares, the coverage cannot fall behind the
# palette.
#
# `cream-mid` is in here and was not in the hand-written set: the Platform
# Check's "you are here" row puts a line-coloured label on that background.
#
# IT IS 'large', NOT 'text', AND GETTING THAT WRONG INVENTED THREE FAILURES.
# The first version of this pair asked for 4.5:1, and change/groups/ratio came
# back at 4.26/4.09/4.41 - three AA failures that were about to be written up
# as real. Measured on the rendered element instead: that label is 19.7px at
# font-weight 700, which is WCAG large text (>=18.66px bold), so the threshold
# is 3.0:1 and all six clear it comfortably.
#
# The lesson is the project's own and it nearly went the wrong way: a threshold
# is a claim about how something RENDERS, not about what token it uses. Check
# the computed size and weight before choosing one.
foreach ($t in $lineTokens) {
    # THE EXTRA PARENTHESES ARE LOAD-BEARING. Written as
    #   ToTitleCase(($t -replace '^line-','') -replace '-',' ')
    # PowerShell reads the comma inside the method call as an ARGUMENT
    # separator, not as part of the -replace operator, and calls ToTitleCase
    # with two arguments. There is no such overload, it throws, and $label ends
    # up empty - which showed as rows reading " label on the you-are-here row"
    # with no colour named. Wrap the whole expression so it is one argument.
    $bare  = (($t -replace '^line-', '') -replace '-', ' ')
    $label = (Get-Culture).TextInfo.ToTitleCase($bare)
    $Pairs += @{ Fg=$t;           Bg='cream';       Need='text'; Use="$label label" }
    $Pairs += @{ Fg=$t;           Bg='cream-light'; Need='ui';   Use="$label marker on card" }
    $Pairs += @{ Fg=$t;           Bg='cream-mid';   Need='large'; Use="$label label on the you-are-here row (19.7px bold)" }
    $Pairs += @{ Fg='cream-light'; Bg=$t;           Need='text'; Use="Text on $label fill" }
}

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
