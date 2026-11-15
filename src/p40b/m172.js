// ===== 🧬 SKIN BY HERITAGE: real names, mixed race by percent, your own colour, parents who match =====
// Tyler, 2026-11-14: "For some reason, my dad is black even though I think I'm white. You can have mixed race in the
// game ... put every version of skin there is and be honest, just be like there's black, there's white, there's Asian,
// Mexican, Indian ... I don't want to say like dark ... they can pick mixed race in their skin color, and then that would
// make sense for their parents, but if they don't pick mixed race, then obviously their parents would be whatever race
// they are ... let them have whatever percent they want ... 25% black, 25% white, 25% Asian, 25% Mexican ... the last
// one that you added the race, it just fills up the rest of the percentage until you change it ... you can even add
// your own skin color ... Egyptians, I don't know what they fall under."
// 1. The six free skins, the family tones and the player-edit tones are named by heritage instead of light/dark.
// 2. "🧬 Heritage" in your look editor: add as many as you like with any percents (the newest one fills whatever is
//    left), a lighter/darker shade (people in every group vary), or your own colour. "Use this skin" puts it on your
//    player everywhere (field, locker room, home, cards). Saved as skin #18, "My heritage".
// 3. Parents: a NEW family is born matching you (one heritage: both parents share it; mixed: Dad carries your first,
//    Mom your second, the rest blended in). An existing family is never changed on its own: the family screen has a
//    "Match my parents to me" button that changes only their skin tone.
window.RACES=[['White','#f1c6a3'],['Black','#6b4226'],['Asian (East Asian)','#ecc59c'],['Mexican / Latino','#c99062'],['Indian / South Asian','#a8744a'],
 ['Middle Eastern / North African (Egyptian, Arab, Persian)','#c79567'],['Southeast Asian (Filipino, Vietnamese, Thai)','#c48c5c'],['Native American','#b3784c'],
 ['Pacific Islander (Samoan, Hawaiian, Tongan)','#9d6942'],['Afro-Caribbean / Afro-Latino','#7d4e2d']];
try{SKN.splice(0,6,'White','Asian','Mexican / Latino','Indian / South Asian','Black','Black (deeper tone)');
 PE_SKN.splice(0,6,'White','Asian','Mexican / Latino','Indian / South Asian','Black','Black (deeper tone)');
 FY_SKN.splice(0,7,'White (lighter)','White','Asian','Mexican / Latino','Indian / Middle Eastern','Black','Black (deeper tone)')}catch(e){}
window.HSK=17;try{if(SK.length===HSK){SK.push(0xc99062);SKN.push('🧬 My heritage');SKP.push(0)}}catch(e){}
const hrHx=h=>{h=String(h||'#c99062').replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]},hrHs=a=>'#'+a.map(v=>cl(Math.round(v),0,255).toString(16).padStart(2,'0')).join('');
window.hrBlend=function(rs,shade){let t=0,acc=[0,0,0];(rs||[]).forEach(x=>{const R_=RACES[x.r];if(!R_||!(x.p>0))return;const c=hrHx(R_[1]);for(let i=0;i<3;i++)acc[i]+=c[i]*c[i]*x.p;t+=x.p});
 let c=t?acc.map(v=>Math.sqrt(v/t)):hrHx(RACES[3][1]);const s=shade||0;c=s>0?c.map(v=>v*(1-.075*s)):c.map(v=>v+(255-v)*.075*-s);return hrHs(c)};
window.hrApplyHex=function(ap){try{if(ap&&ap.sk===HSK&&ap.skc)SK[HSK]=parseInt(ap.skc.replace('#',''),16)}catch(e){}};
// nearest family tone for a colour
window.hrFy=function(hex){const c=hrHx(hex);let bi=0,bd=1e9;FY_SK.forEach((f,i)=>{const d=hrHx(f).reduce((a,v,k)=>a+(v-c[k])**2,0);if(d<bd){bd=d;bi=i}});return bi};
// what each parent should look like, from your heritage (or from your skin if you never set one)
window.hrParents=function(ap){ap=ap||{};const rs=(ap.race||[]).filter(x=>x.p>0).sort((a,b)=>b.p-a.p),mine=ap.sk===HSK&&ap.skc?ap.skc:'#'+(SK[ap.sk!=null&&ap.sk<6?ap.sk:1]).toString(16).padStart(6,'0');
 if(rs.length>=2&&!ap.own){const dad=RACES[rs[0].r][1],mom=rs.length===2?RACES[rs[1].r][1]:hrBlend(rs.slice(1),0);return {dad:hrFy(dad),mom:hrFy(mom)}}
 const i=hrFy(mine);return {dad:i,mom:i}};
