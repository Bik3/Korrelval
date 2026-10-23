# Storyboard jaarintro 2026: Molen B

Voor de jaarmaker van 2026 (gebied `JAARINTRO 2026`, namen met `j26`). Dit storyboard verandert niets aan het spel.

**In het kort.** De hoofdintro laat de fabriek van nu zien. Deze jaarintro laat de bouw van Molen B zien.
- **Shot 1, buiten:** op het bouwterrein wijzen mensen met helmen omhoog. De camera stijgt langs de kraan en de gevel tot boven het dak. Daar hangt een walsenstoel aan de haak, vlak boven de opening in het dak, met de stad diep beneden.
- **Shot 2, binnen:** de walsenstoel zakt door de opening de nieuwe molenzaal in en landt op zijn plek. De camera gaat door naar een walsenstoel die al staat en eindigt bij twee glanzende walsen met de spleet ertussen. Daar wacht de korrel op de duik.

Shot 1 gaat omhoog en shot 2 gaat omlaag, en de duik gaat daarna verder naar beneden.

---

## 0. Afspraken voor dit storyboard

- **Maten** staan in meters. Ze passen op de schaal van de hoofdintro (`introGeo` in `korrelval.html`) als je 1 m ongeveer gelijk stelt aan 7 eenheden. Een trapgevelhuis van circa 10 m is daar 64 tot 90 eenheden en de maaltoren is 362 eenheden hoog.
- **Diepte** werkt zoals de lagen van de hoofdintro (`dz` en brandpunt `IF`): 0 is de gevel van Molen B, een plus ligt verder weg en een min ligt dichter bij de camera. Getallen bij diepte zijn eenheden van de hoofdintro.
- **Posities in het beeld** staan in procenten van het beeldvak boven het ondertitelpaneel, in het staande formaat. x telt van links en y van boven. In het liggende formaat blijft het vak hetzelfde: vul de extra breedte bij shot 1 met lucht en stad en bij shot 2 met de hal.
- **Thema's:** licht is een winterdag, donker is een winteravond in het blauwe uur. Waarom winter staat in 1.7.
- **Duur:** shot 1 duurt 4,8 s en shot 2 4,6 s. Gebruik dezelfde zachte curve als de hoofdintro (`ixEase`, smootherstep). Na de beweging blijft het beeld staan tot Verder.

---

## 1. Wat klopt

Betrouwbaarheid: **hoog** betekent dat de bron zelf is gelezen. **Midden** betekent een zoekfragment, een samenvatting of een algemene bron die niet over Koopmans gaat. **Laag** betekent een aanname voor het beeld zonder bron. Een aanname mag in het beeld, maar nooit in de tekst.

### 1.1 De bouwplaats en de kraan

