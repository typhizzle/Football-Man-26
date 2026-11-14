// Halloween keepsake is ONE gift. Tyler, 2026-11-14: "It's supposed to be a one time gift.
// I was just given another." / "The reward must be kept in the menu, ready to claim until
// one of them is claim, they cannot claim all of them".
// Cause: the "already picked" record lived ONLY in browser storage (fm_hwkeep). A save
// opened anywhere that storage is empty (another copy of the game, Home Screen vs Safari,
// a cloud code imported on a fresh device) offered the treat again.
// Each check below CAN fail, and C fails on V230.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const clr=()=>{for(const k of Object.keys(localStorage))localStorage.removeItem(k)};
 clr();
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';save();try{zFlush()}catch(e){}
 const bar=()=>{try{return hwkBar()||''}catch(e){return 'ERR '+e.message}};
 // A: took part, never picked -> the treat waits in the menu
 out.A_offered=bar().includes('Open your treat');
 // D: "save it for later" keeps it waiting
 hwkOpen(0);hwkLater();out.D_stillWaitingAfterLater=bar().includes('Open your treat');
 // B: keep one -> gone, and a second keep does nothing
 hwkOpen(0);hwkShow();const first=HWPICK;hwkKeep();
 out.B_picked=first;out.B_hidden=bar()==='';
 const before=JSON.stringify(hwHats(S));
 HWKS=2;HWKI=1;try{hwkKeep()}catch(e){}
 out.B_secondKeepBlocked=JSON.stringify(hwHats(S))===before;
 // the pick must live IN THE SAVE itself
 const d=load(1);out.B_saveHoldsPick=!!(d&&Array.isArray(d.hwHats)&&d.hwHats.includes(first));
 // C: browser storage forgets the pick (another copy / fresh device), save still has it
 const raw=localStorage.getItem('fm_v4_1')!==null; // informational
 localStorage.removeItem('fm_hwkeep');localStorage.removeItem('fm_hwx2');
 HWKS=0;
 out.C_notOfferedAgain=bar()==='';
 out.C_picksLeft=hwPicksLeft();
 // C2: same with the save imported as the only thing on a fresh device
 const keepJ=JSON.stringify(S);clr();
 S=JSON.parse(keepJ);SLOT=1;LASTJ='';save();try{zFlush()}catch(e){}
 out.C2_freshDeviceNotOffered=bar()==='';
 // E: a save that already got TWO keeps both (Tyler: "But i will take it")
 S.hwHats=[S.hwHats[0],'zz_second'];const two=S.hwHats.slice();
 out.E_bothKept=JSON.stringify(hwHats(S).filter(k=>two.includes(k)))===JSON.stringify(two);
 // F: rendering the menu writes nothing to any save
 const snap=JSON.stringify(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)]));
 bar();bar();
 out.F_menuWritesNothing=JSON.stringify(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)]))===snap;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
