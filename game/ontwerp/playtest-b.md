# Playtest Korrelval, versie B

**Bestand:** `korrelval-b.html`. **Datum:** 2 oktober 2026.
**Getest op:**
- telefoon 400×800 met touch (ook 375×667, 360×640 en landschap 800×400);
- desktop 1280×800 met toetsen en muis;
- licht thema, `data-theme="dark"` en geëmuleerde `prefers-color-scheme: dark`.

**Fonts:** Nunito en La Belle Aurore zijn lokaal geserveerd via request-interceptie. De screenshots tonen dus de echte typografie, niet de fallback.

Alle screenshots staan in `playtest-b/shots/`. De scripts staan in `playtest-b/`:
- `lib.js`
- `phone1.js` en `phone3.js`
- `desktop.js`
- `hitbox.js`
- `harvest.js` en `analyze.js`
- `human.js` en `nightcause.js`
- `edge.js` en `visuals.js`
- `exploit.js` en `perf*.js`

`inst.html` is de wrapper met precies één extra regel: die maakt interne state zichtbaar als `window.__kvDbg`, alleen om te meten.

## Samenvatting

**Geen blokkerende fouten.** In alle sessies is er geen enkele console-error of pageerror. Elke flow is af te ronden op telefoon en desktop:
- titel → molen 1 → silo → weegbon → molen 2 → game-over → "Nog een korrel?";
- Nachtploeg → top 5 → letterkiezer → kopieer → scores → over → Gezel.

Ook de randgevallen houden:
- dt-cap: na 2 s blokkade schuift de wereld 0,017 s op en kost het geen korrel;
- pauze bij een verborgen tab;
- geblokkeerde localStorage;
- resize midden in het spel;
- dubbel tikken.

De generator is eerlijk voor de walsen in molen 1 t/m 6.

De problemen zitten in vier hoeken:
- een omgedraaide spelmetafoor (uitmaling);
- touch-onboarding;
- de belofte van het waarschuwingsdriehoekje;
- een paar UI-details.

---

## Belangrijk

### 1. Uitmalingslabel staat omgekeerd: goed spelen = "Volkoren", slecht spelen = "Short patent"

**Wat ik zag**

| Situatie | Wat het spel zegt |
|---|---|
| 9 van 10 perfect | "Jouw uitmaling: **90%** … **Volkoren**, 100%. Witter = minder uitmaling." |
| Perfecte run | "100% … Volkoren" |
| 0 van 1 perfect | "**Short patent**, circa 45%" (de witste, duurste bloem) |

Tegelijk wordt de korrel bij elke perfecte passage visueel *witter* (`knak`, `drawGrain`). De metafoor spreekt zichzelf dus tegen, en dat precies bij een publiek van molenaars. Ook "90% = Volkoren, 100%" klopt niet: 90% is geen volkoren.

**Hoe ik het reproduceer:** speel molen 1 netjes uit en kijk naar de weegbon.

**Screenshots:** `p08-level-card.png`, `p19-night-over.png` (89% → Volkoren), `v08-jaarverslag.png`, `x02-1-verdiepingen.png` (0% → Short patent).

**Fix:** in `uitHTML()` / `UIT` de schaal omdraaien. Perfect spelen = schoon gescheiden = witter = lagere uitmaling. Bijvoorbeeld:

```js
const uit = Math.round(100 - (perf / total) * 55);
```

Daarmee geeft 100% perfect een uitmaling van 45% (short patent) en 0% perfect een uitmaling van 100% (volkoren). Gebruik dan drempels ≤50 / ≤70 / ≤80 / rest. Tussen 80 en 99 een eerlijk label, zoals "tussen straight grade en volkoren".

Let op: de bouwopdracht vroeg letterlijk om "perfects/totaal". Dit vraagt dus een korte ontwerpbeslissing, maar zoals het nu staat valt het collega's direct op.

### 2. Op een telefoon zegt de tutorial "Pijltjes, A/D of de muis."

**Wat ik zag:** de eerste keer op een touch-toestel toont `drawTutorial()` "Pijltjes, A/D of de muis.". `inputMode` blijft namelijk `'keys'` tot je het canvas aanraakt. De starttik op "It giet oan!" telt niet, want dat is een DOM-knop.

