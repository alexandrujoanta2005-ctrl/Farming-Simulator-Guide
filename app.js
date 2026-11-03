
const games=[25,22,19,17,15,13,11,2009];

const gameBox=document.querySelector("#games");

games.forEach((g,i)=>{
let d=document.createElement("button");
d.className="game "+(i===0?"active":"");
d.innerHTML=`<strong>Farming<br>Simulator <span style="color:#a4f31c">${g}</span></strong><div class="tractor">🚜</div><small>${i===0?"✓":" "}</small>`;
d.onclick=()=>go("fs"+g);
gameBox.append(d);
});

const pages={
all:["Toate Farming Simulator","Alege ediția preferată",games.map(g=>`<article><b>Farming Simulator ${g}</b><p>Prezentare și informații despre ediție.</p></article>`).join("")],
fs25:["Farming Simulator 25","Ghidul ediției actuale",["Tractoare mici","Tractoare medii","Tractoare mari","Combine","Încărcătoare","Remorci","Culturi","Animale","Ghid de început"].map(x=>`<article onclick="go('machines')"><b>${x} →</b><p>Catalog și informații.</p></article>`).join("")],
machines:["Catalog utilaje","Categorii de utilaje",["Tractoare mici","Tractoare medii","Tractoare mari","Combine","Încărcătoare","Remorci","Semănători","Cultivatoare"].map(x=>`<article><b>🚜 ${x}</b><p>Catalogul utilajelor din joc.</p></article>`).join("")],
crops:["Culturi","Calendar și informații",["Grâu","Orz","Ovăz","Canola","Floarea-soarelui","Porumb","Soia","Struguri"].map(x=>`<article><b>🌿 ${x}</b><p>Semănat, creștere și recoltare.</p></article>`).join("")],
animals:["Animale","Creștere și producție",["Vaci","Oi","Porci","Găini","Cai","Albine"].map(x=>`<article><b>🐄 ${x}</b><p>Hrană, îngrijire și produse.</p></article>`).join("")],
guides:["Ghiduri","Ajutor pentru fermă",["Ghid de început FS25","Cum faci bani rapid","Economie și contracte","Producții","Sfatul zilei"].map(x=>`<article><b>📘 ${x}</b><p>Recomandări pentru ferma ta.</p></article>`).join("")],
info:["Despre GUIDE PRO","Ghid neoficial Farming Simulator","<article><b>Farming Simulator GUIDE PRO</b><p>Proiect independent, neoficial.</p></article>"]
};

function go(id){
if(id==="settings"){openSettings();return}
document.querySelectorAll("[data-go]").forEach(b=>b.classList.toggle("active",b.dataset.go===id));
let home=document.querySelector("#home"),page=document.querySelector("#page");
if(id==="home"){home.hidden=false;page.hidden=true;window.scrollTo(0,0);return}
let p=pages[id]||pages.fs25;
home.hidden=true;page.hidden=false;
page.innerHTML=`<h1>${p[0]}</h1><p style="color:#a9bbaa">${p[1]}</p><div class="itemlist">${p[2]}</div><button class="cta" onclick="go('home')" style="margin-top:20px">← Înapoi acasă</button>`;
window.scrollTo(0,0);
}

/* NAVIGARE */
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));

/* SETARI */
const prefKey="fs-guide-pro-settings";
const defaults={language:"ro",theme:"dark",contrast:false,animations:true,vibration:false};
function getPrefs(){
try{return {...defaults,...JSON.parse(localStorage.getItem(prefKey)||"{}")}}
catch{return {...defaults}}
}
function savePrefs(p){
localStorage.setItem(prefKey,JSON.stringify(p));
applyPrefs(p);
}
function applyPrefs(p=getPrefs()){
document.documentElement.lang=p.language;
document.body.classList.toggle("light-mode",p.theme==="light");
document.body.classList.toggle("high-contrast",!!p.contrast);
document.body.classList.toggle("no-animations",!p.animations);
}

