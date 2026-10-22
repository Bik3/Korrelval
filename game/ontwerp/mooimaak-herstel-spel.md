# Fixverslag spel-hersteller

- **Werkbestand:** `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/fix/spel/korrelval.html`
- **Controle en beelden:** `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/fix/spel/check/`
  - Scripts: `*.js`, `cmp.py` en `contrast.py`.
  - Vergelijkingsbeelden: `art*.png` en `tech7*.png`.
  - Losse beelden: `out/shots/{voor,na}/`.
- **Opzet van de vergelijking:**
  - "Voor" is `fix/base.html`, "na" is mijn werkbestand.
  - Beide met dezelfde seed en nepklok.
  - Snelheid gemeten op 400x800 met dpr 2 en CDP CPU 4x (of 6x), voor en na om en om.

## Art 1: telefoonstroken
- **Wat ik deed:**
  - **buildLetterbox:** zonder zijpanelen (`gxLbWide()` onwaar) is het hele kader nu in beide thema's donker.
    - Boven staat #262421, de kleur van de HUD. De HUD loopt zo door tot de rand.
    - De rest is #1A1815.
    - Het korenaarpatroon staat alleen in stroken van minstens 24 px.
    - Er is geen schaduw meer, want die gaf een naad.
  - **gxHudBg:** het lichte lijntje bovenaan de HUD staat er alleen nog op brede schermen.
- **Meting (pixels):**
  - 400x800 licht, strook boven: (238,231,215) wordt (38,36,33). De HUD zelf is (38,36,32).
  - 400x800 licht, strook onder: (236,228,212) wordt (26,24,21).
  - 360x640: de zijlijn van 2 px gaat van (208,199,180) naar (26,24,21).
- **Beelden:** `art1-telefoon-licht-400.png`, `art1-telefoon-donker-400.png`, `art1-telefoon-360-412.png` en `art1-hud-naad.png`.

## Art 2: TL-buizen 1976 en lichtpanelen 2008
- **1976:** vier liggende TL-buizen (84 px, dekking .9, twee naast elkaar op één hoogte) worden drie rechtopstaande buizen tegen de zijwand.
  - Plaats: x 14 en 288 van de achterwand, om en om per verdieping, nooit twee op dezelfde hoogte.
  - Buis op dekking .4, gloed .1 en .035.
- **2008:** vier liggende panelen (dekking .92, één midden in de valbaan) worden drie rechtopstaande ledlijnen langs de wand.
  - Plaats: x 16 en 284.
  - Dekking .4, gloed .1.
- **Beelden:**
  - `art2-1976-2008.png`, met een plaat in beeld: de witte strepen midden in de schacht zijn weg.
  - `art2-zoom-wandlampen.png`.

## Art 5: walsen
- **gxRollSpr:** terug naar de gladde stalen cilinder van vóór de ronde.
  - Horizontaal verloop met een lichtband; Molen B houdt zijn witte glanslijn.
  - As, spie en radiale schaduw zijn weg. De zachte schaduw onder de wals blijft.
- **drawWals:** de draaiing zie je alleen aan fijne, vage ribbels, zoals vóór de ronde.
  - Het zijn verticale lijnen die opzij schuiven en naar de randen vervagen.
  - Dekking: .22 bij grove ribbels, .15 bij fijne en .1 bij de gladde walsen van Molen B.
  - Ze staan in drie paden, zonder clip.
- **Molenstenen:** ongewijzigd. Ze zagen er goed uit.
- **Beelden:** `art5-walsen.png` (1976 en 2008) en `art5-walsen-nacht-1920.png`. Geen cirkelzaag meer.

## Art 8: lichtpunten in de valbaan
- **1846:**
  - Het luikje gaat van lx 92 naar 8, tegen de linkerwand. Het glas gaat van .75 naar .4, de gloed van .14 naar .1.
  - De daglichtspleten zitten alleen nog in de naad bij de linkerwand (x 19 tot 32). De lijn gaat van .62 naar .3.
- **1867:**
  - De gaslampen gaan van x 76/228/112 naar 38/262/38, aan een arm vanaf de gietijzeren kolom.
  - Gloed van .24/.38 naar .13/.2, glas van .85 naar .45, vlam op .7.
- **1920:**
  - De hanglampen gaan van x 74/222/140/60/236 naar 32/268/32, om en om.
  - Gloed van .22 naar .14, lamp .6, kaprand .55.
- **Beelden:** `art8-1846-1867.png` en `art8-1920.png`.

