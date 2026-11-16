// ===== ➕ DAWSON KINGSLEY · TE · BUFFALO · 83 (Tyler 2026-11-16) =====
// Real counterpart: Dawson Knox. Real seasons (checked against his career totals 229 rec / 2,694 yds / 27 TD through 2025):
// 2019 15g 28-388-2 · 2020 12g 24-288-3 · 2021 15g 49-587-9 · 2022 15g 48-517-6 · 2023 12g 22-186-2 · 2024 16g 22-311-1 · 2025 17g 36-417-4.
// Like every added star, his card carries the real 2022-2025 seasons (the game's real-history window). Then:
//  - every save (and every new world): he is on Buffalo, starting TE. Tyler: "Auto-generated people can vanish if I'm replacing them with
//    a real player": an auto-generated starter is replaced; a real one moves to the bench;
//  - a save already in the middle of 2026: the weeks already played stay exactly as they were (his old starter keeps those lines);
//    his own games start the week he arrives; after that, the game's box scores (tied to the QB's passing) keep his season;
//  - a save past his playing days (age 36+, e.g. a 2037 league): he isn't added (no invented seasons).
window.DKX={n:'Dawson Kingsley',pos:'TE',ovr:83,num:88,team:1,age26:29,h:[[2022,1,517,6],[2023,1,186,2],[2024,1,311,1],[2025,1,417,4]]};
window.dkRoster=function(s){try{const pro=s.stage==='pro'||s.stage==='draft';if(pro){const i=(s.T||[]).findIndex((t,k)=>{try{const o=S;S=s;const r=pIdx(t);S=o;return r===DKX.team}catch(e){return false}});return i>=0?'h.'+i:null}return 'p.'+DKX.team}catch(e){return null}};
window.dkAdd=function(s){try{s=s||S;if(!s||!s.ro||s.dk1)return 0;const o=S;S=s;let yr;try{yr=yrN()}finally{S=o}const age=DKX.age26+(yr-2026);
 const key=dkRoster(s);const L=key&&s.ro[key];if(!Array.isArray(L)||L.length<23)return 0;   // roster not built yet: try again later
 for(const k in s.ro){const R=s.ro[k];if(Array.isArray(R)&&R.some(x=>x&&x.n===DKX.n)){s.dk1=1;return 0}}
 if(age>=36){s.dk1=1;return 0}
 const h=DKX.h.filter(r=>r[0]<yr);const x={n:DKX.n,pos:'TE',ovr:DKX.ovr,age,num:DKX.num,pot:DKX.ovr,qp:1,qn:1,ny:h.length,h:h.map(r=>[...r]),cs:{},tm:[],aw:{},pid:'p'+(s.pidN=(s.pidN||0)+1),dkx:1};
 x.h.forEach(r=>{try{csAdd(x,'w',r.slice(2));tmAdd(x,r[1])}catch(e){}});if(!x.tm.length)x.tm=['BUF'];
 const old=L[5];let gone=false;try{gone=!!old&&typeof isGen=='function'&&isGen(old.n)}catch(e){}   /* Tyler: an auto-generated man is replaced (he vanishes); a real player moves to the bench */
 if(old&&!gone){const bench=L.slice(25).findIndex(y=>!y);if(bench>=0)L[25+bench]=old;else L.push(old)}
 L[5]=x;L.forEach(y=>{if(y&&y!==x&&+y.num===88)y.num=y.num===88?(y.pos==='TE'?87:y.num+1):y.num});
 if(s.stage==='pro'&&(s.wk||0)>0){const o2=S;S=s;try{x.dkJ={k:grK(),w:s.wk,o:old&&old.n};if(gone)x.dkJ.obj=JSON.parse(JSON.stringify(old))}catch(e){}finally{S=o2}}
 s.dk1=1;return 1}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)dkAdd(r)}catch(e){}return r}}catch(e){}})();
(()=>{try{const _h=hub;hub=function(){try{if(S&&dkAdd(S))save()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// weeks before he arrived: he was not there (his lines go to the man who played those weeks)
(()=>{try{const _o=gmOut;window.gmOut=function(x,key){try{if(x&&x.dkJ&&key){const [k,w]=String(key).split('|');if(k===x.dkJ.k&&+w<x.dkJ.w)return true}}catch(e){}return _o.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _s=gmSub;window.gmSub=function(L,k,key){try{const x=L[k];if(x&&x.dkJ&&x.dkJ.o){const j=L.findIndex(y=>y&&y.n===x.dkJ.o);if(j>=0)return j}}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();   // those weeks go to the TE who really played them
// a week before he arrived is built with the lineup as it was (the old starter in his spot), so those box scores never change
(()=>{try{const _b=bxSide;bxSide=function(ti){let L=null,i=-1,j=-1;try{if(typeof BXW!=='undefined'&&BXW!=null){L=rost('h.'+ti);i=Array.isArray(L)?L.findIndex(y=>y&&y.dkJ):-1;if(i>=0){const x=L[i];const k_=grK();if(x.dkJ.k===k_&&BXW<x.dkJ.w&&x.dkJ.o){j=L.findIndex(y=>y&&y.n===x.dkJ.o);if(j>=0){const t=L[i];L[i]=L[j];L._dkT=t;if(j===L.length-1){L.pop();L._dkP=1}else L[j]=null}else if(x.dkJ.obj){L._dkT=L[i];L[i]=x.dkJ.obj;L._dkG=1;j=-2}else i=-1}else i=-1}}}catch(e){i=-1}
 try{return _b.apply(this,arguments)}finally{if(i>=0&&L&&L._dkG){L[i]=L._dkT;delete L._dkT;delete L._dkG}else if(i>=0&&j>=0){if(L._dkP){L.push(L[i]);delete L._dkP}else L[j]=L[i];L[i]=L._dkT;delete L._dkT}}};window.bxSide=bxSide}catch(e){}})();
