const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();const e=evt();startGame0(e.o||1,'reg');g.clk=500;g.s=[7,0];spChk('Touchdown');g.clk=1300;g.s=[7,3];spChk('Lions: Field goal');g.clk=2500;g.s=[14,3];spChk('Touchdown');g.clk=3500;g.s=[14,10];spChk('Their drive: Touchdown');g.clk=3600;g.st.att=20;g.st.cmp=13;g.st.yds=180;g.st.td=2;endGame();const d=document.querySelector('#ov details');if(d)d.open=true});
await wait(600);await pg.screenshot({path:'/home/claude/real/lr/pg1.png'});
await pg.evaluate(()=>{fieldWalk()});await wait(1500);await pg.evaluate(()=>{const o=LR.O.find(x=>x.k=='fopp');LR.p.x=o.x-3;LR.p.z=o.z+3;g.fw={};fwOpp(2)});await wait(1700);await pg.screenshot({path:'/home/claude/real/lr/js1.png'});await wait(2200);await pg.screenshot({path:'/home/claude/real/lr/js2.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
