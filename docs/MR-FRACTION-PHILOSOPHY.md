# The Mr Fraction Philosophy
### What makes something a Mr Fraction site, and what survives a change of topic

**Written 2026-08-17**, on the user's instruction: *"deep thinking on what makes something a Mr Fraction site and how that carries over… I am trying to develop a Mr Fraction philosophy for visually teaching Math Concepts to drive all websites."*

**This document argues with itself on purpose.** A philosophy that only lists its own strengths is a brand guide. The parts most worth reading are §4, where the case against is made as well as it can be, and §3, which separates what is true of *Mr Fraction* from what is merely true of *word problems* — a distinction that does not exist anywhere else in this repo and that the next site will stand or fall on.

---

## 1. The empirical base is n = 2, and that is worth being honest about

There are two Mr Fraction sites: **the Factory** and **the Word Problem Express**. Two is enough to see a pattern and not enough to prove one. Everything below is a hypothesis with two data points, and the third site is the test.

**What the two already share, observed rather than asserted** (`ART-DIRECTION.md` §3):

The Factory's signature is slowly rotating **gear** watermarks at 8–12% opacity, fixed to the viewport, `pointer-events: none`, non-informational. The Express's are **wheels, steam, a station clock and track hatching** — same opacity band, same slowness, same fixedness, same refusal to carry information.

**The transferable thing is not the gears.** It is: *ambient, non-informational motion at the threshold of notice, which makes the page feel like a working place rather than a document.* A mine would get dust motes and a swinging lamp; an algebra site would get something else again. **The device changes; the treatment is the constant.**

That single observation is the model for this whole document. **Almost nothing about a Mr Fraction site transfers as an artefact. Nearly everything transfers as a treatment.** Copy a gear and you get a train station with gears on it. Copy the treatment and you get a third place that feels like the first two and looks like neither.

---

## 2. The five invariants

Each is stated with the **test** that decides whether a new site honours it, because a principle you cannot fail is decoration.

### 2.1 The metaphor must be load-bearing

On the Express, **a line IS a schema.** Not "problems are stored on lines" — the Change Line *is* the change structure, and asking *"which line is this?"* is asking *"which structure is this?"* The Ticket Booth is the schema-identification gate. The map is the taxonomy. The transfer ticket is analogical transfer. The metaphor and the mathematics are the same object seen twice.

> **The test.** Name the metaphor's central noun, then name the mathematical object it *is*. If the sentence needs the word "represents" or "stands for," the metaphor is decoration. `A line IS a schema` passes. `A mine shaft represents a factoring problem` fails.

This is the invariant most at risk on the next site, and §6 shows exactly where it breaks.

### 2.2 The picture shows what is GIVEN, never what is DERIVED

This is the deepest rule in the project and the one most likely to be the real Mr Fraction contribution to teaching. It is not an aesthetic preference; it is a claim about what a diagram is *for*.

Everything in `ART-DIRECTION.md` §6b is a consequence of it: **no numerals in a scene**; when the drawn objects *are* the quantity they must be **uncountable** (benches running off both edges, overlapping); **no measurement furniture** — no rulers, brackets or shared baselines, because measuring is the model's job where the geometry derives from the live numbers; and **no motion implying a compared quantity changed**.

And its sharpest form, learned the hard way three times: **the Model Yard may state a part's value only if the problem gives that value.** A per-part figure the student would have to *derive* is the student's work, drawn.

> **The test.** For every number and every measurable relation visible on the screen, ask: *did the problem hand this over, or would the student have to produce it?* If the second, the picture is doing the work.

The corollary is the harder half, and this project has broken it five times: **removing the leak must not empty the surface.** Blanking a value once left the yard saying *"Each part is ? shots"*, which reads as broken software. The fix is to draw what the problem *does* give and let that pose the question — *"those parts together are 96, so what is one worth?"* **A picture that has been censored is not the same as a picture that asks.**

### 2.3 A surface feature may set the question; only structure sets the method

`PEDAGOGY.md` non-negotiable 4, and the site's founding argument. `ch-water-tank` exists so that *"more means add"* fails.

