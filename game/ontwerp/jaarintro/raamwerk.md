# Raamwerk jaarintro's: uitleg voor de jaarmakers

Elk jaar van de tijdlijn (1846, 1867, 1920, 1976, 2008 en 2026) krijgt een korte jaarintro van twee shots. Het raamwerk staat al in het spel. Jij tekent alleen het beeld van je eigen jaar.

Mappen in deze uitleg (`$J` is de werkmap):

```sh
J=/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar
```

- Raamwerk: `$J/frame/korrelval.html`
- Jouw kopie: `$J/<jaar>/korrelval.html`. Maak die zo: `mkdir -p $J/1846 && cp $J/frame/korrelval.html $J/1846/`
- Scripts: `$J/frame/check/`
- Lees ook:
  - `$J/opdracht.md`: wat er in beeld moet;
  - `$J/regie.md`: vorm, ritme, camera, licht, titel, korrel en duik per jaar. Bij een verschil met je storyboard geldt de regie voor de vorm;
  - `$J/../mooi/stijlgids.md`: huisstijl, sfeer, snelheid en tekstregels.

## 1. Wat het raamwerk al doet

- **Speler.** De jaarintro gebruikt dezelfde speler als de hoofdintro: canvas `#introCv`, het paneel met kicker, ondertitel en stippen, Verder en Overslaan (onder Verder en rechtsboven), overvloeien bij Verder tijdens een beweging, de bescherming tegen een dubbeltik, Esc, de pijltjes, de lichte stand op trage telefoons, het zakken van de resolutie, verminderde beweging (alleen eindbeelden), aria-live en de beeldbeschrijving.
- **Volgorde.**
  - Eerste start: de hoofdintro, dan de duik, dan jaarintro 1846, dan de introband van 1846.
  - Weegbon, "Volgende molen": eerst de jaarintro van dat jaar, dan de introband.
  - Kies een molen: alleen als die jaarintro nog niet gezien is.
  - Nooit bij Nog een korrel? en nooit in de Nachtploeg.
- **Opslag.** Per jaartal in `save.jaarSeen` (bijvoorbeeld `{ 1846: 1 }`), in localStorage via `persist()`. Overslaan telt ook als gezien. Bestaande spelers krijgen elke jaarintro één keer.
- **Terugkijken.** In het Molenboek staat op de pagina van een bereikt jaar de knop "Bekijk de jaarintro". Bereikt betekent: al gezien, of de molen is uitgespeeld. Daarna kom je terug in het Molenboek, op dezelfde plek.
- **Ritme** (regie 2.1).
  - Shot 1 staat eerst 0,3 s stil. Direct na de hoofdintro niet: dan gaat de sluier open over een beeld dat al beweegt.
  - Shot 1 en shot 2 vloeien 0,32 s in elkaar over, van buiten naar binnen, zonder harde knip. Shot 2 beweegt meteen.
- **Knopteksten.**
  - Op het laatste shot heet de knop "It giet oan!" (klasse `ui-fries`).
  - Bij terugkijken vanuit het Molenboek heet hij "Terug naar het Molenboek" (gewone knop). De link eronder valt dan weg, want die zou hetzelfde zeggen.
  - Bij de eerste start heet de laatste knop van de hoofdintro "Terug in de tijd" (ook `ui-fries`), want daarna komt jaarintro 1846 nog. Zo betekent "It giet oan!" aan het eind van 1846 echt: nu speel je.
- **Dubbeltik.**
  - In de eerste 0,4 s van een jaarintro telt een tik op Verder, Overslaan of Esc niet. Een dubbeltik op Overslaan in de hoofdintro slaat 1846 dus niet mee over.
  - Na "Terug naar het Molenboek" neemt de Terug-knop van het boek 0,4 s geen klik aan.
- **Jaarteller.** Na een jaarintro rolt de teller op de introband van de vorige molen (molen 1: van 1800), niet nog eens van 2026 terug.
- **Geluid.** Het windje (alleen als het geluid aan staat) klinkt alleen in shot 1 (buiten), niet in shot 2 (binnen).
- **Snel openen.**
  - Terwijl de weegbon staat, bouwt het raamwerk de volgende jaarintro alvast in rustige tijd: paneel meten, `build`, de lucht scherp. Bij "Volgende molen" staat hij dan klaar: bij 4x vertraging staat het eerste beeld er na circa 100 tot 160 ms (was 320 tot 510 ms).
  - Moest een eerdere intro in deze sessie naar resolutie 1 (trage telefoon), dan begint de volgende jaarintro daar meteen.
  - Na het zakken van de resolutie tellen de eerste 3 frames niet mee voor de lichte stand.
- **De duik.** Na de laatste knop volgt de duik van 0,7 s (regie 2.7):
  1. Het raamwerk tekent het eindbeeld één keer zonder korrel (`env.noGrain`).
  2. De korrel valt in 0,3 s versnellend van `grainAt` in de opening (`diveAt`) en wordt iets kleiner.
  3. Het beeld zoomt in op de opening en kleurt naar de wandkleur van de molen (`LEVELS[i].pal.wall`: donker hout in 1846, groen in 1920).
  4. De sluier in dezelfde kleur gaat open naar de introband.
