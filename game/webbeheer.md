# Korrelval op de website van Royal Koopmans

Dit is een korte uitleg voor de webbeheerder die Korrelval op royalkoopmans.com zet.

## Welk bestand

Zet niet game/korrelval.html zelf online, maar de ingepakte versie in docs/index.html. Die maak je opnieuw met het script game/build-pages.sh. Die versie heeft alles wat een losse webpagina nodig heeft. Lever hem uit als HTML met tekenset utf-8.

Plak de spelcode niet in een bestaande pagina van het CMS. Het spel zet voor de pagina waarin het staat het scrollen uit. Geef het daarom een eigen pagina, of zet het in een iframe.

## Waar en hoe

Zet het spel op hetzelfde domein als de site, bijvoorbeeld op www.royalkoopmans.com/korrelval/. De site stuurt de instelling X-Frame-Options SAMEORIGIN mee, dus een iframe werkt alleen als het spel op hetzelfde domein staat.

Een iframe dat in de test goed werkte: src="/korrelval/", title="Korrelval, een spel over de meelfabriek", breedte 360 tot 400 pixels, hoogte 800 pixels (minimaal ongeveer 760), zonder rand, en met allow="clipboard-write" zodat de kopieerknoppen werken. Zet er een title op, anders weet een schermlezer niet wat het is. Een sandbox is niet nodig. Wil je er toch een, gebruik dan allow-scripts en allow-same-origin, anders onthoudt het spel geen scores.

Op een telefoon vult een iframe van 800 pixels het hele scherm. Een knop "Speel Korrelval" die het spel op een eigen pagina opent, speelt daar prettiger.

## Wat het spel wel en niet doet

Het spel laadt niets van buiten. De lettertypen Nunito en La Belle Aurore zitten in het bestand en vallen onder de SIL Open Font License. Er zijn geen cookies en er is geen tracking. Scores en voortgang staan alleen in de browser van de bezoeker. Een cookiebanner is daarom niet nodig.

Als de site ooit een Content-Security-Policy krijgt, heeft de spelpagina inline scripts en stijlen nodig, lettertypen en afbeeldingen als data, en verder niets van buiten. De pagina waarin het iframe staat, moet frames van hetzelfde domein toestaan.

In een iframe neemt het spel niet zelf de focus van de pagina. Het scrolt de pagina niet mee tijdens het spelen. Als het iframe uit beeld is, pauzeert het spel en stopt het met tekenen.

## Eén ding om aan te passen

De deelknop in het spel wijst nu naar de fanpagina op bik3.github.io. Als het spel op de Koopmans-site staat, moet dat het nieuwe adres worden. Dat staat bovenaan het script als SHARE_URL.

## Controleren na een wijziging

In de map game/tests staat nieuwkomer.js. Die test speelt het spel zoals een nieuwe collega en controleert dat er geen fouten zijn, dat er niets van buiten geladen wordt en dat alle kaarten passen. Hoe je hem draait, staat bovenin het bestand.
