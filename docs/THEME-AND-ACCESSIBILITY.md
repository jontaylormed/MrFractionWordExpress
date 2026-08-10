# Theme & Accessibility Specification
### Mr Fraction's Word Problem Express
**Owner:** Theme Agent · **Status:** Draft v1, pending Oversight sign-off · **Last updated:** 2026-07-28

---

## 0. The governing tension

This site has two goals that pull against each other:

1. **Be warm and charming enough** that a demoralized student is willing to engage with math at all.
2. **Be quiet and legible enough** that a student with dyslexia, ADHD, or visual stress can actually read it.

Decoration is not free. Every ornament costs a struggling reader attention. The theme's job is to create *place and character* — a station you arrive at, a conductor who is on your side — and then **get out of the way** the moment real reading starts.

**The governing rule, and the one the Theme Agent enforces above all others:**

> **Theme lives in the chrome. Content lives in the quiet.**
>
> Charm belongs in navigation, transitions, headers, Mr Fraction's asides, and progress indicators. The problem text, the bar model, and the answer entry areas are held to near-clinical clarity. No texture, no decorative type, no illustration behind text, ever.

Where the theme and accessibility conflict, **accessibility wins and the conflict gets logged**. That's not a formality — §9 records the ones that have already come up.

---

## 1. Mr Fraction — character bible

### 1.1 Who he is

A veteran train conductor who has been running this line for thirty years and has seen every kind of passenger. He is **competent, calm, and unbothered**. Nothing you do surprises him. He has watched a thousand people miss the same stop and he has never once made a passenger feel stupid about it.

**He is not:** peppy, bubbly, a cheerleader, an exclamation-mark machine, or a "learning buddy." A 16-year-old with math anxiety can smell condescension instantly, and forced enthusiasm reads as pity. Mr Fraction's warmth is the warmth of *professional competence*, which is exactly the register that scales from 11 to 18 years old.

**His defining belief:** getting lost is a normal part of travel, and the whole job of a conductor is knowing the route so you don't have to.

### 1.2 How he looks

Designed to be drawn entirely in **inline SVG** — no image assets, no external requests, scales cleanly, and can be recolored by CSS custom properties for theming and high-contrast modes.

| Feature | Design | Rationale |
|---|---|---|
| **Mustache** | A thick, perfectly horizontal bar — *a fraction bar* | The signature. Instantly readable at 24px as a favicon and at 400px as a hero. This one shape is the whole brand. |
| **Cap** | Classic conductor's cap, badge reads `x/y` | Authority + the fraction motif |
| **Build** | Stocky, rounded, no sharp angles | Approachable; rounded forms read as safe |
| **Uniform** | Deep rail-green coat, brass buttons | Period charm without fussy detail |
| **Eyes** | Simple, wide-set, slightly crinkled | Crinkle = warmth without a grin |
| **Expression** | Steady and attentive by default | Not smiling. A permanent smile becomes creepy and unresponsive. |

**Expression set** (four only — restraint keeps him a character rather than an emoji set):
- **Steady** — default, attentive
- **Thinking** — one eyebrow up, hand near mustache (used while a student works)
- **Pleased** — mustache tilts up slightly at one end (success; understated on purpose)
- **Curious** — head tilted (used on wrong answers — *never* sad, disappointed, or frowning)

> **Hard rule:** Mr Fraction never displays disappointment, sadness, or disapproval. A character showing sadness at your wrong answer teaches you that wrong answers hurt someone. The target student already believes this. On errors he is **curious**, because a wrong answer is genuinely interesting information about where the track diverged.

### 1.3 How he talks

Short sentences. Concrete nouns. Present tense. Rail metaphors used **sparingly and only when they clarify** — a metaphor that has to be decoded is a second reading task layered on the first.

