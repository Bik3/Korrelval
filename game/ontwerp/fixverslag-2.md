# Fixverslag ronde 2: Korrelval versie B

Bestand: korrelval-b.html, in place bewerkt. Back-up van de versie hiervoor: korrelval-b.v2.html.
Resultaat: 1.797 regels en 123.623 bytes (was 1.722 regels en 116.841 bytes). Het bestand begint nog steeds met `<title>` en heeft geen html-, head-, body- of doctype-tag.

Twee wensen van Bikkel:

1. "De informatie over de molen aan het begin van elk level verdwijnt te snel. Laat me het rustig lezen."
2. "Als je vaak doodgaat, vraag dan of het te moeilijk is en stel de Gezel-modus voor."

## 1. De introband wacht op de speler

Wat de speler nu ziet: de band met de jaartalteller, de titel van het tijdperk, de introregel en de regel over de aanvoer blijft staan. Onderin de band staat een goudkleurige strook met "Tik of druk op spatie om te beginnen". Op een touchscherm staat er "Tik om te beginnen". De tekst pulseert zacht. Bij "verminderde beweging" in het besturingssysteem pulseert hij niet, en dan dobbert de korrel ook niet.

Zolang de band wacht, staat de schacht stil en komen er geen verdiepingen, stenen of bonussen bij. De jaartalteller rolt gewoon door. De korrel dobbert zacht onder de stortkoker en knippert met zijn ogen. Het brommen van de molen is te horen.

Je start met een tik of klik op het speelveld, of met spatie, Enter, een pijltje of A/D.

- Een tik binnen 0,3 s na het verschijnen van de band telt niet. Zo slaat een dubbeltik op "It giet oan!" de tekst niet per ongeluk over.
- De starttik stuurt de korrel niet. Ook als je meteen sleept, blijft de korrel staan. Pas een volgende aanraking stuurt.
- Een muisklik verplaatst de korrel niet, en terwijl de band wacht volgt de korrel de muis niet.
- Een pijltje dat het spel start, stuurt zelf niet. Hou je het pijltje ingedrukt, dan stuurt de korrel zodra de toetsherhaling begint. Een ingedrukt gehouden spatie of Enter slaat de band niet over.

Na de start vervaagt de band in 0,35 s en gaat de schacht lopen. In molen 1 verschijnt daarna de uitleg ("Stuur door de spleet ..."), net als eerst.

De band wacht in deze gevallen:

- bij een start vanaf het titelscherm, ook via de jaarknoppen bij "Verder vanaf";
- bij "Volgende molen" op de weegbon;
- bij de Nachtploeg, zowel "Korrel van de dag" als "Vrije dienst", en ook vanuit het jaarverslag.

De band komt niet terug na "Nog een korrel?". Je speelt dan meteen verder, met dezelfde aanloop als eerst. In de Nachtploeg is dat ook zo. Na Verder uit het pauzemenu speel je ook meteen verder. Pauzeer je terwijl de band nog wacht, dan wacht de band na Verder gewoon verder, zonder knipperende korrel.

Aan het oude gedrag zitten de volgende instellingen in CONFIG.intro:

- wait: true. Met false verdwijnt de band weer vanzelf na t of tLong (2,2 of 3,0 s), terwijl de schacht al loopt. Dat heb ik getest.
- fade 0,35 en minWait 0,3.
- below 72: hoeveel pixels de eerste verdieping onder de schermrand begint.
- t en tLong regelen nu alleen nog de teller en het oude gedrag.

### Bewuste keuze: de aanloop na de tik

In de opdracht stond dat de eerste verdieping 0,8 s na de tik bij de korrel moet zijn. Dat kan niet tegelijk met "geen verdiepingen zolang de band wacht". In 0,8 s legt de schacht maar 136 tot 320 pixels af. De eerste verdieping zou dan midden in beeld uit het niets verschijnen.

In de oude versie liep de schacht al tijdens de band. De verdieping kwam dan al omhoog, verscholen onder de band. Voor molen 1 en 2 was de marge na de band trouwens ook 0,8 s (3,8 min 3,0), en niet langer.

Daarom begint de eerste verdieping nu net onder de schermrand. Hij komt zichtbaar omhoog, en nooit eerder dan de oude marge van 0,8 s. De tijd van de tik tot de eerste verdieping bij de korrel:

- 1846: 3,2 s (gemeten: 3,18 s);
- 1867: 2,6 s;
- 1920: 2,2 s;
- 1976: 1,8 s;
- 2008 en de Nachtploeg: 1,5 s;
- Molen B: 1,35 s.

