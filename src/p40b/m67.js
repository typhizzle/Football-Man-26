// ===================== 🏈 BATCH 2 (Oct 30): more stars, real looks, coaches, QB styles, team ratings, names =====================
// [team index, roster slot, name, ovr, age (real, Oct 2026), jersey]
const PKS3=[
 [16,2,'Lavante Smothers',89,27,6],[16,4,'Michael Apple',74,22,9],[16,1,'Jaquan Barker',93,29,26],[16,12,'Jadeveon Carton',95,25,98],
 [8,4,"Tankin O'dell",81,27,3],[8,20,'Pitre Dish',87,27,5],[8,5,'Dolph Shula',83,30,86],[8,14,'Danny Hunter-Gatherer',93,32,55],[8,19,'Camaro Lasso',86,22,8],
 [17,1,'Jamonte Williard',91,26,33],[17,22,'Brandick Drake',99,31,17],[11,22,'Camerick Big',99,23,39],[7,3,'Ty Huggle',89,27,5],
 [13,2,'Jaden Penguins',88,27,17],[13,3,'Cort Cutler',87,31,14],[13,1,'EJ Dobber',84,27,27],[13,15,'Nicholas Banner',93,26,15],[13,5,'Everett Erving',80,32,1]];
try{PKS.forEach(q=>{if(q[2]=='Sacramento Blue')q[1]=3})}catch(e){}
try{PKS.push(...PKS3)}catch(e){}
try{QBB.push(['Jacque Hilton',72,26,17,10,0])}catch(e){}
Object.assign(PKC,{
 'Jadeveon Carton':['DT',38,6,'4 yrs/$152M extension · highest-paid DT'],
 'Ty Huggle':['WR',28.75,3,'4 yrs/$115M'],'Jaden Penguins':['WR',28.25,3,'3 yrs/$84.75M (traded to Denver)'],
 'Nicholas Banner':['EDGE',30,4,'4 yrs, up to $120M'],'Lavante Smothers':['WR',25,3,'3 yrs/$75M extension'],'Cort Cutler':['WR',23,4,'4 yrs/$92M extension'],
 'Jaquan Barker':['RB',20.6,2,'2 yrs/$41.2M extension'],'Danny Hunter-Gatherer':['EDGE',40.1,2,'1 yr/$40.1M extension (through 2027)'],
 'Pitre Dish':['S',13,3,'3 yrs/$39M extension'],'Dolph Shula':['TE',12,1,'3 yrs/$36M'],'Everett Erving':['TE',11.5,1,'2 yrs/$23M'],
 'EJ Dobber':['RB',9.5,2,'2 yrs/~$19M'],'Jamonte Williard':['RB',8,3,'3 yrs/$24M'],'Brandick Drake':['K',7,4,'4 yrs/$28M · top-paid kicker'],
 'Michael Apple':['WR',4.1,4,'Rookie deal (#20 pick, est.)'],'Camaro Lasso':['CB',2.15,2,'Rookie deal (2nd round)'],"Tankin O'dell":['WR',1.4,1,'Last year of his rookie deal (est.)'],
 'Camerick Big':['K',1,2,'Rookie deal (6th round)'],'Jacque Hilton':['QB',.4,1,'Practice squad']});

