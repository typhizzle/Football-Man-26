// in-game QB from the ready pose: quick / side / run-throw, plus snap + handoff. args: W H tag mode cam
const H=require('./h.js');(async()=>{const W=+process.argv[2]||700,Hh=+process.argv[3]||700,tag=process.argv[4]||'sq',mode=process.argv[5]||'quick',camMode=process.argv[6]||'side';const {b,pg,errs}=await H.open({w:W,h:Hh});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const play=mode=='hand'?['Run',0]:['Short',0];
await pg.evaluate(async(play)=>{SLOT=1;newC();start();startGame0(1,'reg');g.tab=play[0];g.sel=play;g.stage='line';pui();await new Promise(r=>setTimeout(r,450));g.paused=1},play);
await pg.evaluate((camMode)=>{cv.style.opacity=0;hud.style.opacity=0;if(camMode=='side')window.camGame=(qq,qx,por)=>{const z=-qq.y;cm.position.set(qx+9,2.0,z-1.2);cm.lookAt(qx,1.6,z-1.2);return por?50:38};
 if(camMode=='front')window.camGame=(qq,qx,por)=>{const z=-qq.y;cm.position.set(qx+2,2.4,z-9);cm.lookAt(qx,1.6,z-.5);return por?50:38};
 if(camMode=='flick'){CAMI=2;FLK=1;LY=0;LP=0}},camMode);
const shot=async n=>{await wait(380);await pg.screenshot({path:`/home/claude/real/thr/h_${tag}_${mode}_${camMode}_${n}.png`})};
if(mode=='hand'){// pre-snap, snap, handoff
 await shot('a_pre');await pg.evaluate(()=>{g.paused=0;hut()});await wait(30);await pg.evaluate(()=>{g.paused=1;window.__t0=g.pl.t});
 for(const u of [.05,.11,.18,.3,.42,.5,.6,.75]){await pg.evaluate(u=>{const P=g.pl;P.t=u;if(P.call.t=='run'&&!P.handed&&P.t>(P.hd||.5)){P.handed=1;P.car=P.rb}},u);await shot('b_'+u.toFixed(2))}
}else{
 await pg.evaluate(()=>{g.paused=0;hut()});await wait(60);await pg.evaluate(()=>{g.paused=1;g.pl.t=1.2});
 if(mode=='run')await pg.evaluate(()=>{const q=g.pl.qb;q.vx=4.5;q.vy=.5});
 await shot('a_hold');
 await pg.evaluate((mode)=>{const P=g.pl,q=P.qb,m=q.m,w=P.wr[1];m.ck=0;aim=null;doThrow(w,q.x+(mode=='run'?-3:0),q.y+18);
  m.twid=P.tw;const a=P.air;m.tg=[a.lx,a.ly];m.k0=Float32Array.from(m.qk);m.tv=mode;const V=QSQ[mode];m.seq=V.s(m.k0);m.relS=V.rel;m.relT=V.rel*Math.min(1,.45*a.T/V.rel);m.tsc=m.relT/V.rel;m.relDone=0;window.__t0=P.t},mode);
 for(const u of [.03,.07,.1,.13,.16,.19,.24,.32,.45,.7]){await pg.evaluate(u=>{const P=g.pl;P.t=window.__t0+u;if(P.air)P.air.t=u},u);await shot('d_'+u.toFixed(2))}}
console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
