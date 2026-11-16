// ===== 🏈 A real playoff bracket, with every team's seed and record =====
// Tyler, 2026-11-14: "there needs to be a real bracket for the playoffs whenever you're looking at it.
// And then it should include the team record so I can see who had a better record and … the lower
// seeds and all that". The pro playoffs were only a text list. This draws the bracket: both
// conferences (Wild Card → Divisional → Conference), then the Ultra Bowl. Every team shows seed,
// short name and regular-season record; played games show the score and the winner in bold.
// The NFL-style reseed is real, so the Divisional games are drawn as they were actually paired.
window.tRec=function(t){try{return (t.w||0)+'-'+(t.l||0)+((t.t||0)?'-'+t.t:'')}catch(e){return ''}};
window.ppSvg=function(){try{const B=S.pb;if(!B||!B.sd)return '';const T=S.T,esc_=s=>String(s).replace(/[<&>"]/g,'');
 const seed=i=>{for(const c of ['RFC','LFC']){const k=B.sd[c].indexOf(i);if(k>=0)return k+1}return ''};
 const conf=i=>B.sd.RFC.includes(i)?'RFC':B.sd.LFC.includes(i)?'LFC':'';
 const games=(r,c)=>{const H=B.hist[r];if(H)return H.filter(g=>r===3||conf(g[0])===c).map(g=>({a:g[0],b:g[1],w:g[2],sa:g[3],sb:g[4]}));
  if(B.r===r&&!B.done&&B.pairs)return B.pairs.filter(p=>r===3||conf(p[0])===c).map(p=>({a:p[0],b:p[1]}));return []};
 const W=104,RH=17,XS=[2,116,230],CW=344;let s='',y0=0;
 const row=(x,y,i,sc,win)=>{if(i==null){s+=`<rect x=${x} y=${y} width=${W} height=${RH} fill="#1b2633" stroke="#000"/><text x=${x+5} y=${y+12} font-size=10 fill="#8aa">TBD</text>`;return}
  const me=i===0,nm=esc_(tAb(T[i]));
  s+=`<rect x=${x} y=${y} width=${W} height=${RH} fill="${win?'#2d6a4f':me?'#8a4510':'#1b2633'}" stroke="#000"/>`+
   `<text x=${x+4} y=${y+12} font-size=10 fill="#ffe93b" font-weight=700>${seed(i)}</text>`+
   `<text x=${x+15} y=${y+12} font-size=10 fill="#fff" font-weight=${win?700:400}>${nm}</text>`+
   `<text x=${x+46} y=${y+12} font-size=9 fill="#c6d2dc">${tRec(T[i])}</text>`+
   (sc!=null?`<text x=${x+W-4} y=${y+12} font-size=10 fill="#fff" text-anchor=end font-weight=${win?700:400}>${sc}</text>`:'')};
 const game=(x,y,g)=>{row(x,y,g.a,g.sa,g.w!=null&&g.w===g.a);row(x,y+RH,g.b,g.sb,g.w!=null&&g.w===g.b)};
 ['RFC','LFC'].forEach(c=>{
  s+=`<text x=2 y=${y0+12} font-size=11 fill="#ffe93b" font-weight=700>${c}</text>`;
  ['WILD CARD','DIVISIONAL','CONFERENCE'].forEach((t,r)=>s+=`<text x=${XS[r]+W/2} y=${y0+12} font-size=9 fill="#c6d2dc" text-anchor=middle>${t}</text>`);
  const top=y0+18;
  // wild card: the 1 seed's bye, then 2v7, 3v6, 4v5
  const one=B.sd[c][0];row(XS[0],top,one,'BYE',false);
  const wc=games(0,c);const W0=wc.length?wc:[[2,7],[3,6],[4,5]].map(([p,q])=>({a:B.sd[c][p-1],b:B.sd[c][q-1]}));
  W0.forEach((g,k)=>game(XS[0],top+RH+6+k*(RH*2+6),g));
  const dv=games(1,c);for(let k=0;k<2;k++)game(XS[1],top+RH*0.5+k*(RH*2+30),dv[k]||{a:k?null:one,b:null});
  const cc=games(2,c);game(XS[2],top+RH*1.5+20,cc[0]||{a:null,b:null});
  y0=top+RH+6+3*(RH*2+6)+10});
 const ub=games(3);s+=`<text x=${CW/2} y=${y0+12} font-size=11 fill="#ffe93b" font-weight=700 text-anchor=middle>ULTRA BOWL</text>`;
 game(CW/2-W/2,y0+18,ub[0]||{a:null,b:null});
 if(B.done&&B.champ!=null)s+=`<text x=${CW/2} y=${y0+18+RH*2+14} font-size=12 fill="#ffe93b" font-weight=700 text-anchor=middle>🏆 ${esc_(tn(T[B.champ]))}</text>`;
 const H=y0+18+RH*2+22;
 return `<div class=card><b>Playoff bracket</b> <small>seed · team · regular-season record · score</small><svg viewBox="0 0 ${CW} ${H}" style="width:100%;height:auto;display:block;margin-top:6px">${s}</svg></div>`}catch(e){return ''}};
(()=>{try{const _p=ppHtml;ppHtml=function(){const r=_p.apply(this,arguments);try{return ppSvg()+r}catch(e){return r}}}catch(e){}})();
