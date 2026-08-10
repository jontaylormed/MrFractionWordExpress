# The Problem Manifest
### Schema contract for Mr Fraction's Word Problem Express
**Owners:** Teacher Agent (structure) + Math Agent (correctness) · **Status:** Draft v1 · **Last updated:** 2026-07-28

---

## 0. Why a manifest, and why it's this big

A raw word problem is about 40 words. The site needs roughly 40× that to teach with it: a numberless version, three read prompts, a schema classification with explained distractors, a bar model, an estimate range, faded solution steps, misconception-tagged wrong answers, a four-rung hint ladder, and Look Back checks.

**That derived scaffolding is the actual product.** The manifest is the contract that says: *if you fill this in correctly, the site will teach the problem properly, and every review agent knows exactly what to check.*

Two consequences that shape the design:

1. **A teacher must never be required to author all of it.** Only `problem.text` and `arrivals.answer` are truly mandatory. Everything else can be derived — by Claude Code in the rich path, or filled progressively in the Dispatch Office. A manifest with holes is *valid but incomplete*, and the site degrades gracefully by skipping stations it lacks data for. See §6.
2. **Every derived field is attributed.** Each carries `authored: "teacher" | "generated"` so the Math Agent knows what a human vouched for and what a model invented. Generated content gets verified harder. This distinction is the backbone of the whole review process.

Format: **JSON**, one file per problem, in `content/problems/`. No build step — the site `fetch`es them at runtime.

---

### Read 2 and Read 3 are graded, not revealed

Both used to accept anything and then show the answer, which meant a student could pass either with one keystroke. Both are now checked:

- **`read2.quantities[].needed`** — `false` marks a quantity the student does **not** need. The station asks *which of these do you actually need?* and rejects a set that grabs everything.
- **`read3.options[]`** — `[{ text, correct?, why }]`. **At least 3 options, exactly one `correct`, and every option needs a `why`** — a wrong pick has to teach something. `modelAnswer` is retained for screen readers and reports.

### Distracting information is required, and must be declared

Every problem should carry at least one number the student does not need. Real word problems do, and filtering them out is a large part of the difficulty this site exists to address.

- Mark it `role: "distractor"` in `problem.numbers`.
- It must also appear in `read2.quantities` with `needed: false`.

The validator enforces both directions: a `distractor` role not marked `needed:false` is an error, and so is `needed:false` on a number whose role isn't `distractor`. Every number must be described in `read2.quantities` — add a number and forget to say what it measures and the build fails.

### The Scene must not contradict the maths, or do the student's work

`scene` draws the problem's quantities beside its text. Two failure modes, both found in the quilt problem:

**1. Draw one whole as one thing.** Twenty separate patches says *twenty quilts*. When the whole is a single continuous object, use `mode: "unit"` — one framed grid, subdivided. Separate-object mode (`icon`) is for genuinely separate things: coins, basketballs, parcels.

**2. Show what is GIVEN, not what is derived.** The quilt scene filled 13 of 20 in one colour — but `13/20` is the *result* of `2/5 + 1/4`, so the picture was handing over the first step. It now shows **blue 8 and red 5 in their own colours** (the two given fractions) and leaves the remaining 7 hatched with **?**. Adding the givens is the work; the picture must not do it.

```jsonc
"scene": {
  "mode": "unit", "cols": 5,
  "groups": [                       // must total barModel.segments
    { "key": "blue",    "n": 8, "label": "blue",  "as": "2/5" },
    { "key": "red",     "n": 5, "label": "red",   "as": "1/4" },
    { "key": "unknown", "n": 7, "label": "white", "as": "?"   }
  ]
}
```

**Enforced by the validator:**
- Group counts must total `barModel.segments`. A mismatch is an **error** — the picture would contradict the maths.
- A `distractor` naming *pieces of the whole* (`squares`, `parts`, `slices`…) that is a multiple of the drawn partition raises a **warning**. This is the exact defect that shipped: a quilt described as **60 squares** drawn in **twentieths**, so the text and the picture disagreed about how the quilt was divided. That distractor is now `9 hours`, which cannot be read as a partition.

