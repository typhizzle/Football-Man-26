
// ===================== college rankings next to team names everywhere (#24 Alabama vs Florida) =====================
function crNo(t){try{if((S.stage||'hs')!='col'||!S.T)return 0;const i=typeof t=='number'?t:S.T.indexOf(t);if(i<0)return 0;const p=crCalc().pos[i];return p&&p<=25?p:0}catch(e){return 0}}
const tnr=t=>{const k=crNo(t);return (k?'#'+k+' ':'')+tn(t)},nmr=t=>{const k=crNo(t);return (k?'#'+k+' ':'')+t.n};
// matchup line for the scoreboard banner
function crMatch(o){const a=crNo(0),b=crNo(o);if(!a&&!b)return '';return nmr(S.T[0])+' vs '+nmr(S.T[o])}

// ===================== HEISMAN WATCH: top 10 with stats, class and school =====================
const HCLS=p=>{const r=Math.abs(hsh(String(p.n)+'cls'))%100,o=p.ovr||70,b=o>=85?20:o>=78?10:0;return r<14-b/2?1:r<38-b?2:r<70-b/2?3:4};
function hwClass(ti,p,slot){if(ti==0&&p.me)return rsLbl()||CLS[Math.min(4,S.cy||1)-1];if(p.npx!=null&&S.npx){const q=S.npx.find(z=>z.id===p.npx);if(q){const w=npxAt(q);if(w.lv=='col')return npxCls(q,Math.min(4,w.y))}}
 if(slot==0){try{const q=qroom(S.T[ti]).find(z=>z.n==p.n);if(q&&q.cls)return CLS[Math.min(4,q.cls)-1]}catch(e){}}return CLS[HCLS(p)-1]}
// box-score style lines for one CPU player in one game (same numbers every time you look)
function hwGame(ti,x,slot,ovr,wr){const r=rng((S.seed||1)*7919+ti*131+x.wk*17+slot),pts=x.s[0],td=Math.max(0,Math.round(pts/8.2-.35+r()*.6)),n=()=>r()+r()-1;
 const pyd=cl(Math.round(118+pts*3.7+(ovr.q-72)*3+n()*55),40,520),ptd=Math.round(td*(.6+(ovr.q-ovr.r)*.006)+n()*.5),pt=cl(ptd,0,td),it=r()<cl(.68-(ovr.q-70)*.011,.25,.85)?(r()<.25?2:1):0;
 const ry=cl(Math.round(38+pts*1.35+(ovr.r-76)*2.2+n()*36),-5,300),rt=cl(td-pt,0,9),rbT=cl(Math.round(rt*.68+n()*.35),0,rt),qrT=rt-rbT>0&&r()<.4?1:0;
 if(slot==0){const mb=ovr.mob?1:0;return{att:cl(Math.round(pyd/7.6+n()*4),8,60),yds:pyd,td:pt,int:it,ry:Math.round(12+mb*36+(ovr.q-70)*.6+n()*(22+mb*14)),rtd:qrT+(mb&&r()<.3?1:0)}}
 if(slot==1)return{car:cl(Math.round(ry/5.1+n()*3),4,40),ry,rtd:rbT,rec:Math.round(1+r()*3),recy:Math.round(8+r()*30)};
 const sh=cl(.24+(wr-76)*.005+n()*.06,.12,.48);return{rec:cl(Math.round(pyd*sh/14.5+n()*1.5),0,16),recy:Math.round(pyd*sh),rtd:0,rcT:cl(Math.round(pt*(sh+.08)+n()*.4),0,pt)}}
