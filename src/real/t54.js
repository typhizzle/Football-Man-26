const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
const ev=async(f,...a)=>{try{return await pg.evaluate(f,...a)}catch(e){return 'ERR '+e.stack.slice(0,400)}};
console.log(await ev(j=>{SLOT=1;S=mig(JSON.parse(j));famEns();homeWalk();return LR.O.map(o=>o.k).join(',')},sj));
await wait(1500);await pg.screenshot({path:'bw/gar1.png'});
await ev(()=>{LR.p.z-=4;LR.p.x=-1.5;return 1});await wait(1500);await pg.screenshot({path:'bw/gar2.png'});
// buying a house through the in-game Yes/No
console.log(await ev(()=>{hmExit(1);S.cash=5e7;homeV();return [...document.querySelectorAll('#ui button')].filter(b=>/house1/.test(b.getAttribute('onclick')||'')).length}));
await pg.evaluate(()=>{const b=[...document.querySelectorAll('#ui button')].find(b=>/hzMove\('house1'\)/.test(b.getAttribute('onclick')||''));b.click()});await wait(200);
console.log(await ev(()=>ov.innerText.slice(0,100)));
await pg.evaluate(()=>{[...document.querySelectorAll('#ov button')].find(b=>b.textContent=='Yes').click()});await wait(200);
console.log(await ev(()=>'hz='+S.hz));
console.log(await ev(()=>{homeWalk();return LR.O.map(o=>o.k).join(',')}));await wait(1500);await pg.screenshot({path:'bw/house1.png'});
// family save
await ev(()=>{hmExit(1);S.fam.locked=0;S.fam.mode='random';famEd()});
await pg.evaluate(()=>{document.querySelector('#fat').value='dad';document.querySelector('button[onclick="famSave()"]').click()});await wait(200);
console.log(await ev(()=>ov.innerText.slice(0,80)));
await pg.evaluate(()=>{[...document.querySelectorAll('#ov button')].find(b=>b.textContent=='Yes').click()});await wait(200);
console.log(await ev(()=>'fam locked='+S.fam.locked+' mode='+S.fam.mode+' ath='+S.fam.ath+' | '+ui.innerText.slice(0,40)));
// invites on the player menu + pot mcgee studio
console.log(await ev(()=>{S.spwk=null;spWeek();S.spe.L=[{k:'pot',n:'The Pot McGee Show',d:'x'}];S.spe.done=[];hub();return [...document.querySelectorAll('#ui button')].filter(b=>/Invite:/.test(b.textContent)).map(b=>b.textContent).join('|')}));
console.log(await ev(()=>{spEv(0);const t=ov.innerText;spEv2(0,0);return t.replace(/\n/g,' ')+' | '+LR.O.map(o=>o.k).join(',')}));
await wait(1500);await pg.screenshot({path:'bw/pot1.png'});
console.log(await ev(()=>{lrAct(LR.O.find(o=>o.k=='ppot'));const a=ov.innerText.slice(0,60);ovHide();potShow();potAns('funny');return a+' || '+ov.innerText.slice(0,100)}));
console.log(await ev(()=>{ovHide();evExit();return ui.innerText.slice(0,40)}));
// celebrity friends + dating
console.log(await ev(()=>{S.gf=null;S.cf={tswiff:30,islice:60};let r=[];celAsk('tswiff');r.push(ov.innerText.slice(0,120));S.cask={};S.cf.islice=90;S.pop=100;let n=0;for(let i=0;i<30&&!S.gf;i++){S.cask={};celAsk('islice');n++}r.push('tries '+n+' gf='+(S.gf&&S.gf.n)+' team='+(S.gf&&gfTeamTxt(S.gf)));spV();r.push(/Celebrity friends/.test(ui.innerText));return r.join(' || ')}));
// captain
console.log(await ev(()=>JSON.stringify(captEns())));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
