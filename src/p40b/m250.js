// ===== 🏷 BUILD STAMP (Tyler 2026-11-17: "put it as 0012 just to confirm") =====
// A small label in the bottom-left corner of every screen so you can tell exactly which copy of the game is running.
window.BUILD='0012';
(()=>{try{if(document.getElementById('bldstamp'))return;const d=document.createElement('div');d.id='bldstamp';d.textContent='V 0.0.1.'+BUILD;d.style.cssText='position:fixed;left:6px;bottom:4px;font:11px/1 monospace;color:#fff;background:#0009;padding:2px 5px;border-radius:4px;z-index:99999;pointer-events:none;opacity:.85';(document.body||document.documentElement).appendChild(d)}catch(e){}})();
// one label: the title screen shows its own, so the corner one hides there
setInterval(()=>{try{const d=document.getElementById('bldstamp');if(d)d.style.display=document.querySelector('.tap')?'none':''}catch(e){}},400);
