"use strict";

const STORAGE_KEY = "medintern.dashboard.v2";
const DEFAULT_TOOLS = [
  { id:"dictaphone", name:"Dictaphone", description:"Dictée médicale", url:"https://thofrin.github.io/Dicto/", icon:"mic", color:"blue", fixed:true },
  { id:"pnds", name:"PNDS", description:"Référentiels de prise en charge", url:"https://public.tableau.com/app/profile/has8400/viz/tableau_des_pnds_drive/TableaudesPNDS", icon:"file", color:"teal", fixed:true },
  { id:"cours", name:"COURS", description:"Fiches de cours", url:"https://drive.google.com/drive/folders/10kIPPDI5DUglkec1WcC_1BhCf4qIBUJh?usp=drive_link", icon:"book", color:"violet", fixed:true },
  { id:"internist", name:"Internist Academy", description:"Cours et révisions", url:"https://drive.google.com/drive/folders/1_lUtrX2aQZzChGwxJlvMbWGznStSEm2D?usp=drive_link", icon:"graduation", color:"orange", fixed:true },
  { id:"medicalcul", name:"Medicalcul", description:"Calculateurs médicaux", url:"https://www.medicalcul.com/", icon:"calculator", color:"cyan", fixed:true },
  { id:"vidal", name:"VIDAL", description:"Médicaments et prescriptions", url:"https://www.vidal.fr/", icon:"chevron", color:"red", fixed:true },
  { id:"lifen", name:"LIFEN", description:"Échanges et documents de santé", url:"https://www.lifen.fr/", icon:"heart", color:"indigo", fixed:true },
  { id:"mail1-chu", name:"Mail CHU", description:"Messagerie professionnelle", url:"https://webmail.chu-nice.fr", icon:"mail", color:"blue", fixed:true },
  { id:"biologie", name:"Biologie", description:"Biologie et pathologie", url:"https://biologie-pathologie.chu-nice.fr", icon:"flask", color:"teal", fixed:true },
  { id:"pacs-ght", name:"PACS GHT", description:"Imagerie médicale", url:"https://xero.chu-nice.fr/?theme=fusionXERO", icon:"xray", color:"violet", fixed:true },
  { id: "recharger-carte-self", name: "Recharger Carte de Self", description: "Rechargement de la carte de restauration", url: "https://www.popandpay.com/", icon: "credit-card", color: "blue", fixed: true },
  { id: "terminal-urgences", name: "Terminal des Urgences", description: "Terminal des urgences du CHU", url: "https://terminal.chu-nice.fr", icon: "activity", color: "teal", fixed: true },
  { id: "pdf", name: "PDF", description: "Outils de gestion des PDF", url: "https://www.ilovepdf.com/fr", icon: "file-text", color: "violet", fixed: true },
  { id: "bloc-notes", name: "Bloc notes", description: "Prise de notes", url: "https://notepad-online.com/v2/fr", icon: "notebook", color: "blue", fixed: true },
];

