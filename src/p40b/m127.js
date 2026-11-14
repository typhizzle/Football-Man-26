// ===== 💯 A historic season means a RECORD season =====
// Tyler, 2026-11-14: "43 touchdowns isn't really historic. It's good, but not historic, not 100
// worthy". The old bar was a flat 43 pass TD / 1,900 rush / 1,880 rec / 20 sacks, and every
// other position had a random 4% roll to become 100 with no stat behind it at all.
// Now: a player becomes 100 only when his season is the all-time single-season best in this
// league's own record book (the book starts from the real all-time records). No random 100s.
// Players already at 100 keep it; nothing already earned is taken away.
window.h1R=function(c,d){try{const x=recGet('pro',c,1);const v=x&&+x[0];return (v>0)?Math.max(v,d||0):(d||Infinity)}catch(e){return d||Infinity}};
// Tyler, 2026-11-14: "or become reasonably close multiple years in a row makes sense too … like
// if they have like multiple 2,000 yard seasons in a row". Second road to 100: this season AND
// last season both within 5% of the league record (RB ~2,000 rush, WR ~1,866 rec, 22 sacks, 53 TD
// with the starting book). Last season is read from his OWN recorded rows (x.h); a season with no
// recorded stat line never counts.
window.H2CLOSE=.95;
window.h2Prev=function(x,y){try{const g=SG(x.pos),ix=g==='q'?3:2;let v=0,any=0;
 (x.h||[]).forEach(r=>{if(r&&r[0]===y&&r.length>ix){v+=(+r[ix]||0);any=1}});return any?v:null}catch(e){return null}};
window.h2Run=function(x,v,hi){try{if(!(hi>0)||hi===Infinity)return false;const c=hi*H2CLOSE;if(!(v>=c))return false;
 const p=h2Prev(x,yrN()-1);return p!=null&&p>=c}catch(e){return false}};
