// Home and away jerseys (Tyler 2026-11-14). Fails on V250 (no home/away; you always wear your colors).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 const cd=(a,b)=>{const p=h=>[1,3,5].map(i=>parseInt(String(h).slice(i,i+2),16)||0),A=p(a),B=p(b);return Math.hypot(A[0]-B[0],A[1]-B[1],A[2]-B[2])};
 const W='#f4f4f4',dal=S.T.findIndex(t=>t.city==='Dallas'&&t.n==='Wildcatters');let n=0,homes=0,oneWhite=0,clash=0,homeWhite=0,awayColored=0;const wk0=S.wk;
 for(let o=1;o<S.T.length;o++){if(o===dal)continue;for(let w=0;w<17;w++){S.wk=w;g={oi:o,o:S.T[o],kind:'reg'};setMJ();n++;const h=g.home===0;if(h)homes++;
  const mw=g.mj.c1===W,ow=g.oj.c1===W;if(mw!==ow)oneWhite++;if(cd(g.mj.c1,g.oj.c1)<110)clash++;if(h&&!mw)homeWhite++;if(!h&&ow===false&&mw)awayColored++}}
 out.A_games=n;out.A_homeShare=+(homes/n).toFixed(2);out.B_exactlyOneInWhite=+(oneWhite/n).toFixed(2);out.C_clashes=clash;out.D_homeWearsColors=+(homeWhite/homes).toFixed(2);out.D_awayWearsWhite=+(awayColored/(n-homes)).toFixed(2);
 // Dallas: home in white, the visitor in colors; on the road Dallas in colors (Tyler: the Cowboys are the opposite)
 if(dal>0){let dh=null,da=null;for(let w=0;w<17&&(dh===null||da===null);w++){S.wk=w;g={oi:dal,o:S.T[dal],kind:'reg'};setMJ();if(g.home===1&&dh===null)dh={dal:g.oj.c1,me:g.mj.c1};if(g.home===0&&da===null)da={dal:g.oj.c1,me:g.mj.c1}}
  out.E_dallasHomeWhite=!!dh&&dh.dal===W&&dh.me!==W;out.E_dallasRoadColors=!!da&&da.dal===S.T[dal].c1&&cd(da.dal,da.me)>=110;out.E_da=JSON.stringify(da)}
 // playoffs: the better seed is home
 const T=[...Array(32).keys()];S.pb={sd:{RFC:[0,3,5,7,9,11,13],LFC:[16,18,20,22,24,26,28]},r:1};g={oi:13,o:S.T[13],kind:'pp'};setMJ();out.F_topSeedHome=g.home===0;
 S.pb={sd:{RFC:[5,3,0,7,9,11,13],LFC:[16,18,20,22,24,26,28]},r:1};g={oi:5,o:S.T[5],kind:'pp'};setMJ();out.F_lowerSeedAway=g.home===1;S.pb=null;S.wk=wk0;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);console.log(JSON.stringify(r,null,1));await b.close()})();
