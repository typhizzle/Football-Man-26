
// ---------------- college conferences: the Power 4 first, every conference labeled by how strong it is ----------------
const P4N=['South Country Conference','Large 10 Conference','Atlantic Country Conference','Large 12 Conference'],P4S={'South Country Conference':'SCC','Large 10 Conference':'Large 10','Atlantic Country Conference':'ACC','Large 12 Conference':'Large 12'};
const cfAvg=c=>c&&c.t&&c.t.length?c.t.reduce((a,t)=>a+(t.ovr||0),0)/c.t.length:0,cfP4=n=>P4N.includes(n),cfShort=n=>P4S[n]||String(n||'').replace(' Conference','');
function cfOrd(){const C=(S&&S.col)||[];return C.map((c,i)=>i).sort((a,b)=>{const pa=P4N.indexOf(C[a].n),pb=P4N.indexOf(C[b].n);if(pa>=0||pb>=0)return(pa<0?9:pa)-(pb<0?9:pb);return cfAvg(C[b])-cfAvg(C[a])})}
function cfRank(c){const C=(S&&S.col)||[];return C.slice().sort((a,b)=>cfAvg(b)-cfAvg(a)).indexOf(c)+1}
const CFT=[[77,'Elite','#ffd23b'],[73,'Strong','#7bed9f'],[67,'Solid','#70a1ff'],[60,'Mid-major','#c8d6e5'],[0,'Developing','#ff9f80']];
const cfTier=c=>CFT.find(x=>cfAvg(c)>=x[0]);
function cfBadge(c,mini){if(!c)return '';const t=cfTier(c);return `<span class=cfb style="border-color:${t[2]};color:${t[2]}">${cfP4(c.n)?'POWER 4 · ':''}${t[1]}${mini?'':' · #'+cfRank(c)+' of '+S.col.length+' · avg '+Math.round(cfAvg(c))}</span>`}
const cfOf=n=>{for(const c of (S.col||[]))if(c.t.some(t=>t.n==n))return c;return null},cfKey=n=>{const C=S.col||[],i=C.findIndex(c=>c.n==n);return i<0?999:cfOrd().indexOf(i)};
const offSort=L=>L.sort((a,b)=>(cfP4(b.conf)-cfP4(a.conf))||(b.ovr-a.ovr));
// ---------------- recruiting: who is coming, who is leaving, who is staying ----------------
// named players decide after each of your college seasons; the dice are fixed per save so what you're told is what happens
const npxRnd=(p,k,s)=>rng((S.seed||1)*977+p.id*131+k*17+s*7919)();
function npxPlan(p,k){if(p.pro)return'pro';if((p.dk||1)>k)return'stay';const cls=Math.min(3,p.off+k-1);if(k>=2||p.gen||cls>=3)return'draft';if(npxRnd(p,k,1)<[.45,.35,.25][cls]*(p.T>=82?.5:1))return npxRnd(p,k,2)<.35?'xfer':'stay';return'draft'}
// everyone else in a QB room: seniors graduate, good juniors declare, buried backups transfer
function qPlanG(x,room){const top=room.reduce((a,b)=>b.ovr>a.ovr?b:a,room[0]);if(x.cls>=4)return'grad';if(x.cls==3&&x.ovr>=80)return'draft';if(top&&x!==top&&x.cls>=2&&x.cls<=3&&x.ovr<=top.ovr-7&&room.filter(y=>y.npx==null&&!y.fc).length>=3)return'xfer';return'stay'}
function qPlan(x,room,k){if(x.npx!=null){const p=S.npx&&S.npx[x.npx];return p?npxPlan(p,k):'stay'}if(x.fc||x.me)return'stay';return qPlanG(x,room)}
const QPL={grad:['Senior: leaves after the season','#ffd23b'],draft:['Declaring for the draft after the season','#ff9f43'],xfer:['Plans to transfer after the season','#ff6b6b'],stay:['Staying','#7bed9f'],pro:['Gone to the pros','#c8d6e5'],in:['Incoming freshman (committed)','#70a1ff']};
const qpChip=k=>`<span class=qpc style="background:${QPL[k][1]}">${QPL[k][0]}</span>`;
// remove the ones who leave after this season (called before the room ages a year)
function qrLeave(room){if(!room)return room;const r0=room.slice();return room.filter(x=>x.npx!=null||x.fc||!['draft','xfer'].includes(qPlanG(x,r0)))}
// the user's recruiting class on GSPN: fictional QBs commit over time; named prospects are already committed
function rbCm(p,i,cls){const rr=rng((S.seed||1)*131+i*17+cls*3),b=p.b,T=(S.col||[]).flatMap(c=>c.t.map(t=>({t,p4:cfP4(c.n)}))),lo=b<=25?84:b<=80?77:b<=200?68:55,hi=b<=25?99:b<=80?88:b<=200?82:76;
 let pool=T.filter(x=>x.t.ovr>=lo&&x.t.ovr<=hi&&(b>200||x.p4));if(!pool.length)pool=T;p.cm=pool[rr()*pool.length|0].t.n;p.ct=+(3.3+rr()*1.4+(b>120?.3:0)).toFixed(2)}
