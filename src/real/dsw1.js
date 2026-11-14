// Tyler 2026-11-14: "I did throw an interception earlier when I was aiming for the end zone and it threw it to my running
// back instead." + "Should be able to flirt with Mia anytime you talk to her ... even on the field if you're in college or pro."
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.DSW_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;S=mig(JSON.parse(j));save=()=>{};
 // A: a swipe drawn up the middle toward the end zone. The back sits right on the line, 5 yards out; the deep man is 25 out, a bit off the line.
 const q={x:26,y:50},rb={n:'RB',x:27,y:55,vx:0,vy:0},wr={n:'WR',x:33,y:75,vx:0,vy:0},te={n:'TE',x:15,y:58,vx:0,vy:0};
 try{g.pl={qb:q,wr:[rb,wr,te],car:q}}catch(e){g={pl:{qb:q,wr:[rb,wr,te],car:q}}}
 const rbPick={w:rb,how:'ray',off:10};
 const A={d:30,G:[30,q.y+30]};const p1=typeof swDeepFix=='function'?swDeepFix(rbPick,A,g.pl):rbPick;o.A_deepPick=p1&&p1.w.n;o.A_notRB=!!p1&&p1.w.n==='WR';
 o.A_wired=/swDeepFix/.test(String(swPick));
 upj=(sx,sy)=>sy<300?[30,q.y+30]:sy<500?[27,q.y+6]:[26,q.y-6];o.A_aimDeep=typeof swAimD=='function'&&swAimD(200,100).d===30&&swAimD(200,700).d===-6;
 // B: a short aim (6 yds) or a pass behind the line to the back still goes to the back
 const p2=typeof swDeepFix=='function'?swDeepFix(rbPick,{d:6,G:[27,q.y+6]},g.pl):rbPick;const p3=typeof swDeepFix=='function'?swDeepFix(rbPick,{d:-6,G:[26,q.y-6]},g.pl):rbPick;o.B_shortRB=p2.w.n==='RB'&&p3.w.n==='RB';
 // C: the fallback (nobody on the line): a deep landing spot can't name a back as the target
 o.C_fallback=typeof swOkT=='function'&&swOkT(rb,[30,q.y+30],q,[rb,wr,te])===false&&swOkT(wr,[30,q.y+30],q,[rb,wr,te])===true&&swOkT(rb,[27,q.y+6],q,[rb,wr,te])===true;
 // D: Mia, single pro, 18+: the flirt button is on her post-game question, and flirting returns to the question
 S.gf=null;S.stage='pro';S.age=Math.max(S.age||0,22);S.datOff=0;S.mfl=null;
 talk('reporter','Reporter Mia · Post-game','Big win tonight. How did it feel?','happy',[['🔥 "We came to play."',"ovHide()"]]);
 const txt=()=>[...document.querySelectorAll('button')].map(x=>x.textContent).join(' | ');
 o.D_btns=txt().slice(0,300);o.D_flirt=/Flirt with Mia|Ask Mia out/.test(txt());
 if(typeof miaFlirt=='function')miaFlirt();o.D_back=/Back to the interview/.test(txt());
 if(typeof miaBack=='function')miaBack();o.D_returned=/How did it feel/.test(document.body.innerText);
 // E: taken -> no flirt button (her rule)
 S.gf={n:'Taylor Blue',status:'married',aff:90};talk('reporter','Reporter Mia · Post-game','Q2?','happy',[['A',"ovHide()"]]);o.E_takenNoFlirt=!/Flirt with Mia/.test(txt());
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
console.log(JSON.stringify(out,null,1));await b.close()})();
