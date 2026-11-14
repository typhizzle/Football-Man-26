// ===== 🧬 EVERY PLAYER'S LIFE MATTERS — college to the pros =====
// Tyler, 2026-11-14: "however you're following careers in pro, just make sure it goes the same from high
// school to college throughout ... teams they've played for. All of that."
// Before: every draft class was invented names (draftStart: 259 random prospects; lgClass: 320 random
// prospects every pro offseason). The college players you played against simply stopped existing.
// Now:
//  - YOUR draft: the prospects are the real college players leaving school that year (seniors, plus juniors
//    good enough to declare), ranked by their rating into the draft board's slots (the slot keeps its pro
//    rookie rating, so the draft's balance is unchanged). The ones taken join the team that DRAFTED them.
//  - EVERY later pro draft: college players you played with/against while you were in college come out in
//    the year their class would leave. Their pro card shows their college seasons; seasons that were not
//    played in this save (you had already left) are said to be not recorded, never invented.
//  - a former college teammate placed on a pro roster no longer takes the replaced man's id.

window.pcEnt=function(id){const R_=S&&S.pc;return R_&&R_.p&&R_.p[id]||null};
// remember each college player's rating at every close (the draft needs it)
(()=>{try{const _c=pcClose;window.pcClose=function(lv){const r=_c.apply(this,arguments);try{if(lv=='col'&&S&&S.T)S.T.forEach((t,i)=>{const L=S.ro&&S.ro['h.'+i];if(Array.isArray(L))L.forEach(x=>{const e=x&&x.pid&&pcEnt(x.pid);if(e)e.v=x.ovr})})}catch(e){}return r}}catch(e){}})();

// ---- your draft (college -> pro) ----
window.pcLeagueNames=function(){const n=new Set();try{
 if(S.stage=='col'){(S.pro||[]).forEach((t,i)=>{try{rost('p.'+i)}catch(e){}});for(const k in S.ro)if(k[0]=='p'){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>x&&x.n&&n.add(x.n))}}
 else if(S.stage=='pro'){S.T.forEach((t,i)=>{const L=S.ro['h.'+i];if(Array.isArray(L))L.forEach(x=>x&&x.n&&n.add(x.n))})}
 ((S.ro&&S.ro.fa)||[]).forEach(x=>x&&x.n&&n.add(x.n));(S.retd||[]).forEach(x=>x&&x.n&&n.add(x.n))}catch(e){}return n};
// a college man whose name a pro already has is not put on a draft board: the league's duplicate-name
// clean-up would remove one of them (EVERY PLAYER'S LIFE MATTERS). His college record stays.
window.pcDraftPool=function(){const out=[],taken=pcLeagueNames();try{S.T.forEach((t,i)=>{if(!i)return;const L=S.ro&&S.ro['h.'+i];if(!Array.isArray(L))return;
 L.forEach((x,k)=>{if(!x||!x.n||x.npx!=null||(k==0&&x.qs)||taken.has(x.n))return;const c=x.cls||0;if(c>=4||(c==3&&x.ovr>=80)){const id=pcId(x);out.push({x,id,sch:t.n})}})})}catch(e){}
 return out.sort((a,b)=>(b.x.ovr||0)-(a.x.ovr||0))};
(()=>{try{const _d=draftStart;draftStart=function(){const wasCol=S&&S.stage=='col';let pool=[],yr=0;try{if(wasCol){yr=yrN();pool=pcDraftPool()}}catch(e){}
 const r=_d.apply(this,arguments);
 try{if(wasCol&&S.dr&&Array.isArray(S.dr.P)&&pool.length&&!S.dr.real){const P=S.dr.P;const slots=P.map((p,i)=>({p,i})).filter(z=>!z.p.me&&!z.p.riv&&!z.p.pid).sort((a,b)=>(b.p.ovr||0)-(a.p.ovr||0));
  const used=new Set(P.map(p=>p.n));let n=0;
  pool.forEach(q=>{if(n>=slots.length||used.has(q.x.n))return;const z=slots[n++];Object.assign(z.p,{n:q.x.n,pos:POSD.includes(q.x.pos)?q.x.pos:z.p.pos,sch:q.sch,pid:q.id,cv:q.x.ovr});used.add(q.x.n);
   const e=pcEnt(q.id);if(e&&!e.o.some(o=>o[1]==='entered the draft'))e.o.push([yr,'entered the draft',q.sch,null])});
  S.dr.real=n;save()}}catch(e){}
 return r}}catch(e){}})();
