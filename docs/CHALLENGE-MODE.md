# Challenge Mode — the plan

### Written 2026-08-15. This is the document `ROADMAP.md` §6 asks for before anyone builds. Nothing here is built yet.

> **Read `PEDAGOGY.md` §2.2 and §3.7 before this file.** Challenge Mode does not introduce a sixth situation. It introduces the case the site has been promising since the home page — *"Harder problems join two lines together. They are still built out of these five."* This is where that sentence has to become true.

---

## 0. Decided, and not to be reopened without new information

| | |
|---|---|
| **No scoring, no gating** | User, 2026-08-08. Five problems always available. Nothing locked, nothing lost on reload. |
| **Open island — any stop, any order** | User, 2026-08-15. There is no route menu here and no fixed sequence. The map is the route screen. |
| **Estimate and hint ladder survive everywhere** | User, 2026-08-15. Including the unaided stops. See §5 for why this is not negotiable. |
| **Plan draws two models with a transfer slot between them** | User, 2026-08-15. §6.1. |
| **A new reading protocol, using the SAME checklist** | User, 2026-08-15: *"a new type of reading strategy… use the checklist correctly to identify two different strategies. We may need more than three Guided Reads. But it needs to be different and use the same checklist."* This is §3, and it is the heart of the build. |

---

## 1. The one new idea

Every problem on this site is one situation. A Challenge problem is **two situations, one after the other**, and the second cannot start until the first has finished — because the first produces a number the second needs.

That number is the whole thing. It gets a name:

> **The transfer** — the one value the first situation hands to the second. It is an *answer* on one side of the problem and a *given* on the other.

Two consequences, and they are the design:

1. **The new skill is not arithmetic.** A student who can do all five situations already has every operation this mode needs. What they cannot yet do is *see that a problem contains two of them*, and find the seam. That is a **reading** skill, which is why the user's amendment is the right instinct and why §3 is the largest section here.
2. **The classic error is stopping at the transfer.** The student computes the first half correctly, finds a number, and answers with it. It is not a careless error — it is the right answer to the wrong question, and it will be the primary distractor on all seven problems (§5.3).

**Naming, and one name that is banned.** The crossing point is **the crossover** and the value is **the transfer**. It is *not* "the Junction" — `signalBox.secondRoute` / The Junction was deleted on the user's decision and `HANDOFF.md` §3 says do not reintroduce it. Different mechanism, and reusing the name will make the old one look alive.

---

## 2. Crossover Island — the visual

The Challenge Line card already sits inert in *Special lines* on the map. Pressing it does not start a trip: it **crosses to a different map**.

```
          ~ ~ ~ ~ ~   the crossing   ~ ~ ~ ~ ~
                                                    ╭──────────╮
   [ mainland map ]  ══════ ferry ══════▶            │ ⬤ LAMP   │  terminus hub
                                                     ╰────┬─────╯
                              ╭──────────────────────────┴──────────╮
                              │                                      │
                   ╭──────────┴────────╮                  ╭──────────┴────────╮
                   │  STAFFED PLATFORMS │                  │  UNSTAFFED HALTS  │
                   │  1 ▮▮  2 ▮▮  3 ▮▮  │                  │   4 ▯    5 ▯      │
                   │  lit · conductor   │                  │  sign only · no   │
                   │  on the platform   │                  │  one on the       │
                   ╰────────────────────╯                  │  platform         │
                                                           ╰───────────────────╯
```

**The three teaching stops are staffed platforms; the two unaided stops are unstaffed halts.** That is a real British rail term for a small station with no staff — you work it yourself — and it does the job that the words *"assessment"* or *"on your own"* would do badly. An unstaffed halt is not a harder or a remedial place. It is the stop you are trusted with.

**Mr Fraction is on the platform at 1–3 and waves from the train at 4–5.** One asset, two placements, and it tells the student what kind of stop this is before they read a word.

**Two rails, braided, in two colours.** The Challenge route cannot take a single line colour, because it is not a line — same as the Percent Line. So each stop's marker carries **the two `--line-*` colours of that problem's pair**, and the track between stops is drawn as two rails in those colours converging at the crossover. The map therefore *states the pedagogy*: these are two-line problems, and after the ride you can see which pairs you rode.

**No new palette.** All six line colours exist and the palette decision in `ROADMAP` §5b is still open — nothing here may pre-empt it.