The three tiers are the reason it is a philosophy rather than a prohibition. **Tier 1** words *name* the operation (*sum, product, quotient, per*) — a student who does not know "product" is blocked by English, not by reasoning, and is taught. **Tier 2** words name the *situation* and hand the reader a *question* (*more than* → *a comparison is happening; which is bigger, and which were you told?*) — taught, and required to terminate in a question, never an operation. **Tier 3** is mere co-occurrence, and is taught only as a hazard.

> **The test.** Take the site's most seductive surface cue and write the problem where it lies. If you cannot, the topic may not need this machinery — but you should be suspicious, because every topic has one.

### 2.4 Recognition is a gated step, before execution

Schema identification cannot be skipped (non-negotiable 1). Numbers are masked on first read (2). An estimate is committed before computation unlocks (3).

The unifying claim: **the student must commit to an interpretation before they are allowed to calculate.** Not because committing is pleasant, but because a commitment is the only thing an error can later be measured against. This is what makes self-monitoring possible at all — you cannot catch yourself out if you never said anything.

### 2.5 Progress is described, never graded; help is never a demotion

No scores, no percentages, no letter grades, no grade levels shown (non-negotiables 6, 7). The trip report opens *"No score, no percentage. This is about how you travelled."* Correctness comes **last** and defused: *"Hub problem: not this time. That's information, not a verdict."*

Learning Hubs are **never gated, never mandatory, never described as remedial**, and are visible on the map from the first screen **so that visiting one is ordinary navigation rather than an admission** (non-negotiable 11).

This follows directly from who the site is for (`PEDAGOGY.md` §0): students with **low mathematical self-concept who interpret confusion as evidence they "aren't a math person."** For that student a percentage is not information, it is a verdict on their identity. This invariant is not softness; it is the design consequence of the audience.

---

## 3. The distinction nobody has drawn yet: Mr Fraction vs. word problems

**This is the most important section in the document, and getting it wrong is the likeliest way to ruin the third site.**

`PEDAGOGY.md` §0 is unambiguous about why the Express is built as it is:

> *"the bottleneck is almost never computation. It is comprehension, representation, and self-monitoring. The site must spend most of its interaction budget before the arithmetic ever starts."*

**That is a finding about word problems. It is not a finding about mathematics.** And a great deal of what feels like Mr Fraction's identity is actually downstream of it:

| Machinery | Exists because… | Survives a topic with no paragraph? |
|---|---|---|
| **Three Reads** | a dense paragraph must be decoded three ways | **No.** There is nothing to read three times. |
| **Numberless first** | digits trigger grab-and-compute *in prose* | **Partly** — the reflex is real anywhere, but the mechanism is textual |
| **The Platform Check** | a story must be classified before it is solved | **Only if the topic has classes** |
| **The estimate gate** | an answer's magnitude is knowable before it is computed | **Rarely.** You cannot estimate a factorisation |
| **Signal Failures** | prose contains misleading words | **No** — no prose, no misleading words |
| **The picture rules (§2.2)** | a diagram can leak an answer | **Yes, entirely** |
| **Recognition before execution (§2.4)** | committing enables self-monitoring | **Yes, if the topic has forms to recognise** |
| **Described-not-graded (§2.5)** | the audience's self-concept | **Yes, unconditionally** |
| **Structure over surface (§2.3)** | keyword tricks fail past grade 5 | **Yes — the trap changes, the error class does not** |

**So the honest formulation is:**

> **Mr Fraction is not a word-problem method. It is a method for making mathematical *structure* visible and requiring a student to commit to it before computing — and on word problems, that method happens to require Three Reads.**

A factoring site that ships Three Reads because Mr Fraction sites have Three Reads would be **cargo-culting the artefact and losing the treatment**, and — because it would look complete and behave plausibly — nobody would notice. `NEXT-SITE-KIT.md` §2 names this as the worst available failure: *scaffolding that scaffolds nothing, and it looks finished.*

### And the reframe worth taking away

The user's phrase is *"visually teaching Math Concepts."* Held against what is actually built, that undersells it in a specific way.

