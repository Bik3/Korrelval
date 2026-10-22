# Fixverslag UI (herstelronde na de reviews)

Werkbestand: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/fix/ui/korrelval.html`

Alle wijzigingen zitten in `<style>`, op één JS-regel na (zie "Buiten mijn gebied").

Controles staan in `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/fix/ui/check/`:
- scripts: `*.js` en `*.py`;
- beelden en logboeken: `out/`. De vergelijkingen heten `out/cmp-*.png`.

"Voor" is `fix/base.html` en "na" is mijn werkbestand. Ik heb alle beelden met Read bekeken.

## Per punt

### Art 13 en techniek 4: hoofdletters en de schermlezer
**Wat ik deed**
- Bij `.btn` en `.tsjoch` heb ik `text-transform:uppercase` vervangen door `font-variant-caps:all-small-caps`.
- Chrome tekent kleine kapitalen op 0,7 keer de lettergrootte (gemeten: 1,43). Daarom zijn de maten aangepast:
  - de letters zijn 1/0,7 keer zo groot: `.btn` 19,3 px, `.btn.primary` 24,3 px, Kopieer link 17,1 px, Tsjoch 0,86em;
  - de regelhoogte is 0,8;
  - de letter- en woordafstand zijn zo gemeten dat elke knoptekst even breed is als eerst. Voorbeelden: "Korrel van de dag" 159,1 tegen 162,4 px, "Vrije dienst" 100,4 tegen 100,9 px.
- Kleine kapitalen staan lager in hun regel. Dat vang ik op met de padding:
  - gewone knop 5/7;
  - hoofdknop 3/9;
  - knop met tweede regel 4/6, met de kleine regel op 5 px.
- "It giet oan!" staat in gewone letters, vet, 21 px. Dat geldt voor `#bStart` en voor `#bIntroNext.ui-fries` in shot 3.

**Gemeten**
- Inktpositie (`inkt.py`, `kolom.py`): binnen 0,5 tot 1 px van "voor", op dpr 1, 2 en 3. De knophoogtes zijn gelijk.
- Schermlezernamen (`namen.js`, `out/namen.log`): van 9 namen in hoofdletters naar 0 bij de knoppen. Nu staat er bijvoorbeeld "It giet oan!", "Verder malen", "Volgende molen: 1867", "Menu" en de kop "Tsjoch! Order geladen".
- Beelden: `cmp-titel-*`, `cmp-weegbon-*` en `cmp-intro3-paneel-*`. Ze zien er hetzelfde uit; alleen It giet oan! staat nu in gewone letters.

**Niet gedaan**: `.kicker` (onder meer de introkoppen "WAAR JE BENT" en "NAAR BINNEN") staat nog in hoofdletters. Dat viel buiten de beslissing.

### Art 6: Overslaan rechtsboven
**Wat ik deed**
- "Overslaan" staat in gewone letters: 13 px, vet, zonder letterafstand.
- De zichtbare pil is 87 x 34 px (was 119 x 44).
- De knop zelf blijft 44 px hoog als tikvlak. De pil is zijn `::before`. Zo blijft de controle van nieuwkomer.js gelden (hoogte minstens 44 px); met een pil van 34 px op de knop zelf zakte die naar 36 van 37.
- Hover (alleen met een muis) en de focusring zitten op de pil.

**Waarom dekking .64 en niet .55**
- Gemeten boven de lichtste lucht in alle shots (`skip.js`): bij .55 haalt de witte tekst circa 3,6:1, bij .62 4,44:1.
- Bij .64 is het 4,77:1 (licht) en 5,3 tot 10,6:1 (donker). Eerst was het 10,8:1 bij .88.

**Beelden**: `cmp-intro1-hoek-*` en `cmp-skip-staten.png` (rust, hover, focus).

### Art 7: voetstrook van de titel
- Licht: nog steeds mosterd, maar padding 7 px en letter 12 px (was 9 en 12,5). Daardoor is de kaart 5 tot 6 px lager.
- Donker: gedempt, `--gold-soft` met `--gold-ink` (7,2:1), en de aar in mosterd.
- Hiervoor heb ik nieuwe tokens gemaakt: `--ui-voet`, `--ui-voet-ink` en `--ui-voet-aar`. De aar is nu een masker, zodat de kleur uit de CSS komt.
- Beeld: `cmp-titel-dark.png`. De strook is niet meer het helderste vlak.

### Art 9: hover op touch
**Wat ik deed**: alle `:hover`-regels staan in `@media (hover:hover) and (pointer:fine)`, op hun eigen plek, zodat de volgorde in de cascade gelijk blijft. Het gaat om:
- `.btn`, `.btn.primary` en `.btn.go`;
- `.chips .btn` met `::before`;
- `.links .linkbtn`;
- `.btn[aria-disabled]`;
- `.intro-skip`.

**Gemeten (`hover.js`)**
- Telefoon, na een tik op Verder: de knop blijft #E78A01. Eerst bleef hij hangen op #D07C01.
- Laptop met muis: hover werkt nog. It giet oan! wordt #D07C01, en de holle knop krijgt chip en rand #7A6500.