Pas in een latere run staat er "Sleep met je duim, waar dan ook." (`p26`). Ook de pauzekaart zegt op touch "Spatie of P: verder. Esc: menu.". De titelhint begint ook met pijltjes en A/D.

**Hoe ik het reproduceer:** verse sessie op 400×800 met touch, tik "It giet oan!", wacht 2,3 s.

**Screenshots:** `p04-after-intro-2.3s.png` (fout), `p26-gezel-play.png` (goed na eerdere touch), `p11-pause.png`.

**Fix:**
- Bepaal de hinttekst niet met `inputMode`, maar met een aparte `hintTouch`. Zet die in de bestaande document-`pointerdown`-listener (regel 587) op `e.pointerType === 'touch'`, met `matchMedia('(pointer: coarse)')` als startwaarde.
- Gebruik dezelfde vlag voor `#ctlHint` en de hint op de pauzekaart.

### 3. Spatie/Enter op het titelscherm drukt de laatst met de muis aangeklikte knop in, niet "start"

**Wat ik zag:** klik op desktop "Gezel-modus" (aan) en druk op spatie. Gezel gaat weer **uit** en het spel start niet. Hetzelfde gebeurt met "Geluid aan" en met de pijltjesknoppen van de letterkiezer. Volgens de opdracht is spatie/enter juist start/doorgaan.

**Hoe ik het reproduceer:** zie `desktop.js`. Na de klik is de focus `bGezel`, na spatie staat `aria-pressed` op `false` en is het scherm nog steeds `title`.

**Screenshot:** `d01b-after-space.png`.

**Fix:** in de `keydown`-handler (regel 1477) bij spatie/enter buiten het spel altijd `primary()` aanroepen. Alleen bij een `TEXTAREA` of de primaire knop zelf gebruik je de native activatie. Een alternatief: na een muisklik de knop blurren (`pointerup` → `if (e.pointerType === 'mouse') e.target.blur()`), of na een toggle de focus terugzetten op `#bStart`.

### 4. Badge "Menselijk" en "tijdlijn uitgespeeld" te halen met alleen Molen B

**Wat ik zag:**
1. Zet Gezel aan en kies onder "Verder vanaf" de chip **2026**.
2. Speel alleen Molen B uit.

Resultaat:
- het jaarverslag zegt "Je viel door alle molens van de tijdlijn";
- je krijgt **Menselijk** ("de tijdlijn uitgespeeld als Gezel");
- `save.campDone = true`, en in Scores staat "tijdlijn uitgespeeld".

**Hoe ik het reproduceer:** `exploit.js` geeft `doneBadges: [Betrouwbaar, Vakmanschap, Menselijk]` en `campDone: true`.

**Screenshots:** `x01-menselijk-via-2026-chip.png`, `v08-jaarverslag.png`.

**Fix:**
- In `startCampaign()` opslaan: `run.startLvl = lvl || 0`.
- In `showDone()` alleen `campDone` zetten en `'mens'` toekennen als `run.startLvl === 0`. Dat laatste ook alleen als Gezel de hele run aan stond, want `run.gezel` wordt per run vastgezet en dat klopt al.
- Bij een latere start de tekst aanpassen: "Je viel van {jaar} tot Molen B".

### 5. Het waarschuwingsdriehoekje belooft iets wat de steen niet doet

**Wat ik zag:** de tijdlijn per steen (gemeten in molen 2, zie `hitbox.json`):

| Moment | Wat er gebeurt |
|---|---|
| t | Driehoekje verschijnt |
| t + 1,0 s | Driehoekje weg; de steen spawnt op `sy = -24`, achter de HUD-band |
| t + 1,35 s | De steen wordt pas zichtbaar onder de HUD |
| t + 2,08 s | De steen is op korrelhoogte |

Daarbij:
- **0,35 s lang is er niets te zien**: geen driehoek en geen steen.
- De inslag-x wijkt sterk af van de x van het driehoekje: gemiddeld ca. 70 px, maximaal 162 px (`analyze.js`, alle levels). Dat komt door `hazard.vx` (30 tot 120 px/s) plus het stuiteren tegen de wanden.
- Het driehoekje zegt "hier", maar de steen komt ergens anders.
- Een autopilot die perfect de spleten volgt, krijgt ongeveer één steen per molen op zijn lijn. Dat mag, maar dan moet de waarschuwing wel kloppen.