Met Gezel duurt het ongeveer een kwart langer. De langzame eerste molens krijgen dus vanzelf de langste aanloop. In molen 1 staat de uitleg in die tijd in beeld.

Wil Niels of Bikkel het korter? Dan is CONFIG.intro.below kleiner te zetten. Een andere optie is de eerste verdieping al stil onder de band te laten staan terwijl die wacht. Dat heb ik niet gedaan, omdat de opdracht zei: geen verdiepingen tijdens het wachten.

### Opmaak van de band

De band is iets compacter gemaakt, zodat de startstrook erbij past zonder over de korrel te vallen. De band loopt nu van y 80 tot 236, de korrel staat op 252.

Ook zijn de cijfers van de teller iets kleiner: 26 px in plaats van 28 px.

## 2. "Te moeilijk?"

### Wanneer het kader verschijnt

In de tijdlijn telt run.deathsInLevel de game-overs in de huidige molen. De teller gaat omhoog bij elke game-over. Hij gaat op 0 als de molen gehaald is en bij elke nieuwe run. "Nog een korrel?" laat de teller staan.

In de Nachtploeg telt een gewone variabele (nightFails) de partijen met minder dan 15 verdiepingen. Die variabele staat niet in de opslag en verdwijnt na het herladen. Een partij van 15 of meer verdiepingen zet de teller weer op 0. Dat stond niet letterlijk in de opdracht, maar zonder deze regel zou het kader ook verschijnen na drie losse slechte partijen tussen goede door.

Het kader verschijnt als Gezel uit staat en de teller op 3, 6, 9 enzovoort staat. Het staat op de game-over-kaart, boven "Nog een korrel?". Er staat in:

- de kop "Te moeilijk?";
- de tekst "Probeer de Gezel-modus: ruimere spleten en een tragere val. Je kunt hem op het titelscherm weer uitzetten.";
- de knop "Probeer de Gezel-modus".

Het kader heeft dezelfde vorm als "Wist je dat?", maar met een gouden rand en een lichtgouden achtergrond. Ook in de donkere modus is het goed te lezen.

### Wat de knop "Probeer de Gezel-modus" doet

De knop werkt precies zoals de Gezel-knop op het titelscherm. Hij zet save.gezel aan, bewaart dat en werkt de titelknop bij ("Gezel: aan"). Het kader verdwijnt. De huidige molen of de Nachtploeg begint meteen opnieuw, zonder introband en met GEZEL in de HUD.

"Nog een korrel?" werkt gewoon zoals eerst.

### Past op kleine schermen

Op 400×800 past de kaart met het kader zonder te scrollen. Op 360×640 paste de kaart eerst niet: hij was 53 px te hoog.

Daarom kort de game alleen bij het kader de kaart in tot hij past:

- eerst toont de weegbon alleen nog de regel Bloem;
- als dat niet genoeg is, verdwijnt ook de rij met badges.

In de Nachtploeg verdwijnt "Wist je dat?" zodra het kader er staat. De keuze van je drie letters voor de Top 5 blijft staan.

De kaart is gemeten zonder scrollen op 360×640 en 400×800, zowel in de tijdlijn als in de Nachtploeg met lettertjeskiezer.

### Menselijk-badge

run.gezel wordt nu bij de overstap aangezet. Anders zou de tragere val niet werken. Er is een nieuw veld run.gezelFrom: de molen waarvanaf Gezel aanstond.

Menselijk vraagt nu: Gezel aan, de run begon in 1846, en gezelFrom is 0. Wie in molen 2 of later overstapt, krijgt Menselijk dus niet.

Er is één bewuste uitzondering. Wie al in molen 1 (1846) overstapt, krijgt de badge wel. Molen 1 begint dan opnieuw vanaf 0 kg, dus de hele tijdlijn is als Gezel gespeeld. Dat past bij de omschrijving "de hele tijdlijn vanaf 1846 uitgespeeld als Gezel". Wil Niels dit strenger, dan is het één regel in showDone.

### Gezel werkt nu ook in de Nachtploeg

Dit moest wel. Gezel deed in de Nachtploeg niets: params() gebruikte Gezel alleen voor de tijdlijn. De knop "Probeer de Gezel-modus" zou daar dus iets beloven wat niet gebeurt. Nu geldt Gezel ook in de Nachtploeg: de schacht valt 0,8× zo snel en de spleten zijn 1,3× zo breed.

Om de scores eerlijk te houden, krijgt een Gezel-partij in de Top 5 het label "· Gezel". De gedeelde scoreregel krijgt "(Gezel)" erbij.

Gevolg voor wie Gezel al aan had staan: voor hen wordt de Nachtploeg nu ook makkelijker. "Vandaag jouw beste" op het titelscherm maakt geen onderscheid tussen Gezel en gewoon.

