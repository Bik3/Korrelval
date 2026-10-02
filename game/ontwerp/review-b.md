# Review Korrelval versie B: taal, toon en feiten

Bestand: `scratchpad/korrelval-b.html` (1.526 regels). Regelnummers hieronder verwijzen naar dat bestand.

## Aanpak

- Alle zichtbare Nederlandse tekst gelezen: DOM-schermen (titel, pauze, weegbon, game-over, jaarverslag, scores, over), `LEVELS`, `SHIPS`, `FACTS`, `BADGES`, `UIT`, `PICK_TIPS`, canvas-teksten (HUD, banner, intro, tips, tutorial), toasts, aria-labels en de deelregel.
- Getoetst aan `spelmateriaal.json` (one_liners, numbers, process_steps, visual_identity, avoid, hazards), `profiel.md` (incl. "Tegenstrijdigheden"), `bouwopdracht.md` (Feitelijke spelregels, Correcties insider-jury, Taal en toon) en `jury-insider.json` (fact_concerns). Voor de 1867- en 1881-feiten ook `koopmans-site.md`.
- Lengtes gemeten, niet geschat: het spel gerenderd in headless Chromium op 400x800 (2x) met de echte Nunito en La Belle Aurore (lokaal opgehaald), canvas-teksten gemeten met `measureText`, alle schermen bekeken als screenshot. Het originele bestand is niet aangepast; de voorgestelde uitmaling-patch is gecontroleerd op een kopie (nul fouten).

Prioriteit: H = feitelijk onjuist of misleidend, M = zichtbaar defect of onjuiste formulering, L = stijl of consistentie.

## Samenvatting

- Geen overtreding van de harde verboden uit de opdracht gevonden (zie lijst bij 2). Verplichte regels staan er allemaal, woordelijk.
- Eén ontwerpkeuze is echt fout: de uitmaling-labels lopen omgekeerd (perfect = Volkoren). Vijf rijen in de tabel (1 t/m 5) horen daarbij. Voorstel in deel 3.
- Eén feitelijke fout die uit het bronmateriaal is meegekomen: moederkoren is geen onkruidzaad maar een schimmel (rij 6).
- Twee tekstregels lopen op 400 px uit het intropaneel: de Dollard-schipregel (383 px in een paneel van 356 px) en de titel "Stoommeelfabriek Friso, Leeuwarden" (361 px).
- Dan een handvol grammatica- en consistentiefouten (o.a. "1 verdiepingen", "Generaties lang draaide hier het vakmanschap", "hit" en "pick-ups" in badge-uitleg).

## 1. Tabel met concrete fixes

