// ===================== 🌟 draft class: who is declaring, who is staying =====================
// Seniors declare. Juniors decide for real reasons (title chase, his guys, NIL money
// vs a late pick) and the decision is seeded, so it is the SAME every time you open
// the screen — it never re-rolls. Order is: declaring on top, undecided juniors next,
// staying in college at the bottom.
window.NPXGO=['first-round money is on the table','his stock will never be higher','he is ready for the next level','scouts already have his grade'];
window.NPXSTAY=['chasing a national title','wants one more year with his guys','NIL pays better than a late pick','wants to raise his draft stock'];

// group 0 = declaring, 1 = undecided junior, 2 = staying in college next season
window.npxDecide=function(p,cl_){
 try{
  if(cl_>=4)return{g:0,why:'senior'};
  if((p.dk||1)>=2)return{g:0,why:'went back to school, in this draft'};
  if(cl_<3)return{g:2,why:'underclassman'};
  const r=rng(hsh('decl'+(p.n||'')+(S.seed||1)+cl_)),roll=r();
  let grade=p.T||70;try{grade=npxRating(p,{lv:'col',y:cl_})||grade}catch(e){}
  const go=cl(.25+((grade-70)/40),.08,.92);           // better player, likelier to go
  if(roll<go)return{g:0,why:NPXGO[(r()*NPXGO.length)|0]};
  if(roll<go+.18)return{g:1,why:'has not said yet'};
  return{g:2,why:NPXSTAY[(r()*NPXSTAY.length)|0]};
 }catch(e){return{g:cl_>=4?0:1,why:''}}
};

// The juniors who went BACK to school. lgClass(Y) only holds players who came out,
// so the ones who stayed are generated from the same year seed — stable every load,
// and nothing is written to the save (pure read, no side effects).
window.lgStayers=function(Y){
 try{
  const r=rng(hsh('stay'+Y+(S.seed||1))),cols=(S.col||[]).flatMap(c=>c.t.map(t=>t.n)),out=[];
  for(let i=0;i<30;i++){
   let u=r(),pos='WR';for(const[p,w]of LGDP){if((u-=w)<0){pos=p;break}}
   const ovr=52+Math.floor(r()*22);
   out.push({n:uNm(r),pos,ovr,age:21,col:cols.length?cols[Math.floor(r()*cols.length)]:'',
             why:NPXSTAY[(r()*NPXSTAY.length)|0],undec:r()<.3});
  }
  return out.sort((a,b)=>b.ovr-a.ovr);
 }catch(e){return[]}
};

// This season's draft class, split the way you asked.
window.npxClassNow=function(){
 try{
  const Y=yrN(),C=lgClass(Y)||[],St=lgStayers(Y);
  const go=[],und=[],stay=[];
  C.forEach(p=>{
   const sr=(p.age||22)>=22;
   go.push({n:p.n,pos:p.pos,ovr:p.ovr,col:p.col,
            tag:sr?'senior':'junior · '+NPXGO[Math.abs(hsh(p.n))%NPXGO.length]});
  });
  St.forEach(p=>{(p.undec?und:stay).push({n:p.n,pos:p.pos,ovr:p.ovr,col:p.col,
            tag:p.undec?'junior · has not said yet':'junior · '+p.why})});
  return{Y,go,und,stay};
 }catch(e){return null}
};

