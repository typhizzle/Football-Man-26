// ===== 🔑 YOUR OWN SAVE CODE NAME =====
// Tyler, 2026-11-15: "whenever they press save code they type it in, it can't be reused but it'll load from that point" /
// "Let's say I want to save the code for Frank Castle ... It would be easier to type something that I created."
// The backup card has a box for the code's name, filled in with your last name (CASTLE). The name belongs to whoever made it
// first: anyone else gets "taken" and a free one is offered (CASTLE2). Making it again later updates YOUR code to that point.
// Type the name on Import (any device, claude.ai version) and the save loads from where you made it. Named codes are never
// cleaned up by the cloud's space sweep; you can delete your own from the same card.
window.scClean=function(v){return String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,10)};
window.scDefault=function(){try{const p=String((S&&S.name)||'').trim().split(/\s+/);let l=p.length>1?p.lnPop():p[0];return scClean(l)||'MYSAVE'}catch(e){return 'MYSAVE'}};
window.scNamed=function(){try{return JSON.parse(localStorage.getItem(K+'_named')||'[]')}catch(e){return []}};
window.scNamedSet=function(L){try{localStorage.setItem(K+'_named',JSON.stringify(L.slice(-30)))}catch(e){}};
window.scDb=async function(){try{if(window.claude&&claude.use){const d=await claude.use('db');let id='';try{const u=await claude.use('user');id=u&&u.id?await u.id():''}catch(e){}return d?{d,id:id||''}:null}}catch(e){}return null};
window.scGet=async function(d,c){try{const sn=await d.doc('codes/'+c).get();return sn&&sn.exists?(typeof sn.data=='function'?sn.data():sn.data):null}catch(e){return null}};
// mine: made by this account (or by this phone, for codes made before names had owners)
window.scMine=function(dd,c,id){if(!dd)return true;if(dd.own&&id&&dd.own===id)return true;if(!dd.own&&scNamed().some(x=>x.c===c))return true;return false};
window.scFree=async function(base){const B=scDb&&await scDb();if(!B)return base;const b=base.slice(0,9);for(let k=0;k<30;k++){const c=k?(b+(k+1)).slice(0,10):base;const dd=await scGet(B.d,c);if(scMine(dd,c,B.id))return c}return base};
window.scMake=async function(){const xm=$('#xm'),xc=$('#xc'),inp=$('#scn');const say=t=>{if(xm)xm.textContent=t};
 const c=scClean(inp&&inp.value);if(c.length<2)return say('Give your code a name: 2 to 10 letters or numbers.');if(c.startsWith('FM'))return say('Codes can\'t start with "FM". Try another name.');
 const B=await scDb();if(!B){say('Named codes need the claude.ai version (that\'s where the codes are kept). Here is your full backup code instead.');return expS()}
 say('Checking "'+c+'"…');const dd=await scGet(B.d,c);
 if(!scMine(dd,c,B.id)){const f=await scFree(c);if(inp)inp.value=f;return say('"'+c+'" is already taken by someone else. "'+f+'" is free — tap Create again to use it.')}
 if(dd&&!confirm('Update your code "'+c+'" to right now? It will load from this point from now on.'))return say('Kept "'+c+'" where it was.');
 say('Saving "'+c+'"…');let full='';try{window._scNoRand=1;full=await mkCode()}finally{window._scNoRand=0}
 if(!full||!full.startsWith('FMZ1')){if(xc)xc.value=full||'';return say('Could not make the code right now. Your game is still saved.')}
 try{const P=cdChunks(full.slice(4)),tag=Date.now().toString(36);for(let i=1;i<P.length;i++)await B.d.doc('codes/'+c+'~'+i).set({d:P[i],tag});
  await B.d.doc('codes/'+c).set({d:P[0],n:P.length,tag,t:Date.now(),n2:(S&&S.name)||'',own:B.id||'',named:1,slot:SLOT||0});
  try{if(typeof cdOrphans=='function')cdOrphans(B.d,'codes/'+c,P.length)}catch(e){}
  const L=scNamed().filter(x=>x.c!==c);L.push({c,n:(S&&S.name)||'',t:Date.now(),y:(typeof yrN=='function'?yrN():0),wk:(S&&S.wk)||0});scNamedSet(L);
  if(xc)xc.value=c;try{await navigator.clipboard.writeText(c)}catch(e){}
  say('☁️ Your code is "'+c+'". On any device (claude.ai version), type it under Import a save code and it loads from this point. Make it again any time to update it.');scList()}
 catch(e){try{cloudWarn(e)}catch(x){}say('The cloud didn\'t take it just now ('+String(e&&e.message||e).slice(0,40)+'). Your game is safe; try again in a moment.')}};
window.scDel=async function(c){if(!confirm('Delete your code "'+c+'"? The save itself is not touched.'))return;const B=await scDb();if(B){const dd=await scGet(B.d,c);if(dd&&scMine(dd,c,B.id)){try{for(let i=1;i<(dd.n||1)+2;i++){try{await B.d.doc('codes/'+c+'~'+i).delete()}catch(e){}}await B.d.doc('codes/'+c).delete()}catch(e){}}}scNamedSet(scNamed().filter(x=>x.c!==c));scList()};
window.scList=function(){const el=$('#scl');if(!el)return;const L=scNamed().slice().reverse();el.innerHTML=L.length?'<small>Your codes on this device:</small>'+L.map(x=>`<div class=row style="font-size:15px;gap:6px"><span><b>${esc(x.c)}</b> <small>${esc(x.n||'')}${x.y?' · '+x.y+' week '+((x.wk||0)+1):''}</small></span><button class=g style="width:auto;flex:none" onclick="scDel('${x.c}')">🗑</button></div>`).join(''):''};
// the backup card: a name box (your last name), and the button makes the named code
(()=>{try{const _s=settings;settings=function(){const r=_s.apply(this,arguments);try{const xc=$('#xc');if(xc&&!$('#scn')){const card=xc.closest('.card'),btn=card&&[...card.querySelectorAll('button')].find(b=>/expS/.test(b.getAttribute('onclick')||''));
  if(btn){const d0=scDefault();btn.insertAdjacentHTML('beforebegin',`<label style="display:block;margin:6px 0">Name your code <input id=scn value="${d0}" maxlength=10 autocapitalize=characters autocomplete=off spellcheck=false style="width:9em;font:16px monospace;text-transform:uppercase"></label>`);
   btn.setAttribute('onclick','scMake()');btn.textContent='Create and copy save code';btn.insertAdjacentHTML('afterend','<div id=scl></div><button class=g onclick="expS()" style="font-size:13px">Full backup code (works anywhere, even off claude.ai)</button>');scList();
   scFree(d0).then(f=>{const i=$('#scn');if(i&&i.value===d0&&f!==d0)i.value=f}).catch(()=>{})}}}catch(e){}return r}}catch(e){}})();
