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
    orbNone:    "ไม่ใส่ Orb",
    unitBuffs:  "บัฟจากยูนิต",
    dpsField:   "DPS",
    orderAdd:   "+ ใส่ในลำดับการ์ด",
    orderDrop:  "✓ อยู่ในลำดับแล้ว",
    orderMore:  n => `+ ใส่อีกใบ (ตอนนี้ ${n} ใบ)`,
    orderFull:  n => `ใส่ครบแล้ว (${n} ใบ)`,
    cardBuffs:  "บัฟของใบนี้",
    dotCount:   n => `นับ ${n} รวมใน DPS`,
    dotSec:     "ระยะเวลา",
    dpsNo:      n => `Team DPS #${n}`,
    secShort:   "ยิง",
    secUnit:    "วิ",
    orderEmpty: "ยังไม่มีการ์ด — กดปุ่ม \"ใส่ในลำดับการ์ด\" ที่การ์ดทางซ้าย",
    left:       p => `เหลือ ${p}% ของเลือดเต็ม`,
    dead:       "มอนตายตรงนี้",
    dpsTotal:   n => `จาก ${n} ทีมที่ใช้งาน`,
    dpsNone:    "ยังไม่ได้เพิ่มยูนิตในทีม",
    cDps:       "Team DPS",
    cDpsSub:    (s,d) => `ยิง ${s} วิ — มอนทุกตัวโดนตัวละ ${formatHp(d)}`,
    cSnap:      "Team DPS Snapshot",
    cSnapSub:   (s,d,t) => `บันทึกไว้ ${formatHp(d)} DPS × ${s} วิ — ตัวละ ${formatHp(t)}`,
    snapCreate: d => `+ สร้างจาก ${formatHp(d)} DPS`,
    snapMore:   (n,d) => `+ สร้างอีกใบจาก ${formatHp(d)} DPS (ตอนนี้ ${n} ใบ)`,
    fireSec:    "ยิงกี่วิ",
    rmCard:     "เอาการ์ดใบนี้ออก",
    inOrderN:   n => `✓ อยู่ในลำดับ ${n} ใบ`,
    dpsBuffed:  p => ` (รวมบัฟ +${p}%)`,
    cGil:       "Gilgamesh",  cGilSub: "ตัดลงไปที่ 25% ของเลือดเต็ม",
    cMad:       "Madara",     cMadSub: "ตัดลงไปที่ 33% ของเลือดเต็ม",
    cLuf:       "Luffy",      cLufSub: p => `ตัดเลือดที่เหลือลง ${p}%`,
    cTboi:      "TBOI",       cTboiSub: d => `ระเบิด ${formatHp(d)} ใส่มอนทุกตัว`,
    cNetero:    "Netero Nuke", cNeteroSub: d => `ทำดาเมจ ${formatHp(d)} ใส่มอนทุกตัว`,
    cKfg:       "Kung Fu Galaxy",
    cKfgSub:    p => `ยิง ${p.sec} วิ — ปกติ ${formatHp(p.normal)} + พิษ ${formatHp(p.poison)} = ${formatHp(p.total)}`,
    cBase:      "HP Base",
    cBaseSub:   v => `ฐานมี HP ${formatHp(v)}`,
    cPolice:    "Police Girl's Hp Base",
    cPoliceSub: "เปลี่ยนดาเมจสะสมของ Police Girl จาก Team DPS ก่อนหน้าเป็น HP ฐาน",
    baseField:  "HP ของฐาน",
    stKfg:      p => `→ ยิง ${p.sec} วิ — ปกติ ${formatHp(p.normal)} + พิษ ${formatHp(p.poison)}`,
    stHp:       (from,w,n,p,m) => `ปิดเคลียร์เวฟ ${w} — รวมมอนเวฟ ${from}–${w} (${n} ตัว, ${p} คน ×${m})`,
    stGil:      "→ เหลือ 25% ของเลือดเต็ม",
    stMad:      "→ เหลือ 33% ของเลือดเต็ม",
    stNoEff:    p => `— ไม่มีผล (เลือดต่ำกว่า ${p}% อยู่แล้ว)`,
    stLuf:      p => `→ ตัดที่เหลือลง ${p}%`,
    stTboi:     d => `→ ระเบิด ${formatHp(d)} ใส่มอนทุกตัว`,
    stNetero:   d => `→ ทำดาเมจ ${formatHp(d)} ใส่มอนทุกตัว`,
    stDps:      (s,d) => `→ ยิง ${s} วิ — มอนทุกตัวโดนตัวละ ${formatHp(d)}`,
    stSnap:     (s,d,t) => `→ Snapshot ${formatHp(d)} DPS ยิง ${s} วิ — มอนทุกตัวโดนตัวละ ${formatHp(t)}`,
    stBase:     (v,n) => `→ ฐานรับมอนที่เหลือ ${n} ตัว รวม ${formatHp(v)} HP`,
    stPolice:   (hp,v,n) => `→ เปลี่ยนดาเมจสะสม ${formatHp(hp)} เป็น HP ฐาน และรับมอน ${n} ตัว (${formatHp(v)} HP)`,
    baseLeft:   v => `ฐานเหลือ ${formatHp(v)} HP`,
    enemiesLeft:n => `เหลือ ${n} ตัว`,
    noTable:    t => `ยังไม่มีข้อมูลตารางมอนแบบ ${t}`,
    baseDown:   " — HP Base ถูกทำลาย",
    passBase:   v => `ฐานเหลือ ${formatHp(v)} HP`,
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
    decelExcluded:"ไม่นับ Decelerate",
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
    orbNone:    "No Orb",
    unitBuffs:  "Unit buffs",
    dpsField:   "DPS",
    orderAdd:   "+ Add to card order",
    orderDrop:  "✓ In card order",
    orderMore:  n => `+ Add another (${n} in order)`,
    orderFull:  n => `Limit reached (${n})`,
    cardBuffs:  "buffs for this card",
    dotCount:   n => `Count ${n} in DPS`,
    dotSec:     "Duration",
    dpsNo:      n => `Team DPS #${n}`,
    secShort:   "Fire",
    secUnit:    "s",
    orderEmpty: "No cards yet — press \"Add to card order\" on a card at the left",
    left:       p => `${p}% of full HP left`,
    dead:       "enemy dies here",
    dpsTotal:   n => `across ${n} active teams`,
    dpsNone:    "No units added yet",
    cDps:       "Team DPS",
    cDpsSub:    (s,d) => `fires ${s}s — ${formatHp(d)} damage to every enemy`,
    cSnap:      "Team DPS Snapshot",
    cSnapSub:   (s,d,t) => `saved at ${formatHp(d)} DPS × ${s}s — ${formatHp(t)} to every enemy`,
    snapCreate: d => `+ Create from ${formatHp(d)} DPS`,
    snapMore:   (n,d) => `+ Create another from ${formatHp(d)} DPS (${n} saved)`,
    fireSec:    "Fire (s)",
    rmCard:     "Remove this card",
    inOrderN:   n => `✓ ${n} in card order`,
    dpsBuffed:  p => ` (incl. +${p}% buffs)`,
    cGil:       "Gilgamesh",  cGilSub: "cuts down to 25% of full HP",
    cMad:       "Madara",     cMadSub: "cuts down to 33% of full HP",
    cLuf:       "Luffy",      cLufSub: p => `cuts remaining HP by ${p}%`,
    cTboi:      "TBOI",       cTboiSub: d => `deals ${formatHp(d)} to every enemy`,
    cNetero:    "Netero Nuke", cNeteroSub: d => `deals ${formatHp(d)} to every enemy`,
    cKfg:       "Kung Fu Galaxy",
    cKfgSub:    p => `fires ${p.sec}s — ${formatHp(p.normal)} normal + ${formatHp(p.poison)} poison = ${formatHp(p.total)}`,
    cBase:      "HP Base",
    cBaseSub:   v => `base has ${formatHp(v)} HP`,
    cPolice:    "Police Girl's Hp Base",
    cPoliceSub: "converts Police Girl damage accumulated by earlier Team DPS cards into base HP",
    baseField:  "Base HP",
    stKfg:      p => `→ ${p.sec}s of fire — ${formatHp(p.normal)} normal + ${formatHp(p.poison)} poison`,
    stHp:       (from,w,n,p,m) => `Turn clear off at wave ${w} — enemies from waves ${from}–${w} (${n} enemies, ${p}p ×${m})`,
    stGil:      "→ down to 25% of full HP",
    stMad:      "→ down to 33% of full HP",
    stNoEff:    p => `— no effect (already below ${p}%)`,
    stLuf:      p => `→ cuts remaining by ${p}%`,
    stTboi:     d => `→ deals ${formatHp(d)} to every enemy`,
    stNetero:   d => `→ deals ${formatHp(d)} to every enemy`,
    stDps:      (s,d) => `→ ${s}s of fire — ${formatHp(d)} damage to every enemy`,
    stSnap:     (s,d,t) => `→ ${formatHp(d)} DPS snapshot fires ${s}s — ${formatHp(t)} damage to every enemy`,
    stBase:     (v,n) => `→ base takes ${n} remaining enemies (${formatHp(v)} total HP)`,
    stPolice:   (hp,v,n) => `→ converts ${formatHp(hp)} accumulated damage into base HP and takes ${n} enemies (${formatHp(v)} HP)`,
    baseLeft:   v => `${formatHp(v)} base HP left`,
    enemiesLeft:n => `${n} enemies left`,
    noTable:    t => `No ${t} enemy-table data yet`,
    baseDown:   " — the HP Base was destroyed",
    passBase:   v => `${formatHp(v)} base HP left`,
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
    decelExcluded:"Decelerate excluded",
  },
};
const TT = TEAM_STRINGS[window.TEAM_LANG || "th"];
const TEAM_STORE_KEY = "astd_team_builder_saved_v1";
let settingTeamState = false;
function persistTeamState(){
  if(settingTeamState || !window.PAGE_STATE || typeof PAGE_STATE.get !== "function") return;
  try{ localStorage.setItem(TEAM_STORE_KEY, JSON.stringify(PAGE_STATE.get())); }catch(e){}
}

