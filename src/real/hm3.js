const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
pg.on('dialog',d=>d.accept());
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
await pg.evaluate(j=>{SLOT=1;S=mig(JSON.parse(j));famEns();homeWalk()},sj);await wait(1500);await pg.screenshot({path:'bw/h3a.png'});
console.log(await pg.evaluate(()=>{hmExit(1);S.cash=5e8;S.stage='pro';hzMove('apt');S.hzi=['tv2','gm1'];homeWalk();return S.hz}));await wait(1500);await pg.screenshot({path:'bw/h3b.png'});
console.log(await pg.evaluate(()=>{hmExit(1);hzMove('mansion');S.hzi=['tv3','gm2','gy2','pool','tr'];S.gf.home=1;homeWalk();return S.hz}));await wait(1500);await pg.screenshot({path:'bw/h3c.png'});
console.log(await pg.evaluate(()=>{LR.yaw=Math.PI;return 1}));await wait(1200);await pg.screenshot({path:'bw/h3d.png'});
console.log(await pg.evaluate(()=>{hmExit(1);hzMove('tower');homeWalk();return S.hz}));await wait(1500);await pg.screenshot({path:'bw/h3e.png'});
// gf week + phone
console.log(await pg.evaluate(()=>{hmExit(1);S.stage='col';S.gf.aff=90;let out=[];for(let i=0;i<12;i++){S.rwk=null;gfWeek()}const P=phEns(),c=P.c.find(x=>x.pers=='gf');out.push('trait '+gfTr(S.gf),'un '+phUn(),'gifts '+(S.gf.gifts||[]).length,c.th.slice(-4).map(x=>x.t).join(' | '));relV();out.push(ui.innerText.slice(ui.innerText.indexOf('What you know'),ui.innerText.indexOf('What you know')+220));hub();out.push(/new 💬/.test(ui.innerHTML)?'badge ok':'no badge');phMsgs();out.push(/● \d+ new/.test(ui.innerText)?'thread badge ok':'no tb');return out.join('\n')}));
// athlete parents
console.log(await pg.evaluate(()=>{S.fam.locked=0;S.fam.mode='random';const f0=fans(S.pop);famEd();document.querySelector('#fat').value='both';famSave();const F=S.fam;const f1=fans(S.pop);let p=0;for(let i=0;i<100;i++)p+=athP(4);return [F.ath,athN(),f0,f1,p,athTxt(F)].join(' / ')}));
// sideline looks via talk
console.log(await pg.evaluate(()=>{LR={field:1,cur:{n:'Kayla Brooks',team:'X'}};talk('gf','Kayla · X cheer squad','hi','happy',[['ok','ovHide()']]);const t=ov.innerText.slice(0,60);S.stage='pro';const pro=[],col=[];for(let i=0;i<300;i++){pro.push(gfLkRoll({n:'p'+i}))}S.stage='col';for(let i=0;i<300;i++)col.push(gfLkRoll({n:'p'+i}));const a=x=>Math.round(x.reduce((s,v)=>s+v,0)/x.length);LR=null;ovHide();return t+' || pro avg '+a(pro)+' col avg '+a(col)}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
