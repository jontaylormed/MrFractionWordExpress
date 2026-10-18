# Mr Fraction's Word Problem Express

A zero-dependency static site that teaches students how to *start* a word problem. Runs from `file://`, no storage. Live at <https://jontaylormed.github.io/MrFractionWordExpress/>. GitHub Pages deploys every push to `main` (`.github/workflows/static.yml`).

## Hard constraints
- **Zero dependencies, no build step, works from `file://`.** No localStorage, sessionStorage or IndexedDB. `tools/serve.ps1` is for testing only.
- **Nothing is graded, and no answer reaches the screen before it is asked.** That covers digits, spelled-out numbers and structure (a bar drawn in 3 parts while the question asks "how many parts?").
- **The repo is public.** No personal details in files, comments, notes or commit messages. The author's name appears only in the README credit line.
- **Bulk edits go through Edit, never a shell replace.** A scripted replace once corrupted seven files.

## Read on demand, not up front
| Task | Read |
|---|---|
| What exists, counts, phases | `docs/SITE-STATE.md`, the only source of build facts |
| Open items, recent history | `docs/HANDOFF.md`, top section only |
| New or edited problem | `docs/PROBLEM-SCHEMA.md`, `docs/AUTHORING.md` |
| Visual or UI work | `docs/ART-DIRECTION.md` |
| A defect, or a review | `docs/VERIFICATION.md`: grep for the relevant §, don't read the whole file |
| A new site, or the pedagogy | `docs/MR-FRACTION-PHILOSOPHY.md`, `docs/NEXT-SITE-KIT.md` |

Before building something similar to an existing feature (a choice UI, a gate, a picture, a phase), grep for the existing one and read the comment above it. This codebase records its past failures in its comments.

## Verify in proportion to the change
- **Docs or copy only:** no browser run.
- **CSS or JS:** serve the site, load the screen you changed and check the console. For layout, sweep widths from 320 to 1440px in iframes. Ask what the student's screen contains at that moment; a defect can exist with every file correct.
- **Content or station logic:** run `MF.validate()` (baseline 37 problems, 0 errors, 28 warnings), then `SWEEP.report()` from `tools/sweep.js`.
- **Always:** give each check a control that must fail, and read what the tool actually printed. Say whether you measured geometry or appearance; appearance is the user's call. On finding a defect, fix every instance of it, not just the one you saw.

## Git and GitHub
- **Commit** when a change is finished and verified. Read the stat line first.
- **Push only when the user says so.** `git fetch` first, because GitHub sometimes commits on its own. Then `git push origin main`.
- **After a push,** load the live URL once Pages has rebuilt (about 1–2 minutes). Check paths case-sensitively, with a mis-cased control that must 404.
- **Never force-push or rewrite history** without explicit approval.

## Working efficiently
- Don't spawn the review agents in `.claude/agents/` unless the user asks. Their briefs total about 17k words.
- Prefer Grep and partial reads to whole files, and batch independent calls.
- Preview in Edge, run from this folder:
  `Start-Process msedge ('file:///' + ((Resolve-Path index.html).Path -replace '\\','/' -replace ' ','%20'))`
  Then press `Ctrl+Shift+R`, because Edge caches CSS and JS hard.
- If a change alters anything `docs/SITE-STATE.md` lists, update that file in the same commit.
