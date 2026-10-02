# Oordeel Korrelval: versie A tegen versie B

**Winnaar: versie B** (`korrelval-b.html`). B is eerlijker, sneller in de "nog een keer"-lus en visueel uitgesprokener. Op de checklist van de brief maakt B minder fouten. A is netjes gebouwd en leest prettig, maar heeft vier echte fouten. Twee daarvan raken een kerngraft: de jaartal-teller toont nooit het juiste jaar, en "Korrel van de dag" is niet voor iedereen dezelfde schacht. Daarnaast is A's Molen B voor een speler met normale reactietijd vrijwel niet uit te spelen, en die molen houdt de Nachtploeg op slot.

## Scoretabel

| Criterium | A | B | Kern van het verschil |
|---|---|---|---|
| Visuals (kwaliteit, 400 px, consistentie, charme, huisstijl) | 7 | 8 | **B:** weegbon met rode stempel, bakstenen letterbox met korenaar-motief, getekende badge-iconen, Tsjoch-banner in de HUD. **A:** strak en leesbaar, maar generieke tegel-kaarten; de jaartal-teller is kapot. |
| Gevoel en besturing | 7 | 8 | Zelfde kerngetallen en beide relatief op touch. **B:** tegenstuur-boost, interpolatie bij het tekenen, direct controle na "Nog een korrel?". **A:** speelt elke retry eerst 2,4 s intro af. |
| Eerlijkheid | 5 | 8 | **A:** eerste verdieping 1,1 s na start in 2026, gaten 39-59% tegen de wand, banner en toasts in de invalzone van stenen. **B:** altijd 3 s aanloop, gaten verdeeld met minimale verschuiving. |
| Volledigheid t.o.v. brief | 7 | 8 | **A:** twee Vaultwarden-knipogen, dagseed niet gedeeld, teller toont geen jaartal. **B:** alles aanwezig, met een paar bewuste afwijkingen (zie checklist). |
| Codekwaliteit | 7 | 8 | Beide: CONFIG bovenaan en een nette state machine. **B:** in een IIFE en een deterministische generator, maar compacte regels. **A:** globale scope en een RNG-koppelfout. |
| **Totaal (max 50)** | **33** | **40** | |

## Waarom B wint
1. **Eerlijke start, korte lus.**
   - **B:** "Nog een korrel?" gaat direct het spel in. De introband loopt over het spel heen en de eerste verdieping komt op elk level na 3,0 s.
   - **A:** speelt eerst 2,4 s intro (overslaanbaar). In 2026 komt de eerste verdieping 1,1 s na de start (460 px bij 420 px/s), in de Nachtploeg na 1,3 s. Het gat kan overal liggen.
2. **Speelbaar met een menselijke reactietijd.** Ik heb een toetsenbord-bot gebruikt met ~200 ms reactietijd, die naar het gat bij aankomst stuurt en stenen ontwijkt (zie metingen). Uitgespeelde molens:

   | Molen | A | B |
   |---|---|---|
   | 1846 | 2/3 | 2/3 |
   | 1920 | 4/7 | 7/7 |
   | 2026 (Molen B) | 0/8 | 5/8 |

   In A ontgrendelt de Nachtploeg pas na Molen B. Veel collega's zien de Nachtploeg en de dagseed dus nooit.
3. **"Korrel van de dag" klopt in B.** In A verschuift de RNG-volgorde zodra iemand een magneet pakt. Daarna krijgt die speler een andere schacht dan zijn collega's (verschil vanaf verdieping 8 in mijn test). B legt gevaren en plansichter-fases vast in de generator. Dat is bewezen met `shots-b/det.js` en klopt met de code.
4. **Meer eigen gezicht.**
   - Weegbon met "PARTIJ AFGEKEURD"-stempel.
   - Volcontinu-klok met ploegletter in de Nachtploeg.
   - Bulkwagen onder de order-silo.
   - Korrel met knipperende oogjes en kanteling bij sturen.
   - Bakstenen letterbox met gouden korenaren.

   A is verzorgd, maar oogt meer als een dashboard.
