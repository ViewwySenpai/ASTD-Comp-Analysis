/* ============================================================
   ASTD Comp — สกิลพิเศษของยูนิต (แสดงใต้กล่องขั้นอัปเกรด)

   รูปแบบ (key = slug ของยูนิต ดูได้ใต้รูปในหน้า Calculator):
     "slug": [
       { name:"ชื่อสกิล",
         lv:  4,                      // ปลดล็อกที่อัปขั้นไหน (ไม่มีก็เว้นได้)
         cd:  {th:"...", en:"..."},   // คูลดาวน์
         global: true,                // คูลดาวน์ร่วมกับยูนิตอื่นหรือไม่
         passive: true,               // ไม่ใช่สกิลกด -> ไม่ต้องขึ้นคำว่า "คูลดาวน์"
         mult: 1.5,                   // ใส่ถ้าอยากมีสวิตช์เปิด-ปิดผลคูณดาเมจ
         th:["..."], en:["..."] },    // รายละเอียดเป็นข้อ ๆ
     ]

   ข้อความสรุปมาจากหน้ายูนิตบนวิกิ เขียนใหม่ให้สั้นลง ไม่ได้ก๊อปมาทั้งย่อหน้า
   ============================================================ */
const ABILITIES = {

"legendary-leader-path": [
  {
    name: "Tsuku",
    lv: 4,
    global: true,
    cd: {th: "6 นาที 40 วินาที (400 วิ)", en: "6 minutes 40 seconds (400s)"},
    th: [
      "หยุดเวลาศัตรูทั้งแมป 40 วินาที ยกเว้นตัวที่ติด wax slow",
      "ใช้คูลดาวน์กลางร่วมกับ The Patriot, Red Servant (Final) และ Ex-Captain (B-Kui) จึงซ้อนกับ Mysterious X (Final) และ Jokato Koju (ASCENDED) ได้",
      "ระหว่างสกิลมี DOT ค่อย ๆ ดึงศัตรูที่เลือดเกิน 33% ลงมาเหลือ 33% ทีละ 1% ทุก 2 วินาที ครบใน 66 วินาทีถ้าไม่มีตัวช่วย",
    ],
    en: [
      "Timestops every enemy on the map for 40 seconds, except those under wax slow.",
      "Shares its global cooldown with The Patriot, Red Servant (Final) and Ex-Captain (B-Kui), so it stacks with Mysterious X (Final) and Jokato Koju (ASCENDED).",
      "While active, a DOT drags any enemy above 33% max HP down to 33%, at 1% every 2 seconds — 66 seconds on its own.",
    ],
  },
  {
    name: "Yomi",
    lv: 7,
    global: true,
    cd: {th: "16 นาที (960 วิ)", en: "16 minutes (960s)"},
    th: [
      "ย้อนตำแหน่งศัตรูทั้งหมดกลับไป 36 วินาที",
      "ศัตรูกลายเป็นโคลนที่เรียกออกมาใช้ได้ เหลือเลือด 10% ของเลือดเต็ม เพดานโคลนละ 100,000,000,000",
      "ปล่อย Black Flames ประมาณ 16 เท่าของดาเมจตอนนั้น หลังผ่านไป 40 วินาที — ลงทันทีถ้าศัตรูติด Time Acceleration ของ Lucci (Heaven)",
      "ดาเมจ Black Flames สเกลตามดาเมจของ Legendary Leader (Path)",
      "ย้อนเวลาซ้อนกับการย้อนปกติได้ เช่นของ Julian (King of Wizards)",
      "ศัตรูที่ติด WaxSlow จะไม่ถูกย้อน",
    ],
    en: [
      "Rewinds every enemy to where it stood 36 seconds ago.",
      "Enemies become summonable clones keeping 10% of their max HP, capped at 100,000,000,000 each.",
      "Drops a Black Flames nuke worth roughly 16x his current damage after 40 seconds — instantly if the enemy is under Lucci (Heaven)'s Time Acceleration.",
      "The nuke's damage scales with Legendary Leader (Path)'s own damage.",
      "Its rewind stacks with ordinary rewinds such as Julian (King of Wizards).",
      "Enemies under WaxSlow are not rewound.",
    ],
  },
],


"second-trumpet-salt-king": [
  {
    name: "Judgement",
    lv: 0,
    passive: true,
    cd: {th: "ติดตั้งแต่วางยูนิต", en: "active from deployment"},
    th: [
      "ศัตรูที่ติดสถานะจะโดนดาเมจทุก 2 วินาที รวม 20 วินาที ดาเมจรวมจึงเป็น 10 เท่าของดาเมจตอนนั้น",
      "สถานะนี้ยังทำให้ศัตรูรับดาเมจจากทุกแหล่งเพิ่มอีก 8% รวมแล้วสูงได้ถึง 10.8 เท่า",
      "ช่อง Judgement DPS ในตารางด้านบนคือดาเมจส่วนนี้เฉลี่ยต่อวินาที",
    ],
    en: [
      "Ticks on the affected enemy every 2 seconds for 20 seconds, so it totals 10x the unit's current damage.",
      "It also debuffs the enemy into taking 8% more damage from every source, pushing the total to about 10.8x.",
      "The Judgement DPS column above is that damage averaged per second.",
    ],
  },
  {
    name: "Who Art in Heaven",
    lv: 6,
    global: true,
    cd: {th: "8 นาที (480 วิ)", en: "8 minutes (480s)"},
    th: [
      "หยุดเวลาศัตรูทุกตัวแบบ ultimate timestop นาน 100 วินาที",
      "ติดดีบัฟให้ศัตรูรับดาเมจเพิ่ม 15%",
      "ใช้คูลดาวน์กลางร่วมกับ ultimate timestop ของ ZIO (ASCENDED)",
    ],
    en: [
      "Ultimate timestop on every enemy for 100 seconds.",
      "Debuffs them into taking 15% more damage.",
      "Shares its global cooldown with ZIO (ASCENDED)'s ultimate timestop.",
    ],
  },
  {
    name: "Seraph's Rebirth, Sinner's Repentance",
    lv: 8,
    global: true,
    cd: {th: "ใช้ได้ครั้งเดียวต่อเกม", en: "one use per game"},
    th: [
      "เพิ่มดาเมจพื้นฐานถาวร 221,760,000",
      "ใช้คูลดาวน์กลางร่วมกับ Evil Shade (Final)",
    ],
    en: [
      "Permanently raises base damage by 221,760,000.",
      "Shares its global cooldown with Evil Shade (Final).",
    ],
  },
],

"tboi-rebirth": [
  {
    name: "Vampirism",
    lv: 0,
    passive: true,
    mult: 1.5,          /* เปิดสวิตช์ = ถือว่าศัตรูติดสถานะอยู่ ดาเมจคูณ 1.5 */
    cd: {th: "ติดตั้งแต่วางยูนิต", en: "active from deployment"},
    th: ["ตีแรงขึ้น 1.5 เท่ากับศัตรูที่ติดสถานะ Bleed, Rupture หรือ Judgement"],
    en: ["Deals 1.5x damage to enemies affected by Bleed, Rupture or Judgement."],
  },
  {
    name: "The TBOI Special",
    lv: 9,
    global: true,
    cd: {th: "ใช้ได้ครั้งเดียวต่อเกม ต้องเก็บครบ 175 คิลก่อน", en: "one use per game, needs 175 kills first"},
    th: [
      "ปล่อยนิวเคลียร์ 250 พันล้านดาเมจใส่ศัตรูทั้งแมป",
      "หลังจากนั้นอีก 30 วินาที สถานะของยูนิตนี้จะได้ HealHit เพิ่ม",
      "ซ้อนกับ Vampirism ได้ นิวเคลียร์จึงแรงได้ถึง 375 พันล้าน",
      "ใช้คูลดาวน์กลางร่วมกับสกิล Esper Rage ของ Stampede (???%)",
    ],
    en: [
      "Releases a 250 billion damage nuke on every enemy on the map.",
      "For the next 30 seconds his status effect also gains HealHit.",
      "Stacks with Vampirism, so the nuke can reach 375 billion.",
      "Shares its global cooldown with Stampede (???%)'s Esper Rage.",
    ],
  },
],

"airren-doomsday": [
  {
    name: "The Final March",
    lv: 6,
    /* สกิลที่ยิงดาเมจต่อเนื่อง: ลงดาเมจ pct ของดาเมจปัจจุบัน ticks ครั้งต่อวินาที
       นาน min-max วินาที แล้วรอคูลดาวน์ cd วินาที */
    dot: {pct:0.6, ticks:3, cd:500, min:50, max:80, def:65},
    cd: {th: "500 วินาที (ไม่ใช่คูลดาวน์กลาง)", en: "500 seconds (not a global cooldown)"},
    th: [
      "ต้องมี The Founder วางอยู่บนแมปด้วย ไม่ว่าใครเป็นคนวาง",
      "ระหว่าง The Rumbling จะมี Wall Titan และ Founding Titan ของ Airren เดินข้ามแมป",
      "ไททันปล่อยหมอกดาเมจไปทั่วแมป ศัตรูที่อยู่ในหมอกโดน 60% ของดาเมจปัจจุบันของ Airren วินาทีละ 3 ครั้ง",
      "ระยะเวลาต่างกันไปตามแมป ประมาณ 50-80 วินาที",
      "ใช้ได้ทีละหนึ่ง March เท่านั้น และระหว่างนั้นเกมจะกลับไปความเร็ว 1x",
    ],
    en: [
      "Requires The Founder to be placed somewhere on the map, no matter who placed it.",
      "During The Rumbling, Wall Titans and Airren's Founding Titan march across the whole map.",
      "They trail a fog of damage — enemies inside it take 60% of Airren's current damage, 3 ticks per second.",
      "Duration depends on the map, roughly 50-80 seconds.",
      "Only one March can run at a time, and game speed drops to 1x while it lasts.",
    ],
  },
],

"ant-king-awakened": [
  {
    name: "Aura Synthesis", lv: 6, global: true,
    cd: {th: "ใช้ได้ครั้งเดียวต่อเกม", en: "one use per game"},
    th: [
      "กลืนยูนิตทุกตัวที่อยู่ในระยะ แล้วได้ดาเมจเพิ่มเท่ากับ 1/4 ของดาเมจยูนิตที่กลืน",
      "นับรวมบัฟและสกิลของยูนิตพวกนั้นด้วย เพิ่มได้สูงสุด 518.4M",
      "ยูนิตที่ถูกกลืนวางกลับลงสนามไม่ได้ แต่โควตาการวางยังเหลือเท่าเดิม",
    ],
    en: [
      "Consumes every unit in range and gains damage equal to a quarter of their damage.",
      "Counts their buffs and abilities too, capped at 518.4M.",
      "Consumed units cannot be placed again, though your placement slots stay free.",
    ],
  },
],

"hamerucifer": [
  {
    name: "Time-Freezing Sands II", lv: 2,
    cd: {th: "40 วินาที", en: "40 seconds"},
    th: ["หยุดเวลาศัตรูทุกตัวที่อยู่ในระยะ 8.5 วินาที"],
    en: ["Timestops every enemy inside Hamerucifer's range for 8.5 seconds."],
  },
  {
    name: "Rewinding Sands", lv: 5,
    cd: {th: "80 วินาที", en: "80 seconds"},
    th: ["ย้อนศัตรูทุกตัวในระยะกลับไป 16 วินาที", "ศัตรูที่ติด WaxSlow อยู่จะไม่โดนย้อน"],
    en: ["Rewinds every enemy in range by 16 seconds.", "Enemies under WaxSlow are not affected."],
  },
  {
    name: "I was waiting for this moment...", lv: 8, global: true,
    cd: {th: "ใช้ได้ครั้งเดียวต่อเกม", en: "one use per game"},
    th: [
      "ดูดศัตรูทุกตัวออกจากแมปไปไว้ใน Warp Marble",
      "ระหว่างนั้นศัตรูไม่ถูกนับในลิมิต จึงข้ามเวฟได้",
      "ครบ 60 วินาทีศัตรูจะกลับมาที่จุดเริ่มพร้อมเลือดเต็ม",
      "ต้องมี Medukami อยู่ในระยะถึงจะใช้ได้",
      "ใช้คูลดาวน์กลางร่วมกับ Universe Reset ของ Lucci (Heaven)",
    ],
    en: [
      "Pulls every enemy off the map into a Warp Marble.",
      "While inside they do not count toward the enemy limit, so waves can be skipped.",
      "After 60 seconds they respawn at the start of the map with full HP.",
      "Needs Medukami in range to activate.",
      "Shares its global cooldown with Lucci (Heaven)'s Universe Reset.",
    ],
  },
],

"heavenly-duo": [
  {
    name: "Enuma Reduction", lv: 7, global: true,
    cd: {th: "ใช้ได้ครั้งเดียวต่อเกม", en: "one use per game"},
    th: [
      "ตั้งเลือดศัตรูทุกตัวบนแมปให้เหลือ 25% ของเลือดสูงสุด",
      "ทับกันกับ Wall Of Light ของ God Black Fusion และ Disintegration ของ Wrathdioas (Demon King)",
      "แต่ซ้อนกับ Fifth Form Gun ของ Ruffy (5th Form), Hope Execution ของ Future T & Aqua Vegu และ Waffle Maker ของ The Strongest In History ได้",
    ],
    en: [
      "Sets every enemy on the map to 25% of their max HP.",
      "Overlaps with God Black Fusion's Wall Of Light and Wrathdioas (Demon King)'s Disintegration.",
      "Stacks with Ruffy (5th Form)'s Fifth Form Gun, Future T & Aqua Vegu's Hope Execution and The Strongest In History's Waffle Maker.",
    ],
  },
],

"kung-fu-galaxy": [
  {
    name: "Copy Fist", lv: 4, mult: 1.2,
    cd: {th: "4 นาที", en: "4 minutes"},
    th: [
      "บัฟดาเมจตัวเอง 20% นาน 60 วินาที (สวิตช์นี้คิดเฉพาะส่วน 20%)",
      "และก๊อปสถิติของยูนิตข้าง ๆ มา 30% เพดาน 19.2M — ส่วนนี้ระบบยังคิดให้ไม่ได้",
      "ก๊อปดาเมจของ Kung Fu Galaxy ด้วยกันเองไม่ได้",
    ],
    en: [
      "Buffs its own damage by 20% for 60 seconds (this switch counts that 20% only).",
      "It also copies 30% of a nearby unit's stats, capped at 19.2M — the site cannot work that part out.",
      "It cannot copy another Kung Fu Galaxy's damage.",
    ],
  },
  {
    name: "Ultimate Fist", lv: 8, global: true,
    cd: {th: "ใช้ได้ครั้งเดียวต่อเกม นาน 1 นาที", en: "one use per game, lasts 1 minute"},
    th: [
      "เพิ่มดาเมจเท่ากับครึ่งหนึ่งของเลือดศัตรูที่แข็งแรงที่สุด เช่นศัตรูมี 100B ก็ได้ดาเมจเพิ่ม 50B",
      "นับจากศัตรูตัวเดียวเท่านั้น ซ้อนหลายตัวไม่ได้ เพดาน 200B",
      "ติดผล Erasure เตะศัตรูกลับไป 4 มุมเหมือน Devil",
      "ใช้ได้กับ Kung Fu Galaxy ตัวเดียวเท่านั้น และใช้คูลดาวน์กลางร่วมกับ Witch Betrayer",
    ],
    en: [
      "Adds damage equal to half the strongest enemy's HP — a 100B enemy gives 50B damage.",
      "It reads one enemy only, never several at once, and caps at 200B.",
      "It also applies Erasure, teleporting enemies back four corners like Devil.",
      "Only one Kung Fu Galaxy can use it, and it shares its global cooldown with Witch Betrayer.",
    ],
  },
],

"mochi-awakening": [
  {
    name: "WaxSlow", lv: 0, passive: true,
    cd: {th: "ติดตั้งแต่วางยูนิต", en: "active from deployment"},
    th: [
      "ศัตรูที่โดน Mochi (Awakening) ตีจะติด WaxSlow ช้าลง 85% นาน 35 วินาที",
      "ไม่ซ้อนกับ Slow, Sunburn หรือ GaleSlow",
      "ลบล้างผลของ Rewind แบบปกติ",
    ],
    en: [
      "Enemies hit by Mochi (Awakening) get WaxSlow — 85% slower for 35 seconds.",
      "It does not stack with Slow, Sunburn or GaleSlow.",
      "It negates the effect of a regular Rewind.",
    ],
  },
],
};
