s=open('g2.js').read()
rep=[
(" win:['{T} beat {O}, {S}','{T} improve to {W}-{L} with a win over {O}','{LN} and {T} handle {O}, {S}'],"," win:['{T} beat {O}, {S}','{T} improve to {W}-{L_} with a win over {O}','{LN} and {T} handle {O}, {S}'],"),
(" loss:['{O} beat {T}, {S2}','{T} fall to {W}-{L} after a loss to {O}','{LN}: {L} as {T} lose to {O}'],"," loss:['{O} beat {T}, {S2}','{T} fall to {W}-{L_} after a loss to {O}','{LN}: {L} as {T} lose to {O}'],"),
("const h=gpT('hl.'+cat,GHL[cat],{...fv,L:v.L}).replace('{L_}',e.L);C.hl=h;","const h=gpT('hl.'+cat,GHL[cat],v);C.hl=h;"),
("return{N:S.name,LN:S.name.split(' ').pop(),","const pl=(n,w)=>n+' '+w+(n==1?'':'s');return{picks:pl(s.int||0,'pick'),ints:pl(s.int||0,'interception'),tds:pl(s.td||0,'touchdown'),N:S.name,LN:S.name.split(' ').pop(),"),
(" gpLeague(C);G.cy=C}"," gpLeague(C);C.g=1;G.cy=C}"),
("function gpQ(sh,seg,now){const G=gpS();seg.sh=sh;if(now!==false&&G.cy){G.cy.segs.unshift(seg);G.cy.n=++G.n}else (G.nw=G.nw||[]).push(seg)}",
 "function gpQ(sh,seg,now){const G=gpS();seg.sh=sh;if(now===false){(G.nw=G.nw||[]).push(seg);return}if(G.cy&&!G.cy.end&&G.cy.segs.length<9){G.cy.segs.unshift(seg);G.cy.n=++G.n}else G.cy={n:++G.n,w:gpW(),segs:[seg],hl:seg.tt}}"),
(" if(G.on&&st!='hs'&&!G.lg)gpLegends();"," if(G.on&&st!='hs'&&!G.lg&&e.p)gpLegends();"),
]
for a,b in rep:
  assert s.count(a)==1,a[:70];s=s.replace(a,b)
open('g2.js','w').write(s)

s=open('g2b.js').read()
rep=[
(" out.slice(0,2).forEach(h=>gpHL(h,'n',0,1));C.lg=out.slice(0,2)}"," if(gpS().n%3==0&&out[0])gpHL(out[0],'n',0,1);C.lg=out.slice(0,2)}"),
("'Ladies and gentlemen... {td} touchdowns! This young man is SPECIAL, and I have been telling you!'","'Ladies and gentlemen... {tds}! This young man is SPECIAL, and I have been telling you!'"),
("grudge:['Fine. FINE. {td} touchdowns against {O}, I\\'ll give him that.","grudge:['Fine. FINE. {tds} against {O}, I\\'ll give him that."),
("'{int} picks? Yes. Ugly? Absolutely. Am I worried about {N}? NOT AT ALL.'","'{picks}? Yes. Ugly? Absolutely. Am I worried about {N}? NOT AT ALL.'"),
("'{int} interceptions, and people want to put this guy in the conversation? Please.'","'{ints}, and people want to put this guy in the conversation? Please.'"),
("bad:['Should we be worried about {N}?','{int} picks against {O}: problem or blip?','Who is the real {LN}?']","bad:['Should we be worried about {N}?','{picks} against {O}: problem or blip?','Who is the real {LN}?']"),
("+r[1].charAt(0).toLowerCase()+r[1].slice(1);ln.push(r)}","+r[1];ln.push(r)}"),
("let t=gpT(key,arr,v);const sg=gpSigShort(id);if(sg&&Math.random()<.35)t+=' '+sg;","let t=gpT(key,arr,v);const sg=gpSigShort(id),G_=gpS();if(sg&&/grudge|rip|mneg|contra|ttll|rvl/.test(useSpec?spec:m)&&Math.random()<.3&&G_.sgl!=G_.n){G_.sgl=G_.n;t+=' '+sg}"),
]
for a,b in rep:
  assert s.count(a)==1,a[:70];s=s.replace(a,b)
