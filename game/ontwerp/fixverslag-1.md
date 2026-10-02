# Fixverslag ronde 1: Korrelval versie B

**Bestand:** `korrelval-b.html`, in place bewerkt. Back-up van de vorige versie: `korrelval-b.v1.html`.
**Resultaat:** 1.722 regels, 116.841 bytes (was 1.526 regels en 106.090 bytes). Het bestand begint met `<title>` en bevat geen `<html>`, `<head>`, `<body>` of `<!doctype>`.

## Controles

| Controle | Uitkomst |
|---|---|
| `node --check` op het uitgepakte script (`fix1/extracted.js`) | OK, na elke reeks wijzigingen |
| `harness.js korrelval-b.html shots-fix1` | Telefoon en desktop: started, gameOver en restarted zijn alle drie `true`. Enige fout: het Google Fonts-certificaat. |
| Eigen check `fix1/check.js` (echte fonts, geïnstrumenteerde kopie) | 0 pageerrors en 0 console-errors in alle sessies. Screenshots in `shots-fix1-check/`. |
| `fix1/harvest.js` + `fix1/analyze.js` (kopie van de playtest-scripts, eigen uitvoer) | Zie de tabel bij bevinding 6 |

**Bekeken met de Read-tool:**
- titel op 400×800, 360×640 en ontgrendeld op 360×640;
- molen 1 op 2,3 s, op 3,4 s (tutorial) en bij de 1856-grap;
- weegbon na molen 1;
- molen 2: intro en twee stoomframes;
- game-over Nachtploeg met letterkiezer;
- Over dit spel, Scores en de pauzekaart op touch;
- landschap 800×400;
- desktop: titel, Gezel-HUD, jaarverslag en Nachtploeg-HUD;
- Nachtploeg en Molen B tijdens het spel;
- laag venster 900×450;
- de harness-shots.

**Wat ik zag en heb verbeterd:**
- De mijlpaal "Een ton bloem" viel bij de start van molen 2 over de introtitel. Opgelost: mijlpalen komen pas na de introband.
- Onder de plakkende Terug-knop scrolde tekst zichtbaar door. Opgelost.
- De jaarknoppen waren op 360 px maar 36 px breed. Opgelost.
- Kleine knopbijschriften braken af met één weeswoord. Opgelost.

**Gemeten in `fix1/check.js`:**
- spatie na een muisklik op Gezel start het spel;
- Tab naar Scores en dan Enter opent Scores;
- `blur` pauzeert het spel, en na Verder volgt 0,6 s adempauze;
- Gezel vanaf 2026 levert geen Menselijk op en zet `campDone` niet;
- de beste score wordt na de weegbon bewaard (1.795);
- er is 0 keer een moment zonder driehoek én zonder steen (400 metingen);
- de letterkiezer-knoppen zijn 44×40 en er staan geen knoppen < 40 px op de schermen;
- een tablet met touch in landschap (1024×768) krijgt geen overlay.

## 1. `review-b.md`

### Tabel, rijen 1 t/m 29: allemaal uitgevoerd

**Uitmaling (rijen 1 t/m 5)**
- 1-4: precisielabel volgens 4.1, met `min`-drempels 90/75/50/0.
- Weegbontekst: "Precisie X%: a van b perfect. Jouw meel: Label, uitmaling Y. Witter = minder uitmaling."
- Bonusregel heet nu "Precisiebonus".
- Deelregel eindigt op "…, Label, X% perfect".
- `SAVE_KEY` is nu `korrelval-b-v2`.
- 5: de Over-tekst over uitmaling is woordelijk overgenomen.

