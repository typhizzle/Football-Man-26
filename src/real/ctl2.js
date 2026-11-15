// Controller polish (2026-11-15 playthrough): the highlight keeps its place when a menu redraws (play category -> its plays),
// and watching a drive: L-stick walks the sideline, Y changes view, X skips; View button changes camera in a game.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;S=mig(JSON.parse(j));save=()=>{};
 const PAD={id:'Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e)',connected:true,buttons:Array.from({length:17},()=>({pressed:false,value:0})),axes:[0,0,0,0]};navigator.getGamepads=()=>[PAD];
 const press=i=>{PAD.buttons[i]={pressed:true,value:1};ctlStep();PAD.buttons[i]={pressed:false,value:0};ctlStep()};
 startGame0(1,'reg');g.ph='pre';g.stage='call';g.tab='Run';pui();ctlStep();press(13);
 // A: press the "Short" tab -> highlight lands on a Short play card
 const sh=[...ov.querySelectorAll('button')].find(x=>x.textContent.trim()==='Short');ctlSet(sh);press(0);ctlStep();o.A_onCard=!!(CTL.sel&&CTL.sel.classList.contains('pc')&&/pick\('Short'/.test(CTL.sel.getAttribute('onclick')));
 // B: a redraw keeps the highlight on the same button (Chew clock toggles and stays highlighted)
 const ch=[...ov.querySelectorAll('button')].find(x=>/Chew/.test(x.textContent));ctlSet(ch);press(0);ctlStep();o.B_stays=!!(CTL.sel&&/chew\(\)/.test(CTL.sel.getAttribute('onclick')||''));
 // C: watching a drive
 ovHide();g.clk=600;g.r={pts:0,next:25,sec:1140,res:'x',log:[],pl:[{k:'run',gn:4,y0:40,dn:1,tg:10,s:1140}]};g.ph='opp';watchO();ctlStep();
 PAD.axes=[.9,0,0,0];ctlStep();o.C_walk=Math.abs(kb.x-.9)<.01;PAD.axes=[0,0,0,0];ctlStep();o.C_stops=kb.x===0;
 const m0=SLV.m;press(3);o.C_yView=SLV.m!==m0;o.C_legend=/walk/.test(document.getElementById('ctlleg').textContent);
 press(0);o.C_aDoesNotSkip=!!g.watch;press(2);o.C_xSkips=!g.watch;
 // D: View button changes the camera in a game
 g.ph='pre';g.stage='line';g.tk=1;ovHide();const c0=CAMI;press(8);o.D_viewCam=CAMI!==c0;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
