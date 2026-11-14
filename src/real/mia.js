const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:500,h:500});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();scene('field');M='lock';clr(PL);ui.style.display='none';cv.style.display='none';FLD.visible=false;
 const m=mk3({c1:'#ff7ab8',c2:'#ffffff',d:0,pc:'#2a2a2a'},1.2,0,null,{sk:0,hr:4,hcl:'#ff4fa0',fh:0,ht:0,bd:0},1);m.position.set(-1.5,0,-50);m.rotation.y=Math.PI;PL.add(m);miaMic(m);
 const m2=mk3({c1:'#ff7ab8',c2:'#ffffff',d:0,pc:'#2a2a2a'},1.2,0,null,{sk:0,hr:4,hcl:'#ff4fa0',fh:0,ht:0,bd:0},1);m2.position.set(1.5,0,-50);m2.rotation.y=Math.PI/2+Math.PI;PL.add(m2);miaMic(m2);
 M='x';window.idle=function(){cm.fov=40;cm.aspect=1;cm.position.set(0,2.2,-42);cm.lookAt(0,1.8,-50);cm.updateProjectionMatrix()}});
await wait(1500);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/mia.png'});await b.close()})();
