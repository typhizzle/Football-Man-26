// UPGRADES NEVER JUMP TO THE TOP (permanent): on a Mac-sized screen and a phone, scroll down the menu, tap +1 on a rating and on a pass
// type; the menu stays where it was.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const out={};for(const [w,h,dpr] of [[1440,900,2],[390,844,1]]){const {b,pg}=await H.open({w,h,dpr});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
 out[w]=await pg.evaluate(async(j)=>{const o={};try{S=mig(JSON.parse(j));SLOT=4;save=()=>{};S.pts=500;S.q.acc=80;S.qp={lob:70,tch:70,blt:70};hub();await new Promise(r=>setTimeout(r,300));
  const sc=()=>Math.max(ui.scrollTop,document.scrollingElement.scrollTop);const btn=[...ui.querySelectorAll('button')].find(x=>/up\('acc'\)/.test(x.getAttribute('onclick')||''));
  if(!btn){o.err='no upgrade button';return o}btn.scrollIntoView();await new Promise(r=>setTimeout(r,100));const y0=sc();o.y0=y0;
  btn.click();await new Promise(r=>setTimeout(r,400));o.A_rating=sc()===y0&&y0>0;
  const pb=[...ui.querySelectorAll('button')].find(x=>/ptUp\(/.test(x.getAttribute('onclick')||''));if(pb){pb.scrollIntoView();await new Promise(r=>setTimeout(r,100));const y1=sc();pb.click();await new Promise(r=>setTimeout(r,400));o.B_passType=sc()===y1&&y1>0}else o.B_passType='no button';
 }catch(e){o.err=e.message}return o},j);await b.close()}console.log(JSON.stringify(out))})();
