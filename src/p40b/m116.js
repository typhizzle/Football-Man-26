// ============ 📊 season stats are the SUM OF THE GAME LOGS ============
// Until now a teammate's season line was a formula: team rating multiplied by games
// played. Nigel Ballins' "921 receiving yards" was never a catch anybody threw. Hand off
// to your back fifty times and his season total did not move, because nothing read what
// actually happened.
//
// Every game in the league already has a box score — bxGet(week, teamA, teamB) builds
// one for any fixture, and your own games are stored verbatim. The logs existed; nothing
// added them up. This does: it walks every played game of the season, both sides, and
// totals every player. Season stats, leaderboards and roster lines all read that total,
// so a catch you threw shows up in the league race against everyone else.

window.szCache=null;
window.szKey=function(){try{
 return (S.stage||'hs')+'|'+(S.yr||0)+'|'+(S.py||0)+'|'+(S.cy||0)+'|'+(S.wk||0)+'|'+(S.grk||'')+'|'+Object.keys(S.bx||{}).length;
}catch(e){return 'x'}};

window.szBuild=function(){
 const out={};
 const get=(ti,n,pos)=>{const T=out[ti]=out[ti]||{};
  return T[n]=T[n]||{n,pos:pos||'',g:0,pa:0,pc:0,py:0,ptd:0,pint:0,
                     car:0,ry:0,rtd:0,rec:0,recy:0,rectd:0,tkl:0,sck:0,intc:0,pd:0}};
 const side=(ti,A)=>{
  if(!A)return;const touched=[];
  (A.pass||[]).forEach(p=>{if(!p||!p.n||!(p.a>0))return;const r=get(ti,p.n,'QB');
   r.pa+=p.a|0;r.pc+=p.c|0;r.py+=p.y|0;r.ptd+=p.td|0;r.pint+=p.i|0;touched.push(p.n)});
  (A.rush||[]).forEach(p=>{if(!p||!p.n||!(p.c>0))return;const r=get(ti,p.n,p.p);
   r.car+=p.c|0;r.ry+=p.y|0;r.rtd+=p.td|0;touched.push(p.n)});
  (A.rec||[]).forEach(p=>{if(!p||!p.n||!(p.c>0))return;const r=get(ti,p.n,p.p);
   r.rec+=p.c|0;r.recy+=p.y|0;r.rectd+=p.td|0;touched.push(p.n)});
  (A.def||[]).forEach(p=>{if(!p||!p.n)return;const r=get(ti,p.n,p.p);
   r.tkl+=p.t|0;r.sck+=p.s|0;r.intc+=p.i|0;r.pd+=p.pd|0;touched.push(p.n)});
  const seen={};touched.forEach(n=>{if(seen[n])return;seen[n]=1;
   try{out[ti][n].g++}catch(e){}});
 };
 try{
  const G=S.gr||{};
  Object.keys(G).forEach(w=>{(G[w]||[]).forEach(gm=>{
   if(!gm||gm.length<4)return;
   const a=gm[0],b=gm[1];
   let bx=null;try{bx=bxGet(+w,a,b)}catch(e){}
   if(!bx)return;
   side(a,bx.A);side(b,bx.B);
  })});
 }catch(e){}
 return out;
};

window.szGet=function(){try{
 const k=szKey();
 if(szCache&&szCache.k===k)return szCache.d;
 const d=szBuild();szCache={k,d};return d;
}catch(e){return {}}};
window.szTeam=ti=>{try{return szGet()[ti]||{}}catch(e){return {}}};
window.szOne=(ti,n)=>{try{return szGet()[ti]&&szGet()[ti][n]||null}catch(e){return null}};
window.szFlat=function(){try{
 const D=szGet(),out=[];
 Object.keys(D).forEach(ti=>Object.keys(D[ti]).forEach(n=>out.push({...D[ti][n],ti:+ti})));
 return out}catch(e){return []}};

// ---- the leaderboards now list everybody who actually did something ----
(()=>{try{const _l=LD;LD=function(){
 try{
  const F=szFlat();
  if(!F.length)return _l.apply(this,arguments);
  const T=S.T,nm=n=>n.split(' ').map((x,k)=>k?x:x[0]+'.').join(' ');
  const tmOf=ti=>{try{return T[ti].n.split(' ')[0].slice(0,7)}catch(e){return ''}};
  const mk=(keep,map)=>F.filter(keep).map(x=>({n:nm(x.n),t:tmOf(x.ti),
      me:(x.ti===0&&x.n===S.name)||undefined,...map(x)})).sort((a,b)=>b.a-a.a);
  const P=mk(x=>x.py>0,x=>({a:x.py,b:x.ptd,c:x.pint}));
  const Ru=mk(x=>x.ry>0,x=>({a:x.ry,b:x.rtd}));
  const Re=mk(x=>x.recy>0,x=>({a:x.recy,b:x.rectd}));
  const Sk=mk(x=>x.sck>0,x=>({a:x.sck}));
  // your own line is the one place a stored box score can lag the live season totals,
  // so whichever is higher wins — your own numbers must never read short
  try{
   const us=S.ss,mine=P.find(x=>x.me);
   if(us&&us.yds>0){
    if(!mine)P.push({n:nm(S.name),t:tmOf(0),a:us.yds,b:us.td,c:us.int,me:1});
    else if(us.yds>mine.a){mine.a=us.yds;mine.b=us.td;mine.c=us.int}
    P.sort((a,b)=>b.a-a.a);
   }
   if(us&&us.ry>0){const mr=Ru.find(x=>x.me);
    if(!mr)Ru.push({n:nm(S.name),t:tmOf(0),a:us.ry,b:us.rtd,me:1});
    else if(us.ry>mr.a){mr.a=us.ry;mr.b=us.rtd}
    Ru.sort((a,b)=>b.a-a.a);
   }
  }catch(e){}
  return{P,Ru,Re,Sk};
 }catch(e){}
 return _l.apply(this,arguments);
}}catch(e){}})();

