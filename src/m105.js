// ============ 🎃 Halloween keepsake, moved to the MAIN MENU ============
// It lives at the top of the save-file screen as an orange prompt. The order Tyler asked
// for: the thank-you message comes FIRST, before anything is shown; then Fallon takes his
// hat off and you flip through the treats on his head one at a time; then you either keep
// one forever or save it for later. Nothing is granted until the green button is pressed.

// ---- the pick belongs to the ACCOUNT, not to one save ----
// Whatever you choose locks in for EVERY character who claimed something during the
// Halloween event, the ones you already have and any you load later.
window.HWKEY='fm_hwkeep';window.HWX2K='fm_hwx2';
window.hwKept=function(){try{const a=JSON.parse(localStorage.getItem(HWKEY)||'[]');return Array.isArray(a)?a.filter(x=>typeof x=='string'):[]}catch(e){return []}};
window.hwKeptSet=function(a){try{localStorage.setItem(HWKEY,JSON.stringify(a))}catch(e){}};
window.hwExtra=function(){try{return +localStorage.getItem(HWX2K)||0}catch(e){return 0}};
window.hwExtraAdd=function(n){try{localStorage.setItem(HWX2K,String(hwExtra()+(n||1)))}catch(e){}};

// did this save take part in the event?
window.hwTook=s=>{try{return !!(s&&s.hwd&&Array.isArray(s.hwd.c)&&s.hwd.c.length>=1)}catch(e){return false}};
// what a save wears: the account's picks, but only if that character trick-or-treated
window.hwHats=s=>{try{s=(s===undefined)?S:s;if(!s)return [];
 if(!hwTook(s))return [];
 const L=hwKept().slice();
 (Array.isArray(s.hwHats)?s.hwHats:[]).forEach(k=>{if(k&&!L.includes(k))L.push(k)});
 if(s.hwHat&&!L.includes(s.hwHat))L.push(s.hwHat);
 return L}catch(e){return []}};
window.hwPicksOwed=()=>1+hwExtra();
window.hwPicksLeft=()=>Math.max(0,hwPicksOwed()-hwKept().length);

// ---- every save file that trick-or-treated ----
window.hwkElig=function(){const out=[];
 for(let i=1;i<=NSLOT;i++){let d=null;try{d=load(i)}catch(e){d=null}
  if(d&&hwTook(d))out.push({i,n:d.name||('Slot '+i)})}
 return out};
window.hwkSlots=function(){return hwPicksLeft()>0?hwkElig():[]};

// write the account's picks into every character who took part
window.hwkSync=function(){
 const keep=hwKept();if(!keep.length)return 0;
 const oldSlot=SLOT,oldS=S,oldJ=(typeof LASTJ!='undefined'?LASTJ:'');let n=0;
 try{for(let i=1;i<=NSLOT;i++){let d=null;try{d=load(i)}catch(e){d=null}
  if(!d||!hwTook(d))continue;
  const cur=Array.isArray(d.hwHats)?d.hwHats.slice():[];
  let chg=false;keep.forEach(k=>{if(!cur.includes(k)){cur.push(k);chg=true}});
  if(!d.hwHat&&cur.length){d.hwHat=cur[0];chg=true}
  if(!chg)continue;
  // save() keeps only ONE pending write (250ms debounce), so writing several slots in
  // a row would keep only the last. Flush each one before moving to the next.
  d.hwHats=cur;SLOT=i;S=d;LASTJ='';save();try{zFlush()}catch(e){}n++;
 }}catch(e){}
 try{SLOT=oldSlot;S=oldS;LASTJ=oldJ}catch(e){}
 return n};
// a save loaded later picks it up too
(()=>{try{if(typeof mig!='function')return;const _m=mig;
 mig=function(s){s=_m.apply(this,arguments);
  try{if(hwTook(s)){const cur=Array.isArray(s.hwHats)?s.hwHats.slice():[];
   hwKept().forEach(k=>{if(!cur.includes(k))cur.push(k)});
   if(cur.length){s.hwHats=cur;if(!s.hwHat)s.hwHat=cur[0]}}}catch(e){}
  return s}}catch(e){}})();

window.HWKS=0;     // 0 shut · 1 the message · 2 trying them on
window.HWKSLOT=0;  // which save file this pick belongs to
window.HWKI=0;     // which treat is on his head right now

// cycle the hat on the cover model. coverP() already paints HWPICK on him.
window.hwkFlip=function(d){const L=hwHatList();if(!L.length)return;
 HWKI=(HWKI+d+L.length)%L.length;HWPICK=L[HWKI][0];
 try{coverP()}catch(e){}
 try{menuMain()}catch(e){}};

window.hwkOpen=function(i){HWKSLOT=+i||0;HWKS=1;HWPICK=null;   // hat comes OFF for the message
 try{coverP()}catch(e){}try{menuMain()}catch(e){}};
window.hwkShow=function(){HWKS=2;HWKI=0;const L=hwHatList();HWPICK=L.length?L[0][0]:null;
 try{coverP()}catch(e){}try{menuMain()}catch(e){}};
window.hwkLater=function(){HWKS=0;HWKSLOT=0;HWPICK=null;
 try{coverP()}catch(e){}try{menuMain()}catch(e){}};

