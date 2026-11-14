// ===== 🧬 EVERY PLAYER'S LIFE MATTERS — high school and college careers, kept like the pros =====
// Tyler, 2026-11-14: "just however you're following careers in pro, just make sure it goes the same from
// high school to college throughout ... make sure everyone's career is kept up with properly ... And all
// their stats and awards. And years they've played. And teams they've played for."
// What the game did (measured): every high-school senior was ERASED at the end of each year and a random
// freshman took his spot (only your own committed teammates were remembered); college players never aged,
// never graduated and never left; nobody below the pros had a season-by-season record.
// Now:
//  - every player at every level has a permanent id and a career record S.pc.p[pid]: one row per season
//    [year, level, club, class, games, the season stats added up from that season's box scores], his
//    awards, and every exit (graduated, committed to X, left college). It only ever GROWS.
//  - a senior who graduates is never erased: his record stays, with where he committed. When the college
//    level is played, every committed graduate shows up on his college's roster with the same id and his
//    high-school seasons, in the right class.
//  - college players move up a class every year; seniors leave (recorded) and a freshman class comes in.
//  - nothing already in a save is rewritten or invented: records start from the season this is first
//    played; years before that are shown as not recorded.

window.pcS=function(s){s=s||S;if(!s)return null;s.pc=s.pc||{p:{},g:[],v:1};s.pc.p=s.pc.p||{};s.pc.g=s.pc.g||[];return s.pc};
window.pcId=function(x){try{if(!x||!x.n)return null;const R_=pcS();
 // a NAME IS NOT AN IDENTITY, but an id on an object the game re-used for a different man is not his either
 if(x.pid&&R_.p[x.pid]&&R_.p[x.pid].n!==x.n)x.pid=null;
 if(!x.pid)x.pid='p'+(S.pidN=(S.pidN||0)+1);
 if(!R_.p[x.pid])R_.p[x.pid]={n:x.n,pos:x.pos||'',r:[],o:[],a:[]};return x.pid}catch(e){return null}};
const PCLV={hs:'High school',col:'College',pro:'Pro'};
const pcStat=z=>{if(!z)return [0];const a=[z.g,z.pc,z.pa,z.py,z.ptd,z.pint,z.car,z.ry,z.rtd,z.rec,z.recy,z.rectd,z.tkl,z.sck,z.intc].map(v=>+v||0);while(a.length>1&&!a[a.length-1])a.pop();return a};
// college rosters were made without a class year (every man read class 0, so nobody ever left). On first
// sight a man gets one, the same way the game makes college rosters elsewhere (1-4, fixed by his name).
window.pcCls=function(x){try{if(S&&S.stage=='col'&&x&&!x.cls&&!x.qs)x.cls=1+(Math.abs(hsh(String(x.n)+'|cls'))%4);return x.cls}catch(e){return 0}};
window.pcLevel=function(){return S&&S.stage=='col'?'col':S&&S.stage=='hs'?'hs':null};

// a season closes at the high-school or college level: every player on every roster gets his row
window.pcClose=function(lv){try{if(!S||!S.T||!lv)return 0;const R_=pcS(),yr=yrN(),key=lv+yr;if((R_.done||(R_.done={}))[key])return 0;
 let D={};try{szCache=null;D=szGet()||{}}catch(e){}
 const titles={};try{if(lv=='col'&&S.cb&&S.cb.champ!=null)titles[S.cb.champ]='National Champions';if(lv=='hs'&&S.po&&S.po.L&&S.po.L.length==1)titles[S.po.L[0]]='State Champions';(S.cch||[]).forEach(i=>{if(lv=='col'&&!titles[i])titles[i]='Conference Champions'})}catch(e){}
 const named={};try{if(lv=='col'){const c=S.csum||{};(c.heis||[]).forEach((n,k)=>{n=String(n).replace(/^▶ /,'');named[n]=named[n]||[];named[n].push(k?'Heisman finalist':'Heisman Trophy')});if(c.ga)(named[c.ga]=named[c.ga]||[]).push('Golden Arm Award');if(c.qa)(named[c.qa]=named[c.qa]||[]).push("O'Brine Award (best QB)")}}catch(e){}
 let n=0;S.T.forEach((t,i)=>{let L=null;try{L=rost('h.'+i)}catch(e){}if(!L)return;const club=t.n;
  L.forEach((x,k)=>{if(!x||!x.n||(i==0&&k==0))return;const id=pcId(x);if(!id)return;const e=R_.p[id];
   if(e.r.some(q=>q[0]===yr&&q[1]===lv))return;
   if(lv=='col')pcCls(x);const cls=lv=='hs'?(x.gr||null):(x.cls||null);
   e.r.push([yr,lv,club,cls,...pcStat((D[i]||{})[x.n])]);n++;
   if(titles[i])e.a.push([yr,lv,titles[i],club]);
   (named[x.n]||[]).forEach(a=>e.a.push([yr,lv,a,club]))})});
 R_.done[key]=1;return n}catch(e){return 0}};

