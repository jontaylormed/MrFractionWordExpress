# Handoff — Mr Fraction's Word Problem Express
### State at the end of 2026-08-17. Read this first, then `../CLAUDE.md`, then `VERIFICATION.md`.

# 🚂 THE SITE IS LIVE

## **https://jtaylor-cloud.github.io/MrFractionWordProblemExpress/**

**It is public and being shared.** That changes one thing about how you work: from now on **`file://` and the deployed origin are two runtimes and both must keep working**, and *"it works locally"* is no longer evidence about the thing anyone else opens. See `VERIFICATION.md` **§34**, which was written the day the first upload went live completely broken while every local check passed.

**After any publish, load the live URL and check it** — stylesheet applied, `MF` defined, expected problem count, `MF.validate()` clean, images 200. Two minutes, and it is the only check that examines what a student actually opens.

---

> **The rules most likely to save you time.** §29: bulk content edits go through `Edit`, never a shell — a PowerShell replace once corrupted seven files here. **There is a git repo now (2026-08-10), so the worst case is a `git checkout` rather than a lost session — but only for what is committed, so the rule stands.** §31: deletion is the cheapest fix to write and the most expensive to live with. §34 and §35 are new and are about deployment and about instruments that break what they measure.

**Next session's work is §0.** Everything after §1 is the state you are picking up, and much of it is history kept for its reasoning rather than a brief.

> **[`ROADMAP.md`](ROADMAP.md) is the forward plan, and it is now empty of unbuilt items.** Item 6, Challenge Mode, was built 2026-08-15/16 — see [`CHALLENGE-MODE.md`](CHALLENGE-MODE.md). Item 8, the estimate input, was designed and built 2026-08-16 — see [`ESTIMATE-INPUT.md`](ESTIMATE-INPUT.md). **What is left on this project is review and real students, not features.**

---

## 0. The state, as of 2026-08-17

**Challenge Mode and the estimate gate are both BUILT.** Everything in §0-HISTORY below describes the site before either existed and is kept for its reasoning, not as a brief. The two planning documents are **[`CHALLENGE-MODE.md`](CHALLENGE-MODE.md)** (its §4 fade ladder is normative) and **[`ESTIMATE-INPUT.md`](ESTIMATE-INPUT.md)** (its §4a is marked for art-director review).

**What would most improve this site is no longer code.** Every island `review` block is `provisional` because author and reviewer are the same person, and **no real student has used any of it** — least of all the two unstaffed halts, which now drop a student from the checklist straight into the arithmetic. That is the missing check, and it has been the missing check since long before the island.

**37 problems, 148 materialisations, 1,428 rendered screens, every sweep count 0.** The screen count *fell* from 1,468 on 2026-08-16 and that is not a regression — an unstaffed halt stopped rendering three phases a student can no longer reach. When a count moves, check which direction the design moved first.

## ⚠ CYCLE 30 RAN, AND IT BLOCKED THE GATE. READ THIS BEFORE ANYTHING ELSE.

**Five instruments, six blocking findings, and the arithmetic was clean.** Full write-up in [`REVIEW-LOG.md`](REVIEW-LOG.md) — Cycle 30 for the findings, **Cycle 30b for what was fixed and what was not.**

**Why the cycle existed at all, and the finding that came before any agent ran:** all six agent briefs were grepped for Crossover Island and the estimate gate and returned **zero in every one** — six reviewers briefed on a site that no longer existed, whose clean pass would have been indistinguishable from a real one. The briefs and the stale specs were fixed first (`PROBLEM-SCHEMA` was missing four blocks, including `testTrack`, which 24 of 37 problems author).

**All six blockers are fixed and verified** (Cycle 30b): `optionTrue` marking false statements correct on 6 of 7 island problems; two independent answer leaks in the Plan phase; the companion bubble covering 56% of the Engine Room input; the Look Back check locking after one misjudgement; right/wrong conveyed by hue alone on four builders and the seam picker; and every island stop headed *"The Reading Room."*

**Four things to take from it that outlive the fixes:**

1. **The content was in better shape than the engine.** All 28 island answers correct, every transfer sound, all 56 estimate bands containing their answers, every lazy-input gate holding, 55/55 hint ladders complete — and the student pass could not find a single string that made it feel stupid. **Every blocker was in the machinery, not the maths.**
2. **`VERIFICATION.md` §30's exemption mechanism does not exist.** `tier` is read in exactly one place, `hub.js:634`, as a filter choosing which vocabulary rows render. **Nothing consults it as an exemption**, and `five-situations.js:17` asserts in capitals that the tag protects it while that file has no `tier` field at all. §30 is the one rule written before its failure; this is its failure, and it arrived as **an asserted protection rather than a widened one**. Three documents in that cycle claimed a protection that was not there. **When a comment says something is safe, check that the thing it names exists.**
3. **The instruments disagreed with each other, twice, and both times the disagreement was the finding.** Theme refuted student's touch-target measurement (taken mid-animation); art-director refuted student's reading of the halt (made without a compositing browser). New rule in `VERIFICATION.md` §40.
4. **Appearance is still unverified.** The browser pane never composited a frame for any agent. `art-director` got real pixels via headless Edge and its recipe is in the log — **bare `--headless`, not `--headless=new`, which silently writes no file**, plus `--virtual-time-budget` to seek animations rather than sample mid-flight.

**What is still open after the fixes** — the full list is at the end of Cycle 30b. The two that need **you** rather than an agent:

