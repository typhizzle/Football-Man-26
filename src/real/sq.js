const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
const ev=async(f,...a)=>{try{return await pg.evaluate(f,...a)}catch(e){return 'ERR '+e.stack.slice(0,300)}};
console.log(await ev(j=>{SLOT=1;S=mig(JSON.parse(j));relV();const a=(ui.innerText.match(/Studying[^\n]*/)||[''])[0];const g_=S.gf;let r=[a,'chance '+proChance(g_).toFixed(2)];
 S.pro=S.pro||S.T.slice(0,8);g_.cls=4;let made=0;for(let i=0;i<200;i++){const c={...g_,pro:0,grad:0,cls:4};if(gfProTry(c))made++}r.push('made pro '+made+'/200');
 g_.pro=1;g_.team='Dallas Rangers';g_.pyrs=1;g_.grad=0;squadV('Dallas Rangers');r.push(ui.innerText.split('\n').slice(0,6).join(' | '));const Q=S.chq['Dallas Rangers'];Q.y-=2;sqEns('Dallas Rangers');squadV('Dallas Rangers');r.push(ui.innerText.split('\n').slice(2,6).join(' | '));relV();r.push(/See her squad/.test(ui.innerText));return r.join('\n')},sj));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
