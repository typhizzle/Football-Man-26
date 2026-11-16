
// ===================== CALENDAR REPAIR: one history entry per season, never more seasons than you've actually played =====================
function calFix(s){try{if(!s||!Array.isArray(s.hist))return s;const H=s.hist,st=s.stage||'hs',key=h=>String(h.y),seen=new Map();H.forEach((h,i)=>seen.set(key(h),i));let keep=H.map((h,i)=>seen.get(key(h))===i&&!(typeof h.y=='number'&&(h.y>4||h.y<1)));
 const tm=s.htm||[];let out=[],otm=[];H.forEach((h,i)=>{if(keep[i]){out.push(h);otm.push(tm[i])}});
 // never more seasons than the stage allows
 const nH=out.filter(h=>typeof h.y=='number').length,nC=out.filter(h=>String(h.y)[0]=='C').length,nP=out.filter(h=>String(h.y)[0]=='P').length;
 const capC=st=='hs'?0:st=='col'?Math.max(0,(s.cy||1)-1):99,capP=st=='pro'?Math.max(0,(s.py||1)-1):(st=='draft'?0:99);
 if(nC>capC||(st=='col'&&nP)||((st=='hs')&&(nC||nP))||(st=='pro'&&nP>capP)){let c=0,p=0;const o2=[],t2=[];out.forEach((h,i)=>{const k=String(h.y)[0];if(k=='C'){if(++c>capC)return}if(k=='P'){if(st!='pro'||++p>capP)return}o2.push(h);t2.push(otm[i])});out=o2;otm=t2}
 if(out.length!=H.length){s.hist=out;s.htm=otm;s.calFx=(s.calFx||0)+1;const nk=(s.stage||'hs')+((s.y0||2022)+out.length);if(s.grk)s.grk=nk;if(s.crh)s.crh.k=nk}}catch(e){}return s}
// ranking a team had going into a given week (from the weekly poll snapshots); falls back to the current poll
function crAt(i,w){try{if((S.stage||'hs')!='col')return 0;const H=S.crh&&S.crh.k==grK()?S.crh.w:null;if(H){const ks=Object.keys(H).map(Number).filter(k=>k<=w).sort((a,b)=>b-a);if(ks.length){const p=H[ks[0]].indexOf(i)+1;return p>0&&p<=25?p:0}}return crNo(i)}catch(e){return 0}}
const tnrW=(i,w,past)=>{if(!past)return tnr(S.T[i]);const k=crAt(i,w);return (k?'#'+k+' ':'')+tn(S.T[i])};
