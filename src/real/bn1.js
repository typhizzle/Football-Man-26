// BANNERS + EVERY PLAYER HIS OWN LOOK (Tyler 2026-11-17): out of bounds / timeout / two-minute warning / quarter banners; each field player
// is drawn from his own name (own skin, hair, body), including substitutes and the Pro Bowl.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{S=await readCode(j);SLOT=1;LASTJ='';hub();const o={};try{
 startGame0(1,'reg');g.ph='opp';g.to=[3,3];g.clk=1500;g.nx=25;oppBall();watchO();
 // watched play flagged out of bounds / timeout shows the banner
 const P=g.pl;g.ph='watch';P.e={k:'pass',oob:1};g.pl.e=P.e;wEnd('Complete','tk');o.A_oob=/OUT OF BOUNDS/.test(g.flash||'');
 g.ph='watch';g.pl.e={k:'pass',to:2};wEnd('x','tk');o.B_timeout=/TIMEOUT/.test(g.flash||'');
 // two-minute warning crossing
 g.flash='';W_.ck=1670;g.ph='watch';const st=W_.ck;W_.ck=1670;const _c=W_.ck;try{g.pl.e={k:'run'};g.pl.done=false}catch(e){}
 W_.ck=1679.9;wTick(.2);o.C_twoMin=/TWO-MINUTE/.test(g.flash||'');
 // quarter start on your own plays
 startGame0(1,'reg');g.clk=900;g._bq=1;g.ph='pre';g.note='';pre();o.D_quarter=/2ND QUARTER/.test(g.flash||'');
 // own look for every field player
 const seen=[];const _m=mk3;mk3=function(j2,s,sk,lb,ap,nh,ar){seen.push({nm:lb&&lb.nm,hr:ap&&ap.hr,hcl:ap&&ap.hcl,sk:ap&&ap.sk,bd:ap&&ap.bd});return _m.apply(this,arguments)};
 startGame0(1,'reg');g.ph='pre';setup(0);const P2=g.pl;[...P2.ol,...P2.dl,...P2.lb,...P2.db,...P2.wr].forEach(x=>sy(x,g.mj,0,0));sy(P2.qb,g.mj,0,1);
 const withAp=seen.filter(x=>x.hcl!=null).length;o.E_allOwnLook=withAp>=20;o.E_n=[withAp,seen.length];
 const ks=new Set(seen.map(x=>x.hr+'|'+x.hcl+'|'+x.sk));o.E_varied=ks.size>=5;
 // a substitute gets his own look, not the starter's
 const w=P2.wr[0];const nm0=w.fn;w.fn='Lamarcus Action';delete w.m;seen.length=0;sy(w,g.mj,0,0);const L=seen[0]||{};o.F_sub=L.hcl==='#17110e'&&L.hr===5;
 }catch(e){o.err=e.message+' '+e.stack.slice(0,200)}return o},j);console.log(JSON.stringify(r));await b.close()})();
