// ---------------- GSPN: turning real results into headlines and shows ----------------
const gpLine=st=>!st?'did not play':`${st.cmp}/${st.att}, ${st.yds} yds, ${st.td} TD, ${st.int} INT`+(st.ry>=40||st.rtd?`, ${st.ry} rush yds`+(st.rtd?`, ${st.rtd} rush TD`:''):'');
const gpLev=()=>({hs:'high school football',col:'college football',draft:'this draft class',pro:'the league'})[S.stage||'hs'];
const gpTN=()=>S.T&&S.T[0]?tn(S.T[0]):'his team';
function gpRec(){const t=S.T[0];return t.w+'-'+t.l}
// build the event from the game that just finished
function gpGame(oi,w){try{if(!S||!S.T||oi==null||!S.T[oi]||w==null)return;const G=gpS(),st=S.stage||'hs',T=S.T,me=T[0],o=T[oi],L=GPLS;GPLS=null;const sc=g&&g.s?[g.s[0],g.s[1]]:[w?1:0,w?0:1],kind=(g&&g.kind)||'reg';let title=(g&&g.title)||'';if(!title)try{title=gTitle(kind=='col'?'reg':kind)||''}catch(_){}
 const ttl=/State Championship|National Championship|Ultra Bowl|Conference Championship/.test(title),big=['po','cfp','cc','pp'].includes(kind),rv=((g&&g.rv&&g.rv.nm)||(rvOf(oi)||{}).nm||'').replace(/^Division rivalry vs the .*/,'the division rivalry');
 const e={p:!!(L&&L.st),st:L&&L.st,gr:L?(S.gs[S.gs.length-1]||60):null,w:!!w,sc,m:sc[0]-sc[1],o:tn(o),oo:o.ovr,mo:me.ovr,od:o.ovr-me.ovr,k:kind,big,ttl,G:title.replace(/^.*· /,'').replace('College Football Playoff','CFP'),gt:title,rv,cb:!!(w&&g&&g.q4d>=8),gwd:!!(w&&g&&g.gwd),d:(g&&g.q4d)||0,stg:st};
 const reg=!['po','cfp','pp'].includes(kind);e.W=me.w+(w&&reg?1:0);e.L=me.l+(!w&&reg?1:0);
 if(st=='col'){const rk=rankAll();e.rk=rk.indexOf(oi)+1;e.mrk=rk.indexOf(0)+1;if(e.rk>25)e.rk=0}
 G.ft=G.ft||{};if(e.p&&!G.ft[st])G.ft[st]=gpTmK();
 G.g.push({p:e.p?1:0,gr:e.gr,w:e.w?1:0,od:e.od,m:e.m,k:kind,big:big?1:0,ttl:ttl?1:0,yr:yrN(),st,cb:e.cb?1:0,td:e.p?e.st.td:0,int:e.p?e.st.int:0});if(G.g.length>40)G.g.splice(0,G.g.length-40);
 if(!G.on&&(st!='hs'||(S.nr||prospectRank())<=250||S.stars>=4||(e.p&&e.st.td>=5)||(ttl&&w)))gpBegin();
 if(G.on&&st!='hs'&&!G.lg&&e.p)gpLegends();
 if(G.on){gpPreSeason();gpDestPreds()}
 if(S.bench&&!G.bn){G.bn=1;gpNews('bench')}else if(!S.bench)G.bn=0;
 if(G.on)gpUpd(e);
 gpCycle(e);gpSnap();
 if(ttl&&w)gpTitleWon(e);if(G.on&&e.p&&w&&['mon','cbw','gwdw','upw'].includes(gpCat(e)))S.pop=cl((S.pop||40)+1,0,100);
 if(G.cy&&G.cy.hl)HM=(HM?HM+' ':'')+'📺 GSPN: '+G.cy.hl;
}catch(err){try{console.log('gspn',err)}catch(_){}}}
// GSPN starts covering you (a recruit worth watching, or any college/pro QB)
function gpBegin(){const G=gpS();if(G.on)return;G.on=1;G.onW=gpW();['sls','skb','nrt','csv'].forEach(id=>{gpInit(id);gpSigMake(id)});
 const h=S.stage=='hs'?gpF(gpPick(['GSPN Recruiting Central adds {N} to its national watch list','{N} lands on the national radar','Recruiting Central: who is {N}? A {st}-star QB from {T} worth knowing']),{N:S.name,st:S.stars,T:gpTN()}):gpF('GSPN puts {N} ({T}) under the microscope',{N:S.name,T:gpTN()});
 gpHL(h,'n',1,3);gpQ('bn',{tt:'On the radar',ln:[['dp',S.stage=='hs'?gpF('Remember the name: {N}. {st}-star quarterback, {T}. We have him at No. {nr} nationally. First Take, you are going to be talking about this kid.',{N:S.name,st:S.stars,T:gpTN(),nr:S.nr||prospectRank()}):gpF('{N} is officially on our radar. The First Take crew has already picked sides.',{N:S.name}),'happy']]})}
