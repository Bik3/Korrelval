# Bouwverslag Korrelval

Eén zelfstandig bestand: `korrelval.html`, 1.502 regels, 96.597 bytes (94 kB, ruim onder 300 kB). Begint met `<title>`, geen doctype/html/head/body, één `<style>`, markup, één `<script>`. Externe bron: alleen Google Fonts (Nunito + La Belle Aurore) met fallback-stacks. Alles verder procedureel: Canvas 2D voor het spel, WebAudio-synthese voor geluid, DOM-overlays met thematokens voor menu's en kaarten.

## Wat werkt

**Kern (mijlpaal 1)**
- Schacht van 300 px in een logisch veld van 400×720, schaalt naar het venster (dpr ≤ 2), letterbox met fabrieksmuur op desktop/landschap.
- Korrel op 35% schermhoogte, cirkelhitbox van 80% van de getekende straal; drie korrel-levens met 1 s onkwetsbaarheid, schermschud (uit bij `prefers-reduced-motion`), rode randflits, dubbele tril bij hit en `vibrate(15)` bij een perfecte passage.
- Score in kg bloem (+10 × combo-multiplier tot ×5), Perfecte passage +25 (walsen) / +15 (zeef), combo-rangen Slotermeer 5 · Fluessen 10 · Tjeukemeer 15 · Princenhof 20 · Bonkevaart 25 met "Tsjoch!"-banner en stijgende C-E-G-toonhoogte.
- Game-over "Partij afgekeurd / Oant moarn" met "Nog een korrel?" in één tik (score en levelnummer blijven, score springt terug naar het levelcheckpoint, zodat je niet kunt farmen).
- Toetsenbord (pijltjes/A-D, 1800 px/s², vmax 420), muis (korrel volgt cursor met dezelfde snelheidslimiet) en touch (relatief sturen met pointer events + `setPointerCapture`, nooit springen naar de vinger). Spatie/Enter, P, M, Esc; backtick = debug (hitboxen + halve scroll).
- Vaste fysicastap 1/120 s met accumulator, dt begrensd op 0,05 s, max. 4 substappen, pauze bij `visibilitychange`.

**Levels (mijlpaal 2)** – zes configrijen in `LEVELS` + `NIGHT_LEVEL`:
1. 1846 Rosmolen, Holwerd: molenstenen + buil (statisch), boekweit-bonus, tutorial-hints, grap "1856: de rosmolen bleek niet geschikt voor tarwe".
2. 1867 Stoommeelfabriek Friso, Noordvliet: molenstenen + langzaam zwaaiende buil, cosmetische stoomwolkjes met sis (verbergen niets).
3. 1920 N.V.: eerste walsenstoelen (24 ribbels) en plansichters (20 px, 0,5 Hz).
4. 1976 Koninklijk, De Merodestraat: stenen/bouten/moederkoren als reinigingsgevaren, magneet, kroontje (vijfpunts, geen logokroon).
5. 2008 Nieuwe molen: fijnere walsen, plansichters met twee gaten, Nedertarwe-korrels.
6. 2026 Molen B: bijna gladde walsen met glans, smalste spleet, "voorspellende" oranje omtrek bij de waarschuwing, piepklein slotje met toast "kluis: ok".
7. Nachtploeg: eindeloos, één leven, scroll +4% per 10 verdiepingen, interval 1,1→0,8 s, spleet 20%→14%, zones met Prémax-namen, dagelijkse seed (mulberry32 op de datum, "Korrel van de dag · ploeg X") of vrije seed, lokale top-5 met drieletter-kiezer.
- Generator-eerlijkheid: |dx| ≤ 0,7 × vmax × (dy / scroll), spleet ≥ 2,6 × hitboxdiameter, plansichter-gat berekend op het aankomstmoment van de korrel, waarschuwingsdriehoek 1 s vooraf bij elke steen/bout.
- Pick-ups: boekweit +5, water +25 (3 s slow-mo), magneet +50 (6 s bouten en stenen weg, "magneet en steenuitlezer"), Nedertarwe +20 en combo+1, kroontje +100, kiem +30 (zeldzaam, "de kiem gaat apart").
- Silohal aan het eind: vijf silomonden met productnamen als label (zonder rangorde), goud oplichtende silo met bulkwagen: +250 "Order geladen", anders +50 zakgoed. Levelbonus: levens × 100 + uitmaling × 300.
- HUD-procesbalk Lossen → Reinigen → Conditioneren → Walsen/Malen → Zeven/Builen → Silo met canvas-iconen die oplichten; Nachtploeg toont verdieping + zone.
- Levelintro: doorrollende jaartal-teller (kilometerteller), tijdperktitel in La Belle Aurore, intro-regel, aanvoerregel (Friese tarwe, Zeeuwse Nedertarwe via CZAV, Groninger baktarwe van Dollard Tarwe, Duits schip, EKO/Skal; wisselt per run) en een getekend loskade-tafereel (rosmolen in 1846). Overslaanbaar met tik/spatie.
- Tien wist-je-dat-kaartjes (≤ 120 tekens, "circa" bij krantencijfers, familiegeschiedenis van Wybrandi tot Molen B), zonder herhaling binnen een run.

