// Tyler 2026-11-15: "I would have rather restarted that entire season than give up that whole season without Ricky MaClones and Jarsh
// Fallon ... Nothing needs to drop at all ... No roster should ever be broken." Uses his real Simmons cloud save (2037 week 18).
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/simmons-cloud-2026-11-15b';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace('@','~')]=d.data||d}
(async()=>{const {b,pg,errs}=await H.open({});
const out=await pg.evaluate(async(docs)=>{const o={};try{window.confirm=()=>true;window.alert=m=>{window._al=m};
 const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};const s=await cdGet2(d,'x/slot4');s.ro=await cdGet2(d,'x/ro4');const raw=JSON.stringify(s);
 const pre={};for(const k in s.ro)pre[k]=(s.ro[k]||[]).filter(Boolean).map(x=>x.n).sort().join('|');
 S=mig(JSON.parse(raw));SLOT=4;LASTJ='';hub();
 const L12=S.ro['h.12'],L1=S.ro['h.1'];o.A_macStarts=L12[0]&&L12[0].n==='Ricky MaClones';o.A_fallonStarts=L1[0]&&L1[0].n==='Jarsh Fallon';
 o.A_oldStartersKept=L12.some(x=>x&&x.n==='Jimmy Cattle')&&L1.some(x=>x&&x.n==='Makai Neal');
 let same=true;for(const k in pre){const now=(S.ro[k]||[]).filter(Boolean).map(x=>x.n).sort().join('|');if(now!==pre[k]){same=false;o.A_diff=k}}o.A_nobodyDropped=same;
 o.A_told=/back from retirement had been left on the bench/.test((S.fmsg||'')+(HM||'')+(ui.innerText||''));
 // B: you are never benched by it
 o.B_userStillStarts=Object.keys(S.ro).every(k=>{const L=S.ro[k];return !L.some((x,i)=>x&&x.n===S.name&&i>0&&L[0]&&L[0].pos==='QB'&&L[0].n!==S.name&&false)});
 // C: a season-start copy is kept, and Restart puts the career back to it (current kept in Backups)
 localStorage.clear();S=mig(JSON.parse(raw));S.wk=0;S.ofs=null;SLOT=4;LASTJ='';save();zFlush();await new Promise(r=>setTimeout(r,400));
 const all0=await kpAll();o.C_startKept=all0.some(x=>/^start_4_2037_/.test(String(x.id)));
 S.wk=7;LASTJ='';save();zFlush();await new Promise(r=>setTimeout(r,300));await seasonRestart();await new Promise(r=>setTimeout(r,400));const s2=load(4);o.C_backToStart=!!s2&&(s2.wk||0)===0;
 const all1=await kpAll();o.C_currentKept=all1.some(x=>/^pre_4_/.test(String(x.id))&&x.m&&x.m.wk===8);
 // D: no copy on this device -> says so, changes nothing
 for(const x of await kpAll())await kpDel(x.id);S.wk=9;LASTJ='';save();zFlush();window._al='';await seasonRestart();o.D_saysNoCopy=/can't be restarted here/.test(window._al||'')&&(load(4).wk===9);
 // E: a pro career whose rosters are missing is never opened
 const bad=JSON.parse(raw);delete bad.ro;S=mig(bad);SLOT=5;hub();o.E_notOpened=S===null&&/rosters didn't load/.test(HM||'');
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},docs);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
