# Verslag jaarintro 2008 (de nieuwe molen)

Werkbestand: `jaar/2008/korrelval.html`, alleen het gebied tussen de merkregels van 2008 (alle namen `j08`). Buiten het gebied is het bestand gelijk aan `frame-base.html`. Beelden: `jaar/2008/kijk/` (sheets per formaat).

## Bijgewerkt na de reviews (art.json en tech.json)
1. **Molengebouw 2008 gesloten (hoog).** De drie ramen van de controlekamer, beide gele deuren, de deurlampjes, de avond-TL en de gele weerspiegeling op de kade zijn weg. Het is nu een gesloten blok lichtgrijze panelen met dakrand, plint, filterkast en drie pijpjes, net als in 2026. Geel zit buiten alleen nog in de kraan en zijn stellage (plus de gele deur van de oude silotoren). De desc van shot 1 zegt nu "het hoge, gesloten lichtgrijze molengebouw".
2. **Shot 2, de korrel.** De gouden lijn stopt boven het glazen inlaatstuk en loopt pas onder de walsen verder. Er lopen ook geen pulsjes door de inlaat. De lijn is dofter (#BF9A55, 's avonds #B89458) en smaller (1,2 in plaats van 1,5). De korrel is weer het helderste goud.
3. **Daken in vooraanzicht.**
   - De schuine dakvlakken en dakdozen zijn weg. Overal staan nu smalle bovenranden, met dakopbouw als vlakken op de daklijn: dakhuis met cyclonen op de molen uit de jaren zestig, filterkast en pijpjes op het nieuwe gebouw. Zo is het ook in 1976 en 2026.
   - De loodsen op het terrein hebben een dakrand in vooraanzicht.
   - De "losse plank" links van groep A was een fout: bij een eerdere vervanging was de kop van silogroep B naar x -640 geschoven. Hij staat weer op x -368.
4. **Telefoon.** Het staande eindvak ligt circa 15% naar links (eindmidden x -20 in plaats van 70). Silogroep B staat nu naast de molen uit de jaren zestig en het nieuwe gebouw; de silotoren valt rechts deels weg. Liggend is niets veranderd.
5. **Titel.** Hij staat nu naast de buis, op x 28% en y 27%, op rustig graan, in donkere inkt, ook 's avonds. Het graan buiten de werklamp is 's avonds donker gemaakt, en de verlichte plek onder de lamp is licht, dus donkere inkt leest daar goed.
6. **Snelheid.**
   - Geen werklampgloed meer per frame. De lichtplek zit nu in getrapte, dekkende ringen rond de zuigmond: tien ringen 's avonds, buiten de lamp donker graan. Ze worden binnen de vloer van het ruim geknipt.
   - Elke ring heeft een eigen dekkende korreltegel, voorgetekend in build, dus geen globalAlpha en geen doorzichtige patroonlaag meer.
   - De lagen ver (z 2400) en midden (z 700) zijn voorgetekende platen. Per frame is dat een kopie, geen vectorvulling.
   - De ringen worden als ringvormen getekend: buitenrand min de volgende ring, met evenodd. Zo wordt elke pixel één keer gevuld in plaats van 6 tot 10 keer over elkaar. Dat halveerde de tekentijd van het begin (donker 27-29 naar 13-15 ms per frame, dpr 1, 4x CPU).
   - Uitslag met `fps-jaar.js` (400x800, dpr 2, 4x CPU, 3 rondes om en om, mediaan):

| | hoofdShot1 | shot 1 | shot 2 | eind 1 | eind 2 | duik |
|---|---|---|---|---|---|---|
| licht | 53,2 | 53,4 (p95 33,4) | 57,3 | 59,3 | 60 | 60 |
| donker | 56,3 | 54,1 (p95 33,3) | 54,2 (p95 33,4) | 60 | 60 | 60 |

   Shot 1 donker was in de review 49,2 fps met p95 50. Nu haalt shot 1 licht de lat en zit donker er 2 fps onder, binnen de ruis, met p95 33 ms.
- **Tests na de review:**
  - `node --check`: goed;
  - `harness.js`: started, gameOver en restarted true, zonder errors;
  - `nieuwkomer.js`: 59 van 59 goed;
  - `kijk-jaar.js` (index 4, alle formaten): geen fouten, beelden bekeken;
  - `reduced.js`: 33 van 33 goed;
  - `rook-jaren.js`: alles goed;
  - samenvoegen met de andere vijf kopieën: 0 conflicten.

## Bijgewerkt na de feedback van de gebruiker (luchtfoto `jaar/ref/koopmans-kanaal-foto.png`)
De gebruiker zei dat de kade veel te groot was. Ik heb shot 1 omgebouwd naar de opbouw van de foto. Wat pas na 2008 kwam, zoals het logo op de gevel, blijft weg.
- **Smalle kade:** de kade is nu 4 m diep, was 15 m. De gevels staan vlak aan het water en het schip ligt er strak langs (11 m dichter bij de gevel).
- **Kraan:** de gele loskraan staat niet meer los op de kade. Hij staat op een gele stalen stellage tegen de gevel: poten op de kade, een bordes op circa 12 m met de machinekast, een vakwerkarm naar buiten boven het ruim en de zuigbuis recht omlaag. Een grijze buis loopt langs de gevel naar de silo's.
- **Terrein links (oost):** een breed terrein met twee lage loodsen met een zadeldak en geparkeerde bulkwagens. De bulkwagen die wegrijdt, rijdt daar nu, want op de smalle kade past geen wagen. Er waren eerst een hal en een oud pand.
- **Schoorsteen:** de bruine schoorsteen van de buurfabriek staat ver weg, verderop langs het kanaal. Hij is dun, staat in de waas van de verte achter het middenplan en is lager dan de toren in beeld. Hij steekt alleen uit boven de verre gebouwen, rechts achter het bakstenen pand, met de top ruim onder de bovenrand. In de eerste versie stond hij als enorme kolom vooraan, die boven uit het beeld liep. Staand valt hij buiten beeld; liggend staat hij circa 80% rechts.
- **Lampen:** de natriumlantaarns hangen nu aan de gevels, op 6 m. Op het terrein staan palen.
- **Ramen en deuren:**
  - het nieuwe molengebouw blijft zonder ramen (na de review ook zonder de laatste ramen en deuren, zie hierboven);
  - de oude silotoren kreeg een paar losse kleine raampjes, een grijze laaddeur en een gele deur onderaan;
  - de molen uit de jaren zestig, de silokoppen en het bakstenen pand hadden al ramen;
  - een gele buitentrap op de toren heb ik geprobeerd en weer weggehaald: op deze schaal werd het een rommel van gele stukjes.
- **Camera:** dezelfde beweging. Het eindbeeld staat nu dichter bij de gevel en zwaait iets minder naar rechts (eindmidden x 70). Staand zie je de molen uit de jaren zestig, het nieuwe molengebouw en de silotoren, met de kade als dunne strook. Liggend zie je de hele gevelrij, van het terrein met de loodsen tot de schoorsteen.

## Wat ik tekende
**Shot 1, buiten (4,8 s).** Een echte camera met brandpunt, ooghoogte en een verschoven horizon:
- **Begin:** dichtbij in het ruim. Je ziet de grijze zuigbuis met de gele mond en de donkere kop met sleuven, in een kuil in het graan. Korrels glijden de kuil in (de eerste 1,5 s). Bovenin staat de roestrode wand van het ruim. Het jaartal staat in donkere inkt boven het graan.
- **Beweging:** de camera trekt terug en omhoog, van 2,5 m tot 25 m van de mond (10 keer, op een log-schaal), van 4 m tot circa 36 m hoog, met een lichte zwaai naar rechts. Ruim, dek, kade en gevels komen in die volgorde in beeld.
- **Eind:** hoog en schuin boven het schip, op een natte, zachte winterdag:
  - het ruim als brede gouden band, met de kuil en de gestapelde grijze luiken rechts;
  - een smalle natte kade met kleine plassen;
  - de gele loskraan op zijn stellage tegen de gevel, met de arm over het ruim;
  - links het terrein met loodsen en bulkwagens (een rijdt weg);
  - de gevels: de silo's uit 1926, de grijze molen uit de jaren zestig, het nieuwe molengebouw, de lichtgrijze silotoren met zijn cellen, het bakstenen pand en een loods;
  - daarachter kale bomen, de stad in de nevel en een laag, plat, grijs wolkendek met een lichtere plek laag links.
- **Avond (half zes):** natriumlantaarns met lichtplekken op de natte klinkers en gebroken lichtstrepen in het water. Verder:
  - de werklamp van de kraan maakt een warme plek op het graan, in getrapte ringen binnen het ruim; buiten de lamp is het graan donker;
  - het nieuwe molengebouw blijft een donker, gesloten blok;
  - verlichte ramen in de molen uit de jaren zestig en in het bakstenen pand;
  - een verlicht stuurhuis;
  - de koplampen en achterlichten van de wagen;
  - wolken die van onderen bruinoranje oplichten.

**Shot 2, binnen (5,0 s).** Het molengebouw in doorsnede, als bouwtekening: gearceerde snijvlakken met een fijne lijn, peiltekens links en fijne omlijningen. Van boven naar beneden:

| Verdieping | Wat er staat |
|---|---|
| dak | filterkast en drie afvoerpijpjes |
| 6 | ventilator die zuigt (onderdruk) |
| 5 | vijf cyclonen |
| 4 | twee plansichters met blauwgroene deurranden aan stangen; ze schudden |
| 3 | meelverzamelschroef |
| 2 | weegschalen en de controlekamer achter glas: drie schermen met een processchema en één lichte lijn, en een zittende operator in een witte jas met muts, zonder gezicht |
| 1 | drie walsenstoelen in doorsnede: de walsen draaien en korrels vallen in de glazen inlaten |
| begane grond | motoren met V-snaren die omhoog lopen door de vloer |

- **De gouden lijn:** één lijn met pulsjes loopt rond. Van de walsen gaat hij omlaag, door de witte buizen omhoog, de cycloon in en door de zeefkast, en dan terug naar de inlaat.
- **Buiten:** buitenstroken links (de molen uit de jaren zestig, de silo's) en rechts (de silotoren), op dz 100.
- **Camera:** een S-bocht langs de controlekamer naar de middelste walsenstoel.
- **De korrel:** hangt in het glazen stuk van de inlaat, op x 50% en y 45%. De duik gaat naar de spleet tussen de walsen (y circa 62%).
- **TL, licht en donker:** de TL brandt vast, er is geen stof. In het donkere thema is binnen iets gedempt, is het buiten avond en heeft de korrel een warme gloed.

## Vormen (wereld: 10 eenheden = 1 m; x langs de kade, links is oost; kade y 0)
**Oude silo's (1926).** Er staat nog geen vorm in `jaar/1976/korrelval.html` (stub), dus ik volgde `storyboard-1976.md`:

| Deel | x | Vorm |
|---|---|---|
| Groep A | -600 tot -400 | 5 ronde cellen van 4 m, 25 m hoog; kopgebouw tot 26,6 m; bekistingsnaden om de 2,8 m |
| Trappentoren | -400 tot -364 | 30 m, dakhuisje tot 31,4 m, raamspleten |
| Groep B | -364 tot -204 | 4 cellen van 4 m, 23,2 m; kop tot 24,6 m |

Kleuren overdag:
- groep A #A8ACAF, met lichtkant #BDC1C3 en schaduw #909599;
- groep B #A0A5A8, met #B3B8BB en #878C90;
- kop #A0A5A8;
- trappentoren #B2B7BA.

's Avonds zijn ze gemengd naar #111922 (70%). Let op: 2026 tekent nu alleen 5 cellen met de trappentoren. Dat moet 5 + trappentoren + 4 worden.

**Molen uit de jaren zestig (in 2008 grijs).** Zelfde plek en vorm als storyboard 1976:
- x -196 tot -36, 30 m hoog;
- dakhuis met drie cyclonen;
- 9 raambanden met ramen van 1,4 x 1,0 m;
- trappenhuisstrook en plint.

Kleuren:
- gevel #BEC3C6 en voegen #AAB0B3;
- ramen #56646D; 's avonds brandt circa de helft TL (#D8E4DA).

**Het nieuwe molengebouw (2006), voor 2026 precies zo:**
- **Maat en plek:** x -30 tot 210, dus 24 m breed en 30 m hoog. Het springt 2,5 m naar voren uit de gevellijn (de kade ervoor is maar 1,5 m) en staat direct rechts van de molen uit de jaren zestig.
- **Panelen:** lichtgrijze sandwichpanelen #DCE1E5, met naden #CAD1D6: horizontaal om de 3,75 m (acht verdiepingen) en flauw verticaal om de 3 m. **Gesloten blok: geen ramen, geen deuren, geen glasgevel, geen logo, geen oranje.**
- **Rand, plint en zijkant:** donkere dakrand van 0,6 m (#A2AAB1), grijze plint van 1 m (#8F9599), zijkant #B8C0C6.
- **Deuren en ramen:** geen (eerder: twee gele deuren en drie kleine ramen; weggehaald na de review).
- **Op het dak:** een filterkast van 5 x 2,2 m en drie RVS-afvoerpijpjes, in vooraanzicht op de daklijn.
- **Avondkleuren:** gemengd naar #111922 (70%): de panelen worden circa #4F555B.

**De silotoren (1981).** Dit is het silhouet van de hoofdintro, 1,15 keer zo groot:
- de schacht is 16,1 m breed en 41,6 m hoog, met de kop erop tot 45,4 m;
- hij staat direct rechts van het nieuwe molengebouw (x 214 tot 375);
- kleur lichtgrijs #D3D8DC, met lichtkant #E1E5E8 en schaduw #B5BCC2;
- fijne verticale ribbels;
- de lijsten (in de hoofdintro oranje) zijn nu grijs #A4ACB2;
- bovenin een iets donkerdere band met twee donkere sleufjes;
- een paar losse kleine raampjes (#66737C), een grijze laaddeur en een gele deur onderaan;
- zonder logo.

Rechts ervan staan, net als in de hoofdintro, vier hoge cellen tot 31,5 m (#B4B9BC) met een galerij erop.

**Verder:**
- **Kade:** 4 m diep (z 0 tot -40), met de kademuur op z -40. Het schip ligt er strak langs: het ruim loopt van z -52 tot -140, de romp staat op z -155.
- **Terrein oost:** breed, met twee loodsen (7 m hoog, zadeldak tot 9,8 m) en bulkwagens.
- **Bakstenen pand:** x 604 tot 900, 16 m, met stalen ramen.
- **Loods west:** golfplaat, 9 m.
- **Schoorsteen buurfabriek:** 70 m hoog en 5 m breed, ver weg (z 1600, tussen de verre stad en het middenplan), op x 3300. Overdag in de waas #AE8A7A (baksteenbruin gemengd met de lucht), 's avonds #2E2624.
- **Kraan:** geel #E6B417, op een stellage tegen de gevel bij x -100 tot -40.
- **Schip:** blauw (#1F2C36), met een roestrood ruim.

## Teksten zoals ze in mijn gebied staan
- **Shot 1:**
  - kicker: `Nieuwe Kanaal 2008`
  - cap (21 woorden): `Het is een natte, zachte januaridag. Naast de grijze silo’s staat het nieuwe molengebouw, hoog en licht en bijna zonder ramen.`
  - desc: `Beeld: een gele zuigmond in het graan van een binnenvaartschip; de camera gaat terug en omhoog tot je op een natte winterdag over het schip kijkt naar grijze silo’s, het hoge, gesloten lichtgrijze molengebouw, de lichtgrijze silotoren, een gele kraan tegen de gevel en een wegrijdende bulkwagen.`
- **Shot 2:**
  - kicker: `In de nieuwe molen 2008`
  - cap (25 woorden, letterlijk uit definitief.md): `De molen is volledig geautomatiseerd. Vanuit de controlekamer houdt de ploeg alles in de gaten. De machines staan op onderdruk, dus het meel stuift niet.`
  - desc: `Beeld: het molengebouw in doorsnede, met cyclonen, schuddende zeefkasten, een controlekamer met een operator in een witte jas, walsenstoelen en onderin motoren; een gouden lijn volgt het graan en de camera zoomt in op twee walsen met de korrel in de inlaat erboven.`

## fps tegen de stub
**Na de aanpassing (smalle kade):** gemeten met `fps-jaar.js` (400x800, dpr 2, 4x CPU, 3 rondes om en om). Mediaan:

| | stub | 2008 | hoofdShot1 |
|---|---|---|---|
| shot 1 | 55,4 | 44,8 | 44,6 (in dezelfde sessies) |
| eind 1 | 60 | 55,4 | |
| shot 2 | 59,8 | 44,7 | |
| eind 2 | 60 | 52,7 | |
| duik | 60 | 50 | |

Beide shots halen dus hoofdShot1. De p95 is 33 tot 50 ms, net als die van hoofdShot1 in dezelfde drukke rondes.

**Eerdere meting (voor de aanpassing),** met dezelfde opzet. De machine was erg druk.

| | stub (oud) | 2008 (nieuw) | hoofdShot1 in dezelfde meting |
|---|---|---|---|
| shot 1 (beweging) | 54,3 | 45 | 49,6 |
| eind 1 | 58 | 58,7 | |
| shot 2 (beweging) | 59,6 | 47,1 | 49,6 |
| eind 2 | 60 | 56 | |
| duik | 60 | 60 | |

De rustigste ronde (ronde 3):
- shot 1: 50,3 fps (p95 33,4 ms) tegen hoofdShot1 49,6;
- shot 2: 52,1 fps (p95 33,3 ms).

In de drukke rondes zakten hoofdShot1 en mijn shots allebei naar 33 tot 45 fps. Het canvas zakte in beide gevallen naar dpr 1.

Hoe het licht blijft:
- statische lagen staan voorgetekend: lucht, gloed, korrelstructuur, arcering en staalplaatribbels als patroon;
- de eindbeelden staan bewaard (`env.still`), met erbovenop alleen water, meeuwen, pulsjes, walsen, riemen, zeefkasten, schermlijn en korrel;
- lucht, buitenstroken en water worden alleen getekend waar ze te zien zijn;
- er is geen filter, blur of shadowBlur;
- hooguit 30 deeltjes.

## Testuitslag (opnieuw gedraaid op het definitieve werkbestand, na de aanpassing)
- `node --check` op het uitgepakte script: goed. Het bestand begint met `<title>`.
- `harness.js`: started, gameOver en restarted zijn true (telefoon en desktop), zonder errors.
- `jaar/2008/nieuwkomer.js`: 59 van 59 goed.
- `kijk-jaar.js` index 4, alle vier formaten: geen fouten. Ik heb de beelden bekeken (begin, 25, 50 en 75%, eind, titel en duik) en de eindbeelden van shot 1 naast de luchtfoto gelegd. Gevelrij, smalle kade, schip langs de kade, kraan op een stellage, loodsen links en schoorsteen verderop kloppen met de opbouw van de foto.
- `reduced.js`: 33 van 33 goed. Zelf bekeken: alleen eindbeelden, geen titel, de korrel ligt al op zijn plek met open ogen.
- `rook-jaren.js`: alles goed.
- Proef-samenvoeging met `git merge-file -p` tegen `frame-base.html`:
  - met de kopie van 2026 (die al een eigen gebied heeft): 0 conflicten, het samengevoegde script is geldig en rook-jaren is goed;
  - met 1846, 1867, 1920 en 1976: ook 0 conflicten.
- `node --check`, `reduced.js` (33 van 33) en `rook-jaren.js`: na de aanpassing opnieuw goed.
- Na het verplaatsen van de schoorsteen opnieuw gedraaid, alles goed:
  - `kijk-jaar.js` (index 4), beelden bekeken en naast de foto gelegd;
  - `harness.js`;
  - `nieuwkomer.js` (59 van 59);
  - `reduced.js` (33 van 33);
  - `rook-jaren.js`;
  - samenvoegen met alle vijf andere kopieën (0 conflicten).
- fps: niet opnieuw gemeten. De verplaatste schoorsteen is één rechthoek in plaats van een doos met zijvlak, dus niet zwaarder. De meting hierboven geldt nog.

## Twijfelpunten
1. **Silovorm.** 1976 is nog een stub, dus ik koos storyboard 1976 (5 cellen + trappentoren + 4 cellen). Komt 1976 met een andere vorm, dan moet 2008 die overnemen.
2. **Volgorde van de gebouwen** (van oost naar west: silo's, molen jaren zestig, nieuw molengebouw, silotoren, baksteen) is een tekenkeuze.
   - Het past bij de foto van 2015 (de lichte blokken oostelijk van de toren) en bij 2026 (Molen B vervangt de molen uit 1967, links van de molen uit 2008).
   - Het nieuwe gebouw staat waar in 1976 het piramidedak en een deel van het lange bakstenen pand stonden. De architect schrijft dat er gebouwen gesloopt zijn.
3. **Camera.** Het eindbeeld ligt hoger dan in de regie (circa 36 m in plaats van 14 m), anders paste het ruim niet als brede band in beeld en was de silotoren afgesneden. Door de smalle kade nemen de gevels nu circa de bovenste 45% van het beeld in.
   - Daardoor is bovenin een smalle strook lucht met de stad in de nevel te zien, dus toch een vage horizon.
   - De regie zegt "geen horizon", de gebruiker wil de silotoren zien.
4. **Cap shot 2** heeft 25 woorden (definitief.md gaat voor). Het raamwerk noemt 15 tot 24, de regie "hooguit 25". In de cap van shot 1 staat de typografische apostrof (silo’s), net als elders in het spel.
5. **De vier cellen naast de toren** horen bij het hoofdintro-silhouet. Ik teken ze lichtgrijs. De foto's van 2022 laten hoge grijze cellen naast een lichte toren zien.
6. **Tekenkeuzes zonder eigen bron:**
   - gele zuigkraan (foto's 2022; staat niet in de tekst);
   - de buitentrap heb ik weggelaten;
   - plek en uiterlijk van de controlekamer;
   - de ventilator op verdieping 6;
   - de verdiepingshoogte in de doorsnede (gestileerd);
   - de rijdende bulkwagen;
   - natriumlicht.
7. **fps.** In de rustigste ronde haal ik het budget (beide shots minstens hoofdShot1, p95 33 ms). In de mediaan over alle rondes ligt shot 1 iets onder hoofdShot1, door de drukke machine. Het eindbeeld en de duik halen 56 tot 60 fps.
8. **De foto is van nu.**
   - Op de foto staat de hoge toren met het logo aan de oostkant, naast het terrein.
   - Ik hield de volgorde die ik met 1976 en 2026 afsprak: silo's, molen uit de jaren zestig, nieuw molengebouw, silotoren, baksteen. Zo staat de toren staand in beeld en klopt het met Molen B naast de molen uit 2008.
   - Wil de gebruiker de toren aan de oostkant, dan moet dat met 1976 en 2026 samen.
   - Of de kraan in 2008 al op deze stellage stond, weet ik niet. De gebruiker vond hem bij de gevel goed.
