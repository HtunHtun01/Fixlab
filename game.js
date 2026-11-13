(()=> {
const $=id=>document.getElementById(id);
const PARTS={screen:{name:"Screen module",price:75,emoji:"📱"},battery:{name:"Battery",price:35,emoji:"🔋"},port:{name:"Charging port",price:22,emoji:"🔌"},speaker:{name:"Speaker",price:18,emoji:"🔊"},camera:{name:"Camera module",price:48,emoji:"📷"},tools:{name:"Tool kit",price:90,emoji:"🧰"}};
const JOBS=[
{issue:"Cracked screen",part:"screen",price:155,xp:25,emoji:"📱",steps:["Inspect device","Remove damaged module","Fit replacement module","Run display check"]},
{issue:"Weak battery",part:"battery",price:95,xp:18,emoji:"🔋",steps:["Check battery status","Disconnect old battery","Fit replacement battery","Run power check"]},
{issue:"Not charging",part:"port",price:85,xp:17,emoji:"🔌",steps:["Inspect charging status","Check port assembly","Replace port module","Run charging check"]},
{issue:"No sound",part:"speaker",price:72,xp:15,emoji:"🔊",steps:["Run audio test","Inspect speaker module","Replace speaker module","Run sound check"]},
{issue:"Camera issue",part:"camera",price:120,xp:21,emoji:"📷",steps:["Run camera test","Inspect camera module","Replace camera module","Test camera preview"]}
];
const customers=["Alex","Mia","Noah","Emma","Kai","Liam","Ava","Zin","May","Thura","Hana","Ryan"];
const phones=["Galaxy A54","iPhone 11","Redmi Note 12","Pixel 6a","iPhone 13","Galaxy S21","OPPO Reno 8"];
const fresh=()=>({money:650,rep:1,day:1,income:0,done:0,totalDone:0,xp:0,level:1,orders:[],stock:{screen:2,battery:2,port:1,speaker:1,camera:1,tools:1},visitors:0,customerIndex:0,shopTier:1,staff:0,claimed:false,challengeTarget:2,lang:"en",sound:true,view:0,zoom:1});
let s=load()||fresh(),lang=s.lang||"en",repairId=null,stepsDone=[],toastTimer=null;
function load(){try{return JSON.parse(localStorage.getItem("fixlab-v2-save"))}catch(e){return null}}
function save(){try{localStorage.setItem("fixlab-v2-save",JSON.stringify(s))}catch(e){}}
function cash(n){return "$"+Number(n).toLocaleString("en-US")}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(m){$("toast").textContent=m;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2200)}
function render(){
$("money").textContent=cash(s.money);$("rep").textContent="★ "+s.rep.toFixed(1);$("day").textContent=String(s.day).padStart(2,"0");$("level").textContent=s.level;$("sceneLevel").textContent="Level "+s.level;
$("income").textContent=cash(s.income);$("done").textContent=s.done;$("xpText").textContent=(s.xp%100)+" / 100 XP";$("xpBar").style.width=(s.xp%100)+"%";$("orderCount").textContent=s.orders.length;$("visitorCount").textContent=s.visitors+" customers today";
$("orders").innerHTML=s.orders.length?s.orders.map(o=>`<div class="order"><div class="order-head"><b>${o.emoji} ${esc(o.phone)}</b><span class="counter">#${o.id}</span></div><p>${esc(o.customer)} · ${esc(o.issue)}</p><div class="order-foot"><strong>${cash(o.price)}</strong><button class="mini" data-open="${o.id}">REPAIR</button></div></div>`).join(""):'<div class="empty">📭<br>No repair orders yet.<br>Call your first customer.</div>';
document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openRepair(+b.dataset.open));
$("challengeProgress").textContent=Math.min(s.done,s.challengeTarget)+" / "+s.challengeTarget;$("challengeBar").style.width=Math.min(100,s.done/s.challengeTarget*100)+"%";$("claimChallenge").disabled=s.done<s.challengeTarget||s.claimed;$("claimChallenge").textContent=s.claimed?"Reward claimed":"Claim $100 reward";
$("language").textContent=lang==="en"?"မြန်မာ":"English";$("sound").textContent=s.sound?"🔊":"🔇";
}
function modal(title,kicker,html){$("modalTitle").textContent=title;$("modalKicker").textContent=kicker;$("modalBody").innerHTML=html;$("overlay").classList.remove("hidden")}
function close(){ $("overlay").classList.add("hidden");repairId=null}
function addCustomer(){
if(s.orders.length>=6){toast("Queue full — complete a repair first.");return}
const j=JOBS[Math.floor(Math.random()*JOBS.length)],customer=customers[s.customerIndex++%customers.length],phone=phones[Math.floor(Math.random()*phones.length)];
s.orders.push({id:Date.now()+Math.floor(Math.random()*999),customer,phone,...j});s.visitors++;$("avatar").textContent=["🧑‍💼","👩‍💼","🧑","👩"][Math.floor(Math.random()*4)];save();render();toast(customer+" checked in.");
}
function openRepair(id){
const o=s.orders.find(x=>x.id===id);if(!o)return;repairId=id;stepsDone=[];
const enough=(s.stock[o.part]||0)>0;
modal("Repair workstation","ACTIVE REPAIR",`<div class="job"><span class="emoji">${o.emoji}</span><div><b>${esc(o.phone)} · ${esc(o.customer)}</b><small>${esc(o.issue)} · Required: ${PARTS[o.part].name}</small></div><strong>${cash(o.price)}</strong></div><p class="note">${enough?"Complete each simulated step in order.":"Out of stock: "+PARTS[o.part].name+". Buy the part in inventory first."} This is a simplified game simulation, not a real repair guide.</p><div class="tasks">${o.steps.map((x,i)=>`<button class="task" data-step="${i}"><b>□ ${i+1}. ${x}</b><small>Tap to complete</small></button>`).join("")}</div><button class="primary" id="finish" disabled>Complete repair · ${cash(o.price)}</button>`);
document.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>step(+b.dataset.step,o));$("finish").onclick=()=>finish(id);
}
function step(i,o){
if(!(s.stock[o.part]>0)){toast("Required part is out of stock.");return}
if(i!==stepsDone.length){toast("Complete the steps in order.");return}
stepsDone.push(i);const b=document.querySelector(`[data-step="${i}"]`);b.classList.add("done");b.querySelector("b").textContent="✓ "+(i+1)+". "+o.steps[i];b.querySelector("small").textContent="Completed";
if(stepsDone.length===o.steps.length){$("finish").disabled=false;$("finish").textContent="✓ Complete repair · "+cash(o.price)}
}
function finish(id){
const i=s.orders.findIndex(o=>o.id===id),o=s.orders[i];if(!o||stepsDone.length!==o.steps.length||!s.stock[o.part])return;
s.stock[o.part]--;let bonus=s.shopTier>=2?Math.round(o.price*.05):0;s.money+=o.price+bonus;s.income+=o.price+bonus;s.done++;s.totalDone++;s.xp+=o.xp;s.rep=Math.min(5,+(s.rep+.1).toFixed(1));s.orders.splice(i,1);
const lvl=Math.floor(s.xp/100)+1;if(lvl>s.level){s.level=lvl;toast("LEVEL UP! Shop level "+lvl)}else toast("Repair complete · "+cash(o.price+bonus)+" earned");
save();close();render();
}
function stock(){
modal("Parts inventory","COMPONENTS & SUPPLIES",Object.entries(PARTS).map(([k,p])=>`<div class="row"><div><b>${p.emoji} ${p.name}</b><small>Stock: ${s.stock[k]||0} · ${cash(p.price)} each</small></div><button data-buy="${k}" ${s.money<p.price?"disabled":""}>Buy 1</button></div>`).join("")+'<p class="note">Parts are consumed when a repair is completed. Tool kits are for shop progression only.</p>');
document.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>{let k=b.dataset.buy,p=PARTS[k];if(s.money<p.price)return;s.money-=p.price;s.stock[k]=(s.stock[k]||0)+1;save();render();stock();toast(p.name+" purchased.")});
}
function upgrades(){
const list=[{tier:2,name:"Professional tool set",desc:"Boost repair income by 5%.",cost:350,emoji:"🧰"},{tier:3,name:"Modern shop interior",desc:"Unlock a larger, premium-looking workspace.",cost:700,emoji:"✨"},{tier:4,name:"Second repair station",desc:"Expand your shop and unlock a higher job queue.",cost:1200,emoji:"🛠️"},{tier:5,name:"Premium storefront",desc:"Reach the top shop tier.",cost:2200,emoji:"🏬"}];
modal("Shop upgrades","GROW YOUR BUSINESS",list.map(u=>`<div class="upgrade"><h3>${u.emoji} ${u.name}</h3><p>${u.desc}</p><button data-up="${u.tier}" ${s.shopTier>=u.tier||s.money<u.cost?"disabled":""}>${s.shopTier>=u.tier?"PURCHASED":"Upgrade · "+cash(u.cost)}</button></div>`).join(""));
document.querySelectorAll("[data-up]").forEach(b=>b.onclick=()=>{let u=list.find(x=>x.tier===+b.dataset.up);if(!u||s.money<u.cost||s.shopTier>=u.tier)return;s.money-=u.cost;s.shopTier=u.tier;save();render();upgrades();toast("Shop upgraded!")});
}
function staff(){
modal("Staff room","TEAM MANAGEMENT",`<div class="staff-card"><span>🧑‍🔧</span><div><b>Junior technician</b><small>${s.staff?"Hired · Daily wage $25":"Hire a technician · Daily wage $25"}</small></div><button id="hire" ${s.staff||s.money<180?"disabled":""}>${s.staff?"HIRED":"Hire · $180"}</button></div><p class="note">Staff hiring is a management feature. A hired technician adds a small reputation bonus at the start of each new day.</p>`);
$("hire").onclick=()=>{if(s.staff||s.money<180)return;s.money-=180;s.staff=1;save();render();staff();toast("Technician hired!")};
}
$("newCustomer").onclick=addCustomer;$("ordersBtn").onclick=()=>s.orders.length?openRepair(s.orders[0].id):toast("No active orders. Call a customer first.");
$("scene").addEventListener("click",e=>{if(e.target.closest(".scene-controls"))return;if(s.orders.length)openRepair(s.orders[0].id);else toast("Repair bench ready — call a customer first.")});
$("stockBtn").onclick=stock;$("upgradeBtn").onclick=upgrades;$("staffBtn").onclick=staff;$("close").onclick=close;$("overlay").onclick=e=>{if(e.target===$("overlay"))close()};
$("save").onclick=()=>{save();toast("Game saved on this device.")};
$("language").onclick=()=>{lang=lang==="en"?"mm":"en";s.lang=lang;save();toast(lang==="mm"?"ဘာသာစကားပြောင်းပြီးပါပြီ":"Language changed");};
$("sound").onclick=()=>{s.sound=!s.sound;save();render();toast(s.sound?"Sound enabled":"Sound muted")};
$("reset").onclick=()=>{if(confirm("Reset all FIXLAB V2 game progress on this browser?")){localStorage.removeItem("fixlab-v2-save");s=fresh();lang="en";render();toast("New game started.")}};
$("claimChallenge").onclick=()=>{if(s.done<s.challengeTarget||s.claimed)return;s.money+=100;s.claimed=true;save();render();toast("Daily challenge reward: $100")};
$("rotate").onclick=()=>{s.view=(s.view+1)%4;$("scene").style.filter=["none","hue-rotate(12deg)","hue-rotate(-12deg)","brightness(1.08)"][s.view];toast("View angle changed")};
$("zoomIn").onclick=()=>{s.zoom=Math.min(1.16,s.zoom+.04);$("scene").style.backgroundSize=(s.zoom*100)+"%";$("scene").style.transform="scale("+s.zoom+")";toast("Zoom in")};
$("zoomOut").onclick=()=>{s.zoom=Math.max(.9,s.zoom-.04);$("scene").style.transform="scale("+s.zoom+")";toast("Zoom out")};
$("day").parentElement.title="Double-click to close day after completing all repair orders";
$("day").parentElement.ondblclick=()=>{if(s.orders.length){toast("Complete all orders before closing the day.");return}s.day++;s.income=0;if(s.staff){s.rep=Math.min(5,+(s.rep+.05).toFixed(1));toast("New day! Your technician improved shop reputation.")}else toast("A new business day begins!");save();render()};
render();
})();