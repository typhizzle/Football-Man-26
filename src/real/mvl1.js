// MVP ladder + Pro Bowl tap votes (Tyler 2026-11-15/16): ladder of who leads the MVP race by the season so far, redrawn each
// week with moves; its own section with Pro Bowl voting at the bottom; 5 taps on a player = one 1,000-vote ballot; fans count.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});
await pg.evaluate(()=>{window.confirm=()=>true;window.alert=()=>{};localStorage.clear();SLOT=5;newC();tkStart()});await new Promise(r=>setTimeout(r,1500));
const out=await pg.evaluate(async()=>{const o={};try{save=()=>{};
 const e0=tkList().find(x=>/Hilton/.test(x.n))||tkList()[0];tkGo(e0.i);ovHide();
 hub();const cd=ui.querySelector('[data-mvl]');o.A_menu=!!cd&&/MVP race/.test(cd.innerText)&&![...ui.querySelectorAll('button')].some(x=>/MVP ladder/.test(x.textContent));
 o.A_empty=!!cd&&/starts after week 1/.test(cd.innerText);
 const wk=()=>{let g=0;while(g++<4){const e=pevt();if(e.t=='pro'){psim(e);hub();return}if(e.t=='bye'){pWeek(null);hub();return}hub()}};
 wk();wk();hub();const t1=ui.querySelector('[data-mvl]').innerText;o.A_underLeaders=(()=>{const c=[...ui.querySelectorAll('.card')];const i=c.findIndex(x=>x.hasAttribute('data-mvl'));return i>0&&/League leaders/.test(c[i-1].innerText)})();o.B_rows=(t1.match(/^\d+\. /gm)||[]).length;o.B_list=t1.split('\n').filter(l=>/^\d+\. /.test(l)).slice(0,5);
 o.B_header=/after week 2/.test(t1);o.B_moves=/▲|▼|–|NEW/.test(t1);o.B_qbsLead=mvlRows().slice(0,3).every(r=>r.pos=='QB');
 o.B_snaps=Object.keys(S.mvl.h).join(',');
 // C: bottom of the ladder: the Pro Bowl voting button; it opens its own page
 const bs=[...ui.querySelector('[data-mvl]').querySelectorAll('button')];const pb=bs.find(x=>/Pro Bowl voting/.test(x.textContent));o.C_atBottom=!!pb&&bs.indexOf(pb)===bs.length-1;
 pb.click();o.C_page=/Pro Bowl voting/.test(ui.innerText)&&/You get 10 votes a week/.test(ui.innerText)&&/votes? left this week/.test(ui.innerText)&&!/taps? left/.test(ui.innerText);
 // D (2026-11-16 later: 10 votes a week, 1 tap = 1 vote = 1,000 fans): one tap = +1,000 exactly, 5 taps = +5,000, no dots; the page doesn't jump; fans' votes count
 pbV('QB');const L=pbBallot().QB.sort((a,b)=>pbVotes(b)-pbVotes(a));const c=L[5];const v0=pbVotes(c);ui.scrollTop=40;
 pbVote(c.n);o.D_4taps=pbVotes(c)-v0===1000?0:-1;for(let i=0;i<4;i++)pbVote(c.n);o.D_5taps=pbVotes(c)-v0===5000?1000:-1;o.D_dots=/[●○]/.test(ui.innerText);
 o.D_fans=pbFan(c)>0&&pbFan(c)>pbMine(c.n);
 const before=pbFan(c);S.wk=(S.wk||0)+3;o.D_fansGrow=pbFan(c)>before;S.wk-=3;
 // E: 10 votes a week, then it stops
 for(let i=0;i<80;i++)pbVote(c.n);const V=pbS();o.E_cap=V.wk['w'+(S.wk||0)]===10&&V.t[c.n]===10;o.E_votes=pbMine(c.n)===10000;
 // F: an old save's votes (1 vote each) stay 1,000 each; a save from the 5-taps system keeps exactly its finished votes (13 taps = 2 = 2,000) and this week's 7 taps used = 2 votes used (8 left, as it showed)
 S.pbv={y:yrN(),u:{[c.n]:3},wk:{w1:3},closed:0};o.F_old=pbMine(c.n)===3000&&S.pbv.wk.w1===3;
 S.pbv={y:yrN(),u:{[c.n]:2},t:{[c.n]:13},wk:{w1:7},tp:1,closed:0};o.F_old5=pbMine(c.n)===2000&&S.pbv.wk.w1===2;
 // G: a week later the ladder is redrawn and the older week is kept as it was
 const keep=JSON.stringify(S.mvl.h);wk();hub();o.G_newWeek=Object.keys(S.mvl.h).length>=3;o.G_oldKept=Object.entries(JSON.parse(keep)).every(([k,v])=>JSON.stringify(S.mvl.h[k])===JSON.stringify(v));
 o.G_arrowsSince=/since week/.test(ui.querySelector('[data-mvl]').innerText);
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o});
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