| # | Regel | Prio | Huidig | Voorstel | Reden |
|---|-------|------|--------|----------|-------|
| 1 | 1295 (`uitHTML`) | H | `Jouw uitmaling: 100% (20 van 20 perfect): Volkoren, 100%. Witter = minder uitmaling.` | `Precisie 100%: 20 van 20 perfect. Jouw meel: Short patent, uitmaling circa 45%. Witter = minder uitmaling.` | Een foutloze run krijgt het minst witte label, terwijl de korrel door het knak-effect juist witter wordt en dezelfde zin "witter = minder uitmaling" zegt. Daarnaast twee verschillende percentages in één zin (bijv. "40%" naast "circa 45%", of "0%" naast "Short patent, circa 45%" zoals in het eigen testrapport `shots-b/report.json`). Zie deel 3. |
| 2 | 325-330 (`UIT`), 1291 (`uitLabel`) | H | `{id:'sp', max:55 ...}, {id:'lp', max:70 ...}, {id:'sg', max:88 ...}, {id:'vk', max:101 ...}` (weinig perfect = Short patent, alles perfect = Volkoren) | Omgekeerd met `min`-drempels: Short patent vanaf 90%, Long patent vanaf 75%, Straight grade vanaf 50%, anders Volkoren. Code in deel 4.1. | Meer precisie = zuiverder, witter meel = lagere uitmaling. De 75%-grens valt samen met de badge Vakmanschap (75%), zodat badge en label hetzelfde vertellen. |
| 3 | 1356 | H | `Uitmalingsbonus` | `Precisiebonus` | De bonus beloont perfecte passages. Onder de oude naam beloon je "hogere uitmaling", dus grover meel. |
| 4 | 1307 (`shareLine`) | H | `... , 100% uitmaling` | `... , Short patent, 100% perfect` | In de gedeelde regel klinkt "100% uitmaling" als een topprestatie, terwijl het volkoren betekent. De nieuwe vorm is voor een collega direct te begrijpen. |
| 5 | 213 (Over, Uitmaling) | H | `Short patent circa 45%, long patent circa 65%, straight grade 75-76%, volkoren 100%. Witter = minder uitmaling. In het spel is jouw uitmaling het aandeel perfecte passages.` | `Uitmaling is het deel van de korrel dat in het meel eindigt: short patent circa 45%, long patent circa 65%, straight grade 75-76%, volkoren 100%. Witter = minder uitmaling. In het spel bepaalt je precisie het meel: hoe vaker je midden door de spleet valt, hoe witter het meel en hoe lager de uitmaling. Volkoren is niet slechter, alleen anders: de hele korrel, zemel en al.` | De oorspronkelijke zin zegt letterlijk dat meer perfecte passages een hogere uitmaling geven, dus grover meel. Ook ontbreekt een uitleg van het woord "uitmaling" zelf. |
| 6 | 280 (supply 2008), 798 (tip) | H | `Onkruidzaad zoals moederkoren gaat er in de reiniging uit.` en `Moederkoren is onkruidzaad: de reiniging haalt het eruit.` | `De reiniging haalt giftig moederkoren uit het graan.` (280 px) en `Moederkoren is een giftige schimmel in de aar: de reiniging haalt het eruit.` (2 regels) | Moederkoren (Claviceps purpurea) is een schimmel, geen onkruidzaad. De fout komt uit `spelmateriaal.json` (hazards) en `bouwopdracht.md` ("onkruidzaad (moederkoren)") en is overgenomen. De bewering past wel bij de eis dat het een reinigingsgevaar is, dus de rest van de framing blijft staan. |
| 7 | 293 (`SHIPS[2]`), 1247 | M | `Aan de loskade: Groninger baktarwe van Dollard Tarwe, circa 500 ton.` | `Groninger baktarwe, circa 500 ton` (regel 280 px). Alternatief als de naam moet blijven: `baktarwe van Dollard Tarwe (circa 500 ton)` (329 px). Plus `maxWidth` op de fillText, zie 4.2. | Gemeten 383 px in een paneel van 356 px: de regel steekt aan beide kanten uit het paneel (zichtbaar in Molen B en Nachtploeg bij 1 op 5 runs). Geen `maxWidth`, dus geen vangnet. |
| 8 | 265 (`title`, `short`), 1243 | M | `Stoommeelfabriek Friso, Leeuwarden`; `short: 'Friso'` | `Stoommeelfabriek, Leeuwarden`; `short: 'Leeuwarden'` | Titel is 361 px in een paneel van 356 px. Bovendien zegt de wist-je-dat op regel 300 zelf "later Friso genoemd" (profiel en site: de naam Friso volgt na de overname), dus de titel in 1867 loopt vooruit op de tijd. Nieuwe titel is 295 px. |
| 9 | 1309, 1381 | M | `1 verdiepingen` (en op het game-overscherm `Nachtploeg · Korrel van de dag, 2 okt · 1 verdiepingen`, waarbij de "1" aan het regeleinde achterblijft) | `1 verdieping` / `37 verdiepingen`, met vaste spatie tussen getal en woord. Code in 4.4. | Meervoud bij 1. Gereproduceerd: de deelregel van een Nachtploeg-run met 1 verdieping geeft "1 verdiepingen". |
| 10 | 181 (jaarverslag) | M | `Je viel door alle molens van de tijdlijn. Generaties lang draaide hier het vakmanschap; nu draaide jij mee.` | `Je viel door alle molens van de tijdlijn. Generaties lang draaiden hier de molens op vakmanschap; jij draaide een rondje mee.` | "Vakmanschap draaide" is geen werkende zin, "nu" met verleden tijd botst, en de zin klinkt als gegenereerde aforisme. |
| 11 | 789 (tip bij eerste gevaar) | M | `Reiniging: stenen en metaal mogen nooit op de walsen.` (ook in 1846 en 1867) | In levels met `lv.old`: `Reiniging: stenen en metaal mogen nooit tussen de molenstenen.` Code in 4.3. | In 1846 en 1867 zijn er volgens de opdracht molenstenen en een buil, geen walsen. De eerste tip die de speler ziet gebruikt toch "walsen" (en in 1846 komt er nog geen metaal voor). |
| 12 | 1425 (`nightNote`) | M | `eindeloos, één korrel, zelfde schacht voor iedereen` | `eindeloos, één korrel` | Op 400 px breekt dit naar twee regels met weesregel "iedereen". Bovendien klopt "zelfde schacht voor iedereen" alleen voor Korrel van de dag; Vrije dienst gebruikt een willekeurige seed (regel 1325). Wil je de uitleg houden: zet `<small>iedereen dezelfde schacht</small>` in de knop Korrel van de dag (zelfde patroon als Gezel-modus). |
| 13 | 197 | M | `Kernwaarden` (kop boven 6 badges) | `Badges` | "Elke korrel telt" is een slogan, geen kernwaarde (de kernwaarden zijn vijf). De kop klopt nu niet met de inhoud. |
| 14 | 319, 320, 1303, 1441 | M | `een molen zonder hit`, `alle pick-ups van een molen` | `een molen zonder botsing`, `alle bonussen van een molen` | Engels in Nederlandse UI. Bovendien staan de uitleggen alleen in het `title`-attribuut: op een telefoon (touch) is nergens te zien hoe je een badge verdient. Eenvoudige oplossing: badge tikbaar maken met `toast(b.name + ': ' + b.desc)` (4.5). |
| 15 | 301 | M | `De eerste stoommachine in Leeuwarden had 2 pk. Dat bleek al snel te weinig.` | `De stoommachine van de overgenomen fabriek had 2 pk. Dat bleek al snel te weinig.` (81 tekens) | "De eerste stoommachine in Leeuwarden" leest als de eerste van de stad; de bron (Wikipedia, via `koopmans-site.md`) zegt alleen dat de machine van de overgenomen fabriek van Wybrandi 2 pk had. Bovendien staat bijna dezelfde zin als introregel (268) in hetzelfde level, dus 1 op 3 kans op dubbele tekst op de weegbon. |
| 16 | 303 | M | `In 1920 werd het N.V. Koopmans' Meelfabrieken, met de broers Uco, Daan en Jo.` | `In 1920 werd het bedrijf de N.V. Koopmans' Meelfabrieken. De broers Uco, Daan en Jo namen het over.` (99 tekens) | "werd het N.V. ..." is grammaticaal onhandig, en "met de broers" is vaag. De site zegt dat de drie broers het bedrijf overnamen. Geen woord over consumentenproducten, dus geen risico op de Dr. Oetker-lijn. |
| 17 | 306 | M | `Het oudste deel van de loskade aan het Nieuwe Kanaal was uit 1927.` | `Het oudste deel van de loskade aan het Nieuwe Kanaal stamde uit 1927. In 2024 werd de kade vervangen.` (101 tekens) | Verleden tijd zonder reden lijkt een fout. De kade is in 2024 vervangen (profiel en `numbers`); dat noemen maakt de zin kloppend. |
| 18 | 280 (intro 2008) | M | `Een nieuwe molen: fijner geribbelde walsen en sneller schuddende plansichters.` | `In 2008 opent een nieuwe molen: smallere spleten en sneller schuddende plansichters.` (2 regels) | Het bronmateriaal zegt alleen "2008: opening nieuwe molen". "Fijner geribbelde walsen" is een verzonnen technisch detail over een echte molen, en het beeld spreekt het tegen: in 1920 worden 24 ribbels getekend, in 2008 slechts 12 (regels 271 en 279), dus 2008 ziet er grover uit. Zie ook deel 5. |
| 19 | 272 (intro 1920) | L | `De N.V. groeit. Walsenstoelen en plansichters doen hun intrede: de spleten worden smaller.` | `De N.V. groeit. Nu draaien er walsenstoelen en plansichters, en de spleten worden smaller.` | "Doen hun intrede" stelt dat Koopmans ze in 1920 invoerde. Het profiel zegt dat we het aantal walsenstoelen niet weten. De opdracht eist alleen dat ze pas vanaf level 3 voorkomen; de neutrale formulering voldoet daaraan. |
| 20 | 281 (titel Molen B) | L | `Molen B, 180 jaar` | `Molen B` | Leest alsof Molen B zelf 180 jaar oud is. De 180 jaar staat al in de introregel ("Jubileumjaar 2026"). Weegbon-regel wordt `2026 · Molen B`. |
| 21 | 120 (titel, lead) | L | `Je bent één tarwekorrel in een torenhoge meelfabriek. Glip door de spleet tussen de walsen, door 180 jaar molengeschiedenis.` | `Je bent één tarwekorrel in een torenhoge meelfabriek. Glip door de spleet tussen de walsen en val door 180 jaar molengeschiedenis.` | De tweede "door" zonder werkwoord is dubbelzinnig. Parallelle zin is helder en even lang. |
| 22 | 332 | L | `Boekweit is geen graan, maar wel glutenvrij.` | `Boekweit is geen graan en dus van nature glutenvrij.` | "maar wel" suggereert een tegenstelling; het is juist een gevolg (bron: "familie van de duizendknoop, en dus glutenvrij"). |
| 23 | 333 | L | `Conditioneren: normaal 12 tot 48 uur intrekken. Hier 3 seconden.` | `Conditioneren: water trekt normaal 12 tot 48 uur in. Hier duurt het 3 seconden.` | Zonder onderwerp en met losse infinitief. Nieuwe zin past nog op 2 regels. |
| 24 | 335 | L | `Magneet: metaal eruit, het mag nooit op de walsen.` | `Magneet: haalt metaal eruit. Dat mag nooit op de walsen.` | Komma-splice. Magneten komen pas vanaf 1976 voor, dus "walsen" klopt hier. |
| 25 | 293 (`SHIPS[0]`, `SHIPS[4]`) | L | `Friese tarwe van boeren uit de buurt`; `EKO-tarwe, apart gelost (Skal)` | `Friese tarwe`; `EKO-tarwe (Skal)` | "Uit de buurt" en "apart gelost" staan in geen enkele bron; de opdracht noemt alleen "Friese tarwe" en "EKO-tarwe (Skal)". |
| 26 | 1316 (toast) | L | `Gekopieerd. Plak hem in Teams.` | `Gekopieerd. Plak de score waar je wilt.` | Noemt een Microsoft-product en veronderstelt dat het spel binnen een bedrijf wordt gespeeld; het is een fan-spel dat ook buiten Koopmans wordt gedeeld. |
| 27 | 206 | L | `Over Korrelval` (kop; knop en aria heten "Over dit spel") | `Over dit spel` | Zelfde scherm, twee namen. |
| 28 | 210 | L | `Midden door is een perfecte passage.` | `Wie midden door de spleet valt, haalt een perfecte passage.` | Elliptische zin zonder werkwoord. |
| 29 | 130, 217 | L | `Sturen: pijltjes of A/D, de muis, of sleep met je duim. P pauze, M geluid.` en `Pijltjes of A/D, de muis, of sleep met je duim (...)` | `Sturen met pijltjes, A/D, de muis of je duim. P: pauze, M: geluid.` en `Sturen kan met de pijltjes of A/D, de muis of je duim (de korrel volgt je beweging). ...` | Opsomming van zelfstandige naamwoorden gevolgd door een gebiedende wijs; ook P/M zonder dubbele punt wijkt af van de pauzeschermtekst. |