function gpLegends(){const G=gpS();if(G.lg)return;G.lg=1;GPL_.forEach(id=>{gpInit(id);gpSigMake(id)})}
// headline list + history
function gpHL(h,t,u,i){const G=gpS();G.hl.unshift({w:gpW(),h,t:t||'n',u:u?1:0,i:i||1});if(G.hl.length>45)G.hl.length=45;if((i||1)>=3){G.hi.unshift({w:gpW(),h,yr:yrN()});if(G.hi.length>100)G.hi.length=100}}
// queue a segment for the next show (or push it into the current one right away)
function gpQ(sh,seg,now){const G=gpS();seg.sh=sh;if(now===false){(G.nw=G.nw||[]).push(seg);return}if(G.cy&&!G.cy.end&&G.cy.segs.length<9){G.cy.segs.unshift(seg);G.cy.n=++G.n}else G.cy={n:++G.n,w:gpW(),segs:[seg],hl:seg.tt}}
// ---- the headline about your game ----
const GHL={
 ttlw:['{T} win the {G}! {LN} delivers in a {S} victory over {O}','CHAMPIONS: {N} leads {T} past {O}, {S}, in the {G}','{LN} and {T} win the {G}. Final: {S}'],
 ttll:['Heartbreak: {O} beat {T} {S2} in the {G}','{T}\'s title run ends in the {G}, {S2}','So close: {LN} and {T} fall to {O} in the {G}'],
 mon:['{N} goes off: {L} as {T} beat {O}','{td} touchdowns, zero picks: {LN} torches {O}','{LN} is unstoppable in a {S} rout of {O}'],
 disl:['{LN} throws {int} interceptions in loss to {O}','Rough night for {N}: {L} in a {S2} loss to {O}','{O} pick off {LN} {int} times in a {S2} win'],
 disw:['{T} survive {LN}\'s {int} interceptions to beat {O}','Ugly win: {T} top {O} {S} despite {int} picks from {LN}'],
 cbw:['{LN} rallies {T} from {d} down to stun {O}, {S}','Comeback! {T} storm back from {d} behind to beat {O}','Down {d} in the fourth, {N} brings {T} all the way back'],
 gwdw:['{LN} leads the game-winning drive as {T} edge {O}, {S}','Clutch: {N} drives {T} to a late {S} win over {O}'],
 upw:['Upset! {T} take down {RO}, {S}','{LN} leads {T} past favored {RO}','{T} shock {RO} behind {N}: {L}'],
 badl:['Stunner: {O} upset {T}, {S2}','{T} stumble against {O}; {LN}: {L}'],
 rvw:['{RV}: {T} beat {O}, {S}','{LN} wins {RV} as {T} top {O}','Bragging rights: {N} and {T} take {RV}'],
 rvl:['{O} take {RV}, {S2}','{RV} goes to {O}; {LN}: {L}'],
 good:['{LN} sharp as {T} beat {O}, {S}','{N}: {L} in a {S} win over {O}','{T} roll past {O}, {S}, behind {LN}'],
 win:['{T} beat {O}, {S}','{T} improve to {W}-{L_} with a win over {O}','{LN} and {T} handle {O}, {S}'],
 grind:['Not pretty: {T} beat {O} {S} on a quiet day for {LN}','{T} grind out a {S} win over {O}'],
 loss:['{O} beat {T}, {S2}','{T} fall to {W}-{L_} after a loss to {O}','{LN}: {L} as {T} lose to {O}'],
 dnpw:['{T} beat {O}, {S}, with {N} on the sideline'],dnpl:['{O} beat {T}, {S2}; {N} did not play']};
function gpCat(e){const P=e.p?gpPerf(e):null;if(e.ttl)return e.w?'ttlw':'ttll';if(!e.p)return e.w?'dnpw':'dnpl';const s=e.st;
 if(e.w&&((s.td>=5&&s.int==0)||P>=94))return 'mon';if(s.int>=3||P<38)return e.w?'disw':'disl';if(e.cb)return 'cbw';if(e.gwd)return 'gwdw';if(e.w&&e.od>=8)return 'upw';if(!e.w&&e.od<=-10)return 'badl';if(e.rv)return e.w?'rvw':'rvl';if(e.w&&P>=78)return 'good';if(e.w&&P<55)return 'grind';return e.w?'win':'loss'}
