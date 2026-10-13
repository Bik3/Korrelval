# Fixverslag 7: geen leestekst meer tijdens het spelen, uitleg op eigen tempo, het Molenboek

Bestand: korrelval-b.html (aangepast). Eindstand: 2397 regels (wc -l), 175.145 bytes, sha256 8d471ea748b03415b47657ed9e5184edc64bf16d89cfd57f606124f0bc27b05a. Was 2023 regels en 146.978 bytes.

## Opgeslagen versie: zo ga je terug

- korrelval-b.v7.html in de scratchpad is het spel van vóór deze ronde (sha256 24a9ae7d…f9039c, gelijk aan de eindstand van fixronde 6). Het bestand is alleen-lezen.
- Terug naar hoe het was: `cp korrelval-b.v7.html korrelval-b.html`.
- harness.js is niet veranderd (gelijk aan harness.v6.js).

## Wat de speler vroeg

Stagiair Bikkel: de teksten tijdens het spelen, zoals "Reiniging: stenen en metaal mogen nooit tussen de molenstenen.", gaan veel te snel. Mijn oplossing heeft drie delen. Tijdens het spelen staat er geen leestekst meer, alleen een kort label. De uitleg staat in de introband, die wacht tot je tikt. En alles staat in een Molenboek dat je op je eigen tempo leest.

## A. Tijdens het spelen geen leestekst meer

Weggehaald:
- De reinigingstip bij de eerste steen, de moederkoren-tip en de silo-tip.
- De 1856-grap als tekst. De korrel die van de derde molensteen stuitert, is gebleven.
- Alle pick-up-tips (PICK_TIPS).
- De kilo-mijlpalen (CONFIG.milestones en run.ms).
- De tutorialregels in molen 1 (drawTutorial en tutorialOn).
- Het hele tipsysteem: tip(), drawTip() en het veld Wd.tip bestaan niet meer.
- De zin "Zakgoed: 25 kg, via de groothandel." bij de silolanding stond niet in de lijst. Het was wel een zin tijdens het spelen, dus die is nu "Zakgoed +50". "Order geladen! +250" is gebleven.

Gebleven: de zwevende puntgetallen, het waarschuwingsdriehoekje en de toast bij M. De badge in de Nachtploeg is nu een kort zwevend label "Gepassioneerd!".

Nieuw zijn de korte labels. De eerste keer per run dat een soort in beeld komt, staat er een klein donker pilletje naast:

| Soort | Label | Randje |
|---|---|---|
| Steen | Steen | rood |
| Bout | Bout | rood |
| Moederkoren | Moederkoren | rood |
| Boekweit | Boekweit +5 | goud |
| Water | Water: trager | goud |
| Nedertarwe | Nedertarwe +20 | goud |
| Magneet | Magneet +50 | goud |
| Kroon | Kroon +100 | goud |
| Kiem | Kiem +30 | goud |

De punten komen uit CONFIG.pts. Zo werkt een label:
- Bij een steen of bout begint het label al bij het waarschuwingsdriehoekje. Dat is het eerste wat je ziet, en het driehoekje staat 1 s stil. Daarna gaat het label mee met de vallende steen.
- Het label beweegt mee met het ding.
- Het vaagt weg zodra het ding binnen 56 px van de korrel komt, of na hooguit 2,5 s. Is het ding weg (gepakt, opgevangen, weggehaald door de magneet of de verhaalpauze), dan verdwijnt het label meteen.
- Het label kiest zelf een plek naast het ding. Eerst de vorige plek, zodat het niet springt. Dan de kant weg van de korrel (bij moederkoren de buitenkant van het paar), dan de andere kant, eronder en erboven.
- Een plek valt af als het label iets afdekt: de korrel, een spleet die eraan komt, de baan van de korrel naar de volgende spleten (lijnstukken zo breed als de korrel), de doorgang tussen het moederkorenpaar, andere dingen en hun driehoekje, een ander label of de bonusmeters links.
- Is er geen vrije plek, dan is het label meteen onzichtbaar. Het komt terug zodra er weer ruimte is. Het label mag over de muur hangen, maar niet buiten het veld.
- Instellingen staan in CONFIG.label: { max: 2.5, fadeIn: 0.15, fadeOut: 0.25, near: 56 }.

## B. Uitleg op eigen tempo in de introband

