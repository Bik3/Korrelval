# Storyboard jaarintro 1867: de stoommeelfabriek in Leeuwarden

Twee shots, elk met een camerabeweging van ongeveer 4,6 tot 4,8 s. Shot 1 laat buiten de fabriek aan het water zien, met een tjalk die gelost wordt. Shot 2 gaat binnen van de ketel en het vliegwiel langs riem en as naar de molenstenen, en eindigt bij de korrel boven de graanbak, klaar voor de duik.

**Afspraken voor de tekenaar**
- Stijl: dezelfde vlakke, gestileerde vormen als de hoofdintro (Path2D per kleur, statische lagen vooraf op offscreen-canvassen). Licht thema is dag, donker thema is avond.
- Maat: 1 eenheid (e) is ongeveer 10 cm. Een volwassen silhouet is 17 e hoog.
- Assen: x loopt van links naar rechts. y is negatief naar boven. Buiten is y = 0 het wateroppervlak, binnen is y = 0 de vloer.
- Cameravakken staan als `[x0, x1, y0, y1]`, net als IBOX in de hoofdintro: het vak past precies in het beeld boven het paneel (staand op breedte, liggend op hoogte). Zoom loopt logaritmisch en de beweging gebruikt ixEase. Staand zie je dus veel meer lucht en voorgrond dan in het vak staat. Teken daarom buiten lucht tot y = -1000 en voorgrond tot y = +450.
- Betrouwbaarheid: **hoog** = staat zo in een bron. **Midden** = de bron zegt het voor Leeuwarden of de jaren 1860 in het algemeen, maar niet voor deze fabriek. **Laag** = aanname of tekenkeuze.

---

## 1. Wat klopt

### 1a. Plek en omgeving

| Bewering | Bron | Betrouwbaarheid |
|---|---|---|
| In 1867 nam Koopmans de stoommeelfabriek van koopman Hein Blok Wybrandi in Leeuwarden over. | nl.wikipedia.org/wiki/Koopmans_Koninklijke_Meelfabrieken; `onderzoek/research-molenproces.json` | hoog |
| De fabriek lag aan het Noordvliet en heette later Stoommeelfabriek Friso. | royalkoopmans.com/over-royal-koopmans/de-geschiedenis-van-koopmans (plaatst dat in **1876-1900**); `onderzoek/koopmans-site.md` §2; `korrelval.html` LEVELS[1].intro; bouwopdracht "Correcties" | **laag voor 1867**. Wikipedia noemt geen plek voor de fabriek van Wybrandi. Zie twijfelpunt 1. |
| Het Vliet is een vaart aan de oostkant van Leeuwarden. Het Noordvliet is de noordelijke oever en loopt vanaf de Oostersingel oostwaarts. | nl.wikipedia.org/wiki/Vliet_(Leeuwarden); nl.wikipedia.org/wiki/Noordvliet_(Leeuwarden) | hoog |
| Rond 1860 is het Vliet "eene nijvere streek" met lijm- en zoutziederijen, oliemolens, een houtzagerij, een tichelwerk, een pottenbakkerij en scheepstimmerwerven, en er is druk scheepsverkeer. | R. Visscher, *Leeuwarden van 1846 tot 1906* (Historisch Centrum Leeuwarden), wandeling 1860: historischcentrumleeuwarden.nl/images/pdf/Geschiedenis_van_Leeuwarden_2_R_Visscher.pdf | hoog |
| Langs beide oevers van het Vliet kwam in 1861 een stenen walmuur. Het Vliet werd in 1857 uitgediept. | Visscher (zelfde pdf) | hoog |
| Over het Vliet lagen houten trapjesbruggen (Blauwebrug, Poppebrug). De Witte Brug werd in 1861 een ijzeren ophaalbrug. | Visscher | hoog |
| De waterkant van het Vliet is met bomen beplant. | Visscher (beschrijving rond 1906, "weinig veranderd") | midden |
| Aan het Vliet stonden sinds de 18e eeuw pakhuizen. Het gaat om baksteen onder een zadeldak met een topgevel naar het water, laaddeuren in het midden, vensters aan weerszijden, houten luiken en een hijsdeur in de top. | HCL, *Pakhuizen in Leeuwarden* (Open Monumentendag 2002): historischcentrumleeuwarden.nl/images/pdf/OMD-publicaties/omd-boekje-2002.pdf; nl.wikipedia.org/wiki/Lijst_van_pakhuizen_in_Leeuwarden | hoog |
| Pakhuis Petersburg (1750, hoek Oostersingel en Noordvliet) diende lang voor graan uit het Oostzeegebied. | HCL 2002 | hoog |
| Aan het Noordvliet staan ook 18e-eeuwse herenhuizen en eenvoudige woonhuizen onder zadeldak tussen topgevels. | nl.wikipedia.org/wiki/Noordvliet_(Leeuwarden) (monumentenlijst) | hoog |
| De Oldehove, de brede scheve toren uit de 16e eeuw, mag als silhouet in de verte staan. | nl.wikipedia.org/wiki/Oldehove_(gebouw) | midden: de toren bestond, maar de zichtlijn vanaf het Vliet is niet gecontroleerd |
| Er was nog geen Nieuwe Kanaal. Dat ging pas in 1895 open. | Visscher | hoog |

### 1b. Het fabrieksgebouw

| Bewering | Bron | Betrouwbaarheid |
|---|---|---|
| Het gebouw is van baksteen, met een zadeldak, een eenvoudige topgevel naar het water, drie bouwlagen plus een kap en laaddeuren in het midden onder een segmentboog. De vensters aan weerszijden hebben houten luiken. De zijgevel is van Friese geeltjes, met rondboogvenstertjes. | Beschrijving van Noordvliet 145 (gebouwd rond 1874) en Koningsbergen in HCL 2002. Dit is het bouwtype aan het Vliet, niet het pand van Wybrandi zelf. | midden |
| Er is een lage aanbouw voor ketel en machine. Een stoommachine stond "onderin de windmolen of in een bijgebouw". | Lintsen e.a., *Geschiedenis van de techniek in Nederland* I, hoofdstuk Molenbedrijf en meelfabriek, p. 81-84: dbnl.org/tekst/lint011gesc01_01/lint011gesc01_01_0006.php | midden |
| De schoorsteen is van baksteen, **vierkant en taps**, met een uitkragende kop en zonder naam of versiering. Ronde schoorstenen van radiaalsteen kwamen pas later. Een schoorsteen uit 1895 geldt als een van de oudste van die soort. | monumentenregister.cultureelerfgoed.nl/monumenten/pdf/506265 | midden: de vierkante vorm is de veilige keuze |
| Er komt rook uit de schoorsteen. Omwonenden van vroege stoommolens klaagden over "dikke wolken der kolendamp". | Lintsen p. 81 | hoog |
| Ramen met houten kozijnen en kleine ruitjes. | HCL 2002 (pakhuizen: luiken, aanvankelijk soms zonder glas) | laag |
| Er staat geen naam op de gevel. De naam Friso hoort bij 1876-1900. | royalkoopmans.com geschiedenis | hoog |

