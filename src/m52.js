// ===================== SPONSORS · CELEBRITIES · EVENTS · TWEETER =====================
// ---------- celebrities (parody names; looks matched: skin, hair, facial hair, height, body size, outfit) ----------
// [id, name, handle, fem, skin(0-5), hair(0 none,1 short,2 big,3 strip,4 long/braids,5 fringe), hairColor, facial(0-3), height(0-2), body(0-2), shirt, trim, pants, accessories, star tier(1-3), how they talk, portrait hair, brand offer]
const CELB=[
['tscoot','Travis Scoot','cactusjerk',0,4,4,'#1b1b1b',2,1,0,'#7a5a3a','#d9c39a','#3b3b3b','chain',3,'hyped, says "it\'s lit" and "straight up", uses lots of fire emojis','braids',['Cactus Jerk Meal','a fast-food combo named after you']],
['drizzle','Drizzle','drizzleovo',0,3,1,'#1b1b1b',3,1,1,'#111111','#d4af37','#111111','chain',3,'smooth and a little emotional, reps his hometown, calls people "fam"','short',['OVOvo','a hoodie collab']],
['kyeast','Kanye Yeast','yeastzy',0,4,1,'#1b1b1b',1,1,1,'#2a2a2a','#555555','#2a2a2a','shades',3,'eccentric genius, posts hot takes in ALL CAPS','buzz',['Yeastzy','a sneaker collab']],
['yeet','Yeet','yeetmusic',0,2,0,'#1b1b1b',2,1,0,'#4a4a32','#3a3a28','#2a2a2a','balaclava,capback',2,'talks in weird made-up slang, very chill','curly'],
['diddly','Diddly','diddlyy',0,5,0,'#1b1b1b',1,1,1,'#ffffff','#d4af37','#ffffff','shades,chain',3,'flashy party host, always promoting his brand','bald'],
['beyelash','Billie Eyelash','billieeyelash',1,0,4,'#111111',0,0,1,'#1b1b1b','#a6f20c','#1b1b1b','roots:#a6f20c,chain',3,'soft-spoken, dry sense of humor, lowercase texts','long'],
['tswiff','Tayla Swiff','taylaswiff',1,0,4,'#e8c872',0,2,0,'#c39bd3','#ffffff','#c39bd3','',3,'sweet and clever, hints she might write a song about you, loves football','long',['Swiff Eras Tour','a tour promo with your face on the screen']],
['lwane','Lil Wane','lilwane',0,5,4,'#1b1b1b',1,0,0,'#111111','#d7263d','#2a2a2a','chain,tats',3,'witty punchlines, calls himself the best rapper alive','braids'],
['lboaty','Lil Boaty','lilboaty',0,5,1,'#d7263d',1,1,1,'#f5f0e6','#111111','#111111','beads,grillr,bowtie',2,'playful and goofy, boat jokes','braids'],
['ppantera','Pink Pantera','pinkpantera',1,3,4,'#3b2a1a',0,0,0,'#ff7eb6','#ffffff','#ff7eb6','',2,'shy, chill, British slang','long'],
['pkartz','Playboi Kartz','kartzzz',0,5,4,'#1b1b1b',0,1,0,'#111111','#6b2a2a','#111111','shades',3,'mysterious, types in caps with weird spelling','braids'],
['kclock','Key Clock','keyclock',0,5,4,'#1b1b1b',1,1,0,'#c0392b','#111111','#2a2a2a','chain',2,'Memphis street energy, says very few words','braids'],
['mem','M&Em','mandem',0,0,1,'#e8c872',1,1,1,'#9a9a9a','#ffffff','#2a2a2a','cap',3,'fast-talking, sarcastic, rhymes everything','buzz'],
['shogg','Snoop Hogg','snoophogg',0,4,4,'#1b1b1b',2,2,0,'#2e86de','#ffffff','#2a2a2a','shades',3,'super laid-back, Long Beach slang, adds "-izzle" to words','braids',['Hogg Bites','a dog-treat ad starring you and your dog']],
['jbeaver','Justin Beaver','justinbeaver',0,0,1,'#7a4a2a',2,1,0,'#ffe066','#ffffff','#d9c39a','beanie',3,'chill, lowercase, says "peace" a lot','short'],
['bspurs','Brittany Spurs','brittanyspurs',1,0,4,'#e8c872',0,0,0,'#d7263d','#ffffff','#d7263d','',3,'bubbly, tons of emojis','long'],
['islice','Ice Slice','iceslice',1,2,2,'#e8742a',0,0,0,'#1b1b1b','#1b1b1b','#1b1b1b','bare,gloves,choker',2,'confident, says "grrah" and "like" a lot','curly'],
['lgogo','Lady Gogo','ladygogo',1,0,4,'#eeeeee',0,0,0,'#9b59b6','#111111','#111111','shades',3,'dramatic and theatrical, calls her fans "little critters"','bun'],
['sred','Sassyy Red','sassyyred',1,4,4,'#ff1a1a',0,1,2,'#e8202a','#ffffff','#e8202a','glasses,chainbig',2,'loud, bold and funny','long'],
['jbowl','Jelly Bowl','jellybowl',0,0,0,'#3b2a1a',3,2,2,'#111111','#555555','#2a2a2a','cap,tats',2,'big-hearted country singer, talks about second chances','bald'],
['lbawl','LiAngelo Bawl','gelobawl',0,3,1,'#1b1b1b',1,2,1,'#2d3436','#ffd700','#2d3436','chain',1,'hooper, chill, family first','short'],
['phall','Paul Hall','paulhall',0,1,1,'#7a4a2a',3,1,2,'#6c3483','#d4af37','#2a2a2a','grill,chain',1,'Houston legend, talks about grills and candy-painted cars','short'],
['greed','Greed','greedband',0,1,4,'#3b2a1a',1,1,1,'#3b2a1a','#111111','#2a2a2a','',1,'earnest 2000s rock frontman, very dramatic','long'],
['mjaxon','Michael Jaxon','mjaxon',0,3,4,'#1b1b1b',0,1,0,'#c0392b','#d4af37','#111111','fedora,glove',3,'gentle and kind, says "hee-hee"','curly'],
['kween','Kween','kweenband',0,2,1,'#1b1b1b',2,1,1,'#f1c40f','#ffffff','#ffffff','',3,'theatrical rock legend, champion energy','short'],
['swalker','Sauce Walker','saucewalker',0,5,4,'#1b1b1b',1,1,1,'#ff8c1a','#9b59b6','#2a2a2a','chain,shades',1,'Houston drip, says "sauce" a lot','braids'],
['weakend','The Weakend','theweakend',0,4,2,'#1b1b1b',1,1,0,'#d7263d','#111111','#111111','shades',3,'moody and mysterious, late-night vibes','curly'],
['bebeans','Black Eyed Beans','blackeyedbeans',0,5,1,'#1b1b1b',1,1,0,'#c0c8d0','#111111','#2a2a2a','shades',2,'futuristic party energy, tech nerd','short'],
['lskynard','Leonard Skynard','leonardskynard',0,1,4,'#c99a5a',3,1,1,'#3b6ea5','#ffffff','#3b6ea5','cowboy',1,'southern rock, laid-back country boy','long'],
['tredd','Trippy Redd','trippyredd',0,4,4,'#d7263d',0,0,0,'#111111','#d7263d','#111111','tats',1,'hyper emo rapper','braids'],
['cbeef','Chief Beef','chiefbeef',0,5,4,'#1b1b1b',1,1,1,'#111111','#c0392b','#2a2a2a','chain',2,'Chicago drill rapper, few words, reps Chicago','braids'],
['chamz','Chamillionz','chamillionz',0,4,4,'#1b1b1b',1,1,1,'#ffffff','#c0c8d0','#2a2a2a','chain,grill',1,'Houston, jokes about riding dirty','braids'],
['outcast','OutCasted','outcasted',0,5,1,'#1b1b1b',2,2,0,'#ff7eb6','#2ecc71','#ffe066','fedora',2,'creative and wise, weird in a good way','short'],
['jpall','Jake Pall','jakepall',0,0,1,'#c99a5a',0,1,2,'#c0392b','#ffffff','#2a2a2a','chain',2,'cocky, challenges everyone to a boxing match','short'],
['jblackk','Jack Blackk','jackblackk',0,1,4,'#3b2a1a',1,0,2,'#111111','#d7263d','#2a2a2a','',2,'goofy, rock and roll, sings everything','long'],
['ludacrust','Ludacrust','ludacrust',0,5,0,'#1b1b1b',1,1,1,'#d4af37','#111111','#2a2a2a','chain',2,'Atlanta, funny wordplay','bald'],
['glogorilla','GloGorilla','glogorilla',1,5,4,'#1b1b1b',0,2,2,'#9b59b6','#ff7eb6','#111111','',2,'Memphis, loud and confident','long'],
['mpony','Megan Thee Pony','megantheepony',1,4,4,'#111111',0,2,2,'#b5d334','#b5d334','#b5d334','headband:#b5d334',3,'confident hot-girl energy, loves anime','long'],
['hiss','Hiss','hissband',0,0,4,'#111111',0,2,1,'#111111','#c0c8d0','#111111','paint',2,'rock and roll all night, sticks his tongue out','long'],
['potmcgee','Pot McGee','patmcgeeshow',0,0,1,'#6b4a2b',0,2,2,'#111111','#111111','#b8a07a','bare',2,'loud, hyped sports-show host, says "baby" a lot, loves football and big moments','short'],
['typhizzle','TyPhizzle','typhizzle',0,0,4,'#3b2a1a',3,1,2,'#c0392b','#111111','#111111','redcap,glasses,chain,cup,num7',1,'Texas rapper, best friends with Wesscoastt, hype and funny, always bringing up their songs Hot Boys and P Giddy','long'],
['wesscoastt','Wesscoastt','wesscoastt',0,0,1,'#3b2a1a',2,1,0,'#111111','#111111','#5a7fa8','chain',1,'Texas rapper, best friends with TyPhizzle, cool and laid-back, few words','short']];
const celOb=c=>({id:c[0],n:c[1],h:c[2],fem:c[3],sk:c[4],hr:c[5],hcl:c[6],fh:c[7],ht:c[8],bd:c[9],c1:c[10],c2:c[11],pc:c[12],acc:c[13]?c[13].split(','):[],tier:c[14],vibe:c[15],st:c[16],br:c[17]||null});
const celBy=id=>{const c=CELB.find(x=>x[0]==id);return c?celOb(c):null};
const CEL_NEED=[0,100000,400000,1500000]; // fans you need before a star of that tier shows up for you
// portraits for the dialog box
try{CELB.forEach(c=>{const o=celOb(c),fs=[0,1,2,3,4,6][o.sk]||0;FKNOWN.push([new RegExp('^'+o.n.replace(/[.*+?^${}()|[\]\\&]/g,'\\$&')+'$'),{s:fs,h:o.hcl,st:o.st,bd:o.fh>=1&&!o.fem?1:0,fem:!!o.fem}])})}catch(e){}
// each save has its own set of celebrity fans
function celFans(){if(!S.cfan){const r=rng((S.seed||1)*97+11);S.cfan=CELB.filter(()=>r()<.38).map(c=>c[0]);if(S.cfan.length<6)S.cfan=CELB.slice().sort(()=>r()-.5).slice(0,8).map(c=>c[0])}return S.cfan}
const myFans=()=>{try{return fans(S.pop||40)}catch(e){return 0}};
function celCanCome(o){return celFans().includes(o.id)&&myFans()>=CEL_NEED[o.tier]}
// 3D celebrity
function celM(o){if(o.fem)return celF(o);const m=mk3({c1:o.c1,c2:o.c2,d:o.fem?0:1,pc:o.pc,nc:'#ffffff'},1.2,0,o.acc.includes('num7')?{nm:'',num:'7'}:null,{sk:o.sk,hr:o.hr,hcl:o.hcl,fh:o.fem?0:o.fh,ht:o.ht,bd:o.bd,fem:0},1);
 const A=o.acc,g=0xd4af37;
 if(A.includes('chain')){bx(.5,.06,.06,g,0,1.82,-.27,m);bx(.14,.16,.06,g,0,1.68,-.28,m)}
 if(A.includes('glasses')){[-.15,.15].forEach(x=>{bx(.22,.17,.03,0x444444,x,2.41,-.34,m);bx(.16,.11,.035,0xcfe8ff,x,2.41,-.345,m)});bx(.1,.03,.03,0x444444,0,2.43,-.345,m)}
 if(A.includes('redcap')){bx(.68,.16,.68,0xc0392b,0,2.73,0,m);bx(.52,.05,.32,0x111111,0,2.66,-.44,m);bx(.2,.1,.02,0x111111,0,2.74,-.345,m)}
 if(A.includes('cup')){const a=m.A&&m.A[0];if(a)bx(.2,.3,.2,0xffffff,0,-1.02,-.08,a)}
 if(A.includes('shades'))bx(.52,.12,.06,0x111111,0,2.41,-.35,m);
 if(A.includes('grill'))bx(.22,.06,.05,0xe0e0e0,0,2.2,-.34,m);
 if(A.includes('cap')){bx(.68,.16,.68,0x111111,0,2.73,0,m);bx(.52,.05,.32,0x111111,0,2.66,-.44,m)}
 if(A.includes('beanie'))bx(.7,.32,.7,o.c2=='#ffffff'?0x2a2a2a:hexC(o.c2),0,2.76,0,m);
 if(A.includes('cowboy')){bx(1.2,.05,1.2,0x6b4a2b,0,2.68,0,m);bx(.64,.32,.64,0x6b4a2b,0,2.86,0,m)}
 if(A.includes('fedora')){bx(.95,.05,.95,0x111111,0,2.68,0,m);bx(.64,.3,.64,0x111111,0,2.85,0,m)}
 if(A.includes('paint')){bx(.18,.2,.04,0x111111,-.15,2.43,-.335,m);bx(.18,.2,.04,0x111111,.15,2.43,-.335,m)}
 if(A.includes('tats')){bx(.05,.05,.03,0x222222,-.2,2.28,-.325,m);bx(.05,.05,.03,0x222222,.18,2.48,-.325,m);bx(.04,.1,.03,0x222222,.22,2.25,-.325,m)}
 if(A.includes('glove')){const a=m.A&&m.A[1];if(a)bx(.28,.22,.32,0xffffff,0,-.86,0,a)}
 const skc=SK[o.sk]||0xd9a066,opt=k=>{const x=A.find(s=>s.indexOf(k+':')==0);return x?hexC(x.split(':')[1]):null};
 if(A.includes('bare'))(m.A||[]).forEach(a=>bx(.28,.8,.32,skc,0,-.4,0,a));
 if(A.includes('gloves'))(m.A||[]).forEach(a=>{bx(.3,.5,.34,0xf2eee8,0,-.62,0,a);[-.75,-.55,-.4].forEach(y=>bx(.07,.07,.35,0xcfe8ff,0,y,0,a))});
 if(A.includes('choker'))bx(.26,.07,.26,0xe6e6e6,0,2.02,0,m);
 if(A.includes('chainbig')){bx(.52,.05,.06,0xe0e0e0,0,1.84,-.27,m);bx(.38,.22,.05,0xf2f2f2,0,1.58,-.28,m)}
 {const rc=opt('roots');if(rc){bx(.69,.16,.69,rc,0,2.715,0,m);bx(.54,.14,.05,rc,0,2.6,-.33,m)}}
 {const hb=opt('headband');if(hb)bx(.69,.09,.69,hb,0,2.62,0,m)}
 if(A.includes('beads')){[-.26,-.13,.13,.26].forEach(x=>{bx(.05,.14,.05,hexC(o.hcl),x,2.6,-.34,m);bx(.07,.07,.07,0xeaf6ff,x,2.5,-.34,m)});[-.34,.34].forEach(x=>[-.18,0,.18].forEach(z=>{bx(.05,.3,.05,hexC(o.hcl),x,2.48,z,m);bx(.07,.08,.07,0xeaf6ff,x,2.3,z,m)}))}
 if(A.includes('grillr'))[-.08,-.03,.02,.07].forEach((x,i)=>bx(.05,.05,.05,[0xff3b3b,0x2ecc71,0xffd700,0x3bd5ff][i],x,2.2,-.345,m));
 if(A.includes('bowtie'))bx(.3,.12,.05,0x111111,0,1.88,-.27,m);
 if(A.includes('balaclava')){bx(.68,.66,.68,0x151515,0,2.36,0,m);bx(.44,.22,.02,skc,0,2.37,-.343,m);[-.15,.15].forEach(x=>bx(.1,.08,.02,0x1b1b1b,x,2.41,-.35,m));bx(.22,.04,.02,0x2a1a12,0,2.29,-.35,m)}
 if(A.includes('capback')){bx(.72,.18,.72,0x4a3a28,0,2.76,0,m);bx(.52,.05,.32,0x4a3a28,0,2.68,.46,m)}
 return m}
