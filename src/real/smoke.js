const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));window.E=[];window.T=(n,f)=>{try{f()}catch(e){E.push(n+': '+e.message+' @'+(e.stack||'').split('\n')[1])}};
 window.screens=st=>{T(st+' hub',()=>hub());T(st+' gp',()=>{for(const k of ['hl','sh','bd','op','pr','hi'])gpV(k)});T(st+' lgs',()=>{lgsV('p');lgsV('c');const y=lgsYears('p');if(y.length)lgsV('p',y[0])});T(st+' rosv',()=>rosv());T(st+' rosT',()=>{for(let i=0;i<Math.min(4,S.T.length);i++)rosT(i)});
  T(st+' pCard',()=>{for(let i=0;i<3;i++){const L=rost('h.'+i);for(let j=0;j<L.length;j+=5)pCard(i,j)}});T(st+' rec',()=>{recV('pro',0);recV('col',0)});T(st+' goat',()=>{goatV('qb');goatV('all')});T(st+' career',()=>career());T(st+' staff',()=>staffV());T(st+' leaders',()=>leaders());
  T(st+' uCard',()=>{uCard(29);uCard(32);uCard(39)});if((S.stage||'hs')=='hs')T(st+' offers',()=>{addOffers(1);offers();if(S.off.length)offerView(0);colList('c');colList('r')});T(st+' lroom',()=>{if(lrB()){lroom();lrExit()}})};
 SLOT=1;newC();start();screens('hs1')},C.DRV);
const plan=[['hs',60],['col',60],['draft',0],['pro',80]];
for(const [stg,ev] of plan){for(let chunk=0;chunk<40;chunk++){const r=await pg.evaluate((stg,ev)=>{let n=0;while(n++<120&&(S.stage||'hs')==stg){if(!step())return 'end';if(ev&&n%ev==0)screens(stg)}return S.stage||'hs'},stg,ev);if(r!=stg)break}
 await pg.evaluate((stg)=>screens(stg+'-end'),stg)}
const out=await pg.evaluate(()=>({stage:S.stage,py:S.py,E:[...new Set(E)].slice(0,12)}));
console.log(JSON.stringify(out,null,1));console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,10)));await b.close()})();
