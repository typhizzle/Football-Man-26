// ---------------- performance: merge static boxes into one vertex-coloured mesh per parent (far fewer draw calls) ----------------
const VCM={};
function vcMat(map){const k=map?'g':'l';return VCM[k]||(VCM[k]=new T3.MeshLambertMaterial(map?{vertexColors:true,map}:{vertexColors:true,flatShading:true}))}
// free the GPU buffers of merged geometry when a scene is cleared (shared box geometry stays cached)
function dsp(o){if(!o)return;const gm=o.geometry;if(gm&&gm.userData&&gm.userData.mg&&gm.dispose)gm.dispose();if(o.children)for(const c of o.children)dsp(c)}
function mrg(P,skip){if(!P||!P.children||!T3.BufferGeometry||!T3.BufferAttribute||!T3.Matrix3||typeof GTEX=='undefined')return P;const by={};
for(const c of P.children){if(!c.isMesh||(c.children&&c.children.length)||c.visible===false||(skip&&skip.includes(c)))continue;const m=c.material,gm=c.geometry;
 if(!m||Array.isArray(m)||!(m.isMeshLambertMaterial||(m.isMeshBasicMaterial&&!m.map))||m.transparent||m.vertexColors||(m.map&&m.map!==GTEX)||(m.side!=null&&m.side!==T3.FrontSide))continue;
 if(m.emissive&&(m.emissive.r||m.emissive.g||m.emissive.b))continue;if(!gm||!gm.isBufferGeometry||!gm.index||!gm.attributes||!gm.attributes.position||!gm.attributes.normal)continue;
 const k=(m.isMeshBasicMaterial?'b':m.map?'g':'l')+(c.receiveShadow?1:0);(by[k]=by[k]||[]).push(c)}
for(const k in by){const L=by[k];if(L.length<2)continue;let nv=0,ni=0;for(const c of L){nv+=c.geometry.attributes.position.count;ni+=c.geometry.index.count}
 const uvOn=k[0]=='g',pos=new Float32Array(nv*3),nor=new Float32Array(nv*3),col=new Float32Array(nv*3),uv=uvOn?new Float32Array(nv*2):null,idx=nv>65535?new Uint32Array(ni):new Uint16Array(ni),v=new T3.Vector3(),nm=new T3.Matrix3();let vo=0,io=0;
 for(const c of L){c.updateMatrix();const Mx=c.matrix,gm=c.geometry,pa=gm.attributes.position,na=gm.attributes.normal,ua=gm.attributes.uv,ix=gm.index,C=c.material.color;nm.getNormalMatrix(Mx);
  for(let i=0;i<pa.count;i++){const o=(vo+i)*3;v.fromBufferAttribute(pa,i).applyMatrix4(Mx);pos[o]=v.x;pos[o+1]=v.y;pos[o+2]=v.z;v.fromBufferAttribute(na,i).applyMatrix3(nm).normalize();nor[o]=v.x;nor[o+1]=v.y;nor[o+2]=v.z;col[o]=C.r;col[o+1]=C.g;col[o+2]=C.b;if(uv&&ua){uv[(vo+i)*2]=ua.getX(i);uv[(vo+i)*2+1]=ua.getY(i)}}
  for(let i=0;i<ix.count;i++)idx[io+i]=ix.getX(i)+vo;vo+=pa.count;io+=ix.count}
 const G=new T3.BufferGeometry();G.setAttribute('position',new T3.BufferAttribute(pos,3));G.setAttribute('normal',new T3.BufferAttribute(nor,3));G.setAttribute('color',new T3.BufferAttribute(col,3));if(uv)G.setAttribute('uv',new T3.BufferAttribute(uv,2));G.setIndex(new T3.BufferAttribute(idx,1));G.computeBoundingSphere();G.userData.mg=1;
 const me=new T3.Mesh(G,k[0]=='b'?(VCM.b||(VCM.b=new T3.MeshBasicMaterial({vertexColors:true}))):vcMat(uvOn?GTEX:null));me.castShadow=L.some(c=>c.castShadow);me.receiveShadow=k[1]=='1';for(const c of L)P.remove(c);P.add(me);if(P.matrixAutoUpdate===false||L[0].matrixAutoUpdate===false){me.updateMatrix();me.matrixAutoUpdate=false}}
return P}
// a person: body, arms and legs each become one mesh (limbs still animate)
function mrgM(G){if(!G)return G;mrg(G);(G.A||[]).forEach(a=>{mrg(a);if(a.F)mrg(a.F)});(G.L||[]).forEach(l=>{mrg(l);if(l.S)mrg(l.S)});return G}
// confetti: one instanced mesh instead of hundreds of separate pieces
function confBuild(n,cols){const geo=new T3.PlaneGeometry(.3,.18),C=new T3.InstancedMesh(geo,new T3.MeshBasicMaterial({side:T3.DoubleSide}),n),c=new T3.Color();C.ps=[];C.dm=new T3.Object3D();
for(let i=0;i<n;i++){C.ps.push({x:(Math.random()-.5)*50,y:Math.random()*18,z:-50+(Math.random()-.5)*44,vy:1+Math.random()*1.6,ph:Math.random()*6,a:Math.random()*6,b:Math.random()*6});c.set(cols[i%cols.length]);if(C.setColorAt)C.setColorAt(i,c)}
C.frustumCulled=false;PL.add(C);confUpd(C,0);return C}
function confUpd(C,dt){if(!C||!C.ps)return;const t=performance.now()/1000,p=(LR&&LR.p)||{x:0,z:-50},d=C.dm;C.ps.forEach((q,i)=>{q.y-=q.vy*dt;q.x+=Math.sin(t*2+q.ph)*dt*.8;q.a+=dt*3;q.b+=dt*2;if(q.y<.05){q.x=p.x+(Math.random()-.5)*50;q.y=14+Math.random()*6;q.z=p.z+(Math.random()-.5)*44}d.position.set(q.x,q.y,q.z);d.rotation.set(q.a,q.b,0);d.updateMatrix();C.setMatrixAt(i,d.matrix)});if(C.instanceMatrix)C.instanceMatrix.needsUpdate=true}
function confTick(dt){const C=LR&&LR.conf;if(C)confUpd(C,dt)}
// shadows: during a game the shadow map refreshes every other frame (players move a fraction of a yard per frame), elsewhere every frame
let SHF=0;function shU(){const sm=rd.shadowMap;if(!sm.enabled)return;SHF++;sm.autoUpdate=false;sm.needsUpdate=!(g&&g.st&&cv.style.display=='block')||SHF%2==0}
