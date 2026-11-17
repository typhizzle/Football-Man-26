// ===== 🏈 CAMERON NUGENT: BACK TO THE START OF OVERTIME (Tyler 2026-11-17) =====
// The overtime game was played under the old rules (the first touchdown won it) and the save moved on to the Conference
// Championship. This puts that one career back where the game was tied 21-21 in the Divisional Round before the overtime coin
// toss, once, and opens the coin toss as soon as the save loads. It only ever touches a save that is the same career
// (same name, same seed, pro season 16, in 2026) and never runs twice.
/*CAMFIX_BEGIN*/window.CAMFIX=__BLOB__;/*CAMFIX_END*/
window.camFixGo=async function(){try{const B=window.CAMFIX;if(!B||!S||S.otfx3||S.name!=='Cameron Nugent'||S.stage!=='pro'||(S.py||0)!==16||yrN()!==2026)return false;if(S.gsave&&S.gsave.ot)return false;
 S.otfx3=1;                                                         // never loop
 const fake={doc:k=>({get:async()=>B[k]?{exists:true,data:B[k]}:{exists:false}})};const S2=mig(await cdGet2(fake,'slot6'));
 if(!S2||S2.name!==S.name||S2.seed!==S.seed||!S2.gsave||!S2.gsave.ot)return false;
 const slot=(typeof SLOT!=='undefined'&&SLOT)||6;S2.otfx1=1;S=S2;try{SLOT=slot}catch(e){}try{LASTJ=''}catch(e){}save();return true}catch(e){return false}};
(()=>{try{const _h=hub;let busy=0;hub=function(){try{if(!busy&&window.CAMFIX&&S&&!S.otfx3&&S.name==='Cameron Nugent'&&S.stage==='pro'&&(S.py||0)===16&&yrN()===2026){busy=1;const a=arguments,self=this;ovShow('<h2>🏈 Putting you back at the start of overtime…</h2>');
  camFixGo().then(ok=>{busy=0;try{ovHide()}catch(e){}if(ok&&typeof gsOk==='function'&&gsOk()){try{resumeG();try{gsnap();save()}catch(e){}return}catch(e){}}return _h.apply(self,a)});return}}catch(e){busy=0}return _h.apply(this,arguments)};window.hub=hub}catch(e){}})();
// Tyler 2026-11-17: the overtime toss looks like the opening toss (ref + captains at midfield) and YOU call heads or tails
(()=>{try{const _o=otStart;otStart=function(){const r=_o.apply(this,arguments);try{if(g&&g.lv==='pro'){try{tossBuild()}catch(e){}ovShow(`<h2>🪙 Overtime coin toss</h2><p>The referee meets the captains at midfield. Call it.</p><button onclick="otToss(0)">Heads</button><button onclick="otToss(1)">Tails</button>`)}}catch(e){}return r};window.otStart=otStart}catch(e){}})();
(()=>{try{const _p=pre;pre=function(){try{if(typeof TSG!=='undefined'&&TSG&&g&&g.ot)tossClear()}catch(e){}return _p.apply(this,arguments)};window.pre=pre}catch(e){}})();
