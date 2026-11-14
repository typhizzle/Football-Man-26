// Pro calendar clock + Pro Bowl week + pregnancy (Tyler 2026-11-14 spec, section 11 verification list).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PG_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 if(typeof calT!='function'){o.err='no calendar clock';return o}
 const msgs=[];const _t=talk;talk=function(){msgs.push(String(arguments[2]||''));try{return _t.apply(this,arguments)}catch(e){}};
 // 1-5: the calendar
 o.inSeason=calIns();o.offPerAdvance=calOffW();o.A_calendar=calIns()===23&&Math.abs(calOffW()-3.625)<1e-9&&Math.abs(calIns()+8*calOffW()-52)<1e-9;
 const steps=[],kinds=[];const adv=()=>{const e=pevt();kinds.push(e.t);if(e.t=='pro'||e.t=='pp'||e.t=='pbw')psim(e);else if(e.t=='bye')pWeek(null);else if(e.t=='ppbye')ppAdv(0);else if(e.t=='fa')S.fa=null;else if(e.t=='sum'){if(!S.psum)mkPsum();if(!S.ofs)offStart();else offNext()}else return false;hub();return true};
 // play the rest of this season, the offseason, and into next season; record the clock at every advance
 const t0=calT();let g=0,prev=t0;const inc=[];while(g++<80){const py=S.py;if(!adv())break;const t=calT();inc.push(+(t-prev).toFixed(3));prev=t;if(S.py>py&&!S.ofs&&!S.pb&&S.wk===0)break}
 o.increments=inc.join(',');{const sv={pb:S.pb,psum:S.psum,ofs:S.ofs};S.ofs=null;S.psum=null;S.pb={r:3,pairs:[[0,1]],alive:{RFC:[0],LFC:[1]},sd:{RFC:[0],LFC:[1]},hist:[]};const e=pevt(),p1=calPos();const _sv=save;save=function(){};pplay();save=_sv;const p2=calPos(),e2=pevt();o.B_pbw=e.t==='pbw'&&p1===21&&p2===22&&e2.t==='pp';S.pb=sv.pb;S.psum=sv.psum;S.ofs=sv.ofs}o.kinds=[...new Set(kinds)].join(',');
 o.B_noDoubleCount=inc.every(x=>x>=0&&x<=23);o.B_offseasonSteps=inc.filter(x=>Math.abs(x-3.625)<1e-6).length;
 // a full year from week 1 is exactly 52: from the start of next season, play a whole year and measure
 const y0=calT();g=0;const startPy=S.py;while(g++<90){if(!adv())break;if(S.py===startPy+1&&!S.ofs&&!S.pb&&S.wk===0)break}o.yearLength=+(calT()-y0).toFixed(3);o.C_yearIs52=Math.abs(o.yearLength-52)<1e-6||(o.yearLength>52-23&&false);
 // 6-10: pregnancy on the clock. Conception during the regular season, crossing playoffs, offseason, into next season
 const P=pgS();P.cur=null;msgs.length=0;const c0=calT();P.cur={t0:c0,g:'b',who:(S.gf&&S.gf.n)||'Taylor',disc:0,tr:1};
 adv();o.D_hiddenAfter1wk=!P.cur.disc&&!msgs.some(m=>/pregnant/i.test(m));
 adv();o.D_toldAt2wks=P.cur.disc===1&&msgs.some(m=>/pregnant/i.test(m))&&Math.abs(P.cur.dt-c0-2)<1e-6;
 const kids0=(S.kids||[]).length;g=0;while(g++<120&&P.cur){if(!adv())break}
 const born=(S.kids||[]).slice(-1)[0];o.E_born=(S.kids||[]).length===kids0+1;o.weeksToBirth=born?+(born.bt-born.ct).toFixed(3):null;o.E_at39=born&&born.bt-born.ct>=39&&born.bt-born.ct<39+3.625+1e-9;
 // conception in the offseason
 g=0;while(g++<60&&!S.ofs){if(!adv())break}const c1=calT();P.cur={t0:c1,g:'g',who:'Taylor',disc:0,tr:0};msgs.length=0;
 adv();o.F_offseasonDiscovery=P.cur.disc===1&&msgs.some(m=>/weren.t trying/i.test(m));   // 3.625 weeks crosses the 2-week mark in one step
 const k1=(S.kids||[]).length;g=0;while(g++<120&&P.cur){if(!adv())break}const b2=(S.kids||[]).slice(-1)[0];o.F_bornFromOffseason=(S.kids||[]).length===k1+1&&b2.bt-b2.ct>=39;o.weeksToBirth2=+(b2.bt-b2.ct).toFixed(3);
 // the odds: every encounter rolls on its own (15% trying, 0.1% not), one pregnancy at a time, she can say no
 S.stage='pro';if(!S.gf)S.gf={n:'Taylor Blue',aff:80,status:'dating'};const _sv=save,_ls=lrStat;save=function(){};lrStat=function(){};const gfo=S.gf;let yes=0,no=0,preg=0;for(let i=0;i<4000;i++){S.gf.aff=100;S.gf.noW=null;P.cur=null;const l0=P.enc[P.enc.length-1];hmWoo2(1);if(P.enc[P.enc.length-1]!==l0){yes++;if(P.cur)preg++}else no++}
 o.tryRate=+(preg/yes).toFixed(3);o.G_tryRate15=o.tryRate>.12&&o.tryRate<.18;
 let p2=0,y2=0;for(let i=0;i<20000;i++){S.gf.noW=null;S.gf.aff=100;P.cur=null;const l0=P.enc[P.enc.length-1];hmWoo2(0);if(P.enc[P.enc.length-1]!==l0){y2++;if(P.cur)p2++}}o.notTryingRate=+(p2/y2).toFixed(4);o.G_notTrying=p2/y2<.004;
 P.cur={t0:calT(),g:'b',who:'x',disc:0,tr:1};let extra=0;for(let i=0;i<200;i++){S.gf.noW=null;const c=P.cur;hmWoo2(1);if(P.cur!==c)extra++}o.H_onePregnancy=extra===0;
 S.gf.aff=0;S.gf.noW=null;let dec=0;for(let i=0;i<300;i++){S.gf.noW=null;const l0=P.enc[P.enc.length-1];hmWoo2(1);if(P.enc[P.enc.length-1]===l0)dec++}o.I_canSayNo=dec>0;save=_sv;lrStat=_ls;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
