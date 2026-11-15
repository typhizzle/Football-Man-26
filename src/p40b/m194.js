// ===== 🔙 BACK FROM RETIREMENT MEANS BACK ON THE FIELD · RESTART A SEASON · ROSTERS NEVER MISSING =====
// Tyler, 2026-11-15: "I would have rather restarted that entire season than give up that whole season without Ricky MaClones and Jarsh
// Fallon. I would rather just start the season all over so they're not losing any progress ... Nothing needs to drop at all ...
// No roster should ever be broken. That's part of player lives matter."
// WHAT WENT WRONG: the return fix (m187) put a returning QB at the END of his team's roster unless it was week 0, so a 98 OVR sat
// behind an injured 84 and a 70 all season and never played (no 2037 games for MaClones or Fallon).
// NOW:
//  1. A QB who comes back from retirement and is better than the starter IS the starter (the starter moves into his spot; nobody is
//     dropped). Saves where it already went wrong are repaired the next time they load (they start the very next game).
//  2. Every season start is kept on this device for good ("start of season"), and "↺ Restart this season" (player menu → Backups)
//     puts the career back to that moment. Without a start copy it uses the end of last season (the offseason plays again).
//     What you have now is kept too, so a restart can be undone from Backups.
//  3. A pro career whose team rosters didn't come through is never opened (opening it would build brand-new rosters).
window.qbStart=function(i,x){try{const L=rost('h.'+i);if(!L||!x)return false;const k=L.findIndex(y=>y&&y.n===x.n);if(k<=0)return false;const s=L[0];if(s&&s.n===S.name)return false;   /* never benches you */
 if(!s||s.pos!=='QB'||s.inj||(x.ovr||0)>(s.ovr||0)){L[k]=s;L[0]=x;return true}return false}catch(e){return false}};
