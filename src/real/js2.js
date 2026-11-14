const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:800,h:450});const wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(1500);await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'))},C.DRV);
const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
await pg.evaluate(()=>{SLOT=1;newC();start();let n=0;while(n++<3000&&S.stage!='col'){if(!step())break}lroom();$('#lrw').style.display='none';M='dbg';window.idle=function(){cm.fov=60;cm.aspect=800/450;cm.position.set(0,7.5,9);cm.lookAt(0,1.5,-8);cm.updateProjectionMatrix()}});
await wait(1200);await pg.screenshot({path:SP+'hwl1.png'});
await pg.evaluate(()=>{window.idle=function(){cm.fov=60;cm.aspect=800/450;cm.position.set(6,6,8);cm.lookAt(-19,1,0);cm.updateProjectionMatrix()}});await wait(800);await pg.screenshot({path:SP+'hwl2.png'});
await pg.evaluate(()=>{try{play()}catch(e){}ovHide();g.ph='ovr';g.o=g.o||S.T[g.oi];g.s=[28,24];g.w=1;fieldWalk();ovHide();$('#lrw').style.display='none';const o=LR.O.find(x=>x.k=='fopp');LR.p.x=o.x-3;LR.p.z=o.z;LR.pm.position.set(LR.p.x,0,LR.p.z);
 g.jsYes=1;fwOpp(2);M='dbg';window.idle=function(){cm.fov=50;cm.aspect=800/450;cm.position.set(o.x-1.5,4,o.z+8);cm.lookAt(o.x-1.5,1.8,o.z);cm.updateProjectionMatrix()}});
for(const t of [1.2,1.5,1.75,2.1,2.8]){await pg.evaluate(t=>{const L=LR;if(L.js){const d=t-L.js.t;if(d>0)lrTick(d)}ovHide()},t);await wait(700);await pg.screenshot({path:SP+'sw'+t+'.png'})}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,6));await b.close()})();
