// ===================== 💰 SALARY CAP GROWTH + LEAGUE CONTRACTS =====================
// The max contract grows with time. Every 3 pro seasons it steps up: QB $70M → $75M → $80M → $85M (then it stays at $85M).
// Other positions have their own max that grows the same way.
const CAPT={QB:[70,75,80,85],WR:[45,55,65,72],TE:[22,25,28,32],RB:[25,28,31,35],OL:[32,36,40,45],EDGE:[52,58,64,70],DT:[40,45,50,55],LB:[24,27,30,33],CB:[36,40,45,50],S:[28,31,34,38],K:[8,9,10,11]};
function capGrp(p){p=String(p||'QB').toUpperCase();if(p=='DE'||p=='OLB'||p=='EDGE')return 'EDGE';if(['LT','LG','C','RG','RT','OT','OG','OL','G'].includes(p))return 'OL';if(p=='MLB'||p=='LB')return 'LB';if(p=='K'||p=='P')return 'K';return CAPT[p]?p:'WR'}
// pro seasons already played (the league "clock" for contracts)
function capN(){try{return (S.hist||[]).filter(x=>String(x.y)[0]=='P').length}catch(e){return 0}}
function capStep(n){return Math.min(3,Math.floor((n==null?capN():n)/3))}
function capMax(p,n){return CAPT[capGrp(p)][capStep(n)]}
// your market value as a QB (same scale as before, now held under the current max and growing with the cap)
function mval(){const o=qo(S.q),aw=(S.aw||[]).filter(a=>a.startsWith('Pro'));let v=o<70?1+Math.max(0,o-55)/5:o<80?5+(o-70)*2:o<90?25+(o-80)*3:55+(o-90)*1.8;v+=aw.filter(a=>a.endsWith(': MVP')).length*4+aw.filter(a=>a.includes('All-Pro')).length*1.5;if(S.age>33)v*=Math.max(.35,1-(S.age-33)*.09);v*=capMax('QB')/70;return cl(+v.toFixed(1),.75,capMax('QB'))}
function negOffer(ti,mul){const mx=capMax('QB'),v=Math.min(mx,mval()*mul),ot=(S.ctn||1)>=2&&isStar()?S.T[ti]:null,op=ot?(ot.op??(ot.op=+R().toFixed(2))):0;return{ci:ot?R()<.15+.55*op:false,gi:ot?R()<.1+.45*op:false,ti,sal:+v.toFixed(1),yrs:S.age>33?ri(1,2):ri(3,5),gtd:Math.round(55+R()*30),bonus:+(v*.4).toFixed(1),inc:+(v*.08).toFixed(1)}}
function capNext(){const n=capN(),s=capStep(n);return s>=3?'':`The QB max goes up to $${CAPT.QB[s+1]}M in ${3*(s+1)-n} season${3*(s+1)-n>1?'s':''} (top: $85M).`}

