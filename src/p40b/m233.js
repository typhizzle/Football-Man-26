// ===== 🧮 WEIGHTED QB OVERALL (football logic) =====
// Tyler 2026-11-16: "if [Madden is] just picking overall and pick their attributes, then I guess we can do that too. I'll just need a good
// weighted system for quarterbacks ... not many quarterbacks have a 99 ... come up with a weighted system for the upgrading ... close to
// what I gave you and makes football logic".
// Weights: accuracy 25 · awareness 23 · throw power 15 · lob 5 · touch 5 · bullet 5 · speed 10 · carrying 7 · truck 5.
// Scale (Madden-style): up to 75 the overall is the weighted value; above 75 each point counts 1.139 (so mid-90s ratings = a 98 without
// 99s). Tyler's numbers: Ricky MaClones -> 98, Jarsh Fallon -> 97. Upgrades: accuracy/awareness move the overall most, truck least.
// EXISTING careers keep the overall they have (pinned at the switch; their upgrades still move it by the new weights). New careers use it.
window.QOW={acc:.25,awr:.23,pow:.15,lob:.05,tch:.05,blt:.05,mob:.10,sec:.07,trk:.05};
window.qoRaw=function(q,pt){pt=pt||(typeof ptBase=='function'?ptBase(q):{lob:q.acc,tch:q.acc,blt:q.acc});const t={...q,trk:q.trk==null?q.sec:q.trk,lob:pt.lob,tch:pt.tch,blt:pt.blt};
 let W=0;for(const k in QOW)W+=QOW[k]*(t[k]||0);return W<=75?W:75+(W-75)*1.139};
window.qoBase=function(q,pt){const r=qoRaw(q,pt);if(r>75)return r;const t=[q.acc,q.pow,q.awr,q.mob,q.sec,q.trk==null?q.sec:q.trk];return t.reduce((a,b)=>a+(b||0),0)/6};   /* below 75 the plain average; weights shape the elite end */
window.qoW=function(q,v){if(!q)return null;if(v.every(x=>x>=100))return 100;let pt=null;try{if(typeof S!='undefined'&&S&&q===S.q)pt=ptGet()}catch(e){}
 let raw=qoBase(q,pt);   /* below 75 the plain average (Tyler's age list, every low-end career unchanged); weights only shape the elite end */
 let o=raw;try{if(typeof S!='undefined'&&S&&q===S.q&&S.ovP2)o=S.ovP2.o+(raw-S.ovP2.b)}catch(e){}try{if(typeof S!='undefined'&&S&&q===S.q&&typeof ageCap=='function'){const c=ageCap(S.age||0);if(c<100)o=Math.min(o,c)}}catch(e){}return Math.max(1,Math.min(99,Math.round(o)))};   /* Tyler's age ceilings cap the overall too */
// existing careers: pin the overall they have right now (computed the old way), once
window.qoPinOld=function(s){try{if(!s||!s.q||s.ovP2||s.qoNew)return 0;const v=[s.q.acc,s.q.pow,s.q.awr,s.q.mob,s.q.sec,s.q.trk==null?s.q.sec:s.q.trk];
 let old=s.ovPin?Math.max(1,Math.min(99,Math.round(s.ovPin.o+(v.reduce((a,b)=>a+(b||0),0)/6-s.ovPin.b)))):Math.min(Math.round(v.reduce((a,b)=>a+b,0)/6),v.every(x=>x>=100)?100:99);
 const o=S;S=s;let raw;try{raw=qoBase(s.q,ptGet())}finally{S=o}s.ovP2={o:old,b:raw};return 1}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)qoPinOld(r)}catch(e){}return r}}catch(e){}})();
// a brand-new career is born on the new system (no pin)
['newC','tkGo','faqSign'].forEach(f=>{try{const _f=window[f];if(typeof _f!=='function')return;const w=function(){const r=_f.apply(this,arguments);try{if(S){delete S.ovP2;delete S.ovPin;S.qoNew=1;const nm_=S.tk||S.name,X=typeof QBX26!='undefined'&&QBX26[nm_];if(X&&nm_!=='Ricky MaClones'&&nm_!=='Jarsh Fallon'){const o_=X.ovr!=null?X.ovr:Math.round(X.s.reduce((a,b)=>a+b,0)/6);['acc','pow','awr','mob','sec','trk'].forEach((k,i)=>S.q[k]=X.s[i]);S.ovP2={o:o_,b:qoBase(S.q,ptGet())}   /* Tyler: "I gave you attributes for Johnny Football ... just keep those": his exact ratings + his overall */}}}catch(e){}   /* Tyler's set overall (Cam 68, Johnny 57) stays his on a new career */return r};window[f]=w;try{eval(f+'=w')}catch(e){}}catch(e){}});
