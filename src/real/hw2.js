// Halloween keepsake travels WITH the save code. Tyler 2026-11-14: "make sure when I give it to my
// friend, he gets it too, even through like his copy … if he copies his code, he can get it through
// that save when he pastes it". Fresh storage = a brand-new copy of the game (GitHub, another phone).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const clr=()=>{for(const k of Object.keys(localStorage))localStorage.removeItem(k)};
 const bar=()=>{try{return hwkBar()||''}catch(e){return 'ERR'}};
 const imp=async code=>{clr();const s=await readCode(code);S=s;SLOT=1;LASTJ='';save();try{zFlush()}catch(e){}};
 clr();let s=await readCode(j);S=s;SLOT=1;LASTJ='';save();try{zFlush()}catch(e){}
 // 1: friend trick-or-treated, never picked; copies his code; pastes it into a NEW copy
 let code=await mkCode();out.codeKind=String(code).slice(0,4);
 await imp(code);out.A_newCopyOffersTreat=bar().includes('Open your treat');
 // he picks it there
 hwkOpen(0);hwkShow();const pick=HWPICK;hwkKeep();out.B_picked=pick;
 // 2: he copies that save again and pastes it into ANOTHER new copy
 code=await mkCode();await imp(code);
 out.C_notOfferedTwice=bar()==='';
 out.C_keepsakeCameWithSave=hwHats(S).includes(pick);
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
