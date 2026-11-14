// real three.js r128 harness (SwiftShader WebGL)
const pp=(()=>{try{return require('/opt/npm-tools/node_modules/puppeteer-core')}catch(e){return require('/home/claude/real/node_modules/puppeteer-core')}})(),fs=require('fs');
const THREE_SRC=fs.readFileSync('/home/claude/real/three.min.js','utf8');
exports.open=async(o={})=>{const b=await pp.launch({executablePath:['/opt/pw-browsers/chromium-1194/chrome-linux/chrome','/opt/pw-browsers/chromium-1243/chrome-linux64/chrome','/opt/pw-browsers/chromium'].find(f=>fs.existsSync(f)),args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--enable-webgl'],headless:true,protocolTimeout:900000});
const pg=await b.newPage();await pg.setViewport({width:o.w||390,height:o.h||844,deviceScaleFactor:o.dpr||1});const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()=='error')errs.push('console: '+m.text())});
await pg.setRequestInterception(true);pg.on('request',r=>{const u=r.url();if(u.includes('three.min.js'))r.respond({status:200,contentType:'application/javascript',body:THREE_SRC});else if(u.startsWith('file:'))r.continue();else r.abort()});
await pg.goto('file://'+(o.file||'/mnt/user-data/outputs/football-man.html'));await new Promise(r=>setTimeout(r,1500));return{b,pg,errs}};
