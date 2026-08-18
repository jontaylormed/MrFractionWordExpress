/* ============================================================================
   zz-drive.js — MOUNT ANY PROBLEM AT ANY PHASE FROM A URL, SO A CAMERA CAN SEE IT

   TEST SCAFFOLDING. Never referenced by `index.html` and must never be — the
   site ships from `file://` with no build step, and this exists only so an
   external browser can be pointed at one screen.

   WHY IT IS IN THE REPO. Cycle 30 (2026-08-17) ran five review passes and NOT
   ONE of them could look at the site: the in-app browser pane never composited
   a frame, so every screenshot timed out and every finding in that cycle is
   geometry, computed style or logic. `art-director` was the only pass to get
   real pixels, and this is how. It was written in a scratch directory that dies
   with its session; the next person would have re-derived it from nothing, which
   is roughly what four dead agent runs cost that day.

   HOW TO USE IT — two steps, and the flags are not optional.

   1. Serve a COPY of the site and drop this file into its `assets/js/`, then add
      `<script src="assets/js/zz-drive.js"></script>` last in `index.html`.
      Work on a copy, not the tree: a review pass should not be able to modify
      what it is reviewing (VERIFICATION.md §29).

          powershell -File tools/serve.ps1 -Port 8414

   2. Point headless Edge at it and read the PNG:

          msedge.exe --headless --disable-gpu --no-sandbox \
            --user-data-dir=<scratch> --window-size=1280,2000 \
            --virtual-time-budget=6000 --screenshot=out.png \
            "http://localhost:8414/index.html?pid=cl-buffet-crates&phase=plan"

   TWO FLAGS THAT COST AN HOUR EACH IF YOU GET THEM WRONG:

   * `--headless=new` SILENTLY WRITES NO FILE. It must be bare `--headless`.
     No error, no output, exit code 0. (Edge 151.0.4129.86.)
   * `--virtual-time-budget` SEEKS animations instead of sampling mid-flight,
     which is what makes the capture trustworthy — see VERIFICATION.md §39, where
     a measurement taken mid-animation produced a false a11y CRITICAL. Without
     it you are photographing whatever frame you happened to land on.

   AND ONE TRAP IN THE CAMERA ITSELF: Edge headless would not go below about
   504 CSS px. Asking for `--window-size=320` yields a 320px CROP of a 504px
   layout, which looks exactly like a site that fails at 320 — art-director filed
   that as a finding and then retracted it. `probe320.png` in `docs/cycle-30/` is
   the retraction. 320px has still never been rendered by anyone on this project.

   PARAMETERS
     ?pid=<problem id>     materialises set 0 and mounts a real Station
     &phase=<phase>        read1 | platform | xo | read2 | read3 | ticket |
                           plan | demo | solve | check   (default: plan)
     &step=<n>             Engine Room step index
     &click=<selector>     click the first match instead of mounting a problem
     &scrollto=<text>      scroll to the h3 containing this text
     &probe=1              overlay a measurement dump: viewport, overflowing
                           elements, rail box, type scale, headings in document
                           order, --xo-* tokens, and whether the companion
                           bubble is clipping its own text

   The green bar at bottom-left is the drive log — `OK <phase> fade=<level>`, or
   `NOPROB` / `NOCLICK` / `ERR`. IF IT DOES NOT SAY OK, THE SCREENSHOT IS NOT OF
   WHAT YOU ASKED FOR, and this project's whole history says the failure will
   look like a site defect rather than an instrument one. Read the bar first.
   ============================================================================ */
