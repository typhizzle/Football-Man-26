// ===================== ✏️ PLAYER EDITOR (Settings → Allow player editing) =====================
// looks you set override the built-in ones
(()=>{const _a=plAp;plAp=function(n,d){const r=_a.apply(this,arguments);try{const o=S&&S.pled&&S.pled[n];if(o)return{...r,...o}}catch(e){}return r}})();
(()=>{const _k=plSkinOf;plSkinOf=function(o){try{const e=S&&S.pled&&S.pled[o.fn||o.n];if(e&&e.sk!=null)return SK[e.sk]}catch(_){}return _k.apply(this,arguments)}})();
// renames carry over everywhere (rosters, stars, backups, contracts)
function plRenApply(){try{if(!S||!S.pren)return;for(const o in S.pren){const n=S.pren[o];PKS.forEach(q=>{if(q[2]==o)q[2]=n});QBB.forEach(b=>{if(b[0]==o)b[0]=n});QBP.forEach(q=>{if(q[0]==o)q[0]=n});if(PKC[o]&&!PKC[n])PKC[n]=PKC[o];if(PLK[o]&&!PLK[n])PLK[n]=PLK[o]}}catch(e){}}
(()=>{const _p=pkRen;pkRen=function(){try{plRenApply()}catch(e){}return _p.apply(this,arguments)}})();
// rebuild career totals from season rows
function plRecalc(x){const g=SG(x.pos);x.cs={};x.tm=[];(x.h||[]).forEach(r=>{csAdd(x,g,r.slice(2));tmAdd(x,r[1])});x.ny=(x.h||[]).length}
// younger: his first seasons are gone; older: he gets earlier seasons he "already played"
function plAge(x,ti,na){const d=na-(x.age||25);if(!d)return;const g=SG(x.pos);x.h=x.h||[];
 if(d<0){x.h=x.h.slice(Math.min(x.h.length,-d))}
 else{const y0=x.h.length?x.h[0][0]:yrN()-1,pi=x.h.length?x.h[0][1]:ti,rr=rng((S.seed||1)+hsh(x.n)),add=[];for(let k=d;k>=1;k--){const age=na-(x.h.length)-k,o=cl(Math.round(x.ovr-Math.max(0,27-age)*1.5),45,99),v=sVals(g,o,17,g=='q'?1:.9,rr,(x.rs||0));add.push([y0-k,pi,...v])}x.h=add.concat(x.h)}
 x.age=na;plRecalc(x)}
const PE_SKN=['Light','Fair','Tan','Brown','Dark','Deep'],PE_HRN=['Bald','Short','Curly','Spiky','Long / locs','Braids'],PE_FHN=['None','Mustache','Goatee','Full beard'];
function pEdit(i,j){const L=rost('h.'+i),x=L[j];if(!x)return;const lk=plAp(x.n,{sk:2,hr:1,hcl:'#1b1b1b',fh:0}),sel=(id,arr,v)=>`<select id=${id} style="font-size:16px">${arr.map((n,k)=>`<option value=${k} ${k==v?'selected':''}>${n}</option>`).join('')}</select>`;
 const poss=[...new Set([...POSL.filter(Boolean),'QB'])];
 ui.innerHTML=`<div><h2>✏️ Edit ${esc(x.n)}</h2><div class=card style="text-align:left">
 <label>Name <input id=pe_n value="${esc(x.n)}" style="width:100%;font-size:16px"></label>
 <div class=row style="gap:8px"><label>Number <input id=pe_num type=number min=0 max=99 value=${x.num??0} style="width:70px;font-size:16px"></label><label>Position <select id=pe_pos style="font-size:16px">${poss.map(p=>`<option ${p==x.pos?'selected':''}>${p}</option>`).join('')}</select></label></div>
 <label>Overall <b id=pe_ov_v>${x.ovr}</b><input id=pe_ov type=range min=40 max=99 value=${x.ovr} oninput="pe_ov_v.textContent=this.value" style="width:100%"></label>
 <label>Potential <b id=pe_pt_v>${x.pot??x.ovr}</b><input id=pe_pt type=range min=40 max=99 value=${x.pot??x.ovr} oninput="pe_pt_v.textContent=this.value" style="width:100%"></label>
 <label>Age <b id=pe_ag_v>${x.age??25}</b><input id=pe_ag type=range min=18 max=45 value=${x.age??25} oninput="pe_ag_v.textContent=this.value" style="width:100%"></label>
 <small>Younger takes away his earliest seasons. Older adds seasons he already played before now.</small>
 <div class=row style="gap:8px;flex-wrap:wrap;margin-top:6px"><label>Skin ${sel("pe_sk",PE_SKN,Math.min(5,lk.sk||0))}</label><label>Hair ${sel("pe_hr",PE_HRN,lk.hr??1)}</label><label>Facial hair ${sel("pe_fh",PE_FHN,lk.fh||0)}</label><label>Hair color <input id=pe_hc type=color value="${/^#[0-9a-f]{6}$/i.test(lk.hcl||'')?lk.hcl:'#1b1b1b'}"></label></div></div>
 <button onclick="pEditSave(${i},${j})">💾 Save changes</button><button class=g onclick="pCard(${i},${j})">Cancel</button></div>`;ui.scrollTop=0}