a="function gpFT(e,v,cat){"
b="""const GDNP={sls:['Somebody explain to me why {N} is on the bench. EXPLAIN IT!','I will be patient. Patient! But I want to see {LN} on that field.','Sitting is part of it. Learn, then go take that job.'],skb:['Best thing for that team, honestly. He is not ready.','If he were that good, he would be playing. Simple.','The bench is a great place to learn humility.']};
function gpFT(e,v,cat){if(!e.p){const a=gpOv('sls')>=50?gpT('dnp.s',GDNP.sls,v):'I am not losing sleep over {N} sitting. Show me something first.'.replace('{N}',v.N),b=gpT('dnp.b',GDNP.skb,v);return{sh:'ft',tt:gpF(gpPick(['When does {N} get his shot?','{T} played without him. Now what for {LN}?','Is the bench the best thing for {N} right now?']),v),ln:[['sls',a,'angry'],['skb',b,'smug']]}}"""
assert s.count(a)==1;s=s.replace(a,b)
a="if(!nate.length)nate.push('{cmp} of {att} for {yds}. Efficient, nothing forced. That is a quarterback taking what the defense gives him.');"
b="if(s.yds>=300)nate.push('{yds} passing yards. He is hitting the intermediate window over and over, the hardest throw in football.');if(s.rtd)nate.push('He scored with his legs too. When the read says keep it, he keeps it.');if(!nate.length)nate.push(...['{cmp} of {att} for {yds}. Efficient, nothing forced. That is a quarterback taking what the defense gives him.','{cmp} of {att} for {yds}. Nothing flashy. He took the checkdowns when they were there and protected the football.','Quiet tape: {cmp} of {att}, {yds} yards. He managed it. The question is what happens when he has to win it.']);"
assert s.count(a)==1;s=s.replace(a,b)
a="cal.push(e.mo>=lvA+6?'Fair question: {T} are loaded around him. How much of this is {LN} and how much is the supporting cast?':e.mo<=lvA-4?'People forget {T} are rated {mo}. He is elevating that whole group.':'{T} are {W}-{L_}. Season so far: {tyd} yards, {ttd} touchdowns, {tint} interceptions.');"
b="cal.push(...(e.mo>=lvA+6?['Fair question: {T} are loaded around him. How much of this is {LN} and how much is the supporting cast?','That roster is a {mo}. Talent everywhere. I want to see {LN} carry it on a night the cast is off.']:e.mo<=lvA-4?['People forget {T} are rated {mo}. He is elevating that whole group.','Watch who he is throwing to. That is not a loaded roster, and he is making it work.']:['{T} are {W}-{L_}. Season so far: {tyd} yards, {ttd} touchdowns, {tint} interceptions.','Season line: {tyd} yards, {ttd} touchdowns, {tint} picks, and {T} sit at {W}-{L_}.']));"
assert s.count(a)==1;s=s.replace(a,b)
a="return{sh:'mm',tt:'Put your money where your mouth is',ln:[[other,gpF('{who}, back in {w} you said: \"{q}\" Still standing by that?',{who:gpP(p.by).n.split(' ')[0],w:p.w.split(' · ').slice(0,2).join(' · '),q:p.q}),'smug'],"
b="return{sh:'mm',tt:'Put your money where your mouth is',ln:[[other,gpF('{who}, {w} you said: \"{q}.\" Still standing by that?',{who:gpP(p.by).n.split(' ')[0],w:p.yr==yrN()?'earlier this season':'back in '+p.w.split(' · ').slice(0,2).join(' · '),q:p.q.replace(/[.!]+$/,'')}),'smug'],"
assert s.count(a)==1;s=s.replace(a,b)
open('g2b.js','w').write(s)

