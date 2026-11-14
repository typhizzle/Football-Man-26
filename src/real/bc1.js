// BUG CHECK 1-6: play-as-existing QB for every QB, contracts, rosters, duplicates
const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{window.E=[];window.T=(n,f)=>{try{return f()}catch(e){E.push(n+': '+e.message+' @'+(e.stack||'').split('\n')[1])}};window.bad=(n,t)=>{const m=String(t).match(/NaN|undefined|\bnull\b|\[object|Infinity/g);if(m)E.push(n+' BADTEXT '+m.join(',')+' :: '+String(t).slice(Math.max(0,String(t).search(/NaN|undefined|\bnull\b|\[object|Infinity/)-60),String(t).search(/NaN|undefined|\bnull\b|\[object|Infinity/)+30))}});
// 1: every existing QB can be taken over
const qn=await pg.evaluate(()=>{SLOT=4;newC();tkStart();return 1});await wait(800);
const L=await pg.evaluate(()=>tkList().map(e=>e.n));
for(const n of L){const r=await pg.evaluate(n=>{SLOT=4;try{start()}catch(e){}const e=tkList().find(x=>x.n==n);T('tkGo '+n,()=>tkGo(e.i));ovHide();
 const p=[];if(S.name!=n)p.push('name '+S.name);if(!(S.ct&&S.ct.sal>0&&S.ct.yrs>0))p.push('ct '+JSON.stringify(S.ct));if(!(S.cash>=0))p.push('cash');if(qo(S.q)<50)p.push('ovr '+qo(S.q));if(Math.abs(qo(S.q)-e.ovr)>0)p.push('ovr mismatch '+qo(S.q)+' vs '+e.ovr);if(S.jy.nm!=nmLast(n))p.push('jersey '+S.jy.nm);if(S.num!=QNUM[e.i])p.push('num '+S.num+' vs '+QNUM[e.i]);if(gpS().hl.some(x=>/drafted|round 0|pick 0/i.test(x.h)))p.push('draft news');if(tn(S.T[0])!=e.team)p.push('team '+tn(S.T[0])+' vs '+e.team);
 T('hub '+n,()=>hub());bad('hub '+n,ui.innerText);T('ct '+n,()=>ctV('all'));bad('ctV '+n,ui.innerText);
 const me=lgCts().filter(x=>x.n.startsWith(n));if(me.length!=1)p.push('appears '+me.length+'x in contracts');
 return p.join('; ')},n);if(r)console.log('CHK1',n,r)}
// 2-6 on last save: rosters
console.log(await pg.evaluate(()=>{const out=[];S.pro.forEach((t,k)=>rost('p.'+k));const seen={};
 for(const k in S.ro){const R_=S.ro[k];if(!Array.isArray(R_)||!(k[0]=='p'||k[0]=='h'))continue;const nums={};R_.forEach((x,i)=>{if(!x){out.push('empty slot '+k+':'+i);return}if(!x.pos)out.push('nopos '+x.n+' '+k+':'+i);if(!(x.ovr>0))out.push('noovr '+x.n);(seen[x.n]=seen[x.n]||[]).push(k);if(nums[x.num]&&x.num!=null)out.push('dup# '+k+' #'+x.num+' '+nums[x.num]+'/'+x.n);nums[x.num]=x.n})}
 const stars=[...PKS.map(q=>q[2]),...QBB.map(b=>b[0]),...QBP.map(q=>q[0])];stars.forEach(n=>{const s=seen[n]||[];if(s.length!=1&&n!=S.name)out.push('star '+n+' x'+s.length+' '+s.join(','))});
 Object.keys(seen).forEach(n=>{if(seen[n].length>1&&!stars.includes(n))out.push('dupname '+n+' '+seen[n].join(','))});
 // contracts sanity
 lgCts().forEach(c=>{if(!(c.sal>0)||!(c.left>=1)||c.sal>capMax(c.pos)+0.01&&!c.real)out.push('ct '+c.n+' '+c.sal+' '+c.left)});
 return 'CHK2-6: '+(out.slice(0,40).join('\n')||'ok')+' ('+out.length+')'}));
console.log(await pg.evaluate(()=>[...new Set(E)].slice(0,20).join('\n')||'no E'));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,8));await b.close()})();
