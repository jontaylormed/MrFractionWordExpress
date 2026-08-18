# Cycle 30 — the only rendered pixels of this build

**Captured 2026-08-17 by the `art-director` pass.** Kept because they are, as far as this project's record goes, **the only screenshots of the site that anyone has ever taken.**

## Why that is worth a folder

Cycle 30 ran five review passes. **Not one of the other four could see the site.** The in-app browser pane never composited a frame, so `student-tester` worked entirely from `getBoundingClientRect` and `elementFromPoint`, and `theme-reviewer` never got a browser at all and worked from CSS arithmetic. Every finding in that cycle — including two accessibility CRITICALs and a blocker — is geometry, computed style or logic.

`VERIFICATION.md` has said since Cycle 4 that **measurement proves geometry, never appearance**, and that every visual defect in this project's history was found by the user after geometric checks had passed. These images are the first time that gap was narrowed from the inside.

**How to take more:** [`tools/zz-drive.js`](../../tools/zz-drive.js). Its header carries the two Edge flags that cost an hour each if you get them wrong.

## What is in each one

| file | what it shows | the finding it is evidence for |
|---|---|---|
| `home.png` | the home page at 1280 | baseline — *"the mainland reads as a product"* |
| `island.png` | the Crossover Island map screen | the map itself is good and holds the mainland's language; **everything below it** is the bolt-on — no colour, the fade ladder carried on a ~6px dot, and the Lighthouse card drawn in the site's own *"not built yet"* dashed outline |
| `halt-plan.png` | an **unstaffed halt**, Plan phase | **~600px of empty cream, about 30% of the page.** The image behind *"reads as a page whose middle failed to render"* — and the counter-evidence to `student-tester`'s reading of the same screen as trust. It could not see it. |
| `halt-xo-plan.png` | the halt's crossover Plan | as above, with the crossover slot |
| `waiting.png` | the **"waiting" second model** | the judgement that a striped placeholder where a filled block belongs reads as a **skeleton loader** rather than a deliberate state. *Difference by one property reads as a state; difference by four reads as a bug.* |
| `pair-plan.png`, `pairmodel.png` | the two-model Plan phase | the two drawing systems side by side |
| `xo-plan.png`, `xo-cross.png` | the Crossover Read | the seam picker in context |
| `est.png` | the **estimate gate** | the `ESTIMATE-INPUT.md` §4a review — and the gate at rest, with its band and both thumbs `hidden` |
| `check.png` | the Arrivals Board | — |
| `m320.png` | an attempt at 320px | **see the retraction below** |
| `probe1280.png` | the `?probe=1` measurement overlay at 1280 | type scale, headings in document order, overflow, bubble clipping |
| `probe320.png` | the same overlay at "320" | **the retraction itself** |

## The retraction, kept on purpose

`art-director` filed a finding that the site fails at 320px — everything clipped mid-word — and then withdrew it. **Edge headless would not go below about 504 CSS px**, so `--window-size=320` produced a **320px crop of a 504px layout**. The probe overlay caught it: `viewport inner=504x1824`, and at that width `scrollWidth 489` against `innerWidth 504` — no overflow at all. The 43 "overflowing" elements were all `.ticker-item` inside a marquee.

`probe320.png` and `m320.png` are kept together because the pair is the lesson: **the camera was the defect, and the photograph of the defect looks identical to a photograph of a broken site.** That is `VERIFICATION.md` rule 2 and §35, in a form you can look at.

**320px has still never been successfully rendered by anyone on this project.**

## What these images do not settle

They are one viewport (1280 unless noted), one pass, one day. Whether any of it *looks* right is the user's call — `art-director` said so itself, and marked its own findings as measured or seen. Nothing here has been in front of a student.

Full pass, with the measured/seen split kept: [`art-director-report.md`](art-director-report.md). Cycle write-up: [`../REVIEW-LOG.md`](../REVIEW-LOG.md).

> **A note on weight.** This folder is ~3.4MB. The Pages workflow uploads `path: '.'`, so if this repo is ever pushed, these ship with it. They are here because the evidence was one session away from being lost, not because they need to be published — excluding `docs/cycle-30/` from a deploy costs nothing.
