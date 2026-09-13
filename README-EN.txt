============================================
 ASTD Comp — project structure
============================================

astd-site/
├─ index.html / index-en.html     → DPS Calculator      (TH / EN)
├─ units.html / units-en.html     → Unit gallery        (TH / EN)
├─ mobhp.html / mobhp-en.html     → Mob HP table        (TH / EN)
├─ team.html  / team-en.html      → Team builder        (TH / EN)
├─ template.html / template-en.html → blank page template
├─ README.txt (TH) / README-EN.txt (this file)
└─ assets/
   ├─ css/style.css        → shared stylesheet (both languages)
   ├─ js/units.js          → unit database — SHARED by TH and EN
   ├─ js/calculator.js     → calculator logic — SHARED (EN pages set window.SITE_LANG="en")
   ├─ js/upgrades.js       → per-upgrade-level stats for each unit — SHARED
   ├─ js/hpcore.js         → HP formula + multipliers — SHARED
   └─ img/
      ├─ logo.png          → (missing) drop your logo here
      └─ units/            → (empty) drop unit art here

Both language versions read the SAME data files. Edit units.js or hpcore.js
once and both the Thai and English pages update.

--------------------------------------------
1) Logo (top-left)
--------------------------------------------
Overwrite:  assets/img/logo.png
Size:       256 x 256 px (transparent PNG looks best)
Until the file exists, pages show an empty dashed placeholder.

--------------------------------------------
2) Unit art — two ways to add it
--------------------------------------------
Option 1 — drop in files (works for everyone who opens the site)
  Folder:   assets/img/units/
  Size:     200 x 200 px PNG
  Filename: shown on every card on the Units page and under the portrait
            on the Calculator page. Lowercase; spaces and brackets become hyphens.
            "Koku (Supa)" -> koku-supa.png / "Freezer [FULL]" -> freezer-full.png

--------------------------------------------
3) Add or edit units — assets/js/units.js
--------------------------------------------
["Name", Damage, SPA, Range, TotalCost, "Ground/Air/Hybrid", "AtkType", "Enchant", isNew, star]
- Unknown stats → use null (the site then lets you type them in the calculator)
- isNew = 1 → NEW badge / star = 7 → 7★ badge
- Enchants with colour badges: Water, Dark, Holy, Nature, Electric
- Stats are Level 175 max upgrade, from https://allstartd.fandom.com/wiki/Statistics

--------------------------------------------
4) HP formula & multipliers — assets/js/hpcore.js
--------------------------------------------
- ANCHORS       : real in-game values (wave : HP). Add more for better accuracy.
- EARLY_HP      : exact HP for waves 1–30 (wave 1 = 41)
- PLAYER_MULTS  : 1p ×1.0 / 2p ×1.9 / 3p ×2.8 / 4p ×3.7
- ENEMY_MULTS   : Weak ×1.00 / Medium ×1.30 / Strong ×1.75
One file drives both the Mob HP page and the Team page, in both languages.

--------------------------------------------
5) Team page — card order rules
--------------------------------------------
- Toggle a card on the left; it appears in the "Card order" list on the right.
- Drag or use ▲▼ to reorder. Order affects the maths.
- Gilgamesh / Madara cut HP DOWN TO a percentage of MAX HP:
  Gilgamesh (25%) first → Madara (33%) does nothing, HP is already lower.
  Madara (33%) first → Gilgamesh can still cut it further to 25%.
- Luffy removes 25% of REMAINING HP (support buffs raise that percentage).
- TBOI deals a flat 250B explosion (buffs raise it; Dot Buff +50% is TBOI-only).
- Support buffs: Idol 15% / Judgement 8% / FV 35% / Purify 12% — stackable.

--------------------------------------------
6) New pages
--------------------------------------------
Copy template-en.html → rename → edit the title and nav (keep the nav identical
across pages) → fill in the CONTENT section.


--------------------------------------------
7) Upgrade levels (new)
--------------------------------------------
The Calculator has an "Upgrade levels" panel. Click any level and its
Damage / SPA / Range and running cost drop into the fields above, alongside a
table comparing DPS at every level.

Four units ship with real data from the wiki: Aqua Koku (11 levels), Tokens
(10), Veguko (7) and Ultra Koku (5) — the wiki's Level 1 column.
Filling in the rest is quick:

  1. Open that unit's wiki page.
  2. Select the whole Stats Overview block (Deployment through the last
     upgrade) and copy it.
  3. Back in the Calculator, select the unit, open "Import an upgrade table",
     paste the text and press "Read it".
  4. The site parses it into a table and remembers it in your browser.

To keep it permanently for every visitor, press "Copy as code" and paste the
result into assets/js/upgrades.js inside the UPGRADES object.

File format:
  "slug": [
    {lv:0, cost:500, dmg:7500, rng:30, spa:6},   <- lv:0 is deployment
    {lv:1, cost:500, dmg:27500, rng:30, spa:6},
  ],
  * cost is the price of that single level, not a running total — the site
    accumulates it for you.
  * the slug is printed under the unit portrait on the Calculator page.

Note: only one unit's table is included because the wiki started blocking
automated page fetches. No numbers were guessed for the others.


--------------------------------------------
8) Getting an exact copy of the wiki data (data.html)
--------------------------------------------
The wiki now blocks automated fetching (HTTP 402), so copy it once by hand:

  1. Open https://allstartd.fandom.com/wiki/Statistics
  2. Select the whole table (header row through the last unit), Ctrl+C
  3. Open data.html, paste into the box, press "Read"
  4. Press "Download units.js" and overwrite assets/js/units.js
     (or press "Apply" to keep it in this browser only)

The parser handles both table-shaped pastes and one-cell-per-line pastes,
and converts 1.2M / 71.7K shorthand and comma separators automatically.
Existing NEW and 7-star badges are preserved when data is replaced.
