/* ============================================================
   ASTD Comp — หมวดหมู่ยูนิต (Unit Categories) + Leader Skill
   แสดงเป็นกล่องขอบแดงล่างสุดของหน้า Calculator

   รูปแบบ:
     "slug": {
       boost: {cat:"ชื่อหมวดที่ได้บัฟ", atk:20},  // ตัวเลขที่หน้า Team เอาไปคิดจริง
       leader: {th:"...", en:"..."},              // ข้อความอธิบาย
       tags: ["Depraved Demons", ...]             // หมวดที่ยูนิตนี้อยู่
     }
   ยูนิตจะได้บัฟจาก Leader ก็ต่อเมื่อ tags ของมันมีหมวดตรงกับ boost.cat
   ============================================================ */
const CATEGORIES = {

"tboi-rebirth": {
  boost: {cat:"Depraved Demons", atk:20},
  leader: {
    th: "ยูนิตในหมวด Depraved Demons ได้ดาเมจเพิ่ม 20% และได้เงินเพิ่ม 20%",
    en: "Units in the Depraved Demons category gain a 20% attack boost and 20% more money.",
  },
  tags: ["Depraved Demons", "Love Rhythm", "Undead", "Prodigy", "Revival", "HalfBorn"],
},

"legendary-leader-path": {
  boost: {cat:"Master Class", atk:15},
  leader: {
    th: "ยูนิตในหมวด Master Class ได้ Attack Boost +15% และโบนัสอีก +20%",
    en: "Units in the Master Class category gain Attack Boost +15% and a +20% bonus.",
  },
  tags: ["Mortal", "Godlike Power", "Godly", "Prodigy", "Master Class"],
},

"second-trumpet-salt-king": {
  boost: {cat:"HalfBorn", atk:25},
  leader: {
    th: "ยูนิตในหมวด HalfBorn ได้ดาเมจเพิ่ม 25%",
    en: "Units in the HalfBorn category gain a 25% attack boost.",
  },
  tags: ["Corrupted", "Godly", "Love Rhythm", "Prodigy", "Revival", "HalfBorn"],
},

};
