// tap every button on the main screens (and one level deeper) in each career stage; report errors / dead buttons
const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start();
 window.TAPLOG=[];window.oe=window.onerror;
 window.tapAll=(label,depth)=>{const SKIP=/retire|quitG|slotDel|trash|Gone|delete|negAct\(3\)|menu\(\)|expS|impScreen|location|confirm|reset|famEd|sell|hzMove|Sim|simUser|play\(|cplay|pplay|startGame|draftStart|declare|colNext|pNext|nextYr|enroll|faSign|tkStart|newC|start\(|wedPlan|propose|breakUp|gfBye|lrExit|hmExit|evExit|ovHide|hub\(\)|chub\(\)|phub\(\)/;
  const snap=()=>[...document.querySelectorAll('#ui button, #ov button')].map(b=>({t:b.textContent.trim().slice(0,40),o:b.getAttribute('onclick')||''})).filter(x=>x.o&&!SKIP.test(x.o));
  const base=snap();let n=0;
  base.forEach(btn=>{try{ovHide();const w=document.querySelector('#lrw');if(w)w.style.display='none';LR=null;M='lock';(0,eval)(label.go);}catch(e){TAPLOG.push(label.n+' RESET-ERR '+e.message);return}
   const before=ui.innerHTML.length+'|'+ov.style.display;
   try{(0,eval)(btn.o);n++}catch(e){TAPLOG.push(label.n+' ['+btn.t+'] '+btn.o.slice(0,60)+' => '+e.message);return}
   const after=ui.innerHTML.length+'|'+ov.style.display+'|'+(document.querySelector('#lrw')||{style:{}}).style.display;
   if(before==after.split('|').slice(0,2).join('|'))TAPLOG.push(label.n+' NOCHANGE ['+btn.t+'] '+btn.o.slice(0,60));
   const t=ui.innerText+' '+ov.innerText;const m=t.match(/NaN|undefined|\[object Object\]|Infinity/);if(m)TAPLOG.push(label.n+' BADTEXT ['+btn.t+'] '+m[0]+': '+t.slice(Math.max(0,t.indexOf(m[0])-60),t.indexOf(m[0])+20).replace(/\n/g,' / '));
   if(depth>0){try{const sub=snap().slice(0,25);sub.forEach(s2=>{try{(0,eval)(s2.o)}catch(e){TAPLOG.push(label.n+' > ['+btn.t+'] > ['+s2.t+'] '+s2.o.slice(0,50)+' => '+e.message)}})}catch(e){}}
  });return n}},C.DRV);
const stages=[['hs',2],['col',2],['pro',2]];
for(const [stg,yrs] of stages){
 await pg.evaluate((stg)=>{let n=0;while(n++<5000&&(S.stage||'hs')!=stg){if(!step())break}let k=0;while(k++<30&&(S.stage||'hs')==stg&&(S.wk||0)<4){if(!step())break}},stg);
 const r=await pg.evaluate((stg)=>{try{ovHide();hub()}catch(e){}const lab={n:stg,go:"hub()"};const n=tapAll(lab,1);const l2={n:stg+'-gspn',go:"gpV()"};const n2=tapAll(l2,0);const l3={n:stg+'-phone',go:"phoneV()"};tapAll(l3,0);const l4={n:stg+'-sp',go:"spV()"};tapAll(l4,0);const l5={n:stg+'-home',go:"homeV()"};tapAll(l5,0);return stg+' tapped '+n+'+'+n2},stg);
 console.log(r);}
console.log((await pg.evaluate(()=>[...new Set(TAPLOG)].join('\n'))).slice(0,6000));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,10));await b.close()})();
