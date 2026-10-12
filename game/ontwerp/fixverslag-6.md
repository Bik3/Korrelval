# Fixverslag 6: verhaalkaart niet meer per ongeluk weg, eerlijk verder na de pauze, tekstcontrole

Bestand: korrelval-b.html (aangepast). Eindstand: 2023 regels (wc -l), 146.978 bytes, sha256 24a9ae7db0a53d2bd688c997257d669ebb42e3f6ddfee8cd5be93b5cf8f9039c. Was 1989 regels en 143.719 bytes.

## Opgeslagen versie: zo ga je terug

Voor ik iets veranderde, heb ik het spel opgeslagen zoals het nu was (de stand na fixronde 5):
- korrelval-b.v6.html in de scratchpad: precies het spel van vóór deze ronde (sha256 be50574aeb38d3f4751c56cd109957bb22f15f5128bc4725bee6382aba9de399). Het bestand is alleen-lezen, zodat het niet per ongeluk wordt overschreven.
- harness.v6.js: de testharness van vóór deze ronde (ook alleen-lezen). Ik heb harness.js deze ronde niet veranderd.
- De scratchpad hoort bij deze sessie en kan later weg zijn. Daarom staat dezelfde stand ook in de repository: game/versies/korrelval-v2-met-verhalen.html (zelfde sha256). game/versies/README.md legt uit wat erin staat en hoe je hem terugzet. Dit is niet gecommit.

Terug naar hoe het was: `cp korrelval-b.v6.html korrelval-b.html` in de scratchpad. Vanuit de repository: kopieer game/versies/korrelval-v2-met-verhalen.html over game/korrelval.html heen en maak de speelpagina opnieuw met game/build-pages.sh. De oudere stand van vóór de verhalen (korrelval-b.v5.html en game/versies/korrelval-v1-voor-verhalen.html) staat er ook nog.

## 1. Verhaalkaart per ongeluk wegtikken (belangrijk, opgelost)

- Het moment van indrukken telt nu, niet het loslaten. Een pointerdown op de knop, en een keydown van spatie of Enter, slaat op of Verder malen op dat moment al werkte (storyArm). resumeStory gaat alleen door als dat zo was. Een duim die op 0,45 s neerkomt en op 0,75 s loslaat, laat de kaart dus staan. Dat geldt ook voor een spatie die op 0,45 s ingedrukt wordt en op 0,7 s loslaat.
- Een ingehouden toets (repeat) telt niet als nieuwe indruk. Enter vroeg indrukken en vasthouden tikt de kaart dus ook niet weg.
- De stuurvinger die nog op het scherm lag toen de kaart opende (ptr.id bij openStory), blokkeert tikken tot hij is opgetild (storyHeld). Het optillen vang ik op met pointerup/pointercancel op window. Zo werkt het ook als de canvas de pointer nog vasthoudt. Raakt die pointerup toch zoek, dan kan de kaart niet vast blijven zitten: een nieuwe primaire aanraking betekent dat er geen andere vinger meer ligt, en die heft de blokkade op.
- De knop is de eerste 0,6 s gedimd (opacity .5, aria-disabled="true", geen indrukeffect). Ligt de stuurvinger daarna nog, dan blijft hij gedimd. De frame-lus zet hem actief zodra het kan. Een vroege tik gaat zo niet meer stil verloren: je ziet dat de knop nog niet werkt.
- Een klik zonder voorafgaande indruk telt op het moment van de klik zelf. Dat is bijvoorbeeld een klik van een schermlezer, want die stuurt vaak geen pointerdown. Zonder deze uitzondering zou zo iemand de kaart nooit dicht krijgen.
- De testhaak geeft story.ready nu met dezelfde regel, en daarnaast story.held.

## 2. Eerlijk verder na Verder malen (belangrijk, opgelost)