const rbProg=()=>(S.stage||'hs')!='hs'?9:(S.yr||1)+(S.sum?1:Math.min(1,(S.wk||0)/10));
const rbOvr=b=>cl(Math.round(76-Math.log2(Math.max(1,b))*2.4),52,76),npxRk=(T,id)=>cl(Math.round(2*Math.exp((87-T)*.2))+((id||0)%3),1,400);
// fictional QBs from your class committed to school t (all=true: everyone, as of signing day)
function rbCommits(t,all){if(!S||!S.gp)gpS();let B;try{B=gpRB()}catch(e){return[]}const G=S.gp,pr=rbProg();return(G.rbL||[]).filter(p=>p.cm==t.n&&(all||pr>=p.ct)).map(p=>({n:p.n,ovr:rbOvr(p.b),r:p.b}))}
// named players still in high school who are headed to school t
function npxCommits(t){if(!S.npx)return[];const uy=npxUy();return S.npx.filter(p=>!p.pro&&p.cn==t.n&&uy+p.off<=4).map(p=>({p,y:uy+p.off,arr:yrN()+(5-(uy+p.off))}))}
const npxUy=()=>{const st=S.stage||'hs';return st=='hs'?Math.min(S.yr||1,4):4+Math.min(S.cy||1,4)};
// the QB room you would walk into as a freshman
function qroomArr(t){let room=qroomG(t).map(x=>({...x}));(S.npx||[]).forEach(p=>{if(p.pos!='QB'||p.cn!=t.n||p.pro)return;const y=Math.min(4,p.off+1),w={lv:'col',y,toD:(p.dk||1)-1};room=room.filter(x=>x.n!=p.n);room.push({n:p.n,ovr:npxRating(p,w),cls:y,npx:p.id})});
 room=room.sort((a,b)=>b.ovr-a.ovr).slice(0,3);rbCommits(t).forEach(c=>{if(!room.some(x=>x.n==c.n))room.push({n:c.n,ovr:c.ovr,cls:1,fc:1,rk:c.r})});return room.sort((a,b)=>b.ovr-a.ovr)}
// at enrollment: the room plus everyone from your class who signed there
function qroomE(t){const r=qroom(t);rbCommits(t,1).forEach(c=>{if(!r.some(x=>x.n==c.n))r.push({n:c.n,ovr:c.ovr,cls:1,fc:1})});return r.sort((a,b)=>b.ovr-a.ovr)}
function startInfo(t){const hs=(S.stage||'hs')=='hs',q=hs?qroomArr(t):qroom(t),st=q[0]||{n:'Nobody',ovr:40,cls:1},me=hs?projCol():qo(S.q),d=me+2-st.ovr,pct=cl(Math.round(50+d*5),4,96),pl=qPlan(st,q,hs?1:(S.cy||1));let txt;
 if(d>=0)txt='You could win the job right away: your '+(hs?'projected college rating':'rating')+' is '+me+' and the starter rates '+st.ovr+'.';
 else if(pl=='grad'||pl=='draft'||pl=='xfer')txt='Starter '+st.n+' ('+st.ovr+', '+clsN[st.cls]+') '+({grad:'is a senior',draft:'is expected to declare for the draft',xfer:'plans to transfer'})[pl]+', so the job opens after '+(hs?'your freshman year':'this season')+' if you pass the backups.';
 else txt='Starter '+st.n+' ('+st.ovr+', '+clsN[st.cls]+') is ahead of you by '+(-d)+'. Expect to wait about '+Math.max(1,5-st.cls)+' seasons, or beat him with training.';return{st,pct,txt,q}}
