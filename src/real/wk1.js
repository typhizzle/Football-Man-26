// Tyler 2026-11-15: "make sure you can walk around in the walkroom your house events, other stuff as well, the field ... everything you
// can press A to select ... runs quite well on Mac ... right joystick should move the camera around like a normal game".
// A simulated pad (named the way Mac Safari names them) walks every walkable place, turns the camera with the right stick (push right =
// turn right), presses A next to someone (it must do something), and B leaves.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));save=()=>{};
 const PAD={id:'45e-b13-Xbox Wireless Controller',mapping:'standard',connected:true,buttons:Array.from({length:17},()=>({pressed:false,value:0})),axes:[0,0,0,0]};navigator.getGamepads=()=>[PAD];
 const press=i=>{PAD.buttons[i]={pressed:true,value:1};ctlStep();PAD.buttons[i]={pressed:false,value:0};ctlStep()};
 const V=()=>{const d=new T3.Vector3();cm.getWorldDirection(d);return d};
 o.A_macXbox=ctlTypeOf('45e-b13-Xbox Wireless Controller')==='xbox';o.A_macPS=ctlTypeOf('54c-ce6-DualSense Wireless Controller')==='ps'&&ctlTypeOf('54c-9cc-Wireless Controller')==='ps';o.A_chromeMac=ctlTypeOf('DualSense Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 0ce6)')==='ps';
 let acts=0;const _a=lrAct;lrAct=function(){acts++;return _a.apply(this,arguments)};
 const scenes={locker:()=>lroom(),home:()=>homeWalk(),field:()=>{startGame0(1,'reg');ovHide();fieldWalk()},grad:()=>gradWalk('col'),party:()=>evWalk('goat'),gala:()=>evWalk('gala'),celeb:()=>celRoom(),studio:()=>studioWalk(),pot:()=>potWalk()};
 const bad=[];o.places=0;
 for(const k in scenes){try{ovHide();ui.style.display='block';hub();scenes[k]();await new Promise(r=>setTimeout(r,250));ovHide();ctlStep();press(13);
  if(!(LR&&LR.pm&&document.getElementById('lrw').style.display==='block'&&!ctlRoot())){bad.push(k+': not walkable');continue}
  const p0={x:LR.p.x,z:LR.p.z};PAD.axes=[0,-.9,0,0];for(let i=0;i<30;i++){ctlStep();lrTick(1/30)}PAD.axes=[0,0,0,0];ctlStep();if(Math.hypot(LR.p.x-p0.x,LR.p.z-p0.z)<2)bad.push(k+': stick does not walk');
  const d0=V();PAD.axes=[0,0,.9,0];for(let i=0;i<15;i++){ctlStep();try{lrCam&&lrCam()}catch(e){}}PAD.axes=[0,0,0,0];ctlStep();if(!((LR.yaw||0)<0||(LR.yaw||0)>0))bad.push(k+': right stick does not turn');
  const tg=(LR.O||[]).find(x=>x.m&&x.k)||(LR.O||[]).find(x=>x.k&&x.k!='eexit');if(tg){LR.p.x=tg.x+1.4;LR.p.z=tg.z;lrTick(1/30);const a0=acts;press(0);for(let i=0;i<30;i++)lrTick(1/30);if(acts===a0)bad.push(k+': A does nothing next to '+tg.k)}
  o.places++}catch(e){bad.push(k+': '+e.message.slice(0,80))}}
 o.B_allWalkable=bad.length===0;o.problems=bad.join(' | ');
 // C: right stick: push right = turn right, on a walk and on the sideline
 const sl=ms=>new Promise(r=>setTimeout(r,ms));const turn=async()=>{const d0=V();PAD.axes=[0,0,.9,0];await sl(1200);PAD.axes=[0,0,0,0];await sl(300);const d1=V();return d0.x*d1.z-d0.z*d1.x};
 ovHide();lroom();await sl(500);o.C_walkTurnsRight=(await turn())>0.05;
 startGame0(1,'reg');ovHide();g.clk=600;g.r={pts:0,next:25,sec:1140,res:'x',log:[],pl:[{k:'run',gn:4,y0:40,dn:1,tg:10,s:1140}]};g.ph='opp';watchO();await sl(500);o.C_sidelineTurnsRight=(await turn())>0.05;skipW();
 // D: first-person: before the snap the right stick looks around (right = right)
 CAMI=1;g.ph='pre';g.stage='line';g.tk=1;ovHide();const ly0=LY;PAD.axes=[0,0,.9,0];ctlStep();ctlStep();PAD.axes=[0,0,0,0];ctlStep();o.D_qbLooks=LY>ly0;CAMI=0;
 // E: B leaves a walk
 lroom();await sl(300);ctlStep();press(1);await sl(300);o.E_bLeaves=!(document.getElementById('lrw').style.display==='block')||!!ctlRoot();
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