| Situation | ✅ Write this | ❌ Not this |
|---|---|---|
| Wrong schema | "That's the Compare Line. Look again — is anything *changing* here, or are two things sitting side by side?" | "Oops! Not quite! Try again! 😊" |
| Right answer | "That's it. The referent tripped up the last four passengers I had." | "AMAZING JOB!!! You're a MATH SUPERSTAR! ⭐⭐⭐" |
| Stuck | "Let's back up one stop. What is the question actually asking for?" | "Don't give up! You've got this! Believe in yourself!" |
| Estimate way off | "Your estimate says 40, your answer says 400. One of them is lying. Which?" | "Hmm, that doesn't look right!" |

**Copy rules:**
- Max **two exclamation marks per page**, total.
- No emoji in instructional copy. (Schema icons are UI, not copy.)
- Never the words *easy*, *simple*, *just*, or *obviously*. If it were easy the student wouldn't be here, and calling it easy converts confusion into shame.
- Never a grade level. Difficulty is **Local / Express / Limited** (route length), never "6th grade."
- Second person, active voice. "You'll need the unit rate," not "the unit rate must be determined."

---

## 2. The place

A small-town **rail station, early evening, warm lamps on**. Not a bustling modern terminal — that's noisy and stressful. A calm platform where the next train is always coming.

**Spatial metaphor = progress.** The student physically moves along a line. Progress is a route map, never a percentage bar.

| Site concept | Theme name |
|---|---|
| Problem set | A **journey** |
| Single problem | A **trip** |
| Schema / problem type | A **line** |
| Lesson stage | A **stop / station** |
| Difficulty | **Local · Express · Limited** |
| Hint | A **signal** from the tower |
| Keyword trap | A **signal failure** |
| Transfer problem | A **transfer ticket** |
| End summary | The **trip report** |
| Authoring tool | The **Dispatch Office** |

---

## 3. Design tokens

### 3.1 Color

Cream, not white. Pure white on a backlit screen produces glare that measurably worsens reading for students with visual stress (Meares–Irlen sensitivity), which is over-represented among struggling readers. Likewise **no pure black text** — maximum contrast is not maximum readability.

```
/* Surfaces */
--surface-page:      #FBF6EC   /* warm cream — main background */
--surface-card:      #FFFDF7   /* slightly lifted */
--surface-sunken:    #F2EADC   /* wells, code, problem text panel */
--surface-rail:      #14343A   /* dark chrome: header, footer, platform */

/* Ink */
--ink-primary:       #1C2B30   /* near-black slate, never #000 */
--ink-secondary:     #4A5A60
--ink-on-rail:       #F4EFE3

/* Brand */
--brand-rail:        #0F5D52   /* deep rail green — primary actions */
--brand-brass:       #9A6410   /* brass accent — highlights, badges */

/* Status (never the sole signal — always paired with icon + text) */
--status-go:         #1B6E3C
--status-stop:       #A8291F
--status-caution:    #8A5A00
--status-info:       #15607F
```

**Train line colors.** Chosen for hue separation under deuteranopia and protanopia, and each is **always paired with a distinct shape and a text label**. Color alone never identifies a line.

| Line | Color | Shape marker |
|---|---|---|
| Change | `#00695C` | ● circle |
| Compare | `#1A5FA8` | ■ square |
| Equal Groups | `#A34A0B` | ▲ triangle |
| Ratio & Rate | `#6A3D9A` | ◆ diamond |
| Part–Whole | `#8A6100` | ⬢ hexagon |

All contrast ratios verified in §8.

### 3.2 Typography

**Three-option font switcher**, exposed in the accessibility panel. All are system-available or bundled — no external font requests (works offline, no tracking, no layout shift).

| Option | Stack | Notes |
|---|---|---|
| **Standard** (default) | `Verdana, Tahoma, "DejaVu Sans", sans-serif` | Verdana's wide letterforms and large x-height are consistently recommended for dyslexic readers and it ships nearly everywhere. |
| **Rounded** | `"Century Gothic", "URW Gothic", "Trebuchet MS", sans-serif` | Preferred by some readers; more open apertures. |
| **OpenDyslexic** | `"OpenDyslexic", "Comic Sans MS", sans-serif` | Offered on request — see the honesty note below. |

