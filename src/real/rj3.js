const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:844,h:470});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
const r=await pg.evaluate(()=>{SLOT=1;newC();start();S.yr=4;addOffers(1);S.yr=5;endC();enroll(S.off[0].n);S.cy=3;mkCsum();declare();dpFinish();let n=0;while(!S.dr.mine&&n++<300)dPick();proStart(TA.indexOf('PHI'),5);
 const o=[];const pit=S.T.findIndex(t=>rjCode(t)=='PIT');o.push('PIT: '+rost('h.'+pit).filter(x=>/Pittboy|Midcalf|Wardell|Rammer|Haywire|Patterson|Jaxon Saw|Waddle/.test(x.n)).map(x=>x.n+' '+x.pos+' #'+x.num+' '+x.ovr).join(', '));
 o.push('PHI list '+rjList('PHI').map(x=>x.num).join(','));
 // pending star retirement
 const kc=S.T.findIndex(t=>rjCode(t)=='KC');const m=rost('h.'+kc).find(x=>x.n=='Ricky MaClones');if(m){m.age=55;leagueDev();o.push('KC 15: '+JSON.stringify((S.rj||{}).KC))}
 // owner logic: 8 strong seasons with PHI incl. a ring
 S.y0=2026;S.hist=[];S.htm=[];S.aw=[];for(let k=0;k<8;k++){S.hist.push({y:'P'+(k+1),yds:4300,td:33});S.htm.push(tn(S.T[0]))}S.aw.push('Pro yr 3: Ultra Bowl Champion','Pro yr 3: Ultra Bowl MVP','Pro yr 5: MVP','Pro yr 5: All-Pro');S.pop=85;S.num=7;S.rjMe=null;rjOwner();o.push('owner: '+S.rjMeMsg);
 S.rjMe=null;S.pop=50;rjOwner();o.push('low fans: '+S.rjMeMsg);
 return o.join('\n')});console.log(r);
await pg.evaluate(()=>{S.rj={};lroom();ovHide();$('#lrw').style.display='none';window.lrTick=function(){cm.fov=70;cm.position.set(-9,4.5,4.2);cm.lookAt(-19.6,4.5,4.2);cm.updateProjectionMatrix()}});await w(1300);await pg.screenshot({path:'/home/claude/real/lr/rj_big.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