- **Is `--target-min: 44px` still the standard?** `.car` sits at 34px via a bare literal. WCAG 2.2 needs 24px and passes either way. Either the token is the rule and `.car` is a defect, or the token is aspirational and should say so.
- **The estimate gate ships its only affordance `hidden`** (`estimate.js:303-307`) — at rest it is a rule, five ticks and *"Nothing set yet."* Measured, deliberately not fixed: it needs a design decision, and `ESTIMATE-INPUT.md` §4a needs rewriting around it rather than patching.

**The live site is current** — the user pushes manually and it was verified against the deployed origin on 2026-08-16. It drifts by default, so check the deployed file before calling anything shipped, and **give the case-sensitivity check a mis-cased control** or it proves nothing.

What exists that did not before:

| | |
|---|---|
| **Crossover Island** | Its own map — coast, mountains, forest, three rivers, a lake, one irregular circuit, a train on the rails, a lighthouse. Reached from the Challenge Line card, which is live. Five stops, all open. |
| **Seven two-line problems** | `cl-signal-delay`, `cl-season-tickets`, `cl-platform-planters`, `cl-lost-umbrellas`, `cl-buffet-crates`, `cl-track-sleepers`, `cl-carriage-clean`. Four number sets each. Every one is two situations joined by a **transfer** — a number that is an answer on one side and a given on the other. |
| **Pooling** | Thorne Bridge and Fell Crossing hold **two problems each**, drawn at random. A stop is a place, not a problem; `data-stop` carries the stop. |
| **The Crossover Read** | A new numberless phase that REPLACES the Platform Check on a paired problem. Three stages: find the seam, then run the same five-question checklist on each half. |
| **The two-model Plan phase** | `pair-model.js`. First picture, a crossover slot naming what crosses, then a second picture drawn *waiting* — because on a two-line problem nothing in it can be known yet. |
| **The Lighthouse** | A fifth Learning Hub, seven pages, on both maps. Teaches the crossover, the checklist and the five situations in depth. |
| **`challenge-scenes.js`** | Seven scenes, one per problem, neutral ink. Found by `Scene.libs()` with no registration; dispatch is by art name, not by line. |
| **Engine and checker changes** | `MF.CHALLENGE` route key; `pair` on a problem; `optionTrue` (the answer key can no longer be just `p.line`); `stacked` inverted on the Platform Check; the sweep's transfer rule and `solve@N` second-half screens; a numberless rule over the Crossover Read's own copy; `buildTrip` excluding paired problems from every mainland ride; a trip report only above `Selector.MIN_STOPS`. |

**Four things a new session should know before touching any of it:**

1. **An island answer may not be 1, 2 or 5**, and no authored island copy may contain a number word. The station header says *"Two situations, joined"* on every island screen and *"five"* is everywhere the checklist is — the leak scan reads spelled-out answers, and it has already caught one. **Watch for "half"**: *"the first half hands the second half a number"* is the natural sentence and it is refused.
2. **`fadeLevel: "independent"` is the unstaffed-halt switch**, not a label — and **what it drops was reversed twice on 2026-08-16, so ignore any older description of it, including the one this line used to carry.** It read *"the Three Reads, the estimate and the hint ladder stay — settled by the user, do not re-open"*, and both halves of that are now wrong. A halt runs **`read1` and then the Engine Room**: no Crossover Read, no second or third read, no Ticket Booth, **no estimate**. Only the hint ladder stays.

   **The ladder is written in exactly one place — `Stations.phaseChain`** — because it used to be written twice, here in prose and again in `tools/sweep.js`, and the copies disagreed for a whole run. `CHALLENGE-MODE.md` §4 states it as a normative table naming that function; **if the table and the code disagree, the code is right.** Both of the day's opposite rulings are recorded there with their arguments, so read the losing one before reversing it again.
3. **`SWEEP.report()` ends with a Challenge coverage line.** If it says *examined: 0*, the check ran over nothing and the run is not a pass. `SWEEP.selfTestChallenge()` proves the transfer rule independently of content.
4. **No checker on this project can see the journey panel or the end-of-trip screen.** Both defects found in the verification ride lived there — the panel told the student every island stop was *"track being laid"*, and the end screen was one button on a blank page with its words off in the floating companion. **Ride a stop after changing anything in `app.js` or `scenery.js`.**

---

## 0-HISTORY. The brief as it stood on 2026-08-10 — NOT current, kept for its reasoning

> ### ⚠ **This section is history. §0 above is the current state.** Every count below is superseded — it says 30 problems, four hubs and 1,196 screens against today's 37, five and 1,428 — and it describes a site with no island and a text-box estimate. It is kept because the *reasoning* in it is still good and several rules were earned here. **Do not take a brief from it.**
>
> Why it is still here at all: this file has twice been rewritten in a way that deleted the argument along with the outdated fact, and then somebody re-litigated a settled decision because the reason had gone with it. `VERIFICATION.md` §31 — deletion is the cheapest fix to write and the most expensive to live with.

### 0.0 Where the build was on 2026-08-10

**All five lines run. 30 problems, four number sets each — 120 materialisations, 1,196 rendered screens, every check at zero.** Four Learning Hubs, all paged journeys. The percent card is complete: five problems across four lines, its own route, colour, marker, Plan model and hub, with a Ticket Booth that asks which line is hiding underneath.

