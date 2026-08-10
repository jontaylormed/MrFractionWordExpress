# Art Direction
### Mr Fraction's Word Problem Express
**Owner:** Art Director · **Status:** v1 · **Last updated:** 2026-07-28

---

## 0. The brief

This site must look like it belongs to **Mr. Fraction's Factory** (`https://jtaylor-cloud.github.io/Mr.FractionFactory/`). Same author, same character, same world — a student moving between them should never wonder whether they've landed somewhere else.

The Factory is a factory. This is a **railway**. Same hand, different building.

### What went wrong the first time

The first build was correct, accessible, and mathematically verified. It also looked like an unstyled document, and every review passed it.

The specific error: the theme spec says *"theme lives in the chrome, content lives in the quiet"* — and that was treated as permission to build almost no chrome. **The rule constrains the problem panel. It does not excuse leaving everything else undesigned.** Restraint in the reading area demands *more* craft in the frame, not less. A quiet reading panel inside a beautifully built station is the goal. A quiet reading panel inside nothing is a wireframe.

---

## 1. Typography — the biggest single fix

The first build had **no display typeface at all**. Every heading was body font at a larger size, which is the clearest possible signal that nobody designed the page.

Three faces, all **self-hosted** in `assets/fonts/` (84 KB total, Latin subsets only). The reference loads these from Google's CDN; we self-host to keep the offline / no-network / no-tracking guarantee.

| Role | Face | Used for |
|---|---|---|
| **Display** | **Black Han Sans** | Station signs, line names, station titles, ticker, numerals on the departure board. Heavy, tight, always tracked out. |
| **Body** | **Atkinson Hyperlegible** | Everything readable. Designed by the Braille Institute for low vision — genuinely better than the Verdana it replaces, and it happens to be what the reference uses. |
| **Accent** | **Libre Baskerville Italic** | Mr Fraction's asides only. One italic serif voice, used sparingly, so his speech reads as a person talking. |

> **Note on the italic rule.** The accessibility spec bans italics for emphasis, because italics reduce letterform distinctiveness for dyslexic readers. Libre Baskerville Italic is permitted **only** for Mr Fraction's short spoken asides — never for emphasis, never for instructions, never inside problem text, never for more than about two sentences. This is a deliberate, bounded exception; the ban on `<em>` for emphasis stands everywhere.
>
> **This rule was broken on the map screen and has been fixed.** The four-sentence explanation of the five situations — the single most important paragraph on the site — was set inside Mr Fraction's italic serif bubble. It is now a plain body-text card, and his aside is back to two sentences of greeting. **If a passage is teaching rather than flavouring, it does not go in the bubble.**

### Scale

```
--fs-sign      28px  display, 0.04em tracking      station signs, line names
--fs-title     22px  display, 0.04em tracking      station titles
--fs-eyebrow   11px  body 700, 0.12em, UPPERCASE   the small orange label above a title
--fs-body      19px  body 400                      never below 16px anywhere
--fs-small     14px  body 400                      captions, hints
--fs-ticker    11px  display, 0.14em, UPPERCASE    departure board
```

**The eyebrow is the reference's signature move** and the cheapest way to make a screen look art-directed: a tiny uppercase letterspaced orange label sitting directly above a heavy display title. Use it on every station header.

---

## 2. Palette

Taken from the reference, with five values darkened to clear WCAG AA. All 39 pairings verified in [`contrast-report.md`](contrast-report.md) — **0 failing**.

```css
--cream:        #F5EDE0   /* page */
--cream-light:  #FDF8F0   /* cards */
--cream-mid:    #EDE0CC   /* sunken wells, problem panel */
--brown-dark:   #2C2214   /* ink, and dark chrome */
--brown-mid:    #5A3E28
--brown-muted:  #6B5138   /* reference #7A5C3E, darkened */
--ink-on-dark:  #F3EDE1

--orange:       #C96A1F   /* THE accent. Large text, rules, markers */
--orange-deep:  #A85413   /* small text on cream, and button fills */
--orange-light: #E8843A   /* accent on dark chrome only */

--border:        #C8B89A  /* decorative edges only */
--border-strong: #8F7F63  /* every edge that identifies a control */
```