### 1c. De aandrijving binnen

| Bewering | Bron | Betrouwbaarheid |
|---|---|---|
| De stoommachine had 2 pk (1,5 kW) en bleek ontoereikend. | Wikipedia Koopmans; `onderzoek/spelmateriaal.json` | hoog |
| 2 pk is heel klein. In 1867 had de Rotterdamse Meel- en Broodfabriek machines van 45 en 8 pk voor 10 koppels stenen, en De Korenschoof in Utrecht had in 1864 20 pk. Teken dus één kleine machine en **één koppel stenen**. | Lintsen p. 93 | midden |
| Een stoommachine dreef een vrijstaande **maalstoel** aan. Dat is een houten of ijzeren stoel van 1,10 tot 1,20 m hoog met de stenen erbovenop. Onderin draait een liggende as die via tandwielen de steenspil van de loper aandrijft. Het meel komt op de begane grond eruit. | Lintsen p. 81-82 | hoog |
| De ketel staat bij de machine, met een stoker. Een meelfabriek had rond 1860 een machinist, een stoker, een chef-molenaar en knechts. | Lintsen p. 82 en tabel 3.4 (p. 94) | hoog in het algemeen, midden voor deze fabriek |
| Brandstof: de stoomkorenmolen in Leeuwarden draaide in 1856 met minder voordeel "door de duurte van turf". Leg dus een stapel turf bij de ketel. | Lintsen p. 85 | midden: of dit dezelfde molen is, weten we niet |
| De machine heeft een vliegwiel en een regulateur met twee draaiende bollen. | algemene techniek van stoommachines; monumentenregister 393990 (stoommachines "met vliegwiel, drijfwerk") | midden |
| Van het vliegwiel loopt een leren riem naar een drijfas onder de balken, en van daar een riem naar de as van de maalstoel en een naar de buil. | Lintsen noemt een tussenas met tandwielen. Leren drijfriemen bestonden (Drost, Haarlem; nhnieuws.nl/nieuws/357667). HCL 2002 noemt "poelies en drijfriemen" bij een graanelevator. | midden voor de riemen, hoog voor as en tandwielen |
| Het maalkoppel bestaat uit een ligger die stil ligt en een loper die draait. Daaromheen zit een houten steenkuip. Boven de kuip hangt een kaar (graanbak) met een schuddebak die het graan door het kropgat laat lopen. Het meel gaat via de meelpijp naar de meelbak en de zak. Naast de stoel staat een steenkraan. | nl.wikipedia.org/wiki/Maalkoppel | hoog |
| Stenen van 1,3 tot 1,5 m doorsnee, de loper ongeveer 40 cm dik. Blauwe steen (basaltlava uit de Eifel) of Franse steen (kwartsiet met ijzeren banden, goed voor tarwe). | nl.wikipedia.org/wiki/Molensteen | hoog. Voor de kleur: neem blauwe steen, zoals de 1867-palet van het spel (`slab #3A3F44`). |
| Buil: een schuin aflopende, draaiende cilinder met gaas in een houten kast. Het fijnste meel valt er bovenaan door. | Lintsen p. 89-90 | hoog |
| Geen walsen en geen plansichter. Dat zijn steenkoppels in een stoommolen van de jaren 1860. | Lintsen (Rotterdam 1867: "10 koppels molenstenen"); bouwopdracht "Correcties" | hoog |
| Binnen dragen houten balken en standvinken de vloeren, zoals in de pakhuizen aan het Vliet. | HCL 2002 (Koningsbergen: "zware standvinken") | midden. Het spel tekent in 1867 gietijzeren kolommen: zie twijfelpunt 8. |

### 1d. De aanvoer van graan

| Bewering | Bron | Betrouwbaarheid |
|---|---|---|
| Graan kwam per schip. Leeuwarden was bereikbaar voor grotere schepen, Holwerd niet, en er kwam ook graan uit Amerika en de Baltische staten. | Wikipedia Koopmans; royalkoopmans.com; STORIES[1] | hoog. Dit staat al in STORIES[1], dus het komt alleen in het beeld en niet in de tekst. |
| De stadsgracht ten westen en noorden werd in de jaren 1850 bevaarbaar voor grote schepen, en het Vliet werd uitgediept. | Visscher | hoog |
| Aan de kade ligt een **houten tjalk**: één mast, gaffeltuig, zijzwaarden, ronde boeg. In de 19e eeuw was de tjalk het werkpaard op het binnenwater. Tjalken waren eerst van hout en later van ijzer. | nl.wikipedia.org/wiki/Tjalk | hoog voor het type, laag voor deze fabriek |
| Het zeil is getaand bruin. | nl.wikipedia.org/wiki/Tanen | midden |
| Het graan gaat in zakken van het schip over de plank naar binnen, en met een touw en katrol omhoog naar de hijsdeur. | Visscher 1860 ("de wal vol zakken graan"); HCL 2002 (hijshaken en hijsdeuren in pakhuizen; dragers brachten graan "tot opten eersten zolder") | midden |
| Lossen deden in de 19e eeuw steeds meer losse arbeiders. Ze stonden op de bruggen over het Vliet te wachten op werk. | HCL 2002 | hoog |

### 1e. Mensen (alleen silhouetten, geen gezichten)

| Bewering | Bron | Betrouwbaarheid |
|---|---|---|
| Werklieden dragen een kiel (een linnen hemd dat over de andere kleren gaat), een pet (klak) en klompen. | nl.wikipedia.org/wiki/Kiel_(kleding); nl.wikipedia.org/wiki/Pet_(hoofddeksel); nl.wikipedia.org/wiki/Klomp | midden |
| Een koopman draagt een halfhoge hoed en een lange jas. De eigenaar mag hooguit zo, klein in de deuropening. | N. Ottema, *Oude klederdrachten Friese boer en boerin*, oks.nl pdf 046; opdracht.md (familie hooguit als silhouet in de verte) | midden |
| Een burgervrouw draagt een lange rok, een omslagdoek en een muts met een Fries oorijzer. Het oorijzer mag als een klein goudglansje op het silhouet zitten. | nl.wikipedia.org/wiki/Oorijzer (Friese oorijzers 1830-1870); Ottema, *Klederdrachten van Friesland* (LC 1949): oks.nl pdf 116 ("Leeuwarder burgerdame met Fries oorijzer en muts 1837") | hoog |
| Binnen staan een stoker met een schop bij de ketel en een molenaar bij de stenen. Hij is iets lichter van kleur door het meelstof. | Lintsen tabel 3.4 | midden |