> **Honesty note on OpenDyslexic.** Controlled studies have **not** shown that OpenDyslexic improves reading speed or accuracy versus a good plain sans-serif. We offer it anyway, and we do not advertise it as a treatment. Many students report preferring it, and **student agency over their own reading environment has real motivational value** even where the typeface itself is doing nothing. It is listed as a preference, never as a remedy. If it is not installed locally we fall back rather than fetching a webfont.

**Metrics — these are requirements, not suggestions:**

```
--font-size-base:    19px      /* min 19px body; never below 16px anywhere */
--line-height-body:  1.6       /* ≥1.5 required */
--letter-spacing:    0.02em    /* slight positive tracking */
--word-spacing:      0.08em
--para-spacing:      1.4em     /* ≥2x line spacing between paragraphs */
--measure:           64ch      /* max line length; hard cap 70ch */
```

**Typographic rules:**
- **Left-aligned only. Never justified.** Justification creates "rivers" of white space that dyslexic readers get lost in.
- **Bold for emphasis. Never italics.** Italics reduce letterform distinctiveness.
- **No ALL CAPS** in any body or instructional text — caps destroy word-shape cues. (Permitted only in small UI labels ≤ 3 words.)

#### Read-aloud collects by walking the page, never by a tag list

Read-aloud used to query a fixed set — `[data-speak], h1, h2, h3, p, li, label, .mf-bubble` — which silently skipped every standalone `<button>`, `<span>` and `<figcaption>`. In practice a student using it never heard **the answer buttons, the eyebrow naming the station, the Model Yard readout, the Shunting Yard results, or the picture captions.**

The omission tracked whatever markup a thing happened to use, not anything about its content — which is why it looked arbitrary from outside (the gaps landed on white-on-fill button text and the red result markers).

It now walks the DOM in reading order, and:
- `[data-speak]` still wins where present, and stops the walk descending — that is what keeps a masked number as *"some number"* and `3/4` as *"three quarters"* rather than "three slash four".
- `aria-hidden="true"` and `.visually-hidden` are skipped, so decorative glyphs and duplicate screen-reader text are not spoken twice.
- Utterances break at block boundaries, so it does not run sentences together.

**New UI is now read by default rather than needing to be remembered and added to a list.** Verified across a full trip: 40 screens, 40 utterances, no visible text missed and no duplicates.

#### Multiple choice must not be answerable by position

Every problem was authored with the correct option written first, so a student could score full marks on Read 3 without reading a word. Options are now shuffled with a **seed derived from the problem id**: the order varies per problem but is stable across re-renders, so it never shifts under someone mid-question. The same shuffle applies to the Ticket Booth's missing-car options.

**Any new set of choices must be shuffled at render, not trusted to be well-ordered in the source.** Authors naturally write the right answer first.

#### Amended: the 200px motion ban does not cover the problem's own picture

**Original rule:** nothing animates within 200px of active problem text.

**Amended 2026-07-29, at the user's direction:** that ban applies to *decorative* motion, which competes with reading and helps nobody. It does **not** apply to an illustration of the quantities in the problem, which is content.

Every problem now shows a **Scene** beside its text — real bowls, coins, basketballs, parcels — one object per part, filled to match. The objects count themselves out on arrival (85ms stagger) and then settle; only the filled ones keep a slow idle, and only where it means something (steam off served soup, wheels turning on ridden bikes).

Guard rails that keep this from becoming decoration:
- **Counts are derived from `barModel`**, never authored twice, so the picture cannot drift out of step with the maths. Verified across 142 station renders: every scene drew exactly `marked` of `segments`.
- The `<figure>` carries a full `aria-label` and a visible caption, so the information is never only in the picture.
- `prefers-reduced-motion` removes the arrival stagger and every idle. The scene still reads correctly frozen.