// ---- screens ----
const arrY=()=>yrN()+(5-Math.min(4,S.yr||1));
function qRows(q,k,arr){return q.map((x,i)=>{const pl=x.fc?'in':qPlan(x,q,k),tag=x.npx!=null?' ⭐':x.fc?' <small>(GSPN #'+x.rk+')</small>':x.yq!=null?' ⭐':'';return `<div class=row style="font-size:17px;gap:6px;align-items:flex-start"><span style="min-width:0">${i?'':'★ '}${x.n}${tag} <small>${clsN[Math.min(4,x.cls)]||''}</small><br>${qpChip(pl)}</span><b>${x.ovr}</b></div>`}).join('')}
function comH(t){const N=npxCommits(t),F=(S.stage||'hs')=='hs'?rbCommits(t):[];if(!N.length&&!F.length)return '<p><small>No commits yet who aren\'t on the roster.</small></p>';
 return N.map(c=>`<div class=row style="font-size:16px;gap:6px"><span>⭐ ${c.p.n} <small>${c.p.pos} · ${npxHS(c.p)} (${SAB[c.p.st]||c.p.st}) · HS ${CLS[c.y-1]}</small></span><small>joins ${c.arr}</small></div>`).join('')+F.map(c=>`<div class=row style="font-size:16px;gap:6px"><span>${c.n} <small>QB · GSPN #${c.r} in your class</small></span><small>joins ${arrY()}</small></div>`).join('')}
function namedH(t){const L=(S.npx||[]).filter(p=>!p.pro&&p.cn==t.n).map(p=>({p,w:npxAt(p)})).filter(x=>x.w.lv=='col');if(!L.length)return '';const k=(S.stage||'hs')=='hs'?1:(S.cy||1);
 return `<div class=card><b>⭐ Named players on this roster</b>${L.map(x=>`<div class=row style="font-size:16px;gap:6px;align-items:flex-start"><span>${x.p.n} <small>${x.p.pos} · ${clsN[Math.min(4,x.w.y)]}</small><br>${qpChip((S.stage||'hs')=='hs'?'stay':npxPlan(x.p,k))}</span><b>${npxRating(x.p,x.w)}</b></div>`).join('')}</div>`}