De bovenste band (jaarteller, titel, intro) is gebleven, maar zonder de startvraag. Onder de korrel, op de stilstaande schacht, staat nu een tweede paneel. Het begint op y 278. De korrel zit dus vrij tussen de twee panelen.
- "Nieuw in deze molen": per nieuw soort een getekend icoontje met naam en wat je doet, bijvoorbeeld "Steen · ontwijken" in lichtrood, "Boekweit · pakken +5" in goud en "Walsenstoel · door de spleet".
- Wat nieuw is, rekent het spel uit LEVELS uit: machines, gevaren, pick-ups en de silo die in geen eerdere molen voorkwamen. Het zijn hooguit vier regels, gekozen op belangrijkheid. Bij meer staat er "+ meer in het Molenboek".
  - Molen 1: Molenstenen, Steen, Boekweit, Gouden silo (mik erop +250), plus meer (Buil, Kiem). De silo staat erbij omdat de silo-tip weg is.
  - Molen 2: Bout, Water.
  - Molen 3: Walsenstoel, Plansichter, Nedertarwe.
  - Molen 4: Magneet, Kroon.
  - Molen 5: Moederkoren.
  - Molen 6: volgens LEVELS komt er geen nieuw ding bij, wel de vooruitblik. Daarom staat er "Oranje kader · hier komt de spleet".
- Nachtploeg: volgens LEVELS is daar niets nieuw. Daarom staat er "Nieuw voor jou": de soorten uit de Nachtploeg die nog niet in jouw Molenboek staan. Dat is mijn eigen invulling.
- In molen 1 staat er ook "Zo speel je: Stuur door de spleet. Midden door is perfect." met de juiste hint. Op touch is dat "Sleep met je duim, waar dan ook.", met toetsen "Pijltjes, A/D of de muis."
- Daaronder komt de pulserende startvraag "Tik om te beginnen". Die staat nu onderaan het paneel, dus na het lezen.
- Alles past op 400x800 en 360x640. Het paneel eindigt bij molen 1 op y 548 van 720, en het canvas schaalt mee.

## C. Het Molenboek

Het Molenboek is een nieuw scherm 'boek' in de stijl van de weegbon. Bovenaan staan de kicker "Op je eigen tempo", de kop "Molenboek" en één regel uitleg. Daaronder komen twee delen:
- **Tijdperken**: de zes STORIES met jaar (in handschrift), kop, tekst en het kleine tijdperkplaatje van de verhaalkaart.
- **In de molen**: twee groepen. "Dingen in de schacht" met 9 pagina's en "De molen" met 8: Rosmolen, Molenstenen, Buil, Walsenstoel, Plansichter, Silo en bulkwagen, Vooruitblik en Nachtploeg. Elke pagina heeft een getekend icoontje, een naam, de uitleg en een regel "In het spel: …".

Hoe het werkt:
- Het boek scrollt binnen de kaart. De Terug-knop plakt onderin en blijft altijd in beeld (getest op 30, 62 en 100% scroll).
- Een pagina gaat open zodra je hem tegenkomt:
  - een verhaal zodra de verhaalpauze getoond is (openStory);
  - een ding zodra het voor het eerst in beeld komt, op hetzelfde moment als het label;
  - een machine zodra je een molen start waarin hij voorkomt (startLevel), de Rosmolen bij molen 1;
  - Nachtploeg na je eerste Nachtploeg (gameOver).
- Een dichte pagina toont alleen de naam (bij een verhaal "jaar · molennaam") met "Nog niet ontdekt" en een vraagteken-icoon.
- Onderaan staat de link "Toon alle pagina's". Die zet alles open, slaat dat op en zet geen nieuw-markeringen. Daarna verdwijnt de link.
- Opslag gaat in de bestaande save (SAVE_KEY ongewijzigd): save.book en save.bookNew, in try/catch via persist().
  - Oude opslag zonder deze velden laadt gewoon.
  - Kapotte velden (een array of string) worden lege lijsten. loadSave controleert nu ook badges, labels en daily op dezelfde manier.
- Nieuwe pagina's krijgen een oranje markering "nieuw" tot je het boek opent. De knoppen tonen het aantal als tweede regel, bijvoorbeeld "Molenboek / 7 nieuw".

