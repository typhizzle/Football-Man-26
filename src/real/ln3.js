const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:900,h:420});const wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(1200);
await pg.evaluate(()=>{SLOT=1;newC();start();scene('field');M='lock';clr(PL);ui.style.display='none';cv.style.display='none';
 const mk=(c,x,ry)=>{const m=mk3({c1:c,c2:'#ffffff',d:0,pc:'#dddddd',nc:'#fff'},1.2,0,{nm:'',num:'7'},{sk:2,hr:0,fh:0,ht:1,bd:2},1);m.position.set(x,0,-50);m.rotation.y=ry;PL.add(m);return m};
 window.P_=[];const states=[['pre',null],['live',.15],['live',1.5]];states.forEach(([ph,t],k)=>{const ox=-8+k*8;const ol=mk('#1d4ed8',ox-.75,-Math.PI/2),dl=mk('#b91c1c',ox+.75,Math.PI/2);
  g={ph,pl:{t:t||0}};lnSt({pos:'LG',x:1},ol,0);lnSt({pos:'DT',x:2},dl,0)});
 window.idle=function(){cm.fov=40;cm.aspect=900/420;cm.position.set(0,2.6,-38);cm.lookAt(0,1.4,-50);cm.updateProjectionMatrix()}});
await wait(1500);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/lnpose.png'});console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
