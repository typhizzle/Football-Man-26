// CONTROLLER STAYS ON (Tyler 2026-11-16, MacBook): with the controller in use, a click / trackpad touch / key press no longer turns
// controller mode off (icons + meter vanished); 10 s after the controller goes quiet, touch/mouse take over again.
const H=require('/home/claude/real/h.js');
(async()=>{const {b,pg}=await H.open({});const o=await pg.evaluate(async()=>{const o={};try{
 CTL.mode='pad';CTL.lastPad=performance.now();dispatchEvent(new PointerEvent('pointerdown'));dispatchEvent(new KeyboardEvent('keydown',{key:'a'}));o.A_stays=CTL.mode==='pad';
 CTL.lastPad=performance.now()-11000;dispatchEvent(new PointerEvent('pointerdown'));o.B_handsOff=CTL.mode!=='pad'}catch(e){o.err=e.message}return o});console.log(JSON.stringify(o));await b.close()})();
