/* ============================================================
   ASTD Comp — หน้า Team (ใช้ร่วมกัน team.html + team-en.html)
   ตั้ง window.TEAM_LANG = "th" | "en" ก่อนโหลดไฟล์นี้
   ============================================================ */

const TEAM_STRINGS = {
  th: {
    team:       t => `ทีม ${t}`,
    addUnit:    "+ เพิ่มยูนิต",
    pickTitle:  "เลือกยูนิต",
    pickSearch: "พิมพ์ชื่อยูนิต…",
    pickEmpty:  "ไม่เจอยูนิตที่ค้นหา",
    pickSlot:   "กดเพื่อเลือกยูนิต",
    custom:     "กรอก DPS เอง",
    noStats:    "ยังไม่มีสถิติ",
    close:      "ปิด",
    stageMax:   "ขั้นสุดท้าย",
    stageDeploy:"วางครั้งแรก",
    stageLv:    n => `อัปขั้นที่ ${n}`,
    stageOnly:  "ไม่มีข้อมูลรายขั้น",
    buffNone:   "ไม่บัฟ (100%)",
    buff:       p => `บัฟ ${p}%`,
    copies:     "จำนวนตัว",
    dpsField:   "DPS",
    orderAdd:   "+ ใส่ในลำดับการ์ด",
    orderDrop:  "✓ อยู่ในลำดับแล้ว",
    orderMore:  n => `+ ใส่อีกใบ (ตอนนี้ ${n} ใบ)`,
    dpsNo:      n => `Team DPS #${n}`,
    secShort:   "ยิง",
    secUnit:    "วิ",
    orderEmpty: "ยังไม่มีการ์ด — กดปุ่ม \"ใส่ในลำดับการ์ด\" ที่การ์ดทางซ้าย",
    left:       p => `เหลือ ${p}% ของเลือดเต็ม`,
    dead:       "มอนตายตรงนี้",
    dpsTotal:   n => `จาก ${n} ทีมที่ใช้งาน`,
    dpsNone:    "ยังไม่ได้เพิ่มยูนิตในทีม",
    cDps:       "Team DPS",
    cDpsSub:    (s,d) => `ยิง ${s} วิ ด้วย DPS รวม ${formatHp(d)}`,
    fireSec:    "ยิงกี่วิ",
    rmCard:     "เอาการ์ดใบนี้ออก",
    inOrderN:   n => `✓ อยู่ในลำดับ ${n} ใบ`,
    dpsBuffed:  p => ` (รวมบัฟ +${p}%)`,
    cGil:       "Gilgamesh",  cGilSub: "ตัดลงไปที่ 25% ของเลือดเต็ม",
    cMad:       "Madara",     cMadSub: "ตัดลงไปที่ 33% ของเลือดเต็ม",
    cLuf:       "Luffy",      cLufSub: p => `ตัดเลือดที่เหลือลง ${p}%`,
    cTboi:      "TBOI",       cTboiSub: d => `ระเบิด ${formatHp(d)}`,
    stHp:       (w,e,p,m) => `เลือดมอน Wave ${w} (${e}, ${p} คน ×${m})`,
    stGil:      "→ เหลือ 25% ของเลือดเต็ม",
    stMad:      "→ เหลือ 33% ของเลือดเต็ม",
    stNoEff:    p => `— ไม่มีผล (เลือดต่ำกว่า ${p}% อยู่แล้ว)`,
    stLuf:      p => `→ ตัดที่เหลือลง ${p}%`,
    stTboi:     d => `→ ระเบิด ${formatHp(d)}`,
    stDps:      (s,d) => `→ ยิง ${s} วิ (${formatHp(d)})`,
    passBig:    "✔ เคลียร์ได้",
    passSub:    s => `ใช้เวลายิงจริง ≈ ${s} วินาที`,
    failBig:    "✖ ยังเคลียร์ไม่ได้",
    failSub:    (hp,pct,extra) => `เหลือเลือด ${hp} (${pct}% ของเลือดเต็ม)${extra}`,
    teamSum:    v => `DPS รวมทีมนี้ ${v}`,
    teamEmpty:  "ยังไม่มียูนิต",
    leaderTag:  "Leader",
    leaderHint: "ยูนิตตัวแรกของแต่ละทีมคือ Leader",
    leaderSkill:s => `Leader: ${s}`,
    leaderNone: "ยูนิตตัวนี้ยังไม่มีข้อมูล Leader Skill",
    leaderGot:  p => `+${p}% จาก Leader`,
    failNeed:   s => ` — ต้องยิงเพิ่มอีก ≈ ${s} วิ หรือเพิ่ม DPS/การ์ด`,
    failNoDps:  " — ทีมยังไม่มี DPS",
  },
  en: {
    team:       t => `Team ${t}`,
    addUnit:    "+ Add unit",
    pickTitle:  "Pick a unit",
    pickSearch: "Type a unit name…",
    pickEmpty:  "No unit matches that search",
    pickSlot:   "Tap to pick a unit",
    custom:     "Enter DPS manually",
    noStats:    "no stats yet",
    close:      "Close",
    stageMax:   "Max upgrade",
    stageDeploy:"Deployment",
    stageLv:    n => `Upgrade ${n}`,
    stageOnly:  "no per-upgrade data",
    buffNone:   "No buff (100%)",
    buff:       p => `Buff ${p}%`,
    copies:     "Copies",
    dpsField:   "DPS",
    orderAdd:   "+ Add to card order",
    orderDrop:  "✓ In card order",
    orderMore:  n => `+ Add another (${n} in order)`,
    dpsNo:      n => `Team DPS #${n}`,
    secShort:   "Fire",
    secUnit:    "s",
    orderEmpty: "No cards yet — press \"Add to card order\" on a card at the left",
    left:       p => `${p}% of full HP left`,
    dead:       "enemy dies here",
    dpsTotal:   n => `across ${n} active teams`,
    dpsNone:    "No units added yet",
    cDps:       "Team DPS",
    cDpsSub:    (s,d) => `fires ${s}s at ${formatHp(d)} DPS`,
    fireSec:    "Fire (s)",
    rmCard:     "Remove this card",
    inOrderN:   n => `✓ ${n} in card order`,
    dpsBuffed:  p => ` (incl. +${p}% buffs)`,
    cGil:       "Gilgamesh",  cGilSub: "cuts down to 25% of full HP",
    cMad:       "Madara",     cMadSub: "cuts down to 33% of full HP",
    cLuf:       "Luffy",      cLufSub: p => `cuts remaining HP by ${p}%`,
    cTboi:      "TBOI",       cTboiSub: d => `detonates for ${formatHp(d)}`,
    stHp:       (w,e,p,m) => `Enemy HP, wave ${w} (${e}, ${p}p ×${m})`,
    stGil:      "→ down to 25% of full HP",
    stMad:      "→ down to 33% of full HP",
    stNoEff:    p => `— no effect (already below ${p}%)`,
    stLuf:      p => `→ cuts remaining by ${p}%`,
    stTboi:     d => `→ detonates ${formatHp(d)}`,
    stDps:      (s,d) => `→ ${s}s of fire (${formatHp(d)})`,
    passBig:    "✔ Clears",
    passSub:    s => `actual fire time ≈ ${s}s`,
    failBig:    "✖ Not enough",
    failSub:    (hp,pct,extra) => `${hp} HP left (${pct}% of full HP)${extra}`,
    teamSum:    v => `This team ${v} DPS`,
    teamEmpty:  "no units yet",
    leaderTag:  "Leader",
    leaderHint: "the first unit in each team is the Leader",
    leaderSkill:s => `Leader: ${s}`,
    leaderNone: "no Leader Skill data for this unit yet",
    leaderGot:  p => `+${p}% from Leader`,
    failNeed:   s => ` — about ${s}s more of fire, or add DPS / another card`,
    failNoDps:  " — the team has no DPS yet",
  },
};
const TT = TEAM_STRINGS[window.TEAM_LANG || "th"];

