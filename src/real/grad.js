const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,tag=process.argv[4]||'p';const {b,pg,errs}=await H.open({w:W,h:Hh});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();S.yr=4;addOffers(1);S.commit=S.off[0].n;S.yr=5;hub()});
await wait(1500);await pg.screenshot({path:`/home/claude/real/lr/grad_a_${tag}.png`});
await pg.evaluate(()=>{LR.p.z=-47;LR.p.x=0;LR.cpos=null});await wait(1200);await pg.screenshot({path:`/home/claude/real/lr/grad_b_${tag}.png`});
await pg.evaluate(()=>{gdAct(LR.O.find(o=>o.k=='dmate'))});await wait(400);await pg.screenshot({path:`/home/claude/real/lr/grad_c_${tag}.png`});
await pg.evaluate(()=>{ovHide();gdHuddle();gdBreak()});await wait(1200);await pg.screenshot({path:`/home/claude/real/lr/grad_d_${tag}.png`});
await pg.evaluate(()=>{gdWalk()});await wait(400);await pg.screenshot({path:`/home/claude/real/lr/grad_e_${tag}.png`});
await pg.evaluate(()=>{gdToss();LR.cpos=null});await wait(1500);await pg.screenshot({path:`/home/claude/real/lr/grad_f_${tag}.png`});
const r=await pg.evaluate(()=>{gradEnd();return (S.grd&&S.grd.hs)+' '+/Choose your college/.test(document.querySelector('#ui').innerHTML)+' '+(S.aw||[]).slice(-1)});console.log(r,errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
