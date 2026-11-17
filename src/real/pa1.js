// Placement & accuracy passing on a controller (Tyler's spec + 2026-11-16 "L1 does high throw ... LT low").
const H=require('/home/claude/real/h.js'),fs=require('fs');const sim=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PA_FILE});
const out=await pg.evaluate(async(sim)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};save=()=>{};S=mig(JSON.parse(sim));S.cpm='meter';/* 2026-11-17: tap is the default; this tests the meter mode */
 const mk=id=>({id,connected:true,buttons:Array.from({length:17},()=>({pressed:false,value:0})),axes:[0,0,0,0]});let PAD=mk('Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e)');navigator.getGamepads=()=>[PAD];
 const B=(i,v)=>{PAD.buttons[i]={pressed:v,value:v?1:0}};
 const su=()=>{startGame0(1,'reg');ovHide();let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});g.ph='pre';g.y=40;setup(0);snap(pp[0],pp[1]);for(let k=0;k<6;k++){try{upd(.03)}catch(e){}}PA={i:-1};CTL.prev=[];CTL.mode='pad';return g.ph==='live'};
 // one throw: hold button bi for m of the meter, with extra buttons/stick, then release
 const thr=(bi,m,ex)=>{if(!su())return null;ex=ex||{};const P=g.pl,q=P.qb,w=ctlRecv()[CTL_RB.indexOf(bi)];const v=16+S.q.pow*.1,base=Math.hypot(w.x-q.x,w.y-q.y)/v;
  B(bi,1);(ex.b||[]).forEach(x=>B(x,1));PAD.axes=ex.ax||[0,0,0,0];ctlStep();if(PA.i<0)return {noHold:1};PA.t0=performance.now()-m*1000*PAFULL;ctlStep();
  if(ex.draw){try{draw()}catch(e){return {drawErr:e.message}}}
  B(bi,0);(ex.b||[]).forEach(x=>B(x,0));ctlStep();PAD.axes=[0,0,0,0];const A=P.air;return A?{kind:A.kind,hl:A.hl,T:A.T,base,ly:A.ly,lx:A.lx,wy:w.y,inWin:g.paLast&&g.paLast.inWin}:{none:1,ph:g.ph}};
 const L=thr(0,.15),Tt=thr(0,.5),Bu=thr(0,.99);o.A_kinds=[L&&L.kind,Tt&&Tt.kind,Bu&&Bu.kind].join(',');o.A_ok=o.A_kinds==='lob,touch,bullet';
 o.A_speed=L&&Bu?+(L.T/L.base).toFixed(2)+'/'+(Bu.T/Bu.base).toFixed(2):'';o.A_lobFloats=!!L&&!!Bu&&L.T/L.base>Bu.T/Bu.base*1.4;
 // B: the window: full bullet = in the blue; just into the bullet zone = off (unless the window covers it)
 const f=paWin();const early=thr(0,.71);o.B_win=+f.toFixed(2);o.B_inFull=!!Bu&&Bu.inWin===true;o.B_offEarly=!!early&&early.inWin===false;
 // C: accuracy matters: same throw 40x in the window vs off it: average miss from the planned spot
 const miss=(m)=>{let s=0,n=0;for(let i=0;i<40;i++){const r=thr(0,m);if(!r||r.none)continue;const P=g.pl;s+=Math.hypot(r.lx-P.air.lx,0)||0;n++}return n};
 const err=(m)=>{let s=0,n=0;const sv=S.q.acc;for(let i=0;i<40;i++){if(!su())continue;const P=g.pl,q=P.qb,w=ctlRecv()[0];const v=16+S.q.pow*.1;let T=Math.hypot(w.x-q.x,w.y-q.y)/v;for(let k=0;k<3;k++)T=Math.hypot(w.x+(w.vx||0)*T-q.x,w.y+(w.vy||0)*T-q.y)/v;const ex=w.x+(w.vx||0)*T,ey=w.y+(w.vy||0)*T;
  B(0,1);ctlStep();PA.t0=performance.now()-m*1000;ctlStep();B(0,0);ctlStep();const A=P.air;if(!A)continue;s+=Math.hypot(A.lx-ex,A.ly-ey);n++}return n?s/n:null};
 S.q.acc=70;const eIn=err(.99),eOut=err(.71);const eOver=err(1.25);o.C_err=[eIn&&+eIn.toFixed(2),eOut&&+eOut.toFixed(2),eOver&&+eOver.toFixed(2)];o.H_overWild=eOver!=null&&eIn!=null&&eOver>eIn*1.8&&eOver>eOut;o.C_windowMatters=eIn!=null&&eOut!=null&&eOut>eIn*1.3;
 // D: the stick places the ball: up = deeper, down = shorter
 const N=thr(0,.5),Up=thr(0,.5,{ax:[0,-1,0,0]}),Dn=thr(0,.5,{ax:[0,1,0,0]});o.D_place=[N&&+(N.ly-N.wy).toFixed(1),Up&&+(Up.ly-Up.wy).toFixed(1),Dn&&+(Dn.ly-Dn.wy).toFixed(1)];o.D_ok=!!(N&&Up&&Dn)&&Up.ly-Up.wy>N.ly-N.wy+1&&Dn.ly-Dn.wy<N.ly-N.wy-1;
 // E: LB = high, LT = low
 const Hi=thr(0,.5,{b:[4]}),Lo=thr(0,.5,{b:[6]});o.E_hl=[Hi&&Hi.hl,Lo&&Lo.hl].join(',');o.E_ok=o.E_hl==='high,low';
 // F: hold too long: it throws by itself (bullet); the meter draws without errors; the guide says it
 if(su()){B(0,1);ctlStep();PA.t0=performance.now()-1500;ctlStep();o.F_auto=!!g.pl.air&&g.pl.air.kind==='bullet';B(0,0);ctlStep()}
 const Dw=thr(0,.6,{draw:1});o.F_draw=!!Dw&&!Dw.drawErr;
 su();ctlLegend();o.F_legend=/LB high/.test(document.getElementById('ctlleg').textContent)&&/LT low/.test(document.getElementById('ctlleg').textContent);
 // G: touch throwing unchanged (direct doThrow still works the same, no meter involved)
 su();const P=g.pl;doThrow(P.wr[0],P.wr[0].x,P.wr[0].y+5);o.G_touch=!!P.air&&!P.air.kind;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},sim);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
