// ===== "best in this state" has to follow where your career actually is =====
// ST and QAN are top-level constants built before a save exists, so a template string
// would freeze at load. The wording is rewritten in place whenever the stage changes.
window.ARENAW=function(){try{const st=(typeof S!='undefined'&&S&&S.stage)||'hs';
 return st=='col'?'nation':(st=='pro'||st=='draft')?'league':'state'}catch(e){return 'state'}};
window.arenaFix=function(){try{
 const w=ARENAW();if(window.__arenaW===w)return;window.__arenaW=w;
 const fix=s=>s.replace(/in this (state|nation|league)\b/g,'in this '+w)
                .replace(/in the (state|nation|league)\b/g,'in the '+w);
 const seen=new Set();
 const walk=o=>{if(!o||seen.has(o))return;seen.add(o);
  if(Array.isArray(o)){o.forEach((v,i)=>{if(typeof v=='string')o[i]=fix(v);else walk(v)})}
  else if(typeof o=='object'){Object.keys(o).forEach(k=>{if(typeof o[k]=='string')o[k]=fix(o[k]);else walk(o[k])})}};
 if(typeof ST!='undefined')walk(ST);
 if(typeof QAN!='undefined')walk(QAN);
}catch(e){}};
(()=>{try{const _h=hub;hub=function(){arenaFix();return _h.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _t=talk;talk=function(){arenaFix();return _t.apply(this,arguments)}}catch(e){}})();

// ===== a mask replaces a mask; only hats go over one =====
// The skull mask was sitting on top of the Pumpkin Man's head. Anything that IS a face
// covering now takes the costume's head off and goes on the real head instead.
window.HATMASK={skull:1,wh_helm:1};
window.MASKFIT={hx2:1,hx3:1,hw6:1};
window.maskSwap=function(m,id,k){try{
 if(!m||!k||!HATMASK[k]||!MASKFIT[id])return 0;
 const kill=(m.children||[]).filter(c=>c&&!c.geometry&&c.children&&c.children.length&&c.position&&c.position.y>=2.0);
 kill.forEach(c=>m.remove(c));
 return kill.length}catch(e){return 0}};
(()=>{try{const _f=fitHat;
 window.fitHat=function(m,k,id){try{
  if(k&&HATMASK[k]&&MASKFIT[id]){maskSwap(m,id,k);const g=new T3.Group();m.add(g);hatOn(g,k);return g}
 }catch(e){}
 return _f.apply(this,arguments)}}catch(e){}})();
