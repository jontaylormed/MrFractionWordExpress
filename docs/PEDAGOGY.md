# Pedagogical Specification
### Mr Fraction's Word Problem Express
**Owner:** Teacher Agent · **Status:** Draft v1, pending Oversight sign-off · **Last updated:** 2026-07-28

---

## 0. Who this is for

Students in grades 6–12 who **struggle with word problems specifically** — not necessarily with arithmetic. This distinction drives every decision in this document.

The typical student we are designing for:

- Can often compute correctly when handed a bare equation.
- Freezes, guesses, or grabs-and-computes when handed a paragraph.
- Has been taught keyword tricks that worked until roughly grade 5 and now fail them.
- Has low mathematical self-concept and interprets confusion as evidence they "aren't a math person."
- May have a reading-related disability (dyslexia is the most common) that makes a dense paragraph of text a barrier *before* any math begins.

**Design consequence:** the bottleneck is almost never computation. It is *comprehension, representation, and self-monitoring*. The site must spend most of its interaction budget before the arithmetic ever starts.

---

## 1. The evidence base

These are the approaches this site implements, and why each was chosen.

### 1.1 Schema-Based Instruction (SBI) — the backbone

Struggling students treat every word problem as a brand-new, unique puzzle. Strong students recognize a small number of recurring *structures*. SBI explicitly teaches those structures.

SBI has among the strongest effect sizes in the word-problem intervention literature, and it works particularly well for students with learning disabilities. It is the single highest-leverage thing on this site.

**Implementation:** each schema is a **train line**. Classifying a problem = choosing which line you're riding. This is a required, explicit, assessed step — not an optional aside.

### 1.2 Polya's four phases — the visible structure

Understand → Plan → Solve → Look Back. Nearly a century old and still the cleanest metacognitive frame available. Its weakness is that students treat it as a checklist to recite rather than a process to perform.

**Implementation:** the phases are *places you physically travel through*, not boxes you tick. You cannot reach the Engine Room without passing through the Signal Box. The structure is enforced by the interface, which is what makes it a process rather than a poster.

### 1.3 The Three Reads protocol — comprehension before computation

The same problem is read three times, each with a different job:

1. **Read 1 — What's the story?** No numbers, no math. Just: what is happening here, to whom?
2. **Read 2 — What are the quantities, and how do they relate?** Now numbers appear. What is being counted or measured? What's connected to what?
3. **Read 3 — What is the question actually asking?** Restated by the student in their own words.

This is a language-comprehension intervention, and word problems are fundamentally a reading task wearing a math costume.

### 1.4 Numberless word problems — killing the grab-and-compute reflex

Students who have been trained on keywords learn a devastating shortcut: *find the numbers, guess an operation, compute, move on.* Presenting the problem with the numbers hidden makes that shortcut physically impossible and forces attention onto structure.

**Implementation:** at Boarding, numbers are **masked by default** (rendered as `▮`). The student reveals them by advancing to Read 2.

> **This is a deliberate friction point.** It will feel annoying to some students and some teachers, and it is the first feature likely to be requested for removal. It is doing exactly what it is supposed to do. A "reveal numbers early" escape hatch exists for accessibility, but the default stays masked. See §7.

### 1.5 Estimation before computation

Before touching arithmetic, the student commits to a rough answer and a *reasonable range*. This does two things: it activates number sense, and it creates a benchmark that makes the Look Back phase meaningful instead of ceremonial.

A student who estimated "about 40" and computed 400 has a self-generated reason to check their work. A student who estimated nothing has no reason at all.

**The estimate is a RANGE the student sweeps, not a number they type — built 2026-08-16, spec `ESTIMATE-INPUT.md`.** This section said *"a rough answer and a reasonable range"* from the beginning, and for months the control could only take the first half of that: a text box, identical to the one the Engine Room uses for an exact result. The copy above it read *"It doesn't have to be good. It has to exist"* while the input said otherwise.

Three things follow, and the first is the pedagogy rather than the interface:

