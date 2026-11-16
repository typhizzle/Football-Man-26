// ===== 🎮 Controller support, phase 1: the whole game on a gamepad =====
// Tyler, 2026-11-14 (full spec in the ledger): Xbox / PlayStation / standard gamepads through the
// browser Gamepad API, everywhere in the game, keyboard + mouse + touch keep working alongside it.
// Phase 1 (this module): detection + the right button names, menu navigation with a visible highlight
// on every screen and overlay, walking (house, events, field walks), moving the QB, the existing run
// moves on the right stick / face buttons, and a basic throw to the receiver wearing each button.
// Phase 2 (next): the hold-to-power throw meter, lob/touch/bullet, stick placement. Phase 3: new
// ball-carrier moves (stiff arm, hurdle, dive, sprint do not exist in the game yet). Phase 4: PC screens.
// It plugs into the game's own inputs (the same movement value the keyboard sets, the same LR.joy the
// touch stick sets, the same run-move function a swipe calls, the same doThrow) — no second system.
window.CTL={on:false,kind:'xbox',mode:'touch',prev:[],held:{},rep:{},sel:null,lastNav:0,wasKb:false,id:''};
window.CTL_G={xbox:['A','B','X','Y','RB'],ps:['✕','○','□','△','R1']};window.CTL_RB=[0,1,2,3,5];
window.ctlTypeOf=function(id){id=String(id||'');if(/xbox|xinput|045e/i.test(id))return 'xbox';return /playstation|dualsense|dualshock|054c|^wireless controller/i.test(id)?'ps':'xbox'};
window.ctlGlyph=function(i){return (CTL_G[CTL.kind]||CTL_G.xbox)[i]};
// ---------- the highlight ----------
(()=>{try{const st=document.createElement('style');st.textContent=
 'body.ctlpad .ctlf{outline:4px solid #ffe93b!important;outline-offset:2px;box-shadow:0 0 0 7px rgba(255,233,59,.35)!important}'+
 '#ctlleg{position:fixed;left:8px;bottom:calc(env(safe-area-inset-bottom,0px) + 6px);z-index:60;display:none;background:#000c;border:2px solid #000;color:#fff;font:14px VT323,monospace;padding:3px 8px;pointer-events:none}'+
 'body.ctlpad #ctlleg{display:block}';document.head.appendChild(st);
 const lg=document.createElement('div');lg.id='ctlleg';document.body.appendChild(lg)}catch(e){}})();
const ctlVis=el=>{if(!el||!el.isConnected)return false;const r=el.getBoundingClientRect();if(r.width<2||r.height<2)return false;const cs=getComputedStyle(el);return cs.visibility!=='hidden'&&cs.display!=='none'&&el.offsetParent!==null};
window.ctlRoot=function(){const o=document.getElementById('ov');if(o&&o.style.display!=='none'&&o.innerHTML&&getComputedStyle(o).display!=='none'&&o.querySelector('button,[onclick],input,select'))return o;
 const w=document.getElementById('lrw');if(w&&w.style.display==='block')return null;
 const u=document.getElementById('ui');if(u&&u.style.display!=='none'&&getComputedStyle(u).display!=='none'&&u.innerHTML)return u;return null};
window.ctlCands=function(root){if(!root)return [];return [...root.querySelectorAll('button,[onclick],input,select,textarea,a[href],summary')].filter(el=>!el.disabled&&ctlVis(el)&&!(el.closest('[onclick]')&&el.closest('[onclick]')!==el&&el.tagName!=='BUTTON'&&el.tagName!=='INPUT'))};
window.ctlSet=function(el){document.querySelectorAll('.ctlf').forEach(x=>x.classList.remove('ctlf'));CTL.sel=el||null;if(el){el.classList.add('ctlf');try{el.scrollIntoView({block:'nearest',inline:'nearest'})}catch(e){}}};
window.ctlNav=function(dx,dy){const root=ctlRoot(),C=ctlCands(root);if(!C.length)return;let cur=CTL.sel;if(!cur||!C.includes(cur)){ctlSet(C[0]);return}
 const a=cur.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2;let best=null,bs=1e9;
 C.forEach(el=>{if(el===cur)return;const r=el.getBoundingClientRect(),x=r.left+r.width/2-ax,y=r.top+r.height/2-ay,along=x*dx+y*dy;if(along<=4)return;const perp=Math.abs(x*dy-y*dx),sc=along+perp*2.2;if(sc<bs){bs=sc;best=el}});
 if(best)ctlSet(best);else if(dy){try{(root.closest('#ui')?root:root).scrollBy(0,dy*120)}catch(e){}}};
