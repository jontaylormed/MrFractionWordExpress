# Review Log
### Mr Fraction's Word Problem Express

Append-only. Maintained by the Oversight Agent. This is the source of truth for what was reviewed, what was found, what was ruled, and what was traded away.

---

## Cycle 1 — 2026-07-28 — Foundation specifications

**Trigger:** Project kickoff. User explicitly halted an early rush to build and directed that pedagogy, process, agents, and theme be designed first.

**Scope:** `PEDAGOGY.md`, `THEME-AND-ACCESSIBILITY.md`, `PROBLEM-SCHEMA.md`, `AUTHORING.md`, `PROCESS.md`, the five agent definitions, and `tools/check-contrast.ps1`.

**Agents run:** teacher (authoring) → theme (authoring + contrast verification) → oversight (spec review). Math and student not yet applicable — there is no content and no build.

### Verdicts

| Agent | Verdict | Notes |
|---|---|---|
| teacher | PASS | Pedagogy spec complete with 8 non-negotiables and 3 open questions |
| math-reviewer | N/A | No content authored yet |
| theme-reviewer | PASS-WITH-NOTES | 31/31 contrast pairs passing after two corrections; 2 open questions |
| student-tester | N/A | No build to test |

### Findings

| # | Severity | Finding | Resolution |
|---|---|---|---|
| C1-1 | MAJOR | `--line-groups` `#B4530F` gave only **4.37:1** against `--ink-on-rail` — a real WCAG AA failure for white text on the Equal Groups line fill. | Token darkened to `#A34A0B` (5.17:1 on fill, 5.5:1 on cream). Hue preserved. Logged as theme conflict **T-6**. |
| C1-2 | MINOR | Theme spec asserted rail green would fail as small body text and restricted it (ruling T-4). Measurement showed **7.2:1** — comfortably AA. The restriction was invented, not measured. | Restriction lifted; T-4 rewritten to record the error. |

**Both findings came from running the checker, not from reading the spec.** Neither would have been caught by review. This is the argument for keeping mechanical verification in the loop wherever the question has an arithmetic answer.

### Conflicts and rulings

| # | Conflict | Precedence | Ruling |
|---|---|---|---|
| T-1 | Decorative slab display face for headings — strongly on-theme | 2 > 5 | **Rejected for body and problem text. Permitted for the station-sign wordmark only** (ornamental, short, has a text equivalent). |
| T-2 | Animated train crossing between stations | 2 > 5 | **Bounded, not killed.** ≤300ms, chrome only, never within 200px of problem text, removed entirely under `prefers-reduced-motion`. Model case for finding the third option. |
| T-3 | Aged-paper / ticket-stub texture behind problem text | 2 > 5 | **Rejected outright, non-negotiable.** Texture behind text is among the most damaging things possible for a struggling reader. |
| T-4 | Rail green for small text | — | **Approved** — the original restriction was based on an eyeballed guess that measurement disproved. |
| T-5 | Line identity by color alone (transit-map authenticity) | 2 > 5 | **Modified.** Color retained, but every line always carries a shape marker **and** a text label (WCAG 1.4.1). |
| T-6 | White text on Equal Groups fill | 2 > 5 | **Token changed** per C1-1. |

### Spot-checks performed

- Re-ran `tools/check-contrast.ps1` after the token change: **31 pairs, 0 failing**. `docs/contrast-report.md` regenerated and current.
- Verified `PEDAGOGY.md` §7 non-negotiables are each traceable to a specific mechanism in the station flow (§4) — no orphaned principles.
- Verified `PROBLEM-SCHEMA.md` §10 validation rules are mechanically checkable, not aspirational. Rule 10 (estimate range must contain the answer) was added specifically because it catches a silent authoring bug that would otherwise teach a student their correct estimate was wrong.
- Confirmed the `published`-status gate is an actual enforcement mechanism (loader skips non-published), not a convention.

### Decision

**GATE 1: NOT YET REACHED** — specs are complete and internally consistent, but no content exists to gate.

**Specs approved as the basis for content authoring**, subject to the open questions below being ruled before the build begins.

### Escalated to the user

1. **Theme Q2 — session-only preferences (locked constraint conflict).**
   No localStorage means a dyslexic student re-sets font, reading ruler, and tint on **every page load**. This is a repeated accessibility cost created directly by a constraint the user chose.
   *Options:* (a) accept it, make the panel one keystroke away; (b) build the journey as a single-page app so preferences persist in memory across stations — **solves it with zero storage**; (c) reconsider `sessionStorage`.
   *Recommendation:* **(b).** Costs nothing, breaks no constraint.

2. **Pedagogy Q3 / Theme Q1 — the number-reveal escape hatch.**
   Number masking is a deliberate friction point. Students with reading disabilities may genuinely need numbers visible earlier.
   *Recommendation:* put the toggle **inside the accessibility panel**, not beside the problem — discoverable for those who need it, not the path of least resistance for everyone else.

3. **Pedagogy Q1 — evaluating free-text Three Reads responses.**
   No backend means no reliable automated evaluation.
   *Recommendation:* self-assessment against a model answer, but the student must **type something before the model answer unlocks** — production before comparison.

### Standing note on this system's limits

Recorded here because it belongs in the permanent record, not just in `PROCESS.md`:

These four agents are the same model under different instructions. They share blind spots, and four passes reduce correlated error without eliminating it. This process reliably catches arithmetic errors, spec violations, and mechanical accessibility failures. It only weakly catches **whether the teaching actually works**. No real student has used this site, and every claim about what a demoralized 15-year-old finds condescending is currently a model's guess.

**Real classroom testing is the missing check, and nothing in this log substitutes for it.**

---

## Cycle 2 — 2026-07-28 — Architecture revision

**Trigger:** User directive restructuring the site. Stations become *strategies* rather than Polya phases; trips are 3–5 stations themed to one schema; problems randomize by *type*; every trip ends at an assessment hub; Learning Hubs added for prerequisite support.

**Scope:** New `JOURNEY-ARCHITECTURE.md`; revisions to `PEDAGOGY.md` §4/§5/§6/§7, `PROBLEM-SCHEMA.md` §1/§10, `README.md`.

**Agents run:** teacher (restructure) → oversight (reconciliation review).

### Verdicts

| Agent | Verdict | Notes |
|---|---|---|
| teacher | PASS | Restructure is pedagogically stronger than the v1 design — see finding C2-1 |
| oversight | APPROVED | Reconciliation is coherent; three new non-negotiables added |

### Findings

| # | Severity | Finding | Resolution |
|---|---|---|---|
| C2-1 | — | The user's structure is **better than the Teacher Agent's original**. v1 made stations = Polya phases, so every trip taught the same four moves with different numbers. The new structure makes *strategies* the curriculum and adds a genuine unaided-transfer assessment — which v1 lacked entirely. v1's Transfer Ticket was near-transfer with scaffolding still present, and would have overstated what students had learned. | Adopted. Polya demoted to the within-station micro-loop. |
| C2-2 | MAJOR | **Local/Express/Limited were assigned backwards in v1.** The spec implied Local = easier/shorter. In actual rail usage a Local stops at *every* station and a Limited runs direct — so Local should mean *more* stops and *more* support. | Corrected. Route length now maps to station count: Local 5, Express 3–4, Limited 3. This is a strict improvement — support level is now legible from the name, and a student needing help takes the *thorough* route rather than the *younger* one. |
| C2-3 | MAJOR | Randomizing only numeric values would have been detectable re-skinning and taught nothing. | Four randomization axes specified (unknown position, context, number type, phrasing) with hard constraints: no two stations in a trip may share an `unknownCar` or a `context`. |
| C2-4 | CRITICAL (design) | With a ~15-problem bank, the constraint that the Hub problem be novel will frequently be unsatisfiable. The tempting failure is to serve a problem the student already saw and call it an assessment. | **New non-negotiable #10:** if no novel problem exists, run **no Hub** and say so plainly. A dishonest assessment is worse than none. Degradation priority written into `JOURNEY-ARCHITECTURE.md` §4. |
| C2-5 | MAJOR | Learning Hubs are the highest-risk feature for stigma. Framed wrong, they become visible remedial tracking — which this audience has specifically learned to reject. | **New non-negotiable #11:** never gated, never mandatory, never described as remedial, visible on the map from the first screen. Arrival framed as a *detour*, never a demotion. |

### Conflicts and rulings

| # | Conflict | Precedence | Ruling |
|---|---|---|---|
| A-1 | Teacher Agent's v1 five-station Polya flow vs. user's strategy-station model | User directive + 3 | **Reconciled, not overridden.** Both survive at different scales: strategies macro, Polya micro. No pedagogical content was lost. |
| A-2 | Hub assessment integrity vs. small problem bank | 3 > 4 | **Integrity wins.** Skip the Hub rather than fake it (C2-4). |
| A-3 | Randomization variety vs. bank size | 1 > 4 | Selector built correctly now; bank explicitly named as the growth area the teacher pipeline exists to fill. Honest UI when the bank is thin. |

### Spot-checks performed

