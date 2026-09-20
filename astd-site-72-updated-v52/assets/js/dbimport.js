/* ============================================================
   ASTD Comp — นำเข้าฐานข้อมูลยูนิตจากตาราง Statistics ของวิกิ
   Bulk import of the wiki's Statistics table into the unit DB.

   ใช้คู่กับหน้า data.html / data-en.html
   เก็บผลลัพธ์ไว้ใน localStorage คีย์ astd_units_db
   ไฟล์ units.js จะหยิบไปใช้อัตโนมัติทุกหน้า
   ============================================================ */

const DB_STORE_KEY = "astd_units_db";

/* ---------- localStorage ---------- */
function dbLoadOverride(){
  try {
    const rows = JSON.parse(localStorage.getItem(DB_STORE_KEY) || "null");
    return (Array.isArray(rows) && rows.length) ? rows : null;
  } catch(e){ return null; }
}
function dbSaveOverride(rows){
  try { localStorage.setItem(DB_STORE_KEY, JSON.stringify(rows)); return true; }
  catch(e){ return false; }
}
function dbClearOverride(){
  try { localStorage.removeItem(DB_STORE_KEY); } catch(e){}
}

/* ---------- ตัวช่วยแปลงตัวเลข ---------- */
function dbRound(v){ return Math.round(v * 100) / 100; }

function dbPlainNum(t){
  t = String(t).replace(/,/g, "").replace(/\s+/g, "");
  const m = t.match(/^([\d.]+)\s*([kmbt])?/i);
  if(!m) return null;
  const v = parseFloat(m[1]);
  if(isNaN(v)) return null;
  const mult = { k:1e3, m:1e6, b:1e9, t:1e12 }[(m[2]||"").toLowerCase()] || 1;
  return dbRound(v * mult);
}

/* รับ "1,234" / "12.5" / "1.2M" / "5,000 - 1,120,000" (ช่วง → ใช้ค่าเฉลี่ย) */
function dbNum(s){
  if(s == null) return null;
  const t = String(s).replace(/\u00a0/g, " ").replace(/\*+/g, "").trim();
  if(!t || /^(n\/?a|-|—|–|\?+|unknown|none|tbd)$/i.test(t)) return null;
  const rng = t.match(/^([\d.,]+\s*[kmbt]?)\s*[-–~]\s*([\d.,]+\s*[kmbt]?)$/i);
  if(rng){
    const a = dbPlainNum(rng[1]), b = dbPlainNum(rng[2]);
    if(a != null && b != null) return dbRound((a + b) / 2);
  }
  return dbPlainNum(t);
}

/* ---------- ตัวช่วยแปลงข้อความ ---------- */
/* วิกิมักก๊อปชื่อออกมาซ้ำสองรอบ เช่น "Mr. Green Mr. Green" → ตัดให้เหลือรอบเดียว */
function dbCleanName(s){
  let t = String(s || "").replace(/\u00a0/g, " ")
                        .replace(/\s*·\s*/g, " ")
                        .replace(/\s+/g, " ").trim();
  const n = t.length;
  if(n > 3 && n % 2 === 1 && t[(n - 1) / 2] === " "){
    const a = t.slice(0, (n - 1) / 2), b = t.slice((n + 1) / 2);
    if(a === b) t = a;
  }
  return t;
}

function dbNormType(s){
  const t = String(s || "").toLowerCase();
  if(/hybrid/.test(t))        return "Hybrid";
  if(/\bair\b|flying/.test(t)) return "Air";
  if(/ground|hill|\bland\b/.test(t)) return "Ground";
  return "";
}

