const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
const r=await pg.evaluate(j=>{SLOT=1;S=mig(JSON.parse(j));const w=document.querySelector('#lrw');try{hub()}catch(e){return 'hub err '+e.message}if(w)w.style.display='none';LR=null;ui.style.display='block';try{lrExit()}catch(e){}const H=ui.innerHTML;return [H.includes('relV()'),H.includes('Dating'),H.indexOf('Relationship'),H.length,(H.match(/<div class=card><b>([^<]*)/g)||[]).join(' | ')]},sj);console.log(JSON.stringify(r));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
