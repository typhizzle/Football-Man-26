// ===== 👕 GOATIE'S ROSTER + YEEZERS =====
// Tyler, 2026-11-14: "only certain people should be signed to Goatie's for now ... Tommy Chew Toy is the owner
// obviously, and then TyPhizzle and Wesscoastt signed ... [Michael Jackson] ... Matty Gafford is signed with
// Goatie's, so is Eric Darnold, so is Coleridge Loud, so is Nuka Biten and Hooper Bol. No Pix and Markie Goata
// are Goatie's sponsors. Add Yeezers as its own brand ran by Kanye, shoes popularly known as Yeezers."
// Celebrities who rep Goatie's: TyPhizzle, Wesscoastt, Michael Jaxon (owner: Tommy Chew Toy). Anyone YOU
// recruited to a brand in your own save stays (that was your doing). Yeezers: Kanye Westley's shoe line, a
// clothing house like Jorton (so it is a rival of the others: one house at a time).
try{BRDEF["Goatie's"]=['typhizzle','wesscoastt','mjaxon'];BRDEF['Yeezers']=['kyeast']}catch(e){}
try{if(!BRCLOTH.includes('Yeezers'))BRCLOTH.push('Yeezers')}catch(e){}
try{if(!SPB.some(b=>b[0]==='yeez'))SPB.push(['yeez','Yeezers','sneakers',"your own Yeezers colorway (Kanye Westley's shoe line)",2,1.6,3])}catch(e){}
window.BRATH={"Goatie's":{own:'Tommy Chew Toy',ath:['Matty Gafford','Eric Darnold','Coleridge Loud','Nuka Biten','Hooper Bol','No Pix','Markie Goata']},
 'Yeezers':{own:'Kanye Westley',ath:[]}};
window.brAthTxt=function(k){const a=BRATH[k];if(!a)return '';return `<br><small>Owner: ${esc(a.own)}${a.ath.length?' · Athletes: '+a.ath.map(esc).join(', '):''}</small>`};
(()=>{try{const _c=brCard;brCard=function(){const B=myBrands();if(!B.length)return '';
 return `<div class=card><b>👕 Brand families</b>${B.map(k=>{const R_=brRoster(k);return `<div style="font-size:15px;margin:4px 0"><b>${esc(k)}</b><br><small>You${R_.length?', '+R_.map(id=>esc(celBy(id).n)).join(', '):''}</small>${brAthTxt(k)}</div>`}).join('')}<small>Become friends with celebrities, then get them to rep your brands (at events, after games, or by text).</small></div>`}}catch(e){}})();