### 1f. Licht

| Bewering | Bron | Betrouwbaarheid |
|---|---|---|
| Leeuwarden had **gas** vanaf 1845, met een gasfabriek bij de Hoeksterpoort. De gemeente nam die in oktober 1865 over, en in juli 1867 begon een uitbreiding. Het stadhuis kreeg in 1867 een gasleiding en de Lutherse kerk in 1861 gaslicht. | Visscher, hoofdstuk De Gasfabriek | hoog |
| Of er gas lag in de buitenbuurt aan het Vliet, en in deze fabriek, is onbekend. | | laag. Teken daarom geen gaslantaarns op de kade. |
| **Petroleum** was er: de Harlingerstal diende vanaf 1864 of 1866 als petroleumpakhuis. Olielampen kon je dus ook gebruiken. | Visscher (noemt beide jaren) | hoog |
| Binnen hangt één lamp met een glazen bol aan de muur, met een gesloten vlam en niet boven de stenen. Gas sluit aan bij het spel en de stijlgids ("1867: gaslampen met warm geel licht"). | stijlgids.md; Visscher | midden voor gas, hoog voor de keuze voor een gesloten lamp |
| Overdag komt het licht door de ramen. 's Avonds komt het van de lamp en de vuurgloed uit de ketel. | | keuze |
| Elektrisch licht is er niet. Visscher noemt "electrische beweegkracht" als iets van na 1846. | Visscher | hoog |

### 1g. Seizoen en weer
- **Keuze: nazomer, begin september.** De bomen hebben nog volle bladeren en er wordt geladen en gelost. Er is een lichte westenwind, dus de rook drijft naar rechts. De zon staat laag links, net als in de hoofdintro (strijklicht van links). Het donkere thema is dezelfde avond, kort na zonsondergang, met de gloed laag links aan de hemel. Betrouwbaarheid: **laag**. Geen bron noemt de maand van de overname.
- Een Hollandse lucht met een paar stapelwolken past bij de huisstijl (`onderzoek-royal-koopmans.md`, Beeldtaal).

---

## 2. Mag niet

| Niet tekenen | Waarom | Bron |
|---|---|---|
| Walsen of walsenstoelen, plansichters, zuiveraars of elevators van staal | In het spel komen die pas vanaf 1920. Elders bestond in 1867 al een walsenmolen (Sas van Gent), maar niet bij Koopmans. | bouwopdracht "Correcties"; nl.wikipedia.org/wiki/Meelfabriek |
| Elektriciteit: gloeilampen, kabels, schakelaars, elektromotoren, ledjes, schermen | kwam pas later | Visscher |
| Kunststenen of gegoten molenstenen | bestaan sinds ongeveer 1900 | nl.wikipedia.org/wiki/Molensteen |
| Een ronde schoorsteen van radiaalsteen, of een naam of mozaïek op de schoorsteen | de oudste radiaalsteen-schoorstenen zijn van ongeveer 1895 | monumentenregister 506265 |
| De moderne maaltoren, silo's, beton, glas en staal, het Nieuwe Kanaal, De Merodestraat, een loskraan of zuigbuis | Nieuwe Kanaal 1895, eerste gebouw aan De Merodestraat 1929-1930 | Visscher; `onderzoek-royal-koopmans.md` tijdlijn |
| Het logo, de kroon, het woord "Koopmans" of "Friso" op de gevel, of huisstijloranje op gebouwen | de naam Friso is van na 1876; het logo hoort bij nu | royalkoopmans.com |
| Auto's, vrachtwagens, bulkwagens, fietsen, trams, telefoon- of telegraafpalen | Visscher noemt ze als latere uitvindingen | Visscher |
| Gaslantaarns op de kade en brandkranen | niet bekend voor het Vliet in 1867; de waterleiding kwam later | Visscher |
| IJzeren of stalen motorschepen, of een stoomboot vooraan in beeld | er waren al stoomboten (1855), maar die leiden af; houd het bij een houten zeiltjalk | Visscher; Wikipedia Tjalk |
| Pallets, big bags, papieren zakken van 25 kg, heftrucks, veiligheidshesjes, helmen, overalls of spijkerbroeken | modern | |
| Gezichten van echte personen, of Uilke herkenbaar in beeld | regel van de opdracht | opdracht.md |
| Getallen of tonnages in de tekst | regel van de stijlgids | stijlgids.md |

---

## 3. De shots

### Shot 1, buiten: de fabriek aan het water (duur 4,8 s)

**Wat je ziet, van achter naar voor.** Parallax tegenover de middenlaag: verte 0,4, middenlaag 1,0, water 1,0, nabije oever 1,25, voorgrond 1,5.

1. **Lucht** (y -1000 tot -20). Verloop van boven naar de horizon. Licht: drie stapelwolken, bij (-450, -330) 220×70, bij (40, -380) 180×70 en bij (380, -300) 150×50, met een vlakke onderkant en een koele schaduwrand. Donker: twee lage, platte wolken met een warme onderrand, vijf sterren bovenin en een zonnegloed laag links (x -800, y -40).
2. **Verte** (parallax 0,4, horizon y -20). Links (x -800 tot -150) een vlak stadssilhouet van daken 20 tot 45 e hoog, met twee slanke torenspitsen en de **Oldehove** bij x -540: een brede toren met een platte top, 26 e breed en 70 e hoog, 3° scheef. Rechts (x 420 tot 800) een vlakke weilandstrook met een **oliemolen**: een achtkante romp op een stelling (trapezium van 30 naar 18 e breed, van y -20 tot -95), met een kap en vier wieken van 45 e.
3. **Overkant: het Noordvliet** (middenlaag, kade-bovenkant y -10, walmuur van baksteen van y -10 tot 0).
   - x -800 tot -470: lage huisjes van twee bouwlagen, nok y -70, topgevels in gemengde baksteen.
   - x -470 tot -330: een **houten trapjesbrug** over het water, waar het Vliet links een flauwe bocht maakt. Teken een hoge boog met treden, dek-bovenkant y -38, en een leuning. Mag blauw geschilderd zijn (naar de naam Blauwebrug; betrouwbaarheid laag). Op de top staan **drie kleine silhouetten van losse arbeiders**, met de handen in de zakken of op de leuning.
   - x -300 tot -190: een **herenhuis**, gepleisterd en licht, twee bouwlagen, een kroonlijst op y -62, een halfronde dakkapel en de nok op y -95.
   - x -180 tot -40: twee eenvoudige woonhuizen onder zadeldak tussen topgevels, nok y -80.
   - x 15: een **linde**, kruin op (15, -95) met straal 45 en stam van y -50 tot -10.
   - x 60 tot 190: **de fabriek**, het hoofdblok. De dakvoet ligt op y -100 en de top van de topgevel op y -150. In het midden boven elkaar liggen de laaddeuren:
     - een dubbele deur op de begane grond (x 112 tot 138, y -38 tot -10) met een segmentboog; die staat **open** en is donker van binnen;
     - op de eerste en tweede verdieping een hijsdeur;
     - in de top een hijsdeur met een **hijsbalk** die 10 e naar voren steekt op y -132, met een katrol en een touw.

     Per verdieping staan aan weerszijden twee ramen (x 70 tot 88 en x 162 tot 180, elk 12 e hoog) met een segmentboog, kleine ruitjes en groene luiken die half open staan. Onder zit een plint van 6 e. De rechter zijgevel is een smalle strook Friese geeltjes.
   - x 190 tot 250: het **ketelhuis**. Eén laag hoog, met een lessenaarsdak van y -42 tot -55 tegen het hoofdblok. Het heeft een boogdeur (x 205 tot 225, y -30 tot -10) waarachter de vuurgloed zichtbaar is: overdag zwak, 's avonds sterk. Er zit een dunne uitlaatpijp op x 245 tot y -70.
   - **Schoorsteen**: vierkant en taps, van x 226 tot 240 aan de voet (y -55) tot x 228 tot 238 boven (y -230). De kop kraagt uit (y -236 tot -230, 16 e breed). Er zitten twee ijzeren banden op y -120 en -180.
   - x 252 tot 290: een open houten afdak met een **stapel turf**.
   - x 310: een tweede boom, kruin op (310, -100) met straal 40.
   - x 340 tot 560: een sober **pakhuis**, zoals Noordvliet 145. Drie bouwlagen plus een kap, nok y -150, laaddeuren in het midden en luiken.
