/* Regular Infinite: 15 waves per cycle, 300 enemies.
   Wave 3 is normalized to its stated six enemies so the cycle total remains 300. */
const MOB_CYCLE = [
  ["N","N","N","D","D"],
  ["N","N","N","N","D","D","A","A","A"],
  ["N","N","2","2","D","D"],
  ["N","N","N","N","P","P","2","2","2","2","A","D","A","D","D"],
  ["N","N","N","N","2","2","2","2","E","E","E","D","D"],
  ["N","N","N","N","N","P","P","P","2","2","2","2","2","A","A","A","D","D","C"],
  ["N","N","N","N","N","2","2","2","2","2","3","D","D"],
  ["N","N","N","N","N","2","2","2","2","2","3","3","P","P","P","P","A","A","A","D","D","C"],
  ["N","N","N","N","N","N","2","2","2","2","2","E","E","E","3","3","A","A","A","D","D"],
  ["N","N","N","N","N","N","2","2","2","2","2","2","2","P","P","P","P","3","3","D","D","C"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","2","2","2","2","3","3","3","A","A","A","E","E","E","3","3","3","D","D"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","D","2","2","2","P","P","P","P","P","3","3","3","3","D","A","A","E","E","E","D","D","C"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","2","2","2","2","3","3","3","3","A","A","A","3","3","3","D","D"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","2","2","2","2","P","P","P","P","3","3","3","3","3","A","A","A","3","3","3","D","D","C"],
  ["N","N","N","N","N","N","N","N","2","2","2","2","2","2","2","2","A","A","A","E","E","E","3","3","3","3","3","D","D"]
];

const MOB_KIND = {
  N:{mult:1,    cls:"normal",     th:"ปกติ",      en:"Normal"},
  "2":{mult:1.3, cls:"medium",     th:"กลาง",      en:"Medium"},
  "3":{mult:1.75,cls:"strong",     th:"แข็งแกร่ง", en:"Strong"},
  D:{mult:1,    cls:"decelerate", th:"ลดความเร็ว", en:"Decelerate"},
  A:{mult:1,    cls:"armoured",   th:"เกราะ",      en:"Armoured"},
  P:{mult:1,    cls:"powerful",   th:"ทรงพลัง",    en:"Powerful"},
  C:{mult:1,    cls:"cloner",     th:"โคลน",       en:"Cloner"},
  E:{mult:1.75, cls:"explosive",  th:"ระเบิด",     en:"Explosive"}
};

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

  if(type !== "regular"){
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
  const maxHp = Math.max(...waves.map(w => calculateBaseHp(w) * pm * ENEMY_MULTS.strong));
  const heightOf = hp => maxHp <= refHp
    ? 70
    : Math.round(34 + ((hp - refHp) / (maxHp - refHp)) * 136);

  host.innerHTML = waves.map(waveNo => {
    const wave = MOB_CYCLE[(waveNo - 1) % MOB_CYCLE.length];
    const base = calculateBaseHp(waveNo) * pm;
    const bars = wave.map(code => {
      const kind = MOB_KIND[code];
      const hp = base * kind.mult;
      const title = `${kind[lang]} · Wave ${waveNo} · ${formatHp(hp)} HP · ×${kind.mult.toFixed(2)}`;
      return `<span class="cycle-mob ${kind.cls}" style="--mob-h:${heightOf(hp)}px" title="${title}" aria-label="${title}"><b>${code}</b></span>`;
    }).join("");
    const count = lang === "en" ? `${wave.length} enemies` : `${wave.length} ตัว`;
    return `<div class="cycle-wave"><div class="cycle-wave-head"><b>${lang === "en" ? "Wave" : "เวฟ"} ${waveNo}</b><span>${count}</span></div><div class="cycle-bars">${bars}</div></div>`;
  }).join("");

  const enemyCount = waves.reduce((sum,w) => sum + MOB_CYCLE[(w-1)%MOB_CYCLE.length].length, 0);
  const main = document.getElementById("cycleSummaryMain");
  const note = document.getElementById("cycleSummaryNote");
  if(main) main.textContent = lang === "en"
    ? `Regular · Waves ${fromWave}–${toWave} · ${enemyCount} enemies`
    : `Regular · เวฟ ${fromWave}–${toWave} · ${enemyCount} ตัว`;
  if(note) note.textContent = lang === "en"
    ? `The enemy order repeats every 15 waves. Heights are scaled against Wave ${fromWave}; hover for exact HP.`
    : `ลำดับมอนวนซ้ำทุก 15 เวฟ ความสูงเทียบกับเวฟ ${fromWave} — ชี้ที่หลอดเพื่อดู HP จริง`;
  if(empty) empty.style.display = "none";
  if(content) content.style.display = "block";
};
