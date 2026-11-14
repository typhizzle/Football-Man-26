// ===================== 🏈 MORE COUNTERPART STARS (+ their real 2026 contracts) =====================
// [team index, roster slot, name, ovr, age (real, Oct 2026), jersey]  — slots 23/24 are the backup QB spots
const PKS2=[
 [17,4,'NFL Youngboy',90,25,3],[6,1,'Quinton Truckems',80,22,10],
 [19,11,'Kareem Jabarter',80,23,51],[1,2,'JD Less',86,29,2],[3,1,'Bravebeyond Denderson',83,24,32],[16,2,'Sacramento Blue',77,29,5],
 [3,2,'JA Blue',88,29,11],[3,5,'Gunter Henny',83,31,85],[30,1,'Daniel Hate',80,21,4],[31,1,'Byron Dillems',88,26,23],[12,2,'Racer Noodle',90,26,4],
 [12,3,'Zavier Pennies',84,23,1],[19,3,'Tiktok Guy',73,29,17],[23,3,'Osmell Wrectomm Jr.',78,33,13],[19,15,'Barbell Geese',82,22,8],[10,2,'Carmel Grape',80,21,17],
 [10,3,'Gamble Bentley',80,31,0],[10,1,'Phony Caller',84,29,20],[10,12,'Ben Epstein',91,29,98],[10,5,'Slingshot Elm',74,23,84],
 [10,20,'Manny Escort',86,28,37],[17,20,'Blake Ups',81,22,2],[9,2,'Drake Ups',83,25,1],[18,2,'Esteban Shovel',92,32,14],[29,19,'Tradonte Shovel',72,28,7],
 [18,3,'Berry Flooring',89,31,17],[18,1,'Jake Flossing-Liar',74,25,22],[18,7,'Russell Westbrook',82,27,65],[18,16,'Daddy Wildes',77,22,6],[27,1,'Bubba Wifey',86,27,30],
 [27,2,'Toot McVillain',87,23,4],[27,5,'Darryn Plum',83,34,12],[25,11,'Walker Old',87,27,99],[19,2,'Mordecai Neighbors',94,23,1],[19,1,'Cameron Skat',82,24,44],
 [2,1,'DaBron Eight-Chains',93,25,28],[16,5,'Houston Godfrey',89,31,88],[9,5,'Taylor Wardawg',87,24,84],[28,6,'Trentin Wilford',99,38,71],[28,11,'Nate Bosen',94,29,97],
 [1,11,'Joseph Bosen',90,31,97],[17,15,'Vin Maller',83,37,40],[13,18,'Matthew Curtain',95,26,2],[8,18,'Darryl Bee',93,25,24]];
