// ===== 🏟 COLLEGE: yearly rivalry games, NYPD joins the Penitentiary's conference, Wide Receiver U =====
// Tyler, 2026-11-15: "Make sure that the conferences are playing each other as much as they should" (checked: 12 games, ~8 in
// conference, 13 weeks = one bye) + "New York Police Department University should probably be in the same conference as the
// penitentiary. So, after this season with me and Frank Castle, I would switch them with one of the teams in my conference.
// And I would make it to where they play every year. Another rivalry game where they play every year is Ohio State versus
// Michigan ... Alabama versus LSU or Alabama versus Auburn or Alabama versus Georgia ... Double check me on that ... Texas usually
// plays A&M and Oklahoma" + "For wide receiver U ... a very mid overall team, but it has really good receivers".
// Checked: rivalries were only guaranteed for YOUR team. The SEC's 2026 nine-game format gives every team 3 yearly opponents:
// Alabama: Auburn, Tennessee, Mississippi State (LSU and Georgia rotate). Texas: Oklahoma, Texas A&M, Arkansas. Georgia:
// Florida, Auburn, South Carolina. Those + The Game + the Cops & Robbers Bowl are now played every season by everyone.
window.RVYEAR=[['NYPD','NYCP'],['OSU','MICH'],['BAMA','AUB'],['BAMA','TENN'],['BAMA','MSST'],['TEX','OU'],['TEX','TAMU'],['TEX','ARK'],['UGA','FLA'],['UGA','AUB'],['UGA','SC']];
window.rvForce=function(W){try{const T=S.T,ix={};T.forEach((t,i)=>{if(t.ab)ix[t.ab]=i});const has=(a,b)=>W.some(wk=>wk.some(([x,y])=>(x==a&&y==b)||(x==b&&y==a)));const gc=T.map(()=>0);W.forEach(wk=>wk.forEach(([a,b])=>{gc[a]++;gc[b]++}));const LK=new Set(),lk=(p)=>p&&LK.has(Math.min(p[0],p[1])+','+Math.max(p[0],p[1])),lock=(a,b)=>LK.add(Math.min(a,b)+','+Math.max(a,b));
 RVYEAR.forEach(([A,B])=>{const a=ix[A],b=ix[B];if(a==null||b==null)return;if(has(a,b)){lock(a,b);return}
  // 1) a week both are free (and both under 12 games)
  for(const wk of W){const busy=new Set(wk.flat());if(!busy.has(a)&&!busy.has(b)&&gc[a]<12&&gc[b]<12){wk.push([a,b]);gc[a]++;gc[b]++;lock(a,b);return}}
  // 2) a week where a plays x and b plays y: make it a-b and x-y (if x and y haven't met)
  for(const wk of W){const ia=wk.findIndex(p=>p.includes(a)),ib=wk.findIndex(p=>p.includes(b));if(ia<0||ib<0||ia===ib||lk(wk[ia])||lk(wk[ib]))continue;const x=wk[ia][0]==a?wk[ia][1]:wk[ia][0],y=wk[ib][0]==b?wk[ib][1]:wk[ib][0];if(x===y||has(x,y))continue;wk[ia]=[a,b];wk[ib]=[x,y];lock(a,b);return}
  // 4) both busy against teams that already met: they play each other, those two opponents get that week off
  for(const wk of W){const ia=wk.findIndex(p=>p.includes(a)),ib=wk.findIndex(p=>p.includes(b));if(ia<0||ib<0||ia===ib||lk(wk[ia])||lk(wk[ib]))continue;const x=wk[ia][0]==a?wk[ia][1]:wk[ia][0],y=wk[ib][0]==b?wk[ib][1]:wk[ib][0];wk[ia]=[a,b];wk.splice(ib,1);gc[x]--;gc[y]--;lock(a,b);return}
  // 3) a week where only a is busy (vs x) and b is free: a-b, x gets the bye
  for(const wk of W){const ia=wk.findIndex(p=>p.includes(a));const busy=new Set(wk.flat());if(ia>=0&&!lk(wk[ia])&&!busy.has(b)&&gc[b]<12){const x=wk[ia][0]==a?wk[ia][1]:wk[ia][0];wk[ia]=[a,b];gc[x]--;gc[b]++;lock(a,b);return}}
 })}catch(e){}return W};
(()=>{try{const _c=colSched;colSched=function(){return rvForce(_c.apply(this,arguments))}}catch(e){}})();
// NYPD University moves into the Penitentiary's conference (swapping places with that conference's lowest-rated school that isn't
// yours), after the current college season; new saves start that way
window.nypdMove=function(){try{if(!S||S.nypdCf||!Array.isArray(S.col))return 0;let A=null,B=null;S.col.forEach((c,ci)=>(c.t||[]).forEach((t,j)=>{if(t.ab==='NYPD')A={ci,j,t};if(t.ab==='NYCP')B={ci,j,t}}));
 if(!A||!B){S.nypdCf=1;return 0}if(A.ci===B.ci){S.nypdCf=1;return 0}const mine=S.stage==='col'&&S.T&&S.T[0];
 const cand=S.col[B.ci].t.map((t,j)=>({t,j})).filter(z=>z.t.ab!=='NYCP'&&z.t!==mine&&!(mine&&z.t.n===mine.n)).sort((x,y)=>(x.t.ovr||0)-(y.t.ovr||0))[0];if(!cand)return 0;
 const kA='c.'+A.ci+'.'+A.j,kB='c.'+B.ci+'.'+cand.j;if(S.ro){const ra=S.ro[kA],rb=S.ro[kB];if(ra||rb){S.ro[kA]=rb;S.ro[kB]=ra;if(!rb)delete S.ro[kA];if(!ra)delete S.ro[kB]}}   /* rosters stay with their own school */
 S.col[A.ci].t[A.j]=cand.t;S.col[B.ci].t[cand.j]=A.t;if(A.t.cf!=null)A.t.cf=B.ci;if(cand.t.cf!=null)cand.t.cf=A.ci;S.nypdCf=1;S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🚔 NYPD University moves into the Penitentiary\'s conference ('+cand.t.n+' takes its old spot). The Cops & Robbers Bowl is now played every year.';return 1}catch(e){return 0}};
(()=>{try{const _n=colNext;colNext=function(){const r=_n.apply(this,arguments);try{nypdMove()}catch(e){}return r}}catch(e){}})();
(()=>{try{const _s=start;start=function(){const r=_s.apply(this,arguments);try{if(S&&S.stage!=='col'&&nypdMove())save()}catch(e){}return r}}catch(e){}})();
// Wide Receiver U: a middle-of-the-pack team with some of the best receivers in the country (once per save)
window.wruFix=function(){try{if(!S||S.wru||!Array.isArray(S.col))return;let W=null,key=null;S.col.forEach((c,ci)=>(c.t||[]).forEach((t,j)=>{if(t.ab==='WRU'){W=t;key='c.'+ci+'.'+j}}));if(!W)return;
 if(S.stage==='col'&&Array.isArray(S.T)){const ix=S.T.indexOf(W);if(ix>=0)key='h.'+ix}W.ovr=Math.min(W.ovr||66,68);W.wru=1;const L=S.ro&&S.ro[key];
 if(Array.isArray(L)&&L.length){L.forEach((x,k)=>{if(x&&x.pos==='WR')x.ovr=Math.max(x.ovr||60,[0,0,90,86,83][k]||82)});S.wru=1}}catch(e){}};
(()=>{try{const _r=rost;rost=function(a){const L=_r.apply(this,arguments);try{if(S&&!S.wru)wruFix()}catch(e){}return L}}catch(e){}})();
