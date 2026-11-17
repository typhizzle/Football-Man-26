// TITLE SCREEN LIST (Tyler 2026-11-17): when the save list redraws (cloud check), the highlight stays on the slot you moved to instead of jumping to the top.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({w:1366,h:768});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const o={};try{
 const mk=id=>({id,connected:true,buttons:Array.from({length:17},()=>({pressed:false,value:0})),axes:[0,0,0,0]});let PAD=mk('DualSense Wireless Controller (STANDARD GAMEPAD Vendor: 054c)');navigator.getGamepads=()=>[PAD];
 const press=i=>{PAD.buttons[i]={pressed:true,value:1};ctlStep();PAD.buttons[i]={pressed:false,value:0};ctlStep()};
 S=await readCode(j);SLOT=1;save();SLOT=2;save();SLOT=1;menuMain();CTL.sel=null;press(5);
 const s2=[...ui.querySelectorAll('button')].find(x=>/^Slot 2:/.test(x.textContent.trim()));ctlSet(s2);o.on=CTL.sel.textContent.slice(0,8);
 menuMain();press(5);o.after=CTL.sel&&CTL.sel.textContent.slice(0,8);o.ok=/^Slot 2/.test(o.after||'');
 }catch(e){o.err=e.message}return o},j);console.log(JSON.stringify(r));await b.close()})();
