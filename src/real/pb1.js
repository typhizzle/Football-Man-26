// A real pro playoff bracket with seeds and records (Tyler 2026-11-14). Fails on V243 (no bracket).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 ppSetup();const T=S.T,seeds=[...S.pb.sd.RFC,...S.pb.sd.LFC];
 const h0=(typeof ppSvg=='function')?ppSvg():'';out.A_hasBracket=h0.includes('<svg');
 out.B_allSeedsWithRecord=seeds.every(i=>h0.includes('>'+tAb(T[i])+'<')&&h0.includes('>'+tRec(T[i])+'<'));
 out.B_seeds=seeds.length;
 // seeds are ordered by record inside each conference among wildcards (division winners first)
 while(!S.pb.done)ppAdv(0);
 const h1=ppSvg();out.C_champShown=h1.includes(tn(T[S.pb.champ]));
 const games=S.pb.hist.flat();out.C_games=games.length;
 out.C_everyScoreShown=games.every(g=>h1.includes('>'+g[3]+'<')&&h1.includes('>'+g[4]+'<'));
 ui.innerHTML='<div>'+ppHtml()+'</div>';out.D_onScreen=!!ui.querySelector('svg');
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));
if(process.argv[2]){await pg.evaluate(()=>{ui.style.display='block';ui.scrollTop=0});await pg.screenshot({path:process.argv[2]});}
await b.close()})();
