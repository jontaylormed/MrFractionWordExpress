/* ============================================================
   The Model Picker — "Which picture fits this story?"
   docs/COCKPIT.md, the fast path.

   Teachers found the old first read was a long run of multiple-choice
   questions before a student ever saw a picture, and one of them suggested
   the faster route this is: choose between visual models of the problem.
   Choosing the right one IS recognising the structure (PHILOSOPHY §2.4), so
   nothing about "recognise before you calculate" is given up — the question
   is just asked in pictures rather than in five sentences.

   TWO QUESTIONS, CHOSEN BY THE RIDE (Cycle 31, teacher agent, change a):
   - On the Grand Tour and the percent route the line is unknown, so the
     student picks which of the FIVE SHAPES fits — the situation.
   - On a single-line ride the line is known (they chose it), so picking its
     shape would be no question at all. They are shown that line's picture
     several times instead, each with the `?` in a different place, and pick
     where the missing piece is. That is the Ticket Booth's question, asked in
     pictures, and it is the hard part of these problems.

   NO NUMBERS AND NO NUMBER WORDS anywhere here — this is a numberless screen,
   and the sweep checks spelled-out numbers against every answer.
   ============================================================ */
(function (global) {
  'use strict';

  var INK = 'currentColor';
  var SOFT = 'rgba(44,34,20,.16)';
  var MARK = 'var(--orange-deep)';
  function svg(body) {
    return '<svg class="mp-svg" viewBox="0 0 160 90" aria-hidden="true" focusable="false">' + body + '</svg>';
  }
  function rect(x, y, w, h, fill, dash) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="2" fill="' + (fill || 'none') +
           '" stroke="' + INK + '" stroke-width="1.6"' + (dash ? ' stroke-dasharray="3 3"' : '') + '/>';
  }
  function brace(x1, x2, y, up) {
    var d = up ? -6 : 6;
    return '<path d="M' + x1 + ' ' + y + ' v' + d + ' H' + x2 + ' v' + (-d) + '" fill="none" stroke="' + INK + '" stroke-width="1.3"/>';
  }
  function line(x1, y1, x2, y2, w, dash) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + INK +
           '" stroke-width="' + (w || 1.6) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  // The missing piece, drawn the same way on every picture.
  function q(x, y) {
    return '<circle cx="' + x + '" cy="' + y + '" r="9" fill="' + MARK + '"/>' +
           '<text x="' + x + '" y="' + (y + 5) + '" font-size="14" font-weight="700" text-anchor="middle" fill="#fff">?</text>';
  }

  /* ---------- The five shapes (change e: redrawn, recaptioned) ----------
     Captions say what tells each shape apart from the others — the same
     distinctions the feedback below draws — rather than story words like
     "total" or "whole", which turned the choice into matching a keyword. No
     words inside the pictures for the same reason. */
  var parts = function (q1, q2, qw) {
    return brace(14, 146, 22, true) + (qw ? q(80, 12) : '') +
      rect(14, 28, 80, 26, q1 ? 'none' : SOFT, q1) + rect(94, 28, 52, 26, q2 ? 'none' : SOFT, q2) +
      (q1 ? q(54, 41) : '') + (q2 ? q(120, 41) : '');
  };
  /* Compare is drawn so it works for "times as many" and "percent more" too:
     the smaller amount sits against the larger one, and a dashed copy of it
     shows the larger measured in terms of the smaller — not only a gap. */
  var compare = function (qL, qS, qG) {
    return rect(14, 14, 132, 20, qL ? 'none' : SOFT, qL) +
      rect(14, 50, 44, 20, qS ? 'none' : SOFT, qS) +
      rect(58, 50, 44, 20, 'none', true) + rect(102, 50, 44, 20, 'none', true) +
      line(58, 40, 146, 40, 1.2, '2 3') +
      (qL ? q(80, 24) : '') + (qS ? q(36, 60) : '') + (qG ? q(102, 40) : '');
  };
  var groups = function (qN, qS, qT) {
    var s = [14, 50, 86, 122].map(function (x) {
      return rect(x, 18, 28, 28, qS ? 'none' : SOFT, qS) +
        (qS ? '' : '<circle cx="' + (x + 9) + '" cy="27" r="3" fill="' + INK + '"/>' +
                   '<circle cx="' + (x + 19) + '" cy="27" r="3" fill="' + INK + '"/>' +
                   '<circle cx="' + (x + 14) + '" cy="37" r="3" fill="' + INK + '"/>');
    }).join('');
    return s + brace(14, 150, 54, false) +
      // How many groups: the ? sits over the row, where you would count them.
      (qS ? q(28, 32) : '') + (qN ? q(80, 9) : '') + (qT ? q(82, 76) : '');
  };
  /* Change as BEFORE and AFTER, not a jump to the right on a number line,
     which read as "more" on a story where the amount goes down. */
  var change = function (qS, qC, qE) {
    return rect(10, 30, 46, 30, qS ? 'none' : SOFT, qS) +
      '<path d="M62 45 H96" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M90 39 l7 6 l-7 6" fill="none" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<rect x="66" y="20" width="26" height="14" rx="7" fill="' + (qC ? 'none' : SOFT) + '" stroke="' + INK + '" stroke-width="1.3"' + (qC ? ' stroke-dasharray="3 3"' : '') + '/>' +
      rect(104, 30, 46, 30, qE ? 'none' : SOFT, qE) +
      (qS ? q(33, 45) : '') + (qC ? q(79, 27) : '') + (qE ? q(127, 45) : '');
  };
  /* Ratio's two rows have DIFFERENT tick spacing: different kinds of thing,
     different units, locked together. Identical spacing hid exactly that. */
  var ratio = function (qU, qM) {
    var top = [14, 50, 86, 122], bot = [14, 34, 54, 74];
    return line(14, 24, 150, 24) + line(14, 64, 150, 64) +
      top.map(function (x) { return line(x, 19, x, 29); }).join('') +
      bot.map(function (x) { return line(x, 59, x, 69); }).join('') +
      top.map(function (x, i) { return line(x, 31, bot[i], 57, .8, '2 2'); }).join('') +
      (qU ? q(34, 78) : '') + (qM ? q(122, 12) : '');
  };

  var SHAPES = {
    partwhole: { caption: 'A whole, and the pieces it is made of', art: svg(parts()) },
    compare:   { caption: 'Separate amounts, measured against each other', art: svg(compare()) },
    groups:    { caption: 'The same amount, repeated', art: svg(groups()) },
    change:    { caption: 'An amount before and after something happens', art: svg(change()) },
    ratio:     { caption: 'Different kinds of thing, locked together', art: svg(ratio()) }
  };

  /* ---------- Where is the missing piece? (change a) ---------- */
  var VARIANTS = {
    change:    { start:  { caption: 'The start is missing', art: svg(change(true)) },
                 change: { caption: 'What happened is missing', art: svg(change(false, true)) },
                 end:    { caption: 'The end is missing', art: svg(change(false, false, true)) } },
    compare:   { larger: { caption: 'The bigger amount is missing', art: svg(compare(true)) },
                 smaller:{ caption: 'The amount it is measured against is missing', art: svg(compare(false, true)) },
                 gap:    { caption: 'How they compare is missing', art: svg(compare(false, false, true)) } },
    groups:    { groups: { caption: 'How many groups is missing', art: svg(groups(true)) },
                 size:   { caption: 'The size of each group is missing', art: svg(groups(false, true)) },
                 total:  { caption: 'The total is missing', art: svg(groups(false, false, true)) } },
    partwhole: { part:   { caption: 'A piece is missing', art: svg(parts(false, true)) },
                 whole:  { caption: 'The whole is missing', art: svg(parts(false, false, true)) } },
    ratio:     { unit:   { caption: 'How much goes with just a single one is missing', art: svg(ratio(true)) },
                 missing:{ caption: 'A matching amount further along is missing', art: svg(ratio(false, true)) } }
  };

  /* Which slot is missing, read from the problem's own `unknownCar` (and, on
     two lines, its `ticketBooth.unknownCarAnswer`) — never authored again
     here. Returns null for anything it cannot place, and the screen then asks
     the five-shape question instead of guessing. */
  function slotOf(p) {
    var u = String(p.unknownCar || ''), line = p.line;
    var ans = String((p.ticketBooth && p.ticketBooth.unknownCarAnswer) || '');
    if (line === 'change') return u === 'start' ? 'start' : u === 'result' ? 'end' : /change|difference/.test(u) ? 'change' : null;
    if (line === 'compare') return u === 'larger' ? 'larger' : (u === 'smaller' || u === 'referent') ? 'smaller' : u === 'difference' ? 'gap' : null;
    if (line === 'groups') return u === 'groups' ? 'groups' : u === 'size' ? 'size' : (u === 'total' || u === 'result') ? 'total' : null;
    if (line === 'partwhole') return /^whole$|^whole-from/.test(u) ? 'whole' : /part|fraction/.test(u) ? 'part' : null;
    // A rate problem asking for "one hour" / "one single bag" wants the unit amount.
    if (line === 'ratio') return /\b(one|single|each|per)\b/i.test(ans) || u === 'unit-rate' ? 'unit' : 'missing';
    return null;
  }

  function correctLine(p) {
    return (p.ticketBooth && p.ticketBooth.correctLine) || p.line;
  }

  /* Seeded per problem AND number set, like `balancedOrder`: a fixed order per
     problem becomes a pattern a returning student can learn. */
  function seed(p, tag) {
    var nums = p.problem && p.problem.numbers || {};
    var set = Object.keys(nums).map(function (n) { return nums[n].value; }).join(',');
    return p.id + '|' + tag + '|' + set + '|';
  }

  /* The question this ride asks. `rideLine` is the line the student chose
     (app.js sets it before rendering); MIXED, PERCENT, the island and a missing
     value all ask the five-shape question. */
  function modeFor(p, rideLine) {
    if (p.pair || !rideLine || !MF.LINES[rideLine] || rideLine !== p.line) return 'shape';
    return slotOf(p) && VARIANTS[p.line] ? 'slot' : 'shape';
  }

  function card(key, item, attr) {
    return '<li><button class="mp-card" type="button" ' + attr + '="' + key + '">' +
      item.art + '<span class="mp-cap">' + item.caption + '</span></button></li>';
  }

  function html(p, rideLine) {
    if (modeFor(p, rideLine) === 'slot') {
      var V = VARIANTS[p.line];
      return '<ul class="mp-grid mp-slots" id="mp-grid" data-mode="slot">' +
        MF.seededShuffle(Object.keys(V), seed(p, 'slot')).map(function (k) { return card(k, V[k], 'data-line'); }).join('') +
        '</ul>';
    }
    var keys = Object.keys(SHAPES).filter(function (k) { return MF.LINES[k]; });
    return '<ul class="mp-grid" id="mp-grid" data-mode="shape">' +
      MF.seededShuffle(keys, seed(p, 'pick')).map(function (k) { return card(k, SHAPES[k], 'data-line'); }).join('') +
      '</ul>';
  }

  function answerFor(p, rideLine) {
    return modeFor(p, rideLine) === 'slot' ? slotOf(p) : correctLine(p);
  }

  /* ---------- What a pick is told (change d) ----------
     The per-problem Ticket Booth texts were written for a different screen:
     14–17 of the 120 "why not" texts named the right line, so the first wrong
     pick handed it over, and 33 named an operation before the Plan. These are
     the replacement, and they are SAFE BY CONSTRUCTION: a wrong pick is told
     what the shape IT picked means and asked whether the story does that —
     nothing about the right answer, no operation, no line name, no number
     word. The Ticket Booth keeps its own texts, as a tool. */
  var SHAPE_ASK = {
    change:    'That picture is an amount before and after something happens to it. Does any amount in this story end up different from how it started?',
    compare:   'That picture is separate amounts that both exist at once, held up against each other. Is this story measuring things side by side?',
    groups:    'That picture is the same amount, repeated — every group the same size. Does this story have groups that are all alike?',
    partwhole: 'That picture is a whole, made of the pieces in it, all at a single moment. Is there a whole in this story, with pieces that make it up?',
    ratio:     'That picture is different kinds of thing locked together, so changing either drags the other with it. Are different kinds of thing tied together here?'
  };
  var SHAPE_YES = {
    change:    'An amount, and what happens to it.',
    compare:   'Separate amounts, measured against each other.',
    groups:    'The same amount, repeated.',
    partwhole: 'A whole, and the pieces it is made of.',
    ratio:     'Different kinds of thing, locked together.'
  };
  var SLOT_ASK = 'Read the question again. Is that the piece it asks for, or is that one the story already gives you?';

  function why(p, k, rideLine) {
    var slot = modeFor(p, rideLine) === 'slot';
    var right = k === answerFor(p, rideLine);
    if (slot) return right ? 'That is the piece the question is asking for.' : SLOT_ASK;
    return right ? SHAPE_YES[k] || '' : SHAPE_ASK[k] || '';
  }

  /* The checklist, short and as questions, for the feedback viewport while a
     student is choosing. Questions only — no "if yes, it is…": the student
     makes that link by looking from the question to the picture beside it.
     No number words: this is a numberless screen. */
  var ASK_SHAPE = [
    ['change', 'Does an amount change?'],
    ['compare', 'Are amounts compared?'],
    ['groups', 'Is an amount repeated?'],
    ['partwhole', 'Is a whole split up?'],
    ['ratio', 'Are different kinds linked?']
  ];
  var ASK_SLOT = [
    'What does the story give you?',
    'What does the question ask for?',
    'Which picture has its ? there?'
  ];
  function askHTML(slotMode) {
    var items = slotMode
      ? ASK_SLOT.map(function (q) { return '<li><span>' + q + '</span></li>'; })
      : ASK_SHAPE.filter(function (x) { return SHAPES[x[0]]; }).map(function (x) {
          return '<li><span class="ck-ask-thumb">' + SHAPES[x[0]].art + '</span><span>' + x[1] + '</span></li>';
        });
    // The label leads the same row, so the whole set can sit on a slim bar.
    return '<ul class="ck-askset' + (slotMode ? ' ck-askset-slot' : '') + '">' +
      '<li class="ck-askset-head"><strong>Ask yourself:</strong></li>' + items.join('') + '</ul>';
  }

  global.ModelPicker = {
    askHTML: askHTML,
    html: html, why: why, correctLine: correctLine, answerFor: answerFor,
    modeFor: modeFor, slotOf: slotOf, SHAPES: SHAPES, VARIANTS: VARIANTS
  };
})(window);