**Because the island is open, the map has to carry the difference.** A student may meet an unstaffed halt first. That is allowed and must not be gated, so the halt does the work instead: it opens with the checklist offered, not hidden, and a plain line saying the staffed platforms teach the move if they want it first. **A signpost, never a gate, and never worded as a demotion.**

---

## 3. The Crossover Read — the new reading protocol

> This is the section to get right. Everything else is engineering.

The Three Reads answer *what is this story, what is being asked, what shall I do*. They assume one situation. Run them on a two-line problem and they produce one verdict where two are true, which is exactly the failure the Platform Check's **stacked** option currently describes and does not teach.

**The new protocol runs the same five-situations checklist twice — once on each half.** That is the pedagogical payoff and it is worth stating in the copy the student reads:

> **The checklist does not classify a *problem*. It classifies a *stretch of the story*.** You have been running it on whole problems because, so far, whole problems were one situation. It works on halves too.

That reframing is transferable well past this site, and it is the honest answer to a student who says *"but I ran the checklist and got two answers."*

### The five passes

| | Pass | What the student does | Numberless? |
|---|---|---|---|
| **1** | **Read the story** | As read1 today: what is happening, who and what, no numbers anywhere. | **Yes** |
| **2** | **Read for the crossover** | **NEW.** Not *what kind is this* — **where does it stop being one kind?** Tap the sentence where the story changes what it is doing. | **Yes** |
| **3** | **Run the checklist on the first half** | The same five questions, on the text before the crossover only. Verdict: one of the five. | **Yes** |
| **4** | **Run the checklist on the second half** | The same five questions, same wording, on the text after. Verdict: one of the five, and it must be a different one. | **Yes** |
| **5** | **Read for the transfer** | **NEW.** *What one number does the first half hand the second?* Name it — do not compute it. | No |

Five passes rather than three, as the user anticipated. Passes 3 and 4 are the *same screen twice*, not two new screens — the checklist is one component rendered against a different half, which is what makes the point land visually: **the same five questions, side by side, giving different answers.**

**Passes 1–4 are numberless.** Finding the seam is a reading move; a student who is looking at numbers will find the seam by arithmetic and learn nothing. Pass 5 is the first screen with digits on it.

**Pass 5 names the transfer and does not compute it.** Same rule the Plan phase already lives by — the ratio table stops at the scale factor, the compare model stops at the gap. Naming a quantity you cannot yet compute is the move this whole site is built on.

### What this fixes that is already broken

`stations.js` `CHECK.fit` currently offers **stacked** with `lines: []` — true of no line — and its `no:` reply says *"plenty of problems do stack different kinds of situation… this story stays inside a single kind."* **The site tells the student that stacked problems exist and never shows them one.** Passes 2–4 are where that promise is paid. On a Challenge problem `stacked` becomes the correct answer and `onekind` becomes the distractor, which **inverts an existing answer key** — see §6.2, because that is an engine change and not a content one.

### Compression, if five screens is too many on a phone

Passes 3 and 4 could share one screen as two columns. Recommended only after it is measured on a 390px viewport — two checklists stacked vertically on a phone is a long screen, and the side-by-side comparison is the entire point. **Build five, measure, then decide.** Do not pre-optimise the thing being taught.

---

## 4. The five stops, and what fades

Open island, so these are not a sequence — they are five stops whose support differs, and the map says which is which.

| Stop | Kind | What is given | What the student does |
|---|---|---|---|
| **1** | Staffed | **Both lines named**, in order | Find the crossover and the transfer only. Learns what a two-line problem *is*. |
| **2** | Staffed | **First line named** | Names the second, finds the crossover and the transfer. |
| **3** | Staffed | **Nothing named** | Full Crossover Read with `stacked` live. Names both lines, their order, and the transfer. |
| **4** | Unstaffed halt | Checklist available | The whole thing. Estimate and hint ladder stay. |
| **5** | Unstaffed halt | Checklist available | The whole thing, different pair. |

**One thing fades per stop.** Three stops, three removals — the same discipline as the existing `fadeLevel`, which every problem on the site already carries.

### What an unstaffed halt actually drops — SETTLED 2026-08-16

