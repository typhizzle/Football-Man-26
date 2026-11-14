// Invites are not spam (Tyler 2026-11-14). Simulates many seasons of weekly invites on the real save.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 S.spc=[];S.pop=100;
 let maxStudio=0,maxPot=0,maxParty=0,dupSong=0,pbInterview=0,seasons=0;
 for(let season=0;season<12;season++){S.hist.push({y:'Ptest'});const Y=yrN();seasons++;let st=0,po=0,pa=0;
  for(let w=0;w<18;w++){S.spwk=null;S.spe=null;try{spWeek()}catch(e){}
   ((S.spe&&S.spe.L)||[]).forEach(e=>{if(e.k==='studio'){st++;if((S.songs||[]).some(x=>x.k===e.song))dupSong++;
      (S.songs=S.songs||[]).push({n:e.song,k:e.song,st:1,y:Y,with:'x'})}
     if(e.k==='pot'){po++;if(/Pro Bowl/.test(e.n))pbInterview++}if(e.k==='party')pa++})}
  maxStudio=Math.max(maxStudio,st);maxPot=Math.max(maxPot,po);maxParty=Math.max(maxParty,pa)}
 Object.assign(out,{seasons,maxStudio,maxPot,maxParty,dupSong,pbInterview,pbSeason:evcPB(),songsRecorded:(S.songs||[]).length});
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);console.log(JSON.stringify(r,null,1));await b.close()})();
