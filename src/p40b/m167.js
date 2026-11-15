// ===== 😏 FLIRT WITH MIA WHENEVER SHE TALKS TO YOU (college/pro, on the field too) =====
// Tyler, 2026-11-14: "Should be able to flirt with Mia anytime you talk to her." + "Make sure you can flirt with Mia
// even on the field if you're in college or pro." Before, the flirt button only came at the very end of an interview
// ("That will run tonight"). Now it is on every question she asks you: the post-game interview on the field and the
// locker-room interview. Flirting doesn't end the interview: her reply has a button back to the same question.
// Same rules as before: college or pro, 18+, single (she won't flirt back with someone who's taken), 80+ to ask out.
window.MIAQ=null;
window.miaOk=function(){try{return !S.gf&&celAskOk('rmia')&&S.datOff!=1}catch(e){return false}};
window.miaBack=function(){const q=MIAQ;MIAQ=null;if(!q)return ovHide();talk.apply(null,q)};
(()=>{try{const _t=talk;talk=function(w,nm,line,mood,btns,ex){try{
 if(w=='reporter'&&/^Reporter Mia · /.test(nm||'')&&Array.isArray(btns)&&miaOk()&&!btns.some(b=>/miaFlirt|celAsk/.test(b[1]||''))){
  MIAQ=[w,nm,line,mood,btns.slice(),ex];const fr=cfGet('rmia');
  btns=btns.concat([[fr>=(window.MIANEED||90)?'❤️ Ask Mia out':'😏 Flirt with Mia ('+fr+'/'+(window.MIANEED||90)+')',fr>=(window.MIANEED||90)?"celAsk('rmia')":'miaFlirt()']])}
 else if(w=='reporter'&&nm==='Reporter Mia'&&MIAQ&&Array.isArray(btns)&&btns.length===1&&/ovHide\(\)$/.test(btns[0][1]||'')&&!/That will run tonight/.test(line||'')){
  btns=[['🎤 Back to the interview','miaBack()']]}
 }catch(e){}return _t.call(this,w,nm,line,mood,btns,ex)}}catch(e){}})();
