# The estimate gate — the plan

### Written 2026-08-16. `ROADMAP.md` §8 is the brief and the user's words; this is the design, the measurements behind it, and the contract the gate has to meet before anything is built.

> **Nothing here is built yet.** §8 says *"if this is built first, build it first properly"*. This document is the "properly".

---

## 0. The three decisions already made

| | |
|---|---|
| **A range, not a point** | User, 2026-08-15 (`ROADMAP` §8) and again 2026-08-16. The student sweeps a **band**, and its centre commits as the value so nothing downstream changes. An estimate genuinely is a region; the text box cannot express one. |
| **Free ink beside it, never parsed** | A scratch area that keeps the marks and grades nothing. It is not an input — it is thinking made visible, and committing the estimate must never depend on it. |
| **One derived window per materialisation** | User, 2026-08-16, choosing this over a two-stage "pick the magnitude first". No extra tap: the line arrives already scaled. The leak risk that comes with it is not waved away — it is measured in §2. |
| **The typed field sits BESIDE the line, not behind a toggle** | User, 2026-08-16. Both inputs are on screen at once, both live, neither announced as the fallback. See §3.1 — this is the decision that makes the accessibility path unbranded, and it costs phone height that has to be found rather than argued away. |

---

## 1. What the gate is today, and what depends on it

`stations.js` `phPlan`: a text `#estv`, `MF.parseAnswer(raw)`, and a refusal if that returns null. Three things consume the result and **none of them may change**:

- `this.estimate` — the parsed number. The Arrivals Board compares it against the answer and forgives anything inside a factor of two.
- `this.estimateRaw` — what the student actually typed, shown back to them. It exists because showing the parsed value once asked a student whether `7/20` matched `0.35`.
- `m.estimates` — the trip metrics.

**All 148 materialisations carry an `estimate` block.** There is no problem on the site this does not touch, which is what makes it engine work rather than content work.

---

## 2. The scale — measured, not chosen

### 2.1 Why the obvious rule fails

The scale must be derived per materialisation and must not be authored (§8, and `VERIFICATION.md` §33 — an authored scale is right for number set 1 and silently wrong for the other three).

The obvious source is the givens, since they are already on the student's screen. **Measured across all 148, answer ÷ largest given runs from 0.017 to 9.0** — `rr-van-hours` against `eg-crate-bottles`, a 500-fold spread. 48 answers exceed every given; 24 are under a tenth of the largest. **No single linear window derived from the givens alone fits both ends.**

Branching per operation shape does not rescue it either: `unknownCar` carries **23 distinct values across 37 problems**, most covering one or two. A window rule with 23 branches is the hardcoded-list defect `VERIFICATION.md` §36 exists to catch, and the 38th problem would arrive without a branch.

### 2.2 The rule that works

```
B = niceCeil( max(answer, largest non-distractor given) × 1.25 )
niceCeil snaps up to {1, 2, 2.5, 5} × 10ⁿ
line = [0, B]
```

No per-schema branching, nothing authored, one line of arithmetic. `problem.numbers` already tags each given with a `role`, so `role: "distractor"` is excluded — otherwise `rr-van-hours`'s 125 parcels would set a window for an answer of 7.

### 2.3 What it measures, across all 148

| | |
|---|---|
| Always contains the answer | **yes** |
| Answer never at the extreme edge | **yes** — worst position 0.98 |
| **Window fixed by the givens alone — zero leak** | **102 of 148** |
| Window the answer pushed upward | 46 |
| Distinct windows serving 148 materialisations | **12** |
| Answer's position in its window | median 0.41, p10 0.05, p90 0.72 |

**The leak is small and it is quantified rather than asserted.** In 102 cases the bound is set by a number the student is already looking at, so the line tells them nothing they did not have. In the remaining 46 it says only *"larger than any number in the story"* — which is a conclusion the structure already licenses, and one worth reaching. Twelve windows across 148 problems means a window is weak evidence about any particular answer, and the answer's position is spread right across the line rather than parked at a fixed fraction, so there is no tell to learn.

**This is a pre-solve surface and `tools/sweep.js` must scan it** (§8 point 4). The window bound is a number on a pre-solve screen; the leak scan has to know it is there and has to know it is allowed.

### 2.4 The fraction case, which is five materialisations and needs saying

**143 of 148 answers are integers.** The exceptions are `pw-quilt-colors` — four twentieths, 0.15 to 0.55, giving the smallest window on the site at B = 0.5 — and `rr-market-stall` set 3 at 2.5.

So the band quantises to whole numbers almost everywhere, and those five need a finer step. **Do not special-case the problem id.** The step should derive from the same place the window does — if the answer or a given is fractional, the step follows its denominator. A rule keyed to `pw-quilt-colors` is a rule that breaks on the next fraction problem written.

---

## 3. The gate has to be testable, and that is the same requirement as accessibility