5. **Minder fouten tegen de brief.** B heeft precies één Vaultwarden-knipoog. B's jaartal-teller werkt. B bewaart de top-5 automatisch: "Nog een korrel?" blijft één tik en je naam pas je daarna aan. In A gaat je top-5-score verloren als je niet eerst op "Opslaan" drukt.

## Hoe getest
- Gelezen:
  - `bouwopdracht.md`;
  - beide bouwverslagen;
  - de volledige bron van beide versies (CONFIG, generator, botsing, invoer, HUD, schermen, audio).
- Bekeken met de Read-tool:
  - de screenshots van beide bouwers en van de onafhankelijke harness;
  - een eigen set in `compare/shots/` (`a-*` en `b-*`).

  Voor die eigen set heb ik Nunito en La Belle Aurore lokaal geserveerd uit `fonts-r/`, zodat beide versies met de echte fonts renderen. De bouwer- en harness-shots gebruiken fallback-fonts.
- Eigen scripts in `compare/`:

  | Script | Wat het doet |
  |---|---|
  | `lib.js` | Wrapper, font-routing, sensor en "menselijke" toetsenbord-bot. Voor B een kopie met één regel die interne objecten blootlegt; het origineel is niet aangeraakt. |
  | `shots.js`, `shotsA2.js`, `odo.js` | Screenshots |
  | `fairness.js` | Level spelen met de bot en elke hit met oorzaak loggen |
  | `touch.js` | Relatieve touch via echte CDP-touch, plus toetsenbordversnelling |
  | `daily.js` | Determinisme van A's dagseed |
  | `gapdist.js`, `gapdist2.js` | Verdeling van gatposities |

- **Beperking:**
  - Niemand heeft met de hand gespeeld; "spelen" is gedaan met bots met reactievertraging.
  - Batch 1 van de eerlijkheidstest draaide met 6 browsers tegelijk. Onder CPU-druk vertraagt A het spel (maximaal 4 substappen). B blijft realtime en wordt dan zwaarder. Batch 2 draaide met 2 browsers en is leidend.
- Geen pageerrors of console-errors in beide versies, op 400×800 en 1280×800. De enige error is het Google Fonts-certificaat.

## Metingen

**Eerlijkheid met dezelfde bot (~200 ms reactietijd, 400×800)**

| Level | A uitgespeeld | B uitgespeeld | Hits A (oorzaak) | Hits B (oorzaak) |
|---|---|---|---|---|
| 1846 | 2/3 | 2/3 | wals 2, steen 1 | molensteen 2, steen 1 |
| 1920 | 4/7 | 7/7 | zeef 6, wals 3, steen/bout 5 | plaat 2, steen 2 |
| 2026 (rustige batch) | 0/5 | 5/5 | 15 hits (12 verdiepingen, 3 gevaren); dood na 10-31 verdiepingen | 2 hits (wals 1, moederkoren 1) |
| 2026 (drukke batch) | 0/3 | 0/3 | eerste hit al na 1,1-2,1 s | dood na 7-24 verdiepingen |

**Generator (`gapdist.js`)**

| Level | Gat tegen de wand: A | Zelfde plek als vorige: A | Gat tegen de wand: B | Zelfde plek als vorige: B |
|---|---|---|---|---|
| 1920 | 59% | 15-25% | 0-10% | 0% |
| 2026 | 39-44% | 10-14% | 1-2% | 0% |
| Nachtploeg | 43-46% | 13-15% | 4-5% | 0% |

- **A:** begrenst de verschuiving, maar klemt een veel te brede willekeurige sprong af op de wand. Het gat plakt dus vaak tegen de wand, en dan volgt een wand-naar-wand-sprong.
- **B:** trekt uniform binnen het haalbare bereik, met een minimale verschuiving van 0,6 × spleet.
- Beide halen de verplichte regel |dx| ≤ 0,7·vmax·Δt.

**Aanloop tot de eerste verdieping**

| Versie | Moment van eerste verdieping |
|---|---|
| A | intro 2,4 s, dan verdieping na 2,7 s (1846), 1,1 s (2026) of 1,3 s (Nachtploeg) |
| B | altijd 3,0 s na de start, met besturing vanaf 0 s |

**Touch en toetsen (`touch.js`)**

