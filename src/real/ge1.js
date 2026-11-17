// Gameplay measure: receiver separation over a pass play, and completion rate throwing to the most open man at 2.5 s.
const H=require('/home/claude/real/h.js'),fs=require('fs');const sim=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.GE_FILE});
const out=await pg.evaluate(async(sim)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};save=()=>{};S=mig(JSON.parse(sim));startGame0(1,'reg');ovHide();
 const passes=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')passes.push([c,i])});
 const su=k=>{g.ph='pre';g.y=35;g.dn=1;g.tg=10;setup(0);const pp=passes[k%passes.length];snap(pp[0],pp[1]);return g.ph==='live'};
 const sep=(P)=>P.wr.filter(w=>!w.hold).map(w=>Math.min(...P.def.map(d=>Math.hypot(d.x-w.x,d.y-w.y))));
 let s25=[],s35=[],free25=0,n25=0,cmp=0,att=0,yds=0,stand=0,standN=0;
 for(let k=0;k<60;k++){if(!su(k))continue;const P=g.pl;inp.x=inp.y=0;let thrown=false;
  for(let t=0;t<200&&g.ph==='live';t++){try{upd(.03)}catch(e){break}
   if(Math.abs(P.t-2.5)<.016){const S_=sep(P);s25.push(...S_);S_.forEach(v=>{n25++;if(v>5)free25++});
     // receivers standing still mid-play (the stutter / sitting) 
     P.wr.filter(w=>!w.hold).forEach(w=>{standN++;if(Math.hypot(w.vx||0,w.vy||0)<.5)stand++});
     if(!thrown&&P.car===P.qb&&!P.air){const W=P.wr.filter(w=>!w.hold&&w.y>g.los).map(w=>({w,s:Math.min(...P.def.map(d=>Math.hypot(d.x-w.x,d.y-w.y)))})).sort((a,b)=>b.s-a.s)[0];if(W){doThrow(W.w,W.w.x+(W.w.vx||0)*.6,W.w.y+(W.w.vy||0)*.6);thrown=true;att++}}}
   if(Math.abs(P.t-3.5)<.016&&!P.passed)s35.push(...sep(P));
   if(P.done||g.ph!=='live')break}
  if(thrown&&g.out){if(g.out.k!=='inc'&&g.out.k!=='to'&&P.car&&P.car!==P.qb){cmp++;yds+=Math.round(g.out.y-g.los)}}
 }
 const av=a=>a.length?+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2):null;
 o.sep25=av(s25);o.sep35=av(s35);o.wideOpen25=n25?+(free25/n25*100).toFixed(1):null;o.standing25=standN?+(stand/standN*100).toFixed(1):null;o.cmpPct=att?+(cmp/att*100).toFixed(1):null;o.ypa=att?+(yds/att).toFixed(1):null;o.att=att;
}catch(e){o.err=e.message+' '+(e.stack||'').split('\n')[1]}return o},sim);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out));await b.close()})();
