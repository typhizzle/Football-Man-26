// RESUME WHERE YOU LEFT (Tyler 2026-11-16): "when you leave ... sometimes it'll give them the ball, even though you were on like a
// second down ... it should resume game on whatever play you were on and it shouldn't restart drives". Leaving = the saved game is
// read back into a fresh page (the save JSON), then Play/Resume.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const F=process.env.RSM_FILE;const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const A=await H.open({file:F});
const st=await A.pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';save=()=>{};
 startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();await new Promise(r=>setTimeout(r,500));
 // 1) the other team has the ball: their drive is decided
 g.nx=30;oppBall();o.r1=g.r&&{pts:g.r.pts,res:g.r.res,next:g.r.next};o.s1=JSON.stringify(S.gsave&&{opp:S.gsave.opp,hasR:!!S.gsave.r});o.save1=JSON.stringify(S);
 // 2) their drive ends, you get the ball (first down, nothing played yet)
 applyO();o.g2={y:g.y,dn:g.dn,ph:g.ph,s:[...g.s]};o.save2=JSON.stringify(S);
 // 3) a play later: 2nd down and 6 at a new spot (the game's own after-play path: down++, then the next play is called)
 g.y+=4;g.tg=6;g.dn=2;pre();o.g3={y:g.y,dn:g.dn,tg:g.tg,s:[...g.s],clk:g.clk};o.save3=JSON.stringify(S);
}catch(e){o.err=e.message}return o},j);await A.b.close();
const out={err:st.err};
const back=async(js)=>{const P=await H.open({file:F});const r=await P.pg.evaluate(async(js)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(js));SLOT=4;LASTJ='';save=()=>{};
  o.ok=typeof gsOk=='function'&&gsOk();resumeG();await new Promise(r=>setTimeout(r,300));o.ph=g.ph;o.y=g.y;o.dn=g.dn;o.tg=g.tg;o.s=[...g.s];o.clk=g.clk;o.r=g.r&&{pts:g.r.pts,res:g.r.res,next:g.r.next};
 }catch(e){o.err=e.message}return o},js);await P.b.close();return r};
// A: left while they had the ball: resumes with THEIR SAME drive (not a new one), score unchanged
const a=await back(st.save1);out.A=a;out.A_sameDrive=!!st.r1&&!!a.r&&JSON.stringify(a.r)===JSON.stringify(st.r1)&&a.ph==='opp';
// B: left right after their drive (your ball, nothing played): your ball, same spot and score; their drive is not played again
const b2=await back(st.save2);out.B=b2;out.B_yourBall=b2.ph==='pre'&&b2.y===st.g2.y&&b2.dn===1&&JSON.stringify(b2.s)===JSON.stringify(st.g2.s);
// C: left on 2nd down: 2nd down, same spot, same distance, same score and clock
const c=await back(st.save3);out.C=c;out.C_secondDown=c.ph==='pre'&&c.dn===2&&c.y===st.g3.y&&c.tg===st.g3.tg&&JSON.stringify(c.s)===JSON.stringify(st.g3.s)&&c.clk===st.g3.clk;
console.log(JSON.stringify(out,null,1))})();