const $ = id => document.getElementById(id);
let players = 1;
let includeDecelerate = true;
let uidSeq = 0;
let order = [newCard("dps")];
/* การ์ดหนึ่งใบ = {k:ชนิด, uid:ไอดีไว้ลบ/ลากสลับ, sec:วินาที (เฉพาะ Team DPS)} */
/* ใส่ได้สูงสุดกี่ใบต่อชนิดการ์ด (null = ไม่จำกัด) */
const CARD_MAX = { dps:null, snap:null, base:1, policebase:1, gil:1, mad:1, luf:3, tboi:1, netero:1, kfg:1 };

/* การ์ด Kung Fu Galaxy — ดาเมจ 200B ต่อครั้ง ยังอยู่ขั้นอัปเกรด 8 (SPA 10)
   ตีปกติ  : วินาที / SPA  ครั้ง
   พิษ     : 7 ครั้งต่อ 30 วินาที  ครั้งละเท่ากับดาเมจต่อครั้ง
   บัฟทุกอันคูณกัน ส่วน Falcon6 คูณเฉพาะดาเมจพิษ */
const KFG_DMG = 200e9, KFG_SPA = 10, KFG_SEC = 60;
const KFG_POISON_HITS = 7, KFG_POISON_WINDOW = 30;
const KFG_BUFFS = [
  {id:"b250",    label:"250%",          v:250},
  {id:"b300",    label:"300%",          v:300},
  {id:"idol",    label:"Idol +15%",     v:15},
  {id:"judge",   label:"Judgement +8%", v:8},
  {id:"fv",      label:"FV +35%",       v:35},
  {id:"purify",  label:"Purify +12%",   v:12},
  {id:"falcon6", label:"Falcon6 +30%",  v:30, poisonOnly:true},
];
function kfgMults(c){
  let all = 1, poison = 1;
  if(c && c.b) KFG_BUFFS.forEach(x =>{
    if(!c.b.has(x.id)) return;
    if(x.poisonOnly) poison *= (1 + x.v/100);
    else             all    *= (1 + x.v/100);
  });
  return {all, poison};
}
function kfgParts(c){
  const sec = Math.max(0, (c && c.sec != null) ? c.sec : KFG_SEC);
  const m   = kfgMults(c);
  const hit = KFG_DMG * m.all;
  const normal = hit * (sec / KFG_SPA);                                    /* ตีปกติตาม SPA */
  const poison = hit * m.poison * (sec * KFG_POISON_HITS / KFG_POISON_WINDOW); /* พิษ 7 ครั้ง/30 วิ */
  return {sec, normal, poison, total: normal + poison};
}
function kfgTotal(c){ return kfgParts(c).total; }

