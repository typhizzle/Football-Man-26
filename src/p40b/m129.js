// ===== 📅 No invite spam =====
// Tyler, 2026-11-14: "each song and remix should only be recorded once, in the TyPhizzle West Coast
// studio sessions. And it props up almost every week … only do it maybe 2-3 times a year. Probably
// maybe only two invites a year for the pot McGee show. Maybe he can interview you for the pro bowl
// … That can be a third. … I just don't want it to be spammed with advertisement events."
// Measured: studio 22% every week, Pot McGee 22-45% every week, brand parties 25% every week, and the
// studio re-offered remixes already recorded. Caps per season (yrN):
//   studio: 3 invites, and never a song you already recorded (none left = no more invites)
//   Pot McGee: 2 invites, a 3rd only as a Pro Bowl interview in a Pro Bowl season
//   brand parties + sponsor events: 4
window.EVCAP={studio:3,pot:2,party:4};
window.evcGet=function(){const y=yrN();if(!S.evc||S.evc.y!==y)S.evc={y,studio:0,pot:0,party:0};return S.evc};
window.evcPB=function(){try{const n=S.py||0;return (S.aw||[]).some(a=>new RegExp('^Pro yr ('+n+'|'+(n-1)+'): Pro Bowl').test(a))}catch(e){return false}};
window.evcFilter=function(L){try{const C=evcGet(),had=new Set((S.songs||[]).map(x=>x.k));
 for(let i=0;i<L.length;i++){const e=L[i];if(!e)continue;
  if(e.k==='studio'){
   if(had.has(e.song)){const left=['rbs','hot','pg'].filter(k=>!had.has(k));
    if(!left.length){L.splice(i--,1);continue}
    const sg=left[0];e.song=sg;e.n=sg=='rbs'?'TyPhizzle & Wesscoastt: "Real Ballaz Swang"':'Feature on "'+(sg=='hot'?'Hot Boys':'P Giddy')+'" (Remix)';
    e.d=sg=='rbs'?'Their new song "Real Ballaz Swang" has an open verse with your name on it.':'TyPhizzle & Wesscoastt want you on the '+(sg=='hot'?'Hot Boys':'P Giddy')+' remix.'}
   if(L.some((x,j)=>j<i&&x.k==='studio')||C.studio>=EVCAP.studio){L.splice(i--,1);continue}C.studio++;continue}
  if(e.k==='pot'){
   if(C.pot>=EVCAP.pot){if(C.pot===EVCAP.pot&&evcPB()&&!C.pb){C.pb=1;e.n='The Pot McGee Show: Pro Bowl interview';e.d='Pot wants to talk about your Pro Bowl season.';C.pot++;continue}L.splice(i--,1);continue}
   C.pot++;continue}
  if(e.k==='party'){if(C.party>=EVCAP.party){L.splice(i--,1);continue}C.party++;continue}
 }}catch(e){}return L};
(()=>{try{const _f=window.brWeekFilter;window.brWeekFilter=function(L){if(typeof _f=='function')_f.apply(this,arguments);return evcFilter(L)}}catch(e){}})();
