# Roadmap — the next eight pieces of work
### Written 2026-08-08 as seven. **Six of those seven are done; item 6, Challenge Mode, is planned in [`CHALLENGE-MODE.md`](CHALLENGE-MODE.md) and not yet built. Item 8 was added 2026-08-15 on the user's idea and is the only new work on the list.**

> # 🚂 THE SITE IS LIVE
> ## ~~https://jtaylor-cloud.github.io/MrFractionWordProblemExpress/~~ — **retired 2026-09-22.** The repository is now `jontaylormed/MrFractionWordExpress`; see `HANDOFF.md`.
> Published 2026-08-10 and being shared. **`file://` and the deployed origin are two runtimes and both must keep working** — and after any publish, check the live URL rather than the working folder (`VERIFICATION.md` §34, written the day the first upload went live broken while every local check passed).

> `HANDOFF.md` is the state of the build. This is what is *planned*, why it is in this order, and what each piece will cost. When an item ships it moves to `REVIEW-LOG.md` as a cycle and its row here says so.

**The sister site is [Mr. Fraction Factory](https://jtaylor-cloud.github.io/Mr.FractionFactory/)** — items 4 and 5 are measured against it, and it has its own section below. **Item 3 should probably not be built as described**, and §3 sets out why. Everything else is buildable in the order given.

---

## A standing instruction, given 2026-08-08, that applies to everything below

> **"We get the students' attention with less reading and more interaction and animation."**

Said after riding `eg-crate-bottles` and finding three things: it went **estimate → calculation with no second interactive lesson**, the first teaching screen was **static**, and the illustration had **one blinking light and nothing else**. All three are now fixed, but the instruction is general and outranks the local reasoning that produced them:

- **Every problem gets a Test Track.** "The Plan phase already showed the picture" is not a reason to skip it — that argument was written into a manifest and it was wrong. Six older problems still go straight from the estimate to the Engine Room (`HANDOFF.md` §0.2); they are a debt, not a precedent.
- **A picture that teaches a process should animate the process.** The Equal Groups tray now lays its groups down one at a time, because on that line the laying-down *is* the idea. A tray that arrives complete shows the result of the act and never the act.
- **Audit motion with a number, not an impression.** Count animated elements per scene: `[].slice.call(svg.querySelectorAll('[class*="rsc-"]')).length`. Anything at 1–3 is thin. Current range after this pass is 5–25.
- **Prose is the last resort.** Where a point can be made by a picture doing something, it should be.

### And the same instruction applied to the words, given 2026-08-09

> **"All word problems need more descriptive adjectives and details to bring the words more richness and capture the students' attention."**

**It does not contradict "less reading" — richness is word CHOICE, not word count.** Swap flat nouns and verbs for concrete ones at roughly the same length: *"The porter loads crates"* → *"A porter in rolled-up shirtsleeves heaves crates onto the waiting train."* Same job, same size, far more to see.

**What licenses it:** `THEME-AND-ACCESSIBILITY` §3.1.5 — *"Problem text itself is whatever the problem requires"* — the lower-secondary reading cap binds **our scaffolding**, not the story.

**What limits it:** `AUTHORING.md` — *"if the vocabulary is the obstacle, you're testing reading, not reasoning."* So adjectives must be **everyday and picturable** (battered, dented, rattling, draughty, yellow-lit), never literary or academic. A student who cannot picture the word has been given a reading problem instead of a maths one.

**Three things that silently break when you rewrite a story, all now checked:**
1. **The sentence COUNT may not change.** `platformCheck.sentences` and `questionSentenceIndex` are indices into `problem.sentences` — add or remove one and the Platform Check marks the wrong evidence with no error anywhere.
2. **`problem.text` must stay identical to `sentences.join(' ')`.** They are authored twice and can drift.
3. **No new number words.** The first read is numberless; "a pair of trolleys" fails the same validator rule "one crate" does.

**Done so far: the 5 Equal Groups problems. The other 21 are outstanding.**

**The constraint this does NOT relax:** motion must never imply a quantity changed, on any line whose Platform Check is keyed to `moments: steady`. The loader travels past the crates; the barrier rocks instead of lifting; the belt turns and carries nothing. Busy is allowed — the Check says so itself. Changing is not.

## The order, and why

| # | Item | State | Depends on |
|---|---|---|---|
| **1** | Equal Groups readiness | ✅ **answered below — ready** | — |
| **2** | Build the Equal Groups Line | ✅ **DONE 2026-08-08 — 5 problems, on the map** | 1 |
| **7** | Update the Learning Hub | ✅ **DONE 2026-08-09 — the three hubs of the day became paged journeys; `percent-yard` joined later as item 3b, making four** | 2 |
| **3** | Percent — **the hybrid, approved 2026-08-08** | ✅ **DONE 2026-08-10 — model, map card, Ticket Booth question and all 5 problems** | 2 |
| **4** | Floating Mr Fraction bubble | ✅ **DONE 2026-08-09** — `companion.js`; all 18 inline asides removed | — |
| **5** | Artwork placed across the site | ✅ **DONE 2026-08-09** — loader, top bar, map, ticket, arrivals, report, hubs | — |
| **5b** | Palette reconciliation | ✅ **CLOSED 2026-08-10 — both conflicts were already resolved by what got built; see §5** | 5 |
| **3b** | **Percent Learning Hub** — a fourth hub, paged like the other three | ✅ **DONE 2026-08-10** — `percent-yard`, 8 pages | 3 |
| **6** | Challenge Mode | **the only item left.** Announced on the map 2026-08-10 as an unhighlighted, inert "under construction" card | 2, 7, and ideally 3 |

**Why Equal Groups first:** it is the last of the five schemas the site claims to teach, and until it exists the Platform Check has an answer a student can never be right about — `shape: repeat` is keyed to `groups` alone, and no problem on the site is a `groups` problem. The check currently teaches a category with no examples.

**Why the Learning Hub straight after:** its whole job is a checklist for deciding *which of the five* a problem is. Writing that against four lines and then revising it is worse than waiting one build.

**Why Challenge Mode last:** it combines strategies, so it needs all five to exist. Building it earlier means building it twice.

---

## 1. Are we ready to build Equal Groups? — **Yes, and readier than Compare was.**

Checked, not assumed. What already exists:

| | |
|---|---|
| `MF.LINES.groups` | ✅ `Equal Groups Express`, marker ▲, `Groups × Size = Total` |
| `--line-groups` | ✅ `#A85413` (contrast unmeasured — same gap `--line-compare` has) |
| `PLATFORM.groups` | ✅ full entry: ask / look / shape / found / because |
| Platform Check answer key | ✅ all five questions already key `groups` — `kinds: same`, `moments: steady`, `things: single`, `shape: repeat`, `fit: onekind` |
| The map | ✅ data-driven; a line lights up at 3 published problems, no code change |
| Ticket Booth | ✅ `groups` is already a distractor option on every problem |

What does **not** exist, and is the build:

1. **`assets/js/groups-model.js`** — the Plan phase. Equal Groups has no gap and no whole to cut; it has a repeated unit. Letting it ride the Model Yard is the Cycle 6 mistake, and letting it ride the *Compare* `times` bars would be worse, because those two pictures are the thing §3.3 below has to keep apart.
2. **`assets/js/groups-scenes.js`** — `has(name)` / `html(p)`, plus a `<script>` in `index.html` and a fourth entry in `Scene.html`'s dispatch **and** in `data.js`'s library list. Both, or a typo'd art name renders a silent empty frame.
3. **A Test Track kind** in `testtrack.js` — `KINDS` currently has `section`, `cross`, `drive`, `compare`.
4. **Problems** — 3 minimum to light the line, 5 to match Compare, × 4 number sets each.

**Expect it to break engine code that predates it.** `VERIFICATION.md` §24 held four times for Change and again for Compare, where `model.js` had *three* dispatches and a comment claiming two. Budget for it rather than being surprised.

### The one pedagogical trap, and it is new

`shape: repeat` is keyed to `groups` **alone** — and `cp-parking-spaces` (multiplicative compare) argues at length that "four times as many as the bike rack" is **not** repetition, on the Check's own criterion: *no fixed amount is repeated **to build a total***. Equal Groups problems will be the first content where `repeat` is the correct answer, and that multiplicative compare is their nearest neighbour on the whole site.

**So the two must be authored against each other on purpose.** The distinction that has to hold in both directions:

> **Equal Groups:** several groups, each the same size, and the question asks what they **come to** (or how many groups, or how big each is). The groups are real separate things.
> **Multiplicative compare:** exactly **two** things, and one is measured against the other. Nothing is a group of anything.

If an Equal Groups problem can be re-read as a compare, or `cp-parking-spaces` can be re-read as groups, one of them is authored wrong.

### The keystone problem is already identified by the pedagogy

`PEDAGOGY.md` §3.3: *"Fraction division lives here and is the hardest case in the middle-school curriculum: 'how many 2/3-cup servings in 4 cups?' is groups-unknown, and students almost universally multiply instead."*

That is this line's `ch-water-tank` — the problem the line exists for, where the intuitive move is wrong. It should be built **last** on the line, after the multiplication cases have earned the student's trust, exactly as `cp-bench-count` follows `cp-ticket-queues`.

---

## 2. Build the Equal Groups Line

Five problems, covering the three unknowns §3.3 names, in this order:

| | shape | unknown | why here |
|---|---|---|---|
| 1 | whole-number groups | **total** | gentlest: `groups × size`, multiplication works |
| 2 | whole-number groups | **number of groups** | division, but nothing counter-intuitive |
| 3 | whole-number groups | **group size** | the other division; the two divisions are what students confuse |
| 4 | fraction × whole | **total** | fractions enter where the operation is already safe |
| 5 | **fraction division** | **number of groups** | the keystone — *"how many ⅔-cup servings in 4 cups?"*, where almost everyone multiplies |

Each carries what every problem here carries: 4 number sets, Platform Check questions, a Test Track, an animated scene obeying the uncountability rules in `compare-scenes.js`, a Signal Failure on the problems that have a trap, and misconceptions that each diagnose exactly one mistake.

**Cost:** comparable to the Compare Line — that was a model, a scenes library, a Test Track kind, five problems, plus the engine defects it shook out.

---

## 3. Percent Changes — **read this before agreeing to build it**

The request is a Percent Changes *Line*, with an updated map, as a test of whether the overall pedagogy holds. Investigating that honestly, **it should probably not be a sixth line**, and the reason is worth having in writing because it is a real finding about the site's design rather than an implementation preference.

### The problem: the Platform Check cannot tell a Percent line from the Change Line

The five questions work by each option declaring the lines it is true of (`stations.js`, `CHECK`). Answer them for a percent-change story — *"the fare was £8, it rose by 25%, what is it now?"*:

| question | answer | lines that share it |
|---|---|---|
| Kinds | a single kind of thing | change, compare, groups, partwhole |
| Moments | **changed** — something was added | **change alone** |
| Things | a single thing | change, groups, partwhole |
| Shape | neither cut nor repeated | change, compare, ratio |
| Fit | one kind of situation | all five |

**A percent-change story answers all five questions exactly as a Change story does.** So a sixth line would be a line the site's own diagnostic cannot distinguish from an existing one — and the check is the thing that teaches students to choose. Adding it would mean either a sixth discriminating question, or a check that is now wrong on two lines instead of right on five.

### The deeper reason: percent is not a schema

The five lines are **situation structures** — what is happening in the story. Percent is a **representation of a number**, like a fraction or a decimal. It can appear on top of any of them:

- **percent change** → a Change situation (one thing, two moments), asked as a proportion of the start
- **percent comparison** → a Compare situation. **Already built: `cp-hot-drinks`.**
- **percent of a whole** → Part–Whole
- **percent as rate** → Ratio (*"per cent" is literally "per hundred"*)

Making it a line puts a representation on the same axis as four structures. That is the category error the site is otherwise careful about — it is why `PEDAGOGY.md` §2.2 separates *a word may set the question* from *only structure sets the operation*.

### The two options, weighed properly

**The choice is not really "route or line".** Three separate things are bundled inside it, and they can be mixed:

| | |
|---|---|
| **Map presence** | Does percent get its own card, colour and marker? |
| **Owns a Plan model** | Does it get its own picture — a 100-grid or double number line? |
| **What the Ticket Booth asks** | "Which of the five is this?" or "which line is hiding under the percent?" |

#### Percent as a ROUTE — strengths

- **Structurally honest.** Percent is a representation of a number, like a fraction or a decimal. The five lines are situation structures. A route keeps those on different axes.
- **Costs almost nothing in machinery.** The Grand Tour already exists — `MF.MIXED`, `rideInfo()`, `Selector.mixedAvailable()`, and a line-card that renders it. A route is mostly content.
- **Touches no answer key.** The Platform Check's `lines` arrays stay as they are. Nothing can be silently mis-keyed across 21 problems.
- **Teaches the transferable idea** the site is built on: *a percent tells you the units, not the operation.* Same shape as "a word may set the question; only structure sets the operation."
- **Populates immediately.** `cp-hot-drinks` is already a percent Compare problem.

#### Percent as a ROUTE — weaknesses

- **It reads as secondary.** The Grand Tour is explicitly "not one of them", and a student scanning the map sees five lines and an extra. If the user wants percent to feel first-class, a route undersells it.
- **Percent genuinely is hard in its own right**, and none of the five schemas captures its specific difficulties: percent *of what*, percentage points versus percent, and reverse percent (*"after a 20% rise it is £60 — what was it before?"*). Filing those under four different lines scatters a coherent body of teaching.
- **No home for a percent model.** The single most useful percent representation — a 100-grid or a double number line — does not exist here, and a route in the current architecture owns no model.
- **The Grand Tour mechanism is for review**, mixed practice over lines already learned. A percent route would be doing *new teaching* through a device built for consolidation.

#### Percent as a sixth LINE — strengths

- **It matches how students and teachers actually carve the subject.** Students say "I'm bad at percents." No student says "I'm bad at multiplicative compare." A line named for it is findable, and it matches the scheme of work it will be used alongside.
- **First-class map presence**, which is what was asked for.
- **It can own a Plan model** — and this is the strongest argument for it. A percent bar or 100-grid is a genuine pedagogical gain the site does not currently have anywhere.
- **A home for the sub-types** that map badly onto the five: increase, decrease, reverse, percentage points.
- **It breaks no stated claim.** `PEDAGOGY.md` §3 already says the five cover *most* of the 6–12 space, changed on the user's own instruction.

#### Percent as a sixth LINE — weaknesses

- **The Platform Check cannot tell it from the Change Line.** A percent-change story answers all five questions exactly as a Change story does. Fixing that means a **sixth question**, and a sixth question must be answered by **all 21 existing problems** — new authored copy in every manifest, four number sets each. That is the real cost, and it is much larger than the line itself.
- **Re-deriving the `lines` arrays** on every option of all five questions, shared by every problem, with mis-keying failing silently.
- **The pedagogical risk, and it is the serious one.** A student who learns "percent problems go on the Percent Line" has been handed a rule of the form *see this symbol → go here*. **That is a keyword strategy with extra steps**, and defeating keyword strategies is this site's founding commitment. `ch-water-tank` exists so that "more means add" fails; a Percent Line risks teaching "% means Percent Line" and never being falsified, because it is always true — which makes it worse than a keyword, not better. It would stop students asking what is happening in the story, which is the one question everything here is built to force.

### What I recommend — and it still gets everything asked for

**Percent as a route across the existing lines, not a line beside them.** Concretely:

1. **A "Percents" Learning Hub section** teaching percent as a *number in disguise* — per hundred, and what it is a percent **of** (the referent question, which is already the Compare Line's crux).
2. **Percent problems on the lines they structurally belong to** — one per line, each flagged `surface: "percent"` in its manifest. `cp-hot-drinks` is already one of these.
3. **A "Percent Line" on the map that is a ROUTE, not a schema** — the same device as **The Grand Tour**, which already exists and already draws problems from several lines without being a sixth schema. This gets the user the map presence they asked for, honestly labelled.

**This also unblocks the thing that is genuinely stuck.** True percent *change* — one thing at two moments, compared against its original — is the site's clearest example of *two lines stacked*, which is a Platform Check verdict currently answered in copy rather than taught, and deferred by the user. A percent route is the natural home for teaching it.

### The hybrid, which is what I would actually build

Take the three bundled things apart and choose separately. **Give percent the map presence and the model of a line, and the pedagogy of a route:**

| | |
|---|---|
| **Map presence** | **Yes — full card, own colour, own marker.** Percent looks and feels first-class, because it is. |
| **Owns a Plan model** | **Yes — `percent-model.js`**, a 100-grid or double number line, dispatched on a `surface: "percent"` flag rather than on `line`. This is the pedagogical win, and it is available to a percent problem sitting on *any* line. |
| **Platform Check** | **Unchanged.** A percent problem answers as the schema it structurally is, and the resolution says so: *"a Change story told in percents."* No sixth question, no re-keyed answer arrays, no migration of 21 manifests. |
| **Ticket Booth** | **Asks which line is hiding under the percent** — so the surface/structure distinction is the lesson rather than a thing the design quietly fudges. |

**Why this is better than either pure option:** it turns the sixth line's fatal weakness into the teaching. The danger of a Percent Line is that *"it has a % sign, so it goes here"* is never falsified. Here, arriving at the percent card is the *start* of the question rather than the end of it — you are then asked what is actually happening in the story. Percent gets its own front door, its own picture, and its own vocabulary, and the student still has to find the structure underneath.

**Cost:** one model, one map entry, and content. **It does not touch the Platform Check answer key**, which is the expensive and dangerous part of the pure-line option.

### DECIDED 2026-08-08: which problems the percent card carries

**Not one per line.** Percent does not sit equally naturally on all five schemas, and forcing symmetry would put a contestable problem on the one card whose entire job is *find the structure underneath the percent*.

| | structure | sub-type | state |
|---|---|---|---|
| 1 | **Change** | percent increase — *"the fare was £8 and rose 25%"* | to build |
| 2 | **Change** | **reverse percent** — *"after a 20% rise it is £60; what was it before?"* | to build — **the keystone** |
| 3 | **Compare** | percent comparison | ✅ **`cp-hot-drinks` already built** |
| 4 | **Part–Whole** | percent of a whole — *"35% of the 240 seats"* | to build |
| 5 | **Ratio & Rate** | percent as a rate — *"6% commission on every sale"* | to build |

**Equal Groups gets none, deliberately.** Equal Groups is the same amount repeated; percent does not generate that structure. The nearest contrivance — *"twelve shops each give 5% of takings"* — is a percent-of-a-whole done twelve times, so its honest Ticket Booth answer is arguable. A problem whose own schema is contestable is the last thing this card can afford.

**Reverse percent takes the fifth slot instead, and it is the `ch-water-tank` of percent:** the intuitive move (take 20% off £60) is wrong, and it fails silently with a plausible-looking number.

**Two Change problems is deliberate, not an oversight.** If the card held exactly one problem per schema, a student could answer its Ticket Booth **by elimination** — *"I have had the Compare one and the Ratio one, so this must be Part–Whole"* — without reading the story. That is the same exploit as *"never pick the last one"* in Read 2, built into the structure of the card instead of into one problem's options.

**Sequence it after Equal Groups.** Five problems with illustrations, number sets and Test Tracks, plus `percent-model.js`, is a build the size of a line.

### 3a. WHERE PERCENT ACTUALLY STANDS — 2026-08-09

**Built and verified:**
- **`assets/js/percent-model.js`** — the double number line. Dispatches on `surface`, wired into all three of `model.js`'s dispatches, asked FIRST so a percent problem on another line draws this instead of that line's model. Three shapes (`part` / `whole` / `percent` unknown); refuses to draw rather than lie on a 0% value, above 200%, or an unrecognised `unknownIs`.
- **`cp-hot-drinks` carries `surface: "percent"`** and a `percentLine`. Driven live: draws the number line and not the compare bars, mark derived at 20%, tokens filled, wrong pick teaches, right pick settles, 0 validate errors. Its `compareBars` is kept, unused — the structural picture to fall back on if the surface is ever removed.
- **`ch-barrier-count` — REVERSE PERCENT, THE KEYSTONE. Built 2026-08-09.** A Change problem carrying the percent surface: Saturdays are busier by ▮%, last Saturday brought ▮ through the barriers, how many came through before. `unknownIs: "whole"`, which is the shape the model was built for and had never been used — the given sits PAST the hundred per cent and the hundred per cent carries the question mark. Test Track is `section` rather than this line's `drive`, because drive teaches direction and direction is not where reverse percent breaks people.

**Three things the keystone shook loose, all in code that predated it** — `VERIFICATION.md` §24 holding for the fifth time:

1. **`percentLine` had no validator rule at all**, on a shipped problem. Rule 10h now covers it (base typo, missing mark source, the missing amount being tokenised, `surface` and `percentLine` present without each other, whyWrong keys, the 200% guard). All eleven planted and confirmed to fire and clear. This is 10f's own note coming true: *"three of four is how this kind of gap hides."*
2. **The picks were never shuffled**, so they rendered in authored order — and the authored order put the correct one first. Now `MF.seededShuffle`, same grammar as Read 3 and the Ticket Booth. Across both percent problems the correct pick now lands first once and second once, which is chance.
3. **A label at either end of the line hung off the card.** Measured at 772px, `cp-hot-drinks` put "40 cold drinks" fifty pixels outside its own card, and had since it shipped. End labels are anchored rather than centred; the stalk still lands on the point, verified at 0px drift across six materialisations.

**A fourth thing it needed, and did not have:** the mark's percentage is not always one the story states. "Busier by 20%" puts the known amount at **120%**, so `percentLine` now takes `percentAt` (a token filled from the number set) as an alternative to `percentToken`. Exactly one of the two, enforced.

### THE CARD IS COMPLETE — all five, 2026-08-10

| | id | structure | sub-type | `unknownIs` | Test Track |
|---|---|---|---|---|---|
| 1 | `ch-fare-rise` | **Change** | percent increase | `part`, mark past 100% | `drive` |
| 2 | `ch-barrier-count` | **Change** | **reverse — the keystone** | `whole` | `section` |
| 3 | `cp-hot-drinks` | **Compare** | percent comparison | `part` | `compare` |
| 4 | `pw-seats-reserved` | **Part–Whole** | percent of a whole | `part` | `section` |
| 5 | `rr-drink-rate` | **Ratio** | percent as a rate | `part` | `cross` |

**Every problem's Test Track is its own line's kind except the keystone's**, which takes `section` because there the METHOD is what breaks. Each was chosen against the question "what does this screen teach that the last one did not".

**Three of the five draw the identical Plan picture, and that is the design rather than a shortcut.** The card's whole job is that the surface looks the same and the structure underneath does not — so `pw-seats-reserved`, `rr-drink-rate` and `cp-hot-drinks` show the same double number line and answer the Ticket Booth three different ways.

**The two that had to be authored against each other** are `pw-seats-reserved` and `rr-drink-rate`: same arithmetic, different structure. The discrimination is written into both manifests and into the Part–Whole distractor rather than left implicit — *can you add the two quantities and get something the story names?* Seats plus seats give the trainful; drinks plus people give nothing.

**Part–Whole needed the site's fifth scenes library.** Every other problem on that line draws the unit grid, which derives itself from `barModel.bars[0].segments` — and a percent problem has no bar model, because the Plan phase belongs to the number line. `assets/js/partwhole-scenes.js` is that file, and it is the first library that could be added **without editing a hardcoded list**: `Scene.html` and the validator's artwork check now discover `*Scenes` globals, which `tools/sweep.js` already did. That was the sixth instance of the list defect waiting to happen.

**Position measurement, as this section required before shipping.** Correct option across all five: hidden-line question **2, 4, 1, 4, 2** of 5; Plan picks **2, 1, 2, 1, 1** of 2; Read 3 **1, 2, 1, 3, 4** of 4. No slot collapses in either direction.

**One defect the measurements caught, and it is the reason to keep taking them.** `pw-seats-reserved`'s carriage drew seat backs 34 wide at a pitch of 24 — overlapping, uncountable, exactly as its comment claimed — with a **headrest on each one 22 wide at the same pitch**, so 13 of 17 headrests stood completely clear of their neighbours. The row of seats was uncountable and the row of headrests on top of it was a tally of the same seats. **A picture is only as uncountable as its most countable part.** Found by measuring the wrong element, noticing the number was about the straps, and measuring again.

### 3c. THE MAP CARD AND THE TICKET BOOTH QUESTION — BUILT 2026-08-10

**Both halves of the hybrid that were still missing are now in.**

**The card.** `MF.PERCENT` is a ROUTE, kept out of `MF.LINES` for exactly the reason `MIXED` is: everything iterating that object — the map, the route key, the Ticket Booth's distractor coverage, `PLATFORM`, the Platform Check's answer arrays, the validator's *unknown line* rule — would gain a sixth phantom schema. It draws its pool by `surface`, not by `line`. Own colour `--line-percent: #6B3FA0` (violet, the one hue not spoken for), own marker `%`, dashed everywhere but the left edge so it reads as a line and visibly not one of the five.

**It opens at TWO problems and two lines**, a deliberately different threshold from a line's three. Three is what a schema needs before it can claim to teach a situation. This route claims something else — that one surface sits on different structures — and the smallest honest demonstration is two problems on two different lines, which is what exists. One problem would teach *"percent problems are Compare problems"*, the keyword strategy the surface exists to refute.

**The booth question.** Asked when `rideLine !== problem.line` — so on the percent route and the Grand Tour, never on a themed ride of the problem's own line, where the map already gave it away. **The answer key needed no new authoring**: `correctLine`, `whyCorrect` and a `whyWrong` per line have been validator-enforced in every manifest since the beginning, so a wrong pick teaches from the existing distractor prose.

**Three things it broke, all in code that predated it** — §24 again:

1. **The station header was printing the answer.** `.station-desc` renders *"The Change Line · Start ± Change = Result"* above **every** phase — the Platform Check's own note says so, which is why that check has two screens — and the day the booth started asking which line was hiding, that header became a giveaway two inches above the question. On a percent ride the header now names the **route**, and the colour goes with it, because a student who knows green means Change reads the answer off the tint with no words at all.
2. **`STOPS` has no `percent` entry**, so passing the route key to `Scenery.legMap` throws and takes the whole station down. The leg map keeps the problem's real line for geometry and takes a colour override. The residual tell — recognising a zoomed fragment of one line's curve — is real but weak, and is recorded rather than claimed away.
3. **The correct option landed LAST on both problems.** *"Always pick the bottom one"* scoring 100% against 20%, on a brand-new choice surface, for the fourth time on this project. A seeded shuffle is not a defence — it makes the arrangement arbitrary, and an arbitrary arrangement can still be degenerate across a small set. The salt was **measured** and changed; they now sit at 2 and 4. **Re-measure when problems 3–5 land.**

**The Terminus Hub needed no change at all.** Its `mixedRide = p.line !== trip.line` test already generalises: on a percent ride the hub asks the line question and the strategy question unaided. So the two-stop ride is guided-then-unaided on exactly the skill the route teaches.

**`tools/sweep.js` gained a check that is not about numbers:** on the hidden-line booth, the problem's own line NAME and FORM are answers. Confirmed by reinstating the header defect — 16 hits — and clearing.

**Each needs, exactly as every other problem here does:** 4 number sets with `numberChecks`, Platform Check questions answering as its REAL schema (never "percent"), a Ticket Booth whose distractors argue the structural line, an `anim` scene obeying the uncountability rules, a Test Track, a Signal Failure where there is a trap, and misconceptions that each diagnose one mistake.

**Before shipping their choice options, run the position measurement.** The correct-answer-first defect is three-for-three on new choice surfaces on this project — the ratio tables, then all twenty hub taps. Count where the correct option lands and compare against chance; do not drive it to zero, which is the same tell inverted.

### 3b. A Percent Learning Hub — on the agenda 2026-08-09

**A fourth hub, built exactly like the other three** — `pages[]` rendered by `hub.js`, one topic per screen, the rail across the top, a diagram and a tap on every page, Mr Fraction walking down the left. It is not a variant; if it needs anything the renderer cannot already do, that is a signal the renderer should grow rather than that this hub is special.

**What it has to teach, and the order matters:** percent is a *number in disguise* (per hundred) → **percent of WHAT**, the referent question that is this whole surface's crux → the three sub-types (of a whole, change, comparison) → and the one that breaks people, **reverse percent**, where taking 20% off the new figure is not the answer.

**It must not become a sixth situation.** The Ticket Booth on a percent problem asks *which line is hiding under the percent*, and this hub is where a student learns that percent sits **on top of** a structure rather than beside the five. Same relationship the Word Board has to the Five Situations hub: read it here, decide it there.

### BUILT 2026-08-10 — `content/hubs/percent-yard.js`, The Percent Yard, 8 pages

**Per hundred → per cent of WHAT → of a whole → a change → a comparison → backwards → not a situation → check yourself.** The order is the one this section specifies and it carries the argument.

**The thesis is made in pictures before it is made in words.** The three sub-type pages reuse the `change`, `compare` and `partwhole` diagrams from `five-situations` **unchanged** — so a student sees the same five shapes with a per cent sign laid over them, several pages before the hub says so. The closing page is the thesis, not a disclaimer: percent is a way of writing a number, it never replaced any of the five, and at the Ticket Booth the per cent sign will not answer *which one is underneath*.

**Four new diagrams in `hub.js`** rather than anything the hub does specially — `percenthundred`, `percentline`, `percentreverse`, `percentover`. `percentline` is deliberately the same picture `percent-model.js` draws at the Drafting Table, for the reason every hub diagram is its line's Plan model.

**One defect found by checking that each animated element moves something visible:** `percenthundred` carried an `rsc-bounce` group holding two paths at `stroke-width: 0` and `opacity: 0`, left over from an earlier idea. **It counted as an animated element on every check and moved no pixels.** Replaced with a dashed outline around the shaded block — and the shading changed from reading-order to five columns of five, so the quarter is a clean square you can see rather than an L you have to count.

**Verified:** all 8 pages render with art and a tap, all 24 options clicked (wrong ones teach and disable, right one settles and locks), rail jumps work, the walk reaches "8 of 8", and the self-checks mark right, mark wrong and — the one that matters — **leave a blank box blank**.

### An open measurement this hub did NOT fix

Correct-option position across all 28 hub taps is **11 first / 9 last against 9.3 by chance** — at chance site-wide. But the per-hub split is not: **`fraction-yard` has the correct option LAST on 5 of its 6 taps**, so *"always tap the bottom one"* scores 83% there against 33%. Pre-existing, and hidden inside a healthy-looking total — `VERIFICATION.md` §18, the aggregate being true and useless.

**Deliberately not fixed by changing the salt.** Measured three alternative salt formulas: each merely relocates the cluster (`five-situations` to 67%, `percent-yard` to 63%). Picking the string that makes one number look best is salt-shopping, it addresses no mechanism, and it will not survive the next page being added (§21). A real fix would assign the correct option's slot **by construction** so spread is guaranteed rather than hoped for — which is a change to shared hub machinery affecting all four hubs, and a decision rather than a tidy-up.

**If the user wants a real sixth line anyway**, that is a legitimate call — but it needs, in this order: a sixth discriminating question in `CHECK`, re-derived `lines` arrays on **every** option of all five questions, a `PLATFORM.percent` entry, `--line-percent` plus a marker, and `PEDAGOGY.md` §3 rewritten. **Do not start it without that list agreed** — the answer key is shared by all 21 problems, and getting it wrong silently mis-keys the check on every one of them.

---

## The sister site — read this before items 4 and 5

> # **Mr. Fraction Factory — https://jtaylor-cloud.github.io/Mr.FractionFactory/**
>
> **This is the sister site.** When the user says "the sister site", "as this sister site does", or "match the sister site", this is it. The two sites share the Mr Fraction character and are meant to read as one family. It is the **standing visual and interaction reference** for this project.

**It had been raised across several sessions and was recorded in neither the docs nor memory, so each new session asked what it was.** That is what this section exists to stop. It is now also in the project memory as `mr-fraction-sister-site`.

**The one standing caveat.** This site's illustration rules are **pedagogical, not aesthetic** — no numerals in a scene, uncountable objects when the drawn objects *are* the quantity, no measurement furniture, no motion implying a compared quantity changed. Matching the Factory's *look* is right. Copying artwork that breaks those rules is not. Where the two conflict, say so rather than silently choosing.

## 4. Mr Fraction as a floating dialogue bubble

Move the dialogue from its in-page position to a floating, animated bubble at the bottom right, **as Mr. Fraction Factory does**.

### The Factory's implementation, read off the live site 2026-08-08

Not paraphrased — these are its actual rules, so the Express can match rather than approximate:

```css
.mr-companion {                     /* the container */
  position: fixed; bottom: 24px; right: 24px; z-index: 200;
  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
  pointer-events: none;             /* the page stays clickable through it */
}
.mr-companion.hidden { display: none; }

.mr-speech-bubble {
  background: var(--cream-light); border: 2px solid var(--border);
  border-radius: 14px 14px 4px;     /* the square corner is the tail side */
  padding: 10px 14px; max-width: 268px; font-size: 13px; line-height: 1.5;
  box-shadow: 0 4px 16px var(--shadow);
  pointer-events: auto;             /* but the bubble itself is selectable */
  animation: bubble-in .3s ease;
}
/* tail: two stacked triangles at bottom:-10px/right:20px, border-top-color,
   the inner one 1px smaller in cream to fake a 1px outline */
.mr-figure { width: 100px; height: 100px; object-fit: contain; }

@keyframes bubble-in {
  0%   { opacity: 0; transform: translateY(8px) scale(.95); }
  100% { opacity: 1; transform: none; }
}
```

**Structure:** `div.mr-companion > div.mr-speech-bubble > span.mr-q` then `img.mr-figure`. The bubble sits **above** the figure and its tail points down at him.

**Two utterance kinds, distinguished by border colour:** `.probe` (orange — asking) and `.tell` (teal — explaining). There is also `.mr-quip`, a secondary italic line separated by a dashed rule, for an aside under the main line. **The Express should adopt this distinction** — it maps onto the difference between Mr Fraction asking a question and Mr Fraction explaining, which this site makes constantly.

**Behaviour worth copying exactly:** the companion is **hidden on the home page** and shown on the others, and it hides itself whenever another element is animating its own dialogue — the Factory's comment is *"keep one voice while the machine talks."* That rule matters more here, where the Test Track and the Plan models all talk.

### Where the Express must NOT match the Factory

1. **Reduced motion.** The Factory's `prefers-reduced-motion` block disables exactly two things; `bubble-in`, `gear-spin`, `factory-bob` and `hero-float` all keep running. **This site's rule is that every animation has a reduced-motion pose.** Port the look, add the pose.
2. **It must not cover the answer input**, and at the narrowest measured layout (210px column) a 268px bubble is wider than the content. Needs a small-screen rule the Factory does not need.
3. **`a11y.js` owns announcements.** A bubble that announces on every phase change would be a screen-reader nuisance; the existing announce discipline governs.

## 4a. The art that arrived, and where it will be hosted

**Stated by the user 2026-08-09: every PNG and the GIF in `Mr Fraction Word Express Art/` will be hosted on GitHub along with `index.html` and the README** — the same arrangement as the sister site.

**The site therefore has TWO runtimes now:** `file://` (a locked decision, still true) and an `https://` origin on GitHub Pages. Everything added has to work in both.

### What is in the folder — 10 files, ~3.4 MB, all with transparency

| | |
|---|---|
| **Conductor Mr Fraction** ×4 | Front / Back / Left / Right, 571×669, 8-bit alpha. A full turnaround. **571×669 is exactly the sister site's character canvas**, so these came off the same pipeline |
| **`Conductor_Mr_Fraction_GIF.gif`** | **Animated: 6 distinct frames, 130 ms each, 0.78 s, loops forever.** A talking idle — the mouth cycles out→closed→out while the arms see-saw in counterpoint. Frame 0 matches the Front PNG, so a matching still already exists |
| **Train_Station** 1711×1225 | Hero. Sign reads "Word Express", loco at the platform |
| **Train** 1708×1506 | Loco with Mr Fraction in the cab window |
| **Caboose** 1294×1624 | Rear view, Mr Fraction on the balcony — natural fit for Arrivals |
| **Ticket_Booth** 806×1284 | Victorian booth. Maps onto the `ticket` phase, which already exists |
| **Train_Ticket** 1244×923 | "One Ticket", greyscale portrait inset |

### Five hosting constraints, none of them theoretical

1. **Linux is case-sensitive; Windows is not.** A path with the wrong capitalisation works on the dev machine and 404s live. **This is the most likely way the art breaks after upload.**
2. **The folder name contains spaces** — `Mr Fraction Word Express Art/` becomes `%20` in URLs. **Rename to `assets/art/` BEFORE wiring anything up**; renaming after the HTML references it is strictly worse.
3. **Filenames contain parentheses** — `(Front)` etc. Legal in URLs, but in CSS they must be quoted: `url("…(Front).png")`.
4. **Relative paths only.** A leading `/` resolves to the domain root, not the project folder, on a project Pages site.
5. **Weight.** The site currently ships **zero rasters** — everything is inline SVG. 3.4 MB is free on `file://` and a real download over Pages on a school connection.

### Two findings about the GIF that decide how it is used

- **A GIF cannot be paused by `prefers-reduced-motion`.** CSS cannot touch it. Every other animation on this site has a reduced-motion pose, and this one would be the exception. Fix: `<picture>` with `<source media="(prefers-reduced-motion: reduce)">` pointing at the Front PNG — no JavaScript needed.
- **A permanently looping companion is what `THEME` §3.3 restricts** — decorative motion near problem text. **Recommendation: run the GIF only while Mr Fraction is actually speaking, then swap to the still.** That also makes the motion *mean* something, which is the standard applied to every scene library.
- Minor: GIF transparency is **1-bit**, against the PNGs' 8-bit alpha, so expect harder edges on the cap's curves. If that shows at display size, drive the four PNGs with CSS instead — which solves the reduced-motion point for free.

## 5. Artwork matching the sister site

### The good news: the two sites are already the same design system

Read off the Factory 2026-08-08. Its `:root` and this site's are siblings, and in one case identical:

| | Factory | Express |
|---|---|---|
| cream-light | `#fdf8f0` | `#FDF8F0` — **identical** |
| blue | `--blue: #2a5fa0` | `--line-compare: #2A5FA0` — **identical** |
| green | `--green: #4a7c2f` | `--line-change: #45742B` — sibling |
| ink/brown | `--brown-dark: #2c2214` | `--ink: #241B10`, and `#2C2214` appears in `scenery.js` |
| body font | Atkinson Hyperlegible | Atkinson Hyperlegible — **identical** |

**So "match the sister site" is mostly adoption, not redesign.** What the Factory has that this site does not:

- **`--font-display: 'Black Han Sans'`** and **`--font-serif: 'Libre Baskerville'`** (italic). The Express is single-font. A display face for station names and line cards is the single biggest visual difference.
- **Semantic colour names** (`--orange`, `--teal`, `--blue`) alongside this site's positional ones (`--line-compare`). Worth adding as aliases so both vocabularies work.
- **The character artwork**: `Mr__Fraction_Front.png`, `_Back`, `_Ladder`, `Mr__Fraction_GIF.gif` (a loading animation), `Mr__Fraction_Factory.png` (2160×1620 scene), plus `Gear.png`, `Pie.png`, `Pizza.png`.
- **Spinning gear watermarks** — `position: fixed`, `z-index: 0`, `pointer-events: none`, 70–240px, scattered off the edges, rotating via `gear-spin`.

### CLOSED 2026-08-10 — and neither conflict needed a ruling in the end

**This item sat marked "open — one decision" for two days while the build had already answered it both ways.** Checked rather than assumed, which is the only reason it was caught:

| The conflict | What the build actually does |
|---|---|
| *"Fonts are remote… must be self-hosted in the repo, or not adopted"* | **Self-hosted, and adopted.** `assets/fonts/` carries `BlackHanSans-400.woff2` and `LibreBaskerville-400i.woff2` alongside the three Atkinson weights. All five `@font-face` rules point at `url('../fonts/…')`, there are **zero** remote font requests, and `--font-display` is used 13 times. The site is the sister site's typography with none of its network dependency. |
| *"Spinning gears behind problem text break a rule this site already has"* | **Never imported.** `gear` does not appear anywhere in the CSS, the JS or the HTML. The rule was never at risk because the thing it forbids was never brought over. |

**The one scrap that was genuinely open, and the call made on it.** The Factory names colours semantically (`--orange`, `--teal`, `--blue`) where this site names them positionally (`--line-compare`). §5 suggested adding the semantic names as aliases "so both vocabularies work". **Not done, deliberately.** `--orange` exists and is used twice; the rest have no consumer, because no Factory artwork has been ported and none is planned. Adding `--teal`, `--blue` and `--green` now would create three variables nothing reads — dead content, which raises no alarm and is the thing §8 exists to catch. They are two lines to add on the day something needs them.

**The lesson, and it is `VERIFICATION.md` §9 in miniature:** an item can sit on a roadmap as an open decision long after the code has decided it. Before asking anyone to rule on a design conflict, go and look at whether the conflict still exists.

### The two conflicts as they were originally written

1. **Fonts are remote.** The Factory pulls Google Fonts over the network. **This site ships on `file://` with zero dependencies** — a locked decision. Black Han Sans and Libre Baskerville must be **self-hosted in the repo**, or not adopted.
2. **Spinning gears behind problem text break a rule this site already has.** `THEME §3.3` bans decorative animation near problem text — the exception was carved for scenes that *are* the problem, which a background gear is not. Either the gears are static here, or they stay away from the reading column.

**And the standing caveat above still applies:** the Factory's illustrations count things freely (pies, pizzas cut into visible slices). On this site an illustration of the quantity being asked for is a leak. Character art and furniture port cleanly; anything countable does not.

**Also needs a decision the sister site cannot answer:** this site's illustration rules are unusually strict, and they are pedagogical rather than aesthetic — no numerals anywhere, uncountable objects when the objects *are* the quantity, no measurement furniture, no motion implying a quantity changed. **New artwork inherits all of it.** If the sister site's art does not obey those rules, matching its *look* is fine and matching its *content* is not.

## 6. Challenge Mode — the biggest item on the list

> **The map already announces it (2026-08-10).** There is an unhighlighted, inert **Challenge Line** card in the Special lines group, marked *under construction*, carrying the pitch this section describes: *"Problems that need two of the five together, with the scaffolding fading as you go."* It has no `data-line` and cannot be pressed. **When this gets built, that card is where it plugs in** — give it a route key, drop `line-card-soon`, and the grouping already has a place for it.

Multi-strategy word problems, own map, **3 teaching rounds + 2 assessment rounds**, each problem carrying illustrations, interactive visual lessons and randomised realistic numbers.

**What already exists to build on:** randomised number sets (`MF.materialize`, 4 sets per problem), the Test Track (interactive visual lesson, 4 kinds), the scene libraries, the Grand Tour (a route across lines), and `selector.js` (weighted problem selection with no-repeat constraints).

### DECIDED 2026-08-08: no scoring, and no gating

The user's words: *"No session only scoring, challenges should be approachable at anytime and just using multiple strategies at once."*

**This removes the hardest constraint.** There is no score to persist, so `no localStorage` stops being a conflict rather than being worked around. It also settles the shape: the five rounds are **five problems that are always available**, not a graded run a student passes or fails. Nothing is locked, nothing is scored, nothing is lost on reload. The 3-teaching / 2-assessment split becomes a difference in **scaffolding** — the last two fade the support the first three give — which is `fadeLevel`, a thing every problem on this site already has.

**What is genuinely new:**
1. **Multi-schema problems.** Every problem here is one schema. A problem whose first step is Part–Whole and second is Ratio needs the Plan phase to show **two** models in sequence — `model.js` dispatches one. This is the real work of Challenge Mode.
2. **Its own map.**
3. **A Ticket Booth that can hold more than one answer.** Today it asks which single line a problem is. A multi-strategy problem's honest answer is two, which is the *stacked* verdict the Platform Check already names and does not yet teach.

**Cost:** larger than a line. Realistically this is several sessions, and it should be planned in its own document once items 2 and 7 are done.

> ### ▶ THAT DOCUMENT NOW EXISTS: [`CHALLENGE-MODE.md`](CHALLENGE-MODE.md) (2026-08-15).
> Four things were settled with the user while writing it: the island is **open** — any stop, any order, no route menu; the unaided stops **keep the estimate and the hint ladder**; the Plan phase draws **two models with a transfer slot between them**; and the mode needs **a new reading protocol running the existing five-situations checklist twice, once on each half of the problem**. That last one is the user's amendment and it is the heart of the build. Start at §9 of that file — the first work is the leak scan and the `stacked` answer key, not a problem.

## 7. The Learning Hubs — DONE 2026-08-09

**All three are now paged journeys**, rendered by `assets/js/hub.js`. A hub with `pages[]` renders there; a hub with only `sections[]` still uses the original long-scroll renderer in `app.js`, which is a supported authoring shape rather than dead code — no hub uses it today, and removing it would silently break the next hub written from the older docs.

| hub | pages | carries |
|---|---|---|
| `percent-yard` | 8 | **added 2026-08-10** — per hundred, percent of WHAT, the three sub-types on the five lines' own diagrams, reverse percent, and the closing page that says percent is not a situation |
| `five-situations` | 9 | five animated line diagrams, a checklist page, the mix-ups page, a tap on every page |
| `word-board` | 5 | **new** — the vocabulary, split out on 2026-08-09 |
| `fraction-yard` | 8 | six teaching pages, the Shunting Yard on its own page, self-checks |

**What a paged hub gives a student:** one topic per screen; a **rail** across the top showing every page at once and jumping to any of them; a diagram and **something to do** on every page; and the checklist visible as a single object. Nothing is gated and nothing is scored — the rail is a map, not a track.

**Why it was rebuilt:** for a site whose students "may have a reading-related disability that makes a dense paragraph a barrier *before* any math begins" (`PEDAGOGY.md` §1), the page we point them at to learn how to read was the single longest wall of text on the site.

### The vocabulary is its own hub, and the framing is the point

`word-board` exists because a vocabulary list on **this** site is a hair's breadth from being the keyword poster the whole project was built to replace. **The difference is entirely in the framing, so the framing is page one** — not a disclaimer at the end:

> **A word may set the question. Only the structure sets the operation.**

Three tiers, one per page, from `PEDAGOGY.md` §2.2: words that **name** an operation (pure vocabulary), words that **ask** a question (each with two examples taking *different* operations — one example would be a keyword rule in disguise), and words that **lie**, each shown failing on a real problem from this site. **The lies section is tagged `tier: "lies"` in the data and must stay tagged** — that tag is what exempts it from the keyword greps (`VERIFICATION.md` §30).

### The Equal Groups / multiplicative Compare discrimination

Folded into `five-situations`' mix-ups page. The test that works:

> **In Equal Groups the multiplier counts things you could point at — crates, bags, carriages. In Compare it counts nothing: "four times" is not four *of* anything.**

**No answer-key change was needed.** The Platform Check already separates them on the **Things** question (Equal Groups → `single`, multiplicative Compare → `separate`); the confusion only *feels* like it lives on Shape. And the two Plan pictures were measured and are not confusable: Compare draws two stacked bars with 2px hairline seams and no labels inside; Equal Groups draws one row of separated 139px boxes, each labelled, with a bracket underneath.

**Still open, deliberately:** the generic `shape.repeat.no` copy in `stations.js` does not redirect to the Things question. A student who hits this confusion mid-trip rather than in the hub still gets a bare "no". One line would fix it.

## 7-original. The brief this replaced

**Already briefed in `HANDOFF.md` §0.3, from the user's words on 2026-08-02 and the amendment on 2026-08-03** — a hub teaching students to recognise, from the language of a problem, which situation they are in, plus the vocabulary to read it, plus a checklist that lets a student conclude that none of the five fits.

The authority is `PEDAGOGY.md` §2.2 and its three tiers: **tier 1 names the operation** (*sum, product, quotient, per*) — build it; **tier 2 asks a question** (*more than, left, each, altogether*) — build it carefully, ≥2 examples per entry taking different operations; **tier 3 lies** (*"more means add"*) — hazard copy only.

**The trap, and it is documented:** new copy has to quote tier-3 rules in order to refute them, so it will trip the keyword greps. The exemption is a **data tag** — `tier: "lies"` on the section — never a reading of intent. `VERIFICATION.md` §30. Widening the exemption is the failure; tagging or rewriting the copy is the fix.

**Should extend `content/hubs/five-situations.js` or sit beside it as a third hub.** Hubs are never gated and never framed as remedial — a locked decision.

---

## 8. Estimating should not feel like answering — **added 2026-08-15 on the user's idea**

**The user's words:**

> *"For all word problems, when a student is estimating an answer, they should be able to manually write through touch screen or drag the mouse around, but type it in when it's an actual calculation. The main idea to make estimation input interact differently than calculating for a final answer. The input fields need to vary as much as possible, with notes written or drawn for estimation and typing, but different looking input than as it currently is."*

### Why this is a pedagogical change and not a decoration

Today both inputs are the same control. The estimate is `<input type="text" id="estv" inputmode="decimal">` in a `.field`; the Engine Room's answer is the same box in the same box-shape. **The screen therefore tells the student that estimating and answering are the same kind of act, and they are not.** An estimate is meant to be rough, fast and provisional; a typed number box asks for something exact and final, and gets it — which is how you end up with students who "estimate" by doing the calculation first and typing the answer twice.

The copy already fights this on its own: *"It doesn't have to be good. It has to exist."* The input contradicts the sentence sitting above it. **Making the modality match the mode of thinking is the fix** — the hand for a guess, the keyboard for a result.

It also lands inside the metaphor without straining it: **a pencil on the platform, a dial in the Engine Room.**

### The hard constraint, and the design that survives it

**The estimate cannot be ink alone — it has to yield a number.** Two places consume it and neither can take a drawing:

- The **Arrivals Board** compares estimate against answer and passes anything within a factor of two (`stations.js` ~1351), and shows the student `estimateRaw` — what they actually entered — because showing the parsed value once made a student compare `7/20` against `0.35`.
- `m.estimates` feeds the trip metrics.

**Handwriting recognition is not the answer.** Zero-dependency, offline, `file://`, and reliable digit recognition is a research project, not a feature.

**The design that gives the gesture AND the number: estimate by sweeping a range on a number line.** The student drags along a scaled line and leaves a *band*, not a point. That is:

- **a gesture** — touch, stylus or mouse, which is exactly what was asked for;
- **a number** — the band's centre commits as the value, so nothing downstream changes;
- **and pedagogically more honest than the box it replaces**, because an estimate genuinely is a region. "Somewhere between 40 and 60" is a better estimate than "50" and the current control cannot express it. The Arrivals Board's factor-of-two forgiveness becomes visible: the student can *see* whether their answer landed inside their own band.

**Free ink beside it, never parsed.** A scratch area that keeps the marks and grades nothing — jottings, a crossed-out first guess, a quick bar sketch. It is not an input; it is thinking made visible. Committing the estimate must never depend on it.

### Two surfaces, made to look nothing alike

| | Estimate | Calculate |
|---|---|---|
| **Where** | Plan phase | Engine Room, Test Track, hub checks |
| **Input** | Sweep a band on a number line + free ink pad | Typed field |
| **Feel** | Paper, pencil stroke, no box — soft edges, hand-drawn rule | Machine — a keyed, brass-gauge field that reads as an instrument |
| **Says** | *roughly, provisionally* | *exactly, finally* |

The typed field wants redesigning too — the user asked for it to look **different than as it currently is**, not merely different from the estimate. The Engine Room is a room full of machinery and its input looks like a web form.

### What has to be true before this ships

1. **A keyboard path that is equal, not lesser.** WCAG 2.1 AA: 2.1.1 (keyboard), and 2.5.1 (any multipoint or path-based gesture needs a single-pointer alternative). Arrow keys must move and widen the band, and a typed entry must remain available and unembarrassed — some students cannot drag, and on this site the estimate is a **gate**: the Engine Room does not unlock without one. **An inaccessible estimate control locks a student out of the whole problem.** This is the single largest risk in the item.
2. **Pointer Events, hand-rolled.** One code path for mouse, touch and stylus; `touch-action: none` on the surface only, or the page stops scrolling on a phone.
3. **`MF.parseAnswer` still owns the typed path**, fractions included. A number line has to be given a sensible scale per problem — probably derived from the answer's magnitude, and *never authored*, or it is right for number set 1 and wrong for the other three, which is a mistake this project has made three times on picture geometry alone.
4. **The band must not leak the answer.** A line scaled tightly around the true answer hands it over; too generous and the estimate means nothing. **The scale is a pre-solve surface and the sweep must scan it.**
5. **Nothing persists.** No `localStorage` — a locked decision. Ink dies with the phase, as everything else here does.
6. **It changes every problem on the site**, 30 of them plus whatever Challenge Mode adds. It is engine work, not content work, which is what makes it affordable.

### Where it sits

**After Challenge Mode.** It touches the Plan phase of every problem, and doing that while a new mode is being built means two moving parts under one another. Challenge Mode will add its own estimate screens, and they should inherit this rather than be retrofitted — **so if this is built first, build it first properly; otherwise finish the island.**

---

## Open decisions, collected

> **Corrected 2026-08-10.** This section said *"None outstanding… the next one to pick up is item 7, the Learning Hub"* while item 7 was finished on 2026-08-09 and **5b was flagged open two screens above it**. Spec-says and build-does disagreeing in the one section a new session reads for *what next* is `VERIFICATION.md` §9.

**Item 5b closed 2026-08-10, and two of its three parts never needed a ruling** — the build had already answered them. Checked rather than assumed; see §5 for the evidence.

1. ~~Remote display fonts~~ — **already self-hosted.** `assets/fonts/` carries both faces, all five `@font-face` rules are local, zero remote requests.
2. ~~Spinning gears~~ — **never imported.** `gear` appears nowhere in the codebase.
3. **Genuinely open, and the only one left:** three of the five line colours miss AA as normal text on `--cream-mid` — **change 4.26, ratio 4.41, groups 4.09** against 4.5. Compare (4.98) and partwhole (5.43) pass; `--line-percent` is strongest at 5.67. The one surface where it bites is patched by bolding the label, so **nothing is failing today** — but darkening those three is the fix that holds everywhere instead of per-surface. A design call, small, and safe to leave.

**Also settled 2026-08-10:** the licence. `LICENSE` now carries **CC BY-NC-SA 4.0**, matching the sister site, with the bundled typefaces called out separately under their own SIL OFL 1.1 terms.

**Unblocked and ready to pick up:** **item 6, Challenge Mode** — the last thing on this roadmap. Everything it wanted is in place: all five lines, all four hubs, and the percent card that gave the site its first worked example of one surface sitting on several structures. Read §6 before starting; it is larger than a line and wants its own planning document.

**Two measurements left open rather than fudged**, both recorded above: the hub taps' per-hub position clustering (§3b), and the Test Track's `options1` correct-last rate of 10 in 21.

**Settled 2026-08-08:**
- **Item 3 — the hybrid.** Percent gets full map presence and its own Plan model, dispatched on a `surface: "percent"` flag rather than on `line`; the Platform Check answer key is **not** touched, and the Ticket Booth asks which line is hiding under the percent. Problem set fixed in §3: Change (increase), Change (reverse — the keystone), Compare (`cp-hot-drinks`, already built), Part–Whole, Ratio. **Equal Groups gets none, deliberately.**
- **Item 2 — five problems on Equal Groups**, per the table in §2, fraction division last.
- **Item 6 — no scoring of any kind, and nothing gated.** Challenges are approachable at any time; the rounds differ by how much scaffolding they give, not by whether they are unlocked or marked.

*(The sister site question is answered and will not be asked again — see the section above and the `mr-fraction-sister-site` memory.)*
