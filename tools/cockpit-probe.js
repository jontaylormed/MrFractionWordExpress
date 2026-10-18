/* Cockpit layout probe — test scaffolding, never loaded by the site.

   Load in a served copy (tools/serve.ps1), from the console:
     var s=document.createElement('script'); s.src='tools/cockpit-probe.js'; document.head.appendChild(s);
   then:
     await CKPROBE.ride('pw-soup-serving')            // every phase of one problem
     await CKPROBE.all(['read1','plan','solve'])      // those phases, every problem

   For each phase it reports whether the PAGE scrolls (it must not, at 1024px+),
   the lever's label, and every panel whose content overflows it. A panel listed
   under `over` is scrolling inside itself — allowed as a last resort, so read
   the list rather than treating it as pass/fail.

   It builds the station the way app.js does (render, then attach), and waits
   on timers, not animation frames: a hidden browser pane never fires rAF. */
(function (global) {
  'use strict';
  var P = Array.isArray(MF.problems) ? MF.problems : Object.values(MF.problems);
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  async function ride(id, phases) {
    var base = P.filter(function (x) { return x.id === id; })[0];
    if (!base) return ['no problem ' + id];
    // Number set 1, materialised as the app and tools/sweep.js do. The raw
    // manifest still has `{{n1}}` tokens in it, which no student ever sees.
    var p = MF.materialize ? MF.materialize(base, 0) : base;
    phases = phases || Stations.phaseChain(p).concat(['solve'], Stations.postSolve(p));
    var st = new Stations.Station(p, (p.stationRoles && p.stationRoles[0]) || 'reading', {}, function () {});
    st.legIndex = 0; st.legTotal = 3; st.estimate = 10; st.solved = 10;
    var view = document.getElementById('view');
    view.innerHTML = '';
    var node = st.render(); view.appendChild(node);
    if (global.Companion) Companion.flush();
    global.__st = st;
    await wait(50);
    var out = [];
    for (var i = 0; i < phases.length; i++) {
      var ph = phases[i], err = null;
      try { st.phase = ph; st.renderPhase(); } catch (e) { err = String(e).slice(0, 140); }
      await wait(40);
      var de = document.documentElement;
      var over = [].filter.call(node.querySelectorAll('.ck-panel'), function (x) {
        return !x.hidden && x.offsetParent && x.scrollHeight > x.clientHeight + 2;
      }).map(function (x) { return (x.id || x.className.split(' ')[1]) + ':' + x.scrollHeight + '/' + x.clientHeight; });
      var lever = node.querySelector('#ck-lever-btn');
      out.push(id + ' ' + ph + ': scroll=' + (de.scrollHeight > innerHeight) +
        ' lever=' + (lever.hidden ? '-' : JSON.stringify(lever.textContent.trim())) +
        ' over=[' + over.join(' ') + ']' + (err ? ' ERR ' + err : ''));
    }
    return out;
  }

  async function all(phases) {
    var out = [];
    for (var i = 0; i < P.length; i++) out = out.concat(await ride(P[i].id, phases));
    return out;
  }

  global.CKPROBE = { ride: ride, all: all };
})(window);
