// ---------------- locker rooms: helmets that read as helmets, and a nicer room at every level ----------------
let LRT=1;// 0 high school, 1 college, 2 pros
function lkHelm(x,hc,sc,T,P){const G=new T3.Group();G.position.set(x,4.66,-8.4);P.add(G);hc=lrMix(hc,hc,0);const light=lum(hc)>.5,fm=light?0x1f1f1f:0xd2d2d2,inn=0x0b0b0b,sc2=lum(lrMix(sc,sc,0))>.85&&light?lrMix(T.c1||'#333333','#000000',.1):sc;
// shell: widest at the ear line, rounded crown, flared neck guard at the back
bx(.8,.3,.84,hc,0,.15,-.04,G);bx(.88,.24,.9,hc,0,.39,-.03,G);bx(.82,.14,.84,hc,0,.58,-.03,G);bx(.7,.1,.74,hc,0,.7,-.04,G);bx(.5,.07,.56,hc,0,.78,-.05,G);bx(.78,.18,.16,hc,0,.1,-.47,G);
// face opening, brow and ear holes
bx(.54,.32,.06,inn,0,.24,.41,G);bx(.66,.12,.1,hc,0,.47,.41,G);bx(.13,.3,.14,hc,-.34,.2,.38,G);bx(.13,.3,.14,hc,.34,.2,.38,G);[-1,1].forEach(s=>bx(.03,.09,.09,inn,s*.445,.33,.05,G));
// centre stripe over the crown, front to back
bx(.12,.04,.58,sc2,0,.825,-.05,G);bx(.12,.05,.3,sc2,0,.76,.28,G);bx(.12,.05,.3,sc2,0,.76,-.38,G);
// facemask cage
bx(.64,.05,.05,fm,0,.37,.53,G);bx(.6,.05,.05,fm,0,.22,.56,G);bx(.42,.05,.05,fm,0,.07,.54,G);bx(.05,.34,.05,fm,0,.22,.57,G);
[-1,1].forEach(s=>{bx(.05,.34,.05,fm,s*.31,.22,.54,G);bx(.05,.05,.16,fm,s*.34,.37,.46,G);bx(.05,.05,.16,fm,s*.33,.1,.47,G)});
// chin strap and cup
[-1,1].forEach(s=>bx(.03,.2,.03,0xf2f2f2,s*.29,.02,.42,G));bx(.32,.06,.14,0xf2f2f2,0,-.05,.48,G);
const lg=HLOGO(T);[-1,1].forEach(sd=>{const m=new T3.Mesh(new T3.PlaneGeometry(.38,.38),new T3.MeshBasicMaterial({map:lg,transparent:true}));m.position.set(sd*.452,.4,0);m.rotation.y=sd*Math.PI/2;G.add(m)});
G.rotation.y=(x*7.3%1-.5)*.12;mrg(G);return G}
const glowM={};function glow(w,h,d,c,x,y,z,P){const k=String(c),m=new T3.Mesh(new T3.BoxGeometry(w,h,d),glowM[k]||(glowM[k]=new T3.MeshBasicMaterial({color:c})));m.position.set(x,y,z);P.add(m);return m}
function lrTier(R3,T,PR){const c1=lrMix(T.c1||'#444444',T.c1||'#444444',0),c2=lrMix(T.c2||'#ffffff',T.c2||'#ffffff',0);
if(LRT==0){// high school: painted cinder block, concrete, fluorescent lights, a mop bucket
 const mo='#a7a092';for(let y=.55;y<7.9;y+=.55){[-1,1].forEach(s=>bx(.04,.035,23,mo,s*19.67,y,1.5,R3));if(y>6.2)bx(40,.035,.04,mo,0,y,-9.17,R3)}
 [-1,1].forEach(s=>bx(.05,.45,23,c1,s*19.66,2.3,1.5,R3));bx(40,.45,.05,c1,0,6.55,-9.16,R3);
 bx(.6,.5,.6,0xf1c40f,-18.7,.25,-1.25,R3);bx(.06,1.7,.06,0x8b6b3a,-18.6,1.1,-1.2,R3);bx(.5,.08,.5,0x222222,-18.7,.52,-1.25,R3);PR.push([-19.2,-18.2,-1.7,-.8]);
 {const c=document.createElement('canvas');c.width=256;c.height=160;const x=c.getContext('2d');x.fillStyle='#fdfdf6';x.fillRect(0,0,256,160);x.fillStyle='#c0392b';x.font='900 34px Impact,sans-serif';x.textAlign='center';x.fillText('LOCK YOUR',128,58);x.fillText('LOCKERS!',128,100);x.fillStyle='#333';x.font='18px sans-serif';x.fillText('- Coach',128,138);const m=new T3.Mesh(new T3.PlaneGeometry(1.4,.88),new T3.MeshBasicMaterial({map:new T3.CanvasTexture(c)}));m.position.set(7.95,3.6,-7.57);R3.add(m)}
 return}
if(LRT==1){// college: wood trim and a lit team stripe
 bx(40,.08,.08,0x6b4423,0,6.95,-9.16,R3);[-1,1].forEach(s=>bx(.08,.08,23,0x6b4423,s*19.66,6.95,1.5,R3));return}
// pros: dark wood, gold trim, LED lockers, leather chairs, cold tubs, a lounge and a lit ceiling halo
const gold=0xc9a227;bx(40,.07,.09,gold,0,6.92,-9.16,R3);[-1,1].forEach(s=>{bx(.09,.07,23,gold,s*19.65,6.92,1.5,R3);for(let z=-9;z<=12.6;z+=1.2)bx(.05,7.4,.32,'#4a3222',s*19.66,3.75,z,R3)});
for(let k=0;k<9;k++){const x=-17.4+k*2.9;[-1,1].forEach(s=>glow(.05,5.4,.05,c2,x+s*1.2,3.25,-7.7,R3));glow(2.3,.05,.05,c2,x,5.86,-7.7,R3);
 if(k==1||k==3)continue;bx(1.1,.16,.95,0x151313,x,.55,-7.15,R3);bx(1.1,1.05,.16,0x151313,x,1.15,-7.58,R3);bx(1.12,.06,.97,c1,x,.64,-7.15,R3);[-1,1].forEach(s=>{bx(.08,.5,.08,0x8a8a8a,x+s*.45,.25,-6.8,R3);bx(.08,.5,.08,0x8a8a8a,x+s*.45,.25,-7.5,R3)})}
bx(28,.03,1.1,0xe9e4da,-5.2,.045,-6.55,R3);
for(let i=0;i<28;i++){const a=i/28*Math.PI*2;glow(.75,.06,.22,i%2?0xffffff:c2,-1+Math.cos(a)*6.2,7.96,4.5+Math.sin(a)*6.2,R3).rotation.y=-a}
{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.fillStyle=c1;x.beginPath();x.arc(128,128,120,0,7);x.fill();x.lineWidth=12;x.strokeStyle='#c9a227';x.stroke();x.fillStyle=c2;x.font='900 140px Impact,sans-serif';x.textAlign='center';x.fillText((T.n||'P')[0],128,176);const m=new T3.Mesh(new T3.PlaneGeometry(4.4,4.4),new T3.MeshBasicMaterial({map:new T3.CanvasTexture(c),transparent:true}));m.rotation.x=Math.PI/2;m.position.set(-1,7.94,4.5);R3.add(m)}
[-6.7,-4.3].forEach(x=>{const tb=new T3.Mesh(new T3.CylinderGeometry(.95,.95,.95,14),new T3.MeshLambertMaterial({color:0xb9c3cc}));tb.position.set(x,.48,11.4);R3.add(tb);const wt=new T3.Mesh(new T3.CircleGeometry(.82,14),new T3.MeshBasicMaterial({color:x<-5?0x7fd6ff:0xff9a7a}));wt.rotation.x=-Math.PI/2;wt.position.set(x,.96,11.4);R3.add(wt);PR.push([x-1,x+1,10.4,12.4])});
[[-6.7,'COLD','#9fd3ff'],[-4.3,'HOT','#ffb199']].forEach(([x,t,c])=>{const s=lbl(t,c);s.position.set(x,2.1,11.4);s.scale.set(1.8,.45,1);R3.add(s)});
bx(3.2,.5,1.1,0x1a1414,3.3,.25,12.1,R3);bx(3.2,.22,1,0x241c1c,3.3,.6,12.05,R3);bx(3.2,1,.3,0x1a1414,3.3,.9,12.6,R3);[-1,1].forEach(s=>bx(.3,.75,1.1,0x1a1414,3.3+s*1.6,.55,12.1,R3));bx(3.22,.05,.32,c1,3.3,1.41,12.6,R3);PR.push([1.5,5.1,11.4,12.9]);
{const fr=new T3.Group();fr.position.set(-9.8,3.3,3.8);fr.rotation.y=Math.PI/2;R3.add(fr);bx(1.9,2.1,.06,gold,0,0,0,fr);bx(1.7,1.9,.07,0x111111,0,0,.01,fr);bx(1.2,1.35,.08,c1,0,-.05,.03,fr);bx(1.6,.32,.08,c1,0,.5,.03,fr);const n=new T3.Mesh(new T3.PlaneGeometry(.7,.7),new T3.MeshBasicMaterial({map:tex(String(S.num||1),80,lum(c1)>.5?'#000':'#fff'),transparent:true}));n.position.set(0,-.05,.08);fr.add(n)}}