The Express is **text-heavy by design**. The visual work is concentrated in one phase, and every art rule in §2.2 *removes* pictorial information — no numerals, uncountable objects, no rulers, no brackets. These are not the rules of a site that teaches *with pictures*. They are the rules of a site where **the picture's only job is to show a relationship, and anything else in it is noise that can leak.**

> **Mr Fraction is not a visual-math brand. It is a structure-made-visible brand.** The drawing is not an illustration of the problem; it is a diagram of the problem's *shape*, deliberately stripped of everything that is not that shape.

That is a sharper and more defensible thesis than "visual math," it explains the art rules rather than merely permitting them, and — unlike "visual" — it tells you what to leave out.

---

## 4. The case against

### 4.1 The theme is extraneous cognitive load — the strongest objection

Sweller's cognitive load theory holds that working memory spent on material unrelated to the learning objective is spent at the objective's expense. A struggling student navigating stations, tickets, platforms, halts and a map is decoding a **second symbol system** on top of the mathematical one. Every term is a term they must learn that no exam will ever use.

**This objection is correct wherever §2.1 fails**, and it is the reason §2.1 is stated as a test rather than a taste. A metaphor that maps 1:1 onto the mathematics is not extraneous load at all — it is a **retrieval structure**, giving an abstract schema a name, a colour and a place, which is close to what SBI asks for anyway. A metaphor that maps loosely is pure tax, charged to exactly the students least able to pay it.

**The concession, and it is real:** nobody has measured this. There is no evidence in this repo that the train framing helps rather than costs, and the site has never been in front of a student. The claim in §2.1 is a *design* argument, not an empirical one, and it should be the first thing teacher and student feedback is used to test. **The right question to ask a real student is not "did you like the trains?" but "what is a line?"** — if they answer with a structure, the metaphor is load-bearing; if they answer with a colour, it is decoration and it is costing them.

### 4.2 The philosophy may be over-fitted to one audience

Everything descends from `PEDAGOGY.md` §0: a grade 6–12 student who computes adequately and freezes at paragraphs. That is a real and underserved group. It is not everyone. A student whose actual deficit is arithmetic fluency gets, from this design, a great deal of ceremony before the thing they need. **Applied to a topic where the procedure is the bottleneck, "spend most of the interaction budget before the arithmetic" becomes an argument for spending most of it in the wrong place.**

### 4.3 A house style becomes a cage

Two sites in, the furniture is strong: stations, phases, a map, a companion, ambient watermarks, six line colours. The third site will be *easier to build* by reusing them and *better* only if the mathematics genuinely wants them. There is real gravity here, and it pulls toward bending the maths to fit the furniture. **The mitigation is procedural, not aesthetic:** decide the recognition task (§6) *before* opening a stylesheet, and let the metaphor be chosen by the mathematics rather than inherited.

### 4.4 The non-negotiables have never been stress-tested by disagreement

Eleven non-negotiables, amended exactly once, by the user. Everything else has been reviewed by the same model wearing different hats — a limitation this project states in its own review log every cycle. **A philosophy that has never lost an argument has not been tested; it has been unopposed.** Teachers using the site are the first genuinely independent readers it will ever have, and non-negotiable 7 (no scores) is the one most likely to be challenged first, because teachers need something to put in a gradebook.

*Recording the anticipated defence, so it is argued rather than reflexive:* the site can honestly report **what a student did** — schema chosen first try, estimates committed, errors self-caught — without converting it to a number. That is more useful to a teacher than a percentage and it does not break the invariant. **If it must break, it should break by the user's explicit decision and be written into the log the way non-negotiable 4 was.**

---

## 5. The test: is this a Mr Fraction site?

Six questions. **Fewer than five clear "yes" answers means it is a maths site with Mr Fraction's paint on it.**

1. **Is the metaphor's central noun identical to a mathematical object**, with no "represents" in the sentence? (§2.1)
2. **Does every picture show only what the problem gives** — and does removing a leak leave a question rather than a blank? (§2.2)
3. **Is there a surface cue the site deliberately breaks**, with a problem authored so that following it fails? (§2.3)
4. **Must the student commit to an interpretation before computing**, in a gated step they cannot skip? (§2.4)
5. **Is progress described rather than graded**, and is help reachable before any failure, without stigma? (§2.5)
6. **Does the page feel like a working place** — ambient, non-informational life at the threshold of notice? (§1)