s=open('g1.js').read()
a="Object.keys(GPA).forEach(id=>{const p=GPA[id],o=G.op[id];if(!o)return;const r=.22*(1-p.st)*imp,mv=(d,E,i)=>{o[d]=cl(o[d]+(E-o[d])*r*p.w[i],5,98)};\n if(e.p){mv('t',P,0);"
b="Object.keys(GPA).forEach(id=>{const p=GPA[id],o=G.op[id];if(!o)return;const r=.22*(1-p.st)*imp,mv=(d,E,i)=>{o[d]=cl(o[d]+(E-o[d])*r*p.w[i],5,98)};\n if(e.p){mv('t',cl(P+gpLens(id,e),5,99),0);"
assert s.count(a)==1;s=s.replace(a,b)
s+="""// each analyst reads the same game differently
function gpLens(id,e){const s=e.st||{},at=Math.max(1,s.att||0),pct=(s.cmp||0)/at*100,ypa=(s.yds||0)/at,lva=(S.stage||'hs')=='pro'?75:68;
 switch(id){case 'skb':return -8+(e.od<0?e.od*.6:0)-((S.pop||40)>70?5:0);case 'sls':return (e.big?6:0)+(e.w?4:-7);case 'nrt':return cl((pct-62)*.6+(ypa-7)*2.5-(s.int||0)*3+(s.td||0),-15,15);case 'csv':return cl((lva-e.mo)*.6,-10,10);
 case 'dk':return cl(-(s.sk||0)*2+(pct-62)*.4+2,-12,10);case 'ice':return (e.w?7:-11)+(e.big&&e.w?8:0);case 'ham':return cl(-(s.int||0)*5+((s.sk||0)<=1?4:-(s.sk||0)*1.5)+3,-14,8);case 'bth':return ((S.trust||50)-50)*.2+(e.w?3:-3);case 'slk':return cl((ypa-7)*3.5+(pct-62)*.3,-12,12)}return 0}
"""
open('g1.js','w').write(s)