// ---------- how real players look: skin (0 light … 6 dark), hair color, hair style, beard ----------
const PLK={};
(()=>{const B='#17110e',BR='#3b2416',LB='#8b5a2b',BL='#e8cf86',DB='#c9a14a',add=(s,h,st,bd,names)=>names.split('|').forEach(n=>PLK[n]={s,h,st,bd:bd?1:0});
 add(0,BR,'short',0,'Joseph Shiesty|Just Chillin|Drako September|Eddie Pretty|DJ Scones|Kirko Chainz|Skylar Shook|Number Nine|Snitchell Biscuit|Mac Dadderson|Todd Simperson|Hooper Dalean|Slingshot Elm|Taylor Wardawg|Christopher McCunngingham');
 add(0,LB,'short',0,'Jack Goff');add(0,BR,'short',1,'Bacon Maple|Jort Valentine|Ham Luther|Tractor Swift|Hooper Bol|Gunter Henny|Houston Godfrey|Nate Bosen|Joseph Bosen|Dolph Shula|Teej Waddle');
 add(0,BL,'long',0,'Franklin Lawford');add(0,DB,'long',0,'Eddie Bowser');add(0,BR,'long',0,'Jake Mobile');add(0,BR,'long',1,'Uncle Rico|Cameron Skat|Jordan Cattle');add(0,'#7a3a1a','long',1,'Mac-Daddy Kelly');add(0,BR,'short',0,'Brandick Drake');
 add(1,B,'short',0,'Ferb Nandolorean');add(2,B,'curly',1,'Luka Okudah');add(2,B,'long',0,'Toot McVillain');add(2,B,'short',0,'Markie Goata|Clyde Gabriella');
 add(3,B,'short',0,'Kyle Kerr|Ned Brothers');add(4,B,'curly',0,'Jay Copyright|Femmifer Allen|Osmell Wrectomm Jr.');
 add(4,B,'short',1,'Jay-Jay Pain|Jack Mascott|DaSettlement Won|Gene Smothers|Jake Efficiency|Meters Ferret|Tractor Swift_');
 add(4,B,'short',0,'Coleridge Loud|Charvarious McWharton|Mallet Williams|Bruce Old|Dustin Plane|JJ Crablegs|Famous Dubstin|Hadouken Sandler|Jacque Hilton|Shamar Catch|Tay Johnson|Jacob Jackson|BB Deer|Michael Parkins|Doobie Emmanuel|Dijon Mustardson|Will Sackerson Jr.|Quinton Truckems|Kareem Jabarter|JD Less|JA Blue|Daniel Hate|Racer Noodle|Zavier Pennies|Tiktok Guy|Barbell Geese|Carmel Grape|Gamble Bentley|Phony Caller|Manny Escort|Blake Ups|Drake Ups|Esteban Shovel|Tradonte Shovel|Berry Flooring|Jake Flossing-Liar|Russell Westbrook|Daddy Wildes|Darryn Plum|Walker Old|DaBron Eight-Chains|Vin Maller|Matthew Curtain|Darryl Bee|Lavante Smothers|Jaquan Barker|Jadeveon Carton|Michael Apple|Pitre Dish|Jamonte Williard|Camerick Big|Jaden Penguins|Cort Cutler|EJ Dobber|Nicholas Banner|Everett Erving|Camaro Lasso|Danny Hunter-Gatherer|Axel Jean|Jordan Give-Itt|Peter Lincoln|Marco Harris|Kyle Chriss');
 add(4,B,'braids',0,'Miguel Penits II|Jah Sawyer|Kevin Sprinter|Lavante Snaggems|Saucer Garden|Nigel Ballins|Jameson Potts|Tractor Huntley|NFL Youngboy|Bravebeyond Denderson|Sacramento Blue|Byron Dillems|Bubba Wifey|Mordecai Neighbors|Ty Huggle|'+"Tankin O'dell");
 add(0,BR,'short',0,'Darnold Mansion|Archer Manling|Ruger Nash|Watchu BiSayin|DJ Suspense|Charles Beckham|Ham Leaver|Juan MaDeer');add(4,B,'short',0,'Delonte Less|Wun-in-da Chamba|Kashon Tripdub|Bruce Undertree|Marshawn Redd');add(4,B,'braids',0,'Jeremy Smothers|Kiwi Langfield|Femmifer Coleman');add(2,B,'long',0,'Jordan Tua');
 add(3,BR,'curly',0,'Ricky MaClones');add(1,'#5a3620','short',1,'Jarsh Fallon');add(5,B,'braids',0,'Lamarcus Action');add(0,'#dcae4c','spiky',0,'No Pix');add(0,BR,'short',0,'Matty Gafford');add(1,BR,'short',1,'Eric Rodney');add(4,'#2a1a12','curly',0,'Jake Smothers-Ninja');
 add(5,B,'braids',0,'Daryl Henny');add(5,B,'short',1,'Eric Donavan|Ben Epstein|Trentin Wilford')})();
try{Object.keys(PLK).forEach(n=>{const p=PLK[n];FKNOWN.unshift([new RegExp('^'+n.replace(/[.*+?^${}()|[\]\\&]/g,'\\$&')+'$'),{s:p.s,h:p.h,st:p.st,bd:p.bd}])})}catch(e){}
// 3D look for a player by name (falls back to the random look)
function plAp(n,d){const p=PLK[n];if(!p)return d;return{...d,sk:[0,1,2,3,4,5,5][p.s],hcl:p.h,hr:{short:1,buzz:1,curly:2,braids:5,long:5,spiky:3,bald:0}[p.st]??1,fh:p.bd?3:0}}

