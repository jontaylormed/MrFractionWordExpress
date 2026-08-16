/* ============================================================
   Animated scene illustrations for Crossover Island.

   WHY THESE EXIST, AND IT IS NOT DECORATION.
   The seven island problems borrowed their pictures from the mainland, and
   measured across the five that had one, EVERY borrowed scene turned out to be
   the art of that problem's own FIRST-half line: `cl-signal-delay` wore the
   Compare Line's `delays`, `cl-season-tickets` wore Compare's `queues`,
   `cl-lost-umbrellas` wore Change's `lostproperty`, `cl-buffet-crates` wore
   Ratio's `urn`. That art renders on read1 — the screen where the student runs
   the five-question checklist and answers whether this story is one kind of
   situation or two. A student who has ridden the mainland was being shown the
   Compare Line's picture while being asked what kind of situation they were
   looking at. It is a weak tell — you have to recognise the artwork — but it is
   a tell pointing at half the answer, and it is the same class as the leg-map
   geometry recorded in stations.js. Unique art removes it.

   Two of the seven had no picture at all, which was the other half of the
   problem: `cl-platform-planters` and both pool problems shipped with a blank
   where every other problem on the site has an illustration.

   HOW A LIBRARY IS FOUND. `Scene.sceneLibs()` collects any global matching
   `*Scenes` that exposes `has` and `html` — discovered, never listed — so this
   file needs no registration anywhere. Dispatch is by ART NAME rather than by
   line, which is what lets an island problem carrying `line: "ratio"` draw from
   here instead of from `RatioScenes`. Art names must therefore be unique across
   ALL libraries; every name below was checked against the other five.

   RULES THESE FOLLOW — the same ones the other five libraries follow, plus one.

   - NO NUMERALS ANYWHERE, in the drawing or the caption. These render on
     numberless screens and the sweep fails the build if a digit reaches one,
     including through `aria-label`.

   - THE OBJECTS THAT ARE THE QUANTITY MUST BE UNCOUNTABLE. This is the Compare
     Line's rule and it binds harder here, because on a two-line problem the
     transfer is a count nobody states. Every scene below whose subject IS the
     counted thing — planters, umbrellas, bottles, sleepers, tickets — draws it
     running off both edges of the frame and overlapping, so no student can
     count the picture instead of reading the story. Where the counted thing is
     NOT the subject (minutes and miles on `signalbox`, carriages per hour on
     `washshed`) the objects may be whole, because counting them tells you
     nothing.

   - PLACEMENT ON AN OUTER GROUP, ANIMATION ON AN INNER ONE. A CSS transform
     beats the transform attribute in SVG, so animating a placed element wipes
     its position and stacks everything at the origin. That has happened twice
     on this project.

   - NO NEW CSS. Every class used here is from the shared `rsc-*` vocabulary
     the other five libraries already use, which means reduced motion is
     already handled: `.rsc-svg [class*="rsc-"] { animation: none !important }`
     freezes the lot, and the classes that need a resting state already declare
     one. A new animation class would have been a new thing to keep in step for
     no gain.
   ============================================================ */
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var INK = '#241B10', CREAM = '#FDF8F0', MID = '#EFE4D0', SHADE = '#BCAA8C';
  /* NEUTRAL INK, NEVER A LINE COLOUR. Every other library paints its subject in
     its own line's colour — that is how `--line-compare` on a picture became a
     tell. The island's track is drawn in ink for the same reason (scenery.js),
     so its scenes are too. */
  var TONE = '#5A3E28', TONE2 = '#8F7F63';

  function ground(y) {
    return '<path d="M0 ' + y + ' H320" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round"/>';
  }

  /* Rails running off both edges, which is the island's visual signature and
     also the honest way to draw track: a line does not begin at the frame. */
  function rails(y) {
    return '<path d="M0 ' + y + ' H320" stroke="' + INK + '" stroke-width="2.4"/>' +
           '<path d="M0 ' + (y + 6) + ' H320" stroke="' + SHADE + '" stroke-width="2"/>';
  }

  var ART = {

    /* ---- signalbox · cl-signal-delay ----
       Two trains on parallel roads with a signal box between them, one further
       along than the other. The counted quantities here are MINUTES and MILES,
       neither of which is drawable, so the trains themselves may be whole —
       counting them tells a student nothing. The signal arm drops and the
       plumes drift, which is what says "these are moving at different rates"
       without measuring anything. */
    signalbox: function () {
      var s = '';
      s += rails(48);
      s += rails(104);

      // the box, between the two roads
      s += '<g transform="translate(140,54)">' +
        '<rect x="-22" y="-6" width="44" height="34" rx="3" fill="' + MID + '" stroke="' + INK + '" stroke-width="2.4"/>' +
        '<rect x="-18" y="-2" width="36" height="14" rx="2" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<path d="M-26 -6 L0 -20 L26 -6 Z" fill="' + TONE + '" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round"/>' +
        '</g>';

      // the signal, arm dropping
      s += '<g transform="translate(250,20)">' +
        '<path d="M0 0 V60" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
        '<g class="rsc-swing"><rect x="0" y="2" width="26" height="7" rx="2" fill="' + TONE + '" stroke="' + INK + '" stroke-width="2"/></g>' +
        '</g>';

      // leading train, upper road
      s += '<g transform="translate(196,30)"><g class="rsc-bounce">' +
        '<rect x="-30" y="0" width="60" height="16" rx="4" fill="' + TONE + '" stroke="' + INK + '" stroke-width="2.4"/>' +
        '<rect x="-24" y="4" width="14" height="8" rx="2" fill="' + CREAM + '"/>' +
        '<circle cx="-18" cy="18" r="4" fill="' + INK + '"/><circle cx="16" cy="18" r="4" fill="' + INK + '"/>' +
        '</g></g>';
      // trailing train, lower road, further back
      s += '<g transform="translate(84,86)"><g class="rsc-bounce rsc-roller-b">' +
        '<rect x="-30" y="0" width="60" height="16" rx="4" fill="' + TONE2 + '" stroke="' + INK + '" stroke-width="2.4"/>' +
        '<rect x="-24" y="4" width="14" height="8" rx="2" fill="' + CREAM + '"/>' +
        '<circle cx="-18" cy="18" r="4" fill="' + INK + '"/><circle cx="16" cy="18" r="4" fill="' + INK + '"/>' +
        '</g></g>';

      // drifting steam, no count implied
      s += '<g transform="translate(176,22)"><g class="rsc-puff"><circle r="7" fill="' + SHADE + '" opacity=".5"/></g></g>';
      s += '<g transform="translate(64,78)"><g class="rsc-puff rsc-drop-b"><circle r="6" fill="' + SHADE + '" opacity=".4"/></g></g>';
      return s;
    },

    /* ---- seasonrack · cl-season-tickets ----
       A booking office window with a rack of season ticket wallets behind it.
       Tickets ARE the counted quantity, so the rack runs off both edges and the
       wallets overlap: there is no first wallet and no last one. The stamp
       lifts and falls, which is the office working without saying how much
       work there is. */
    seasonrack: function () {
      var s = '';
      s += '<rect x="0" y="18" width="320" height="86" rx="4" fill="' + MID + '" stroke="' + INK + '" stroke-width="2.4"/>';
      // the rack: wallets overlapping, running past both edges
      for (var i = -1; i < 12; i++) {
        var x = -14 + i * 28;
        s += '<g transform="translate(' + x + ',30)">' +
          '<rect x="0" y="0" width="34" height="40" rx="3" fill="' + (i % 2 ? CREAM : TONE2) +
            '" stroke="' + INK + '" stroke-width="2"/>' +
          '<path d="M6 10 H28 M6 18 H24" stroke="' + INK + '" stroke-width="1.6" opacity=".45"/>' +
          '</g>';
      }
      // the window bar in front, so the rack reads as behind glass
      s += '<path d="M0 76 H320" stroke="' + INK + '" stroke-width="3"/>';
      s += '<rect x="0" y="76" width="320" height="28" fill="' + CREAM + '" opacity=".9"/>';
      s += '<path d="M0 76 H320" stroke="' + INK + '" stroke-width="2.4"/>';
      // the stamp
      s += '<g transform="translate(230,90)"><g class="rsc-lift">' +
        '<rect x="-13" y="-16" width="26" height="10" rx="2" fill="' + TONE + '" stroke="' + INK + '" stroke-width="2.2"/>' +
        '<rect x="-4" y="-24" width="8" height="9" rx="2" fill="' + INK + '"/>' +
        '</g></g>';
      return s;
    },

    /* ---- planters · cl-platform-planters ----
       A platform edge with planters along it, running past both frame edges and
       overlapping. Planters ARE the counted quantity. Flowers sway; nothing
       else moves, because nothing else should draw the eye to a count. */
    planters: function () {
      var s = '';
      s += rails(112);
      s += '<rect x="0" y="76" width="320" height="30" fill="' + MID + '" stroke="' + INK + '" stroke-width="2.4"/>';
      for (var i = -1; i < 8; i++) {
        var x = -18 + i * 44, tall = i % 2 === 0;
        s += '<g transform="translate(' + x + ',' + (tall ? 34 : 42) + ')">' +
          '<g class="rsc-sway"' + (i % 3 ? ' style="animation-delay:' + (i * 0.4).toFixed(1) + 's"' : '') + '>' +
            '<path d="M14 26 C4 16, 10 4, 20 8 C28 0, 40 8, 34 18 C42 22, 38 30, 28 28 Z" fill="' + TONE2 + '" stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round"/>' +
          '</g>' +
          '<path d="M2 26 H46 L41 44 H7 Z" fill="' + TONE + '" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round"/>' +
          '</g>';
      }
      return s;
    },

    /* ---- umbrellas · cl-lost-umbrellas ----
       A lost property shelf with umbrellas hanging from a rail. Umbrellas ARE
       the counted quantity, so the rail runs off both edges and they overlap
       at different heights. They swing, which is the only motion — a shelf
       where things arrive and leave. */
    umbrellas: function () {
      var s = '';
      s += '<rect x="0" y="14" width="320" height="96" rx="4" fill="' + MID + '" stroke="' + INK + '" stroke-width="2.4"/>';
      s += '<path d="M0 34 H320" stroke="' + INK + '" stroke-width="3"/>';
      for (var i = -1; i < 11; i++) {
        var x = -10 + i * 30, drop = 34 + (i % 3) * 7;
        s += '<g transform="translate(' + x + ',' + drop + ')">' +
          '<g class="rsc-swing" style="animation-delay:' + ((i % 5) * 0.35).toFixed(2) + 's">' +
            '<path d="M0 0 V34" stroke="' + INK + '" stroke-width="2.2"/>' +
            '<path d="M0 34 q6 6 11 0" fill="none" stroke="' + INK + '" stroke-width="2.2"/>' +
            '<path d="M-16 2 A16 14 0 0 1 16 2 Z" fill="' + (i % 2 ? TONE : TONE2) + '" stroke="' + INK + '" stroke-width="2"/>' +
          '</g></g>';
      }
      return s;
    },

    /* ---- bottling · cl-buffet-crates ----
       A filling head over a belt of bottles. Bottles ARE the counted quantity,
       so the belt runs off both edges and the bottles overlap the frame at
       both ends. The head drips and the belt scrolls: a plant working, with no
       total implied anywhere. */
    bottling: function () {
      var s = '';
      s += ground(112);
      // the belt
      s += '<rect x="-4" y="88" width="328" height="14" rx="3" fill="' + SHADE + '" stroke="' + INK + '" stroke-width="2.2"/>';
      /* TWO GEOMETRY FAULTS THE SWEEP CAUGHT HERE, both worth keeping written
         down because a scrolling strip looks fine in a still frame and neither
         is visible without measuring.

         This was `H320` with `stroke-dasharray="10 14"`. The dash pattern
         repeats every 24 units and the default travel is 320, and 320 mod 24 =
         8 — so every loop the belt jumped eight units sideways. And the strip
         spanned exactly the frame, so at full travel it had slid entirely off
         the left and uncovered the right-hand end.

         Both fixed by construction rather than by nudging: the repeat is now
         20, which divides 320 exactly, and the strip runs to 660 so that after
         a 320 travel it still spans -320..340 and covers the frame at both
         ends. Same reasoning as the road dashes in `ratio-scenes.js`. */
      s += '<g class="rsc-scroll">' +
        '<path d="M0 95 H660" stroke="' + CREAM + '" stroke-width="2" stroke-dasharray="10 10" opacity=".7"/></g>';
      // bottles, running past both edges
      for (var i = -1; i < 12; i++) {
        var x = -12 + i * 28;
        s += '<g transform="translate(' + x + ',56)">' +
          '<rect x="0" y="8" width="16" height="24" rx="3" fill="' + (i % 3 ? CREAM : TONE2) + '" stroke="' + INK + '" stroke-width="2"/>' +
          '<rect x="5" y="0" width="6" height="10" rx="2" fill="' + INK + '" opacity=".8"/>' +
          '</g>';
      }
      // the filling head
      s += '<g transform="translate(150,10)">' +
        '<rect x="-34" y="0" width="68" height="26" rx="4" fill="' + TONE + '" stroke="' + INK + '" stroke-width="2.4"/>' +
        '<rect x="-6" y="26" width="12" height="10" fill="' + INK + '"/>' +
        '<g class="rsc-drop"><circle cx="0" cy="42" r="4" fill="' + TONE2 + '"/></g>' +
        '<g class="rsc-drop-b"><circle cx="0" cy="42" r="3" fill="' + TONE2 + '"/></g>' +
        '</g>';
      return s;
    },

    /* ---- sleepers · cl-track-sleepers ----
       Track receding with sleepers under it, running off both edges. Sleepers
       ARE the counted quantity, so they are drawn in perspective and overlap
       toward the horizon where they become uncountable by construction. A gang
       hut sits beside the line. The only motion is a lifted sleeper swinging
       on the crane — one thing happening, no total. */
    sleepers: function () {
      var s = '';
      // sleepers first, in perspective, off both edges
      for (var i = -1; i < 14; i++) {
        var x = -20 + i * 26, w = 22 - (i % 4);
        s += '<rect x="' + x + '" y="78" width="' + w + '" height="30" rx="2" fill="' + TONE2 +
             '" stroke="' + INK + '" stroke-width="1.8"/>';
      }
      s += rails(84);
      s += rails(100);
      // the hut
      s += '<g transform="translate(46,32)">' +
        '<rect x="-26" y="0" width="52" height="40" rx="3" fill="' + MID + '" stroke="' + INK + '" stroke-width="2.4"/>' +
        '<path d="M-30 0 L0 -16 L30 0 Z" fill="' + TONE + '" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<rect x="-8" y="16" width="16" height="24" rx="2" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="1.8"/>' +
        '</g>';
      // the crane, one sleeper swinging
      s += '<g transform="translate(232,12)">' +
        '<path d="M0 0 V44 M0 6 H44" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M44 6 V20" stroke="' + INK + '" stroke-width="2"/>' +
        '<g transform="translate(44,20)"><g class="rsc-swing">' +
          '<rect x="-16" y="0" width="32" height="9" rx="2" fill="' + TONE + '" stroke="' + INK + '" stroke-width="2"/>' +
        '</g></g></g>';
      return s;
    },

    /* ---- washshed · cl-carriage-clean ----
       A carriage part-way through a wash shed, brushes turning. The counted
       quantity is CARRIAGES PER HOUR, which is a rate rather than a heap — and
       the carriage is deliberately cut by the shed at both ends, so there is no
       whole carriage to count and no sense of a queue. Brushes spin and water
       falls: a machine working at a speed. */
    washshed: function () {
      var s = '';
      s += rails(108);
      // the shed, framing the carriage at both ends
      s += '<rect x="0" y="10" width="320" height="94" rx="4" fill="none" stroke="' + INK + '" stroke-width="2.4"/>';
      s += '<rect x="0" y="10" width="42" height="94" fill="' + MID + '" stroke="' + INK + '" stroke-width="2.4"/>';
      s += '<rect x="278" y="10" width="42" height="94" fill="' + MID + '" stroke="' + INK + '" stroke-width="2.4"/>';
      // the carriage, running under both shed ends
      s += '<g transform="translate(60,44)">' +
        '<rect x="0" y="0" width="200" height="52" rx="6" fill="' + TONE2 + '" stroke="' + INK + '" stroke-width="2.6"/>' +
        '<rect x="14" y="10" width="34" height="20" rx="3" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<rect x="62" y="10" width="34" height="20" rx="3" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<rect x="110" y="10" width="34" height="20" rx="3" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<rect x="158" y="10" width="34" height="20" rx="3" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<circle cx="42" cy="58" r="6" fill="' + INK + '"/><circle cx="164" cy="58" r="6" fill="' + INK + '"/>' +
        '</g>';
      // brushes
      s += '<g transform="translate(96,36)"><g class="rsc-roller">' +
        '<circle r="18" fill="none" stroke="' + TONE + '" stroke-width="7" stroke-dasharray="6 7"/></g></g>';
      s += '<g transform="translate(214,36)"><g class="rsc-roller rsc-roller-b">' +
        '<circle r="18" fill="none" stroke="' + TONE + '" stroke-width="7" stroke-dasharray="6 7"/></g></g>';
      // water
      s += '<g transform="translate(150,20)"><g class="rsc-drop"><circle r="3.4" fill="' + SHADE + '"/></g></g>';
      s += '<g transform="translate(178,20)"><g class="rsc-drop-b"><circle r="3" fill="' + SHADE + '"/></g></g>';
      return s;
    }
  };

  function has(name) { return Object.prototype.hasOwnProperty.call(ART, name); }

  function html(p) {
    var sc = p.scene;
    if (!sc || !has(sc.art)) return '';
    return '<figure class="scene rsc">' +
             '<div class="rsc-frame" role="img" aria-label="' + esc(sc.caption || '') + '">' +
               '<svg viewBox="0 0 320 130" xmlns="' + NS + '" class="rsc-svg" aria-hidden="true">' +
                 ART[sc.art]() +
               '</svg>' +
             '</div>' +
             '<figcaption class="sc-cap">' + esc(sc.caption || '') + '</figcaption>' +
           '</figure>';
  }

  global.ChallengeScenes = { html: html, has: has, names: Object.keys(ART) };
})(window);
