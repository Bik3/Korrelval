# Verslag intro-bouwer, mooimaakronde

Werkbestand: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/intro/korrelval.html` (485 kB, was 433 kB; alleen code, geen plaatjes). Alles zit in het introgedeelte: van de `// =====`-regel boven `// 11b. Intro: van buiten` tot en met `iCv.addEventListener('click', introNext)` (551 regels werden 1108). CSS, HTML, `drawGrain` en de ondertitels zijn niet veranderd.

## Wat je ziet

- **Shot 1**: je staat laag in een tarweveld onder een Hollandse wolkenlucht. Vooraan staan klaprozen en paarse phacelia. De aren wiegen in de wind en er rollen windvlagen over het veld. Eerst stijg je op boven de aren, dan glijd je over het veld naar de fabriek aan het Nieuwe Kanaal. Ver weg wordt alles vager (luchtperspectief). Van boven zie je rijsporen, lichtere en donkerdere plekken en overdag een paar wolkschaduwen. Op het water zie je weerspiegelingen van de toren en het logo, rimpels en glinsteringen. Het schip deint en de meeuwen slaan af en toe met hun vleugels.
  - Licht: een lage zon links geeft strijklicht.
  - Donker: avond met een warme gloed, sterren en een maansikkel. De ramen zijn verlicht en het logo is zacht aangelicht.
- **Shot 2**: de oever schuift weg. Het graan loopt als gouden stroom met glinsteringen over de band en bij de silo's dwarrelt stof.
- **Shot 3**: door het raam valt warm licht in bundels met meelstof naar binnen. De walsen draaien, met ribbels zoals in het spel, en er branden ledlampjes. De korrel kijkt rond en knippert.
- **It giet oan!**: de duik gaat langs verdiepingen die voorbijflitsen, met snelheidsstrepen. Daarna wordt het donker en gaat molen 1 zacht open (0,6 s). De jaarteller loopt van 2026 naar 1846.
- **Overgangen**: zachter in- en uitlopen (`ixEase`). Bij Verder tijdens een beweging en bij pijltje links vloeit het oude beeld in 0,32 s over het eindbeeld, dus zonder harde knip.

## Per functie

- **Nieuw: akker en lucht**
  - `ixStartCam` en `iCamAt` (shot 1): het oog begint op aarhoogte. Na 0,3 s stilstand stijg je vanaf 0,4 s (`IX_T0`) en vanaf 1,1 s (`IX_T1`) glijd je naar de fabriek.
  - `ixFieldSprites`, `ixPol`, `ixDrawEar` en `ixBand` maken de plaatjes van de akker. De aar is getekend zoals in de huisstijl: schuine blaadjes als wigjes.
  - `ixNative` maakt kopieën op ware grootte voor het begin.
  - `ixRows`, `ixField`, `ixFieldMid`, `ixMassCol`, `ixRun`, `ixFieldCover` en `ixDense` tekenen de akker.
  - `ixSky` en `ixSkyDraw` tekenen de lucht. De wolken drijven over één tijdlijn door de drie shots, dus ze verspringen nergens.
  - `ixHaze` en `ixMixC` geven de waas.
- **Nieuw: buiten**
  - `ixLower`: water, schip, oever en akker. Dit was eerst een deel van `iOutside`.
  - `ixDust`: het stof bij de silo's.
  - `ixFx`: de gloed achter het logo.
- **Nieuw: binnen**
  - `ixBeams` en `IX_BEAMS`: de lichtbundels.
  - `ixMotes`: het meelstof.
  - `ixRibs` en `ixRollTicks`: de draaiende walsen.
  - `ixStreaks`: de snelheidsstrepen bij de duik.
  - `ixShaftLive`: wat nog beweegt boven op het bewaarde eindbeeld.
- **Nieuw: tekenen en overgangen**
  - `ixPaint`: het tekenen per frame, uit `introDraw` gehaald.
  - `ixSnap` en `ixXfade`: het overvloeien.
- **Aangepast**
  - `ICOL`: kleuren voor akker, bloemen en avond.
  - `introGeo`: oever, meeuwen, stof en de graanstroom.
  - `iCloud`: stapelwolken met een lichte bovenkant.
  - `iLayer`: waas, deinen en het weglaten van wat onder de akker valt.
  - `iDots`: gloed, korrels en glinsteringen.
  - `iGulls`: vleugelslag en dan zweven.
  - `iShaft` en `iShaftGrain`.
  - `introImgs`: waas over stad en buurt. Zakt de resolutie, dan wordt het plaatje verkleind in plaats van opnieuw getekend.
  - `introCaches` en `introStop`: de nieuwe caches maken en vrijgeven.
  - `introWarm`: zet de akker al klaar op het titelscherm.
  - `introLayout`: `IN.hv`. Onder een dicht paneel wordt niets getekend.
  - `introDraw`: knipt het beeld af op `IN.hv`.
  - `introFrame` en `openIntro`: de lichte stand `IN.lite`, zie hieronder.
  - `introNext` en `introPrev`: overvloeien.
  - `introGo`: de sluier verdwijnt in 0,6 s in plaats van 0,45 s.
