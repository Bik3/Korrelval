# Verslag jaarintro 1846: de rosmolen in Holwerd (na de review)

Werkbestand: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/1846/korrelval.html`.
- Alleen het gebied tussen de merkregels van 1846 is veranderd; buiten het gebied is het bestand gelijk aan de versie vóór de review.
- Alle namen beginnen met `j46`.
- Bron van het gebied: `1846/werk/j46.js` (1026 regels), met `werk/splice.py` erin gezet.

Beelden: `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/1846/kijk/` (kijk-jaar, index 0: 68 beelden en 4 vellen `sheet-*.png`).

## Wat er per reviewpunt veranderde

**1. Eindbeeld shot 2 en de lus (HOOG).**
- Een hoge camera (35 tot 55 graden) lukt hier niet: het kamwiel hangt boven de ring. Van boven snijden de velg, de armen en de schoren door het paard. Ik heb dat eerst gebouwd en bekeken: het paard lag plat onder de balken en werd door de voorste velg doorgesneden.
- Gekozen: de camera staat laag (1,9 m, onder het wiel), schuin tegenover de maalstoel, 7 m van de spil.
  - De kuip staat achter de ring, links van het midden. Het paard loopt dus altijd vóór de kuip en verdwijnt er nooit achter.
  - Het kamwiel hangt als plafond van balken en kammen boven in beeld.
- De maalstoel staat 0,85 m hoger, op vier palen met een ladder. Daardoor staan de kuip en de korrel boven de hoofden van het paard. De korrel valt nooit tegen het paard (nagerekend over een hele ronde) en de trekboom loopt onder de kuip langs.
- Het paard is steeds heel in beeld, met kop en romp (x 2 tot 98% op staande schermen). Breedte van het paard op 360 px, over een ronde:
  - de verre helft (in profiel, voor de kuip langs): 24 tot 26%;
  - vooraan, in profiel: 46 tot 57%;
  - recht van voren of van achteren (twee stukken van circa 1,2 s): 15 tot 19%. Daar haalt het de 25% niet.
- De spil (0,4 m breed) schuift één keer per ronde, circa 1,5 s, voor het verre paard langs. Kop en romp blijven ernaast te zien.
- Bij het stilvallen staat het paard groot in driekwart profiel links op de ring en loopt naar links.
- De camera past zich aan het formaat aan (inhoud gecentreerd, breedte of hoogte beslist). Ring en paard staan op 360x640, 400x800, 390x844, 768x1024 en 1280x720/800 helemaal in beeld.

**2. Benen.**
- Zwaarder trekpaard met een dikkere hals.
- De benen lopen taps toe: achter een hak die naar achteren wijst, dan kogel, behang en hoef met een rand.
- Onderkant van het lijf in schaduw, en een lichte rand aan de lichtkant.
- Kleiner dan 60 px (in de deur en in de verte) een eenvoudiger paard.

**3. Vlucht van shot 2.**
- De start ligt verder terug: het paard loopt naast de maalstoel, met kop en romp de eerste 1,5 s heel in beeld. Geen schampen meer.
- Halverwege staat de camera opzij van het rondsel, op hoogte van de kammen, en blijft daar even hangen.
- Kammen en staven hebben nu dezelfde steek: 160 kammen en een lantaarn van 10 staven. De staven draaien 16 keer zo snel en grijpen precies tussen de kammen. Dichtbij zijn de kammen blokjes met een bovenvlak en een kop.
- Daarna zakt de camera terug naar het eindbeeld.

**4. Korrel op de spil.**
- De korrel ligt naast de steenspil, aan de kant van de graanbak.
- Achter de korrel valt de steenspil weg (uitsparing).
- In het nieuwe eindbeeld staat hij ook los van de grote spil.

**5. Begin shot 1.**
- Je start in een wolk met een verloop van grijsblauw naar warm wit (geen #FFF).
- De wolk gaat in 0,85 s open vanaf de plek van het jaartal, met bollen langs de rand en een schaduwrand. Zolang de wolk alles bedekt, wordt er niets onder getekend.
- De wolkenrijen in de lucht laten de strook van het jaartal vrij, dus het jaartal staat op vrije lucht.

**6. Eindbeeld shot 1.**
- De man is een warmbruin, krom silhouet met een kiel, gebogen knieën, klompen en een pet. De zak is half zo lang als zijn rug.
- De voorgrond:
  - twee evenwijdige karrensporen (x ±0,72 tot 0,93 m) recht naar de deur;
  - een plas in het rechterspoor;
  - elf pollen gras langs de gevel en op het plein;
  - schaduw van de kar en van de zakken.
- De rij lichte streepjes langs de goot is weg.
- Naast de deur staat een stapel zakken boekweit (drie rechtop, twee erop).

**7. Avond.** Het riet heeft avondkleuren (donker olijfbruin), met alleen een koperen rand langs de linkerdakrand.

**8. Binnen vlak in plaats van low-poly.**
- De kuipvlakken hebben drie tinten, naar de hoek met het licht, en een lichte rand langs de bovenkant aan de lichtkant.
- Het kamwiel heeft een lichte rand langs de buitenkant.
- Weg: de naden in het deksel, het dunne hoefspoor en de ringlijn op de vloer. Het uitgelopen spoor is nu een tweede, vlakke tint in de zandring.
- 's Avonds is de lantaarnkring drie vlakke tinten op vloer en voorwand, in plaats van een verloop. De lantaarn hangt nu links in de deur, zodat hij niet meer voor het rondsel hangt.

**Snelheid (tech punt 1).**
- Shot 1:
  - Een molen die groot in beeld staat, verbergt het dorp. Kaarten die helemaal achter gevel en dak vallen, worden niet getekend; de rest krijgt een knip van rechthoeken om de molen.
  - Kaarten worden eerder eenvoudig (drempel 28 px). Verre huizenrijen zijn alleen muren en daken, elk in één kleur.
  - De deur in de vlucht: wanden, vloer, lantaarnkring, spil en wiel staan in een bewaarde laag. Die wordt alleen opnieuw getekend als de deur 9% groter wordt; live zijn alleen het paard en de trekboom. Geen lantaarngloed per beeld.
- Shot 2 in de vlucht:
  - kamwiel in 10 stukken, geen kammen aan de verre helft, kammen buiten beeld overgeslagen;
  - lantaarnkring als vlakke tinten. Dit scheelde in het donker 0,4 tot 0,9 ms per beeld (ongeremd).

## Teksten zoals ze in het gebied staan

- **Shot 1**
  - kicker: Holwerd 1846
  - cap: Holwerd ligt op een terp achter de zeedijk. Een schuit brengt zakken boekweit over de vaart. Achter de open deur loopt een paard zijn rondjes.
  - desc: Beeld: uit een wolk daal je boven de vaart, langs een schuit met zakken boekweit, naar het terpdorp Holwerd met de kerktoren op zijn eigen terp en de zeedijk aan de horizon, tot voor de open deur van de rosmolen met zakken boekweit ernaast, waar binnen een paard langsloopt.
- **Shot 2**
  - kicker: In de rosmolen 1846
  - cap: Het paard met oogkleppen draait de spil. Boven zijn hoofd grijpt het kamwiel in een klein rondsel. Zo gaat de steen veel sneller rond.
  - desc: Beeld: binnen loopt een paard met oogkleppen zijn rondje en draait zo de houten spil; de camera schuift opzij van het rondsel, waar de kammen van het kamwiel tussen de staven grijpen, en zakt dan terug tot laag achter de ring, met de kuip op een hoge stoel erachter en één korrel op de schudbak boven het oog.

De caps zijn ongewijzigd (letterlijk `definitief.md`). De twee desc-zinnen zijn aangepast aan de nieuwe beelden.

## Snelheid tegen de stub

`frame/check/fps-jaar.js frame-base.html 1846/korrelval.html 0 3 2 licht|donker`: 400x800, dpr 2, 4x CPU, de stub en 1846 om en om, 3 rondes. Mediaan in fps, laatste meting (`1846/werk/fps-r3-licht.log` en `fps-r3-donker.log`):

| | stub licht | 1846 licht | stub donker | 1846 donker | vóór de review (licht) |
|---|---|---|---|---|---|
| hoofdShot1 (de lat) | 55,4 | 54,8 | 55,2 | 56,1 | 49,5 |
| shot 1 | 51,4 | 49,7 | 50,5 | 50,4 | 37,3 |
| eind 1 | 51,4 | 60 | 54,7 | 59,3 | 56,7 |
| shot 2 | 59,8 | 55,8 | 58,7 | 56,4 | 43,7 |
| eind 2 | 60 | 58,7 | 60 | 56,7 | 50,1 |
| duik | 60 | 60 | 58,3 | 60 | 60 |

- p95 is overal 33,4 ms of lager; de stub haalt in shot 1 ook 33,3 tot 33,4.
- Shot 2 haalt de lat in licht en donker.
- Shot 1 zit 5 tot 10% onder de lat en gelijk aan of net onder shot 1 van de stub. Die zit in deze meting zelf ook 7 tot 9% onder de lat: het script opent de jaarintro op dpr 2.
- De run ervoor (`fps-r2-*.log`, vóór de laatste twee versnellingen) gaf:
  - licht: lat 54,5, shot 1 52,3, shot 2 59;
  - donker: lat 55,2, shot 1 48,3, shot 2 57,5.
- Met de load van 3 tot 4 (andere makers meten tegelijk) schommelt een mediaan per run 2 tot 3 fps.

## Testuitslag (op het eindbestand)

- `node --check` op het uitgepakte script: OK.
- `harness.js`: telefoon en desktop, `started`, `gameOver` en `restarted` true, 0 errors.
- `1846/nieuwkomer.js`: 59 van 59 goed.
- `check/reduced.js`: 33 van 33 goed. Bij verminderde beweging staat het paard in het eindbeeld van shot 2 groot links op de ring.
- `kijk-jaar.js` (index 0): vier formaten, geen fouten. Zelf bekeken met de Read-tool: alle vier de vellen, vooral het paard en de lus van shot 2. Daarnaast losse reeksen van de lus (t 5,4 tot 14,5 s) op 360x640, 400x800, 390x844, 768x1024 en 1280x720.
- Proef-samenvoeging met `git merge-file -p` tegen `frame-base.html`, met de huidige kopieën van 1867, 1920, 1976, 2008 en 2026 achter elkaar: 0 conflicten. Het 1846-gebied is gelijk aan het mijne en `node --check` op het samengevoegde script is OK.

## Twijfelpunten

1. **Lage in plaats van hoge eindcamera.** Zie punt 1. Wil de regie toch van boven kijken, dan moet het kamwiel hoger (en de ruimte ook). Dat raakt alle beelden binnen.
2. **25% van de breedte** haalt het paard in profiel overal. Recht van voren of achteren (twee korte stukken per ronde) is het smaller, wel heel en herkenbaar.
3. **Hoge maalstoel (kuip op 1,65 m).** Die is nodig om de korrel boven het paard te houden. Of dit voor een rosmolen klopt, staat niet in de feitencontrole; ik ken het van molens met een steenzolder.
4. **De korrel staat tegen de verre velg** van het kamwiel, net onder het rondsel. Hij staat los van beide spillen, maar het is een druk stukje beeld.
5. **Snelheid van shot 1.** Shot 1 haalt de lat net niet: 5 tot 10% eronder, wel even snel als shot 1 van de stub. Wat er nog kost, is vooral het dorp vlak voor de molen en het paard in de deur.
