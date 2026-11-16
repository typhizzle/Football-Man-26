// ===================== 🏆 Ultra Bowl MVP shows THAT GAME's line =====================
// The sim keeps season totals, not a per-game line for every AI player, so the
// championship line is derived from his season production: seeded by player + year,
// so it reads the same every single load, and weighted like an actual MVP day.
window.ubParse=function(ln){
 const s=String(ln||'');let m;
 if((m=s.match(/(\d[\d,]*)\s*yds,\s*(\d+)\s*TD,\s*(\d+)\s*INT/)))return{g:'q',v:[+m[1].replace(/,/g,''),+m[2],+m[3]]};
 if((m=s.match(/(\d[\d,]*)\s*rush yds,\s*(\d+)\s*TD/)))return{g:'r',v:[+m[1].replace(/,/g,''),+m[2]]};
 if((m=s.match(/(\d[\d,]*)\s*rec yds,\s*(\d+)\s*TD/)))return{g:'w',v:[+m[1].replace(/,/g,''),+m[2]]};
 if((m=s.match(/(\d+)\s*INT,\s*(\d+)\s*tackles/)))return{g:'b',v:[+m[1],+m[2]]};
 if((m=s.match(/(\d+)\s*sacks/)))return{g:'d',v:[+m[1]]};
 return null;
};
window.ubGameLine=function(name,ln,yr){
 const P=ubParse(ln);if(!P)return null;
 const r=rng(hsh('ubgame'+name+yr+(S&&S.seed||1))),G=17;
 const lift=()=>1.15+r()*.85;                  // an MVP played above his average
 const n=(x)=>Math.max(0,Math.round(x));
 if(P.g=='q'){
  const yds=Math.max(140,n(P.v[0]/G*lift()));
  const td=Math.min(5,Math.max(1,n(P.v[1]/G*(1.2+r()*1.0))));
  const i=(r()<.55)?0:Math.max(0,n(P.v[2]/G*(r()*1.6)));
  return `${yds} yds, ${td} TD, ${i} INT`;
 }
 if(P.g=='r'){
  const yds=Math.max(45,n(P.v[0]/G*lift()));
  const td=Math.max(1,n(P.v[1]/G*(1.4+r()*1.6)));
  return `${yds} rush yds, ${td} TD`;
 }
 if(P.g=='w'){
  const yds=Math.max(45,n(P.v[0]/G*lift()));
  const td=Math.max(1,n(P.v[1]/G*(1.4+r()*1.6)));
  const rec=Math.max(3,n(yds/(11+r()*6)));
  return `${rec} rec, ${yds} yds, ${td} TD`;
 }
 if(P.g=='d'){const sk=Math.max(1,n(P.v[0]/G*(1.6+r()*2)));return `${sk} sack${sk==1?'':'s'}`}
 if(P.g=='b'){
  const i=(r()<.6)?1:Math.max(0,n(P.v[0]/G*2.2));
  const tk=Math.max(3,n(P.v[1]/G*lift()));
  return `${i} INT, ${tk} tackles`;
 }
 return null;
};
// rewrite the Ultra Bowl MVP ballot so every line is that game, not the season
window.ubFixSB=function(py){
 const A=S&&S.law&&S.law[py];if(!A)return;              // a year may have a winner but no ballot
 const go=c=>{if(!c||c.ubg)return;const g=ubGameLine(c.n,c.ln,A.yr);if(g){c.szn=c.ln;c.ln=g+' · in the Ultra Bowl';c.ubg=1}};
 try{((A.c&&A.c.SBMVP)||[]).forEach(go);if(A.w&&A.w.SBMVP)go(A.w.SBMVP)}catch(e){}
};
(()=>{if(typeof lgAwards!='function')return;
 const _a=lgAwards;lgAwards=function(){const r=_a.apply(this,arguments);try{ubFixSB(S.py)}catch(e){}return r};
})();
// existing saves: convert their already-built Ultra Bowl ballots on load
(()=>{if(typeof mig!='function')return;
 const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{
  if(s&&s.law)Object.keys(s.law).forEach(k=>{const A=s.law[k];if(!A)return;
   const go=c=>{if(!c||c.ubg)return;const g=(typeof ubGameLine=='function')?ubGameLine(c.n,c.ln,A.yr):null;if(g){c.szn=c.ln;c.ln=g+' · in the Ultra Bowl';c.ubg=1}};
   ((A.c&&A.c.SBMVP)||[]).forEach(go);if(A.w&&A.w.SBMVP)go(A.w.SBMVP);
  })}catch(e){}return s};
})();
