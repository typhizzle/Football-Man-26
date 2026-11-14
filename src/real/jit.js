// menu throw: sample joint world positions every 1/120 s over 3 loops, report velocity spikes (pops)
const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const r=await pg.evaluate(()=>{const m=PL.cv,V=()=>new T3.Vector3(),pts=[],dt=1/120;
 const nodes=()=>{const o={};m.updateMatrixWorld(true);const w=(k,ob)=>{if(ob){const v=V();ob.getWorldPosition(v);o[k]=v}};
  w('root',m);m.A.forEach((a,i)=>{w('sh'+i,a);w('el'+i,a.F);if(a.F&&a.F.children.length){const c=a.F.children[a.F.children.length-1];w('hd'+i,c)}});m.L.forEach((l,i)=>{w('hip'+i,l);w('kn'+i,l.S);if(l.S&&l.S.children.length)w('ft'+i,l.S.children[l.S.children.length-1])});w('cb',PL.cb.visible?PL.cb:null);w('fb',PL.fb.visible?PL.fb:null);if(m.H)w('head',m.H);return o};
 const prev={},out=[];let pv=null,pvv=null;
 for(let t=0;t<16.2;t+=dt){coverQB(m,t);const o=nodes();if(pv){const sp={};for(const k in o)if(pv[k])sp[k]=o[k].distanceTo(pv[k])/dt;if(pvv){for(const k in sp)if(pvv[k]!=null){const a=Math.abs(sp[k]-pvv[k])/dt;if(a>400&&k!='fb')out.push([+t.toFixed(3),k,+sp[k].toFixed(1),+pvv[k].toFixed(1)])}}pvv=sp}pv=o}
 return out});
const by={};r.forEach(x=>{const u=(x[0]%5.4).toFixed(2),k=u+' '+x[1];by[k]=(by[k]||0)+1});
console.log(r.length);console.log(JSON.stringify(r.slice(0,80)));console.log(JSON.stringify(errs));await b.close()})();