| Line | Problems | |
|---|---|---|
| Part–Whole Loop | 8 | incl. percent of a whole |
| Ratio & Rate Rail | 7 | incl. percent as a rate |
| The Change Line | 5 | incl. percent increase and reverse percent |
| The Compare Line | 5 | incl. multiplicative and percent comparison |
| Equal Groups Express | 5 | incl. fraction division |

**The map is now two groups:** the five situations on one row, then *Special lines* — the Grand Tour, the Percent Line, and an inert **Challenge Line** card marked *under construction*. That card is where Challenge Mode plugs in: give it a route key and drop `line-card-soon`.

**The only thing left on the roadmap is Challenge Mode** (`ROADMAP.md` §6). It is larger than a line and the roadmap says to plan it in its own document first.

### 0.0b Hosting — what is true now

**Repo:** `jtaylor-cloud/MrFractionWordProblemExpress`, deployed by `.github/workflows/static.yml`, which uploads `path: '.'` — the whole repository. Pages source is the repository root.

**The first upload shipped broken**, and the failure is worth knowing because it will recur with any new folder: `index.html` and the ten images were uploaded but **`assets/` and `content/` were not**, and the images landed at the repository root rather than in `assets/art/`. GitHub's drag-and-drop uploader flattens silently when files are selected instead of a directory being dragged. Every local check had passed — they verified the local folder was internally consistent, which was true and useless.

**This folder IS a git repository now — initialised 2026-08-10**, branch `main`, **four commits**, 105 files tracked. Identity is set **locally on this repo only**; nothing global was touched. `.gitignore` excludes the duplicated `Mr Fraction Word Express Art/` (an exact copy of `assets/art/`, verified name-for-name and byte-length), and `.gitattributes` normalises line endings so a Windows working copy and a Linux Pages deploy stop disagreeing about every file.

### ⚠ LOCAL AND LIVE HAVE DIVERGED, AND THAT IS THE FIRST THING TO KNOW

The live site is uploaded **by hand**. It is working, but it is behind this working copy. Verified against the deployed files on 2026-08-10:

| | live | local |
|---|---|---|
| `LICENSE` | ✅ present | ✅ |
| `.nojekyll`, `.gitignore`, `.gitattributes` | ❌ absent | ✅ |
| Loader "Welcome to" | ❌ | ✅ |
| Line cards three-and-two with tickets | ❌ still five-across | ✅ |
| Heading "The Five Situations" | ❌ still lower case | ✅ |
| Contrast floor on the loader status | ❌ | ✅ |
| `docs/`, `tools/`, `.claude/` | ❌ absent by choice | ✅ |

**Nothing is broken live** — it is simply an older build. Before claiming any change is "shipped", check the deployed file, not this folder (§34).

**And check it case-sensitively.** A check that reported three of those as already-deployed was wrong on all three: two matched pre-existing text elsewhere in the file, and one used PowerShell `-match` — **case-insensitive by default** — to test a capitalisation change. It could not have failed.

**No remote is configured and nothing has been pushed.** The live site's history is unrelated to this one, so a first push needs `--force` and is the user's call, not an agent's. Note that it would also publish `docs/`, `tools/` and `.claude/`, which the user has deliberately kept off the public repo:

```
git remote add origin https://github.com/jtaylor-cloud/MrFractionWordProblemExpress.git
git push -f origin main
```

**The safety net was tested rather than assumed.** The 2026-08-04 corruption was re-staged exactly — a scripted `w`→`h` substitution across `ch-water-tank.js` — and `git checkout -- <file>` restored it byte-for-byte. `VERIFICATION.md` §29 is updated: the "no version control" clause is struck, and the rest of the rule stands.

Still true and still the thing most likely to break the art: **Pages serves from Linux, which is case-sensitive, and Windows is not.** All 67 references currently resolve case-exact. Re-check after adding any asset.

### 0.0c The architecture question, answered — do not reopen it without new information

Asked on 2026-08-10 whether the site should be a single HTML file like the sister site. **Measured: 26,335 lines / 1.6 MB in one file, and it would still ship 10 images and 5 font files.** Kept multi-file, because the content is 11,795 lines and grows with every problem, `dispatch.html` writes standalone problem files, and with no version control one file means one corruption is total. **The upload method was the fault, not the layout.**

### 0.1 The three things most likely to bite you

1. **Registries must be DISCOVERED, not listed.** On 2026-08-08/09 a hardcoded array of three scene libraries silently exempted a fourth in **three separate files**, one of them `tools/sweep.js`'s own geometry check — so every art in `groups-scenes.js` shipped unchecked while the sweep printed "0 faults". `0 faults` and `0 subjects` print identically. After adding a library, model or kind, **grep for the existing ones by name**; every hit is a list that does not know about the new one.

   **Two more instances found 2026-08-10, both in `data.js`, both naming the same six fields.** `materialize()` filled tokens in a listed set of top-level fields, and `validate()`'s unfilled-token scan read the *same* list — so a field absent from both was unfilled **and** unchecked, with the checker sharing the exact blind spot it existed to catch. That is what `signalFailure` was: authored on nine problems, top-level on `pw-quilt-colors`, and its `{{trapFrac}}` would have reached a student as four literal braces. Both now derive from one shared `UNFILLED_BY_DESIGN` constant (`['problem','numberSets']`), so they cannot drift and a new field is covered without anyone remembering.

   **Two more on 2026-08-10, and the count is now SEVEN FILES, THREE OF THEM CHECKERS.** `tools/preview-scenes.html` discovered scene libraries but hardcoded which *scripts to load* — discovery cannot find what was never loaded, so it could not see the fifth library or four new problems. And `tools/check-contrast.ps1` reported **"39 pairs checked, 0 failing"** against a palette that did not contain `--line-percent`, holding the five line colours as hex copies of `app.css`. Both now read from the source of truth, and both **refuse to report a clean run on an empty subject set** — see `VERIFICATION.md` §36, written for this.
