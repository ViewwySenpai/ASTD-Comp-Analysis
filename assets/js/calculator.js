/* ============================================================
   ASTD DPS Calculator — logic
   โหลดหลัง i18n.js และ units.js เสมอ / always load after i18n.js + units.js
   ============================================================ */
let selIdx = -1;
let typeFilter = "all";
let compare = [];
let sortKey = "dps", sortDir = -1;

const $ = id => document.getElementById(id);
const fmt = (n, d=2) => {
  if(n===null || !isFinite(n)) return "—";
  if(n >= 1e6) return (n/1e6).toFixed(2)+"M";
  if(n >= 1e4) return Math.round(n).toLocaleString("en-US");
  return (+n.toFixed(d)).toLocaleString("en-US");
};
const fmtFull = n => isFinite(n) ? Math.round(n).toLocaleString("en-US") : "—";

/* ---------- inventory grid ---------- */
function renderList(){
  const q = $("search").value.trim().toLowerCase();
  const grid = $("unitList");
  grid.innerHTML = "";
  let shown = 0;
  UNITS.forEach((u,i)=>{
    if(typeFilter === "6star"){ if(u[9] !== 6) return; }
    else if(typeFilter === "7star"){ if(u[9] !== 7) return; }
    else if(typeFilter !== "all" && u[5] !== typeFilter) return;
    if(q && !u[0].toLowerCase().includes(q)) return;
    shown++;
    const cell = document.createElement("button");
    cell.className = "u-cell" + (i===selIdx ? " sel":"");
    cell.title = u[0];
    cell.innerHTML = `
      <span class="initials">${unitInitials(u[0])}</span>
      <img decoding="async" src="${unitImgSrc(u[0])}" alt=""
           onload="this.style.display='block';this.previousElementSibling.style.display='none'"
           onerror="this.remove()">
      ${u[8]?`<span class="pip pip-new"></span>`:""}
      ${u[9]?`<span class="pip pip-star s${u[9]}"></span>`:""}
      <span class="cap">${u[0]}</span>`;
    cell.onclick = ()=>selectUnit(i);
    grid.appendChild(cell);
  });
  $("unitCount").textContent = T.showing(shown, UNITS.length);
}

function setUnitImage(name){
  const img = $("unitImg"), fb = $("unitImgFallback");
  fb.style.display = "grid";
  fb.textContent = unitInitials(name);
  img.style.display = "none";
  img.src = unitImgSrc(name);
  img.onload  = ()=>{ img.style.display="block"; fb.style.display="none"; };
  img.onerror = ()=>{ img.style.display="none"; fb.style.display="grid"; };
  if($("unitImgName")) $("unitImgName").textContent = T.imgLabel(unitSlug(name));
}

function selectUnit(i){
  selIdx = i;
  const u = UNITS[i];
  $("selName").textContent = u[0];
  $("selBadges").innerHTML =
    (u[5]?`<span class="tag">${u[5]}</span>`:"") +
    (u[6]?`<span class="tag">AoE: ${u[6]}</span>`:"") +
    (u[7]?`<span class="tag ${u[7].toLowerCase()}">${u[7]}</span>`:"") +
    (u[9]?`<span class="tag star${u[9]}">${u[9]}★${u[1]==null?" — "+T.needStats:""}</span>`:"");
  flatDmg = 0;
  $("inDmg").value = u[1] ?? "";
  $("inSpa").value = u[2] ?? "";
  $("inRng").value = u[3] ?? "";
  $("inCost").value = u[4] ?? "";
  setUnitImage(u[0]);
  renderUpgrades(u[0]);
  renderAbilities(u[0]);
  renderCategories(u[0]);
  renderList();
  calc();
}

function bindPair(rangeId, numId){
  $(rangeId).addEventListener("input", ()=>{ $(numId).value = $(rangeId).value; calc(); });
  $(numId).addEventListener("input", ()=>{ $(rangeId).value = $(numId).value; calc(); });
}

