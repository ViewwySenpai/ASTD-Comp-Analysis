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

"devil": [
  {
    name:"Bleed", lv:0, passive:true,
    cd:{th:"ติดตั้งแต่วางยูนิต", en:"active from deployment"},
    th:["ทุกการโจมตีทำ Bleed DPS เพิ่มเท่ากับดาเมจปัจจุบัน ×5 ÷10", "ระบบรวม Bleed ส่วนนี้ไว้ใน DPS อัตโนมัติทุกขั้นอัปเกรด"],
    en:["Every attack adds Bleed DPS equal to current damage ×5 ÷10.", "The site includes this Bleed contribution in DPS automatically at every upgrade."],
  },
  {
    name:"Erased", lv:7, global:true,
    cd:{th:"12 นาที 30 วินาที (750 วิ)", en:"12 minutes 30 seconds (750s)"},
    th:["ส่งศัตรูทุกตัวกลับไป 3 เส้นทาง หยุดเวลา 30 วินาที และลดเลือดเหลือ 65% ของ Max HP", "ศัตรูที่เคยโดนแล้วจะไม่รับผลซ้ำ", "หากใช้ซ้ำด้วยการขาย/วางใหม่ จะยังผลักกลับและลด HP แต่ไม่เกิด Global Timestop"],
    en:["Teleports every enemy back three paths, timestops for 30 seconds, and cuts HP to 65% of maximum.", "Enemies already affected cannot be affected again.", "Reusing it after replacing the unit still rewinds and cuts HP, but does not trigger another global timestop."],
  },
],

"kovegu-iv": [
  {
    name:"Radiant Positive Energy", lv:0, passive:true,
    cd:{th:"ติดตั้งแต่วางยูนิต", en:"active from deployment"},
    th:["โจมตีศัตรูที่มี Enchant แบบ Super Effective เสมอ และเจาะ Tribute Resistance"],
    en:["Always deals Super Effective Damage to Enchant enemies and pierces Tribute Resistance."],
  },
  {
    name:"Bluff Beam?!", lv:8,
    /* ดาเมจรวม = ตัวหลัก 100% + โคลน 4 ตัว × 24% = 196% */
    mult:1.96,
    cd:{th:"ทำงานนาน 180 วินาที", en:"lasts 180 seconds"},
    th:["เปิด Typhoebane ทำให้โจมตีศัตรู Elemental ได้ 180 วินาที", "สร้างโคลน Kovegu IV 4 ตัว แต่ละตัวมี 24% ของค่าสเตตัสขั้นสูงสุด", "เมื่อเปิดคำนวณ จะรวมดาเมจตัวหลักกับโคลนทั้ง 4 ตัว (รวม x1.96)"],
    en:["Activates Typhoebane, allowing Elemental damage for 180 seconds.", "Spawns four Kovegu IV clones, each with 24% of its max-upgrade stats.", "When enabled, combines the main unit's damage with all four clones (x1.96 total)."],
  },
  {
    name:"Positive Energy Stardust Breaker!", lv:11,
    cd:{th:"ใช้ได้ 3 ครั้ง", en:"can be used three times"},
    th:["ลดเลือดปัจจุบันของศัตรูทุกตัว 27%", "สร้างโดเมน 5 นาที บัฟดาเมจ 15% ให้หมวด Protectors of The Universe, Pure Hearted และ Prodigy"],
    en:["Removes 27% of every enemy's current HP.", "Creates a five-minute domain that grants +15% damage to Protectors of The Universe, Pure Hearted, and Prodigy units."],
  },
],

"omega-dragon": [
  {
    name:"Enchant Change", lv:0, passive:true,
    cd:{th:"ติดตั้งแต่วางยูนิต", en:"active from deployment"},
    th:["เมื่อโจมตี จะเปลี่ยน Enchant ของศัตรูเป็น Electric"],
    en:["Attacks change the enemy's Enchant to Electric."],
  },
  {
    name:"Negative Energy Shroud", lv:6,
    cd:{th:"ต้องใช้ภายใน 7 นาทีหลังเปิดใช้งาน", en:"must be activated within seven minutes"},
    th:["สร้างโดเมนทำให้ศัตรูช้าลง 10% และเสีย Max HP 0.7% ต่อเนื่องจนเหลือ 66%", "บัฟดาเมจ 15% และ Super Effective Damage ให้หมวด Unworldly Beings, Pure Evil และ Final Bosses"],
    en:["Creates a domain that slows enemies by 10% and drains 0.7% max HP continuously until 66% remains.", "Grants +15% damage and Super Effective Damage to Unworldly Beings, Pure Evil, and Final Bosses units."],
  },
  {
    name:"Negative Energy Rebirth", lv:10, global:true,
    cd:{th:"หน้าต่างใช้งาน 7 วินาที", en:"seven-second activation window"},
    th:["หากศัตรูชนฐานภายใน 7 วินาที จะผลักศัตรูทั้งหมดกลับ 4 เส้นทาง", "ทำงานคล้ายและใช้ Global Cooldown ร่วมกับ Liberation ของ Ruffy (5th Form)"],
    en:["If an enemy reaches the base within seven seconds, every enemy is pushed back four paths.", "Works like and shares a global cooldown with Ruffy (5th Form)'s Liberation."],
  },
],

