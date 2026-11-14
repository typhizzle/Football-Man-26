// Swipe intent (Tyler 2026-11-14, 9 screenshots): a swipe that ENDS on a receiver goes to him,
// curved or straight, short or long, first-person or Flick view; a swipe that runs past him into the
// sky goes deep over him. Then full plays thrown that way: completion rate.
const H=require('/home/claude/real/h.js'),fs=require('fs');const SWN=+(process.env.SWN||56);
(async()=>{const {b,pg,errs}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
await pg.evaluate((n,f)=>{window.SWN=n;window.SWFIX=f},SWN,+(process.env.SWFIX||2));const r=await pg.evaluate(async(j)=>{const out={cases:{},err:[]};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';startGame0(1,'reg');
 const PP=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')PP.push([c,i])});
 const tally={};const add=(k,ok)=>{tally[k]=tally[k]||{n:0,ok:0};tally[k].n++;if(ok)tally[k].ok++};
 let comp=0,att=0;
 const NP=+(window.SWN||48);for(let n=0;n<NP;n++){const view=n%2?'flick':'fp';
  try{g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);const pp=PP[n%PP.length];snap(pp[0],pp[1]);
   CAMI=view=='fp'?1:0;g.sw=0;LY=0;for(let k=0;k<50;k++){try{upd(.03)}catch(e){}if(!g.pl||g.pl.done)break}
   const P=g.pl;if(!P||P.done||P.air||P.car!==P.qb)continue;const q=P.qb;
   // the most open man in front of us
   let w=null,bs=-1;(P.wr||[]).forEach(x=>{if(!x||x.out||x.y<q.y+2)return;const sp=Math.min(...P.def.map(d=>Math.hypot(d.x-x.x,d.y-x.y)));if(sp>bs){bs=sp;w=x}});if(!w)continue;
   if(view=='fp'&&window.SWFIX!==1)LY=Math.atan2(w.x-q.x,w.y-q.y)+(window.SWFIX===2?(n%4<2?.24:-.24):0);try{draw()}catch(e){}
   if(window.SWFIX===1||window.SWFIX===2){const c=pj(w.x,w.y,.8);if(!(c[0]>20&&c[0]<W-20&&c[1]>H*.2&&c[1]<H*.8))continue}
   const v=16+S.q.pow*.1,T=Math.max(.25,Math.hypot(w.x-q.x,w.y-q.y)/v),ex=w.x+w.vx*T,ey=w.y+w.vy*T;
   const a=pj(w.x,w.y,0),bb=pj(w.x,w.y,1.6),tgt=[(a[0]+bb[0])/2,(a[1]+bb[1])/2];
   const st=view=='fp'?[W/2,H*.88]:pj(q.x,q.y,1.6);
   const kind=['straight','curved','short','over'][Math.floor(n/2)%4];
   let end=tgt.slice();if(kind=='over')end=[tgt[0],Math.max(8,Math.min(a[1],bb[1])-Math.max(160,Math.abs(a[1]-bb[1])*4))];
   // build the stroke the way a thumb draws it
   const pts=[];const N=14,bulge=kind=='curved'?(n%4<2?1:-1)*Math.hypot(end[0]-st[0],end[1]-st[1])*.25:0;
   const s0=kind=='short'?[end[0]+(st[0]-end[0])*.35,end[1]+(st[1]-end[1])*.35]:st;
   for(let i=0;i<=N;i++){const f=i/N,mx=s0[0]+(end[0]-s0[0])*f,my=s0[1]+(end[1]-s0[1])*f,dx=end[0]-s0[0],dy=end[1]-s0[1],l=Math.hypot(dx,dy)||1;
    pts.push({x:mx+(-dy/l)*bulge*Math.sin(Math.PI*f),y:my+(dx/l)*bulge*Math.sin(Math.PI*f),t:performance.now()-200+f*200})}
   const k0=pts[Math.floor(pts.length*.25)],ddx=end[0]-k0.x,ddy=end[1]-k0.y,dl=Math.hypot(ddx,ddy)||1;
   const Ln=Math.hypot(end[0]-s0[0],end[1]-s0[1]),M=Math.min(W,H),p=Math.min(1.15,Math.pow(Math.min(2,Ln/(M*.55)),1.35)*.9);
   const cmp0=g.st.cmp||0;swThrow(ddx/dl,ddy/dl,p,s0[0],s0[1],pts,end[0],end[1]);
   if(!P.air){add(view+'/'+kind,false);continue}
   const miss=Math.hypot(P.air.lx-ex,P.air.ly-ey);
   add(view+'/'+kind,kind=='over'?(P.air.ly>ey+2&&Math.abs(P.air.lx-ex)<6):miss<3.5);
   const rec={view,kind,aim:(window.SWAIM||{}).k,miss:+miss.toFixed(1),dist:+Math.hypot(ex-q.x,ey-q.y).toFixed(1),sep:+bs.toFixed(1)};(out.log=out.log||[]).push(rec);
   if(kind!='over'){att++;for(let k=0;k<260;k++){try{upd(.03)}catch(e){}if(!g.pl||g.pl.done||(!g.pl.air&&g.pl.passed))break}rec.res=(g.st.cmp||0)>cmp0?'C':String(g.msg||'').slice(0,18);(out.byKind=out.byKind||{});const bk=out.byKind[kind]=out.byKind[kind]||{a:0,c:0,bu:0};bk.a++;if(rec.res=='C')bk.c++;if(/broken/i.test(rec.res))bk.bu++;if((g.st.cmp||0)>cmp0)comp++}
  }catch(e){out.err.push(String(e.message).slice(0,80))}}
 out.cases=tally;out.compRate=att?Math.round(comp/att*100):0;out.att=att;
}catch(e){out.err.push(e.message)}return out},j);
r.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(r,null,1));await b.close()})();
