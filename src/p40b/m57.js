// ===================== BRAND ROSTERS: the celebrities who rep each brand, and you can recruit more =====================
// starting faces (real-life counterparts where there is one: Travis Scoot -> Jorton, Drizzle & Billie Eyelash -> Nyk)
const BRDEF={"Goatie's":['typhizzle','wesscoastt'],'Jorton':['tscoot'],'Nyk':['drizzle','beyelash'],'Liger':['islice'],'Over Armored':['jpall'],'Yawnverse':['jblackk'],'Sharts':['lbawl'],'Shart Shoes':['lbawl'],'Scalp & Knees':['jbowl'],'LeJarn James':[],'Tim Brody 12':[],'Tim Brody Football':[]};
const brKey=b=>String(b||'').split(' (')[0].replace(/ (Underwear|Gear|Jerseys)$/,'');
function brRoster(k){S.brR=S.brR||{};const add=S.brR[k]||[],left=(S.brL||{})[k]||[];return [...new Set([...(BRDEF[k]||[]),...add])].filter(id=>!left.includes(id)&&celBy(id))}
function brOf(id){return Object.keys({...BRDEF,...(S.brR||{})}).filter(k=>brRoster(k).includes(id))}
function myBrands(){return [...new Set((S.spc||[]).filter(c=>c.cat!='celeb'&&c.cat!='event').map(c=>brKey(c.b)))]}
// can you pitch your brand to this celebrity?
function brPitchBtns(id){const B=myBrands().filter(k=>!brRoster(k).includes(id));if(!B.length||cfGet(id)<25)return [];S.brP=S.brP||{};return B.slice(0,2).map(k=>S.brP[id+k]==wkKey()?null:['🤝 Get them to rep '+k,'brPitch(\''+id+'\',\''+k.replace(/'/g,'\\\'')+'\')']).filter(Boolean)}
function brPitch(id,k){const o=celBy(id);if(!o)return;S.brP=S.brP||{};if(S.brP[id+k]==wkKey())return;S.brP[id+k]=wkKey();const other=brOf(id).filter(x=>x!=k),fr=cfGet(id),f=myFans();
 let ch=.1+(fr-25)/110+cl(Math.log2(Math.max(1,f)/Math.max(1,CEL_NEED[o.tier]||1)),-2,2)*.08+(celFans().includes(id)?.1:0)-(other.length?.2:0);ch=cl(ch,.03,.85);
 if(R()<ch){S.brR=S.brR||{};(S.brR[k]=S.brR[k]||[]).push(id);if(other.length){S.brL=S.brL||{};other.forEach(b=>(S.brL[b]=S.brL[b]||[]).push(id))}const bonus=Math.round(spPay(.2)/500)*500;S.cash=(S.cash||0)+bonus;S.pop=cl((S.pop||40)+2,0,100);cfAdd(id,4);
  twAdd({a:o.n,h:o.h,v:1,cel:id,t:'Officially part of the '+k+' family 🤝 shoutout @'+meH()+' for putting me on'});save();
  return talk('mate',o.n,other.length?'Honestly? I\'ve been with '+other[0]+' a while... but you convinced me. I\'m in. 🤝':'Say less. If it\'s good enough for you, I\'m in. 🤝','happy',[['🔥','ovHide()']],o.n+' now reps '+k+'. '+k+' paid you a $'+bonus.toLocaleString()+' recruiting bonus. Fans +2.')}
 save();talk('mate',o.n,other.length?'I\'m locked in with '+other[0]+' right now. Can\'t do it, my guy.':['I\'ll think about it. Not right now though.','Let me talk to my team first. Maybe later.','Ehh, it\'s not really my style. Respect though.'][ri(0,2)],'smug',[['All good','ovHide()']],'Friendship '+fr+'/100. Better friends and more fans make it easier.')}
