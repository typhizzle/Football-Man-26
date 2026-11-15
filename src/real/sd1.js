// Tyler 2026-11-15: "where you stand with your team on the sideline and can watch it from the sideline. and third person view ...
// all times move the same for each play, no matter what angle ... literally just ... a camera angle, but you could walk around".
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.SD_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;S=mig(JSON.parse(j));save=()=>{};startGame0(1,'reg');ovHide();
 const sl=ms=>new Promise(r=>setTimeout(r,ms));
 // A: both benches are there, plus you (hidden until a drive is watched)
 o.A_count=SDL.children.length;o.A_benches=SDL.children.filter(c=>c.position.x<-30).length>=18&&SDL.children.filter(c=>c.position.x>30).length>=18;o.A_meHidden=SLV.av&&SLV.av.visible===false;
 const PL_=[{k:'run',gn:4,y0:40,dn:1,tg:10,s:1140}];
 const run=mode=>{g.clk=600;g.r={pts:0,next:25,sec:1140,res:'x',log:[],pl:PL_};watchO();SLV.m=mode;const seen=[];for(let i=0;i<8;i++){try{wTick(.25)}catch(e){}camGame(g.pl.qb,g.pl.qb.x-26.5,false);seen.push(+g.clk.toFixed(2))}const p=cm.position.clone();return {seen,p}};
 // B: the sideline view is the default and the camera is on the sideline at eye height
 g.clk=600;g.r={pts:0,next:25,sec:1140,res:'x',log:[],pl:PL_};SLV.m0=null;watchO();o.B_btn=$('#camb').textContent;o.B_default=SLV.m=='side'&&/Sideline/.test(o.B_btn);camGame(g.pl.qb,0,false);o.B_pos=[cm.position.x,cm.position.y,cm.position.z].map(v=>+v.toFixed(1)).join(',');o.B_onSideline=cm.position.x<-27&&cm.position.x>-37&&cm.position.y<3.5;skipW();
 // C: the clock moves exactly the same in every view
 const s1=run('side');skipW();const s2=run('third');skipW();const s3=run('tv');
 o.C_side=s1.seen.join(',');o.C_third=s2.seen.join(',');o.C_tv=s3.seen.join(',');o.C_sameClock=o.C_side===o.C_third&&o.C_third===o.C_tv&&s1.seen[7]>s1.seen[0];
 o.D_tvIsTv=s3.p.x>50;skipW();
 // D: third person shows you, from behind (away from the field)
 run('third');o.D_meVisible=SLV.av.visible===true;o.D_behind=cm.position.x<SLV.x-1;
 // E: the joystick walks you along the sideline; you can't walk onto the field
 const z0=SLV.z;joy={id:99,ox:0,oy:0,x:1,y:0};for(let i=0;i<25;i++){camGame(g.pl.qb,0,false);await sl(20)}o.E_moved=Math.abs(SLV.z-z0)>1;joy={id:99,ox:0,oy:0,x:0,y:1};for(let i=0;i<60;i++){camGame(g.pl.qb,0,false);await sl(20)}o.E_staysOff=SLV.x<=-28.4;joy=null;
 // F: the button cycles views while watching; after the drive the normal camera button is back
 camb();o.F_next=$('#camb').textContent;camb();o.F_next2=$('#camb').textContent;o.F_cycles=/TV/.test(o.F_next)&&/Sideline/.test(o.F_next2);
 skipW();o.F_backNormal=!/Sideline|Third|TV broadcast/.test($('#camb').textContent)&&SLV.av.visible===false;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