| Meting | A | B |
|---|---|---|
| Vinger neer op 130 px afstand | korrel blijft op 200 | korrel blijft op 200 |
| 60 px slepen | 60 px verplaatsing | 69 px verplaatsing (gain 1,15) |
| Snelle veeg van 80 px: 90% bereikt na | ~200 ms | ~200 ms |
| Drift na loslaten | 0 | 0 |
| Pijltje 300 ms | 86 px, uitrol ~30 px | 86 px, uitrol ~30 px |

Beide voelen dus vrijwel gelijk aan. B heeft wel dubbele versnelling bij tegensturen, waardoor richtingswissels strakker zijn.

**Dagseed A (`daily.js`)**
- Twee identieke runs: gelijk.
- Met een magneet op 6 s: andere gatposities vanaf verdieping 8.
- Oorzaak: `scheduleHazard()` trekt uit dezelfde `G.rng` en slaat over tijdens het magneeteffect.

## Checklist tegen de brief

| Punt | A | B |
|---|---|---|
| Procesbalk Lossen → … → Silo met iconen | ✓ (Malen/Builen in 1846/1867) | ✓ (idem) |
| Waarschuwingsdriehoekje 1 s vooraf | ✓ | ✓ |
| Knak-effect (zemel + kiempje, korrel witter/kleiner) | ✓ | ✓ |
| Dagseed "Korrel van de dag" + vrije modus | ◐ (diverged na magneet; label "Dagseed: aan" is jargon) | ✓ (twee knoppen, deterministisch) |
| Combo-toonhoogte C-E-G per stap een halve toon | ✓ | ✓ |
| Mini-jaarverslag (kg, zakken, bulkcellen, broden, uitmaling) + badges | ✓ | ✓ |
| Kopieer score + selecteerbare terugval | ✓ | ✓ |
| Doorrollende jaartal-teller | ✗ (toont na het rollen "2 [8/9] [4/5] 6" in plaats van 1846: `compare/shots/a-30-odometer-end.png`) | ✓ (`compare/shots/b-30-odometer-end.png`) |
| `navigator.vibrate` met feature-detectie | ✓ | ✓ |
| Wisselend aanvoerschip per run | ◐ (alleen 2008, 2026 en Nachtploeg; 1846-1976 vaste tekst) | ◐ (alleen 2026 en Nachtploeg) |
| Kiempje +30 met de juiste toast | ✓ | ✓ |
| 1856-grap | ✓ (korrel stuitert van de 3e molensteen) | ✓ (direct bij de start, tegelijk met andere tekst) |
| Familiegeschiedenis-kaartjes | ✓ (10 stuks, zonder herhaling per run) | ✓ (17 stuks per level; brief vraagt 8-10) |
| Gezel-modus + Menselijk-badge | ✓ (alleen bij start in 1846) | ◐ (badge ook bij Gezel-start vanaf een later jaar) |
| Vijf kernwaarde-badges (+ Elke korrel telt) | ✓ | ✓ (met getekende iconen) |
| Uitmalingslabels (45 / 65 / 75-76 / 100%, "witter = minder uitmaling") | ✓ | ✓ (plus verzameling "uitmalingen gezien") |
| Molenstenen + buil in 1846/1867, walsen/plansichter vanaf 1920 | ✓ | ✓ |
| Noordvliet in 1867 | ✓ | ✓ |
| Fan-made disclaimer op titel | ✓ | ✓ |
| Dr. Oetker-regel in credits | ✓ | ✓ |
| Precies één Vaultwarden-knipoog | ✗ (scoreregel én slotje "kluis: ok" in Molen B) | ✓ (alleen de scoreregel) |
| Geen Stuifarme Strooibloem / klander / Markermeer | ✓ / ✓ / ✓ | ✓ / ✓ / ✓ |
| Geen logokroon; korenaar en vijfpuntskroon | ✓ | ✓ |
| Geen emoji-iconen | ✓ (▲▼ als tekstglyph in letterkiezer) | ✓ (SVG/canvas) |
| Huisstijlkleuren, rood alleen voor gevaar/levens | ✓ | ✓ |
| Contract (title eerst, tokens licht/donker, <300 kB, try/catch-opslag, safe-area, reduced-motion, hot-reload) | ✓ (96,6 kB, 1.502 regels) | ✓ (106 kB, 1.527 regels) |
| Nachtploeg ontgrendelt na de campagne (concept) | ✓ | afwijking: open na 1846 (beter voor de lus, wel documenteren) |