## Hoe getest

### Syntaxcontrole

Het script is uitgepakt naar korrelval-b.fix2.js en gecontroleerd met node --check. Dat ging goed na elke reeks wijzigingen.

### De harness

Gedraaid met harness.js korrelval-b.html shots-fix2, ook na de laatste wijziging. Op de telefoon en op de desktop zijn started, gameOver en restarted alle drie true. De enige fout is het certificaat van Google Fonts. De harness hoefde ik niet aan te passen: de eerste tik (telefoon) of het eerste pijltje (desktop) start het spel.

### Eigen test

De eigen test staat in fix2/check2.js. Die gebruikt de echte fonts van een lokale kopie en een geïnstrumenteerde kopie van de pagina. Uitkomst: 40 van de 40 controles geslaagd, met 0 paginafouten en 0 consolefouten. Het logboek staat in fix2/check2.log, de screenshots in shots-fix2-check/.

Telefoon 400×800 met touch:

- "It giet oan!" aangetikt;
- na 4 s staat de band er nog, met "Tik om te beginnen", schacht op 0 en geen verdiepingen;
- pauze en Verder tijdens het wachten: de band wacht nog;
- tik-en-sleep op het veld: het spel start en de korrel blijft op x 200;
- na 1,5 s is de band weg en loopt het spel;
- een volgende sleep stuurt wel;
- drie echte game-overs in molen 1 zonder sturen, met elke keer "Nog een korrel?" (meteen spelen, geen band);
- na de eerste en tweede game-over geen kader, na de derde wel, en de kaart past;
- "Probeer de Gezel-modus": meteen spelen in molen 1, GEZEL in de HUD, val 136 in plaats van 170, Gezel bewaard en titelknop bijgewerkt.

Desktop 1280×800:

- de band wacht;
- muisbewegingen tijdens het wachten sturen niet;
- spatie start het spel;
- een pijltje start zonder te sturen;
- "Volgende molen" laat de band weer wachten (1867);
- Enter start het spel;
- CONFIG.intro.wait op false geeft het oude gedrag terug;
- de Menselijk-regel klopt in vier gevallen: Gezel vanaf de start, overstap in molen 1, overstap in molen 2 en nooit Gezel.

Kleine schermen, 360×640 en 400×800:

- game-over met het kader past, en de knop is 44 px hoog;
- de Nachtploeg wacht bij de start;
- het kader verschijnt pas bij de derde korte partij;
- "Wist je dat?" verdwijnt dan, en de kaart met lettertjeskiezer past;
- na de Gezel-knop draait de Nachtploeg met schacht 288 in plaats van 360;
- een partij van 15 of meer verdiepingen zet de teller op 0;
- Scores toont "· Gezel".

Donkere modus met verminderde beweging (fix2/dark.js): de intro van 1920 en de game-over-kaart met het kader zien er goed uit, zonder fouten.

### Screenshots bekeken

Ik heb deze screenshots met de Read-tool bekeken:

- de wachtende intro op de telefoon (A1) en op de desktop (D1);
- het spel na de tik (A2) en na spatie (D2);
- de derde game-over met het kader (B3);
- het Gezel-spel met het HUD-label (C1);
- molen 2 die wacht (D4);
- de kaart op 360×640 in de tijdlijn (E2) en in de Nachtploeg (E4);
- de Nachtploeg-intro op 360×640 (E3);
- de Nachtploeg met Gezel (E5);
- de donkere modus (F1 en F2);
- de shots van de harness.

Wat ik zag en heb verbeterd: de kaart op 360×640 was 53 px te hoog. Ik heb de inkorting toegevoegd die hierboven staat.

## Wat niet gedaan is, of waar je op moet letten

- De 0,8 s na de tik is niet letterlijk overgenomen. Waarom staat hierboven bij "Bewuste keuze".
- Oudere testscripts gaan uit van een band die vanzelf verdwijnt: fix1/check.js en de scripts in playtest-b. Die scripts wachten op Wd.t, en Wd.t blijft nu op 0 tot iemand tikt. Ze moeten eerst een tik of spatie sturen. Een andere optie is CONFIG.intro.wait op false te zetten. harness.js werkt zonder aanpassing.
- De teller van de Nachtploeg verdwijnt na herladen. Dat is zo bedoeld: hij staat niet in de opslag.
- De Gezel-uitbreiding voor de Nachtploeg en het label "Gezel" in de scores vroeg de opdracht niet letterlijk. Ze zijn nodig om de knop eerlijk te houden.
- Niet getest op een echt toestel. De touch-tests liepen via Chromium met nagebootste aanrakingen.
