/* ============================================================
   ASTD DPS Calculator — Logic (ต้องโหลด units.js ก่อนไฟล์นี้)
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

function renderList(){
  const q = $("search").value.trim().toLowerCase();
  const list = $("unitList");
  list.innerHTML = "";
  let shown = 0;
  UNITS.forEach((u,i)=>{
    if(typeFilter === "new"){ if(!u[8]) return; }
    else if(typeFilter === "7star"){ if(u[9] !== 7) return; }
    else if(typeFilter !== "all" && u[5] !== typeFilter) return;
    if(q && !u[0].toLowerCase().includes(q)) return;
    shown++;
    const hasStats = u[1] !== null;
    const b = document.createElement("button");
    b.className = "u-item" + (i===selIdx ? " sel":"");
    b.innerHTML = `
      <div class="u-name"><span>${u[0]}</span>
        ${u[8]?`<span class="tag new">NEW</span>`:""}
        ${u[9]?`<span class="tag star7">${u[9]}★</span>`:""}
        ${u[7]?`<span class="tag ${u[7].toLowerCase()}">${u[7]}</span>`:""}
      </div>
      <div class="u-meta">${hasStats
        ? `<span>${u[5]}</span><span>${u[6]}</span><span>DPS ${fmt(u[1]/u[2])}</span>`
        : `<span>ยังไม่มีสถิติ — เลือกแล้วกรอกเองได้</span>`}</div>`;
    b.onclick = ()=>selectUnit(i);
    list.appendChild(b);
  });
  $("unitCount").textContent = `แสดง ${shown} จาก ${UNITS.length} ยูนิต`;
}

function setUnitImage(name){
  const slug = unitSlug(name);
  const img = $("unitImg");
  const fb  = $("unitImgFallback");
  fb.style.display = "grid";
  fb.textContent = name.replace(/[^A-Za-z0-9ก-๙ ]/g,"").trim().slice(0,2).toUpperCase() || "?";
  img.style.display = "none";
  img.src = `assets/img/units/${slug}.png`;
  img.onload  = ()=>{ img.style.display="block"; fb.style.display="none"; };
  img.onerror = ()=>{ img.style.display="none"; fb.style.display="grid"; };
  $("unitImgName").textContent = `รูป: assets/img/units/${slug}.png (200×200)`;
}

function selectUnit(i){
  selIdx = i;
  const u = UNITS[i];
  $("selName").textContent = u[0];
  $("selBadges").innerHTML =
    (u[5]?`<span class="tag">${u[5]}</span>`:"") +
    (u[6]?`<span class="tag">AoE: ${u[6]}</span>`:"") +
    (u[7]?`<span class="tag ${u[7].toLowerCase()}">${u[7]} Enchant</span>`:"") +
    (u[8]?`<span class="tag new">NEW — กรอกสถิติเอง</span>`:"") +
    (u[9]?`<span class="tag star7">${u[9]}★ — กรอกสถิติเอง</span>`:"");
  $("inDmg").value = u[1] ?? "";
  $("inSpa").value = u[2] ?? "";
  $("inRng").value = u[3] ?? "";
  $("inCost").value = u[4] ?? "";
  setUnitImage(u[0]);
  renderList();
  calc();
}

function bindPair(rangeId, numId){
  $(rangeId).addEventListener("input", ()=>{ $(numId).value = $(rangeId).value; calc(); });
  $(numId).addEventListener("input", ()=>{ $(rangeId).value = $(numId).value; calc(); });
}

function getBuild(){
  const baseDmg = parseFloat($("inDmg").value)||0;
  const baseSpa = Math.max(parseFloat($("inSpa").value)||1, 0.05);
  const baseRng = parseFloat($("inRng").value)||0;
  const cost    = parseFloat($("inCost").value)||0;

  const dmgB = (parseFloat($("vDmg").value)||0)/100;
  const elem = $("tgElem").checked ? 1.5 : 1;

  const fDmg = baseDmg * (1+dmgB) * elem;
  return {baseDmg, baseSpa, baseRng, cost, fDmg, fSpa:baseSpa, fRng:baseRng,
          dps: fDmg/baseSpa, baseDps: baseDmg/baseSpa};
}

function calc(){
  const b = getBuild();
  $("outDps").textContent = fmt(b.dps);
  const gain = b.baseDps>0 ? (b.dps/b.baseDps - 1)*100 : 0;
  $("outDpsDelta").textContent = Math.abs(gain)>0.05
    ? `▲ ${gain.toFixed(1)}% จากค่าพื้นฐาน (${fmt(b.baseDps)})` : "";

  setOut("outDmg","outDmgBase", b.fDmg, b.baseDmg, false);
  setOut("outSpa","outSpaBase", b.fSpa, b.baseSpa, true);
  setOut("outRng","outRngBase", b.fRng, b.baseRng, false);
  $("outApm").textContent = b.fSpa>0 ? fmt(60/b.fSpa,1) : "—";
  $("outEff").textContent = b.cost>0 ? fmt(b.dps/(b.cost/1000)) : "—";
}
function setOut(vId, bId, val, base, lowerBetter){
  const el = $(vId);
  el.childNodes[0].textContent = fmt(val);
  const diff = val - base;
  el.className = "v" + (Math.abs(diff)<1e-9 ? "" : ((lowerBetter ? diff<0 : diff>0) ? " up":" down"));
  $(bId).textContent = Math.abs(diff)>1e-9 ? `พื้นฐาน ${fmt(base)}` : "";
}

function setDmgBuff(v){
  $("vDmg").value = v; $("rgDmg").value = v;
  document.querySelectorAll(".preset-chip").forEach(c=>c.classList.toggle("on", +c.dataset.v === v));
  calc();
}

function addToCompare(){
  const b = getBuild();
  if(b.baseDmg<=0){ alert("เลือกยูนิตหรือใส่ค่า Damage ก่อนครับ"); return; }
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
      <td><button class="rm" title="ลบ" onclick="rmCmp(${idx})">✕</button></td>
    </tr>`;
  }).join("");
}
window.rmCmp = i => { compare.splice(i,1); renderCompare(); };

document.addEventListener("DOMContentLoaded", ()=>{
  bindPair("rgDmg","vDmg");
  ["inDmg","inSpa","inRng","inCost"].forEach(id => $(id).addEventListener("input", calc));
  $("tgElem").addEventListener("change", calc);
  document.querySelectorAll(".preset-chip").forEach(c=> c.addEventListener("click", ()=>setDmgBuff(+c.dataset.v)));
  $("btnReset").onclick = ()=>{
    $("rgDmg").value = 0; $("vDmg").value = 0;
    $("tgElem").checked = false;
    document.querySelectorAll(".preset-chip").forEach(c=>c.classList.remove("on"));
    calc();
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
  renderList();
  const p = new URLSearchParams(location.search);
  const uIdx = parseInt(p.get("unit"));
  selectUnit(Number.isInteger(uIdx) && UNITS[uIdx] ? uIdx : 7);
});
