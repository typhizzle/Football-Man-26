// ===== 💪 THROWING POWER + SPEED ONLY FALL TO AGE (36+) =====
// Tyler, 2026-11-14: "throwing power and speed should remain the same all the way until you're turning 36, then it
// starts going down in regression." Age regression already started at 36. The one other way they moved was a
// rough stretch (3 bad games in a row: -1 to EVERY rating) or a hot stretch (+1 to every rating). Now those swings
// use the other four ratings (accuracy, awareness, carrying, truck) and still move your overall by exactly 1.
// Throwing power and speed now change only by training and by age regression from 36.
window.FORMSKIP={pow:1,mob:1};
window.formShift=function(dir){const was=qo(S.q),ks=Object.keys(S.q).filter(k=>!FORMSKIP[k]);let g=0;
 for(const k of ks)S.q[k]=cl(S.q[k]+dir,25,dir>0?99:100);
 while(qo(S.q)===was&&g++<40){const k=ks.slice().sort((a,b)=>dir<0?S.q[b]-S.q[a]:S.q[a]-S.q[b])[0];const nv=cl(S.q[k]+dir,25,99);if(nv===S.q[k])break;S.q[k]=nv}
 return qo(S.q)-was};
userForm2=function(gr,w){S.lgr=gr;S.lgw=w?1:0;S.lgtd=S._eg?S._egtd:null;S._eg=0;try{const st=S.stage||'hs',key=st+yrN();if(S.ufk!=key){S.ufk=key;S.ubs=0;S.ugs=0;S.usl=0;S.usg=0}const o=qo(S.q),bad=gr<60||(!w&&gr<64),good=w&&gr>=(o>=90?88:82);
 if(bad){S.ugs=0;S.ubs=(S.ubs||0)+1;if(S.ubs>=3&&(S.usl||0)<4){const was=o;formShift(-1);S.usl=(S.usl||0)+1;S.ubs=0;S.rgp=Math.max(S.rgp||0,Math.min(was,99));S.fmsg=(S.fmsg?S.fmsg+' ':'')+`📉 Rough stretch: 3 bad games in a row cost you ${was-qo(S.q)} OVR${was>=100?' and your 100 rating':''} (${S.usl} this season, never more than 4). Throwing power and speed are untouched.`}return}
 S.ubs=0;if(good){S.ugs=(S.ugs||0)+1;const need=o>=90?4:3;if(S.ugs>=need&&(S.usg||0)<2&&o<99){formShift(1);S.usg=(S.usg||0)+1;S.ugs=0;S.fmsg=(S.fmsg?S.fmsg+' ':'')+`📈 Hot stretch: ${need} great games in a row earned you +1 OVR.`}}else S.ugs=0}catch(e){}};
