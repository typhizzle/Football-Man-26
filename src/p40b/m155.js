// ===== 🧢 COACHES MOVE BETWEEN LEVELS (new saves only) =====
// Tyler: "coaches their lives matter as well ... progress from high school to college to pro if it's there ...
// Just progress how it should progress" — and it was agreed for NEW saves only (existing saves keep their
// coaching exactly as it is). Real life: most head-coach hires come from the same level, a few jump: a
// winning college head coach to the pros (roughly 1 in 7 openings), a fired pro coach back to college (about
// 1 in 8 college openings), a dominant high-school coach up to college (rare, about 1 in 25). The coach keeps
// his permanent id and his record; the move is written on it (left for the pros / returned to college /
// moved up from high school), and the school he left hires a replacement, also on the record.
window.cmvOn=function(){return !!(S&&S.cmv2)};
// a career that starts after this update is a "new save"
(()=>{try{const _s=start;start=function(){const r=_s.apply(this,arguments);try{if(S)S.cmv2=1}catch(e){}return r}}catch(e){}})();
window.cmvBest=function(teams,lvl,minO){let best=null,bs=-1e9;(teams||[]).forEach(t=>{const c=t&&t.cch;if(!c||c.a>=64||(c.o||0)<minO)return;const sc=(c.o||0)+(c.w||0)/Math.max(1,(c.w||0)+(c.l||0))*20+(t.w||0)*.8;if(sc>bs){bs=sc;best=t}});return best};
window.cmvNote=function(c,yr,what,from,to,lvFrom,lvTo){try{const id=crId(c,S);const e=S.cr.c[id];if(!e)return;e.out.push([yr,what,lvFrom,from]);e.st='active'/* his new job is written by the season-close record (m125) */}catch(e){}};
(()=>{try{const _h=hireFrom;hireFrom=function(lv,t,gm){try{if(!gm&&cmvOn()){const yr=yrN(),rr=R();
  if(lv=='pro'&&rr<.14){const colT=(S.col||[]).flatMap(c=>c.t||[]);const b=cmvBest(colT,'col',72);if(b){const c=b.cch;b.cch=newStaff(b,1,0);try{crId(b.cch,S);S.cr.c[b.cch.cid].hired.push([yr+1,'col',crLbl(b)])}catch(e){}
    cmvNote(c,yr,'left for the pros',crLbl(b),crLbl(t),'col','pro');return {...c,y:0,b:0,nb:0}}}
  if(lv=='col'){if(rr<.12){const P=(S.cpool&&S.cpool.pro)||[];const k=P.findIndex(x=>x&&x.o>=60&&x.a<64);if(k>=0){const c=P.splice(k,1)[0];cmvNote(c,yr,'returned to college','the pros',crLbl(t),'pro','col');return {...c,y:0,b:0,nb:0}}}
   else if(rr<.16){const hsT=(S.hs&&S.hs.T)||[];const b=cmvBest(hsT,'hs',70);if(b){const c=b.cch;b.cch=newStaff(b,1,0);cmvNote(c,yr,'moved up from high school',b.n,crLbl(t),'hs','col');return {...c,y:0,b:0,nb:0}}}}
 }}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