// ---------- head coaches (new careers): 2026 staffs with parody names ----------
const PCOACH={0:['Erin Glenwood',76,1],1:['Joe Braidy',80,0],2:['Jeff Halfway',76,0],3:['Mike Vrabble',87,1],4:['Jesse Mintier',78,0],5:['Mike McCarthay',81,0],6:['Todd Monkeyn',77,0],7:['Zach Tailor',80,7],
 8:['DeMar Bryans',85,3],9:['Shane Stitchin',82,3],10:['Robert Sale-ay',80,0],11:['Liam Coin',82,1],12:['Andrew Buchke',96,13],13:['Sean Paytown',88,3],14:['Klint Cubeiak',77,0],15:['Jim Hardball',89,2],
 16:['Nicholas Seariel',86,5],17:['Brian Shotinheimer',77,1],18:['Dan Quinnton',84,2],19:['John Hardball',90,0],20:['Ben Johnstone',87,1],21:['Dan Camel',88,5],22:['Matt LaFlour',86,7],23:["Kevin O'Cornell",87,4],
 24:['Kevin Stefanskee',82,0],25:['Kellen Moorer',77,1],26:['Todd Bowls',81,4],27:['Dave Canals',79,2],28:['Kyle Shenanigan',91,9],29:["Mike McDonald's",87,2],30:['Mike LaFlour',76,0],31:['Sean McVroom',93,9]};
function pcoachApply(){try{(S.pro||[]).forEach(t=>{const pi=pIdx(t),c=PCOACH[pi];if(!c||S.pcoach[pi])return;S.pcoach[pi]=1;const s=stf(t);s.n=c[0];s.o=c[1];s.y=c[2];s.w=Math.round(s.y*17*cl(.3+(s.o-60)/80,.2,.75));s.l=s.y*17-s.w})}catch(e){}}

// ---------- team strength from the real 2026 teams: [offense, defense] (team rating = the average) ----------
const TRAT={0:[74,80],1:[90,84],2:[78,76],3:[85,84],4:[89,85],5:[80,86],6:[72,86],7:[88,74],8:[79,92],9:[84,80],10:[76,79],11:[84,82],12:[89,85],13:[86,93],14:[77,78],15:[86,87],
 16:[90,90],17:[88,77],18:[85,79],19:[80,82],20:[86,80],21:[91,84],22:[86,88],23:[80,86],24:[82,79],25:[73,77],26:[85,80],27:[79,78],28:[87,85],29:[87,96],30:[76,78],31:[90,87]};
const OFFS=new Set([1,2,3,4,5,6,7,8,9,10]),DEFS=new Set([11,12,13,14,15,16,17,18,19,20,21]);
function rosSide(L,t){try{if(!S||!S.trat||!t||!t.dv||!Array.isArray(L))return;const pi=pIdx(t),r=TRAT[pi];if(!r)return;const star=n=>PKS.some(q=>q[2]==n)||QBB.some(b=>b[0]==n)||QBP.some(q=>q[0]==n)||n==S.name;
 [[OFFS,r[0]],[DEFS,r[1]]].forEach(([set,tg])=>{const xs=L.filter((x,k)=>x&&set.has(k)&&!star(x.n)&&x.npx==null);if(!xs.length)return;const m=xs.reduce((a,x)=>a+x.ovr,0)/xs.length;xs.forEach(x=>{x.ovr=cl(Math.round(tg-2+(x.ovr-m)*.6),tg-13,97)})})}catch(e){}}
(()=>{const _st=start;start=function(){const r=_st.apply(this,arguments);try{S.trat=1;S.nm2=1;S.pcoach=S.pcoach||{};(S.pro||[]).forEach((t,i)=>{const r_=TRAT[pIdx(t)];if(r_&&!S.rset){t.off=r_[0];t.def=r_[1];t.ovr=Math.round((r_[0]+r_[1])/2)}if(!S.rset)for(const k of ['p.'+i]){if(S.ro&&S.ro[k])rosSide(S.ro[k],t)}});pcoachApply();save()}catch(e){}return r}})();