/* บัฟเสริมที่ติดมากับการ์ดแต่ละใบ (Team DPS ปรับแยกใบได้) */
const CARD_BUFFS = [
  {id:"idol",   label:"Idol +15%",     v:15},
  {id:"judge",  label:"Judgement +8%", v:8},
  {id:"fv",     label:"FV +35%",       v:35},
  {id:"purify", label:"Purify +12%",   v:12},
];
function cardBuffMult(c){
  let m = 1;
  if(c && c.b) CARD_BUFFS.forEach(x => { if(c.b.has(x.id)) m *= (1 + x.v/100); });
  return m;
}
function newCard(k){
  if(k === "dps") return {k, uid:++uidSeq, sec:60, b:new Set()};
  if(k === "snap"){
    const typeDps = {};
    if(typeof MOB_KIND !== "undefined" && teamHasUnhuman())
      Object.keys(MOB_KIND).forEach(code => { typeDps[code] = teamDpsForEnemy(code); });
    return {k, uid:++uidSeq, sec:60, b:new Set(), snapDps:teamDps(),
            policeDps:teamUnitDps("Police Girl (Vamp)"), typeDps};
  }
  if(k === "kfg") return {k, uid:++uidSeq, sec:KFG_SEC, b:new Set()};
  if(k === "base") return {k, uid:++uidSeq, base:0};
  return {k, uid:++uidSeq};
}
function cardDps(c){ return teamDps() * Math.max(0, c.sec || 0) * cardBuffMult(c); }
const TBOI_BASE = 250e9;
const NETERO_NUKE_BASE = 62.5e9;
const BUFF_CHOICES = [100, 250, 300];
const UNIT_SUPPORT_BUFFS = [
  {id:"kovegu15", label:"Kovegu IV +15%", v:15, cats:["Protectors of The Universe", "Pure Hearted", "Prodigy"]},
  {id:"omega15",  label:"Omega Dragon +15%", v:15, cats:["Unworldly Beings", "Pure Evil", "Final Bosses"]},
  {id:"overlord10", label:"Overlord's Influence +10%", v:10, cats:["Godlike Power", "Undead", "Unrivaled Intelligence"]},
];
function rowSupportMult(row){
  const on = (row.dataset.support || "").split("|").filter(Boolean);
  const idx = row.dataset.unit;
  const tags = (idx !== "" && idx !== "custom" && UNITS[+idx]) ? (unitTags(UNITS[+idx][0]) || []) : [];
  return UNIT_SUPPORT_BUFFS.reduce((m,b) =>
    on.includes(b.id) && b.cats.some(cat => tags.includes(cat)) ? m*(1+b.v/100) : m, 1);
}

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
  const unit = UNITS.find(u => unitSlug(u[0]) === slug);
  const name = unit ? unit[0] : slug;
  const dpsOf = r => unitTotalDps(name, rowDmgTotal(r), r.spa || 1, 1, r) + abilityDpsOf(name, rowDmgTotal(r), r);
  const top = dpsOf(ref);
  return top > 0 ? dpsOf(s) / top : 1;
}
/* ---------- Leader: ยูนิตแถวแรกของทีม ---------- */
/* passive ของยูนิตที่คูณดาเมจได้ */
function unitMults(name){
  const list = (typeof ABILITIES !== "undefined") ? ABILITIES[unitSlug(name)] : null;
  return list ? list.filter(a => a.mult) : [];
}
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
function leaderCashBonus(t){
  let bonus = 0;
  const boost = teamBoost(t);
  const text = boost && boost.leader ? (boost.leader.en || boost.leader.th || "") : "";
  const matches = [...text.matchAll(/(\d+(?:\.\d+)?)%\s*(?:more money|money boost|bonus)/gi)];
  matches.forEach(match => { bonus = Math.max(bonus, parseFloat(match[1]) || 0); });
  return bonus;
}
function teamFarmSettings(t){
  const box = $("team"+t);
  const selected = box.querySelector(".team-farm-chip.on");
  const input = box.querySelector(".team-farm-wave");
  return {type:selected ? selected.dataset.farm : "jeff", doneWave:Math.max(0, parseInt(input.value) || 0)};
}
function teamUnitLimit(t){ return teamFarmSettings(t).type === "jeff-octo" ? 4 : 5; }
function rowTotalCost(row){
  const d = row.dataset;
  if(d.unit === "" || d.unit === "custom") return 0;
  const u = UNITS[+d.unit];
  if(!u) return 0;
  const rows = (typeof UPGRADES !== "undefined") ? UPGRADES[unitSlug(u[0])] : null;
  let cost = Math.max(0, u[4] || 0);
  if(d.stage !== "" && rows && rows[+d.stage]) cost = upgradeCumCost(rows, +d.stage);
  else if(!cost && rows && rows.length) cost = upgradeCumCost(rows, rows.length - 1);
  const orb = d.orb !== "" && typeof ORBS !== "undefined" ? ORBS[+d.orb] : null;
  const costMult = 1 - (orb && orb.cost ? orb.cost : 0) / 100;
  return cost * costMult * Math.max(1, parseInt(d.count) || 1);
}
function teamUnitsCost(t){
  return [...document.querySelectorAll(`#rows${t} .u-item`)].reduce((sum,row) => sum + rowTotalCost(row), 0);
}
function calcFarmMoney(targetWave){
  const locale = (window.TEAM_LANG || "th") === "en" ? "en-US" : "th-TH";
  const money = value => Math.round(value).toLocaleString(locale);
  let grandTotal = 0;
  for(let t = 1; t <= 4; t++){
    const {type,doneWave} = teamFarmSettings(t);
    const waves = Math.max(0, targetWave - doneWave);
    const bonus = leaderCashBonus(t);
    const jeff = 287820 * (1 + bonus / 100);
    const perWave = jeff + (type === "jeff-octo" ? 298000 : 0);
    const total = perWave * waves;
    const spent = teamUnitsCost(t);
    const left = total - spent;
    const enough = left >= 0;
    if(t <= players) grandTotal += total;
    const box = $("team"+t);
    box.querySelector(".team-farm-bonus").textContent = `+${bonus}%`;
    box.querySelector(".team-farm-total").textContent = money(total);
    box.querySelector(".team-money-left").textContent = money(left);
    const verdict = box.querySelector(".team-money-verdict");
    verdict.textContent = enough ? "Enough" : "Not Enough";
    verdict.classList.toggle("enough", enough);
    verdict.classList.toggle("not-enough", !enough);
    const base = type === "jeff-octo" ? `(287,820 × ${1 + bonus/100}) + 298,000` : `287,820 × ${1 + bonus/100}`;
    box.querySelector(".team-farm-formula").textContent = `${base} × (${targetWave} − ${doneWave}) · ${money(total)} − ${money(spent)}`;
  }
  $("farmMoneySide").textContent = money(grandTotal);
  $("farmMoneySideNote").textContent = (window.TEAM_LANG || "th") === "en"
    ? `Total from ${players} active team${players > 1 ? "s" : ""}`
    : `รวมจาก ${players} ทีมที่ใช้งาน`;
}
/* ยูนิตได้บัฟจาก Leader ไหม — ต้องมีหมวดตรงกับที่ Leader บัฟ */
function boostedBy(boost, row){
  if(!boost || (!boost.cat && !boost.cats) || !boost.atk) return 0;
  const idx = row.dataset.unit;
  if(idx === "" || idx === "custom") return 0;
  const tags = unitTags(UNITS[+idx][0]);
  const wanted = boost.cats || [boost.cat];
  return (tags && wanted.some(cat => tags.includes(cat))) ? boost.atk : 0;
}

