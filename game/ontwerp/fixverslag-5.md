# Fixverslag 5: combo's uit beeld en een verhaal halverwege elke molen

Bestand: korrelval-b.html (aangepast). Eindstand: 1989 regels (wc -l), 143.719 bytes. Was 1891 regels en 134.315 bytes.

## Opgeslagen versie: zo ga je terug

Voor ik iets veranderde, heb ik het spel opgeslagen zoals het was:
- korrelval-b.v5.html: precies het spel van vóór deze ronde (md5 457864762b9be11836a60c858991b87e). Het bestand is alleen-lezen gemaakt, zodat het niet per ongeluk wordt overschreven.
- harness.v5.js: de testharness van vóór deze ronde (ook alleen-lezen).
- In de repository staat dezelfde stand al als game/versies/korrelval-v1-voor-verhalen.html (zelfde md5). game/korrelval.html is ook nog die oude stand: daar heb ik niets aan veranderd.

Terug naar hoe het was: `cp korrelval-b.v5.html korrelval-b.html` en `cp harness.v5.js harness.js` in de scratchpad. In de repository staat het terugzetten in game/versies/README.md.

## Taak A: combo's uit beeld (gedaan)

Tijdens het spelen staat er nu geen combo-informatie meer in beeld:
- Het combovak rechts (getal, "COMBO", ×n) is weg uit drawSide(). Links staan alleen nog de pick-ups (water, magneet).
- De banner "Tsjoch!" met de Prémax-naam is weg: drawBanner(), Wd.banner en de timer ervan zijn verwijderd.
- Het rang-geluid (SFX.rank) is weg.
- De puntenvermenigvuldiger is weg (mult(), CONFIG.comboStep en CONFIG.multMax). Elke verdieping levert vast 10 kg op, met de bestaande bonus voor een perfecte passage (+25 bij walsen en molenstenen, +15 bij buil en plansichter). Het zwevende "+35"-tekstje blijft, want dat is gewoon de score.
- Het perfect-plinkje en het knak-effect blijven. Het plinkje heeft nu een vaste toonhoogte: het liep eerst op met de combo.
- Een Nedertarwe-korrel telt niet meer mee in de reeks, want het is geen verdieping.

Wat ervoor in de plaats komt (alleen na de molen):
- De reeks heet nu run.streak, en de langste reeks run.bestStreak. Hij telt stil mee: elke verdieping zonder botsing telt, ook een verdieping met een steen of moederkoren die je ontwijkt. Een botsing zet hem op 0.
- Op de weegbon staat de regel "Langste reeks zonder botsing" met de langste reeks in die molen. Op het jaarverslag en het game-over-scherm staat dezelfde regel met de langste reeks van de hele run.
- De Prémax-rangen zijn helemaal uit de tijdlijn gehaald: CONFIG.ranks, RANKS, run.rank en de regels "Beste combo · Fluessen" op de bon. Ik heb ervoor gekozen om ook de rangnaam niet op de weegbon te zetten, want zonder combo betekent die naam niets meer.
- De weegbon heeft als kop "Tsjoch! Order geladen" (of "Tsjoch! In de silo" als de korrel in een andere silo viel). Tsjoch! staat in het handschriftfont, in goud.
- Uitzondering: de Nachtploeg-HUD noemde de zone per tien verdiepingen naar dezelfde Prémax-namen. Die namen staan nu in NIGHT.zones, zodat de Nachtploeg-HUD gewoon werkt (Slotermeer tot Bonkevaart). Dat is geen combo-informatie: het hangt af van de verdieping waar je bent.
- Deelregel (Kopieer score): "combo Fluessen" is vervangen door "langste reeks 14 verdiepingen zonder botsing". Voorbeeld: "Korrelval, van 1920 tot 2026: 1.465 kg bloem, goed voor circa 2.640 broden, langste reeks 14 verdiepingen zonder botsing, Short patent, 100% perfect · speel mee: https://bik3.github.io/Korrelval/".
- Over dit spel: de zin over combo-rangen is weg. Er staan nu drie korte alinea's: hoe je punten krijgt (per verdieping, extra als je midden door de spleet valt, en bonussen voor pick-ups, de gouden silo, korrels die je overhoudt en precisie, plus de langste reeks na de molen), dat het spel halverwege elke molen stilstaat voor een verhaal, en dat de Nachtploeg-zones naar Prémax-mixen heten.
- Opslag: de opgeslagen gegevens hadden geen combovelden. De opslagsleutel is niet veranderd, dus scores, badges en uitmalingen blijven bewaard. Badges hingen niet van de combo af.
- Weegbon op kleine telefoons: de extra regel maakte de bon iets langer. Bij een schermhoogte onder 700 px valt daarom de regel "Zakken van 25 kg" van de weegbon weg (die staat ook op het jaarverslag), en de regels staan iets dichter op elkaar. Nu past de weegbon op 360x640 vaker dan in v5. Alleen bij 1920, met alle vier badges, scrolt hij nog 10 px; in v5 was dat 17 px.

