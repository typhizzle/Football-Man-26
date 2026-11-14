// The Woo-hoo scene runs in the 3D home: both figures on the bed with censor bars, then everything is put back.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.WO_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;S=mig(JSON.parse(j));SLOT=4;LASTJ='';if(!S.gf)S.gf={n:'Taylor Blue',aff:90,status:'married'};S.gf.home=1;
 homeWalk();await new Promise(r=>setTimeout(r,800));o.inHome=!!(LR&&LR.O);o.hasBed=!!(LR&&LR.O.find(x=>x.k=='hbed'));o.hasGf=!!(LR&&LR.O.find(x=>x.k=='hgf'));
 S.ap=S.ap||{};S.ap.hcl='#6b3a1f';S.ap.hr=1;const n0=PL.children.length;wooScene();await new Promise(r=>setTimeout(r,500));const n1=PL.children.length;
 let bars=0;PL.traverse(m=>{if(m.material&&m.material.type==='MeshBasicMaterial'&&m.material.color&&m.material.color.getHex()===0)bars++});o.A_sceneShown=n1>n0&&bars>=3;o.bars=bars;o.A_meshesHidden=LR.pm.visible===false;
 const G=PL.children[PL.children.length-1];let spr=0,cols=new Set();G.traverse(m=>{if(m.type==='Sprite')spr++;if(m.material&&m.material.color)cols.add(m.material.color.getHex())});
 const ap=S.ap||{};o.C_nameTags=spr>=2;o.C_mySkin=cols.has(SK[ap.sk!=null?ap.sk:1]);o.C_herSkin=cols.has(SK[S.gf.sk!=null?S.gf.sk:2]);o.C_myHair=(ap.hr===0)||cols.has(new T3.Color(hexC(ap.hcl||'#1b1b1b')).getHex());o.C_herHair=cols.has(new T3.Color(hexC(S.gf.hc||'#5a3825')).getHex());
 await new Promise(r=>setTimeout(r,4600));o.B_cleanedUp=PL.children.length===n0&&LR.pm.visible===true;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
