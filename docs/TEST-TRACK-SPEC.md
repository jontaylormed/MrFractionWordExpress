# The Test Track — an interactive demonstration between the estimate and the answer
### BUILT 2026-08-02, all 10 problems. `assets/js/testtrack.js`.

> **The first build of this was wrong and was thrown away.** It ran a parallel
> mini-example — forty blocks in four boxes — and the user's verdict was that it
> confused more than it taught. Two faults:
>
> 1. **A second whole.** The student is holding a pot of soup and the screen
>    hands them forty blocks to map onto it. That mapping is work, and it is not
>    the lesson.
> 2. **It gave away what the student should derive.** The first option read
>    *"Split the 40 into 4 equal parts"* — announcing that the whole cuts into
>    four, when how many sections and why is exactly what the fraction or percent
>    is telling them. The percent-to-whole relationship was never taught.
>
> What replaced it: the problem's **own** whole, **no arithmetic at all**, and
> two questions that make the student derive the structure. See §4.
> The rebuilt version is what the sections below describe.

---

## 1. The problem this fixes

**A student commits an estimate and is then asked for the final answer, with nothing in between.** No demonstration of the strategy, nothing to interact with, nothing to think about. For a struggling student that is the exact moment engagement is lost, and it is the moment they most need to be shown *how this kind of problem is done*.

Measured across the 16 published problems:

| What sits between the estimate and the final answer | Count | Problems |
|---|---|---|
| **Nothing at all** | 3 | `pw-soup-serving`, `pw-free-throws`, `pw-orders-day` |
| **The Junction only** — an ungraded prose route choice | 7 | `rr-poster-run`, `rr-bread-dough`, `rr-timetable-run`, `rr-cordial-mix`, `ch-lost-property`, `ch-kiosk-sandwiches`, `ch-water-tank` |
| A real calculation step | 6 | the multi-step problems |

**Scope of this build: the 10.** The other six already have a calculation between the estimate and the answer; whether they want a Test Track too is a judgement to make after riding the first ten.

> **Note on how three of them got that way.** `pw-soup-serving`, `pw-free-throws` and `pw-orders-day` were two-step problems until Cycle 10, when their first step was dropped because the Model Yard revealed its answer on the previous screen. That fix was right, and it left these three with an empty stretch. The Test Track is what belongs in it.

## 2. The hard constraint

**A demonstration that performs the move on the problem's own numbers IS the answer, one screen early.** Every answer-leak rule in `VERIFICATION.md` applies to this phase, and the phase is pre-solve, so the leak scan must cover it.

Two honest ways round it, and the user's decision was **to use whichever fits each line** rather than forcing one:

- **Parallel mini-example** — run the demonstration on small friendly numbers, then send the student to their own problem.
- **Stop one move short** — use the real numbers but halt before the operation that produces the answer.

## 3. The phase

A new phase, **`demo`**, between `plan` and `solve`. It **replaces the Junction** (`signalBox.secondRoute` and `Station.prototype.phRoute`), which was built for this slot and is too thin for it: prose, no interaction, no animation.

Per the user's decision, **the route choice folds into the demonstration**: one screen where picking the move and watching it play out are the same act. The student chooses, the animation runs immediately, the feedback explains what just happened.

**Ungraded.** This is a rehearsal, not a gate. A wrong choice animates and is explained, then the student can choose again. Nothing here blocks progress — the gates that matter are already at Read 1/2/3, the Ticket Booth and the estimate.

## 4. Per-schema design — AS BUILT

Every kind wears the same shape: **watch a worked example, then answer two
questions about your own problem, each of which moves the picture.** The worked
example always uses a different fraction, ratio or gap position from the
student's, so its answers cannot be copied downward — a validator rule enforces
this for `section`.

**Nothing is calculated on this screen, in any kind.** That is what makes it
safe, and it is why the parallel example turned out to be unnecessary.