**Screenshots:**
- `f-warning-gap-nothing-visible.png`: het moment zonder driehoek en zonder steen;
- `f-L3-hitbox-5.png`: een bout met hitbox;
- `p06-l1-play2.png`: driehoekje bovenin.

**Fix:**
- In `update()` stenen laten spawnen op `sy = CONFIG.HUD - 12` in plaats van `-24`.
- In `spawnHazardSlot()` `lead = hz.warn + (CONFIG.GY - CONFIG.HUD + 12) / vfall` zetten.
- Het driehoekje laten staan tot de steen zichtbaar is.
- `CONFIG.hazard.vx` verlagen naar `[0, 50]`, of het driehoekje op de voorspelde x tekenen (bijvoorbeeld als zwak schaduwpuntje op korrelhoogte).

### 6. Nachtploeg met toetsenbord: na ca. verdieping 70 zijn sommige sprongen fysiek onhaalbaar, en "Gepassioneerd" (100 verdiepingen) is praktisch alleen met muis of duim te halen

**Wat ik zag:** analyse van 4 nachtschachten tot 160 verdiepingen (`harvest.js` + `analyze.js`):
- De spleet krimpt tot 42 px bij 560 px/s, met 0,8 s tussen verdiepingen.
- Met toetsenbord-acceleratie (1.800 px/s², remmen met 3.600) en 0,25 s reactietijd is **7% van de verschuivingen onhaalbaar**. De minimale slack is zelfs zonder reactietijd 0,00 s.
- Met muis of duim is dat 0%.

In god-modus met een "geoefende" bot (`nightcause.js`) over 150 verdiepingen:

| Besturing | Hits | Waarvan |
|---|---|---|
| Toetsenbord | 10 | 8 tegen walsen en platen, bijna allemaal na verdieping 70 |
| Muis | 1 | |

Met één korrel haalden echte (niet-god) geoefende bots verdieping 5 tot 46, mediaan ongeveer 29 (`human.js c`).

**Fix:** de eerlijkheidsregel in `spawnFloor()` rekent nu met de volle tijd tussen verdiepingen. Hij negeert de botsingsband van ±(R·0,62 + r) en de acceleratietijd. Voorstel:

```js
const band = 2 * (CONFIG.roll.wals * CONFIG.roll.casing + hitR());
const tFree = Math.max(0, (y - gen.prevY - band) / P.scroll - CONFIG.grain.vmax / CONFIG.grain.accel);
const maxDx = CONFIG.fair.dx * CONFIG.grain.vmax * tFree;
```

En/of `CONFIG.night.gapMin` 0,13 → 0,15 en `intMin` 0,8 → 0,9. Overweeg ook de badge op 60 verdiepingen, of een tweede korrel bij verdieping 50.

Kanttekening bij het bouwverslag: het bewijs "autopilot 0 botsingen" gebruikt een autopilot met **onmiddellijke** snelheid (`autoSteer` zet `G.vx` direct). Dat bewijst eerlijkheid voor muis en touch, niet voor het toetsenbord.

### 7. Landschap op een telefoon (800×400): mini-speelveld en de hoofdknop buiten beeld

**Wat ik zag:**
- Het veld wordt 222×400.
- De HUD-tekst is ongeveer 6 à 7 px ("kg bloem", procesbalk-label).
- De pauzeknop is **22×22 px**.
- Op het game-over-scherm staat "Nog een korrel?" onder de vouw: de kaart is 368 px hoog bij 495 px inhoud, dus je moet scrollen om opnieuw te spelen.
- Op het titelscherm vallen Scores, Over, de hint en de disclaimer weg.
- Er is geen "draai je telefoon"-hint.

**Hoe ik het reproduceer:** `edge.js`. Start molen 3 en wissel naar 800×400.

**Screenshots:** `e02-landscape-800x400-play.png`, `e04-landscape-over.png`, `e05-landscape-title.png`.

**Fix:**
- In `layout()` bij `cw > ch && matchMedia('(pointer: coarse)').matches` pauzeren en een overlay "Draai je telefoon rechtop" tonen.
- Bij `@media (max-height:480px)` de game-over-kaart compacter maken: bon inklappen en de primaire knop bovenaan zetten.

---

## Klein

### 8. Tikdoelen kleiner dan 44 px

