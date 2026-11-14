s=open('g2.js').read()
rep=[("kind=(g&&g.kind)||'reg',title=(g&&g.title)||'';","kind=(g&&g.kind)||'reg';let title=(g&&g.title)||'';if(!title)try{title=gTitle(kind=='col'?'reg':kind)||''}catch(_){}"),
("mom=prev==null?'new to the board':prev>nr?'▲ up '+(prev-nr)+(prev-nr==1?' spot':' spots'):prev<nr?'▼ down '+(nr-prev)+(nr-prev==1?' spot':' spots'):'holding steady';","mom=prev==null?'New to the board':prev>nr?'▲ Up '+(prev-nr)+(prev-nr==1?' spot':' spots'):prev<nr?'▼ Down '+(nr-prev)+(nr-prev==1?' spot':' spots'):'Holding steady';"),
(" G.g.push({p:e.p?1:0,"," G.ft=G.ft||{};if(e.p&&!G.ft[st])G.ft[st]=gpTmK();\n G.g.push({p:e.p?1:0,"),
]
for a,b in rep:
  assert s.count(a)==1,a[:70];s=s.replace(a,b)
open('g2.js','w').write(s)
s=open('g2b.js').read()
rep=[("'That roster is a {mo}. Talent everywhere. I want to see {LN} carry it on a night the cast is off.'","'That roster is rated {mo}. Talent everywhere. I want to see {LN} carry it on a night the cast is off.'"),
("const sg=G.sig[id];if(sg&&sg.s==0&&Math.random()<.3)ln.push([id,'I said it before and I will say it again: \"'+sg.q+'\"','smug']);","const sg=G.sig[id];if(sg&&sg.s==0&&Math.random()<.3&&!!(GPSIG[sg.k]&&GPSIG[sg.k].pos)==pos)ln.push([id,'I said it before and I will say it again: \"'+sg.q+'\"','smug']);"),
(" if(gpS().n%3==0&&out[0])gpHL(out[0],'n',0,1);C.lg=out.slice(0,2)}"," {const G_=gpS(),k_=(out[0]||'').replace(/[\\d,]+/g,'#');if(out[0]&&G_.lgk!=k_){G_.lgk=k_;gpHL(out[0],'n',0,1)}}C.lg=out.slice(0,2)}"),
]
for a,b in rep:
  assert s.count(a)==1,a[:70];s=s.replace(a,b)
open('g2b.js','w').write(s)
s=open('g3.js').read()
rep=[
("chk:(c,s)=>{if(c.aw.some(a=>/: MVP$/.test(a)))return['wrong','won league MVP'];if(c.el&&c.tm&&c.tm!=s.tm&&c.g>=6)return['wrong','dominated on a brand-new team ('+c.tm+')'];",
 "chk:(c,s)=>{const ft=gpS().ft||{};if(c.aw.includes('MVP'))return['wrong','won league MVP'];if(c.el&&c.g>=6&&(c.st=='col'||c.st=='pro')&&ft[c.st]&&c.tm!=ft[c.st])return['wrong','dominated after moving to a brand-new team ('+c.tm+')'];"),
("(c.el&&c.tm!=s.tm&&c.g>=6)?['wrong','won big on a different team']:null},","(c.el&&c.g>=6&&(c.st=='col'||c.st=='pro')&&(gpS().ft||{})[c.st]&&c.tm!=(gpS().ft||{})[c.st])?['wrong','won big after changing teams']:null},"),
# no take gets settled in the same season it was made
("function gpSigCheck(aw){const G=gpS(),c=gpCtx(aw);Object.keys(G.sig).forEach(id=>{const s=G.sig[id];if(s.s)return;","function gpSigCheck(aw){const G=gpS(),c=gpCtx(aw);Object.keys(G.sig).forEach(id=>{const s=G.sig[id];if(s.s||s.yr>=yrN())return;"),
("['ring','big','carry'].forEach(k=>{const id=GPSIG[k].by,s=G.sig[id];if(!s||s.s||s.k!=k)return;","['ring','big','carry'].forEach(k=>{const id=GPSIG[k].by,s=G.sig[id];if(!s||s.s||s.k!=k||s.yr>=yrN())return;"),
# grading: collect and air one combined segment per batch
("function gpGrade(k,fn){const G=gpS(),out=[];","function gpGrade(k,fn,quiet){const G=gpS(),out=[];"),
(" const rt=out.filter(p=>p.r),wr=out.filter(p=>!p.r);if(rt.length)"," if(quiet)return out;gpAir(out);return out}\nfunction gpAir(out){const rt=out.filter(p=>p.r),wr=out.filter(p=>!p.r);if(rt.length)"),
("Swing and a miss.','smug'])});return out}","Swing and a miss.','smug'])})}"),
(" if(st=='col'){gpGrade('heis',p=>{const won=aw.includes('Heisman Trophy'),fin=won||aw.includes('Heisman finalist');return p.a?won:!fin});gpGrade('cfp',p=>{const inn=!!(S.cb&&S.cb.sd&&S.cb.sd.includes(0));return p.a?inn:!inn})}\n if(st=='pro'){const inn=!!(S.pb&&S.pb.sd&&[...(S.pb.sd.AFC||[]),...(S.pb.sd.NFC||[])].includes(0));gpGrade('po',p=>p.a?inn:!inn);gpGrade('roy',p=>{const w=aw.includes('Offensive Rookie of the Year');return p.a?w:!w});gpGrade('mvp',p=>aw.includes('MVP'));if(S.py>=6)gpGrade('bust',p=>false)}",
 " const gr=[];if(st=='col'){gr.push(...gpGrade('heis',p=>{const won=aw.includes('Heisman Trophy'),fin=won||aw.includes('Heisman finalist');return p.a?won:!fin},1),...gpGrade('cfp',p=>{const inn=!!(S.cb&&S.cb.sd&&S.cb.sd.includes(0));return p.a?inn:!inn},1))}\n if(st=='pro'){const inn=!!(S.pb&&S.pb.sd&&[...(S.pb.sd.AFC||[]),...(S.pb.sd.NFC||[])].includes(0));gr.push(...gpGrade('po',p=>p.a?inn:!inn,1),...gpGrade('roy',p=>{const w=aw.includes('Offensive Rookie of the Year');return p.a?w:!w},1),...gpGrade('mvp',p=>aw.includes('MVP'),1));if(S.py>=6)gr.push(...gpGrade('bust',p=>false,1))}gpAir(gr);"),
]
for a,b in rep:
  assert s.count(a)==1,a[:70];s=s.replace(a,b)
s=s.replace("ln:rt.slice(0,2).map(p=>[p.by,gpPick(","ln:rt.slice(0,3).map(p=>[p.by,gpPick(")
open('g3.js','w').write(s)
print('ok')
