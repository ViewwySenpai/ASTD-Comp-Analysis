/* ============================================================
   ASTD Comp — พื้นหลัง + อนิเมชัน fade in / fade out
   โหลดไฟล์นี้ในทุกหน้า (ต่อท้าย <body>)

   อยากเพิ่มรูปพื้นหลัง: วางไฟล์ใน assets/img/ แล้วเติมชื่อลงในลิสต์ข้างล่าง
   ถ้ามีมากกว่า 1 รูป เว็บจะสลับรูปให้เองแบบค่อยๆ จางเข้า-จางออก
   ============================================================ */
const BG_IMAGES = [
  "assets/img/bg.jpg",
];
const BG_HOLD_SEC  = 12;   /* รูปหนึ่งค้างกี่วินาทีก่อนสลับ */
const BG_FADE_MS   = 1600; /* ความเร็วจางเข้า-ออก (ต้องตรงกับ .bg-img ใน style.css) */
const PAGE_FADE_MS = 260;  /* จางหน้าออกตอนกดเปลี่ยนหน้า */

(function(){
  /* ---------- ชั้นพื้นหลัง ---------- */
  const wrap = document.createElement("div");
  wrap.className = "site-bg";
  const layers = [document.createElement("div"), document.createElement("div")];
  layers.forEach(l => { l.className = "bg-img"; wrap.appendChild(l); });
  document.body.appendChild(wrap);

  let cur = 0, idx = 0;
  function show(i, instant){
    const img = BG_IMAGES[i % BG_IMAGES.length];
    const next = layers[cur ^ 1];
    next.style.backgroundImage = `url("${img}")`;
    if(instant){
      next.classList.add("on");
      cur ^= 1;
      return;
    }
    /* จางรูปใหม่เข้า แล้วจางรูปเก่าออกพร้อมกัน = crossfade */
    requestAnimationFrame(()=>{
      next.classList.add("on");
      layers[cur].classList.remove("on");
      cur ^= 1;
    });
  }
  if(BG_IMAGES.length){
    show(0, false);                       /* รูปแรกจางเข้าตอนเปิดหน้า */
    if(BG_IMAGES.length > 1){
      setInterval(()=>{ idx++; show(idx, false); }, BG_HOLD_SEC * 1000 + BG_FADE_MS);
    }
  }

  /* ---------- จางทั้งหน้าเข้า-ออก ---------- */
  /* class="page-fade" ตั้งไว้ใน <body> แล้ว ที่นี่แค่สั่งให้จางเข้า */
  requestAnimationFrame(()=> document.body.classList.add("ready"));

  document.addEventListener("click", e=>{
    const a = e.target.closest("a[href]");
    if(!a) return;
    const href = a.getAttribute("href");
    if(!href || a.target || href.startsWith("#") || href.startsWith("http") ||
       href.startsWith("mailto:") || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    document.body.classList.remove("ready");
    setTimeout(()=>{ location.href = href; }, PAGE_FADE_MS);
  });

  /* ---------- สลับภาษาแล้วไม่ให้ข้อมูลหาย ----------
     แต่ละหน้าบอกสถานะของตัวเองผ่าน window.PAGE_STATE = {get(), set(s)}
     ตอนกดเปลี่ยนภาษาจะแปะสถานะไว้ท้าย URL แล้วอีกหน้าหยิบไปใส่กลับ */
  function stateToHash(href){
    try{
      if(!window.PAGE_STATE || !PAGE_STATE.get) return href;
      const s = PAGE_STATE.get();
      if(!s) return href;
      return href.split("#")[0] + "#s=" + encodeURIComponent(JSON.stringify(s));
    }catch(e){ return href; }
  }
  function restoreState(){
    const m = /(?:^|#|&)s=([^&]+)/.exec(location.hash);
    if(!m || !window.PAGE_STATE || !PAGE_STATE.set) return;
    try{ PAGE_STATE.set(JSON.parse(decodeURIComponent(m[1]))); }catch(e){}
    history.replaceState(null, "", location.pathname + location.search);
  }
  document.addEventListener("DOMContentLoaded", restoreState);
  if(document.readyState !== "loading") setTimeout(restoreState, 0);

  /* ---------- ดรอปดาวน์เลือกภาษา ----------
     ปกติเอาเมาส์ชี้ก็ไหลลงมาเอง (CSS) ส่วนตรงนี้ไว้ให้จอสัมผัสที่ไม่มี hover */
  const pick = document.querySelector(".lang-pick");
  if(pick){
    const btn = pick.querySelector(".lang-btn");
    btn.addEventListener("click", e=>{
      e.stopPropagation();
      const open = pick.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", ()=>{
      pick.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", e=>{
      if(e.key === "Escape"){ pick.classList.remove("open"); btn.setAttribute("aria-expanded","false"); }
    });
    pick.querySelectorAll(".lang-menu a").forEach(a =>{
      a.addEventListener("click", ()=> a.setAttribute("href", stateToHash(a.getAttribute("href"))), true);
    });
  }

  /* กลับมาด้วยปุ่ม Back แล้วหน้ายังจางอยู่ — บังคับให้กลับมาชัด */
  window.addEventListener("pageshow", ()=> document.body.classList.add("ready"));
})();