## Visueel en leesbaarheid, per scherm

| Scherm | A | B |
|---|---|---|
| Titel | Grote gouden korenaar op een scrollende schacht, ruime kaart. Rustig en goed leesbaar (`compare/shots/a-01-title.png`). | "Korrel**val**" met een kleine korenaar en een speelbare demo erachter. Wel vol op 400 px: de regel "Sturen:" plakt aan de knoppen en op 375×667 scrolt de kaart (`compare/shots/b-01-title.png`). |
| Intro | Volledig scherm met loskade- of rosmolen-tekening: mooi tafereel, maar de teller is kapot. | Compacte band boven het spel; de teller rolt correct. |
| Spel | Grote molenstenen en walsen, duidelijk. Het gouden "Tsjoch!"-blok en de toasts liggen in de baan waar stenen binnenvallen (`compare/shots/a-09-l6-2026-play.png`, `shots/night-400x800.png`). | Banner in de HUD-band. Wel: stoomwolken leggen in 1867 een waas over de molenstenen (`compare/shots/b-07-l2-1867-play.png`) en de tutorialtekst staat op de eerste spleet (`shots-b/b-touch.png`). |
| Eindschermen | Tegelgrid met alle zes badges, waarvan de niet-behaalde grijs. Duidelijk, maar generiek. "Oant moarn" in oranje script is laag in contrast. | Weegbon met stempel en tabel: veel charme, compact. |
| Desktop | Letterbox is een vaag raster. | Bakstenen muur met korenaren; donker thema volgt de tokens. |

**Beide:** molenstenen en walsen steken over de schachtwanden heen. Dat is alleen cosmetisch.

## Codekwaliteit

**A**
- Nette kopcommentaar met een inhoudsopgave.
- CONFIG, LEVELS en TEXT bovenaan; alle teksten op één plek.
- Leesbare regels en één state machine (`G.state` + `SCREENS`).
- Alles staat in globale scope; de bouwer moest `Audio` al hernoemen.
- Tekenen zonder interpolatie.
- Fouten:
  - jaartal-teller: alle cijfers rollen met de fractie van de waarde, zonder carry;
  - RNG-koppeling bij de dagseed;
  - top-5 alleen via de knop "Opslaan".

**B**
- Genummerde secties en een IIFE.
- Generator op slots: gevaren zitten in dezelfde reeks, de plansichter-jitter wordt bij het spawnen getrokken.
- Vaste stap met render-interpolatie.
- Stemmenlimiet in de audio; `esc()` bij innerHTML.
- Nadelen:
  - zeer compacte regels met veel statements per regel;
  - testhaken in productie: inert, maar opruimen;
  - kleine logicafouten (zie hieronder).

Beide rond 1.500 regels; geen dode code van betekenis gevonden.

## Overnemen uit de verliezer (A → B), op prioriteit