- **Kicker.** Plek en jaartal zonder komma, zoals "Halverwege 1846" op de verhaalkaart: "Holwerd 1846" en "In de rosmolen 1846". Het jaartal komt vanzelf in handschrift (La Belle Aurore).
- **Fouten.**
  - Gooit jouw gebied een fout bij het laden, dan valt alleen jouw jaarintro weg, met een melding in de console.
  - Gooit `draw` een fout, dan toont de speler een noodbeeld (lucht met jaartal) en werken de knoppen gewoon.
  - Doe je `save()` zonder `restore()`, dan zet de speler de stapel recht en meldt het één keer in de console.
  - Een fout in het verkleinen of bijtekenen stopt de animatielus niet meer (het volgende frame wordt eerst aangevraagd).
  - De tests zien al die meldingen als fout.

## 2. De regels

1. **Alleen je eigen gebied.** Pas alleen de regels aan tussen

   ```
   // ===== JAARINTRO 1846 BEGIN =====
   ...
   // ===== JAARINTRO 1846 EIND =====
   ```

   Laat de merkregels zelf staan. Laat ook de regels ertussen staan (`} catch ...`, de vijf regels "niet aanpassen: scheiding voor git merge-file" en `try {`). Die houden `git merge-file` zonder conflicten.
2. **Namen met je prefix.** Alle namen in je gebied beginnen met je prefix, ook constanten:

   | Jaar | Prefix |
   |---|---|
   | 1846 | `j46` |
   | 1867 | `j67` |
   | 1920 | `j20` |
   | 1976 | `j76` |
   | 2008 | `j08` |
   | 2026 | `j26` |

   Voorbeelden: `j46Kleur`, `j46Paard`, `j46Draw`. Je gebied staat in een eigen blok, dus botsen kan technisch niet, maar zo blijft het leesbaar en vindbaar.
3. **Alleen tekenen.**
   - Geen eigen `requestAnimationFrame`, `setTimeout`, eventlisteners, DOM-wijzigingen of localStorage. De speler roept `draw` aan.
   - Niets van buiten laden. Ook geen `new Image()` met een URL en geen lettertypen.
   - Gebruik de functies van het spel alleen via `env`. Uitzondering: losse rekenhulpjes zoals `mulberry32` en `mixHex`, die ook in `env` zitten.
4. **Altijd `save()` en `restore()` in paren.**
5. **Tekst en beeld volgens de opdracht.**
   - Kicker met plek en jaartal.
   - Ondertitel (`cap`) van 15 tot 24 woorden, in gewoon Nederlands (regie 2.10).
   - Een `desc` voor schermlezers: één zin die begint met "Beeld:".
   - Feiten met een bron in het onderzoek.
   - Licht thema is dag, donker thema is avond.
   - Geen anachronismen en geen gezichten van echte personen.
   - Geen tonnages in de intro.
   - Herhaal niet wat de introband (`LEVELS[i].intro`/`supply`) of het verhaal (`STORIES`) al zegt.

## 3. De interface

Je gebied meldt één film aan:

```js
jxFilm(1846, {
  shots: [
    { dur: 4.4, kicker: 'Holwerd 1846', cap: 'Ondertitel van shot 1.', desc: 'Beeld: wat je ziet in shot 1.' },
    { dur: 5.4, kicker: 'In de rosmolen 1846', cap: 'Ondertitel van shot 2.', desc: 'Beeld: wat je ziet in shot 2.' },
  ],
  build: j46Build,              // optioneel: voortekenen
  draw: j46Draw,                // verplicht: één frame
  grainAt: env => [env.W / 2, env.P * 0.42, env.P * 0.09 / 26], // de korrel aan het eind van shot 2: x, y (css-px) en schaal
  diveAt: env => [env.W / 2, env.P * 0.64],                      // het midden van de opening recht onder de korrel
});
```

- **`shots`**: twee shots. Eerst buiten (de plek en het gebouw, met de aanvoer), dan binnen (de aandrijving). Het tweede shot eindigt in de molen, met de korrel boven de opening.
  - `dur` is de duur van de camerabeweging in seconden: 4,4 tot 5,4, zie de tabel in regie.md. Daarna blijft het beeld staan tot Verder.
  - `kicker`: plek en jaartal zonder komma (regie 2.5). Shot 1 de plek ("Holwerd 1846"), shot 2 de ruimte ("In de rosmolen 1846"). De stubs hebben de kickers en duren uit de regie al.
  - `cap`: 15 tot 24 woorden.
  - `desc`: één zin die begint met "Beeld:".
