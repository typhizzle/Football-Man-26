const NF0=NF.slice(0,20),NL0=NL.slice(0,20);
// ---------------- name variety: players the game generated (never your current teammates, never names you edited or created) get names from the bigger pools ----------------
// rebuild what genRo produced for a roster key with the old 20x20 pool and with the expanded pool; only exact matches count as "generated"
function nmGen(seed,a,old){const rs=rng((seed||1)+a.split('').reduce((x,c)=>x+c.charCodeAt(0)*31,7)),c=a[0]=='c',out=[];for(let i=0;i<POSL.length;i++){const f=old?NF0[rs()*20|0]:NF[rs()*NF.length|0],l=old?NL0[rs()*20|0]:NL[rs()*NL.length|0];rs();rs();if(c)rs();out.push(f+' '+l)}return out}
function nmMig(s){if(!s||s.nmv||!s.ro||!s.T)return;s.nmv=1;try{const st=s.stage||'hs',all=new Set(),rb=JSON.stringify(s.rb||{})+JSON.stringify(s.law||{}),rr=rng((s.seed||1)*7+4242),keepN=new Set([s.vet,s.bu&&s.bu.n,s.pal&&s.pal.n,s.name].filter(Boolean));
for(const k in s.ro){const L=s.ro[k];if(Array.isArray(L))L.forEach(x=>{if(x&&x.n)all.add(x.n)})}
for(const k in s.ro){if(k=='h.0')continue;const L=s.ro[k];if(!Array.isArray(L))continue;const keys=[k];
 if(k.startsWith('h.')){const t=s.T[+k.slice(2)];if(t&&st=='col'&&t.cf!=null&&s.col&&s.col[t.cf]){const ti=s.col[t.cf].t.findIndex(x=>x.n==t.n);if(ti>=0)keys.push('c.'+t.cf+'.'+ti)}if(t&&st=='pro'&&s.pro){const pi=s.pro.findIndex(x=>x.n==t.n&&(x.city||'')==(t.city||''));if(pi>=0)keys.push('p.'+pi)}}
 const ref=[];keys.forEach(kk=>{ref.push(nmGen(s.seed,kk,1),nmGen(s.seed,kk,0))});const lastU=new Set(L.map(x=>x&&x.n?x.n.slice(x.n.indexOf(' ')+1):''));
 L.forEach((x,i)=>{if(!x||!x.n||x.ed||x.pal||x.npx!=null||keepN.has(x.n)||(typeof NRES!='undefined'&&NRES.has(x.n)))return;if(!ref.some(R_=>R_[i]===x.n))return;if(x.aw&&Object.values(x.aw).some(v=>v>0))return;if(rb.includes(abbr(x.n))||rb.includes(x.n))return;
  let nm=null;for(let g=0;g<40;g++){const f=NF[rr()*NF.length|0],l=NL[rr()*NL.length|0],c=f+' '+l;if(all.has(c)||lastU.has(l)||NRES.has(c))continue;nm=c;break}if(!nm)return;all.delete(x.n);all.add(nm);lastU.add(nm.slice(nm.indexOf(' ')+1));x.n=nm})}}catch(e){}}
