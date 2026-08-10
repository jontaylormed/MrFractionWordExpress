# The Verification Standard
### Mr Fraction's Word Problem Express
**Applies to:** every agent, **and to anyone working without one** — see `../CLAUDE.md`.
**Owner:** Oversight. **Last updated:** 2026-08-10. **36 rules.**

Every rule here was written after a specific failure on this project. The evidence is kept with each rule, because a rule without its scar gets softened away.

---

## 0. Why this exists

Across Cycles 1–3, essentially every real defect was found **by running the thing, not by reading it** — and the review log says so in as many words. Cycle 3 went further and fed the validator a deliberately malformed problem to confirm it caught all **13** planted defects, noting: *"A validator that only ever passes is worthless; this one was tested."*

That discipline then **decayed** in Cycles 4–6, as the work moved from arithmetic and markup into visual and geometric territory where "looks plausible" felt like enough. Checks were written, came back green, and were believed. Several were measuring nothing at all.

The standard is not "verify". It is *keep verifying at the same rigour when the subject stops being arithmetic.*

---

## 1. Measure before you assert — in **both** directions

Do not claim a pass without the number. **Do not claim a limit without the number either.**

> **Evidence (C1-2).** The theme spec restricted rail green from small body text, asserting it would fail contrast. Measurement showed **7.2:1** — comfortably AA. The restriction was, in the log's words, *"invented, not measured."* A fabricated constraint costs real design freedom and looks exactly like diligence.

Over-restriction and false-green are the same error pointing opposite ways: a claim made without a measurement.

## 2. Test the test — a check that finds nothing is **suspicious, not passing**

Before believing a sweep, assert it examined a plausible, non-zero number of things.

