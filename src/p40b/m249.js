// ===== 📣 BANNERS: out of bounds · timeouts · two-minute warning · new quarters (Tyler 2026-11-17) =====
window.bnr=function(t,sec){try{if(g){g.flash=t;g.ft=sec||1.8}}catch(e){}};
// watched drives: the banner for what just stopped the clock
(()=>{try{const _e=wEnd;wEnd=function(txt,k){const r=_e.apply(this,arguments);try{const P=g.pl,e=P&&P.e;if(e){const off=W_&&W_.own?g.m:g.o,def=W_&&W_.own?g.o:g.m,nm=t=>String((t&&(t.n||t.nm))||'').toUpperCase();
  if(e.to===1)bnr('⏱ TIMEOUT · '+nm(off),2.2);else if(e.to===2)bnr('⏱ TIMEOUT · '+nm(def),2.2);else if(e.oob)bnr('OUT OF BOUNDS · CLOCK STOPPED',2);
  else if(k==='inc'&&W_&&W_.ck!=null&&(((W_.ck%1800)>=1680)))bnr('INCOMPLETE · CLOCK STOPPED',1.6)}}catch(x){}return r};window.wEnd=wEnd}catch(e){}})();
// the clock crossing a quarter end or the two-minute warning while you watch
(()=>{try{const _t=wTick;wTick=function(dt){const a=W_&&W_.ck;const r=_t.apply(this,arguments);try{const b=W_&&W_.ck;if(a!=null&&b!=null&&b>a){[[1680,'⚠ TWO-MINUTE WARNING'],[3480,'⚠ TWO-MINUTE WARNING'],[900,'END OF 1ST QUARTER'],[2700,'END OF 3RD QUARTER']].forEach(([T,m])=>{if(a<T&&b>=T)bnr(m,2.4)})}}catch(e){}return r};window.wTick=wTick}catch(e){}})();
// your own plays: the two-minute warning and the start of each quarter
(()=>{try{const _p=pre;pre=function(){const r=_p.apply(this,arguments);try{if(g&&g.ph==='pre'&&g.clk!=null){const q=Math.min(4,Math.floor(g.clk/900)+1);if(g.note==='TWO-MINUTE WARNING')bnr('⚠ TWO-MINUTE WARNING',2.6);else if(g.ot&&!g._bot){g._bot=1;bnr('OVERTIME',2.4)}else if(!g.ot&&g._bq!==q&&g.clk>=1&&q>1){g._bq=q;bnr(q===3?'SECOND HALF':'START OF '+['','1ST','2ND','3RD','4TH'][q]+' QUARTER',2.4)}else if(g._bq==null)g._bq=q}}catch(e){}return r};window.pre=pre}catch(e){}})();
(()=>{try{const _t=to;to=function(){const n=g&&g.to&&g.to[0];const r=_t.apply(this,arguments);try{if(g&&g.to&&g.to[0]<n)bnr('⏱ TIMEOUT · '+String((g.m&&g.m.n)||'YOU').toUpperCase(),2.2)}catch(e){}return r};window.to=to}catch(e){}})();
// the simulated drive tells you what it spent
['applyO','applyU'].forEach(n=>{try{const f=window[n];window[n]=function(){try{const r_=g&&g.r;if(r_&&Array.isArray(r_.pl)){const o=r_.pl.filter(p=>p.oob).length,t=r_.pl.filter(p=>p.to).length,bits=[];if(t)bits.push(t+' timeout'+(t>1?'s':''));if(o)bits.push(o+' out of bounds');if(bits.length&&!/timeout|out of bounds/.test(r_.res))r_.res+=' ('+bits.join(', ')+')'}}catch(e){}return f.apply(this,arguments)}}catch(e){}});