// ---- high school: seniors graduate (recorded, never erased) ----
(()=>{try{const _a=hsAge;hsAge=function(){try{if(S&&S.ro&&S.stage!='col'&&S.stage!='pro'){const R_=pcS(),yr=window.PCYR||yrN();   // the year that is closing (nextYr has already filed it)
  Object.keys(S.ro).forEach(a=>{if(a[0]!='h')return;const L=S.ro[a];if(!Array.isArray(L))return;const t=gt(a);
   L.forEach((x,j)=>{if(!x||(a=='h.0'&&j==0)||x.npx!=null||!x.gr||x.gr<4)return;const id=pcId(x);if(!id)return;const e=R_.p[id];
    if(e.o.some(q=>q[0]===yr&&q[1]==='graduated'))return;
    e.o.push([yr,'graduated',(t&&t.n)||'',x.cm||null]);
    if(x.cm)R_.g.push([id,x.cm,yr,x.pos,x.num,x.ovr])})})}}catch(e){}
 return _a.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _n=nextYr;nextYr=function(){try{if(S&&S.stage!='col'&&S.stage!='pro'&&!(S.yr>4)){window.PCYR=yrN();pcClose('hs')}}catch(e){}try{return _n.apply(this,arguments)}finally{window.PCYR=0}}}catch(e){}})();

// ---- college: the season is recorded, then every class moves up and seniors leave ----
window.pcColAge=function(yr){try{const R_=pcS();let left=0,up=0,fr=0;
 S.T.forEach((t,i)=>{const L=S.ro&&S.ro['h.'+i];if(!Array.isArray(L))return;
  L.forEach((x,k)=>{if(!x||(i==0&&k==0)||x.npx!=null||x.yq!=null||(k==0&&x.qs))return;
   const id=pcId(x);const e=R_.p[id];const c=x.cls||1;
   if(c>=4){e.o.push([yr,x.ovr>=78?'left college for the draft':'graduated',t.n,null]);left++;
    const rs=rng(hsh(x.n)+yr*37+i);const nw={n:NF[rs()*NF.length|0]+' '+NL[rs()*NL.length|0],pos:x.pos,num:x.num,ovr:cl(Math.round((t.ovr||60)-10+(rs()-.5)*14),35,88),cls:1,dn:x.dn};
    L[k]=nw;pcId(nw);R_.p[nw.pid].o.push([yr+1,'joined',t.n,'freshman']);fr++}
   else{x.cls=c+1;x.ovr=cl((x.ovr||50)+ri(0,4),30,99);up++}})});
 return {left,up,fr}}catch(e){return null}};
(()=>{try{const _c=colNext;colNext=function(){let yr=0;try{if(S&&S.stage=='col'){yr=yrN();pcClose('col')}}catch(e){}
 const r=_c.apply(this,arguments);
 try{if(yr&&S.stage=='col'&&!S.cdone){const R_=pcS();R_.aged=R_.aged||{};if(!R_.aged[yr]){R_.aged[yr]=1;pcColAge(yr);save()}}}catch(e){}
 return r}}catch(e){}})();
(()=>{try{const _d=declare;declare=function(){try{if(S&&S.stage=='col')pcClose('col')}catch(e){}return _d.apply(this,arguments)}}catch(e){}})();

// ---- committed graduates show up at their college, same man, same record ----
window.pcGradIdx=function(){const R_=pcS();if(R_._gi&&R_._gi.n===R_.g.length)return R_._gi.m;const m={};R_.g.forEach(q=>{(m[q[1]]=m[q[1]]||[]).push(q)});
 Object.defineProperty(R_,'_gi',{value:{n:R_.g.length,m},enumerable:false,configurable:true,writable:true});return m};
(()=>{try{const _h=hsAlumIn;hsAlumIn=function(a,t,L){const r=_h.apply(this,arguments);
 try{if(L&&S.stage=='col'&&!L.pcC){L.forEach(x=>{if(x)pcCls(x)});L.pcC=1}}catch(e){}
 try{if(!t||!L||S.stage!='col')return r;const G=pcGradIdx()[t.n];if(!G||!G.length)return r;if(L.pcG===G.length)return r;
  const yr=yrN(),R_=pcS();
  G.forEach(([id,cm,gy,pos,num,ovr])=>{const e=R_.p[id];if(!e)return;const yrs=yr-gy;if(yrs<1||yrs>4)return;
   if(L.some(x=>x&&(x.pid===id)))return;
   const same=L.findIndex(x=>x&&x.al&&x.n===e.n&&!x.pid);if(same>0){L[same].pid=id;return}
   let k=-1,lo=1e9;L.forEach((x,j)=>{if(j>0&&x&&x.pos==pos&&x.npx==null&&!x.al&&!x.pid&&x.yq==null&&!x.qs&&x.ovr<lo){lo=x.ovr;k=j}});
   if(k<0)L.forEach((x,j)=>{if(j>0&&x&&x.pos==pos&&x.npx==null&&!x.al&&x.yq==null&&!x.qs&&!(R_.p[x.pid]&&R_.p[x.pid].r.length)&&x.ovr<lo){lo=x.ovr;k=j}});
   const nx={n:e.n,pos,num,ovr:cl((ovr||50)+2*yrs,40,95),cls:Math.min(4,yrs),al:1,pid:id};
   // a college roster has one quarterback slot (the starter comes from the QB room): a committed QB joins as a backup
   if(k<0&&pos==='QB'){let z=23;while(L[z])z++;nx.bq=1;L[z]=nx}else if(k<0)return;else L[k]=nx;
   if(!e.o.some(q=>q[1]==='joined'&&q[2]===t.n))e.o.push([gy+1,'joined',t.n,'committed from high school'])});
  L.pcG=G.length}catch(e){}
 return r}}catch(e){}})();

// ---- every load: give every player at the level being played his id (additive only) ----
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{if(s&&(s.stage=='hs'||s.stage=='col')&&s.ro){const o=S;S=s;try{pcS(s);for(const k in s.ro){const L=s.ro[k];if(Array.isArray(L))L.forEach((x,j)=>{if(x&&x.n&&!(k=='h.0'&&j==0)){pcId(x);if(s.stage=='col')pcCls(x)}})}}finally{S=o}}}catch(e){}return s}}catch(e){}})();