s=open('g3.js').read()
a="function gpPred(by,k,q,a,pos){const G=gpS();if(G.pr.some(p=>p.k==k&&p.yr==yrN()&&p.by==by&&p.r==null))return;"
b="function gpPred(by,k,q,a,pos){const G=gpS();if(G.pr.some(p=>p.k==k&&p.yr==yrN()&&p.by==by&&p.r==null))return;if(k=='rd'||k=='dest'||k=='bust')G.pr=G.pr.filter(p=>!(p.k==k&&p.by==by&&p.r==null));"
assert s.count(a)==1;s=s.replace(a,b)
a="if(wr.length)gpQ('mm',{tt:'Missed it',ln:wr.slice(0,2).map(p=>[p.by==='skb'?'sls':'skb',gpP(p.by).n.split(' ')[0]+' said \"'+p.q+'\". Swing and a miss.','smug'])});return out}"
b="if(wr.length)gpQ('mm',{tt:'Missed it',ln:wr.slice(0,2).map(p=>[p.by==='skb'?'sls':'skb',gpP(p.by).n.split(' ')[0]+' said \"'+p.q.replace(/[.!]+$/,'')+'.\" Swing and a miss.','smug'])});return out}"
assert s.count(a)==1;s=s.replace(a,b)
a="rt.length)gpQ('ity',{tt:'I Told You So',ln:rt.slice(0,2).map(p=>[p.by,'I said \"'+p.q+'\" and here we are.','happy'])});"
b="rt.length)gpQ('ity',{tt:'I Told You So',ln:rt.slice(0,2).map(p=>[p.by,gpPick(['I said \"'+p.q.replace(/[.!]+$/,'')+'.\" And here we are.','Called it: \"'+p.q.replace(/[.!]+$/,'')+'.\" Check the tape.','Write it down next to my name: \"'+p.q.replace(/[.!]+$/,'')+'.\"']),'happy'])});"
assert s.count(a)==1;s=s.replace(a,b)
a=" const ss=S.ss||{},host={hs:'dp',col:'kh',pro:'sr'}[st]||'sr',fan=Object.keys(GPA).filter(id=>G.op[id]).sort((a,b)=>gpOv(b)-gpOv(a)),ln=[[host,gpF('{N} season in review: {g} games, {L}. '+(aw.length?'Hardware: '+aw.join(', ')+'.':'No major awards this time.'),{N,g:ss.g||0,L:gpLine(ss)}),'smug']];\n if(G.on&&fan.length){ln.push([fan[0],gpPick(['That is a special season. I will hear no arguments.','Up, up, up. That is the only direction for this kid.']),'happy']);const cr=fan[fan.length-1];if(gpOv(cr)<55)ln.push([cr,gpPick(['Good season. Not great. I am still waiting.','The numbers were fine. I want more when it counts.']),'smug'])}"
b=" const ss=S.ss||{},host={hs:'dp',col:'kh',pro:'sr'}[st]||'sr',fan=Object.keys(GPA).filter(id=>G.op[id]).sort((a,b)=>gpOv(b)-gpOv(a)),gs=S.gs||[],ag=gs.length?avg(gs):0,good=ag>=72||aw.some(a=>/Heisman Trophy|MVP|Player of the Year|Rookie of the Year|All-/.test(a)),ln=[];\n if(!ss.g)ln.push([host,gpF('{N} did not take a meaningful snap this season. '+(aw.length?'The team still brought home: '+aw.join(', ')+'.':'Next year is a big one.'),{N}),'sad']);else ln.push([host,gpF('{N} season in review: {g} games, {L}. '+(aw.length?'Hardware: '+aw.join(', ')+'.':'No major awards this time.'),{N,g:ss.g,L:gpLine(ss)}),'smug']);\n if(G.on&&fan.length&&ss.g){if(good)ln.push([fan[0],gpPick(['That is a special season. I will hear no arguments.','Up, up, up. That is the only direction for this kid.','You want a résumé? There it is.']),'happy']);else ln.push([fan[0],gpPick(['Not his best year. I still believe in the talent.','Some growing pains. That happens. Next year matters.']),'smug']);const cr=fan[fan.length-1];if(gpOv(cr)<55)ln.push([cr,good?gpPick(['Good season. Not great. I am still waiting.','The numbers were fine. I want more when it counts.']):gpPick(['That season told you everything. I have been saying it.','Ordinary. That is the word for that season. Ordinary.']),'smug'])}"
assert s.count(a)==1;s=s.replace(a,b)
a=" gpQ('bn',{tt:'Season in review: '+N,ln:ln.slice(0,2),mo:ln.slice(2)});gpSnap()}catch(e){"
b=" gpQ('bn',{tt:'Season in review: '+N,ln:ln.slice(0,2),mo:ln.slice(2)});gpSnap();if(G.cy)G.cy.end=1}catch(e){"
assert s.count(a)==1;s=s.replace(a,b)
a="function gpSigRes(id,s,d){const P_=gpP(id),N=S.name,LN=N.split(' ').pop(),host={hs:'dp',col:'kh',draft:'mk',pro:'sr'}[S.stage||'hs'],proved=(s.s==1&&!d.pos)||(s.s==2&&d.pos),G=gpS();"
b="function gpSigRes(id,s,d){const P_=gpP(id),N=S.name,LN=N.split(' ').pop(),host={hs:'dp',col:'kh',draft:'mk',pro:'sr'}[S.stage||'hs'],G=gpS(),k_=gpW().split(' · ').slice(0,2).join();if(G.rxk!=k_){G.rxk=k_;G.rxn=0}const show=(G.rxn=(G.rxn||0)+1)<=2,gpQ_=show?gpQ:()=>0;"
assert s.count(a)==1;s=s.replace(a,b)
s=s.replace("  gpQ('rx',{tt:'🧾 The Receipts: '+P_.n,","  gpQ_('rx',{tt:'🧾 The Receipts: '+P_.n,")
s=s.replace(" else{gpQ('ity',{tt:'I Told You So: '+P_.n,"," else{gpQ_('ity',{tt:'I Told You So: '+P_.n,")
assert s.count("gpQ_(")==2
open('g3.js','w').write(s)
print('done')