An earlier draft of this section said a halt drops *"the guided Three Reads, the Plan model and the Test Track"*. **It drops two of those three, and the Three Reads stay** — the user's ruling, taken after `cl-lost-umbrellas` was built and the choice could be looked at rather than imagined.

| | |
|---|---|
| **Gone** | The Crossover Read — nobody walks the student to the seam. `phRead1` forks three ways and sends a paired problem at `fadeLevel: "independent"` straight to the second read. |
| **Gone** | The Plan picture — no crossover slot, no two-model diagram, no first-half model. The Plan phase fades to the estimate alone. |
| **Gone** | The Test Track, which no island problem has anyway. |
| **Stays** | **The Three Reads.** `read1` is the checklist and is the aid a halt keeps by definition. `read2` and `read3` are guidance and were the arguable ones — they stay because `read3` is where the student identifies the question, and this island's whole trap is answering the wrong one. Cutting it would remove the last thing standing between a student and handing in the transfer. |
| **Stays** | The estimate and the hint ladder, for the reason below, which is not a preference. |

**The engine enforces the two removals as a matched pair.** Dropping the crossover block is what fades the Plan phase — but a first-half model left behind would be claimed by `CompareModel` or the Model Yard, drawing half the problem and reporting success. `data.js` therefore refuses a paired problem at `independent` that carries *either* a crossover block or any first-half model, and refuses one at any other fade level that lacks a crossover block.

**The floor never fades, and this is not a style preference.** `HANDOFF.md` §H-2 records that Look Back on a wrong answer is only safe because **every step's hint ladder ends by stating that step's answer** — re-measured at 30 problems, 164 steps. Strip the ladder at the unstaffed halts and that guarantee breaks for the whole site, not just this island. The estimate stays for the same reason: it is what Look Back compares against, and it is the only thing that catches an answer of the wrong *size* — which on a two-line problem is the exact shape of the stopping-at-the-transfer error.

**The checklist at an unstaffed halt is the existing five-situations hub content, rendered as a pull-out.** Not a second copy. A second copy is how two documents drift, and this project has a file of examples.

---

## 5. The seven problems

### 5.1 The rule that decides whether a problem belongs here

> **If the problem can be solved without doing the first situation, it is a one-line problem with extra words.**

This is the authoring trap, and it is the same class as *"you will write the correct option first"* — it will happen, it will validate clean, and only re-solving the problem from the text will catch it. Two tests, both mechanical:

1. **Is the transfer stated anywhere?** If the text gives both the transfer and the second half's other givens, the first half is decoration.
2. **Do the two halves differ in kind?** A→A is not a Challenge problem however many steps it takes. `CHECK.fit`'s own copy makes this distinction — *steps and situations are not the same thing* — and content that blurs it makes that reply a lie.

### 5.2 Seven pairs — five ridden, seven built

Seven so a second visit to the island differs, the same reason every problem carries four number sets. Working ids, railway contexts, no collisions with the existing 30.

