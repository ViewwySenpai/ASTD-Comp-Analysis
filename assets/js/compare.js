/* ============================================================
   ASTD Comp — หน้าเทียบยูนิต 2 ตัว
   ตั้ง window.SITE_LANG = "th" | "en" ก่อนโหลด (ใช้ i18n.js ร่วมกับหน้าอื่น)
   ============================================================ */
const CT = (window.SITE_LANG === "en") ? {
  pickTitle:"Pick a unit", search:"Type a unit name…", empty:"No unit matches that search",
  slot:"Tap to pick a unit", close:"Close", noStats:"no stats yet",
  stageMax:"Max upgrade", stageDeploy:"Deployment", stageLv:n=>"Upgrade "+n, stageNone:"no per-upgrade data",
  rows:{dmg:"Damage", spa:"SPA", rng:"Range", cost:"Total cost", dps:"DPS", eff:"DPS per 1,000¢"},
  pickBoth:"Pick two units to compare them.",
  tie:"Dead even — same DPS.",
  winner:(n,p)=>`${n} wins on DPS, ${p}% higher.`,
  effNote:(n,p)=>`${n} gives more DPS per cash, ${p}% better value.`,
  higher:"higher is better", lower:"lower is better",
  buffH:"Buffs for this unit", orbH:"Orb", elem:"Elemental weakness ×1.5",
  clear:"Clear buffs", sameBuffs:"Copy these buffs to the other side",
} : {
  pickTitle:"เลือกยูนิต", search:"พิมพ์ชื่อยูนิต…", empty:"ไม่เจอยูนิตที่ค้นหา",
  slot:"กดเพื่อเลือกยูนิต", close:"ปิด", noStats:"ยังไม่มีสถิติ",
  stageMax:"ขั้นสุดท้าย", stageDeploy:"วางครั้งแรก", stageLv:n=>"อัปขั้นที่ "+n, stageNone:"ไม่มีข้อมูลรายขั้น",
  rows:{dmg:"ดาเมจ", spa:"SPA", rng:"ระยะ", cost:"ราคารวม", dps:"DPS", eff:"คุ้มต่อ 1,000¢"},
  pickBoth:"เลือกยูนิตให้ครบ 2 ตัวก่อน แล้วจะเทียบให้",
  tie:"เท่ากันพอดี DPS ไม่ต่างกันเลย",
  winner:(n,p)=>`${n} ชนะเรื่อง DPS สูงกว่า ${p}%`,
  effNote:(n,p)=>`${n} คุ้มเงินกว่า ได้ DPS ต่อเงินมากกว่า ${p}%`,
  higher:"ยิ่งมากยิ่งดี", lower:"ยิ่งน้อยยิ่งดี",
  buffH:"บัฟของตัวนี้", orbH:"Orb", elem:"ธาตุที่คัดรูแพ้ ×1.5",
  clear:"ล้างบัฟ", sameBuffs:"ก๊อปบัฟชุดนี้ไปอีกข้าง",
};
const $c = id => document.getElementById(id);

/* ช่องซ้าย/ขวา: เก็บว่าเลือกยูนิตตัวไหน ขั้นอัปเกรดไหน */
const CP_BUFFS = [
  {id:"b250",   label:"250%",          v:250},
  {id:"b300",   label:"300%",          v:300},
  {id:"lead20", label:"Leader +20%",   v:20},
  {id:"lead15", label:"Leader +15%",   v:15},
  {id:"idol",   label:"Idol +15%",     v:15},
  {id:"judge",  label:"Judgement +8%", v:8},
  {id:"fv",     label:"FV +35%",       v:35},
  {id:"purify", label:"Purify +12%",   v:12},
];
/* บัฟแยกของใครของมัน เก็บไว้ในสถานะของแต่ละข้าง */
const newSlot = ()=> ({unit:null, stage:"", buffs:new Set(), orb:null, elem:false});
const slots = [newSlot(), newSlot()];

