
// ===================== postgame: scoring summary, line score, box score, player of the game =====================
function spChk(tx){try{if(!g||!g.s)return;const L=g.sl||[0,0],d0=g.s[0]-L[0],d1=g.s[1]-L[1];if(!d0&&!d1)return;const q=g.ot?'OT':'Q'+Math.min(4,Math.floor(Math.min(g.clk,3599)/900)+1),tl=Math.max(0,900-(g.clk%900)),ck=Math.floor(tl/60)+':'+String(Math.floor(tl%60)).padStart(2,'0');
 (g.sp=g.sp||[]).push({q,ck:g.ot?'':ck,w:d0?0:1,p:d0||d1,tx:String(tx||'Score').replace(/<[^>]+>/g,''),s:[g.s[0],g.s[1]]});g.sl=[g.s[0],g.s[1]]}catch(e){}}
function pgBox(w){try{spChk('Score');const S_=g.sp||[],Q=['Q1','Q2','Q3','Q4'].concat(S_.some(x=>x.q=='OT')?['OT']:[]),ln=t=>Q.map(q=>S_.filter(x=>x.q==q&&x.w==t).reduce((a,x)=>a+x.p,0)),st=g.st,L=rost('h.0'),rc=g.rc||{};
 const tch=Object.entries(rc).map(([k,v])=>({x:L[k],v})).filter(o=>o.x).sort((a,b)=>b.v-a.v),gr=gsc(st,w),Lo=rost('h.'+g.oi)||[];
 let pog;if(gr>=72||(w&&gr>=64))pog=`${S.name} (QB) · ${sline(st)}`;else if(w&&tch[0])pog=`${tch[0].x.n} (${tch[0].x.pos}) · ${tch[0].v} touches`;else pog=`${(Lo[0]||{}).n||g.o.n} (QB, ${g.o.n})`;
 return `<details style="text-align:left;margin:6px 0"><summary style="cursor:pointer;font-weight:700">📊 Box score & scoring summary</summary>
 <table style="width:100%;font-size:14px;border-collapse:collapse;margin:6px 0"><tr><td></td>${Q.map(q=>`<td style="text-align:center;opacity:.7">${q}</td>`).join('')}<td style="text-align:center"><b>T</b></td></tr>
 <tr><td>${ab(g.m)}</td>${ln(0).map(v=>`<td style="text-align:center">${v}</td>`).join('')}<td style="text-align:center"><b>${g.s[0]}</b></td></tr><tr><td>${ab(g.o)}</td>${ln(1).map(v=>`<td style="text-align:center">${v}</td>`).join('')}<td style="text-align:center"><b>${g.s[1]}</b></td></tr></table>
 <p style="font-size:14px"><b>⭐ Player of the game:</b> ${pog}</p>
 <p style="font-size:14px"><b>Scoring</b><br>${S_.map(x=>`${x.q} ${x.ck} · ${x.w?ab(g.o):ab(g.m)} · ${x.tx} (${x.s[0]}–${x.s[1]})`).join('<br>')||'No scoring'}</p>
 <p style="font-size:14px"><b>${ab(g.m)} offense</b><br>Passing: ${st.cmp}/${st.att}, ${st.yds} yds, ${st.td} TD, ${st.int} INT · sacked ${st.sk}<br>QB rushing: ${st.ry} yds, ${st.rtd} TD${tch.length?'<br>Touches: '+tch.slice(0,4).map(o=>o.x.n.split(' ').pop()+' ('+o.x.pos+') '+o.v).join(', '):''}</p></details>`}catch(e){return ''}}
