// MADDEN BUTTON LAYOUT (Tyler 2026-11-17): □/X left outside WR, △/Y slot, ✕/A tight end, ○/B right outside WR, R1/RB running back,
// from each play's alignment, one button per receiver, never two buttons on one man.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const o={ok:true,bad:[]};try{S=await readCode(j);SLOT=1;LASTJ='';hub();
 for(const nm of ['Hitches','Curl-Flat','Four Verts','Mesh','Smash']){startGame0(1,'reg');let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(p[0]===nm)pp=[c,i]});g.ph='pre';g.y=25;setup(0);g.sel=pp;snap(pp[0],pp[1]);ui.style.display='none';ov.style.display='none';upd(1/30);
  const C=ctlRecv(),P=g.pl,xs=C.map(w=>w&&(w.x0!=null?w.x0:w.x));const others=[0,1,3].map(i=>xs[i]);
  const good=C[4]===P.rb&&xs[2]<=Math.min(...others)&&xs[1]>=Math.max(...others)&&new Set(C.filter(Boolean)).size===C.filter(Boolean).length&&C.filter(Boolean).length===Math.min(5,P.wr.filter(w=>!w.out).length)&&(!C[0]||C[0].pos==='TE'||Math.abs(xs[0]-26.65)<=Math.abs(xs[3]-26.65));
  if(!good){o.ok=false;o.bad.push(nm+':'+JSON.stringify(C.map(w=>w&&[w.pos,Math.round(w.x0)])))}}
 // the button for the left outside man throws to him
 const P=g.pl,want=ctlRecv()[2];ctlThrow(2);o.throwLeft=!!(P.air&&P.air.tgt===want);
 o.glyphs=[0,1,2,3,4].map(i=>ctlGlyph(i));
 }catch(e){o.err=e.message;o.ok=false}return o},j);console.log(JSON.stringify(r));await b.close()})();
