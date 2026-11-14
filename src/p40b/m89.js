// ===================== 🚪 no more accidental exits: walking up to a door never leaves; only the Leave / Exit button does =====================
const LXK=['eexit','exit','hdoor'];
(()=>{const _t=lrTap;lrTap=function(){const r=_t.apply(this,arguments);try{if(LR&&LR.pend&&LXK.includes(LR.pend.k)){LR.pend=null;const h=$('#lrh');if(h&&!LR.xHint){LR.xHint=1;h.textContent='🚪 Tap Leave (top left) or the Exit button when you want to go.'}}}catch(e){}return r}})();
