const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');const step=process.argv[2]||'1';
await pg.evaluate(j=>{window.confirm=()=>true;window.prompt=()=>'X';SLOT=1;S=mig(JSON.parse(j));famEns()},sj);console.log('loaded');
const r=await pg.evaluate(()=>{try{homeWalk();return 'ok '+LR.O.map(x=>x.k).join(',')}catch(e){return 'ERR '+e.stack}});console.log(r);await wait(1500);await pg.screenshot({path:'/home/claude/real/bw/home1.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