const $ = id => document.getElementById(id);
let players = 1;
let uidSeq = 0;
let order = [newCard("dps")];
/* การ์ดหนึ่งใบ = {k:ชนิด, uid:ไอดีไว้ลบ/ลากสลับ, sec:วินาที (เฉพาะ Team DPS)} */
function newCard(k){ return k === "dps" ? {k, uid:++uidSeq, sec:60} : {k, uid:++uidSeq}; }
function cardDps(c){ return teamDps() * Math.max(0, c.sec || 0); }   /* teamDps() รวมบัฟให้แล้ว */
const TBOI_BASE = 250e9;
const BUFF_CHOICES = [100, 250, 300];

/* ---------- DPS ของยูนิตหนึ่งแถว ----------
   ขั้นอัปเกรด: upgrades.js เก็บตัวเลขคอลัมน์ Level 1 ส่วน units.js เป็น Level 175
   จึงใช้ "สัดส่วนของขั้นนั้นเทียบขั้นสุดท้าย" มาคูณกับ DPS เต็มแทน
   ค่าที่ได้จึงอยู่ในสเกลเดียวกับหน้า Calculator                              */
function stageRatio(slug, stage){
  const tb = (typeof UPGRADES !== "undefined") ? UPGRADES[slug] : null;
  if(!tb || !tb.length || stage == null || stage >= tb.length) return 1;
  /* ตัวอ้างอิงคือขั้นอัปเกรดสูงสุดจริง ๆ (แถวที่ตรงกับสถิติใน units.js)
     ไม่ใช่แถวสุดท้าย เพราะบางยูนิตมีแถวพิเศษที่มาจากสกิลต่อท้ายอีกที */
  const ref = [...tb].reverse().find(r => !r.flat) || tb[tb.length-1];
  const s = tb[stage];
  const dpsOf = r => rowDmgTotal(r) / (r.spa || 1);   /* นับดาเมจตายตัวด้วย */
  const top = dpsOf(ref);
  return top > 0 ? dpsOf(s) / top : 1;
}
/* ---------- Leader: ยูนิตแถวแรกของทีม ---------- */
function unitTags(name){
  const d = (typeof CATEGORIES !== "undefined") ? CATEGORIES[unitSlug(name)] : null;
  return (d && d.tags) ? d.tags : null;
}
function teamBoost(t){
  const first = document.querySelector(`#rows${t} .u-item`);
  if(!first) return null;
  const idx = first.dataset.unit;
  if(idx === "" || idx === "custom") return null;
  const d = (typeof CATEGORIES !== "undefined") ? CATEGORIES[unitSlug(UNITS[+idx][0])] : null;
  return (d && d.boost) ? {...d.boost, leader: d.leader, name: UNITS[+idx][0]} : {leader:null, name:UNITS[+idx][0]};
}
/* ยูนิตได้บัฟจาก Leader ไหม — ต้องมีหมวดตรงกับที่ Leader บัฟ */
function boostedBy(boost, row){
  if(!boost || !boost.cat || !boost.atk) return 0;
  const idx = row.dataset.unit;
  if(idx === "" || idx === "custom") return 0;
  const tags = unitTags(UNITS[+idx][0]);
  return (tags && tags.includes(boost.cat)) ? boost.atk : 0;
}