function celF(o){const m=femM({c1:o.c1,c2:o.c2,pc:o.pc},1.2,{sk:o.sk,hr:o.hr,hcl:o.hcl,ht:o.ht,bd:o.bd},FEMO[o.id]||{});const mp={add:x=>{if(x.position.y>=1.95){x.position.y=2.28+(x.position.y-2.35)*.87;x.position.z*=.86;x.position.x*=.87;x.scale.multiplyScalar(.87)}else{x.position.x*=.6;x.position.z*=.7;x.scale.x*=.6}m.add(x)}};
 const A=o.acc,g=0xd4af37;
 if(A.includes('chain')){bx(.5,.06,.06,g,0,1.82,-.27,mp);bx(.14,.16,.06,g,0,1.68,-.28,mp)}
 if(A.includes('glasses')){[-.15,.15].forEach(x=>{bx(.22,.17,.03,0x444444,x,2.41,-.34,mp);bx(.16,.11,.035,0xcfe8ff,x,2.41,-.345,mp)});bx(.1,.03,.03,0x444444,0,2.43,-.345,mp)}
 if(A.includes('redcap')){bx(.68,.16,.68,0xc0392b,0,2.73,0,mp);bx(.52,.05,.32,0x111111,0,2.66,-.44,mp);bx(.2,.1,.02,0x111111,0,2.74,-.345,mp)}
 if(A.includes('cup')){const a=m.A&&m.A[0];if(a)bx(.2,.3,.2,0xffffff,0,-1.02,-.08,a)}
 if(A.includes('shades'))bx(.52,.12,.06,0x111111,0,2.41,-.35,mp);
 if(A.includes('grill'))bx(.22,.06,.05,0xe0e0e0,0,2.2,-.34,mp);
 if(A.includes('cap')){bx(.68,.16,.68,0x111111,0,2.73,0,mp);bx(.52,.05,.32,0x111111,0,2.66,-.44,mp)}
 if(A.includes('beanie'))bx(.7,.32,.7,o.c2=='#ffffff'?0x2a2a2a:hexC(o.c2),0,2.76,0,mp);
 if(A.includes('cowboy')){bx(1.2,.05,1.2,0x6b4a2b,0,2.68,0,mp);bx(.64,.32,.64,0x6b4a2b,0,2.86,0,mp)}
 if(A.includes('fedora')){bx(.95,.05,.95,0x111111,0,2.68,0,mp);bx(.64,.3,.64,0x111111,0,2.85,0,mp)}
 if(A.includes('paint')){bx(.18,.2,.04,0x111111,-.15,2.43,-.335,mp);bx(.18,.2,.04,0x111111,.15,2.43,-.335,mp)}
 if(A.includes('tats')){bx(.05,.05,.03,0x222222,-.2,2.28,-.325,mp);bx(.05,.05,.03,0x222222,.18,2.48,-.325,mp);bx(.04,.1,.03,0x222222,.22,2.25,-.325,mp)}
 if(A.includes('glove')){const a=m.A&&m.A[1];if(a)bx(.28,.22,.32,0xffffff,0,-.86,0,a)}
 const skc=SK[o.sk]||0xd9a066,opt=k=>{const x=A.find(s=>s.indexOf(k+':')==0);return x?hexC(x.split(':')[1]):null};
 
 if(A.includes('gloves'))(m.A||[]).forEach(a=>{bx(.18,.42,.2,0xf2eee8,0,-.5,0,a);[-.62,-.46,-.32].forEach(y=>bx(.05,.05,.21,0xcfe8ff,0,y,0,a))});
 if(A.includes('choker'))bx(.26,.07,.26,0xe6e6e6,0,2.02,0,mp);
 if(A.includes('chainbig')){bx(.52,.05,.06,0xe0e0e0,0,1.84,-.27,mp);bx(.38,.22,.05,0xf2f2f2,0,1.58,-.28,mp)}
 {const rc=opt('roots');if(rc){bx(.69,.16,.69,rc,0,2.715,0,mp);bx(.54,.14,.05,rc,0,2.6,-.33,mp)}}
 {const hb=opt('headband');if(hb)bx(.69,.09,.69,hb,0,2.62,0,mp)}
 if(A.includes('beads')){[-.26,-.13,.13,.26].forEach(x=>{bx(.05,.14,.05,hexC(o.hcl),x,2.6,-.34,mp);bx(.07,.07,.07,0xeaf6ff,x,2.5,-.34,mp)});[-.34,.34].forEach(x=>[-.18,0,.18].forEach(z=>{bx(.05,.3,.05,hexC(o.hcl),x,2.48,z,mp);bx(.07,.08,.07,0xeaf6ff,x,2.3,z,mp)}))}
 if(A.includes('grillr'))[-.08,-.03,.02,.07].forEach((x,i)=>bx(.05,.05,.05,[0xff3b3b,0x2ecc71,0xffd700,0x3bd5ff][i],x,2.2,-.345,mp));
 if(A.includes('bowtie'))bx(.3,.12,.05,0x111111,0,1.88,-.27,mp);
 if(A.includes('balaclava')){bx(.68,.66,.68,0x151515,0,2.36,0,mp);bx(.44,.22,.02,skc,0,2.37,-.343,mp);[-.15,.15].forEach(x=>bx(.1,.08,.02,0x1b1b1b,x,2.41,-.35,mp));bx(.22,.04,.02,0x2a1a12,0,2.29,-.35,mp)}
 if(A.includes('capback')){bx(.72,.18,.72,0x4a3a28,0,2.76,0,mp);bx(.52,.05,.32,0x4a3a28,0,2.68,.46,mp)}
 return m}

