// ===== 🗳 PRO BOWL VOTING · THE ALL-STAR GAME =====
// Tyler, 2026-11-14: "The pro bowl isn't by team, it's just the best players in the league that year that usually
// get voted. There should be a voting section ... They can stop voting week 17 or 18. They look a bit like an
// All-Star game though."
// During the regular season the fans vote on how players are actually doing (season stats from the box scores +
// their rating), and you can vote too (a fan's ballot, each week). Voting closes after week 17. Each conference
// (RFC, LFC) gets an All-Star roster: 3 QB, 2 RB, 4 WR, 2 TE, 5 OL, 3 DE, 2 DT, 3 LB, 3 CB, 2 S, 1 K. Pro Bowl
// week (between the Conference Championship and the Ultra Bowl) shows both rosters and the All-Star game, for
// everyone. Your own "Pro Bowl" honour now comes from the vote; every player's card shows his Pro Bowl years.
window.PBSL={QB:3,RB:2,WR:4,TE:2,OL:5,DE:3,DT:2,LB:3,CB:3,S:2,K:1};
window.pbGrp=function(p){return /^(LT|LG|C|RG|RT|OL)$/.test(p)?'OL':/^(OLB|MLB|LB)$/.test(p)?'LB':/^(EDGE)$/.test(p)?'DE':/^(FS|SS)$/.test(p)?'S':p};
window.pbConf=function(t){return String(t&&t.dv||'').startsWith('LFC')?'LFC':'RFC'};
window.pbS=function(){const y=yrN();if(!S.pbv||S.pbv.y!==y)S.pbv={y,u:{},wk:{},closed:0};return S.pbv};
// a player's fan score: what he has done this season + who he is
window.pbScore=function(x,ti){const z=(typeof szOne=='function'&&szOne(ti,x.n))||{},g=pbGrp(x.pos);let s=(x.ovr||60)*1.2;
 if(g=='QB')s+=(z.py||0)/40+(z.ptd||0)*4-(z.pint||0)*2;else if(g=='RB')s+=(z.ry||0)/12+((z.rtd||0)+(z.rectd||0))*5+(z.recy||0)/25;else if(g=='WR'||g=='TE')s+=(z.recy||0)/12+(z.rectd||0)*5;
 else if(g=='DE'||g=='DT'||g=='LB')s+=(z.sck||0)*9+(z.tkl||0)*.6;else if(g=='CB'||g=='S')s+=(z.intc||0)*12+(z.tkl||0)*.5+(z.pd||0)*2;
 const T=S.T[ti];s+=((T&&T.w)||0)*1.5;return Math.round(s)};
window.pbBallot=function(){const P={};S.T.forEach((t,i)=>{(rost('h.'+i)||[]).forEach((x,k)=>{if(!x||!x.n||k>24)return;const g=pbGrp(x.pos);if(!PBSL[g])return;const me=i==0&&k==0;
  const n=me?S.name:x.n,base=me?Math.round(qo(S.q)*1.2+((S.ss&&S.ss.yds)||0)/40+((S.ss&&S.ss.td)||0)*4-((S.ss&&S.ss.int)||0)*2+((t.w)||0)*1.5):pbScore(x,i);
  (P[g]=P[g]||[]).push({n,pos:x.pos,ti:i,conf:pbConf(t),tm:tAb(t),fan:base,me:me?1:0})})});return P};
