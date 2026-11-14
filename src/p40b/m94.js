// ===================== 🔑 short cloud save codes =====================
// Instead of pasting a 200KB code, you type a 5-char code like "SIM".
// The real save data lives in the artifact DB; the code is just a lookup key.
// Falls back to the long-code system when cloud is unreachable.
(()=>{
 // retry the capability call every time until it returns something;
 // claude.use() is memoized by the runtime so this is free
 let _db=null;
 async function getDb(){
  if(_db)return _db;
  try{if(window.claude&&window.claude.use){_db=await window.claude.use('db')}}catch(e){}
  return _db;
 }
 const isShort=s=>s&&s.length>=2&&s.length<=10&&/^[A-Za-z0-9]+$/.test(s)&&!s.startsWith('FM');
 // LOAD: if input looks like a short code, fetch full data from cloud first
 const _rc=readCode;
 readCode=async function(t){
  t=(t||'').trim();
  if(isShort(t)){
   const CODE=t.toUpperCase();
   const db=await getDb();
   if(!db)throw new Error('Short codes need the claude.ai version. Open the game there, or paste your full backup code here.');
   let snap;
   try{snap=await db.doc('codes/'+CODE).get()}catch(e){throw new Error('Cloud lookup failed ('+((e&&e.code)||'err')+'). Try again in a moment.')}
   if(!snap||!snap.exists)throw new Error('Code "'+CODE+'" not found. Check spelling (case doesn\'t matter).');
   const d=snap.data();
   if(!d||!d.d)throw new Error('Code "'+CODE+'" found but had no save data.');
   t='FMZ1'+d.d;
  }
  return _rc.call(this,t);
 };
 // SAVE: after making the long code, also upload it and store a short code
 window._lastShortCode='';
 const _mc=mkCode;
 mkCode=async function(){
  const full=await _mc.apply(this,arguments);
  window._lastShortCode='';
  try{
   const db=await getDb();
   if(db&&full.startsWith('FMZ1')){
    const data=full.slice(4);
    const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code='';
    for(let i=0;i<5;i++)code+=chars[Math.floor(Math.random()*chars.length)];
    await db.doc('codes/'+code).set({d:data,t:Date.now(),n:(S&&S.name)||''});
    window._lastShortCode=code;
   }
  }catch(e){}
  return full;
 };
 // surface the real reason an import failed instead of the generic line
 if(typeof impS==='function'){
  const _is=impS;
  impS=async function(i){
   try{
    const s=await readCode(document.getElementById('xc').value);
    SLOT=i;S=s;LASTJ='';save();hub();
   }catch(e){
    const xm=document.getElementById('xm');
    if(xm)xm.textContent=(e&&e.message)?e.message:'That code did not work. Make sure you copied all of it.';
   }
  };
 }
 // SHOW: when expS displays the code, prefer the short code if we got one
 if(typeof expS==='function'){
  const _ex=expS;
  expS=async function(){
   const r=await _ex.apply(this,arguments);
   try{
    if(window._lastShortCode){
     const sc=window._lastShortCode;
     const xc=document.getElementById('xc'),xm=document.getElementById('xm');
     if(xc)xc.value=sc;
     try{await navigator.clipboard.writeText(sc)}catch(e){}
     if(xm)xm.textContent='☁️ Short code copied: '+sc+' — type this on any device with internet. (Full backup code also saved.)';
    }
   }catch(e){}
   return r;
  };
 }
})();
