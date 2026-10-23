# Storyboard jaarintro 1846: de rosmolen in Holwerd

Twee shots, elk met een camerabeweging van ongeveer 5 s. Daarna blijft het beeld staan tot Verder; het paard, het wiel en de rook blijven bewegen.

- **Shot 1, buiten:** van hoog boven de vaart, met het hele terpdorp, de kerktoren en de zeedijk, daal je langs een schuit die gelost wordt naar de open deur van de rosmolen. Daarachter loopt het paard zijn rondjes.
- **Shot 2, binnen:** je begint laag bij het paard met oogkleppen onder het grote kamwiel, schuift omhoog naar het snel draaiende rondsel en kijkt dan van boven op de molenstenen. Daar ligt de korrel op de rand van de schudbak, boven het oog van de steen, klaar voor de duik.

Betrouwbaarheid in dit stuk:
- **hoog:** staat zo in het onderzoek of in een gedegen bron over Holwerd of Koopmans;
- **middel:** komt uit een bron over rosmolens of de streek in het algemeen en is op Holwerd toegepast;
- **laag:** een aanname of stijlkeuze, meestal om aan te sluiten bij wat al in het spel zit.

De korte bronnamen tussen haken, zoals [R1] en [W5], staan voluit in de bronnenlijst onderaan.

---

## 0. Uitgangspunten voor de tekenaar