(()=>{if(typeof npxV!='function')return;
 npxV=function(){
  npxEnsure();if(!npxVis())return hub();npbFix();
  const G=[[],[],[]],hs=[],pro=[];
  [...S.npx].forEach(p=>{
   const w=npxAt(p);let where,lab,bucket=null,dec=null;
   if(w.lv=='hs'){where=`${npxHS(p)} (${SAB[p.st]||p.st}) · ${CLS[w.y-1]}`;lab='HS '+npxRating(p,w)}
   else if(w.lv=='col'){
    const cl_=Math.min(4,w.y);dec=npxDecide(p,cl_);bucket=dec.g;
    where=`${p.sch} · ${npxCls(p,cl_)}${p.xf?' · transfer':''}${dec.why?' · '+dec.why:''}`;
    lab='College '+npxRating(p,w);
   }else{
    const tm=p.pro?S.pro[p.pro.ti]:null,x=tm&&S.stage=='pro'?(()=>{const i=tix(tm);if(i<0)return null;return rost('h.'+i).find(z=>z&&z.npx===p.id)})():null;
    where=p.pro?`Drafted ${p.pro.yr}, #${p.pro.pk} (round ${p.pro.rd}) · ${tn(tm)}`:'Entering the draft';
    lab=x?'Pro OVR '+x.ovr:'Pro OVR '+p.T;
   }
   const row=`<div class=row style="font-size:16px;gap:6px;align-items:flex-start"><span style="min-width:0"><b>#${p.num} ${p.n}</b> <small>${p.pos}${p.gen?' · ★ super rare':''}</small><br><small>${where}</small>${npxRealTxt(p)}</span><b style="flex:none">${lab}</b></div>`;
   const sortKey=(p.pro?p.pro.pk:999);
   if(w.lv=='hs')hs.push({row,sortKey});
   else if(w.lv=='col')G[bucket].push({row,sortKey,ovr:npxRating(p,w)||0});
   else pro.push({row,sortKey});
  });
  const byPick=(a,b)=>a.sortKey-b.sortKey;
  const byOvr=(a,b)=>(b.ovr||0)-(a.ovr||0)||a.sortKey-b.sortKey;
  const sec=(t,sub,arr)=>arr.length?`<div class=card><b>${t}</b> <small>(${arr.length})</small>${sub?`<br><small>${sub}</small>`:''}${arr.map(x=>x.row).join('')}</div>`:'';
  // this season's class, grouped by who is coming out
  const N=npxClassNow();
  const prow=p=>`<div class=row style="font-size:16px;gap:6px;align-items:flex-start"><span style="min-width:0"><b>${p.n}</b> <small>${p.pos}</small><br><small>${p.col||''}${p.tag?' · '+p.tag:''}</small></span><b style="flex:none">${p.ovr} OVR</b></div>`;
  const psec=(t,sub,arr)=>arr&&arr.length?`<div class=card><b>${t}</b> <small>(${arr.length})</small>${sub?`<br><small>${sub}</small>`:''}${arr.slice(0,60).map(prow).join('')}${arr.length>60?`<small>+ ${arr.length-60} more</small>`:''}</div>`:'';
  const now=N?(
   psec('🎤 Declaring for the '+N.Y+' draft','Seniors, plus the juniors coming out early.',N.go)+
   psec('🤔 Undecided juniors','Could still go either way.',N.und)+
   psec('🎓 Staying in college next season','Back for another year.',N.stay)
  ):'';

  const body=now+
   sec('🎤 Your class — declaring','Seniors, plus the juniors who are coming out.',G[0].sort(byOvr))+
   sec('🤔 Your class — undecided juniors','Could still go either way.',G[1].sort(byOvr))+
   sec('🎓 Your class — staying in college','Back for another year.',G[2].sort(byOvr))+
   sec('🏟 Your class — already in the pros','',pro.sort(byPick))+
   sec('🏫 Your class — still in high school','',hs.sort(byPick));
  const yrs=Object.keys(S.npb||{}).sort();
  const Y=(typeof yrN=='function')?yrN():'';
  ui.innerHTML=`<div><h2>🌟 ${S.npxd?'Draft class':(S.stage||'hs')=='hs'?'Future draft class':'Upcoming pro draft'}${Y?' · '+Y:''}</h2>`+
   `<div class=card><small>Seniors declare. Juniors choose, and the reason is shown next to each name. Each player starts his pro career at his projected rating; how far he climbs depends on a hidden potential that is different every career.</small></div>`+
   (body||'<div class=card><small>No prospects to show yet.</small></div>')+
   yrs.map(y=>`<button onclick="dnWatch(${y})">📺 Watch round 1 of the ${y} draft</button><button class=g onclick="npbV(${y},1)">📋 ${y} draft: all 7 rounds (224 picks)</button>`).join('')+
   `<button class=g onclick=hub()>Back</button></div>`;
  ui.scrollTop=0;
 };
})();
