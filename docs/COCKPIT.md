# The Cockpit, a one-screen station layout with a fast path

## Context
Three teachers reviewed the site and agreed on two problems: **too much reading and scrolling, and too heavy a cognitive load.** One teacher was specific. Scrolling between the word problem and the multiple-choice questions was hard. There are too many structure questions before the picture. Tapping the needed sentences worked well. And they suggested a faster route to the visual model, perhaps by *choosing between visual models*, with students free to pick which supporting steps they need.

The user's sketch answers the layout half: **fixed panels that never move, whose contents change as the student works.** The user chose:
- **the fast path, with the other steps as optional tools;**
- **laptop/Chromebook landscape** as the target;
- **a separate branch**, so the live site stays untouched until the switch.

Today `Station.render` (`stations.js:650`) builds a header and a `#phase-host` card. Every phase then replaces that whole host with `innerHTML` and re-renders the problem text inside it (`problemHTML`, `stations.js:573`). That is why the page scrolls and the story jumps on every screen.

## The layout (≥1024px wide, fills the window, the page itself never scrolls)
```
┌ top bar (existing header, slimmer) ─────────────────────────────┐
│ map strip ●──●──○──○  Stop 2 of 5 · Name of the word problem    │
├──────────────────────┬──────────────┬──────────────────────────┤
│ WORD PROBLEM         │ ANIMATED     │ QUESTION                 │
│ (fixed; masks, picks │ ILLUSTRATION │ (current prompt)         │
│  and highlights      │ (Scene)      ├──────────────────────────┤
│  change in place)    │              │ ANSWER (choices / input) │
├──────────────────────┴───┬──────────┤                          │
│ WORK AREA                │ TOUCH PAD│   [ LEVER ]  pull = go   │
│ (model, steps, map)      │ (sketch) │                          │
├──────────────────────────┴──────────┴──────────────────────────┤
│ FEEDBACK (one slot: right/wrong, diagnosis, hints, Mr Fraction)│
└─────────────────────────────────────────────────────────────────┘
```
- A panel may scroll inside itself only as a last resort.
- Below 1024px the panels stack in the order problem → question/answer → work → feedback, and a little scrolling is accepted there.
- The touch pad is mounted once and persists for the whole problem, so the student's notes survive between steps. This replaces the two separate pads in Plan and Engine Room.
- Mr Fraction's asides go into the feedback bar instead of a floating bubble. The bubble's overlap with inputs has been a defect three times.

## The fast path (`Stations.phaseChain`, still its single source)
`read1 → platform → pickModel → plan → solve → check → critique`
1. **Read 1:** the masked story with **one** question, what the story is about. Currently there are five cards; the other four are dropped.
2. **Platform Check:** tap the evidence sentences. Kept, because teachers liked it.
3. **Pick the model (new):** five schematic diagrams, one per situation, with no numbers. Choosing one counts as identifying the structure, so §2.4 (recognize the structure before calculating) still holds.
   - A wrong pick gets a named contrast. Reuse the confusion pairs written in `content/hubs/five-situations.js` where they exist.
   - On the Percent route, this replaces the hidden-line question.
4. **Plan:** the problem's real `Model.html` in the work area, with `?` on the unknown, plus the estimate. The estimate sketch pad becomes the shared touch pad.
5. **Solve, check, critique:** logic unchanged; output is moved into the panels.

**Help tools ("Help me see it"),** in the question panel from step 2 on:
- *Sort the numbers* (read2)
- *Find the question* (read3)
- *Find the missing piece* (ticket)

Each opens in the work area and returns to the current step when done. Usage is recorded in metrics and described in the trip report, never scored.

Crossover Island keeps its Crossover Read inside the new layout. Unstaffed halts (`['read1']`) are unchanged.

## Architecture: refactor, not rewrite
- `Station.render` builds the cockpit shell once per station, with named regions: `text, scene, ask, answer, work, pad, feedback, lever`.
- New helpers on `Station.prototype`:
  - `region(name)`, which sets or gets the contents of one panel;
  - `setLever(label, enabled, fn)`;
  - `say(kind, html)`, which wraps the existing `msg()` (`stations.js:2610`) and `A11y.announce`.
