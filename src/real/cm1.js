// Coaches move between levels, NEW saves only (Tyler: "progress from high school to college to pro"; agreed new saves only).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.CM_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 if(typeof cmvOn!='function'){o.err='coaches never change level';return o}
 const colT=(S.col||[]).flatMap(c=>c.t||[]);colT.forEach(t=>{if(!t.cch)t.cch=stf(t)});const snap=JSON.stringify(colT.map(t=>t.cch&&t.cch.n));
 // A: an existing save (no new-save flag): a pro opening never takes a college coach
 S.cmv2=0;for(let i=0;i<60;i++)hireFrom('pro',S.T[5]);o.A_existingUntouched=JSON.stringify(colT.map(t=>t.cch&&t.cch.n))===snap;
 // B: a new save: a pro opening can take the best winning college head coach
 S.cmv2=1;crSync(S,yrN());const best=cmvBest(colT,'col',72);const bn=best&&best.cch&&best.cch.n,bid=best&&crId(best.cch,S);
 let c1={},tries=0;while(tries++<200){c1=hireFrom('pro',S.T[6]);if(c1.cid===bid)break}o.tries=tries;
 o.collegeCoach=bn;o.B_movedUp=!!bn&&c1.n===bn&&c1.cid===bid;
 o.B_recordSaysSo=!!bid&&S.cr.c[bid].out.some(q=>q[1]==='left for the pros');
 o.B_schoolReplaced=!!best&&best.cch&&best.cch.n!==bn&&!!S.cr.c[best.cch.cid];
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
