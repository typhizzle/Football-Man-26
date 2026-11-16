
// ===================== SKETCHY SPONSORS: big money, but read the fine print (they cost you fans) =====================
const BADS=[['CoinMoonz Crypto','"Guaranteed 1000% returns!" (Not financial advice.)',3,6],['Gas Station Sushi Co.','"Fresh since last Tuesday."',2,4],['Knockoff Kicks','"Totally real sneakers. Probably."',2,3],
 ['PyraShake Protein','"Recruit 5 friends to unlock your payment!"',2.5,5],['QuickCash Payday Loans','"Only 400% APR!"',3,7],['Hot Takes Energy Drink','"May cause heart palpitations and yelling."',2,3],['SnakeOil Wellness','"Cures everything. Not FDA approved."',2.5,5]];
function badDeals(){if(!S.deals||(S.stage||'hs')=='hs')return;if(S.bdk==S.dk)return;S.bdk=S.dk;const r=rng((S.seed||1)*83+hsh(String(S.dk))),base=Math.max(S.stage=='pro'?100000:1500,S.deals.reduce((a,d)=>a+(d.a||0),0)/Math.max(1,S.deals.length));
 const pk=[...BADS].sort(()=>r()-.5).slice(0,2);pk.forEach(b=>S.deals.push({b:b[0],fp:b[1],k:'pop',v:0,v2:1,a:Math.round(base*b[2]*(.7+r()*.4)/100)*100,t:0,bad:b[3]}))}

// her looks (cheerleaders and girlfriends): the bigger the gap above yours, the harder she is to land
const gfLk=p=>p?(p.lk!=null?p.lk:(p.lk=gfLkRoll(p))):0;