function rowDps(row, boost){
  const d = row.dataset;
  if(d.unit === "") return 0;                       /* ยังไม่ได้เลือกยูนิต */
  if(d.unit === "custom") return (parseFloat(d.val) || 0);
  const u = UNITS[+d.unit];
  if(!u || u[1] == null) return (parseFloat(d.val) || 0);
  const base  = unitTotalDps(u[0], u[1], u[2]);   /* รวม Judgement ถ้ามี */
  const stage = d.stage === "" ? null : +d.stage;
  const copies= Math.max(1, parseFloat(d.count) || 1);
  const lead = 1 + boostedBy(boost, row)/100;
  return base * stageRatio(unitSlug(u[0]), stage) * ((+d.buff || 100) / 100) * lead * copies;
}
/* อัปเดตตัวเลข DPS ใต้ชื่อยูนิตทุกแถว + ยอดรวมของแต่ละทีม */
function refreshTeamNumbers(){
  for(let t = 1; t <= 4; t++){
    let sum = 0;
    const boost = teamBoost(t);
    document.querySelectorAll(`#rows${t} .u-item`).forEach((r,ri)=>{
      const v = rowDps(r, boost);
      const badge = r.querySelector(".ui-lead");
      if(badge) badge.style.display = ri === 0 ? "" : "none";
      const got = boostedBy(boost, r);
      const gb = r.querySelector(".ui-boost");
      if(gb){ gb.style.display = got ? "" : "none"; gb.textContent = got ? TT.leaderGot(got) : ""; }
      sum += v;
      const small = r.querySelector(".ui-name small");
      const d = r.dataset;
      const u = (d.unit !== "" && d.unit !== "custom") ? UNITS[+d.unit] : null;
      if(!small) return;
      if(d.unit === "" ) small.textContent = "";
      else if(u && u[1] == null) small.textContent = v > 0 ? "DPS " + formatHp(v) : TT.noStats;
      else small.textContent = "DPS " + formatHp(v);
    });
    const box = $("tsum"+t);
    if(box) box.textContent = $("rows"+t).children.length
      ? TT.teamSum(formatHp(sum)) : TT.teamEmpty;

    const lead = $("tlead"+t);
    if(lead){
      if(!boost){ lead.style.display = "none"; }
      else {
        lead.style.display = "";
        const lang = (window.TEAM_LANG === "en") ? "en" : "th";
        lead.textContent = boost.leader
          ? TT.leaderSkill(boost.leader[lang] || boost.leader.en)
          : TT.leaderSkill(boost.name + " — " + TT.leaderNone);
      }
    }
  }
}