**Where accent is spent.** Orange means *this is live, current, or yours to click*. The eyebrow label, the current stop on the route, the active nav pill, ticker dots, the primary button. Nothing else. Orange sprinkled decoratively kills its meaning.

**Line colours** — one per schema, matched to the reference's category hues:

| Line | Token | Shape |
|---|---|---|
| Change | `#45742B` green | ● |
| Compare | `#2A5FA0` blue | ■ |
| Equal Groups | `#A85413` orange | ▲ |
| Ratio & Rate | `#2B7166` teal | ◆ |
| Part–Whole | `#A32E22` red | ⬢ |

Colour is never the only signal — every line always carries its shape and its name.

---

## 3. Ambient life — the factory's gears, translated

The reference's signature is **slowly rotating gear watermarks** at 8–12% opacity, fixed to the viewport, `pointer-events: none`, at six to ten positions. It is the single device that makes those pages feel like a working place rather than a document.

Ours are railway equivalents. Same treatment: fixed, low opacity, slow, non-informational, behind everything.

| Device | Motion | Opacity |
|---|---|---|
| **Wheel-and-spoke watermarks** | rotate, 16–32s linear infinite, alternating direction | 0.08–0.12 |
| **Drifting steam** | slow horizontal drift + rise, 40–70s | 0.05–0.08 |
| **Station clock** | minute hand sweeps once per 60s | 0.10 |
| **Track hatching** | static sleeper pattern along section edges | 0.06 |

The wheel is the direct analogue of the gear — same silhouette family, and a wheel rotating is the most natural motion a railway has.

**Hard limits, inherited from the accessibility spec and non-negotiable:**
- Ambient motion is **decorative only**. Nothing is ever communicated by it.
- Nothing animates within **200px of active problem text**.
- `prefers-reduced-motion: reduce` removes **every** ambient animation and transition. The page must still look composed when frozen — verified by leaving the watermarks visible but static, not by hiding them.

---

## 4. The ticker / departure board

The reference's scrolling ticker tape adapts to a railway better than it fits a factory: a **departure board** running under the station sign, display caps, letterspaced, orange dots between items, scrolling right to left over ~28s.

Content is atmospheric, not instructional — line names, "ALL LINES RUNNING", "MIND THE GAP BETWEEN NUMBER AND MEANING". It carries no information the student needs, so removing it under reduced-motion costs nothing.

Marked `aria-hidden="true"`: a screen reader should never have a marquee read at it.

---

## 5. Component anatomy

### Station sign (page header)
Dark `--brown-dark` enamel plate, orange bottom rule, Mr Fraction at 48px on the left, display-caps title, ticker beneath. Sticky.

### Nav pills
Rounded 24px, 2px `--border-strong`, transparent fill. Active = solid `--orange-deep` with cream text. Direct lift from the reference.

### Station header (inside a station)
```
[72px thumb]  EYEBROW LABEL IN ORANGE CAPS
              Station Title In Display
              One line of muted description.
```

### Cards
`--cream-light` on `--cream`, 1.5px `--border`, 12px radius, 20–24px padding. Card titles are small uppercase letterspaced body-700 with an icon — *not* display face. Display is reserved for station-level titles so it keeps its impact.

### The problem panel — the exception
Sunken `--cream-mid`, thick left rule in the line's colour, generous leading. **No texture, no display type, no illustration, no motion within 200px.** This is the one place the art direction deliberately stops.

### Buttons
Primary: `--orange-deep` fill, cream text, 2px, 8px radius, 44px min. Secondary: transparent with `--border-strong`. Both lift 1px on hover, and the lift is removed under reduced-motion.

---

## 6. The map

The map is the front door and the piece that most needs to look **drawn**, not laid out.

### Reference: a schoolroom wall map

The model is a printed classroom map of the Transcontinental Railroad — territories with irregular borders, routes that wind, stops scattered unevenly, a key, a compass rose, and a locomotive illustration sitting on the plate.

