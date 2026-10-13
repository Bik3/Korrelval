# Brainstorm Korrelval, oktober 2026

Vier rollen speelden het spel (nieuwe collega, gamedesigner, merk en communicatie, kwaliteit). Daarna zijn de ideeën samengevoegd en kritisch tegengelezen. Er is nog niets van gebouwd.

## Samenvatting

Alle vier de rollen vinden Korrelval verzorgd. Molen 1 is rustig en de verhaalpauze en de weegbon werken goed. Het grootste gedeelde probleem is de Nachtploeg. Nergens staat wat het is: een tik op de grijze knop doet niets, en de pagina in het Molenboek gaat pas open nadat je hem gespeeld hebt. Na molen 1 val je bovendien met één korrel in het tempo van de molen uit 2008, waardoor ook goede spelers er binnen seconden uitliggen. Alle rollen vinden een laadscherm nep, want er valt niets te laden. Een korte proloog die vertelt wat Royal Koopmans nu is en je meteen leert sturen, vinden ze wel waardevol. Het korreltje is schattig, maar het reageert op niets, en je ziet niet dat het bloem wordt. Niemand weet of collega's het spel leuk vinden; zonder server zijn meekijken met vijf collega's en één vrijwillige formuliervraag de eerlijke manier. Ik heb zelf een ronde gespeeld en dat klopt: een tik op 'Korrel van de dag' laat het titelscherm staan, de regel '+ nog meer onderweg' loopt in molen 1 en in de Nachtploeg over de rand, het Wist-je-dat op de eerste weegbon herhaalt de introband letterlijk, en zelfs de autopiloot (die perfect stuurt maar niets ontwijkt) haalde in de Nachtploeg maar 22 verdiepingen. Screenshots staan in /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/brainstorm/synth/.

## Gerangschikte ideeën

### 1. Nachtploeg uitleggen met een dienstbriefje (moeite: klein)

Wat de speler merkt: Wie op Nachtploeg tikt, krijgt één keer een kaart die op een tik wacht. In drie korte regels staat wat het is, hoe het werkt en wat het verschil is tussen Korrel van de dag en Vrije dienst. Vóór molen 1 zegt dezelfde kaart wanneer de Nachtploeg opengaat, in plaats van niets te doen. Via 'Wat is dit?' kun je hem altijd teruglezen.

Hoe: 1) Een nieuwe section scrNight in de stijl van scrStory: een kaart die op een tik wacht, met Esc als terug. Kop: 'De Nachtploeg'. Daaronder drie regels: 'De molen in Leeuwarden draait dag en nacht door, in vijf ploegen. Jij draait de nacht.' / 'Eén korrel, geen einde. Het begint rustig en gaat steeds iets sneller. Hoe diep kom jij?' / 'Korrel van de dag: vandaag krijgt iedereen dezelfde schacht, dus kopieer je score en vergelijk met collega's. Vrije dienst: elke keer een andere schacht, om te oefenen.' Onderaan staan de knoppen [Korrel van de dag] en [Vrije dienst], zodat het briefje meteen de keuze is. 2) Met de vlag save.nightBrief verschijnt hij alleen de eerste keer vanzelf. Daarna is hij terug te lezen via een linkje 'Wat is dit?' naast het kopje Nachtploeg. 3) Zolang de Nachtploeg dicht is: bDaily en bFree krijgen aria-disabled in plaats van disabled. Een tik opent hetzelfde briefje, met onderaan 'Gaat open na molen 1 (1846), zo'n halve minuut spelen' en een knop 'Speel molen 1'. Geen toast, want die is na 2,6 s weg. 4) unlockPage('night') verhuist van gameOver naar levelComplete, op de plek waar save.night true wordt. Zo kun je nalezen voordat je speelt. 5) Op de weegbon van molen 1 wordt de vetgedrukte zin 'De Nachtploeg is nu open.' een klein kader 'Nieuw: de Nachtploeg' met de knop 'Wat is dat?'. 6) Onderschriften op de knoppen: 'vergelijk met collega's' en 'oefenen, elke keer anders'. 'Top 5!' wordt 'Top 5 op deze telefoon', zodat niemand een gedeelde ranglijst verwacht.

Waarom: Alle vier de rollen struikelden hierover, los van elkaar. Ik heb het nagespeeld: na een tik op de grijze knop blijft het scherm gewoon het titelscherm. Het is één kaart in een stijl die al bestaat, het beantwoordt Bikkels eerste vraag en er komt niets bij tijdens het spelen.

### 2. Een rustige eerste zone in de Nachtploeg (moeite: klein)

Wat de speler merkt: De Nachtploeg begint op het tempo van molen 2 tot 3 en loopt in de eerste tien verdiepingen (zone Slotermeer) op naar het huidige tempo. Nieuwe obstakels komen er per zone één voor één bij. Wie molen 1 net gehaald heeft, ligt er niet meer binnen tien seconden uit.

Hoe: 1) In params(n) voor 'night', zolang n kleiner is dan 10: de scroll loopt lineair van 240 naar 360, de spleet van 0,30 naar 0,20 en het interval van 1,4 naar 1,1. Vanaf n = 10 geldt de bestaande formule ongewijzigd. Die begint op 360 en 0,20, dus ervaren spelers zitten na zo'n 15 s weer op het oude tempo. Gezel vermenigvuldigt er zoals nu bovenop. 2) Optionele tweede stap: zoneCfg(n) geeft per zone de mix. Zone 1 heeft walsen en stenen, zone 2 bouten en een plansichter met één gat, zone 3 moederkoren en twee gaten. 'Nieuw voor jou' in de introband toont dan alleen zone 1: twee regels in plaats van vier plus '+ nog meer'. 3) De verandering geldt voor iedereen, en de schacht van de dag hangt alleen van de datum af. De Korrel van de dag blijft dus eerlijk. 4) Controleren met de bots uit brainstorm/night.js en qa/cliff.js. Een speler met 22 px ruis moet zone 1 meestal overleven. De autopiloot mag niet eindeloos doorgaan.

Waarom: Drie rollen maten hetzelfde. Molen 1 heeft scroll 170, spleet 0,38 en drie korrels. Daarna begint de Nachtploeg met scroll 360, spleet 0,20 en één korrel: precies molen 5 uit 2008. Testspelers lagen er na 2 tot 9 verdiepingen uit. Uitleg helpt pas als het spelen daarna ook lukt, en dit zijn een paar regels in params().

### 3. Tikken stuurt ook, en een duimpje dat het voordoet (moeite: klein)

Wat de speler merkt: Wie op het scherm tikt in plaats van sleept, ziet de korrel toch bewegen. Wie in molen 1 niet sleept, krijgt een doorzichtig duimpje te zien dat de beweging voordoet, zonder tekst. Voor slepers verandert er niets.