function teamDps(){
  let total = 0;
  for(let t = 1; t <= players; t++){
    const boost = teamBoost(t);
    document.querySelectorAll(`#rows${t} .u-item`).forEach(r => total += rowDps(r, boost));
  }
  return total * buffMult("dpsBuffs");   /* Idol / Judgement / FV / Purify */
}

/* ============================================================
   ตัวเลือกยูนิต — กริดรูปเหมือนหน้า Units แทนการพิมพ์ในดรอปดาวน์
   ============================================================ */
let pickTarget = null;
function buildPicker(){
  const ov = document.createElement("div");
  ov.className = "pick-ov"; ov.id = "pickOv";
  ov.innerHTML = `
    <div class="pick-box">
      <div class="pick-head">
        <h3>${TT.pickTitle}</h3>
        <button class="btn" id="pickClose">${TT.close}</button>
      </div>
      <input class="pick-search" id="pickSearch" type="search" placeholder="${TT.pickSearch}">
      <div class="pick-filters" id="pickFilters">
        <button class="chip on" data-f="all">All</button>
        <button class="chip" data-f="6">6★</button>
        <button class="chip" data-f="7">7★</button>
        <button class="chip" data-f="stats">DPS</button>
      </div>
      <div class="pick-grid" id="pickGrid"></div>
    </div>`;
  document.body.appendChild(ov);
  ov.addEventListener("click", e => { if(e.target === ov) closePicker(); });
  $("pickClose").onclick = closePicker;
  $("pickSearch").addEventListener("input", renderPicker);
  $("pickFilters").querySelectorAll(".chip").forEach(c => c.onclick = ()=>{
    $("pickFilters").querySelectorAll(".chip").forEach(x => x.classList.remove("on"));
    c.classList.add("on"); renderPicker();
  });
}
function renderPicker(){
  const q = ($("pickSearch").value || "").trim().toLowerCase();
  const f = $("pickFilters").querySelector(".chip.on").dataset.f;
  const grid = $("pickGrid");
  let html = `<button class="pick-cell custom" data-i="custom">
      <span class="pc-fb">DPS</span><span class="pc-name">${TT.custom}</span></button>`;
  let n = 0;
  UNITS.forEach((u,i)=>{
    if(f === "6" && u[9] !== 6) return;
    if(f === "7" && u[9] !== 7) return;
    if(f === "stats" && u[1] == null) return;
    if(q && !u[0].toLowerCase().includes(q)) return;
    n++;
    const sub = u[1] != null ? "DPS " + formatHp(u[1]/u[2]) : TT.noStats;
    html += `<button class="pick-cell" data-i="${i}" title="${u[0]}">
      <span class="pc-fb">${unitInitials(u[0])}</span>
      <img decoding="async" src="${unitImgSrc(u[0])}" alt=""
           onload="this.style.display='block';this.previousElementSibling.style.display='none'"
           onerror="this.remove()">
      ${u[9] ? `<span class="pc-star s${u[9]}">${u[9]}★</span>` : ""}
      <span class="pc-name">${u[0]}</span><span class="pc-sub">${sub}</span></button>`;
  });
  grid.innerHTML = n ? html : `<div class="empty-msg">${TT.pickEmpty}</div>`;
  grid.querySelectorAll(".pick-cell").forEach(c => c.onclick = ()=>{
    applyPick(c.dataset.i); closePicker();
  });
}
function openPicker(row){
  pickTarget = row;
  $("pickOv").classList.add("open");
  $("pickSearch").value = "";
  renderPicker();
  $("pickSearch").focus();
}
function closePicker(){ $("pickOv").classList.remove("open"); pickTarget = null; }