function rowDps(row, boost){
  const d = row.dataset;
  if(d.unit === "") return 0;                       /* ยังไม่ได้เลือกยูนิต */
  if(d.unit === "custom") return (parseFloat(d.val) || 0);
  const u = UNITS[+d.unit];
  if(!u || u[1] == null) return (parseFloat(d.val) || 0);
  const base  = unitTotalDps(u[0], u[1], u[2]) + abilityDpsOf(u[0], u[1], null);   /* รวมสถานะและ Ability DPS */
  const stage = d.stage === "" ? null : +d.stage;
  const copies= Math.max(1, parseFloat(d.count) || 1);
  const lead = 1 + boostedBy(boost, row)/100;
  const orb = (d.orb != null && d.orb !== "" && typeof ORBS !== "undefined") ? ORBS[+d.orb] : null;
  const orbMult = 1 + (orb ? (orb.dmg || 0) : 0)/100;
  /* passive ที่เปิดสวิตช์ไว้ (เช่น Vampirism ของ TBOI) */
  let pMult = 1;
  const on = (d.abil || "").split("|").filter(Boolean);
  unitMults(u[0]).forEach(a => { if(on.includes(a.name)) pMult *= a.mult; });
  /* ค่า 250% / 300% คือบัฟที่ "เพิ่ม" จากฐาน จึงเป็น x3.5 / x4.0
     ค่า 100 ใช้แทนตัวเลือกไม่บัฟและต้องคงเป็น x1.0 */
  const buffPct = +d.buff || 100;
  const damageBuff = buffPct === 100 ? 1 : 1 + buffPct / 100;
  const support = rowSupportMult(row);
  const mult = stageRatio(unitSlug(u[0]), stage) * damageBuff * lead * orbMult * support * pMult;

  /* ขั้นพิเศษที่มี flat damage: คิดส่วนดาเมจหลักกับส่วนเพิ่มแยกกัน
     เพื่อให้ flatSkip เช่น Rage / Wounded Pride ไม่รับ Leader และ Orb ตามข้อมูลจริง */
  const table = (typeof UPGRADES !== "undefined") ? UPGRADES[unitSlug(u[0])] : null;
  const stageRow = table && stage != null ? table[stage] : null;
  if(stageRow && rowFlat(stageRow)){
    const ref = [...table].reverse().find(r => !r.flat) || table[table.length-1];
    const dpsOfBase = r => unitTotalDps(u[0], rowBase(r), r.spa || 1, 1, r) + abilityDpsOf(u[0], rowBase(r), r);
    const normalRatio = dpsOfBase(ref) > 0 ? dpsOfBase(stageRow) / dpsOfBase(ref) : 1;
    const common = damageBuff * support * pMult;
    let normalDps = base * normalRatio * common * lead * orbMult;
    /* ดาเมจตายตัวต้องผ่านสูตรสถานะ/Ability เช่นกัน
       เช่น Seraph's Rebirth ต้องสร้าง Judgement DPS จาก +221.76M ด้วยเหมือน Calculator */
    let addedDps = (
      unitTotalDps(u[0], rowFlat(stageRow), stageRow.spa || u[2] || 1, 1, stageRow) +
      abilityDpsOf(u[0], rowFlat(stageRow), stageRow)
    ) * common;
    /* เหมือน Calculator: flat damage ข้าม Leader และ Orb เป็นค่าเริ่มต้น
       เว้นแต่แถวนั้นจะระบุ flatSkip เองอย่างชัดเจน */
    const skip = stageRow.flatSkip || ["lead", "orb"];
    if(!skip.includes("lead")) addedDps *= lead;
    if(!skip.includes("orb")) addedDps *= orbMult;
    return (normalDps + addedDps) * copies;
  }

  /* สกิลยิงต่อเนื่อง (เช่น The Final March) นับรวมเมื่อเปิดสวิตช์ */
  const ab = dotAbility(u[0]);
  let extra = 0;
  if(ab && d.dotOn === "1"){
    const fDmg = u[1] * mult;                       /* ดาเมจหลังบัฟของตัวนี้ */
    extra = dotAvg(ab, fDmg, parseFloat(d.dotSec) || ab.dot.def);
  }
  const single = base * mult + extra;
  const selectedRow = stageRow || ((typeof UPGRADES !== "undefined" && UPGRADES[unitSlug(u[0])])
    ? [...UPGRADES[unitSlug(u[0])]].reverse().find(r => !r.flat) : null);
  const bleed = bleedSpec(u[0], selectedRow || null);
  if(bleed && bleed.scaleCopies === false && copies > 1){
    const rawTotal = selectedRow ? unitTotalDps(u[0], rowDmgTotal(selectedRow), selectedRow.spa || 1, 1, selectedRow) : 0;
    const rawBleed = selectedRow ? bleedDps(rowDmgTotal(selectedRow), u[0], selectedRow) : 0;
    const bleedPart = rawTotal > 0 ? (base * mult) * rawBleed / rawTotal : 0;
    return single * copies - bleedPart * (copies - 1);
  }
  return single * copies;
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
  return total;   /* บัฟเสริมย้ายไปอยู่กับการ์ด Team DPS แต่ละใบแล้ว */
}

function teamUnitDps(unitName){
  let total = 0;
  for(let t = 1; t <= players; t++){
    const boost = teamBoost(t);
    document.querySelectorAll(`#rows${t} .u-item`).forEach(row => {
      const idx = row.dataset.unit;
      if(idx !== "" && idx !== "custom" && UNITS[+idx] && UNITS[+idx][0] === unitName) total += rowDps(row, boost);
    });
  }
  return total;
}

/* TypeBane ของ Unhuman ใช้ x2 ตามชนิดมอนตอนประเมินการเคลียร์เวฟ
   โดยไม่คูณซ้ำกับสวิตช์ TypeBane ที่ผู้ใช้เปิดเพื่อดู DPS ทั่วไป */
function unhumanEnemyMult(code){
  const kind = (typeof MOB_KIND !== "undefined") ? MOB_KIND[code] : null;
  const cls = kind ? kind.cls : String(code || "").toLowerCase();
  return (kind && kind.air) || ["air", "decelerate", "armoured", "powerful", "explosive", "cloner"].includes(cls) ? 2 : 1;
}
function teamHasUnhuman(){
  for(let t = 1; t <= players; t++){
    const found = [...document.querySelectorAll(`#rows${t} .u-item`)].some(row => {
      const idx = row.dataset.unit;
      return idx !== "" && idx !== "custom" && UNITS[+idx] && UNITS[+idx][0] === "Unhuman (Nullifier)";
    });
    if(found) return true;
  }
  return false;
}
function teamDpsForEnemy(code){
  let total = 0;
  for(let t = 1; t <= players; t++){
    const boost = teamBoost(t);
    document.querySelectorAll(`#rows${t} .u-item`).forEach(row => {
      let value = rowDps(row, boost);
      const idx = row.dataset.unit;
      if(idx !== "" && idx !== "custom" && UNITS[+idx] && UNITS[+idx][0] === "Unhuman (Nullifier)"){
        const on = (row.dataset.abil || "").split("|").filter(Boolean);
        if(on.includes("TypeBane")) value /= 2;
        value *= unhumanEnemyMult(code);
      }
      total += value;
    });
  }
  return total;
}
/* Team DPS โดนมอนทุกตัวพร้อมกันเต็มจำนวน ไม่แบ่งดาเมจเป็นก้อนรวม */
function damageAllEnemies(enemies, amount){
  const hit = Math.max(0, amount || 0);
  enemies.forEach(enemy => { enemy.hp = Math.max(0, enemy.hp - hit); });
}
function damageAllEnemiesByTeam(enemies, seconds, mult){
  const duration = Math.max(0, seconds || 0);
  let elapsed = 0;
  for(const enemy of enemies){
    const dps = teamDpsForEnemy(enemy.code) * Math.max(0, mult || 0);
    if(dps <= 0) continue;
    elapsed = Math.max(elapsed, enemy.hp / dps);
    enemy.hp = Math.max(0, enemy.hp - dps * duration);
  }
  return {elapsed:Math.min(duration, elapsed)};
}
function damageAllEnemiesBySnapshot(enemies, seconds, mult, typeDps){
  const duration = Math.max(0, seconds || 0);
  const boost = Math.max(0, mult || 0);
  let elapsed = 0;
  for(const enemy of enemies){
    const dps = Math.max(0, (typeDps && typeDps[enemy.code]) || 0) * boost;
    if(dps <= 0) continue;
    elapsed = Math.max(elapsed, enemy.hp / dps);
    enemy.hp = Math.max(0, enemy.hp - dps * duration);
  }
  return {elapsed:Math.min(duration, elapsed)};
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
    const sub = u[1] != null
      ? "DPS " + formatHp(unitTotalDps(u[0], u[1], u[2], 1) + abilityDpsOf(u[0], u[1], null))
      : TT.noStats;
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
  pickTarget.dataset.dotOn = "0"; pickTarget.dataset.dotSec = ""; pickTarget.dataset.abil = "";
  if(val === "custom"){ pickTarget.dataset.val = pickTarget.dataset.val || ""; }
  paintRow(pickTarget);
  calcTeam();
}