**Teksten en feiten (rijen 6 t/m 18)**
- 6: moederkoren is nu een giftige schimmel, in de supply-regel van 2008, de tip en het codecommentaar.
- 7 en 8: Dollard-regel wordt "Groninger baktarwe, circa 500 ton" (het hoofdvoorstel). Titel 1867 wordt "Stoommeelfabriek, Leeuwarden" met `short` "Leeuwarden". Beide `fillText` hebben nu `maxWidth` 330 (4.2).
- 9: `fl()` geeft "1 verdieping" en "37 verdiepingen", met vaste spatie op het scherm en een gewone spatie in de deelregel.
- 10: nieuwe jaarverslagzin.
- 11: in 1846 en 1867 luidt de tip "…tussen de molenstenen" (4.3).
- 12: de Nachtploeg-noot is "eindeloos, één korrel". De knop Korrel van de dag kreeg `<small>iedereen dezelfde schacht</small>`.
- 13: de kop heet "Badges".
- 14: "zonder botsing" en "alle bonussen". Badges zijn overal tikbaar en tonen een toast met naam en uitleg (4.5).
- 15: het kaartje is vervallen bij het terugbrengen naar 10 kaartjes (oordeel A→B 8). Het herhaalde de supply-regel. De onjuiste formulering "eerste stoommachine in Leeuwarden" is dus weg.
- 16 en 17: nieuwe teksten bij 1920 en bij de loskade (stamde uit 1927, vervangen in 2024).
- 18: intro 2008 is "In 2008 opent een nieuwe molen: smallere spleten en sneller schuddende plansichters."

**Stijl (rijen 19 t/m 29)**
- 19-29: overgenomen zoals voorgesteld:
  - intro 1920;
  - "Molen B";
  - lead met "en val door";
  - boekweit, conditioneren en magneet;
  - "Friese tarwe" en "EKO-tarwe (Skal)";
  - toast "Plak de score waar je wilt.";
  - "Over dit spel";
  - "Wie midden door de spleet valt…";
  - de twee besturingsteksten.

### Codeblokken 4.1 t/m 4.5

Alle vijf ingebouwd. De badge-toast (4.5) zit in de gedeelde `badgeEl()`.

### Restpunten (sectie 5)

- **Over-marges:** `.about h2+p, .about p+p { margin-top: 10px }`.
- **Hint-marge:** `.card>.hint { margin-top: 10px }`.
- **Ribbels:** optie "fijner".
  - 1920 krijgt `ribs: 12`, 2008 krijgt `ribs: 24`.
  - De lijndikte is nu `f.ribs < 15 ? 2.2 : 1.5`.
  - Het commentaar "grof in 1920, fijner later" klopt daarmee weer.
- **Taal:** `document.documentElement.lang = 'nl'` in `start()`.
- **Optioneel, ook gedaan:** de toplijst toont "· van de dag" in plaats van "· dag".

## 2. `compare/oordeel.md`

### Problemen in de winnaar (B)

| # | Status | Wat |
|---|---|---|
| 1 | gedaan | Stoom is nu klein, zie A→B 1. |
| 2 | gedaan | Tutorial boven de korrel (y 186/206), pas na de introband. De 1856-grap is verplaatst. Geen stapeling meer: zie `p02`, `p03` en `p04`. |
| 3 | gedaan | `save.best` wordt bijgewerkt in `levelComplete()`. |
| 4 | gedaan | `show()` verbergt de toast en wist de timer. |
| 5 | gedaan | `run.startLvl`. Menselijk en `campDone` alleen bij start in 1846. Bij een latere start: "Je viel van {jaar} tot Molen B." |
| 6 | gedaan | Zie de opsomming onder de tabel. |
| 7 | gedaan | Terug is plakkend (`position: sticky`). Een kaartkleurige schaduw dekt de tekst eronder af. |
| 8 | niet | Beslissing: geen wijziging aan het tellen van gevaren in Molen B. Molen B is wel iets milder gemaakt via de playtest-beslissing (gap 0,17, scroll 400). |
| 9 | niet, gedocumenteerd | De Nachtploeg blijft open na molen 1 (1846). Zo is de lus met Korrel van de dag direct bereikbaar. Dit wijkt bewust af van het concept ("na de campagne"). |
| 10 | deels | De testhaken blijven (beslissing: inert). De langste logicaregels zijn uitgesplitst: `params()` van de Nachtploeg, `Wd`, `newRun`, `resetWorld`, `say`, de jaarknoppen en de uitmalingsbadge. Tekenprimitieven en de testhaakregel zijn niet aangeraakt, omdat het testscript van de playtester op die regel injecteert. |
| 11 | gedaan | Verdiepingen worden geclipt op de schacht (L..R). Stenen en walsen verdwijnen nu in de wand in plaats van eroverheen te steken. De hitboxen zijn ongewijzigd. |

