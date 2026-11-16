// ===================== the pro league is set up like the NFL =====================
// 17 games: 6 division (home and away), 4 vs a same-conference division, 4 vs an other-conference division, 2 same-place in-conference, 1 same-place cross-conference; one bye between weeks 5 and 12; week 18 is all division games when possible
function pSchedNFL(T,yr,rs){const C=['RFC','LFC'],dvs={};T.forEach((t,i)=>{const d=t.dv||'';(dvs[d]=dvs[d]||[]).push(i)});const D={RFC:[],LFC:[]};Object.keys(dvs).sort().forEach(d=>{const c=d.split(' ')[0];if(D[c])D[c].push(dvs[d])});if(D.RFC.length!=4||D.LFC.length!=4||Object.values(dvs).some(L=>L.length!=4))return null;
 const pos=L=>[...L].sort((a,b)=>((T[b].w||0)-(T[b].l||0))-((T[a].w||0)-(T[a].l||0))||T[b].ovr-T[a].ovr),P=[],add=(a,b)=>P.push([a,b]);
 const ip=[[[0,1],[2,3]],[[0,2],[1,3]],[[0,3],[1,2]]][yr%3];
 C.forEach(c=>{const ds=D[c].map(pos);ds.forEach(L=>{for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){add(L[i],L[j]);add(L[j],L[i])}});
  ip.forEach(([x,y])=>{for(const a of ds[x])for(const b of ds[y])add(a,b)});
  // same-place vs the two in-conference divisions you did not play in full
  ds.forEach((L,di)=>{const pr=ip.find(p=>p.includes(di)),mate=pr[0]==di?pr[1]:pr[0];ds.forEach((M,dj)=>{if(dj==di||dj==mate||dj<di)return;for(let k=0;k<4;k++)add(L[k],M[k])})})});
 const ds0=D.RFC.map(pos),ds1=D.LFC.map(pos),off=yr%4;
 for(let i=0;i<4;i++){const A=ds0[i],B=ds1[(i+off)%4];for(const a of A)for(const b of B)add(a,b);const B2=ds1[(i+off+2)%4];for(let k=0;k<4;k++)add(A[k],B2[k])}
 if(P.length!=272)return null;
 // weeks: proper edge colouring (Kempe chains), 18 colours = 18 weeks; each team's one free colour is its bye
 const n=T.length,G=P.length;for(let tr=0;tr<30;tr++){const M=Array.from({length:n},()=>new Array(18).fill(-1)),col=new Array(G).fill(-1),ord=P.map((p,k)=>k).sort(()=>rs()-.5);let ok=true;
  const kempe=(st,al,be)=>{const path=[];let v=st,c=al,guard=0;while(guard++<200){const e=M[v][c];if(e<0)break;path.push(e);const[x,y]=P[e];v=x==v?y:x;c=c==al?be:al}path.forEach(e=>{const[x,y]=P[e],o=col[e];M[x][o]=-1;M[y][o]=-1});path.forEach(e=>{const[x,y]=P[e],nc=col[e]==al?be:al;col[e]=nc;M[x][nc]=e;M[y][nc]=e});return v};
  for(const k of ord){const[a,b]=P[k];const fa=[],fb=[];for(let c=0;c<18;c++){if(M[a][c]<0)fa.push(c);if(M[b][c]<0)fb.push(c)}const cm=fa.filter(c=>M[b][c]<0);let c=-1;
   if(cm.length)c=cm[rs()*cm.length|0];else{for(let t=0;t<12&&c<0;t++){const fa2=[],fb2=[];for(let q=0;q<18;q++){if(M[a][q]<0)fa2.push(q);if(M[b][q]<0)fb2.push(q)}const cm2=fa2.filter(q=>M[b][q]<0);if(cm2.length){c=cm2[0];break}const al=fa2[rs()*fa2.length|0],be=fb2[rs()*fb2.length|0];const end=kempe(b,al,be);if(M[a][al]<0&&M[b][al]<0)c=al;else if(M[a][be]<0&&M[b][be]<0)c=be}}
   if(c<0){ok=false;break}col[k]=c;M[a][c]=k;M[b][c]=k}
  if(!ok)continue;
  // map colours to weeks: the colours holding the most byes become weeks 5-14
  const fr=new Array(18).fill(0),fc=T.map((t,i)=>M[i].indexOf(-1));fc.forEach(c=>{if(c>=0)fr[c]++});const byC=[...Array(18).keys()].sort((x,y)=>fr[y]-fr[x]),mid=byC.slice(0,10).sort(()=>rs()-.5),edge=byC.slice(10).sort(()=>rs()-.5),wkOf={};
  [...edge.slice(0,4),...mid,...edge.slice(4)].forEach((c,w)=>wkOf[c]=w);
  const mids=new Set(mid),outN=()=>T.reduce((x,t,i)=>x+(mids.has(M[i].indexOf(-1))?0:1),0);let on=outN();
  for(let at=0;at<600&&on>0;at++){const bad=T.map((t,i)=>i).filter(i=>!mids.has(M[i].indexOf(-1)));const tm=bad[rs()*bad.length|0],f=M[tm].indexOf(-1),c=mid[rs()*mid.length|0];
   const snapC=col.slice(),snapM=M.map(r=>r.slice());kempe(tm,c,f);const on2=outN();if(on2<=on)on=on2;else{for(let k=0;k<G;k++)col[k]=snapC[k];for(let t=0;t<n;t++)M[t]=snapM[t]}}const W=Array.from({length:18},()=>[]);P.forEach((p,k)=>W[wkOf[col[k]]].push(p));
  // last week: as many division games as possible is nice but not required
  return W}
 return null}
// CPU extra point vs two-point try: the standard late-game chart (4th quarter)
function tdPts(lead,sec,h2){if(lead==null||!h2||sec>900)return R()<.95?7:6;const d=lead+6;if([-10,-9,-5,-2,1,5].includes(d))return R()<.48?8:6;return R()<.95?7:6}
// each conference takes one week off in the middle of the season (that is most teams' bye)
const cskW=L=>6+(((L&&L[0])||0)*7+(S.cy||1))%4;