function applyPick(val){
  if(!pickTarget) return;
  pickTarget.dataset.unit  = val;
  pickTarget.dataset.stage = "";
  if(val === "custom"){ pickTarget.dataset.val = pickTarget.dataset.val || ""; }
  paintRow(pickTarget);
  calcTeam();
}

/* ============================================================
   แถวยูนิตในทีม
   ============================================================ */
function addUnitRow(t){
  const rows = $("rows"+t);
  if(rows.children.length >= 6) return;
  const row = document.createElement("div");
  row.className = "u-item";
  Object.assign(row.dataset, {unit:"", stage:"", buff:"100", count:"1", val:""});
  rows.appendChild(row);
  paintRow(row);
  updateCnt(t); calcTeam();
}
function paintRow(row){
  const d = row.dataset;
  const isCustom = d.unit === "custom";
  const u = (d.unit !== "" && !isCustom) ? UNITS[+d.unit] : null;
  const hasStats = !!(u && u[1] != null);
  const slug = u ? unitSlug(u[0]) : "";
  const tb = (u && typeof UPGRADES !== "undefined") ? UPGRADES[slug] : null;

  /* หัวแถว: ปุ่มเปิดตัวเลือกยูนิต */
  let face;
  if(u){
    face = `<img decoding="async" src="${unitImgSrc(u[0])}" alt=""
              onload="this.style.display='block';this.previousElementSibling.style.display='none'"
              onerror="this.remove()">`;
    face = `<span class="ui-fb">${unitInitials(u[0])}</span>${face}`;
  } else {
    face = `<span class="ui-fb">${isCustom ? "DPS" : "+"}</span>`;
  }
  const label = u ? u[0] : (isCustom ? TT.custom : TT.pickSlot);
  const sub   = hasStats ? "DPS " + formatHp(rowDps(row)) : (u ? TT.noStats : "");

  /* ขั้นอัปเกรด */
  let stageSel = "";
  if(tb && tb.length){
    const opts = tb.map((r,i)=>{
      const nm = r.name ? r.name
               : (i === 0 ? TT.stageDeploy : (i === tb.length-1 ? TT.stageMax : TT.stageLv(i)));
      return `<option value="${i}" ${String(i)===d.stage?"selected":""}>${nm}</option>`;
    }).join("");
    stageSel = `<select class="u-stage"><option value="" ${d.stage===""?"selected":""}>${TT.stageMax}</option>${opts}</select>`;
  } else {
    stageSel = `<select class="u-stage" disabled><option>${u ? TT.stageOnly : "—"}</option></select>`;
  }

  /* บัฟดาเมจ */
  const buffSel = `<select class="u-buff">` + BUFF_CHOICES.map(p =>
      `<option value="${p}" ${String(p)===d.buff?"selected":""}>${p===100?TT.buffNone:TT.buff(p)}</option>`
    ).join("") + `</select>`;

  const numField = (isCustom || (u && !hasStats))
    ? `<input class="u-num" type="number" min="0" step="any" value="${d.val}" placeholder="${TT.dpsField}" title="${TT.dpsField}">`
    : `<input class="u-num" type="number" min="1" step="1" value="${d.count}" title="${TT.copies}">`;

  row.innerHTML = `
    <div class="ui-top">
      <button class="ui-face">${face}<span class="ui-lead" style="display:none;">${TT.leaderTag}</span></button>
      <button class="ui-name"><b>${label}</b><small>${sub}</small>
        <span class="ui-boost" style="display:none;"></span></button>
      <button class="ui-rm" title="✕">✕</button>
    </div>
    <div class="ui-ctl">${stageSel}${buffSel}${numField}</div>`;

  const open = ()=> openPicker(row);
  row.querySelector(".ui-face").onclick = open;
  row.querySelector(".ui-name").onclick = open;
  row.querySelector(".ui-rm").onclick = ()=>{
    const t = row.closest(".team-box").dataset.t;
    row.remove(); updateCnt(t); calcTeam();
  };
  const st = row.querySelector(".u-stage");
  if(!st.disabled) st.onchange = ()=>{ d.stage = st.value; calcTeam(); };
  row.querySelector(".u-buff").onchange = e =>{ d.buff = e.target.value; calcTeam(); };
  row.querySelector(".u-num").addEventListener("input", e =>{
    if(isCustom || (u && !hasStats)) d.val = e.target.value; else d.count = e.target.value;
    calcTeam();
  });
}
function buildTeams(){
  const grid = $("teamGrid");
  for(let t = 1; t <= 4; t++){
    const box = document.createElement("div");
    box.className = "team-box"; box.id = "team"+t; box.dataset.t = t;
    box.innerHTML = `<h3>${TT.team(t)} <span class="cnt" id="cnt${t}">0/6</span></h3>
      <div class="team-sum" id="tsum${t}">${TT.teamEmpty}</div>
      <div class="team-lead" id="tlead${t}" style="display:none;"></div>
      <div class="unit-rows" id="rows${t}"></div>
      <button class="btn add-u">${TT.addUnit}</button>`;
    grid.appendChild(box);
    box.querySelector(".add-u").onclick = ()=> addUnitRow(t);
  }
}
function updateCnt(t){
  const n = $("rows"+t).children.length;
  $("cnt"+t).textContent = n + "/6";
  document.querySelector(`#team${t} .add-u`).style.display = n >= 6 ? "none" : "block";
}
function applyPlayers(){
  for(let t = 1; t <= 4; t++) $("team"+t).classList.toggle("off", t > players);
}

