
// ---------------- the football world around you (high school starts in 2022, college in 2026) ----------------
// real NFL regular seasons 2022-2025 for the quarterbacks you created (same teams as their real counterparts), their real college years, random everyone else
const RTA={NYJ:0,BUF:1,MIA:2,NE:3,BAL:4,PIT:5,CLE:6,CIN:7,HOU:8,IND:9,TEN:10,JAX:11,KC:12,DEN:13,LV:14,LAC:15,PHI:16,DAL:17,WAS:18,NYG:19,CHI:20,DET:21,GB:22,MIN:23,ATL:24,NO:25,TB:26,CAR:27,SF:28,SEA:29,ARI:30,LAR:31};
// by QB (index = his team in your list): year team G cmp att yds td int rushYds rushTD
const RQS={1:'2022 BUF 16 359 567 4283 35 14 762 7;2023 BUF 17 385 579 4306 29 18 524 15;2024 BUF 17 307 483 3731 28 6 531 12;2025 BUF 17 319 460 3668 25 10 579 14',
12:'2022 KC 17 435 648 5250 41 12 358 4;2023 KC 16 401 597 4183 27 14 389 0;2024 KC 16 392 581 3928 26 11 307 2;2025 KC 14 315 502 3587 22 11 422 5',
5:'2022 GB 17 350 542 3695 26 12 94 1;2023 NYJ 1 0 1 0 0 0 0 0;2024 NYJ 17 368 584 3897 28 11 107 0;2025 PIT 16 327 498 3322 24 7 61 1',
17:'2022 DAL 12 261 394 2860 23 15 182 1;2023 DAL 17 410 590 4516 36 9 242 2;2024 DAL 8 185 286 1978 11 8 54 1;2025 DAL 17 404 600 4552 30 10 177 2',
18:'2024 WAS 17 331 480 3568 25 9 891 6;2025 WAS 7 114 188 1262 8 3 278 2',
20:'2024 CHI 17 351 562 3541 20 6 489 0;2025 CHI 17 330 568 3942 27 7 383 3',
4:'2022 BAL 12 203 326 2242 17 7 764 3;2023 BAL 16 307 457 3678 24 7 821 5;2024 BAL 17 316 474 4172 41 4 915 4;2025 BAL 13 192 302 2549 21 7 349 2',
7:'2022 CIN 16 414 606 4475 35 12 257 5;2023 CIN 10 244 365 2309 15 6 88 0;2024 CIN 17 460 652 4918 43 9 201 2;2025 CIN 8 173 259 1809 17 5 41 0',
31:'2022 LAR 9 206 303 2087 10 8 9 1;2023 LAR 15 326 521 3965 24 11 65 0;2024 LAR 16 340 517 3762 20 8 41 0;2025 LAR 17 388 597 4707 46 8 1 0',
8:'2023 HOU 15 319 499 4108 23 5 167 3;2024 HOU 17 336 532 3727 20 12 233 0;2025 HOU 14 273 423 3041 19 8 209 1',
27:'2023 CAR 16 315 527 2877 11 10 253 0;2024 CAR 14 234 384 2403 15 9 249 6;2025 CAR 16 304 478 3011 23 11 216 2',
15:'2022 LAC 17 477 699 4739 25 10 147 0;2023 LAC 13 297 456 3134 20 7 228 3;2024 LAC 17 332 504 3870 23 3 306 2;2025 LAC 16 340 512 3727 26 13 498 2',
13:'2024 DEN 17 376 567 3775 29 12 430 4;2025 DEN 17 388 612 3931 25 11 356 5',
0:'2022 SEA 17 399 572 4282 30 11 366 1;2023 SEA 15 323 499 3624 20 9 155 1;2024 SEA 17 407 578 4320 21 15 272 2;2025 LV 15 302 448 3025 19 17 109 0',
14:'2022 MIN 17 424 643 4547 29 14 97 2;2023 MIN 8 216 311 2331 18 5 25 0;2024 ATL 14 303 453 3508 18 16 0 0;2025 ATL 10 166 269 1721 10 5 7 1',
23:'2022 ARI 11 259 390 2368 14 7 418 3;2023 ARI 8 176 268 1799 10 5 244 3;2024 ARI 17 372 541 3851 21 11 572 5;2025 ARI 5 110 161 962 6 3 173 1',
24:'2024 ATL 5 61 105 775 3 3 11 1;2025 ATL 9 166 276 1982 9 3 70 1',
19:'2025 NYG 14 216 339 2272 15 5 487 9',
3:'2024 NE 13 225 338 2276 15 10 421 2;2025 NE 17 354 492 4394 31 8 450 4',
2:'2022 TEN 8 31 61 276 0 3 123 1;2023 TEN 3 4 5 74 0 0 21 0;2024 GB 7 40 54 550 3 0 138 1;2025 GB 4 30 35 422 3 0 123 2',
6:'2022 CLE 6 99 170 1102 7 5 175 1;2023 CLE 6 105 171 1115 7 4 142 1;2024 CLE 7 137 216 1148 5 3 148 1',
9:'2022 NYG 16 317 472 3205 15 5 708 7;2023 NYG 6 108 160 909 2 6 206 1;2024 NYG 10 216 341 2070 8 7 265 2;2025 IND 13 261 384 3101 19 8 164 5',
11:'2022 JAX 17 387 584 4113 25 8 291 5;2023 JAX 16 370 564 4016 21 14 339 4;2024 JAX 10 172 284 2045 11 7 119 3;2025 JAX 17 341 560 4007 29 12 359 9',
16:'2022 PHI 15 306 460 3701 22 6 760 13;2023 PHI 17 352 538 3858 23 15 605 15;2024 PHI 15 248 361 2903 18 5 630 14;2025 PHI 16 294 454 3224 25 6 421 8',
28:'2022 SF 9 114 170 1374 13 4 13 1;2023 SF 16 308 444 4280 31 11 144 2;2024 SF 15 300 455 3864 20 12 323 5;2025 SF 9 197 284 2167 20 10 147 3',
30:'2022 CLE 16 236 369 2608 12 6 243 2;2023 WAS 3 18 23 224 3 0 19 0;2024 NE 8 95 161 826 2 1 62 0;2025 ARI 14 315 485 3366 23 8 168 1',
29:'2022 CAR 6 82 140 1143 7 3 106 2;2023 SF 10 28 46 297 2 1 15 1;2024 MIN 17 361 545 4319 35 12 212 1;2025 SEA 17 323 477 4048 25 14 95 0',
26:'2022 CAR 7 119 206 1313 6 6 52 1;2022 LAR 5 82 129 850 4 2 37 0;2023 TB 17 364 566 4044 28 10 163 1;2024 TB 17 407 570 4500 41 16 378 3;2025 TB 17 343 543 3693 26 11 382 1',
25:'2025 NO 11 221 327 2384 10 6 186 3',
22:'2022 GB 4 14 21 195 1 0 -1 0;2023 GB 17 372 579 4159 32 11 247 4;2024 GB 15 268 425 3389 25 11 83 1;2025 GB 15 291 439 3381 23 6 199 0',
21:'2022 DET 17 382 587 4438 29 7 73 0;2023 DET 17 407 605 4575 30 12 21 2;2024 DET 17 390 539 4629 37 12 56 0;2025 DET 17 393 578 4564 34 8 45 0',
10:'2025 TEN 16 320 537 3117 15 7 148 1'};
// the young ones' college years (school code from the conference lists): year school G cmp att yds td int rushYds rushTD
const RQC={18:'2022 LSU 13 266 388 2913 17 3 885 11;2023 LSU 12 236 327 3813 40 4 1134 10',20:'2022 USC 14 333 500 4537 42 5 382 10;2023 USC 12 266 388 3633 30 5 115 11',8:'2022 OSU 13 258 389 3688 41 6 0 0',27:'2022 BAMA 12 245 380 3328 32 5 0 0',
13:'2022 ORE 13 294 409 3593 29 7 0 0;2023 ORE 14 364 470 4508 45 3 0 0',24:'2022 WASH 13 362 554 4641 31 8 0 0;2023 WASH 15 363 555 4903 36 11 0 0',19:'2022 MISS 13 226 362 2975 20 11 0 0;2023 MISS 13 233 359 3364 23 5 0 0;2024 MISS 13 276 398 4279 29 6 0 0',
3:'2022 UNC 14 342 517 4321 38 7 698 7;2023 UNC 12 269 425 3608 24 9 449 9',25:'2022 LOU 7 106 177 1304 7 4 0 0;2023 LOU 4 67 111 746 7 4 0 0;2024 LOU 12 244 389 3195 23 6 0 0',10:'2022 MIA 13 320 497 3231 23 9 0 0;2023 MIA 12 323 485 3735 25 7 0 0;2024 MIA 13 305 454 4313 39 7 0 0'};
// real standings (team order of your list) and champions
const RWL={2022:'7-10,13-3,9-8,8-9,10-7,9-8,7-10,12-4,3-13-1,4-12-1,7-10,9-8,14-3,5-12,6-11,10-7,14-3,12-5,8-8-1,9-7-1,3-14,9-8,8-9,13-4,7-10,7-10,8-9,7-10,13-4,9-8,4-13,5-12',
2023:'7-10,11-6,11-6,4-13,13-4,10-7,11-6,9-8,10-7,9-8,6-11,9-8,11-6,8-9,8-9,5-12,11-6,12-5,4-13,6-11,7-10,12-5,9-8,7-10,7-10,9-8,9-8,2-15,12-5,9-8,4-13,10-7',
2024:'5-12,13-4,8-9,4-13,12-5,10-7,3-14,9-8,10-7,8-9,3-14,4-13,15-2,10-7,4-13,11-6,14-3,7-10,12-5,3-14,5-12,15-2,11-6,14-3,8-9,5-12,10-7,5-12,6-11,10-7,8-9,10-7',
2025:'3-14,12-5,7-10,14-3,8-9,10-7,5-12,6-11,12-5,8-9,3-14,13-4,6-11,14-3,3-14,11-6,11-6,7-9-1,5-12,4-13,11-6,9-8,9-7-1,9-8,8-9,6-11,8-9,8-9,12-5,14-3,3-14,12-5'};
const RCH={2022:{ub:12,ru:16,mvp:12,nc:'UGA',hz:20},2023:{ub:12,ru:28,mvp:4,nc:'MICH',hz:18},2024:{ub:16,ru:12,mvp:1,nc:'OSU'},2025:{ub:29,ru:3,mvp:31,nc:'IND'}};
const uParse=s=>s.split(';').map(l=>{const a=l.split(' ');return{y:+a[0],tm:a[1],g:+a[2],c:+a[3],a:+a[4],yd:+a[5],td:+a[6],in:+a[7],ry:+(a[8]||0),rt:+(a[9]||0)}});
let UQ=null,UC=null;const uQ=()=>UQ||(UQ=Object.fromEntries(Object.entries(RQS).map(([k,v])=>[k,uParse(v)]))),uC=()=>UC||(UC=Object.fromEntries(Object.entries(RQC).map(([k,v])=>[k,uParse(v)])));
const uDeb=qi=>{const L=uQ()[qi];return L&&L.length?L[0].y:qi>=32&&QBB[qi-32]&&QBB[qi-32][5]?2026:(S.y0||2022)},uY0=()=>S&&S.y0||2022;
const uSch=code=>{for(const c of (S.col||[])){const t=c.t.find(t=>t.ab==code);if(t)return t}return null};
const uNm=r=>NF[r()*NF.length|0]+' '+NL[r()*NL.length|0];
// how much of season Y has been played (the current season moves along with yours)
function uFrac(Y){const cur=yrN();if(Y<cur)return 1;if(Y>cur)return 0;const st=S.stage||'hs';if(st=='hs'){let n=10;try{n=mkSched().length||10}catch(e){}return S.sum?1:Math.min(1,(S.wk||0)/n)}if(st=='col')return S.csum?1:Math.min(1,(S.wk||0)/((S.csch&&S.csch.length)||12));return 1}
const uMvpT=(Y,qi)=>{const x=uPro(Y).find(x=>x.q.some(q=>q.qi===qi));return x?x.ti:qi};
const uScale=(L,f)=>{if(f>=1)return L;const k=x=>Math.round(x*f);return{...L,g:k(L.g),c:k(L.c),a:k(L.a),yd:k(L.yd),td:k(L.td),in:k(L.in),ry:k(L.ry),rt:k(L.rt)}};
// the PFL season Y (full season; scaled when shown)
const UPC={};
function uPro(Y){if(UPC[Y])return UPC[Y];const T=[...Array(32)].map((_,ti)=>({ti,q:[],w:0,l:0,t:0}));
 if(Y<=2025){const Q=uQ();for(const qi in Q)for(const L of Q[qi])if(L.y==Y){const ti=RTA[L.tm];if(ti!=null)T[ti].q.push({...L,qi:+qi,n:QBX[qi][0],real:1})}
  const R_=(RWL[Y]||'').split(',');T.forEach((x,ti)=>{const r=(R_[ti]||'8-9').split('-').map(Number);x.w=r[0];x.l=r[1];x.t=r[2]||0})}
 else T.forEach((x,ti)=>{const q=QBP[ti];if(!q)return;const r=rng((S.seed||1)*313+Y*31+ti*7),o=q[1],g=r()<.17?17-(2+(r()*8|0)):17,sv=sVals('q',o,g,1,r,0),c=sv[3],a=Math.max(c,Math.round(c/(.6+(o-70)/250+(r()-.5)*.05))),ry=Math.round(g*(4+r()*14));
  x.q.push({y:Y,tm:TA[ti],g,c,a,yd:sv[0],td:sv[1],in:sv[2],ry,rt:Math.round(ry/110*r()*2),qi:ti,n:q[0]});const tv=(S.pro&&S.pro[ti]&&S.pro[ti].ovr)||75,p=cl(.5+(o-85)/40+(tv-75)/60+(r()-.5)*.25,.12,.88);let w=0;for(let k=0;k<17;k++)if(r()<p)w++;x.w=w;x.l=17-w});
 // whoever threw the rest of the passes (random)
 T.forEach(x=>{const r=rng((S.seed||1)*71+Y*13+x.ti*29),tot=Math.round(490+r()*130),att=x.q.reduce((s,q)=>s+q.a,0),need=tot-att;if(need>=60){const a=Math.min(600,need),g=cl(Math.round(a/32),1,17);const bk=Y>2025?qbbOf(x.ti,Y):-1;x.q.push({y:Y,tm:TA[x.ti],g,c:Math.round(a*(.58+r()*.08)),a,yd:Math.round(a*(6+r()*1.3)),td:Math.round(a*(.025+r()*.025)),in:Math.round(a*(.018+r()*.014)),ry:Math.round(g*r()*10),rt:r()<.3?1:0,...(bk>=0?{n:QBB[bk][0],qi:32+bk,bk:1}:{n:uNm(rng((S.seed||1)*53+x.ti*101+(Y>2025?Y:0))),fill:1})})}x.q.sort((a,b)=>b.a-a.a)});
 return UPC[Y]=T}