/* ---------- maths ---------- */
function getBuild(){
  const baseDmg = parseFloat($("inDmg").value)||0;
  const baseSpa = Math.max(parseFloat($("inSpa").value)||1, 0.05);
  const baseRng = parseFloat($("inRng").value)||0;
  const cost    = parseFloat($("inCost").value)||0;
  const mA = multA(), mB = multB(true);
  const fDmg = baseDmg * mA * mB + flatDmg * mB;
  const fRng = orbRange(baseRng, deployRange(), orbRangePct());
  const nm   = selIdx >= 0 ? UNITS[selIdx][0] : "";
  return {baseDmg, baseSpa, baseRng, cost, fDmg, fSpa:baseSpa, fRng,
          dps: unitTotalDps(nm, fDmg, baseSpa),        /* รวม Judgement ให้แล้ว */
          baseDps: unitTotalDps(nm, baseDmg, baseSpa)};
}

function calc(){
  const b = getBuild();
  $("outDps").textContent = fmt(b.dps);
  const gain = b.baseDps>0 ? (b.dps/b.baseDps - 1)*100 : 0;
  $("outDpsDelta").textContent = Math.abs(gain)>0.05 ? T.gainSuffix(gain.toFixed(1), fmt(b.baseDps)) : "";
  if($("dpsMeter")) $("dpsMeter").style.width = Math.min(100, gain/5) + "%";

  setOut("outDmg","outDmgBase", b.fDmg, b.baseDmg, false);
  setOut("outSpa","outSpaBase", b.fSpa, b.baseSpa, true);
  setOut("outRng","outRngBase", b.fRng, b.baseRng, false);
  $("outApm").textContent = b.fSpa>0 ? fmt(60/b.fSpa,1) : "—";
  const jr = $("outJdgRow");
  if(jr){
    const nm  = selIdx >= 0 ? UNITS[selIdx][0] : "";
    const jdg = (nm && hasJudgement(nm)) ? judgementDps(b.fDmg, b.fSpa) : 0;
    jr.style.display = jdg > 0 ? "" : "none";
    if(jdg > 0) $("outJdg").textContent = fmt(jdg);
  }
  paintUpgradeNumbers();
  const orb = orbPick();
  const netCost = b.cost * (1 - (orb ? orb.cost : 0)/100);     /* Orb ลดราคารวม */
  $("outEff").textContent = netCost>0 ? fmt(b.dps/(netCost/1000)) : "—";
}
function setOut(vId, bId, val, base, lowerBetter){
  const el = $(vId);
  el.childNodes[0].textContent = fmt(val);
  const diff = val - base;
  el.className = "v" + (Math.abs(diff)<1e-9 ? "" : ((lowerBetter ? diff<0 : diff>0) ? " up":" down"));
  $(bId).textContent = Math.abs(diff)>1e-9 ? T.basePrefix(fmt(base)) : "";
}
let buffDmg = 0, buffLead = 0;
/* บัฟหลายอันซ้อนกัน = คูณกัน ไม่ใช่บวกกัน
   เช่น 250% กับ Leader 20% -> x3.5 * x1.2 = x4.2 (คิดเป็น +320%)   */
/* ---------- Orb ---------- */
function orbPick(){
  const c = document.querySelector("#orbChips .preset-chip.on");
  return (c && typeof ORBS !== "undefined") ? ORBS[+c.dataset.i] : null;
}
/* ระยะตอนวางครั้งแรกของยูนิตที่เลือกอยู่ (เอาจากแถวแรกของตารางขั้นอัปเกรด) */
function deployRange(){
  if(selIdx < 0 || typeof UPGRADES === "undefined") return null;
  const t = UPGRADES[unitSlug(UNITS[selIdx][0])];
  return (t && t[0] && t[0].rng) ? t[0].rng : null;
}
/* Orb เพิ่มระยะจาก "ระยะตอนวางครั้งแรก" อย่างเดียว
   ระยะที่ได้เพิ่มมาจากการอัปเกรดจะบวกทีหลังแบบไม่โดนคูณ
   ถ้ายูนิตนั้นไม่มีตารางขั้นอัปเกรด ก็ไม่รู้ระยะตั้งต้น เลยคูณทั้งก้อนไปก่อน */
function orbRange(rng, dep, pct){
  if(!pct || !rng) return rng;
  return (dep && rng >= dep) ? dep*(1+pct) + (rng - dep) : rng*(1+pct);
}
function orbRangePct(){ const o = orbPick(); return o ? (o.rng||0)/100 : 0; }

