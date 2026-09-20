/* ASTD Comp — shareable tier-list builder */
const TL_LANG = window.SITE_LANG === "en" ? "en" : "th";
const TL_TIERS = ["Z+", "Z", "S", "A", "B", "C", "D"];
const TL_MODES = [
  {id:"tournament", th:"Tournament", en:"Tournament"},
  {id:"infinite", th:"Infinite Leaderboard", en:"Infinite Leaderboard"},
  {id:"raid", th:"Raid", en:"Raid"},
  {id:"story", th:"Story / Tower", en:"Story / Tower"},
];
const TL_TEXT = TL_LANG === "en" ? {
  select:"Selected", selectHelp:"Now click a tier row, or drag the card.",
  idle:"Click a card to select it, or drag it into a tier.",
  units:n=>`${n} units`, assigned:(a,n)=>`${a} of ${n} ranked`, reason:"Reason added",
  saved:"Share URL copied", copyFail:"URL saved in the address bar — copy it from there",
  loaded:"Shared Tier List loaded", cleared:"This mode was cleared",
  confirm:"Clear every ranked unit and reason in this mode?",
} : {
  select:"เลือกแล้ว", selectHelp:"คลิกแถว Tier ที่ต้องการ หรือลากการ์ดไปวางได้เลย",
  idle:"คลิกการ์ดเพื่อเลือก หรือใช้เมาส์ลากไปยัง Tier",
  units:n=>`${n} ตัวละคร`, assigned:(a,n)=>`จัดแล้ว ${a} จาก ${n} ตัว`, reason:"มีเหตุผล",
  saved:"คัดลอก URL สำหรับแชร์แล้ว", copyFail:"บันทึก URL ไว้บนแถบที่อยู่แล้ว — คัดลอกจากตรงนั้นได้เลย",
  loaded:"เปิด Tier List จาก URL แล้ว", cleared:"ล้างข้อมูลหมวดนี้แล้ว",
  confirm:"ต้องการล้างตัวละครและเหตุผลทั้งหมดในหมวดนี้หรือไม่?",
};

const TL_UNITS = UNITS.map((unit,index) => ({
  name:unit[0], slug:unitSlug(unit[0]), index,
  placement:String(unit[5] || ""), star:Number(unit[9]) || 0,
}));
const TL_UNIT_MAP = new Map(TL_UNITS.map(unit => [unit.slug, unit]));
const TL_TIER_SET = new Set(TL_TIERS);
let tierStarFilter = "all";
let tierPlaceFilter = "all";

function emptyTierState(){
  return {v:1, title:"", active:"tournament", modes:Object.fromEntries(TL_MODES.map(mode => [mode.id, {}]))};
}
let tierState = emptyTierState();
let selectedSlug = "";
let draggedSlug = "";
let dragPointerY = null;
let dragScrollFrame = 0;

/* เลื่อนหน้าอัตโนมัติเมื่อกำลังลากการ์ดเข้าใกล้ขอบจอ */
function stopDragAutoScroll(){
  dragPointerY = null;
  if(dragScrollFrame) cancelAnimationFrame(dragScrollFrame);
  dragScrollFrame = 0;
}
function runDragAutoScroll(){
  if(!draggedSlug || dragPointerY === null){ stopDragAutoScroll(); return; }
  const edge = Math.min(140,Math.max(80,innerHeight * .14));
  let speed = 0;
  if(dragPointerY < edge) speed = -Math.ceil((edge - dragPointerY) / edge * 24);
  else if(dragPointerY > innerHeight - edge) speed = Math.ceil((dragPointerY - (innerHeight - edge)) / edge * 24);
  if(speed) window.scrollBy(0,speed);
  dragScrollFrame = requestAnimationFrame(runDragAutoScroll);
}
function updateDragAutoScroll(event){
  if(!draggedSlug) return;
  dragPointerY = event.clientY;
  if(!dragScrollFrame) dragScrollFrame = requestAnimationFrame(runDragAutoScroll);
}
document.addEventListener("dragover",updateDragAutoScroll);
document.addEventListener("drop",stopDragAutoScroll);
document.addEventListener("dragend",stopDragAutoScroll);
window.addEventListener("blur",stopDragAutoScroll);

