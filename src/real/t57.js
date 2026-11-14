const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
const ev=async(f,...a)=>{try{return await pg.evaluate(f,...a)}catch(e){return 'ERR '+e.stack.slice(0,400)}};
console.log(await ev(j=>{SLOT=1;S=mig(JSON.parse(j));S.lgr=96;S.lgw=1;S.lgtd=5;potWalk();return LR.O.map(o=>o.k).join(',')},sj));
await wait(1500);await pg.screenshot({path:'bw/pm1.png'});
// full interview
console.log(await ev(()=>{potShow();const out=[ov.innerText.split('\n').slice(0,3).join(' ')];pmAsk();let n=0;while(PMV&&n<12){const t=ov.innerText.split('\n');out.push(t[0]+' :: '+t[1].slice(0,90));pmAns(n%4);out.push('   → '+ov.innerText.split('\n').slice(1,3).join(' ').slice(0,110));if(PMV&&PMV.asked>=PMV.n){pmAsk();break}pmAsk();n++}out.push('END: '+ov.innerText.replace(/\n/g,' ').slice(0,200));out.push('said='+JSON.stringify(S.pms.said).slice(0,200)+' pot friend='+cfGet('potmcgee'));return out.join('\n')}));
// second visit uses memory
console.log(await ev(()=>{ovHide();pmBuild();return 'visit2 n='+PMV.n+' qs='+PMV.q.map(q=>q.id).join(',')+' | '+(PMV.q.find(q=>/^cb/.test(q.id))||{t:''}).t.slice(0,120)}));
// swipe throw
console.log(await ev(()=>{PMV=null;ovHide();LR.shotDone=0;potShot(0);return !!document.querySelector('#pswp')}));
await wait(600);await pg.screenshot({path:'bw/pm2.png'});
await pg.mouse.move(195,700);await pg.mouse.down();await pg.mouse.move(195,560,{steps:5});await pg.mouse.move(195,520,{steps:5});await pg.mouse.up();
await wait(400);await pg.screenshot({path:'bw/pm3.png'});await wait(2500);
console.log(await ev(()=>ov.innerText.replace(/\n/g,' ').slice(0,200)+' | viral='+S.viral));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
