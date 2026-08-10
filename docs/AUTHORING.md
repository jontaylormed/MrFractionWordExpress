# Adding Your Own Word Problems
### The Dispatch Office — author's guide
**Audience:** teachers · **Status:** Draft v1 · **Last updated:** 2026-07-28

---

## The short version

You write the word problem. The system builds the lesson around it.

There are two ways in. Both produce exactly the same thing — a validated problem file — so you can mix and match freely, and switch between them at any time.

| | **Track A — Claude Code** | **Track B — Dispatch Office** |
|---|---|---|
| You need | Claude Code installed | Just a web browser |
| You write | The problem + the answer | The problem + as much scaffolding as you want |
| You get | A fully scaffolded, math-checked lesson | Exactly what you wrote, previewed live |
| Time per problem | ~1 minute of your time | ~10–20 minutes |
| Math double-checked | ✅ Automatically, independently | ❌ You are the checker |
| Good for | Building a bank quickly | One-off problems, tweaks, no-install environments |

**Recommendation:** use Track A for volume, Track B to review and adjust what it produced. Track B is also the honest fallback for a locked-down school laptop.

---

## Track A — drop it in a folder, run one command

### 1. Write your problems

Create a plain text file in `content/inbox/`. One problem per block, separated by a blank line and `---`. Nothing fancy:

```text
A recipe needs 3/4 cup of flour per batch. You have 6 cups of flour.
How many full batches can you make?
ANSWER: 8 batches

---

A jacket is on sale for $51 after a 15% discount.
What was the original price?
ANSWER: $60

---

Train A leaves at 60 mph. Train B leaves the same station 1 hour later at 80 mph.
How long until Train B catches Train A?
ANSWER: 3 hours after Train B leaves
```

**Required:** the problem text, and `ANSWER:`.
**Optional but helpful** — any of these lines, if you care about the outcome:

```text
LINE: ratio              (change | compare | groups | ratio | partwhole)
ROUTE: express           (local | express | limited)
NOTE: my students always invert this one
TRAP: "of" makes them multiply when they should divide
```

Anything you don't specify gets figured out and then checked. Anything you *do* specify is treated as authoritative and is never overwritten — if you say it's the Compare Line, it's the Compare Line.

### 2. Run the pipeline

```bash
/add-problems
```

That kicks off the review chain described in [PROCESS.md](PROCESS.md):

1. **Teacher agent** classifies the line, writes the Three Reads prompts, the distractors with real explanations, the bar model, the estimate range, the solution steps, and the four-rung hint ladder.
2. **Math agent** independently re-solves the problem *without looking at the stated answer*, then compares. It checks every accepted answer form, verifies each misconception diagnosis is actually the error a student would make, and confirms your estimate range contains the true answer.
3. **Theme agent** checks reading level, that the a11y descriptions exist, and that no grade level leaked into student-visible text.
4. **Oversight agent** confirms all three passed and marks the problem `published`.

### 3. Read the report

You get a summary like:

```
3 problems processed.

✅ recipe-flour-01      Equal Groups Express · Local
✅ jacket-discount-01   Part–Whole Loop · Express
⚠️  train-catchup-01    Ratio & Rate Rail · Limited
   MATH FLAG: Your answer "3 hours after Train B leaves" is correct,
   but the problem is ambiguous about whether "how long" is measured
   from Train A's departure (4 hours) or Train B's (3 hours).
   Suggest rewording to "How long after Train B leaves...".
   → Held as draft. Not shown to students until you decide.
```

**Anything flagged stays out of the student-facing site until you resolve it.** Nothing reaches a student unreviewed — that's the point of the whole arrangement.

---

## Track B — the Dispatch Office page

Open `dispatch.html` in any browser. No install, no internet, no account.

It's a form that walks the same structure, one station at a time, with the pedagogy explained inline as you go — so it doubles as a short course in why the site is built this way.

- **Live preview** on the right shows the student's view updating as you type.
- **Validation** runs continuously against the §10 rules in the schema doc — you can't produce a broken file.
- **Fill what you want.** Blank stations are simply skipped by the site (see schema §6.2), and the preview tells you exactly what a student will and won't get.
- **Import an existing problem** to edit it, including anything Track A generated.
- **Export** gives you the JSON to save into `content/problems/`.

> **Important honesty note:** Track B has **no automatic math checking.** Whatever you type is what students see. The Dispatch Office will warn you about structural problems (an estimate range that doesn't contain your answer, a missing hint) but it cannot tell you that 3/4 × 8 ≠ 5. If you want the math independently verified, run it through Track A afterward — importing a Track B file and running `/add-problems` will verify without overwriting your authored fields.

---

## The one thing worth your attention: distractor explanations

If you only hand-write one part of a manifest, make it this.

When a student picks the wrong train line, what they see next is the single most valuable teaching moment on the site. A generated explanation is usually decent. A teacher's explanation — one that names *the specific thing your students actually confuse* — is much better.

Compare:

> ❌ "That's not correct. This is the Ratio & Rate Rail."

> ✅ "I can see why — there's multiplying in both. But Equal Groups is when you repeat the *same* group over and over. Here you've got one fixed relationship between miles and hours that you're stretching to a new size. That stretching is the Ratio Rail."

The second one is a teacher who has watched thirty kids make that mistake. That's not something a model derives from the problem text.

---

## Quality bar for a new problem

Before you add it, check:

- [ ] The problem is **solvable and unambiguous.** (The `train-catchup` example above shows how easily this slips.)
- [ ] The context doesn't assume knowledge some students won't have — unfamiliar sports, foods, cultural references, or costs from a different decade.
- [ ] The reading level is not harder than the math. If the vocabulary is the obstacle, you're testing reading, not reasoning.
- [ ] It genuinely belongs to one line. Problems that straddle two schemas confuse the Ticket Booth gate; split them.
- [ ] The numbers are chosen so a wrong operation gives an obviously wrong answer. *(If 12 ÷ 4 and 12 − 4 both give 8-ish plausible results, you can't diagnose the error.)*
- [ ] There's a real-world reasonableness check available — an answer that can be "obviously too big."

---

## Where things live

```
content/
  inbox/           ← you drop raw problems here (Track A)
  problems/        ← validated manifests, one JSON per problem
  journeys/        ← ordered sets of problems (a class period's worth)
docs/              ← the specs
tools/             ← validator + contrast checker
dispatch.html      ← the Dispatch Office (Track B)
```

A **journey** is just an ordered list of problem ids, with the three-problem fade (worked → partial → independent) applied across each line. That's what you'd assign to a class.