### Contexts must be distinct across a line

The Hub requires a problem whose **unknown position and context are both unseen in the trip**. A new problem sharing its `context` with one that appears on every trip is silently unreachable — it will never be selected and no error is raised. `pw-cycling-club` was written with `context: "sport"`, which `pw-free-throws` already owned, and was dead content until caught by a reachability sweep. **After adding a problem, run a reachability check over many seeds rather than assuming it will appear.**

> **`unknownCarAnswer` is required and must match an entry in `unknownCarOptions` exactly.**
> The `unknownCar` code (`part`, `other-part`, `whole`…) is a *category*, not a label — several problems phrase their options as prose (`"the part left"`, `"everyone who isn't brass"`), which no rule can derive from the code. The Ticket Booth is the station that grades this, so an unmatched answer means an unanswerable question. `tools/validate.ps1` checks it.

## 1. Top-level shape

```jsonc
{
  "$schema": "../schema/problem.schema.json",
  "id": "ratio-millbrook-01",     // required · kebab-case, unique, stable, in filename
  "schemaVersion": 1,             // required · bump only on breaking changes
  "status": "draft",              // draft | math-verified | published
  "title": "The 8:40 to Millbrook",
  "line": "ratio",                // required · change|compare|groups|ratio|partwhole
  "topics": ["rates", "unit-rate"],
  "steps": 2,                     // 1 = single-step, 2+ = multi-step

  // ── Randomization tags (see JOURNEY-ARCHITECTURE.md §4) ──
  // These drive trip generation. Without them a problem can still be
  // used, but only as a fixed assignment — never in a randomized trip.
  "unknownCarAnswer": "the rate", // REQUIRED. Must be one of unknownCarOptions, verbatim.
  "unknownCar": "rate",           // result|change|start|referent|rate|groups|part|whole
  "context": "rail-travel",       // rail-travel|cooking|money|sport|music|work|school|craft
  "fadeLevel": "independent",     // worked | partial | independent
  "stationRoles": ["estimation", "switchyard"],   // which stations this problem suits
  "hubEligible": true,            // may this serve as a Terminus Hub assessment?
  "provenance": {
    "source": "teacher-submitted",
    "author": "J. Taylor",
    "addedOn": "2026-07-28"
  },

  "problem":        { /* §2 */ },
  "threeReads":     { /* §3 */ },
  "ticketBooth":    { /* §4 */ },
  "signalBox":      { /* §5 */ },
  "engineRoom":     { /* §6 */ },
  "arrivals":       { /* §7 */ },
  "signalFailure":  { /* §8 · optional */ },
  "transferTicket": "ratio-millbrook-01b",

  "review": { /* §9 · written by the agents, not the author */ }
}
```

---

## 2. `problem` — the text itself

```jsonc
"problem": {
  "text": "The 8:40 train covers {{n1}} miles in {{n2}} hours. At that same speed, how far will it travel in {{n3}} hours?",

  // Sentence split drives BOTH the chunked-reading accessibility view and
  // the Three Reads highlighting. Authored, not naively split on periods —
  // "Dr. Chen" and "$1.50" break regex splitting.
  "sentences": [
    "The 8:40 train covers {{n1}} miles in {{n2}} hours.",
    "At that same speed, how far will it travel in {{n3}} hours?"
  ],
  "questionSentenceIndex": 1,

  // Every numeric quantity is a token. This is what makes number-masking work.
  "numbers": {
    "n1": { "value": "180",  "unit": "miles", "role": "distance", "spoken": "180" },
    "n2": { "value": "3",    "unit": "hours", "role": "time",     "spoken": "3" },
    "n3": { "value": "5",    "unit": "hours", "role": "time",     "spoken": "5" }
  },

  "context": {
    "setting": "rail travel",
    "requiresCulturalKnowledge": false,   // flagged by Theme Agent if true
    "readingLevelNote": "no vocabulary above tier 2"
  }
}
```