/* ============================================================
   แถวยูนิตในทีม
   ============================================================ */
function addUnitRow(t){
  const rows = $("rows"+t);
  if(rows.children.length >= teamUnitLimit(t)) return;
  const row = document.createElement("div");
  row.className = "u-item";
  Object.assign(row.dataset, {unit:"", stage:"", buff:"100", count:"1", val:"", orb:"", support:"", dotOn:"0", dotSec:"", abil:""});
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
               : (r.lv === 0 ? TT.stageDeploy : TT.stageLv(r.lv));
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

  const orbSel = u && typeof ORBS !== "undefined"
    ? `<div class="ui-orb-row"><select class="u-orb" title="Orb"><option value="">${TT.orbNone}</option>` +
      ORBS.map((o,i) => `<option value="${i}" ${String(i)===d.orb?"selected":""}>${o.name}${o.dmg?` · DMG +${o.dmg}%`:""}</option>`).join("") +
      `</select></div>`
    : `<div class="ui-orb-row"><select class="u-orb" disabled><option>${TT.orbNone}</option></select></div>`;

  const tags = u ? (unitTags(u[0]) || []) : [];
  const eligibleSupport = UNIT_SUPPORT_BUFFS.filter(b => b.cats.some(cat => tags.includes(cat)));
  const validSupportIds = eligibleSupport.map(b => b.id);
  const supportOn = (d.support || "").split("|").filter(id => validSupportIds.includes(id));
  d.support = supportOn.join("|");
  const supportBuffs = u && eligibleSupport.length ? `<div class="ui-support"><span>${TT.unitBuffs}</span><div class="preset-row">${eligibleSupport.map(b =>
    `<button class="preset-chip${supportOn.includes(b.id)?" on":""}" data-support="${b.id}" title="${b.cats.join(" / ")}">${b.label}</button>`
  ).join("")}</div></div>` : "";

  let numField;
  if(isCustom || (u && !hasStats)){
    numField = `<input class="u-num" type="number" min="0" step="any" value="${d.val}" placeholder="${TT.dpsField}" title="${TT.dpsField}">`;
  } else if(u){
    const max = placeMax(u[0]);
    const count = Math.min(max, Math.max(1, parseInt(d.count) || 1));
    d.count = String(count);
    numField = `<select class="u-num" title="${TT.copies}" aria-label="${TT.copies}">` +
      Array.from({length:max}, (_,i) => `<option value="${i+1}" ${i+1===count?"selected":""}>${i+1}</option>`).join("") +
      `</select>`;
  } else {
    numField = `<select class="u-num" title="${TT.copies}" aria-label="${TT.copies}" disabled><option>—</option></select>`;
  }

  row.innerHTML = `
    <div class="ui-top">
      <button class="ui-face">${face}<span class="ui-lead" style="display:none;">${TT.leaderTag}</span></button>
      <button class="ui-name"><b>${label}</b><small>${sub}</small>
        <span class="ui-boost" style="display:none;"></span></button>
      <button class="ui-rm" title="✕">✕</button>
    </div>
    <div class="ui-ctl">${stageSel}${buffSel}${numField}</div>
    ${orbSel}
    ${supportBuffs}
    ${(()=>{ const ms = u ? unitMults(u[0]) : []; if(!ms.length) return "";
      const on = (d.abil || "").split("|").filter(Boolean);
      return `<div class="ui-abil"><div class="preset-row">${ms.map(a =>
        `<button class="preset-chip${on.includes(a.name)?" on":""}" data-ab="${a.name}">${a.name} x${a.mult}</button>`
      ).join("")}</div></div>`; })()}
    ${(()=>{ const ab = u ? dotAbility(u[0]) : null; if(!ab) return "";
      const sec = d.dotSec || ab.dot.def;
      return `<div class="ui-dot">
        <label class="abil-sw"><span>${TT.dotCount(ab.name)}</span>
          <input type="checkbox" class="u-doton"${d.dotOn === "1" ? " checked" : ""}><i></i></label>
        <div class="dot-row">
          <span>${TT.dotSec}</span>
          <input type="range" class="u-dotsec" min="${ab.dot.min}" max="${ab.dot.max}" step="1" value="${sec}">
          <b class="u-dotsecv">${sec}s</b>
        </div>
      </div>`; })()}`;

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
  const orbPick = row.querySelector(".u-orb");
  if(!orbPick.disabled) orbPick.onchange = e =>{ d.orb = e.target.value; calcTeam(); };
  row.querySelectorAll(".ui-support .preset-chip").forEach(ch => ch.onclick = ()=>{
    const on = (d.support || "").split("|").filter(Boolean);
    const id = ch.dataset.support, i = on.indexOf(id);
    if(i >= 0) on.splice(i,1); else on.push(id);
    d.support = on.join("|");
    ch.classList.toggle("on", on.includes(id));
    calcTeam();
  });
  row.querySelectorAll(".ui-abil .preset-chip").forEach(ch => ch.onclick = ()=>{
    const on = (d.abil || "").split("|").filter(Boolean);
    const nm = ch.dataset.ab;
    const i  = on.indexOf(nm);
    if(i >= 0) on.splice(i,1); else on.push(nm);
    d.abil = on.join("|");
    ch.classList.toggle("on");
    calcTeam();
  });

  const dOn = row.querySelector(".u-doton"), dSec = row.querySelector(".u-dotsec");
  if(dOn)  dOn.onchange = e =>{ d.dotOn = e.target.checked ? "1" : "0"; calcTeam(); };
  if(dSec) dSec.addEventListener("input", ()=>{
    d.dotSec = dSec.value;
    row.querySelector(".u-dotsecv").textContent = dSec.value + "s";
    calcTeam();
  });
  row.querySelector(".u-num").addEventListener("change", e =>{
    if(isCustom || (u && !hasStats)) d.val = e.target.value; else d.count = e.target.value;
    calcTeam();
  });
  if(isCustom || (u && !hasStats)) row.querySelector(".u-num").addEventListener("input", e =>{
    d.val = e.target.value;
    calcTeam();
  });
}
function buildTeams(){
  const grid = $("teamGrid");
  const en = (window.TEAM_LANG || "th") === "en";
  for(let t = 1; t <= 4; t++){
    const box = document.createElement("div");
    box.className = "team-box"; box.id = "team"+t; box.dataset.t = t;
    box.innerHTML = `<h3>${TT.team(t)} <span class="cnt" id="cnt${t}">0/5</span></h3>
      <div class="team-sum" id="tsum${t}">${TT.teamEmpty}</div>
      <div class="team-lead" id="tlead${t}" style="display:none;"></div>
      <div class="unit-rows" id="rows${t}"></div>
      <button class="btn add-u">${TT.addUnit}</button>
      <div class="team-farm">
        <b>${en ? "Money farm" : "ตัวฟาร์มเงิน"}</b>
        <div class="preset-row">
          <button class="preset-chip team-farm-chip on" data-farm="jeff">Jeff</button>
          <button class="preset-chip team-farm-chip" data-farm="jeff-octo">Jeff + Octo</button>
        </div>
        <label>${en ? "Farm maxed at Wave" : "ฟาร์มเต็มเสร็จที่ Wave"}
          <input class="team-farm-wave" type="number" min="0" step="1" value="15">
        </label>
        <div class="team-farm-result">
          <span>${en ? "Leader bonus" : "โบนัส Leader"} <strong class="team-farm-bonus">+0%</strong></span>
          <span>${en ? "Cash" : "เงินรวม"} <strong class="team-farm-total">0</strong></span>
        </div>
        <div class="team-money-check">
          <span>Money Left <strong class="team-money-left">0</strong></span>
          <b class="team-money-verdict enough">Enough</b>
        </div>
        <small class="team-farm-formula"></small>
      </div>`;
    grid.appendChild(box);
    box.querySelector(".add-u").onclick = ()=> addUnitRow(t);
    box.querySelectorAll(".team-farm-chip").forEach(chip => chip.onclick = ()=>{
      box.querySelectorAll(".team-farm-chip").forEach(x => x.classList.remove("on"));
      chip.classList.add("on");
      enforceTeamLimit(t);
      updateCnt(t);
      calcTeam();
    });
    box.querySelector(".team-farm-wave").addEventListener("input", calcTeam);
  }
}
function enforceTeamLimit(t){
  const rows = $("rows"+t), limit = teamUnitLimit(t);
  while(rows.children.length > limit){
    const all = [...rows.children];
    const empty = [...all].reverse().find(row => row.dataset.unit === "");
    (empty || all[all.length-1]).remove();
  }
}
function updateCnt(t){
  const n = $("rows"+t).children.length;
  const limit = teamUnitLimit(t);
  $("cnt"+t).textContent = n + "/" + limit;
  document.querySelector(`#team${t} .add-u`).style.display = n >= limit ? "none" : "block";
}
function applyPlayers(){
  for(let t = 1; t <= 4; t++) $("team"+t).classList.toggle("off", t > players);
}

