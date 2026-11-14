const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.tab='Short';g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450))});
const N=+process.argv[2]||240,MODE=process.argv[3]||'all',OLD=process.argv[4]=='old';
const res=await pg.evaluate(async([N,MODE,OLD])=>{if(OLD){icpt=(d,t,ld)=>[t.x+(t.vx||0)*ld,t.y+(t.vy||0)*ld];purF=function(d,t){try{if(!g||!g.pl||!g.pl.run||!t)return 1;const gain=t.y-g.los,behind=t.y-d.y;if(gain<6||behind<0)return 1;return 1+cl(behind/40,0,.18)+cl((gain-10)/150,0,.08)}catch(e){return 1}}}const out={};if(!window.__w){window.__w=1;const _e=endPlay;endPlay=function(ye,tx,o){window.__ye=ye;window.__tx=tx;return _e.apply(this,arguments)}}const T=['Short','Medium','Deep','Run'];
 for(let k=0;k<N;k++){try{ovHide();if(g.ph=='opp'){applyO();ovHide()}g.ph='pre';g.watch=0;g.sw=0;g.ot=0;g.kk=null;
  g.y=25+(k*7)%50;g.dn=1+(k%3);g.tg=k%3==2?7:10;g.s=[0,0];g.clk=600;setup(0);g.ui=0;const tab=MODE=='run'?'Run':MODE=='pass'?T[k%3]:T[k%4];g.sel=[tab,k%3];g.stage='line';g.tk=1;hut();const P=g.pl;if(!P)continue;const dc=P.dc,y0=g.los;window.__ye=null;window.__tx='';let thr=0,tw=null,catchY=null;
  for(let i=0;i<900&&g.ph=='live';i++){upd(.033);if(!thr&&!P.passed&&P.call.t!='run'&&P.t>1.6+(k%3)*.4&&P.car===P.qb){let best=null,bs=-1;P.wr.forEach(w=>{const s=Math.min(...P.def.map(d=>Math.hypot(d.x-w.x,d.y-w.y)));if(s>bs){bs=s;best=w}});if(best){doThrow(best,best.x+(best.vx||0)*.5,best.y+(best.vy||0)*.5);thr=1;tw=best}}
   if(thr&&catchY==null&&P.car&&P.car!==P.qb&&!P.ir)catchY=P.car.y}
  const ye=g.pl&&g.pl.ye!=null?g.pl.ye:null;const o=out[dc]=out[dc]||{n:0,att:0,cmp:0,yds:0,yac:0,big:0,int:0,sk:0,run:0,ry:0,txt:{}};o.n++;
  const res_=window.__tx||'';const YE=window.__ye==null?y0:window.__ye;const tx=(g.note||'')+'|'+res_;o.txt[res_.slice(0,18)]=(o.txt[res_.slice(0,18)]||0)+1;
  if(P.call.t=='run'){o.run++;o.ry+=(YE-y0)}
  else if(thr){o.att++;if(P.ir||/INTERCEPT/.test(res_))o.int++;else if(catchY!=null){o.cmp++;const yd=YE-y0;o.yds+=yd;o.yac+=YE-catchY;if(yd>=30)o.big++}}
  else if(/SACK/.test(res_))o.sk++;
  if(g.ph=='dead'){g.dt=0;try{after()}catch(e){}}
  for(let j=0;j<30&&g.ph!='pre';j++){ovHide();if(g.ph=='opp'){try{applyO()}catch(e){}}else if(g.ph=='dead'){g.dt=0;try{after()}catch(e){}}else break}
 }catch(e){(out.err=out.err||[]).push(e.message)}}return out},[N,MODE,OLD]);
const tot={n:0,cmp:0,att:0,yds:0,yac:0,big:0,run:0,ry:0,sk:0,int:0};for(const k in res){if(k!='err')for(const f in tot)tot[f]+=res[k][f]||0;const o=res[k];if(k=='err'){console.log('ERR',o.slice(0,3));continue}const tt=Object.entries(o.txt).sort((a,b)=>b[1]-a[1]).slice(0,4).map(x=>x.join(':')).join(' ');console.log(k.padEnd(8),'n',o.n,'cmp',o.cmp+'/'+o.att,'ypc',(o.yds/Math.max(1,o.cmp)).toFixed(1),'yac',(o.yac/Math.max(1,o.cmp)).toFixed(1),'30+',o.big,'int',o.int,'sk',o.sk,'ypr',(o.ry/Math.max(1,o.run)).toFixed(1),'runs',o.run,tt)}
console.log('TOTAL cmp',tot.cmp+'/'+tot.att,'ypc',(tot.yds/Math.max(1,tot.cmp)).toFixed(1),'yac',(tot.yac/Math.max(1,tot.cmp)).toFixed(1),'30+',tot.big,'int',tot.int,'sk',tot.sk,'ypr',(tot.ry/Math.max(1,tot.run)).toFixed(2),'runs',tot.run);console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));await b.close()})();
