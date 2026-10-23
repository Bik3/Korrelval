# Verslag jaarintro 2026 (Molen B)

Werkbestand: `jaar/2026/korrelval.html`. Alleen het gebied tussen `JAARINTRO 2026 BEGIN` en `EIND` is veranderd (710 regels met de merkregels); buiten het gebied is het bestand gelijk aan `frame-base.html`. Alle namen beginnen met `j26`. De bron van het gebied staat ook los in `scratchpad/j26tools/j26.js`, met `splice.py` om het in te zetten.

## Wat ik tekende

**Eigen camera met perspectief** (meters, x rechts, y = -hoogte, z = diepte achter de gevel van Molen B): een laag op één diepte is een gewone schaal, en de grond, het dak en het plafond zijn vlakken in perspectief. Daardoor zakt de voorgrond echt weg als je stijgt, en zie je het dak pas als je erboven bent. Alle vormen staan als Path2D klaar in `build`. Per frame wordt er alleen gevuld en bewogen. Beide eindbeelden staan bewaard met `env.still`; daarboven leeft alleen wat beweegt.

**Shot 1, Leeuwarden 2026 (5,2 s).**
- **Begin:** op de noordoever (Kanaalweg), op ooghoogte, achter de kijkers. Het fietspad is afgezet met rood-wit lint. Drie silhouetten met helm en hesje: één wijst omhoog, één met een portofoon bij de helm, één met de handen in de zij. Er staan een bouwlamp en twee lantaarnpalen. Overdag vallen hun lange winterschaduwen naar rechts.
- **Aan de overkant:** het kanaal, met de weerspiegeling van de lichte gevels. Dan de smalle kade: een stalen damwand met een betonnen deksloof, een zwarte wrijfgording en buispalen in het water. Op de kade de hijsplek met rijplaten, twee wachtende walsenstoelen op balken, bouwketen, een container, pallets en gevelpanelen.
- **De gevelrij, vlak aan het water, op dezelfde plek als in 2008** (van links naar rechts):
  - witte oude panden met kleine raampjes en deuren;
  - de grijze silo's: vijf cellen, de trappentoren en vier cellen;
  - een smalle strook van de molen uit de jaren zestig (de roggemolen), met zijn raamrijen;
  - Molen B: lichtgrijs, met panelen, een strook smalle ramen, een lamellenband bovenin en een roldeur;
  - de molen uit 2008, dicht, zonder ramen en deuren;
  - de silotoren met raampjes, laaddeur en cellen;
  - het bakstenen pand, de loods en de buren;
  - verder weg de bruine schoorsteen van de buurfabriek en de stad in de winternevel.
- **Kraan:** de oranje torenkraan staat in de bouwput achter de gevelrij. Zijn mast komt boven de silo's en de strook van de roggemolen uit, en de giek reikt tot net voorbij de opening in het dak van Molen B.
- **Beweging:** de camera stijgt, gaat over het water, maakt halverwege een bocht naar de kraanmast toe en schuift naar het dak. Halverwege zie je het hele gebouw met de last boven het dak. De zoom op het vlak van de last is circa 5,5 keer.
- **Eind:** 2,2 m boven het dak. De walsenstoel hangt aan de haak (juk, stroppen, haakblok) tegen de lege winterlucht en slingert zacht (±0,6°, 3,6 s). Onder hem ligt de donkere opening met een gele leuning. Twee mensen staan naast de opening: links met het zakgebaar, rechts met een portofoon. Rond het dak ligt de stad laag en wazig.
- **Licht:** een heldere winterdag met een bleke lage zon links, platte wolken (iCloud, `cloudSeed` 2026) en lange schaduwen naar rechts.
- **Donker:** het blauwe uur zonder wolken, met sterren bovenin en een warme strook bij de horizon. Er branden rode lampjes op de kraan, lantaarns, verlichte ramen en stadslichtjes, en de opening gloeit warm. De bouwlamp schijnt met een zachte bundel over het water naar de hijsplek.

