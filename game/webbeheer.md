# Molenvlucht op de website van Royal Koopmans

Dit is een korte uitleg voor de webbeheerder die het spel Molenvlucht op royalkoopmans.com zet. Het spel heette eerst Korrelval. De bestandsnaam (korrelval.html), het adres en de opslag in de browser houden die oude naam; in beeld heet het overal Molenvlucht. Korrelval is nu alleen nog de naam van de minigame aan het eind.

## Wat een bezoeker ziet

Een titelscherm met de knop It giet oan!. Daarna een korte vlucht van buiten de fabriek naar binnen, en dan zes jaren uit de geschiedenis (1846, 1867, 1920, 1976, 2008, 2026). Elk jaar heeft twee beelden waarin twee of drie dingen oplichten. Een tik erop geeft één zin uitleg en een plaatje in het Molenboek. Na elk jaar volgt een kort verhaal. Er zijn geen regels, geen score en geen tijdsdruk. Aan het eind kan de bezoeker de minigame Korrelval spelen.

Op het titelscherm staat ook de knop Bekijk als film. Dan speelt het hele spel vanzelf, zonder tikken, in circa 7 minuten: handig op een introductiedag of op een scherm bij de receptie (zie hieronder bij De film).

## Welk bestand

Zet niet game/korrelval.html zelf online, maar de ingepakte versie in docs/index.html. Die maak je opnieuw met het script game/build-pages.sh. Die versie heeft alles wat een losse webpagina nodig heeft. Lever hem uit als HTML met tekenset utf-8. Het bestand is circa 1,2 MB; met gzip of brotli op de server wordt dat veel kleiner.

Plak de spelcode niet in een bestaande pagina van het CMS. Het spel zet voor de pagina waarin het staat het scrollen uit. Geef het daarom een eigen pagina, en zet die in een iframe.

## Het iframe

Zet het spel op hetzelfde domein als de site, bijvoorbeeld op www.royalkoopmans.com/molenvlucht/. De site stuurt de instelling X-Frame-Options SAMEORIGIN mee, dus een iframe werkt alleen als het spel op hetzelfde domein staat.

Een iframe dat in de test goed werkte: src="/molenvlucht/", title="Molenvlucht, een vlucht door 180 jaar Royal Koopmans", zonder rand, en met allow="clipboard-write" zodat de knop Kopieer link werkt. Zet er een title op, anders weet een schermlezer niet wat het is.

Op een telefoon speelt het spel het prettigst op een eigen pagina. Zet daar een knop "Speel Molenvlucht" neer die het spel opent, in plaats van een iframe in de lopende tekst.

## Welke maat het iframe mag hebben

Het spel past zich aan het iframe aan. Er zijn drie indelingen, en het kiest zelf welke past:

- Staand (een telefoon rechtop): vanaf 360 bij 640 pixels, bijvoorbeeld 400 bij 800. Het beeld staat boven, de tekst en de knoppen eronder.
- Breed en hoog (een laptop of een groot vak op de pagina): vanaf circa 900 bij 600 pixels, bijvoorbeeld 1280 bij 800. Het beeld vult het hele vak, de tekst staat op een kaart onderin.
- Liggend en laag (een breed, laag vak in de lopende tekst, of een telefoon op zijn kant): lager dan 600 pixels en breder dan hoog. Getest op 960 bij 540, 800 bij 450, 740 bij 360 en 640 bij 360. Het beeld staat links over de volle hoogte, de tekst en de knoppen staan in een kolom rechts. Alle kaarten passen zonder dat er iets wegvalt; alleen het Molenboek en Over dit spel scrollen binnen hun kaart.

De kleinste maat is 360 bij 640 staand en 640 bij 360 liggend. Kleiner werkt nog wel, maar dan wordt de tekst krap. Een vak met de verhouding 16:9 werkt goed: geef het iframe de volle breedte van de kolom en aspect-ratio 16 / 9, met een breedte van minstens 640 pixels. Voor een staand of hoog vak geldt: minstens 640 pixels hoog, liever 760.

Eén uitzondering: de minigame Korrelval is een valspel en speelt staand. In een laag, liggend vak staat het speelveld klein in het midden. Op een telefoon die op zijn kant ligt, vraagt het spel dan om de telefoon rechtop te draaien. Die vraag komt alleen bij Korrelval; de rest van het spel werkt liggend. Wil je dat bezoekers ook Korrelval prettig spelen, kies dan een staand vak of een vak van minstens 600 pixels hoog.

## De film: ?film en ?film&lus

