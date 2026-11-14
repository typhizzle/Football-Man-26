// in-game QB: ready, aim (cocked), throw sequence; side camera + real game camera
const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,tag=process.argv[4]||'p',vari=process.argv[5]||'over',camMode=process.argv[6]||'side';const {b,pg,errs}=await H.open({w:W,h:Hh});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450));hut();await new Promise(r=>setTimeout(r,700));g.paused=1});
if(camMode=='side')await pg.evaluate(()=>{cv.style.opacity=0;hud.style.opacity=0;window.camGame=(qq,qx,por)=>{const z=-qq.y;cm.position.set(qx+9,2.0,z-1.2);cm.lookAt(qx,1.6,z-1.2);return por?50:38}});
if(camMode=='lside')await pg.evaluate(()=>{cv.style.opacity=0;hud.style.opacity=0;window.camGame=(qq,qx,por)=>{const z=-qq.y;cm.position.set(qx-9,2.0,z-1.2);cm.lookAt(qx,1.6,z-1.2);return por?50:38}});
if(camMode=='front')await pg.evaluate(()=>{cv.style.opacity=0;hud.style.opacity=0;window.camGame=(qq,qx,por)=>{const z=-qq.y;cm.position.set(qx+1.5,2.3,z-8);cm.lookAt(qx,1.7,z-.5);return por?50:34}});
if(camMode=='game')await pg.evaluate(()=>{cv.style.opacity=0;hud.style.opacity=0});
if(camMode=='flick')await pg.evaluate(()=>{cv.style.opacity=0;hud.style.opacity=0;CAMI=2;FLK=1;LY=0;LP=0});
if(camMode=='flickR')await pg.evaluate(()=>{cv.style.opacity=0;hud.style.opacity=0;CAMI=2;FLK=2;LY=0;LP=0});
const shot=async n=>{await wait(380);await pg.screenshot({path:`/home/claude/real/thr/g_${tag}_${vari}_${camMode}_${n}.png`})};
// ready (ball at the chest)
await pg.evaluate(()=>{const P=g.pl;P.t=1.2});await shot('a_ready');
// aiming: pulled back halfway, then fully
const W2=W,H2=Hh;
await pg.evaluate(()=>{const P=g.pl,w=P.wr[1];aim={id:9,ox:200,oy:700,px:0,py:-Math.min(W,H)*.18,t:[P.qb.x,P.qb.y+20]}});await shot('b_aimhalf');
await pg.evaluate(()=>{const P=g.pl,w=P.wr[1];aim={id:9,ox:200,oy:700,px:0,py:-Math.min(W,H)*.36,t:[P.qb.x,P.qb.y+20]}});await shot('c_aimfull');
// throw
await pg.evaluate((vari)=>{const P=g.pl,w=P.wr[1],q=P.qb,m=q.m;if(vari!='over'){aim=null;m.ck=0}const tgt=aim&&aim.t?aim.t:[q.x,q.y+20];aim=null;doThrow(w,tgt[0],tgt[1]);
 // force the throw type for the test
 m.twid=P.tw;const a=P.air;m.tg=[a.lx,a.ly];m.k0=Float32Array.from(m.qk);m.tv=vari;const V=QSQ[vari];m.seq=V.s(m.k0);m.relT=V.rel*Math.min(1,.45*a.T/V.rel);m.relS=V.rel;m.tsc=m.relT/V.rel;m.relDone=0;window.__t0=P.t},vari);
const us=[.02,.05,.08,.11,.15,.2,.28,.4,.6,.9];
for(const u of us){await pg.evaluate(u=>{const P=g.pl;P.t=window.__t0+u;if(P.air)P.air.t=u},u);await shot('d_'+u.toFixed(2))}
console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
