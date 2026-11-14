// live-game injury: overlay -> watch the rest (our drive with the backup) -> sim; and sim-to-end path
const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));const sh=async n=>{await wait(300);await pg.screenshot({path:`/home/claude/real/thr/inj_${n}.png`})};const log=[];
await pg.evaluate(async()=>{cv.setPointerCapture=()=>{};SLOT=1;newC();start();startGame0(1,'reg');g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450));hut();await new Promise(r=>setTimeout(r,1300));
 // throw it away, then get hurt on the play
 const P=g.pl;doThrow(P.wr[0],P.wr[0].x,P.wr[0].y+10);injSet(injMk('mj'),1)});
await wait(4000);await sh('a_overlay');log.push(await pg.evaluate(()=>({ov:ov.innerText.slice(0,200),ph:g.ph,inj:S.inj})));
await pg.evaluate(()=>{const b=[...ov.querySelectorAll('button')].find(x=>/Watch the rest/.test(x.textContent));b&&b.click()});await wait(800);await sh('b_own');log.push(await pg.evaluate(()=>({ov:ov.innerText.slice(0,200),ph:g.ph,injW:g.injW})));
await pg.evaluate(()=>{const b=[...ov.querySelectorAll('button')].find(x=>/Watch drive/.test(x.textContent));b&&b.click()});await wait(2500);await sh('c_watch');log.push(await pg.evaluate(()=>({ph:g.ph,qb:g.pl&&g.pl.qb&&[g.pl.qb.nm,g.pl.qb.num],own:W_&&W_.own,mine:g.pl&&g.pl.qb&&g.pl.qb.m&&g.pl.qb.m.ar})));
await wait(4000);await sh('d_watch2');
await pg.evaluate(()=>{const b=[...ov.querySelectorAll('button')].find(x=>/Skip drive/.test(x.textContent));b&&b.click()});await wait(800);await sh('e_after');log.push(await pg.evaluate(()=>({ov:ov.innerText.slice(0,160),ph:g.ph,s:g.s,clk:g.clk})));
// sim the rest from the next decision point
await pg.evaluate(()=>{const b=[...ov.querySelectorAll('button')].find(x=>/Simulate drive/.test(x.textContent));b&&b.click()});await wait(600);
log.push(await pg.evaluate(()=>({ov:ov.innerText.slice(0,160),ph:g.ph})));
await pg.evaluate(()=>{const b=[...ov.querySelectorAll('button')].find(x=>/Sim to the end|Simulate drive/.test(x.textContent));if(b&&/Sim to the end/.test(b.textContent))b.click();else injRest(1)});await wait(800);await sh('f_end');
log.push(await pg.evaluate(()=>({ov:ov.innerText.slice(0,200),ph:g.ph,s:g.s})));
await pg.evaluate(()=>{const b=[...ov.querySelectorAll('button')].find(x=>/Continue/.test(x.textContent));b&&b.click()});await wait(800);await pg.evaluate(()=>{try{ovHide()}catch(e){};const b=[...document.querySelectorAll('#ov button')];b.forEach(x=>{if(/OK|Continue/.test(x.textContent))x.click()})});await wait(800);
log.push(await pg.evaluate(()=>({hub:ui.innerText.slice(0,300),inj:S.inj,wk:S.wk})));await sh('g_hub');
// next week: injured -> sim with backup
await pg.evaluate(()=>{play()});await wait(500);log.push(await pg.evaluate(()=>({hub:ui.innerText.slice(0,260),inj:S.inj,wk:S.wk})));
console.log(JSON.stringify(log,null,1));console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
