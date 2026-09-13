/* ============================================================
   ASTD UPGRADE TABLES — ค่าสถิติรายขั้นอัปเกรด / per-upgrade stats

   รูปแบบ (key = slug ของยูนิต ดูได้จากใต้รูปในหน้า Calculator):
     "slug": [
       {lv:0,  cost:500,  dmg:7500,  rng:30, spa:6, note:"Deployment"},
       {lv:1,  cost:500,  dmg:27500, rng:30, spa:6},
       ...
     ]
   - cost = ราคาของ "ขั้นนั้น" (ไม่ใช่ยอดสะสม เว็บบวกสะสมให้เอง)
   - lv:0 คือตอนวางครั้งแรก (Deployment)
   - ตัวเลขชุดนี้คือคอลัมน์ "Level 1" ของวิกิ (ค่าเริ่มต้นที่วิกิโชว์)
     ส่วนตัวเลขในหน้า Calculator ช่องบนเป็น Level 175 จาก units.js จึงสูงกว่า
     ถ้าอยากได้ชุด Level 175 ให้กดปุ่ม Level 175 บนวิกิก่อนค่อยก๊อปมาวาง

   วิธีเติมให้ครบเร็วที่สุด: เปิดหน้ายูนิตบนวิกิ → ลากคลุมบล็อก Stats Overview
   ทั้งก้อน (Deployment ถึง Upgrade สุดท้าย) → ก๊อป → ไปหน้า Calculator
   วางในช่อง "นำเข้าตารางอัปเกรด" กด "อ่านข้อมูล" เว็บจะแปลงให้เอง
   แล้วกด "คัดลอกเป็นโค้ด" เอามาวางต่อท้ายในไฟล์นี้เพื่อเก็บถาวร
   ============================================================ */