- **`build(env)`**: hier teken je statische lagen voor op offscreen-canvassen, in `env.cache`.
  - Komt bij het openen, en opnieuw als het thema verandert. `env.cache` is dan weer leeg.
  - **Vooraf.** Bij "Volgende molen" draait `build` meestal al eerder, terwijl de weegbon staat (in rustige tijd), met de maat en het thema van straks. Laat `build` dus alleen afhangen van `env`, niet van de tijd of van het spel.
  - **Maat.** Verandert alleen de maat (venster slepen, draaien), dan komt `build` pas 150 ms na de laatste wijziging, en niet zolang de draaimelding staat. Tot dan tekent `draw` met de oude plaatjes bij de nieuwe `W`, `H` en `P`. Ga er in `draw` dus niet van uit dat een plaatje precies de maat van nu heeft.
  - **Resolutie.** Zakt alleen de resolutie (trage telefoon), dan komt `build` niet opnieuw. Plaatjes uit `env.canvas` worden op css-maat gekopieerd en blijven dus goed; de lucht wordt één keer verkleind. Gebruik daarom altijd `g.drawImage(c.cv, x, y, c.w, c.h)` en geen eigen apparaat-px.
  - **Wat het raamwerk vrijgeeft.** Het raamwerk verkleint en wist alleen wat het zelf maakte: `env.canvas` en `env.sky`. Andere dingen in `env.cache` (eigen canvassen, paletten, ook met een sleutel als `sky` of `cv`) raakt het niet aan; die ruimt de garbage collector op. Maak grote plaatjes dus met `env.canvas`, dan komen ze meteen vrij.
  - Houd `build` onder circa 100 ms bij 4x vertraging. Voor 1846 gebeurt het onder de donkere overgang na de hoofdintro; bij de andere jaren meestal vooraf (zie hierboven), maar via Kies een molen of het Molenboek direct na de klik.
- **`draw(g, env, shot, t)`**: één frame.
  - `g` is de 2D-context van het beeld. De transformatie staat al op css-px.
  - `shot` is 0 of 1.
  - `t` is het aantal seconden sinds het begin van het shot, van 0 tot `dur`. Na de beweging blijft `t` op `dur`. Bij verminderde beweging is `t` altijd `dur`.
  - Wat je aan `g` verandert (alpha, transformatie, compositie, knippen), zet de speler daarna terug.
  - In shot 1 roep je `env.title(g, t)` aan (het jaartal met de potloodstreep). In shot 2 `env.grainLand(g)` (de korrel).
- **`grainAt`**: `[x, y, schaal]` van de korrel in het eindbeeld van shot 2 (regie 2.6):
  - x op 50% (hooguit 3% ernaast), y tussen 32 en 52% van `P`;
  - schaal zo dat hij circa 9% van `P` hoog is: `env.P * 0.09 / 26`. Laat je de schaal weg, dan is dat de standaard.
  - `env.grainLand` tekent hem daar, en de duik laat hem daarvandaan vallen.
- **`diveAt`**: `[x, y]`, het midden van de opening recht onder de korrel: het oog van de steen, het kropgat of de spleet tussen de walsen (per jaar in regie.md). Niet de korrel zelf.
- **`env.noGrain`**: op het eerste frame van de duik tekent het raamwerk je eindbeeld één keer met `env.noGrain = true` en bewaart het. Teken dan geen korrel, ook geen gloed of schaduw ervan. `env.grain` en `env.grainLand` slaan zichzelf dan al over.
- **`dive: 'eigen'`** kan technisch nog (je tekent de duik dan zelf, met `env.dive` van 0 tot 1), maar de regie wil zes gelijke duiken. Gebruik het dus niet.

### Wat je krijgt in `env`

| veld | betekenis |
|---|---|
| `W`, `H` | breedte en hoogte van het hele canvas (css-px) |
| `P` | hoogte van het beeld boven het ondertitelpaneel. Componeer daarin; het beeld loopt door tot `H`, deels onder het paneel |
| `hv` | tot hier is het beeld te zien (onder een dicht paneel tekent de speler niets) |
| `dpr` | resolutie; zakt op een trage telefoon (dan komt `build` opnieuw) |
| `dark` | `true`: donker thema = avond; `false`: dag |
| `lite` | `true`: trage telefoon, laat sierdetails weg |
| `calm` | `true`: verminderde beweging (alleen eindbeelden, `A` staat stil) |
| `A` | seconden sinds het openen; loopt ook als het beeld stilstaat (water, wind, meeuwen) |
| `u`, `dur`, `t`, `shot` | voortgang `t / dur` (0 tot 1), duur, tijd en shot |
| `noGrain` | `true` op het ene frame waarin het raamwerk het eindbeeld voor de duik bewaart: teken dan geen korrel |
| `cache` | `{}` voor je eigen plaatjes |
| `jobs` | werk in stapjes. `build` mag er een generator in zetten (met `yield` tussen de stukken), bijvoorbeeld om een zware laag of de eerste keer van een functie vooraf te doen. Het raamwerk draait hem in rustige tijd: bij de weegbon (voorbouwen), of vanaf 1 s in shot 1, circa 6 ms per frame. 1846 doet dat met `j46Warm` (de deur) |
| `base` | de kleuren van de hoofdintro (`ICOL.light` of `ICOL.dark`), handig als basis |
| `font` | `{ ui, hand }`: Nunito en La Belle Aurore |
| `year`, `i` | jaartal en index in `LEVELS` |

