const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844,file:process.argv[2]});
console.log(await pg.evaluate(()=>{SLOT=2;newC();start();S.yr=4;addOffers(1);S.yr=5;endC();enroll(S.off[0].n);S.cy=3;mkCsum();declare();dpFinish();let n=0;while(!S.dr.mine&&n++<300)dPick();
 const hi=S.T.findIndex(t=>pIdx(t)==8);proStart(hi>=0?hi:0,S.dr.mine?S.dr.mine.pk:0);
 const all=()=>Object.values(S.ro).flat().filter(Boolean),o=[];S.T.forEach((t,i)=>rost('h.'+i));
 o.push('team '+tn(S.T[0])+' pIdx '+pIdx(S.T[0]));
 const f=all().filter(x=>x.n=='Coleridge Loud');o.push('CL count '+f.length+' '+f.map(x=>x.ovr+' #'+x.num).join(','));
 const L=rost('h.0');o.push('QBs: '+[0,23,24,25,26].map(k=>L[k]?L[k].n+' '+L[k].ovr:'-').join(' | '));
 // all QBP + PKS + QBB present?
 const miss=[];QBP.forEach(q=>{if(!all().some(x=>x.n==q[0]))miss.push(q[0])});PKS.forEach(q=>{if(!all().some(x=>x.n==q[2]))miss.push(q[2])});QBB.forEach(q=>{if(!all().some(x=>x.n==q[0]))miss.push('bk:'+q[0])});
 o.push('missing: '+miss.join(', '));save();S=load(2);o.push('after reload CL: '+all().filter(x=>x.n=='Coleridge Loud').length);return o.join('\n')}));console.log(errs.slice(0,5).join('\n'));
await b.close()})();
