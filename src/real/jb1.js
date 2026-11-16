// JUMP BALL (Tyler 2026-11-16): "the guy catches it and just is able to run straight to the end zone. There needs to be some kind of
// tackle animation or broken tackle animation." A deep catch with the beaten defender right on him (still in his recovery beat):
// he gets a real tackle try right away — tackled, or the receiver breaks it (with the stagger + BROKE THE TACKLE!). Never a free walk-in.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.JB_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const o=await pg.evaluate(async(j)=>{const o={n:0,tk:0,brk:0,td:0,free:0};try{S=mig(JSON.parse(j));save=()=>{};startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();
 let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});await new Promise(r=>setTimeout(r,500));
 for(let t=0;t<60;t++){g.ph='pre';g.y=40;g.dn=1;g.tg=10;setup(0);snap(pp[0],pp[1]);for(let k=0;k<40;k++){try{upd(.03)}catch(e){}}const P=g.pl;if(!P||P.air||P.car!==P.qb)continue;
  const w=P.wr[0],D=P.db[0];w.x=26;w.y=g.los+30;w.vx=0;w.vy=8;D.x=26.6;D.y=g.los+30.3;D.cd=2;D.stun=.5;P.db.slice(1).concat(P.lb).forEach(d=>{d.y=g.los+5;d.x=d.x<26?3:50});
  P.air={tgt:w,x0:P.qb.x,y0:P.qb.y,lx:w.x,ly:w.y,T:.01,t:0};const fl0=g.flash;land();if(P.car!==w)continue;o.n++;let k=0,brk=0;
  while(!P.done&&k++<300){w.vy=8;try{upd(.03)}catch(e){break}if(/BROKE THE TACKLE/.test(g.flash||''))brk=1}
  const k_=g.out&&g.out.k;if(k_==='td'&&!brk)o.free++;if(k_==='td')o.td++;if(brk)o.brk++;else if(k_!=='td')o.tk++}
 o.A_noFreeWalkIn=o.n>=20&&o.free/o.n<.1;o.B_bothHappen=o.tk>0&&o.brk>0}catch(e){o.err=e.message}return o},j);console.log(JSON.stringify(o));await b.close()})();