"the-overlord": [
  {
    name:"Necromancy", lv:0, passive:true,
    cd:{th:"ติดตั้งแต่วางยูนิต", en:"active from deployment"},
    th:["ศัตรูที่ The Overlord กำจัดจะคืนชีพเป็นอันเดด โดยมี HP 15% ของเลือดเริ่มต้น", "HP ของอันเดดแต่ละตัวมีเพดาน 100 พันล้าน"],
    en:["Enemies defeated by The Overlord are resurrected as undead summons with 15% of their initial HP.", "Each undead summon is capped at 100 billion HP."],
  },
  {
    name:"Falling Down", lv:5,
    th:["สร้างดาเมจ 3 เท่าของ The Overlord แก่ศัตรูทั้งหมดในระยะและติด Fear", "ถ้าเสริมพลังด้วย The Goal of All Life is Death จะทำให้ติด Rupture เพิ่มด้วย"],
    en:["Deals 3x The Overlord's damage to every enemy in range and applies Fear.", "When amplified by The Goal of All Life is Death, it also applies Rupture."],
  },
  {
    name:"The Goal of All Life is Death", lv:7,
    cd:{th:"สกิลที่ต้องการเสริมพลังต้องใช้ภายใน 12 วินาที", en:"the amplified ability must be used within 12 seconds"},
    th:["เสริมพลัง Falling Down, Necromancer's Sorcery และ Banshee's Cry", "ต้องกดสกิลที่ต้องการภายใน 12 วินาทีหลังเปิดใช้งาน มิฉะนั้นจะไม่ได้รับผลเสริมพลัง"],
    en:["Amplifies Falling Down, Necromancer's Sorcery, and Banshee's Cry.", "The desired ability must be activated within 12 seconds or the amplification is lost."],
  },
  {
    name:"Necromancer's Sorcery", lv:9,
    th:["เรียกอันเดด 15 ตัวทันที แต่ละตัวมี HP เท่ากับ 10% ของดาเมจ The Overlord และฟื้น HP ฐาน 1.5 พันล้าน", "เมื่อเสริมพลัง อันเดดจะมี HP 15% ของดาเมจ และฟื้น HP ฐาน 2.5 พันล้าน"],
    en:["Instantly summons 15 undead, each with HP equal to 10% of The Overlord's damage, and heals the base for 1.5 billion HP.", "When amplified, each undead has 15% of his damage as HP and the base is healed for 2.5 billion HP."],
  },
  {
    name:"Majesty's Treasury", lv:9,
    th:["เมื่อเปิดใช้งาน ผู้เล่นจะได้รับเงิน 2,000,000"],
    en:["Grants the player 2,000,000 cash when activated."],
  },
  {
    name:"Overlord's Influence", lv:9,
    cd:{th:"บัฟดาเมจเริ่มทำงานหลังเปิดใช้ 3 นาที", en:"damage buff begins three minutes after activation"},
    th:["ลบคุณสมบัติของศัตรู เช่น Cloner, Air และ Bosses Immune", "หลังเปิดใช้ 3 นาที ยูนิตหมวด Godlike Power, Undead หรือ Unrivaled Intelligence จะทำดาเมจเพิ่ม 10%"],
    en:["Removes enemy attributes such as Cloner, Air, and Bosses Immune.", "Three minutes after activation, Godlike Power, Undead, and Unrivaled Intelligence units deal 10% more damage."],
  },
  {
    name:"Banshee's Cry", lv:11,
    th:["กำจัดศัตรูทุกตัวที่มี HP ต่ำกว่า 7% ของ Max HP", "เมื่อเสริมพลัง จะกำจัดศัตรูที่มี HP ต่ำกว่า 14% แทน"],
    en:["Executes every enemy below 7% of maximum HP.", "When amplified, the execution threshold rises to 14%."],
  },
],

"unhuman-nullifier": [
  {
    name:"TypeBane", lv:0, passive:true, mult:2,
    cd:{th:"ติดตั้งแต่วางยูนิต", en:"active from deployment"},
    th:["ทำดาเมจ 2 เท่าแก่ศัตรูที่มีหรือเคยมี Title แม้ภายหลังจะถูกเปลี่ยนเป็นศัตรูปกติ", "โจมตีแบบ Piercing ต่อศัตรู Elemental", "เปิดสวิตช์เพื่อคำนวณดาเมจ x2 เมื่อตรงเงื่อนไข"],
    en:["Deals 2x damage to enemies that have or originally had a Title, even if they were later changed into regular enemies.", "Deals Piercing damage to Elemental enemies.", "Enable the switch to calculate x2 damage when the condition applies."],
  },
  {
    name:"Fall Of Man", lv:7, global:true,
    cd:{th:"400 วินาที; Global Cooldown ประมาณ 480–500 วินาที", en:"400 seconds; approximately 480–500 seconds global cooldown"},
    th:["เปลี่ยน Powerful 1/2, Decelerate, Cloner, Regenerate, Elemental, Rage และ Armoured ทั้งแมปให้เป็นศัตรูปกติ ยกเว้น Air, Miniboss และ Boss", "ศัตรู Air ที่ได้รับผลจะถูกโจมตีโดยยูนิต Ground ได้"],
    en:["Turns Powerful 1/2, Decelerate, Cloner, Regenerate, Elemental, Rage, and Armoured enemies across the map into regular enemies, except Air, Miniboss, and Boss enemies.", "Affected Air enemies become targetable by Ground units."],
  },
],
};
