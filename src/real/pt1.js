// Tyler 2026-11-14: potentials random per save, fixed for the career, hidden until someone studies the player
// (you: 3 a week; CPU coaches draft on their own guesses unless they studied him).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PT_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));save=()=>{};
 const L=rost('h.1'),x=L.find(p=>p&&p.pot!=null);o.name=x&&x.n;
 o.A_hidden=potVis(x)==='?';
 pCard(1,L.indexOf(x));o.A_cardHidden=/\/\? OVR/.test(ui.innerHTML);o.A_button=!!ui.querySelector('[data-potst]');
 potStudy(1,L.indexOf(x));o.A_cardShows=new RegExp('/'+x.pot+' OVR').test(ui.innerHTML)&&potVis(x)===String(x.pot);
 // 3 a week, then none until next week
 const others=L.filter(p=>p&&p.pot!=null&&p!==x).slice(0,4);const r=others.map(p=>potLearn(p.n));o.A_week=r.join(',');o.A_limit=r[0]==='ok'&&r[1]==='ok'&&r[2]==='out';
 S.wk=(S.wk||0)+1;o.A_nextWeek=potLearn(others[3].n)==='ok';
 // B: roster list hides unknown potentials
 const html=rosT(2)||ui.innerHTML;o.B_rosterHidden=/\/\?/.test(ui.innerHTML);
 // C: CPU coaches: about a third known exactly, the rest off by up to 10 (x weight), fixed per team, different between teams
 const P=lgClass(2040);let z=0,mx=0,diff=0,unst=0;P.slice(0,120).forEach(p=>{const a=potKnowAdj('KC',p,1),b2=potKnowAdj('KC',p,1),c=potKnowAdj('NYG',p,1);if(a===0)z++;mx=Math.max(mx,Math.abs(a));if(a!==b2)unst++;if(a!==c)diff++});
 o.C_known=z;o.C_third=z>25&&z<60;o.C_max10=mx<=10;o.C_stable=unst===0;o.C_teamsDiffer=diff>40;
 // D: potential stays put as he ages (old code shrank it from 30 on)
 const y={n:'Test Vet',pos:'WR',ovr:80,pot:92,age:30};for(let i=0;i<4;i++)cpuDev(y,8);o.D_pot=y.pot;o.D_fixed=y.pot===92;o.D_ovr=y.ovr;
 // E: a new save rolls new potentials (seeded per save)
 const s0=S.seed;S.seed=111;const a1=npxPot({n:'Same Guy',T:70});S.seed=222;const a2=npxPot({n:'Same Guy',T:70});S.seed=333;const a3=npxPot({n:'Same Guy',T:70});S.seed=s0;o.E_perSave=new Set([a1,a2,a3]).size>=2;
 // F: the draft board and draft history use the hidden view
 const H_=document.documentElement.innerHTML;o.F_board=H_.includes("potVis(q,1)")&&H_.includes('potVis(p):p.pot}</small>');o.F_cpuGuess=H_.includes("potKnowAdj(T.code||T.i,p,.45)")&&H_.includes("potKnowAdj(ti,x.p,.35)");
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
