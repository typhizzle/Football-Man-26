// Tyler 2026-11-16 second quick batch.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cam-cloud-2026-11-16';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
const hs=fs.readFileSync('/home/claude/specs/hs-save-2022.json','utf8'),sim=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const out=await pg.evaluate(async([docs,hs,sim])=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};save=()=>{};
 const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};const s=await cdGet2(d,'x/slot6');s.ro=await cdGet2(d,'x/ro6');
 // A: Tyler's Cam save: his team is the Charlotte Black Cats; no "Queens" left anywhere outside rosters
 S=mig(s);SLOT=6;o.A_team=tn(S.T[0]);o.A_blackCats=/Charlotte Black Cats/.test(o.A_team);const j=JSON.stringify({pro:S.pro,T:S.T,tx:S.tx,gp:S.gp,tw:S.tw});o.A_noQueens=!/Charlotte Queens/.test(j)&&!S.pro.some(t=>t.n==='Queens');
 // B: celebrities gone
 o.B_gone=!CELB.some(c=>CELGONE.includes(c[0]))&&CELB.length>20;
 // C: Mia: no numbers on the flirt button; asking for her number below 73 is a no; the number button is there
 const fr0=cfGet('rmia');S.mfl=null;talk('reporter','Reporter Mia · Post-game','How did it feel out there?','happy',[['Great','ovHide()']]);const bt=[...ov.querySelectorAll('button')].map(b=>b.textContent);o.C_btns=bt.join(' | ');o.C_noNumbers=bt.some(t=>t==='😏 Flirt with Mia')&&!bt.some(t=>/\/\d+/.test(t));o.C_numberBtn=bt.some(t=>/Stay connected/.test(t));
 S.cnum={};celNum('rmia');let has=false;try{has=phEns().c.some(x=>x.id==='cel:rmia')}catch(e){}o.C_noNumberBelow73=fr0<73?!has:true;
 // D: upgrading keeps the scroll position
 S.pts=50;hub();ui.scrollTop=400;const y0=ui.scrollTop;const k=Object.keys(S.q).find(k=>S.q[k]<qCap(k));up(k);o.D_scroll=y0>50&&Math.abs(ui.scrollTop-y0)<60;o.D_y=[y0,ui.scrollTop];
 // E: sub out up 32 with 6:08 left
 startGame0(1,'reg');ovHide();g.clk=3600-368;g.s=[32,0];let said='';const _t=talk;talk=function(w,nm,line){said=line;return _t.apply(this,arguments)};try{const bb=[...document.querySelectorAll('button')].find(x=>/Sub out|sub out/i.test(x.textContent));subReq()}catch(e){}talk=_t;o.E_said=said;o.E_subOk=!/Absolutely not/.test(said);
 // F: QB kneel is a visible phase that ends with the next snap
 startGame0(1,'reg');ovHide();g.ph='pre';g.y=50;g.dn=1;g.tg=10;setup(0);const dn0=g.dn;kneel();o.F_phase=g.ph==='kneel';let kneeled=false;for(let i=0;i<60&&g.ph==='kneel';i++){knTick(.05);try{sy(g.pl.qb,g.mj,0,1);if(g.pl.qb.m&&g.pl.qb.m.position.y<-.3)kneeled=true}catch(e){}}o.F_drawn=kneeled;o.F_done=g.ph!=='kneel'&&g.dn===dn0+1;
 // G: suffix names on the field: put Miguel Penits II at QB for the other team and set up a play
 const opp=g.oi;const L=rost('h.'+opp);const keep=L[0];L[0]={...keep,n:'Miguel Penits II'};g.ph='pre';setup(1);o.G_nm=g.pl.qb.nm;o.G_suffix=/PENITS II/.test(String(g.pl.qb.nm));L[0]=keep;o.G_nmLast=nmLast('Jacque Hilton III')==='HILTON III'&&nmLast('Odell Beckham Jr.')==='BECKHAM JR.';
 // H: high school has a shop
 S=mig(JSON.parse(hs));SLOT=3;hub();o.H_shopBtn=[...ui.querySelectorAll('button')].some(x=>/Shop/.test(x.textContent));try{shopV();o.H_shopOpens=/Shop/.test(ui.innerText)}catch(e){o.H_shopOpens=false;o.H_err=e.message}
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},[docs,hs,sim]);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
