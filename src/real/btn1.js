// Verify: League office button ACTUALLY taps, and no blank Ultra Bowl MVPs
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{const s=await readCode(j);S=s;SLOT=1;LASTJ='';hub();
  const btn=document.getElementById('lgob');
  return {exists:!!btn, hasAttr:btn?btn.getAttribute('onclick'):null,
          hasProp:btn?(typeof btn.onclick):'n/a', text:btn?btn.textContent.slice(0,30):''};},save);
 console.log('BUTTON:',JSON.stringify(out));

 // actually tap it like a finger would, then see if the League office screen opened
 const tapped=await pg.evaluate(()=>{const b=document.getElementById('lgob');if(!b)return 'no button';
   b.dispatchEvent(new MouseEvent('click',{bubbles:true}));
   return document.getElementById('ui').innerText.slice(0,60).replace(/\n/g,' | ');});
 console.log('AFTER TAP:',tapped);
 await pg.screenshot({path:'/home/claude/real/shot_lgoffice.png'});

 // blank MVP check across every season
 const mv=await pg.evaluate(()=>{const bad=[],all=[];const last=yrN()-1;
   for(let Y=2026;Y<=last;Y++){try{const c=uChamp(Y);const m=(c&&c.sbm)?String(c.sbm).trim():'';
     all.push(Y+': '+TA[c.ub]+' MVP '+(m||'(BLANK)'));if(!m||m=='-'||m=='—')bad.push(Y)}catch(e){bad.push(Y+' ERR')}}
   return {all,bad};});
 console.log('\nMVPs:');mv.all.forEach(x=>console.log('  '+x));
 console.log('BLANK MVPs:',mv.bad.length?mv.bad:'NONE');
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
