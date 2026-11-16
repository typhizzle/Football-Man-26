// ============ cowboy boots come off, and stats for every position that has them ============

// ---- the suit's own boots ----
// Both cowboy suits build boots straight onto the leg groups. Equipping footwear on top
// of them put two shoes in the same place, so the new one poked through the old one.
// The suit's boots come off whenever you are wearing your own, exactly like its hat.
window.outBootOff=function(m,id){try{
 if(!m||!m.L||!window.OUTHAT||!OUTHAT[id])return 0;let n=0;
 m.L.forEach(l=>{(l.children||[]).slice().forEach(c=>{
  if(c&&c.position&&c.geometry&&c.position.y<=-.55){l.remove(c);n++}
 })});
 return n}catch(e){return 0}};
(()=>{try{if(typeof outfitM!='function')return;const _o=outfitM;
 outfitM=function(id){const m=_o.apply(this,arguments);
  try{if(m&&S&&S.shoe&&window.OUTHAT&&OUTHAT[id]){outBootOff(m,id);fitExtras(m,id)}}catch(e){}
  return m}}catch(e){}})();

// ---- a stat line for every position that actually has stats ----
// The roster only showed four players a team: the QB, the lead back, the top receiver
// and one lineman. Everybody whose position produces a countable stat gets a line now.
// Offensive linemen are the only ones left blank, because nothing is tracked for them.
// All of it is seeded off the save, so a player's line never changes between screens.
window.rosStat=function(i,s,L){
 const o={};try{
  if(!s||!L)return o;
  const gp=s.gp||1,M=x=>Math.max(0,Math.round(x)),ov=k=>(L[k]&&L[k].ovr)||60;
  const rr=rng((S.seed||1)+i*911+(S.yr||1)*31+(S.cy||0)*7+(S.py||0)*3);
  o[0]=(i==0?`${S.ss.yds}y ${S.ss.td}TD ${S.ss.int}INT`:`${s.P.a}y ${s.P.b}TD ${s.P.c}INT`);
  o[1]=`${s.Ru.a}y ${s.Ru.b}TD`;
  o[2]=`${s.Re.a}y ${s.Re.b}TD`;
  o[11]=`${s.Sk.a} sk`;
  // the other receivers and the tight end, off the number one's share
  [[3,.64],[4,.42],[5,.48]].forEach(([k,f])=>{
   if(!L[k])return;
   o[k]=`${M(s.Re.a*f*(.72+ov(k)/150)*(.82+rr()*.4))}y ${M(s.Re.b*f*(.8+rr()*.5))}TD`});
  // the rest of the defensive line
  [12,13,14].forEach(k=>{if(!L[k])return;
   o[k]=`${M(gp*(.055+(ov(k)-60)/95)*(.45+rr()*1.1))} sk`});
  // linebackers: tackles, and the occasional sack
  [15,16,17].forEach(k=>{if(!L[k])return;
   o[k]=`${M(gp*(4.1+(ov(k)-60)/16)*(.82+rr()*.4))} tkl · ${M(gp*(.03+(ov(k)-60)/230)*(.4+rr()))} sk`});
  // corners and safeties: interceptions and tackles
  [18,19,20,21].forEach(k=>{if(!L[k])return;
   o[k]=`${M(gp*(.065+(ov(k)-60)/330)*(.4+rr()*1.3))} INT · ${M(gp*(2.5+(ov(k)-60)/27)*(.82+rr()*.4))} tkl`});
  // the kicker
  if(L[22]){const att=M(gp*(1.45+rr()*.7));
   o[22]=`${M(att*cl(.62+(ov(22)-60)/120,.4,.97))}/${att} FG`}
 }catch(e){}
 return o;
};
