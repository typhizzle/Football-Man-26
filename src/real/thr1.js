// title-screen throw: freeze time at points of the loop and screenshot
const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,tag=process.argv[4]||'p',loop=+(process.argv[5]||0);const {b,pg,errs}=await H.open({w:W,h:Hh});
const wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(1500);
await pg.evaluate(()=>{window.__T=0;const pn=performance.now.bind(performance);performance.now=()=>window.__T*1000;ui.style.display='none'});
const ts=(process.argv[6]||'0.5,1.5,1.85,1.98,2.06,2.11,2.2,2.33,2.6,3.2,3.9,4.3').split(',').map(Number);
for(const u of ts){const t=loop*5.4+u;await pg.evaluate(t=>{window.__T=t},t);await wait(350);await pg.screenshot({path:`/home/claude/real/thr/${tag}_${loop}_${u.toFixed(2)}.png`})}
console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
