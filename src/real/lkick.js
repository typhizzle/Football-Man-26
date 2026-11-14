// live kicks: your field goal and your punt
const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));const out=[];
for(const kind of ['fg','punt']){await pg.evaluate(async(kind)=>{SLOT=1;if(!S){newC();start()}startGame0(1,'reg');await new Promise(r=>setTimeout(r,500));g.y=kind=='fg'?72:35;g.los=g.y;pre();ovHide();g.paused=1;if(kind=='fg')fg();else punt()},kind);
 for(let s=0;s<900;s++){const st=await pg.evaluate(()=>{for(let j=0;j<6;j++){if(g.ph=='kick')kTick(1/60);else break}return{ph:g.ph,t:g.kk&&+g.kk.t.toFixed(2),msg:g.msg,wb:g.pl&&g.pl.wb,s:g.s,note:g.note}});
  if(st.t&&[0.5,1.2,3.0,4.2].some(x=>Math.abs(st.t-x)<.06)){await pg.evaluate(()=>{const P=g.pl;if(P)cam=(P.fy!=null?P.fy:P.qb.y)+3;draw();draw()});await wait(200);await pg.screenshot({path:`/home/claude/real/thr/lk_${kind}_${st.t.toFixed(1)}.png`})}
  if(st.ph!='kick'){out.push({kind,end:st});break}}}
console.log(JSON.stringify(out));console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