// ===================== jersey swap: you both pull them off and trade on the field =====================
function jsStart(o){if(!LR||!o||!o.m)return;ovHide();LR.js={t:0,o,sw:0,px:LR.p.x,pz:LR.p.z,ox:o.x,oz:o.z}}
function jsTick(dt){const L=LR,J=L.js,o=J.o;J.t+=dt;const t=J.t,mx=(J.px+J.ox)/2,mz=(J.pz+J.oz)/2,dx=J.ox-J.px,dz=J.oz-J.pz,dd=Math.hypot(dx,dz)||1,ux=dx/dd,uz=dz/dd,f=Math.min(1,t/.9);
 const P=[J.px,J.pz],Q=[J.px+ux*1.3,J.pz+uz*1.3],pm=L.pm;L.p.x=J.px+(P[0]-J.px)*f;L.p.z=J.pz+(P[1]-J.pz)*f;pm.position.set(L.p.x,0,L.p.z);pm.rotation.y=Math.atan2(-ux,-uz)+Math.PI;
 const ox=J.ox+(Q[0]-J.ox)*f,oz=J.oz+(Q[1]-J.oz)*f;o.m.position.set(ox,0,oz);o.m.rotation.y=Math.atan2(ux,uz)+Math.PI;
 const arms=(m,v)=>{if(m&&m.A){m.A[0].rotation.x=m.A[1].rotation.x=v}};
 if(t>1&&t<2){const u=(t-1);arms(pm,2.9*Math.sin(Math.PI*Math.min(1,u*1.2)));arms(o.m,2.9*Math.sin(Math.PI*Math.min(1,u*1.2)))}
 if(t>=1.6&&!J.sw){J.sw=1;const Ot=g.o,oj={c1:Ot.c1,c2:Ot.c2,d:Ot.d||0,pc:Ot.pc||'#dcdcdc',nc:lum(Ot.c1)>.5?'#000':'#fff'},me=DJ();
  const np=mk3(oj,1.2,0,{nm:o.n.split(' ').pop().toUpperCase(),num:o.num},AP(),1);PL.remove(pm);PL.add(np);np.position.copy(pm.position);np.rotation.y=pm.rotation.y;L.pm=np;
  const no=mk3(me,1.2,0,{nm:me.nm,num:S.num},{sk:3,hr:2,hcl:'#1b1b1b',fh:1,ht:1,bd:1},1);const lb=o.m.children.find(c=>c.isSprite);PL.remove(o.m);PL.add(no);no.position.copy(o.m.position);no.rotation.y=o.m.rotation.y;if(lb)no.add(lb);o.m=no;g.flash='🔄 JERSEY SWAP';g.ft=1.4}
 if(t>2.2&&t<3.2){arms(L.pm,1.1);arms(o.m,1.1)}
 if(t>=3.3){L.js=null;o.x=ox;o.z=oz;arms(L.pm,0);arms(o.m,0);talk('mate',o.n,'Good game, bro. That one is going on my wall.','happy',[['Respect 🤝','ovHide()']],'Jersey swap! Added to your collection. Fans +.')}}