// Sponsors page: who reps the brands you're with
function brCard(){const B=myBrands();if(!B.length)return '';return `<div class=card><b>👕 Brand families</b>${B.map(k=>{const R_=brRoster(k);return `<div style="font-size:15px;margin:4px 0"><b>${esc(k)}</b><br><small>You${R_.length?', '+R_.map(id=>esc(celBy(id).n)).join(', '):''}</small></div>`}).join('')}<small>Become friends with celebrities, then get them to rep your brands (at events, after games, or by text).</small></div>`}
// the brand's own celebrity is the one at its events
function brEvCel(brand){const R_=brRoster(brKey(brand));return R_.length?R_[ri(0,R_.length-1)]:null}
// older saves: the shampoo brand is "Scalp & Knees" (Trey Malu's brand)
function brFix(){try{(S.spc||[]).forEach(c=>{if(c.b=='Trey Malu Scalp & Knees')c.b='Scalp & Knees'});if(S.spo)(S.spo.L||[]).forEach(o=>{if(o.b=='Trey Malu Scalp & Knees')o.b='Scalp & Knees'});(S.spRen||[]).forEach(o=>{if(o.b=='Trey Malu Scalp & Knees')o.b='Scalp & Knees'})}catch(e){}}
// ===================== PRO CHEERLEADERS: how they actually get paid =====================
// Real life: pro squads are part-time, one season at a time. Everybody (even veterans) re-auditions every year.
// Pay is per game (and per hour of practice) plus paid appearances. Most have a second job.
// Game: per-game pay + appearances, a raise each year she makes the squad again, and a yearly re-audition.
const isProCheer=gf=>!!(gf&&!gf.cel&&!gf.grad&&gf.pro);
function cheerFix(){try{const g_=S.gf;if(g_&&S.stage=='pro'&&!g_.cel&&!g_.grad&&!g_.cls&&g_.pro==null&&!g_.job)g_.pro=1}catch(e){}}
function cheerPay(gf){const y=Math.min(4,gf.pyrs||0),lk=gfLk(gf),pg=Math.round(400*(1+.3*y)*(1+(lk-75)/120)/25)*25,ap=gf.paps!=null?gf.paps:(gf.paps=4+Math.abs(hsh(gf.n+'ap'))%9);return {pg,games:10,ap,apPay:150+y*50,tot:pg*10+ap*(150+y*50)}}
function cheerInfo(gf){if(!isProCheer(gf))return '';const p=cheerPay(gf);return `<p><small>💃 Pro cheerleader · year ${(gf.pyrs||0)+1} on the squad · one-season contract, re-auditions every year.<br>💵 About $${p.pg.toLocaleString()} a home game (10 games) + ${p.ap} paid appearances ($${p.apPay}/each) ≈ <b>$${p.tot.toLocaleString()}</b> this season.${gf.job2?' Second job: '+esc(gf.job2)+'.':''}</small></p>`}
// every new season: she re-auditions
function cheerYear(gf){if(!isProCheer(gf))return;const p=cheerPay(gf);if(gf.status=='married'){S.cash=(S.cash||0)+p.tot}
 if(!gf.job2&&Math.abs(hsh(gf.n+'j'))%3){const j=jobRoll(gf.n+'2');gf.job2=j.t;gf.sal2=j.sal}
 const ch=cl(.82+(gfLk(gf)-80)/100+Math.min(4,gf.pyrs||0)*.02-((gf.age||25)>=31?.15:0),.4,.97),F=gf.n.split(' ')[0];
 if(R()<ch){gf.pyrs=(gf.pyrs||0)+1;S.fmsg=(S.fmsg?S.fmsg+' ':'')+'💃 '+F+' re-auditioned and made the '+gf.team+' squad again (year '+(gf.pyrs+1)+')'+(gf.status=='married'?'. Her $'+p.tot.toLocaleString()+' went into your account.':'.')}
 else{gf.pro=0;gf.grad=1;if(gf.job2){gf.job=gf.job2;gf.sal=gf.sal2}else{const j=majorJob(gf);gf.job=j.t;gf.sal=j.sal}S.fmsg=(S.fmsg?S.fmsg+' ':'')+'💃 '+F+' did not make the squad this year. She is going full-time as a '+gf.job+'.';if(gf.aff!=null)gf.aff=cl(gf.aff+2,0,100)}}
