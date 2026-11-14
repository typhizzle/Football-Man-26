
// ===================== RIVALRIES: trash-talk a player = a player rivalry; trash-talk their head coach = a team rivalry =====================
// non-historic rivalries end once one side wins 4 straight
function fwHc(o){const F=g.fw;if(F.hc)return talk('coach',o.n,'We are done here, son.','smug',[['OK','ovHide()']]);const win=g.s[0]>g.s[1];
 talk('coach',o.n+' · '+o.team,win?'Good game. Your offense gave us fits.':'Good game, young man. Keep your head up.',win?'smug':'happy',[['Good game, coach 🤝',"fwHcA(1)"],['🗣️ Talk trash to him',"fwHcA(2)"]])}
function fwHcA(a){const F=g.fw,o=LR.O.find(x=>x.k=='fohc');F.hc=1;if(a==1){S.trust=cl((S.trust||50)+1,0,100);save();return talk('coach',o.n,'Respect. See you next year.','happy',[['OK','ovHide()']],'Coach trust +1.')}
 const T=g.o,key=T.n;S.trv=S.trv||{};const had=!!S.trv[key];if(!had)S.trv[key]={why:'You trash-talked their head coach',w:0,l:0,st:0,y:yrN()};S.pop=cl((S.pop||40)+2,0,100);S.trust=cl((S.trust||50)-2,0,100);save();lrStat();
 talk('coach',o.n,'You just made this personal for my whole program.','angry',[['Bring it','ovHide()']],had?'The rivalry with '+key+' just got hotter.':'🔥 New TEAM rivalry: you vs '+key+'. It lasts until one side wins 4 in a row. Fans +, coach trust -2.')}
// player rivalry from trash-talking the opposing QB
function prvAdd(o){S.prv2=S.prv2||{};if(S.prv2[o.n])return 'Your rivalry with '+o.n+' just got hotter.';S.prv2[o.n]={team:o.team,w:0,l:0,st:0,y:yrN()};return '🔥 New PLAYER rivalry: you vs '+o.n+' ('+o.team+'). It lasts until one of you wins 4 in a row.'}
function prvRes(oi,w){try{const T=S.T,o=T[oi],L=rost('h.'+oi)||[],msgs=[];
 for(const n in (S.prv2||{})){if(!L.some(x=>x&&x.n==n))continue;const r=S.prv2[n];if(w){r.w++;r.st=r.st>0?r.st+1:1}else{r.l++;r.st=r.st<0?r.st-1:-1}if(Math.abs(r.st)>=4){msgs.push('Your rivalry with '+n+' is over: '+(r.st>0?'you':'he')+' won 4 straight ('+r.w+'-'+r.l+').');delete S.prv2[n]}else msgs.push('🎯 vs rival '+n+': '+(w?'you got him':'he got you')+' (series '+r.w+'-'+r.l+').')}
 const tr=(S.trv||{})[o.n];if(tr){if(w){tr.w++;tr.st=tr.st>0?tr.st+1:1}else{tr.l++;tr.st=tr.st<0?tr.st-1:-1}if(Math.abs(tr.st)>=4){msgs.push('The grudge with '+o.n+' is over: '+(tr.st>0?'you':'they')+' won 4 straight.');delete S.trv[o.n]}}
 if(msgs.length)S.fmsg=(S.fmsg?S.fmsg+' ':'')+msgs.join(' ')}catch(e){}}
// show it on the schedule / pregame
function prvTag(oi){try{const o=S.T[oi],L=rost('h.'+oi)||[],p=Object.keys(S.prv2||{}).find(n=>L.some(x=>x&&x.n==n)),t=(S.trv||{})[o.n];return (t?' · 😤 grudge match':'')+(p?' · 🎯 rival '+p:'')}catch(e){return ''}}

// ===================== TRACTOR HUNTLEY: a real two-way WR/DB (very rare: about 3 in your whole pro career) =====================
try{PKS.push([11,3,'Tractor Huntley',83,23,12,'WR/DB'])}catch(e){}
function wrdbChk(P){try{const n=(S.wrdb||0);if(n>=2)return;const r=rng((S.seed||1)*7+(S.py||S.cy||0)*13)();if(r<.18){const p=P.filter(x=>x.ovr>=78&&/WR|CB/.test(x.pos))[0];if(p){p.pos='WR/DB';S.wrdb=n+1}}}catch(e){}}
