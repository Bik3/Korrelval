# Bouwopdracht: Korrelval (browser game over Royal Koopmans)

Je bouwt het spel **Korrelval** als ÉÉN zelfstandig HTML-bestand op
`/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/korrelval.html`.

Lees eerst, in deze volgorde:
1. `concept-arcade.json` (het winnende ontwerp, volg het, maar zie de aanpassingen hieronder)
2. `jury-speler.json`, `jury-engineer.json`, `jury-insider.json` (velden `ideas_to_graft`, `build_warnings`, `red_flags`, `fact_concerns`)
3. `spelmateriaal.json` (velden `one_liners`, `process_steps`, `numbers`, `visual_identity`, `avoid`)
4. `profiel.md` alleen als je iets wilt controleren

Alle bestanden staan in `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/`.

## Wat het spel is (kort)
Je bent één tarwekorrel die door een torenhoge meelfabriek valt (verticale faller, portret, één-as besturing). Levels volgen de echte Koopmans-tijdlijn: 1846 rosmolen Holwerd → 1867 Stoommeelfabriek Friso Leeuwarden → 1920 N.V. → 1976 Koninklijk → 2008 nieuwe molen → 2026 Molen B, daarna eindeloze "Nachtploeg". Spleten tussen walsen worden per level smaller, score in kilo's bloem, omgerekend naar zakken van 25 kg, bulkcellen van 2 ton en broden.

