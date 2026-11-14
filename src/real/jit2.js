const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const r=await pg.evaluate(()=>{const m=PL.cv,out=[];const V=new T3.Vector3(),W=new T3.Vector3();
 for(let t=1.40;t<1.62;t+=1/60){coverQB(m,t);m.updateMatrixWorld(true);m.A[1].F.getWorldPosition(V);m.A[1].getWorldPosition(W);const a=m.A[1].rotation,f=m.A[1].F.rotation;out.push([+t.toFixed(3),[V.x,V.y,V.z].map(v=>+v.toFixed(2)),[W.x,W.y,W.z].map(v=>+v.toFixed(2)),[a.x,a.y,a.z].map(v=>+v.toFixed(2)),[f.x,f.y,f.z].map(v=>+v.toFixed(2)),Array.from(QK0.slice(12,15)).map(v=>+v.toFixed(2)),Array.from(QK0.slice(18,21)).map(v=>+v.toFixed(2))])}return out});
r.forEach(x=>console.log(JSON.stringify(x)));await b.close()})();
