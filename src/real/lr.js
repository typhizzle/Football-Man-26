const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,tag=process.argv[4]||'p',stg=process.argv[5]||'hs';const {b,pg,errs}=await H.open({w:W,h:Hh,file:process.argv[6]});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(async stg=>{SLOT=1;newC();start();if(stg!='hs'){S.yr=4;addOffers(1);S.yr=5;endC();enroll(S.off[0].n)}if(stg=='pro'){S.cy=3;mkCsum();declare();dpFinish();let n=0;while(!S.dr.mine&&n++<300)dPick();proStart(S.dr.mine?S.dr.mine.ti:0,S.dr.mine?S.dr.mine.pk:0)}lroom();ovHide()},stg);
await wait(1200);await pg.screenshot({path:`/home/claude/real/lr/${stg}_a_${tag}.png`});
await pg.evaluate(()=>{LR.p.x=-1;LR.p.z=-4;LR.yaw=0;LR.pitch=.25;LR.cpos=null});await wait(1200);await pg.screenshot({path:`/home/claude/real/lr/${stg}_b_${tag}.png`});
await pg.evaluate(()=>{LR.p.x=-6;LR.p.z=-5.5;LR.yaw=0.15;LR.pitch=.12;LR.dist=-7;LR.cpos=null});await wait(1200);await pg.screenshot({path:`/home/claude/real/lr/${stg}_c_${tag}.png`});
console.log(stg,S=await pg.evaluate(()=>S.stage+' '+rd.info.render.calls),errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
