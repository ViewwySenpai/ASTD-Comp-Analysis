/* ============================================================
   ASTD Comp — ตัวนับผู้เข้าชม (ฝั่งหน้าเว็บ)

   หน้าเว็บมองไม่เห็น IP ของคนเข้าเอง ต้องมีตัวรับฝั่งเซิร์ฟเวอร์
   โค้ดฝั่งเซิร์ฟเวอร์อยู่ที่  server/visitor-counter.js  (Cloudflare Worker)
   วิธีติดตั้งอยู่ใน            server/README.txt

   ติดตั้งเสร็จแล้วเอา URL ของ Worker มาวางที่ VISITOR_API ข้างล่าง
   ถ้าเว้นว่างไว้ ช่องผู้เข้าชมจะซ่อนตัวเอง เว็บทำงานปกติทุกอย่าง
   ============================================================ */
const VISITOR_API = "";

(function(){
  const slots = document.querySelectorAll("[data-visitors]");
  if(!slots.length) return;

  const hide = ()=> slots.forEach(el =>{
    const box = el.closest("[data-visitors-box]") || el;
    box.style.display = "none";
  });

  if(!VISITOR_API){ hide(); return; }
  if(location.protocol === "file:"){ hide(); return; }   /* เปิดจากไฟล์ในเครื่อง ไม่นับ */

  const fmtNum = n => Number(n).toLocaleString("en-US");

  fetch(VISITOR_API, {method:"POST", mode:"cors", cache:"no-store"})
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(d =>{
      slots.forEach(el =>{
        const kind = el.dataset.visitors;              /* "total" หรือ "today" */
        const v = (kind === "today") ? d.today : d.total;
        if(v == null){ el.textContent = "—"; return; }
        el.textContent = fmtNum(v);
      });
    })
    .catch(hide);      /* ต่อไม่ติดก็ซ่อนไป ดีกว่าโชว์เลขมั่ว */
})();