## Art 10: canvaspanelen
- **gxPanel:**
  - De hoekstraal gaat van 9 naar 4, de schaduw van 10 naar 5.
  - De gouden band gaat van 3 naar 5 px.
  - De binnenrand is weg.
- **drawIntroNew:** de startstrook clipt ook op hoekstraal 4.
- **Beeld:** `art10-band-bon.png`, de introband naast de weegbon.

## Techniek 7: tijdlijn in het merkkader
- **gxTimeline:**
  - Alle tekst die niet bij de huidige molen hoort, staat op inkt .72: jaartallen, namen, SINDS 1846 en NACHTPLOEG.
  - Gehaald of nog niet gehaald zie je alleen aan de stip.
  - Huidige molen in het lichte thema: jaartal #6E5A00, naam #8A5200.
- **Tijdperkpaneel:** naam #6E5A00, jaartal .72.
- **Meting:** op de schermafbeelding van 1280x800 (`contrast.py`).
  - Licht: van 2,50–4,62 naar 5,19–6,24.
  - Donker: van 3,65–10,3 naar 7,94–10,3.
- **Beelden:** `tech7-tijdlijn-licht.png` en `tech7-tijdlijn-donker.png`; het hele merkkader in `desk-1280-merkkader.png`.

## Techniek 2: overgangen

### Wat ik deed
- **gxPrewarm(lv):** zet een tijdperk in rustige tijd klaar via requestIdleCallback (zonder rIC: setTimeout).
  - De zware opdrachten gaan één per rustig moment, de lichte achter elkaar.
  - Elk plaatje wordt meteen één keer als bron gebruikt, zodat het al gerasterd is.
  - Aanroepen, telkens één regel:
    - startDemo: molen 1;
    - openPick: `save.maxLvl`;
    - levelComplete: de volgende molen.
- **Achterwand:** op volle resolutie in drie banden van één verdieping hoog (`gxBgBand`), elke band in een eigen rustig moment. De browser rastert aan het eind van een taak.
- **Geheugen:** er blijven hooguit twee tijdperken in het geheugen: dat van nu en het klaargezette (`gxEvict`). Kies je een andere molen dan klaargezet, dan vervalt het klaarzetten.
- **Niet klaargezet:**
  - Direct worden alleen de zijwanden en een voorlopige achterwand op halve resolutie gebouwd, een kwart van het rasterwerk.
  - De rest volgt in rustige momenten achter de introband.
- **Letters:** HUD en introband worden vooraf onzichtbaar op het speelveld getekend, één lettergrootte per frame. Dat halveerde het eerste frame van een molen.
- **Brede schermen:** het plaatje in het merkkader wordt per molen bewaard (`gxEraArt`).
- **gxBgShade:** vult alleen nog de twee randen; daar zit de schaduw.
- **layout():** zakt alleen de resolutie, dan roept het `gxRescale` aan.
  - De plaatjes worden verkleind met één drawImage per plaatje.
  - De achterwand wordt even geschaald getekend en daarna in rustige momenten per band verkleind (`gxShrinkBand`). Er wordt niets opnieuw getekend.
  - Het merkkader wordt wel opnieuw getekend. De browser stuurt #lb elk frame mee, dus op de lagere resolutie is dat goedkoper (gemeten).
- **gxWarm:** is weg.

### Metingen
Langste frame in de 3 s na de tik, CPU 4x vanaf het laden, 5 rondes, mediaan (min–max):

| Overgang | Voor | Na |
|---|---|---|
| It giet oan! naar molen 1 | 266 (183–321) ms | 50 (33–105) ms |
| Kies een molen, molen 5 (niet klaargezet) | 217 (199–283) ms | 82 (50–167) ms |
| Kies een molen, Molen B (klaargezet) | 183 (167–267) ms | 50 (33–100) ms |
| Kies een molen, tik na 0,3 s | 217 (167–267) ms | 83 (50–133) ms |

- **Frames langer dan 100 ms:**
  - Voor: 1 tot 2 per keer, in alle 20 keer.
  - Na: geen in 15 van de 20 keer, één in de andere 5. Die vallen samen met het zakken van de resolutie.
- **Zakken van de resolutie tijdens het spelen (`drop.js`):**
  - Voor: 19 plaatjes opnieuw getekend, piek 133–167 ms.
  - Na: niets opnieuw getekend, 27 verkleinde kopieën, piek 67–100 ms.