- **An estimate genuinely is a region.** *"Somewhere between 40 and 60"* is a better estimate than *"50"*, and the old control could not express it. The student drags a band on a number line and its **centre** commits, so nothing downstream changes.
- **The modality now matches the mode of thinking** — the hand for a guess, the keyboard for a result. Inside the metaphor: a pencil on the platform, a dial in the Engine Room.
- **The scale is derived per materialisation and never authored**, because an authored one is right for number set 1 and silently wrong for the other three. It is also a pre-solve surface, so it may not hand over the answer: only the two ends of the line carry numbers, which is safe by construction. Labelling the interior ticks printed the answer on **4 of 148** materialisations before it was measured and removed.

**A sketch pad sits beside it — never parsed, never graded, never required.** It is thinking made visible rather than an input, and committing must never depend on a mark being in it. The Engine Room has one too, without a number line: there is nothing to sweep when you are calculating.

### 1.6 CRA and bar/tape diagrams — making relationships visible

Concrete → Representational → Abstract. Our representational layer is the **bar model** (tape diagram), because it handles the whole scope — fractions, ratios, percents, and linear equations — with one consistent visual grammar. A student who can draw the bar can usually write the equation.

### 1.7 Faded worked examples — managing cognitive load

The worked-example effect is one of the most robust findings in instructional research: for novices, studying a full worked example beats attempting the problem. But full examples stop helping as expertise grows (the *expertise reversal effect*).

**Implementation:** each train line's practice set is a **three-problem fade**:

| Position | Format | Student does |
|---|---|---|
| 1st | Full worked example, **on different numbers** | Studies a complete solution at the Test Track, then works their own problem |
| 2nd | Partially completed | Fills the missing steps |
| 3rd | Independent | Solves alone, with the hint ladder available |

> **A worked example must never run on the problem it is scaffolding.** *(User-found, 2026-08-04.)* The Engine Room used to print `step.workedExplanation` above the answer box whenever `fadeLevel === 'worked'` — and that is the same string shown as the confirmation *after* a correct answer, so it contained the answer. *"The top number says how many of those to take: 3 × 3 = **9** cups"*, directly above a box asking how many cups. Three problems × four number sets = **26 screens**.
>
> The user's instruction was the fix: *"the engine room should not have any worked examples that give the answer. Maybe in some cases, another example with different numbers."* All three of those problems already run a **Test Track** one screen earlier, demonstrating the identical strategy on different numbers — soup on threes and twos, posters on 4-5-8-10. So the worked rung of the fade was not lost; it was already in the right place, and the leaky duplicate was deleted. `workedExplanation` still runs as the confirmation once the student has answered.
>
> **Why no check caught it:** the leak scan was named and scoped `PRE_SOLVE`, and `solve` was not in it. But the Engine Room's *initial* screen is pre-solve by any honest reading — the student has not been asked yet. `solve` is now in the scan, and re-inserting the worked example reproduces the hits.

### 1.8 The escalating hint ladder — help that doesn't rob the learning

Hints are **request-only** and escalate one rung at a time. Never auto-fire a hint; never jump to the answer.

| Rung | Name | Gives away |
|---|---|---|
| 1 | **Whistle** — a nudge | Redirects attention ("Re-read the last sentence. What is it asking for?") |
| 2 | **Signal** — a strategy | Names the move without doing it ("Try drawing the whole bar first.") |
| 3 | **Coupling** — a partial step | Completes one step, leaves the rest |
| 4 | **Full route** — a worked step | Shows the step fully, with reasoning |

Hint usage is surfaced in the end-of-journey summary — **as information, never as a penalty.** Framing matters: "you used 3 hints on the Ratio Rail" is diagnostic; "you lost 3 points" teaches students to avoid asking for help.

---

## 2. What we deliberately do NOT teach

### 2.1 Keyword strategies — rejected

We do not teach "'more' means add," "'of' means multiply," "'left' means subtract," or acronym procedures (CUBES, RUCSAC, STAR) that are built on keyword hunting.

**Why:** keyword strategies are correlational shortcuts that break precisely when problems get interesting. They collapse on:

- *"Maya has 12 more stickers than Jon. Maya has 30. How many does Jon have?"* — contains "more," requires subtraction.
- *"A shirt costs $40 after a 20% discount. What was the original price?"* — contains "discount," requires division.
- Any two-step, comparison-with-unknown-referent, or inverse problem.

Worse, keywords teach students that *word problems are decoded, not understood.* That belief is the exact thing we are trying to undo. A student who succeeds via keywords in grade 4 becomes the grade 9 student who cannot start.

