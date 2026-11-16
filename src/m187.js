// ===== 🧓 RETIREMENTS: stars don't walk away while they're still stars · bring a player back up to 3 years later =====
// Tyler, 2026-11-15 (screenshot: Jarsh Fallon and Ricky MaClones retiring the same offseason as Matty Gafford): "explain why ...
// already retired ... If it's my rules, then that needs to be adjusted ... make it where you can override retirements up to three
// years after retirement. unless they're 41 or older, then you can do two years after retirement".
// WHY: not his rule. From 35, every QB got a yearly retirement roll (8% at 38) whatever his rating, so a 98 OVR could retire at 38.
// NOW: a QB still rated 90+ retires only 1 year in 100 until 41 (then half the normal chance); 85-89: about a third of the normal
// chance; below that, unchanged. Override: any notable player who retired can be talked back for up to 3 seasons after (2 if he
// was 41 or older), still at most twice in his career. He comes back to the team he retired from (added to the roster, nobody
// removed), a year older for each season away and a few points rusty.
(()=>{try{const _q=qbRet;qbRet=function(x){const a=x.age||25,o=x.ovr||0;if(a<35||a>=50)return _q.apply(this,arguments);if(a>=45){if(x.lgv==null)x.lgv=R()<.1?1:0;return R()<(RTP[a]||.5)*(x.lgv?.12:1)}   /* Tyler: from 45 the table's chances apply to everyone, greats too (45: 50%); the rare lifer still can reach 50 */
 if(o>=90&&a<=41)return R()<.01;const r=_q.apply(this,arguments);if(!r)return false;if(o>=90)return R()<.5;if(o>=85)return R()<.35;return true}}catch(e){}})();
// keep this offseason's retirements when the next offseason starts (they used to be cleared)
(()=>{try{const _l=leagueDev;leagueDev=function(){try{S.retArc=S.retArc||[];(S.retq||[]).forEach(e=>{if(e&&!e.done&&!S.retArc.some(z=>z.s&&z.s.n===e.s.n&&z.py===e.py))S.retArc.push(e)});if(S.retArc.length>200)S.retArc.splice(0,S.retArc.length-200)}catch(e){}return _l.apply(this,arguments)}}catch(e){}})();
window.retWin=function(e){const age=(e.s&&e.s.age)||30,lim=age>=41?2:3,yrs=(S.py||1)-(e.py||0);return yrs>=1&&yrs<=lim&&(e.s.orv||0)<2&&!e.done};
window.retArcOpen=function(){try{return S.stage=='pro'&&(S.wk||0)==0&&!S.pb&&(S.retArc||[]).some(retWin)}catch(e){return false}};
window.retBack=function(j){const e=(S.retArc||[])[j];if(!e||!retWin(e)||!retArcOpen())return retV();const yrs=(S.py||1)-e.py,x=JSON.parse(JSON.stringify(e.s));
 x.age=(x.age||30)+yrs;x.ovr=Math.max(40,(x.ovr||60)-3*yrs);x.orv=(x.orv||0)+1;x.back=(x.back||0)+1;const i=e.i>=0&&S.T[e.i]?e.i:1,L=rost('h.'+i);
 if(L.some(y=>y&&y.n===x.n)){HM=x.n+' is already on a roster.';return retV()}L.push(x);e.done=1;
 if(S.alum){for(let a=S.alum.length-1;a>=0;a--)if(S.alum[a].n==x.n){S.alum.splice(a,1);break}}
 try{lgTx({t:'unretire',n:x.n,pos:x.pos,ovr:x.ovr,age:x.age,from:'Retired',to:(tAb?tAb(S.T[i]):''),d:'Comes out of retirement after '+yrs+' season'+(yrs>1?'s':''),big:true})}catch(_){}
 save();talk('mate',x.n,['I tried retirement. I wasn\'t done.','The itch never went away. I\'m back.','One more run. Let\'s go.'][ri(0,2)],'happy',[['Welcome back','ovHide();retV()']],x.pos+' · back with the '+tn(S.T[i])+' after '+yrs+' season'+(yrs>1?'s':'')+' away')};