// champions: real through 2025, the best team / best QB after that
function uChamp(Y){const T=uPro(Y),R=RCH[Y];if(R)return{ub:R.ub,ru:R.ru,mvp:R.mvp};const rk=T.slice().sort((a,b)=>(b.w-a.w)||((b.q[0]?b.q[0].yd:0)-(a.q[0]?a.q[0].yd:0))),L=T.flatMap(x=>x.q.filter(q=>!q.fill).map(q=>({q,x}))).sort((a,b)=>(b.q.yd/25+b.q.td*4-b.q.in*2+b.x.w*5)-(a.q.yd/25+a.q.td*4-a.q.in*2+a.x.w*5));return{ub:rk[0].ti,ru:rk[1].ti,mvp:L[0]?L[0].q.qi:null}}
// college season Y (only the years before you get there)
const UCC={};
function uCol(Y){if(UCC[Y])return UCC[Y];const out=[],C=uC(),used=new Set(),y0=uY0();
 for(const qi in C)for(const L of C[qi])if(L.y==Y){const t=uSch(L.tm);if(!t||!(L.a>0))continue;out.push({...L,n:QBX[qi][0],qi:+qi,sch:t.n,real:1});if(L.a>=150)used.add(t.n)}
 (S.npx||[]).forEach(p=>{if(p.pos!='QB')return;const y=(Y-y0+1)+p.off;if(y<5||y>8)return;const sc=NSCH[p.sk]?NSCH[p.sk][0]:p.cn,ov=npxRating(p,{lv:'col',y:y-4,toD:Math.max(0,8-y)}),r=rng((S.seed||1)*17+p.id*37+Y),st=ov>=80||y>=6;if(!st)return;used.add(sc);out.push(uColLine(r,ov,Y,{n:p.n,np:p.id,sch:sc}))});
 (S.col||[]).forEach(c=>c.t.forEach(t=>{if(used.has(t.n))return;const r=rng((S.seed||1)*19+hsh(t.n)+Y*7);let nm=null;const G=qroomG(t).filter(x=>x.cls-(uY0()+4-Y)>=1).sort((a,b)=>b.ovr-a.ovr)[0];if(G&&Y>=2023)nm=G.n;out.push(uColLine(r,t.ovr,Y,{n:nm||uNm(r),sch:t.n}))}));
 return UCC[Y]=out.sort((a,b)=>b.yd-a.yd)}
