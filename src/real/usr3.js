const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c9f41c92-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{SLOT=1;S=await readCode(c);CRC=null;const H_=S.crh&&S.crh.w||{};const ks=Object.keys(H_);const C=crCalc();const T=S.T;
 return 'grK match '+(S.crh&&S.crh.k==grK())+' snaps '+ks.join(',')+' wk '+S.wk+'\nprev pos of me: '+ks.map(k=>k+':'+((H_[k].indexOf(0)+1)||'NR')).join(' ')+'\nnow '+C.pos[0]+' rec '+crRec(0)+' '+crWhy(0)+'\nTop 10: '+C.ord.slice(0,10).map(i=>T[i].n.split(' ')[0]+' '+crRec(i)).join(', ')},code));
await b.close()})();