Hoe: 1) In de touch-pointerdown bewaar je downX en downT. In ptrEnd telt een aanraking als tik bij minder dan 10 px beweging, korter dan 250 ms en geen wachtende introband. 2) Veiligste versie: tikken gaat pas sturen (G.tx = clamp(p.x, xLo(), xHi())) nadat iemand twee keer getikt heeft zonder te slepen (run.tapper). Zo zien slepers nooit een sprong. 3) In molen 1 houd je run.dragged bij. Na 3 verdiepingen zonder sleep tekent het canvas een duimpje op 50% dekking dat twee keer onder de korrel heen en weer schuift. Bij de eerste echte sleep verdwijnt het. 4) In drawIntroNew komt naast 'Sleep met je duim' een klein bewegend duim-icoontje. 5) In gameOver: was het molen 1 en is er nul keer gesleept, dan komt boven 'Nog een korrel?' een DOM-regel: 'Tip: leg je duim op het scherm en schuif naar links of rechts.' Dat is na het spelen. 6) De starttik op de introband stuurt nooit, zoals nu in pointerdown.

Waarom: Niet-gamers tikken. In de test van de nieuwe collega bleef de korrel bij alleen tikken op x=200 staan, en na 14 s kwam zonder uitleg 'Partij afgekeurd'. De code bevestigt het: touch zet G.tx = G.x bij pointerdown en stuurt alleen bij pointermove. Het is een kleine ingreep met veel effect voor precies de doelgroep, zonder leestekst tijdens het spelen.

### 4. Meten of collega's het leuk vinden: kijktest plus één vrijwillige vraag (moeite: klein)

Wat de speler merkt: Vijf nieuwe collega's spelen terwijl Bikkel meekijkt en niets zegt, nu en nog eens na de verbeteringen. In het spel verschijnt één keer een klein kader 'Hoe vond je Korrelval?' met drie knoppen, nooit tijdens het spelen. Dat kader komt alleen als er een formulierlink is ingevuld.

Hoe: a) Een kijktest zonder code, beschreven op één A4. Vijf mensen die weinig gamen spelen tien minuten op hun eigen telefoon via de link, zonder uitleg. Kies een mix: een nieuwe collega, iemand uit de ploegendienst, iemand van verkoop of de bakkerij, iemand die nooit gamet. Turf: tikt of sleept iemand, leest hij de introband of tikt hij die weg (stopwatch), haalt hij molen 1 binnen twee pogingen, opent hij uit zichzelf het Molenboek. Vraag vóór de tik op Nachtploeg: 'Wat denk je dat dit is?' Stel na afloop drie vragen: 'Noem twee dingen uit de geschiedenis', 'Wat snapte je niet?' en 'Zou je het nog eens spelen, en waarom?'. b) In CONFIG komt feedbackUrl. Standaard is die leeg, en dan blijft het kader verborgen. Met een anonieme Microsoft Forms-link (naam vastleggen uit) verschijnt op het titelscherm één rij 'Hoe vond je Korrelval?' met [Leuk] [Gaat wel] [Niet mijn ding] [x]. Dat gebeurt zodra save.maxLvl >= 2 of na de eerste Nachtploeg. Elke knop opent de link in een nieuw tabblad, met alleen het antwoord vooringevuld, en zet save.fbAsked. Zet in het formulier ook één kennisvraag ('In welk Fries dorp begon Koopmans?'), dan meet je ook of het inwerkdoel lukt. In Over dit spel komt een vaste link 'Fout gezien of een idee? Laat het weten'. c) Een signaal zonder code: tel de geplakte Korrel van de dag-regels in het Teams-kanaal van de inwerkgroep.

Waarom: Alle vier de rollen kwamen hier los van elkaar op uit. Er is geen server, en analytics betekent een cookiemelding, dus vragen en meekijken is de eerlijke route. De kijktest kost geen code en laat zien welke andere ideeën echt nodig zijn. Doe hem dus het liefst vóór de grote bouwstappen.

### 5. De grote knop gaat verder waar je was, en een rustiger titelscherm (moeite: klein)

Wat de speler merkt: Wie terugkomt, ziet op de oranje knop 'Verder: 1867 Leeuwarden' in plaats van opnieuw 1846. Bij het eerste bezoek staan er minder knoppen. De Friese woorden krijgen een kleine vertaling.

Hoe: 1) In refreshTitle: is save.maxLvl groter dan 0 en is de tijdlijn nog niet uitgespeeld, dan wordt bStart `Verder: ${year} ${short}` met onclick startCampaign(save.maxLvl). 2) De jaarchips heten 'Kies een molen', met een link 'Opnieuw vanaf 1846'. 3) Bij het eerste bezoek komt in plaats van twee grijze Nachtploeg-knoppen één regel 'Nachtploeg: gaat open na molen 1 · Wat is dat?', die het briefje uit idee 1 opent. 4) Scores verschijnt pas na de eerste partij (save.top.length). 5) shareRow verhuist naar onder de knoppen, of naar Over dit spel en het jaarverslag. Vraag dat eerst na. 6) Zolang maxLvl 0 is, komt onder 'It giet oan!' een <small>Fries: het gaat door!</small>. Bij 'Oant moarn' komt '(tot morgen)'.

Waarom: Op 400x800 staat 'Deel het spel' nog boven de startknop, en er zijn tien knoppen en velden. Nieuwkomers spelen in stukjes, bijvoorbeeld voor en na de lunch. Nu moeten ze dan via kleine jaarknopjes terug naar waar ze waren. Weinig werk, minder verwarring.

### 6. Weegbon-vraag: 'Weet je het nog?' (moeite: middel)

Wat de speler merkt: Op de weegbon na elke molen staat één vraag over het verhaal van die molen, met twee antwoorden. Bij een goed antwoord komt er een stempel 'Klopt!'. Bij een fout antwoord licht rustig het goede antwoord op, met de zin uit het verhaal. Je krijgt nooit straf en kunt altijd door. Op het jaarverslag staat 'x van 6 goed', om te kopiëren.

Hoe: 1) STORIES krijgt per molen een veld vraag: { q, goed, fout }. 2) levelComplete() vult een blok #lvQuiz op de plek van het Wist-je-dat-kaartje. Dat kaartje herhaalt in molen 1 nu letterlijk de introband. De twee knoppen staan in een .row, in willekeurige volgorde. 3) Goed: een stempel, eventueel met een bonregel. Fout: de goede knop licht op, met de zin uit het verhaal erbij. 'Volgende molen' werkt ook zonder antwoord. 4) save.quiz bewaart per molen goed of fout. Het Molenboek zet een vinkje bij het verhaal, en het jaarverslag toont de score met de bestaande copyText. In de Nachtploeg blijft het Wist-je-dat gewoon staan. 5) Gebruik alleen vaste, historische feiten die letterlijk in het verhaal staan. 1846: 'Waar stond Uilkes rosmolen? Holwerd / Leeuwarden'. 1867: 'Waarom Leeuwarden? Daar konden grote schepen komen / Daar waaide het harder'. 1920: 'Wat schreef vader Jan in 1928 aan Uco? Wees rechtvaardig, trouw en eerlijk / Maal altijd 's nachts'. 1976: 'Hoe maak je paneermeel? Speciaal brood bakken, drogen en weer malen / Zemelen roosteren'. 2008: 'Waar gingen de bakmixen voor thuis in 2000 heen? Naar Dr. Oetker / Naar een bakker in Holwerd'. 2026: 'Wat wilde Uco al in 1932? Betere Nederlandse tarwe / Een molen in Amsterdam'.

