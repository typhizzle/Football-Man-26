const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open();
const r=await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,300));hut();await new Promise(r=>setTimeout(r,300));
const cnt=o=>{let n=0,s=0;const w=(x,vis)=>{vis=vis&&x.visible!==false;if(x.isMesh||x.isInstancedMesh){if(vis){n++;if(x.castShadow)s++}}(x.children||[]).forEach(c=>w(c,vis))};w(o,true);return n+'/'+s};
const o={};for(const [k,v] of Object.entries({FLD,EZ,DYN,CHR,PL,LOK}))o[k]=cnt(v);o.cam=cnt(cm);o.root=scn.children.length;return JSON.stringify(o)});console.log(r,errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
