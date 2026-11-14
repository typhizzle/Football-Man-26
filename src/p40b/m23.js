
// ---------------- championship nights: the state's big stadium + a broadcast-style hype intro ----------------
const CHST={Texas:['Lone Star Dome','Arlington'],Florida:['Citrus Bowl Stadium','Orlando'],California:['Rose Bowl Field','Pasadena'],Georgia:['Peach Dome','Atlanta'],Ohio:['Hall of Fame Stadium','Canton'],
 Alabama:['Bryant-Denny Bowl','Tuscaloosa'],Louisiana:['Bayou Superdome','New Orleans'],Pennsylvania:['Keystone Field','Pittsburgh'],Michigan:['Motor City Dome','Detroit'],'New York':['Empire Stadium','Syracuse']};
let CHG=null;
function chStadium(on){if(!CHG){CHG=new T3.Group();scn.add(CHG)}clr(CHG);if(!on)return;const cc=[0xff5a5a,0xffd83b,0x4fb4ff,0xffffff,0x5ad65a,0xb07bff,0xff9f43];
 // tall upper decks on both sidelines and behind both end zones, packed
 [-1,1].forEach(s=>{for(let k=0;k<5;k++){const x=s*(48+k*3.2),y=4+k*2.6;bx(3.2,1.2,150,0x2d3748,x,y,-50,CHG);for(let z=-122;z<22;z+=2.4)bx(1.3,1.5,1.3,cc[Math.random()*7|0],x,y+1.3,z,CHG)}
  bx(1,34,160,0x1e2638,s*65,17,-50,CHG);[-100,-50,0].forEach(z=>{bx(1,30,1,0x556677,s*63,15,z,CHG);bx(9,3.6,1.4,0xfffbe0,s*62,31,z,CHG)})});
 [[24,1],[-124,-1]].forEach(([z,s])=>{for(let k=0;k<4;k++){const zz=z+s*k*3,y=4+k*2.6;bx(80,1.2,3,0x2d3748,0,y,zz,CHG);for(let x=-38;x<=38;x+=2.4)bx(1.3,1.5,1.3,cc[Math.random()*7|0],x,y+1.3,zz,CHG)}});
 // giant banner over the far end zone
 const c=document.createElement('canvas');c.width=1024;c.height=160;const x=c.getContext('2d');x.fillStyle='#0b1a33';x.fillRect(0,0,1024,160);x.fillStyle='#ffd83b';x.font='900 72px Impact,Arial Black,sans-serif';x.textAlign='center';x.fillText('STATE CHAMPIONSHIP',512,78);
 const nm=(CHST[S.hst]||[(S.hst||'State')+' Championship Stadium',''])[0];x.fillStyle='#fff';x.font='700 40px Arial,sans-serif';x.fillText(nm.toUpperCase(),512,132);
 const m=new T3.Mesh(new T3.PlaneGeometry(52,8),new T3.MeshBasicMaterial({map:new T3.CanvasTexture(c)}));m.position.set(0,22,-128);CHG.add(m)}
// synthesized hype beat (no files): kick, snare, hats, bass stabs
let HYA=null;
function hypeBeat(dur){try{const A=HYA||(HYA=new (window.AudioContext||window.webkitAudioContext)());if(A.state=='suspended')A.resume();const t0=A.currentTime+.05,bpm=140,b=60/bpm,M=A.createGain();M.gain.value=.5;M.connect(A.destination);
 const hit=(t,f0,f1,d,v,type)=>{const o=A.createOscillator(),gn=A.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d);gn.gain.setValueAtTime(v,t);gn.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(gn);gn.connect(M);o.start(t);o.stop(t+d+.02)};
 const nz=(t,d,v,hp)=>{const n=A.createBufferSource(),bf=A.createBuffer(1,A.sampleRate*d,A.sampleRate),dd=bf.getChannelData(0);for(let i=0;i<dd.length;i++)dd[i]=Math.random()*2-1;n.buffer=bf;const f=A.createBiquadFilter();f.type='highpass';f.frequency.value=hp;const gn=A.createGain();gn.gain.setValueAtTime(v,t);gn.gain.exponentialRampToValueAtTime(.001,t+d);n.connect(f);f.connect(gn);gn.connect(M);n.start(t)};
 const bass=[55,55,65.4,49];for(let i=0;i<Math.floor(dur/b);i++){const t=t0+i*b;hit(t,150,40,.28,.9);if(i%2==1)nz(t,.18,.5,1200);nz(t+b/2,.05,.18,6000);nz(t,.04,.12,6000);if(i%4==0)hit(t,bass[(i/4|0)%4],bass[(i/4|0)%4]*.98,b*3.5,.35,'sawtooth')}
 M.gain.setValueAtTime(.5,t0+dur-1);M.gain.linearRampToValueAtTime(0,t0+dur)}catch(e){}}
