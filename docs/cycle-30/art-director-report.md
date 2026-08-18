# ART DIRECTION PASS — Cycle 30
Started 2026-08-17. Last agent in cycle. Report written incrementally.

## Status log
- [t0] Report file created. Read .claude/launch.json (port 8791, powershell -File tools/serve.ps1).
- Prior agents: theme-reviewer got NO browser; student-tester got DOM only (no composited frame).
- Goal: be the first pixel instrument of the cycle.

## INSTRUMENT
(pending)

## INSTRUMENT — RESOLVED. I HAVE REAL PIXELS.
- Browser pane (mcp Claude_Browser) FAILED same as prior agents: "Browser pane is not displayed, page is not compositing frames". Tried resize first, still failed.
- WORKAROUND THAT WORKS, record this for future cycles:
  server: Start-Process powershell -ArgumentList '-NoProfile','-File','tools\serve.ps1','-Port','8413' -WindowStyle Hidden
  shot:   & "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --no-sandbox
          --user-data-dir=<scratch>\ud --window-size=1280,900 --virtual-time-budget=5000
          --screenshot=<out>.png "http://localhost:8413/index.html"
  NOTE: --headless=new SILENTLY WRITES NOTHING. Must use bare --headless (old headless). Edge 151.0.4129.86.
  NOTE: --virtual-time-budget advances the clock, so animations are SEEKED not sampled mid-flight (VERIFICATION rule satisfied).
  Then Read the .png -> the image is actually composited and visible.

## SEEN — home page @1280x900
Home is NOT a wireframe. Display face doing real work (heavy condensed caps "WHERE ARE YOU GOING?" ~64px,
accent orange on "GOING?"), eyebrow rule + kicker, ticker strip under the header, ambient spoked-wheel
motifs at low opacity, illustrated station+loco. This screen clears the bar at a glance.
DEFECT SEEN: the Mr Fraction bubble (bottom right, fixed) sits ON TOP of the "Five situations" panel's
lower right corner at 1280x900 -- it clips the panel border. Confirms the known .mf-c-bubble overlap class
is not confined to the Engine Room.

## HARNESS (works — reuse next cycle)
Copy site to scratch, add assets/js/zz-drive.js + <script> before </body>, serve on 8414 with -Root <copy>.
Driver reads ?pid=&phase=&step=&rl= , does MF.materialize(MF.problems[pid],0), new Stations.Station(...),
mounts into #view, st.go(phase), removes #loading-screen, prints result in a green bar bottom-left.
Then bare --headless --screenshot. Confirmed: reached pw-band-brass plan phase, real pixels.

## SEEN — THE ESTIMATE GATE (pw-band-brass, Plan phase, 1280 wide)  [§4a ruling]
The screen overall is designed, not a wireframe: display face on "Draw the relationship before you
calculate it.", wheel glyph, kicker "THE DRAFTING TABLE", leg map + "STOP 2 OF 3" with dot progress,
scene panel top right, bordered problem panel with a red rule down the left edge. Good.

THE RAIL IS THE PROBLEM AND IT IS NOT ITS LENGTH.
The estimate control renders as a ~1px black hairline about 292px long with 5 hairline ticks and "0"/"50"
in ~10px grey. There is NO thumb, NO handle, NO rail bed, NO band, NO fill, nothing that says "drag me".
Under it, "Nothing set yet." Next to it, the sketch pad is a large dashed box.
On a railway-themed site, the one control literally described as a rail is drawn as a rule.
=> A student's eye reads the dashed pad as the interactive thing and the rail as a divider.

INVERTED HIERARCHY IN THAT BLOCK (seen, area-measurable):
- pad occupies roughly 527 x 300 = ~158,000 px^2 on the LEFT, and is OPTIONAL.
- the required control occupies a 292 x ~40 strip on the RIGHT.
The optional surface has ~13x the area of the required one and wins the left-first read.
The section heading "Commit to an estimate" is visually SMALLER than the sub-heading
"Sweep the stretch you think the answer lies in." directly beneath it. Hierarchy runs backwards.