Aantallen: 6 x H (waarvan 5 één ontwerpkeuze), 12 x M, 11 x L.

## 2. Geverifieerd OK

**Verboden uit de opdracht en `avoid`**

- Dr. Oetker komt alleen voor in de verplichte creditsregel (regel 208). Nergens pannenkoeken, poffertjes, supermarktpakken of Koopmans-consumentproducten. "bakmixen" staat uitsluitend in die regel. Prémax-mixen zijn bakkersmixen (B2B) en worden als zodanig genoemd.
- Geen Cambuur, geen sponsoring, geen Elfstedentocht, geen skûtsje.
- Geen namen van huidige medewerkers. Wel genoemd: Uilke Klazes Koopmans, zoon Jan, de broers Uco, Daan en Jo en Hein Blok Wybrandi. Allemaal historisch en expliciet toegestaan (opdracht r. 62).
- Geen exacte datum voor Molen B. Alleen "Jubileumjaar 2026" en "Molen B" als tijdperk. Geen "3 juli", geen "eind 2026".
- Geen "zeven generaties": alleen "Generaties lang" (regel 181).
- Geen "patentbloem" in de UI. De eindlabels zijn short patent, long patent, straight grade, volkoren, met de regel "Witter = minder uitmaling" (de richting van de labels is het probleem, niet de termen).
- Walsenstoelen en plansichters pas vanaf level 3: `LEVELS[0]` en `[1]` gebruiken `molen` en `buil`; HUD-stappen heten in 1846 en 1867 "Malen" en "Builen". Level 2 speelt aan het Noordvliet (regel 268); Nieuwe Kanaal komt pas in level 4 (regel 276) en in een feitenkaart (306).
- Verhuizing alleen als "In 1867 nam Koopmans in Leeuwarden een stoommeelfabriek over" (268, 300); 1856 komt alleen voor in de mislukte-tarwegrap (835) en nooit als verhuisjaar.
- Kroon: vijfpuntskroon (icon `crown`, regel 476), geen drie bogen of bolletjes. Als decoratie een korenaar (icon `aar`). Geen logoreproductie.
- Geen stofmeter, geen explosiegrens, geen stofexplosie: stof is puur cosmetisch, stoomwolken in 1867 zijn sfeer.
- Geen graanklander, geen Stuifarme Strooibloem, geen quizvragen, geen medailles met productnamen, geen Markermeer, geen kwaliteitsrangorde bij silo's (doelsilo is per run willekeurig, regel 630).
- Prémax-rangen kloppen exact met de gecorrigeerde opdracht: 5 Slotermeer, 10 Fluessen, 15 Tjeukemeer, 20 Princenhof, 25 Bonkevaart (regel 239), en de uitleg zegt "Prémax-mixen met Friese waternamen" (211). Opmerking: een oplopende reeks van echte productnamen suggereert vanzelf een volgorde; dat is door de opdracht zo bedoeld en hier niet als fout aangemerkt.
- Krantencijfers hebben "circa" of "zo'n": 120 ton per uur (313), vier schepen per week en 1.000 ton (312), 500 ton Dollard (293), 3.500 tot 6.000 kilo (310), 1.800 broden per ton (215, 1299). Eén noemer voor de broodomrekening.
- Niet-krantencijfers terecht zonder "circa": 1.550 gulden, 2 pk, 720 tot 760 kilo (internationale bron), 12 tot 48 uur.
- Oprichter als "Bakkersgezel Uilke Klazes Koopmans" (264).
- Gevaren zijn overal als reinigingsdingen verwoord, nooit als "zit in de bloem" (210, 280, 789, 798, 335).
- Kiempje-tip woordelijk "De kiem gaat apart: de olie maakt meel ranzig." (337).

