const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:900,h:400});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();scene('field');M='lock';clr(PL);ui.style.display='none';cv.style.display='none';FLD.visible=false;
 const L=CELB.map(celOb).slice(0,40);const fem=L.filter(o=>o.fem).slice(0,4),men=L.filter(o=>!o.fem).slice(0,3);[...fem,...men].forEach((o,i)=>{const m=celM(o);m.position.set(-6+i*2,0,-50);m.rotation.y=Math.PI+(i%2?.5:0);PL.add(m)});
 window.idle=function(){cm.fov=40;cm.aspect=900/400;cm.position.set(0,2.3,-38);cm.lookAt(0,1.7,-50);cm.updateProjectionMatrix()}});
await wait(1500);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/cel3.png'});await b.close()})();