Waarom: Dit idee laat de geschiedenis beter hangen, en dat is precies wat de brand manager wil. Tegelijk meet het of dat lukt. Zelf iets terughalen werkt beter dan nog eens lezen. De vraag staat op de weegbon, dus tussen de molens en op eigen tempo, en vervangt een kaartje in plaats van er een bij te zetten. De vraag van 2008 leert meteen het grootste misverstand: het supermarktmerk Koopmans is van Dr. Oetker.

### 7. Proloog 'Van Leeuwarden 2026 terug naar Holwerd' in plaats van een laadscherm (moeite: middel)

Wat de speler merkt: Bij de allereerste 'It giet oan!' komen vier kaartjes, elk met één zin en een bewegend tekeningetje. Je tikt er zelf doorheen. Daarna volgt een lege oefenschacht waarin de korrel je duim volgt. 'Overslaan' staat altijd rechtsboven. Er komt geen laadbalk, want er valt niets te laden.

Hoe: 1) Een nieuwe section scrProlog, gebouwd zoals scrStory, met een canvas van ongeveer 300x170. Daarop tekent drawEraVignette op groter formaat; de loskade, Molen B en de rosmolen bestaan al. De korrel teken je met drawGrain op 4x. 2) De vier kaartjes, alleen met feiten uit het onderzoek en elk onder 30 woorden. (1) 'Leeuwarden, 2026. Royal Koopmans maalt hier elk jaar ruim 200.000 ton graan, voor bakkers en de voedingsindustrie.' (2) 'Jij bent één tarwekorrel. Je valt straks door 180 jaar molengeschiedenis.' (3) De jaarteller rolt terug van 2026 naar 1846 (rolwerk uit drawIntro), met het paard bij de rosmolen: 'Het begon in Holwerd. Bakkersgezel Uilke Klazes Koopmans leent 1.550 gulden en begint een rosmolen.' (4) 'Uilke begon als gezel. Hoe begin jij?' met [Rustig, als gezel] en [Gewoon]. Die keuze zet save.gezel en legt zo meteen uit wat Gezel is. 3) Daarna de oefenschacht: resetWorld met een leeg begin. De eerste molensteen komt pas als G.x 60 px links en 60 px rechts van het midden is geweest, of na 6 s. Een duimpje doet het voor, zonder tekst. 4) Daarna save.prolog = true en startCampaign(0). Is de proloog net getoond, dan laat de introband van 1846 de Uilke-regel en 'Zo speel je' weg. Zo wordt die band eindelijk rustig en staat er niets dubbel. 5) Spatie of Enter is verder, Esc is overslaan. Bij prefers-reduced-motion staan de tekeningen stil. 6) De proloog is terug te kijken als eerste pagina 'Proloog' in het Molenboek.

Waarom: Alle rollen zeggen hetzelfde: een laadscherm zou nep zijn, want het is één bestand van 206 kB en alleen de lettertypen komen van buiten. Maar het spel begint nu koud, in een volle introband. In mijn screenshot staan daar een jaarteller, drie regels geschiedenis, vier regels 'Nieuw', een regel die over de rand loopt en 'Zo speel je'. De proloog is Bikkels 'klein verhaaltje naar de eerste molen', maar dan nuttig. Hij vertelt wat Royal Koopmans nu is (dat zien nieuwkomers anders pas in molen 5 en 6), leert sturen zonder leestekst en maakt de eerste introband korter.

### 8. Kwaliteit: altijd laden, opruimronde en een testlijst die speelt als een nieuwkomer (moeite: middel)

Wat de speler merkt: Het spel opent ook op een bedrijfsnetwerk dat Google Fonts tegenhoudt. De kleine slordigheden zijn weg. De terugknop van de telefoon sluit eerst een kaart in plaats van het spel. En vóór elke publicatie draait één test die speelt zoals een nieuwe collega.

Hoe: 1) Lettertypen: build-pages.sh zet de woff2-bestanden van Nunito en La Belle Aurore in docs/fonts, met @font-face en font-display:swap. Beide vallen onder de Open Font License. De artifact-versie laadt de Google-link niet-blokkerend (media="print" onload). 2) Opruimen: maxWidth 296 op de fillText '+ nog meer onderweg' in drawIntroNew. Die loopt in mijn screenshots in molen 1 én in de Nachtploeg over de rand. De kluisgrap op Scores vervangen door 'Scores blijven op dit apparaat.' De bulkcelregel pas tonen vanaf 1 cel (nu staat er '0,3'). Scores mag niet crashen als save.maxLvl te groot is, dus clampen bij het laden. De badges op de game-over-bon krijgen een naam of een stippelrand in plaats van zes naamloze grijze rondjes. show() zet de focus op de kop van elke kaart, zodat een schermlezer het verhaal voorleest. 3) Terugknop: history.pushState bij het openen van Molenboek, Over, Scores en pauze. Bij popstate sluit de kaart of pauzeert het spel. Hooguit één extra stap, zodat je niet vast komt te zitten. 4) Testlijst: één commando dat de bestaande scripts bundelt (brainstorm/tapper.js, play.js, night.js, qa/hang.js, sizes.js, storage.js). De controles: (1) een speler die alleen tikt, laat de korrel bewegen; (2) een slordige speler (45 px ruis) haalt het verhaal van molen 2; (3) een gewone speler (22 px ruis) overleeft zone 1 van de Nachtploeg meestal, gemeten over 5 keer; (4) de titel staat er binnen 2 s terwijl de fonts hangen; (5) de route werkt op 320x568, 400x800 en 1280x800 zonder fouten; (6) een inhoudscheck op de vermijdlijst (Dan ben je thuis, Pannenkoekdag) en op nieuwe persoonsnamen. De certificaatfout van de fonts wordt weggefilterd, zodat rood weer iets betekent. build-pages.sh publiceert niet als er iets rood is.

Waarom: De kwaliteitsrol mat dat de pagina leeg blijft als een firewall de fontaanvraag stil laat vallen: na 30 s nog steeds grijs, en het spelscript start nooit. Bij een inwerksessie op bedrijfslaptops is dat het ergste wat kan gebeuren. Bovendien gaat nu het IP-adres van elke speler naar Google, een bekend AVG-punt. De huidige zelftest speelt met een perfecte autopiloot en ziet de problemen van nieuwkomers dus niet. De meeste losse fixes zijn één regel.

### 9. Het korreltje: kijkt naar de spleet, reageert, en wordt zichtbaar bloem (moeite: middel)

Wat de speler merkt: Het korreltje kijkt met zijn oogjes naar de volgende spleet, kijkt blij bij een perfecte passage en knijpt zijn ogen dicht bij een botsing. Binnen een molen wordt hij in zichtbare stapjes witter. In de silo wordt hij een pufje meel in de kleur van jouw uitmaling, dezelfde kleur als op de weegbon. Alles zonder tekst.