// ===================== throwing style: swipe, slingshot, or both =====================
const THN={both:'Swipe + slingshot',swipe:'Swipe only',sling:'Slingshot only'};
function thmT(){S.thm=S.thm=='swipe'?'sling':S.thm=='sling'?'both':'swipe';save()}
// ===================== your girlfriend comes to watch when her team has a bye that week =====================
function gfBye(){try{const gf=S&&S.gf;if(!gf||!gf.team)return false;const st=S.stage;if(st!='col'&&st!='pro')return false;if(gf.grad)return (S.wk||0)%2==0;const T=S.T,i=T.findIndex(t=>t.n==gf.team||tn(t)==gf.team);if(i<=0)return false;const W=st=='col'?S.csch:S.psch;if(!Array.isArray(W)||!W[S.wk])return false;return !W[S.wk].some(p=>p[0]==i||p[1]==i)}catch(e){return false}}
function gfwRes(w){if(!g||!g.gfw||!S.gf)return '';if(!g.gfwD){g.gfwD=1;S.gf.aff=cl((S.gf.aff||50)+(w?4:2),0,100)}return '<p>❤️ '+S.gf.n.split(' ')[0]+' came to watch you (her team had a bye this week). Affection +'+(w?4:2)+'</p>'}
// ===================== college cheerleaders have a class year, graduate, and some go pro =====================
const GCL=['Freshman','Sophomore','Junior','Senior'];
function gfTeamTxt(gf){if(gf.cls==null&&!gf.grad&&!gf.pro&&(gf.age||30)<=22)gf.cls=Math.min(4,Math.max(1,(gf.age||19)-18));if(gf.grad)return 'graduated'+(gf.job?' · '+gf.job:'');if(gf.cls)return gf.team+' cheer squad · '+GCL[Math.min(4,gf.cls)-1];return gf.team+' cheer squad'}
function gfYear(){try{const gf=S.gf;if(!gf)return;gfTeamTxt(gf);gf.age=(gf.age||20)+1;if(!gf.cls||gf.grad||gf.pro)return;gf.cls++;if(gf.cls<=4){S.fmsg=(S.fmsg?S.fmsg+' ':'')+'❤️ '+gf.n.split(' ')[0]+' is a '+GCL[gf.cls-1].toLowerCase()+' now.';return}
 if(R()<.35&&S.pro&&S.pro.length){const t=S.pro[ri(0,S.pro.length-1)];gf.team=tn(t);gf.pro=1;gf.cls=0;S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🎓 '+gf.n.split(' ')[0]+' graduated and made the '+tn(t)+' cheer squad!'}
 else{gf.grad=1;gf.cls=0;gf.job=['nursing','teaching','marketing','real estate','her own business','grad school'][ri(0,5)];S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🎓 '+gf.n.split(' ')[0]+' graduated! She is starting in '+gf.job+' and can come to more of your games now.'}}catch(e){}}
// ===================== GOAT list: counterpart names + career records =====================
const GREC={'Tim Brody':'251-82','Joe Montana':'117-47','Peyton Manning':'186-79','Ricky MaClones':'97-31','John Elway':'148-82-1','Drew Brees':'172-114','Eric Rodney':'164-94-1','Brett Favre':'186-112','Roger Staubach':'85-29','Matty Gafford':'121-119-1','Dan Marino':'147-93','Troy Aikman':'94-71','Terry Bradshaw':'107-51','Bart Starr':'94-57-6','Steve Young':'94-49','Kurt Warner':'67-49','Ben Roethlisberger':'165-81-1','Jim Kelly':'101-59','Lamarcus Action':'77-32','Jarsh Fallon':'90-39','Eli Manning':'117-117','Russell Wilson':'121-80-1','Warren Moon':'102-101','Philip Rivers':'134-109'};
const recAdd=(r,w,l)=>{const p=String(r||'0-0').split('-').map(Number);return (p[0]+w)+'-'+(p[1]+l)+(p[2]?'-'+p[2]:'')};
function myRec(){let w=0,l=0;(S.hist||[]).forEach(h=>{if(String(h.y)[0]=='P'){w+=h.w||0;l+=h.l||0}});if(S.stage=='pro'&&S.ss){w+=S.ss.w||0;l+=S.ss.l||0}return w+l?w+'-'+l:''}
function cpuRecOf(x){const b=GREC[x.n];if(!b&&!(x.cw||x.cl))return '';return recAdd(b,x.cw||0,x.cl||0)}
function qbWL(a,b,s){try{if(S.stage!='pro'||!s)return;[a,b].forEach((t,j)=>{if(!t)return;const q=rost('h.'+t)[0];if(!q)return;const won=j==0?s[0]>s[1]:s[1]>s[0];if(won)q.cw=(q.cw||0)+1;else q.cl=(q.cl||0)+1})}catch(e){}}
function goatFix(B){const by={};B.forEach(x=>{if(!x.cpu&&!x.me){by[x.n]=x;if(GREC[x.n]&&x.pos=='QB')x.rec=GREC[x.n]}});return B}
// ===================== high school locker room: state title count, Player of the Year plaques, championship banners =====================
function lrHon(R3){try{const A=S.aw||[],yr=a=>{const m=String(a).match(/^Year (\d+):/);return m?(S.y0||2022)+(+m[1])-1:''},st=A.filter(a=>/^Year \d+: State Champions/.test(a)),dv=A.filter(a=>/^Year \d+: Division Champions/.test(a)),py=A.filter(a=>/^Year \d+: .*Player of the Year/.test(a));
 const tex=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);return new T3.CanvasTexture(c)},wall=(t,w,h,y,z)=>{const m=new T3.Mesh(new T3.PlaneGeometry(w,h),new T3.MeshBasicMaterial({map:t,transparent:true}));m.position.set(-19.55,y,z);m.rotation.y=Math.PI/2;R3.add(m)},T=S.T[0]||{},c1=T.c1||'#1d2533',c2=T.c2||'#ffffff';
 const fit=(x,s,f,mw,y,col)=>{let n=f;x.font='900 '+n+'px Impact,"Arial Black",sans-serif';while(n>10&&x.measureText(s).width>mw){n-=2;x.font='900 '+n+'px Impact,"Arial Black",sans-serif'}x.fillStyle=col;x.textAlign='center';x.fillText(s,x.canvas.width/2,y)};
 {const s=lbl('STATE TITLES: '+st.length,'#ffe93b');s.position.set(-18.9,4.95,-7.45);s.scale.set(3.4,.85,1);R3.add(s)}
 // banners (state titles gold, division titles in school colors) high on the wall
 [...st.map(a=>['STATE CHAMPIONS',yr(a),'#e0b23a','#111']),...dv.map(a=>['DIVISION CHAMPS',yr(a),c1,c2])].slice(0,8).forEach(([t1,y,bg,fg],k)=>{wall(tex(128,256,(x,w,h)=>{x.fillStyle=bg;x.beginPath();x.moveTo(0,0);x.lineTo(w,0);x.lineTo(w,h*.82);x.lineTo(w/2,h);x.lineTo(0,h*.82);x.closePath();x.fill();x.fillStyle=fg;fit(x,String(y),48,w-14,70,fg);fit(x,t1.split(' ')[0],26,w-14,130,fg);fit(x,t1.split(' ')[1]||'',26,w-14,164,fg)}),1,2,5.4,1.3-k*1.1)});
 // Player of the Year plaques
 py.slice(0,6).forEach((a,k)=>{const nat=/National/.test(a);wall(tex(256,170,(x,w,h)=>{x.fillStyle='#5b3a1e';x.fillRect(0,0,w,h);x.fillStyle=nat?'#e8e8e8':'#d6a93a';x.fillRect(14,14,w-28,h-28);fit(x,nat?'NATIONAL':'STATE',30,w-40,58,'#1a1a1a');fit(x,'PLAYER OF THE YEAR',24,w-40,92,'#1a1a1a');fit(x,yr(a)+' · '+S.name,22,w-40,130,'#1a1a1a')}),1.55,1.03,3.05,1.1-k*1.7)})}catch(e){}}
// ===================== redshirts =====================
function rsChk(){try{if(S.stage!='col'||(S.wk||0)>0||S.rsU||S.rsA===S.cy||S.cdone||isStarter())return;if((S.sq||0)-qo(S.q)<6)return;S.rsA=S.cy;
 talk('coach',CNM(),`Here is the plan: we are going to redshirt you this season. You practice with the team, lift, learn the playbook, and you can still play in up to 4 games. You keep all your eligibility, so you get an extra year (5 seasons) and come back stronger.`,'smug',[['Take the redshirt','rsTake()'],['I want to compete for the job','rsNo()']])}catch(e){}}
function rsTake(){S.rs=S.cy;S.rsU=1;ovHide();HM='🔴 Redshirt year. You can still play up to 4 games without losing it.';save();hub()}
function rsNo(){ovHide();HM='You turned down the redshirt. Compete for the job in practice.';save();hub()}
function rsYear(){if(S.rs!==S.cy)return;if((S.ss&&S.ss.g||0)>4){S.rsU=0;S.rs=null;S.fmsg=(S.fmsg?S.fmsg+' ':'')+'Your redshirt was burned: you played more than 4 games.';return}for(const k in S.q)S.q[k]=cl(S.q[k]+2,30,99);S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🔴 Redshirt year done: +2 to every rating from a year of development. You still have 4 seasons to play.'}
const rsLbl=()=>S.rsU&&S.cy>(S.rs||9)?'RS '+(['Fr','So','Jr','Sr'][Math.min(4,S.cy-1)-1]||''):'';
const OV_open=()=>{const o=document.querySelector('#ov');return !!(o&&o.style.display!='none'&&o.innerHTML)};
// college freshman / senior ratings for the named prospects (your numbers), everyone else scaled from his pro rookie rating
const NPXC={'Jeremy Smothers':[85,99,99],'Archer Manling':[76,90,94],'Darnold Mansion':[78,93,93],'Juan MaDeer':[71,86,87],'Bruce Undertree':[70,85,86]};
function npxCol(p){const o=NPXC[p.n];if(o){const r=rng((S.seed||1)*31+hsh(String(p.n)))();return[o[0],o[1]+Math.round(r*(o[2]-o[1]))]}const sr=cl(Math.round(85+(p.T-70)*.9+(p.gen?4:0)),72,99);return[sr-(p.gen?14:15),sr]}
