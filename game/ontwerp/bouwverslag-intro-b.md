# Bouwverslag bouwer B: intro (vlucht de maaltoren in)

Back-up van de versie hiervoor: /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/korrelval-b.v17.html

## Wat ik heb gedaan
- Nieuw scherm `#scrIntro` (`show('intro')`, aria-label "Intro"). Een eigen canvas `#introCv` (aria-hidden) vult het hele scherm. Onderaan staat een ondertitelpaneel (`.card.intro-panel`, op desktop 560 px breed en zwevend) met per shot een kicker (h2), drie stipjes met "Stap x van 3." voor schermlezers, de ondertitel, een korte beeldbeschrijving (sr-only), "Verder" (data-primary) en de tekstlink "Overslaan". Kicker, stappen, tekst en beschrijving staan samen in een `aria-live="polite"`-regio. "Overslaan" staat ook als klein knopje rechtsboven (44 px).
- Drie shots met elk een vloeiende camerabeweging, daarna blijft het beeld stil staan:
  1. (4,2 s) Van boven het water zweeft de camera naar de fabriek: stad in de nevel, oud bakstenen gebouw, de antraciet maaltoren met het Royal Koopmans-logo op de gevel (de paden van de inline `.rk-logo`, met `Path2D` getekend, wit met gouden kroon en lijn), silo's met een galerij, een oranje loskraan, een graanschip aan de kade, huizen met trapgevels en bomen aan deze kant, wolken en meeuwen.
  2. (5 s) Een gebogen camerabaan: eerst omlaag naar het schip (de zuigbuis gaat in het ruim, graanstipjes gaan omhoog, over de transportbrug de silo's in en over de loopbrug de toren in), dan omhoog langs de toren naar het verlichte raam onder het logo.
  3. (4,6 s) De camera vliegt steeds sneller op dat raam af. Achter het raam staat al de binnenkant. Daarna kantelt de blik naar beneden, de schacht in: verdiepingen met walsenparen zoals in het spel (Molen B-kleuren, oranje rand, steeds donkerder naar het verdwijnpunt). De korrel komt uit de stortkoker (`drawGrain` hergebruikt, met een nieuwe parameter voor een ander canvas en eigen toestand), veert na, lacht en kijkt je knipperend aan.
- Verder tijdens een camerabeweging springt eerst naar het eindbeeld, pas de tweede druk gaat door. Tik op het beeld, spatie, Enter of pijltje rechts werken net als Verder. Esc doet Overslaan.
- "It giet oan!" op shot 3: de camera duikt 0,75 s de schacht in en de korrel valt mee. Daarna `startCampaign(0, 2026)` met een korte donkere overgang (`#introVeil`). De jaarteller van de introband rolt nu achteruit van 2026 naar 1846. `drawIntro` rolt de cijfers achteruit als het doeljaar lager is; dat heb ik met een screenshot gecontroleerd.
- Wanneer de intro komt: alleen bij de eerste klik op "It giet oan!" als `save.introSeen` niet waar is. Wie al een molen of score heeft (`maxLvl > 0` of `best > 0`), krijgt hem niet. Nooit bij Nog een korrel?, Kies een molen of de Nachtploeg. Na Overslaan of "It giet oan!" geldt `save.introSeen = true` met `persist()`.
- In Over dit spel staat "Bekijk de intro opnieuw" (`#bIntroAgain`). De tekstlink heet dan "Terug naar het menu" en het knopje rechtsboven "Terug". Beide gaan naar de titel, en "It giet oan!" start molen 1.
- Verminderde beweging: geen lus en geen camerabeweging. Elk shot verschijnt meteen als eindbeeld en de laatste knop start direct.
- Licht thema toont daglicht met zon. Donker thema toont avond met maan, sterren, verlichte ramen en een weerspiegeling in het water.
- Geluid (alleen als het aan staat): een zacht windje en twee meeuwenroepjes via `AU`. Zonder geluid werkt alles gewoon.
- Snelheid: lucht, wolken, de stad ver weg en de buurt achter de fabriek staan op offscreen-canvassen. De stadsbeelden worden op het titelscherm alvast klaargezet. Fabriek, schip en voorgrond zijn vooraf gebouwde `Path2D`-vormen met één fill per kleur, zodat ze ook ingezoomd scherp blijven. Een stilstaand eindbeeld wordt één keer bewaard; daarna komen alleen de meeuwen, de graanstipjes en de knipperende korrel erbovenop. Lucht en grond worden alleen getekend waar ze zichtbaar zijn. Een eigen `requestAnimationFrame`-lus loopt alleen zolang `S.screen === 'intro'` (en niet uit beeld). De resolutie zakt net als in het spel via `frameSample`, en is het bij de eerste twaalf frames veel te traag, dan meteen naar dpr 1.
- Testhaken: `__korrelval.intro()` geeft toestand, frames en lus. `__korrelval.introAt(shot, t)` houdt een beeld vast voor screenshots.

## De drie ondertitels (letterlijk)
1. Waar je bent: "Leeuwarden, aan het Nieuwe Kanaal. Hier maakt Royal Koopmans dag en nacht bloem van tarwe, voor bakkers en de voedingsindustrie."
2. De maaltoren: "Graan komt per schip aan. De reiniging haalt er stenen en metaal uit. Dan gaan de korrels in de maaltoren tussen de walsen door, steeds fijner, tot er bloem is."
3. Naar binnen: "Jij bent één van die korrels. Je valt eerst terug naar het begin: 1846, Holwerd, waar bakkersgezel Uilke Klazes Koopmans begon met een rosmolen, gedraaid door paarden."

Bronnen: Nieuwe Kanaal en De Merodestraat, graan per schip aan de loskade, reiniging haalt stenen en metaal eruit, volcontinue ploegendienst (dag en nacht), 1846 met een door paarden aangedreven rosmolen in Holwerd en bakkersgezel Uilke Klazes Koopmans (onderzoek, FACTS, STORIES en de introband van molen 1).

## Gemeten framerate (400x800, Chromium headless, CPU-throttling 4x via CDP)
- Telefoon met dpr 2: tijdens de camerabeweging van shot 1 circa 41 fps, van shot 2 circa 45 fps, van shot 3 en op het eindbeeld 60 fps. De canvasresolutie zakt hier automatisch naar 1. Ter vergelijking: het spel zelf haalt in dezelfde omstandigheden circa 50 fps, ook op dpr 1.
- Telefoon met dpr 1: shot 1 circa 45 tot 50 fps, shot 2 en 3 60 fps.
- Zonder throttling: overal 60 fps.
- Het openen van de intro kost met 4x throttling circa 140 ms (zonder throttling circa 35 ms), omdat de stadsbeelden al klaarstaan.
- Bekende beperking: met 4x throttling hapert de eerste seconde van shot 1 één keer, als de resolutie zakt (één frame van 130 tot 230 ms). Op een snelle telefoon gebeurt dat niet.

## Testuitslag
- harness.js: telefoon en desktop started, gameOver en restarted zijn alle drie waar, zonder fouten. Contract: het bestand begint met `<title>` en bevat geen doctype, html, head of body (428.581 bytes). Aangepast: na de klik op de startknop klikt de harness op "Overslaan" als de intro in beeld staat.
- tests/nieuwkomer.js: 37 van 37 goed. Nieuw:
  - de intro verschijnt bij lege opslag;
  - Verder tijdens de camerabeweging springt naar het eindbeeld en gaat niet meteen door;
  - de nieuwkomer kijkt shot 1 en 2 met Verder, en op shot 3 heet de knop "It giet oan!";
  - Overslaan staat in elk shot in beeld (rechtsboven en onder Verder);
  - het paneel past zonder scrollen en er is geen horizontale scroll;
  - na "It giet oan!" is de intro dicht, staat introSeen opgeslagen en loopt er geen animatielus meer (de framecount staat stil);
  - na een game-over en Nog een korrel? komt de intro niet terug;
  - Bekijk de intro opnieuw werkt, en Terug naar het menu brengt je naar de titel;
  - na herladen start "It giet oan!" meteen molen 1;
  - de intro past op 360x640 met 419 px beeld boven het paneel.
- Eigen test intro-test/b/extra.js: 21 van 21 goed:
  - focus bij laden niet gepakt;
  - Enter, pijltje rechts, spatie en Esc werken;
  - na herladen met alleen introSeen komt de intro niet terug;
  - een bestaande speler, Kies een molen en de Nachtploeg krijgen geen intro;
  - verminderde beweging geeft eindbeelden zonder lus;
  - geluid aan geeft geen fouten;
  - een tik op het beeld werkt als Verder;
  - formaat wijzigen tijdens de intro gaat goed.
- Screenshots van elk shot (begin, halverwege en eindbeeld) op 360x640 licht, 400x800 donker en 1280x800 licht staan in /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/intro-test/shots-intro/. De nieuwkomer-screenshots staan in intro-test/nieuwkomer-b/. Alles bekeken: het logo is leesbaar vanaf shot 1, de toren en het logo staan steeds boven het paneel en het werkt in licht en donker.
- Scripts in /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/intro-test/b/: frames.js (vaste beelden), extra.js, fps.js en open.js.