function hwSeason(ti,slot,p,ovr){const C=crCalc(),gl=C.gl[ti]||[],t={g:gl.length,yds:0,td:0,int:0,att:0,ry:0,rtd:0,car:0,rec:0,recy:0,rcT:0};t.bad=0;t.mid=0;gl.forEach(x=>{const s=hwGame(ti,x,slot,ovr,p.ovr||75);if(slot==0){const im=s.yds/22+s.td*4-s.int*3+(s.ry||0)/12+(s.rtd||0)*5;if(im<12)t.bad++;else if(im<18)t.mid++};for(const k in s)t[k]=(t[k]||0)+s[k]});return t}
const HWP=(s,pos)=>pos=='QB'?s.yds/22+s.td*4-s.int*3+(s.ry||0)/12+(s.rtd||0)*5:pos=='RB'?s.ry/8.5+s.rtd*5.5+(s.recy||0)/12:s.recy/6.8+s.rcT*6;
function hwLine(s,pos){const f=n=>Math.round(n).toLocaleString();if(pos=='QB')return `${f(s.yds)} pass yds, ${s.td} TD, ${s.int} INT${(s.ry||0)>=150||(s.rtd||0)>=3?` · ${f(s.ry)} rush, ${s.rtd} TD`:''}`;if(pos=='RB')return `${f(s.ry)} rush yds, ${s.rtd} TD${s.car?' ('+(s.ry/Math.max(1,s.car)).toFixed(1)+' avg)':''}`;return `${s.rec} rec, ${f(s.recy)} yds, ${s.rcT} TD`}
function hwRace(){if(!S.T)return[];const T=S.T,C=crCalc(),ord=C.ord,set=new Set(ord.slice(0,40));set.add(0);(S.npx||[]).forEach(p=>{if(!p.pro){const i=T.findIndex(t=>t.n==p.cn);if(i>=0)set.add(i)}});
 const out=[];set.forEach(ti=>{const t=T[ti],gl=C.gl[ti]||[],L=rost('h.'+ti),pk=C.pos[ti]||99,P4=S.col[t.cf]&&cfP4(S.col[t.cf].n),un=(t.l||0)==0&&(t.w||0)>=10,
  tm=(t.w||0)*9-(t.l||0)*(P4?6:13)+(pk<=4?30:pk<=12?18:pk<=25?8:0)-(P4?0:un?14:32);if(!gl.length&&ti!=0)return;
  const qb=L[0]||{},rb=L[1]||{},wr=[2,3,4].map(k=>L[k]).filter(Boolean).sort((a,b)=>(b.ovr||0)-(a.ovr||0))[0],ovr={q:qb.ovr||70,r:rb.ovr||70,mob:qb.npx!=null&&S.npx&&(S.npx.find(z=>z.id===qb.npx)||{}).n&&(NPXR[(S.npx.find(z=>z.id===qb.npx)||{}).n]||{}).mob};
  if(ti==0){if(isStarter()&&S.ss&&S.ss.g){const s={...S.ss},gs_=(S.gs||[]).slice(-(s.g||0)),bd=gs_.filter(x=>x<60).length,md=gs_.filter(x=>x>=60&&x<72).length,full=(s.g||0)>=gl.length;out.push({n:S.name,me:1,pos:'QB',ti,s,line:hwLine(s,'QB'),cls:hwClass(0,{me:1},0),v:hwQ(s,s.g||1,bd,md,P4,full?S.ssub||0:0)+tm})}}
  else{const s=hwSeason(ti,0,qb,ovr);out.push({n:qb.n,pos:'QB',ti,s,line:hwLine(s,'QB'),cls:hwClass(ti,qb,0),v:hwQ(s,s.g,s.bad,s.mid,P4,0)+tm,npx:qb.npx})}
  [[rb,1,'RB'],[wr,2,'WR']].forEach(([p,sl,pos])=>{if(!p||!p.n)return;const s=hwSeason(ti,sl,p,ovr);out.push({n:p.n,pos,ti,s,line:hwLine(s,pos),cls:hwClass(ti,p,sl),v:HWP(s,pos)*(P4?1:.86)+tm*.85,npx:p.npx})})});
 return out.sort((a,b)=>b.v-a.v)}
// QB Heisman case: production on a season pace (total yards / total TDs), bad and so-so games hurt, outside the Power 4 you need to be clearly better
function hwQ(s,G,bad,mid,P4,sub){const g=Math.max(1,G),f=1+.3*Math.min(1,(sub||0)/g),ty=((s.yds||0)+(s.ry||0))*f,tt=((s.td||0)+(s.rtd||0))*f,pY=ty/g*13,pT=tt/g*13;
 let v=ty/22+tt*4.2-(s.int||0)*3;if(g>=3){if(pY<4150||pT<50)v-=10+Math.max(0,(4150-pY)/80)+Math.max(0,(50-pT)*1.2);else if(pY>=4400&&pT>=55)v+=12}
 v-=(bad||0)*12*(P4?1:1.6)+(mid||0)*4*(P4?1:1.6);if(!P4)v*=.86;return v}
// the award itself uses the same race
function heisman(){const L=hwRace();if(!L.length)return[{n:'-'},{n:'-'},{n:'-'}];const me=L.find(x=>x.me);if(me&&(S.ss.g||0)<=2)L.splice(L.indexOf(me),1);return L.slice(0,3)}
function hwSnap(){try{if((S.stage||'hs')!='col')return;const k=grK();if(!S.hwh||S.hwh.k!=k)S.hwh={k,w:{}};S.hwh.w[S.wk]=hwRace().slice(0,10).map(x=>x.n)}catch(e){}}
function hwV(){const T=S.T,L=hwRace().slice(0,10),H=S.hwh&&S.hwh.k==grK()?S.hwh.w:null,ks=H?Object.keys(H).map(Number).filter(w=>w<(S.wk||0)).sort((a,b)=>b-a):[],prev=ks.length?H[ks[0]]:null,top=L[0]?L[0].v:1,dn=!!S.csum;
 const rows=L.map((x,k)=>{const pv=prev?prev.indexOf(x.n):-2,mv=pv==-2?'':pv<0?'<small style="color:#7bed9f">NEW</small>':pv>k?`<small style="color:#7bed9f">▲${pv-k}</small>`:pv<k?`<small style="color:#ff7675">▼${k-pv}</small>`:'<small style="opacity:.6">–</small>',t=T[x.ti];
  return `<div class=row style="font-size:15px;gap:6px;align-items:flex-start${x.me?';background:#ffe93b22':''}"><span style="min-width:0"><b>${k+1}.</b> ${x.me?'▶ ':''}<b>${x.n}</b> ${mv}<br><small>${x.pos} · ${x.cls} · <span style="cursor:pointer;text-decoration:underline" onclick="crTeam(${x.ti})">${tnr(t)}</span> (${t.w}-${t.l})</small><br><small style="opacity:.85">${x.line}</small></span><small style="flex:none">${k==0?'Leader':Math.max(1,Math.round(x.v/top*100))+'%'}</small></div>`}).join('')||'<small>No games played yet.</small>';
 ui.innerHTML=`<div><h2>🏆 Heisman ${dn?'finalists':'watch'}</h2><p><small>${yrN()} · ${dn?'final standings':'after week '+(S.wk||0)} · stats, team record and ranking all count. The % is how close each player is to the leader.</small></p><div class=card>${rows}</div><button class=g onclick=crV()>🏆 Top 25</button><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
