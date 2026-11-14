// ===================== 💰 clean money display · quick fixes =====================
// "$11.8999999999M" → "$11.9M" everywhere money is shown
window.fmtM=v=>{v=+v;if(!v&&v!==0)return'0';return(v>=1e3?(v/1e3).toFixed(1)+'B':Math.abs(v)>=.1?v.toFixed(1):v.toFixed(2))};
// patch contract display in the salary cap / roster screen
(()=>{try{const _s=salV;salV=function(){const r=_s.apply(this,arguments);try{ui.innerHTML=ui.innerHTML.replace(/\$(\d+\.?\d*?)M/g,(m,n)=>'$'+fmtM(+n)+'M')}catch(e){}return r}}catch(e){}})();
// patch the pro hub contract line
(()=>{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{if(S&&S.ct&&ui.innerHTML){ui.innerHTML=ui.innerHTML.replace(/\$(\d+\.\d{2,})M/g,(m,n)=>'$'+fmtM(+n)+'M')}}catch(e){}return r}})();
// patch transaction log display
(()=>{try{const _l=lgV;lgV=function(){const r=_l.apply(this,arguments);try{ui.innerHTML=ui.innerHTML.replace(/\$(\d+\.\d{2,})M/g,(m,n)=>'$'+fmtM(+n)+'M')}catch(e){}return r}}catch(e){}})();
// patch free-agency offer display
(()=>{try{const _o=offView;offView=function(){const r=_o.apply(this,arguments);try{ui.innerHTML=ui.innerHTML.replace(/\$(\d+\.\d{2,})M/g,(m,n)=>'$'+fmtM(+n)+'M')}catch(e){}return r}}catch(e){}})();
// fix "undefined" bowl label in college hub — chub() builds nx with no 'bowl' key
(()=>{const _c=chub;chub=function(){const r=_c.apply(this,arguments);try{if(S&&S.bwl&&!S.bwl.done&&ui&&ui.innerHTML){const bn=gTitle('bowl');if(bn)ui.innerHTML=ui.innerHTML.replace(/\bundefined\b(?=\s+vs\s)/,bn)}}catch(e){}return r}})();
// ===================== 🏈 swipe-to-throw: screen-space receiver targeting =====================
// Instead of projecting screen→world (drifts per camera), find which receiver is in the
// direction you swiped ON SCREEN. Swipe upper-right → receiver whose screen pos is upper-right
// from QB. Works identically across all camera angles.
(()=>{const _sw=swThrow;swThrow=function(sx,sy,p,x0,y0,pts,rx,ry){
 try{const P=g&&g.pl,q=P&&P.qb;if(!P||!q||!P.wr||P.wr.length<1)return _sw.apply(this,arguments);
  const v=16+(S&&S.q?S.q.pow:60)*.1,aF=accF();
  // get QB's screen position
  const qScr=pj(q.x,q.y,1.6);
  // normalize swipe direction on screen (sx,sy from swEnd — screen pixels)
  const sl=Math.hypot(sx,sy)||1,snx=sx/sl,sny=sy/sl;
  // score each receiver by how well their screen position matches swipe direction
  let best=null,bs=-9;
  P.wr.forEach(r=>{
   const T=Math.max(.25,Math.hypot(r.x-q.x,r.y-q.y)/v);
   const ex=r.x+(r.vx||0)*T,ey=r.y+(r.vy||0)*T;
   const rScr=pj(ex,ey,1.0);
   // direction from QB on screen to receiver on screen
   const dx=rScr[0]-qScr[0],dy=rScr[1]-qScr[1],dl=Math.hypot(dx,dy);
   if(dl<15)return; // too close on screen to tell direction
   const dot=(snx*dx+sny*dy)/dl; // alignment: 1=perfect, -1=opposite
   if(dot<.25)return; // must be in the general direction
   // score: alignment is king, small bonus for being further away (deeper route)
   const sc=dot + dl/(Math.max(W,H)*.8)*.15;
   if(sc>bs){bs=sc;best={r,ex,ey,dot}}
  });
  if(best&&best.dot>.4){
   // throw directly to this receiver — bypass the world projection entirely
   const snap=.55+.35*aF; // 0.55 to 0.90
   const _dt=doThrow;doThrow=function(w,lx,ly){
    // redirect: blend heavily toward the matched receiver
    lx=lx+(best.ex-lx)*snap;
    ly=ly+(best.ey-ly)*snap;
    w=best.r;
    return _dt.call(this,w,lx,ly);
   };
   const r=_sw.call(this,sx,sy,p,x0,y0,pts,rx,ry);
   doThrow=_dt;
   return r;
  }
 }catch(e){}
 return _sw.apply(this,arguments);
}})();
