// ===== 📊 LEAGUE STATS = THIS SEASON, THROUGH THIS WEEK · RECEIVING LIKE REAL FOOTBALL =====
// Tyler, 2026-11-15: "In the league stats section ... it should just be the current year, which is obviously 2026, and it should also
// just show where it's at for the current week ... Each game that happens has to be documented, and their stats need to document by
// week to the season stats ... you probably need a games played stat somewhere ... how many 1,000-yard seasons are there really?"
// 1. The league stats page opens on the season being played, built from the box score of every game played so far (the same
//    numbers as each game's "Full game stats" and each player's card), with games played (G) on every line. Past seasons stay
//    under their year buttons. Nothing is shown for a week that hasn't been played.
// 2. Receiving: catches were split by fixed shares (the No. 1 wideout always 30%), so ~35 receivers passed 1,000 yards a season
//    (real: 22-28). Now the shares depend on how good each receiver is (plus a team tendency that stays the same all season), and
//    a backup receiver or tight end gets a few targets too. Starts with games played after this update (same stamp as rushing).
window.bxRecv2=function(ti,L,r){try{if(typeof bxNew!='function'||!bxNew()||typeof bxNew2!='function'||!bxNew2())return null;
 const rs=bxRng(bxHash('recv|'+ti+'|'+yrN()+'|'+(S.seed||1))),t=[rs(),rs(),rs(),rs(),rs()];
 const k=[2,3,4,5,1],base=[.22,.17,.13,.15,.14],av=[12.2,11.8,11,10.2,7.2],tw=[.32,.22,.12,.22,.07];
 const ov=k.map(j=>(L[j]&&L[j].ovr)||72),mean=ov.reduce((a,b)=>a+b,0)/ov.length;
 const w=base.map((b,i)=>cl(b*(1+(ov[i]-mean)*.022)*(.78+t[i]*.44),.04,.42));
 // a backup receiver / tight end (bench) gets some looks too
 const bks=L.map((x,j)=>({x,j})).filter(o=>o.j>=25&&o.x&&!o.x.inj&&(o.x.pos==='WR'||o.x.pos==='TE')).slice(0,2);bks.forEach((o,i)=>{k.push(o.j);w.push(i===0?.14+(t[0]>.5?.03:0):.08);av.push(10.4);tw.push(i===0?.05:.02)});
 // the top receiver's share of the team's passing YARDS is capped (an elite No. 1 gets ~40%, an average one ~28%); the rest is spread to the others
 {const yw=w.map((v,i)=>v*av[i]),sm0=yw.reduce((a,b)=>a+b,0),mi=yw.indexOf(Math.max(...yw)),cap=cl(.185+((ov[mi]||75)-72)*.009+(t[1]-.5)*.06,.18,.42);if(yw[mi]/sm0>cap){const ex=yw[mi]-cap*sm0,rest=sm0-yw[mi];yw[mi]-=ex;yw.forEach((v,i)=>{if(i!==mi)yw[i]=v+ex*v/rest})}yw.forEach((v,i)=>{w[i]=v/av[i]})}
 const sm=w.reduce((a,b)=>a+b,0);return {k,w:w.map(x=>x/sm),av,tw}}catch(e){return null}};
