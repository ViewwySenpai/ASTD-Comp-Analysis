/* Regular Infinite: 15 waves per cycle, 302 enemies.
   Source: Regular Table Loop 15 Wave Mob.txt supplied by the user. */
const MOB_CYCLE = [
  ["N","N","N","D","D"],
  ["N","N","N","N","D","D","A","A","A"],
  ["N","N","N","N","2","2","D","D"],
  ["N","N","N","N","P","P","D","2","2","2","A","A","A","D","D"],
  ["N","N","N","N","2","2","2","2","E","E","E","D","D"],
  ["N","N","N","N","N","P","P","P","2","2","2","2","2","A","A","A","D","D","C"],
  ["N","N","N","N","N","2","2","2","2","2","3","D","D"],
  ["N","D","N","N","N","2","2","2","2","2","P","P","P","D","3","3","A","A","A","D","D","C"],
  ["N","N","N","N","N","N","2","2","2","2","2","E","E","E","3","3","A","A","A","D","D"],
  ["N","N","N","N","N","N","2","2","2","2","2","2","2","P","P","P","P","3","3","D","D","C"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","2","2","2","2","3","3","3","A","A","A","E","E","E","3","3","3","D","D"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","2","2","2","2","P","P","P","P","P","3","3","3","3","D","D","A","E","E","D","D","C"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","2","2","2","2","3","3","3","3","A","A","A","3","3","3","D","D"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","2","2","2","2","P","P","P","P","P","3","3","3","3","3","A","A","A","3","3","3","D","D","C"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","2","2","2","2","A","A","A","E","E","E","3","3","3","3","3","D","D"]
];

/* Air Infinite: 15 waves per cycle.
   Source: Air Table Loop 15 Wave Mob.txt supplied by the user.
   Bugged HP = Strong HP ×3.14830508 = Base HP ×5.50953389. */
const AIR_MOB_CYCLE = [
  "11111",
  "11111",
  "1112211",
  "1111122211",
  "11122233311",
  "11111112222111",
  "11112222311",
  "11112222111133111",
  "11111122223333311",
  "1111111222222111133111",
  "11111122222233333333311",
  "111111222222111113333333111",
  "11111122222233333311",
  "11111122222211111333333333111",
  "111111222222333333333b11"
].map(row => [...row].map(code => `a${code}`));

const MOB_CYCLES = {regular:MOB_CYCLE, air:AIR_MOB_CYCLE};
const BUGGED_MULT = 1.75 * 3.14830508;

const MOB_KIND = {
  N:{mult:1,    cls:"normal",     th:"ปกติ",      en:"Normal"},
  "2":{mult:1.3, cls:"medium",     th:"กลาง",      en:"Medium"},
  "3":{mult:1.75,cls:"strong",     th:"แข็งแกร่ง", en:"Strong"},
  D:{mult:1,    cls:"decelerate", th:"ลดความเร็ว", en:"Decelerate"},
  A:{mult:1,    cls:"armoured",   th:"เกราะ",      en:"Armoured"},
  P:{mult:1,    cls:"powerful",   th:"ทรงพลัง",    en:"Powerful"},
  C:{mult:1,    cls:"cloner",     th:"โคลน",       en:"Cloner"},
  E:{mult:1.75, cls:"explosive",  th:"ระเบิด",     en:"Explosive"},
  a1:{mult:1, cls:"air-normal", label:"1", air:true, th:"Air ปกติ", en:"Air Normal"},
  a2:{mult:1.3, cls:"air-medium", label:"2", air:true, th:"Air กลาง", en:"Air Medium"},
  a3:{mult:1.75, cls:"air-strong", label:"3", air:true, th:"Air แข็งแกร่ง", en:"Air Strong"},
  ab:{mult:BUGGED_MULT, cls:"bugged", label:"B", air:true, th:"Air Bugged", en:"Air Bugged"}
};

function mobCycleOf(type){ return MOB_CYCLES[type] || null; }

window.clearMobCycle = function(){
  const host = document.getElementById("cycleRows");
  if(!host) return;
  host.innerHTML = "";
  const empty = document.getElementById("cycleEmpty");
  if(empty) empty.style.display = "block";
  const content = document.getElementById("cycleContent");
  if(content) content.style.display = "none";
};

window.renderMobCycle = function(options){
  const host = document.getElementById("cycleRows");
  if(!host) return;
  const lang = document.documentElement.lang === "en" ? "en" : "th";
  const opts = (typeof options === "object" && options) ? options : {playerCount:options};
  const type = opts.type || "regular";
  const empty = document.getElementById("cycleEmpty");
  const content = document.getElementById("cycleContent");

  const cycle = mobCycleOf(type);
  if(!cycle){
    host.innerHTML = "";
    if(content) content.style.display = "none";
    if(empty){
      empty.style.display = "block";
      empty.textContent = lang === "en"
        ? `No ${type[0].toUpperCase()+type.slice(1)} cycle data yet.`
        : `ยังไม่มีข้อมูล Cycle แบบ ${type[0].toUpperCase()+type.slice(1)}`;
    }
    return;
  }

  const pm = PLAYER_MULTS[opts.playerCount || 1] || 1;
  const fromWave = Math.max(1, parseInt(opts.fromWave) || 1);
  const requestedTo = Math.max(fromWave, parseInt(opts.toWave) || fromWave);
  const toWave = requestedTo;
  const waves = Array.from({length:toWave-fromWave+1}, (_,i) => fromWave+i);
  const refHp = calculateBaseHp(fromWave) * pm;
  const maxHp = Math.max(...waves.flatMap(w => cycle[(w-1)%cycle.length].map(code => calculateBaseHp(w) * pm * MOB_KIND[code].mult)));
  const heightOf = hp => maxHp <= refHp
    ? 70
    : Math.round(34 + ((hp - refHp) / (maxHp - refHp)) * 136);

  host.innerHTML = waves.map(waveNo => {
    const wave = cycle[(waveNo - 1) % cycle.length];
    const base = calculateBaseHp(waveNo) * pm;
    const bars = wave.map(code => {
      const kind = MOB_KIND[code];
      const hp = base * kind.mult;
      const title = `${kind[lang]} · Wave ${waveNo} · ${formatHp(hp)} HP · ×${kind.mult.toFixed(2)}`;
      return `<span class="cycle-mob ${kind.cls}" style="--mob-h:${heightOf(hp)}px" title="${title}" aria-label="${title}"><b>${kind.label || code}</b></span>`;
    }).join("");
    const count = lang === "en" ? `${wave.length} enemies` : `${wave.length} ตัว`;
    return `<div class="cycle-wave"><div class="cycle-wave-head"><b>${lang === "en" ? "Wave" : "เวฟ"} ${waveNo}</b><span>${count}</span></div><div class="cycle-bars">${bars}</div></div>`;
  }).join("");

  const enemyCount = waves.reduce((sum,w) => sum + cycle[(w-1)%cycle.length].length, 0);
  const main = document.getElementById("cycleSummaryMain");
  const note = document.getElementById("cycleSummaryNote");
  const typeName = type === "air" ? "Air" : "Regular";
  if(main) main.textContent = lang === "en"
    ? `${typeName} · Waves ${fromWave}–${toWave} · ${enemyCount} enemies`
    : `${typeName} · เวฟ ${fromWave}–${toWave} · ${enemyCount} ตัว`;
  if(note) note.textContent = lang === "en"
    ? `The enemy order repeats every 15 waves. Heights are scaled against Wave ${fromWave}; hover for exact HP.`
    : `ลำดับมอนวนซ้ำทุก 15 เวฟ ความสูงเทียบกับเวฟ ${fromWave} — ชี้ที่หลอดเพื่อดู HP จริง`;
  const legend = document.getElementById("cycleLegend");
  if(legend) legend.innerHTML = type === "air"
    ? (lang === "en"
      ? `<span class="cycle-key air-normal">1 Air Normal ×1.00</span><span class="cycle-key air-medium">2 Air Medium ×1.30</span><span class="cycle-key air-strong">3 Air Strong ×1.75</span><span class="cycle-key bugged">B Bugged ×${BUGGED_MULT.toFixed(4)}</span>`
      : `<span class="cycle-key air-normal">1 Air ปกติ ×1.00</span><span class="cycle-key air-medium">2 Air กลาง ×1.30</span><span class="cycle-key air-strong">3 Air แข็งแกร่ง ×1.75</span><span class="cycle-key bugged">B Bugged ×${BUGGED_MULT.toFixed(4)}</span>`)
    : (lang === "en"
      ? `<span class="cycle-key normal">N Normal ×1.00</span><span class="cycle-key medium">2 Medium ×1.30</span><span class="cycle-key strong">3 Strong ×1.75</span><span class="cycle-key explosive">Explosive</span><span class="cycle-key cloner">Cloner</span><span class="cycle-key powerful">Powerful</span><span class="cycle-key armoured">Armoured</span><span class="cycle-key decelerate">Decelerate</span>`
      : `<span class="cycle-key normal">N ปกติ ×1.00</span><span class="cycle-key medium">2 กลาง ×1.30</span><span class="cycle-key strong">3 แข็งแกร่ง ×1.75</span><span class="cycle-key explosive">Explosive</span><span class="cycle-key cloner">Cloner</span><span class="cycle-key powerful">Powerful</span><span class="cycle-key armoured">Armoured</span><span class="cycle-key decelerate">Decelerate</span>`);
  if(empty) empty.style.display = "none";
  if(content) content.style.display = "block";
};

/* ประมาณการสคิปเวฟด้วยเพดานมอนบนแมป 450 ตัว
   เวฟที่ทำให้ยอดรวม "เกิน" 450 คือเวฟที่สคิปต่อไม่ได้ */
const WAVE_SKIP_CAP = 450;
function waveMobCount(wave, includeDecelerate, type){
  const cycle = mobCycleOf(type || "regular") || MOB_CYCLE;
  const pattern = cycle[(Math.max(1, wave) - 1) % cycle.length];
  return includeDecelerate === false ? pattern.filter(code => code !== "D").length : pattern.length;
}
/* fromWave คือเวฟแรกที่เริ่มนับของรอบนั้นโดยตรง เพื่อไม่ให้เวฟปลายรอบก่อนถูกนับซ้ำ */
function nextWaveSkipStop(fromWave, carry, cap, includeDecelerate, type){
  const firstWave = Math.max(1, fromWave);
  const initialCarry = Math.max(0, carry || 0);
  let wave = firstWave, onMap = initialCarry, guard = 0;
  while(guard++ < 10000){
    const count = waveMobCount(wave, includeDecelerate, type);
    if(onMap + count > cap) return {fromWave:firstWave, wave, carry:initialCarry, cap, onMap, waveCount:count, wouldBe:onMap+count};
    onMap += count;
    wave++;
  }
  return {fromWave:firstWave, wave, carry:initialCarry, cap, onMap, waveCount:waveMobCount(wave, includeDecelerate, type), wouldBe:onMap+waveMobCount(wave, includeDecelerate, type)};
}
window.waveSkipEstimate = function(clearWave, cap, includeDecelerate, type){
  const start = Math.max(1, parseInt(clearWave) || 1), limit = Math.max(1, parseInt(cap) || WAVE_SKIP_CAP);
  const tableType = mobCycleOf(type) ? type : "regular";
  const execute = nextWaveSkipStop(start + 1, 0, limit, includeDecelerate, tableType);            /* เคลียร์ start หมด -> เริ่มเวฟถัดไป */
  const homura  = nextWaveSkipStop(execute.wave + 1, 0, limit, includeDecelerate, tableType);     /* Execute เคลียร์หมด -> เริ่มหลัง execute */
  const end     = nextWaveSkipStop(homura.wave + 1, 1, limit, includeDecelerate, tableType);      /* Homura เหลือ 1 -> เริ่มรอบสุดท้าย */
  return {clearWave:start, cap:limit, execute, homura, end};
};
window.renderWaveSkipEstimate = function(host, clearWave, type, includeDecelerate){
  if(typeof host === "string") host = document.getElementById(host);
  if(!host) return;
  const lang = document.documentElement.lang === "en" ? "en" : "th";
  if(type && !mobCycleOf(type)){
    host.innerHTML = `<div class="empty-msg">${lang === "en" ? "Wave-skip estimates currently use the Regular table only." : "การคาดการณ์ Wave Skip ใช้ได้กับตาราง Regular เท่านั้น"}</div>`;
    return;
  }
  const x = window.waveSkipEstimate(clearWave, WAVE_SKIP_CAP, includeDecelerate, type || "regular");
  const decelerateNote = includeDecelerate === false
    ? (lang === "en" ? " · Decelerate excluded" : " · ไม่นับ Decelerate")
    : "";
  const count = s => lang === "en"
    ? `${s.onMap} on map + ${s.waveCount} in this wave = ${s.wouldBe} (> ${s.cap})`
    : `บนแมป ${s.onMap} + เวฟนี้ ${s.waveCount} = ${s.wouldBe} ตัว (> ${s.cap})`;
  const range = s => lang === "en"
    ? `Count Waves ${s.fromWave}–${s.wave}`
    : `นับมอน Wave ${s.fromWave}–${s.wave}`;
  const carry = s => !s.carry ? "" : (lang === "en"
    ? ` · starts with ${s.carry} remaining enemy`
    : ` · เริ่มพร้อมมอนค้าง ${s.carry} ตัว`);
  const items = lang === "en" ? [
    ["Turn Clear Off Wave",x.clearWave,`Clear accumulated enemies from waves ${Math.max(1,x.clearWave-10)}–${x.clearWave} (the previous 10 waves plus this wave)${decelerateNote}`],
    ["Use Execute's Ability Wave",x.execute.wave,`${range(x.execute)}${carry(x.execute)} · ${count(x.execute)} · clear everything`],
    ["Use Homura Wave",x.homura.wave,`${range(x.homura)}${carry(x.homura)} · ${count(x.homura)} · clear until one enemy remains`],
    ["End Wave",x.end.wave,`${range(x.end)}${carry(x.end)} · ${count(x.end)} · third approximate skip round ends here`],
  ] : [
    ["ปิดเคลียร์ Wave",x.clearWave,`เคลียร์มอนสะสมเวฟ ${Math.max(1,x.clearWave-10)}–${x.clearWave} (10 เวฟก่อนหน้า + เวฟนี้)${decelerateNote}`],
    ["Use Execute's Ability Wave",x.execute.wave,`${range(x.execute)}${carry(x.execute)} · ${count(x.execute)} · เคลียร์ทิ้งทั้งหมด`],
    ["Use Homura Wave",x.homura.wave,`${range(x.homura)}${carry(x.homura)} · ${count(x.homura)} · เคลียร์จนเหลือ 1 ตัว`],
    ["End Wave",x.end.wave,`${range(x.end)}${carry(x.end)} · ${count(x.end)} · จุดจบรอบสคิปที่ 3 โดยประมาณ`],
  ];
  host.innerHTML = `<div class="skip-route">${items.map((it,i)=>`
    <div class="skip-stop"><span>${i+1}</span><div><small>${it[0]}</small><b>Wave ${it[1]}</b><p>${it[2]}</p></div></div>${i<items.length-1?'<i>›</i>':''}`).join("")}</div>
    <div class="skip-note">${lang === "en" ? `Estimate: all three rounds use a ${x.cap}-enemy cap. Each new round starts at the wave after the previous round ended. Enemy order repeats every 15 waves.` : `ค่าประมาณ: ทั้งสามรอบใช้เพดานมอน ${x.cap} ตัว แต่ละรอบเริ่มนับจากเวฟถัดจากเวฟที่เพิ่งจบเสมอ และลำดับมอนวนทุก 15 เวฟ`}${decelerateNote}</div>`;
};