const UPGRADES = {

/* ตัวอย่างจริงจากวิกิ / verified example from the wiki */
"aqua-koku": [
  {lv:0,  cost:500,     dmg:7500,    rng:30,  spa:6, note:"AoE (Circle)"},
  {lv:1,  cost:500,     dmg:27500,   rng:30,  spa:6},
  {lv:2,  cost:2000,    dmg:58300,   rng:30,  spa:6},
  {lv:3,  cost:4500,    dmg:94800,   rng:45,  spa:6},
  {lv:4,  cost:5000,    dmg:144000,  rng:45,  spa:6},
  {lv:5,  cost:7500,    dmg:211000,  rng:60,  spa:6, note:"Charge Blue Beam / AoE (Cone)"},
  {lv:6,  cost:9000,    dmg:292000,  rng:60,  spa:6},
  {lv:7,  cost:11000,   dmg:376000,  rng:75,  spa:6},
  {lv:8,  cost:350000,  dmg:698000,  rng:75,  spa:6},
  {lv:9,  cost:500000,  dmg:1110000, rng:75,  spa:6},
  {lv:10, cost:1000000, dmg:1670000, rng:105, spa:6, note:"Teleport Charge Blue Beam / AoE (Circle)"},
],

/* Ultra Koku — 5★ (allstartd.fandom.com/wiki/Ultra_Koku) */
"ultra-koku": [
  {lv:0, cost:500,  dmg:40,  rng:28, spa:8, note:"Air, Single"},
  {lv:1, cost:350,  dmg:60,  rng:33, spa:8},
  {lv:2, cost:600,  dmg:85,  rng:38, spa:8, note:"IT Blue Beam / AoE (Cone)"},
  {lv:3, cost:800,  dmg:115, rng:46, spa:8},
  {lv:4, cost:1750, dmg:160, rng:56, spa:7},
],

/* Tokens — 6★ (allstartd.fandom.com/wiki/Tokens) */
"tokens": [
  {lv:0, cost:4000,     dmg:1300,     rng:40,  spa:5, note:"Ground, AoE (Circle)"},
  {lv:1, cost:4000,     dmg:43300,    rng:40,  spa:5},
  {lv:2, cost:8000,     dmg:127000,   rng:40,  spa:5},
  {lv:3, cost:16000,    dmg:294000,   rng:60,  spa:5, note:"GHOST MODE!"},
  {lv:4, cost:32000,    dmg:502000,   rng:65,  spa:5},
  {lv:5, cost:44000,    dmg:763000,   rng:70,  spa:5},
  {lv:6, cost:60000,    dmg:1130000,  rng:75,  spa:5},
  {lv:7, cost:80000,    dmg:1600000,  rng:75,  spa:5},
  {lv:8, cost:96000,    dmg:3750000,  rng:85,  spa:8, note:"Hybrid — can hit air"},
  {lv:9, cost:13200000, dmg:16200000, rng:110, spa:8},
],

/* Veguko — 6★ (allstartd.fandom.com/wiki/Veguko) — ราคาวางจริง 725-20,600 แล้วแต่ยูนิตที่ใช้ฟิวส์ */
"veguko": [
  {lv:0, cost:725,     dmg:1234,    rng:45,  spa:7, note:"Ground, AoE (Circle)"},
  {lv:1, cost:2500,    dmg:4034,    rng:50,  spa:7},
  {lv:2, cost:3500,    dmg:7534,    rng:55,  spa:7},
  {lv:3, cost:4000,    dmg:11334,   rng:103, spa:9, note:"Supa V / AoE (Cone) / hits air"},
  {lv:4, cost:6250,    dmg:14334,   rng:103, spa:9},
  {lv:5, cost:6250,    dmg:18734,   rng:103, spa:9},
  {lv:6, cost:1375750, dmg:1008734, rng:113, spa:9, note:"BANG! / big AoE (Circle)"},
],

/* ===== 7★ ===== */

/* Ant King (Awakened) — 7★ (allstartd.fandom.com/wiki/Ant_King_(Awakened)) */
"ant-king-awakened": [
  {lv:0, cost:2000,    dmg:5130,     rng:45,  spa:2,  note:"Hybrid, AoE (Circle)"},
  {lv:1, cost:3000,    dmg:15400,    rng:45,  spa:2},
  {lv:2, cost:11000,   dmg:336000,   rng:90,  spa:6,  note:"Fiber Smash / AoE (Cone)"},
  {lv:3, cost:25000,   dmg:980000,   rng:90,  spa:6},
  {lv:4, cost:280000,  dmg:5880000,  rng:100, spa:7,  note:"Fiber Smash / AoE (Full)"},
  {lv:5, cost:6640000, dmg:19600000, rng:100, spa:7},
  {lv:6, cost:8000000, dmg:67000000, rng:100, spa:12, note:"Aura Synthesis (manual ability)"},
],

/* Heavenly Duo — 7★ (allstartd.fandom.com/wiki/Heavenly_Duo) — Gilgamesh + Enkidu
   ความสามารถ Enuma Reduction: ตัดเลือดศัตรูทั้งแมพเหลือ 25% ของเลือดเต็ม (การ์ด Gilgamesh ในหน้า Team) */
"heavenly-duo": [
  {lv:0, cost:600,      dmg:14000,    rng:50,  spa:6,  note:"Hill, AoE (Circle)"},
  {lv:1, cost:19400,    dmg:112000,   rng:50,  spa:6},
  {lv:2, cost:40000,    dmg:336000,   rng:65,  spa:6,  note:"Sword Of Rupture / AoE (Cone)"},
  {lv:3, cost:65000,    dmg:1120000,  rng:65,  spa:6},
  {lv:4, cost:90000,    dmg:2380000,  rng:80,  spa:6,  note:"Gates and Ages of Babylon / AoE (Circle)"},
  {lv:5, cost:145000,   dmg:3920000,  rng:90,  spa:6},
  {lv:6, cost:7640000,  dmg:16800000, rng:100, spa:12, note:"Combined Enuma Elish / AoE (Cone)"},
  {lv:7, cost:12000000, dmg:71700000, rng:100, spa:12, note:"Enuma Reduction (manual ability)"},
],

/* Legendary Leader (Path) — 7★ (allstartd.fandom.com/wiki/Legendary_Leader_(Path))
   ชุดนี้เป็นคอลัมน์ Level 175 ของวิกิ จึงตรงกับสถิติในหน้า Calculator พอดี
   (ตารางอื่นด้านบนเป็นคอลัมน์ Level 1 ดูหัวไฟล์ประกอบ) */
"legendary-leader-path": [
  {lv:0, cost:1000,    dmg:20991.6,   rng:50,  spa:6, note:"Ground / AoE (Circle)"},
  {lv:1, cost:15000,   dmg:239904,    rng:50,  spa:6},
  {lv:2, cost:54000,   dmg:2249100,   rng:70,  spa:9, note:"+ Reality"},
  {lv:3, cost:100000,  dmg:5397840,   rng:70,  spa:9},
  {lv:4, cost:270000,  dmg:11866680,  rng:100, spa:9, note:{th:"+ Hybrid / ตีเป้าหมายบนอากาศได้ / ได้สกิล Tsuku", en:"+ Hybrid / Attacks can now hit air enemies / Obtains Tsuku manual ability"}},
  {lv:5, cost:3400000, dmg:22491000,  rng:110, spa:9, note:{th:"+ Devastation / เปลี่ยนเป็น AoE (Cone)", en:"+ Devastation / Attack type changes to AoE (Cone)"}},
  {lv:6, cost:6000000, dmg:44982000,  rng:110, spa:9},
  {lv:7, cost:8740000, dmg:111384000, rng:110, spa:9, note:{th:"ได้สกิล Yomi", en:"Obtains Yomi manual ability"}},
],

/* Second Trumpet: Salt King — 7★ (คอลัมน์ Level 175 ของวิกิ)
   jdg:true = ยูนิตนี้ติดสถานะ Judgement ให้ศัตรู ระบบจะคิดช่อง Judgement DPS ให้เอง */
"second-trumpet-salt-king": [
  {lv:0, cost:600,     dmg:33597.27,     rng:40,  spa:5,  jdg:true, note:"Hybrid / AoE (Circle)"},
  {lv:1, cost:5400,    dmg:150004.26,    rng:70,  spa:5,  jdg:true},
  {lv:2, cost:14000,   dmg:560004.48,    rng:100, spa:7,  jdg:true, note:{th:"+ Slashes of the Divine / เปลี่ยนเป็น AoE (Cone)", en:"+ Slashes of the Divine / Attack type changes to AoE (Cone)"}},
  {lv:3, cost:20000,   dmg:2099995.38,   rng:100, spa:7,  jdg:true},
  {lv:4, cost:320000,  dmg:14759997.21,  rng:135, spa:9,  jdg:true, note:"+ Spiked Waves of Salt"},
  {lv:5, cost:640000,  dmg:30600001.53,  rng:135, spa:9,  jdg:true},
  {lv:6, cost:6500000, dmg:54000002.07,  rng:135, spa:9,  jdg:true, note:{th:"ได้สกิล Who Art in Heaven", en:"Obtains Who Art in Heaven manual ability"}},
  {lv:7, cost:7250000, dmg:133000003.71, rng:200, spa:14, jdg:true, note:{th:"+ Abddon's Demise / เปลี่ยนเป็น AoE (Circle)", en:"+ Abddon's Demise / Attack type changes to AoE (Circle)"}},
  {lv:8, cost:8250000, dmg:196000004.34, rng:200, spa:14, jdg:true, note:"+ Seraph's Rebirth, Sinner's Repentance"},
  /* ใช้สกิล Seraph's Rebirth แล้ว: ดาเมจพื้นฐาน +221,760,000 แบบตายตัว
     flat = ส่วนที่ Leader กับ Orb คูณไม่ได้ (แต่บัฟ 250/300% และ Support ยังคูณได้ปกติ) */
  {lv:9, cost:0, dmg:196000004.34, flat:221760000, rng:200, spa:14, jdg:true,
   name:"Seraph's Rebirth, Sinner's Repentance",
   note:{th:"ดาเมจพื้นฐาน +221,760,000 — Leader กับ Orb คูณส่วนนี้ไม่ได้",
         en:"Base damage +221,760,000 — Leader and Orb do not multiply this part"}},
],

/* TBOI (Rebirth) — 7★ (คอลัมน์ Level 175 ของวิกิ) */
"tboi-rebirth": [
  {lv:0, cost:600,     dmg:46899.09,     rng:70,  spa:7,   note:"Hybrid / AoE (Circle)"},
  {lv:1, cost:900,     dmg:105000.84,    rng:70,  spa:7},
  {lv:2, cost:4500,    dmg:399997.08,    rng:100, spa:8,   note:"+ Slice them open... TBOI"},
  {lv:3, cost:10000,   dmg:1040005.26,   rng:100, spa:8},
  {lv:4, cost:14000,   dmg:2079999.81,   rng:130, spa:8,   note:"+ Black Gash"},
  {lv:5, cost:70000,   dmg:7999995.15,   rng:130, spa:8},
  {lv:6, cost:140000,  dmg:16639998.48,  rng:160, spa:8,
   note:{th:"+ Pandemonium / เปลี่ยนเป็น AoE (Cone)", en:"+ Pandemonium / Attack type changes to AoE (Cone)"}},
  {lv:7, cost:760000,  dmg:42880001.85,  rng:160, spa:8},
  {lv:8, cost:6000000, dmg:178600002.84, rng:180, spa:9.5,
   note:{th:"+ Flicker... TBOI / เปลี่ยนเป็น AoE (Full)", en:"+ Flicker... TBOI / Attack type changes to AoE (Full)"}},
  {lv:9, cost:8000000, dmg:379999999.89, rng:180, spa:9.5,
   note:{th:"+ The TBOI Special / ได้สกิล The TBOI Special", en:"+ The TBOI Special / Obtains \"The TBOI Special\" manual ability"}},
],
};

