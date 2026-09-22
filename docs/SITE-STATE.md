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
| **Rendered screens** | **1,576** (`SWEEP.render()`) |
| **Validation** | 37 problems, **0 errors**, 28 warnings — the warnings are the long-standing `segmentValue is not a value the problem gives` set and are expected |
| **Lines** | Five schemas — Part–Whole Loop, Ratio & Rate Rail, The Change Line, The Compare Line, Equal Groups Express — plus **Crossover Island** |
| **Special routes** | The Grand Tour (mixed), The Percent Line (a *surface* across four lines, not a sixth schema), The Challenge Line (crosses to the island) |
| **Learning Hubs** | **5**, including the Lighthouse on the island |
| **Teacher page** | `teachers.html` — 15 learning targets with Bloom's levels. Reached by the **For Teachers** pill, which shows on the home map only, and opens in a new tab |
| **Runtime** | Zero dependencies, no build step, runs from `file://`, no localStorage |

## A student's journey through one station

`read1 → platform → read2 → read3 → ticket → plan → demo → solve → check → critique`

- `read1` and `platform` are the two screens of the first read, and **both are numberless**.
- `demo` is the Test Track, on **24 of the 37**.
- **`critique` is the tenth screen and the newest** (2026-08-17) — see below.
- **The pre-solve chain is written in exactly one place, `Stations.phaseChain`.** The post-solve chain is written in exactly one place, **`Stations.postSolve`**. If prose anywhere disagrees with those two functions, the functions are right.

**On Crossover Island** the Platform Check is replaced by the **Crossover Read**. An **unstaffed halt** (`fadeLevel: "independent"`) runs `read1` and then the Engine Room — no Crossover Read, no second or third read, no Ticket Booth, **no estimate**. Only the hint ladder stays.

## What shipped on 2026-09-22, and is newest

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
- **`HANDOFF.md` §0.0b describes a `.github/workflows/static.yml` that does not exist in this repository.** Whether Pages deploys from a workflow or a branch is unconfirmed.
- ~~**No remote is configured**~~ — **since 2026-09-22 `origin` is `https://github.com/jontaylormed/MrFractionWordExpress`**, the only repository to push to; the old `jtaylor-cloud` one is retired. **Pages is on**: a push to `main` publishes **https://jontaylormed.github.io/MrFractionWordExpress/**, verified against the deployed origin 2026-09-22.
- **`docs/cycle-30/` is 3.4MB** of screenshots and would ship with any full upload.
- **No real student has used any of it.** Every review cycle ends on this sentence and none has yet been able to delete it.