And one that is not about the product:

7. **Does the project record its failures where the next person will trip over them?** `VERIFICATION.md` is 41 rules, 40 written after a real failure here. That habit is not incidental to the quality of these sites; on the evidence of this repo, it is most of the cause.

---

## 6. Applying it: Mining for Math Factors, and Factoring Binomials

### The question that comes before both

**What is the recognition task?** On the Express it is *"which of five situations is this?"* If the next topic has no equivalent, §2.4 has nothing to gate and most of the machinery is ceremony.

### Factoring Binomials — the better fit, and it is not close

It has genuine **forms**: common factor, difference of squares, trinomial with leading coefficient 1, trinomial with leading coefficient ≠ 1. That is a taxonomy, which means a recognition step, which means §2.4 has work to do and §2.3 has a trap worth breaking — ***"it has a minus sign, so it's difference of squares"*** is the same error class as *"more means add"*, and `x² − 5x + 6` refutes it exactly the way `ch-water-tank` refutes the keyword rule.

**§2.2 is where it gets genuinely interesting.** The area model is a real diagram of the structure: a rectangle whose sides are the factors and whose area is the expression. Drawn correctly it shows the *given* — the area — and leaves the **sides** as the question. Drawn carelessly it labels the sides and hands over the answer, which is `model.js`'s exact defect in a new costume. **The rule ports without modification; only the shapes change.**

And the check-by-expanding loop is §2.4's commitment structure with a different name: **commit to a factorisation, then multiply back.** Better than the estimate gate, in fact, because the verification is exact rather than approximate.

### Mining for Math Factors — the harder case, and worth saying why

Prime factorisation has **no taxonomy of forms**. Every number is approached the same way. So there is no recognition step, §2.4 has nothing to gate, and the site would have the strongest possible pull toward building stations that gate nothing.

**But it has something the Express does not**, and it may be the better *idea* even though it is the worse fit for the existing machinery: **the fundamental theorem of arithmetic is a genuinely visual, genuinely structural claim** — a number has exactly one prime factorisation, and it is a property of the number rather than of the route you took to find it. Two different factor trees for 72 landing on the same multiset is a picture of a theorem, and it is the sort of thing students are told and never shown.

> **A mine is the wrong metaphor for that, by §2.1's test.** Mining is *search* — you dig where you guess. The theorem is about *uniqueness of destination regardless of route*. The metaphor that fits is closer to **many paths converging on one place**, and the honest conclusion is that this topic wants a different central image and possibly a different site shape entirely. **That is a finding, not an obstacle** — it is the philosophy doing its job, which is to stop the furniture choosing the mathematics.

### Recommendation

**Factoring Binomials as the third site**, on the grounds that its taxonomy gives §2.4 real work, its area model exercises §2.2 unchanged, and its keyword trap makes §2.3 immediately concrete. Build it, and the philosophy gets its n = 3 test on a topic where the invariants are all live.

**Keep Mining for Math Factors** for after that, and treat it as the deliberate stress test: a topic with no recognition task, which will force the philosophy to say what a Mr Fraction site is when its most-used machinery does not apply. **That is the more interesting question, and it should be asked second rather than first.**

---

## 7. What would change my mind

Stated so that this document can lose an argument.

- **A student who can use the site fluently but cannot say what a line is.** That is §2.1 failing and §4.1 winning, and it would mean the metaphor is decoration charged to the student.
- **A teacher who reports that the absence of a score makes the site unusable in a real classroom.** Non-negotiable 7 would then be trading a real deployment for a principle, and that trade is the user's to make.
- **A third site that honours all six tests and still teaches badly.** That would mean the tests describe a house style rather than a pedagogy, and this document would need rewriting from §2.

**None of these can be settled from inside the project.** Every one needs the teachers and students who are about to start using it — which is the same conclusion every review cycle here has reached, arrived at from a different direction.
