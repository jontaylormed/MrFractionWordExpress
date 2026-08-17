# Journey Architecture
### The map, the trips, the hub, and the Learning Hubs
**Owners:** Teacher Agent (structure) + Theme Agent (map design) · **Status:** Draft v1 · **Last updated:** 2026-07-28

---

## 0. The core idea

> **A trip teaches strategies. The hub tests whether you can choose one yourself.**

Most word-problem sites give students *more problems*. This one gives students **more approaches**, then removes the scaffolding and checks whether they can pick the right approach unaided.

That last part is the whole point. A student who can solve a problem when told *"use a bar model"* has learned a procedure. A student who looks at an unfamiliar problem and independently thinks *"this is a comparison — I should draw it"* has learned to do mathematics. **Only the second one transfers.**

So the architecture has three layers:

| Layer | Unit | Teaches |
|---|---|---|
| **The Map** | The whole site | Which structures exist (the five lines) |
| **A Trip** | 3–5 stations | Strategies, one foregrounded per station |
| **A Station** | One problem | That strategy, applied |

And one assessment layer that sits at the end of every trip:

| **The Terminus Hub** | A novel problem, no scaffolding | *Can you choose your own approach?* |

---

## 1. The Map

The landing view. A transit map of five lines radiating from a central station, drawn as a real transit diagram.

- Each **line** is one schema (Change, Compare, Equal Groups, Ratio & Rate, Part–Whole).
- Each line offers trips at three **route lengths** (§3).
- **Learning Hubs** (§6) sit as interchange stations *between* lines — visible from the start, never gated, never labeled as remedial.
- The map is the navigation. There is no menu.

**What the map carries now, added 2026-08-17.** It is two groups, not one row: **the five situations**, then **Special lines** underneath — and the specials are not schemas, which is the whole reason they are grouped apart:

| | |
|---|---|
| ✳ **The Grand Tour** | A mixed ride drawing from every running line. You are not told which situation is coming. |
| % **The Percent Line** | A **route**, not a sixth schema — five problems spread over four lines, drawn by `surface` rather than by `line`. It has a card, a colour, a marker and its own Plan model, and its Ticket Booth asks **which of the five is hiding under the per cent**. Deliberately kept out of `MF.LINES`, because everything iterating that object would otherwise gain a phantom schema. |
| ✦ **The Challenge Line** | **Does not start a trip — it crosses to a second map.** Crossover Island: five stops, seven two-line problems, its own coast and circuit. |

**There are five Learning Hubs, not the number §6 implies** — `five-situations`, `word-board`, `fraction-yard`, `percent-yard` and **The Lighthouse**, which teaches the crossover and sits on *both* maps.

**A line lights on the map at three published problems**, and the count comes from `Selector.availableLines()` rather than a hand-kept list. The Challenge Line's threshold is different and deliberately so: **two problems on two different lines**, because a route claims something a schema does not — that one surface sits on several structures — and the smallest honest demonstration of that is two.

**Accessibility requirement:** the map is decorative-plus-functional, which makes it high-risk. It must be a real `<nav>` with a semantic `<ul>` underneath the SVG, fully keyboard operable, with each line's status conveyed by text and shape as well as color. A student using a screen reader gets an ordered list of lines and trips — not "graphic."

---

## 2. A Trip

**One trip = one line (schema) + 3–5 stations + the Terminus Hub.**

The schema stays constant for the whole trip. That's deliberate: holding the structure fixed while varying the strategy is what lets a student notice that *the same structure can be attacked several ways*. Varying both at once teaches neither.

What varies **within** a trip:
- The **strategy** foregrounded at each station.
- The **problem type** — unknown position, context, number type (§4).

### Station sequence

Stations always run in this order, because the strategies build on each other. A trip includes a subset depending on route length:

| # | Station | Strategy foregrounded |
|---|---|---|
| 1 | **The Reading Room** | Three Reads + numberless — comprehension before quantity |
| 2 | **The Drafting Table** | Bar/tape modeling — make the relationship visible |
| 3 | **The Estimation Tower** | Benchmarking, friendly-number substitution — build the expectation |
| 4 | **The Switchyard** | Choosing the operation; working backwards when the unknown is at the start |
| 5 | **The Signal Box** | Spotting Signal Failures — keyword traps and reasonableness checks |
| ★ | **The Terminus Hub** | *No strategy given.* You choose. |

### The phases inside a station — CORRECTED 2026-08-17

**This section described a journey the site stopped running in early August, and it is the part of this document most likely to mislead.** What a student actually walks through is a chain of *phases*, and the chain is not the same on every stop. **`Stations.phaseChain` is the implementation and it is normative** — `CHALLENGE-MODE.md` §4 carries the same table. If any of the three disagree, the code is right.

| where | the chain, before `solve` and `check` |
|---|---|
| the five mainland lines | `read1` · `platform` · `read2` · `read3` · `ticket` · `plan` |
| a staffed platform on Crossover Island | `read1` · `crossover` · `read2` · `read3` · `ticket` · `plan` |
| an **unstaffed halt** on the island | `read1` — then straight to the Engine Room |

