// Cloud saves always fit and never fail silently (Tyler 2026-11-14: "I simulated, and then now I'm back at
// the very beginning"). A fake cloud that enforces the real 256 KB document limit. Fails on V251.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const store={};let failAll=false;const DB={doc:k=>({get:async()=>({exists:k in store,data:()=>store[k]}),set:async o=>{if(failAll)throw new Error('network down');const n=JSON.stringify(o).length;if(n>256*1024)throw new Error('document too large ('+Math.round(n/1024)+' KB)');store[k]=JSON.parse(JSON.stringify(o))}})};
 window.claude={use:async k=>k==='user'?{id:async()=>'tyler'}:k==='db'?DB:null};
 for(const k of Object.keys(localStorage))localStorage.removeItem(k);
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';await cloudInit();
 // grow the save well past one document, like a season of simulating does
 S.wk=15;S.bigPad=Array.from({length:4000},(_,i)=>({n:'pad'+i,h:[[2035,i%32,i*3,i%17,i*2,1]]}));save();try{zFlush()}catch(e){}
 const ts=S.ts;cloudQ();await new Promise(r=>setTimeout(r,2600));
 const head=store['data/users/tyler/slot1'];out.A_uploaded=!!head;out.A_pieces=head&&head.n;out.A_noWarning=!S.cloudErr;
 out.A_biggestDocKB=Math.round(Math.max(...Object.values(store).map(o=>JSON.stringify(o).length))/1024);
 // the device copy disappears; the cloud must give back THIS save, not an old one
 for(const k of Object.keys(localStorage))localStorage.removeItem(k);await cloudInit();
 const back=load(1);out.B_restored=!!back;out.B_sameWeek=back&&back.wk===15;out.B_sameTs=back&&back.ts===ts;out.B_padKept=back&&Array.isArray(back.bigPad)&&back.bigPad.length===4000;out.B_rostersBack=back&&!!back.ro&&Object.keys(back.ro).length>0;
 // short code for a big save
 S=back;SLOT=1;window._lastShortCode='';const full=await mkCode();const sc=window._lastShortCode;out.C_shortCode=sc;
 const s2=sc?await readCode(sc):null;out.C_shortCodeLoads=!!s2&&s2.wk===15&&Array.isArray(s2.bigPad)&&s2.bigPad.length===4000;
 // a failure is shown, not swallowed
 failAll=true;HM='';S.cloudErr=0;S.wk=16;save();cloudQ();await new Promise(r=>setTimeout(r,2600));out.D_failureShown=!!S.cloudErr&&/catching up/.test(String(S.fmsg||'')+String(HM||''))&&!/Cloud backup failed/.test(HM); /* Tyler 2026-11-15: never a scary failure; a calm note, game safe on the phone */
 // an old one-piece backup still loads
 failAll=false;const small={...JSON.parse(j)};small.ts=Date.now()+99999;store['data/users/tyler/slot2']={z:await gzS(JSON.stringify(small))};
 await cloudInit();const s3=load(2);out.E_oldFormatLoads=!!s3&&s3.name===small.name;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
r.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(r,null,1));await b.close()})();
