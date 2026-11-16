// ===================== 🎓 show start % on the auto-enroll screen =====================
// At "High school career complete" the enroll list already shows every scholarship
// offer. This adds each school's chance-to-start % (same number as the school detail
// screen) so you can compare your options before committing.
window.schPct=function(o){try{const t=S.col[o.ci].t[o.ti];return startInfo(t).pct}catch(e){return '?'}};
