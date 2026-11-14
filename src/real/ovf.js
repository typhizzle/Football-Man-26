const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:360,h:740});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const C=require('/home/claude/t41/ctx.js');await pg.evaluate(()=>{SLOT=1;newC();start();ovHide()});await pg.evaluate(C.DRV+';window.step=step;');
await pg.evaluate(()=>{let n=0;while(n++<6000){if(S.stage=='col'&&S.wk>=5)break;if(!step())break}ovHide();const w=document.querySelector('#lrw');if(w)w.style.display='none';LR=null});
const screens=["famV()","famEd()","homeV()","newC()"];
for(const sc of screens){const r=await pg.evaluate(s=>{try{eval(s)}catch(e){return 'ERR '+e.message}ui.style.display='block';const out=[];document.querySelectorAll('#ui *').forEach(el=>{const cs=getComputedStyle(el);if(el.children.length==0&&el.textContent.trim()&&(el.scrollWidth>el.clientWidth+2||el.getBoundingClientRect().right>window.innerWidth+1))out.push(el.tagName+':'+el.textContent.trim().slice(0,40)+' sw'+el.scrollWidth+' cw'+el.clientWidth+' r'+Math.round(el.getBoundingClientRect().right))});return out.slice(0,6).join(' | ')},sc);console.log(sc,'=>',r||'ok')}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