// new families are born matching you
(()=>{try{const _f=famRand;famRand=function(){const F=_f.apply(this,arguments);try{const p=hrParents(S.ap);if(F.mom)F.mom.sk=p.mom;if(F.dad)F.dad.sk=p.dad;(F.sibs||[]).forEach(s=>{if(s&&s.sk!=null)s.sk=Math.round((p.mom+p.dad)/2)})}catch(e){}return F}}catch(e){}})();
window.hrMatchParents=function(){const F=famEns(),p=hrParents(S.ap);if(F.mom)F.mom.sk=p.mom;if(F.dad)F.dad.sk=p.dad;save();HM='🧬 Your parents now match your heritage (only their skin tone changed).';famV()};
(()=>{try{const _v=famV;famV=function(){const r=_v.apply(this,arguments);try{const F=S.fam;if(F&&(F.mom||F.dad)&&!ui.querySelector('[data-hrmatch]')){const p=hrParents(S.ap);
 if((F.mom&&F.mom.sk!==p.mom)||(F.dad&&F.dad.sk!==p.dad)){const d=ui.firstElementChild||ui,c=document.createElement('div');c.className='card';c.setAttribute('data-hrmatch','1');
  c.innerHTML='<b>🧬 Parents</b><br><small>Your parents\' skin doesn\'t match your heritage. Matching changes only their skin tone (names, ages, everything else stays).</small><button class=g onclick="hrMatchParents()">Match my parents to me</button>';
  const back=[...d.querySelectorAll(':scope > button')].pop();if(back)d.insertBefore(c,back);else d.appendChild(c)}}}catch(e){}return r}}catch(e){}})();