function renderOrbs(){
  const box = $("orbChips");
  if(!box || typeof ORBS === "undefined") return;
  box.innerHTML = ORBS.map((o,i)=> `<button class="preset-chip" data-i="${i}">${o.name}</button>`).join("");
  box.querySelectorAll(".preset-chip").forEach(c => c.onclick = ()=>{
    const was = c.classList.contains("on");
    box.querySelectorAll(".preset-chip").forEach(x => x.classList.remove("on"));
    if(!was) c.classList.add("on");          /* ใส่ได้ลูกเดียว กดซ้ำ = ถอด */
    syncBuff();
  });
}
function paintOrbNote(){
  const note = $("orbNote"); if(!note) return;
  const o = orbPick();
  if(!o){ note.style.display = "none"; return; }
  const lang = (window.SITE_LANG === "en") ? "en" : "th";
  const bits = [];
  if(o.dmg)  bits.push(T.orbDmg(o.dmg));
  if(o.cost) bits.push(T.orbCost(o.cost));
  if(o.rng)  bits.push(T.orbRange(o.rng));
  bits.push(T.orbFrom(o.from[lang] || o.from.en));
  note.style.display = "";
  note.textContent = o.name + " — " + bits.join(" · ");
}

function supportMult(){
  let m = 1;
  document.querySelectorAll("#supportChips .preset-chip.on").forEach(c => m *= (1 + (+c.dataset.v)/100));
  return m;
}
/* บัฟแบ่งเป็นสองกลุ่ม เพราะดาเมจตายตัวจากสกิลบางอันไม่โดน Leader กับ Orb คูณ
   multA = Leader + Orb        -> คูณเฉพาะดาเมจพื้นฐาน
   multB = 250/300% + Support + ธาตุคัดแพ้ -> คูณทั้งดาเมจพื้นฐานและดาเมจตายตัว */
function multA(){
  const o = orbPick();
  return (1 + buffLead/100) * (1 + (o ? o.dmg : 0)/100);
}
function multB(includeElem){
  const e = (includeElem && $("tgElem") && $("tgElem").checked) ? 1.5 : 1;
  return (1 + buffDmg/100) * supportMult() * abilMult() * e;
}
function buffMult(){ return multA() * multB(false); }

/* ดาเมจตายตัวของขั้นอัปเกรดที่เลือกอยู่ (0 ถ้าไม่มี) */
let flatDmg = 0;
function syncBuff(){
  paintOrbNote();
  $("vDmg").value = Math.round((buffMult() - 1) * 10000) / 100;
  document.querySelectorAll("#dmgChips .preset-chip").forEach(c=>c.classList.toggle("on", +c.dataset.v === buffDmg && buffDmg > 0));
  document.querySelectorAll("#leaderChips .preset-chip").forEach(c=>c.classList.toggle("on", +c.dataset.v === buffLead && buffLead > 0));
  calc();
}
function pickBuff(kind, v){          /* กดปุ่มเดิมซ้ำ = ปิดบัฟนั้น */
  if(kind === "dmg") buffDmg = (buffDmg === v) ? 0 : v;
  else               buffLead = (buffLead === v) ? 0 : v;
  syncBuff();
}

/* ---------- comparison ---------- */
function addToCompare(){
  const b = getBuild();
  if(b.baseDmg<=0){ alert(T.alertPick); return; }
  const buffs = [];
  if(+$("vDmg").value) buffs.push(`DMG+${$("vDmg").value}%`);
  if($("tgElem").checked) buffs.push("Elem×1.5");
  compare.push({
    name: (selIdx>=0 ? UNITS[selIdx][0] : "Custom") + (buffs.length? ` (${buffs.join(", ")})`:""),
    dmg:b.fDmg, spa:b.fSpa, rng:b.fRng, dps:b.dps, cost:b.cost,
    eff: b.cost>0 ? b.dps/(b.cost/1000) : 0
  });
  renderCompare();
}
function renderCompare(){
  const tb = $("cmpBody");
  $("cmpTable").style.display = compare.length ? "table":"none";
  $("cmpEmpty").style.display = compare.length ? "none":"block";
  if(!compare.length) return;
  const sorted = [...compare].sort((a,b)=>{
    if(sortKey==="name") return sortDir * a.name.localeCompare(b.name);
    return (a[sortKey]-b[sortKey]) * sortDir;
  });
  const bestDps = Math.max(...compare.map(c=>c.dps));
  tb.innerHTML = sorted.map(c=>{
    const idx = compare.indexOf(c);
    return `<tr>
      <td>${c.name}</td><td>${fmt(c.dmg)}</td><td>${fmt(c.spa)}</td><td>${fmt(c.rng,1)}</td>
      <td class="${c.dps===bestDps?"best":""}">${fmt(c.dps)}</td>
      <td>${c.cost?fmtFull(c.cost):"—"}</td><td>${c.eff?fmt(c.eff):"—"}</td>
      <td><button class="rm" onclick="rmCmp(${idx})">✕</button></td>
    </tr>`;
  }).join("");
}
window.rmCmp = i => { compare.splice(i,1); renderCompare(); };

