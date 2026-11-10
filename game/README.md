# Molenvlucht

Molenvlucht is een browserspel over Royal Koopmans, de meelfabriek in Leeuwarden. Je vliegt door 180 jaar molengeschiedenis, langs de echte tijdlijn van het bedrijf: de rosmolen in Holwerd (1846), de stoommeelfabriek in Leeuwarden (1867), de N.V. (1920), het predicaat Koninklijk (1976), de nieuwe molen (2008) en Molen B in het jubileumjaar 2026.

Bij de start vlieg je in een korte intro van buiten de fabriek aan het Nieuwe Kanaal de maaltoren in, zodat je eerst ziet waar je bent. Daarna gaat het terug in de tijd.

Elk jaar heeft een eigen jaarintro van twee beelden: buiten (de plek, het gebouw, de aanvoer) en binnen (hoe de molen werkte). Aan het eind van elk beeld lichten twee of drie dingen op, zoals het paard, het kamwiel of de tjalk: 28 dingen in totaal. Tik je erop, dan komt het ding naar voren, krijgt het een gouden vinkje en lees je één zin uitleg. Er zijn geen regels en geen score; Verder kan altijd. Na elk jaar volgt een kort verhaal over die tijd en een tijdsprong naar het volgende jaar. Na 2026 zie je op de slotkaart hoeveel je ontdekt hebt. Via Kies een molen ga je direct naar een jaar.

Alles wat je ontdekt, komt als plaatje in het Molenboek, een plakboek per jaar met de verhalen erbij. Wat je nog niet vond, is een leeg kader.

Aan het eind wacht de minigame Korrelval (ook via de knop op het titelscherm): nu ben jij de korrel en val je door Molen B, 75 verdiepingen lang, door de spleet tussen de walsen. Na afloop krijg je een weegbon: de kilo's bloem groot, met hooguit drie regels eronder. Vandaag valt iedereen door dezelfde molen, zodat collega's hun weegbon kunnen vergelijken. Scores, badges en de Gezel-modus (makkelijk) horen alleen bij Korrelval.

Het spel is één bestand: korrelval.html (de bestandsnaam en de link houden de oude naam Korrelval). Het werkt op een laptop (muis of toetsenbord) en op een telefoon (tikken; in Korrelval sleep je met je duim). Het hele spel is met alleen het toetsenbord te doorlopen. Het laadt niets van buiten: de lettertypen zitten in het bestand en alles is in het bestand zelf getekend en gemaakt. Voortgang en scores worden alleen in je eigen browser bewaard.

De speelbare versie staat online op https://bik3.github.io/Korrelval/ (docs/index.html, gemaakt met game/build-pages.sh). Wil je hem zelf hosten, zet het bestand dan in een gewone HTML-pagina met een doctype, head en body eromheen; het bestand begint bewust met alleen een titel.

Het spel is fan-made door een stagiair. Het logo van Royal Koopmans wordt gebruikt met toestemming. Het supermarktmerk Koopmans (bakmixen) is sinds 2000 van Dr. Oetker; dit spel gaat over Royal Koopmans, de meelfabriek die aan bakkers en voedingsindustrie levert.

## Wat er verder in deze map staat

onderzoek-royal-koopmans.md is het bedrijfsprofiel waarop het spel is gebaseerd, met bronnen en een lijst van punten waarover bronnen het niet eens zijn.

De map onderzoek bevat de zes losse onderzoeken (geschiedenis, bedrijf nu, consumentenmerk, identiteit, nieuws, molenproces) met per feit een bron en een betrouwbaarheid, het rapport over de website van Koopmans, en spelmateriaal.json met quizvragen, weetjes en een lijst van claims die het spel bewust vermijdt.

De map tests bevat eindtest.js, een test met 101 controles die het hele pad van een nieuwe speler doorloopt: intro, ontdekken in elk jaar, Molenboek, Kies een molen, Korrelval, toetsenbord, verminderde beweging en de schermen op 360x640 (gebruik: NODE_PATH="$(npm root -g)" node game/tests/eindtest.js game/korrelval.html <uitmap>). nieuwkomer.js hoort bij de oudere versies met het valspel in de tijdlijn. webbeheer.md legt uit hoe het spel op de website van Royal Koopmans komt.

De map ontwerp bevat molenvlucht-nu.md (hoe het spel nu werkt en waarom) en de oudere ontwerpdocumenten: de zes spelconcepten die zijn bedacht, de drie juryrapporten die Korrelval kozen (zo heette het spel toen), de bouwopdracht, de bouwverslagen van de twee onafhankelijke versies, de vergelijking tussen die versies en de test- en tekstrapporten.

korrelval-versie-a.html is de tweede, onafhankelijk gebouwde versie die het in de vergelijking niet haalde. Hij werkt wel en is bewaard voor wie ideeën wil overnemen.
