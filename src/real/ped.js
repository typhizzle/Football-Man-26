const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
console.log(await pg.evaluate(()=>{let n=0;while(n++<5000&&S.stage!='pro'){if(!step())break}const o=[];settings();o.push('setting shown '+/Player editing/.test(ui.innerText));S.edOk=1;
 const L=rost('h.3');const j=L.findIndex((x,k)=>k&&x.h&&x.h.length>=4);const x=L[j];o.push('before '+x.n+' age '+x.age+' seasons '+x.h.length+' firstYr '+x.h[0][0]+' cs '+JSON.stringify(x.cs));
 pCard(3,j);o.push('edit btn '+[...ui.querySelectorAll('button')].some(b=>/Edit player/.test(b.textContent)));pEdit(3,j);$('#pe_ag').value=x.age-3;$('#pe_ov').value=91;$('#pe_sk').value=4;pEditSave(3,j);o.push('younger: age '+x.age+' seasons '+x.h.length+' firstYr '+x.h[0][0]+' ovr '+x.ovr+' look '+JSON.stringify(S.pled[x.n]));
 pEdit(3,j);$('#pe_ag').value=x.age+5;$('#pe_n').value='Test Renamed';pEditSave(3,j);o.push('older: age '+x.age+' seasons '+x.h.length+' firstYr '+x.h[0][0]+' name '+x.n+' cs '+JSON.stringify(x.cs));
 rosT(3);o.push('roster shows new name '+ui.innerText.includes('Test Renamed'));return o.join('\n')}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
