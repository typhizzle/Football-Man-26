const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));const sh=async n=>{await wait(250);await pg.screenshot({path:`/home/claude/real/thr/inj_${n}.png`})};const log=[];
const until=async(re,ms=20000)=>{const t0=Date.now();while(Date.now()-t0<ms){const ok=await pg.evaluate(re=>new RegExp(re).test(ov.style.display!='none'?ov.innerText:''),re);if(ok)return true;await wait(200)}return false};
const click=async re=>pg.evaluate(re=>{const b=[...ov.querySelectorAll('button')].find(x=>new RegExp(re).test(x.textContent));if(b){b.click();return b.textContent}return null},re);
await pg.evaluate(async()=>{cv.setPointerCapture=()=>{};SLOT=1;newC();start();jsave&&0;startGame0(1,'reg');g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450));hut();await new Promise(r=>setTimeout(r,1300));const P=g.pl;doThrow(P.wr[0],P.wr[0].x,P.wr[0].y+10);injSet(injMk('mj'),1)});
log.push(['overlay',await until('is hurt')]);await sh('a_overlay');
log.push(['watch',await click('Watch the rest')]);log.push(['own',await until('Your ball')]);await sh('b_own');
log.push(['watchdrive',await click('Watch drive')]);await wait(2500);log.push(await pg.evaluate(()=>({ph:g.ph,qb:g.pl&&g.pl.qb&&[g.pl.qb.nm,g.pl.qb.num],own:W_&&W_.own})));await sh('c_watch');await wait(3000);await sh('d_watch2');
log.push(['skip',await click('Skip drive')]);await wait(600);log.push(['next',await pg.evaluate(()=>ov.innerText.slice(0,120))]);
log.push(['ownwatch',await click('Watch drive')]);await wait(2500);log.push(await pg.evaluate(()=>({ph:g.ph,qb:g.pl&&g.pl.qb&&[g.pl.qb.nm,g.pl.qb.num],own:W_&&W_.own,sw:g.sw})));await sh('g_ownwatch');await wait(2500);await sh('h_ownwatch2');log.push(['skip2',await click('Skip drive')]);await wait(600);log.push(['next2',await pg.evaluate(()=>ov.innerText.slice(0,120))]);
// opponent drive: simulate it, then our next possession: sim to end
for(let i=0;i<6;i++){const t=await pg.evaluate(()=>ov.innerText);if(/Win|Loss/.test(t))break;if(/have the ball/.test(t))await click('Simulate drive');else if(/Your ball/.test(t))await click('Sim to the end');else if(/Halftime/.test(t))await click('Second half');else await wait(500);await wait(500)}
log.push(['end',await pg.evaluate(()=>({t:ov.innerText.slice(0,120),s:g.s,ph:g.ph}))]);await sh('e_end');
await click('Continue');await wait(700);await pg.evaluate(()=>{const b=[...document.querySelectorAll('#ov button')].find(x=>/OK|Continue|Next/.test(x.textContent));b&&b.click()});await wait(700);
log.push(['hub',await pg.evaluate(()=>({t:ui.innerText.slice(0,400),inj:S.inj,wk:S.wk}))]);await sh('f_hub');
console.log(JSON.stringify(log,null,1));console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
