// menu: ball position continuity (in hand and in flight), every 1/60 s over 3 loops
const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const r=await pg.evaluate(()=>{const m=PL.cv,out=[];let pv=null,pf=null;const V=new T3.Vector3(),hv=new T3.Vector3();
 for(let t=0;t<16.2;t+=1/60){coverQB(m,t);m.updateMatrixWorld(true);const u=t%5.4;
  if(PL.cb.visible){PL.cb.getWorldPosition(V);m.A[1].F.getWorldPosition(hv);const dh=V.distanceTo(hv);if(pv){const j=V.distanceTo(pv);if(j>.25)out.push(['cbjump',+t.toFixed(3),+u.toFixed(2),+j.toFixed(2)])}if(dh>1.3)out.push(['cbFar',+t.toFixed(3),+u.toFixed(2),+dh.toFixed(2)]);pv=V.clone()}else pv=null;
  if(PL.fb.visible){const p=PL.fb.position.clone();if(pf){const j=p.distanceTo(pf);if(j>1.2)out.push(['fbjump',+t.toFixed(3),+u.toFixed(2),+j.toFixed(2)])}pf=p}else pf=null}
 return out});
console.log(r.length,JSON.stringify(r.slice(0,40)));await b.close()})();
