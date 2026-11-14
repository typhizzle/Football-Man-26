const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:700,h:700});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.tab='Short';g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450))});
await pg.evaluate(()=>{ovHide();hut();g.paused=1;for(let i=0;i<45;i++)upd(.033);window.camGame=(qq,qx,por)=>{const z=-qq.y;cm.position.set(qx+10,3.0,z-2);cm.lookAt(qx,1.2,z-2);return 45};});
await wait(1500);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/ol_side.png'});
await pg.evaluate(()=>{window.camGame=(qq,qx,por)=>{const z=-qq.y;cm.position.set(qx,5,z+9);cm.lookAt(qx,1,z-3);return 50}});await wait(1200);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/ol_back.png'});
console.log(await pg.evaluate(()=>{const P=g.pl;return P.ol.map(o=>[o.x.toFixed(1),o.y.toFixed(1),o.kd,o.kn,o.stun].join(':')).join(' ')+' | DL '+P.dl.map(d=>[d.x.toFixed(1),d.y.toFixed(1),d.beat].join(':')).join(' ')}));
await b.close()})();
