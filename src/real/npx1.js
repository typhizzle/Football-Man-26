// Verify the grouped draft class: correct buckets, seniors always declare,
// and the SAME answer every time the screen opens (no re-rolling).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const o={};
  // bucket every college prospect and check seniors
  const buckets={0:[],1:[],2:[]},seniorsNotDeclaring=[];
  (S.npx||[]).forEach(p=>{const w=npxAt(p);if(w.lv!='col')return;
   const cl_=Math.min(4,w.y),d=npxDecide(p,cl_);
   buckets[d.g].push(`${p.n} (${['Fr','So','Jr','Sr'][cl_-1]}) ${d.why}`);
   if(cl_>=4&&d.g!==0)seniorsNotDeclaring.push(p.n);
  });
  o.declaring=buckets[0].slice(0,6);o.declaringN=buckets[0].length;
  o.undecided=buckets[1].slice(0,6);o.undecidedN=buckets[1].length;
  o.staying=buckets[2].slice(0,6);o.stayingN=buckets[2].length;
  o.seniorsNotDeclaring=seniorsNotDeclaring;
  // STABILITY: decide twice, must match exactly
  const once=(S.npx||[]).map(p=>{const w=npxAt(p);return w.lv=='col'?npxDecide(p,Math.min(4,w.y)).g+'|'+npxDecide(p,Math.min(4,w.y)).why:''}).join(';');
  const twice=(S.npx||[]).map(p=>{const w=npxAt(p);return w.lv=='col'?npxDecide(p,Math.min(4,w.y)).g+'|'+npxDecide(p,Math.min(4,w.y)).why:''}).join(';');
  o.stableAcrossCalls=(once===twice);
  // render the screen twice, compare the HTML
  let h1='',h2='';
  try{npxV();h1=ui.innerHTML}catch(e){o.renderErr=String(e)}
  try{npxV();h2=ui.innerHTML}catch(e){o.renderErr2=String(e)}
  o.stableAcrossRenders=(h1===h2);
  o.headerOrder=(()=>{const t=ui.innerText;
    const a=t.indexOf('Declaring for the draft'),b2=t.indexOf('Undecided juniors'),c=t.indexOf('Staying in college');
    return {declaringAt:a,undecidedAt:b2,stayingAt:c,correctOrder:(a>=0&&b2>a&&c>b2)||(a>=0&&c>a&&b2<0)};})();
  o.uiText=ui.innerText.slice(0,260).replace(/\n+/g,' | ');
  return o;
 },save);
 console.log('declaring   ('+out.declaringN+'):',out.declaring);
 console.log('undecided   ('+out.undecidedN+'):',out.undecided);
 console.log('staying     ('+out.stayingN+'):',out.staying);
 console.log('\nSeniors NOT declaring (should be empty):',out.seniorsNotDeclaring);
 console.log('Stable across calls  :',out.stableAcrossCalls);
 console.log('Stable across renders:',out.stableAcrossRenders);
 console.log('Header order         :',JSON.stringify(out.headerOrder));
 console.log('screen:',out.uiText);
 if(out.renderErr)console.log('RENDER ERR:',out.renderErr);
 await pg.screenshot({path:'/home/claude/real/shot_draftclass.png'});
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
