# What the site is, right now
### The single place any brief, agent or session reads to find out what exists

**Last verified 2026-08-17** by `MF.validate()` and `SWEEP.report()` against a served copy of this tree.

---

## Why this file exists, and why nothing else may restate it

**On 2026-08-16 all six agent briefs were grepped for Crossover Island and the estimate gate and returned zero hits in every one.** Six reviewers briefed on a site that had not existed for months, whose clean pass would have been indistinguishable from a real one. The briefs were rewritten the same day to describe the current build.

**They were stale again within twenty-four hours** — by the evening of 2026-08-17 not one of them knew about the critique phase or the Engine Room's near-miss handling, both shipped that day.

Editing six documents every time the build moves is not a process, it is a promise nobody can keep. So:

> **The briefs no longer describe the build. They point here.**
> **This is the only document that states what exists. If a fact about the site appears anywhere else — an agent brief, a spec, a comment — it is a copy, and copies drift.**

That is the same rule `Stations.phaseChain` applies to the fade ladder and `Stations.postSolve` applies to the post-solve screens, pointed at documentation instead of code.

---

## The build

| | |
|---|---|
| **Problems** | **37**, four number sets each = **148 materialisations** |
| **Rendered screens** | **1,896** (`SWEEP.render()`) — the fast path's chain, the help tools, the single-line picker (`pickModel-line`), every number set |
| **Layout** | **The cockpit** — merged to `main` 2026-10-18 from branch `cockpit-layout` |
| **Validation** | 37 problems, **0 errors**, 28 warnings — the warnings are the long-standing `segmentValue is not a value the problem gives` set and are expected |
| **Lines** | Five schemas — Part–Whole Loop, Ratio & Rate Rail, The Change Line, The Compare Line, Equal Groups Express — plus **Crossover Island** |
| **Special routes** | The Grand Tour (mixed), The Percent Line (a *surface* across four lines, not a sixth schema), The Challenge Line (crosses to the island) |
| **Learning Hubs** | **5**, including the Lighthouse on the island |
| **Teacher page** | `teachers.html` — 18 learning targets with Bloom's levels (core trip, help tools, island, site-wide). Reached by the **For Teachers** pill, which shows on the home map only, and opens in a new tab |
| **Runtime** | Zero dependencies, no build step, runs from `file://`, no localStorage |

## The screen: one cockpit per station (2026-10-18)

Full spec, history and the Cycle 31 review findings: [`COCKPIT.md`](COCKPIT.md). A station is **one screen whose panels never move**; only their contents change. At 1024px and up:

```
map band, full width · Stop N of M · problem title
[ word problem 70%                    ][ illustration 30%  ]
[ work area (the picture) ][ sketch pad ][ question + answer ]
[                          ][           ][ the lever          ]
[ Mr Fraction docked | FEEDBACK viewport, full width          ]
```

- **One question at a time; the question panel asks, the feedback viewport teaches.** Every verdict, hint, coaching note and Mr Fraction line goes to the bottom. Instructions (`.hint-text`, `.platform-instruction`, `.ck-teach`, `.est-lead`) become a coaching note there; any other visible `.msg` is moved there by `relocateStray`. Empty, the viewport (and the empty work area) show Mr Fraction's silhouette.
- **The lever** stands in for the step's main button (`syncLever`); spent main buttons are hidden. Inside a tool it reads "Done →".
- **The work area keeps its picture** across steps (marked stale and `inert`) — the bar model drawn at the Plan stays through the Engine Room.
- **One sketch pad per station**, mounted once; notes survive between steps. Pictures scale to their panel (`fitScene`).
- The working row is a set height (`clamp(300px, 44vh, 500px)`); a panel whose content is longer scrolls inside itself. **Under 860px tall** the feedback row and lever are pinned to the bottom of the window (slim, ~90px).
- **Below 1024px (phones, tablets) the page does all the scrolling** (2026-10-20): panels stack as story → picture → question → answer surface (cards / model) → lever → feedback → Mr Fraction → pad; **nothing scrolls inside itself**; feedback and Mr Fraction run full width, one above the other; the **sketch pad starts closed** behind "Open the sketch pad" so it cannot catch scrolling swipes. Measured 320–414px: 48 screens, 0 inner scrollers, 0 sideways scroll. On narrow phones the Compare bars stack (label/value above, bar full width) and stay aligned.

## A student's journey through one station

`read1 → pickModel → platform → plan → demo → solve → check → critique`

