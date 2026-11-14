const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open();const wait=ms=>new Promise(r=>setTimeout(r,ms));
const r1=await pg.evaluate(()=>{SLOT=1;newC();start();S.name='Jameis Dubston';S.stars=4;let n=0;while(n++<5){const e=evt();if(e.t=='reg')simUser();else play()}
 S.wk=7;S.po={L:[0,5],r:3,out:false,q:true,sd:{0:1,5:2},hist:[[],[],[]]};startGame(5,'po');return {title:g.title,on:S.gp.on}});
await wait(500);
const r2=await pg.evaluate(()=>{Object.assign(g.st,{att:30,cmp:21,yds:280,td:3,int:0,sk:1});g.s=[28,21];g.q4d=7;g.clk=3600;endGame();return{fw:!!(LR&&LR.field),gb:!!(LR&&LR.gb),champ:!!(LR&&LR.champ)}});
await wait(1500);await pg.evaluate(()=>{if(LR&&LR.gb)LR.gb.t=7.05});await wait(2500);
const r3=await pg.evaluate(()=>{ovHide();const st=LR&&LR.sb?LR.sb.n:null;for(let i=0;i<7;i++)sbAdd();return{gbDone:!LR.gb,stage:LR.sb.n,ready:!!LR.st}});
await pg.evaluate(()=>{csStart();LR.cs.t=17.5});await wait(1200);
const r4=await pg.evaluate(()=>{ovHide();fwExit();ovHide();const G=S.gp;return{stage:S.stage,yr:S.yr,sum:!!S.sum,aw:S.sum&&S.sum.aw,hl:G.hl.slice(0,5).map(h=>h.h),hi:G.hi.slice(0,3).map(h=>h.h),segs:G.cy?G.cy.segs.map(s=>s.sh+':'+(s.tt||'')):[],teaser:HM}});
console.log(JSON.stringify({r1,r2,r3,r4},null,1));console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
