
// ===================== FORM: rough stretches cost a point, hot stretches earn one (max -4 / +2 a season, 90+ has to work harder) =====================
function qbForm(i,won){if(!i)return;const q=rost('h.'+i)[0];if(!q||q.age==null)return;
 if(won){q.bs=0;q.ws=(q.ws||0)+1;const need=q.ovr>=90?4:3;if(q.ws>=need&&(q.sfg||0)<2&&q.ovr<Math.min(q.pot||99,99)&&R()<(q.ovr>=90?.25:.4)){q.ovr++;q.sfg=(q.sfg||0)+1;if(q.sl>0)q.sl--;q.ws=0}return}
 q.ws=0;q.bs=(q.bs||0)+1;if(q.bs>=3&&(q.sfl||0)<4&&R()<.5){q.ovr=Math.max(40,q.ovr-1);q.sl=(q.sl||0)+1;q.sfl=(q.sfl||0)+1;q.bs=0}}
function userForm(){}
function userForm2(gr,w){try{const st=S.stage||'hs',key=st+yrN();if(S.ufk!=key){S.ufk=key;S.ubs=0;S.ugs=0;S.usl=0;S.usg=0}const o=qo(S.q),bad=gr<60||(!w&&gr<64),good=w&&gr>=(o>=90?88:82);
 if(bad){S.ugs=0;S.ubs=(S.ubs||0)+1;if(S.ubs>=3&&(S.usl||0)<4){const was=o;for(const k in S.q)S.q[k]=cl(S.q[k]-1,25,100);S.usl=(S.usl||0)+1;S.ubs=0;S.rgp=Math.max(S.rgp||0,Math.min(was,99));S.fmsg=(S.fmsg?S.fmsg+' ':'')+`📉 Rough stretch: 3 bad games in a row cost you 1 OVR (${S.usl} this season, never more than 4).`}return}
 S.ubs=0;if(good){S.ugs=(S.ugs||0)+1;const need=o>=90?4:3;if(S.ugs>=need&&(S.usg||0)<2&&o<99){for(const k in S.q)S.q[k]=cl(S.q[k]+1,25,99);S.usg=(S.usg||0)+1;S.ugs=0;S.fmsg=(S.fmsg?S.fmsg+' ':'')+`📈 Hot stretch: ${need} great games in a row earned you +1 OVR.`}}else S.ugs=0}catch(e){}}