// the look editor keeps your heritage when anything else changes
(()=>{try{const _j=jr;jr=function(){const old=S.ap||{};const r=_j.apply(this,arguments);try{if(S.ap.sk===HSK){['race','shade','skc','own'].forEach(k=>{if(old[k]!=null)S.ap[k]=old[k]});if(!S.ap.skc)S.ap.skc=hrBlend(S.ap.race||[{r:3,p:100}],S.ap.shade||0);hrApplyHex(S.ap)}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{hrApplyHex(s&&s.ap)}catch(e){}return s}}catch(e){}})();
// ---- the Heritage builder ----
window.HRE=null;
window.hrOpen=function(){const a=S.ap||{};HRE={race:JSON.parse(JSON.stringify(a.race||[])),shade:a.shade||0,own:a.own||null};hrDraw()};
window.hrFix=function(edited){const L=HRE.race;if(!L.length)return;const last=L.length-1;L.forEach(x=>x.p=cl(Math.round(+x.p||0),0,100));
 if(edited!=null&&edited!==last){const others=L.reduce((a,x,i)=>i===last||i===edited?a:a+x.p,0);L[edited].p=Math.min(L[edited].p,100-others)}
 L[last].p=Math.max(0,100-L.reduce((a,x,i)=>i===last?a:a+x.p,0))};
window.hrAdd=function(v){if(v===''||v==null)return;HRE.race.push({r:+v,p:0});hrFix();hrDraw()};
window.hrDel=function(i){HRE.race.splice(i,1);hrFix();hrDraw()};
window.hrPct=function(i,v){HRE.race[i].p=+v||0;hrFix(i);hrDraw()};
window.hrRace=function(i,v){HRE.race[i].r=+v;hrDraw()};
window.hrShade=function(v){HRE.shade=+v;hrDraw()};
window.hrOwn=function(on,c){HRE.own=on?(c||HRE.own||hrBlend(HRE.race,HRE.shade)):null;hrDraw()};
window.hrColor=function(){return HRE.own||hrBlend(HRE.race.length?HRE.race:[{r:3,p:100}],HRE.shade)};
window.hrUse=function(){const c=hrColor();S.ap=S.ap||{};S.ap.race=HRE.race.filter(x=>x.p>0);S.ap.shade=HRE.shade;S.ap.own=HRE.own?1:0;S.ap.skc=c;S.ap.sk=HSK;hrApplyHex(S.ap);
 const sel=$('#as');if(sel){if(![...sel.options].some(o=>+o.value===HSK)){const o=document.createElement('option');o.value=HSK;o.textContent=SKN[HSK];sel.appendChild(o)}sel.value=HSK}try{jr()}catch(e){}save();hrDraw(1)};
window.hrDraw=function(done){const box=$('#hrbox');if(!box||!HRE)return;const L=HRE.race,c=hrColor(),sum=L.reduce((a,x)=>a+x.p,0);
 box.innerHTML=`<div class=card style="margin:6px 0"><b>🧬 Heritage</b> <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${c};border:2px solid #000;vertical-align:middle"></span><br><small>Pick one or mix as many as you want. The newest one fills whatever percent is left.</small>
 ${L.map((x,i)=>`<div class=row style="gap:4px;margin-top:4px"><select style="flex:1" onchange="hrRace(${i},this.value)">${RACES.map((R_,k)=>`<option value=${k} ${k==x.r?'selected':''}>${R_[0]}`).join('')}</select><input type=number min=0 max=100 value=${x.p} style="width:62px" onchange="hrPct(${i},this.value)">%<button class=g style="width:auto;flex:none" onclick="hrDel(${i})">✕</button></div>`).join('')}
 <label>${L.length?'Add another':'Add a heritage'}<select onchange="hrAdd(this.value)"><option value="">Choose…${RACES.map((R_,k)=>`<option value=${k}>${R_[0]}`).join('')}</select></label>
 ${L.length?`<small>Total: ${sum}%</small><br>`:''}
 <label>Shade (people in every group vary)<input type=range min=-3 max=3 step=1 value=${HRE.shade} oninput="hrShade(this.value)"></label>
 <div class=row><label style="flex:1"><input type=checkbox ${HRE.own?'checked':''} onchange="hrOwn(this.checked)" style="width:auto"> Use my own colour <small>(real skin tones; exotic skins are sold separately)</small></label>${HRE.own?`<input type=color value="${HRE.own}" oninput="hrOwn(1,this.value)" style="width:64px;padding:2px">`:''}</div>
 <button onclick="hrUse()">Use this skin</button>${done?'<small> ✓ On your player now.</small>':''}</div>`};
// show the builder under the skin picker in the look editor
(()=>{try{const _je=jersey;jersey=function(){const r=_je.apply(this,arguments);try{const sb=$('#skb');if(sb&&!$('#hrbox')){const d=document.createElement('div');d.id='hrbox';sb.after(d);hrOpen()}}catch(e){}return r}}catch(e){}})();

// Tyler, 2026-11-14: "Use your own color for real skin tones because you're gonna buy those exotic skins later".
// Whatever colour is picked is moved to the nearest real skin tone: warm undertone (hue 16-34°), natural saturation (20-48%),
// from very fair to very deep. Blues, greens, metallics etc. stay for the exotic skins you buy.
window.hrReal=function(hex){try{let [r,g_,b]=hrHx(hex).map(v=>v/255);const mx=Math.max(r,g_,b),mn=Math.min(r,g_,b),l=(mx+mn)/2,d=mx-mn;let h=0,s=0;
 if(d){s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?((g_-b)/d+(g_<b?6:0)):mx===g_?((b-r)/d+2):((r-g_)/d+4);h*=60}
 const H=(h>=16&&h<=34)?h:24,Sa=cl(s,.2,.48),L=cl(l,.13,.9);
 const q=L<.5?L*(1+Sa):L+Sa-L*Sa,p=2*L-q,f=t=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p},hh=H/360;
 return hrHs([f(hh+1/3),f(hh),f(hh-1/3)].map(v=>v*255))}catch(e){return hex}};
(()=>{const _o=hrOwn;window.hrOwn=function(on,c){return _o.call(this,on,c?hrReal(c):c)}})();