function uColLine(r,ov,Y,o){const yd=Math.max(600,Math.round(1700+(ov-50)*62+(r()-.5)*1100)),a=Math.round(yd/(6.8+r()*1.6)),c=Math.round(a*(.58+r()*.1));return{y:Y,g:12+(r()<.4?1:0),c,a,yd,td:Math.round(yd/(105+r()*60)),in:Math.round(a*(.015+r()*.02)),ry:Math.round(r()*450),rt:Math.round(r()*6),...o}}
const uHz=Y=>{const R=RCH[Y];if(R&&R.hz!=null){const L=uCol(Y).find(x=>x.qi===R.hz);if(L)return L}return uCol(Y).slice().sort((a,b)=>(b.yd/20+b.td*5-b.in*3+b.ry/15)-(a.yd/20+a.td*5-a.in*3+a.ry/15))[0]};
// young pros who were still in college that year, on that school's roster / QB room (only while you're in high school)
function yqAt(Y){const C=uC(),out=[];for(const qi in C)for(const L of C[qi])if(L.y==Y)out.push({qi:+qi,L});return out}
const yqOvr=(qi,Y)=>cl(QBX[qi][1]-2-3*(uDeb(qi)-Y),55,95),yqCls=(qi,Y)=>cl(5-(uDeb(qi)-Y),1,4);
function yqRoom(t,room){if((S.stage||'hs')!='hs')return room;const Y=yrN();yqAt(Y).forEach(({qi,L})=>{const s=uSch(L.tm);if(!s||s.n!=t.n)return;room=room.filter(x=>x.n!=QBX[qi][0]);room.push({n:QBX[qi][0],ovr:yqOvr(qi,Y),cls:yqCls(qi,Y),yq:qi})});return room.sort((a,b)=>b.ovr-a.ovr)}
function yqRost(a,t,L){if(!t||a[0]!='c'||!L||!L[0])return;const hs=(S.stage||'hs')=='hs',Y=yrN(),k=hs?Y:0;if(L.yqk===k)return;L.yqk=k;const hit=hs?yqAt(Y).filter(({L:x})=>{const s=uSch(x.tm);return s&&s.n==t.n&&x.a>=150}).sort((a,b)=>b.L.a-a.L.a)[0]:null;
 if(hit){const qi=hit.qi;L[0]={...L[0],n:QBX[qi][0],pos:'QB',num:QXN(qi),ovr:yqOvr(qi,Y),cls:yqCls(qi,Y),yq:qi,qs:1}}else if(L[0].yq!=null){const q0=qroom(t)[0];L[0]={...L[0],n:q0.n,ovr:q0.ovr,cls:q0.cls,yq:undefined,qs:1}}}