function hype(done){const st=S.stage||'hs',me=S.T[0],o=g.o,isHS=st=='hs',sd=CHST[S.hst]||[(S.hst||'State')+' Championship Stadium',''],ss=S.ss||{},rec=(t)=>(t.w||0)+'-'+(t.l||0);
 const ven=isHS?sd[0]+(sd[1]?' · '+sd[1]:''):st=='col'?'Neutral site · sold out':'Ultra Bowl Stadium',big=/Ultra Bowl/.test(g.title)?'ULTRA BOWL':/National/.test(g.title)?'NATIONAL CHAMPIONSHIP':/Conference/.test(g.title)?'CONFERENCE CHAMPIONSHIP':'STATE CHAMPIONSHIP';
 const lines=[`${(ss.yds||0).toLocaleString()} pass yds · ${ss.td||0} TD this season`,ss.ry?`${ss.ry} rush yds · ${ss.rtd||0} rush TD`:'',`${me.n} ${rec(me)} · ${o.n} ${rec(o)}`].filter(Boolean);
 const d=document.createElement('div');d.id='hyp';d.innerHTML=`<style>#hyp{position:fixed;inset:0;z-index:60;background:radial-gradient(circle at 50% 40%,#1b2c55,#05070f 70%);color:#fff;font-family:Impact,'Arial Black',sans-serif;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center}
#hyp .s{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;opacity:0;animation:hy 2.2s ease forwards}
@keyframes hy{0%{opacity:0;transform:scale(1.25)}12%{opacity:1;transform:scale(1)}85%{opacity:1}100%{opacity:0;transform:scale(.96)}}#hyp .k{font-size:15px;letter-spacing:6px;color:#ffd83b;font-family:Arial,sans-serif;font-weight:800}
#hyp .b{font-size:clamp(34px,11vw,72px);line-height:1;text-shadow:4px 4px 0 #c0392b}#hyp .m{font-family:Arial,sans-serif;font-size:18px;margin-top:10px;line-height:1.5}#hyp .vs{display:flex;gap:14px;align-items:center;font-size:clamp(22px,7vw,40px)}#hyp .tm{padding:10px 14px;border:3px solid #000;border-radius:8px}
#hyp .bars{position:absolute;inset:0;background:repeating-linear-gradient(115deg,transparent 0 40px,rgba(255,255,255,.04) 40px 44px);animation:bm 1s linear infinite}@keyframes bm{to{background-position:88px 0}}
#hyp button{position:absolute;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));width:auto;z-index:2}</style><div class=bars></div>
<div class=s><div class=k>TONIGHT</div><div class=b>${big}</div></div>
<div class=s style="animation-delay:2.2s"><div class=k>LIVE FROM</div><div class=b style="font-size:clamp(28px,9vw,58px)">${ven.toUpperCase()}</div><div class=m>${isHS?'Sold out · the biggest crowd of your life':'Sold out · national TV'}</div></div>
<div class=s style="animation-delay:4.4s"><div class=vs><div class=tm style="background:${me.c1}">${me.n.toUpperCase()}</div><div>VS</div><div class=tm style="background:${o.c1}">${o.n.toUpperCase()}</div></div><div class=m>${rec(me)} · ${rec(o)}</div></div>
<div class=s style="animation-delay:6.6s"><div class=k>THE SEASON SO FAR</div><div class=m style="font-size:20px">${lines.join('<br>')}</div></div>
<div class=s style="animation-delay:8.8s;animation-duration:2.6s"><div class=k>ALL EYES ON</div><div class=b>#${S.num||''} ${(S.name||'').toUpperCase()}</div><div class=m>Let's go.</div></div><button class=g type=button>Skip ▶</button>`;
 document.body.appendChild(d);g.paused=1;hypeBeat(11.4);let fin=0;const end=()=>{if(fin)return;fin=1;d.remove();try{if(HYA)HYA.suspend()}catch(e){}g.paused=0;done&&done()};d.querySelector('button').onclick=end;setTimeout(end,11400)}