window.retStartFix=function(){try{if(!S||S.stage!=='pro'||S.retsf)return 0;S.retsf=1;let n=0;
 const back=new Set();(S.retq||[]).forEach(e=>{if(e&&e.done&&e.s&&e.s.pos==='QB')back.add(e.s.n)});(S.retArc||[]).forEach(e=>{if(e&&e.done&&e.s&&e.s.pos==='QB')back.add(e.s.n)});
 for(const k in S.ro){if(!/^h\.\d+$/.test(k))continue;const i=+k.slice(2);const L=S.ro[k];if(!Array.isArray(L)||(L[0]&&L[0].n===S.name))continue;
  L.forEach(x=>{if(x&&x.pos==='QB'&&(back.has(x.n)||x.back)&&qbStart(i,x))n++})}
 if(n)S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🔙 '+n+' QB'+(n>1?'s':'')+' back from retirement had been left on the bench. They start from the next game.';return n}catch(e){return 0}};
(()=>{try{const _h=hub;hub=function(){try{retStartFix()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// returning players from now on: placed as the starter when better
(()=>{try{const _f=ret90Fix;window.ret90Fix=function(){const r=_f.apply(this,arguments);try{if(r){S.retsf=0;retStartFix()}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _b=retBack;window.retBack=function(j){const e=(S.retArc||[])[j];const r=_b.apply(this,arguments);try{if(e&&e.done&&e.s&&e.s.pos==='QB'){const i=e.i>=0&&S.T[e.i]?e.i:1;const L=rost('h.'+i);const x=L.find(y=>y&&y.n===e.s.n);if(x)qbStart(i,x)}}catch(_){}return r}}catch(e){}})();
// ---- season start copies (kept for good) ----
(()=>{try{const _s=Storage.prototype.setItem;let last={};Storage.prototype.setItem=function(k,v){try{if(this===localStorage&&typeof kpSlotOf=='function'){const i=kpSlotOf(k);if(i&&S&&S.T&&SLOT===i){const yr=yrN(),key=i+'|'+yr+'|'+(S.stage||'');
   if((S.wk||0)<=1&&!S.ofs&&last[i]!==key){const tag=(S.name||'').replace(/[^A-Za-z0-9]/g,'').slice(0,20);const f=kpInfoV(v);if(f&&f.wk<=2){last[i]=key;kpGet('start_'+i+'_'+yr+'_'+tag).then(x=>{if(!x)kpPut('start_'+i+'_'+yr+'_'+tag,v,{...f,start:1})})}}}}}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();
window.seasonCopy=async function(i){try{const all=await kpAll();const cur=load(i);if(!cur)return null;const yr=(()=>{const S0=S;S=cur;try{return yrN()}finally{S=S0}})();
 const same=x=>{try{const s=JSON.parse(dz(x.v));return sameCareer(s,cur)?s:null}catch(e){return null}};
 const st=all.filter(x=>new RegExp('^start_'+i+'_'+yr+'_').test(String(x.id)));for(const x of st){const s=same(x);if(s)return {id:x.id,s,kind:'start',yr}}
 const en=all.filter(x=>new RegExp('^end_'+i+'_'+(yr-1)+'_').test(String(x.id))).sort((a,b)=>(b.t||0)-(a.t||0));for(const x of en){const s=same(x);if(s)return {id:x.id,s,kind:'end',yr}}return {none:1,yr}}catch(e){return null}};
window.seasonRestart=async function(){try{const i=SLOT;const c=await seasonCopy(i);if(!c||c.none){alert('This device has no copy of '+((c&&c.yr)||'this')+' season\'s start or of the end of last season, so the season can\'t be restarted here. Try on the device you played the start of the season on.');return}
 const msg=c.kind==='start'?`Restart the ${c.yr} season? Your career goes back to the start of ${c.yr} (week 1). What you have now is kept in Backups.`:`Restart the ${c.yr} season? This device's copy is from the end of ${c.yr-1}, so the ${c.yr} offseason (draft, free agency, retirements) plays again, then the season. What you have now is kept in Backups.`;
 if(!confirm(msg))return;window._kpNoAsk=1;const _c=window.confirm;window.confirm=()=>true;try{await kpUse(c.id)}finally{window.confirm=_c;window._kpNoAsk=0}S=load(i);LASTJ='';S.fmsg=(S.fmsg?S.fmsg+' ':'')+`↺ The ${c.yr} season starts over.`;save();hub()}catch(e){alert('Could not restart: '+e.message)}};
(()=>{try{const _v=bkV;window.bkV=function(){const r=_v.apply(this,arguments);try{if(S&&S.T&&!ui.querySelector('[data-rss]')){const yr=yrN();const c=document.createElement('div');c.className='card';c.setAttribute('data-rss','1');c.innerHTML=`<b>↺ Restart this season</b><br><small>Puts ${esc(S.name||'your career')} back to the start of ${yr} (uses this device's start-of-season copy, or the end of ${yr-1} if that's all it has). Your current save is kept here too.</small><button onclick="seasonRestart()">↺ Restart the ${yr} season</button>`;(ui.firstElementChild||ui).appendChild(c)}}catch(e){}return r}}catch(e){}})();
// ---- a pro career with no team rosters is never opened (it would build brand-new ones) ----
window.roMissing=function(s){try{if(!s||!(s.stage==='pro'||s.stage==='col'))return false;const n=Object.keys(s.ro||{}).filter(k=>/^h\.\d+$/.test(k)).length;return n===0&&((s.tx&&s.tx.length>20)||(s.hist&&s.hist.length>2)||s.stage==="pro")}catch(e){return false}};
// mig() quietly builds brand-new rosters for a save that has none: mark such a save before it can
(()=>{try{const _m=mig;mig=function(s){const miss=roMissing(s);const r=_m.apply(this,arguments);try{if(miss&&r)r._noro=1}catch(e){}return r}}catch(e){}})();
(()=>{try{const _h=hub;hub=function(){try{if(S&&S._noro){const nm=S.name;S=null;g=null;HM='⚠️ '+nm+'\'s team rosters didn\'t load, so the career wasn\'t opened (opening it would have made new rosters). Nothing was changed. Try again from the menu, or open it on the device you last played on.';return menuMain()}}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