**Verplichte regels**

- Fan-made-disclaimer op het titelscherm, woordelijk: "Fan-made door een stagiair, geen officiële uiting van Royal Koopmans." (131, herhaald op 207). "Fan-made" is Engels, maar de opdracht (r. 30) schrijft deze tekst letterlijk voor.
- Dr. Oetker-regel in Over/credits (208), letter voor letter gelijk aan de opdracht.
- Vaultwarden-knipoog: precies één keer, "Bewaar je wachtwoorden in de kluis, niet je highscore." (199) op het scorescherm. Geen "kluis: ok", geen wachtwoord op een briefje.
- Friese knipogen op de juiste plek en correct gespeld: "It giet oan!" (startknop), "Tsjoch!" (combo-rang, 1212), "Oant moarn" (game-over, 161).
- Badges voor alle vijf kernwaarden plus Elke korrel telt; voorwaarden kloppen met de opdracht (75% perfect, level zonder hit, alle pick-ups, 100 verdiepingen, Gezel uitgespeeld).
- "Korrel van de dag" en "Vrije dienst", "Gezel-modus" met uitleg, "Kopieer score", "Nog een korrel?".

**Wist-je-dat-kaartjes** (regels 299-315)

- Alle 17 regels zijn kort genoeg: langste is 104 tekens (limiet 120). Eén per kaart.
- Feiten kloppen met `spelmateriaal.json`, `profiel.md` en `koopmans-site.md`: 1846 paardenmolen, 1867 overname van de fabriek van Wybrandi, Jan Koopmans en veevoer van gerst en maïs (302; "Na 1881" volgt de opdracht, r. 62), 1976 Juliana, 1993 LaCo Crumbs, loskade 1927, Molen B vervangt de molen uit 1967 en de molen uit 1965 wordt roggemolen, eerste Nedertarwe-schip op HVO100 in februari 2024, KIEM (2016).
- Jaarverslag-kaart (185): Urban Tarweveld in de wijk Middelsee bij de stoplichten klopt.

