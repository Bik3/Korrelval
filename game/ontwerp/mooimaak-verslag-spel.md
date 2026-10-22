# Verslag spel-bouwer (mooimaakronde)

Werkbestand: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/spel/korrelval.html`. De grootte ging van 433 naar 509 kB; de extra 76 kB is code, er zitten geen plaatjes in.

## Gebouwd als
- **Bronbestanden:** al mijn code staat in `spel/gx/src/`.
- **Bouwscript:** `spel/gx/build.py` maakt het bestand uit `base.html`. Elke vervangen functie staat op zijn oude plek. Het nieuwe gx-blok staat vlak voor `render()`.

## Wat er veranderde, per functie
24 functies, allemaal uit mijn lijst.

**Achterwand en zijwanden**
- **render:**
  - Nieuwe volgorde: achterwand (parallax 0,42), stofjes, zijwanden, vignet (alleen over de wanden), vloeren met schaduw, spoor, en een zachte schaduwvlek onder pick-ups en gevaren.
  - De schok na een botsing is nu gedempt en vooral verticaal, en de rand is in de wandkleur in plaats van zwart. Bij verminderde beweging is er geen schok; dat regelt hurt() al.
- **getTile:** per tijdperk één achterwand van 300 x 960 px.
  - Licht en lichtplekken voor de stofjes zitten erin getekend. Alleen het tijdperk van nu blijft in het geheugen.
  - Bij de bouw maakt gxWarm in hetzelfde frame ook alle andere plaatjes van dat tijdperk. Dan komen er geen trage frames na, die de resolutie omlaag zouden zetten.
- **drawTiles:** kale kopie op hele schermpixels, met de periode uit de tegel.
- **drawWalls:** de zijwanden per tijdperk als strook die 1:1 met de vloeren meeschuift.
- **drawSteam:** zachte stoomwolkjes in plaats van harde rondjes.
- **vignette:** het verloop wordt één keer per kleur gemaakt; de sterkte komt via globalAlpha.

Per tijdperk:
- **1846:** planken met daglicht door de spleten, zonnestralen, een luikje, zachte balken met stro, schoren en de houten spil van de rosmolen.
- **1867:** baksteen, rondboogramen, gietijzeren kolommen, een stoombuis met afsluiter, drijfriemen en gaslampen.
- **1920:** groene tegels, pleisterwerk, meelpijpen en gloeilampen onder een emaillen kap.
- **1976:** bruine panelen, een band in jaren-70-kleuren, TL-buizen, pneumatische buizen en een leuning.
- **2008:** staal en glas, X-schoren, RVS-pijpen en koele lichtpanelen.
- **Molen B:** kabelgoten, schakelkasten met schermpjes in zacht licht, ledjes, RVS-buizen en een oranje lijn.
- **Nachtploeg:** hetzelfde als Molen B, plus ramen met nachtlucht, maan en stadslichtjes.

Voor alle tijdperken geldt:
- Geen walsen of plansichters vóór 1920.
- De structuur is vooral verticaal; horizontale delen zijn dun en zacht, zodat niets op een vloer, wals of gevaar lijkt.
- Niets in de achtergrond beweegt behalve de stofjes. Die zijn klein, zitten alleen in het licht en staan stil bij verminderde beweging.

**Vloeren**
- **drawFloor, drawPlate:** vloerbalken en platen per tijdperk als strook, met de schaduw op de achterwand erin. Elke verdieping krijgt een eigen uitsnede. De gaatjes van de plansichter schudden mee.
- **drawRoll:** het stilstaande deel (met schaduw) is een kale kopie; de draaiende delen komen erbovenop.
- **drawWals:** groeven in het vlak en een as met spie draaien zichtbaar, ook bij gladde walsen. De linker wals draait met de klok mee, de rechter ertegenin.
- **drawStone:** de loper draait: streepjes op de rand en scherpselgroeven in tien harpen.
- **drawChute:** een houten koker met ijzeren banden (1846 en 1867), daarna een metalen zuigbuis.
- **drawSilo:** silo's met ronde schaduw, hoepels en een kegel met glans, en een nettere bulkwagen.

**Korrel**
- **drawGrain:**
  - Squash & stretch bij een stoot: eerst plat, dan even uitgerekt, dan terug. Bij verminderde beweging één zachte deuk.
  - Een glimlichtje, en in het spel een zachte gloed met schaduw achter de korrel.
  - De intro-aanroep `drawGrain(x, y, g, st)` werkt ongewijzigd.
- **drawParticles:**
  - Bij een perfecte passage een gouden glansring met een gloed ('glow') en een zacht meelwolkje ('mist').
  - Het meelwolkje in de silo is zacht in plaats van harde rondjes.
- **update (alleen beeld):** spoor bijhouden (gxTrailStep), effect bij een perfecte passage (gxPerfectFx) en minder losse stofkorrels (0,2 in plaats van 0,45 per stap). Sturen en moeilijkheid zijn niet veranderd.

**HUD, labels, band en plaatjes**
- **drawHUD:** zelfde informatie en maten, met een zachte achtergrond en een gouden lijn. Ringen om de procesiconen, een oranje gloed achter het actieve icoon en korrels met een glimlichtje.
- **drawLabels:** een zachte schaduw onder het pilletje.
- **drawIntro, drawIntroNew:** panelen in kaartstijl (afgeronde hoeken, schaduw, gouden bovenrand), een telwerk met naad, ringen om de iconen en een startstrook binnen de ronding. De indeling is gelijk gebleven.
- **drawEraVignette** (aanroep onveranderd): plaatjes in intro-stijl met een eigen lucht.
  - 1846: de rosmolen onder een rieten kap, met een lopend paard.
  - 1867: de stoommeelfabriek aan het water bij avondlicht.
  - 1920, 1976 en 2008: het schip aan de loskade, in de kleuren van zijn tijd.
  - Molen B: de kraan met de wals door het dak.
  - Nachtploeg: de molen bij nacht.
- **drawBriefArt:** het nachtplaatje vult het tegeltje.
- **drawStoryArt:** de code is ongewijzigd en toont vanzelf het nieuwe plaatje.
- **bookCanvas:** donkere cirkel met een zacht verloop en een gouden rand.

**Merkkader (buildLetterbox en #lb)**
- Een warme achtergrond voor het lichte en het donkere thema, met een eigen korenaarpatroon op ongeveer 6% en een zachte schaduw rond het veld.
- **Links:** een tijdlijn met oranje stippen met gloed en jaartallen in La Belle Aurore; de huidige molen is uitgelicht.
  - In de Nachtploeg staan er de vijf zones, met de huidige uitgelicht.
  - Is de rand smaller dan 200 px, dan alleen stippen en jaartallen; onder de 110 px niets.
- **Rechts:** het tijdperkplaatje groot met zachte randen, met de naam eronder. Op het titelscherm staat er een waaier van drie korenaren als lijntekening.
- **Opnieuw tekenen:** bij een ander tijdperk of een andere zone alleen de zijpanelen. Bij een ander formaat, thema of geladen lettertype het hele kader.
- Getest op 1280x800, 1024x700, 1920x1080 en de telefoon.

## Nieuwe namen
Alle nieuwe namen beginnen met gx.
- **Constanten en toestand:** gxP, gxPS, gxPar, gxBW, gxSt, gxSH, gxTL, gxTR, gxBG, gxSIDE, gxVIG.
- **Hulpjes:** gxDark, gxTheme, gxCv, gxRgb, gxRgba, gxGlow, gxRR, gxWrap, gxBeam, gxRay, gxHaze, gxEra, gxDot, gxShadowBand, gxPipe.
- **Achterwanden en zijwanden:** gxDigi, gxBgShade, gxSideDigi, gxSides, gxMotesIn, gxMotesDraw.
- **Vloeren en sprites:** gxSlab, gxPlate, gxRollShadow, gxRollSpr, gxStoneSpr, gxShade, gxGrainHalo, gxVigSpr, gxWarm, gxBlit, gxBlitPart, gxVignette.
- **Korrel:** gxTrailDraw, gxTrailStep, gxPerfectFx.
- **Panelen en plaatjes:** gxHudBg, gxPanel, gxQuay.
- **Merkkader:** gxEar, gxEarTile, gxTimeline, gxLbKey, gxLbFill, gxLbPanels, gxEraPanel, gxLetterbox.

## Testuitslag
- **harness.js:** telefoon en desktop allebei started, gameOver en restarted true, geen errors. Het contract klopt (begint met `<title>`, geen verboden tags, dezelfde hosts als base).
- **nieuwkomer.js:** 37 van 37.
- **Proefmerge:** met `git merge-file` tegen de huidige werkbestanden van de UI- en intro-bouwer, beide en samen: 0 conflicten. Op de samengevoegde versie gaf nieuwkomer.js ook 37 van 37.
- **Screenshots:**
  - `spel/na-shots/` is gemaakt met dezelfde kijk.js als `nu/shots/`.
  - `spel/na-shots/extra/` bevat per molen en de Nachtploeg de introband, het spelen bij t ≈ 4 s en een moment met een gevaar in beeld. Formaten: 400x800 licht, 1280x800 donker, 1024x700 donker en 1920x1080 licht.
  - Ook bekeken: verhaalkaart, dienstbriefje, Molenboek, silo, waterpauze, verminderde beweging en 360x640.
  - Gevaren, spleten en pick-ups zijn in elk tijdperk minstens zo goed te zien als voorheen. Gevaren en pick-ups hebben er een zachte schaduwvlek bij gekregen.

## fps voor en na
Gemeten op 400x800 met CDP Emulation.setCPUThrottlingRate 4. Voor en na liepen afwisselend; de waarden zijn medianen.

| Molen | dpr 2, voor | dpr 2, na | dpr 1, voor | dpr 1, na |
|---|---|---|---|---|
| Molen 1 (1846) | 51,6 | 51,5 | 60 | 60 |
| Molen 3 (1920) | 58,1 | 59,7 | 60 | 60 |
| Molen 6 (Molen B) | 59,7 | 59,5 | 60 | 60 |
| Nachtploeg | 58,2 | 59,8 | 60 | 59,6 |

- **Meetopzet:** dpr 2 met 10 runs per versie, dpr 1 met 3 runs. Op dpr 2 zakt de resolutie in beide versies automatisch naar 1,25.
- **CPU-tijd per frame op dpr 2:**
  - Lager in molen 1 (18,5 naar 17,1 ms), molen 3 (12,4 naar 11,3 ms) en de Nachtploeg (14,7 naar 11,6 ms).
  - Iets hoger in Molen B (10,7 naar 11,4 ms).
- **Molen 1** schommelt in beide versies sterk (48 tot 60 fps).
- **Zo bleef het snel:** alles wat stilstaat wordt kaal gekopieerd op hele schermpixels, de schaduwen zitten in de plaatjes, er zijn geen verlopen of blur per frame, en alle plaatjes van een tijdperk worden in één frame gebouwd.
- **Scripts:** `spel/gx/fps.js`, `spel/gx/ablate.js` en `spel/gx/spike.js`.

## Regels buiten mijn gebied
Geen.
- Er zijn geen CSS, HTML, DOM-functies, intro-functies, layout(), frameSample() of gedeelde functies aangeraakt.
- Twee commentaarregels staan direct naast code van de UI-bouwer: boven buildLetterbox (na layout) en boven drawBriefArt (na nightButton). Die zijn ongewijzigd gebleven; mijn toelichting staat eronder, zodat de merge daar niet botst.

**Aandachtspunten voor het samenvoegen**
- getTile geeft nu een object terug (`{ c, P, motes }`). drawTiles en drawWalls hebben andere parameters. Alleen render roept ze aan.
- Het merkkader volgt het thema. Mijn blok luistert daarvoor zelf naar prefers-color-scheme, het attribuut data-theme en het laden van de lettertypen (gxTheme). gxTheme zet `still = false`, net als show() dat doet.