The original concern was real and still holds for chrome: **ambient motion near problem text is banned.** What changed is that a picture of the problem is not ambient.

#### Selection state must not depend on an animation

A student reported that answering at the Reading Room "didn't select a box". It had registered — but `border-color` was on a CSS `transition`, the transition got stuck part-way, and the box kept its unselected grey edge. **The answer was recorded and looked ignored**, which for a struggling student reads as the site being broken.

Two rules follow:

- **Never transition a property that carries state.** `border-color` is no longer transitioned on `.choice`; only `transform` and `box-shadow` are, and those are purely decorative.
- **State must survive hover.** `.choice[disabled]:hover` was resetting the border to grey, so hovering an answered choice made it look un-answered. It is now scoped `:not([data-result])`.

Answered choices carry **three** redundant signals — a ✓/✗ glyph replacing the empty box, a 3px border, and a tinted background — so colour is never doing the work alone (1.4.1). Verified across all three choice lists: Reading Room, Ticket Booth, and the Learning Hub quiz.

#### Reserved words

One word, one meaning. These are load-bearing and must not be reused:

| Word | Means | Never means |
|---|---|---|
| **situation** | What is happening to the amounts in a problem — the thing the five lines classify. **This is the student-facing word for a schema.** | anything else |
| **schema** | Same concept, but **internal only** — specs, agent instructions, code identifiers. Never shown to a student. | — |
| **shape** | The marker glyph on a line: ● ■ ▲ ◆ ⬢. Also its ordinary geometric sense. | *never* a problem's structure |
| **line** | One of the five situations, as a route on the map | — |

> **Why this exists.** The build shipped with "shape" carrying three meanings at once: the geometric sense a maths student assumes first, the marker glyph required by 1.4.1, and a problem's structure. Telling a struggling student a word problem "has a shape" invites them to look for a triangle. Ambiguity is precisely the thing this audience cannot absorb.
- **No underlines except on links.**
- Short paragraphs (≤ 3 sentences). Lists and tables over prose wherever the content allows.
- Numbers in problem text are rendered in a **tabular-figure** treatment and never split across lines.

### 3.3 Space, shape, motion

```
--space-unit:      8px          /* everything is a multiple */
--radius-card:     12px
--target-min:      44px         /* minimum interactive target, all devices */
--focus-ring:      3px solid #15607F, 2px offset
```

**Motion.** The theme *wants* trains that move. Motion is also a genuine accessibility hazard — vestibular disorders, ADHD distraction, visual stress.

- All motion is **decorative only**. No information is ever conveyed by animation alone.
- Transitions ≤ 300ms.
- **Nothing animates within 200px of active problem text** while the student is reading or answering.
- Nothing loops indefinitely. No autoplay. No parallax.
- `prefers-reduced-motion: reduce` removes **all** transform/position animation, leaving instant state changes. The site must be fully usable and equally attractive with motion off — verified by the Student Agent as a first-class pass, not an afterthought.

---

## 4. Dyslexia-specific design provisions

Beyond typography, these are the features specified for dyslexic and reading-disabled students. Each is **opt-in via a persistent accessibility panel** (session-only — no localStorage per project constraints, so preferences reset on reload; the panel must therefore be **fast to re-set**, reachable in one keystroke, and never buried).

| Provision | What it does |
|---|---|
| **Reading ruler** | A horizontal band that follows the pointer or arrow keys, dimming everything outside a 3-line window. Directly addresses line-tracking loss. |
| **Tint overlay** | Cream / peach / blue / grey / green page tints. Colored overlays are the standard low-tech intervention for visual stress; individual preference varies enormously, so we offer a range rather than picking one. |
| **Bionic-style first-syllable bolding** | Off by default. Bolds the leading portion of longer words. Evidence is weak; offered as preference, labeled as such. |
| **Read aloud** | Uses the browser's built-in `SpeechSynthesis` — **no network, no API key, no cost, works offline.** Sentence-level highlighting synced to speech. Adjustable rate. This is the single most impactful provision for a dyslexic student and is **required, not optional**. |
| **Chunked problem view** | Splits the problem into one sentence per line with generous spacing. Reduces the wall-of-text barrier that stops students before math begins. |
| **Font & size switcher** | §3.2, plus 100 %/125 %/150 % text scaling independent of browser zoom. |
| **Line focus / dim** | Dims all page regions except the active station. |

