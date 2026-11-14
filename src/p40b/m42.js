
// ===================== NEW SCHOOLS (join at the start of a college season; your picks replace generic town + mascot teams) =====================
// [name, ab, short, replaces, rival ab (whose conference to prefer), c1, c2]
const NS3=[['Steph Curry State','SCS','CHEFS','Valdosta Rams','LBU','#1d428a','#ffc72c'],['Tim Brody A&M','TBA','GOATS','Northgate Titans','ERU','#002244','#c60c30'],
 ['Tony Stark University','TSU','IRON MEN','Granite Raiders','MRV','#b11313','#f2c94c'],['Muhammad Ali University','MAU','STINGERS','Oakhurst Rams','MJ','#d4af37','#111111'],
 ['Usain Bolt Tech','UBT','LIGHTNING','Valdosta Hawks','WRU','#009b3a','#fed100'],['Travis Scott State','TSS','CACTUS JACKS','Harborview Miners','UKW','#5c4033','#e0c097'],
 ['Kobe Bryant University','KBU','MAMBAS','Silverlake Wolves','LBU','#552583','#fdb927'],['Darth Vader Tech','DVT','SITH','Granite Hawks','TSU','#111111','#d00000'],
 ['University of Snoop Dogg','USD','BIG DAWGS','Riverton Comets','KLU','#1e3a8a','#ffffff'],['IShowSpeed University','SPD','SPEEDSTERS','Ridgemont Hawks','MRB','#e10600','#111111'],
 ['Chick-fil-A University','CFA','COWS','Summitt Hawks','MCD','#dd0033','#ffffff'],['Fortnite State','FNS','LLAMAS','Granite Falcons','XBX','#7b2ff7','#00d4ff'],
 ['MrBeast University','MRB','BEASTS','Stonebridge Falcons','SPD','#1e90ff','#ff3fa4']];
try{RVC.push(['KBU','LBU','The Purple & Gold Debate'],['KBU','SHU','The Three-Peat Feud'],['SCS','LBU','The Finals Rematch'],['MAU','MJ','The Greatest Bowl'],['UBT','WRU','The Fastest Man Bowl'],['TBA','ERU','The GOAT QB Bowl'],
 ['USD','KLU','The West Coast Classic'],['TSS','UKW','The Astroworld Showdown'],['CFA','MCD','The Nugget Bowl'],['TSU','MRV','The Avengers Bowl'],['TSU','DVT','The Disney Bowl'],['MRB','SPD','The YouTube Bowl'],['FNS','XBX','The Victory Royale Bowl'])}catch(e){}
const nsGen=n=>!/University|State|College|Tech|A&M|\bU\b|Institute|Academy/.test(n)&&/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(n);
const NSKEEP=['Granite City Gulls','Lakeshore Lakers','Riverbend Rattlers','Midvale Miners','Bayside Barracudas'];
function nsApply(s){try{if(!s||!Array.isArray(s.col)||s.ns3)return;const r=rng((s.seed||1)*977+41),all=()=>s.col.flatMap(c=>c.t),swaps=[];
 NS3.forEach(([n,ab,sh,old,rv,c1,c2])=>{if(all().some(t=>t.n==n))return;let ci=-1,ti=-1;s.col.forEach((c,i)=>{const k=c.t.findIndex(t=>t.n==old);if(k>=0){ci=i;ti=k}});
  if(ci<0){// another save: use a generic team, preferring the rival's conference
   let pc=s.col.findIndex(c=>c.t.some(t=>t.ab==rv));const pick=c=>c.t.map((t,k)=>k).filter(k=>nsGen(c.t[k].n)&&!NSKEEP.includes(c.t[k].n)&&!(s.T&&s.T[0]&&s.T[0].n==c.t[k].n));
   if(pc<0||!pick(s.col[pc]).length){const ok=s.col.map((c,i)=>i).filter(i=>pick(s.col[i]).length&&!/^Large|South Country|Atlantic Country/.test(s.col[i].n));if(!ok.length)return;pc=ok[r()*ok.length|0]}const L=pick(s.col[pc]);ci=pc;ti=L[r()*L.length|0]}
  const t=s.col[ci].t[ti];if(s.T&&s.T[0]&&s.T[0].n==t.n)return;const was=t.n;Object.assign(t,{n,ab,sh,mas:sh,c1,c2});if(Array.isArray(s.T)){const u=s.T.find(x=>x.n==was);if(u)Object.assign(u,{n,ab,sh,mas:sh,c1,c2})}swaps.push(was+' → '+n)});
 s.ns3=1;if(swaps.length)s.fmsg=(s.fmsg?s.fmsg+' ':'')+'🏫 New schools join college football: '+swaps.join(' · ')+'.'}catch(e){}}

// ===================== college QB awards: Golden Arm (best upperclass QB) and the O'Brine Award (best QB) =====================
function qbAwards(){try{const L=hwRace().filter(x=>x.pos=='QB');if(!L.length)return{};const best=L[0],up=L.find(x=>/Sr|Jr/.test(x.cls||''))||best;return{qa:best,ga:up}}catch(e){return{}}}