/* ============================================================
   การ์ด — กดปุ่มเพื่อใส่/เอาออกจากลำดับการ์ด (เดิมเป็นสวิตช์)
   ============================================================ */
const CARD_INFO = {
  dps:  {name: TT.cDps,  sub: c => TT.cDpsSub(c.sec, teamDps())},
  gil:  {name: TT.cGil,  sub: () => TT.cGilSub},
  mad:  {name: TT.cMad,  sub: () => TT.cMadSub},
  luf:  {name: TT.cLuf,  sub: () => TT.cLufSub((25*buffMult("lufBuffs")).toFixed(1))},
  tboi: {name: TT.cTboi, sub: () => TT.cTboiSub(TBOI_BASE*buffMult("tboiBuffs"))},
};
function paintCardBtns(){
  document.querySelectorAll(".t-card").forEach(card=>{
    const key = card.dataset.card;
    const n = order.filter(c => c.k === key).length;
    card.classList.toggle("on", n > 0);
    const b = card.querySelector(".card-add");
    b.textContent = n ? TT.orderMore(n) : TT.orderAdd;
    b.classList.toggle("added", n > 0);
  });
}
/* บัฟเสริมหลายอันซ้อนกัน = คูณกัน เช่น Idol +15% กับ FV +35% -> x1.15 * x1.35 = x1.5525 */
function buffMult(id){
  let m = 1;
  document.querySelectorAll(`#${id} .preset-chip.on`).forEach(c => m *= (1 + (+c.dataset.b)/100));
  return m;
}

/* ============================================================
   ลำดับการ์ด + ผลลัพธ์
   ============================================================ */
