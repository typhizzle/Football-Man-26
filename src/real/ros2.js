// Edit a roster, leave the editor, come back: the edit must still be there.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save_=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={};
  try{localStorage.removeItem(RSWK)}catch(e){}
  menuEdit();
  out.inEditMode=!!RSEDIT;
  // change a team name and a player's name + rating, the way the editor would
  S.pro[2].n='Test Mountaineers';
  const L=rost('p.2');L[0].n='Edited Quarterback';L[0].ovr=97;
  save();                                  // the editor's own save call
  out.workCopyWritten=!!rsWorkGet();
  // leave the editor entirely and come back
  try{rsExit&&rsExit()}catch(e){}
  RSEDIT=0;S=null;
  menuEdit();
  const t=S.pro[2],L2=rost('p.2');
  out.teamNameKept=t.n;
  out.playerNameKept=L2[0].n;
  out.ratingKept=L2[0].ovr;
  out.allThreeSurvived=(t.n==='Test Mountaineers'&&L2[0].n==='Edited Quarterback'&&L2[0].ovr===97);
  // saving a named set clears the scratch copy
  try{ui.innerHTML='<input id=rsn value="MySet">';rsSave();}catch(e){}
  out.scratchClearedAfterNamedSave=!rsWorkGet();
  out.namedSetExists=!!(rsAll()&&rsAll()['MySet']);
  return out;
 },save_);
 Object.keys(o).forEach(k=>console.log(k.padEnd(26),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