4. **Water** (y 0 tot 110). Vlak verloop met korte rimpelstreepjes die naar links schuiven. Er zijn zachte, verticaal gerekte weerspiegelingen van de fabriek en de bomen, en 's avonds gele strepen onder de verlichte ramen.
5. **Tjalk** aan de kade voor de fabriek. Waterlijn y 4, romp van x 30 (ronde boeg links) tot x 230 (achterschip rechts met roer en helmstok). Het boord ligt in het midden op y -8 en loopt op naar y -16 bij de boeg en het achterschip: hij is beladen en ligt diep.
   - Een berghoutlijn en daarboven een boeisel-streep.
   - Mast op x 80 tot y -130, met gaffel en giek en een **opgedoekt bruin zeil**.
   - Het zijzwaard aan onze kant is opgehaald: een peervorm van x 95 tot 120.
   - Het ruim staat open (x 110 tot 200), met zakken en een berg graan.
   - Een loopplank loopt van het dek (x 140, y -8) schuin naar de kade (x 132, y -11).
   - Een scheepslantaarn hangt aan de mast op y -40. Die brandt alleen 's avonds.
6. **Mensen bij de tjalk** (17 e hoog). Eén drager loopt met een zak op de schouder over de plank naar de open deur. Een tweede staat in het ruim en tilt een zak. Een schipper aan het roer. In de deuropening staat klein een man met een halfhoge hoed. Bovenaan hangt een zak aan het touw van de hijsbalk.
7. **Nabije oever** (y 110 tot 150, parallax 1,25). De voorkant van een bakstenen walmuur met een lichtere afdekrand op y 110, een houten meerpaal op x -120 (y 90 tot 140) en een opgerold touw.
8. **Voorgrond** (y 150 tot 450, parallax 1,5). Een kade van keien met een steekwagen met twee zakken op x -260. Verder leeg. Dit deel zie je vooral als het beeld staat.

**Camera.** Een glijvlucht van links naar rechts die eindigt op de fabriek. Hij zakt zacht omlaag en zoomt ongeveer 3,4 keer in, ongeveer zoals shot 1 van de hoofdintro.
- Beginvak `[-620, 380, -400, 120]`. Je ziet de stad en de Oldehove links, de brug met de wachtende arbeiders, de huizen, de linde en rechts aan de rand de fabriek met de rokende schoorsteen. De lucht neemt een flink deel in.
- Eindvak `[15, 305, -250, 25]`. De fabriek vult het beeld en de kop van de schoorsteen met rook staat net onder de bovenrand. De tjalk ligt over het onderste derde. Iets rechts van het midden ligt de open laaddeur, met de drager op de plank.
- Duur 4,8 s met ixEase. Halverwege dipt de camera 20 e (een sinusboog), zodat het voelt als landen. Daarna blijft het beeld staan tot Verder.

**Wat beweegt** (ook tijdens het stilstaande eindbeeld):
- **Rook**: maximaal 6 zachte wolkjes uit de schoorsteenkop. Ze groeien van straal 6 naar 22, drijven met 12 e/s naar rechts en omhoog, leven 4 s en gaan van alpha 0,5 naar 0.
- **Stoom**: om de 0,9 s een wit pufje uit de uitlaatpijp, 8 e/s omhoog, 1,6 s lang.
- **Water**: rimpels schuiven met 6 e/s naar links, en de weerspiegelingen golven met een sinus van 2 e.
- **Tjalk**: deint ±0,6 e met een periode van 4 s en rolt ±0,4°.
- **Zak aan de hijsbalk**: gaat in 4,8 s van het dek omhoog naar de hijsdeur en hangt daar in het eindbeeld.
- **Drager**: loopt met een zachte stapdeining over de plank en is bij het eindbeeld bijna bij de deur.
- **Oliemolen**: één omwenteling per 12 s.
- **Meeuwen**: twee, met trage vleugelslag.
- **Licht**: 's avonds flakkert de vuurgloed achter de ketelhuisdeur (alpha 0,85 tot 1, ruis van 0,3 s).

### Shot 2, binnen: van de ketel naar de stenen (duur 4,6 s)

**Overgang.** Shot 2 vloeit in ongeveer 0,3 s over uit het eindbeeld van shot 1, zoals IX_XF. Je mag in die tijd nog iets naar de open laaddeur duwen.

**Wat je ziet, van achter naar voor.** Het is een doorsnede met de vloer op y 0, de balklaag op y -48 en de kap tot y -80.