**Number tokens are mandatory.** Numbers must never be hard-coded into `text`, because:
- Masking renders `{{n1}}` as `▮` at Read 1.
- Read-aloud speaks a masked number as *"some number"* — not silence, not "one eighty."
- Units are attached to values, so the Look Back units check can be automated.
- Regenerating a problem with different numbers becomes trivial.

Tokens `{{n1}}`… must appear in both `text` and `sentences`, consistently.

**`spoken` is the number alone, never the number plus its unit.** The unit is almost always already written in the surrounding sentence, so `"spoken": "12 cups"` inside *"…holds {{n1}} cups"* makes read-aloud say **"holds 12 cups cups."** Use `spoken` only where the digits would be mispronounced — `3/4` must be `"three quarters"`, or a screen reader says "three slash four." *(Caught by the student agent in live testing, not by review.)*

---

## 3. `threeReads`

```jsonc
"threeReads": {
  "read1": {
    "prompt": "What's the story here? Who or what is involved, and what's happening?",
    "modelAnswer": "A train travels for a while. We know how fast it goes, and we want to know how far it gets over a longer time.",
    "platformCheck": {
      "sentences": [1],
      "why": "\"Every\" is the lock — miles and minutes are pinned to each other, and the pairing stays true whether you travel for a moment or for an hour.",
      "kinds": "Miles and minutes — different kinds of thing, held together by a steady speed."
    },
    "authored": "generated"
  },
  "read2": {
    "prompt": "What quantities do you have, and how are they connected?",
    "quantities": [
      { "token": "n1", "describe": "how far it went" },
      { "token": "n2", "describe": "how long that took" },
      { "token": "n3", "describe": "the new, longer time" }
    ],
    "relationship": "Distance and time move together at a fixed rate.",
    "authored": "generated"
  },
  "read3": {
    "prompt": "In your own words, what is the question asking you to find?",
    "modelAnswer": "How many miles the train covers in 5 hours.",
    "commonMisreading": "Finding the speed and stopping there — speed is a step, not the answer.",
    "authored": "generated"
  }
}
```

`commonMisreading` is optional but high value; it feeds Look Back's "did you answer the question asked?" check.

### 3.1 `read1.platformCheck` — required

The Platform Check (Pedagogy §3.7). The first read runs across two screens: `read1` asks the five questions, then `platform` asks the student to find the evidence in the text and shows the map.

| Field | |
|---|---|
| `sentences` | Indices into `problem.sentences` — **every sentence you need in order to solve the problem.** The student must find all of them, and only them. |
| `why` | What the student reads once they have. This is the teaching. |
| `kinds` | One line naming what is being counted. |

**What the task is** *(user decision, 2026-08-04 — it changed)*. It was originally *"tap the sentence that shows what kind of situation this is"*, a structural signal. It is now **"tap the sentences you need to solve it"**. The user's words: *"they should only select the relevant sentences to help solve the problem. Having them select minutes shooting is irrelevant."*

That definition is sharper, and the old one was quietly wrong on **nine of sixteen problems**: `pw-free-throws` required only *"That was ▮ of all the shots she took"*, so a student who also tapped *"In practice, Nia made ▮ free throws"* — a number they genuinely need — was told **"Not quite."** The teacher agent had flagged the same thing from the other direction.

**So the answer set is:**
- **every sentence carrying a quantity the problem uses** (`read2.quantities` with `needed !== false`), **plus**
- **any sentence stating a relationship that makes the solution possible but carries no number** — the invariance line on a rate (*"the press never pauses"*), *"The rest of it is white"* on the quilt.
- **Never** a sentence that is only scene-setting, and **never** one whose only quantity is the declared distractor.

**How many sentences?** As many as the problem genuinely needs, and the count is a claim about the schema:

- **Change** normally needs **two** — a before and an after cannot fit in one sentence. `ch-water-tank` uses the event and what it left behind, and its `why` points out that the *before* is nowhere in the text, which is exactly what the question asks for.
- **Part–Whole** is usually **one**: the sentence tying a share to the thing it came out of. `pw-quilt-colors` takes two, because *"the rest of it"* is what makes the shares into shares.
- **Ratio** is usually **one** — the *"for every"*. `rr-market-stall` takes two, one pairing per stall.