// ---- the player card: high school and college seasons, awards, exits ----
window.pcRowsHtml=function(x){try{const R_=S&&S.pc,e=R_&&R_.p&&x&&x.pid&&R_.p[x.pid];   // read-only: a card never writes to the saveif(!e||(!e.r.length&&!e.o.length&&!e.a.length))return '';
 const g=SG(x.pos),cl_=(lv,c)=>c?(lv=='hs'?['','Fr','So','Jr','Sr'][c]||'':(['','Fr','So','Jr','Sr'][c]||'')):'';
 const line=q=>{const s=q.slice(4),v=i=>s[i]||0;const G=v(0);const p=[];
  if(v(2))p.push(v(1)+'/'+v(2)+', '+v(3).toLocaleString()+' pass yds, '+v(4)+' TD, '+v(5)+' INT');
  if(v(6))p.push(v(7).toLocaleString()+' rush yds, '+v(8)+' TD');
  if(v(9))p.push(v(9)+' rec, '+v(10).toLocaleString()+' yds, '+v(11)+' TD');
  if(v(12)||v(13)||v(14))p.push(v(12)+' tkl'+(v(13)?', '+v(13)+' sacks':'')+(v(14)?', '+v(14)+' INT':''));
  return (G?G+' G · ':'')+(p.join(' · ')||'<small style="opacity:.65">no stats in the box scores</small>')};
 const rows=e.r.slice().sort((a,b)=>a[0]-b[0]).map(q=>`<div class=row style="font-size:15px;align-items:flex-start"><span>${q[0]} ${esc(q[2])} <small>${PCLV[q[1]]} ${cl_(q[1],q[3])}</small></span><span style="text-align:right">${line(q)}</span></div>`).join('');
 const aw=e.a.map(q=>`${q[0]} ${esc(q[2])}`).join(' · ');
 const ev=e.o.map(q=>`${q[0]} ${q[1]}${q[1]=='graduated'&&q[3]?' — committed to '+esc(q[3]):q[1]=='graduated'?' from '+esc(q[2]):q[1]=='joined'?' '+esc(q[2])+(q[3]?' ('+q[3]+')':''):' — '+esc(q[2])}`).join(' · ');
 const lv=[...new Set(e.r.map(q=>q[1]))].map(l=>PCLV[l]).join(', ');
 return `<div class=card data-pc=1><b>High school &amp; college record</b><br><small>${e.r.length} season${e.r.length==1?'':'s'} recorded${lv?' · '+lv:''} · clubs: ${[...new Set(e.r.map(q=>q[2]))].map(esc).join(', ')||'—'}</small>${rows}${aw?`<br><small>🏅 ${aw}</small>`:''}${ev?`<br><small>${ev}</small>`:''}<br><small style="opacity:.6">Seasons before records began are not shown.</small></div>`}catch(e){return ''}};
(()=>{try{const _c=pCard;pCard=function(i,j){const r=_c.apply(this,arguments);try{const L=rost('h.'+i),x=L&&L[j];if(x&&!(i==0&&j==0)){const h=pcRowsHtml(x);const d=ui.firstElementChild;if(h&&d&&!d.querySelector('[data-pc]')){const back=[...d.querySelectorAll('button')].pop();if(back)back.insertAdjacentHTML('beforebegin',h);else d.insertAdjacentHTML('beforeend',h)}}}catch(e){}return r}}catch(e){}})();