// ===================== REAL JOBS for regular people you date or meet =====================
const JOBS=[['registered nurse',70,110],['elementary school teacher',45,70],['marketing coordinator',45,65],['real estate agent',35,150],['software engineer',95,180],['dental hygienist',70,95],['accountant',60,95],['graphic designer',45,80],['personal trainer',35,70],['hair stylist',30,65],['pharmacist',120,150],['physical therapist',85,110],['social media manager',50,90],['paralegal',45,65],['lawyer',90,200],['bartender',30,60],['barista',25,35],['dance teacher',30,55],['flight attendant',50,85],['police officer',55,90],['firefighter',50,85],['electrician',50,95],['vet tech',35,50],['small business owner',30,200],['restaurant manager',50,75],['photographer',30,75],['financial analyst',70,110],['HR specialist',55,80],['event planner',45,70],['boutique manager',40,65],['nail tech',25,45],['medical assistant',35,45],['mechanic',40,70],['content creator',20,150],['airline pilot',120,250],['physician',200,350],['esthetician',35,60],['insurance agent',45,90],['car salesperson',35,90],['nursing student',0,15],['grad student',15,30]];
function jobRoll(seed){const h=Math.abs(hsh(String(seed)+'job')),j=JOBS[h%JOBS.length],s=Math.round((j[1]+(h>>5)%Math.max(1,j[2]-j[1]+1))*1000/500)*500;return {t:j[0],sal:s}}
const salTxt=s=>s?'$'+Math.round(s).toLocaleString()+'/yr':'part-time';
// a married partner with a regular job adds her salary every season
function jobYear(gf){if(!gf||gf.cel||gf.pro||!gf.grad||!gf.sal||gf.status!='married')return;S.cash=(S.cash||0)+gf.sal;S.fmsg=(S.fmsg?S.fmsg+' ':'')+'💼 '+gf.n.split(' ')[0]+'\'s salary as a '+gf.job+' ($'+gf.sal.toLocaleString()+') went into your account.'}
// regular people at events (not celebrities)
function evGuests(O){const r=rng(hsh(wkKey()+'gst')),sp=[[-12,-41],[12,-41],[-6,-40]];sp.forEach(([x,z],i)=>{const fem=r()<.5,n=(fem?FN2[(r()*FN2.length)|0]:NF[(r()*NF.length)|0])+' '+NL[(r()*NL.length)|0],j=jobRoll(n),m=mk3({c1:['#2e86de','#c0392b','#8e44ad','#16a085','#f39c12'][(r()*5)|0],c2:'#ffffff',d:0,pc:'#2a2a2a'},1.2,0,null,{fem:fem?1:0,sk:(r()*6)|0,hr:fem?[4,4,2,1,5][(r()*5)|0]:1+((r()*3)|0),hcl:['#1b1b1b','#3b2a1a','#e8c872','#7a4a2a'][(r()*4)|0],fh:fem?0:(r()*3)|0,ht:1,bd:fem?0:1},1);
 m.position.set(x,0,z);m.rotation.y=Math.atan2(x,z+36);PL.add(m);O.push({k:'eguest',n,job:j.t,sal:j.sal,fem,x,z,m})})}
function guestAct(o){const L=['Hey! I\'m '+o.n.split(' ')[0]+'. I work as a'+(/^[aeiou]/i.test(o.job)?'n ':' ')+o.job+'.','Oh my gosh, you\'re the QB! I\'m '+o.n.split(' ')[0]+', I\'m a'+(/^[aeiou]/i.test(o.job)?'n ':' ')+o.job+'.','Nice to meet you! I\'m '+o.n.split(' ')[0]+'. Day job? '+o.job.charAt(0).toUpperCase()+o.job.slice(1)+'.'];
 talk(o.fem?'gf':'mate',o.n,L[ri(0,L.length-1)],'happy',[['📱 Stay connected','guestNum()'],['See you around','ovHide()']])}
function guestNum(){const o=LR&&LR.cur;if(!o)return ovHide();const P=phEns(),id='gst:'+o.n;if(!P.c.some(c=>c.id==id))P.c.push({id,n:o.n,role:'Met at an event',pers:'chill',team:'',th:[],job:o.job,sal:o.sal});save();talk('mate',o.n,'Text me sometime!','happy',[['👍','ovHide()']],'📱 '+o.n+' is in your phone. Tap 👤 Profile in their messages to see where they work.')}
// 👤 profile for anyone in your phone
function phProf(i){const c=S.ph.c[i];if(!c)return phMsgs();let rows=[['Who',esc(c.role)]];
 if(c.pers=='gf'&&S.gf){const g_=S.gf;rows.push(['Status',({dating:'Dating',engaged:'Engaged',married:'Married'}[g_.status]||'Dating')]);if(g_.cel)rows.push(['Job','Celebrity']);else if(isProCheer(g_)){const p=cheerPay(g_);rows.push(['Job','Pro cheerleader, '+esc(g_.team)],['Pay','≈ $'+p.tot.toLocaleString()+' a season'])}else if(g_.grad){if(!g_.sal){const j=jobRoll(g_.n);g_.sal=j.sal;if(!JOBS.some(x=>x[0]==g_.job))g_.job=j.t}rows.push(['Job',esc(g_.job)],['Salary',salTxt(g_.sal)])}else rows.push(['Job','College cheerleader, '+esc(g_.team)]);rows.push(['Looks',gfLk(g_)])}
 else if(c.cel){const o=celBy(c.cel);rows.push(['Job','Celebrity'],['Friendship',cfLvl(cfGet(c.cel))+' ('+cfGet(c.cel)+'/100)']);const b=brOf(c.cel);if(b.length)rows.push(['Reps',esc(b.join(', '))])}
 else if(c.job)rows.push(['Job',esc(c.job)],['Salary',salTxt(c.sal)]);
 else if(c.id=='coach')rows.push(['Job','Head coach'+(c.team?', '+esc(c.team):'')]);else if(c.id=='agent')rows.push(['Job','Sports agent']);
 ui.innerHTML=`<div><h2>👤 ${esc(c.n)}</h2><div class=card>${rows.map(r=>`<div class=row style="font-size:17px"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div><button class=g onclick="phThread(${i})">Back</button></div>`}
