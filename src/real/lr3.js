const H=require('./h.js');(async()=>{const stg=process.argv[2]||'hs';const {b,pg,errs}=await H.open({w:844,h:470});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(async stg=>{SLOT=1;newC();start();if(stg!='hs'){S.yr=4;addOffers(1);S.yr=5;endC();enroll(S.off[0].n)}if(stg=='pro'){S.cy=3;mkCsum();declare();dpFinish();let n=0;while(!S.dr.mine&&n++<300)dPick();proStart(S.dr.mine?S.dr.mine.ti:0,S.dr.mine?S.dr.mine.pk:0)}lroom();ovHide();$('#lrw').style.display='none';
window.CV=[[0,4,2,19,3.5,2,75],[0,4,2,-19,3.5,2,75],[0,4,6,19,3.5,12,75],[0,4,6,-19,3.5,12,75]];window.CI=0;window.lrTick=function(){const c=CV[CI];cm.fov=c[6];cm.position.set(c[0],c[1],c[2]);cm.lookAt(c[3],c[4],c[5]);cm.updateProjectionMatrix()}},stg);
for(let i=0;i<4;i++){await pg.evaluate(i=>{CI=i},i);await wait(1100);await pg.screenshot({path:`/home/claude/real/lr/w_${stg}_${i}.png`})}
console.log(stg,await pg.evaluate(()=>rd.info.render.calls),errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