**What is rejected is the inference, not the vocabulary.** A student who does not know what *product* means is blocked by English, not by reasoning, and leaving them blocked is not rigour. §2.2 draws the line.

### 2.2 What we DO teach about words — three tiers

*User decision, 2026-08-03. This amends non-negotiable 4 (§7); it does not weaken it.*

The word "keyword" covers three different things, and only the third is the thing this site was built to refute.

**The rule that separates them, and the sentence to apply to any candidate entry:**

> **A word may set the question. Only structure sets the operation.**

| Tier | Examples | What the word does | How it is taught |
|---|---|---|---|
| **1 — it names it** | sum, difference, product, quotient, per, twice, half of, remainder, factor, total of | The word **is** the operation or its result. "Sum" *is* what addition produces. | **As vocabulary — a definable fact.** Test: can you define it without referring to any particular problem? If yes, it is tier 1. |
| **2 — it asks it** | more than, less than, left, each, altogether, in all, of, shared, both | The word flags **what kind of situation you are in** and hands the reader a **question**. It does not decide the operation. | **As a question, never as an answer.** "More than" is taught as *a comparison is happening — now find out which amount is bigger and which one you were told*. It terminates in a question. |
| **3 — it lies** | "more means add", "altogether means add", "left means subtract" | Correlation dressed as a rule. Works until problems get interesting, then fails silently. | **As a hazard only** — §2.3 Signal Failures, and `ch-water-tank`, which exists so that "more means add" fails. |

**Tier 2 is the reading instruction.** Those words are syntactic, not lexical: *"Ana has 1/4 mile more than Ben"* changes meaning entirely depending on which side of *more than* the known quantity sits. Teaching a student to notice that is teaching them to parse a sentence — which is the opposite of what CUBES does.

**Tier 2 will collapse into tier 3 in a student's head unless it is prevented.** Three constraints, all mechanically checkable, all in `VERIFICATION.md` §30:

1. Every tier-2 entry ships with **at least two worked examples in which the same word takes different operations.** A tier-2 entry with one example *is* a keyword strategy.
2. **No operation name appears adjacent to a tier-2 word in any student-facing string.** (Spec prose like this section is exempt; student copy is not.)
3. Tier-1 entries are **mathematical claims** and go through `math-reviewer` like any other.

Hub content carries `tier: "names" | "asks" | "lies"` on each section, so the keyword greps that guard the rest of the site can be scoped rather than deleted. Copy that quotes a tier-3 rule in order to refute it is legitimate **only** inside a section marked `tier: "lies"`.

### 2.3 Instead: Signal Failures

Keyword traps are taught **as hazards to detect**. On certain problems, Mr Fraction flags a **Signal Failure** — a spot where the obvious keyword reading sends you down the wrong track — and the student is asked to explain why the obvious move is wrong.

This converts the students' existing (harmful) prior knowledge into an object of study rather than pretending it isn't there. Kids find these genuinely fun, because catching the trap feels like insider knowledge.

---

## 3. The train lines (schema taxonomy)

Five lines cover **most** of the 6–12 word-problem space — not all of it. Each line has a **bar-model signature** and a set of **unknown positions**.

*Wording changed on user decision, 2026-08-03.* The site now teaches students to check whether a problem fits one of the five (§3.7), which means it must not simultaneously claim that everything does. "Most" is also the honest claim: multi-step problems routinely span two lines, and geometry, probability and combinatorial problems sit outside all five.

### 3.1 The Change Line 🟩
*Something starts, something happens, something ends.*

`Start ± Change = Result`

Unknown may sit in any of the three positions. **Result-unknown is easy; start-unknown is hard** and is where struggling students fail — because the story runs forward but the arithmetic runs backward.

- Result unknown: *"had 3/4 gal, used 1/3 gal, how much left?"*
- Change unknown: *"had 3/4 gal, now has 1/6 gal, how much used?"*
- Start unknown: *"used 1/3 gal, has 1/6 gal left, how much at the start?"*

### 3.2 The Compare Line 🟦
*Two quantities, side by side.*

Additive: `Larger − Smaller = Difference` · Multiplicative: `Larger = Factor × Smaller`

