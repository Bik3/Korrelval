# Fixverslag intro-hersteller

Werkbestand: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/fix/intro/korrelval.html`. Scripts en beelden staan in `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/fix/intro/check/`. Opbouw, teksten en timing van de intro zijn niet veranderd.

## Art 3: wolk bovenin op de telefoon

**Wat ik deed**
- In `ixSky` zijn de wolken van de twee voorste rijen nu hooguit een half scherm breed (`IN.w * 0.5`).
- De voorste rij krijgt een zachte onderkant. Het onderste 30 procent vervaagt naar de lucht (nieuwe parameter `soft` in `iCloud`).
- De volgorde van de toevalsgetallen is gelijk gebleven, dus alle andere wolken staan op dezelfde plek.

**Voor en na**
- Voor: op 400x800 en 390x844 hing bovenin een witte band van ongeveer 100 px over de hele breedte, met een liniaalrechte onderrand. In het donkere thema was dat een bruin blok.
- Na: bovenin staat een gewone stapelwolk met een zachte onderkant, in licht en donker. Zon en maan zijn weer te zien.
- Op de laptop is er weinig verschil. Alleen de voorste wolk linksboven heeft een zachtere onderkant. Het eindbeeld van shot 1 is gelijk.

**Beelden:** `check/art3-wolk.png`, `check/wolk-b.png`, `check/wolk-desk.png` en `check/wolk-s2.png` (shot 2).

## Art 4: akker tijdens de glijvlucht

**Wat ik deed**
- Een patroontegel `ixGrain` van 48x12 css-px met 48 korte schuine aartjes in drie tinten: schaduw, aar en een lichtkant links. De tegel wordt één keer per thema en resolutie gemaakt.
- `ixGrainFill` legt de tegel over de massa van elke verre rij.
  - De tegel zit vast aan de rij, dus hij schuift mee en wordt groter naarmate de rij dichterbij komt.
  - Dekking: 0,44 in licht en 0,34 in donker.
  - Hij komt pas op als de camera boven de aren uitkomt, ongeveer van 1,15 tot 1,6 s. Daarna hangt de dekking af van de kijkhoek en de waas.
  - Vanaf schaal 0,75 tekent het patroon zonder gladmaken. Dat ziet er hetzelfde uit (`check/nn-zoom.png`) en kost ongeveer de helft.
- De vlekken in het donkere thema zijn gehalveerd: van 0,06 en 0,10 naar 0,03 en 0,05.

**Voor en na:** de akker blijft van 1,1 tot 3 s duidelijk een tarweveld. In het donkere thema is het een veld bij avond en geen modder meer.

**Beelden:**
- `check/art4-glide-light.png` en `check/art4-glide-dark.png`
- van dichtbij op dpr 2: `check/glide-d2.png`
- laptop: `check/glide-desk.png` en `check/glide-desk-zoom.png`

**Snelheid** (400x800, dpr 2, oud en nieuw om en om)
- 4x CPU, zoals in de stijlgids:
  - Glijvlucht (1,1 tot 3 s): 14,45 ms per frame werd 13,96 ms, en 57,4 fps werd 58,4 fps (6 rondes).
  - Een andere reeks gaf 58,9 en 57,4 fps. De ruis is ongeveer 2 fps.
  - Met `review-tech/perf.js` (4 rondes): shot 1 ging van 54,0 naar 54,7 fps, de hele intro van 57,5 naar 57,9 fps.
- 1x CPU: de glijvlucht kost 0,4 ms per frame meer (8,48 werd 8,89 ms). Het blijft 60 fps.

## Art 14: phacelia

**Wat ik deed**
- In `ixPol` ('f') heeft elke plant nu twee of drie dunne opgerolde bloeiwijzen, zoals een varenkrul, op een dun stengeltje.
- Aan de buitenkant zitten kleine bloempjes:
  - straal 0,019, was 0,052, dus de krul is ongeveer 60 procent dunner;
  - de krul is ongeveer 30 procent korter;
  - er steken lange bleke meeldraden uit.
- Kleuren:
  - licht lavendelblauw `#9C8FD8`, met lichtere toppen `#C6BCEF`;
  - meeldraden `#ECE8F8`;
  - het donkere thema heeft eigen tinten, met de nieuwe ICOL-sleutel `phacSt`.
- De bollige schaduw-, lijf- en lichtlagen die op segmenten leken, zijn weg.

**Voor en na:** geen rupsen meer, maar dunne krullen met een zachte rand van meeldraden. De bloemrand op de laptop is rustiger.

**Beelden:** `check/art14-phacelia.png`, `check/phac-zoom.png` en `check/phac-desk.png`.

## Techniek 1: openen

Ik heb het voorstel uitgevoerd, in drie delen.

**1. Opwarmen in stapjes**
- `introWarm` loopt nu als generator (`ixWarmGen`) via requestIdleCallback. Per keer doet hij hooguit ongeveer 8 ms werk, of wat er aan rusttijd is. De stappen:
  1. stad en buurt, elk apart;
  2. de 22 akkerplaatjes, één voor één;
  3. het meten van het paneel: `#scrIntro` staat daarvoor heel even op visibility:hidden, en het paneel is gevuld met de tekst van shot 1, zonder voorlezen;
  4. de lucht in zes stukken (`ixSkyGen`);
  5. de aren-tegel;
  6. het bewaarde begin van shot 1 (`ixBg`);
  7. de akker op ware grootte, plaatje voor plaatje;
  8. een tweede set op resolutie 1.
