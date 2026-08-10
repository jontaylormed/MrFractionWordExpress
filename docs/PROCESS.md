# The Oversight Process
### How content gets from an idea to a student
**Owner:** Oversight Agent · **Status:** Draft v1 · **Last updated:** 2026-07-28

---

## Why this exists

This site tells struggling students what's true about mathematics and how to think. Getting it wrong has real costs:

- A **wrong answer** teaches a student who reasoned correctly that their reasoning can't be trusted. For a student who already believes they're bad at math, this is the most damaging thing the site can do.
- An **inaccessible interface** silently excludes exactly the students it was built for.
- A **keyword strategy** that slips into a hint teaches a shortcut that will fail them in two years.
- A **condescending sentence** makes a 16-year-old close the tab, and nothing else matters after that.

Each of these has a different specialist who catches it. None of them catches all four. Hence four agents and a coordinator.

## The agents

| Agent | Owns | Catches |
|---|---|---|
| **teacher** | `PEDAGOGY.md`, scaffolding authoring | Bad teaching, keyword strategies, collapsed hint ladders |
| **math-reviewer** | Correctness of everything numeric | Wrong answers, ambiguous problems, fake misconceptions |
| **theme-reviewer** | `THEME-AND-ACCESSIBILITY.md` | Inaccessibility, condescension, reading-level creep, contrast failures |
| **art-director** | `ART-DIRECTION.md` | Screens that are correct but look unfinished |
| **student-tester** | Nothing — uses everything | Whatever survived the others (this is most things) |
| **oversight** | `PROCESS.md`, `REVIEW-LOG.md`, `VERIFICATION.md` | Agents that didn't actually do their job |

> **All agents inherit [`VERIFICATION.md`](VERIFICATION.md).** It is the standard for how anything gets claimed as checked, and every rule in it was written after a specific failure on this project. The headline: verification was applied well to arithmetic and markup from Cycle 1, and **decayed once the work became visual and geometric** — where "looks plausible" felt like enough. Oversight enforces it.

> **Why art-director exists.** The first build passed every gate above and still looked like an unstyled document, because nobody owned whether it looked finished. Worse, the theme rule *"theme lives in the chrome, content lives in the quiet"* got used as justification for building almost no chrome. A rule meant to protect the reader became an excuse to do less work. The Art Director's standing question — *would a fifteen-year-old believe someone made this on purpose?* — is the check that was missing.

---

## The two gates

### Gate 1 — content may be built
Runs on manifests and specs. Required: **teacher PASS → math PASS → theme PASS.**

A problem reaching Gate 1 has: correct math independently verified, scaffolding that teaches, and copy that doesn't exclude or condescend.

### Gate 2 — may ship
Runs on a real, running build. Required: **theme PASS (UI) → student SHIP.**

The student agent must drive an actual browser. A student report without reproduction steps and quoted strings is rejected and re-run — it means the agent didn't do the work.

### The enforcement mechanism

Gates are not honor-system. The site's problem loader **skips any manifest whose `status` is not `published`**, and only oversight can set that. An unreviewed problem physically cannot reach a student, even by accident, even in a demo.

---

## Triggers — when a cycle runs

| Event | Agents |
|---|---|
| New problems added (Track A) | teacher → math → theme → oversight |
| Problem edited by hand (Track B) | math → theme → oversight |
| Pedagogy spec changed | teacher → oversight → (student, if flow changed) |
| Design token changed | **contrast checker (mandatory)** → theme → oversight |
| UI/build changed | theme → student → oversight |
| Copy changed | theme → oversight |
| Before any release | full cycle |

**Downstream re-review rule:** when findings force a change, every agent downstream of that change re-runs. A math fix changes copy, which re-triggers theme, which changes the UI, which re-triggers student. "It was a small edit" is not an exemption — small edits are where regressions live.

---

## Conflict precedence

When agents disagree, oversight applies this order:

| Rank | Principle | Note |
|---|---|---|
| 1 | **Correctness** | A Math CRITICAL cannot be overruled by anyone, including oversight. |
| 2 | **Accessibility** | If a student can't use it, its merit is zero. Theme's a11y findings outrank Theme's own aesthetic findings. |
| 3 | **Pedagogical integrity** | The Pedagogy §7 non-negotiables. Outranks "students may find it annoying." |
| 4 | **Student experience** | Confusion and discouragement findings. Outrank aesthetics. |
| 5 | **Visual quality** | Art Director. Real value — a site nobody wants to look at teaches nobody — but yields to all of the above. |

Rank 5 is not "ignorable". It means that when art direction conflicts with the four above, it yields — and the right answer is nearly always a **bounded third option** rather than dropping the idea. The italic serif for Mr Fraction's voice was neither approved nor banned; it was scoped to his asides only.

**Precedence decides who yields, not whether the concern is real.** The best outcome is usually a bounded third option. See review-log conflict T-2: the animated train wasn't approved or killed, it was constrained to ≤300ms of chrome that vanishes under reduced-motion.

---

## Severity definitions

Shared vocabulary so verdicts mean the same thing across agents.

| Severity | Meaning | Effect |
|---|---|---|
| **CRITICAL** | A student is taught something false, or cannot use the site at all | Automatic FAIL. Blocks the gate. |
| **MAJOR** | Misleading, significantly harder, or excluding for some students | Blocks unless oversight rules and records why |
| **MINOR** | Imprecise or unpolished | Logged, doesn't block |

Agents may not soften a CRITICAL to let a cycle proceed. Oversight may not accept one.

---

## Escalation to the human

Oversight rules on most things. These go to the user:

1. Any change to a **Pedagogy §7 non-negotiable**.
2. Any **accessibility regression** anyone wants to accept.
3. Any conflict caused by a **locked project constraint** (no localStorage, no build step, zero dependencies) — only the person who set the constraint can trade it.
4. **Scope changes.**

Escalations are presented as *conflict → options → recommendation → cost*, never as an open question.

> **Currently open:** Theme Q2 — because preferences are session-only, a dyslexic student re-sets font, ruler, and tint on **every page load**. Theme Agent recommends making the journey a single-page app, which solves it with no storage at all. Needs a ruling before the build.

---

## Running a cycle by hand

```bash
/add-problems
```

Or invoke oversight directly to sequence a full review. Individual agents can be run alone for a targeted pass — but **only oversight publishes**, and a single-agent pass never satisfies a gate.

---

## Known limitations of this arrangement

Stated plainly, because a review process that oversells itself is worse than none:

- **These agents are the same model wearing different instructions.** They share blind spots. Four passes reduce correlated error but do not eliminate it — a misconception all four share reaches students.
- **Independent re-solving mitigates but doesn't eliminate anchoring.** The math agent still sees the problem text the teacher agent shaped.
- **Reading-level and tone judgments are estimates**, not measurements. The Flesch-style intuitions here are unvalidated against real students.
- **No real students have used this.** Every claim about what a 15-year-old finds condescending is a model's guess. The student agent is a proxy, and a weak one — it is the part of this system most in need of replacement by actual classroom testing.
- **Contrast is genuinely verified.** It's arithmetic, and the checker runs. That's the one claim here that isn't a judgment call — and notably, it's the one that caught real errors (see review log, Cycle 1).

The honest summary: this process reliably catches **arithmetic errors, spec violations, and mechanical accessibility failures**. It only weakly catches **whether the teaching works**. Real students are the missing check.
