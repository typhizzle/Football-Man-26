// The canvas must cover the ENTIRE viewport at any phone size, with no page
// background showing through. Checks several real device sizes, both orientations.
const H=require('/home/claude/real/h.js');
const SIZES=[
 ['iPhone SE portrait',375,667],['iPhone SE landscape',667,375],
 ['iPhone 14 portrait',390,844],['iPhone 14 landscape',844,390],
 ['iPhone 15 Pro Max portrait',430,932],['iPhone 15 Pro Max landscape',932,430],
 ['small android',360,780],['tablet',820,1180]];
(async()=>{
 const {b,pg,errs}=await H.open({});
 for(const [name,w,h] of SIZES){
  await pg.setViewport({width:w,height:h,deviceScaleFactor:2});
  await pg.evaluate(()=>{try{resize()}catch(e){}});
  await new Promise(r=>setTimeout(r,250));
  const r=await pg.evaluate(()=>{
   const c=document.getElementById('c3'),b=c.getBoundingClientRect();
   const vw=innerWidth,vh=innerHeight;
   const cs=getComputedStyle(document.documentElement);
   return {cw:Math.round(b.width),ch:Math.round(b.height),left:Math.round(b.left),top:Math.round(b.top),
           vw,vh,rootPadTop:cs.paddingTop,rootPadBot:cs.paddingBottom,
           W:(typeof W!='undefined'?W:null),Hh:(typeof H!='undefined'?H:null)};
  });
  const covers=(r.cw>=r.vw-1 && r.ch>=r.vh-1 && r.left<=0.5 && r.top<=0.5);
  console.log(`${name.padEnd(28)} viewport ${r.vw}x${r.vh}  canvas ${r.cw}x${r.ch} @(${r.left},${r.top})  rootPad ${r.rootPadTop}/${r.rootPadBot}  ${covers?'FILLS':'*** GAP ***'}`);
 }
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
