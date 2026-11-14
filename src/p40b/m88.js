// ===================== 🐆 Tommy Chew Toy + 🎤 dating Reporter Mia =====================
// Tommy Chew Toy: meme rapper, owns Goaties, rolls with TyPhizzle and Wesscoastt, has a crush on GloGorilla. Leopard onesie, fur hood, pink pompoms.
try{CELB.push(['tchew','Tommy Chew Toy','tommychewtoy',0,0,1,'#3b2618',0,1,1,'#f4f2ec','#f4f2ec','#f4f2ec','wildcat',1,'meme rapper and owner of the Goaties brand, best friends with TyPhizzle and Wesscoastt, chaotic and funny, will not stop talking about his crush on GloGorilla','curly',['Goaties','a Goaties streetwear collab']])}catch(e){}
try{if(typeof CEL_REAL!='undefined')CEL_REAL.tchew='(original character)'}catch(e){}
try{FKNOWN.unshift([/^Tommy Chew Toy$/,{s:0,h:'#3b2618',st:'curly',e:'#4a3020'}])}catch(e){}
// the look: white wildcat-print onesie with colored spots, unzipped to the waist (chest and belly out), hood down with white fur trim, pink cuffs, pink pompoms, big wavy brown hair
(()=>{const _c=celM;celM=function(o){const m=_c.apply(this,arguments);try{if(o&&o.acc&&o.acc.includes('wildcat')){
  const K=0x141414,CC=[0xff2d95,0x2e6bff,0x19d3c5,0x7bed4a,0x9b59b6,0xff8c1a],sk=SK[o.sk]||0xffdbac,hc=hexC(o.hcl);let n=0;
  const ros=(x,y,z,par,fz)=>{const c=CC[n++%CC.length],o_=z<0?-.004:.004,o2=x<0?-.004:.004;
   if(fz){bx(.07,.06,.03,c,x,y,z+o_,par);bx(.03,.11,.03,K,x-.055,y,z,par);bx(.08,.03,.03,K,x-.005,y+.055,z,par);bx(.04,.05,.03,K,x+.05,y-.035,z,par);bx(.03,.03,.03,K,x+.055,y+.03,z,par)}
   else{bx(.03,.06,.07,c,x+o2,y,z,par);bx(.03,.11,.03,K,x,y,z-.055,par);bx(.03,.03,.08,K,x,y+.055,z-.005,par);bx(.03,.05,.04,K,x,y-.035,z+.05,par)}};
  // torso: front (beside the opening), back, sides
  [[-.4,1.82],[-.3,1.55],[-.42,1.3],[-.28,1.12],[.4,1.78],[.3,1.5],[.42,1.25],[.3,1.08]].forEach(([x,y])=>ros(x,y,-.285,m,1));
  [[-.35,1.85],[0,1.7],[.33,1.82],[-.2,1.48],[.22,1.45],[-.38,1.15],[.05,1.2],[.36,1.1]].forEach(([x,y])=>ros(x,y,.285,m,1));
  [-.49,.49].forEach(x=>[[1.75,-.1],[1.45,.1],[1.15,-.05]].forEach(([y,z])=>ros(x,y,z,m,0)));
  // arms (with pink cuffs) and legs
  (m.A||[]).forEach(a=>{[[-.15,-.03],[-.38,.05],[-.6,-.04]].forEach(([y,x])=>ros(x,y,-.17,a,1));[[-.25,0],[-.5,.03]].forEach(([y,x])=>ros(x,y,.17,a,1));bx(.31,.12,.35,0xff4fa0,0,-.78,0,a)});
  [-.2,.2].forEach(x=>{[[.85,-.05],[.6,.05],[.35,-.04],[.12,.04]].forEach(([y,dx])=>ros(x+dx,y,-.19,m,1));[[.75,0],[.4,.03]].forEach(([y,dx])=>ros(x+dx,y,.19,m,1))});
  // unzipped: chest, nipples, the belly out with a belly button
  bx(.34,.9,.03,sk,0,1.5,-.29,m);[-.11,.11].forEach(x=>bx(.05,.04,.02,0xd99a85,x,1.74,-.31,m));
  bx(.36,.46,.06,sk,0,1.3,-.31,m);bx(.05,.04,.02,0x9a6a55,0,1.27,-.345,m);
  [-.2,.2].forEach(x=>bx(.06,.92,.05,0xf4f2ec,x,1.5,-.3,m));bx(.14,.08,.05,0xf4f2ec,0,1.03,-.3,m);
  // hood down: white fur around the neck, the hood lying on his back
  [-.27,.27].forEach(x=>{bx(.24,.2,.24,0xffffff,x,1.98,-.16,m);bx(.14,.26,.08,0xffffff,x*.85,1.9,-.3,m)});bx(.62,.16,.2,0xffffff,0,2.0,.18,m);bx(.6,.42,.12,0xf4f2ec,0,1.75,.34,m);ros(-.15,1.78,.405,m,1);ros(.15,1.7,.405,m,1);
  // pompom strings, one longer than the other
  bx(.025,.55,.025,0xff4fa0,-.36,1.66,-.3,m);bx(.14,.14,.14,0xff2d95,-.36,1.36,-.31,m);bx(.025,.36,.025,0xff4fa0,.36,1.75,-.3,m);bx(.14,.14,.14,0xff2d95,.36,1.55,-.31,m);
  // big wavy hair: extra volume on top and the sides
  bx(.66,.2,.62,hc,0,2.7,.03,m);bx(.62,.5,.14,hc,0,2.42,.28,m);[-.3,.3].forEach(x=>bx(.1,.34,.5,hc,x,2.46,.05,m));[[-.22,2.8,-.12],[.18,2.82,-.05],[0,2.84,.12],[-.3,2.5,.05],[.3,2.52,.05]].forEach(([x,y,z])=>bx(.22,.16,.22,hc,x,y,z,m));bx(.5,.1,.08,hc,.05,2.62,-.3,m)
 }}catch(e){}return m}})();
