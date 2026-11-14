const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';S=mig(S);
 out.eventOver=!hwOn();
 out.shopCats=Object.keys(SHC);
 out.halloweenTab=('hw' in SHC);
 out.halloweenItemsInStore=SHOP.filter(x=>x[1]=='hw').map(x=>x[0]);
 out.costumeItemsInStore=SHOP.filter(x=>x[1]=='cos').map(x=>x[0]);
 out.wardrobeStillKnowsThem=HWALL().length;
 out.ownedKept=(S.hwd&&S.hwd.c)||[];
 out.keepsakeStillClaimable=(typeof hwkBar=='function');
 // screens must all draw
 const bad=[];
 ['hub','rosv','txV','shopV','wardV','lawHtml','LD'].forEach(f=>{
  try{if(typeof window[f]=='function')window[f]()}catch(e){bad.push(f+': '+e.message)}});
 out.screenErrors=bad;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
