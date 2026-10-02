# Bouwverslag Korrelval, versie B

Bestand: `korrelval-b.html` (1.526 regels, 106.090 bytes). Eén zelfstandig bestand: begint met `<title>`, geen doctype/html/head/body, alleen Google Fonts extern, alles verder Canvas 2D en WebAudio.

## Wat werkt
- **Kernlus**: scrollende schacht (400×720 logisch, letterbox met bakstenen fabrieksmuur), korrel op 35% hoogte, cirkelbotsing met 80%-hitbox, drie korrels met 1 s onkwetsbaarheid, schermschud, rode flits, dubbele tril. Bij 0 korrels: "Partij afgekeurd" met "Nog een korrel?" in één tik (herstart de molen vanaf het checkpoint).
- **Zes molens als configrijen** plus de Nachtploeg. 1846 en 1867 hebben molenstenen en een buil, vanaf 1920 walsenstoelen (grof, dan fijner, dan glad) en plansichters (vanaf 2008 met twee gaten). Stenen en bouten vallen van boven met 1 s vooraf een waarschuwingsdriehoekje. Moederkoren drijft op een verdieping. Elke molen eindigt in een silohal met Orion, Zuiderkroon, Jupiter, Saturnus en Silverline (alleen als label); landen bij de gouden silo met bulkwagen geeft +250.
- **Eerlijke generator**: verschuiving per verdieping |dx| ≤ 0,7 × vmax × tijd, spleet nooit onder 2,6× de hitbox, plansichter-fase vastgelegd op het aankomstmoment van de korrel, minimale verschuiving zodat je echt moet sturen.
- **Pick-ups**: boekweit, waterdruppel (3 s slow-motion), Nedertarwe-korrel, magneet (bouten vliegen weg), vijfpuntskroon (vanaf 1976), zeldzaam kiempje met "De kiem gaat apart: de olie maakt meel ranzig." Ze liggen altijd op een haalbare lijn.
- **HUD**: kg bloem, korrels, combo in de wandkolom, procesbalk Lossen > Reinigen > Conditioneren > Walsen (Malen in 1846/1867) > Zeven (Builen) > Silo. "Tsjoch!" plus de Prémax-naam (Slotermeer, Fluessen, Tjeukemeer, Princenhof, Bonkevaart) schuift in de HUD-band, zodat hij nooit een vallende steen verbergt.
- **Intro per molen**: doorrollende jaartal-teller, tijdperktitel in La Belle Aurore en één introregel. In Molen B en de Nachtploeg wisselt het schip per run (Friese tarwe, CZAV, Dollard Tarwe, Duits schip, EKO). In 1846 de grap "1856: de rosmolen bleek niet geschikt voor tarwe."
- **Nachtploeg**: eindeloos met één korrel, "Korrel van de dag" (datum als mulberry32-seed, voor iedereen dezelfde schacht) en "Vrije dienst". Een volcontinu-klok met ploegletter en een werklamp-vignet. Gaat open na de eerste molen.
- **Eindschermen als weegbon en mini-jaarverslag**: kg, zakken van 25 kg, bulkcellen van 2 ton en "circa X broden" (1.800 per ton). Uitmaling = perfecte passages / totaal, met label short patent / long patent / straight grade / volkoren en "witter = minder uitmaling". Badges voor de vijf kernwaarden plus Elke korrel telt, wist-je-dat-kaartjes (≤120 tekens) en "Kopieer score" met een selecteerbaar tekstveld als terugval.
- **Top 5** met een letterkiezer van drie letters (geen tekstveld). De score wordt meteen bewaard en de letters passen je daarna aan, zodat "Nog een korrel?" één tik blijft. Op het scorescherm staat "Bewaar je wachtwoorden in de kluis, niet je highscore."
- **Geluid** (WebAudio, pas na eerste tik, max 6 stemmen): walsgerommel dat meegaat met level en nabijheid, plansichter-ratel, C-E-G die per combo een halve toon stijgt, hit, pick-up, fanfare, paardenhoeven in 1846, stoomsis in 1867 en pieptoontjes bij de voorspellingsomtrekken in 2026.
- **Besturing**:
  - Pijltjes/A-D: 1.800 px/s², vmax 420.
  - Muis: volgt de cursor met dezelfde snelheidslimiet.
  - Touch: relatief, met pointer capture.
  - Spatie/Enter, P, M, Esc.
  - ` (backtick): hitboxen en halve snelheid.
- **Platform**:
  - Thema-tokens licht en donker; ook de overlays volgen ze.
  - localStorage alleen in try/catch.
  - Pauze bij `visibilitychange`.
  - `prefers-reduced-motion` zet schud uit en dempt deeltjes.
  - Vaste stap 1/120 s met dt ≤ 0,05 s.
  - Hot-reload haak.

## Wat ik heb geschrapt
- Takelwals en aspirateur-windstoten.
- Graanklander: de jury stond weglaten toe.
- Stuifarme Strooibloem.
- Zemelenvlokken die de korrel bruin kleuren.
- Zones met Prémax-namen in de Nachtploeg (de Prémax-namen zitten in de combo).
- Linker/rechter schermhelft als alternatieve besturing.
- Unieke achtergrond per level: vier gedeelde stijlen (hout, baksteen/tegel, staal, digitaal) met een palet per level.
- Stoomwolken in 1867 zijn er wel, maar puur als sfeer.
- Het slotje "kluis: ok" in Molen B: de opdracht wil één Vaultwarden-knipoog, dat is de regel op het scorescherm.

## Bekende beperkingen
- In deze sandbox faalt het ophalen van Google Fonts op het proxycertificaat. De harness meldt dat als enige console-error (`ERR_CERT_AUTHORITY_INVALID`). Met TLS toegestaan laden de fonts en zijn er nul fouten; zonder fonts werken de fallback-stacks netjes.
- Clipboard is in headless Chromium geblokkeerd, dus daar verschijnt het selecteerbare tekstveld (bedoelde terugval).
- Geluid is alleen op foutloos draaien getest, niet beluisterd.
- Niet op een echte telefoon gespeeld; touch is met CDP-touchevents gesimuleerd.
- De moeilijkheid (vooral 2026 en de Nachtploeg na 100 verdiepingen) is getuned op berekening en autopilot, niet met mensen. Alle getallen staan in `CONFIG`.
- Het bestand bevat inerte testhaken (`window.__korrelval`, `__kvAuto`, `__kvTest`, `__kvFast`). Ze doen niets tenzij een test ze zet.

## Hoe getest
- `shots-b/check.sh`: script los trekken, `node --check`, contract (begint met `<title>`, geen verboden tags). Grep: geen alert/confirm/prompt/print/download.
- `harness.js` op 400×800 (touch) en 1280×800: gestart, game-over gehaald en herstart gelukt op beide; geen horizontale overflow. Screenshots: `shots-b/phone-*.png` en `shots-b/desktop-*.png`.
- `shots-b/test-b.js`:
  - Touch-sleep van 60 px verplaatst de korrel relatief (200 naar 269, springt niet naar de vinger).
  - Autopilot op maximale stuursnelheid in god-modus door alle zes molens en 120 Nachtploeg-verdiepingen: **0 botsingen met walsen of platen**. Dat is het bewijs dat de generator eerlijk is; de autopilot ontwijkt alleen geen vrije gevaren.
  - Jaarverslag, Nachtploeg-game-over met top 5, letterkiezer via pijltjes, kopieer-terugval, scores, over-scherm.
  - Desktop met toetsen, muis, P-pauze en debugtoets, in donkere modus.
  - Geblokkeerde localStorage plus verborgen tab: geen fouten, en het spel pauzeert.
- `shots-b/det.js`: Korrel van de dag geeft exact dezelfde schacht bij normale en halve stapgrootte. Dat bewijst een determinisme-bug die ik vond en oploste: de fase van de plansichters gebruikte eerst de gedeelde RNG.
- Alle screenshots zelf bekeken en daarna verbeterd:
  - comboband in de HUD in plaats van over de valzone;
  - meer contrast voor moederkoren en boekweit;
  - Nachtploeg-HUD in twee regels;
  - levelknoppen in een raster;
  - kroon met vijf punten in plaats van drie.
