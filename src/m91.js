// ===================== 🧊 history is permanent: once a season is over, its results are saved and never recomputed =====================
// (past seasons used to be re-simulated from today's team ratings, so MVPs and champions could change after an update)
function uFzOn(Y){try{return S&&S.seed&&Y>2025&&Y<yrN()}catch(e){return false}}
(()=>{const fz=(nm,pre)=>{const f=window[nm];if(typeof f!='function')return;window[nm]=function(Y){if(!uFzOn(Y))return f.apply(this,arguments);S.uFz=S.uFz||{};const k=pre+Y;if(S.uFz[k])return S.uFz[k];const r=f.apply(this,arguments);try{S.uFz[k]=JSON.parse(JSON.stringify(r))}catch(e){}return r}};
 fz('uChamp','c');fz('uSkill','s');
 const _p=uPro;uPro=function(Y){if(!uFzOn(Y))return _p.apply(this,arguments);S.uFz=S.uFz||{};const k='p'+Y;if(S.uFz[k]){UPC[Y]=S.uFz[k];return UPC[Y]}const r=_p.apply(this,arguments);try{S.uFz[k]=JSON.parse(JSON.stringify(r))}catch(e){}return r}})();
// league history: the seasons between 2025 and your first pro season are part of the list too (it used to stop short)
(()=>{const _l=lhLeague;lhLeague=function(){const out=_l.apply(this,arguments);try{const have=new Set(out.map(x=>x.yr)),last=yrN()-1;for(let Y=2026;Y<=last;Y++){if(have.has(Y))continue;const c=uChamp(Y);if(!c)continue;const tm=i=>{const t=(S.pro||[])[i];return t?tn(t):TA[i]};const mv=c.mvp!=null&&QBX[c.mvp]?QBX[c.mvp][0]:'';const ov=(S.lhOv||{})[Y]||{};
  out.push({yr:Y,mine:0,sim:1,fin:{w:ov.w||tm(c.ub),l:ov.l||tm(c.ru),wc:TA[c.ub],lc:TA[c.ru],sc:''},sbm:ov.sbm||'',mvp:ov.mvp||mv,opoy:ov.opoy||'',dpoy:ov.dpoy||''})}}catch(e){}return out.sort((a,b)=>a.yr-b.yr)}})();
// one source of truth: a season you actually played uses its real results (the awards and the Ultra Bowl you played through) on every screen
(()=>{const _c=uChamp;uChamp=function(Y){try{const A=Object.values(S.law||{}).find(a=>a&&a.yr==Y);if(A&&A.fin){const ix=c=>TA.indexOf(c),W=A.w||{},mv=W.MVP&&W.MVP.n,qi=mv?QBX.findIndex(q=>q[0]==mv):-1,sb=W.SBMVP&&W.SBMVP.n;const ub=ix(A.fin.wc),ru=ix(A.fin.lc);if(ub>=0&&ru>=0)return{ub,ru,mvp:qi>=0?qi:null,mvpN:mv||'',sbm:sb||''}}}catch(e){}return _c.apply(this,arguments)}})();
// your corrections are permanent (S.hOv[year] = {mvp:'Name'})
(()=>{const _c=uChamp;uChamp=function(Y){const r=_c.apply(this,arguments);try{const o=S&&S.hOv&&S.hOv[Y];if(o&&r){const x={...r};if(o.mvp){const qi=QBX.findIndex(q=>q[0]==o.mvp);x.mvp=qi>=0?qi:x.mvp;x.mvpN=o.mvp}if(o.ub&&TA.includes(o.ub)){x.ub=TA.indexOf(o.ub);if(o.ru&&TA.includes(o.ru))x.ru=TA.indexOf(o.ru)}return x}}catch(e){}return r}})();
(()=>{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{if(s&&s.seed==676914057&&!s.hfx1){s.hOv=Object.assign(s.hOv||{},{2026:{mvp:'Jarsh Fallon'},2027:{mvp:'Jarsh Fallon'},2028:{mvp:'Jarsh Fallon'}});s.hfx1=1}}catch(e){}return s}})();
// your own Ultra Bowl titles always show for that year, even in seasons that were never recorded in the awards book
(()=>{const _c=uChamp;uChamp=function(Y){const r=_c.apply(this,arguments);try{if(!r||S.stage!='pro'||!S.py)return r;if(Object.values(S.law||{}).some(a=>a&&a.yr==Y&&a.fin))return r;const N=S.py-(yrN()-Y);if(N<1)return r;
 if((S.aw||[]).includes('Pro yr '+N+': Ultra Bowl Champion')){const ti=pIdx(S.T[0]);if(ti>=0&&r.ub!==ti){const x={...r,ru:r.ub===ti?r.ru:r.ub,ub:ti};if(x.ru===ti)x.ru=r.ru;if((S.aw||[]).includes('Pro yr '+N+': Ultra Bowl MVP'))x.sbm=S.name;return x}}}catch(e){}return r}})();

(()=>{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{if(s&&s.seed==676914057&&!s.hfx2){s.hOv=s.hOv||{};s.hOv[2027]=Object.assign(s.hOv[2027]||{},{ub:'BUF',ru:'KC'});s.hfx2=1}}catch(e){}return s}})();
// legacy leaderboard counts every season: real career awards + league seasons you didn't play (MVPs, rings for the winning QB) + seasons you played
function legExtra(){const Y1=yrN()-1,key=Y1+'|'+Object.keys(S.law||{}).length+'|'+JSON.stringify(S.hOv||{});if(legExtra.k===key&&legExtra.v)return legExtra.v;const out={},inc=(n,f)=>{if(!n)return;(out[n]=out[n]||{r:0,m:0})[f]++};
 for(let Y=2026;Y<=Y1;Y++){if(Object.values(S.law||{}).some(a=>a&&a.yr==Y&&a.fin))continue;try{const c=uChamp(Y);if(!c)continue;inc(c.mvpN||(c.mvp!=null&&QBX[c.mvp]?QBX[c.mvp][0]:''),'m');const T=uPro(Y)[c.ub];const q=T&&T.q&&T.q.find(q=>!q.fill);if(q&&q.n!=S.name)inc(q.n,'r')}catch(e){}}
 legExtra.k=key;legExtra.v=out;return out}
(()=>{const _c=cpuLeg;cpuLeg=function(x){const v=_c.apply(this,arguments);try{const e=legExtra()[x.n]||{r:0,m:0},g=(typeof GOAT!='undefined'&&GOAT.find(z=>z.n==x.n))||{};const r=e.r+(g.r||0),m=e.m+(g.m||0),sb=(g.s||0);if(r||m||sb){v.r+=r;v.m+=m;v.s+=sb;v.p+=r*90+m*75+sb*40;v.top=v.top||v.r>7||v.s>5||v.m>3}}catch(e){}return v}})();
