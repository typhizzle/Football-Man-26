// ===== 📊 All-time leaders list each man ONCE =====
// Tyler, 2026-11-14: "whenever someone wins a DPOY, it should show up everywhere". The leaders list
// glued the pre-2026 history list ("M. Ferret 2") onto each active player's own count ("M. Ferret 3"),
// so a man appeared twice with two different numbers. For award categories his own record now holds
// the whole history (m130), so one line is kept per man, with the larger (complete) count.
window.lbMerge=function(A,B,c){try{const aw=['ring','sbm','mvp','opoy','dpoy'].includes(c);if(!aw)return A.concat(B);
 const by={};A.concat(B).forEach(e=>{if(!e||!e.n)return;const k=e.n;if(!by[k]||e.v>by[k].v||(e.v===by[k].v&&(e.me||e.cpu)))by[k]=Object.assign({},by[k]&&by[k].t&&!e.t?{t:by[k].t}:{},e)});
 return Object.values(by)}catch(e){return A.concat(B)}};
