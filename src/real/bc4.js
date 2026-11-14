// CHK 11-14: full normal career HS->col->draft->pro with many screens + bad-text scan
const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));window.E=[];window.T=(n,f)=>{try{return f()}catch(e){E.push(n+': '+e.message+' @'+(e.stack||'').split('\n')[1])}};
 window.bad=(n,t)=>{t=String(t);const i=t.search(/NaN|undefined|\bnull\b|\[object|Infinity/);if(i>=0)E.push(n+' BADTEXT: '+t.slice(Math.max(0,i-70),i+30).replace(/\n/g,' / '))};
 const L=[['hub',()=>hub()],['career',()=>career()],['rosv',()=>rosv()],['lg',()=>lg()],['trophy',()=>trophyV()],['spV',()=>spV()],['homeV',()=>homeV()],['famV',()=>famV()],['relV',()=>relV()],['phone',()=>phoneV()],['phMsgs',()=>phMsgs()],['twV',()=>twV()],['twV2',()=>twV('me')],['celRoom',()=>celRoom()],['staff',()=>staffV()],['agent',()=>agentV()],['own',()=>ownV()],['crV',()=>crV()],['lgWeek',()=>lgWeek()],['recV',()=>recV()],['goat',()=>goatV()],['lb',()=>lbV()],['awV',()=>awV()],['ctV',()=>ctV('all')],['npx',()=>npxV()]];
 window.scr=(st)=>{for(const [n,f] of L){if(n=='ctV'&&S.stage!='pro')continue;T(st+' '+n,f);bad(st+' '+n,ui.innerText);ovHide()}};
 SLOT=1;newC();start();scr('hs0')},C.DRV);
const plan=[['hs',50],['col',50],['draft',0],['pro',60]];
for(const [stg,ev] of plan){for(let chunk=0;chunk<40;chunk++){const r=await pg.evaluate((stg,ev)=>{let n=0;while(n++<120&&(S.stage||'hs')==stg){if(!T('step',()=>step()))if(S.ret)return 'end';if(ev&&n%ev==0)scr(stg+(S.yr||S.cy||S.py))}return S.stage||'hs'},stg,ev);if(r!=stg)break}
 await pg.evaluate((stg)=>scr(stg+'-end'),stg)}
const out=await pg.evaluate(()=>({stage:S.stage,py:S.py,age:S.age,ret:S.ret,E:[...new Set(E.map(e=>e.replace(/(hs|col|pro|draft)[0-9-a-z]*/,'$1')))].slice(0,30)}));
console.log(JSON.stringify(out,null,1));console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,10)));await b.close()})();
