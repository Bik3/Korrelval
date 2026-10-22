# Verslag UI-bouwer, mooimaakronde

Werkbestand: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/ui/korrelval.html` (450 kB, was 433 kB). Ik heb alleen CSS, schermmarkup en DOM-code aangepast. Geen teksten veranderd, geen canvas-code aangeraakt.

## Wat ik veranderde

### CSS-tokens (`:root` en de twee donkere blokken)
- Kleuren uit de huisstijl:
  - `--accent-hover` #D07C01 (donker #DB8812) en `--accent-press` #C47501 (donker #C77A06);
  - `--ui-glow` (gloed van de tijdlijnstip) en `--ui-fill` (vulling van Verder malen);
  - `--ui-edge` en `--ui-edge-hover` (rand van de holle knop);
  - `--ui-mustard` #C5AA20 en `--ui-brown` #4A3200 (5,2:1 op mosterd);
  - `--ui-paper`, `--ui-paper-shadow` en `--ui-stamp`.
- Eigen tekeningen als data-URI, gemaakt met `ui/svg.js`:
  - `--ui-grain`: korenaarpatroon als lijntekening met parallellogram-blaadjes (zoals `icon('aar')`), licht 6 procent, donker 4,5 procent;
  - `--ui-aar`: crème aar;
  - `--ui-quote` en `--ui-pen`: aanhalingsteken en potloodstreep, als masker zodat de kleur uit de CSS komt.

### CSS-blokken
- **`.card`**
  - Korenaarpatroon met `background-attachment: local`, zodat het meeschuift in scrollende kaarten.
  - Binnenkomst `uiIn`: fade en 8 px omhoog in 0,2 s. De gouden bovenrand blijft.
  - Het intro-paneel krijgt alleen `uiFade`, omdat `introLayout` zijn bovenkant meet.
- **`.btn`**
  - Hoofdletters, 13,5 px, letterafstand .07em, hol met mosterdgouden rand. Hover: chip en een donkerdere rand.
  - `.btn.primary` en `.btn.go`: oranje met donkere tekst en 17 px. Hover #D07C01; ingedrukt #C47501 en 2 px omlaag.
  - Contrast minstens 4,7:1 in elke staat, in licht en donker. Tikvlak minstens 44 px.
  - `.btn small` blijft in kleine letters.
- **`.title .logo` en `.ui-pen`**: getekende potloodstreep in goud. Op de titel trekt hij zich in 0,55 s (`uiPen`); onder Kies een molen en Molenboek staat hij stil.
- **`.title .ui-voet`**: mosterdgouden voetstrook tot de kaartranden, donkerbruine tekst en een crème aar. Er zijn geen knoppen of regels bij gekomen.
- **`.chips`**: Kies een molen als tijdlijn.
  - Een lijn met oranje stippen met gloed.
  - Het jaartal in handschrift (30 px) en de korte naam in kleine kapitalen.
  - Elke rij is als geheel de knop (48 px).
- **`.ui-kick`**: het jaartal groot in handschrift (36 px) in de kicker: Halverwege 1846 en Jaarverslag 2026.
- **`.story-slot::before`**: een groot mosterdgouden aanhalingsteken voor de slotzin.
- **`.story #bStory[aria-disabled]`**: Verder malen is geen vale knop meer.
  - Wachttijd: crème met een oranje rand. De knop vult zich als een voortgangsbalk (`uiVul`); de duur `--ui-wait` is gelijk aan `CONFIG.story.minWait`.
  - De tekst blijft `var(--ink)`, minstens 6:1. Daarna is het een gewone oranje knop.
  - Bij verminderde beweging: alleen de rand, zonder vulling.
  - `storyReady` en `syncStoryBtn` zijn niet veranderd.
- **`.ui-bon` en `.bon`**: een bon van papier.
  - Kartelrand boven en onder (masker) en een schaduwrandje.
  - `tabular-nums`. Die werkte eerst niet, omdat hij vóór de `font`-afkorting stond.
  - Een streep boven Totaal (`#lvBon`). De bon schuift 9 px de kaartmarge in, zodat de tekst even breed blijft als eerst.
- **`.tsjoch`**: een stempel met dubbele rand. `.stamp` en `.tsjoch` komen zacht neer (`uiStempel`, 0,34 s). Tsjoch! komt na 0,9 s, als het totaal is opgeteld.
- **`.page .jaar`**: de jaartallen in het Molenboek staan nu echt in handschrift (27 px). Eerst zette `.page p` er Nunito overheen.
- **`.toast`**
  - Donker kaartje met een oranje streep links, een schaduw en hooguit 360 px breed. Het komt zacht binnen (`uiToast`).
  - Bij weegbon, game-over, jaarverslag en Scores staat het bovenin (`uiToastTop`), zodat het de knoppen niet afdekt.
- **Intro**
  - `.intro-dots`: tijdlijnstippen op een lijn, oranje; de huidige stip heeft een gloed.
  - `.intro-skip`: in hoofdletters.
