const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const C=require('/home/claude/t41/ctx.js');await pg.evaluate(()=>{SLOT=1;newC();start();ovHide()});await pg.evaluate(C.DRV+';window.step=step;');
await pg.evaluate(()=>{let n=0;while(n++<40){const e=evt();if(e.t=='reg')break;step()}const e=evt();startGame(e.o,e.t);ovHide()});await wait(800);
let shot=0;for(let k=0;k<10&&shot<2;k++){await pg.evaluate(()=>{ovHide();g.y=30;g.dn=4;setup();g.los=g.y;punt()});const L=[];
 for(let i=0;i<70;i++){await wait(100);const s=await pg.evaluate(()=>g.kk&&g.kk.o?[g.kk.o.dec||0,+(g.kk.t-(g.kk.o.rs||99)).toFixed(1)]:'none');L.push(JSON.stringify(s));if(s!='none'&&s[0]==2&&s[1]>1.0&&!shot){await pg.screenshot({path:'/home/claude/real/bw/punt.png'});shot=1}if(shot==1&&s!='none'&&s[1]>2.0){await pg.screenshot({path:'/home/claude/real/bw/punt2.png'});shot=2}if(s=='none')break}console.log(L.slice(-3).join(' '))}
console.log(shot,errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
