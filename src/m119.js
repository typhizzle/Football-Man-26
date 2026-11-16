// ===== 🧬 EVERY PLAYER'S LIFE MATTERS — the team beside a name is HIS team =====
// This is the root of the Axel Jean bug and of every "that never happened" report.
//
// `S.T` is the league as THIS save holds it, and the game deliberately puts the user's
// own club at index 0: proFill reads `me = a=='h.0' && S.stage=='pro'` purely to skip
// L[0], the user himself, and cut10 does `[all[0],all[k]]=[all[k],all[0]]` when the
// college game contracts. Rosters are re-keyed with it, so `rost('h.'+i)` is always the
// right roster. Nothing was ever misfiled.
//
// `TA` is a FIXED list of abbreviations in CANONICAL league order — the order of `S.pro`.
// Nineteen places index it that way and are correct. Ten index it with a SLOT number
// instead, and those are wrong the moment the user's club is not the canonical first
// team. Tyler is on Houston, so slot 8 holds Las Vegas while TA[8] says HOU — and Axel
// Jean, a Las Vegas back with a Las Vegas record, was printed as a Houston player.
//
// TA is therefore left exactly as it is, because rewriting it would fix ten sites and
// break nineteen. `TAS` is the slot table: TAS[i] is the abbreviation of the club
// actually sitting in slot i, and the ten slot-indexed sites read that instead.
//
// Why this is safe on every save, including his friends':
//   • it writes NOTHING. No roster moves, no player touched, no stat, no award, no
//     history row. It derives a label and throws it away. A fix that stores nothing
//     cannot corrupt anything, now or in ten seasons.
//   • it is derived from S.T, so it is self-correcting: if the league reshuffles
//     mid-career the labels follow on the next read, with no migration and no repair.
//   • it covers high school and college too, where a pro abbreviation never applied.

(()=>{try{
 if(typeof TA=='undefined'||!Array.isArray(TA))return;
 window.TAS=window.TAS||[];

 window.taSig=function(){try{
  const T=S&&S.T;if(!T||!T.length)return '';
  return (S.stage||'')+'|'+T.length+'|'+T.map(t=>(t&&t.n)||'').join(',');
 }catch(e){return ''}};

 let last=null;
 window.taSync=function(force){try{
  const T=S&&S.T;if(!Array.isArray(T)||!T.length)return 0;
  const sig=taSig();if(!force&&sig===last)return 0;
  TAS.length=T.length;
  for(let i=0;i<T.length;i++){
   const t=T[i];let ab='';
   try{const pi=(typeof pIdx=='function')?pIdx(t):-1;if(pi>=0)ab=TA[pi]}catch(e){}
   if(!ab){
    // a college or high school club, or one the canonical list never knew: its own
    // abbreviation if it carries one, else built from its name
    try{ab=(t&&(t.ab||t.sh))||'';
     if(!ab){
      const w=String((t&&t.n)||'').trim().split(/\s+/).filter(Boolean);
      // the PLACE is what tells two high schools apart — forty clubs share a dozen
      // mascots, so "Falcons" alone put two different teams under one label and a
      // player's club became unreadable. Place first, mascot only to break a tie.
      ab=(w[0]||'').slice(0,3).toUpperCase();
     }
    }catch(e){ab=''}
   }
   TAS[i]=ab||('T'+i);
  }
  // no two clubs may share a label. A label is how a player's club is read, so a
  // collision is the same bug as a wrong label: it makes two careers one.
  try{
   const seen={};
   for(let i=0;i<TAS.length;i++){const a=TAS[i];(seen[a]=seen[a]||[]).push(i)}
   Object.keys(seen).forEach(a=>{
    const g=seen[a];if(g.length<2)return;
    g.forEach(i=>{
     const w=String((T[i]&&T[i].n)||'').trim().split(/\s+/).filter(Boolean);
     const mascot=(w[w.length-1]||'').toUpperCase();
     for(let k=0;k<mascot.length;k++){
      const cand=(a+mascot[k]).slice(0,5);
      if(TAS.indexOf(cand)<0){TAS[i]=cand;return}
     }
     // deterministic last resort, so a label is never ambiguous and never random
     let n=2;while(TAS.indexOf(a+n)>=0)n++;TAS[i]=a+n;
    });
   });
  }catch(e){}
  last=sig;return 1;
 }catch(e){return 0}};

 // the slot label, safe to call anywhere and at any time
 window.tSlot=function(i){try{taSync();return TAS[i]||''}catch(e){return ''}};

 // keep it in step: on load, before every roster read, and before every save
 try{if(typeof mig=='function'){const _m=mig;
  mig=function(s){s=_m.apply(this,arguments);try{if(s===S)taSync(1)}catch(e){}return s}}}catch(e){}
 try{if(typeof rost=='function'){const _r=rost;
  rost=function(){try{taSync()}catch(e){}return _r.apply(this,arguments)}}}catch(e){}
 try{const _s=save;save=function(){try{taSync()}catch(e){}return _s.apply(this,arguments)}}catch(e){}
 try{taSync(1)}catch(e){}
}catch(e){console.warn('taSync',e)}})();

// ---- the audit now means something ----
// It compared each roster against TA[slot] and so reported the misalignment as a
// misfiling. Against the slot table a complaint here is a real misfiling, and slot 0
// needs no exemption because slot 0 is genuinely the user's own club.
(()=>{try{
 window.roAudit=function(){try{
  taSync();
  const bad=[];
  for(let i=0;i<(S.T||[]).length;i++){
   const L=S.ro&&S.ro['h.'+i];if(!Array.isArray(L)||!L.length)continue;
   const c=roClaim(L,TAS);
   if(c&&c.ab!==TAS[i])bad.push('h.'+i+' ('+TAS[i]+') holds '+c.ab);
  }
  return bad;
 }catch(e){return ['audit failed']}};
}catch(e){}})();
