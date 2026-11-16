// ===================== 🎽 YOUR RETIRED-NUMBER LIST + the owner decides on your number =====================
(()=>{const add=(c,s)=>{RJ0[c]=(RJ0[c]?RJ0[c]+';':'')+s};
 RJ0.DEN=RJ0.DEN.replace('18 Frank Tripucka','18 Frank Tripucka & Pete Manling');
 add('IND','12 Andrew Luck');add('HOU','99 J.J. Watt');add('BOS','87 Rob Gronkowski');
 add('PHI','9 Nick Foles;25 LeSean McCoy;55 Brandon Graham;65 Lane Johnson;71 Jason Peters;86 Zach Ertz;91 Fletcher Cox');
 add('CHA','1 Cameron Nugent;59 Luke Kuechly')})();
// stars whose numbers go up the day they retire
const RJW={'Ricky MaClones':['KC',15],'Eric Rodney':['GB',12],'Matty Gafford':['LAG',9],'Eric Darnold':['LAG',99],'Meters Ferret':['CLE',95],'Teej Waddle':['PIT',90],
 'Tay Johnson':['IND',28],'Daryl Henny':['NSH',22],'Tractor Swift':['KC',87],'Jacob Jackson':['MIN',18]};
(()=>{const _c=cpuRet;cpuRet=function(x,t){const n=x.n,r=_c.apply(this,arguments);try{if(r&&RJW[n]){const[code,num]=RJW[n];if(rjAdd({code,num,n,pos:'',yr:yrN()}))S.rjMsg=(S.rjMsg?S.rjMsg+' ':'')+`🎽 The ${lhTeam(code)} retired #${num} for ${n}.`}}catch(e){}return r}})();
// ---- your number: the owner weighs what you did for HIS franchise against how much history it already has ----
function rjOwner(){if(!S||S.rjMe)return;const H=S.hist||[],per={};const aw=S.aw||[];
 H.forEach((h,k)=>{const y=String(h.y||'');if(y[0]!='P')return;const tm=(S.htm||[])[k];if(!tm)return;const p=per[tm]=per[tm]||{s:0,yds:0,td:0,ring:0,mvp:0,sbm:0,opoy:0,ap:0,pb:0,ringY:[]};p.s++;p.yds+=h.yds||0;p.td+=h.td||0;
  const pre='Pro yr '+y.slice(1)+':',A=aw.filter(a=>a.startsWith(pre));if(A.some(a=>/Ultra Bowl Champion/.test(a))){p.ring++;p.ringY.push((S.y0||2022)+k)}if(A.some(a=>/: MVP$/.test(a)))p.mvp++;if(A.some(a=>/Ultra Bowl MVP/.test(a)))p.sbm++;if(A.some(a=>/Offensive Player of the Year/.test(a)))p.opoy++;if(A.some(a=>/All-Pro/.test(a)))p.ap++;if(A.some(a=>/Pro Bowl/.test(a)))p.pb++});
 const pop=S.pop||40,yr=yrN(),out=[];
 for(const tm in per){const p=per[tm],i=(S.pro||[]).findIndex(t=>tn(t)==tm),code=i>=0?TA[i]:null;if(!code)continue;
  const sc=p.s*5+p.yds/1200+p.td/6+p.ring*30+p.mvp*20+p.sbm*15+p.opoy*8+p.ap*5+p.pb*2;
  const nRet=rjList(code).length,titles=LGH0.filter(x=>x.w.split('@')[0]==code).map(x=>x.yr),lastT=titles.length?Math.max(...titles):null;
  let bar=90+nRet*4+titles.length*6;if(!nRet)bar+=60;// no retired numbers yet: you have to be the best they've ever had
  if(p.ring&&(lastT==null||Math.min(...p.ringY)-lastT>=25))bar-=45;// first title in forever (the Shaq rule)
  if(pop<60)bar+=1e9;else if(pop<75)bar+=15;
  const m=sc-bar;if(m<0)continue;const r=rng((S.seed||1)*97+hsh(code));const d=m>=60?Math.floor(r()*3):m>=30?1+Math.floor(r()*7):5+Math.floor(r()*14);if(d>15)continue;
  const ok=rjAdd({code,num:S.num,n:S.name,pos:'QB',me:1,yr:yr+d});if(ok)out.push({code,tm,d,y:yr+d})}
 S.rjMe=out.length?out:[{none:1}];
 S.rjMeMsg=out.length?out.map(o=>o.d==0?`🎽 The ${o.tm} retired your #${S.num} right away.`:`🎽 ${o.d} year${o.d>1?'s':''} after you retired, the ${o.tm} retired your #${S.num} (${o.y}).`).join(' '):`🎽 No team has retired your #${S.num}... yet. Owners take their franchise history seriously.`}
(()=>{const _l=legacy;legacy=function(){const r=_l.apply(this,arguments);try{if(S.rjMeMsg){const c=document.createElement('div');c.className='card';c.innerHTML='<b>Jersey retirement</b><br>'+esc(S.rjMeMsg);const f=ui.querySelector('.card');if(f)f.parentNode.insertBefore(c,f.nextSibling)}}catch(e){}return r}})();
// ===================== 🏈 More Pittsburgh Forge stars (Oct 2026) =====================
try{PKS.push([5,2,'Miguel Pittboy',85,29,11],[5,3,'DK Midcalf',84,28,4],[5,1,'Jaden Wardell',87,27,30],[5,18,'Jalon Rammer',89,32,5],[5,12,'Cam Haywire',87,37,97],[5,16,'Patterson King',85,27,6],[5,17,'Jaxon Saw',86,24,33])}catch(e){}
