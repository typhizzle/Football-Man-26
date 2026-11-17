// PRO BOWL: every player (both teams, every quarter, every substitution window) is drawn with his own number and his own skin/hair (Tyler 2026-11-17)
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{S=await readCode(j);SLOT=1;LASTJ='';hub();const o={bad:[]};try{pbRep44();pbgStart();ovHide();
 const seen=[];const _m=mk3;mk3=function(j2,s,sk,lb,ap,nh,ar){seen.push({nm:lb&&lb.nm,num:lb&&lb.num,ap});return _m.apply(this,arguments)};
 let n=0,noNum=0,wrongNum=0,wrongLook=0;const dup=[];
 for(const q of [1,2,3,4])for(const sw of [0,1])for(const w of [0,1,2]){
  PBGM.plays=w*5;g.clk=(q-1)*900+30+w;g.ph='pre';g.sw=sw;setup(sw);const P=g.pl;seen.length=0;
  const all=[...P.ol,...P.dl,...P.lb,...P.db,...P.wr];all.forEach(x=>{delete x.m;sy(x,sw?g.oj:g.mj,0,0)});delete P.qb.m;sy(P.qb,sw?g.oj:g.mj,0,1);
  const F=[...all,P.qb];
  F.forEach((x,i)=>{n++;if(!x.fn){return}
   const num=x.num;if(num==null||num==='')noNum++;const ro=(()=>{for(const k of Object.keys(S.ro)){const y=(S.ro[k]||[]).find(z=>z&&z.n===x.fn);if(y)return y}return null})();if(ro&&x.fn!==S.name&&ro.num!=null&&num!==ro.num){wrongNum++;if(o.bad.length<6)o.bad.push(['num',x.fn,num,ro.num])}
   // the number comes from his own roster entry (a copy made for this game), not from mine
   if(x.fn!==S.name&&num===S.num&&!seen.some(s=>s.num===num))wrongNum++;
   const L=slLook({n:x.fn,pos:x.pos});const d=seen[i];
   if(!(x.fn===S.name&&!sw)&&d&&d.ap&&(d.ap.hcl!==L.hcl||d.ap.hr!==L.hr||d.ap.sk!==L.sk)){wrongLook++;if(o.bad.length<6)o.bad.push([q,sw,x.fn,d.ap.hcl,L.hcl,d.ap.sk,L.sk])}})
  const meDrawn=seen.filter(s=>s.nm===String(S.name).split(' ').pop().toUpperCase()).length;if(meDrawn&&!(sw===0&&q>=3))dup.push([q,sw,w,'me drawn when not playing']);}
 o.n=n;o.noNum=noNum;o.wrongNum=wrongNum;o.wrongLook=wrongLook;o.dup=dup.slice(0,5);
 o.ok=noNum===0&&wrongNum===0&&wrongLook===0&&dup.length===0;
 }catch(e){o.err=e.message+' '+e.stack.slice(0,200)}return o},j);console.log(JSON.stringify(r));await b.close()})();