The pedagogical crux is the **referent** — "3 times as many *as what?*" Misidentifying the referent is the #1 error on this line, and it's the line where keyword strategies fail most spectacularly.

Percent change lives here.

### 3.3 Equal Groups Express 🟧
*The same amount, repeated.*

`Groups × Size of group = Total`

Unknown may be the number of groups, the group size, or the total. Fraction division lives here and is the hardest case in the middle-school curriculum: *"how many 2/3-cup servings in 4 cups?"* is groups-unknown, and students almost universally multiply instead.

### 3.4 The Ratio & Rate Rail 🟪
*A fixed relationship between two different units, scaled up or down.*

`a : b = c : d` · `Rate × Time = Distance`

The core competency is the **unit rate**, and the core difficulty is knowing which quantity to divide by. Includes the genuinely train-shaped problems (speed, travel time, two trains) — the strongest theme–content marriage on the site.

### 3.5 The Part–Whole Loop 🟨
*Pieces that make up a total.*

`Part + Part = Whole` · `Fraction/Percent × Whole = Part`

The home of fraction-of-a-quantity and percent-of-a-quantity. The crux is identifying **what counts as the whole** — the classic error being taking a fraction of the wrong whole in multi-step problems.

### 3.6 Cross-cutting: where's the missing car?

A unifying metaphor that carries across every line: a problem is a train with a **missing car**. Same line, same structure — but which car is missing changes everything about the difficulty.

This is how the site scales from middle to high school **without changing the framework**: the schema stays constant, the unknown moves to a harder position, and eventually gets a letter instead of a blank. Algebra then arrives as *"the missing car finally gets a name"* — a continuation of what students already know, not a new subject.

### 3.7 Before the five: the Platform Check

*User-approved 2026-08-03, provisionally — the wording and question set may be reworked. **Built the same day at the end of Read 1**; see §3.7.1 for the form it actually takes on screen, which is smaller than the checklist described here. The third verdict below is deliberately unbuilt.*

Students will meet problems that fit none of the five. A framework that never says so teaches its own kind of learned helplessness: the student who cannot place a problem concludes they cannot read, when in fact the map does not reach there.

**The Platform Check is a pre-check, not a sorter.** It runs *before* the five are assumed, and it asks whether the map applies at all. Sorting into five is what the Ticket Booth already does; re-asking it would violate *never author a question whose answer is already on the ticket*.

Four questions. It must be short enough to run in the student's head — anything longer becomes a procedure performed instead of thinking, which is CUBES with better manners.

1. **What amounts am I given, and are they the same kind of thing?** Two different units point at a rate; one kind of thing points away from it.
2. **Does anything happen to them, or do they just sit there?** Time passing separates Change from Compare.
3. **Is anything repeating, or is one thing being cut up?** The single question that separates the two most-confused lines — already written, in student words, in `five-situations.js` under "The two that get mixed up most."
4. **Does one line cover the *whole* problem, or only part of it?**

**Question 4 is the open end, and it has three legitimate verdicts.** All three must be presented as equally ordinary outcomes — a student who reaches verdict 2 or 3 has read *well*, not badly:

| Verdict | What it means | What the student does |
|---|---|---|
| **One line fits.** | The commonest case. | Board it. |
| **Two lines, stacked.** | **Two different *situations*, one after the other** — not merely two steps. | Name the line for the **first situation only**, and re-run the check when it is done. |

> **Steps and situations are not the same thing, and conflating them shipped a defect.** This table originally read *"Two lines, stacked. Multi-step."* Six problems in the bank declare `steps: 2` while staying inside a single schema — `pw-band-brass` computes the whole and then the other part, both Part–Whole throughout. The Platform Check's fifth question inherited the conflation, offered *"there is a step in between"* as an always-wrong option, and told a correct reader that the problem took *"a single move from what you are given"*. It was false on more than a third of the bank. Found independently by the teacher and math agents, 2026-08-03. **A problem may take many steps inside one situation; it takes two lines only when the kind of situation itself changes.**
| **None of them fits.** | A finding, not a failure. | *Deferred — see below.* |