## Harde eisen aan het bestand (platformcontract, niet onderhandelbaar)
- GEEN `<!DOCTYPE>`, `<html>`, `<head>` of `<body>` tags: het bestand wordt bij publicatie in een skelet gewikkeld. Begin het bestand met `<title>Korrelval</title>` en daarna `<style>`, dan de markup, dan `<script>`.
- Externe bronnen: alleen Google Fonts via `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;800&family=La+Belle+Aurore&display=swap">` met echte fallback-stacks. Geen andere externe scripts, afbeeldingen of audio. Alles procedureel met Canvas 2D; geluid met WebAudio-synthese.
- Thema-tokens: alle kleuren als CSS custom properties op `:root` (lichte waarden), opnieuw gedefinieerd in `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {...; color-scheme: dark} }` en in `:root[data-theme="dark"] {...; color-scheme: dark}`. `body` krijgt een expliciete `background: var(--bg)`. Het canvas zelf mag één donker "fabrieks"-thema houden (dat is een bewuste keuze), maar de DOM-overlays (menu's, kaarten, knoppen) volgen de tokens en zijn in beide thema's leesbaar.
- Eén-scherm-app: `html, body { height: 100% }` (geen 100vh), `touch-action: none; overscroll-behavior: none` op het canvas/body, geen horizontale scroll, minimaal 16 px zijmarge voor DOM-overlays, werkt op 400 px breed. Vaste knoppen onderaan gebruiken `padding-bottom: env(safe-area-inset-bottom, 0px)`.
- Geen `alert()`, `confirm()`, `prompt()`; geen `<a download>`; geen `window.print`. Formulieren niet nodig: naam voor de highscore via een on-screen kiezer van drie letters (geen tekstveld, zodat op telefoons geen toetsenbord opklapt).
- `localStorage` alleen in `try/catch`, spel werkt ook zonder.
- `[hidden]{display:none!important}` bestaat al in het skelet: toggle zichtbaarheid van overlays met `el.hidden`.
- Bestand kleiner dan 300 kB. Streef naar 1500-2200 regels, netjes gestructureerd (CONFIG-blok met alle tuning-getallen bovenin het script, één state machine voor schermen, vaste fysicastap met accumulator, dt begrensd op 0,05 s, pauze bij `visibilitychange`).
- `prefers-reduced-motion`: schermschud en deeltjes dempen.
- Optioneel maar graag: hot-reload haak `window.claude?.hot?.snapshot(() => state)` en start via `window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {})`.

## Taal en toon
Alle UI-tekst in het Nederlands, gewone taal, met een paar Friese knipogen: startknop "It giet oan!", bij een nieuwe comborang "Tsjoch!", game-over ondertitel "Oant moarn". Humor is licht en nooit ten koste van het bedrijf of medewerkers. Op het titelscherm zichtbaar: "Fan-made door een stagiair, geen officiële uiting van Royal Koopmans."

## Feitelijke spelregels (van de jury en het onderzoek)
- Gevaren (stenen, bouten, moederkoren, graanklander) worden gepresenteerd als dingen die in de REINIGING uit het graan worden gehaald, nooit als "zit in de bloem". HUD-tekst bijvoorbeeld: "Reiniging: stenen en metaal mogen nooit op de walsen."
- Meelstof en stofexplosies NIET gamificeren; geen stofmeter, geen explosiegrens. Bloemstof mag puur cosmetisch zijn.
- Geen reproductie van het echte logo. Wel een eigen simpel kroonmotief (drie bogen, drie bolletjes) in goud als decoratie, en de huisstijlkleuren: oranje #E78A01, goud #CFAB00, antraciet #1D1E1F, donkerrood #C52135, lichtgrijs #F7F7F7, zandgrijs #E3E1DA.
- Echte productnamen (Orion, Zuiderkroon, Jupiter, Saturnus, Silverline) alleen als silo-labels zonder kwaliteitsrangorde. Eindlabels gebruiken generieke termen (Patentbloem / Bloem / Volkorenmeel). Geen medailles met productnamen.
- Combo-rangen naar Prémax-mixen die naar Friese meren zijn vernoemd: 5 Slotermeer, 10 Fluessen, 15 Tjeukemeer, 20 Bonkevaart, 25 Princenhof, 30 Markermeer.
- Het supermarktmerk Koopmans (pannenkoekenmix) is sinds 2000 van Dr. Oetker: nergens pannenkoeken, bakmixen of supermarktverpakkingen. Credits bevatten één regel: "Het supermarktmerk Koopmans (bakmixen) is sinds 2000 van Dr. Oetker; dit spel gaat over Royal Koopmans, de meelfabriek in Leeuwarden die aan bakkers en voedingsindustrie levert."
- Geen Cambuur of sponsoring. Geen namen van huidige medewerkers. Geen grap met een wachtwoord op een briefje. De enige Vaultwarden-knipoog: op het highscore-scherm de regel "Bewaar je wachtwoorden in de kluis, niet je highscore." of een piepklein slotje in Molen B met de toast "kluis: ok".
- Cijfers uit de Leeuwarder Courant (120 t/u, ca. 1.000 ton per schip, ca. 4 schepen per week, 212.000 ton, 160 medewerkers) altijd met "circa"/"ongeveer". Verhuizing naar Leeuwarden: 1867 (niet 1856). Geen exacte opleverdatum van Molen B, alleen "jubileumjaar 2026". Vermijd alles uit `spelmateriaal.json → avoid`.
- Wist-je-dat-kaartjes tussen levels: kies 8-10 regels uit `spelmateriaal.json → one_liners` (hoge betrouwbaarheid), maximaal 120 tekens, één per kaart, overslaanbaar.

## Correcties van de insider-jury (verplicht, gaan vóór het concept)
- Eindlabel: NIET "Patentbloem bij >75%". Gebruik de juiste uitmalingstrappen als uitleg: short patent ca. 45%, long patent ca. 65%, straight grade 75-76%, volkoren 100%, met de regel "witter = minder uitmaling". Jouw "uitmalingsgraad" in het spel is dan gewoon perfects/totaal en krijgt het label dat erbij hoort.
- Kroon: teken NIET een kroon van drie bogen met drie bolletjes (dat is de logokroon). Gebruik als goud-motief een korenaar (gestileerde aar van parallellogram-blaadjes) of een simpele vijfpuntskroon.
- Tijdperken en techniek: level 1 (1846 Holwerd) en level 2 (1867) hebben MOLENSTENEN en een buil (zeefkast), geen walsenstoelen en geen plansichter. Walsenstoelen en plansichters komen vanaf level 3 (1920). Level 2 speelt aan het Noordvliet in Leeuwarden (Stoommeelfabriek Friso, stoommachine van 2 pk die "al snel ontoereikend bleek"), niet aan het Nieuwe Kanaal; De Merodestraat/Nieuwe Kanaal komt vanaf level 3/4.
- Graanklander: alleen in een "Ontvangst en keuring"-zone aan het begin van een level (partij keuren), nooit in de fabriek op de zeefplaten. Simpeler: laat de klander weg en houd stenen, bouten en onkruidzaad (moederkoren) als reinigingsgevaren.
- Schrap de pick-up "Stuifarme Strooibloem" (dat is een bakkerijproduct tegen fijnstof bij bakkers, geen molenmiddel).
- Prémax-namen: zeg "Prémax-mixen met Friese waternamen", niet "naar Friese meren". Combo-rangen: 5 Slotermeer, 10 Fluessen, 15 Tjeukemeer, 20 Princenhof, 25 Bonkevaart (geen Markermeer).
- "Zeven generaties" niet gebruiken; schrijf "generaties lang".
- Molen B: walsenstoelen "van enkele tonnen" of "circa 3.500 tot 6.000 kg", geen datum.
- Broodomrekening: één noemer: circa 1.800 broden per ton bloem, altijd "circa".
- Oprichter: "bakkersgezel Uilke Klazes Koopmans".
- Verhuizing: formuleer als "in 1867 nam Koopmans in Leeuwarden een stoommeelfabriek over", zonder los verhuisjaar.
- Geen quizvragen; feiten alleen als wist-je-dat met "circa" bij krantencijfers.

## Extra grafts van de insider (goedkoop, wel inbouwen)
- Badges voor alle vijf kernwaarden: Vakmanschap (≥75% perfecte passages), Betrouwbaar (level zonder hit), Ondernemend (alle pick-ups van een level), Gepassioneerd (100 verdiepingen in Nachtploeg), Menselijk (Gezel-modus uitgespeeld; Gezel = ruimere spleten en tragere scroll, kiesbaar op het titelscherm).
- Levelintro-schip wisselt per run tussen echte aanvoerstromen: Friese tarwe, Zeeuwse Nedertarwe (CZAV), Groninger baktarwe van Dollard Tarwe (circa 500 t), een Duits schip, EKO-tarwe (Skal). Eén regel tekst, geen nieuwe mechaniek.
- Geel kiempje als zeldzame pick-up (+30) met toast "De kiem gaat apart: de olie maakt meel ranzig."
- Level 1-grap: een tarwekorrel stuitert van de molenstenen af met de tekst "1856: de rosmolen bleek niet geschikt voor tarwe."
- Wist-je-dat-kaartjes mogen familiegeschiedenis bevatten: Hein Blok Wybrandi en Stoommeelfabriek Friso (1867), zoon Jan en veevoer na 1881, de broers Uco, Daan en Jo (1920), LaCo Crumbs (1993), KIEM (2016), het eerste Nedertarwe-schip op HVO100 (februari 2024), de molens van 1965 en 1967 aan De Merodestraat (1967 wordt vervangen door Molen B, 1965 wordt roggemolen), loskade oudste deel 1927.

## Grafts die je WEL inbouwt (goedkoop, van de jury)
1. Knak-effect: bij een perfecte walspassage spatten 2-3 bruine zemelvlokjes en 1 geel kiempje af (deeltjespool), korrel wordt iets kleiner en witter.
2. Waarschuwingsdriehoekje 1 s vooraf aan de bovenrand waar een steen/bout binnenkomt (in alle levels).
3. Slanke procesbalk in de HUD: Lossen → Reinigen → Conditioneren → Walsen → Zeven → Silo, iconen lichten op naarmate je door het level zakt (vervangt "Schip gelost: 37%").
4. Nachtploeg met dagelijkse seed (datum als seed voor mulberry32), label "Korrel van de dag", zodat collega's dezelfde run vergelijken. Daarnaast een vrije modus met random seed.
5. Combo-toonhoogte: perfecte passage speelt C-E-G een halve toon hoger per combo-stap.
6. Eindscherm als mini-jaarverslag: kg bloem, zakken van 25 kg, bulkcellen van 2 ton, "goed voor ca. X broden" (1 ton bloem ≈ 1.800 broden), uitmalingsgraad (perfects/totaal → 60-80%), kernwaarde-badges: Betrouwbaar (level zonder hit), Vakmanschap (≥75% perfecte passages), Elke korrel telt (alle Nedertarwe-korrels gepakt).
7. Knop "Kopieer score" (navigator.clipboard in try/catch, fallback: selecteerbaar tekstveld) met een deelbare regel.
8. Doorrollende jaartal-teller (kilometerteller-stijl) als levelintro van 1-2 s.
9. `navigator.vibrate(15)` bij perfecte passage, dubbele tril bij hit, met feature-detectie.

## Bouwvolgorde (van de engineer-jury)
Mijlpaal 1 (eerst, en pas door als dit leuk is): schacht, walsparen met spleet, stenen, cirkelbotsing met 80%-hitbox, drie levens met 1 s onkwetsbaarheid, score en combo, game-over met "Nog een korrel?" in één tik, toetsenbord + muis + touch.
Mijlpaal 2: levels als configrijen (scroll, spleet%, interval, obstakeltypes, palet, introtekst), plansichters (oscillerende zeefplaat met gat, fase berekend op aankomstmoment), pick-ups, Nachtploeg, wist-je-dat-kaartjes, HUD-procesbalk.
Mijlpaal 3: WebAudio, localStorage top-5 met letterkiezer, eindscherm/jaarverslag, kopieer-score, achtergronden (drie gedeelde stijlen: hout / staal / digitaal met per level een palet), knak-effect, trillingen.
Bij tijdnood schrappen: takelwals, aspirateur, stoomwolken, klander-gedrag, unieke achtergrond per level.

## Eerlijkheid van de generator (verplicht)
- Verschuiving van het gatmidden per verdieping begrensd: |dx| ≤ 0,7 × vmax × (verticale afstand / scrollsnelheid).
- Spleet nooit kleiner dan 2,6 × de korrelhitbox-diameter.
- Plansichter-gatpositie wordt berekend op het moment dat de korrel de plaat bereikt.
- Debugtoets ` (backtick) toont hitboxen en halveert de scrollsnelheid (alleen in het spel, niet in de UI genoemd).

## Besturing
- Toetsenbord: pijltjes/A-D met versnelling 1800 px/s² en vmax 420 px/s; spatie/enter start/doorgaan; P pauze; M geluid; Esc menu.
- Muis: korrel volgt de x van de cursor via lerp met dezelfde snelheidslimiet.
- Touch: relatieve besturing: de korrel beweegt met de vinger-delta (nooit springen naar de absolute x), pointer events met `setPointerCapture`, coördinaten via `getBoundingClientRect` naar het logische veld 400×720, `preventDefault` op touchmove, DOM-overlays `pointer-events: none` behalve knoppen. Luister naar `resize` en `visualViewport`.
- Logische resolutie 400×720, schaalt naar het venster met devicePixelRatio begrensd op 2; op desktop/landschap een letterbox met fabrieksmuur-patroon.

## Zelftest (verplicht voordat je klaar bent)
Playwright is beschikbaar: `NODE_PATH="$(npm root -g)" node script.js` met `const {chromium}=require('playwright')`. Omdat het bestand geen `<html>`-skelet heeft, maak je voor de test een wrapper: schrijf `test-wrap.html` met `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>` + inhoud van korrelval.html + `</body></html>`.
Test minimaal:
1. Laden zonder console-errors (vang `pageerror` en `console` met type error), op viewport 400×800 én 1280×800.
2. Titelscherm zichtbaar; klik "It giet oan!"; na 3 s draait het spel (score of HUD verandert); stuur met toetsen; forceer een game-over (bijv. niet sturen) en controleer dat "Nog een korrel?" verschijnt en werkt.
3. Screenshot van titel, spel en game-over op 400×800 naar `shots/` en bekijk ze zelf (Read tool) om visuele fouten te vangen (overlappende tekst, onleesbare kleuren, elementen buiten beeld).
4. Simuleer een touch-drag met `page.touchscreen` of pointer events en controleer dat de korrel beweegt.
5. Controleer dat het bestand geen `<html`, `<head`, `<body` of `<!doctype` bevat en begint met `<title>`.
Los alles op wat je vindt. Schrijf een kort testverslag naar `scratchpad/bouwverslag.md` (wat werkt, wat je hebt geschrapt, bekende beperkingen).

## Ontwerpkwaliteit
Werk als een goede kleine studio: een eigen gezicht, geen sjabloon. Typografie: Nunito 800 voor UI en cijfers (tabular-nums), La Belle Aurore alleen voor tijdperk-titels en "Tsjoch!". Geen emoji als iconen; teken iconen met canvas-primitieven. Geen paars-blauwe gradients, geen "rounded-lg op alles". Warm en nuchter Fries: antraciet toren, crème kaarten, goud als beloning, rood alleen voor gevaar/levens.