/* ---------- ตัวเลือกยูนิต ---------- */
let pickSlot = 0;
function buildPicker(){
  const ov = document.createElement("div");
  ov.className = "pick-ov"; ov.id = "cpOv";
  ov.innerHTML = `
    <div class="pick-box">
      <div class="pick-head"><h3>${CT.pickTitle}</h3><button class="btn" id="cpClose">${CT.close}</button></div>
      <input class="pick-search" id="cpSearch" type="search" placeholder="${CT.search}">
      <div class="pick-filters" id="cpFilters">
        <button class="chip on" data-f="all">All</button>
        <button class="chip" data-f="6">6★</button>
        <button class="chip" data-f="7">7★</button>
        <button class="chip" data-f="stats">DPS</button>
      </div>
      <div class="pick-grid" id="cpGrid"></div>
    </div>`;
  document.body.appendChild(ov);
  ov.addEventListener("click", e => { if(e.target === ov) ov.classList.remove("open"); });
  $c("cpClose").onclick = ()=> ov.classList.remove("open");
  $c("cpSearch").addEventListener("input", renderPicker);
  $c("cpFilters").querySelectorAll(".chip").forEach(c => c.onclick = ()=>{
    $c("cpFilters").querySelectorAll(".chip").forEach(x=>x.classList.remove("on"));
    c.classList.add("on"); renderPicker();
  });
  document.addEventListener("keydown", e=>{ if(e.key === "Escape") ov.classList.remove("open"); });
}
function renderPicker(){
  const q = ($c("cpSearch").value||"").trim().toLowerCase();
  const f = $c("cpFilters").querySelector(".chip.on").dataset.f;
  let html = "", n = 0;
  UNITS.forEach((u,i)=>{
    if(f === "6" && u[9] !== 6) return;
    if(f === "7" && u[9] !== 7) return;
    if(f === "stats" && u[1] == null) return;
    if(q && !u[0].toLowerCase().includes(q)) return;
    n++;
    const sub = u[1] != null ? "DPS " + formatHp(u[1]/u[2]) : CT.noStats;
    html += `<button class="pick-cell" data-i="${i}" title="${u[0]}">
      <span class="pc-fb">${unitInitials(u[0])}</span>
      <img decoding="async" src="${unitImgSrc(u[0])}" alt=""
           onload="this.style.display='block';this.previousElementSibling.style.display='none'"
           onerror="this.remove()">
      ${u[9]?`<span class="pc-star s${u[9]}">${u[9]}★</span>`:""}
      <span class="pc-name">${u[0]}</span><span class="pc-sub">${sub}</span></button>`;
  });
  const grid = $c("cpGrid");
  grid.innerHTML = n ? html : `<div class="empty-msg">${CT.empty}</div>`;
  grid.querySelectorAll(".pick-cell").forEach(c => c.onclick = ()=>{
    slots[pickSlot].unit = +c.dataset.i;
    slots[pickSlot].stage = "";
    $c("cpOv").classList.remove("open");
    paintSlot(pickSlot); compare();
  });
}
function openPicker(k){
  pickSlot = k;
  $c("cpOv").classList.add("open");
  $c("cpSearch").value = ""; renderPicker(); $c("cpSearch").focus();
}

