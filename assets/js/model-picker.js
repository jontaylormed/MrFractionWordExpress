/* ============================================================
   The Model Picker — "Which picture fits this story?"
   docs/COCKPIT.md, the fast path.

   Teachers found the old first read was a long run of multiple-choice
   questions before a student ever saw a picture, and one of them suggested
   the faster route this is: choose between visual models of the problem.
   Choosing the right one IS recognising the structure (PHILOSOPHY §2.4), so
   nothing about "recognise before you calculate" is given up — the question
   is just asked in pictures rather than in five sentences.

   FIVE SHAPES, ONE PER LINE, AND NO NUMBERS IN ANY OF THEM. The pictures are
   schematic on purpose: they show how amounts relate, never how big they are,
   because this screen is numberless like every screen of the first read. The
   captions describe the shape, not the line's name, so the choice is made by
   looking rather than by matching a word.

   The answer key and the "why not" text are not authored here: every problem
   already carries `ticketBooth.correctLine`, `whyCorrect`, and a `whyWrong`
   for each of the other four lines, enforced by the validator (VERIFICATION
   §33). Measured before building: all 30 single-situation problems carry all
   five, 150 texts, no gaps.
   ============================================================ */
(function (global) {
  'use strict';

  var INK = 'currentColor';
  function svg(body) {
    return '<svg class="mp-svg" viewBox="0 0 160 90" aria-hidden="true" focusable="false">' + body + '</svg>';
  }
  function label(x, y, t, anchor) {
    // 12 units: at the card's usual scale that is ~9px on screen, up from 6.4.
    return '<text x="' + x + '" y="' + y + '" font-size="12" text-anchor="' + (anchor || 'middle') +
           '" fill="' + INK + '">' + t + '</text>';
  }
  var box = function (x, y, w, h, fill) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="2" ' +
           'fill="' + (fill || 'none') + '" stroke="' + INK + '" stroke-width="1.6"/>';
  };
  var brace = function (x1, x2, y, up) {
    var d = up ? -6 : 6;
    return '<path d="M' + x1 + ' ' + y + ' v' + d + ' H' + x2 + ' v' + (-d) + '" fill="none" stroke="' + INK + '" stroke-width="1.3"/>';
  };
  var SOFT = 'rgba(44,34,20,.14)';

  var SHAPES = {
    partwhole: {
      caption: 'Parts that make up one whole',
      art: svg(brace(14, 146, 22, true) + label(80, 12, 'whole') +
               box(14, 28, 80, 26, SOFT) + box(94, 28, 52, 26) +
               label(54, 70, 'part') + label(120, 70, 'part'))
    },
    compare: {
      caption: 'Two amounts side by side, and the gap between them',
      art: svg(box(14, 14, 120, 20, SOFT) + box(14, 46, 70, 20, SOFT) +
               '<rect x="84" y="46" width="50" height="20" rx="2" fill="none" stroke="' + INK +
                 '" stroke-width="1.3" stroke-dasharray="3 3"/>' +
               brace(84, 134, 72, false) + label(109, 88, 'the gap'))
    },
    groups: {
      caption: 'Equal-sized groups that make a total',
      art: svg([14, 50, 86, 122].map(function (x) {
                 return box(x, 18, 30, 30) +
                   '<circle cx="' + (x + 9) + '" cy="27" r="3" fill="' + INK + '"/>' +
                   '<circle cx="' + (x + 21) + '" cy="27" r="3" fill="' + INK + '"/>' +
                   '<circle cx="' + (x + 15) + '" cy="39" r="3" fill="' + INK + '"/>';
               }).join('') + brace(14, 152, 56, false) + label(83, 76, 'total'))
    },
    change: {
      caption: 'A start, a change, and where it ends up',
      art: svg('<line x1="10" y1="60" x2="150" y2="60" stroke="' + INK + '" stroke-width="1.6"/>' +
               '<circle cx="40" cy="60" r="4" fill="' + INK + '"/>' +
               '<circle cx="120" cy="60" r="4" fill="none" stroke="' + INK + '" stroke-width="1.6"/>' +
               '<path d="M42 54 Q80 14 116 52" fill="none" stroke="' + INK + '" stroke-width="1.6"/>' +
               '<path d="M110 50 l7 3 l-1 -7" fill="none" stroke="' + INK + '" stroke-width="1.6"/>' +
               label(40, 78, 'start') + label(80, 22, 'change') + label(120, 78, 'end'))
    },
    ratio: {
      caption: 'Two kinds of thing that grow together',
      art: svg('<line x1="14" y1="26" x2="150" y2="26" stroke="' + INK + '" stroke-width="1.6"/>' +
               '<line x1="14" y1="62" x2="150" y2="62" stroke="' + INK + '" stroke-width="1.6"/>' +
               [14, 50, 86, 122].map(function (x) {
                 return '<line x1="' + x + '" y1="21" x2="' + x + '" y2="31" stroke="' + INK + '" stroke-width="1.6"/>' +
                        '<line x1="' + x + '" y1="57" x2="' + x + '" y2="67" stroke="' + INK + '" stroke-width="1.6"/>' +
                        '<line x1="' + x + '" y1="33" x2="' + x + '" y2="55" stroke="' + INK + '" stroke-width=".8" stroke-dasharray="2 2"/>';
               }).join('') +
               label(152, 16, 'this', 'end') + label(152, 82, 'goes with that', 'end'))
    }
  };

  function correctLine(p) {
    return (p.ticketBooth && p.ticketBooth.correctLine) || p.line;
  }

  /* Seeded per problem AND number set, like `balancedOrder`: a fixed order per
     problem becomes a pattern a returning student can learn. */
  function order(p) {
    var keys = Object.keys(SHAPES).filter(function (k) { return MF.LINES[k]; });
    // The set's own values distinguish one materialisation from another.
    var nums = p.problem && p.problem.numbers || {};
    var set = Object.keys(nums).map(function (n) { return nums[n].value; }).join(',');
    return MF.seededShuffle(keys, p.id + '|pick|' + set + '|');
  }

  function html(p) {
    return '<ul class="mp-grid" id="mp-grid">' + order(p).map(function (k) {
      var s = SHAPES[k];
      return '<li><button class="mp-card" type="button" data-line="' + k + '">' +
        s.art + '<span class="mp-cap">' + s.caption + '</span></button></li>';
    }).join('') + '</ul>';
  }

  /* The "why" text, with EVERY NUMBER MASKED, because this screen is
     numberless. Eight of the 150 carry a number (`{{n2}} letters in every
     bag`), and by the time a station has the problem those tokens have been
     filled with real values by `MF.materialize` — so masking by token, the way
     the story is masked, would let them straight through. Masking every digit
     run is stricter than needed and cannot miss. */
  function why(p, k) {
    var tb = p.ticketBooth || {};
    var t = k === correctLine(p) ? tb.whyCorrect
          : ((tb.distractors || []).filter(function (d) { return d.line === k; })[0] || {}).whyWrong;
    if (!t) return '';
    // Existing entities (&ndash; in "Part–Whole") are left as entities; every
    // other `&` and all of < > " are escaped. See `esc` in stations.js.
    var safe = String(t)
      .replace(/&(?!(?:#\d+|#x[0-9a-f]+|[a-z][a-z0-9]*);)/gi, '&amp;')
      .replace(/[<>"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
    safe = MF.renderText(safe, p.problem.numbers, true);
    // Entities are matched first and passed through, so `&#8212;` keeps its digits.
    return safe.replace(/&#?[a-z0-9]+;|\d+(?:[.,\/]\d+)*%?/gi, function (m) {
      if (m.charAt(0) === '&') return m;
      return '<span class="masked" aria-hidden="true">' + m.replace(/./g, '█') +
             '</span><span class="visually-hidden">some number</span>';
    });
  }

  global.ModelPicker = { html: html, why: why, correctLine: correctLine, SHAPES: SHAPES };
})(window);
