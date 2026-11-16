// ===== 🏟 Home and away jerseys =====
// Tyler, 2026-11-14: "make sure there were home and away jerseys cause sometimes teams be wearing the same
// color … keep in mind the Cowboys be wearing white as their home jerseys, so … the [other] teams then
// just kind of wear their home jerseys too … we'll worry about alternate later".
// Before: no home/away anywhere; you always wore your colors and the opponent only changed on a clash.
// Now every game has a home team: regular season splits evenly (decided by the fixture, the same every
// time you look), homecoming is always home, playoffs go to the better seed. Home wears its colors, the
// visitor wears white. Dallas (the Cowboys of this league) wears white at home, so their visitor wears
// colors; on the road Dallas is the visitor in white like everyone else. If two jerseys still look alike, the old clash fix runs.
window.hmWhiteHome=t=>{try{return !!t&&t.city==='Dallas'&&(t.n==='Wildcatters'||t.n==='Cattle Boys')}catch(e){return false}};
window.hmHome=function(){try{const o=g.oi,k=g.kind||'reg';
 const seed=(L,i)=>{const n=L?L.indexOf(i):-1;return n<0?99:n};
 if(k==='pp'&&S.pb&&S.pb.sd){const sd=[...S.pb.sd.RFC,...S.pb.sd.LFC],a=S.pb.sd.RFC.includes(0)?seed(S.pb.sd.RFC,0):seed(S.pb.sd.LFC,0),b=S.pb.sd.RFC.includes(o)?seed(S.pb.sd.RFC,o):seed(S.pb.sd.LFC,o);if(S.pb.r===3)return a<=b;return a<=b}
 if(k==='cfp'&&S.cb&&S.cb.sd)return seed(S.cb.sd,0)<=seed(S.cb.sd,o);
 if(k==='po'&&S.po&&S.po.sd){const a=S.po.sd[0]||99,b=S.po.sd[o]||99;return a<=b}
 try{if(typeof hcWk==='function'&&hcWk()===(S.wk||0))return true}catch(e){}
 const w=S.wk||0,h=(w*7+o*3+(S.py||S.cy||S.yr||0))%2;return h===0}catch(e){return true}};
window.hmAway=function(j){const c=String(j.c1||'#333333');return Object.assign({},j,{c1:'#f4f4f4',c2:c,nc:lum(c)>.6?'#111111':c,d:j.d||0})};
(()=>{try{const _s=setMJ;setMJ=function(){const r=_s.apply(this,arguments);try{
 const cd=(a,b)=>{const p=h=>[1,3,5].map(i=>parseInt(String(h).slice(i,i+2),16)||0),A=p(a),B=p(b);return Math.hypot(A[0]-B[0],A[1]-B[1],A[2]-B[2])};
 const ot=g.o,me=S.T[0],home=hmHome();
 const mjH={...S.jy,pc:S.jy.pc||'#f2f2f2',hc:myHc()},ojH={c1:ot.c1,c2:ot.c2,d:ot.d,hc:hcOf(ot),pc:ot.pc||0xdcdcdc};ojH.nc=lum(ojH.c1)>.5?'#000':'#fff';
 let mj=mjH,oj=ojH;
 if(home){if(hmWhiteHome(me)){mj=hmAway(mjH);oj=ojH}else{mj=mjH;oj=hmAway(ojH)}}
 else{if(hmWhiteHome(ot)){oj=hmAway(ojH);mj=mjH}else{oj=ojH;mj=hmAway(mjH)}}
 // still too alike (e.g. a team whose own colors are white): the visitor switches, as before
 if(cd(oj.c1,mj.c1)<110){const vis=home?'o':'m',J=vis==='o'?oj:mj,H=vis==='o'?ojH:mjH;const alt=J===H?hmAway(H):{...H,c1:H.c2||H.c1,c2:H.c1};if(vis==='o')oj=alt;else mj=alt;
  if(cd(oj.c1,mj.c1)<110){if(vis==='o')oj={...ojH,c1:'#111111',c2:ojH.c1,nc:'#fff'};else mj={...mjH,c1:'#111111',c2:mjH.c1,nc:'#fff'}}}
 g.mj=mj;g.oj=oj;g.home=home?0:1}catch(e){}return r}}catch(e){}})();