**Rules the validator enforces, and why:**

1. `sentences` must be non-empty, in range, and free of duplicates.
2. **It must not include `questionSentenceIndex` — unless that sentence carries a quantity you need.** True on exactly two problems: `rr-bread-dough` and `rr-van-hours` ask *"…for ▮ kilograms of flour?"*, and that ▮ is a given, not a statement of what to find. Everywhere else the question sentence is barred, because it is bold on screen and including it would turn the task into *tap the bold one*.
3. **It must be COMPLETE.** Every sentence holding a needed quantity has to be in it. Nine problems failed this when the rule was written, and each one told a correct reader they were wrong.
4. **A sentence whose only quantity is a distractor must never be in it.** A sentence carrying a needed quantity *may* also carry a distractor and still be required — `pw-helmet-savings` welds both into *"Maya has saved ▮ dollars over ▮ weeks"*. Read 2 still asks the student to reject the weeks as a **number**; this screen is about sentences.
3. **It must not name every sentence** — then there is nothing to pick out.
4. **No digits in `why` or `kinds`.** Both screens of the first read are numberless (Pedagogy §1.4).
5. **No spelled-out numbers either** — not *"one kind, two moments"*. `tools/sweep.js` scans rendered text for values written as words, so number words here fire on every problem answering 1 or 2, and permanent cleared noise is how a real leak gets skimmed past. **Say the shape instead of counting it** — *"a single kind of thing, with a before and an after"*. This rule has already caught four authored strings and two of the UI's own.

**What is NOT authored here:** the per-line prompt and coaching, the shape sentence and the map row live in `stations.js` (`PLATFORM`), keyed off `problem.line`. A new line needs entries there; a new problem does not.

### 3.2 `read1.questions` — optional, and the antidote to a guessable screen

A **sibling** of `platformCheck`, not a child of it: these five questions are screen one, `platformCheck` is screen two.

```jsonc
"questions": {
  "kinds": {
    "ask": "This story counts litres of water, and it also counts taps on the platform. Is the question about a single kind of thing, or about different kinds locked together?",
    "options": {
      "same":      { "yes": "The taps are scenery. Everything the question is about is water…",
                     "no":  "That would mean the litres and the taps were pinned to each other…" },
      "different": { "no": "That would mean pumping water in changed the number of taps…" }
    }
  }
}
```

**Why it exists.** The shared questions in `CHECK` ask in the abstract — *"What is being counted in this story?"* — so their answers are identical for every problem on a line, and the station header names the line above them. A student two stations in can answer all five without reading. Shuffling fixed the positions; only naming this story's own quantities fixes the answers.

| | |
|---|---|
| Question ids | `kinds` `moments` `things` `shape` `fit` |
| Option ids | `same` `different` · `changed` `steady` · `single` `separate` `paired` · `cut` `repeat` `neither` · `onekind` `stacked` `nofit` |
| Overridable | `ask` on a question; `text`, `yes`, `no` on an option |
| **Never overridable** | **`lines`.** Correctness stays the schema's, so authored copy can be wrong about tone but never about the answer. |

**Rules the validator enforces:** unknown question or option ids are errors (a typo would silently fall back to the generic copy and look fine); no digits and no spelled-out numbers, because this renders on the numberless read; and **nesting the block inside `platformCheck` is an error** — it produces a field nothing reads and nothing complains about, which cost a round trip the first time it was written.

**The best entries use the problem's own distractor.** `ch-water-tank` asks about litres *and taps*, so ruling the taps out is the work — an irrelevant number turned into the teaching.

**Built for the three Change problems only** (2026-08-04). The other thirteen fall back to the shared copy, which is why the fallback has to stay good.

---

## 4. `ticketBooth` — schema identification

