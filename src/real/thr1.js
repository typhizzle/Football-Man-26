// Throwing power system (Tyler 2026-11-14). Fails on V244: 99 power reached 68 yds, not 85.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');const raw=JSON.parse(j);
const ovr0={},dup={};Object.values(raw.ro).forEach(L=>Array.isArray(L)&&L.forEach(x=>{if(x&&x.n){if(x.n in ovr0)dup[x.n]=1;ovr0[x.n]=x.ovr}}));Object.keys(dup).forEach(n=>delete ovr0[n]);
const r=await pg.evaluate(async(j,ovr0)=>{const out={};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 const at=(p,st)=>{const o=S.stage,q=S.q.pow;S.stage=st;S.q.pow=p;const v=thrR();S.stage=o;S.q.pow=q;return Math.round(v*10)/10};
 out.A_pro99=at(99,'pro');{const o=S.q.pow,st=S.stage;S.q.pow=99;S.stage='pro';out.F_mid=Math.round(thrD(.59)*10)/10;out.F_full=Math.round(thrD(1)*10)/10;S.q.pow=o;S.stage=st}
 out.F_slingUsesIt=String(typeof slt!='undefined'?slt:'').includes('thrD')||document.documentElement.innerHTML.includes('thrD(slPow(m))');out.A_pro96=at(96,'pro');out.A_pro82=at(82,'pro');out.A_pro72=at(72,'pro');out.A_col99=at(99,'col');out.A_hs99=at(99,'hs');
 const all=[];sealWalk(S,x=>all.push(x));const f=n=>all.find(x=>x.n===n);
 out.B_hilton=f('Jacque Hilton III')&&[f('Jacque Hilton III').pw,f('Jacque Hilton III').pwy];
 out.B_fallon=f('Jarsh Fallon')&&[f('Jarsh Fallon').pw,f('Jarsh Fallon').pwy];out.B_williams=f('Mallet Williams')&&[f('Mallet Williams').pw,f('Mallet Williams').pwy];
 out.B_ovrUnchanged=all.filter(x=>ovr0[x.n]!=null&&x.ovr!==ovr0[x.n]).map(x=>x.n).slice(0,5);
 // upgrade costs by archetype
 const cost=(arch,k)=>{S.arch=arch;S.pts=100;S.q[k]=70;const p=S.pts;up(k);return p-S.pts};
 out.C_mobile={mob:cost('Mobile','mob'),pow:cost('Mobile','pow'),acc:cost('Mobile','acc')};
 out.C_deep={pow:cost('Deep passer','pow'),mob:cost('Deep passer','mob')};
 out.C_fg={acc:cost('Field General (balanced)','acc'),mob:cost('Field General (balanced)','mob'),pow:cost('Field General (balanced)','pow')};
 out.C_scr={pow:cost('Scrambling strong arm','pow'),mob:cost('Scrambling strong arm','mob'),acc:cost('Scrambling strong arm','acc')};
 // power/speed never drop at the level-change rescale
 S.q={acc:90,pow:89,awr:88,mob:84,sec:80,trk:80};rescaleTo(60);out.D_afterRescale=JSON.stringify(S.q);out.D_ovr=qo(S.q);
 out.D_kept=S.q.pow===89&&S.q.mob===84;
 // the card shows the arm
 let ci=-1,cj=-1;for(let i=0;i<S.T.length;i++){const k=rost('h.'+i).findIndex(x=>x&&x.n==='Jarsh Fallon');if(k>=0){ci=i;cj=k;break}}
 pCard(ci,cj);out.E_card=/Throw power 98 · max 83 yds/.test(ui.innerText||'');
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j,ovr0);
r.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);
console.log(JSON.stringify(r,null,1));await b.close()})();