## 4. De hulpjes

Alles roep je aan via `env`. Coördinaten zijn css-px, tenzij er wereld staat.

### Rekenen en easing

| hulpje | wat het doet |
|---|---|
| `env.ease.out(x)` | snel op gang, zacht tot stilstand |
| `env.ease.io(x)` | zacht op gang en zacht tot stilstand (cosinus) |
| `env.ease.soft(x)` | nog zachter (smootherstep, zoals de hoofdintro) |
| `env.clamp(v, a, b)`, `env.lerp(a, b, t)` | begrenzen en mengen van getallen |
| `env.mix('#hex1', '#hex2', t)` | kleur mengen, geeft `rgb(...)` |
| `env.rgba('#hex', a)` | kleur met dekking |
| `env.rnd(seed)` | vaste toevalsreeks (`mulberry32`); elke frame hetzelfde, dus geen flikkering |

### Camera en wereldcoördinaten

```js
const cam = env.camMix(env.box([-330, 330, -320, 60]), env.box([-150, 150, -190, 30]), env.ease.soft(env.u));
env.view(g, cam);        // vanaf nu wereldcoördinaten (grond op y 0, omhoog is negatief)
g.fillRect(-70, -100, 140, 100);
env.view(g, cam, 800);   // laag verder weg (dz 800): schuift en schaalt minder
const [x, y] = env.toScreen(cam, 0, -60); // wereldpunt naar css-px
env.css(g);              // terug naar css-px
```

- `env.box([x0, x1, y0, y1])` geeft een camera `{ x, y, k }` die dat wereldvak precies in `W` x `P` laat passen.
- `env.camMix(a, b, u)` geeft een camera ertussen. De zoom gaat op een log-schaal, zodat hij gelijkmatig voelt.
- `env.scale(cam, dz)` is de schaal van een laag op diepte `dz`. Dit is hetzelfde brandpuntmodel als de hoofdintro.

### Voortekenen en bewaren

```js
// in build: een statische laag één keer tekenen
const m = env.cache.molen = env.canvas(160, 140); // { cv, g, w, h }; m.g staat al op css-px
m.g.fillStyle = '#6B4A2B'; m.g.fillRect(20, 50, 120, 90);
// in draw: kopiëren (ook geschaald of in wereldcoördinaten)
g.drawImage(m.cv, x, y, m.w, m.h);
```

`env.still(g, key, q => { ... })` bewaart een heel beeld.

- `paint(q)` draait één keer per `key`, formaat en thema. Daarna is het elk frame een kopie.
- Handig voor het eindbeeld: teken dan alleen wat nog leeft (water, stof, wiel) erbovenop.
- Neem het shot op in `key`, bijvoorbeeld `'eind' + shot`.

### Lucht en wolken (zoals de hoofdintro)

```js
// in build
env.cache.lucht = env.sky({ cloudSeed: 46 });  // standaard: de lucht van de hoofdintro (dag, of avond met maan in donker)
// in draw: horizon op y (css-px), wolken drijven langzaam (drift 0 tot 72 css-px)
env.drawSky(g, env.cache.lucht, yHorizon, env.A * 2);
```

**Snel openen met een scherpe lucht.** Op een scherm met dpr boven 1 tekent `env.sky` in `build` nog niets. De eerste `env.drawSky` tekent de lucht op resolutie 1, wat circa een derde van het werk is. Na de eerste twaalf frames (als de speler besloten heeft of de resolutie zakt) tekent het raamwerk de volle resolutie bij, een wolk per stapje. Dat gebeurt tijdens de beweging alleen als jouw `draw` weinig tijd kost (onder 8 ms per frame); anders op het stilstaande eindbeeld. Op een snelle telefoon is de lucht na circa een halve seconde scherp. Bij het vooraf bouwen (weegbon) gebeurt dat allemaal al in rustige tijd, bij verminderde beweging meteen. Wat dat voor jou betekent:
- Teken de lucht in `draw` met `env.drawSky`, dan gaat dat vanzelf goed.
- `env.still` wordt opnieuw gemaakt zodra de lucht scherp is.
- Bak je de lucht zelf in een eigen plaatje, doe dat dan pas als het beeld stilstaat, of gebruik `env.still`. Anders blijft de grove lucht in jouw plaatje staan.
- Wil je zelf op de lucht tekenen (een ster, een gloed), gebruik dan gewoon `.cv` en `.d`. De eerste keer dat je die opvraagt, tekent het raamwerk de lucht meteen, en maar één keer, op volle resolutie. Zo gaat jouw werk niet verloren, maar het openen zonder voorbouwen (Kies een molen, het Molenboek) is dan niet sneller.
- Het luchtobject is van het raamwerk. Gebruik alleen `cv`, `d`, `up` en `c`, en geef het alleen aan `env.drawSky`.

Opties van `env.sky(o)`:

| optie | betekenis |
|---|---|
| `c` | kleuren. Wat je weglaat, komt uit de hoofdintro (dag of avond): `sky: [boven, midden, horizon]`, `glow: 'rgba(r,g,b,'` (warme gloed laag aan de hemel), `sun` (zon of maan), `star: 'rgba(r,g,b,'`, en de wolkkleuren `cTop`, `cBody`, `cShade`, `cBase` |
| `night` | maan en sterren in plaats van de zon (standaard `env.dark`) |
| `sunX`, `sunH`, `sunR` | plek van zon of maan: css-px vanaf links, hoogte boven de horizon, straal. `sun: false` geeft geen zon of maan |
| `stars` | aantal sterren (80) |
| `glow` | dekking van de gloed (0,38 dag, 0,3 avond) |
| `moonGlow`, `sunGlow`, `sunCore` | kleuren van de gloed rond maan en zon |
| `clouds` | wolkrijen (zie `IX_CLOUDS` in 11b). `false` geeft een heldere lucht |
| `cloudSeed` | andere wolken |
| `up`, `below` | css-px boven en onder de horizon in het plaatje (standaard `0,86 P + 40` en 150) |

Een avondlucht van 1846, zonder stad (de lucht heeft nooit een stad; die zit in aparte lagen):

```js
env.sky({ night: true, stars: 40, cloudSeed: 46, c: { sky: ['#1E2A3E', '#5B4A5E', '#D9905A'], glow: 'rgba(255,170,100,',
  sun: '#F6E7B0', star: 'rgba(255,248,230,', cTop: '#8E8296', cBody: '#5E5670', cShade: '#3E3A52', cBase: '#C07A50' } });
```

`env.cloud(t, seed, w, h, c, waas, zacht)` tekent één stapelwolk op hulpcanvas `t` (maten in apparaat-px) en geeft `[breedte, hoogte]` terug. Gebruik het voor een losse wolk in je eigen laag.

### Waas (luchtperspectief)

`env.haze(afstand, near, span, max)` geeft 0 tot `max`: hoe verder weg, hoe meer waas. De standaard is die van de hoofdintro (1500, 5200, 0,3). `env.mixC(kleur, naar, t)` mengt een hex-kleur naar de waaskleur. Het resultaat wordt onthouden, dus het is goedkoop per frame.

```js
g.fillStyle = env.mixC('#8E4A32', env.base.haze, env.haze(afstand));
```

### Water

```js
env.water(g, y0, y1, { refl: [[x, breedte]], lit: env.dark ? [xRaam] : null, k: schaal });
```

- Tekent water van `y0` tot `y1` over de hele breedte, met gebroken weerspiegeling, rimpels en glinsteringen, zoals in de hoofdintro.
- `c` zijn de kleuren `{ water, ripple, refl, glint, lit }` (standaard die van de hoofdintro).
- `refl` is de donkere weerspiegeling van een gebouw. `lit` zijn verlichte ramen 's avonds.
- `ripples` (28) en `glints` (26) stellen de aantallen in. Glinsteringen vallen weg in de lichte stand.

### Meeuwen, stof en lichtbundels

```js
env.gulls(g, [[60, 90, 1, 0.3], [150, 64, 0.8, 1.9]], { col: '#3A3D41' }); // [x, y, tempo, fase]
env.dust(g, j46Stof, { col: 'rgba(255,240,210,.7)', r: 1.3 });            // [x, y, fase]
env.rays(g, { x: W * 0.4, top: P * 0.3, u: 1, beam: 'rgba(255,220,150,', mote: 'rgba(255,236,200,', motes: 30 });
```

- **Meeuwen** slaan een paar keer met hun vleugels en zweven dan. Ze drijven langzaam mee en komen rond de rand terug. `size` is de halve spanwijdte (9,5); `drift: false` laat ze op hun plek.
- **Stof** zijn stofjes die met de wind meedrijven. Houd het onder circa 60 stuks; in de lichte stand tekent het hulpje de helft.
- **Lichtbundels** schijnen schuin naar beneden, met stofjes erin, zoals door het raam in shot 3 van de hoofdintro. Ze passen goed bij "daglicht tussen de planken" in 1846.
  - Opties: `beams: [[x, breedte, sterkte], ...]`, `ang`, `len`, `rise`, `a` (sterkte 0 tot 1), `str`, en `motes` (0 geeft geen stofjes).
  - Met `world: true` teken je in je eigen transformatie.

### De korrel

```js
env.grainLand(g); // in shot 2: de korrel op grainAt, volgens regie 2.6
```

- `env.grainLand(g)` komt in de laatste 0,8 s van de beweging van shot 2 van boven in beeld. Hij valt circa 4% van `P` versnellend, veert één keer zacht na (0,6%) en hangt dan stil, met hooguit 1 px wiegen. 0,4 s nadat hij stilligt knippert hij, daarna om de 3,4 s. Bij verminderde beweging ligt hij al op zijn plek.
- Teken wat hem afdekt (de rand van een koker of schudbak) erna. Een warme gloed 's avonds teken je zelf, vooraf.
- `env.grain(g, x, y, schaal, { joy, blink })` is dezelfde korrel als in het spel (`drawGrain`), voor andere momenten. Op schaal 1 is hij 20 x 26 css-px.
- Beide slaan zichzelf over bij `env.noGrain`.

