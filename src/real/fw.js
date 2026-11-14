const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const C=require('/home/claude/t41/ctx.js');await pg.evaluate(()=>{SLOT=1;newC();start();ovHide()});await pg.evaluate(C.DRV+';window.step=step;');
await pg.evaluate(()=>{let n=0;while(n++<6000){if(S.stage=='col'&&S.wk>=2)break;if(!step())break}const e=cevt();startGame(e.o,'col');ovHide();g.s=[28,14];g.st=Z();g.w=true});await wait(500);
await pg.evaluate(()=>{fieldWalk()});await wait(1500);
const r=await pg.evaluate(()=>{const o=LR.O.find(x=>x.k=='fohc');if(!o)return 'no hc';LR.cur=o;fwHc(o);const a=ov.innerText;fwHcA(2);return a.slice(0,80)+' | '+ov.innerText.slice(0,160)+' | trv '+JSON.stringify(S.trv)});console.log(r);await pg.screenshot({path:'/home/claude/real/bw/hc.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