The first attempt was five parallel horizontal tracks in a stack. That is a **diagram**, and a dull one. A map has to feel like somewhere you could go.

### Rules

- **It is a place.** Five **territories** with rounded, organic borders, tiling one landmass, each tinted with its line's colour and outlined in dark ink. Running territories are tinted at 22%, unbuilt at 10%.
- **Borders are shared edges, never independent outlines.** The land is a planar subdivision: 24 nodes joined by 28 named edges, each bowed perpendicular to its chord, tessellated into a dense polyline, and consumed by **both** adjoining territories — one forward, one reversed. Curving each territory's own outline instead would open a gap or an overlap along every internal border. Verified by comparing vertex sets: neighbours share **19–55 identical points**, and territory pairs meeting at a single corner share exactly one.
- **The outline stays `M`/`L`, not beziers.** The same `d` string feeds the point-in-polygon tests behind forests, bridges and the water rules. Dense straight segments read as smooth at this scale and keep one geometry as the single source of truth — a drawn curve that the collision tests cannot see is how decoration ends up in the sea.
- **It has a coast.** The landmass sits in an **ocean**, drawn with a pale shallows halo at the shoreline and wave marks in open water. Territories are painted over an opaque cream underlay so the sea never shows through the land.
- **Inland water and high ground.** A **lake**, four **rivers**, four **mountain ranges**, and **forests**. Terrain is atmosphere and must never be mistaken for route information — but it must also never sit *on* a route. Track/terrain overlap is checked programmatically, not by eye.
- **Forests are placed procedurally, never by hand.** Trees are scattered from cluster seeds and rejected against every other thing on the plate — coast, rivers, lake, track, mountains, stations, labels and furniture. Hand-placing decoration on a map this dense means guessing at collisions; generating and rejecting means *no tree sits on anything* holds by construction.
- **Reject on the footprint, not the anchor.** Two separate bugs came from testing a single point: one pass omitted the mountain bounds and dropped a tree inside a peak; the next validated only the trunk position, so trees planted on the shoreline stood with their canopies out over the sea. A tree occupies roughly 20×20px around its anchor and every probe across that area must clear. **Any placement test must cover the shape drawn, not the coordinate stored.**
- **Rivers rise at high ground.** Every source sits within ~10px of a mountain range, or is the lake outflow. Two earlier rivers failed this — one began out at sea, another welled up in open country ten pixels off the coast — and both read as mistakes long before anyone could say why.
- **Water obeys water rules.** Rivers are drawn deliberately *past* the shoreline and then **clipped to the landmass**, so every one terminates exactly at the coast rather than at a guessed end coordinate. A river ends at water or not at all: three run to the ocean, and the fourth is a tributary feeding the lake, which in turn drains to the sea. Hydrology that reads as accidental is worse than none.
- **Water flows.** A pale dashed highlight rides each river's own path with an animated `stroke-dashoffset`; rivers are authored source-first, so the current runs downstream for free. The dash cycle equals the offset travel, so it loops with no visible jump. Ocean waves bob and stretch on a staggered delay. All of it is decorative — under `prefers-reduced-motion` the water **freezes but stays drawn**, because a frozen river must still look like a river.
- **A river meeting the lake has no seam.** Rivers run *into* the lake, the lake fill is then painted over them, and the lake's outline is drawn through a **mask punched out at each river mouth**. Without that, the darker border cuts straight across the water where the river arrives and the two stop reading as one connected system. Mouth positions are found by measuring which river ends touch the lake, not by hand-listing them.
- **Track never touches water without a bridge.** Ocean, river and lake are one rule, not three — which is why the central river crossing is bridged as well as the sea crossings. Water spans are found by sampling the route and testing each point against land, rivers and lake; the deck is drawn *under* the track along each span. Verified by measurement: every sampled track point over water sits on a deck.
- **What makes a bridge legible.** A single thick band reads as a road, not a bridge. The parts that carry the meaning are **guard rails offset either side of the deck** and a **squared abutment at each bank** — so the span visibly starts and stops on dry ground. Each span is padded slightly onto land so the abutments sit on the bank rather than in the water. The deck stays **narrower than the track it carries** (11px against 13px sleepers); if the deck dominates the rail, the bridge stops reading as railway.
- **Stations stand clear of water.** A stop rendered on top of its own bridge is the specific failure this rule exists to prevent. Minimum ~30px from any river centreline; currently the closest is 33px.
- **One network, not five diagrams.** Every line's endpoints are **shared coordinates** with its neighbours, so the rails genuinely meet at four **junctions** rather than merely approaching. The Part–Whole terminus is itself a triple junction, which is why the largest station sits where three lines converge. Connectivity is verified from the *rendered path geometry* — every junction must join ≥2 line-ends, and all junctions must be reachable from any other.
- **Track winds.** No straight runs. Routes are smooth curves generated by a **Catmull-Rom spline through the station points**, so every stop sits exactly on the rail by construction rather than being measured back off a path.
- **Track is drawn, not stroked.** Three layers: a wide dashed stroke underneath for **sleepers**, a solid colour stroke for the **rail**, and a cream hairline down the centre for the twin-rail read. This works on any curve.
- **Stops are spread unevenly.** Real lines don't tick along at equal intervals. Station coordinates are deliberately irregular.
- **Terrain earns its place.** A river and a small mountain range give the plate the texture of a real map. They carry no meaning and must never be mistaken for route information.
- **Furniture:** a **key**, a **compass rose**, a **locomotive**, and a display-face map title.
- **The locomotive smokes.** Six puffs leave the chimney on staggered delays, drifting *back over the cab* — the engine faces left, so a forward-drifting plume would read as the train running backwards. Each puff swells and fades over 3.7s and the cycle returns exactly to its start, so the plume never jumps. Under reduced motion the animated puffs are **swapped for a drawn static plume**, not frozen: six puffs held at the end of their animation all sit at opacity 0, which would put the fire out. The key names every symbol — line, strategy stop, Terminus Hub, Learning Hub — and states which lines are running.
- **Learning Hubs are a junction on the network**, drawn at the same weight as everything else, with a spur connecting them to a running line. Never smaller, never greyed, never off to one side. The whole point is that visiting one is ordinary.
- **Lines with no content render as track under construction** — sleepers, no rail — which reads as *coming*, not *broken*.