**Polish (mijlpaal 3)**
- WebAudio: walsgerommel (bruine ruis, cutoff stijgt per level), plansichter-ratel, perfect-arpeggio, hit-sweep, pick-up-glissando, rangtonen, kroonjingle-fanfare, hoefklikken in 1846, stoomsis in 1867, pieptoon bij voorspelling in Molen B. Start pas na de eerste tik; M/knop dempt; voorkeur in opslag.
- Mini-jaarverslag op game-over en finale: kg, zakken van 25 kg, bulkcellen van 2 ton, "ca. X broden" (1.800 per ton), uitmaling = perfects/totaal met het juiste label (short patent ~45%, long patent ~65%, straight grade 75-76%, volkoren 100%; "witter = minder uitmaling"), badges voor alle vijf kernwaarden plus "Elke korrel telt".
- "Kopieer score" via `navigator.clipboard` in try/catch met selecteerbaar tekstvak als fallback.
- Knak-effect: 3 zemelvlokjes + 1 kiempje per perfecte walspassage; korrel wordt witter en iets kleiner.
- Vijf achtergrondstijlen (hout, baksteen, tegels, staal, digitaal) eenmalig in een offscreen canvas, parallax 0,5×; cosmetisch bloemstof vanaf 1920, nachtvignet met werklamp.
- localStorage (`korrelval.v1`) in try/catch: top-5, beste campagnescore, hoogste level (knop "Verder vanaf …"), Nachtploeg ontgrendeld, geluid, Gezel, dagseed, badges, laatste naam. Zonder opslag werkt alles gewoon.
- Thematokens licht/donker, `color-scheme`, `env(safe-area-inset-bottom)`, knoppen ≥ 56 px, geen formulieren, geen alert/confirm/prompt.
- Hot-reload-haak `window.claude?.hot` aanwezig.

## Wat is geschrapt (bewust)
- Takelwals, aspirateur-windstoten en obstakels-verbergende stoomwolken (afbouwlijst van de engineer-jury); stoom is nu puur decor.
- Graanklander helemaal weg (insider: niet in de fabriek tonen); reiniging = stenen, bouten, moederkoren.
- Pick-up "Stuifarme Strooibloem" (bakkerijproduct, geen molenmiddel).
- Eindlabel "Patentbloem bij >75%" vervangen door de echte uitmalingstrappen.
- Combo-rang Markermeer (geen Fries water).
- Paard in de achtergrond van 1846, half-scherm-besturing als alternatief, instellingenscherm: niet gebouwd (toggles staan op het titelscherm).
- Logokroon (drie bogen, drie bolletjes): nergens; het goudmotief is een korenaar en het kroontje is een vijfpuntskroon.

## Bekende beperkingen
- Balans is op redenering en autopilot-runs getuned, niet op menselijke playtests; Molen B (420 px/s, spleet 16%) is pittig. Gezel-modus (spleet ×1,25, scroll ×0,8) is de veiligheidsklep; alle getallen staan in `CONFIG`/`LEVELS`.
- Stenen en bouten vallen "door" walsen en zeefplaten heen (geen botsing onderling); ze zijn zwaarder en komen van boven binnen, de waarschuwing toont hun instap-x.
- Nachtploeg moet eerst worden ontgrendeld door de campagne uit te spelen; de dagseed geldt voor de generator, pick-up-cosmetiek gebruikt `Math.random`.
- Canvas-cijfers zijn niet tabular (canvas kent geen `tnum`); de DOM-kaarten wel.
- Als Google Fonts niet laadt, vallen de titels terug op system-ui/cursive; de layout hangt nergens van glyph-breedtes af.
- Trillen werkt alleen op toestellen met `navigator.vibrate` (Android); iOS negeert het stil.

## Hoe getest
Playwright-script `selftest.js` (wrapper `test-wrap.html` rond het bestand) op 400×800 (touch, dpr 2) en 1280×800:
1. Bestandscontract: begint met `<title>`, geen `<html|<head|<body|<!doctype`, < 300 kB; `node --check` op het uitgepakte script.
2. Laden zonder `pageerror`/console-errors op beide viewports.
3. Titelscherm → "It giet oan!" → na 3 s draait het spel; pijltjes sturen links/rechts; muis volgt cursor (desktop); touch-drag via pointer events beweegt de korrel relatief; pauzeknop.
4. Game-over forceren (niet sturen): "Nog een korrel?" zichtbaar, kaart past zonder scrollen in beeld, "Kopieer score" levert de deelregel, retry start opnieuw met 3 levens.
5. Autopilot (onsterfelijk, mikt op het gatmidden) speelt alle zes levels uit: levelkaarten, finale, Nachtploeg ontgrendeld, Nachtploeg start met 1 leven en dagseed, game-over met naamkiezer, naam in top-5, highscore- en creditsscherm.
6. Screenshots in `shots/` (titel, intro, spel, levelkaart, game-over, finale, nachtploeg, naamkiezer, nachtploeg-game-over, scores, credits op 400×800; titel en spel op 1280×800) zijn bekeken op overlap en leesbaarheid.

Resultaat laatste run: alle 28 checks geslaagd, geen `pageerror` en geen console-errors op beide viewports. (Herhalen: `NODE_PATH="$(npm root -g)" node selftest.js` in de scratchpad-map.)

Gevonden en opgelost tijdens het testen: de silohal werd na het passeren opnieuw gespawnd en reset in snelle levels de finish-timer (level 5/6 eindigden nooit); `Audio` als objectnaam schaduwde `window.Audio` (hernoemd naar `Sfx`); Nachtploeg-HUD-tekst liep onder de pauzeknop en de procesnaam botste met de combotekst (HUD naar drie rijen); de Nachtploeg-game-over-kaart met naamkiezer en de creditskaart waren hoger dan het scherm (naamkiezer eerst, jaarverslag na opslaan; credits korter); een te lange toast werd samengeknepen (korter + kleiner lettertype); korenaar-blaadjes overlapten.