- Verified all five original non-negotiables survive the restructure unchanged; the three new ones (#9–11) don't conflict with them.
- Verified the schema's new randomization tags are sufficient to actually implement §4's constraints — they are, and problems missing them degrade to non-randomized use rather than breaking generation.
- Verified no grade level was introduced by the route-length rework.

### Decision

**Architecture approved.** Build proceeds as a **vertical slice**: one complete trip, all stations, one Hub, one Learning Hub — then full agent review before replication. Oversight selected this sequence (the user's answer to the build-order question was the architecture directive itself).

### Escalated to the user

None outstanding. Three prior escalations from Cycle 1 were all resolved by the user's rulings: single-page journey, number-reveal toggle inside the accessibility panel, type-then-compare for Three Reads.

---

## Cycle 3 — 2026-07-28 — Vertical slice build + live testing

**Trigger:** First build. One complete trip on the Part–Whole Loop: 5 strategy stations, the Terminus Hub, one Learning Hub, the Dispatch Office, and a 6-problem bank.

**Agents run:** teacher (authoring) → math (verification) → theme (a11y) → **student (live browser testing)** → oversight.

### Verdicts

| Agent | Verdict | Notes |
|---|---|---|
| teacher | PASS | Scaffolding complete for all 6 problems; hint ladders escalate one rung at a time |
| math | PASS | 30 arithmetic checks re-computed independently; every problem cross-checked by a second method |
| theme | PASS-WITH-NOTES | 3 accessibility defects found and fixed (below) |
| student | **SHIP-WITH-FIXES → SHIP** | 5 defects found in live browser testing, all fixed and re-verified |
| oversight | APPROVED | Gate 1 and Gate 2 passed |

### Findings — all found by *running* the thing, not reading it

| # | Severity | Finding | Resolution |
|---|---|---|---|
| C3-1 | **CRITICAL** | **Every composite button had no accessible name.** Line cards, route choices, schema pickers and the estimate check all rendered as bare `button` in the accessibility tree. A screen-reader user could not have used the site *at all*. | Explicit `aria-label` on every composite choice button. Re-verified: all now announce properly. |
| C3-2 | MAJOR | `<p>` nested inside `<button>` — invalid HTML (button takes phrasing content only). | Changed to `<span>` with `display:block`. |
| C3-3 | MAJOR | **Read-aloud said "holds 12 cups cups."** The `spoken` field duplicated the unit already present in the sentence. Silent in visual testing; only audible. | `spoken` is now the bare number; reserved for cases where digits mis-speak (`3/4` → "three quarters"). Rule added to schema §2. |
| C3-4 | MAJOR | Escape from the accessibility panel returned focus to `<main>` or `<body>`, stranding a keyboard user with no obvious next Tab stop. | Focus now returns to the last genuinely interactive element, falling back to the panel opener. Verified across all three entry paths. |
| C3-5 | MAJOR | Several handlers used `addEventListener` **and then** assigned `.onclick`, stacking two handlers so the next click fired both. | Rewritten as explicit state flags. *(Caught by reading my own code before testing — worth noting the review caught this one, not the browser.)* |
| C3-6 | MINOR | Dispatch Office reported an unfinished problem as **broken**, contradicting the graceful-degradation design and telling teachers their work was wrong when it was only partial. | Split into "Needs fixing" vs "Still to fill in". |

### Spot-checks performed by oversight

- **Re-computed the maths independently.** All 30 checks pass, including cross-checks by a second method (e.g. `3/8 × 48 = 18` confirming `48 − 30`).
- **Verified the validator actually fails.** Fed it a deliberately malformed problem: it caught all **13** planted defects, including the two that matter most — an estimate range excluding the true answer, and an `acceptedForms` entry not equal to the answer. A validator that only ever passes is worthless; this one was tested.
- **Verified the no-Hub refusal is real, not aspirational.** Starved the bank of hub-eligible problems; the selector returned `hub: null` with a `NO_HUB` note and the UI told the student plainly that it had no fresh problem and would not pretend otherwise. Non-negotiable #10 holds in code.
- **Verified randomization is by type.** Generated trips have 5 unique contexts and 5 unique unknown positions, and the Hub problem is novel on both axes. Confirmed across repeated runs — the Hub served a different problem each time.
- **Verified the gates hold** against a student trying to skip: empty Three Reads blocked, empty estimate blocked, wrong schema blocked with support escalating after 3 attempts.
- **Verified the report ordering.** Leads with strategy selection; no percentages, no grades, no scores anywhere (the only occurrence of the word "score" is the disclaimer "No score, no percentage").
- Confirmed 320px reflow with no horizontal scroll, all targets ≥44×44, one `h1`, correct landmarks, `aria-live="polite"`, skip link first in tab order, bar model fully keyboard-operable with per-segment labels.

### Corrections to our own documents

| Doc | What was wrong |
|---|---|
| `JOURNEY-ARCHITECTURE.md` §4 | Claimed a reload returns the student to the same trip. **Impossible** under the no-storage constraint — the seed lives in memory only. Corrected, and the real cost stated plainly. |
| `PROBLEM-SCHEMA.md` §10 | Referenced a `tools/validate-problems.ps1` that was never built. The validator was implemented in-browser instead (`MF.validate()`), which is more useful — the Dispatch Office reuses it live. Reference corrected. |

### Decision

**GATE 1: PASSED** · **GATE 2: PASSED** — vertical slice approved.

**Rationale:** All six problems verified correct by independent re-solving. All CRITICAL and MAJOR accessibility defects fixed and re-tested in a live browser. The pedagogical gates, the Hub's honesty rule, and the randomization constraints were each tested by trying to break them, not by assuming them.

**What this does *not* establish:** that the teaching works. Every finding above is mechanical — names, focus, arithmetic, markup. Nothing here tells us whether a demoralized 15-year-old finds this useful or patronising. That remains the missing check, and the student agent is a proxy for a real student, not a substitute.

### Follow-ups (not blocking)

- Four of five lines have no content. The bank is the growth area; the authoring pipeline exists to fill it.
- With 6 problems, trip variety is thin — a student re-riding the Local will see repeats. Documented honestly rather than hidden.
- `/add-problems` (Track A) is specified but not implemented; Track B (Dispatch Office) is built and working.

---

## Cycle 5 — 2026-07-29 — Three hollow stations, and the content that hid behind them

**Trigger:** User review of the built lesson flow. Three findings, all correct:
1. *"In the Part–Whole section, why have them re-select the Part–Whole section?"*
2. *"Instead of asking them to repeat the question back, have them select from multiple choice."*
3. *"Word problems need extra or distracting information… too simple and elementary."*

### The pattern

Three stations were asking questions **that could be passed without reading anything**:

| Station | Was | Why it was hollow |
|---|---|---|
| **Ticket Booth** | "Which line is this?" | The student chose the line off the map two screens earlier. |
| **Read 2** | A list of quantities with a Next button | Nothing to get wrong. |
| **Read 3** | "Say the question back" in a textarea | Type one character, get shown the answer. **The regression suite passed it with `"x"`.** |

That last one is the tell. A test that types a single character and proceeds is not evidence the station works — it is evidence the station checks nothing.

### Findings

| # | Severity | Finding | Resolution |
|---|---|---|---|
| C5-1 | **CRITICAL** | Ticket Booth asked a question already answered by the student's own route choice. | Now asks **"which car is missing?"** — the genuine skill inside a known schema. |
| C5-2 | **CRITICAL (build gap)** | Every problem already authored `unknownCarPrompt` / `Options` / `Why`, and `PEDAGOGY.md:193` specified this station. **The UI never rendered any of it.** Authored content sat unused in all six files while the station fell back to the giveaway question. | Wired up. Spec and build reconciled. |
| C5-3 | MAJOR | `unknownCar` codes (`other-part`) do not match prose options (`"the part left"`), so no rule could identify the correct option. | Added required `unknownCarAnswer`, verbatim-matched, validator-enforced. |
| C5-4 | MAJOR | Terminus Hub asked the same already-answered question. | Made **conditional on the content bank** — returns automatically when the Hub can serve a problem from a line the student didn't ride. States plainly why it isn't asking. |
| C5-5 | MAJOR | Read 2 and Read 3 ungraded. | Read 2 is now *which numbers do you need*; Read 3 is multiple choice with per-option explanations. Both validator-enforced. |
| C5-6 | MAJOR | No distracting information anywhere — every number in every problem was needed. | All 7 problems now carry a declared `role:"distractor"` quantity. |
| C5-7 | **MAJOR (self-inflicted)** | Adding required schema fields **broke the Dispatch Office** — it authored none of them, so every teacher-authored problem reported "Needs fixing". | Dispatch updated: `-n3 =` prefix marks distractors, `*` marks correct options, Read 2 generated from the numbers so a quantity can never go undescribed. |
| C5-8 | **MAJOR (silent)** | New problem `pw-cycling-club` was **unreachable** — 40 trips, never selected. Its `context: "sport"` collided with `pw-free-throws`, which is the only problem with the `estimation` role and therefore on every Local trip. The Hub's novelty rule excluded it every time, with no error raised. | Context changed to `cycling`. Now appears as Hub 23/200 seeds and as a station 48/200. **Dead content raises no alarm — reachability must be swept, not assumed.** |

### A test that lied

The first reachability sweep ran 40 `buildTrip` calls in a loop and got **identical results every time**, which looked like a broken selector. It wasn't: the seed is `Date.now()`, and 40 iterations completed inside the same millisecond. The selector was fine and the *test* was worthless. Re-run with explicit varied seeds, it showed real variety across all 7 problems.

### Content

- **7 problems** (was 6). New `pw-cycling-club`: percent, whole-unknown, two moves, distractor — aimed at early high school.
- Math re-derived independently: `84 / 0.35 = 240`, cross-checked `0.35 × 240 = 84`; `240 − 84 = 156`, cross-checked as `65% of 240 = 156`; bar model consistent at `35% = 7/20`, `7 × 12 = 84`, `13 × 12 = 156`.
- New Learning Hub **"The Five Situations"** — an explainer per line, the two pairs most often confused, a keyword-trick warning, and 7 cold identification stems. This is where choosing among five lines is honest.

### Verification

- **7/7 problems validate**, 0 errors, 0 warnings.
- Read 2 rejects the classic error (select every number) with a specific explanation.
- Read 3 has no textarea; wrong picks give per-option reasons.
- 3 full trips end to end, no console errors. Dispatch Office back to **"Nothing broken — this problem will run."**

### Decision

**GATE 2: PASSED.** Standing note for future cycles: **a station a test can pass with one keystroke is not a station.** Every gate should be attacked with the laziest possible input before it is believed.

---

## Cycle 4 — 2026-07-28 — Visual rebuild, and a new role

**Trigger:** User review of the built site: *"These need much work. Nowhere close to looking good."* Direction given: match the look and feel of **Mr. Fraction's Factory** (`jtaylor-cloud.github.io/Mr.FractionFactory`), add animation and an illustrated railroad map, and create an **Art Director** role.

**Agents run:** art-director (new) → theme (contrast + a11y) → student (regression) → oversight.

### The failure this cycle exists to correct

Cycle 3 passed every gate. The maths was verified, the accessibility was real, the validator worked — **and the site looked like an unstyled document.** Five agents reviewed it and not one said so, because not one of them was responsible for whether it looked finished.

The specific mechanism is worth recording, because it will recur: the theme spec's rule *"theme lives in the chrome, content lives in the quiet"* was **used as cover for building almost no chrome at all.** That rule constrains the problem panel. It was never a licence to leave the rest undesigned. Restraint in the reading area demands *more* craft in the frame around it, not less.

**A rule intended to protect the reader was quietly repurposed as an excuse to do less work.** That is the general pattern to watch for.

### Concrete gap against the reference

| | Reference | Cycle 3 build |
|---|---|---|
| Display face | Black Han Sans, tracked, on every title | **None.** Body font at a larger size. |
| Body face | Atkinson Hyperlegible (Braille Institute, low-vision) | Verdana |
| Accent | Orange `#c96a1f`, spent deliberately | Deep green, sprinkled |
| Ambient motion | Spinning gear watermarks, 8–12% opacity | **None** |
| Ticker | Scrolling display-caps tape | None |
| Nav | Pills, active state solid orange | Plain buttons |
| Headers | 72px thumb + orange eyebrow + display title | Plain `<h1>` |

The absent display typeface was the single largest contributor. A page whose headings are body text at a larger size reads as a draft no matter what else is right.

### Findings

| # | Severity | Finding | Resolution |
|---|---|---|---|
| C4-1 | **CRITICAL (design)** | No display typeface anywhere. | Black Han Sans for station signs, line names, station titles, ticker. Reserved for station-level titles only (AD-4) so it keeps its force. |
| C4-2 | MAJOR | Reference loads fonts from Google's CDN, which would break the locked offline / no-tracking constraint. | **Self-hosted instead** — Latin subsets only, 5 faces, **84 KB total**. Same look, constraint intact, and verified to work from `file://`. |
| C4-3 | MAJOR | Reference palette fails AA in 8 places when used literally. | Five tokens darkened: `teal` `#2E7A6E`→`#2B7166`, `green` `#4A7C2F`→`#45742B`, `brown-muted` `#7A5C3E`→`#6B5138`, orange split into `orange`/`orange-deep`/`orange-light` by context. **39 pairs, 0 failing.** |
| C4-4 | MAJOR | Card borders at `#C8B89A` measure 1.68:1. | **Scoped, not excused.** WCAG 1.4.11 covers information required to *identify a control*; a decorative card outline is not that. Every edge that identifies a control now uses `border-strong` `#8F7F63` (3.36:1), which is checked and passes. Reasoning written into the contrast report so this cannot quietly become a loophole. |
| C4-5 | MINOR | Italic serif wanted for Mr Fraction's voice, but the a11y spec bans italics. | **Bounded exception (AD-2):** Libre Baskerville Italic for his spoken asides only, ≤2 sentences, never for emphasis, never inside problem text. The general ban stands. |

### What was built

- **Ambient layer** — six rotating wheel watermarks (14–34s, alternating direction, 7–11% opacity) and three drifting steam clouds. The wheel is the direct analogue of the reference's gear.
- **Departure-board ticker** under the station sign, `aria-hidden` so no screen reader has a marquee read at it.
- **Illustrated railroad map** — 253 SVG elements: real two-rail track with sleepers, station nodes, double-ringed terminus hubs, a locomotive at the start of each running line, and *track under construction* (sleepers, no rails) for the four unbuilt lines, which reads as "coming" rather than "broken". Learning Hubs are drawn as a real junction off the network, visually equal to everything else.
- **Station headers** with thumbnail, orange eyebrow, and display title.
- Enamel station sign, nav pills, ticket-style buttons with a 2px drop, choice tiles that lift on hover, custom-styled `<select>`.

### Verification

- **Contrast:** 39 pairs, **0 failing**.
- **Fonts:** all three faces confirmed loaded and applied (`document.fonts.status: "loaded"`).
- **Full trip regression:** map → route → 5 stations → Hub → report, **no console errors**, report still leads with strategy selection.
- **320px:** page scroll width exactly 320, no horizontal page scroll. The map scrolls inside its own `overflow-x:auto` box; the ticker is clipped by `overflow:hidden`. All touch targets ≥44px.
- **Reduced motion:** rule verified to kill all animation, freeze the ticker, and remove hover lifts, **while leaving the ambient marks visible but static** — the page must still look composed when frozen, not emptied.

> **Limitation, stated plainly:** the reduced-motion behaviour was verified by *inspecting the compiled CSS rule*, not by emulating the media query — the browser tooling available here cannot toggle `prefers-reduced-motion`. The rule is correct as written, but it has not been seen rendering. This should be confirmed by eye before release.

### Decision

**GATE 2: PASSED** for the visual rebuild.

**Escalated to the user:** none. But note that **art direction is judged by eye, and no human has yet looked at this build.** Every claim above is measured (contrast, fonts, layout, overflow) rather than aesthetic. Whether it now *looks good* is the user's call, and the Art Director's own verdict on its own work is worth little.

---

## Cycle 6 — 2026-07-30 — The answer printed on the screen before the question

**Trigger:** Building the Ratio & Rate Rail. Driving a station through the browser — not reading its manifest — showed the Model Yard printing `15` on every car during the **Plan** phase of `rr-poster-run`, while the Engine Room on the *next* screen asked "how many posters does the press print each minute?" The answer was 15.

**Agents run:** oversight (interrupted mid-pass by a session limit; the cycle was completed in-session and this entry written afterwards — see *Provenance* below).

### The defect

`model.js` renders `barModel.bars[0].segmentValue` on every car and `knownTotal` on the whole-car. `stations.js` calls that from `phPlan`, which runs **before** `phSolve`. So any bar field holding a value that is also one of the problem's own answers hands that answer over a screen early.

Swept across all 13 problems, it was in **five approved ones**:

| Problem | Field | Value | Was |
|---|---|---|---|
| pw-soup-serving | `segmentValue` | `"3"` | s1's answer — s1 asks "how many cups is ONE quarter of the pot?" |
| pw-free-throws | `segmentValue` | `"7"` | s1's answer |
| pw-orders-day | `segmentValue` | `"17"` | s1's answer |
| pw-band-brass | `segmentValue` | `"9"` | s1's answer |
| pw-cycling-club | `knownTotal` | `"240 members"` | s1's answer — s1 asks "how many members are in the whole club?" |

### Why five reviews missed it

**Every one of those problems is correct on the page.** Read the manifest and `segmentValue: "3"` looks like diligent scaffolding. The defect only exists in the *composition* of two files — what `model.js` renders, and when `stations.js` renders it — and no reviewer had both in view at once.

This is the same shape as the quilt scene from Cycle 3, which asserted the answer to step one. That was recorded, a rule was written, and the rule was applied to *scenes*. Nobody re-asked the question of the **bar model**. A defect class was closed at the width of the instance that produced it.

### What changed

**Content — the five, plus two more the sweep caught** (`pw-helmet-savings`, `pw-quilt-colors`): leaking fields set to `"?"`. `model.js` already treats `knownTotal === '?'` as unknown and drops it from the yard-say line; an unparseable `segmentValue` renders as `?` on each car, which reads as *this is the thing you are working out*.

Values that are **given in the problem text were kept** — `pw-soup-serving` still shows `knownTotal: "12 cups"`, `pw-helmet-savings` still shows `"$48"`. Only answers were barred. Each `a11yDescription` was rewritten to match, since all five stated the leaked value out loud; a blind student must get the same experience, not a worse one and not a better one.

**Tooling — two mechanical rules in `MF.validate()`** so this cannot regress:
- **10b** errors when a bar's `segmentValue` or `knownTotal` parses equal to any step answer or the final answer.
- **10c** warns when `bars.length > 1`, because `model.js` reads only `bars[0]`.

Both were proven by planting defects and confirming they fire, then clear. A rule that has never fired is not known to work.

### What the mechanical rule could not catch

A numeric check only sees digits. Two further leaks were **spelled out in words**:

- `rr-bread-dough`'s a11yDescription said a bigger batch "makes every part **four times** bigger" — 4 is s1's answer.
- Four `estimate.modelReasoning` strings walked the student to the exact answer: `rr-van-hours` ("in the region of **seven** hours" — the final answer), `rr-bread-dough`, `rr-market-stall` ("Ten bags for twenty is **two dollars each exactly**").

All four were in **newly authored Ratio & Rate content — this session's own work**, written by the same author who had just flagged the pattern in everyone else's. Rewritten to bracket the answer rather than state it. **An estimate should land near the answer; that is what estimation is.** The line to hold is exactness, not proximity.

### The one that could not be fixed by editing a field

`rr-timetable-run` asked, as step 1, "how many twenty-minute stretches are there in one hour?" — answer 3 — while its Model Yard draws the hour as exactly **3 segments**. Blanking a field could not fix this: the partition *is* the model, and hiding it would gut the representation and leave screen-reader users with less than sighted ones.

**Ruling:** the problem was collapsed from two steps to one. The stretch count moved into the **request-only escalating hint ladder**, where a student who needs it still gets it a rung at a time, and stopping at 3 became a misconception. *Precedence 3 (pedagogical integrity) over convenience: the picture stays honest and the question moves.*

### Spot-checks performed

- `MF.validate()` — 13 problems, **0 errors**; sole warning is `rr-cordial-mix` having no `stationRoles`, which is deliberate for a Hub-only problem.
- Rendered every problem's actual `Model.html()` and scanned the markup for its own answers. Clean, with one **false positive**: `pw-band-brass` renders `9` as a *part count* while its s1 answer is `9` *students* — same number, different referent. Recorded rather than "fixed", because acting on it would damage a correct bar.
- Spelled-out-number sweep over 138 Plan-visible fields. Most hits were false positives ("the **two** stalls", "**three** quarters"); each was read in context rather than trusted.
- Answer machinery re-run across all problems: every step's own answer accepted, no misconception graded correct, every misconception routing to its own diagnosis.
- Full trip driven in a browser to the Engine Room: the 12 cars of `rr-poster-run` now render `?`.

### Also found, not fixed

- **`signalBox.plan[]` is never read by any code.** Every problem authors 2–3 plan strings; `phPlan` does not render them. That is ~30 strings of reviewed, never-seen content. Not touched here — it needs a decision on whether to render it or delete it.

### Decision

**GATE 2: PASSED** for the seven Part–Whole problems. Their `status` remains `published`; the defect is closed and the validator now guards it.

**Provenance — stated plainly.** The oversight agent began this pass and was cut off by a session limit partway through; it had applied the content and a11y fixes but had not updated the review blocks or written this entry. The remainder was completed in-session by the main agent, which also authored the content that four of the leaks were found in. **An author checking their own work is the weakest link in this log**, and the Ratio & Rate line still carries `review.oversight.status: "not-run"` on all six problems for that reason.

**Outstanding:**
- ~~Review blocks~~ — done: all seven now carry a Cycle 6 re-approval with `firstApproved` preserving the original sign-off date.
- The Ratio & Rate line has had no theme, teacher, or student pass.
- No real student has used any of this.

---

## Cycle 7 — 2026-07-30 — The Ratio & Rate Rail, randomised rides, and number sets

**Trigger:** User request to run the cycle after a long build session. Scope is everything since Cycle 6: a second line built end to end, the Plan phase made schema-specific, trip generation randomised, per-problem number sets introduced, and eleven user-reported defects fixed.

**Agents run:** none. This cycle was run by the main session agent — **the same agent that authored nearly all of the content it is reviewing.** See *Independence* below; that is a material limitation of this entry, not a footnote.

### What shipped since Cycle 6

| Area | Change |
|---|---|
| **Ratio & Rate Rail** | 6 problems, all five station roles + Hub. Line now runs. |
| **Plan phase** | Now dispatches by schema. Ratio problems get a **ratio table** (two rows scaling together); Part–Whole keeps the Model Yard. |
| **The Junction** | New phase between estimate and Engine Room on one-step problems — an ungraded choice between genuinely different routes. |
| **Animated scenes** | Six bespoke illustrations for the ratio line, replacing the unit grid. |
| **Randomised rides** | `stationRoles` became a weighted bias rather than a gate; mixed "Grand Tour" rides across all running lines; any stop count 2–8. |
| **Number sets** | 3–5 curated value sets per problem, chosen per ride, with all downstream text tokenised. Applied to 2 of 13 problems at the time of this cycle; **all 13 as of Cycle 8**. |
| **Terminus Hub** | Asks *which car is missing* on a single-section ride; line and strategy questions reserved for mixed rides. |

### Verification performed

All figures measured in-browser against the live build, not asserted.

- **Schema:** 13 problems, 19 materialisations (number sets expand two problems into four each). **0 errors.** One warning, deliberate: `rr-cordial-mix` has no `stationRoles` because it is reserved as a Hub problem.
- **Mathematics:** every step of every materialisation re-checked — **32 steps, 127 accepted forms, 114 misconception responses. 0 failures.** No accepted form disagrees with its exact answer; no misconception grades as correct; every misconception routes to its own diagnosis.
- **Trip integrity:** 3 lines × 3 routes × 400 seeds = **3,600 trips.** Zero short trips, zero duplicate problems within a trip, zero problems placed in a role they cannot serve, zero Hub-less trips, zero Hubs reused as a station. **Hub novel on both axes: 400/400 in every configuration.**
- **Reachability:** every one of the 13 problems appears across 600 mixed rides. Nothing is dead.
- **Variety** (the point of the randomisation work): distinct trip line-ups per 400 seeds — Ratio Local **111**, Part–Whole Local **270**, Grand Tour Local **398**. Before this cycle those were 1, 3 and n/a.
- **Instruments broken on purpose:** seven planted defects, **7/7 caught** — wrong derived value, missing derived value, a number set that does not divide, `knownTotal` equal to an answer, estimate bracket excluding its answer, `marked` outside range, and a read-3 with no correct option. All cleared on restore.
- **Accessibility:** 0 buttons without an accessible name; live region and skip link present; 27 reduced-motion rules compiled; at 320px there is no horizontal page scroll and no touch target under 44px.
- **Console:** no errors at any point.

### The instrument was wrong once, and it mattered

The estimate-range rule first reported as **MISSED**. It was not broken: the planted defect had been written into the problem's *base* estimate, which `materialize()` overwrites from the number set, so the value under test never reached the validator. Planted in the number set — and separately on a problem with no sets — it fired correctly both times.

Recorded because the first result would have been read as a hole in the validator, and the fix would have been applied to a rule that was already working. **A check that reports a miss is a claim about the instrument as much as the subject.**

### Answer-leak sweep

One numeric hit and four spelled-out hits. **All five read in context and confirmed false positives:**

- `pw-band-brass` renders `9` as a count of **parts**; its step answer is 9 **students**. Same number, different referent.
- `pw-soup-serving` "Three quarters is most of the pot" — the fraction, not the 3-cup answer.
- `rr-market-stall` ×3 — "the two stalls", "Two stalls, two swinging price tags", and an estimate bracket "between two and three dollars each" describing the *first* stall.

No action taken on any. Acting on them would have damaged correct content.

### Rulings

| # | Question | Ruling |
|---|---|---|
| C7-1 | Model Yard blanked its per-part values to avoid leaking step answers, leaving bars with no numbers in them. | **Reversed, on user direction.** Values are now *revealed by marking a part* rather than pre-printed. The leak rule was narrowed to `knownTotal` only, which is still shown before any interaction. A bar model with empty boxes is not a model; the rule meant to stop the site telling students answers had begun stopping it teaching them. |
| C7-2 | Hub novelty was absolute — "no novel Hub problem, no Hub". | **Inverted.** Once stations could draw freely they consumed the Hub's pool and 91 of 300 Part–Whole trips lost their Hub entirely. The Hub is now reserved first and the stations work around it. When the bank is too thin for both, **novelty gives, not the assessment.** Measured at 400/400 novel after the change. |
| C7-3 | `stationRoles` as a hard filter made every line deterministic. | **Relaxed to a weighted bias.** Safe because a station's role only names the stop; it does not change what the station does. Weight tuned by measuring the *distribution* of first stops, not the count of distinct ones. |
| C7-4 | Ratio problems inherited the Model Yard, teaching whole-splitting on a schema that often has no whole. | **Replaced** with a ratio table, and the Plan phase made schema-dispatched so each line can claim its own model. |

### Escalated to the user — decisions only they can make

- **`signalBox.plan[]` is authored in all 13 problems and read by no code.** ~30 strings no student has ever seen. Render it or delete it.
- **Four problems keep blank boxes until marked** because their step 1 asks for exactly the per-part value. The alternative is dropping that step, as was done on the ratio line. Offered; not yet chosen.
- **Number sets cover 2 of 13 problems.** Eleven still have fixed numbers.

### Decision

**GATE 2: PASSED** for the mechanical and mathematical properties measured above, which is all this cycle can honestly certify.

**NOT certified:** the Ratio & Rate Rail has still had **no independent theme, teacher or student pass**, and all six of its problems carry `review.oversight.status: "not-run"`. Nothing in this entry changes that.

### Independence — stated plainly

This cycle was run by the agent that wrote the content. Every number above is reproducible and was measured rather than asserted, but **measurement is not review**: it cannot tell you whether a problem teaches well, whether the tone lands, or whether a fifteen-year-old finds the Junction patronising. Cycle 6 recorded four answer leaks found in brand-new content written by the same agent that had just flagged the pattern elsewhere; the same exposure applies here.

The proper next cycle is the specialist agents run against this work by someone other than its author.

**And still: no real student has used this site.**

---

## Cycle 7b — 2026-07-30 — The specialist review Cycle 7 could not certify

**Trigger:** Cycle 7 passed the mechanical gates but explicitly did not certify the Ratio & Rate Rail: six problems with no theme, teacher or student pass and `oversight: not-run`. User asked for the full cycle to be run over them.

**Agents run:** the `oversight` agent was spawned twice and hit a session limit both times — once after 58 tool calls, once after 11, producing no findings either time. The passes below were run directly. **Same limitation as Cycle 7, and it is the material one: the reviewer wrote the content.**

### Verdicts

| Pass | Verdict | Basis |
|---|---|---|
| math | **PASS** | Answers **re-derived from each problem's own story**, not checked against the stated answer. Every number set re-solved separately. 9 materialisations, 0 mismatches. |
| teacher | **PASS, one defect found and fixed** | See below. |
| theme | **PASS** | Problem text FK grade 2.2–4.8 at 9–12 words per sentence; Ratio Table prose FK 3.3; Junction FK 2.3. No grade level named anywhere. Every animated scene has its caption, every ratio table its a11yDescription. |
| student | **PARTIAL** | Full Ratio Local trip driven live. Not a persona walk-through; no real student. |

### C7b-1 — Option length was a tell (teacher, FIXED)

The correct choice was the longest or joint-longest on **6 of 6** missing-car questions and **3 of 6** Read 3s. `rr-poster-run`'s missing-car answer ran 33 characters against 17 and 25.

This is the same family as the scar already in `teacher.md` — *"You will write the correct option first"* — and **shuffling does not touch it**, because length survives a shuffle. A student could beat chance without reading.

Levelled across the line. Then the correction over-shot: with every correct option shortened relative to its rivals, "always pick the longest" scored **0%**, which is the same tell inverted — *the wordiest option is always wrong* is still a strategy that is not reading. One problem (`rr-timetable-run`) had its correct option deliberately made the longest, so the signal sits near chance in both directions.

Measured, 3000 trials per strategy:

| Strategy | Read 3 | Missing car |
|---|---|---|
| always longest | 16.7% | 38.8% |
| always shortest | 0% | 30.6% |
| avoid the longest | 27.8% | 30.5% |
| **chance** | **25%** | **31.9%** |

Residual: the correct Read 3 option is never the *shortest*. Avoiding the shortest therefore beats chance slightly. Left alone rather than tuned further — chasing it would mean writing deliberately terse correct answers, which costs clarity for a gain smaller than the noise.

### Checked and cleared

- **Keyword strategies:** three regex hits on "means multiply" all read in context and all structural — *"for a ratio that means multiply, not add"* describes the mathematics, not a word-to-operation rule. No action.
- **Hint ladders:** rung 3 never states the answer; rung 4 always does. Across every step of every number set.
- **Ticket Booth:** all four rival lines explained on all six problems.
- **Distractor quantities:** present on all six.
- **`rr-market-stall`'s second ratio table offers `÷ 6`** — the first stall's divisor. Flagged during review, then read: it is a deliberate distractor with the explanation *"That is the first stall's divisor. The move is the same but the number is not."* Correct as written.

### Live trip (student)

Ratio Local through `rr-market-stall`, in the browser: Read 1 blocks empty input; **Read 2 rejects a distractor-only selection** with a real diagnosis; Read 3 and Ticket Booth grade correctly; both ratio tables settle and leave their unknown cells blank; the inverted-rate misconception (0.4) is caught with the right explanation; both steps solve; Arrivals Board reached showing the estimate as typed. No console errors.

### Decision

**GATE 2: PASSED.** All six Ratio & Rate problems move from `oversight: not-run` to `approved`, with theme and teacher recorded as `pass` and student as `partial`.

**What "approved" means here:** the mechanical, mathematical and pedagogical properties that can be measured have been, and one real defect was found and fixed in the process. It does **not** mean an independent reviewer looked at it. Two attempts to get one failed on session limits.

**Still true, and not fixed by this entry:** no real student has used this site, and the four escalations from Cycle 7 remain open — dead `signalBox.plan[]`, blank-until-marked Model Yard boxes on four Part–Whole problems, and number sets on only 2 of 13 problems.

---

## Cycle 8 — 2026-08-01 — Number sets on the remaining eleven problems

**Trigger:** the top open item from the 2026-07-30 handoff. The mechanism existed and was validated per set; it was applied to 2 of 13 problems.

**Result: 13 of 13, four sets each. 52 materialisations, `MF.validate()` clean.**

### What a rider actually experiences

The number that matters is not "how many sets exist" (VERIFICATION §18). It is: *meet the same problem twice — are the numbers the same?*

| | before | now | floor for four even sets |
|---|---|---|---|
| Same problem, two rides, identical numbers | 100% | **25.1%** | 25% |

Measured over 400 seed-pairs, 2175 repeat encounters. Per-set shares run 19–30% against 25% expected, and **all 52 problem+set pairings are reachable** — no set is dead content (§8).

### A verification harness, because manifests are not screens

`tools/sweep.js` (test scaffolding, not shipped) renders **every phase of every problem in every set** — 380 screens — and reports unfilled tokens, render errors, misconception collisions and pre-solve answer leaks. `MF.validate()` reads manifests; the defects this project has actually shipped lived in the composition (§13).

**Both instruments were wrong before the subject was** (§2):

- The station root was appended `display:none`. `innerText` on a `display:none` subtree degrades to `textContent`, so hidden nodes reported as visible — nine false leaks at once, all of them Model Yard values a student only sees after marking a part.
- Forcing the `route` phase on the 15 problems with no `secondRoute` threw on all 15. The real app never goes there.

### Defects found

| # | Found | Fix |
|---|---|---|
| C8-1 | **`rr-van-hours` named step one's answer in the Ticket Booth** — "a number of 45-mile hours". The Ticket Booth runs *two screens before* the Engine Room asks for it. | Figure removed, not tokenised — tokenising a leak only makes it follow the numbers around. |
| C8-2 | Its estimate reasoning gave the long trip as "around three and a half times" a short trip "of two hours" — two figures a student multiplies to land exactly on the final answer. **A leak does not have to print the number.** | Rewritten as a size band. |
| C8-3 | **A bar drawn in the wrong number of parts validated clean.** Planted deliberately; nothing caught it. | `seg1`/`mark1` exposed to `numberChecks`, so the picture is checked against the arithmetic. Now declared on all 13. The same shape as the quilt drawn in twentieths while described in sixtieths (rule 6f) — 6f reconciles the *scene* to the segments and never asks whether the segments are right. |
| C8-4 | `rr-market-stall` set 3 put a bare `4` on the Plan screen — the "− 4" table option collided with that set's first-stall price. **Existed only once rendered.** | Set re-picked. |
| C8-5 | Three estimate reasonings named their answer: `rr-cordial-mix` "somewhere around 20" (answer 20), `pw-cycling-club` "somewhere around 240" (step one's answer), `pw-quilt-colors` "around a third" (answer 0.35). **Rounding a number to itself is not a bracket.** | All three replaced with bounds that hold for every set. |
| C8-6 | `pw-band-brass` carried two misconceptions dividing by 9, needing a headcount divisible by 9 *and* 2 — true only of the original 18. Every other set would have offered `1.333…` as a "common error" that could never fire. | Both **replaced**, not retokenised. |
| C8-7 | Spelled-out numbers throughout — eleven "twenty"s in `rr-timetable-run`, "Sixty-three"/"Thirteen twentieths" in hint ladders, "Fifteen dollars for six bags". A written-out number survives tokenising untouched. | Tokenised or removed. |

Two coincidence traps were also designed out per set: a distractor equal to the value of one bar part (`$48 over 6 weeks` with each eighth worth `$6` — the Model Yard printed them a line apart), and any set where two misconceptions collide. One `rr-bread-dough` candidate set was **dropped rather than patched** because its recipe water and scale factor were both 4.

### Checks proven to fire

Every rule above was planted against and confirmed: wrong derived values, mis-drawn bars, wrong shading, scene groups not totalling the bar, estimate brackets excluding the answer, unfilled tokens, accepted forms not equal to their exact, misconceptions equal to the answer, and two misconceptions equal to each other. All fired; all cleared on restore.

Across all 52 materialisations: every exact answer, accepted form and preferred form grades correct; every misconception grades incorrect and returns **its own authored tag**. 0 problems.

### Live drive

Ratio Limited in a real browser, `rr-poster-run` set 3 (168 posters / 14 minutes), all eight phases: Read 1 blocks an empty box; Read 2 rejects a distractor-only pick with a diagnosis; Read 3's correct option is shuffled off the top; the ratio table offers ÷14, −13, ×14, ÷168 for *that* set; the Plan screen does not contain `12` anywhere; the estimate gate blocks an empty field; `2352` and `182` each draw their own diagnosis and an unknown wrong answer draws the generic one; `12` is accepted with a materialised explanation; the Arrivals Board rebuilds 14 × 12 = 168. No console errors.

### Independence — stated plainly

**Same limitation as Cycles 7 and 7b: the agent that wrote this content also reviewed it** (§16). Every number above is reproducible and was measured. Measurement is not review, and **no real student has used this site.**

---

## Cycle 9 — 2026-08-01 — The Change Line opens

**Trigger:** with number sets finished, the only remaining actionable item on the handoff was the three empty lines. Change was built first because it is the line the site's anti-keyword stance depends on.

**Result: 3 problems, 4 number sets each. 16 problems site-wide, 64 materialisations, `SWEEP.report()` clean across 476 screens.**

### The line is built around one claim

Word problems cannot be solved by keyword. The Change Line is where that gets proved, and it needs all three unknown positions to do it:

| Problem | Missing car | Does "more means add" work? |
|---|---|---|
| `ch-lost-property` | result | **Yes** — the rule succeeds |
| `ch-kiosk-sandwiches` | change | Ambiguous |
| `ch-water-tank` | **start** | **No** — story says "another 180 litres pumped in"; the move is a subtraction |

Letting the bad rule win twice is deliberate. A rule that fails immediately gets discarded as a fluke; one that works twice and then fails is the one a student actually reconsiders. The trap is on the button row of the Plan phase, not just in the answer box — measured firing in all four number sets, diagnosed by name (`keyword-addition`), with the correct answer still grading and the trap never grading as correct.

### New machinery

- **`change-model.js` — the Change Train.** Neither existing Plan model fits `Start ± Change = Result`: the Model Yard splits one whole into equal parts (false here — nothing is cut up), and the Ratio Table scales two quantities together (also false — there is one quantity at two moments). The train is three cars, one missing, and the student picks the *move* that reaches it. It never evaluates: the car reads `? = 460 − 180` and the arithmetic stays the Engine Room's job, the same discipline the Ratio Table keeps.
- **`change-scenes.js`** — three bespoke illustrations, reusing the `rsc-` animation classes and their reduced-motion rules rather than a parallel vocabulary.
- Both reuse the Ratio Table's CSS. Two Plan models that look like two different products is its own defect.

### Defects found, all in the seams

Every one of these was in the *existing* code, exposed by being the first line to have different shape:

| # | Found | Fix |
|---|---|---|
| C9-1 | **`phPlan` decided whether a picture existed by testing for `signalBox.barModel.bars[0]`.** True of every problem written until now — the ratio problems included, because they all kept a bar beside their table. The first problem with a model and no bar would have rendered an **empty Plan phase, silently**. | `Model.applies()` — the station asks the model layer instead of guessing. |
| C9-2 | `Scene.html` routed every `anim` scene to `RatioScenes` and returned `''` for art it did not have — a silent empty frame. | Asks every loaded library; the validator now refuses art no library claims. |
| C9-3 | The validator's scene checks sat behind `if (p.scene && seg)`, so **a problem with no bar model got no scene checks at all** — including whether its named artwork exists. | Existence checks lifted out; only the counts-vs-segments reconciliation still needs a bar. |
| C9-4 | **The route chooser promised stops the line cannot fill.** Local/Express/Limited were hardcoded 5/4/3. The Change Line fills 2 (one of its three is reserved for the Hub), so "Local — 5 stops" delivered 2, with the shortfall reported only in a trip note no student sees. | Only routes the line can run are offered; a line too thin for any of them says so plainly. Verified across all lines: every offered route now delivers exactly its promised count. |

C9-4 is the one worth remembering. It was invisible while every line was thick enough, and it is exactly the shape of §18 — the metric said "trip built successfully" and the student got less than half what they chose.

### Checks proven to fire

New validator rule (`changeTrain`) planted against and confirmed on all five branches: two correct options, fewer than three options, no inverse operation offered, the missing car filled in, no `a11yDescription`, and an option stating a step answer. All fired; all cleared.

The inverse-operation rule is the pedagogical one: a train that does not offer the addition cannot teach that the addition is wrong.

### Measured, not asserted

- **Reachability:** 400 seeds per route — all 3 problems appear, all 12 problem+set pairings reached, a Hub on every trip. No dead content (§8).
- **The Grand Tour** now draws from three lines (partwhole 596 / ratio 505 / change 399 stops across 300 trips).
- **Contrast:** `--line-change` on cream measures **4.77:1** (AA body text); on `--cream-mid` 4.26:1, and the move text renders 23.75px bold, past the 18.66px bold threshold, so AA holds there too.
- **Geometry:** nothing spills the frame in any of the three scenes. The first attempt at this measured `getBBox()` and reported six elements outside the viewBox — those sit in translated groups, so their boxes are local coordinates. **The instrument, again** (§2). Screen rects say none.

### Not certified

`theme`, `teacher` and `student` are **`not-run`** on all three problems, and `oversight` is `not-run`. This entry certifies that the line is mechanically sound, mathematically correct in every set, and renders and grades correctly. It does not certify that the writing lands, that the tone suits a fifteen-year-old, or that the keyword lesson actually teaches — that last one is the line's central claim and **no mechanical check can confirm it.**

Same author-is-reviewer limitation as Cycles 7, 7b and 8. **And still: no real student has used this site.**

---

## Cycle 9b — 2026-08-01 — The passes Cycle 9 could not certify

**Trigger:** Cycle 9 shipped the Change Line with `theme`, `teacher` and `student` all `not-run` — the top open item, and one I raised against my own work.

### Verdicts

| Pass | Verdict | Basis |
|---|---|---|
| theme | **PASS** | Problem text FK grade 3.2–5.0 at 8.8–9.7 words per sentence, inside the site's band. Change Train prose FK 2.5 against the Ratio Table's 3.3. No grade level named. Every scene caption and Change Train `a11yDescription` present in all four sets. |
| teacher | **PASS, one defect found and fixed** | Below. |
| student | **PARTIAL** | Full station driven live; not a persona walk-through. |

### C9b-1 — The option-length tell, again (teacher, FIXED)

**The correct Read 3 option was the LONGEST on 8 of 12 materialisations**, against 25% chance. "Pick the wordiest" beat reading.

This is C7b-1 exactly — and it was reproduced on brand-new content **by the agent that had just written that scar into the review log two cycles earlier.** VERIFICATION §16 says the author is the worst reviewer of their own fresh work and predicts this specific failure. It happened anyway. The rule being written down did not prevent it; running the measurement did.

Fixed by shortening `ch-lost-property`'s correct option from 51 characters to 37. Re-measured, 3000 trials:

| Strategy | Read 3 | Change Train | Missing car |
|---|---|---|---|
| always longest | 33.3% | 32.8% | 33.3% |
| always first | 24.7% | 32.8% | 34.3% |
| avoid the longest | 22.6% | — | 33.2% |
| **chance** | **25.1%** | **32.4%** | **33.6%** |

33.3% is the **minimum a three-problem line can reach without hitting 0%**, which Cycle 7b established is the same tell inverted. `ch-water-tank` keeps its longest correct option deliberately, for that reason.

The Change Train's options are the same length by construction (`58 + 35` / `58 − 35` / `35 − 58`), so they carry no length signal at all. The "avoid the longest 0%" figure that first came out of the harness was an **instrument artifact** — with all lengths equal there is no non-longest option to pick, so the counter never incremented. Not a finding.

### C9b-2 — I shipped dead content while criticising dead content (FIXED)

`ch-water-tank` carried an invented `arrivals.keywordWarning` field. **No code reads it** — the exact class as `signalBox.plan[]`, which this log has escalated four times. Merged into `connection`, which the Arrivals Board does render.

Writing a new dead field while the old one's fate is still an open question was careless, and it was found by a scan for dead authored fields rather than by review.

### Also measured

- **Keyword-strategy regex:** 5 hits, all on `ch-water-tank`, all read in context and all structural — they state the trap in order to refute it, or are tag names and review notes. Same shape as Cycle 7b's three hits. No action.
- **Hint ladders:** rung 3 never states the answer, rung 4 always does — across every step of every set.
- **Correct-option position**, using the real render-time salts (`|read3`, `|car`, `|changemove|`): site-wide first-position share 13% for Read 3 and 38% for the missing car, against 25% and 33% chance. My first attempt used the wrong salt and was measuring nothing — **the instrument again** (§2).
- **Live drive**, `ch-lost-property` set 3 (58 + 35): every gate holds, the Ticket Booth teaches on a wrong car, the Change Train answers a wrong move and then reads `? = 58 + 35` without evaluating it, the answer never appears on the Plan screen, all three misconceptions diagnose correctly. No console errors.

### C9b-3 — The leak scan printed the same ten lines every run

Ten known-benign hits (`rr-market-stall`'s "two stalls" / "two totals") appeared in every report. A check that prints identical noise every time trains you to skim it, and the run that prints eleven lines is the one you miss.

Cleared hits are now **classified, not suppressed**: every hit is still detected, and the report separates *new* from *previously read and cleared*, with the reason recorded per entry so the judgement is auditable. A clearance that stops matching is reported as **stale** — the content moved and the clearance no longer applies.

Proven not to be a loophole:

| Plant | Result |
|---|---|
| Real digit leak on the very problem owning a cleared entry | **caught** (clearance is keyed to id + kind + value) |
| Spelled-out answer, the Cycle 6 shape | **caught** |
| Clearance matching nothing | **reported stale** |

**The first two plants reported NOT CAUGHT and the scan was innocent** — I had planted into `threeReads.read1.modelAnswer`, which `phRead1` only reveals *after* a click, so the defect never reached the screen being scanned. §19 exactly, and the same shape as the Cycle 7 `modelReasoning` case. Re-planted into `ticketBooth.whyCorrect`, which renders immediately, and both fired. The header of `tools/sweep.js` now names the safe places to plant.

### Status

**All 16 problems now carry `theme: pass`, `teacher: pass`, `oversight: approved`.** No problem carries a `not-run` pass. `student` is `partial` on 9 and `untested` on 7.

**The limitation is unchanged and it is the material one: every one of these passes was run by the agent that wrote the content.** Two real defects were found by running measurements rather than by reading, which is the only reason to trust any of it. **And still: no real student has used this site.**

---

## Cycle 10 — 2026-08-02 — Two standing decisions, closed by the user

Both had been escalated repeatedly and neither was an agent's to make.

### C10-1 — `signalBox.plan[]` deleted

36 authored strings across 16 problems, read by no code. **User's decision: delete.**

Gone from every problem, and from `PROBLEM-SCHEMA.md` §5, which now carries an explicit *do not author one* plus the reason it could never simply be switched on: the Plan phase runs **before** the Engine Room, so printing "split the pot into four quarters, then take three" hands over the method on a worked example. What the student needs there is a *representation* — Model Yard, Ratio Table, Change Train — not a recipe. The steps already live in the hint ladder (request-only, escalating) and in `workedExplanation`.

Also removed the derived values that only existed to feed steps deleted below (`mMul4`, `mMul3`, `mMul`, `mDouble`), rather than leave a second generation of authored-but-unused data.

### C10-2 — The redundant first step, dropped on all four

**The defect, stated properly:** the Model Yard prints `each part = N` the moment a student marks a part. On `pw-soup-serving`, `pw-free-throws`, `pw-orders-day` and `pw-band-brass`, step 1 then asked for exactly N.

So **the student who used the model properly was asked to copy a number back, and only the student who had ignored it was doing any work.** That is backwards — it penalises the engagement the model exists to produce. Measured across the whole site: exactly those four problems, no others.

**User's decision: drop step 1 on all four.** Same resolution the Ratio line reached for `rr-timetable-run` and `rr-bread-dough`. The intermediate does not disappear — it moves to hint rungs 2 and 3, which are request-only and escalating, and stays as the `one-part-only` misconception for a student who stops there.

| Problem | Steps | Now asks |
|---|---|---|
| pw-soup-serving | 2 → 1 | "How many cups of soup did they serve?" |
| pw-free-throws | 2 → 1 | "How many shots did she take altogether?" |
| pw-orders-day | 2 → 1 | "How many orders were there for the whole day?" |
| pw-band-brass | 3 → 2 | "How many students are in the whole band?" |

Verified: 16 problems still registered, 64 materialisations, 476 screens, validator and sweep clean; **no step anywhere still asks for a value the bar reveals on marking**; 152 answer surfaces re-checked (every exact, accepted form, preferred form and misconception, with each misconception returning its own authored tag) — 0 problems. All four driven live: the `one-part-only` diagnosis now fires on precisely the value the bar showed, which is the correct relationship.

### A harness trap worth the note

Driving a station by hand with `new Stations.Station(p, role, {}, cb)` renders fine but breaks on the first click: the handlers do `self.m.misconceptions.push(...)`, so an empty metrics object throws *inside the listener* and it aborts before writing feedback. The symptom is an empty feedback panel on a wrong answer — indistinguishable from a missing misconception, and I read it as one for a minute. Pass `{estimates:[],hints:[],misconceptions:[],schema:[]}`. Recorded in the `tools/sweep.js` header. §2 again: the instrument, not the subject.

---

## Cycle 11 — 2026-08-02 — The Test Track

**Trigger, in the user's words:** *"Anytime a student is asked to estimate and there are no activities before calculating the final answer, there needs to be another interactive demonstration to teach them the strategy for that type of problem… the more interaction and animated demonstrations, the more engaged the struggling students will be."*

Measured: **10 of 16 problems** went from the estimate straight to the answer — 3 with nothing at all (all three made single-step by Cycle 10, so this was partly self-inflicted), 7 with only the Junction's prose route choice.

### What shipped

A new phase, `demo`, between the estimate and the Engine Room. `assets/js/testtrack.js`. **The Junction and every `secondRoute` are gone** — not bypassed, deleted, because leaving them authored-and-unread is the `signalBox.plan[]` mistake for a third time.

| kind | line | picture | lesson |
|---|---|---|---|
| `section` | Part–Whole (3) | one bar, cut and shaded | the bottom number cuts the whole, the top says how many you hold — a percent is that same instruction |
| `cross` | Ratio (4) | a 2×2 proportion, diagonals lighting | once a ratio is set, the diagonals multiply to the same thing |
| `drive` | Change (3) | three cars and an engine | where the gap sits decides the direction, and the words never do |

Every kind: **watch a worked example on different numbers, then two questions on your own problem**, each moving the picture. Ungraded. **Nothing is ever calculated** — that is what makes the phase safe, and it is why the first design's parallel example proved unnecessary.

### Two designs were built, rejected by the user, and rebuilt

Both rejections were right, and both are now in `VERIFICATION.md` §27.

- **Parallel mini-example → `section`.** Forty blocks beside a pot of soup added a second whole to hold in mind, and its first option announced the sectioning the student was meant to derive. The percent-to-whole link was never taught.
- **`lock` → `cross`.** Two bars scaling together restated the Ratio Table's own law almost verbatim, one screen after it.

### The answer-leak class landed three times, and each fix was too narrow

Now `VERIFICATION.md` §26.

1. The demo ran on **12 blocks → 3 each → 9**, against a 12-cup pot answering 9. Rule written: check demo numbers against every value in every set.
2. That rule did not cover the cross-multiplying worked example — "2 to 3 is the same as 8 to **12**" on a problem answering 12; "adding gives **15** and 13" on one answering 15. Rule widened to four named fields.
3. That rule missed both, because they also lived in **`a11yDescription`**. Only the rendered sweep caught it. The rule now **walks the whole object**.

**And the leak scan itself had been blind all session**: `(?![\d.])` stopped `2` matching inside `2.5` and also stopped any value matching at the **end of a sentence**. Fixed; the shipped content re-scanned clean, which was luck rather than design.

### Instruments were wrong more often than the subject

Eight separate cases in one day, now `VERIFICATION.md` §25. The common shape: the check and the thing checked were not the same object — hidden vs rendered, manifest vs screen, a string vs a `{value:}`, the whole page vs one component.

I also broke `data.js` outright twice — a comment closed early, and a stray brace closing a block early, which unregistered all 16 problems. Both caught within a minute by `MF` being undefined.

### Verification

40 Test Tracks driven end to end, all four number sets each: worked example plays, a wrong pick teaches without advancing, both questions land, the picture moves, continue is offered. `drive` verified to stop **on** the gap with the slot still reading `?` in all 12. Sweep: 488 screens, 0 leak candidates, 0 validate errors, no console errors. Planted defects fire for every new rule, including one hidden specifically in an `a11yDescription`.

**Not verified, and unverifiable here:** whether any of it holds a struggling student's attention.

---

## Cycle 12 — 2026-08-03 — Non-negotiable 4 amended by the user

**Trigger, in the user's words:** *"I still think it is great for students not to solely or mainly rely on looking for keywords. However, I do think thinking about keywords will be helpful in developing their reading skills… we need to develop a simple checklist that lets the student quickly assess a word problem to see whether one of these five main strategies will work."*

**Agents run:** none. No content changed; this cycle amends specification only. The user ruled directly, which is the correct route for a §7 non-negotiable — Oversight cannot approve one of these alone.

### The rulings

| # | Decision | Written into |
|---|---|---|
| 1 | **Non-negotiable 4 rewritten.** "No keyword strategies are taught as strategies" → **"No word is ever taught as sufficient to choose an operation."** The ban is on the *inference*, and is absolute. Words are taught in three tiers: **names it** (vocabulary — sum, product, per), **asks it** (situation words that terminate in a question — more than, left, of), **lies** (co-occurrence — hazard copy only). The test: *a word may set the question; only structure sets the operation.* | `PEDAGOGY.md` §2.1–2.3, §7.4 · `teacher.md` · `math-reviewer.md` |
| 2 | **The Platform Check approved provisionally.** Four questions run *before* the five lines are assumed. Question 4 has three legitimate verdicts: one line fits · two lines stacked · none of them fits. **The third branch is deferred by the user and must not be built.** User's words: *"Approve for now but we may need to update or rework it."* | `PEDAGOGY.md` §3.7 · `teacher.md` |
| 3 | **§3's scope claim corrected.** "Five lines cover essentially the whole 6–12 word-problem space" → **"most"**. A site that teaches students to check the fit cannot claim everything fits. | `PEDAGOGY.md` §3 |

### The verification consequence

The tier-3 guard has always been a **grep**. New hub copy must quote *"altogether means add"* in order to refute it, so the grep will fire on legitimate content — and the obvious response, softening the grep, is how the whole thing unwinds.

`VERIFICATION.md` **§29** now scopes it: the exemption is a **data tag** (`tier: "lies"` on a hub section), never a reading of intent; an untagged hit is a defect however well-intentioned the prose (§16 — the author is the worst judge of this); a tier-2 entry with fewer than two examples taking **different** operations is a defect, because one example *is* a keyword strategy; and no operation name may sit adjacent to a tier-2 word in student-facing copy. Plus the §13 check: render the hub, because two examples that do not fit on one screen have not taught a contrast.

**§29 is the first rule in that document written before its failure rather than after one, and it says so in its own text.** Every other rule there is a scar. This one is a prediction, which makes it the weakest and the likeliest to be argued away — recorded here so that the next person to find it inconvenient knows it was expected.

### What was deliberately not done

No hub content, no `tier` renderer, no Platform Check widget, no verdict-3 material. The Learning Hub rework comes later in the project on the user's schedule, and building content ahead of it would add more work reviewed only by whoever wrote it — §5's standing open item and this project's largest recorded weakness.

**Not verified, and unverifiable here:** whether a struggling student can actually run a four-question check under load, and whether tier 2 survives contact with a student who was drilled on tier 3 for six years. Both are §12 — the missing check.

---

## Cycle 13 — 2026-08-03 — The Platform Check, built at Read 1

**Trigger, in the user's words:** *"Let's develop the checklist and add it to the first reading… Hopefully it will be obvious after using the checklist why this word problem is in this section. We may need more than 4 questions but I agree this should be a simple mental task."*

**Agents run:** none — built directly. Recorded here because §6 says a sign-off by the author is not independence, and this one is not.

### The finding that decided the design

`stations.js` prints the line name **and its equation** in the station header on every phase, Read 1 included. So the screen already says *"The Change Line · Start ± Change = Result"* while the student does the first read. Any check asking *how many kinds? does anything happen?* is therefore answerable off the furniture — three stations into a themed trip the answers are constant for the whole line, and a student never reads a word. That is the "could a student answer this without reading?" class, and it would have shipped as a five-tap widget.

**So the check asks for the evidence, not the category.** The story's sentences become tappable and the student taps the sentence that gives the situation away — which varies problem to problem and cannot be guessed from the header. Mr Fraction then names the kinds, the shape and the line. The other four questions are still taught, as the strip *Kinds · Moments · Shape · Question* and in the resolution, which runs them aloud on this story. What the student **does** is one tap. That is also the answer to "a simple mental task."

The full five-question version, and the three verdicts including *none of the five*, belong in the Learning Hub where naming the line is an honest question. Unbuilt, by the user's decision.

### Shipped

- `stations.js` — `PLATFORM` (per-line question, coaching and shape sentence), `phRead1` rebuilt in two movements, `problemHTML(highlightQ, pick)` renders sentences as real `<button>`s keeping `.s` and `data-speak` so read-aloud and "chunk sentences" keep working.
- `read1.platformCheck` — `{sentence, why, kinds}` on **all 16 problems**, authored against each stem rather than derived from the line.
- `data.js` — four validator rules. `PROBLEM-SCHEMA.md` §3.1. `app.css` — prose-shaped tappable sentences.
- `dispatch.html` / `dispatch.js` — three new authoring fields.
- `tools/sweep.js` — `st.expandAll`.

### Two things worth keeping

**The no-number-words rule.** Read 1 is the numberless phase, and `sweep.js` scans rendered text for spelled-out values. *"One kind, two moments"* would fire on every problem answering 1 or 2 and add permanent cleared noise, which is how a real leak gets skimmed past. The copy says the **shape** instead of counting it — *"a single kind of thing, with a before and an after"* — and reads better for it. Two of my own UI strings ("four things worth knowing", "that's the one") had to be rewritten for the same reason. Now a validator rule.

**VERIFICATION §7 reproduced exactly, by me.** Adding a required field broke the Dispatch Office — every teacher-authored problem would have reported *"Needs fixing"*, which is the failure that rule was written about, in the same file. Caught by going to look because the rule says to. Dispatch now authors the field, a blank explanation degrades to still-to-do rather than broken, and both teacher mistakes were driven in the browser to confirm it.

### Verification

| | |
|---|---|
| `MF.validate()` | 16 problems, 64 materialisations, **0 errors** |
| Planted defects | **7 of 7 caught**, all cleared on restore — missing, out of range, is-the-question-sentence, digit, spelled number ×2, too short |
| `SWEEP.report()` | **488 screens, 0 render errors, 0 leak candidates** |
| Sweep sees the new copy | 64/64 Read 1 screens show the check **and** the verdict — and a digit plant and a spelled plant into `platformCheck.why` both came back as `[read1]` hits, so the zero above is a real pass and not a blind instrument |
| Interaction, by hand | wrong pick coaches without resolving · picking the question sentence gets its own answer · second wrong pick shows it rather than grinding · correct pick resolves and returns the story to prose · the phase cannot be skipped |
| All 64 screens driven | every one resolves, names **its own** line, and contains no digit |
| Accessibility | tappable sentences are real buttons, keyboard-focusable, `data-speak` intact (read-aloud still says "some number"), chunk-sentences still blocks them, no overflow, no sideways scroll, min height 36px |
| Dispatch Office | clean by default; both teacher errors reported correctly |

**Instrument errors, mine, both caught by suspecting the instrument first (§25):** a leak plant that injected `[object Object]` because `step.answer` is an object, and a station driven with `stationRoles[0]` where `rr-cordial-mix` has an empty array — the sweep's own guard was right and my copy of it was not.

**Not verified: appearance.** The browser pane was not compositing, so no screenshot was possible. Everything above is geometry and behaviour. **Whether it looks right is the user's call**, and on this project every visual defect has been found by the user after passing geometric checks.

**Also not verified:** whether a student who has ridden three stations of the same line still reads the story, or just taps the sentence in the position that worked last time. The tell moves between problems, which is the defence, but nobody has watched a student do it.

---

## Cycle 14 — 2026-08-03 — The first read becomes two screens

**Trigger, in the user's words:** *"We are not there yet. Let's review the first reading reflection question and replace it with 5 checklist question. then on the next page have the students identify the sentence or sentences that indicate. Also, on that second page you should show the following chart that you already created."*

**Agents run:** none. Same caveat as Cycle 13 — author and reviewer are the same.

### What changed

Cycle 13 put one tap at the end of Read 1. That was too little, and it left the five questions taught only in prose. Now:

| | |
|---|---|
| **`read1`** | The five questions as tapped choices — Kinds · Moments · Things · Shape · Question. **The free-text retelling is gone.** Mr Fraction's reading of the story now lands *after* the five instead of before, so the comprehension anchor and all sixteen `modelAnswer`s stay live rather than becoming authored-and-never-rendered (§9). |
| **`platform`** (new phase) | Pick **every** sentence carrying the signal — a before and an after cannot fit in one sentence, so Change problems need two, as does the quilt and the two-stall ratio. Then the resolution, then the map with the student's row marked. |

`platformCheck.sentence` → **`sentences[]`** across all 16. The answer key for the five questions is the **schema itself** — each option declares which lines it is true of — so it cannot drift from `problem.line`.

**The fifth question is the honest exit.** *"It takes more than that"* and *"None of them really fits"* are both offered and both answered as real possibilities a student should keep — *"not every problem you meet fits these lines"* — before saying this one does. Every current problem is single-line, so the right answer is always the first; that weakness is why the teaching sits in the wrong-answer copy.

### Two defects found while verifying, one of them mine

**1. Stacked event listeners — mine, and reachable by a student.** `renderPhase()` replaces the host's *children* but keeps the host, so a listener bound to the host survives every re-render and they accumulate. Worse than waste: the older copy disables the buttons first, and every newer copy begins `if (b.disabled) return`, so the **current** render's handler never records anything. The phase looks dead while a previous render quietly does the work. `App.rerender()` re-renders the live phase whenever a student toggles *"always show numbers"* — so this was a real path, not a sweep artifact. Fixed by binding to a container built fresh with the phase.

**2. The quilt's picture leaked its fractions through the numberless read — pre-existing, and worse for screen-reader users.** The scene legend read *"blue 2/5 · red 1/4"* beside masked prose, and its `aria-label` said *"8 of 20 blue; 5 of 20 red"*. Every file was correct alone: `scene.js` drew what it was given, `stations.js` masked what it rendered, the manifest was right. The leak lived in the composition (§13), and **nothing on this project was looking** — the leak scan only ever compared screens against *answers*, and these are givens.

`Scene.html(p, masked)` now suppresses the legend values and the counts in the description. And the sweep has a new check that is not about answers at all: **any digit on `read1` or `platform` is a defect**. Both fire on plants and clear on restore.

### Verification

| | |
|---|---|
| `SWEEP.report()` | **552 screens · 0 render errors · 0 unfilled tokens · 0 collisions · 0 leak candidates · 0 numbers on a numberless screen** |
| `MF.validate()` | 16 problems, 64 materialisations, **0 errors** |
| New checks proven | disabling the scene masking brings the quilt leak straight back on both screens; a planted digit in `platformCheck.kinds` is caught; both clear on restore |
| Validator | the no-number-words rule **caught four of my own new strings** while authoring ("Those two are…", "each one") — it is not decorative |
| All 64 driven end to end | five questions land, model answer appears, page two reached, every required sentence needed, resolution names **its own** line, chart marks **its own** row, no digit anywhere on either screen |
| Re-render safety | phase re-rendered three times, still fully functional |
| By hand | partial selection says there is more to find · picking the question sentence gets its own explanation · toggling a sentence off works · empty selection blocked · page one cannot be skipped |

**Instrument errors, mine, three this cycle** (§25 again, and the ratio is not improving): a leak plant that injected `[object Object]` because `step.answer` is an object; a station driven with `stationRoles[0]` on the one problem whose array is empty; and a chart-detection regex that failed because CSS `text-transform: uppercase` changes what `innerText` returns. All three looked like product defects for a minute.

**Not verified: appearance.** The browser pane would not composite, so there is no screenshot. Everything above is behaviour and geometry. **Whether the five-question screen is too long, and whether the map reads as a payoff or as homework, is the user's call.**

---

## Cycle 15 — 2026-08-03 — Full review of the two-screen first read — **IN PROGRESS**

**Trigger, in the user's words:** *"Run this through all the agents and summarize the feedback to me before changing anything. In other words, run another cycle with all the agents."*

**Scope:** everything shipped in Cycles 13–14 — `read1` (five tapped questions, retelling deleted), `platform` (new phase: multi-sentence evidence + map table), `platformCheck` on all 16 manifests, the shared `CHECK`/`PLATFORM` tables in `stations.js`, and the new CSS.

**Agents run — five, in parallel rather than in sequence.** The sequence in `oversight.md` exists so a pass is not spent on content that is about to change; nothing is changing during this cycle, because the user asked to read the findings first. `oversight` itself was **not** spawned: it would have spawned its own copies of these four, and this log records three oversight runs dying mid-cycle on session limits. **I am taking the adjudication role, which means this cycle has no independent coordinator — see §6 and rule 16.**

| Agent | Verdict | Blocking findings |
|---|---|---|
| teacher | **FAIL** | Q5 false on 6 problems · all five answers legible off the station header · options never shuffled ("tap the first" scores 4/5 on Part–Whole) · 4 ratio problems reject the sentence they then quote back · 4 Part–Whole keys need a sentence opening with an unresolved pronoun |
| math | **FAIL** | Same Q5 defect, derived independently · "nothing happens" false as *wording* on 9 stories (keying is sound) · `kinds[0].no` states the other option's meaning · market-stall Things contradicts its own Ticket Booth · **"a ratio needs two different units" is false and taught on 6 surfaces** (pre-existing) · `platformCheck.why` leaks gated Ticket Booth answers |
| theme | **FAIL** | Contrast passes everywhere (5.04–6.68:1, all five lines — no restriction warranted). No `aria-pressed` until first tap · `.row-here` is 1.3.1 colour-only · the "you may need more than one" instruction is 14px · *"A pairing that keeps its shape"* not comprehensible to the target reader |
| student | **DO-NOT-SHIP** | **Answered five stations, 5/5, without reading a word** · a failed platform check renders a green ✓ · scene `aria-label` leaks the masked number on 4 problems · Read 2's distractor is last 6/6 · Model Yard prints per-part values before the Engine Room asks · "Map" from inside a station destroys the trip with no way back |
| art-director | **NOT PRESENTABLE** | `.pickable` is `inline-block` (button default, never overridden) so sentences cannot flow — six stacked blocks, not prose · picked state is a solid slab · map table lands at y=1430, below the fold, and `finish()` deletes the evidence the table is about |

*(All three were re-run on the user's instruction after dying on session limits; the art-director's second pass rendered real pixels over CDP, which is the first appearance verdict this feature has had.)*

### User-found, during the cycle — and it confirms both agents

> *"RR Section — Train Word Problem — The Platform Check — Second Question — Moments Question — There is Confusion: Something is happening as the Train is moving — we need to reword the question."*

Rule 11 again. The user hit the Moments defect by riding the site, in the same hours that teacher raised it as MAJOR and math as CRITICAL 3 from source. **Three independent findings of one defect.** It is not arguable.

### Questions put to the agents that I could not answer myself

1. **The eleven single-sentence tells.** Three Change problems name two sentences; eleven problems name one. **I chose every one of them and then verified my own choice** — §16, the author reviewing their own fresh work. teacher and math were both asked to go stem by stem through all sixteen and find sentences a student could defensibly tap and be told "Not quite."
2. **The shared answer key asserts per LINE, not per problem.** The claim I trust least: ratio is keyed to *"Nothing happens — it all sits still"*, while `rr-van-hours` has a van driving for hours and `rr-poster-run` a press running for minutes. If that is wrong it is wrong for a whole line at once — the class, not the instance (§14).
3. **Whether deleting the free-text retelling cost a comprehension step** that showing `modelAnswer` afterwards does not replace.
4. **Whether screen one can be passed without reading**, and whether it is dead weight by the third station on a line — the header names the line on every phase, so the five answers are constant within a line.
5. **Whether the tappable sentences still read as prose** rather than as a form.

**Recorded before the verdicts land, deliberately.** Three oversight runs on this project have been cut off mid-cycle and lost everything they had found, because each held its findings to write up at the end.

### Pass 1 of 3 — content and logic — DONE 2026-08-04

| Fix | Was |
|---|---|
| **Moments reworded** — *"Does any amount end up different from how it started?"*, and the keyed answer now reads *"No — the amounts stay as they are, even if something is moving"*, confirmed with *"A train can run all day and still be running at the same rate."* | *"Does anything happen to it?"* → *"Nothing happens — it all sits still"* → *"Nothing moves."* Said about a moving train. **The keying was always right; only the wording was false.** |
| **Question five is about situations, not steps** — and its reply now teaches the distinction instead of denying the student's reading. | *"there is a step in between"*, keyed always-wrong, answered *"a single move from what you are given"* — false on the six problems declaring `steps: 2`. |
| **Options shuffled** per problem and question, seeded `id\|check\|<question>`. | Source order. **"Tap the first option" scored 57.5% against a 40% baseline — 4/5 on Part–Whole — and the student agent rode five stations on one fixed tap pattern, 5/5, without reading.** |
| **Four ratio problems now key the invariance sentence too** (`rr-poster-run`, `rr-van-hours`, `rr-bread-dough`, `rr-timetable-run`). | Each marked *"runs at a steady speed"* wrong and then quoted it back as the reason one click later. |
| **Five leaked Ticket Booth answers removed** from `platformCheck.why`. | `pw-free-throws` printed *"the whole is the very thing missing"* against `unknownCarAnswer: "the whole"`; `rr-market-stall` handed over the plan before the Plan phase. **`ch-water-tank` also disarmed its own Signal Failure** — the trap PEDAGOGY §2.2 names this problem for. |
| **A failed check no longer renders as success** — `finish(gotIt)`. | `finish()` always drew `msg-go` and a green ✓, so "select every sentence, press Check twice" looked exactly like getting it right. |
| **Over-picking gets its own reply.** | Every wrong shape got the same generic coaching, so a near miss and "select everything" read identically. |
| **`PEDAGOGY.md` §3.7 verdict 2 corrected** — steps ≠ situations, with the defect recorded as the reason. | *"Two lines, stacked. Multi-step."* The conflation was mine and in the spec first; the code inherited it. |

**Verification.** `MF.validate()` 0 errors · `SWEEP.report()` 552 screens, 0 render errors, 0 leak candidates, 0 numbers on a numberless screen · all 64 materialisations driven end to end through both screens, 0 failures · **"tap the first option" now scores 40.0% against a 40.0% chance baseline**, and no two problems on a line share a tap pattern (7 distinct on Part–Whole, 6 on Ratio, 3 on Change) · the failure path renders `→ Here is what carries it`, not a tick.

**The validator caught four of my own replacement strings** for spelled-out numbers ("One of those…", "the same thing twice") before they shipped. Second cycle running in which that rule has earned its place.

### Pass 2 of 3 — presentation — DONE 2026-08-04

**The headline fix, and the agent's prescription was half right.** The art-director diagnosed the tappable sentences correctly — they rendered as six stacked blocks, not prose — and prescribed `display: inline`. That is necessary and **not sufficient**: a `<button>` is an **atomic inline-level element**, so it never breaks across lines whatever `display` says. Measured: the rule was in the cascade, no other rule touched `display`, and it still computed `inline-block`.

So the element changed. The sentences are now `<span role="button" tabindex="0" aria-pressed>`, with Enter and Space handled by hand in `phPlatform` — the price of the span, paid because this phase's entire job is getting the story read as a story.

**Proof it worked:** on `pw-soup-serving` the tappable sentences produce client-rect counts of **2, 2, 1, 2, 1, 2** — *identical* to the same sentences rendered as plain spans one screen earlier. Before the fix they were 1, 1, 1, 1, 1, 1 at identical widths.

| Also fixed | Was |
|---|---|
| Underline via `text-decoration` (paints per line fragment) | `border-bottom` — painted once around the box, so a wrapped sentence was underlined on its last line only |
| `box-decoration-break: clone`, padding, and a 2px cream ring on the picked fill | A solid rectangle. At 360px, *"a 263×138px solid red slab"* that read as an error banner |
| `transition: background` **deleted** | Transitioned the property that carries state — and made the state unreadable in any harness without a frame clock, which is how it drew a false CRITICAL |
| `finish()` moves focus to the map heading and scrolls it into view | The payoff sat at y=1430 with the fold at ~1300; the only visible change on click was a button vanishing |
| Picks are **kept, marked and inert** through the reveal | The evidence was deleted at the exact moment a table headed *"What you found"* appeared |
| Map: display-face line names, a **"You are here" chip + `aria-current`**, 1px rules, last rule removed, header 14.2px → ~15.5px | A default bordered table whose "you are here" was a 16-value tint plus a bar on one cell |
| **Restacks as cards below 560px** | `min-width: 520px` in a 262px scroller — half the table unreachable, line names chopped to *"Equa Grou Expre"* |
| `platform` has its own `.section-head`; both screens carry a "part one / part two" eyebrow | A bare 16.8px `h3`; the two screens shared their first ~1050px and read as the same screen twice |
| `read1` `h3` raised above body size; `.choices` indent reset; a **stop-dot rail** down the five cards | The question was set *smaller* than the story it asks about, with three competing left edges |

**The rail carries no numerals.** Both screens of the first read are numberless, so a digit would be a masking defect and the spelled-out forms are barred by the same rule. Stop dots say "five stops on a line" without counting.

**Verification.** 0 validate errors · 552 screens, 0 leaks, 0 numbers on a numberless screen · all 64 driven end to end, 0 failures, now also asserting `display: inline`, `role`, `tabindex`, `aria-pressed`, `aria-current`, the chip, and that picks survive the reveal · Space and Enter both toggle and Space does not scroll · at **320px** the table fits with no horizontal scroll, all five line names are whole, the page does not scroll sideways, and a picked sentence wraps into **3** text-shaped fragments.

**Appearance is with the art-director for a second pass** — it renders real pixels over CDP, which is the only appearance verdict available here. **The rail in particular was built blind** and I have asked for it to be pulled if it does not work.

### Pass 3 of 3 — accessibility — DONE 2026-08-04

| Fix | Was |
|---|---|
| **Every `.feedback` panel is `role="status"`** — 16 of them across `stations.js`, `model.js`, `app.js` | **No live region anywhere.** Every teaching moment on the site — the ✓, the misconception diagnosis, the coaching — was silent to a screen reader. The Model Yard already had `role="status"`, so the pattern was in the file. |
| **Focus moves to the feedback** when a control disables itself — Platform Check, Read 3, Ticket Booth, Arrivals | Focus dropped to `<body>` every time. With no live region, a student pressed a button, heard nothing, and was thrown to the top of the document — five times per station on screen one alone. |
| **Icon scenes light nothing while masked, and their `aria-label` stops counting** | `"3 of 10 tenths of the day packed, 7 still to do"` announced beside prose reading *"some number"*, on **four** problems — and three filled boxes out of ten is the masked number to anyone who counts. |
| **The unit grid renders every cell unknown while masked** | Eight cells coloured blue out of twenty states the fraction as plainly as printing it — the same leak as the legend, one layer down. |
| The Platform Check instruction is body-sized | 14px `.hint-text`, which is right for chrome and wrong for the sentence telling you what to do. |

**This is the class I claimed to have fixed and did not.** In Cycle 13 I found the quilt's legend leaking `2/5`, fixed `unitHtml`, and wrote *"fix the class, not the instance"* into the log. `Scene.html` has **two** branches. I repaired one. The other four problems went on announcing their numbers for a full cycle, and my own new numberless check reported **0** the whole time — because it reads `innerText`, and **`innerText` excludes `aria-label`**.

So the instrument was widened too: `SWEEP.render()` now also collects every `aria-label` on the screen, and `numberless()` scans what is **announced** as well as what is **shown**. Proven by planting: reverting the masking produces **16 hits** across both numberless phases, including `"NUMBER ON A NUMBERLESS SCREEN: 4, 10, 6"` — the exact leak that reported clean before. Restores to 0.

**Verification.** 0 validate errors · 552 screens, 0 leaks, 0 numbers on a numberless screen in **either modality** · all 64 driven end to end, 0 failures, now also asserting focus never lands on `<body>` · all five scenes measured: 0 lit while masked, counts return when revealed (4, 5, 3, 3, 13).

**Known and not fixed:** the masked scene captions still read *"the filled ones were packed before lunch"* while nothing is filled. The caption is authored per problem and is correct once revealed; making it mode-aware needs a second authored string per scene. Left as a note rather than fixed silently.

### Art-director re-check — the first appearance verdict this feature has had

Re-run against the fixed build, rendering real pixels over CDP. **`platform`: SHIP. The map table: SHIP** — *"the best-composed thing I have seen on this site"*. **The rail: NEEDS WORK, and do not pull it.**

Its evidence on the paragraph, which is the call that mattered: fragment counts `2,2,1,2,1,2`, sentence 0 ending at x=186 and sentence 1 beginning at x=193 **on the same line**, and a picked sentence cloning into 2 fragments at 1280 and **4** at 360 — *"ragged like a highlighter"*, with nothing resembling the old 263×138 slab at either width.

Its nits, all applied:

| | |
|---|---|
| Masked blanks stood a full line-box tall — abutting at 0px on consecutive lines and **overlapping by 1px** at 1280, reading as one damaged column | 34px → **18px**, smallest gap between stacked blanks now **16px** |
| The blank inside a picked sentence was `--ink-muted` brown on the line's red fill — *"a hole punched in the highlight"* | Cream at 55%. It is `aria-hidden`, so restyling costs nothing |
| **"Right now the rail is decoration"** — five identical dots state "there are five things", which the five cards already state | Dots now **fill as each card is answered** — answered, not correct, and never the only signal. Rail raised to `--border-strong`, and a 15px tick bridges the measured 21.5px gutter so it reads as stops **on** a line |
| `h3` at 20.14px against 18.05px body — *"raised arithmetically, not perceptually"* | **23.18px** against 19.38px |
| The map's third column ran the full 1090px | Capped at **900px** |

**Verification after the nits.** 0 validate errors · 552 screens, 0 leaks, 0 numbers on a numberless screen in either modality · all 64 driven end to end, 0 failures, now also asserting all five rail stops fill and focus never strands.

**Still the user's call, and the agent said so itself:** whether these screens look right to a fifteen-year-old in a live browser. Its verdicts are single rendered frames — no motion, no hover, no focus in flight.

**Not fixed by pass 1, and it is the finding that matters most:** shuffling kills the *positional* shortcut, not the *header* one. The station header still prints the line and its equation above every phase, so the ANSWERS remain constant within a line even though their positions no longer are. A student who has ridden two stations of a line still knows all five answers. **Screen one is not yet doing what it claims to do**, and fixing that is a design decision, not a bug fix.

---

## Cycle 16 — 2026-08-04 — Per-problem Platform Check questions, Change Line only

**Trigger, in the user's words:** *"the yes and no feedback needs to relate back to the word problem - not be generic and always the same. This is where teaching happens."* Then, on the plan: *"build the three Change problems first."*

**Agents run:** none. Author and reviewer are the same, again.

### What it is

`read1.questions` — an optional per-problem layer over the shared `CHECK` table, keyed by stable question and option ids. A problem may replace the question text and any option's `text`, `yes` or `no`. **`lines` is never overridable**, so authored copy can be wrong about tone but never about the answer.

The user asked for the feedback. The build went one step further, to the **questions themselves**, because that is the only version that closes the review's deepest finding: generic questions have the same answer for every problem on a line, and the station header names the line above them, so a student two stations in can answer all five without reading. Shuffling fixed the positions. Only naming this story's quantities fixes the answers.

| | |
|---|---|
| Generic | *"What is being counted in this story?"* → *"Everything here is measured in the same stuff."* |
| `ch-water-tank` | *"This story counts litres of water, and it also counts taps on the platform. Is the question about a single kind of thing, or about different kinds locked together?"* → *"The taps are scenery. Everything the question is about is water, measured in litres, in the same tank."* |
| and on a wrong tap | *"That would mean pumping water in changed the number of taps. The taps sit there whatever the tank is doing."* |

**The best entries use the problem's own distractor** — the taps, the shelves, the opening days. An irrelevant number becomes the teaching instead of scenery to be ignored.

Built for **the three Change problems**. The other thirteen fall back to the shared copy, which is why the fallback still has to be good.

### The mistake worth recording

The first attempt authored the block one level too deep, as `platformCheck.questions`. Nothing read it, nothing rendered differently, and **`MF.validate()` reported zero errors** — because the whole block is optional, so a field in the wrong place is indistinguishable from a field that was never written. It surfaced only because the screen still showed the generic wording.

**An optional field in the wrong location is invisible to every check that exists.** The misnesting is now an explicit error, along with unknown question ids and unknown option ids — a typo in any key would otherwise fall back to the generic copy and look entirely fine.

### Verification

`MF.validate()` 0 errors · `SWEEP.report()` 552 screens, 0 render errors, 0 leaks, 0 numbers on a numberless screen · all 64 driven end to end, 0 failures · the three Change problems ask **five distinct questions each**, all different from one another and from the generic set, while `pw-soup-serving` correctly still asks the shared question.

**Four planted defects, all caught, all cleared:** a digit in an override, an unknown question id, an unknown option id, and the misnesting. **And the no-number-words rule caught four more of my own strings before they shipped** — "this one", "one counter". That rule has now paid for itself in every cycle since it was written.

### User-found, same day — a word the map had already claimed

> *"the moment question with the umbrella word problems asks about a rail, and there are no rails in this particular question"*

`ch-lost-property`'s Moments question opened *"The rail at the start of the week, and the rail now."* The word does appear in the stem, once, as scene-setting — but every other string I wrote for that problem says **"the pile"**, so the question was inconsistent with its own neighbours. And this site has a **Ratio & Rate Rail**: on a railway map, "the rail" is a line, not a coat rail. Rule 11 again — found by riding, not by any check here.

Fixed to *"The umbrellas at the start of the week, and the umbrellas now."*

**The rule, which is general:** never name a story object with a word the map already uses for a schema. `line`, `rail`, `loop`, `express`, `change`, `compare` are all spoken for.

**Then done, on the user's instruction:** "rail" → **"rack"** across all seven content strings in `ch-lost-property` — the stem, `sentences[1]`, the scene caption, the Read 2 relationship, both change-train explanations and a Test Track answer. The comment recording the old wording was deliberately left alone; a blanket file replace would have rewritten the history along with the content.

Verified: **zero** `rail` strings survive in any of the four materialisations, and zero on any of the 36 rendered screens (4 sets × 9 phases). Sentences still concatenate to `text`, so validator rule 4 holds.

**Not verified: appearance, and whether this actually teaches.** The questions are longer than the generic ones, and screen one was already the longest screen in the ride — whether naming the quantities makes it read as *this story* or merely as *more words* is a judgement no check here can make, and the student agent has not seen it.

---

## Cycle 17 — 2026-08-04 — Acting on the review: three passes, and a file corruption

**Trigger:** the Cycle 15 findings, taken in the order the user chose — content and logic, then presentation, then accessibility.

### Pass 1 — content and logic
Question five reworded from **steps** to **situations** (it was false on the six problems declaring `steps: 2`). The Moments question rewritten after the user hit it on a train — *"Does any amount end up different from how it started?"*, answered *"the amounts stay as they are, even if something is moving."* Options **shuffled**: "tap the first" fell from 57.5% to **40.0%** against a 40.0% baseline, and no two problems on a line now share a tap pattern. Four ratio problems stopped rejecting the sentence they then quoted back. Five leaked Ticket Booth answers removed from `platformCheck.why`, including one that disarmed `ch-water-tank`'s Signal Failure. A failed check stopped rendering as a green tick.

### Pass 2 — presentation
The tappable sentences were `<button>`s, and **a button is an atomic inline-level element**: `display: inline` computed back to `inline-block`, so sentences could not break across lines and the paragraph rendered as six stacked blocks. Changed to `<span role="button">` with Enter/Space by hand. Measured after: client-rect counts `2,2,1,2,1,2` — identical to the same sentences as plain spans. Plus `box-decoration-break: clone` on the picked fill, the map landing in view instead of at y=1430, picks surviving the reveal, and a card restack below 560px.

**Art-director re-check, on real pixels: `platform` SHIP, map table SHIP** — *"the best-composed thing I have seen on this site"* — **rail NEEDS WORK, do not pull it.** Its nits applied: masked blanks were a full line-box tall and overlapped by 1px; the blank inside a picked sentence was brown on red, *"a hole punched in the highlight"*; the rail dots now fill as each card is answered.

### Pass 3 — accessibility
**No `.feedback` panel on the site had a live region** — every ✓, diagnosis and piece of coaching was silent to a screen reader, and focus dropped to `<body>` on every answer. Fixed across 16 panels in three files. And the leak class **I claimed to have fixed and had not**: `Scene.html` has two branches, I repaired one, and four problems went on announcing *"3 of 10 tenths of the day packed"* for a full cycle — while my own numberless check reported 0, because it read `innerText` and **`innerText` excludes `aria-label`**. The scan now reads both.

### The corruption
A PowerShell fix-up script held its replacements in nested arrays. **PowerShell flattens a single-element array**, so `$pair[0]` was a *character*, and `$t.Replace('w','h')` ran across whole files. Seven files, 17–1143 characters each; `rr-timetable-run.js` read *"Chosen for the Shitchyard… the hhole lesson."*

Recovered **byte-identical, comments included**, from the browser's HTTP cache via `fetch(url, {cache:'force-cache'})`, repaired by delta-indexed character restoration with a length assertion first. It cost a large part of the session and **turned on a cache one reload would have evicted.** Now `VERIFICATION.md` §29: bulk content edits go through `Edit`, never a shell — this project has no version control, so every scripted write to `content/` is irreversible.

---

## Cycle 18 — 2026-08-04 — Six user-found defects, and the pattern underneath them

**Trigger:** the user riding the site. Every item here was found on screen, and only one was findable by any check on this project.

| # | Found | Fix |
|---|---|---|
| 1 | The Moments question called a moving train motionless | Reworded; keying was always right, only the words were false |
| 2 | *"a rail"* in `ch-lost-property` — on a site with a Ratio & Rate **Rail** | → "rack" across all seven content strings. **Never name a story object with a word the map uses for a schema** |
| 3 | The bread problem refused `[2,4]`, the correct set | Answer sets were **too wide** on five problems; the invariance sentence is worth noticing, not requiring |
| 4 | The Engine Room printed the answer above the box asking for it | `fadeLevel: "worked"` rendered `workedExplanation` pre-answer — 3 problems × 4 sets = **26 screens**. Deleted; the Test Track already demonstrates on different numbers |
| 5 | Part–Whole animations blank — *"all square with ?s, no colour"* | Masking applied to countable grids and not to `anim` scenes, so one line lost its pictures. Restored |
| 6 | Platform Check 2 too thin after the trim | Three stems split so both givens no longer share a sentence; **all 16 now need at least two** |

**#4 is worth its own note:** the leak scan was named and scoped `PRE_SOLVE` and `solve` was not in it — but the Engine Room's *initial* screen is pre-solve by any honest reading. Widening the scan **first** flagged all 26 instances unprompted, before anything was fixed.

**And the pattern across #3, #5 and #6, which is now `VERIFICATION.md` §31:** each began as a leak I fixed by deleting the thing that leaked, and each deletion emptied a surface that was doing work. Cycle 7 recorded this once. This session added three, all written after reading the rule and two while quoting it. The control is not the rule; it is stating **what remains on the screen** after any removal.

**Also now recorded:** §32, enumerate the complement when a rule touches only part of the content — the scenes failed in the gap between the branch I masked and the branch I did not. §33, derive rather than author — `platformCheck.sentences` is now computed and asserted, which ended an argument I had got wrong in both directions.

**Not verified, and unchanged:** whether any of this teaches. No student has used the site.

---

## Cycle 19 — 2026-08-04 — The Compare Line opens

**Trigger:** *"Are you ready to build The Compare Line?"* → *"Fix the Model Yard leak first"* → *"Write it"* → *"Extend the line"*.

**Agents run:** none. Author and reviewer are the same throughout, and every Compare manifest records `theme` and `student` as **unreviewed** rather than claiming a pass.

### Shipped

**`compare-model.js`** — the Plan phase for the line. Two bars on a shared track, the student names the **referent**, and the gap then appears bracketed and carrying the question rather than a number. Widths derived from the number set. Three shapes: both given, larger unknown, smaller unknown.

**`testtrack.js` kind `compare`** — the demonstration between the estimate and the Engine Room, added after the user reported *"no secondary lesson between estimating and calculating."* Worked pair on 8 and 13, which belong to no problem on the line.

**Three problems**, and the arc between two of them is the line:

| | unknown | "more" means |
|---|---|---|
| `cp-late-trains` | difference | *(the question avoids the word)* |
| `cp-ticket-queues` | larger | **add — and it works** |
| `cp-bench-count` | smaller | **add — and it fails** |

Verified by driving it: `n1 + n2` is **accepted** on problem 2 and **refused** on problem 3, with near-identical wording in both stems. That is `ch-lost-property → ch-water-tank` rebuilt for Compare.

### What the new line broke in old code — §24, exactly as predicted

`model.js` carried a warning in capitals: **"BOTH BRANCHES MUST BE ADDED IN PAIRS"**, naming `html()` and `wire()`. There are **three**. `phPlan` consults `applies()` first, so CompareModel was added to the two the comment named and the Plan phase rendered with no picture and no error anywhere. **A wrong note about where the dispatches live is worse than no note** — the comment now names all three and says how each omission fails silently.

### Three picture defects, all found by eye

None of them was findable by the checks that existed, and two were found by the user after I had reported the surface verified.

1. **`parseFloat("2/3")` is 2.** Caught before shipping — it would have drawn a bar three times too long and validated clean.
2. **Every row was its own grid with an `auto` value column.** Tracks came out 887px and 794px because `"?"` is 12px and `"31 benches"` is 104px, so equal percentages drew unequal bars — **the unknown rendered longer than the amount it is measured against**, saying the opposite of its own problem. Fixed columns; the drive now asserts tracks share a left edge and a width, and that drawn ratio matches true ratio (worst case now 0.003 off).
3. **The hatched difference was a box tacked past the end of the bar**, so the dashed `?` outline enclosed only the part the student already knew. A bar's outline now spans its own total with the hatching as an overlay. Same construction existed in `testtrack.js` and `compare-model.js`; both fixed.

**The pattern worth keeping:** the checks I had written proved each bar's *number* was right. Nothing checked that two bars shared a scale, and nothing checked that a label's boundary matched its referent. Geometry proves geometry; a picture telling a consistent story is still the user's call, and they made it three times.

### Verification

19 problems · 76 materialisations · **660 screens, 0 render errors, 0 leaks, 0 numbers on a numberless screen, 0 validate errors.** All 12 Compare screens driven through both first-read screens, the Plan model, the Test Track and the Engine Room, with no answer reachable before it is asked. Every other line still gets its own model — 3 change trains, 7 yards, 6 ratio tables.

**Not done, and it is the next session's brief:** problems 4 and 5, and the animated illustrations. Compare is the only line with no scene.

---

## Cycle 20 — 2026-08-08 — The Compare Line gets its pictures

`assets/js/compare-scenes.js`: `delays`, `queues`, `platforms`, wired into `Scene.html`'s dispatch, the validator's library list and `index.html`. All three existing Compare problems now carry an `anim` scene on all eight pre-Arrivals phases in all four number sets — Arrivals carries no scene on any line, which was checked rather than assumed.

### The rule this line adds, and why the other two never needed it

Ratio and Change obey "no numerals anywhere" nearly for free: a press throwing posters has no natural count in it. **A Compare scene is a picture of the two quantities themselves.** Draw the benches and you have drawn the answer; draw the queue and it can be counted off the screen the first read is deliberately withholding. Neither picture would contain a digit and both would leak.

So the objects are drawn uncountable by construction — benches and queuers run off **both** edges of the frame and the queuers overlap each other; `delays` draws minutes, which cannot be counted off a picture at all. And there is no bracket, gap marker or shared baseline in the file: `compare-model.js` measures the gap from the live number set, and a second picture of that relationship at an authored width would be right for set 1 and silently wrong for the other three.

### Two defects in the new art, both found by measuring, neither findable by any existing check

1. **The queue did not overlap.** Body 18 wide at a pitch of 25 — a 5px *gap* — under a comment asserting the figures overlapped. Measured 6.6px apart on screen. It was a tidy line of separately countable people, which is the one thing that scene may not be. Body is now 22 at a pitch of 17, measured overlap 5.0.
2. **The local platform had a visible last bench.** A half-pitch offset between the bench rows reads better on paper and put the lower row's last bench at 275..301 — stopping 19px inside the frame — on the problem whose answer is a count of those benches. Offset is now 11, and both rows are cut by both edges: measured -24..2 / 298..324 and -13..13 / 309..335.

**Both comments were wrong before the geometry was.** The file said what the drawing was supposed to do, and the drawing did something else. Nothing but `getBoundingClientRect` was ever going to say so.

### And the instrument was wrong twice while finding them

`getBBox()` on a transformed `<g>` reports the group's **own** user space — every bench came back `x=0`. Switching to `getCTM()` landed in the svg's **viewport** space, which has the viewBox scale baked in, so a 26-unit bench measured 24.4 and the right-hand frame edge sat at 300 rather than 320; the straddle test was comparing against an edge that was not there. Only `svg.getScreenCTM().inverse() × node.getScreenCTM()` gives viewBox units. **A 26-wide bench measuring 26 is now asserted in the harness before any of its readings are believed** — §25, again.

### `tools/sweep.js` — the spelled-out scan was inert for most of this line

`WORDS` was a hand-kept map of about thirty values ending in the words *"extend this list as content needs it."* Nobody ever did. A caption reading *"thirty-one benches"* swept **clean** on all four sets and both numberless screens, while `"31"` produced eight hits — 31 was not on the list, and neither were 23, 26, 27, 29, 34, 41, 43 or 49, which is most of the Compare Line's numbers.

The words are now **derived** (0–999, tolerant of `twenty one`/`twenty-one` and an optional *and*), so there is no list to fall behind. Confirmed by plant: `"twenty seven"` in `cp-ticket-queues`'s Ticket Booth fires on **set 3 only** — the set whose answer is 27 — and clears on restore. Widening it produced **no new hits on any existing content**, so nothing had been hiding behind the gap.

**Still open and deliberately not done:** `numberlessBreaks` scans read1/platform for digits only, so a spelled-out *given* on a numberless screen is unchecked. Fixing it fires on `"Two stalls"` and `"Two trains"` in legitimate captions and needs the cleared-hits mechanism — a scope call, recorded in `HANDOFF.md` §0.2.

### Verification

19 problems · 76 materialisations · **660 screens, 0 render errors, 0 leaks, 0 numbers on a numberless screen, 0 validate errors, 0 console errors.** Both validator rules for `anim` scenes were planted and confirmed to fire and clear for the new library (bogus art name; missing caption). Under forced reduced-motion rules all 34 animated elements stop, none becomes invisible, and each frame still fills its area.

**Geometry was measured; appearance was not judged.** The browser pane would not composite screenshots this session, so no one has looked at these three pictures. `tools/preview-compare-scenes.html` opens them in Edge at both column widths for that call.

## Cycle 21 — 2026-08-08 — The Compare Line finishes: multiplicative, percent, and a model with no validation

`cp-parking-spaces` (multiplicative, referent unknown — *"times as many"* means divide) and `cp-hot-drinks` (percent, larger unknown, two steps). The line is complete at five problems, 21 problems site-wide, **732 screens, 0 errors, 0 leaks, 0 numbers on a numberless screen.**

### Two new shapes in the Plan model, and why neither could ride an existing one

`compare-model.js` had two shapes. It now has four, and the two additions are different pictures rather than variations:

- **`times`** — a multiplicative compare states no difference, so there is nothing to mark off the end of a bar. The referent is drawn once and the other amount as N seamed copies of it, which is what makes *"four times as many as WHAT"* answerable from the picture: the thing being copied is the referent. Riding the additive shape would have drawn a gap the story never mentions, at a width derived from nothing.
- **`percent`** — looks like the additive gap and is not one. An additive difference is *given* and can be marked off; this one is what the student is working out. So the extra takes its width from the stated percentage **of the referent bar** and carries the percentage as its label. Asserted across all four sets: the drawn extra is the stated percentage of the referent bar to within 0.005%, and it starts exactly where that bar ends.

The seams and the extra carry **no values**. N blank copies beside a total is the relationship the story states; the same copies labelled is the division, done, before the Engine Room asks for it.

### The finding: `compareBars` had no validation at all

The ratio table is validated. The change train is validated. The Model Yard is validated. The compare bars — owning the Plan phase on a line that had already shipped three problems — had **not one rule**. A typo in `referent` names a bar that does not exist, so every pick is marked wrong, the student is told *"not that one"* three times, and the Plan phase cannot be passed. Nothing here would have caught it: the validator did not look, and the sweep renders phases but never clicks them.

Twelve rules added, covering bar count, keys and labels, bars bound to nothing, more than one unknown, the referent resolving to a real bar, `whyWrong` naming a real bar and never the correct one, the three shape tokens being mutually exclusive and resolving, factor above 1, percentage above 0, `unknownIs` present on additive shapes, and the a11y description. **Every one was planted, fired and cleared.**

*Three of four models validated is exactly how this kind of gap hides — §32, enumerate the complement.*

### Two defects found in the new work, both by driving it

1. **The referent bar's `aria-label` read *"— the amount the other is measured against"***, which is the answer to the question that screen asks, read aloud to the one student who cannot see the picture to check. Sighted students must work out which bar is being copied; so must that one. It says only what is drawn now. Same class as the quilt's `aria-label` reading *"8 of 20 blue"* beside masked prose, and it survived that fix because it lives in a different file.
2. **The `spaces` scene measured 28 units low in a 130-unit frame** — a bottom-heavy picture beside three that fill theirs. Forecourt lamps now occupy the top band; extents are 11–125, 0–120, 12–121, 8–118, −4–120 across the five.

### The validator caught the author, twice, exactly as designed

Both new manifests tripped the Platform Check rules on first run: `{{n1}}` rendering as a digit on a numberless screen, and a dozen spelled-out number words across the five questions. That rule exists because this project has shipped both before. Nothing was argued around; the copy was rewritten.

### An instrument note worth keeping

A factor-of-1 plant reported nothing and the rule was fine — the plant went into `problem.numbers`, which **every number set overwrites during `materialize()`**. Planted into the set, it fired immediately. Same lesson as §19 in a new shape: plant where the value lives at the moment the check runs.

### The framing decision on percent, which was the user's

`PEDAGOGY.md` §3.2 says percent lives on this line. Percent **change** is one thing at two moments — its honest Platform Check answers are *changed* and *stacked*, on a station header that says Compare, and the stacked verdict branch is unbuilt and deferred. Building it would have been the site arguing with itself on one screen. The user chose percent **comparison**: two amounts, both present, neither changing, where *"twenty per cent more than WHAT"* is the referent question in its least escapable form. Percent change is recorded as open in `HANDOFF.md` §0.2.

### Verification

21 problems · 84 materialisations · **732 screens rendered, 0 render errors, 0 leaks, 0 numbers on a numberless screen, 0 validate errors, 0 console errors.** Both new problems driven by hand through Plan, Test Track and Engine Room: wrong referent picks refused and taught, correct picks revealing a gap that carries the question and never a number, both Test Track questions marking the picture, and every misconception firing with its own diagnosis and tag. The five scenes measured in viewBox units — every countable row cut by both frame edges, no two rows sharing a pitch, no `<text>` node anywhere.

**Geometry was measured; appearance was not judged.** The Browser pane still would not composite screenshots. `tools/preview-compare-scenes.html` shows all five scenes in Edge at both column widths.

---

## Cycle 21 — 2026-08-08 — Equal Groups Express opens, and the fifth line is running

**All five schemas now have content.** `groups-model.js`, `groups-scenes.js`, a `groupsModel` validator block, and five problems: `eg-crate-bottles` (total unknown), `eg-mail-sacks` (groups unknown), `eg-carriage-seats` (size unknown), `eg-bunting-ribbon` (fraction × whole), `eg-water-cans` (fraction division — the keystone `PEDAGOGY.md` §3.3 names).

### The rule that shaped the model, and it is new

**The picture may never draw as many groups as the answer, when the number of groups IS the answer.** Tiling a total with eight boxes when *"how many fit?"* is the question does not illustrate the problem, it performs it — a student counts the boxes and never divides. So `groups-model.js` branches on which quantity is missing:

| unknown | what it draws |
|---|---|
| `total` | all the groups, each labelled; the bracket carries "?" |
| `size` | all the groups, each carrying "?" — safe, the count is a given |
| `groups` | the total, **ONE** unit against it, and it stops |

Verified on the real content: the two groups-unknown problems draw **1 box**; the other three tile. `parseFloat("2/3")` is 2, so the fraction parse is separately tested — ⅔ against 4 litres renders at 16.667%, not the 50% the naive parse gives. That is the exact value the keystone problem turns on.

### Three defects in the new art, found by measuring before content depended on them

1. **`sacks` had a visible last bag** — the row stopped 12 units inside the right edge, on a line where *how many groups* can be the answer.
2. **`bunting`'s flags straddled neither edge** — the first was wholly off-frame and the second wholly inside, so the row visibly *began* just inside the picture.
3. **`SACK_W` was declared 40 against a path that draws 28.** A width constant disagreeing with its own geometry is what produced defect 1.

**And my own measurement was wrong once**: the repeater filter was set at `width > 20`, which silently excluded bunting's 16-wide pennants and reported "0 repeaters" rather than a fault. §25 again — the check and the subject were not the same object.

### `groupsModel` was validated on the day it was written

Deliberately, because 10f exists only because `compareBars` shipped on three problems with nothing checking it. `repeater` names the choice the student must tap; a typo makes every pick wrong with no error anywhere and a Plan phase that cannot be passed, and the sweep renders phases without ever clicking one. The block also refuses a token for the *missing* quantity — a token for the answer is the answer, sitting in the manifest one render from the screen.

### The authoring trap this line has and the others do not

**The word "one".** The Platform Check screens ban number words, and this schema is *about* one group: "one crate", "one after another", "every one of them" all read naturally and all fail. Seven were caught by the validator across two problems. Say "a crate", "in a row", "they all". Recorded in `eg-crate-bottles` beside the copy.

### The discrimination that had to hold in both directions

`shape: repeat` is keyed to `groups` alone, and `cp-parking-spaces` argues at length that multiplicative compare is **not** a repeat. Both arguments must stay true, so the Equal Groups copy is written against it: **the groups here are separate real things that build a total; there, exactly two things exist and one is measured against the other.** The `cut` responses carry the Part–Whole distinction — a whole cut into *different named shares* versus identical shares, which is the only reason a single division answers.

### Verification

**26 problems · 104 materialisations · 892 screens — 0 render errors, 0 leaks, 0 numbers on a numberless screen, 0 validate errors, 0 scene geometry faults.** All five problems driven through a real `Stations.Station`: every Plan model taps through (wrong pick teaches, right pick reveals), every correct answer is accepted, and every signature misconception fires with its own diagnosis — added-instead-of-multiplied, subtracted-instead-of-divided (twice, on the two different divisions), numerator-only, denominator-only.

**An instrument error worth recording:** the acceptance harness dispatched a `submit` event, and the Engine Room uses a *button*. Every answer came back "not accepted" until that was fixed. Suspect the instrument first.

**Known gap, not claimed as a decision:** none of the five carries a Test Track. `eg-carriage-seats` and `eg-water-cans` are the strongest candidates on the site — the two divisions are exactly the confusion a demonstration addresses, and the keystone's whole value is whether its surprise lands.

---

## Cycle 22 — 2026-08-09 — Test Tracks, richer prose, the hubs rebuilt, and a bug found three times

### What the user found by riding it

`eg-crate-bottles` went **estimate → arithmetic with nothing interactive between**, its first lesson was static, and its illustration had "only a blinky light". All three were fair, and the first was self-inflicted: the manifest carried a comment *justifying* the missing Test Track on grounds the handoff already lists as a known gap on six other problems. **Restraint is not a reason to ship less.** A `groups` Test Track kind now exists and all five Equal Groups problems have one; the Plan tray lays its boxes down one at a time, because on that line the repetition *is* the lesson and a tray that arrives complete shows only the result of the act.

### Richer prose on all 26 problems

*"More descriptive adjectives and details"* against a standing *"less reading"* — resolved as **richness is word choice, not word count**. `THEME` §3.1.5 exempts problem text from the reading-level cap; `AUTHORING.md` sets the real limit — *if the vocabulary is the obstacle, you are testing reading, not reasoning* — so every adjective is everyday and picturable. Three things that break silently when a story is rewritten, all verified across 26 problems: **sentence COUNT** (indices into `problem.sentences` from `platformCheck.sentences` and `questionSentenceIndex`), **`text` versus `sentences.join(' ')`** (authored twice, drift silently), and **new number words** on the numberless screens.

One adjective choice worth recording: `cp-bench-count` uses **busy/quiet**, not long/short. That problem's trap is that the wording points the wrong way, so a physical size hint would answer the question. *Description may add colour to a story; it may not answer it.*

### The hubs

All three are paged journeys now (`assets/js/hub.js`): a rail showing every topic at once, a diagram and a tap on every page, the checklist as one object, nothing gated or scored. The vocabulary became its own hub, `word-board`, because a word list on this site is a hair's breadth from the keyword poster the project exists to replace — **so the framing is page one, not a footnote**. The Shunting Yard moved out of `app.js` into `hub.js` so there is one implementation rather than one per renderer.

The **Equal Groups / multiplicative Compare** discrimination was folded in. No answer-key change was needed: the Platform Check already separates them on **Things**, not Shape. The two Plan pictures were measured and are not confusable — two stacked bars with 2px hairline seams and no inner labels, versus one row of separated 139px labelled boxes with a bracket.

### The bug that appeared three times in one day

A **hardcoded array of three scene libraries** that silently exempted a fourth: the preview's family walk (showed 14 of 19 and called itself complete), the preview's self-check (expected 14, counted 19, and shouted SOMETHING DID NOT LOAD at a healthy page), and — worst — **`tools/sweep.js`'s scene-geometry check**. Every art in `groups-scenes.js` was written, shipped and swept **without ever being geometry-checked** while the sweep printed "scene geometry faults: 0 (none)". A clipped weather vane sat at y −10 in a 0..130 frame across four number sets and five clean runs.

**`0 faults` and `0 subjects` print identically.** All three now discover libraries. Confirmed by planting a clipped rect into a `GroupsScenes` art and watching it report, then clear.

### And the vane itself

The user's words: *the spinning animations do not make sense*. Right twice over — `rsc-roller` is a continuous 360° turn, which is what a wheel or belt roller does and not what a weather vane does, and it was clipped by the ceiling. Replaced with motion that means something: the tap drips into a puddle **on the ground** (never into a can — a can filling is a group being built, and that problem's Platform Check is keyed to "no amount ends up different"), and the flower beds the story mentions finally exist, swaying. That needed `rsc-sway`, the missing other half of `rsc-swing`: swing pivots about the top of its box, which is right for a hanging sign and upside down for anything rooted to the ground.

### Verification

**26 problems · 104 materialisations · 912 screens — 0 render errors, 0 leaks, 0 numbers on a numberless screen, 0 validate errors, 0 scene geometry faults, 0 console errors.** All three hubs driven: 22 pages, 20 taps, the tool computes (4 and 6 → GCF 2, LCD 12), the self-checks mark. Home-page hubs measured on one centred row; hub rails measured centred.

**Two shortcuts taken and then undone rather than left:** removing the vocabulary block first renamed the key and left 80 lines of dead data under a misleading name; removing the old tool first wrapped 57 lines in `if (false)`. Both are properly deleted.

---

## Cycle 23 — 2026-08-09/10 — reverse percent, and the two Cycle 15 blockers

### The percent keystone

`ch-barrier-count` — reverse percent, on the **Change Line** with `surface: "percent"`. Saturdays busier by ▮%, ▮ through the barriers last Saturday, how many before. The trap is that taking the percentage off the number you were handed looks like an answer and is not one; it can never coincide with the real answer, which is provable rather than lucky — the trap is N(1−r), the answer is N/(1+r), equal only at r = 0.

**It closed an open item instead of working around it.** Percent change had been deferred because its `fit` answer would have to be *stacked* — but that objection was about the **Compare** Line, where the station header says Compare and the story is a Change. On the Change Line both `moments: changed` and `fit: onekind` are honest and nothing is bent.

**Two pictures of one story, deliberately:** the double number line is the percent SURFACE (the given sitting past the hundred per cent, which is the whole reason the trap fails), and a `section` Test Track is the METHOD. Not the `drive` Test Track this line owns — drive teaches direction, and a student who takes 20% off the finish has the direction right and the referent wrong, so it would have demonstrated the move they already make.

**Three defects in code that predated it**, §24 for the fifth time: `percentLine` had **no validator rule at all** on an already-shipped problem (rule 10h now; eleven planted, all fired, all cleared); its picks were **never shuffled**, so they rendered in authored order with the correct one first; and **end labels hung off the card** — measured at 772px, `cp-hot-drinks` put "40 cold drinks" fifty pixels outside its own card and had since it shipped. Plus `percentAt`, because "busier by 20%" puts the known amount at 120% and no token says so.

### The two Cycle 15 blockers, both fixed

**Map destroyed the trip.** `renderMap()` opened with `trip = null` and the top-bar pill called it directly — one tap, anywhere, no confirmation, no way back. Looking at the map is now non-destructive and offers the trip back by name and stop. The map's own copy had been false all along: it advertises the hubs as somewhere to drop in *"during"* a trip, and every hub is reached through that screen.

**Look Back could only ever run on a correct answer**, so the site's flagship scenario — estimated 40, computed 400, caught it — was unreachable. There is now a way through with a wrong answer, and the three constraints on it are the design: **last step only** (the estimate is an estimate of the FINAL answer, so offering it earlier would be a trick question), **earned, never free** (the whole hint ladder or three wrong answers — a button present from the start is a bypass, §4), and **not an exit** (one control, back to the Engine Room). The board it reaches never prints the answer and never grades; it asks the one question a student can answer for themselves, and the disagreement does the teaching.

**Two things measured rather than asserted.** That the route back is not a trap: across all 27 problems, **every one of the 140 steps** ends its hint ladder by stating the answer outright. And the agreement rule the student is told — *more than twice the other and they disagree* — is the rule actually applied, confirmed at the boundary in both directions.

**The new screen was invisible to every scan**, which is the sweep's own standing lesson arriving again. It is now a synthetic phase `check-unsure`, and in `PRE_SOLVE`: a board reached *unsure* is pre-solve however it is spelled. Turning it on found **eight real hits** first run, on `pw-helmet-savings` and `pw-band-brass`. Read in context, all eight are `questionCheck` naming an EARLIER step's value as a warning about the commonest wrong finish — a number the student has already produced themselves to have got there. Encoded as a **rule** (on that screen only the last step and the final answer count), not as eight cleared entries; a hand-kept exemption list is the defect class this project already has five files of.

### Verification

**27 problems · 108 materialisations · 1056 screens** — 0 render errors, 0 validate errors, 0 unfilled tokens, 0 misconception collisions, 0 numbers on a numberless screen, 0 scene geometry faults, 0 new leaks, 0 console errors. Every new rule planted and confirmed to fire and clear. Both fixes driven through the real app, not synthetic stations, including Map pressed *from* the new board and resumed.

**One instrument error worth recording, because it is the project's dominant failure mode.** A stalk-alignment measurement reported 10–17px drift on every tick of the percent line; it was measuring against the line's border box rather than the axis the percentages are relative to. Re-measured correctly: 0px. And a leak plant that came back NOT CAUGHT was `PRE_SOLVE` correctly excluding the ordinary Arrivals Board — the instrument, twice, before the subject.

---

## Cycle 24 — 2026-08-10 — the percent card finished

**The map card, the Ticket Booth question and the last three problems.** Item 3 is done: five problems across four lines, its own route, its own colour and marker, and a booth that asks which of the five is hiding underneath. Full detail in `ROADMAP.md` §3a–§3c.

### What the build shook out of code that predated it

**The station header was printing the answer** to the booth's new question — `.station-desc` renders the line and its form above every phase, which was harmless for as long as the student always already knew the line. **`STOPS` has no `percent` entry**, so handing the route key to `legMap` throws and takes the station down. **`percentLine` had no validator rule at all**, and when one was written it exempted `unknownIs: "percent"` from needing a mark position — an exemption that would have shipped a blank Plan phase, caught while designing a problem that wanted that mode.

### The measurement that mattered most

`pw-seats-reserved` draws a carriage, and the seats ARE the quantity. Seat backs were 34 wide at a pitch of 24 — overlapping, uncountable, exactly as the comment claimed. **Each carried a headrest 22 wide at the same pitch, and 13 of 17 stood completely clear of their neighbours.** The row of seats could not be counted and the row of headrests sitting on it could. **A picture is only as uncountable as its most countable part.**

It was found by measuring the wrong element first — a filter that caught the strap rings rather than the seats — noticing the number was about straps, and measuring again. The same pass found `fares` at three animated elements, which the standing instruction calls thin.

### Discovered, not listed — the sixth instance, headed off

Part–Whole needed the site's fifth scenes library, because its usual unit grid derives from a bar model and a percent problem has none. Both remaining hardcoded library lists — `Scene.html`'s dispatch chain and the validator's artwork check — now **discover** `*Scenes` globals, which `tools/sweep.js` already did. This is the first library on this project added without editing a list somewhere.

### Verification

**30 problems · 120 materialisations · 1196 screens — every check at zero, no console errors.** All twelve new number sets re-derived; every step graded; every misconception distinct, reachable and correctly tagged; every estimate bracket holds its answer. The percent route builds 4-stop trips drawing only percent problems, all five reachable and balanced across 300 seeds. Correct-option position measured on all three choice surfaces and no slot collapses in either direction.

---

## Cycle 25 — 2026-08-10 — The Percent Yard

**The fourth hub, eight pages**, and the last thing on the roadmap before Challenge Mode. Detail in `ROADMAP.md` §3b.

**Its whole design problem was not becoming a sixth situation.** A student who learns "percent problems go on the Percent Line" has been handed *see this symbol, go here* — a keyword strategy with extra steps, and worse than an ordinary keyword because it is always true and so never gets falsified.

So the argument is made structurally rather than in a disclaimer: the three sub-type pages **reuse the `change`, `compare` and `partwhole` diagrams from `five-situations`, unchanged**, so the student sees the same five shapes with a per cent sign laid over them several pages before the hub says so. Four new diagrams were added to `hub.js` for the ideas percent actually adds; `percentline` is deliberately the picture `percent-model.js` draws at the Drafting Table.

**The defect worth recording.** `percenthundred` carried an `rsc-bounce` group holding two paths at `stroke-width: 0` and `opacity: 0`, left from an earlier idea. **It counted as an animated element on every check and moved no pixels** — an animated nothing passes a count. Found by testing that each animated element encloses something with a visible fill or stroke, rather than by counting them.

**And a measurement left open rather than fudged.** Correct-option position across all 28 hub taps is 11 first / 9 last against 9.3 by chance — fine site-wide. The per-hub split is not: `fraction-yard` has the correct option **last on 5 of its 6 taps**, so "always tap the bottom one" scores 83% there. Three alternative salt formulas were measured and each merely relocates the cluster to another hub. Picking the string that flatters one number is salt-shopping; a real fix assigns the slot by construction, which is a change to shared machinery and a decision rather than a tidy-up.

**Verified:** all 8 pages render with art and a tap, all 24 options clicked — wrong ones teach and disable, right one settles and locks — rail jumps work, the walk reaches "8 of 8", and the self-checks mark right, mark wrong, and leave a blank box blank. 30 problems · 1196 screens · every check at zero · no console errors.

---

## Cycle 26 — 2026-08-10 — The map, grouped

**The homepage was one undifferentiated grid of seven cards**, so the map's most important claim — that there are FIVE situations and everything else is a way of travelling across them — was something a student had to already know in order to see. The Grand Tour and the Percent Line each said "not one of the five" in their own blurb, which is a caption doing a layout's job.

**Two groups now, and the grouping carries the meaning.** *The five situations* on a single row — Compare, Equal Groups, Ratio & Rate, Change, Part–Whole, in that order — then *Special lines* underneath: the Grand Tour, the Percent Line, and the Challenge Line. `SITUATION_ORDER` is authored rather than taken from `Object.keys(MF.LINES)`, because that object's order is an implementation detail and this is a teaching sequence; every key in the registry is still checked in, so a sixth schema breaks loudly here rather than quietly vanishing (§8).

**The Challenge Line is announced, not built** — `ROADMAP.md` item 6. Unhighlighted: no line colour, dashed edge, the site's existing disabled dimming, and an "under construction" pill in the same `.soon` style a line with too few problems uses. **It carries no `data-line`**, which is the point rather than an oversight: `disabled` is why it cannot be pressed, and having no route key is why it could not go anywhere if something got past that. Verified against a forced bubbling click that ignores `disabled` — the map does not move.

### Three things measured rather than eyeballed

- **The row was ragged.** The `li` stretches to the row height but the button inside it did not, so cards ended at 155–175px in the five and 202–250px in the specials. `height: 100%` plus `align-content: space-between` makes every card flush AND drops the call-to-action pill to the bottom of each, so the pills align across the row as well as the frames.
- **The breakpoint is 1000px, not the 900 its neighbours use, and the number came from measuring.** At 900 the five cards are 163px and the names wrap to three lines — a different number of lines each, so the row reads as ragged text rather than as a set. At 1000 they are 182px and all but one name fits in two. Below that it falls back to the ordinary responsive grid: one row is a desktop shape, and forcing it onto a phone gives five cards too narrow to read.
- **A rule that looked applied and was not.** `.line-card-soon { border-style: dashed }` was silently overridden by the base `.line-card`'s `border-left: 10px solid`, **because the base block is declared later in the file at equal specificity** — the exact trap this stylesheet already documents three hundred lines above, which I had read earlier the same session. Computed `border-left-style` came back `solid` while the source said dashed. Fixed by scoping to `.map-lines .line-card-soon`, the same remedy the file already uses.

**Verified:** five on one row and three on one row at 1000/1024/1280/1440; graceful 3+2 at 900 and single column at 375; ticket and description return on mobile where the card is full width again; no card overflows and the page never scrolls sideways at any width; all markers unique after the Challenge card's first draft doubled the Ratio Rail's ◆. Every line still routes, both specials still route, all four hubs still open. 30 problems · 1196 screens · every check at zero · no console errors.

### Two spacing defects, both user-found on the screen, both then measured

Neither was visible to any check here — `VERIFICATION.md` §5 and the standing note that whether something *looks* right is the user's call.

- **The orange pill touched the right edge of the top cards.** Measured: 30px inside on the left, **1px** on the right. Two causes stacked. `.map-lines .line-card` sets `padding-right: 0` — in the two-column layout the ticket needs that room and the pill's own right margin substitutes for it — and the five-up rule then zeroed that margin, so nothing was holding the pill off the border at all. Restoring the padding got it to 30/21; the last 9px is the card's **asymmetric border**, a 10px coloured stripe on the left against 1.5px on the right. The base `.line-card` already carries `+ 8.5px` for exactly this and the comment above it says why. With the compensation added back: **30/30 on all five**, and the line names are now centred on the card's visible middle rather than 14px right of it.
- **Both rows overhung the page.** `width: min(1180px, 96vw)` was written to escape the 64ch reading measure a `<ul>` inherits, and overshot the column it lives in: at 1280 the content column runs 62→1202 and both rows ran 62→1242. Flush left, 40px past on the right, which `margin: 0 auto` cannot centre because the box is wider than its parent — so it read as lopsided rather than as a deliberate full-bleed, and the last special card finished **38px from the window edge**. `width: 100%` gets the same escape and lines the rows up with their own headings.
- **And the specials were sized backwards.** At full column width three cards inflated to 385px against the five's 218 — nearly double the size for the group that matters less. Capped at `min(920px, 100%)` and centred: **299px each, 110px inside the column on both sides, 188px from the window edge.**

**Left alone deliberately:** the special cards' pill sits 30/17 rather than 30/30. That is the shipped two-column layout, where the right inset comes from the pill's own margin and the ticket sits hard against the border by design. It is not touching, so it is not the reported defect, and matching it would narrow the text column on three cards that carry a description the five do not.

---

## Cycle 27 — 2026-08-10 — Published

**The site is live: https://jtaylor-cloud.github.io/MrFractionWordProblemExpress/**

Verified against the deployed URL, not the working folder: stylesheet applied, `MF` defined, **30 problems, 4 hubs, 0 validate errors**, loader clears, five-and-three map rows correct, all ten art files 200, every line and both specials route, all four hubs open, the Challenge card inert. Mobile re-checked on the live origin at 375px — no horizontal scroll, no touch target under 44px, hub rail dots at exactly 44.

### It shipped broken first, and the reason is now rule 34

Before upload, all 67 referenced paths were verified twice — case-exact against disk, then over HTTP, all 200. Both passes were sound. The site still went live completely broken: unstyled, stuck on the loading screen, nothing interactive.

`assets/` and `content/` **had never been committed.** The ten images had gone to the repository root instead of `assets/art/`, which is the Factory's layout — that site is a single HTML file, and the same upload habit was applied to a site with a folder tree. GitHub's drag-and-drop uploader flattens silently when files are selected rather than a directory being dragged.

Nothing about the checks was wrong. They verified *the local folder is internally consistent*, which was true and useless. **Local disk is not the deployment**, and no instrument pointed at this machine could have answered the question that mattered.

### The README became a product document

Rewritten against the sister site's shape at the user's direction: what it does, the five lines, special lines, hubs, design priorities, accessibility, mobile, tech, running it, licence. Removed — the internal review-status hedging, the build-failure anecdotes, the Edge-specific instructions, and the classroom-testing caveat.

**That caveat is not lost**, and it should not be: it remains in `VERIFICATION.md` §12, `HANDOFF.md`, `PROCESS.md` and this log, which is where the project's own honesty rules require it. A public README and an engineering record are different documents with different jobs.

Also dropped at the user's direction: the docs index and the authoring section, because the audience being shared with has no access to `docs/`. Every link left in the README is external and followable.

### Repository hygiene

`.nojekyll` (nothing starts with an underscore today, but Jekyll would process the repo on every push and one future `_file` would vanish silently) and `.gitignore` (excluding `Mr Fraction Word Express Art/`, verified an exact duplicate of `assets/art/` — same ten names, same byte lengths — and referenced by nothing).

### The instrument destroyed the subject, twice in an hour

Now rule 35. A `HEAD` request killed `serve.ps1` outright — it set `Content-Length` then wrote a body anyway, and the throw sat outside any try/catch, so it unwound the accept loop. Every subsequent asset reported FAILED, which is **exactly what a case-sensitivity catastrophe on Pages looks like**, which was the specific thing being checked for. The files were perfect.

Separately, a PowerShell link checker reported all 67 paths broken on a run where every one was fine: `+` binds before `-join`, so every URL it built was malformed.

`serve.ps1` now answers HEAD with headers only and survives a bad request. Both link checkers now probe one known-good subject and print the URL they built before anything is trusted.

### Architecture question, answered with numbers

Asked whether a single-file build would be better, since the sister site is one HTML file. Measured: **26,335 lines / 1.6 MB** in one file, and it would *still* ship 10 images and 5 font files. Recommendation was to keep the structure — the content is 11,795 lines and grows with every problem, `dispatch.html` writes standalone problem files, and with no version control here a single file means one corruption is total. **The upload method was the fault, not the layout.**

---

## Handoff

**Moved to [`HANDOFF.md`](HANDOFF.md).** That is the single entry point for a new session. Keeping a second copy here is how the two drift apart — this log is the cycle history; the handoff is the current state.