```jsonc
"ticketBooth": {
  "correctLine": "ratio",
  "whyCorrect": "Two different units — miles and hours — locked in a fixed relationship, and we're scaling to a new time. That's the Ratio & Rate Rail.",

  // REQUIRED: every other line needs a real reason it's wrong.
  // A wrong pick must teach, not buzz.
  "distractors": [
    { "line": "groups",     "whyWrong": "Close! You could think of it as 'hours × miles-per-hour', and that's genuinely related. But the giveaway is that we're scaling one known pair to a new pair — that's the Ratio Rail." },
    { "line": "change",     "whyWrong": "Nothing is being added to or taken from a starting amount. The train isn't gaining or losing miles — it's covering them at a steady rate." },
    { "line": "compare",    "whyWrong": "We're not putting two quantities side by side to see which is bigger. There's one journey here." },
    { "line": "partwhole",  "whyWrong": "There's no total being split into pieces. The 5 hours isn't part of the 3 hours." }
  ],

  "unknownCar": "rate",
  "unknownCarPrompt": "Which car is missing from this train?",
  "unknownCarOptions": ["rate", "time", "distance"],
  "unknownCarWhy": "You're given one distance-time pair and asked for a new distance. The rate is the hidden car you need to find first.",
  "supportAfter3Attempts": {
    "narrowTo": ["ratio", "groups"],
    "discriminator": "Both involve multiplying. Ask: am I repeating equal groups, or scaling a fixed relationship to a new size?"
  }
}
```

The `supportAfter3Attempts` block implements Pedagogy Q2 — the gate holds, but support increases.

---

## 5. `signalBox` — bar model and estimate

```jsonc
"signalBox": {
  "barModel": {
    "type": "double",              // single | comparison | double | partitioned
    "bars": [
      { "label": "miles", "segments": 3, "segmentValue": "60",
        "knownTotal": "180", "unit": "miles" },
      { "label": "hours", "segments": 3, "segmentValue": "1",
        "knownTotal": "3", "unit": "hours" }
    ],
    "extendTo": 5,
    "a11yDescription": "Two aligned bars. The top bar is 180 miles split into 3 equal parts of 60 miles. The bottom bar is 3 hours split into 3 equal parts of 1 hour. Each hour lines up with 60 miles. Both bars extend to 5 parts.",
    "authored": "generated"
  },

  "estimate": {
    "prompt": "Before you calculate — roughly how far do you think the train gets in 5 hours?",
    "reasonableMin": 250,
    "reasonableMax": 350,
    "modelReasoning": "3 hours got 180, so about 60 an hour. 5 hours is a bit under double 3 hours, so somewhere around 300.",
    "unit": "miles"
  }
}
```

**There is no `plan` field. Do not author one.** Problems used to carry
`signalBox.plan[]` — two or three strings naming the steps of the solution.
No code ever rendered them. Across 16 problems that came to 36 reviewed,
never-seen strings, and they were **deleted on 2026-08-02** rather than wired
up, on the user's decision.

The reason it could not simply be switched on is worth keeping: the Plan phase
runs *before* the Engine Room, so printing "split the pot into four quarters,
then take three" there hands over the method on a worked example. What the
student needs at that point is a *representation* — the Model Yard, the Ratio
Table, the Change Train — not a recipe. The steps themselves already live in
the hint ladder, which is request-only and escalating, and in the
`workedExplanation` shown after an answer.

Anything authored but unrendered is a standing invitation to write more of it:
a second dead field (`arrivals.keywordWarning`) was created and removed in
Cycle 9b while this one was still unresolved.

**`a11yDescription` is mandatory on every bar model.** A blind student must be able to reason from the description alone. Theme Agent rejects any manifest missing it.

---

## 6. `engineRoom` — steps, hints, misconceptions