| Wat | Bron | Betrouwbaarheid | Wat het betekent voor het beeld |
|---|---|---|---|
| De fabriek staat aan De Merodestraat 3 in Leeuwarden, aan het Nieuwe Kanaal. | `/home/user/Vaultwarden/game/onderzoek-royal-koopmans.md`; `/home/user/Vaultwarden/game/onderzoek/koopmans-site.md` | hoog | Het is dezelfde plek als in de hoofdintro, maar we kijken nu vanaf het bouwterrein. |
| Walsenstoelen voor Molen B zijn "op eenzame hoogte boven de stad Leeuwarden" via een opening in het dak naar binnen gehesen. De mensen "stonden vol spanning te kijken". | LinkedIn-posts van de COO, (LinkedIn-profiel van de COO) (alleen het zoekfragment, gelezen op 23-10-2026; LinkedIn zelf is niet leesbaar); ook in `/home/user/Vaultwarden/game/onderzoek/research-nieuws.json` | midden | Er is een hijsklus hoog boven de stad en er staan mensen te kijken. |
| Er wordt gehesen, dus er is een kraan. Wat voor kraan het was, staat in geen enkele bron. | dezelfde LinkedIn-fragmenten | type kraan: laag | Teken een torenkraan zoals de vignet van Molen B in het spel (`gxVIG.digi` in `korrelval.html`: mast, giek, contragewicht, oranje #E78A01). Zo past de jaarintro bij de introband die er direct na komt. |
| Koopmans "vervangt de molen uit 1967 en bouwt naast de 2008-molen een moderne installatie". Op het terrein staan molens uit 1965, 1967 en 2008. | Leeuwarder Courant, 16-11-2025, via de samenvatting op https://friesland.headliner.nl/item/iedereen-kent-de-meelfabriek-van-royal-koopmans-in-leeuwarden-maar-wat-gebeurt-daar-nou-eigenlijk-lc-113115 (gelezen op 23-10-2026) | midden | Molen B staat naast een andere molen: die uit 2008. |
| Het masterplan kost ruim 20 miljoen euro. Er komen ook een nieuwe expeditie en een nieuwe menghal. | dezelfde LC-samenvatting; `research-nieuws.json` | midden | Alleen achtergrond. Niet tonen en niet noemen. |
| "Sommige silo's en kades zijn al meer dan honderd jaar oud." | dezelfde LC-samenvatting | midden | Oude betonsilo's mogen naast het nieuwe gebouw staan. |
| De loskade is vervangen van mei 2024 tot februari 2025: circa 100 m, een vrijstaande damwand met een betonnen deksloof en zwarte wrijfgordingen, 14 buispalen vlak voor de damwand, en een nieuwe betonvloer tussen de kade en de fabriek. Het oudste deel was uit 1927. | https://www.deboerendegroot.nl/wat-hebben-wij-gedaan/vervangen-loskade-royal-koopmans-meelfabriek/ (gelezen op 23-10-2026); `research-nieuws.json` | hoog | De kade hoort niet in deze twee shots. Komt hij toch in beeld, teken dan de nieuwe kade: een rechte stalen damwand met een betonrand en ronde buispalen in het water, dus geen oude kademuur. |

### 1.2 De walsenstoelen

| Wat | Bron | Betrouwbaarheid | Wat het betekent voor het beeld |
|---|---|---|---|
| De kleinere walsenstoelen wegen circa 3.500 kg en de grote circa 6.000 kg. | LinkedIn van de COO (zoekfragment); `research-nieuws.json`; `/home/user/Vaultwarden/game/onderzoek/spelmateriaal.json` | midden | Er zijn twee maten. Teken op de grond een kleinere en een grotere die staan te wachten. |
| De LC noemt "walsen van ruim acht ton". | LC-samenvatting (headliner) | midden tot laag | Dit botst met het getal hierboven. Schrijf dus "enkele tonnen" en zet geen gewicht in de jaarintro (zie 2). |
| Montage door Zwitserse molenbouwers (Bühler). | LC-samenvatting (headliner); `research-nieuws.json` | midden | Mag in de tekst als "een Zwitserse molenbouwer". Geen merknaam of logo in beeld. |
| Een walsenstoel heeft koppels stalen walsen die tegen elkaar in draaien. De eerste zijn geribbeld, de laatste bijna glad, en de spleet is maar enkele millimeters. | `/home/user/Vaultwarden/game/onderzoek/research-molenproces.json` (feiten 25 en 26: broodsmakelijk.nl/hoogmaalderij en nl.wikipedia.org/wiki/Meelfabriek) | hoog | Teken in het eindbeeld van shot 2 gladde walsen. Molen B heeft in het spel ook `ribs: 0`. |
| Zo ziet een moderne walsenstoel van Bühler eruit (de Arrius): één compacte module die kant-en-klaar wordt geleverd, met een touchscreen en op hygiënische stelvoeten. De kap van de maalkamer klapt omhoog, de deuren van de maalkamer hebben een handbeschermer, en schakelkast en aandrijving zitten erin. De walsen hebben een diameter van 250 mm en zijn 1.000 tot 1.500 mm lang. | https://millermagazine.com/en/blog/arrius-groundbreaking-grinding-system-3867 | midden als algemeen beeld; welk model Koopmans heeft, is onbekend (laag) | Teken een strakke kast op korte voetjes, met een smallere inloop bovenop, een schermpje en deurnaden. |

### 1.3 Het gebouw

| Wat | Bron | Betrouwbaarheid | Wat het betekent voor het beeld |
|---|---|---|---|
| "De nieuwe molens zijn hoge torens met walsen, zeefkisten en afpelapparatuur." | LC-samenvatting (headliner) | midden | Molen B is een hoog blok, hoger dan breed. |
| Molen B vervangt de molen uit 1967. De molen uit 1965 wordt roggemolen. | `onderzoek-royal-koopmans.md`; `research-nieuws.json`; FACTS in het spel | midden | Niet tonen en niet in de tekst (het staat al op een wist-je-dat-kaart). |
| Hoe Molen B er van buiten uitziet, en of het een nieuw gebouw is of de oude schil van 1967, staat in geen enkele bron. | geen | laag | Teken een neutraal, strak blok in licht zandgrijs, zonder logo, met een platte dakrand en een opening in het dak met een tijdelijke leuning eromheen. |
| Hoe de molen uit 2008 eruitziet, is spelconventie: "staal en glas" (stijlgids, `gxVIG.staal`, `gxBG.staal`). | `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/stijlgids.md`; `korrelval.html` | laag (geen foto-bron) | Teken de buurman rechts als een glasgevel met lichte stijlen, zodat hij lijkt op wat de speler in 2008 zag. Stem dit af met de maker van 2008. |
| De maaltoren met de oranje band hoort bij de huisstijl van het spel (hoofdintro). | `introGeo` in `korrelval.html` | spelconventie | Zet hem verder weg aan de rechterkant, als herkenningspunt. We zien de zijkant, dus zonder logo. |

### 1.4 De molenzaal binnen

| Wat | Bron | Betrouwbaarheid | Wat het betekent voor het beeld |
|---|---|---|---|
| Nieuwere molens zijn vergaand gedigitaliseerd. Ze melden storingen vooraf en sommige installaties zijn op afstand te bedienen. | LC-samenvatting (headliner) | midden | Schermpjes en statuslampjes op de machines. |
| De technische dienst werkt met PLC's, SCADA en nieuwe sensoren. | vacature Monteur industriële automatisering, https://www.royalkoopmans.com/werken-bij-koopmans/vacatures/vacature-monteur-industriele-automatisering (12-10-2026) | hoog | Kabelgoten en schakelkastjes passen in het beeld. |
| De molens draaien op 100% groene stroom "van eigen bodem". | https://www.royalkoopmans.com/duurzaamheid/schone-energie-koopmans-op-weg-naar-net-0 (gelezen op 23-10-2026); `/home/user/Vaultwarden/game/onderzoek/research-bedrijf-nu.json` | hoog | De aandrijving is elektrisch: een motorkap aan de kopse kant van elke walsenstoel en kabels uit de goot. Geen riemen of stoom. |
| Het maalsel valt via buizen van verdieping naar verdieping, en daarom is een meelfabriek hoog. | `research-molenproces.json` feit 27 (broodsmakelijk.nl) | hoog | Verticale RVS-buizen lopen vanaf de walsenstoelen door het plafond. |
| Hoe de zaal is ingedeeld (rijen, plafondhoogte, een sparing in de vloeren tot aan het dak) staat in geen enkele bron. | geen | laag | De opzet hieronder is een aanname. Houd hem rustig en logisch. |
| Molen B in het spel is donker, met ledjes en schermpjes, strak en modern. | stijlgids; `gxDigi` en `LEVELS[5].pal` in `korrelval.html` | spelconventie | Het donkere thema van shot 2 sluit aan op het spel. |

### 1.5 Mensen

| Wat | Bron | Betrouwbaarheid | Wat het betekent voor het beeld |
|---|---|---|---|
| Mensen keken "vol spanning" naar het hijsen. | LinkedIn van de COO (zoekfragment) | midden | In shot 1 staat een groepje te kijken en één persoon wijst. |
| Werkkleding, helmen, hesjes en een seiner met portofoon zijn het gewone beeld op een bouwplaats, maar er is geen bron over Koopmans. | geen | laag | Teken alleen silhouetten zonder gezicht. Alleen de helm en het hesje hebben kleur. Teken niemand onder de hangende last. |

### 1.6 Licht

| Wat | Bron | Betrouwbaarheid | Wat het betekent voor het beeld |
|---|---|---|---|
| De hoofdintro heeft overdag een lage zon links (strijklicht) en 's avonds een warme gloed laag aan de hemel. | `ICOL` in `korrelval.html` | spelconventie | Houd de zon links. In de winter staat hij nog lager en is hij bleker. |
| 's Winters wordt het in Nederland vroeg donker. Bouwlampen en een rood lampje bovenop de kraan zijn gangbaar. | algemeen, geen bron | laag | Het donkere thema is het blauwe uur: werklicht tegen een koude lucht, met verlichte ramen van de oude fabriek. |

### 1.7 Seizoen en weer

| Wat | Bron | Betrouwbaarheid | Wat het betekent voor het beeld |
|---|---|---|---|
| Het hijsen was rond de jaarwisseling 2025-2026. De post zegt "afgelopen maand", de zoekmachine schat de posts op circa tien maanden oud (op 23-10-2026), en `research-nieuws.json` zegt "begin 2026". | LinkedIn van de COO (zoekfragment); `research-nieuws.json` | laag tot midden | Teken winter: kale bomen, een bleke lucht en lange schaduwen. Zet geen maand of datum in beeld of tekst. |
| Over het weer op de dag zelf is niets bekend. Hijsen gebeurt niet bij harde wind (algemeen). | geen | laag | Teken rustig, droog weer: platte wolkenbanken en geen sneeuw, regen of storm. |

### 1.8 Jubileum en wat er al in het spel staat

- **Jubileum:** 180 jaar Royal Koopmans, met het thema "Groei door verbinding". Bron: https://www.royalkoopmans.com/ (gelezen op 23-10-2026). Betrouwbaarheid hoog.
- **Opening:** Molen B gaat open in het jubileumjaar 2026. Bron: LinkedIn van de COO (zoekfragment). Betrouwbaarheid midden. Er is geen datum. De LC-samenvatting spreekt zichzelf tegen ("eind 2026 (3 juli)").
- **Urban tarweveld:** ingezaaid op 20-10-2025 en geopend op 24-04-2026. Het was het jubileumcadeau aan de stad. Het ligt in de wijk Middelsee, dus niet bij de fabriek. Bronnen: `research-nieuws.json` (royalkoopmans.com, omropfryslan.nl) en `koopmans-site.md`. Betrouwbaarheid hoog. Het staat al in STORIES[5], dus niet tonen en niet noemen.
- **Al in het spel:**
  - `LEVELS[5].intro`: "Jubileumjaar 2026: walsenstoelen van enkele tonnen gaan door een opening in het dak."
  - `STORIES[5]`: Uco 1932, Nedertarwe, bloemenranden, de tarweakker in Middelsee.
  - `FACTS[5]`: 1967 en 1965.
  - Molenboek "Vooruitblik": gedigitaliseerd, meldt storingen vooraf.

---

## 2. Mag niet

- **Een exacte datum.** Niet 3 juli 2026, niet "eind 2026", niet "medio 2027", en ook geen maand van het hijsen. In de tekst mag alleen "2026" of "jubileumjaar 2026" (`spelmateriaal.json`, avoid; `bouwopdracht.md`).
- **Beweringen zonder bron.** Geen capaciteit, geen aantal walsenstoelen, geen hoogte van het gebouw, geen type kraan en geen modelnaam van de machines in de tekst. Aannames uit hoofdstuk 1 mogen alleen in het beeld.
- **Gewichten en tonnages in de tekst.** De stijlgids zegt: geen tonnages in de intro. De bronnen spreken elkaar ook tegen (3,5 tot 6 ton tegen ruim 8 ton).
- **Echte personen.** Geen COO, CEO, wethouder of molenbouwer met gezicht of naam. Alleen silhouetten zonder gezicht, en niets dat op een bekend persoon lijkt.
- **Consumentenverpakkingen.** Geen pakken of zakken, geen rood-gele ruitjes en niets van Dr. Oetker. Ook geen zakken meel op de bouwplaats.
- **Merken en logo's.** Geen logo of naam van Bühler of van een kraanbedrijf. Geen 180-jaar-wimpel of spandoek op het gebouw (geen bron dat die er hing). Het logo van Koopmans alleen via de bestaande inline SVG, en in deze shots liever helemaal niet.
- **Wat al elders zit.**
  - Geen tarweveld bij de fabriek: het urban tarweveld ligt in Middelsee.
  - Geen vlucht van het veld naar de maaltoren, want die zit al in de hoofdintro.
  - Geen schip dat gelost wordt in close-up (hoofdintro shot 2).
- **Geen herkenbare gebouwen in de stad,** zoals de Oldehove of de Achmeatoren: de kijkrichting is onbekend.
- **Geen gevaar als spektakel.** Geen meelstof als gevaar, geen vonken en geen last die schommelt alsof hij valt. Beweging is zacht.
- **Niemand staat onder de hangende last,** ook niet in de verte.

---

## 3. De shots

### Shot 1, buiten: de walsenstoel boven het dak (4,8 s)

**Idee.** Beneden kijken mensen omhoog. De camera stijgt mee met hun blik, langs de kraanmast en de gevel van Molen B, tot boven de dakrand. Daar hangt de walsenstoel stil aan de haak, net boven de opening, met de stad ver beneden in de nevel.

#### Wat je ziet, van achter naar voor (wereld in meters)

Coördinaten: x = 0 is het midden van de dakopening en hoogte 0 is het maaiveld.

1. **Lucht.**
   - Een winterlucht met een vlak verloop.
   - Platte wolkenbanken laag aan de hemel en een paar ijle slierten hoog. Geen bolle zomerse stapelwolken: dat verschil met de hoofdintro is juist goed.
   - Licht: een bleke lage zon links, net boven de stad.
   - Donker: het blauwe uur, met een warme strook bij de horizon en een paar sterren alleen bovenin.
2. **Stad** (diepte +2400, zoals `far` in de hoofdintro): lage daken van 6 tot 20 m in de nevel, over de volle breedte. Geen torens die je herkent.
3. **Oude betonsilo's** (diepte +150): x -44 tot -18, vier ronde silo's van 6 m doorsnee en 38 m hoog, met horizontale naden.
4. **Maaltoren uit de hoofdintro** (diepte +220):
   - x +26 tot +46, 52 m hoog, met een kop van 9 × 5 m.
   - Oranje band 1 m onder de dakrand en een tweede om de kop.
   - Antraciet, zonder logo (we zien de zijgevel).
5. **Molen uit 2008** (diepte +40): x +11 tot +25, 40 m hoog. Een glasgevel met stijlen om de 2 m en regels om de 3 m, en een donkere dakrand.
6. **Molen B** (diepte 0):
   - **Maat:** x -13 tot +10 (23 m breed), 46 m hoog.
   - **Gevel:** licht zandgrijs, met horizontale paneelnaden om de 1,2 m en een strook smalle ramen (0,8 × 1,6 m) op x -9, om de 3,6 m.
   - **Dakrand:** 0,6 m donker.
   - **Dakvlak:** alleen te zien zodra de camera boven 46 m komt. Het is een strook die van de voorrand naar achteren loopt.
   - **Dakopening:** x -2,2 tot +2,2 en circa 3 m diep, een donkere rechthoek. Rondom staat een tijdelijke gele leuning van 1,1 m, met staanders om de 1,5 m en twee liggers.
   - **Op het dak:** twee mensen staan naast de opening. De linker (x -4) wijst schuin omlaag de opening in. De rechter (x +3,6) houdt een portofoon bij de helm.
7. **Torenkraan** (diepte -30):
   - **Mast:** vakwerk van 2 m breed op x -20, van een betonnen fundatieblok (6 × 1,2 m) tot 57 m.
   - **Giek:** vakwerk van 1,4 m hoog, op 57,0 tot 58,4 m, van x -20 tot +20.
   - **Contragiek:** x -32 tot -20, met vier betonblokken op x -32 tot -28.
   - **Cabine:** 2,4 × 2,4 m, rechts tegen de mast op 53 tot 55,4 m.
   - **Loopkat:** 0,8 m hoog, onder de giek op x 0.
8. **De last onder de loopkat**, van boven naar onder:
   - kabel (twee parten);
   - haakblok (0,9 × 0,7 m, donker met een gele band);
   - hijsjuk (een balk van 3 m);
   - vier stroppen naar hijsogen op de bovenhoeken, waarvan je er twee ziet;
   - de grote walsenstoel: 2,6 m breed, 1,9 m hoog, met een inloop van 1,0 × 0,5 m bovenop in het midden, stelvoetjes van 0,15 m en rechts een zijvlak van 0,5 m in de schaduw. Aan de voorkant zie je deurnaden, een donker frame en een klein, donker schermpje (de machine staat nog uit).
9. **Bouwterrein** (diepte -120):
   - Grond van verdicht grind met een baan rijplaten (x -14 tot +6).
   - Twee wachtende walsenstoelen, elk op twee houten balken van 0,25 m: een kleinere op x -8 (1,9 × 1,6 m) en een grotere op x -3,5 (2,6 × 2,0 m).
   - Drie mensen:
     - de aanwijzer op x +1,5, met zijn arm gestrekt omhoog;
     - de seiner op x +3,2, met een portofoon aan de helm en het hoofd achterover;
     - de derde op x -11 bij de mastvoet, met de handen in de zij, omhoog kijkend.
   - Een bouwlamp op een mast van 5 m op x +6, gericht naar linksboven.
10. **Bouwhek** (diepte -220, het dichtst bij): gaaspanelen van 3,5 × 2 m op betonnen voeten, alleen onderin het beginbeeld.

#### Beginbeeld (t = 0)

De camera staat op ooghoogte (1,7 m), circa 22 m van de gevel, en kijkt iets omhoog.

| Element | x | y |
|---|---|---|
| Voet van de gevel (grondlijn) | | 70% |
| Bouwterrein met rijplaten | | 70 tot 100% |
| Gevel Molen B | 20 tot 100%, de ramenstrook op 32% | 0 tot 70% (loopt door tot de bovenrand) |
| Glasgevel van 2008 | 90 tot 100% | |
| Lucht | 0 tot 20% | 0 tot 52% |
| Silo's, wazig | 0 tot 14% | 52 tot 70% |
| Stadsband | links van de kraanvoet | 62 tot 70% |
| Kraanmast | 6 tot 16%, met diagonalen | van de bovenrand tot het fundatieblok |
| Fundatieblok | 2 tot 20% | 66 tot 72% |
| Kleine walsenstoel | 22 tot 42% | 70 tot 86%, balken op 84 tot 87% |
| Grote walsenstoel | 46 tot 74% | 66 tot 87% |
| Bouwlamp | 66 tot 70% | mast op 72 tot 96%, lampkop op 72% |
| Aanwijzer | 76 tot 83% | voeten op 92%, helm op 66% |
| Seiner | 86 tot 92% | zelfde hoogte als de aanwijzer |
| Derde persoon | 18 tot 23% | half achter het fundatieblok |
| Bouwhek | gaas over 0 tot 64%, staanders op 10, 36 en 62% | 86 tot 100%, voeten op 98 tot 100% |

De last is nog buiten beeld. De arm van de aanwijzer wijst naar de bovenrand op x 55%, en de spanning zit in de blikken.

#### Camerabeweging

- **0 tot 0,3 s:** stil, zodat je de wijzende persoon ziet.
- **0,3 tot 4,8 s:** de camera stijgt van 1,7 naar 49,5 m.
  - Hij zoomt in: de breedte van het beeld gaat van circa 36 m naar 9,8 m op het vlak van de gevel.
  - Hij schuift een fractie naar links, zodat de opening in het midden komt.
  - Hij kantelt van iets omhoog kijken naar iets omlaag kijken (-3°).
- **Diepte-effect:** het bouwhek en de mensen zakken sneller weg dan de gevel. De stad en de silo's bewegen nauwelijks.
- **Halverwege (circa 2,4 s):** de gevel schuift voorbij, met de naden en de ramenstrook. Links klimt het vakwerk van de mast mee en rechts weerspiegelt het glas van 2008 de lucht. Bovenin komen de kabel en de onderkant van de walsenstoel in beeld.
- **Verschil met de hoofdintro:** die stijgt ook langs een toren. Het verschil hier is het onderwerp (kraan, last, dakopening, de stad beneden) en de winterse lucht. Laat de maaltoren daarom klein en ver weg.

#### Eindbeeld (t = 4,8 s)

De camera hangt circa 3,5 m boven het dak en kijkt bijna horizontaal.

| Element | x | y |
|---|---|---|
| Giek (vakwerkband over de volle breedte) | 0 tot 100% | 1,5 tot 11% |
| Loopkat | 46 tot 54% | 11 tot 16% |
| Kabel (twee lijnen) | 49% en 51% | 16 tot 48% |
| Haakblok | 46 tot 54% | 48 tot 53% |
| Hijsjuk | 35 tot 65% | 55 tot 56,5% |
| Stroppen | van de uiteinden van het juk naar de bovenhoeken | 56,5 tot 62% |
| Inloop van de walsenstoel | 45 tot 55% | 61 tot 64,5% |
| Lijf van de walsenstoel | 37 tot 63% | 64,5 tot 79% |
| Zijvlak in de schaduw | 63 tot 67% | 64,5 tot 78% |
| Horizon | | 64% |
| Stadsband (achter de walsenstoel langs) | | 58 tot 66% |
| Silotoppen, wazig | 0 tot 16% | 66 tot 74% |
| Maaltoren (kop op 18%, oranje banden op 24% en 30%) | 86 tot 100% | tot onderaan, wazig |
| Dakvlak | | achterrand op 80%, voorrand (dakrand) op 90% |
| Dakopening, donker | 30 tot 70% | 82 tot 88% |
| Gele leuning (voorste ligger, staanders op 27, 39, 50, 61 en 73%) | | bovenkant op 80%, staat op 88% |
| Persoon links op het dak | 14 tot 20% | voeten op 87%, helm op 75% |
| Persoon rechts op het dak | 79 tot 85% | voeten op 86%, helm op 74% |
| Dakrand (donkere band) | | 90 tot 91,5% |
| Gevel met naden | | 91,5 tot 100% |

De walsenstoel is het lichtste en scherpste vlak in het midden. Zijn onderkant hangt net boven de opening en de gele leuning omlijst hem van onderen.

#### Wat beweegt

- **De last** zakt tijdens het shot van 51,5 naar 47,4 m (onderkant). Hij komt rustig tot stilstand (ease-out) en hangt dan nog 1,4 m boven het dak. De kabel wordt mee langer.
- **Slingeren:** de last zwaait heel licht, ±0,5°, met een periode van 3,6 s. Daarna blijft er een nauwelijks zichtbare beweging over.
- **De kraan** draait niet en de loopkat staat stil.
- **Mensen beneden** (alleen in het begin te zien):
  - de aanwijzer houdt zijn arm omhoog en tikt met zijn hand een paar keer 1 px op en neer, om de 1,2 s;
  - de seiner houdt de portofoon bij de helm;
  - de derde kantelt zijn hoofd mee omhoog.
- **Mensen op het dak** (eindbeeld): de linker wijst met zijn arm omlaag naar de opening en geeft een klein "zakken"-gebaar, om de 1,5 s 2 px. De rechter staat stil met de portofoon.
- **Lucht:** de wolken drijven 2 px per seconde.
- **Alleen in het donkere thema:** de bouwlamp brandt vast en het rode lampje op de kraan brandt vast met een zachte gloed (niet knipperen: rustig houden).
- **Reduced motion:** alleen het eindbeeld, zonder slingeren of gebaren.
- **Lite-stand:** geen wolkendrift en geen slingeren.

#### Licht en donker

- **Licht (winterdag):**
  - Een lage, bleke zon links: lichtkanten links op mast, last en gevel, en koele schaduwen rechts.
  - Lange, zachte schaduwen over het bouwterrein naar rechts.
  - Kale bomen alleen als kleine silhouetten in de stadsband, als je die wilt.
- **Donker (winteravond, blauw uur):**
  - De lucht is diepblauw met een warme strook bij de horizon.
  - De bouwlamp beneden schijnt omhoog op de last. De onderkant en de linkerkant van de walsenstoel krijgen een warme glans en de rest valt in koel donker.
  - De dakopening gloeit zacht warm, omdat er binnen werklicht brandt.
  - De ramen van de maaltoren en van de glasgevel van 2008 zijn deels verlicht (#F2D35B).
  - Op de mastkop en aan het eind van de giek brandt een rood lampje.
  - De reflectiestrepen op de hesjes vangen het licht.

---

### Shot 2, binnen: de nieuwe molenzaal en de walsen (4,6 s)

**Idee.** We staan in de nieuwe molenzaal, onder de sparing in het plafond die naar de dakopening loopt. De walsenstoel zakt in een bundel licht naar binnen, twee mensen leiden hem met geleidetouwen en een derde wijst naar de vloermarkering. De camera zakt mee en gaat dan naar de walsenstoel rechts vooraan, die al staat. Door de open deur van de maalkamer eindig je bij twee glanzende walsen met de spleet.

#### Wat je ziet, van achter naar voor (wereld in meters)

Coördinaten: vloer = 0, plafond = 6 m, x = 0 is het midden van de sparing.

1. **Achterwand** (diepte +400):
   - Panelen van 1,2 m breed met naden.
   - Langs het plafond, op 5,4 m, een kabelgoot met afhangende kabels naar elke machine.
   - Ledpanelen in het plafond: lange smalle stroken.
2. **Achterste rij walsenstoelen** (diepte +200):
   - Vijf machines over de volle breedte, om de 3,2 m, elk 2,4 × 1,9 m met een inloop bovenop.
   - Op elke machine een schermpje met een cyaan lijngrafiekje, een verticale ledstrook (groen, groen, oranje, cyaan) en een motorkap aan de rechter kopse kant (de elektrische aandrijving) met een kabel omhoog naar de goot.
   - Uit elke machine lopen twee RVS-buizen (0,2 m) recht omhoog door het plafond.
3. **Sparing en lichtschacht:**
   - In het plafond op x -2,2 tot +2,2 een open rechthoek.
   - Daarboven zie je twee vloerranden van hogere verdiepingen (donkere horizontale banden) en helemaal bovenin de lucht door de dakopening.
   - Van de sparing valt een bundel licht naar de vloer (trapezium), met een stuk of 16 stofjes in het licht. Die zijn cosmetisch en rustig.
4. **De landende walsenstoel** (diepte 0):
   - Dezelfde grote walsenstoel als in shot 1, met hijsjuk en stroppen naar boven, de schacht in.
   - Op de vloer een gele markering (2,6 × 1,6 m, in perspectief een dun trapezium) waar hij moet landen.
5. **Mensen** (diepte 0 tot -40):
   - links op x -3 iemand met een geleidetouw naar de linker onderhoek;
   - rechts op x +2,6 iemand met een touw naar de rechter onderhoek;
   - helemaal links op x -4,5 iemand die schuin omlaag naar de markering wijst.
   - Niemand staat onder de last.
6. **Walsenstoel rechts vooraan** (diepte -60): het doel van de camera.
   - Hij staat al op zijn plek, met de kopse kant naar ons toe.
   - Bovenin zit de inloop, met een cyaan rand aan de mond.
   - Op de kopse kant zit de deur van de maalkamer. Die staat open, en daarachter is het donker.
   - Linksboven op de kast een klein touchscreen en rechts een ledstrook.
   - Langs de bovenrand van de kast loopt een dun oranje lijntje (#E78A01, de `edge` van `LEVELS[5].pal`).
7. **Vloer:** gietvloer met een zachte glans. De lichtbundel weerspiegelt erin.

#### Beginbeeld (t = 0)

De camera hangt op 4,5 m hoogte en kijkt iets omhoog.

| Element | x | y |
|---|---|---|
| Onderkant van het plafond | | 34% |
| Lichte schacht | 32 tot 68% | 0 tot 34% |
| Vloerranden van hogere verdiepingen | | 8% en 20% |
| Lucht door de dakopening (licht: daglicht; donker: blauwe avondlucht met de rode kraanlamp als stip en een warme gloed van de bouwlamp) | | helemaal bovenin |
| Walsenstoel, half door de plafondlijn | 38 tot 62% | lijf 22 tot 40%, inloop 18 tot 22% |
| Hijsjuk | | 8% |
| Lichtbundel | 32 tot 68% bij het plafond, 24 tot 76% bij de vloer | 34 tot 92% |
| Vloer | | 88 tot 100% |
| Markering | 36 tot 64% | 90 tot 93% |
| Man met het linker touw (touw diagonaal naar de onderhoek) | 14 tot 22% | 66 tot 92% |
| Man met het rechter touw | 72 tot 80% | 66 tot 92% |
| Aanwijzer | 3 tot 9% | 66 tot 92% |
| Achterste rij machines, schermpjes zacht gloeiend | over de volle breedte | 70 tot 88% |
| Walsenstoel rechts vooraan, afgesneden | 84 tot 100% | 60 tot 92% |
| Kabelgoot | | 36 tot 38% |

#### Camerabeweging

- **0 tot 0,2 s:** stil.
- **0,2 tot 4,6 s:** de camera zakt van 4,5 naar 1,9 m. Tegelijk rijdt hij naar voren en draait hij naar rechts, naar de walsenstoel rechts vooraan. Hij zoomt circa 3,2 keer in.
- **Circa 3,0 s:** de camera passeert de landende walsenstoel links.
- **3,4 tot 4,6 s:** de open deur van de maalkamer vult het beeld en de camera gaat er net doorheen.
- **Hoofdrichting:** omlaag. Daarmee is dit het spiegelbeeld van shot 1, en het leidt naar de duik.

#### Eindbeeld (t = 4,6 s)

| Element | x | y |
|---|---|---|
| Kast (lichtgrijs met antraciet frame) | randen op 4% en 96% | bovenkant op 18% |
| Dun oranje lijntje | langs de bovenrand van de kast | 18% |
| Inloop | 38 tot 62% | 8 tot 18% |
| Cyaan rand van de inloop | | 18% |
| Opening van de maalkamer (donker) | 6 tot 94% | 22 tot 92% |
| Linker wals | middelpunt op 30,5% | middelpunt op 62% |
| Rechter wals | middelpunt op 69,5% | middelpunt op 62% |
| Spleet (donkere verticale streep) | 48 tot 52% | 52 tot 72%, daaronder vervaagd in het donker |
| Touchscreen met cyaan lijngrafiekje | 8 tot 22% | 24 tot 34% |
| Ledstrook (groen, groen, oranje, cyaan) | 90% | 30 tot 45% |
| Korrel (via de gedeelde tekenhulp) | 50% | 34%, midden in de keel van de inloop, boven de spleet |

- **Walsen:** de straal is 17,5% van de beeldbreedte, dus de spleet is circa 4% breed (16 px op 400 px). Teken ze als gladde walsen in doorsnede met de kleuren van `WALS_ERA.digi`:
  - rand #48515A;
  - lijf #C4CBD3;
  - glans #FFFFFF als een verticale streep links van het midden;
  - omtrek #2A3036;
  - een cyaan boog rgba(111,211,224,.4), zoals `gxRollSpr` met digi.
- **Spleet:** donker (#0B0C0D in licht, #050606 in donker).
- **Korrel:** verschijnt vanaf circa 3,9 s, zakt 3% en blijft dan hangen. Hij kijkt je aan, zoals in de hoofdintro.

Dat de walsen als twee cirkels naast elkaar te zien zijn, is een stijlkeuze: een doorkijk die aansluit op hoe het spel walsen tekent. In het echt liggen de walsen in de lengte in de kast. Na "It giet oan!" gaat de duik recht omlaag door de spleet op x 50%.

#### Wat beweegt

- **De landende walsenstoel** zakt van onderkant 5,0 m naar 0,25 m (op zijn voetjes) tussen 0 en 3,2 s. Hij vertraagt vlak boven de vloer en staat daarna stil. De stroppen worden daarbij een fractie slapper (licht gebogen).
- **De twee touwhouders** doen bij de landing (3,2 tot 3,6 s) een kleine stap achteruit. De aanwijzer laat zijn arm zakken.
- **De walsen in het eindbeeld** draaien langzaam tegen elkaar in, met de bovenkanten naar de spleet toe (links met de klok mee, rechts tegen de klok in), circa 0,5 rad/s. Omdat de walsen glad zijn, laat je het draaien zien met drie boutjes op de as.
- **Het lijngrafiekje** op het touchscreen schuift één stapje per seconde.
- **De stofjes** in de lichtbundel drijven traag. Het zijn er hooguit 16 en ze zijn alleen sfeer.
- **De ledjes** branden vast.
- **Reduced motion:** alleen het eindbeeld, met stilstaande walsen en de korrel al op zijn plek.
- **Lite-stand:** geen stofjes, geen grafiekje en geen draaiende walsen.

#### Licht en donker

- **Licht (dag):**
  - Daglicht valt koel en helder door de sparing naar binnen.
  - De zaal is licht: wanden lichtgrijs, de gietvloer middengrijs met een glans, ledpanelen wit.
  - De machines zijn lichtgrijs met antraciet frames. De schermpjes zijn donker met cyaan en ook overdag goed te zien.
  - In het eindbeeld is de maalkamer binnen niet zwart maar donker antraciet (#2A2E33), en de walsen glanzen in wit licht.
- **Donker (avond):**
  - Door de sparing zie je de blauwe avondlucht. Bovenin schijnt de bouwlamp warm naar binnen.
  - De zaal zelf is gedimd: koele ledpanelen op de helft, en de cyaan schermpjes en ledjes geven gloed.
  - Dit sluit aan op Molen B in het spel (`LEVELS[5].pal`: wand #121314 en #1D1E1F, lijn #6FD3E0, rand #E78A01).
  - In het eindbeeld is de maalkamer bijna zwart (#0F1113) en de walsen glimmen in cyaan en wit.

---

## 4. Teksten per shot

### Shot 1

- **kicker:** Leeuwarden, *2026* (het jaartal in handschrift)
- **cap (22 woorden):** Hoog boven de stad hangt een walsenstoel aan de kraan. Een Zwitserse molenbouwer richt Molen B in, naast de molen uit 2008.
- **desc:** Beeld: mensen met helmen wijzen omhoog op het bouwterrein, en de camera stijgt langs een oranje kraan naar een lichtgrijze walsenstoel die hoog boven de stad aan de haak hangt, vlak boven een opening in het dak.

| Bewering | Bron | Betrouwbaarheid |
|---|---|---|
| Leeuwarden | De Merodestraat 3, Leeuwarden (`onderzoek-royal-koopmans.md`) | hoog |
| 2026 | het jaar van de molen in het spel en het jubileumjaar (royalkoopmans.com). Let op: het hijsen zelf was rond de jaarwisseling 2025-2026 (zie de twijfelpunten). | hoog voor het jubileum, midden voor het moment |
| "Hoog boven de stad hangt een walsenstoel aan de kraan" | LinkedIn van de COO (zoekfragment): "Op eenzame hoogte boven de stad Leeuwarden werden via een opening in het dak nieuwe walsenstoelen ingehesen." | midden |
| "Een Zwitserse molenbouwer richt Molen B in" | LC 16-11-2025 via headliner: "montage door Zwitserse molenbouwers (Bühler)"; `research-nieuws.json`: "de Zwitserse molenbouwer Bühler bouwt de installatie" | midden |
| "naast de molen uit 2008" | LC 16-11-2025 via headliner: "bouwt naast de 2008-molen een moderne installatie" | midden |

### Shot 2

- **kicker:** Molen B, *2026*
- **cap (21 woorden):** Binnen zakt de walsenstoel naar zijn plek. Elektromotoren drijven de walsen aan, op groene stroom uit Nederland. Straks ga jij erdoor.
- **desc:** Beeld: in de nieuwe molenzaal zakt de walsenstoel door een bundel licht uit het plafond naar de vloer, naast een rij walsenstoelen met schermpjes en lampjes, en de camera gaat dicht naar twee glanzende walsen met een smalle spleet ertussen.

| Bewering | Bron | Betrouwbaarheid |
|---|---|---|
| "Binnen zakt de walsenstoel naar zijn plek" | LinkedIn van de COO: de walsenstoelen zijn via het dak "ingehesen" | midden |
| "Elektromotoren drijven de walsen aan" | royalkoopmans.com/duurzaamheid/schone-energie-koopmans-op-weg-naar-net-0: "Onze molens draaien al op 100% groene stroom"; Arrius met ingebouwde aandrijving (millermagazine.com) | midden (dat het elektrisch is, volgt uit de stroom; het model is onbekend) |
| "op groene stroom uit Nederland" | dezelfde Koopmans-pagina: "100% groene stroom van eigen bodem" (gelezen op 23-10-2026) | hoog |
| "Straks ga jij erdoor" | spelfictie, geen feit | n.v.t. |

### Controle op de regels

- **Geen herhaling van `LEVELS[5].intro`:** geen gewicht, geen dak, niet "jubileumjaar".
- **Geen herhaling van `STORIES[5]`:** niets over Uco, Nedertarwe of Middelsee.
- **Geen herhaling van de hoofdintro:**
  - niet "aan het Nieuwe Kanaal", "dag en nacht" of "bakkers en de voedingsindustrie";
  - niet "Jij bent één van die korrels".
  - Alleen "Leeuwarden" komt terug, als plek in de kicker.
- **Ook geen herhaling van FACTS[5] of de Molenboek-tekst "Vooruitblik":** niets over 1967, 1965 of het vooraf melden van storingen.
- **Stijl:**
  - geen gedachtestreepjes, geen "Ontdek", geen uitroeptekens;
  - geen tonnages (stijlgids);
  - geen datum;
  - geen namen van mensen;
  - geen merknaam (Bühler staat alleen in de bronnen, niet in de tekst).

---

## 5. Kleuren en sfeer

**Sfeer.**
- **Licht:** helder, koud en stil. Ingehouden spanning ("vol spanning kijken"), vakmanschap en trots, zonder drukte.
- **Donker:** het blauwe uur, warm werklicht tegen een koude lucht, een rood lampje hoog in de lucht, en binnen het cyaan van schermpjes dat al naar het spel wijst.
- **Beweging:** zacht, met ease-out.
- Oranje (#E78A01) is het accent, net als in de huisstijl. Goud komt niet voor: dat is voor beloningen in het spel.

### Shot 1, buiten

| Rol | Licht (winterdag) | Donker (winteravond) |
|---|---|---|
| lucht boven / midden / horizon | #7FA3C0 / #B6CAD6 / #E9E4D6 | #0E1824 / #22344A / #7A5238 |
| zon of gloed | #FFF3D6 met rgba(255,224,168,.30) | gloed rgba(231,138,1,.18); sterren rgba(247,247,247,.6) |
| wolk / schaduw / onderkant | #F3F4F1 / #D3DCE1 / #BCC8D0 | #2B3843 / #222E37 / #1C262E |
| nevel | #E4E2D8 | #3A3128 |
| stad / daken / ramen | #B6BFC2 / #A7B0B4 / geen | #1D2930 / #1D2930 / rgba(242,211,91,.55) |
| silo / lichtkant / schaduw | #E3E1DA / #F7F7F7 / #C8C3B4 | #6C6B65 / #7F7E77 / #53524D |
| maaltoren / licht / schaduw / band | #2C2E31 / #3E4145 / #1D1E1F / #E78A01 | #18191B / #232528 / #0F1011 / #E78A01 |
| glas 2008 (boven naar onder) / stijlen / dakrand | #6F8DA8 tot #4F6D8C / #9FB3C8 / #16212D | #2C4660 tot #1B2E42 / #5F7590 / #0E1620; verlichte ruiten rgba(242,211,91,.5) |
| Molen B gevel / lichtkant / schaduw / naden | #DEDCD5 / #F1EEE6 / #BEBBB1 / #CBC7BC | #4A4B4D / #6E6A62 / #333436 / #3E3F41 |
| ramen Molen B | #6F808B | #1C2227 en een paar #F2D35B |
| dakrand / dakvlak / opening | #3A3C3F / #8E8B84 / #1E1F21 | #141517 / #2E2F31 / #0A0B0C met gloed rgba(255,214,140,.35) |
| leuning / schaduw | #E8C23A / #B8962A | #C9A42A / #8E7420 |
| kraan / schaduwkant / diagonalen | #E78A01 / #B56C00 / #C97300 | #C77A06 / #8E5200 / #A86405 |
| contragewicht / cabine / cabineraam | #8E8A80 / #F2F0EA / #2E3A42 | #4B4A45 / #C9C4B5 / #F2D35B |
| kabel / haakblok / band / hijsjuk / strop | #4A4D52 / #2C2E31 / #E8C23A / #3A3C3F / #6C6F73 | #C8C2B4 / #111213 / #C9A42A / #1E1F21 / #8E9196 |
| obstakellamp | geen | #E5483A met gloed rgba(229,72,58,.25) |
| walsenstoel lijf / lichtkant / schaduw | #DADFE3 / #F3F4F2 / #9DA5AD | #B7BDC3 / #E2E3DF (warm in het lamplicht) / #5F666D |
| walsenstoel frame / naden / inloop / voetjes / schermpje | #3A4046 / #AEB6BD / #C9CFD4 / #4A5056 / #2B3A40 | #22272C / #8E979F / #A9B0B6 / #22272C / #15333A |
| houten balken / schaduw | #A87B4F / #7E5A38 | #6E5034 / #4A3523 |
| grond / donker / rijplaten / rand | #B9B2A3 / #9E9686 / #6A6862 / #85827A | #2D2B26 / #24221E / #232321 / #3A3935 |
| bouwhek / voet | #8F969C / #C9C4B8 | #4E5459 / #3A3935 |
| bouwlamp / lichtkegel | uit: #5A5E63 | #FFF0CC / rgba(255,236,190,.18) |
| silhouet | #2A2D31 | #111214 |
| helm wit / geel | #F4F4EF / #E8C23A | #D9D9D2 / #C9A42A |
| hesje geel / oranje / reflectie | #D8DC4A / #EE8F1E / #F2F2EA | #B9BE3A / #C77A06 / #F2F2EA (fel, vangt het licht) |

### Shot 2, binnen

| Rol | Licht (dag) | Donker (avond) |
|---|---|---|
| wand / naden | #E2E4E6 / #CDD1D5 | #1A1C1F / #121314 |
| plafond / balk | #CED2D6 / #9AA1A8 | #141517 / #0E0F10 |
| ledpaneel | #F4F7FA | #CFE6EE op 50% |
| vloer / glans | #B8BEC3 / rgba(255,255,255,.35) | #26282B / rgba(111,211,224,.08) |
| vloermarkering | #E8C23A | #C9A42A |
| schacht bovenin / lichtbundel | #EEF3F6 / rgba(255,248,228,.40) | #22344A met rgba(255,226,170,.28) / rgba(255,226,170,.22) |
| stofjes | rgba(255,250,236,.8) | rgba(255,226,170,.7) |
| RVS-buis / licht / schaduw | #C3CAD0 / #E9EDF0 / #8E979F | #6E757C / #9AA3AB / #3E4348 |
| kabelgoot | #8A9096 | #26282A |
| machine lijf / licht / frame | #DADFE3 / #F3F4F2 / #3A4046 | #5B6268 / #7C848B / #22272C |
| motorkap aandrijving | #AEB6BD met rooster #3A4046 | #3E4348 met rooster #15171A |
| scherm / lijn / gloed | #10292D / #6FD3E0 / rgba(111,211,224,.11) | #15333A / #6FD3E0 / rgba(111,211,224,.15) |
| ledjes groen / oranje / cyaan | #5BD38A / #E78A01 / #6FD3E0 | dezelfde, met gloed |
| randlijn kast | #E78A01 | #E78A01 |
| maalkamer binnen | #2A2E33 | #0F1113 |
| walsen: rand / lijf / glans / omtrek | #48515A / #C4CBD3 / #FFFFFF / #2A3036 | dezelfde (`WALS_ERA.digi`) |
| cyaan boog op de wals | rgba(111,211,224,.4) | rgba(111,211,224,.55) |
| spleet | #0B0C0D | #050606 |
| silhouet / helm / hesje | #2A2D31 / #F4F4EF / #D8DC4A | #111214 / #D9D9D2 / #B9BE3A |

---

## 6. Twijfelpunten

1. **Wanneer was het hijsen?** Rond de jaarwisseling 2025-2026. Dat is afgeleid uit een zoekfragment ("afgelopen maand", posts van circa tien maanden oud) en uit `research-nieuws.json` ("begin 2026"). Het kan dus eind 2025 zijn geweest. De kicker zegt 2026 omdat het spel deze molen 2026 noemt en `LEVELS[5].intro` het hijsen ook bij 2026 zet. Daarom staat er nergens een maand.
2. **Hoe zwaar?** LinkedIn zegt circa 3.500 en 6.000 kg, de LC zegt "walsen van ruim acht ton". Gewichten staan daarom niet in de tekst.
3. **Wat voor kraan?** Dat staat in geen bron. Ik koos een torenkraan in oranje, net als de vignet van Molen B (`gxVIG.digi`). Een mobiele telescoopkraan is net zo goed mogelijk. Die vignet tekent aan de haak een losse wals en geen walsenstoel. In de jaarintro hangt een kast, en dat klopt beter.
4. **Wat voor gebouw?** Of Molen B een nieuw gebouw is of in de schil van de molen uit 1967 komt, weten we niet. Hoe de molen uit 2008 eruitziet, is spelconventie (staal en glas). Stem de buurman af met het storyboard van 2008.
5. **Hoe ziet de molenzaal eruit?** De indeling (rij machines, sparing tot het dak, plafondhoogte) is een aanname. Hoe een walsenstoel eruitziet, komt van de Bühler Arrius in het algemeen, niet van Koopmans. De doorkijk met walsen als cirkels is een stijlkeuze.
6. **Elektromotoren.** Midden: dat het elektrisch is, volgt uit "onze molens draaien op 100% groene stroom". Er is geen bron die zegt dat elke walsenstoel een eigen motor heeft. Daarom zegt de tekst alleen "elektromotoren".
7. **"Zwitserse molenbouwer" en "naast de molen uit 2008"** komen uit een samenvatting van het LC-artikel op headliner.nl, niet uit het volledige artikel. Die samenvatting noemt ook een tegenstrijdige datum ("eind 2026 (3 juli)").
8. **Bouwlampen, het rode kraanlampje, hesjes en de seiner met portofoon** zijn gangbaar op een bouwplaats, maar er is geen bron over Koopmans. Ze staan alleen in het beeld.
9. **Is Molen B al open?** Dat weten we niet (stand op 23-10-2026). De tekst beweert het ook niet. "Straks ga jij erdoor" is spelfictie.

---

## 7. Bronnenlijst

**In het project**

| Bron | Waarvoor |
|---|---|
| `/home/user/Vaultwarden/game/onderzoek-royal-koopmans.md` | adres, masterplan, 180 jaar, tegenstrijdige openingsdata |
| `/home/user/Vaultwarden/game/onderzoek/research-nieuws.json` | LinkedIn van de COO, LC, loskade, urban tarweveld |
| `/home/user/Vaultwarden/game/onderzoek/research-bedrijf-nu.json` | groene stroom, masterplan, 180 jaar |
| `/home/user/Vaultwarden/game/onderzoek/research-molenproces.json` | walsenstoel, spleet, buizen, loskade |
| `/home/user/Vaultwarden/game/onderzoek/koopmans-site.md` | huisstijl, 180 jaar, urban tarweveld |
| `/home/user/Vaultwarden/game/onderzoek/spelmateriaal.json` | avoid-lijst, walsenstoelen van 3.500 tot 6.000 kg |
| `/home/user/Vaultwarden/game/korrelval.html` | `LEVELS[5]`, `STORIES[5]`, `FACTS`, `INTRO_SHOTS`, `ICOL`, `introGeo`, `gxVIG.digi` en `gxVIG.staal`, `gxDigi`, `WALS_ERA` |
| `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/mooi/stijlgids.md` | stijl en tekstregels |
| `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/bouwopdracht.md` | geen datum, "circa", walsenstoelen van enkele tonnen |

**Op het web, gelezen op 23-10-2026** (kopieën in `/tmp/claude-0/-home-user-Vaultwarden/828f9f0a-1e47-55bf-b7d0-54df4bbad9cc/scratchpad/jaar/web26/`)

| Bron | Waarvoor |
|---|---|
| https://friesland.headliner.nl/item/iedereen-kent-de-meelfabriek-van-royal-koopmans-in-leeuwarden-maar-wat-gebeurt-daar-nou-eigenlijk-lc-113115 | LC 16-11-2025, samenvatting |
| https://www.deboerendegroot.nl/wat-hebben-wij-gedaan/vervangen-loskade-royal-koopmans-meelfabriek/ | loskade |
| https://www.royalkoopmans.com/ | 180 jaar, "Groei door verbinding" |
| https://www.royalkoopmans.com/duurzaamheid/schone-energie-koopmans-op-weg-naar-net-0 | 100% groene stroom |
| https://www.royalkoopmans.com/werken-bij-koopmans/vacatures/vacature-monteur-industriele-automatisering | PLC, SCADA, sensoren |
| (LinkedIn-profiel van de COO) | alleen het zoekfragment; de pagina zelf is geblokkeerd |
| https://millermagazine.com/en/blog/arrius-groundbreaking-grinding-system-3867 | uiterlijk en kenmerken van een moderne Bühler-walsenstoel |
