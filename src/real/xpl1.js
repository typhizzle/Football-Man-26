// Tyler 2026-11-14: "Extra point is broken. When you watch it, you don't see any of the players on the field. They're just
// kind of standing in random spots." Both teams have to line up for the kick, then the kick plays out and scores.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.XPL_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;S=mig(JSON.parse(j));save=()=>{};startGame0(1,'reg');
 let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});g.ph='pre';g.y=70;setup(0);snap(pp[0],pp[1]);for(let k=0;k<5;k++){try{upd(.03)}catch(e){}}
 // the touchdown play ends with everyone scattered downfield
 const P0=g.pl;[...P0.ol,...P0.dl,...P0.lb,...P0.db,...P0.wr].forEach(p=>{p.x=5+Math.random()*43;p.y=60+Math.random()*45});
 const s0=g.s[0];xp();const P=g.pl,los=g.los;o.los=los;
 o.A_newPlayers=P!==P0;
 o.A_olOnLine=P.ol.every(p=>Math.abs(p.y-los)<3&&Math.abs(p.x-26.5)<8);o.A_dlOnLine=P.dl.every(p=>Math.abs(p.y-los)<4);o.A_defNear=[...P.lb,...P.db].every(p=>Math.abs(p.y-los)<25);
 o.olY=P.ol.map(p=>p.y.toFixed(1)).join(',');
 for(let k=0;k<300&&g.ph=='kick';k++){try{kTick(.03)}catch(e){o.updErr=e.message;break}if(k===40){o.C_midOl=g.pl.ol.every(p=>Math.abs(p.y-los)<4)}}
 o.B_kickDone=!g.kk;o.B_scoreMoved=g.s[0]===s0||g.s[0]===s0+1;o.msg=g.note||g.msg;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
