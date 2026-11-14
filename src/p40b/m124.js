// ===== 🔒 EVERY PLAYER'S LIFE MATTERS — linemen and kickers get a career =====
// seasonEnd() did `if(!g)return;` for any position with no stat group, so every offensive
// lineman and every kicker played season after season with NOTHING written down. In
// Tyler's 11-07 save that was 192 men (160 OL, 32 K) with no career on record at all.
//
// From now on each season they play is recorded in x.hp as [year, club]:
//  - its OWN list, never x.h. A stat-less row inside x.h was once found by an older
//    backfill and filled with invented numbers. No stat code reads x.hp.
//  - a ROW, not a year: a man traded mid-season keeps both clubs for that year.
//  - no stat line, because the game keeps none for these positions. The card says so.
//  - the club is the same canonical index seasonEnd writes into x.h for everyone else.
// Seasons they played BEFORE this existed are not recreated: the years were never written
// down, and making them up is forbidden. Nothing already in a save is altered.

window.hpAdd=function(x,yr,ti){try{
 if(!x||yr==null||ti==null)return;
 x.hp=x.hp||[];
 if(!x.hp.some(r=>r&&r[0]===yr&&r[1]===ti))x.hp.push([yr,ti]);
 x.hp.sort((a,b)=>(a[0]||0)-(b[0]||0));
}catch(e){}};

// ---- the seal, extended to x.hp: matched as a MULTISET of exact rows ----
(()=>{try{const _sc=window.sealCheck;if(typeof _sc!='function')return;
 window.sealCheck=function(s,opts){
  const res=_sc.apply(this,arguments);
  try{if(!s||!s.seal)return res;
   const nowY=sealNow(s);let back=0;
   sealWalk(s,x=>{
    const old=x.pid&&s.seal[x.pid];if(!old)return;
    const cur=(x.hp||[]).filter(r=>r&&r[0]!=null);
    if(!old.hpL){old.hpL=cur.map(r=>JSON.stringify(r));return}   // first sight
    const curL=cur.map(r=>JSON.stringify(r)),used=curL.map(()=>false);
    // a sealed season may not disappear. The season still being played is open.
    old.hpL.forEach(sr=>{
     let want;try{want=JSON.parse(sr)}catch(e){return}
     if(nowY&&want[0]>=nowY)return;
     const i=curL.findIndex((c,k)=>!used[k]&&c===sr);
     if(i>=0){used[i]=true;return}
     x.hp=x.hp||[];x.hp.push(want.slice());back++;
    });
    if(back)x.hp.sort((a,b)=>(a[0]||0)-(b[0]||0));
    // growth: a season newly played joins the seal
    (x.hp||[]).forEach(r=>{const sr=JSON.stringify(r);
     const have=old.hpL.filter(q=>q===sr).length,now=(x.hp||[]).filter(q=>JSON.stringify(q)===sr).length;
     for(let n=have;n<now;n++)old.hpL.push(sr)});
   });
   if(back){s.sealFix=(s.sealFix||0)+back;res&&(res.added=(res.added||0)+back);
    try{if(typeof txAdd=='function')txAdd(s,'the record','altered','restored','history restored: '+back+' lineman/kicker season(s) put back')}catch(e){}}
  }catch(e){}
  return res};
}catch(e){}})();

// ---- the career card lists them with everyone else's seasons, newest first ----
(()=>{try{const _hm=window.hxMerge;if(typeof _hm!='function')return;
 window.hxMerge=function(x){const a=_hm.apply(this,arguments)||[];
  try{(x&&x.hp||[]).forEach(r=>{if(r&&r[0]!=null)a.push(r.slice())});
   a.sort((p,q)=>(q[0]||0)-(p[0]||0))}catch(e){}
  return a};
}catch(e){}})();

// ---- the report counts them ----
(()=>{try{const _r=window.sealReport;if(typeof _r!='function')return;
 window.sealReport=function(){const o=_r.apply(this,arguments)||{};
  try{let n=0,men=0;sealWalk(S,x=>{const k=(x.hp||[]).length;n+=k;if(k)men++});o.statlessSeasons=n;o.statlessPlayersWithSeasons=men}catch(e){}
  return o};
}catch(e){}})();