(()=>{try{const _v=retV;retV=function(){const r=_v.apply(this,arguments);try{const A=(S.retArc||[]).map((e,j)=>({e,j})).filter(z=>retWin(z.e));if(!A.length)return r;const d=ui.firstElementChild||ui,c=document.createElement('div');c.className='card';
 c.innerHTML='<b>Retired in past seasons</b><br><small>You can bring a player back for up to 3 seasons after he retires (2 if he retired at 41 or older), twice in his career. He returns to his last team.</small>'+A.map(({e,j})=>{const x=e.s,yrs=(S.py||1)-e.py,lim=(x.age||30)>=41?2:3;return `<div class=row style="font-size:16px;gap:6px;align-items:flex-start"><span style="min-width:0"><b>${esc(x.n)}</b> <small>${x.pos} · retired ${yrs} season${yrs>1?'s':''} ago at ${x.age} · was ${x.ovr} OVR · ${lim-yrs} more season${lim-yrs==1?'':'s'} to decide</small></span>${retArcOpen()?`<button class=g style="flex:none" onclick="retBack(${j})">Bring him back</button>`:''}</div>`}).join('');
 const back=[...d.querySelectorAll(':scope > button')].pop();if(back)d.insertBefore(c,back);else d.appendChild(c)}catch(e){}return r}}catch(e){}})();
(()=>{try{const _b=retBtn;retBtn=function(){const r=_b.apply(this,arguments);if(r)return r;try{if(retArcOpen())return '<button class=g onclick=retV()>🧓 Retirements: bring a player back</button>'}catch(e){}return r}}catch(e){}})();
// Tyler, 2026-11-15: "why would Jalen Rammer get his jersey retired at Pittsburgh? ... Maybe the Jaguars or the Rams". The jersey
// went to the team he RETIRED from. Now: the team he played the most seasons for (a tie goes to the earlier team).
window.rjBest=function(x,t){try{const H=x.h||[],cnt={},first={};H.forEach((r,k)=>{const ti=r&&r[1];if(ti==null||ti<0)return;cnt[ti]=(cnt[ti]||0)+1;if(first[ti]==null)first[ti]=k});const ks=Object.keys(cnt);if(!ks.length)return rjCode(t);
 ks.sort((a,b)=>cnt[b]-cnt[a]||first[a]-first[b]);const best=+ks[0];const cur=pIdx(t);if(cur>=0&&cnt[cur]>=cnt[best])return rjCode(t);return TA[best]||rjCode(t)}catch(e){return rjCode(t)}};
// Tyler, same day: "my two biggest quarterbacks ... retiring so damn early ... I don't mind you putting me back at the beginning of the
// season so I can send it with the right players in". One time per save: any QB who retired THIS offseason while still 90+ OVR and
// 41 or younger (the new rule says he wouldn't have) comes back to his team. Before the first game he takes his old spot back
// (the 2K-style override, which doesn't use up one of his two); after it he is added to the roster.
window.ret90Fix=function(){try{if(!S||S.ret90||S.stage!=='pro'||!Array.isArray(S.retq))return 0;S.ret90=1;const back=[];
 S.retq.forEach((e,j)=>{const x=e&&e.s;if(!x||e.done||e.py!==S.py||x.pos!=='QB'||(x.ovr||0)<90||(x.age||0)>41)return;const L=rost('h.'+e.i);if(!L||L.some(y=>y&&y.n===x.n))return;
  const ix=(S.wk||0)===0&&!S.pb?L.findIndex(y=>y&&y.n===e.nw):-1;const p=JSON.parse(JSON.stringify(x));if(ix>=0)L[ix]=p;else L.push(p);e.done=1;
  if(S.rets)S.rets=S.rets.filter(n=>n!==x.n);if(S.alum){for(let a=S.alum.length-1;a>=0;a--)if(S.alum[a].n===x.n){S.alum.splice(a,1);break}}
  if(e.i&&L[23]&&L[0]&&L[23].ovr>L[0].ovr+1){[L[0],L[23]]=[L[23],L[0]]}back.push(x.n+' ('+x.ovr+' OVR)')});
 if(back.length){S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🔙 Back from retirement: '+back.join(', ')+'. Under the new rule a QB still that good keeps playing.';save()}return back.length}catch(e){return 0}};
(()=>{try{const _h=hub;hub=function(){try{ret90Fix()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