Wat bij punt 6 is gedaan:
- de disclaimer staat direct onder de lead;
- `#ctlHint` is verborgen op touch;
- de jaarknoppen staan op één rij, met het label ernaast vanaf 391 px breedte en erboven daaronder;
- `--s` schaalt mee.

Resultaat: op 360×640 en 375×667 scrolt de titelkaart niet meer, ook niet ontgrendeld met badges. De disclaimer is zichtbaar.

### Overnemen uit A (A → B)

**1. Stoom**
- Kleine puffjes (r 7 → 21) langs de wand, in schermruimte y 96…200, dus altijd boven de korrel.
- Ze worden getekend na de wanden en vóór de verdiepingen. Daardoor liggen ze nooit over een verdieping of steen.
- Bij reduced motion is er geen stoom.

**2. Mijlpalen in kg**
- Het mechanisme komt uit A, maar staat als tekst boven de korrel in plaats van als DOM-toast, die over de vooruitblik zou vallen.
- Niet tijdens de introband, de tutorial of de silo-landing.
- Teksten:
  - 25 kg: "Eén zak van 25 kg!"
  - 1.000 kg: "Een ton bloem: goed voor circa 1.800 broden!"
  - 2.000 kg: "Eén bulkcel van 2 ton vol!"
  - 10.000 kg: "Tien ton bloem: circa 18.000 broden!"
- **A's "Een hele silowagen!" bij 12.500 kg is bewust niet overgenomen.** `spelmateriaal.json → avoid` zegt letterlijk dat het silowagen-voorbeeld van 12,5 ton geen Koopmans-cijfer is.

**3. 1856-grap**
- Bij de derde molensteen (een teller per molensteen in de generator) en pas na de introband.
- Een tarwekorrel valt op de rechterloper en stuitert er zichtbaar van af. Daarna volgt de tip.

**4. Kernwaardenrij**
- Op game-over en jaarverslag staan alle zes badges.
- Verdiende badges in goud met naam, de rest als grijs icoon. Tik geeft de uitleg.
- Compact gehouden, zodat de game-over-kaart met letterkiezer op 400×800 nog past.

**6. Zakgoed**
- Bij de niet-gouden silo verschijnt "Zakgoed: 25 kg, via de groothandel." plus "+50".
- Op de weegbon staat "Silo X (zakgoed)" naast "(bulkwagen)".

**7. Nachtploeg-zones**
- Per tien verdiepingen een Prémax-naam in de HUD, onder "verdieping" en naast het getal.

**8. Wist-je-dat**
- Terug naar 10 kaartjes. Geschrapt zijn de kaartjes die een introregel herhalen (2 pk, Juliana, door het dak) plus "twintig walsenstoelen", "altijd hoog", "120 ton per uur" en "vier schepen per week".
- `pickFact()` kiest zonder herhaling binnen een run, bij voorkeur een kaartje van de eigen molen.

**10. Meeschalende kaarten**
- `--s` = min(b/400, h/790), begrensd op 0,86 tot 1. Het schaalt koppen, lead, knoppen, bon, feitkaart en witruimte.
- Kleine teksten (11-12 px) en de minimale knophoogte (44-46 px) schalen niet mee.

**Bewust niet gedaan:**
- 5, het era-tafereel. Dat is middelgroot werk en mag alleen bij tijd over.
- 9, een TEXT-object. Dat is middelgroot en raakt elke tekstregel; het risico op regressie in deze ronde is te groot.

## 3. `playtest-b/verslag.md`

