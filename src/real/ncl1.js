// The draft class screen must not call the followed group "Your class".
// Tyler 2026-11-14: "It says my class, but that's not my class. That's just the first class that I put in the game."
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 npxV();const t=ui.innerText||'';
 out.A_noYourClass=!/your class/i.test(t);out.B_labelledFollowed=/First class followed/.test(t);
 out.C_titleIsThisSeason=new RegExp('Draft class · '+yrN()).test(t);out.D_hasBack=/Back/.test(t);
}catch(e){out.err=e.message}return out},j);console.log(JSON.stringify(r,null,1));await b.close()})();
