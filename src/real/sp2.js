const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
const ev=async(f,...a)=>{try{return await pg.evaluate(f,...a)}catch(e){return 'ERR '+e.message.slice(0,600)}};
console.log(await ev(j=>{SLOT=1;S=mig(JSON.parse(j));return 'mig ok'},sj));
console.log(await ev(()=>{S.pop=95;return 'pop'}));
console.log(await ev(()=>{hub();return 'hub ok'}));
console.log(await ev(()=>{return myFans()+' '+celFans().length}));
await b.close()})();
