// CAM LOAD VIA CONTROLLER (Tyler 2026-11-17): on the title list, X/A on the Cameron Nugent slot loads it (game screen or overtime coin toss within 4 s). Loading must never be blocked.
const H=require('/home/claude/real/h.js'),fs=require('fs');const D='/home/claude/specs/cam-after-ot/';
(async()=>{const {b,pg}=await H.open({w:1366,h:768,file:process.env.F});const docs={};for(const f of fs.readdirSync(D)){const o=JSON.parse(fs.readFileSync(D+f,'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=o.data||o}
const r=await pg.evaluate(async(docs)=>{const o={};try{
 const mk=id=>({id,connected:true,buttons:Array.from({length:17},()=>({pressed:false,value:0})),axes:[0,0,0,0]});let PAD=mk('DualSense Wireless Controller (STANDARD GAMEPAD Vendor: 054c)');navigator.getGamepads=()=>[PAD];
 const press=i=>{PAD.buttons[i]={pressed:true,value:1};ctlStep();PAD.buttons[i]={pressed:false,value:0};ctlStep()};
 const fake={doc:k=>({get:async()=>docs[k]?{exists:true,data:docs[k]}:{exists:false}})};
 S=mig(await cdGet2(fake,'slot6'));SLOT=6;save();hub();await new Promise(r=>setTimeout(r,4000));
 const ovT=(document.getElementById('ov')||{}).innerText||'';o.loaded=!!(S&&S.name==='Cameron Nugent');o.ov=ovT.slice(0,60).replace(/\n/g,' ');o.ui=ui.innerText.slice(0,50).replace(/\n/g,' ');
 o.ok=o.loaded&&(/coin toss/i.test(ovT)||!/Delete Slot/.test(ui.innerText));
 }catch(e){o.err=e.message}return o},docs);console.log(JSON.stringify(r));await b.close()})();
