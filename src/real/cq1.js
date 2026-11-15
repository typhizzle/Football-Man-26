// Tyler 2026-11-15: "no cloud backup should ever fail" (screenshot: quota exceeded). Leftover save pieces must be cleaned,
// a full cloud cleans itself and retries, and no scary popup while the game is safe.
const H=require('/home/claude/real/h.js');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.CQ_FILE});
const out=await pg.evaluate(async()=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};
 const store={};let cap=1e9;const size=()=>Object.values(store).reduce((a,v)=>a+JSON.stringify(v).length,0);
 const d={doc:k=>({get:async()=>({exists:k in store,data:store[k]}),set:async v=>{const was=store[k];store[k]=v;if(size()>cap){if(was===undefined)delete store[k];else store[k]=was;throw new Error('The quota has been exceeded.')}},delete:async()=>{delete store[k]}})};
 window.claude={use:async w=>w==='user'?{id:async()=>'u1'}:d};CL={d,p:'data/users/u1/'};
 const big={x:'a'.repeat(900000)},small={x:'b'.repeat(10)};CLPART=1000;
 // A: a save that shrinks leaves no leftover pieces
 const rnd=n=>{let s='';for(let i=0;i<n;i++)s+=String.fromCharCode(33+Math.floor(Math.random()*90));return s};
 await cdPut2(d,CL.p+'slot1',{x:rnd(6000)});const n1=Object.keys(store).filter(k=>k.startsWith(CL.p+'slot1')).length;
 await cdPut2(d,CL.p+'slot1',{x:'tiny'});await new Promise(r=>setTimeout(r,300));const n2=Object.keys(store).filter(k=>k.startsWith(CL.p+'slot1')).length;o.A_pieces=n1+'->'+n2;o.A_cleaned=n1>2&&n2===1;
 // B: the cloud is full of leftovers from a deleted slot -> the backup cleans up and goes through
 for(let i=1;i<6;i++)store[CL.p+'slot3~'+i]={z:rnd(1200)};store[CL.p+'slot3']={z:'x',n:6};zTombSet(3,1);localStorage.removeItem(K+'_3');
 cap=size()+400;let ok=true;try{await cdPut2(d,CL.p+'slot2',{x:rnd(2500)})}catch(e){ok=false;o.B_err=e.message}o.B_wentThrough=ok&&!!store[CL.p+'slot2'];o.B_deletedSlotGone=!store[CL.p+'slot3'];
 // C: still full -> a calm note once, not the scary warning
 S=S||{};S.fmsg='';cap=0;try{await cdPut2(d,CL.p+'slot4',{x:rnd(3000)})}catch(e){cloudWarn(e)}o.C_note=S.fmsg;o.C_calm=/catching up/.test(S.fmsg)&&!/failed/i.test(S.fmsg+String(HM||''));
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o});
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
