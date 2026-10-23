# Verslag raamwerk jaarintro's

Werkbestand: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/frame/korrelval.html`. Het is 673 kB (ronde 1: 662 kB, het spel zonder jaarintro's: 605 kB) en heeft 6.216 regels.

Uitleg voor de jaarmakers: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/raamwerk.md`.

Scripts en beelden: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/frame/check/`. De uitvoer van ronde 2 staat in `frame/check/r2/`.

Dit verslag heeft twee delen: eerst ronde 2 (de punten uit de controle van de zes jaren), daarna ronde 1 (het raamwerk zelf).

# Ronde 2: de punten uit de controle

Bron: `review/tech.json` (punten 3, 5, 6 en 8) en `review/spel.json` (punten 1, 2, 4, 5, 6 en 8). Alles staat in het raamwerk, buiten de zes JAARINTRO-gebieden.

- **De gebieden zijn niet aangeraakt.** In het werkbestand zijn de zes gebieden byte voor byte gelijk aan `frame-base.html`.
- **Proefsamenvoeging.** `git merge-file -p final/korrelval.html frame-base.html frame/korrelval.html` geeft **0 conflicten** (`frame/check/r2/samen.html`, 1.108 kB, 10.471 regels). In het samengevoegde bestand zijn de zes gebieden byte voor byte gelijk aan die in `final/korrelval.html`.
- **De interface voor de jaren is achterwaarts verenigbaar.** `jxFilm`, `build`, `draw`, `grainAt`, `diveAt` en alle velden en hulpjes van `env` werken zoals in ronde 1. De zes jaren uit `final` draaien ongewijzigd en zonder fouten in het nieuwe raamwerk. Wat een jaar nu anders kan merken, staat bij punt 1, 2 en 4.

## Wat er veranderde

**1. De valkuil met de lucht (tech 5).**
- Een lucht van `env.sky` draagt nu een eigen merk (Symbol `JXSKY`) en staat in de lijst `E.skies`. Plaatjes van `env.canvas` staan in `E.made`. Het raamwerk verkleint en wist alleen wat in die twee lijsten staat. Een object in `env.cache` met een sleutel als `sky` of `cv` (een palet, een eigen canvas) raakt het niet meer aan.
- Het verkleinen bij een lagere resolutie staat in try/catch. Een fout geeft één melding in de console ("jaarintro 2026 (verkleinen): ...").
- `introFrame` vraagt het volgende frame nu als eerste aan. Een fout verderop in het frame stopt de animatielus dus niet meer.
- `raamwerk.md` legt het uit (hoofdstuk 1, "Fouten", en `build`, "Wat het raamwerk vrijgeeft").
- Getest met `check/valkuil.js`: een `{ sky: [...], cv: <eigen canvas> }` en een los canvas in `env.cache`, dan bij 8x CPU de resolutie laten zakken. Nieuw: geen fout, de lus loopt (60 frames per seconde erna), beide eigen canvassen zijn heel. Op `final` wordt het eigen canvas gewist (breedte 0).

**2. Sneller openen (tech 3).**
- **De lucht eerst grof.** Op een scherm met dpr boven 1 tekent `env.sky` in `build` nog niets. De eerste `env.drawSky` tekent de lucht op resolutie 1 (circa een derde van het werk). Het raamwerk tekent de volle resolutie bij, een wolk per stapje, hooguit circa 6 ms per frame (`jxWork`, `jxSkyRefine`, net als `ixNative` in de hoofdintro). Dat begint pas na de eerste twaalf frames, als de speler besloten heeft of de resolutie zakt: zakt die, dan vervalt het bijtekenen, en zo telt dit werk niet mee in die keuze. Tijdens de beweging tekent het alleen bij als het jaar zelf weinig tijd kost (het vorige frame onder 8 ms, `IN.jdraw`); anders op het stilstaande eindbeeld. Op een snelle telefoon is de lucht na circa een halve seconde scherp. Bij verminderde beweging (geen lus) tekent het raamwerk de lucht meteen scherp. Gebruikt een jaar zelf `.cv` of `.d` van de lucht (1846 donker, 1867 en 1920 tekenen erop in `build`), dan tekent een getter de lucht meteen, en maar één keer, op volle resolutie. Hun werk gaat dus niet verloren.
  - Waarom de voorwaarde bij de beweging: de eerste versie tekende in elk frame bij. Dan haalde shot 1 bij 4x zonder voorbouwen 1 tot 5 fps minder dan vroeger (2008: 56,2 tegen 52,4 fps), want het bijtekenen kwam bovenop het werk van het jaar.
- **Vooraf bouwen.** Eén regel in `levelComplete`, naast `gxPrewarm`: `jxPrewarm(run.lvl + 1)`.
  - Na 800 ms op de weegbon bouwt het raamwerk de volgende jaarintro in stukjes via `requestIdleCallback`: het paneel meten, `jxEnv`, `build` en de lucht scherp.
  - `openJaar` neemt die env over; `jxCaches` ziet dezelfde sleutel en bouwt niet opnieuw.
  - Speelt er intussen een intro (terugkijken in het Molenboek), dan wacht het voorbouwen.
  - Wordt er gespeeld zonder die jaarintro (Menu, een andere molen), dan gaat alles weer weg (`jxDropPre`).
  - Alleen als de jaarintro nog niet gezien is.
- **Een eerder gezakte resolutie.** Moest een intro in deze sessie al naar resolutie 1 (`introCap` zet dan `IN.slowSeen`), dan begint de volgende jaarintro meteen op resolutie 1.
- **Doel: het eerste beeld binnen circa 150 ms bij 4x.** Gehaald bij Volgende molen: 102 tot 157 ms, was 320 tot 513 ms (zie "Openen gemeten").

**3. De lichte stand (tech 6).** Na het zakken van de resolutie zet de speler de teller terug op 9 (`IN.quick = 9`). De eerste 3 frames op de nieuwe resolutie tellen dus niet mee voor `IN.lite`; daarin worden de plaatjes op de nieuwe maat gemaakt. Dat geldt ook voor de hoofdintro, waar het beeld niet verandert (zie "Hoofdintro").

**4. Venster slepen en draaien (tech 8).**
- Verandert alleen de maat (niet het thema), dan bouwt `jxCaches` pas opnieuw 150 ms na de laatste wijziging. Tot dan tekent het jaar met de oude plaatjes bij de nieuwe `W`, `H` en `P`. `jxSkyDraw` rekt een te smalle lucht zo lang iets uit.
- Zolang `#rotate` (de draaimelding) zichtbaar is, bouwt het niets. `introFrame` tekent dan ook niet.
- Getest met `check/valkuil.js`: tien resize-events kort na elkaar (40 ms ertussen) geven tijdens het slepen geen nieuwe build en 150 ms erna precies één. De telefoon dwars en weer rechtop geeft geen nieuwe build (de maat is daarna gelijk).