function openSettings(){
const modal=document.querySelector("#settingsModal");
const content=document.querySelector("#settingsContent");
const p=getPrefs();

content.innerHTML=`
<div class="setting-row"><div><strong>🌐 Limbă</strong><small>Language / Sprache / Langue</small></div><select id="prefLanguage"><option value="ro">Română</option><option value="en">English</option><option value="de">Deutsch</option><option value="fr">Français</option><option value="it">Italiano</option><option value="es">Español</option></select></div>
<div class="setting-row"><div><strong>🎨 Temă</strong><small>Aspectul aplicației</small></div><select id="prefTheme"><option value="dark">Întunecată</option><option value="light">Luminoasă</option></select></div>
<div class="setting-row"><div><strong>♿ Contrast ridicat</strong><small>Accesibilitate vizuală</small></div><input id="prefContrast" type="checkbox"></div>
<div class="setting-row"><div><strong>✨ Animații</strong><small>Tranziții și efecte</small></div><input id="prefAnimations" type="checkbox"></div>
<div class="setting-row"><div><strong>📳 Vibrații</strong><small>Feedback tactil compatibil</small></div><input id="prefVibration" type="checkbox"></div>
<div class="setting-row"><div><strong>🔔 Notificări</strong><small>Permisiuni browser</small></div><button id="enableNotifications">Activează</button></div>
<div class="setting-row"><div><strong>📲 Instalare aplicație</strong><small>Adaugă pe ecranul principal</small></div><button id="installHelp">Instrucțiuni</button></div>
<div class="settings-actions"><button class="settings-action" id="resetPrefs">Resetare</button><button class="settings-action" id="aboutApp">Despre</button></div>`;

document.querySelector("#prefLanguage").value=p.language;
document.querySelector("#prefTheme").value=p.theme;
document.querySelector("#prefContrast").checked=p.contrast;
document.querySelector("#prefAnimations").checked=p.animations;
document.querySelector("#prefVibration").checked=p.vibration;

const update=()=>savePrefs({
language:document.querySelector("#prefLanguage").value,
theme:document.querySelector("#prefTheme").value,
contrast:document.querySelector("#prefContrast").checked,
animations:document.querySelector("#prefAnimations").checked,
vibration:document.querySelector("#prefVibration").checked
});

["prefLanguage","prefTheme","prefContrast","prefAnimations","prefVibration"].forEach(id=>{
document.querySelector("#"+id).addEventListener("change",update);
});

document.querySelector("#enableNotifications").onclick=async()=>{
if(!("Notification"in window)){alert("Notificările nu sunt suportate.");return}
let result=await Notification.requestPermission();
alert(result==="granted"?"Notificările au fost permise.":"Permisiune: "+result);
};

document.querySelector("#installHelp").onclick=()=>{
alert(/iPhone|iPad/i.test(navigator.userAgent)
?"Safari → Partajare → Adaugă la ecranul principal."
:"Folosește opțiunea Instalează aplicația din meniul browserului.");
};

document.querySelector("#resetPrefs").onclick=()=>{
localStorage.removeItem(prefKey);
applyPrefs();
openSettings();
};

document.querySelector("#aboutApp").onclick=()=>{
alert("Farming Simulator GUIDE PRO\\nGhid neoficial pentru comunitate.");
};

modal.hidden=false;
}

function closeSettings(){
document.querySelector("#settingsModal").hidden=true;
}
document.querySelector("#settingsClose").addEventListener("click",closeSettings);
document.querySelector("#settingsModal").addEventListener("click",e=>{
if(e.target.id==="settingsModal")closeSettings();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSettings()});
document.querySelectorAll("[data-action=notifications]").forEach(b=>b.addEventListener("click",openSettings));

document.addEventListener("click",e=>{
if(getPrefs().vibration&&navigator.vibrate&&e.target.closest("button"))navigator.vibrate(25);
});

applyPrefs();

if("serviceWorker"in navigator)
window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
