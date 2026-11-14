const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1200));
console.log(await pg.evaluate(()=>{SLOT=1;newC();start();const o=[];o.push('hwDay '+hwDay());hwClaim&&0;S.hwd={c:[]};const _d=hwDay;hwClaim();o.push('inv '+JSON.stringify(S.inv)+' hwd '+JSON.stringify(S.hwd)+' hwg '+S.hwg);
 wardV('cas','');const eq=[...ui.querySelectorAll('button')].filter(b=>/hx4/.test(b.getAttribute('onclick')||''));o.push('equip buttons '+eq.length);if(eq[0])eq[0].click();o.push('wear '+JSON.stringify(S.wear)+' cos '+S.cos);
 const m=outfitM('hx4');o.push('model '+!!m);hub();o.push('after hub inv '+JSON.stringify(S.inv)+' wear '+JSON.stringify(S.wear));
 homeWalk();o.push('home pm children '+(LR&&LR.pm?LR.pm.children.length:'-')+' outfit '+(LR&&LR.pm&&LR.pm.userData?JSON.stringify(LR.pm.userData):''));return o.join('\n')}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
