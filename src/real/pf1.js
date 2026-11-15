// Tyler 2026-11-15 (screenshot: Houston Godfrey, a TE, lined up at RB for the Eagles): "All players should keep their own positions no
// matter what. Any players I made should not be removed." Taking over Jacque Hilton III used to slide the whole Eagles roster up spots.
const H=require('/home/claude/real/h.js'),fs=require('fs');
const specs=['simothy-2037','col-save-2026','hs-save-2022','tyler-save-snapshot-2026-11-07'].map(n=>[n,fs.readFileSync('/home/claude/specs/'+n+'.json','utf8')]);
(async()=>{const {b,pg,errs}=await H.open({});
await pg.evaluate(()=>{window.confirm=()=>true;window.alert=()=>{};localStorage.clear();SLOT=5;newC();tkStart()});await new Promise(r=>setTimeout(r,1500));
const out=await pg.evaluate(async(specs)=>{const o={};try{
 const G=p=>lgGrp(p);const ok=L=>POSL.every((p,j)=>j===0||!L[j]||G(L[j].pos)===G(p));
 const before=rost('p.16').filter(Boolean).map(x=>x.n);const e=tkList().find(x=>/Hilton/.test(x.n));tkGo(e.i);ovHide();const L=rost('h.0');
 o.A_spots=ok(L);o.A_rb=L[1]&&L[1].n==='Jaquan Barker';o.A_te=L[5]&&L[5].n==='Houston Godfrey';o.A_you=L[0].n===S.name;o.A_oldStarterBackup=[23,24].some(j=>L[j]&&L[j].n==='Jay-Jay Pain');
 const after=L.filter(Boolean).map(x=>x.n);o.gone=before.filter(n=>n!==S.name&&!after.includes(n)).join(',');o.new=after.filter(n=>n!==S.name&&!before.includes(n)).join(',');o.A_nobodyGone=before.every(n=>n===S.name||after.includes(n));o.A_nobodyMadeUp=after.every(n=>n===S.name||before.includes(n));o.A_once=after.filter(n=>n===S.name).length===1;
 // B: a save the old version broke (spots slid up) is put back on load, nobody lost
 const raw=JSON.parse(JSON.stringify(S));const BL=raw.ro['h.0'];BL.push(BL.splice(1,1)[0]);BL.splice(3,0,BL.splice(23,1)[0]);const names=BL.filter(Boolean).map(x=>x.n).sort().join('|');const m=mig(raw);const ML=m.ro['h.0'];
 o.B_fixed=ok(ML)&&ML[0].n===S.name;o.Bpos=ML.slice(0,8).map(x=>x&&x.pos).join(',');o.Bposfix=m.posfix;o.B_same=ML.filter(Boolean).map(x=>x.n).sort().join('|')===names;
 // C: healthy saves are not touched
 o.C_untouched=specs.every(([n,r])=>!(mig(JSON.parse(r)).posfix));
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},specs);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
