
const games = [25, 22, 19, 17, 15, 13, 11, 2009];

const gameBox = document.querySelector("#games");

function renderGames() {
  gameBox.innerHTML = "";

  games.forEach((g, i) => {
    const d = document.createElement("button");
    d.className = "game " + (i === 0 ? "active" : "");
    d.innerHTML = `
      <strong>Farming<br>Simulator
      <span style="color:#a4f31c">${g}</span></strong>
      <div class="tractor">🚜</div>
      <small>${i === 0 ? "✓" : ""}</small>
    `;
    d.onclick = () => go("fs" + g);
    gameBox.append(d);
  });
}

const pages = {
  all: ["allTitle", "choose", games.map(g =>
    `<article><b>Farming Simulator ${g}</b><p>${tr("editionInfo")}</p></article>`
  ).join("")],

  fs25: ["fs25", "currentGuide", [
    "smallTractors", "mediumTractors", "largeTractors",
    "combines", "loaders", "trailers", "crops", "animals", "beginner"
  ].map(x => `<article onclick="go('machines')"><b>${tr(x)} →</b><p>${tr("catalogInfo")}</p></article>`).join("")],

  machines: ["catalog", "catalogDesc", [
    "smallTractors", "mediumTractors", "largeTractors",
    "combines", "loaders", "trailers", "seeders", "cultivators"
  ].map(x => `<article><b>🚜 ${tr(x)}</b><p>${tr("machineInfo")}</p></article>`).join("")],

  crops: ["cropsTitle", "cropsDesc", [
    "wheat", "barley", "oats", "canola", "sunflower", "corn", "soy", "grapes"
  ].map(x => `<article><b>🌿 ${tr(x)}</b><p>${tr("cropInfo")}</p></article>`).join("")],

  animals: ["animalsTitle", "animalsDesc", [
    "cows", "sheep", "pigs", "chickens", "horses", "bees"
  ].map(x => `<article><b>🐄 ${tr(x)}</b><p>${tr("animalInfo")}</p></article>`).join("")],

  guides: ["guidesTitle", "guidesDesc", [
    "beginner", "money", "economy", "productions", "tip"
  ].map(x => `<article><b>📘 ${tr(x)}</b><p>${tr("guideInfo")}</p></article>`).join("")],

  info: ["infoTitle", "unofficial",
    `<article><b>Farming Simulator GUIDE PRO</b><p>${tr("independent")}</p></article>`]
};

function go(id) {
  if (id === "settings") {
    openSettings();
    return;
  }

  document.querySelectorAll("[data-go]").forEach(b =>
    b.classList.toggle("active", b.dataset.go === id)
  );

  const home = document.querySelector("#home");
  const page = document.querySelector("#page");

  if (id === "home") {
    home.hidden = false;
    page.hidden = true;
    window.scrollTo(0, 0);
    return;
  }

  const p = pages[id] || pages.fs25;
  home.hidden = true;
  page.hidden = false;

  page.innerHTML = `
    <h1>${tr(p[0])}</h1>
    <p style="color:#a9bbaa">${tr(p[1])}</p>
    <div class="itemlist">${p[2]}</div>
    <button class="cta" onclick="go('home')" style="margin-top:20px">
      ${tr("back")}
    </button>
  `;

  window.scrollTo(0, 0);
}

/* NAVIGARE */
document.querySelectorAll("[data-go]").forEach(b =>
  b.addEventListener("click", () => go(b.dataset.go))
);

/* SETARI */
const prefKey = "fs-guide-pro-settings";
const defaults = {
  language: "ro",
  theme: "dark",
  contrast: false,
  animations: true,
  vibration: false
};

function getPrefs() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(prefKey) || "{}") };
  } catch {
    return { ...defaults };
  }
}

function savePrefs(p) {
  localStorage.setItem(prefKey, JSON.stringify(p));
  applyPrefs(p);
}

function applyPrefs(p = getPrefs()) {
  document.documentElement.lang = p.language;
  document.body.classList.toggle("light-mode", p.theme === "light");
  document.body.classList.toggle("high-contrast", !!p.contrast);
  document.body.classList.toggle("no-animations", !p.animations);
}