| kind | line | the picture | the lesson |
|---|---|---|---|
| `section` | Part–Whole | one bar, cut and shaded | the bottom number cuts the whole, the top says how many pieces you hold — and a percent is the same instruction wearing different clothes |
| `lock` | Ratio & Rate | two bars that scale together | whatever you do to one row you do to the other, and the move is read off the row you can see both ends of |
| `drive` | Change | three cars and an engine | where the gap sits decides which way you travel, and the words in the story never decide it |

`drive` is the sharpest of the three because the line's three problems put the
gap in all three positions — end, middle, start — so the same screen teaches
"forwards is adding" on one problem and "backwards is subtracting" on another,
with the story's words pointing the wrong way in the third.

## 4b. Original per-schema sketch (superseded, kept for the reasoning)

Schema-dispatched exactly as the Plan phase already is (`model.js` → `ratio-model.js` / `change-model.js`).

### Part–Whole — *"Share it out"* · parallel mini-example
**Strategy taught:** the bottom number cuts the whole into equal parts; the top number says how many to take.

A small bar on friendly numbers unrelated to the problem. The student picks the move — *split it* then *take some* — and the bar animates: the whole divides into parts, then parts fill one at a time with a running total climbing beside them. Closes with "same two moves, your numbers" and hands over to the Engine Room.

*Parallel, because on the real numbers this move produces the answer outright.*

### Ratio & Rate — *"Run the arrow"* · stop one move short
**Strategy taught:** whatever you do to one row, you do to the other — and it is multiplication, never addition.

The Plan phase's ratio table returns, and now the student **drives** it: pick the operation, and both arrows sweep along their rows. The arrow on the row the student can already see **lands exactly on the value printed there** — visible proof the move is the right one. The other arrow sweeps and stops at the `?`.

*Stops short, because the second row's destination is the answer. The additive distractor is worth animating too: pick it and watch the two rows visibly fall out of step.*

### Change — *"Drive the train"* · stop one move short
**Strategy taught:** where the missing car sits decides which way you travel, and therefore whether you add or subtract.

The three-car train from the Plan phase. The student picks a direction; the engine runs along the train and stops at the missing car, which **stays blank** — "that is the one you are about to work out". The wrong direction visibly arrives at a car that is already filled in, or runs off the end.

*Stops short, because arriving at the missing car with a value is the answer. This is the line whose whole point is that the words mislead, so a demonstration of DIRECTION rather than arithmetic is exactly the right thing.*

## 5. Build order, and the traps already known

1. **`signalBox.testTrack` in the schema** — plus a validator rule, planted against before it is believed (`VERIFICATION.md` §3).
2. **A dispatcher, and dispatch it in BOTH `html` and `wire`.** Cycle 9's scar: a model added to one and not the other renders a picture whose buttons do nothing.
3. **The new phase in `stations.js`** — `nextAfterPlan()` returns `demo`; retire `route` and `secondRoute` once nothing uses them. Do not leave `secondRoute` authored-but-unread; that is the `signalBox.plan[]` mistake again, and it has already been made twice.
4. **Content for 10 problems × 4 number sets**, tokenised, with `numberChecks` for any new derived values. The parallel-example numbers are constants, not per-set.
5. **Reuse the `rsc-` animation classes** — their reduced-motion rules exist and their contrast is measured.
6. **Extend `tools/sweep.js`**: add `demo` to the rendered phases *and to `PRE_SOLVE`*, or the leak scan will not look at the one new screen most likely to leak.
7. **Accessibility is not optional here.** Every animation needs a text description that carries the same teaching, and a reduced-motion path that still demonstrates (state changes, not motion). A demonstration a blind student cannot follow is a demonstration that excludes the student it was built for.

## 6. What will say it worked

- The leak scan covers `demo` and reports no new candidates in any of the 40 materialisations.
- Every Test Track is reachable and every choice within it is exercised, in every number set.
- Reduced-motion and screen-reader paths carry the same lesson as the animation.
- Ungraded means ungraded: no path through the phase can block a student.
- **And the check nothing here substitutes for:** whether this actually holds a struggling student's attention is a question only a classroom answers.