| Element | Maat | Plek in de code |
|---|---|---|
| Pijltjes van de letterkiezer | **38×26 px**, zes stuks | `.slot .btn{min-height:26px;width:38px}` |
| Levelchips "Verder vanaf" | 45 à 50 × **38 px** | `.chips .btn{min-height:38px}` |
| Pauzeknop | 40×40 bij 400 breed, 31 px bij 400×560, 22 px in landschap | `layout()`: `bs = Math.round(40 * s)` |

**Screenshots:** `p19-night-over.png`, `p16-title-unlocked.png`, `s-360x640-title.png`, `e01-resize-400x560.png`.

**Fix:**
- `.slot .btn{min-height:40px;width:44px}`. Er is ruimte, de kiezer staat in een eigen balk. Of: tik op de letter om hem te verhogen.
- `.chips .btn{min-height:44px}`.
- In `layout()`: `bs = Math.max(44, Math.round(40 * s))`.

### 9. De intro is in 2,2 s niet te lezen, en lange regels lopen buiten het kader

**Wat ik zag:** de introkaart staat 2,2 s (`CONFIG.intro.t`) en is maar ongeveer 1,7 s volledig zichtbaar. Er staan ongeveer 25 woorden op. De eerste verdieping komt 0,8 s daarna (`intro.first` 3,0). De geschiedenis, juist het doel van het spel, wordt zo grotendeels niet gelezen.

Gemeten breedtes:

| Tekst | Breedte | Kader |
|---|---|---|
| Regel "Aan de loskade: Groninger baktarwe van Dollard Tarwe, circa 500 ton." | **383 px** | 356 px; de tekst raakt bijna de canvasrand |
| Titel "Stoommeelfabriek Friso, Leeuwarden" | **378 px** | 356 px |

**Screenshots:** `v01-molenB-intro-dollard.png`, `p09-l2-intro.png`.

**Fix:**
- In `drawIntro()` de supply-regel via `wrapLines(…, 330)` laten lopen, of het lettertype verkleinen tot hij past. Doe hetzelfde voor de titel.
- `intro.t` naar ongeveer 3,0 en `intro.first` naar ongeveer 3,8 voor molen 1 en 2. Of toon de introregel ook op de weegbon.

### 10. In molen 1 stapelt alle uitleg zich op, precies op het eerste mikmoment

**Wat ik zag:**
- Tussen 1 en 4 s staan tegelijk de introkaart, de grap-tip onderin ("1856: de rosmolen…") en daarna de tutorial.
- De tutorialtekst staat op y = 300 en 320, net onder de korrel. Daar schuift de eerste molensteen doorheen op het moment dat je moet mikken.

**Screenshots:** `p03-intro-1.3s.png`, `p04-after-intro-2.3s.png`, `p26-gezel-play.png`.

**Fix:**
- `drawTutorial()` boven de korrel tekenen (y ≈ 190) of als tip onderin.
- De grap in `update()` pas tonen na `Wd.t > CONFIG.intro.t`.

### 11. Toast blijft hangen na een schermwissel en dekt de primaire knop af

**Wat ik zag:** "Kopiëren lukte niet: selecteer de tekst." blijft na Menu → Scores → Over nog staan en ligt over de knop "Terug".

**Screenshots:** `p22-scores.png`, `p23-about.png`, `d15-dark-about.png`.

**Fix:** in `show()` de toast verbergen en `clearTimeout(toastT)` aanroepen.

### 12. "1 verdiepingen"

**Wat ik zag:** "Nachtploeg · Korrel van de dag, 2 okt · 1 verdiepingen".

**Screenshot:** `x02-1-verdiepingen.png`. Te reproduceren door in de Nachtploeg niet te sturen.

**Fix:** in `gameOver()` en `shareLine()` `n === 1 ? 'verdieping' : 'verdiepingen'` gebruiken.

### 13. M in het spel geeft geen feedback

**Wat ik zag:** M dempt het geluid, maar in het spel zie je nergens dat het geluid uit staat.

**Screenshot:** `d06-after-M.png`.

**Fix:** in `AU.setSound()` bij `S.screen === 'play'` een `toast('Geluid uit')` of `toast('Geluid aan')` tonen, of een klein luidsprekertje in de HUD.

### 14. De werklamp in de Nachtploeg dimt juist de vooruitblik

**Wat ik zag:** het radiale vignet met maximaal 60% zwart op 420 px rond de korrel maakt de onderste 250 px donker. Daar komen de volgende verdiepingen binnen. De voorspellingsomtrekken (`drawPredict`) worden vóór het vignet getekend en worden dus ook gedimd.