2. **`model.js` has THREE dispatches** — `html()`, `wire()` and `applies()`. A model missing from `applies()` renders no picture and raises nothing.
3. **The picture may never draw as many groups as the answer**, when the count is the answer. `groups-model.js` branches on which quantity is missing for exactly this reason, and `compare-model.js` has the same stopping rule at the gap.

4. **`.ps1` files here are UTF-8 with no BOM, so an em-dash inside a double-quoted string becomes a curly quote and ends the string.** PowerShell 5.1 decodes a BOM-less script as ANSI; `E2 80 94` lands as CP1252 characters ending in U+201D, which PowerShell treats as a delimiter. The symptom is `Missing closing '}'` pointing at balanced punctuation. **Plain hyphens in double-quoted strings**; comments and single-quoted strings are fine. `VERIFICATION.md` §37.

### 0.2 Open, and waiting on the user

- **Contrast is clean — 48 pairs, 0 failing.** A first run of the rebuilt tool reported three AA failures on the Platform Check's "you are here" row and they were briefly written up here as real. They were not: that label renders **19.7px bold**, which is WCAG large text at a 3:1 threshold, and all six line colours clear it. The generated pair had asked for 4.5. Corrected. **The habit worth taking from it: a threshold is a claim about how something renders, not about which token it uses.**
- **Still genuinely open, and unchanged:** three line colours sit between 4.09 and 4.41 on `--cream-mid`, which is fine everywhere it is used today because that surface is bold — but it leaves no headroom if a normal-weight label is ever put on that background. Darkening them is a design call. `ROADMAP` §5b item 3.
- **The near-duplicate heading on the home page.** "Five situations" (the explainer card) sits a screen above "The Five Situations" (the label over the cards). Pre-existing; capitalising the second made it more visible. Rewording the explainer's heading is the fix if it bothers anyone.
- **Whether to push this repo to GitHub**, which would publish `docs/`, `tools/` and `.claude/`. See the divergence table in §0.0b.

---

# ⏹ EVERYTHING BELOW THIS LINE IS FINISHED WORK

**Stop here for the current brief.** The rest of this file is kept for its *reasoning* — why things were built the way they were — and every section in it describes work that is done. Nothing below is a task.

Two exceptions worth reading if you are picking up related work: **§H-2 Known-open** (items the user has not ruled on) and **§2 What is running** further down.

---

### H-1 FINISH THE COMPARE LINE — problems 4 and 5, and the animated illustrations

**The user's instruction:** *"complete the build of Compare Line with animated illustrations."*

> **⚠ HISTORICAL — this whole section is finished work, kept for the reasoning.** The Compare Line is complete: 5 problems, all with illustrations and Test Tracks. Read §0.0 above for where the build actually is.

**Where it stood when this was written: 3 of 5 problems, and no pictures.**

| | | |
|---|---|---|
| `cp-late-trains` | difference unknown · worked · Reading Room | ✅ built |
| `cp-ticket-queues` | **larger** unknown · partial · Drafting Table | ✅ built |
| `cp-bench-count` | **smaller** unknown · independent · Switchyard | ✅ built |
| `cp-parking-spaces` | **multiplicative** · referent unknown · *"times as many"* means divide | ✅ **built 2026-08-08** |
| `cp-hot-drinks` | **percent** · larger unknown · two steps · *"per cent of what?"* | ✅ **built 2026-08-08** |
| **Animated illustrations** | `assets/js/compare-scenes.js` — `delays`, `queues`, `platforms`, `spaces`, `buffet` | ✅ **built 2026-08-08** |

**The Compare Line is complete at five problems.** Every problem carries an `anim` scene on all eight pre-Arrivals phases in all four number sets.

**The Plan model now has four shapes, and they are four different pictures, not variations.** `compare-model.js`: `both` (two plain bars), `gap` (base plus a marked difference), `times` (the referent drawn once, the other as N seamed copies), `percent` (the referent, plus an extra taking its width from the stated percentage OF that bar). The last two were added for problems 4 and 5. Which shape is drawn comes from which token the manifest carries — `gapToken`, `factorToken` or `percentToken`, and the validator now refuses more than one.

**Percent CHANGE is still unwritten, and that was a deliberate call** — see §0.2.

**The rule that art on this line must obey, and that the other two lines got for free:** a Compare scene is a picture of *the two quantities themselves*, so "no numerals" is not enough — the OBJECTS must be uncountable. Benches and queuers run off both edges of the frame and overlap each other; `delays` draws minutes, which cannot be counted off a picture at all. And there is no bracket, gap marker or shared baseline anywhere in the file: measuring the gap is `compare-model.js`'s job, where the bars are derived from the live number set. A scene bar at an authored width would be a second, unchecked picture of the same relationship — right for set 1 and silently wrong for the other three.

**What "animated illustrations" means here, concretely.** `Scene.html(p, masked)` dispatches `mode: "anim"` art to a per-line library and **returns `''` for art no library claims — a silent empty frame** (`VERIFICATION.md` §24; the validator now refuses an art name no library claims, so a typo errors rather than blanks). Ratio and Change each have one:

- `assets/js/ratio-scenes.js` — exports `has(name)` and `html(p)`
- `assets/js/change-scenes.js` — same shape

