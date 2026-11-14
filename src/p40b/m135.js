// ===== 📏 No stat inflation: box scores follow real football =====
// Tyler, 2026-11-14 (screenshots): five 2,000-yard rushers in one season with 25-30 rushing TD,
// five receivers with 19-26 TD, passers in the high 40s. "Look in history how many 2,000-yard seasons
// there even is" … "make sure it's fixed and never happens again a permanent fix" … "shouldn't happen in
// high school, college, or anything else either."
// Real history (NFL): 9 players ever ran for 2,000; 40+ passing TD is about one QB a season (some years
// none); 20+ receiving TD has happened twice (Rice 22, Moss 23).
// Cause: every CPU game's box score is drawn from the final score, and (1) every 7 points became a TD
// (field goals only got the leftovers), (2) team rushing totals ran high, (3) the lone RB got every
// rushing TD. Applies to every level, since all levels build box scores here.
// Games ALREADY PLAYED keep the box score they had (their stats stay what happened): the new formula
// starts with the first week played after this update, recorded per save in S.bxv.
window.BXV=1;
window.BXW=null;
window.bxNew=function(){try{const v=S.bxv;if(!v)return false;const y=yrN(),w=BXW==null?(S.wk||0):BXW;return y>v.y||(y===v.y&&w>=v.w)}catch(e){return false}};
// field goals first, then touchdowns out of what is left (about 2 FG tries a game)
window.bxTds=function(pts,r){const f=r();const fgT=pts<10?(f<.5?0:1):pts<17?(f<.35?1:2):f<.15?1:f<.5?2:f<.85?3:4;return Math.max(0,Math.floor(Math.max(0,pts-3*fgT)/7))};
// rushing TDs: the lead back gets most, not all (the QB and goal-line plays get the rest)
window.bxRbTd=function(n,r){let k=0;for(let i=0;i<n;i++)if(r()<.58)k++;return k};
// Tyler, 2026-11-14: "if you could fix my one season with the inflated stats that would be nice". The
// season being played when this shipped is redone once with the new numbers, from week 1, as long as it
// has not been closed yet (closed seasons are sealed history and are NOT rewritten). His own games are
// stored as they were played (S.bx) and are never regenerated.
window.bxRedo=function(s){try{if(!s||!s.bxv||s.bxv.re)return false;const o=S;S=s;let y=0;try{y=yrN()}catch(e){}S=o;
 if(s.bxv.y===y&&!(s.stage==='pro'&&s.sled===s.py)){s.bxv.w=0;s.bxv.re=1;return true}s.bxv.re=1;return false}catch(e){return false}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{if(s&&s.bxv&&!s.bxv.re)bxRedo(s)}catch(e){}try{if(s&&!s.bxv){const o=S;S=s;let y=0;try{y=yrN()}catch(e){}S=o;s.bxv={y,w:(s.wk||0),v:BXV};bxRedo(s)}}catch(e){}return s}}catch(e){}})();
(()=>{try{const _b=bxMake;bxMake=function(w){const o=BXW;BXW=w;try{return _b.apply(this,arguments)}finally{BXW=o}}}catch(e){}})();
// touchdowns are whole events: each one goes to ONE man, picked by his share. (bxSplit handed the
// leftovers to the No. 1 receiver first, so with 1-2 TDs a game he scored in nearly every game.)
window.bxPick=function(n,ws,r){const out=ws.map(()=>0),s=ws.reduce((a,b)=>a+b,0)||1;for(let i=0;i<n;i++){let x=r()*s,k=0;while(k<ws.length-1&&x>=ws[k]){x-=ws[k];k++}out[k]++}return out};
