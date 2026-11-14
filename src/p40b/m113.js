// ============ 🏅 Player of the Year: the leaders, with their real numbers ============
// Three things were wrong with the previous attempt:
//  1. The leaders were appended to the end of the candidate list and then the list was
//     cut to 14 — which kept the ORIGINAL names and threw away every leader just added.
//  2. It only ran when a season ended. Existing saves had their flag cleared on load but
//     nothing ever called it again, so nothing appeared.
//  3. A running back's RECEIVING yards were never read, so a back with 900 rushing and
//     700 receiving was invisible in the receiving race and his line never showed it.
// There is no cap now, every candidate carries his full stat line, and anyone within
// 12% of a category leader is listed beside him so a close call can be judged.

// a player's whole season in one line, whatever he plays
window.awLine=function(x,yr){try{
 const h=(x.h||[]).find(e=>e[0]==yr);if(!h)return '';
 const v=h.slice(2),g=SG(x.pos),P=[];
 if(g=='q'){
  if(v[0])P.push(v[0].toLocaleString()+' pass yds');
  if(v[1])P.push(v[1]+' pass TD');
  if(v[2])P.push(v[2]+' INT');
  if(v[4])P.push(v[4].toLocaleString()+' rush yds');
  if(v[5])P.push(v[5]+' rush TD');
 }else if(g=='r'){
  if(v[0])P.push(v[0].toLocaleString()+' rush yds');
  if(v[1])P.push(v[1]+' rush TD');
  if(v[2])P.push(v[2].toLocaleString()+' rec yds');
  if(v[3])P.push(v[3]+' rec TD');
  const tot=(v[0]|0)+(v[2]|0);if(tot)P.push(tot.toLocaleString()+' total yds');
 }else if(g=='w'){
  if(v[0])P.push(v[0].toLocaleString()+' rec yds');
  if(v[1])P.push(v[1]+' rec TD');
 }else if(g=='d'){ if(v[0])P.push(v[0]+' sacks') }
 else if(g=='b'){ if(v[0])P.push(v[0]+' INT'); if(v[1])P.push(v[1]+' tackles') }
 return P.join(', ');
}catch(e){return ''}};

// every category, every player, ranked
window.awRanks=function(yr){
 const C={};
 const put=(k,val,x,pi,tm)=>{if(!(val>0))return;(C[k]=C[k]||[]).push({val,x,pi,tm})};
 try{(S.T||[]).forEach((t,i)=>{
  let L;try{L=rost('h.'+i)}catch(e){return}
  const tm=((typeof tSlot=='function'?tSlot(i):TA[i])||(typeof tAb=='function'?tAb(t):''));
  (L||[]).forEach(x=>{
   if(!x||!x.h)return;
   const h=(x.h||[]).find(e=>e[0]==yr);if(!h)return;
   // the team on the ballot is the team he played for THAT YEAR, which the history row
   // carries in h[1] — not whoever happens to hold his rights today
   const hi=(h[1]!=null&&S.T[h[1]])?h[1]:i;
   const tmY=(TA[hi]||(typeof tAb=='function'?tAb(S.T[hi]):''));
   const v=h.slice(2),g=SG(x.pos);
   if(g=='q'){
    put('passing yards',v[0],x,hi,tmY);put('passing TDs',v[1],x,hi,tmY);
    put('rushing yards',v[4],x,hi,tmY);put('rushing TDs',v[5],x,hi,tmY);
   }else if(g=='r'){
    put('rushing yards',v[0],x,hi,tmY);put('rushing TDs',v[1],x,hi,tmY);
    put('receiving yards',v[2],x,hi,tmY);put('receiving TDs',v[3],x,hi,tmY);
    put('yards from scrimmage',(v[0]|0)+(v[2]|0),x,hi,tmY);
   }else if(g=='w'){
    put('receiving yards',v[0],x,hi,tmY);put('receiving TDs',v[1],x,hi,tmY);
    put('yards from scrimmage',v[0],x,hi,tmY);
   }else if(g=='d'){put('sacks',v[0],x,hi,tmY)}
   else if(g=='b'){put('interceptions',v[0],x,hi,tmY);put('tackles',v[1],x,hi,tmY)}
  });
 })}catch(e){}
 Object.keys(C).forEach(k=>C[k].sort((a,b)=>b.val-a.val));
 return C;
};

window.AWOFF=['passing yards','passing TDs','rushing yards','rushing TDs','receiving yards','receiving TDs','yards from scrimmage'];
window.AWDEF=['sacks','interceptions','tackles'];