So Compare needs **`assets/js/compare-scenes.js`** with the same two exports, art for each problem's context (`delays`, `queues`, `platforms`, plus 4 and 5), and a `<script>` tag in `index.html` beside the other two. Each problem then gets `scene: { mode: "anim", art: "<name>", caption: "…" }`.

**Two hard constraints on the art, both already enforced:**
1. **The scene obeys masking.** `Scene.html(p, masked)` is called with `masked` true on `read1` and `platform`. Nothing numeric may be countable or announced there — see how the icon and unit branches handle it. The sweep fails the build if a digit reaches either screen, **including via `aria-label`**.
2. **Reduced motion.** Every animated scene ships a static end-state, not a frozen mid-frame. Copy the pattern in `ratio-scenes.js`.

**Problems 4 and 5 — what makes them worth writing.** The line's crux is the **referent** (*"three times as many as WHAT?"*), and problems 2 and 3 have already run the additive version of the trap: `cp-ticket-queues` lets *"more"* mean add, `cp-bench-count` takes it away with near-identical wording. **Problem 4 should do the same for the multiplicative case**, where the classic error is comparing against the wrong quantity. Problem 5 brings percent change, which §3.2 assigns here.

**The Plan model already supports what they need.** `compare-model.js` handles three shapes — both amounts given, larger unknown, smaller unknown — sized from the current number set. A *multiplicative* compare may need a fourth (bars as repeated copies rather than base-plus-gap); decide that before authoring problem 4, because the model decides what the content can teach.

**Where to copy from.** `cp-bench-count.js` is the most complete manifest on the line: per-problem Platform Check questions, a Test Track, a Signal Failure, four number sets with the misconception constraints written out in its header comment.

### H-2 Known-open, and the user has not ruled on these

- **Six problems still go estimate → Engine Room with no Test Track**, and they are exactly the six that take two steps: `pw-helmet-savings`, `pw-quilt-colors`, `pw-band-brass`, `pw-cycling-club`, `rr-van-hours`, `rr-market-stall`. **All five Compare and all five Equal Groups problems now have one.** The Equal Groups ones were added after the user rode `eg-crate-bottles` and found it went from the estimate straight to the arithmetic — a gap I had written a justification for in the manifest, which is exactly how the other six got theirs. **Ask before building six more.**
- **Read 2's distractor is the last option in most of the older problems and Read 2 does not shuffle**, so *"never pick the last one"* scores without reading. (Measured at 14 of 16 before the Compare and Equal Groups lines existed; those 10 place theirs mid-list, so re-measure across all 26 before acting.) The fix is the same seeded shuffle `phRead3` and the Platform Check use. New Compare content places its distractor mid-list.
- **From the Cycle 15 review — BOTH FIXED 2026-08-10.**
  - **Map no longer destroys the trip.** `renderMap()` opened with `trip = null` and the top-bar pill called it directly, so one tap anywhere inside a station ended the ride with no confirmation. Looking at the map is now non-destructive: a trip in progress survives and the map offers it back, naming the line and the stop. Abandoning is still possible — it is choosing a different line, with the resume banner sitting above the choice. This also made the map's own copy true for the first time: the hubs are advertised as somewhere to drop in *"during"* a trip, and every hub is reached through that screen.
  - **Look Back can now run on a wrong answer**, which is what the flagship scenario always needed. A student who has read the whole hint ladder or answered wrongly three times, **on the last step only**, can take the number they have to the Arrivals Board. It renders a different screen: their own estimate against their own answer, the two checks that do not need the answer (question asked, units), and one way onward — back to the Engine Room. **It never prints the answer**, it never grades, and it is not an exit. Not a trap either: **re-measured 2026-08-10 at 30 problems — every one of the 164 steps ends its hint ladder by stating the answer outright.** That claim is load-bearing for this design, so it is re-taken rather than carried forward whenever the problem count changes.
  - **What that second fix cannot catch, stated rather than hidden:** an answer that is wrong but still within a factor of two of the estimate passes the board. Nothing there can catch it without revealing the answer, which is the one thing that screen may not do. The hint ladder is the route for that student.
  - **`tools/sweep.js` covers the new screen** as a synthetic phase `check-unsure`, and it is in `PRE_SOLVE` — the board a student reaches *unsure* is pre-solve however it is spelled. Turning it on immediately reported eight hits on `pw-helmet-savings` and `pw-band-brass`; read in context all eight are `questionCheck` naming an EARLIER step's value as a warning, which the student has already computed themselves to get there. Encoded as a rule (on that screen only the last step's answer and the final answer count) rather than as eight cleared entries, because a hand-kept exemption list is the defect class this project already has five files of.
- **Line-colour contrast — MEASURED 2026-08-10, and compare was never the problem.** All six measured against both creams, on the rendered screen rather than from the spec. Against `--cream-light` every line passes AA. Against `--cream-mid`, which is what the Platform Check's *you are here* row uses behind line-coloured text at 19.7px: **compare 4.98 and partwhole 5.43 pass; change 4.26, ratio 4.41 and groups 4.09 FAIL the 4.5 needed for normal text.** New: `--line-percent` #6B3FA0 at 6.98 / 5.67, the strongest of the six.
  **Fixed without touching the palette** by setting that label to weight 700 — at 19.7px bold it is WCAG large text, so the threshold is 3:1 and all five clear it, worst 4.09. Deliberately not fixed by darkening three brand colours, because that changes every surface on the site and belongs to the palette decision (`ROADMAP` 5b) that is still open. **The numbers are recorded there so it can be decided rather than pre-empted.**
