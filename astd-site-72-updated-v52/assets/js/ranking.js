/* ASTD Comp — DPS Ranking */
const RANK_LANG = window.SITE_LANG === "en" ? "en" : "th";
const RT = RANK_LANG === "en" ? {
  deploy:"Deployment", upg:n=>`Upgrade ${n}`, max:"Max upgrade",
  rows:(shown,units,upgrades)=>`${shown} results · ${units} units · ${upgrades} upgrades with data`,
  no:"No matching DPS data", special:"Includes automatic status / ability DPS",
  plain:"Normal attack DPS", open:"Open in Calculator",
} : {
  deploy:"วางครั้งแรก", upg:n=>`อัปขั้นที่ ${n}`, max:"ขั้นสูงสุด",
  rows:(shown,units,upgrades)=>`${shown} รายการ · ${units} ยูนิต · ${upgrades} Upgrade ที่มีข้อมูล`,
  no:"ไม่พบข้อมูล DPS ที่ตรงกับตัวกรอง", special:"รวม DPS จากสถานะ / Ability อัตโนมัติ",
  plain:"DPS การโจมตีปกติ", open:"เปิดใน Calculator",
};

const rankFmt = n => {
  if(!(n >= 0) || !isFinite(n)) return "—";
  const units = [[1e15,"Qa"],[1e12,"T"],[1e9,"B"],[1e6,"M"],[1e3,"K"]];
  for(const [v,s] of units) if(n >= v) return `${(n/v).toFixed(n/v >= 100 ? 1 : n/v >= 10 ? 2 : 3)}${s}`;
  return n >= 100 ? Math.round(n).toLocaleString("en-US") : (+n.toFixed(2)).toLocaleString("en-US");
};
const rankFull = n => Number.isFinite(n) ? (+n.toFixed(4)).toLocaleString("en-US", {maximumFractionDigits:4}) : "—";

function stageLabel(row){
  if(row.name) return row.name;
  if(row.fallback) return RT.max;
  return row.lv === 0 ? RT.deploy : RT.upg(row.lv);
}

function rowDpsParts(name, row){
  const damage = rowDmgTotal(row);
  const normal = row.spa > 0 ? damage / row.spa : 0;
  let extra = 0;
  const extras = [];
  if(row.jdg){ const v = judgementDps(damage, row.spa); extra += v; extras.push("Judgement"); }
  if(row.pois){ const v = poisonDps(damage, row.spa); extra += v; extras.push("Poison"); }
  if(row.bleed){ const v = bleedDps(damage, name, row); extra += v; extras.push("Bleed"); }
  if(row.abilityDps){ const v = abilityDpsOf(name, damage, row); extra += v; extras.push(row.abilityDps.label || "Ability"); }
  return {damage, normal, extra, total:normal + extra, extras};
}

function rankSelfBuffs(name, row){
  const list = (typeof ABILITIES !== "undefined") ? ABILITIES[unitSlug(name)] : null;
  if(!list) return [];
  return list.filter(buff => buff.mult && (buff.lv == null || row.fallback || (+row.lv || 0) >= buff.lv));
}

const RANK_ROWS = [];
UNITS.forEach((unit, unitIndex) => {
  const [name, damage, spa,,, type,,, , star] = unit;
  const rows = UPGRADES[unitSlug(name)];
  if(rows && rows.length){
    rows.forEach((row, stageIndex) => {
      if(!(row.dmg >= 0) || !(row.spa > 0) || row.farm != null) return;
      RANK_ROWS.push({name, unitIndex, stageIndex, row, type, star, amount:placeMax(name), selfBuffs:rankSelfBuffs(name,row), ...rowDpsParts(name,row)});
    });
  } else if(damage != null && spa > 0){
    const row = {dmg:damage, spa, fallback:true};
    RANK_ROWS.push({name, unitIndex, stageIndex:null, row, type, star, amount:placeMax(name), selfBuffs:rankSelfBuffs(name,row), ...rowDpsParts(name,row)});
  }
});

let rankMode = "best";
let rankStar = "all";
let rankDamageBuff = 0;
let rankLeaderBuff = 0;
let rankSelfBuffOn = false;

function rankBuffMult(){
  const damage = rankDamageBuff ? 1 + rankDamageBuff / 100 : 1;
  const leader = rankLeaderBuff ? 1 + rankLeaderBuff / 100 : 1;
  return damage * leader;
}

function rankSelfMult(row){
  if(!rankSelfBuffOn || !row.selfBuffs.length) return 1;
  return row.selfBuffs.reduce((mult, buff) => mult * buff.mult, 1);
}
function rankScore(row){ return row.total * row.amount * rankSelfMult(row); }

function candidateRows(){
  if(rankMode === "all") return RANK_ROWS.slice();
  const best = new Map();
  RANK_ROWS.forEach(row => {
    const old = best.get(row.name);
    if(!old || rankScore(row) > rankScore(old)) best.set(row.name, row);
  });
  return [...best.values()];
}