// ---------- brands and sponsorship contracts ----------
// [id, brand, category (one active deal per category), what you do, tier needed, pay multiplier, fans when signed]
const SPB=[
['goat_ap',"Goatie's",'apparel','the face of the Goatie\'s apparel line',1,1.15,2],
['goat_uw',"Goatie's Underwear",'underwear','underwear billboards (yes, those billboards)',2,.9,2],
['goat_gr',"Goatie's Gear",'gear','gloves, sleeves and visor on game day',1,.75,1],
['goat_jy',"Goatie's Jerseys",'jersey','your own signature jersey line',3,1.7,4],
['jorton','Jorton','sneakers','your own signature sneaker',3,2.2,4],
['jorton_c','Jorton','cleats','Jorton cleats on game day',2,1.4,2],
['nyk','Nyk','cleats','Nyk cleats and training shoes',2,1.5,2],
['nyk_ap','Nyk','apparel','Nyk training apparel',2,1.25,2],
['ua','Over Armored','cleats','Over Armored cleats',1,1.1,1],
['ua_ap','Over Armored','apparel','Over Armored compression gear',1,1,1],
['liger','Liger','cleats','Liger speed cleats',1,1,1],
['liger_ap','Liger','apparel','Liger lifestyle apparel',1,.95,1],
['yawn','Yawnverse','sneakers','Yawnverse lifestyle sneakers',1,.8,1],
['shartsh','Shart Shoes','sneakers','Shart Shoes (now in size 22)',1,.9,1],
['sharts','Sharts','apparel','Sharts streetwear',1,.9,1],
['tb12','Tim Brody 12','recovery','Tim Brody 12 recovery wear and sleep pajamas',2,1.3,2],
['tbf','Tim Brody Football','ball','official game-ball partner',2,1,2],
['trey','Scalp & Knees','hair','Trey Malu\'s shampoo: commercials with your hair flowing in slow motion',1,.7,1],
['lejarn','LeJarn James','collab','a "Strive" workout campaign with LeJarn James',3,1.8,4]];
const SPCAT={apparel:'Clothing',underwear:'Underwear',gear:'Game-day gear',jersey:'Jersey line',sneakers:'Sneakers',cleats:'Cleats',recovery:'Recovery wear',ball:'Football',hair:'Hair care',collab:'Collab',celeb:'Celebrity brand'};
const SPNEED=[0,15000,80000,400000];
function spPay(mult){const st=S.stage||'hs',f=Math.max(1000,myFans());const b=st=='pro'?250000*Math.sqrt(f/1e6):6000*Math.sqrt(f/5e4);return Math.max(st=='pro'?50000:1000,Math.round(b*mult*athM()/500)*500)}
function spEns(){S.spc=S.spc||[];if(!(S.stage=='col'||S.stage=='pro'))return S.spo=S.spo||{k:'',L:[]};const k=dk();if(S.spo&&S.spo.k==k)return S.spo;
 const r=rng((S.seed||1)*131+hsh(String(k))),act=S.spc.map(c=>c.cat),pool=SPB.filter(b=>!act.includes(b[2])&&(!/^tb/.test(b[0])||tbOk())).sort(()=>r()-.5),pick=[];
 if(!act.includes('apparel')&&!pool.slice(0,6).some(b=>b[0]=='goat_ap')){const g=SPB.find(b=>b[0]=='goat_ap');pick.push(g)} // Goatie's is the main brand: always in the mix
 pool.forEach(b=>{if(pick.length<7&&!pick.includes(b))pick.push(b)});
 const L=pick.map(b=>({id:b[0],b:b[1],cat:b[2],what:b[3],tier:b[4],yrs:1+(r()*3|0),pay:spPay(b[5]*(.85+r()*.3)),fan:b[6],t:0}));
 // celebrity brand offers: only from stars who are fans of yours and know who you are
 CELB.map(celOb).filter(o=>o.br&&celCanCome(o)).slice(0,2).forEach(o=>L.push({id:'cel_'+o.id,b:o.br[0]+' ('+o.n+')',cat:'celeb',what:o.br[1],tier:0,yrs:1,pay:spPay(1.6),fan:3,t:0,cel:o.id}));
 spEvOffers(r,L);return S.spo={k,L}}
function spOk(o){return myFans()>=SPNEED[o.tier||0]}
function spSign(i){const O=spEns(),o=O.L[i];if(!o||o.t||!spOk(o))return;if(o.cat=='event')return spEvSign(o);if(o.cat!='celeb'&&S.spc.some(c=>c.cat==o.cat)){HM='You already have a '+SPCAT[o.cat].toLowerCase()+' deal.';return spV()}
 o.t=1;const bonus=Math.round(o.pay*.5/500)*500;S.cash=(S.cash||0)+bonus;S.spc.push({id:o.id,b:o.b,cat:o.cat,what:o.what,pay:o.pay,left:o.yrs,cel:o.cel||null,f0:myFans(),w0:(S.T&&S.T[0]&&S.T[0].w)||0});S.pop=cl((S.pop||40)+o.fan,0,100);hapAdd(1);
 twAdd({a:o.cel?celBy(o.cel).n:o.b,h:o.cel?celBy(o.cel).h:o.b.toLowerCase().replace(/[^a-z0-9]/g,''),v:1,t:'Welcome to the family, @'+meH()+'! 🤝 '+o.what.charAt(0).toUpperCase()+o.what.slice(1)+'.'});
 HM='🤝 You signed with '+o.b+': $'+bonus.toLocaleString()+' signing bonus now, $'+o.pay.toLocaleString()+' every season for '+o.yrs+' season'+(o.yrs>1?'s':'')+'.';save();spV()}
