/* ============================================================
   ASTD Comp — หน้าแรก
   ตัวเลขบนหน้าแรกดึงจาก units.js จริง ไม่ได้พิมพ์ทิ้งไว้
   (แบนเนอร์ด้านบนเป็นรูปนิ่ง ตั้งไว้ที่ .hero-banner ใน style.css)
   ============================================================ */
(function(){
  const $ = id => document.getElementById(id);

  /* ---------- ตัวเลขจริงจากฐานข้อมูล ---------- */
  const n6 = UNITS.filter(u => u[9] === 6).length;
  const n7 = UNITS.filter(u => u[9] === 7).length;
  const withStats = UNITS.filter(u => u[1] != null).length;
  const put = (id, v) => { const el = $(id); if(el) el.textContent = v; };
  put("nAll", UNITS.length);
  put("n6", n6);
  put("n7", n7);
  put("nStats", withStats);

})();
