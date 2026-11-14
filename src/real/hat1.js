// Tyler 2026-11-14: "I picked no headwear, but my skull mask is still on." The skeleton outfit's built-in
// skull is drawn only if no headwear choice was ever made; "No headwear" shows his own face.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{const s=await readCode(j);S=s;
 const count=hat=>{if(hat===undefined)delete S.hat;else S.hat=hat;const m=outfitM('hx6');let n=0,skull=0;m.traverse(o=>{if(o.isMesh){n++;const p=o.position;if(Math.abs(p.y-2.37)<.01&&Math.abs(o.geometry.parameters.width-.68)<.01)skull++}});return {n,skull}};
 out.neverChose=count(undefined);out.noHeadwear=count('');out.A_skullWhenNeverChose=out.neverChose.skull===1;out.B_noSkullWithNoHeadwear=out.noHeadwear.skull===0;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);console.log(JSON.stringify(r));await b.close()})();
