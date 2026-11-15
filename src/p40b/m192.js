// ===== 🎮 Controller polish (found playing it through with a pad, 2026-11-15) =====
// 1. When a menu redraws (picking a play category, toggling a setting) the highlight stays on what you pressed instead of
//    jumping back to the first button; picking a play category moves it straight onto that category's plays.
// 2. Watching a drive: the "Skip drive" box used to take the controller, so the stick couldn't walk the sideline and A skipped
//    the drive. Now: L-stick walk · R-stick look · Y change view · X skip drive.
// 3. View / Share button: change camera in any game.
(()=>{try{const _p=ctlPress;window.ctlPress=function(){try{const el=CTL.sel;if(el){CTL.lastOc=el.getAttribute&&el.getAttribute('onclick')||'';CTL.lastTx=(el.textContent||'').trim()}}catch(e){}return _p.apply(this,arguments)}}catch(e){}})();
window.ctlKeep=function(C){try{const oc=CTL.lastOc||'';if(!oc)return null;CTL.lastOc='';
 if(/^g\.tab=/.test(oc)){const c=C.find(el=>el.classList&&el.classList.contains('pc'));if(c)return c}
 return C.find(el=>(el.getAttribute('onclick')||'')===oc)||C.find(el=>(el.textContent||'').trim()===CTL.lastTx)||null}catch(e){return null}};
window.ctlWatch=function(down,edge,lx,ly,rx,ry){try{if(typeof g!=='undefined'&&g&&!g.watch&&cv.style.display==='block'&&(rx||ry)&&(CAMI==1||CAMI==2)){const P=g.pl;if(g.ph==='pre'||(P&&P.car===P.qb&&!P.passed&&!P.air)){LY=cl(LY+rx*.04,-1.7,1.7);LP=cl(LP-ry*.025,-.5,.7)}}
 if(!(typeof g!=='undefined'&&g&&g.watch&&cv.style.display==='block'))return false;
 const o=document.getElementById('ov');const onlySkip=!o||o.style.display==='none'||!!(o.textContent||'').trim().match(/^Skip drive$/);if(!onlySkip)return false;
 ctlSet(null);if(lx||ly){kb.x=lx;kb.y=-ly;CTL.wasKb=true}else if(CTL.wasKb){kb.x=kb.y=0;CTL.wasKb=false}
 if(rx||ry){SLV.yo=cl(SLV.yo+rx*.05,-1.6,1.6);SLV.po=cl(SLV.po-ry*.03,-.5,.6);SLV.lt=performance.now()/1000}
 if(edge(3)||edge(8))camb();if(edge(2))skipW();return true}catch(e){return false}};
(()=>{try{const _l=ctlLegend;window.ctlLegend=function(){const r=_l.apply(this,arguments);try{if(typeof g!=='undefined'&&g&&g.watch){const lg=document.getElementById('ctlleg');const t=`L-stick walk · R-stick look · ${ctlGlyph(3)} change view · ${ctlGlyph(2)} skip drive`;if(lg&&lg.textContent!==t)lg.textContent=t}}catch(e){}return r}}catch(e){}})();
// Mac: Safari names pads "<vendor>-<product>-<name>" (e.g. "54c-ce6-DualSense Wireless Controller", "45e-b13-Xbox Wireless Controller")
(()=>{try{const _t=ctlTypeOf;window.ctlTypeOf=function(id){const s=String(id||'');if(/(^|[^0-9a-f])0*54c-|wireless controller|dualsense|dualshock|playstation/i.test(s)&&!/xbox/i.test(s))return 'ps';return _t.apply(this,arguments)}}catch(e){}})();
// B in the locker room (no "Leave" there): opens the player menu, the same as the ☰ button
(()=>{try{const _b=ctlBack;window.ctlBack=function(){const r=_b.apply(this,arguments);if(r)return r;try{const w=document.getElementById('lrw');if(w&&w.style.display==='block'){const m=[...w.querySelectorAll('button')].find(x=>/☰/.test(x.textContent));if(m){m.click();return true}}}catch(e){}return false}}catch(e){}})();
