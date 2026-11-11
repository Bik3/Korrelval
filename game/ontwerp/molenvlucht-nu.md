# Molenvlucht nu (november 2026)

Dit bestand beschrijft hoe het spel nu werkt en waarom. De andere bestanden in deze map zijn oudere ontwerpdocumenten en beschrijven
eerdere versies (het valspel in elke molen, de minigames per jaar). Ze zijn bewaard als geschiedenis.

## Waarvoor

Nieuwe medewerkers van Royal Koopmans zien in een paar minuten de geschiedenis van het bedrijf. De brand manager gebruikt het spel
daarvoor. Later komt het in een iframe op de site van Koopmans (zie game/webbeheer.md).

## Waarom het zo werkt

De gebruiker vond de vlucht van buiten naar binnen per jaar (de jaarintro's) het leukst. De minigames per jaar vond hij "te raar en
saai", met te veel dingen die niet goed werden uitgelegd. Daarom:

- De jaarintro's zijn het spel. Er zijn geen regels, scores of timers in de tijdlijn.
- Alles legt zichzelf uit: één handeling (tik op een kaartje), één zin per ding.
- Het valspel bestaat nog op één plek: de minigame Korrelval aan het eind, voor wie wil.

## Opbouw

1. Titel: de akker met de fabriek erachter. It giet oan!, Ga verder bij <jaar>, Kies een molen, Korrelval, Molenboek, Scores,
   Instellingen, Over dit spel.
2. Hoofdintro (alleen de eerste keer): drie shots, van buiten de maaltoren in. Daarna terug in de tijd: de tijdsprong rolt van 2026 naar 1846.
3. Per jaar (1846, 1867, 1920, 1976, 2008, 2026):
   - jaarintro met twee shots, buiten en binnen. Aan het eind van de camerabeweging krijgen 2 of 3 dingen een aantekening zoals in
     een schetsboek (28 in totaal): een kleine oranje stip die ademt, een potloodlijntje en een naamkaartje in handschrift. Tot
     ronde 6 stond er een grote gouden ring om elk ding; de gebruiker wilde die weg;
   - een tik op het ding, zijn kaartje of de knop met zijn naam: de close-up (ronde 7). De camera vliegt in 0,7 s naar het ding tot
     het ruim de helft van het beeld boven het paneel vult (1,5x tot 3,2x), het beeld wordt daar opnieuw getekend (scherp) en leeft
     door: het paard loopt, de riem draait, de rook trekt op. De aantekeningen zijn dan weg; in het paneel staan de naam, een gouden
     vinkje (zodra de camera er is) en één zin. Wat beweegt, gaat bij aankomst even harder. Terug (knop, Esc, tik op het beeld) vliegt
     weer uit; daarna staat op het ding een vinkje. De plansichter van 1920 hangt bovenin tegen de rand: daar vliegt de camera terug
     omhoog in het shot. Het ding komt als plaatje in het Molenboek;
   - een verhaalkaart over die tijd, en een tijdsprong naar het volgende jaar: een lijn met zes stippen, of bij de twee
     verhuizingen een getekende kaart (ronde 7, zie hieronder).
4. De slotfilm (ronde 7), na het verhaal van 2026: 180 jaar in één vlucht, circa 20 s. Per jaar 2,9 s van de camerabeweging buiten,
   het jaartal telt in handschrift door, wat je buiten ontdekte licht kort op als oranje stip. Hij eindigt op de fabriek van nu met de
   regel 180 jaar malen. Van één paard tot Molen B. Tik, toets of Overslaan slaat hem over.
5. Slotkaart: Je ontdekte N van 28 dingen (het getal groot in handschrift), per jaar de stand (een jaar waar nog iets ligt
   is een knop naar dat jaar), de knop Speel Korrelval en Bekijk de film opnieuw.
6. Molenboek: een plakboek per jaar. Elk ontdekt ding is een uitsnede van het eindbeeld van zijn shot; wat nog niet gevonden is,
   is een leeg kader. Per jaar het verhaal en Ga naar <jaar> of Bekijk <jaar> opnieuw. Daarna het blad De plekken met de twee kaarten
   (een kaart staat erin zodra je het jaar erna hebt bereikt), de knop Bekijk de film opnieuw (als je de film een keer zag) en
   achterin het blad Wist je dat met tien weetjes.
7. Korrelval: een kaart vooraf, een potje van 75 verdiepingen door Molen B, dan de weegbon (silo gehaald) of de game-over.
   Beide kaarten tonen de kilo's groot, hooguit drie regels en dan de knoppen. Top 5, badges, het meel en de Gezel-modus
   (makkelijk) horen alleen bij Korrelval; Scores en Instellingen zeggen dat erbij.

## De kaarten (ronde 7)

Het bedrijf verhuisde twee keer. Bij die twee tijdsprongen staat er circa 3,8 s een getekende kaart: crème papier, blauwgrijs water,
potloodlijnen, namen in handschrift. De oranje stip reist over een gestippelde lijn van de oude naar de nieuwe plek terwijl het jaartal
doortelt. De ligging is schematisch. De teksten komen uit het onderzoek:

- 1846 naar 1867, van Holwerd naar Leeuwarden: "In Holwerd konden grote schepen niet komen, in Leeuwarden wel." Bron:
  game/onderzoek/koopmans-site.md (tijdlijn 1867 en de weetjes: grote schepen konden Holwerd niet bereiken, daarom de verhuizing) en
  game/onderzoek-royal-koopmans.md (1867: overname van de stoommeelfabriek in Leeuwarden). Dezelfde zin staat in het verhaal van 1867.
- 1920 naar 1976, van het Vliet naar het Nieuwe Kanaal: "In 1976 staat de fabriek aan het Nieuwe Kanaal. Het oudste deel van de
  loskade daar stamde uit 1927." De reden van deze verhuizing staat niet in het onderzoek; daarom alleen wat zeker is. Bron:
  game/onderzoek/koopmans-site.md (historische locaties Holwerd en Noordvliet/Vliet; de fabriek aan het Nieuwe Kanaal, De
  Merodestraat 3) en game/onderzoek-royal-koopmans.md (1927: oudste deel van de loskade aan het Nieuwe Kanaal).

## Techniek in het kort

- Eén bestand, game/korrelval.html, dat begint met <title>. Geen doctype, html, head of body; niets van buiten. De lettertypen
  (Nunito, La Belle Aurore) zitten erin. De naam Molenvlucht staat op één plek bovenaan het script; de bestandsnaam, de
  opslagsleutel (korrelval-b-v2), window.__korrelval en de URL houden de oude naam.
- De jaarintro's zijn op een canvas getekend, elk in een eigen gebied van het script (JAARINTRO <jaar> BEGIN en EIND).
- De plek van elk ding staat in OXP (wereldcoördinaten van zijn jaar). De stip, het lijntje, het kaartje, het tikvlak en het dimmen
  zijn DOM-elementen boven het canvas (CSS-animatie, geen filter). In OXP staat per ding ook: k, de kant waar het kaartje hoort
  (oxKaarten kiest die plek als hij vrij is, anders de dichtstbijzijnde vrije); vlug, hoeveel harder het beeld even loopt bij een
  tik; pb en pbT, het kader en het moment van het plaatje in het Molenboek.
- De close-up (ronde 7): de vlucht zelf is een CSS-transform op het canvas (de compositor vliegt, het canvas tekent het hele beeld
  door). Bij aankomst vervalt de transform en tekent het jaar hetzelfde beeld z keer zo groot en verschoven (jxDrawZoom): env.dpr is
  dan z keer zo groot en elke setTransform krijgt de verschuiving erbij, dus het jaar hoeft er niets voor te weten en alles wat als
  vectoren getekend wordt is scherp. Het bewaarde eindbeeld (env.still) wordt één keer opnieuw gemaakt op die schaal. In OXP staat
  per ding cu: de halve maat van het kader (r), een ander midden (at, c) of een moment in het shot (t). 1976 buiten tekent in de
  close-up zijn voorgetekende lagen opnieuw als vectoren. Alleen de wolkenlucht blijft een opgeschaald plaatje. Verminderde beweging:
  geen vlucht, het beeld vloeit over. Trage telefoon: hooguit 2x.
- De slotfilm tekent op hetzelfde canvas met dezelfde jaren (JX[i].draw), elk met een eigen env. Er leeft één jaar tegelijk plus het
  volgende dat klaarstaat; het volgende wordt gebouwd als de camera stilstaat en wat voorbij is wordt vrijgegeven.
- De kaarten zijn svg (KAARTEN, kaartSvg) en staan in de tijdsprong (#spKaart) en in het Molenboek (#bookPlekken).
- game/build-pages.sh haalt bij het publiceren de commentaarregels en lege regels uit het script (circa 160 kB minder). De bron
  blijft met commentaar.
- Voortgang staat in localStorage, altijd in try/catch. Zonder opslag werkt het spel ook.
- Licht en donker thema, prefers-reduced-motion, 360x640 tot 1280x800, muis, één vinger en toetsenbord.

## Wat er nog van vroeger in zit

In het script staat nog code van het valspel in de tijdlijn (de modus camp, de introband per molen, de korrel-duik aan het eind van
een jaarintro). Die code is niet meer te bereiken voor een speler, maar zit verweven met Korrelval. In ronde 5 is alleen weggehaald
wat aantoonbaar los stond: de achterwanden en pijlers van de oude molens, de weetjes en badgerijen van de oude weegbon, en ongebruikte
CSS. De rest is bewust blijven staan.

## Testen

game/tests/eindtest.js (113 controles): het pad van een nieuwe speler, herladen, 360x640, toetsenbord, verminderde beweging, de
schermen van ronde 5 en de aantekeningen van ronde 6. Hij werkt ook op docs/index.html. Gebruik: NODE_PATH="$(npm root -g)" node game/tests/eindtest.js game/korrelval.html <uitmap>.
