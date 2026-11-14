// Every draft listed and watchable, live when it happens; Goatie's roster + Yeezers (Tyler 2026-11-14).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.DW_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 const held=Object.keys(S.dc||{}).filter(k=>S.dc[k].done).map(Number);o.held=held;
 if(typeof drYears!='function'){o.err='no full draft list';return o}
 o.A_allListed=held.every(y=>drYears().includes(y))&&held.length>0;
 const y=held[held.length-1],first=S.dc[y].picks.slice().sort((a,b)=>a.p-b.p)[0];npbV(y,1);o.B_boardIsReal=(ui.innerText||'').includes(first.n);
 drWatch(y);await new Promise(r=>setTimeout(r,400));o.C_watching=typeof DN!='undefined'&&DN&&DN.yr===y&&DN.rows.length===32&&DN.rows[0].n===first.n;
 // live offer
 S.dcSeen={};S.dcLive=y;M='';ui.style.display='block';hub();o.D_liveOffered=!!ui.querySelector('[data-drlive]');
 S.dcSeen[y]=1;hub();o.D_goneOnceSeen=!ui.querySelector('[data-drlive]');
 // brands
 o.E_goatie=JSON.stringify(BRDEF["Goatie's"])===JSON.stringify(['typhizzle','wesscoastt','mjaxon']);o.E_yeezers=SPB.some(b=>b[1]==='Yeezers')&&BRCLOTH.includes('Yeezers')&&BRDEF.Yeezers[0]==='kyeast';
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