- **Problem text** stays mounted. Each phase calls `this.setText({masked, pick, highlightQ})`, which reuses `problemHTML` minus the scene. **The scene** renders once into its own panel via `Scene.html`.
- **Each `ph*` renderer** writes into regions instead of `this.host().innerHTML`. Its per-phase feedback slots (`#r1fb`, `#sfb` …) collapse into the feedback region, and its Next/Check buttons become the lever.
- **The lever** is one control. Its label changes with the step (*Check*, *Next*, *Board the train*). It is drawn in CSS/SVG with a pull animation and a still pose under reduced motion, has a 44px minimum, and works from the keyboard.
- **New `assets/js/model-picker.js`** holds the five schematic SVGs plus `html(p)` and `wire(p, onPick)`. It is loaded before `stations.js`.
- **`tools/sweep.js`** is updated to drive the new chain and the three tools. Its leak scans read regions rather than `host()`.

## Stages (each one committed on branch `cockpit-layout`, and `docs/COCKPIT.md` updated as it goes)
Every stage leaves the branch working, and `docs/COCKPIT.md` holds the spec plus a checklist. That way a new session can resume mid-build if tokens run out.
- **S0:** Create the branch, write `docs/COCKPIT.md` (this plan plus the checklist), and record a baseline (validate 37/0/28; save the sweep output).
- **S1 Shell:** the cockpit grid in `Station.render` and CSS (new section in `app.css`); text, scene and pad mounted persistently. Existing phase output goes into the work area unchanged, as an interim step. **Scrolling is already fixed at this stage.**
- **S2 Regions:** move each phase in chain order onto the regions, the single feedback slot and the lever. Do read1, platform, plan and solve first (most used), then the rest, then crossover.
- **S3 Fast path:** `model-picker.js`, the new `phaseChain`, Read 1 cut to one question, the help tools, and the metrics and report wording.
- **S4 Polish:** lever art and motion, Mr Fraction docked in the feedback bar, the stacked layout below 1024.
- **S5 Finish:**
  - update `tools/sweep.js` and run the full verification;
  - update docs: SITE-STATE, the README screen table, the `teachers.html` targets (3–5 become optional tools, and a new target for "choose a model"), and the CHALLENGE-MODE §4 fade notes;
  - **merge to `main` and push only when the user says so.**

## Critical files
- `assets/js/stations.js` (2630 lines): `render` 650, `problemHTML` 573, `renderPhase` 770, `phaseChain` 420, every `ph*`
- `assets/css/app.css`: new cockpit section; `.problem-pair` 894 and `.journey` 356 are reused
- `assets/js/estimate.js`: `Scratch`/pad 172–187, so the pad can mount outside Estimate
- `assets/js/model-picker.js` (new); `index.html` (one script tag)
- `assets/js/app.js`: `setView` 29 (the page no longer scrolls to the top), `renderReport` 1058
- `tools/sweep.js`, `docs/COCKPIT.md` (new), `docs/SITE-STATE.md`, `teachers.html`, `README.md`

## Verification
- **Every stage:** `MF.validate()` stays at 37 / 0 / 28, and there are no console errors.
- **Layout:** at 1366×768, 1280×720, 1440×900 and 1920×1080, `document.documentElement.scrollHeight <= innerHeight` on every phase of a few problems from each line. The control check: the same measurement on `main`, which must fail. No panel's contents clipped (`scrollHeight > clientHeight`) except by design.
- **Stacked layout:** at 375 and 768px, no horizontal scroll and every target ≥44px.
- **Flow:** ride one problem per line plus a Crossover Island stop end to end on the fast path; open each help tool once; the trip report lists the tools used.
- **`SWEEP.report()` after S5:** zero unfilled tokens, zero render errors, and no new pre-solve leaks; in particular the model picker must show no numbers.
- **Appearance:** screenshots of the main screens go to the user, because appearance is their call.

---

## Progress — update this as each stage lands

Branch: `cockpit-layout`. `main` is the live site and is not touched until the user says merge.

- [x] S0 — branch, this doc
- [x] S1 — shell: cockpit grid, persistent text / scene / pad
- [x] S2 — every phase on regions, one feedback slot, the lever — **done generically, not phase by phase:**
  - `problemHTML()` paints `#ck-text` / `#ck-scene` and returns `''`; Platform Check and Crossover Read query `#ck-story`.
  - `distribute()` (after every phase) moves `.ck-to-work` nodes to the work panel and `.feedback` slots to the feedback bar. The work panel keeps its last picture, marked `data-ck-stale`.
  - The host's `querySelector(All)` searches the whole cockpit, so every existing handler still finds its moved nodes.
  - The lever (`syncLever`) stands in for the last visible primary `.btn` in the question panel (else the work panel), via a MutationObserver.
  - Mr Fraction docks in `#ck-say` (companion.js `dock()`); his first line per station is no longer lost to an early flush.
  - Measured with `tools/cockpit-probe.js` at 1366×657: **333 screens, page never scrolls, story never scrolls, 0 errors.** Work and question panels do scroll inside at that height (bar models ~490px vs ~180px). At 1920×1080 nothing scrolls.