window.ctlPress=function(){const el=CTL.sel;if(!el||!el.isConnected)return ctlNav(0,1);
 if(el.tagName==='INPUT'||el.tagName==='TEXTAREA'){el.focus();return}
 if(el.tagName==='SELECT'){const n=el.options.length;if(n){el.selectedIndex=(el.selectedIndex+1)%n;el.dispatchEvent(new Event('change',{bubbles:true}));el.dispatchEvent(new Event('input',{bubbles:true}))}return}
 el.click()};
window.ctlBack=function(){const root=ctlRoot()||document.getElementById('lrw');if(!root)return false;const B=[...root.querySelectorAll('button,[onclick]')].filter(ctlVis);
 const re=/(^|\s|✕|←)(back|leave|close|cancel|exit|done|no thanks|not now|later|skip)\b|^✕|^←/i;const hit=B.filter(b=>re.test((b.textContent||'').trim()));if(hit.length){hit[hit.length-1].click();return true}return false};
// ---------- what the face buttons say, at the bottom of the screen ----------
window.ctlLegend=function(){const lg=document.getElementById('ctlleg');if(!lg)return;const G=k=>ctlGlyph(k);let t='';
 const live=typeof g!=='undefined'&&g&&g.ph==='live'&&!ctlRoot();const lr=document.getElementById('lrw');
 if(live){const P=g.pl,q=P&&P.qb;t=(P&&P.car===q&&!P.air)?`${G(0)} ${G(1)} ${G(2)} ${G(3)} ${G(4)} throw to that receiver · L-stick move`:`L-stick run · R-stick juke/truck · ${G(1)} spin`}
 else if(lr&&lr.style.display==='block'&&!ctlRoot())t=`L-stick walk · R-stick look · ${G(0)} talk/use · ${G(1)} leave`;
 else t=`${G(0)} select · ${G(1)} back · D-pad / L-stick move`;
 if(lg.textContent!==t)lg.textContent=t};
