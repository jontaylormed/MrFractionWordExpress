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
- [ ] S3 — fast path: model picker, new phaseChain, Read 1 cut, help tools, metrics/report
- [ ] S4 — lever art, Mr Fraction in the feedback bar, stacked layout < 1024
- [ ] S5 — sweep.js, full verification, docs, merge on the user's word

**Baseline on `main` before S1:** `MF.validate()` 37 problems / 0 errors / 28 warnings.