// ---------- QB styles and attribute shapes for real QBs (used when you play as one) ----------
const QBSTY={'Jay-Jay Pain':'Mobile','Jarsh Fallon':'Scrambling strong arm','Ricky MaClones':'Deep passer','Jack Mascott':'Field General (balanced)','Coleridge Loud':'Deep passer','Bacon Maple':'Field General (balanced)','Ham Luther':'Field General (balanced)',
 'Matty Gafford':'Deep passer','Eric Rodney':'Deep passer','Just Chillin':'Deep passer','JJ Crablegs':'Deep passer','Famous Dubstin':'Deep passer','Lamarcus Action':'Mobile','Eddie Pretty':'Field General (balanced)','Bruce Old':'Field General (balanced)',
 'Skylar Shook':'Field General (balanced)','Charvarious McWharton':'Mobile','Hadouken Sandler':'Field General (balanced)','Jack Goff':'Field General (balanced)','Kyle Kerr':'Mobile','Jort Valentine':'Deep passer','DaSettlement Won':'Field General (balanced)',
 'Jake Mobile':'Mobile','Jay Copyright':'Mobile','DJ Scones':'Mobile','Franklin Lawford':'Field General (balanced)','Joseph Shiesty':'Field General (balanced)','Drako September':'Scrambling strong arm','Femmifer Allen':'Scrambling strong arm','No Pix':'Mobile',
 'Gene Smothers':'Field General (balanced)','Mallet Williams':'Scrambling strong arm','Kirko Chainz':'Field General (balanced)','Miguel Penits II':'Deep passer','Jake Efficiency':'Field General (balanced)','Dustin Plane':'Mobile','Uncle Rico':'Field General (balanced)',
 'Number Nine':'Deep passer','Snitchell Biscuit':'Field General (balanced)','Jacque Hilton':'Deep passer','Mac Dadderson':'Field General (balanced)','Todd Simperson':'Field General (balanced)','Clyde Gabriella':'Field General (balanced)','Ferb Nandolorean':'Field General (balanced)','Markie Goata':'Mobile'};
// [accuracy, throw power, awareness, speed, carrying, truck] — the shape of each QB's game (the overall stays exactly what it is)
const QBSH={'Ricky MaClones':[93,97,97,74,80,70],'Jarsh Fallon':[88,98,90,82,85,92],'Lamarcus Action':[86,92,88,97,90,75],'Joseph Shiesty':[95,88,95,68,70,60],'Just Chillin':[88,96,86,76,75,72],'Jay-Jay Pain':[85,88,87,87,88,94],
 'Jack Mascott':[90,89,90,70,72,65],'Jack Goff':[93,85,90,58,65,55],'Matty Gafford':[88,95,92,55,62,58],'Eric Rodney':[88,90,94,55,60,55],'Jay Copyright':[88,89,85,95,82,70],'Drako September':[85,94,84,85,82,78],'Femmifer Allen':[84,95,80,84,80,75],
 'Eddie Pretty':[91,84,89,72,70,60],'Jort Valentine':[84,94,83,70,70,65],'Bacon Maple':[88,95,88,66,70,68],'Coleridge Loud':[90,92,86,70,70,62],'Franklin Lawford':[86,92,84,76,75,68],'Ham Luther':[87,89,84,70,72,66],'No Pix':[84,86,82,85,80,70],
 'Kyle Kerr':[84,90,82,95,85,62],'DJ Scones':[82,85,80,84,80,72],'Charvarious McWharton':[82,94,78,82,78,70],'Jake Mobile':[80,88,76,85,80,78],'DaSettlement Won':[82,88,80,74,75,72],'Kirko Chainz':[87,82,88,55,60,55],'Gene Smothers':[86,88,84,68,68,62],
 'Mallet Williams':[76,93,74,88,80,80],'Miguel Penits II':[84,95,80,60,65,58],'Skylar Shook':[80,90,76,70,72,68],'Bruce Old':[84,80,82,74,72,55],'Jake Efficiency':[80,84,82,60,70,75],'Jacque Hilton':[70,99,68,82,72,80],'JJ Crablegs':[80,94,76,62,65,74],
 'Dustin Plane':[78,88,76,92,82,80],'Uncle Rico':[82,80,82,68,66,64],'Number Nine':[78,90,76,78,74,70],'Snitchell Biscuit':[78,84,78,72,70,68]};
