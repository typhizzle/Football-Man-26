const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
console.log(await pg.evaluate(()=>{SLOT=1;newC();start();const o=[];
 // mimic an existing-player pro save that starts in 2026
 S.yr=4;addOffers(1);S.yr=5;endC();enroll(S.off[0].n);S.cy=3;mkCsum();declare();dpFinish();let n=0;while(!S.dr.mine&&n++<300)dPick();proStart(S.dr.mine?S.dr.mine.ti:0,S.dr.mine?S.dr.mine.pk:0);S.y0=2026;S.hist=[];o.push('yr '+yrN());
 for(const lv of ['p','c']){LGS.y=null;lgsV(lv);o.push(lv+': years '+[...ui.querySelectorAll('.tabs')[1]?.querySelectorAll('button')||[]].map(b=>b.textContent).join(',')+' | '+ui.innerText.replace(/\s+/g,' ').slice(0,260))}
 lgsV('p',2023);o.push('2023: '+ui.innerText.replace(/\s+/g,' ').slice(0,300));return o.join('\n')}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
