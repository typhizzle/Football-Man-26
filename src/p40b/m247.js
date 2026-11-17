// ===== 🎮 MADDEN BUTTON LAYOUT (Tyler 2026-11-17) =====
// □ / X = left outside receiver · △ / Y = slot · ✕ / A = tight end · ○ / B = right outside receiver · R1 / RB = running back.
// Worked out from where the receivers line up on each play (not tied to a player or roster spot); every receiver gets one button,
// no receiver gets two. If a spot is missing (no tight end, two slots...), the leftover buttons go to whoever is left, inside-out.
// ctlRecv()[i] is the receiver for button CTL_RB[i] = [A/✕, B/○, X/□, Y/△, RB/R1], so icons, tap, classic and meter all follow it.
window.ctlMapOf=function(P){const W=(P.wr||[]).filter(w=>w&&!w.out);if(!W.length)return [];const out=[null,null,null,null,null];
 const rb=W.includes(P.rb)?P.rb:W.slice().sort((a,b)=>(a.y0!=null?a.y0:a.y)-(b.y0!=null?b.y0:b.y))[0];if(rb)out[4]=rb;
 const X=w=>w.x0!=null?w.x0:w.x,rest=W.filter(w=>w!==rb).sort((a,b)=>X(a)-X(b));
 if(rest.length){out[2]=rest.shift()}                                    // □ left outside
 if(rest.length){out[1]=rest.pop()}                                      // ○ right outside
 if(rest.length){const te=rest.find(w=>w.pos==='TE')||rest.slice().sort((a,b)=>Math.abs(X(a)-26.65)-Math.abs(X(b)-26.65))[0];out[0]=te;rest.splice(rest.indexOf(te),1)}   // ✕ tight end (or the most inside man)
 if(rest.length){out[3]=rest.shift()}                                    // △ slot
 for(let i=0;i<5;i++)if(!out[i]&&rest.length)out[i]=rest.shift();       // anyone left fills an empty button
 return out};
(()=>{try{const _r=window.ctlRecv;window.ctlRecv=function(){try{const P=g&&g.pl;if(!P||!P.wr)return [];if(!P.bmap||P.bmapN!==P.wr.length){P.wr.forEach(w=>{if(w&&w.x0==null){w.x0=w.x;w.y0=w.y}});P.bmap=ctlMapOf(P);P.bmapN=P.wr.length}return P.bmap.map(w=>w&&!w.out?w:null)}catch(e){return _r.apply(this,arguments)}}}catch(e){}})();