**Not built, by user decision (2026-08-03):** what happens on verdict 3. The candidate content is a set of schema-free moves — make the numbers stupidly easy and re-read; work backwards from what is asked; draw it before deciding anything; try a value and adjust; say the relationship as a sentence, then write that sentence as an equation. Thematically it is the siding, the track a train takes when no scheduled line goes there. **Do not build it without the user's decision.** Until then the verdict may be named honestly but must not be dead-ended into nothing — that is the open item.

### 3.7.1 What was built — the first read across two screens

*Built 2026-08-03 in `stations.js` (`CHECK`, `PLATFORM`, `phRead1`, `phPlatform`), on all sixteen problems. User's instruction: replace the reflection question with the five, then prove it on the next page.*

| | |
|---|---|
| **`read1` — classify** | The five questions, as tapped choices. **This replaced the free-text retelling.** Mr Fraction's reading of the story still appears, at the end of the five rather than before them, so the comprehension anchor and the sixteen authored `modelAnswer`s stay live. |
| **`platform` — prove it** | The story's sentences become tappable. The student picks **every** sentence that carries the signal, then gets the resolution and the map, with their own row marked. |

**Both screens are numberless.** The Platform Check is about the shape of the story; a visible number invites arithmetic.

**The five questions** — each option declares which lines it is true of, so the answer key *is* the schema and cannot drift from it:

| | Question | What it separates |
|---|---|---|
| Kinds | What is being counted? | Ratio & Rate from everything else |
| Moments | Does anything happen to it? | Change from everything else |
| Things | How many separate things is the story keeping track of? | Compare from the rest |
| Shape | Is anything being cut up, or repeated? | Part–Whole from Equal Groups |
| Question | Does a single line cover this whole story? | the honest exit — see below |

**Why the split into two screens is load-bearing, not cosmetic.** The station header prints *"The Change Line · Start ± Change = Result"* above **every** phase, Read 1 included. So the five questions can be part-answered off the furniture — three stations into a themed trip, the answers are constant for that line. **The evidence cannot be**: which sentences carry the signal changes problem to problem, and finding them requires reading. So screen one classifies, screen two makes you prove it, and the reading is enforced where it can be.

It follows that **inside a trip the student is never asked to name the line.** They chose it off the map; the site names it for them, and the map on screen two shows why.

**The fifth question is the open end.** *"It takes more than that — there is a step in between"* and *"None of them really fits"* are both offered, and both get a reply that treats them as real answers a student should keep in their pocket — *"not every problem you meet fits these lines"* — before saying that this particular one does. Every current problem is single-line, so the correct answer is always the first; that is a known weakness of the question and the reason its wrong-answer copy carries the teaching.

**Ungraded.** Nothing is scored, a wrong tap explains what that answer *would* have meant rather than marking it, and a second wrong pick on screen two simply shows the answer. Support increases; the gate holds.

**Still unbuilt:** the verdict branches as real content, and the full check in a Learning Hub where naming the line is an honest question. The hub renderer already dispatches a bespoke widget off `h.tool` (`app.js`, the Shunting Yard), so `tool: 'platform-check'` needs no engine work.

**The standing risk:** a checklist is an acronym procedure wearing different clothes. What keeps this one honest is that every question terminates in a **question about the situation**, no step ever names an operation, and "none of these" is a permitted answer. If any of those three erodes, this has become the thing §2.1 rejects.

---

### 3.8 Two lines at once — Crossover Island, built 2026-08-15/16

**§3 above has always ended by admitting that "multi-step problems routinely span two lines", and listing that among the things sitting outside the five.** It is taught now rather than acknowledged. Full design: [`CHALLENGE-MODE.md`](CHALLENGE-MODE.md).

A Challenge problem is **two of the five situations, one after the other**, and the second cannot start until the first has finished. The idea the whole thing turns on has a name:

> **The transfer** — the one value the first situation hands to the second. It is an **answer** on one side of the problem and a **given** on the other.

**The new skill is reading, not arithmetic.** A student who can do all five situations already has every operation this needs. What they cannot yet do is see that a problem contains two of them, and find the seam — which is why the reading protocol, not the calculation, is where the work went.

**The lesson meant to outlast the island**, and it is the most transferable sentence in this document:

> **The checklist does not classify a PROBLEM. It classifies a STRETCH OF STORY.**

