const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,tag=process.argv[4]||'p',stg=process.argv[5]||'hs';const {b,pg,errs}=await H.open({w:W,h:Hh});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(stg=>{SLOT=1;newC();start();S.name='Jameis Dubston';S.stars=4;S.q={acc:80,pow:78,awr:74,mob:78,sec:70,trk:66};let n=0;const hs=k=>{while(n++<k){const e=evt();if(e.t=='sum')nextYr();else if(e.t=='bye'||e.t=='comp'||e.t=='bench')play();else simUser();addOffers()}};hs(stg=='hs'?14:40);
 if(stg!='hs'){S.yr=5;addOffers(1);const o=S.off.slice().sort((a,b)=>b.ovr-a.ovr)[0];commit(o.n);enroll(o.n);for(const k in S.q)S.q[k]=86;S.sq=60;let m=0;while(m++<(stg=='col'?20:60)&&!S.cdone){const e=cevt();if(e.t=='sum'){if(!S.csum)mkCsum();if(S.cy>=3&&stg=='pro'){declare();break}colNext()}else if(e.t=='bye'||e.t=='cfpbye')cplay();else csim(e)}}
 if(stg=='pro'){dPrep();dpFinish();let g2=0;while(S.dr&&!S.dr.mine&&g2++<300)dPick();proStart(S.dr.mine?S.dr.mine.ti:0,S.dr.mine?S.dr.mine.pk:300);ovHide();for(const k in S.q)S.q[k]=92;S.sq=70;let m=0;while(m++<10){const e=pevt();if(e.t=='bye')pplay();else psim(e)}}
 LRNEXT=0;hub()},stg);
await wait(800);await pg.screenshot({path:`/home/claude/real/gs/${stg}_hub_${tag}.png`});
for(const t of ['sh','hl','bd','op','pr','hi']){await pg.evaluate(t=>{ovHide();gpV(t)},t);await wait(500);await pg.screenshot({path:`/home/claude/real/gs/${stg}_${t}_${tag}.png`,fullPage:false})}
console.log(stg,errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
