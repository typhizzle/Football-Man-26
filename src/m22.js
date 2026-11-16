
// ---------------- high school classes: grades on every roster, seniors graduate and sign (or don't), juniors move up ----------------
const hsOn=()=>!S.stage||S.stage=='hs';
function hsCols(){return (S.col||[]).flatMap(c=>c.t)}
// a talented upperclassman picks a school that fits his level (stays with him)
function hsCommit(x,seed){if(x.cm!==undefined)return;const r=rng(hsh(x.n)+(seed||0)),all=hsCols();if(!all.length)return;
 const need=x.gr>=4?70:82;if(x.ovr<need){if(x.gr>=4)x.cm=null;return}
 const tgt=cl(55+(x.ovr-70)*1.6+(r()-.5)*10,45,95),pool=all.slice().sort((a,b)=>Math.abs(a.ovr-tgt)-Math.abs(b.ovr-tgt)).slice(0,6);x.cm=pool[r()*pool.length|0].n}
function hsGr(a,L){if(!hsOn()||a[0]!='h'||!L)return;const me=a=='h.0';L.forEach((x,j)=>{if(!x)return;if(me&&j==0){x.gr=Math.min(S.yr||1,4);return}
 if(!x.gr){const r=rng(hsh(x.n+'|g'));x.gr=x.npx!=null&&x.cls?Math.min(4,x.cls):1+(r()*4|0)}if(x.gr>=3)hsCommit(x,S.seed)})}
function hsTag(x){if(!x||!x.gr)return'';let s=' · '+clsN[x.gr];if(x.gr>=3){if(x.cm)s+=' · committed: '+x.cm;else if(x.gr==4&&x.cm===null)s+=' · no scholarship offers'}return s}
// new school year: everyone moves up a grade, seniors leave (your teammates are remembered), freshmen arrive
function hsAge(){if(!S.ro)return;const al=S.alum||(S.alum=[]);Object.keys(S.ro).forEach(a=>{if(a[0]!='h')return;const L=S.ro[a],t=gt(a);if(!Array.isArray(L))return;
 L.forEach((x,j)=>{if(!x||(a=='h.0'&&j==0)||x.npx!=null)return;if(!x.gr)return;x.gr++;if(x.gr>4){if(a=='h.0'&&x.cm)al.push({n:x.n,pos:x.pos,num:x.num,ovr:x.ovr,cm:x.cm,yr:S.yr});
  const rs=rng(hsh(x.n)+S.yr*31);L[j]={n:NF[rs()*NF.length|0]+' '+NL[rs()*NL.length|0],pos:x.pos,num:x.num,ovr:cl(Math.round(((t&&t.ovr)||60)-8+(rs()-.5)*16),30,90),gr:1}}
  else x.ovr=cl(x.ovr+ri(0,4),30,99)})})}
// your old high school teammates show up on their college's roster
function hsAlumIn(a,t,L){if(!S.alum||!S.alum.length||a[0]!='c'||!t||!L)return;S.alum.forEach(p=>{if(p.cm!=t.n||L.some(x=>x&&x.n==p.n))return;let k=-1,lo=1e9;
 L.forEach((x,j)=>{if(j>0&&x&&x.pos==p.pos&&x.npx==null&&!x.al&&x.ovr<lo){lo=x.ovr;k=j}});if(k<0)return;const yrs=Math.max(1,(S.cy||1)+(4-(p.yr||4)));L[k]={n:p.n,pos:p.pos,num:p.num,ovr:cl(p.ovr+2*yrs,40,95),cls:Math.min(4,yrs),al:1}})}