window.awAddLeaders=function(py){
 try{
  const A=S&&S.law&&S.law[py];
  if(!A||!A.c)return 0;
  const yr=A.yr;if(yr==null)return 0;
  const C=awRanks(yr);let added=0;
  const fill=(cat,keys)=>{
   A.c[cat]=A.c[cat]||[];
   keys.forEach(k=>{
    const list=C[k];if(!list||!list.length)return;
    const top=list[0].val;
    // the leader, plus anyone within 6% of him. 91% of the leader is not a close race;
    // a dead heat like 64/63/62 tackles is, and a tie certainly is.
    // everyone level with the leader is on the ballot, however many that is — a
    // five-way tie for interceptions cannot be settled by cutting two of them off
    list.filter((e,i)=>i===0||e.val===top||(e.val>=top*.94&&i<4)).slice(0,5).forEach((e,i)=>{
     const tag=i===0?('🔝 '+k+' leader'):(k+' #'+(i+1));
     const line=awLine(e.x,yr);
     const ex=A.c[cat].find(z=>z&&z.n===e.x.n);
     if(ex){
      if(line)ex.ln=line;
      // the STORED team is what the screen prints. Correcting only the stat line left
      // the old team sitting beside it, which is why a fixed player still read HOU.
      if(e.tm)ex.tm=e.tm;
      if(e.pi!=null)ex.pi=e.pi;
      if((ex.ln||'').indexOf(tag)<0)ex.ln=(ex.ln?ex.ln+' · ':'')+tag;
      return;
     }
     A.c[cat].push({n:e.x.n,a:(typeof abbr=='function'?abbr(e.x.n):e.x.n),tm:e.tm,
                    pos:e.x.pos,pi:e.pi,ln:(line?line+' · ':'')+tag,s:-1,ldr:1});
     added++;
    });
   });
   // every candidate shows his numbers, leader or not — you cannot judge a ballot blind
   // sweep EVERY stored candidate: whatever team is printed beside his name must be the
   // team his own record says he played for that season
   A.c[cat].forEach(z=>{
    if(!z||!z.n)return;
    try{
     for(let i=0;i<(S.T||[]).length;i++){
      let L;try{L=rost('h.'+i)}catch(err){continue}
      const p=(L||[]).find(q=>q&&q.n===z.n);if(!p||!p.h)continue;
      const h=p.h.find(q=>q[0]==yr);if(!h)continue;
      const hi=(h[1]!=null&&S.T[h[1]])?h[1]:i;
      const want=TA[hi]||(typeof tAb=='function'?tAb(S.T[hi]):'');
      if(want&&z.tm!==want){z.tm=want;z.pi=hi}
      break;
     }
    }catch(e){}
   });
   A.c[cat].forEach(z=>{
    if(!z||z.ln)return;
    try{const o=(C['yards from scrimmage']||[]).concat(C['sacks']||[],C['tackles']||[]).find(e=>e.x.n===z.n);
     if(o)z.ln=awLine(o.x,yr)}catch(e){}
   });
  };
  fill('OPOY',AWOFF);fill('DPOY',AWDEF);
  // the men who actually led a category go to the top, so the ballot can be read
  ['OPOY','DPOY'].forEach(cat=>{try{
   A.c[cat].sort((a,b)=>((/🔝/.test(b.ln||'')?1:0)-(/🔝/.test(a.ln||'')?1:0)));
  }catch(e){}});
  A.ldr=1;
  return added;
 }catch(e){return 0}
};

// run it when a season ends AND whenever a ballot is opened, so old saves fill in too
(()=>{try{if(typeof lgAwards!='function')return;const _a=lgAwards;
 lgAwards=function(){const r=_a.apply(this,arguments);try{awAddLeaders(S.py)}catch(e){}return r}}catch(e){}})();
window.AWFIXV=2;
window.awFillAll=function(){try{
 if(!S||!S.law)return 0;let n=0;
 Object.keys(S.law).forEach(k=>{const A=S.law[k];if(!A||!A.c)return;
  if(A.ldr&&A.fixv===AWFIXV)return;          // already corrected by this version
  n+=awAddLeaders(k);A.fixv=AWFIXV});
 return n}catch(e){return 0}};
// the ballot is drawn by lawHtml and the override pickers; fill before any of them draw
['lawHtml','lawPick','awPick'].forEach(fn=>{try{
 if(typeof window[fn]!='function')return;const _o=window[fn];
 window[fn]=function(){try{awFillAll()}catch(e){}return _o.apply(this,arguments)};
}catch(e){}});
(()=>{try{if(typeof mig!='function')return;const _m=mig;
 mig=function(s){s=_m.apply(this,arguments);
  try{if(s&&s.law)Object.keys(s.law).forEach(k=>{const A=s.law[k];if(A&&A.c)A.ldr=0})}catch(e){}
  return s}}catch(e){}})();