function dbNormAtk(s){
  let t = String(s || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
  if(!t || /^(n\/?a|-|—|none)$/i.test(t)) return "";
  return t.replace(/\b([a-z])/g, c => c.toUpperCase());
}

function dbNormEnchant(s){
  const t = String(s || "").toLowerCase();
  const known = ["water","dark","holy","nature","electric","fire","wind","earth"];
  for(const k of known) if(t.includes(k)) return k[0].toUpperCase() + k.slice(1);
  return "";
}

function dbKey(name){
  return String(name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

/* ---------- แยกบรรทัดเป็นช่อง ---------- */
function dbSplitCells(line){
  if(line.includes("\t")) return line.split("\t").map(c => c.trim());
  if(/ {2,}/.test(line))  return line.split(/ {2,}/).map(c => c.trim());
  if(line.includes("|"))  return line.split("|").map(c => c.trim());
  return [line.trim()];
}

/* ---------- จับคอลัมน์จากหัวตาราง ---------- */
const DB_COL_PATTERNS = [
  ["name",    /^(unit ?name|name|units?|character)$/i],
  ["damage",  /damage|dmg/i],
  ["spa",     /\bspa\b|sec.*attack|attack.*speed|cooldown/i],
  ["range",   /range/i],
  ["dps",     /\bdps\b/i],
  ["cost",    /cost|price|cash/i],
  ["type",    /tower.?type|placement|^type$/i],
  ["attack",  /attack.?type|aoe|attack$/i],
  ["enchant", /enchant|element/i],
  ["note",    /note|remark|comment/i],
];

function dbMapHeader(cells){
  const map = {};
  cells.forEach((c, i) => {
    const t = String(c).replace(/\u00a0/g, " ").trim();
    if(!t) return;
    for(const [key, re] of DB_COL_PATTERNS){
      if(map[key] != null) continue;
      if(re.test(t)){ map[key] = i; break; }
    }
  });
  return map;
}

/* ------------------------------------------------------------
   หาช่อง "ชื่อยูนิต" จากข้อมูลจริง ไม่เชื่อหัวตารางอย่างเดียว
   (ตารางวิกิมีคอลัมน์รูปนำหน้า ก๊อปออกมาแล้วช่องแรกมักว่าง)
   ------------------------------------------------------------ */
function dbPickNameCol(sample, cols){
  if(!sample.length) return cols.name != null ? cols.name : 0;

  const taken = new Set(["damage","spa","range","dps","cost","type","attack","enchant"]
                        .map(k => cols[k]).filter(i => i != null));

  /* สัดส่วนแถวที่ช่องนี้เป็นข้อความ (ไม่ว่าง และไม่ใช่ตัวเลข) */
  const score = idx => {
    let hit = 0;
    for(const cells of sample){
      const v = (idx < cells.length ? cells[idx] : "").trim();
      if(v && dbNum(v) == null) hit++;
    }
    return hit / sample.length;
  };

  const current = cols.name != null ? cols.name : 0;
  if(score(current) >= 0.5) return current;

  const width = Math.max(...sample.map(c => c.length));
  for(let i = 0; i < width; i++){
    if(taken.has(i)) continue;
    if(score(i) >= 0.6) return i;
  }
  return current;
}

function dbIsHeaderCells(cells){
  const joined = cells.join(" ").toLowerCase();
  return /damage|dmg/.test(joined) && /(\bspa\b|range|\bdps\b)/.test(joined);
}

/* ============================================================
   ตัวอ่านหลัก — รับข้อความที่ก๊อปมาทั้งตาราง คืนรายการยูนิต
   คืนค่า { rows, cols, skipped, error }
   ============================================================ */
function parseStatsTable(text){
  if(!text || !text.trim()) return { rows: [], cols: {}, skipped: 0, error: "empty" };

  const lines = text.replace(/\u00a0/g, " ").split(/\r?\n/);

  /* --- หาบรรทัดหัวตาราง --- */
  let headerIdx = -1, cols = null;
  for(let i = 0; i < lines.length; i++){
    const cells = dbSplitCells(lines[i]);
    if(cells.length >= 3 && dbIsHeaderCells(cells)){
      const m = dbMapHeader(cells);
      if(m.damage != null){ headerIdx = i; cols = m; break; }
    }
  }

  /* --- โหมดแนวตั้ง: ก๊อปมาได้ช่องละบรรทัด --- */
  if(headerIdx < 0){
    const vertical = dbParseVertical(lines);
    if(vertical) return vertical;
    return { rows: [], cols: {}, skipped: 0, error: "noheader" };
  }

  /* --- โหมดตาราง --- */
  const width = dbSplitCells(lines[headerIdx]).length;

  /* เก็บแถวข้อมูลไว้ก่อน แล้วค่อยตัดสินว่าช่องไหนคือชื่อยูนิต */
  const body = [];
  for(let i = headerIdx + 1; i < lines.length; i++){
    const raw = lines[i];
    if(!raw.trim()) continue;
    const cells = dbSplitCells(raw);
    if(dbIsHeaderCells(cells)) continue;           /* หัวตารางซ้ำ */
    body.push(cells);
  }
  cols.name = dbPickNameCol(body.slice(0, 25), cols);

  const rows = [];
  let skipped = 0;
  for(const cells of body){
    if(cells.length < Math.min(3, width)){ skipped++; continue; }
    const row = dbBuildRow(cells, cols);
    if(row) rows.push(row); else skipped++;
  }

  return { rows, cols, skipped, error: rows.length ? null : "norows" };
}

/* โหมดแนวตั้ง — หาแถวหัวข้อที่เรียงติดกันเป็นบรรทัดเดี่ยว แล้วหั่นทีละชุด */
function dbParseVertical(lines){
  const clean = lines.map(l => l.trim()).filter(l => l !== "");
  let start = -1, headIdx = -1, headers = [];

  for(let i = 0; i < clean.length; i++){
    if(!/^(damage|dmg)$/i.test(clean[i])) continue;
    /* เก็บหัวข้อต่อเนื่องไปเรื่อยๆ จนเจอบรรทัดที่ไม่ใช่ชื่อคอลัมน์ */
    const hs = [];
    let j = i;
    while(j < clean.length && hs.length < 12 &&
          DB_COL_PATTERNS.some(([, re]) => re.test(clean[j]))){
      hs.push(clean[j]); j++;
    }
    if(hs.length >= 3){ start = j; headIdx = i; headers = hs; break; }
  }
  if(start < 0) return null;

  /* ชื่อยูนิตมาก่อนคอลัมน์ Damage เสมอ จึงเติมช่อง name ไว้หน้าสุด */
  const cells = ["Name", ...headers];
  const cols  = dbMapHeader(cells);
  cols.name   = 0;
  const width = cells.length;

  const chunkUp = arr => {
    const rows = [];
    let skipped = 0;
    for(let i = 0; i + width <= arr.length; i += width){
      const row = dbBuildRow(arr.slice(i, i + width), cols);
      if(row) rows.push(row); else skipped++;
    }
    return { rows, skipped };
  };

  /* ชื่อยูนิตตัวแรกมักลอยอยู่เหนือหัวตาราง ทำให้ชุดข้อมูลเลื่อนไป 1 ช่อง
     จึงลองทั้งสองแบบแล้วเลือกแบบที่อ่านได้มากกว่า */
  const plain = chunkUp(clean.slice(start));

  const above = clean.slice(0, headIdx)
                     .filter(l => !DB_COL_PATTERNS.some(([, re]) => re.test(l)));
  const shifted = above.length
    ? chunkUp([above[above.length - 1], ...clean.slice(start)])
    : { rows: [], skipped: 0 };

  const best = shifted.rows.length > plain.rows.length ? shifted : plain;
  return { rows: best.rows, cols, skipped: best.skipped,
           error: best.rows.length ? null : "norows" };
}

/* สร้างแถวข้อมูลหนึ่งยูนิตจากช่องที่แยกมาแล้ว */
function dbBuildRow(cells, cols){
  const at = k => (cols[k] != null && cols[k] < cells.length) ? cells[cols[k]] : "";
  const name = dbCleanName(at("name"));
  if(!name) return null;
  if(/^\d/.test(name) && dbNum(name) != null) return null;   /* ช่องตัวเลขหลุดมา */

  const dmg  = dbNum(at("damage"));
  const spa  = dbNum(at("spa"));
  const rng  = dbNum(at("range"));
  const cost = dbNum(at("cost"));
  let   dps  = dbNum(at("dps"));

  /* ไม่มีทั้งดาเมจและ DPS ถือว่าไม่ใช่แถวข้อมูล */
  if(dmg == null && dps == null) return null;

  return [
    name,
    dmg,
    spa,
    rng,
    cost,
    dbNormType(at("type")),
    dbNormAtk(at("attack")),
    dbNormEnchant(at("enchant")),
    0,   /* isNew — ตารางวิกิไม่มี เดี๋ยวดึงของเดิมมาใส่ */
    0,   /* star   — เหมือนกัน */
  ];
}

/* ============================================================
   รวมข้อมูลใหม่เข้ากับฐานข้อมูลเดิม
   mode = "replace" (เป๊ะตามตาราง) | "merge" (เติม/อัปเดต)
   keepStarless = เก็บยูนิตเดิมที่ยังไม่มีสถิติไว้ (เช่นรายชื่อ 7★)
   ============================================================ */
function dbMergeRows(base, parsed, mode, keepStarless){
  const baseMap   = new Map(base.map(u => [dbKey(u[0]), u]));
  const parsedMap = new Map(parsed.map(p => [dbKey(p[0]), p]));
  const report = { added: [], updated: [], same: [], removed: [] };

  /* เติมข้อมูลที่ตารางวิกิไม่มี (ป้าย NEW / 7★ / ช่องว่าง) จากของเดิม */
  const enriched = parsed.map(p => {
    const old = baseMap.get(dbKey(p[0]));
    const row = p.slice();
    if(!old){ report.added.push(row[0]); return row; }

    row[8] = old[8] || 0;
    row[9] = old[9] || 0;
    for(let i = 1; i <= 7; i++){
      if(row[i] == null || row[i] === "") row[i] = old[i];
    }
    const changed = [1,2,3,4,5,6,7].some(i => String(row[i]) !== String(old[i]));
    (changed ? report.updated : report.same).push(row[0]);
    return row;
  });
  const newMap = new Map(enriched.map(r => [dbKey(r[0]), r]));

  /* merge — คงลำดับเดิมไว้ แล้วต่อท้ายตัวใหม่ */
  if(mode === "merge"){
    const out = base.map(u => newMap.get(dbKey(u[0])) || u.slice());
    enriched.forEach(r => { if(!baseMap.has(dbKey(r[0]))) out.push(r); });
    return { rows: out, report };
  }

  /* replace — ยึดลำดับและรายชื่อตามตารางวิกิ */
  const out = enriched.slice();
  base.forEach(u => {
    if(parsedMap.has(dbKey(u[0]))) return;
    if(keepStarless) out.push(u.slice());
    else report.removed.push(u[0]);
  });
  return { rows: out, report };
}

/* ============================================================
   แปลงกลับเป็นโค้ดสำหรับวางใน assets/js/units.js
   ============================================================ */
function dbRowsToCode(rows){
  const q = s => JSON.stringify(String(s == null ? "" : s));
  const n = v => (v == null ? "null" : String(v));
  const body = rows.map(r =>
    `[${q(r[0])},${n(r[1])},${n(r[2])},${n(r[3])},${n(r[4])},${q(r[5])},${q(r[6])},${q(r[7])}` +
    ((r[8] || r[9]) ? `,${n(r[8]||0)},${n(r[9]||0)}]` : `]`)
  ).join(",\n");
  return `const UNITS = [\n${body},\n];`;
}

function dbRowsToUnitsFile(rows){
  const stamp = new Date().toISOString().slice(0, 10);
  return `/* ============================================================
   ASTD UNIT DATABASE
   นำเข้าจากตาราง Statistics ของ allstartd.fandom.com/wiki/Statistics
   วันที่นำเข้า: ${stamp} — ${rows.length} ยูนิต
   เนื้อหาต้นทางเผยแพร่ภายใต้สัญญาอนุญาต CC BY-SA 3.0

   รูปแบบ:
   ["ชื่อ", Damage, SPA, Range, TotalCost, "Ground/Air/Hybrid", "AtkType", "Enchant", isNew, star]
   - ยูนิตที่ยังไม่มีสถิติใส่ null (เลือกในเว็บแล้วกรอกเองได้)
   - isNew ใส่ 1 = ขึ้นป้าย NEW / star ใส่ 7 = ขึ้นป้าย 7★
   ============================================================ */
${dbRowsToCode(rows)}
`;
}
