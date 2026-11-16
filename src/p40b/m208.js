// ===== ⚡ QUICK BATCH 2026-11-16 (second) =====
// Charlotte Black Cats (all saves) · the six made-up Halloween celebrities removed · Mia: no numbers on the flirt, her number only at
// 73+, a date only at 90+ (and usually no) · fewer sponsor opportunities · a shop in high school · upgrading keeps your place on the
// page · sub out with a big lead late · camera buttons never cover the scoreboard/play clock · a real QB kneel · jersey swap face to
// face (p47 patch) · names with II / III / Jr. keep it on the jersey and the name tag (p47 patch).
// ---- Charlotte Black Cats ----
window.cbcFix=function(s){try{if(!s||s.cbc)return 0;s.cbc=1;let n=0;const fixT=t=>{if(t&&t.n==='Queens'&&/Charlotte/.test(t.city||'')){t.n='Black Cats';if(t.sh==='Queens')t.sh='Black Cats';n++}};(s.pro||[]).forEach(fixT);(s.T||[]).forEach(fixT);
 const walk=(v,d)=>{if(!v||typeof v!=='object'||d>8)return;for(const k of Object.keys(v)){const x=v[k];if(typeof x==='string'&&x.indexOf('Charlotte Queens')>=0){v[k]=x.split('Charlotte Queens').join('Charlotte Black Cats');n++}else if(x&&typeof x==='object')walk(x,d+1)}};
 for(const k of Object.keys(s)){if(k==='ro'||k==='seal'||k==='pc')continue;walk(s[k],0)}return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)cbcFix(r)}catch(e){}return r}}catch(e){}})();
// ---- the six made-up celebrities are gone (anything a save remembers about them still resolves, nothing new ever shows them) ----
window.CELGONE=['vvelvet','fbolt','nnate','ppete','rrex','wwinnie'];
try{window.XCEL=window.XCEL||[];for(let i=CELB.length-1;i>=0;i--){if(CELGONE.includes(CELB[i][0])){XCEL.push(CELB[i]);CELB.splice(i,1)}}}catch(e){}
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r&&Array.isArray(r.cfan))r.cfan=r.cfan.filter(id=>!CELGONE.includes(id))}catch(e){}return r}}catch(e){}})();
// ---- Mia ----
window.MIANUM=73;
(()=>{try{const _t2=talk;talk=function(w,nm,line,mood,btns,ex){const r=_t2.apply(this,arguments);try{if(w==='reporter'&&/^Reporter Mia/.test(nm||'')){const B=[...ov.querySelectorAll('button')];B.forEach(x=>{if(/^😏 Flirt with Mia \(/.test(x.textContent))x.textContent='😏 Flirt with Mia'});
  let has=false;try{has=phEns().c.some(x=>x.id==='cel:rmia')}catch(e){}const fl=B.find(x=>/Flirt with Mia|Ask Mia out/.test(x.textContent));if(fl&&!has&&!B.some(x=>/Stay connected/.test(x.textContent))){const nb=document.createElement('button');nb.className=fl.className;nb.textContent='📱 Stay connected (ask for her number)';nb.setAttribute('onclick',"celNum('rmia')");fl.parentNode.insertBefore(nb,fl.nextSibling)}
  [...ov.querySelectorAll('small,p,div')].forEach(x=>{if(x.children.length===0&&/Mia friendship \d+\/100/.test(x.textContent))x.textContent=''})}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _t=talk;talk=function(w,nm,line,mood,btns,ex){try{if(Array.isArray(btns)){btns=btns.map(b=>Array.isArray(b)&&/^😏 Flirt with Mia \(/.test(b[0]||'')?['😏 Flirt with Mia',b[1]]:b);
  if(w==='reporter'&&/^Reporter Mia/.test(nm||'')&&typeof miaOk=='function'&&miaOk()&&!btns.some(b=>/celNum\('rmia'\)/.test(b[1]||''))){let has=false;try{has=phEns().c.some(x=>x.id==='cel:rmia')}catch(e){}if(!has&&/Flirt with Mia|Ask Mia out/.test(btns.map(b=>b[0]).join('|')))btns=btns.concat([['📱 Stay connected (ask for her number)',"celNum('rmia')"]])}}
  if(w==='reporter'&&nm==='Reporter Mia'&&typeof ex==='string'&&/Mia friendship \d+\/100/.test(ex))ex='';}catch(e){}return _t.call(this,w,nm,line,mood,btns,ex)}}catch(e){}})();
(()=>{try{const _n=celNum;celNum=function(id){if(id==='rmia'){const fr=cfGet('rmia');if(fr<MIANUM){try{S.cnum=S.cnum||{};if(S.cnum.rmia===wkKey())return talk('reporter','Reporter Mia','Didn\'t you just ask me that? 😅','smug',[['My bad','ovHide()']]);S.cnum.rmia=wkKey();cfAdd('rmia',1);save()}catch(e){}
  return talk('reporter','Reporter Mia',['I keep it professional with the players I cover. Maybe one day.','Ha. Nice try. My email is on the network site 😉','We\'ll see. Keep playing like this and maybe.'][ri(0,2)],'smug',[['Fair','ovHide()']])}}return _n.apply(this,arguments)}}catch(e){}})();
// ---- fewer sponsor opportunities ----
try{SPLV[0].offers=1;SPLV[1].offers=1;SPLV[2].offers=2;SPLV[3].offers=3;SPLV[4].offers=5;SPLV[0].party=0;SPLV[1].party=1;SPLV[2].party=2;SPLV[3].party=3;SPLV[4].party=4}catch(e){}
(()=>{try{const _o=spEvOffers;spEvOffers=function(r,L){const n0=L.length;const res=_o.apply(this,arguments);try{const ev=L.slice(n0);if(ev.length>1)L.splice(n0+1)}catch(e){}return res}}catch(e){}})();
// ---- upgrading keeps your place on the page ----
(()=>{try{const _u=up;up=function(){const y=ui.scrollTop,wy=window.scrollY;const r=_u.apply(this,arguments);try{ui.scrollTop=y;requestAnimationFrame(()=>{ui.scrollTop=y;if(wy)window.scrollTo(0,wy)})}catch(e){}return r}}catch(e){}})();
// ---- camera buttons sit under the scoreboard, never over the play clock ----
setInterval(()=>{try{const h=document.getElementById('hud'),t=document.getElementById('tbr');if(!h||!t||h.style.display==='none')return;const b=h.getBoundingClientRect();if(b.height>0&&b.bottom>0){const top=Math.round(b.bottom+4);if(t.style.top!==top+'px')t.style.top=top+'px';const f=document.getElementById('flk');if(f&&f.style.display!=='none'){const tb=t.getBoundingClientRect();f.style.top=Math.round(tb.bottom+4)+'px'}}}catch(e){}},300);
// ---- QB kneel you can see: the kneel play (m41) flagged the QB as kneeling but nothing drew it; now he drops to a knee ----
(()=>{try{const _s=sy;sy=function(o,j,f,q){const r=_s.apply(this,arguments);try{if(o&&o.kn&&o.m){const k=o.kn,m=o.m;m.position.y=-.55*k;m.L[0].rotation.x=-1.5*k;m.L[1].rotation.x=1.2*k;m.A[0].rotation.x=m.A[1].rotation.x=.9*k;m.rotation.x=-.12*k}}catch(e){}return r}}catch(e){}})();