§8 point 1 names an inaccessible estimate control as the single largest risk in the item, because **the estimate is a gate** — the Engine Room does not unlock without one, so a student who cannot drag is locked out of the whole problem.

The user asked, separately, that the gate be redefined so every agent can test it. **These are one requirement.** A keyboard-and-typed path that is genuinely equal is exactly the path a test drives.

### The contract

> **Every way of committing an estimate goes through one function.** Pointer, keyboard, typed entry and test all call the same commit, and no path may exist that another cannot reach.

```
Estimate.commit(value, raw)     // the only door
  ├── pointer sweep    → band centre
  ├── keyboard         → arrows move and widen the band
  ├── typed field      → MF.parseAnswer, as today
  └── tests/agents     → call it directly
```

### 3.1 Two inputs, on screen together — decided 2026-08-16

The typed field sits **beside the number line**, both live, neither labelled as the lesser one. The alternative was a toggle, and it was rejected for a reason worth keeping: for most students the typed field is an alternative, but **for some it is the only door**, and a door behind a toggle is a door that reads as the back way in. Tidiness was the wrong axis to decide it on.

Three things follow, and all three are cheaper to settle now than to retrofit:

- **They stay in sync, both ways.** Sweeping updates the number in the field; typing moves the band. Neither is the master. A student who drags roughly and then types an exact figure has not fought the control — they have used it.
- **Committing is one action, not two.** There is one *Lock it in* button, as today. The value it commits is whichever input the student touched last, and the screen has to make that legible — the field showing what the band means, the band showing where the number sits. Two inputs and one value is the whole risk of this layout, and it is resolved by them never disagreeing rather than by picking a winner.
- **A typed value outside the window widens the window; it is never refused.** The line is a derived guess at where the answer lives (§2), not a rule about what a student may think. A student who types 900 into a 0–200 line is making an estimate that is probably wrong, and finding out it is wrong is the Arrivals Board's job, not the input's. Refusing it would make the scale authoritative — which is exactly what §2.3's leak measurement says it must not be.

**The phone cost is real and is not waved away.** At 320px a number line and a text field stacked with the bar model above them is a long screen. The measurement to take before building: the Plan phase's height at 320px today, and after. If it does not fit, the answer is to shorten something else on that screen, not to hide the field.

> **Taken 2026-08-16, and the way to take it is worth keeping.** `SWEEP` cannot: it extracts *text*, into a detached host where heights are not real, and `SWEEP.show` returns excerpts rather than layout. What works is building a real `Stations.Station`, appending `st.render()` to the live `#view`, and calling `st.go('plan')` — the app's own object, laid out on the page.
>
> **Narrow, single column: the Plan phase is 2,474px, about 2.7 screens, of which the estimate block is 520px.** The grid collapses to one column as intended, nothing overflows, and no element extends past the viewport. That is long, but the phase was already long — the bar model and the problem text are most of it.
>
> **One measurement this pane could NOT give.** The drag thumb's effective tap target. `elementFromPoint` takes viewport coordinates and the thumb sits ~2,050px down; `scrollIntoView` would not bring it up in the in-app pane, so every probe read empty space and returned null — which looks exactly like a dead control. The hit area is 44×44 **by computed style** (a centred `::before`), which is the mechanism, but it has not been confirmed by a real hit test. Take that one in Edge.

Consequences worth stating now, because they are cheap before and expensive after:

1. **The typed field stays, unembarrassed** — and per the decision above it is beside the line rather than behind anything. WCAG 2.5.1 requires a single-pointer alternative to any path-based gesture, and `MF.parseAnswer` keeps owning fractions.
2. **The sweep drives the contract, not the DOM.** Today a test can only work this gate by knowing the internal id `#estv`. That is a checker coupled to a markup detail, and it will report a clean run the day the markup changes. `SWEEP` should commit through `Estimate.commit` and assert the gate opened.
3. **A rule that has never fired is not known to work** (`CLAUDE.md`). The gate's refusal path — no estimate, no Engine Room — must be exercised in both directions: commit nothing and confirm it stays shut, commit and confirm it opens.
4. ~~**`SWEEP` must be able to reach every phase after Plan.** It already drives 1,468 screens through this gate.~~ **WRONG, AND CORRECTED 2026-08-16 WHEN THE CODE WAS READ.** `tools/sweep.js` `render()` builds a phase list and renders each phase *independently* — it never walks a trip and never presses *Lock it in*. The gate has never been in its path and cannot block it. The claim was written from how the site behaves for a student, not from how the sweep behaves, which is §25's own lesson pointed at this document.

   **The real interaction is the opposite one, and it bit immediately.** The sweep *does* render `plan`, so everything the new control prints is on a scanned pre-solve screen. Labelling all five ticks put the answer on the line in **4 of 148 materialisations** — `cp-ticket-queues` set 1 printing "25" for an answer of 25, `ch-barrier-count` set 4 printing "500" for 500. Only the two end labels survive, which makes it safe by construction rather than by patching four cases: `B ≥ answer × 1.25`, so the upper label is always strictly greater than the answer, and the lower is 0 against a smallest answer of 0.15. Re-measured after the fix: **0 of 148**.