### Accessibility floor

The SVG is `role="img"` with a full `aria-label`, and **the button list beneath it is the operable path** — it carries every accessible name and works by keyboard.

Clicking a running line **on the map** is a **redundant convenience for mouse users**, never the only way through. Only running lines are clickable; under-construction territories have no hit target, so nothing invites a click that goes nowhere. Verified: map click and button list each start a route independently.

At 320px the plate scrolls inside its own `overflow-x: auto` box. **The page itself never scrolls horizontally.**

---

## 7. What "finished" means

A screen ships when all eight are true:

1. A display typeface is doing real work.
2. There is one clear focal point.
3. Accent colour means something.
4. The page has ambient life.
5. Edges are consistent and intentional.
6. Empty and disabled states are designed, not greyed.
7. No bare browser defaults — including `<select>` and scrollbars.
8. It holds together at 320px.

---

## 8. Standing conflicts

| # | Want | Ruling |
|---|---|---|
| AD-1 | Google Fonts CDN, as the reference does | **Self-host instead.** Same faces, 84 KB, keeps the offline and no-tracking guarantees. Strictly better. |
| AD-2 | Italic serif for Mr Fraction's voice | **Permitted, bounded** — his asides only, ≤2 sentences, never emphasis, never in problem text. |
| AD-3 | Heavy ambient animation everywhere | **Permitted in chrome, banned within 200px of problem text**, fully removed under reduced-motion. |
| AD-4 | Display face for card titles too | **Rejected.** Display is reserved for station-level titles. Used everywhere it stops meaning anything. |
| AD-5 | Texture on the problem panel | **Rejected, permanently.** Same ruling as T-3. Not revisitable. |
