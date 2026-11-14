// ===================== 👥 no two players share a name =====================
// The name generator could hand the same name to two different people (a 23-year-old
// WR and a 36-year-old CB were both "Bacon Miller"). Nobody is deleted and no stats
// are touched: the player with the longer career keeps the name, and the other is
// given a fresh one that nothing else in the league is using. Seeded, so he gets the
// same new name on every load.
window.nmFixDupes=function(s){
 if(!s||!s.ro)return 0;
 const byName={},all=[];
 Object.keys(s.ro).forEach(k=>{
  const L=s.ro[k];if(!Array.isArray(L))return;
  L.forEach((x,i)=>{
   if(!x||!x.n)return;
   const rec={x,k,i};all.push(rec);
   (byName[x.n]=byName[x.n]||[]).push(rec);
  });
 });
 // every name already in use anywhere, so a replacement can't collide either
 const taken=new Set(Object.keys(byName));
 try{(s.ro.fa||[]).forEach(p=>p&&p.n&&taken.add(p.n));(s.retd||[]).forEach(p=>p&&p.n&&taken.add(p.n))}catch(e){}
 let fixed=0;
 Object.keys(byName).forEach(n=>{
  const L=byName[n];
  if(L.length<2)return;
  // longest career keeps the name; ties go to the higher rating
  L.sort((a,b)=>((b.x.h||[]).length-(a.x.h||[]).length)||((b.x.ovr||0)-(a.x.ovr||0)));
  for(let j=1;j<L.length;j++){
   const x=L[j].x;
   const r=rng(hsh('dupname'+n+L[j].k+L[j].i+(s.seed||1)));
   let nn='',guard=0;
   do{nn=NF[(r()*NF.length)|0]+' '+NL[(r()*NL.length)|0]}while(taken.has(nn)&&guard++<80);
   if(taken.has(nn))continue;
   taken.add(nn);
   x.on=x.on||x.n;          // remember who he was, so nothing is silently lost
   x.n=nn;fixed++;
  }
 });
 return fixed;
};
(()=>{if(typeof mig!='function')return;
 const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{if(s&&!s.nmdup){nmFixDupes(s);s.nmdup=1}}catch(e){}return s};
})();