---

## 4. The ink pad

- **Never parsed, never graded, never required.** Committing must not depend on a single mark.
- **Nothing persists.** No `localStorage` — a locked decision. The ink dies with the phase.
- **Pointer Events, hand-rolled**, one path for mouse, touch and stylus, with `touch-action: none` on the surface *only*, or the page stops scrolling on a phone.
- **It is not an accessibility surface.** It carries no information the student needs and nothing downstream reads it, so it is `aria-hidden` and out of the tab order rather than being given a keyboard equivalent that would draw nothing.

---

## 4a. ⚠ MARK FOR REVIEW — the Mr Fraction collision, and a bad edit of mine

**Flagged by the user, 2026-08-16.** Recorded here because the first fix was wrong in a way worth remembering, not because the current one is in doubt.

**The problem.** Mr Fraction floats `position: fixed` at the viewport's bottom-right. The sketch pad is the tallest thing on the estimate and Engine Room screens, so it reaches his corner — measured at 1280: 37px of overlap with him collapsed, about 215 with him open.

**What I did first, and why it was wrong.** I reserved up to 240px of right margin on the pad so it would shrink away from him. That solved the collision by making the drawing surface smaller — **496px wide down to 274** — on the one element whose entire value is its area. The user's words: *the sketch pad should lose no area.* Right, and the give-away is that I was trading the thing being asked for against the thing causing the problem, when the two were never actually in competition.

**What replaced it.** The pad and the number line swapped columns. The pad is tall, so it goes LEFT where he never reaches and keeps its full width; the line is short — a 54px track and a row of ticks — so it clears him on the right. The Engine Room got the same swap for the same reason.

**And a second collision the swap created, caught by measuring rather than by assuming the swap was done.** With the line on the right its track still ran to 1178 while he starts at 993, so his bubble — which takes pointer events — covered the top 185px of the scale and a student could not sweep the high end of their own range. The reservation moved to the LINE, which can spare it: the scale is drawn in percentages, so a narrower track is the same range at slightly coarser resolution.

| at 1280 | before any of this | while shrunk | now |
|---|---|---|---|
| pad area | 128,960px² | 71,240px² | **154,570px²** |
| rail width | ~501px | ~501px | 293px |

**What a reviewer should look at**, because these are judgement calls and only two of them are measurable:

1. **Is a 293px rail long enough to sweep a range comfortably?** It is the number the split is really trading. An even column split was chosen over a pad-favouring one for exactly this reason.
2. **Does the pad on the left and the line on the right read correctly**, or does the thing you commit belong on the left?
3. **The Engine Room's field is now on the right**, which puts a text input in his column. It clears him horizontally at 1280, but it is the input a student types into.

---

## 4b. FIRST JOB NEXT SESSION — the layout, from the user 2026-08-16

Asked for after seeing the built gate, and not started:

1. **Triple the spacing above the scratch pad.** `.est-pad-wrap` is `margin-top: calc(var(--su) * 2)` today; the pad is crowding the typed field.
2. **Centre the number line vertically on the left**, so it sits level between the typed answer above and the scratch space below it in the right-hand column. Today `.est-wrap` is `align-items: start`, which pins the line to the top of a right column that is much taller.

Both are `.est-wrap` grid changes in `app.css` and neither touches `estimate.js`. **Re-measure the 320px height afterwards** (§3.1) — tripling a margin on the phone layout, where the two columns are stacked rather than side by side, is where that 2,474px gets longer.

---

## 5. Open, and needing the user

1. ~~Does the typed field sit beside the line, or behind a toggle?~~ **Settled 2026-08-16 — beside.** See §0 and §3.1.
2. **Does the band's width mean anything downstream?** Today only the centre commits. A wide band is a less confident estimate, and the Arrivals Board could say so — but that is new behaviour on a screen whose forgiveness is already deliberately loose.
3. **The Engine Room's typed field** — §8 records that the user asked for it to look different from what it is now, not merely different from the estimate. That is a second design, not covered here.
4. **No student has used any of this.** Same gap as everything else on the site.

---

## 6. What was measured to write this, so it can be re-taken

All figures above come from driving the live build, not from reading manifests:

- 148 materialisations, 0 errors, every one carrying an `estimate` block.
- Answers: min 0.15, median 27, max 700, nothing above 1000. 5 non-integer.
- Answer ÷ largest given: 0.017 → 9.0, median 0.61.
- The §2.2 rule applied to all 148: coverage, leak, window count and answer position as tabulated.

**Re-take them when the problem count changes.** They are properties of the content, and the content grows.
