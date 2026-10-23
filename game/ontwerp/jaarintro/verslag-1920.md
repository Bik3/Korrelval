# Verslag jaarintro 1920 (Noordvliet, Leeuwarden), na de reviews

Werkbestand: `jaar/1920/korrelval.html`.

- Ik heb alleen de regels tussen `// ===== JAARINTRO 1920 BEGIN =====` en `// ===== JAARINTRO 1920 EIND =====` veranderd (874 regels).
- Het raamwerk werd tijdens dit werk drie keer vernieuwd (`jaar/frame/korrelval.html`, 19:13, 19:53 en 20:11). Ik heb mijn gebied daarom in de nieuwste versie gezet: buiten het gebied is het bestand nu byte voor byte gelijk aan de versie van 20:11. Daarna heb ik `node --check`, harness, `frame/nieuwkomer.js` en `reduced.js` opnieuw gedraaid: alles goed. De wijziging van 20:11 raakt alleen de klik in het Molenboek.
- Alle namen op het hoogste niveau beginnen met `j20`. Er staat geen filter, blur, `createElement`, `Math.random`, `setTimeout`, `performance.now` of opslag in.
- Schermafdrukken staan in `jaar/1920/kijk/`: 4 sheets en 64 losse beelden.
- `jaar/1920/v1-gemerged.html` is niet van mij. Ik heb het niet aangeraakt.

## De reviewpunten
1. **Lucht.**
   - De twee rechte strepen zijn weg. In de plaats staan 5 cirrusplukjes (staand beeld) of 7 (liggend beeld): kort (hooguit 0,14 W), rafelig, licht gebogen en onder verschillende hoeken. Elk plukje bestaat uit een paar dunne vegen van wisselende dikte, met aan één kant twee vegen die omlaag krullen.
   - De cirrus staat in een eigen atlasje en schuift mee met de wolken. Ik teken hem niet op het luchtplaatje zelf, omdat het nieuwe raamwerk dat plaatje pas na het openen scherp bijtekent.
   - De wolken zijn iCloud-wolken in twee rijen: plat en breed (hoogte/breedte 0,28 tot 0,3), met een lichte top en een koele, platte onderkant. Er zijn geen losse bolletjes meer.
2. **Titel.** Het jaartal staat nu op x 29% en y 16% van P, in het open stuk lucht links van de boom. De tak die door het jaartal liep, loopt nu steiler omhoog en is korter (hoek −2,42 in plaats van −2,7, lengte 0,25 m). Gecontroleerd in 360x640, 400x800 en 1280x800.
3. **Kade.**
   - De kade aan de overkant is nu een smal reepje, net als in 1867: keien van 4,5, een afdekrand van 3 en een walmuur tot het water op 20. Vroeger waren dat 40, 3 en 12 (eenheden in de kadelaag).
   - Daarmee is de verhouding van gevelhoogte tot kadediepte gelijk aan die van 1867, gemeten aan het herenhuis (zelfde ontwerp in beide jaren, 69 tegen 4,2 in 1867).
   - Paard, wagen, arbeider en de stapel zakken staan 24 hoger, tegen de gevel voor de laaddeuren.
   - De meerpalen staan op de kaderand. De tjalk schuift mee, zodat hij even ver onder de kaderand ligt als vroeger.
   - Het eindbeeld zakt 4% van P, zodat de kop van de elevator nu in beeld komt.
4. **Gloed van de scheepslantaarn.** De drie ringen zijn weg. Er is nu één zacht radiaal verloop, één keer voorgetekend in een plaatje van 64 px, en per frame alleen een kopie. De gloed achter de korrel in het donkere eindbeeld van shot 2 gebruikt hetzelfde plaatje.
5. **Bouwtijd en geheugen.** Zie de tabel hieronder. Wat ik heb veranderd:
   - Alle plaatjes zijn op hooguit resolutie 1,5 getekend. De eindbeelden (`env.still`) tekenen dezelfde groepen één keer als vectoren, dus die blijven scherp. De stilstaande tjalk in het eindbeeld is ook vector.
   - `build` maakt alleen de gevel, de kade en één verkleinde kopie van de gevel (0,55).
   - De verte, de brug en de tjalk zijn vectoren. Ze hebben weinig vormen en zijn zo even goedkoop als een plaatje.
   - De boom vooraan is op een dpr-2-scherm altijd vector. Op een scherm met resolutie 1 is hij een plaatje.
   - Shot 2 wordt in stapjes gebouwd: een generator (`j20Bouw2`) doet één stap per frame op het stilstaande eindbeeld van shot 1. Bij de eerste frame van shot 2 wordt de rest meteen gemaakt.
   - Shot 2 heeft geen verkleinde kopieën meer.
   - In de eerste frames doe ik geen voorwerk. Dan kiest het raamwerk de resolutie op het tekenen zelf.
   - Het luchtplaatje is alleen zo hoog als hij in shot 1 ooit in beeld komt.