// ---- the current season on the league stats page ----
window.lgsCurOk=function(){try{return S&&S.stage==='pro'&&!(S.sled===S.py)&&Object.keys(S.gr||{}).length>0}catch(e){return false}};
(()=>{try{const _y=lgsYears;lgsYears=function(lv){const L=_y.apply(this,arguments);try{if(lv==='p'&&lgsCurOk()){const c=yrN();if(!L.includes(c))L.push(c)}}catch(e){}return L}}catch(e){}})();
window.lgsCurBody=function(){const Y=yrN(),D=szGet(),rows=[];for(const ti in D){const T=D[ti];for(const n in T){const z=T[n];if(z&&z.g>0)rows.push({...z,ti:+ti})}}
 const wk=Math.max(0,...rows.map(z=>z.g),0),card=(x,ti)=>{const L=rost('h.'+ti)||[];const k=L.findIndex(p=>p&&p.n===x.n);return k>=0?`pCard(${ti},${k})`:null};
 const tab=(ttl,h,R,v,x)=>`<div class=card><b>${ttl} · ${Y}</b>${lgsTh(h)}${R.slice(0,15).map((z,i)=>lgsTr(`${i+1}. ${z.n===S.name?'▶ ':''}${z.n}`,TA[z.ti]+(x?' · '+x(z):'')+' · '+z.g+' G · '+(z.gs||0)+' GS',v(z),card(z,z.ti))).join('')||'<div class=row><small>Nothing yet.</small></div>'}</div>`;
 const P=rows.filter(z=>z.pa>0).sort((a,b)=>b.py-a.py),Ru=rows.filter(z=>z.car>0).sort((a,b)=>b.ry-a.ry),Re=rows.filter(z=>z.rec>0).sort((a,b)=>b.recy-a.recy),Sk=rows.filter(z=>z.sck>0).sort((a,b)=>b.sck-a.sck),In=rows.filter(z=>z.intc>0||z.tkl>0).sort((a,b)=>(b.intc*10+b.tkl)-(a.intc*10+a.tkl));
 const st=[0,1,2,3,4,5,6,7].map(di=>`<p style="margin:8px 0 2px"><small><b>${(S.pro[di*4]&&S.pro[di*4].dv)||''}</b></small></p>`+S.T.map((t,i)=>({t,i})).filter(o=>Math.floor(pIdx(o.t)/4)===di).sort((a,b)=>(b.t.w||0)-(a.t.w||0)).map(o=>`<div class=row style="font-size:15px"><span>${tn(o.t)}</span><b>${o.t.w||0}-${o.t.l||0}${o.t.t?'-'+o.t.t:''}</b></div>`).join('')).join('');
 return `<div class=card><small>📅 ${Y} season through week ${S.wk||wk}: every number below comes from the games played so far (tap a name for his card).</small></div>`+tab('Passing',['QB','YDS','TD','INT'],P,z=>[z.py.toLocaleString(),z.ptd,z.pint],z=>z.pc+'/'+z.pa)+tab('Rushing',['RB/QB','YDS','TD'],Ru,z=>[z.ry.toLocaleString(),z.rtd],z=>z.car+' att')+tab('Receiving',['WR/TE/RB','YDS','TD'],Re,z=>[z.recy.toLocaleString(),z.rectd],z=>z.rec+' rec')+tab('Sacks',['DEF','SACKS'],Sk,z=>[z.sck])+tab('Interceptions & tackles',['DEF','INT','TKL'],In,z=>[z.intc,z.tkl])+`<div class=card><b>Standings · ${Y}</b>${st}</div>`};
(()=>{try{const _v=lgsV;lgsV=function(lv,y){if(!lv&&!y)LGS.pick=0;if(y)LGS.pick=1;if(lv&&!y&&!LGS.pick&&lv==='p'&&lgsCurOk())LGS.y=yrN();if(!lv&&!y&&lgsCurOk()&&LGS.lv!=='c')LGS.y=yrN();
 const r=_v.apply(this,arguments);try{if(LGS.lv==='p'&&LGS.y===yrN()&&lgsCurOk()){const yrsP=ui.querySelectorAll('p.tabs')[1];const old=[...ui.querySelectorAll('.card')];old.forEach(c=>c.remove());const bk=ui.querySelector('button[onclick="hub()"]');const d=document.createElement('div');d.innerHTML=lgsCurBody();if(bk)bk.parentNode.insertBefore(d,bk);else ui.firstElementChild.appendChild(d)}}catch(e){console.warn(e)}return r}}catch(e){}})();
