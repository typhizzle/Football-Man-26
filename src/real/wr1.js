const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=5;newC();start();S.stage='col';S.cash=5e6;HWC.forEach(c=>shopBuy(c[0],'hw'));});
for(const id of ['hw1','hw2','hw3','hw4','hw5','hw6']){await pg.evaluate((id)=>{S.wear=null;wrEns();S.wear.cas=id;homeWalk();LR.yaw=Math.PI;},id);await wait(1800);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/cos_'+id+'.png'});await pg.evaluate(()=>{hmExit(1)})}
console.log(await pg.evaluate(()=>{wardV('lock','');const a=ui.innerText.slice(0,500);wrSet('lock','hw6');return a+' | wear='+JSON.stringify(S.wear)}));
await pg.evaluate(()=>{lroom()});await wait(1800);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/cos_lock.png'});
console.log(await pg.evaluate(()=>{const o=LR.O.find(o=>o.k=='mylock');LR.near=o;lrAct(o);return lrLabel(o)+' | '+ov.innerText.slice(0,300)}));
console.log(await pg.evaluate(()=>{lrExit();S.inv.push('s2');S.suit='s2';wrSet('ev','s2');S.spe={k:wkKey(),L:[{k:'party',v:'goat',n:"Goatie's launch party",d:'x'}],done:[]};spEv2(0,0);return 'M='+M+' cel='+(S.spe.L[0].cel||'')}));
await wait(1800);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/cos_ev.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,8));await b.close()})();
