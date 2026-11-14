const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:+process.argv[2]||390,h:+process.argv[3]||844,file:process.argv[4]});
const r=await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,300));hut();await new Promise(r=>setTimeout(r,600));
const gl=rd.getContext(),px=new Uint8Array(4),out={};
const meas=(lab,n)=>{const f=()=>{draw();hudU();rd.render(scn,cm);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,px)};f();let t0=performance.now();for(let i=0;i<n;i++)f();const tot=(performance.now()-t0)/n;t0=performance.now();for(let i=0;i<n;i++){draw();hudU()}const js=(performance.now()-t0)/n;out[lab]={ms:+tot.toFixed(1),js:+js.toFixed(2),calls:rd.info.render.calls,tri:rd.info.render.triangles}};
for(const c of [0,1,2,3,4,5]){CAMI=c;meas('cam'+c,15)}sun.castShadow=false;CAMI=0;meas('noShadow',15);sun.castShadow=true;
out.ph=g.ph;out.dyn=(()=>{let n=0;const w=x=>{if(x.geometry)n++;(x.children||[]).forEach(w)};w(DYN);return n})();return out});
console.log(JSON.stringify(r));console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