Hoe: Stap 1 (klein): drawGrain krijgt G.mood. 'blij' duurt 0,3 s na een perfecte passage (in floorPassed) en tekent ^ ^. 'au' duurt 0,4 s na hurt() en tekent > <. De ogen worden 2,6 px met een pupil van 1,3 px. Die pupil schuift hooguit 1,2 px naar de spleet zoals die er bij aankomst staat, met dezelfde berekening als autoSteer, zodat een plansichter niet misleidt. Bij een perfecte passage tussen walsen wordt de korrel kort platgedrukt (ctx.scale(1+k, 1-k)) en veert in 0,15 s terug: dat is het malen. Op het titelscherm komt een groot knipperend korreltje naast 'Korrelval'. Stap 2 (middel): de glijdende kleur (lv.white + knaks*0,012) is nu onzichtbaar. Die wordt drie of vier duidelijke trappen bovenop de molenkleur, op basis van de perfecte passages in deze molen, met barstlijntjes en bij elke trap een iets grotere zemelwolk uit knak(). In siloLanded komt een wolkje van zo'n 20 deeltjes in de uitmalingskleur (een nieuwe kolom in UIT). In levelComplete komt een rond meelstaaltje in die kleur naast 'Jouw meel'. In het Molenboek komt één zin onder 'Jouw korrel': 'Bij elke walsenstoel breekt er een stukje zemel af. Daarom wordt je korrel witter.' hitR() blijft precies gelijk, en er komen geen extra deeltjes per frame. Op de lichte tegelmuur van 1920 het contrast van de witte trap controleren, en op een telefoon van 360 px breed testen.

Waarom: Drie rollen zagen hetzelfde: het mooiste idee van het spel, dat de korrel bloem wordt, ziet niemand, en de held reageert niet op wat er gebeurt. De oogjes laten nieuwkomers zonder woorden zien waar ze heen moeten. De kleurtrappen maken 'uitmaling' en 'Short patent' op de weegbon begrijpelijk. Alles blijft binnen de korrel van 18x24 px, dus het scherm wordt niet drukker. Begin met stap 1.

### 10. Badges laten zien als de vijf kernwaarden van Royal Koopmans (moeite: klein)

Wat de speler merkt: Boven de vijf badges staat 'De vijf kernwaarden van Royal Koopmans', en 'Elke korrel telt' staat er apart naast. Een tik op een badge zegt de naam, dat het een kernwaarde is en hoe je hem in het spel haalt. Alle vijf zijn in de eerste week te halen.

Hoe: 1) fillBadges, fillBadgesAll en het Scores-scherm krijgen een kopje. 'elk' (Nedertarwe) komt in een eigen rijtje. 2) De toast in badgeEl wordt bijvoorbeeld: 'Vakmanschap, een kernwaarde van Royal Koopmans. In het spel: 75% perfect in één molen.' 3) Eerlijkere regels. Menselijk wordt: alle zes verhalen gelezen (save.book st0 tot st5). Dat sluit aan op 'verplaats je in de ander' uit de brief van 1928, en is beter dan alleen via de Gezel-modus. Gepassioneerd wordt: op drie verschillende dagen de Korrel van de dag gespeeld (de datumsleutels in save.daily), in plaats van 75 verdiepingen in één keer. 4) Een korte Molenboek-pagina 'Kernwaarden' met alleen de vijf namen en hoe je ze verdient. Een zin over wat een waarde betekent, komt er alleen bij als HR die levert. 5) Al verdiende badges blijven staan.

Waarom: Nieuwe collega's horen de kernwaarden (het Waardenhuis) op dag 1 bij HR. Het spel zegt nergens dat de badges die waarden zijn; het woord 'kernwaarde' staat alleen in een codecommentaar. Gepassioneerd vraagt nu 75 verdiepingen, terwijl testspelers 4 tot 34 haalden. En Menselijk aan de makkelijke stand koppelen zegt iets wat niemand bedoelt. Met weinig werk sluit het spel zo direct aan op het inwerkprogramma.

## Ook overwegen

- Molenboek als tijdlijn, met 'Royal Koopmans nu' vooraan: Bovenaan het Molenboek een rij jaarchips (1846 tot 2026 en 'nu') met kleine tekeningetjes. Per jaar één korte kaart met 'Lees verder'. 1920, 1976 en 2008 krijgen een eigen vignet in plaats van de loskade. De kaart 'nu' bevat alleen nagekeken feiten: De Merodestraat, Koopmans Meel en Koopmans Food Ingredients, bakkers en voedingsindustrie, KIEM en Nedertarwe. Het boek is nu na 'Toon alle pagina's' een rol van ruim 1.200 woorden.
- De reeks hoorbaar maken, niet zichtbaar: Perfecte passages op rij klimmen op een vijftonige ladder, bij 8 op rij klinkt een molenbelletje en een botsing zet het terug naar de grondtoon. Een gewone passage krijgt een zacht 'klak'. Er komt niets in beeld, dus dit past bij het weghalen van de combo's. Geluid staat op kantoor vaak uit, dus lage prioriteit.
- Nachtploeg als dienst van 22:00 tot 06:00: De klok in de HUD wordt het doel. Wie 06:00 haalt, krijgt een eindkaart 'Overdracht aan de ochtendploeg', en de game-over-kaart toont met een balkje hoe ver je kwam. Bij een zonewissel klinkt alleen een zachte gong, zonder pilletjes of flitsen in beeld. Pas doen na de rustige eerste zone en de kijktest, en de minuten per verdieping afstellen op een gewone speler.
- Inwerkset buiten het spel: Een buddy-kaart van één pagina. Dag 1: molen 1846 en 1867 spelen, zo'n 5 minuten. Dag 2 tot 5: 's ochtends de Korrel van de dag spelen en je regel in het teamkanaal plakken. Verder een A4 met een QR-code voor de kantine of de introductiedag, en een kortere deelregel van twee regels in shareLine(). Meedoen telt; delen is altijd vrijwillig.
- Deelbeeld en een privacyblok: Een og:image van 1200x630 met de korrel en 'Korrelval · 180 jaar, van rosmolen tot Molen B', zodat een link in Teams, LinkedIn of WhatsApp een beeld krijgt. In Over dit spel de zin 'Het spel zelf verzamelt niets; je scores staan alleen op dit toestel' en een knop 'Wis mijn gegevens op dit toestel'. Dat is handig op een gedeelde tablet op een open dag.
- Bronnen en een vaste controleronde: Een Molenboek-blok 'Waar komt dit vandaan?' met per verhaal één of twee bronnamen. Bij de feiten over nu komt 'stand: oktober 2026'. De claim 'melden een storing al voordat die optreedt' op de pagina Vooruitblik wordt zachter: 'zijn vergaand gedigitaliseerd'. Plus een checklist uit STORIES, FACTS en het Molenboek, die iemand van communicatie vóór elke inwerkgroep naleest.
- Introband als HTML-kaart: De tekst van de introband in een DOM-kaart over het canvas, minimaal 14 px. Zo groeit hij mee met zoom en de lettergrootte van het systeem, en leest een schermlezer hem voor. Nu wordt de tekst op kleine telefoons 8 tot 10 px, en bij 200% zoom zelfs kleiner. Dit wordt minder dringend als de proloog de eerste band korter maakt.
- Zuiniger tekenen op zwakke telefoons: Tijdens de introband de frametijd meten en bij traag tekenen de canvasresolutie stap voor stap verlagen. Achter het Molenboek, Over dit spel, de verhaalkaart en de weegbon niet meer elke frame opnieuw tekenen. Dat scheelt batterij en warmte, juist tijdens het lezen op eigen tempo.
- Lokaal speelverslag achter ?speeltest: Alleen met ?speeltest in de link: een knop 'Kopieer speelverslag' met de pogingen per molen, hoeveel seconden het verhaal open stond, of het Molenboek open is geweest en of Gezel aan stond. Het verslag is anoniem, wordt niet automatisch verstuurd en is handig als de kijktest op afstand moet.
- Korrelcheck in het Molenboek: Een uitbreiding van de weegbon-vraag: vijf meerkeuzevragen alleen over pagina's die je al geopend hebt, met alleen vragen die in spelmateriaal.json als 'high' staan. De uitslag kun je kopiëren. Pas doen als de weegbon-vraag goed valt.

