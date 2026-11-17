// CAMERON NUGENT BACK AT OVERTIME (Tyler 2026-11-17): a Cam save that moved on to the Conference Championship is put back at the Divisional Round overtime (21-21), the coin toss opens, it runs once.
const H=require('/home/claude/real/h.js'),fs=require('fs');const D='/home/claude/specs/cam-after-ot/';
(async()=>{const {b,pg}=await H.open({});const docs={};for(const f of fs.readdirSync(D)){const o=JSON.parse(fs.readFileSync(D+f,'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=o.data||o}
const r=await pg.evaluate(async(docs)=>{const o={};try{const fake={doc:k=>({get:async()=>docs[k]?{exists:true,data:docs[k]}:{exists:false}})};
 S=mig(await cdGet2(fake,'slot6'));SLOT=6;LASTJ='';o.before={gsave:!!S.gsave,py:S.py,pbr:S.pb&&S.pb.r,otfx1:S.otfx1};
 let hubTxt='';const _h=hub;
 hub();await new Promise(r=>setTimeout(r,2500));
 o.after={gsave:S.gsave&&{ot:S.gsave.ot,s:S.gsave.s,clk:S.gsave.clk},otfx1:S.otfx1,name:S.name,seedOk:true,pbr:S.pb&&S.pb.r,ov:((document.getElementById('ov')||{}).innerText||'').slice(0,160),g_ot:g&&g.ot,g_s:g&&g.s};o.C_saved=S.gsave&&S.gsave.s[0]===21&&S.gsave.s[1]===21&&S.gsave.ot===1;o.C_noRepeat=await camFixGo()===false;
 
 
 }catch(e){o.err=e.message+' '+e.stack.slice(0,300)}return o},docs);r.ok=!!(r.after&&r.after.g_ot===1&&/coin toss/i.test(r.after.ov)&&r.C_saved&&r.C_noRepeat&&r.after.pbr===1);console.log(JSON.stringify(r));await b.close()})();