// ---- keeping one. Writes straight into that save file, current slot or not. ----
window.hwkKeep=function(){
 const L=hwHatList();if(HWKS!=2||!L.length)return;
 const key=L[HWKI][0],nm=L[HWKI][1];
 if(hwPicksLeft()<=0)return;
 if(!L.some(h=>h[0]===key))return;
 const keep=hwKept();if(!keep.includes(key))keep.push(key);
 hwKeptSet(keep);
 const n=hwkSync();
 try{if(S&&hwTook(S)){S.hwHats=hwHats(S);if(!S.hwHat)S.hwHat=key}}catch(e){}
 HWKS=0;HWKSLOT=0;HWPICK=null;
 try{HM='🎃 The '+nm+' is yours forever'+(n>1?(' — on all '+n+' of your Halloween characters'):'')+'. Put it on under 👕 Clothing → 🧢 Headwear.'}catch(e){}
 try{coverP()}catch(e){}try{menuMain()}catch(e){}
};

// ---- the orange panel at the top of the main menu ----
window.hwkBar=function(){
 try{
  const E=hwkElig(),left=hwPicksLeft();
  if((!E.length||left<=0)&&!HWKS)return '';
  const box=inner=>`<div class=card style="background:#2a1600;border:2px solid #e8730c;margin:0 0 8px;text-align:left">${inner}</div>`;
  const who=E.length>1?('all '+E.length+' of your Halloween characters'):(E[0]?E[0].n:'your character');

  if(!HWKS)return box(`<b>🎃 Thanks for trick-or-treating!</b><br><small>You have a treat waiting for <b>${who}</b>.</small>
    <button onclick="event.stopPropagation();hwkOpen(0)" style="background:#e8730c;border:2px solid #ffb257">🎃 Open your treat</button>`);

  if(HWKS==1)return box(`<b>🎃 Thanks for trick-or-treating!</b><br><br>
    <b>Pick one of these to keep in your locker forever. The rest will vanish.</b><br><br>
    <small>You'll flip through them on Fallon's head one at a time. Nothing is yours until you press the green button, so take your time — if you close the game, your treat will still be waiting for you.<br><br>
    <b>You get exactly ONE, and the choice is final.</b> Whatever you pick locks in for <b>${who}</b>${E.length>1?', the same one for each of them':''}.</small>
    <button onclick="event.stopPropagation();hwkShow()" style="background:#e8730c;border:2px solid #ffb257">👀 Show me the treats</button>
    <button class=g onclick="event.stopPropagation();hwkLater()">⏰ Save it for later</button>`);

  const L=hwHatList(),cur=L[HWKI]||['',''];
  return box(`<b>🎃 Try them on</b>
   <div class=row style="justify-content:center;gap:6px;margin:6px 0">
    <button class=g style="width:auto;flex:none;padding:6px 14px" onclick="event.stopPropagation();hwkFlip(-1)">◀</button>
    <b style="min-width:150px;text-align:center">${cur[1]}</b>
    <button class=g style="width:auto;flex:none;padding:6px 14px" onclick="event.stopPropagation();hwkFlip(1)">▶</button>
   </div>
   <small>${HWKI+1} of ${L.length} · he's wearing it right now · locks in for ${who}</small>
   <button onclick="event.stopPropagation();hwkKeep()" style="background:#2d6a4f;border:2px solid #7bed9f">✅ Keep the ${cur[1]} forever</button>
   <button class=g onclick="event.stopPropagation();hwkLater()">⏰ Save it for later</button>`);
 }catch(e){return ''}
};

// leaving the menu puts his hat back to whatever is actually owned
(()=>{try{const _h=hub;hub=function(){if(HWKS){HWKS=0;HWKSLOT=0;HWPICK=null}return _h.apply(this,arguments)}}catch(e){}})();

// the old in-game screen just points at the main menu now
window.hwHatV=function(){
 const left=hwPicksLeft(),own=hwHats(S);
 ui.innerHTML=`<div><h2>🎃 Halloween keepsake</h2><div class=card>${
  own.length?`<b>You kept: ${own.map(k=>(HATS.find(h=>h[0]==k)||[,k])[1]).join(', ')}</b><br><br>Put it on under 👕 Clothing → 🧢 Headwear.<br><br>`:''
 }${left>0?'<b>You still have a treat waiting.</b><br><br>Pick it from the <b>main menu</b> — the orange panel at the top of the save-file screen. You try each one on before you keep it, and it locks in for every character of yours who trick-or-treated.':(own.length?'':'This was for players who claimed a reward during the Halloween event.')}</div><button class=g onclick=hub()>Back</button></div>`;
 ui.scrollTop=0;
};
window.hwHatBtn=()=>'';

// ---- the extra pick: typed in, never handed out ----
// This phrase in "Import a save code" grants ONE more pick. It imports nothing and
// wipes nothing. Nobody gets a second treat without typing it.
(()=>{try{const _i=impS;impS=async function(i){
 let t='';try{t=($('#xc').value||'').trim().toUpperCase()}catch(e){}
 if(t=='TYPHIZZLE2'){
  hwExtraAdd(1);
  try{$('#xm').textContent='🎃 One extra keepsake pick added. It is waiting on the main menu.'}catch(e){}
  return;
 }
 return _i.apply(this,arguments);
}}catch(e){}})();