function renderOrder(){
  const list = $("orderList");
  list.innerHTML = "";
  if(!order.length){ list.innerHTML = `<div class="empty-msg">${TT.orderEmpty}</div>`; return; }
  order.forEach((o, idx)=>{
    const it = document.createElement("div");
    it.className = "order-item"; it.draggable = true;
    it.dataset.key = o.k; it.dataset.uid = o.uid;
    const secBox = o.k === "dps"
      ? `<label class="o-sec">${TT.fireSec}<input type="number" min="0" step="1" value="${o.sec}"></label>`
      : "";
    it.innerHTML = `<span class="grip">⋮⋮</span><span class="o-num">${idx+1}</span>
      <span class="o-name">${CARD_INFO[o.k].name}<small>${CARD_INFO[o.k].sub(o)}</small>
        <span class="o-pct"></span>${secBox}</span>
      <span class="o-btns">
        <button class="mv" data-d="-1">▲</button>
        <button class="mv" data-d="1">▼</button>
        <button class="mv rm" title="${TT.rmCard}">✕</button>
      </span>`;
    it.querySelectorAll(".mv[data-d]").forEach(b => b.onclick = ()=>{
      const j = idx + (+b.dataset.d);
      if(j < 0 || j >= order.length) return;
      [order[idx], order[j]] = [order[j], order[idx]];
      renderOrder(); calcTeam();
    });
    it.querySelector(".rm").onclick = ()=>{
      order = order.filter(x => x.uid !== o.uid);
      paintCardBtns(); renderOrder(); calcTeam();
    };
    const sec = it.querySelector(".o-sec input");
    if(sec){
      /* ลากการ์ดไม่ให้ขวางการพิมพ์ในช่องวินาที */
      sec.addEventListener("mousedown", e => e.stopPropagation());
      sec.addEventListener("focus", ()=> it.draggable = false);
      sec.addEventListener("blur",  ()=> it.draggable = true);
      sec.addEventListener("input", ()=>{
        o.sec = Math.max(0, parseFloat(sec.value) || 0);
        it.querySelector(".o-name small").textContent = CARD_INFO.dps.sub(o);
        calcTeam();
      });
    }
    it.addEventListener("dragstart", ()=> it.classList.add("dragging"));
    it.addEventListener("dragend", ()=>{
      it.classList.remove("dragging");
      const uids = [...list.querySelectorAll(".order-item")].map(x => +x.dataset.uid);
      order = uids.map(u => order.find(o2 => o2.uid === u)).filter(Boolean);
      renderOrder(); calcTeam();
    });
    list.appendChild(it);
  });
}

