const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
const sweep=async(stg)=>pg.evaluate((stg)=>{const out=[],bad=[];const run=(lab,code)=>{try{(new Function(code))()}catch(e){bad.push(lab+' => '+e.message)}};
 const scenes={lroom:()=>lroom(),home:()=>homeWalk(),celeb:()=>celRoom()};
 if(stg!='hs'){scenes.field=()=>{try{play()}catch(e){}ovHide();g.o=g.o||S.T[g.oi];g.m=g.m||S.T[0];g.s=[24,17];g.w=1;g.ph='ovr';fieldWalk()}}
 for(const [sn,fn] of Object.entries(scenes)){const keep=JSON.stringify(S);try{fn()}catch(e){bad.push(sn+' open => '+e.message);continue}if(!LR||!LR.O){bad.push(sn+' no LR');continue}const objs=LR.O.slice();let talked=0;
  for(const o of objs){const keep2=JSON.stringify(S);try{if(sn=='field'&&typeof fwAct=='function'&&!o.k.startsWith('m'))fwAct(o);else lrAct(o);talked++}catch(e){bad.push(sn+' talk '+(o.n||o.k)+' => '+e.message);continue}
   const btns=[...document.querySelectorAll('#ov button')].map(x=>[x.textContent.trim().slice(0,24),x.getAttribute('onclick')]).filter(x=>x[1]);
   for(const [t,c] of btns){const k3=JSON.stringify(S);if(/confirm\(|Break up|menu\(\)|retire|Delete|lrExit|scene\(|fieldWalk|lroom|homeWalk|celRoom|evWalk|studio|potGo|play\(|sim/i.test(c+t))continue;run(sn+'>'+(o.n||o.k)+'>['+t+']',c);try{ovHide()}catch(e){}S=JSON.parse(k3);if(!LR)break}
   S=JSON.parse(keep2);if(!LR)try{fn()}catch(e){}}
  out.push(sn+': '+objs.length+' people/things, talked '+talked);S=JSON.parse(keep);try{lrExit()}catch(e){}}
 return out.join(' | ')+'\n'+(bad.length?bad.slice(0,25).join('\n'):'no errors')},stg);
for(const stg of ['hs','col','pro']){await pg.evaluate((stg)=>{let n=0;while(n++<5000&&(S.stage||'hs')!=stg){if(!step())break}let k=0;while(k++<15&&(S.wk||0)<3&&(S.stage||'hs')==stg)step()},stg);console.log('== '+stg+'\n'+await sweep(stg))}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,8));await b.close()})();