## Niet doen

- Een echt laadscherm of een laadbalk: Er valt niets te laden: het spel is één bestand van 206 kB. Een nep-balk laat terugkerende spelers elke keer op niets wachten. De proloog doet wat Bikkel bedoelde, maar dan alleen de eerste keer en met Overslaan.
- Tekst, tellers of flitsen toevoegen tijdens het spelen: Bikkel haalde de combo's juist weg omdat het te druk werd. Dus geen reeksteller, geen zonenaam-pilletjes met lampflits en geen uitleg-tip in de schacht. Uitleg hoort op kaarten die op een tik wachten. Tijdens het spelen alleen beeld zonder tekst (het duimpje, de oogjes) en geluid.
- Analytics, tracking of cookies: Dat betekent een cookiemelding en AVG-vragen voor een fan-made stagiairsproject, en het past niet bij Betrouwbaar. Meekijken en één vrijwillige formuliervraag leveren meer op.
- Een centrale online ranglijst voor de Korrel van de dag: Zonder server kan het niet, en het zet initialen van huidige collega's online. Scores blijven lokaal; vergelijken gaat door je regel te plakken.
- Quizvragen of nieuwe teksten over veranderlijke cijfers of huidige mensen: 'Ruim 150 boeren', '20 euro per ton' en de directeur verouderen of noemen een huidige medewerker. Stel alleen vragen over vaste, historische feiten die letterlijk in het spel staan, zodat niemand gestraft wordt voor iets wat niet te weten was.
- De korrel in stukjes laten breken (gries) tijdens het spelen: De stukjes lijken groter of anders dan de botscirkel, en dan voelen botsingen oneerlijk. Kleurtrappen en barstlijntjes vertellen hetzelfde verhaal zonder dat risico.
- Zelf invullen wat een kernwaarde betekent, of de ploegen bij naam noemen: De cao noemt een vijfploegendienst, maar de letters A tot en met E en de uitleg van de waarden zijn van Koopmans zelf. Houd het bij namen en spelregels, de rest alleen als HR het levert.
- 'Fan-made door een stagiair' vervangen door iets officieels: Teksten als 'gemaakt door Royal Koopmans' of 'feiten gecheckt' kloppen pas als er een akkoord is en de controle echt gedaan is. Tot die tijd blijft het fan-made.
- De Nachtploeg pas na molen 2 openen: Eerder is bewust besloten om hem na molen 1 te openen. De rustige eerste zone lost hetzelfde probleem op zonder dat besluit terug te draaien.
- De proloog vaker tonen dan één keer, of zonder Overslaan: Wie via een gedeelde link snel wil spelen, ergert zich aan een verplicht voorportaal. Toon hem dus alleen bij de eerste 'It giet oan!', nooit bij 'Nog een korrel?', en zet 'Overslaan' er altijd bij.

## Kritische tegenlezing

- Een rustige eerste zone in de Nachtploeg: De richting klopt, maar het voorstel noemt juist het belangrijkste deel 'optioneel'. Ik heb het gemeten op een kopie; het spelbestand is niet aangeraakt. Scripts en logs staan in /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/brainstorm/tegenlezer/ (exp.js, exp-*.log). De bot sleept met reactietijd en ruis en is onkwetsbaar gemaakt. De eerste aanraking telt als game-over, want je hebt maar één korrel.

Slordige speler (35 px ruis, Vrije dienst, 6 runs per variant). Bij elke variant staat na hoeveel verdiepingen de eerste botsing kwam:
- Huidig spel: 0 tot 4 (mediaan 2).
- Alleen het voorgestelde tempo (240 naar 360, spleet 0,30 naar 0,20): mediaan 3,5. De helft van de botsingen kwam door een plansichter of bout.
- Tempo plus een eerste zone zonder plansichter, bout en moederkoren: mediaan 8,5 (4 tot 15).
- Alleen die mix, op vol tempo: 0 tot 1, dus slechter.
- Korte aanloop van 6 verdiepingen vanaf 260: mediaan 3.

Korrel van de dag van vandaag (28 px ruis, 4 runs). In het huidige spel liep de bot 4 van de 4 keer vast op dezelfde plansichter met twee gaten, op verdieping 3. Met alleen het tempo gebeurde dat nog 3 van de 4 keer. Met tempo plus mix kwam hij tot verdieping 9 à 14.

De voorgestelde testnorm ('een speler met 22 px ruis overleeft zone 1 meestal') haalt het huidige spel in Vrije dienst al: eerste botsing na 8 tot 18 verdiepingen. Met die norm zie je het probleem dus niet.

'Klein' is krap ingeschat. 'Nieuw voor jou', de labels en het openen van Molenboek-pagina's (thingsIn(NIGHT)) moeten per zone mee.

Daar staat iets tegenover: een ervaren speler moet bij elke herstart zo'n 13 s opwarmen. Voorstel: Bouw tempo en mix samen, in één stap:
- Zone 1: walsen met alleen stenen, tempo van 240 naar 360 over tien verdiepingen.
- Zone 2: een plansichter met één gat erbij.
- Zone 3: twee gaten en moederkoren.

Toets met 30 à 35 px ruis en op 30 datums van de Korrel van de dag, niet met 22 px. Moeite: klein tot middel. Ook dan ligt een slordige speler er rond verdieping 8 uit, met één korrel. Overweeg daarom drie korrels in Vrije dienst (zie 'gemist').
- Nachtploeg uitleggen met een dienstbriefje: In de kern goed en klein. Een paar kanttekeningen:
- 'Nergens staat wat het is' is overdreven. Het titelscherm toont al 'open na de eerste molen (1846)' en daarna 'eindeloos, één korrel'. Op de knop staat 'iedereen dezelfde schacht' en op de weegbon 'De Nachtploeg is nu open.' Het echte probleem: dat staat in kleine grijze letters, en een tik op de dichte knop doet niets.
- De tekst van het briefje dubbelt met de introband van de Nachtploeg ('De molen draait volcontinu. Eén korrel, geen einde. Hoe diep kom jij?'). Wie het briefje leest en op Korrel van de dag tikt, krijgt meteen dezelfde zin. Daaronder staan nog vier regels 'Nieuw voor jou' plus '+ nog meer'. Dat zijn twee leeskaarten achter elkaar.
- 'In vijf ploegen' staat al in het spel: het Molenboek zegt 'vijfploegendienst' en de HUD toont 'ploeg E'. De vraag aan Bikkel en het punt 'ploegen niet bij naam noemen' lopen dus achter op wat er al in staat.
- Korrel van de dag en Vrije dienst verschillen nu alleen in de schacht (seed). Er is weinig echt verschil om uit te leggen. Voorstel: Bouwen, met deze aanpassingen:
- Na het briefje toont de eerste introband van de Nachtploeg alleen de jaarteller en 'Nieuw voor jou', zonder de herhaalde zin.
- Houd het briefje op drie korte regels.
- Maak het verschil echt. Vrije dienst: oefenen met drie korrels. Korrel van de dag: één korrel, eerlijk vergelijken. Dan schrijft het briefje zichzelf.
- Beslis apart of 'ploeg E' in de HUD blijft; het is tekst tijdens het spelen.
- Tikken stuurt ook, en een duimpje dat het voordoet: Het probleem is echt. Mijn tik-bot (tap.js) liet de korrel op x=200 staan; na 10 s en 4 verdiepingen kwam 'Partij afgekeurd'. Maar dat is een gescripte tikker, geen collega die je hebt zien spelen.

