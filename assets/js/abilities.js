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
};
