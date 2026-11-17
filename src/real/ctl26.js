// CONTROLLER CLASSIC MADDEN DEFAULT (tap lob, hold bullet, stick leads; Tap and Placement modes) + THROWAWAY + SLIDE + REAL OPTIONS + ROUTES MATCH NAMES (Tyler 2026-11-17).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({w:1366,h:768});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const o={};try{
 const mk=id=>({id,connected:true,buttons:Array.from({length:17},()=>({pressed:false,value:0})),axes:[0,0,0,0]});let PAD=mk('Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e)');navigator.getGamepads=()=>[PAD];
 const dn=i=>{PAD.buttons[i]={pressed:true,value:1};ctlStep()},up_=i=>{PAD.buttons[i]={pressed:false,value:0};ctlStep()},press=i=>{dn(i);up_(i)};
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';hub();press(13);
 const play=(nm,f)=>{startGame0(1,'reg');let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(p[0]===nm)pp=[c,i]});g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);g.sel=pp;snap(pp[0],pp[1]);ui.style.display='none';ov.style.display='none';for(let k=0;k<(f||20);k++){try{upd(.03)}catch(e){}}return g.pl};
 delete S.cpm;let P=play('Hitches');dn(0);const nb=!P.air;up_(0);o.A_classicTapLob=nb&&!!P.air&&P.air.kind==='lob'&&cpmOf()==='classic';P=play('Hitches');dn(0);CLA.t0-=300;up_(0);o.A_classicHoldBullet=!!P.air&&P.air.kind==='bullet';P=play('Hitches');PAD.axes=[0,-1,0,0];dn(0);CLA.t0-=300;up_(0);PAD.axes=[0,0,0,0];const lead=P.air&&P.air.ly;P=play('Hitches');dn(0);CLA.t0-=300;up_(0);o.A_stickLeads=lead>P.air.ly+1.5;S.cpm='tap';P=play('Hitches');dn(0);o.A_tapModeInstant=!!P.air;up_(0);delete S.cpm;
 S.cpm='meter';P=play('Hitches');dn(0);o.B_meterModeHolds=!P.air&&PA.i===0;up_(0);delete S.cpm;
 P=play('Hitches');press(11);o.C_r3ThrowAway=!!(P.air&&(P.air.lx<0||P.air.lx>53.3));
 P=play('QB Keeper',10);P.qb.y=g.los+3;P.car=P.qb;press(2);o.D_squareSlides=!!(P.done||g.ph!=='live')&&/SLIDE/.test(g.flash||'');
 P=play('Speed Option',40);const q=P.qb,rb=P.rb;o.E_pitchRelSameSide=rb.x>q.x-1&&rb.y<=q.y+.5;press(4);o.E_pitch=P.car===rb;
 P=play('Read Option',2);dn(0);for(let k=0;k<30;k++)try{upd(.03)}catch(e){}o.F_holdAGives=P.car===P.rb;up_(0);
 P=play('Read Option',2);dn(1);for(let k=0;k<30;k++)try{upd(.03)}catch(e){}o.G_holdBKeeps=P.car===P.qb;up_(1);
 const fl=RTE('flat',40,-.8,-1);o.H_flatIsFlat=Math.max(...fl.map(p=>p[1]))<=4.5;o.H_curlFlat=PB.Medium.find(p=>p[0]==='Curl-Flat')[2].split(',')[2]==='flat';
 const ou=RTE('out',6,-.5,1);o.H_outIsOut=Math.max(...ou.map(p=>p[1]))<11;
 }catch(e){o.err=e.message+' '+e.stack.slice(0,300)}return o},j);console.log(JSON.stringify(r));await b.close()})();
