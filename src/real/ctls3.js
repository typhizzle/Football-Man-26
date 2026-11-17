// TITLE LIST SCROLL (Tyler 2026-11-17): when the save list redraws (cloud check) it must not scroll back to the top.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({w:1366,h:500,file:process.env.F});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const o={};try{
 S=await readCode(j);for(let i=1;i<=6;i++){SLOT=i;save()}SLOT=6;menuMain();
 ui.scrollTop=400;const y0=ui.scrollTop;menuMain();await new Promise(r=>setTimeout(r,400));o.y0=y0;o.y1=ui.scrollTop;o.ok=y0>100&&Math.abs(ui.scrollTop-y0)<5;
 }catch(e){o.err=e.message}return o},j);console.log(JSON.stringify(r));await b.close()})();