function qbShape(n,ovr){const p=QBSH[n];if(!p)return null;const m=p.reduce((a,b)=>a+b,0)/6;let s=1;p.forEach(v=>{const x=ovr+(v-m)*s;if(x>99)s=Math.min(s,(99-ovr)/(v-m));if(x<40)s=Math.min(s,(ovr-40)/(m-v))});
 const k=['acc','pow','awr','mob','sec','trk'],q={};p.forEach((v,i)=>q[k[i]]=cl(Math.round(ovr+(v-m)*s),25,99));
 let d=ovr*6-k.reduce((a,x)=>a+q[x],0);const ord=k.slice().sort((a,b)=>p[k.indexOf(b)]-p[k.indexOf(a)]);let g=0;while(d!=0&&g++<60){const x=d>0?ord.find(z=>q[z]<99):ord.slice().reverse().find(z=>q[z]>25);if(!x)break;q[x]+=d>0?1:-1;d+=d>0?-1:1}return q}
// college titles and Heismans for real QBs you take over: [award, college year]
const TKCOL={'Bacon Maple':[['Heisman Trophy',4]],'Kyle Kerr':[['Heisman Trophy',3]],'Joseph Shiesty':[['National Champions',4],['Heisman Trophy',4]],'Lamarcus Action':[['Heisman Trophy',2]],'Jay Copyright':[['Heisman Trophy',4]],
 'Bruce Old':[['National Champions',1],['Heisman Trophy',2]],'Femmifer Allen':[['Heisman Trophy',2]],'Jay-Jay Pain':[['National Champions',2]],'DaSettlement Won':[['National Champions',3]],'Franklin Lawford':[['National Champions',1]],'Mac Dadderson':[['National Champions',3]]};

// ---------- play as an existing QB: real style + attribute shape + look + college trophies; backups you created are playable too ----------
let TKB=null,TKVQ=null;
(()=>{const _ps=proStart;proStart=function(){const r=_ps.apply(this,arguments);try{if(TKGO)TKVQ=S.vetP?{...S.vetP}:null}catch(e){}return r}})();
(()=>{const _tl=tkList;tkList=function(){const L=_tl.apply(this,arguments);try{QBB.forEach((b,bi)=>{const t=(S.pro||[]).find(t=>pIdx(t)==b[3]);if(t)L.push({i:1000+bi,n:b[0],ovr:b[1],age:b[2],team:tn(t),bk:1})})}catch(e){}return L}})();
(()=>{const _tg=tkGo;tkGo=function(ti){let r;if(ti>=1000){const bi=ti-1000,b=QBB[bi];if(!b)return;const _tl=tkList,ent={i:b[3],n:b[0],ovr:b[1],age:b[2],team:''};TKB=b;tkList=()=>[ent];try{r=_tg.call(this,b[3])}finally{tkList=_tl;TKB=null}
   try{if(TKVQ){S.vetP=TKVQ;S.vet=TKVQ.n;S.sq=TKVQ.ovr}S.num=b[4];const L=rost('h.0');L.forEach((x,k)=>{if(k>0&&x&&x.n==S.name)x.n=uNm(Math.random)});if(L[0]){L[0].n=S.name;L[0].num=S.num;L[0].ovr=qo(S.q);L[0].age=S.age}const pc=PKC[b[0]];if(pc)S.ct={yrs:pc[2],sal:pc[1],gtd:40,inc:0,team:tn(S.T[0])};tkPost();save();hub()}catch(e){}return r}
  r=_tg.apply(this,arguments);try{tkPost();save();hub()}catch(e){}return r}})();
function tkPost(){const n=S.name;try{const st=QBSTY[n];if(st&&AR.some(a=>a.n==st))S.arch=st;const o=qo(S.q),q=qbShape(n,o);if(q)S.q=q;const p=PLK[n];if(p){S.ap={...(S.ap||{}),...plAp(n,S.ap||{})}}
 const C=TKCOL[n];if(C){C.forEach(([a,y])=>{const s='College yr '+y+': '+a;if(!S.aw.includes(s))S.aw.unshift(s)})}}catch(e){}}
// existing-player careers: finish a season with one to unlock the next; a created QB who finishes a pro season unlocks them all
(()=>{const _ts=tkStart;tkStart=function(){try{let tk=0,ok=0;for(let i=1;i<=6;i++){if(i==SLOT)continue;const d=load(i);if(!d)continue;if(d.tk){if(!((d.py||0)>=2||d.ret))tk++}else if(d.stage=='pro'&&(d.py||0)>=2)ok=1}
 if(tk>=1&&!ok){ui.innerHTML=`<div><h2>🎭 Play as an existing QB</h2><div class=card><b>Finish a season with your existing QB first.</b><br><small>Play one full season with your current existing-QB career to unlock another one. Or take a QB you created all the way to the pros and finish a pro season: that unlocks as many existing-QB careers as you want.</small></div><button class=g onclick=menuMain()>Back</button></div>`;return}}catch(e){}return _ts.apply(this,arguments)}})();

