// ===== 🎮 CONTROLLER: tap passing by default + throwaway + slide + option plays (Tyler 2026-11-17) =====
// "Make the default controller option just tapping the button. No placement and accuracy right now... add different modes
//  like Madden does." · "press down right stick for the throwaway" · "slide is square once you pass the line" ·
// "curl flat isn't really a curl flat... the options aren't really option plays".
// Modes (pause menu → Controller passing): TAP (default: tap a receiver's button, your QB's ratings decide the throw)
// and METER (the placement-and-accuracy meter, unchanged, for later).
window.cpmOf=function(){return (S&&S.cpm)||'tap'};
window.cpmT=function(){S.cpm=cpmOf()==='tap'?'meter':'tap';try{save()}catch(e){}};
(()=>{try{const _p=pm;pm=function(){const r=_p.apply(this,arguments);try{const ov_=document.getElementById('ov'),b=ov_&&[...ov_.querySelectorAll('button')].find(x=>/^Camera:/.test(x.textContent));
 if(b&&!ov_.querySelector('#cpmb')){const n=document.createElement('button');n.className='g';n.id='cpmb';n.textContent='Controller passing: '+(cpmOf()==='tap'?'Tap (simple)':'Meter (placement + accuracy)');n.onclick=()=>{cpmT();pm()};b.parentNode.insertBefore(n,b)}}catch(e){}return r};window.pm=pm}catch(e){}})();
// the field: is the QB holding the ball behind the line
const qbHold_=()=>{const P=g&&g.pl,q=P&&P.qb;return !!(P&&q&&g.ph==='live'&&P.car===q&&!P.air&&!P.passed)};
// throwaway: out of bounds past the receiver nearest the sideline you're facing (no catch possible)
window.ctlAway=function(){try{const P=g.pl,q=P.qb;if(!qbHold_()||q.y>g.los+.6)return false;const side=q.x<26.65?-1:1,R=(P.wr||[]).filter(w=>w&&!w.out);
 const w=R.sort((a,b)=>side<0?a.x-b.x:b.x-a.x)[0];if(!w)return false;const ly=Math.min(q.y+thrR()*.6,q.y+14);P.swq=1;g.swp={p:60,t:performance.now()};g.flash='THROWAWAY';g.ft=.8;doThrow(w,side<0?-3:56.5,ly);return true}catch(e){return false}};
// slide: the QB with the ball past the line of scrimmage
window.ctlSlide=function(){try{const P=g.pl,q=P&&P.qb,c=P&&P.car;if(!P||g.ph!=='live'||!c||c!==q||P.air||q.y<=g.los+.6)return false;g.flash='SLIDE';g.ft=.7;c.sl=1;endPlay(c.y,'SLIDE — ball secured');return true}catch(e){return false}};
// ---------- option plays ----------
// READ OPTION: the back dives right, the QB reads the left end. End crashes on the back → QB keeps (left). End stays home → give.
// SPEED OPTION: QB attacks the right edge, the back trails him in pitch relationship; pitch any time before he's tackled.
// TRIPLE OPTION: the read (give or keep), then after a keep the back loops into pitch relationship.
// Controller: hold A/✕ through the mesh = give, hold B/○ = keep, nothing = the QB reads it. LB/L1 = pitch. Touch: swipe as before.
window.OPTD={'Read Option':{read:1,dir:-1},'Speed Option':{read:0,dir:1},'Triple Option':{read:1,dir:-1,pitch:1}};
window.optOf=function(P){try{return P&&P.call&&P.call.t==='option'&&OPTD[P.call.n]||null}catch(e){return null}};
window.optPitch=function(){try{const P=g.pl,q=P&&P.qb,o=optOf(P),r=P&&P.rb;if(!o||!q||P.car!==q||P.air||P.op||!r||r.out)return false;
 if(Math.hypot(r.x-q.x,r.y-q.y)>9||r.y>q.y+1){g.flash='No pitch man';g.ft=.7;return false}
 P.op=1;P.car=r;P.handed=1;P.run=true;P.passed=false;P.lane=cl(r.x+(o.dir||1)*3,4,49);q.vx=q.vy=0;g.flash='PITCH';g.ft=.7;return true}catch(e){return false}};