try{PKS.push(...PKS2)}catch(e){}
// backup QBs go in the QB2/QB3 spots: [name, ovr, age, team, jersey, 0]
try{QBB.push(['Uncle Rico',75,30,30,10,0],['Dustin Plane',79,27,12,2,0],['JJ Crablegs',78,32,19,19,0],['Number Nine',76,23,19,9,0],['Snitchell Biscuit',68,32,10,14,0])}catch(e){}
// updated stars
try{PKS.forEach(q=>{if(q[2]=='Kevin Sprinter'){q[3]=94;q[4]=26;q[5]=9}if(q[2]=='Meters Ferret'){q[3]=99;q[4]=30;q[5]=95}})}catch(e){}
// [position, $M per year, years left including 2026, note]
Object.assign(PKC,{
 'Meters Ferret':['EDGE',40,5,'4 yrs/$160M extension'],
 'NFL Youngboy':['WR',27.3,1,'Franchise tag (1 yr)'],
 'JA Blue':['WR',32,4,'3 yrs/$96M extension (traded to New England)'],
 'Berry Flooring':['WR',32,3,'3 yrs/$96M extension'],
 'Darryl Bee':['CB',30,3,'3 yrs/$90M extension'],
 'Nate Bosen':['EDGE',34,3,'5 yrs/$170M'],
 'JD Less':['WR',27.5,4,'4 yrs/$110M (traded to Buffalo)'],
 'Trentin Wilford':['OL',27.5,2,'Top-paid tackle'],
 'Matthew Curtain':['CB',24,4,'4 yrs/$96M extension'],
 'Ben Epstein':['DT',23.5,2,'4 yrs/$94M'],
 'Gamble Bentley':['WR',23,2,'4 yrs/$92M'],
 'Walker Old':['EDGE',17,2,'3 yrs/$51M'],
 'DaBron Eight-Chains':['RB',16,5,'4 yrs/$64M extension'],
 'Kevin Sprinter':['RB',15,3,'3 yrs, up to $45M'],
 'Daniel Hate':['RB',13.3,4,'Rookie deal (#3 pick, est.)'],
 'Carmel Grape':['WR',12.8,4,'Rookie deal (#4 pick): 4 yrs/$51.1M'],
 'Joseph Bosen':['EDGE',12.6,1,'1 yr (est. from his last deal)'],
 'Houston Godfrey':['TE',7,1,'1 yr/$7M (re-signed)'],
 'Esteban Shovel':['WR',12,1,'1 yr, up to $12M'],
 'Kareem Jabarter':['EDGE',11.3,3,'Rookie deal (#3 pick)'],
 'Barbell Geese':['LB',11.5,4,'Rookie deal (#5 pick, est.)'],
 'Byron Dillems':['RB',11,3,'3 yrs/$33M extension'],
 'Manny Escort':['S',11,1,'3 yrs/$33M'],
 'Dustin Plane':['QB',10,1,'Traded to KC; the Jets still pay $7M of it'],
 'Daddy Wildes':['LB',9.3,4,'Rookie deal (#7 pick): 4 yrs/$37.2M'],
 'Gunter Henny':['TE',9,1,'3 yrs/$27M'],
 'Bubba Wifey':['RB',8.3,3,'4 yrs/$33.2M'],
 'Phony Caller':['RB',8,1,'3 yrs/$24M'],
 'Uncle Rico':['QB',8,1,'1 yr/$8M'],
 'Mordecai Neighbors':['WR',7.6,2,'Rookie deal (#6 pick)'],
 'Blake Ups':['S',6.5,4,'Rookie deal (#11 pick, est.)'],
 'Sacramento Blue':['WR',6.5,1,'1 yr, up to $6.5M'],
 'Toot McVillain':['WR',6.5,3,'Rookie deal (#8 pick)'],
 'Number Nine':['QB',5.5,2,'Rookie deal (traded to the Giants)'],
 'Taylor Wardawg':['TE',4.8,3,'Rookie deal (#14 pick)'],
 'JJ Crablegs':['QB',4,1,'2 yrs/$8M'],
 'Drake Ups':['WR',3.8,1,'Last year of his rookie deal'],
 'Zavier Pennies':['WR',3.3,2,'Rookie deal'],
 'Quinton Truckems':['RB',2.6,3,'Rookie deal'],
 'Bravebeyond Denderson':['RB',2.5,3,'Rookie deal'],
 'Racer Noodle':['WR',1.6,1,'Last year of his rookie deal'],
 'Cameron Skat':['RB',1.2,3,'Rookie deal'],
 'Slingshot Elm':['TE',1.2,3,'Rookie deal'],
 'Jake Flossing-Liar':['RB',1,3,'Rookie deal (7th round)'],
 'Tradonte Shovel':['CB',.4,1,'Practice squad'],
 'Osmell Wrectomm Jr.':['WR',.4,1,'Practice squad']
});
// Jordan Give-Itt no longer uses the George Pickens tag (that's NFL Youngboy now)
try{delete PKC['Jordan Give-Itt']}catch(e){}
// older saves: rename stars who already joined a roster under an old name
const PKREN={'Tylard Phillipson':'Jack Goff','Mike Garrison':'Meters Ferret','Gettin-It Running-Man':'Kevin Sprinter'};
function pkRen(){try{starDedup()}catch(e){}if(!S||!S.ro||S.pkr2)return;for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>{if(x&&PKREN[x.n]){x.n=PKREN[x.n];if(x.n=='Meters Ferret'){x.ovr=Math.max(x.ovr,99);x.num=95}if(x.n=='Kevin Sprinter')x.ovr=Math.max(x.ovr,94)}})}if(PKREN[S.name])S.name=PKREN[S.name];S.pkr2=1}

// a brand-new roster never repeats a name that's already in the league (or twice on one team)
function rosDedup(L){if(!S||!Array.isArray(L))return;const have=new Set();for(const k in S.ro){const R_=S.ro[k];if(R_!==L&&Array.isArray(R_))R_.forEach(x=>x&&have.add(x.n))}const star=n=>n==S.name||PKS.some(q=>q[2]==n)||QBB.some(b=>b[0]==n)||QBP.some(q=>q[0]==n);
 L.forEach(x=>{if(!x||x.npx!=null||x.pal||star(x.n)||x.n==S.name)return;let g=0;while(have.has(x.n)&&g++<20)x.n=uNm(Math.random);have.add(x.n)});try{starDedup()}catch(e){}}
// a random name can come out exactly like a star's name: keep the real star, rename the look-alikes
function starDedup(){if(!S||!S.ro)return;const exp={};PKS.forEach(q=>exp[q[2]]=[q[6]||POSL[q[1]],q[3]]);QBB.forEach(b=>exp[b[0]]=['QB',b[1]]);QBP.forEach(q=>exp[q[0]]=['QB',q[1]]);
 const by={},all=new Set();for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>{if(!x)return;all.add(x.n);if(exp[x.n])(by[x.n]=by[x.n]||[]).push(x)})}
 for(const n in by){const A=by[n];if(A.length<2)continue;const e=exp[n],sc=x=>(x.pos==e[0]||String(e[0]).includes(x.pos)?100:0)-Math.abs((x.ovr||0)-e[1])+(x.qp?5:0);A.sort((a,b)=>sc(b)-sc(a));A.slice(1).forEach(x=>{if(x.n==S.name)return;let g=0,nm;do nm=uNm(Math.random);while((all.has(nm)||exp[nm])&&g++<30);x.n=nm;all.add(nm)})}}
