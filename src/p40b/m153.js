// ===== 🎓 EVERY DRAFT PROSPECT HAS A HIGH SCHOOL + COLLEGE CAREER =====
// Tyler, 2026-11-14: "they all need stats if they're getting drafted. Therefore, you can know if they're getting
// drafted at the right spot." (He OK'd making these, for NEW players only: "Yes".)
// A draft prospect who never played in this save (every one in a career that starts in the pros, and the
// made-up names that fill a board) gets his high school and college seasons ONCE, the moment his class is
// made: numbers that fit his position and how good he is, written into the same career record as everyone
// else (S.pc, marked gen:1) and never changed after. Real players you played with keep their real seasons.
// Players who already exist are never given a made-up past.
window.HSN=['Highland','Riverside','Lincoln','Jefferson','Roosevelt','Westview','Eastside','North Valley','South Ridge','Central','Oak Grove','Cedar Creek','Lakeview','Hillcrest','Pine Bluff','Summit','Mesa Verde','Bayside','Fairview','Granite Bay','Stonebridge','Kingsway','Brookfield','Canyon','Liberty','Heritage','Mountain View','Red Oak','Willow Park','Harbor'];
window.pcGenCareer=function(p,Y,seedK){try{const R_=pcS();const r=rng(hsh(String(p.n)+'|gen|'+Y+'|'+(seedK||'')));
 const id='p'+(S.pidN=(S.pidN||0)+1);const age=p.age||22,yc=cl(age-18,3,4),q=cl(((p.ovr||60)-45)/40,0,1),pos=p.pos||'WR',G=typeof lgGrp=='function'?lgGrp(pos):pos;
 const col=p.col||((S.col||[]).flatMap(c=>c.t.map(t=>t.n))[0])||'State University',hs=HSN[Math.floor(r()*HSN.length)]+' High School';
 const line=(f,g)=>{const v=x=>Math.max(0,Math.round(x));const z={g,pc:0,pa:0,py:0,ptd:0,pint:0,car:0,ry:0,rtd:0,rec:0,recy:0,rectd:0,tkl:0,sck:0,intc:0},n=()=>.82+r()*.36;
  if(G=='QB'){z.py=v((1300+2700*q)*f*n());z.pa=v(z.py/(7.2+2*q));z.pc=v(z.pa*(.56+.12*q));z.ptd=v(z.py/(125-20*q)*n());z.pint=v(z.py/(330+220*q)*n());z.car=v(55*f*n());z.ry=v(z.car*(2+3*r()));z.rtd=v(z.car/30*n())}
  else if(G=='RB'){z.car=v((110+150*q)*f*n());z.ry=v(z.car*(4.4+1.4*q));z.rtd=v(z.ry/(95-20*q)*n());z.rec=v((12+18*q)*f*n());z.recy=v(z.rec*(7+3*r()))}
  else if(G=='WR'){z.rec=v((24+52*q)*f*n());z.recy=v(z.rec*(12.5+3.5*r()));z.rectd=v(z.recy/(150-35*q)*n())}
  else if(G=='TE'){z.rec=v((14+36*q)*f*n());z.recy=v(z.rec*(10.5+2.5*r()));z.rectd=v(z.recy/(140-30*q)*n())}
  else if(G=='DL'){z.tkl=v((20+28*q)*f*n());z.sck=v((1.5+9*q)*f*n())}
  else if(G=='LB'){z.tkl=v((40+62*q)*f*n());z.sck=v((.5+4.5*q)*f*n());z.intc=v((.2+1.6*q)*f*r()*1.6)}
  else if(G=='DB'){z.tkl=v((24+36*q)*f*n());z.intc=v((.6+4.2*q)*f*n())}
  return z};
 const e=R_.p[id]={n:p.n,pos,r:[],o:[],a:[],gen:1,v:p.ovr};
 const cy0=Y-yc,hy0=cy0-4;
 for(let k=0;k<4;k++){const f=[.45,.6,.75,.85][k]*.8;e.r.push([hy0+k,'hs',hs,k+1,...pcStat(line(f,10+Math.floor(r()*3)))])}
 e.o.push([cy0-1,'graduated',hs,col]);
 for(let k=0;k<yc;k++){const f=yc==3?[.55,.85,1][k]:[.35,.65,.9,1][k];e.r.push([cy0+k,'col',col,k+1+(yc==3?1:0),...pcStat(line(f,11+Math.floor(r()*3)))])}
 e.o.push([Y-1,'entered the draft',col,null]);
 if(q>.85)e.a.push([Y-1,'col','All-American',col]);
 return id}catch(e){return null}};
// the last college season in one short line for the draft board
window.pcSum=function(id){try{const e=S.pc&&S.pc.p&&S.pc.p[id];if(!e)return '';const c=e.r.filter(q=>q[1]==='col');if(!c.length)return '';
 const t=c.reduce((a,q)=>{q.slice(4).forEach((v,i)=>a[i]=(a[i]||0)+(v||0));return a},[]),v=i=>t[i]||0,f=x=>(x|0).toLocaleString(),p=[];
 if(v(2))p.push(f(v(3))+' pass yds, '+v(4)+' TD, '+v(5)+' INT');if(v(6)>40)p.push(f(v(7))+' rush yds, '+v(8)+' TD');if(v(9))p.push(v(9)+' rec, '+f(v(10))+' yds, '+v(11)+' TD');
 if(v(12)||v(13)||v(14))p.push(v(12)+' tkl'+(v(13)?', '+v(13)+' sacks':'')+(v(14)?', '+v(14)+' INT':''));
 return `College (${c.length} yr${c.length>1?'s':''}): `+(p.join(' · ')||c.reduce((a,q)=>a+(q[4]||0),0)+' games')}catch(e){return ''}};
window.PCBN={k:-1,m:null};
window.pcByName=function(n){try{const P=S.pc&&S.pc.p;if(!P)return null;const k=Object.keys(P).length;if(PCBN.k!==k||PCBN.s!==S){const m=new Map();for(const id in P)m.set(P[id].n,id);PCBN={k,m,s:S}}return PCBN.m.get(n)||null}catch(e){}return null};

// every later pro draft: prospects with no real record get one (after m145 put the real ones in)
(()=>{try{const _lc=lgClass;lgClass=function(Y){const out=_lc.apply(this,arguments);
 try{pcS();out.forEach(p=>{if(p.pid&&S.pc.p[p.pid])return;const id=pcGenCareer(p,Y,'lg');if(id){p.pid=id;LGPID[p.n]=id}})}catch(e){}
 return out}}catch(e){}})();
// your own draft (college -> pro): the board's leftover made-up names get one too
(()=>{try{const _d=draftStart;draftStart=function(){const was=S&&S.stage;const r=_d.apply(this,arguments);
 try{if(was==='col'&&S.dr&&Array.isArray(S.dr.P)&&!S.dr.gen){const Y=yrN();S.dr.P.forEach(p=>{if(p.me||p.pid)return;const id=pcGenCareer({n:p.n,pos:p.pos,ovr:p.ovr,age:22,col:p.sch},Y,'dr');if(id)p.pid=id});S.dr.gen=1;save()}}catch(e){}
 return r}}catch(e){}})();
// the draft board shows each pick's college career
(()=>{try{const _r=npbRows;npbRows=function(yr){const R=_r.apply(this,arguments);try{R.forEach(x=>{if(x.cs==null){const id=pcByName(x.n);x.cs=id?pcSum(id):''}})}catch(e){}return R}}catch(e){}})();
