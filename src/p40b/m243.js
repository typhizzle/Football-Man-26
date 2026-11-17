// ===== 🌺 PRO BOWL: YOU PLAY ONLY YOUR SCHEDULED QUARTERS · WATCH OR "SIM UNTIL I'M ON THE FIELD" (Tyler 2026-11-17) =====
// The rotation (3rd in votes Q1, 2nd Q2, 1st the 2nd half) already chose the QB, but you were handed the ball every drive
// anyway. Now when it isn't your turn, your team's drive is one you watch or simulate; you can't put yourself in.
window.pbMeAt=function(q){try{const c=pbLine(PBGM.me,q,0)[0];return !!(c&&(c.me||c.n===S.name))}catch(e){return true}};
window.pbNext=function(){for(let q=pbQ();q<=4;q++)if(pbMeAt(q))return q;return 0};
window.pbOffUI=function(){const q=pbQ(),c=(pbLine(PBGM.me,q,0)[0]||{}),nx=pbNext(),rem=Math.max(1,(g.clk<1800?1800:3600)-g.clk);
 g.ph='opp';g.tk=0;g.sw=0;g.pl=null;g.r=simDrive(g.m.ovr,g.o.ovr,g.y,rem,g.s[0]-g.s[1],g.clk>=1800,KKt(0));
 ovShow(`<h2>Your ball · ${esc(c.n||'QB')} at QB</h2><p>Q${q} belongs to ${esc(c.n||'him')}. ${nx?'You go in for Q'+nx+'.':'Your time is done: watch or sim the rest.'}</p><p>${g.s[0]}–${g.s[1]}</p><button onclick=watchU()>Watch drive</button><button class=g onclick=applyU()>Simulate drive</button>${nx?'<button class=g onclick=pbSimTo()>Sim until I\'m on the field</button>':''}`)};
window.pbSimTo=function(){PBGM.auto=1;ovHide();applyU()};
(()=>{try{const _p=pre;pre=function(){try{if(PBGM&&g&&g.kind==='pbg'&&!g.two&&!pbMeAt(pbQ())){return pbOffUI()}if(PBGM&&PBGM.auto){PBGM.auto=0;g.note="You're in: Q"+pbQ()}}catch(e){}return _p.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _o=oppBall;oppBall=function(){const r=_o.apply(this,arguments);try{if(PBGM&&g&&g.kind==='pbg'&&g.ph==='opp'){if(PBGM.auto){ovHide();return applyO()}if(pbNext()&&!pbMeAt(pbQ())){const o=document.getElementById('ov'),b=document.createElement('button');b.className='g';b.textContent="Sim until I'm on the field";b.onclick=()=>{PBGM.auto=1;ovHide();applyO()};o&&o.querySelector('button')&&o.querySelector('button').parentNode.appendChild(b)}}}catch(e){}return r};window.oppBall=oppBall}catch(e){}})();
