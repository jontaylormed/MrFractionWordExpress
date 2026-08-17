/* ============================================================
   Render sweep — test scaffolding, NOT part of the site.

   Load it into a page that already has the site's scripts:

     var s = document.createElement('script');
     s.src = '/tools/sweep.js'; document.head.appendChild(s);

   then call SWEEP.report() in the console.

   WHY THIS EXISTS
   MF.validate() reads manifests. The defects that have actually shipped on
   this project lived in the COMPOSITION — what one file renders, crossed with
   when another renders it (VERIFICATION.md 13). The only question that finds
   those is "what does the student's screen contain at this moment?", and the
   only way to answer it is to render the phase and read the output.

   It runs every phase of every problem in every number set, so a defect that
   lives in one set out of four cannot hide behind the three that are fine.

   TWO INSTRUMENT TRAPS, BOTH HIT WHILE WRITING THIS (VERIFICATION.md 2)

   1. The station root was appended with `display:none`. innerText on a
      display:none subtree silently degrades to textContent, so every hidden
      node reported as visible. That produced nine false leaks at once —
      Model Yard per-part values that a student only sees after marking a part
      were read as printed on arrival. The root is now rendered off-screen and
      laid out, with an explicit width, because the browser pane also reports
      clientWidth 0 when it has not been laid out.

   2. Forcing the 'route' phase on a problem with no signalBox.secondRoute
      threw on all 15 of them. The station never goes there — nextAfterPlan()
      skips it. The sweep now visits a phase only if the real app would.

   A run that reports nothing is a finding, not a pass. The leak scan is known
   to fire: it caught rr-van-hours naming the speed in its Ticket Booth, two
   screens before the Engine Room asked for it.

   IF YOU DRIVE A STATION BY HAND, PASS A REAL METRICS OBJECT
   `new Stations.Station(p, role, {}, cb)` renders fine but breaks the moment
   you CLICK anything: the handlers do `self.m.misconceptions.push(...)` and
   `self.m.estimates.push(...)`, so an empty object throws inside the listener
   and the handler aborts *before* it writes its feedback. The symptom is a
   feedback panel that stays empty on a wrong answer, which reads exactly like
   a missing misconception. Pass `{estimates:[],hints:[],misconceptions:[],
   schema:[]}` — the shape app.js uses. This sweep only renders, never clicks,
   which is why `{}` is safe here and not for you.

   WHERE TO PLANT A DEFECT WHEN TESTING THIS (VERIFICATION.md 19)
   Plant it in a field that is on the screen AT RENDER TIME. Two plants into
   `threeReads.read1.modelAnswer` both reported NOT CAUGHT, and the scan was
   fine — phRead1 only reveals the model answer after the student clicks, so
   the planted text never reached the screen being scanned. The same trap as
   `estimate.modelReasoning`, which is feedback shown after the estimate is
   locked in. `ticketBooth.whyCorrect` and the read3 option texts are rendered
   immediately and are safe places to plant. Confirm the surface renders your
   text BEFORE concluding the check missed it.

   READ 1 IS NO LONGER ONE OF THOSE BLIND SPOTS (2026-08-03)
   The Platform Check put real teaching copy behind that same click, so leaving
   it unscanned was no longer tolerable — a whole phase of authored explanation
   would have been exempt from the leak scan by accident of interaction design.
   `render()` now sets `st.expandAll`, and phRead1 reveals the model answer,
   opens the check and lands its resolution in one pass. Both `modelAnswer` and
   `platformCheck.why` are now plantable and were confirmed so: a digit plant
   and a spelled-out plant into `platformCheck.why` on pw-soup-serving both
   came back as `[read1]` hits, and cleared when restored.

   The general lesson, and it will apply again: A PHASE THAT REVEALS ITSELF ON
   CLICK IS INVISIBLE TO A SWEEP THAT ONLY RENDERS. When you add progressive
   disclosure to a phase, come here and make the sweep open it.
   ============================================================ */