- **Brede schermen (`desk.js`, 4x):** beter, maar nog niet overal onder 100 ms (groot merkkader en grote canvassen). Dat was niet het doel.

  | Situatie | Voor | Na |
  |---|---|---|
  | 1280x800@2, It giet oan! | 217–317 ms | 83–183 ms |
  | 1280x800@2, formaatwissel | 233–367 ms | 167–250 ms |
  | 1920x1080@1, It giet oan! | 183–233 ms | 150–167 ms |

- **Titeldemo (`titel.js`):**
  - Eerste 5 s, telefoon: 58,6 fps voor, 54,2 fps na.
  - Eerste 5 s, 1920x1080: 56,2 fps voor, 50,2 fps na.
  - Van 6 tot 10 s, telefoon: 59 fps voor, 60 fps na.
  - Van 6 tot 10 s, 1920x1080: 56,2 fps voor, 55,5 fps na.
  - Het klaarzetten van molen 1 gebeurt nu in de eerste seconden. Voor zat dat werk in één bevroren frame bij het eerste beeld.
- **Geheugen (`mem.js`):** stabiel na twee rondes. Van 41 naar 48 canvassen en van 6,46 naar 7,74 Mpx, door het tweede tijdperk in het geheugen.

## Techniek 3: CPU-tijd per frame
- **render:** houdt de transformatie zelf bij (`gxT` en `gxMove`), dus geen getTransform meer.
  - De kale kopieën staan in blokken op schermpixels (`gxId`):
    - vloeren in twee rondes: eerst de kopieën, dan wat draait en schudt;
    - schaduwvlekken;
    - vignet.
- **gxMotesDraw:**
  - De stofjes staan vooraf in vier groepen, dus elk stofje komt één keer langs.
  - Bij dprCap 1 worden ze overgeslagen.
- **Per frame (`ops.js`, Molen B):**
  - setTransform van 29 naar 13;
  - save/restore van 31 naar 25;
  - drawImage-pixels van 818k naar 526k.
- **Spelen na het opstarten** (`steady.js`, 3 s wachten, 5 s meten, mediaan van 3):

  | | Molen 1 | Molen 5 | Molen B | Nachtploeg |
  |---|---|---|---|---|
  | 4x, fps voor/na | 58,4 / 58,8 | 60 / 58,2 | 51 / 59 | 59,8 / 58,8 |
  | 6x, fps voor/na | 50,2 / 55,2 | 50,4 / 58,4 | 53,4 / 58,4 | 53,4 / 59 |
  | 6x, CPU per frame voor/na (ms) | 19 / 16,4 | 17,2 / 14,4 | 17,3 / 14 | 16,7 / 14 |
  | 6x, langste frame voor | 133–200 ms | 33–150 ms | 50–150 ms | 133–167 ms |
  | 6x, langste frame na | 50–67 ms | 33–83 ms | 50 ms | 33–50 ms |

  - Bij 4x is de CPU-tijd per frame gelijk binnen de ruis (±2 ms).
  - Met vaste resolutie 1 bij 6x is het gelijk:

    | | Molen 1 | Molen B | Nachtploeg |
    |---|---|---|---|
    | fps voor/na | 54 / 54 | 55,4 / 57 | 58 / 57,6 |
    | CPU per frame voor/na (ms) | 17 / 16,2 | 15,9 / 14,7 | 13,9 / 14,6 |

  - Bron van deze tabellen: `check/final-steady.txt`. De overgangen staan in `check/final-start.txt`.

## Verplichte controles
- **Contract:**
  - `node --check` op het script: OK.
  - Het bestand begint met `<title>`, zonder doctype, html, head of body.
  - De hosts zijn gelijk aan base (alleen tekst, geen requests).
- **harness.js:** telefoon en desktop allebei started, gameOver en restarted true, geen errors.
- **nieuwkomer.js:** 37 van 37.
- **Verminderde beweging:** de titel staat stil, geen fouten.
- **Proef-samenvoeging met `git merge-file` tegen `fix/base.html`:**
  - spel + ui: 0 conflicten.
  - spel + intro: 0 conflicten.
  - Alle drie: 0 conflicten.
  - Op de samengevoegde versie: nieuwkomer 37/37 en harness groen.

## Regels buiten mijn gebied
- **layout():** 2 regels (techniek 2, toegestaan).
- **startDemo, openPick en levelComplete:** elk 1 regel met `gxPrewarm` (toegestaan).
- **fps-teller van frameSample:** `gxIdle` zet `fps.n` en `fps.sum` (de teller van frameSample) op 0 na zwaar klaarzetten voor een andere molen. Aan frameSample zelf is geen regel veranderd.
- **Verder:** geen CSS, HTML, intro-functies of andere DOM-functies aangeraakt.
