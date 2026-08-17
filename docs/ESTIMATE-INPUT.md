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

Consequences worth stating now, because they are cheap before and expensive after:

1. **The typed field stays, unembarrassed.** Not a fallback tucked behind a link — WCAG 2.5.1 requires a single-pointer alternative to any path-based gesture, and `MF.parseAnswer` keeps owning fractions.
2. **The sweep drives the contract, not the DOM.** Today a test can only work this gate by knowing the internal id `#estv`. That is a checker coupled to a markup detail, and it will report a clean run the day the markup changes. `SWEEP` should commit through `Estimate.commit` and assert the gate opened.
3. **A rule that has never fired is not known to work** (`CLAUDE.md`). The gate's refusal path — no estimate, no Engine Room — must be exercised in both directions: commit nothing and confirm it stays shut, commit and confirm it opens.
4. **`SWEEP` must be able to reach every phase after Plan.** It already drives 1,468 screens through this gate. If the new control cannot be committed programmatically, the sweep stops at the Plan phase on all 148 materialisations and reports it as a pass on however many screens it did reach — which is `VERIFICATION.md` §36 in its purest form.

---

## 4. The ink pad

- **Never parsed, never graded, never required.** Committing must not depend on a single mark.
- **Nothing persists.** No `localStorage` — a locked decision. The ink dies with the phase.
- **Pointer Events, hand-rolled**, one path for mouse, touch and stylus, with `touch-action: none` on the surface *only*, or the page stops scrolling on a phone.
- **It is not an accessibility surface.** It carries no information the student needs and nothing downstream reads it, so it is `aria-hidden` and out of the tab order rather than being given a keyboard equivalent that would draw nothing.

---

## 5. Open, and needing the user

1. **Does the typed field sit beside the line, or behind a toggle?** Beside is more honest and costs vertical space on a phone; behind a toggle is tidier and risks reading as the lesser path.
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
