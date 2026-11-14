// watch mode logic: step the play clock by hand (rendering is slow here); tackler distance at the whistle, kick timelines + a few frames
const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844;const {b,pg,errs}=await H.open({w:W,h:Hh});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');await new Promise(r=>setTimeout(r,500));
 window.__log=[];const we=wEnd;window.wEnd=function(txt,k){const P=g.pl,c=P&&P.car;window.__log.push({txt,k,e:P&&P.e&&P.e.k,gn:P&&P.e&&P.e.gn,t:+W_.t.toFixed(2),wtkD:P&&P.wTk&&c?+Math.hypot(P.wTk.x-c.x,P.wTk.y-c.y).toFixed(2):null,sp:c&&+c.sp.toFixed(1),tkr:P&&P.tkr&&c?+Math.hypot(P.tkr.x-c.x,P.tkr.y-c.y).toFixed(2):null,wtk:!!(P&&P.wTk),car:c?[+c.x.toFixed(1),+c.y.toFixed(1)]:null,endY:P&&P.endY});return we(txt,k)};
 const wl=wLand;window.wLand=function(P,a,w){const k=P.wf;const r=wl(P,a,w);if(k=='int'){const d=P.car;window.__log.push({int:1,dist:d?+Math.hypot(d.x-a.lx,d.y-a.ly).toFixed(2):null})}return r};
 g.r={pts:3,sec:600,next:30,res:'test',pl:[{k:'run',gn:38,y0:30,dn:1,tg:10},{k:'run',gn:-3,y0:68,dn:1,tg:10},{k:'pass',gn:31,y0:65,dn:2,tg:13},{k:'int',gn:0,y0:30,dn:3,tg:10},{k:'run',gn:6,y0:30,dn:1,tg:10},{k:'fg',ok:true,y0:72,dn:4,tg:3},{k:'fg',ok:false,y0:68,dn:4,tg:3},{k:'punt',y0:38,net:43,dn:4,tg:8}]};watchO();g.paused=1});
const shots=[];
for(let s=0;s<3000;s++){const st=await pg.evaluate(()=>{for(let j=0;j<6;j++){if(g.ph=='watch')wTick(1/60);else if(g.ph=='wdead'){g.dt-=1/60;if(g.dt<=0)wNext()}else break}return{i:W_?W_.i:-1,t:W_?+W_.t.toFixed(2):0,k:g.pl&&g.pl.e&&g.pl.e.k,ph:g.ph,msg:g.msg,wb:g.pl&&g.pl.wb}});
 if(!W_ok(st))break;
 if((st.k=='fg'||st.k=='punt')&&st.ph=='watch'){for(const x of [0.3,0.7,1.1,1.5,2.0,2.6]){const n=`k${st.i}_${st.k}_${x.toFixed(1)}`;if(Math.abs(st.t-x)<.06&&!shots.includes(n)){shots.push(n);await pg.evaluate(()=>{const P=g.pl;if(P){cam=(P.fy!=null?P.fy:(P.car||P.qb).y)+3}draw();draw()});await wait(200);await pg.screenshot({path:`/home/claude/real/thr/w_${W}_${n}.png`});console.log(n,JSON.stringify(st.wb),st.msg)}}}}
function W_ok(st){return st.ph=='watch'||st.ph=='wdead'}
const log=await pg.evaluate(()=>window.__log);log.forEach(x=>console.log(JSON.stringify(x)));console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