**Taal en getallen**

- Spelling nagekeken op alle zichtbare woorden: o.a. ontoereikend, molengeschiedenis, boekweitmolen, hoogmaalderij, moederkoren, volcontinu, stoommeelfabriek, kopiëren, officiële. Geen typefouten gevonden buiten de genoemde rijen.
- Getalnotatie nl-NL (1.234 kg, 3,9 bulkcellen), maandafkortingen (mrt, okt) en "x" als vermenigvuldigteken zijn consistent.
- Terminologie consistent: molen (niet level), verdieping, spleet, bloem, Nachtploeg, Korrel van de dag.
- Aria-labels zijn Nederlands.
- Engelse termen die bewust blijven: short patent, long patent, straight grade (vakjargon dat de opdracht voorschrijft en dat de Over-tekst uitlegt), highscore, combo, Top 5, Scores.
- Toon: nuchter, geen spot met bedrijf of medewerkers. "Partij afgekeurd" gaat over de speler, niet over de fabriek. De grap in 1846 ("1856: de rosmolen bleek niet geschikt voor tarwe.") is historisch en komt uit de opdracht.

**Lengtes op 400 px (gemeten)**

- Alle 7 introregels vallen in 2 regels (breedte 330 px, maximum dat `drawIntro` toont).
- Alle supply-regels passen in het paneel van 356 px, behalve de Dollard-schipregel (rij 7). Langste daarna: moederkoren 318 px.
- Alle tips breken in maximaal 2 regels. Banner (148 px), HUD-nachtregel (147 px), kaartknoppen, jaarchips en badges passen.