/* ---------- ช่องยูนิตแต่ละข้าง ---------- */
function paintSlot(k){
  const box = $c("slot"+k), s = slots[k];
  const u = s.unit != null ? UNITS[s.unit] : null;
  const tb = u && typeof UPGRADES !== "undefined" ? UPGRADES[unitSlug(u[0])] : null;

  let stageSel;
  if(tb && tb.length){
    const opts = tb.map((r,i)=>{
      const nm = r.name ? r.name
               : (i === 0 ? CT.stageDeploy : (i === tb.length-1 ? CT.stageMax : CT.stageLv(i)));
      return `<option value="${i}" ${String(i)===s.stage?"selected":""}>${nm}</option>`;
    }).join("");
    stageSel = `<select class="cp-stage"><option value="" ${s.stage===""?"selected":""}>${CT.stageMax}</option>${opts}</select>`;
  } else {
    stageSel = `<select class="cp-stage" disabled><option>${u?CT.stageNone:"—"}</option></select>`;
  }

  const orbChips = (typeof ORBS !== "undefined") ? ORBS.map((o,i)=>
    `<button class="preset-chip" data-orb="${i}" title="${o.name}">${o.short || o.name}</button>`).join("") : "";

  box.innerHTML = `
    <button class="cp-face">${u
      ? `<span class="ui-fb">${unitInitials(u[0])}</span><img decoding="async" src="${unitImgSrc(u[0])}" alt=""
           onload="this.style.display='block';this.previousElementSibling.style.display='none'" onerror="this.remove()">`
      : `<span class="ui-fb">+</span>`}</button>
    <button class="cp-name">${u ? u[0] : CT.slot}</button>
    ${stageSel}
    <div class="cp-buffs">
      <div class="lbl">${CT.buffH}</div>
      <div class="preset-row cp-bf">${CP_BUFFS.map(b =>
        `<button class="preset-chip${s.buffs.has(b.id)?" on":""}" data-b="${b.id}">${b.label}</button>`).join("")}</div>
      <div class="lbl" style="margin-top:10px;">${CT.orbH}</div>
      <div class="preset-row cp-ob">${orbChips}</div>
      <div class="toggle-row" style="margin-top:8px;">
        <div class="lbl">${CT.elem}</div>
        <label class="switch"><input type="checkbox" class="cp-el"${s.elem?" checked":""}><span class="slider-t"></span></label>
      </div>
      <div class="btn-row" style="margin-top:8px;">
        <button class="btn cp-clear">${CT.clear}</button>
        <button class="btn cp-copy">${CT.sameBuffs}</button>
      </div>
    </div>`;

  box.querySelector(".cp-face").onclick = ()=> openPicker(k);
  box.querySelector(".cp-name").onclick = ()=> openPicker(k);
  const st = box.querySelector(".cp-stage");
  if(!st.disabled) st.onchange = ()=>{ s.stage = st.value; compare(); };

  box.querySelectorAll(".cp-bf .preset-chip").forEach(ch => ch.onclick = ()=>{
    const id = ch.dataset.b;
    if(s.buffs.has(id)) s.buffs.delete(id); else s.buffs.add(id);
    ch.classList.toggle("on");
    compare();
  });
  box.querySelectorAll(".cp-ob .preset-chip").forEach(ch => ch.onclick = ()=>{
    const i = +ch.dataset.orb;
    s.orb = (s.orb === i) ? null : i;            /* ใส่ได้ลูกเดียว กดซ้ำ = ถอด */
    box.querySelectorAll(".cp-ob .preset-chip").forEach(x =>
      x.classList.toggle("on", s.orb === +x.dataset.orb));
    compare();
  });
  box.querySelector(".cp-el").onchange = e =>{ s.elem = e.target.checked; compare(); };
  box.querySelector(".cp-clear").onclick = ()=>{
    s.buffs.clear(); s.orb = null; s.elem = false;
    paintSlot(k); compare();
  };
  box.querySelector(".cp-copy").onclick = ()=>{
    const o = slots[1-k];
    o.buffs = new Set(s.buffs); o.orb = s.orb; o.elem = s.elem;
    paintSlot(1-k); compare();
  };
  box.querySelectorAll(".cp-ob .preset-chip").forEach(x =>
    x.classList.toggle("on", s.orb === +x.dataset.orb));
}

/* ---------- บัฟของข้างนั้น ๆ (แยกกันคนละชุด ทุกอันคูณกัน) ---------- */
function slotOrb(k){
  const i = slots[k].orb;
  return (i != null && typeof ORBS !== "undefined") ? ORBS[i] : null;
}
/* แบ่งบัฟสองกลุ่มเหมือนหน้า Calculator
   A = Leader + Orb -> คูณเฉพาะดาเมจพื้นฐาน
   B = 250/300% + Support + ธาตุคัดแพ้ -> คูณดาเมจตายตัวด้วย */
const CP_A = new Set(["lead20", "lead15"]);
function slotMultA(k){
  const s = slots[k];
  let m = 1;
  CP_BUFFS.forEach(b => { if(CP_A.has(b.id) && s.buffs.has(b.id)) m *= (1 + b.v/100); });
  const o = slotOrb(k);
  if(o) m *= (1 + (o.dmg||0)/100);
  return m;
}
function slotMultB(k){
  const s = slots[k];
  let m = 1;
  CP_BUFFS.forEach(b => { if(!CP_A.has(b.id) && s.buffs.has(b.id)) m *= (1 + b.v/100); });
  if(s.elem) m *= 1.5;
  return m;
}

