const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const C=require('/home/claude/t41/ctx.js');await pg.evaluate(()=>{SLOT=1;newC();start();ovHide()});await pg.evaluate(C.DRV+';window.step=step;');
await pg.evaluate(()=>{let n=0;while(n++<6000){if(S.stage=='col'&&S.wk>=2)break;if(!step())break}S.cash=900000;shopBuy('b1','band');shopBuy('s3','suit');S.gf={n:'Ava Stone',age:20,why:'fame',aff:90,wks:30,ew:20,status:'engaged',okWkd:1,maxW:20};wedBook(3,0);hub();wedWalk()});await wait(1500);await pg.screenshot({path:'/home/claude/real/bw/wed1.png'});
await pg.evaluate(()=>{LR.p.x=0;LR.p.z=-59.5;const o=LR.O.find(x=>x.k=='wofc');wdAct(o)});await wait(300);await pg.evaluate(()=>{wdAisle()});await wait(4000);await pg.screenshot({path:'/home/claude/real/bw/wed2.png'});await wait(3600);
const r=await pg.evaluate(()=>{const t=ov.innerText.slice(0,40);WDG.v=2;wdKiss();wdKiss2();wdParty();wdDone();return t+' | '+S.gf.status+' '+S.gf.aff});console.log(r);
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