## 3. Uitmaling-label: oordeel en voorstel

### 3.1 Oordeel over de huidige koppeling

De koppeling "perfecte passages / totaal = uitmaling, 100% = Volkoren" is als beloning niet zinvol, om vijf redenen:

1. **Tegenstrijdig met het spel zelf.** Elke perfecte passage laat de korrel witter worden (knak-effect, `G.knaks`, regel 1107), terwijl het eindscherm zegt "witter = minder uitmaling" en een foutloze run toch "Volkoren, 100%" noemt. In één scherm zeggen beeld en tekst het tegenovergestelde.
2. **De trap loopt omgekeerd.** Wie slecht speelt, krijgt "Short patent": in de meelwereld juist het zuiverste, meest selectieve meel. Het eigen testrapport (`shots-b/report.json`) laat het zien: "Jouw uitmaling: 0% (0 van 3 perfect): Short patent, circa 45%". Een speler leest dat als straf of als fout, en de insider-jury maakte over Patentbloem exact dezelfde omkering al aan als punt.
3. **Twee getallen in één zin.** "Jouw uitmaling: 80%" naast "Straight grade, 75-76%" laat de speler denken dat een van beide fout is. Het getal van de speler is geen uitmaling, het is precisie.
4. **De bijbehorende termen kloppen niet meer.** "Uitmalingsbonus" beloont perfectie met "meer uitmaling", dus grover meel; de gedeelde regel zegt "100% uitmaling" voor het beste resultaat.
5. **Enige verdedigbare lezing is merkgebonden:** "Wij halen alles uit graan" (100% uitmaling = alles eruit). Dat is aardig, maar het vraagt een speler om aan te nemen dat "veel eruit halen" beter is, wat de eigen regel "witter = minder uitmaling" en het beeld ondermijnt. Niet aanbevolen.

### 3.2 Voorstel: precisie bepaalt hoe wit en zuiver je meel is

