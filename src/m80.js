// ===================== 📜 LEAGUE HISTORY: every Ultra Bowl since the first one, plus MVP / OPOY / DPOY by season =====================
// season | champion | runner-up | score | Ultra Bowl MVP | MVP | OPOY | DPOY   (teams by code; code@City = where the franchise played then)
const LGH0=`1966|GB|KC|35-10|Bart Starr|Bart Starr||
1967|GB|LV@Oakland|33-14|Bart Starr|Johnny Unitas||
1968|NYS|IND@Baltimore|16-7|Joe Namath|Earl Morrall||
1969|KC|MIN|23-7|Len Dawson|Roman Gabriel||
1970|IND@Baltimore|DAL|16-13|Chuck Howley|John Brodie||
1971|DAL|MIA|24-3|Roger Staubach|Alan Page||Alan Page
1972|MIA|WAS|14-7|Jake Scott|Larry Brown|Larry Brown|Joe Greene
1973|MIA|MIN|24-7|Larry Csonka|O.J. Simpson|O.J. Simpson|Dick Anderson
1974|PIT|MIN|16-6|Franco Harris|Ken Stabler|Ken Stabler|Joe Greene
1975|PIT|DAL|21-17|Lynn Swann|Fran Tarkenton|Fran Tarkenton|Mel Blount
1976|LV@Oakland|MIN|32-14|Fred Biletnikoff|Bert Jones|Bert Jones|Jack Lambert
1977|DAL|DEN|27-10|Randy White & Harvey Martin|Walter Payton|Walter Payton|Harvey Martin
1978|PIT|DAL|35-31|Terry Bradshaw|Terry Bradshaw|Earl Campbell|Randy Gradishar
1979|PIT|LAG|31-19|Terry Bradshaw|Earl Campbell|Earl Campbell|Lee Roy Selmon
1980|LV@Oakland|PHI|27-10|Jim Plunkett|Brian Sipe|Earl Campbell|Lester Hayes
1981|SF|CIN|26-21|Joe Montana|Ken Anderson|Ken Anderson|Lawrence Taylor
1982|WAS|MIA|27-17|John Riggins|Mark Moseley|Dan Fouts|Lawrence Taylor
1983|LV@Los Angeles|WAS|38-9|Marcus Allen|Joe Theismann|Joe Theismann|Doug Betters
1984|SF|MIA|38-16|Joe Montana|Dan Marino|Dan Marino|Kenny Easley
1985|CHI|BOS|46-10|Richard Dent|Marcus Allen|Marcus Allen|Mike Singletary
1986|NYE|DEN|39-20|Phil Simms|Lawrence Taylor|Eric Dickerson|Lawrence Taylor
1987|WAS|DEN|42-10|Doug Williams|John Elway|Jerry Rice|Reggie White
1988|SF|CIN|20-16|Jerry Rice|Boomer Esiason|Roger Craig|Mike Singletary
1989|SF|DEN|55-10|Joe Montana|Joe Montana|Joe Montana|Keith Millard
1990|NYE|BUF|20-19|Ottis Anderson|Joe Montana|Warren Moon|Bruce Smith
1991|WAS|BUF|37-24|Mark Rypien|Thurman Thomas|Thurman Thomas|Pat Swilling
1992|DAL|BUF|52-17|Troy Aikman|Steve Young|Steve Young|Cortez Kennedy
1993|DAL|BUF|30-13|Emmitt Smith|Emmitt Smith|Jerry Rice|Rod Woodson
1994|SF|LA@San Diego|49-26|Steve Young|Steve Young|Barry Sanders|Deion Sanders
1995|DAL|PIT|27-17|Larry Brown|Brett Favre|Brett Favre|Bryce Paup
1996|GB|BOS|35-21|Desmond Howard|Brett Favre|Terrell Davis|Bruce Smith
1997|DEN|GB|31-24|Terrell Davis|Brett Favre & Barry Sanders|Barry Sanders|Dana Stubblefield
1998|DEN|ATL|34-19|John Elway|Terrell Davis|Terrell Davis|Reggie White
1999|LAG@St. Louis|NSH|23-16|Kurt Warner|Kurt Warner|Marshall Faulk|Warren Sapp
2000|BAL|NYE|34-7|Ray Lewis|Marshall Faulk|Marshall Faulk|Ray Lewis
2001|BOS|LAG@St. Louis|20-17|Tim Brody|Kurt Warner|Marshall Faulk|Michael Strahan
2002|TB|LV@Oakland|48-21|Dexter Jackson|Rich Gannon|Priest Holmes|Derrick Brooks
2003|BOS|CHA|32-29|Tim Brody|Pete Manling & Steve McNair|Jamal Lewis|Ray Lewis
2004|BOS|PHI|24-21|Deion Branch|Pete Manling|Pete Manling|Ed Reed
2005|PIT|SEA|21-10|Hines Ward|Shaun Alexander|Shaun Alexander|Brian Urlacher
2006|IND|CHI|29-17|Pete Manling|LaDainian Tomlinson|LaDainian Tomlinson|Jason Taylor
2007|NYE|BOS|17-14|Eli Manning|Tim Brody|Tim Brody|Bob Sanders
2008|PIT|PHX|27-23|Santonio Holmes|Pete Manling|Drew Brees|James Harrison
2009|NO|IND|31-17|Drew Brees|Pete Manling|Chris Johnson|Charles Woodson
2010|GB|PIT|31-25|Eric Rodney|Tim Brody|Tim Brody|Troy Polamalu
2011|NYE|BOS|21-17|Eli Manning|Eric Rodney|Drew Brees|Terrell Suggs
2012|BAL|SF|34-31|Joe Flacco|Adrian Peterson|Adrian Peterson|J.J. Watt
2013|SEA|DEN|43-8|Malcolm Smith|Pete Manling|Pete Manling|Luke Kuechly
2014|BOS|SEA|28-24|Tim Brody|Eric Rodney|DeMarco Murray|J.J. Watt
2015|DEN|CHA|24-10|Von Miller|Cameron Nugent|Cameron Nugent|J.J. Watt
2016|BOS|ATL|34-28 OT|Tim Brody|Matt Ryan|Matt Ryan|Khalil Mackey
2017|PHI|BOS|41-33|Nick Foles|Tim Brody|Todd Gurley|Eric Darnold
2018|BOS|LAG|13-3|Julian Edelman|Ricky MaClones|Ricky MaClones|Eric Darnold
2019|KC|SF|31-20|Ricky MaClones|Lamarcus Action|Michael Thomas|Stephon Gilmore
2020|TB|KC|31-9|Tim Brody|Eric Rodney|Daryl Henny|Eric Darnold
2021|LAG|CIN|23-20|Cooper Cupp|Eric Rodney|Cooper Cupp|Teej Waddle
2022|KC|PHI|38-35|Ricky MaClones|Ricky MaClones|Jacob Jackson|Nate Bosen
2023|KC|SF|25-22 OT|Ricky MaClones|Lamarcus Action|Christopher McCunngingham|Meters Ferret
2024|PHI|KC|40-22|Jay-Jay Pain|Jarsh Fallon|Jaquan Barker|Matthew Curtain
2025|SEA|BOS|29-13|Kevin Sprinter|Matty Gafford|Jake Smothers-Ninja|Meters Ferret`.split('\n').map(l=>{const a=l.split('|');return{yr:+a[0],w:a[1],l:a[2],sc:a[3],sbm:a[4],mvp:a[5],opoy:a[6],dpoy:a[7]}});
const PDT=PD.split(';').flatMap(s=>s.split(':')[1].split(',').map(x=>x.split('|')));
function lhTeam(code){const m=String(code||'').split('@'),i=TA.indexOf(m[0]);if(i<0)return esc(code||'');let city=PDT[i][0],nick=PDT[i][1];
 try{const t=S&&S.pro&&S.pro[i];if(t){nick=t.n||nick;if(t.city)city=t.city}}catch(e){}if(m[1])city=m[1];return esc(city+' '+nick)}