**Interaction with pedagogy:** the number-masking feature (Pedagogy §1.4) must be compatible with read-aloud. Masked numbers are spoken as *"some number"* — preserving the pedagogical intent for a student who is listening rather than reading. This detail matters and is easy to get wrong.

---

## 5. WCAG 2.1 AA conformance requirements

Target: **WCAG 2.1 Level AA**, with selected AAA provisions where they serve this audience.

**Perceivable**
- 1.1.1 — All non-text content has text alternatives. Mr Fraction SVGs are `role="img"` with `<title>`; purely decorative rail graphics are `aria-hidden="true"`.
- 1.3.1 — Semantic HTML throughout. Stations are `<section>` with headings; the route map is a real `<ol>`. Bar models expose an accessible text description of the relationship they depict.
- 1.4.3 — Text contrast ≥ 4.5:1; large text ≥ 3:1. Verified §8.
- 1.4.1 — **No information conveyed by color alone.** Every line = color + shape + label. Every status = color + icon + text.
- 1.4.4 — Usable at 200 % zoom, no loss of function.
- 1.4.10 — Reflows to 320px with no horizontal scrolling.
- 1.4.12 — Must survive user-imposed text spacing overrides without clipping.
- **1.4.8 (AAA), adopted** — user-selectable fg/bg, ≤ 80 char measure, no justification, 1.5 line spacing. This AAA criterion is essentially a dyslexia-support checklist, so we take it.

**Operable**
- 2.1.1 / 2.1.2 — Full keyboard operability, no traps. **The bar-model builder must be fully keyboard-operable** — this is the hardest requirement on the site and the most likely to be quietly skipped. It is explicitly a Student Agent test case.
- 2.4.1 — Skip link to main content.
- 2.4.7 — Highly visible focus indicator, 3:1 against adjacent colors.
- 2.5.5 (AAA), adopted — 44×44px minimum targets.
- 2.3.1 — Nothing flashes more than 3×/second (nothing flashes at all).

**Understandable**
- 3.1.5 — Instructional copy targets a **lower secondary reading level**. Problem text itself is whatever the problem requires, but *our* scaffolding language must never be harder to read than the math.
- 3.2.x — Consistent navigation; no context change on focus or input.
- 3.3.1 / 3.3.3 — Errors identified in text and paired with a concrete suggestion. Answer feedback goes through a polite `aria-live` region so screen-reader users receive it without losing their place.

**Robust**
- 4.1.2 / 4.1.3 — Correct names/roles/values; status messages via `aria-live="polite"`.

---

## 6. Screen-reader and keyboard specifics

- Landmarks: `banner`, `navigation` (route map), `main`, `complementary` (accessibility panel), `contentinfo`.
- One `<h1>` per page; strictly nested headings.
- Route map = ordered list, current stop marked `aria-current="step"`.
- Live regions: feedback `polite`; nothing `assertive` (interrupting a struggling student mid-thought is hostile).
- Accessibility panel opens on a documented single keystroke and is the **first tab stop after the skip link**.
- Bar models: each bar exposes label, count, and unit as text — e.g. *"Whole bar, 4 equal parts, 3 shaded, each part is 1/4 gallon."* A blind student must be able to reason about the model, not just be told one exists.

---

## 7. Themed but quiet — worked distinctions

