// ===== 🏅 AWARD BALLOTS SHOW EVERY FINALIST'S SEASON =====
// Tyler, 2026-11-14 (screenshot of the awards ballot): "Doesn't show all stats. Should be easy fix."
// Finalists picked on rating alone (Shamar Catch, Rico Worthy, Nuka Biten, Dijon Mustardson, Christopher
// McCunngingham) carried the line "99 OVR" instead of a season. The line is now his real season: the
// season row if it is filed, else the season so far added up from the box scores (m116), else games played.
window.awFind=function(n){try{for(let i=0;i<S.T.length;i++){const L=rost('h.'+i)||[];const x=L.find(y=>y&&y.n===n);if(x)return {x,i}}}catch(e){}return null};
window.awSzLine=function(z,pos){if(!z)return '';const g=SG(pos),P=[];const f=v=>(v|0).toLocaleString();
 if(z.pa){P.push(f(z.py)+' pass yds');P.push(z.ptd+' pass TD');P.push(z.pint+' INT')}
 if(z.car&&(g=='r'||g=='q'||z.ry>=100)){P.push(f(z.ry)+' rush yds');if(z.rtd)P.push(z.rtd+' rush TD')}
 if(z.rec){P.push(z.rec+' rec');P.push(f(z.recy)+' rec yds');if(z.rectd)P.push(z.rectd+' rec TD')}
 if(g=='r'&&(z.ry||z.recy))P.push(f((z.ry|0)+(z.recy|0))+' total yds');
 if(z.tkl||z.sck||z.intc){if(z.tkl)P.push(z.tkl+' tackles');if(z.sck)P.push(z.sck+' sacks');if(z.intc)P.push(z.intc+' INT')}
 if(!P.length&&z.g)P.push(z.g+' games');return P.join(', ')};
window.awLn=function(c,yr){try{const ln=c&&c.ln||'';if(ln&&!/^\s*\d+\s*OVR\s*$/i.test(ln))return ln;
 const f=awFind(c.n);if(!f)return ln;let t='';try{t=awLine(f.x,yr)}catch(e){}
 if(!t&&yr===yrN()){try{t=awSzLine(szOne(f.i,c.n),f.x.pos)}catch(e){}}
 if(!t&&/^(LT|LG|C|RG|RT|OL)$/.test(f.x.pos))t=(f.x.ovr||'')+' OVR · offensive line (no individual stats kept)';
 return t||ln}catch(e){return c&&c.ln||''}};
