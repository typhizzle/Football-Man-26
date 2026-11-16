// Tyler 2026-11-15: "Instead of popping up all the endorsements at once ... show up week by week ... maybe just a couple of those a year".
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.SPW_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));save=()=>{};S.spOff=0;S.spLv=2;S.spo=null;S.spc=[];S.wk=0;
 const brand=O=>O.L.filter(x=>x.cat!=='event'&&x.cat!=='celeb');
 let O=spEns();o.A_week1=brand(O).length;o.A_one=o.A_week1===1;o.A_goatyFirst=/Goat/i.test(brand(O)[0]&&brand(O)[0].b||'');
 S.wk=2;O=spEns();o.B_week3=brand(O).length;S.wk=6;O=spEns();o.B_week7=brand(O).length;S.wk=16;O=spEns();o.B_week17=brand(O).length;o.B_gradual=o.B_week3<=o.B_week7&&o.B_week7<=o.B_week17&&o.B_week17===3&&o.B_week3>=1;
 // signing the shown one signs that one
 S.wk=0;O=spEns();const first=brand(O)[0];const i=O.L.indexOf(first);spSign(i);o.C_signed=(S.spc||[]).some(c=>c.b===first.b);
 // the sponsor page says more can come
 S.wk=0;spV();o.D_note=/one at a time/.test(ui.innerText);
 // the meter: Very few = 1 a season, As many as possible = 7
 S.spLv=0;S.spo=null;S.spc=[];S.wk=16;o.E_veryFew=brand(spEns()).length;S.spLv=4;S.spo=null;o.E_max=brand(spEns()).length;o.E_meter=o.E_veryFew===1&&o.E_max>=6;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
