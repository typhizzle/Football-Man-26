// ===== 🏈 SLINGSHOT: YOU SEE THE RELEASE =====
// Tyler, 2026-11-16: "sometimes it doesn't register where I'm dragging back and needs to be let known whenever I release it to
// throw it." When you let go, a tag pops up right at your finger for about a second: who the ball went to and how far
// downfield, and "from your full pull-back" when your finger flicked forward on release and the game used your deepest pull.
// If the release didn't throw (too small a pull, past the line), the same spot says why.
window.slRel=function(x,y,t,ok){try{const d=document.createElement('div');d.className='slrel';d.textContent=t;d.style.cssText=`position:fixed;left:${Math.max(8,Math.min(innerWidth-190,x-90))}px;top:${Math.max(40,y-70)}px;width:180px;text-align:center;font:bold 13px system-ui,sans-serif;color:${ok?'#111':'#fff'};background:${ok?'#ffe93b':'#e5534b'};border:2px solid #000;border-radius:8px;padding:4px 6px;z-index:7;pointer-events:none;transition:opacity .35s,transform .9s;opacity:1`;document.body.appendChild(d);
 requestAnimationFrame(()=>{d.style.transform='translateY(-18px)'});setTimeout(()=>{d.style.opacity='0'},850);setTimeout(()=>d.remove(),1250)}catch(e){}};
window.slWho=function(w){try{return w.nm||w.name||w.n||((w.pos||'')+' #'+(w.num||''))}catch(e){return ''}};
