const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
const ev=async(f,...a)=>{try{return await pg.evaluate(f,...a)}catch(e){return 'ERR '+e.stack.slice(0,400)}};
console.log(await ev(async j=>{SLOT=1;S=mig(JSON.parse(j));S.capt=null;startGame0(1,'reg');await new Promise(r=>setTimeout(r,600));g.clk=0;g.tossD=0;gStartGo();return ov.innerText.slice(0,200)},sj));
await wait(1200);await pg.screenshot({path:'bw/toss1.png'});
console.log(await ev(()=>{const b=[...document.querySelectorAll('#ov button')][0];b.click();return 'called'}));
await wait(700);await pg.screenshot({path:'bw/toss2.png'});await wait(3200);
console.log(await ev(()=>ov.innerText.slice(0,160)));
console.log(await ev(()=>{const b=[...document.querySelectorAll('#ov button')][0];b.click();return 'TSG='+!!TSG+' ph='+g.ph+' '+ov.innerText.slice(0,80)}));
// not-captain path
console.log(await ev(()=>{S.capt={k:(S.stage||'hs')+yrN(),n:'Brock Reese',me:false,pos:'WR',why:'seniority'};ovHide();tossBuild();gToss();return ov.innerText.slice(0,200)}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