**5. Dubbeltik op Overslaan (spel 1).** In `introSkip`, in de jaarintro: als `performance.now() - IN.tEnd < 350`, dan telt de tik niet (net als bij Verder). Een dubbeltik op Overslaan in de hoofdintro opent dus jaarintro 1846 en slaat die niet meteen mee over. Getest in nieuwkomer.js op 360x640, met 150 ms tussen de tikken.

**6. Dubbeltik bij terugkijken (spel 2).** `jxToBook` zet `IN.jbookBlock` op nu + 400 ms. Een capture-listener op het Molenboek houdt in die tijd een klik op de Terug-knop van het boek (`#bBookBack`) tegen. Hij kijkt naar de tijd van de tik zelf (`e.timeStamp`), niet naar het moment van afhandelen: een tik die wacht op een drukke hoofdthread telt dus ook als dubbeltik. Getest in nieuwkomer.js: een dubbeltik op "Terug naar het Molenboek" (circa 200 ms tussen de tikken) laat het boek open, op dezelfde leesplek.

**7. Jaarteller (spel 4).** Na een jaarintro zet `jxGo` de teller van de introband op het jaartal van de vorige molen, en op 1800 voor molen 1 (`run.prevYear`). De teller rolt dus niet meer van 2026 terug. Zonder jaarintro (al gezien) blijft het zoals het was. Getest: 1800 na 1846, 1846 na 1867.

**8. Knopteksten (spel 5 en 6).** Eén functie, `ixLastButton`, kiest de laatste knop:
- Hoofdintro bij de eerste start, als jaarintro 1846 nog komt: **"Terug in de tijd"** (`ui-fries`). Dat sluit aan op de ondertitel "Eerst val je terug in de tijd". Is jaarintro 1846 al gezien, dan komt er geen jaarintro meer achteraan en blijft het "It giet oan!".
- Jaarintro: "It giet oan!" (`ui-fries`).
- Terugkijken vanuit het Molenboek: **"Terug naar het Molenboek"**, een gewone knop. De link Overslaan eronder valt dan weg, want die zou hetzelfde zeggen. De duik blijft.
- `nieuwkomer.js` is bijgewerkt (zie "Tests").

**9. Geluid (spel 8).** In de jaarintro zet `introShot` het windje aan in shot 1 (buiten) en uit in shot 2 (binnen): `introWind(i === 0, true)`. In shot 1 komt er geen extra meeuw bij. Getest in nieuwkomer.js met een bestaande speler met geluid aan: wind in shot 1, geen wind in shot 2.

**Ook nieuw in de testhaken.** `jaarState()` geeft nu ook `knop` (tekst van de laatste knop), `dpr`, `skies` (de resolutie van elke lucht), `jobs`, `pre` (het voorbouwen: jaar, gebouwd, klaar), `voorgebouwd`, `slowSeen`, `wind` en `teller` (het jaar waarvandaan de introband telt). `jaarAt` maakt het bijtekenen eerst af, zodat een vastgehouden beeld meteen scherp is.

## Tests

Alles groen, op het werkbestand en op de proefsamenvoeging met de zes jaren (`check/r2/samen.html`).