It has always worked on whole problems because, until here, whole problems were one situation — so the stretch and the problem were the same thing and nothing made a student notice the difference. On a two-line problem they come apart: run the five questions on the first half and get one answer, run the same five unchanged on the second and get a different one. **Two true answers is not confusion; it is the story telling you it has a middle.**

**The classic error is stopping at the transfer**, and it is the primary distractor on all seven problems. It is not a careless mistake — the student computed a correct number and answered with it. So the feedback must say *that is right, and it is the answer to the first half* before it says anything else, or it teaches a student who did good work that they cannot do arithmetic.

**Scaffolding fades by stop, and nothing is gated or scored.** Three staffed platforms teach the move; two unstaffed halts run the checklist and then the arithmetic, with no reads, no Ticket Booth and no estimate. A halt is not a harder place or a remedial one — it is the stop you are trusted with. **Any copy there that implies assessment puts a score back into a mode the user removed on purpose.**

**And it has a hub: The Lighthouse**, the fifth, seven pages, listed on *both* maps and reachable by somebody who has never ridden a stop. Its relationship to the island is the one the Word Board has to Five Situations — **read it here, decide it there.** The hub teaches what a crossover is, how the checklist behaves when a story has two halves, and what it means for a number to be carried between them. Finding the seam in a *particular* story happens on the island, where it is the student's job. Nothing in the hub is gated and nothing is scored.

---

## 4. The lesson flow

> **Structural note (v1.1).** Two levels, and it matters which is which.
>
> - **Macro — the trip.** A trip is 3–5 **stations**, each foregrounding a *different strategy*, all themed to one schema, ending at a **Terminus Hub** that assesses whether the student can now choose an approach unaided. That structure lives in [JOURNEY-ARCHITECTURE.md](JOURNEY-ARCHITECTURE.md).
> - **Micro — the phases below.** Polya's four phases run *inside every station*, on every problem. What changes station to station is **which phase carries the scaffolding**.
>
> So: **strategies are the curriculum; Polya is the loop.** At the Reading Room, understanding is heavily supported and solving is nearly automatic. At the Switchyard, comprehension is brisk and planning is where the work happens. Every problem still gets fully understood, planned, solved, and checked — the station decides where the student's attention is spent.

### The four phases, in every station

**One word problem = one pass through these four phases.**

### 🚉 Phase 1 — Boarding *(Understand · Three Reads)*
- **Read 1:** problem shown with **numbers masked**. Prompt: *"What's the story? Who's involved and what's happening?"* Student responds in free text (self-assessed against a model answer — this is reflection, not grading).
- **Read 2:** numbers revealed. Student identifies the quantities and what each one measures.
- **Read 3:** the question sentence is isolated and highlighted. Student restates it in their own words.
- **Gate:** student must attempt all three reads to proceed. No correctness gate — this stop is about attention, not accuracy.

### 🎫 Phase 2 — Ticket Booth *(Understand · SBI)*
- *"Which line are you riding?"* — student selects one of the five schemas.
- Feedback explains **why**, in terms of structure, regardless of right or wrong. A wrong choice is genuinely informative and gets a real explanation, not a buzzer.
- Then: *"Which car is missing?"* — student identifies the unknown's position.

### Multi-given problems mark each colour separately

When a problem hands over **two** parts — two fifths blue *and* one quarter red — the Model Yard marks them in stages, one colour at a time. This is the whole point of that problem: **you cannot know the coloured total until you have added the two givens**, so the yard makes the addition physical instead of stating its result.

Two rules that keep it honest:
- **Prompts name the fraction, never the count.** *"2/5 of the quilt is blue"* forces the student to work out that two fifths of twenty is eight. *"Tap 8 parts"* would hand it over.
- **Staged marking is confirmed by a button, not auto-settled.** Settling the instant the count is right lets a student tap one at a time and watch for the click.

A wrong count teaches the method rather than just rejecting: *"That is 6 parts. 2/5 of 20 means splitting 20 into 5 equal groups and taking 2 of them."* Completing both stages ends with the addition spelled out — *"8 + 5 = 13 of the 20 parts are spoken for, which leaves 7."*

### GCF and LCD are different jobs, and students conflate them

