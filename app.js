const games=[25,22,19,17,15,13,11,2009];
const gameBox=document.querySelector("#games");
games.forEach((g,i)=>{let d=document.createElement("button");d.className="game "+(i===0?"active":"");d.innerHTML=`<strong>Farming<br>Simulator <span style="color:#a4f31c">${g}</span></strong><div class="tractor">🚜</div><small>${i===0?"✓":" "}</small>`;d.onclick=()=>go("fs"+g);gameBox.append(d)});
const pages={
 all:["Toate Farming Simulator","Alege ediția preferată",games.map(g=>`<article><b>Farming Simulator ${g}</b><p>Prezentare și informații despre ediție.</p></article>`).join("")],
 fs25:["Farming Simulator 25","Ghidul ediției actuale",["Tractoare mici","Tractoare medii","Tractoare mari","Combine","Încărcătoare","Remorci","Culturi","Animale","Ghid de început"].map(x=>`<article onclick="go('machines')"><b>${x} →</b><p>Catalog, informații și specificații.</p></article>`).join("")],
 machines:["Catalog utilaje","Categorii de utilaje",["Tractoare mici","Tractoare medii","Tractoare mari","Combine","Încărcătoare","Remorci","Semănători","Cultivatoare"].map(x=>`<article><b>🚜 ${x}</b><p>Catalogul utilajelor din joc.</p></article>`).join("")],
 crops:["Culturi","Calendar și informații",["Grâu","Orz","Ovăz","Canola","Floarea-soarelui","Porumb","Soia","Struguri"].map(x=>`<article><b>🌿 ${x}</b><p>Semănat, creștere și recoltare.</p></article>`).join("")],
 animals:["Animale","Creștere și producție",["Vaci","Oi","Porci","Găini","Cai","Albine"].map(x=>`<article><b>🐄 ${x}</b><p>Hrană, îngrijire și produse.</p></article>`).join("")],
 guides:["Ghiduri","Ajutor pentru fermă",["Ghid de început FS25","Cum faci bani rapid","Economie și contracte","Producții","Sfatul zilei"].map(x=>`<article><b>📘 ${x}</b><p>Recomandări pentru ferma ta.</p></article>`).join("")],
 info:["Despre GUIDE PRO","Ghid neoficial Farming Simulator","<article><b>Farming Simulator GUIDE PRO</b><p>Proiect independent, neoficial, realizat pentru comunitate.</p></article>"],
 settings:["Setări","Preferințe aplicație","<article><b>Farming Simulator GUIDE PRO</b><p>PWA optimizată pentru iPhone.</p></article>"]
};
function go(id){document.querySelectorAll("[data-go]").forEach(b=>b.classList.toggle("active",b.dataset.go===id));let home=document.querySelector("#home"),page=document.querySelector("#page");if(id==="home"){home.hidden=false;page.hidden=true;window.scrollTo(0,0);return}let p=pages[id]||pages.fs25;home.hidden=true;page.hidden=false;page.innerHTML=`<h1>${p[0]}</h1><p style="color:#a9bbaa">${p[1]}</p><div class="itemlist">${p[2]}</div><button class="cta" onclick="go('home')" style="margin-top:20px">← Înapoi acasă</button>`;window.scrollTo(0,0)}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