/* ---------- คำนวณค่าของยูนิตหนึ่งข้าง ---------- */
function statsOf(k){
  const s = slots[k];
  if(s.unit == null) return null;
  const u = UNITS[s.unit];
  if(u[1] == null) return {name:u[0], missing:true};
  const tb = typeof UPGRADES !== "undefined" ? UPGRADES[unitSlug(u[0])] : null;
  const row = (tb && s.stage !== "" && tb[+s.stage]) ? tb[+s.stage] : null;

  /* เลือกขั้นไหน ก็ใช้ค่าของขั้นนั้น ถ้าไม่เลือกใช้ค่าสุดท้ายจาก units.js */
  const dmgBase = row ? rowBase(row) : u[1];
  const dmgFlat = row ? rowFlat(row) : 0;
  const spa  = row ? row.spa : u[2];
  const rng  = row ? row.rng : u[3];
  const cost = row && tb ? tb.slice(0, +s.stage + 1).reduce((a,r)=>a+(r.cost||0),0) : u[4];

  const mA = slotMultA(k), mB = slotMultB(k);
  const orb = slotOrb(k);
  const dep = tb && tb[0] ? tb[0].rng : null;
  const pct = orb ? (orb.rng||0)/100 : 0;
  const fRng = (!pct || !rng) ? rng : ((dep && rng >= dep) ? dep*(1+pct) + (rng-dep) : rng*(1+pct));
  const netCost = cost * (1 - (orb ? (orb.cost||0) : 0)/100);
  const fDmg = dmgBase * mA * mB + dmgFlat * mB;   /* ส่วนตายตัวไม่โดน Leader/Orb */
  const dps = unitTotalDps(u[0], fDmg, spa);      /* รวม Judgement ถ้ามี */
  return {name:u[0], dmg:fDmg, spa, rng:fRng, cost:netCost,
          dps, eff: netCost > 0 ? dps/(netCost/1000) : 0};
}

/* ---------- ตารางเทียบ ---------- */
function compare(){
  const A = statsOf(0), B = statsOf(1);
  const body = $c("cpRows"), verdict = $c("cpVerdict");
  $c("cpNameA").textContent = A ? A.name : "—";
  $c("cpNameB").textContent = B ? B.name : "—";

  if(!A || !B || A.missing || B.missing){
    body.innerHTML = `<div class="empty-msg">${CT.pickBoth}</div>`;
    verdict.style.display = "none";
    return;
  }

  const rows = [
    ["dps",  CT.rows.dps,  A.dps,  B.dps,  "high"],
    ["dmg",  CT.rows.dmg,  A.dmg,  B.dmg,  "high"],
    ["spa",  CT.rows.spa,  A.spa,  B.spa,  "low"],
    ["rng",  CT.rows.rng,  A.rng,  B.rng,  "high"],
    ["cost", CT.rows.cost, A.cost, B.cost, "low"],
    ["eff",  CT.rows.eff,  A.eff,  B.eff,  "high"],
  ];
  body.innerHTML = rows.map(([k,label,a,b,dir])=>{
    const better = a === b ? 0 : (dir === "high" ? (a > b ? -1 : 1) : (a < b ? -1 : 1));
    const f = v => (k === "spa" || k === "rng") ? Math.round(v*10)/10 : formatHp(v);
    return `<div class="cp-row">
      <span class="cp-v ${better===-1?"win":""}">${f(a)}</span>
      <span class="cp-k">${label}<small>${dir==="high"?CT.higher:CT.lower}</small></span>
      <span class="cp-v ${better===1?"win":""}">${f(b)}</span>
    </div>`;
  }).join("");

  verdict.style.display = "";
  if(Math.abs(A.dps - B.dps) < 1e-9){
    verdict.className = "cp-verdict tie";
    verdict.textContent = CT.tie;
  } else {
    const hi = A.dps > B.dps ? A : B, lo = A.dps > B.dps ? B : A;
    const p = lo.dps > 0 ? ((hi.dps/lo.dps - 1)*100) : 100;
    const eHi = A.eff > B.eff ? A : B, eLo = A.eff > B.eff ? B : A;
    const ep = eLo.eff > 0 ? ((eHi.eff/eLo.eff - 1)*100) : 0;
    verdict.className = "cp-verdict";
    verdict.innerHTML = `<b>${CT.winner(hi.name, p < 10 ? p.toFixed(1) : p.toFixed(0))}</b>` +
      (eHi.name !== hi.name && ep > 0
        ? `<small>${CT.effNote(eHi.name, ep < 10 ? ep.toFixed(1) : ep.toFixed(0))}</small>` : "");
  }
}

/* ---------- เริ่มต้น ---------- */
buildPicker();
$c("cpSwap").onclick = ()=>{
  [slots[0], slots[1]] = [slots[1], slots[0]];   /* สลับทั้งยูนิตและบัฟของข้างนั้น */
  paintSlot(0); paintSlot(1); compare();
};
paintSlot(0); paintSlot(1); compare();