// he's in the studio about 1 session in 5
(()=>{const _s=studioWalk;studioWalk=function(){const r=_s.apply(this,arguments);try{if(LR&&LR.studio&&rng((S.seed||1)*41+hsh(wkKey()))()<.2){const o=celBy('tchew'),m=celM(o),x=-1.6,z=-47.5;m.position.set(x,0,z);m.rotation.y=Math.atan2(x,z+40);PL.add(m);const s=lbl(o.n);s.position.set(0,3.5,0);s.scale.set(3.2,.8,1);m.add(s);const ob={k:'sguy',n:o.n,cid:'tchew',x,z,m};LR.O.push(ob);LR.all.push(ob);const h=$('#lrh');if(h)h.textContent='🎤 The studio. TyPhizzle, Wesscoastt and Tommy Chew Toy are here. Hit the mic when you are ready.'}}catch(e){}return r}})();
(()=>{const _a=stAct;stAct=function(o){if(o&&o.cid=='tchew'){const L=['GOATIES ON EVERYBODY 🐐🐐 you need a fit? I got you.','Bro... has GloGorilla said anything about me? Be honest. Actually don\'t tell me.','Ty said you can rap. Prove it, QB 😤','This onesie is NOT a costume. It is a lifestyle.','Me, Ty and Wess in one room? Something viral is about to happen.'];
 return talk('mate',o.n,L[ri(0,L.length-1)],'happy',[...(LR.evMet.includes('tchew')?[]:[['📸 Picture together','stPic(\'tchew\')']]),['📱 Get his number','celNum(\'tchew\')'],['Bet','ovHide()']])}return _a.apply(this,arguments)}})();
// ---------- Reporter Mia: interviews build a friendship; at 40+ you can ask her out (college or pro, 18+) ----------
window.XCEL=[['rmia','Reporter Mia','miareports',1,0,4,'#ff4fa0',0,1,0,'#ff4fa0','#ffffff','#1b1b1b','',3,'sports reporter, quick and witty, pretends she is only here for the quotes','long']];
(()=>{const _t=talk;talk=function(w,nm,line,mood,btns,ex){try{if(w=='reporter'&&/^Reporter Mia/.test(nm||'')&&/That will run tonight/.test(line||'')){cfOnce('rmia','int',6);
  const fr=cfGet('rmia');if(!S.gf&&celAskOk('rmia')&&S.datOff!=1&&Array.isArray(btns)){btns=btns.concat([[fr>=80?'❤️ Ask Mia out':'😏 Flirt with Mia ('+fr+'/80)',fr>=80?'celAsk(\'rmia\')':'miaFlirt()']])}}}catch(e){}return _t.call(this,w,nm,line,mood,btns,ex)}})();
function miaFlirt(){const S_=S;S_.mfl=S_.mfl||{};if(S_.mfl.w==wkKey())return talk('reporter','Reporter Mia','Save some charm for the camera 😏','smug',[['Ha','ovHide()']]);S_.mfl.w=wkKey();const lk=looksEns(),ok=R()<.25+(lk-70)/120;cfAdd('rmia',ok?3:0);save();
 talk('reporter','Reporter Mia',ok?['Is that a quote or a pickup line? ...Don\'t answer that 😊','You know I\'m supposed to be neutral, right? 🙄😊','Careful. I might put that in the article.'][ri(0,2)]:['Nice try, QB. Focus on the game.','Mm-hm. Next question.'][ri(0,1)],ok?'happy':'smug',[['😏','ovHide()']],'Mia friendship '+cfGet('rmia')+'/100 (she only says yes past 80, and even then it is a long shot)')}

// Mia is one of the hardest people in the game to get: superstar standards, 80+ friendship, and even then she usually says no
(()=>{const _a=celAsk;celAsk=function(id){if(id=='rmia'&&!S.gf){const fr=cfGet('rmia');if(fr<80)return talk('reporter','Reporter Mia','I interview you. That is it. 🙂','smug',[['OK','ovHide()']],'Mia friendship '+fr+'/100: she won\'t even consider it under 80. '+celStd(celBy('rmia')));
  S.cask=S.cask||{};if(S.cask[id]==wkKey())return talk('reporter','Reporter Mia','You asked me already. Not happening this week.','smug',[['OK','ovHide()']]);if(R()>.35){S.cask[id]=wkKey();cfAdd('rmia',-4);save();return talk('reporter','Reporter Mia',['I don\'t date players. Rule number one.','Cute. No.','Ask me again when you have a ring. Maybe.'][ri(0,2)],'smug',[['OK','ovHide()']],'Mia is one of the hardest people in the game to date.')}}return _a.apply(this,arguments)}})();
