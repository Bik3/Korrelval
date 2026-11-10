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
- Alles legt zichzelf uit: één handeling (tik op wat oplicht), één zin per ding.
- Het valspel bestaat nog op één plek: de minigame Korrelval aan het eind, voor wie wil.

## Opbouw

1. Titel: de akker met de fabriek erachter. It giet oan!, Ga verder bij <jaar>, Kies een molen, Korrelval, Molenboek, Scores,
   Instellingen, Over dit spel.
2. Hoofdintro (alleen de eerste keer): drie shots, van buiten de maaltoren in. Daarna terug in de tijd.
3. Per jaar (1846, 1867, 1920, 1976, 2008, 2026):
   - jaarintro met twee shots, buiten en binnen. Aan het eind van de camerabeweging lichten 2 of 3 dingen op (28 in totaal);
   - een tik op een ding (of op de knop met zijn naam): het komt naar voren, krijgt een gouden vinkje, de naam staat in handschrift
     en er staat één zin. Het ding komt als plaatje in het Molenboek;
   - een verhaalkaart over die tijd, en een tijdsprong (een lijn met zes stippen) naar het volgende jaar.
4. Slotkaart na 2026: Je ontdekte N van 28 dingen, per jaar de stand, en de knop Speel Korrelval.
5. Molenboek: een plakboek per jaar. Elk ontdekt ding is een uitsnede van het eindbeeld van zijn shot; wat nog niet gevonden is,
   is een leeg kader. Per jaar het verhaal en Ga naar <jaar> of Bekijk <jaar> opnieuw.
6. Korrelval: een kaart vooraf, een potje van 75 verdiepingen door Molen B, dan de weegbon (silo gehaald) of de game-over.
   Beide kaarten tonen de kilo's groot, hooguit drie regels en dan de knoppen. Top 5, badges, het meel en de Gezel-modus
   (makkelijk) horen alleen bij Korrelval; Scores en Instellingen zeggen dat erbij.

## Techniek in het kort

- Eén bestand, game/korrelval.html, dat begint met <title>. Geen doctype, html, head of body; niets van buiten. De lettertypen
  (Nunito, La Belle Aurore) zitten erin. De naam Molenvlucht staat op één plek bovenaan het script; de bestandsnaam, de
  opslagsleutel (korrelval-b-v2), window.__korrelval en de URL houden de oude naam.
- De jaarintro's zijn op een canvas getekend, elk in een eigen gebied van het script (JAARINTRO <jaar> BEGIN en EIND).
- De plek van elk ding staat in OXP (wereldcoördinaten van zijn jaar). De gloed, het tikvlak en het dimmen zijn DOM-elementen boven
  het canvas. Het veld pb in OXP stelt alleen het kader van het plaatje in het Molenboek bij (opzij, omlaag, breder).
- Voortgang staat in localStorage, altijd in try/catch. Zonder opslag werkt het spel ook.
- Licht en donker thema, prefers-reduced-motion, 360x640 tot 1280x800, muis, één vinger en toetsenbord.

## Wat er nog van vroeger in zit

In het script staat nog code van het valspel in de tijdlijn (de modus camp, de introband per molen, de korrel-duik aan het eind van
een jaarintro). Die code is niet meer te bereiken voor een speler, maar zit verweven met Korrelval. In ronde 5 is alleen weggehaald
wat aantoonbaar los stond: de achterwanden en pijlers van de oude molens, de weetjes en badgerijen van de oude weegbon, en ongebruikte
CSS. De rest is bewust blijven staan.

## Testen

game/tests/eindtest.js (101 controles): het pad van een nieuwe speler, herladen, 360x640, toetsenbord, verminderde beweging en de
schermen van ronde 5. Gebruik: NODE_PATH="$(npm root -g)" node game/tests/eindtest.js game/korrelval.html <uitmap>.
