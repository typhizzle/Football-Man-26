const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 // snapshot BEFORE anything of mine runs
 const snap=()=>{const o=[];for(let i=0;i<(S.T||[]).length;i++){const L=(S.ro||{})['h.'+i];
   if(!Array.isArray(L))continue;
   L.forEach(x=>{if(x&&x.n)o.push(x.n+'|'+JSON.stringify(x.h||[])+'|'+JSON.stringify(x.tm||[])+'|'+(x.pos||'')+'|'+(x.ovr||''))})}
  return o.sort().join('\n')};
 const a=snap();
 out.before={players:a.split('\n').length,hash:[...a].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,7)};
 // now run everything: migration, label sync, roster generation, ballots, ledger, screens
 S=mig(S); taSync(1);
 for(let i=0;i<S.T.length;i++){try{rost('h.'+i)}catch(e){}}
 try{awFillAll()}catch(e){}
 try{szGet()}catch(e){}
 try{plSync(S)}catch(e){}
 const c=snap();
 out.after={players:c.split('\n').length,hash:[...c].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,7)};
 // what actually differs, if anything
 const A=new Set(a.split('\n')),C=new Set(c.split('\n'));
 out.lostLines=[...A].filter(x=>!C.has(x)).slice(0,8);
 out.newLines=[...C].filter(x=>!A.has(x)).slice(0,8);
 out.lostCount=[...A].filter(x=>!C.has(x)).length;
 out.newCount=[...C].filter(x=>!A.has(x)).length;
 // awards still all there
 out.awardYears=Object.keys(S.law||{}).length;
 out.verify=plVerify();
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