COPY ARTIFACT SEEN: the field is labelled "Or type it (students)". The parenthetical reads as an
authoring note that leaked into the student UI. Flagging for teacher/theme-reviewer, not mine to fix.

MR FRACTION CLEARANCE — CONFIRMED CLEAR (seen). Bubble occupies approx x 993-1250, y 1425-1560.
Rail ends at x~955. Clears by ~38px horizontally. The §4a reservation works at 1280.

## SEEN — CROSSOVER ISLAND (click [data-island], 1280x2200)
The MAP itself is good and does hold the mainland's language: same sea blue, same coast ink, same
tree/mountain glyphs, same wavelet marks, same compass rose, same translucent label plates, sleepered
track, a lake ("Lake Transfer"), a lighthouse with a beam, a loco with cars. It is NOT a bolt-on as a map.

What is a bolt-on is EVERYTHING BELOW THE MAP:
1. THE ISLAND HAS NO COLOUR. The mainland map gives each of five lines a territory colour; the island
   is entirely neutral brown/cream. --xo-a / --xo-b (the two role colours) appear NOWHERE on this screen,
   including on the stop cards, even though the companion text on this very screen says
   "Each stop is marked in two colours for the two situations it..." -- and the screen shows none.
   The companion is describing a thing the screen does not do. SEEN, and it is the strongest island finding.
2. THE LIGHTHOUSE HUB CARD IS DRAWN IN THE SITE'S OWN "NOT BUILT YET" IDIOM: a dashed orange outline.
   Dashed borders elsewhere on this site mean placeholder/empty (the sketch pad; "Track still being laid").
   The island's single most important destination is styled as absent.
3. THE FIVE STOP CARDS carry the fade ladder on a ~6px filled-vs-hollow dot and nothing else.
   No colour, no badge, no weight change. Staffed vs unstaffed is the island's whole pedagogy.
   (The MAP does this better than the LIST, which is backwards.)
4. LEFT-GUTTER MISALIGNMENT: "Pick a stop"/"The Lighthouse" headings sit at x=64; the cards they head
   start at x=224 and the Lighthouse card is centred at x~490-790. Nothing occupies the 160px left
   column. Reads as a grid with a missing column, not as a deliberate rail.
5. THE COMPANION BUBBLE HAS A BROWSER-DEFAULT SCROLLBAR (visible grey track+thumb at its right edge)
   and its text is CLIPPED MID-SENTENCE: "...marked in two colours for the two situations it" -- cut.
   Bar item 7 fails here. The one screen where the companion explains the island's core idea truncates it.
6. The bubble + Mr Fraction also sit over the footer strip ("Learn how to start any word problem...").

## SEEN — ch-water-tank Plan ("ch-" is the CHANGE line, not Challenge; fadeLevel=independent)
Correction for the record: the island problems are not the ch-* files. This is a mainland unstaffed halt.
It does NOT read as "a page with its middle removed" -- it carries the full Change Train scaffold,
a 3-row table with an orange "?" (the only accent in the table, well spent), three move options, and a
long "In words:" paragraph. So on the MAINLAND the unstaffed halt still looks finished.

BUT: the "In words:" paragraph sits directly under "Which move reaches the missing car?" and states the
answer in words -- "take the 180 litres that arrived off the 460 litres" -- with the three options
(180-460 / 460-180 / 460+180) immediately above it. Same class as the known Model Yard leak, DIFFERENT
SURFACE (the Change Train). Naming it so it is not treated as covered by the Model Yard finding.

LEG MAP FRAMING -- the Cycle 7 scar looks like it has come back (SEEN, needs the numbers):
This is a CHANGE-line stop. In the leg map the green Change territory occupies roughly the left 15% of
the frame; the orange Equal Groups territory (a line not being ridden) occupies roughly 29%; the frame's
horizontal centre lands in Part-Whole. The map is also clipped at the bottom mid-territory with a hub
node cut in half by the panel edge. VERIFICATION's rule is "aim at the RIDDEN territory's centre".
Measuring this next.