- In resumeStory blijft de korrel nu knipperend onkwetsbaar tot 0,15 s nadat het eerste obstakel na de pauze voorbij is. Het is minstens 1,2 s (CONFIG.story.inv) en hooguit 2,2 s (nieuw: CONFIG.story.invMax). Ik heb de onkwetsbaarheid in één keer goed gezet, zodat het knipperen gewoon doorloopt. Ik heb geen teller gebruikt die hem steeds bijvult, want dan stopt het knipperen terwijl de korrel nog onkwetsbaar is.
- De tijd tot dat obstakel rekent mee met een waterpauze die nog loopt (timeTo). Dan loopt de wereld eerst op 0,55× snelheid, en anders zou de onkwetsbaarheid te vroeg aflopen.
- Ik heb het iets ruimer gemaakt dan de voorgestelde formule, die alleen naar verdiepingen keek. Het eerste obstakel kan ook een steen, bout of moederkoren zijn die de reiniging liet liggen omdat hij net buiten haar venster valt. In de eerste meetronde (alleen verdiepingen) kreeg de niet-sturende bot in molen 2 zo 2 van de 10 keer een steen of bout op 1,76-1,77 s. Ook telt het eerstvolgende vak mee dat nog niet is aangemaakt (gen.nextY). In molen 5 en 6 ligt de aanmaakhorizon (728 px) soms vóór die 2,2 s.
- Een verdieping die je onkwetsbaar raakt, levert zoals altijd geen punten en geen reeks op, maar kost ook geen korrel.

## 3. Over dit spel, tweede alinea (belangrijk, opgelost)

Letterlijk vervangen door: "Elke verdieping levert bloem op, en een perfecte passage levert extra op. Meer bloem krijg je voor bonussen die je onderweg pakt, de gouden silo, de korrels die je overhoudt en je precisie. Na afloop zie je ook je langste reeks verdiepingen zonder botsing."

## 4. Deelregel (klein, opgelost)

``const streak = run.bestStreak > 1 ? `${fl(run.bestStreak, ' ')} op rij zonder botsing, ` : '';`` geeft nu bijvoorbeeld "…, goed voor circa 2.160 broden, 14 verdiepingen op rij zonder botsing, Short patent, 100% perfect · speel mee: …". Bij een reeks van 0 of 1 valt het stuk weg. Let op: de spatie in fl() was geen harde spatie maar een gewone (0x20). Volgens de opdracht heb ik hem gelaten zoals hij was.

## 5. Jaarverslag, Jubileumjaar (klein, opgelost)

Letterlijk vervangen door: "In het Urban Tarweveld in de Leeuwarder wijk Middelsee groeide in 2026 tarwe gewoon bij de stoplichten." Aan de verhalen zelf is niets veranderd.

## Hoe getest

