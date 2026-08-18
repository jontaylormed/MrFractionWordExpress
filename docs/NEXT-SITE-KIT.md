# The Next Site — what carries over, and what must not

**Started 2026-08-17, on the user's instruction:** *"I want to start thinking about making a file that I copy our agents and other documentation that help form the next Mr Fraction Math Themed Website."*

Candidate topics named so far: **Mining for Math Factors** and **Factoring Binomials**. Not decided, and this document does not need it decided — most of what follows is true either way.

---

## 0. The trap to avoid, and it is the one this project has already sprung

**Cycle 30 opened by finding that all six agent briefs described a site that no longer existed.** Six reviewers, briefed on a version of the site from four months earlier, whose clean pass would have been indistinguishable from a real one. The briefs had drifted because they carried **subject matter** inside them — problem ids, line names, phase chains, the five schemas.

**Copying those briefs into a new project reproduces that failure on day one, at full strength.** A `teacher.md` that talks about the Ratio & Rate Rail, dropped into a site about factoring, is not merely useless — it is *confidently* useless, and it will produce reviews that read as thorough.

So the kit is not "copy the `.claude/agents/` folder." It is:

> **Split every brief into a METHOD half and a SUBJECT half. Carry the method. Rewrite the subject from scratch.**

That split does not exist in this repo yet, and **making it is the first piece of real work** — it improves this project too, because the same drift will keep happening here.

---

## 1. Inventory — what actually transfers

### Ports as-is. This is the valuable part.

| | why it carries |
|---|---|
| **`VERIFICATION.md`** | **41 rules, 40 of them written after a real failure.** Almost none is about fractions. "A check that finds nothing is suspicious", "measure before asserting in both directions", "attack every gate with the laziest input", "a defect can exist with every file correct", "an instrument can destroy the subject", "a measurement taken mid-animation is not the settled value", "when a comment claims a protection, check the thing it names exists" — every one of those is about *building carefully*, not about mathematics. **If only one file moves, move this one.** |
| **The five personas** | Maya (anxious), Devon (dyslexic, capable), Sam (keyboard/screen reader), Alex (impatient, will try to break the gates), Jordan (phone, 320px). Entirely subject-independent and the sharpest instrument in the set. |
| **The review-log discipline** | Append as each pass lands, never at the end; record instrument errors and retractions as first-class entries; record dissent when overruling. Four agents died mid-cycle today and cost one pass instead of five *because of this rule*. |
| **The precedence order** | correctness → accessibility → pedagogical integrity → student experience → theme coherence. Plus: precedence decides *who yields*, not *whether the problem is real*. |
| **The standing caveats** | "We are one model wearing several hats." "Independence is a property you check, not assume." "Author and reviewer being the same means the sign-off means less, and the log must say so." |
| **`tools/zz-drive.js`** and the headless-Edge recipe | Any site built this way needs a way to photograph one screen. The two flags that cost an hour each are documented in its header. |
| **The locked constraints**, if wanted again | zero dependencies, no build step, runs from `file://`, no localStorage. These shaped everything and are worth choosing deliberately rather than inheriting by accident. |

### Ports with rewriting

- **`math-reviewer.md`** — its method (*independently re-solve; never check the stated work*) is universal. Its subject is not.
- **`theme-reviewer.md`** — WCAG 2.1 AA, dyslexia provisions, reading level, tone for 13–17. Nearly all method. Swap the palette and the voice.
- **`art-director.md`** — the *method* ports (measured vs seen, stated separately; geometry never proves appearance). The visual language does not.
- **`student-tester.md`** — personas port whole; the flow it walks does not.
- **`oversight.md`** — sequence, gates, adjudication, spot-checking all port. The agent roster may not: a factoring site may not need five specialists.

### Does NOT transfer, and pretending otherwise is the risk

- **The five situations.** Part–Whole, Ratio & Rate, Change, Compare, Equal Groups are the schema structure of *additive and multiplicative word problems*. **Factoring has no equivalent**, and neither does prime factorisation. See §2 — this is the substantive open question.
- The train/rail metaphor, the map, the stations, the phase chain, the Test Track, the bar models, the Model Yard.
- Every problem, scene, and illustration.
- `PEDAGOGY.md` §3 (the five) and everything downstream of it.

---

## 2. The hard part, and it should be decided before any code

**This project's entire pedagogical spine is Schema-Based Instruction: teach the student to recognise which of five *structures* a story has.** Three Reads, the Platform Check, the Ticket Booth, the Plan models and the anti-keyword stance all exist to serve that one idea.

**Neither candidate topic has schemas.**

- **Mining for Math Factors** is not a word-problem genre at all. It is a *procedural and structural* topic — divisibility, prime decomposition, GCF/LCM. The teachable insight is that a number has one factorisation and it is a property of the number, not of what you did to find it.
- **Factoring Binomials** is procedural with a small number of recognisable *forms* — difference of squares, common factor, trinomial with leading coefficient 1, then ≠1. **That is closer to a schema structure than anything else on the table**, and may be the better first choice for exactly that reason: the SBI machinery has somewhere to land.

> **The question to answer first: what is the recognition task?** On this site it is *"which of five situations is this?"* If the next site has no equivalent question, then Three Reads, the Platform Check and the Ticket Booth have nothing to do, and copying them produces ceremony rather than teaching. **A site with the machinery and no recognition task would be this project's worst failure mode — scaffolding that scaffolds nothing — and it would look finished.**

What almost certainly *does* carry regardless of topic:

- **Numberless first.** Understanding the structure before touching digits works for factoring as well as it does for stories.
- **The estimate-then-check loop and self-monitoring as the headline metric.** *"Did you catch your own error?"* is topic-independent and is the best idea in this build.
- **No answer may reach a student before it is asked.** Universal, and this project has breached it four times across three different surfaces, so budget for it.
- **The anti-keyword stance, generalised:** *a surface feature may set the question; only structure sets the method.* For factoring the equivalent trap is real and well known — "it has a minus sign so it's difference of squares."
- **Hint ladders that end by stating the answer**, so a stuck student is never trapped.
- **Support that is never framed as remedial.**

---

## 3. Sequence, when it starts

1. **Split the briefs here first** (§0). Do it in *this* repo — it fixes this project's drift and produces the kit as a by-product.
2. **Answer §2's question** — what is the recognition task on the new topic? Write it down before any file exists.
3. **Copy the method halves + `VERIFICATION.md` + the personas** into the new project.
4. **Write the subject halves from the new topic**, never by editing Mr Fraction's.
5. **Open the review log with the standing caveats already in it**, so nobody has to rediscover that author and reviewer are the same model.
6. Build one complete problem end to end before building a second — opening a line tests the engine, not the content.

---

## 4. Also parked here

- **A 30-minute YouTube video, to be connected to the site "as its sister site."** Recorded as the user's intent 2026-08-17. **What "connected" means is not yet specified** — an embed on a page, a link from the map, a companion property alongside [Mr. Fraction Factory](https://jtaylor-cloud.github.io/Mr.FractionFactory/), or something else. Worth pinning down before building anything, because an embedded 30-minute video has real consequences for a zero-dependency site that runs from `file://`: a YouTube iframe is a third-party dependency and a privacy surface, and it will not play offline. A link out has none of those problems.
- **Teacher and student feedback is beginning.** This closes the gap every review cycle on this project has named as the most important one. It outranks new features.
