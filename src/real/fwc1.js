// FIELD WALK WITH A CONTROLLER (Tyler 2026-11-16): Y leaves the field, X opens the game stats, A talks; the on-screen buttons show
// the controller's letters.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const o=await pg.evaluate(async(j)=>{const o={};try{S=mig(JSON.parse(j));SLOT=4;save=()=>{};startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();
 const pad={id:'Xbox Wireless Controller',connected:true,buttons:Array.from({length:17},()=>({pressed:false,value:0})),axes:[0,0,0,0]};navigator.getGamepads=()=>[pad];
 const press=async i=>{pad.buttons[i].pressed=true;ctlStep();pad.buttons[i].pressed=false;ctlStep();await new Promise(r=>setTimeout(r,100))};
 fieldWalk();await new Promise(r=>setTimeout(r,500));pad.axes=[.5,0,0,0];ctlStep();pad.axes=[0,0,0,0];ctlStep();await new Promise(r=>setTimeout(r,700));
 o.mode=CTL.mode;const lb=[...document.querySelectorAll('#lrw button')].find(x=>/locker room/i.test(x.textContent));o.A_leaveTag=!!(lb&&lb.querySelector('.cpg')&&lb.querySelector('.cpg').textContent==='Y');
 const bx=document.querySelector('.bxb');o.B_statsTag=!document.querySelector('.bxb')||!!(bx&&bx.querySelector('.cpg')&&bx.querySelector('.cpg').textContent==='X');
 let opened=0;const _bo=window.bxOpen;window.bxOpen=function(){opened=1;return _bo&&_bo.apply(this,arguments)};await press(2);o.C_xStats=opened===1||/Game stats/.test((document.getElementById('ov')||{}).innerText||'')||/Passing|box/i.test((document.getElementById('ov')||{}).innerText||'');
 try{ovHide()}catch(e){}let left=0;const _fx=window.fwExit||fwExit;try{fwExit=function(){left=1;return _fx.apply(this,arguments)}}catch(e){}await press(3);o.D_yLeave=left===1||document.getElementById('lrw').style.display!=='block';
}catch(e){o.err=e.message}return o},j);o.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(o));await b.close()})();