window.optGive=function(){const P=g.pl,q=P.qb,r=P.rb;P.op=1;P.car=r;P.handed=1;P.run=true;P.lane=cl(q.x+3,20,34);q.vx=q.vy=0;g.flash='GIVE';g.ft=.7};
window.optStep=function(P){try{const o=optOf(P),q=P&&P.qb,r=P&&P.rb;if(!o||!q||!r||P.done)return;
 if(o.read&&!P.ord&&P.car===q){
  // the mesh: the back crosses the QB's face toward the right A gap
  if(P.t<.75){r.wp=[[q.x+2.6,g.los-.6]];r.hold=false}
  else{P.ord=1;let give;const ask=CTL&&CTL.optAsk;if(ask==='give')give=true;else if(ask==='keep')give=false;else{
    const L=(P.dl||[]).filter(d=>d.x<q.x).sort((a,b)=>a.x-b.x)[0];give=!L||!(L.x>q.x-3.5||(L.vx||0)>.6)}
   if(give){optGive();return}g.flash='KEEP';g.ft=.7;r.wp=[[r.x,g.los+2]]}}
 // pitch relationship: about 4.5 yds outside and 1.5 behind the QB
 if(P.car===q&&!P.op&&(!o.read||(o.pitch&&P.ord))){r.hold=false;r.wp=[[cl(q.x+o.dir*4.5,2,51.3),Math.min(q.y-1.5,g.los+4)]];r.sp0=r.sp0||r.sp;r.sp=Math.max(r.sp0,(q.sp||7)*1.05)}
 }catch(e){}};
(()=>{try{const _u=upd;upd=function(dt){try{if(g&&g.pl)optStep(g.pl)}catch(e){}return _u.apply(this,arguments)}}catch(e){}})();
// ---------- the controller ----------
(()=>{try{const _pa=window.ctlPA;window.ctlPA=function(down,edge,lx,ly){try{const P=g.pl,q=P&&P.qb;
 if(q&&q.y>g.los+.6)return;                                   // past the line: no throws (Square = slide, see below)
 if(optOf(P))return;                                           // option: buttons are give/keep/pitch, not receivers
 if(edge(11)){ctlAway();return}                                // R3 = throwaway
 if(cpmOf()==='tap'){if(typeof PA!=='undefined')PA={i:-1};for(let i=0;i<5;i++)if(edge(CTL_RB[i])&&ctlRecv()[i]){ctlThrow(i);break}return}
 }catch(e){}return _pa&&_pa.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _s=window.ctlStep;let prev=[];window.ctlStep=function(){try{if(CTL.mode==='pad'&&typeof g!=='undefined'&&g&&g.ph==='live'&&g.pl&&!g.paused){
 const p=[...((navigator.getGamepads&&navigator.getGamepads())||[])].find(x=>x&&x.connected!==false);if(p){
  const B=i=>!!(p.buttons[i]&&(p.buttons[i].pressed||p.buttons[i].value>.5)),E=i=>B(i)&&!prev[i],P=g.pl,q=P.qb;
  CTL.optAsk=optOf(P)?(B(0)?'give':B(1)?'keep':CTL.optAsk==null?null:CTL.optAsk):null;
  if(E(2)&&P.car===q&&q.y>g.los+.6){ctlSlide()}
  else if(E(4)&&optOf(P)&&P.car===q){optPitch()}
  else if(E(11)&&qbHold_()&&!optOf(P)&&q.y<=g.los+.6&&cpmOf()!=='tap'){/* meter mode: ctlPA sees R3 too */}
  prev=[];for(let i=0;i<17;i++)prev[i]=B(i)}}else{CTL.optAsk=null}}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();
// legend: what the buttons do right now
(()=>{try{const _g=window.ctlLegend;window.ctlLegend=function(){_g.apply(this,arguments);try{const lg=document.getElementById('ctlleg'),P=g&&g.pl,q=P&&P.qb;if(!lg||!g||g.ph!=='live'||!P||P.car!==q||P.air||ctlRoot())return;const G=k=>ctlGlyph(k),ps=CTL.kind==='ps',pt=ps?'L1':'LB',r3=ps?'R3':'R3';let t=null;
 if(q.y>g.los+.6)t=`${ps?'□':'X'} slide · R-stick juke/truck · ${G(1)} spin`+(optOf(P)&&!P.op?` · ${pt} pitch`:'');
 else if(optOf(P))t=(optOf(P).read&&!P.ord?`hold ${G(0)} give · hold ${G(1)} keep · `:'')+`${pt} pitch · L-stick run`;
 else if(cpmOf()==='tap')t=`${G(0)} ${G(1)} ${G(2)} ${G(3)} ${G(4)} tap to throw · ${r3} throw it away · L-stick move`;
 if(t&&lg.textContent!==t)lg.textContent=t}catch(e){}}}catch(e){}})();