Tik-sturen voegt een tweede besturing toe: tikken stuurt naar de plek van je vinger, terwijl slepen nu meebeweegt met je duim 'waar dan ook'. Gaat de herkenning mis, dan springt de korrel bij een slepende speler. Een uitleg in de trant van 'sleep of tik' maakt de introband ook weer langer. De echte winst zit in het duimpje; tikken is een vangnet. Voorstel: Ronde 1:
- Een duimpje na 3 verdiepingen zonder slepen, onder de korrel en niet over de spleet.
- De tip na de game-over.

Bouw tik-sturen achter run.tapper, maar zet het pas aan als de kijktest laat zien dat collega's echt tikken. Geen extra uitlegtekst over tikken.
- Meten of collega's het leuk vinden: kijktest plus één vrijwillige vraag: De kijktest is het goedkoopste en waardevolste idee, maar staat op plek 4. Juist hij beslist of de proloog, de vraag op de weegbon en stap 2 van de korrel nodig zijn.

Het formulier in het spel is riskanter dan beschreven:
- De pagina is openbaar (bik3.github.io). Een Forms-link uit de omgeving van Koopmans in een fan-made spel staat dus open voor iedereen op internet, en lijkt een officieel Koopmans-formulier.
- Anoniem reageren ('iedereen kan reageren') staat in veel bedrijfsomgevingen uit. Binnen de organisatie legt Forms standaard namen vast.

Verder: als Bikkel als maker zelf meekijkt en vraagt, krijg je sociaal wenselijke antwoorden. En wie Teams-regels telt, volgt in feite per persoon wie meedoet. Voorstel: - Doe de kijktest in week 1, naast het bouwen. Laat iemand anders dan Bikkel de drie vragen na afloop stellen.
- Zet de formulierlink niet in het spel, maar op de buddykaart of als QR-code in het inwerkmateriaal. Of toon hem alleen met ?inwerk in de link.
- Tel Teams-regels alleen als totaal, nooit per naam.
- Kwaliteit: altijd laden, opruimronde en een testlijst die speelt als een nieuwkomer: Dit voorstel bundelt een klein, dringend punt met een middelgroot project.

Het dringende punt: als de fontaanvraag blijft hangen, blijft de pagina leeg (QA-screenshot: na 30 s nog niets). Dat raakt precies het inwerken op bedrijfslaptops, en het is een middag werk.

De testlijst is groter werk, en norm (3) is verkeerd ingesteld (zie de rustige eerste zone).

History.pushState voor de terugknop is foutgevoelig in de claude.ai-iframe, en mensen ervaren het snel als een terugknop die vastzit.

De herhaling van het Wist-je-dat zit dieper dan gemeld. pickFact wist run.facts bij elke nieuwe run. Ik zag het feit over 1846 op de introband, op de weegbon én op de eerste game-over van de Nachtploeg: drie keer dezelfde zin. Voorstel: Splitsen.

Ronde 1:
- Lettertypen zelf hosten in docs/fonts met font-display:swap, en in de artifact-versie laden zonder te blokkeren.
- De fixes van één regel: maxWidth op '+ nog meer onderweg', gezien Wist-je-dat-feiten bewaren in save, de regel '0,3 bulkcel', en badges met een stippelrand.

Ronde 2: de testlijst, met 35 px ruis en 30 datums van de Korrel van de dag.

De terugknop komt achteraan.
- De grote knop gaat verder waar je was, en een rustiger titelscherm: Het probleem is kleiner dan gesteld. Na molen 1 staan er al knopjes 'Verder vanaf 1846 1867', direct onder de startknop.

Bovendien botst 'Verder' met de regels van de tijdlijn:
- Een run die bij 1867 begint, telt niet als hele tijdlijn (campDone alleen bij startLvl 0).
- Menselijk vraagt de Gezel-modus vanaf 1846, in één run.
- De score begint weer op 0, en het jaarverslag zegt 'Je viel van 1867 tot Molen B'.

Wie in stukjes speelt, precies de doelgroep, haalt zo nooit 'de hele tijdlijn'. En de Nachtploeg-knoppen verbergen bij het eerste bezoek botst met het dienstbriefje, dat juist achter de dichte knop zit. Voorstel: Regel eerst hoe voortgang bewaard wordt, en bouw daarna pas de knop. Twee mogelijkheden:
- Bewaar bij elke weegbon de run (molen, score, korrels), zodat 'Verder: 1867' dezelfde run voortzet.
- Of laat 'hele tijdlijn' gelden als alle zes molens ooit gehaald zijn.

Moeite: middel. De Friese vertaling en 'Scores pas na de eerste partij' kunnen los daarvan.
- Weegbon-vraag: 'Weet je het nog?': - De vraag van 1846 ('Holwerd of Leeuwarden?') staat letterlijk één regel hoger op dezelfde bon ('1846 · Rosmolen, Holwerd'), en ook in de introband.
- Met twee antwoorden heb je 50% kans bij gokken. 'x van 6 goed' meet dus weinig en bewijst niet dat het inwerkdoel lukt.
- Wie 'Verder malen' na 0,6 s wegtikt, krijgt een vraag over tekst die hij niet gelezen heeft.
- Als 'x van 6 goed' gedeeld wordt of de brand manager hem inziet, wordt het een toets voor nieuwe collega's. Dat geeft druk. En wie de uitslagen structureel verzamelt, krijgt een privacyvraag en een vraag voor de OR.
- Het foute antwoord bij 2008 ('naar een bakker in Holwerd') is vreemd. Voorstel: Bouw dit pas na de kijktest; die laat zien of het verhaal gelezen wordt. Kies vragen waarvan het antwoord in het verhaal staat en niet op de bon:
- 1846: 'Wat maalde Uilke in de rosmolen? Boekweit / Tarwe'.
- 2008: 'Van wie zijn de Koopmans-bakmixen in de supermarkt? Dr. Oetker / Royal Koopmans'. Die raakt precies het misverstand.

