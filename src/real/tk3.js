const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();tkStart()});await wait(800);
console.log(await pg.evaluate(()=>{const L=tkList();tkGo(L[3].i);ovHide();for(let k=0;k<3;k++){const e=pevt();if(e.t=='pro')psim(e);else pWeek(null)}return S.name+' '+S.T[0].w+'-'+S.T[0].l+' wk '+S.wk+' | '+String(HM).slice(0,120)}));
await pg.evaluate(()=>{const e=pevt();startGame(e.o,e.t)});await wait(1500);
console.log(await pg.evaluate(()=>'game: '+(g&&g.ph)+' '+(g&&g.m&&g.m.n)));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
