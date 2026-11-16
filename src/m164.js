// ===== 🤝 SPONSORSHIPS: ON/OFF + HOW MANY (5 steps) · 🎙 POT McGEE ON A REAL SCHEDULE =====
// Tyler, 2026-11-14: "an ability to turn sponsorships on or off. If you turn them off, I think GSPN should even
// mention something about you being all locked in on sports ... a meter ... five levels ... the middle is the
// average of what everyone gets, two marks behind it (slightly less / very few), two in front (slightly more /
// as many as you can get) ... I don't want it to spam with advertisement opportunities ... 2 to 3 invites a year
// to the studio, maybe four events for your brands, maybe two interviews with Pot McGee a season, maybe week two,
// or the week you go to the playoffs ... if he does interview Pro Bowl week, questions on whether you're gonna play
// in the Pro Bowl and how your season was, or if you're going to the Super Bowl ... how you're gonna take it".
// The middle step is exactly what the game did before (7 offers per offer period, 4 brand events a season).
// Off: no new offers and no sponsor/brand events (deals you already signed keep paying until they end).
// The studio (2-3 a season) and Pot McGee (2 a season) are separate from this setting.
window.SPLV=[{n:'Very few',offers:2,party:1},{n:'Fewer than average',offers:4,party:2},{n:'Average',offers:7,party:4},{n:'More than average',offers:9,party:5},{n:'As many as possible',offers:12,party:6}];
window.spLv=function(){return S&&S.spLv!=null?S.spLv:2};
window.spN=function(){return SPLV[spLv()].offers};
(()=>{try{const _e=spEns;spEns=function(){if(S&&S.spOff){S.spc=S.spc||[];return S.spo={k:'off',L:[]}}const k0=S&&S.spo&&S.spo.k;if(k0==='off'&&S.spo)S.spo=null;return _e.apply(this,arguments)}}catch(e){}})();
window.spSet=function(lv){S.spLv=cl(lv,0,4);S.spo=null;save();settings()};
window.spToggle=function(){S.spOff=S.spOff?0:1;S.spo=null;
 if(S.spOff){const ln=['"'+S.name+' has gone dark on the ad world. No commercials, no sponsor events: all ball, all the time."','"Turning down that kind of money? '+S.name.split(' ')[0]+' is LOCKED IN. Respect."','"You won\'t see '+S.name.split(' ')[0]+' on a billboard this year. He\'s tearing up endorsement offers to focus on football."'][Math.floor(R()*3)];
  S.fmsg=(S.fmsg?S.fmsg+' ':'')+'📺 GSPN: '+ln;try{twAdd({a:'GSPN',h:'GSPN',v:1,t:ln.replace(/"/g,'')})}catch(e){}}
 save();settings()};
// the player menu (Settings): the switch + the 5-step meter
(()=>{try{const _s=settings;settings=function(){const r=_s.apply(this,arguments);try{const d=ui.firstElementChild;if(d&&!d.querySelector('[data-spset]')){const c=document.createElement('div');c.className='card';c.setAttribute('data-spset','1');const lv=spLv();
 c.innerHTML=`<b>🤝 Sponsorships</b><br><small>${S.spOff?'OFF: no sponsor offers or brand events. Deals you already signed keep paying until they end.':'ON: '+SPLV[lv].n+' ('+SPLV[lv].offers+' offers at a time, up to '+SPLV[lv].party+' brand events a season)'}</small>
 <button class=${S.spOff?'':'g'} onclick="spToggle()">${S.spOff?'Turn sponsorships ON':'Turn sponsorships OFF'}</button>${S.spOff?'':`<div style="display:flex;gap:4px;margin-top:6px">${SPLV.map((x,i)=>`<button class="${i==lv?'':'g'}" style="flex:1;padding:6px 2px;font-size:12px" onclick="spSet(${i})">${['Very few','Less','Average','More','Max'][i]}</button>`).join('')}</div>`}`;
 const back=[...d.querySelectorAll(':scope > button')].pop();if(back)d.insertBefore(c,back);else d.appendChild(c)}}catch(e){}return r}}catch(e){}})();
// weekly invites: sponsorships off removes brand/sponsor events; the brand-event cap follows the meter;
// Pot McGee comes in week 2, and once more in the playoffs (Pro Bowl / Ultra Bowl themed when that's where you are)
window.potTheme=function(){try{const B=S.pb;if(B&&B.r===3&&!B.out&&!B.done&&B.pairs&&B.pairs[0]&&B.pairs[0].includes(0))return ['The Pot McGee Show: Ultra Bowl week','Pot wants to know how you\'re going to take the Ultra Bowl.'];
 if(B&&(B.pbw||B.r>=3)&&typeof pbMe=='function'&&pbMe())return ['The Pot McGee Show: Pro Bowl week','Pot wants to talk about your Pro Bowl nod and how your season went.'];
 if(B)return ['The Pot McGee Show: playoff edition','Pot wants to talk about your playoff run.'];return ['The Pot McGee Show: season preview','Pot wants to talk about the season ahead.']}catch(e){return ['The Pot McGee Show','Pot wants you on the show this week.']}};
(()=>{try{const _f=evcFilter;window.evcFilter=function(L){try{if(S){EVCAP.party=SPLV[spLv()].party;
  if(S.spOff)for(let i=L.length-1;i>=0;i--){const e=L[i];if(e&&(e.k==='party'||e.cat==='event'||e.brand))L.splice(i,1)}
  const potWk=(!S.pb&&(S.wk||0)===1)||(!!S.pb&&!(S.evc&&S.evc.potPO===yrN()));
  for(let i=L.length-1;i>=0;i--)if(L[i]&&L[i].k==='pot'&&!potWk)L.splice(i,1);
  if(potWk&&!L.some(e=>e&&e.k==='pot')&&myFans()>=30000){const t=potTheme();L.push({k:'pot',n:t[0],d:t[1]})}
  L.forEach(e=>{if(e&&e.k==='pot'){const t=potTheme();e.n=t[0];e.d=t[1];if(S.pb){S.evc=S.evc||{};}}})}}catch(e){}
 const out=_f.apply(this,arguments);try{if(S&&S.pb&&out.some(e=>e&&e.k==='pot')){const C=evcGet();C.potPO=yrN();S.evc.potPO=yrN()}}catch(e){}return out}}catch(e){}})();