| id | Pair | The transfer |
|---|---|---|
| `cl-signal-delay` | **Compare → Rate** *(the user's example)* | Minutes of gap per stop — the difference IS the rate |
| `cl-season-tickets` | **Compare → Part–Whole** | The smaller station's sales |
| `cl-platform-planters` | **Part–Whole → Equal Groups** | The planters left over after the named parts |
| `cl-lost-umbrellas` | **Change → Compare** | The result at the end of the day |
| `cl-buffet-crates` | **Ratio → Part–Whole** | Total bottles delivered |
| `cl-track-sleepers` | **Equal Groups → Change** | Sleepers on the whole section |
| `cl-carriage-clean` | **Rate → Change (percent)** | Carriages cleaned in a shift |

**Coverage:** compare ×2, ratio/rate ×3, part–whole ×3, equal groups ×2, change ×3, percent ×1. Every situation appears at least twice, on both sides of a crossover, so no schema is only ever the first half.

### ▶ FIVE BUILT, AND THE ISLAND HAS FIVE STOPS — an open question, 2026-08-16

| Stop | Problem | Pair |
|---|---|---|
| Thorne Bridge · staffed | `cl-signal-delay` | Compare → Rate |
| Kelder Sands · staffed | `cl-season-tickets` | Compare → Part–Whole |
| Fell Crossing · staffed | `cl-platform-planters` | Part–Whole → Equal Groups |
| Cold Halt · **unstaffed** | `cl-lost-umbrellas` | Change → Compare |
| Marsh Halt · **unstaffed** | `cl-buffet-crates` | Ratio → Part–Whole |

**The circuit is complete and problems 6 and 7 have nowhere to sit.** This section says *"seven so a second visit to the island differs"*, which assumed a pool per stop — but `Selector.buildIslandStop` names its problem, and each stop on the map declares exactly one id. So as built, the island is five stops and five problems, and a second visit differs only by number set (four each, the site-wide mechanism).

Coverage as built: compare 3, part–whole 3, ratio 2, change 1, equal groups 1. **Change and Equal Groups appear once each, and only on one side of a crossover** — which is the property §5.2 was written to guarantee and no longer holds at five.

### ▶ DECIDED BY THE USER 2026-08-16: **option 2 — build 6 and 7, and pool two stops.**

The island stays five stops with the fade ladder as approved. Two of those stops draw from a pool of two problems, so a second visit differs by problem and not only by number set — which is what "seven built, five ridden" meant in the first place.

**This is the next session's work. It was not started, on the user's instruction, with the 5-hour budget at 91% — a two-manifest build left half-finished is worse than one not begun.**

#### The brief, so nothing has to be re-derived

**Which two problems.** From §5.2, the two unbuilt pairs are `cl-track-sleepers` (Equal Groups → Change) and `cl-carriage-clean` (Rate → Change, percent). Between them they carry **change ×2 and equal groups ×1**, which is exactly the coverage hole: as built, change and equal groups each appear once and on one side of a crossover only.

**Which stops pool.** Match the pool to the marker, because the map draws a stop's two colours from its `pair` and a pooled stop must not lie about what is waiting:
- `cl-track-sleepers` is Equal Groups → Change. **Fell Crossing** is drawn `['partwhole','groups']` and holds `cl-platform-planters` (Part–Whole → Equal Groups). Groups is common to both; the marker would need to become the honest one for a pool, or the stop's marker drops to neutral ink when it pools. **Decide this before authoring** — it is the same "the map must not claim what is not there" rule that corrected Marsh Halt.
- `cl-carriage-clean` is Rate → Change. **Marsh Halt** is `['ratio','partwhole']` and holds `cl-buffet-crates` (Ratio → Part–Whole). Ratio is common.

**The engine change is small and it is in one place.** `Selector.buildIslandStop(id)` currently names its problem. It needs to take a stop and choose from that stop's pool at random, exactly as `buildTrip` picks a number set — same shape, same `{line, route, stations, hub, seed, notes}` return. `ISL_STOPS` entries gain `ids: [...]` in place of `id`, and everything reading `st.id` follows: the island map's open/closed test, `renderIsland`'s button list, `islandLeg`'s stop match (which already refuses an unknown id and must keep doing so), and the `data-stop` attribute, which should carry the STOP rather than the problem once a stop can hold two.

**Rules the new content must obey** — all of them learned the hard way and all of them enforced:
- an island answer may not be **1, 2 or 5** (`cl-platform-planters` header);
- no number words in `pair.crossoverWhy/firstWhy/secondWhy/readWhy` — watch for **"half"**, since *"the first half hands the second half a number"* is the natural sentence and is refused;
- no digits anywhere in `signalBox.crossover`;
- `platformCheck.sentences` is the sentences carrying quantities the solution needs, not the ones carrying the signal;
- a staffed stop must have a `crossover` block; an unstaffed one must have neither that nor any first-half model;
- the `fit` question is tailored, the other four are left abstract — `phRead1` names the second true answer itself.

**Both new problems are staffed-stop content** (`fadeLevel` other than `independent`), because the two unstaffed halts are built and the fade ladder is settled.

**`cl-signal-delay` first**, because the user named it and because it is the sharpest case: the compare produces a *difference*, and the difference is not the answer — it is a **rate**. A student who does not see the crossover reads the whole thing as one comparison and answers with the gap. That is the mode's thesis in one problem.

### 5.3 Misconceptions — the same three on all seven

| | Error | Why the feedback is delicate |
|---|---|---|
| **1** | **Stopping at the transfer** | They computed it correctly. The feedback must say so first — *"That is right, and it is the answer to the first half"* — or it teaches a student who did good work that they cannot do arithmetic. |
| **2** | **Transferring the wrong quantity** | Carrying a stated given across instead of the derived value. Diagnoses a student who found the seam but not what crosses it. |
| **3** | **Working the halves in the wrong order** | Attempting the second situation first. Impossible, and finding out *why* it is impossible is how the crossover becomes real. |

Distractor 1 is the correct answer to a real question, which makes it the strongest distractor on the site and the one most likely to trip the option-length and position tells. **Seeded shuffle, position measured across all seven before publishing** — `VERIFICATION.md` §21, and the project has hit that defect four times including on a brand-new choice surface.

---

## 6. Engine work, in build order

**Order matters: 6.5 comes before any problem is authored.** Authoring against a leak scan that has not been taught about transfers means authoring against an instrument that either screams on every problem or was silenced to stop it screaming.

### 6.1 `model.js` — two models and a transfer slot *(the largest piece)*

`model.js` dispatches **one** model per problem, through **three** dispatches — `html()`, `wire()` **and `applies()`**. A model missing from `applies()` renders no picture and raises nothing; that is how the Compare Plan phase shipped blank for a round.

The Plan phase becomes: model A → **the transfer slot** → model B, where B's picture is built on the value the slot holds. The slot is the new UI and it is the whole idea made interactive — the student places a number into the gap between two pictures.

Bar widths and table values in B are derived from the transfer, which is derived from the number set. **Nothing authored.** Authored geometry is right for set 1 and silently wrong for the other three — recorded three times on the compare model alone.

### 6.2 The `stacked` verdict — a data change, not a renderer branch

`CHECK.fit` keys each option by `lines: [...]`. A Challenge problem has two lines and belongs to neither as a route, so the key cannot express it today. The fix is a **predicate in the data** — the option declares it is true when the problem carries a pair — never `if (challenge)` in the renderer. A hand-kept exemption in a checker is the defect class this project already has seven files of.

`onekind` inverts from correct to distractor here, so its `no:` reply must be written before the first problem ships. Its current `no:` text was written on the assumption that stacked problems are always elsewhere.

### 6.3 The route key — and the seven-file trap

`MF.CHALLENGE = 'challenge'`, alongside `MIXED` and `PERCENT` in `data.js`.

**Before adding it, grep for `MF.MIXED` and `MF.PERCENT` by name and read every hit.** Every one is a list that will not know about the new key. Known today: `app.js` ×4, `selector.js` ×3, `stations.js` ×1, `sweep.js` ×3. That count is a starting point, not a checklist — the recorded failure is *seven files, three of them checkers*, and a checker that silently exempts the new thing prints `0 faults` in exactly the font it prints a real pass.

**`MF.LINES` must NOT gain a sixth entry.** `LINES` is the five schemas. Percent is deliberately outside it, and the comment in `data.js` says why: the Ticket Booth builds its line options from `MF.LINES`, so a sixth key would let the route appear as an answer to itself.

### 6.4 The island map — `scenery.js`

`Scenery.railMap()` draws the mainland. The island is a second map, not a mode of the first: different geography, five stops, two-colour markers, staffed/unstaffed platform states. Discovered from published Challenge problems, not listed.

### 6.5 `tools/sweep.js` — the leak scan must learn about transfers **(do this first)**

**The transfer is an answer and a given, and the leak scan does not have a concept for that.** On a Challenge problem the second half's prompt legitimately names a value the first half computed. Every one of those is a leak by the current rule.

The precedent exists and should be copied rather than reinvented: the `check-unsure` screen got the rule *on that screen only the last step's answer and the final answer count*, encoded **as a rule, not as a list of cleared hits**. The Challenge equivalent is *a value the student has already computed on this problem is not a leak* — which needs the sweep to know what has been asked so far, which it currently does not.

Also needs adding, and both are discovered-not-listed hazards:
- **The four new numberless screens** (passes 2–4 plus the existing read1). The digits scan reads a set of phase names; a phase absent from it is unscanned and prints the same zero.
- **Spelled-out numbers.** Still unchecked site-wide (`HANDOFF` §H-2) and worse here — *"twice as many"* on a numberless crossover screen hands over the first half's structure.

### 6.6 Schema and docs

`PROBLEM-SCHEMA.md` gains a `pair` block — `{ first, second, transfer, crossoverSentence }` — and the validator must **refuse a pair whose halves are the same kind** (§5.1 test 2) and **refuse a problem whose text states its own transfer** (test 1) if that can be expressed mechanically. If test 1 cannot be mechanised, say so in the schema rather than implying it is checked.

---

## 7. What will go wrong here specifically

1. **A pair that is really one line with extra sentences.** §5.1. Most likely on `cl-lost-umbrellas` and `cl-track-sleepers`, where the second half is small.
2. **The transfer reaching the student before pass 5.** Two halves means twice the surfaces, and the crossover screens are numberless. This is the leak class this project has hit most often, arriving on four new screens at once.
3. **`stacked` shipping as a renderer special-case** because the data change in 6.2 looks bigger than the `if`. It is bigger. It is also the difference between a rule and an exemption.
4. **The unstaffed halts reading as a test.** The moment any copy there implies assessment, the mode has a score in it, which the user removed on purpose.
5. **Five reads being three reads with two screens bolted on.** If passes 2–4 do not visibly run *the same checklist on two halves*, the new protocol is just more clicking.

---

## 8. Still open, and needing the user

1. ~~**Island name.**~~ **Settled** — the user approved *Crossover Island* 2026-08-16.
2. ~~**Does the terminus hub on the island differ from the four mainland hubs?**~~ **Built 2026-08-16 as The Lighthouse** — seven pages, on the user's instruction that it focus on the crossover and teach the checklist and the five situations in more depth than anywhere else. It is a fifth hub, not an island stop: hubs are never gated, so it is listed on the mainland map beside the other four *and* on the island's own map, reachable by somebody who has never ridden a stop. Read it here, decide it there — the same relation the Word Board has to Five Situations. One new diagram (`crossover` in `hub.js`), deliberately unlabelled as to which two situations it joins.
3. ~~**Whether passes 3 and 4 share a screen.**~~ **Settled by building it** — they do not share a screen and they do not need their own either. The Crossover Read is one phase with three stages: find the seam, then name each half, with the half in question spotlit and the other stepped back. That gives the side-by-side comparison the plan wanted without two checklists stacked on a 390px screen, and it replaces the Platform Check rather than adding to it, so the island is the same length as every other line.
4. ~~**Two true options on the non-`fit` questions.**~~ **Settled 2026-08-16, and it needed no new copy.** Measured on `cl-signal-delay`: `kinds` accepts both *same* and *different*, `things` accepts both *separate* and *paired*, each reply correct about one half. That was written up as five questions' worth of rewriting and it was the wrong frame — **a story that answers the checklist two ways IS a story made of two situations**, which is what the fifth question on that same screen goes on to ask. `phRead1` now names the other true answer and says why both hold. Derived from the option set, so a future pair whose halves collide on `shape` gets the same treatment with nothing authored.
5. **Whether the mainland Platform Check changes.** Once stacked problems exist, `onekind`'s reply on all 30 existing problems is describing something the student can now go and ride. That is an improvement, and it is 30 problems of copy.

---

## 9. Where to start

> ### ▶ DONE 2026-08-16: §6.5, §6.2, and `cl-signal-delay` itself.
> The leak rule, the `stacked` answer key and the first problem are built. **31 problems · 124 materialisations · 1236 screens · every count 0**, and the coverage line now reads *"CHALLENGE (paired) problems examined: 1 · screens 40 · of them second-half 4"*. The problem is `status: "draft"` — `Selector` pools published problems only, so it cannot be dealt into a Compare Line ride before the island exists.
>
> **Still unbuilt, and this is what "end to end" does NOT yet mean:** the Crossover Read (§3), the two-model Plan phase with the transfer slot (§6.1), the island map (§6.4), and a Test Track kind that demonstrates a crossover. What runs today is the content through the ordinary station, which proves the engine and the checkers hold.
>
> **Two checker defects fell out of writing the content**, both recorded in `REVIEW-LOG.md`: the numberless scan never looked at the shared `CHECK` table rendering beside the copy it did scan, and its word list was about to be duplicated. Both fixed; the scan immediately found two pre-existing violations in live copy.

**Not with a problem.** With §6.5 and §6.2 — the checker that will judge every problem, and the answer key that has to invert. Then one problem, `cl-signal-delay`, end to end through all five passes and both models, at 390px and 1280px, before the other six exist.

One problem that runs proves the engine. Seven that validate prove nothing.
