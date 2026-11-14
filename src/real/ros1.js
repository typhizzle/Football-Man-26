// Every position that has stats must show a line; the O-line must stay blank; the label
// must read "Rosters"; and the lines must not change between two renders.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';hub();
  const out={};
  out.menuSaysRosters=/>Rosters</.test(ui.innerHTML);
  out.menuStillSaysStats=/Rosters & stats/.test(ui.innerHTML);
  rosv();out.listHeader=/<h2>Rosters<\/h2>/.test(ui.innerHTML);
  rosT(1);const a=ui.innerHTML;
  rosT(1);const b2=ui.innerHTML;
  out.stableBetweenRenders=(a===b2);
  const L=rost('h.1'),st=rosStat(1,PS(1),L);
  const POS=['QB','RB','WR','WR','WR','TE','LT','LG','C','RG','RT','DE','DT','DT','DE','OLB','MLB','OLB','CB','CB','S','S','K'];
  const have=[],miss=[];
  POS.forEach((p,k)=>{(st[k]?have:miss).push(k+':'+p)});
  out.withStats=have;out.withoutStats=miss;
  out.oLineBlank=miss.every(x=>/LT|LG|C|RG|RT/.test(x));
  out.everyOtherHasOne=have.length===POS.length-5;
  out.samples={QB:st[0],RB:st[1],WR1:st[2],WR3:st[4],TE:st[5],DE:st[11],MLB:st[16],CB:st[18],S:st[20],K:st[22]};
  // the roster screen actually prints them
  out.printedOnScreen=(ui.innerHTML.match(/ tkl/g)||[]).length+' tkl, '+(ui.innerHTML.match(/ sk</g)||[]).length+' sk, '+(ui.innerHTML.match(/ FG/g)||[]).length+' FG';
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(20),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