| Element | Theme allowed? | Treatment |
|---|---|---|
| Page header / station sign | ✅ Full | Enamel station-sign styling, rail-green, decorative |
| Route map / progress | ✅ Full | Real transit-map line with stop nodes |
| Mr Fraction portrait & asides | ✅ Full | Character illustration, speech in a rounded card |
| Station transitions | ⚠️ Restrained | ≤300ms slide; removed under reduced-motion |
| Buttons | ⚠️ Restrained | Ticket-shaped notch, but standard sizing/contrast/focus |
| **Problem text panel** | ❌ **None** | Sunken cream well, plain type, generous spacing. **No texture, no ticket-stub edges, no background art.** |
| **Bar model canvas** | ❌ **None** | Plain, high-contrast, labeled |
| **Answer entry** | ❌ **None** | Standard, large, obvious, plainly labeled |
| Error / hint text | ❌ None | Plain text + icon |

---

## 8. Contrast verification

All pairings are computed and recorded in [`contrast-report.md`](contrast-report.md), regenerated by [`tools/check-contrast.ps1`](../tools/check-contrast.ps1). Required minimums: **4.5:1** normal text, **3:1** large text and UI/graphical objects.

```bash
powershell -File tools/check-contrast.ps1
```

**Current status: 31 pairings checked, 0 failing.**

The checker is written in PowerShell rather than Node deliberately — the project assumes no Node toolchain (see locked constraints), and this keeps the one dev tool runnable on a bare Windows machine. It exits non-zero on any failure, so it can gate a commit hook later if wanted.

Any token change **requires** re-running the checker and updating that report before Oversight sign-off. This is a gate, not a courtesy — it has already caught one real AA failure (T-6) and one incorrect restriction I had imposed by eye (T-4).

---

## 9. Logged theme ↔ accessibility conflicts

| # | Conflict | Ruling |
|---|---|---|
| T-1 | Wanted a decorative slab/Western display face for headings (very on-theme) | **Rejected for body and problem text; permitted for the station-sign wordmark only**, which is ornamental, short, and has a text equivalent. |
| T-2 | Wanted an animated train crossing the screen between stations | **Permitted as ≤300ms chrome, removed entirely under reduced-motion.** Must not appear near problem text. |
| T-3 | Aged-paper / ticket-stub texture behind problem text | **Rejected outright.** Texture behind text is one of the most damaging things possible for a struggling reader. Non-negotiable. |
| T-4 | Rail-green on cream for small text | **Approved — my initial ruling was wrong.** I assumed `--brand-rail` on cream would fail at small sizes and restricted it. The checker measured **7.2:1**, comfortably AA. Restriction lifted. Recorded because it is a useful reminder that eyeballed contrast judgments are unreliable in both directions, and the checker is the authority. |
| T-6 | White-ish text on the Equal Groups line fill | **Token changed.** Original `#B4530F` measured 4.37:1 against `--ink-on-rail` — a real AA failure found by the checker, not by review. Darkened to `#A34A0B` (5.17:1 on fill, 5.5:1 on cream). Hue preserved. |
| T-5 | Line identification by color (transit-map authenticity) | **Modified.** Color retained, but every line always carries a shape marker and a text label. |

---

## 10. Open questions for Oversight

- **Q1:** Where does the number-reveal escape hatch live? Theme Agent's position: inside the accessibility panel, **not** as a button next to the problem — visible enough for a student who needs it, not so visible it becomes the default path of least resistance. Needs Teacher Agent agreement (their Pedagogy Q3).
- **Q2:** Session-only preferences mean a dyslexic student re-sets the reading ruler and font on **every page load**. That is a real, repeated accessibility cost created by the no-localStorage constraint. Options: (a) accept it and make the panel one keystroke away, (b) hold preferences in memory across in-page navigation by making the journey a single-page app, (c) ask the user to reconsider `sessionStorage`. **Theme Agent recommends (b)** — a single-page journey solves it with no storage at all.
- **Q3:** Should the read-aloud voice attempt to "be" Mr Fraction? Recommendation: **no.** Browser voices can't carry character, and a mismatched voice is worse than a neutral one.
