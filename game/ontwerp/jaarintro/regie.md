# Regie jaarintro's Korrelval

Voor de zes jaarmakers (j46, j67, j20, j76, j08, j26), de hoofdbouwer en de feitencontroleur. Dit document gaat over de vorm: camera, compositie, tempo, licht, wat er beweegt en de teksten. Het storyboard van je jaar blijft de bron voor wat je tekent en hoe het eruitziet. Wijkt dit document af van je storyboard, dan geldt dit document voor de vorm. Over feiten beslist de feitencontroleur; waar ik een tekst anders formuleer, staat in hoofdstuk 8 welke bewering het raakt.

Posities staan in procenten van het beeld boven het ondertitelpaneel (env.P), in het **staande** formaat van circa 400 × 560 css-px: x 0 is links, y 0 is boven. Liggend houd je hetzelfde middelpunt en dezelfde hoogte, en komt er links en rechts omgeving bij.

---

## 0. In het kort

1. Elke jaarintro is één korte val door de tijd: buiten zie je hoe het graan binnenkomt, binnen zie je wat de molen aandrijft, en dan valt de korrel erin.
2. Geen twee films bewegen hetzelfde. Shot 1: daling, zijwaarts, laag vooruit, zijwaarts terug, terugtrekken, stijgen. Shot 2: stijgen en omlaag kijken, de kracht volgen, door de vloeren zakken, vooruit, doorsnede, mee omlaag.
3. Elke tijd heeft een eigen seizoen, een eigen licht en een eigen held die beweegt: paard, rook en vliegwiel, koker en zeefkast, snaarwielen, gouden stroomlijn, hangende walsenstoel.
4. Elke tijd brengt 's avonds een nieuw licht: kaars, vuur, gloeilamp, TL en natrium, schermen, led.
5. Wat altijd hetzelfde is: de lucht (één wolkenfamilie, zon links, wind naar rechts), het jaartal in handschrift, de korrel die in de laatste 0,8 s van boven in beeld komt en recht boven een opening blijft hangen, de duik recht in die opening, en het ritme.
6. Een shot beweegt 4,4 tot 5,4 s. Een hele film duurt bij gewoon lezen hooguit circa 16 s.
7. Een ondertitel heeft 15 tot 24 woorden, zegt wat je ziet en herhaalt de introband niet.
8. Bij 1846 is het paard de ster: groot, levend en in het eindbeeld van shot 2 altijd in beeld, samen met de steen en de korrel.

---

## 1. De reeks in één tabel

| Jaar | Seizoen en licht | Held die beweegt | Shot 1, buiten | Shot 2, binnen | Duur |
|---|---|---|---|---|---|
| 1846 | nazomer, heldere middag, wind van zee | het paard | **daling** uit de wolken naar de deur | **stijgen** langs de aandrijving, dan omlaag kijken op ring en steen | 4,4 + 5,4 s |
| 1867 | late nazomermiddag, goud en rokerig | rook, vliegwiel en riem | **zijwaarts** naar rechts langs het Vliet | **de kracht volgen**: vuur, riem omhoog, as, riem omlaag, steen | 4,8 + 5,0 s |
| 1920 | late herfst, koel zilverlicht, kale bomen | elevatorkoker, plansichter, riemen | **laag vooruit** door kale takken naar de hoge gevel | **omlaag** door de vloer, van zeefkast naar walsen | 4,6 + 4,8 s |
| 1976 | hete droge zomer, witte waas, geel gras | silofront met schip, rode snaarwielen | **zijwaarts** naar links langs de overkant | **vooruit** langs de oorkonde naar de glazen buis | 5,0 + 4,4 s |
| 2008 | natte grijze winterdag, geen zon | gele zuigmond, gouden stroomlijn | **terugtrekken en omhoog** uit het graan | **doorsnede**, inzoomen in een S-bocht | 4,8 + 5,0 s |
| 2026 | heldere koude winterdag, lage bleke zon | de hangende walsenstoel | **stijgen** van de kijkers tot boven het dak | **mee omlaag** met de landende machine, dan vooruit | 5,2 + 5,0 s |

De hoofdintro doet: laag in het veld opstijgen en vooruit, stijgen langs de toren, door het raam en omlaag kijken. Geen jaar herhaalt die drie in dezelfde vorm.

Wat elke film vertelt, als een rode draad:
- **Shot 1 laat de aanvoer zien:** een schuit op de vaart (1846), dragers met zakken van de tjalk (1867), een koker in het ruim en een paard met wagen (1920), een zuigbuis in een motorschip en een bulkwagen (1976), een zuigmond in het graan (2008), en in 2026 komt de molen zelf binnen, aan de kraan.
- **Shot 2 laat de aandrijving zien:** paard, stoom, één as met riemen, een elektromotor per machine, een volautomatische molen, groene stroom en een nieuwe machine.

---

## 2. Algemene regels

### 2.1 Tempo

- **Duur per shot:** 4,4 tot 5,4 s camerabeweging (zie de tabel). Een film heeft samen 9,4 tot 10,2 s beweging.
- **Ritme van een film:**
  1. shot 1 staat 0,3 s stil (in de keten na de hoofdintro: 0 s, zie hoofdstuk 4) en de titel verschijnt meteen (2.5);
  2. de camera beweegt met `env.ease.soft` (ixEase) over de rest van de duur: heel zacht op gang en heel zacht tot stilstand;
  3. het eindbeeld blijft leven tot Verder (water, rook, paard, machines);
  4. overgang naar shot 2 met 0,32 s overvloeien (zie 2.2 en hoofdstuk 7);
  5. shot 2 begint meteen te bewegen, zonder stilstand;
  6. de korrel komt in de laatste 0,8 s van shot 2 in beeld;
  7. It giet oan!, de duik van 0,7 s, de introband.
- **Eén baan per shot.** Een bocht mag, maar de camera stopt nooit halverwege en begint nooit opnieuw. Geen terugvering voorbij het eindbeeld, geen schudden, geen kanteling om de kijkas.
- **Snelheid:** op het vlak van het onderwerp hooguit circa 0,7 beeldbreedte per seconde op het snelste punt. De voorgrond mag sneller (parallax), de verte trager.
- **Zoom:** op een log-schaal (`env.camMix`), hooguit circa 5 keer per shot. Uitzondering: 2008 shot 1 (terugtrekken uit het graan) mag circa 10 keer.
- **Binnen het beeld versnelt de tijd:** het paard stapt rustig, het vliegwiel draait, de plansichter schudt, de snaarwielen lopen, pulsjes racen door de buizen. De camera houdt in alle zes hetzelfde tempo; alleen de machines worden sneller. Dat past bij het spel, dat per molen sneller wordt. 2026 is weer rustig: precisie in plaats van haast.

### 2.2 Camera en compositie

