// ===== 🔁 DRAFT-DAY TRADES (that make sense, never forced) =====
// Tyler, 2026-11-15: "I feel like there's about 2 or 3 draft day trades a year, at least in the first round, maybe more ... don't
// force anything ... see if you can find how many trades are really usually traded in the first round. And then see in all rounds
// ... You can make it slightly less than the average ... Make the trades make sense."
// Real NFL (recent years): ~5-6 trades involving first-round picks during the draft, ~30-40 trades over the whole draft. Aim: a
// little under that (about 3-5 in round 1, 15-25 overall).
// HOW: before a pick, a team picking later in the same round looks at the best players left. If one of them fills a real need
// for it (position it's short at; a quarterback when its QB need is C+ or lower) and it wants him clearly more than the team on
// the clock does, it may trade up: the two teams swap spots for the rest of that round and the team moving up also hands over a
// later-round pick (shown in the trade). Bigger jumps cost more and happen less. Teams with nothing to gain don't trade.
window.DTP=[.15,.12,.11,.1,.09,.08,.07];   // chance per pick, by round, that a WILLING trade partner actually makes the call
window.DTG=1.6;window.DTA=.5;window.DTMAX=18;   // Tyler: round 1 0-5, "doesn't need to be more than 15 to 20 trades total", fewer is better   // how much more the other team must want him; chance the team on the clock agrees
window.DTC=2.2;
window.dtNeed=function(L,G){try{return Math.max(0,LGN[G]-lgCount(L,G))}catch(e){return 0}};
window.dtWant=function(T,p){const G=lgGrp(p.pos);let w=(p.gr||p.ovr||60)+dtNeed(T.L,G)*2.5;if(typeof qbAdj=='function'&&p.pos==='QB')w+=qbAdj(T.pi!=null?T.pi:pIdx(T.t),p);return w};
// the yearly league draft: may swap the team on the clock with a later team in this round
window.dtLg=function(ordR,j,rd,P,Y){try{const T=ordR[j];if(!T)return T;if(R()>DTP[rd-1]*3.2)return T;{const L0=(S.dtr||{})[Y]||[];if(L0.filter(x=>x.rd==rd).length>=(rd==1?5:4)||L0.length>=DTMAX)return T}   /* most picks: nobody calls */
 const top=P.filter(p=>!p.tk).sort((a,b)=>(b.gr||0)-(a.gr||0)).slice(0,6);if(!top.length)return T;const mine=Math.max(...top.map(p=>dtWant(T,p)));let best=null,gain=0,bk=-1;
 for(let k=j+1;k<Math.min(ordR.length,j+12);k++){const U=ordR[k];if(!U||U===T)continue;const w=Math.max(...top.map(p=>dtWant(U,p)));const g=w-mine-(k-j)*.45;if(g>gain){gain=g;best=U;bk=k}}
 if(!best||gain<DTG||R()>DTA)return T;   /* a real reason, and the team on the clock still has to say yes */
 ordR[j]=best;ordR[bk]=T;const no=(rd-1)*ordR.length+j+1,no2=(rd-1)*ordR.length+bk+1;S.dc=S.dc||{};(S.dtr=S.dtr||{})[Y]=(S.dtr[Y]||[]);const dd=`Draft-day trade: ${best.code} move up from pick ${no2} to pick ${no}; ${T.code} get pick ${no2} and a round ${Math.min(7,rd+1)} pick`;S.dtr[Y].push({rd,from:T.code,to:best.code,up:no,down:no2,extra:Math.min(7,rd+1),d:dd});
 try{lgTx({t:'trade',n:'Pick '+no,pos:'',ovr:0,age:0,from:T.code,to:best.code,d:dd,big:rd==1})}catch(e){}return best}catch(e){return ordR[j]}};
// the college -> pro draft (your draft): same idea, any pick, any round
window.dtCol=function(){try{const D=S.dr;if(!D||D.pk>=224)return;D.swap=D.swap||{};const pk=D.pk,rd=Math.floor(pk/32)+1,tOf=k=>D.swap[k]!=null?D.swap[k]:D.ord[k%32];const ti=tOf(pk);
 if(D.dtDone&&D.dtDone[pk])return;(D.dtDone=D.dtDone||{})[pk]=1;if(R()>DTP[rd-1]*3.2*DTC)return;D.dtn=D.dtn||{};if((D.dtn[rd]||0)>=(rd==1?5:4)||Object.values(D.dtn).reduce((a,b)=>a+b,0)>=DTMAX)return;
 const top=D.P.map((p,i)=>({p,i})).filter(x=>!x.p.tk).sort((a,b)=>dsc(b.p)-dsc(a.p)).slice(0,6);if(!top.length)return;
 const want=(t,p)=>dsc(p)+(typeof qbAdj=='function'?qbAdj(t,p)*.8:0)+(p.me?((D.int||{})[t]||0):0);const mine=Math.max(...top.map(x=>want(ti,x.p)));
 let best=-1,gain=0,bk=-1;const end=Math.min(rd*32,224);for(let k=pk+1;k<Math.min(end,pk+12);k++){const u=tOf(k);if(u===ti)continue;const w=Math.max(...top.map(x=>want(u,x.p)));const g=w-mine-(k-pk)*.45;if(g>gain){gain=g;best=u;bk=k}}
 if(best<0||gain<DTG||R()>DTA)return;D.dtn[rd]=(D.dtn[rd]||0)+1;D.swap[pk]=best;D.swap[bk]=ti;(D.news=D.news||[]).push(`🔁 TRADE: the ${tn(S.pro[best])} move up from pick ${bk+1} to pick ${pk+1}. The ${tn(S.pro[ti])} get pick ${bk+1} and a round ${Math.min(7,rd+1)} pick.`)}catch(e){}};
(()=>{try{const _s=dSel;dSel=function(){try{dtCol()}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();

// 📺 watching a draft (live or from the list): a trade is announced on the stage before the team that moved up picks
(()=>{try{const _s=dnSel;dnSel=function(){const N=DN,D=S.dr,n0=N&&N.src=='live'&&D&&D.news?D.news.length:0;const c=_s.apply(this,arguments);try{if(c&&N){
 if(N.src=='board'){const t=((S.dtr||{})[N.yr]||[]).find(x=>x.up===c.pk);if(t){const T1=S.pro[TA.indexOf(t.to)],T0=S.pro[TA.indexOf(t.from)];c.tr=`🔁 TRADE! The ${T1?tn(T1):t.to} move up to pick ${t.up}. The ${T0?tn(T0):t.from} get pick ${t.down} and a round ${t.extra} pick.`}}
 else{const nw=(D.news||[]).slice(n0).filter(x=>/TRADE/.test(x));if(nw.length)c.tr=nw[nw.length-1].replace('🔁 TRADE:','🔁 TRADE!')}}}catch(e){}return c}}catch(e){}})();
(()=>{try{const _b=dnBan;dnBan=function(who,txt){try{const c=DN&&DN.cur;if(c&&c.tr&&!c.trShown&&/on the clock/.test(txt||'')){c.trShown=1;DN.t-=2.5;return _b.call(this,typeof COMM!='undefined'?COMM:'',`<b style="color:#ffe93b">${c.tr}</b><br>`+txt)}}catch(e){}return _b.apply(this,arguments)}}catch(e){}})();
