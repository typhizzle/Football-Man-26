// ===== 💪 Throwing power: Tyler's distance table, level scaling, archetype upgrade costs =====
// Tyler, 2026-11-14: his table (99 = 85 yds … 72 = 54 yds); "in high school you can scale it down 15%
// and then college … 6.5%"; power and speed "shouldn't go down until you start regressing in pro";
// harder to upgrade; "mobile should have a speed boost … Strong arms should have throw power, easier to
// get. Field general should have accuracy, easier to get … I kind of liked how you balanced it with
// scrambling strong arm." Old range: 14 + pow*0.55 (68 yds at 99).
window.PWCURVE=[[40,38],[60,48],[72,54],[82,59],[88,66.5],[90,71],[92,72],[94,75],[95,76],[96,78.5],[97,81],[98,83],[99,85],[100,86]];
window.pwYds=function(p){p=+p||60;const C=PWCURVE;if(p<=C[0][0])return C[0][1];for(let i=1;i<C.length;i++){if(p<=C[i][0]){const[a,b]=C[i-1],[c,d]=C[i];return b+(d-b)*(p-a)/(c-a)}}return C[C.length-1][1]};
window.pwLv=function(){const st=(S&&S.stage)||'pro';return st==='hs'?.85:st==='col'?.935:1};
// his exact numbers for the men he named (power, yards). Matched by name only to SET a rating; a name
// shared by two men in a save is skipped.
window.PWNAMES={'Jacque Hilton III':[99,85],'Jarsh Fallon':[98,83],'Ricky MaClones':[97,81],'Jort Valentine':[97,81],'Antonio Ricard':[97,81],
 'Femmifer Allen':[96,80],'Drako September':[96,80],'Just Chillin':[96,79],'Miguel Penits II':[96,78],'Bacon Maple':[96,77],'Mallet Williams':[96,77],
 'Matty Gafford':[95,76],'Franklin Lawford':[94,75],'Coleridge Loud':[92,72],'Eric Rodney':[92,72],'Charvarious McWharton':[90,71],'Kyler Kerr':[90,71],
 'Lamarcus Action':[88,66],'Jack Mascott':[88,67],'Dustin Planes':[81,58],'Jay-Jay Pain':[82,59],'Tooth Nah':[72,54]};
// your own arm: the table, then the level you play at. thrR is a CONST in the base game, so it is
// patched at its source in p47 (assigning to it here would throw and kill the script).
// computer QBs carry the power he gave them (a new rating; their overall is NOT changed)
window.pwSet=function(s){try{if(!s||!s.ro)return 0;const seen={},L=[];
 sealWalk(s,x=>{if(x&&x.pos==='QB'&&PWNAMES[x.n]){(seen[x.n]=seen[x.n]||[]).push(x);L.push(x)}});let n=0;
 L.forEach(x=>{if(seen[x.n].length>1)return;const [p,y]=PWNAMES[x.n];if(x.pw!==p||x.pwy!==y){x.pw=p;x.pwy=y;n++}});return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{pwSet(s)}catch(e){}return s}}catch(e){}})();
// ---- upgrade cost (training points per +1). Normal ratings 2. ----
window.UPC0={pow:4,mob:4};
window.UPCA={'Mobile':{mob:3,pow:6},'Deep passer':{pow:3,mob:6},'Field General (balanced)':{acc:1,pow:4,mob:6},'Scrambling strong arm':{pow:3,mob:3,acc:3,awr:3}};
window.upCost=function(k){const a=UPCA[(S&&S.arch)||'']||{};return a[k]!=null?a[k]:UPC0[k]!=null?UPC0[k]:2};
window.upCostTxt=function(k){const c=upCost(k);return c===2?'':' ('+c+' pts)'};
up=function(k){const c=upCost(k);if(S.q[k]>=99)return hub();if(S.pts<c){HM='+1 '+({acc:'Accuracy',pow:'Throw power',awr:'Awareness',mob:'Speed',sec:'Carrying',trk:'Truck'}[k]||k)+' costs '+c+' training points. You have '+S.pts+'.';return hub()}
 S.pts-=c;S.q[k]++;save();hub()};
// ---- power and speed never go DOWN before pro age regression (the level-change rescale used to cut them) ----
(()=>{try{const _r=rescaleTo;rescaleTo=function(T){const q=S&&S.q;if(!q)return _r.apply(this,arguments);const P=q.pow,M=q.mob;const r=_r.apply(this,arguments);
 try{if(q.pow<P||q.mob<M){q.pow=Math.max(q.pow,P);q.mob=Math.max(q.mob,M);const O=['acc','awr','sec','trk'];
  for(let g=0;g<200&&qo(q)>T;g++){const k=O.filter(x=>q[x]>25).sort((a,b)=>q[b]-q[a])[0];if(!k)break;q[k]--}}}catch(e){}return r}}catch(e){}})();
// ---- show the arm on a QB's card ----
(()=>{try{const _c=pCard;pCard=function(i,j){const r=_c.apply(this,arguments);try{const x=rost('h.'+i)[j];if(x&&x.pos==='QB'&&x.pw){const d=ui.querySelector('.card');if(d&&!d.querySelector('[data-pw]'))d.insertAdjacentHTML('beforeend',`<br><small data-pw=1>💪 Throw power ${x.pw} · max ${x.pwy||Math.round(pwYds(x.pw))} yds</small>`)}}catch(e){}return r}}catch(e){}})();
