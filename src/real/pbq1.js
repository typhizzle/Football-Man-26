// PRO BOWL: EVERY QB IS HIS OWN PLAYER (Tyler 2026-11-17): Lamarcus Action showed white and wearing 25 (my number). The QB on your side
// wears his own number and skin; mine is only used when it is you.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{S=await readCode(j);SLOT=1;LASTJ='';hub();const o={};try{pbRep44();pbgStart();ovHide();
 let last=null;const _m3=mk3;mk3=function(j,s_,sk,lb,ap,nh,ar){last={num:lb&&lb.num,nm:lb&&lb.nm,ap:ap};return _m3.apply(this,arguments)};const run=q=>{g.clk=(q-1)*900+30;g.ph='pre';setup(0);const P=g.pl,qb=P.qb;last=null;sy(qb,g.mj,P.t,1);return {fn:qb.fn,num:qb.num,sk:qb.sk,drawNum:last&&last.num,drawNm:last&&last.nm,drawAp:last&&last.ap&&last.ap.hcl}};
 const q2=run(2);o.q2=q2;o.A_ownNumber=q2.fn==='Lamarcus Action'&&q2.num===8;o.A_ownSkin=q2.sk===plSkinOf({fn:'Lamarcus Action'});o.A_drawnOwn=q2.drawNum===8&&/ACTION/.test(q2.drawNm||'')&&q2.drawAp===PLK['Lamarcus Action'].h;
 const q3=run(3);o.q3=q3;o.B_meWhenMe=q3.fn===S.name&&q3.drawNum===S.num;
 }catch(e){o.err=e.message+' '+e.stack.slice(0,200)}return o},j);console.log(JSON.stringify(r));await b.close()})();