// ---- the roster screen shows each man's real season, not an invented one ----
(()=>{try{if(typeof rosStat!='function')return;const _r=rosStat;
 rosStat=function(i,s,L){
  const o=_r.apply(this,arguments);
  try{
   const D=szTeam(i);if(!D||!Object.keys(D).length)return o;
   const f=n=>(n||0).toLocaleString();
   (L||[]).forEach((p,k)=>{
    if(!p||!p.n)return;const z=D[p.n];if(!z)return;
    const Q=[];
    if(z.pa>0)Q.push(z.pc+'/'+z.pa,f(z.py)+'y',z.ptd+'TD',z.pint+'INT');
    if(z.car>0)Q.push(z.car+' car',f(z.ry)+'y',z.rtd+'TD');
    if(z.rec>0)Q.push(z.rec+' rec',f(z.recy)+'y',z.rectd+'TD');
    if(z.tkl>0||z.sck>0||z.intc>0){
     if(z.tkl>0)Q.push(z.tkl+' tkl');
     if(z.sck>0)Q.push(z.sck+' sk');
     if(z.intc>0)Q.push(z.intc+' INT');
    }
    if(Q.length)o[k]=Q.join(' · ');
   });
  }catch(e){}
  return o;
 }}catch(e){}})();

// ---- and the award ballot judges the same numbers everyone else sees ----
(()=>{try{if(typeof awRanks!='function')return;const _a=awRanks;
 awRanks=function(yr){
  try{
   // THE PAST IS THE RECORD. The ledger is built from today's rosters, so using it for
   // a season already in the books moves players onto teams they were never on that
   // year. If any archived row exists for this year, that archive wins, always.
   let archived=false;
   try{
    for(let i=0;i<(S.T||[]).length&&!archived;i++){
     let L;try{L=rost('h.'+i)}catch(e){continue}
     for(const x of (L||[])){if(x&&x.h&&x.h.some(h=>h[0]==yr)){archived=true;break}}
    }
   }catch(e){}
   if(archived)return _a.apply(this,arguments);
   const F=szFlat();if(!F.length)return _a.apply(this,arguments);
   const C={},put=(k,val,x)=>{if(!(val>0))return;(C[k]=C[k]||[]).push({val,x:{n:x.n,pos:x.pos,h:[]},pi:x.ti,
     tm:(function(){try{return (typeof tSlot=='function'?tSlot(x.ti):TA[x.ti])||S.T[x.ti].n.split(' ')[0]}catch(e){return ''}})()})};
   F.forEach(x=>{
    put('passing yards',x.py,x);put('passing TDs',x.ptd,x);
    put('rushing yards',x.ry,x);put('rushing TDs',x.rtd,x);
    put('receiving yards',x.recy,x);put('receiving TDs',x.rectd,x);
    put('yards from scrimmage',(x.ry|0)+(x.recy|0),x);
    put('sacks',x.sck,x);put('interceptions',x.intc,x);put('tackles',x.tkl,x);
   });
   Object.keys(C).forEach(k=>C[k].sort((a,b)=>b.val-a.val));
   // the full line comes straight off the ledger for these
   window.__szLine={};
   F.forEach(x=>{const Q=[];
    if(x.py>0)Q.push(x.py.toLocaleString()+' pass yds',x.ptd+' pass TD',x.pint+' INT');
    if(x.ry>0)Q.push(x.ry.toLocaleString()+' rush yds',x.rtd+' rush TD');
    if(x.recy>0)Q.push(x.recy.toLocaleString()+' rec yds',x.rectd+' rec TD');
    if((x.ry|0)+(x.recy|0)>0&&x.py<=0)Q.push(((x.ry|0)+(x.recy|0)).toLocaleString()+' total yds');
    if(x.sck>0)Q.push(x.sck+' sacks');
    if(x.intc>0)Q.push(x.intc+' INT');
    if(x.tkl>0)Q.push(x.tkl+' tackles');
    if(Q.length)__szLine[x.n]=Q.join(', ');
   });
   return C;
  }catch(e){}
  return _a.apply(this,arguments);
 }}catch(e){}})();
(()=>{try{if(typeof awLine!='function')return;const _w=awLine;
 awLine=function(x,yr){try{if(x&&x.n&&window.__szLine&&__szLine[x.n])return __szLine[x.n]}catch(e){}
  return _w.apply(this,arguments)}}catch(e){}})();

// ---- and what gets archived at season end is what actually happened ----
// The season-end writer built every player's permanent history row from the same old
// formula, and for a running back it only wrote 2 of his 4 numbers — his receiving was
// dropped on the floor every single year. A player's archived season is now the exact
// total he accumulated game by game. Seasons already in the books are not touched:
// the past stays the past.
window.szArchiveV=function(ti,x,g){try{
 if(!x||!x.n)return null;
 const z=szOne(ti,x.n);if(!z)return null;
 if(g=='q')return (z.py>0)?[z.py,z.ptd,z.pint,z.pc,z.ry,z.rtd]:null;
 if(g=='r')return (z.ry>0||z.recy>0)?[z.ry,z.rtd,z.recy,z.rectd]:null;
 if(g=='w')return (z.recy>0)?[z.recy,z.rectd]:null;
 if(g=='d')return (z.sck>0)?[z.sck]:null;
 if(g=='b')return (z.intc>0||z.tkl>0)?[z.intc,z.tkl]:null;
 return null}catch(e){return null}};
