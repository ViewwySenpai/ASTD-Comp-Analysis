/* ============================================================
   ASTD Comp — Orb
   ใส่ได้ทีละลูกเท่านั้น (ในเกมก็ใส่ได้ลูกเดียว)

   dmg  = Overall DMG Buff %        -> คูณกับดาเมจ
   cost = ลดราคารวม %               -> มีผลกับค่า "คุ้มต่อ 1,000¢"
   range= Initial-RNG % ในวิกิ       -> RNG ตรงนี้ย่อมาจาก Range ไม่ใช่ค่าสุ่ม
                                       คิดจาก "ระยะตอนวางครั้งแรก" เท่านั้น
                                       ระยะที่ได้เพิ่มจากการอัปเกรดไม่ถูกคูณด้วย
                                       ใส่ค่าติดลบได้ (Azure ลดระยะตั้งต้น 10%)
   short= ชื่อย่อ ใช้บนปุ่มที่พื้นที่แคบ (หน้า Compare)
   from = ได้มาจากไหน
   ============================================================ */
const ORBS = [
  { id:"azure", name:"Azure Orb", short:"Azure", dmg:15, cost:0, rng:-10,
    from:{th:"ชนะ Sijin Raid โหมด Extreme", en:"Beating Sijin Raid on Extreme Mode"} },

  { id:"ultra-magic", name:"Ultra Magic Orb", short:"Ultra Magic", dmg:5, cost:7, rng:20,
    from:{th:"ชนะ Random Boss Rush 2 Raid", en:"Beating Random Boss Rush 2 Raid"} },

  { id:"universal-reduction", name:"Universal Reduction Orb", short:"Universal", dmg:0, cost:15, rng:0,
    from:{th:"ชนะ Trial Level REQ: 70 โหมด Extreme (ดรอป 20%)",
          en:"Beating Trial Level REQ: 70 on Extreme Mode (20% drop rate)"} },

  { id:"blueeye", name:"Blueeye Orb", short:"Blueeye", dmg:0, cost:0, rng:30,
    from:{th:"คราฟต์ใน Orb Shop", en:"Crafting in the Orb Shop"} },

  { id:"super-blueeye", name:"Super Blueeye Orb", short:"Super Blueeye", dmg:0, cost:0, rng:40,
    from:{th:"Prestige (Wishing for Relics)", en:"Prestige (Wishing for Relics)"} },
];