/* ---------- storage: ตารางที่ผู้ใช้นำเข้าเอง / user-imported tables ---------- */
const UPG_STORE_KEY = "astd_upgrade_tables";
function loadUpgStore(){
  try { return JSON.parse(localStorage.getItem(UPG_STORE_KEY) || "{}"); }
  catch(e){ return {}; }
}
function saveUpgTable(name, rows){
  const store = loadUpgStore();
  if(rows && rows.length) store[unitSlug(name)] = rows; else delete store[unitSlug(name)];
  try { localStorage.setItem(UPG_STORE_KEY, JSON.stringify(store)); } catch(e){}
}
function getUpgrades(name){
  const slug = unitSlug(name);
  return loadUpgStore()[slug] || UPGRADES[slug] || null;
}

/* ---------- parser: อ่านข้อความที่ก๊อปมาจากวิกิ / parse pasted wiki text ----------
   รองรับรูปแบบ:
     Deployment -Cash500
       • Damage: 7,500
       • Range: 30
       • SPA: 6
     Upgrade 1 -Cash500 ...
   และแบบบรรทัดเดียว: "Upgrade 1 - Cost: 1500 · Damage: 4500 · SPA: 5 · Range: 55"
------------------------------------------------------------------ */
function parseUpgradeText(text){
  if(!text) return [];
  const num = s => parseFloat(String(s).replace(/[, ]/g,""));
  const clean = text.replace(/\u00a0/g," ");
  /* ตัดเป็นบล็อกตามหัวข้อ Deployment / Upgrade n */
  const parts = clean.split(/(?=(?:Deployment|Upgrade\s*\d+))/i).filter(p=>/Damage\s*:/i.test(p));
  const rows = [];
  parts.forEach(p=>{
    const isDeploy = /^\s*Deployment/i.test(p);
    const lvM   = p.match(/Upgrade\s*(\d+)/i);
    const dmgM  = p.match(/Damage\s*:?\s*([\d,\.]+)/i);
    const rngM  = p.match(/Range\s*:?\s*([\d,\.]+)/i);
    const spaM  = p.match(/SPA\s*:?\s*([\d,\.]+)/i);
    const costM = p.match(/(?:Cash|Cost\s*:?)\s*([\d,\.]+)/i);
    if(!dmgM) return;
    rows.push({
      lv:   isDeploy ? 0 : (lvM ? parseInt(lvM[1]) : rows.length),
      cost: costM ? num(costM[1]) : 0,
      dmg:  num(dmgM[1]),
      rng:  rngM ? num(rngM[1]) : 0,
      spa:  spaM ? num(spaM[1]) : 0,
    });
  });
  rows.sort((a,b)=>a.lv-b.lv);
  return rows;
}