| test | werkbestand | samengevoegd |
|---|---|---|
| `node --check` (uitgepakt script) | OK | OK |
| `harness.js` (telefoon en desktop) | started, gameOver, restarted; intros: hoofdintro, jaarintro; 0 errors | idem |
| `nieuwkomer.js` | 65 van 65 | 65 van 65 |
| `check/reduced.js` | 33 van 33 | 33 van 33 |
| `check/rook-jaren.js` 400x800 | (stubs) alles goed | alle zes jaren, licht en donker: alles goed |
| `check/rook-jaren.js` 360x640 | | alles goed |
| `check/valkuil.js` | 6 van 6 | 6 van 6 |

Logs: `check/r2/nk.log`, `harness.log`, `reduced.log`, `rook.log`, `valkuil.log`, en met `s-` ervoor voor het samengevoegde bestand.

**nieuwkomer.js: 65 controles** (ronde 1: 59). Nieuw of anders:
- de laatste knop van de hoofdintro heet "Terug in de tijd", met `ui-fries`;
- de teller van de introband begint na jaarintro 1846 op 1800, na 1867 op 1846;
- een dubbeltik op Overslaan in de hoofdintro (360x640): jaarintro 1846 speelt en is niet gezien;
- terugkijken: de laatste knop heet "Terug naar het Molenboek", zonder `ui-fries`, de link eronder is weg; een dubbeltik erop laat het boek open;
- het voorbouwen bij de weegbon (jaar 1867, gebouwd en klaar), en jaarintro 1867 opent voorgebouwd;
- bestaande speler met geluid aan: wind in shot 1, niet in shot 2.

**valkuil.js** (nieuw, 6 controles): de lucht-valkuil bij 8x CPU, een fout bij het verkleinen (één melding, de lus loopt door), venster slepen, telefoon dwars, en of de lucht op dpr 2 scherp wordt: bij gewone beweging binnen 1 s, bij verminderde beweging meteen. Die laatste controle vond een gat in mijn eerste versie: zonder lus werd de lucht nooit bijgetekend. Dat is nu verholpen. Op `final/korrelval.html` faalt de eerste controle (het eigen canvas wordt gewist); de tweede kan daar niet draaien (geen `E.skies`).

**rook-jaren.js** wacht nu 500 ms voor Overslaan; anders telt de tik niet (punt 5).

## Openen gemeten

`check/open-jaar.js`, naar het meetscript van de tech-controle: 400x800, dpr 2, CPU 4x. Op de weegbon van de vorige molen gaat de vertraging aan, dan `wacht` ms, dan Volgende molen. Gemeten wordt van de klik tot het tweede frame na het openen (het eerste beeld staat dan op het scherm). Oud is `final/korrelval.html`, nieuw is `check/r2/samen.html`. De load van de machine was 1,3 tot 4,3, want de jaarmakers draaiden tegelijk; reken op circa 20% ruis.

**Volgende molen, 2500 ms op de weegbon** (de gewone weg: het raamwerk heeft intussen vooraf gebouwd). Nieuw is de laatste run op de eindversie; oud is één run.

| jaar | klik-handler oud | nieuw | eerste beeld oud | nieuw | build na de klik oud | nieuw |
|---|---|---|---|---|---|---|
| 1867 | 235 ms | 55 ms | 320 ms | **110 ms** | 147 ms | geen (vooraf) |
| 1920 | 423 ms | 74 ms | 513 ms | **157 ms** | 337 ms | geen |
| 1976 | 275 ms | 65 ms | 395 ms | **153 ms** | 144 ms | geen |
| 2008 | 235 ms | 67 ms | 326 ms | **156 ms** | 166 ms | geen |
| 2026 | 255 ms | 37 ms | 348 ms | **102 ms** | 207 ms | geen |

- Het doel van circa 150 ms is gehaald. In vier runs (ook met de tussenversies) lag het eerste beeld tussen 102 en 178 ms. Eén uitschieter: 2008 één keer 344 ms, met een klik-handler van 180 ms en toch geen build; dat schrijf ik toe aan de drukke machine.
- Het eerste frame-interval na de klik is nu 83 tot 133 ms, was 300 tot 500 ms. Daarin zitten de klik-handler en de eerste tekening van het jaar op dpr 2.
- Wat overblijft in de klik-handler (35 tot 75 ms) is `openJaar` zelf: van scherm wisselen en het paneel vullen. Dat heb ik niet verder uitgesplitst.
- Daarna volgen, net als vroeger, circa 12 frames van 33 tot 67 ms tot de resolutie zakt.

**De keten hoofdintro, Terug in de tijd, duik, jaarintro 1846**: build op dpr 1 onder de sluier 89 tot 142 ms in vier runs (oud 119 ms; hier verandert niets, want op dpr 1 tekent `env.sky` meteen). Het frame waarin de jaarintro opent duurt 16,7 ms, oud ook. Het frame direct daarna duurt 133 tot 217 ms (oud 183 ms), daarna weer 16,7 ms. Dat is niet veranderd.

**Zonder voorbouwen** (Kies een molen, het Molenboek, of meteen klikken). Met `check/bouw-ab.js`: per jaar een verse pagina, `__korrelval.jaar(i)`, oud en nieuw om en om, 4 rondes, mediaan, op de eindversie:

| jaar | build oud | nieuw | eerste beeld oud | nieuw |
|---|---|---|---|---|
| 1867 | 200 ms | 156 ms | 391 ms | 329 ms |
| 1920 | 394 ms | 346 ms | 559 ms | 540 ms |
| 1976 | 220 ms | 107 ms | 513 ms | 349 ms |
| 2008 | 222 ms | 32 ms | 387 ms | 157 ms |
| 2026 | 155 ms | 37 ms | 292 ms | 242 ms |

- 2008 en 2026 tekenen de lucht alleen met `env.drawSky`. Hun `build` is circa 120 tot 190 ms korter, en het eerste beeld komt 50 tot 230 ms eerder. Een deel van het werk (de grove lucht) schuift naar het eerste frame.
- 1976 bakt de lucht in `env.still`. Ook daar is `build` korter, en het eerste beeld kwam in twee van de drie runs eerder.
- 1867 en 1920 tekenen in `build` op `lucht.cv`. Die lucht wordt meteen op volle resolutie getekend, dus net zo snel als vroeger. In drie runs schommelde het verschil in het eerste beeld tussen -60 en +55 ms: gelijk binnen de ruis.
- Met `open-jaar.js` en `wacht` 300 ms (klikken voordat het voorbouwen begint, één run op een tussenversie) zag het er net zo uit: 2008 en 2026 100 tot 130 ms sneller, de andere drie gelijk binnen de ruis (`check/r2/open-oud-300.log` en `open-nieuw-300.log`).

## Hoofdintro

Gelijk gebleven, op de knoptekst na. `check/hoofd-kijk.js` op het samengevoegde bestand, met de eigen klok, 76 beelden (per shot het begin, 25, 50, 75 procent en het eindbeeld, plus 4 frames van de duik, op 360x640 licht, 400x800 donker en 1280x800 licht en donker), vergeleken met `check/voor` (het spel van voor ronde 1) met `compare -metric AE`:
- **40 van 76 pixel-gelijk**: shot 1 en shot 2, in alle formaten.
- **De andere 36 verschillen alleen in de knop**: shot 3 en de duik, 9 beelden per formaat, steeds hetzelfde aantal pixels (1.570, op 360x640 1.207). Daar staat nu "Terug in de tijd" in plaats van "It giet oan!" (`check/r2/na/360x640-light-s3-100.png`).
- In sommige runs verschilt één beeld (shot 2 op 25%, 360x640 of 400x800) 8 tot 20 pixels in de stippen van het paneel: een CSS-overgang die met de echte tijd meeloopt. Dat gebeurt ook met het bestand van ronde 1 (in de laatste run `check/r2/r1`, 400x800 donker, 20 pixels), en een herhaling geeft 0. In de laatste run van het nieuwe bestand (`check/r2/na`) was het 0. De vergelijking staat in `check/r2/s2-25-cmp.png`.
- Punt 3 (lichte stand) geldt ook in de hoofdintro: de 3 rustframes na het zakken. Het beeld verandert daardoor niet; alleen gaat de lichte stand op een trage telefoon minder snel aan. De bescherming bij Overslaan (punt 5) geldt alleen in de jaarintro.

## Snelheid

`check/fps-jaar.js`, 400x800, dpr 2, CPU 4x, oud (`final`) en nieuw (`samen.html`) om en om, 3 rondes, mediaan in fps. De jaarintro wordt geopend met de testhaak, dus zonder voorbouwen: het zwaarste geval voor het bijtekenen.

| | 1846 oud | 1846 nieuw | 2008 oud | 2008 nieuw |
|---|---|---|---|---|
| shot 1 van de hoofdintro (budget) | 57,2 | 55,0 | 56,3 | 56,0 |
| shot 1 | 49,8 | 48,8 | 55,8 | 55,5 |
| eindbeeld shot 1 | 60 | 60 | 60 | 60 |
| shot 2 | 58,5 | 56,9 | 59,4 | 59,4 |
| eindbeeld shot 2 | 60 | 60 | 60 | 60 |
| duik | 60 | 60 | 60 | 60 |

- Gelijk binnen de ruis (circa 3 fps tussen rondes; bij 1846 shot 1 per ronde oud 53,3 / 49,8 / 49,5 en nieuw 48,8 / 48,8 / 52,4).
- 1846 shot 1 blijft onder het budget, zoals in de tech-controle; dat ligt in het gebied van 1846.
- De eerste versie van het bijtekenen (in elk frame) kostte wel snelheid: 2008 shot 1 56,2 tegen 52,4 fps. Daarom tekent het raamwerk nu alleen bij als er ruimte is (punt 2).
- **De lichte stand** (`check/lite-ab.js`, 3 s na het openen, twee keer 4 runs per jaar): oud ging hij aan bij 1846 1 van de 8 keer en bij 2008 2 van de 8 keer, nieuw 0 van de 8 keer. Zo hoort het (tech 6): deze jaren halen daarna gewoon de lat.
- Logs: `check/r2/fps-1846.log`, `fps-2008.log`, `lite-ab.log`, `open-*.log` en `bouw-ab.log`.

## Aandachtspunten na ronde 2

