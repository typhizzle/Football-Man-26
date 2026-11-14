const H=require('/home/claude/real/h.js');
(async()=>{const {b,pg}=await H.open({});
const r=await pg.evaluate(async()=>{const out={};try{
 newC();
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v};
 set('nm','Test Player');set('nu','7');set('ht','Dallas');
 start();
 if(typeof S=='undefined'||!S||!S.seed){out.err='no career';return out}
 const look=()=>{taSync(1);return {stage:S.stage,teams:(S.T||[]).length,
   slot0:(S.T[0]||{}).n+' -> '+tSlot(0),
   slot5:(S.T[5]?S.T[5].n+' -> '+tSlot(5):'n/a'),
   blanks:(S.T||[]).map((t,i)=>tSlot(i)).filter(x=>!x).length,
   dupes:(()=>{const c={};let d=0;(S.T||[]).forEach((t,i)=>{const a=tSlot(i);c[a]=(c[a]||0)+1});
     Object.keys(c).forEach(k=>{if(c[k]>1)d++});return d})(),
   verify:(typeof plVerify=='function')?plVerify().awardMismatches.length:'n/a'}};
 out.hs=look();
 // walk to college
 let n=0;while(S.stage=='hs'&&n<200){try{pNext()}catch(e){out.hsErr=e.message;break}n++}
 out.col=look();
 n=0;while(S.stage=='col'&&n<400){try{pNext()}catch(e){out.colErr=e.message;break}n++}
 out.pro=look();
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out});
console.log(JSON.stringify(r,null,1));await b.close()})();
