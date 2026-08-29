# Structure and Difficulty
### Where the hard concepts are hard, and what a Mr Fraction site would have to draw

**Written 2026-08-17**, answering the user's question: *"How does structure apply to other Math Concepts, especially concepts that students struggle to understand?"*

Companion to [`MR-FRACTION-PHILOSOPHY.md`](MR-FRACTION-PHILOSOPHY.md), which establishes the invariants and the verb taxonomy. This one applies them, and is meant to grow as sites are planned.

---

## 1. The diagnosis first, because the catalogue is useless without it

Ask *why* students struggle and the usual answers are about the student — weak fluency, poor attention, gaps from earlier years. Those are real and they are not what this document is about. **Ask instead what is structurally hard about the concept itself**, and the persistent difficulties across grades 6–12 fall into a small number of shapes.

### 1.1 Equivalence blindness — not seeing that two things are one thing

The student believes **rewriting creates a new object** rather than re-dressing the same one.

- `2/4` and `1/2` are treated as two numbers that happen to be "equal", not one number written twice.
- Each line of an equation solution is treated as **a new problem**, rather than the same statement in different clothes.
- `x² + 5x + 6` and `(x+2)(x+3)` are two expressions, not one.
- The **equals sign is read as an instruction** — *"compute"* — rather than as a claim of sameness. This is the best-documented misconception in school algebra, and it is the root of the other three.

**What it looks like in the wild:** a student who "solves" `3 + 4 = □ + 2` by writing 7. They are not being careless. They are reading `=` as *"and the answer is"*, which is what six years of arithmetic taught them it means.

### 1.2 Referent blindness — not knowing what the whole is

Every relative quantity is relative *to something*, and the something is usually unstated.

- **Percent of what?** A 20% rise then a 20% fall does not return you to the start, and the reason is that the two percentages have different referents.
- **Three times as many as what?**
- **A fraction of what?** — the reason `1/2` of a pizza and `1/2` of a different pizza are not the same amount, which students find genuinely destabilising.

> **This project found this one on its own, twice, and did not notice it was the same finding.** The Compare Line's stated crux is *"three times as many as WHAT?"*, and `cp-hot-drinks` was built around *"per cent of what?"* Two lines, two independent authoring decisions, one structural failure. **That is weak evidence the categories here are discovered rather than imposed** — and it is the only such evidence this document has, so it should not be leaned on hard.

### 1.3 Process trapped as process — the deep one

A student can *perform* the operation and cannot *hold* its result as a thing.

- `3/4` is "divide 3 by 4" — an instruction. It is not yet **a number** with a position on a line.
- An algebraic expression is "what you do to x". It is not yet **an object** you can factor, compare or substitute into.
- A function is a rule you follow. It is not yet **a thing** you can graph, shift, or invert.
- A solution is what you got at the end. It is not yet **a value that makes the statement true.**

This is a well-established idea in mathematics-education research — the process/object duality, sometimes called *reification* or the *procept* — and it is not a Mr Fraction invention. What is worth claiming is the consequence:

> **Most of the notorious walls in school mathematics sit exactly where a process has to become an object.** Fractions (division becomes a number). Algebra (arithmetic becomes an expression). Functions (a rule becomes a thing). Factoring (multiplication becomes a decomposition, run backwards). Limits and derivatives, later, for the same reason.

And the payoff for this project:

> ### **Structure is what a process looks like once it has become an object.**
>
> That is why making structure visible is the intervention, and not merely a nice way to present things. A diagram of a process is an *instruction*. A diagram of a structure is **the thing itself, held still enough to be examined** — which is exactly the transition the student is stuck at.

### 1.4 How the three relate

They are not independent. **1.3 is upstream of the other two.** You cannot see that `2/4` and `1/2` are one object (1.1) until fractions are objects at all (1.3). You cannot ask *"a fraction of what?"* (1.2) until the fraction and its whole are two separate things you can hold at once.

So the practical ordering for any site: **make it an object, then make its referent explicit, then show that it survives being rewritten.**

---

## 2. The catalogue