- [x] S3 — fast path. **The order changed from the plan:** `read1 → pickModel → platform → plan`, the picture BEFORE the Platform Check, because the Platform Check's reveal names the line and would have given the picture away. Now it confirms the pick instead.
  - `assets/js/model-picker.js`: five schematic shapes with no numbers; feedback reuses each problem's `ticketBooth.whyCorrect` / `whyWrong` (150 texts, full coverage), with every digit masked.
  - Read 1 on a single-situation problem is just the masked story and Mr Fraction's retelling. The five-question checklist is the "Run the checklist" tool; Crossover Island keeps it as before.
  - `TOOLS` (checklist, read2, read3, ticket) open from "Help me see it" on pickModel and plan; `go()` returns to `toolReturn`. Once numbers are seen, tools stop masking.
  - Question panel holds questions only: `.hint-text` / `.platform-instruction` / `.ck-teach` move to a coaching note in the feedback bar (user, 2026-10-18).
  - Layout per user: **only the story and illustration on the top row**; work (the picture viewport), pad, question below; feedback + lever along the bottom; narrower question column.
  - Report: "picked the right picture first try"; lists the tools chosen.
- [~] S4 — lever (CSS signal lever, pull animation, reduced-motion still) ✓; Mr Fraction docked ✓; stacked layout < 1024 ✓ (375/768/1024: no sideways scroll, no target < 44px, lever kept by its question). **Not done: appearance review** — the browser pane was too small to screenshot; the user must look in Edge.
- [ ] S5 — docs (SITE-STATE, README screen table, `teachers.html` targets 3–5 → optional tools + a "choose the picture" target), user review, merge on the user's word.

**Verification on this branch, 2026-10-18:** `MF.validate()` 37/0/28. `SWEEP.report()` 1,756 screens (tools now swept): 0 render errors, 0 unfilled tokens, 0 numbers on numberless screens, 0 new leak candidates. **The sweep itself was fixed** — it read only the question panel, so a planted digit on the picker reported 0; it now reads `.ck-body`, and the planted digit fires on all 120 picker screens. `tools/cockpit-probe.js`: 333 screens at 1366×657, page never scrolls.

## Cycle 31 reviews (2026-10-18) — teacher FAIL, theme-reviewer FAIL, student-tester SHIP-WITH-FIXES

Not yet acted on; the user decides. Confirmed independently where marked ✓.

**Mechanical (no teaching change) — FIXED 2026-10-18**, each re-measured: Grand Tour header names the route in ink; `esc()` and `ModelPicker.why()` leave entities intact (0 literal entities on the four screens that showed them); `focusFeedback` marks its slot newest before focusing, plus a cockpit-wide focus rescue when the focused control disables or hides itself (picker and Arrivals Board land on the verdict); stale work is `inert`; lever reads "Done →" inside tools, takes the first-read label from the chain, and is announced without the arrow; the text-size setting scales rem too (question 18.4 → 25.7px at 150%), docked Mr Fraction is 1rem; under 860px tall the feedback row and lever are pinned to the window bottom (in view from the start at 1366×768); Enter in the Engine Room answer checks it; the Arrivals Board verdict is no longer hidden (one step at a time). Sweep after: 1,756 screens, every check 0. **Tab order into the story — FIXED 2026-10-18:** Tab from the question heading goes to the first tappable sentence or number (Platform Check, Crossover Read seam, Plan number-loading); a step with nothing to tap keeps normal Tab (control measured). **Still open from this list:** picker cards come after "Help me see it" in Tab order (one stop); doubled announcements; critique grammar. ("Closest of the four" was in the old picker copy, now replaced.)