function gpVars(e){const s=e.st||{},at=Math.max(1,s.att||0),ss=S.ss||{};const pl=(n,w)=>n+' '+w+(n==1?'':'s');return{picks:pl(s.int||0,'pick'),ints:pl(s.int||0,'interception'),tds:pl(s.td||0,'touchdown'),N:S.name,LN:S.name.split(' ').pop(),T:gpTN(),O:e.o,RO:(e.rk?'No. '+e.rk+' ':'')+e.o,S:e.sc[0]+'-'+e.sc[1],S2:e.sc[1]+'-'+e.sc[0],L:gpLine(e.st),td:s.td||0,int:s.int||0,yds:s.yds||0,cmp:s.cmp||0,att:s.att||0,pct:Math.round((s.cmp||0)/at*100),ypa:((s.yds||0)/at).toFixed(1),ry:s.ry||0,sk:s.sk||0,W:e.W,L_:e.L,RV:e.rv,G:e.G,d:e.d,oo:e.oo,mo:e.mo,mrk:e.mrk||0,LEV:gpLev(),ttd:ss.td||0,tyd:(ss.yds||0).toLocaleString(),tint:ss.int||0}}
// ---- one news cycle: stage show, First Take, Film Room, Legends, league news ----
function gpCycle(e){const G=gpS(),v=gpVars(e),cat=gpCat(e),C={n:++G.n,w:gpW(),segs:[],hl:null};const fv={...v,L:v.L,W:e.W,L2:e.L};
 const h=gpT('hl.'+cat,GHL[cat],v);C.hl=h;
 G.dnp=e.p?0:(G.dnp||0)+1;if((G.on||S.stage!='hs')&&(e.p||e.big||e.ttl)){gpHL(h,'n',1,e.ttl?3:e.big||cat=='mon'||cat=='cbw'?2:1)}
 if(G.nw&&G.nw.length){C.segs.push(...G.nw);G.nw=[]}
 C.segs.push(gpStage(e,v));
 if(G.on){C.segs.push(!e.p&&G.dnp>=2&&Math.random()<.6?gpFTL():gpFT(e,v,cat));if(e.p)C.segs.push(gpFR(e,v));if(G.lg&&e.p)C.segs.push(gpLG(e,v));
  if(G.n%6==0)C.segs.push(gpOU());else if(G.n%4==0&&S.stage!='pro'){const s=gpStock();if(s)C.segs.push(s)}else if(G.n%5==0){const m=gpMoney();if(m)C.segs.push(m)}}
 gpLeague(C);C.g=1;G.cy=C}
// stage shows: Recruiting Central, College Football Tonight, Pro Football Countdown
function gpStage(e,v){const st=S.stage||'hs',G=gpS();
 if(st=='hs'){const nr=S.nr||prospectRank(),B=gpRB(),qr=B.me,off=(S.off||[]).slice().sort((a,b)=>b.ovr-a.ovr),R_=G.rk,prev=R_.length?R_[R_.length-1][1]:null,mom=prev==null?'New to the board':prev>nr?'▲ Up '+(prev-nr)+(prev-nr==1?' spot':' spots'):prev<nr?'▼ Down '+(nr-prev)+(nr-prev==1?' spot':' spots'):'Holding steady';
  const ln=G.on?gpF(gpPick(['{N} ({st}★) is the No. {nr} prospect in the country and the No. {qr} quarterback in his class. Momentum: {mom}.','{st}-star QB {N} sits at No. {nr} nationally, QB No. {qr}. {mom}.']),{N:S.name,st:S.stars,nr,qr,mom}):gpF('{N} is not on our national board yet. Games like {L} against {O} are how you get there.',{...v});
  const l2=off.length?gpF('{k} offer{s} so far. {top} leads the pack{cm}.',{k:off.length,s:off.length==1?'':'s',top:off[0].n,cm:S.commit?'; he is committed to '+S.commit:''}):'No scholarship offers yet. Coaches are watching.';
  return{sh:'rc',tt:'Recruiting Central',ln:[['dp',ln,'happy'],['dp',l2,'smug']]}}
 if(st=='col'){const hs=e.k=='col'&&S.wk>=4?heisman():null,ln=[['kh',gpF(e.big?'{G}: {T} '+(e.w?'beat':'fall to')+' {RO}, {S}. {LN}: {L}.':'{T} ({W}-{L2}) '+(e.w?'beat':'fall to')+' {RO}, {S}. {LN}: {L}.'+(e.mrk&&e.mrk<=25?' They are No. {mrk} in our poll.':''),{...v,W:e.W,L2:e.L}),e.w?'happy':'sad']];
  if(hs)ln.push(['kh','Heisman watch: '+hs.map((x,i)=>(i+1)+'. '+x.n+(x.me?' ◀':'')).join(' · '),'smug']);return{sh:'cft',tt:'College Football Tonight',ln}}
 const T=S.T,me=T[0],cf=(me.dv||'').slice(0,3),Lc=T.map((t,i)=>i).filter(i=>(T[i].dv||'').startsWith(cf)).sort((a,b)=>pRec(b)-pRec(a)),sd=Lc.indexOf(0)+1,ln=[['sr',gpF(e.big?'{G}: {T} '+(e.w?'beat':'fall to')+' {O}, {S}. {LN}: {L}.':'{T} are {W}-{L2} after '+(e.w?'beating':'losing to')+' {O}, {S}. {LN}: {L}.',{...v,W:e.W,L2:e.L}),e.w?'happy':'sad']];
 if(e.k!='pp'&&cf)ln.push(['sr',sd<=7?'If the season ended today they would be the No. '+sd+' seed in the '+cf+'.':'Right now they are on the outside of the '+cf+' playoff picture.','smug']);return{sh:'pfc',tt:'Pro Football Countdown',ln}}
