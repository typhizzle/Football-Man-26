// PLAYER LIVES MATTER AUDIT (Tyler, 2026-11-16: "each update you make a couple mistakes where player lives seem to matter a little
// less"). Every one of Tyler's real cloud saves + the stored saves + a fresh world, loaded the way the game loads them, checked
// against the rules in one place. Any rule broken anywhere fails the gate.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-all-2026-11-16';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
const specs=['simothy-2037','simothy-2035','col-save-2026','hs-save-2022','tyler-save-snapshot-2026-11-07'].map(n=>[n,fs.readFileSync('/home/claude/specs/'+n+'.json','utf8')]);
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PLM_FILE});
const out=await pg.evaluate(async([docs,specs])=>{const o={problems:[],checked:[]};try{window.confirm=()=>true;window.alert=()=>{};save=()=>{};
 const named=new Set();try{PKS.forEach(q=>named.add(q[2]));QBB.forEach(b=>named.add(b[0]));QBP.forEach(q=>named.add(q[0]));FA26.forEach(e=>named.add(e[0]));ADD26.forEach(e=>named.add(e[2]))}catch(e){}
 const audit=(label,s)=>{const P=[];try{const Y=(()=>{const S0=S;S=s;try{return yrN()}finally{S=S0}})();
  if(!(Y>=2022&&Y<=2070))P.push('year '+Y);
  if(s.tk&&s.stage==='pro'){const played=(s.hist||[]).filter(h=>String(h.y)[0]==='P').length;if(Y!==2026+played)P.push('takeover year '+Y+' (played '+played+')')}
  if(s.sgFix)P.push('had '+s.sgFix+' stat lines from unplayed seasons');if(s.tkyN)P.push('had '+s.tkyN+' invented seasons');
  if(typeof posFixAll=='function'){const S0=S;S=s;let n=0;try{n=posFixAll(s)}finally{S=S0}if(n)P.push(n+' rosters had players out of position')}
  const seen={},pids={};let teams=0;for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;if(/^h\.\d+$/.test(k))teams++;L.forEach((x,i)=>{if(!x||!x.n)return;if(k!=='fa'&&named.has(x.n))(seen[x.n]=seen[x.n]||[]).push(k+'#'+i);if(x.pid&&k!=='fa')(pids[x.pid]=pids[x.pid]||[]).push(k+'#'+i+' '+x.n)})}
  Object.keys(seen).forEach(n=>{if(seen[n].length>1)P.push(n+' on two rosters: '+seen[n].join(', '))});Object.keys(pids).forEach(p=>{if(pids[p].length>1)P.push('one man twice: '+pids[p].join(' / '))});
  if(s.stage==='pro'&&teams<32)P.push('only '+teams+' pro rosters');for(const k in s.ro){const L=s.ro[k];if(Array.isArray(L)&&/^h\.\d+$/.test(k)&&s.stage==='pro'&&L.filter(Boolean).length<23)P.push(k+' has '+L.filter(Boolean).length+' players')}
  const me=s.ro&&s.ro['h.0']&&s.ro['h.0'][0];if(s.stage&&s.stage!=='hs'&&s.name&&!(me&&me.n===s.name))P.push('you are not at the top of your roster');
  for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(x&&Array.isArray(x.h))x.h.forEach(r=>{if(Array.isArray(r)&&typeof r[0]=='number'&&r[0]>Y)P.push(x.n+' has a '+r[0]+' line in '+Y)})})}
 }catch(e){P.push('audit crashed: '+e.message)}o.checked.push(label);if(P.length)o.problems.push(label+': '+P.slice(0,4).join(' | '))};
 const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};
 for(const i of [1,2,3,4,6]){try{const s=await cdGet2(d,'x/slot'+i);if(!s)continue;try{s.ro=await cdGet2(d,'x/ro'+i)}catch(e){}if(s.ro)audit('cloud slot '+i+' ('+s.name+')',mig(JSON.parse(JSON.stringify(s))))}catch(e){o.problems.push('cloud slot '+i+': '+e.message)}}
 specs.forEach(([n,raw])=>audit('stored '+n,mig(JSON.parse(raw))));
 localStorage.clear();SLOT=5;newC();try{start()}catch(e){}audit('new high school world',S);
 localStorage.clear();SLOT=5;newC();tkStart();await new Promise(r=>setTimeout(r,1200));const e=tkList().find(x=>/MaClones/.test(x.n));tkGo(e.i);ovHide();for(let i=0;i<3;i++){const ev=pevt();if(ev.t=='pro')psim(ev)}audit('new takeover (MaClones) after 3 weeks',S);
 o.A_allClean=o.problems.length===0;}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},[docs,specs]);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
