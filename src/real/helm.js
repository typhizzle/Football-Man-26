const H=require('./h.js');(async()=>{const tag=process.argv[2],stg=process.argv[3]||'hs';const {b,pg,errs}=await H.open({w:600,h:600,file:process.argv[4]});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(async stg=>{SLOT=1;newC();start();if(stg!='hs'){S.yr=4;addOffers(1);S.yr=5;endC();enroll(S.off[0].n)}lroom();ovHide();window.lrTick=function(){cm.fov=40;cm.position.set(-5.5,5.6,-4.8);cm.lookAt(-5.5,4.9,-8.4);cm.updateProjectionMatrix()}},stg);
await wait(1500);await pg.screenshot({path:`/home/claude/real/lr/helm_${tag}.png`});
await pg.evaluate(()=>{window.lrTick=function(){cm.fov=40;cm.position.set(-3,5.2,-6.2);cm.lookAt(-5.6,4.9,-8.4);cm.updateProjectionMatrix()}});await wait(1200);await pg.screenshot({path:`/home/claude/real/lr/helm2_${tag}.png`});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
