// ===== 🏟️ A REAL SIDELINE: ROOM FOR THE WHOLE TEAM, CHEERLEADERS BEHIND =====
// Tyler, 2026-11-16: "I saw Jaylen Hurts on my sideline and also my teammates are in the crowd. I asked you to make sidelines
// bigger so we can make this happen. Cheerleaders should be behind us as well, so just add a bunch of sideline space and add the
// full team. Not hard".
// The stands now start 11 yards further back (the field builder moves them), leaving a wide team area on each side. Each side has
// its whole team (40, in three rows, between the 25s), in its own jersey only: nobody from the other team stands on yours. The
// benches are behind the team and the cheerleaders behind the benches, in front of the stands. You walk the whole area.
window.SLROWS=[{x:30.2,n:14},{x:31.9,n:13},{x:33.6,n:13}];
window.slBuild=function(){try{if(!SDL.parent)scn.add(SDL);clr(SDL);SLV.av=null;const mk=(j,X,z,ry,num,sk)=>{const m=mk3(j,1.1,sk,{nm:'',num},null,1);m.position.set(X,0,z);m.rotation.y=ry;m.ph=Math.random()*6;try{mrgM(m)}catch(e){}SDL.add(m);return m};
 [[g.mj,-1],[g.oj,1]].forEach(([j,sd])=>{const used=new Set(sd<0?[S.num]:[]);const nb=()=>{let n;do n=1+Math.floor(Math.random()*98);while(used.has(n));used.add(n);return n};let i=0;
  SLROWS.forEach((R_,row)=>{for(let k=0;k<R_.n;k++){const z=-32-k*(36/R_.n)-row*.8+(Math.random()-.5)*.5,X=sd*(R_.x+(Math.random()-.5)*.35);mk(j,X,z,(sd<0?-Math.PI/2:Math.PI/2)+(Math.random()-.5)*.5,nb(),SK[(i*7+(sd>0?3:0))%6]);i++}})});
 try{const cj=[{c1:'#23232f',c2:'#555555',d:0,pc:'#3a3a3a'},{c1:(g.o&&g.o.c1)||'#333333',c2:'#333333',d:0,pc:'#3a3a3a'}],ca=[{sk:1,hr:1,hcl:'#bbbbbb',fh:2,ht:1,bd:1},{sk:4,hr:3,hcl:'#777777',fh:2,ht:1,bd:1}];
  [-1,1].forEach((sd,i)=>{const m=mk3(cj[i],1.2,0,null,ca[i],1);m.position.set(sd*28.6,0,-50);m.rotation.y=sd<0?-Math.PI/2:Math.PI/2;m.coach=sd;m.ph=i*2;SDL.add(m);if(sd<0)SLV.coach=m})}catch(e){}
 const me=mk3(g.mj,1.1,S.ap&&S.ap.sk,{nm:S.nm||S.name,num:S.num},S.ap,0,1);me.visible=false;SDL.add(me);SLV.av=me;SLV.x=-29;SLV.z=-50;
 // cheerleaders: behind each team's bench, facing the field, spread along the whole side
 try{CHR.children.forEach((c,i)=>{const home=c.position.x<0,sd=home?-1:1,k=Math.floor(i/2);c.position.x=sd*(39.4+(k%2)*.9);c.position.z=-8-((k*13.7+(home?0:6))%94);c.rotation.y=home?-Math.PI/2:Math.PI/2})}catch(e){}
}catch(e){console.warn(e)}};