**Screenshots:** `p18-night-play.png`, `p18b-night-play.png`.

**Fix:**
- In `render()` het middelpunt van het vignet naar ongeveer `CONFIG.GY + 140` verplaatsen, of de alfa naar 0,4.
- `drawPredict()` na het vignet tekenen.

### 15. Alinea's op het scherm "Over dit spel" plakken aan elkaar

**Wat ik zag:** `.about p{margin:0}` overschrijft `.card>*+*`. Daardoor zit er geen witruimte tussen de alinea's en lopen de credits, de Dr. Oetker-regel en de tekst over Prémax in elkaar over.

**Screenshot:** `p23-about.png`.

**Fix:** `.about p+p{margin-top:8px}`.

### 16. Kleine telefoon (360×640): de verplichte disclaimer valt onder de vouw

**Wat ik zag:**
- De titelkaart scrollt. "Fan-made door een stagiair…" is niet zichtbaar zonder te scrollen, en er is geen scrollhint.
- Op de weegbon valt de knop "Menu" half weg.
- Touch-scrollen binnen de kaarten werkt wel. Ik heb dat apart gecontroleerd met een controlepagina.

**Screenshots:** `s-360x640-title.png`, `s-360x640-level.png`.

**Fix:**
- Bij `(pointer: coarse)` `#ctlHint` verbergen. De tutorial legt de besturing toch al uit.
- De disclaimer direct onder de lead zetten.
- De bestaande `@media (max-height:700px)` ook de knoppen laten verkleinen (min-height 44).

### 17. Half zichtbare canvas-HUD naast en boven de kaarten

**Wat ik zag:** boven de kaart steekt een afgesneden "1.325" uit en naast de kaart een stukje van de combokolom. Dat oogt rommelig.

**Screenshots:** `p08-level-card.png`, `p19-night-over.png`, `s-360x640-level.png`.

**Fix:** in `render()` bij `S.screen !== 'play'` (behalve de demo op de titel) een laag `rgba(0,0,0,.5)` over het canvas tekenen. Of geef `.screen` een halfdoorzichtige achtergrond.

### 18. Kopieer-terugval is zwak in de iframe en op iOS

**Wat ik zag:** in een artifact-iframe mag `navigator.clipboard` vaak niet. Je krijgt dan altijd het tekstveld. Op iOS selecteert `select()` op een readonly-textarea vaak niets. De deelregel bevat ook je drie letters niet.

**Screenshots:** `p21-copy.png`, `d11b-dark-copy.png`.

**Fix:** in `copyScore()` na `select()` ook `setSelectionRange(0, box.value.length)` en `document.execCommand('copy')` proberen. Pas als dat faalt de toast tonen. Zet `save.name` in `shareLine()`.

### 19. "Verder" na een pauze gaat direct door, zonder adempauze

**Wat ik zag:** als je pauzeert vlak voor een wals, zit je na het hervatten meteen in de botsing. Dit speelt ook na een automatische pauze door een verborgen tab.

**Fix:** in `resume()` `G.inv = 0.6` zetten, of 0,8 s slowmo of een korte 3-2-1.

### 20. Alleen een verborgen tab pauzeert; vensterfocus kwijt niet

**Wat ik zag:** klik je naast het browservenster (bijvoorbeeld in Teams), dan loopt het spel gewoon door. `edge.js` gaf na `blur` nog steeds `play`.

**Fix:** in de bestaande `blur`-listener ook `if (S.screen === 'play') pause();`.

### 21. Lege top 5 toont "1 Nog leeg."

**Wat ik zag:** de lijstteller zet een "1" voor de lege-staattekst.

**Screenshot:** `d14-dark-scores.png`.

**Fix:** in `showScores()` de lege staat buiten de `<ol>` renderen, of `li.empty::before{content:none}`.

### 22. De notitie bij Nachtploeg klopt niet voor "Vrije dienst"

**Wat ik zag:** "eindeloos, één korrel, zelfde schacht voor iedereen" staat boven beide knoppen. Alleen "Korrel van de dag" is voor iedereen gelijk.

**Screenshot:** `p16-title-unlocked.png`.

**Fix:** in `refreshTitle()` de tekst "eindeloos, één korrel. Korrel van de dag: zelfde schacht voor iedereen".