/* ---------- helpers ---------- */
function upgradeCumCost(rows, idx){
  return rows.slice(0, idx+1).reduce((s,r)=> s + (r.cost||0), 0);
}
function upgradesToCode(name, rows){
  const pad = (v,w)=> String(v).padEnd(w);
  const body = rows.map(r =>
    `  {lv:${pad(r.lv+",",4)} cost:${pad(r.cost+",",10)} dmg:${pad(r.dmg+",",10)} rng:${pad(r.rng+",",6)} spa:${r.spa}},`
  ).join("\n");
  return `"${unitSlug(name)}": [\n${body}\n],`;
}

/* ============================================================
   Judgement — ยูนิตบางตัวติดสถานะให้ศัตรู ดาเมจส่วนนี้นับเป็น DPS ด้วย
   สถานะอยู่ 20 วิ ตัวหารคือรอบยิงที่ครอบ 20 วิพอดี = ceil(20/SPA) x SPA
   DPS รวม = DPS ปกติ + Judgement DPS
   ============================================================ */
function judgementWindow(spa){ return Math.ceil(20 / spa) * spa; }
function hasJudgement(name){
  const t = (typeof UPGRADES !== "undefined") ? UPGRADES[unitSlug(name)] : null;
  return !!(t && t.some(r => r.jdg));
}
function judgementDps(dmg, spa){
  return (dmg > 0 && spa > 0) ? dmg * 0.25 * 10 / judgementWindow(spa) : 0;
}
/* DPS รวมของยูนิตหนึ่งตัว (บวก Judgement ให้เองถ้ายูนิตนั้นมี) */
/* แยกดาเมจของแถวขั้นอัปเกรดเป็นสองส่วน: ส่วนที่บัฟคูณได้ทุกอย่าง กับส่วนตายตัว */
function rowBase(r){ return r ? (r.dmg || 0) : 0; }
function rowFlat(r){ return r ? (r.flat || 0) : 0; }
function rowDmgTotal(r){ return rowBase(r) + rowFlat(r); }

function unitTotalDps(name, dmg, spa){
  if(!(spa > 0)) return 0;
  const base = dmg / spa;
  return hasJudgement(name) ? base + judgementDps(dmg, spa) : base;
}
