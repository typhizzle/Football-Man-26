// COLLEGE TO THE PROS (Tyler 2026-11-14: "make sure it goes the same from high school to college throughout").
// Plays a real college save to the draft and into the pros, then a pro season and the next offseason draft.
// Every check CAN fail; all fail on V259 (draft classes were invented names).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.DR_FILE});const j=fs.readFileSync('/home/claude/specs/col-save-2026.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};TKGO=1;
 S=mig(JSON.parse(j));SLOT=1;LASTJ='';
 // finish college: close this season (records it), then the last one
 colNext();S.cy=4;colNext();
 if(typeof pcDraftPool!='function'){o.err='draft classes are not real college players';return o}
 const pool=pcDraftPool();o.poolSize=pool.length;
 draftStart();const D=S.dr;o.A_realProspects=D.real||0;
 const realP=D.P.filter(p=>p.pid);o.A_boardIsReal=realP.length>=150;
 o.A_ratingsKept=D.P.filter(p=>!p.me).every(p=>p.ovr>=40&&p.ovr<=91);
 // run the draft
 let g=0;while(D.pk<224&&g++<400){dPick()}
 const me=D.mine||{ti:1,pk:200};proStart(me.ti,me.pk);o.stage=S.stage;
 // every real prospect who was drafted is on the roster of the team that drafted him, same id
 let onTeam=0,wrong=0,drafted=0;D.picks.forEach(k=>{const q=D.P[k.pi];if(!q.pid||q.me||(S.pc.p[q.pid]||{}).gen)return;drafted++;const T=S.pro[k.ti];const ti=S.T.indexOf(T);const L=rost('h.'+ti);if(L.some(x=>x&&x.pid===q.pid&&x.n===q.n))onTeam++;else{let found=false;S.T.forEach((t,i)=>{if(rost('h.'+i).some(x=>x&&x.pid===q.pid))found=true});if(found)wrong++}});
 o.B_drafted=drafted;o.B_onDraftingTeam=onTeam;o.B_allThere=onTeam===drafted&&drafted>0;o.B_onWrongTeam=wrong;
 // his pro card shows his college seasons
 let shown=0,checked=0;for(let i=0;i<S.T.length&&checked<10;i++){const L=rost('h.'+i);L.forEach((x,k)=>{if(checked>=10||!x||!x.pid||!(S.pc.p[x.pid]&&S.pc.p[x.pid].r.some(q=>q[1]==='col')))return;checked++;pCard(i,k);const t=ui.innerText||'';const e=S.pc.p[x.pid];if(t.includes('High school & college record')&&t.includes(e.r.filter(q=>q[1]==='col').slice(-1)[0][2])&&/drafted/.test(t))shown++})}
 o.C_cardsChecked=checked;o.C_cardsShowCollege=checked>0&&shown===checked;
 // undrafted prospects are on the record, not erased
 const und=D.P.filter(p=>p.pid&&!p.tk&&!p.me);o.D_undrafted=und.length;o.D_undraftedRecorded=und.every(p=>S.pc.p[p.pid].o.some(q=>q[1]==='not drafted'));
 // E: the next pro draft: the college players whose class leaves that year come out, with their college record
 const left=Object.keys(S.pc.p).filter(id=>{const e=S.pc.p[id];return pcDraftYear(e)});o.E_stillInCollege=left.length;
 let guard=0;while(guard++<200){const e=pevt();if(e.t=='pro'||e.t=='pp')psim(e);else if(e.t=='bye')pWeek(null);else if(e.t=='ppbye')ppAdv(0);else if(e.t=='fa')S.fa=null;else if(e.t=='sum'){if(!S.psum)mkPsum();break}else break}
 pNext();const Y=yrN();try{if(!(S.dc&&S.dc[Y]&&S.dc[Y].done))lgDraft()}catch(e){o.lgErr=e.message}
 const dc=S.dc&&S.dc[Y];o.E_year=Y;o.E_picks=dc?dc.picks.length:0;
 let rp=0;const ex=[];(dc&&dc.picks||[]).forEach(p=>{let x=null;S.T.forEach((t,i)=>{rost('h.'+i).forEach(y=>{if(y&&y.n===p.n&&y.dr&&y.dr.y===Y)x=y})});if(x&&x.pid&&S.pc.p[x.pid]&&S.pc.p[x.pid].r.some(q=>q[1]==='col')){rp++;if(ex.length<3)ex.push(p.n+' ('+p.col+') → '+p.tm)}});
 o.E_realPicks=rp;o.E_examples=ex;o.E_classIsReal=rp>=100;
 // F: nobody removed from the record along the way
 o.F_records=Object.keys(S.pc.p).length;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,5).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