window.pbVotes=function(c){const V=pbS();return c.fan*100+(V.u[c.n]||0)*Math.max(300,c.fan*8)};
window.pbClose=function(){const V=pbS();if(V.closed)return V;const P=pbBallot(),R_={RFC:{},LFC:{}};
 for(const g in PBSL)['RFC','LFC'].forEach(cf=>{R_[cf][g]=(P[g]||[]).filter(c=>c.conf===cf).sort((a,b)=>pbVotes(b)-pbVotes(a)).slice(0,PBSL[g]).map(c=>({n:c.n,pos:c.pos,tm:c.tm,me:c.me,v:pbVotes(c)}))});
 V.closed=1;V.r=R_;S.pbh=S.pbh||{};S.pbh[V.y]=[].concat(...['RFC','LFC'].map(cf=>[].concat(...Object.values(R_[cf]).map(L=>L.map(c=>c.n)))));
 try{const me=[...Object.values(R_.RFC),...Object.values(R_.LFC)].some(L=>L.some(c=>c.me));if(me)HM=(HM?HM+' ':'')+'🌴 You were voted to the Pro Bowl!'}catch(e){}return V};
window.pbMe=function(){const V=S.pbv;if(!V||V.y!==yrN()||!V.closed)return null;return (S.pbh[V.y]||[]).includes(S.name)};
// voting closes after week 17 (the first look at the menu after it)
(()=>{try{const _h=hub;hub=function(){try{if(S&&S.stage==='pro'&&!S.ofs&&((S.wk||0)>=17||S.pb)){const V=pbS();if(!V.closed)pbClose()}}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
window.pbVote=function(n){const V=pbS();if(V.closed)return pbV();const wk='w'+(S.wk||0);V.wk[wk]=V.wk[wk]||0;if(V.wk[wk]>=10){HM='You\'ve cast all 10 of your votes this week. Come back next week.';return pbV()}
 V.wk[wk]++;V.u[n]=(V.u[n]||0)+1;save();pbV()};
window.PBG='QB';
window.pbV=function(g){if(g)PBG=g;const V=pbS(),P=pbBallot();let body='';
 if(V.closed){body=['RFC','LFC'].map(cf=>`<div class=card><b>${cf} Pro Bowl roster</b>${Object.keys(PBSL).map(k=>`<div style="font-size:15px"><b>${k}</b> <small>${(V.r[cf][k]||[]).map(c=>(c.me?'▶ ':'')+esc(c.n)+' ('+c.tm+')'+(c.ub?' · in the Ultra Bowl':'')+(c.alt?' · replacing '+esc(c.for):'')).join(', ')}</small></div>`).join('')}</div>`).join('')+(V.g?`<div class=card><b>🌴 All-Star game</b><br>${V.g}</div>`:'')}
 else{const L=(P[PBG]||[]).sort((a,b)=>pbVotes(b)-pbVotes(a)).slice(0,24);const left=10-(V.wk['w'+(S.wk||0)]||0);
  body=`<div class=card><small>Fans vote all season; voting closes after week 17. You have <b>${left}</b> vote${left==1?'':'s'} left this week.</small></div><p class=tabs>${Object.keys(PBSL).map(k=>`<button class="${k==PBG?'':'g'}" onclick="pbV('${k}')">${k}</button>`).join('')}</p>
  <div class=card><b>${PBG} · ${PBSL[PBG]} per conference</b>${L.map((c,i)=>`<div class=row style="font-size:15px;gap:6px"><span>${i+1}. ${c.me?'▶ ':''}${esc(c.n)} <small>${c.tm} · ${c.conf}</small><br><small>${Math.round(pbVotes(c)/1000).toLocaleString()}k votes${V.u[c.n]?' · your votes '+V.u[c.n]:''}</small></span>${left>0?`<button class=g style="width:auto;flex:none" onclick="pbVote('${String(c.n).replace(/'/g,"\\'")}')">Vote</button>`:''}</div>`).join('')}</div>`}
 ui.innerHTML=`<div><h2>🗳 ${V.y} Pro Bowl${V.closed?' rosters':' voting'}</h2>${body}<button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0};
// Pro Bowl week for everyone (not by team): the All-Star game is played that week
(()=>{try{const _e=pevt;pevt=function(){const e=_e.apply(this,arguments);try{const B=S.pb;if(B&&!B.pbw&&(B.out||B.done)&&!S.psum&&e&&e.t==='sum'&&(B.r>=3))return {t:'pbw'}}catch(x){}return e}}catch(e){}})();
(()=>{try{const _d=pbwDo;window.pbwDo=function(){try{const V=pbClose();if(!V.g){const r=rng(hsh('pbg'+V.y+(S.seed||1))),a=17+Math.floor(r()*28),b=17+Math.floor(r()*28),w=a>=b?'RFC':'LFC',W=V.r[w],qb=(W.QB||[])[0];V.g=`RFC ${a} · LFC ${b}${a===b?' (tie)':''}. MVP: ${qb?esc(qb.n)+' ('+qb.tm+')':'—'}.`}}catch(e){}return _d.apply(this,arguments)}}catch(e){}})();
// the menu: a voting button during the season, rosters in Pro Bowl week
(()=>{try{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{if(S&&S.stage==='pro'&&!S.ofs&&!S.psum&&ui.style.display!='none'){const d=ui.firstElementChild;if(d&&!d.querySelector('[data-pbv]')){const V=pbS(),b=document.createElement('button');b.className='g';b.setAttribute('data-pbv','1');b.textContent=V.closed?'🌴 Pro Bowl rosters':'🗳 Pro Bowl voting';b.onclick=()=>pbV();const at=[...d.querySelectorAll('button')].filter(x=>x.getAttribute('data-blue')).pop()||[...d.querySelectorAll('button')].find(x=>/simUser|^play\(\)/.test(x.getAttribute('onclick')||''));if(at)at.insertAdjacentElement('afterend',b);else d.appendChild(b)}}}catch(e){}return r}}catch(e){}})();
// every player's card: his Pro Bowl years
(()=>{try{const _a=fcAwardsByYear;window.fcAwardsByYear=function(x){const o=_a.apply(this,arguments);try{for(const y in (S.pbh||{}))if((S.pbh[y]||[]).includes(x.n))(o[y]=o[y]||[]).push('Pro Bowl')}catch(e){}return o}}catch(e){}})();
// Tyler, 2026-11-14: "if you're in the Super Bowl, then someone usually gets your spot in the pro bowl, but they'll
// still list you as a pro bowler and then they'll list the new person as a pro bowler as well". In Pro Bowl week,
// every selected player on an Ultra Bowl team keeps the honour (marked "in the Ultra Bowl") and the next
// vote-getter at his position in his conference, from a team NOT in the game, takes his spot (also a Pro Bowler).
window.pbFinalists=function(){try{const B=S.pb;if(!B)return [];if(B.r===3&&B.pairs&&B.pairs[0])return B.pairs[0].map(i=>tAb(S.T[i]));const H=(B.hist||[])[3];if(H&&H[0])return [tAb(S.T[H[0][0]]),tAb(S.T[H[0][1]])]}catch(e){}return []};
window.pbReplace=function(){const V=pbClose();if(V.rep)return V;const F=pbFinalists();if(!F.length)return V;const P=pbBallot();
 ['RFC','LFC'].forEach(cf=>{for(const g in PBSL){const L=V.r[cf][g]||[];const taken=new Set(L.map(c=>c.n));
  L.filter(c=>F.includes(c.tm)&&!c.ub).forEach(c=>{c.ub=1;const nx=(P[g]||[]).filter(z=>z.conf===cf&&!F.includes(z.tm)&&!taken.has(z.n)).sort((a,b)=>pbVotes(b)-pbVotes(a))[0];
   if(nx){taken.add(nx.n);L.push({n:nx.n,pos:nx.pos,tm:nx.tm,me:nx.me,v:pbVotes(nx),alt:1,for:c.n});(S.pbh[V.y]=S.pbh[V.y]||[]).includes(nx.n)||S.pbh[V.y].push(nx.n)}})}});
 V.rep=1;return V};
(()=>{try{const _d=pbwDo;window.pbwDo=function(){try{pbReplace()}catch(e){}return _d.apply(this,arguments)}}catch(e){}})();