Knoppen naar het boek:
- Titelscherm: een eigen rij onder Scores en Over dit spel, met de tweede regel "verhalen en uitleg, op je eigen tempo". Voor een nieuwe speler past de titelkaart zonder scrollen: 526 px op 360x640 (was 471) en 601 px op 400x800.
- Pauzekaart: een eigen rij.
- Weegbon: naast Menu. Past zonder scrollen op 360x640 (538 px).
- Game-over: tussen Kopieer score en Menu. Past zonder scrollen op 360x640 (545 px).
- Terug (of Esc) gaat naar het scherm waar je vandaan kwam. Vanuit pauze blijft het spel gepauzeerd: Wd.t veranderde niet.

Verder:
- De verhaalkaart heeft de regel "Dit verhaal staat nu in je Molenboek." en past nog zonder scrollen op 360x640 (387 px).
- "Over dit spel" heeft één zin erbij: "Alles wat je onderweg tegenkomt, van verhaal tot walsenstoel, komt in je Molenboek, zodat je het daarna op je eigen tempo kunt nalezen."

## Feitencontrole van de concepttekst

Ik heb elke zin nagelopen tegen de bronbestanden (alleen high en medium). De punten in de teksten komen uit CONFIG. Wat ik heb aangepast:

| Pagina | Aanpassing en reden |
|---|---|
| Steen | "komen mee van de akker", "zeven en steenuitlezers" en "tussen de molenstenen" staan niet in de bronnen. Nu staat er: tussen het graan zitten soms stenen. De reiniging haalt ze eruit, samen met kaf en stof, want stenen en metaal mogen nooit op de walsen komen (molenproces, high). |
| Bout | "of spijker" is "of ander metaal" geworden. Dat magneten metaal eruit halen, staat er letterlijk (high). |
| Moederkoren | Overgenomen volgens de opdracht als "giftige schimmel". Let op: research-molenproces noemt moederkoren een "giftig onkruidzaad (ergot)". |
| Water | Klopt (12 tot 48 uur, zemel taai, laat schoon los; high). "Even trager" is concreet gemaakt: 3 seconden (CONFIG.slowmo.dur). |
| Nedertarwe | "baktarwe" is "tarwe" geworden. "Een betere prijs" is "20 euro per ton extra" geworden (identiteit, high). |
| Magneet | "Een paar seconden" is "6 seconden" geworden (CONFIG.magnet.dur). |
| Kiem | "Het kleine levende deel" staat niet in de bronnen. Nu staat er: gemiddeld maar 2,5 procent van de korrel (high). De olie maakt meel bij lang bewaren ranzig (high). |
| Molenstenen | "Draaien op elkaar" en "zo ging het tot de walsen kwamen" staan niet in de bronnen. Nu staat er: in een korenmolen gaat het graan in één keer tussen twee molenstenen door, en alle delen worden samen gemalen. Een meelfabriek maalt met walsen, in veel kleine stappen (high en medium). |
| Buil | Klopt. Toegevoegd: in 1846 ging Uilke boekweit builen en malen (high). |
| Walsenstoel | "Breken de korrel open" is "breken de zemel van de korrel los" geworden. "Twintig keer langs een walsenstoel" is "passeert soms wel twintig walsenstoelen" geworden (high). |
| Silo en bulkwagen | "Vakken" is "cellen" geworden, net als in de bron en op de weegbon. "Via de groothandel" is erbij gekomen (high). De productnamen staan er zonder rangorde. |
| Rosmolen, Kroon, Plansichter, Nachtploeg, Boekweit | Klopt zoals het er stond (high). |
| Vooruitblik (extra) | Nieuwe pagina, omdat het oranje kader van Molen B anders nergens uitgelegd wordt: "vergaand gedigitaliseerd, met voorspellende storingssignalering" (nieuws, medium). Er staat geen datum bij Molen B. |

In de nieuwe teksten staan geen em-dashes, geen haakjes en geen puntkomma's (gecontroleerd met grep). Er staan geen namen van huidige medewerkers in, en geen stofexplosies of Cambuur.

## Hoe getest