/* ---------- upgrade levels ---------- */
let upgRows = null, upgPick = -1;

function renderUpgrades(name){
  const box = $("upgBox");
  if(!box) return;
  upgRows = getUpgrades(name);
  upgPick = -1;
  const table = $("upgTable"), none = $("upgNone");

  if(!upgRows || !upgRows.length){
    table.innerHTML = "";
    none.textContent = T.upgNone;
    none.style.display = "block";
    if($("upgWipe")) $("upgWipe").style.display = "none";
    return;
  }
  none.style.display = "none";
  if($("upgWipe")) $("upgWipe").style.display = loadUpgStore()[unitSlug(name)] ? "inline-block" : "none";

  table.innerHTML = upgRows.map((r,i)=>{
    const bullets = [];
    const lang = (window.SITE_LANG === "en") ? "en" : "th";
    const noteTxt = (r.note && typeof r.note === "object") ? (r.note[lang] || r.note.en || r.note.th) : r.note;
    if(noteTxt) bullets.push(...String(noteTxt).split(" / ").map(x => x.trim()).filter(Boolean));
    /* ค่าที่บัฟมีผล ติด data-base ไว้ให้ paintUpgradeNumbers() เขียนทับทีหลัง */
    const fl = rowFlat(r), tot = rowDmgTotal(r);
    const stats = [
      ["Damage", fmtFull(tot), "dmg", r.dmg, fl],
      ["Range",  r.rng || "—", r.rng ? "rng" : null, r.rng || null],
      ["SPA",    r.spa || "—"],
      ["DPS",    r.spa ? fmt(tot / r.spa) : "—", "dps", r.spa ? r.dmg / r.spa : null, r.spa ? fl / r.spa : 0],
    ];
    /* Judgement ติดนาน 20 วิ ตัวหารคือรอบยิงที่ครอบ 20 วิ พอดี = SPA คูณขึ้นไปจนถึง 20
       (SPA 5->20, 7->21, 9->27, 14->28) */
    if(r.jdg && r.spa){
      const window20 = Math.ceil(20 / r.spa) * r.spa;
      const jdBase = r.dmg * 0.25 * 10 / window20, jdFlat = fl * 0.25 * 10 / window20;
      stats.push([T.judgeDps, fmt(jdBase + jdFlat), "jdps", jdBase, jdFlat]);
      const tdBase = r.dmg / r.spa + jdBase, tdFlat = fl / r.spa + jdFlat;
      stats.push([T.totalDps, fmt(tdBase + tdFlat), "tdps", tdBase, tdFlat]);
    }
    return `<div class="upg-card" data-i="${i}">
      <div class="upg-head">
        <span class="upg-name">★ ${r.name ? r.name : (r.lv === 0 ? T.upgDeploy : T.upgLv(r.lv))}</span>
        <span class="upg-cost">${r.cost ? fmtFull(r.cost) : "—"}</span>
      </div>
      <ul class="upg-stats">
        ${stats.map(([k,v,kind,base,flat]) => `<li><span>${k}</span><b${
          kind ? ` data-k="${kind}" data-base="${base}" data-flat="${flat||0}"` : ""}>${v}</b></li>`).join("")}
      </ul>
      ${bullets.length ? `<ul class="upg-notes">${bullets.map(b=>`<li>${b}</li>`).join("")}</ul>` : ""}
      <div class="upg-cum">${T.upgCum} ${fmtFull(upgradeCumCost(upgRows, i))}</div>
    </div>`;
  }).join("");

  table.querySelectorAll(".upg-card").forEach(el=>{
    el.onclick = ()=> applyUpgrade(+el.dataset.i);
  });
  paintUpgradeNumbers();
}

