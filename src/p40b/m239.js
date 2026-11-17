// ===== 📌 UPGRADES NEVER JUMP TO THE TOP (permanent; Tyler 2026-11-17 on Mac: "when I make an upgrade to one of my attributes, it pops
// up to top. I asked for a permanent fix on that because that's a recurring glitch") =====
// The old fix kept only the main panel's scroll for the six ratings. The pass-type +1 buttons (lob/touch/bullet) had none, and a
// redraw that lands a moment later could still reset it. NOW: every upgrade button (any +1) remembers where EVERY scrolled panel and
// the page were, and puts them back right after the redraw and again a few moments later. Test upk1 runs every update.
window.keepScroll=function(fn){return function(){const els=[...document.querySelectorAll('*')].filter(e=>e.scrollTop>0).map(e=>[e.id||null,e.className||null,e,e.scrollTop]),wy=window.scrollY,uy=ui?ui.scrollTop:0;
 const r=fn.apply(this,arguments);const put=()=>{try{if(ui&&uy)ui.scrollTop=uy;els.forEach(([id,cl,e,y])=>{const el=(id&&document.getElementById(id))||(document.body.contains(e)?e:null);if(el&&el.scrollTop!==y)el.scrollTop=y});if(wy&&window.scrollY!==wy)window.scrollTo(0,wy)}catch(e){}};
 put();requestAnimationFrame(put);setTimeout(put,0);setTimeout(put,60);setTimeout(put,200);return r}};
['up','ptUp'].forEach(f=>{try{const _f=window[f]||eval(f);if(typeof _f!=='function')return;const w=keepScroll(_f);window[f]=w;try{eval(f+'=w')}catch(e){}}catch(e){}});