Geen score om te delen, alleen het vinkje in het Molenboek.
- Proloog 'Van Leeuwarden 2026 terug naar Holwerd' in plaats van een laadscherm: Een goed antwoord op Bikkels vraag, maar te groot, en 'middel' is onderschat. Het gaat om:
- een nieuwe sectie;
- vier tekeningetjes op groot formaat en een rollende jaarteller;
- een oefenschacht als nieuwe spelstand met eigen regels;
- het duimpje, een versie zonder beweging, een Molenboek-pagina en wijzigingen in de introband van 1846.

Dat in een bestand waar de logica van intro en verhaalpauze al tien fixrondes heeft gekost.

Vier kaarten, een oefenschacht en daarna nog een (kortere) introband: dat zijn drie lagen voordat je echt speelt. Molen 1 ís al de oefenschacht: scroll 170, spleet 0,38, drie korrels.

Kaart 1 noemt 'ruim 200.000 ton'. Dat is een cijfer dat verandert (de Leeuwarder Courant noemt 212.000), en de eigen niet-doen-lijst sluit zulke cijfers uit.

De Gezel-keuze vraagt iemand de moeilijkheid te kiezen voordat hij ooit gespeeld heeft, en op het werk speelt sociale druk mee. Het kader 'Te moeilijk?' na drie mislukte pogingen bestaat al. Voorstel: Versie 1, klein: één of twee kaarten in scrStory, met de bestaande paardentekening. Zo'n 40 woorden: wat Royal Koopmans nu doet (zonder tonnage) en dat we teruggaan naar 1846, met 'Overslaan' erbij. Daarna de introband van 1846 zonder de regel over Uilke.

Geen oefenschacht en geen Gezel-keuze. Breid alleen uit als de kijktest laat zien dat mensen bij een koude start vastlopen.
- Het korreltje: kijkt naar de spleet, reageert, en wordt zichtbaar bloem: Stap 1 is grotendeels onzichtbaar. Een pupil van 1,3 px die 1,2 px opschuift, op een korrel van 18x24 px, ziet niemand op een telefoon. 'Laat nieuwkomers zonder woorden zien waar ze heen moeten' belooft dus te veel.

Wordt het wél zichtbaar, dan is het een richthulp. De oogjes kijken naar het gat van de plansichter zoals dat er bij aankomst staat, en dat weet de speler anders niet. Dat is een moeilijkheidswijziging die eruitziet als versiering.

Het knipperende korreltje op het titelscherm botst met het idee van een rustiger titelscherm. De echte waarde zit in stap 2 (zichtbaar witter worden) en in het platdrukken bij een perfecte passage tussen de walsen. Voorstel: Doe dit na ronde 1, als ronde voor de charme:
- Platdrukken bij een perfecte passage, en de gezichtjes ^ ^ en > < groot genoeg om te zien.
- Daarna stap 2: de kleurtrappen en het meelwolkje in de silo.

De oogjes die naar de spleet kijken alleen als bewuste hulp in de Gezel-modus, of helemaal weglaten. Geen extra korrel op het titelscherm.
- Badges laten zien als de vijf kernwaarden van Royal Koopmans: De nieuwe regel voor Menselijk werkt technisch niet. De pagina's st0 tot st5 gaan open zodra de verhaalpauze verschijnt, niet als je leest. En 'Toon alle pagina's' (openAllPages) zet ze in één tik allemaal open, dus de badge is gratis.

Kernwaarden koppelen aan prestaties in een spel ('Betrouwbaar = geen botsing') kan bij HR of collega's overkomen alsof de waarden belachelijk gemaakt worden. Met een kopje 'De vijf kernwaarden van Royal Koopmans' wordt die koppeling heel expliciet.

'Alleen als HR een zin levert' klopt ook niet helemaal. Het Waardenhuis staat openbaar op de werken-bij-site, met drie woorden per waarde (Trots, Puur, Specialist / Initiatiefrijk, Marktbewust, Besluitvaardig / ...). Welke woorden bij welke waarde horen, haalde het onderzoek uit een opsomming; dat moet je eerst nakijken tegen de Waardenhuis-afbeelding. Voorstel: Vraag eerst de brand manager of HR of de koppeling expliciet mag. Zo ja:
- Een kopje, plus de openbare Waardenhuis-woorden, nagekeken.
- Menselijk koppelen aan iets wat niet met één tik kan, bijvoorbeeld een molen spelen in de Gezel-modus.
- Gepassioneerd voor spelen op drie verschillende dagen is prima.

Gemist:

- Overdracht en eigendom. De live versie staat op het persoonlijke GitHub-account van een stagiair (bik3), met het logo van Koopmans erop. Als het een inwerkmiddel wordt, moet vóór het einde van de stage vastliggen wie het beheert, op welk account het staat en wie de feiten bijwerkt. Anders verdwijnt of veroudert de link.
- Vrije dienst en Korrel van de dag verschillen nu alleen in de schacht (seed). Met drie korrels in Vrije dienst heeft een nieuwkomer een echte oefenplek. De Korrel van de dag blijft dan eerlijk met één korrel, en het dienstbriefje heeft iets wezenlijks uit te leggen.
- De Korrel van de dag is per datum heel verschillend van moeilijkheid. Vandaag staat er een plansichter met twee gaten op verdieping 3, en daar liep de bot 4 van de 4 keer op vast. Iedereen sterft dan elke herstart op dezelfde plek. Laat de testlijst 30 datums doorrekenen en zorg dat er in zone 1 geen plansichter komt.
- Ook de botnormen moeten worden afgesteld. Met 22 px ruis haalt de bot zone 1 in het huidige spel al. Toets met 30 à 35 px ruis, en controleer na de kijktest of de bot speelt zoals echte collega's.
- Geluid staat standaard aan. Bij een inwerksessie met tien telefoons in één zaal piept en knalt alles tegelijk. Zet het geluid de eerste keer uit, of vraag het.
- Werknemersgegevens. Scores en uitslagen van nieuwe collega's kunnen in een teamkanaal of bij een manager terechtkomen: geplakte Korrel van de dag-regels, 'x van 6 goed', of de buddykaart met 'elke ochtend spelen en plakken'. Dan wordt het spel ongemerkt een beoordelingsmiddel. Houd meedoen en delen echt vrijwillig, houd niets per naam bij, en betrek bij structureel verzamelen privacy en de OR.
- Te veel tegelijk na molen 1. In de eerste Nachtploeg krijgt iemand die alleen molen 1 speelde 10 nieuwe dingen te zien: wals, plansichter, bout, moederkoren, Nedertarwe, water, magneet, kroon, kiem en de vooruitblik. Na één partij staat er bovendien 'Molenboek 12 nieuw'. De indeling in zones lost een deel op. Spreid daarnaast het openen van Molenboek-pagina's over de zones.

Aanbevolen eerste ronde: Een rustige eerste zone in de Nachtploeg; Nachtploeg uitleggen met een dienstbriefje; Kwaliteit: altijd laden, opruimronde en een testlijst die speelt als een nieuwkomer; Tikken stuurt ook, en een duimpje dat het voordoet; Meten of collega's het leuk vinden: kijktest plus één vrijwillige vraag

## Vragen voor Bikkel