**Shot 2, In Molen B 2026 (5,0 s).**
- **Begin:** onder de sparing. Een lichtschacht gaat omhoog naar de lucht (gestileerd) en de walsenstoel zakt in een bundel licht. Twee mensen leiden hem met touwen en een derde wijst naar de gele vloermarkering. Achter staat een rij walsenstoelen met cyaan schermpjes, ledjes, motorkappen en RVS-buizen door het plafond, met ledpanelen en een kabelgoot. Vooraan staan twee walsenstoelen als dichte kasten, met bovenkant en zijdeuren.
- **Beweging:** de stoel landt na 3,2 s, de stroppen worden slap en de touwhouders stappen achteruit. De camera zakt mee, passeert de landende stoel en gaat naar de walsenstoel vooraan.
- **Eind:** de open maalkamer (kopse kant) met twee gladde walsen in de kleuren van `WALS_ERA.digi`. Ze draaien langzaam tegen elkaar in (boutjes op de as). Boven hangt de korrel onder de lip van de toevoer. Op de kast zitten de oranje randlijn, een touchscreen met een schuivend grafiekje en een ledstrook.
- **Korrel:** `grainAt` x 50%, y circa 39%; `diveAt` is de spleet tussen de walsen (y circa 62%). 's Avonds heeft de korrel een warme gloed, die bij `env.noGrain` wegvalt.
- **Licht:** een heldere, koele zaal met daglicht door de sparing.
- **Donker:** een gedimde zaal met cyaan schermpjes, ledgloed en een warme bundel van de bouwlamp.

**Lichte stand:** geen meeuwen, geen wolkendrift, geen slingeren, geen stofjes, geen ledgloed en geen bundel van de bouwlamp.
**Verminderde beweging:** alleen de twee eindbeelden. Die vertellen het hele verhaal: de stoel boven de opening, en de walsen met de korrel.

## De zes reviewpunten

1. **Gevelrij.** Alles staat nu op de plek van 2008 (omrekening: x 2026 = x 2008 / 10 + 9,9 m):
   - silo's: groep A x -50,1 tot -30,1, de trappentoren tot -26,5, groep B tot -10,5;
   - de strook van de roggemolen: x -10,5 tot -5,3, 30 m hoog. Hij heeft dezelfde raamrijen als in 2008 (twee kolommen ramen van 1,4 x 1 m op dezelfde x), voegen om de 3,2 m, een plint en de grijzen van 2008; 's avonds brandt de helft van de ramen (#D8E4DA, zoals 2008);
   - Molen B: x -5,3 tot 6,9 (12,2 m breed, 46 m hoog), direct tegen de molen uit 2008;
   - de molen uit 2008: x 6,9 tot 30,9, 2,5 m naar voren (zoals 2008 nu), met de filterkast en de pijpjes op dezelfde plek;
   - de silotoren: as op x 39,35 (ox 294,5 in 2008), de cellen tot 69,5;
   - daarna het bakstenen pand (70,3 tot 99,9), de loods (tot 118,9) en de buren (tot 152,9), in de maten van 2008. De grijzen zijn hier 35% lichter, naar de foto; 's avonds zijn ze gemengd zoals in 2008.

   De kraan staat in de bouwput achter de gevelrij (mast op x -12, z 6). De last hangt op z 6, recht boven de opening (die nu op z 3,6 tot 8,4 ligt).
2. **Titel:** in de lucht rechts van Molen B, boven de molen uit 2008.
   - Liggend staat hij op x 60%: precies tussen Molen B en de silotoren. Op 65% raakte hij de kop van de silotoren, omdat die nu op zijn plek uit 2008 staat.
   - Staand staat hij op x 75% en y 21% van het beeld, onder de menuknop.