// once the draft is over, every real prospect who was taken joins the team that drafted him
window.pcDrIns=function(){try{const D=S.dr;if(!D||!D.real||D.insDone||!Array.isArray(D.picks))return null;const out=[];
 if(!D.ndRec&&D.pk>=224){const yr=yrN();D.P.forEach(q=>{if(q&&q.pid&&!q.tk&&!q.me){const e=pcEnt(q.pid);if(e&&!e.o.some(o=>o[1]==='not drafted'))e.o.push([yr,'not drafted','',null])}});D.ndRec=1}
 D.picks.forEach(k=>{const q=D.P[k.pi];if(!q||!q.pid||q.me)return;const T=(S.pro||[])[k.ti];if(!T)return;out.push({pid:q.pid,n:q.n,pos:q.pos,ovr:q.ovr,pot:q.pot,pt:T.n,pk:k.pk})});
 return out}catch(e){return null}};
(()=>{try{const _p=proAlumIn;proAlumIn=function(a,t,L){const before=L?L.map(x=>x&&x.n):[];const r=_p.apply(this,arguments);
 try{if(!L||!t||S.stage!='pro')return r;
  // a calum teammate dropped into a slot keeps the slot's old id by accident (L[k]={...L[k],n:...}): give him his own
  L.forEach((x,j)=>{if(x&&x.al===2&&before[j]&&before[j]!==x.n&&x.pid){const c=(S.calum||[]).find(q=>q.n===x.n);x.pid=(c&&c.pid)||null;if(!x.pid)x.pid='p'+(S.pidN=(S.pidN||0)+1)}});
  const I=pcDrIns();if(I&&I.length){const yr=yrN();
   const D=S.dr;D.ins=D.ins||{};
   I.filter(q=>q.pt===t.n).forEach(q=>{if(D.ins[q.pid])return;if(L.some(x=>x&&x.pid===q.pid)){D.ins[q.pid]=1;return}let k=-1,lo=1e9;
    L.forEach((x,j)=>{if(j>0&&j<23&&x&&x.pos==q.pos&&!x.al&&!x.pid2&&x.ovr<lo&&!(PKS.some(z=>z[2]==x.n))){lo=x.ovr;k=j}});
    const nx={n:q.n,pos:q.pos,num:(NR[q.pos]||[1,99])[0],ovr:q.ovr,pot:q.pot,age:22,cls:0,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{},pid:q.pid,dr:{y:yr,r:Math.floor(q.pk/32)+1,p:q.pk+1,tm:tAb(t),col:(pcEnt(q.pid)||{}).r?((pcEnt(q.pid).r.slice(-1)[0]||[])[2]):''}};
    D.ins[q.pid]=1;   // placed once; after that he lives in the league like everyone else (never re-added in a loop)
    // a rookie joins the depth chart (the bench, slots 25+); the league's own depth logic promotes him when he is better
    {let z=25;while(L[z])z++;L[z]=nx}
    const e=pcEnt(q.pid);if(e&&!e.o.some(o=>o[1]==='drafted'))e.o.push([yr,'drafted',tAb(t),'round '+(Math.floor(q.pk/32)+1)+', pick '+(q.pk+1)])})}
 }catch(e){}return r}}catch(e){}})();

// ---- every later pro draft ----
// the year a college player's class leaves: recorded exit + 1, else his last recorded class projected forward
window.pcDraftYear=function(e){try{if(!e||!e.r.length)return null;if(e.o.some(o=>o[1]==='drafted'||o[1]==='not drafted'))return null;
 const ex=e.o.find(o=>/left college|graduated|entered the draft/.test(o[1])&&e.r.some(q=>q[1]==='col'));if(ex)return ex[0]+1;
 const c=e.r.filter(q=>q[1]==='col').sort((a,b)=>a[0]-b[0]).slice(-1)[0];if(!c)return null;return c[0]+(4-(c[3]||4))+1}catch(e){return null}};