### 23. Stoomwolken in molen 2 hangen precies in de vooruitblik

**Wat ik zag:** `ambience()` spawnt de stoom op `camY + 340…560`, dus onder de korrel. Daar liggen de volgende spleten. De walsen eronder vallen deels weg.

**Screenshot:** `v03-steam-l2.png`.

**Fix:** spawnen op `camY + 60…200`. Dan is het puur sfeer, zoals het commentaar zegt.

### 24. Prestaties: nog op een echt toestel controleren

**Wat ik zag:** headless Chromium rendert in software (SwiftShader), dus dit is pessimistisch:

| Situatie | Frames per seconde |
|---|---|
| Nachtploeg, DPR 2, onbelast | 51 fps |
| DPR 2, CPU 4× vertraagd | 12 à 14 fps; het spel loopt dan op ongeveer 70% snelheid door de dt-cap |
| DPR 1, CPU 4× vertraagd | 42 fps |

Dat wijst op vulsnelheid. Elk frame wordt het volledige letterbox-canvas getekend (`drawImage(lbCanvas)` op schermgrootte × DPR), en in de Nachtploeg komt daar een radiaal verloop over het hele scherm bij.

**Fix:**
- De letterbox één keer als CSS-achtergrond tekenen, of op een tweede canvas eronder.
- Het nachtvignet cachen in een offscreen canvas.
- Eerst meten op een middenklasse-Android.

---

## Wens

### 25. Molenstenen en geribbelde walsen lijken op cirkelzaagbladen

Grijze schijven met gebogen groeven (1846/1867) of radiale tanden (1920 en later) lezen voor een leek als "korrel valt in zaagbladen". Dat botst met de warme toon.

**Screenshots:** `p02-intro-0.5s.png`, `p10-l2-play.png`, `f-L3-hitbox-3.png`, `v02-tsjoch-banner.png`.

**Voorstel:** in `drawRoll()` molenstenen tekenen als dikke liggende stenen (loper boven, ligger onder, spleet ertussen). Walsen glad met een subtiele asrichting-arcering, en de tanden aan de rand weglaten.

### 26. Doel van de silohal wordt niet uitgelegd

"ORDER" boven de gouden silo levert +250 op tegenover +50, maar nergens staat dat je daarop moet mikken. In molen 6 is de silo maar 1,2 s zichtbaar (molen 1: 3,0 s).

**Screenshots:** `v05-silo-approach.png`, `v06-silo-landing.png`.

**Voorstel:** de eerste keer een `tip('Mik op de gouden silo: daar wacht de bulkwagen.')` als `Wd.silo` zichtbaar wordt.

### 27. Overige wensen

- **Gezel-modus is in het spel niet te zien.** Toon een klein label "Gezel" in de HUD.
- **De jaartal-teller rolt bij een retry door lagere jaren.** In `drawIntro()` zie je 1846 → "1822" → 1867 door de extra omwenteling (`+10` bij `i >= 2`). Cosmetisch.
- **Hoge telefoons.** De logische hoogte van 720 laat 40 tot 70 px baksteen boven en onder staan. Een hogere schacht zou meer vooruitblik geven.

---

## Moeilijkheid (cijfers)

### Opzet van de simulatie

Ik heb bots gesimuleerd met reactievertraging, mikruis en de echte besturingsfysica (`human.js`). Plaatgaten voorspellen ze perfect. Dat is gul: echte mensen doen het in molen 3 t/m 5 slechter, want daar ontbreken de voorspellingsomtrekken.

| Profiel | Reactie | Mikruis | Toetsen |
|---|---|---|---|
| Nieuwkomer | 0,35 s | ±14 px | eens per 70 ms |
| Geoefend | 0,22 s | ±6 px | |

### Resultaten

