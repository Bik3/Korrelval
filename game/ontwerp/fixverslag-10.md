# Fixverslag 10

## Ronde 2

Back-up van de vorige versie: korrelval-b.v19.html.

### Wat is aangepast
1. Shot 3 "Naar binnen" (midden), functie iShaft:
   - Het zwarte vlak onder het verdwijnpunt is weg. Daar loopt nu de wand door (#2C2E31).
   - De balken van de vloeren staan ook onder het verdwijnpunt, gespiegeld en samengedrukt: y2 = vy + (vy - y) * 0.4, met de dikte maal 0,4 en dezelfde f.slab-kleur.
   - Daaroverheen ligt een zacht verloop naar onder, van doorzichtig bij vy naar rgba(18,19,20,.55) op 150*u px. Onder dat punt blijft dezelfde lichte schaduw.
   - Er loopt geen harde rand meer door het beeld. In het eindbeeld zit naast het paneel geen donkere strook meer. Dat is bekeken op 400x800, 1280x800, 1024x700 en 360x640.
2. Dubbelklik slaat geen camerabeweging meer over (midden):
   - introNext zet na introShot(IN.i + 1) ook IN.tEnd = performance.now().
   - Een tweede druk binnen 350 ms telt dan niet. Dat geldt voor muis, touch en Enter.
3. Scrolltoetsen in een iframe (laag):
   - De keydown-handler zondert alleen nog spatie op een knop uit.
   - Pijltjes, PageUp/PageDown, Home en End scrollen de gastpagina niet meer, ook niet als Verder de focus heeft.
   - Spatie en Enter op Verder werken gewoon.
4. Korrel bij verminderde beweging (laag):
   - Bij blink staat nu !reduced.matches vooraan.
   - In het stilstaande eindbeeld van shot 3 heeft de korrel de ogen open en kijkt hij je aan.

Er zijn geen teksten veranderd.

### Testuitslagen
- node --check op het script: goed. Het bestand begint met `<title>` en bevat geen doctype, html, head of body.
- harness.js (intro-test/ronde2/harness): op telefoon en desktop zijn started, gameOver en restarted true, zonder fouten.
- tests/nieuwkomer.js (intro-test/ronde2/nieuwkomer): 37 van 37 goed, zonder console-fouten en zonder requests naar buiten.
- Eigen test intro-test/ronde2/check.js: 15 van 15 goed.
  - Dubbelklik, dubbeltik en twee keer Enter na het eindbeeld van shot 1 en van shot 2. Het volgende shot begint telkens vooraan (t < 0,4) en de camera beweegt.
  - In een iframe van 960x600 op een lange gastpagina, met de focus op Verder: ArrowDown, PageDown, End, ArrowUp en Home laten scrollY op 10 staan. Spatie gaat naar het volgende shot zonder te scrollen.
  - Enter op Verder werkt nog.
  - Bij verminderde beweging start It giet oan! molen 1.
  - Geen fouten in de console.
- Screenshots bekeken met de Read-tool:
  - shot 3 op t = 1,1, 1,3, 1,6, 2,0, 2,5 en het eindbeeld (4,6), op 400x800 donker en 1280x800 licht. De vellen staan in intro-test/ronde2/out/sheet-400x800.png en sheet-1280x800.png.
  - dezelfde tijden op 360x640 licht (sheet-360x640.png);
  - het eindbeeld op 1024x700 (s3-1024x700-light-t4.6.png);
  - shot 3 bij verminderde beweging (reduced-shot3.png).