function openSettings() {
  const modal = document.querySelector("#settingsModal");
  const content = document.querySelector("#settingsContent");
  const p = getPrefs();

  content.innerHTML = `
    <div class="setting-row">
      <div><strong>🌐 ${tr("language")}</strong><small>Language / Sprache / Langue</small></div>
      <select id="prefLanguage">
        <option value="ro">🇷🇴 Română</option>
        <option value="en">🇬🇧 English</option>
        <option value="de">🇩🇪 Deutsch</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="it">🇮🇹 Italiano</option>
        <option value="es">🇪🇸 Español</option>
        <option value="pl">🇵🇱 Polski</option>
      </select>
    </div>

    <div class="setting-row">
      <div><strong>🎨 ${tr("theme")}</strong><small>${tr("description")}</small></div>
      <select id="prefTheme">
        <option value="dark">${tr("dark")}</option>
        <option value="light">${tr("light")}</option>
      </select>
    </div>

    <div class="setting-row">
      <div><strong>♿ ${tr("contrast")}</strong><small>${tr("contrastDesc")}</small></div>
      <input id="prefContrast" type="checkbox">
    </div>

    <div class="setting-row">
      <div><strong>✨ ${tr("animations")}</strong><small>${tr("animationsDesc")}</small></div>
      <input id="prefAnimations" type="checkbox">
    </div>

    <div class="setting-row">
      <div><strong>📳 ${tr("vibration")}</strong><small>${tr("vibrationDesc")}</small></div>
      <input id="prefVibration" type="checkbox">
    </div>

    <div class="setting-row">
      <div><strong>🔔 ${tr("notifications")}</strong><small>${tr("notificationsDesc")}</small></div>
      <button id="enableNotifications">${tr("activate")}</button>
    </div>

    <div class="setting-row">
      <div><strong>📲 ${tr("install")}</strong><small>${tr("installDesc")}</small></div>
      <button id="installHelp">${tr("instructions")}</button>
    </div>

    <div class="settings-actions">
      <button class="settings-action" id="resetPrefs">${tr("reset")}</button>
      <button class="settings-action" id="aboutApp">${tr("about")}</button>
    </div>
  `;

  document.querySelector("#prefLanguage").value = p.language;
  document.querySelector("#prefTheme").value = p.theme;
  document.querySelector("#prefContrast").checked = p.contrast;
  document.querySelector("#prefAnimations").checked = p.animations;
  document.querySelector("#prefVibration").checked = p.vibration;

  const update = () => {
    savePrefs({
      language: document.querySelector("#prefLanguage").value,
      theme: document.querySelector("#prefTheme").value,
      contrast: document.querySelector("#prefContrast").checked,
      animations: document.querySelector("#prefAnimations").checked,
      vibration: document.querySelector("#prefVibration").checked
    });
    renderApp();
    openSettings();
  };

  ["prefLanguage", "prefTheme", "prefContrast", "prefAnimations", "prefVibration"]
    .forEach(id => {
      document.querySelector("#" + id).addEventListener("change", update);
    });

  document.querySelector("#enableNotifications").onclick = async () => {
    if (!("Notification" in window)) {
      alert(tr("notificationsUnsupported"));
      return;
    }
    const result = await Notification.requestPermission();
    alert(result === "granted" ? tr("allowed") : tr("permission") + result);
  };

  document.querySelector("#installHelp").onclick = () => {
    alert(/iPhone|iPad/i.test(navigator.userAgent)
      ? tr("installIOS")
      : tr("installOther"));
  };

  document.querySelector("#resetPrefs").onclick = () => {
    if (!confirm(tr("resetConfirm"))) return;
    localStorage.removeItem(prefKey);
    applyPrefs();
    renderApp();
    openSettings();
  };

  document.querySelector("#aboutApp").onclick = () => alert(tr("aboutText"));

  modal.hidden = false;
}

function closeSettings() {
  document.querySelector("#settingsModal").hidden = true;
}

document.querySelector("#settingsClose").addEventListener("click", closeSettings);

document.querySelector("#settingsModal").addEventListener("click", e => {
  if (e.target.id === "settingsModal") closeSettings();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeSettings();
});

document.querySelectorAll("[data-action=notifications]").forEach(b =>
  b.addEventListener("click", openSettings)
);

document.addEventListener("click", e => {
  if (getPrefs().vibration && navigator.vibrate && e.target.closest("button")) {
    navigator.vibrate(25);
  }
});

/* TRADUCERE INTERFATA */
function renderApp() {
  document.querySelectorAll("[data-go]").forEach(btn => {
    const id = btn.dataset.go;
    const key = id === "all" ? "all" : id;
    const span = btn.querySelector("span");

    if (span) {
      span.nextSibling.textContent = tr(key);
    } else if (btn.closest(".quick")) {
      const icons = {
        home: "⌂ ", all: "▱ ", fs25: "🎮 ",
        machines: "🚜 ", crops: "🌿 ", animals: "🐄 ", info: "ⓘ "
      };
      btn.textContent = (icons[id] || "") + tr(key);
    }
  });

  const hero = document.querySelector(".hero-copy");
  if (hero) {
    hero.querySelector(".pill").textContent = "NEW";
    hero.querySelector("p").textContent = tr("description");
    hero.querySelector(".cta").textContent = tr("enter");
  }

  const heads = document.querySelectorAll(".section-head h2");
  const headKeys = ["all", "categories", "popular", "news"];
  heads.forEach((h, i) => {
    if (headKeys[i]) h.textContent = tr(headKeys[i]);
  });

  document.querySelectorAll(".section-head button").forEach(b => {
    b.textContent = tr("viewAll");
  });

  renderGames();

  if (!document.querySelector("#page").hidden) {
    const active = [...document.querySelectorAll("[data-go].active")][0];
    if (active) go(active.dataset.go);
  }
}

applyPrefs();
renderGames();
renderApp();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("./sw.js")
  );
}
