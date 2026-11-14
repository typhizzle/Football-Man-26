// ===================== 🏈 flick passing: caught where it lands =====================
// The old model decided the receiver AT THROW TIME and land() only ever checked that
// one man. So a ball placed perfectly on someone else fell incomplete, and the game
// looked like it "threw to the wrong receiver". Now the throw goes where you flicked
// and the catch is resolved against whoever is actually nearest the landing spot.
// (P.rb is P.wr[4], so one pass over P.wr covers every eligible receiver.)
(()=>{if(typeof land!='function')return;
 const _l=land;
 land=function(){
  try{
   const P=g&&g.pl,a=P&&P.air;
   if(P&&a&&Array.isArray(P.wr)){
    let best=a.tgt||null;
    let bd=best?Math.hypot(best.x-a.lx,best.y-a.ly):1e9;
    P.wr.forEach(w=>{
     if(!w||w.out)return;
     const d=Math.hypot(w.x-a.lx,w.y-a.ly);
     if(d<bd){bd=d;best=w}
    });
    if(best)a.tgt=best;           // the man the ball actually came down on
   }
  }catch(e){}
  return _l.apply(this,arguments);
 };
})();

// A throw with no receiver anywhere near it has to still be a real, live football:
// it lands, it can be picked off, it is an incompletion. It must never silently
// vanish just because nobody was in the area.
(()=>{if(typeof doThrow!='function')return;
 const _d=doThrow;
 doThrow=function(w,lx,ly){
  try{
   const P=g&&g.pl;
   if((w==null)&&P&&Array.isArray(P.wr)&&P.wr.length){
    // give land() a sane starting point; it re-resolves by landing spot anyway
    let b=null,bd=1e9;
    P.wr.forEach(r=>{if(!r||r.out)return;const d=Math.hypot(r.x-lx,r.y-ly);if(d<bd){bd=d;b=r}});
    w=b||P.wr[0];
   }
  }catch(e){}
  return _d.call(this,w,lx,ly);
 };
})();
