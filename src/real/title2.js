const H=require('./h.js');(async()=>{const out=[];for(const [W,Hh,tag] of [[390,844,'p1'],[375,667,'p2'],[430,932,'p3'],[844,390,'l1'],[667,375,'l2']]){const {b,pg,errs}=await H.open({w:W,h:Hh,dpr:1});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.addStyleTag({content:'.ttl span{font-family:Impact,serif!important;letter-spacing:.08em!important}'});
const chk=()=>pg.evaluate(()=>{const e=ui.querySelector('.ttl'),r=e.getBoundingClientRect(),p=PL.cv.position,t=v3.set(p.x,4.9,p.z).project(cm),hx=(t.x+1)/2*W,hy=(1-t.y)/2*H;return{tb:Math.round(r.bottom),tl:Math.round(r.left),tr:Math.round(r.right),hx:Math.round(hx),hy:Math.round(hy),dy:+(PL.dy||0).toFixed(2),ok:!(hx>r.left-20&&hx<r.right+20&&hy<r.bottom+4),screen:ui.querySelector('.att')?'attract':'menu'}});
await wait(4000);out.push(tag+' '+JSON.stringify(await chk()));await pg.screenshot({path:`/home/claude/real/t2_${tag}_a.png`});
await pg.evaluate(()=>menuMain());await wait(4000);out.push(tag+' '+JSON.stringify(await chk()));await pg.screenshot({path:`/home/claude/real/t2_${tag}_m.png`});
if(errs.filter(e=>!/ERR_FAILED/.test(e)).length)out.push(errs);await b.close()}console.log(out.join('\n'))})();