Echte molenlogica: patentmeel is een selectie van alleen de zuiverste (witste) maalstromen, daardoor een lage uitmaling. Wie in het spel vaker precies midden door de spleet valt, "selecteert" dus zuiverder en haalt een lagere uitmaling. Dat klopt feitelijk, het past bij de wittere korrel en het is voor een speler meteen te lezen: hoger boven = fijner meel.

| Perfecte passages | Label | Uitmaling | Toelichting (optioneel, voor About of `title`) |
|---|---|---|---|
| 90% of meer | Short patent | circa 45% | alleen de allerwitste meelstromen |
| 75% tot 89% | Long patent | circa 65% | het witte hart met wat extra stromen |
| 50% tot 74% | Straight grade | 75-76% | alle witte meelstromen samen |
| minder dan 50% | Volkoren | 100% | de hele korrel, zemel en al |

Waarom deze grenzen:

- 75% is de grens van de badge Vakmanschap (regel 1345). Wie die badge haalt, ziet ook minimaal Long patent. Dat voelt consistent.
- 50% laat Straight grade het gebruikelijke middenveld worden voor spelers die het spel redelijk beheersen; Volkoren is dan een eerlijke "ik zat er nog niet op"-uitkomst en niet vernederend.
- De autopilot uit de test haalt 99% tot 100%, dus de bovengrens is haalbaar maar niet makkelijk. Grenzen zijn een getal in `UIT`; bijstellen na een speeltest kost niets.
- De formulering blijft respectvol voor volkoren (Koopmans verkoopt het zelf): "niet slechter, alleen anders".

Let op: "De kiem gaat apart" (tip en pick-up) geldt voor witte bloem. Houd de volkoren-toelichting daarom bij "zemel en al" en noem de kiem er niet bij.

### 3.3 Exacte teksten

- Weegbon, game-over en jaarverslag (`uitHTML`):
  - `Precisie <b>${pct}%</b>: ${perf} van ${total} perfect. Jouw meel: <b>${u.name}</b>, uitmaling ${u.note}. Witter = minder uitmaling.`
  - Voorbeelden: `Precisie 100%: 20 van 20 perfect. Jouw meel: Short patent, uitmaling circa 45%. Witter = minder uitmaling.` en `Precisie 15%: 3 van 20 perfect. Jouw meel: Volkoren, uitmaling 100%. Witter = minder uitmaling.` (beide gerenderd op 400 px: twee regels)
  - Leeg geval ongewijzigd: `Nog geen passages gemeten.`
- Bonusregel op de weegbon: `Precisiebonus` (was `Uitmalingsbonus`).
- Deelregel: `... , goed voor circa 14.200 broden, combo Fluessen, Long patent, 75% perfect`
- Over, kop Uitmaling: tekst uit rij 5.
- Scorescherm: kop `Uitmalingen gezien` en de kleine regel `witter = minder uitmaling` kunnen blijven. De volgorde Short patent, Long patent, Straight grade, Volkoren blijft ook hetzelfde (oplopende uitmaling).
- Titelbadge `Alle vier uitmalingen gezien` kan blijven; Volkoren is dan wel de enige trede die je zelf "slecht" moet spelen, wat een leuke verzamelopdracht is.

### 3.4 Waarom niet de alternatieven

- Mapping laten staan en alleen de uitleg bijschrijven: lost de tegenstrijdigheid met beeld, bonus en deelregel niet op.
- Labels helemaal loskoppelen van precisie (bijv. op basis van score): verliest de mooie link tussen vakmanschap, witter meel en uitmaling.
- Volkoren bovenaan zetten als "beste": zou de woorden "witter = minder uitmaling" voor het hele spel omkeren en het beeld (witter bij perfect) onwaar maken.

## 4. Code bij de tabel

### 4.1 Uitmaling (rijen 1 t/m 4)

Vervang regel 325-330, 1291, het teruggegeven sjabloon in 1295, de rij `Uitmalingsbonus` (1356) en de `uit`-variabele in `shareLine` (1307, binnen dezelfde `const`-lijst als `kg` en `br`):