function spDrop(i){const c=(S.spc||[])[i];if(!c)return;if(!confirm('End this deal early? You lose the rest of the money and a few fans.'))return;S.spc.splice(i,1);S.pop=cl((S.pop||40)-1,0,100);save();spV()}
// paid at every new season
function spYear(){const C=S.spc||[];if(!C.length)return;let tot=0,ended=[];C.forEach(c=>{S.cash=(S.cash||0)+c.pay;tot+=c.pay;c.left--;if(c.left<=0){ended.push(c.b);try{spRenew(c)}catch(e){}}});S.spc=C.filter(c=>c.left>0);S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🤝 Sponsors paid you $'+tot.toLocaleString()+' this season.'+(ended.length?' Deals that ended: '+ended.join(', ')+'.':'')}
const spWear=()=>{const C=S.spc||[];if(!C.length)return '';return '<small>Wearing: '+C.map(c=>esc(c.b)+' '+(SPCAT[c.cat]||'').toLowerCase()).join(' · ')+'</small>'};

// ---------- weekly invites: shows, fashion, promo parties, streams, collabs ----------
const STRM=['Hayden Moss','Leon'];
function spWeek(){if(!S||!(S.stage=='col'||S.stage=='pro'))return;const k=wkKey();if(S.spwk==k)return;S.spwk=k;try{twWeek()}catch(e){}
 const f=myFans(),L=[],r=R,yr=yrN(),last=(S.gs||[]).slice(-1)[0]||60;
 if(f>=30000&&r()<(last>=80?.45:.22))L.push({k:'pot',n:'The Pot McGee Show',d:'Pot wants you on the show this week.'});
 if(f>=400000&&S.galaY!=yr&&r()<.12)L.push({k:'gala',n:'The Mett Gala',d:'The biggest fashion night of the year. Wear your best suit.'});
 try{spEvWeek(L,r)}catch(e){}
 if(f>=60000&&r()<.25){const ev=[['Goatie\'s launch party','goat'],['Nyk House of Hype','nyk'],['Jorton Brand Night','jor'],['Celebrity charity gala','char'],['Album release party','alb']][ri(0,4)];L.push({k:'party',n:ev[0],d:'Red carpet, music, and celebrities. Go meet people.',v:ev[1]})}
 if(f>=40000&&r()<.18)L.push({k:'stream',n:'Stream with '+STRM[ri(0,STRM.length-1)],d:'Hop on a live stream and play some games.'});
 if(f>=1000000&&S.feastY!=yr&&r()<.07)L.push({k:'feast',n:'Mr Feast collab',d:'"Last to leave the end zone wins $250,000."'});
 if(f>=20000&&r()<.22){const sg=!(S.songs||[]).some(x=>x.k=='rbs')&&r()<.6?'rbs':['hot','pg'][r()<.5?0:1];L.push({k:'studio',song:sg,n:sg=='rbs'?'TyPhizzle & Wesscoastt: "Real Ballaz Swang"':'Feature on "'+(sg=='hot'?'Hot Boys':'P Giddy')+'" (Remix)',d:sg=='rbs'?'Their new song "Real Ballaz Swang" has an open verse with your name on it.':'TyPhizzle & Wesscoastt want you on the '+(sg=='hot'?'Hot Boys':'P Giddy')+' remix.'})}
 if(f>=150000&&r()<.1)L.push({k:'dude',n:'Dude Awesome trick-shot video',d:'Try a trick shot for a Dude Awesome video.'});
 S.spe={k,L,done:[]};if(L.length)S.fmsg=(S.fmsg?S.fmsg+' ':'')+'📅 New invite'+(L.length>1?'s':'')+': '+L.map(x=>x.n).join(', ')+'. Check 🤝 Sponsors.'}
function spEv(i){const E=S.spe;if(!E||!E.L[i]||E.done.includes(i))return;const e=E.L[i];talk('mate',e.n,e.d,'happy',[[['party','gala','studio','pot'].includes(e.k)?'🚶 Go there':'▶️ Do it','spEv2('+i+',0)'],['⏩ Sim it','spEv2('+i+',1)'],['↩️ Back to player menu','ovHide();hub()']])}
function spEv2(i,sim){const E=S.spe;if(!E||!E.L[i]||E.done.includes(i))return;const e=E.L[i];E.done.push(i);save();ovHide();if(sim)return spSim(e);
 if(e.k=='studio')return studioWalk(e.song||'rbs');if(e.k=='pot')return potWalk();if(e.k=='gala'){S.galaY=yrN();return evWalk('gala')}if(e.k=='party'){if(!e.cel){const bn={goat:"Goatie's",nyk:'Nyk',jor:'Jorton'}[e.v];const c_=bn&&brEvCel(bn);if(c_)e={...e,cel:c_}}EV_X=e;const r_=evWalk(e.v||'goat');EV_X=null;return r_}if(e.k=='stream')return streamEv(e.n.replace('Stream with ',''));if(e.k=='feast'){S.feastY=yrN();return feastEv()}if(e.k=='dude')return dudeEv()}
function potShow(){const Q=['Pot McGee here, baby! Are you the best QB in the country right now?','Be honest: who is the most overrated team you have played?','What is your pregame meal? Our viewers NEED to know.','If you could throw to one receiver in history, who is it?'][ri(0,3)];
 talk('reporter','Pot McGee',Q,'happy',[['🔥 Hype: "Nobody can stop us."','potAns(\'hype\')'],['🙏 Humble: "All credit to my line."','potAns(\'humble\')'],['😂 Funny: tell a joke on air','potAns(\'funny\')'],['😤 Roast your next opponent','potAns(\'roast\')']])}
function potAns(k){const d={hype:[4,-1,0,'Pot is FIRED UP. The clip goes viral.'],humble:[2,2,2,'Pot loves it. "That is a leader right there."'],funny:[3,0,1,'The whole set is crying laughing.'],roast:[5,-2,-1,'Pot is screaming. Your next opponent saw it.']}[k];S.pop=cl((S.pop||40)+d[0],0,100);S.trust=cl((S.trust||50)+d[1],0,100);S.tt=cl((S.tt||50)+d[2],0,100);const fee=S.stage=='pro'?25000:0;S.cash=(S.cash||0)+fee;hapAdd(1);
 twAdd({a:'Pot McGee',h:'patmcgeeshow',v:1,t:['Had @'+meH()+' on the show today. ELECTRIC. 🔥','@'+meH()+' is a DUDE, baby!','Best guest of the year so far: @'+meH()][ri(0,2)]});const inR=!!(LR&&LR.pot);if(inR)LR.potDone=1;cfOnce('pot','show',0);save();talk('reporter','Pot McGee',d[3],'happy',[['Continue',inR?'ovHide()':'ovHide();spV()']],'Fans '+(d[0]>=0?'+':'')+d[0]+(d[1]?' · coach trust '+(d[1]>0?'+':'')+d[1]:'')+(fee?' · $'+fee.toLocaleString()+' appearance fee':''))}
function streamEv(who){talk('mate',who,'Yo we live! What are we playing?','happy',[['🎮 Battle royale','streamGo(\''+who+'\',0)'],['🏀 Basketball game','streamGo(\''+who+'\',1)'],['🏈 Football game (play as yourself)','streamGo(\''+who+'\',2)']])}
function streamGo(who,g){const w=R()<.55,f=w?3:2;S.pop=cl((S.pop||40)+f,0,100);hapAdd(2);const L=[w?'GG! You carried the squad. Chat is going crazy.':'You got cooked but chat loved the rage. 😂',g==2?'You picked yourself in the football game. Chat: "ego check 💀"':''].filter(Boolean);twAdd({a:who,h:who.toLowerCase().replace(/\s/g,''),v:1,t:'Stream with @'+meH()+' was crazy 😂 '+(w?'he cooked':'he got cooked')});save();talk('mate',who,L.join(' '),'happy',[['Continue','ovHide();spV()']],'Fans +'+f)}
function feastEv(){talk('mate','Mr Feast','Welcome to the challenge! Last one to leave the end zone wins $250,000! Ready?','happy',[['Stay until the end','feastGo(1)'],['Leave early and keep it fun','feastGo(0)']])}
function feastGo(s){const win=s&&R()<.35,f=win?8:5;S.pop=cl((S.pop||40)+f,0,100);if(win){S.cash=(S.cash||0)+250000;S.viral='winning $250,000 in the Mr Feast challenge'}hapAdd(win?6:2);twAdd({a:'Mr Feast',h:'mrfeast',v:1,t:'New video with @'+meH()+' is LIVE! '+(win?'He WON the $250,000 🤯':'He lasted '+ri(3,40)+' hours lol')});save();talk('mate','Mr Feast',win?'YOU WON! $250,000!! 🤯':s?'Someone else outlasted you after '+ri(12,60)+' hours. Great video though!':'You tapped out early but the video is still a banger.','happy',[['Continue','ovHide();spV()']],'Fans +'+f+(win?' · +$250,000':''))}
function dudeEv(){talk('mate','Dude Awesome','We got the camera rolling. Which trick shot?','happy',[['Easy: hit the trash can from 20 yards','dudeGo(0)'],['Hard: through a tire on a zip line','dudeGo(1)'],['Insane: off the stadium roof into a cup','dudeGo(2)']])}
function dudeGo(d){const acc=(S.q&&S.q.acc)||70,p=[.9,.55,.2][d]+(acc-75)/200,ok=R()<p,f=ok?[1,3,7][d]:1;S.pop=cl((S.pop||40)+f,0,100);hapAdd(ok?2:0);if(ok)S.viral='hitting that Dude Awesome trick shot';if(ok)twAdd({a:'Dude Awesome',h:'dudeawesome',v:1,t:'@'+meH()+' just hit one of the craziest shots we have ever filmed 😱'});save();talk('mate','Dude Awesome',ok?'NO WAY! FIRST TRY! 🤯':'Missed... after '+ri(20,140)+' tries we had to call it. Bloopers will still go crazy.','happy',[['Continue','ovHide();spV()']],'Fans +'+f)}

// ---------- the Sponsors page ----------
function spV(){try{brFix()}catch(e){}const O=spEns(),C=S.spc||[],E=S.spe&&S.spe.k==wkKey()?S.spe:null,f=myFans();const sc=s=>'$'+s.toLocaleString();
 const offers=(S.stage=='col'||S.stage=='pro')?O.L.map((o,i)=>{const has=o.cat!='celeb'&&C.some(c=>c.cat==o.cat),ok=spOk(o);return `<div class=row style="font-size:16px;gap:6px;align-items:flex-start"><span style="min-width:0"><b>${esc(o.b)}</b> <small>${SPCAT[o.cat]||''}</small><br><small>${esc(o.what)}<br>${sc(o.pay)}/season · ${o.yrs} season${o.yrs>1?'s':''} · ${sc(Math.round(o.pay*.5/500)*500)} to sign${ok?'':'<br>🔒 Needs '+SPNEED[o.tier].toLocaleString()+' fans'}${has?'<br>You already have a '+(SPCAT[o.cat]||'').toLowerCase()+' deal':''}</small></span><button class=g style="width:auto;flex:none" ${o.t||!ok||has?'disabled':''} onclick="spSign(${i})">${o.t?'Signed':'Sign'}</button></div>`}).join(''):'<small>Brand contracts start in college.</small>';
 ui.innerHTML=`<div><h2>🤝 Sponsors</h2><p><small>💵 ${sc(S.cash||0)} · Fans ${f.toLocaleString()}</small></p>
 <div class=card><b>Your deals</b>${C.length?C.map((c,i)=>`<div class=row style="font-size:16px;gap:6px"><span><b>${esc(c.b)}</b> <small>${SPCAT[c.cat]||''} · ${sc(c.pay)}/season · ${c.left} left</small></span><button class=g style="width:auto;flex:none" onclick="spDrop(${i})">End</button></div>`).join(''):'<br><small>No brand deals yet. You can only have one deal per category (one cleat brand, one clothing brand...).</small>'}</div>
 <div class=card><b>📅 Invites this week</b>${E&&E.L.length?E.L.map((e,i)=>`<div class=row style="font-size:16px;gap:6px"><span><b>${esc(e.n)}</b><br><small>${esc(e.d)}</small></span><button class=g style="width:auto;flex:none" ${E.done.includes(i)?'disabled':''} onclick="spEv(${i})">${E.done.includes(i)?'Done':'Go'}</button></div>`).join(''):'<br><small>No invites this week. The more fans you have, the more invites you get (shows, parties, fashion events, streams, collabs).</small>'}</div>
 ${(S.songs||[]).length?'<div class=card><b>🎤 Your songs</b>'+S.songs.slice(-8).map(x=>'<div class=row style="font-size:15px"><span>'+esc(x.n)+' <small>ft. '+esc(x.with)+'</small></span><small>'+x.st.toLocaleString()+' streams</small></div>').join('')+'</div>':''}${cfCard()}${brCard()}${spRenCard()}<div class=card><b>Offers this season</b>${offers}</div>
 ${(SPV_IN=1,'')}${dealsHtml()}${(SPV_IN=0,'')}
 <button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}

// ---------- walkable events: promo parties and the Mett Gala, with celebrities ----------
function evWalk(v){ovHide();const gala=v=='gala',f=myFans();ui.style.display='none';cv.style.display=hud.style.display='none';['#lb','#camb','#pb','#spk'].forEach(s=>{const e=$(s);if(e)e.style.display='none'});scene('field');M='walk';clr(PL);CHR.visible=false;FLD.visible=EZ.visible=false;scn.fog=null;scn.background=new T3.Color(gala?0x1b1030:0x0f0f1a);
 const z0=-48,W=30,D=24,x1=-W/2,x2=W/2,zb=z0-D/2,zf=z0+D/2,O=[],title={gala:'THE METT GALA',goat:"GOATIE'S LAUNCH PARTY",nyk:'NYK HOUSE OF HYPE',jor:'JORTON BRAND NIGHT',char:'CELEBRITY CHARITY GALA',alb:'ALBUM RELEASE PARTY'}[v]||(EV_X&&EV_X.brand?String(EV_X.brand).toUpperCase()+' EVENT':'PARTY');
 bx(90,.04,90,0x222222,0,.01,z0,PL);bx(W,.06,D,gala?0xe8e0d0:0x2a2a3a,0,.04,z0,PL);
 const hw=[],wl=(w,h,d,x,z,ax,vv,sg)=>{const m=bx(w,h,d,gala?0xf3eee4:0x1e1e2e,x,h/2,z,PL);hw.push({m,ax,v:vv,sg,h});return m};
 wl(W,6,.3,0,zb,'z',zb,-1);wl(.3,6,D,x1,z0,'x',x1,-1);wl(.3,6,D,x2,z0,'x',x2,1);wl(W/2-2,6,.3,x1/2-1,zf,'z',zf,1);wl(W/2-2,6,.3,x2/2+1,zf,'z',zf,1);
 bx(3,.03,D*.8,0xb22234,0,.08,z0+1,PL); // red carpet
 {const b=bnr(title,'#ffffff');b.position.set(0,7,zb);b.scale.set(12,1.5,1);PL.add(b)}
 // step-and-repeat wall with sponsor logos
 for(let i=0;i<5;i++)for(let j=0;j<3;j++)bx(2,.5,.06,[0xd4af37,0xffffff,0xe84393,0x2e86de][(i+j)%4],-8+i*4,1.6+j*1.4,zb+.25,PL);
 // lights and tables
 for(let i=0;i<7;i++)bx(.3,.3,.3,[0xff4fa0,0x3bd5ff,0xffe93b,0x7bed9f][i%4],x1+2+i*(W-4)/6,5.6,zb+.4,PL);
 [[-9,z0+4],[9,z0+4],[-9,z0-4],[9,z0-4]].forEach(([x,z])=>{bx(1.6,.08,1.6,0xffffff,x,1,z,PL);bx(.2,1,.2,0x888888,x,.5,z,PL);bx(.15,.3,.15,0xffd700,x,1.2,z,PL)});
 if(!gala){bx(3,1.2,1.2,0x111111,0,.6,zb+3,PL);bx(.8,.08,.8,0x333333,-.7,1.25,zb+3,PL);bx(.8,.08,.8,0x333333,.7,1.25,zb+3,PL);O.push({k:'edj',n:'the DJ',x:0,z:zb+4.5})}
 else{O.push({k:'ecarpet',n:'the photographers',x:0,z:zb+3})}
 // the celebrities at the event: your celebrity fans who know you, plus a few more random stars
 const fansC=CELB.map(celOb).filter(celCanCome),others=CELB.map(celOb).filter(o=>!fansC.some(x=>x.id==o.id)&&!(EV_X&&EV_X.cel==o.id)&&o.id!='potmcgee'&&f>=CEL_NEED[o.tier]*.5),r=rng(hsh(wkKey()+v)),pick=[...(EV_X&&EV_X.cel?[celBy(EV_X.cel)]:[]),...fansC.filter(o=>!(EV_X&&EV_X.cel==o.id)).sort(()=>r()-.5).slice(0,3),...others.sort(()=>r()-.5).slice(0,gala?5:4)].slice(0,7);
 const spots=[[-10,z0-6],[-5,z0-2],[5,z0-2],[10,z0-6],[-11,z0+2],[11,z0+2],[0,z0-6]];
 pick.forEach((o,i)=>{const [x,z]=spots[i],m=celM(o);m.position.set(x,0,z);m.rotation.y=Math.atan2(x,z-zf);PL.add(m);const s=lbl(o.n);s.position.set(0,3.5,0);s.scale.set(3.2,.8,1);m.add(s);O.push({k:'eceleb',n:o.n,cid:o.id,x,z,m})});
 try{evGuests(O)}catch(e){}O.push({k:'eexit',n:'Exit',x:0,z:zf-.4});
 const pm=mk3({...DJ(),c1:S.suit?'#1b1b1b':'#2b2b2b',c2:'#ffffff'},1.2,0,{nm:'',num:''},AP(),1);PL.add(pm);
 LR={p:{x:0,z:zf-2,ry:0},pm,O,all:[...O],walls:[],hw,bd:[x1+.6,x2-.6,zb+.6,zf-.4],field:1,ev:v,evMet:[],near:null,tg:null,pend:null,joy:null,pd:null};
 const el=$('#lrw');el.innerHTML=`<div class=top><button onclick="evExit()">Leave</button><div id=lrs></div></div><div id=lrj><div id=lrk></div></div><div id=lra></div><div id=lrh>✨ ${title}. Walk around and meet people.</div><div id=lrcap></div>`;el.style.display='block';lrPtr();lrStat();
 if(gala){const lk=looksEns(),best=S.suit&&lk>=75,ok=S.suit;S.pop=cl((S.pop||40)+(best?5:ok?2:-1),0,100);setTimeout(()=>talk('reporter','Fashion reporter',best?'You are on the BEST DRESSED list tonight! 📸':ok?'Clean fit. The cameras liked it.':'A hoodie... at the Mett Gala? Bold. The internet will have opinions.','happy',[['📸','ovHide()']],best?'Fans +5':ok?'Fans +2':'Fans -1 · buy a suit in the Shop'),500)}
 save()}
function evAct(o){if(o.k=='eguest')return guestAct(o);if(LR&&LR.studio)return stAct(o);if(LR&&LR.pot)return potAct(o);if(o.k=='eexit')return evExit();if(o.k=='edj')return talk('mate','DJ','You want a shout-out?','happy',[['🎤 Yeah!','evDJ()'],['Nah','ovHide()']]);
 if(o.k=='ecarpet')return talk('reporter','Photographers','Over here! Over here!','happy',[['📸 Pose','evPose()'],['Keep walking','ovHide()']]);
 if(o.k=='eceleb'&&LR.ev=='room')return;if(o.k=='eceleb'){const c=celBy(o.cid),fan=celFans().includes(c.id),met=LR.evMet.includes(c.id);const line=fan?['Yo! I watch every one of your games!','THE QB! Bro you are my favorite player.','Can I get a picture? My whole crew are fans.'][ri(0,2)]:['Hey, nice to meet you. You play football, right?','Love the fit.','Having a good night?'][ri(0,2)];
  return talk('mate',c.n,line,fan?'happy':'smug',[...(met?[]:[['📸 Take a selfie','evSelfie(\''+c.id+'\')']]),['📱 Stay connected','evNum(\''+c.id+'\')'],...(celAskOk(c.id)&&!S.gf?[['❤️ Ask her out','celAsk(\''+c.id+'\')']]:[]),...brPitchBtns(c.id),['See you around','ovHide()']],'Friendship: '+cfLvl(cfGet(c.id))+' ('+cfGet(c.id)+'/100)')}}
function evSelfie(id){const c=celBy(id);cfOnce(id,'pic',8);LR.evMet.push(id);S.pop=cl((S.pop||40)+(celFans().includes(id)?2:1),0,100);picAdd('Selfie with '+c.n);twAdd({a:S.name,h:meH(),me:1,t:'Me and @'+c.h+' 📸🔥',lk:0,rt:0});ovHide();lrStat();const h=$('#lrh');if(h)h.textContent='📸 Selfie with '+c.n+'. Posted it on Tweeter.';save()}
function evNum(id){const c=celBy(id),fan=celFans().includes(id),ok=fan||cfGet(id)>=20||R()<.35;cfOnce(id,'num',ok?6:2);ovHide();if(ok){celContact(c)}const h=$('#lrh');if(h)h.textContent=ok?'📱 '+c.n+' gave you their number.':'🙅 '+c.n+' said maybe next time.';save()}
function celContact(c){const P=phEns();if(!P.c.some(x=>x.id=='cel:'+c.id))P.c.push({id:'cel:'+c.id,n:c.n,role:'Celebrity',pers:'celeb',cel:c.id,team:'',th:[]})}
function evDJ(){ovHide();S.pop=cl((S.pop||40)+1,0,100);const h=$('#lrh');if(h)h.textContent='🎤 "Shout-out to the QB in the building!" The whole room cheers.';save()}
function evPose(){ovHide();S.pop=cl((S.pop||40)+1,0,100);picAdd('Mett Gala red carpet');const h=$('#lrh');if(h)h.textContent='📸 Flash flash flash.';save()}
function evExit(){try{hmMood(0)}catch(e){}const w=$('#lrw');w.style.display='none';w.innerHTML='';LR=null;scn.fog=null;FLD.visible=EZ.visible=true;ui.style.display='block';save();spV()}

// ---------- celebrities at your games (only the ones who are fans, only once you are famous enough) ----------
function celFW(O){if(!(S.stage=='col'||S.stage=='pro'))return;const C=CELB.map(celOb).filter(o=>celCanCome(o)||cfGet(o.id)>=50);if(!C.length)return;if(R()>((g&&g.w)?.4:.25))return;const o=C[ri(0,C.length-1)],m=celM(o),x=-14,z=-44;m.position.set(x,0,z);m.rotation.y=Math.atan2(x,z+50);PL.add(m);const s=lbl(o.n);s.position.set(0,3.5,0);s.scale.set(3.2,.8,1);m.add(s);O.push({k:'fceleb',n:o.n,cid:o.id,x,z,m})}
function celAct(o){const c=celBy(o.cid),win=g&&g.w,F=g.fw||(g.fw={});const line=win?['That was CRAZY! I had to come see you.','You put on a show tonight! 🔥','Bro, I flew in just to watch you. Worth it.'][ri(0,2)]:['Tough one. I am still riding with you.','We bounce back next week. I believe in you.'][ri(0,1)];
 talk('mate',c.n,line,win?'happy':'sad',[...(F['cel'+c.id]?[]:[['📸 Take a picture together','celPic(\''+c.id+'\')']]),['📱 Stay connected','celNum(\''+c.id+'\')'],...(celAskOk(c.id)&&!S.gf?[['❤️ Ask her out','celAsk(\''+c.id+'\')']]:[]),...brPitchBtns(c.id),['Thanks for coming!','ovHide()']],'Friendship: '+cfLvl(cfGet(c.id))+' ('+cfGet(c.id)+'/100)')}
function celPic(id){const c=celBy(id),F=g.fw||(g.fw={});cfOnce(id,'pic',8);F['cel'+id]=1;S.pop=cl((S.pop||40)+3,0,100);picAdd('Postgame with '+c.n);twAdd({a:c.n,h:c.h,v:1,cel:c.id,t:['Had to pull up for @'+meH()+' tonight 🔥','My guy @'+meH()+' is HIM','Front row for @'+meH()+'. Worth every second.'][ri(0,2)]});save();lrStat();talk('mate',c.n,'Posting this right now 📸','happy',[['🔥','ovHide()']],'Fans +3')}
function celNum(id){const c=celBy(id);cfOnce(id,'num',6);celContact(c);save();talk('mate',c.n,'Text me anytime. For real.','happy',[['Bet','ovHide()']],'📱 '+c.n+' is in your phone now.')}

// ---------- 🐦 TWEETER ----------
const meH=()=>String(S.name||'qb').toLowerCase().replace(/[^a-z0-9]/g,'')+(S.num||'');
const TWF=['Jaylen','Mike','Ashley','Bri','Tyrell','Marcus','Kayla','Josh','Destiny','Chris','Tasha','Devin','Megan','Andre','Becky','DJ','Nina','Trey'];
// fan tweets (add more here: {P} = you, {T} = your team)
const TWU={good:['{P} is HIM. No debate.','Bro {P} just cooked that whole defense 🔥🔥','I need a {P} jersey ASAP','{T} fans eating good this year with {P}','{P} for Heisman, tell a friend','Somebody check on that secondary after what {P} did 💀','{P} plays like he owes somebody money'],
 bad:['{P} was HORRIBLE today 😭','Bench {P}. I said what I said.','{P} threw more picks than my little brother on Madden','Whoever told {P} he was good lied','{T} needs a new QB fr','{P} had a rough one but he will bounce back'],
 mid:['{P} was alright today, not his best','Decent game from {P}, line needs to step up','Can {P} please throw it deep more','{T} game was a snoozer'],
 any:['Just bought tickets to watch {P} 🎟️','My dog is named after {P} now','{P} walking out the tunnel >>>','Who has a {P} highlight tape?','{P} hair is crazy lol']};
const GSPNP=[['Pot McGee','patmcgeeshow'],['Nate Wright','natewright'],['Paullin Loudherd','loudherd'],['A.C. Hawk','achawk'],['Cameron Nugent','cnugent'],['Shadon Shorpe','shadonshorpe'],['Ivan Rapsheesh','rapsheesh']];
function twEns(){const T=S.tw=S.tw||{f:[],id:1};return T}
function twAdd(p){const T=twEns();p.id=T.id++;p.y=yrN();p.w=wkKey();p.lk=p.lk!=null?p.lk:Math.round((p.v?myFans()*.02:myFans()*.002+ri(0,50))*(.5+R()));p.rt=p.rt!=null?p.rt:Math.round(p.lk*(.05+R()*.15));p.rp=p.rp||[];T.f.unshift(p);if(T.f.length>80)T.f.length=80;if(!p.me)T.un=(T.un||0)+1;return p}
function twFill(t){const T=S.T&&S.T[0];return t.replace(/\{P\}/g,'@'+meH()).replace(/\{T\}/g,T?T.n:'the team')}
function twWeek(){const last=(S.gs||[]).slice(-1)[0],mood=last==null?'any':last>=78?'good':last<=55?'bad':'mid',n=ri(2,4);
 for(let i=0;i<n;i++){const L=TWU[R()<.75?mood:'any'],nm=TWF[ri(0,TWF.length-1)];twAdd({a:nm,h:nm.toLowerCase()+ri(1,999),t:twFill(L[ri(0,L.length-1)])})}
 if(R()<.45){const p=GSPNP[ri(0,GSPNP.length-1)];twAdd({a:p[0],h:p[1],v:1,t:twFill(mood=='bad'?['Concerned about {P} after that one.','{P} needs to clean it up. Period.'][ri(0,1)]:mood=='good'?['{P} is playing at an elite level right now.','I said it before: {P} is the real deal.'][ri(0,1)]:['Keep an eye on {P} this week.','{T} has a big one coming up.'][ri(0,1)])})}
 const C=CELB.map(celOb).filter(celCanCome);if(C.length&&R()<.35){const c=C[ri(0,C.length-1)];twAdd({a:c.n,h:c.h,v:1,cel:c.id,t:twFill(mood=='bad'?['Still riding with {P} 🙏','{P} we up next week'][ri(0,1)]:['{P} is my favorite player rn 🔥','watching {P} like 👀','{P} we need to link'][ri(0,2)])})}
 if(S.gf&&R()<.3)twAdd({a:S.gf.n,h:S.gf.n.toLowerCase().replace(/[^a-z]/g,''),t:twFill(['So proud of {P} ❤️','My man {P} 😍','{P} come home and cook 😤❤️'][ri(0,2)])})}
let TWTAB='feed';
function twV(tab){if(tab)TWTAB=tab;const T=twEns();T.un=0;const f=myFans(),P=T.f.filter(p=>TWTAB=='me'?p.me||p.rp.some(r=>r.me):!p.me||TWTAB=='feed');
 const card=p=>`<div class=card style="margin:6px 0;text-align:left"><div style="font-size:15px"><b>${esc(p.a)}</b>${p.v?' <span style="color:#3bd5ff">✔</span>':''} <small>@${esc(p.h)}</small></div><div style="font-size:17px;margin:4px 0">${esc(p.t)}</div><small>❤️ ${(p.lk||0).toLocaleString()} · 🔁 ${(p.rt||0).toLocaleString()} · 💬 ${p.rp.length}</small>${p.rp.slice(-4).map(r=>`<div style="margin:4px 0 0 10px;font-size:15px;border-left:3px solid #888;padding-left:6px"><b>${esc(r.a)}</b>${r.v?' <span style="color:#3bd5ff">✔</span>':''}: ${esc(r.t)}</div>`).join('')}<button class=g style="margin-top:6px" onclick="twReply(${p.id})">💬 Reply</button></div>`;
 ui.innerHTML=`<div><h2>🐦 Tweeter</h2><p><small>@${meH()} · ${f.toLocaleString()} followers</small></p><p class=tabs><button class="${TWTAB=='feed'?'':'g'}" onclick="twV('feed')">Feed</button><button class="${TWTAB=='me'?'':'g'}" onclick="twV('me')">My tweets</button></p><button onclick=twNew()>✏️ New tweet</button>${P.length?P.slice(0,30).map(card).join(''):'<div class=card><small>Nothing yet. Play some games and people will start talking.</small></div>'}<button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
function twTargets(){const L=[];CELB.forEach(c=>L.push(['c:'+c[0],c[1]+' (@'+c[2]+')']));GSPNP.forEach((p,i)=>L.push(['g:'+i,p[0]+' (GSPN)']));try{rost('h.0').slice(0,12).forEach((x,i)=>{if(i)L.push(['m:'+i,x.n+' ('+x.pos+', teammate)'])})}catch(e){}return L}
function twNew(pre){const tg=twTargets();ui.innerHTML=`<div><h2>✏️ New tweet</h2><div class=card><label>Tag someone (optional)<select id=twat><option value="">Nobody</option>${tg.map(t=>`<option value="${t[0]}" ${pre==t[0]?'selected':''}>${esc(t[1])}</option>`).join('')}</select></label><label>Your tweet<textarea id=twtx rows=3 maxlength=200 placeholder="What's happening?"></textarea></label>
 <p class=tabs style="flex-wrap:wrap">${['Big win tonight 🔥','We back to work. Next week.','Thank you to the fans ❤️','Nobody believed in us.','Shout-out to my O-line 🙏','Let\'s link up'].map(s=>`<button class=g style="font-size:13px" onclick="document.querySelector('#twtx').value=${JSON.stringify(s).replace(/"/g,'&quot;')}">${esc(s)}</button>`).join('')}</p>
 <button onclick=twPost()>Post</button></div><button class=g onclick="twV()">Back</button></div>`;ui.scrollTop=0}
async function twPost(){const at=$('#twat')?$('#twat').value:'',tx=($('#twtx')?$('#twtx').value:'').trim();if(!tx)return;let who=null;if(at.startsWith('c:'))who={k:'c',c:celBy(at.slice(2))};else if(at.startsWith('g:'))who={k:'g',p:GSPNP[+at.slice(2)]};else if(at.startsWith('m:'))try{const x=rost('h.0')[+at.slice(2)];who={k:'m',n:x.n,pos:x.pos}}catch(e){}
 const tag=who?(who.k=='c'?'@'+who.c.h:who.k=='g'?'@'+who.p[1]:'@'+who.n.toLowerCase().replace(/[^a-z]/g,'')):'';const p=twAdd({a:S.name,h:meH(),me:1,t:(tag&&!tx.includes(tag)?tag+' ':'')+tx});
 // random fans reply
 const nr=Math.min(3,Math.floor(Math.log10(Math.max(10,myFans()))-2));for(let i=0;i<nr;i++){const nm=TWF[ri(0,TWF.length-1)];p.rp.push({a:nm,t:['🔥🔥','facts','W','let\'s goooo','ratio','we love to see it','👀'][ri(0,6)]})}
 twV('me');if(!who)return save();
 // the person you tagged answers (or not)
 let name,vibe,fan=1,reply=1;if(who.k=='c'){name=who.c.n;vibe=who.c.vibe;fan=celFans().includes(who.c.id);const known=myFans()>=CEL_NEED[who.c.tier]*(fan?.3:1);reply=known?(fan?R()<.9:R()<.5):R()<.12}else if(who.k=='g'){name=who.p[0];vibe='sports TV personality';reply=R()<.6}else{name=who.n;vibe='your teammate, supportive';reply=R()<.9}
 if(!reply){save();return}
 let t=null;try{let sp=null;try{sp=typeof claude!='undefined'?await claude.use('sample'):null}catch(e){}if(sp&&!PHB){const r=await sp([{role:'user',content:`You are ${name} on a social media app in a football life-sim game. How you talk: ${vibe}. A ${S.stage=='pro'?'pro':'college'} quarterback named ${S.name} (${myFans().toLocaleString()} followers) tagged you: "${p.t}". ${who.k=='c'?(fan?'You are a big fan of his.':'You barely know who he is.'):''} Reply with ONE short tweet (under 140 characters), in character, PG-13, no hashtags spam. Reply with only the tweet text.`}],{modelTier:'quick',cache:false});t=(r.text||'').trim().replace(/^"|"$/g,'').slice(0,200)}}catch(e){if(e&&(e.code=='not_granted'||e.code=='sampling_disabled'))PHB=true}
 if(!t)t=who.k=='c'?(fan?['Bro you nasty 🔥','we gotta link fr','front row next game 👀','my favorite QB!!'][ri(0,3)]:['appreciate it 🙏','👀','good luck this season','who is this? 😂'][ri(0,3)]):who.k=='g'?['Come on the show and say that 😂','Respect.','We see you!'][ri(0,2)]:['LETS GOOO','My QB 🔥','I got you bro'][ri(0,2)];
 p.rp.push({a:name,v:who.k!='m',t});if(who.k=='c'){cfOnce(who.c.id,'tw',fan?6:3);S.pop=cl((S.pop||40)+(fan?3:1),0,100);if(fan&&R()<.5)celContact(who.c)}else S.pop=cl((S.pop||40)+1,0,100);save();if(ui.innerHTML.includes('🐦 Tweeter'))twV()}
function twReply(id){const T=twEns(),p=T.f.find(x=>x.id==id);if(!p)return twV();ui.innerHTML=`<div><h2>💬 Reply</h2><div class=card style="text-align:left"><b>${esc(p.a)}</b> <small>@${esc(p.h)}</small><br>${esc(p.t)}</div><div class=card><textarea id=twrx rows=3 maxlength=200 placeholder="Your reply"></textarea><button onclick="twReply2(${id})">Reply</button></div><button class=g onclick="twV()">Back</button></div>`}
async function twReply2(id){const T=twEns(),p=T.f.find(x=>x.id==id),tx=($('#twrx')?$('#twrx').value:'').trim();if(!p||!tx)return twV();p.rp.push({a:S.name,me:1,t:tx});S.pop=cl((S.pop||40)+(p.v?1:0),0,100);twV();if(p.me||R()>.6){save();return}
 const c=p.cel?celBy(p.cel):null;let t=null;try{let sp=null;try{sp=typeof claude!='undefined'?await claude.use('sample'):null}catch(e){}if(sp&&!PHB){const r=await sp([{role:'user',content:`You are ${p.a} on a social media app in a football life-sim game.${c?' How you talk: '+c.vibe+'.':''} You tweeted: "${p.t}". Quarterback ${S.name} replied: "${tx}". Write ONE short reply tweet back (under 120 characters), in character, PG-13. Only the tweet text.`}],{modelTier:'quick',cache:false});t=(r.text||'').trim().replace(/^"|"$/g,'').slice(0,200)}}catch(e){if(e&&(e.code=='not_granted'||e.code=='sampling_disabled'))PHB=true}
 if(!t)t=['😂😂','facts','he replied!! 😭','respect 🙏','W'][ri(0,4)];p.rp.push({a:p.a,v:p.v,t});if(p.cel)cfOnce(p.cel,'tw',3);save();if(ui.innerHTML.includes('🐦 Tweeter'))twV()}
const twUn=()=>{try{return (S.tw&&S.tw.un)||0}catch(e){return 0}};

function picAdd(t){(S.pics=S.pics||[]).push(t+' · '+yrN());if(S.pics.length>200)S.pics.shift()}
// ---------- ⭐ celebrity room (visual only: everyone in one room with name tags) ----------
const CEL_REAL={tscoot:'Travis Scott',drizzle:'Drake',kyeast:'Kanye West',yeet:'Yeat',diddly:'Diddy',beyelash:'Billie Eilish',tswiff:'Taylor Swift',lwane:'Lil Wayne',lboaty:'Lil Yachty',ppantera:'PinkPantheress',pkartz:'Playboi Carti',kclock:'Key Glock',mem:'Eminem',shogg:'Snoop Dogg',jbeaver:'Justin Bieber',bspurs:'Britney Spears',islice:'Ice Spice',lgogo:'Lady Gaga',sred:'Sexyy Red',jbowl:'Jelly Roll',lbawl:'LiAngelo Ball',phall:'Paul Wall',greed:'Creed',mjaxon:'Michael Jackson',kween:'Queen',swalker:'Sauce Walka',weakend:'The Weeknd',bebeans:'Black Eyed Peas',lskynard:'Lynyrd Skynyrd',tredd:'Trippie Redd',cbeef:'Chief Keef',chamz:'Chamillionaire',outcast:'OutKast',jpall:'Jake Paul',jblackk:'Jack Black',ludacrust:'Ludacris',glogorilla:'GloRilla',mpony:'Megan Thee Stallion',hiss:'Kiss',typhizzle:'TyPhizzle',wesscoastt:'Wesscoastt'};
function celRoom(){ovHide();ui.style.display='none';cv.style.display=hud.style.display='none';['#lb','#camb','#pb','#spk'].forEach(s=>{const e=$(s);if(e)e.style.display='none'});scene('field');M='walk';clr(PL);CHR.visible=false;FLD.visible=EZ.visible=false;scn.fog=null;scn.background=new T3.Color(0x20202c);
 const L=CELB.map(celOb),per=7,rows=Math.ceil(L.length/per),W=per*3.6+4,D=rows*4.6+8,z0=-48,x1=-W/2,x2=W/2,zb=z0-D/2,zf=z0+D/2,O=[];
 bx(120,.04,120,0x2a2a2a,0,.01,z0,PL);bx(W,.06,D,0xd8d2c4,0,.04,z0,PL);
 const hw=[],wl=(w,h,d,x,z,ax,vv,sg)=>{const m=bx(w,h,d,0x3a3a4a,x,h/2,z,PL);hw.push({m,ax,v:vv,sg,h});return m};
 wl(W,6,.3,0,zb,'z',zb,-1);wl(.3,6,D,x1,z0,'x',x1,-1);wl(.3,6,D,x2,z0,'x',x2,1);wl(W/2-2,6,.3,x1/2-1,zf,'z',zf,1);wl(W/2-2,6,.3,x2/2+1,zf,'z',zf,1);
 {const b=bnr('CELEBRITY ROOM','#ffe93b');b.position.set(0,7,zb);b.scale.set(12,1.5,1);PL.add(b)}
 L.forEach((o,i)=>{const r=(i/per)|0,c=i%per,x=x1+2+3.6*(c+.5),z=zb+3+r*4.6,m=celM(o);m.position.set(x,0,z);m.rotation.y=Math.PI;PL.add(m);bx(1.4,.15,1.4,0x8a8a9a,x,.08,z,PL);const s=lbl(CEL_REAL[o.id]||o.n);s.position.set(0,3.5,0);s.scale.set(3.2,.8,1);m.add(s);O.push({k:'eceleb',n:CEL_REAL[o.id]||o.n,cid:o.id,x,z,dm:m})});
 O.push({k:'eexit',n:'Exit',x:0,z:zf-.4});
 const pm=mk3({...DJ(),c1:'#2b2b2b',c2:'#ffffff'},1.2,0,{nm:'',num:''},AP(),1);PL.add(pm);
 LR={p:{x:0,z:zf-2,ry:0},pm,O,all:[...O],walls:[],hw,bd:[x1+.6,x2-.6,zb+.6,zf-.4],field:1,ev:'room',evMet:[],near:null,tg:null,pend:null,joy:null,pd:null};
 const el=$('#lrw');el.innerHTML=`<div class=top><button onclick="evExit()">Leave</button><div id=lrs></div></div><div id=lrj><div id=lrk></div></div><div id=lra></div><div id=lrh>⭐ Celebrity room. Walk around and look at everyone.</div><div id=lrcap></div>`;el.style.display='block';lrPtr();lrStat()}

// ---------- sim any invite ----------
function spSim(e){if(e.k=='pot')return potAns(['hype','humble','funny','roast'][ri(0,3)]);if(e.k=='stream')return streamGo(e.n.replace('Stream with ',''),ri(0,2));if(e.k=='feast'){S.feastY=yrN();return feastGo(R()<.5?1:0)}if(e.k=='dude')return dudeGo(ri(0,2));if(e.k=='studio')return songMake(e.song||'rbs',['hard','melodic','funny'][ri(0,2)],1);
 let f=1,msg='You showed up, took pictures and networked.';if(e.k=='gala'){S.galaY=yrN();const best=S.suit&&looksEns()>=75;f=best?5:S.suit?2:-1;msg=best?'You made the BEST DRESSED list! 📸':S.suit?'Clean fit. The cameras liked it.':'You wore a hoodie to the Mett Gala. The internet has opinions.'}
 const C=CELB.map(celOb).filter(celCanCome);if(C.length&&R()<.5){const c=C[ri(0,C.length-1)];celContact(c);picAdd('Selfie with '+c.n);msg+=' '+c.n+' gave you their number.';f++}
 S.pop=cl((S.pop||40)+f,0,100);hapAdd(1);save();talk('mate',e.n,msg,'happy',[['Continue','ovHide();spV()']],'Fans '+(f>=0?'+':'')+f)}
// ---------- 🎤 the studio: TyPhizzle & Wesscoastt (Real Ballaz Swang) ----------
function studioWalk(song){ovHide();ui.style.display='none';cv.style.display=hud.style.display='none';['#lb','#camb','#pb','#spk'].forEach(s=>{const e=$(s);if(e)e.style.display='none'});scene('field');M='walk';clr(PL);CHR.visible=false;FLD.visible=EZ.visible=false;scn.background=new T3.Color(0x120d16);scn.fog=new T3.Fog(0x3a3040,14,46);
 const z0=-48,W=20,D=16,x1=-W/2,x2=W/2,zb=z0-D/2,zf=z0+D/2,O=[];bx(90,.04,90,0x1a1a1a,0,.01,z0,PL);bx(W,.06,D,0x3b2a22,0,.04,z0,PL);bx(W*.6,.03,D*.5,0x5a1f2b,0,.07,z0+1,PL);
 const hw=[],wl=(w,h,d,x,z,ax,vv,sg)=>{const m=bx(w,h,d,0x2a2230,x,h/2,z,PL);hw.push({m,ax,v:vv,sg,h});return m};
 wl(W,5,.3,0,zb,'z',zb,-1);wl(.3,5,D,x1,z0,'x',x1,-1);wl(.3,5,D,x2,z0,'x',x2,1);wl(W/2-1.5,5,.3,x1/2-.75,zf,'z',zf,1);wl(W/2-1.5,5,.3,x2/2+.75,zf,'z',zf,1);
 for(let i=0;i<8;i++)(hw[0].ex=hw[0].ex||[]).push(bx(1.1,1.1,.12,i%2?0x3a2f44:0x2f2638,x1+2+i*2.3,2.6,zb+.25,PL)); // acoustic foam
 {const b=bnr('TYPHIZZLE & WESSCOASTT','#ff3b3b');b.position.set(0,5.9,zb);b.scale.set(9,1.1,1);PL.add(b)}
 // vocal booth with the mic
 bx(5,.05,4,0x222222,x2-3.4,.06,zb+2.6,PL);bx(.1,4,4,0x88aacc,x2-5.9,2,zb+2.6,PL);bx(.06,1.7,.06,0x111111,x2-3.4,.9,zb+2.6,PL);bx(.25,.35,.25,0x999999,x2-3.4,1.9,zb+2.6,PL);bx(.6,.6,.04,0x222222,x2-3.4,1.9,zb+2.3,PL);O.push({k:'smic',n:'the mic',x:x2-3.4,z:zb+4.2});
 // mixing desk, speakers, couch, the table with the vapes and cups
 bx(4.4,1,1.6,0x222222,-3,.5,zb+2.4,PL);bx(4,.06,1.2,0x444444,-3,1.04,zb+2.3,PL);for(let i=0;i<14;i++)bx(.1,.06,.1,[0xff3b3b,0x3bd5ff,0x7bed9f][i%3],-4.8+i*.27,1.09,zb+2.1+(i%2)*.3,PL);bx(1.6,1,.1,0x111111,-3,1.8,zb+1.8,PL);bx(1.4,.8,.12,0x2a6bd8,-3,1.8,zb+1.76,PL);O.push({k:'sdesk',n:'the board',x:-3,z:zb+4});
 [-6.2,.2].forEach(x=>{bx(.9,1.6,.8,0x111111,x,1.5,zb+1.5,PL);bx(.5,.5,.05,0x333333,x,1.7,zb+1.92,PL)});
 bx(5,.7,1.6,0x4a2a5a,-4,.35,z0+4,PL);bx(5,1.1,.4,0x4a2a5a,-4,.9,z0+4.9,PL);bx(2,.5,1,0x111111,-4,.25,z0+2.3,PL);
 [[-4.5,0xd7263d],[-4.1,0x111111],[-3.7,0xff7eb6]].forEach(([x,c])=>{bx(.1,.3,.06,c,x,.66,z0+2.3,PL);bx(.06,.06,.04,0xffffff,x,.84,z0+2.3,PL)});bx(.18,.26,.18,0xffffff,-3.2,.63,z0+2.2,PL);
 // smoke in the air
 const haze=[];for(let i=0;i<14;i++){const m=new T3.Mesh(new T3.SphereGeometry(.6+R()*.9,8,6),new T3.MeshBasicMaterial({color:0xcfcfd8,transparent:true,opacity:.12,depthWrite:false}));m.position.set(-8+R()*16,2+R()*2,z0-6+R()*10);PL.add(m);haze.push(m)}
 const tick=()=>{if(!LR||!LR.studio)return;const t=performance.now()/1000;haze.forEach((m,i)=>{m.position.x+=Math.sin(t*.3+i)*.004;m.position.y+=Math.cos(t*.25+i)*.002});requestAnimationFrame(tick)};requestAnimationFrame(tick);
 // the guys
 [['typhizzle',1.5,z0+.5],['wesscoastt',4,z0-.5]].forEach(([id,x,z])=>{const o=celBy(id),m=celM(o);m.position.set(x,0,z);m.rotation.y=Math.atan2(x,z-zf);PL.add(m);const s=lbl(o.n);s.position.set(0,3.5,0);s.scale.set(3.2,.8,1);m.add(s);O.push({k:'sguy',n:o.n,cid:id,x,z,m})});
 O.push({k:'eexit',n:'Exit',x:0,z:zf-.4});
 const pm=mk3({...DJ(),c1:'#2b2b2b',c2:'#ffffff'},1.2,0,{nm:'',num:''},AP(),1);PL.add(pm);
 LR={p:{x:0,z:zf-2,ry:0},pm,O,all:[...O],walls:[],hw,bd:[x1+.6,x2-.6,zb+.6,zf-.4],field:1,ev:'studio',studio:1,song:song||'rbs',evMet:[],near:null,tg:null,pend:null,joy:null,pd:null};
 const el=$('#lrw');el.innerHTML=`<div class=top><button onclick="evExit()">Leave</button><div id=lrs></div></div><div id=lrj><div id=lrk></div></div><div id=lra></div><div id=lrh>🎤 The studio. TyPhizzle and Wesscoastt are waiting. Hit the mic when you are ready.</div><div id=lrcap></div>`;el.style.display='block';lrPtr();lrStat();save()}
function stAct(o){if(o.k=='eexit'){scn.fog=null;return evExit()}
 if(o.k=='sguy'){const ty=o.cid=='typhizzle',L=ty?['Ayyy the QB in the building! Real Ballaz Swang needs your verse!','Hot Boys still the hardest thing we ever made, no cap.','We left you an open verse. Don\'t waste it 😤','P Giddy remix with the QB? Say less.']:['Sup bro. Booth is ready when you are.','Real Ballaz Swang. Welcome to the team.','Keep it real on the verse and we good.'];
  return talk('mate',o.n,L[ri(0,L.length-1)],'happy',[...(LR.evMet.includes(o.cid)?[]:[['📸 Picture together','stPic(\''+o.cid+'\')']]),['📱 Get his number','celNum(\''+o.cid+'\')'],['Bet','ovHide()']])}
 if(o.k=='sdesk')return talk('mate','The board',(S.songs||[]).length?'Your songs: '+S.songs.slice(-5).map(s=>'"'+esc(s.n)+'" ('+s.st.toLocaleString()+' streams)').join(', '):'No songs yet. Hit the mic.','happy',[['OK','ovHide()']]);
 if(o.k=='smic'){const sg=LR.song,nm={rbs:'"Real Ballaz Swang"',hot:'"Hot Boys" (Remix)',pg:'"P Giddy" (Remix)'}[sg];return talk('mate','TyPhizzle','Your verse on '+nm+' is waiting. Or we can cook something new.','happy',[['🎤 Record your verse on '+nm,'songPick(\''+sg+'\')'],['🆕 Make a new song together','songPick(\'new\')'],['Not yet','ovHide()']])}}
function stPic(id){LR.evMet.push(id);const c=celBy(id);cfOnce(id,'pic',6);picAdd('In the studio with '+c.n);S.pop=cl((S.pop||40)+1,0,100);ovHide();const h=$('#lrh');if(h)h.textContent='📸 Picture with '+c.n+'.';save()}
function songPick(k){if(k=='new'&&!SNG_NM)return askText('Name the new song','Real Ballaz','songNm');talk('mate','Wesscoastt','How you coming on it?','happy',[['😤 Hard','songMake(\''+k+'\',\'hard\')'],['🎶 Melodic','songMake(\''+k+'\',\'melodic\')'],['😂 Funny','songMake(\''+k+'\',\'funny\')']])}
function songMake(k,fl,sim){if((S.songY||'')==wkKey()&&!sim){return talk('mate','TyPhizzle','We already cooked one this week. Come back next week.','happy',[['Bet','ovHide()']])}S.songY=wkKey();let n=k=='rbs'?'Real Ballaz Swang':k=='hot'?'Hot Boys (Remix)':k=='pg'?'P Giddy (Remix)':null;
 if(!n){n=sim?['Lean Back Swang','Ballaz Only','Fourth Quarter','Red Cup Freestyle','Texas Heat'][ri(0,4)]:(SNG_NM||'Real Ballaz').slice(0,30);SNG_NM=null}
 const q=fl=='hard'?.6+R()*.5:fl=='melodic'?.5+R()*.6:.3+R()*.9,st=Math.round(Math.max(1000,myFans()*(2+q*6))*(k=='rbs'?1.8:k=='new'?1:1.4)),pay=Math.round(st*.004),f=Math.round(1+q*4);
 (S.songs=S.songs||[]).push({n,k,st,y:yrN(),with:'TyPhizzle & Wesscoastt'});cfAdd('typhizzle',8);cfAdd('wesscoastt',8);S.cash=(S.cash||0)+pay;S.pop=cl((S.pop||40)+f,0,100);hapAdd(2);
 twAdd({a:'TyPhizzle',h:'typhizzle',v:1,t:'"'+n+'" ft. @'+meH()+' & @wesscoastt OUT NOW 🔥 Real Ballaz Swang'});
 talk('mate','TyPhizzle',q>.9?'BRO. That verse was crazy. This one going up. 🔥🔥':q>.6?'That was hard! We dropping it tonight.':'Hey, it\'s a vibe. Fans gonna love it.','happy',[['🔥','ovHide()'+(sim?';spV()':'')]],'"'+n+'" with TyPhizzle & Wesscoastt: '+st.toLocaleString()+' streams · +$'+pay.toLocaleString()+' · fans +'+f);save()}

var SPV_IN=0;

let SNG_NM=null;function songNm(v){SNG_NM=v||'Real Ballaz';songPick('new')}
