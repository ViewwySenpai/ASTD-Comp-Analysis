/* ============================================================
   ASTD HP CORE — สูตรเลือดมอน (Anchor Table Edition)
   ใช้ร่วมกันทั้งหน้า Mob HP และหน้า Team
   ============================================================ */

/* ==================================================================
   ⭐ ตารางจุดยึด (Wave : HP จริงในเกม) — แก้/เพิ่มตรงนี้ที่เดียว
   เห็นค่าจริง Wave ไหน ก็เพิ่มบรรทัดใหม่ได้เลย เช่น  100: 1234500000,
   ================================================================== */
const ANCHORS = {
  30: 817,
  86: 107170000,      // 107.17M (ค่าจริงจากเกม)
  90: 253270000,      // 253.27M (ค่าจริงจากเกม - สกรีนช็อต Wave 90)
  95: 742100000,      // 742.10M (ค่าจริงจากเกม - สกรีนช็อต Wave 95)
};

/* HP จริง Wave 1-30 (ตารางตรงจากเกม — Wave 1 = 41) */
const EARLY_HP = [
  41, 46, 51, 57, 62, 68, 74, 80, 86, 93,
  100, 108, 116, 125, 135, 146, 158, 172, 189, 208,
  231, 258, 290, 329, 375, 432, 501, 586, 690, 817
];

/* ตัวคูณจำนวนผู้เล่น */
const PLAYER_MULTS = {1: 1.0, 2: 1.6, 3: 2.4, 4: 3.2};

/* ตัวคูณประเภทมอน */
const ENEMY_MULTS = {weak: 1.00, medium: 1.30, strong: 1.75};

/* จัดฟอร์แมตตัวเลข (K, M, B, T, Qa, Qi, ...) */
function formatHp(num){
  if(!isFinite(num)) return "เกินช่วงคำนวณ";
  if(num <= 0) return "0";
  if(num < 1000) return (+num.toFixed(2)).toString();
  const suf = ['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc'];
  let i = 0, val = num;
  while(val >= 1000 && i < suf.length-1){ val /= 1000; i++; }
  if(val >= 1000) return num.toExponential(3);
  return val.toFixed(4) + suf[i];
}

/* คำนวณ Base HP จากตารางจุดยึด (พอร์ตตรงจาก Enemies program.py) */
function calculateBaseHp(wave){
  if(wave <= 30) return EARLY_HP[wave-1];

  const waves = Object.keys(ANCHORS).map(Number).sort((a,b)=>a-b);
  if(ANCHORS[wave] !== undefined) return ANCHORS[wave];

  let a, b;
  if(wave > waves[waves.length-1]){
    a = waves[waves.length-2]; b = waves[waves.length-1];
  } else {
    a = waves[0]; b = waves[1];
    for(let i=0; i<waves.length-1; i++){
      if(waves[i] < wave && wave < waves[i+1]){ a = waves[i]; b = waves[i+1]; break; }
    }
  }

  const mult = Math.pow(ANCHORS[b]/ANCHORS[a], 1/(b-a));
  return wave > waves[waves.length-1]
    ? ANCHORS[b] * Math.pow(mult, wave - b)
    : ANCHORS[a] * Math.pow(mult, wave - a);
}