Met de knop Bekijk als film speelt het spel vanzelf: de vlucht van elk jaar, elk ding in close-up met zijn naam en één zin als ondertitel, het begin van elk verhaal, de kaarten van de twee verhuizingen en aan het eind de vlucht door 180 jaar. Dat duurt ruim 7 minuten. De ondertitels staan groot op een donkere band, leesbaar op afstand.

Twee adresregels starten de film zonder dat iemand hoeft te tikken:

- /molenvlucht/?film start de film meteen. Na de laatste kaart blijft die staan, met de knoppen Speel zelf en Nog een keer.
- /molenvlucht/?film&lus start de film meteen en begint 12 seconden na de laatste kaart vanzelf opnieuw. Dat is bedoeld voor een scherm dat de hele dag aan staat.

Dezelfde regels werken in de src van een iframe. Bediening tijdens de film: spatie of een tik is pauze en verder, de pijltjes links en rechts of een veeg zijn vorige en volgende, Esc of het kruisje rechtsboven stopt en gaat naar het titelscherm. De knoppen verdwijnen na 3 seconden zonder beweging.

Goed om te weten:

- De film verandert niets aan de voortgang van een bezoeker. Er wordt niets als ontdekt geteld en er komt niets in het Molenboek.
- Het geluid staat standaard uit. Een browser speelt bovendien pas geluid af nadat iemand het scherm heeft aangeraakt of een toets heeft ingedrukt. Wil je bij een scherm geluid, zet dan één keer Geluid aan bij Instellingen en druk na het starten één keer op een toets.
- Het spel vraagt de browser om het scherm wakker te houden zolang de film speelt. Niet elke browser kan dat. Zet op een scherm bij de receptie daarom ook de schermbeveiliging van het apparaat zelf uit. Staat het spel in een iframe van een ander domein, voeg dan allow="screen-wake-lock" toe; op hetzelfde domein is dat niet nodig.
- Is het iframe uit beeld gescrold, dan wacht de film tot hij weer in beeld is.

## Voortgang wordt in de browser bewaard

Wat een bezoeker ontdekt (de vinkjes, het Molenboek, de scores van Korrelval en de instellingen) staat in de localStorage van zijn eigen browser, onder de sleutel korrelval-b-v2. Er gaat niets naar een server. Een bezoeker die later terugkomt op hetzelfde apparaat en in dezelfde browser, gaat verder waar hij was. Op een ander apparaat of in een privévenster begint hij opnieuw. Verandert het adres of het domein van het spel, dan is de voortgang van eerdere bezoekers weg.

Een sandbox op het iframe is niet nodig. Wil je er toch een, gebruik dan allow-scripts en allow-same-origin, anders kan het spel niets bewaren. Zonder opslag werkt het spel wel, maar begint iedereen elke keer opnieuw.

## Wat het spel wel en niet doet

Het spel laadt niets van buiten. De lettertypen Nunito en La Belle Aurore zitten in het bestand en vallen onder de SIL Open Font License. Er zijn geen cookies en er is geen tracking. Een cookiebanner is daarom niet nodig. Het geluid staat standaard uit.

Als de site ooit een Content-Security-Policy krijgt, heeft de spelpagina inline scripts en stijlen nodig, lettertypen en afbeeldingen als data, en verder niets van buiten. De pagina waarin het iframe staat, moet frames van hetzelfde domein toestaan.

In een iframe neemt het spel niet zelf de focus van de pagina. Met ?film start de film wel vanzelf, maar ook dan pakt het spel de focus niet: de toetsen werken nadat iemand in het vak heeft geklikt. Het is met muis, één vinger en alleen het toetsenbord te bedienen, en het houdt rekening met de instelling voor minder beweging. Als het iframe uit beeld is, stopt het spel met tekenen.

## Eén ding om aan te passen

De knop Kopieer link (bij Over dit spel) wijst nu naar de fanpagina op bik3.github.io. Als het spel op de Koopmans-site staat, moet dat het nieuwe adres worden. Dat staat bovenaan het script als SHARE_URL.

## Controleren na een wijziging

In de map game/tests staat eindtest.js. Die test speelt het spel zoals een nieuwe collega (202 controles) en controleert dat er geen fouten zijn, dat er niets van buiten geladen wordt en dat alle kaarten passen, ook in een liggend vak van 800 bij 450 en 740 bij 360. Hij kijkt ook de film na: starten, vanzelf doorlopen, pauze, volgende, stoppen en de adresregels ?film en ?film&lus. Hoe je hem draait, staat bovenin het bestand.
