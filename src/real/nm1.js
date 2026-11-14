// NAME CLASHES. Two shipped/caught bugs on 2026-11-14 came from a new module reusing a name the game
// already had: crV (college Top 25 screen overwritten by Coach history), and PWC/PWN/AWK (silently
// shadowed by the game's consts). This scans every window.NAME a module defines (m121 onward) against
// every declaration elsewhere in the base game and the other modules, and checks the live page.
const fs=require('fs'),D='/home/claude/p40b/';
const files=fs.readdirSync(D).filter(f=>/\.(js|html)$/.test(f));
const src={};files.forEach(f=>src[f]=fs.readFileSync(D+f,'utf8'));
const mine=files.filter(f=>/^m1(2[1-9]|[3-9]\d)\.js$/.test(f));
const out={checked:0,clashes:[]};
mine.forEach(f=>{const names=[...src[f].matchAll(/window\.([A-Za-z_$][\w$]*)\s*=/g)].map(m=>m[1]);
 [...new Set(names)].forEach(n=>{out.checked++;
  const re=new RegExp('(?:function\\s+'+n+'\\s*\\(|(?:const|let|var)\\s+'+n+'\\s*=|[,;]\\s*'+n+'\\s*=\\s*(?:\\(|function|\\[|\\{|`|\'|"|\\d))');
  files.forEach(o=>{if(o===f)return;if(re.test(src[o].replace(new RegExp('window\\.'+n,'g'),'')))out.clashes.push(n+' (defined in '+f+') clashes with '+o)})})});
(async()=>{const H=require('/home/claude/real/h.js');const {b,pg}=await H.open({});
 out.live=await pg.evaluate(()=>({collegeTop25NotCoach:crV!==coachV&&!String(crV).includes('Coach history'),coachHistory:typeof coachV==='function',powerConfIsFn:typeof PWC==='function',awkHasRing:!!(AWK&&AWK.ring)}));
 await b.close();console.log(JSON.stringify(out,null,1))})();
