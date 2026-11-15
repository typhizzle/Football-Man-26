// Tyler 2026-11-15: Mia at 90 (not 80), and even then she'll probably still say no: "she really likes you, but she doesn't date players".
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.MIA_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));save=()=>{};S.gf=null;S.stage='pro';S.age=Math.max(S.age||0,22);S.datOff=0;
 const setF=v=>{cfAdd('rmia',v-cfGet('rmia'))};const txt=()=>(document.getElementById('ov')||document.body).innerText;
 setF(85);talk('reporter','Reporter Mia · Post-game','How did it feel?','happy',[['A','ovHide()']]);o.A_label=/Flirt with Mia \(85\/90\)/.test(document.body.innerText);
 setF(89);S.cask={};celAsk('rmia');o.A_under90=/under 90/.test(document.body.innerText);
 let no=0,n=0;for(let i=0;i<400;i++){S.gf=null;S.cask={};setF(95);celAsk('rmia');n++;if(/don.t date players/.test(document.body.innerText))no++;ovHide()}
 o.B_noShare=+(no/n).toFixed(2);o.B_mostlyNo=no/n>.65&&no/n<.85;o.B_reason=no>0;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