Three things in that table did not exist when this document was written:

- **The first read is TWO screens.** `read1` asks the five checklist questions; `platform` makes the student prove the answer from the sentences and then shows where the problem sits on the map. The split exists because the station header prints the line and its equation above every phase, so the five questions are part-answerable off the furniture — the *evidence* is not. **Never ask a student inside a trip to name the line.**
- **The Test Track** (`demo`) sits between the estimate and the Engine Room on **24 of the 37** problems: the strategy demonstrated on numbers belonging to no problem on that line, then two questions about the student's own picture. Nothing is calculated there.
- **`plan` is now a gate with a drag control in it.** The student sweeps a *band* on a derived number line and its centre commits; a typed field sits beside it, and there is a sketch pad neither is parsed. No estimate, no Engine Room — see `ESTIMATE-INPUT.md`.

**And an unstaffed halt is a different journey, not a lighter one.** It runs the checklist and then the arithmetic: no Crossover Read, no second or third read, no Ticket Booth, no estimate. The Arrivals Board there drops its first question, because that question compares an answer against an estimate that was never made. That was ruled twice on 2026-08-16, in opposite directions, and **both arguments are recorded in `CHALLENGE-MODE.md` §4** — read the losing one before reversing it.

### The micro-loop

Polya still runs **inside every station** — understand, plan, solve, look back. The station determines *which phase gets the scaffolding*. At the Reading Room, understanding is heavily supported and solving is nearly automatic. At the Switchyard, comprehension is brisk and the planning phase is where the work happens.

This is the reconciliation: **Polya is the micro-loop, strategies are the macro-curriculum.** Every problem still gets fully solved and fully checked; the station decides where the student's attention is spent.

---

## 3. Route length = support level

Real rail semantics, used correctly — a **Local** stops everywhere, a **Limited** runs direct.

| Route | Stations | Who it's for |
|---|---|---|
| **Local** | All 5 + Hub | Maximum scaffolding. Every strategy taught explicitly. |
| **Express** | 3–4 + Hub | Skips the strategies the student has already shown. |
| **Limited** | 3 + Hub | Minimal scaffolding, harder unknown positions, faster to the Hub. |

**This is how difficulty is expressed without ever showing a grade level.** A 17-year-old riding the Local is riding a *thorough* route, not a *younger* one. That distinction is the entire reason this naming was chosen, and it must never be undermined by copy that implies otherwise.

Route choice is the student's, always. The site may *suggest* a Local after a rough Hub result; it never assigns one.

---

## 4. Randomization — by type, not just numbers

**Requirement:** *"Trip should be randomized not with just numbers but type of word problems."*

Swapping 180 miles for 240 miles teaches nothing — students recognize a re-skinned problem instantly. Real variation means varying the dimensions that actually change the thinking.

### The four randomization axes

| Axis | Varies | Why it matters |
|---|---|---|
| **Unknown position** | result / change / start / referent unknown | The single biggest difficulty lever. Start-unknown forces backward reasoning. |
| **Context** | trains, recipes, money, sport, music, work | Prevents context-bound learning. A student who only solves train problems hasn't generalized. |
| **Number type** | friendly fractions → non-friendly rationals, decimals, negatives | Changes computational load without changing structure |
| **Surface phrasing** | active/passive, question-first, extra information | Builds resilience to how a problem is *worded* |

### Selection rules

When a trip is generated, the selector picks one problem per station from the bank, subject to:

1. `line` matches the trip's schema. **Always.**
2. `stationRole` includes this station.
3. `fadeLevel` matches station position — worked → partial → independent across the trip.
4. **No two stations in a trip share the same `unknownCar`.** *(Enforced — this is what makes it type-randomization rather than number-randomization.)*
5. **No two stations share the same `context` tag.**
6. The Hub problem uses an unknown position and context **not seen anywhere in the trip.** It has to be genuinely novel or it isn't a transfer test.

### Determinism within a session

The seed is generated once per trip and held in memory, so the trip is stable for its whole life — re-renders, accessibility changes, and returning from a Learning Hub never reshuffle it.

**A reload does not restore the trip.** With no storage of any kind there is nowhere to keep the seed, so reloading starts over from the map. *(An earlier draft of this document claimed a reload returned you to the same trip. That was impossible under the no-storage constraint and has been corrected — verified in live testing.)* This is a genuine cost of the constraint, and the honest framing for students is that closing the page ends the trip.

### Graceful degradation

With a small bank, constraints 4–6 will sometimes be unsatisfiable. Priority when relaxing:

```
never relax:  rule 1 (line), rule 6 (Hub novelty)
relax last:   rule 4 (unknown position)
relax first:  rule 5 (context), rule 3 (fade)
```

If the Hub cannot be given a novel problem, **the trip runs without a Hub assessment** and says so plainly, rather than presenting a familiar problem as a transfer test. A dishonest assessment is worse than no assessment.

---