- **`.story-art`**: dun randje.
- **Media queries**
  - `max-height: 700px`: de bon wordt iets platter. Op het jaarverslag komt er iets minder marge tussen blokken, en alleen bij blokken die al marge hadden.
  - `max-height: 480px`: `#scrOver .ui-bon` verdwijnt, in plaats van `#overBon`.
  - `prefers-reduced-motion`: geen binnenkomst, stempel, potloodstreep, beweging van de melding of vulling.

### Markup
- Titel: `<p class="fine ui-voet">`.
- `h2.ui-pen` bij Kies een molen en bij Molenboek.
- Verhaalkaart: de kicker krijgt `class="kicker ui-kick"`.
- Weegbon, game-over en jaarverslag: de bontabel staat in `<div class="ui-bon">`.
- Jaarverslag: `Jaarverslag <span class="hand">2026</span>`. De tekst is gelijk gebleven.

### DOM-code
- `openStory`: één regel vervangen. De kicker wordt `Halverwege <span class="hand">jaar</span>` (was "Halverwege · jaar").
- `levelComplete`: één regel erbij: `uiTel(...)` op het totaal.
- `openPick`: het jaartal staat nu in `<span class="hand">`.
- Bij de knopkoppelingen: `$('bStory').style.setProperty('--ui-wait', ...)`.
- Nieuwe functie `uiTel`, direct na `streakRow`:
  - het totaal telt in 0,7 s op, vanaf de stand vóór deze molen;
  - bij verminderde beweging staat er meteen het eindgetal;
  - het tellende getal is aria-hidden en het eindgetal staat in een `.sr`-kopie.

## Nieuwe namen
- JS: `uiTel`.
- Klassen: `ui-voet`, `ui-pen`, `ui-kick`, `ui-bon`.
- CSS-variabelen: `--accent-hover`, `--accent-press`, `--ui-glow`, `--ui-fill`, `--ui-edge`, `--ui-edge-hover`, `--ui-mustard`, `--ui-brown`, `--ui-paper`, `--ui-paper-shadow`, `--ui-stamp`, `--ui-grain`, `--ui-aar`, `--ui-quote`, `--ui-pen` en `--ui-wait`.
- Keyframes: `uiIn`, `uiFade`, `uiPen`, `uiStempel`, `uiVul`, `uiToast`, `uiToastTop`.

## Testkopie
Niets veranderd. De tests lezen `textContent`, en `text-transform` verandert dat niet. `ui/nieuwkomer.js` is gelijk aan `game/tests/nieuwkomer.js`.

## Testuitslag
- **harness.js**: op telefoon en desktop zijn started, gameOver en restarted true, zonder errors. Het bestand begint met `<title>` en heeft geen doctype, html, head of body.
- **nieuwkomer.js**: 37 van 37.
- **Eigen controles** (scripts in `ui/`):
  - `toetsen.js`, 16 van 16: Enter, spatie en Esc, de focusring, spatie tijdens de wachttijd telt niet, en daarna een gewone oranje knop.
  - `rustig.js`: verminderde beweging werkt.
  - `meet-verhaal.js`: alle zes verhaalkaarten passen, op 360x640 hooguit 436 van 602 px.
  - `extra.js`: titel met Gezel-modus, dienstbriefje op slot, Te moeilijk? en de Nachtploeg met Top 5.
  - `perf.js` en `perf2.js` (400x800, CPU 4x, 18 metingen per versie):
    - de intro haalt 52 tot 60 fps (oud) en 53 tot 60 fps (nieuw);
    - de titeldemo 47 tot 55 fps (oud) tegen 48 tot 54 fps (nieuw), dus binnen de ruis;
    - stijl en layout kosten samen minder dan 1 ms per 3 s.
- **Passen zonder scrollen**: nergens horizontaal scrollen.
  - Titel op 360x640: 381 px bij lege opslag, 439 met volle opslag en 448 met Gezel-modus aan, van 602 px.
  - Titel op 400x800: hooguit 496 van 762 px.
  - Intro op 360x640: het paneel past en er is 441 px beeld boven het paneel.
  - Jaarverslag op 360x640: 588 van 602 px (was 597).
- **Proef-samenvoeging** (`git merge-file`) met de huidige tussenstand van de spel- en intro-kopie: 0 conflicten, en de syntax is goed.

## Screenshots
- Voor: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/ui/voor`
- Na: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/ui/na`
- Beide gemaakt met hetzelfde script (`kijk-ui.js`) op 360x640 licht, 400x800 donker en 1280x800 licht.
- Detailopnamen: `ui/detail1`, `ui/staten`, `ui/extra` en `ui/rustig`.

## Regels buiten mijn gebied
Geen. `openStory` en `levelComplete` bevatten ook spellogica. Daarin heb ik alleen de kicker-regel vervangen en één regel toegevoegd.

## Aandachtspunten
- Chrome geeft de hoofdletters van `text-transform` door aan de schermlezer ("IT GIET OAN!"), net als bij de bestaande kickers. Sommige schermlezers spellen korte woorden in hoofdletters.
- De game-over van de Nachtploeg met Top 5-letters en Wist je dat? scrolt op 360x640 (688 tegen 602 px). Dat was al zo (eerst 701) en heb ik niet opgelost.