// Real-life counterpart contracts for the league's notable non-QBs (2026 season): [position, $M per year, years left including this one, note]
const PKC={
 'Will Sackerson Jr.':['EDGE',50,4,'Highest-paid non-QB ever: 3 yrs/$150M extension'],
 'Michael Parkins':['EDGE',46.5,4,'4 yrs/$186M'],
 'Jake Smothers-Ninja':['WR',42.15,6,'Highest-paid WR ever: 4 yrs/$168.6M extension'],
 'Teej Waddle':['EDGE',41,3,'3 yrs/$123M'],
 'Shamar Catch':['WR',40.25,4,'4 yrs/$161M'],
 'Mike Garrison':['EDGE',40,5,'4 yrs/$160M extension'],
 'Mac-Daddy Kelly':['EDGE',35.5,4,'3 yrs/$106.5M extension'],
 'Jacob Jackson':['WR',35,3,'4 yrs/$140M'],
 'BB Deer':['WR',34,3,'4 yrs/$136M'],
 'Saucer Garden':['CB',30.1,5,'4 yrs/$120.4M extension'],
 'Jordan Give-Itt':['WR',27.3,1,'Franchise tag (1 yr)'],
 'Nigel Ballins':['WR',24.25,2,'3 yrs/$72.75M'],
 'Jah Sawyer':['RB',22.5,4,'Top-paid RB'],
 'Dijon Mustardson':['RB',22.25,4,'3 yrs/$66.75M extension (up to $75M)'],
 'Lavante Snaggems':['WR',22,1,'2 yrs/$44M'],
 'Ned Brothers':['LB',21,3,'3 yrs/$63M extension'],
 'Jordan Cattle':['TE',19.1,4,'4 yrs/$76.4M extension'],
 'Christopher McCunngingham':['RB',19,2,'2 yrs/$38M extension'],
 'Gettin-It Running-Man':['RB',15,3,'3 yrs, up to $45M'],
 'Hooper Bol':['WR',15,2,'3 yrs/$45M'],
 'Daryl Henny':['RB',15,2,'2 yrs/$30M extension'],
 'Tay Johnson':['RB',14,1,'3 yrs/$42M'],
 'Tractor Swift':['TE',12,1,'Re-signed; works out to about 1 yr/$12M'],
 'Jameson Potts':['RB',11.5,4,'4 yrs/$46M'],
 'Tractor Huntley':['WR',11.7,3,'Rookie deal (#2 pick)'],
 'Axel Jean':['RB',9,3,'Rookie deal (#6 pick)'],
 'Eddie Bowser':['TE',4.5,2,'Rookie deal'],
 'Hooper Dalean':['CB',2.2,2,'Rookie deal'],
 'Luka Okudah':['WR',1,1,'Last year of his rookie deal (5th round)']
};
try{PKS.push([8,11,'Will Sackerson Jr.',97,25,51])}catch(e){}
// what a player would sign for on the open market right now (estimate)
function ctEst(pos,ovr,age,n){const mx=capMax(pos,n);let f=Math.pow(cl((ovr-65)/33,.02,1),1.25);if(age>31)f*=Math.max(.3,1-(age-31)*.1);return Math.max(1,+(mx*f).toFixed(1))}
function pkLive(nm){try{for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L)){const x=L.find(y=>y&&y.n==nm);if(x)return x}}}catch(e){}return null}
function pkTeam(i){try{const t=(S.pro||[]).find(t=>pIdx(t)==i);return t?tn(t):''}catch(e){return ''}}
// a player's contract this season: his real deal while it lasts, then a new deal at the market rate of the time
function lgCt(nm,pos,ovr,age,base){const n=capN();if(base&&n<base[1])return{sal:base[0],left:base[1]-n,real:1,note:base[2]||''};const st=base?base[1]:0,D=2+(nm.length%3),of=base?0:(nm.charCodeAt(0)+nm.length*7)%D,yrsIn=n-st+of,n0=Math.max(st,st+Math.floor(yrsIn/D)*D-of);const sal=ctEst(pos,ovr,age+n0,n0);return{sal,left:D-(yrsIn%D),real:0,note:base?'New deal (estimated)':'Estimated'}}
function lgCts(){const out=[],n=capN();
 (S.pro||[]).forEach(t=>{const q=QBP[pIdx(t)];if(!q||q[0]==S.name)return;const L=pkLive(q[0]),r=QBC[q[0]];const c=lgCt(q[0],'QB',L?L.ovr:q[1],q[2],r?[r[0],r[1],'']:null);out.push({n:q[0],pos:'QB',team:tn(t),...c})});
 try{QBB.forEach(b=>{if(b[0]==S.name)return;const r=PKC[b[0]];const L=pkLive(b[0]);out.push({n:b[0],pos:'QB',team:pkTeam(b[3]),...lgCt(b[0],'QB',L?L.ovr:b[1],b[2],r?[r[1],r[2],r[3]]:null)})})}catch(e){}
 PKS.forEach(q=>{const nm=q[2],b=PKC[nm],L=pkLive(nm),pos=b?b[0]:capGrp(POSL[q[1]]||'WR');const c=lgCt(nm,pos,L?L.ovr:q[3],q[4],b?[b[1],b[2],b[3]]:null);out.push({n:nm,pos,team:pkTeam(q[0]),...c})});
 if(S.stage=='pro'&&S.ct)out.push({n:S.name+' (you)',pos:'QB',team:tn(S.T[0]),sal:S.ct.sal,left:S.ct.yrs,real:1,note:'Your contract',me:1});
 return out.sort((a,b)=>b.sal-a.sal)}
let ctF='all';
function ctV(f){if(f)ctF=f;const n=capN(),all=lgCts(),L=all.filter(x=>ctF=='all'||x.pos==ctF||(ctF=='OTH'&&!['QB','WR','EDGE'].includes(x.pos)));
 const caps=Object.keys(CAPT).map(k=>`<span style="display:inline-block;min-width:92px">${k} $${capMax(k)}M</span>`).join(' ');
 const tb=[['all','All'],['QB','QB'],['WR','WR'],['EDGE','Edge'],['OTH','Others']].map(([k,l])=>`<button class="${ctF==k?'':'g'}" style="width:auto;flex:1;padding:6px" onclick="ctV('${k}')">${l}</button>`).join('');
 ui.innerHTML=`<div><h2>💰 Contracts & salary cap</h2><div class=card><b>Max contract per year right now</b><br><small>${caps}</small><br><small>Pro season ${n+1}. ${capNext()||'The max is at its top ($85M for QBs) and stays there.'}</small></div>
 <div class=row style="gap:4px">${tb}</div><div class=card>${L.map((x,i)=>`<div class=row style="font-size:15px;gap:6px${x.me?';background:#2a3b1f;border-radius:6px':''}"><span><b>${i+1}. ${esc(x.n)}</b> <small>${x.pos} · ${esc(x.team)}</small><br><small>${x.left>0?x.left+' yr'+(x.left>1?'s':'')+' left':'Contract is up after this season'}${x.note?' · '+esc(x.note):''}</small></span><b style="flex:none">$${x.sal}M</b></div>`).join('')}</div>
 <small>Real-life deals stay the same until they run out. After that the player signs a new deal at the going rate, which grows with the cap.</small><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
