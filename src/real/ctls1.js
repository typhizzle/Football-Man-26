// CONTROLLER ON THE TITLE SCREEN (Tyler 2026-11-17): the highlight starts on your last-used save slot and one X/✕ press loads it (it used to start on the event button above the list).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({w:1366,h:768});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const o={};try{
 const mk=id=>({id,connected:true,buttons:Array.from({length:17},()=>({pressed:false,value:0})),axes:[0,0,0,0]});let PAD=mk('DualSense Wireless Controller (STANDARD GAMEPAD Vendor: 054c)');navigator.getGamepads=()=>[PAD];
 const press=i=>{PAD.buttons[i]={pressed:true,value:1};ctlStep();PAD.buttons[i]={pressed:false,value:0};ctlStep()};
 S=await readCode(j);SLOT=1;save();menuMain();o.btns=[...ui.querySelectorAll('button')].slice(0,4).map(b=>b.textContent.slice(0,30));
 CTL.sel=null;press(5);o.sel1=CTL.sel&&CTL.sel.textContent.slice(0,30);
 S=null;o.trace=[];for(let k=0;k<4;k++){press(0);o.trace.push([k,CTL.sel&&CTL.sel.textContent.slice(0,14),ui.innerText.slice(0,18).replace(/\n/g,' '),typeof LR!=='undefined'&&!!LR,S&&S.name])}
 o.after=ui.innerText.slice(0,80);o.inHub=!/FOOTBALL\s*MAN/.test(ui.innerText.slice(0,40));o.ok=/^Slot 1/.test(o.sel1||'')&&!!(S&&S.name);
 }catch(e){o.err=e.message}return o},j);console.log(JSON.stringify(r));await b.close()})();