(function (global) {
  'use strict';

  /* Spelled-out numbers leak answers as readily as digits do, and shuffling,
     levelling and tokenising all leave them untouched. Cycle 6 shipped four of
     them in brand-new content.

     THIS WAS A HAND-KEPT LIST OF THIRTY-ODD VALUES, AND IT ENDED WITH THE WORDS
     "extend this list as content needs it." Nobody ever did. A value absent
     from it was not merely unchecked — it PASSED, silently and with a clean
     report, which is the failure this project keeps re-finding: a check that is
     measuring nothing looks exactly like a check that is finding nothing
     (VERIFICATION.md 2 and 25).

     Found 2026-08-08 while verifying the Compare Line's new illustrations. A
     caption reading "the express platform has thirty-one benches" swept CLEAN
     on all four number sets, on both numberless screens, while the same caption
     with "31" in it produced eight hits. 31 was not on the list. Neither were
     23, 26, 27, 29, 31, 34, 41, 43 or 49 — which is most of the Compare Line's
     numbers, so the spelled-out half of the scan was inert for a whole line.

     The words are now DERIVED, so there is no list to fall behind. A value the
     scan cannot form a word for (a fraction, a decimal, anything above 999) is
     skipped exactly as before — but no whole number is skipped for want of
     someone remembering to type it in. */
  var ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
              'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
              'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy',
              'eighty', 'ninety'];

  function numberWord(n) {
    if (typeof n !== 'number' || !isFinite(n) || n < 0 || n > 999 || n % 1 !== 0) return null;
    if (n < 20) return ONES[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');
    return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + numberWord(n % 100) : '');
  }

  /* Content does not agree with itself about separators — "twenty-one",
     "twenty one" and "one hundred and four" against "one hundred four" are all
     the same leak, and matching only the form this file happens to generate
     would reopen the hole in a smaller shape. So the pattern joins the parts
     loosely and treats "and" as optional. */
  var WSEP = '[\\s-]+(?:and[\\s-]+)?';
  function wordPattern(n) {
    var w = numberWord(n);
    if (!w) return null;
    return '\\b' + w.split(/[-\s]+/).filter(function (t) { return t !== 'and'; }).join(WSEP) + '\\b';
  }

  /* Every phase the student passes through BEFORE the Engine Room.
     `demo` is the Test Track, and it is the single most leak-prone screen on
     the site — it exists to demonstrate the strategy, which is one slip away
     from performing it. Adding a phase here is not optional bookkeeping: a
     phase absent from this map is a phase the leak scan silently ignores. */
  /* `solve` is in this list, which reads oddly for a scan named PRE_SOLVE.
     It belongs: the sweep renders the Engine Room in its INITIAL state, before
     any answer is typed, and on that screen the step's answer is still a thing
     the student has not been asked for yet. Leaving it out gave the Engine Room
     a blind spot, and a worked example printed the full solution — "3 × 3 = 9
     cups" — directly above the box asking for 9, on three problems and all
     four of their number sets. User-found, 2026-08-04. */
  /* `check-unsure` is in this list for the same reason `solve` is, and the
     reason is worth spelling out because the phase is NAMED after the one
     screen that is allowed to print the answer.

     The Arrivals Board proper is post-solve: it opens by stating the answer,
     which is its job, and that is why `check` is absent here. The board a
     student reaches when they are NOT sure is the opposite — they have not
     solved it, they are there to check their own number against their own
     estimate, and printing the answer would hand over the very thing they came
     to work out. Judged by what the student has done rather than by which
     phase string it renders under, it is pre-solve, so it is scanned as
     pre-solve. A check encodes the question its author was asking that day
     (VERIFICATION.md §28); this one has to ask the newer question too. */
  var PRE_SOLVE = { read1: 1, platform: 1, read2: 1, read3: 1, ticket: 1, plan: 1, demo: 1,
                    solve: 1, 'check-unsure': 1, 'ticket-hidden': 1,
                    /* The Crossover Read. It renders four authored strings and
                       the whole story, before anything has been computed, so it
                       is exactly the kind of screen this scan exists for. */
                    crossover: 1 };

  /* CHALLENGE PROBLEMS ADD PHASES THAT CANNOT BE LISTED, so this is a function
     and not another key in the map above. `solve@2`, `solve@3` … are the Engine
     Room at a later step, one per step the problem has, and how many that is
     depends on the problem. A literal list would exempt step 4 the day someone
     writes a problem with four steps — which is this project's most expensive
     recorded defect class, seven files and counting. */
  function preSolve(phase) { return !!PRE_SOLVE[phase] || /^solve@\d+$/.test(phase); }

  /* A Challenge problem is one carrying a `pair`. Nothing else on the site has
     one, which is what keeps every change below OFF the existing 30 — see the
     scoping note on `visibleAnswers`. */
  function isPaired(p) { return !!(p && p.pair); }

  function render(ids) {
    var res = [];
    (ids || Object.keys(MF.problems)).forEach(function (id) {
      var base = MF.problems[id], n = MF.setCount(base);
      for (var i = 0; i < n; i++) {
        var p = MF.materialize(base, i);
        /* A paired problem does not visit `platform`; the Crossover Read stands
           in its place, and `phRead1` forks to one or the other. Rendering both
           would scan a screen no student can reach and — worse — would report
           the Platform Check's line-naming leak on a problem that never shows
           it. Visit a phase only if the real app would, which is this file's
           own standing rule. */
        /* Three cases, matching `phRead1`'s own fork exactly: an ordinary
           problem visits `platform`, a paired teaching stop visits `crossover`
           instead, and a paired UNSTAFFED halt visits neither — nobody walks
           that student to the seam. Rendering a screen the app would not is
           this file's oldest rule; here it would also scan copy that problem
           does not author. */
        /* THE PHASE LIST IS NOT REBUILT HERE ANY MORE — it is asked for.
           `Stations.phaseChain` is the one place the fade ladder is written,
           and this file used to keep a second copy of the same fork. They
           agreed only while somebody remembered to change both, and on
           2026-08-16 nobody did: the halt's route changed and this list went on
           scanning three screens no student could reach, reporting leaks and
           numberless breaks on copy those problems author but never show.

           A checker with its own idea of what the app does is not checking the
           app. */
        var unaided = isPaired(p) && p.fadeLevel === 'independent';
        var phases = Stations.phaseChain(p).slice();
        // Visit a phase only if the real app would — nextAfterPlan decides this.
        if (global.TestTrack && TestTrack.applies(p)) phases.push('demo');
        phases = phases.concat(['solve', 'check']);
        /* THE ARRIVALS BOARD HAS TWO FACES NOW, and this sweep could only ever
           see one of them. `phCheck` branches on `st.solvedWrong` and renders a
           different screen when a student brings an answer that is not right —
           a screen with its own authored copy, its own controls and its own
           chance to throw. Rendering `check` alone would have left all of it
           exempt from every scan here, which is the sweep header's own standing
           lesson arriving for the third time. Not a real phase: `st.phase` stays
           'check' and the app never routes to a string called this. */
        /* NOT ON AN UNSTAFFED HALT. This screen is reached by taking a wrong
           answer to the board, and `phSolve` only offers that route when an
           estimate exists — the whole screen compares the two. A halt sets no
           estimate, so no student can arrive here, and rendering it would scan
           a screen the app cannot produce. */
        if (!unaided) phases.push('check-unsure');
        /* THE TICKET BOOTH ALSO HAS TWO FACES. On the percent route and the
           Grand Tour it asks which of the five is hiding under the per cent,
           and withholds the box naming the line until it is answered. Nothing
           here sets `rideLine`, so the sweep only ever saw the ordinary booth —
           and the new one is precisely where a leak would matter, because the
           whole screen is built to keep the line unsaid. Percent problems only;
           on anything else the branch cannot fire. */
        if (p.surface === 'percent') phases.push('ticket-hidden');

        /* THE SECOND HALF OF A CHALLENGE PROBLEM IS NOT RENDERED BY ANYTHING
           ABOVE, AND THAT IS THE REAL GAP.

           This sweep renders the Engine Room in its INITIAL state — step 1 —
           and only step 1. On the existing 30 that is the right screen to
           scan and the later steps are a student's own working. On a
           Challenge problem it means the ENTIRE SECOND SITUATION is never
           rendered and never scanned: the half that legitimately names the
           transfer, and the half where a leak of the final answer would hide.

           So the exemption in `visibleAnswers` is not the whole job and would
           be actively dangerous alone — it would relax a rule over screens
           this file has never looked at, which is `0 faults` and `0 subjects`
           printing identically all over again.

           Paired problems only. The existing 30 are rendered exactly as they
           were, on exactly the phases they were, so their baseline cannot
           move. Extending this to the six two-step problems on the mainland is
           a separate decision with its own re-measurement. */
        if (isPaired(p)) {
          var stepN = ((p.engineRoom || {}).steps || []).length;
          for (var sN = 2; sN <= stepN; sN++) phases.push('solve@' + sN);
        }

        var st = new Stations.Station(p, (p.stationRoles && p.stationRoles[0]) || 'reading', {}, function () {});
        st.legIndex = 0; st.legTotal = 3;
        /* Read 1 hides its model answer and its whole Platform Check behind a
           click, and this sweep never clicks. That blind spot is not theoretical:
           the two planted defects recorded in the header above went into
           read1.modelAnswer and both came back NOT CAUGHT. expandAll renders the
           revealed state so the leak scan reads what the student reads. */
        st.expandAll = true;
        var root;
        try { root = st.render(); }
        catch (e) { res.push({ id: id, set: i + 1, phase: 'render', err: String(e) }); continue; }

        root.style.cssText = 'position:absolute;left:-99999px;top:0;width:900px';
        document.body.appendChild(root);
        phases.forEach(function (ph) {
          try {
            /* THE HIDDEN-LINE BOOTH NEEDS ITS OWN STATION OBJECT, and finding
               out why cost a round trip worth recording.

               `rideLine` is read in TWO places: `phTicket`, which runs per
               phase, and `Station.render()`, which builds the station header
               once. This loop reuses one station for every phase and sets
               `rideLine` inside it — after `render()` has already run. So the
               phase came out right and the header came out wrong, and the new
               tell-check dutifully reported sixteen leaks that no student can
               ever see: the app sets `rideLine` BEFORE `render()` (app.js,
               nextStation) and its header is correct.

               A harness that assembles the screen in a different ORDER from the
               app is not looking at the same object the student is — the shape
               of every instrument error on this project (VERIFICATION.md §25).
               So this phase gets a station built the way the app builds one. */
            if (ph === 'ticket-hidden') {
              var st2 = new Stations.Station(p, (p.stationRoles && p.stationRoles[0]) || 'reading', {}, function () {});
              st2.legIndex = 0; st2.legTotal = 3; st2.expandAll = true;
              st2.rideLine = MF.PERCENT;
              var r2 = st2.render();
              r2.style.cssText = 'position:absolute;left:-99999px;top:0;width:900px';
              document.body.appendChild(r2);
              st2.phase = 'ticket'; st2.renderPhase();

              var clone2 = r2.cloneNode(true);
              var oo = clone2.querySelector('#hidden-line'); if (oo) oo.remove();
              var cq = clone2.querySelector('#carq'); if (cq) cq.remove();
              var blob2 = (clone2.textContent || '') + ' ' +
                [].map.call(clone2.querySelectorAll('[aria-label]'), function (n) {
                  return n.getAttribute('aria-label');
                }).join(' ');
              var own2 = MF.LINES[p.line], tells2 = [];
              if (own2 && blob2.indexOf(own2.name) > -1) tells2.push('names the line "' + own2.name + '"');
              if (own2 && own2.form && blob2.indexOf(own2.form) > -1)
                tells2.push('shows the line form "' + own2.form + '"');

              res.push({ id: id, set: i + 1, phase: ph, p: p, tells: tells2,
                         text: st2.host().innerText || '',
                         all: st2.host().textContent || '',
                         labels: [].map.call(st2.host().querySelectorAll('[aria-label]'),
                           function (n) { return n.getAttribute('aria-label'); }).join(' ') });
              r2.remove();
              return;
            }
            /* `solve@N` is the Engine Room at step N. The station reads
               `stepIndex` when it renders, so this is the whole mechanism —
               but it must be set BEFORE renderPhase, and it must be reset for
               every other phase, because one station object is reused across
               all of them. */
            var atStep = /^solve@(\d+)$/.exec(ph);
            st.estimate = 1; st.solved = 1; st.stepIndex = atStep ? (+atStep[1] - 1) : 0;
            /* The unsure board prints the student's OWN two numbers, so the
               values injected here land on the screen and would be read by the
               leak scan as though the content had put them there. They are
               deliberately absurd — no problem on this site answers 987654 or
               estimates 123456 — so a hit on this screen is always authored
               copy and never the harness talking to itself (VERIFICATION.md
               §25: say what the instrument is looking at). */
            st.solvedWrong = (ph === 'check-unsure');
            if (st.solvedWrong) {
              st.estimate = 123456; st.estimateRaw = '123456';
              st.solved = 987654;   st.solvedRaw = '987654';
            }
            /* `rideLine` is what decides which booth renders. MF.PERCENT can
               never equal a problem's own line, so setting it turns the hidden
               question on; clearing it restores the ordinary booth for every
               other phase of this same station object. */
            st.rideLine = (ph === 'ticket-hidden') ? MF.PERCENT : null;
            st.phase = (ph === 'ticket-hidden') ? 'ticket'
                     : (ph === 'check-unsure')  ? 'check'
                     : atStep                   ? 'solve' : ph;
            st.renderPhase();
            /* MR FRACTION IS NO LONGER INSIDE THE STATION.
               He used to render inline, so `st.host()` contained everything he
               said and the leak scans covered him for free. He is a floating
               companion now (companion.js), pinned outside the station root —
               and the moment that changed, a digit planted in his dialogue on a
               numberless screen stopped being caught. Verified by planting one:
               the sweep reported "0 (none)" while he was saying "31 benches".

               Moving the subject and leaving the check pointed at the old place
               is this project's most-repeated defect. His text is folded back in
               below, and ONLY when the companion is actually visible — reading a
               hidden bubble would invent leaks for words no student can see,
               which is the mirror-image mistake. */
            var comp = document.getElementById('mf-companion');
            var compVisible = comp && !comp.hidden;
            /* textContent, NOT innerText, and deliberately. innerText forces a
               style and layout flush on every call; across 912 screens that
               took the sweep from seconds to a timeout. The usual reason to
               prefer innerText here — that it returns '' for hidden content —
               does not apply, because the `compVisible` guard above has already
               established that this bubble is on screen. */
            var compText = compVisible ? (comp.textContent || '') : '';
            var compLabels = compVisible
              ? [].map.call(comp.querySelectorAll('[aria-label]'), function (n) { return n.getAttribute('aria-label'); }).join(' ')
              : '';
            res.push({ id: id, set: i + 1, phase: ph, p: p,
                       text: (st.host().innerText || '') + ' ' + compText,        // what is SEEN
                       all:  (st.host().textContent || '') + ' ' + compText,      // + what is hidden
                       // + what is ANNOUNCED. innerText excludes aria-label,
                       // and that gap hid four scene leaks for a whole cycle.
                       labels: [].map.call(st.host().querySelectorAll('[aria-label]'),
                         function (n) { return n.getAttribute('aria-label'); }).join(' ') + ' ' + compLabels });
          } catch (e) { res.push({ id: id, set: i + 1, phase: ph, err: String(e) }); }
        });
        root.remove();
      }
    });
    return res;
  }

  /* Any step answer, or the final answer, appearing on a screen the student
     reaches before the Engine Room. Values GIVEN in the problem are excluded —
     they are supposed to be there.

     This reports CANDIDATES. Every hit must be read in context before it is
     believed: a denominator that happens to equal a step answer, or the "two"
     in "two stalls", is not a leak. Both have been seen here. */
  /* NOTHING NUMERIC MAY APPEAR ON EITHER SCREEN OF THE FIRST READ.
     Not a step answer — ANY digit. read1 and platform are the numberless
     phases (Pedagogy §1.4), and the leak scan above cannot catch this because
     it only looks for values that match an ANSWER. The quilt's scene legend
     printed "blue 2/5 · red 1/4" beside masked prose for as long as that
     problem has existed, and no check on this project was looking. Its
     aria-label was worse: "8 of 20 blue", so the student least able to
     cross-check got the numbers read to them. */
  function numberlessBreaks(rows) {
    var out = [];
    rows.forEach(function (r) {
      /* `crossover` is the paired stand-in for `platform` and is numberless for
         the same reason, so it is scanned by the same rule. A phase absent from
         this test is a numberless screen nothing is checking — and this list
         has already been the place where a whole screen went unscanned once. */
      if (r.err || (r.phase !== 'read1' && r.phase !== 'platform' && r.phase !== 'crossover')) return;
      /* `text` is innerText, and innerText DOES NOT INCLUDE aria-label. This
         check was written to catch the quilt's picture leaking its fractions,
         reported 0, and was believed — while four other scenes were reading
         "3 of 10 tenths of the day packed" aloud on the same screen. The
         student agent found them by listening to the page.

         So a numberless screen is now checked in BOTH modalities: what is on
         it, and what is announced from it. VERIFICATION §5 — check in the
         modality the defect lives in — and §28, which is this rule's own
         entry and did not go far enough. */
      var seen = (r.text || '') + ' ' + (r.labels || '');
      var hits = seen.match(/[\w/.]*\d[\w/.]*/g) || [];
      if (hits.length) {
        out.push({ line: r.id + ' set' + r.set + ' [' + r.phase + '] NUMBER ON A ' +
                         'NUMBERLESS SCREEN: ' + hits.slice(0, 6).join(', ') });
      }
    });
    return out;
  }

  /* WHICH STEP ANSWERS ARE STILL SECRETS ON THIS SCREEN.

     One function, because there are now three answers to that question and
     they were about to be three conditions inline.

     1. Everywhere on the existing 30 — all of them. The student is upstream of
        every step.
     2. `check-unsure` — the last step only. That board is reachable only FROM
        the last step, so every earlier value on it is one the student produced
        by their own hand. Measured, not assumed: turning the scan on there
        reported eight hits and all eight were `arrivals.questionCheck` naming
        a value the student had already computed.
     3. `solve@N` on a PAIRED problem — steps N onward. Same argument as (2),
        and it is the argument the whole island rests on: the transfer is an
        answer on one side of the crossover and a GIVEN on the other, so once
        the student has crossed it, naming it is not a leak. It is the thing
        they are working with.

     THE SCOPING IS THE POINT, AND IT IS THE USER'S INSTRUCTION (2026-08-16):
     this relaxation applies to problems carrying a `pair` and to nothing else.
     `solve@N` phases are only ever generated for paired problems, so on the
     existing 30 this function returns exactly what the old expression
     returned, on exactly the phases it returned it for. Their baseline is not
     merely expected to hold — it cannot move, because no input to it changed.

     What is NEVER exempt, on any screen here: the FINAL answer. That is added
     by the caller and no branch above touches it. */
  function visibleAnswers(p, phase, steps) {
    if (phase === 'check-unsure') return steps.slice(-1);
    var at = /^solve@(\d+)$/.exec(phase);
    if (at && isPaired(p)) return steps.slice(+at[1] - 1);
    return steps;
  }

  function leaks(rows) {
    var out = [];
    rows.forEach(function (r) {
      if (r.err || !preSolve(r.phase)) return;
      var p = r.p, given = {};
      Object.keys(p.problem.numbers).forEach(function (k) {
        given[parseFloat(p.problem.numbers[k].value)] = 1;
      });
      /* WHICH ANSWERS COUNT AS A LEAK DEPENDS ON WHAT THE STUDENT HAS ALREADY
         DONE, and `check-unsure` is the first screen where that differs.

         Everywhere else, every step answer is a secret: the student is upstream
         of all of them. The unsure board is not — it is reachable only from the
         LAST step, and reaching the last step means every earlier step has
         already been answered correctly by the student's own hand. An earlier
         step's value on that screen tells them something they worked out
         themselves, which is not a leak in any sense that matters.

         This was measured, not assumed. Turning the scan on for that screen
         reported eight hits across pw-helmet-savings and pw-band-brass, all
         four sets each; read in context they are all one sentence of
         `arrivals.questionCheck` doing its job — "if your answer is 30, you
         found the helmet, that's step one, not the finish" — a warning about
         the commonest wrong finish, naming a number the student has already
         produced.

         Encoded as a rule rather than as eight cleared entries, because a
         hand-kept list of exemptions goes stale the moment a ninth problem is
         written and this project has five files' worth of that already. The
         final answer is still a leak here, and that is the one that matters. */
      var steps = (p.engineRoom || {}).steps || [];
      var visible = visibleAnswers(p, r.phase, steps);
      var ans = [];
      visible.forEach(function (s) {
        var v = MF.parseAnswer((s.answer || {}).exact);
        if (v !== null) ans.push({ v: v, w: 'step ' + s.id });
      });
      var f = MF.parseAnswer(((p.arrivals || {}).answer || {}).exact);
      if (f !== null) ans.push({ v: f, w: 'final' });

      ans.forEach(function (a) {
        if (given[a.v]) return;
        var d = String(a.v).replace('.', '\\.');
        /* THIS PATTERN HAD A HOLE, AND IT HID A REAL LEAK.
           It was `(?:^|[^\d.])VALUE(?![\d.])` — the trailing `[\d.]` was meant
           to stop "2" matching inside "2.5", and it did. It also stopped the
           scan matching a value at the END OF A SENTENCE, because the period
           after it is punctuation, not a decimal point. Any leak phrased
           "...and that is 9." was invisible.

           Found when the first Test Track demonstrated on 12 blocks and
           announced "3 of the 4 parts, 3 in each, is 9" — while set 1 of that
           very problem is a 12-cup pot with the answer 9. The demonstration
           was solving the student's problem outright, and this scan called it
           clean.

           The distinction that was actually wanted: reject a period only when
           a DIGIT follows it. Lookbehind does the same job on the left. */
        if (new RegExp('(?<![\\d.])' + d + '(?!\\d)(?!\\.\\d)').test(r.text))
          out.push({ id: r.id, set: r.set, phase: r.phase, kind: 'DIGIT', val: a.v, where: a.w,
                     line: r.id + ' set' + r.set + ' [' + r.phase + '] DIGIT ' + a.v + ' = ' + a.w });
        var wp = wordPattern(a.v);
        if (wp && new RegExp(wp, 'i').test(r.text))
          out.push({ id: r.id, set: r.set, phase: r.phase, kind: 'WORD', val: a.v, where: a.w,
                     line: r.id + ' set' + r.set + ' [' + r.phase + '] WORD "' + numberWord(a.v) +
                           '" = ' + a.w + ' (' + a.v + ')' });
      });
    });
    return out;
  }

  /* ---- Hits already read in context and found benign ----

     THIS DOES NOT WEAKEN THE CHECK. Every hit is still detected; cleared ones
     are merely reported separately so a NEW hit is not buried in familiar
     noise. A leak scan that prints the same ten lines every run trains you to
     skim it, and the one time it prints eleven you will not notice — which is
     the same failure as a check nobody runs.

     Each entry records WHY it was cleared, so the judgement is auditable
     rather than a silent suppression. A cleared entry that STOPS matching is
     also reported: it means the content moved and the clearance is stale.

     Nothing here may be added without reading the rendered screen first. */
  var CLEARED = [
    { id: 'rr-market-stall', kind: 'WORD', val: 2,
      why: 'The word is "two stalls" / "two totals" / "two prices" — the story\'s ' +
           'cardinality, not the answer. This problem\'s step-2 answer happens to be 2 ' +
           'dollars a bag in set 1 only. Read on all five pre-solve screens.' },
    /* Cleared 2026-08-04, when `solve` joined the scan. The ONLY bare 2 on that
       screen is the step counter — "Step 2 of 2" — and this problem's final
       answer is 2 dollars a bag in set 1. Verified by listing every place a 2
       appears in the rendered text; there was exactly one, and it was the
       counter. A two-step problem whose answer is 2 will always collide here. */
    { id: 'rr-market-stall', kind: 'DIGIT', val: 2,
      why: 'The step counter, "Step 2 of 2", against a set-1 answer of 2 dollars a bag. ' +
           'Not content — furniture. Only on the solve screen, only in set 1.' }
  ];

  function partitionLeaks(hits) {
    var used = {};
    var fresh = hits.filter(function (h) {
      var i = CLEARED.findIndex(function (c) {
        return c.id === h.id && c.kind === h.kind && c.val === h.val;
      });
      if (i === -1) return true;
      used[i] = (used[i] || 0) + 1;
      return false;
    });
    var stale = CLEARED.filter(function (_, i) { return !used[i]; });
    return { fresh: fresh, clearedCount: hits.length - fresh.length, stale: stale };
  }

  /** Context around a hit, so it can be read rather than guessed at. */
  function show(id, phase, value, set) {
    var rows = render([id]).filter(function (r) {
      return r.phase === phase && r.set === (set || 1);
    });
    if (!rows.length) return '(no such screen)';
    var re = new RegExp('[\\s\\S]{0,140}(?<![\\d.])' + String(value).replace('.', '\\.') + '(?!\\d)(?!\\.\\d)[\\s\\S]{0,140}', 'g');
    var m, hits = [];
    while ((m = re.exec(rows[0].text))) hits.push(m[0].replace(/\s+/g, ' '));
    return hits.join('\n   ...\n') || '(value not visible on that screen)';
  }

  /* Two misconceptions in one step that parse to the SAME number, or one that
     equals the step's own answer.

     matchMisconception returns the first entry it matches, so a collision means
     a student gets a diagnosis of a mistake they did not make — told they
     handed back a given value when they actually stopped at the multiplier.
     Number sets make this easy to author by accident, because the two values
     are derived independently and only collide in some sets: rr-bread-dough
     had a candidate set where the recipe's water and the scale factor were
     both 4. That set was dropped rather than patched.

     Cheap, and it has fired: planted both shapes and both were caught. */
  function misconceptionCollisions(ids) {
    var out = [];
    (ids || Object.keys(MF.problems)).forEach(function (id) {
      var base = MF.problems[id], n = MF.setCount(base);
      for (var i = 0; i < n; i++) {
        var p = MF.materialize(base, i);
        ((p.engineRoom || {}).steps || []).forEach(function (st) {
          var ans = MF.parseAnswer((st.answer || {}).exact), seen = {};
          (st.misconceptions || []).forEach(function (m) {
            var v = MF.parseAnswer(m.response);
            if (v === null) return;
            if (v === ans)
              out.push(id + ' set' + (i + 1) + ' ' + st.id + ': misconception "' + m.response + '" EQUALS the answer');
            if (seen[v] !== undefined)
              out.push(id + ' set' + (i + 1) + ' ' + st.id + ': two misconceptions both = ' + v +
                       ' (' + seen[v] + ' / ' + m.tag + ')');
            seen[v] = m.tag;
          });
        });
      }
    });
    return out;
  }

  /* ============================================================
     THE FIRST GEOMETRIC CHECK THIS SWEEP HAS EVER HAD.

     Everything above reads TEXT. Every scene defect this project has shipped
     was invisible to text: a locomotive facing the wrong way, flour falling
     past its bowl, a bench row stopping short of its own frame, a kiosk
     animating a departure with the arrival keyframe. All of them were found by
     a person measuring the rendered frame, one at a time, and none of them
     could recur without someone thinking to go and measure again.

     Two invariants, both derived from what is drawn rather than declared
     anywhere, and both chosen because they do not fire on correct art:

     1. NOTHING IS CLIPPED BY THE TOP OR BOTTOM OF THE FRAME. The left and
        right edges are deliberately used — benches, queues and racks run off
        them so the objects cannot be counted — but no scene has ever wanted
        something sliced by the ceiling or the floor, and 13 of the 14 arts
        shipping today sit inside 0..130 with room to spare.

     2. A SCROLLING STRIP LOOPS SEAMLESSLY. A strip only looks endless if the
        last frame of its cycle is identical to the first, which means the
        travel must be a whole multiple of the strip's own repeat. The Ratio
        line's sleepers travelled 320 against a pitch of 26 for as long as that
        scene existed: 320 mod 26 = 8, so the ground snapped eight units
        backwards under the train five times every eight seconds. Nothing in
        the source says so; the numbers are in two different files.

     THE INSTRUMENT COMES FIRST, AND IT IS ASSERTED. getBBox() on a transformed
     <g> returns the group's OWN user space and getCTM() lands in the svg
     viewport with the viewBox scale baked in — Cycle 20 lost time to both, and
     measured a 26-unit bench as 24.4 against a right edge that was not there.
     Only getScreenCTM().inverse() x node.getScreenCTM() gives viewBox units.
     So a probe rect of known width is injected and measured BEFORE any reading
     is believed, and this check refuses to report at all if the probe is wrong.
     A geometric check with a broken ruler reports a clean site.
     ============================================================ */
  function sceneGeometry() {
    var out = [];
    /* DISCOVERED, NOT LISTED — and this is the third time in one day that a
       hardcoded list of three scene libraries has silently exempted a fourth.

       The other two were in tools/preview-scenes.html: its family walk showed
       fourteen arts and called itself complete, and its self-check expected
       fourteen while nineteen were drawn and shouted SOMETHING DID NOT LOAD at
       a healthy page. This one was worse, because it is the check rather than
       the viewer: every art in groups-scenes.js was written, shipped and swept
       WITHOUT EVER BEING GEOMETRY-CHECKED, and the sweep reported "scene
       geometry faults: 0 (none)" the whole time. A clipped weather vane sat at
       y -10 in a 0..130 frame across four number sets and five clean runs.

       "0 faults" and "0 subjects" print identically. That is VERIFICATION.md
       §25 — the check and the subject were not the same object — and the fix is
       the same everywhere: ask the world what libraries exist. */
    var libs = Object.keys(global).filter(function (k) {
      var v = global[k];
      return /Scenes$/.test(k) && v && Array.isArray(v.names) && typeof v.html === 'function';
    }).map(function (k) { return [k, global[k]]; });

    var host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-99999px;top:0;width:340px';
    document.body.appendChild(host);

    function box(svg, node) {
      var m = svg.getScreenCTM().inverse().multiply(node.getScreenCTM());
      var b = node.getBBox();
      var xs = [], ys = [];
      [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]]
        .forEach(function (p) {
          var q = svg.createSVGPoint(); q.x = p[0]; q.y = p[1];
          q = q.matrixTransform(m); xs.push(q.x); ys.push(q.y);
        });
      return { x0: Math.min.apply(null, xs), x1: Math.max.apply(null, xs),
               y0: Math.min.apply(null, ys), y1: Math.max.apply(null, ys) };
    }

    /* Shape without placement. Two sleepers differ only in x, and that is
       exactly the pair we are trying to recognise as one repeated motif, so
       x/y/cx/cy are left out on purpose. */
    function sig(n) {
      var a = [n.tagName];
      ['d', 'width', 'height', 'r', 'rx', 'ry', 'points', 'fill', 'stroke'].forEach(function (k) {
        if (n.hasAttribute(k)) a.push(k + '=' + n.getAttribute(k));
      });
      return a.join(',');
    }

    try {
      libs.forEach(function (L) {
        var name = L[0], lib = L[1];
        if (!lib) return;
        lib.names.forEach(function (art) {
          host.innerHTML = lib.html({ scene: { art: art, caption: 'probe' } });
          var svg = host.querySelector('svg');
          if (!svg) { out.push(name + '.' + art + ': rendered no svg'); return; }

          // ---- the ruler, before anything is measured with it ----
          var probe = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          probe.setAttribute('x', '0'); probe.setAttribute('y', '0');
          probe.setAttribute('width', '26'); probe.setAttribute('height', '10');
          probe.setAttribute('fill', 'none');
          svg.appendChild(probe);
          var pw = box(svg, probe).x1 - box(svg, probe).x0;
          probe.remove();
          if (Math.abs(pw - 26) > 0.01) {
            out.push(name + '.' + art + ': INSTRUMENT WRONG — a 26-unit probe measured ' +
                     pw.toFixed(2) + '. Every reading below it is meaningless; fix the ruler first.');
            return;
          }

          // ---- 1. clipped by the ceiling or the floor ----
          var drawn = [].slice.call(svg.querySelectorAll('rect,path,circle,ellipse,polygon'))
            .filter(function (n) { return !n.closest('clipPath'); });
          drawn.forEach(function (n) {
            var b = box(svg, n);
            if (b.y0 < -0.5 || b.y1 > 130.5) {
              out.push(name + '.' + art + ': CLIPPED VERTICALLY — <' + n.tagName + ' ' +
                       (n.getAttribute('d') || ('w=' + n.getAttribute('width'))) + '> spans y ' +
                       b.y0.toFixed(1) + '..' + b.y1.toFixed(1) +
                       ' in a 0..130 frame. Left and right may run off; top and bottom may not.');
            }
          });

          // ---- 2. a scrolling strip must loop seamlessly ----
          if (!svg.getAnimations) return;
          svg.getAnimations({ subtree: true }).forEach(function (a) {
            var el = a.effect && a.effect.target;
            var dur = a.effect && a.effect.getTiming().duration;
            if (!el || !dur || typeof dur !== 'number' || a.effect.getTiming().iterations !== Infinity) return;
            var t = a.currentTime;
            a.currentTime = 0;        var b0 = box(svg, el);
            a.currentTime = dur / 2;  var bh = box(svg, el);
            a.currentTime = dur / 4;  var bq = box(svg, el);
            a.currentTime = t;
            var dx = b0.x0 - bh.x0, dy = Math.abs(b0.y0 - bh.y0);
            if (Math.abs(dx) < 40 || dy > 0.01) return;            // not a scrolling strip
            if (Math.abs(4 * (b0.x0 - bq.x0) - 2 * dx) > 0.05) return;  // not linear; not a strip
            var travel = 2 * dx;

            /* The strip's own repeat, derived two ways: the pitch of its
               largest family of identical children, or a dash period. */
            var repeat = null, why = '';
            var fam = {};
            [].forEach.call(el.children, function (c) {
              var s = sig(c); (fam[s] = fam[s] || []).push(c);
            });
            var best = null;
            Object.keys(fam).forEach(function (s) { if (!best || fam[s].length > fam[best].length) best = s; });
            if (best && fam[best].length >= 3) {
              var xs = fam[best].map(function (c) { return box(svg, c).x0; }).sort(function (p, q) { return p - q; });
              var pitches = [];
              for (var i = 1; i < xs.length; i++) pitches.push(+(xs[i] - xs[i - 1]).toFixed(3));
              if (pitches.every(function (p) { return Math.abs(p - pitches[0]) < 0.02; })) {
                repeat = pitches[0]; why = fam[best].length + ' identical parts at a pitch of ' + repeat;
              }
            }
            var dashed = el.querySelector('[stroke-dasharray]');
            if (repeat === null && dashed) {
              var parts = dashed.getAttribute('stroke-dasharray').split(/[\s,]+/).map(parseFloat);
              repeat = parts.reduce(function (s, v) { return s + v; }, 0);
              why = 'a dash pattern repeating every ' + repeat;
            }
            /* A dashed stroke restarts its pattern at every subpath, so a strip
               built from two of them has one wrong gap in it wherever they meet
               — and that gap scrolls through the frame once a cycle. The van's
               road was `M0 110 H320 M340 110 H660`: a 38-unit hole where every
               other gap is 18. */
            if (dashed && (dashed.getAttribute('d') || '').match(/M/g).length > 1) {
              out.push(name + '.' + art + ': SCROLLING DASH IN ' +
                       (dashed.getAttribute('d').match(/M/g).length) + ' SUBPATHS — SVG restarts the ' +
                       'dash pattern at each one, so the strip has a wrong gap in it that scrolls ' +
                       'past every cycle. Use a single subpath.');
            }
            if (repeat === null || repeat <= 0) return;             // nothing to be sure about
            var slip = Math.abs(travel % repeat);
            if (slip > 0.02 && Math.abs(slip - repeat) > 0.02) {
              out.push(name + '.' + art + ': SCROLL SEAM — travels ' + travel.toFixed(2) +
                       ' with ' + why + '. ' + travel.toFixed(2) + ' mod ' + repeat +
                       ' = ' + slip.toFixed(2) + ', so the strip jumps that far every ' +
                       (dur / 1000) + 's. Set --rsc-span to a whole multiple of the repeat.');
            }
            if (b0.x0 > 0.01 || b0.x1 < 319.99 || (b0.x1 - travel) < 319.99) {
              out.push(name + '.' + art + ': SCROLLING STRIP TOO SHORT — spans ' +
                       b0.x0.toFixed(0) + '..' + b0.x1.toFixed(0) + ' and travels ' +
                       travel.toFixed(0) + ', so it uncovers the frame before the loop restarts.');
            }
          });
        });
      });
    } finally { host.remove(); }
    return out;
  }

  /* SAY WHEN THE CHECK EXAMINED NOTHING, RATHER THAN SAYING NOTHING.

     `0 faults` and `0 subjects` print identically, and this project has lost
     whole cycles to that — a scene library shipped unchecked while the sweep
     printed a clean run, and `check-contrast.ps1` reported "39 pairs, 0
     failing" against a palette it had never read. `VERIFICATION.md` §36 was
     written for exactly this and it says a checker must refuse to report a
     clean run on an empty subject set.

     Today the subject set IS empty — no problem carries a `pair` yet — so this
     line will read "examined nothing" until the island has content. That is
     the honest output, and it is loud on purpose: the day the first Challenge
     problem lands, this line changing is the confirmation that the rule found
     it. `SWEEP.selfTestChallenge()` is what proves the rule works meanwhile. */
  function challengeCoverage(rows) {
    var paired = {}, screens = 0, stepScreens = 0;
    rows.forEach(function (r) {
      if (!r.p || !isPaired(r.p)) return;
      paired[r.id] = 1; screens++;
      if (/^solve@\d+$/.test(r.phase)) stepScreens++;
    });
    var n = Object.keys(paired).length;
    if (!n) {
      return 'CHALLENGE (paired) problems examined: 0 — THIS CHECK EXAMINED NOTHING. ' +
             'No problem carries a `pair`, so the transfer rule above ran over no subject. ' +
             'Run SWEEP.selfTestChallenge() — that is what currently proves the rule fires and clears.';
    }
    if (!stepScreens) {
      return 'CHALLENGE (paired) problems examined: ' + n + ' — but 0 second-half screens rendered. ' +
             'A paired problem with one Engine Room step is a paired problem whose second situation ' +
             'is never scanned. Check its engineRoom.steps.';
    }
    return 'CHALLENGE (paired) problems examined: ' + n + ' · screens ' + screens +
           ' · of them second-half (solve@N) ' + stepScreens;
  }

  /* PROVING A RULE THAT HAS NO CONTENT TO RUN ON.

     "A rule that has never fired is not known to work" (CLAUDE.md). The
     transfer exemption cannot be exercised by any problem on the site, and it
     will not be until the island is built — so it is exercised here instead,
     on rows fabricated for the purpose. `leaks()` takes rows, which is what
     makes this possible without inventing a whole manifest.

     Four cases, and the FOURTH is the one the user asked for by name: the
     relaxation must not reach a problem that is not paired.

     Returns a list of failures. An empty list is a pass — and unlike the run
     above, this one cannot pass vacuously, because a rule that never fires
     fails cases 2, 3 and 4. */
  function selfTestChallenge() {
    function fake(paired) {
      return {
        id: paired ? 'zz-selftest-paired' : 'zz-selftest-plain',
        line: 'ratio',
        pair: paired ? { first: 'compare', second: 'ratio', transfer: 'minutes per stop' } : null,
        problem: { numbers: { n1: { value: 4 } } },   // 4 is GIVEN; 7 and 21 are not
        engineRoom: { steps: [ { id: 1, answer: { exact: '7' } },
                               { id: 2, answer: { exact: '21' } } ] },
        arrivals: { answer: { exact: '21' } }
      };
    }
    function run(paired, phase, text) {
      return leaks([{ id: 'zz', set: 1, phase: phase, p: fake(paired), text: text, all: text, labels: '' }]).length;
    }

    var fails = [];
    function want(cond, what) { if (!cond) fails.push(what); }

    /* Guard first: if `solve@2` is not treated as a pre-solve phase at all,
       every case below passes for the wrong reason. Say what the instrument is
       looking at before trusting what it says (VERIFICATION.md §25). */
    want(preSolve('solve@2'), 'preSolve("solve@2") is false — the scan is not looking at second-half screens at all, and every case below would pass vacuously');

    want(run(true,  'solve@2', 'You found 7 minutes a stop. Now scale it up.') === 0,
         'CASE 1 FAILED: the transfer (step 1 = 7) still reads as a leak on the second half of a paired problem. The exemption is not applied.');
    want(run(true,  'solve@2', 'The whole journey works out at 21 minutes.') > 0,
         'CASE 2 FAILED: the FINAL answer (21) was exempted on a paired problem. Nothing may exempt the final answer.');
    want(run(true,  'plan',    'It comes to 7 minutes a stop.') > 0,
         'CASE 3 FAILED: the transfer (7) was exempted BEFORE the crossover. It is only not-a-leak once the student has computed it.');
    want(run(false, 'solve@2', 'You found 7 minutes a stop. Now scale it up.') > 0,
         'CASE 4 FAILED — THE SCOPING IS BROKEN: an UNPAIRED problem got the transfer exemption. The relaxation must reach paired problems and nothing else.');

    return fails;
  }

  function report(ids) {
    var rows = render(ids);
    var errs = rows.filter(function (x) { return x.err; });
    var toks = rows.filter(function (x) { return x.text && /\{\{/.test(x.text); });
    var lk = leaks(rows);
    var part = partitionLeaks(lk);
    var mc = misconceptionCollisions(ids);
    var nl = numberlessBreaks(rows);
    var geo = sceneGeometry();
    /* Collected in render(), where the DOM still exists — the rows carry only
       strings by the time they get here, and cutting the answer options out of
       a string is not something a string can do. */
    var tells = [];
    rows.forEach(function (r) {
      (r.tells || []).forEach(function (t) {
        tells.push(r.id + ' set' + r.set + ' [' + r.phase + '] ' + t);
      });
    });
    var v = MF.validate();
    var mats = v.reduce(function (a, x) { return a + x.numberSets; }, 0);
    var verr = v.filter(function (x) { return x.errors.length; });

    return [
      'problems ' + v.length + ' · materialisations ' + mats + ' · screens rendered ' + rows.length,
      'validate errors: ' + verr.length +
        (verr.length ? '\n  ' + verr.map(function (x) { return x.id + ': ' + x.errors.join(' ;; '); }).join('\n  ') : ''),
      'render errors: ' + errs.length +
        (errs.length ? '\n  ' + errs.map(function (e) { return e.id + ' set' + e.set + ' ' + e.phase + ': ' + e.err; }).join('\n  ') : ''),
      'screens showing an unfilled {{token}}: ' + toks.length +
        (toks.length ? '\n  ' + toks.map(function (t) { return t.id + ' set' + t.set + ' ' + t.phase + ': ' + (t.text.match(/\{\{\w+\}\}/g) || []).join(','); }).join('\n  ') : ''),
      'misconception collisions: ' + mc.length + (mc.length ? '\n  ' + mc.join('\n  ') : ''),
      'numbers visible on a numberless screen: ' + nl.length +
        (nl.length ? '\n  ' + nl.map(function (h) { return h.line; }).join('\n  ') : ' (none)'),
      'scene geometry faults: ' + geo.length + (geo.length ? '\n  ' + geo.join('\n  ') : ' (none)'),
      'the hidden-line booth giving the line away: ' + tells.length +
        (tells.length ? '\n  ' + tells.join('\n  ') : ' (none)'),
      'pre-solve leak candidates — NEW, read each in context: ' + part.fresh.length +
        (part.fresh.length ? '\n  ' + part.fresh.map(function (h) { return h.line; }).join('\n  ') : ' (none)'),
      'previously read and cleared: ' + part.clearedCount +
        (part.stale.length ? '\n  STALE CLEARANCE — no longer matches, the content moved:\n    ' +
          part.stale.map(function (c) { return c.id + ' ' + c.kind + ' ' + c.val; }).join('\n    ') : ''),
      challengeCoverage(rows)
    ].join('\n');
  }

  global.SWEEP = { render: render, leaks: leaks, numberless: numberlessBreaks,
                   collisions: misconceptionCollisions,
                   /* `WORDS` used to be exported here as a table to eyeball.
                      It is a function now — SWEEP.word(31) rather than
                      SWEEP.WORDS[31], and it answers for every whole number
                      rather than for the ones somebody typed in. */
                   report: report, show: show, word: numberWord, geometry: sceneGeometry,
                   CLEARED: CLEARED, partitionLeaks: partitionLeaks,
                   /* The transfer rule and its proof. `report()` prints the
                      coverage line; this is what makes the rule knowable while
                      the island has no content. */
                   selfTestChallenge: selfTestChallenge, visibleAnswers: visibleAnswers };
})(window);
