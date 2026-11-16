// ===== 📣 FANS: one real count, max 9 billion; down only when fans dislike something; messages say how many =====
// Tyler, 2026-11-14: "the maximum amount of fans should be 9 billion. Fans should only be going up. Also, there's
// a lot of things that only gives you like +5 fans, +3 fans. They should tell you how many fans you're actually
// getting ... a couple hundred, maybe a couple thousand, maybe hundreds of thousands ... the fans is an important
// system in this game".
// Before: the fan count was recomputed from popularity (0-100) x rating x level each time, so it could DROP (a bad
// rating year, being benched) and the cap was 9 billion x a family bonus; "Fans +3" meant 3 popularity points.
// Now there is one running total, S.fanN. Tyler (same night): "Fans can go down if you do something the fans do not
// like" -> it drops ONLY when you do something fans dislike (anything that lowers your popularity); a rating dip or
// a benching no longer costs fans. It never passes 9,000,000,000, rises whenever your
// standing (the old formula) passes it, and every popularity boost also brings real new fans in proportion to
// how big you already are (+1 popularity = +0.5% of your fans, at least a few dozen people). Messages show the
// real number ("Fans +14,200").
window.FANMAX=9e9;
// S.fanF = the best standing (old formula) ever reached; every new high adds the difference to your fans
window.fanHold=function(v,p){try{if(!S||!(p==null||p===S.pop))return Math.min(v,FANMAX);if(S.fanN==null){S.fanN=Math.min(v,FANMAX);S.fanF=v}if(S.fanF==null)S.fanF=S.fanN;
 if(v>S.fanF){S.fanN=Math.min(FANMAX,S.fanN+(v-S.fanF));S.fanF=v}return S.fanN}catch(e){return Math.min(v,FANMAX)}};
window.fanFmt=n=>{n=Math.round(n);return n>=1e9?(n/1e9).toFixed(2).replace(/\.?0+$/,'')+' billion':n.toLocaleString()};
// a popularity boost brings real fans (checked every time the game saves, so every source is covered)
window.fanTick=function(){try{if(!S)return;if(S.fanN==null){S.fanN=myFans();S.popSeen=S.pop;return}const k=(S.pop||0)-(S.popSeen==null?S.pop:S.popSeen);
 if(k>0){const add=Math.max(40*k,Math.round(S.fanN*.005*k));S.fanN=Math.min(FANMAX,S.fanN+add)}
 else if(k<0){const lose=Math.max(40*-k,Math.round(S.fanN*.005*-k));S.fanN=Math.max(0,S.fanN-lose)}S.popSeen=S.pop}catch(e){}};
(()=>{try{const _s=save;save=function(){try{fanTick()}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();
// messages: "Fans +3" / "Fans +" -> the real number gained since the last message that mentioned fans
window.fanMsg=function(t){try{if(typeof t!=='string'||!/Fans [+-]/.test(t)||!S)return t;fanTick();const d=(S.fanN||0)-(S.fanMsgN==null?(S.fanN||0):S.fanMsgN);S.fanMsgN=S.fanN;
 return t.replace(/(📣 )?Fans [+-]\d*(?=[\s.,)·]|$)/g,'📣 Fans '+(d<0?'-':'+')+fanFmt(Math.abs(d)))}catch(e){return t}};
(()=>{try{const _t=talk;talk=function(){const a=[...arguments];try{for(let i=2;i<a.length;i++)if(typeof a[i]==='string')a[i]=fanMsg(a[i])}catch(e){}return _t.apply(this,a)}}catch(e){}})();
(()=>{try{const _h=hub;hub=function(){try{if(typeof HM==='string'&&/Fans [+-]/.test(HM))HM=fanMsg(HM);if(S&&typeof S.fmsg==='string'&&/Fans [+-]/.test(S.fmsg))S.fmsg=fanMsg(S.fmsg)}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