- **Percent CHANGE now has a home, and it did not need the stacked branch after all.** ~~`PEDAGOGY.md` §3.2 says percent lives on this line~~ — `cp-hot-drinks` honours that as percent *comparison*, and the objection recorded here was that true percent change would answer the Platform Check **changed** and **stacked** on a station whose header says Compare. **That objection was about the LINE, not about percent change.** `ch-barrier-count` (built 2026-08-09) puts reverse percent on the **Change Line** with `surface: "percent"`, where the header says Change and the story is a Change — so `moments: changed` and `fit: onekind` are both honest and nothing is bent. `stacked` is still the best wrong answer on that screen and is argued rather than dismissed. The stacked verdict branch remains unbuilt and is still needed for genuinely two-line problems (Challenge Mode).
- **A spelled-out number on a numberless screen is still unchecked.** `numberlessBreaks` in `tools/sweep.js` scans read1 and platform for **digits** only. A caption or a Platform Check reading *"thirty-one benches"* passes every check on this project — confirmed by planting it 2026-08-08. The leak scan does catch spelled-out **answers** anywhere pre-solve (and now does so for every whole number, see below), but a spelled-out **given** on a numberless screen has nothing looking at it. The fix is not free: `rr-market-stall`'s caption legitimately says *"Two stalls"* and `cp-late-trains`'s says *"Two trains"*, so a blanket word ban fires on honest content and needs the cleared-hits mechanism. **A scope call, so it is listed here rather than done.**

### H-3 Background: the Learning Hub half of the older brief

**The user's words (2026-08-02):**

> *"I would like to work on strategies or keywords, phrasing, or syntax that help them identify in the reading which of the five strategies to use. Develop in the Learning Hub common phrases and mathematical pairings, such as sum means addition and product means multiplication."*

**And (2026-08-03), the amendment that unblocked it:**

> *"I still think it is great for students not to solely or mainly rely on looking for keywords. However, I do think thinking about keywords will be helpful in developing their reading skills… we need to develop a simple checklist that lets the student quickly assess a word problem to see whether one of these five main strategies will work."*

So: a **Learning Hub** teaching students to recognise, from the language of a problem, which of the five situations they are in — plus the vocabulary they need to read the problem at all, plus a **Platform Check** that lets a student conclude the five *don't* fit.

### The one sharp edge, and how to stay on the right side of it

This site is **built to refute keyword strategies.** `ch-water-tank` exists so that "more means add" *fails*. The `five-situations` hub closes with **"A warning about keyword tricks."** That has not been relaxed — non-negotiable 4 was **sharpened**, from "no keyword strategies" to **"no word is ever taught as sufficient to choose an operation."**

What changed is that "keyword" was doing the work of three things, and now they are named. **`PEDAGOGY.md` §2.2 is the authority; the one-line test is:**

> **A word may set the question. Only structure sets the operation.**

| | | |
|---|---|---|
| **Tier 1 — names it. Build this.** | *sum, product, difference, quotient, per, twice, remainder* | The word **is** the operation or its result. A student who does not know "product" is blocked by English, not by reasoning. Definable without reference to any problem — that is the test. Goes to `math-reviewer`: a definition is a mathematical claim. |
| **Tier 2 — asks it. Build this carefully.** | *more than, left, each, altogether, of, shared* | The word names the **situation** and hands the reader a **question**. *"More than"* → *a comparison is happening; which amount is bigger, and which were you told?* It must terminate in a question, never an operation. **≥2 examples per entry, taking different operations** — one example *is* a keyword strategy. |
| **Tier 3 — lies. Never build this.** | *"more means add", "altogether means add"* | Mere co-occurrence. The thing that fails, that this site breaks on purpose, and that these students were taught until it stopped working. Hazard copy only, inside a section tagged `tier: "lies"`. |

**The greps still fire and must not be softened.** New copy quotes tier-3 rules in order to refute them, so it will trip `"more" means` / `look for the word` / `key word`. The exemption is a **data tag** (`tier: "lies"` on the hub section), never a reading of intent. `VERIFICATION.md` §30 — the only rule in that document written *before* its failure, and therefore the one most likely to be argued away.

### The Compare Line — how it is built, so problems 4 and 5 match it

**`compare-model.js`** owns the Plan phase for this line. Two bars on a shared track; the student names the **referent** — the amount the other is measured against — and only then does the gap appear, bracketed and carrying the question, never a number. It stops exactly where the ratio table stops at the scale factor.

Three shapes, chosen by the data: both amounts given (`gapUnknown` on the Test Track picture), `unknownIs: "larger"`, `unknownIs: "smaller"`. **Bar widths are derived from the current number set**, never authored — authored widths would be right for set 1 and silently wrong for the other three.

**Three geometry defects were found here by eye, not by any check**, and all three are things to re-verify after touching the picture:
- `parseFloat("2/3")` is **2**, which draws a bar three times too long and validates perfectly clean. The fraction parse is tested.
- Each row was its own grid with an `auto` value column, so tracks came out different widths and the percentages were not comparable — the *unknown* bar drew **longer** than the amount it is measured against. Value column is now fixed width; the drive asserts every track shares a left edge and a width, and that drawn ratio matches true ratio.
- The hatched difference was a box tacked **past** the end of the bar, so the dashed `?` outline enclosed only the part you already knew. A bar's outline now spans that bar's own total and the hatching is an overlay on its tail.