function renderRanking(){
  const query = document.getElementById("rankSearch").value.trim().toLowerCase();
  const multiplier = rankBuffMult();
  const rows = candidateRows().filter(row => {
    if(rankStar !== "all" && String(row.star) !== rankStar) return false;
    return !query || row.name.toLowerCase().includes(query) || stageLabel(row.row).toLowerCase().includes(query);
  }).sort((a,b) => rankScore(b) - rankScore(a) || b.damage - a.damage || a.name.localeCompare(b.name));

  const host = document.getElementById("rankList");
  if(!rows.length){ host.innerHTML = `<div class="empty-msg">${RT.no}</div>`; }
  else host.innerHTML = rows.map((item,index) => {
    const stageQuery = item.stageIndex == null ? "" : `&stage=${item.stageIndex}`;
    const href = `${RANK_LANG === "en" ? "calculator-en.html" : "calculator.html"}?unit=${item.unitIndex}${stageQuery}`;
    const special = item.extras.length
      ? `<span class="rank-special" title="${RT.special}">+ ${item.extras.join(" + ")}</span>`
      : `<span class="rank-normal">${RT.plain}</span>`;
    const selfMultiplier = rankSelfMult(item);
    const shownDamage = item.damage * multiplier * selfMultiplier;
    const shownExtra = item.extra * multiplier * selfMultiplier;
    const shownTotal = item.total * multiplier * selfMultiplier * item.amount;
    const selfBuffNote = item.selfBuffs.length
      ? `<span class="rank-self${rankSelfBuffOn ? " on" : ""}">${item.selfBuffs.map(buff => `${buff.name} ×${buff.mult}`).join(" · ")}</span>`
      : "";
    return `<a class="rank-row${index < 3 ? ` top-${index+1}` : ""}" href="${href}" title="${RT.open}">
      <span class="rank-no">${index+1}</span>
      <span class="rank-unit">
        <span class="rank-face"><span>${unitInitials(item.name)}</span><img src="${unitImgSrc(item.name)}" alt="" onload="this.style.display='block';this.previousElementSibling.style.display='none'" onerror="this.style.display='none'"></span>
        <span><b>${item.name}</b><small>${item.star || "—"}★ · ${item.type || "—"} · Max ${item.amount}</small></span>
      </span>
      <span class="rank-stage"><small>Upgrade</small><b>${stageLabel(item.row)}</b>${special}${selfBuffNote}</span>
      <span class="rank-amount"><small>Amount</small><b>${item.amount}</b><em>Max Amount</em></span>
      <span class="rank-stat"><small>Damage</small><b>${rankFmt(shownDamage)}</b><em>${rankFull(shownDamage)}</em></span>
      <span class="rank-stat"><small>SPA</small><b>${item.row.spa}</b><em>${RANK_LANG === "en" ? "seconds" : "วินาที"}</em></span>
      <span class="rank-stat rank-extra"><small>${RANK_LANG === "en" ? "Extra DPS" : "DPS เพิ่มเติม"}</small><b>${item.extra ? rankFmt(shownExtra) : "—"}</b><em>${item.extra ? rankFull(shownExtra) : ""}</em></span>
      <span class="rank-total"><small>Total DPS</small><b>${rankFmt(shownTotal)}</b><em>${rankFull(shownTotal)}</em></span>
    </a>`;
  }).join("");

  const unitCount = new Set(RANK_ROWS.map(x=>x.name)).size;
  document.getElementById("rankCount").textContent = RT.rows(rows.length, unitCount, RANK_ROWS.length);
  const top = rows[0];
  document.getElementById("rankTopName").textContent = top ? top.name : "—";
  document.getElementById("rankTopDps").textContent = top ? rankFmt(top.total * multiplier * rankSelfMult(top) * top.amount) : "—";
  document.getElementById("rankTopStage").textContent = top ? `${stageLabel(top.row)} · Max Amount ${top.amount}` : "";
  const art = document.getElementById("rankTopArt");
  art.innerHTML = top
    ? `<span>${unitInitials(top.name)}</span><img src="${unitImgSrc(top.name)}" alt="" onload="this.style.display='block';this.previousElementSibling.style.display='none'" onerror="this.style.display='none'">`
    : "—";
}

function bindExclusiveBuffs(id, setter){
  document.querySelectorAll(`#${id} .chip`).forEach(button => button.onclick = () => {
    const wasOn = button.classList.contains("on");
    document.querySelectorAll(`#${id} .chip`).forEach(x => {
      x.classList.remove("on");
      x.setAttribute("aria-pressed", "false");
    });
    if(!wasOn){
      button.classList.add("on");
      button.setAttribute("aria-pressed", "true");
      setter(+button.dataset.buff);
    }else setter(0);
    renderRanking();
  });
}

document.querySelectorAll("#rankMode .chip").forEach(button => button.onclick = () => {
  document.querySelectorAll("#rankMode .chip").forEach(x=>x.classList.remove("on"));
  button.classList.add("on"); rankMode = button.dataset.mode; renderRanking();
});
document.querySelectorAll("#rankStars .chip").forEach(button => button.onclick = () => {
  document.querySelectorAll("#rankStars .chip").forEach(x=>x.classList.remove("on"));
  button.classList.add("on"); rankStar = button.dataset.star; renderRanking();
});
bindExclusiveBuffs("rankDamageBuff", value => { rankDamageBuff = value; });
bindExclusiveBuffs("rankLeaderBuff", value => { rankLeaderBuff = value; });
document.querySelector("#rankSelfBuff .chip").onclick = function(){
  rankSelfBuffOn = !rankSelfBuffOn;
  this.classList.toggle("on", rankSelfBuffOn);
  this.setAttribute("aria-pressed", String(rankSelfBuffOn));
  renderRanking();
};
document.getElementById("rankSearch").addEventListener("input", renderRanking);
renderRanking();