function cleanTierState(value){
  const clean = emptyTierState();
  if(!value || typeof value !== "object") return clean;
  clean.title = typeof value.title === "string" ? value.title.slice(0,80) : "";
  if(TL_MODES.some(mode => mode.id === value.active)) clean.active = value.active;
  TL_MODES.forEach(mode => {
    const source = value.modes && value.modes[mode.id];
    if(!source || typeof source !== "object") return;
    Object.entries(source).forEach(([slug,item]) => {
      if(!TL_UNIT_MAP.has(slug) || !item || !TL_TIER_SET.has(item.tier)) return;
      clean.modes[mode.id][slug] = {
        tier:item.tier,
        reason:typeof item.reason === "string" ? item.reason.slice(0,1000) : "",
        pos:Number.isFinite(+item.pos) ? +item.pos : 0,
      };
    });
  });
  return clean;
}

function encodeTierState(value){
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");
}
function decodeTierState(value){
  const padded = value.replace(/-/g,"+").replace(/_/g,"/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
function loadTierUrl(){
  const match = location.hash.match(/^#tier=([A-Za-z0-9_-]+)$/);
  if(!match) return false;
  try{ tierState = cleanTierState(decodeTierState(match[1])); return true; }
  catch(error){ return false; }
}

const tierModeData = () => tierState.modes[tierState.active];
const currentMode = () => TL_MODES.find(mode => mode.id === tierState.active) || TL_MODES[0];
const esc = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
function unitFace(unit, cls=""){
  return `<span class="tl-face ${cls}"><span>${unitInitials(unit.name)}</span><img src="${unitImgSrc(unit.name)}" alt="" onload="this.style.display='block';this.previousElementSibling.style.display='none'" onerror="this.style.display='none'"></span>`;
}
function unitCard(unit, place){
  const item = tierModeData()[unit.slug];
  const reason = item && item.reason ? `<i title="${esc(item.reason)}">✎</i>` : "";
  const badge = place === "pool" && item ? `<b>${item.tier}</b>` : "";
  return `<button class="tl-unit${selectedSlug === unit.slug ? " selected" : ""}${item ? " assigned" : ""}" type="button" draggable="true" data-slug="${unit.slug}" data-place="${place}" title="${esc(unit.name)}">
    ${unitFace(unit)}<span class="tl-unit-name">${esc(unit.name)}</span>${badge}${reason}
  </button>`;
}

function renderTierModes(){
  document.getElementById("tierModes").innerHTML = TL_MODES.map(mode =>
    `<button type="button" class="chip${tierState.active === mode.id ? " on" : ""}" data-mode="${mode.id}">${mode[TL_LANG]}</button>`
  ).join("");
  document.querySelectorAll("#tierModes button").forEach(button => button.onclick = () => {
    tierState.active = button.dataset.mode;
    selectedSlug = "";
    renderTierList();
  });
}

function nextPosition(){
  return Math.max(0, ...Object.values(tierModeData()).map(item => +item.pos || 0)) + 1;
}
function assignTier(slug, tier){
  if(!TL_UNIT_MAP.has(slug) || !TL_TIER_SET.has(tier)) return;
  const existing = tierModeData()[slug];
  tierModeData()[slug] = {tier, reason:existing ? existing.reason : "", pos:nextPosition()};
  selectedSlug = "";
  renderTierList();
}
function removeTier(slug){ delete tierModeData()[slug]; selectedSlug = ""; renderTierList(); }

function renderTierBoard(){
  const data = tierModeData();
  document.getElementById("tierBoardTitle").textContent = `${currentMode()[TL_LANG]} Tier List`;
  document.getElementById("tierBoard").innerHTML = TL_TIERS.map((tier,index) => {
    const units = Object.entries(data)
      .filter(([,item]) => item.tier === tier)
      .sort((a,b) => a[1].pos - b[1].pos)
      .map(([slug]) => TL_UNIT_MAP.get(slug));
    return `<div class="tier-row tier-${index}" data-tier="${tier}">
      <div class="tier-label">${tier}</div>
      <div class="tier-drop">${units.map(unit => unitCard(unit,"tier")).join("")}<span class="tier-empty">${selectedSlug ? `+ ${TL_LANG === "en" ? "Place selected unit" : "วางตัวที่เลือก"}` : (TL_LANG === "en" ? "Drop units here" : "ลากตัวละครมาวางตรงนี้")}</span></div>
    </div>`;
  }).join("");
  document.querySelectorAll(".tier-row").forEach(row => {
    row.onclick = event => {
      if(event.target.closest(".tl-unit")) return;
      if(selectedSlug) assignTier(selectedSlug,row.dataset.tier);
    };
    row.ondragover = event => { event.preventDefault(); row.classList.add("drag-over"); };
    row.ondragleave = () => row.classList.remove("drag-over");
    row.ondrop = event => {
      event.preventDefault(); row.classList.remove("drag-over");
      const slug = event.dataTransfer.getData("text/plain") || draggedSlug;
      assignTier(slug,row.dataset.tier);
    };
  });
}

function renderTierPool(){
  const query = document.getElementById("tierSearch").value.trim().toLowerCase();
  const units = TL_UNITS.filter(unit =>
    (!query || unit.name.toLowerCase().includes(query)) &&
    (tierStarFilter === "all" || unit.star === Number(tierStarFilter)) &&
    (tierPlaceFilter === "all" || unit.placement === tierPlaceFilter)
  );
  document.getElementById("tierPool").innerHTML = units.map(unit => unitCard(unit,"pool")).join("");
  const assigned = Object.keys(tierModeData()).length;
  document.getElementById("tierPoolCount").textContent = query ? TL_TEXT.units(units.length) : TL_TEXT.assigned(assigned,TL_UNITS.length);
  const selected = TL_UNIT_MAP.get(selectedSlug);
  document.getElementById("tierSelected").innerHTML = selected
    ? `<b>${TL_TEXT.select}: ${esc(selected.name)}</b> — ${TL_TEXT.selectHelp}`
    : TL_TEXT.idle;
  const pool = document.getElementById("tierPool");
  pool.ondragover = event => event.preventDefault();
  pool.ondrop = event => {
    event.preventDefault();
    const slug = event.dataTransfer.getData("text/plain") || draggedSlug;
    if(tierModeData()[slug]) removeTier(slug);
  };
}

function bindUnitCards(){
  document.querySelectorAll(".tl-unit").forEach(card => {
    card.ondragstart = event => {
      draggedSlug = card.dataset.slug;
      event.dataTransfer.setData("text/plain",draggedSlug);
      event.dataTransfer.effectAllowed = "move";
    };
    card.ondragend = () => {
      draggedSlug = "";
      stopDragAutoScroll();
      document.querySelectorAll(".drag-over").forEach(x=>x.classList.remove("drag-over"));
    };
    card.onclick = event => {
      event.stopPropagation();
      const slug = card.dataset.slug;
      if(card.dataset.place === "tier") openReasonDialog(slug);
      else { selectedSlug = selectedSlug === slug ? "" : slug; renderTierList(); }
    };
  });
}

function renderTierList(){
  renderTierModes();
  renderTierBoard();
  renderTierPool();
  bindUnitCards();
  document.getElementById("tierTitle").value = tierState.title;
  syncLanguageLinks();
}

function openReasonDialog(slug){
  const unit = TL_UNIT_MAP.get(slug), item = tierModeData()[slug];
  if(!unit || !item) return;
  const dialog = document.getElementById("tierReasonDialog");
  dialog.dataset.slug = slug;
  document.getElementById("tierDialogTier").textContent = `${currentMode()[TL_LANG]} · Tier ${item.tier}`;
  document.getElementById("tierDialogName").textContent = unit.name;
  document.getElementById("tierReason").value = item.reason || "";
  document.getElementById("tierDialogFace").innerHTML = `${unitInitials(unit.name)}<img src="${unitImgSrc(unit.name)}" alt="" onload="this.style.display='block';this.previousSibling.textContent=''" onerror="this.style.display='none'">`;
  dialog.showModal();
}

function setTierStatus(message,good=true){
  const el = document.getElementById("tierStatus");
  el.textContent = message;
  el.classList.toggle("bad",!good);
  clearTimeout(setTierStatus.timer);
  setTierStatus.timer = setTimeout(()=>{ el.textContent=""; },5000);
}
async function saveTierUrl(){
  tierState.title = document.getElementById("tierTitle").value.trim().slice(0,80);
  const hash = `#tier=${encodeTierState(tierState)}`;
  history.replaceState(null,"",`${location.pathname}${location.search}${hash}`);
  syncLanguageLinks();
  try{
    await navigator.clipboard.writeText(location.href);
    setTierStatus(TL_TEXT.saved);
  }catch(error){
    const temp = document.createElement("textarea");
    temp.value = location.href; temp.style.position="fixed"; temp.style.opacity="0";
    document.body.appendChild(temp); temp.select();
    const copied = document.execCommand("copy"); temp.remove();
    setTierStatus(copied ? TL_TEXT.saved : TL_TEXT.copyFail,copied);
  }
}
function syncLanguageLinks(){
  const hash = location.hash;
  document.querySelectorAll(".lang-menu a").forEach(link => {
    const base = link.getAttribute("href").split("#")[0];
    link.href = base + hash;
  });
}

document.getElementById("tierSearch").addEventListener("input",()=>{
  renderTierPool();
  bindUnitCards();
});
document.querySelectorAll("[data-star]").forEach(button => button.addEventListener("click",()=>{
  tierStarFilter = button.dataset.star;
  document.querySelectorAll("[data-star]").forEach(item => item.classList.toggle("on",item === button));
  renderTierPool(); bindUnitCards();
}));
document.querySelectorAll("[data-place]").forEach(button => button.addEventListener("click",()=>{
  tierPlaceFilter = button.dataset.place;
  document.querySelectorAll("[data-place]").forEach(item => item.classList.toggle("on",item === button));
  renderTierPool(); bindUnitCards();
}));
document.getElementById("tierTitle").addEventListener("input",event => { tierState.title = event.target.value.slice(0,80); });
document.getElementById("tierShare").onclick = saveTierUrl;
document.getElementById("tierReset").onclick = () => {
  if(!Object.keys(tierModeData()).length || confirm(TL_TEXT.confirm)){
    tierState.modes[tierState.active] = {};
    selectedSlug = ""; renderTierList(); setTierStatus(TL_TEXT.cleared);
  }
};
document.getElementById("tierReasonSave").onclick = () => {
  const dialog = document.getElementById("tierReasonDialog"), item = tierModeData()[dialog.dataset.slug];
  if(item) item.reason = document.getElementById("tierReason").value.trim().slice(0,1000);
  dialog.close(); renderTierList();
};
document.getElementById("tierRemove").onclick = () => {
  const dialog = document.getElementById("tierReasonDialog"), slug = dialog.dataset.slug;
  dialog.close(); removeTier(slug);
};
document.getElementById("tierReasonDialog").addEventListener("click",event => {
  if(event.target === event.currentTarget) event.currentTarget.close();
});

const loadedFromUrl = loadTierUrl();
renderTierList();
if(loadedFromUrl) setTierStatus(TL_TEXT.loaded);
