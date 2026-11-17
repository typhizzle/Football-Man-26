// ===== 🏈 CAMERON NUGENT: BACK TO THE START OF OVERTIME (Tyler 2026-11-17) =====
// The overtime game was played under the old rules (the first touchdown won it) and the save moved on to the Conference
// Championship. This puts that one career back where the game was tied 21-21 in the Divisional Round before the overtime coin
// toss, once, and opens the coin toss as soon as the save loads. It only ever touches a save that is the same career
// (same name, same seed, pro season 16, in 2026) and never runs twice.
/*CAMFIX_BEGIN*/window.CAMFIX=__BLOB__;/*CAMFIX_END*/
window.camFixGo=async function(sv){try{const B=window.CAMFIX,C=sv||S;if(!S&&C)S=C;   /* the normal load may have left S empty: work from the save that was loading */if(!B||!C||C.otfx3||C.name!=='Cameron Nugent'||C.stage!=='pro'||(C.py||0)!==16||yrN()!==2026)return false;if(S.gsave&&S.gsave.ot)return false;
 C.otfx3=1;                                                        // never loop
 const fake={doc:k=>({get:async()=>B[k]?{exists:true,data:B[k]}:{exists:false}})};const S2=mig(await cdGet2(fake,'slot6'));
 if(!S2||S2.name!==C.name||S2.seed!==C.seed||!S2.gsave||!S2.gsave.ot)return false;
 const slot=(typeof SLOT!=='undefined'&&SLOT)||6;S2.otfx1=1;S=S2;try{SLOT=slot}catch(e){}try{LASTJ=''}catch(e){}save();return true}catch(e){return false}};
(()=>{try{const _h=hub;let busy=0;hub=function(){const sv=S,elig=!busy&&window.CAMFIX&&sv&&!sv.otfx3&&sv.name==='Cameron Nugent'&&sv.stage==='pro'&&(sv.py||0)===16&&yrN()===2026;
 let r;try{r=_h.apply(this,arguments)}finally{   /* the game ALWAYS loads first; the overtime restore runs after and can never block it */
  if(elig){busy=1;setTimeout(()=>{try{camFixGo(sv).then(ok=>{busy=0;try{if(ok&&typeof gsOk==='function'&&gsOk()){resumeG();try{gsnap();save()}catch(e){}}}catch(e){}}).catch(()=>{busy=0})}catch(e){busy=0}},250)}}
 return r};window.hub=hub}catch(e){}})();
// Tyler 2026-11-17: the overtime toss looks like the opening toss (ref + captains at midfield) and YOU call heads or tails
(()=>{try{const _o=otStart;otStart=function(){const r=_o.apply(this,arguments);try{if(g&&g.lv==='pro'){try{tossBuild()}catch(e){}ovShow(`<h2>🪙 Overtime coin toss</h2><p>The referee meets the captains at midfield. Call it.</p><button onclick="otToss(0)">Heads</button><button onclick="otToss(1)">Tails</button>`)}}catch(e){}return r};window.otStart=otStart}catch(e){}})();
(()=>{try{const _p=pre;pre=function(){try{if(typeof TSG!=='undefined'&&TSG&&g&&g.ot)tossClear()}catch(e){}return _p.apply(this,arguments)};window.pre=pre}catch(e){}})();