- Na elk plaatje volgt `ixFlush`, een drawImage naar 1x1 px. Chromium tekent een canvas pas echt bij het eerste gebruik, en dat werk kwam anders alsnog in één klap bij het openen.
- Het frame na een stap telt niet mee voor de resolutie van de titeldemo (`fps.n` en `fps.sum` op 0, zoals openIntro al deed). Zonder dat zakte de titeldemo in 3 van de 6 rondes naar resolutie 1,25, en dat bleef zo voor de hele sessie.

**2. Niets zwaars meer in de tik**
- `introCaches` bouwt de akker op ware grootte niet meer in de tik. Wat ontbreekt, maakt `introFrame` met één plaatje per frame. Zolang tekent `ixField` die rij geschaald.

**3. Geen tweede stilstand als de resolutie zakt**
- Lucht, stad, buurt en het bewaarde begin worden verkleind, niet opnieuw getekend.
- De akker schakelt over op de set voor resolutie 1 die al klaarstaat.

**Bijvangst: hoogte van het beeld**
- Het beeld werd gemeten voordat de kop "Waar je bent" in het paneel stond. Daardoor was de beeldhoogte 4,4 px te groot.
- Bij de eerstvolgende layout (de resolutiedaling) werd daarom alles opnieuw gebouwd en schoof het beeld 4 px op.
- openIntro roept nu eerst `introShot(0)` aan en meet daarna.

**Metingen** (400x800, dpr 2, 4x CPU, eerste bezoek, mediaan)

| Meting | Voor | Na |
|---|---|---|
| Eerste beeld na It giet oan! (`review-tech/tap2.js`, 4x vanaf het laden, 6 s titel) | 408 ms (397/408/443) | 101 ms (95/101/112) |
| Langste frame (zelfde meting) | 325 ms | 92 ms |
| Eerste beeld, `tap.js` na 1,3 s titel | 473 ms | 133 ms |
| Eerste beeld, `tap.js` na 5 s titel | 420 ms | 103 ms |
| Langste frame in de eerste 4 s van de intro (`check/open.js`, 4 rondes) | 376 ms | 86 ms (74 tot 106) |
| Frame waarin de resolutie zakt (layout) | 128 tot 198 ms | 44 tot 74 ms |
| Titeldemo bij een eerste bezoek, langste frame (`review-tech/warm.js`) | 283 tot 383 ms | 50 tot 100 ms |
| Begin van shot 1 (0 tot 1,1 s) | 16,1 ms per frame, 45,4 fps | 12,1 ms per frame, 49,7 fps |

Toelichting bij de tabel:
- In het frame waarin de resolutie zakt, kost het introgedeelte nu 33 tot 53 ms.
- Bij de titeldemo is mijn grootste stap 56 tot 77 ms (één akkerplaatje).
- Tikt iemand al na 1,8 s, voordat het opwarmen klaar is, dan wordt de rest bij het openen gemaakt: 480 ms werd 397 ms.

**Wat ik niet kon oplossen**
- Bij een eerste bezoek is er ongeveer 0,4 s na het laden nog een frame van 150 tot 230 ms in de titeldemo. Dat komt door `gxWarm`, `getTile` en `render`: het opbouwen van het tijdperk van de demo. Dat hoort bij techniekpunt 2 van de spel-hersteller.
- Tijdens het opwarmen haalt de titeldemo 57,5 fps tegen 59 fps eerst, maar zonder bevriezing.

## Regels buiten mijn gebied

Geen.
- Een diff tegen `fix/base.html` geeft alleen verschillen binnen het introgedeelte (base-regels 3768 tot 4874).
- De knoptekst-regel in introShot is niet aangeraakt.
- Wel binnen mijn gebied, maar goed om te weten:
  - `introWarm` zet de gedeelde teller `fps` op nul, net als openIntro en introCap al deden;
  - het opwarmen zet `#scrIntro` heel even zichtbaar met visibility:hidden, vanuit JS. CSS en HTML zijn niet aangepast;
  - in openIntro is alleen de regel `show('intro'); introShot(0); ...` veranderd. De regels met de knopteksten van Overslaan zijn niet aangeraakt.

## Nieuwe namen

- Functies, constanten en variabelen: `ixGrain`, `ixGrainFill`, `IX_GQ`, `IX_GS`, `ixSkyGen`, `ixCanvas`, `ixNativeRow`, `ixFlush`, `ixPal`, `ixWarmQ`, `ixWarmed`, `ixWarmGen`, `ixBg`, `ixMeasure` en `ixMeasureIn`.
- In `IN`: `grain` en `fn1`.

## Controles

- `node --check` op het uitgepakte script is OK.
- Contract:
  - het bestand begint met `<title>`, zonder doctype, html, head of body;
  - er gaan geen requests naar buiten. Er staan alleen twee URL-teksten in: de SVG-namespace en de deellink;
  - `review-tech/contract.js` geeft geen fouten.
- harness.js: op telefoon en desktop zijn started, gameOver en restarted true, zonder errors.
- nieuwkomer.js: 37 van 37.
- Extra tests:
  - `intro/reduced.js` (verminderde beweging en overvloeien): 20 van 20;
  - `review-tech/thema.js` en `rotate.js`: geen fouten;
  - `review-tech/iframe.js`: alles gelijk aan de run van de reviewer. De ene FOUT ("pijltje rechts werkt in de intro") staat ook in hun eigen uitslag van final. Die komt door de timing van de test tegen de dubbeltikbescherming van 350 ms, niet door deze wijziging.

## Proef-samenvoeging

De kopie van ui is van 15:53, die van spel van 17:10.

| Samenvoeging (`git merge-file -p`) | Conflicten |
|---|---|
| intro, base en ui | 0 |
| intro, base en spel | 0 |
| alle drie | 0 |

Op het resultaat van alle drie zijn harness.js en nieuwkomer.js groen (37 van 37).