- **Het onderwerp** van een eindbeeld staat binnen x 30 tot 70% en y 15 tot 85%. De korrel staat op x 50%.
- **Staand dichterbij:** `env.box` past een wereldvak in de breedte, zodat het onderwerp op een telefoon klein wordt. Kies staand (W < P) een smaller eindvak, zodat het onderwerp minstens 40% van de beeldbreedte vult.
- **Standpunt en horizon wisselen** per film, zodat de eindbeelden niet allemaal dezelfde opbouw hebben: op ooghoogte recht voor een deur (1846), op kadehoogte van opzij (1867), laag op het water omhoog kijkend, met bijna geen lucht (1920), vanaf de overkant met de horizon op circa 64% (1976), hoog en schuin zonder horizon (2008), hoog boven het dak met de stad diep beneden (2026).
- **Eén held per beeld** met het meeste contrast. Al het andere is gedempter en heeft waas in de verte (`env.haze`).
- **Doorgang van buiten naar binnen.** Shot 1 eindigt bij een opening en shot 2 begint achter die opening, met het licht dat erdoor valt: de deur met het paard (1846), de gloed van de ketelhuisdeur (1867), het verlichte raam bovenin (1920), de raambanden van de molen (1976), de lichte panelen (2008), de dakopening (2026). Het raamwerk laat de twee shots 0,32 s in elkaar overvloeien (verzoek in hoofdstuk 7).
- **Schermrichting:** wat loopt of rijdt, houdt in beide shots dezelfde richting. Het paard van 1846 loopt aan de nabije kant van rechts naar links, zoals in het tijdperkplaatje van het spel.
- **Geen tekst in beeld,** behalve de titel (2.5). Geen namen, borden of logo's. Het logo van Koopmans komt in de jaarintro's niet voor.
- **Goud** is voor de korrel. Graan om hem heen is dofter en donkerder. Huisstijloranje (#E78A01) alleen in 2026 (kraan, randlijn) en nooit op gebouwen van vroeger.

### 2.3 Lucht en wolken: één familie

- Altijd `env.sky()` met `cloudSeed` = het jaartal, en altijd dezelfde wolk (`iCloud`): ronde bovenkant, vlakke onderkant, lichte top en een koele schaduwrand. Per tijd verandert alleen hoeveel, hoe hoog, hoe plat en welke kleur.
- **De zon of de gloed staat altijd laag links,** ook waar de kijkrichting dat niet logisch maakt (stijlkeuze, net als de hoofdintro). Lichtkanten links, koele schaduw rechts.
- **De wind waait naar rechts:** wolken (`env.drawSky(g, sky, y, env.A * 2)`), rook, wimpels en vlaggen gaan allemaal dezelfde kant op.
- **Hooguit vijf wolken** tegelijk in beeld. Geen regen, sneeuw of mist als deeltjes.
- **Meeuwen:** buiten twee of drie (`env.gulls`), overdag hoog, 's avonds hooguit één.
- **Per tijd:**

| Jaar | Dag | Avond |
|---|---|---|
| 1846 | hoge blauwe zeelucht, grote witte stapelwolken zoals de hoofdintro, iets helderder | blauwe schemer, koperen gloed laag links, één ster |
| 1867 | lager en goudener licht, wolken met gele randen, rokerige waas boven de stad | warme oranje gloed laag links, de rook vangt het licht |
| 1920 | bleek grijsblauw, dunne hoge bewolking met open plekken, kleine platte wolken, bleke zon | koele schemer, nauwelijks gloed |
| 1976 | blauw dat naar de horizon bijna wit wordt van de hitte, kleine verspreide wolkjes hoog | donkerblauw met een warme band laag, oranje van de straat |
| 2008 | laag, plat, grijs wolkendek (`sun: false`), een lichtere spleet laag links | wolken die van onderen bruinoranje oplichten van de stad |
| 2026 | strakblauw boven, bleke lage zon, platte banken laag en ijle slierten hoog | blauwe uur: diepblauw met een warme strook bij de horizon, sterren alleen bovenin |

### 2.4 Licht: elke tijd een nieuw licht

Licht thema is dag, donker thema is avond. In het donker brengt elke tijd één nieuwe lichtbron mee; die is het verhaal van dat beeld.

| Jaar | Nieuw licht 's avonds | Overdag binnen |
|---|---|---|
| 1846 | een kaars of olielampje in een lantaarn, verder bijna niets | zon door de deur en de kieren, stofjes in de bundel |
| 1867 | het vuur van de ketel en één lamp met een glazen bol | daglicht door een raam, de vuurgloed als warme vlek |
| 1920 | gloeilampen: voor het eerst gloeit elke verdieping geel | hoge ramen en gloeilampen onder groene kappen |
| 1976 | TL binnen (koel groenwit) tegen natrium buiten (oranje) | TL en daglicht door stalen ramen |
| 2008 | TL in de controlekamer, schermen, natrium op natte klinkers | helder, koel TL-licht, geen schaduwen, geen stof |
| 2026 | led, cyaan schermpjes, een rood lampje op de kraan, een warme bouwlamp | daglicht door de dakopening, ledpanelen |

### 2.5 Het jaartal: titel en kicker

- **Titel in beeld, alleen aan het begin van shot 1.** Het jaartal verschijnt in La Belle Aurore (`env.font.hand`), circa 20% van min(W, P) groot, op x 50% en y 14 tot 22%, op de rustigste plek (meestal de lucht). Overdag in #1D1E1F op 75%, op een donkere ondergrond in #F9F4DB op 90%. Eronder wordt een korte potloodstreep getrokken in mosterdgoud #C5AA20 (1,5 px, licht golvend), van links naar rechts, zoals de onderstreping van de huisstijl.
  - Tijd: verschijnt vanaf 0,1 s, staat vol op 0,4 s, de streep loopt van 0,3 tot 0,7 s, en het geheel vervaagt tussen 1,1 en 1,6 s.
  - Niet bij verminderde beweging (dan zie je alleen eindbeelden en staat het jaartal in de kicker).
  - Het groot jaartal dat de stub nu blijvend tekent, gaat eruit.
- **Kicker:** plek en jaartal, zonder komma, zoals "Halverwege 1846" op de verhaalkaart en "Jaarverslag 2026". Het raamwerk zet het jaartal vanzelf in handschrift.
  - Shot 1: de plek van toen, één naam: "Holwerd 1846".
  - Shot 2: de ruimte waar je bent: "In de rosmolen 1846".
  - Hooguit circa 24 tekens voor het jaartal.

### 2.6 De korrel aan het eind van shot 2

Zo komt de korrel in alle zes films in beeld:
1. **Wanneer:** in de laatste 0,8 s van de beweging van shot 2 (vanaf u circa 0,84), zodat hij stilligt als de camera stilvalt.
2. **Waar vandaan:** van boven, uit de aanvoer van dat jaar: over de schudbak (1846), uit de stortkoker (1867), uit de houten pijp van de zeefkast (1920), uit de witte buis het glas in (1976), in het glazen stukje van de inlaat (2008), in de keel van de inloop (2026).
3. **Hoe:** hij valt circa 4% van de beeldhoogte met versnelling, veert één keer zacht na (circa 0,6%) en hangt dan stil. Daarna wiegt hij hooguit 1 px.
4. **Waar hij blijft:** op x 50% (hooguit 3% ernaast) en y 32 tot 52%, met **recht onder hem de opening** waar de duik heen gaat.
5. **Grootte:** circa 9% van P (staand circa 50 px), in alle zes gelijk.
6. **Gezicht:** hij kijkt je aan (`env.grain`, joy false). 0,4 s nadat hij stilligt knippert hij één keer, daarna om de 3 tot 4 s.
7. **Licht:** hij is het helderste goud in het beeld, met een dunne warme lichtrand aan de kant van de lichtbron. 's Avonds een zachte gloed die je vooraf tekent (geen shadowBlur per frame).
8. **Verminderde beweging:** hij ligt al op zijn plek, met open ogen.

### 2.7 De duik naar het spel

- Na It giet oan! duikt het beeld in 0,7 s (JXDIVE) recht in de opening onder de korrel en wordt donker. Daarna gaat de introband zacht open (sluier 0,6 s).
- Elk jaar geeft `diveAt` = het midden van die opening (zie per jaar). Niet de korrel zelf: inzoomen op zijn gezicht leest als een grap, niet als een val.
- **De korrel valt voorop:** in de eerste 0,3 s van de duik valt de korrel recht omlaag de opening in (versnellend, iets kleiner wordend), en pas dan zoomt het beeld mee en wordt het donker. Zo volg jij hem, net als in de hoofdintro. Dit vraagt een kleine uitbreiding van het raamwerk (hoofdstuk 7); tot die er is, gebruik je de standaardduik met `diveAt` op de opening.
- Geen eigen duik (`dive: 'eigen'`), zodat de zes overgangen gelijk zijn.
- Bij verminderde beweging: geen duik, alleen zacht overvloeien naar de introband.

### 2.8 Mensen, dieren en leven in beeld

- Mensen alleen als silhouet zonder gezicht, hooguit drie per beeld, op afstand of op de rug gezien. Alleen kleding geeft de tijd: kiel en pet (1867), lange lichte schort (1920), mosterd jack en wijde broek (1976), witte jas en muts (2008), helm en hesje (2026).
- Dieren die in de buurt horen mogen: het paard (1846 en 1920), meeuwen, zwaluwen (1846, niet in de lichte stand).
- Alles wat leeft, beweegt in een eigen, rustig tempo en blijft bewegen als de camera stilstaat. Niets knippert of flikkert behalve een vlam in helderheid. Meelstof is alleen sfeer: hooguit 30 stofjes, nooit een wolk.

### 2.9 Verminderde beweging en de lichte stand

- **Verminderde beweging:** je ziet alleen de twee eindbeelden. Elk eindbeeld moet dus zonder beweging het hele verhaal vertellen, met de held erin (per jaar beschreven).
- **Lichte stand:** eerst weg: vogels, vallende blaadjes, weerspiegelingen in plassen, de helft van de stofjes, bijrollen van mensen. De held beweegt altijd door.

### 2.10 Teksten

- **15 tot 24 woorden,** hooguit 25. Zo lees je de tekst in ongeveer de tijd van de beweging plus het staande eindbeeld.
- **Zeg wat je ziet.** Herhaal niet de introband (LEVELS[i].intro en supply), het verhaal halverwege (STORIES), de wist-je-dat-kaarten (FACTS) of de hoofdintro.
- **Gewoon Nederlands:** korte zinnen, gewone woorden, één vakwoord als je het ook ziet (kamwiel, rondsel, plansichter). Geen gedachtestreepjes, geen uitroeptekens, geen "Ontdek", geen getallen of tonnages, geen dubbele punt als trucje.
- **"Jij" alleen in 2026,** als slot van de reeks dat terugwijst naar "Jij bent één van die korrels" in de hoofdintro.
- **Elke cap begint anders.** Kijk bij een nieuwe tekst naar hoofdstuk 6: dezelfde werkwoorden (drijven aan, draaien) en hetzelfde onderwerp (een schip lost graan) staan hooguit één keer in de reeks.
- **Beeldbeschrijving (desc):** één zin die begint met "Beeld:", hooguit circa 45 woorden, van begin tot eindbeeld, met de korrel erin.

---

## 3. Herkenbaarheid: elk jaar meteen bij zijn tijd

### 3.1 Zes tijden in één oogopslag

| Jaar | Eerste beeld zegt meteen | Materialen | Kleuren (kern) | Held die beweegt |
|---|---|---|---|---|
| 1846 | wolken boven een plat groen land met een terp en een losse kerktoren | hout, riet, stro, leem, zand, blauwe steen | rietgoud #C9A24A, paardbruin #5A3B24, zand #C9B386, zeeblauw #6EA7D0 | paard, kamwiel, rondsel |
| 1867 | wachtende arbeiders in kiel en pet op een houten trapjesbrug, gevels met topgevels, goudlicht | rood baksteen, gietijzer, leer, messing, turf | baksteen #9C5236, gietijzer #3A3F44, vuur #F29A3A, bruin zeil #8B4A2B | rook, vliegwiel, riem |
| 1920 | kale takken met gele blaadjes, daarachter een hoge fabriek met een schuine koker | baksteen en grijs beton, kalk, groene tegels, crème lak | baksteen #8A4A34, pakhuisgrijs #B9B4A8, flessengroen #3F6B52, kalkwit #E6DFC9 | koker, paard en wagen, plansichter, riemen |
| 1976 | geel verdord gras, een olijfgroene auto, een bulkwagen met ronde koplampen, een schoorsteen | beton, golfplaat, roodbruin hout, witte tegels, glas met koper | strogeel #C8B46A, mosterd #B8892E, olijf #6E7B3B, vloer #7A3B22, rood #C23B27 | zuigbuis met gouden stipjes, snaarwielen, meel in de buis |
| 2008 | een gele zuigmond in goud graan onder een grijze, natte lucht | staal, sandwichpanelen, RVS, witte lak, traanplaat | lichtgrijs #D9DEE2, middengrijs #A6AAAD, geel #E6B417, blauwgroen #2F9C95 | zuigmond, bulkwagen, gouden stroomlijn, zeefkasten |
| 2026 | helmen en hesjes, kijkers die omhoog wijzen, een oranje kraanmast | zandgrijze panelen, vakwerkstaal, RVS, antraciet, led | zandgrijs #DEDCD5, antraciet #3A4046, kraanoranje #E78A01, cyaan #6FD3E0 | de hangende en landende walsenstoel, gladde walsen |

### 3.2 1867 tegenover 1920: hetzelfde water, een andere wereld

| | 1867 | 1920 |
|---|---|---|
| seizoen | nazomer, bomen in vol blad | late herfst, kale bomen, een paar gele blaadjes |
| licht overdag | laag, warm goud, rokerige waas | koel zilver, bleke zon, dunne hoge wolken |
| licht 's avonds | één vuurgloed en één lamp | elke verdieping geel van gloeilampen, gouden strepen in het water |
| gebouw | laag en breed: drie lagen, topgevel, ketelhuis, schoorsteen | smal en hoog: vijf en zeven lagen, plat dak, elevator |
| aanvoer | mannen dragen zakken over de plank, een zak aan een touw | een koker haalt graan uit het ruim, een paard met wagen voert af |
| camera buiten | zijwaarts langs de kade, op kadehoogte, horizontaal | laag op het water, vooruit, van onder naar boven kijkend |
| binnen | één ruimte, donker baksteen, vuur, één vliegwiel, molenstenen | verdiepingen, kalkwit en groene tegels, veel riemen, walsen |
| kleur binnen | warm rood en ijzer, één oranje bron | wit, groen en crème met warm geel lamplicht |

### 3.3 2008 en 2026 tegenover de hoofdintro

| | Hoofdintro (nu) | 2008 | 2026 |
|---|---|---|---|
| seizoen en lucht | zomer, bolle stapelwolken, warme zon | natte winterdag, laag grijs dek, geen zon | heldere koude winterdag, bleke lage zon, ijle slierten |
| voorgrond | tarweveld met klaprozen en phacelia | het graan in het ruim, natte kade | bouwhek, kijkers, rijplaten |
| gebouw | antraciet toren met oranje band en logo | lichtgrijs paneelgebouw met gele deuren, geen logo, geen oranje band | zandgrijs Molen B in aanbouw, geen logo |
| standpunt eindbeeld shot 1 | recht van voren, op ooghoogte, over het water | hoog en schuin boven het schip, geen horizon | boven het dak, de stad diep beneden |
| aanvoer | schip met kraan, van opzij | zuigmond in het graan, van dichtbij | een walsenstoel aan de kraan |
| naar binnen | door het raam, schacht omlaag | doorsnede als bouwtekening | lichtschacht uit het dak, landende machine |
| accent | oranje en goud | geel en blauwgroen | oranje kraan en cyaan |

Verboden in 2008 en 2026: het tarweveld, bolle zomerwolken, het logo, een antraciet toren met oranje band recht van voren. In 2026 mag de maaltoren van de hoofdintro alleen klein en wazig aan de rand staan, als teken dat je bij nu bent aangekomen.

---

## 4. Tempo van de hele beleving

### 4.1 De eerste start nu

Volgorde: hoofdintro, duik (0,85 s), sluier, jaarintro 1846, duik (0,7 s), sluier (0,6 s), introband van 1846, spelen.

Schatting bij gewoon lezen (circa 3,5 woorden per seconde, plus circa 0,8 s om te klikken). Lezen en kijken lopen tegelijk, dus per shot telt het langste van de twee.

| Stap | Beweging | Tekst | Per stap |
|---|---|---|---|
| hoofdintro shot 1 | 5,9 s | 22 woorden | circa 7 s |
| hoofdintro shot 2 | 5,0 s | 29 woorden | circa 9 s |
| hoofdintro shot 3 | 4,6 s | 18 woorden | circa 6 s |
| duik | 0,85 s | | circa 1 s |
| 1846 shot 1 (storyboard) | 0,6 s stil + 5,0 s | 24 woorden | circa 8 s |
| 1846 shot 2 (storyboard) | 5,0 s | 23 woorden | circa 7,5 s |
| duik en sluier | 1,3 s | | circa 1,3 s |
| introband (de teller rolt terwijl je leest) | | | circa 6 s |
| **samen** | | | **circa 46 s** tot de eerste korrel valt |

Zonder jaarintro was dat circa 30 s.

### 4.2 Oordeel

Bijna driekwart minuut is lang, maar niet te lang: de gebruiker wil dit verhaal juist zien, en het is één keer. Het wordt te lang als het voelt als twee films na elkaar. Dat gevoel komt nu van drie haperingen, niet van de duur:
1. Na de duik staat het beeld van 1846 eerst 0,6 s stil (jt0 = -0,6) terwijl de sluier opengaat. De val stopt.
2. Shot 1 van 1846 begint opnieuw ver weg en rustig, alsof er een nieuwe film start.
3. De kijker weet nog niet dat hij in 1846 is tot hij de kicker leest.

### 4.3 Voorstel

1. **Geen stilstand in de keten.** jt0 = 0 als de jaarintro direct na de hoofdintro komt. De sluier gaat open terwijl de camera al daalt.
2. **De val loopt door.** Shot 1 van 1846 begint ín een wolkenflard die in de eerste 0,8 s omhoog wegschuift: je valt uit het donker van de schacht door de wolken boven Holwerd. Dezelfde richting (omlaag) als de duik, dus geen herstart. Bij avond is die wolk donker, zodat zwart naar wolk naar schemer één verloop is.
3. **Shot 1 van 1846 korter:** 4,4 s in plaats van 5,0 s. De duik heeft het vallen al ingezet.
4. **De tijdsprong in beeld:** de titel "1846" in handschrift met de potloodstreep (2.5) staat in die eerste seconde in de lucht. Dat is het moment "terug in de tijd" waar shot 3 van de hoofdintro naar verwijst.
5. **Shot 2 mag juist iets langer** (5,4 s): dat is het paard, de kern voor de gebruiker.
6. **De teller op de introband blijft zoals hij is.** Hij rolt in circa 1,2 s van 2026 terug naar 1846 terwijl je de band leest, dus hij kost geen tijd en herhaalt de sprong nog even.

Uitkomst: circa 45 s, maar zonder één stilstaand moment tussen het tarweveld en de eerste korrel: veld, toren, schacht, wolken, Holwerd, paard, steen, spel.

### 4.4 De rest van het spel

Na elke molen volgt (de eerste keer) een jaarintro van circa 15 s bij gewoon lezen, daarna de introband. Over zes molens is dat samen circa 1,5 minuut in een spel van circa een kwartier, plus de hoofdintro. Dat is een rustpunt na het spelen, geen rem. Voorwaarde: elke film blijft onder circa 16 s, Overslaan staat er altijd en Verder springt eerst naar het eindbeeld.

---

## 5. Draaiboek per jaar

Per jaar: de kern, beide shots (begin, beweging, eind, wat beweegt, dag en avond), de korrel en de duik, de drie belangrijkste aanwijzingen, de teksten en wat anders is dan het storyboard.

---

### 1846: de rosmolen in Holwerd

**Kern.** Je valt uit de wolken terug in de tijd, boven een terpdorp aan het wad, en landt bij een paard dat de molen draait.
**Seizoen en licht.** Nazomer, heldere middag, wind van zee. Avond: blauwe schemer, één lantaarn.
**Held.** Het paard.

#### Shot 1, buiten: daling uit de wolken (4,4 s)

- **Begin (t 0):** hoog boven de vaart (circa 40 m), blik naar het noorden en schuin omlaag.
  - Een wolkenflard dichtbij bedekt y 0 tot 28% en schuift in 0,8 s omhoog uit beeld.
  - Lucht y 0 tot 40%, horizon met een zilveren wadband op y 40%, de zeedijk als strakke groene lijn op y 42 tot 43%.
  - Het terpdorp als langgerekte bult x 26 tot 74%, y 46 tot 58%. De kerktoren op zijn eigen terp x 37 tot 40%, spits tot y 41%. De rieten kap van de rosmolen als goudgeel vlekje op x 49 tot 53%, y 52%.
  - De vaart als zilveren lint van onderaan (x 44 tot 56%) naar het dorp (x 50%, y 60%). Een schuit met zakken op de wal x 42 tot 50%, y 76 tot 82%. Riet onderin links en rechts.
  - Titel 1846 in de lucht (2.5).
- **Beweging:** daling op een log-schaal naar ooghoogte, tegelijk vooruit langs de vaart. Rond 1,6 s scheert de camera over de schuit (de mast schuift links door beeld). In de laatste 1,2 s buigt hij iets naar rechts de straat in en remt af. De kerktoren schuift achter de kap naar links.
- **Eind (t 4,4):** ooghoogte 1,6 m, circa 10 m voor de rosmolen (staand dichterbij dan in het storyboard).
  - Lucht y 0 tot 14%. De rieten kap loopt aan beide kanten uit beeld, nok y 6%, goot y 40%. De kerktoren steekt links boven de kap uit, x 22 tot 30%, spits y 0 tot 14%.
  - De open dubbele deur x 30 tot 70%, y 44 tot 72%. Bovenin de deur de kammen van het kamwiel (y 44 tot 48%), onderin het lichte zandpad.
  - **Het paard** loopt door de deur van rechts naar links, schoft y 54%, hoeven y 70%.
  - Straat y 74 tot 100%. Links de kar met zakken x 0 tot 22%, y 62 tot 88%, met een man die een zak op zijn schouder tilt.
  - Verminderde beweging: het paard staat midden in de deur, in een stap.
- **Wat beweegt:** paard en kammen in de deur (rondje 10 s; het paard is op t 4,2 s midden in de deur), rook uit twee of drie schoorstenen naar rechts, riet en gras, de wimpel van de schuit, rimpels op de vaart, drie meeuwen, twee zwaluwen.
- **Dag:** lage zon links, warme lichtkanten, de kap licht goud tegen de blauwe lucht. Binnen achter de deur donker met één schuine bundel.
- **Avond:** koperen gloed laag links, één ster, een paar ramen met kaarslicht. De deur van de rosmolen gloeit warm van de lantaarn; het paard is een silhouet met een warme rand. Geen zwaluwen.

#### Shot 2, binnen: stijgen langs de aandrijving, dan omlaag kijken (5,4 s)

- **Begin (t 0):** laag (1,2 m), dicht bij het paard. Het zonlicht van de deur uit shot 1 valt schuin binnen.
  - Het paard van opzij en iets van voren, lopend van rechts naar links: kop met oogklep x 14 tot 36%, y 22 tot 44%; lijf tot x 96%, schoft y 34%, hoeven y 84%. Haam, strengen en zwingel goed te zien.
  - De trekboom loopt van zijn flank schuin rechts omhoog uit beeld, naar de spil.
  - Een strook zon over zijn voorbenen en het zand, y 70 tot 100%, met stofjes. Achter: donkere planken met lichtkieren.
- **Beweging:**
  - 0 tot 0,3 s: stil; het paard stapt al.
  - 0,3 tot 2,4 s: de camera stijgt naar circa 2,6 m en schuift naar rechts langs de trekboom naar de spil. Het paard loopt links uit beeld. De kammen van het kamwiel schuiven groot door de bovenkant.
  - 2,4 tot 3,6 s: langs de rand van het kamwiel naar het rondsel, dat snel draait.
  - 3,6 tot 5,4 s: de blik kantelt circa 35 graden omlaag en de camera komt tot rust boven de maalstoel, onder het kamwiel, met de spil en de paardenring erachter.
- **Eind (t 5,4):** de hele aandrijving in één beeld.
  - y 0 tot 8%: de onderkant van het kamwiel als donkere band met kammen. Bovenaan in het midden (x 46 tot 54%, y 2 tot 8%) het rondsel, als vage strepen. De ijzeren steenspil loopt van daar recht omlaag naar het oog.
  - y 12 tot 42%: de paardenring als lichte ellips van zand, x 0 tot 70%, met de koningsspil op x 26 tot 30%. **Het paard loopt zijn ring en is altijd in beeld.** Op de nabije kant (y 32 tot 42%) is het circa 30% van de beeldbreedte lang.
  - y 46 tot 90%: de kuip met het deksel, x 14 tot 86%. Het oog van de steen op x 50%, y 64%. De graanbak rechtsboven x 64 tot 92%, y 24 tot 46%, met de schudbak naar het oog. Rechtsonder de meelpijp met grijzig meel.
  - Een strook zon schuin over het deksel.
  - Verminderde beweging: het paard staat op de nabije kant in profiel, x 18 tot 48%, en de korrel ligt op de schudbak.
- **De korrel:** glijdt in de laatste 0,8 s met het straaltje boekweit over de schudbak en blijft op de lip liggen, x 52%, y 52%. Goud tussen donkere boekweit.
- **De duik:** `diveAt` = het oog van de steen, x 50%, y 64%.
- **Wat beweegt:** het paard (stap 1,1 s, hoofd knikt, staart zwaait, manen wippen); spil en kamwiel in de pas met het paard; rondsel en steenspil snel (circa 1,5 omwenteling per seconde, drie of vier vage strepen); de schudbak tikt (3 tot 4 keer per seconde, 1 px); een straaltje boekweit (hooguit 15 korrels); meel uit de meelpijp; stofjes in de zon (hooguit 30).
- **Dag:** één strook zon door de deur, lichtkieren in de planken, verder warm donker hout.
- **Avond:** één lantaarn aan een balk bij de deur, een warme cirkel en diepe schaduw. Het paard en de kammen krijgen een warme rand; de kuip is aan de lantaarnkant belicht.

#### Drie aanwijzingen

1. **Het paard is de ster.** Het is in drie van de vier belangrijke beelden te zien: in de deur, groot aan het begin van shot 2 en op zijn ring in het eindbeeld. Teken een herkenbaar paardensilhouet (oren, gebogen nek, staart, oogkleppen, haam) met een warme lichtrand op rug en manen, donker op licht zand. De stap is een rustige stap in vier tellen van circa 1,1 s, het hoofd knikt op de tel. **De hoeven glijden niet:** de snelheid van het lijf past bij de paslengte. Je moet zien dat het werkt: de zwingel en de strengen staan strak en de trekboom gaat mee. Eén rondje duurt 10 s.
2. **Laat de hele keten in één beeld zien.** In het eindbeeld van shot 2 lees je van boven naar onder: kamwiel, rondsel, steenspil, steen, korrel, en daarachter het paard aan de spil. Paard, spil en kamwiel hangen aan één hoek: één rondje van het paard is één omwenteling van het wiel. Het verschil in tempo vertelt het verhaal: het paard stapt rustig, het rondsel snort. Teken de kammen zo dat je ze kunt tellen en het rondsel als vage strepen.
3. **Het eerste beeld is de sprong in de tijd.** Uit de wolk, met het jaartal, boven een plat groen land met één bult en een losse toren. Houd het luchtig: veel lucht, waas over de verte, weinig details, de zeedijk als één strakke lijn. Niets glimt behalve water en later de korrel; geen oranje.

#### Teksten

| | Shot 1 | Shot 2 |
|---|---|---|
| kicker | Holwerd 1846 | In de rosmolen 1846 |
| cap | Holwerd ligt op een terp achter de zeedijk. Schuiten brengen zakken boekweit over de vaart. Achter de open deur loopt een paard zijn rondjes. (24 woorden) | Het paard met oogkleppen draait de spil. Boven zijn hoofd grijpt het kamwiel in een klein rondsel. Zo gaat de steen veel sneller rond. (24 woorden) |
| desc | Beeld: uit de wolken daal je naar het terpdorp Holwerd, met de kerktoren op zijn eigen terp en de zeedijk aan de horizon, langs een schuit met zakken boekweit naar de open deur van de rosmolen, waar een paard langsloopt. | Beeld: binnen loopt een paard met oogkleppen zijn rondje en draait zo de houten spil; je stijgt langs het grote kamwiel en het snelle rondsel en kijkt omlaag op de molensteen, met het paard erachter en één korrel op de rand. |

#### Anders dan het storyboard

- Shot 1 duurt 4,4 s in plaats van 5,0 s, begint in een wolkenflard met de titel en komt staand dichter bij de deur (de deur vult 40% van de breedte).
- Het eindbeeld van shot 2 toont paard, ring, steen en korrel samen. In het storyboard stond het paard aan de linkerrand en viel het staand weg. De camera eindigt daarom lager (circa 2,4 m, onder het kamwiel) en kijkt vanaf de andere kant van de maalstoel naar de spil.
- Eén rondje duurt 10 s (het storyboard liet 9 tot 12 s toe).

---

### 1867: de stoommeelfabriek in Leeuwarden

**Kern.** De molen draait in de stad op stoom. Buiten sjouwen mannen zakken, binnen volg je de kracht van het vuur naar de steen.
**Seizoen en licht.** Late nazomermiddag, laag goudlicht, rokerige waas. Avond: warme oranje gloed, vuur en één lamp.
**Held.** Buiten de rook, binnen het vliegwiel met de riem.

#### Shot 1, buiten: zijwaarts langs het Vliet (4,8 s)

- **Begin (t 0):** op onze kade, circa 2 m boven het water, blik over het Vliet.
  - De houten trapjesbrug x 10 tot 80%, dek y 44 tot 50%, met drie losse arbeiders op de top (x 40 tot 52%, y 36 tot 46%), handen in de zakken of op de leuning.
  - Daarachter lage huizen met topgevels en een pakhuis, y 30 tot 52%. Lucht y 0 tot 34%, gouden waas.
  - Water y 54 tot 80%. Onze kade met keien en een meerpaal x 84 tot 92%, y 74 tot 100%.
  - Titel 1867 in de lucht.
- **Beweging:** 0,3 s stil, dan een glijvlucht zijwaarts naar rechts op gelijke hoogte, hooguit 1,3 keer inzoomen. Meerpaal, steekwagen en keien schuiven sneller voorbij, de verre stad trager. Halverwege komt de schoorsteen met zijn rook rechts in beeld.
- **Eind (t 4,8):**
  - De fabriek x 18 tot 66%, topgevel tot y 18%, dakvoet y 30%. De open laaddeur x 38 tot 46%, y 54 tot 64%, met een drager op de plank. Een zak aan de hijsbalk op x 44%, y 22%.
  - Het ketelhuis x 66 tot 84%, y 46 tot 64%, met vuurgloed in de deur.
  - De schoorsteen x 74 tot 80%, van y 4 tot 46%, met een rookpluim die naar rechts uit beeld drijft.
  - Een linde links x 0 tot 16%.
  - De tjalk over de onderkant, x 0 tot 78%, romp y 62 tot 72%, mast tot y 12% op x 10%. Water y 66 tot 88%.
  - Verminderde beweging: de zak hangt aan de hijsdeur, de drager staat op de plank.
- **Wat beweegt:** rook (hooguit zes wolkjes, naar rechts), een stoompufje uit de uitlaatpijp in de maat van het vliegwiel binnen, de zak aan het touw die in 4,8 s omhooggaat, de drager over de plank, de tjalk die deint, water, twee meeuwen.
- **Dag en avond:** zoals het storyboard. Avond: warme gloed laag links, de vuurgloed achter de ketelhuisdeur flakkert in helderheid, een paar ramen geel, de scheepslantaarn brandt.

#### Shot 2, binnen: de kracht volgen (5,0 s)

- **Begin (t 0):** de doorsnede, laag. De gloed van de ketelhuisdeur uit shot 1 is hier het vuur.
  - De ketelboog links x 0 tot 20%, de vuurdeur gloeit (x 4 tot 12%, y 72 tot 80%). De stoker x 18 tot 26%, y 56 tot 86%.
  - De machine met cilinder en regulateur x 22 tot 44%, y 64 tot 86%. Het vliegwiel x 40 tot 66%, y 56 tot 92%.
  - Riem 1 loopt van het vliegwiel omhoog naar de drijfas (y 6 tot 10%, over de hele breedte).
- **Beweging:** één vloeiende boog met de kracht mee: omhoog langs riem 1 (0 tot 1,6 s), naar rechts langs de as (1,6 tot 3,0 s), omlaag langs riem 2 naar de maalstoel (3,0 tot 5,0 s). Inzoomen circa 3,5 keer op een log-schaal. Het laatste stuk omlaag voelt als een val die bij de steen eindigt.
- **Eind (t 5,0):**
  - De stortkoker van boven tot y 26%, de mond in het midden.
  - De kaar x 26 tot 74%, y 38 tot 60%, met graan. De schuddebak naar het kropgat op x 50%, y 66%.
  - De kuip in doorsnede y 70 tot 92%, met de stilliggende ligger en de draaiende loper.
  - Riem 2 als strook aan de rechterrand, x 88 tot 96%. 's Avonds lampgloed links.
- **De korrel:** valt in de laatste 0,8 s uit de mond van de stortkoker en blijft hangen op x 50%, y 32%.
- **De duik:** `diveAt` = het kropgat, x 50%, y 66%.
- **Wat beweegt:** vliegwiel (0,75 omwenteling per seconde) met kruk, drijfstang en kruiskop in de pas; de bollen van de regulateur; naden die over de riemen lopen; de drijfas; de loper; de schuddebak (3 tikken per seconde); vuur in helderheid; hooguit 20 stofjes.

#### Drie aanwijzingen

1. **Eén warme bron binnen: het vuur.** Houd baksteen en gietijzer koel en gedempt, zodat de gloed op de stoker, de spaken van het vliegwiel en de vloer de enige warmte is. Daarna is de korrel het warmste punt.
2. **Laat de kracht reizen.** Maak precies dat ene pad levendig (lopende naden op de riemen, draaiende spaken, de schijven op de as) en houd de rest stil. Het oog volgt dan vanzelf de camera, van vuur naar steen.
3. **Stad, mensen en rook.** De wachtende arbeiders op de brug en de dragers in kiel en pet geven de maat. De schoorsteen is het hoogste punt van het beeld, met een dikke, trage, zachte rookpluim die oplost in de warme lucht. Geen naam op de gevel.

#### Teksten

| | Shot 1 | Shot 2 |
|---|---|---|
| kicker | Leeuwarden 1867 | In de stoommeelfabriek 1867 |
| cap | Hier draait geen paard meer rond. Er rookt een schoorsteen. Losse arbeiders dragen het graan zak voor zak van de tjalk naar binnen. (23 woorden) | De stoker houdt het vuur onder de ketel aan. Het vliegwiel geeft zijn kracht via riemen en een as door aan de bovenste molensteen. (24 woorden) |
| desc | Beeld: je glijdt langs het water, langs een houten brug met wachtende arbeiders en oude pakhuizen, naar een bakstenen fabriek met een rokende schoorsteen, waar mannen zakken graan van een tjalk naar binnen dragen. | Beeld: onder de ketel gloeit het vuur en draait een vliegwiel; je volgt de leren riem omhoog naar een as onder de balken en een tweede riem omlaag naar de molenstenen, waar één korrel uit de stortkoker valt. |

#### Anders dan het storyboard

- Shot 1 is een zuivere zijwaartse beweging die bij de brug begint, met hooguit 1,3 keer inzoomen. In het storyboard begon hij wijd en zoomde hij 3,4 keer in met een dip.
- Shot 2 duurt 5,0 s in plaats van 4,6 s, omdat de baan lang is. De korrel hangt op 32% in plaats van 35%.

---

### 1920: de meelfabriek aan het Noordvliet

**Kern.** Hoog, koel en elektrisch. De fabriek aan het Noordvliet is gegroeid; binnen schudden zeefkasten en lopen riemen van één as.
**Seizoen en licht.** Late herfst, koele heldere middag, bleke zon, kale bomen. Avond: koele schemer, elke verdieping geel.
**Held.** Buiten de elevatorkoker en het paard met de wagen, binnen de schuddende plansichter en de lopende riemen.

#### Shot 1, buiten: laag vooruit door de kale takken (4,6 s)

- **Begin (t 0):** laag op het water aan onze kant (ooghoogte circa 1,5 m), achter een kale boom.
  - Kale takken dichtbij over y 0 tot 30% en een stam aan de rechterrand (x 88 tot 100%). Twee of drie gele blaadjes dwarrelen.
  - Door de takken: de meelfabriek x 6 tot 44%, bovenkant y 34%; het pakhuis x 40 tot 56%, bovenkant y 26%; de koker schuin van x 52%, y 30% naar het ruim van de tjalk. De tjalk x 4 tot 50%, romp y 60 tot 66%.
  - De ophaalbrug klein in de verte, x 74 tot 84%, y 46 tot 58%, met huizen en kale bomen langs de kade.
  - Water y 62 tot 100% met lange spiegelingen. Bleke lucht y 0 tot 50%. Titel 1920 in de lucht tussen de takken.
- **Beweging:** 0,3 s stil, dan vooruit over het water en iets naar links, laag blijvend (van 1,5 naar 3 m), inzoomen circa 1,9 keer. De takken schuiven snel omhoog en rechts uit beeld. De gevel draait recht voor de camera.
- **Eind (t 4,6):** van laag gezien, dus hoog.
  - De meelfabriek x 0 tot 66%, bovenkant y 12%. Het pakhuis x 60 tot 100%, loopt boven uit beeld.
  - Het verlichte raam op de bovenste verdieping x 38 tot 46%, y 16 tot 24%.
  - De koker van x 78%, y 6% schuin naar het ruim op x 46%, y 68%.
  - De kade y 56 tot 66% met paard en wagen x 68 tot 98% en een arbeider die een zak optilt op x 62%.
  - De tjalk x 0 tot 88%, romp y 68 tot 78%, mast tot y 24% op x 22%. Water y 74 tot 100% met de spiegeling van de ramen.
- **Wat beweegt:** blaadjes (niet in de lichte stand), de man in het ruim schept (om de 1,5 s), de arbeider tilt een zak op de wagen (3 s), het paard knikt en zwiept, de tjalk deint en de wimpel wappert, dunne rook naar rechts, twee meeuwen, water.
- **Dag:** koel zilverlicht, bleke zon laag links, warm baksteen tegen een koele lucht, lange zachte schaduwen.
- **Avond:** ramen op alle verdiepingen geel (#F2C35B), gouden strepen in het water, de lantaarn op de tjalk.

#### Shot 2, binnen: omlaag door de vloer (4,8 s)

- **Begin (t 0):** de sichtervloer, achter het verlichte raam uit shot 1 (dat raam staat links met een bundel daglicht). De plansichter x 22 tot 78%, y 22 tot 56%, aan zijn stokken; de sokken en houten pijpen omlaag; kalkwit boven, groene tegels onder; rechts een gloeilamp onder een groene kap. Verder zoals het storyboard.
- **Beweging:** 0 tot 0,3 s stil op de schuddende zeefkast. Daarna zakt de camera recht omlaag, circa 1,4 beeldhoogte; de houten pijpen leiden het oog; rond 2,2 s schuift de vloer als een donkere band door het midden. In de laatste seconde een kleine duw vooruit (1,2 keer) op de middelste walsenstoel.
- **Eind (t 4,8):** zoals het storyboard: drie walsenstoelen onder gloeilampen, de middelste groot (x 34 tot 74%), de voedingskast met kijkglas y 40 tot 52%, onder de vloer de drijfas met de riemen omhoog.
- **De korrel:** valt in de laatste 0,8 s uit de houten pijp op de rand van de middelste voedingskast en blijft daar, x 52%, y 36%.
- **De duik:** `diveAt` = de opening van de voedingskast boven de walsen, x 50%, y 48%.
- **Let op:** teken dit niet als doorsnede met snijvlakken (dat is de taal van 2008). Het zijn kamers met diepte, en de camera zakt door de vloer.
- **Wat beweegt:** de plansichter maakt kleine rondjes (circa 3 px, 2 keer per seconde) en de stokken hellen mee; alle riemen lopen in hetzelfde tempo; riemschijven en drijfas draaien; graan valt achter het kijkglas; de knecht draait het handwiel; hooguit 12 stofjes. De gloeilampen branden stil.

#### Drie aanwijzingen

1. **Hoogte voelen.** Een lage camera, gevels die boven je uittorenen, de koker als één krachtige diagonaal en ramen in een strak ritme. Het verschil met 1867 zit in de verhouding: smal en hoog tegenover laag en breed.
2. **Herfstlicht en kale takken.** Een bleke, koele lucht met dunne wolken, kale takken als fijne lijntekening dichtbij, een paar gele blaadjes. 's Avonds voor het eerst een gebouw waarin elk raam gloeit.
3. **Binnen fris en nieuw.** Kalkwit boven, flessengroene tegels onder, crème walsenstoelen met een groen biesje, gloeilampen onder groene kappen. Geef de plansichter de eerste halve seconde: zijn snelle rondjes zijn de leukste beweging van deze film. Laat alle riemen tegelijk en gelijk lopen; dat ritme is het beeld van één as voor alles.

#### Teksten

| | Shot 1 | Shot 2 |
|---|---|---|
| kicker | Noordvliet 1920 | In de meelfabriek 1920 |
| cap | De meelfabriek en de graanpakhuizen staan hoog langs het water. Op de kade wacht een paard met een wagen vol zakken. (21 woorden) | Boven schudt de plansichter, een zeefkast aan stokken. Eronder malen de walsen. Leren riemen van een lange as drijven ze aan. (21 woorden) |
| desc | Beeld: laag over het water, door kale takken met een paar gele blaadjes, glijd je naar een hoge bakstenen meelfabriek en een nog hoger grijs pakhuis, met een koker schuin naar een zeilschip en een paard met een wagen vol zakken op de kade. | Beeld: een houten zeefkast schudt aan stokken onder het plafond; de camera zakt langs houten pijpen door de vloer naar drie lichte walsenstoelen onder gloeilampen, met leren riemen van een draaiende as eronder, en één korrel valt op de middelste. |

#### Anders dan het storyboard

- Shot 1 blijft laag en begint achter kale takken. Het storyboard steeg van 1,5 naar 9 m (te veel zoals de hoofdintro) en had de ophaalbrug op de voorgrond; die staat nu klein in de verte, zoals op de foto.
- Shot 1 duurt 4,6 s in plaats van 4,8 s, shot 2 4,8 s in plaats van 4,6 s.
- Shot 2: geen snijvlakken; de korrel komt uit de houten pijp.

---

### 1976: Koninklijk, aan De Merodestraat

**Kern.** Een hete, droge zomer aan het Nieuwe Kanaal: lichte betonnen silo's, een schip en een bulkwagen, en binnen rode snaarwielen onder TL.
**Seizoen en licht.** Hete nazomer, witte hittewaas, verdord gras. Avond: natrium-oranje buiten, koel TL binnen.
**Held.** Buiten het silofront met het schip, binnen de rij rode snaarwielen en de glazen buis.

#### Shot 1, buiten: zijwaarts langs de overkant (5,0 s)

- **Begin (t 0):** op de Kanaalweg aan de overkant, ooghoogte circa 1,8 m, blik naar het zuiden.
  - Voorgrond y 78 tot 100%: geel verdord gras en een klinkerrand. Een olijfgroene hatchback x 56 tot 80%, y 80 tot 94%.
  - Over het water (y 64 tot 74%): de laadloods met de bulkwagen in het midden (x 14 tot 60%, y 54 tot 64%), het lange bakstenen gebouw links, de schoorsteen van de buurfabriek aan de rechterrand (tot y 14%).
  - Lucht y 0 tot 52%, bijna wit aan de horizon. Titel 1976 in de lucht.
- **Beweging:** 0,3 s stil, dan zijwaarts naar links op gelijke hoogte, hooguit 1,15 keer inzoomen, geen stijging. Het piramidedak, de molen uit de jaren zestig en de silo's schuiven voorbij; gras, bolder en lantaarnpaal sneller.
- **Eind (t 5,0):**
  - De lantaarnpaal als verticale lijn links, x 12 tot 16%, van y 6 tot 92%, met zijn gebogen arm naar rechts.
  - Over het water de silogroepen x 18 tot 66%, bovenkant y 32%; de trappentoren met de zuigbuis x 44 tot 52%, bovenkant y 24%; de molen uit de jaren zestig x 66 tot 100%, bovenkant y 22%, met raambanden.
  - Het schip langs de kade x 6 tot 76%, y 60 tot 70%, met het open ruim onder de zuigbuis. Water y 66 tot 80% met de spiegeling van de lichte silo's. Gras y 82 tot 100%.
  - **De fietser** rijdt vanaf 3,8 s van links het beeld in en fietst rustig naar rechts door de voorgrond (circa 6 s over de hele breedte, dus ook in het staande eindbeeld). Verminderde beweging: hij staat op x 22 tot 30%, net voorbij de lantaarnpaal.
- **Wat beweegt:** gouden stipjes langs de zuigbuis omhoog (zes), het schip deint, de vlag wappert, de fietser, twee meeuwen, trage wolken.
- **Dag:** vlak, hard zomerlicht, lichtkanten links; de lichte silo's zijn het helderste vlak.
- **Avond:** koel TL-licht achter circa 70% van de raambanden van de molen, warme kantoorramen in het piramidegebouw, de natriumlamp naast ons brandt oranje met een streep in het water, het stuurhuis is verlicht.

#### Shot 2, binnen: vooruit langs de oorkonde (4,4 s)

- **Begin (t 0):** dichtbij een betegelde pilaar links (x 0 tot 36%), met de oorkonde x 6 tot 30%, y 22 tot 46% en de gouden kroon op x 18%, y 27%. Rechts de hal: drie crème walsenstoelen met rode snaarwielen op een rij (x 38 tot 100%, y 56 tot 78%), de molenaar in wit overall, witte buizen en TL-balken bovenin, roodbruine vloer y 78 tot 100%. Achterin stalen ramen (de raambanden uit shot 1).
- **Beweging:** 0,3 s stil, dan vooruit en iets naar rechts, met een kleine stijging tot de hoogte van de glazen buis; inzoomen circa 2,2 keer. De pilaar met de oorkonde schuift snel links uit beeld.
- **Eind (t 4,4):**
  - De middelste walsenstoel. De glazen invoerbuis x 46 tot 54%, y 30 tot 58%, met de witte stalen buis erboven tot de bovenrand.
  - Het kijkvenster met de twee walsen en de spleet y 66 tot 80%.
  - Het rode snaarwiel half in beeld aan de rechterrand, x 84 tot 100%, y 56 tot 80%. Een TL-balk bovenin, vloer onderaan.
- **De korrel:** komt in de laatste 0,8 s uit de witte buis het glas in en blijft bovenin hangen, x 50%, y 34%.
- **De duik:** door de glazen buis naar de spleet, `diveAt` x 50%, y 73%. De korrel valt zichtbaar door het glas.
- **Wat beweegt:** snaarwielen (0,6 omwenteling per seconde), lopende snaren, de ribbels van de walsen naar elkaar toe, stipjes die in de glazen buizen vallen, de arm van de molenaar een beetje, overdag hooguit 12 stofjes. TL brandt vast.

#### Drie aanwijzingen

1. **Jaren zeventig zit in de kleur.** Verbleekt en warm: oker, mosterd, olijf, roodbruin en crème, met een lucht die van de hitte bijna wit wordt aan de horizon. Geen helder blauw zoals de hoofdintro. Het verdorde gras is een groot geel vlak.
2. **Twee soorten licht.** Overdag vlak, hard zomerlicht. 's Avonds koel TL-wit achter de raambanden tegen oranje natriumlicht aan de kade. Dat contrast is het beeld van 1976.
3. **Herhaling is hier mooi.** Drie gelijke crème walsenstoelen met rode snaarwielen, glazen buizen met vallend meel, witte buizen naar het plafond. Houd ze precies gelijk, met alleen een verschoven fase. De gouden kroon op de oorkonde is naast de korrel het enige goud.

#### Teksten

| | Shot 1 | Shot 2 |
|---|---|---|
| kicker | De Merodestraat 1976 | Op de walsenzolder 1976 |
| cap | Het gras is geel van de droge zomer. Aan de overkant staan de betonnen silo's uit de jaren dertig. De hoogste silo komt later. (24 woorden) | Onder de vloer zitten elektromotoren, met een snaar naar elke walsenstoel. Lucht zuigt het maalsel door buizen omhoog naar de zeven. (21 woorden) |
| desc | Beeld: langs geel verdord gras en een lantaarnpaal schuift aan de overkant van het kanaal de fabriek voorbij, met een bulkwagen bij de loods, een lichte molen, betonnen silo's en een schip dat gelost wordt, terwijl een fietser voorbijrijdt. | Beeld: langs een betegelde pilaar met een ingelijste oorkonde met een gouden kroon glijd je onder TL-buizen naar een crèmekleurige walsenstoel met een rood snaarwiel, tot dicht bij de glazen buis waarin één korrel hangt. |

#### Anders dan het storyboard

- Shot 1 beweegt zijwaarts in plaats van stijgend en vooruit (dat leek te veel op shot 1 van de hoofdintro). De fietser rijdt door het eindbeeld in plaats van alleen in de eerste 3 s; meerijden kan niet, want de camera gaat veel sneller dan een fiets.
- Shot 1 begint bij de laadloods, niet bij de buurfabriek, zodat de camera niet te snel gaat.
- Shot 2 is vooral een beweging vooruit; de korrel hangt in het glas en de duik gaat door de buis.

---

### 2008: de nieuwe molen

**Kern.** Een natte, grijze winterdag. Je begint in het graan van het schip en ziet dan het lichte molengebouw; binnen kijk je door de muren heen.
**Seizoen en licht.** Medio januari, zacht en nat, bewolkt, geen sneeuw. Avond: half zes, donker, natriumlicht op natte klinkers.
**Held.** Buiten de gele zuigmond in het gouden graan, binnen de gouden stroomlijn door de doorsnede.

#### Shot 1, buiten: terugtrekken en omhoog uit het graan (4,8 s)

- **Begin (t 0):** dichtbij in het ruim.
  - De goudgele graanberg vult y 30 tot 100%, met een kuil. Het gele mondstuk van de zuigbuis x 42 tot 58%, y 26 tot 54%, de grijze buis omhoog tot de bovenrand.
  - De rand van het roestrode ruim schuin bovenin, y 0 tot 20%. Een paar korrels glijden naar de kuil.
  - Titel 2008 in donkere inkt boven het graan.
- **Beweging:** 0,3 s stil, dan terug en omhoog (een kraanbeweging), met een lichte draai naar rechts. Uitzoomen circa 10 keer op een log-schaal, ooghoogte van 3 naar circa 14 m. De eerste seconde heel traag, dan gaat het beeld open: ruim, dek, kade en gevels, in die volgorde.
- **Eind (t 4,8):** hoog en schuin boven het schip (blik circa 20 graden omlaag), **niet recht van voren.**
  - Het ruim met graan als brede gouden band, y 66 tot 86%, met grijze luiken rechts. De rand van het schip y 86 tot 94%.
  - De natte kade met plassen, y 54 tot 64%. De gele kraan met zijn arm over het ruim, x 20 tot 36%.
  - De gevels y 0 tot 54%: grijze silo's x 0 tot 34%, het nieuwe molengebouw x 40 tot 74% (loopt boven uit beeld) met gele deuren onderaan, het bakstenen pand x 74 tot 100%.
  - De bulkwagen rechts op de kade, x 74 tot 98%, y 52 tot 60%. Geen horizon, hooguit een smalle strook grijze lucht bovenin.
  - Teken dek, ruim en kade als vlakke stroken tussen de lagen (zoals de akker in de hoofdintro); met de camera hoog boven het water geeft `env.view` met diepte dan vanzelf het schuine beeld.
- **Wat beweegt:** korrels naar het mondstuk (hooguit 24, alleen de eerste 1,5 s), water, het schip deint, twee meeuwen, trage wolken, de bulkwagen rijdt weg naar rechts. 's Avonds golven de lichtstrepen in het water mee; alle lampen branden vast.
- **Dag en avond:** zoals het storyboard.

#### Shot 2, binnen: de doorsnede (5,0 s)

- **Begin, beweging en eind:** zoals het storyboard: de hele doorsnede van begane grond tot verdieping 5, een S-bocht langs de controlekamer, eindigend bij de middelste walsenstoel. De buitenstroken links en rechts (grijze silo, baksteen) houden de verbinding met shot 1.
- **De korrel:** verschijnt in de laatste 0,8 s in het glazen stukje van de inlaat en blijft hangen, x 50%, y 34%.
- **De duik:** naar de spleet tussen de twee walsen, `diveAt` x 50%, y 69%.
- **Wat beweegt:** zoals het storyboard: gouden pulsjes langs de stroomlijn (hooguit 30), plansichters die schudden, lopende V-snaren, één lichte lijn over de schermen, korrels in de inlaat. TL vast, geen stof.

#### Drie aanwijzingen

1. **Grijs dat leeft.** Werk met twee grijzen (een koele en een iets warmere), natte glans op kade en dek, plassen met lucht erin. Geel is buiten de enige felle kleur, goud alleen het graan. Lage, platte wolkenbanken, geen zon, wel een lichtere plek laag links.
2. **Terugtrekken als uitademen.** Begin zo dichtbij dat het graan een abstract goud vlak is. Laat de eerste seconde heel traag gaan en eindig hoog en schuin boven het schip, nooit recht van voren met de skyline: dat is de hoofdintro.
3. **De doorsnede als levende bouwtekening.** Strakke snijvlakken met een fijne lijn, alles wit en RVS, één gouden lijn die rondgaat met pulsjes. De operator in de witte jas achter het glas is het menselijke middelpunt. Geen stof en geen rook.

#### Teksten

| | Shot 1 | Shot 2 |
|---|---|---|
| kicker | Nieuwe Kanaal 2008 | In de nieuwe molen 2008 |
| cap | Het nieuwe molengebouw is acht verdiepingen hoog, van staal en lichte panelen. Het hele complex is grijs met wat geel. (20 woorden) | Achter de panelen zitten cyclonen, zeefkasten, een controlekamer en walsen. De molen is volledig geautomatiseerd. (15 woorden) |
| desc | Beeld: eerst zie je een gele zuigmond in het graan van een binnenvaartschip; dan gaat de camera terug en omhoog tot je op een natte winterdag over het schip kijkt naar grijze silo's, oude bakstenen panden en het hoge lichtgrijze molengebouw met gele deuren. | Beeld: het molengebouw in doorsnede, met bovenin cyclonen, daaronder schuddende zeefkasten, een controlekamer met schermen, de walsenstoelen en onderin de motoren; de camera zoomt in op twee walsen en de korrel in de inlaat erboven. |

#### Anders dan het storyboard

- Het eindbeeld van shot 1 is hoog en schuin boven het schip in plaats van een totaal van voren over het water; dat laatste leek op het eindbeeld van shot 1 van de hoofdintro.
- Teksten: zie hoofdstuk 6.

---

### 2026: Molen B

**Kern.** Het jubileumjaar. Hoog boven de winterse stad hangt een walsenstoel aan de kraan; binnen zakt hij naar zijn plek in Molen B.
**Seizoen en licht.** Heldere, koude winterdag, lage bleke zon links, lange schaduwen. Avond: blauwe uur, bouwlamp, rood lampje, cyaan.
**Held.** De hangende en landende walsenstoel.

#### Shot 1, buiten: stijgen tot boven het dak (5,2 s)

- **Begin (t 0):** op het bouwterrein, ooghoogte 1,7 m, achter de kijkers.
  - De gevel van Molen B x 20 tot 100%, y 0 tot 70%. De kraanmast (vakwerk) x 6 tot 16% over de hele hoogte.
  - De aanwijzer, op de rug gezien, met gestrekte arm omhoog, x 62 tot 72%, y 58 tot 94%. De seiner x 78 tot 86%. De derde persoon bij de mastvoet.
  - Twee wachtende walsenstoelen op balken, x 22 tot 74%, y 66 tot 87%. Het bouwhek onderin, y 86 tot 100%. Lucht linksboven.
  - Titel 2026 in de lucht naast de mast.
- **Beweging:** 0,3 s stil, dan stijgen van 1,7 naar circa 50 m, inzoomen circa 3,7 keer en een fractie naar links. De blik kantelt van iets omhoog naar iets omlaag. Het vakwerk van de mast schuift dichtbij en snel voorbij, de gevelnaden stromen omlaag; bovenin komen kabel en last in beeld.
- **Eind (t 5,2):** zoals het storyboard.
  - De giek over de hele breedte y 2 tot 11%, de kabel x 49 tot 51% van y 16 tot 48%, haakblok en hijsjuk eronder.
  - De walsenstoel x 37 tot 63%, y 61 tot 79%: het lichtste, scherpste vlak in het midden.
  - Horizon op y 64% met de stad klein en wazig. De dakopening x 30 tot 70%, y 82 tot 88%, met de gele leuning. Twee mensen op het dak, x 14 tot 20% en x 79 tot 85%.
  - De maaltoren van de hoofdintro alleen klein en wazig aan de rechterrand (x 88 tot 100%), zonder logo.
- **Wat beweegt:** de last zakt in het shot 4 m en komt rustig tot stilstand, 1,4 m boven het dak, en zwaait nauwelijks (±0,5 graden, 3,6 s); de mensen beneden wijzen, op het dak geeft de linker een klein zakgebaar; wolken drijven 2 px per seconde. 's Avonds brandt het rode lampje vast.
- **Dag en avond:** zoals het storyboard.

#### Shot 2, binnen: mee omlaag en de maalkamer in (5,0 s)

- **Begin, beweging en eind:** zoals het storyboard: onder de sparing zakt de walsenstoel in een bundel licht naar binnen, de camera zakt mee (van 4,5 naar 1,9 m), passeert de landende machine en gaat door de open deur van de maalkamer naar de walsen.
- **De korrel:** verschijnt in de laatste 0,8 s in de keel van de inloop en blijft hangen, x 50%, y 34%.
- **De duik:** recht door de spleet, `diveAt` x 50%, y 60%.
- **Wat beweegt:** de landende walsenstoel (stroppen worden slap), de touwhouders stappen achteruit, de walsen draaien langzaam tegen elkaar in, het grafiekje schuift één stap per seconde, hooguit 16 stofjes in de lichtbundel, ledjes vast.

#### Drie aanwijzingen

1. **Spanning door stilte.** Alles staat bijna stil, de last zwaait nauwelijks en iedereen kijkt. Laat veel lege winterlucht om de walsenstoel: dat is de eenzame hoogte. Teken niemand onder de last.
2. **Hoogte voelen.** Het vakwerk van de kraanmast schuift dichtbij en snel langs, de stad wordt klein en blauwig onder je, en je eindigt boven het dak met de horizon laag. Geen gevel recht van voren en geen logo: dat is de hoofdintro.
3. **Het mooiste materiaal van de reeks.** Glanzend RVS en gladde walsen, een lichtschacht uit het dak met stofjes, een machine die zacht landt. 's Avonds donker met cyaan schermpjes, zodat de overgang naar Molen B in het spel naadloos is.

#### Teksten

| | Shot 1 | Shot 2 |
|---|---|---|
| kicker | Leeuwarden 2026 | In Molen B 2026 |
| cap | Hoog boven de stad hangt een walsenstoel aan de kraan. Een Zwitserse molenbouwer richt Molen B in, naast de molen uit 2008. (22 woorden) | Binnen zakt de walsenstoel naar zijn plek. De molens draaien op groene stroom uit Nederland. Straks ga jij tussen deze walsen door. (22 woorden) |
| desc | Beeld: op een bouwterrein wijzen mensen met helmen omhoog; de camera stijgt langs een oranje kraan en de gevel tot boven het dak, waar een lichtgrijze walsenstoel hoog boven de stad aan de haak hangt, vlak boven een opening in het dak. | Beeld: in de nieuwe molenzaal zakt de walsenstoel door een bundel licht naar zijn plek, naast een rij walsenstoelen met schermpjes en lampjes; de camera gaat dicht naar twee glanzende walsen, met de korrel erboven. |

#### Anders dan het storyboard

- Shot 1 begint achter de kijkers en laat de kraanmast dichtbij langs schuiven, zodat het iets anders voelt dan de stijging langs de maaltoren in de hoofdintro. Duur 5,2 s in plaats van 4,8 s.
- Shot 2 duurt 5,0 s in plaats van 4,6 s.
- Cap 2: "Elektromotoren drijven de walsen aan" is weg, omdat 1976 dat al zegt.

---

## 6. Alle twaalf teksten achter elkaar

Zo leest de reeks als je hem in één keer leest:

1. **Holwerd 1846.** Holwerd ligt op een terp achter de zeedijk. Schuiten brengen zakken boekweit over de vaart. Achter de open deur loopt een paard zijn rondjes.
2. **In de rosmolen 1846.** Het paard met oogkleppen draait de spil. Boven zijn hoofd grijpt het kamwiel in een klein rondsel. Zo gaat de steen veel sneller rond.
3. **Leeuwarden 1867.** Hier draait geen paard meer rond. Er rookt een schoorsteen. Losse arbeiders dragen het graan zak voor zak van de tjalk naar binnen.
4. **In de stoommeelfabriek 1867.** De stoker houdt het vuur onder de ketel aan. Het vliegwiel geeft zijn kracht via riemen en een as door aan de bovenste molensteen.
5. **Noordvliet 1920.** De meelfabriek en de graanpakhuizen staan hoog langs het water. Op de kade wacht een paard met een wagen vol zakken.
6. **In de meelfabriek 1920.** Boven schudt de plansichter, een zeefkast aan stokken. Eronder malen de walsen. Leren riemen van een lange as drijven ze aan.
7. **De Merodestraat 1976.** Het gras is geel van de droge zomer. Aan de overkant staan de betonnen silo's uit de jaren dertig. De hoogste silo komt later.
8. **Op de walsenzolder 1976.** Onder de vloer zitten elektromotoren, met een snaar naar elke walsenstoel. Lucht zuigt het maalsel door buizen omhoog naar de zeven.
9. **Nieuwe Kanaal 2008.** Het nieuwe molengebouw is acht verdiepingen hoog, van staal en lichte panelen. Het hele complex is grijs met wat geel.
10. **In de nieuwe molen 2008.** Achter de panelen zitten cyclonen, zeefkasten, een controlekamer en walsen. De molen is volledig geautomatiseerd.
11. **Leeuwarden 2026.** Hoog boven de stad hangt een walsenstoel aan de kraan. Een Zwitserse molenbouwer richt Molen B in, naast de molen uit 2008.
12. **In Molen B 2026.** Binnen zakt de walsenstoel naar zijn plek. De molens draaien op groene stroom uit Nederland. Straks ga jij tussen deze walsen door.

### Wat ik veranderde en waarom

- **Drie keer "motoren drijven de walsen aan"** (1976, 2008 en 2026 in de storyboards). Nu zegt alleen 1976 het. 2008 gaat over de automatisering en de controlekamer, 2026 over groene stroom en de nieuwe machine. Zo heeft elke film een eigen nieuws over de aandrijving.
- **"Lucht zuigt" en "lucht blaast" het maalsel omhoog** stond in 1976 en 2008. Nu alleen in 1976.
- **Te veel schepen.** Schuit (1846), tjalk (1867), "een tjalk lost zijn graan" (1920), "een schip met graan ligt aan de kade" (1976) en de hoofdintro zegt al "Graan komt per schip aan". Nu staat het schip alleen nog in 1846 en 1867 in de tekst; in 1920 en 1976 zie je het wel, maar gaat de tekst over hoogte en over de zomer.
- **Plek dubbel.** "Aan het Noordvliet" en "aan het Nieuwe Kanaal" stonden in de cap terwijl de kicker en de introband het al zeggen. Weg.
- **Trucjes met een dubbele punt** ("Een molen zonder paarden of wieken: hier rookt een schoorsteen", "is van 2006: acht verdiepingen, staal en lichte panelen"): nu gewone zinnen.
- **Vaktaal zonder beeld:** "twee grijzen en wat geel" werd "grijs met wat geel"; "krijgen hun kracht via" werd "drijven ze aan".
- **"Jij"** stond in 1867 ("Jij valt zo tussen de stenen") en 2026. Nu alleen in 2026, als slot van de reeks.
- **Een jaartal in een cap van een ander jaar** ("is van 2006" in 2008) verwarde. Weg; "naast de molen uit 2008" in 2026 blijft, want dat verbindt twee films.
- **Werkwoorden:** "draaien" staat nu drie keer in de twaalf caps (1846, 1867 en 2026), "drijven aan" één keer (1920). Geen twee caps openen met dezelfde woorden.
- **Lengte:** 15 tot 24 woorden, gemiddeld circa 21.

---

## 7. Voor de hoofdbouwer (het raamwerk)

Ik pas het spel niet aan. Dit zijn de verzoeken die nodig zijn om de regels hierboven waar te maken, van belangrijk naar minder belangrijk:

1. **Overvloeien tussen shot 1 en shot 2 van een jaarintro.** Nu is die wissel een harde knip (introNext roept ixSnap niet aan bij de stap naar het volgende shot). In de hoofdintro loopt de camera door; in de jaarintro gaat het van buiten naar binnen. Vraag: bij IN.jy ≥ 0 ook ixSnap() vóór introShot(IN.i + 1), zodat de shots 0,32 s in elkaar overvloeien.
2. **Geen stilstand in de keten.** jt0 = 0 in plaats van -0,6 als de jaarintro direct na de hoofdintro komt (openJaar, chain). De sluier gaat dan open over een beeld dat al beweegt.
3. **De korrel valt voorop in de duik.** Voorstel: een jaar geeft naast diveAt ook grainAt(env) (plek en schaal van de korrel). Bij de eerste frame van de duik tekent het raamwerk het beeld één keer zonder korrel (bijvoorbeeld env.noGrain = true tijdens die ene draw) als kopie, en tekent het de korrel er zelf overheen: in de eerste 0,3 s valt hij versnellend van grainAt naar diveAt en wordt iets kleiner, pas daarna zoomt de kopie in en wordt het donker. Eén extra drawGrain per frame, geen nieuw tekenwerk.
4. **De stub tekent het jaartal blijvend groot in beeld.** Die regel moet weg; de titel van 2.5 komt in de plaats (in het eigen gebied van elk jaar, of als hulpje env.title(g, t) in het raamwerk zodat de zes gelijk zijn; dat laatste heeft mijn voorkeur).
5. **Voorbeeld in het commentaarblok:** 'Holwerd, 1846' wordt 'Holwerd 1846' (zonder komma, zoals "Halverwege 1846").
6. **Optioneel:** de duik eindigt in de wandkleur van die molen (LEVELS[i].pal.wall) in plaats van #0b0c0d, met de sluier in dezelfde kleur. Dan kom je na de duik aan in het materiaal van het spel (donker hout in 1846, groen in 1920). Alleen doen als de sluier mee kan.

---

## 8. Voor de feitencontroleur

Ik heb geen nieuwe feiten toegevoegd; ik heb ingekort en anders gezegd. Wat je moet nalopen:

| Jaar en shot | Tekst | Wat ik veranderde | Bron in het storyboard |
|---|---|---|---|
| 1846-1 | ongewijzigd | | storyboard 1846, §6 |
| 1846-2 | "grijpt het kamwiel in een klein rondsel", "Zo gaat de steen veel sneller rond" | "drijft aan" werd "grijpt in"; "dus de steen draait veel sneller" werd "Zo gaat de steen veel sneller rond" | [W3], [W5] |
| 1867-1 | "Hier draait geen paard meer rond. Er rookt een schoorsteen." | in plaats van "Een molen zonder paarden of wieken: hier rookt een schoorsteen"; de wieken zijn weggelaten | royalkoopmans.com (paarden vervangen door stoomkracht), Lintsen p. 84 |
| 1867-1 | kicker "Leeuwarden 1867" | het storyboard adviseerde Leeuwarden, niet Noordvliet | storyboard 1867, twijfelpunt 1 |
| 1867-2 | "Het vliegwiel geeft zijn kracht via riemen en een as door aan de bovenste molensteen." | samengevoegd uit de cap en de reservecap; "riemen" in het meervoud (riem 1 en riem 2 in het beeld) | Lintsen p. 81-82; riemen middel |
| 1920-1 | "De meelfabriek en de graanpakhuizen staan hoog langs het water." | "Aan het Noordvliet" en "Een tjalk lost zijn graan" weg; "hoog" toegevoegd als beeldbeschrijving (vijf en zeven lagen op de foto) | foto Noordvliet vóór 1926 |
| 1920-2 | "Eronder malen de walsen. Leren riemen van een lange as drijven ze aan." | "Eén verdieping lager krijgen de walsen hun kracht via" werd "Eronder ... drijven ze aan"; "malen" voor wat walsen doen | Line shaft, machinemuseum; research-molenproces |
| 1976-1 | "Het gras is geel van de droge zomer. Aan de overkant staan de betonnen silo's uit de jaren dertig. De hoogste silo komt later." | samengevoegd uit de cap en de reservecap; het schip is weg | KNMI; HCL 1ed337c5, e7606c8b; skyscraperpage, HCL 194691c4 |
| 1976-2 | "Onder de vloer zitten elektromotoren, met een snaar naar elke walsenstoel." | "met snaren" werd "met een snaar naar elke walsenstoel" | HCL 5fdd671a (per walsenstoel een snaar door de vloer), Posner en Hoseney |
| 2008-1 | "Het nieuwe molengebouw is acht verdiepingen hoog, van staal en lichte panelen. Het hele complex is grijs met wat geel." | "aan het Nieuwe Kanaal is van 2006" weg; "twee grijzen en wat geel" werd "grijs met wat geel" | Heldoorn Ruedisüli (midden) |
| 2008-2 | "Achter de panelen zitten cyclonen, zeefkasten, een controlekamer en walsen. De molen is volledig geautomatiseerd." | nieuw samengesteld uit de banner en de reservecap; "motoren" en "lucht blaast" weg | banner Molen A (midden), Bakery Sweets Center 2022 (hoog) |
| 2026-1 | ongewijzigd | | LinkedIn van de COO, LC via headliner |
| 2026-2 | "De molens draaien op groene stroom uit Nederland." | "Elektromotoren drijven de walsen aan" weg; de rest is de zin van de bron | royalkoopmans.com, schone energie |
| alle | kickers zonder komma | vorm, geen feit | |

Twee punten die meer zijn dan formulering, voor jouw oordeel:
- **"Noordvliet 1920"** als plek: het storyboard van 1920 noemt dit hoog; het storyboard van 1867 twijfelt over het Noordvliet in 1867, niet in 1920.
- **"De hoogste silo komt later"** steunt op skyscraperpage (laag) en de foto's van HCL. Als je het te zwak vindt, laat de laatste zin weg (de cap heeft dan 19 woorden).
