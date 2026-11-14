const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
const r=await pg.evaluate(()=>{SLOT=1;newC();start();S.yr=4;addOffers(1);S.yr=5;endC();enroll(S.off[0].n);S.cy=3;mkCsum();declare();dpFinish();let n=0;while(!S.dr.mine&&n++<300)dPick();proStart(S.dr.mine?S.dr.mine.ti:0,S.dr.mine?S.dr.mine.pk:0);
 const o=[];const mk=(ti,k,num)=>{const x=rost('h.'+ti)[k];x.age=46;x.pk=95;x.ovr=90;x.h=Array(11).fill([2020,ti]);x.ny=11;x.num=num;x.aw={mvp:1};return x.n};
 S.rjMan=1;const a=mk(3,2,44),b2=mk(7,6,71);leagueDev();o.push('pend '+(S.rjP||[]).length+' '+(S.rjP||[]).map(x=>x.n+'#'+x.num+x.code+' rec'+x.rec).join(','));
 hub();o.push('btn '+!![...ui.querySelectorAll('button')].find(x=>/Retired numbers/.test(x.textContent)&&/review/.test(x.innerHTML)));
 RJV.all=1;rjV();o.push('checks '+ui.querySelectorAll('.rjck').length);rjApply();o.push('after '+HM+' | pend '+(S.rjP||[]).length+' | rj '+JSON.stringify(S.rj));
 // auto mode
 S.rjMan=0;const c=mk(10,3,8);leagueDev();o.push('auto msg '+S.rjMsg);hub();o.push('shown '+/Jerseys retired/.test(ui.innerText)+' IND '+JSON.stringify(S.rj.IND));
 // nobody wears a retired number
 const bad=[];S.T.forEach((t,i)=>{const R_=rjSet(rjCode(t));rost('h.'+i).forEach((x,k)=>{if(!(i==0&&k==0)&&R_.has(x.num)&&isGen(x.n))bad.push(x.n+'#'+x.num+'@'+rjCode(t))})});o.push('gen wearing retired: '+bad.length+' '+bad.slice(0,3));
 rjV('KC');return o.join('\n')});console.log(r);await pg.screenshot({path:SP+'rj_v.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
