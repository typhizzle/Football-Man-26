// ======================= GSPN: Gaming and Sports Programming Network =======================
// the analysts who form opinions about you (each keeps one signature take for your whole career)
const GPA={
 sls:{n:'Steven L. Smothers',sh:'ft',r:'First Take',bio:'Loud, proud and never wrong (just ask him). Lives for big games and bigger statements.',st:.55,w:[1,1.3,.9,1.3,.9],b:[0,-8,0,-4,0],f:{s:'#8d5524',h:'#1b1b1b',bald:1,gl:1,bd:1,su:'#3b1f5c',ti:'#c9a227'}},
 skb:{n:'Skipper Baymore',sh:'ft',r:'First Take',bio:'Professional contrarian. The more people love a player, the harder he looks for the crack.',st:.82,w:[1,1,1,1.1,.8],b:[-10,-6,-6,-8,0],ct:1,f:{s:'#f1c27d',h:'#c9c9c9',su:'#7a1c1c',ti:'#ffffff',gl:1}},
 nrt:{n:'Nate Right',sh:'fr',r:'Film Room',bio:'Former quarterbacks coach. Mechanics, accuracy, progressions, pocket presence. Lets the tape talk.',st:.25,w:[1.4,1.1,.6,.8,.4],b:[0,0,0,0,0],f:{s:'#c68642',h:'#2b1b12',su:'#1d3557',ti:'#9fd3ff',bd:1}},
 csv:{n:'Calvin Savage',sh:'fr',r:'Film Room',bio:'Scheme and context. Supporting casts, systems, opponents, and how you stack up against everybody else.',st:.35,w:[1,.9,1.4,1,.7],b:[0,0,0,0,0],f:{s:'#5c3a21',h:'#111111',su:'#2d3436',ti:'#e17055',gl:1}},
 dk:{n:'Dutch Kellerman',sh:'lg',r:'Legend · QB',bio:'Two-time MVP, Hall of Famer. The purist: footwork, reads, ball out on time.',st:.6,w:[1.2,1,.8,.9,.6],b:[-3,0,0,0,0],f:{s:'#f1c27d',h:'#d9b25b',su:'#34495e',ti:'#c0392b'}},
 ice:{n:'Ray "Ice" Montclair',sh:'lg',r:'Legend · QB',bio:'Three Ultra Bowl rings. The only stat he respects is the scoreboard in January.',st:.72,w:[.7,.9,1,1.6,.7],b:[0,0,0,-8,0],f:{s:'#8d5524',h:'#1b1b1b',su:'#111111',ti:'#c9a227',bald:1}},
 ham:{n:'Marcus "The Hammer" Boone',sh:'lg',r:'Legend · LB',bio:'Two-time Defensive Player of the Year. Tells you exactly how he would come after you.',st:.5,w:[1,1.2,.8,1,.6],b:[-4,-4,0,0,0],f:{s:'#5c3a21',h:'#111111',su:'#7f8c8d',ti:'#2c3e50',bd:1}},
 bth:{n:'"Big Tom" Hollister',sh:'lg',r:'Legend · C',bio:'Four-time All-Pro center. Judges a quarterback by how his linemen talk about him.',st:.4,w:[.8,.9,1.6,.9,1.2],b:[0,0,6,0,4],f:{s:'#ffdbac',h:'#7a3b1a',su:'#556b2f',ti:'#f1c40f',bd:1}},
 slk:{n:'Andre "Silk" Whitaker',sh:'lg',r:'Legend · WR',bio:'Three-time All-Pro receiver. Timing, touch, and whether receivers want to play with you.',st:.45,w:[1.2,1.1,.9,.9,.7],b:[2,0,0,0,0],f:{s:'#c68642',h:'#1b1b1b',su:'#8e44ad',ti:'#ffffff'}}};