function lhRoman(n){const R_=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];if(n==50)return '50';let s='';for(const[v,c]of R_)while(n>=v){s+=c;n-=v}return s}
// your league's seasons (recorded when the awards are handed out)
(()=>{const _a=lgAwards;lgAwards=function(){const r=_a.apply(this,arguments);try{const A=S.law&&S.law[S.py],B=S.pb;if(A&&B&&B.done&&!A.fin){const H=B.hist[B.hist.length-1]&&B.hist[B.hist.length-1][0];if(H){const[a,b,w,sa,sb]=H,lo=w==a?b:a,ws=w==a?sa:sb,ls=w==a?sb:sa;A.fin={w:tn(S.T[w]),l:tn(S.T[lo]),wc:TA[pIdx(S.T[w])]||'',lc:TA[pIdx(S.T[lo])]||'',sc:Math.max(ws,ls)+'-'+Math.min(ws,ls),me:w===0?1:lo===0?2:0}}save()}}catch(e){}return r}})();
function lhLeague(){const out=[];try{for(const k in (S.law||{})){const A=S.law[k];if(!A||!A.yr)continue;const W=A.w||{},nm=x=>x?(x.me?'▶ '+x.n:x.n):'';out.push({yr:A.yr,mine:1,fin:A.fin,sbm:nm(W.SBMVP),mvp:nm(W.MVP),opoy:nm(W.OPOY),dpoy:nm(W.DPOY)})}}catch(e){}return out.sort((a,b)=>a.yr-b.yr)}
let LHV={v:'sb',q:''};
function lhV(v){if(v)LHV.v=v;const last=LGH0[LGH0.length-1].yr,L=lhLeague().filter(x=>x.yr>last),rows=[];
 LGH0.forEach(x=>rows.push({yr:x.yr,n:x.yr-1965,wk:x.w.split('@')[0],lk:x.l.split('@')[0],W:lhTeam(x.w),Lo:lhTeam(x.l),sc:x.sc,sbm:x.sbm,mvp:x.mvp,opoy:x.opoy,dpoy:x.dpoy}));
 L.forEach(x=>rows.push({yr:x.yr,n:x.yr-1965,wk:x.fin&&(x.fin.wc||x.fin.w),lk:x.fin&&(x.fin.lc||x.fin.l),W:x.fin?esc(x.fin.w):'—',Lo:x.fin?esc(x.fin.l):'—',sc:x.fin?x.fin.sc:'',sbm:x.sbm,mvp:x.mvp,opoy:x.opoy,dpoy:x.dpoy,mine:1,me:x.fin&&x.fin.me}));
 const q=LHV.q.trim().toLowerCase(),f=r=>!q||[r.W,r.Lo,r.sbm,r.mvp,r.opoy,r.dpoy,String(r.yr)].join(' ').toLowerCase().includes(q),R2=rows.filter(f).reverse();
 const nm=s=>s?esc(s).replace(/^▶ (.*)$/,'<b style="color:#ffe93b">▶ $1</b>'):'<small>—</small>';
 const tabs=[['sb','🏆 Ultra Bowls'],['aw','🏅 Awards'],['tm','📊 Titles by team']].map(([k,t])=>`<button class="${LHV.v==k?'':'g'}" style="flex:1" onclick="lhV('${k}')">${t}</button>`).join('');
 let body='';
 if(LHV.v=='sb')body=R2.map(r=>`<div class=card style="text-align:left;${r.mine?'border:1px solid #ffe93b55':''}"><small>${r.yr} season · Ultra Bowl ${lhRoman(r.n)}${r.mine?' · your league':''}</small><br>${r.W=='—'?'<small>Final not recorded (played before this update)</small>':`<b>${r.me==1?'▶ ':''}${r.W}</b> ${r.sc?esc(r.sc):''} <small>over</small> ${r.me==2?'▶ ':''}${r.Lo}`}<br><small>Ultra Bowl MVP:</small> ${nm(r.sbm)}</div>`).join('');
 else if(LHV.v=='aw')body=`<div class=card style="text-align:left;overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:14px"><tr><th align=left>Yr</th><th align=left>MVP</th><th align=left>Off. POY</th><th align=left>Def. POY</th></tr>${R2.map(r=>`<tr style="border-top:1px solid #ffffff22${r.mine?';background:#ffe93b12':''}"><td>${r.yr}</td><td>${nm(r.mvp)}</td><td>${nm(r.opoy)}</td><td>${nm(r.dpoy)}</td></tr>`).join('')}</table></div>`;
 else{const M={};rows.forEach(r=>{if(!r.wk)return;const kw=TA.includes(r.wk)?lhTeam(r.wk):esc(r.wk),kl=TA.includes(r.lk)?lhTeam(r.lk):esc(r.lk);(M[kw]=M[kw]||{w:0,l:0,y:[]}).w++;M[kw].y.push(r.yr);(M[kl]=M[kl]||{w:0,l:0,y:[]}).l++});
  body=`<div class=card style="text-align:left">${Object.entries(M).sort((a,b)=>b[1].w-a[1].w||b[1].l-a[1].l).map(([n,c])=>`<div class=row style="font-size:15px;gap:6px;align-items:flex-start"><span style="min-width:0"><b>${n}</b><br><small>${c.y.sort((a,b)=>a-b).join(', ')||'no titles yet'}</small></span><span style="flex:none">🏆 ${c.w} · ${c.l} lost</span></div>`).join('')}</div>`}
 ui.innerHTML=`<div><h2>📜 League history</h2><p><small>Every Ultra Bowl and every MVP, Offensive and Defensive Player of the Year back to the first season, then the seasons played in your league.</small></p><div class=row style="gap:6px">${tabs}</div>
 <input id=lhq placeholder="Search a team, player or year" value="${esc(LHV.q)}" style="width:100%;font-size:16px;margin:6px 0" oninput="LHV.q=this.value;clearTimeout(window.__lht);window.__lht=setTimeout(()=>{lhV();const e=document.getElementById('lhq');if(e){e.focus();e.setSelectionRange(e.value.length,e.value.length)}},250)">
 ${body||'<p>No matches.</p>'}<button class=g onclick="recV()">🏆 Record book</button><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
