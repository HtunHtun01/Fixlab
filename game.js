import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const $=id=>document.getElementById(id);
const jobs=[
{name:'Alex Morgan',avatar:'👨🏻',device:'iPhone 13',issue:'Screen replacement',part:'screen',pay:180,steps:['Inspect device','Remove damaged screen','Install replacement','Run display test']},
{name:'Mia Chen',avatar:'👩🏻',device:'Galaxy S22',issue:'Battery replacement',part:'battery',pay:120,steps:['Inspect battery health','Open back cover','Replace battery','Check power']},
{name:'Noah Smith',avatar:'🧑🏽',device:'Redmi Note 12',issue:'Charging port repair',part:'port',pay:95,steps:['Check charging port','Remove old port','Install new port','Test charging']},
{name:'Olivia Lee',avatar:'👩🏾',device:'iPhone 12',issue:'Screen replacement',part:'screen',pay:160,steps:['Inspect device','Remove damaged screen','Install replacement','Run display test']}
];
let s={cash:850,level:1,xp:0,rep:10,day:1,customers:0,completed:0,stock:{screen:4,battery:5,port:3},active:null,step:0,upgrade:0,idx:0};
try{Object.assign(s,JSON.parse(localStorage.getItem('fixlab-v3-save'))||{})}catch{}
let waiting=jobs[s.idx++%jobs.length],scene,camera,renderer,shop,drag=false,lastX=0,toastTimer;
const material=(c,r=.7,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
function cube(parent,w,h,d,x,y,z,mat){let o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function person(x,z,skin,shirt){let g=new THREE.Group();g.position.set(x,0,z);shop.add(g);let torso=new THREE.Mesh(new THREE.CapsuleGeometry(.22,.55,4,8),material(shirt));torso.position.y=.62;g.add(torso);let head=new THREE.Mesh(new THREE.SphereGeometry(.23,16,12),material(skin));head.position.y=1.15;g.add(head);let hair=new THREE.Mesh(new THREE.SphereGeometry(.235,16,8,0,Math.PI*2,0,Math.PI*.5),material(0x30292b));hair.position.y=1.24;g.add(hair);return g}
function init(){
 renderer=new THREE.WebGLRenderer({canvas:$('scene'),antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.outputColorSpace=THREE.SRGBColorSpace;
 scene=new THREE.Scene();scene.fog=new THREE.Fog(0x172538,17,40);camera=new THREE.PerspectiveCamera(36,innerWidth/innerHeight,.1,100);camera.position.set(10,11,14);camera.lookAt(0,0,0);
 scene.add(new THREE.HemisphereLight(0xd7efff,0x566077,2));let sun=new THREE.DirectionalLight(0xffe1c0,3);sun.position.set(-6,12,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);scene.add(sun);let glow=new THREE.PointLight(0x4dd8d0,35,18);glow.position.set(4,5,-3);scene.add(glow);
 shop=new THREE.Group();scene.add(shop);let wall=material(0xe2e8eb),floor=material(0x9bafbd),wood=material(0x9a684a),dark=material(0x29394e),teal=material(0x39bfb5);
 cube(shop,12,.35,9,0,-.2,0,floor);cube(shop,12,3,.2,0,1.3,-4.4,wall);cube(shop,.2,3,9,-5.9,1.3,0,wall);
 cube(shop,5,1,.14,0,2.1,-4.27,dark);cube(shop,3.5,.1,.08,0,2.15,-4.16,teal);
 cube(shop,4.4,.35,1.2,0,.45,-1.4,wood);cube(shop,4.5,.1,1.25,0,.68,-1.4,material(0xd9b38b));
 cube(shop,2.6,.28,1.3,2.5,.55,1.4,dark);cube(shop,2.5,.08,1.25,2.5,.72,1.4,material(0x5e748a));cube(shop,.32,.05,.58,2.4,.85,1.3,material(0x111827,.2,.5));
 cube(shop,.35,2.2,.5,-4.8,1,-2.7,dark);for(let i=0;i<4;i++){cube(shop,.65,.08,.7,-4.7,.25+i*.48,-2.4,wood);cube(shop,.25,.27,.28,-4.7,.43+i*.48,-2.4,[teal,material(0x658aff),material(0xf1bf67),material(0xc47caa)][i])}
 let win=new THREE.Mesh(new THREE.BoxGeometry(3.3,2.25,.07),new THREE.MeshStandardMaterial({color:0x7ccbd5,transparent:true,opacity:.35}));win.position.set(-2.4,1.05,4.45);shop.add(win);
 cube(shop,3.2,.04,1.2,0,.01,3.2,material(0x40556c));person(0,3,0xd5a17f,0x4c87a6);person(-1.15,3.45,0xb97958,0x7655a1);
 let ground=new THREE.Mesh(new THREE.PlaneGeometry(200,200),material(0x172538));ground.rotation.x=-Math.PI/2;ground.position.y=-.42;scene.add(ground);
 const c=$('scene');c.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;c.setPointerCapture(e.pointerId)});c.addEventListener('pointermove',e=>{if(drag){shop.rotation.y+=(e.clientX-lastX)*.008;lastX=e.clientX}});c.addEventListener('pointerup',()=>drag=false);c.addEventListener('wheel',e=>{camera.position.multiplyScalar(e.deltaY>0?1.04:.96);camera.position.clampLength(10,23);camera.lookAt(0,0,0)},{passive:true});
 addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()});animate();
}
function animate(){requestAnimationFrame(animate);renderer.render(scene,camera)}
function notify(t){let el=$('toast');el.textContent=t;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2100)}
function save(){localStorage.setItem('fixlab-v3-save',JSON.stringify(s))}
function render(){
 $('cash').textContent='$'+s.cash.toLocaleString();$('level').textContent=s.level;$('rep').textContent='★ '+s.rep;$('dayName').textContent='DAY '+s.day;$('customers').textContent=s.customers+' / 5';$('completed').textContent=s.completed;$('rating').textContent=s.rep<20?'New shop':s.rep<50?'Trusted':'Top rated';$('dayProgress').style.width=(s.customers/5*100)+'%';
 $('stockScreen').textContent=s.stock.screen;$('stockBattery').textContent=s.stock.battery;$('stockPort').textContent=s.stock.port;$('customerAvatar').textContent=waiting.avatar;$('customerName').textContent=waiting.name+' · '+waiting.device;$('customerStatus').textContent=s.active?'CUSTOMER IN SERVICE':'CUSTOMER QUEUE';$('acceptBtn').disabled=!!s.active||s.customers>=5;
 $('upgradeBtn').textContent='Shop upgrade · $'+(500+s.upgrade*350);
 $('workbenchEmpty').hidden=!!s.active;$('workbenchActive').hidden=!s.active;
 if(s.active){$('deviceName').textContent=s.active.device;$('issueName').textContent=s.active.issue;$('repairSteps').innerHTML=s.active.steps.map((v,i)=>`<div class="step ${i<s.step?'done':''}">${i<s.step?'✓':i+1} · ${v}</div>`).join('');$('repairAction').textContent=s.step===0?'Start repair':s.step>=s.active.steps.length?'Complete job':'Next step';$('repairNote').textContent=`Step ${Math.min(s.step+1,s.active.steps.length)} of ${s.active.steps.length}`}
 save();
}
$('acceptBtn').onclick=()=>{if(s.active)return;if(s.customers>=5)return notify('Daily limit reached. End the day.');if(!s.stock[waiting.part])return notify('Out of stock. Restock parts first.');s.stock[waiting.part]--;s.active=waiting;s.step=0;notify('Order accepted!');render()};
$('repairAction').onclick=()=>{if(!s.active)return;if(s.step<s.active.steps.length){s.step++;if(s.step<s.active.steps.length)notify('Step completed.');else notify('All steps done — complete the job.')}else{let j=s.active;s.cash+=j.pay;s.xp+=35;s.rep+=3;s.completed++;s.customers++;if(s.xp>=s.level*100){s.level++;s.xp=0;notify('Level up!')}else notify('Repair complete! +$'+j.pay);s.active=null;waiting=jobs[s.idx++%jobs.length]}render()};
$('restockBtn').onclick=()=>{if(s.cash<120)return notify('Not enough cash.');s.cash-=120;s.stock.screen+=3;s.stock.battery+=3;s.stock.port+=3;notify('Parts restocked.');render()};
$('upgradeBtn').onclick=()=>{let cost=500+s.upgrade*350;if(s.cash<cost)return notify('Not enough cash.');s.cash-=cost;s.upgrade++;s.rep+=5;notify('Shop upgraded!');render()};
$('nextDay').onclick=()=>{if(s.active)return notify('Finish current repair first.');if(!s.customers)return notify('Serve a customer first.');let bonus=s.customers*25+s.rep*2;s.cash+=bonus;s.day++;s.customers=0;waiting=jobs[s.idx++%jobs.length];notify('Day closed! Bonus +$'+bonus);render()};
$('menuBtn').onclick=()=>$('modal').hidden=false;$('closeModal').onclick=()=>$('modal').hidden=true;
$('hire').onclick=()=>{if(s.cash<400)return notify('Not enough cash.');s.cash-=400;s.rep+=2;notify('Assistant hired!');$('modal').hidden=true;render()};
$('reset').onclick=()=>{if(confirm('Reset all FIXLAB progress?')){localStorage.removeItem('fixlab-v3-save');location.reload()}};
init();render();