1. **Kap en zolder** (y -80 tot -48). De dakbalken lopen van (-64, -60) via (0, -80) naar (64, -60). Op de zoldervloer ligt een stapel zakken (x -50 tot -20). Door een luik bij x 15 gaat een **houten stortkoker** naar beneden, 4 e breed, tot een mond op y -33.
2. **Balklaag** (y -48 tot -46). Een doorlopende band hout met balkkoppen om de 12 e.
3. **Achterwand** van baksteen (x -64 tot 64, y -46 tot 0). Er zitten twee ramen met een segmentboog in: x -40 tot -28 en x 34 tot 46, allebei van y -40 tot -18. Overdag valt uit het linker raam een schuine lichtbundel naar rechtsonder, met daarin trage stofjes.
4. **Ketelhuis** links, door een gemetselde boog (x -60 tot -46, y -26 tot 0). Daarachter is het donker. Het **ketelfront** is een ronde ijzeren plaat met klinknagels, middelpunt (-53, -13) en straal 8. De **vuurdeur** (x -56 tot -50, y -9 tot -4) gloeit oranje. Bij x -47 staat een **stoker** met een schop, half achter de boogrand. Op x -62 tot -57 ligt een stapel turf. Een stoompijp met een flens en een handwiel loopt van (-46, -22) naar de cilinder.
5. **Stoommachine** (liggend, klein).
   - Bed van natuursteen: x -40 tot -16, y -5 tot 0.
   - Cilinder met flenzen: x -38 tot -30, y -12 tot -5, met een schuifkast erop.
   - Zuigerstang naar een kruiskop in een geleiding (x -30 tot -22, y -8,5), en een drijfstang naar een kruk met straal 3 op de as van het vliegwiel.
   - Op een zuiltje bij (-34, -14 tot -21) staat een **regulateur** met twee messing bollen.
6. **Vliegwiel**, middelpunt (-12, -11) en straal 9. De onderkant valt in een sleuf in de vloer. Het heeft zes spaken, een velg van 1,4 e dik en een naaf van straal 1,5.
7. **Riem 1**, van leer en 1,2 e breed, loopt van de velg van het vliegwiel omhoog naar een riemschijf (straal 3,5) op de **drijfas**.
8. **Drijfas** op y -44, van x -20 tot 50. Hij hangt aan lagerbokken op x -6, 22 en 46. Er zitten drie riemschijven op: (-12, -44) met straal 3,5, (28, -44) met straal 3 en (46, -44) met straal 2,5.
9. **Riem 2** loopt van (28, -44) bijna recht omlaag naar een riemschijf met straal 2,5 op (29,5, -4), aan de as die onder de maalstoel uitsteekt.
10. **Maalstoel**, een houten stoel van x 6 tot 24 en y -12 tot 0, met vier poten en dwarsregels. In het open onderstel zit de liggende as op y -4 (x 4 tot 31). Een kegelvormig **kamwiel** op (15, -4) met straal 3 grijpt in het rondsel van de **steenspil** op x 15.
11. **Steenkuip** op de stoel (x 6 tot 24, y -19 tot -12), van hout met twee ijzeren hoepels. Teken de voorkant als **doorsnede**, net als drawStone in het spel. Dan zie je de stilliggende **ligger** (y -15 tot -12, donker) en daarop de draaiende **loper** (y -19 tot -15,5) met lichte scherpselstreepjes. Die doorsnede is een stilering: zie twijfelpunt 7.
12. **Kaar** op een houten bok boven de kuip: een trechter van x 9 tot 21 op y -31, die smaller wordt naar x 13 tot 17 op y -24. Bovenin ligt een bergje graan. Een **schuddebak** loopt schuin van (17, -24) naar het kropgat op (15, -20).
13. **Meelpijp** van de kuip (24, -14) omlaag naar een **meelbak** op x 26 tot 32 (y -6 tot 0), met een witte **meelzak** aan haken.
14. **Steenkraan**: een houten paal op x 26 tot 28, van de vloer tot y -36, met een draaibare arm over de kuip op y -34 en twee ijzeren haken. Deze is niet verplicht.
15. **Buil** rechts: een houten **builkast** (x 36 tot 60, y -22 tot 0) met een open voorkant. Daarin zit een schuin aflopende **cilinder met gaas**, van (38, -17) naar (58, -11) met straal 3. Riem 3 loopt van (46, -44) naar een schijfje met straal 2 op (58, -19).
16. **Lamp**: een muurarm op (-1, -34) met een glazen bol met straal 1,6. Overdag is hij uit, 's avonds aan, met een gloed van straal ongeveer 25 e.
17. **Mensen** (17 e hoog). Een **molenaar** op x 2 met een hand naar de schuddebak; hij is lichter van kleur door het meelstof. Een **knecht** op x 40 hangt een lege zak aan de meelbak. De stoker staat bij punt 4.
18. **Vloer**: planken van y 0 tot 4, met in de rechterhoek een vage meelstoflaag.

**Camera.** Je volgt de kracht: van het vuur via het vliegwiel en de riem omhoog, langs de drijfas naar rechts, en dan langs riem 2 omlaag naar de stenen. Dit gebeurt in één vloeiende boog door drie vakken (Bezier op middelpunt en log-zoom, met ixEase over de hele duur van 4,6 s).
- Beginvak `[-64, 20, -80, 6]`: de ketelboog met de stoker en het vuur, de machine, het **draaiende vliegwiel** en de riem omhoog naar de as en de zolder. Rechts aan de rand zie je net het begin van de maalstoel.
- Tussenvak (t = 0,5) `[-30, 40, -60, -4]`: de drijfas met de drie schijven, en riem 2 die omlaag loopt.
- Eindvak `[3, 27, -41, -11]`: dit is **het eindbeeld bij de stenen**.
  - Onderin zie je de kuip in doorsnede met de draaiende loper.
  - In het midden zit de kaar met het graan.
  - Op ongeveer 35 % van boven, midden in beeld, zit **de korrel**. Hij komt net uit de mond van de stortkoker, kijkt je aan en is ongeveer 9 % van de beeldhoogte.
  - Aan de rechterrand loopt één strook van riem 2 op en neer. 's Avonds valt links de gloed van de lamp.

**Duik na "It giet oan!"** De korrel valt in de kaar en via de schuddebak naar het kropgat. De camera zakt mee en zoomt in op het kropgat in ongeveer 0,85 s, zoals IDIVE. Daarna komt de introband van 1867.

