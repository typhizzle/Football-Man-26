// BUILD STAMP: the game shows its build number (Tyler 2026-11-17).
const H=require('/home/claude/real/h.js');
(async()=>{const {b,pg}=await H.open({});const r=await pg.evaluate(()=>({txt:(document.getElementById('bldstamp')||{}).textContent,ok:!!document.getElementById('bldstamp')&&BUILD==='0012'}));console.log(JSON.stringify(r));await b.close()})();