### De titel

```js
if (shot === 0) env.title(g, t);                       // het jaartal in de lucht
env.title(g, t, { y: env.P * 0.16, donker: true });   // eigen hoogte; lichte letters voor een donkere ondergrond
```

Het jaartal staat alleen aan het begin van shot 1 in beeld (regie 2.5):
- La Belle Aurore, circa 20% van min(`W`, `P`), op x 50% en standaard y 18% van `P`. Kies de rustigste plek, meestal de lucht.
- Overdag in #1D1E1F op 75%, 's avonds (of met `donker: true`) in #F9F4DB op 90%.
- Eronder loopt een potloodstreep in mosterdgoud #C5AA20 van links naar rechts.
- Tijden: in van 0,1 tot 0,4 s, streep van 0,3 tot 0,7 s, weg van 1,1 tot 1,6 s.
- Niet bij verminderde beweging (dan staat het jaartal alleen in de kicker).
- Roep hem als laatste aan, boven op je beeld. De letters staan één keer voorgetekend.

Teken zelf geen groot jaartal: de stubs deden dat eerst, dat is eruit.

## 5. Een compleet voorbeeld

`$J/frame/check/voorbeeld-1846.js` is een heel gebied dat alle hulpjes gebruikt:

- licht: dag; donker: een avondlucht van 1846;
- meeuwen;
- een voorgetekende molen in wereldcoördinaten;
- water met weerspiegeling en een verlicht raam;
- de titel;
- binnen lichtbundels met stofjes, het oog van de steen en de korrel (`grainAt`, `grainLand`, `diveAt`).

Beelden staan in `$J/frame/check/voorbeeld/` (`sheet-*.png`). De stub die nu in elk gebied staat, is nog kleiner, maar heeft het hele ritme al: lucht, een rechthoek als gebouw, de titel, een camerabeweging, binnen een machine met een opening, en de korrel die landt en in de duik voorop valt. Begin bij een van de twee en vervang alles.

```js
// ===== JAARINTRO 1846 BEGIN =====
const j46Buiten = [[-330, 330, -320, 60], [-150, 150, -190, 30]];
const j46Binnen = [[-280, 280, -230, 130], [-120, 120, -130, 40]];
const j46Eind = env => env.box(j46Binnen[1]); // de camera van het eindbeeld van shot 2
function j46Build(env) {
  env.cache.lucht = env.sky({ cloudSeed: 1846 });
}
function j46Draw(g, env, shot, t) {
  const { W, H } = env, u = env.ease.soft(env.u);
  if (shot === 0) {
    const cam = env.camMix(env.box(j46Buiten[0]), env.box(j46Buiten[1]), u), [, yh] = env.toScreen(cam, 0, 0);
    env.drawSky(g, env.cache.lucht, yh, env.A * 2);
    g.fillStyle = env.dark ? '#2E3322' : '#A7B06E'; g.fillRect(0, yh, W, H - yh);
    env.view(g, cam); g.fillStyle = '#8A6440'; g.fillRect(-70, -100, 140, 100);
    env.title(g, t);
  } else {
    const cam = env.camMix(env.box(j46Binnen[0]), env.box(j46Binnen[1]), u);
    g.fillStyle = env.dark ? '#1E150C' : '#5A4128'; g.fillRect(0, 0, W, H);
    env.view(g, cam); g.fillStyle = '#9A9488'; g.fillRect(-90, -30, 180, 70);
    g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(-16, -30, 32, 10); // de opening
    env.grainLand(g);
  }
}
jxFilm(1846, { shots: [ /* zie hierboven */ ], build: j46Build, draw: j46Draw,
  grainAt: env => [...env.toScreen(j46Eind(env), 0, -52), env.P * 0.09 / 26],
  diveAt: env => env.toScreen(j46Eind(env), 0, -25) });
// ===== JAARINTRO 1846 EIND =====
```

## 6. Kijken: het screenshotscript

```sh
cd $J/frame/check
NODE_PATH="$(npm root -g)" node kijk-jaar.js $J/1846/korrelval.html 1846 $J/1846/kijk
```

- Per shot maakt het script het begin, 25, 50 en 75 procent en het eindbeeld. In shot 1 maakt het ook de titel (t = 0,5 s).
- Daarna de duik: 15 en 30 procent (de korrel valt) en 50, 75 en 95 procent (inzoomen en kleuren).
- Formaten: 360x640 licht, 400x800 donker, 1280x800 licht en 1280x800 donker. Per formaat komt er ook een overzichtsvel `sheet-*.png`.
- Alleen enkele formaten: voeg `a,b,c,d` toe (a = 360x640 licht, b = 400x800 donker, c = 1280x800 licht, d = 1280x800 donker). Een vijfde argument zet de dpr, bijvoorbeeld `2`.
- Het jaar mag als index (0 tot 5) of als jaartal.
- De klok van de pagina loopt alleen als het script tikt, dus twee keer draaien geeft precies dezelfde beelden. Vergelijk voor en na zo: `compare -metric AE a.png b.png null:`.
- Bekijk de beelden zelf, bijvoorbeeld met de Read-tool. Kijk vooral naar 360x640 (het paneel dekt veel af) en 1280x800 (veel ruimte opzij).
- De afsluitcode is 1 als er een fout in de console stond.