- **Teksten**
  - De ondertitels zijn gelijk gebleven.
  - De beeldbeschrijving `desc` (in `#introDesc`) van shot 1 en 3 beschrijft nu het nieuwe beeld: het tarweveld met klaprozen en phacelia, de draaiende walsen en het warme licht.
  - Shot 1 duurt 5,6 s, was 4,8 s. Shot 2 en 3 duren 5 en 4,6 s, zoals eerst.

## Nieuwe namen

Er zijn 48 nieuwe namen. Ze beginnen allemaal met `ix` of `IX_`. Er is geen naam weggehaald.

- Constanten: `IX_G`, `IX_TOP`, `IX_HB`, `IX_SW`, `IX_XF`, `IX_T0`, `IX_T1`, `IX_ROWS`, `IX_NC`, `IX_MC`, `IX_HC`, `IX_TRACK`, `IX_FGSKIP`, `IX_RIM` en `IX_BEAMS`.
- Functies: `ixEase`, `ixA`, `ixSky`, `ixDrawEar`, `ixPol`, `ixBand`, `ixFieldSprites`, `ixNative`, `ixRows`, `ixDense`, `ixFieldCover`, `ixFieldHz`, `ixRGB`, `ixMassCol`, `ixField`, `ixRun`, `ixFieldMid`, `ixSkyDraw`, `ixFx`, `ixStartCam`, `ixHaze`, `ixMixC`, `ixDust`, `ixLower`, `ixRollTicks`, `ixRibs`, `ixBeams`, `ixMotes`, `ixStreaks`, `ixShaftLive`, `ixPaint`, `ixSnap` en `ixXfade`.
- Nieuwe velden in `IN`: `field`, `fn`, `DS`, `xf`, `xfT`, `fx`, `hv`, `skyH`, `skyD`, `skyKey`, `lite`, `bg` en `part`.

## Wat hetzelfde bleef

- Verder tijdens een beweging gaat eerst naar het eindbeeld.
- Overslaan, Esc, de pijltjes en de bescherming tegen een dubbeltik werken zoals eerst.
- Bij verminderde beweging zie je alleen eindbeelden, zonder lus.
- De aria-live-tekst en `#introDesc` blijven.
- De testhaken `introAt` en `intro()` werken.
- Na de intro start molen 1 met de jaarteller.
- Op 360x640 staan toren en logo boven het paneel.

## Snelheid

Alles wat stilstaat, staat op een offscreen-canvas:

- de lucht als één plaatje;
- stad en buurt;
- de akker als plaatjes, bij de start op ware grootte zodat tekenen een kopie is;
- de eindbeelden;
- het begin van shot 1 (alles behalve akker, meeuwen en graankorrels), opnieuw zodra iets meer dan 0,4 px verschuift.

Geen `filter` en geen blur per frame. Verlopen en grote patronen staan vooraf in plaatjes. Onder het dichte paneel wordt niet getekend.

Op een echt trage telefoon gaat de resolutie eerst naar 1, net als eerst, na 12 frames. Is het daarna nog steeds gemiddeld boven 24 ms per frame, dan gaat de lichte stand aan (`IN.lite`). Dan zijn er minder pollen en stroken aren. Plekken, wolkschaduwen, windvlagen, glinsteringen en stof vallen weg, en de lichtbundels in shot 3 hebben twee treden in plaats van vier. Bij 1x en 4x CPU gebeurt dat niet, bij 8x wel.

**fps** op 400x800, dpr 2, licht, CPU 4x vertraagd (`Emulation.setCPUThrottlingRate`). Oud (`base.html`) en de eindversie zijn om en om gemeten, 3 rondes, mediaan met de spreiding tussen haakjes:

| | oud | nieuw |
|---|---|---|
| shot 1 | 53,7 (53,6 tot 57,0) | 54,8 (53,6 tot 55,6) |
| shot 2 | 59,8 | 60,0 |
| shot 3 | 60,0 | 60,0 |
| eindbeeld shot 3 | 60,0 | 60,0 |
| duik | 60,0 | 60,0 |

