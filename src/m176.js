// ===== 💪 THROWING POWER + SPEED: untouched until 36, then their own age curve =====
// Tyler, 2026-11-14: "throwing power and speed should remain the same all the way until you're turning 36, then it starts
// going down in regression" + "By remain the same, I mean wherever you have it upgraded to" + "once they turn 36, that
// should be going down ... if the player is 45, their throwing power probably wouldn't be over an 85 ... you turn 36 and
// your throwing power is down to a 96. Something like that. You can still upgrade it. It would just probably still
// regress more later. Whatever you think system's best".
// From 36, every birthday takes these off (other ratings keep your regression table), and each has its own ceiling for
// that age (you can train back up to it, then next birthday takes more):
//   age            36  37  38  39  40  41  42  43  44  45  46  47  48  49  50
//   throw power -   3   3   3   4   4   4   5   5   5   6   6   6   6   6   6    max 97 95 94 92 90 89 88 87 86 85 82 79 76 73 70
//   speed       -   4   4   5   5   6   6   6   6   6   6   7   7   7   7   7    max 94 91 88 85 82 79 76 73 70 67 64 61 58 55 50
// The arm lasts longer than the legs. A 100 OVR is still never touched by age.
window.PMRG={pow:{d:[3,3,3,4,4,4,5,5,5,6,6,6,6,6,6],c:[97,95,94,92,90,89,88,87,86,85,82,79,76,73,70]},mob:{d:[4,4,5,5,6,6,6,6,6,6,7,7,7,7,7],c:[94,91,88,85,82,79,76,73,70,67,64,61,58,55,50]}};
window.pmCap=function(k,age){const T=PMRG[k];if(!T||age<36)return 99;return T.c[Math.min(14,age-36)]};
window.rgPM=function(k,age){const T=PMRG[k];if(!T||age<36)return false;const i=Math.min(14,age-36),was=S.q[k];S.q[k]=cl(was-T.d[i],25,Math.min(was,T.c[i]));
 S._rgpm=(S._rgpm||'')+` ${k=='pow'?'Throw power':'Speed'} ${was} → ${S.q[k]} (max ${T.c[i]} at ${age}).`;return true};
// training: throw power and speed can be trained back up to their own age ceiling
(()=>{try{const _q=qCap;qCap=function(k){const c=_q.apply(this,arguments);try{const a=S.age||0;if(a>=36&&PMRG[k]&&qo(S.q)<100)return k=='pow'?Math.min(99,pmCap(k,a)):Math.min(c,pmCap(k,a))}catch(e){}return c}}catch(e){}})();
(()=>{try{const _h=hundInfo;hundInfo=function(){let r=_h.apply(this,arguments);try{const a=S.age||0;if(S.stage=='pro'&&a>=36&&qo(S.q)<100)r+=`<p><small>At ${a}: throw power maxes at ${pmCap('pow',a)}, speed at ${pmCap('mob',a)}, the rest at ${typeof othCap=='function'?othCap(a):ageCap(a)}.</small></p>`}catch(e){}return r}}catch(e){}})();
// Tyler, 2026-11-14: "I told you the overalls that they can be at a certain age ... the list where they drop to at a certain
// age if they keep playing. And then adjust all ratings accordingly." His list (the most your OVERALL can be at each age):
// 40-41: 99, 42: 95, 43: 90, 44: 85, 45: 80, 46: 70, 47: 65, 48: 60, 49: 55, 50: 50. Throw power and speed now have their own
// ceilings, so the other four ratings get theirs from the list: (6 x the overall max - power max - speed max) / 4, so a
// player maxed out at that age lands right on Tyler's overall. E.g. at 45: power 85, speed 67, the rest 82 -> overall 80;
// at 50: power 70, speed 50, the rest 45 -> overall 50.
window.othCap=function(age){if(age<36)return 99;return Math.min(99,Math.floor((6*ageCap(age)-pmCap('pow',age)-pmCap('mob',age))/4))};
(()=>{const _r=rgPM;window.rgPM=function(k,age){if(PMRG[k])return _r.apply(this,arguments);if(age<36)return false;const rg=RGT[age];if(!rg)return false;
 const was=S.q[k];S.q[k]=cl(was-rg[0],25,Math.min(was,othCap(age)));return true}})();
(()=>{try{const _q=qCap;qCap=function(k){const c=_q.apply(this,arguments);try{const a=S.age||0;if(a>=36&&!PMRG[k]&&qo(S.q)<100)return othCap(a)}catch(e){}return c}}catch(e){}})();
