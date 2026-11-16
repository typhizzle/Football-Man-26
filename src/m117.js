// ============ 🧾 nobody disappears, and every move is on the record ============
// Tyler's rule: anyone the game creates exists in that save forever. They can retire,
// they can be cut, they can sign somewhere else — they are never erased, and what
// happened to them is written down.
//
// An audit across a season found 11 players who were simply gone: on no roster, not in
// free agency, not in the retired list. Nothing had recorded their leaving either.
// This keeps a permanent register of everyone ever created, notices when someone falls
// out of the world, puts them back, and logs every move as a transaction.

window.TXMAX=600;

// ---- where is everyone right now? ----
window.plWhere=function(s){
 const m={};try{
  (s.T||[]).forEach((t,i)=>{
   let L=null;try{const o=S;S=s;L=rost('h.'+i);S=o}catch(e){}
   (L||[]).forEach(x=>{if(x&&x.n)m[x.n]={at:'t'+i,ti:i,pos:x.pos,ref:x}});
  });
  (((s.ro||{}).fa)||[]).forEach(x=>{if(x&&x.n&&!m[x.n])m[x.n]={at:'fa',pos:x.pos,ref:x}});
  (s.retd||[]).forEach(x=>{if(x&&x.n&&!m[x.n])m[x.n]={at:'retired',pos:x.pos,ref:x}});
  (s.svRet||[]).forEach(x=>{if(x&&x.n&&!m[x.n])m[x.n]={at:'retired',pos:x.pos,ref:x}});
 }catch(e){}
 return m;
};

window.txAdd=function(s,name,from,to,type){try{
 s.txn=s.txn||[];
 s.txn.push({n:name,f:from,t:to,k:type,
             y:(s.stage=='col'?(s.cyr||s.yr):s.yr)||0,w:s.wk||0,ts:Date.now()});
 if(s.txn.length>TXMAX)s.txn.splice(0,s.txn.length-TXMAX);
 return 1}catch(e){return 0}};

// ---- the register: everyone who has ever existed in this save ----
window.plSync=function(s){try{
 if(!s)return 0;
 s.allp=s.allp||{};
 const now=plWhere(s);
 let added=0,moved=0,rescued=0;

 // anyone new gets written into the register
 Object.keys(now).forEach(n=>{
  const r=s.allp[n];
  if(!r){s.allp[n]={p:now[n].pos||'',at:now[n].at,
    y:(s.stage=='col'?(s.cyr||s.yr):s.yr)||0};added++;return}
  if(r.at!==now[n].at){
   txAdd(s,n,r.at,now[n].at,now[n].at=='retired'?'retired':(r.at=='fa'?'signed':'moved'));
   r.at=now[n].at;moved++;
  }
 });

 // and anyone who fell out of the world entirely comes back
 Object.keys(s.allp).forEach(n=>{
  if(now[n])return;
  const r=s.allp[n];
  if(r.at==='lost')return;
  // a college player who is no longer on a roster has moved on, not retired —
  // calling that "his career is over" would be its own small lie in the record
  const col=(s.stage=='col');
  s.retd=s.retd||[];
  if(!s.retd.some(x=>x&&x.n===n)){
   s.retd.push({n,pos:r.p||'',ovr:r.ovr||60,age:r.age||(col?22:34),h:r.h||[],restored:1,moved:col?1:0});
  }
  txAdd(s,n,r.at,'retired',col?'moved on':'left the league');
  r.at='retired';rescued++;
 });

 return {added,moved,rescued};
}catch(e){return 0}};

// run it on every load and every save, so a gap can never last a session
(()=>{try{if(typeof mig!='function')return;const _m=mig;
 mig=function(s){s=_m.apply(this,arguments);try{plSync(s)}catch(e){}return s}}catch(e){}})();
(()=>{try{const _sv=save;save=function(){
 try{if(typeof S!='undefined'&&S&&!(typeof RSEDIT!='undefined'&&RSEDIT))plSync(S)}catch(e){}
 return _sv.apply(this,arguments)}}catch(e){}})();

// ---- 📰 the transactions wire ----
window.txRecent=function(n){try{
 const L=(S.txn||[]).slice(-(n||30)).reverse();
 return L}catch(e){return []}};
window.txLine=function(t){try{
 const where=k=>{if(k=='fa')return 'free agency';if(k=='retired')return 'retirement';
  if(/^t(\d+)$/.test(k)){const i=+k.slice(1);try{return S.T[i].n}catch(e){return 'another club'}}
  return k||'somewhere'};
 if(t.k=='moved on')return `${t.n} has moved on from ${where(t.f)}.`;
 if(t.k=='retired'||t.k=='left the league')return `${t.n} has left ${where(t.f)} — his career is over.`;
 if(t.k=='signed')return `${t.n} signs with ${where(t.t)} out of free agency.`;
 return `${t.n} moves from ${where(t.f)} to ${where(t.t)}.`;
}catch(e){return ''}};
window.txV=function(){
 const L=txRecent(40);
 ui.style.display='block';
 ui.innerHTML=`<div><h2>🧾 Transactions</h2>
  <div class=card><small>Every move in the league, as it happened. Nobody leaves without it being written down.</small></div>
  ${L.length?L.map(t=>`<div class=card style="padding:8px"><div class=row><span>${esc(txLine(t))}</span><small>${t.y||''}${t.w?' · wk '+t.w:''}</small></div></div>`).join('')
            :'<div class=card>Nothing has moved yet this season.</div>'}
  <button class=g onclick=hub()>Back</button></div>`;
 ui.scrollTop=0;
};
