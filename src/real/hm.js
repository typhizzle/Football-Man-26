const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
await pg.evaluate(j=>{SLOT=1;S=mig(JSON.parse(j));famEns();homeWalk()},sj);await wait(1500);await pg.screenshot({path:'/home/claude/real/bw/home1.png'});
const r=await pg.evaluate(()=>{const o=LR.O.map(x=>x.k).join(',');hmAct(LR.O.find(x=>x.k=='hbed'));const t=ov.innerText.slice(0,60);hmExit(1);S.cash=5e7;S.stage='pro';hzMove('mansion');['tv3','gm2','gy2','pool','tr','heli','th'].forEach(i=>{S.hzi=S.hzi||[];S.hzi.push(i)});S.gf.home=1;homeWalk();return o+' | '+t+' | '+LR.O.map(x=>x.k).join(',')});console.log(r);await wait(1500);await pg.screenshot({path:'/home/claude/real/bw/home2.png'});
const r2=await pg.evaluate(async()=>{hmExit(1);S.stage='col';phoneV();phMsgs();const P=phEns();phThread(0);const c=P.c[0];document.querySelector('#phin').value='hey mom how are you';await phSend();return P.c.map(x=>x.n).join(', ')+' || '+JSON.stringify(c.th)});console.log(r2);
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
