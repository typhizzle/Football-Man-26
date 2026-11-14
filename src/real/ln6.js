const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:800,h:400});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();g.paused=0;pick('Short',0)});await w(800);
const chk=()=>pg.evaluate(()=>{const P=g.pl,out=[];const mo=o=>o.m||o.mesh||o.o||o.g;const k0=Object.keys(P.ol[0]).filter(k=>P.ol[0][k]&&P.ol[0][k].isObject3D);
 let worst=9;P.dl.forEach(d=>{const b=d.pb||P.ol[0];const hb=m=>{let R=null,top=-1e9;m.traverse(c=>{if(!c.isMesh)return;const q=new THREE.Box3().setFromObject(c);if(q.max.y>top){top=q.max.y;R=q}});return R};const A=hb(b[k0[0]]),B=hb(d[k0[0]]);out.push([A.min.x,A.max.x,A.min.z,A.max.z,B.min.x,B.max.x,B.min.z,B.max.z].map(v=>v.toFixed(1)).join(","))});
 // line of scrimmage world: find ball
 return {k:k0,ov:out,t:P.t&&P.t.toFixed(2)}});
console.log('pre',JSON.stringify(await chk()));await pg.evaluate(()=>hut());for(let i=0;i<6;i++){await w(250);console.log('live',JSON.stringify(await chk()))}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
