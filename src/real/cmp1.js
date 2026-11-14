const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844,file:process.argv[2]});
console.log(await pg.evaluate(async()=>{SLOT=1;newC();start();S.q.acc=80;S.q.pow=80;startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();const out={};
 for(const dc of ['man','cover1','cover3','cover2']){let att=0,cmp=0,yds=0,ints=0;
  for(let rep=0;rep<40;rep++){const _d=defCall;defCall=()=>dc;g.ph='pre';g.y=25;g.los=25;g.dn=1;g.tg=10;setup(0);defCall=_d;ovHide();g.sel=[['Deep','Short','Medium'][rep%3],rep%4];g.stage='line';g.ui=0;hut();g.paused=1;
   const P=g.pl;if(!P)continue;const st0={...g.st};let thrown=0,y0=g.los;for(let s=0;s<600&&!P.done&&g.ph=='live';s++){upd(1/60);if(!thrown&&P.t>=2.1&&P.car===P.qb){let bw=null,bs=-1;P.wr.slice(0,4).forEach(w=>{const m=Math.min(...P.def.map(d=>Math.hypot(d.x-w.x,d.y-w.y)));if(m>bs){bs=m;bw=w}});if(bw){doThrow(bw,bw.x+bw.vx*.5,bw.y+bw.vy*.5);thrown=1}}}
   if(thrown){att++;if((g.st.cmp||0)>(st0.cmp||0))cmp++;if((g.st.int||0)>(st0.int||0))ints++;yds+=(g.st.yds||0)-(st0.yds||0)}g.paused=0;g.ph='pre'}
  out[dc]=cmp+'/'+att+' int '+ints+' yds/att '+(yds/Math.max(1,att)).toFixed(1)}
 return JSON.stringify(out)+' stkeys '+Object.keys(g.st).join(',')}));console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
