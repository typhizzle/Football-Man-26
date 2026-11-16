// ===================== 🏆 Ultra Bowl integrity (permanent, all saves) =====================
// An Ultra Bowl is the AFC champion vs the NFC champion. Two teams from the same
// conference can NEVER meet in it. TA is NFL-structured: indices 0-15 are AFC,
// 16-31 are NFC, so conference is structural and does not depend on division text
// being present (that was the silent failure: uChamp read conference from
// S.pro[ti].dv, and when that was missing every team compared equal, so the
// cross-conference search found nothing and fell through to the next-best team).
window.ubConf=i=>(i>=0&&i<16)?0:1;

// Repair a same-conference final by replacing the runner-up with the best team
// from the opposite conference that season. Deterministic, so it never flip-flops.
window.ubFixRu=function(Y,ub){
 const want=1-ubConf(ub);
 try{const T=uPro(Y).slice().sort((a,b)=>(b.w-a.w)||((b.q&&b.q[0]?b.q[0].yd:0)-(a.q&&a.q[0]?a.q[0].yd:0)));
  const m=T.find(x=>ubConf(x.ti)===want);if(m)return m.ti}catch(e){}
 try{return (want?16:0)+(Math.abs(hsh('ub'+Y+(S.seed||1)))%16)}catch(e){}
 return want?16:0;
};

// No Ultra Bowl is ever left without an MVP. Prefer a real player from the winning
// team that season; if the sim has no usable line, invent a stable name (same name
// every load — it's derived from the seed, never re-rolled).
// The MVP of an Ultra Bowl plays for the team that WON it. A stale name left over
// from a different winner is as wrong as a blank one, so validate, don't just fill:
// if the name on record didn't play for the champion that season, replace him.
window.ubMvpFill=function(Y,ub,cur){
 const c=cur==null?'':String(cur).trim(),blank=(!c||c=='-'||c=='—');
 let win=null;
 try{const T=uPro(Y);win=T.find(x=>x.ti===ub)||null}catch(e){}
 const roster=(win&&Array.isArray(win.q))?win.q.filter(q=>q&&q.n):[];
 // can't see the champion's roster -> keep whatever is on record rather than invent
 if(!roster.length)return blank?ubMvpMake(Y):cur;
 if(!blank&&roster.some(q=>q.n===c))return cur;        // already a champion's player
 // Tyler 2026-11-16: "Why does it say Ultra Bowl MVP Ham Luther in 2025". The list above is the champion's QBs only, so a real
 // non-QB MVP (2025 Kevin Sprinter, a back; 2021 Hooper Bol, a receiver) was swapped for the QB in every save. The real results
 // (through 2025) are never replaced, and a name that isn't some other team's QB that season is kept (he may be a back,
 // a receiver or a defender). Only a blank, or a QB of a different team, is replaced.
 if(!blank){try{if(typeof RCH!='undefined'&&RCH[Y]&&RCH[Y].sbm===c)return cur}catch(e){}
  let otherQB=false;try{otherQB=uPro(Y).some(x=>x.ti!==ub&&Array.isArray(x.q)&&x.q.some(q=>q&&q.n===c))}catch(e){}if(!otherQB)return cur}
 const q=roster.find(x=>!x.fill)||roster[0];           // otherwise the champion's starter
 return (q&&q.n)?q.n:(blank?ubMvpMake(Y):cur);
};
// stable invented name (seed-derived, identical on every load) for the rare case
// where the season has no usable roster at all
window.ubMvpMake=function(Y){
 try{const r=rng(hsh('sbm'+Y+(S.seed||1)));return NF[(r()*NF.length)|0]+' '+NL[(r()*NL.length)|0]}catch(e){}
 return 'Unknown';
};

// OUTERMOST wrapper: runs after the played-season record, the frozen simulation and
// the user's own corrections, so an impossible final is caught no matter its source.
(()=>{const _c=uChamp;uChamp=function(Y){
 const r=_c.apply(this,arguments);
 try{
  if(!r||r.ub==null)return r;
  const out={...r};
  // an all-AFC or all-NFC Ultra Bowl cannot happen: repair the runner-up
  if(out.ru!=null&&ubConf(out.ub)===ubConf(out.ru))out.ru=ubFixRu(Y,out.ub);
  // never show a vacant Ultra Bowl MVP
  out.sbm=ubMvpFill(Y,out.ub,out.sbm);
  return out;
 }catch(e){}
 return r;
}})();

// Self-healing migration: repairs saves that already have a corrupted final stamped
// into their permanent corrections. Save-agnostic — it fixes anyone's game on load,
// not just one seed.
(()=>{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{
 if(s&&s.hOv){Object.keys(s.hOv).forEach(Y=>{const o=s.hOv[Y];if(!o||!o.ub||!o.ru)return;
  const a=TA.indexOf(o.ub),b=TA.indexOf(o.ru);
  if(a>=0&&b>=0&&((a<16)===(b<16)))delete o.ru; // impossible pairing: drop it, uChamp re-picks a legal one
 })}
 // Tyler's remembered history (his save): 2026 Chicago, 2027 Buffalo over Chicago, 2028 Baltimore.
 if(s&&s.seed==676914057&&!s.hfx3){s.hOv=s.hOv||{};
  s.hOv[2026]=Object.assign(s.hOv[2026]||{},{ub:'CHI',ru:'CIN'});
  s.hOv[2027]=Object.assign(s.hOv[2027]||{},{ub:'BUF',ru:'CHI'});
  s.hOv[2028]=Object.assign(s.hOv[2028]||{},{ub:'BAL',ru:'DET'});
  s.hfx3=1}
}catch(e){}return s}})();