| Molen | Spleet / snelheid / tijd tussen verdiepingen | Minimale slack (toetsen) | Uitkomst |
|---|---|---|---|
| 1846 | 114 px / 170 px/s / 2,0 s | 1,10 s | Nieuwkomers 6/6 gehaald (0 tot 2 hits). **Prima te doen voor een nieuwkomer**, eerder wat traag (ongeveer 27 s) |
| 1920 | 84 px / 250 px/s / 1,6 s | 0,87 s | Nieuwkomers 4/4 gehaald zonder hits |
| 2008 | 60 px / 360 px/s / 1,2 s | 0,39 s | Nieuwkomer met toetsen 1/2 game-over; geoefend 2/2 gehaald |
| 2026 | 48 px (marge ±16 px) / 420 px/s / 1,0 s | 0,18 s | Geoefend 6/6 gehaald (0 tot 2 hits); nieuwkomer toetsen 0/2, nieuwkomer muis/duim 1/2 |
| Nachtploeg | 60 → 42 px, 360 → 560 px/s, 1,1 → 0,8 s, **1 korrel** | toetsen 7% onhaalbaar met reactie | Geoefend sterft op verdieping 5 tot 46 (mediaan ongeveer 29). 100 verdiepingen is met toetsen nauwelijks haalbaar |

### Getallen die scheef voelen

**De sprong van 2008 naar 2026 is fors.** De spleet gaat −20% omlaag (`LEVELS[5].gap` 0,16) en de snelheid tegelijk +17% omhoog (`scroll` 420). Met `gap 0.17` en `scroll 400` loopt de curve vloeiender. Dankzij oneindige retries vanaf het checkpoint blijft het eindniveau wel haalbaar.

**De Nachtploeg combineert drie dingen tegelijk:**
- `nightLives: 1`;
- `gapMin 0.13`;
- `intMin 0.8`.

Zie bevinding 6.

**Wat in orde is:**
- De kortste spleet (41,6 px) houdt zich netjes aan de regel van 2,6 × de hitbox.
- `perfect: 0.4` is in molen 6 een venster van ±9,6 px rond het midden. Uitdagend, en dat hoort bij het laatste niveau.

---

## Wat goed werkt (zodat dat niet sneuvelt bij het fixen)

- **Nul fouten** in de console of als pageerror, in alle sessies (telefoon, desktop, donker thema, geen opslag, landschap, resize).
- **dt-cap en vaste stap.** Na een blokkade van 2 s schoof de wereld 0,017 s op en ging er geen korrel verloren. Ook een blokkade vlak boven een niet-uitgelijnde wals leverde geen extra hit of tunneling op.
- **Pauze bij een verborgen tab** werkt. Bij terugkeer blijft het spel gepauzeerd en wordt de AudioContext geschorst.
- **localStorage.** Met een getter die een exceptie gooit blijft alles werken, inclusief Nachtploeg en top 5 binnen de sessie.
- **Touch-besturing.** De relatieve besturing met pointer capture werkt, en scrollen binnen de kaarten werkt.
- **Dubbel tikken** op "It giet oan!" of "Nog een korrel?" is onschadelijk. De tweede tik valt op het canvas.
- **Na een herstart** zijn er geen oneerlijke hits. Gevaren worden gewist en de eerste verdieping komt pas na 3 s. Er spawnt nooit iets óp de korrel.
- **Generator voor de walsen.** In molen 1 t/m 6 is 0% van de verschuivingen onhaalbaar, ook met toetsenbord en 0,25 s reactie.
- **Donker thema.** Data-theme en de OS-instelling geven allebei leesbare kaarten, knoppen, toast en tekstveld (`d09` t/m `d15`, `e08` t/m `e10`).
- **Letterbox** met bakstenen en korenaren op desktop ziet er goed uit (`d01`).
- **Diverse onderdelen** zijn sterk: de banner "Tsjoch!" in de HUD-band, de silohal met bulkwagen, de weegbon en het jaarverslag.

---

## Eindoordeel

Technisch is dit een verrassend robuuste build: geen fouten, een eerlijke schacht in de zes molens, en de randgevallen houden allemaal stand. Een eerste molen haalt elke collega. Toch zou ik het **niet ongewijzigd** breed delen. Het omgekeerde uitmalingslabel (punt 1) is precies het soort fout waar molenaars direct over beginnen, en het ondermijnt de boodschap "witter = minder uitmaling" die het spel er zelf naast zet. De eerste ervaring op een telefoon begint met "Pijltjes, A/D of de muis" (punt 2), en op desktop start spatie het spel niet altijd (punt 3).

Met een korte fixronde op de punten 1 t/m 5 (ongeveer een middag werk, allemaal lokale wijzigingen) laat ik het met een gerust hart aan collega's zien. De rest kan als tweede ronde, met 6 en 7 als volgende prioriteit. Tot dan zou ik het hooguit als bèta aan een paar mensen geven.
