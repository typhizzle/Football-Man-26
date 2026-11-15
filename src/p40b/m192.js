// ===== 🎮 Controller polish (found playing it through with a pad, 2026-11-15) =====
// 1. When a menu redraws (picking a play category, toggling a setting) the highlight stays on what you pressed instead of
//    jumping back to the first button; picking a play category moves it straight onto that category's plays.
// 2. Watching a drive: the "Skip drive" box used to take the controller, so the stick couldn't walk the sideline and A skipped
//    the drive. Now: L-stick walk · R-stick look · Y change view · X skip drive.
// 3. View / Share button: change camera in any game.
(()=>{try{const _p=ctlPress;ctlPress=function(){try{const el=CTL.sel;if(el){CTL.lastOc=el.getAttribute&&el.getAttribute('onclick')||'';CTL.lastTx=(el.textContent||'').trim()}}catch(e){}return _p.apply(this,arguments)}}catch(e){}})();
window.ctlKeep=function(C){try{const oc=CTL.lastOc||'';if(!oc)return null;CTL.lastOc='';
 if(/^g\.tab=/.test(oc)){const c=C.find(el=>el.classList&&el.classList.contains('pc'));if(c)return c}
 return C.find(el=>(el.getAttribute('onclick')||'')===oc)||C.find(el=>(el.textContent||'').trim()===CTL.lastTx)||null}catch(e){return null}};
window.ctlWatch=function(down,edge,lx,ly,rx,ry){try{if(!(typeof g!=='undefined'&&g&&g.watch&&cv.style.display==='block'))return false;
 const o=document.getElementById('ov');const onlySkip=!o||o.style.display==='none'||!!(o.textContent||'').trim().match(/^Skip drive$/);if(!onlySkip)return false;
 ctlSet(null);if(lx||ly){kb.x=lx;kb.y=-ly;CTL.wasKb=true}else if(CTL.wasKb){kb.x=kb.y=0;CTL.wasKb=false}
 if(rx||ry){SLV.yo=cl(SLV.yo-rx*.05,-1.6,1.6);SLV.po=cl(SLV.po-ry*.03,-.5,.6);SLV.lt=performance.now()/1000}
 if(edge(3)||edge(8))camb();if(edge(2))skipW();return true}catch(e){return false}};
(()=>{try{const _l=ctlLegend;ctlLegend=function(){const r=_l.apply(this,arguments);try{if(typeof g!=='undefined'&&g&&g.watch){const lg=document.getElementById('ctlleg');const t=`L-stick walk · R-stick look · ${ctlGlyph(3)} change view · ${ctlGlyph(2)} skip drive`;if(lg&&lg.textContent!==t)lg.textContent=t}}catch(e){}return r}}catch(e){}})();