```jsonc
"engineRoom": {
  "fadeLevel": "independent",   // worked | partial | independent

  "steps": [
    {
      "id": "s1",
      "prompt": "Find the unit rate. How many miles per hour?",
      "answer": { "exact": "60", "unit": "miles per hour", "acceptedForms": ["60", "60 mph"] },
      "workedExplanation": "180 miles ÷ 3 hours = 60 miles per hour.",
      "misconceptions": [
        { "response": "540",  "diagnosis": "You multiplied 180 × 3. To get a rate you divide the distance by the time.", "tag": "operation-inversion" },
        { "response": "0.0166", "diagnosis": "You divided time by distance — that's hours per mile. Flip it: we want miles per hour.", "tag": "rate-inverted" },
        { "response": "36",   "diagnosis": "You divided 180 by 5 instead of 3. The 5 hours is the new trip; the rate comes from the first trip.", "tag": "wrong-quantity" }
      ],
      "hints": [
        { "rung": 1, "type": "whistle",  "text": "You have a distance and the time it took. What does 'per hour' mean you should do to them?" },
        { "rung": 2, "type": "signal",   "text": "A unit rate means 'how much for exactly one'. Divide the distance by the number of hours." },
        { "rung": 3, "type": "coupling", "text": "Set it up: 180 miles ÷ 3 hours = ___" },
        { "rung": 4, "type": "route",    "text": "180 ÷ 3 = 60. The train covers 60 miles every hour." }
      ]
    },
    {
      "id": "s2",
      "prompt": "Now use that rate. How far in 5 hours?",
      "answer": { "exact": "300", "unit": "miles", "acceptedForms": ["300", "300 miles"] },
      "workedExplanation": "60 miles per hour × 5 hours = 300 miles.",
      "misconceptions": [
        { "response": "12",  "diagnosis": "You divided 60 by 5. You know the miles for one hour — you need five of those, so multiply.", "tag": "operation-inversion" },
        { "response": "180", "diagnosis": "That's the distance from the first trip. The question asks about the 5-hour trip.", "tag": "answered-given" }
      ],
      "hints": [
        { "rung": 1, "type": "whistle",  "text": "You know how far it goes in one hour. You want five hours." },
        { "rung": 2, "type": "signal",   "text": "Multiply the unit rate by the new number of hours." },
        { "rung": 3, "type": "coupling", "text": "60 × 5 = ___" },
        { "rung": 4, "type": "route",    "text": "60 × 5 = 300 miles." }
      ]
    }
  ]
}
```

### 6.1 The `answer` object and equivalence

```jsonc
"answer": {
  "exact": "3/4",                                  // canonical, as a rational string
  "unit": "gallons",
  "acceptedForms": ["3/4", "0.75", "75%", "6/8"],  // all treated as CORRECT
  "preferredForm": "3/4",
  "tolerance": 0,                                  // >0 only for irrational/rounded results
  "formNote": "0.75 and 3/4 are the same amount — nice flexibility."
}
```

**Equivalence is content, not leniency.** A student entering `0.75` where `3/4` was expected is *right*, and telling them so — while naming the equivalence — teaches something. Never mark an equivalent form wrong. Never silently accept it either; say it.

`tolerance` stays `0` for exact rational answers. Any nonzero tolerance requires a Math Agent note explaining the rounding.

### 6.2 Graceful degradation

Stations render only if their data exists. A manifest with just `problem` + `arrivals.answer` still produces a usable (if unscaffolded) trip. The site must never crash on a partial manifest — it renders what it has and marks the rest "not built yet" in the Dispatch Office.

| Missing | Behavior |
|---|---|
| `threeReads` | Boarding shows generic prompts, no model answers |
| `read1.platformCheck` | First read stops after the retelling — no sentence to find, no "why this line". The Dispatch Office reports it as still-to-do rather than broken. |
| `ticketBooth` | **Station skipped entirely** — never guess the schema |
| `signalBox.barModel` | Estimate still runs; no diagram |
| `signalBox.estimate` | Station skipped (and flagged — this weakens Look Back) |
| `engineRoom.steps` | Single free-answer box against `arrivals.answer` |
| `misconceptions` | Generic "not quite" — the worst degradation, flagged loudly |

---

## 7. `arrivals` — Look Back