function offers(){fixOff();(S.inb||[]).forEach(m=>m.u=0);const T=offSort(S.off.map((o,i)=>({o,i,conf:o.conf,ovr:o.ovr})));let sep=0;
 ui.innerHTML=`<div><h2>Scholarship offers</h2><p><small>${S.off.length} offers · prospect rank #${S.nr||prospectRank()}. Power 4 programs first. Tap one for the QB room you'd join, who's leaving, who committed, and the pay.</small></p><div class=card>${T.map(({o,i},k)=>{const p4=cfP4(o.conf),hd=!p4&&!sep&&k?(sep=1,'<div class=row style="opacity:.75;font-size:13px"><span>OTHER CONFERENCES</span></div>'):'';const t=S.col[o.ci].t[o.ti],nc=npxCommits(t).length+rbCommits(t).length;
  return hd+`<div class=row onclick="offerView(${i})" style="cursor:pointer;font-size:18px;gap:4px"><span>${S.commit==o.n?'✔ ':''}${o.n}${o.top?' 🔥 topped your commit':''}<br><small>${cfShort(o.conf)} ${cfBadge(S.col[o.ci],1)} · team ${o.ovr} · $${o.pay.toLocaleString()}/yr${nc?' · '+nc+' commit'+(nc>1?'s':''):''}</small></span><small>${startInfo(t).pct}% to start</small></div>`}).join('')||'No offers yet. Keep playing well.'}</div><button class=g onclick=colList()>All college programs</button><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
function offerView(i){fixOff();const o=S.off[i],t=S.col[o.ci].t[o.ti],si=startInfo(t),all=S.col.flatMap(c=>c.t).sort((a,b)=>b.ovr-a.ovr),rk=all.findIndex(x=>x.n==o.n)+1,best=Math.max(...S.off.map(x=>x.pay)),cf=S.col[o.ci],hs=(S.stage||'hs')=='hs',
 R_=['Playing time: '+si.txt,'Program: team rating '+o.ovr+', ranked #'+rk+' of '+all.length+' programs','Pay: $'+o.pay.toLocaleString()+' per year NIL package'+(o.pay==best?' (the best of your offers)':'')+' plus a full scholarship','Conference: '+cf.n+' ('+cfTier(cf)[1]+', #'+cfRank(cf)+' of '+S.col.length+', average team rating '+Math.round(cfAvg(cf))+')',o.ovr>=75?'Draft path: pro scouts watch this program every week':'Draft path: you would need big numbers to get noticed'];
 ui.innerHTML=`<div><h2>${o.n}</h2><p>${cfBadge(cf)}</p><div class=card><b>Why commit</b>${R_.map(x=>'<p>• '+x+'</p>').join('')}</div>
 <div class=card><b>QB room when you arrive${hs?' ('+arrY()+')':''}</b><br><small>Plans are for after your first season there.</small>${qRows(si.q,hs?1:(S.cy||1))}</div>
 <div class=card><b>Committed, not on the roster yet</b>${comH(t)}</div>${namedH(t)}
 <button onclick="commit('${q_(o.n)}')">${S.commit==o.n?'✔ Committed':'Commit to '+o.n}</button><button class=g onclick="colRoster(${o.ci},${o.ti},${i})">Full roster</button><button class=g onclick=offers()>Back to offers</button></div>`;ui.scrollTop=0}
function colRoster(ci,ti,bk){const t=S.col[ci].t[ti],L=rost('c.'+ci+'.'+ti),hs=(S.stage||'hs')=='hs',si=startInfo(t),now=hs?yqRoom(t,qroom(t)):qroom(t);
 ui.innerHTML=`<div><h2>${t.n}</h2><p><small>${S.col[ci].n} · team rating ${t.ovr}</small> ${cfBadge(S.col[ci])}</p>
 ${hs?`<div class=card><b>QB room now (${yrN()})</b>${now.map((x,k)=>`<div class=row style="font-size:17px"><span>${k?'':'★ '}${x.n}${x.yq!=null||x.npx!=null?' ⭐':''} <small>${clsN[Math.min(4,x.cls)]}</small></span><b>${x.ovr}</b></div>`).join('')}</div>`:''}
 <div class=card><b>${hs?'QB room when you arrive ('+arrY()+')':'QB room'}</b><br><small>Plans are for after ${hs?'your first season there':'this season'}.</small>${qRows(si.q,hs?1:(S.cy||1))}<small>${si.txt} (about ${si.pct}% chance to start)</small></div>
 <div class=card><b>Committed, not on the roster yet</b>${comH(t)}</div>${namedH(t)}
 <div class=card><b>Starters</b>${L.map(p=>`<div class=row style="gap:4px;font-size:17px;white-space:nowrap"><span>#${p.num} ${p.n} <small>${p.pos}${p.cls?' · '+clsN[p.cls]:''}</small></span><span>${p.ovr}</span></div>`).join('')}</div><button class=g onclick="${bk!=null?'offerView('+bk+')':'colList()'}">Back</button></div>`;ui.scrollTop=0}
let CLV='c';
function colList(v){if(v)CLV=v;const head=`<h2>College programs</h2><p class=tabs><button class="${CLV=='c'?'':'g'}" onclick="colList('c')">By conference</button><button class="${CLV=='r'?'':'g'}" onclick="colList('r')">Top programs</button></p>`,row=(t,ci,ti,k)=>`<div class=row onclick="colRoster(${ci},${ti})" style="cursor:pointer;font-size:18px"><span>${k!=null?k+1+'. ':''}${t.n}<br><small>${cfShort(S.col[ci].n)} · team rating ${t.ovr}</small></span><small>${startInfo(t).pct}% to start</small></div>`;let body='';
 if(CLV=='r'){const all=S.col.flatMap((c,ci)=>c.t.map((t,ti)=>({t,ci,ti}))).sort((a,b)=>b.t.ovr-a.t.ovr);body=`<div class=card>${all.map(({t,ci,ti},k)=>row(t,ci,ti,k)).join('')}</div>`}
 else body=cfOrd().map(ci=>{const c=S.col[ci];return `<div class=card><b>${c.n}</b> ${cfBadge(c)}<br><small>${c.t.length} schools</small>${c.t.map((t,ti)=>({t,ti})).sort((a,b)=>b.t.ovr-a.t.ovr).map(({t,ti})=>row(t,ci,ti)).join('')}</div>`}).join('');
 ui.innerHTML=`<div>${head}<p><small>Power 4 conferences first (SCC, Large 10, ACC, Large 12), then everyone else, strongest first. Tap a school for its QB room, commits and your chance to start.</small></p>${body}<button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
function portal(){const T=S.T,me=qo(S.q),s=S.ss,n=cl(Math.round((me-50)/3+s.td/6),3,12);if(!S.pt||S.pt.cy!=S.cy)S.pt={cy:S.cy,L:T.map((t,i)=>i).filter(i=>i&&Math.abs(T[i].ovr-(me+5))<=18).sort(()=>R()-.5).slice(0,n)};
 const L=S.pt.L.slice().sort((a,b)=>(cfP4(S.col[T[b].cf].n)-cfP4(S.col[T[a].cf].n))||(T[b].ovr-T[a].ovr));
 ui.innerHTML=`<div><h2>Transfer portal</h2><p><small>${L.length} schools want you. Transfers are eligible right away. You move after this season. Power 4 programs first.</small></p><div class=card>${L.map(i=>{const t=T[i],q=qroom(t),st=q[0],pl=qPlan(st,q,S.cy||1),pct=cl(Math.round(50+(me+2-st.ovr)*5+(pl!='stay'?25:0)),4,96);return `<div class=row style="font-size:18px;gap:4px;align-items:flex-start"><span>${t.n}<br><small>${cfShort(S.col[t.cf].n)} ${cfBadge(S.col[t.cf],1)} · team ${t.ovr} · starter ${st.ovr}</small><br>${qpChip(pl)} <small>${pct}% to start</small></span><button class=g onclick="xfer(${i})">Transfer</button></div>`}).join('')||'No schools reached out. Put up bigger numbers.'}</div><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
// your own QB room in college, with everyone's plans
function qrCard(){if(S.stage!='col'||!S.qr||!S.qr.length)return '';const me={n:S.name+' (you)',ovr:qo(S.q),cls:Math.min(4,S.cy||1),me:1},q=[...S.qr,me].sort((a,b)=>b.ovr-a.ovr);
 return `<div class=card><b>QB room</b> <small>plans for after this season</small>${q.map((x,i)=>`<div class=row style="font-size:17px;gap:6px;align-items:flex-start"><span style="min-width:0">${i?'':'★ '}${x.me?'<b>'+x.n+'</b>':x.n}${x.npx!=null?' ⭐':''} <small>${clsN[Math.min(4,x.cls)]}</small>${x.me?'':'<br>'+qpChip(x.fc?'stay':qPlan(x,S.qr,S.cy||1))}</span><b>${x.ovr}</b></div>`).join('')}</div>`}
