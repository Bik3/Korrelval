# Stijlgids mooimaakronde Korrelval

## Doel
Het spel mooier, warmer en verzorgder maken: de intro, het spelen en alle schermen. De gebruiker (Bikkel, stagiair ICT bij Royal Koopmans) vindt de intro al heel goed; dat is de lat voor de rest.

**Kijk niet naar andere games en neem niets over van bestaande games.** De gebruiker wil een eigen spel, geen kopie. Inspiratie komt alleen uit drie bronnen:
1. de huisstijl van Royal Koopmans, zoals op royalkoopmans.com: zie `/home/user/Vaultwarden/game/onderzoek/koopmans-site.md`, sectie 7 (Huisstijl, Beeldtaal, Slogans);
2. de echte geschiedenis en het echte molenproces: zie `/home/user/Vaultwarden/game/onderzoek/` en `/home/user/Vaultwarden/game/onderzoek-royal-koopmans.md`;
3. wat al in het spel zit, vooral de intro (vlucht de maaltoren in).

## Huisstijl Royal Koopmans (van de website)
- **Kleuren:**
  - oranje #E78A01: knoppen, links, tijdlijnstippen met een gloed rgba(231,138,1,.2); hover #D07C01;
  - antraciet #1D1E1F: tekst;
  - mosterdgoud #C5AA20: de footer en de secundaire knoppen;
  - logo-goud #CFAB00;
  - lichtgrijs #F7F7F7: blokken;
  - warm grijs #E3E1DA: randen;
  - crème #F3EED2 / #F9F4DB: de korenaar op de mosterd footer;
  - donkerbruin #664400: tekst op mosterd.
- **Letters:**
  - Eén schreefloze letter voor alles. In het spel is dat Nunito, die lijkt op de Avenir Next van de site.
  - Handschrift La Belle Aurore voor jaartallen, periodetitels en een persoonlijke zin. Beide letters zitten al in het bestand.
  - Knoppen op de site staan in hoofdletters, iets kleiner, met wat letterafstand.
- **Beeldtaal:**
  - Een lijntekening van korenaren, opgebouwd uit parallellogram-blaadjes, als achtergrondpatroon op ongeveer 5% dekking.
  - Een handgetekende potloodonderstreping.
  - Een groot gouden aanhalingsteken bij citaten.
  - Een geschiedenistijdlijn met oranje stippen met gloed en handgeschreven jaartallen.
  - Een mosterdgouden footer met een crème korenaar.
  - Foto's van wuivende tarwevelden met bloemranden (paarse phacelia, rode klaprozen) onder een Hollandse wolkenlucht.
- **Teken alles zelf.** Kopieer geen bestanden of plaatjes van de site. Het logo staat al als inline SVG (.rk-logo) in het spel en mag gebruikt worden.

## Sfeer
- Warm, ambachtelijk, rustig en trots. Geen neon, geen flitsen, geen drukte.
- Beweging is zacht: ease-out, meestal 150 tot 400 ms, nooit schokkerig.
- Alles werkt even mooi in het lichte en het donkere thema.

## Tijdperken (spel, plaatjes en achtergronden; feitelijk juist houden)
- **1846, rosmolen in Holwerd:**
  - hout, stro, daglicht tussen de planken, stofjes in zonnestralen, de houten as van de rosmolen;
  - molenstenen, geen walsen en geen plansichters.
- **1867, Stoommeelfabriek Friso aan het Noordvliet in Leeuwarden:**
  - baksteen, gietijzeren kolommen, gaslampen met warm geel licht, stoombuizen, drijfriemen;
  - molenstenen en een buil, geen walsen.
- **1920, de N.V.:**
  - groene tegels en de eerste gloeilampen;
  - vanaf hier walsenstoelen en plansichters.
- **1976, Koninklijk:** tinten uit de jaren 70, TL-buizen, pneumatische buizen, metaal.
- **2008, de nieuwe molen:** staal en glas, helder en koel licht.
- **2026, Molen B:**
  - donker, met led-statuslampjes en schermpjes, strak en modern;
  - nu te leeg, dus meer diepte, maar wel rustig.
- **Nachtploeg:** nacht in de molen van nu. De zones heten naar Prémax-mixen met Friese waternamen: Slotermeer, Fluessen, Tjeukemeer, Princenhof, Bonkevaart.

