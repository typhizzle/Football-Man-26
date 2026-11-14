s=open('g1.js').read()
a=" mv('l',cl((e.w?72:38)+(e.cb?15:0)+((S.trust||50)-50)*.3+(e.p?0:-6),10,95),2);\n if(Math.abs(e.m)<=8||e.big||e.ttl){mv('k',"
b=" if(e.p)mv('l',cl((e.w?72:38)+(e.cb?15:0)+((S.trust||50)-50)*.3,10,95),2);\n if(e.p&&(Math.abs(e.m)<=8||e.big||e.ttl)){mv('k',"
assert s.count(a)==1;s=s.replace(a,b);open('g1.js','w').write(s)
s=open('g2.js').read()
rep=[("mom=prev==null?'new to the board':prev>nr?'▲ up '+(prev-nr)+' spots':prev<nr?'▼ down '+(nr-prev):'holding steady';","mom=prev==null?'new to the board':prev>nr?'▲ up '+(prev-nr)+(prev-nr==1?' spot':' spots'):prev<nr?'▼ down '+(nr-prev)+(nr-prev==1?' spot':' spots'):'holding steady';"),
(" if(G.on||S.stage!='hs'){gpHL(h,'n',1,e.ttl?3:e.big||cat=='mon'||cat=='cbw'?2:1)}"," G.dnp=e.p?0:(G.dnp||0)+1;if((G.on||S.stage!='hs')&&(e.p||e.big||e.ttl)){gpHL(h,'n',1,e.ttl?3:e.big||cat=='mon'||cat=='cbw'?2:1)}"),
("if(G.on){C.segs.push(gpFT(e,v,cat));if(e.p)C.segs.push(gpFR(e,v));if(G.lg)C.segs.push(gpLG(e,v));","if(G.on){C.segs.push(!e.p&&G.dnp>=2&&Math.random()<.6?gpFTL():gpFT(e,v,cat));if(e.p)C.segs.push(gpFR(e,v));if(G.lg&&e.p)C.segs.push(gpLG(e,v));"),
(" if(st=='col'){const hs=e.k=='col'&&S.wk>=4?heisman():null,ln=[['kh',gpF('{T} ({W}-{L2}) '+(e.w?'beat':'fall to')+' {RO}, {S}. {LN}: {L}.'+(e.mrk&&e.mrk<=25?' They are No. {mrk} in our poll.':''),{...v,W:e.W,L2:e.L}),e.w?'happy':'sad']];",
 " if(st=='col'){const hs=e.k=='col'&&S.wk>=4?heisman():null,ln=[['kh',gpF(e.big?'{G}: {T} '+(e.w?'beat':'fall to')+' {RO}, {S}. {LN}: {L}.':'{T} ({W}-{L2}) '+(e.w?'beat':'fall to')+' {RO}, {S}. {LN}: {L}.'+(e.mrk&&e.mrk<=25?' They are No. {mrk} in our poll.':''),{...v,W:e.W,L2:e.L}),e.w?'happy':'sad']];"),
(",ln=[['sr',gpF('{T} are {W}-{L2} after '+(e.w?'beating':'losing to')+' {O}, {S}. {LN}: {L}.',{...v,W:e.W,L2:e.L}),e.w?'happy':'sad']];",",ln=[['sr',gpF(e.big?'{G}: {T} '+(e.w?'beat':'fall to')+' {O}, {S}. {LN}: {L}.':'{T} are {W}-{L2} after '+(e.w?'beating':'losing to')+' {O}, {S}. {LN}: {L}.',{...v,W:e.W,L2:e.L}),e.w?'happy':'sad']];"),
]
for a,b in rep:
  assert s.count(a)==1,a[:70];s=s.replace(a,b)
open('g2.js','w').write(s)
s=open('g2b.js').read()
a="bad:['Should we be worried about {N}?','{picks} against {O}: problem or blip?','Who is the real {LN}?']"
b="bad:['Should we be worried about {N}?','{T} lose to {O}: how much of it is on {LN}?','Who is the real {LN}?'],badi:['{picks} against {O}: problem or blip?','Turnover trouble for {N}?']"
assert s.count(a)==1;s=s.replace(a,b)
a="const spec=cat=='ttlw'?'ttlw':cat=='ttll'?'ttll':cat=='cbw'?'cb':cat=='rvw'?'rvw':cat=='rvl'?'rvl':null,q=gpT('ftq.'+(spec||val),GFQ[spec||val],v),"
b="const spec=cat=='ttlw'?'ttlw':cat=='ttll'?'ttll':cat=='cbw'?'cb':cat=='rvw'?'rvw':cat=='rvl'?'rvl':null,qk=spec||(val=='bad'&&e.st.int>=2?'badi':val),q=gpT('ftq.'+qk,GFQ[qk],v),"
assert s.count(a)==1;s=s.replace(a,b)
s+="""// when you are not playing, First Take argues about the rest of the league
function gpFTL(){const st=S.stage||'hs',T=S.T;let i;if(st=='col'){i=rankAll().find(x=>x!=0)}else i=T.map((t,k)=>k).filter(k=>k).sort((a,b)=>(T[b].w-T[b].l)-(T[a].w-T[a].l)||T[b].ovr-T[a].ovr)[0];const t=T[i];if(!t)return gpOU();const v={team:tn(t),W:t.w,L:t.l};
 return{sh:'ft',tt:gpF(gpPick(['Are the {team} ({W}-{L}) for real?','Is anybody stopping the {team}?','{team} at {W}-{L}: contender or pretender?']),v),ln:[['sls',gpF(gpPick(['The {team} are the REAL deal. I said it in August and I am saying it now!','I do not care what anybody says, the {team} are built for January.','{W}-{L}! Stop it! That is a CONTENDER!']),v),'happy'],['skb',gpF(gpPick(['Paper tiger. Look at who they played. Wait until somebody punches back.','I am not buying the {team}. Not for one second.','{W}-{L} against that schedule? I have seen better teams lose in round one.']),v),'smug']]}}
"""
open('g2b.js','w').write(s)
s=open('g4.js').read()
a="ov=ds>=83?1:cl(Math.round(32*Math.pow((83-ds)/12,1/.55)-1),1,260);let qb=1;try{if(S.stage=='col'){const rk=rankAll().slice(0,30);qb=1+rk.filter(i=>i&&qroom(S.T[i])[0].ovr>ds+1).length}}catch(e){}return{ov,qb:Math.min(qb,15),rd:ov<=224?Math.ceil(ov/32):8,ds}}"
b="ov=ds>=83?1:cl(Math.round(32*Math.pow((83-ds)/12,1/.55)-1),1,260),qb=1+Math.floor((ov-1)/14);return{ov,qb:Math.min(qb,15),rd:ov<=224?Math.ceil(ov/32):8,ds}}"
assert s.count(a)==1;s=s.replace(a,b);open('g4.js','w').write(s)
print('ok')