function pEditSave(i,j){const L=rost('h.'+i),x=L[j];if(!x)return;const v=id=>{const e=$('#'+id);return e?e.value:null};
 const old=x.n,nn=String(v('pe_n')||old).trim().slice(0,32)||old;
 if(nn!=old){const taken=Object.values(S.ro||{}).some(R_=>Array.isArray(R_)&&R_.some(y=>y&&y!==x&&y.n==nn));if(taken){HM='That name is already used by another player.';return pEdit(i,j)}x.n=nn;S.pren=S.pren||{};S.pren[old]=nn;for(const k in S.pren)if(S.pren[k]==old)S.pren[k]=nn;if(S.pled&&S.pled[old]){S.pled[nn]=S.pled[old];delete S.pled[old]}plRenApply()}
 x.num=cl(+v('pe_num')||0,0,99);const np=v('pe_pos');if(np)x.pos=np;x.ovr=cl(+v('pe_ov')||x.ovr,40,99);x.pot=Math.max(x.ovr,cl(+v('pe_pt')||x.ovr,40,99));
 const na=cl(+v('pe_ag')||x.age||25,18,45);if(na!=(x.age||25))plAge(x,i,na);
 S.pled=S.pled||{};S.pled[x.n]={sk:+v('pe_sk'),hr:+v('pe_hr'),fh:+v('pe_fh'),hcl:v('pe_hc')||'#1b1b1b'};
 save();HM='✏️ Saved changes to '+x.n+'.';pCard(i,j)}
// the Edit button on player cards (when editing is on)
(()=>{const _c=pCard;pCard=function(i,j){const r=_c.apply(this,arguments);try{if(S.edOk&&!(i==0&&j==0)&&ui.querySelector('h2')){const b=document.createElement('button');b.textContent='✏️ Edit player';b.setAttribute('onclick',`pEdit(${i},${j})`);const h=ui.querySelector('h2');h.parentNode.insertBefore(b,h.nextSibling)}}catch(e){}return r}})();
// the setting
(()=>{const _s=settings;settings=function(){const r=_s.apply(this,arguments);try{const c=document.createElement('div');c.className='card';c.innerHTML=`<b>✏️ Player editing</b><br><small>Turn on to edit any player (name, number, position, ratings, age and looks) from his player card.</small><div class=row style="gap:8px"><button class="${S.edOk?'':'g'}" onclick="S.edOk=1;save();settings()">On</button><button class="${S.edOk?'g':''}" onclick="S.edOk=0;save();settings()">Off</button></div>`;const first=ui.querySelector('.card');if(first)first.parentNode.insertBefore(c,first.nextSibling)}catch(e){}return r}})();
// ===================== 👕 CLOTHING: what you equip shows right away; "Everywhere" wears it in all three places =====================
(()=>{const _s=wrSet;wrSet=function(tab,id){const r=_s.apply(this,arguments);try{wrEns();S.wear.last=id;save();try{if(!LR&&M=='lock')lockP()}catch(e){}}catch(e){}return r}})();
function wrAll(id){wrEns();['lock','cas','ev'].forEach(t=>{if(t=='lock'||id!='gear')S.wear[t]=id});if(id=='gear'){S.wear.cas='cas';S.wear.ev='cas'}S.cos=String(id).startsWith('h')&&id!='cas'?id:null;if(SHOP.some(x=>x[0]==id&&x[1]=='suit'))S.suit=id;S.wear.last=id;save();
 try{if(WRFROM=='walk'&&LR)lrOutfit(LR.home?'cas':LR.ev||LR.studio||LR.pot?'ev':'lock')}catch(e){}HM='🌐 Wearing it everywhere: locker room, around town and at events.';wardV(WRT)}
(()=>{const _w=wardV;wardV=function(){const r=_w.apply(this,arguments);try{const host=WRFROM=='walk'?ov:ui;host.querySelectorAll('.row').forEach(row=>{const eb=row.querySelector('button[onclick^="wrSet("]');const m=eb&&/wrSet\('[^']*','([^']*)'\)/.exec(eb.getAttribute('onclick'));let id=m&&m[1];if(!id){if(!/Equipped/.test(row.textContent))return;id=S.wear[WRT]}if(!id||id=='cas'||row.querySelector('.wrall'))return;const b=document.createElement('button');b.className='g wrall';b.style.cssText='width:auto;flex:none;padding:6px 8px';b.textContent='🌐 Everywhere';b.setAttribute('onclick',`wrAll('${id}')`);row.appendChild(b)})}catch(e){}return r}})();
// player menu background: the outfit you equipped last
(()=>{const _l=lockP;lockP=function(){const r=_l.apply(this,arguments);try{if(!S||!S.wear||!S.wear.last||!PL.p)return r;const id=S.wear.last;if(id=='gear'||id=='cas')return r;const owned=id.startsWith('jsw')||owns(id);if(!owned)return r;const m=outfitM(id);if(m){m.scale.multiplyScalar(1.7/1.2);m.position.copy(PL.p.position);m.rotation.copy(PL.p.rotation);PL.remove(PL.p);PL.p=m;PL.add(m)}}catch(e){}return r}})();