## 7. Snelheid: het fps-script en het budget

```sh
NODE_PATH="$(npm root -g)" node fps-jaar.js $J/frame/korrelval.html $J/1846/korrelval.html 1846 3
```

- Het script meet op 400x800, dpr 2, met 4x CPU-vertraging (CDP `Emulation.setCPUThrottlingRate`). Oud en nieuw gaan om en om, in 3 rondes.
- Per shot meet het tijdens de beweging en 1,5 s op het stilstaande eindbeeld. Daarna meet het de duik.
- Ter vergelijking meet het ook shot 1 van de hoofdintro (`hoofdShot1`).
- Je krijgt fps, de p95 en het langste frame, en aan het eind de mediaan van oud tegen nieuw.
- Extra opties: `donker` als zesde argument, en `RATE=8` vooraan voor een heel trage telefoon.

**Het budget per jaar:**

- **Niet zwaarder dan shot 1 van de hoofdintro.** Elk shot haalt minstens de fps van `hoofdShot1` in dezelfde meting, en de p95 blijft hooguit 33 ms. Nu haalt `hoofdShot1` circa 55 fps, en de stub ook (shot 1 circa 55, shot 2 circa 60, de duik circa 55). De echte getallen staan in `$J/verslag-raamwerk.md`.
- **Statische lagen voortekenen** in `build` (`env.canvas`, `env.sky`) of met `env.still`. Per frame alleen kopiëren en wat echt beweegt.
- **Geen `ctx.filter`, `shadowBlur` of blur per frame**, en geen nieuwe verlopen per frame als het ook vooraf kan.
- **Hooguit circa 60 deeltjes** (stof, korrels, glinsteringen).
- **Lichte stand.** Laat bij `env.lite` sierdetails weg. De speler zet hem aan als de telefoon te traag blijft.
- **Grote geschaalde `drawImage` van het hele beeld is duur.** Bij 4x kost een geschaalde kopie met gladmaken circa 19 ms tegen 2 ms voor een kopie op ware grootte. Schaal liever kleine lagen.
- **`build` onder circa 100 ms** bij 4x vertraging. Bij Volgende molen merk je er weinig van (vooraf gebouwd: het eerste beeld komt bij 4x na circa 100 tot 160 ms), maar via Kies een molen of het Molenboek draait `build` direct na de klik. Zonder voorbouwen kwam het eerste beeld bij de jaren 1867 tot 2026 (zoals ze nu in `final` staan) na 160 tot 540 ms; het snelst bij de jaren die de lucht alleen met `env.drawSky` tekenen en verder weinig in `build` doen (2008: `build` 32 ms, eerste beeld circa 160 ms). Meet het met `bouw-ab.js` (zie 8).

## 8. Tests

Alle scripts draai je vanuit elke map met `NODE_PATH="$(npm root -g)"`.

| script | wat het doet |
|---|---|
| `node $J/frame/harness.js <html> <uitmap>` | telefoon en desktop: start, de hoofdintro en de jaarintro overslaan, spelen, game-over en opnieuw. `report.json` moet `started`, `gameOver` en `restarted` true hebben, zonder errors |
| `node $J/frame/nieuwkomer.js <html> <uitmap>` | de hele weg van een nieuwe speler, met de jaarintro van 1846 en 1867, het Molenboek, 360x640 en een bestaande speler. Moet alle controles GOED geven (nu 65) |
| `node $J/frame/check/reduced.js <html> <uitmap>` | verminderde beweging, pijltjes, Esc, overvloeien, thema en formaat wisselen tijdens de jaarintro |
| `node $J/frame/check/rook-jaren.js <html>` | opent alle zes jaarintro's in licht en donker, tekent elk shot en de duik, en sluit ze weer. Geen fouten |
| `node $J/frame/check/kijk-jaar.js <html> <jaar> <uitmap>` | de screenshots (zie 6) |
| `node $J/frame/check/fps-jaar.js <oud> <nieuw> <jaar> 3` | de snelheid (zie 7) |
| `python3 $J/frame/check/merge-proef.py <html> <uitmap>` | zes makers tegelijk samenvoegen met `git merge-file`: 0 conflicten |
| `node $J/frame/check/open-jaar.js <html> [wacht] [jaren]` | het openen bij 4x vertraging: van de klik op Volgende molen tot het eerste beeld, en de keten na de hoofdintro. Met `wacht` 2500 (lang op de weegbon, voorgebouwd) of 300 (direct klikken) |
| `node $J/frame/check/bouw-ab.js <oud> <nieuw> [rondes]` | openen zonder voorbouwen (zoals via Kies een molen of het Molenboek), oud tegen nieuw: de tijd van `build` en van de klik tot het eerste beeld, per jaar |
| `node $J/frame/check/lite-ab.js <oud> <nieuw> <jaarindex> [rondes]` | gaat de lichte stand aan (3 s na het openen, 4x CPU), oud tegen nieuw |
| `node $J/frame/check/valkuil.js <html>` | de valkuilen: een `sky` in `env.cache` bij een zakkende resolutie, een fout bij het verkleinen, venster slepen, telefoon dwars, en of de lucht scherp wordt (ook bij verminderde beweging) |
| `node --check` | op het uitgepakte script. Het bestand begint met `<title>` en heeft geen doctype, html, head of body |

