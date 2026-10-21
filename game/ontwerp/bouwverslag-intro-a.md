# Bouwverslag bouwer A: titelscherm opgeruimd

Back-up van de vorige versie: /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/korrelval-b.v16.html

## Wat er veranderd is
Het titelscherm (#scrTitle, de kaart heeft nu class `title`) toont van boven naar onder:
1. Logo (.brand/.rk-logo) en de kicker "Van rosmolen tot Molen B" met de korenaar.
2. h1 "Korrelval".
3. Lead (twee regels op 400 px): "Je bent één tarwekorrel. Glip door de walsen en val door 180 jaar molengeschiedenis."
4. "It giet oan!" (#bStart, data-primary).
5. "Gezel-modus staat aan" (#gezelNote), alleen als Gezel aan staat.
6. Tekstlink "Kies een molen" (#bPick), alleen als save.maxLvl > 0. Opent het nieuwe scherm #scrPick.
7. Twee gelijke knoppen: "Nachtploeg" (#bNight) en "Molenboek" (#bBook). #bNight opent altijd openNightBrief() en heeft een kleine regel: "open na molen 1", "vandaag jouw beste: X kg" of "eindeloos, één korrel". #bBook houdt zijn regel uit syncBookButtons.
8. Een rij tekstlinks (44 px tikvlak): Scores, Instellingen, Over dit spel.
9. "Fan-made door een stagiair." (.fine)

Waar de rest heen ging:
- Nieuw scherm Kies een molen (#scrPick, show('pick')): korte zin, jaartalknoppen in #lvlChips (jaartal met korte naam, twee per rij, startCampaign(i), t/m save.maxLvl), Terug (#bPickBack, data-primary). Gebouwd in openPick().
- Nieuw scherm Instellingen (#scrSettings, show('settings')): #bGezel (met "ruimere spleten, tragere val"), #bSound, de besturingshint #ctlHint en voor touch een eigen zin #ctlHintTouch (syncHints wisselt ze), Terug (#bSettingsBack, data-primary). refreshTitle() werkt #bGezel, #bSound, #gezelNote, #bPick en #bNight bij; dat klopt ook na tryGezel() en de M-toets.
- Deelregel (#shareRow, #shareUrl, #bShare) staat nu onderaan Over dit spel, boven Terug. De regel `#shareRow{display:none}` is uit de max-height:700px-query gehaald.
- Badges zijn van de titel af. "Alle vier uitmalingen gezien" staat nu in Scores onder #allLabels (als alle vier gezien zijn).
- Esc op pick, settings, scores en about gaat terug naar de titel (nieuwe helper toTitle()). Night en boek werkten al. Spatie/Enter doet op elk scherm de data-primary-knop.
- Tekst in Te moeilijk? aangepast: "Je kunt hem bij Instellingen weer uitzetten." Een paar codecommentaren bijgewerkt.
- CSS: oude .minilink-stijl en de 7-koloms chipsgrid weg; nieuwe stijl voor .title, .duo, .links, .linkbtn.mid, .btn.wide en de chips.
- De intro is niet aangeraakt. nightButton() en het dienstbriefje bestaan nog (jaarverslag gebruikt nightButton).

## Ids
- Nieuw: #bNight, #bPick, #gezelNote, #bSettings, #scrPick, #bPickBack, #scrSettings, #bSettingsBack, #ctlHintTouch
- Weg: #bDaily, #bFree, #bNightWhat, #nightNote, #titleBadges
- Verplaatst: #lvlChips (naar #scrPick), #bGezel, #bSound, #ctlHint (naar #scrSettings), #shareRow, #shareUrl, #bShare (naar #scrAbout)

## Tests
- harness.js: telefoon en desktop started/gameOver/restarted true, geen errors.
- tests/nieuwkomer.js: 26 van 26 goed. Bijgewerkt: tik op #bNight in plaats van #bDaily. Nieuw: Kies een molen verschijnt na molen 1, toont de gehaalde molens en past zonder scrollen, en het titelscherm past zonder scrollen op 360x640.
- Eigen test /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/intro-test/shots.js: 400x800, 360x640 en 1280x800, licht en donker, voor een nieuwe speler, maxLvl=3 met Nachtploeg en dagscore, en Gezel aan. Alles past zonder scrollen (kaart 369 tot 481 px hoog), geen horizontale scroll, alle knoppen minstens 44 px. Pick, Instellingen, Scores, Over dit spel en het dienstbriefje openen en Esc brengt je terug naar de titel. Screenshots in /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/intro-test/shots/
- intro-test/keys.js: M zet het geluid om, Gezel aanzetten in Instellingen toont het regeltje op de titel, Tab-volgorde Start, Kies een molen, Nachtploeg, Molenboek, Scores, Instellingen, Over dit spel.
