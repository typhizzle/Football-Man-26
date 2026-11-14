// Clothing brands are rivals. Tyler 2026-11-14: "only one brand can sign you at a time" …
// "if they're signed with Goaty's then they should only be able to go to Goatie's events" …
// "Make sure every celebrity is with the right brand." Each check CAN fail; most fail on V233.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const raw=JSON.parse(j);
const r=await pg.evaluate(async(j,rawSpc)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 // A: deals already in the save are untouched (he holds Goatie's + Jorton from before the rule)
 out.A_existingDealsUntouched=JSON.stringify(S.spc)===JSON.stringify(rawSpc);
 const fam=typeof brFam=='function'?brFam:(b=>String(b).split(' (')[0].replace(/ (Underwear|Gear|Jerseys)$/,'').replace('Shart Shoes','Sharts'));
 const CL=["Goatie's",'Jorton','Nyk','Over Armored','Liger','Yawnverse','Sharts'];
 const isCl=b=>CL.includes(fam(b));
 // B: signed with Goatie's only -> a rival clothing brand cannot sign you
 S.cash=1e9;S.pop=100;
 S.spc=[{id:'goat_ap',b:"Goatie's",cat:'apparel',what:'x',pay:1,left:3}];
 out.B_rivalOfferLocked=spOk({b:'Nyk',cat:'cleats',tier:0})===false;
 out.B_sameBrandStillOk=spOk({b:"Goatie's Gear",cat:'gear',tier:0})===true;
 S.spo=null;const O=spEns();let rivals=0,signedRival=0;
 O.L.forEach((o,i)=>{if(o.cat==='event'||o.cat==='celeb'||!isCl(o.b)||fam(o.b)==="Goatie's")return;rivals++;
  const n=S.spc.length;try{spSign(i)}catch(e){}if(S.spc.length!==n)signedRival++});
 out.B_rivalOffersSeen=rivals;out.B_rivalSigned=signedRival;
 // C: not signed -> rivals may sign you
 S.spc=[];out.C_unsignedCanSignAny=spOk({b:'Nyk',cat:'cleats',tier:0})===true;
 // D: other brands only as big multi-year deals
 S.spc=[];S.spo=null;const O2=spEns();const other=O2.L.filter(o=>o.cat!=='event'&&o.cat!=='celeb'&&!isCl(o.b));
 out.D_otherOffers=other.length;out.D_allMultiYear=other.every(o=>o.yrs>=2&&o.tier>=2);
 // E: weekly invites while signed with Goatie's — no rival house events; brand celebs only
 S.spc=[{id:'goat_ap',b:"Goatie's",cat:'apparel',what:'x',pay:1,left:3}];
 const evFam=e=>e.brand?fam(e.brand):({goat:"Goatie's",nyk:'Nyk',jor:'Jorton'})[e.v]||null;
 const celF=id=>[...new Set(brOf(id).map(fam).filter(x=>CL.includes(x)))];
 let parties=0,rivalParty=0,wrongCel=0;
 for(let n=0;n<400;n++){S.spwk=null;S.spe=null;try{spWeek()}catch(e){}
  ((S.spe&&S.spe.L)||[]).forEach(e=>{if(e.k!=='party')return;const f=evFam(e);if(!f)return;parties++;
   if(f!=="Goatie's")rivalParty++;if(e.cel){const c=celF(e.cel);if(c.length&&!c.includes(f))wrongCel++}})}
 out.E_brandEvents=parties;out.E_rivalEvents=rivalParty;out.E_wrongCelebrity=wrongCel;
 // F: paid appearance offers — signed: only your house; unsigned: each brand with its own (or unaffiliated) celebrity
 let fo=0,fRival=0,fWrong=0,uo=0,uWrong=0;
 for(let n=0;n<300;n++){const L=[];spEvOffers(rng(n+1),L);L.forEach(o=>{if(o.cat!=='event')return;fo++;
   if(fam(o.brand)!=="Goatie's")fRival++;const c=celF(o.cel);if(c.length&&!c.includes(fam(o.brand)))fWrong++})}
 S.spc=[];
 for(let n=0;n<300;n++){const L=[];spEvOffers(rng(n+1),L);L.forEach(o=>{if(o.cat!=='event')return;uo++;const c=celF(o.cel);if(c.length&&!c.includes(fam(o.brand)))uWrong++})}
 out.F_signedOffers=fo;out.F_signedRival=fRival;out.F_signedWrongCel=fWrong;out.F_unsignedOffers=uo;out.F_unsignedWrongCel=uWrong;
 // G: a celebrity reps one clothing house at most
 out.G_celebsInTwoHouses=CELB.filter(c=>celF(c[0]).length>1).map(c=>c[1]);
 // H: a rival renewal is refused while signed elsewhere
 S.spc=[{id:'jorton',b:'Jorton',cat:'sneakers',what:'x',pay:1,left:2}];S.spRen=[{id:'goat_ap',b:"Goatie's",cat:'apparel',what:'x',pay:1,yrs:2}];
 try{spRenSign(0,1)}catch(e){}
 out.H_rivalRenewalRefused=S.spc.length===1&&S.spRen.length===1;
 // I: the Sponsors screen explains it, and renders
 S.spc=[{id:'goat_ap',b:"Goatie's",cat:'apparel',what:'x',pay:1,left:3}];spV();
 out.I_screenSaysSigned=/Signed with Goatie's/.test(ui.innerText||'');
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j,raw.spc||[]);
console.log(JSON.stringify(r,null,1));await b.close()})();