3. **Silotoren:** de details van 2008 staan erop, op dezelfde plekken: negen losse raampjes, de grijze laaddeur, de twee sleufjes in de band en de raampjes in de galerij. Ook de kleine gele deur staat erop, want 2008 heeft die nog. De molen uit 2008 blijft dicht.
4. **Donker:**
   - De bouwlamp staat nu op x 11 op de noordoever. Je ziet hem van achteren: de kop wijst naar de overkant en iets omlaag.
   - Een zachte bundel (twee vlakke lagen) loopt over het water naar de hijsplek, met een warme poel op de rijplaten.
   - Het oude zoeklicht omhoog is weg.
5. **Shot 2:** de grijze wiggen waren de lange zijwanden van de twee walsenstoelen vooraan. Nu lezen ze als dichte kasten:
   - een lichtere zijkant met twee zijdeuren (naden) en handgrepen;
   - donkere kaders boven en onder, en de oranje randlijn van de voorkant;
   - een bovenkant als de camera erboven is.

   De rechter stoel is minder diep (2 m) en zijn schaduw op de vloer is kleiner. Er staat geen open deur meer.
6. **desc shot 1:** precies de nieuwe tekst (zie hieronder).

Bij het nakijken vond ik nog een fout van mezelf. De schaduwen van de kijkers werden in de verkeerde transformatie getekend, en daardoor zag je ze niet. Nu staan ze er overdag; 's avonds niet. De schoorsteen stond in geen enkel beeld; nu staat hij liggend rechts achter het bakstenen pand, zoals op de foto.

## Teksten zoals ze in mijn gebied staan

**Shot 1**
- **kicker:** Leeuwarden 2026
- **cap (22 woorden):** Hoog boven de stad hangt een walsenstoel aan de kraan. Een Zwitserse molenbouwer richt Molen B in, naast de molen uit 2008.
- **desc:** Beeld: achter een afzetlint aan het kanaal wijzen mensen met helmen omhoog; de camera stijgt over het water langs een oranje torenkraan tot boven het dak, waar een lichtgrijze walsenstoel hoog boven de stad aan de haak hangt, vlak boven een opening met een gele leuning.

**Shot 2**
- **kicker:** In Molen B 2026
- **cap (24 woorden):** Binnen zakt de walsenstoel naar zijn plek. De molens van Koopmans draaien op groene stroom uit Nederland. Straks ga jij tussen deze walsen door.
- **desc:** Beeld: in de nieuwe molenzaal zakt de walsenstoel door een bundel licht naar de vloer, naast een rij walsenstoelen met schermpjes en lampjes; de camera gaat dicht naar twee glanzende walsen in een open maalkamer, met de korrel erboven.

Caps en kickers volgen definitief.md. Er staat geen datum, geen gewicht, geen merk, geen logo en geen echte persoon in.

## De foto van nu (referentie van de gebruiker)

- **Standpunt:** de camera staat op de noordoever, met de fabriek aan de overkant en links het oosten, zoals feitencontrole 0 voor 1976, 2008 en 2026 voorschrijft.
- **Smalle kade:** de gebouwen staan vlak aan het water, met een kade van circa 8 m (damwand met deksloof, wrijfgording en buispalen). De molen uit 2008 staat er 2,5 m op.
- **Lichte gebouwen:** Molen B en de oude panden zijn wit en lichtgrijs. De oude panden en de silotoren hebben kleine raampjes en deuren.
- **Molen uit 2008:** zonder ramen en zonder deuren (correctie van de gebruiker).
- **Gevelrij:** de grijze silo's, de roggemolen, Molen B, de molen uit 2008 en de silotoren staan op een rij aan het water. Rechts achter staat de bruine schoorsteen.

## Snelheid

fps tegen de stub (`frame-base.html`), om en om, 3 rondes, mediaan. Gemeten met `fps-jaar.js` op 400x800, dpr 2 en 4x CPU-vertraging, op deze versie (alleen de schoorsteen is daarna nog verschoven). De machine was rustiger dan bij de vorige meting.

