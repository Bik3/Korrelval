# Fixverslag 8: rustige labels, een Molenboek dat je terugvindt, kloppende teksten

Bestand: korrelval-b.html (aangepast). Eindstand: 2496 regels (wc -l), 182.989 bytes, sha256 53ce066e7f9a96a959bd4a2504ee8caad37bc9826dcd6862739499a1eba7dbd7. Was 2397 regels en 175.145 bytes.

## Opgeslagen versie: zo ga je terug

- korrelval-b.v8.html in de scratchpad is het spel van vóór deze ronde (sha256 8d471ea7…bc27b05a, gelijk aan de eindstand van fixronde 7). Het bestand is alleen-lezen.
- Terug naar hoe het was: `cp korrelval-b.v8.html korrelval-b.html`.
- harness.js is niet veranderd (gelijk aan harness.v6.js).
- De zes verhalen (STORIES) zijn niet veranderd (blok byte voor byte gelijk aan v8).

## Wat de speler vroeg

De teksten tijdens het spelen gingen te snel. Fixronde 7 haalde de leestekst weg en zette er korte labels voor in de plaats. Uit de review bleek dat die labels bij echt sturen nog onrustig waren, en dat je het Molenboek slecht terugvond. Beide punten zijn nu opgelost. Daarnaast zijn de feitelijke en taalpunten in het boek verbeterd.

## 1. Labels springen niet meer en knipperen niet meer (belangrijk)

Oorzaak: de baan van de korrel liep vanaf de huidige korrel-x. Bij elke stuurbeweging zwaaide die baan mee, waardoor het label van kant wisselde of even uitging.

Nieuwe werking (labelBlocks, chooseLabelSpot, placeLabel, updateLabels):
- **De kant wordt één keer gekozen, bij het verschijnen.** Een label staat aan de kant weg van de spleet van de eerstvolgende verdieping onder het ding (nextGapX), en dus niet weg van de korrel. Bij moederkoren is dat de buitenkant van het paar waar het meeste ruimte is over de hele zwaai. Daarna komen de andere kant, onder en boven.
- Een kant waar het ding de muur in drijft, komt achteraan (lblRange: zwaai van het moederkoren, opzij drijven van een steen).
- **Daarna is de baan van de korrel geen reden meer om te wisselen.** Ze telt alleen mee bij het kiezen. Na het kiezen blokkeren alleen nog echte dingen:
  - hard: de korrel, de spleetrechthoeken, andere dingen en hun driehoekje, en de doorgang tussen het moederkoren;
  - zacht: andere labels en de bonusmeters.
- **Raakt de vaste plek bijna iets** (8 px speling), of drijft het label binnen 8 px van de zijrand, dan wordt lb.out op 0 gezet. Het label vaagt dan in 0,25 s weg en komt niet terug. Het springt dus niet naar de andere kant en knippert niet.
- **Raakt het toch echt iets hards**, dan is het meteen weg (lb.on = false). Ook dan komt het niet terug.
- Het label naast het waarschuwingsdriehoekje mag nu tegen de HUD aan schuiven. Daardoor staat "Steen" naast het driehoekje en valt het daarna naast de steen mee, in plaats van eronder tussen steen en korrel.
- lb.why legt vast waarom een label wegging (max, near, fade, hide), voor de zelftest.

Meting: fix8/labels.js, met dezelfde menselijke heen-en-weer muisbeweging als in de review (playtest-7/t9b-human.js). Per frame is onafhankelijk nagerekend dat een zichtbaar label, ook tijdens het wegvagen, nooit over de korrel, een komende spleet of gat, het eigen ding of buiten het veld staat.

| Run (eindversie) | Labels | Kantwissels | Weg en terug | Overlap | Zichtbaar |
|---|---|---|---|---|---|
| Tijdlijn, mens, 400x800 | 9 | 0 | 0 | 0 | 100% |
| Tijdlijn, mens, 360x640 | 9 | 0 | 0 | 0 | 100% |
| Tijdlijn, autopilot, 360x640 | 9 | 0 | 0 | 0 | 100% |
| Nachtploeg, mens, 360x640, 3 partijen | 8 | 0 | 0 | 0 | 100% |

Ter vergelijking, de review vond bij v8-start: Magneet 3 kantwissels en 2 keer weg en terug, Nedertarwe 3 wissels, Water links, rechts, links. In de eindversie verdwenen 34 van de 35 labels netjes door "near" (het ding is bij de korrel) of "max" (2,5 s). Het ene andere, een moederkoren-label in een autopilot-run stond er maar 0,23 s, omdat het paar naar de rand zwaaide. Het kwam daarna niet terug. Eerdere runs met de versie van vlak daarvoor (autopilot 400x800 en Nachtploeg 400x800) gaven ook 0 wissels, 0 keer terug en 0 overlap.

## 2. Molenboek: nieuwe pagina's vind je meteen (belangrijk), plus Toon alle en Spatie (klein)

