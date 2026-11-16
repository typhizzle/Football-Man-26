// ===================== 📊 FULL BOX SCORES (after every game, and for any played game in a schedule) =====================
function bxRng(seed){let a=seed>>>0||1;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const bxHash=s=>{let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const bxKey=(w,a,b)=>grK()+'|'+w+'|'+Math.min(a,b)+'|'+Math.max(a,b);
// split a total into parts by weights (whole numbers that add up exactly)
function bxSplit(tot,ws,r){const n=ws.map(w=>w*(.75+r()*.5)),s=n.reduce((a,b)=>a+b,0)||1;let out=n.map(x=>Math.floor(tot*x/s)),left=tot-out.reduce((a,b)=>a+b,0);for(let i=0;left>0;i=(i+1)%out.length){out[i]++;left--}return out}
function bxSide(ti,pts,opts,r,real){const T=S.T,t=T[ti],L=rost('h.'+ti)||[],nm=k=>(L[k]&&L[k].n)||'—',isMe=ti==0;
 const tds=Math.max(0,Math.floor(pts/7)-(pts%7==6?0:0)),fg=Math.floor((pts-tds*7)/3);
 let pTD=Math.round(tds*(.5+r()*.25)),rTD=tds-pTD;
 let tot=Math.round(cl(185+pts*7.2+(r()-.5)*90,110,640)),sh=.5+r()*.18,py=Math.round(tot*sh),ry=tot-py;
 let att=Math.max(12,Math.round(py/(6.4+r()*2))),cmp=Math.min(att,Math.round(att*(.56+r()*.14))),int=r()<.38?0:r()<.8?1:2,fum=r()<.7?0:1,sk=Math.floor(r()*4.2);
 let qbN=nm(0),qry=Math.round((r()-.2)*30),qrtd=0,qcar=3+Math.floor(r()*5);
 if(real&&isMe){const st=real;qbN=S.name;att=st.att;cmp=st.cmp;py=st.yds;pTD=st.td;int=st.int;qry=st.ry||0;qrtd=st.rtd||0;sk=st.sk||0;fum=st.fum||0;rTD=Math.max(0,tds-pTD-qrtd);ry=Math.max(qry+20,Math.round(ry));tot=py+ry}
 else if(isMe&&S.stage!='hs'&&!real){}
 const car=Math.max(14,Math.round((ry-qry)/(3.6+r()*1.6))),rbCar=Math.max(8,Math.round(car*(.72+r()*.12))),rb2Car=Math.max(0,car-rbCar);
 const rbY=Math.round((ry-qry)*rbCar/Math.max(1,car)),rb2Y=ry-qry-rbY;const rbTD=Math.max(0,rTD-qrtd);
 // receiving: WR1, WR2, WR3, TE, RB
 const recK=[2,3,4,5,1],recW=[.3,.22,.14,.18,.16],recC=bxSplit(cmp,recW,r),recY=(()=>{const av=[13.2,12.4,11.2,10.6,7.6],raw=recC.map((c,i)=>c>0?c*av[i]*(.72+r()*.56):0),sm=raw.reduce((x,y)=>x+y,0)||1,P_=Math.max(0,py),out=raw.map(v=>Math.round(v*P_/sm));out.forEach((v,i)=>{if(recC[i]>0)out[i]=cl(v,recC[i]*2,recC[i]*(i==4?16:26))});const df=P_-out.reduce((x,y)=>x+y,0);let j=out.indexOf(Math.max(...out));if(j>=0&&recC.some(c=>c>0))out[j]=Math.max(0,out[j]+df);return out})(),recT=bxSplit(pTD,[.34,.24,.12,.22,.08],r);
 const rec=recK.map((k,i)=>({n:nm(k),p:(L[k]&&L[k].pos)||POSL[k],c:recC[i],y:recY[i],td:recT[i]})).filter(x=>x.c>0).sort((a,b)=>b.y-a.y);
 const fd=Math.round(tot/16+r()*4),d3a=10+Math.floor(r()*6),d3m=Math.round(d3a*(.25+Math.min(.35,pts/100)+r()*.1)),pen=3+Math.floor(r()*6);
 return{ti,n:tn(t),ab:ab(t),pts,tot,py,ry,fd,att,cmp,int,fum,sk,pen,penY:pen*(7+Math.floor(r()*4)),d3:d3m+'-'+d3a,
  pass:[{n:qbN,c:cmp,a:att,y:py,td:pTD,i:int}],rush:[{n:nm(1),p:'RB',c:rbCar,y:rbY,td:rbTD},{n:qbN,p:'QB',c:qcar,y:qry,td:qrtd},...(rb2Car>2?[{n:nm(3),p:'WR',c:Math.min(3,rb2Car),y:rb2Y,td:0}]:[])],rec,fg}}
// defense lines come from the other side's offense
function bxDef(ti,off,r){const L=rost('h.'+ti)||[],D=[11,12,13,14,15,16,17,18,19,20,21],nm=k=>(L[k]&&L[k].n)||'—',ps=k=>(L[k]&&L[k].pos)||POSL[k];
 const plays=off.cmp+off.rush.reduce((a,x)=>a+x.c,0),tk=bxSplit(Math.round(plays*1.15),[.5,.6,.6,.5,1.1,1.4,1.1,.8,.8,1,1],r),skS=bxSplit(off.sk,[1.4,.8,.8,1.4,.9,.5,.9,0,0,.1,.1],r),inS=bxSplit(off.int,[0,0,0,0,.3,.4,.3,1.2,1.2,1,1],r),pd=bxSplit(off.int+3+Math.floor(r()*5),[.1,0,0,.1,.3,.3,.3,1.3,1.3,1,1],r),ff=bxSplit(off.fum,[1,.5,.5,1,.6,.5,.6,.3,.3,.3,.3],r);
 return D.map((k,i)=>({n:nm(k),p:ps(k),t:tk[i],s:skS[i],i:inS[i],pd:pd[i],ff:ff[i]})).filter(x=>x.t||x.s||x.i||x.pd).sort((a,b)=>(b.s*3+b.i*3+b.t)-(a.s*3+a.i*3+a.t))}
function bxMake(w,a,b,sa,sb,real){const r=bxRng(bxHash(bxKey(w,a,b)+'|'+sa+'-'+sb));const A=bxSide(a,sa,{},r,real),B=bxSide(b,sb,{},r,null);
 // turnovers line up with the other side's takeaways
 A.def=bxDef(a,B,r);B.def=bxDef(b,A,r);return{w,s:[sa,sb],A,B}}
// your games keep your real stats
(()=>{const _e=endGame;endGame=function(){let pre=null;try{pre={w:S.wk||0,oi:g.oi,st:{...g.st},rc:{...(g.rc||{})}}}catch(e){}const r=_e.apply(this,arguments);
 try{if(pre&&g&&g.s){const bx=bxMake(pre.w,0,pre.oi,g.s[0],g.s[1],pre.st&&pre.st.att!=null&&g.st&&!g.iwF?pre.st:null);S.bx=S.bx||{};S.bx[bxKey(pre.w,0,pre.oi)]=bx;const ks=Object.keys(S.bx);if(ks.length>60)ks.slice(0,ks.length-60).forEach(k=>delete S.bx[k]);save();
  const c=ov.querySelector('.card')||ov;const btn=document.createElement('button');btn.className='g';btn.textContent='📊 Full game stats';btn.setAttribute('onclick',"bxOpen("+pre.w+",0,"+pre.oi+")");const wf=[...ov.querySelectorAll('button')].find(x=>/Walk the field/.test(x.textContent));if(wf)wf.parentNode.insertBefore(btn,wf);else c.appendChild(btn)}}catch(e){console.warn('box',e)}return r}})();
function bxGet(w,a,b){const k=bxKey(w,a,b);if(S.bx&&S.bx[k]){const x=S.bx[k];return x.A.ti==a?x:{w:x.w,s:[x.s[1],x.s[0]],A:x.B,B:x.A}}const r=schRes(w,a,b);if(!r)return null;return bxMake(w,a,b,r[0],r[1],null)}
function bxHTML(x){const td=(v,b)=>`<td style="text-align:${b?'left':'right'};padding:2px 4px">${v}</td>`,tb=(h,rows)=>`<table style="width:100%;font-size:13px;border-collapse:collapse;margin:4px 0"><tr style="opacity:.7">${h.map((c,i)=>td(c,i==0)).join('')}</tr>${rows.map(r=>`<tr>${r.map((c,i)=>td(c,i==0)).join('')}</tr>`).join('')}</table>`,A=x.A,B=x.B;
 const team=tb(['',A.ab,B.ab],[['First downs',A.fd,B.fd],['Total yards',A.tot,B.tot],['Passing',A.py,B.py],['Rushing',A.ry,B.ry],['Comp-Att',A.cmp+'-'+A.att,B.cmp+'-'+B.att],['3rd down',A.d3,B.d3],['Turnovers',A.int+A.fum,B.int+B.fum],['Sacked',A.sk,B.sk],['Penalties',A.pen+'-'+A.penY,B.pen+'-'+B.penY]]);
 const side=s=>`<p style="margin:8px 0 2px"><b>${esc(s.n)}</b></p>`+tb(['Passing','C/A','Yds','TD','INT'],s.pass.map(p=>[esc(p.n),p.c+'/'+p.a,p.y,p.td,p.i]))+tb(['Rushing','Car','Yds','TD'],s.rush.filter(p=>p.c>0).map(p=>[esc(p.n)+' <small>'+p.p+'</small>',p.c,p.y,p.td]))+tb(['Receiving','Rec','Yds','TD'],s.rec.map(p=>[esc(p.n)+' <small>'+p.p+'</small>',p.c,p.y,p.td]))+tb(['Defense','Tkl','Sck','INT','PD'],s.def.slice(0,8).map(p=>[esc(p.n)+' <small>'+p.p+'</small>',p.t,p.s,p.i,p.pd]));
 return `<h2>📊 ${esc(A.ab)} ${x.s[0]} – ${x.s[1]} ${esc(B.ab)}</h2><div style="text-align:left;max-height:62vh;overflow:auto"><p style="margin:2px 0"><b>Team stats</b></p>${team}${side(A)}${side(B)}</div>`}
let BXPREV=null;
function bxOpen(w,a,b){const x=bxGet(w,a,b);if(!x)return;const ev_=window.event,src_=ev_&&ev_.target&&ev_.target.closest?ev_.target:null,inOv=src_?!!src_.closest('#ov'):(ov.style.display!='none'&&ov.innerHTML);if(inOv){BXPREV=ov.innerHTML;ovShow(`<button class=g style="position:sticky;top:0;z-index:2" onclick="bxBack()">← Back</button>`+bxHTML(x)+`<button onclick="bxBack()">Back</button>`)}else{BXPREV=null;ovShow(`<button class=g style="position:sticky;top:0;z-index:2" onclick="ovHide()">✕ Close</button>`+bxHTML(x)+`<button onclick="ovHide()">Close</button>`)}}
function bxBack(){if(!BXPREV){ovHide();return}if(BXPREV){ov.innerHTML=BXPREV;BXPREV=null}else ovHide()}
// schedule: a 📊 button on every played game
(()=>{const _s=schV;schV=function(i){const r=_s.apply(this,arguments);try{const W=schWeeks(),card=ui.querySelector('.card');if(!card)return r;const rows=[...card.querySelectorAll('.row')];let k=0;
 W.forEach((wk,w)=>{const row=rows[k++];if(!row)return;const p=wk.find(x=>x[0]==i||x[1]==i);if(!p)return;const o=p[0]==i?p[1]:p[0];if(!schRes(w,i,o))return;const bt=document.createElement('button');bt.className='g';bt.style.cssText='width:auto;flex:none;padding:4px 8px;margin-left:4px';bt.textContent='📊';bt.setAttribute('onclick',`event.stopPropagation();bxOpen(${w},${i},${o})`);row.appendChild(bt)});
 const G=S.grk==grK()&&S.gr?S.gr:[];for(let w=W.length;w<G.length;w++)(G[w]||[]).forEach(x=>{if(x[0]!=i&&x[1]!=i)return;const row=rows[k++];if(!row)return;const o=x[0]==i?x[1]:x[0];const bt=document.createElement('button');bt.className='g';bt.style.cssText='width:auto;flex:none;padding:4px 8px;margin-left:4px';bt.textContent='📊';bt.setAttribute('onclick',`event.stopPropagation();bxOpen(${w},${i},${o})`);row.appendChild(bt)})}catch(e){console.warn('schV box',e)}return r}})();
// the box score is one tap away while you walk the field too
(()=>{const _f=fieldWalk;fieldWalk=function(){const r=_f.apply(this,arguments);try{const top=document.querySelector('#lrw .top');if(top&&g&&g.oi!=null&&!top.querySelector('.bxb')){const wk=Object.keys(S.bx||{}).map(k=>k.split('|')).filter(p=>p[0]==grK()&&(+p[2]==0||+p[3]==0)&&(+p[2]==g.oi||+p[3]==g.oi)).map(p=>+p[1]).sort((a,b)=>b-a)[0];if(wk!=null){const b=document.createElement('button');b.className='bxb';b.textContent='📊 Game stats';b.setAttribute('onclick',`bxOpen(${wk},0,${g.oi})`);top.appendChild(b)}}}catch(e){}return r}})();