/* เขียนตัวเลขในการ์ดขั้นอัปเกรดใหม่ตามบัฟที่เปิดอยู่
   (ดาเมจ / DPS / Judgement DPS คูณบัฟ ส่วน Range กับ SPA ไม่เกี่ยว) */
function paintUpgradeNumbers(){
  const note = $("upgBuffNote");
  const mA = multA(), mB = multB(true), m = mA * mB;
  const rPct = orbRangePct(), dep = deployRange();
  document.querySelectorAll("#upgTable .upg-card b[data-k]").forEach(el=>{
    const base = parseFloat(el.dataset.base);
    if(!isFinite(base)) return;
    if(el.dataset.k === "rng"){                       /* ระยะไม่เกี่ยวกับบัฟดาเมจ */
      const v = orbRange(base, dep, rPct);
      el.textContent = Math.round(v * 10) / 10;
      el.classList.toggle("buffed", rPct !== 0);
      return;
    }
    const flat = parseFloat(el.dataset.flat) || 0;
    const v = base * mA * mB + flat * mB;          /* ส่วนตายตัวโดนแค่ mB */
    el.textContent = el.dataset.k === "dmg" ? fmtFull(v) : fmt(v);
    el.classList.toggle("buffed", m !== 1);
  });
  if(note){
    note.style.display = m !== 1 ? "" : "none";
    note.textContent = m !== 1 ? T.upgBuffed(fmt(m, 3)) : "";
  }
}

/* ---------- สกิลพิเศษ ---------- */
function renderAbilities(name){
  const box = $("abilBox"), list = $("abilList");
  if(!box || !list) return;
  const rows = (typeof ABILITIES !== "undefined") ? ABILITIES[unitSlug(name)] : null;
  if(!rows || !rows.length){ box.style.display = "none"; return; }
  box.style.display = "";
  const lang = (window.SITE_LANG === "en") ? "en" : "th";
  list.innerHTML = rows.map((a,i) => `
    <div class="abil-card">
      <div class="abil-head">
        <span class="abil-name">${a.name}</span>
        ${a.lv != null ? `<span class="abil-lv">${T.abilLv(a.lv)}</span>` : ""}
        ${a.mult ? `<label class="abil-sw" title="${T.abilOn(a.mult)}">
            <span>${T.abilOn(a.mult)}</span>
            <input type="checkbox" data-mult="${a.mult}"><i></i></label>` : ""}
      </div>
      <ul class="abil-notes">${(a[lang] || []).map(t => `<li>${t}</li>`).join("")}</ul>
      ${a.cd ? `<div class="abil-cd">${a.passive ? "" : T.abilCd + " "}${a.cd[lang] || a.cd.en}${
        a.global ? ` <span class="abil-tag">GLOBAL — ${T.abilGlobal}</span>` : ""}</div>` : ""}
    </div>`).join("");

  list.querySelectorAll(".abil-sw input").forEach(el => el.addEventListener("change", calc));
}

/* ผลคูณจาก passive ที่เปิดสวิตช์ไว้ */
function abilMult(){
  let m = 1;
  document.querySelectorAll("#abilList .abil-sw input:checked")
    .forEach(el => m *= (parseFloat(el.dataset.mult) || 1));
  return m;
}

/* ---------- หมวดหมู่ยูนิต + Leader Skill ---------- */
function renderCategories(name){
  const box = $("catBox"), body = $("catBody");
  if(!box || !body) return;
  const d = (typeof CATEGORIES !== "undefined") ? CATEGORIES[unitSlug(name)] : null;
  if(!d){ box.style.display = "none"; return; }
  box.style.display = "";
  const lang = (window.SITE_LANG === "en") ? "en" : "th";
  body.innerHTML =
    (d.leader ? `<div class="cat-leader"><b>${T.catLeader}</b><span>${d.leader[lang] || d.leader.en}</span></div>` : "") +
    (d.tags && d.tags.length
      ? `<div class="cat-tags"><b>${T.catTags}</b><div>${d.tags.map(t=>`<span class="cat-tag">${t}</span>`).join("")}</div></div>`
      : "");
}