- **Nieuw sinds de vorige keer.** Een eigen blok bovenaan met de nieuwe pagina's in hun geheel, met een oranje streep erboven.
  - In hun groep staat dan één regel, bijvoorbeeld "2 dingen staan bovenaan, bij Nieuw".
  - Bij openen met nieuwe pagina's staat de kaart bovenaan. Vanuit de pauze met "5 nieuw" staat het blok meteen in beeld (400x800 en 360x640).
- **De nieuw-markering verdwijnt niet meer na een tel.** Nieuwe pagina's tellen pas als gezien als het boek minstens 2,5 s open was (CONFIG.bookSeen).
  - Wie het boek opent en meteen sluit, houdt "5 nieuw" op de knop en ziet het blok de volgende keer weer.
  - Na lezen en sluiten is de telling weg en is het blok verdwenen.
- **Dichte pagina's zijn per groep één regel**: "Nog 6 tijdperken te ontdekken", "Nog 9 dingen te ontdekken", "Nog 8 pagina's te ontdekken". Een nieuwe speler ziet nu een korte kaart van 576 px op 400x800, die niet scrolt.
- **"Toon alle pagina's" staat bovenaan**, direct onder de uitlegregel (151 px vanaf de bovenkant van de kaart). Na een tik sta je bovenaan, bij het eerste verhaal (scrollTop 0), in plaats van midden in de lijst.
- **Spatie bladert in het boek** (85% van de kaarthoogte), ook als Terug de focus heeft. Shift+Spatie bladert terug.
  - Enter, Esc en de knop Terug sluiten het boek.
  - Tab naar "Toon alle pagina's" en dan Spatie werkt nog gewoon als knop.
  - "Over dit spel" zegt nu bij Besturing: "In het Molenboek blader je met spatie."
- **De leesplek blijft bewaard.** Opnieuw openen begint waar je was, zolang er geen pagina's zijn bijgekomen en er niets nieuw is. Getest: 1614 px weg, 1614 px terug.
- Het kopje onder "In de molen" heet nu "Zo werkt de molen".

## 3. Titelkaart past weer (klein)

- Molenboek staat nu in één rij met Scores en Over dit spel: Scores · Molenboek · Over dit spel.
- De tweede regel staat alleen bij een nieuwe speler (save.maxLvl 0) en is ingekort tot "verhalen en uitleg". Wie al gespeeld heeft, ziet alleen "Molenboek", of "Molenboek / 3 nieuw".
- Gemeten in dezelfde opzet als de review (fix8/titlecmp.js):

| Formaat en opslag | v7 | v8-start | nu |
|---|---|---|---|
| 360x640, Verder vanaf | 584/584 | 639/602 scrolt | 584/584 |
| 400x800, alle badges | 713/713 | 771/762 scrolt | 716/716 |
| 1280x800, alle badges | 733/733 | 792/762 scrolt | 733/733, besturingshint weer in beeld |
| 400x800 en 1280x800, alle badges en 1 nieuw | 713 en 733 | scrolt | 716 en 734, past |
| 360x640, alle badges | 680/602 scrolt | 735/602 | 680/602 |

  Het geval 360x640 met alle badges scrolde in v7 al. Het is nu weer precies als v7.

## 4. Nachtploeg: geen labels meer voor wat je al kent (klein)

Bij de start van een Nachtploeg zet startNight in run.seen alle soorten die al in je Molenboek staan, net als bij "Nieuw voor jou". Bij "Nog een korrel?" neemt het ook de run.seen van de vorige partij mee.
- Getest met een boek met steen, bout, boekweit, water, nedertarwe en magneet. In partij 1 kwamen alleen labels voor kiem en moederkoren. In partij 2 kwam alleen nog kroon, die in partij 1 niet voorkwam.
- Met een leeg boek (mens, 3 partijen): partij 1 gaf 7 labels, partij 2 alleen bout, en partij 3 geen enkel label.

## 5. Teksten

Alle teksten uit de bevindingen zijn letterlijk overgenomen:

| Plek | Nu |
|---|---|
| Silo en bulkwagen | Bulkwagen of zakken van 25 kilo via de groothandel. Een bulkwagen heeft cellen van minstens 2 ton, zodat hij in één rit meerdere bakkerijen kan bedienen. Silo's heten naar bloemsoorten die Royal Koopmans aan bakkers levert. |
| Walsenstoel | "In een walsenstoel draaien twee stalen walsen tegen elkaar in. In de eerste walsenstoelen zijn de walsen geribbeld…" Elke volgende staat dichter op elkaar, de laatste zijn bijna glad. |
| Vooruitblik | "Molen B is de nieuwe molen van Royal Koopmans. De nieuwe molens zijn vergaand gedigitaliseerd en melden een storing al voordat die optreedt." Geen datum. |
| Water | "…laat die schoon los van het meelrijke binnenste van de korrel." |
| Bout | "Soms zit er metaal tussen het graan." Speelregel: eerst het oranje driehoekje, en een magneet laat de bouten 6 seconden wegvliegen (CONFIG.magnet.dur). |
| Moederkoren | Speelregel: "Er komen er steeds twee, die langzaam heen en weer drijven." (klopt met spawnHazardSlot). |
| Kiem | "In het spel: pakken, +30 kg bloem. De kiem komt maar zelden voor." |
| Nedertarwe | "Pak je alle Nedertarwe in één molen…" |
| Buil | "een houten zeef met een gat. Elke verdieping levert 10 kg op, midden door 25 kg." |
| Plansichter | "Kijk waar een gat is als jij aankomt. Midden door levert 25 kg op." Punten uit PTS. |
| Rosmolen | "in de eerste molen stuitert een tarwekorrel van een molensteen. Dat is een knipoog naar 1856." |
| Introband | "Plansichter · door het schuivende gat", "+ nog meer onderweg, straks in je Molenboek" en op een computer "Klik of druk op spatie om te beginnen". |
| Uitleg Molenboek | "De verhalen en alles wat je in de molen tegenkomt, staan hier. Een pagina gaat open zodra je iets voor het eerst ziet." |
| Over dit spel | De nieuwe Molenboek-zin is ingekort. De regel over Dr. Oetker staat er nu zonder haakjes en puntkomma. |