// pro rosters: the QBs you created carry their real 2022-2025 seasons (and the simulated ones after) in their career history
function uHist(x){if(!x||!x.n)return;const qi=QBX.findIndex(q=>q[0]==x.n);if(qi<0)return uHistS(x);const y0=uY0(),last=yrN()-1;if(last<y0)return;const deb=Math.max(y0,uDeb(qi)),keep=(x.h||[]).filter(h=>h[0]<y0&&deb<=y0),add=[];
 for(let Y=deb;Y<=last;Y++)uPro(Y).forEach(tm=>tm.q.forEach(L=>{if(L.qi===qi&&!L.fill)add.push([Y,tm.ti,L.yd,L.td,L.in,L.c,L.ry,L.rt])}));
 x.h=[...keep,...add].slice(-14);x.cs={};x.tm=[];x.h.forEach(h=>{csAdd(x,'q',h.slice(2));tmAdd(x,h[1])});x.ny=x.h.length}
function uHistS(x){const k=PKS.findIndex(q=>q[2]==x.n);if(k<0)return;const g=SG(x.pos);if(!g)return;const y0=uY0(),last=yrN()-1;if(last<y0)return;const deb=Math.max(y0,uPDeb(k)),keep=(x.h||[]).filter(h=>h[0]<y0&&deb<=y0),add=[],ty=(uP()[k]||{}).ty||g;
 for(let Y=deb;Y<=last;Y++)(uSkill(Y)[ty]||[]).forEach(L=>{if(L.pk===k)add.push([Y,L.ti,...(ty=='d'?[L.sk]:ty=='b'?[L.in,L.tk]:[L.yd,L.td])])});x.h=[...keep,...add].slice(-14);x.cs={};x.tm=[];x.h.forEach(h=>{csAdd(x,g,h.slice(2));tmAdd(x,h[1])});x.ny=x.h.length}
