// ============ 🤠 Golden Cowboy: real gold, and a lasso he is actually holding ============
// Everything in the game is MeshLambertMaterial, which has no specular term at all — it
// physically cannot shine, so "gold" came out as flat mustard. These pieces get Phong
// material with a soft warm highlight: a gold-yellow sheen that catches the light, NOT
// a sparkle. Emissive is zero on purpose — any glow at all reads as neon, not metal.
window.GOLDM={};
window.goldMat=function(col,spec,shin,emi){
 const k=col+'_'+spec+'_'+shin+'_'+emi;
 if(GOLDM[k])return GOLDM[k];
 return GOLDM[k]=new T3.MeshPhongMaterial({color:col,specular:spec,shininess:shin,emissive:emi,reflectivity:1});
};
// old flat colour -> the gold that replaces it
window.GOLDMAP={
 0xe8b923:[0xd4a71c,0x9a7d2e,38,0x000000],   // suit body
 0xc9a15a:[0xbe9419,0x8a7029,34,0x000000],   // trousers / trim
 0xb8860b:[0x8c6a0d,0x4a3a14,22,0x000000],   // hat band, buckles
 0xf5f0e1:[0xdcc05e,0x9a8238,40,0x000000],   // the hat itself
 0xd4af37:[0xc0a330,0x6a561f,28,0x000000]
};
window.goldify=function(m){try{if(!m)return 0;let n=0;
 m.traverse(o=>{try{
  if(!o.material||!o.material.color)return;
  const hex=o.material.color.getHex(),G=GOLDMAP[hex];
  if(!G)return;
  o.material=goldMat(G[0],G[1],G[2],G[3]);n++;
 }catch(e){}});
 return n}catch(e){return 0}};

// the Golden Cowboy suit and its hat, in real gold
(()=>{try{if(typeof outfitM!='function')return;const _o=outfitM;
 outfitM=function(id){const m=_o.apply(this,arguments);
  try{if(m&&id=='hx7')goldify(m)}catch(e){}
  return m}}catch(e){}})();
(()=>{try{if(typeof fitHat!='function')return;const _f=fitHat;
 fitHat=function(m,k,id){const r=_f.apply(this,arguments);
  try{if(k=='wh_gcow')goldify(m)}catch(e){}
  return r}}catch(e){}})();
