const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const N=npxClassNow();
  const r={Y:N.Y,go:N.go.length,und:N.und.length,stay:N.stay.length,
    goSample:N.go.slice(0,3).map(p=>`${p.n} ${p.pos} ${p.ovr} (${p.tag})`),
    undSample:N.und.slice(0,3).map(p=>`${p.n} ${p.pos} ${p.ovr} (${p.tag})`),
    staySample:N.stay.slice(0,3).map(p=>`${p.n} ${p.pos} ${p.ovr} (${p.tag})`)};
  // stability: same class on a second call?
  const a=JSON.stringify(npxClassNow()),b2=JSON.stringify(npxClassNow());
  r.stable=(a===b2);
  npxV();
  const t=ui.innerText;
  const i1=t.indexOf('Declaring for the'),i2=t.indexOf('Undecided juniors'),i3=t.indexOf('Staying in college next season');
  r.order={declaring:i1,undecided:i2,staying:i3,correct:(i1>=0&&i2>i1&&i3>i2)};
  // save must not be mutated by merely viewing
  r.dcUntouched=Object.keys(S.dc||{}).length;
  return r;
 },save);
 console.log(JSON.stringify(o,null,1));
 await pg.screenshot({path:'/home/claude/real/shot_draftclass.png'});
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
