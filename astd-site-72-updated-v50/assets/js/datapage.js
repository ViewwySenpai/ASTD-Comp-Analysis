/* ============================================================
   ASTD Comp — ตรรกะหน้า data.html / data-en.html
   ต้องโหลดหลัง units.js และ dbimport.js
   ============================================================ */
(function(){

const L = (window.SITE_LANG === "en") ? "en" : "th";
const T = {
th: {
  srcShipped: n => `กำลังใช้ข้อมูลที่มากับชุดนี้ — ${n} ยูนิต`,
  srcCustom:  n => `กำลังใช้ข้อมูลที่คุณนำเข้าไว้ — ${n} ยูนิต`,
  readEmpty:  "ยังไม่ได้วางข้อความ",
  readNoHead: "หาหัวตารางไม่เจอ — ต้องมีคำว่า Damage และ SPA หรือ Range ติดมาด้วย ลองลากคลุมตารางใหม่ตั้งแต่แถวหัวข้อ",
  readNoRows: "เจอหัวตารางแล้ว แต่อ่านแถวข้อมูลไม่ได้เลย ลองก๊อปใหม่ทั้งตาราง",
  readOk:     (n,s) => `อ่านได้ ${n} ยูนิต` + (s ? ` (ข้ามไป ${s} บรรทัดที่ไม่ใช่ข้อมูล)` : ""),
  colsFound:  "คอลัมน์ที่จับได้: ",
  colsMissing:"คอลัมน์ที่หาไม่เจอ (จะใช้ค่าเดิมแทน): ",
  sumAdded:   "ยูนิตใหม่",
  sumUpdated: "ค่าเปลี่ยน",
  sumSame:    "เหมือนเดิม",
  sumRemoved: "จะหายไป",
  applied:    n => `บันทึกแล้ว — ตอนนี้ทุกหน้าใช้ข้อมูล ${n} ยูนิตชุดนี้`,
  applyFail:  "บันทึกไม่สำเร็จ (พื้นที่เบราว์เซอร์เต็ม) ลองกดดาวน์โหลด units.js แทน",
  reverted:   "คืนค่าข้อมูลที่มากับชุดแล้ว",
  confirmRev: "คืนกลับไปใช้ข้อมูลเดิมที่มากับชุด? ข้อมูลที่นำเข้าไว้จะถูกลบ",
  nothing:    "ยังไม่มีข้อมูลที่อ่านไว้ — กดปุ่มอ่านข้อมูลก่อน",
  copied:     "คัดลอกแล้ว",
  th_name: "ยูนิต", th_dmg: "Damage", th_spa: "SPA", th_rng: "Range",
  th_dps: "DPS", th_cost: "ราคารวม", th_type: "ประเภท", th_atk: "การโจมตี", th_ench: "ธาตุ",
  preview: n => `ตัวอย่าง ${n} แถวแรก`,
},
en: {
  srcShipped: n => `Using the data shipped with this build — ${n} units`,
  srcCustom:  n => `Using your imported data — ${n} units`,
  readEmpty:  "Nothing pasted yet",
  readNoHead: "No header row found — the paste needs Damage plus SPA or Range. Re-select the table starting at the header row.",
  readNoRows: "Found the header but no data rows. Try copying the whole table again.",
  readOk:     (n,s) => `Read ${n} units` + (s ? ` (skipped ${s} non-data lines)` : ""),
  colsFound:  "Columns detected: ",
  colsMissing:"Columns not found (existing values kept): ",
  sumAdded:   "new",
  sumUpdated: "changed",
  sumSame:    "unchanged",
  sumRemoved: "dropped",
  applied:    n => `Saved — every page now uses this ${n}-unit set`,
  applyFail:  "Could not save (browser storage full). Use Download units.js instead.",
  reverted:   "Reverted to the shipped data",
  confirmRev: "Revert to the data shipped with this build? Your imported data will be deleted.",
  nothing:    "Nothing parsed yet — press Read first",
  copied:     "Copied",
  th_name: "Unit", th_dmg: "Damage", th_spa: "SPA", th_rng: "Range",
  th_dps: "DPS", th_cost: "Total cost", th_type: "Type", th_atk: "Attack", th_ench: "Enchant",
  preview: n => `Preview — first ${n} rows`,
}
}[L];

const $ = id => document.getElementById(id);
let pending = null;   /* { rows, report } */

/* ---------- สถานะปัจจุบัน ---------- */
function refreshStatus(){
  const custom = dbLoadOverride();
  $("dbStatus").textContent = custom ? T.srcCustom(custom.length) : T.srcShipped(UNITS_SHIPPED.length);
  $("btnRevert").style.display = custom ? "" : "none";
}

/* ---------- อ่านข้อความที่วาง ---------- */
function doRead(){
  const text = $("pasteBox").value;
  const msg  = $("readMsg");
  pending = null;
  $("previewWrap").innerHTML = "";
  $("sumWrap").innerHTML = "";
  setActionsEnabled(false);

  if(!text.trim()){ msg.textContent = T.readEmpty; return; }

  const res = parseStatsTable(text);
  if(res.error === "noheader"){ msg.textContent = T.readNoHead; return; }
  if(res.error){ msg.textContent = T.readNoRows; return; }

  const mode  = document.querySelector('input[name="mode"]:checked').value;
  const keep  = $("keepExtra").checked;
  const base  = dbLoadOverride() || UNITS_SHIPPED;
  const merged = dbMergeRows(base, res.rows, mode, keep);
  pending = merged;

  const found   = Object.keys(res.cols).filter(k => k !== "name");
  const missing = ["damage","spa","range","cost","type","attack","enchant"].filter(k => res.cols[k] == null);

  msg.innerHTML = T.readOk(res.rows.length, res.skipped) +
    "<br>" + T.colsFound + "<b>" + (found.join(", ") || "—") + "</b>" +
    (missing.length ? "<br>" + T.colsMissing + "<b>" + missing.join(", ") + "</b>" : "");

  renderSummary(merged.report, merged.rows.length);
  renderPreview(merged.rows);
  setActionsEnabled(true);
}

function setActionsEnabled(on){
  ["btnApply","btnDownload","btnCopy"].forEach(id => { $(id).disabled = !on; });
}

function renderSummary(r, total){
  const pill = (label, n, cls) =>
    `<span class="preset-chip ${cls||""}" style="cursor:default">${label} <b>${n}</b></span>`;
  $("sumWrap").innerHTML =
    `<div class="preset-row">` +
      pill(T.sumAdded,   r.added.length,   "on") +
      pill(T.sumUpdated, r.updated.length, "on") +
      pill(T.sumSame,    r.same.length) +
      (r.removed.length ? pill(T.sumRemoved, r.removed.length) : "") +
      pill("= total", total, "on") +
    `</div>`;
}

function renderPreview(rows){
  const n = Math.min(rows.length, 60);
  const fmt = v => (v == null ? "—" : Number(v).toLocaleString("en-US"));
  const body = rows.slice(0, n).map(u => {
    const dps = (u[1] != null && u[2]) ? (u[1] / u[2]) : null;
    return `<tr><td>${esc(u[0])}</td><td>${fmt(u[1])}</td><td>${fmt(u[2])}</td>` +
           `<td>${fmt(u[3])}</td><td>${dps == null ? "—" : fmt(Math.round(dps))}</td>` +
           `<td>${fmt(u[4])}</td><td>${esc(u[5]||"—")}</td><td>${esc(u[6]||"—")}</td>` +
           `<td>${esc(u[7]||"—")}</td></tr>`;
  }).join("");
  $("previewWrap").innerHTML =
    `<p class="hint" style="margin:0 0 10px">${T.preview(n)}</p>` +
    `<div class="table-scroll"><table><thead><tr>` +
    `<th>${T.th_name}</th><th>${T.th_dmg}</th><th>${T.th_spa}</th><th>${T.th_rng}</th>` +
    `<th>${T.th_dps}</th><th>${T.th_cost}</th><th>${T.th_type}</th><th>${T.th_atk}</th>` +
    `<th>${T.th_ench}</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

function esc(s){
  return String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
}

/* ---------- ปุ่มต่างๆ ---------- */
function doApply(){
  if(!pending){ $("readMsg").textContent = T.nothing; return; }
  const ok = dbSaveOverride(pending.rows);
  $("applyMsg").textContent = ok ? T.applied(pending.rows.length) : T.applyFail;
  refreshStatus();
}

function doDownload(){
  if(!pending) return;
  const blob = new Blob([dbRowsToUnitsFile(pending.rows)], { type: "text/javascript;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "units.js";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

function doCopy(){
  if(!pending) return;
  const code = dbRowsToCode(pending.rows);
  const done = () => { $("applyMsg").textContent = T.copied; };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(code).then(done, fallback);
  } else fallback();
  function fallback(){
    const ta = document.createElement("textarea");
    ta.value = code; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch(e){}
    ta.remove();
  }
}

function doRevert(){
  if(!confirm(T.confirmRev)) return;
  dbClearOverride();
  $("applyMsg").textContent = T.reverted;
  refreshStatus();
}

/* ---------- init ---------- */
$("btnRead").addEventListener("click", doRead);
$("btnApply").addEventListener("click", doApply);
$("btnDownload").addEventListener("click", doDownload);
$("btnCopy").addEventListener("click", doCopy);
$("btnRevert").addEventListener("click", doRevert);
document.querySelectorAll('input[name="mode"], #keepExtra')
  .forEach(el => el.addEventListener("change", () => { if(pending) doRead(); }));

setActionsEnabled(false);
refreshStatus();

})();