| meting | licht stub | licht 2026 | donker stub | donker 2026 |
|---|---|---|---|---|
| hoofdShot1 (de lat) | 54,7 | 55,6 | 56,2 | 55,9 |
| shot 1 | 51,1 | 55,6 | 51,9 | 55,2 |
| eindbeeld 1 | 54,8 | 60 | 51,4 | 60 |
| shot 2 | 58,6 | 59,8 | 59,2 | 59,4 |
| eindbeeld 2 | 58,7 | 60 | 60 | 60 |
| duik | 58,5 | 60 | 60 | 60 |

**Oordeel:** binnen het budget, licht en donker. Shot 1 zit op 99 tot 100% van hoofdShot1, en de rest haalt 59 tot 60 fps. De p95 van shot 1 is 16,8 tot 33,4 ms. De canvas bleef op 400px. Logs: `j26tools/fps12.log` (licht) en `fps12d.log` (donker).

**Wat het snel houdt:**
- de lucht alleen boven de horizon kopiëren, en het land alleen waar het terrein niet ligt;
- geen verloop over de gevel;
- de achterste rij walsenstoelen als één pad per kleur;
- de lichtbundels en de poel als vlakke vormen;
- beide eindbeelden in `env.still`;
- in de lichte stand vallen de gloedplaatjes en de bundel van de bouwlamp weg.

## Tests (na de review, op het definitieve bestand)

- **`node --check`** op het uitgepakte script: goed. Het bestand begint met `<title>`.
- **`harness.js`:** telefoon en desktop allebei `started`, `gameOver` en `restarted` true, 0 errors.
- **`jaar/2026/nieuwkomer.js`:** 59 van 59 controles goed.
- **`kijk-jaar.js` (index 5):** alle vier formaten, 0 fouten. Ik heb de beelden bekeken: begin, titel, 25, 50 en 75%, eind en duik, in licht en donker, staand en liggend. Ze staan in `jaar/2026/kijk/`.
- **Verminderde beweging** (`j26tools/rustig.js`): 16 van 16 goed. **`reduced.js`:** 33 van 33 goed.
- **Echt afspelen met 4x vertraging**, licht en donker: geen fouten.
- **Proef-samenvoeging** met `git merge-file -p` tegen `frame-base.html`:
  - met 1976: 0 conflicten;
  - met 2008: 0 conflicten;
  - alle drie samen: 0 conflicten, het script is geldig, de drie gebieden zijn precies het werk van hun maker, en `rook-jaren` is goed.

## Twijfelpunten

1. **Zoom shot 1:** circa 5,5 keer op het vlak van de last; de regie zegt "hooguit circa 5". Dat is nodig om aan het begin de gevelrij te tonen en aan het eind vlak boven de opening te hangen.
2. **De silotoren is licht, niet antraciet met oranje.** Ik volgde de foto en 2008. Wil de regie toch de hoofdintro-toren, dan is dat één kleurenlijst (`kl` in `j26Build`).
3. **Molen B is 12,2 m breed.** De echte maat is onbekend. Zo past hij met een strook van de roggemolen in de plek van de molen uit de jaren zestig. Aan het eind zie je daardoor de randen van het dak, met de stad eromheen.
4. **Kraan in de bouwput:** de voet staat achter de silo's en de roggemolen, dus je ziet hem niet. Het type, de kleur en de plek zijn een spelkeuze, zonder bron.
5. **Links van de silo's** staan bij mij witte oude panden (naar de foto). 2008 tekent daar op de gevellijn nu niets meer. Dat verschil zie je alleen liggend aan de rand.
6. **Hoogte van de last:** de last hangt circa 2,4 m boven het dak. Lager verdwijnt hij tegen de horizon.
7. **Binnen:** de lichtschacht is gestileerd, en het model van de walsenstoel is algemeen, niet dat van Koopmans.
8. **Voor de hoofdbouwer:** `jxCaches` behandelt elk object in `env.cache` met een eigenschap `sky` als lucht. Mijn palet had zo'n sleutel en gaf een fout in shot 2; ik heb hem hernoemd (`hemel`). Zet dit in raamwerk.md, of controleer op `v.sky === true`.