## 5. The Terminus Hub — the assessment that matters

Every trip ends here. This is where we find out whether any of it worked.

The student gets **a novel problem with no scaffolding at all.** No station name, no strategy prompt, no schema hint. Just the problem and four questions:

### The four Hub questions

| # | Question | Assesses |
|---|---|---|
| 1 | **Which line is this?** | Schema recognition — unaided, no narrowing, no hints |
| 2 | **Which strategy will you use, and why?** | *Strategy selection* — the target skill of the whole trip |
| 3 | *(solve it)* | Execution |
| 4 | **How do you know your answer is reasonable?** | Self-monitoring |

**Q2 is the one that matters.** It's the only place on the site where a student must choose an approach rather than follow one, and it is the direct measure of "has the student learned how best to approach a word problem."

### What the Hub reports

The Hub report is about **approach, not score.** No percentage, no grade, no pass/fail.

```
TERMINUS — Part–Whole Loop

You spotted the line first try.                    ← recognition
You chose a bar model, and that was a good call
  for a problem with the whole unknown.            ← strategy selection ★
Your estimate said "around 60" and you got 64.     ← calibration
You caught your own unit error at the check.       ← self-monitoring ★★

Strongest: choosing your approach without being told.
Worth another trip: working backwards when the
  starting amount is missing.
```

**Strategy selection and self-caught errors are the headline metrics.** Correctness is reported, but it is deliberately not the top line — a student who chose well and slipped in arithmetic has learned more than one who guessed right.

### If the Hub goes badly

Mr Fraction offers a **Local on the same line** — same structure, more stops, more support. Never a scolding, never a score, never "you failed."

---

## 6. Learning Hubs — support without stigma

**Requirement:** *"Learning Hubs for those needing more support or basic math concepts."*

Interchange stations on the map that teach the **prerequisite concepts** word problems assume. These are not remediation modules bolted on the side. They're stops on the map, visible from day one, that any student can visit at any time.

| Hub | Covers | Feeds |
|---|---|---|
| **The Fraction Yard** | What a fraction *is*, equivalence, common denominators, fraction ÷ fraction | Part–Whole, Equal Groups |
| **The Percent Platform** | Percent as per-hundred, ↔ fractions/decimals, percent *of what* | Part–Whole, Compare |
| **The Ratio Roundhouse** | What a ratio is, unit rates, scaling | Ratio & Rate |
| **The Operations Depot** | When to multiply vs. divide, why division makes things bigger with fractions | Equal Groups, Ratio |
| **Number Sense Signal Box** | Benchmarks, place value, estimation, order of magnitude | Every line |

### How a student arrives

1. **By choice**, from the map, any time.
2. **By invitation**, when misconception tags accumulate — three `rate-inverted` tags and Mr Fraction offers the Ratio Roundhouse.
3. **From a hint**, when a rung-4 hint reveals a missing prerequisite.

### The framing rule — non-negotiable

A Learning Hub is a **detour**, never a demotion.

> ✅ "Quick detour — the Fraction Yard is two stops from here and it'll make this line a lot easier."
> ❌ "You need to review basic fractions before continuing."

**The hubs are never gated, never mandatory, and never described as being for students who are behind.** The map shows them from the first screen, so visiting one is an ordinary act of navigation rather than an admission. A student who has been tracked into remedial classes their whole life will recognize and reject the alternative instantly — this framing is doing real work, not being polite.

### Hub content shape

Short and concrete: one idea, a visual (bar model or number line), 2–3 checks for understanding, and a return ticket to the line you came from. **Not** a lecture — a student detoured here mid-problem wants to get back to their trip.

---

## 7. What this changes elsewhere

| Doc | Change |
|---|---|
| `PEDAGOGY.md` | §4 rewritten: stations = strategies, Polya = micro-loop. §5 route lengths corrected to station count. New non-negotiables for the Hub. |
| `PROBLEM-SCHEMA.md` | Manifests gain `stationRole[]`, `context`, `fadeLevel`, and Hub-eligibility. Randomization needs these tags. |
| `AUTHORING.md` | Teachers should tag context and unknown position so randomization has room to work. |
| Site build | Single-page journey (already decided) now also carries trip seed and station sequence in memory. |

---

## 8. Open questions

- **Q1:** Should a student be able to *re-ride* the same trip and get a genuinely different set? Yes technically (new seed) — but with a small bank the overlap will be high. Recommend: allow it, and be honest in the UI when the bank is thin rather than pretending to a variety we don't have.
- **Q2:** How many problems does the bank need before randomization is meaningful? Rough estimate: **5 lines × 5 station roles × 2 variants ≈ 50** for real variety. The agreed exemplar set (~15) will produce noticeable repetition. Recommend building the selector correctly now, seeding ~15, and being explicit that the bank is the growth area — this is exactly what the teacher authoring pipeline exists to fill.
- **Q3:** Should the Hub ever be skippable? Recommendation: **no.** It's the assessment; skipping it makes the trip pointless. But it must be re-attemptable without re-riding the whole trip.
