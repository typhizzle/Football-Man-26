const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,tag=process.argv[4]||'p';const {b,pg,errs}=await H.open({w:W,h:Hh});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'po');g.title='State Playoffs · State Championship';g.s=[28,21];g.w=true;g.st.att=20;g.st.cmp=14;g.st.yds=220;g.st.td=3;fieldWalk(1)});
for(const T of [1,2.5,3.1,3.5,4.4,5.8,6.9]){await pg.evaluate(T=>{LR.gb.t=T-.03},T);await wait(500);await pg.evaluate(T=>{LR.gb.t=T},T);await wait(350);await pg.screenshot({path:`/home/claude/real/ch/gb${T}_${tag}.png`})}
await pg.evaluate(()=>{gbEnd();ovHide()});await wait(1500);await pg.screenshot({path:`/home/claude/real/ch/walk0_${tag}.png`});
for(let n=1;n<=7;n++){await pg.evaluate(()=>{sbAdd();LR.sb.an=null;LR.sb.P.forEach(p=>{p.position.y=0;p.scale.y=1})});}
await pg.evaluate(()=>{LR.p.x=0;LR.p.z=-50;LR.yaw=0;LR.pitch=.3;LR.cpos=null});await wait(1500);await pg.screenshot({path:`/home/claude/real/ch/stage_${tag}.png`});
const st=await pg.evaluate(()=>JSON.stringify({n:LR.sb.n,st:!!LR.st,stage:LR.O.some(o=>o.k=='fstage'),cel:LR.cel.length,hint:$('#lrh').textContent,calls:rd.info.render.calls}));console.log(st);
await pg.evaluate(()=>{csStart();LR.cs.t=8});await wait(800);await pg.screenshot({path:`/home/claude/real/ch/cer_${tag}.png`});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
