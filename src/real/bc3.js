// CHK 7-10: sim pro seasons in a takeover save; contracts, FA, cap growth, screens
const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));window.E=[];window.T=(n,f)=>{try{return f()}catch(e){E.push(n+': '+e.message+' @'+(e.stack||'').split('\n')[1])}};
 window.bad=(n,t)=>{t=String(t);const i=t.search(/NaN|undefined|\bnull\b|\[object|Infinity/);if(i>=0)E.push(n+' BADTEXT: '+t.slice(Math.max(0,i-70),i+30).replace(/\n/g,' / '))};
 window.scr=(st)=>{for(const [n,f] of [['hub',()=>hub()],['ctV',()=>ctV('all')],['ctV2',()=>ctV('OTH')],['career',()=>career()],['rosv',()=>rosv()],['lg',()=>lg()],['awV',()=>awV()],['trophy',()=>trophyV()],['spV',()=>spV()],['homeV',()=>homeV()],['famV',()=>famV()],['relV',()=>relV()],['gpV',()=>gpV()],['recV',()=>recV()],['lgWeek',()=>lgWeek()]]){T(st+' '+n,f);bad(st+' '+n,ui.innerText)}ovHide()}},C.DRV);
console.log(await pg.evaluate(()=>{SLOT=3;try{newC();start()}catch(e){}const e=tkList().find(x=>x.n=='Drako September');tkGo(e.i);ovHide();scr('start');return S.name+' ct '+JSON.stringify(S.ct)}));
const log=[];
for(let s=0;s<12;s++){const r=await pg.evaluate(()=>{const py=S.py;let n=0;while(n++<400&&S.py==py&&!S.ret){if(!step())break}scr('P'+S.py);const me=lgCts().find(x=>x.me);return {py:S.py,age:S.age,ct:S.ct&&{...S.ct},cap:capMax('QB'),mval:mval(),ret:S.ret,team:tn(S.T[0]),top:lgCts().slice(0,3).map(x=>x.n+' $'+x.sal+' '+x.left+'y '+x.note).join(' ; '),over:lgCts().filter(x=>x.sal>capMax(x.pos)+.01).map(x=>x.n+' '+x.sal).slice(0,4).join(',')}});log.push(r);console.log(JSON.stringify(r));if(r.ret)break}
console.log(await pg.evaluate(()=>[...new Set(E)].slice(0,25).join('\n')||'no E'));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,8));await b.close()})();
