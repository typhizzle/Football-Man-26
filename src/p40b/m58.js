// ===================== CHEERLEADERS: majors, cheer skill, pro chances, and pro squad rosters =====================
// Looks and cheer skill are separate. Plenty of great cheerleaders never go to a big school (dream school, scholarship, home).
// Pro squads hire on skill first, then looks. Each pro team keeps a real roster: people leave, get cut, rookies make it at tryouts.
const MAJ=[['Nursing','registered nurse'],['Education','elementary school teacher'],['Marketing','marketing coordinator'],['Computer Science','software engineer'],['Business','financial analyst'],['Kinesiology','personal trainer'],['Communications','social media manager'],['Dance','dance teacher'],['Accounting','accountant'],['Graphic Design','graphic designer'],['Psychology','HR specialist'],['Pre-Law','paralegal'],['Dental Hygiene','dental hygienist'],['Hospitality','event planner'],['Criminal Justice','police officer'],['Fashion Merchandising','boutique manager'],['Physical Therapy','physical therapist'],['Photography','photographer'],['Cosmetology','esthetician'],['Aviation','flight attendant']];
function gfMajor(p){if(!p.major)p.major=MAJ[Math.abs(hsh(String(p.n)+'mj'))%MAJ.length][0];return p.major}
function majorJob(p){const m=MAJ.find(x=>x[0]==gfMajor(p))||MAJ[0],j=JOBS.find(x=>x[0]==m[1])||JOBS[0],h=Math.abs(hsh(p.n+'sal'));return {t:j[0],sal:Math.round((j[1]+h%Math.max(1,j[2]-j[1]+1))*1000/500)*500}}
// cheer skill 50-99, not tied to school size; pro cheerleaders are all good
function cSkill(p){if(p.csk==null){const h=Math.abs(hsh(String(p.n)+'csk'));p.csk=p.pro||S.stage=='pro'?70+h%30:50+h%50}return p.csk}
function proChance(p){let pr=4;try{const t=(S.T||[]).find(x=>x.n==p.team);if(t)pr=cl((t.ovr-50)/40,0,1)*10}catch(e){}return cl(.03+(cSkill(p)-60)/40*.42+(gfLk(p)-72)/100*.4+pr*.008+Math.min(4,p.cls||1)*.02,.02,.9)}
const proHint=c=>c<.12?'Long shot':c<.3?'Has a shot':c<.55?'Pro scouts are watching':'Pro-ready';
function colCheerInfo(gf){if(!gf||gf.cel||gf.grad||gf.pro||!gf.cls)return '';return `<p><small>🎓 Studying ${esc(gfMajor(gf))} · cheer skill ${cSkill(gf)} · pro outlook: <b>${proHint(proChance(gf))}</b></small></p>`}
// ---------- pro squads ----------
const SQN=26;
function sqMem(r,rook){const fem=FN2[(r()*FN2.length)|0]+' '+NL[(r()*NL.length)|0],yrs=rook?0:(r()*7)|0;return {n:fem,age:21+yrs+((r()*4)|0),yrs,lk:74+((r()*26)|0),csk:68+((r()*32)|0)}}
function sqEns(tn){S.chq=S.chq||{};let Q=S.chq[tn];if(!Q){const r=rng(hsh(tn+'sq')+(S.seed||1));Q=S.chq[tn]={y:yrN(),L:Array.from({length:SQN},()=>sqMem(r,0)),log:[]}}
 while(Q.y<yrN()){sqYear(tn,Q);Q.y++}const g_=S.gf;if(g_&&isProCheer(g_)&&g_.team==tn&&!Q.L.some(m=>m.gf)){Q.L.push({n:g_.n,age:g_.age,yrs:g_.pyrs||0,lk:gfLk(g_),csk:cSkill(g_),gf:1})}if(Q.L.some(m=>m.gf)&&!(g_&&isProCheer(g_)&&g_.team==tn))Q.L=Q.L.filter(m=>!m.gf);return Q}
// one off-season: the squad director decides who comes back
function sqYear(tn,Q){const r=rng(hsh(tn+Q.y)+(S.seed||1));let left=0,cut=0;Q.L=Q.L.filter(m=>{if(m.gf)return true;m.age++;m.yrs++;const sc=(m.csk*.6+m.lk*.4);if((m.yrs>=6&&r()<.45)||(m.age>=31&&r()<.5)||r()<.07){left++;return false}if(sc<78&&r()<.45){cut++;return false}return true});
 let add=0;while(Q.L.length<SQN){Q.L.push(sqMem(r,1));add++}Q.log.unshift(Q.y+1+': '+left+' left (retired, moved, new jobs), '+cut+' cut at re-auditions, '+add+' rookies made the squad.');Q.log=Q.log.slice(0,4)}
function sqPay(m){return Math.round(400*(1+.3*Math.min(4,m.yrs))*(1+(m.lk-75)/120)/25)*25}
function squadV(tn){const Q=sqEns(tn),L=[...Q.L].sort((a,b)=>b.yrs-a.yrs||b.csk-a.csk),cap=L[0];
 ui.innerHTML=`<div><h2>💃 ${esc(tn)} cheer squad</h2><p><small>${L.length} on the roster · part-time, one-season contracts · everyone re-auditions every year · paid per home game + appearances</small></p>
 ${Q.log.length?`<div class=card><b>Off-season moves</b>${Q.log.map(l=>'<br><small>'+esc(l)+'</small>').join('')}</div>`:''}
 <div class=card>${L.map(m=>`<div class=row style="font-size:15px;gap:4px"><span>${m.gf?'❤️ ':''}${esc(m.n)}${m===cap?' <small>(captain)</small>':''}<br><small>${m.yrs?'Year '+(m.yrs+1):'Rookie'} · age ${m.age} · skill ${m.csk} · looks ${m.lk}</small></span><small>$${sqPay(m).toLocaleString()}/game</small></div>`).join('')}</div>
 <button class=g onclick=relV()>Back</button></div>`;ui.scrollTop=0}
// the girlfriend's pro tryout after college uses her real chances; she joins that team's squad
function gfProTry(gf){if(!(S.pro&&S.pro.length))return false;if(R()>=proChance(gf))return false;const t=S.pro[ri(0,S.pro.length-1)];gf.team=tn(t);gf.pro=1;gf.cls=0;gf.pyrs=0;try{sqEns(gf.team)}catch(e){}return true}
// conference schedule: everyone gets exactly 8 conference games (odd-sized conferences included)
function confRounds(L,rs){const odd=L.length%2==1,R_=rr(L).slice(0,odd?9:8).map(rd=>rd.filter(([a,b])=>a>=0&&b>=0));if(!odd)return R_;
 for(let t=0;t<80;t++){const cnt={};R_.forEach(rd=>rd.forEach(([a,b])=>{cnt[a]=(cnt[a]||0)+1;cnt[b]=(cnt[b]||0)+1}));const nine=L.filter(i=>cnt[i]>8).sort(()=>rs()-.5),used=new Set(),drop=[];
  for(const a of nine){if(used.has(a))continue;const b=nine.find(x=>x!=a&&!used.has(x)&&R_.some(rd=>rd.some(p=>(p[0]==a&&p[1]==x)||(p[0]==x&&p[1]==a))));if(b==null)break;used.add(a);used.add(b);drop.push([a,b])}
  if(used.size==nine.length)return R_.map(rd=>rd.filter(p=>!drop.some(d=>(d[0]==p[0]&&d[1]==p[1])||(d[0]==p[1]&&d[1]==p[0]))))}
 return R_}