// ---------- keyboard / mouse / touch take over again the moment they are used ----------
['pointerdown','mousemove','keydown','touchstart'].forEach(ev=>addEventListener(ev,e=>{if(ev==='mousemove'&&!(e.movementX||e.movementY))return;/* Tyler 2026-11-16 (MacBook + controller): a click, trackpad touch or key press switched controller mode off, so no icons or meter. Now: used in the last 10 s, the controller stays on */if(CTL.lastPad&&performance.now()-CTL.lastPad<10000)return;if(CTL.mode==='pad'){CTL.mode='kbm';document.body.classList.remove('ctlpad');ctlSet(null)}},{passive:true,capture:true}));
addEventListener('gamepadconnected',e=>{CTL.on=true;CTL.kind=ctlTypeOf(e.gamepad&&e.gamepad.id);CTL.id=e.gamepad&&e.gamepad.id||''});
addEventListener('gamepaddisconnected',()=>{CTL.on=false;CTL.mode='kbm';document.body.classList.remove('ctlpad');ctlSet(null);try{if(CTL.wasKb){kb.x=kb.y=0;CTL.wasKb=false}}catch(e){}});
// ---------- one frame of controller input ----------
const DZ=.28;
window.ctlStep=function(){try{
 const pads=(navigator.getGamepads&&navigator.getGamepads())||[];let p=null;for(const x of pads)if(x&&x.connected!==false){p=x;break}
 if(!p){return}
 CTL.on=true;if(p.id!==CTL.id){CTL.id=p.id;CTL.kind=ctlTypeOf(p.id)}
 const B=i=>!!(p.buttons[i]&&(p.buttons[i].pressed||p.buttons[i].value>.5)),ax=i=>{const v=p.axes[i]||0;return Math.abs(v)<DZ?0:v};
 const now=performance.now(),down=[],edge=i=>B(i)&&!CTL.prev[i];
 for(let i=0;i<17;i++)down[i]=B(i);
 const lx=ax(0),ly=ax(1),rx=ax(2),ry=ax(3),dl=B(14),dr=B(15),du=B(12),dd=B(13);
 const active=down.some(Boolean)||lx||ly||rx||ry;if(active)CTL.lastPad=now;
 if(active&&CTL.mode!=='pad'){CTL.mode='pad';document.body.classList.add('ctlpad')}
 if(CTL.mode!=='pad'){CTL.prev=down;return}
 ctlLegend();
 const root=ctlRoot(),lrw=document.getElementById('lrw'),inLR=typeof LR!=='undefined'&&LR&&lrw&&lrw.style.display==='block'&&!root;
 const inGame=typeof g!=='undefined'&&g&&document.getElementById('cv')&&document.getElementById('cv').style.display==='block'&&!root;
 // Start / Options: pause during a game
 if(edge(9)&&inGame&&typeof pause==='function'&&!g.paused){pause();CTL.prev=down;return}
 if(typeof ctlWatch=='function'&&ctlWatch(down,edge,lx,ly,rx,ry)){CTL.prev=down;return}
 if(inGame&&edge(8)&&typeof camb=='function')camb();
 if(root){
  // menus: D-pad or left stick, held = repeat after a pause (no machine-gun scrolling)
  let nx=dl?-1:dr?1:lx<-.5?-1:lx>.5?1:0,ny=du?-1:dd?1:ly<-.5?-1:ly>.5?1:0;
  if(nx||ny){const k=nx+','+ny,first=!CTL.rep.k||CTL.rep.k!==k,wait=first?0:(CTL.rep.n>1?110:300);if(first||now-CTL.rep.t>wait){ctlNav(ny?0:nx,ny);CTL.rep={k,t:now,n:first?1:(CTL.rep.n+1)}}}else CTL.rep={};
  if(!CTL.sel||!CTL.sel.isConnected||!root.contains(CTL.sel)){const C=ctlCands(root);if(C.length)ctlSet((typeof ctlKeep=='function'&&ctlKeep(C))||C[0])}
  if(edge(0))ctlPress();else if(edge(1))ctlBack();
  if(ry)try{root.scrollBy(0,ry*14)}catch(e){}
  CTL.prev=down;return}
 ctlSet(null);
 if(inLR){
  LR.joy=(lx||ly)?{x:lx,z:ly}:null;if(lx||ly){LR.tg=null;LR.pend=null}
  if(rx)LR.yaw=(LR.yaw||0)-rx*.045;if(ry)LR.pitch=cl((LR.pitch==null?.42:LR.pitch)+ry*.03,-.3,1.35);
  if(edge(0)){const a=document.getElementById('lra');if(a&&ctlVis(a)&&a.querySelector('button'))a.querySelector('button').click();else if(a&&ctlVis(a)&&a.onclick)a.click();else{
    // talk to / use whatever is nearest within reach
    let hit=null,bd=3.2;(LR.O||[]).forEach(o=>{const d=Math.hypot(o.x-LR.p.x,o.z-LR.p.z);if(d<bd){bd=d;hit=o}});if(hit){LR.pend=hit;LR.tg={x:LR.p.x,z:LR.p.z}}}}
  // Tyler 2026-11-16: walking the field, buttons to leave and to see the game stats (Y leave, X game stats)
  if(LR.field&&edge(3)){const b=[...document.querySelectorAll('#lrw button')].find(x=>/locker room|Leave/i.test(x.textContent));if(b){b.click();CTL.prev=down;return}}
  if(LR.field&&edge(2)){const b=document.querySelector('.bxb');if(b)b.click();else try{ovShow(`<h2>📊 Game stats</h2><p>${g.m.n} ${g.s[0]} – ${g.s[1]} ${g.o.n}</p><p>${sline(g.st)}</p><button class=g onclick=ovHide()>Back</button>`)}catch(e){}CTL.prev=down;return}
  if(edge(1))ctlBack();
  CTL.prev=down;return}
 if(inGame){
  // the same movement value the arrow keys set
  if(lx||ly){kb.x=lx;kb.y=-ly;CTL.wasKb=true}else if(CTL.wasKb){kb.x=kb.y=0;CTL.wasKb=false;try{kv()}catch(e){}}
  const P=g.pl;
  if(g.ph==='live'&&P){const q=P.qb;
   if(P.car===q&&!P.air&&!P.passed){if(typeof ctlPA=='function')ctlPA(down,edge,lx,ly);else for(let i=0;i<5;i++)if(edge(CTL_RB[i])){ctlThrow(i);break}}
   else if(P.car&&P.car!==q||(P.car===q&&P.passed)){
    // the game's own run moves (what a swipe does): right stick left/right juke, up truck; B spin
    const k=(rx||ry)?(Math.abs(rx)>Math.abs(ry)?'x':'y'):'';
    if(k&&!CTL.rs){CTL.rs=1;try{if(k==='x')mvmove(Math.sign(rx),0);else if(ry<0)mvmove(0,-1)}catch(e){}}if(!rx&&!ry)CTL.rs=0;
    if(edge(1))try{mvmove(1,-1)}catch(e){}
   }}
  else if(edge(0)&&g.ph==='pre'&&g.tk&&g.stage==='line'&&!g.am&&typeof hut==='function')hut();
 }
 CTL.prev=down}catch(e){}};
