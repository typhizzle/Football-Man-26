// ===================== WOMEN: a real female body + face (not the football-player body) =====================
// narrower shoulders, a waist, hips, smaller head, lashes, lips, earrings, and hair that frames the face.
// Used for every woman in the game: girlfriends, celebrities, moms, sisters, guests, the bride.
function femM(j,s,ap,opt){const G=new T3.Group(),A=ap||{},sk=SK[A.sk!=null?A.sk:1],hc=hexC(A.hcl||'#3b2a1a'),top=j.c1,acc=j.c2||j.c1,bot=j.pc||'#2b2b2b',bd=A.bd==null?1:A.bd,hip=[.62,.72,.84][bd],bus=[.08,.11,.15][bd],lw=[.21,.24,.28][bd],o=opt||{};
 // legs (skin under a skirt, pants otherwise) + shoes
 G.L=[-.15,.15].map(x=>{const l=new T3.Group();l.position.set(x*(hip/.62),1.02,0);bx(lw,1,lw+.04,o.skirt?sk:bot,0,-.5,0,l);bx(lw+.05,.36,lw+.08,o.skirt?sk:bot,0,-.2,0,l);bx(.22,.12,.32,o.shoe||0x1b1b1b,0,-.98,-.04,l);G.add(l);return l});
 // hips, waist, chest, shoulders
 bx(hip,.32,.44,bot,0,1.08,0,G);if(o.skirt)bx(hip+.14,.42,.48,bot,0,.92,0,G);bx(.42,.24,.3,top,0,1.34,0,G);bx(.54,.38,.34,top,0,1.62,0,G);bx(.46,.16,bus*1.4+.04,top,0,1.66,-.17-bus*.4,G);bx(.64,.12,.32,top,0,1.82,0,G);
 if(o.bareArms!=null?o.bareArms:false){}
 {const sw_=[.38,.41,.45][bd],slv=(()=>{try{if(typeof top=='string'&&top[0]=='#'){const n=parseInt(top.slice(1),16);return '#'+[16,8,0].map(q=>Math.round(((n>>q)&255)*.8).toString(16).padStart(2,'0')).join('')}return top}catch(e){return top}})();G.A=[-1,1].map(sg=>{const a=new T3.Group();a.position.set(sg*sw_,1.8,0);bx(.17,.36,.19,o.bareArms?sk:slv,0,-.16,0,a);bx(.15,.3,.17,o.bareArms||o.shortSleeve?sk:slv,0,-.46,0,a);bx(.16,.15,.17,sk,0,-.68,0,a);G.add(a);return a})}
 // neck, head, face
 bx(.15,.16,.15,sk,0,1.96,0,G);bx(.54,.56,.52,sk,0,2.28,0,G);
 [-.12,.12].forEach(x=>{bx(.09,.1,.04,0x1b1b1b,x,2.32,-.275,G);bx(.03,.03,.04,0xffffff,x+.025,2.34,-.29,G);bx(.13,.03,.04,0x111111,x,2.39,-.275,G);bx(.03,.05,.04,0x111111,x+(x<0?-.07:.07),2.38,-.277,G);bx(.11,.025,.04,hc,x,2.44,-.275,G)});
 bx(.06,.08,.05,sk,0,2.24,-.28,G);bx(.17,.05,.04,o.lip||0xc2185b,0,2.13,-.275,G);bx(.07,.04,.03,0xf4a7b9,-.17,2.2,-.272,G);bx(.07,.04,.03,0xf4a7b9,.17,2.2,-.272,G);
 if(!o.noEar){[-.28,.28].forEach(x=>bx(.04,.08,.04,0xd4af37,x,2.14,-.02,G))}
 // hair: 4 long (frames the face) · 2 big curls · 1 bob · 5 bun · 0 slicked
 const H=A.hr==null?4:A.hr;if(H==4){bx(.58,.14,.56,hc,0,2.6,0,G);bx(.58,.86,.14,hc,0,2.14,.28,G);[-.29,.29].forEach(x=>bx(.07,.62,.4,hc,x,2.27,.04,G));bx(.5,.08,.06,hc,0,2.52,-.26,G)}
 else if(H==2){bx(.78,.5,.72,hc,0,2.58,.04,G);[-.36,.36].forEach(x=>bx(.12,.48,.56,hc,x,2.3,.06,G))}
 else if(H==1){bx(.58,.14,.56,hc,0,2.6,0,G);[-.29,.29].forEach(x=>bx(.07,.36,.5,hc,x,2.38,.02,G));bx(.58,.36,.12,hc,0,2.38,.27,G)}
 else if(H==5){bx(.58,.14,.56,hc,0,2.6,0,G);bx(.3,.26,.3,hc,0,2.78,.12,G)}
 else{bx(.58,.1,.56,hc,0,2.58,0,G)}
 const sh=new T3.Mesh(new T3.CircleGeometry(.6,10),SHM);sh.rotation.x=-Math.PI/2;sh.position.y=.04;G.add(sh);
 G.rotation.order='YXZ';G.scale.set(s*[.95,1,1.04][bd],s*[.96,1,1.04][A.ht==null?0:A.ht],s*[.95,1,1.04][bd]);G.fem=1;try{mrgM(G)}catch(e){}return G}
// celebrity outfits that need a skirt/bare arms
const FEMO={islice:{bareArms:1},tswiff:{skirt:1},bspurs:{skirt:1},lgogo:{skirt:1},mpony:{skirt:1},ppantera:{skirt:1}};
