// ===================== 🎯 FLICK VIEW SLINGSHOT BOX: start your pull here and it's always a throw (never the camera) =====================
const slBoxR=()=>{const s=Math.round(Math.min(W,H)*.3);return{x:W-s-14,y:H-s-(W<H?150:90),s}};
function slBoxOn(){try{return !!(g&&g.st&&CAMI==2&&!g.watch&&cv.style.display=='block'&&S.thm!='swipe'&&(g.ph=='live'||g.ph=='pre'))}catch(e){return false}}
function slBoxHit(x,y){if(!slBoxOn())return false;const b=slBoxR();return x>=b.x&&x<=b.x+b.s&&y>=b.y&&y<=b.y+b.s}
function slBoxUI(){const on=slBoxOn();let e=$('#slbox');if(!e){e=document.createElement('div');e.id='slbox';e.style.cssText='position:fixed;border:3px dashed #ffe93bcc;border-radius:14px;pointer-events:none;z-index:4;display:none;align-items:center;justify-content:center;color:#ffe93b;font:700 11px "Press Start 2P",monospace;text-align:center;background:#0002';e.innerHTML='SLING<br>HERE';document.body.appendChild(e)}
 if(!on){if(e.style.display!='none')e.style.display='none';return}const b=slBoxR();e.style.display='flex';e.style.left=b.x+'px';e.style.top=b.y+'px';e.style.width=e.style.height=b.s+'px'}
(()=>{const _s=swEnd;swEnd=function(e){if(aim&&aim.box&&e.pointerId==aim.id)return false;return _s.apply(this,arguments)}})();
(()=>{const _m=swMove;swMove=function(e){if(aim&&aim.box&&e.pointerId==aim.id)return;return _m.apply(this,arguments)}})();
(()=>{const _sc=scene;scene=function(){try{const e=$('#slbox');if(e)e.style.display='none'}catch(_){}return _sc.apply(this,arguments)}})();
(()=>{const _h=hub;hub=function(){try{const e=$('#slbox');if(e)e.style.display='none'}catch(_){}return _h.apply(this,arguments)}})();
