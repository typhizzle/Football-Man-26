// ===== 🏆 MVP LADDER + 👆 PRO BOWL TAP VOTES =====
// Tyler, 2026-11-15/16: "Should be an MVP ladder as well, just to see who the CPU thinks is leading after each week ...
// we should go by how they're playing by the season, but it should update by the week." / "give MVP ladder its own
// section, and you can put the pro bowl voting icon at the bottom to tap and vote. Remember my voting system" /
// "I don't think each vote should be worth 1k for pro bowl, maybe every 5 times u tap on them its a 1k vote, also that
// can be in a different section. Obviously fan votes should matter too."
// The ladder is the season so far (box-score totals + team wins, the same weights the end-of-season MVP vote uses),
// redrawn every week, with each man's move since last week. Pro Bowl voting is its own page at the bottom: every 5 taps
// on a player is one 1,000-vote ballot (50 taps a week = 10 ballots, like before). The fans keep voting all season.
window.MVLN=10;window.PBTAPS=1;window.PBWEEK=10;
// Tyler 2026-11-16 (later): "it says I have 44 taps left and eight votes. Don't I get like 10 votes a week ... Keep it simple."
// Now: 10 votes a week, one tap = one vote, each vote rallies 1,000 fans (the same 10,000 a week as before). Saves that used the
// 5-taps system keep exactly what they had: each finished 5 taps = 1 vote; this week's taps used become votes used (rounded up).
window.mvlRows=function(){const out=[];try{const sz=szGet()||{};
 S.T.forEach((t,i)=>{const W=t.w||0,L=t.l||0,gp=Math.max(1,W+L+(t.t||0)),f=Math.min(1,gp/17),rec=W+'-'+L;
  (rost('h.'+i)||[]).forEach((x,k)=>{if(!x||!x.n||k>24)return;if(i==0&&k==0)return;const z=(sz[i]||{})[x.n];if(!z||!z.g)return;const p=x.pos;let s=null,ln='';
   if(p=='QB'&&z.pa>=40){s=z.py/25+z.ptd*4-z.pint*2+z.ry/30+z.rtd*3+W*5;ln=`${z.py.toLocaleString()} yds, ${z.ptd} TD, ${z.pint} INT${z.ry>=100?` · ${z.ry} rush yds`:''}`}
   else if(p=='RB'&&z.car>=30){s=z.ry/14+z.rtd*5+z.recy/25+W*3-12*f;ln=`${z.ry.toLocaleString()} rush yds, ${z.rtd+z.rectd} TD`}
   else if((p=='WR'||p=='TE')&&z.rec>=10){s=z.recy/18+z.rectd*5+W*2-28*f;ln=`${z.recy.toLocaleString()} rec yds, ${z.rectd} TD`}
   if(s!=null)out.push({n:x.n,pos:p,tm:tAb(t),nk:t.n,rec,s,ln,z})})});
 // you: your own box-score line this season (falls back to your season totals)
 // you: your real season totals (the same ones your season card and the end-of-season MVP vote use)
 const t0=S.T[0],W0=t0.w||0;let u=null;{const us=S.ssrk==='pro'+S.py&&S.ssr&&S.ssr.g?S.ssr:(S.ss&&S.ss.g?S.ss:null);if(us)u={g:us.g,pa:us.att||99,py:us.yds||0,ptd:us.td||0,pint:us.int||0,ry:us.ry||0,rtd:us.rtd||0}}
 if(!u){const z=(sz[0]||{})[S.name];if(z&&z.g)u=z}
 if(u&&u.g&&(u.pa||0)>=1)out.push({n:S.name,pos:'QB',tm:tAb(t0),nk:t0.n,z:{py:u.py||0,ptd:u.ptd||0,pint:u.pint||0,ry:u.ry||0,rtd:u.rtd||0},rec:W0+'-'+(t0.l||0),me:1,s:(u.py||0)/25+(u.ptd||0)*4-(u.pint||0)*2+(u.ry||0)/30+(u.rtd||0)*3+W0*5,
  ln:`${(u.py||0).toLocaleString()} yds, ${u.ptd||0} TD, ${u.pint||0} INT${(u.ry||0)>=100?` · ${u.ry} rush yds`:''}`});
}catch(e){}return out.sort((a,b)=>b.s-a.s)};
window.mvlS=function(){const y=yrN();if(!S.mvl||S.mvl.y!==y)S.mvl={y,h:{}};return S.mvl};
// the weekly snapshot (the top 10 after week N); written once per week, never rewritten
window.mvlSnap=function(){try{if(!S||S.stage!=='pro'||S.ofs)return;const wk=S.wk||0;if(wk<1)return;const M=mvlS();if(M.h[wk])return;if(Object.keys(M.h).some(k=>+k>wk))return;
 const R_=mvlRows();if(!R_.length)return;M.h[wk]=R_.slice(0,MVLN).map(r=>r.n)}catch(e){}};