```js
const UIT = [
  { id: 'sp', min: 90, name: 'Short patent',   note: 'circa 45%' },
  { id: 'lp', min: 75, name: 'Long patent',    note: 'circa 65%' },
  { id: 'sg', min: 50, name: 'Straight grade', note: '75-76%' },
  { id: 'vk', min: 0,  name: 'Volkoren',       note: '100%' },
];
function uitLabel(pct) { return UIT.find(u => pct >= u.min) || UIT[UIT.length - 1]; }
function uitHTML(perf, total) {
  if (!total) return 'Nog geen passages gemeten.';
  const pct = Math.round(perf / total * 100), u = uitLabel(pct); save.labels[u.id] = 1; persist();
  return `Precisie <b>${pct}%</b>: ${perf} van ${total} perfect. Jouw meel: <b>${u.name}</b>, uitmaling ${u.note}. Witter = minder uitmaling.`;
}
// in shareLine, in plaats van  uit = run.total ? Math.round(...) + '% uitmaling' : '':
const pc = run.total ? Math.round(run.perfects / run.total * 100) : null,
      uit = pc === null ? '' : `${uitLabel(pc).name}, ${pc}% perfect`;
```

Gecontroleerd op een kopie van het spel: geen console-fouten, `UIT.every(...)` voor de titelbadge werkt ongewijzigd. Verander `SAVE_KEY` (regel 363) naar `korrelval-b-v2` als er al spelers met opgeslagen "uitmalingen gezien" zijn, want die vlaggen horen bij de oude betekenis.

### 4.2 Vangnet tegen overlopende introregels (rijen 7 en 8)

```js
ctx.fillText(lv.title, 200, 160, 330);                                   // regel 1243
ctx.fillText(lv.supply || `Aan de loskade: ${run.ship}.`, 200, 219, 330); // regel 1247
```

`fillText` met `maxWidth` perst een te lange regel horizontaal samen in plaats van uit het paneel te laten steken. Gecontroleerd: de oude Dollard-regel past er dan nog net in (iets gedrongen), dus kort de tekst óók in (rij 7).

### 4.3 Tip voor de molenstenen-levels (rij 11, regel 789)

```js
tip(lv.old ? 'Reiniging: stenen en metaal mogen nooit tussen de molenstenen.'
           : 'Reiniging: stenen en metaal mogen nooit op de walsen.', 2.6);
```

### 4.4 Meervoud verdieping (rij 9)

```js
const fl = n => n === 1 ? '1 verdieping' : n + ' verdiepingen';   // bij de hulpjes, sectie 3
// regel 1309:  ${fl(run.passed)}      regel 1381:  ${fl(run.passed)}
```

### 4.5 Uitleg van badges ook op touch (rij 14, regels 1303 en 1441)

```js
s.title = b.desc; s.onclick = () => toast(b.name + ': ' + b.desc);
```

## 5. Restpunten buiten de tekst zelf

- **Opmaak Over-scherm (regel 101):** `.about p{margin:0}` wint van `.card>*+*`, waardoor de disclaimer en de Dr. Oetker-regel zonder witruimte op elkaar plakken (zichtbaar op de screenshot). Voorstel: `.about p+p{margin-top:10px}`.
- **Opmaak titelscherm (regel 68):** `.hint{margin:0}` laat de regel "Sturen: ..." (130) direct onder de knoppen plakken. Voorstel: `.card>.hint{margin-top:10px}`.
- **Ribbels tegenover tekst (regels 271, 275, 279, 993):** het spel tekent in 1920 24 ribbels, in 1976 18, in 2008 12. Dat leest als steeds grover, terwijl de tekst "grof geribbeld" (1920) en "fijner geribbeld" (2008) zegt. Voorstel: 1920 `ribs: 12`, 2008 `ribs: 24` en regel 993 `f.ribs < 15 ? 2.2 : 1.5`. Of laat de "fijner"-claim vallen (rij 18) en het beeld staan.
- **Taalattribuut:** het bestand zet zelf geen `lang`. Controleer of het publicatieskelet `lang="nl"` zet; zo niet, voeg `document.documentElement.lang = 'nl'` toe in `start()` (uitspraak door schermlezers, afbreking, spellingscontrole).
- **Toplijst (regel 1437):** `verd.` en `· dag` zijn compact en passen, maar `· dag` naast een datum is ambigu. Optioneel: `· van de dag` (past nog net).
- **Testbestanden:** hulpscripts, metingen en screenshots staan in `scratchpad/review-r/` (o.a. `patched.html` met de uitmaling-patch). Niets in `korrelval-b.html` is gewijzigd.