```jsonc
"arrivals": {
  "answer": { "exact": "300", "unit": "miles", "acceptedForms": ["300", "300 miles"] },
  "questionCheck": "The question asked for distance in 5 hours. Is that what you found — or did you stop at the speed?",
  "unitsCheck": "miles",
  "reasonablenessCheck": "300 miles in 5 hours. Does that feel like a believable train journey?",
  "reasonablenessFailExample": "If you got 1,500 miles, that's 300 mph — faster than almost any train on earth.",
  "connection": "Every problem on this line works the same way: find the rate for one, then scale it."
}
```

---

## 8. `signalFailure` — the keyword trap (optional)

**Top-level field.** Not inside `signalBox`. Renders at the **Arrivals Board (Phase 4b)**, as section 5, after the answer is already on the screen. Validator rule 17 fails a manifest that nests it in `signalBox`.

```jsonc
"signalFailure": {
  "trigger": "more",
  "prompt": "The story says the express platform has MORE benches. Why is the answer smaller than the number you were given?",
  "why": "Because the sentence is telling you about the express platform, not the local one. \"More benches than the local one\" says the express platform is the bigger of the two — so the local platform, the one you are being asked for, has to come out below it. The word tells you which is bigger. It does not tell you what to do."
}
```

| field | what it is |
|---|---|
| `trigger` | **Authoring metadata — never rendered.** What the trap hinges on. Usually a word (`more`, `each`, `and`, `times`, `per cent`), sometimes a property of the answer (`smaller`, `bigger`, `divide`). It is not uniform enough to carry a student-facing label, which is why the renderer ignores it. |
| `prompt` | The challenge. A real question, posed to a student who has just answered. |
| `why` | The explanation, held behind a **Show me why** click so the prompt is genuinely asked before it is answered. |

Set it to `null` — explicitly, not by omission — where a problem deliberately lets the keyword *succeed*, so the next problem on the line can invert it. `eg-crate-bottles` does this and carries a comment saying why.

Only attach where the trap is genuine. Manufactured traps teach paranoia rather than sense-making — Teacher Agent rejects contrived ones.

### Why the placement is a rule and not a preference

This field was authored on nine problems and **read by no code at all** until 2026-08-10, while sitting inside `signalBox` — the Plan screen, three phases before the Engine Room. Nothing rendered it, so nothing exposed what it contained. Wired up where it sat, it would have leaked on eight of the nine:

- **`cp-hot-drinks`** states a step answer verbatim — its `why` says "{{n2}}% of {{n1}} cold drinks is **{{more}}** drinks", and `{{more}}` is s1's `exact`.
- **`eg-bunting-ribbon`, `eg-water-cans`, `eg-carriage-seats`** open by naming the operation: *"You divided, and dividing is right."*
- **`cp-bench-count`, `cp-parking-spaces`, `eg-mail-sacks`** ask *"why is the answer smaller than the number you were given"*, which settles the direction that step 1 exists to ask.
- **`pw-quilt-colors`** states the method (rewrite to a common denominator).
- **`ch-barrier-count`** is the only one that was safe, and only because its author wrote it defensively and left a comment saying so.

All of that is free at the Arrivals Board and fatal before it. **If you ever render this field on an earlier phase, every one of those strings has to be rewritten first** — moving it is not enough.

Retired shape: `trapWord` / `trapReading` / `whyItFails` / `studentPrompt`. This schema documented that shape while eight of the nine problems used `trigger`/`prompt`/`why`; `pw-quilt-colors` was the only user and has been converted. Rule 16 rejects the old field names.

---

## 9. `review` — written by agents, never by the author

```jsonc
"review": {
  "math":    { "status": "pass", "agent": "math-reviewer", "date": "2026-07-28",
               "checked": ["arithmetic", "answer-forms", "misconception-accuracy",
                           "estimate-range-contains-answer", "unit-consistency"],
               "notes": "Independently re-solved. 180/3=60; 60×5=300. Estimate range 250–350 contains 300." },
  "theme":   { "status": "pass", "agent": "theme-reviewer", "date": "2026-07-28",
               "notes": "Reading level OK. a11yDescription present. No grade level in copy." },
  "teacher": { "status": "pass", "agent": "teacher", "date": "2026-07-28",
               "notes": "Distractors explain structure, not surface cues. Hint ladder escalates properly." },
  "student": { "status": "untested" },
  "oversight": { "status": "approved", "date": "2026-07-28" }
}
```

