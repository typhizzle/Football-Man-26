// ===== 🎮 BUTTON PROMPTS (controller) =====
// Tyler 2026-11-16: "When you're walking the field, there needs to be buttons for leaving the game and checking the game stats ... put
// whatever button icon you need to for the thing you are selecting or whenever you're talking to someone, you can just have the little
// A or X". With a controller on: the leave button shows Y, Game stats shows X, and whatever you can talk to / use shows A.
window.cpGl=function(i){try{return ctlGlyph(i)}catch(e){return ['A','B','X','Y'][i]||''}};
window.cpTag=function(el,i){if(!el)return;const has=el.querySelector&&el.querySelector('.cpg');const want=CTL.mode==='pad';if(want&&!has){const sp=document.createElement('span');sp.className='cpg';sp.style.cssText='display:inline-block;margin-right:6px;padding:0 6px;border-radius:9px;background:#000a;color:#fff;font:700 13px sans-serif';sp.textContent=cpGl(i);el.prepend(sp)}else if(!want&&has)has.remove()};
setInterval(()=>{try{if(typeof CTL=='undefined')return;const w=document.getElementById('lrw');if(!w||w.style.display!=='block'){return}
 [...w.querySelectorAll('button')].forEach(b=>{if(/locker room/i.test(b.textContent))cpTag(b,3)});const bx=document.querySelector('.bxb');if(bx)cpTag(bx,2);
 const a=document.getElementById('lra');if(a){const b=a.querySelector('button')||a;if(a.textContent.trim())cpTag(b,0)}}catch(e){}},400);