**The findings as reported:**
- ✓ **Arrivals Board verdict hidden on all 37** — `relocateStray` moves "Worth remembering" in after `#ckfb`, and newest-slot-wins hides the verdict. Rule to adopt: a verdict on the student's own answer is never hidden by a note.
- ✓ **Grand Tour header names the line** ("The Compare Line", Compare's colour) above "Which picture fits?". Treat a mixed ride like a percent ride: name the route, ink colour.
- ✓ **Literal `&mdash;` / `&ndash;` on screen** — `ModelPicker.why()` escapes authored HTML; some content strings too (probably also live on `main`).
- **Focus drops to `<body>`** after picker cards, Arrivals Board yes/no, critique options, Test Track — controls disable themselves; call `focusFeedback`.
- **Tab order ≠ screen order**: Platform Check skips the story sentences; picker cards after the tools; Enter in `#ans` does nothing.
- **Stale picker cards stay clickable during tools** (throws) — use `inert` on stale work, not a class.
- **Feedback/lever below the fold at 1366×768**; verdicts don't scroll into view (only the Engine Room does).
- **Text size 150% misses rem-sized text** (question h3, choices, lever, Mr Fraction); docked Mr Fraction text is 13.76px (< 16).
- **Question column overflows** (island checklist was 2,821px before one-at-a-time; Arrivals Board 1,415px) while the work panel sits empty.
- **Lever labels lie in tools** ("Third read →" returns to the plan; "Now show me the proof →" at a halt goes to the Engine Room).
- Minor: doubled announcements; picker SVG labels 6.4px; "closest of the four" with five pictures; critique grammar ("telling they"); content that assumes order ("two problems ago").

**Teaching — ALL FIVE BUILT 2026-10-18 on the user's word ("do all of them"):**
- **(a)** `ModelPicker.modeFor(p, rideLine)`: a single-line ride asks *"Which picture shows what is missing?"* with that line's picture drawn with the `?` in each place (`VARIANTS`); Grand Tour, percent and island keep the five-shape question. The slot comes from the problem's `unknownCar` (plus `unknownCarAnswer` for ratio "for one" and compare "referent"); all 30 single-situation problems map, none fall back.
- **(b)** Mr Fraction's retelling no longer shows at Read 1; it arrives with a correct pick. Never on the island (it names the seam).
- **(c)** The Plan opens with the picture empty: tap each number the picture needs in the story (`read2.quantities[].needed`); scenery numbers are turned away with their `describe`; then the model and estimate appear (`wireLoad` / `finishLoad`). `offerTool()` highlights — never opens — the checklist / Find the question after a second wrong pick, and Sort the numbers after a second scenery tap. Not done: misconception-specific offers in the Engine Room (no tools there).
- **(d)** Picker feedback is safe by construction: a wrong pick is told what the shape *it* chose means and asked whether the story does that (`SHAPE_ASK`); no line names, operations or number words. The Ticket Booth keeps its own texts, as a tool.
- **(e)** Shapes redrawn: Compare shows the smaller amount measured against the larger (works for times-as-many), Change is before/after, Ratio's rows have different spacing; no words inside pictures; captions name the distinguishing feature.
- Also: staffed island stops dropped the five-question checklist (now a tool); "The Platform Check · part two" is just "The Platform Check".

**The teaching findings as reported:**
- **Single-line rides: the pick isn't recognition** (header + colour + same answer every stop). Teacher's proposal: on those rides show 3–4 variants of that line's diagram with `?` in different places (which quantity is missing); keep the five-shape pick for percent / Grand Tour.
- **Mr Fraction's Read 1 retelling does the recognising** one screen early — move it to after the pick; give Read 1 one tapped, numberless action.
- **Optional tools go unopened by the students who need them** — make the Plan's first act *placing the story's numbers into the chosen picture* (read2 + ticket inside the model); auto-*offer* (highlight, never open) a tool after a second wrong pick or by misconception.
- **14–17 of 120 `whyWrong` texts name the correct line; 33 name an operation** before the Plan — need picker-specific text or a validator rule; route to math-reviewer.
- **Compare picture is additive only** — misleads on times-as-many / percent-more problems. Captions repeat story words ("total", "whole") → keyword matching; Change picture reads as "more" on decreases.
- Help tools opened from the Plan are hollow (the model already shows the answer to the tool's question).

**Known and open:**
- On a single-line ride the picture choice is easy: the student chose the line. It is a real question on the Grand Tour and percent rides. Worth the user's call.
- At 1366×657 the work and question panels scroll inside themselves (bar models ~440–490px). Nothing scrolls at 1920×1080.
- The Terminus hub problem (`app.js` `renderHubAssessment`) is still the old page layout.
- Hub pages, map and report are unchanged.

**Baseline on `main` before S1:** `MF.validate()` 37 problems / 0 errors / 28 warnings.