Het script uitpakken voor `node --check`:

```sh
python3 -c "import re,sys;s=open(sys.argv[1]).read();open('/tmp/kv.js','w').write(re.search(r'<script>\n(.*)</script>',s,re.S).group(1))" $J/1846/korrelval.html && node --check /tmp/kv.js
```

### Testhaken

Gebruik ze zelf in een Playwright-script:

| haak | wat het doet |
|---|---|
| `window.__korrelval.jaar(i)` | opent jaarintro `i` (0 = 1846 ... 5 = 2026). Het einde gaat naar het menu |
| `window.__korrelval.jaarAt(i, shot, t)` | houdt shot `shot` vast op tijd `t` |
| `jaarAt(i, 'duik', p)` | de duik op `p` (0 tot 1) |
| `jaarAt(null)` | loslaten |
| `window.__korrelval.jaarState()` | de toestand: `{ open, jaar, year, from, shot, shots, t, dur, moving, dive, frames, loop, seen, seenYears, films, reached, kicker, picH, lite, fade, errors, knop, dpr, skies, jobs, pre, voorgebouwd, slowSeen, wind, teller }`. `fade` is de tijd sinds het laatste overvloeien (onder 0,32 vloeit het beeld nog over). `errors` noemt de jaren waarvan `draw` of `build` een fout gaf. `pre` is het voorbouwen bij de weegbon, `skies` de resolutie van elke lucht, `teller` het jaar waarvandaan de introband telt |

## 9. Samenvoegen

De hoofdbouwer voegt de zes kopieën samen met `git merge-file` tegen `$J/frame/korrelval.html`. Dat gaat zonder conflicten zolang iedereen alleen binnen de eigen merkregels werkt.

De proef `merge-proef.py` doet dat al: zes makers herschrijven hun gebied, twee buren zelfs helemaal. Dat gaf 0 conflicten, en het samengevoegde script is geldig.

Moet er toch iets buiten je gebied veranderen, bijvoorbeeld een nieuw hulpje in het raamwerk? Vraag het dan aan de hoofdbouwer. Bouw het niet zelf.

## 10. Bewuste keuzes na de eindreview (nazorg)

- **Laden: de zes gebieden worden gewoon meteen gecompileerd.** De review stelde voor ze in een `<script type="text/plain">` te zetten en pas later met `new Function` te compileren. Dat doen we niet:
  - `new Function` werkt alleen als de pagina eromheen `'unsafe-eval'` toestaat. De gastpagina (het artifact, of een iframe op de site) kan een CSP zonder `'unsafe-eval'` opleggen, en dan vallen alle zes jaarintro's weg.
  - De prijs, gemeten bij 4x vertraging (mediaan van 6 rondes, oud spel tegen nu): script parsen en uitvoeren 483 tegen 746 ms, eerste verf 584 tegen 820 ms, eerste demobeeld 812 tegen 1081 ms, gzip 253 tegen 428 kB. Op een trage telefoon staat het titelscherm dus circa 0,26 s later. Dat accepteren we.
  - Wordt het ooit te zwaar, verplaats dan eerst grote vaste tabellen of tekeningen uit de gebieden naar `build` (lui), niet het hele gebied naar tekst.
- **Voorbouwen.** `jxPrewarm(i, wacht)` begint na `wacht` ms: 1100 op de weegbon (na het optellen van het totaal, 700 ms), 400 op Kies een molen. Kies een molen bouwt de verste molen waarvan de jaarintro nog niet gezien is (meestal de chip met de focus). Staat diezelfde jaarintro al klaar (weegbon, dan Menu, dan Kies een molen), dan blijft hij staan.
- **Trage telefoon onthouden.** Moest een intro op dit apparaat ooit naar resolutie 1 (`introCap`), dan staat `save.slowIntro` aan en begint elke jaarintro daarna meteen op resolutie 1, ook vanuit het Molenboek of Kies een molen in een nieuwe sessie.
- **Wind en meeuw.** M (geluid aan) en weer in beeld scrollen zetten de wind alleen aan waar hij hoort: de hoofdintro buiten de duik, en shot 1 (buiten) van een jaarintro (`ixWindWanted`). In een jaarintro klinkt daarbij nooit een meeuw.