## RETRACTION — "(students)" was NOT a defect
On ch-kiosk-sandwiches the same label reads "Or type it (sandwiches)". The parenthetical is the UNIT,
not an authoring note. Withdrawn. (Recording the retraction rather than deleting it: the lesson is that a
single instance of a suspicious string is not evidence -- the second instance disambiguated it.)

## SEEN — THE UNSTAFFED HALT, PROPERLY THIS TIME (cl-buffet-crates, island, fade=independent, Plan)
This is the screen student-tester could not see. My verdict, as JUDGEMENT on appearance:
IT LOOKS LIKE A PAGE WITH ITS MIDDLE REMOVED, and here is exactly why -- four things, all fixable:

1. THE SCREEN HAS NO BOTTOM. The panel ends at y~1390 in a 2000px document. Below it are roughly
   600px of empty cream -- about 30% of the page -- before the footer. On the staffed screens that
   space is filled by the model. Here nothing replaces it and nothing closes it off.
   This alone is the difference between "the scaffolding was withdrawn" and "the render failed".

2. NOTHING ON THE SCREEN SAYS THE SCAFFOLDING WAS WITHDRAWN ON PURPOSE. The island map two panels up
   labels this stop "Open - No Assistance". The stop screen itself never repeats it. The one place a
   student needs to be told "there is deliberately no one here" is the place it is not said.
   The cheapest possible fix, and the one I would make: carry the map's own "No Assistance" plate onto
   the station header, in the same plate styling, so the absence is announced in the map's own voice.

3. THE STATION HEADER IS WRONG FOR THE PHASE. Kicker "THE READING ROOM", title "Read it three times,
   each with a different job.", subtitle "The Challenge Line - Two situations, joined" -- on a screen
   whose entire content is an estimate gate. (theme-reviewer already logged that this header is on
   every island stop; I am adding that on THIS phase it actively contradicts the content below it.)

4. THE FOCAL POINT IS THE EMPTY BOX. Reading order at rest: a full-width blue-bordered rounded box
   containing the words "Commit to an estimate" -- which reads as a TEXT INPUT, not a heading -- then a
   ~530x300 empty dashed rectangle. The accent-filled "Lock it in" button is bottom-LEFT under the
   optional pad. The one required control, the rail, is a hairline on the right. Bar item 2 fails.

LEG MAP ON THE ISLAND (seen): framing is worse here than on the mainland. The frame cuts the top of the
island off, loses the lighthouse and Thorne Bridge entirely, CLIPS the "Marsh Halt" plate against the
top edge of the frame (its top border is cut), and puts the "Cold Halt" plate half over its own
coastline -- the exact Cycle 7 defect, recurring on the map that did not exist when that fix was made.

## RETRACTION 2 — MY "320px FAILS" FINDING WAS AN INSTRUMENT ERROR
I captured with --window-size=320,1800 and saw everything clipped mid-word. The probe then reported
`viewport inner=504x1824`. Edge headless would not go below ~504 CSS px, so the PNG was a 320px-wide
CROP of a 504px layout. The clipping was my screenshot, not the site.
MEASURED at that width: doc scrollWidth=489 vs innerWidth=504 -> NO horizontal overflow. The 43
elements reporting right>innerWidth are all .ticker-item/.ticker-dot inside .ticker-track (w=5321),
which is a marquee and is meant to. Bar item 8 is NOT failed by anything I have seen.
I did not manage to render a true 320px viewport. SAY SO RATHER THAN GUESS: 320 is UNTESTED by me.
(Second selector trap in the same probe: my `[class*="rail"]` matched `.ticker-track`. The rail width
number below comes from a corrected selector, not that one.)

