# Jaarintro's voor Korrelval: gedeelde opdracht

## Wat de gebruiker wil (letterlijk)
"ik vind dit super mooi maar ik wil dat voor elk jaartal een intro doet en laat zien hoe dat dan vroeger ging want nu heb je wel een hele mooie intro maar laat je alleen de moderne fabriek zien en dan wanneer je start, start je in met een paard die rond draait dus laat dat dan zien"

Elke molen van de tijdlijn krijgt dus een eigen korte **jaarintro**: 1846, 1867, 1920, 1976, 2008 en 2026.
- De jaarintro heeft dezelfde stijl en kwaliteit als de bestaande intro (de vlucht van het tarweveld naar de fabriek en de maaltoren in). Die vindt de gebruiker "super mooi".
- Hij laat zien hoe het in dat jaar ging: de plek, het gebouw, hoe het graan binnenkwam, wat de molen aandreef (in 1846 het paard dat rondloopt), en dan de molen in, waarna het spel begint.

## Het spel nu
- Bestand: `/home/user/Vaultwarden/game/korrelval.html` (kopie: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/base.html`). Het is één artifact-pagina met Canvas 2D en vanilla JS, circa 605 kB.
- **De hoofdintro** (INTRO_SHOTS, openIntro, introShot, introNext, introSkip, introGo, introDraw, ix*-functies, canvas #introCv en het paneel in #scrIntro) heeft drie shots:
  1. van het tarweveld naar de fabriek aan het Nieuwe Kanaal;
  2. langs het schip omhoog langs de maaltoren;
  3. door het raam naar binnen, met de korrel.

  Daarna duik je naar molen 1, met een jaarteller van 2026 naar 1846.
- **Per molen** start daarna eerst de introband (drawIntro: jaarteller, titel, een regel uit LEVELS[i].intro/supply en "Nieuw in deze molen"). Halverwege elke molen staat een verhaal (STORIES).
- **Stijl:** `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/stijlgids.md` blijft gelden: huisstijl Royal Koopmans, sfeer, speelbaarheid, prefers-reduced-motion, snelheid, tekstregels en technisch contract.
- **Niet kijken naar andere games.** De gebruiker wil geen copy game.

## Hoe de jaarintro werkt (vast)
- **Volgorde:**
  - Eerste start: hoofdintro (blijft precies zoals hij is), dan de duik "terug in de tijd", dan jaarintro 1846, dan de introband van 1846, dan spelen.
  - Volgende molen (weegbon > "Volgende molen: 1867"): jaarintro 1867, dan de introband, dan spelen. Enzovoort tot 2026.
- **Wanneer hij vanzelf komt:** alleen de eerste keer dat je die molen start (opslag per jaar, bijvoorbeeld save.jaarSeen). Nooit bij Nog een korrel? en nooit in de Nachtploeg. Via Kies een molen alleen als hij nog niet gezien is. Ook bestaande spelers krijgen hem één keer per molen.
- **Terugkijken:** in het Molenboek, op de pagina van dat jaar, een knop "Bekijk de jaarintro", alleen voor jaren die je al hebt bereikt. Terugkijken eindigt weer in het Molenboek.
- **Bediening zoals de hoofdintro:**
  - Overslaan is altijd zichtbaar. Esc slaat over.
  - Spatie, Enter, pijltje rechts en een tik op het beeld gaan verder.
  - Verder tijdens een camerabeweging springt eerst naar het eindbeeld.
  - Er is een bescherming tegen een dubbeltik.
  - Bij prefers-reduced-motion zie je alleen eindbeelden.
  - aria-live-tekst en een beeldbeschrijving voor schermlezers.
- **Twee shots per jaarintro.**
  - Elk shot heeft een vloeiende camerabeweging van circa 4 tot 5 s; daarna blijft het beeld staan tot Verder.
  - Shot 1, buiten: de plek en het gebouw in dat jaar, met de aanvoer.
  - Shot 2, binnen: hoe de molen werkte, met de aandrijving. Het eindigt in de molen, klaar voor de duik.
  - De laatste knop heet "It giet oan!" (gewone letters, klasse ui-fries zoals in de hoofdintro). Daarna komt een korte duik of overgang en dan de introband.
- **Teksten per shot:**
  - een kicker met plek en jaartal (het jaartal mag in handschrift);
  - een ondertitel van hooguit circa 25 woorden;
  - een korte beeldbeschrijving (desc) voor schermlezers.

  Schrijf gewoon Nederlands en niet AI-achtig. Feiten moeten een bron hebben in het onderzoek. Herhaal niet wat de introband (LEVELS[i].intro/supply) of het verhaal halverwege (STORIES) al zegt: de jaarintro gaat over wat je ZIET.
- **Beeld:**
  - Dezelfde vlakke, gestileerde tekenstijl als de hoofdintro, met de kleuren en het licht van die tijd.
  - Licht thema is dag, donker thema is avond.
  - Historisch kloppend, zonder anachronismen.
  - Speelbaarheid is hier geen punt (er wordt niet gespeeld), maar het beeld moet rustig en duidelijk zijn. Toon geen echt bestaande personen met gezicht (de familie Koopmans hooguit als silhouet in de verte).

## Code-indeling (zodat zes makers tegelijk kunnen werken)
Het raamwerk maakt zes aparte gebieden in het bestand, één per jaar, met deze merkregels:
```
// ===== JAARINTRO 1846 BEGIN =====
... alleen code van 1846 ...
// ===== JAARINTRO 1846 EIND =====
```
- Tussen twee gebieden staan minstens vijf regels die niemand aanpast, zodat git merge-file niet botst.
- Namen in een gebied beginnen met j46, j67, j20, j76, j08 of j26.
- Een jaarmaker past alleen zijn eigen gebied aan.
- Het raamwerk legt de interface per jaar vast in een commentaarblok boven de gebieden: wat een jaar levert (shots met duur, kicker, cap en desc; een bouwfunctie voor de caches; een tekenfunctie per frame) en wat het krijgt (breedte, hoogte, dpr, donker of licht, lite-stand, tijd, de gedeelde tekenhulpjes van de intro zoals lucht, wolken, waas en water, en de korrel).

## Mappen
- Werkmap: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/`
- Storyboards: `jaar/storyboard-<jaar>.md`
- Raamwerk: `jaar/frame/korrelval.html`
- Jaarmakers: `jaar/<jaar>/korrelval.html`
- Onderzoek:
  - `/home/user/Vaultwarden/game/onderzoek/` (research-geschiedenis.json, research-molenproces.json, koopmans-site.md, spelmateriaal.json)
  - `/home/user/Vaultwarden/game/onderzoek-royal-koopmans.md`
