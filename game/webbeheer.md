# Molenvlucht op de website van Royal Koopmans

Dit is een korte uitleg voor de webbeheerder die het spel Molenvlucht op royalkoopmans.com zet. Het spel heette eerst Korrelval. De bestandsnaam (korrelval.html), het adres en de opslag in de browser houden die oude naam; in beeld heet het overal Molenvlucht. Korrelval is nu alleen nog de naam van de minigame aan het eind.

## Wat een bezoeker ziet

Een titelscherm met de knop It giet oan!. Daarna een korte vlucht van buiten de fabriek naar binnen, en dan zes jaren uit de geschiedenis (1846, 1867, 1920, 1976, 2008, 2026). Elk jaar heeft twee beelden waarin twee of drie dingen oplichten. Een tik erop geeft één zin uitleg en een plaatje in het Molenboek. Na elk jaar volgt een kort verhaal. Er zijn geen regels, geen score en geen tijdsdruk. Aan het eind kan de bezoeker de minigame Korrelval spelen.

## Welk bestand

Zet niet game/korrelval.html zelf online, maar de ingepakte versie in docs/index.html. Die maak je opnieuw met het script game/build-pages.sh. Die versie heeft alles wat een losse webpagina nodig heeft. Lever hem uit als HTML met tekenset utf-8. Het bestand is ruim 1,2 MB; met gzip of brotli op de server wordt dat veel kleiner.

Plak de spelcode niet in een bestaande pagina van het CMS. Het spel zet voor de pagina waarin het staat het scrollen uit. Geef het daarom een eigen pagina, en zet die in een iframe.

## Het iframe

Zet het spel op hetzelfde domein als de site, bijvoorbeeld op www.royalkoopmans.com/molenvlucht/. De site stuurt de instelling X-Frame-Options SAMEORIGIN mee, dus een iframe werkt alleen als het spel op hetzelfde domein staat.

Een iframe dat in de test goed werkte: src="/molenvlucht/", title="Molenvlucht, een vlucht door 180 jaar Royal Koopmans", zonder rand, en met allow="clipboard-write" zodat de knop Kopieer link werkt. Het spel past zich aan het iframe aan: staand vanaf 360 bij 640 pixels, liggend bijvoorbeeld 1280 bij 800. Geef het op een gewone pagina minstens 760 pixels hoogte. Zet er een title op, anders weet een schermlezer niet wat het is.

Op een telefoon speelt het spel het prettigst op een eigen pagina. Zet daar een knop "Speel Molenvlucht" neer die het spel opent, in plaats van een iframe in de lopende tekst.

## Voortgang wordt in de browser bewaard

Wat een bezoeker ontdekt (de vinkjes, het Molenboek, de scores van Korrelval en de instellingen) staat in de localStorage van zijn eigen browser, onder de sleutel korrelval-b-v2. Er gaat niets naar een server. Een bezoeker die later terugkomt op hetzelfde apparaat en in dezelfde browser, gaat verder waar hij was. Op een ander apparaat of in een privévenster begint hij opnieuw. Verandert het adres of het domein van het spel, dan is de voortgang van eerdere bezoekers weg.

Een sandbox op het iframe is niet nodig. Wil je er toch een, gebruik dan allow-scripts en allow-same-origin, anders kan het spel niets bewaren. Zonder opslag werkt het spel wel, maar begint iedereen elke keer opnieuw.

## Wat het spel wel en niet doet

Het spel laadt niets van buiten. De lettertypen Nunito en La Belle Aurore zitten in het bestand en vallen onder de SIL Open Font License. Er zijn geen cookies en er is geen tracking. Een cookiebanner is daarom niet nodig. Het geluid staat standaard uit.

Als de site ooit een Content-Security-Policy krijgt, heeft de spelpagina inline scripts en stijlen nodig, lettertypen en afbeeldingen als data, en verder niets van buiten. De pagina waarin het iframe staat, moet frames van hetzelfde domein toestaan.

In een iframe neemt het spel niet zelf de focus van de pagina. Het is met muis, één vinger en alleen het toetsenbord te bedienen, en het houdt rekening met de instelling voor minder beweging. Als het iframe uit beeld is, stopt het spel met tekenen.

## Eén ding om aan te passen

De knop Kopieer link (bij Over dit spel) wijst nu naar de fanpagina op bik3.github.io. Als het spel op de Koopmans-site staat, moet dat het nieuwe adres worden. Dat staat bovenaan het script als SHARE_URL.

## Controleren na een wijziging

In de map game/tests staat eindtest.js. Die test speelt het spel zoals een nieuwe collega (101 controles) en controleert dat er geen fouten zijn, dat er niets van buiten geladen wordt en dat alle kaarten passen. Hoe je hem draait, staat bovenin het bestand.
