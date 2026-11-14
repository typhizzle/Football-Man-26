// Look at every hat on a few outfits, and the new cleats. One sheet of screenshots.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({w:420,h:620,dpr:2});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';S.cash=9e9;
  ['wh_band','wh_cow','wh_billie','wh_ice','wh_helm','ft_rain','ft_cow','ft_neon','ft_purp','ft_jorton','ft_nyk','ft_ua','ft_liger','ft_goat'].forEach(id=>{try{shopBuy(id,SHOP.find(x=>x[0]==id)[1])}catch(e){}});
  menu();menuMain();ui.style.display='none';
  window.__show=function(outfit,hat,shoe){
   try{if(window.__m){PL.remove(window.__m);window.__m=null}}catch(e){}
   S.hat=hat||'';S.shoe=shoe||'';
   const m=outfitM(outfit);
   if(PL.cv){m.position.copy(PL.cv.position);m.rotation.copy(PL.cv.rotation);PL.cv.visible=false}
   PL.add(m);window.__m=m;
   // park the camera on him
   m.updateMatrixWorld(true);
   const p=m.getWorldPosition(new T3.Vector3()),F=window.__foc||0;
   const bb=new T3.Box3().setFromObject(m),ctr=bb.getCenter(new T3.Vector3()),sz=bb.getSize(new T3.Vector3());
   const D=Math.max(sz.y,sz.x)*1.5;
   if(F){const fy=bb.min.y,U=sz.y;cm.position.set(ctr.x+U*.18,fy+U*.19,ctr.z+U*.66);cm.lookAt(ctr.x,fy+U*.055,ctr.z)}
   else cm.position.set(ctr.x+D*.22,ctr.y+sz.y*.18,ctr.z+D),cm.lookAt(ctr.x,ctr.y,ctr.z);
   window.__bb=[sz.x,sz.y,sz.z];
   cm.fov=46;cm.updateProjectionMatrix();cm.updateMatrixWorld();
   rd.render(scn,cm);
   return rd.domElement.toDataURL('image/png');
  };
 },save);
 const shots=[];
 const take=async(name,outfit,hat,shoe)=>{
  const u=await pg.evaluate((o,h,f)=>__show(o,h,f),outfit,hat,shoe);
  const f='/home/claude/real/shots/'+name+'.png';
  fs.writeFileSync(f,Buffer.from(u.split(',')[1],'base64'));shots.push(f);
 };
 fs.mkdirSync('/home/claude/real/shots',{recursive:true});
 // every keepsake hat on the everyday fit
 for(const h of ['pumpkin','witch','clown','rock','swoop','skull'])await take('hat_'+h,'cas',h,'');
 // every shop hat
 for(const h of ['wh_band','wh_cow','wh_billie','wh_ice'])await take('hat_'+h,'cas',h,'');
 // hats on costumes, where they might clash
 for(const o of ['hx1','hx7'])for(const h of ['','wh_billie','wh_ice','wh_cow','pumpkin'])await take('cb_'+o+'_'+(h||'none'),o,h,'');
 for(const o of ['hx2','hx3','hw6','hw3','hw4','hw5','hw1'])for(const h of ['','witch','swoop','wh_cow'])await take('mk_'+o+'_'+(h||'none'),o,h,'');
 for(const o of ['hx4','hx6'])for(const h of ['witch','wh_ice'])await take('sk_'+o+'_'+h,o,h,'');
 for(const o of ['hx7','hx1'])for(const h of ['','wh_gcow'])await take('gold_'+o+'_'+(h||'none'),o,h,'');
 for(const o of ['hx7','hx1'])for(const h of ['','wh_gcow','wh_ice'])await take('gold_'+o+'_'+(h||'none'),o,h,'');
 await take('cos_hw1_cow','hw1','wh_cow','');
 await take('cos_hw2_ice','hw2','wh_ice','');
 await take('cos_hx4_pump','hx4','pumpkin','');
 await take('plain','cas','','');
 // footwear, camera down at the feet
 await pg.evaluate(()=>{window.__foc=1});
 for(const f of ['ft_rain','ft_cow','ft_neon','ft_purp','ft_jorton','ft_nyk','ft_ua','ft_liger','ft_goat'])await take('shoe_'+f,'cas','',f);
 await pg.evaluate(()=>{window.__foc=0});
 for(const f of ['ft_purp','ft_cow','ft_neon'])await take('full_'+f,'cas','wh_cow',f);
 await take('full_none','cas','','');
 for(const o of ['hx7','hx1'])for(const h of ['','wh_gcow','wh_ice'])await take('gold_'+o+'_'+(h||'none'),o,h,'');
 await pg.evaluate(()=>{window.__foc=1});
 for(const o of ['hx7','hx1'])for(const f of ['','ft_purp','ft_cow'])await take('bt_'+o+'_'+(f||'none'),o,'',f);
 console.log(shots.length+' shots');
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
