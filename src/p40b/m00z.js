// ===================== 🗜 save compression (keeps every slot well under the browser's storage limit) =====================
const ZMAX=1<<18,ZH=1<<19;let ZT=null;
function zPack(s){if(!ZT)ZT={w:new Int32Array(ZH),c:new Int32Array(ZH),v:new Int32Array(ZH)};const TW=ZT.w,TC=ZT.c,TV=ZT.v;TV.fill(0);
 let next=0,w=-1,k=0;const out=[];let buf=0,nb=0;
 const put=(c,wd)=>{buf=buf*(1<<wd)+c;nb+=wd;while(nb>=15){nb-=15;const p=2**nb,v=Math.floor(buf/p);out.push(v+32);buf-=v*p}};
 const wid=k=>k<2?16:32-Math.clz32(65536+Math.min(k-2,ZMAX-1));
 for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);if(w<0){w=c;continue}let h=(Math.imul(w,0x9E3779B1)^Math.imul(c,0x85EBCA77))>>>13&(ZH-1),f=0;
  while(TV[h]){if(TW[h]===w&&TC[h]===c){f=TV[h];break}h=(h+1)&(ZH-1)}
  if(f){w=f-1;continue}k++;put(w,wid(k));if(next<ZMAX){TW[h]=w;TC[h]=c;TV[h]=65536+next+1;next++}w=c}
 if(w>=0){k++;put(w,wid(k))}if(nb)put(0,15-nb);let r='';for(let i=0;i<out.length;i+=8192)r+=String.fromCharCode.apply(null,out.slice(i,i+8192));return 'Z1'+k.toString(36)+'|'+r}
function zUnpack(z){const p=z.indexOf('|'),n=parseInt(z.slice(2,p),36);let pos=p+1,buf=0,nb=0;
 const get=wd=>{while(nb<wd){buf=buf*32768+(z.charCodeAt(pos++)-32);nb+=15}nb-=wd;const q=2**nb,v=Math.floor(buf/q);buf-=v*q;return v};
 const D=[];const wid=k=>k<2?16:32-Math.clz32(65536+Math.min(k-2,ZMAX-1));
 if(!n)return '';let prev=String.fromCharCode(get(16));const out=[prev];for(let k=2;k<=n;k++){const c=get(wid(k));let e=c<65536?String.fromCharCode(c):D[c-65536];if(e===undefined)e=prev+prev[0];out.push(e);if(D.length<ZMAX)D.push(prev+e[0]);prev=e}return out.join('')}
const dz=v=>v&&v.charCodeAt(0)==90&&v.startsWith('Z1')?zUnpack(v):v,ez=s=>s&&s.length>4000?zPack(s):s;
