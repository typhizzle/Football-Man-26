// Controller phase 1 (Tyler 2026-11-14 spec). A simulated gamepad drives the real game.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({w:1366,h:768});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const mk=id=>({id,connected:true,buttons:Array.from({length:17},()=>({pressed:false,value:0})),axes:[0,0,0,0]});let PAD=mk('Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e)');
 navigator.getGamepads=()=>[PAD];
 const press=i=>{PAD.buttons[i]={pressed:true,value:1};ctlStep();PAD.buttons[i]={pressed:false,value:0};ctlStep()};
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';hub();
 ctlStep();press(13);out.A_kind=CTL.kind;out.A_xboxIsXbox=CTL.kind==='xbox';out.A_padMode=document.body.classList.contains('ctlpad');out.A_highlight=!!(CTL.sel&&CTL.sel.isConnected&&CTL.sel.classList.contains('ctlf'));
 const first=CTL.sel;press(13);press(13);out.B_movedDown=CTL.sel!==first&&CTL.sel.getBoundingClientRect().top>=first.getBoundingClientRect().top;
 // A opens the highlighted button: put the highlight on Settings, press A
 const set=[...ui.querySelectorAll('button')].find(x=>/^Settings$/.test(x.textContent.trim()));ctlSet(set);press(0);out.C_aOpensSettings=/Settings/i.test((ui.querySelector('h2')||{}).textContent||'');
 press(1);out.D_bGoesBack=!!ui.querySelector('button')&&!/^Settings/i.test((ui.querySelector('h2')||{}).textContent||'');
 // a box-score overlay: B closes it
 const G=S.gr||{},w0=Object.keys(G)[0],gm=G[w0][0];bxOpen(+w0,gm[0],gm[1]);out.E_overlayOpen=ov.style.display!=='none';ctlStep();out.E_highlightInOverlay=!!(CTL.sel&&ov.contains(CTL.sel));press(1);out.E_bClosesOverlay=ov.style.display==='none'||!ov.innerHTML;
 // keyboard takes over again
 CTL.lastPad=performance.now()-11000;/* 2026-11-16: the keyboard takes over once the controller has been quiet 10 s */dispatchEvent(new KeyboardEvent('keydown',{key:'x'}));out.F_keyboardTakesOver=CTL.mode==='kbm'&&!document.querySelector('.ctlf');
 // PlayStation
 PAD=mk('DualSense Wireless Controller (STANDARD GAMEPAD Vendor: 054c)');press(13);out.G_ps=CTL.kind==='ps'&&ctlGlyph(0)==='✕'&&ctlGlyph(3)==='△';
 // gameplay: left stick moves, A throws to receiver A
 startGame0(1,'reg');let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);snap(pp[0],pp[1]);ui.style.display='none';ov.style.display='none';
 for(let k=0;k<30;k++){try{upd(.03)}catch(e){}}
 PAD.axes=[.9,0,0,0];ctlStep();out.H_stickMoves=Math.abs(kb.x-.9)<.01;PAD.axes=[0,0,0,0];ctlStep();out.H_stickReleases=kb.x===0;
 const want=ctlRecv()[0];press(0);out.I_throwToA=!!(g.pl.air&&g.pl.air.tgt===want);
 try{ov.style.display='none';ui.style.display='block';hub();if(typeof lroom==='function'){lroom();out.J_inWalk=!!(LR&&document.getElementById('lrw').style.display==='block');PAD.axes=[0,-.8,0,0];ctlStep();out.J_walks=!!(LR&&LR.joy&&LR.joy.z<-.5);PAD.axes=[0,0,.8,0];const y0=LR.yaw||0;ctlStep();out.J_looks=(LR.yaw||0)!==y0;PAD.axes=[0,0,0,0];ctlStep();out.J_stops=!LR.joy}}catch(e){out.J_err=e.message}
 // RB / R1 throws to the 5th receiver (the back)
 try{startGame0(1,'reg');let pq=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pq&&p[1]=='pass')pq=[c,i]});g.ph='pre';g.y=25;setup(0);snap(pq[0],pq[1]);ui.style.display='none';ov.style.display='none';lrExit&&0;for(let k=0;k<30;k++){try{upd(.03)}catch(e){}}const w5=ctlRecv()[4];if(w5){press(5);out.K_rbThrows=!!(g.pl.air&&g.pl.air.tgt===w5)}else out.K_rbThrows='no 5th receiver'}catch(e){out.K_err=e.message}
 out.err2=null;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
r.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(r,null,1));await b.close()})();
