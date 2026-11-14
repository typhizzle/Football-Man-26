const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{localStorage.clear();menu();menuMain()});await wait(1500);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/hm_0.png'});
for(const i of [1,2,3,4,5,6]){await pg.evaluate(()=>hatSet(1));await wait(900);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/hm_'+i+'.png'})}
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
await pg.evaluate(()=>{let n=0;while(n++<5000&&(S.stage||'hs')!='col'){if(!step())break}S.cash=1e6;});
console.log(await pg.evaluate(()=>{hub();const has=/Halloween Event/.test(ui.innerText);hwEventV();const a=ui.innerText.slice(0,500);hwClaim();const b=ui.innerText.slice(0,200);return has+' | '+a.replace(/\n/g,' | ')+'\n>> '+b.replace(/\n/g,' | ')+' cash '+S.cash}));
console.log(await pg.evaluate(()=>{(S.inv=S.inv||[]).push('hx1','hx2','hx3');S.hwdec=1;S.dogBand=1;famEns().dogs=[{n:'Rex',b:(Object.keys(DOGC)[0])}];S.dogMine=1;return wrOpts('cas').map(x=>x[1]).join(', ')}));
for(const id of ['hx1','hx2','hx3']){await pg.evaluate((id)=>{S.wear=null;wrEns();S.wear.cas=id;homeWalk();LR.yaw=Math.PI},id);await wait(1700);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/hx_'+id+'.png'});await pg.evaluate(()=>hmExit(1))}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,8));await b.close()})();