| # | Wat | Grootte |
|---|---|---|
| 1 | **Stoom zoals A**: kleine puffjes langs de wand die geen obstakels afdekken, in plaats van B's mistwolken in 1867. | klein |
| 2 | **Mijlpaal-toasts in kg** ("Eén zak van 25 kg!", "Eén bulkcel van 2 ton vol!", "Een hele silowagen!"). Die versterken de score-in-kilo's. | klein |
| 3 | **1856-grap later timen, zoals A**: bij de derde molensteen, met de korrel die er fysiek van afstuitert. Niet tegelijk met de introband en de tutorial. | klein |
| 4 | **Volledige kernwaarden-rij op game-over en jaarverslag**: verdiend in goud, de rest grijs, zodat je ziet wat er te halen valt. B toont dat nu alleen op het scorescherm. | klein |
| 5 | **Getekend era-tafereel uit A's intro** (`drawLoskade`: rosmolen met paard in 1846, schip aan de kade later). Als klein vignet in B's introband of als kop van de weegbon. | middel |
| 6 | **Zakgoed-regel bij de niet-gouden silo** ("Zakgoed: 25 kg, via de groothandel.") in plaats van "In de silo +50". | klein |
| 7 | **Nachtploeg-zones met Prémax-namen** in de HUD ("Verdieping 8 · Fluessen") als smaakmaker. | klein |
| 8 | **Wist-je-dat zonder herhaling binnen een run** (A's factBag) en terugbrengen naar 8-10 kaartjes. | klein |
| 9 | **Alle UI-teksten in één TEXT-object**, zodat de stagiair teksten kan nalopen zonder de logica in te duiken. | middel |
| 10 | **A's meeschalende lettergrootte op kaarten** (`--s`) tegen B's volle titelkaart op smalle schermen. | klein |

## Problemen in de winnaar (B), op prioriteit

| # | Probleem | Bewijs | Oplossing en grootte |
|---|---|---|---|
| 1 | Stoomwolken in 1867 liggen boven de verdiepingen en verbergen deels de molenstenen. Botst met leesbaarheid en met het engineer-advies. | `compare/shots/b-07-l2-1867-play.png` | Stoom achter de vloeren of alleen in de wandkolom tekenen, lagere alpha (klein) |
| 2 | Tutorialtekst "Stuur door de spleet…" staat precies op de eerste spleet. De eerste 3 s stapelen introband, 1856-tip en tutorial zich op. | `shots-b/b-touch.png`, `shots-b-check/phone-2-play.png`, `compare/shots/b-03-intro-1.5s.png` | Tutorial in de introband of boven de korrel, 1856-tip later (klein) |
| 3 | Beste campagnescore wordt alleen bij game-over of uitspelen bewaard. Wie na een weegbon op "Menu" tikt, verliest zijn beste score. | `compare/shots/b-06-after-l1.png` (1.345 kg) tegenover `compare/shots/b-15-scores.png` ("Beste score: 30 kg") | `save.best` bijwerken in `levelComplete()` (klein) |
| 4 | Toast blijft na een schermwissel hangen en dekt knoppen af. | `shots-b/b-about.png` (over de Terug-knop), `shots-b/b-scores.png`, `shots-b/b-title-unlocked.png` | Toast verbergen in `show()` (klein) |
| 5 | Menselijk-badge ook bij een Gezel-run die later dan 1846 start; `showDone()` controleert het startlevel niet. | code `showDone()` | `run.startLvl === 0` eisen, idem voor `campDone` (klein) |
| 6 | Titelkaart vol op 400 px. Op 375×667 scrolt hij en valt de disclaimer half weg. | `compare/shots/b-01-title.png`, `playtest-b/shots/s-375x667-title.png` | Sturen-regel naar "Over", jaarknoppen inklappen (klein-middel) |
| 7 | Over-dit-spel-kaart hoger dan het scherm; "Terug" pas na scrollen. | `compare/shots/b-16-credits.png` | Plakkende Terug-knop (klein) |
| 8 | Molen B telt gevaren mee in de 32 "verdiepingen". De bot haalt hem 5/5 in de rustige batch: mogelijk te mild t.o.v. het concept. | — | Bijstellen na echte playtests (beslissing) |
| 9 | Nachtploeg opent na 1846, terwijl het concept "na de campagne" zegt. | — | Ik zou het zo laten (de lus en dagseed zijn dan bereikbaar), maar het in het verslag vastleggen (beslissing) |
| 10 | Testhaken (`__kvAuto`, `__kvTest`, `__kvFast`) en compacte schrijfstijl. | — | Haken achter een vlag of verwijderen, langste regels uitsplitsen (klein) |
| 11 | Molenstenen en walsen steken over de schachtwanden; geldt ook voor A. | `compare/shots/b-07-l2-1867-start.png` | Cosmetisch, laag (klein) |

**Ter info, als iets uit A wordt hergebruikt:** A's bugs zijn de jaartal-teller (`compare/shots/a-30-odometer-end.png`), de dagseed-divergentie (`compare/daily.js`), de top-5 die alleen via "Opslaan" wordt bewaard (`shots/night-name-400x800.png`), de dubbele Vaultwarden-knipoog, de eerste verdieping na 1,1 s in 2026 en de wand-gegenereerde gaten (`compare/gapdist.js`). Die horen niet mee over te komen.