For each: what the structure actually is, which verb from `MR-FRACTION-PHILOSOPHY.md` §2.1 it wants, **what the picture would have to show** — which is the actionable column — and the trap that makes it a Mr Fraction problem.

### Already covered

| concept | the structure | verb | site |
|---|---|---|---|
| Fractions as quantities | a whole, cut into equal parts, the parts counted | ASSEMBLE | **Factory** |
| Additive & multiplicative word problems | five situation schemas | NAVIGATE | **Express** |
| Factoring (numbers and binomials) | a lump that comes apart along seams that were always there | EXTRACT | **The Mine** *(planned)* |

### The unbuilt, ranked by how much the structure is doing

**A · Equivalence — "the same thing, wearing different clothes"** — *verb: TRANSFORM*

The single largest cluster, and on the analysis in §1.1 the most valuable unbuilt site of any listed here. It unifies material the curriculum splits across five years: equivalent fractions, the meaning of `=`, solving equations, the three forms of a quadratic, rational expressions, exponent rules, and later trig identities.

> **What the picture must show:** an object that **visibly conserves** while its presentation changes. Not two pictures side by side with an equals sign between them — *one* picture being re-dressed, where the conserved quantity is the thing your eye tracks. The moment the student sees that nothing was added or removed, the equals sign has been re-taught.

**The trap:** every step of a worked solution looks like *progress toward an answer*. It is not. It is the same statement, said again differently, and the "answer" is just the outfit in which the truth is easiest to read. A site could make that visible in a way a page of algebra never does.

**B · Function as object** — *verb: RELATE, or TRANSFORM once graphed*

The wall where the largest number of students stop, and precisely the 1.3 transition: a rule becomes a thing.

> **What the picture must show:** the same relationship in two languages at once, with the correspondence live — move a point, the table row moves, the rule stays. **The function is what survives the change of language.** A graph shown *next to* a table teaches nothing; a graph *bound* to a table teaches the object.

**The trap:** SOH-CAH-TOA and its relatives. **Trigonometry is where keyword strategy reappears in senior form**, and it fails identically — a mnemonic that selects a formula without the student ever seeing that a trig ratio is a property of an *angle*, constant across all similar triangles. That last clause is the structure, it is genuinely beautiful, and almost nobody is shown it.

**C · The referent** — *verb: COMPARE*

Percent, ratio, relative change, "of what". Partly covered by the Express's percent route, but as a *surface* on other lines rather than as a subject.

> **What the picture must show:** the whole, **always drawn**, even when the question never mentions it. The reason 20% up then 20% down does not return to start is instantly visible if both bars are present and invisible if they are not.

**D · Decomposition and place value** — *verb: DECOMPOSE*

Place value, the distributive property, area models, partial products, expanding brackets. The inverse of the Factory, and the sibling of the Mine.

> **What the picture must show:** a quantity **splitting without changing size** — the same subtractive discipline as everywhere else, since a partition that alters the total is a picture of a different number.

**E · Directed number** — *verb: COMPARE / NAVIGATE*

Why subtracting a negative adds. A perennial and rarely fixed.

> **What the picture must show:** position and movement as **two different things** on one line. Almost every failure here is the collapse of *where you are* into *how far you moved*, and a picture that keeps them separate does most of the teaching.

**F · Generalisation** — *verb: GENERALISE*

Sequences, patterns to formulae, why exponent rules are *derived* rather than remembered, and eventually proof.

> **What the picture must show:** several instances **with the invariant highlighted across them** — the thing that does not change as the case does. This is the hardest of the six to draw and the most valuable if drawn well.

---

**G · Covariation and rate of change** — *verb: COORDINATE* — **added 2026-08-24, and it is the first entry here written against a real text rather than from memory.**

Two quantities change together and the work is holding both at once. Slope, related rates, and eventually the derivative itself.

> **What the picture must show:** the two quantities changing **at the same time, with the link between them visible** — not a graph of one against the other after the fact. The failure is coordinating them live, so a static end-state teaches nothing.

**The trap:** confusing the rate with the quantity. A student who can differentiate fluently and freezes at related rates is stuck exactly at §1.3 — they can *perform* `dV/dt` and cannot hold it as **a thing the problem is asking for**, one that goes into an equation and gets solved for. §1.2 sits right beside it: *"the rate at which the level is rising"* — rising with respect to **what**? The referent of a rate is the variable underneath the `d`, and it is invisible on the page.