Adding 2/5 + 1/4 needs the **lowest common denominator**; simplifying 8/20 needs the **greatest common factor**. Both occur in this bank, they sound alike, and they do opposite things. The Fraction Yard now teaches both with one sentence to separate them: **the GCF makes the numbers smaller; the LCD makes the pieces match.**

The **Shunting Yard** tool lists the factors and the multiples of any two numbers and highlights what they share, so the common ground is visible rather than hunted for. Students were previously expected to find a common denominator with no way to see what 5 and 4 have in common.

### The Model Yard — every problem gets a picture the student builds

A struggling reader will not construct a mental model from a paragraph, and a diagram they can shade at random teaches nothing because nothing responds. Every problem now carries an **interactive, animated model** the student assembles in three moves:

1. **Split** — cut the whole into equal parts. This makes the denominator physical: *four parts* is something you do, not a number you read.
2. **Mark** — pick out the parts the problem is talking about. The model checks the count and names what is left over.
3. **Read off** — what one part is worth, how many are marked, how many remain.

The data lives in `signalBox.barModel.bars[]` as `marked` / `markedLabel` / `restLabel`, and the validator rejects a problem without them — a model that cannot check the student's picture is decoration.

**Motion rules.** The animation is decorative: every state is carried by `aria-pressed`, by the numeric readout, and by the written description underneath, so nothing is conveyed by movement alone. State is never applied by a transition — fills animate on a separate overlay layer while the button's own state flips instantly. Under `prefers-reduced-motion` the stagger and sweep are removed and the model still reads correctly frozen.

> **This is the only question the Ticket Booth asks inside a themed trip.** It used to ask "which line is this?", but the student chose the line off the map two screens earlier, so the answer was handed to them. **A question whose answer is already on the ticket assesses nothing and teaches nothing.**
>
> Choosing between the five lines is a real skill, so it still gets practised — but only where the answer isn't given away:
> - **The Learning Hub "The Five Situations"** — the student isn't riding any line, so identification is genuine.
> - **The Terminus Hub**, but *only* when the Hub problem can come from a line the student did not just ride. This is evaluated from the content bank at runtime, so it switches itself back on as soon as a second line has problems. Until then the Hub says plainly why it isn't asking.
- **Gate:** must reach the correct line to proceed (with unlimited attempts + escalating support). This is the load-bearing skill; we don't let students past it.

### 🛤️ Phase 3 — Planning *(Plan · CRA + estimation)*
- **Build the bar model.** Interactive: student partitions and labels bars to match the structure. Bar model is pre-scaffolded by line type.
- **Commit to an estimate**, with a stated range. Deliberately *before* any exact computation.
- **State the plan** — the operation(s), in order, and why.
- **Gate:** estimate must be submitted before the Engine Room unlocks. The estimate does not have to be *good* — it has to *exist*.

### ⚙️ Phase 4a — Engine Room *(Solve)*
- The actual computation, entered step by step.
- Hint ladder available on request (§1.8).
- Errors get **diagnostic** responses tied to known misconceptions for that schema — not "try again."
- Fraction/percent work is checked for form as well as value (e.g. accepting `0.75`, `3/4`, `75%` where equivalent, and saying so explicitly — equivalence awareness is itself content).

### 🛎️ Phase 4b — Arrivals Board *(Look Back)*
Four checks, in order:
1. **Estimate check** — does the answer sit in the range you predicted? If not, what happened?
2. **Question check** — does this answer the question that was *asked*? (Multi-step problems where students solve step 1 and stop are a top failure mode.)
3. **Units check** — is the label right?
4. **Reasonableness** — is this sensible in the real world? (Negative people, 1,400 mph trains, etc.)

Then the student **departs for the next station**, where the same four phases run again with a different strategy foregrounded and a different problem type. Consolidation happens across stations; the **Terminus Hub** at the end of the trip is where it gets assessed.

---

## 5. Difficulty scaling — one path, grades 6–12

The framework never changes. Four dials turn *within* a problem:

| Dial | Easier end | Harder end |
|---|---|---|
| **Unknown position** | Result unknown | Start unknown / referent unknown |
| **Number type** | Friendly fractions, whole percents | Non-friendly rationals, decimals, negatives |
| **Steps** | One step | Two or more, with intermediate quantities |
| **Notation** | Blank in a bar | Variable in an equation |

And a fifth dial turns *across* a trip: **how much scaffolding you get**, expressed as route length.

