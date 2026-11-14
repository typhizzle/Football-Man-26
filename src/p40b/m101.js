// ============ running back receiving: backfill every season already on record ============
// The old model stored a back's year as [rushYds, rushTD] and nothing else, so every
// season already in a save has no receiving. Those rushing numbers were themselves
// generated from the save's seed, so the receiving is filled in the same way: derived
// from the player and the year, identical on every load, never re-rolled.
window.rbRecFill=function(s){
 if(!s||!s.ro)return 0;
 let n=0;
 Object.keys(s.ro).forEach(k=>{
  const L=s.ro[k];if(!Array.isArray(L))return;
  L.forEach(x=>{
   if(!x||x.pos!='RB'||!Array.isArray(x.h))return;
   let cy=0,ct=0;
   x.h.forEach(e=>{
    if(!Array.isArray(e)||e.length>4)return;      // already carries receiving
    const yr=e[0],ry=e[2]||0,rt=e[3]||0;
    const r=rng(hsh('rbrec'+(x.n||'')+yr+(s.seed||1)));
    const share=.12+r()*.28;                      // a back catches a real share of the offense
    e[4]=Math.max(0,Math.round(ry*share));
    e[5]=Math.max(0,Math.round(rt*(.08+r()*.3)));
    cy+=e[4];ct+=e[5];n++;
   });
   if(cy||ct){x.cs=x.cs||{};x.cs.cyd=(x.cs.cyd||0)+cy;x.cs.ctd=(x.cs.ctd||0)+ct}
  });
 });
 return n;
};
// Your OWN award lines were stored before QB rushing was ever displayed. Find the
// season each line belongs to by matching its exact yards/TD/INT against your history,
// then append the rushing that was always recorded there.
window.meRushFill=function(s){
 if(!s||!s.law||!Array.isArray(s.hist))return 0;
 let n=0;
 Object.keys(s.law).forEach(k=>{
  const A=s.law[k];if(!A)return;
  const fix=c=>{
   if(!c||!c.me||c.meru)return;
   if(!/^\d+ yds, \d+ TD, \d+ INT/.test(String(c.ln||'')))return;
   // the award key IS the pro season number, so season N is the history row 'PN'.
   // (matching on the stats themselves fails: awards are snapshotted before the
   //  season finishes, so the stored line is smaller than the final total.)
   let e=s.hist.find(h=>h&&String(h.y)==='P'+k);
   if(!e){const m=String(c.ln).match(/^(\d+) yds, (\d+) TD, (\d+) INT/);
          if(m)e=s.hist.find(h=>h&&h.yds==+m[1]&&h.td==+m[2]&&h.int==+m[3])}
   if(e&&e.ry){c.ln+=' · '+e.ry+' rush yds'+(e.rtd?', '+e.rtd+' rush TD':'');c.meru=1;n++}
  };
  Object.keys(A.c||{}).forEach(a=>(A.c[a]||[]).forEach(fix));
  Object.keys(A.w||{}).forEach(a=>fix(A.w[a]));
 });
 return n;
};
(()=>{if(typeof mig!='function')return;
 const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{
  if(s&&!s.rbrec){rbRecFill(s);s.rbrec=1}
  if(s&&!s.meru2){meRushFill(s);s.meru2=1}
 }catch(e){}return s};
})();

// OPOY/DPOY leaders: a back is judged on TOTAL yards (rushing + receiving), which is
// how the award actually gets handed out.
(()=>{if(typeof awLeaders!='function')return;
 const _l=awLeaders;
 awLeaders=function(yr){
  const best=_l.apply(this,arguments)||{};
  try{
   (S.T||[]).forEach((t,i)=>{
    let L;try{L=rost('h.'+i)}catch(e){return}
    (L||[]).forEach(x=>{
     if(!x||!x.h)return;
     const h=(x.h||[]).find(e=>e[0]==yr);if(!h)return;
     const v=h.slice(2),g=SG(x.pos);
     const put=(k,val,line)=>{if(!(val>0))return;if(!best[k]||val>best[k].val)best[k]={val,x,line,tm:(TA[i]||tAb(t)),pi:i}};
     if(g=='r'){
      const ty=(v[0]||0)+(v[2]||0),td=(v[1]||0)+(v[3]||0);
      put('total yards',ty,`${v[0]} rush yds, ${v[1]} TD`+(v[2]?` · ${v[2]} rec yds${v[3]?', '+v[3]+' TD':''} · ${ty} total yds`:''));
     }
     if(g=='q'&&v[4])put('QB rushing yards',v[4],`${v[0]} yds, ${v[1]} TD, ${v[2]} INT · ${v[4]} rush yds${v[5]?', '+v[5]+' rush TD':''}`);
    });
   });
  }catch(e){}
  return best;
 };
})();
// put the two new categories on the OPOY ballot
(()=>{if(typeof awAddLeaders!='function')return;
 const _a=awAddLeaders;
 awAddLeaders=function(py){
  const A=S&&S.law&&S.law[py];
  const r=_a.apply(this,arguments);
  try{
   if(A&&A.c){
    const L=awLeaders(A.yr);
    ['total yards','QB rushing yards'].forEach(k=>{
     const bst=L[k];if(!bst||!bst.x)return;
     A.c.OPOY=A.c.OPOY||[];
     const tag='🔝 '+k+' leader',ex=A.c.OPOY.find(z=>z&&z.n===bst.x.n);
     if(ex){ex.ln=bst.line||ex.ln;if(String(ex.ln).indexOf(tag)<0)ex.ln+=' · '+tag;return}
     A.c.OPOY.push({n:bst.x.n,a:(typeof abbr=='function'?abbr(bst.x.n):bst.x.n),tm:bst.tm,
                    pos:bst.x.pos,pi:bst.pi,ln:(bst.line||'')+' · '+tag,s:-1,ldr:1});
    });
   }
  }catch(e){}
  return r;
 };
})();