- **Zonder voorbouwen blijven 1867 en 1920 traag openen** (eerste beeld circa 330 en 530 ms bij 4x). Beide tekenen in `build` op het luchtplaatje (een gloed en een waas, dunne sluierwolken), zodat de lucht meteen scherp moet. Dit gebeurt alleen via Kies een molen of het Molenboek. Bij Volgende molen is het vooraf gedaan. Sneller kan het als zo'n laag een eigen `env.canvas` wordt en in `draw` boven `env.drawSky` komt. Dat ligt in de gebieden van de jaarmakers.
- **1976 en `env.still`.** Zodra de lucht scherp is, gooit het raamwerk een bewaard `env.still`-beeld weg en laat het opnieuw maken. Bij 1976 gebeurt dat één keer, als de lucht scherp wordt (kort na het openen, of op het eindbeeld als de beweging te zwaar is), en alleen zonder voorbouwen.
- **Vooraf bouwen kost geheugen op de weegbon.** De env van de volgende jaarintro staat al klaar (bij 1920 circa 50 MB canvas, zie tech.json). Speel je verder zonder die jaarintro, dan gaat het weg.
- **`build` kan vooraf draaien,** met de maat en het thema van dat moment. Verandert er daarna iets, dan bouwt `jxCaches` gewoon opnieuw. Een jaar mag dus in `build` niets van het spel of de tijd lezen. Dat staat in `raamwerk.md`, en de zes jaren uit `final` doen het ook niet.
- **Een frame van 100 ms of langer telt niet mee** voor het zakken van de resolutie (`raw < 100` in `introFrame`, zo was het al in de hoofdintro). Op een extreem trage telefoon (bij 12x CPU hier: frames van 117 tot 267 ms) zakt de resolutie dus nooit. Dat heb ik niet veranderd, want de hoofdintro moet gelijk blijven. `valkuil.js` meet daarom bij 8x.
- **De tests in de repo.** Bij het samenvoegen moet `frame/nieuwkomer.js` mee naar `game/tests/nieuwkomer.js`; de oude test verwacht "It giet oan!" aan het eind van de hoofdintro.
- **Nieuwe namen** in het raamwerk: `ixLastButton`, `JXSKY`, `jxSkyCanvas`, `jxSkySet`, `jxSkyNow`, `jxSkyFull`, `jxSkyRefine`, `jxWork`, `jxPrewarm`, `jxPreBuild`, `jxDropPre`, `jxFreeAll`, `jxKeepDrop`. In `IN`: `jpre`, `slowSeen`, `jbookBlock`, `jdraw`. In `env` (intern, niet voor de jaren): `made`, `skies`, `jobs`, `pre`, `vorm`, `rt`.

# Ronde 1: het raamwerk

## Wat er staat

**Speler.** De hoofdintro-speler speelt nu een "film": `IN.jy` is -1 voor de hoofdintro en 0 tot 5 voor de jaarintro van `LEVELS[jy]`.
- Waar de spelerfuncties hard `INTRO_SHOTS` gebruikten, staat nu `ixShots()`.
- Tekenen, caches, einde en overslaan gaan naar de jaarcode als `IN.jy >= 0`.
- Zo krijgt een jaarintro hetzelfde canvas, paneel, Verder en Overslaan (onder en rechtsboven), Esc en de pijltjes, het overvloeien, de bescherming tegen een dubbeltik, de lichte stand, het zakken van de resolutie, verminderde beweging (alleen eindbeelden, geen lus), aria-live en `#introDesc`.
- Het paneel heeft dan 2 stippen ("Stap 1 van 2.").
- De kicker toont plek en jaartal zonder komma ("Holwerd 1846", "In de rosmolen 1846"), het jaartal in La Belle Aurore (klasse `ui-kick`, zoals "Halverwege 1846").
- De laatste knop heet "It giet oan!" (`ui-fries`). In ronde 2 veranderd: bij terugkijken "Terug naar het Molenboek", en de hoofdintro eindigt bij de eerste start met "Terug in de tijd" (punt 8).

**Volgorde en opslag.** Eén regel in `startLevel(true)` opent de jaarintro als die nog niet gezien is (`save.jaarSeen[jaartal]`). Daarmee werkt elke route:

- Eerste start: hoofdintro, duik, jaarintro 1846, introband.
- Volgende molen: de jaarintro van dat jaar, daarna de introband.
- Kies een molen: alleen als die jaarintro nog niet gezien is.
- Nog een korrel? (`startLevel(false)`) en de Nachtploeg: nooit een jaarintro.
- Bestaande spelers (geen `jaarSeen` in hun opslag) krijgen elke jaarintro één keer.
- Overslaan en Esc tellen als gezien.

**Molenboek.** Op de pagina van een bereikt jaar staat de knop "Bekijk de jaarintro".
- Bereikt betekent: gezien, of de molen is uitgespeeld.
- Is het verhaal van dat jaar nog dicht, dan staat de pagina er toch, met "Verhaal nog niet ontdekt" en de knop.
- Terugkijken (It giet oan! of "Terug naar het Molenboek") eindigt in het Molenboek, op dezelfde leesplek.

**Regiewensen** (regie.md 2.5, 2.6, 2.7 en 7), allemaal in het raamwerk:

1. **Overvloeien.** Shot 1 en shot 2 vloeien 0,32 s in elkaar over (`ixSnap` bij de stap naar het volgende shot, alleen in de jaarintro).
2. **Geen stilstand na de hoofdintro.** Komt jaarintro 1846 direct na de hoofdintro, dan begint shot 1 meteen te bewegen (`jt0 = 0`), en gaat de sluier open over beweging. Anders staat shot 1 eerst 0,3 s stil.
3. **De korrel valt voorop.**
   - Een jaar levert `grainAt(env)`: `[x, y, schaal]` van de korrel aan het eind van shot 2.
   - Bij de duik tekent het raamwerk het eindbeeld één keer met `env.noGrain = true` en bewaart dat.
   - Daaroverheen valt de korrel 0,3 s versnellend van `grainAt` in de opening (`diveAt`) en wordt iets kleiner.
   - Dan zoomt het beeld 0,4 s in en kleurt het.
   - Erbij: `env.grainLand(g)` tekent de aankomst van de korrel volgens regie 2.6: in de laatste 0,8 s van boven, 4% vallen, één keer naveren, stil hangen, knipperen. Zo doen de zes het gelijk.
4. **Titel.** `env.title(g, t)` volgens regie 2.5:
   - het jaartal in La Belle Aurore, 20% van min(W, P), in de lucht;
   - een potloodstreep in #C5AA20 die van links naar rechts loopt;
   - in van 0,1 tot 0,4 s, streep van 0,3 tot 0,7 s, weg van 1,1 tot 1,6 s;
   - niet bij verminderde beweging;
   - overdag #1D1E1F op 75%, 's avonds #F9F4DB op 90%;
   - de letters één keer voorgetekend.

   Het grote blijvende jaartal is uit de stubs.
5. **Kickers** zonder komma, uit de regietabel: "Holwerd 1846" en "In de rosmolen 1846", "Leeuwarden 1867" en "In de stoommeelfabriek 1867", enzovoort. De stubs hebben ook de duren uit de regie (4,4 tot 5,4 s).
6. **Wandkleur.** De duik eindigt in de wandkleur van de molen (`LEVELS[i].pal.wall`), en de sluier naar de introband heeft dezelfde kleur. Daarna gaat de sluier terug naar zijn eigen kleur, dus de hoofdintro merkt er niets van.

**Zes gebieden** (`// ===== JAARINTRO 1846 BEGIN =====` tot en met `EIND`), in de volgorde 1846, 1867, 1920, 1976, 2008, 2026.
- Tussen elk paar staan 7 vaste regels: `} catch`, 5 regels "niet aanpassen: scheiding voor git merge-file (1846 en 1867, regel n van 5)" en `try {`.
- Elk gebied staat in een eigen `try`-blok. Een fout bij het laden kost alleen die jaarintro, met een melding in de console.
- Een fout in `draw` geeft een noodbeeld; de knoppen werken dan gewoon.
- `save()` zonder `restore()` wordt herkend, rechtgezet en één keer gemeld.
- Boven de gebieden staat het commentaarblok met de interface:
  - Een jaar levert `jxFilm(jaartal, { shots: [{ dur, kicker, cap, desc }], build(env), draw(g, env, shot, t), grainAt, diveAt })`.
  - Het krijgt in `env`: `W`, `H`, `P`, `hv`, `dpr`, `dark`, `lite`, `calm`, `A`, `u`, `noGrain`, `cache`, `base` en `font`.

**Hulpjes in `env`:**
- easing (out, io, soft), clamp, lerp, mix, rgba en rnd;
- camera: `box`, `camMix`, `view` met diepte en `toScreen`;
- voortekenen: `canvas` en `still`;
- lucht: `sky`/`drawSky` en `cloud`;
- waas: `haze` en `mixC`;
- `water`, `gulls`, `dust`, `rays` (lichtbundels met stofjes), `grain`, `grainLand` en `title`.

Om ze voor andere tijden geschikt te maken, zijn de hulpjes van de hoofdintro parametrisch gemaakt, met precies dezelfde rekenkunde:
- `ixSkyGen` roept nu `ixSkyPaint(cv, o)` aan. Daarin zijn kleuren, zon of maan, sterren en wolken in te stellen. Een avondlucht van 1846 kan dus, en de lucht heeft geen stad.
- `iGulls` gebruikt `ixGull`.
- `ixDust` gebruikt `ixDustAt`.
- `ixBeams` en `ixMotes` gebruiken `ixRays` en `ixRayMotes`.
- Water is nieuw (`jxWater`), naar het water in `ixLower`. `ixLower` zelf is niet aangeraakt.

Zakt de resolutie, dan tekent het raamwerk niet opnieuw voor (dat gaf een hapering van 150 ms bij 4x). De lucht wordt één keer verkleind, net als in de hoofdintro.

Het voorbeeld `check/voorbeeld-1846.js` gebruikt alle hulpjes, ook de titel en de korrel. De beelden staan in `check/voorbeeld/`.

**Stubs.** Elk gebied heeft een werkende stub:
- shot 1: lucht, een rechthoek met dak als gebouw, de titel en een camerabeweging;
- shot 2: een machine met een opening, waar de korrel landt en in valt;
- placeholders: cap "(tekst volgt)" en desc "(beeldbeschrijving volgt)"; de kickers en duren komen uit de regie.

