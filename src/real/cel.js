const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:700,h:600});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();S.stage='col';celRoom()});await wait(1500);
await pg.evaluate(()=>{LR.p.x=0;LR.p.z=LR.bd?LR.bd[3]-2:LR.p.z;LR.yaw=0;LR.dist=6});await wait(1500);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/cel1.png'});
await pg.evaluate(()=>{LR.yaw=Math.PI*.5});await wait(1200);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/cel2.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