1. Script uitgepakt naar korrelval.extracted.js en gecontroleerd met `node --check`: geen fouten (eindversie).
2. `node harness.js korrelval-b.html shots-fix6` op de eindversie: started, gameOver en restarted zijn op 400x800 en 1280x800 allemaal true. De enige fout is het certificaat van Google Fonts (ERR_CERT_AUTHORITY_INVALID), zoals in eerdere rondes.
3. Eigen scripts in fix6/. Die gebruiken dezelfde opzet als playtest-5: lokale fonts, geïnstrumenteerde kopie en CDP-touch.
   - fix6/thumb.js (de duimtest van de speltester, 400x800 en 360x640). De duim stuurt op knophoogte als de kaart opent en tilt op na 0,15 s. Daarna komt een nieuwe tik op de knop. De tijden zijn gemeten in de pagina. Pointerdown op 0,41 / 0,44 / 0,49 s met loslaten op 0,49-0,80 s: de kaart blijft staan. Een rustige tweede tik daarna (0,70-1,06 s) gaat wel verder. Pointerdown vanaf 0,60 s gaat verder. De duim die blijft liggen terwijl een tweede vinger op 0,8 s tikt: de kaart blijft staan en de knop is gedimd (held true). Na het optillen is de knop actief, en een tik gaat verder met 2,04-2,06 s onkwetsbaarheid. Geen fouten.
   - fix6/keys.js (1280x800, molen 3). Spatie neer op 0,33 / 0,47 / 0,57 s en los op 0,49-0,93 s: de kaart blijft. Spatie neer op 0,66 s: verder. Enter neer op 0,48 s: de kaart blijft, en neer op 0,65 s: verder. Bij de muis is dat 0,31 en 0,46 s (blijft) tegen 0,71 s (verder). Spatie zonder focus op de knop (via primary()): neer op 0,46 s blijft, op 0,71 s verder. Enter en spatie ingedrukt op 0,3 s en vastgehouden tot 1,05 s met herhaalde toetsen: de kaart blijft. Een klik zonder indruk (zoals hulpsoftware): op 0,31 s blijft hij, op 0,81 s gaat hij verder. Geen fouten.
   - fix6/fair.js (kopie van playtest-5/t2-fair.js) op de eindversie: 114 runs, verdeeld over 6 molens. De bot die niet stuurt deed 10 runs per molen. Daarnaast deden "noneslow" (niet sturen terwijl een waterpauze nog 2 s loopt), de autopilot en een bot met 0,5 s reactietijd elk 3 runs. Uitkomst: 0 keer schade binnen 1,5 s, en 0 keer schade tot en met het eerste obstakel na de pauze. In de meting van de speltester op v6 was er schade binnen 1,5 s in 14 van de 30 runs in molen 3, 4 en 6. De vroegste schade voor de bot die niet stuurt was nu 1,87 s, in molen 6 bij de tweede verdieping na de pauze. Daarvoor heeft hij dus al bijna 2 s niet gestuurd. Onkwetsbaarheid na Verder malen: molen 1 2,07-2,14 s, molen 2 1,85-1,95 s, molen 3 1,66-1,74 s, molen 4 1,45-1,55 s, molen 5 1,32-1,35 s en molen 6 1,12-1,20 s. Lag de eerstvolgende verdieping twee intervallen weg, dan was het tot 2,2 s. De log staat in fix6/fair-final.log en de data in fix6/fair-final.json. fix6/fair.log is de eerste meetronde, met de tussenversie die alleen naar verdiepingen keek.
   - fix6/shots.js: 19 van 19 checks geslaagd. De verhaalkaart van molen 1 past zonder scrollen op 400x800 (435 px, knop y 542-600) en 360x640 (363 px, knop y 437-487). De knop is eerst gedimd en daarna actief. Na Verder malen is de korrel 2,13 s onkwetsbaar. De weegbon toont "Langste reeks zonder botsing" 11 (400x800) en 12 (360x640), en past zonder scrollen. De deelregel is getest bij een reeks van 0, 1, 2 en 14, ook in jaarverslagvorm. De tekst van het jaarverslag (Jubileumjaar) en van Over dit spel staat er letterlijk zoals gevraagd. Er zijn geen pagina- of consolefouten.
4. Schermafbeeldingen in shots-fix6-mine, allemaal bekeken met de Read-tool: story-L1-400x800.png, story-L1-360x640.png (actieve knop), story-dim-400x800.png en story-dim-360x640.png (gedimde knop in de eerste 0,6 s; de tekst blijft goed leesbaar), story-held-400x800.png, weegbon-L1-400x800.png en weegbon-L1-360x640.png (met de regel Langste reeks zonder botsing), jaarverslag-400x800.png (Jubileumjaar in de verleden tijd, Langste reeks 14) en about-400x800-scrolled.png. Ik zag er geen problemen in: geen afgekapte tekst, geen overlap, en de knop blijft in beeld.

## Wat opvalt of niet gedaan

- De onkwetsbaarheid is hooguit 2,2 s. Ligt het eerste obstakel verder weg, bijvoorbeeld 2,4 s in molen 5 als de reiniging het vak ervoor weghaalde, dan raakt een speler die nog steeds niet stuurt die verdieping op ±2,3 s. Dat is ruim buiten het venster van 1,5 s.
- Een speler die de knop te vroeg indrukt, moet opnieuw tikken. De gedimde knop laat zien waarom.
- Het verschil tussen "nog net te vroeg" en "op tijd" ligt precies op 0,60 s na het openen van de kaart, gemeten op het moment van indrukken.
- game/korrelval.html en docs/index.html in de repository heb ik niet bijgewerkt. Alleen de opgeslagen versie staat erbij (game/versies).
- Geen git-opdrachten die iets veranderen. Wel heb ik per vergissing één keer `git status --short` gedraaid om de map game/versies te bekijken. Dat leest alleen, en er stond niets open.