// ---------- a basic throw to the receiver wearing that button (phase 2 adds the meter) ----------
window.ctlRecv=function(){const P=g.pl;if(!P||!P.wr)return [];return P.wr.filter(w=>w&&!w.out).slice(0,5)};
window.ctlThrow=function(i){try{const P=g.pl,q=P.qb,w=ctlRecv()[i];if(!w||g.ph!=='live'||P.air||P.car!==q)return;
 const v=16+((S.q&&S.q.pow)||60)*.1;let T=Math.hypot(w.x-q.x,w.y-q.y)/v;for(let k=0;k<3;k++)T=Math.hypot(w.x+(w.vx||0)*T-q.x,w.y+(w.vy||0)*T-q.y)/v;
 let lx=w.x+(w.vx||0)*T,ly=w.y+(w.vy||0)*T;const Rg=thrR(),d=Math.hypot(lx-q.x,ly-q.y);if(d>Rg){lx=q.x+(lx-q.x)*Rg/d;ly=q.y+(ly-q.y)*Rg/d}
 g.swp={p:Math.round(Math.min(1,d/Rg)*100),t:performance.now()};doThrow(w,cl(lx,1.4,51.9),ly)}catch(e){}};
// ---------- the button over each receiver ----------
(()=>{try{const _d=draw;draw=function(){const r=_d.apply(this,arguments);try{if(CTL.mode==='pad'&&g&&g.ph==='live'&&g.pl&&g.pl.car===g.pl.qb&&!g.pl.air){const C=ctlRecv(),cols=CTL.kind==='ps'?['#5a8dee','#e0454e','#d77bd3','#3fbfa3','#ffffff']:['#3fb950','#e5534b','#4493f8','#e8b923','#ffffff'];
  C.forEach((w,i)=>{const s=pj(w.x,w.y,typeof paIconY!='undefined'?paIconY:2.6),s0=pj(w.x,w.y,2.4);if(!s||!isFinite(s[0]))return;const held=typeof PA!='undefined'&&PA.i>=0,sel=held&&PA.i===i,rr=sel?16:13;cx.save();cx.setTransform(1,0,0,1,0,0);cx.globalAlpha=held&&!sel?.35:1;if(s0&&isFinite(s0[0])){cx.strokeStyle=cols[i];cx.lineWidth=2;cx.beginPath();cx.moveTo(s[0],s[1]+rr);cx.lineTo(s0[0],s0[1]);cx.stroke()}cx.fillStyle='#000c';cx.beginPath();cx.arc(s[0],s[1],rr,0,7);cx.fill();cx.strokeStyle=cols[i];cx.lineWidth=sel?4:3;cx.stroke();cx.fillStyle='#fff';cx.font='bold '+(ctlGlyph(i).length>1?11:15)+'px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(ctlGlyph(i),s[0],s[1]+1);cx.restore()})}}catch(e){}return r}}catch(e){}})();
(function ctlLoop(){try{ctlStep()}catch(e){}requestAnimationFrame(ctlLoop)})();