1. Script uitgepakt naar korrelval.extracted.js en gecontroleerd met `node --check`. Geen fouten in de eindversie.
2. `node harness.js korrelval-b.html shots-fix7` op de eindversie. Op 400x800 en 1280x800 zijn started, gameOver en restarted allemaal true. De enige fout is het certificaat van Google Fonts (ERR_CERT_AUTHORITY_INVALID). harness.js is niet aangepast.
3. Eigen Playwright-scripts in fix7/ (lib.js is de fix6-opzet, met extra testhaken op window.__kvDbg).
   - fix7/notips.js: **18 van 18 geslaagd.**
     - Opzet: molen 1 t/m 6 en de Nachtploeg op de autopilot (window.__kvAuto, window.__kvTest). Een haak op CanvasRenderingContext2D.fillText legt elke tekst vast die tijdens 'play' na de introband op het speelveld wordt getekend.
     - Per molen: Wd.tip bleef leeg (undefined) en er werd geen tipzin getekend. Alle getekende teksten zijn HUD, silonamen, labels, getallen of "Order geladen! +250" en "Gepassioneerd!". Geen tekst van 4+ woorden of met een punt aan het eind.
     - Per frame zijn de labels onafhankelijk nagerekend: nooit over de korrel, een komende spleet of gat, of buiten het veld. Er waren 0 overtredingen.
     - Langste labeltijd 2,48 s. Alle negen soorten kregen een label.
     - Labels waren gemiddeld 97% van hun tijd zichtbaar. Eén Nedertarwe-label in Molen B maar 32%, omdat de omgeving vol was.
   - fix7/shots.js: **37 van 37 geslaagd.** Getest:
     - de labelschermafbeeldingen;
     - de introband van molen 1, 3, 5 en de Nachtploeg op 400x800 en 360x640, steeds passend;
     - titelkaart, Molenboek dicht, Toon alle pagina's (23 van 23 open, opgeslagen, geen nieuw-markering), scrollen met Terug in beeld en terug naar de titel;
     - verhaalkaart, weegbon en game-over op 360x640, passend en met de nieuw-telling;
     - Esc uit het boek terug naar de weegbon;
     - pauze, boek en Terug: het spel blijft gepauzeerd;
     - donker thema;
     - oude en kapotte opslag;
     - geen pagina- of consolefouten.
4. Schermafbeeldingen in shots-fix7-mine, allemaal bekeken met de Read-tool:
   - label-steen-400x800.png, label-steen-360x640.png, label-steen-waarschuwing-400x800.png, label-pickup-400x800.png (Kiem +30), label-pickup-360x640.png (Boekweit +5);
   - intro-L1/L3/L5/nacht op beide formaten;
   - boek-dicht, boek-alles-begin en boek-alles-gescrold1-3 op beide formaten;
   - titel-nieuw-360x640.png, weegbon-L1-360x640.png, gameover-360x640.png, verhaal-L1-360x640.png, boek-vanaf-weegbon-360x640.png, pauze-400x800.png en boek-donker-400x800.png.

   Wat ik zag en heb opgelost:
   - Dichte verhaalpagina's liepen over drie regels, omdat ze in de smalle eerste kolom stonden. Ze staan nu op één regel.
   - De "In het spel"-regels waren vet oranje en te zwaar. Nu is alleen "In het spel:" vet, de rest is rustig grijs.
   - De eerste steen-schermafbeelding liet de steen nog half onder de HUD zien. Die is opnieuw gemaakt met de steen duidelijk in beeld.

## Wat opvalt of niet gedaan

- Een label komt één keer per run. In de tijdlijn is "Nog een korrel?" dezelfde run, dus daarna komen er geen labels opnieuw. In de Nachtploeg is elke partij een nieuwe run, dus daar komen de labels steeds terug.
- Een label verdwijnt liever dan dat het iets afdekt. In drukke stukken, vooral in Molen B, is een label daardoor soms korter te zien.
- De introregels zelf zijn niet veranderd. In molen 4 staat in de band "Reiniging: stenen en metaal mogen nooit op de walsen." Dat staat op het wachtscherm, dus je leest het op je eigen tempo.
- De machines gaan open bij de start van een molen, dus ook als je daarna meteen naar het menu gaat. Dat is volgens de opdracht ("zodra je in een molen speelt").
- Het jaarverslag heeft geen Molenboek-knop. Dat stond niet in de opdracht.
- game/korrelval.html en docs/index.html in de repository heb ik niet bijgewerkt. Ik heb geen git-opdrachten uitgevoerd.
