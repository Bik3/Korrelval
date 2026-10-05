# Fixverslag 3: molenstenen en walsen zonder zaagbladen

Bestand: korrelval-b.html (aangepast). Back-up van de vorige versie: korrelval-b.v3.html.
Eindstand: 1871 regels (wc -l), 131.960 bytes. Was 1797 regels en 123.623 bytes.

## Wat er veranderd is

### Taak 1: stenen en walsen opnieuw getekend (gedaan)

Een speltester zei dat de korrel "in zaagbladen valt". De grijze schijven met tanden en groeven zijn weg. Alleen het tekenen is veranderd: de botscirkels (straal 50 voor stenen, 40 voor walsen), de kastblokken en alle spelregels zijn niet aangeraakt. `drawRoll` roept nu `drawStone` of `drawWals` aan.

Molenstenen (1846 en 1867): elke steen is nu een dikke zandstenen schijf, een beetje van opzij gezien. Je ziet een rond bovenvlak in #B8A98C met lichte glans linksboven, een platte rand in #8E7F63 met schaduw aan de zijkanten, en een naad halverwege de rand (loper op ligger). Op het bovenvlak staan twaalf korte, vage gebogen scherpselgroeven, alleen bij de rand. Die draaien langzaam mee. In het midden zit een donkere ijzeren steenbus met een lichte ring en een iets donkerder oog eromheen. Tanden zijn er niet meer. Het silhouet is zo gekozen dat het de botscirkel helemaal omsluit (bovenvlak-ellips plus rand, a + b = R). Het raakt de cirkel precies op spleethoogte en aan de boven- en onderkant. De spleet die je ziet is dus precies de echte spleet. Op de schouders is de tekening hooguit een paar pixels ruimer dan de botscirkel, en dat is in het voordeel van de speler. De 1856-grap (de korrel die op de derde steen stuitert) komt nog steeds netjes op het bovenvlak neer. Het optionele houten kader heb ik weggelaten: het kastblok achter de steen doet die rol al, en een extra lijn maakt de rand van de spleet minder scherp.

Walsen (1920 en later): gladde stalen walsen met een cilinderverloop, donker aan de zijkanten met een verticale lichtband links van het midden. De kleur hangt af van het tijdperk. 1920 is iets warmer en doffer gietijzer, 1976 is staal #B0B7BF, 2008 is koeler staal en Molen B glimt het meest. Molen B heeft ook een scherpe witte glanslijn en een randje cyaan schachtlicht. Elke wals heeft een donkere omtrek van 2 px, zodat de randen scherp afsteken tegen de schacht en de spleet goed zichtbaar blijft. Ribbels zie je alleen als fijne, vage verticale lijnen in de wals. Ze schuiven langzaam mee, links en rechts tegen elkaar in (zo blijft het tegendraaien zichtbaar), en vervagen naar de randen toe. In 1920 zijn ze grover en iets duidelijker, in 1976 en 2008 fijner. Molen B heeft gladde walsen zonder lijnen. De Nachtploeg (ribs 6) krijgt de glimmende Molen B-walsen met zes vage lijnen.

Snelheid: geen shadowBlur. De kleurverlopen worden per soort en tijdperk één keer gemaakt en daarna hergebruikt (ROLL_GRAD). Alles is getekend met code, er zijn geen plaatjes gebruikt.

### Taak 2: tijdperkplaatje in de introband (gedaan, iets kleiner dan gevraagd)

Links van de jaarteller staat nu een klein plaatje (`drawEraVignette`), elk tussen de 8 en 12 regels:
- 1846: rosmolen. Een liggend goudkleurig kamwiel op een spil, met een paard (romp, kop, hals, benen en staart) dat aan de trekboom rondloopt. Als het paard achter de spil loopt, wordt het ook achter de spil getekend.
- 1867: bakstenen schoorsteen met voegen en drie stoompluimen die opstijgen en vervagen, met daarnaast het fabrieksgebouw met verlichte ramen.
- 1920, 1976 en 2008: een schip aan de kade met een zuigtoren. De zuigbuis gaat het ruim in en er gaan korrels omhoog.
- Molen B (en de Nachtploeg): een oranje kraan die een glimmende wals langzaam door de opening in het dak laat zakken.

Het plaatje is 46 px hoog in plaats van ongeveer 56 px. Hoger past niet: tussen de goudlijn bovenaan de band en de titel in handschrift (met lange letters zoals de S van Stoommeelfabriek en de N van N.V.) zit maar zo'n 50 px. Met 46 px blijft er duidelijk ruimte over boven de titel. Het plaatje staat ook in een eigen kader (clip), dus de stoom komt nooit over de bandrand. Bij verminderde beweging (prefers-reduced-motion) staat het plaatje stil.

## Hoe getest

1. Het script tussen `<script>` en `</script>` uitgepakt naar fix3/extracted.js en gecontroleerd met `node --check`: geen fouten.
2. harness.js met uitvoer naar shots-fix3: telefoon en desktop allebei started, gameOver en restarted true. De enige fout is het bekende certificaatprobleem van Google Fonts (ERR_CERT_AUTHORITY_INVALID).
3. Een eigen script (fix3/shots.js) zet een testhook in de pagina (`window.__kvDbg` met startCampaign/startNight), zet `window.__kvAuto` (automatische besturing) aan, start elk level, maakt een foto van de wachtende introband, drukt op spatie en wacht tot er een steen of wals midden in beeld staat. Daarna maakt het een foto op 400x800 en een uitvergrote foto (dpr 2) van die verdieping. Dat is gedaan voor alle zes levels en de Nachtploeg. Er waren geen pagina- of consolefouten, en de automatische besturing raakte niets (hits 0). De foto's staan in shots-fix3-mine.
4. Alle foto's bekeken. Level 1 en 2 tonen zandstenen schijven zonder tanden, met een duidelijke spleet tegen zowel de houten als de bakstenen wand. Level 3 tot 5 tonen stalen walsen met vage ribbellijnen. Level 6 en de Nachtploeg tonen glimmende gladde walsen met een scherpe rand tegen de donkere schacht. Twee dingen heb ik na het bekijken nog verbeterd: in de eerste versie raakten de plaatjes bijna de titel (eerst 50 px, toen verkleind naar 46 px en de schoorsteen lager gezet), en het paard was te klein om als paard te herkennen (nu groter, met kop en staart).

## Wat niet gedaan is

- Het optionele houten kader om de molensteen is weggelaten (zie boven).
- Het plaatje is 46 px hoog in plaats van 56 px, omdat het anders over de titel zou vallen.
- De walsicoontjes op de titelpagina en in de HUD-procesbalk zijn niet aangepast. Die vielen buiten deze opdracht.
- Spelregels, botsingen, CONFIG en de levelgegevens zijn niet aangeraakt.