function uHistAll(){for(const k in (S.ro||{})){if(k[0]!='p')continue;const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>{if(x)uHist(x)})}}

// your other created stars (index in the stars list): real 2022-2025 lines. r: G att yds td rec recYds recTD · w: G rec yds td · d: G sacks · b: G int tackles
const RPS={0:'r|2022 SF 11 159 746 6 52 464 4;2022 CAR 6 85 393 2 33 277 1;2023 SF 16 272 1459 14 67 564 7;2024 SF 4 50 202 0 15 146 0;2025 SF 17 311 1202 10 102 924 7',
1:'r|2023 DET 15 182 945 10 52 316 1;2024 DET 17 250 1412 16 52 517 4;2025 DET 17 243 1223 13 77 616 5',
2:'r|2022 SEA 15 228 1050 9 27 165 0;2023 SEA 15 219 905 8 29 259 1;2024 SEA 11 153 573 7 46 299 1;2025 SEA 17 221 1027 5 31 282 0',
3:'w|2023 SEA 17 63 628 4;2024 SEA 17 100 1130 6;2025 SEA 17 119 1793 10',4:'w|2022 KC 17 110 1338 12;2023 KC 15 93 984 5;2024 KC 16 97 823 3;2025 KC 17 76 851 5',5:'w|2024 LV 17 112 1194 5;2025 LV 12 64 680 7',
6:'d|2022 LV 17 12.5;2023 LV 17 14.5;2024 LV 12 7.5;2025 LV 15 10',7:'d|2022 CLE 16 16;2023 CLE 16 14;2024 CLE 17 14;2025 CLE 17 23',8:'d|2022 LAR 11 5;2023 LAR 17 8',
9:'w|2022 CIN 12 87 1046 9;2023 CIN 16 100 1216 7;2024 CIN 17 127 1708 17;2025 CIN 16 125 1412 8',10:'w|2023 LAR 17 105 1486 6;2024 LAR 11 79 990 3;2025 LAR 16 129 1715 10',
11:'r|2022 IND 11 192 861 4 28 143 0;2023 IND 10 169 741 7 19 153 1;2024 IND 14 303 1431 11 18 136 1;2025 IND 17 323 1585 18 46 378 2',
12:'r|2022 TEN 16 349 1538 13 33 398 0;2023 TEN 17 280 1167 12 28 214 0;2024 BAL 17 325 1921 16 19 193 2;2025 BAL 17 307 1595 16 15 150 0',
13:'w|2022 MIN 17 128 1809 8;2023 MIN 10 68 1074 5;2024 MIN 17 103 1533 10;2025 MIN 17 84 1048 2',
14:'b|2024 PHI 16 0 51;2025 PHI 16 2 93'};
let UP_=null;const uP=()=>UP_||(UP_=Object.fromEntries(Object.entries(RPS).map(([k,v])=>{const[ty,b]=v.split('|');return[k,{ty,L:b.split(';').map(l=>{const a=l.split(' '),n=a.slice(2).map(Number);return ty=='r'?{y:+a[0],tm:a[1],g:n[0],at:n[1],yd:n[2],td:n[3],rc:n[4],cy:n[5],ct:n[6]}:ty=='w'?{y:+a[0],tm:a[1],g:n[0],rc:n[1],yd:n[2],td:n[3]}:ty=='b'?{y:+a[0],tm:a[1],g:n[0],in:n[1],tk:n[2]}:{y:+a[0],tm:a[1],g:n[0],sk:n[1]}})}]})));
const uPDeb=k=>{const p=uP()[k];return p&&p.L.length?p.L[0].y:uY0()};
// rushing / receiving / sacks for season Y: your stars (real or simulated) plus a random starter on every team
const USC={};
function uSkill(Y){if(USC[Y])return USC[Y];const out={r:[],w:[],d:[],b:[]},P=uP(),has={r:new Set(),w:{},d:new Set(),b:new Set()};
 const push=(ty,o)=>{out[ty].push(o);if(ty=='w')has.w[o.ti]=(has.w[o.ti]||0)+1;else has[ty].add(o.ti)};
 PKS.forEach((q,k)=>{const p=P[k],ty=p?p.ty:SG(POSL[q[1]]);if(!ty||!out[ty])return;const n=q[2];
  if(Y<=2025){if(!p)return;p.L.forEach(L=>{if(L.y==Y&&RTA[L.tm]!=null)push(ty,{...L,n,pk:k,ti:RTA[L.tm],real:1})})}
  else{const r=rng((S.seed||1)*409+Y*11+k*17),g=r()<.15?17-(2+(r()*6|0)):17,v=sVals(ty,q[3],g,1,r,0);push(ty,ty=='r'?{y:Y,g,at:Math.round(v[0]/(4.3+r()*.9)),yd:v[0],td:v[1],n,pk:k,ti:q[0]}:ty=='w'?{y:Y,g,rc:Math.round(v[0]/(11.5+r()*3)),yd:v[0],td:v[1],n,pk:k,ti:q[0]}:ty=='b'?{y:Y,g,in:v[0],tk:v[1],n,pk:k,ti:q[0]}:{y:Y,g,sk:v[0],n,pk:k,ti:q[0]})}});
 for(let ti=0;ti<32;ti++){const nm=(sl,ty)=>uNm(rng((S.seed||1)*59+ti*97+sl*7+(Y>2025?Y:0))),r=rng((S.seed||1)*83+Y*17+ti*3),tv=(S.pro&&S.pro[ti]&&S.pro[ti].ovr)||75;
  if(!has.r.has(ti)){const yd=Math.round(420+r()*700+(tv-75)*12),at=Math.round(yd/(3.9+r()*.9));out.r.push({y:Y,g:13+(r()*5|0),at,yd,td:Math.round(yd/(110+r()*80)),n:nm(1),ti})}
  for(let j=has.w[ti]||0;j<2;j++){const yd=Math.round((j?380:620)+r()*520+(tv-75)*10);out.w.push({y:Y,g:14+(r()*4|0),rc:Math.round(yd/(11+r()*4)),yd,td:Math.round(yd/(140+r()*90)),n:nm(2+j),ti})}
  if(!has.d.has(ti))out.d.push({y:Y,g:14+(r()*4|0),sk:Math.round((3+r()*8)*2)/2,n:nm(5),ti});
  if(!has.b.has(ti)){const i=Math.floor(Math.pow(r(),1.6)*7);out.b.push({y:Y,g:14+(r()*4|0),in:i,tk:Math.round(48+r()*50),n:nm(6),ti})}}
 ['r','w'].forEach(k=>out[k].sort((a,b)=>b.yd-a.yd));out.d.sort((a,b)=>b.sk-a.sk);out.b.sort((a,b)=>b.in-a.in||b.tk-a.tk);return USC[Y]=out}