| # | Status | Wat |
|---|---|---|
| 1 | gedaan | Precisielabel volgens het review-voorstel (beslissing), niet de formule `100 - p·55` uit de playtest |
| 2 | gedaan | `hintTouch` (start: `(pointer: coarse)`) wordt bijgewerkt in de document-`pointerdown`. Hij stuurt de tutorialregel, de pauzehint (verborgen op touch) en `#ctlHint` (verborgen op touch). Ik gebruik `pointerType !== 'mouse'`, zodat een pen als touch telt, net als in de besturing. |
| 3 | gedaan, met één verfijning | Zie de opsomming onder de tabel |
| 4 | gedaan | Zie oordeel-punt 5 |
| 5 | gedaan | Zie de opsomming onder de tabel |
| 6 | gedaan | Nieuwe eerlijkheidsregel in `spawnFloor()` volgens het codeblok. `night.gapMin` 0,15 en `intMin` 0,9. Gepassioneerd geldt nu bij 75 verdiepingen; badgetekst en tip zijn aangepast. Molen 2026: `gap` 0,17 en `scroll` 400. Metingen in de tabel hieronder. |
| 7 | gedaan | Overlay "Draai je telefoon rechtop" bij `(pointer: coarse)`, breedte > hoogte **en hoogte < 600 px**; een lopend spel pauzeert. Extra: in vensters lager dan 480 px staat "Nog een korrel?" bovenaan de game-over-kaart en valt de bon weg. |
| 8 | gedaan | Letterkiezer-pijlen 44×40, jaarknoppen 44 px hoog en minstens 44 px breed, pauzeknop `max(44, 40·s)` rechts uitgelijnd. De levens schuiven 6 px op voor de grotere pauzeknop. |
| 9 | gedaan | `maxWidth` op titel en supply-regel en kortere teksten. De introband in molen 1 en 2 duurt 3,0 s, met de eerste verdieping op 3,8 s (`intro.tLong` en `firstLong`). Andere molens blijven 2,2 en 3,0 s. |
| 10 | gedaan | Tutorial boven de korrel en grap later. De tutorial verbergt zich kort als er een steen door y 160-225 valt. |
| 11 | gedaan | Toast weg in `show()` |
| 12 | gedaan | `fl()` |
| 13 | gedaan | M tijdens het spel toont een korte toast "Geluid uit" of "Geluid aan" (1,4 s) |
| 14 | gedaan | Het middelpunt van de werklamp ligt op de korrel + 140 px, met binnenradius 90, buitenradius 460 en alfa 0,5. `drawPredict()` komt na de lamp. |
| 15 | gedaan | Over-marges |
| 16 | gedaan | Disclaimer onder de lead, `#ctlHint` verborgen op touch, `.btn` 44 px onder 700 px hoogte, `--s`. De weegbon op 360×640 past nu helemaal, Menu inbegrepen. |
| 17 | gedaan | Het veld wordt gedimd (zwart 50%) achter pauze, weegbon, game-over en jaarverslag. De titeldemo blijft helder. |
| 18 | gedaan | Terugval met `select()`, `setSelectionRange()` en `execCommand('copy')`. De mislukt-toast komt alleen als ook dat faalt. In de Nachtploeg staat `save.name` in de deelregel. |
| 19 | gedaan | `resume()` geeft 0,6 s onkwetsbaarheid; de korrel knippert. |
| 20 | gedaan | `blur` pauzeert tijdens het spel |
| 21 | gedaan | `li.empty`, zonder teller |
| 22 | gedaan | Via review-rij 12 |
| 23 | gedaan | Via A→B 1 |
| 24 | gedaan, voor zover mogelijk | Zie de opsomming onder de tabel |
| 25 | niet | Zie "Bewust niet gedaan" |
| 26 | gedaan | Eén keer per run de tip "Mik op de gouden silo: daar wacht de bulkwagen." zodra de silohal binnenkomt |
| 27 | alleen het HUD-label | "GEZEL" in goud in de bovenste HUD-regel. Teller en hoge telefoons zijn overgeslagen, zoals opgedragen. |

**Bevinding 3, spatie en Enter:**
- Buiten het spel roepen spatie en Enter altijd `primary()` aan.
- Native activatie blijft alleen in het tekstveld en op de hoofdknop zelf.
- Plus één uitzondering: een knop die met Tab is gekozen. Dat wordt bijgehouden met `focusin` en `lastKey`.
- Reden: anders opent een toetsenbordgebruiker die naar Scores tabt met Enter het spel in plaats van Scores.
- Getest: na een muisklik op Gezel start spatie het spel, en Tab naar Scores plus Enter opent Scores.

**Bevinding 5, waarschuwingsdriehoekje:**
- Stenen spawnen op `HUD - 12`, met `lead = warn + (GY - HUD + 12) / vfall`.
- Het driehoekje blijft staan en volgt de steen tot die onder de HUD-band vandaan komt.
- `hazard.vx` is `[0, 50]`.