const ICONS = {
  mic: { label:"Microphone", svg:'<rect x="9" y="3" width="6" height="12" rx="3"></rect><path d="M5 11v1a7 7 0 0 0 14 0v-1M12 19v3m-4 0h8"></path>' },
  file: { label:"Document", svg:'<path d="M6 3h9l4 4v14H6z"></path><path d="M14 3v5h5M9 12h7M9 16h7"></path>' },
  book: { label:"Livre", svg:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"></path><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h7M8 10h7"></path>' },
  graduation: { label:"Formation", svg:'<path d="m3 9 9-5 9 5-9 5z"></path><path d="M7 12v5c3 2 7 2 10 0v-5M21 9v6"></path>' },
  calculator: { label:"Calculatrice", svg:'<rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2M8 18h2m4 0h2"></path>' },
  chevron: { label:"VIDAL", svg:'<path d="M4 5h16v14H4z"></path><path d="m8 9 4 6 4-6"></path>' },
  heart: { label:"Santé", svg:'<path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z"></path><path d="M8 12h8m-4-4v8"></path>' },
  stethoscope: { label:"Stéthoscope", svg:'<path d="M6 4v5a4 4 0 0 0 8 0V4M4 4h4m4 0h4M10 13v2a5 5 0 0 0 10 0v-1"></path><circle cx="20" cy="12" r="2"></circle>' },
  clipboard: { label:"Dossier", svg:'<rect x="5" y="5" width="14" height="16" rx="2"></rect><path d="M9 5V3h6v2M8 10h8M8 14h8M8 18h5"></path>' },
  pill: { label:"Médicament", svg:'<path d="m5 19 14-14a4.2 4.2 0 0 1 0 6L11 19a4.2 4.2 0 0 1-6-6l3-3"></path><path d="m8 10 6 6"></path>' },
  calendar: { label:"Calendrier", svg:'<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4M8 3v4M3 10h18M8 14h2m4 0h2m-8 3h2"></path>' },
  chart: { label:"Graphique", svg:'<path d="M4 20V4M4 20h17"></path><path d="m7 15 4-5 3 2 5-7"></path>' },
  search: { label:"Recherche", svg:'<circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m16 16 4 4"></path>' },
  flask: { label:"Laboratoire", svg:'<path d="M9 3h6M10 3v7l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3M8 16h8"></path>' },
  link: { label:"Lien", svg:'<path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"></path><path d="M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1"></path>' },
  mail: { label: "Messagerie", svg: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path>'},
  xray: { label: "Radiographie thoracique", svg: '<rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M12 6v4m0 0-2 2m2-2 2 2"></path><path d="M10 10c-2-1-4 1-4 4s1 5 3 5 3-2 3-5m1-4c2-1 4 1 4 4s-1 5-3 5-3-2-3-5"></path><path d="M7 12h3m-4 3h4m4-3h3m-3 3h4"></path>' },
  creditcard: { label: "Carte bancaire", svg: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path><path d="M7 15h4"></path>' },
  activity: { label: "Activité médicale", svg: '<path d="M3 12h4l3-7 4 14 3-7h4"></path>' },
  filetext: { label: "Document PDF", svg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6M8 13h8M8 17h8"></path>' },
  notebook: { label: "Bloc notes", svg: '<rect x="5" y="3" width="15" height="18" rx="2"></rect><path d="M9 3v18M12 8h5M12 12h5M12 16h5"></path>' }, 
}

const COLORS = ["blue","teal","violet","orange","cyan","red","indigo"];
const toolGrid = document.querySelector(".tool-grid");
const toolCount = document.getElementById("toolCount");
const settingsDialog = document.getElementById("settingsDialog");
const settingsButton = document.getElementById("settingsButton");
const settingsForm = document.getElementById("settingsForm");
const settingsToolList = document.getElementById("settingsToolList");
const iconPicker = document.getElementById("iconPicker");
const newToolName = document.getElementById("newToolName");
const newToolUrl = document.getElementById("newToolUrl");
const addToolStatus = document.getElementById("addToolStatus");
const saveStatus = document.getElementById("saveStatus");
let selectedIcon = "stethoscope";

function safeId() {
  return "custom-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2,7);
}
function loadTools() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(saved) && saved.length) {
      // Merge fixed tools with current saved settings so built-in tools remain available.
      const custom = saved.filter(t => t && t.fixed !== true && typeof t.id === "string");
      const savedFixed = new Map(saved.filter(t => t && t.fixed === true).map(t => [t.id,t]));
      const fixed = DEFAULT_TOOLS.map(t => ({...t, ...(savedFixed.get(t.id) || {})}));
      return [...fixed, ...custom];
    }
  } catch (error) { console.warn("Paramètres locaux illisibles.", error); }
  return DEFAULT_TOOLS.map(t => ({...t}));
}
let tools = loadTools();

function iconMarkup(icon) {
  const item = ICONS[icon] || ICONS.link;
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${item.svg}</svg>`;
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function saveTools() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
    return true;
  } catch (error) {
    console.error("Impossible de sauvegarder les outils.", error);
    saveStatus.textContent = "Enregistrement local impossible dans ce navigateur.";
    return false;
  }
}
function renderCards() {
  toolGrid.innerHTML = "";
  tools.forEach((tool) => {
    const card = document.createElement("a");
    card.className = "tool-card";
    card.dataset.tool = tool.id;
    card.href = tool.url || "#";
    card.innerHTML = `
      <span class="tool-icon icon-${COLORS.includes(tool.color) ? tool.color : "blue"}">${iconMarkup(tool.icon)}</span>
      <span class="tool-name">${escapeHtml(tool.name)}</span>
      <span class="tool-desc">${escapeHtml(tool.description || (tool.fixed ? "Outil médical" : "Outil personnel"))}</span>
      <span class="card-arrow" aria-hidden="true">↗</span>`;
    if (tool.url && /^https?:\/\//i.test(tool.url)) {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }
    card.addEventListener("click", (event) => {
      const latest = tools.find(item => item.id === tool.id);
      if (!latest || !latest.url) {
        event.preventDefault();
        openSettings();
        addToolStatus.textContent = `Ajoutez une destination pour « ${tool.name} ».`;
      }
    });
    toolGrid.appendChild(card);
  });
  toolCount.textContent = `${tools.length} outil${tools.length > 1 ? "s" : ""}`;
}
function renderSettingsList() {
  settingsToolList.innerHTML = "";
  tools.forEach((tool) => {
    const row = document.createElement("div");
    row.className = "settings-tool-row";
    row.innerHTML = `
      <span class="mini-tool-icon icon-${COLORS.includes(tool.color) ? tool.color : "blue"}">${iconMarkup(tool.icon)}</span>
      <div class="settings-tool-fields">
        <label class="sr-only" for="name-${escapeHtml(tool.id)}">Nom de ${escapeHtml(tool.name)}</label>
        <input id="name-${escapeHtml(tool.id)}" class="edit-tool-name" type="text" maxlength="32" value="${escapeHtml(tool.name)}" aria-label="Nom de l’outil">
        <label class="sr-only" for="url-${escapeHtml(tool.id)}">URL de ${escapeHtml(tool.name)}</label>
        <input id="url-${escapeHtml(tool.id)}" class="edit-tool-url" type="url" value="${escapeHtml(tool.url || "")}" placeholder="https://…" aria-label="Destination de l’outil">
      </div>
      ${tool.fixed ? '<span class="fixed-label">Principal</span>' : `<button type="button" class="remove-tool-button" data-remove="${escapeHtml(tool.id)}" aria-label="Supprimer ${escapeHtml(tool.name)}" title="Supprimer cet outil">×</button>`}`;
    settingsToolList.appendChild(row);
  });
  settingsToolList.querySelectorAll(".settings-tool-row").forEach((row, index) => {
    const tool = tools[index];
    row.querySelector(".edit-tool-name").addEventListener("change", e => { tool.name = e.target.value.trim() || tool.name; });
    row.querySelector(".edit-tool-url").addEventListener("change", e => { tool.url = e.target.value.trim(); });
  });
  settingsToolList.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      const target = tools.find(t => t.id === button.dataset.remove);
      if (!target || target.fixed) return;
      tools = tools.filter(t => t.id !== target.id);
      renderSettingsList();
      renderCards();
      saveTools();
    });
  });
}
function renderIconPicker() {
  iconPicker.innerHTML = "";
  Object.entries(ICONS).forEach(([key, item]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "icon-choice" + (key === selectedIcon ? " selected" : "");
    button.dataset.icon = key;
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(key === selectedIcon));
    button.setAttribute("aria-label", item.label);
    button.title = item.label;
    button.innerHTML = iconMarkup(key);
    button.addEventListener("click", () => {
      selectedIcon = key;
      iconPicker.querySelectorAll(".icon-choice").forEach(choice => {
        const active = choice.dataset.icon === key;
        choice.classList.toggle("selected", active);
        choice.setAttribute("aria-checked", String(active));
      });
    });
    iconPicker.appendChild(button);
  });
}
function isValidHttpUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch { return false; }
}
function openSettings() {
  renderSettingsList();
  renderIconPicker();
  newToolName.value = "";
  newToolUrl.value = "";
  addToolStatus.textContent = "";
  saveStatus.textContent = "";
  if (!settingsDialog.open) settingsDialog.showModal();
}
settingsButton.addEventListener("click", openSettings);

document.getElementById("addToolButton").addEventListener("click", () => {
  const name = newToolName.value.trim();
  const url = newToolUrl.value.trim();
  if (!name) {
    newToolName.setCustomValidity("Saisissez un nom pour cet outil.");
    newToolName.reportValidity();
    newToolName.addEventListener("input", () => newToolName.setCustomValidity(""), {once:true});
    return;
  }
  if (!isValidHttpUrl(url)) {
    newToolUrl.setCustomValidity("Saisissez une URL commençant par http:// ou https://.");
    newToolUrl.reportValidity();
    newToolUrl.addEventListener("input", () => newToolUrl.setCustomValidity(""), {once:true});
    return;
  }
  const color = COLORS[(tools.filter(t => !t.fixed).length) % COLORS.length];
  tools.push({id:safeId(), name, description:"Outil personnel", url, icon:selectedIcon, color, fixed:false});
  renderSettingsList();
  renderCards();
  saveTools();
  newToolName.value = "";
  newToolUrl.value = "";
  addToolStatus.textContent = `« ${name} » a été ajouté.`;
});

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const rows = [...settingsToolList.querySelectorAll(".settings-tool-row")];
  for (const row of rows) {
    const tool = tools.find(t => t.id === row.querySelector(".edit-tool-name").id.slice(5));
    if (!tool) continue;
    const nameInput = row.querySelector(".edit-tool-name");
    const urlInput = row.querySelector(".edit-tool-url");
    const url = urlInput.value.trim();
    if (!nameInput.value.trim()) {
      nameInput.setCustomValidity("Le nom ne peut pas être vide.");
      nameInput.reportValidity();
      nameInput.addEventListener("input", () => nameInput.setCustomValidity(""), {once:true});
      return;
    }
    if (!isValidHttpUrl(url)) {
      urlInput.setCustomValidity("Saisissez une URL complète commençant par http:// ou https://.");
      urlInput.reportValidity();
      urlInput.addEventListener("input", () => urlInput.setCustomValidity(""), {once:true});
      return;
    }
    tool.name = nameInput.value.trim();
    tool.url = url;
  }
  if (saveTools()) {
    renderCards();
    settingsDialog.close();
  }
});

document.getElementById("resetSettings").addEventListener("click", () => {
  if (!confirm("Réinitialiser les outils et supprimer les outils personnalisés ?")) return;
  tools = DEFAULT_TOOLS.map(t => ({...t}));
  renderSettingsList();
  renderCards();
  saveTools();
  saveStatus.textContent = "Les outils par défaut ont été rétablis.";
});

document.getElementById("year").textContent = new Date().getFullYear();
renderCards();