const uScS=(L,f)=>{if(f>=1)return L;const o={...L};['g','at','yd','td','rc','cy','ct','in','tk'].forEach(k=>{if(o[k]!=null)o[k]=Math.round(o[k]*f)});if(o.sk!=null)o.sk=Math.round(o.sk*f*2)/2;return o};
// ---------------- League stats screen ----------------
let LGS={lv:'p',y:0,pq:null};
const lgsB=()=>'<button class=g onclick="lgsV()">📊 League stats · pro & college</button>';
function lgsYears(lv){const y0=uY0(),cur=yrN(),st=S.stage||'hs',H=S.hist||[];let hi=cur;
 if(lv=='p'){if(st=='draft')hi=cur-1;else if(st=='pro'){const i=H.findIndex(x=>String(x.y)[0]=='P');hi=(i<0?cur:y0+i)-1}}
 else if(st!='hs'){const i=H.findIndex(x=>String(x.y)[0]=='C');hi=(i<0?cur:y0+i)-1}const L=[];for(let y=y0;y<=hi;y++)L.push(y);return L}
const lgsTh=(h)=>`<div class=row style="font-size:12px;opacity:.75;gap:4px"><span>${h[0]}</span><span style="display:flex;gap:6px;flex:none">${h.slice(1).map((x,i)=>`<span style="min-width:${i?28:44}px;text-align:right">${x}</span>`).join('')}</span></div>`;
const lgsTr=(nm,sub,v,click,hl)=>`<div class=row ${click?`onclick="${click}" `:''}style="font-size:15px;gap:6px;align-items:flex-start;${click?'cursor:pointer;':''}${hl?'background:#ffe93b1c;':''}"><span style="min-width:0;flex:1;overflow-wrap:anywhere">${nm}<br><small style="opacity:.8">${sub}</small></span><span style="display:flex;gap:6px;flex:none">${v.map((x,i)=>`<span style="min-width:${i?28:44}px;text-align:right">${x}</span>`).join('')}</span></div>`;
function lgsV(lv,y){if(lv)LGS.lv=lv;const Ys=lgsYears(LGS.lv);if(y)LGS.y=y;if(!Ys.includes(LGS.y))LGS.y=Ys[Ys.length-1];const Y=LGS.y,f=Y==null?1:uFrac(Y),cur=yrN(),pr=LGS.lv=='p';
 const tabs=`<p class=tabs><button class="${pr?'':'g'}" onclick="lgsV('p')">PFL</button><button class="${pr?'g':''}" onclick="lgsV('c')">College</button><button class=g onclick=rosv()>Your league</button></p>`,yrs=Ys.length?`<p class=tabs style="flex-wrap:wrap">${Ys.map(y=>`<button class="${y==Y?'':'g'}" onclick="lgsV(0,${y})">${y}${y==cur&&uFrac(y)<1?'*':''}</button>`).join('')}</p>`:'';
 let body='';if(!Ys.length)body=`<div class=card><small>${pr?'Your PFL seasons are under Rosters & stats.':'Your college seasons are under Rosters & stats.'}</small></div>`;
 else if(pr){const T=uPro(Y),ch=f>=1?uChamp(Y):null,P=T.flatMap(x=>x.q.map(q=>({q:uScale(q,f),ti:x.ti}))).filter(z=>z.q.a>0);
  const M=new Map();P.forEach(z=>{const k=z.q.qi!=null?'q'+z.q.qi:z.q.n+z.ti;const o=M.get(k);if(o){['g','c','a','yd','td','in','ry','rt'].forEach(s=>o.q[s]+=z.q[s]);o.tm.push(TA[z.ti])}else M.set(k,{q:{...z.q},tm:[TA[z.ti]],ti:z.ti})});
  const R=[...M.values()].sort((a,b)=>b.q.yd-a.q.yd),me=S.stage=='pro'?-1:null;
  body=`${f<1?`<div class=card><small>⏳ ${Y} season in progress: about week ${Math.max(1,Math.round(17*f))} of 17 (it moves along with your season).</small></div>`:''}${ch?`<div class=card><b>🏆 Ultra Bowl champion:</b> ${tn(S.pro[ch.ub])} <small>(beat the ${tn(S.pro[ch.ru])})</small><br><b>🏅 MVP:</b> ${ch.mvp!=null?QBX[ch.mvp][0]+' · '+TA[uMvpT(Y,ch.mvp)]:'—'}${Y<=2025?'<br><small>Real '+Y+' results, with your players.</small>':''}</div>`:''}
  <div class=card><b>Passing · ${Y}</b>${lgsTh(['QB','YDS','TD','INT'])}${R.map((z,i)=>lgsTr(`${i+1}. ${z.q.n}`,z.tm.join('/')+' · '+z.q.c+'/'+z.q.a+' · '+z.q.g+' G'+(z.q.real?' · real':''),[z.q.yd.toLocaleString(),z.q.td,z.q.in],z.q.qi!=null?`uCard(${z.q.qi})`:null)).join('')}<small>Tap a QB for his career. QBs you created use their real counterpart's ${Y<=2025?'stats and team':'ratings'}; everyone else is random.</small></div>${(()=>{const K=uSkill(Y),sk=(k,ttl,h,v,x)=>`<div class=card><b>${ttl} · ${Y}</b>${lgsTh(h)}${K[k].slice(0,15).map(L=>uScS(L,f)).map((L,i)=>lgsTr(`${i+1}. ${L.pk!=null?'⭐ ':''}${L.n}`,TA[L.ti]+(x?' · '+x(L):'')+' · '+L.g+' G'+(L.real?' · real':''),v(L),null,L.pk!=null)).join('')}</div>`;
  return sk('r','Rushing',['RB','YDS','TD'],L=>[L.yd.toLocaleString(),L.td],L=>L.at+' att')+sk('w','Receiving',['WR/TE','YDS','TD'],L=>[L.yd.toLocaleString(),L.td],L=>L.rc+' rec')+sk('d','Sacks',['DEF','SACKS'],L=>[L.sk])+sk('b','Interceptions',['DB','INT','TKL'],L=>[L.in,L.tk])+'<p><small>⭐ = stars you created (real '+Y+' numbers through 2025).</small></p>'})()}
  <div class=card><b>Standings · ${Y}</b>${[0,1,2,3,4,5,6,7].map(di=>`<p style="margin:8px 0 2px"><small><b>${(S.pro[di*4]&&S.pro[di*4].dv)||''}</b></small></p>`+T.slice(di*4,di*4+4).map(x=>({x,w:Math.round(x.w*f),l:Math.round(x.l*f),t:Math.round(x.t*f)})).sort((a,b)=>b.w-a.w).map(z=>`<div class=row style="font-size:15px"><span>${tn(S.pro[z.x.ti])}</span><b>${z.w}-${z.l}${z.t?'-'+z.t:''}</b></div>`).join('')).join('')}</div>`}
 else{const L=uCol(Y).map(q=>uScale(q,f)),top=L.slice(0,25),extra=L.slice(25).filter(q=>q.qi!=null||q.np!=null),hz=f>=1?uHz(Y):null,nc=RCH[Y]&&RCH[Y].nc?uSch(RCH[Y].nc):null;
  body=`${f<1?`<div class=card><small>⏳ ${Y} season in progress (it moves along with yours).</small></div>`:''}${f>=1&&(nc||hz)?`<div class=card>${nc?`<b>🏆 National champion:</b> ${nc.n}<br>`:''}${hz?`<b>🏅 Heisman Trophy:</b> ${hz.n} · ${schN(hz.sch)}`:''}${Y<=2025&&nc?'<br><small>Real '+Y+' champion.</small>':''}</div>`:''}
  <div class=card><b>Top passers · ${Y}</b>${lgsTh(['QB','YDS','TD','INT'])}${[...top,...extra].map((q,i)=>lgsTr(`${i<25?(i+1)+'. ':''}${q.qi!=null||q.np!=null?'⭐ ':''}${q.n}`,schN(q.sch)+' · '+q.c+'/'+q.a+(q.real?' · real':q.np!=null?' · named prospect':''),[q.yd.toLocaleString(),q.td,q.in],q.qi!=null?`uCard(${q.qi})`:null,q.qi!=null||q.np!=null)).join('')}<small>⭐ = future pros you created (real college numbers) and your named prospects.</small></div>`}
 ui.innerHTML=`<div><h2>📊 League stats</h2>${tabs}${yrs}${body}<button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
// one of your QBs: college and pro seasons so far
function uCard(qi){const q=QBX[qi],cur=yrN(),y0=uY0(),rows=[],C=uC()[qi]||[];C.forEach(L=>{if(L.y>cur||!(L.a>0))return;const t=uSch(L.tm),f=uFrac(L.y);if(f<=0)return;rows.push({y:L.y,tm:t?schN(t.n):L.tm,L:uScale(L,f),col:1,real:1})});
 for(let Y=Math.max(y0,uDeb(qi));Y<=cur;Y++){if(!lgsYears('p').includes(Y))continue;const f=uFrac(Y);if(f<=0)continue;uPro(Y).forEach(tm=>tm.q.forEach(L=>{if(L.qi===qi)rows.push({y:Y,tm:TA[tm.ti],L:uScale(L,f),real:L.real})}))}
 const age=q[2]-(2026-cur);
 ui.innerHTML=`<div><h2>${q[0]} #${QXN(qi)}</h2><p><small>QB${qi>=32?' (backup)':''} · ${tn(S.pro[QXT(qi)])} in 2026 · rating ${q[1]} · age ${age} in ${cur}</small></p><div class=card><b>Career</b>${lgsTh(['Season','YDS','TD','INT'])}${rows.map(r=>lgsTr(`${r.y} · ${r.tm}`,(r.col?'college':'PFL')+' · '+r.L.c+'/'+r.L.a+' · '+r.L.g+' G'+(r.real?' · real':' · simulated'),[r.L.yd.toLocaleString(),r.L.td,r.L.in])).join('')||'<p><small>No seasons yet.</small></p>'}</div><button class=g onclick="lgsV()">Back to league stats</button><button class=g onclick=hub()>Home</button></div>`;ui.scrollTop=0}
