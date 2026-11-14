const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:800,h:420});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();scene('field');M='lock';clr(PL);ui.style.display='none';cv.style.display='none';FLD.visible=false;
 [['hx4',Math.PI],['hx4',0],['hx5',Math.PI*.8],['hx6',Math.PI]].forEach(([id,r],i)=>{const m=outfitM(id);m.position.set(-4.5+i*3,0,-50);m.rotation.y=r;PL.add(m)});
 window.idle=function(){cm.fov=38;cm.aspect=800/420;cm.position.set(0,2.4,-39);cm.lookAt(0,1.8,-50);cm.updateProjectionMatrix()}});
await wait(1500);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/skel.png'});console.log(errs.slice(0,3));await b.close()})();