function calcTeam(){
  const wave  = Math.max(1, parseInt($("wave").value)||1);
  const emult = ENEMY_MULTS[$("etype").value];
  const maxHp = calculateBaseHp(wave) * PLAYER_MULTS[players] * emult;
  let hp = maxHp;

  refreshTeamNumbers();
  const dps = teamDps();
  $("teamDpsOut").textContent = formatHp(dps);
  const bp = (buffMult("dpsBuffs") - 1) * 100;
  $("dpsNote").textContent = dps > 0
    ? TT.dpsTotal(players) + (bp > 0 ? TT.dpsBuffed(bp.toFixed(0)) : "")
    : TT.dpsNone;

  const steps = [{k: TT.stHp(wave, $("etype").selectedOptions[0].text, players, PLAYER_MULTS[players]),
                  v: formatHp(hp)}];
  const pct = [];          /* % เลือดที่เหลือหลังการ์ดใบนั้น */
  let killedAt = null;

  let dpsSeen = 0;
  const dpsTotal = order.filter(c => c.k === "dps").length;

  order.forEach((card, idx)=>{
    const key = card.k, n = idx + 1;
    if(hp <= 0){ pct.push(0); return; }
    if(key === "gil" || key === "mad"){
      const p = key === "gil" ? 0.25 : 0.33;
      const nm = key === "gil" ? TT.cGil : TT.cMad;
      const target = maxHp * p;
      if(hp > target){ hp = target; steps.push({k:`${n}. ${nm} ${key==="gil"?TT.stGil:TT.stMad}`, v: formatHp(hp)}); }
      else steps.push({k:`${n}. ${nm} <span class="noeff">${TT.stNoEff(p*100)}</span>`, v: formatHp(hp)});
    }
    else if(key === "luf"){
      const cut = Math.min(0.25 * buffMult("lufBuffs"), 1);
      hp *= (1 - cut);
      steps.push({k:`${n}. ${TT.cLuf} ${TT.stLuf((cut*100).toFixed(1))}`, v: formatHp(hp)});
    }
    else if(key === "tboi"){
      const boom = TBOI_BASE * buffMult("tboiBuffs");
      hp = Math.max(0, hp - boom);
      steps.push({k:`${n}. ${TT.cTboi} ${TT.stTboi(boom)}`, v: formatHp(hp)});
    }
    else if(key === "dps"){
      const dealt = cardDps(card);
      const label = dpsTotal > 1 ? TT.dpsNo(++dpsSeen) : TT.cDps;
      const before = hp;
      hp = Math.max(0, hp - dealt);
      steps.push({k:`${n}. ${label} ${TT.stDps(card.sec, dealt)}`, v: formatHp(hp)});
      if(hp <= 0 && dealt > 0) killedAt = before / (dealt / Math.max(card.sec, 1e-9));
    }
    pct.push(maxHp > 0 ? (hp / maxHp) * 100 : 0);
  });

  /* ข้อ 4 — บอก % เลือดที่เหลือบนการ์ดแต่ละใบในลำดับ */
  [...$("orderList").querySelectorAll(".order-item")].forEach((el, i)=>{
    const box = el.querySelector(".o-pct");
    if(!box) return;
    const p = pct[i];
    if(p == null){ box.textContent = ""; return; }
    if(p <= 0){ box.textContent = "☠ " + TT.dead; box.className = "o-pct dead"; return; }
    box.textContent = TT.left(p < 10 ? p.toFixed(2) : p.toFixed(1));
    box.className = "o-pct" + (p <= 33 ? " low" : p <= 66 ? " mid" : "");
  });

  $("steps").innerHTML = steps.map(s =>
    `<div class="step"><span class="k">${s.k}</span><span class="v">${s.v}</span></div>`).join("");

  const verdict = $("verdict");
  verdict.style.display = "block";
  if(hp <= 0){
    verdict.className = "verdict pass";
    const extra = killedAt != null ? TT.passSub(killedAt < 1 ? killedAt.toFixed(2) : killedAt.toFixed(1)) : "";
    verdict.innerHTML = `<div class="big">${TT.passBig}</div><small>${extra}</small>`;
  } else {
    verdict.className = "verdict fail";
    const need = dps > 0 ? hp/dps : 0;
    const extra = dps > 0
      ? TT.failNeed(need >= 1000 ? formatHp(need) : need.toFixed(1))
      : TT.failNoDps;
    const leftPct = maxHp > 0 ? (hp/maxHp)*100 : 0;
    verdict.innerHTML = `<div class="big">${TT.failBig}</div><small>${
      TT.failSub(formatHp(hp), leftPct < 10 ? leftPct.toFixed(2) : leftPct.toFixed(1), extra)}</small>`;
  }
}

/* ---------- เชื่อมทุกอย่างเข้าด้วยกัน ---------- */
$("orderList").addEventListener("dragover", e=>{
  e.preventDefault();
  const list = $("orderList");
  const dragging = list.querySelector(".dragging");
  if(!dragging) return;
  const after = [...list.querySelectorAll(".order-item:not(.dragging)")]
    .find(el => e.clientY <= el.getBoundingClientRect().top + el.offsetHeight/2);
  if(after) list.insertBefore(dragging, after); else list.appendChild(dragging);
});
document.querySelectorAll(".t-card .card-add").forEach(b=>{
  b.onclick = ()=>{
    order.push(newCard(b.closest(".t-card").dataset.card));  /* กดซ้ำ = ใส่อีกใบ */
    paintCardBtns(); renderOrder(); calcTeam();
  };
});
document.querySelectorAll("#dpsBuffs .preset-chip, #lufBuffs .preset-chip, #tboiBuffs .preset-chip").forEach(c=>{
  c.onclick = ()=>{ c.classList.toggle("on"); renderOrder(); calcTeam(); };
});
document.querySelectorAll("#pChips .preset-chip").forEach(c=>{
  c.onclick = ()=>{
    document.querySelectorAll("#pChips .preset-chip").forEach(x => x.classList.remove("on"));
    c.classList.add("on");
    players = +c.dataset.p;
    applyPlayers(); calcTeam();
  };
});
["wave","etype"].forEach(id => $(id).addEventListener("input", ()=>{ renderOrder(); calcTeam(); }));
document.addEventListener("keydown", e => { if(e.key === "Escape") closePicker(); });

buildPicker();
buildTeams();
addUnitRow(1);
applyPlayers();
paintCardBtns();
renderOrder();
calcTeam();
