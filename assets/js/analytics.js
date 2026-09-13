/* ============================================================
   ASTD Comp — ตัวนับคนเข้าเว็บ (Cloudflare Web Analytics)

   วิธีเปิดใช้:
     1. เอาเว็บขึ้นโฮสต์ก่อน (Cloudflare Pages / Vercel / GitHub Pages)
     2. เข้า dash.cloudflare.com -> Web Analytics -> Add a site
        ใส่ชื่อโดเมนของเว็บ แล้วจะได้ token มา
     3. เอา token มาวางในบรรทัด CF_TOKEN ข้างล่าง แค่นั้นจบ

   ไม่ใช้คุกกี้ ไม่เก็บข้อมูลส่วนตัวใคร เลยไม่ต้องมีแบนเนอร์ขอความยินยอม
   ถ้ายังไม่ใส่ token ไฟล์นี้จะไม่ทำอะไรเลย เว็บทำงานปกติ
   ============================================================ */
const CF_TOKEN = "";

(function(){
  if(!CF_TOKEN) return;                       /* ยังไม่ได้ใส่ token */
  if(location.protocol === "file:") return;   /* เปิดจากไฟล์ในเครื่อง ไม่นับ */

  const h = location.hostname;
  if(h === "localhost" || h === "127.0.0.1" || h === "" || h.endsWith(".local")) return;

  const s = document.createElement("script");
  s.defer = true;
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_TOKEN }));
  document.body.appendChild(s);
})();