- **`read1`** on a single-situation problem: the story with numbers covered, and the lever. Nothing else.
- **`pickModel`**: the picture choice, numberless. **On a single-line ride** (`rideLine === p.line`) it asks *"Which picture shows what is missing?"* with that line's picture and the `?` in each place (`ModelPicker.VARIANTS`, slot from `unknownCar` via `ModelPicker.slotOf`). **Otherwise** (Grand Tour, percent route, no ride) it asks *"Which picture fits this story?"* with the five shapes. Feedback is shape-based and names no line, operation or number. Mr Fraction's retelling arrives with a correct pick. Recorded as `schemaFirstTry` / `schemaAttempts`.
- **`platform`** proves it from the text (tap the sentences); its reveal confirms the line.
- **`plan`** opens with the picture empty: the student taps the numbers it needs (`read2.quantities[].needed`); scenery numbers are turned away; then the model and the estimate appear.
- **Arrivals Board** (`check`) runs its checks one at a time; each check's explanation goes to the feedback viewport; the caboose sits in the picture panel.
- **Numberless screens:** `Stations.NUMBERLESS` = read1, platform, crossover, pickModel, checklist (a tool opened after the numbers are out stops masking).
- **Help tools** (`Stations.TOOLS`, offered per problem by `Stations.toolsFor`) under "Help me see it" on pickModel and plan, returning to where they were opened: **Run the checklist**, **Sort the numbers** (read2), **Find the question** (read3), **Find the missing piece** (ticket). `offerTool()` highlights one after repeated misses — never opens it. Recorded in `toolsUsed`; the trip report names them.
- `demo` is the Test Track, on **24 of the 37**.
- **The pre-solve chain is written in exactly one place, `Stations.phaseChain`.** The post-solve chain is written in exactly one place, **`Stations.postSolve`**. If prose anywhere disagrees with those two functions, the functions are right.

**On Crossover Island**: a **staffed stop** runs `read1` (story only) → **Crossover Read** (tap the seam, then pick the picture for each half, one stage at a time) → `plan`; its only tool is the checklist. An **unstaffed halt** (`fadeLevel: "independent"`) keeps the five checklist questions, one at a time, then goes to the Engine Room — **no estimate**, no tools. Only the hint ladder stays.

## What shipped on 2026-10-18, and is newest

- **The cockpit and the fast path** (above). Built in response to three teachers' review — too much reading, scrolling between story and questions, too many questions before the picture — and the user's sketch.
- **Cycle 31** (teacher, theme-reviewer, student-tester agents) found 7 blocking-class defects and a set of teaching changes; all mechanical fixes and all five teaching changes (a)–(e) were made the same day. See `COCKPIT.md`.
- **Instrument fixes in `tools/sweep.js`:** it scans `.ck-body` (it had been scanning only the question panel), reads numberless and pre-solve screens and tools from the station, sweeps the single-line picker, and excludes relocated line boxes by origin. Each was proven with a planted defect.

## What shipped on 2026-09-22

- **A For Teachers page.** `teachers.html`, a static page on the site's own stylesheet: the learning targets in Bloom's terms, notes on reading them, and MP alignment. Content, not machinery — it reads nothing from `MF`, so **it will not notice if a screen is added, renamed or removed.** When the station chain changes, this page is a copy that has to be edited by hand.
- **The pill is shown by observation, not by list.** `app.js` watches `#view` and shows `#btn-teachers` whenever `.home-hero` is in it, so no renderer has to remember to hide it.
- **Its label sheds words with width** (*For Teachers* → *Teachers* → icon, at 720 and 500px), and at 375–440px the portrait stands aside while it shows. Measured at 55 widths, 320–1440px: header never taller than without the pill, no sideways scroll, pill never under 44px.
- **`index.html#home` skips the loading screen.** An inline script right after the loader removes it before first paint and clears the hash. Only the teacher page links there.

## What shipped on 2026-08-17

- **The critique phase.** After the Arrivals Board the student is shown another passenger's wrong answer and asked which mistake produced it. Derived entirely from each step's existing misconceptions — no authored content — so it covers all 37 problems. Recorded in the trip report as `critiqueFirstTry` / `critiqueAttempts`.
- **The Engine Room tells a near miss from a wrong turn.** `checkAnswer` returns `reason: 'near'` within 10% of the target, and the feedback points at the calculation rather than back at the plan. A named misconception always wins over it.
- **Option positions are balanced by construction**, not drawn. `balancedOrder` assigns the correct option's slot from a dense ordinal over (problem × number set), offset per surface; only distractors are shuffled. Used by read 3, the Ticket Booth and the critique.
- **Right/wrong no longer depends on colour alone** — the glyph hangs off `.choice[data-result]::before` rather than a `.marker` child four builders never emitted.
- **The Engine Room answer box is fully clickable** — `.solve-wrap` now takes the same companion reservation the estimate line already had.

## What is NOT true, and must not be assumed

- **Appearance is unverified.** The in-app browser pane does not composite frames. Nothing shipped on 2026-08-17 has been *looked at*. *(On 2026-09-22 the pane did return one real desktop screenshot of the home map, header included — so it composites at least sometimes. The phone widths of the new header were measured, not seen.)* `tools/zz-drive.js` plus headless Edge is the way to close that — its header carries the two flags that cost an hour each.
- **The trip report's critique line has never rendered** on a real end-of-trip screen.
- ~~`.github/workflows/static.yml` does not exist~~ — **it does now (2026-09-22)**: the user enabled Pages with GitHub's standard static workflow, committed on GitHub as `3e3a94c`. It deploys on every push to `main` and uploads `path: '.'` — **the whole repository, including `docs/`, `tools/` and `.claude/`**, so all of it is publicly served.
- ~~**No remote is configured**~~ — **since 2026-09-22 `origin` is `https://github.com/jontaylormed/MrFractionWordExpress`**, the only repository to push to; the previous one is retired. **Pages is on**: a push to `main` publishes **https://jontaylormed.github.io/MrFractionWordExpress/**, verified against the deployed origin 2026-09-22.
- **`docs/cycle-30/` is 3.4MB** of screenshots and would ship with any full upload.
- **No real student has used any of it.** Every review cycle ends on this sentence and none has yet been able to delete it.
