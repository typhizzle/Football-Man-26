// ===== 🔑 SHORT SAVE CODES EVERYWHERE (friends' copy and off claude.ai) =====
// Tyler, 2026-11-16: "just give me the short code for my friends away from Claude ... Turn the long code into short code ... No one's
// gonna remember a long code. We're going off things you can remember."
// Where claude.ai's own storage isn't available (the friends' link, the GitHub copy), "Create and copy save code" stores the long code
// online (textdb.dev: free, no account) under the name you type (NUGENT), in pieces of up to 700 KB. Type that name under Import on any
// phone and the save loads. A name made from another phone is refused and a free one is offered; the phone that made a code can update
// it. Your private claude.ai copy keeps using claude.ai's storage; Import looks there first, then online.
// Note: anyone who knows a code's name can load that save (it's a game save, nothing private), like any shared code.
window.TXU='https://textdb.dev/api/data/';window.TXP='footballman26-';window.TXCH=700000;
window.txGet=async function(k){try{const r=await fetch(TXU+encodeURIComponent(TXP+k),{cache:'no-store'});if(!r.ok)return null;const t=await r.text();return t&&t.length?t:null}catch(e){return null}};
window.txPut=async function(k,v){const r=await fetch(TXU+encodeURIComponent(TXP+k),{method:'POST',headers:{'Content-Type':'text/plain'},body:v});if(!r.ok)throw new Error('online save refused ('+r.status+')');return true};
window.txDev=function(){try{let d=localStorage.getItem('fm_dev');if(!d){d=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('fm_dev',d)}return d}catch(e){return 'nodev'}};
window.txHead=function(t){try{if(!t||t.slice(0,5)!=='FMS1|')return null;const p=t.split('|');return {n:+p[1],tag:p[2],own:p[3],d:p.slice(4).join('|')}}catch(e){return null}};
window.txFree=async function(base){const b=base.slice(0,9);for(let k=0;k<30;k++){const c=k?(b+(k+1)).slice(0,10):base;const h=txHead(await txGet(c));if(!h||h.own===txDev())return c}return base};
window.txMake=async function(c){const xm=$('#xm'),xc=$('#xc'),inp=$('#scn');const say=t=>{if(xm)xm.textContent=t};
 say('Checking "'+c+'"…');const h0=txHead(await txGet(c));if(h0&&h0.own!==txDev()){const f=await txFree(c);if(inp)inp.value=f;return say('"'+c+'" is already taken. "'+f+'" is free — tap Create again to use it.')}
 if(h0&&!confirm('Update your code "'+c+'" to right now? It will load from this point from now on.'))return say('Kept "'+c+'" where it was.');
 say('Saving "'+c+'"…');let full='';try{window._scNoRand=1;full=await mkCode()}finally{window._scNoRand=0}if(!full||!full.startsWith('FMZ1')){if(xc)xc.value=full||'';return say('Could not make the code right now. Your game is still saved.')}
 const data=full.slice(4),P=[];for(let i=0;i<data.length;i+=TXCH)P.push(data.slice(i,i+TXCH));const tag=Date.now().toString(36);
 try{for(let i=1;i<P.length;i++)await txPut(c+'~'+i,tag+'|'+P[i]);await txPut(c,'FMS1|'+P.length+'|'+tag+'|'+txDev()+'|'+P[0]);
  const L=scNamed().filter(x=>x.c!==c);L.push({c,n:(S&&S.name)||'',t:Date.now(),y:(typeof yrN=='function'?yrN():0),wk:(S&&S.wk)||0,on:1});scNamedSet(L);
  if(xc)xc.value=c;try{await navigator.clipboard.writeText(c)}catch(e){}say('☁️ Your code is "'+c+'". On any phone, type it under Import a save code and it loads from this point. Make it again any time to update it.');try{scList()}catch(e){}}
 catch(e){if(xc)xc.value=full;say('Couldn\'t reach the online save ('+String(e&&e.message||e).slice(0,50)+'). Your game is safe on this phone; try again, or use the full backup code below.')}};
window.txLoad=async function(c){const h=txHead(await txGet(c));if(!h)return null;let z=h.d;for(let i=1;i<h.n;i++){const t=await txGet(c+'~'+i);if(!t)throw new Error('Code "'+c+'" is missing a piece. Try again in a moment.');const j=t.indexOf('|');if(t.slice(0,j)!==h.tag)throw new Error('Code "'+c+'" is being updated. Try again in a moment.');z+=t.slice(j+1)}return 'FMZ1'+z};
// Create: use claude.ai storage when this copy has it, otherwise online
(()=>{try{const _m=scMake;window.scMake=async function(){let B=null;try{B=await scDb()}catch(e){}if(B)return _m.apply(this,arguments);const inp=$('#scn');const c=scClean(inp&&inp.value);
 if(c.length<2)return $('#xm')&&($('#xm').textContent='Give your code a name: 2 to 10 letters or numbers.');if(c.startsWith('FM'))return $('#xm')&&($('#xm').textContent='Codes can\'t start with "FM". Try another name.');return txMake(c)}}catch(e){}})();
// Import: claude.ai storage first (when there), then online
(()=>{try{const _r=readCode;readCode=async function(t){const s=(t||'').trim();const short=s&&s.length>=2&&s.length<=10&&/^[A-Za-z0-9]+$/.test(s)&&!/^FM/i.test(s);
 if(!short)return _r.apply(this,arguments);let first=null;try{const r=await _r.apply(this,arguments);if(r)return r}catch(e){first=e}
 const full=await txLoad(s.toUpperCase());if(full)return _r.call(this,full);throw first||new Error('Code "'+s.toUpperCase()+'" not found. Check the spelling (capitals don\'t matter).')};window.readCode=readCode}catch(e){}})();
// the name box shows a free name for this phone
(()=>{try{const _s=settings;settings=function(){const r=_s.apply(this,arguments);try{(async()=>{let B=null;try{B=await scDb()}catch(e){}if(B)return;const i=$('#scn');if(!i)return;const d0=i.value;const f=await txFree(d0);if(i.value===d0&&f!==d0)i.value=f})()}catch(e){}return r}}catch(e){}})();