**Bevinding 24, prestaties:**
- De letterbox staat nu één keer op een eigen canvas `#lb`. `#cv` tekent per frame alleen nog het veld en geen schermvullende `drawImage`.
- De werklamp van de Nachtploeg wordt één keer als klein offscreen-verloop (400×720) gemaakt en daarna geschaald neergezet.
- Meten op een echte middenklasse-Android kon ik hier niet.

**Metingen bij bevinding 6** (`fix1/analyze.js`, 3 runs per molen en 3 Nachtploeg-runs tot 160 verdiepingen):

| Meting | Voor | Na |
|---|---|---|
| Nachtploeg toetsenbord onhaalbaar zonder reactietijd | min. slack 0,00 s | 0% (min. slack 0,26 s) |
| Nachtploeg toetsenbord met 0,25 s reactietijd | 7% | 2% |
| Molen 1 t/m 6 toetsenbord en muis onhaalbaar | 0% | 0% |
| Afwijking inslag-x tegenover driehoekje-x | gem. ~70 px, max 162 px | gem. 13-30 px, max 51 px |

## Bewust niet gedaan, en waarom

- **Oordeel B-8 en B-9:** beslissingen uit de opdracht. De Nachtploeg blijft open na 1846 en dat is hier gedocumenteerd.
- **Oordeel A→B 5 en 9:** middelgroot. Dit mocht alleen bij tijd over, en ik heb de ronde gebruikt voor de verplichte punten en de controles.
- **Playtest 25 (molenstenen als liggende stenen, gladde walsen):**
  - Liggende stenen vragen een andere hitbox (rechthoek in plaats van cirkel), anders kloppen beeld en botsing niet meer. Dat past niet in 40 regels en raakt de eerlijkheid.
  - "Tanden weglaten" botst met de gekozen ribbel-optie "fijner".
- **Playtest 27:** alleen het Gezel-label gedaan. De teller-omwenteling en hoge telefoons zijn overgeslagen, zoals opgedragen.
- **Review-rij 15:** het kaartje is geschrapt in plaats van herschreven (zie boven).
- **Review-rij 7:** de naam "Dollard Tarwe" is daarmee uit de supply-regel verdwenen. Het alternatief met naam (329 px) kan nog, maar het hoofdvoorstel is gekozen.

## Zelf gevonden en opgelost

- **Silowagen-mijlpaal:** A's "Een hele silowagen!" (12.500 kg) staat op de avoid-lijst en is vervangen door getallen uit de bron.
- **Mijlpaal in de introband:** de mijlpaal van 1.000 kg werd direct bij de start van molen 2 getoond, omdat de bonussen van molen 1 de grens passeerden. Hij stond dan over de introtitel. Mijlpalen wachten nu tot na de introband.
- **Overlay op tablets:** de landschap-overlay zou ook een tablet met touch blokkeren, terwijl het veld daar groot genoeg is. Daarom geldt de extra eis hoogte < 600 px.
- **Smalle telefoons:**
  - Jaarknoppen op 360-375 px werden 36-38 px breed. Onder 391 px staat het label nu boven de knoppen.
  - Bijschriften braken af met een weeswoord. Opgelost met `text-wrap: balance`.
- **Plakkende Terug-knop:** door de onderste padding van de kaart scrolde tekst zichtbaar onder de knop. Opgelost met een extra kaartschaduw.
- **Gewone tekstfout:** de jaarverslag-deelregel zei altijd "van 1846 tot 2026". Nu staat er het echte startjaar.
- **Zichtbare tekst klopte niet meer met de regels:**
  - Menselijk-badge: "de hele tijdlijn vanaf 1846 uitgespeeld als Gezel".
  - Gepassioneerd: 75 verdiepingen.

## Bestanden

- `korrelval-b.html`: de gefixte versie.
- `korrelval-b.v1.html`: back-up van versie 1.
- `shots-fix1/`: harness, met `report.json`.
- `shots-fix1-check/`: eigen screenshots en `check.json`.
- `fix1/check.js`, `fix1/extra.js`, `fix1/harvest.js`, `fix1/analyze.js`: controlescripts. `fix1/harvest.json` bevat de meetdata.