**Testhaken.** Naast `introAt`, `intro` en `state` zijn er nu:
- `__korrelval.jaar(i)`: jaarintro i openen;
- `jaarAt(i, shot, t)` en `jaarAt(i, 'duik', p)`: vasthouden; `jaarAt(null)` laat los;
- `jaarState()`: `open`, `jaar`, `shot`, `t`, `frames`, `loop`, `seen`, `fade` en meer.

`intro().open` geldt nu alleen voor de hoofdintro.

## Hoofdintro: gelijk gebleven (ronde 1)

- **Pixels.** `check/hoofd-kijk.js` maakt 76 beelden: per shot het begin, 25, 50 en 75 procent en het eindbeeld, plus 4 frames van de duik, op 360x640 licht, 400x800 donker en 1280x800 licht en donker. Het script gebruikt een eigen klok (`klok.js`). Twee runs op hetzelfde bestand geven precies dezelfde beelden.
  - Voor (`check/voor`) en na (`check/na`, op het eindbestand): **76 van 76 pixel-gelijk** (`compare -metric AE` = 0).
- **Bestaande checks.**
  - `mooi/intro/reduced.js` geeft op het oude bestand 20 van 20.
  - De bijgewerkte `check/reduced.js` geeft 33 van 33. Daarin zijn de oude checks gebleven. Alleen "It giet oan! / Esc start molen 1" gaat nu eerst via de jaarintro.
- **Lint.** Voor oud en nieuw dezelfde meldingen (alleen ontbrekende globals in de config).
- **Eén bewuste wijziging.** `ixMeasureIn` mat de ondertitelhoogte op een kloon die de oude `min-height` meenam. Daardoor kon die hoogte alleen groeien. De kloon krijgt nu geen min-height. Bij de hoofdintro is het beeld gelijk (zelfde teksten). Alleen na draaien naar een breder scherm kan het paneel nu weer krimpen, wat ook de bedoeling was. Zonder deze fix kreeg de jaarintro na de hoofdintro een te hoog paneel.
- **Buiten 11c** veranderde verder:
  - de intro-speler en de hulpjes (11b);
  - opslag (`jaarSeen`);
  - `startLevel` (1 regel);
  - het Molenboek (`storyPage`, `renderBook`);
  - 1 CSS-regel (`.page .jx-kijk`);
  - de testhaken.

## Tests (ronde 1, alles groen, op het eindbestand van toen)

- **harness.js**: telefoon en desktop. `started`, `gameOver` en `restarted` zijn true, zonder errors. `intros` is: hoofdintro, jaarintro (beide overgeslagen). Het bestand begint met `<title>` en heeft geen verboden tags.
- **nieuwkomer.js: 59 van 59** (was 37; na ronde 2: 65). Nieuw:
  - jaarintro 1846 na de hoofdintro, zonder stilstand (de camera beweegt al als de sluier opengaat);
  - kicker "Holwerd 1846" in handschrift;
  - Verder springt eerst naar het eindbeeld;
  - shot 1 vloeit over in shot 2, met kicker "In de rosmolen 1846";
  - It giet oan! (`ui-fries`);
  - Overslaan in elk shot;
  - het paneel past, ook op 360x640;
  - de lus stopt erna;
  - Bekijk de jaarintro in het Molenboek alleen bij 1846, en terug op dezelfde plek;
  - Volgende molen geeft jaarintro 1867;
  - niet terug na herladen;
  - een bestaande speler: jaarintro 1846 één keer; Esc; na een echte game-over en Nog een korrel? geen jaarintro; Kies een molen 1920 wel (niet gezien), 1846 niet; de Nachtploeg zonder jaarintro;
  - geen console-fouten en geen requests naar buiten.

  Molen 1 lukt meestal in één poging, dus "Nog een korrel?" testte de oude test eigenlijk niet. Daarom de echte game-over bij de bestaande speler.
- **check/reduced.js**: 33 van 33. Verminderde beweging (hoofdintro en jaarintro alleen eindbeelden, geen lus, pijltjes), overvloeien, Esc, en thema en formaat wisselen tijdens de jaarintro.
- **check/rook-jaren.js**: alle zes jaarintro's openen, tekenen (elk shot en de duik) en sluiten in licht en donker, zonder fouten.
- **Proef met kapotte jaren** (`check/dbg-kapot.js`): een fout bij het laden, een fout in `draw` en een `save()` zonder `restore()`. Het spel blijft werken; elke fout staat precies één keer in de console.
- **check/merge-proef.py**: zes makers herschrijven tegelijk hun gebied (1867 en 1920 als buren zelfs helemaal) en `git merge-file` voegt ze samen tegen het raamwerk. **0 conflicten**, elk gebied bevat het werk van zijn maker, en `node --check` is OK. Ook de rooktest is groen op het samengevoegde bestand.
- **Contract.**
  - `node --check` op het uitgepakte script is OK.
  - Er gaan geen requests naar buiten. Alleen de bekende teksten `www.w3.org` en de deellink staan erin.
  - localStorage alleen via `persist()` en `loadSave()` (try/catch).

## Bekeken beelden (ronde 1, Read-tool)