6. **Dode code.** `j20Licht` is weg.
7. **Eindbeeld shot 2.**
   - De camera zakt nu door de vloer en wijkt iets terug. Het eindbeeld is een doorsnede: bovenin de onderkant van de plansichter, die schudt, met zijn sokken en pijpen; dan de vloer, de walsenstoelen onder de lampen, en onderin de lange as met de riemen.
   - De plansichter is in het eindbeeld de levende laag: hij schudt over het bewaarde beeld heen.
   - Liggend zie je twee plansichters.

## Bouwtijd en geheugen
Gemeten met mijn eigen meetkopie: 400x800, CPU 4x vertraagd, oud en nieuw om en om. Het geheugen telt mijn eigen canvassen.

| | dpr 2 oud | dpr 2 nieuw | dpr 1 oud | dpr 1 nieuw |
|---|---|---|---|---|
| bouw (mediaan) | 320–329 ms | 73 ms | 139 ms | 95 ms |
| canvas na bouw | 19,8 MB | 4,3 MB | 4,7 MB | 2,3 MB |
| canvas na shot 2 | 40,8 MB | 9,9 MB | 10 MB | 4,6 MB |

- Bij "oud" zit het luchtplaatje in de getallen (2,75 MB op dpr 2). In het nieuwe raamwerk is de lucht van het raamwerk zelf en wordt hij pas na het openen scherp bijgetekend.
- Op dpr 1 tekent het raamwerk de lucht al in `build`. Dat is ongeveer 27 ms van de 95.

## Snelheid: fps tegen de stub van het nieuwe raamwerk
Gemeten met `fps-jaar.js`: 400x800, dpr 2, 4x vertraagd, 5 rondes. "Oud" is de stub.

| mediaan fps | licht oud | licht nieuw | donker oud | donker nieuw |
|---|---|---|---|---|
| hoofdShot1 | 55,3 | 55,3 | 55,3 | 54,9 |
| shot1 | 54,3 | **54,0** | 54,7 | **53,8** |
| eind1 | 60 | 60 | 60 | 60 |
| shot2 | 60 | **59,1** | 60 | **59,1** |
| eind2 | 60 | 60 | 60 | 60 |
| duik | 60 | 60 | 60 | 60 |

- **p95:** shot 1 heeft 16,8 tot 33,4 ms (langste frame 67 tot 83 ms), shot 2 16,8 ms.
- **Vergelijking:** shot 1 ligt ongeveer 1 fps (2%) onder hoofdShot1, gelijk met de stub zelf. Wat er nog scheelt, zit in de eerste ongeveer 12 frames op resolutie 2, voordat het raamwerk de resolutie laat zakken.
- **Mijn tekenwerk per frame:** circa 27 ms op resolutie 2 en 8,6 ms na het zakken. Vóór deze ronde was dat circa 40 en 15 ms.
- **Eerste frame bij openen:** 283 tot 417 ms. Dat was 700 tot 800 ms.

