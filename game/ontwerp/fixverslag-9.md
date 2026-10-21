# Fixverslag 9: herstel na de intro-tests

Back-up van de versie hiervoor: /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/korrelval-b.v18.html
Bestand: /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/korrelval-b.html (432.872 bytes)

## Midden: alles gedaan
- **Speel molen 1 via Nachtploeg zonder intro.** Gedaan. #bNbPlay doet nu hetzelfde als It giet oan!.
- **Wie eerder speelde, krijgt geen intro.** Gedaan. `introWanted = () => !save.introSeen`. Iedereen ziet hem één keer, ook de opdrachtgever met oude opslag. Nog een korrel?, Kies een molen en herladen tonen hem niet opnieuw.
- **Melding na Kopieer link onzichtbaar.** Gedaan. .toast heeft z-index 3. Op Over dit spel staat de melding bovenin, want onderaan bedekte hij de link zelf, en die moet je bij een mislukte kopie kunnen selecteren. In de intro staat hij onder het knopje rechtsboven.
- **Shot 3 herhaalt de introband.** Gedaan, met de tekst van tekstcontrole: "Jij bent één van die korrels. Eerst val je terug in de tijd, naar de eerste molen van Koopmans." Er staat geen jaartal meer in.
- **Spookhuizen in shot 2.** Gedaan, met het voorstel van vlucht. De oever blijft dicht en schuift in 0,9 s omlaag uit beeld.
- **Korrel tegen de bovenrand.** Gedaan. `top = cy - 56*u` en de korrel is 15% groter. De koker is nu in beeld.
- **Abrupte vlucht door het raam.** Gedaan:
  - Binnen vlieg je door met Z volgens het voorstel.
  - Onder het verdwijnpunt is het nu donker en niet meer grijs.
  - Er is een kozijn met een oranje vensterbank, dat in elk shot te zien is. Het schuift langs de randen van het beeld.
  - "Binnen" begint pas als de opening binnen het kozijn het beeld vult. De eindzoom is daarop aangepast.
  - Een tussenregel heb ik niet gemaakt. De camera mikt op het midden van het raam, dus die regel zou dwars door het beeld blijven staan en dan ineens verdwijnen.
- **Start van shot 1 hapert.** Gedaan:
  - Shot 1 staat eerst 0,3 s stil (t begint op -0,3).
  - Bij openen wordt fps op nul gezet. Was de titeldemo al te traag, dan opent de intro meteen op resolutie 1.
  - In de intro gaat frameSample in één stap naar 1, en niet via 1,25.
  - Het afgedekte speelveld wordt tijdens de intro niet meer getekend.
- **Schermlezer hoort shot 1 niet.** Gedaan. Elk shot wordt gemeld via announce() (#sr), en aria-live is van #introSay af. Een kale klik telt nu ook als eigen handeling (acted).
- **Focus op Terug in Kies een molen en Instellingen.** Gedaan. Open je ze met het toetsenbord, dan staat de focus op de verste molen of op Gezel-modus.

## Laag
Gedaan:
- Pijltje links gaat naar het eindbeeld van het vorige shot. Tijdens de intro scrollen de pijltjes, PageDown en End de pagina niet meer.
- M in de intro toont "Geluid aan" of "Geluid uit" en zet het windje aan of uit.
- Dubbeltik: de eerste 0,4 s na openen en 350 ms na de sprong naar het eindbeeld telt een tweede Verder niet.
- Het knopje rechtsboven is bijna dicht (.88). De focusring is goud met een donkere band.
- Bij verminderde beweging staat de jaarteller meteen stil.
- Uit beeld in een iframe stopt ook het windje. Weer in beeld begint het opnieuw, zonder meeuw.
- Gezel-modus heeft een vaste naam. Aan of uit zie je aan aria-pressed en de donkere knop.
- Jaartalknoppen: aria-label is "Start bij 1867 Leeuwarden" en bevat zo de zichtbare tekst.
- Stipjes: het actieve stipje heeft --accent-text, de lege stipjes zijn een ring.
- #cv heeft role="img" en is aria-hidden tijdens de intro.
- dprCap van de intro geldt niet meer voor het spel. Na de intro meet het spel opnieuw (introCap).
- introStop geeft de offscreen-canvassen vrij. Wolkensprites worden alleen opnieuw gemaakt bij een andere resolutie of een ander thema.
- Liggende telefoon: de vlucht wacht zolang de melding "Draai je telefoon" in beeld is.
- Shot 1 begint breder en hoger (IBOX[0] = [-640, 720, -980, 200, -700]) en duurt 4,8 s. Eerst zie je stad, kanaal en oever, daarna komt de fabriek dichterbij.
- Graanstipjes zijn rond. In donker zijn ze lichter (#FFF0C9) dan de galerijramen. De zuigbuis is breder en donkerder.
- Teksten:
  - Shot 2 zegt nu "door walsen en zeven".
  - Kies een molen: "Begin bij een molen die je al hebt bereikt."
  - Bij opnieuw bekijken heet het knopje "Menu" (aria-label "Terug naar het menu").
  - De badge zegt "Alle vier gezien".
  - Twee codecommentaren zijn bijgewerkt.

Niet gedaan:
- Kleuren van de schacht terug in de tijd, molenstenen en de korrel die de spleten volgt bij de duik. Dat is geen kleine wijziging. Het raakt de hele binnentekening en de duik, en het risico is groter dan wat het nu oplevert. De jaarteller en de introband maken de overgang al duidelijk.
- Een lichte binnenstreep in de zuigbuis. Breder en donkerder was genoeg.

## Testuitslagen
- node --check op het script: goed. Het bestand begint met `<title>` en bevat geen doctype, html, head of body.
- harness.js (intro-test/herstel-harness): op telefoon en desktop zijn started, gameOver en restarted true, zonder fouten.
- tests/nieuwkomer.js (intro-test/herstel-nieuwkomer): 37 van 37 goed, zonder console-fouten en zonder requests naar buiten.
- Eigen test intro-test/herstel/check.js: 15 van 15 goed. Getest:
  - focus met het toetsenbord in Instellingen en Kies een molen;
  - de vaste Gezel-naam;
  - de melding na Kopieer link staat in beeld;
  - oude opslag (best 480) krijgt de intro;
  - shot 1 wordt via #sr gemeld en #cv is aria-hidden;
  - een dubbeltik blijft op het eindbeeld;
  - pijltje rechts en links;
  - M toont een melding;
  - Esc;
  - Nachtploeg > Speel molen 1 geeft de intro;
  - bij opnieuw bekijken heet het knopje "Menu";
  - geen fouten.
- intro-test/herstel/reduced.js: bij verminderde beweging zijn er alleen eindbeelden en 0 frames, en de laatste knop start molen 1.
- Screenshots bekeken:
  - titelscherm nieuwe speler op 360x640 licht en 400x800 donker;
  - titelscherm met maxLvl 3, Nachtploeg en Gezel op 360x640;
  - Instellingen, Kies een molen en Over dit spel onderaan met de melding;
  - shot 1 tot en met 3, eindbeelden en tussenstanden, op 360x640 licht, 400x800 donker en 1280x800 licht.

  In die screenshots is er geen spookbeeld meer, staat het logo scherp en is de korrel met de koker in beeld. De beelden staan in intro-test/herstel/frames/ (sheet-*.png) en intro-test/herstel/shots/.
- Na de screenshots verbeterd: de melding na Kopieer link stond eerst over de link en staat nu bovenin.