| Route | Stations | Support |
|---|---|---|
| **Local** | All 5 + Hub | Stops everywhere. Every strategy taught explicitly. |
| **Express** | 3–4 + Hub | Skips strategies already demonstrated. |
| **Limited** | 3 + Hub | Runs direct. Minimal scaffolding, harder unknown positions. |

This uses rail semantics correctly and does real work: **more support = more stops**, so a student who needs help takes the *Local*. Notice what that avoids — a 17-year-old riding the Local is on a **thorough** route, not a *younger* one.

**Tone rule:** difficulty is described by route length only. Nothing on this site displays a grade number to a student, and no copy may imply that a longer route is for younger students. See the Theme spec for how this is enforced.

---

## 6. Assessing growth without storing anything

No localStorage, no accounts, no persistence. Growth is therefore measured **within a session** and shown on-screen at the end.

The **Terminus Hub report** at the end of each trip reports:
- **Strategy selection** — did the student choose an appropriate approach *unaided*, and could they say why? **This is the headline metric.** It is the direct measure of whether the trip taught anything transferable.
- **Self-caught errors** — times the student caught their own mistake at Look Back before Mr Fraction did. Close second; self-monitoring is the actual goal of the whole site.
- Schema-identification accuracy, **first attempt vs. later attempts** across the trip.
- Estimate calibration — where estimates landed relative to actual answers. Improving calibration across a trip is real, visible growth.
- Hint rungs used, by station — shows *where* support was needed, which is diagnostically useful.

Note the ordering. A student who **chose well and slipped in arithmetic has learned more** than one who guessed an approach and got lucky, and the report must say so in that order. Putting correctness on top would quietly re-teach that being right matters more than thinking well — which is the belief that produced the grab-and-compute reflex in the first place.

**Framing requirement:** the summary is written as a *trip report*, not a *score report*. No percentages, no grades, no letter marks. Language is descriptive and forward-looking ("you got faster at spotting the Compare Line"), because the target student's relationship with scores is already damaged.

---

## 7. Non-negotiables

Any change that violates one of these requires explicit Oversight sign-off, recorded in the review log.

1. **Schema identification is a required, gated step.** It is not optional and cannot be skipped.
2. **Numbers are masked on first read by default.**
3. **An estimate must be committed before computation is unlocked.**
4. **No word is ever taught as sufficient to choose an operation.** *A word may set the question; only structure sets the operation.* Vocabulary that **names** an operation (tier 1) and words that **name the situation and hand the reader a question** (tier 2) are taught — see §2.2, amended on user decision 2026-08-03. Words that merely **co-occur** with an operation are taught only as hazards (§2.3). The ban is on the inference, and it is absolute.
5. **Hints are request-only and escalate one rung at a time.**
6. **No grade levels are ever shown to students.**
7. **No scores, percentages, or letter grades.** Progress is described, not graded.
8. **Look Back is never skippable.** It is the phase students skip in real life and the phase that matters most.
9. **The Terminus Hub gives no strategy hint.** The student must choose their own approach and justify it. Scaffolding the Hub destroys the only transfer assessment on the site.
10. **The Hub problem must be genuinely novel** — an unknown position and context not seen in that trip. If the bank can't supply one, run no Hub and say so. A dishonest assessment is worse than none.
11. **Learning Hubs are never gated, never mandatory, and never described as remedial.** They are visible on the map from the first screen so that visiting one is ordinary navigation, not an admission.

---

## 8. Open questions for Oversight

- **Q1:** Should the Read 1 / Read 3 free-text responses be evaluated at all, or purely self-assessed against a model answer? Automated evaluation without a backend is unreliable; self-assessment risks students clicking through. *Teacher agent's recommendation: self-assess, but require the student to type something before the model answer is revealed — production before comparison.*
- **Q2:** Does the mandatory schema gate at Stop 2 risk hard-blocking a frustrated student? *Recommendation: after 3 incorrect attempts, Mr Fraction narrows to two options and explains the discriminating feature — support increases, but the gate holds.*
- **Q3:** Is the accessibility escape hatch for number-masking (§1.4) a pedagogical loophole that will get over-used? Needs a Theme agent + Student agent ruling on where the toggle lives and how discoverable it is.
