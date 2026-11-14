s=open('g1.js').read()
a="function gpT(key,arr,e){const G=gpS(),u=G.used[key]||[];let c=arr.map((_,i)=>i).filter(i=>!u.includes(i));if(!c.length)c=arr.map((_,i)=>i);"
b="function gpT(key,arr,e){const G=gpS(),u=G.used[key]||[],ok=i=>!e||((e.int||0)>0||!/\\{(picks|ints|int)\\}/.test(arr[i]))&&((e.td||0)>=2||!/\\{tds\\}|\\{td\\} touchdowns/.test(arr[i]));let all=arr.map((_,i)=>i).filter(ok);if(!all.length)all=arr.map((_,i)=>i);let c=all.filter(i=>!u.includes(i));if(!c.length)c=all;"
assert s.count(a)==1;s=s.replace(a,b);open('g1.js','w').write(s)
s=open('g3.js').read()
a="function gpAir(out){const rt=out.filter(p=>p.r),wr=out.filter(p=>!p.r);"
b="function gpAir(out){const G_=gpS();if(out.length&&G_.cy)G_.cy.segs=G_.cy.segs.filter(sg=>!(sg.sh=='mm'&&/money/i.test(sg.tt||'')));const rt=out.filter(p=>p.r),wr=out.filter(p=>!p.r);"
assert s.count(a)==1;s=s.replace(a,b);open('g3.js','w').write(s)
print('ok')