- **Stijl:** dezelfde vlakke, gestileerde vormen als de hoofdintro (INTRO_SHOTS, ICOL), met één vulling per kleur per laag. Lucht en wolken teken je één keer offscreen. Lagen op diepte schuiven en schalen mee zoals bij de vlucht naar de maaltoren. Licht thema is dag, donker thema is avond.
- **Wat al in het spel zit en waar dit op aansluit:**
  - het tijdperkplaatje `gxVIG.hout` (korrelval.html r. 2623): de rosmolen onder een rieten kap, een bruin paard (#6B4A2B, manen #3a2614) dat aan de kant van de kijker van rechts naar links loopt, het kamwiel boven het paard en kammen in #C99A3A;
  - de spelachtergrond `gxBG.hout` (r. 1909): planken met daglicht ertussen, balken met stro, schoren en de houten spil met ijzeren banden;
  - het palet `LEVELS[0].pal`: wall #3a2817, wall2 #5a3f26, line #C8A878, slab #6B4A2B en plate #8a6a44.

  Shot 2 moet na de duik naadloos overgaan in die spelachtergrond. [R8]
- **Maten:** alle maten staan in meters. In de wereld van de hoofdintro is 1 eenheid ongeveer 0,1 m, dus 1 m is 10 eenheden. Hoogte is negatief omhoog, net als in IBOX.
- **Beeldvak:** posities staan in procenten van het beeld boven het ondertitelpaneel (x 0 links tot 100 rechts, y 0 boven tot 100 onder), voor een liggend beeld van ongeveer 16:10.
  - Houd de hoofdzaken (deur met paard, kerktoren, stenen en korrel) binnen x 30 tot 70, zodat het staand (400x800) ook werkt.
  - Staand mag de camera hetzelfde middelpunt houden en links en rechts wegsnijden.
- **Afstanden mogen ingekort worden.** De loswal ligt in het echt aan de zuidkant van het dorp en de molen in de kern [W11]. In beeld mag dat dichter bij elkaar liggen.
- **Duur:** shot 1 duurt 5,0 s en shot 2 5,0 s. Laat beide eerst 0,3 tot 0,4 s stilstaan en gebruik daarna dezelfde zachte versnelling en vertraging als `ixEase`.
- **prefers-reduced-motion:** je ziet alleen de eindbeelden, dus die moeten zonder beweging volledig zijn.
  - Eindbeeld shot 1: het paard staat midden in de deuropening, in een stap.
  - Eindbeeld shot 2: de korrel ligt op de schudbak en het paard staat langs de linkerrand in beeld.

---

## 1. Wat klopt

### 1a. Plek en omgeving

| Wat | Bron | Betr. |
|---|---|---|
| In 1846 koopt Uilke Klazes Koopmans een rosmolen in de dorpskern van Holwerd, "in de kop van Friesland". | [R1], [R2] | hoog |
| Holwerd is een terpdorp aan de Waddenkust. | [R6], [W12] | hoog |
| Het dorp bestaat uit een ronde kerkterp en een langgerekte dorpsterp met huizen langs de hoofdas, de Hogebuurt of Foarstrjitte. | [W12], [W11] | hoog |
| De kerk staat aan het noordelijke eind van het dorp, op een eigen terp, in een ruim omheind kerkhof. | [W11], [W17] | hoog |
| De kerkterp werd pas rond 1890 tot 1891 grotendeels afgegraven, dus in 1846 is die nog hoog. | [W11], [W12] | hoog |
| De kerk zelf is een L-vormige kerk uit 1776 van baksteen, met een dak van blauwgrijze leipannen ("blauwe tegels"). | [W11], [W12] | hoog |
| De toren staat los van de kerk en is van baksteen: tot ongeveer halverhoogte lichtgekleurd, daarboven frisrood. Hij heeft rondbogige galmgaten en een hoge naaldspits van leien (1784) met knoppen, een kroon, een pijnappel en een weerhaan. | [W11] | hoog |
| De zeedijk is van 1580 en ligt ruim een kilometer ten noordwesten van het dorp. De oude dijk is ten oosten en westen nog een verhoging, met de wegen naar Ternaard en Leeuwarden erop. | [W11] | hoog |
| Achter de dijk ligt de Waddenzee. | [R6], [W13] | hoog |
| De Holwerdervaart is in de 17e eeuw gegraven, aan de zuidkant van het dorp. Hij vervoerde goederen, landbouwproducten en turf. | [W12], [W13], [W15] | hoog |
| Aan een bocht van de vaart lag een loswal, met rond 1842 een smederij in het pand ernaast. | [W11] | hoog |
| De huizen aan de Hogebuurt hebben geen verdieping. De meeste hebben een zadeldak haaks op de straat met een voorschild boven de gevel. Een deel zijn dwarshuizen met het dak evenwijdig aan de straat, waarschijnlijk uit de 18e eeuw. | [W11] | middel (beschrijving van 1983, de huizen zijn grotendeels ouder) |
| De straat loopt over de terp omhoog. De stoepen voor de huizen kwamen pas na 1871, toen de straat lager werd gelegd. | [W11], [W12] | hoog |
| In de eerste helft van de 19e eeuw lagen er drie dobben (vijvers) in het dorp. Die bij de Hogebuurt werd rond 1870 gedempt. | [W11] | hoog |
| Aan de noordoostflank van de terp staan enkele boerderijen. | [W11] | hoog |
| De klei van de streek werd gebruikt voor bakstenen en dakpannen. | [W16] | middel |
| Rond 1850 wordt de kwelderrug rond Holwerd gebruikt als weidegrond. Verder in Dongeradeel is het vooral akkerland. | [W16] | hoog |
| Het landschap is open. Bomen staan alleen bij huizen en boerderijen. | [W16] | hoog |
| De boerderijen in de omgeving zijn van het kop-hals-romptype. | [W11], [W16] | middel |
| In 1840 heeft Holwerd 1.741 inwoners. Het is dus een flink dorp met een vrijwel aaneengesloten straat. | [W14], [W11] | middel |

### 1b. Het molengebouw en de aandrijving

Hoe de rosmolen van Koopmans in Holwerd er precies uitzag, staat in geen enkele bron. Daarom gaat het storyboard uit van de twee korenrosmolens die in Nederland bewaard zijn (Zeddam en Kampen), aangevuld met technische beschrijvingen van rosmolens.

| Wat | Bron | Betr. |
|---|---|---|
| Paarden drijven de molen aan. Rosmolens waren geschikt door de gelijkmatige tred van paarden. | [R2], [W1] | hoog |
| De molen maalt en built boekweit: hij maalt het tussen molenstenen en zeeft het in de buil. | [R1], [R8] (LEVELS[0].supply) | hoog |
| De molen heeft molenstenen, geen walsen. Een korenmolen is een vlakmaalderij met één gang tussen molenstenen; walsenstoelen horen bij de latere hoogmaalderij. | [R5] | hoog |
| In een dorp stond meestal een grotere rosmolen, vaak met twee paarden. De aandrijving loopt via een balk, een boom en een tandwielmechanisme. | [W2] | middel |
| Er zijn twee typen. In het ene loopt het paard binnen en zie je van buiten niets bijzonders. In het andere loopt het paard buiten om het gebouwtje en steekt de koningspil met een schuine staartbalk boven het dak uit. | [W5] | hoog (voor Vlaanderen) |
| Keuze voor Holwerd: het paard loopt binnen. De korenrosmolens van Zeddam en Kampen zijn binnenrosmolens, en ook in Groningse en Friese boerderijen liep het paard binnen. Het buitentype is vooral uit de Vlaamse kuststreek bekend. | [W3], [W4], [W6], [W5] | middel |
| Zeddam (herbouwd naar oude tekeningen) is 9,30 bij 13,55 m met een nok van 6,75 m. De voorgevel heeft een dubbele deur en een enkele deur. Waar het paard loopt, ligt leem met grof zand erop. | [W3] | hoog voor Zeddam, middel voor Holwerd |
| Het grote kamwiel in Zeddam heeft 340 kammen en een steekcirkel van 7,25 m. Het rondsel heeft 19 staven en een steekcirkel van 40,9 cm. | [W3] | hoog voor Zeddam |
| Snelheden in Zeddam: het paard stapt 5 km/u, het grote wiel maakt 5 toeren per minuut en de steen 90. Daaruit volgt een kring van ongeveer 2,65 m straal, één rondje per 12 s. Het paard loopt dus binnen de rand van het wiel, eronder. | [W3] (straal en rondetijd zelf berekend) | middel |
| De koningspil of boom is een zware houten spil van ongeveer 30 bij 30 cm. Onderaan zit een ijzeren pen (taats) in een vetpot. Bij een Groningse rosmolen was die pot een zwerfkei met een gat erin. | [W5], [W6] | middel |
| Als het paard binnen loopt, is de spil bovenaan vastgezet aan een trekbalk. De trekboom voor het paard zit onder het grote wiel aan de spil. | [W5] | middel |
| Het grote wiel zit vast met een kruis met dubbele armen. Bij een binnenrosmolen steunen schuine schoren het wiel naar het ondereinde van de spil. | [W5] | middel |
| De kammen zijn van taai, hard hout. Ze staan rechtop of steken straalsgewijs uit de rand en grijpen in de staven van een schijfloop of rondsel. | [W5] | middel |
| Het paard zit met een zwingel of knuppel aan de trekboom vast en met een halster of leidsel aan de spil, dat het naar binnen stuurt. Het draagt oogkleppen of zelfs een masker tegen afleiding en duizeligheid. Rosmolenpaarden waren rustige, vaak wat oudere dieren. | [W6], [W5] | middel |
| Paarden werden aangespoord als ze langs de deur kwamen. In de grutterij van het Openluchtmuseum worden de paarden regelmatig afgelost en houdt een zandloper de tijd bij. | [W5], [W7] | middel |
| Een ijzeren spil drijft de bovensteen (loper) aan, die op de vaste ondersteen (ligger) draait. De twee stenen liggen in een houten kuip op een houten stoel. Via een trapje giet je het graan in de graanbak. Het graan loopt over de schudbak door het gat in het midden van de loper. Het meel komt aan de buitenkant naar buiten en wordt in een zak opgevangen. | [W5] | middel |
| Molenstenen in rosmolens zijn 85 tot 120 cm breed en 10 tot 31,5 cm dik. In Nederland gebruikte men eeuwenlang "blauwe stenen" van basaltlava uit de Eifel. Kunststenen zijn er pas vanaf ongeveer 1900. | [W5], [W10] | middel (Holwerd zelf onbekend) |
| Een boekweitmolen kon een rosmolen zijn met een eest (droogvloer), zeefwerk, stenen en een waaierij. Een tegeltableau uit 1780 toont het interieur van een rosmolen voor boekweit: binnenbrengen, drogen, breken, zeven, wegen, malen, builen en in zakken doen. | [W9], [W8] | middel |
| Kampen: de enige bewaarde rosmolen met bovenwerk. Hij maalde boekweit en heeft een paardenbaan, maalwerk en een droogzolder. | [W4] | hoog voor Kampen |
| In 1856 bleek de rosmolen niet geschikt om tarwe te malen. | [R3], [W1] | hoog |

### 1c. Het graan en de aanvoer

| Wat | Bron | Betr. |
|---|---|---|
| Er wordt boekweit gemalen, een voedzame grondstof voor brood en pap. | [R1], [R2] | hoog |
| De boekweitplant heeft een rode, vertakte stengel, driehoekige tot hartvormige bladeren en wit tot roze bloemen in pluimen. Ze wordt 50 cm tot 1 m hoog. Het zaad lijkt op een klein beukennootje (6 mm) en is bruinzwart of grijs. | [W9] | hoog |
| Boekweit groeit op arme zand- en veengrond. Natte en zware grond is ongeschikt, en de klei rond Holwerd is zware grond en weide. Er staat dus geen boekweitveld bij het dorp: de boekweit komt in zakken van elders. | [W9], [W16] | middel |
| Volgens Wikipedia moest de boekweit van buiten Friesland komen toen de productie groeide. Grotere schepen konden Holwerd niet bereiken, dus de lading werd overgeslagen op kleinere. Ook het onderzoek zegt dat grotere schepen Holwerd niet konden bereiken. | [W1], [R3] | hoog |
| Daaruit volgt de aanvoer in beeld: een kleine schuit over de Holwerdervaart naar de loswal, en dan met een kar of op de schouder naar de molen. Dat het in 1846 precies zo ging, staat nergens letterlijk. | [W1], [W11], [W15] | middel |
| De schuit is een kleine houten tjalk: lang, smal en ondiep, met een volle ronde boeg, één mast, gaffeltuig en zijzwaarden. | [W21] | middel (type niet bekend voor Holwerd) |
| Boekweit werd gezaaid van half mei tot half juni en geoogst van juli tot september. Het bloeit in augustus. | [W9] | hoog |
| Boekweitmeel is niet wit als tarwebloem maar grijzig, met donkere spikkels van de schil. | [W9] (doppen worden apart verwijderd), kleur is een aanname | laag |

### 1d. Mensen: alleen silhouetten

| Wat | Bron | Betr. |
|---|---|---|
| Geen echte personen met een gezicht. Uilke en Trijntje komen hooguit als silhouet in de verte in beeld. | opdracht.md, stijlgids | hoog |
| Werkkleding was praktisch en in grote delen van West-Europa gelijk. | [W22] | middel |
| Een Friese boerin rond 1830 tot 1840 draagt een smal oorijzer onder een muts, een lange jak, een wijde gestreepte rok en een blauwe schort. | [W22] | middel |
| Een Friese boer rond 1830 tot 1840 draagt in zijn nette kleren een halfhoge hoed, een vest, een rode halsdoek en een kort jasje. Voor werk: een kort jasje of hemd, een broek, klompen, een pet of hoed. | [W22], algemeen | laag tot middel |

In silhouet:
- **een man:** kort jasje, rechte broek, hoed met smalle rand of een pet, zak op de schouder;
- **een vrouw:** wijde rok tot de enkels, schort, een witte muts als lichte vlek.

### 1e. Licht

| Wat | Bron | Betr. |
|---|---|---|
| Overdag komt het licht door de deur, een paar kleine ramen en kieren tussen de planken. Er dwarrelen stofjes in de zonnestralen. | stijlgids (tijdperk 1846), [R8] (gxBG.hout) | hoog (afspraak in het spel) |
| 's Avonds is er een lantaarn met een kaars of olielampje achter glas. In huis staat een koperen olielamp, de snotneus, die in de 19e eeuw populair was. | [W20] | middel |
| Petroleumlampen kwamen pas in 1859, dus niet in 1846. | [W19] | hoog |
| Geen gaslicht en geen elektrisch licht. | stijlgids (gaslicht hoort bij 1867, gloeilampen bij 1920) | hoog |

### 1f. Seizoen en weer

| Wat | Bron | Betr. |
|---|---|---|
| Keuze: eind augustus of september, als de nieuwe boekweit binnenkomt (oogst juli tot september). | [W9] | laag (keuze) |
| Een Hollandse wolkenlucht met stapelwolken en een lage zon van links (west), net als in de hoofdintro. | stijlgids, INTRO_SHOTS | laag (stijl) |
| Een lichte wind uit het noordwesten van zee. De rook drijft naar rechts. | aanname | laag |
| Meeuwen boven een dorp aan het wad; zwaluwen rond een stal in de nazomer. | algemeen | laag |

---

## 2. Mag niet

**Techniek uit later tijd**
- Geen stoom: geen stoommachine, geen fabrieksschoorsteen en geen stoomboot. Stoom komt pas in 1867 in Leeuwarden. [R3], [R7]
- Geen walsenstoelen en geen plansichters. Die komen in het spel pas in 1920. [R5], [R8]
- Geen kunststenen. Die zijn er pas rond 1900. [W10]
- Geen elektriciteit, gloeilampen, TL of led, en geen gaslicht. [W19], stijlgids
- Geen petroleumlamp. Die kwam pas in 1859. [W19]
- Geen moderne maaltoren, silo's, stalen graanschip, vrachtwagen of het Nieuwe Kanaal.

**Koopmans van nu**
- Geen logo, geen kroon en geen huisstijloranje (#E78A01) als kleur van iets in beeld.

**Geen tarwe of stad**
- Geen tarweakker met klaprozen en phacelia. Dat is het beeld van nu: bloemranden horen bij Nedertarwe [R1-feit 19 in research-molenproces.json].
- Geen gouden tarwe als graan in de molen. Tarwe malen lukte in Holwerd niet. [R3]
- Geen stad. Leeuwarden komt pas in 1867.

**Dingen in Holwerd die in 1846 nog niet bestonden**
- Geen witte, gepleisterde Doopsgezinde kerk met zuilen. Die is van 1850; ervoor stond er een kerk uit 1692. [W18]
- Geen Miedenmolen (1855). [W13]
- Geen windmolen De Hoop. De bronnen zijn het oneens: "vóór 1713" volgens [W12] en [W24], maar waarschijnlijk 1873 volgens [W11], omdat de kaart van Eekhoff rond 1850 geen molen toont. Laat hem weg. Dat voorkomt ook verwarring met de rosmolen.
- Geen dam of veerdam naar Ameland (1872) en geen spoorlijn of station (1901). [W12], [W13]
- Geen stoepen langs de straat (na 1871). [W11]
- Geen afgegraven kerkterp: in 1846 is die nog hoog. [W11]
- Geen gereformeerde kerk (rond 1920 en 1933). [W12], [W13]

**Twijfelachtig of verkeerd**
- Geen boekweitveld vlak bij het dorp: de zware klei is ongeschikt en het land rond Holwerd is weide. [W9], [W16] Wind laat je zien in het gras en riet langs de vaart en in de wolken, niet in boekweit.
- Geen buitenrosmolen met een balk die boven het dak uitsteekt. Dat type is Vlaams en voor Friesland niet gedocumenteerd. [W5]
- Geen vuur- of lichtbaken op de toren. De toren was ooit een vuurbaak [W17], maar het is niet bekend wanneer.

**Overig**
- Geen naambord met "Holwert". Die officiële naam is van 2023 [W13]. Zet sowieso geen tekst in het beeld.
- Geen meelstofexplosie en geen gevaarlijk ogende dingen. Meelstof is alleen sfeer. (stijlgids)
- Geen herkenbare gezichten. (opdracht)

---

## 3. Shot 1, buiten: "Holwerd, 1846" (5,0 s)

### Beginbeeld (t = 0)
De camera hangt hoog, ongeveer 40 m, boven de Holwerdervaart ten zuiden van het dorp en kijkt naar het noorden. Van achter naar voor:

1. **Lucht:** 0 tot 45% van de hoogte, met een verloop en drie stapelwolken. De zon staat laag links buiten beeld; links gloeit het warm.
2. **Horizon** op y 45%:
   - een smalle zilveren band wad (#A9C3CC, met glinsteringen #F6F0DC), 1,5% hoog;
   - daarop, heel vaag, een lage duinrij (#C7CBBD) van x 55 tot 85%. Dat is Ameland, maar dat is onzeker; laat het weg als het onrustig wordt.
3. **Zeedijk** op y 47 tot 49%: een lange, kaarsrechte groene band (#93AE7E) over de hele breedte, met een paar schapen als lichte stipjes erop (#EEEAE0).
4. **Polder** op y 49 tot 60%:
   - weiland in banen van #8AAA6A en #76955A, met een radiaal verkavelingspatroon rond de terp;
   - een paar zwartbonte koeien (#2F2A27 en #EEEAE0);
   - links en rechts twee kop-hals-rompboerderijen in waas (#B7BFB4), met een groepje bomen eromheen (#8BA884).
5. **Kerkterp** links van het midden, x 36 tot 50%:
   - een ronde heuvel (#8FAA6C) met een laag hek of muurtje eromheen;
   - de L-vormige kerk met een blauwgrijs dak (#505862);
   - de losse toren op x 38 tot 41%, met de spits tot y 30%;
   - een paar bomen bij het kerkhof.
6. **Dorpsterp:** een langgerekte, flauwe heuvel van het midden naar voren, met daarop twee rijen eenlaagse huizen langs de straat.
   - Rode pannendaken (#B0553A) met een paar zwarte, geglazuurde pannendaken (#3E4349) ertussen.
   - De meeste daken staan met de nok haaks op de straat.
   - Uit drie schoorstenen komt rook.
   - Midden in de rij valt de rosmolen op: hij is groter, de rieten kap is goudgeel (#C9A24A) en de nok staat ook haaks op de straat.
7. **Dobbe:** een kleine vijver naast de straat met een spiegeling van de lucht (#9DBBC8). Dit is optioneel.
8. **Vaart** van onder het midden naar het dorp, x 30 tot 70% en y 70 tot 100% (#6F96A8, rimpels in rgba(222,236,242,.5)):
   - op y 78% een houten loswal aan de rechteroever;
   - daaraan een kleine tjalk met een donkere romp (#3A2C22), een opgegeide bruine zeil (#8E5B3A) en een zwaard omhoog;
   - op de wal een stapel zakken (#CDBE9C), een kar met twee wielen en twee mannensilhouetten, waarvan één met een zak op de schouder.
9. **Voorgrond:** pollen riet en lang gras onderin links en rechts (#B9A86A, punten #D7C78C) die wuiven in de wind.

### Camerabeweging (0,4 tot 5,0 s)
- **0 tot 0,4 s:** stil.
- **0,4 tot 3,4 s:** de camera daalt van 40 m naar ongeveer 4 m en glijdt naar voren langs de vaart.
  - Rond 1,8 s gaat hij vlak over de tjalk; de mast schuift links door beeld.
  - De ooghoogte daalt op een log-schaal (zoals `iCamAt` in shot 1 van de hoofdintro), zodat het dalen gelijkmatig voelt.
- **3,4 tot 5,0 s:** hij remt af en buigt iets naar rechts de straat in. De kerktoren schuift achter de rosmolen naar links, tot hij boven de linker dakhelft uitkomt.
- **Cameravakken in IBOX-vorm** [x0, x1, y0, y1, ooghoogte], met 1 eenheid = 0,1 m en de voorgevel van de rosmolen op diepte 0:
  - begin: [-1500, 1500, -1100, 400, -400];
  - eind: [-110, 110, -95, 40, -16].

### Eindbeeld (t = 5,0 s)
De camera staat ongeveer 12 m voor de rosmolen op ooghoogte (1,6 m).

1. **Lucht:** 0 tot 40%, met een wolk rechtsboven.
2. **Kerktoren** achter de molen, links van het midden, x 33 tot 40%.
   - De spits loopt van y 4 tot 22%; hij is van leien (#4B535C, lichtkant #6C7680) met een kleine weerhaan (#C9A24A) op de punt.
   - Het bovenste deel van de romp, y 22 tot 34%, is frisrood baksteen (#B4573B, schaduwkant #8E4430), met een rondbogig galmgat (#3A2A22) per zijde.
   - De romp verdwijnt achter de rieten kap.
3. **Huizen** links (x 0 tot 26%) en rechts (x 74 tot 100%), elk met de topgevel naar de straat.
   - Baksteen #A55B3D, #8E4A32 en #C07A55.
   - Ramen met kleine ruitjes (#5E6E78, kozijnen #E9E2D0) en groene deuren (#4E5F48).
   - Nokken op y 30 tot 38%, goten op y 52 tot 56%.
   - Uit de schoorsteen links rook (rgba(236,232,222,.55)) die naar rechts drijft.
4. **Rosmolen** in het midden, x 28 tot 72%:
   - **Wanden:** een houten gevel van liggende, gepotdekselde planken (lichtkant #8A7258, schaduwkant #5E4C3B, naden #3A2E24) op een lage stenen voet (#9C5236) van y 66 tot 70%.
   - **Dak:** een rieten kap, de topgevel naar de camera. De goot ligt op y 47%, de nok op y 18%, en bovenin zit een klein voorschild (afgeschuinde punt). Riet #C9A24A, lichtkant links #DDB862, schaduw #A9842F en een donkere dakrand #7E6226. Laat het riet licht overhangen.
   - **Verhoudingen:** de gevel is 9,3 m breed, de muur 3,0 m hoog en de nok 6,75 m, zoals in Zeddam [W3].
   - **Deur:** een open dubbele deur in het midden, x 41,5 tot 58,5% en y 50 tot 69% (ongeveer 3,4 x 2,8 m). De deurbladen draaien naar binnen en buiten (#5A3F26, #3A2817), met donkere hengsels.
   - **Raam:** een klein raampje rechts van de deur, x 62 tot 67% en y 54 tot 60%.
5. **In de deuropening** (de kern van het shot):
   - Binnen is het donker (#2A1C10). Een schuine lichtbundel uit een zijraam valt van linksboven naar rechtsonder (rgba(255,226,170,.22)).
   - Bovenin de opening, y 50 tot 54%, zie je de onderkant van het grote kamwiel als een donkere gebogen band met kammen (#C99A3A). De kammen schuiven langzaam van rechts naar links.
   - Onderin, y 66 tot 69%, ligt een licht zandpad (#C9B386).
   - **Het paard** loopt dichtbij, net achter de deur, van rechts naar links door de opening, zoals in het tijdperkplaatje.
     - Kleur: donkerbruin, vacht #5A3B24, lichtkant #7A5434, schaduw #3A2614, manen en staart #2A1A0C.
     - Oogkleppen en tuig #1E140C, een gesp in #B8954A.
     - Een lichtrand aan de bovenkant (#9C7048) maakt hem los van het donker.
     - Maat: ongeveer 11% van de beeldbreedte lang, schoft op y 57%, hoeven op y 68%.
     - Achter hem loopt de trekboom (#6B4A2B) schuin naar de spil, die net zichtbaar is.
   - Verder weg, op de achterkant van de kring, loopt het paard soms kleiner terug van links naar rechts.
6. **Straat voor de molen**, y 70 tot 100%: lichte, aangestampte aarde (#C8B48A, schaduw #A8936A), die naar het dorp toe licht oploopt.
   - **Links**, x 10 tot 27% en y 64 tot 86%: een houten handkar met twee spaakwielen (#6B4A2B, wielen #4A3320) en drie zakken (#CDBE9C, schaduw #A89878).
   - Daarnaast tilt een mannensilhouet (#3B3633, hoed met smalle rand) een zak op de schouder.
   - **Rechts**, ver weg in de straat (x 80%, y 60%): een klein vrouwensilhouet met wijde rok en witte muts (#EDE6D6).
7. **Vogels:** twee zwaluwen (#23262B) schieten rond de dakrand en drie meeuwen (#F7F5EF, vleugelpunten #3A3D41) zweven hoog.

### Wat beweegt (shot 1)
- **Paard en wiel:**
  - Het paard loopt één rondje per 10 tot 12 s; echt is 12 s [W3].
  - Stem de fase zo af dat het paard op t = 4,6 s midden in de deuropening is en daarna in zijn rondje doorloopt.
  - De kammen van het kamwiel in de deuropening draaien even snel mee als het paard.
- **Stap:** 4 tellen, ongeveer 1,1 tot 1,2 s per stapcyclus (in het tijdperkplaatje: `Math.sin(t*5.2)`). Het hoofd knikt mee en de staart zwaait licht.
- **Rook:** uit 2 of 3 schoorstenen, langzaam naar rechts, hooguit 8 pluimen in totaal.
- **Wolken:** drijven langzaam naar rechts.
- **Vogels:**
  - meeuwen: hooguit 3 of 4, zweven in trage bogen;
  - zwaluwen: 2, snelle bogen; weglaten in de lite-stand.
- **Gras en riet:** wuiven in het beginbeeld, alleen zolang ze in beeld zijn.
- **Water:** rimpels in de vaart, en de wimpel van de tjalk wappert.
- **Man met zak:** twee standen (bukken, zak op schouder) die langzaam wisselen, of stil.

### Avond (donker thema)
- **Lucht:** van boven naar onder #0D1720, #1F2F3D en #6A4C33, met een warme gloed laag links (de zon is net onder in het westnoordwesten). Bovenin één ster.
- **Wad:** de band in het beginbeeld is donker (#22323B) met een koperen glans (#B88A55).
- **Huizen:** donker (#3E241B, daken #141517). In een paar kleine ramen brandt warm licht (#E8B35A) van een kaars of olielamp; niet te veel en niet te fel.
- **Rosmolen:** het riet is donker (#5C4A26) met een warme rand. Achter de deur hangt een lantaarn, dus de opening is warm: #C98F3E in het midden, #3A2410 naar de randen.
- **Paard:** silhouet #3A2616 met een warme lichtrand (#C08A4A) aan de kant van de lantaarn.
- **Rook:** grijs (rgba(120,112,100,.35)).
- **Vogels:** geen zwaluwen. Eventueel 1 of 2 vleermuizen (#0B0C0E).
- **Vaart:** #13252F, met een warme spiegeling van een raam.

---

## 4. Shot 2, binnen: "In de rosmolen, 1846" (5,0 s)

### De ruimte (maten voor de tekenaar)
- **Gebouw:**
  - binnenmaat ongeveer 9 m breed en 13 m diep;
  - wanden van staande planken (#3B2816 tot #523822) met kieren van daglicht, zoals `gxBG.hout`;
  - balken (#2C1D0F) met stro (#DEBE7A) erop, en schoren in de hoeken.
- **Spil:** midden in de ruimte, ongeveer 4 m achter de deur.
  - Een zware vierkante houten spil van 0,3 m, met afgeschuinde hoeken en twee of drie ijzeren banden.
  - Hij staat op een ronde kei met een gat erin (taatspot, #7D7A72) en loopt tot een dwarsbalk op ongeveer 6 m. [W5], [W6]
- **Groot kamwiel:**
  - plat (horizontaal), met de onderkant op 2,7 m, een straal van 3,6 m en een rand van ongeveer 0,3 m dik;
  - vast aan de spil met een kruis van dubbele armen; schuine schoren lopen van de armen (op ongeveer 1,6 m van de spil) naar onderaan de spil, binnen de looprand van het paard;
  - de kammen steken straalsgewijs uit de rand: teken er ongeveer 120, Zeddam had er 340 [W3], [W5].
- **Trekboom:** een balk op 1,2 m hoogte, van de spil tot net buiten de kring van het paard (ongeveer 2,9 m). Het paard hangt er met een zwingel achter. Een leidsel loopt van het halster naar de spil. [W5], [W6]
- **Looppad:** een ring van licht zand (#C9B386) met een straal van 2,65 m en ongeveer 0,9 m breed, met hoefafdrukken (#9A8458), op een vloer van donkere leem (#5E4A30). [W3]
- **Rondsel:** aan de buitenkant van de wielrand, op 3,8 m van de spil.
  - Twee houten schijven (#5A3F26) van 0,45 m met 19 lichte staven ertussen (#C8A878), op een ijzeren steenspil (#3A3A3C, glans #8E9296). [W3], [W5]
  - De steenspil gaat recht naar beneden naar de loper.
- **Maalstoel:** onder het rondsel, buiten de looprand van het paard. Hij staat rechtsvoor in het gebouw: op ongeveer 3,8 m van de spil, 1,5 m van de voorgevel en 1,7 m van de rechter zijwand, zoals je binnenkomt door de deur.
  - Een houten stoel van 0,8 m hoog (#5A3F26 en #3E2A18) met een trapje van drie treden.
  - Daarop een achtkantige houten kuip (#7A5634, lichtkant #94693F) van 1,3 m breed en 0,45 m hoog, met een deksel (#8A6A44). Daarin liggen de twee blauwe stenen van 1,1 m (#5F6468, lichtkant #7E8489, groeven #43474B), die je alleen ziet bij het oog. [W5], [W10]
- **Graanbak en schudbak:**
  - de graanbak is een omgekeerde houten piramide (#7A5634) op een bokje (#4A3320) naast de spil boven de kuip, vol met boekweit (#3B2C21, glans #6E5A45);
  - de schudbak is een schuin gootje van de graanbak naar het oog. Hij trilt, omdat de spil er tegenaan tikt. [W5]
- **Meelpijp:** een houten koker aan de rand van de kuip. Er loopt grijzig meel uit (#D9D2C4, spikkels #7A6D5E) in een zak die aan twee haken hangt.
- **Buil:** tegen de achterwand een lange houten builkist (2,5 x 0,8 x 1,2 m, #6B4A2B) met een zak eronder. Die beweegt niet. [R1], [R8]
- **Kleine dingen:**
  - op een plank bij de deur een zandloper (glas rgba(232,226,208,.6), zand #D9B877) [W7];
  - tegen de stoel twee volle zakken;
  - een hooivork aan de wand.

### Beginbeeld (t = 0)
De camera staat laag (1,3 m) linksvoor in het gebouw, net binnen de voorgevel en links van de deur, ongeveer 4,8 m van de spil. Hij kijkt schuin naar achteren (naar rechtsachter) op de spil en iets omhoog. De deur zit rechts achter de camera, buiten beeld. Van achter naar voor:

1. **Achterwand** met plankkieren in daglicht (lijnen #F4E1B4, gloed rgba(255,228,184,.12)) en de builkist links achter.
2. **Raam:** links in de zijwand een raampje met kleine ruitjes (#E9F0F0). Een schuine lichtbundel (rgba(255,226,170,.20)) met stofjes valt naar rechtsonder op het zandpad.
3. **Spil** midden in beeld, x 48 tot 52%, van y 80% tot boven uit beeld. De schoren lopen als een paraplu van y 62% schuin omhoog naar de armen.
4. **Groot kamwiel** boven de camera, van onderen gezien. De verre rand loopt als een brede boog over het beeld op y 16 tot 22%, met de kammen goed zichtbaar. De nabije rand valt bovenin buiten beeld. Daartussen zie je de onderkant: het kruis van armen en de schoren naar de spil.
5. **Maalstoel** helemaal rechts, x 84 tot 100% en y 42 tot 66%, deels afgesneden. Je ziet de kuip, de graanbak, het trapje en bovenaan het rondsel bij de wielrand.
6. **Paard** groot in beeld, ongeveer 3,5 m van de camera. Het loopt van rechts naar links, schuin van voren gezien.
   - x 34 tot 74%, oren op y 26%, schoft op y 41%, hoeven op y 90%.
   - Oogkleppen, een haam om de hals (#4A3320), streng en zwingel achter, en de trekboom van de spil (y 52%) naar zijn flank.
   - Kleur zoals in shot 1. Het licht uit het raam geeft een warme rand op zijn rug.
7. **Vloer:** het zandpad loopt als een brede, lichte boog van linksonder naar rechts (y 80 tot 98%) en het donkere leem eromheen.
8. **Daglicht van de deur:** vanaf rechts valt een brede strook zon schuin over het zandpad en de voorbenen van het paard (rgba(255,226,170,.22)), met stofjes erin.

### Camerabeweging (0,3 tot 5,0 s)
- **0 tot 0,3 s:** stil. Het paard stapt al.
- **0,3 tot 2,6 s:** de camera schuift langs de binnenkant van de voorgevel naar rechts, langs de deur (achter de camera), en stijgt van 1,3 naar 3,0 m. De kijkrichting blijft ongeveer gelijk.
  - Het paard loopt links uit beeld.
  - De camera blijft buiten de wielrand. De kammen schuiven groot door het bovenste deel van het beeld.
  - De maalstoel komt van de rechterrand naar het midden.
- **2,6 tot 3,6 s:** de camera komt op ooghoogte naast het rondsel. De kammen grijpen in de staven en het rondsel draait snel; teken de staven als vage strepen.
- **3,6 tot 5,0 s:** de camera stijgt nog iets naar 3,4 m en de blik kantelt naar beneden, van iets omhoog naar ongeveer 48 graden omlaag, net als de kanteling in shot 3 van de hoofdintro. De camera komt tot rust boven de kuip.

### Eindbeeld (t = 5,0 s): klaar voor de duik
De camera staat ongeveer 3,4 m hoog tussen de wielrand en de voorgevel, ongeveer 4 m van de spil en 1,6 m (horizontaal) van het midden van de kuip. Hij kijkt ongeveer 48 graden omlaag op de kuip; de spil staat links buiten beeld. Linksboven loopt de rand van het kamwiel met de kammen als een donkere band door beeld (#4E3218, kammen #C99A3A).

1. **Kuip** groot in beeld, x 20 tot 80% en y 40 tot 88%: een achtkant in perspectief, met een deksel van planken (#8A6A44, naden #5A3F26).
2. **Oog van de steen:** midden in het deksel op x 50% en y 60%, een rond gat (#16100A) ter breedte van ongeveer 8% van het beeld, met een smalle ring blauwe steen eromheen (#7E8489).
3. **Steenspil:** uit het oog loopt de ijzeren steenspil recht omhoog, x 49 tot 51%, tot de bovenrand. Daar zie je nog net het onderste stuk van het rondsel (y 0 tot 8%), dat snel draait.
4. **Graanbak** rechtsboven, x 58 tot 86% en y 12 tot 40%, op zijn bokje, vol donkere boekweit.
5. **Schudbak** van de onderkant van de graanbak schuin naar linksonder tot net boven het oog (x 52 tot 66%, y 40 tot 56%). Een dun straaltje zaad valt in het oog.
6. **De korrel** (de speler, `drawGrain`) ligt op de lip van de schudbak, op x 57% en y 50%.
   - Hij valt op door zijn goudkleur tussen de donkere boekweit en kijkt je aan, net als bovenaan in shot 3 van de hoofdintro.
   - Dit is het punt van de duik.
7. **Meelpijp** rechtsonder aan de kuip (x 78 tot 88%, y 74 tot 90%), met grijzig meel dat in een zak valt (afgesneden onderaan).
8. **Paard en zandpad** langs de linkerrand (x 0 tot 16%, y 8 tot 60%), van boven gezien.
   - Elke ronde komt het paard van achteren aanlopen, schuin naar de camera toe, en verdwijnt links uit beeld.
   - Je ziet vooral de rug, de manen en het hoofd met de oogkleppen.
   - Bij reduced motion staat het met de kop op ongeveer y 20%.
   - In een staand beeld valt het paard hier weg. Dat is goed: in het eindbeeld gaat het om de steen en de korrel.
9. **Licht:** de deur zit links achter de camera. Een warme strook zon valt van linksonder schuin over het deksel van de kuip, met stofjes in de bundel.

### Wat beweegt (shot 2)
- **Paard:** stap in 4 tellen (ongeveer 1,1 s per cyclus), het hoofd knikt, de staart zwaait en de manen wippen. Eén rondje per 10 tot 12 s.
- **Spil en kamwiel:** draaien even snel als het paard. De kammen schuiven gelijkmatig.
- **Rondsel en steenspil:** draaien ongeveer 18 keer zo snel als het wiel, ongeveer 1,5 omwenteling per seconde (naar Zeddam: 5 en 90 toeren per minuut [W3]).
  - Teken het rondsel niet staaf voor staaf maar met 3 of 4 vage strepen, want anders gaat het flikkeren.
- **Schudbak:** trilt licht, met een uitslag van ongeveer 1 px en 3 tot 4 tikken per seconde. Daarbij valt een straaltje zaad: hooguit 15 deeltjes.
- **Meel:** een zachte stroom uit de meelpijp, met een dun stofwolkje (rgba(236,230,216,.5), hooguit 10 deeltjes).
- **Stofjes:** in de lichtbundels, hooguit 30, langzaam.
- **Avond:** de lantaarnvlam flakkert heel licht (alleen in de helderheid, geen schudden).

### Avond (donker thema)
- **Lantaarn:** hangt aan een balk links bij de deur, ver van de kuip.
  - Metalen kap #2A2A2A, glas #FFE9B0, vlam #FFE3A0.
  - Een zachte, ronde lichtvlek (rgba(255,214,140,.30)) die naar buiten wegloopt in diepe schaduw (#120B05).
- **Deuropening:** blauw schemerlicht (#3B4A5C).
- **Wanden:** #1E140B tot #2A1C10, met bijna geen kieren meer.
- **Paard:** #3A2616 met een warme lichtrand (#C08A4A) aan de lantaarnkant.
- **Wiel:** de kammen vangen glans (#C08A3A).
- **Kuip en korrel:** de kuip is aan de lantaarnkant warm belicht (#94693F) en aan de andere kant donker. De korrel krijgt een warm glimlicht.

---

## 5. Na "It giet oan!": de duik

- Vanuit het eindbeeld van shot 2 duikt de camera in ongeveer 0,8 s (zoals IDIVE in de hoofdintro) recht het oog van de steen in.
  - Het oog groeit tot het beeld donker is (#16100A), met een paar grijze meelvlokjes die voorbij schieten.
  - Daarna verschijnt de introband van 1846 op de spelachtergrond `gxBG.hout`.
- Zo valt de korrel letterlijk de molen in, en het spel is een val door de molen.
- Bij reduced motion: zacht overvloeien naar de introband, zonder zoom.

---

## 6. Teksten per shot

Wat er al staat en dus niet herhaald wordt:
- LEVELS[0].intro: "Bakkersgezel Uilke Klazes Koopmans leent 1.550 gulden en begint met één rosmolen."
- LEVELS[0].supply: "Paarden draaien de molenstenen, de buil zeeft."
- STORIES[0]:
  - het geld van de familie, vlak voor het huwelijk met Trijntje Jans Bierma;
  - "midden in het dorp Holwerd";
  - boekweit veel verbouwd en gegeten als pannenkoek, brood en gruttenbrij;
  - de gelijkmatige tred;
  - 1.300 rosmolens.
- Hoofdintro, shot 3: "Eerst val je terug in de tijd, naar de eerste molen van Koopmans."
- STORIES[1] zegt al dat grote schepen Holwerd niet konden bereiken.

De jaarintro vertelt dus alleen wat je ziet: de terp, de dijk, de schuit, het paard achter de deur, de oogkleppen, het kamwiel, het rondsel en de steen.

### Shot 1

**kicker:** `Holwerd, 1846` (het jaartal in handschrift, La Belle Aurore)

**cap** (24 woorden):
> Holwerd ligt op een terp achter de zeedijk. Schuiten brengen zakken boekweit over de vaart. Achter de open deur loopt een paard zijn rondjes.

| Bewering | Bron | Betr. |
|---|---|---|
| Holwerd ligt op een terp | [R6], [W12], [W11] | hoog |
| achter de zeedijk | [W11]: de dijk van 1580 ligt ruim een kilometer noordwestelijk | hoog |
| Schuiten brengen zakken boekweit over de vaart | [W1]: aanvoer en overslag op kleinere schepen; [W15]: vaart voor goederen; [W11]: loswal | middel (afgeleid) |
| Achter de open deur loopt een paard zijn rondjes | [R1], [R2]: rosmolen met paarden; [W3], [W4], [W5]: het paard loopt binnen | middel (binnentype is een keuze) |

**desc** (één zin):
> Beeld: vanaf de vaart daal je naar het terpdorp Holwerd, met de kerktoren op zijn eigen terp en de zeedijk aan de horizon, langs een schuit waar zakken boekweit worden gelost, tot de open deur van de rosmolen waarachter een paard rondloopt.

### Shot 2

**kicker:** `In de rosmolen, 1846` (het jaartal in handschrift)

**cap** (23 woorden, voorstel):
> Het paard met oogkleppen draait de spil. Het kamwiel boven zijn hoofd drijft een klein rondsel aan, dus de steen draait veel sneller.

Alternatief (23 woorden), als de hoofdbouwer liever eindigt bij wat je op het laatst ziet:
> Het paard met oogkleppen draait de spil. Het kamwiel erboven drijft een klein rondsel aan. Boekweit valt in het oog van de steen.

| Bewering | Bron | Betr. |
|---|---|---|
| Het paard draagt oogkleppen | [W6]: rosmolenpaard met oogkleppen tegen afleiding en duizeligheid | middel |
| en draait de spil | [W5]: de trekboom zit aan de koningspil; [W2] | middel |
| Het kamwiel zit boven zijn hoofd | [W3]: kamwiel van 7,25 m, het paard loopt een kleinere kring; [W5]: de trekboom zit onder het kroonwiel | middel |
| drijft een klein rondsel aan | [W3]: rondsel met 19 staven; [W5]: kammen grijpen in een schijfloop | middel |
| dus de steen draait veel sneller | [W3]: wiel 5 toeren per minuut, steen 90 | middel (getal van Zeddam, Holwerd onbekend) |
| Boekweit valt in het oog van de steen | [R1]: boekweit malen; [W5]: via de schudbak door het gat in de loper | middel |

**desc** (één zin):
> Beeld: binnen in de rosmolen loopt een paard met oogkleppen in een kring over het zandpad en draait zo de houten spil, de camera stijgt naar het grote kamwiel erboven en kijkt langs het snel draaiende rondsel omlaag naar de molenstenen, waar boekweit uit de graanbak in het oog van de steen valt en één korrel op de rand ligt.

Laatste knop: **It giet oan!** (klasse ui-fries, zoals in de hoofdintro).

---

## 7. Kleuren en sfeer

**Sfeer**
- **Dag:**
  - een heldere nazomermiddag met een lage zon van links: warme lichtkanten links en een koele schaduw rechts, net als in de hoofdintro;
  - binnen is het donker hout met bundels zon en stofjes; het riet en het zand zijn de lichte, warme vlakken.
- **Avond:**
  - blauwe schemer met een koperen gloed laag links en een paar warme ramen;
  - binnen één lantaarn als lichtbron, met diepe schaduwen en warme randen op het paard en het wiel.
- **Altijd:** rustig, weinig contrast in de verte (waas) en het meeste contrast bij het paard en daarna bij de korrel.

Voorstel als object, met namen voor de 1846-code (prefix j46):

```js
const J46_COL = {
  light: {
    sky: ['#6EA7D0', '#AFD2E3', '#F2E7CB'], sun: '#FFF6D8', glow: 'rgba(255,214,140,', cloud: '#FFFFFF', cloudSh: '#DCE7EA', cloudBase: '#BAC5D0',
    haze: '#E6E2D2', wad: '#A9C3CC', wadGlint: '#F6F0DC', dunes: '#C7CBBD',
    dike: '#93AE7E', dikeSh: '#7C966A', sheep: '#EEEAE0',
    grass: '#8AAA6A', grassRow: '#76955A', ditch: '#86A8B6', cowDark: '#2F2A27', cowLight: '#EEEAE0',
    farFarm: '#B7BFB4', farRoof: '#9EA79C', farTree: '#8BA884', tree: '#5F8A4E', treeDark: '#4D7541',
    terp: '#8FAA6C', street: '#C8B48A', streetSh: '#A8936A',
    towerLow: '#CBB08E', towerLowSh: '#A48B6E', towerHigh: '#B4573B', towerHighSh: '#8E4430', belfry: '#3A2A22',
    spire: '#4B535C', spireLit: '#6C7680', vane: '#C9A24A', church: '#A65E44', churchSh: '#7E4433', churchRoof: '#505862',
    houseA: '#A55B3D', houseB: '#8E4A32', houseC: '#C07A55', roofRed: '#B0553A', roofRedSh: '#843C29', roofBlue: '#3E4349',
    win: '#5E6E78', winFrame: '#E9E2D0', doorGreen: '#4E5F48', smoke: 'rgba(236,232,222,.55)',
    plank: '#8A7258', plankSh: '#5E4C3B', seam: '#3A2E24', plinth: '#9C5236',
    thatch: '#C9A24A', thatchLit: '#DDB862', thatchSh: '#A9842F', thatchEdge: '#7E6226',
    doorWood: '#5A3F26', doorWoodSh: '#3A2817', inside: '#2A1C10', beam: 'rgba(255,226,170,.22)',
    water: '#6F96A8', ripple: 'rgba(222,236,242,.5)', refl: 'rgba(29,30,31,.14)', quay: '#7A6650', quayEdge: '#9A9486',
    hull: '#3A2C22', wale: '#5A4535', sail: '#8E5B3A', sailSh: '#6E432A', pennant: '#B8473A',
    reed: '#B9A86A', reedLit: '#D7C78C', reedStem: '#8E8150',
    cart: '#6B4A2B', wheel: '#4A3320', sack: '#CDBE9C', sackSh: '#A89878', sackTie: '#7A6A50',
    person: '#3B3633', cap: '#EDE6D6', apron: '#5F7088',
    gull: '#F7F5EF', gullTip: '#3A3D41', swallow: '#23262B',
    horse: '#5A3B24', horseLit: '#7A5434', horseSh: '#3A2614', mane: '#2A1A0C', harness: '#1E140C', collar: '#4A3320', brass: '#B8954A', horseRim: '#9C7048',
    // binnen
    wall: '#3B2816', wall2: '#523822', wallSeam: '#1A0E05', slit: '#F4E1B4', slitGlow: 'rgba(255,228,184,.12)',
    rafter: '#2C1D0F', straw: '#DEBE7A', window: '#E9F0F0', shaft: 'rgba(255,226,170,.20)', doorLight: '#F4E8CE',
    loam: '#5E4A30', sand: '#C9B386', sandSh: '#A8915F', hoof: '#9A8458',
    spindle: '#56391F', spindleLit: '#7A5631', spindleSh: '#24170B', iron: '#2A2A2A', ironHi: 'rgba(210,210,210,.25)', taats: '#7D7A72',
    wheelRim: '#7A4F26', wheelLit: '#9C6A38', wheelSh: '#4E3218', arm: '#6B4424', brace: '#5A3F26', cog: '#C99A3A', cogSh: '#9E7426',
    trekboom: '#6B4A2B', pinionDisc: '#5A3F26', stave: '#C8A878', steel: '#3A3A3C', steelHi: '#8E9296',
    stool: '#5A3F26', stoolSh: '#3E2A18', tun: '#7A5634', tunLit: '#94693F', lid: '#8A6A44',
    stone: '#5F6468', stoneLit: '#7E8489', groove: '#43474B', eye: '#16100A',
    hopper: '#7A5634', trestle: '#4A3320', seed: '#3B2C21', seedHi: '#6E5A45',
    meal: '#D9D2C4', mealSh: '#B8B0A0', speck: '#7A6D5E', mealDust: 'rgba(236,230,216,.5)',
    bolter: '#6B4A2B', glass: 'rgba(232,226,208,.6)', hourSand: '#D9B877', mote: 'rgba(255,240,205,.8)',
  },
  dark: {
    sky: ['#0D1720', '#1F2F3D', '#6A4C33'], sun: null, glow: 'rgba(231,138,1,', star: 'rgba(247,247,247,', cloud: '#2B3843', cloudSh: '#222E37', cloudBase: '#6B4A33',
    haze: '#3A3128', wad: '#22323B', wadGlint: '#B88A55', dunes: '#2E3634',
    dike: '#1E2A22', dikeSh: '#17201A', sheep: '#4A4A44',
    grass: '#1A241F', grassRow: '#16201B', ditch: '#1A2A33', cowDark: '#0F0F0F', cowLight: '#3A3A36',
    farFarm: '#1D2930', farRoof: '#161E24', farTree: '#16231C', tree: '#17261B', treeDark: '#111C15',
    terp: '#1E2A20', street: '#3A3428', streetSh: '#2A251D',
    towerLow: '#4A3A30', towerLowSh: '#3A2D25', towerHigh: '#3E2620', towerHighSh: '#2E1C18', belfry: '#120D0A',
    spire: '#1C2126', spireLit: '#5A6068', vane: '#8A7238', church: '#33201A', churchSh: '#26180F', churchRoof: '#191C20',
    houseA: '#3E241B', houseB: '#33201A', houseC: '#4A2E22', roofRed: '#2A1712', roofRedSh: '#1E100C', roofBlue: '#141517',
    win: '#1C2227', winLit: '#E8B35A', winGlow: 'rgba(242,195,91,.30)', winFrame: '#5A5448', doorGreen: '#1E2620', smoke: 'rgba(120,112,100,.35)',
    plank: '#3A2E24', plankSh: '#2A2119', seam: '#140E09', plinth: '#3A1F16',
    thatch: '#5C4A26', thatchLit: '#8C7038', thatchSh: '#463819', thatchEdge: '#2E2410',
    doorWood: '#2A1C10', doorWoodSh: '#1A1008', inside: '#3A2410', insideGlow: '#C98F3E', beam: 'rgba(255,214,140,.35)',
    water: '#13252F', ripple: 'rgba(90,130,150,.45)', refl: 'rgba(0,0,0,.25)', lit: 'rgba(242,195,91,.25)', quay: '#2D2720', quayEdge: '#3D3A34',
    hull: '#141B20', wale: '#221C17', sail: '#3E2A1E', sailSh: '#2A1C14', pennant: '#5A2620',
    reed: '#3A3520', reedLit: '#5A5232', reedStem: '#2A2618',
    cart: '#2A1C10', wheel: '#1E140B', sack: '#6E6656', sackSh: '#4E483C', sackTie: '#3A342A',
    person: '#0E0F10', cap: '#8A8478', apron: '#22283A',
    gull: '#B9C0C6', gullTip: '#2A2D31', bat: '#0B0C0E',
    horse: '#3A2616', horseLit: '#C08A4A', horseSh: '#1E130A', mane: '#140C06', harness: '#0E0905', collar: '#2A1C10', brass: '#D6A75A', horseRim: '#C08A4A',
    // binnen
    wall: '#1E140B', wall2: '#2A1C10', wallSeam: '#0C0703', slit: '#3B4A5C', slitGlow: 'rgba(90,110,140,.10)',
    rafter: '#140C05', straw: '#7A6438', window: '#2E3B4C', shaft: 'rgba(120,140,170,.10)', doorLight: '#3B4A5C',
    lanternBody: '#2A2A2A', lanternGlass: '#FFE9B0', flame: '#FFE3A0', halo: 'rgba(255,214,140,.30)', deepShadow: '#120B05',
    loam: '#2A2016', sand: '#7A6646', sandLit: '#B08A55', sandSh: '#55452E', hoof: '#4A3C28',
    spindle: '#2E1E10', spindleLit: '#8A5E30', spindleSh: '#120B05', iron: '#151515', ironHi: 'rgba(255,214,140,.35)', taats: '#3A3834',
    wheelRim: '#3E2814', wheelLit: '#8A5A2C', wheelSh: '#1E1209', arm: '#33200F', brace: '#2A1A0C', cog: '#C08A3A', cogSh: '#5A3E18',
    trekboom: '#33200F', pinionDisc: '#2A1A0C', stave: '#8A7248', steel: '#1E1E20', steelHi: '#C8A070',
    stool: '#2A1A0C', stoolSh: '#180F06', tun: '#3E2A16', tunLit: '#94693F', lid: '#4A3820',
    stone: '#3E4246', stoneLit: '#6E7276', groove: '#26292C', eye: '#0A0704',
    hopper: '#3E2A16', trestle: '#22160A', seed: '#2A1F17', seedHi: '#8A7050',
    meal: '#BDB4A2', mealSh: '#8E8676', speck: '#4E443A', mealDust: 'rgba(220,206,180,.35)',
    bolter: '#2E1E10', glass: 'rgba(255,233,176,.35)', hourSand: '#B89858', mote: 'rgba(255,226,170,.85)',
  },
};
```

De lichte waarden voor lucht, wolken, waas, huizen en buitenmuren komen uit ICOL van de hoofdintro, zodat beide intro's één familie vormen. Het hout binnen, het paard en de kammen komen uit `gxBG.hout`, `gxVIG.hout` en `LEVELS[0].pal`, zodat de duik naadloos in het spel uitkomt.

---

## 8. Twijfelpunten

1. **Hoe de molen eruitzag.** Geen bron beschrijft de rosmolen van Koopmans zelf: niet het type (binnen of buiten), niet het materiaal (hout of baksteen) en niet het dak (riet of pannen).
   - Ik kies het binnentype, zoals Zeddam en Kampen. Houten wanden en een rieten kap sluiten aan bij het spel (`gxBG.hout`, `gxVIG.hout`).
   - Baksteen met een pannendak is even goed mogelijk.
   - Het tijdperkplaatje toont een open kap op palen. Dat mag als klein plaatje zo blijven, maar het wijkt af van dit storyboard.
2. **De aanvoer per schuit is afgeleid, niet letterlijk voor 1846 bevestigd.** Wikipedia zegt dat de boekweit later van buiten Friesland kwam en dat grotere schepen Holwerd niet konden bereiken. Er was een vaart met een loswal.
3. **Geen boekweitveld in beeld.** De opdracht noemde "wind in de boekweit". Bij Holwerd ligt zware klei en weidegrond, en daarop groeit geen boekweit [W9], [W16]. De wind zit daarom in het riet, het gras, de rook en de wimpel. Wil de hoofdbouwer toch boekweitplanten laten zien, dan kan dat alleen in de zakken of als bos op de kar, niet als akker.
4. **Windmolen De Hoop.**
   - Stenvert (2000) en Wikipedia zeggen "vóór 1713" of "circa 1713".
   - Van den Berg (1983) zegt "waarschijnlijk 1873", omdat de kaart van Eekhoff geen molen toont.
   - Daarom laat ik hem weg.
5. **Eén of twee paarden.** Het onderzoek spreekt van "paarden", en een dorpsrosmolen had er vaak twee [W2]. De gebruiker vraagt om "een paard die rond draait".
   - Daarom loopt er één paard. Twee naast elkaar mag ook ([W5]: naast elkaar ingespannen), maar dan wordt het beeld drukker.
   - Een aflospaard buiten liet ik weg, omdat het vragen oproept.
6. **Kleur van het paard.** Het Friese paard is nu zwart en was in de 19e eeuw populair als trek- en landbouwpaard [W23]. Ik kies donkerbruin, omdat dat beter afsteekt binnen en aansluit bij het tijdperkplaatje (#6B4A2B). Een zwart Fries paard kan ook.
7. **Maten en snelheden komen van Zeddam** (een herbouwde molen uit 1546, in Gelderland). Voor Holwerd zijn ze een redelijke schatting, geen feit.
   - Een rondje van 12 s is echt. In 5 s zie je dan een klein deel van de kring.
   - Wie het levendiger wil, neemt 9 tot 10 s per rondje, maar niet sneller: het paard stapt en draaft nooit.
8. **Kammen staand of straalsgewijs.** Beide kwamen voor [W5]. Ik kies straalsgewijs, met het rondsel naast de rand en de steen eronder: dat is in vlakke stijl het duidelijkst. In Kampen zit het "bovenwerk" boven [W4].
9. **De kerktoren:**
   - De hoogte staat niet in de bronnen; de spits ongeveer even hoog als de romp is een schatting.
   - De toren diende ooit als vuurbaak [W17], maar het is niet bekend wanneer. Teken daarom geen licht op de toren.
10. **Ameland aan de horizon** is vanaf 40 m hoogte mogelijk, maar onzeker. Laat het weg als het onrustig oogt.
11. **De kleur van boekweitmeel** (grijzig met spikkels) is een aanname.
12. **Kleding** is gebaseerd op Ottema [W22], die vooral over nette kleren van rond 1830 tot 1840 gaat. In silhouet maakt dat weinig uit.
13. **Seizoen eind augustus of september** is een keuze, geen bron over Koopmans.

---

## 9. Bronnen

**Onderzoek en spel**
- [R1] `/home/user/Vaultwarden/game/onderzoek/research-molenproces.json`, feit 0 (bron royalkoopmans.com/nl/over-royal-koopmans/de-geschiedenis-van-koopmans): 1846, 1.550 gulden, rosmolen in de dorpskern van Holwerd, met paardenkracht boekweit builen en malen, voor pannenkoeken, brood en pap. Feit 19: de bloemranden van Nedertarwe.
- [R2] `/home/user/Vaultwarden/game/onderzoek/koopmans-site.md`, sectie 2 Tijdlijn (1846): "in de kop van Friesland", gelijkmatig lopende paarden, "brood en pap", en [W] de gelijkmatige tred.
- [R3] `research-molenproces.json`, feiten 1 en 2: in 1856 bleek de rosmolen niet geschikt voor tarwe; grotere schepen konden Holwerd niet bereiken; in 1867 de stoommeelfabriek in Leeuwarden.
- [R5] `research-molenproces.json`, feiten 25 en 76: de korenmolen (vlakmaalderij) met molenstenen tegenover de hoogmaalderij met walsen.
- [R6] `/home/user/Vaultwarden/game/onderzoek/spelmateriaal.json`, places "Holwerd": Fries terpdorp aan de Waddenkust.
- [R7] `/home/user/Vaultwarden/game/onderzoek-royal-koopmans.md`, Tijdlijn 1846, 1856 en 1867.
- [R8] `/home/user/Vaultwarden/game/korrelval.html`: LEVELS[0] (r. 658), FACTS (r. 705), STORIES[0] (r. 719), `gxBG.hout` (r. 1909), `gxVIG.hout` (r. 2623), INTRO_SHOTS en ICOL (r. 3976 e.v.).
- Stijlgids: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/stijlgids.md` (tijdperk 1846). Opdracht: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/opdracht.md`.

**Web**
- [W1] https://nl.wikipedia.org/wiki/Koopmans_Koninklijke_Meelfabrieken
- [W2] https://nl.wikipedia.org/wiki/Rosmolen
- [W3] https://nl.wikipedia.org/wiki/Rosmolen_Zeddam
- [W4] https://fietsnetwerk.nl/en/places/the-kampen-horse-mill-kampen
- [W5] Biekorf 76 (1975-1976), "Rosmolens in de Westvlaamse Kuststreek": https://dbnl.org/tekst/_bie001197501_01/_bie001197501_01_0088.php
- [W6] De Nieuwe Zelfzwichter, juni 2003, "De rosmolen in de boerderij Zuidpool in Usquert": https://groningermolens.nl/fileadmin/Molenfotos/user_upload/08815_003_Zelfzwichter_juni.2003.pdf
- [W7] https://www.openluchtmuseum.nl/nl/locaties/grutterij
- [W8] Fitzwilliam Museum, tegeltableau boekweitmolen (1780): https://feast-and-fast.fitzmuseum.cam.ac.uk/labels/tiles-milling
- [W9] https://nl.wikipedia.org/wiki/Boekweit
- [W10] https://nl.wikipedia.org/wiki/Molensteen
- [W11] H.M. van den Berg, Noordelijk Oostergo. Dongeradelen (1983), Holwerd: https://www.dbnl.org/tekst/berg229noor02_01/berg229noor02_01_0011.php
- [W12] Stenvert e.a., Monumenten in Nederland. Fryslân (2000), Holwerd: https://www.dbnl.org/tekst/sten009monu06_01/sten009monu06_01_0084.php
- [W13] https://nl.wikipedia.org/wiki/Holwerd
- [W14] https://en.wikipedia.org/wiki/Holwert
- [W15] https://nl.wikipedia.org/wiki/Holwerdervaart
- [W16] MIP-beschrijving Dongeradeel (grondgebruik rond 1850, landschap): https://020apps.nl/mip/beschrijvingen/Dongeradeel.pdf
- [W17] https://nl.wikipedia.org/wiki/Sint-Willibrorduskerk_(Holwerd)
- [W18] https://nl.wikipedia.org/wiki/Doopsgezinde_kerk_(Holwerd)
- [W19] https://nl.wikipedia.org/wiki/Petroleumlamp
- [W20] https://nl.wikipedia.org/wiki/Olielamp en https://nl.wikipedia.org/wiki/Lantaarn
- [W21] https://nl.wikipedia.org/wiki/Tjalk
- [W22] N. Ottema, "De oude klederdrachten van de Friese boer en boerin": https://www.oks.nl/wp-content/uploads/pdf/046_OttemaN_OudeKlederdrachtenFrieseBoerBoerin.pdf
- [W23] https://en.wikipedia.org/wiki/Friesian_horse
- [W24] https://nl.wikipedia.org/wiki/De_Hoop_(Holwerd)

De opgehaalde bronteksten staan in `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/web46/`.
