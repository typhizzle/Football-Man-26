// Tyler 2026-11-14: "Make sure when you're simming drives that they take just as long as if you would watch them. Make sure
// the clock moves the same on each play." A watched drive must run each play's own simulated clock, not equal slices.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({file:process.env.CLK_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{S=mig(JSON.parse(j));save=()=>{};startGame0(1,'reg');
 let ok=0,tried=0,unequal=0,totalSame=0;
 for(let t=0;t<40;t++){g.clk=300;const rem=1800-g.clk;g.r=simDrive(g.o.ovr,g.m.ovr,25,rem,0,false);const L=g.r.pl;if(L.length<3)continue;tried++;
  g.watch=1;g.ph='watch';W_={i:0,t:0,pl:L};W_.c0=g.clk;W_.dc=Math.max(0,rem-g.r.sec);
  const clk=[];for(let i=0;i<=L.length;i++)clk.push(typeof wClk=='function'?wClk(i):W_.c0+W_.dc*(i/L.length));
  // each play's on-screen time = the time that play used in the simulation
  let good=true,prev=rem;L.forEach((e,i)=>{const used=prev-Math.max(g.r.sec,e.s==null?NaN:e.s);if(!(Math.abs((clk[i+1]-clk[i])-used)<1e-6))good=false;prev=Math.max(g.r.sec,e.s)});if(good)ok++;
  const sl=L.map((e,i)=>clk[i+1]-clk[i]);if(Math.max(...sl)-Math.min(...sl)>3)unequal++;
  if(Math.abs(clk[L.length]-(W_.c0+W_.dc))<1e-6)totalSame++}
 o.tried=tried;o.A_perPlay=tried>=10&&ok===tried;o.B_notEqualSlices=unequal>=tried*.5;o.C_totalSameAsSim=totalSame===tried;o.ok=ok;o.unequal=unequal;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
console.log(JSON.stringify(out,null,1));await b.close()})();
