const H=require('./h.js'),fs=require('fs');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const sv=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
console.log(await pg.evaluate((sv)=>{localStorage.setItem('footballman_v1_6',sv);SLOT=6;S=load(6);hub();const L=rost('h.0');return tn(S.T[0])+' QBs: '+L.map((x,i)=>x&&x.pos=='QB'?i+':'+x.n+' '+x.ovr:null).filter(Boolean).join(' | ')+' · svLog '+(S.svLog||[]).join(',')},sv));await b.close()})();