function applyUpgrade(i){
  if(!upgRows || !upgRows[i]) return;
  upgPick = i;
  const r = upgRows[i];
  $("inDmg").value  = r.dmg;
  flatDmg = rowFlat(r);
  if(r.spa) $("inSpa").value = r.spa;
  if(r.rng) $("inRng").value = r.rng;
  $("inCost").value = upgradeCumCost(upgRows, i);
  document.querySelectorAll("#upgTable .upg-card").forEach(el=>
    el.classList.toggle("on", +el.dataset.i === i));
  calc();
}

function initUpgradeTools(){
  if(!$("upgRead")) return;
  $("upgRead").onclick = ()=>{
    if(selIdx < 0) return;
    const rows = parseUpgradeText($("upgPaste").value);
    const msg = $("upgMsg");
    if(!rows.length){ msg.textContent = T.upgFail; return; }
    saveUpgTable(UNITS[selIdx][0], rows);
    renderUpgrades(UNITS[selIdx][0]);
    msg.textContent = T.upgOk(rows.length);
    $("upgPaste").value = "";
  };
  $("upgCode").onclick = ()=>{
    if(selIdx < 0 || !upgRows) return;
    const code = upgradesToCode(UNITS[selIdx][0], upgRows);
    navigator.clipboard?.writeText(code);
    $("upgPaste").value = code;
    $("upgMsg").textContent = T.upgCopied;
  };
  $("upgWipe").onclick = ()=>{
    if(selIdx < 0) return;
    saveUpgTable(UNITS[selIdx][0], null);
    renderUpgrades(UNITS[selIdx][0]);
    $("upgMsg").textContent = "";
  };
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  $("inDmg").addEventListener("input", ()=>{ flatDmg = 0; calc(); });   /* พิมพ์เอง = ไม่มีดาเมจตายตัวแล้ว */
  ["inSpa","inRng","inCost"].forEach(id => $(id).addEventListener("input", calc));
  $("tgElem").addEventListener("change", calc);
  document.querySelectorAll("#dmgChips .preset-chip").forEach(c=>
    c.addEventListener("click", ()=> pickBuff("dmg", +c.dataset.v)));
  document.querySelectorAll("#leaderChips .preset-chip").forEach(c=>
    c.addEventListener("click", ()=> pickBuff("lead", +c.dataset.v)));
  document.querySelectorAll("#supportChips .preset-chip").forEach(c=>
    c.addEventListener("click", ()=>{ c.classList.toggle("on"); syncBuff(); }));
  $("vDmg").addEventListener("input", ()=>{   /* พิมพ์เองได้ ปุ่มจะเลิกไฮไลต์ */
    buffDmg = parseFloat($("vDmg").value) || 0; buffLead = 0;
    document.querySelectorAll("#dmgChips .preset-chip, #leaderChips .preset-chip, #supportChips .preset-chip, #orbChips .preset-chip")
      .forEach(c=>c.classList.remove("on"));
    calc();
  });

  $("btnReset").onclick = ()=>{
    buffDmg = 0; buffLead = 0;
    document.querySelectorAll("#supportChips .preset-chip, #orbChips .preset-chip").forEach(c=>c.classList.remove("on"));
    document.querySelectorAll("#abilList .abil-sw input").forEach(el=> el.checked = false);
    $("tgElem").checked = false;
    syncBuff();
  };
  $("btnAdd").onclick = addToCompare;

  document.querySelectorAll("#cmpTable th[data-k]").forEach(th=>{
    th.onclick = ()=>{
      const k = th.dataset.k;
      if(sortKey===k) sortDir*=-1; else {sortKey=k; sortDir=-1;}
      renderCompare();
    };
  });
  document.querySelectorAll("#typeFilters .chip").forEach(ch=>{
    ch.onclick = ()=>{
      document.querySelectorAll("#typeFilters .chip").forEach(c=>c.classList.remove("on"));
      ch.classList.add("on");
      typeFilter = ch.dataset.f;
      renderList();
    };
  });
  $("search").addEventListener("input", renderList);

  renderOrbs();
  initUpgradeTools();
  renderList();
  const p = new URLSearchParams(location.search);
  const uIdx = parseInt(p.get("unit"));
  selectUnit(Number.isInteger(uIdx) && UNITS[uIdx] ? uIdx : 7);
});