// hosts and reporters (news, not opinions)
const GPH={dp:{n:'Dana Pruitt',r:'Recruiting Central',f:{s:'#f1c27d',h:'#5a3825',su:'#16a085',ti:'#ffffff',fem:1}},mk:{n:'Mel Kypers Jr.',r:'Draft analyst',f:{s:'#ffdbac',h:'#2b2b2b',su:'#2c3e50',ti:'#e74c3c',big:1}},kh:{n:'Kirk Herbie',r:'College Football Tonight',f:{s:'#f1c27d',h:'#8b5a2b',su:'#1e3799',ti:'#f6b93b'}},sr:{n:'Sam Ryder',r:'Pro Football Countdown',f:{s:'#d9a066',h:'#3b2a1a',su:'#2f3640',ti:'#00a8ff'}},as:{n:'Adam Shefton',r:'GSPN Insider',f:{s:'#ffdbac',h:'#6b4a2b',su:'#353b48',ti:'#e84118',gl:1}}};
const GPL_=['dk','ice','ham','bth','slk'],GPD=['t','c','l','k','ch'],GPDN={t:'Talent',c:'Consistency',l:'Leadership',k:'Clutch',ch:'Character'};
const GSH={ft:['FIRST TAKE','#e84118'],fr:['FILM ROOM','#0097e6'],lg:['GSPN LEGENDS','#c9a227'],rc:['RECRUITING CENTRAL','#16a085'],cft:['COLLEGE FOOTBALL TONIGHT','#1e3799'],pfc:['PRO FOOTBALL COUNTDOWN','#2f3640'],bn:['BREAKING NEWS','#c23616'],dn:['GSPN DRAFT CENTER','#273c75'],rx:['THE RECEIPTS','#6c5ce7'],ity:['I TOLD YOU SO','#00b894'],pw:['STOCK UP, STOCK DOWN','#e1b12c'],ou:['OVERRATED OR UNDERRATED?','#d35400'],mm:['PUT YOUR MONEY WHERE YOUR MOUTH IS','#8e44ad']};
let GPLS=null;// last stats line from addStats (the game that is being wrapped up)
const gpP=id=>GPA[id]||GPH[id]||{n:id,f:{}};
function gpS(){if(!S)return null;const G=S.gp=S.gp||{v:1,op:{},sig:{},pr:[],hl:[],hi:[],cy:null,n:0,seen:0,rk:[],dk:[],pq:[],g:[],on:0,lg:0,used:{},nw:[]};['op','sig','used'].forEach(k=>G[k]=G[k]||{});['pr','hl','hi','rk','dk','pq','g','nw'].forEach(k=>G[k]=G[k]||[]);return G}
const gpYr=()=>{const st=S.stage||'hs',cl_=['freshman','sophomore','junior','senior'];return st=='hs'?'HS '+cl_[Math.min(3,(S.yr||1)-1)]:st=='col'?'college '+cl_[Math.min(3,(S.cy||1)-1)]:st=='draft'?'draft season':(S.py||1)==1?'PFL rookie':'PFL year '+S.py};
const gpW=()=>yrN()+' · '+gpYr()+(S.stage!='draft'&&S.wk!=null?' · wk '+((S.wk||0)+1):'');
const gpPick=a=>a[Math.random()*a.length|0];
function gpF(s,e){return String(s).replace(/\{(\w+)\}/g,(m,k)=>e&&e[k]!=null?e[k]:m)}
// pick a template, avoiding the ones used most recently
function gpT(key,arr,e){const G=gpS(),u=G.used[key]||[],ok=i=>!e||((e.int||0)>0||!/\{(picks|ints|int)\}/.test(arr[i]))&&((e.td||0)>=2||!/\{tds\}|\{td\} touchdowns/.test(arr[i]));let all=arr.map((_,i)=>i).filter(ok);if(!all.length)all=arr.map((_,i)=>i);let c=all.filter(i=>!u.includes(i));if(!c.length)c=all;const i=gpPick(c);G.used[key]=[i,...u].slice(0,Math.max(1,Math.min(4,arr.length-1)));return gpF(arr[i],e)}
// opinion helpers
function gpOv(id){const o=gpS().op[id],p=GPA[id];if(!o||!p)return 50;let s=0,w=0;GPD.forEach((d,i)=>{s+=o[d]*p.w[i];w+=p.w[i]});return Math.round(s/w)}
const gpStance=v=>v>=80?['Believer','#00b894']:v>=66?['Fan','#55efc4']:v>=52?['Open-minded','#b2bec3']:v>=40?['Skeptic','#fdcb6e']:['Critic','#ff7675'];
const gpLvN=()=>{const q=qo(S.q),st=S.stage||'hs';return cl(st=='hs'?(q-45)/40:st=='pro'?(q-64)/32:(q-55)/36,0,1)};
function gpInit(id){const G=gpS(),p=GPA[id],n=gpLvN();if(G.op[id])return;const base=[40+n*42,52,48+((S.trust||50)-50)*.3,50,56];G.op[id]={};GPD.forEach((d,i)=>{G.op[id][d]=cl(Math.round(base[i]+p.b[i]+(Math.random()-.5)*6),15,92)})}
// a coach-grade-like performance score that also weighs who you played
const gpPerf=e=>cl(Math.round((e.gr||0)+cl((e.od||0)*.4,-8,10)+(e.big?3:0)),0,100);
function gpSd(a){if(a.length<2)return 10;const m=avg(a);return Math.sqrt(avg(a.map(x=>(x-m)*(x-m))))}
// move every analyst's opinion based on what actually happened in this game
function gpUpd(e){const G=gpS();const imp=e.ttl?2:e.big||e.rv?1.5:1,P=gpPerf(e),gs=G.g.filter(x=>x.p).slice(-5).map(x=>x.gr);
Object.keys(GPA).forEach(id=>{const p=GPA[id],o=G.op[id];if(!o)return;const r=.22*(1-p.st)*imp,mv=(d,E,i)=>{o[d]=cl(o[d]+(E-o[d])*r*p.w[i],5,98)};
 if(e.p){mv('t',cl(P+gpLens(id,e),5,99),0);mv('c',cl(86-gpSd(gs)*2.3-e.st.int*5+(P>=60?4:-6),10,95),1)}
 if(e.p)mv('l',cl((e.w?72:38)+(e.cb?15:0)+((S.trust||50)-50)*.3,10,95),2);
 if(e.p&&(Math.abs(e.m)<=8||e.big||e.ttl)){mv('k',e.w?(e.gwd||e.cb?95:e.p&&P>=60?82:70):(e.p&&P<55?24:38),3)}
 if(p.ct&&(S.pop||40)>70&&P<85)o.t=cl(o.t-1,5,98);
 const sg=G.sig[id];if(sg&&sg.s==0){const cap=GPSIG[sg.k]&&GPSIG[sg.k].cap;if(cap)cap.forEach(d=>{o[d]=Math.min(o[d],64)})}});}
