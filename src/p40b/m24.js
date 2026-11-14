
// ---------------- V44 batch 1 helpers ----------------
// injuries can be switched off (clears every current injury)
function injToggle(){S.noInj=!S.noInj;if(S.noInj)injClear();save();settings()}
// watch any game while you're hurt (your backup plays; you can watch or sim each drive)
function injWatch(){S.gsave=null;const st=S.stage||'hs';let e,k;if(st=='pro'){e=pevt();k=e.t}else if(st=='col'){e=cevt();k=e.t=='reg'?'col':e.t}else{e=evt();k=e.t}
 if(!e||e.o==null){return play()}S._iw=1;save();startGame(e.o,k)}
const injWB=()=>injOut()?'<button class=g onclick=injWatch()>📺 Watch the game (you are hurt)</button>':'';
// a game left in the middle: Play picks it up instead of starting over
const gsOk=()=>{const s=S&&S.gsave;return !!(s&&s.stage==(S.stage||'hs')&&S.T&&S.T[s.oi])};
const gsLbl=()=>{const s=S.gsave,q=Math.min(4,Math.floor(s.clk/900)+1);return '▶ Resume game ('+s.s[0]+'–'+s.s[1]+', Q'+q+')'};
// enrolling: your commitment is always on the list (first), every offer is listed, and you confirm
function enrollAsk(n){const c=S.commit;ovShow(`<h2>Enroll at ${n}?</h2><p>${c&&c!=n?'You are committed to <b>'+c+'</b>. Enrolling somewhere else breaks that commitment.':'This is where you will start your college career.'}</p><button onclick="ovHide();enroll('${q_(n)}')">Yes, enroll</button><button class=g onclick=ovHide()>Not yet</button>`)}
function colPick(){const all=(S.col||[]).flatMap((c,ci)=>c.t.map((t,ti)=>({t,ci,ti,c})));let L=offSort([...(S.off||[])]);
 if(S.commit&&!L.some(o=>o.n==S.commit)){const x=all.find(z=>z.t.n==S.commit);if(x)L.unshift({n:x.t.n,ovr:x.t.ovr,conf:x.c.n,ci:x.ci,ti:x.ti,pay:S.cpay||0})}
 if(S.commit){const i=L.findIndex(o=>o.n==S.commit);if(i>0)L.unshift(L.splice(i,1)[0])}return L}
let SDT=1;
function lrGameNext(){try{const st=S.stage||'hs',e=st=='pro'?pevt():st=='col'?cevt():evt();return !!e&&e.o!=null&&!['sum','bye','fa','ret','cfpbye','ppbye','comp'].includes(e.t)}catch(e){return false}}