### G.1 Tested against Stewart's *Calculus* §2.7, Related Rates

Read 2026-08-24 as a deliberate exercise: take an outside text and see whether this framework says anything true about it. It did, and it also produced a new principle, which is a better return than confirmation alone.

**The section's taught schema is a PROCEDURE, not a situation.** Its seven-step STRATEGY box is identical whether the problem is a cone, two cars or a searchlight. Nothing is ever classified.

**But a taxonomy is hiding inside step 5** — *"write an equation that relates the various quantities"* — and the text never names it. Its own examples sort into families: Pythagorean (two cars; and exercises 13, 15, 16, 18), similar triangles (the cone's `r = h/2`; exercises 12, 14), a volume or area formula (exercise 17), and trigonometric (the searchlight). **Four families, unnamed, doing all the work.**

> **The observation worth keeping:** step 5 *is* the problem, and it is listed as a peer of step 1, *"read the problem carefully"*. One is not actionable; the other is the entire difficulty. That is `MR-FRACTION-PHILOSOPHY.md`'s critique of Polya — a checklist recited rather than a process performed — found in the wild.

**Where the text agrees with us more than expected.** Its exercises fade properly: 1–8 are bare symbolic, 9–12 are stories **with** an explicit scaffold (*what is given, what is unknown, draw it, write the equation, solve*), 13–18 are stories with none. That scaffold is Three Reads, and the progression is `fadeLevel` by another name.

**And the gap it leaves.** Related rates has an obvious estimation move nobody asks for: as the cone fills, the surface widens, so **`dh/dt` must be decreasing**. A student producing an increasing rate would have caught themselves. The text never asks for a sign, a trend, or a magnitude.

**This entry also confirms the README's claim** that rate-of-change problems do not fit the five situations. Try classifying the two-car example: it *smells* like Compare and the work is Pythagorean covariation. The cone smells like Part–Whole and is really a formula plus a proportionality constraint. **The five do not discriminate, because the difficulty is not which situation it is.**

## 3. What this predicts about site shape

Two consequences worth stating before anyone builds.

**Not every concept wants a journey.** The Express's station sequence exists because a word problem has *phases* — read, classify, plan, solve, check. **Equivalence has no phases.** It has one move, made repeatedly, at increasing depth. A site about equivalence probably wants a **workbench** rather than a route, and forcing it onto a map would be the furniture choosing the mathematics — `MR-FRACTION-PHILOSOPHY.md` §4.3 exactly.

**The subtractive art rule gets harder, not easier, as the concepts get more abstract.** *"Show what is given, never what is derived"* was already the source of four leaks on a site about word problems. On a site about equivalence, **the derived thing is the entire point** — the rewritten form *is* the answer. The rule does not weaken; it sharpens into: *draw the transformation, never its destination.* Any site in cluster A will fight this on every screen, and should expect to.

---

## 4. Where the framework strains

Stated so this document can be argued with.

- **The verbs are not disjoint.** Solving an equation is TRANSFORM, but choosing *which* transformation is NAVIGATE. Graphing is RELATE and TRANSFORM at once. The taxonomy is a design tool for choosing a metaphor, **not a theory of mathematics**, and it should be dropped the moment it starts deciding content.
- **§1's three failures are not a complete account.** They say nothing about fluency, about mathematical language for multilingual students, about anxiety as a cause rather than an effect, or about the plain fact that some topics are hard because they are hard.
- **The evidence is one project's experience plus established research read at a distance.** The only internal confirmation is the referent problem being found twice independently (§1.2), which is one data point, not a validation.
- **And none of it has met a student.** Every claim here about what a struggling fifteen-year-old finds clarifying is a hypothesis. The teachers and students about to use the Express are the first real test any of this will get — and the question to ask them is not whether the pictures are nice, but **whether they can re-draw one on blank paper a week later.** That is `MR-FRACTION-PHILOSOPHY.md` §3.1's test, and it is the one that would falsify most of this document.
