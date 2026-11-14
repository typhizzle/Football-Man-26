
// ===================== COIN TOSS, KICKOFFS, ONSIDE KICKS, KNEEL DOWNS =====================
const KTB={pro:30,col:25,hs:20};
// where the receiving team starts (their own yard line)
function koPos(lv,noTd){const tb={pro:.6,col:.5,hs:.28}[lv]||.5,tby=KTB[lv]||25;if(R()<tb)return{y:tby,t:'touchback'};if(!noTd&&R()<.006)return{y:100,td:1,t:'returned for a TOUCHDOWN!'};const y=cl(Math.round(15+R()*15+(R()<.12?R()*24:0)),6,70);return{y,t:'returned to the '+(y>50?'opponent '+(100-y):y)}}
const scN=d=>Math.ceil(d/8);
// does the team that just scored (and still trails) need to onside it?
function koNeedOnside(d,rem,tos){if(d<=0||rem>900)return false;const sc=scN(d);if(sc>=4)return true;if(sc>=2&&rem<=390)return true;if(sc==1&&rem<=120&&tos<=1)return true;return false}

// ---- game start: bowl events (if any) → coin toss → opening kickoff ----
function gStartGo(){if(!g||g.clk>0||g.tossD||g.ot)return;g.tossD=1;g.paused=1;const b=g.bw&&BWL[g.bw];if(b&&b.pre&&!g.bwPre){g.bwPre=1;bwChain([b.pre],null,()=>gToss())}else gToss()}
function bwPreGo(){}
function gToss(){g.paused=1;ovShow(`<h2>🪙 Coin toss</h2><p>Captains meet at midfield. The ref hands you the call.</p><button onclick="gTossC(0)">Heads</button><button onclick="gTossC(1)">Tails</button>`)}
function gTossC(c){const r=R()<.5?0:1,nm=['Heads','Tails'][r];if(c==r)ovShow(`<h2>🪙 ${nm}!</h2><p>You win the toss.</p><button onclick="gTossD(1)">Receive</button><button class=g onclick="gTossD(0)">Defer (kick now, get the ball to open the 2nd half)</button>`);
 else{const recv=R()<.72?1:0;ovShow(`<h2>🪙 ${nm}.</h2><p>${g.o.n} win the toss and ${recv?'defer: you get the ball first':'take the ball'}.</p><button onclick="gTossD(${recv})">Kickoff</button>`)}}
function gTossD(recv){g.kr=recv?0:1;g._ku=g.s[0];if(recv)koToMe('Opening kickoff');else koFromMe('Opening kickoff')}
// they kick to you
function koToMe(lab,after){const k=koPos(g.lv);if(k.td){g.s[0]+=7;try{spChk('Kickoff return TD')}catch(e){}}
 const msg=k.td?'🏈 '+lab+': '+k.t+' Your team scores!':'🏈 '+lab+': '+k.t+'.';g.y=k.td?25:k.y;g.dn=1;g.tg=10;g.cr=false;g.note=msg;
 ovShow(`<h2>${lab}</h2><p>${g.o.n} kick off. ${k.td?'<b>'+k.t+'</b> Your return man takes it the distance!':'The kick is '+k.t+'.'}</p><button onclick="koGo(${k.td?1:0})">${k.td?'Kick off':'Take the field'}</button>`);g.koAf=after||null}
function koGo(td){ovHide();g.paused=0;if(td){g._ku=g.s[0]-7;return oppBall()}const f=g.koAf;g.koAf=null;if(f)return f();pre()}
// you kick to them
function koFromMe(lab){const k=koPos(g.lv,1);g.nx=k.y;g._ku=g.s[0];g.paused=0;g.note='🏈 '+lab+': '+k.t;ovHide();oppBall()}

