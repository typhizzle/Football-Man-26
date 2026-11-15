// ===== 👕 GOATIE'S ROSTER + YEEZERS =====
// Tyler, 2026-11-14: "only certain people should be signed to Goatie's for now ... Tommy Chew Toy is the owner
// obviously, and then TyPhizzle and Wesscoastt signed ... [Michael Jackson] ... Matty Gafford is signed with
// Goatie's, so is Eric Darnold, so is Coleridge Loud, so is Nuka Biten and Hooper Bol. No Pix and Markie Goata
// are Goatie's sponsors. Add Yeezers as its own brand ran by Kanye, shoes popularly known as Yeezers."
// Celebrities who rep Goatie's: TyPhizzle, Wesscoastt, Michael Jaxon (owner: Tommy Chew Toy). Anyone YOU
// recruited to a brand in your own save stays (that was your doing). Yeezers: Kanye Westley's shoe line, a
// clothing house like Jorton (so it is a rival of the others: one house at a time).
try{BRDEF["Goatie's"]=['typhizzle','wesscoastt','mjaxon','diddly','kclock','phall','greed','kween','swalker'];   /* Tyler 2026-11-15 (his halftime list): "If they have Goaty's by their name they are signed, if not they probably shouldn't be at any Goaty events" -> Diddy, Key Glock, Paul Wall, Creed, Queen, Sauce Walka, TyPhizzle, Wesscoastt (+ owner Tommy Chew Toy). Tyler (same day): "You can actually leave Michael Jackson." -> he stays. */BRDEF['Yeezers']=['kyeast']}catch(e){}
try{if(!BRCLOTH.includes('Yeezers'))BRCLOTH.push('Yeezers')}catch(e){}
try{if(!SPB.some(b=>b[0]==='yeez'))SPB.push(['yeez','Yeezers','sneakers',"your own Yeezers colorway (Kanye Westley's shoe line)",2,1.6,3])}catch(e){}
window.BRATH={"Goatie's":{own:'Tommy Chew Toy',ath:['Matty Gafford','Eric Darnold','Coleridge Loud','Nuka Biten','Hooper Bol','No Pix','Markie Goata']},
 'Yeezers':{own:'Kanye Westley',ath:[]}};
window.brAthTxt=function(k){const a=BRATH[k];if(!a)return '';return `<br><small>Owner: ${esc(a.own)}${a.ath.length?' · Athletes: '+a.ath.map(esc).join(', '):''}</small>`};
(()=>{try{const _c=brCard;brCard=function(){const B=myBrands();if(!B.length)return '';
 return `<div class=card><b>👕 Brand families</b>${B.map(k=>{const R_=brRoster(k);return `<div style="font-size:15px;margin:4px 0"><b>${esc(k)}</b><br><small>You${R_.length?', '+R_.map(id=>esc(celBy(id).n)).join(', '):''}</small>${brAthTxt(k)}</div>`}).join('')}<small>Become friends with celebrities, then get them to rep your brands (at events, after games, or by text).</small></div>`}}catch(e){}})();

// Tyler, 2026-11-14: "Diddy can stay with Goaty's, also Goaty's is the correct spelling". Didd-E reps Goaty's.
// The build spells it Goaty's everywhere (p47), and every save is corrected on load: deals, offers, brand
// rosters, the news feed. Only the brand's spelling changes; nothing else in the save.
window.goatyFix=function(s){try{if(!s||s.goatyV)return s;const old='Goat'+'ie',fx=v=>v.split(old+"'s").join("Goaty's").split(old+'s').join("Goaty's");
 // walk the save and fix the TEXT in place: objects shared between lists (S.T and S.pro share teams) stay shared
 const seen=new Set(),walk=o=>{if(!o||typeof o!=='object'||seen.has(o))return;seen.add(o);
  for(const k of Object.keys(o)){const v=o[k];if(typeof v==='string'){if(v.indexOf(old)>=0)o[k]=fx(v)}else if(v&&typeof v==='object')walk(v);
   if(!Array.isArray(o)&&k.indexOf(old)>=0){const nk=fx(k);if(!(nk in o)){o[nk]=o[k];delete o[k]}}}};
 walk(s);s.goatyV=1;return s}catch(e){return s}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{s=goatyFix(s)}catch(e){}return s}}catch(e){}})();
// Tyler, 2026-11-14: "Tommy Chew Toy can be at most Goaty's events, he's the owner, maybe he's at 75-80% of
// them". He reps Goaty's (so he only shows at Goaty's events), and a Goaty's event's celebrity is him 78% of the time.
try{if(!BRDEF["Goatie's"].includes('tchew'))BRDEF["Goatie's"].unshift('tchew')}catch(e){}
(()=>{try{const _e=brEvCel;brEvCel=function(brand){try{if(brKey(brand)==="Goatie's"&&typeof celBy=='function'&&celBy('tchew')&&R()<.74)return 'tchew'}catch(e){}return _e.apply(this,arguments)}}catch(e){}})();
