// ===== 🎓 THE 2026 COLLEGE PLAYERS, AS TYLER LISTED THEM (future saves only) =====
// Tyler, 2026-11-15, the 2026 college list: Darnold Mansion 77 Miami FR · Jeremy Smothers WR 87 OSU #4 Sr · Archer Manny 81 Texas #16 Sr ·
// Ruger Nash 76 Georgia Sr · Delonte Less 73 Oregon #5 Sr · Watchu BiSayin 75 OSU #10 So · Kiwi Langfield 82 RB Ole Miss · Wun-in-da
// Chamba 81 #6 Sr · DJ Suspense 71 Notre Dame · Kashon Tripdub 70 Alabama Fr · Jordan Tua 70 USC · Jarvis Hooters 69 Indiana · Charles
// Beckham WR 80 Indiana · Bruce Undertree 66 Michigan So · Dill Rolley 75 Oregon So · Jade Ball 73 Florida Jr RB · Andrew Messmaker 68
// Okla St Jr · Femmifer Coleman 79 WR Alabama Jr · Ham Leaver 68 LSU Jr · Noel Fifty 72 Arizona Sr · Charles Daphne QB Utah 70 Sr ·
// Marshawn Books 68 QB A&M Sr · JD Speedway Baylor 67 Jr.
// "don't change any current saves, just future ones ... seniors should always declare ... overall is around ... beginning pro rating
// ... potentials should randomize each save ... they should definitely be good or decent college players ... player lives matter."
// Most of these men were already in the game (the named prospects). This sets their 2026 class and rating to Tyler's list and adds
// the four who were missing (Fifty, Daphne, Books, Speedway), for worlds created from now on. Saves that already exist keep their
// prospects exactly as they are.
try{NSCH.ariz=NSCH.ariz||['Arizona Wild Dawgs','Arizona','Arizona'];NSCH.utah=NSCH.utah||['Utah Red Rocks','Utah','Utah'];NSCH.bay=NSCH.bay||['Baylor Pandas','Texas','Baylor']}catch(e){}
// class in 2026 (your college year 1 when you start high school in 2022): off = class - 1
window.NPX26={'Darnold Mansion':{off:0},'Jeremy Smothers':{off:3},'Archer Manny':{off:3,T:81},'Ruger Nash':{off:3},'Delonte Less':{off:3},'Watchu BiSayin':{off:1},'Wun-in-da Chamba':{off:3},'Kashon Tripdub':{off:0},'Bruce Undertree':{off:1,T:66},'Dill Rolley':{off:1},'Jade Ball':{off:2},'Andrew Messmaker':{off:2},'Femmifer Coleman':{off:2},'Ham Leaver':{off:2}};
window.NPX26N=[['Noel Fifty','QB','ariz',72,8,3],['Charles Daphne','QB','utah',70,3,3],['Marshawn Books','QB','tamu',68,14,3],['JD Speedway','QB','bay',67,1,2]];
(()=>{try{const _e=npxEnsure;npxEnsure=function(){const had=!!(S&&S.npx);const r=_e.apply(this,arguments);try{if(!had&&S&&S.npx&&!S.npx26){S.npx26=1;const rr=rng((S.seed||1)*53+26);
 S.npx.forEach(p=>{const z=NPX26[p.n];if(!z)return;p.off=z.off;if(z.T!=null)p.T=z.T;if(p.n==='Darnold Mansion'){p.rs=0;p.dmF=1}if(p.n==='Jeremy Smothers')p.jsF=1});
 NPX26N.forEach(([n,pos,sk,T,num,off])=>{if(S.npx.some(p=>p.n===n))return;const sc=NSCH[sk],st=sc[1],TW=(typeof TWN!='undefined'&&TWN[st])||(typeof PF!='undefined'?PF:['Central']),mine=st===S.hst,hsi=mine?1+(rr()*39|0):-1;
  S.npx.push({id:S.npx.length,n,pos,num,sk,cn:sc[0],sch:sc[2],st,T,tx:1,off,gen:0,hsi,hs:mine?null:TW[rr()*TW.length|0]+' '+(typeof MS!='undefined'?MS[rr()*12|0]:'Central')+' HS'})})}}catch(e){console.warn('npx26',e)}return r}}catch(e){}})();
