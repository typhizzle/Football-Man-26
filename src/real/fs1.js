// Tyler 2026-11-15: "put most of the stats things on the player menu in one section ... call it full statistics".
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.FS_FILE});const out={};
for(const f of ['simothy-2037.json','col-save-2026.json']){const j=fs.readFileSync('/home/claude/specs/'+f,'utf8');
 out[f]=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));save=()=>{};hub();
  const bt=[...ui.querySelectorAll('button')];o.one=bt.filter(x=>/Full statistics/.test(x.textContent)).length===1;
  o.goneFromMenu=!bt.some(x=>/^(🏆 Record book|📊 All-time leaders|🐐 GOAT list|📜 League history|🏅 League awards|📊 League stats|Career stats$)/.test(x.textContent.trim()));
  fstatV();const L=[...ui.querySelectorAll('button')].map(x=>[x.textContent.trim(),x.getAttribute('onclick')]);o.list=L.map(x=>x[0]).join(' | ');
  o.hasAll=['career stats','League stats','All-time leaders','Record book','GOAT'].every(k=>o.list.includes(k));
  let opened=0,errs_=[];for(const [t,oc] of L){if(/Back/.test(t))continue;try{fstatV();ui.innerHTML;(new Function(oc))();await new Promise(r=>setTimeout(r,50));if((ui.innerText||'').length>20)opened++}catch(e){errs_.push(t+': '+e.message)}}
  o.opened=opened;o.allOpen=opened===L.length-1&&!errs_.length;o.errs=errs_.join(' ; ')}catch(e){o.err=e.message}return o},j)}
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
