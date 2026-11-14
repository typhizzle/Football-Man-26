const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();start();S.stage='pro';S.py=2;S.pop=95;S.cash=5e6;});
for(const v of ['goat','gala']){await pg.evaluate((v)=>{LR=null;S.spe={k:wkKey(),L:[{k:v=='gala'?'gala':'party',v,n:'Test',d:'x'}],done:[]};spEv2(0,0)},v);await wait(2500);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/ev_'+v+'.png'});
 console.log(v,await pg.evaluate(()=>LR.O.map(o=>o.k+(o.n?':'+o.n:'')).join(', ')));await pg.evaluate(()=>{try{lrExit()}catch(e){}})}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,10));await b.close()})();