**Wat beweegt:**
- **Vliegwiel**: 0,75 omwenteling per seconde. De spaken draaien, en kruk, drijfstang en kruiskop bewegen in de pas mee.
- **Regulateur**: de bollen zwaaien met een sinus mee, in de pas met het vliegwiel.
- **Riemen**: naden en vlekjes schuiven langs de riemen met de omtreksnelheid van de schijf, voor riem 1 ongeveer 40 e/s.
- **Drijfas en schijven**: korte markeringen draaien rond.
- **Loper**: de scherpselstreepjes schuiven langs de rand. De ligger staat stil.
- **Buil**: de gaaslijnen op de cilinder schuiven langzaam rond.
- **Schuddebak**: tikt zacht, ±0,3 e en 3 keer per seconde. Er vallen maximaal 8 korrels van de kaar naar het kropgat.
- **Vuur**: de gloed flakkert. **Lamp** ('s avonds): de vlam flakkert licht.
- **Stofjes**: maximaal 20, die traag in de lichtbundel (overdag) of de lampgloed ('s avonds) zweven.

**prefers-reduced-motion:** van beide shots alleen de eindbeelden, zoals het raamwerk voorschrijft. De zak hangt dan aan de hijsdeur en de korrel zit bij de mond van de koker.

---

## 4. Teksten

### Shot 1

- **kicker:** `Leeuwarden, 1867`, met 1867 in handschrift (La Belle Aurore).
- **cap** (23 woorden): `Een molen zonder paarden of wieken: hier rookt een schoorsteen. Losse arbeiders dragen het graan zak voor zak van de tjalk naar binnen.`
- **desc:** `Beeld: vanaf de overkant van het water glijd je langs huizen en pakhuizen naar een bakstenen fabriek met een rokende schoorsteen, waar mannen zakken graan van een houten tjalk naar binnen dragen.`

Bronnen bij de cap:

| Stuk tekst | Bron | Betrouwbaarheid |
|---|---|---|
| "zonder paarden" | royalkoopmans.com geschiedenis: "De paarden worden in 1867 vervangen door stoomkracht" (in het onderzoek: `koopmans-site.md` §2) | hoog |
| "of wieken: hier rookt een schoorsteen" | Lintsen p. 84: "In een stoomkorenmolen was de stoommachine het substituut voor de wind, het water, het paard". Lintsen p. 82: men bleef spreken "van een molen, zij het van een stoommolen". | hoog |
| "Losse arbeiders" | HCL 2002: lossen gebeurde "in de negentiende eeuw ... steeds meer door losse arbeiders" | hoog voor Leeuwarden, midden voor deze fabriek |
| "zak voor zak van de tjalk" | Visscher 1860 ("de wal vol zakken graan"); nl.wikipedia Tjalk | midden |

Als het Noordvliet als plek blijft staan, kan deze cap in de plaats komen (21 woorden): `Aan het Vliet staan pakhuizen, scheepswerven en oliemolens. Losse arbeiders wachten op de brug tot er een schip gelost moet worden.` Bronnen: Visscher (wandeling 1860) en HCL 2002.

### Shot 2

- **kicker:** `In de stoommeelfabriek, 1867`, met 1867 in handschrift.
- **cap** (24 woorden): `De stoker houdt het vuur onder de ketel aan. Via vliegwiel, riem en as draait de bovenste steen. Jij valt zo tussen de stenen.`
- **desc:** `Beeld: binnen gloeit het vuur onder de stoomketel en draait een vliegwiel; langs de leren riem en de as onder de balken zak je naar de molenstenen, waar boven de graanbak één korrel je aankijkt.`

Bronnen bij de cap:

| Stuk tekst | Bron | Betrouwbaarheid |
|---|---|---|
| "De stoker houdt het vuur onder de ketel aan" | Lintsen tabel 3.4 (personeel: machinist, stoker, chef-molenaar); Lintsen p. 82 ("stoommachine met een ketel") | hoog in het algemeen, midden voor deze fabriek |
| "Via vliegwiel, riem en as" | Lintsen p. 81-82 (een liggende as met tandwielen drijft de steenspil aan); de riem: zie 1c | as hoog, riem midden |
| "draait de bovenste steen" | nl.wikipedia Maalkoppel (de loper draait, de ligger ligt stil) | hoog |
| "Jij valt zo tussen de stenen" | spelregel: LEVELS[1] heeft molenstenen ("door de spleet") | n.v.t. |

Als de spelregel liever weg moet (23 woorden): `De stoker houdt het vuur onder de ketel aan. Het vliegwiel drijft via een riem, een as en tandwielen de bovenste molensteen aan.`

**Controle op herhaling.** Geen van de teksten noemt 2 pk, ontoereikend, Hein Blok Wybrandi, Friso, Amerika of de Baltische staten, Holwerd en de grote schepen, Jan of de graancrisis. Dat staat al in LEVELS[1].intro en supply, in STORIES[1] en in FACTS. Er zijn geen gedachtestreepjes, geen "Ontdek", geen uitroeptekens en geen getallen.

---

## 5. Kleuren en sfeer

Sfeer: warm, ambachtelijk en rustig. Baksteenrood, hout en ijzer, met één warme gloed (het vuur) als middelpunt binnen. De korrel blijft het helderste goud in het eindbeeld. De luchtkleuren van de dag sluiten aan op de hoofdintro (ICOL.light). De avond is warmer dan ICOL.dark en komt dicht bij het 1867-plaatje in het spel (`gxVIG.steen`).

### Buiten

| Onderdeel | Licht (dag) | Donker (avond) |
|---|---|---|
| Lucht boven / midden / horizon | `#6EA7D0` / `#AFD2E3` / `#F4E8CE` | `#142033` / `#4A3F55` / `#B9784A` |
| Zon of zonnegloed | `#FFF6D8` | `rgba(242,160,90,.35)` laag links |
| Wolk / wolkschaduw | `#FFFFFF` / `#DCE7EA` | `#2B3843` / `#222E37`, onderrand `#6A4C33` |
| Sterren | geen | `rgba(247,247,247,.7)` |
| Waas in de verte | `#EAE6D6` | `#3A3128` |
| Verre stad, Oldehove | `#B9C3C2`, daken `#A9B3B3` | `#1D2930`, ramen `rgba(242,211,91,.55)` |
| Oliemolen: romp / wieken | `#A39A7E` / `#E9E3D3` met roeden `#6F665A` | `#1A2226` / `#2A3236` |
| Buurhuizen: baksteen | `#A55B3D` / `#8E4A32` | `#3E241B` / `#33201A` |
| Herenhuis: pleister | `#E6DCC8` / schaduw `#CDBFA6` | `#3A3530` |
| Daken van de buren | `#4A4D52` en `#8E3B2A` | `#141517` |
| Fabriek: baksteen licht / schaduw | `#9C5236` / `#783A2C` | `#4A2A21` / `#391F19` |
| Fabriek: Friese geeltjes | `#C9A86A` / `#A88A52` | `#5A4A33` / `#47392A` |
| Rollagen / plint | `#B86A48` / `#8A8070` | `#552F24` / `#2E2A26` |
| Dakpannen van de fabriek | `#8E3B2A` / `#6A2A1F` | `#2A1A16` |
| Ramen: kozijn / glas / glans | `#EDE6D6` / `#6F808B` / `#A9BCC6` | `#3A3530` / verlicht `#F2C35B`, onverlicht `#1C2227` |
| Raamgloed | geen | `rgba(242,195,91,.22)` |
| Luiken | `#3F5A3C` | `#1F2B20` |
| Laaddeuren / beslag | `#7A5634` / `#2E3236` | `#2E2014` / `#141517` |
| Hijsbalk / touw | `#5A3F26` / `#C8B48A` | `#241A12` / `#6E6552` |
| Schoorsteen / kop / banden | `#8A4030` / `#5E2A20` / `#3A3F44` | `#3D2019` / `#2A140F` / `#1A1C1F` |
| Vuurgloed in de ketelhuisdeur | `#F29A3A`, zwak | `#F29A3A`, kern `#FFD27A` |
| Rook | `#8E8A84`, alpha 0,45 tot 0,6 | `#3A3633`, onderkant `rgba(242,154,58,.15)` |
| Stoom | `#F7F7F7`, alpha 0,75 | `#C9C4B5`, alpha 0,5 |
| Turf | `#5A3B26` / `#3E2818` | `#24170F` |
| Walmuur / afdekrand | `#8C5A44` / `#A39C8E` | `#33231C` / `#3D3A35` |
| Bomen: kruin / licht / stam | `#5F8A4E` en `#4D7541` / `#86A66E` / `#5A3F26` | `#16231C` en `#111C15` / geen / `#1E1A15` |
| Trapjesbrug / leuning | `#4F6E8C` of hout `#9A7B55` / `#6B5238` | `#1E2A33` / `#141517` |
| Water / diep / rimpel | `#5C8EA5` / `#467890` / `rgba(214,234,242,.55)` | `#13252F` / `#0E1C24` / `rgba(90,130,150,.45)` |
| Weerspiegeling | `rgba(29,30,31,.16)` | ramen `rgba(242,195,91,.5)` |
| Tjalk: romp / boeisel / berghout | `#2B2A28` / `#3D6158` / `#C9B78E` | `#141B20` / `#1E2E2C` / `#4B4A45` |
| Tjalk: mast en rondhout / zeil | `#8A6A44` / `#8B4A2B` en `#6A3620` | `#2A2018` / `#3E2418` |
| Scheepslantaarn | uit | `#FFD27A`, gloed `rgba(255,210,122,.3)` |
| Zakken / graan | `#D8CBA6` en `#B5A57E` / `#D9A441` en `#F9DC8F` | `#6E6552` / `#A07C36` |
| Silhouetten / oorijzerglans | `#2A2522` / `#E8C25A` | `#0E0C0B` / `#B8963E` |
| Keien op de kade | `#8E8676` / `#6F685B` | `#2D2B26` |
| Meeuwen | `#3A3D41` | `#B9C0C6` |

### Binnen

| Onderdeel | Licht (dag) | Donker (avond) |
|---|---|---|
| Baksteen: muur / schaduw / voeg | `#8C4A33` / `#6B3626` / `#A87A62` | `#3A1E15` / `#2A150F` / `#4A2C20` |
| Balken en standvinken | `#6B4A2B`, lichtkant `#8A6A44` | `#2A190D` |
| Vloer / naden | `#9C7A52` / `#7A5C3A` | `#3A2A1C` / `#2A1E14` |
| Zolder / zakken op de zolder | `#5A3F26` / `#D8CBA6` | `#1E140C` / `#5A5244` |
| Ramen | glas `#CFE3EA`, kozijn `#EDE6D6` | `#1D2A3B` |
| Lichtbundel | `rgba(255,226,160,.18)` | geen |
| Ketelboog (binnen) / ketelfront / klinknagels | `#2A1A12` / `#2E3236` / `#5A5F64` | `#140C08` / `#1C1F22` / `#3A3F44` |
| Vuurdeur | `#F29A3A`, kern `#FFD27A` | `#FF9A3C`, kern `#FFE1A0`, op de vloer `rgba(255,154,60,.18)` |
| Gietijzer: machine, vliegwiel, as / glans | `#3A3F44` en `#2E3236` / `#8A9096` | `#23272B` / `#6E757C`, warme kant `#A0714A` |
| Machinebed | `#8A8070` | `#2E2A26` |
| Messing: regulateur, kranen | `#C9A24A` | `#8A6E2E` |
| Leren riem / naad / glans | `#6B4226` / `#4A2C18` / `#8E5C3A` | `#3E2615` / `#24160C` / `#5A3A22` |
| Maalstoel en kaar | `#7A5634` en `#A07A4A` | `#3A2818` en `#4A3420` |
| Steenkuip / hoepels | `#8A6038` / `#3A3F44` | `#4A3220` / `#1A1C1F` |
| Molensteen (blauwe steen) / scherpsel / rand | `#5E6468` / `#3F4448` / `#8A9096` | `#3A3F44` / `#2A2E31` / `#5A5F64` |
| Graan in de kaar | `#D9A441` / `#F9DC8F` | `#C9973C` / `#FFE6A3` |
| Meel / meelzak | `#F3EEE2` / `#E9E1CC` | `#CFC6B0` / `#A8A08C` |
| Meelstof | `rgba(255,248,232,.5)` | `rgba(255,226,170,.4)` in de lampgloed |
| Lamp | uit: glas `#D8D3C6`, arm `#2E3236` | vlam `#FFE7A8`, gloed `rgba(255,190,100,.25)` |
| Silhouetten / molenaar | `#2A2522` / `#4A423B` | `#0E0C0B` / `#2A2522` |
| Turf | `#5A3B26` | `#24170F` |

---

## 6. Twijfelpunten

1. **Plek in 1867.** Wikipedia zegt alleen "de Stoommeelfabriek van Hein Blok Wybrandi, koopman te Leeuwarden", zonder adres. royalkoopmans.com zet "In 1867 paarden vervangen door stoomkracht" onder *1846-1876, Een rosmolen in Holwerd*. Het zegt "In deze periode verhuist het bedrijf naar Leeuwarden, op het Noordvliet" en de naam Friso pas onder *1876-1900*. Het spel (LEVELS[1].intro, "aan het Noordvliet") en de bouwopdracht houden het Noordvliet aan. Het storyboard tekent daarom het Vliet, maar de teksten noemen het Noordvliet niet. Het advies is om in de kicker "Leeuwarden, 1867" te zetten. Een route van het Landbouwmuseum noemt wel "panden aan het Noordvliet", maar die pdf was niet te openen.
2. **Dezelfde molen als in 1852-1856?** Lintsen noemt "de aldaar bestaande stoomkorenmolen" in Leeuwarden in 1852 en 1853, en "de duurte van turf" in 1856. Of dat de molen van Wybrandi is, staat nergens. De turfstapel is dus een aannemelijk detail, geen feit.
3. **Gas of olie.** Leeuwarden had gas sinds 1845 en petroleum sinds 1864-1866. Of de fabriek gas had, weten we niet. De stijlgids en de spelachtergrond van 1867 gebruiken gaslampen. Kies een gesloten lamp met een glazen bol en geen open vlam bij de stenen.
4. **Hoe groot is 2 pk?** Er is geen bron voor het type machine (liggend, staand of locomobiel) of de maat van het vliegwiel. Het is getekend als een kleine liggende machine met een vliegwiel van ongeveer 1,8 m. Eén koppel stenen past bij dat kleine vermogen. Dat is afgeleid en niet bewezen.
5. **Riemen of tandwielen.** Lintsen beschrijft voor de maalstoel een as met tandwielen. De leren riem van vliegwiel naar drijfas is een gangbare oplossing uit die tijd, maar voor deze fabriek niet bewezen.
6. **Indeling.** Hoeveel verdiepingen, stenen en builen er waren, is onbekend. Eén ruimte met een zolder en een stortkoker is een keuze die aansluit bij de houten stortkoker in het spel (drawChute, 1846 en 1867).
7. **Doorsnede van de kuip.** In werkelijkheid zat de kuip dicht. De doorsnede is een stilering, zodat je de stenen ziet, net als drawStone in het spel.
8. **Kolommen.** De spelachtergrond van 1867 heeft gietijzeren kolommen. In een pakhuisachtig pand aan het Vliet liggen houten standvinken meer voor de hand. Allebei kan, maar geen van beide is voor deze fabriek bewezen. Kies binnen één ding, liefst hout.
9. **Brug en arbeiders.** HCL beschrijft dat losse arbeiders op de bruggen over het Vliet wachtten, in de 19e eeuw in het algemeen. Welke brug bij de fabriek lag, weten we niet. De blauwe kleur volgt alleen de naam Blauwebrug.
10. **Oldehove in de verte.** Die bestond, maar de zichtlijn vanaf het Vliet is niet gecontroleerd. Laat hem weg als dat te druk wordt.
11. **Seizoen.** De nazomer is een keuze. Er is geen bron voor de maand.
12. **Nieuwe bronnen.** De opdracht vraagt "feiten met een bron in het onderzoek". Visscher, HCL 2002, Lintsen en de Wikipedia-artikelen over Maalkoppel, Molensteen, Tjalk en Vliet staan nog niet in `game/onderzoek/`. Het is verstandig ze daar toe te voegen of ze apart goed te keuren. De pdf's en teksten staan in `jaar/web67/`. Cap 1 leunt op HCL ("losse arbeiders") en cap 2 op Lintsen ("stoker"). Wie alleen het bestaande onderzoek wil gebruiken, kan als cap 1 nemen: `Waar in Holwerd paarden liepen, rookt nu een schoorsteen. Het graan komt per schip tot aan de fabriek.` (18 woorden). Die overlapt wel een beetje met STORIES[1].
13. **"Vuurmolen".** Volgens Wikipedia (Meelfabriek) heette een meelfabriek in het begin wel een vuurmolen. Daar staat geen bron bij en ook bij het zoeken is er geen gevonden. Het woord staat daarom niet in de tekst.
14. **Walsen elders in 1867.** Sas van Gent had in 1867 al een walsenmolen. Dat verandert niets aan de keuze voor stenen bij Koopmans, maar zeg in teksten nooit "walsen bestonden nog niet".

---

## Bronnen

In het spel en de opdracht:
- `/home/user/Vaultwarden/game/korrelval.html`: LEVELS[1], STORIES[1], FACTS, `gxVIG.steen`, drawStone, drawChute en de 1867-achtergrond.
- `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/bouwopdracht.md` ("Correcties van de insider-jury")
- `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/stijlgids.md`

In het onderzoek:
- `/home/user/Vaultwarden/game/onderzoek/research-geschiedenis.json`
- `/home/user/Vaultwarden/game/onderzoek/research-molenproces.json`
- `/home/user/Vaultwarden/game/onderzoek/koopmans-site.md` §2
- `/home/user/Vaultwarden/game/onderzoek/spelmateriaal.json`
- `/home/user/Vaultwarden/game/onderzoek-royal-koopmans.md`

Nieuw van het web (kopieën in `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/web67/`):
- R. Visscher, *Leeuwarden van 1846 tot 1906*: https://historischcentrumleeuwarden.nl/images/pdf/Geschiedenis_van_Leeuwarden_2_R_Visscher.pdf
- HCL, *Pakhuizen in Leeuwarden* (OMD 2002): https://historischcentrumleeuwarden.nl/images/pdf/OMD-publicaties/omd-boekje-2002.pdf
- Lintsen e.a., *Geschiedenis van de techniek in Nederland* I, Molenbedrijf en meelfabriek: https://www.dbnl.org/tekst/lint011gesc01_01/lint011gesc01_01_0006.php
- royalkoopmans.com: https://www.royalkoopmans.com/over-royal-koopmans/de-geschiedenis-van-koopmans
- Wikipedia (nl):
  - https://nl.wikipedia.org/wiki/Koopmans_Koninklijke_Meelfabrieken
  - https://nl.wikipedia.org/wiki/Meelfabriek
  - https://nl.wikipedia.org/wiki/Maalkoppel
  - https://nl.wikipedia.org/wiki/Molensteen
  - https://nl.wikipedia.org/wiki/Tjalk
  - https://nl.wikipedia.org/wiki/Tanen
  - https://nl.wikipedia.org/wiki/Vliet_(Leeuwarden)
  - https://nl.wikipedia.org/wiki/Noordvliet_(Leeuwarden)
  - https://nl.wikipedia.org/wiki/Lijst_van_pakhuizen_in_Leeuwarden
  - https://nl.wikipedia.org/wiki/Oldehove_(gebouw)
  - https://nl.wikipedia.org/wiki/Kiel_(kleding)
  - https://nl.wikipedia.org/wiki/Pet_(hoofddeksel)
  - https://nl.wikipedia.org/wiki/Klomp
  - https://nl.wikipedia.org/wiki/Oorijzer
- Monumentenregister:
  - https://monumentenregister.cultureelerfgoed.nl/monumenten/pdf/506265 (schoorsteen van radiaalsteen, 1895)
  - https://monumentenregister.cultureelerfgoed.nl/monumenten/pdf/393990 (stoommachines met vliegwiel, alleen zoekresultaat)
- Drijfriemenfabriek Drost: https://www.nhnieuws.nl/nieuws/357667/drijfriemenfabriek-drost-werd-succesvol-dankzij-opkomst-haarlem-als-industriestad
- N. Ottema, klederdracht:
  - https://www.oks.nl/wp-content/uploads/pdf/116_OttemaN_Klederdrachten_van_Friesland_LC_07-05-1949.pdf
  - https://www.oks.nl/wp-content/uploads/pdf/046_OttemaN_OudeKlederdrachtenFrieseBoerBoerin.pdf
