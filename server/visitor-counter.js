/* ============================================================
   ASTD Comp — ตัวนับผู้เข้าชม (ฝั่งเซิร์ฟเวอร์)
   Cloudflare Worker + KV

   หน้าที่: รับคำขอจากหน้าเว็บ ดู IP ของคนเข้า แล้วตอบกลับว่ามีผู้เข้าชมกี่คน

   สำคัญ: ไม่เก็บ IP ดิบ
   เอา IP มาผสมกับ SALT แล้วแปลงเป็นรหัสย่อ (SHA-256) เก็บเฉพาะรหัสนั้น
   ย้อนกลับไปหา IP เดิมไม่ได้ แต่ยังนับซ้ำคนเดิมได้อยู่

   ต้องผูก KV namespace ชื่อ VISITS และตั้ง secret ชื่อ SALT
   ดูวิธีทำใน README.txt ข้างไฟล์นี้
   ============================================================ */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function hashIp(ip, salt){
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + "|" + ip));
  return [...new Uint8Array(buf)].slice(0, 12).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function bump(env, key){
  const n = parseInt(await env.VISITS.get(key) || "0", 10) + 1;
  await env.VISITS.put(key, String(n));
  return n;
}

export default {
  async fetch(req, env){
    if(req.method === "OPTIONS") return new Response(null, {headers: CORS});

    const ip    = req.headers.get("CF-Connecting-IP") || "0.0.0.0";
    const today = new Date().toISOString().slice(0, 10);
    const id    = await hashIp(ip, env.SALT || "astd");

    /* นับเฉพาะตอนที่ยิงเข้ามาแบบ POST (หน้าเว็บเปิดใหม่) GET ไว้ดูตัวเลขเฉย ๆ */
    if(req.method === "POST"){
      /* คนใหม่ตลอดกาล — เก็บรหัสไว้ไม่มีวันหมดอายุ */
      if(await env.VISITS.get("all:" + id) === null){
        await env.VISITS.put("all:" + id, "1");
        await bump(env, "total");
      }
      /* คนใหม่ของวันนี้ — รหัสหมดอายุใน 36 ชม. */
      const dayKey = `day:${today}:${id}`;
      if(await env.VISITS.get(dayKey) === null){
        await env.VISITS.put(dayKey, "1", {expirationTtl: 60 * 60 * 36});
        await bump(env, "count:" + today);
      }
    }

    const total = parseInt(await env.VISITS.get("total") || "0", 10);
    const day   = parseInt(await env.VISITS.get("count:" + today) || "0", 10);

    return new Response(JSON.stringify({total, today: day}), {
      headers: {...CORS, "Content-Type": "application/json", "Cache-Control": "no-store"},
    });
  },
};