### Art 11: KORREL VAN DE DAG op één regel
**Wat ik deed**: `.brief .row>.btn.go{flex-basis:8.7em}`. De hoofdkeuze krijgt meer ruimte. Bij heel grote systeemletters loopt de rij nog steeds over.

**Gemeten (`brief.js`)**: aantal regels voor Korrel van de dag.

| Breedte | Voor | Na |
|---|---|---|
| 320 px | 2 | 2 (mag) |
| 360 px | 2 | 1 |
| 375 px | 1 | 1 |
| 390 px | 2 | 1 |
| 400 px | 2 | 1 |
| 412 px | 2 | 1 |
| 1280 px | 2 | 1 |

Vrije dienst staat overal op één regel, ook op 320 px.

**Beeld**: `cmp-brief-knoppen.png`.

### Art 12 en techniek 6: rand van de holle knoppen
**Wat ik deed**
- Licht thema: `--ui-edge` is #9E881A en `--ui-edge-hover` is #7A6500.
- Op het goudvlak (`.easy`) en het grijze vlak (`.picker`) neemt de rand de donkerdere hoverkleur, want #9E881A haalt daar maar 2,9:1.

**Gemeten (`rand.js`)**

| Plek | Voor | Na |
|---|---|---|
| Licht, op de kaart | 2,16:1 | 3,3:1 |
| Licht, Te moeilijk? en Ja, toon alles | 1,92:1 | 4,77:1 |
| Donker, op de kaart | 3,8:1 | 3,8:1 (ongewijzigd) |
| Donker, op het goudvlak | 2,97:1 | 5,4:1 |

### Techniek 5: Verder malen flitst
**Wat ik deed**: `transition:none` op `.story #bStory[aria-disabled="true"]`.

**Gemeten per frame (`storybtn.js`, `out/storybtn.log`)**
- Na: het eerste frame is meteen crème (licht) of antraciet (donker). Eerst begon de knop oranje en vervaagde hij in 0,15 s.
- Na 0,6 s wordt de knop nog steeds zacht oranje.

### Techniek 8: 320x568
**Wat ik deed**: `@media (max-height:600px){.bon{--z:6px;padding-top:3px;padding-bottom:3px}.bon td{padding-top:2px;padding-bottom:2px}}`

**Gemeten (`klein.js`)**: met Korrel van de dag krijgt elke versie dezelfde schacht. "Oud" is de stand vóór de mooimaakronde.

| Scherm | Oud | Voor | Na |
|---|---|---|---|
| Weegbon (bon 131 px, was 157) | +25 | +37 | +11 px te hoog |
| Game-over Nachtploeg, zelfde lange weetje | +40 | +43 | +24 px te hoog |

- In de game-over is de bon 91 px hoog (was 111).
- Met een kort weetje past de game-over op 7 px na.
- Molenboek en Menu staan nu in beeld (`cmp-klein-320.png`).
- Het past dus nog niet helemaal, maar het is overal minder te hoog dan vóór de ronde.

## Regressie en tests
**Formaten (`sizes.js`)**
- Eerst getest op 8 formaten, van 320x568 tot 1920x1080. Na de laatste aanpassing (knoppen met een tweede regel) heb ik 320x568, 360x640 en 1280x800 opnieuw gedraaid.
- Dezelfde kaarten passen als in "voor", en nergens scrolt iets horizontaal.
- De titel is 4 tot 6 px lager.
- De weegbon is 0 tot 1 px anders en de game-over is gelijk (1280x800: 635 tegen 634 en 578 tegen 578).

**Overige schermen (`menus.js`)**: Kies een molen, Instellingen, Over dit spel (Kopieer link), Molenboek en Pauze zien er hetzelfde uit (`cmp-m-*`).

**Tests**
- `toetsen.js`: 16 van 16 goed.
- `rustig.js`: verminderde beweging zonder animaties.
- `harness.js`: op telefoon en desktop zijn started, gameOver en restarted true, zonder errors.
- `nieuwkomer.js` (mijn testkopie, niet aangepast): 37 van 37.
- `node --check` op het uitgepakte script: goed.
- Het bestand begint met `<title>` en heeft geen doctype, html, head of body.
- Er zijn geen requests naar buiten: nieuwkomer.js controleert dat en meldt GOED.

## Buiten mijn gebied
- Eén regel in `introShot` (de beslissing stond dit toe). Aan de regel die de knoptekst zet, is `$('bIntroNext').classList.toggle('ui-fries', i === 2);` toegevoegd. Verder heb ik in de intro-functies niets veranderd.
- Geen andere JS-regels en geen canvascode.

**Nieuwe namen**
- Klasse: `ui-fries`.
- CSS-variabelen: `--ui-voet`, `--ui-voet-ink` en `--ui-voet-aar`.

## Proef-samenvoeging (git merge-file tegen fix/base.html)
- UI met spel: 0 conflicten.
- UI met intro: 0 conflicten. De intro-kopie is nu nog gelijk aan base.
- Alle drie samen: 0 conflicten, en `node --check` op het resultaat is goed.