## MEASURED — type scale @1250px viewport (computed styles, cl-season-tickets Plan)
  H1 site title              17px    w400  Black Han Sans
  H2 station title           24.8px  w400  Black Han Sans   letter-spacing 0.992px (= 0.040em)
  H2 a11y panel              18.4px  w400  Black Han Sans
  .eyebrow                   11.78px w700  Atkinson Hyperlegible  ls 1.4136px (0.120em)
  H3 "The bigger station..." 16.8px  w700  Atkinson Hyperlegible
  H3 "What crosses over?"    18.4px  w700  Atkinson Hyperlegible
  H3 "A whole, waiting..."   18.4px  w700  Atkinson Hyperlegible
  H3 "Commit to an estimate" 16.8px  w700  Atkinson Hyperlegible
AGAINST THE REFERENCE: tracking on the display H2 is 0.040em, which MATCHES the Factory's 0.04em
exactly; size is 24.8px against the Factory's 28px. The family is right. The failure is COVERAGE:
the display face appears exactly THREE times in the document and never once below the station header.
Every heading inside the working panel is body-bold. That is the bar-item-1 failure applied to the
entire content area, and "theme lives in the chrome" does not cover a section heading like
"Commit to an estimate".
HIERARCHY INVERSION, measured + seen: H3 "Commit to an estimate" is 16.8px, and the <p class="est-lead">
directly beneath it ("Sweep the stretch you think the answer lies in.") renders visibly larger and
heavier. A paragraph outranking its own section heading.

## MEASURED — the estimate control's resting state (estimate.js 303-307)
  '<div class="est-band" id="est-band" hidden>'
  '<button class="est-thumb" id="est-lo" data-end="lo" hidden ...>'
  '<button class="est-thumb" id="est-hi" data-end="hi" hidden ...>'
Both thumbs and the band are `hidden` until a value exists (estimate.js:349 `band.hidden = !has`).
So the EMPTY STATE of the gate is: a 4px ink rule (.est-rail, opacity .85), five ticks, two end
numbers, and the sentence "Nothing set yet." The only affordance is `cursor: crosshair` on .est-track
-- invisible until the pointer is already over it, and absent entirely on touch.
The thumbs themselves are well designed (26x34, cream, 2.5px ink border, 0 2px 0 shadow, 44px hit area).
They are simply not on screen when the student first has to work out what to do.

## MEASURED — --xo-a / --xo-b
`getPropertyValue` on :root returns EMPTY for both. app.css:1147 defines them on `.hub-art` only.
So the two role colours exist solely inside the Lighthouse hub artwork. Nothing on the island map, the
island stop list, or any crossover station header carries them -- while the island companion text on
screen says "Each stop is marked in two colours for the two situations it [joins]".

## MEASURED — the companion bubble
app.css:2067  .mf-c-bubble { max-height: 170px; overflow-y: auto; }
app.css:2127  @media ... { .mf-c-bubble { max-height: 140px; max-width: 210px; } }
That is the cause of the truncated island text and the browser-default scrollbar I saw. Not a
speculative fix: any companion line longer than 170px of wrapped text is clipped behind a default
scrollbar. Bar item 7.

## SEEN — Mr Fraction over a teaching illustration
On cl-season-tickets at scroll-top, Mr Fraction (x~1160-1245, y~645-745) sits directly ON the scene
panel artwork (the booking-office window). Earlier known instances covered an input and a panel border;
this one covers a pedagogical illustration. The class is broader than the Engine Room.

## SEEN — the "waiting" second model  [scope item 4]
On cl-season-tickets the compare model draws Kelder as a clean bordered bar with a solid blue fill and
a hatched, labelled "27 season tickets" segment. Harbour Halt above it is drawn as a row of ~40 loose
thin vertical ticks with a dashed rectangle over the left portion, NO enclosing bar outline on the
right portion, and no right-hand total (Kelder has "84 season tickets"; Harbour Halt has nothing).
JUDGEMENT: it reads as a rendering failure, not as a state. Two reasons, and both are about vocabulary
rather than about the idea:
  (a) the two bars use different drawing systems -- one is a bar, the other is a picket fence;
  (b) a striped/hatched placeholder where a filled block belongs is, in 2026, the universal visual
      idiom for a SKELETON LOADER. "Waiting" is exactly the wrong word to render literally.
