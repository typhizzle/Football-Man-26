// Tyler 2026-11-16 batch (quick fixes). Uses his real Cam Newton save (specs/cam-cloud-2026-11-16) + fresh worlds.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cam-cloud-2026-11-16';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
const sim=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8'),col=fs.readFileSync('/home/claude/specs/col-save-2026.json','utf8');
(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const out=await pg.evaluate(async([docs,sim,col])=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};save=()=>{};
 const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};const s=await cdGet2(d,'x/slot6');s.ro=await cdGet2(d,'x/ro6');
 // A: Tyler's Cam save: 2026, the week-1 games are on the league page, Cam looks and throws like Cam, real awards in the trophy case
 S=mig(JSON.parse(JSON.stringify(s)));SLOT=6;LASTJ='';o.A_year=yrN();o.A_is2026=yrN()===2026;szCache=null;o.A_szTeams=Object.keys(szGet()).length;lgsV();const t=ui.innerText.replace(/\s+/g,' ');o.A_pageHasRows=/through week 1/.test(t)&&!/Passing · 2026[^0-9]*Nothing yet/.test(t)&&/1\. /.test(t);
 o.A_shape=JSON.stringify({acc:S.q.acc,pow:S.q.pow,awr:S.q.awr,mob:S.q.mob,sec:S.q.sec,trk:S.q.trk,ovr:qo(S.q)});o.A_shapeOk=S.q.pow>=74&&S.q.mob>=74&&S.q.trk>=74&&S.q.awr<=60&&S.q.acc<=62&&qo(S.q)===68;   /* Tyler's shape, scaled so the overall stays 68 */o.A_black=S.ap&&S.ap.sk>=4;
 trophyV();o.A_awards=/MVP/.test(ui.innerText)&&/Rookie of the Year/.test(ui.innerText);hub();o.A_oneTx=[...ui.querySelectorAll('button')].filter(x=>/Transactions|League office/.test(x.textContent)).length===1;
 // B: exotic skins cost millions
 o.B_skins=SKP.filter(p=>p>0).every(p=>p>=1e6);
 // C: new world: ratings updates page, no power card on the existing-QB page, Doobie 88, Daejon in free agency, Kenny Fallon on the 49ers with his seasons
 localStorage.clear();SLOT=5;newC();tkStart();await new Promise(r=>setTimeout(r,1500));o.C_noPowerCardOnPick=!/throwing power/.test(ui.innerText);rupdV();o.C_updPage=/Nov 15, 2026/.test(ui.innerText)&&/▲/.test(ui.innerText)&&/▼/.test(ui.innerText)&&/throwing power/.test(ui.innerText);
 o.C_doobie=(PKS.find(q=>q[2]==='Doobie Emmanuel')||[])[3]===88;o.C_daejon=(S.ro.fa||[]).some(x=>x.n==='Daejon Love'&&x.ovr===86);
 const sf=rost('p.28');const kf=sf.find(x=>x&&x.n==='Kenny Fallon');o.C_kfInfo=kf&&JSON.stringify({h:kf.h.length,cyd:kf.cs.cyd,sum:kf.h.reduce((a,r)=>a+r[2],0),tm:kf.tm,n:sf.filter(Boolean).length});o.C_kf=!!kf&&kf.h.length===12&&kf.cs.cyd===kf.h.reduce((a,r)=>a+r[2],0)&&kf.tm.length>=3&&sf.filter(Boolean).length>=25;o.C_kfSpot=!!kf&&sf.indexOf(kf)>=2&&sf.indexOf(kf)<=4;
 // free-agent offers: Tannehill gets Miami and Tennessee; Cam gets Charlotte
 const L=faqList();const tn_=L.find(x=>/Tannen/.test(x.n));faqGo(encodeURIComponent(tn_.n));o.C_tannen=FAQ.O.some(x=>TA[x.i]==='MIA')&&FAQ.O.some(x=>TA[x.i]==='NSH');const cam=L.find(x=>/Nugent/.test(x.n));faqGo(encodeURIComponent(cam.n));o.C_camHome=FAQ.O.some(x=>TA[x.i]==='CHA');
 // signing as Cam: 2026, looks, awards
 faqSign(FAQ.O.findIndex(x=>TA[x.i]==='CHA'));o.C_signed=S.name==='Cameron Nugent';o.C_signYear=yrN()===2026;o.C_signLook=S.ap.sk>=4;o.C_signAw=(S.aw||[]).some(a=>/MVP/.test(a));
 // D: old saves: Daejon not added; Kenny Fallon joins the 49ers in a 2037 save too (it is ≤2028? no: 2037 is late → skipped)
 S=mig(JSON.parse(sim));o.D_noDaejonOld=!(S.ro.fa||[]).some(x=>x&&x.n==='Daejon Love');o.D_kfLateSkipped=!Object.values(S.ro).some(L=>Array.isArray(L)&&L.some(x=>x&&x.n==='Kenny Fallon'))&&S.kf26===1;
 S=mig(JSON.parse(col));const key=add26Key(S,28)||'p.28';const L2=rost(key);o.D_kfCollegeSave=L2.some(x=>x&&x.n==='Kenny Fallon');
 // E: no backwards throw; the slingshot keeps the pull-back when the finger flicks forward at the end
 S=mig(JSON.parse(sim));startGame0(1,'reg');ovHide();let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});g.ph='pre';g.y=40;setup(0);snap(pp[0],pp[1]);for(let k=0;k<4;k++){try{upd(.03)}catch(e){}}const q=g.pl.qb;o.E_ph=g.ph;o.E_airBefore=!!g.pl.air;doThrow(g.pl.wr[0],q.x,q.y-8);o.E_info=JSON.stringify({ph:g.ph,air:!!g.pl.air,ly:g.pl.air&&g.pl.air.ly,qy:q.y});o.E_noBack=!!g.pl.air&&g.pl.air.ly>=q.y+1;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},[docs,sim,col]);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
