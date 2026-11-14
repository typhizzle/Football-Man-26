// ============ dressing a model is now REPEATABLE ============
// Three separate wrappers ended up calling fitExtras on the same model (base, cowboy
// hat-removal, mask lift), so the hat and the cleats were built two or three times over
// — 35 meshes where there should have been 23. Everything added is now parked in its own
// group and torn down before the next pass, so calling this any number of times gives
// the same result as calling it once.
window.fitHat=function(m,k,id){try{
 if(!m||!k||typeof hatOn!='function')return null;
 const g=new T3.Group();g.position.y=(id&&window.HATLIFT&&HATLIFT[id])||0;
 m.add(g);hatOn(g,k);return g;
}catch(e){return null}};

window.fitShoe=function(m,k){try{
 const C=(window.FTC||{})[k];if(!C||!m||!m.L)return [];
 const out=[];
 m.L.forEach(l=>{
  const g=new T3.Group();l.add(g);out.push(g);
  // the leg already has a white cuff at -.82 and a dark shoe at -1.00, so every piece
  // has to be plainly bigger than those or it z-fights and vanishes inside them
  bx(.50,.19,.70,C[0],0,-1.00,-.08,g);   // sole and toe
  bx(.48,.34,.58,C[0],0,-.80,-.04,g);    // the upper: the bit you see above the grass
  bx(.52,.08,.30,C[1],0,-.84,-.26,g);    // stripe across the toe
  bx(.52,.07,.62,C[1],0,-.62,-.03,g);    // collar
  if(C[2])bx(.40,.44,.46,C[0],0,-.52,.00,g);   // boot shaft
 });
 return out}catch(e){return []}};

window.fitExtras=function(m,id){try{
 if(!m||typeof S=='undefined'||!S)return m;
 if(Array.isArray(m.__add))m.__add.forEach(o=>{try{if(o&&o.parent)o.parent.remove(o)}catch(e){}});
 m.__add=[];
 const h=S.hat||'',f=S.shoe||'';
 const g=fitHat(m,h,id);if(g)m.__add.push(g);
 fitShoe(m,f).forEach(x=>m.__add.push(x));
 m.__fx=null;
 return m}catch(e){return m}};
