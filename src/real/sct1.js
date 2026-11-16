// Short save codes away from claude.ai (Tyler 2026-11-16, for his friends): with no claude.ai storage, a named code is stored online
// (textdb.dev); a second phone loads it by name; another phone can't take the name (a free one is offered); the first phone updates it.
const H=require('/home/claude/real/h.js');
(async()=>{const NAME='T'+Math.random().toString(36).slice(2,9).toUpperCase();const out={name:NAME};
 // phone 1: a career, make the code
 let P=await H.open({file:process.env.SC_FILE,allow:['textdb.dev']});
 await P.pg.evaluate(()=>{window.confirm=()=>true;window.alert=()=>{};localStorage.clear();SLOT=5;newC();tkStart()});await new Promise(r=>setTimeout(r,1500));
 out.A=await P.pg.evaluate(async(NAME)=>{const o={};try{try{navigator.clipboard.writeText=async()=>{}}catch(e){}const e0=tkList()[0];tkGo(e0.i);ovHide();for(let i=0;i<2;i++){const ev=pevt();if(ev.t=='pro')psim(ev)}o.wk=S.wk;o.name=S.name;
  settings();await new Promise(r=>setTimeout(r,300));$('#scn').value=NAME;await scMake();o.msg=$('#xm').textContent.slice(0,80);o.shown=$('#xc').value;window._dev=txDev()}catch(e){o.err=e.message}return o},NAME);
 const dev1=await P.pg.evaluate(()=>txDev());
 // phone 2: brand new phone, load by name (lower case typed)
 const Q=await H.open({file:process.env.SC_FILE,allow:['textdb.dev']});await Q.pg.evaluate(()=>{localStorage.clear()});
 out.B=await Q.pg.evaluate(async(NAME)=>{const o={};try{window.confirm=()=>true;const s=await readCode(NAME.toLowerCase());o.loaded=!!s;o.name=s&&s.name;o.wk=s&&s.wk}catch(e){o.err=e.message}return o},NAME);
 // phone 2 tries to take the same name
 out.C=await Q.pg.evaluate(async(NAME)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};SLOT=6;newC();await new Promise(r=>setTimeout(r,300));tkStart();await new Promise(r=>setTimeout(r,1200));const e0=tkList()[1];tkGo(e0.i);ovHide();settings();await new Promise(r=>setTimeout(r,300));$('#scn').value=NAME;await scMake();o.msg=$('#xm').textContent.slice(0,90);o.suggest=$('#scn').value}catch(e){o.err=e.message}return o},NAME);
 // phone 1 updates its code after another game
 out.D=await P.pg.evaluate(async(NAME)=>{const o={};try{const ev=pevt();if(ev.t=='pro')psim(ev);o.wk=S.wk;settings();await new Promise(r=>setTimeout(r,300));$('#scn').value=NAME;await scMake();o.msg=$('#xm').textContent.slice(0,60);const s=await readCode(NAME);o.reloadWk=s&&s.wk}catch(e){o.err=e.message}return o},NAME);
 out.A_ok=out.A.shown===NAME&&/Your code is/.test(out.A.msg||'');out.B_ok=!!out.B.loaded&&out.B.name===out.A.name&&out.B.wk===out.A.wk;
 out.C_ok=/already taken/.test(out.C.msg||'')&&out.C.suggest!==NAME;out.D_ok=out.D.reloadWk===out.D.wk&&out.D.wk>out.A.wk;
 console.log(JSON.stringify(out,null,1));await P.b.close();await Q.b.close()})();
