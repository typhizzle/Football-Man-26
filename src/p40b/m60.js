// ===================== 🎭 PLAY AS AN EXISTING PRO QB =====================
// Start a new career as any quarterback already in the league, at his age, rating, team, money, titles and awards.
// (Past season-by-season stats were never tracked for league QBs, so his career totals so far are estimated from his age and rating.)
function goatOf(n){try{const e=GOAT.find(x=>x.n==n);return e?{teams:e.t,rings:e.r||0,ubmvp:e.s||0,mvp:e.m||0}:null}catch(e){return null}}
function tkList(){return (S.pro||[]).map((t,i)=>{const q=QBP[pIdx(t)];return q?{i,n:q[0],ovr:q[1],age:q[2],team:tn(t)}:null}).filter(Boolean).sort((a,b)=>b.ovr-a.ovr)}
// from the "new career" screen: build the world, then pick who you want to be
function tkStart(){try{start()}catch(e){console.warn(e)}setTimeout(tkPick,60)}
function tkPick(){const L=tkList();ui.style.display='block';ovHide();ui.innerHTML=`<div><h2>🎭 Play as an existing QB</h2><div class=card><small>You take over his career where it is right now: his team, age, rating, contract, money, titles and awards. Your career starts at week 1 of the season.</small></div>
 <div class=card>${L.map((e,k)=>{const G=goatOf(e.n);return `<div class=row style="font-size:16px;gap:6px"><span><b>${esc(e.n)}</b> <small>${esc(e.team)}</small><br><small>QB ${e.ovr} · age ${e.age}${QBC[e.n]?' · $'+QBC[e.n][0]+'M/yr, '+QBC[e.n][1]+' yr'+(QBC[e.n][1]>1?'s':'')+' left':''}${G&&(G.rings||G.mvp)?' · '+(G.rings?G.rings+'× champ':'')+(G.mvp?' '+G.mvp+'× MVP':''):''}</small></span><button class=g style="width:auto;flex:none" onclick="tkGo(${e.i})">Play</button></div>`}).join('')}</div><button class=g onclick=menuMain()>Back</button></div>`;ui.scrollTop=0}
function tkGo(ti){const e=tkList().find(x=>x.i==ti);if(!e)return;const G=goatOf(e.n)||{rings:0,ubmvp:0,mvp:0},yrs=Math.max(1,e.age-21);
 S.name=e.n;S.age=e.age;S.dr={done:0,pk:224,P:[],picks:[]};S.npxd=1;try{proStart(ti,-1)}catch(err){console.warn(err)}ovHide();
 {const b0={...S.q};let lo=31,hi=160,best=null;for(let k=0;k<30;k++){const m=(lo+hi)/2;S.q={...b0};rescaleTo(m);const o=qo(S.q);if(!best||Math.abs(o-e.ovr)<Math.abs(qo(best)-e.ovr))best={...S.q};if(o<e.ovr)lo=m;else if(o>e.ovr)hi=m;else break}S.q=best}S.py=yrs;S.age=e.age;const L=rost('h.0'),bu=L.slice(1).find(x=>x&&x.pos=='QB')||L[1];S.vetP=bu?{...bu}:null;S.vet=bu?bu.n:'Backup';S.sq=bu?bu.ovr:60;
 const rc=QBC[e.n],sal=rc?rc[0]:+Math.max(1,(e.ovr-68)*1.9).toFixed(1);S.ct={yrs:rc?rc[1]:2+(e.ovr>=90?2:1),sal,gtd:e.ovr>=88?80:40,inc:0,team:tn(S.T[0])};
 // money he already made (after taxes and spending), fans, titles, awards
 S.cash=Math.round(yrs*Math.max(sal,(e.ovr-68)*1.6)*.42*1e6/1000)*1000;S.pop=cl(Math.round(55+(e.ovr-80)*1.6+G.rings*3+G.mvp*2),40,100);
 S.aw=[];const yr0=n=>'Pro yr '+Math.max(1,Math.min(yrs,Math.round(1+(yrs-1)*(n+1)/(Math.max(G.rings,G.mvp,1)+1))))+': ';
 for(let k=0;k<G.rings;k++)S.aw.push(yr0(k)+'Ultra Bowl Champion');for(let k=0;k<G.ubmvp;k++)S.aw.push(yr0(k)+'Ultra Bowl MVP');for(let k=0;k<G.mvp;k++)S.aw.push(yr0(k)+'MVP');if(e.ovr>=90)S.aw.push('Pro yr '+yrs+': Pro Bowl');
 // career totals so far (estimated)
 const n=yrs-1,g=n*17,att=n*540,cmp=Math.round(att*cl(.6+(e.ovr-75)/250,.55,.7)),yds=Math.round(att*cl(6.8+(e.ovr-75)/30,6,8.5)),td=Math.round(n*cl(20+(e.ovr-75)*.6,12,45)),it=Math.round(n*cl(12-(e.ovr-75)*.2,5,16)),w=Math.round(g*cl(.45+(e.ovr-75)/60,.3,.78));
 S.cst={pro:{reg:{...Z(),g,w,l:g-w,att,cmp,yds,td,int:it,ry:n*180,rtd:n*2,sk:n*30,fum:n*4},post:{...Z()}}};S.cs={...S.cst.pro.reg};
 // a place to live that fits the money
 S.hz=S.cash>=30e6?'estate':S.cash>=9e6?'mansion':S.cash>=2.5e6?'lux':S.cash>=750000?'house2':'apt';S.hzo=[S.hz];S.tk=e.n;
 HM='🎭 You are now '+e.n+' of the '+tn(S.T[0])+'. Career totals before today are estimated from his age and rating.';save();hub()}
// real-life counterpart contracts (2026 season): [millions per year, years left including this one]
const QBC={'Gene Smothers':[19.5,1],'Jarsh Fallon':[55,5],'Mallet Williams':[22.5,3],'Drako September':[9.2,3],'Lamarcus Action':[52,2],'Eric Rodney':[22,1],'DaSettlement Won':[46,1],'Joseph Shiesty':[55,4],'Coleridge Loud':[9.1,1],'DJ Scones':[44,2],'Charvarious McWharton':[12.2,3],'Franklin Lawford':[55,5],'Ricky MaClones':[63,6],'No Pix':[4.5,2],'Kirko Chainz':[11.3,1],'Just Chillin':[52.5,4],'Jay-Jay Pain':[51,3],'Jack Mascott':[60,3],'Jay Copyright':[9.4,2],'Jake Mobile':[5.9,3],'Femmifer Allen':[9.9,2],'Tylard Phillipson':[53,3],'Jort Valentine':[55,3],'Kyle Kerr':[1.3,1],'Miguel Penits II':[4.7,2],'Skylar Shook':[2.4,3],'Bacon Maple':[55,4],'Bruce Old':[9.5,1],'Eddie Pretty':[53,5],'Ham Luther':[33.5,2],'Jake Efficiency':[6.25,1],'Matty Gafford':[55,2]};