// ---------- new names ----------
try{NF.push('Makai','Malachi','Dan','Daniel','Unc','Drake','Justin','Marc','Marcus','Trinidad','Archer','Archie','Dri','Andre','DeAndre','Deion','CeeDee','Bo','Octavius','Octavian','Peter','Parker','Jason','Clint','Cody','Chase','Anthony','Tony','Ant','Trey','Trevon','Colin','Carl','Jimmy','Sonic','Mario','Luigi','Lucario','Mew','Lucky','Ozzie','Rhino','Ruger','Deagle','Jadeveon');
 NL.push('Lemon','Apple','Strawberry','Blueberry','Archer','Clownie','Kupp','Nacua','Adams','Higby','Herbert','Schubert','Shebert','Sherberg','Sherbo','Iceberg','Flames','Thompson','Worthy','Wingo','Ringo','Simmons','Butler','Neutron','Weezer','Shadows','Knuckles','Tails','Bubbles','Muffin','Sharon','Rifle','Cannon','Cannons','McCannon','McDonald',"McDonald's",'Burger','Cheeser','Peters','Parker','Octavius','Jackson',
  'Cherry','Peach','Mango','Plum','Berry','Grape','Pear','Kiwi','Banana','Orange','Lime','Melon','Coconut','Pineapple','Papaya','Cranberry','Raspberry','Fig','Blackberry','Apricot',
  'Black','White','Green','Brown','Gray','Blue','Red','Gold','Silver','Scarlet','Violet','Amber','Hazel','Indigo','Crimson','Navy','Rose','Ivory','Jade','Teal')}catch(e){}
const NEWF=NF.slice(20),NEWL=NL.slice(20);
// older saves: sprinkle the new names into players nobody renamed (more of them on your own team)
function nmShuffle(){if(!S||!S.ro||S.nm2)return;S.nm2=1;const star=n=>n==S.name||PKS.some(q=>q[2]==n)||QBB.some(b=>b[0]==n)||QBP.some(q=>q[0]==n);
 for(const k in S.ro){const L=S.ro[k];if(!Array.isArray(L))continue;const mine=k=='h.0',p=mine?.35:.18;L.forEach(x=>{if(!x||x.ed||x.npx!=null||x.pal||star(x.n)||(x.h&&x.h.length>2))return;if(Math.random()<p){const [f,...l]=x.n.split(' ');x.n=Math.random()<.5?NEWF[ri(0,NEWF.length-1)]+' '+l.join(' '):f+' '+NEWL[ri(0,NEWL.length-1)]}})}try{starDedup()}catch(e){}}

(()=>{const _pr=pkRen;pkRen=function(){const r=_pr.apply(this,arguments);try{nmShuffle()}catch(e){}return r}})();
// ---------- helmets match the team's real helmet color ----------
const HELM={0:'#ffffff',1:'#ffffff',2:'#ffffff',3:'#c0c0c0',4:'#111111',5:'#111111',6:'#ff3c00',7:'#fb4f14',8:'#03202f',9:'#ffffff',10:'#0c2340',11:'#101820',12:'#e31837',13:'#0a2343',14:'#a5acaf',15:'#0080c6',
 16:'#004c54',17:'#869397',18:'#5a1414',19:'#0b2265',20:'#0b162a',21:'#b0b7bc',22:'#ffb612',23:'#4f2683',24:'#111111',25:'#d3bc8d',26:'#3d3935',27:'#bfc0bf',28:'#b3995d',29:'#002244',30:'#ffffff',31:'#003594'};
function hcOf(t){try{if(!t)return '#eeeeee';if(t.hc)return t.hc;if(t.dv){const h=HELM[pIdx(t)];if(h)return h}return t.c1||'#eeeeee'}catch(e){return '#eeeeee'}}
const myHc=()=>(S&&(S.stage=='col'||S.stage=='pro')&&S.T&&S.T[0])?hcOf(S.T[0]):((S&&S.jy&&S.jy.hc)||'#eeeeee');
// on-field skin tone: the real player's tone for known players, and the same tone every play for everyone else
function plSkinOf(o){try{const n=o.fn||'';const p=PLK[n];if(p)return SK[[0,1,2,3,4,5,5][p.s]];if(n)return SK[Math.abs(hsh(n))%6]}catch(e){}return SK[Math.random()*6|0]}
