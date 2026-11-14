// ===== THE HONEST BASELINE =====
// Every earlier integrity test did this:
//     const s = await readCode(j);   // <-- readCode ENDS WITH `return mig(s)`
//     const before = snapshot();     // <-- so this is already AFTER my code ran
// which compared post-my-code to post-my-code and called it proof. It was circular.
//
// This one parses the save file as plain JSON first, with no game code anywhere near it,
// and uses THAT as the baseline. Then it loads the save the way the game does and asks a
// single question: did anything a player already owned change?
//
// Rosters the save had never generated are excluded, because `rost()` builds those on
// demand and a newly generated roster is not a change to existing data.

const H=require('/home/claude/real/h.js'),fs=require('fs');
const SAVE='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json';

(async()=>{
 const j=fs.readFileSync(SAVE,'utf8');

 // ---- the baseline, in plain node, before any game code exists ----
 const raw=JSON.parse(j);
 const base={};
 let baseRosters=0,basePlayers=0;
 Object.keys(raw.ro||{}).forEach(k=>{
  const L=raw.ro[k];if(!Array.isArray(L))return;
  baseRosters++;
  L.forEach((x,i)=>{
   if(!x||!x.n)return;basePlayers++;
   base[k+'#'+i]={n:x.n,pos:x.pos||'',ovr:x.ovr,
     h:JSON.stringify(x.h||[]),tm:JSON.stringify(x.tm||[]),aw:JSON.stringify(x.aw||{})};
  });
 });

 const {b,pg}=await pgOpen();
 const out=await pg.evaluate(async(j,base)=>{
  const o={diffs:[],checked:0,missing:0};
  try{
   const s=await readCode(j);S=s;SLOT=1;LASTJ='';   // readCode already ran mig
   try{taSync&&taSync(1)}catch(e){}
   Object.keys(base).forEach(key=>{
    const k=key.slice(0,key.lastIndexOf('#')),i=+key.slice(key.lastIndexOf('#')+1);
    const L=(S.ro||{})[k];
    if(!Array.isArray(L)){o.missing++;return}
    const x=L[i];
    if(!x||!x.n){o.diffs.push(key+' ('+base[key].n+'): THE PLAYER IS GONE');return}
    o.checked++;
    const was=base[key];
    if(x.n!==was.n)o.diffs.push(key+': name '+was.n+' -> '+x.n);
    if((x.pos||'')!==was.pos)o.diffs.push(key+' ('+was.n+'): position '+was.pos+' -> '+x.pos);
    if(x.ovr!==was.ovr)o.diffs.push(key+' ('+was.n+'): rating '+was.ovr+' -> '+x.ovr);
    if(JSON.stringify(x.h||[])!==was.h)
     o.diffs.push(key+' ('+was.n+'): HISTORY CHANGED\n      was '+was.h+'\n      now '+JSON.stringify(x.h||[]));
    if(JSON.stringify(x.tm||[])!==was.tm)
     o.diffs.push(key+' ('+was.n+'): teams '+was.tm+' -> '+JSON.stringify(x.tm||[]));
    if(JSON.stringify(x.aw||{})!==was.aw)
     o.diffs.push(key+' ('+was.n+'): awards '+was.aw+' -> '+JSON.stringify(x.aw||{}));
   });
   // what the load ADDED, which is allowed, reported so it is never a surprise
   o.added={};
   try{
    let hx=0,pid=0;
    for(let i=0;i<(S.T||[]).length;i++){
     const L=(S.ro||{})['h.'+i];if(!Array.isArray(L))continue;
     L.forEach(x=>{if(!x)return;hx+=(x.hx||[]).length;if(x.pid)pid++});
    }
    o.added={recoveredSeasonsInHx:hx,playersGivenAnId:pid,
             sealCorrections:S.sealFix||0,awardsPutBack:S.awFix||0,winnersPutBack:S.lawFix||0};
   }catch(e){}
  }catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}
  return o;
 },j,base);

 console.log(JSON.stringify({
  baselineTakenFrom:'raw JSON, before any game code',
  baseRosters,basePlayers,
  playersChecked:out.checked,
  rostersNotYetGenerated:out.missing,
  changesToExistingData:out.diffs.length,
  changes:out.diffs.slice(0,25),
  addedByTheLoad:out.added,
  err:out.err
 },null,1));
 await b.close();
})();

async function pgOpen(){const r=await H.open({});return {b:r.b,pg:r.pg}}
