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


"airren-doomsday": {
  boost: {cat:"Antiheros", atk:20},
  leader: {
    th: "ยูนิตในหมวด Antiheroes ได้ Attack Boost +20% และโบนัสอีก 20%",
    en: "Units in the Antiheroes category gain Attack Boost +20% and a 20% bonus.",
  },
  tags: ["Antiheros", "Martial Artist", "Progressive", "Corrupted", "Giant", "Siblings"],
},

"ant-king-awakened": {
  boost: {cat:"Unrivaled Intelligence", atk:20},
  leader: {th:"ยูนิตในหมวด Unrivaled Intelligence ได้ดาเมจเพิ่ม 20% และโบนัสอีก 20%",
           en:"Units in the Unrivaled Intelligence category gain a 20% attack boost and a 20% bonus."},
  tags: ["Captains", "Unrivaled Intelligence", "Prodigy", "Final Bosses", "Progressive", "HalfBorn"],
},

"hamerucifer": {
  boost: {cat:"Love Rhythm", atk:20},
  leader: {th:"ยูนิตในหมวด Love Rhythm ได้ Attack Boost +20% และโบนัสอีก 20%",
           en:"Units in the Love Rhythm category gain Attack Boost +20% and a 20% bonus."},
  tags: ["Time Avocs", "Corrupted", "Godly", "Love Rhythm", "Puppeteer", "Girls"],
},

"heavenly-duo": {
  boost: {cat:"Master Class", atk:20},
  leader: {th:"ยูนิตในหมวด Master Class ได้ Attack Boost +20% และโบนัสอีก 17%",
           en:"Units in the Master Class category gain Attack Boost +20% and a 17% bonus."},
  tags: ["Final Bosses", "Pure Evil", "Prodigy", "Master Class", "Perception", "Corrupted"],
},

"kung-fu-galaxy": {
  boost: {cat:"Antiheros", atk:22},
  leader: {th:"ยูนิตในหมวด Antiheros ได้ Attack Boost +22%",
           en:"Units in the Antiheros category gain Attack Boost +22%."},
  tags: ["Antiheros", "Godlike Power", "Speedster", "Inner Being", "Final Bosses", "Revival"],
},

"mochi-awakening": {
  boost: {cat:"Siblings", atk:20},
  leader: {th:"ยูนิตในหมวด Siblings ได้ดาเมจเพิ่ม 20%",
           en:"Units in the Siblings category gain a 20% attack boost."},
  tags: ["Captains", "Siblings", "Legendary Lineage", "Perception", "Prodigy"],
},

"devil": {
  boost:{cat:"Time Avocs", atk:20},
  leader:{th:"ยูนิตในหมวด Time Avocs ได้ดาเมจเพิ่ม 20%", en:"Units in the Time Avocs category gain a 20% attack boost."},
  tags:["Time Avocs", "Godlike Power", "Unrivaled Intelligence", "Spirit Warriors", "Pure Evil", "Final Bosses"],
},

"kovegu-iv": {
  boost:{cat:"Protectors of The Universe", atk:25},
  leader:{th:"ยูนิตในหมวด Protectors of The Universe ได้ดาเมจเพิ่ม 25%", en:"Units in the Protectors of The Universe category gain a 25% attack boost."},
  tags:["Pure Hearted", "Martial Artist", "Godlike Power", "Protectors of The Universe", "Prodigy", "Fusion"],
},

"omega-dragon": {
  boost:{cat:"Pure Evil", atk:25},
  leader:{th:"ยูนิตในหมวด Pure Evil ได้ดาเมจเพิ่ม 25%", en:"Units in the Pure Evil category gain a 25% attack boost."},
  tags:["Brutes", "Raging Power", "Unworldly Beings", "Fusion", "Pure Evil", "Final Bosses"],
},

"the-overlord": {
  boost:{cat:"Undead", atk:20},
  leader:{th:"ยูนิตในหมวด Undead ได้ดาเมจเพิ่ม 20%", en:"Units in the Undead category gain a 20% attack boost."},
  tags:["Isekai Life", "Time Avocs", "Godlike Power", "Unrivaled Intelligence", "Undead", "Prodigy"],
},

"unhuman-nullifier": {
  boost:{cat:"Unrivaled Intelligence", atk:20},
  leader:{th:"ยูนิตในหมวด Unrivaled Intelligence ได้ Attack Boost +20% และโบนัสอีก +15%", en:"Units in the Unrivaled Intelligence category gain Attack Boost +20% and a +15% bonus."},
  tags:["Mortal", "Master Class", "Progressive", "Redemption", "Unrivaled Intelligence", "Perception"],
},
};