- Mag 'Deel het spel' van bovenaan het titelscherm naar Over dit spel en het jaarverslag, of wil de brand manager hem juist bovenaan houden?
- Kun je vijf testers regelen voor de kijktest, het liefst nieuwe collega's die weinig gamen plus iemand uit de ploegendienst? En wanneer is de eerstvolgende inwerkgroep?
- Mag je binnen Koopmans een anoniem Microsoft Forms-formulier maken voor de feedbackvraag, en moet communicatie, IT of privacy dat goedkeuren? Zonder link blijft het kader gewoon verborgen.
- Spelen nieuwe collega's op hun eigen telefoon of op bedrijfslaptops? Kun je de link één keer op het bedrijfsnetwerk openen en kijken of de lettertypen van Google doorkomen?
- Mag het spel zeggen dat de fabriek dag en nacht draait 'in vijf ploegen' (dat staat in de cao 2026-2027), of liever alleen 'dag en nacht'?
- Moet de proloog in het heden beginnen ('Leeuwarden, 2026, ruim 200.000 ton graan per jaar') en dan terugspringen naar 1846, of meteen in Holwerd? En mag hij de keuze voor de Gezel-modus aanbieden?
- Levert de weegbon-vraag punten op of alleen een stempel? En wil de brand manager de score 'x van 6 goed' kunnen zien in de inwerkgroep?
- Mag tikken ook sturen, of wil je slepen als het enige gevoel houden? Het voorstel is dat tikken pas gaat sturen nadat iemand twee keer getikt heeft zonder te slepen.
- Kan HR per kernwaarde één zin leveren, of houden we het bij de naam en de spelregel? En is het goed als Menselijk en Gepassioneerd nieuwe regels krijgen?
- Blijft het een fan-made project, of wordt het een officieel inwerkmiddel? Dat bepaalt de tekst 'Fan-made door een stagiair', of de stempel 'Partij afgekeurd' (een echte kwaliteitsterm) blijft, en wie de feiten vóór elk gebruik naleest.

## Eerste indrukken per rol

- ?: Het spel ziet er verzorgd uit en molen 1 is rustig. De introband wacht op een tik, het verhaal halverwege leest prettig en de weegbon geeft een fijn moment om af te ronden. Maar als nieuwe collega snapte ik de helft van het titelscherm niet: Nachtploeg, Korrel van de dag, Vrije dienst, Gezel en "It giet oan!". Tikken op de grijze Nachtploeg-knoppen doet niets. Mijn grootste struikelpunten op 400x800 met touch: wie tikt in plaats van sleept, ziet de korrel geen millimeter bewegen en krijgt na 14 seconden "Partij afgekeurd" zonder uitleg. En de Nachtploeg, die na molen 1 opengaat, heeft meteen het tempo van molen 5 en maar één korrel. Mijn testspeler die molen 1 foutloos haalde, hield het daar 7 tot 11 seconden vol. Een slordigere testspeler verloor in molen 2 al zijn drie korrels, nog vóór het tweede verhaal. Wat ik echt leerde: 1846, Holwerd, Uilke, de rosmolen, boekweit en de stap naar Leeuwarden. Wat Royal Koopmans nú doet (bakkers, Nedertarwe, KIEM, kernwaarden) zit pas in molen 4 tot 6 of in een Molenboek van ruim 1.200 woorden, en daar komt een nieuwkomer op dag 1 niet aan toe.
- ?: Ik speelde op 400x800 met touch: molen 1 helemaal, molen 2 tot de verhaalpauze, de Nachtploeg (Korrel van de dag twee keer, Vrije dienst één keer), het Molenboek, Over dit spel en Scores. Korrelval voelt al verzorgd. Sturen met de duim reageert meteen, elk tijdperk ziet er anders uit, en de introband en de verhaalpauze wachten netjes op een tik. Molen 1 is heel vriendelijk: zelfs mijn slordigste testspeler haalde 90% perfect. Daardoor is hij ook wat leeg, met veel houten wand tussen twee molenstenen. Het korreltje is schattig, maar het blijft een eitje met twee stipjes: het reageert niet op een botsing of op perfect, en dat het van korrel naar bloem gaat zie je alleen tussen de molens, niet tijdens het spelen. Het grootste probleem is de Nachtploeg. Hij gaat open na molen 1, maar begint op het tempo en de spleet van de molen van 2008, met één korrel. Mijn testspelers lagen er bij Korrel van de dag beide keren al op verdieping 4 uit. Wat de Nachtploeg is, en waarom je Korrel van de dag zou kiezen, staat nergens voordat je hem speelt.
- ?: Als merkuiting is het verrassend af. Het logo, het oranje #E78A01, het goud en antraciet en het handschrift La Belle Aurore komen overeen met wat het onderzoek over de huisstijl van Royal Koopmans vond, en de toon is warm en Fries (It giet oan!, Tsjoch!, Oant moarn). Molen 1 duurde in mijn twee touch-ritten op 400x800 allebei 32 seconden en voelt rustig. De verhaalkaart wacht netjes en de weegbon is een mooie vondst. Toch zou ik het als communicatie nog niet extern delen. Er is geen deelafbeelding (og:image), de lettertypen komen van Google Fonts (de enige externe verbinding), nergens staat wat het spel wel of niet bewaart, en op het Scores-scherm staat een grap die niet van ons is: "Bewaar je wachtwoorden in de kluis". De Nachtploeg is het zwakste punt. Tik je op een grijze knop, dan gebeurt er niets. Na molen 1 val je met één korrel in de molen van 2026, tussen walsenstoelen, plansichters en moederkoren die je nog niet kent, en het Molenboek krijgt in één keer 9 nieuwe pagina's. Ook kunnen we op dit moment op geen enkele manier horen of iemand het spel leuk vindt. (Werknotitie: ik heb per ongeluk brainstorm/play.js van een andere agent overschreven. Mijn eigen bestanden staan in /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/brainstorm/brand/.)
- ?: Ik heb op 400x800 met touch gespeeld: molen 1 helemaal (met verhaalpauze en weegbon), het begin van molen 2, daarna het Molenboek, Over dit spel, de Korrel van de dag en Scores. Het spel zelf is netjes. Op een gewone laptop haalt het 60 fps, ik zag in geen enkel scherm een JavaScript-fout, de verhaalkaart wacht keurig op een tik en de weegbon is duidelijk. De zwakke plekken zitten om het spelen heen. Als de server van Google Fonts niet antwoordt, blijft de pagina leeg: na 30 seconden zag ik nog een leeg grijs scherm en was het spelscript nooit gestart. Alle tekst op het canvas (de introband) wordt kleiner op kleine telefoons en bij inzoomen, en een schermlezer ziet die tekst niet. De terugknop van de telefoon gooit je uit het spel. Ook achter het Molenboek blijft het spel op vol vermogen tekenen. De Nachtploeg gaat open na molen 1 maar speelt meteen op het tempo van 2008 met één korrel: mijn testbot die molen 1 zonder botsing haalde, lag er in de Nachtploeg vier van de vier keer binnen 3 verdiepingen uit. Kanttekening bij de cijfers: headless Chromium tekent het canvas zonder GPU, dus de cijfers met CPU-vertraging laten het slechtste geval zien. Mijn scripts en screenshots staan in /tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/brainstorm/qa/.