- Twee eerdere reeksen van 4 en 5 rondes, met een iets oudere versie, gaven hetzelfde beeld: shot 1 55,6 tegen 55,5 en 56,1 tegen 55,8, en de rest 60.
- In de opdracht stond 41, 45 en 60 fps voor de oude intro. Met mijn script (eerst 1,5 s titelscherm, dan It giet oan!) haalt de oude intro hier meer. Daarom heb ik oud en nieuw steeds om en om gemeten, met hetzelfde script.
- Het langste frame in shot 1 is langer: 133 tot 233 ms, tegen 83 tot 133 ms eerst. Dat is de val naar resolutie 1, zie de aandachtspunten.

Ter controle ook bij 8x (3 rondes, eindversie):

| | oud | nieuw |
|---|---|---|
| shot 1 | 48,6 | 42,9 |
| shot 2 | 47,4 | 50,3 |
| shot 3 | 51,7 | 46,1 |
| duik | 37,9 | 37,8 |

Op zo'n heel trage telefoon zijn shot 1 en shot 3 dus trager, ook met de lichte stand. Shot 2 is sneller en de duik is gelijk.

**CPU-tijd per frame** (hoofdthread, zonder vertraging, 400x800, dpr 1, mediaan van 3 rondes, in ms):

| | oud | nieuw |
|---|---|---|
| shot 1 | 2,65 | 3,01 |
| shot 2 | 2,59 | 2,55 |
| shot 3 | 2,59 | 2,62 |
| eindbeeld shot 3 | 1,54 | 1,72 |
| duik | 3,02 | 3,14 |

Shot 1 per stuk van 0,4 s:

- De start kost minder dan eerst (1,9 tot 2,3 ms tegen 2,3 tot 2,6 ms), door de bewaarde achtergrond.
- In de glijvlucht (ongeveer 0,8 tot 2,4 s) kost het 0,7 tot 1 ms per frame meer: dan schuift de grote akker onder je door en moet hij geschaald getekend worden. Bij 4x past dat nog in een frame van 60 fps.
- Daarna kost het evenveel als eerst.

Shot 2 en 3 kosten ongeveer evenveel als eerst. De duik en het eindbeeld van shot 3 kosten 0,1 tot 0,2 ms meer, omdat de walsen draaien en het stof dwarrelt.

Een duurdere variant met fijne zaairijen in het veld heb ik weer weggehaald: die kostte 2,5 tot 3,5 ms per frame.

## Tests

- **harness.js**: op telefoon en desktop zijn started, gameOver en restarted true, zonder errors. Het bestand begint met `<title>`.
- **nieuwkomer.js**: 37 van 37. De test is niet aangepast.
- **Eigen tests** (scripts in `mooi/intro/`):
  - `reduced.js`: verminderde beweging, overvloeien, pijltje links en Esc, 20 van 20.
  - `duik.js`: duik en overgangen met een nepklok, zonder fouten.
  - Overgang shot 1 naar 2 en shot 2 naar 3: het beeld boven het paneel springt niet.
- **Proef-samenvoeging** (`git merge-file`) met `mooi/merge/m-ui-spel.html` tegen `base.html`: 0 conflicten. Op het resultaat haalt harness.js alles en nieuwkomer.js 37 van 37.

## Screenshots

Per shot: begin, 25, 50 en 75 procent en het eindbeeld, plus de duik. Gemaakt op 360x640 licht, 400x800 donker en 1280x800 licht en donker.

- Voor: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/intro/voor`
- Na: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/intro/na-final`, met `sheet-*.png` als overzicht per formaat. De duik en de overgangen met nepklok staan in `na-final/duik-b` en `na-final/duik-c`.

## Regels buiten mijn gebied

Geen. Een diff tegen `base.html` geeft alleen verschillen binnen het introgedeelte.

## Aandachtspunten

- De start van de glijvlucht in shot 1 is het zwaarste moment van de intro. Op een trage telefoon kan daar een enkel frame wegvallen.
- Gaat de resolutie omlaag, dan worden lucht, stad en akker opnieuw opgebouwd. Dat geeft een hapering van ongeveer 0,1 s meer dan eerst (bij 4x). Dat gebeurt in de stilstaande start van shot 1, dus je ziet alleen de aren even stilstaan. Op een echt trage telefoon meet het titelscherm meestal al dat hij traag is. Dan opent de intro meteen op resolutie 1 en is er geen hapering. In de meting komt de vertraging pas vlak voor It giet oan!, dus daar zit hij wel in.
- Op een heel trage telefoon (8x) zijn shot 1 en 3 een paar fps trager dan eerst, zie de tabel.
