// ===================== 🏈 GAMEPLAY + POLISH FIXES (Oct 30, part 2) =====================
// pass rush: a lineman gets free around the time a real QB feels pressure (about 3 seconds), sooner against weak blocking,
// and nobody can stand in the pocket forever
function rushP(d,b,P){if(P.t<=.7)return 0;const base=cl(.06*Math.pow(2,((d.rush||70)-(b.blk||70))/14),.012,.8),run=P.call.t=='run';if(run)return base*4;if(P.t>6.5)return 40;return base*(1+Math.max(0,P.t-2.4)*1.4)}
// blocking pose: a short forward lean with the feet driving, not falling over
function lnSt(o,m,v){if(!LNP[o.pos]||!g||g.ph=='dead'||g.ph=='wdead')return;const pre=g.ph=='pre',dl=o.pos=='DE'||o.pos=='DT';
 if(pre){m.rotation.x-=(dl?.42:.34);m.position.y-=.2;m.A[0].rotation.x=m.A[1].rotation.x=dl?.35:.25;if(dl){m.A[1].rotation.x=-.1}return}
 if(v<2.6){const t=performance.now()/1000,s=Math.sin(t*9+o.x);m.rotation.x-=.14;m.A[0].rotation.x=1.35+s*.12;m.A[1].rotation.x=1.35-s*.12;m.L[0].rotation.x=s*.35;m.L[1].rotation.x=-s*.35}else m.rotation.x-=.08}
// big words on the field always fit the screen (shrinks, then wraps to two lines)
function fitFlash(m){const pad=W*.06,maxW=W-pad*2;let fs=Math.max(14,Math.min(W/22,30));cx.font='700 '+fs+'px "Press Start 2P",monospace';let w=cx.measureText(m).width;
 let lines=[m];if(w>maxW){const s2=fs*maxW/w;if(s2>=12){fs=s2}else{const ws=String(m).split(' ');let a='',b='';const half=String(m).length/2;for(const x of ws){if((a+' '+x).trim().length<=half||!a)a=(a+' '+x).trim();else b=(b+' '+x).trim()}lines=b?[a,b]:[a];cx.font='700 '+fs+'px "Press Start 2P",monospace';const mw=Math.max(...lines.map(l=>cx.measureText(l).width));if(mw>maxW)fs=Math.max(9,fs*maxW/mw)}}
 cx.font='700 '+fs+'px "Press Start 2P",monospace';let y0_=H*.26;try{const hb=document.getElementById('hud').getBoundingClientRect();if(hb&&hb.height)y0_=Math.max(y0_,hb.bottom+fs+10);['tbr','camb'].forEach(id=>{const e=document.getElementById(id);if(e&&e.offsetParent){const r=e.getBoundingClientRect();if(r.height&&r.bottom<H*.5)y0_=Math.max(y0_,r.bottom+fs+8)}})}catch(e){}lines.forEach((l,i)=>{const y=y0_+i*(fs*1.5);cx.fillStyle='#000';cx.fillText(l,W/2+3,y+3);cx.fillStyle='#ffe93b';cx.fillText(l,W/2,y)})}
// rings under players keep the same size in every camera (they used to blow up in Flick view)
const ringR=()=>Math.min(sc,15);
// Tayla Swiff: hard to get close to, and she's married to Tractor Swift
(()=>{const _ca=celAsk;celAsk=function(id){if(id=='tswiff')return talk('gf','Tayla Swiff','Aww, that\'s sweet... but I\'m married, remember? Tractor would NOT be happy. 😅','smug',[['My bad','ovHide()']]);return _ca.apply(this,arguments)}})();
(()=>{const _cf=cfAdd;cfAdd=function(id,n){if(id=='tswiff'&&n>0)n=n>=3?Math.max(1,Math.round(n*.3)):(Math.random()<.4?1:0);return _cf.call(this,id,n)}})();
(()=>{const _cn=celNum;celNum=function(id){if(id=='tswiff'&&cfGet(id)<70)return talk('mate','Tayla Swiff','My team handles all my contacts, sorry! 😊','smug',[['All good','ovHide()']]);return _cn.apply(this,arguments)}})();
// old saves: clear the "new schools" notice if it's still waiting
(()=>{const _pr=pkRen;pkRen=function(){try{if(S&&S.fmsg&&/New schools join college football/.test(S.fmsg))S.fmsg=S.fmsg.replace(/🏫 New schools join college football:[^.]*\./,'').trim()}catch(e){}return _pr.apply(this,arguments)}})();
// the player in the player-menu background wears your outfit (locker-room outfit first, else your casual costume)
(()=>{const _lp=lockP;lockP=function(){const r=_lp.apply(this,arguments);try{if(!S)return r;wrEns();const W_=S.wear,id=W_.lock&&W_.lock!='gear'?W_.lock:(W_.cas&&W_.cas!='cas'?W_.cas:null);if(id&&PL.p){const m=outfitM(id);if(m){m.scale.multiplyScalar(1.7/1.2);m.position.copy(PL.p.position);PL.remove(PL.p);PL.p=m;PL.add(m)}}}catch(e){}return r}})();
// speech-bubble faces: real look for people we know (stars, celebrities, family, your girl, coach, Mia); no random face for strangers
try{FKNOWN.unshift([/^(Reporter )?Mia$/,{s:0,h:'#ff4fa0',st:'long',fem:true}])}catch(e){}
(()=>{const _fl=faceLook;faceLook=function(w,nm){const clean=String(nm||'').split(' · ')[0].replace(/\s*\([^)]*\)\s*$/,'');const L=_fl.call(this,w,clean);
 try{const F=famEns();if(w=='mom'&&F.mom){L.s=FSK[cl(F.mom.sk||0,0,6)];L.h=F.mom.hc||L.h;L.fem=true}if(w=='dad'&&F.dad){L.s=FSK[cl(F.dad.sk||0,0,6)];L.h=F.dad.hc||L.h;L.bd=(F.dad.fh||0)>=2?1:0}
  if(w=='coach'){L.s=FSK[1];L.h='#bbbbbb';L.st='short';L.bd=1}}catch(e){}return L}})();
function faceOK(w,nm){if(['gf','mom','dad','coach','reporter','gm','staff','agent'].includes(w))return true;const n=String(nm||'').split(' · ')[0].replace(/\s*\([^)]*\)\s*$/,'');try{return FKNOWN.some(x=>x[0].test(n))}catch(e){return false}}
(()=>{const _t=talk;talk=function(w,nm){const r=_t.apply(this,arguments);try{if(!faceOK(w,nm)){const c=ov.querySelector('.card>div');const p=c&&c.firstElementChild;if(p&&p.querySelector('svg,canvas,img'))p.remove()}}catch(e){}return r}})();
// equipping in the menu updates the player in the background right away
(()=>{const _ws=wrSet;wrSet=function(){const r=_ws.apply(this,arguments);try{if(!LR&&M=='lock')lockP()}catch(e){}return r}})();
// rankings screen can't crash (falls back to the hub if there's no college season loaded)
(()=>{const _cr=crV;crV=function(){try{return _cr.apply(this,arguments)}catch(e){console.warn('crV',e);try{hub()}catch(_){}}}})();