function gpBump(dims,amt){const G=gpS();Object.keys(GPA).forEach(id=>{const o=G.op[id],p=GPA[id];if(!o)return;dims.forEach(d=>{o[d]=cl(o[d]+amt*(1-p.st*.6),5,98)})})}
// each analyst reads the same game differently
function gpLens(id,e){const s=e.st||{},at=Math.max(1,s.att||0),pct=(s.cmp||0)/at*100,ypa=(s.yds||0)/at,lva=(S.stage||'hs')=='pro'?75:68;
 switch(id){case 'skb':return -8+(e.od<0?e.od*.6:0)-((S.pop||40)>70?5:0);case 'sls':return (e.big?6:0)+(e.w?4:-7);case 'nrt':return cl((pct-62)*.6+(ypa-7)*2.5-(s.int||0)*3+(s.td||0),-15,15);case 'csv':return cl((lva-e.mo)*.6,-10,10);
 case 'dk':return cl(-(s.sk||0)*2+(pct-62)*.4+2,-12,10);case 'ice':return (e.w?7:-11)+(e.big&&e.w?8:0);case 'ham':return cl(-(s.int||0)*5+((s.sk||0)<=1?4:-(s.sk||0)*1.5)+3,-14,8);case 'bth':return ((S.trust||50)-50)*.2+(e.w?3:-3);case 'slk':return cl((ypa-7)*3.5+(pct-62)*.3,-12,12)}return 0}
