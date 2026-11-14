const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:800,h:450});const wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(1500);await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'))},C.DRV);
const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
console.log(await pg.evaluate(()=>{SLOT=1;newC();start();let n=0;while(n++<3000&&S.stage!='col'){if(!step())break}lroom();return 'mates costumes: '+LR.O.filter(o=>o.cos).map(o=>o.n+' '+o.cos).join(', ')}));
for(const [k,yw] of [['a',0],['b',Math.PI],['c',Math.PI/2]]){await pg.evaluate(yw=>{LR.p.x=0;LR.p.z=1;LR.yaw=yw;LR.zoom=2.2},yw);await wait(900);await pg.screenshot({path:SP+'hwlock'+k+'.png'})}
console.log(await pg.evaluate(()=>{lrExit&&lrExit();try{play()}catch(e){return 'play err '+e.message}return 'g '+!!g+' o '+(g&&g.o&&g.o.n)+' oi '+(g&&g.oi)}));
console.log(await pg.evaluate(()=>{try{ovHide();g.ph='ovr';g.o=g.o||S.T[g.oi];g.s=[28,24];g.w=1;fieldWalk();const o=LR.O.find(x=>x.k=='fopp');window._d=[];for(let i=0;i<200;i++)_d.push(jsDecide(o).yes);const yes=_d.filter(Boolean).length;
 // force a yes
 const _r=jsDecide;jsDecide=()=>({yes:true,line:'Good game. Yeah, let\'s swap.'});fwOpp(2);jsDecide=_r;return 'yes-rate '+yes/200+' jsw '+JSON.stringify(S.jsw)+' js '+!!LR.js}catch(e){return 'ERR '+e.stack.slice(0,400)}}));
for(const t of [1.1,1.6,2.1,3.5]){await pg.evaluate(t=>{const L=LR;if(L.js){const d=t-L.js.t;if(d>0)lrTick(d)}},t);if(t<3){await pg.evaluate(()=>ovHide());await wait(700);await pg.screenshot({path:SP+'js'+t+'.png'})}}
console.log(await pg.evaluate(()=>'after: js '+!!LR.js+' ov '+(ov.style.display)+' '+ov.innerText.slice(0,200)));
console.log(await pg.evaluate(()=>{ovHide();lrExit();wardV('cas','');const t=ui.innerText;const btn=[...ui.querySelectorAll('button')].find(b=>/jsw0/.test(b.getAttribute('onclick')||''));btn&&btn.click();return t.slice(0,600)+' | worn '+JSON.stringify(S.wear)}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,6));await b.close()})();