(()=>{try{const _h=hub;hub=function(){try{if(S&&S.stage==='pro'&&!S.ofs&&(S.wk||0)<=17)mvlSnap()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// Tyler, 2026-11-16: "I want MVP ladder to really be its own section ... in the player menu, and not even its own icon, just kind of
// like how you lay out the stats ... lay them out MVP race in order ... and on that, leave the icon where you tap pro bowl voting".
// The MVP race is a card in the menu (under League leaders), in order, with the Pro Bowl voting button at its bottom.
window.mvlCard=function(){try{mvlSnap();const M=mvlS(),wk=S.wk||0,R_=mvlRows().slice(0,MVLN),ks=Object.keys(M.h).map(Number).filter(k=>k<Math.min(wk,17)).sort((a,b)=>b-a),pw=ks[0],prev=pw!=null?M.h[pw]:null;
 const mv=n=>{if(!prev)return '';const a=prev.indexOf(n),b=R_.findIndex(r=>r.n===n);if(a<0)return '<small style="color:#7cf">NEW</small>';const d=a-b;return d>0?`<small style="color:#5f5">▲${d}</small>`:d<0?`<small style="color:#f66">▼${-d}</small>`:'<small style="opacity:.6">–</small>'};
 const A=S.law&&S.law[S.py],won=A&&A.yr===yrN()&&A.w&&A.w.MVP,V=pbS();
 let h=`<div class=card data-mvl=1 style="text-align:left"><b>MVP race</b> <small>${!R_.length?'starts after week 1':wk>=17?'final regular season':'after week '+wk}${pw!=null?' · arrows since week '+pw:''}</small>`;
 if(won)h+=`<div style="font-size:15px;margin:4px 0"><b>🏅 ${A.yr} MVP: ${won.me?'▶ ':''}${esc(won.n)}</b> <small>${won.pos} · ${won.tm}</small></div>`;
 const sh=n=>{try{return abbr(n)}catch(e){return n}},z0=r=>r.z||{},main=r=>{const z=z0(r);return r.pos==='QB'?`${(z.py|0)}y ${z.ptd|0}TD ${z.pint|0}INT`:r.pos==='RB'?`${z.ry|0}y ${z.rtd|0}TD`:`${z.recy|0}y ${z.rectd|0}TD`},
  sub=r=>{const z=z0(r);return r.pos==='QB'?`rush ${z.ry|0}y ${z.rtd|0}TD`:r.pos==='RB'?`rec ${z.recy|0}y ${z.rectd|0}TD`:`${z.rec|0} rec`};
 h+=R_.map((r,i)=>`<div class=row style="gap:4px;font-size:17px;white-space:nowrap;align-items:flex-start;margin-bottom:0"><span style="min-width:0;overflow:hidden;text-overflow:ellipsis">${i+1}. ${r.me?'▶ ':''}${esc(sh(r.n))} <small>${esc(r.nk||r.tm)}</small> ${mv(r.n)}</span><span style="text-align:right;flex:none">${main(r)}</span></div><div style="text-align:right;font-size:13px;opacity:.8;margin:-2px 0 6px">${sub(r)}</div>`).join('');
 h+=`<button data-pbgo=1 onclick="pbV()" style="background:#6b6f76;color:#fff;border-color:#3a3d42;margin-top:8px">${V.closed?'🌴 Pro Bowl rosters':'🗳 Pro Bowl voting'}</button></div>`;return h}catch(e){return ''}};
window.mvlV=function(){mvlSnap();const M=mvlS(),wk=S.wk||0,R_=mvlRows().slice(0,MVLN),ks=Object.keys(M.h).map(Number).filter(k=>k<Math.min(wk,17)||(wk>17&&k<17)).sort((a,b)=>b-a),pw=ks[0],prev=pw!=null?M.h[pw]:null;
 const mv=n=>{if(!prev)return '';const a=prev.indexOf(n),b=R_.findIndex(r=>r.n===n);if(a<0)return '<small style="color:#7cf">NEW</small>';const d=a-b;return d>0?`<small style="color:#5f5">▲${d}</small>`:d<0?`<small style="color:#f66">▼${-d}</small>`:'<small style="opacity:.6">–</small>'};
 const A=S.law&&S.law[S.py],won=A&&A.yr===yrN()&&A.w&&A.w.MVP;let body='';
 if(won)body+=`<div class=card><b>🏅 ${A.yr} MVP: ${won.me?'▶ ':''}${esc(won.n)}</b> <small>${won.pos} · ${won.tm}</small></div>`;
 if(!R_.length)body+=`<div class=card><small>No games played yet this season. The ladder starts after week 1.</small></div>`;
 else body+=`<div class=card><small>${wk>=17?'Final regular-season ladder':'After week '+Math.min(wk,17)} · who the league thinks is leading, from how they've played all season${pw!=null?` · arrows: since week ${pw}`:''}</small>${R_.map((r,i)=>`<div class=row style="font-size:15px;gap:6px;align-items:center"><span style="min-width:0">${i+1}. ${r.me?'<b style="color:#ffe93b">▶ '+esc(r.n)+'</b>':esc(r.n)} <small>${r.pos} · ${r.tm} (${r.rec})</small><br><small>${r.ln}</small></span><span style="flex:none">${mv(r.n)}</span></div>`).join('')}</div>`;
 const V=pbS();
 ui.innerHTML=`<div><h2>🏆 ${yrN()} MVP ladder</h2>${body}<button data-pbgo=1 onclick="pbV()">${V.closed?'🌴 Pro Bowl rosters':'🗳 Pro Bowl voting · tap to vote'}</button><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0};
// ---------- Pro Bowl: 5 taps = one 1,000-vote ballot; the fans vote every week ----------
window.pbT=function(){const V=pbS();if(V.tp&&!V.tp2){for(const n in (V.t||{}))V.t[n]=Math.floor(V.t[n]/5);for(const w in (V.wk||{}))V.wk[w]=Math.ceil(V.wk[w]/5);V.tp2=1}if(!V.tp)V.tp2=1;if(!V.tp){V.t=V.t||{};for(const n in (V.u||{}))V.t[n]=(V.t[n]||0)+V.u[n]*PBTAPS;for(const w in (V.wk||{}))V.wk[w]=(V.wk[w]||0)*PBTAPS;V.tp=1}return V};
window.pbFan=function(c){return Math.round(c.fan*(40+Math.min(17,S.wk||0)*14))};
window.pbMine=function(n){const V=pbT();return Math.floor(((V.t||{})[n]||0)/PBTAPS)*1000};
window.pbVotes=function(c){return pbFan(c)+pbMine(c.n)};
window.pbVote=function(n){const V=pbT();if(V.closed)return pbV();const wk='w'+(S.wk||0);V.wk[wk]=V.wk[wk]||0;if(V.wk[wk]>=PBWEEK){HM='You\'ve used all '+PBWEEK+' votes this week. Come back next week.';return pbV()}
 V.wk[wk]++;V.t[n]=(V.t[n]||0)+1;V.u[n]=Math.floor(V.t[n]/PBTAPS);clearTimeout(window._pbSv);window._pbSv=setTimeout(()=>{try{save()}catch(e){}},1200);
 try{const row=[...ui.querySelectorAll('[data-pbn]')].find(e=>e.getAttribute('data-pbn')===n);if(row){pbRow(row,n);const l=ui.querySelector('[data-pbleft]');if(l)l.innerHTML=pbLeft();return}}catch(e){}pbV()};
window.pbLeft=function(){const V=pbT(),used=V.wk['w'+(S.wk||0)]||0,left=Math.max(0,PBWEEK-used);return `You have <b>${left}</b> vote${left==1?'':'s'} left this week.`};
window.pbRow=function(el,n){const V=pbT(),t=(V.t||{})[n]||0,c=(pbBallot()[PBG]||[]).find(z=>z.n===n);if(!c)return;const sm=el.querySelector('[data-pbv2]');if(sm)sm.innerHTML=pbLine(c,t)};
window.pbLine=function(c,t){const k=Math.round(pbVotes(c)/1000).toLocaleString(),m=pbMine(c.n)/1000,r=t%PBTAPS;return `${k}k votes${m?` · you rallied ${m}k fans`:''}${t&&PBTAPS>1?` · ${'●'.repeat(r)}${'○'.repeat(PBTAPS-r)}`:''}`};
window.pbV=function(g){if(g)PBG=g;const V=pbT(),P=pbBallot();let body='';
 if(V.closed){body=['RFC','LFC'].map(cf=>`<div class=card><b>${cf} Pro Bowl roster</b>${Object.keys(PBSL).map(k=>`<div style="font-size:15px"><b>${k}</b> <small>${(V.r[cf][k]||[]).map(c=>(c.me?'▶ ':'')+esc(c.n)+' ('+c.tm+')'+(c.ub?' · in the Ultra Bowl':'')+(c.alt?' · replacing '+esc(c.for):'')).join(', ')}</small></div>`).join('')}</div>`).join('')+(V.g?`<div class=card><b>🌴 All-Star game</b><br>${V.g}</div>`:'')}
 else{const L=(P[PBG]||[]).sort((a,b)=>pbVotes(b)-pbVotes(a)).slice(0,24);const used=V.wk['w'+(S.wk||0)]||0,can=used<PBWEEK;
  body=`<div class=card><small>The fans vote all season (it grows every week); voting closes after week 17. You get ${PBWEEK} votes a week. Tap a player to vote; each vote brings 1,000 more fans to his side. <span data-pbleft=1>${pbLeft()}</span></small></div><p class=tabs>${Object.keys(PBSL).map(k=>`<button class="${k==PBG?'':'g'}" onclick="pbV('${k}')">${k}</button>`).join('')}</p>
  <div class=card><b>${PBG} · top ${PBSL[PBG]} per conference make it</b>${L.map((c,i)=>`<div class=row data-pbn="${esc(c.n)}" style="font-size:15px;gap:6px"><span>${i+1}. ${c.me?'▶ ':''}${esc(c.n)} <small>${c.tm} · ${c.conf}</small><br><small data-pbv2=1>${pbLine(c,(V.t||{})[c.n]||0)}</small></span>${can?`<button class=g style="width:auto;flex:none;touch-action:manipulation" onclick="pbVote('${String(c.n).replace(/\\/g,'').replace(/'/g,"\\'")}')">👆 Tap</button>`:''}</div>`).join('')}</div>`}
 ui.innerHTML=`<div><h2>🗳 ${V.y} Pro Bowl${V.closed?' rosters':' voting'}</h2>${body}<button class=g onclick="pbV()">🔄 Re-sort</button><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0};
// the menu: one "MVP ladder" section (Pro Bowl voting sits at its bottom)
(()=>{try{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{const b=ui.querySelector('[data-pbv]');if(b){b.remove();if(!ui.querySelector('[data-mvl]')){const cards=[...ui.querySelectorAll('.card')],ll=cards.find(c=>{const t=c.querySelector('b');return t&&/^League leaders/.test(t.textContent)})||cards.find(c=>{const t=c.querySelector('b');return t&&/Your \d{4} season/.test(t.textContent)});
 const html=mvlCard();if(html){if(ll)ll.insertAdjacentHTML('afterend',html);else (ui.firstElementChild||ui).insertAdjacentHTML('beforeend',html)}}}}catch(e){}return r}}catch(e){}})();