The "In words:" text does explain it ("outlined rather than filled ... because the story never states
it"), so the intent is deliberate and documented. The picture does not carry the intent on its own.
What would fix it: keep the same outline, but give the waiting bar the SAME border, height and
end-caps as the known bar, so the only difference is fill. Difference by one property reads as a state;
difference by four properties reads as a bug.

## SEEN — island leg map framing (cl-season-tickets)
The frame cuts the island's south off entirely (Cold Halt and Fell Crossing are outside it) and
BISECTS the Marsh Halt stop node on the bottom frame edge. "LIGHTHOUSE HUB" is set as a bare caption
with no plate while every other label on both maps sits on a translucent plate, and the "Kelder Sands"
plate sits ~immediately under it so the two read as one squashed stack.

===============================================================================
ART DIRECTION REVIEW — Cycle 30, five surfaces
VERDICT: NEEDS WORK  (not NOT PRESENTABLE -- this is a designed site with four
         specific holes in it, three of them on the island)

FIRST IMPRESSION
  The mainland looks like a product; the island looks like the mainland's
  greyscale proof, and the unstaffed halt looks like a page whose middle failed
  to render.

AGAINST THE REFERENCE
  Display face: Black Han Sans, 24.8px, letter-spacing 0.040em -- the Factory's
  0.04em, matched exactly. Right family, right tracking, slightly smaller size.
  The gap is not the face, it is that the face appears THREE times in the whole
  document and never below the station header.
  Ambient life: present and correct -- spoked driving wheels and cloud forms at
  low opacity, the railway equivalent of the Factory's drifting gears. Ticker
  strip running. This is done.
  Accent: orange is spent well and sparingly -- the "?" cell, the eyebrows, the
  one filled button, the current route dot. Deliberate, not sprinkled.

THE BAR (1-8)
  [~] Display type doing work    -- in the chrome yes, in the content never
  [x] Clear focal point          -- estimate gate: the eye lands on the empty pad
  [check] Accent colour means something
  [check] Ambient life
  [check] Considered edges       -- radii/shadows/borders consistent throughout
  [x] Designed empty/disabled states -- the rail's resting state is a rule and a
                                    sentence; the waiting bar reads as a skeleton
  [x] No browser defaults        -- default scrollbar inside .mf-c-bubble
  [?] Holds at 320px             -- UNTESTED. My 320 capture was an instrument
                                    error (real viewport was 504px). Say so.

TOP THREE FIXES
  1. Give the estimate rail a resting appearance. Show both thumbs parked at the
     ends (or a ghosted band) instead of `hidden`, so the control looks like a
     control before it is touched. This is the single highest-leverage change on
     the site: it is the gate every problem passes through.
  2. Close the bottom of the unstaffed halt and say the absence out loud. ~600px
     of dead cream below the panel is what makes withdrawal read as breakage.
     Carry the map's own "Open - No Assistance" plate onto the station header.
  3. Put --xo-a / --xo-b on the island. They are defined on .hub-art only, so the
     island is the one line on the site with no colour, on the one screen whose
     companion text promises "two colours".

CONSTRAINT CHECK
  Nothing above needs new motion, so reduced-motion is untouched.
  Fix 1 costs nothing in a11y: the thumbs are already 44px targets with visible
  focus rings; making them visible at rest only helps.
  Fix 3 must clear contrast before it ships -- --xo-a #3D5A73 and --xo-b #7B3F63
  are dark enough on cream but theme-reviewer rules, not me, and neither colour
  may become the ONLY carrier of a state (the hue-alone finding already open).
  Fix 2 touches no problem text and no reading panel, so Pedagogy 7 is clear.
  NOT MINE, ROUTED ON: the Change Train's "In words:" paragraph states the answer
  to the multiple-choice question printed directly above it (ch-water-tank).
  Same class as the known Model Yard leak, DIFFERENT surface.
===============================================================================