/* ============================================================
   การ์ด — กดปุ่มเพื่อใส่/เอาออกจากลำดับการ์ด (เดิมเป็นสวิตช์)
   ============================================================ */
const CARD_INFO = {
  dps:  {name: TT.cDps,  sub: c => TT.cDpsSub(c.sec, teamDps() * cardBuffMult(c))},
  snap: {name: TT.cSnap, sub: c => {
    const dps = Math.max(0, c.snapDps || 0) * cardBuffMult(c);
    return TT.cSnapSub(c.sec, dps, dps * Math.max(0, c.sec || 0));
  }},
  base: {name: TT.cBase, sub: c => TT.cBaseSub(Math.max(0, c.base || 0))},
  policebase: {name: TT.cPolice, sub: () => TT.cPoliceSub},
  gil:  {name: TT.cGil,  sub: () => TT.cGilSub},
  mad:  {name: TT.cMad,  sub: () => TT.cMadSub},
  luf:  {name: TT.cLuf,  sub: () => TT.cLufSub((25*buffMult("lufBuffs")).toFixed(1)), cooldown: "CD 1080s"},
  tboi: {name: TT.cTboi, sub: () => TT.cTboiSub(TBOI_BASE*buffMult("tboiBuffs")), cooldown: "One time used"},
  netero: {name: TT.cNetero, sub: () => TT.cNeteroSub(NETERO_NUKE_BASE * buffMult("neteroBuffs"))},
  kfg:  {name: TT.cKfg,  sub: c => TT.cKfgSub(kfgParts(c))},
};
function paintCardBtns(){
  document.querySelectorAll(".t-card").forEach(card=>{
    const key = card.dataset.card;
    const n = order.filter(c => c.k === key).length;
    card.classList.toggle("on", n > 0);
    const max = CARD_MAX[key];
    const full = max != null && n >= max;
    const b = card.querySelector(".card-add");
    b.textContent = key === "snap"
      ? (n ? TT.snapMore(n, teamDps()) : TT.snapCreate(teamDps()))
      : (full ? TT.orderFull(n) : (n ? TT.orderMore(n) : TT.orderAdd));
    b.classList.toggle("added", n > 0);
    b.classList.toggle("full", full);
    b.disabled = full;
  });
}
/* บัฟเสริมหลายอันซ้อนกัน = คูณกัน เช่น Idol +15% กับ FV +35% -> x1.15 * x1.35 = x1.5525 */
function buffMult(id){
  let m = 1;
  document.querySelectorAll(`#${id} .preset-chip.on`).forEach(c => m *= (1 + (+(c.dataset.v || c.dataset.b))/100));
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
    const secBox = (o.k === "dps" || o.k === "snap" || o.k === "kfg")
      ? `<label class="o-sec">${TT.fireSec}<input type="number" min="0" step="1" value="${o.sec}"></label>
         ${(()=>{ const list = (o.k === "dps" || o.k === "snap") ? CARD_BUFFS : (o.k === "kfg" ? KFG_BUFFS : null);
           if(!list) return "";
           return `<div class="o-buffs">
           <span class="o-buffs-lbl">${TT.cardBuffs}</span>
           ${list.map(x => `<button class="preset-chip${o.b && o.b.has(x.id) ? " on" : ""}" data-b="${x.id}">${x.label}</button>`).join("")}
         </div>`; })()}`
      : (o.k === "base"
        ? `<label class="o-sec o-base">${TT.baseField}<input type="number" min="0" step="any" value="${o.base || ""}" placeholder="0"></label>`
        : "");
    it.innerHTML = `<span class="grip">⋮⋮</span><span class="o-num">${idx+1}</span>
      <span class="o-name">${CARD_INFO[o.k].name}<small>${CARD_INFO[o.k].sub(o)}</small>
        ${CARD_INFO[o.k].cooldown ? `<span class="o-cd">${CARD_INFO[o.k].cooldown}</span>` : ""}
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
    it.querySelectorAll(".o-buffs .preset-chip").forEach(ch =>{
      ch.addEventListener("mousedown", e => e.stopPropagation());
      ch.onclick = ()=>{
        const id = ch.dataset.b;
        if(o.b.has(id)){
          o.b.delete(id);
        } else {
          if(id === "b250" || id === "b300"){
            const other = id === "b250" ? "b300" : "b250";
            o.b.delete(other);
            const otherChip = it.querySelector(`.o-buffs [data-b="${other}"]`);
            if(otherChip) otherChip.classList.remove("on");
          }
          o.b.add(id);
        }
        ch.classList.toggle("on", o.b.has(id));
        it.querySelector(".o-name small").textContent = CARD_INFO[o.k].sub(o);
        calcTeam();
      };
    });

    const sec = it.querySelector(".o-sec input");
    if(sec){
      /* ลากการ์ดไม่ให้ขวางการพิมพ์ในช่องวินาที */
      sec.addEventListener("mousedown", e => e.stopPropagation());
      sec.addEventListener("focus", ()=> it.draggable = false);
      sec.addEventListener("blur",  ()=> it.draggable = true);
      sec.addEventListener("input", ()=>{
        if(o.k === "base") o.base = Math.max(0, parseFloat(sec.value) || 0);
        else o.sec = Math.max(0, parseFloat(sec.value) || 0);
        it.querySelector(".o-name small").textContent = CARD_INFO[o.k].sub(o);
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

function waveEnemies(wave, tableType){
  const base = calculateBaseHp(wave) * PLAYER_MULTS[players];
  const cycle = (typeof mobCycleOf === "function" && mobCycleOf(tableType)) || MOB_CYCLE;
  const pattern = cycle[(wave - 1) % cycle.length];
  return pattern.filter(code => includeDecelerate || code !== "D").map(code => {
    const mult = MOB_KIND[code].mult;
    const max = base * mult;
    return {code, max, hp:max};
  });
}
/* ตอนปิดเคลียร์ ต้องกำจัดมอนที่สะสมจาก 10 เวฟก่อนหน้า รวมกับเวฟที่เลือก */
function clearWindowEnemies(wave, tableType){
  const fromWave = Math.max(1, wave - 10);
  const enemies = [];
  for(let current = fromWave; current <= wave; current++) enemies.push(...waveEnemies(current, tableType));
  return {fromWave, enemies};
}
function enemiesHp(enemies){ return enemies.reduce((sum,e) => sum + Math.max(0,e.hp), 0); }
function enemiesAlive(enemies){ return enemies.filter(e => e.hp > 1e-9).length; }
/* ดาเมจแบบตัวเลขรวม ไล่หักตามลำดับมอนจนกว่าจะหมด */
function damageEnemies(enemies, amount){
  let left = Math.max(0, amount || 0);
  for(const enemy of enemies){
    if(left <= 0) break;
    const hit = Math.min(enemy.hp, left);
    enemy.hp -= hit;
    left -= hit;
  }
}

function calcTeam(){
  const wave = Math.max(1, parseInt($("wave").value)||1);
  const tableType = $("tableType").value;
  if(typeof renderWaveSkipEstimate === "function") renderWaveSkipEstimate("waveSkipEstimate", wave, tableType, includeDecelerate);

  refreshTeamNumbers();
  const dps = teamDps();
  const snapSource = document.querySelector('.t-card[data-card="snap"] .card-add');
  if(snapSource){
    const n = order.filter(c => c.k === "snap").length;
    snapSource.textContent = n ? TT.snapMore(n, dps) : TT.snapCreate(dps);
  }
  [...$("orderList").querySelectorAll(".order-item")].forEach((item, i) => {
    const small = item.querySelector(".o-name small");
    if(small && order[i] && CARD_INFO[order[i].k]) small.textContent = CARD_INFO[order[i].k].sub(order[i]);
  });
  $("teamDpsOut").textContent = formatHp(dps);
  $("dpsNote").textContent = dps > 0 ? TT.dpsTotal(players) : TT.dpsNone;
  calcFarmMoney(wave);
  persistTeamState();

  if(tableType !== "regular" && tableType !== "air"){
    const name = $("tableType").selectedOptions[0].text.split("—")[0].trim();
    $("steps").innerHTML = `<div class="empty-msg">${TT.noTable(name)}</div>`;
    $("verdict").style.display = "none";
    $("orderList").querySelectorAll(".o-pct").forEach(x => x.textContent = "");
    return;
  }

  const clearWindow = clearWindowEnemies(wave, tableType);
  const enemies = clearWindow.enemies;
  const maxHp = enemiesHp(enemies);
  const startCount = enemies.length;
  const remaining = () => `${formatHp(enemiesHp(enemies))} · ${TT.enemiesLeft(enemiesAlive(enemies))}`;
  const decelerateNote = includeDecelerate ? "" : ` · ${TT.decelExcluded}`;
  const steps = [{k:TT.stHp(clearWindow.fromWave, wave, startCount, players, PLAYER_MULTS[players]) + decelerateNote, v:remaining()}];
  const pct = [];
  let killedAt = null, baseFailed = false, baseLeft = null;
  let dpsSeen = 0, policeDamage = 0;
  const dpsTotal = order.filter(c => c.k === "dps").length;

  order.forEach((card, idx)=>{
    const key = card.k, n = idx + 1;
    let hp = enemiesHp(enemies);
    if(hp <= 0){ pct.push(0); return; }

    if(key === "gil" || key === "mad"){
      const p = key === "gil" ? 0.25 : 0.33;
      const nm = key === "gil" ? TT.cGil : TT.cMad;
      let changed = false;
      enemies.forEach(enemy => {
        const target = enemy.max * p;
        if(enemy.hp > target){ enemy.hp = target; changed = true; }
      });
      steps.push({
        k: changed ? `${n}. ${nm} ${key==="gil"?TT.stGil:TT.stMad}` : `${n}. ${nm} <span class="noeff">${TT.stNoEff(p*100)}</span>`,
        v:remaining()
      });
    }
    else if(key === "luf"){
      const cut = Math.min(0.25 * buffMult("lufBuffs"), 1);
      enemies.forEach(enemy => enemy.hp *= (1-cut));
      steps.push({k:`${n}. ${TT.cLuf} ${TT.stLuf((cut*100).toFixed(1))}`, v:remaining()});
    }
    else if(key === "tboi"){
      const boom = TBOI_BASE * buffMult("tboiBuffs");
      damageAllEnemies(enemies, boom);
      steps.push({k:`${n}. ${TT.cTboi} ${TT.stTboi(boom)}`, v:remaining()});
    }
    else if(key === "netero"){
      const nuke = NETERO_NUKE_BASE * buffMult("neteroBuffs");
      damageAllEnemies(enemies, nuke);
      steps.push({k:`${n}. ${TT.cNetero} ${TT.stNetero(nuke)}`, v:remaining()});
    }
    else if(key === "kfg"){
      const p = kfgParts(card);
      damageEnemies(enemies, p.total);
      steps.push({k:`${n}. ${TT.cKfg} ${TT.stKfg(p)}`, v:remaining()});
    }
    else if(key === "dps" || key === "snap"){
      const snapshot = key === "snap";
      const typeAware = snapshot ? Object.keys(card.typeDps || {}).length > 0 : teamHasUnhuman();
      const sourceDps = snapshot ? Math.max(0, card.snapDps || 0) : teamDps();
      const dealt = sourceDps * Math.max(0, card.sec || 0) * cardBuffMult(card);
      const policeSource = snapshot ? Math.max(0, card.policeDps || 0) : teamUnitDps("Police Girl (Vamp)");
      policeDamage += policeSource * Math.max(0, card.sec || 0) * cardBuffMult(card);
      const label = snapshot ? TT.cSnap : (dpsTotal > 1 ? TT.dpsNo(++dpsSeen) : TT.cDps);
      const perEnemyDps = dealt / Math.max(card.sec, 1e-9);
      const longest = enemies.reduce((max,enemy) => Math.max(max, enemy.hp), 0);
      const result = typeAware
        ? (snapshot
          ? damageAllEnemiesBySnapshot(enemies, card.sec, cardBuffMult(card), card.typeDps)
          : damageAllEnemiesByTeam(enemies, card.sec, cardBuffMult(card)))
        : null;
      if(!result) damageAllEnemies(enemies, dealt);
      steps.push({k:`${n}. ${label} ${snapshot ? TT.stSnap(card.sec, sourceDps * cardBuffMult(card), dealt) : TT.stDps(card.sec, dealt)}`, v:remaining()});
      if(enemiesHp(enemies) <= 0 && dealt > 0) killedAt = result
        ? result.elapsed
        : longest / perEnemyDps;
    }
    else if(key === "base"){
      const baseHp = Math.max(0, parseFloat(card.base) || 0);
      const incoming = enemiesHp(enemies);
      const incomingCount = enemiesAlive(enemies);
      baseLeft = Math.max(0, baseHp - incoming);
      baseFailed = baseFailed || baseHp <= incoming;
      damageEnemies(enemies, baseHp);
      steps.push({k:`${n}. ${TT.cBase} ${TT.stBase(incoming, incomingCount)}`, v:`${TT.baseLeft(baseLeft)} · ${TT.enemiesLeft(enemiesAlive(enemies))}`});
    }
    else if(key === "policebase"){
      const generatedHp = Math.max(0, policeDamage);
      const incoming = enemiesHp(enemies);
      const incomingCount = enemiesAlive(enemies);
      baseLeft = Math.max(0, generatedHp - incoming);
      baseFailed = baseFailed || generatedHp <= incoming;
      damageEnemies(enemies, generatedHp);
      steps.push({k:`${n}. ${TT.cPolice} ${TT.stPolice(generatedHp, incoming, incomingCount)}`, v:`${TT.baseLeft(baseLeft)} · ${TT.enemiesLeft(enemiesAlive(enemies))}`});
    }
    hp = enemiesHp(enemies);
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
  const hp = enemiesHp(enemies);
  if(hp <= 0 && !baseFailed){
    verdict.className = "verdict pass";
    const extra = baseLeft != null ? TT.passBase(baseLeft)
      : (killedAt != null ? TT.passSub(killedAt < 1 ? killedAt.toFixed(2) : killedAt.toFixed(1)) : "");
    verdict.innerHTML = `<div class="big">${TT.passBig}</div><small>${extra}</small>`;
  } else {
    verdict.className = "verdict fail";
    const need = dps > 0 ? hp/dps : 0;
    const extra = baseFailed ? TT.baseDown : (dps > 0
      ? TT.failNeed(need >= 1000 ? formatHp(need) : need.toFixed(1))
      : TT.failNoDps);
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
    const key = b.closest(".t-card").dataset.card;
    const max = CARD_MAX[key];
    if(max != null && order.filter(c => c.k === key).length >= max) return;   /* ครบโควตาแล้ว */
    order.push(newCard(key));
    paintCardBtns(); renderOrder(); calcTeam();
  };
});
document.querySelectorAll("#lufBuffs .preset-chip, #tboiBuffs .preset-chip, #neteroBuffs .preset-chip").forEach(c=>{
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
document.querySelectorAll("#decelerateChips .preset-chip").forEach(c=>{
  c.onclick = ()=>{
    document.querySelectorAll("#decelerateChips .preset-chip").forEach(x => x.classList.remove("on"));
    c.classList.add("on");
    includeDecelerate = c.dataset.decelerate !== "exclude";
    renderOrder(); calcTeam();
  };
});
["wave","tableType"].forEach(id => $(id).addEventListener("input", ()=>{ renderOrder(); calcTeam(); }));
document.addEventListener("keydown", e => { if(e.key === "Escape") closePicker(); });

buildPicker();
buildTeams();
addUnitRow(1);
applyPlayers();
paintCardBtns();
renderOrder();
calcTeam();


/* สถานะของหน้านี้ — ใช้ตอนสลับภาษา */
window.PAGE_STATE = {
  get(){
    const teams = [];
    for(let i = 1; i <= 4; i++)
      teams.push([...document.querySelectorAll(`#rows${i} .u-item`)].map(r => {
        const saved = {...r.dataset};
        if(saved.unit !== "" && saved.unit !== "custom" && UNITS[+saved.unit]) saved.unitName = UNITS[+saved.unit][0];
        return saved;
      }));
    const farms = [];
    for(let i = 1; i <= 4; i++) farms.push(teamFarmSettings(i));
    const buffsOf = id => [...document.querySelectorAll(`#${id} .preset-chip.on`)].map(c => c.dataset.b);
    return {
      p: players, w: $("wave").value, table: $("tableType").value, decel: includeDecelerate,
      farms,
      t: teams,
      o: order.map(c => ({k:c.k, sec:c.sec, base:c.base, b:c.b ? [...c.b] : null,
        snapDps:c.snapDps, policeDps:c.policeDps, typeDps:c.typeDps || null})),
      lb: buffsOf("lufBuffs"), tb: buffsOf("tboiBuffs"), nb: buffsOf("neteroBuffs"),
    };
  },
  set(st){
    settingTeamState = true;
    if(st.p){
      document.querySelectorAll("#pChips .preset-chip").forEach(c =>{ if(+c.dataset.p === st.p) c.click(); });
    }
    if(st.w != null) $("wave").value  = st.w;
    if(st.table != null) $("tableType").value = st.table;
    includeDecelerate = st.decel !== false;
    document.querySelectorAll("#decelerateChips .preset-chip").forEach(c =>
      c.classList.toggle("on", (c.dataset.decelerate === "include") === includeDecelerate));
    const savedFarms = st.farms || Array.from({length:4}, () => ({type:st.farm || "jeff",doneWave:st.farmWave == null ? 15 : st.farmWave}));
    savedFarms.forEach((farm,i) =>{
      const box = $("team"+(i+1));
      if(!box) return;
      const input = box.querySelector(".team-farm-wave");
      if(farm.doneWave != null) input.value = farm.doneWave;
      const type = farm.type === "jeff-octo" ? "jeff-octo" : "jeff";
      box.querySelectorAll(".team-farm-chip").forEach(chip => chip.classList.toggle("on", chip.dataset.farm === type));
    });

    (st.t || []).forEach((rows, i) =>{
      const t = i + 1;
      $("rows"+t).innerHTML = "";
      rows.forEach(ds =>{
        const restored = {...ds};
        if(restored.unitName){
          const index = UNITS.findIndex(unit => unit[0] === restored.unitName);
          if(index >= 0) restored.unit = String(index);
          delete restored.unitName;
        }
        const row = document.createElement("div");
        row.className = "u-item";
        Object.assign(row.dataset, restored);
        $("rows"+t).appendChild(row);
        paintRow(row);
      });
      enforceTeamLimit(t);
      updateCnt(t);
    });

    if(st.o){
      order = st.o.map(c =>{
        const n = newCard(c.k);
        if(c.sec != null) n.sec = c.sec;
        if(c.base != null) n.base = c.base;
        if(c.b) n.b = new Set(c.b);
        if(c.snapDps != null) n.snapDps = c.snapDps;
        if(c.policeDps != null) n.policeDps = c.policeDps;
        if(c.typeDps) n.typeDps = c.typeDps;
        return n;
      });
    }
    ["lufBuffs","tboiBuffs","neteroBuffs"].forEach((id, k) =>{
      const want = (k === 0 ? st.lb : (k === 1 ? st.tb : st.nb)) || [];
      document.querySelectorAll(`#${id} .preset-chip`).forEach(c =>
        c.classList.toggle("on", want.includes(c.dataset.b)));
    });
    applyPlayers(); paintCardBtns(); renderOrder(); calcTeam();
    settingTeamState = false;
    persistTeamState();
  }
};

/* เก็บทีมไว้ในเครื่องจนกว่าผู้ใช้จะกดล้างทีม */
(function restorePersistentTeam(){
  try{
    const saved = JSON.parse(localStorage.getItem(TEAM_STORE_KEY) || "null");
    if(saved) PAGE_STATE.set(saved); else persistTeamState();
  }catch(e){ persistTeamState(); }
})();

$("clearSavedTeam").onclick = ()=>{
  try{ localStorage.removeItem(TEAM_STORE_KEY); }catch(e){}
  location.href = location.pathname + location.search;
};
