const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';S=mig(S);taSync(1);
 out.py=S.py; out.lawKeys=Object.keys(S.law||{});
 // build an OPEN ballot for the current season, as lgAwards would
 S.law[S.py]={yr:(yrN()||2035),w:{MVP:{n:'Somebody Else',tm:'KC',pos:'QB'}},c:{MVP:[],OPOY:[],DPOY:[]}};
 lawSealCheck(S);                       // first sight: must NOT seal the open season
 out.openSealed=Object.keys(S.lawSeal||{}).indexOf(String(S.py))>=0;
 // Tyler overrides the winner — this must stick, every time
 S.law[S.py].w.MVP.n='Tylers Own Pick';
 lawSealCheck(S); lawSealCheck(S); save&&0;
 out.overrideKept=S.law[S.py].w.MVP.n;
 // now the season ends: py advances, and last year's ballot becomes history
 const was=S.py; S.py=was+1;
 lawSealCheck(S);
 out.nowSealed=Object.keys(S.lawSeal||{}).indexOf(String(was))>=0;
 out.sealedWinner=(S.lawSeal[String(was)]||{}).MVP;
 // and from here it is immutable
 S.law[was].w.MVP.n='Imposter Again';
 const res=lawSealCheck(S);
 out.afterSealAttempt=S.law[was].w.MVP.n;
 out.restoredCount=res.restored;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
