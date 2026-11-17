// ===== 🏈 CAMERON NUGENT: BACK TO THE START OF OVERTIME (Tyler 2026-11-17) =====
// The overtime game was played under the old rules (the first touchdown won it) and the save moved on to the Conference
// Championship. This puts that one career back where the game was tied 21-21 in the Divisional Round before the overtime coin
// toss, once, and opens the coin toss as soon as the save loads. It only ever touches a save that is the same career
// (same name, same seed, pro season 16, in 2026) and never runs twice.
/*CAMFIX_BEGIN*/window.CAMFIX=__BLOB__;/*CAMFIX_END*/
window.camFixGo=async function(){try{const B=window.CAMFIX;if(!B||!S||S.otfx1||S.name!=='Cameron Nugent'||S.stage!=='pro'||(S.py||0)!==16||yrN()!==2026)return false;if(S.gsave&&S.gsave.ot)return false;
 S.otfx1=1;                                                         // never loop
 const fake={doc:k=>({get:async()=>B[k]?{exists:true,data:B[k]}:{exists:false}})};const S2=mig(await cdGet2(fake,'slot6'));
 if(!S2||S2.name!==S.name||S2.seed!==S.seed||!S2.gsave||!S2.gsave.ot)return false;
 const slot=(typeof SLOT!=='undefined'&&SLOT)||6;S2.otfx1=1;S=S2;try{SLOT=slot}catch(e){}try{LASTJ=''}catch(e){}save();return true}catch(e){return false}};
(()=>{try{const _h=hub;let busy=0;hub=function(){try{if(!busy&&window.CAMFIX&&S&&!S.otfx1&&S.name==='Cameron Nugent'&&S.stage==='pro'&&(S.py||0)===16&&yrN()===2026){busy=1;const a=arguments,self=this;ovShow('<h2>🏈 Putting you back at the start of overtime…</h2>');
  camFixGo().then(ok=>{busy=0;try{ovHide()}catch(e){}if(ok&&typeof gsOk==='function'&&gsOk()){try{resumeG();try{gsnap();save()}catch(e){}return}catch(e){}}return _h.apply(self,a)});return}}catch(e){busy=0}return _h.apply(this,arguments)};window.hub=hub}catch(e){}})();