A problem may only be set `"status": "published"` when math, theme, and teacher are all `pass` **and** oversight is `approved`. The site's loader **skips non-published problems by default**, so an unreviewed manifest cannot reach a student by accident. That's the safety property the whole pipeline exists to provide.

---

## 10. Validation rules

Enforced by **`MF.validate()`** in [`assets/js/data.js`](../assets/js/data.js). It runs in the browser rather than as a build script, for the same reason the content is JS-wrapped: there is no toolchain to depend on. Two ways to run it:

- Open the site and call `MF.validate()` in the console — returns one row per problem with `errors` and `warnings`.
- Open [`dispatch.html`](../dispatch.html), which runs it live against whatever you're authoring.

**Current status: 6 problems, 0 errors, 0 warnings.** The checker has been tested against a deliberately malformed problem and catches all 13 planted defects.

Errors block publication; warnings are reported but allowed.

**Errors** — block publication:
1. `id` unique, kebab-case, matches filename.
2. `line` is one of the five valid values.
3. Every `{{nN}}` in `text` exists in `numbers`, and vice versa.
4. `sentences` concatenate to `text` (whitespace-normalized).
5. `questionSentenceIndex` is in range.
6. `ticketBooth.distractors` covers **all four** non-correct lines with non-empty `whyWrong`.
7. Every bar model has a non-empty `a11yDescription`.
8. Every step has ≥1 hint, and hints have unique rungs ascending from 1.
9. `arrivals.answer.exact` is parseable as a rational or decimal.
10. `estimate.reasonableMin ≤ final answer ≤ estimate.reasonableMax`. *(Catches a subtle, common authoring bug: an estimate range that excludes the right answer teaches students their good estimate was wrong.)*
11. `acceptedForms` are all mathematically equal to `exact`.
12. `transferTicket` resolves to an existing id.
16. `signalFailure`, when present, has non-empty `trigger`, `prompt` and `why`, and none of the retired `trapWord`/`trapReading`/`whyItFails`/`studentPrompt` names.
17. `signalFailure` is **not** nested inside `signalBox`. *(Inside `signalBox` it reads as Plan-screen content, and its text routinely names the operation, the direction, or a step answer — see §8.)*

Rule 16/17 numbering follows the unfilled-token scan, which is rule 16's neighbour in `data.js` and has no number in this list; it fails on any `{{token}}` left standing in any top-level field after materialisation. That scan and `materialize()` now derive their exclusions from one shared constant (`UNFILLED_BY_DESIGN`) rather than from two hand-maintained copies of the same six field names — which is how a top-level `signalFailure` was both unfilled *and* unchecked.

**Randomization rules** — enforced at trip-generation time, not authoring time:
13. `stationRoles` is non-empty, and every value is a known station role (`reading`, `drafting`, `estimation`, `switchyard`, `signalbox`).
14. `context` is from the known set. New contexts may be added, but silently inventing one weakens the "no two stations share a context" constraint.
15. `hubEligible` problems must have complete `arrivals` data and **must not** rely on station-specific scaffolding to be solvable — the Hub gives none.

**Warnings** — allowed, but reported:
- Missing randomization tags (`context`, `unknownCar`, `stationRoles`) — usable but excluded from randomized trips.
- No `misconceptions` on a step.
- No `signalFailure` anywhere in a line's whole set. *(Implemented 2026-08-10. It had been listed here since the schema was written and never existed in code — a rule that lives only in a document is the same silence that let `signalFailure` itself go nine problems without a reader. It currently fires on the whole `ratio` line, which has none.)*
- Reading level above target.
- A grade level appearing in any student-visible string (regex on `grade`, `\b[6-9]th\b`, etc.).