> **Evidence.** Three separate "clean" results on this project came from scans that examined **nothing**:
> - `"0 external references, fully self-contained"` — the filter excluded `\.claude\`, and the project lives under `.claude`. It scanned **0 files**.
> - `"Shipped code files: 0"` from a PowerShell `-Include` that silently matched nothing.
> - `"readAloudInvocations: 0"` — reported as fine; the button id was wrong and read-aloud never ran.

Also check the harness itself is not the thing that's broken:
- 40 `buildTrip` calls looked like a deterministic selector; they ran inside one millisecond and shared a `Date.now()` seed.
- A busy-wait loop blocked the frame clock and made a working animation read as frozen.
- `getBBox()` on a transformed group returns **local** coordinates; comparing them to a viewBox is meaningless.
- A selector counted three legend swatches as grid cells (`9+6+8 = 23` in a 20-cell grid).
- Layout was measured while the browser pane had collapsed to `innerWidth: 0`.
- **(C8)** A render sweep appended the station `display:none`. `innerText` on a `display:none` subtree silently degrades to `textContent`, so every hidden node reported as visible — nine false answer leaks at once, all of them Model Yard values a student only sees after marking a part. Render off-screen with a width; never hidden.
- **(C8)** The same sweep forced the `route` phase on all 15 problems that have no `secondRoute` and reported 15 errors. The real app never goes there. **Visit a phase only if the app would.**
- **(2026-08-03)** The mirror image of that one: a sweep that only *renders* cannot see anything a phase reveals **on click**. Read 1 hid its model answer behind a button, so the leak scan had never read it — two plants there had already come back NOT CAUGHT and been correctly diagnosed as instrument error. It stopped being tolerable when the Platform Check put a screenful of authored teaching copy behind the same click. Fixed with `st.expandAll`. **When you add progressive disclosure to a phase, go and make the sweep open it** — otherwise the new content is exempt from every scan by accident of interaction design.

**If a result is surprising, suspect the instrument before the subject.**

## 3. Break it on purpose

A rule that has never fired is not known to work. After writing a validator rule, feed it data that should fail and confirm it does.

> **Evidence.** Cycle 3 planted 13 defects and confirmed all 13 were caught. Cycle 6's scene rules were confirmed the same way — groups totalling 22 against a 20-part model, and the restored `60 squares` distractor. Doing this also caught a **false positive** ("90 minutes" flagged as a partition) and a **duplicate rule** that reported one fault twice.

## 4. Attack every gate with the laziest possible input

If an empty field or a single keystroke gets through, the gate checks nothing.

> **Evidence (C5).** The regression suite passed Read 3 by typing `"x"` — for many cycles. That was read as the suite working. It was evidence the station was hollow. Three stations were in this state at once: Read 2 had nothing to get wrong, and the Ticket Booth asked a question the student had answered two screens earlier.

**A test that passes trivially is a finding, not a reassurance.**

## 5. Check in the modality the defect lives in

Looking is the default and it is not enough.

> **Evidence.**
> - **Audible only (C3-3).** Read-aloud said *"holds 12 cups cups"* — invisible to every visual check.
> - **Accessibility tree only (C3-1).** Every composite button had no accessible name; a screen-reader user could not have used the site **at all**.
> - **Geometric only.** Cars bunched on a hairpin leg while distance-to-track and in-view checks both passed — nothing measured the gap *between* vehicles.

## 6. Re-run the whole invariant set, not the property you just fixed

> **Evidence.** The leg-map train: fixed overlap → framing broke; fixed framing → spacing broke; fixed on-rails → spacing was still broken because it had never been measured. Each report said "verified" and each was true about exactly one property.

Keep a named invariant list per feature and run it whole.

## 7. Enumerate the other consumers

Changing a shared path, schema, or requirement breaks siblings you are not looking at.

> **Evidence.**
> - Adding required schema fields **broke the Dispatch Office** — every teacher-authored problem reported "Needs fixing".
> - The Terminus Hub hand-builds its problem markup, so it silently missed the Scene every other station got.
> - Read-aloud queried a fixed tag list, so it silently missed every new control.

Before shipping a shared change, list every surface that reads it.

## 8. Dead content raises no alarm

New content must be **shown reachable**, not assumed to be.

> **Evidence (C5-8).** `pw-cycling-club` was unreachable for 40 trips — its `context` collided with a problem present on every Local trip, so the Hub's novelty rule excluded it every time. No error was raised. Sweep many seeds and assert every item appears.

## 9. Documents drift from the build

> **Evidence.** `JOURNEY-ARCHITECTURE.md` claimed a reload resumed the same trip — impossible under the no-storage rule. `PROBLEM-SCHEMA.md` referenced a validator that was never built. And the reverse: `unknownCarPrompt/Options/Why` were authored in **every** problem and specified in `PEDAGOGY.md`, and the UI **never rendered any of it** while the station fell back to a giveaway question.

Spec-says and build-does must be checked against each other in both directions.

## 10. We are one model wearing five hats

> **Evidence (Cycle 1, standing note).** *"These agents are the same model under different instructions. They share blind spots, and passes reduce correlated error without eliminating it."*

Proven in Cycle 4: every agent passed a site that looked unfinished, because none of them owned that question. **A gap in ownership is invisible to a review process.** When something feels unexamined, ask who owns it — the answer may be nobody.

## 11. The user's judgement has repeatedly been better than ours

> **Evidence (C2-1).** The user's restructure was *pedagogically stronger* than the teacher agent's original, which had every trip teaching the same four Polya moves with different numbers. **(C2-2)** Local/Express/Limited were assigned backwards because we did not know a Local stops at every station. Cycles 4–6: hollow gates, the quilt illustration asserting a derived value, the paragraph structure — all user-found.

Default to **adopt and extend**, not defend. Raise a concern once if there is a real one, then build the thing.

## 12. The check we still do not have

No real student has used this site. Every claim about what a demoralised fifteen-year-old finds useful or patronising is a model's guess. **Classroom testing is the missing check and nothing in this process substitutes for it.** Say so rather than implying the reviews cover it.

## 13. A defect can exist with every file correct

The worst defects this project has shipped were not in any one artifact. They existed only in the **composition** — what one file renders, crossed with when another renders it.

> **Evidence (Cycle 6).** The Model Yard prints `segmentValue` on every car; `stations.js` calls it from the **Plan** phase, which runs before the Engine Room. Any problem whose `segmentValue` equalled a step answer handed that answer over a screen early. It was in **five approved problems**. Every manifest was correct. `model.js` was correct. `stations.js` was correct. Five agent reviews read manifests and passed it.
>
> The same shape, same day: the Hub asked riders to name the line they had just ridden (`app.js` counted lines with content; `selector.js` always draws the hub from the ridden line — neither wrong alone). A locomotive ran backwards (art faces left; scrolling ground and trailing steam both said "moving right"). Flour fell past its bowl (spout at x 74; bowl mouth 96–224).

Reading artifacts one at a time cannot catch these. The question that does is: **what does the student's screen actually contain at this moment?** Render the phase and inspect the output — not the source that produced it.

## 14. Fix the class, not the instance

A fix scoped to the example that produced it leaves the class open, and the next instance looks like a new bug.

> **Evidence.** Cycle 3 found the quilt **scene** asserting step one's answer. A rule was written — for scenes. Nobody re-asked it of the **bar model**, so the identical defect sat in five approved problems until Cycle 6.
>
> Then the same error three more times in one session: a numeric leak rule was added and immediately missed leaks **spelled out in words** ("four times"); those were fixed and a **structural** leak remained (a bar drawn in 3 segments while step 1 asked "how many stretches?"); that was fixed and a new Plan model then made step 1 redundant in two further problems.

On finding a defect, name the **class** and enumerate every surface in it. *Where else can an answer reach a student before it is asked?* — not *fix the quilt*.

## 15. Read the scars before you build — and note where they are written

This project records its failures. Recurrence means the record was not read.

> **Evidence (Cycle 6).** Every ratio table shipped with the correct option first. This was already documented **twice**: `stations.js:245` for the Read 3 options — *"a student could score full marks without reading"* — and `teacher.md` under authoring biases: *"You will write the correct option first. It happened in all seven problems."* The working fix was 200 lines from the new code.

Before building anything resembling something already here — a choice UI, a picture of a problem, a gate, a phase — grep for how the existing one solved it and read the comment above it.

**And note where the lesson lives.** The rule above was in an agent file. Agent files bind only when that agent runs; work done directly, without invoking `teacher` or `art-director`, inherits none of them. A lesson filed only in an agent will be relearned by whoever works without it. Anything that must always hold belongs **here**, and this document is to be read before authoring, not only during a review cycle.

## 16. The author is the worst reviewer of their own fresh work

> **Evidence (Cycle 6).** Four spelled-out answer leaks were found in brand-new Ratio & Rate content, written by the same agent that had just flagged the identical pattern in the Part–Whole set — including an estimate reading *"Ten bags for twenty is two dollars each exactly."*

Sweep a newly discovered class against **your own output first**, before anyone else's. When the authoring pass and the review pass are the same agent, say so in the log rather than letting a sign-off imply independence.

## 17. A green check on a neighbour says nothing about the file you edited

> **Evidence (Cycle 6).** A comment block in `stations.js` was left malformed — `*/` closed it early and two lines of prose fell through as bare code. That is a syntax error that would have killed the file and every station in it. The checks running at that moment exercised `data.js` and `model.js` and passed clean. It was caught by reading the file back.

After editing a file, exercise **that file's own surface**. For a station, that means driving a station.

## 18. Measure the statistic the user actually experiences

Variety counts, distinct-value counts and "at least one" checks are frequently true and useless. The question is almost never *can this happen* — it is *what happens to me, each time*.

> **Evidence (Cycle 7).** Randomised trip generation was reported as working on the strength of "7 different problems open the trip". That counted how many distinct problems **ever** open one. The distribution was not measured, and one problem was opening **two trips in three**. The user reported seeing the same problem every time; the metric said seven. Both were true.

For anything a student meets repeatedly, report the **distribution**, not the range. And where a strategy could beat the content, report its **success rate against chance**, not whether it is theoretically possible.

## 19. A check that reports a miss indicts the instrument first

When a planted defect is not caught, the likeliest explanation is that the defect never reached the check.

> **Evidence (Cycle 7).** The estimate-range rule reported MISSED. It was not broken: the defect had been planted in the problem's **base** estimate, and `materialize()` overwrites that from the chosen number set, so the value under test never reached the validator. Planted in the set — and separately on a problem with no sets — it fired both times.

Number sets introduced a layer where **the authored field and the rendered field are different objects**. Plant defects where the value lives *at render time*. And before "fixing" a rule that reports a miss, prove the subject actually changed.

## 20. Randomness needs its generator checked, not just its output

> **Evidence (Cycle 7).** `makeRng` is an xorshift32 seeded directly with the trip seed. Seeded with small integers it emits a near-linear ramp — seeds 1, 2, 3 produced first draws of 0.000063, 0.000126, 0.000189, and **all 300 small seeds drew below 0.5**. Every two-way shuffle therefore resolved identically, and `pw-soup-serving` was unreachable across 300 consecutive seeds while its only rival won 300/300.
>
> Large `Date.now()`-shaped seeds hid this completely, and that is all the code had ever passed. It surfaced the first time a **reproducible** seed was used — which is exactly when a generator most needs to be sound, because that is when it is being tested.

The failure presented as dead content and was nearly filed as one. Scramble a seed before drawing from it, and sanity-check the first draws across a seed range before trusting any sweep built on them.

## 21. Optimising a proxy can destroy the objective

State the goal, improve the stand-in, then **re-measure the goal**.

> **Evidence (Cycle 7).** Mixed rides were clumping — 37.5% of adjacent stops shared a line — so a stricter alternation rule was added. It worked perfectly: 0% adjacency. It also cut distinct trip line-ups from **20 to 4**, because with two lines the constraint admits almost nothing. Variety was the requirement; tidy alternation was the proxy.
>
> Same session, same shape: levelling option lengths so the correct answer was no longer the wordiest drove "always pick the longest" from a strong signal to **0%** — which is the identical tell inverted. *The wordiest option is always wrong* is still a strategy that is not reading.

A fix that drives a metric to zero deserves the same suspicion as one that leaves it high. Both extremes are signals.

## 22. The picture is part of the arithmetic, so check it like arithmetic

A bar's segment count, its shaded count and a scene's cell counts are *claims about the maths*. Nothing was checking them.

> **Evidence (C8).** A bar deliberately drawn in 3 parts, on a set whose stretch divides the hour into 4, **validated completely clean**. Rule 6f reconciles the *scene* against the segments and never asks whether the segments themselves are right — so the picture and the numbers could disagree in silence. This is the quilt-in-twentieths-described-in-sixtieths defect arriving through a door number sets opened.

`numberChecks` can now name `seg1` and `mark1` (and `seg2`…), the bar as **materialised**. Declare them. A picture that cannot be stated as an equation is a picture nothing is checking.

## 23. A wrong answer nobody would type is not a misconception

Diagnostic feedback only exists if the value can be reached by a student's hand.

> **Evidence (C8).** Converting `pw-band-brass` to number sets, two of its three step-one misconceptions divided by 9 — which needs the headcount divisible by 9 *and* 2, true only of the original 18. Every other set would have shipped `1.333…` as a "common error", and the diagnosis could never once have fired. They were **replaced, not retokenised**. `rr-market-stall` was constrained the same way: the inverted-rate response is bags-per-dollar, so both reciprocals must terminate — 4 bags for 14 dollars gives 0.2857142857.

Two related rules, both cheap and both now in `SWEEP.report()`: no two misconceptions in a step may parse to the same number (`matchMisconception` returns the first hit, so a collision diagnoses a mistake the student did not make), and none may equal the step's answer.

And the constraint that is not arithmetic at all: **a set must keep the story true.** Water stays the bigger share; hydration stays in a range a real loaf occupies; the cheaper stall still charges more in total. `numberChecks` cannot express any of it. Verify it separately and record that you did.

## 24. The first content of a new shape is a test of the engine

Existing code is only known to work on the content it has seen. Adding content of a genuinely new shape does not just add content — it runs the first real test of every assumption the engine made when everything looked alike.

> **Evidence (C9).** Opening the Change Line found four defects, and **all four were in code that predated it**:
> - `phPlan` decided whether a Plan-phase picture existed by testing for `signalBox.barModel.bars[0]`. That was true of every problem then written, ratio problems included, because they all kept a bar beside their table. The first problem with a model and no bar would have rendered an **empty Plan phase with no error anywhere.**
> - `Scene.html` routed every animated scene to the one scene library that existed and returned `''` for anything it did not have — a silent empty frame.
> - The validator's scene checks sat behind `if (p.scene && seg)`, so a problem with no bar model got **no scene checks at all**, including whether its artwork existed.
> - The route chooser offered Local/Express/Limited as a hardcoded 5/4/3. A three-problem line fills two stations, so "Local — 5 stops" delivered two, and the shortfall was reported only in a trip note no student ever sees.

Each was invisible for as long as every problem had the same shape. Before shipping the first item of a new kind, go and read what the engine assumes — and ask what it is testing for when it means "does this exist".

The last one is also §18 wearing a different hat: the metric said the trip built successfully, and the student got less than half the stops they chose.

## 25. When a check reports something surprising, the instrument is the first suspect — and today it was, eight times

Rule 2 says this. 2026-08-02 is the day it stopped being advice and became the dominant failure mode: **more findings were wrong than right.**

> **Evidence, one day.**
> - A render sweep appended the station `display:none`. `innerText` on a `display:none` subtree degrades to `textContent`, so hidden nodes reported as visible — **nine false leaks at once.**
> - The same sweep forced the `route` phase on the 15 problems that never visit it. Fifteen errors, all fictional.
> - A collision check did `parseFloat(x.value)` against `numberSets.numbers`, which holds **plain strings**. Every `n1` and `n3` silently became `NaN` and dropped out. It then declared a demo number "clean" that collided with a distractor.
> - A correct-option-position measurement used a made-up shuffle salt. The real ones are `id+'|read3'`, `|car`, `|changemove|`. It was measuring noise.
> - A polling loop used `requestAnimationFrame` in a hidden browser pane, which never fires. Thirty-second timeout.
> - A station driven by hand was given `{}` as its metrics object. The click handlers do `self.m.misconceptions.push(...)`, so they threw **inside the listener** and aborted before writing feedback. The symptom was an empty feedback panel — indistinguishable from a missing misconception.
> - A bracket check read `innerText`, which excludes `::before`/`::after` content. The brackets were there.
> - Two selectors were scoped to the whole screen rather than the component, so they counted the worked example's cells and the scene illustration's SVG as failures.

The pattern underneath all eight: **the check and the thing being checked were not the same object.** Hidden vs rendered, manifest vs screen, a string vs `{value:}`, the whole page vs one component.

Before believing any result, say out loud what the instrument is actually looking at.

## 26. A narrow fix to a leak class invites the same leak back in a new field

The answer-leak class landed three times in one day, in three disguises, and **each fix was too narrow to catch the next one.**

> **Evidence.**
> 1. A Test Track demonstrated on 12 blocks split into 4, taking 3, announcing **9** — on a problem whose set 1 is a 12-cup pot answering 9. Fix: check the demo's numbers against every value in every set.
> 2. That rule did not cover the cross-multiplying worked example, which used "2 to 3 is the same as 8 to **12**" on a problem answering 12, and remarked that adding gives "**15** and 13" on a problem answering 15. Fix: scan `worked.label`, `.equation`, `.sayCut`, `.sayTake` and the row values.
> 3. **That** rule missed both of those same leaks, because they also lived in `a11yDescription`, which narrates the worked example in prose. Only the rendered sweep caught it.

A rule that inspects a **list of fields** goes stale the moment a field is added — and a field is always added. The rule now **walks the whole object** and compares every number it finds against every answer.

Corollary, learned the same day: the leak scan's own regex used `(?![\d.])` to avoid matching `2` inside `2.5`, and that also stopped it matching a value at the **end of a sentence**. Any leak phrased *"…and that is 9."* was invisible for the whole session. Reject a period only when a digit follows it.

## 27. Two designs were rejected by the user today, and both rejections were correct

Rule 11 says the user's judgement has repeatedly been better than ours. Two more.

> **Evidence.**
> - The Test Track's first design ran a **parallel mini-example** — forty blocks beside a pot of soup. The user: *"this current second animation just makes it confusing, with students trying to understand a second whole."* Correct on two counts: it added a second whole to hold in mind, and its first option (*"Split the 40 into 4 equal parts"*) **announced the sectioning the student was supposed to derive from the fraction**. The percent-to-whole link — the actual lesson — was never taught.
> - The Ratio demonstration's first design animated two bars scaling together and stated the law *"whatever you do to one row, you do to the other."* The user: *"the grouping is too confusing and just repeats the first lesson."* It did: that is almost verbatim the Ratio Table's own law, one screen earlier.

Both were caught by looking at the screen and asking *what is this teaching that the last screen did not?* — a question no check on this project can answer, and the reason classroom testing remains the missing check (rule 12).

## 28. A leak scan that only knows about *answers* cannot see a leak of a *given*

The pre-solve leak scan has always asked one question: *does a value that equals an answer appear before the Engine Room?* That is the wrong question on the numberless read, where **no quantity at all** is allowed on screen — and so a picture printed its fractions beside masked prose for as long as that problem existed, with nothing looking.

> **Evidence (2026-08-03).** `pw-quilt-colors` masks its prose on the first read and always has. Its **scene legend** read *"blue 2/5 · red 1/4"* right next to it, and the grid's `aria-label` said *"8 of 20 blue; 5 of 20 red"* — so the student least able to cross-check got the numbers read aloud to them. Every file was correct alone: `scene.js` drew what it was handed, `stations.js` masked what it rendered, the manifest was right. The defect existed only in the composition (§13). It surfaced because a new phase was added beside it and the screens were swept for digits **for a reason unrelated to answers**.

`Scene.html` now takes `masked`. `SWEEP` now has a check that has nothing to do with answers: **any digit on `read1` or `platform` is a defect.** Confirmed by reverting the masking, which brings the leak straight back on both screens.

The general form, and it will apply to the next rule as much as this one: **a check encodes the question its author was asking that day.** When a rule holds absolutely — *no quantity on this screen* — assert the absolute rule, not the interesting special case of it.

## 29. Never let a shell script do a bulk edit this project's own tools can do safely

On 2026-08-04 a PowerShell "fix-up" script **silently corrupted seven content files**, replacing a single character throughout each one: `w`→`h` in `rr-timetable-run.js` (*"Chosen for the Shitchyard… the hhole lesson"*), `o`→`r` in three more, `a`→`n`, `p`→`r`, `Y`→`o`. Between 17 and 1143 characters per file.

> **The cause.** The script held its replacements in a hashtable of nested arrays. PowerShell **flattens a single-element array**, so for any file with one replacement `$pair` was not a pair but a *string* — and `$pair[0]` was its first **character**. `$t.Replace('w','h')` is a valid overload, so it ran, on the whole file, without error. Files with two or more replacements were untouched, which is why the damage looked random.

**Three things made this recoverable, and only the third was luck.**

1. **Length is invariant under character substitution.** That let the repair assert `disk.Length === clean.Length` before writing a byte.
2. **The browser still held the pre-corruption objects in memory**, because the page had not been reloaded — good for every authored string, useless for comments.
3. **The HTTP cache still held the original file bodies**, comments and all. `fetch(url, {cache:'force-cache'})` returned them. All seven were restored **byte-identical**, verified by comparing disk against the cached copy after the repair.

Recovery cost roughly a quarter of the session and turned on a cache that could have been evicted by a single reload.

**The rules.**

- **Bulk content edits go through `Edit`, not a shell.** It matches an exact unique string, fails loudly when the string is absent, and cannot address a file by character offset. Every one of the seven repairs after recovery was an `Edit`, and every one either applied or errored.
- **A replace whose arguments are single characters is a bug**, not an edit. Assert the length of every search string before using it.
- ~~**This project has no version control.** There is no `git checkout` here. Treat every scripted write to `content/` as irreversible, because it is.~~
  **THIS IS NO LONGER TRUE, AS OF 2026-08-10.** The folder is a git repository with a full initial commit (105 files). `git checkout -- <file>` now exists and works. **Proven, not assumed:** the exact 2026-08-04 disaster was re-staged — a scripted `w`→`h` substitution across `ch-water-tank.js`, same shape, same 28,261 characters — and one `git checkout --` restored it byte-for-byte, verified by normalising line endings and confirming `git status` clean.
  **The rest of this rule stands unchanged and matters more, not less.** Recovery being cheap is not a licence to write carelessly: a scripted bulk edit can still corrupt seven files between two commits, and everything uncommitted is still unprotected. `Edit` over a shell remains the rule, single-character replacements are still a bug, and the discipline of reading one file back before writing the rest still costs a minute and saves a session. What has changed is only the worst case: it is now a command rather than a quarter of a session spent scraping a browser cache.
- **If a bulk write must happen, read one file back and eyeball it before writing the rest.** The corruption was visible in the first line of the first file.

## 30. A permitted use of a forbidden pattern must be marked in the data, not judged by the reader

This rule is written **before** its failure rather than after one, which makes it the weakest rule in the document. It is here because the failure it anticipates has a known shape: rule 14, fix the class not the instance, arriving from the other direction — a **narrowly scoped exception** widening until it swallows the rule.

**The change (user decision, 2026-08-03).** `PEDAGOGY.md` §2.2 now teaches words in three tiers. Tier 1 *names* an operation (sum, product, quotient, per) and is taught as vocabulary. Tier 2 *names the situation and hands the reader a question* (more than, left, each, of) and is taught as a question that never resolves to an operation. Tier 3 is the keyword strategy, taught only as a hazard. Non-negotiable 4 was rewritten from "no keyword strategies" to **"no word is ever taught as sufficient to choose an operation."**

The site's guard against tier 3 has always been a **grep** — `"more" means`, `look for the word`, `key word`. New hub copy must quote those phrases in order to refute them, so the grep will fire on legitimate content. **The temptation is to soften or drop the grep. That is how this rule dies.**

**Three checks, all mechanical, none relying on anyone's judgement about intent:**

1. **The exemption is a data tag, not a reading.** Hub sections carry `tier: "names" | "asks" | "lies"`. The grep exempts `tier: "lies"` sections and **nothing else**. An untagged hit is a defect even when the prose around it looks well-intentioned — the whole point is that the author is the worst judge of their own intent here (rule 16).
2. **A tier-2 entry with fewer than two examples is a defect.** Each must carry **≥2 worked examples in which the same word takes different operations**. One example is not an illustration of a question — it is a keyword strategy with extra words. This is assertable: count examples per entry, and assert the operations differ.
3. **No operation name adjacent to a tier-2 word in student-facing copy.** Greppable: `add|subtract|multiply|divide|plus|minus|times` within a short window of a tier-2 term, scoped to rendered student strings. Spec prose is exempt; student copy is not.

**And the check that has to be run on a screen, not a manifest** (rule 13): render the hub and ask the rule-13 question — *what does the student's screen contain at this moment?* A tier-2 entry whose two examples are far enough apart on the page that only the first is visible has, on that screen, taught the thing rule 2 above exists to prevent. Verify by rendering, not by counting fields.

**The failure mode to watch for, stated in advance so it can be recognised:** every one of these checks will at some point report a hit on copy whose author is certain it is fine. That report is the system working. The remedy is to tag the section or fix the copy — never to widen the exemption.

## 31. Deletion is the cheapest fix to write and the most expensive to live with

Removing the thing that leaks makes the check go green, so it is the fix that gets written. It is almost never the fix that should ship, and this project now has five instances of the same arc: *find a leak → delete the thing → the screen stops teaching → the user reports it → restore.*

> **Evidence.** Cycle 7 blanked `segmentValue` and left the Model Yard with no numbers in any box; the user reported it three times before it was reversed. Then, in one session on 2026-08-04, **three more, all mine**:
> - Scene grids lit nothing while masked. *"They are blank with no colour… the soup is empty with no colour."*
> - The Model Yard hid derived values, leaving empty boxes. Flagged as reading *"thin"*.
> - The Platform Check's answer set was narrowed to the structural sentence, so students who tapped a sentence holding a number they needed were told *"Not quite."*
>
> Every one of those was written **after** reading the rule that forbids it, and in two cases after quoting it in the same file.

**Why it keeps happening, which is the part worth internalising.** The only thing an agent can measure here is *absence* — "the scan reports zero" is immediate and self-verifiable. Whether the screen still teaches is not measurable from inside; it needs eyes. **A feedback loop that can only see absence will keep producing absence.**

**The control is not the rule, it is a required sentence.** After removing anything from a student-facing surface, state — in the report, in words — **what is left on that screen and whether it is still worth looking at.** Writing that sentence is what makes the emptiness visible while it can still be cheaply undone. In all four recent cases it would have been obviously wrong on sight.

And the specific remedy the project keeps rediscovering: **withhold what the surface SAYS, not what it SHOWS.** The scenes keep their pictures and lose their counts. The Model Yard keeps a number in every box and loses the derived one. The map keeps every row and marks one.

## 32. When a rule is applied to a subset, enumerate the complement

A rule applied where it is *convenient* rather than where it is *true* produces an inconsistency nobody is looking for, because the surfaces that escaped it were never examined.

> **Evidence (2026-08-04).** Number-masking was applied to the scenes that are countable grids — the Part–Whole line — and not to the `anim` illustrations that the Ratio and Change lines use, because those are not countable and were harder. The first read then showed a full illustration on two lines and a blank frame on the third. The defect was not in either branch; it was in the gap between them, and it was found by the user, on screen.

Before shipping a rule that touches some content and not the rest: **list the items it does not touch, and say for each why it is exempt.** If the answer is "it was harder", the rule is not finished.

## 33. If a fact can be derived from data already present, derive it — do not author a copy

An authored duplicate of a derivable fact is drift with a delay on it. Worse, it turns a mechanical question into a judgement call, and judgement calls are where the arguing happens.

> **Evidence (2026-08-04).** `platformCheck.sentences` — which sentences a student must tap — was authored by hand. It was set **too narrow** on nine problems, widened, then found **too wide** on five, both times by the user, both times because a defensible reading was marked wrong. It is now *derived*: exactly the sentences carrying a quantity the problem uses, with the validator asserting the authored set equals the derived one. The disagreement ended permanently, and two earlier decisions — when the question sentence qualifies, when a distractor sentence never does — fell out of the derivation for free.

Author the value if you like, for a reviewer's benefit. But **assert it against the derivation**, so the two cannot part company.

## 34. "It works locally" says nothing about the copy anyone else is looking at

Every check on this project runs against the working folder. The moment there is a second copy of the site — a host, a deployment, a shared drive — every one of them is answering a question about the wrong object, and answering it confidently.

> **Evidence (2026-08-10).** Before the first upload to GitHub Pages, all **67** referenced paths were verified twice: case-exact against the on-disk filenames, and again over HTTP with every one returning 200. Both passes were sound. The site then went live **completely broken** — unstyled, stuck on the loading screen, nothing interactive — because `assets/` and `content/` had never been committed. The ten images had been uploaded to the repository ROOT instead of `assets/art/`.
>
> Nothing about the checks was wrong. They verified that *the local folder is internally consistent*, which was true and useless. The question that mattered — *does the destination have these files* — had never been asked, and could not be answered by any instrument pointed at this machine.

The generalisation, and it is rule 25 arriving from a new direction: **the check and the subject were not the same object.** Local disk is not the deployment. A path resolving here is not a path resolving there.

**So: after any publish, verify against the published URL.** Load it, read the console, and assert the same things the local sweep asserts — stylesheet applied, `MF` defined, the expected problem count, zero validate errors, images 200. Two minutes, and it is the only check that examines what a student will actually open.

## 35. An instrument can destroy the subject, and the wreckage looks like the defect you were hunting

Rule 2 says a surprising result indicts the instrument. This is the harder version: the instrument was not merely wrong, it *caused* the failure it then reported — and the report was indistinguishable from the disaster the check existed to prevent.

> **Evidence (2026-08-10).** Verifying artwork paths before deployment, a link check sent `HEAD` requests to `tools/serve.ps1`. That server set `Content-Length` and then wrote a body regardless, which throws — and the write sat outside any try/catch, so the exception unwound the accept loop and **took the whole server down on the first request**. Every subsequent asset reported FAILED.
>
> Ten art files reporting FAILED is exactly what a case-sensitivity catastrophe looks like on Pages, which was the specific thing being checked for. The files were perfect. The checker had killed the server and then blamed the files.
>
> Compounding it, twice in the same hour: a PowerShell link checker reported **all 67 paths broken** on a run where every one was fine, because `+` binds before `-join` and every URL it built was malformed.

**Two habits, both cheap.** Before trusting a sweep, probe ONE known-good subject and print what the instrument actually built — the URL, the selector, the path. And when a check reports catastrophic, uniform failure, suspect that the check broke the subject before concluding the subject was broken: real defects are usually patchy, and *everything failed at once* is far more often a dead harness.

`serve.ps1` now answers HEAD with headers only, and one bad request can no longer end the session.
