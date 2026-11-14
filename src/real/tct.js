const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:700,h:500});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();scene('field');M='lock';clr(PL);ui.style.display='none';cv.style.display='none';FLD.visible=false;
 [['tchew',0],['tchew',1],['typhizzle',0],['rmia',0]].forEach(([id,bk],i)=>{const m=celM(celBy(id));m.position.set(-3.3+i*2.2,0,-50);m.rotation.y=bk?0:Math.PI;PL.add(m)});
 window.idle=function(){cm.fov=40;cm.aspect=700/500;cm.position.set(0,2.2,-40);cm.lookAt(0,1.6,-50);cm.updateProjectionMatrix()}});
await wait(1500);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/tchew.png'});console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
