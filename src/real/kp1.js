// A SAVE NEVER GOES BACKWARDS (Tyler 2026-11-14: "every season saves exactly the week that it's at ...
// even in future updates" / "Fix it"). Replays what lost his year 8: the game saved 2036, then something
// wrote an older 2035 copy straight over the slot. Every check CAN fail; all fail on V 0.0.1.0003.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};
 for(const k of Object.keys(localStorage))localStorage.removeItem(k);
 if(typeof kpAll=='function'){for(const x of await kpAll())await kpDel(x.id)}
 const base=await readCode(j);const cp=x=>JSON.parse(JSON.stringify(x));
 const A=cp(base);A.wk=12;const Bk=cp(base);Bk.wk=18;const C=cp(base);C.hist=[...C.hist,{y:'P7',g:17,w:9,l:8,td:41}];C.wk=3;
 const put=s=>{S=cp(s);SLOT=4;LASTJ='';save();zFlush()};
 const info=()=>{try{zFlush()}catch(e){}const f=bkInfo(localStorage.getItem(K+'_4'));return f?f.yr+' wk'+f.wk:null};
 put(A);put(Bk);put(C);o.played=info();
 // the old cloud restore: an older copy written straight into the slot
 localStorage.setItem(K+'_4',ez(JSON.stringify(Bk)));o.afterOverwrite=info();
 if(typeof kpFlush=='function')await kpFlush();
 const L=typeof kpAll=='function'?await kpAll():[];
 const top=L.find(x=>x.id==='top_4');o.A_furthestKept=!!top&&top.m.yr===2036&&top.m.wk===4;
 o.D_seasonEndKept=L.some(x=>String(x.id).startsWith('end_4_2035'));
 menuMain();o.B_menuWarns=!!ui.querySelector('[data-kpw="4"]')&&/2036 week 4/.test(ui.querySelector('[data-kpw="4"]').innerText);
 bkV();await new Promise(r=>setTimeout(r,400));o.C_restoreListsIt=/furthest you reached/.test(ui.innerText)&&/2036 · week 4/.test(ui.innerText);
 if(typeof kpUse=='function'){await kpUse('top_4');await kpFlush()}o.C_restored=info()==='2036 wk4';
 o.C_olderKeptToo=(await (typeof kpAll=='function'?kpAll():[])).some(x=>String(x.id).startsWith('pre_4_')&&x.m.yr===2035&&x.m.wk===19);
 menuMain();o.C_warningGone=!ui.querySelector('[data-kpw="4"]');
 // a new career in another slot: no false alarm
 const N=cp(base);N.name='Brand New';N.hist=[];N.wk=0;S=N;SLOT=5;LASTJ='';save();zFlush();N.wk=5;S=N;LASTJ='';save();zFlush();menuMain();o.F_noFalseAlarm=!ui.querySelector('[data-kpw]');
 // cost of the guard on a normal save
 S=JSON.parse(dz(localStorage.getItem(K+'_4')));SLOT=4;let t0=performance.now();for(let k=0;k<10;k++){S.wk=3+(k%2);LASTJ='';save();zFlush()}o.G_msPerSave=Math.round((performance.now()-t0)/10);
 S.wk=3;LASTJ='';save();zFlush();
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
// E: the page is reloaded (what an update does): the slot is exactly where it was
await pg.reload();await wait(2500);
out.E_afterReload=await pg.evaluate(()=>{const f=bkInfo(localStorage.getItem(K+'_4'));return f?f.yr+' wk'+f.wk:null});
out.E_sameAfterUpdate=out.E_afterReload==='2036 wk4';
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);
const pass=['A_furthestKept','B_menuWarns','C_restoreListsIt','C_restored','C_olderKeptToo','C_warningGone','D_seasonEndKept','E_sameAfterUpdate','F_noFalseAlarm'].every(k=>out[k]===true)&&out.G_msPerSave<(+process.env.KP_BASE||120)&&!out.err&&!out.pageErrors.length;
out.pass=pass;console.log(JSON.stringify(out,null,1));await b.close()})();