## Regels die altijd gelden
- **Speelbaarheid gaat voor.**
  - Deze moeten altijd duidelijk te zien zijn: de korrel, de spleten tussen de walsen, de gevaren (stenen, bouten, moederkoren) en de pick-ups.
  - De achtergrond houdt een laag contrast en is gedempt.
  - Niets in de achtergrond mag bewegen of eruitzien als een gevaar.
- **Meelstof alleen als sfeer.**
  - Stofjes en wolkjes zijn alleen cosmetisch, nooit een meter of een gevaar.
  - Geen explosies.
- **prefers-reduced-motion:** geen schudden en geen beweging die niet nodig is.
- **Snelheid:**
  - Teken statische lagen één keer voor in offscreen-canvassen.
  - Geen ctx.filter of blur per frame, en begrens het aantal deeltjes.
  - Niet trager dan nu. Meet op 400x800 met 4x CPU-throttling (CDP Emulation.setCPUThrottlingRate). Nu haalt het spel circa 50 fps en de intro 41 tot 60 fps.
- **Tekst:**
  - Nederlands, gewone taal, kort en niet AI-achtig: geen gedachtestreepjes als stijlmiddel, geen "Ontdek...", geen uitroeptekens behalve "It giet oan!" en "Tsjoch!".
  - Geen nieuwe feiten zonder bron in het onderzoek.
  - Geen namen van huidige medewerkers.
  - Geen tonnages in de intro.
- **Technisch contract:**
  - Het bestand begint met `<title>` en heeft geen doctype, html, head of body.
  - Het spel laadt niets van buiten.
  - localStorage staat altijd in try/catch.
  - Werkt in een iframe: het spel pakt bij het laden geen focus en scrollt de pagina eromheen niet.
  - De testhaken blijven werken: window.__korrelval (introAt, intro, state), __kvAuto, __kvTest en __kvFast.
  - Bestaande ids blijven bestaan.

## Werkverdeling: drie bouwers tegelijk, elk op een eigen kopie
Daarna voegt de hoofdbouwer de drie kopieën samen met een 3-way merge (git merge-file) tegen `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/base.html`. Blijf daarom strikt in je eigen gebied.
- **UI-bouwer:**
  - Wel: alle CSS in `<style>`, de HTML-markup van de schermen en de DOM-code (show, toast, titel, verhaalkaart en zijn knop, weegbon, game-over, jaarverslag, Molenboek-opmaak, Scores, Instellingen, Kies een molen, Over dit spel, dienstbriefje-opmaak, het ondertitelpaneel van de intro).
  - Niet: canvas-tekencode.
- **Spel-bouwer:**
  - Wel: canvas-tekenen van het spel: render, drawTiles, drawSteam, drawWalls, drawChute, drawFloor, rollGrad, drawRoll, drawStone, drawWals, drawPlate, drawPick, drawHazard, drawSilo, drawPredict, drawWarnings, drawGrain, drawParticles, drawTexts, drawHUD, drawSide, drawLabels, drawIntro (de introband), drawIntroNew, drawEraVignette, drawStoryArt, drawBriefArt, bookCanvas/bookIcon (plaatjes), buildLetterbox, getTile en vignette.
  - Wel: cosmetische deeltjes en schudden via part, meelWolk en update.
  - Niet: CSS of HTML, DOM-functies en de intro-functies.
- **Intro-bouwer:**
  - Wel: alleen de intro-functies (introDark tot en met introTheme, IN, INTRO_SHOTS en wat daarbij hoort).
  - Niet: CSS of HTML. Het ondertitelpaneel is van de UI-bouwer.
  - drawGrain niet aanpassen, wel aanroepen. De spel-bouwer houdt de aanroep drawGrain(x, y, g, st) werkend.
- **Gedeelde functies** (start, frame, loop, whenFonts, primary): alleen aanpassen als het echt moet, en dan met zo min mogelijk regels.
- **Nieuwe top-level namen** beginnen bij de UI-bouwer met `ui`, bij de spel-bouwer met `gx` en bij de intro-bouwer met `ix`. Zo botsen er geen const-namen.
- **Regels buiten je eigen gebied verander je niet**, ook niet om ze "netjes" te maken.
