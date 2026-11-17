// PRO BOWL SIDELINE + INTRO (Tyler 2026-11-17): each sideline holds that conference's 44 all-stars; the intro reads LFC vs RFC, not your team.
// PLAYABLE PRO BOWL (Tyler's spec): 44 per conference in the exact structure; votes 1/3 fans/players/coaches; Ultra Bowl men keep
// their selection and are replaced (both recorded); QB rotation 3rd/2nd/1st/1st by quarter; WR 4-for-3 rotation with the top 3 in
// the 4th; LFC blue / RFC red; a real game on the engine; MVP; recorded; and NOTHING in the season changes (rosters, stats, week, ratings).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PB_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const o=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';save=()=>{};
 let k=0;while(k++<40){const e=pevt();if(e.t==='pbw')break;if(e.t=='pro'||e.t=='pp')psim(e);else if(e.t=='bye')pWeek(null);else if(e.t=='ppbye')ppAdv(0);else break;try{hub()}catch(x){}}
 o.atPBW=pevt().t==='pbw';if(!o.atPBW){o.err='never reached Pro Bowl week: '+pevt().t;return o}
 const roSnap=JSON.stringify(S.ro),ssSnap=JSON.stringify(S.ss),qSnap=JSON.stringify(S.q),wk=S.wk,pbSnap=JSON.stringify({r:S.pb.r,hist:S.pb.hist});
 pplay();o.A_intro=/Pro Bowl · Honolulu/.test(ui.innerText);const V=pbS(),R=V.r44;
 o.B_44=['LFC','RFC'].map(cf=>PB44.reduce((a,[G])=>a+(R[cf][G]||[]).filter(c=>c.orig).length,0));o.B_ok=o.B_44.every(n=>n===44);
 o.C_votes=['LFC','RFC'].every(cf=>(R[cf].QB||[]).every(c=>c.vF!=null&&c.vP!=null&&c.vC!=null));
 const F=pbFinalists();const ub=[];['LFC','RFC'].forEach(cf=>PB44.forEach(([G])=>(R[cf][G]||[]).forEach(c=>{if(c.ub)ub.push(c)})));const reps=[];['LFC','RFC'].forEach(cf=>PB44.forEach(([G])=>(R[cf][G]||[]).forEach(c=>{if(c.rep)reps.push(c)})));
 o.D_ubKeep=ub.length>0&&ub.every(c=>(S.pbh[V.y]||[]).includes(c.n));o.D_repRec=reps.length>0&&reps.every(c=>(S.pbh[V.y]||[]).includes(c.n)&&!F.includes(c.tm));o.D_n=[ub.length,reps.length];
 // rotations
 const QB=pbPlay('LFC','QB');o.E_qb=[1,2,3,4].map(q=>pbLine('LFC',q,0)[0].n).join(' | ')===[QB[2]||QB[0],QB[1]||QB[0],QB[0],QB[0]].map(c=>c.n).join(' | ');
 const WR=pbPlay('LFC','WR');const sat=new Set();for(let w=0;w<9;w++){const on=pbLine('LFC',2,w).slice(2,5).map(c=>c.n);WR.forEach(c=>{if(!on.includes(c.n))sat.add(c.n)})}o.F_wrAllRotate=WR.length<4||sat.size>=3;
 o.F_wrQ4=pbLine('LFC',4,3).slice(2,5).map(c=>c.n).sort().join()===WR.slice(0,3).map(c=>c.n).sort().join();
 o.F_full=['LFC','RFC'].every(cf=>[1,2,3,4].every(q=>pbLine(cf,q,1).slice(0,23).every((x,kk)=>x&&lgGrp(x.pos)===lgGrp(POSL[kk])||(kk===22&&x))));
 // the game
 pbgStart();o.Z_side=[slRoster(g.m).length,slRoster(g.o).length];try{hype()}catch(e){}o.Z_intro=(document.body.innerText.match(/LFC[^\n]{0,40}|RFC[^\n]{0,40}/g)||[]).slice(0,3);o.Z_ok=slRoster(g.m).length>=40&&slRoster(g.o).length>=40&&o.Z_intro.some(x=>/LFC.*vs.*RFC|RFC.*vs.*LFC/.test(x));await new Promise(r=>setTimeout(r,400));o.G_kind=g.kind==='pbg';o.G_colors=[g.mj.c1,g.oj.c1].join();o.G_title=g.title;
 const L0=rost('h.0');o.G_lineup=L0[0]&&L0[0].pbc===1;
 let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});for(let t=0;t<6;t++){g.ph='pre';g.y=30;setup(0);snap(pp[0],pp[1]);for(let kk=0;kk<200;kk++){try{upd(.03)}catch(e){}if(g.ph!=='live')break}try{if(g.ph==='dead'){g.dt=0;after()}}catch(e){}}
 o.H_plays=PBG&&PBG.plays;g.s=[24,17];endGame();o.I_ovr=/Pro Bowl final/.test(document.getElementById('ov').innerText);pbgDone();
 const rec=S.pbr[V.y];o.I_mvp=!!rec.mvp;o.I_played=rec.played.length>=22;
 o.J_rosterSame=JSON.stringify(S.ro)===roSnap;o.J_statsSame=JSON.stringify(S.ss)===ssSnap;o.J_qSame=JSON.stringify(S.q)===qSnap;o.J_weekSame=S.wk===wk&&JSON.stringify({r:S.pb.r,hist:S.pb.hist})===pbSnap;o.J_noResume=!S.gsave;
 o.K_next=pevt().t;o.L_firstHonest=(rec.first||[]).length===0;o.K_card=JSON.stringify(fcAwardsByYear({n:rec.mvp})[V.y]||[]);
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
o.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(o,null,1));await b.close()})();
