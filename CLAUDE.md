# Working on this project

**Starting a new session? Read [`docs/HANDOFF.md`](docs/HANDOFF.md) first.** It is the current state of the build, what is open and who owns it, and how to verify anything here.

**Read [`docs/VERIFICATION.md`](docs/VERIFICATION.md) before authoring or reviewing anything.** Not only during a review cycle — before touching content, illustrations, or a station phase. It runs to 41 rules and every one but §30 was written after a real failure on this project. §30 is the single prediction, and it says so in its own text — which also makes it the one most likely to be argued away.

**§30 has now failed, and not in the way it predicted.** Cycle 30 found that its exemption mechanism *does not exist*: `tier` is read in one place, `hub.js:634`, as a filter choosing which vocabulary rows render, and nothing consults it as an exemption — while `five-situations.js:17` asserts in capitals that the tag protects it and that file has no `tier` field at all. §30 predicted somebody would **widen** the exemption. What happened is that somebody **asserted** it. That is §40, and it is why §30 stays.

## Why this file exists

The hard-won rules on this project lived in `.claude/agents/*.md`. Agent files bind only when that agent runs, so work done directly — without invoking `teacher`, `art-director`, `math-reviewer` — inherited none of them.

That is not hypothetical. In Cycle 6 the Ratio & Rate Rail shipped with the correct answer as the first option on all six ratio tables. That exact defect was already written down **twice**: in `stations.js:245` for the Read 3 options, and in `teacher.md` under authoring biases — *"You will write the correct option first. It happened in all seven problems."* The working fix was 200 lines from the new code. Neither was read, because the work was not being done as an agent.

Anything that must always hold goes in `VERIFICATION.md`. This file points at it.

## The five that catch the most here

1. **Read the scars before you build.** Before writing anything resembling something already here — a choice UI, a picture of a problem, a gate, a phase — grep for how the existing one solved it and read the comment above it. This codebase records its failures in comments; they are the most valuable thing in it.

2. **A defect can exist with every file correct.** The worst ones live in the composition — what one file renders, crossed with when another renders it. Ask *what does the student's screen contain at this moment?* and render it. Do not infer it from the source.

3. **No answer may reach a student before it is asked.** Check digits, spelled-out numbers ("four times"), and structure (a bar drawn in 3 parts while step 1 asks "how many parts?"). The Plan phase runs **before** the Engine Room.

4. **Fix the class, not the instance.** On finding a defect, name the class and enumerate every surface in it.

5. **Measurement proves geometry, never appearance.** Say which one you did. Whether something *looks* right is the user's call — in the session that produced these rules, every visual defect was found by the user, and every one had passed geometric checks.

## Practical

- **Open the site in Edge** with a percent-encoded URL. `Start-Process` joins `-ArgumentList` without re-quoting, so a bare Windows path splits on spaces and opens a tab per word:
  ```
  Start-Process msedge 'file:///C:/Users/jtayl/.claude/sessions/Mr%20Fraction%20Word%20Problem%20Express/index.html'
  ```
  Then `Ctrl+Shift+R` — Edge caches `app.css` and the JS hard.
- **`MF.validate()`** in the console after any content change. A rule that has never fired is not known to work: plant a defect, confirm it fires, confirm it clears.
- **Then render it.** `MF.validate()` reads manifests; it cannot see a defect that only exists on screen. Serve the site (`tools/serve.ps1`), load `tools/sweep.js`, call `SWEEP.report()` — it drives every phase of every problem in every number set and reports unfilled tokens, render errors, misconception collisions and pre-solve answer leaks. In Cycle 8 four of seven defects existed in no manifest. Read its header first; two of its own checks were measuring nothing when written.
- **After editing a file, exercise that file's own surface.** A green check on a neighbouring module says nothing. A malformed comment in `stations.js` once passed validator and model checks while being a syntax error that would have killed every station.
- `tools/serve.ps1` is test scaffolding only — the site runs from `file://` and must keep doing so.