window.LGPID={};
(()=>{try{const _lc=lgClass;lgClass=function(Y){const out=_lc.apply(this,arguments);
 try{const R_=S&&S.pc;if(!R_||!R_.p)return out;const inLg=new Set();for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>{if(x&&x.pid)inLg.add(x.pid)})}
  const real=Object.keys(R_.p).map(id=>({id,e:R_.p[id]})).filter(z=>!inLg.has(z.id)&&pcDraftYear(z.e)===Y&&z.e.r.some(q=>q[1]==='col')).sort((a,b)=>(b.e.v||0)-(a.e.v||0));
  const used=new Set(out.map(p=>p.n)),lg=pcLeagueNames();let n=0;LGPID={};
  real.forEach(z=>{if(n>=out.length||used.has(z.e.n)||lg.has(z.e.n))return;const p=out[n++];const col=(z.e.r.filter(q=>q[1]==='col').slice(-1)[0]||[])[2]||p.col;
   p.n=z.e.n;if(z.e.pos&&typeof LGDP!='undefined'&&LGDP.some(d=>d[0]===z.e.pos))p.pos=z.e.pos;p.col=col;p.pid=z.id;LGPID[p.n]=z.id;used.add(p.n)});
  // those still left unpicked after the draft are recorded by lgAdd's absence (see below)
  out.realN=n}catch(e){}
 return out}}catch(e){}})();
(()=>{try{const _a=lgAdd;lgAdd=function(T,x){try{if(x&&!x.pid&&x.dr&&LGPID[x.n]){x.pid=LGPID[x.n];const e=pcEnt(x.pid);
  if(e&&!e.o.some(o=>o[1]==='drafted'))e.o.push([x.dr.y,x.dr.r?'drafted':'signed as an undrafted free agent',T.code,x.dr.r?'round '+x.dr.r+', pick '+x.dr.p:'']);delete LGPID[x.n]}}catch(e){}
 return _a.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _d=lgDraft;lgDraft=function(){const r=_d.apply(this,arguments);try{const Y=yrN();for(const n in LGPID){const e=pcEnt(LGPID[n]);if(e&&!e.o.some(o=>o[0]===Y&&o[1]==='not drafted'))e.o.push([Y,'not drafted','',null])}LGPID={}}catch(e){}return r}}catch(e){}})();

// ---- the card: a drafted man's college years, and which years were not played in this save ----
(()=>{try{const _h=pcRowsHtml;window.pcRowsHtml=function(x){let h=_h.apply(this,arguments);try{const e=x&&x.pid&&S.pc&&S.pc.p&&S.pc.p[x.pid];if(!h||!e)return h;
 const c=e.r.filter(q=>q[1]==='col').sort((a,b)=>a[0]-b[0]);const dr=e.o.find(o=>o[1]==='drafted');
 if(c.length&&dr){const last=c[c.length-1][0];if(dr[0]-1>last)h=h.replace('<br><small style="opacity:.6">Seasons before records began are not shown.</small>',`<br><small style="opacity:.6">College seasons ${last+1}${dr[0]-1>last+1?'–'+(dr[0]-1):''} were not played in this save (you had moved on), so they are not recorded.</small>`)}
}catch(e){}return h}}catch(e){}})();

// ---- the "nobody disappears" register (m117) filed every college player as RETIRED (age 34) the moment you
// went pro, and every high-school player when you went to college: they had only left the level being played.
// A man with a high-school or college record who is not on a roster now is "away" (his level isn't being
// played), not retired. Entries this wrongly made from now on are not made; nothing already saved is touched.
window.PCNM={k:null,s:null};
window.pcAway=function(s,n){try{if(!s||!s.pc||!s.pc.p)return false;const k=Object.keys(s.pc.p).length;
 if(PCNM.k!==k||PCNM.s!==s){const m=new Set();for(const id in s.pc.p){const e=s.pc.p[id];if(e&&e.r&&e.r.length)m.add(e.n)}PCNM={k,s,m}}
 if(!PCNM.m.has(n))return false;const r=s.allp&&s.allp[n];if(r)r.at='away';return true}catch(e){return false}};