Bij Moederkoren staat in de tekst nog "die in de aar groeit". De fixopdracht (fixopdracht.md, regel 12) zegt letterlijk "een giftige schimmel in de aar". Die is leidend, zoals de bevinding zelf toestaat.

Gecontroleerd met een script: in de 34 boekteksten staan geen em-dashes, haakjes of puntkomma's.

## Hoe getest

1. `node --check` op het uitgepakte script (korrelval.extracted.js): geen fouten.
2. `node harness.js korrelval-b.html shots-fix8`: op 400x800 en 1280x800 zijn started, gameOver en restarted allemaal true. De enige fout is het certificaat van Google Fonts (ERR_CERT_AUTHORITY_INVALID), net als in eerdere rondes. Uitvoer staat in shots-fix8.log en shots-fix8/report.json.
3. fix8/labels.js: de labelmeting hierboven. Logs staan in fix8/run-*.log en de details in fix8/labels-*.json.
4. fix8/book.js: **42 van 42 geslaagd.**
   - titelkaart in 12 gevallen;
   - boek vanaf pauze met 5 nieuw, op twee formaten: blok bovenaan, meteen dicht houdt de telling, na lezen telling weg, leesplek bewaard, pauze blijft staan;
   - boek dicht en Toon alle (23 open, bovenaan);
   - op desktop: Spatie, Shift+Spatie, Spatie op Terug, Enter, Esc en leesplek;
   - introteksten op muis en touch;
   - Nachtploeg-labels over twee partijen;
   - geen pagina- of consolefouten.
5. fix8/shots.js: **9 van 9 geslaagd.** Labelschermafbeeldingen, introband molen 1, 3 en Nachtploeg op beide formaten (alles past), en Over dit spel.
6. Schermafbeeldingen in shots-fix8-mine. Deze heb ik bekeken met de Read-tool:
   - intro-L1-400x800-muis, intro-L1-400x800, intro-L1-360x640-touch, intro-L3-360x640;
   - boek-vanaf-pauze-400x800, boek-vanaf-pauze-gescrold-360x640, boek-dicht-400x800, boek-dicht-360x640, boek-alles-begin-360x640, boek-alles-gescrold1/3-400x800, boek-alles-gescrold2-360x640;
   - T-360x640-terug, T-1280x800-veelnieuw;
   - label-steen-waarschuwing-400x800, label-steen-360x640, label-pickup-400x800;
   - over-360x640;
   - shots-fix8/phone-1-title.

   Wat ik zag en heb aangepast:
   - In de groep stond "1 van 6 open" zonder open pagina, omdat die bovenaan bij Nieuw stond. Daarvoor is nu de regel "… staat bovenaan, bij Nieuw".
   - In de eerste labelmeting vaagden labels van pick-ups die onderin binnenkwamen meteen weg, binnen 0,26 s. Oorzaak: de randspeling gold ook verticaal. Die geldt nu alleen opzij.
   - Labels konden bij het kiezen 0 px van de zijrand staan en daarna meteen gaan vagen. Het kiezen gebruikt nu dezelfde speling van 8 px.

## Wat opvalt of niet gedaan

- Op 360x640 scrolt de titelkaart nog met "Verder vanaf", alle zes badges en "Alle vier uitmalingen gezien" (680 tegen 602 px). Dat was in v7 precies zo en is niet erger geworden.
- Een label kan in een zeldzaam druk moment kort te zien zijn (één keer 0,23 s gemeten) en dan rustig wegvagen. Het komt nooit terug of springt nooit.
- Wie "Toon alle pagina's" gebruikt, krijgt in de Nachtploeg geen labels meer, want alles staat dan in het boek. Dat is zoals bedoeld.
- Pauzekaart, weegbon en game-over zijn niet veranderd.
- game/korrelval.html en docs/index.html in de repository heb ik niet bijgewerkt. Ik heb niets in /home/user/Vaultwarden geschreven en geen git-opdrachten uitgevoerd.
