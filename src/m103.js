// ============ 🎃 Halloween keepsake: one headwear, picked by you, kept forever ============
// Anyone who claimed at least ONE reward during the live event gets to choose a single
// piece of headwear from the Halloween main menu and keep it permanently, after the
// event ends. It is never chosen for you: nothing is granted until you tap the confirm
// button, so closing the game or walking away leaves the choice waiting for you.
window.hwHatElig=()=>{try{return !!(S&&S.hwd&&Array.isArray(S.hwd.c)&&S.hwd.c.length>=1)}catch(e){return false}};
window.hwHatDone=()=>{try{return !!(S&&S.hwHat)}catch(e){return false}};
window.HWPICK=null;   // what you are previewing - NOT what you own
// the plain football helmet is the default look, not a Halloween prize, so it is not
// one of the free choices (it belongs in the shop as ordinary headwear instead)
window.hwHatList=()=>HATS.filter(h=>h[0]!=='helmet');

window.hwHatBtn=()=>{
 try{if(!hwHatElig()||hwHatDone())return '';
  return `<button onclick="hwHatV()" style="background:#e8730c">🎃 Pick your Halloween keepsake · 1 headwear, yours forever</button>`;
 }catch(e){return ''}
};

window.hwHatV=function(){
 if(!S)return;
 if(!hwHatElig()){ui.innerHTML=`<div><h2>🎃 Halloween keepsake</h2><div class=card>This was for players who collected at least one reward during the Halloween event. Your save didn't collect one, so there's nothing to pick here.</div><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0;return}
 if(hwHatDone()){
  const own=HATS.find(h=>h[0]==S.hwHat);
  ui.innerHTML=`<div><h2>🎃 Halloween keepsake</h2><div class=card><b>You already made your choice.</b><br><br>You kept the <b>${own?own[1]:S.hwHat}</b>. It's yours permanently and shows on the main menu.<br><br><small>One pick per save, so this can't be changed.</small></div><button class=g onclick=hub()>Back</button></div>`;
  ui.scrollTop=0;return;
 }
 const sel=HWPICK;
 const selName=sel?(HATS.find(h=>h[0]==sel)||[,sel])[1]:'';
 ui.innerHTML=`<div><h2>🎃 Thanks for trick-or-treating!</h2>
  <div class=card style="background:#2a1600;border:1px solid #e8730c">
   <b>Pick one of these to keep in your locker forever. The rest will vanish.</b><br><br>
   <small>Tap a gift below to try it on. Nothing is yours until you press the green confirm button, so take your time — if you close the game, your treat will still be waiting for you.<br><br>
   <b>You get exactly ONE, and the choice is final.</b></small>
  </div>
  <div class=card>
   <b>Step 1 — choose your treat</b>
   ${hwHatList().map(h=>{
     const on=sel===h[0];
     return `<button class="${on?'':'g'}" style="${on?'background:#2d6a4f;border:2px solid #7bed9f;':''}text-align:left" onclick="hwHatSel('${h[0]}')">${on?'✔ ':''}${h[1]}</button>`;
   }).join('')}
  </div>
  ${sel?`<div class=card style="background:#133a24;border:1px solid #7bed9f">
    <b>Step 2 — confirm</b><br><br>Keep the <b>${selName}</b> in your locker forever?<br><br>
    <small>This can't be undone, and you won't get another.</small>
    <button onclick="hwHatKeep()" style="background:#2d6a4f;border:2px solid #7bed9f">✅ Yes — keep the ${selName} forever</button>
    <button class=g onclick="hwHatSel(null)">Try a different one</button>
   </div>`
  :`<div class=card><small>Pick a gift above to continue.</small></div>`}
  <button class=g onclick="HWPICK=null;hub()">Leave without picking (your treat stays waiting)</button></div>`;
 ui.scrollTop=0;
};

window.hwHatSel=function(k){HWPICK=k||null;try{coverP()}catch(e){}hwHatV()};

window.hwHatKeep=function(){
 if(!S||!HWPICK||hwHatDone())return;
 if(!hwHatList().some(h=>h[0]===HWPICK))return;   // helmet is not claimable
 S.hwHat=HWPICK;HWPICK=null;
 try{save()}catch(e){}
 const own=HATS.find(h=>h[0]==S.hwHat);
 ui.innerHTML=`<div><h2>🎃 Yours forever</h2><div class=card style="background:#133a24;border:1px solid #7bed9f"><b>You kept the ${own?own[1]:S.hwHat}.</b><br><br>It's in your locker for good — it shows on the main menu from now on, event or no event. Nobody can take it off your save.</div><button class=g onclick=hub()>Back</button></div>`;
 ui.scrollTop=0;
 try{coverP()}catch(e){}
};