**`testtrack.js` kind `compare`** is the demonstration between the estimate and the Engine Room. Worked pair on numbers belonging to no problem on the line (8 and 13, gap 5 — §26 forbids demo numbers colliding with any set's answers), then two questions on the student's own picture: which amount you already have, and therefore which way you travel. Nothing is calculated.

**`model.js` has THREE dispatches** — `html()`, `wire()` **and `applies()`** — and its own comment used to say two. `phPlan` consults `applies()` first, so a model missing from it renders no picture and raises nothing. That is how Compare's Plan phase shipped blank for one round.

### The Platform Check — built, and the first read is now two screens

**Running on all 30 problems.** `PEDAGOGY.md` §3.7.1, schema in `PROBLEM-SCHEMA.md` §3.1.

| | |
|---|---|
| **`read1`** | The five questions as taps — Kinds · Moments · Things · Shape · Question. The free-text retelling is **gone**; Mr Fraction's reading of the story now lands after the five. |
| **`platform`** (new phase) | Tap **every** sentence carrying the signal, then the resolution and the map with your row marked. |

**Why two screens, and this decides anything you add inside a trip:** the station header prints *"The Change Line · Start ± Change = Result"* above **every** phase, Read 1 included. So the five questions are part-answerable off the furniture — after two stations on a line the answers are constant. **The evidence is not**: which sentences carry the signal changes problem to problem. Screen one classifies; screen two makes you prove it. **Never ask a student inside a trip to name the line.**

The answer key for the five questions is the schema itself — each option declares the lines it is true of — so a new **line** needs entries in `CHECK` and `PLATFORM` in `stations.js`; a new **problem** needs only `platformCheck`.

**Still unbuilt, and deferred by the user:** the verdict branches as real content (*two lines stacked*, *none of them fits* — currently answered in copy, not taught), and the full check in a **Learning Hub**, where no line has been chosen and naming it is an honest question. Do not start either unprompted.

`PEDAGOGY.md` §3 now says the five lines cover **most** of the 6–12 space rather than essentially all of it, on the user's instruction — a site that teaches students to check the fit cannot claim everything fits.

### Syntax and phrasing — the genuinely valuable half

"Which of the five" should be identified from the **shape of the sentence**, not a word list. That is Schema-Based Instruction, and it is what the site already does at the Ticket Booth. Structural cues, not cue words:

- *one thing, at two moments in time* → **Change**
- *two different things, named and set side by side* → **Compare**
- *"for every X there are Y", a relationship that holds at any size* → **Ratio & Rate**
- *the same amount, repeated* → **Equal Groups**
- *pieces that add back up to one named total* → **Part–Whole**

Note that none of those is a word. They are all descriptions of **what the sentence is doing**, which is exactly why they survive where keywords do not.

### Where it goes, and what already exists

- `content/hubs/five-situations.js` — already distinguishes the five and covers "the two that get mixed up most" and the keyword warning. **Extend this, or add a third hub beside it.**
- `content/hubs/fraction-yard.js` — the precedent for a vocabulary hub ("the bottom number cuts, the top number counts").
- **Learning Hubs are never gated and never framed as remedial.** That is a locked decision.
- New hub copy will trip the teacher agent's keyword grep. That is the grep working. Tag the section `tier: "lies"` or rewrite the copy — **never widen the exemption.** No renderer reads `tier` yet; it is a review tag first and can become a render hook later.
- Make the three-tier distinction explicit **in the copy the student reads**, not just in a comment. The distinction is itself worth teaching, and it is the honest answer to "but my old teacher told me to look for key words."

---

## 1. Read these before touching anything

| | |
|---|---|
| [`../CLAUDE.md`](../CLAUDE.md) | How to work on this project, and why the rules live where they do. |
| [`VERIFICATION.md`](VERIFICATION.md) | **41 rules.** All but §30 were written after a real failure here — not a style guide, a list of ways this project has actually been broken. §30 was the exception; **Cycle 30 found its failure**, and §39 and §40 are that cycle's. |
| [`REVIEW-LOG.md`](REVIEW-LOG.md) | Cycle history. Read the cycle that touched what you are about to change. |

**The single most useful habit on this project:** before building anything that resembles something already here — a choice UI, a picture, a gate, a phase — grep for how the existing one solved it and read the comment above it. The comments record the failures. They are the most valuable thing in the repo.

---

## 2. What is running

**30 problems · 4 number sets each · 120 materialisations · 1196 rendered screens · all checks clean.**

| Line | Problems | State |
|---|---|---|
| Part–Whole Loop | 8 | Running — incl. percent of a whole |
| Ratio & Rate Rail | 7 | Running — incl. percent as a rate |
| The Compare Line | 5 | Running — incl. multiplicative and percent |
| Equal Groups Express | 5 | Running — incl. fraction division |
| The Change Line | 5 | Running — incl. percent increase and **reverse percent**, the keystone |
| **The Percent Line** | 5 | **A ROUTE, not a sixth schema.** Drawn by `surface`, spread across four of the five lines. Equal Groups gets none, deliberately |
| The Grand Tour (mixed) | — | Draws from all five running lines |

**All five schemas now have content (2026-08-08).** A line lights on the map at 3 published problems; every line is above that. Counts above are `Selector.availableLines()`, not a hand-kept list.

Every problem carries `theme: pass`, `teacher: pass`, `oversight: approved`. **None of those passes is independent** — see §6.

A student's journey through one station:
`read1 → platform → read2 → read3 → ticket → plan → demo → solve → check`
`read1` and `platform` are the two screens of the first read, and **both are numberless**.
`demo` is the Test Track and appears on the 10 problems that would otherwise go from the estimate straight to the answer.

---

## 3. The machinery, and where it lives

- **Number sets** — `numberSets` + `numberChecks` in a manifest, materialised by `MF.materialize()`. All 30 problems, 4 sets each. Meeting the same problem twice gives identical numbers **25.1%** of the time, against a 25% floor.
  - `numberChecks` may name `seg1`/`mark1` — the bar's segments and shaded parts *as materialised* — so the picture is checked against the arithmetic.
  - A set may carry `sceneGroups: [n,n,n]` for the unit-grid scene. Cell counts are numbers, so tokens cannot reach them.
- **Schema-dispatched Plan phase** — `model.js` delegates to `ratio-model.js` (ratio table) or `change-model.js` (change train), else the Model Yard.
- **The Test Track** — `testtrack.js`, phase `demo`. Three kinds: `section` (Part–Whole), `cross` (Ratio, cross-multiplying), `drive` (Change). Spec and the two rejected designs: [`TEST-TRACK-SPEC.md`](TEST-TRACK-SPEC.md).
- **Randomised rides** — `selector.js`. `stationRoles` is a weighted bias, not a gate. Hub reserved first. `MF.MIXED` for the Grand Tour.
- **`tools/sweep.js`** — test scaffolding, not shipped. Load it into the page, call `SWEEP.report()`. Renders every phase of every problem in every set and reports unfilled tokens, render errors, misconception collisions and pre-solve answer leaks. **Read its header first** — it documents four ways it has itself been wrong.

### Deliberately gone — do not reintroduce
- `signalBox.plan[]` — 36 authored strings no code read. Deleted on the user's decision. `PROBLEM-SCHEMA.md` §5 says *do not author one* and gives the reason.
- `signalBox.secondRoute` / The Junction — replaced by the Test Track. Deleted, not bypassed.
- A first step that asks for a value the Model Yard reveals on marking — dropped from four Part–Whole problems.

---

## 4. How to verify anything here

```
powershell -File tools/serve.ps1          # test scaffolding only; the site ships on file://
```
Then in the page console: load `tools/sweep.js`, call `SWEEP.report()`, and `MF.validate()`.

**Three things that are not optional:**

1. **Plant the defect.** A rule that has never fired is not known to work. Plant it where the value lives *at render time* — `ticketBooth.whyCorrect` and read3 option text are rendered immediately; `read1.modelAnswer` and `estimate.modelReasoning` are revealed only after a click, so planting there proves nothing.
2. **Then render it.** `MF.validate()` reads manifests. Four of Cycle 8's seven defects existed in no manifest at all.
3. **Say what the instrument is looking at.** On 2026-08-02, *more findings were wrong than right* — eight instrument errors in a day. §25 lists them; the shape is always the same: the check and the subject were not the same object.

If you drive a station by hand, pass a real metrics object — `{estimates:[],hints:[],misconceptions:[],schema:[]}`. With `{}` the click handlers throw *inside the listener* and the feedback panel stays empty, which looks exactly like a missing misconception.

---

## 5. Open items — every one needs the user

**There is no remaining item to pick up alone.** That is about ownership, not effort. Starting any of these unprompted adds more code reviewed only by the agent that wrote it, which is this project's largest recorded weakness.

1. **Compare and Equal Groups lines.** Each is a build the size of the Change Line — its own Plan model, illustrations, 3 problems × 4 sets, plus whatever it breaks in the engine. *A scope call.*
2. **No independent review exists.** Every pass was run by the agent that wrote the content; three `oversight` agent runs died on session limits. *Needs the user to ask for agents — do not spawn them unprompted.*
3. **No real student has used the site.** The missing check.

**Judgement calls the user may want to revisit** (all built, all measurable-but-not-settleable):
- `pw-free-throws` runs its fraction backwards — the shaded sections are what you are *given* and the whole is the unknown.
- `ch-kiosk-sandwiches` has both ends known, so the student could set off from either; the demo says so and then insists on the order.
- `rr-cordial-mix`'s cross-multiplication yields the **syrup**, not the final answer.
- Line-card grids are centred at 788px rather than spanning the full 1180px to match the map.

---

## 6. What "approved" does and does not mean

Every problem is marked approved. That covers the mechanical, mathematical, theme and teacher properties **that can be measured, and were**. It does not mean an independent reviewer looked at it, because none has.

The record is worth keeping in view: on 2026-08-02 the option-length tell from Cycle 7b was **reproduced in brand-new content by the agent that had written that scar into this log two cycles earlier**, and was caught only by re-running the measurement. Writing a rule down does not prevent it. Running the check does.

**And still: no real student has used this site.** Nothing in this document substitutes for that.

---

## 7. Two traps that will cost you an hour each

- **`Start-Process` does not re-quote `-ArgumentList`.** A bare Windows path splits on every space. Use a percent-encoded `file:///` URL for Edge, embedded quotes for `tools/serve.ps1`. Has bitten four times.
- **The in-app browser pane** reports `clientWidth: 0` when not laid out, serves stale CSS for `file://`, does not composite screenshots while hidden, and **throttles `setTimeout` / never fires `requestAnimationFrame`** in the background. Use `tools/serve.ps1`, set an explicit viewport, and prefer the reduced-motion path when testing animation logic — it resolves synchronously.