- De stubs van 1846 en 1867 op het eindbestand, op 360x640 en 1280x800, licht en donker: per shot, de titel en de duik (`check/jaar46/sheet-*.png`, `check/jaar67/sheet-*.png`).
- De titel van dichtbij (`check/titel46.png`, `check/titel46-desk.png`).
- Het voorbeeld (`check/voorbeeld/`).
- Het Molenboek met de knop, 1867 en 1920 donker (`check/nk/`).
- Overvloeien en een themawissel (`check/sheet-thema.png`).

## Snelheid (ronde 1)

400x800, dpr 2, 4x CPU (`check/fps-jaar.js`), oud en nieuw om en om, 3 rondes, mediaan in fps:

**Hoofdintro**: oud is het bestand van voor deze ronde, nieuw is het eindbestand.

| | oud | nieuw |
|---|---|---|
| shot 1 | 55,7 | 55,6 |
| shot 2 | 60 | 60 |
| shot 3 | 60 | 59,8 |
| de eindbeelden | 60 | 60 |
| duik | 60 | 60 |

**Jaarintro 1846 (de stub)**: oud is het raamwerk van vóór de regiewensen, nieuw is het eindbestand. Ter vergelijking haalt shot 1 van de hoofdintro in dezelfde meting 55,3 (oud) en 55,6 (nieuw); dat is het budget.

| | oud | nieuw |
|---|---|---|
| shot 1 | 54,9 | 54,8 |
| eindbeeld shot 1 | 54,1 | 58 |
| shot 2 | 59,3 | 59,6 |
| eindbeeld shot 2 | 59,3 | 59,3 |
| duik | 58,3 | 55,0 |

- **De duik.** Die kost nu iets meer: op het eerste frame wordt het eindbeeld zonder korrel getekend, en daarna valt de korrel. Het langste frame blijft 33 ms.
- **Ruis.** Rond de 3 fps tussen rondes.
- **Resolutie.** De stub blijft meestal op resolutie 2. De hoofdintro zakt in deze meting altijd naar resolutie 1, oud en nieuw gelijk.
- **Meetbestanden:** `check/fps-hoofd-eind.log`, `check/fps-jaar46-eind.log` en `check/fps-voorbeeld.log` (het voorbeeld met alle hulpjes, nog op de oude interface: shot 1 circa 50 fps, dus iets boven het budget; een jaarmaker moet daar op letten).

**Waarom de compositor zoomt.** De eerste versie zoomde met een geschaalde kopie van het hele canvas. Dat kost bij 4x 19 ms per frame (31 tot 36 fps). Nu doet de compositor het inzoomen (CSS-transform op het canvas, alleen tijdens de duik). Het canvas doet per frame alleen een kopie op ware grootte, een vlak en de vallende korrel.

## Keuzes en aandachtspunten (ronde 1)

- **Jaarteller na jaarintro 1846.** De introband rolt nog steeds van 2026 terug naar 1846 (regie 4.3 punt 6 wil dat zo). In ronde 2 veranderd (spel 4): na een jaarintro telt de teller van de vorige molen, bij molen 1 van 1800.
- **It giet oan! bij terugkijken.** Ook dan heet de laatste knop "It giet oan!", zoals de opdracht zegt. Hij eindigt met de duik in het Molenboek. In ronde 2 veranderd (spel 6): nu "Terug naar het Molenboek".
- **Lagere resolutie loopt door.** Na de hoofdintro neemt jaarintro 1846 een verlaagde resolutie en de lichte stand over. Aan het eind van de jaarintro komt de oude resolutie terug.
- **`build` direct na de klik.** Voor 1846 gebeurt `build` onder de sluier. Bij de andere jaren gebeurt het direct na de klik op Volgende molen, zonder opwarmen vooraf. In de uitleg staat een budget van 100 ms bij 4x. In ronde 2 veranderd (tech 3): bij Volgende molen bouwt het raamwerk vooraf, terwijl de weegbon staat.
- **De korrel in de duik.** Elk jaar moet `env.noGrain` respecteren als het de korrel ergens anders dan met `env.grain` of `env.grainLand` tekent (gloed of schaduw). Anders staat hij twee keer in beeld.
- **`dive: 'eigen'`.** Dit kan technisch nog, maar de regie wil zes gelijke duiken. In de uitleg staat: niet gebruiken.
- **De tests in de repo.** `harness.js` en `nieuwkomer.js` zijn alleen hier bijgewerkt (`jaar/frame/`). Bij het samenvoegen moet `game/tests/nieuwkomer.js` mee. De oude nieuwkomer verwacht na de hoofdintro meteen de introband en geeft op dit bestand 17 van 23 (`check/nk-oud-op-nieuw.log`).
- **Nieuwe namen.**
  - `ix`: `ixShots`, `ixSkyPaint`, `IX_CLOUDS`, `ixGull`, `ixDustAt`, `IX_RAY`, `ixRays`, `ixRayMotes`.
  - Raamwerk in 11c: `JX`, `JXDIVE`, `JXFALL`, `jaarIdx`, `jaarWanted`, `jaarReached`, `openJaar` en de `jx`-functies.
  - In `IN`: `jy`, `env`, `jlast`, `jt0`, `jdv` en `jbook`.