## Taak B: verhaalpauze halverwege elke molen (gedaan)

- STORIES staat direct onder FACTS, met de zes verhalen letterlijk zoals aangeleverd (lvl 0 tot 5). Ik heb ze vergeleken door ze uit het script te halen en ze af te drukken.
- CONFIG.story = { on: true, at: 0.5, minWait: 0.6, inv: 1.2, safe: 1.5 }. De eerste drie waarden zijn zoals gevraagd. inv is hoe lang de korrel na Verder malen onkwetsbaar is (minstens 1,0 s gevraagd, ik heb 1,2 s gekozen). safe is het venster na Verder malen waarin geen steen of moederkoren mag aankomen.
- Alleen in de tijdlijn (run.mode 'camp'), niet in de Nachtploeg en niet in de titeldemo. Eén keer per molen per run: run.storySeen. Na "Nog een korrel?" in dezelfde molen komt het verhaal niet terug. Bij Volgende molen komt het verhaal van die molen wel. Een nieuwe run (titel of jaarknop) toont de verhalen opnieuw.
- Moment: direct nadat de korrel de verdieping ceil(floors × 0,5) passeert (6, 8, 10, 12, 14, 16). De volgende verdieping is dan nog een heel interval weg. Is die verdieping op de helft een steen of moederkoren in plaats van een echte verdieping, dan komt het verhaal na de eerstvolgende echte verdieping. Het verhaal wacht ook een verdieping bij een botsing (of net daarna, zolang de korrel knippert), tijdens de introband, bij de silo en als het spel al op pauze staat. Om dezelfde reden wacht het als de korrel op die verdieping net de wand raakte. De check gebeurt aan het eind van update(), als alle botsingen van die stap bekend zijn.
- Eerlijk verder: komt er binnen 1,7 s na de pauze een steen of moederkoren aan, dan haalt de reiniging die tijdens het verhaal weg (clearForStory). Dat gebeurt alleen bij molen 3 tot 6, waar de verdiepingen elkaar snel opvolgen. Een paar moederkoren gaat altijd samen weg. De verdiepingen zelf blijven staan. Na Verder malen knippert de korrel 1,2 s lang onkwetsbaar, staat hij stil tot je weer stuurt (geen restsnelheid, geen oude muispositie) en loopt de duim-sleep niet door.
- Scherm: een nieuw overlayscherm 'story' (#scrStory), in dezelfde kaartstijl als de weegbon en de pauzekaart. Het veld staat gedimd en stil erachter. Op de kaart staan het label "HALVERWEGE · 1846" (enzovoort), de kop met rechts een klein tijdperkplaatje, de tekst, de slotregel in het handschriftfont en de knop "Verder malen". Op een laptop staat er nog "Spatie of Enter: verder malen." onder. Het plaatje is de bestaande drawEraVignette op een eigen klein canvas. De functie tekent nu op een meegegeven context en standaard nog steeds op het speelveld. Het tegeltje is donker, dus het past bij beide thema's. Het beweegt (paard, stoom, kraan), behalve bij verminderde beweging.
- Doorgaan kan alleen met de knop, Spatie of Enter, en pas na 0,6 s. Een tik op het gedimde veld doet niets. P, Esc, blur en een verborgen tab laten de kaart staan. Esc stuurde op andere kaarten naar het menu; op de verhaalkaart doet Esc bewust niets, zodat je je run niet kwijtraakt.
- Testhaak: window.__korrelval.state() geeft nu ook streak, bestStreak en inv, en een object story met on, open, seen (molens met getoond verhaal), at (verdieping op de helft), shownAt (verdieping waarna het verhaal kwam), skipped (uitgestelde verdiepingen met reden), cleared (weggehaalde gevaren), ready (Verder malen werkt), since (seconden sinds Verder malen) en hitsAfter. hitsAfter telt elke aanraking met een verdieping of gevaar in de eerste 1,5 s na Verder malen, ook als de korrel dan onkwetsbaar is. Het veld combo uit de oude state() is weg.

## Hoe getest

1. Het script uit korrelval-b.html uitgepakt naar korrelval.extracted.js en gecontroleerd met `node --check`: geen fouten.
2. `node harness.js korrelval-b.html shots-fix5`: op 400x800 en 1280x800 zijn started, gameOver en restarted alle drie true. De enige fout is het certificaat van Google Fonts. Ik heb harness.js wel minimaal aangepast. In één run bleef de korrel op de laptop lang genoeg heel om de verhaalkaart te halen. Daarna wachtte de harness 40 s op een game-over die niet kwam (gameOver false). Nu klikt de harness in zijn wachtlus op een zichtbare knop "Verder malen" (drie regels). Daarna drie keer gedraaid: alle keren true.
3. Eigen Playwright-script fix5/check5.js, met lokale fonts en de autopilot (__kvAuto). Schermafbeeldingen staan in shots-fix5-mine. Uitkomst: 70 van 70 checks geslaagd, zonder pagina- of consolefouten.
   - Verhaalkaart van molen 1, 3 en 6 op 400x800, 360x640 en 1280x800, en molen 6 op 360x640 in donker thema. Geen enkele kaart scrolt: de langste is 454 px hoog op de laptop. Alle zes verhalen passen op 360x640, gemeten tijdens één doorloop van de hele tijdlijn (hoogste kaart 404 px, ruimte 608 px).
   - Alle zes molens achter elkaar met de autopilot (360x640). In de laatste run kwam het verhaal na verdieping 6, 8, 11, 12, 14 en 16 (helft: 6, 8, 10, 12, 14, 16). In molen 3 was verdieping 10 een steen, dus kwam het verhaal na de eerstvolgende echte verdieping. Bij molen 3 was verdieping 12 ook een steen. Die haalde de reiniging tijdens het verhaal weg (cleared 1), dus lag de volgende echte verdieping twee intervallen weg. Bij de andere molens lag de volgende verdieping precies een interval weg (2,0 tot 1,0 s), en er kwam geen gevaar binnen 1,5 s. In de eerste 1,5 s na Verder malen waren er 0 aanrakingen.
   - Extra stresstest (fix5/stress.js): 36 runs, 6 per molen. Elke run kreeg een verhaal, en geen run had een aanraking in de eerste 1,5 s. In 6 runs (molen 3 en 5) haalde de reiniging een steen of moederkoren weg.
   - Invoer: de knop en Spatie binnen 0,6 s doen niets. Een tik op het gedimde veld, P, Esc, blur en een verborgen tab laten de kaart staan. De wereld staat stil (camY en tijd veranderen niet). Daarna gaan Enter, Spatie en de knop allemaal verder, met 1,2 s knipperende onkwetsbaarheid.
   - Tijdens het spelen bij 7 op rij (molen 3): rechts van de schacht staat niets meer (play-streak-L3-400x800.png).
   - Weegbon: "Tsjoch! Order geladen" met "Langste reeks zonder botsing 12" (molen 1, 360x640) en 19 (molen 3, 400x800). Op het game-over-scherm stond 8. Jaarverslag met "Langste reeks zonder botsing 14", en de deelregel zonder het woord combo.
   - Game-over na een echte botsing na het verhaal: daarna "Nog een korrel?" en de hele molen uitgespeeld tot de weegbon. Het verhaal kwam niet terug. De volgende molen (1867) toonde wel zijn eigen verhaal.
   - Nachtploeg (vrije dienst) tot verdieping 45: geen verhaal, en de HUD toont "Bonkevaart".
   - Over dit spel: het woord combo komt niet meer voor, wel de nieuwe zinnen over punten, de langste reeks en het verhaal.
4. Alle schermafbeeldingen heb ik bekeken. Wat ik zag en heb opgelost:
   - De tekst liep eerst om het plaatje heen. Daardoor stond er een rafelige korte regel naast het plaatje. Nu staan de kop en het plaatje naast elkaar, en de tekst staat eronder over de hele breedte.
   - De tekst en de slotregel plakten tegen de kop. Mijn `margin:0` overschreef de kaartafstand; dat is opgelost.
   - "Tsjoch!" stond zonder echte spatie in de tekst (alleen visuele marge). Een schermlezer las daardoor "Tsjoch!Order". Nu staat er een gewone spatie.
   - De weegbon scrolde op 360x640 met vier badges: zie het punt over kleine telefoons bij taak A.
   - Wat op 1846 op een waarschuwingsdriehoekje leek, bleek een boekweit-pick-up (driehoekig zaadje).

## Wat opvalt of niet gedaan

- De reeks telt verdiepingen met een steen of moederkoren ook mee. Daardoor kan de langste reeks hoger zijn dan het aantal gemeten passages in de precisiezin: bijvoorbeeld 20 tegenover "17 van 17 perfect" in molen 3, die 20 verdiepingen heeft waarvan 3 met een steen.
- Een tip die al liep (bijvoorbeeld "1856: de rosmolen bleek niet geschikt voor tarwe.") staat gedimd achter de verhaalkaart en loopt na Verder malen gewoon af.
- In molen 1 en 2 mag de eerstvolgende verdieping na het verhaal een steen zijn. Die komt dan pas na 2,0 of 1,8 s aan, met het gewone waarschuwingsdriehoekje, dus buiten het venster van 1,5 s.
- Op de weegbon bij 1920 met alle vier badges scrolt de kaart op 360x640 nog 10 px (dat was 17 px). De knop Volgende molen blijft in beeld.
- game/korrelval.html en docs/index.html in de repository heb ik niet bijgewerkt. Daar staat nog de oude versie, net als in game/versies.
- Geen git-opdrachten uitgevoerd.