(function(){
  var q=new URLSearchParams(location.search);
  var pid=q.get('pid'),phase=q.get('phase'),step=q.get('step'),click=q.get('click');
  if(!pid&&!click) return;
  function tag(log){
    var b=document.createElement('div');b.id='drivelog';
    b.style.cssText='position:fixed;left:0;bottom:0;z-index:99999;background:#0f0;color:#000;font:11px monospace;max-width:1260px;padding:2px';
    b.textContent=log;document.body.appendChild(b);
    var ls=document.getElementById('loading-screen');if(ls)ls.remove();
  }
  function boot(){
    var log='';
    try{
      if(click){
        var els=document.querySelectorAll(click);
        if(!els.length){log='NOCLICK '+click;}
        else{els[0].click();log='CLICKED '+click+' n='+els.length;}
      } else {
        var raw=MF.problems[pid];
        if(!raw){log='NOPROB '+pid;}
        else{
          var p=MF.materialize(raw,0);
          var m={estimates:[],hints:[],misconceptions:[],schema:[]};
          var st=new Stations.Station(p,(p.stationRoles&&p.stationRoles[0])||'reading',m,function(){});
          st.legIndex=1;st.legTotal=3;
          if(step)st.stepIndex=parseInt(step,10);
          var root=st.render();
          var v=document.getElementById('view');v.innerHTML='';v.appendChild(root);
          st.go(phase||'plan');window.__ST__=st;
          log='OK '+st.phase+' fade='+(p.fadeLevel||'?')+' line='+(p.line||'?');
        }
      }
    }catch(e){log='ERR '+e+' | '+(e.stack||'').slice(0,300);}
    tag(log);
  }
  setTimeout(boot,800);
})();
(function(){
  var q=new URLSearchParams(location.search);
  if(q.get('probe')!=='1') return;
  function px(n){return n===null?'-':Math.round(n*10)/10;}
  setTimeout(function(){
    var L=[];
    L.push('viewport inner='+innerWidth+'x'+innerHeight);
    L.push('doc scrollWidth='+document.documentElement.scrollWidth+'  body scrollWidth='+document.body.scrollWidth);
    // widest offenders
    var worst=[];
    [].forEach.call(document.querySelectorAll('*'),function(n){
      var r=n.getBoundingClientRect();
      if(r.width>0&&r.right>innerWidth+1) worst.push({t:n.tagName+'.'+(n.className&&n.className.baseVal===undefined?String(n.className).slice(0,40):''),right:Math.round(r.right),w:Math.round(r.width)});
    });
    worst.sort(function(a,b){return b.right-a.right;});
    L.push('OVERFLOWING ELEMENTS ('+worst.length+') top 8:');
    worst.slice(0,8).forEach(function(o){L.push('   right='+o.right+' w='+o.w+' '+o.t);});
    // rail
    var rail=document.querySelector('.est-rail,.est-track,.est-line,[class*="rail"],[class*="track"]');
    if(rail){var rr=rail.getBoundingClientRect();L.push('RAIL '+rail.className+' w='+px(rr.width)+' h='+px(rr.height));}
    else L.push('RAIL not found by selector');
    // type scale
    ['.station-title','h2','h3','.est-wrap h3','.eyebrow'].forEach(function(s){
      var e=document.querySelector(s); if(!e)return; var cs=getComputedStyle(e);
      L.push('TYPE '+s+' -> "'+(e.textContent||'').trim().slice(0,34)+'" '+cs.fontSize+' / '+cs.fontWeight+' / '+cs.fontFamily.split(',')[0]+' ls='+cs.letterSpacing);
    });
    // all headings in order
    L.push('--- headings in document order ---');
    [].forEach.call(document.querySelectorAll('h1,h2,h3,h4'),function(h){
      var cs=getComputedStyle(h);
      L.push('  '+h.tagName+' '+cs.fontSize+' w'+cs.fontWeight+' '+cs.fontFamily.split(',')[0].replace(/"/g,'')+' :: '+(h.textContent||'').trim().slice(0,44));
    });
    // xo colours
    var rs=getComputedStyle(document.documentElement);
    L.push('--xo-a='+rs.getPropertyValue('--xo-a')+'  --xo-b='+rs.getPropertyValue('--xo-b'));
    // companion bubble clipping
    var b=document.querySelector('.mf-c-bubble');
    if(b){var cs2=getComputedStyle(b);L.push('BUBBLE client='+b.clientHeight+' scroll='+b.scrollHeight+' CLIPPED='+(b.scrollHeight>b.clientHeight+1)+' overflowY='+cs2.overflowY+' maxH='+cs2.maxHeight+' z='+cs2.zIndex);}
    else L.push('BUBBLE not present');
    var pre=document.createElement('pre');
    pre.style.cssText='position:fixed;inset:0;z-index:999999;background:#fff;color:#000;font:12px monospace;white-space:pre-wrap;padding:8px;margin:0;overflow:visible';
    pre.textContent=L.join('\n');
    document.body.appendChild(pre);
  },1600);
})();
(function(){
  var q=new URLSearchParams(location.search); var s=q.get('scrollto');
  if(!s) return;
  setTimeout(function(){
    var hs=document.querySelectorAll('h3');
    for(var i=0;i<hs.length;i++){ if((hs[i].textContent||'').indexOf(s)>-1){ hs[i].scrollIntoView({block:'start'}); window.scrollBy(0,-30); return; } }
    var e=document.querySelector(s); if(e){e.scrollIntoView({block:'start'});}
  },1500);
})();