// ---- after your score: kick deep or onside (the coach makes the call when you are way behind) ----
function kSc(){if(!g||g.ot||g.ph=='ovr')return 0;if(g._ku==null){g._ku=g.s[0];return 0}if(g.s[0]<=g._ku){g._ku=g.s[0];return 0}g._ku=g.s[0];
 const d=g.s[1]-g.s[0],rem=3600-g.clk,q4=g.clk>=2700,need=koNeedOnside(d,rem,g.to[0]||0);
 if(q4&&d>0&&scN(d)>=4){ovShow(`<h2>Onside kick</h2><p>Down ${d} in the 4th. Coach is calling the onside kick.</p><button onclick="kOn()">Line up for the onside</button>`);return 1}
 if(q4&&d>0){ovShow(`<h2>Kickoff</h2><p>Down ${d} with ${Math.floor(rem/60)}:${String(rem%60).padStart(2,'0')} left. ${need?'Coach says: <b>we need the ball back</b>. Onside it.':'Coach says: kick it deep and trust the defense.'}</p><button onclick="kOn()">Onside kick</button><button class=g onclick="kDeep()">Kick deep</button>`);return 1}
 const k=koPos(g.lv,1);g.nx=k.y;g.note=(g.note?g.note+' · ':'')+'Kickoff: '+k.t;return 0}
function kDeep(){ovHide();const k=koPos(g.lv,1);g.nx=k.y;g.note='Kickoff: '+k.t;oppBall()}
function kOn(){ovHide();if(R()<.09){g.y=45;g.dn=1;g.tg=10;g.cr=false;g.note='ONSIDE KICK RECOVERED!';g.flash='🙌 ONSIDE KICK RECOVERED!';g.ft=2.4;ovShow(`<h2>🙌 Recovered!</h2><p>Your team falls on the onside kick at your own 45.</p><button onclick="ovHide();pre()">Take the field</button>`);return}g.nx=55;g.note='Onside kick: '+g.o.n+' recover at your 45';oppBall()}

// ---- after their score: they kick to you (or onside it when they need the ball back) ----
function koOpp(r){const d=g.s[0]-g.s[1],rem=3600-g.clk,q4=g.clk>=2700;if(q4&&koNeedOnside(d,rem,g.to[1]||0)){if(R()<.09){g.nx=45;g.koOn=1;g.note=g.o.n+' recover their own onside kick!';return 1}g.y=55;g.note='Onside kick: you recover at their 45';return 0}
 const k=koPos(g.lv);if(k.td){g.s[0]+=7;g._kotd=1;g.note='Kickoff returned for a TOUCHDOWN! Your team scores.';return 0}g.y=k.y;g.note='Kickoff: '+k.t;return 0}

// ---- halftime: the team that kicked first receives ----
function cont(w){if(g.kr==null)return cont0(w);g.half=1;g._ku=g.s[0];if(g.kr==1)return koToMe('Second-half kickoff');koFromMe('Second-half kickoff')}

// ---- pro overtime starts with a coin toss and a kickoff ----
function otStart(){if(g.lv!='pro')return otStart0();g.ot=1;g.otn=0;g.ob=0;ovShow(`<h2>🪙 Overtime coin toss</h2><p>Call it.</p><button onclick="otToss(0)">Heads</button><button onclick="otToss(1)">Tails</button>`)}
function otToss(c){const r=R()<.5?0:1,win=c==r;g.otf=win?0:(R()<.85?1:0);ovShow(`<h2>🪙 ${['Heads','Tails'][r]}${win?'!':'.'}</h2><p>${win?'You win the toss and take the ball.':g.otf?g.o.n+' win the toss and take the ball.':g.o.n+' win the toss and kick to you.'}</p><button onclick="ovHide();otPoss()">Kickoff</button>`)}

// ---- kneel down: snap, take a knee ----
function kneel(){ovHide();$('#lb').style.display='none';$('#spk').style.display='none';g.tk=0;g.ph='kneel';g.knT=0;try{const P=g.pl;if(P){P.car=P.qb;P.wb=null}}catch(e){}g.msg='QB kneel'}
function knTick(dt){g.knT=(g.knT||0)+dt;const P=g.pl,t=g.knT;if(P&&P.qb){const q=P.qb,C=P.ol&&P.ol[2];if(t<.35){const f=t/.35,cy=C?C.y+.6:g.los;P.wb=[(q.x-26.5)*f,.4+Math.sin(Math.PI*f)*.5,-(cy+(q.y-cy)*f)]}else{q.kn=1;q.vx=q.vy=0;P.wb=[q.x-26.5+.25,.5,-(q.y+.2)]}}
 if(t>=1.9){if(P&&P.qb){P.qb.kn=0;P.wb=null}g.ph='pre';g.y=Math.max(1,g.y-1);g.dn++;g.tg++;g.cr=true;g.clk=Math.min(g.clk+3,QE());if(g.dn>4)return drvEnd(100-g.y,'Turnover on downs');if(chk(2))return;g.note='QB kneel';pre()}}