## Testen (op de definitieve versie; fps, bouwtijd en de rest in het raamwerk van 19:53)
- **`node --check`:** slaagt op het uitgepakte script, `frame/harness.js`, `jaar/1920/nieuwkomer.js` en `frame/nieuwkomer.js`.
- **harness:** started, gameOver en restarted zijn true op telefoon en desktop, errors `[]`.
- **`frame/nieuwkomer.js` (nieuw, 65 controles):** 65 van 65 goed.
- **`jaar/1920/nieuwkomer.js` (oud, 59 controles):** 58 van 59. Wat faalt: de knop van de hoofdintro heet nu "Terug in de tijd". Dat komt uit het nieuwe raamwerk; de kale stub geeft precies dezelfde fout.
- **Verminderde beweging:** `reduced.js` 33 van 33. Mijn eigen controle laat alleen eindbeelden zien, zonder fouten.
- **`kijk-jaar.js` index 2:** geen fouten. Bekeken: begin, 25, 50 en 75 procent, het eind en de duik, in 360x640 licht, 400x800 donker en 1280x800 licht en donker.
- **Proefmerge:** ik heb `git merge-file -p` gedraaid tegen `frame/korrelval.html`, met de gebieden van 1846, 1867, 1976, 2008 en 2026 in het huidige raamwerk. Dat gaf 0 conflicten, en `node --check` slaagt op elk samengevoegd script. `rook-jaren.js` op de samenvoeging met 1867: "alles goed".

## Teksten (ongewijzigd)
- **Shot 1:** kicker `Noordvliet 1920`
  - cap: "De meelfabriek en de graanpakhuizen staan hoog langs het water. Op de kade wacht een paard met een wagen vol zakken."
  - desc: "Beeld: laag over het water, door kale takken met een paar gele blaadjes, glijd je naar een hoge bakstenen meelfabriek en een nog hoger grijs pakhuis, met een koker schuin omlaag in een tjalk en een paard met een wagen vol zakken op de kade."
- **Shot 2:** kicker `In de meelfabriek 1920`
  - cap: "Boven schudt de plansichter, een zeefkast aan stokken. Eronder malen de walsen. Leren riemen van een lange as drijven ze aan."
  - desc: "Beeld: een houten zeefkast schudt aan stokken onder het plafond; de camera zakt langs houten pijpen door de vloer naar lichte walsenstoelen onder gloeilampen, met leren riemen van een draaiende as eronder, en uit de pijp boven de middelste valt één korrel."
  - De desc past ook bij het nieuwe eindbeeld: de plansichter staat er nog bovenin.

## Oever en kade (gedeeld met 1867)
Het is hetzelfde water als in 1867: de fabriek staat op de noordoever, de camera aan de overkant, de zon laag links en de rook waait naar rechts.

De overkant heeft dezelfde kleuren als in 1867:
- kade van keien `#9C9282` met lichte vlekjes `#B8AE9C`;
- afdekrand `#BDB5A4`;
- bakstenen walmuur `#8C5A44` met voegen `#74493A` en een donkere onderrand `#4F3B30`;
- meerpalen `#5A4632`.

De kade is nu net zo'n smal reepje als in 1867.

Onze oever:
- afdekrand `#C4BCAB`;
- keien `#A39A88`, `#B9B09E` en `#857C6C`;
- een meerpaal met een opgerold touw `#C8B48A`.

Het herenhuis is gepleisterd `#ECE0C8`, met een kroonlijst `#F6EEDF`, een leien dak `#535861` en een halfronde dakkapel. De Oldehove staat er niet in. De avondkleuren komen uit 1867.

## Twijfelpunten
- **fps shot 1:** ongeveer 1 fps onder hoofdShot1. Dat is gelijk met de stub, en het zit in de fase op resolutie 2 die het raamwerk regelt.
- **Eindbeeld shot 2:** dit is nu een doorsnede. De camera wijkt aan het eind iets terug in plaats van naar voren te duwen. De walsenstoelen staan daardoor circa 25% kleiner in beeld dan eerst.
- **Kade:** paard en wagen staan nu tegen de gevel, voor de laaddeur van de fabriek en de deur van het pakhuis. Ze bedekken een deel van de begane grond.
- **Scherpte tijdens de beweging:** op een dpr-2-scherm zijn de plaatjes iets minder scherp (resolutie 1,5). Je ziet dat niet zolang alles beweegt, en de eindbeelden zijn scherp.
- **Wolken:** twee rijen in plaats van drie. Elke wolk kost bouwtijd, en de lege plekken passen bij de late herfst.
- **Raamwerk:** ik heb het werkbestand op het raamwerk van 20:11 gezet. Wijzigt het raamwerk opnieuw, dan telt alleen mijn gebied.
- **Bestaande punten:** de gloeilampen zijn afgeleid, de groene tegels zijn een stijlkeuze, de koker in het ruim is een interpretatie, de riemschijven staan recht van voren, en de knecht is alleen in breedbeeld te zien.
