
// ---------------- new small-college schools (shuffled into the smaller conferences) ----------------
const NEWU=[['McDonald’s University','MCD','McDONALD’S'],['Burger King University','BKU','BURGER KING'],['Xbox University','XBX','XBOX'],['University of Kanye West','UKW','KANYE'],['Monster’s University','MON','MONSTERS'],
 ['Gotham City University','GCU','GOTHAM'],['Bowser State University','BSU','BOWSER ST'],['Tyler Junior College','TJC','TYLER'],['Steven L. Smothers University','SLS','SMOTHERS'],['Pokemon U','PKU','POKEMON'],
 ['Marvel University','MRV','MARVEL'],['Lebron University','LBU','LEBRON'],['Universe University','UNV','UNIVERSE'],['Deadpool State University','DSU','DEADPOOL'],['Kendrick Lamar University','KLU','KENDRICK'],
 ['Texas A&M Commerce','TAMC','LIONS'],['Spotify University','SPO','SPOTIFY'],['Subway University','SUB','SUBWAY'],['University of Starbucks','USB','STARBUCKS'],['Bang University','BNG','BANG'],
 ['GTA U','GTA','GTA'],['Sprunk University','SPK','SPRUNK'],['University of Beer','UOB','BEER'],['NYPD University','NYPD','NYPD'],['New York City Penitentiary University','NYCP','PEN'],
 ['Kyrie Irving University','KIU','KYRIE'],['Magic Johnson University','MJU','MAGIC'],['University of Diddy','UOD','DIDDY'],['Shart University','SHU','SHART'],['University of Africa','UAF','AFRICA'],
 ['Hall of Meat University','HOM','MEAT'],['50 Cent University','50C','50 CENT'],['Michael Jordan University','MJ','JORDAN'],['Michael Jordan State University','MJS','JORDAN ST'],['Zach Wilson State','ZWS','ZACH WILSON'],
 ['Lionel Messi University','LMU','MESSI'],['Wayne Gretzky University','WGU','GRETZKY'],['Shohei Ohtani University','SOU','OHTANI'],['The White House University','WHU','WHITE HOUSE'],['Eric Rodney University','ERU','RODNEY'],
 ['Free Bird University','FBU','FREE BIRD'],['University of Lil Wayne','ULW','LIL WAYNE'],['Wide Receiver U','WRU','WR U']];
// pick which generic small-college schools become the new ones (spread at random over the small conferences)
function nuPick(col,seed,keep){const pn=new Set(typeof PWN!='undefined'?PWN:[]),gen=col.filter(c=>!pn.has(c.n)).flatMap(c=>c.t).filter(t=>!keep.includes(t.n)&&!NEWU.some(u=>u[0]==t.n)),r=rng((seed||1)*977+43);
 for(let i=gen.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[gen[i],gen[j]]=[gen[j],gen[i]]}return gen.slice(0,NEWU.length)}
function nuGen(col,seed){nuPick(col,seed,[]).forEach((t,i)=>{const u=NEWU[i];t.n=u[0];t.ab=u[1];t.sh=u[2]})}
const esc_=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function nuMig(s){if(!s||s.nuv==1||!s.col)return s;try{if(s.col.some(c=>c.t.some(t=>NEWU.some(u=>u[0]==t.n)))){s.nuv=1;return s}const keep=[s.commit,s.stage=='col'&&s.T&&s.T[0]?s.T[0].n:null].filter(Boolean),P=nuPick(s.col,s.seed,keep),map=P.map((t,i)=>[t.n,NEWU[i]]);
 let j=JSON.stringify(s);map.forEach(([o,u])=>{j=j.replace(new RegExp('(?<![A-Za-z])'+esc_(o)+'(?![A-Za-z])','g'),u[0])});s=JSON.parse(j);
 const all=s.col.flatMap(c=>c.t).concat(s.T||[]);NEWU.forEach(u=>all.forEach(t=>{if(t&&t.n==u[0]){t.ab=u[1];t.sh=u[2]}}));s.nuv=1}catch(e){}return s}
