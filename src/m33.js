
// ===================== real-life college careers for the named prospects (as of the 2026 season = your freshman year) =====================
// yc: year in college during your freshman season · rs: has used a redshirt · st: recruiting stars · s: real seasons [year, team, line]
const NPXR={
'Jeremy Smothers':{yc:3,st:5,s:[[2024,'Ohio State','76 rec, 1,315 yds, 15 TD (16 G)'],[2025,'Ohio State','87 rec, 1,243 yds, 12 TD (13 G)']]},
'Archer Manling':{yc:4,rs:1,st:5,s:[[2023,'Texas','Redshirt · 2/5, 30 yds (2 G)'],[2024,'Texas','61/90, 939 yds, 9 TD, 2 INT · 108 rush yds, 4 TD'],[2025,'Texas','248/404, 3,163 yds, 26 TD, 7 INT · 399 rush yds, 10 TD']]},
'Darnold Mansion':{yc:4,rs:1,st:3,s:[[2023,'Tulane','Redshirt'],[2024,'Tulane','189/287, 2,723 yds, 22 TD, 6 INT'],[2025,'Duke','334/500, 3,973 yds, 34 TD, 6 INT']]},
'Juan MaDeer':{yc:5,rs:1,st:3,s:[[2022,'Washington State','Redshirt · 2/2, 32 yds, 1 TD'],[2023,'Washington State','13/17, 235 yds, 2 TD · 92 rush yds, 3 TD'],[2024,'Washington State','224/347, 3,139 yds, 29 TD, 7 INT · 826 rush yds, 15 TD'],[2025,'Oklahoma','247/397, 2,885 yds, 14 TD, 11 INT · 431 rush yds, 8 TD']]},
'Bruce Undertree':{yc:2,st:5,s:[[2025,'Michigan','202/335, 2,428 yds, 11 TD, 9 INT · 392 rush yds, 6 TD']]},
'Watchu BiSayin':{yc:3,rs:1,st:5,s:[[2024,'Ohio State','Redshirt · 5/12, 84 yds, 1 TD'],[2025,'Ohio State','301/391, 3,610 yds, 32 TD, 8 INT · 12-2 as a starter']]},
'Charles Beckham':{yc:3,st:3,s:[[2024,'Indiana','12 G, special teams · 1 rush TD'],[2025,'Indiana','34 rec, 679 yds, 4 TD (20.0 per catch)']]},
'Ruger Nash':{yc:5,rs:1,st:5,s:[[2022,'Georgia','Redshirt'],[2023,'Georgia','12/19, 148 yds, 2 TD, 1 INT'],[2024,'Georgia','45/64, 440 yds, 1 TD, 1 INT'],[2025,'Georgia','269/386, 2,894 yds, 24 TD, 5 INT · 462 rush yds, 10 TD']]},
'Delonte Less':{yc:4,rs:1,st:5,s:[[2023,'UCLA','114/213, 1,610 yds, 11 TD, 9 INT'],[2024,'Oregon','Redshirt · 7/8, 49 yds'],[2025,'Oregon','296/412, 3,565 yds, 30 TD, 10 INT · 13-2 as a starter']]},
'Kiwi Langfield':{yc:3,st:4,s:[[2024,'Missouri','23 car, 104 yds (6 G)'],[2025,'Ole Miss','306 car, 1,567 yds, 24 TD · 29 rec, 177 yds']]},
'Wun-in-da Chamba':{yc:6,rs:1,st:0,s:[[2021,'Ferris State (D-II)','Redshirt'],[2022,'Ferris State (D-II)','Did not play (illness)'],[2023,'Ferris State (D-II)','21/33, 354 yds, 5 TD · 304 rush yds, 4 TD'],[2024,'Ferris State (D-II)','226/367, 2,925 yds, 26 TD, 6 INT · 1,019 rush yds, 25 TD'],[2025,'Ole Miss','294/445, 3,937 yds, 22 TD, 3 INT · 527 rush yds, 8 TD']]},
'DJ Suspense':{yc:3,rs:1,st:4,s:[[2024,'Notre Dame','Redshirt (1 G)'],[2025,'Notre Dame','195/293, 2,741 yds, 24 TD, 6 INT · 10-2 as a starter']]},
'Kashon Tripdub':{yc:2,rs:1,st:5,s:[[2025,'Alabama','Redshirt · 11/15, 143 yds, 2 TD (2 G)']]},
'Jordan Tua':{yc:5,rs:1,st:3,s:[[2022,'UNLV','Redshirt'],[2023,'UNLV','224/353, 3,085 yds, 17 TD, 10 INT'],[2024,'USC','101/169, 1,201 yds, 11 TD, 6 INT'],[2025,'USC','265/403, 3,711 yds, 24 TD, 10 INT']]},
'Jarvis Hooters':{yc:5,rs:1,st:3,s:[[2022,'TCU','Redshirt · 1/1, 2 yds'],[2023,'TCU','185/298, 2,206 yds, 15 TD, 9 INT'],[2024,'TCU','313/471, 3,949 yds, 27 TD, 11 INT'],[2025,'TCU','272/413, 3,472 yds, 29 TD, 13 INT']]},
'Dill Rolley':{yc:3,rs:1,st:5,s:[[2024,'Nebraska','275/410, 2,819 yds, 13 TD, 11 INT'],[2025,'Nebraska','181/250, 2,000 yds, 18 TD, 6 INT (9 G, injured)']]},
'Jade Ball':{yc:3,st:4,s:[[2024,'Florida','673 rush yds, 7 TD (true freshman)'],[2025,'Florida','220 car, 1,170 yds, 8 TD']]},
'Andrew Messmaker':{yc:3,rs:1,st:0,s:[[2024,'North Texas','Walk-on · 30/46, 462 yds, 2 TD, 2 INT'],[2025,'North Texas','319/463, 4,379 yds, 34 TD, 9 INT']]},
'Femmifer Coleman':{yc:3,st:5,s:[[2024,'Alabama','48 rec, 865 yds, 8 TD'],[2025,'Alabama','49 rec, 689 yds, 4 TD']]},
'Marshawn Redd':{yc:4,rs:1,st:4,mob:1,ret:.85,s:[[2023,'Texas A&M','Redshirt · 21/36, 374 yds, 1 TD (3 G)'],[2024,'Texas A&M','147/240, 1,864 yds, 15 TD, 6 INT · 543 rush yds, 7 TD'],[2025,'Texas A&M','234/377, 3,169 yds, 25 TD, 12 INT · 493 rush yds, 6 TD']]},
'Ham Leaver':{yc:4,rs:1,st:4,s:[[2023,'Michigan State','Redshirt · 15/23, 139 yds, 2 TD'],[2024,'Arizona State','216/350, 2,885 yds, 24 TD, 6 INT · 11-2 as a starter'],[2025,'Arizona State','145/239, 1,628 yds, 10 TD, 3 INT (7 G)']]}};
// the class label: years on campus, minus a redshirt year
function npxCls(p,cl_){const o=NPXR[p.n];if(!o)return p.rs&&cl_>=2?'RS '+CLS[cl_-2]:CLS[cl_-1];const yc=cl_+(o.yc-((p.off||0)+1));if(yc>=6)return '6th-year Sr';const e=Math.max(1,Math.min(4,yc-(o.rs&&yc>=2?1:0)));return (o.rs&&yc>=2?'RS ':'')+CLS[e-1]}
// real seasons that have already been played on this save's calendar
function npxRealTxt(p){const o=NPXR[p.n];if(!o||!o.s||npxAt(p).lv=='hs')return '';const sh=((S.y0||2022)+4)-2026,st_=S.stage||'hs',now=st_=='draft'||st_=='pro'?9999:(S.y0||2022)-1+(st_=='hs'?Math.min(S.yr||1,4):4+Math.min(S.cy||1,4));const L=o.s.filter(z=>z[0]+sh<now);if(!L.length)return '';
 return `<details style="margin-top:2px"><summary style="font-size:13px;opacity:.8">College career so far</summary>${L.map(z=>`<div style="font-size:13px">'${String(z[0]+sh).slice(2)} ${z[1]}: ${z[2]}</div>`).join('')}</details>`}
// set every prospect to his real class (runs once per data version, skips anyone already drafted)
function npxReal(){if(!S||!S.npx||S.npR===3)return;S.npx.forEach(p=>{if(p.pro)return;const z=NPX0.find(q=>q[0]==p.n),o=NPXR[p.n];if(z){p.off=z[5];if(p.pos!=z[1]||p.sk!=z[2]){const sc=NSCH[z[2]];p.pos=z[1];if(sc){p.sk=z[2];p.cn=sc[0];p.sch=sc[2]}}}if(o)p.rs=o.rs?1:0});S.npR=3}

// a redshirt with eligibility left who usually comes back for one more year
const npxRet=p=>(NPXR[p.n]||{}).ret||0;
