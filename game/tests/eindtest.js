// =====================================================================================================
// Eindtest Molenvlucht (ontdekken in de jaarintro's, met de minigame Korrelval aan het eind): het hele pad van een nieuwe speler, en de randen.
//   A  400x800 touch (licht), lege opslag: titel > It giet oan! > hoofdintro (Verder, Terug in de tijd) > jaarintro 1846 shot 1 en 2 met
//      ontdekken (tik op het ding, zoom, zin, Nieuw in je Molenboek, Terug, tik ernaast, knop in het paneel, Verder terwijl een ding open
//      staat) > verhaal 1846 > Volgende molen: 1867 > tijdsprong (tik slaat over) > Overslaan > verhaal > Menu > Kies een molen (alle jaren) > 2026 > slot >
//      Molenboek (plakboek per jaar: plaatjes, lege kaders, Ga naar <jaar>, ook daar ontdekken, Terug naar het Molenboek) > Korrelval (kaart vooraf, It giet oan!, game-over, Nog een korrel?)
//   B  herladen: het ontdekte blijft (vinkjes, geen gloed, teller)
//   C  360x640 touch: titel past, paneel past, de dingen staan boven het paneel, tikvlak minstens 44 px
//   D  1280x800 toetsenbord: Enter, Esc, Tab, pijltjes langs de knoppen, Enter opent, Esc gaat terug, voorlezen (aria-live)
//   E  verminderde beweging: geen zoom en geen pulseren, wel gloed en dimmen
//   F  ronde 5, 360x640 met alles ontdekt: slotkaart, Kies een molen, plakboek-kaders, Scores, Instellingen, weegbon of game-over van Korrelval
//   G  ronde 6, 360x640, alle 12 shots: aantekeningen in plaats van ringen (stip, potloodlijntje, naamkaartje), een tik op het kaartje opent het ding
// Overal: geen console-fouten, geen request naar buiten, nooit het valspel, de introband of de weegbon in de tijdlijn.
// Gebruik: NODE_PATH="$(npm root -g)" node eindtest.js <korrelval.html> <uitmap>
// =====================================================================================================
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const game = path.resolve(process.argv[2]), out = path.resolve(process.argv[3] || path.join(__dirname, '..', 'uit', 'eindtest'));
fs.mkdirSync(out, { recursive: true });
// Het bestand is het spel zelf (game/korrelval.html, begint met <title>) of de gepubliceerde pagina (docs/index.html uit build-pages.sh:
// het spel met een kop eromheen en zonder commentaarregels in het script). De pagina gaat zoals hij is de browser in.
const ruw = fs.readFileSync(game, 'utf8'), pagina = /^\s*<!doctype html>/i.test(ruw);
const html = pagina ? ruw.slice(ruw.indexOf('<body>') + 6, ruw.lastIndexOf('</body>')).trim() : ruw;
const wrapped = path.join(out, 'pagina.html');
fs.writeFileSync(wrapped, pagina ? ruw : '<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
  '<style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + html + '</body></html>');
const checks = [];
const check = (ok, wat, detail) => { checks.push({ ok: !!ok, wat }); console.log(`${ok ? 'GOED' : 'FOUT'}  ${wat}${detail !== undefined ? '  (' + (typeof detail === 'string' ? detail : JSON.stringify(detail)) + ')' : ''}`); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
check(/^\s*<title>/.test(html) && !/<(!doctype|html|head|body)\b/i.test(html), 'bestand begint met <title>, geen doctype/html/head/body');
check(/^\s*<title>Molenvlucht<\/title>/.test(html) && /<h1 class="logo"[^>]*>Molen<wbr><span>vlucht<\/span><\/h1>/.test(html), 'het spel heet Molenvlucht: <title> en het logo');
check(!/achtploeg/i.test(html), 'nergens meer Nachtploeg (de minigame heet Korrelval)');

async function maak(browser, opt) {
  const ctx = await browser.newContext({ viewport: opt.vp, hasTouch: !!opt.touch, isMobile: !!opt.touch, deviceScaleFactor: opt.dpr || 1, colorScheme: opt.scheme || 'light', reducedMotion: opt.reduced ? 'reduce' : 'no-preference' });
  const extern = [], fouten = [];
  await ctx.route('**/*', r => { const u = r.request().url(); if (/^(file|data|blob|about):/.test(u)) return r.continue(); extern.push(u); return r.abort('blockedbyclient'); });
  const page = await ctx.newPage();
  page.on('pageerror', e => fouten.push('paginafout: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') fouten.push('console: ' + m.text()); });
  const cdp = opt.touch ? await ctx.newCDPSession(page) : null;
  const touch = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y, id: 1 }] });
  const tap = async (x, y) => { if (cdp) { await touch('touchStart', x, y); await sleep(50); await touch('touchEnd', x, y); } else await page.mouse.click(x, y); await sleep(180); };
  const box = sel => page.evaluate(s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return r.width ? { x: r.left, y: r.top, w: r.width, h: r.height } : null; }, sel);
  const tapSel = async sel => { const b = await box(sel); if (!b) throw new Error('niet in beeld: ' + sel); await tap(b.x + b.w / 2, b.y + b.h / 2); };
  const st = () => page.evaluate(() => window.__korrelval.state());
  const jaar = () => page.evaluate(() => window.__korrelval.jaarState());
  const ox = () => page.evaluate(() => window.__korrelval.ontdek());
  const scr = () => page.evaluate(() => window.__korrelval.state().screen);
  const tot = async (f, ms) => { const t0 = Date.now(); while (Date.now() - t0 < (ms || 8000)) { if (await f()) return true; await sleep(100); } return false; };
  const shot = n => page.screenshot({ path: path.join(out, n + '.png') });
  const geenX = () => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  const paneel = () => page.evaluate(() => { const p = document.getElementById('introPanel'), r = p.getBoundingClientRect(); return { past: p.scrollHeight <= p.clientHeight + 1 && r.bottom <= innerHeight + 0.5 && r.top >= 0, top: Math.round(r.top) }; });
  // het valspel, de introband of de weegbon mag in de tijdlijn nooit komen: elke 150 ms kijken
  const verboden = new Set(); let tijd = true;
  const wacht = setInterval(async () => { if (!tijd) return; try { const s = await scr(); if (s === 'play' || s === 'level' || s === 'over' || s === 'pause') verboden.add(s); } catch (e) { /* pagina laadt */ } }, 150);
  return { ctx, page, extern, fouten, tap, box, tapSel, st, jaar, ox, scr, tot, shot, geenX, paneel, verboden, korrelval: () => { tijd = false; }, stop: () => clearInterval(wacht) };
}
// wacht tot de ontdekstand aan staat (de camera staat stil)
const stand = T => T.tot(async () => (await T.ox()).on, 9000);

(async () => {
  const browser = await chromium.launch();
  // ============================== A ==============================
  const A = await maak(browser, { vp: { width: 400, height: 800 }, touch: true, dpr: 2 });
  const { page } = A;
  await page.goto('file://' + wrapped); await sleep(1200);
  check(await A.scr() === 'title', 'A titelscherm');
  const lead = await page.textContent('.lead');
  check(/180 jaar molengeschiedenis/.test(lead) && !/tarwekorrel/.test(lead) && !/!/.test(lead), 'titel: de lead gaat over de vlucht door 180 jaar', lead);
  check(await A.box('#bPick') && !/open na molen/.test(await page.textContent('#bNight')), 'titel: Kies een molen staat er, Korrelval staat open');
  const titelPast = await page.evaluate(() => { const c = document.querySelector('#scrTitle .card'); return c.scrollHeight <= c.clientHeight + 1; });
  check(titelPast && await A.geenX(), 'titel past zonder scrollen, geen horizontaal scrollen');
  await A.shot('A01-titel');
  // hoofdintro
  await A.tapSel('#bStart'); await sleep(450);
  let iv = await page.evaluate(() => window.__korrelval.intro());
  check(iv.open && iv.shot === 0, 'It giet oan! start de hoofdintro', iv);
  check(await page.evaluate(() => document.getElementById('oxRij').hidden), 'hoofdintro: geen rij met knoppen');
  for (let k = 0; k < 3; k++) { await A.tapSel('#bIntroNext'); await sleep(420); if (k < 2) { await A.tapSel('#bIntroNext'); await sleep(420); } }
  const laatste = (await page.textContent('#bIntroNext')).trim();
  check(laatste === 'Terug in de tijd', 'hoofdintro: laatste knop Terug in de tijd', laatste);
  // ronde 6: na Terug in de tijd eerst de tijdsprong terug (het jaartal rolt van 2026 naar 1846), dan de jaarintro van 1846
  await A.tapSel('#bIntroNext');
  const terug = await A.tot(async () => await A.scr() === 'sprong', 3000), spT = await page.evaluate(() => window.__korrelval.sprong());
  check(terug && spT.van === '2026' && spT.naar === '1846' && spT.stippen === 6, 'Terug in de tijd: de tijdsprong rolt terug van 2026 naar 1846', { van: spT.van, naar: spT.naar });
  await A.tot(async () => (await A.jaar()).open, 4000);
  // jaarintro 1846, shot 1
  let jv = await A.jaar();
  check(jv.open && jv.year === 1846 && jv.shot === 0 && jv.from === 'tijd', 'daarna de jaarintro van 1846 in de tijdlijn', { open: jv.open, year: jv.year, shot: jv.shot, from: jv.from });
  let o = await A.ox();
  check(!o.on && o.list.length === 2 && await page.evaluate(() => document.getElementById('oxRij').classList.contains('wacht')), 'tijdens de camerabeweging: nog geen gloed, de knoppen staan klaar', { on: o.on, n: o.list.length });
  check(await stand(A), 'aan het eind van de beweging gaat de ontdekstand aan');
  o = await A.ox();
  const p1 = await A.paneel(), picH = (await A.jaar()).picH;
  const plekOk = o.list.every(d => d.box && d.box[2] >= 44 && d.box[3] >= 44 && d.a[1] > 0 && d.a[1] < picH && d.a[0] > 0 && d.a[0] < 400);
  check(plekOk, 'shot 1: elk ding staat in beeld boven het paneel, tikvlak minstens 44 x 44 css-px', o.list.map(d => [d.id, d.a, d.box]));
  check(o.tel === 'Tik op een kaartje', 'eerste keer: Tik op een kaartje', o.tel);
  check(p1.past && await A.geenX(), 'paneel past (400x800)', p1);
  await A.shot('A02-1846-s1-gloed');
  // tik op het ding zelf
  const d0 = o.list[0]; await A.tap(d0.box[0] + d0.box[2] / 2, d0.box[1] + d0.box[3] / 2); await sleep(700);
  o = await A.ox();
  const tekst = await page.textContent('#introText'), sr = await page.textContent('#sr'), kop = (await page.textContent('#introKicker')).trim();
  check(o.open === 0 && /scale\(/.test(o.zoom), 'tik op het ding: het gaat open en de camera zoomt naar het ding', { open: o.open, zoom: o.zoom });
  const zoomK = +(/scale\(([\d.]+)\)/.exec(o.zoom) || [0, 0])[1];
  check(zoomK > 1 && zoomK <= 1.4, 'zoom hooguit 1,4x', zoomK);
  check(kop === d0.naam && !tekst.startsWith(d0.naam) && /Nieuw in je Molenboek/.test(tekst), 'paneel: de naam in handschrift op de plek van het jaartal, één zin en Nieuw in je Molenboek', { kop, tekst });
  check(sr.includes(d0.naam) && sr.length > 20, 'de zin wordt voorgelezen (aria-live)', sr.slice(0, 80));
  check(await A.box('#oxTerug') && await page.evaluate(() => document.getElementById('oxLaag').classList.contains('open')), 'Terug staat er en de rest is gedimd');
  const p2 = await A.paneel(); check(p2.past && p2.top <= p1.top + 2, 'het paneel past nog en zakt niet als een ding open is (het mag naar boven groeien: de zin vervangt de ondertitel)', { voor: p1.top, na: p2.top });
  await A.shot('A03-1846-s1-open');
  await A.tapSel('#oxTerug'); await sleep(750);
  o = await A.ox();
  check(o.open === -1 && o.zoom === '' && o.list[0].af && /^1 van 5 ontdekt$/.test(o.tel), 'Terug zoomt uit; vinkje en 1 van 5 ontdekt', { open: o.open, zoom: o.zoom, tel: o.tel });
  check(await page.evaluate(() => getComputedStyle(document.querySelector('.ox-spot.af i')).opacity === '0'), 'een ontdekt ding heeft geen stip meer (wel een vinkje)');
  // de knop in het paneel, dan tik ernaast
  await A.tapSel('#oxKnoppen .ox-knop:nth-child(2)'); await sleep(650);
  o = await A.ox(); const open2 = o.open;
  await A.tap(20, 60); await sleep(700); o = await A.ox();
  check(open2 === 1 && o.open === -1, 'de knop met de naam opent het ding; een tik ernaast is Terug', { open2, na: o.open });
  // tik op het beeld naast de dingen (niets open): geen Verder
  await A.tap(30, 40); await sleep(300); jv = await A.jaar();
  check(jv.shot === 0, 'een tik naast de dingen gaat niet verder (Verder is de knop)', jv.shot);
  // shot 2
  await A.tapSel('#bIntroNext'); await sleep(400); jv = await A.jaar();
  check(jv.shot === 1 && (await page.textContent('#bIntroNext')).trim() === 'Naar het verhaal', 'Verder gaat naar shot 2; de laatste knop heet Naar het verhaal (geen It giet oan!, geen duik)', { shot: jv.shot, knop: await page.textContent('#bIntroNext') });
  check(await stand(A), 'shot 2: de ontdekstand gaat aan');
  o = await A.ox();
  check(o.list.length === 3 && o.list.every(d => d.box && d.box[2] >= 44 && d.box[3] >= 44 && d.a[1] > 0 && d.a[1] < picH), 'shot 2: drie dingen in beeld, tikvlak minstens 44', o.list.map(d => [d.id, d.a]));
  // het paard loopt: de gloed loopt mee
  const pa = o.list.find(d => /paard/.test(d.id)); await sleep(500); const pb = (await A.ox()).list.find(d => /paard/.test(d.id));
  check(pa && pb && Math.hypot(pa.a[0] - pb.a[0], pa.a[1] - pb.a[1]) > 2, 'het paard loopt rond en de gloed loopt mee', { voor: pa && pa.a, na: pb && pb.a });
  await A.shot('A04-1846-s2-gloed');
  await A.tap(pb.box[0] + pb.box[2] / 2, pb.box[1] + pb.box[3] / 2); await sleep(700); o = await A.ox();
  check(o.open >= 0, 'tik op het lopende paard opent het', o.open);
  await A.shot('A05-1846-s2-open');
  check(/^2 van 5 ontdekt$/.test(o.tel) || /^3 van 5 ontdekt$/.test(o.tel), 'teller over beide shots', o.tel);
  // Verder terwijl een ding open is: het verhaal (geen duik, geen introband)
  await A.tapSel('#bIntroNext'); await sleep(700);
  check(await A.scr() === 'story', 'Verder (ook met een ding open) gaat naar het verhaal van 1846');
  const story = await page.evaluate(() => ({ kick: document.getElementById('stKicker').textContent, knop: document.getElementById('bStory').textContent, menu: !document.getElementById('bStoryMenu').hidden, achter: !document.getElementById('tlAchter').hidden, slot: document.getElementById('stSlot').hidden, tekst: document.getElementById('stText').textContent, veil: document.getElementById('introVeil').hidden }));
  check(/Tijdperk\s*1846/.test(story.kick) && story.knop === 'Volgende molen: 1867' && story.menu && story.achter && story.veil, 'verhaalkaart: Tijdperk 1846, Volgende molen: 1867, Menu, het eindbeeld erachter', story);
  check(!/pannenkoek/i.test(story.tekst), 'geen pannenkoek in het verhaal van 1846');
  const sp = await page.evaluate(() => { const c = document.querySelector('#scrStory .card'); return c.scrollHeight <= c.clientHeight + 1; });
  check(sp, 'verhaalkaart past zonder scrollen');
  await A.shot('A06-verhaal-1846');
  const bewaard = await page.evaluate(() => { try { return Object.keys(JSON.parse(localStorage.getItem('korrelval-b-v2')).ontdekt); } catch (e) { return null; } });
  check(bewaard && bewaard.length >= 3, 'het ontdekte staat in de opslag', bewaard);
  // tijdsprong (ronde 3): na het verhaal een lijn met zes stippen, het jaartal telt in handschrift van 1846 naar 1867, de stip verspringt; een tik slaat over
  await sleep(500); await A.tapSel('#bStory'); await sleep(420);
  const sp1 = await page.evaluate(() => window.__korrelval.sprong()); await A.shot('A06b-tijdsprong');
  await A.tap(200, 300); await sleep(200);
  jv = await A.jaar();
  check(sp1.open && sp1.van === '1846' && sp1.naar === '1867' && sp1.stippen === 6 && sp1.jaren.join() === '1846,1867,1920,1976,2008,2026' && sp1.hand && +sp1.jaar > 1846 && +sp1.jaar < 1867 && sp1.stip > 0 && sp1.stip < 1 && sp1.t < 1.5 && jv.open && jv.year === 1867,
    'tijdsprong: zes stippen, het jaartal (handschrift) telt van 1846 naar 1867, de stip verspringt; een tik slaat over', { ...sp1, na: jv.year });
  check(jv.open && jv.year === 1867 && jv.from === 'tijd', 'Volgende molen: de jaarintro van 1867 (elke keer, niet alleen de eerste keer)', { year: jv.year, from: jv.from });
  await sleep(300); await A.tapSel('#bIntroSkipTop'); await sleep(600);
  check(await A.scr() === 'story' && (await page.textContent('#bStory')) === 'Volgende molen: 1920', 'Overslaan: het verhaal van 1867, dan Volgende molen: 1920');
  await A.tapSel('#bStoryMenu'); await sleep(400);
  check(await A.scr() === 'title', 'Menu op de verhaalkaart: terug naar de titel');
  // Kies een molen
  await A.tapSel('#bPick'); await sleep(400);
  const chips = await page.evaluate(() => [...document.querySelectorAll('#lvlChips .btn')].map(b => b.textContent));
  check(chips.length === 6 && /1846/.test(chips[0]) && /2026/.test(chips[5]) && /3 van 5/.test(chips[0]), 'Kies een molen: alle zes jaren open, met wat je ontdekte', chips);
  const pickPast = await page.evaluate(() => { const c = document.querySelector('#scrPick .card'); return c.scrollHeight <= c.clientHeight + 1; });
  check(pickPast, 'Kies een molen past zonder scrollen');
  await A.tapSel('#lvlChips .btn:nth-child(6)'); await sleep(500); jv = await A.jaar();
  check(jv.open && jv.year === 2026 && jv.from === 'tijd', 'Kies een molen: 2026 opent de jaarintro van 2026', jv.year);
  await sleep(300); await A.tapSel('#bIntroSkipTop'); await sleep(600);
  check((await page.textContent('#bStory')) === 'Verder', 'na 2026: de knop op het verhaal heet Verder');
  await sleep(400); await A.tapSel('#bStory'); await sleep(500);
  const slot = await page.evaluate(() => ({ s: window.__korrelval.state().screen, note: document.getElementById('doneNote').textContent, knoppen: ['bDoneBook', 'bDoneNight', 'bDoneMenu'].map(i => !!document.getElementById(i).offsetWidth), bon: !!document.querySelector('#scrDone .bon'), kv: document.getElementById('bDoneNight').textContent, regel: document.querySelector('#scrDone .kv-regel').textContent }));
  check(slot.s === 'done' && /^Je ontdekte 3 van 28 dingen\.$/.test(slot.note) && slot.knoppen.every(Boolean) && !slot.bon && slot.kv === 'Speel Korrelval' && /Nu ben jij de korrel\./.test(slot.regel), 'slotkaart: Je ontdekte 3 van 28 dingen, met Speel Korrelval (en de regel ervoor), Molenboek en Menu (geen weegbon)', slot);
  const slotGa = await page.evaluate(() => [...document.querySelectorAll('#doneJaren .tl-ga')].map(b => { const r = b.getBoundingClientRect(), q = getComputedStyle(b, '::before'); return [b.dataset.jaar, Math.round(r.height - parseFloat(q.top) - parseFloat(q.bottom)), b.getAttribute('aria-label')]; }));
  check(slotGa.length === 6 && slotGa.every(g => g[1] >= 44 && /^Ga naar \d{4}: nog \d te ontdekken$/.test(g[2])) && await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('#doneNote b')).fontSize) >= 28), 'slotkaart: het getal groot in handschrift; elk jaar waar nog iets ligt is een knop naar dat jaar (tikvlak 44+)', slotGa.slice(0, 2));
  const slotPast = await page.evaluate(() => { const c = document.querySelector('#scrDone .card'); return c.scrollHeight <= c.clientHeight + 1; });
  check(slotPast, 'slotkaart past zonder scrollen', slotPast);
  await A.shot('A07-slot');
  // Molenboek
  await A.tapSel('#bDoneBook'); await sleep(500);
  const boek = await page.evaluate(() => ({ s: window.__korrelval.state().screen, jaar46: (document.querySelector('.pb-jaar[data-jaar="0"]') || { textContent: '' }).textContent, dingen: document.querySelectorAll('.pb-kaart.vol').length, kijk: [...document.querySelectorAll('.jx-kijk')].map(b => b.dataset.jaar), acts: [...document.querySelectorAll('#bookThings .act, #bookMachines .act')].map(p => p.textContent.split(':')[0]) }));
  check(boek.s === 'boek' && boek.dingen >= 3 && /1846.*3 van 5.*Rosmolen/.test(boek.jaar46), 'Molenboek: de ontdekte dingen staan erin, bij hun jaar (1846, 3 van 5)', { dingen: boek.dingen });
  check(boek.kijk.includes('0'), 'Molenboek: Ga naar 1846 op het blad van 1846', boek.kijk);
  // ronde 4: het plakboek. Elk ontdekt ding heeft een plaatje (uitsnede van het eindbeeld van zijn shot), de rest is een leeg kader met ? en het jaartal
  await A.tot(() => page.evaluate(() => !document.querySelector('#scrBoek canvas[data-wacht]')), 12000);
  const plak = await page.evaluate(() => {
    const c = document.querySelector('.pb-kaart.vol[data-ding="o46-rosmolen"] canvas'); let kleuren = 0, wacht = true;
    if (c) { wacht = c.hasAttribute('data-wacht'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, set = new Set(); for (let i = 0; i < d.length; i += 4 * 97) set.add((d[i] >> 3) << 10 | (d[i + 1] >> 3) << 5 | d[i + 2] >> 3); kleuren = set.size; }
    const leeg = [...document.querySelectorAll('.pb-kaart.leeg')], l67 = document.querySelector('.pb-jaar[data-jaar="1"] .pb-kaart.leeg'), ga = document.querySelector('.pb-ga[data-jaar="1"]');
    return { wacht, kleuren, vol: document.querySelectorAll('.pb-kaart.vol').length, leeg: leeg.length, tekst67: l67 ? l67.textContent : '', ga: ga ? ga.textContent : '', kop67: document.querySelector('.pb-jaar[data-jaar="1"] .pb-kop').textContent,
      past: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1 };
  });
  check(!plak.wacht && plak.kleuren >= 12, 'Molenboek: het ontdekte ding heeft een plaatje (uitsnede van het eindbeeld, geen leeg vlak)', { kleuren: plak.kleuren });
  check(plak.vol + plak.leeg === 28 && plak.leeg > 0 && /\?/.test(plak.tekst67) && /1867/.test(plak.tekst67) && /1867.*\d van 5/.test(plak.kop67) && plak.ga === 'Ga naar 1867' && plak.past, 'Molenboek: wat nog niet ontdekt is, staat er als leeg kader met ? en het jaartal; per jaar een kopje met n van 5 en Ga naar 1867', { vol: plak.vol, leeg: plak.leeg, kop: plak.kop67, ga: plak.ga });
  await A.shot('A08-molenboek');
  await page.evaluate(() => { const b = document.querySelector('.jx-kijk[data-jaar="0"]'); b.scrollIntoView({ block: 'center' }); }); await sleep(200);
  await A.tapSel('.jx-kijk[data-jaar="0"]'); await sleep(500); jv = await A.jaar();
  check(jv.open && jv.from === 'boek' && !(await page.evaluate(() => document.getElementById('oxRij').hidden)), 'terugkijken uit het Molenboek: met de ontdekstand', { from: jv.from });
  await A.tapSel('#bIntroNext'); await sleep(300); check(await stand(A), 'terugkijken: de stand gaat aan na de sprong naar het eindbeeld');
  o = await A.ox(); check(o.list[0].af && o.list[1].af && /^3 van 5 ontdekt$/.test(o.tel), 'terugkijken: wat al ontdekt is, heeft een vinkje', o.tel);
  await A.tapSel('#bIntroNext'); await sleep(450);
  await A.tapSel('#oxKnoppen .ox-knop:nth-child(2)'); await sleep(650); o = await A.ox();
  check(o.open === 1 && /^4 van 5 ontdekt$/.test(o.tel), 'terugkijken: nog een ding ontdekt (4 van 5)', o.tel);
  const kb = (await page.textContent('#bIntroNext')).trim(); check(kb === 'Terug naar het Molenboek', 'laatste knop bij terugkijken: Terug naar het Molenboek', kb);
  await A.tapSel('#bIntroNext'); await sleep(700);
  check(await A.scr() === 'boek', 'terug in het Molenboek');
  const na = await page.evaluate(() => ({ tel: document.querySelector('.pb-jaar[data-jaar="0"] .pb-tel').textContent, vol: document.querySelectorAll('.pb-jaar[data-jaar="0"] .pb-kaart.vol').length }));
  check(/^4 van 5/.test(na.tel) && na.vol === 4, 'terug in het Molenboek: het nieuwe ding is ingeplakt (4 van 5)', na);
  await page.evaluate(() => document.querySelector('.pb-ga[data-jaar="1"]').scrollIntoView({ block: 'center' })); await sleep(450);
  await A.tapSel('.pb-ga[data-jaar="1"]'); await sleep(600); jv = await A.jaar();
  check(jv.open && jv.year === 1867, 'Ga naar 1867 start dat jaar', { year: jv.year, from: jv.from });
  await A.tapSel('#bIntroSkipTop'); await sleep(700);
  check(await A.scr() === 'boek', 'en terug in het Molenboek');
  await sleep(450); await A.tapSel('#bBookBack'); await sleep(400);
  check(await A.scr() === 'done', 'Terug uit het Molenboek: weer de slotkaart');
  // Korrelval (de minigame)
  A.korrelval();
  await A.tapSel('#bDoneNight'); await sleep(400);
  const kaart = await page.evaluate(() => ({ s: window.__korrelval.state().screen, kop: document.querySelector('#scrNight h2').textContent, knop: document.getElementById('bNbDaily').textContent, tekst: document.querySelector('#scrNight .story-text').textContent }));
  check(kaart.s === 'night' && kaart.kop === 'Korrelval' && kaart.knop === 'It giet oan!' && /^Nu ben jij de korrel\./.test(kaart.tekst), 'Speel Korrelval op de slotkaart: de kaart vooraf (Korrelval, Nu ben jij de korrel, It giet oan!)', kaart);
  await A.tapSel('#bNbDaily'); await sleep(600);
  check(await A.scr() === 'play' && (await A.st()).lives === 3, 'Korrelval start, met drie korrels', (await A.st()).lives);
  await A.tap(200, 500); await page.evaluate(() => { window.__kvFast = 4; });
  const over = await A.tot(async () => (await A.scr()) === 'over', 40000);
  check(over, 'Korrelval: game-over (valspel werkt nog)');
  await page.evaluate(() => { window.__kvFast = 1; });
  await A.shot('A09-korrelval-over');
  await sleep(400); await A.tapSel('#bAgain'); await sleep(500);
  check(await A.scr() === 'play', 'Nog een korrel? start opnieuw');
  await page.keyboard.press('Escape'); await sleep(300); await A.tapSel('#bPMenu'); await sleep(400);
  check(await A.scr() === 'title', 'pauze > Naar menu: titel');
  // ============================== B: herladen ==============================
  await page.reload(); await sleep(1200);
  await A.tapSel('#bPick'); await sleep(400); await A.tapSel('#lvlChips .btn:nth-child(1)'); await sleep(500);
  await A.tapSel('#bIntroNext'); await sleep(300); await stand(A);
  o = await A.ox();
  check(o.list.every(d => d.af) && /^4 van 5 ontdekt$/.test(o.tel), 'B herladen: het ontdekte blijft (vinkjes, 4 van 5)', o.tel);
  const pulsUit = await page.evaluate(() => [...document.querySelectorAll('.ox-spot')].every(e => getComputedStyle(e.querySelector('i')).opacity === '0'));
  check(pulsUit, 'B herladen: ontdekte dingen hebben geen stip meer');
  check(A.verboden.size === 0, 'in de tijdlijn nooit het valspel, de introband, de weegbon of de pauze', [...A.verboden]);
  check(!A.fouten.length, 'A/B geen console-fouten', A.fouten.slice(0, 5));
  check(!A.extern.length, 'A/B niets van buiten', A.extern.slice(0, 5));
  A.stop(); await A.ctx.close();

  // ============================== C: 360x640 ==============================
  const C = await maak(browser, { vp: { width: 360, height: 640 }, touch: true, dpr: 2 });
  await C.page.goto('file://' + wrapped); await sleep(1200);
  const tp = await C.page.evaluate(() => { const c = document.querySelector('#scrTitle .card'); return c.scrollHeight <= c.clientHeight + 1; });
  check(tp && await C.geenX(), 'C 360x640: titel past');
  await C.tapSel('#bStart'); await sleep(450); await C.tapSel('#bIntroSkipTop'); await sleep(900);
  jv = await C.jaar(); check(jv.open && jv.year === 1846, 'C Overslaan in de hoofdintro: 1846', jv.year);
  for (const sh of [0, 1]) {
    if (sh) { await C.tapSel('#bIntroNext'); await sleep(450); }
    await stand(C); o = await C.ox(); const pc = await C.paneel(), ph = (await C.jaar()).picH;
    check(pc.past && o.list.every(d => d.box && d.box[2] >= 44 && d.box[3] >= 44 && d.a[1] > 4 && d.a[1] < ph - 4 && d.a[0] > 0 && d.a[0] < 360), `C shot ${sh + 1}: paneel past, de dingen staan boven het paneel, tikvlak 44+`, { P: ph, plek: o.list.map(d => d.a) });
    await C.tapSel('#oxKnoppen .ox-knop:nth-child(1)'); await sleep(700);
    const po = await C.paneel(); check(po.past && po.top <= pc.top + 2, `C shot ${sh + 1}: met een ding open past het paneel nog (en zakt niet)`, { voor: pc.top, na: po.top });
    await C.shot(`C0${sh + 1}-360-open`);
    await C.tapSel('#oxTerug'); await sleep(650);
  }
  check(ph360(await C.jaar()) >= 300, 'C 360x640: het beeld boven het paneel is minstens 300 px hoog', (await C.jaar()).picH);
  check(!C.fouten.length && !C.extern.length, 'C geen fouten, niets van buiten', C.fouten.slice(0, 3));
  C.stop(); await C.ctx.close();

  // ============================== D: toetsenbord ==============================
  const D = await maak(browser, { vp: { width: 1280, height: 800 } });
  const kp = D.page;
  await kp.goto('file://' + wrapped); await sleep(1200);
  await kp.keyboard.press('Enter'); await sleep(450);
  check((await kp.evaluate(() => window.__korrelval.intro())).open, 'D Enter op de titel: de hoofdintro');
  await kp.keyboard.press('Escape'); await sleep(900);
  jv = await D.jaar(); check(jv.open && jv.year === 1846, 'D Esc slaat de hoofdintro over: 1846', jv.year);
  await sleep(400); await kp.keyboard.press('ArrowRight'); await sleep(450); // pijltje rechts: naar het eindbeeld
  await stand(D);
  // Tab tot de eerste knop met een naam
  let opKnop = false; for (let i = 0; i < 12 && !opKnop; i++) { await kp.keyboard.press('Tab'); opKnop = await kp.evaluate(() => document.activeElement && document.activeElement.classList.contains('ox-knop')); }
  check(opKnop, 'D Tab komt bij de knoppen met de namen');
  const n0 = await kp.evaluate(() => document.activeElement.textContent);
  await kp.keyboard.press('ArrowRight'); await sleep(100);
  const n1 = await kp.evaluate(() => document.activeElement.textContent);
  check(n0 !== n1 && (await D.jaar()).shot === 0, 'D pijltje rechts op een knop: naar de volgende knop (niet verder)', [n0, n1]);
  await kp.keyboard.press('Enter'); await sleep(700); o = await D.ox();
  const srD = await kp.textContent('#sr');
  check(o.open === 1 && srD.startsWith(n1), 'D Enter opent het ding en de zin wordt voorgelezen', { open: o.open, sr: srD.slice(0, 60) });
  await D.shot('D01-1280-open');
  await kp.keyboard.press('Escape'); await sleep(700); o = await D.ox();
  const focusTerug = await kp.evaluate(() => document.activeElement && document.activeElement.textContent);
  check(o.open === -1 && (await D.jaar()).open && focusTerug === n1, 'D Esc gaat terug (de jaarintro blijft open, de focus terug op de knop)', { open: o.open, focus: focusTerug });
  await kp.keyboard.press(' '); await sleep(600); o = await D.ox();
  check(o.open === 1, 'D spatie op de knop opent ook', o.open);
  await kp.keyboard.press('Escape'); await sleep(500);
  await kp.evaluate(() => document.activeElement.blur()); await kp.keyboard.press('ArrowRight'); await sleep(450);
  check((await D.jaar()).shot === 1, 'D pijltje rechts (niet op een knop): Verder naar shot 2');
  await sleep(400); await kp.keyboard.press('Enter'); await sleep(500); await kp.keyboard.press('Enter'); await sleep(700);
  check(await D.scr() === 'story', 'D Enter: Verder tot het verhaal');
  check(!D.fouten.length && !D.extern.length, 'D geen fouten, niets van buiten', D.fouten.slice(0, 3));
  D.stop(); await D.ctx.close();

  // ============================== E: verminderde beweging ==============================
  const E = await maak(browser, { vp: { width: 400, height: 800 }, touch: true, reduced: true, scheme: 'dark' });
  await E.page.goto('file://' + wrapped); await sleep(1200);
  await E.tapSel('#bStart'); await sleep(450); await E.tapSel('#bIntroSkipTop'); await sleep(900);
  o = await E.ox(); jv = await E.jaar();
  check(jv.open && o.on, 'E verminderde beweging: meteen het eindbeeld met de ontdekstand', { on: o.on });
  const anim = await E.page.evaluate(() => getComputedStyle(document.querySelector('.ox-spot i')).animationName);
  check(anim === 'none', 'E de stip ademt niet', anim);
  await E.tapSel('#oxKnoppen .ox-knop:nth-child(1)'); await sleep(400); o = await E.ox();
  const dim = await E.page.evaluate(() => getComputedStyle(document.getElementById('oxDim')).opacity);
  check(o.open === 0 && o.zoom === '' && +dim > 0.9, 'E geen zoom, wel dimmen', { zoom: o.zoom, dim });
  await E.shot('E01-reduced-open');
  check(!E.fouten.length && !E.extern.length, 'E geen fouten, niets van buiten', E.fouten.slice(0, 3));
  E.stop(); await E.ctx.close();

  // ============================== F: ronde 5 (elk scherm nagelopen) ==============================
  // 360x640 touch, alles ontdekt: de slotkaart knipt niets af, de akker blijft achter Kies een molen staan, Scores en Instellingen zeggen
  // wat alleen voor Korrelval geldt, de kaders van het plakboek liggen in beeld, en de weegbon of game-over van Korrelval is rustig
  // (de kilo's groot, hooguit drie regels, geen kaartjes of badges).
  const F = await maak(browser, { vp: { width: 360, height: 640 }, touch: true, dpr: 2 });
  const fp = F.page, sleutels = [...html.matchAll(/\{ id: "(o\d\d-[a-z]+)", naam:/g)].map(m => m[1]);
  await fp.goto('file://' + wrapped); await sleep(600);
  await fp.evaluate(ks => { const o = {}, b = {}; for (const k of ks) { o[k] = 1; b[k] = 1; } localStorage.setItem('korrelval-b-v2', JSON.stringify({ introSeen: true, ontdekt: o, book: b, oxUitleg: 1 })); }, sleutels);
  await fp.reload(); await sleep(1200);
  check(sleutels.length === 28 && /alle 28 dingen/.test(await fp.textContent('#titleVoort')), 'F titel: Je ontdekte alle 28 dingen', await fp.textContent('#titleVoort'));
  await F.tapSel('#bPick'); await sleep(1600); // jxPrewarm meet na 0,4 s het paneel: de akker moet blijven staan
  const akker = await fp.evaluate(() => { const c = document.getElementById('introCv'); if (c.hidden) return 'weg'; const d = c.getContext('2d').getImageData(Math.floor(c.width / 2), 8, 1, 1).data; return d[3]; });
  check(akker === 255, 'F Kies een molen: de akker blijft erachter staan (het canvas is niet gewist)', akker);
  await F.tapSel('#lvlChips .btn:nth-child(6)'); await sleep(500); await F.tapSel('#bIntroSkipTop'); await sleep(700); await F.tapSel('#bStory'); await sleep(600);
  const slot5 = await fp.evaluate(() => { const c = document.querySelector('#scrDone .card'), r = c.getBoundingClientRect(); return { s: window.__korrelval.state().screen, past: c.scrollHeight <= c.clientHeight + 1, binnen: [...document.querySelectorAll('#doneJaren li')].every(li => { const q = li.getBoundingClientRect(); return q.left >= r.left && q.right <= r.right + 0.5 && li.scrollWidth <= li.clientWidth + 1; }), n: document.querySelectorAll('#doneJaren li.af').length }; });
  check(slot5.s === 'done' && slot5.past && slot5.binnen && slot5.n === 6, 'F slotkaart (360 breed, alles ontdekt): zes jaren met vinkje, niets afgeknipt, geen scrollen', slot5);
  await F.tapSel('#bDoneBook'); await sleep(500); await F.tot(() => fp.evaluate(() => !document.querySelector('#scrBoek canvas[data-wacht]')), 40000);
  const kaders = (await fp.evaluate(() => window.__korrelval.plakboek())).kader || {};
  const kOk = sleutels.every(k => { const q = kaders[k]; return q && q[0] >= 0 && q[1] >= 0 && q[0] + q[2] <= 721 && q[1] + q[3] <= 451 && q[2] >= 143; });
  check(kOk && kaders['o46-kamwiel'][2] >= 300, 'F plakboek: 28 kaders binnen het beeld; het kamwiel heeft een breed kader (het wiel, niet de wand)', kaders['o46-kamwiel']);
  check(kaders['o20-plansichter'] && kaders['o20-plansichter'][1] >= 20, 'F plakboek: de plansichter van 1920 staat midden in zijn plaatje (uit het begin van het shot, niet tegen de bovenrand)', kaders['o20-plansichter']);
  const weet = await fp.evaluate(() => { const c = document.querySelector('#scrBoek .card').getBoundingClientRect(), L = [...document.querySelectorAll('#bookFacts li')]; return { n: L.length, kop: (document.querySelector('.pb-weet .sect-h') || {}).textContent, binnen: L.every(li => { const r = li.getBoundingClientRect(); return r.left >= c.left && r.right <= c.right + 0.5 && r.width >= 120; }), tekst: L.every(li => li.textContent.length > 30 && !/!/.test(li.textContent)) }; });
  check(weet.n === 10 && weet.kop === 'Wist je dat' && weet.binnen && weet.tekst, 'F Molenboek: achterin het blad Wist je dat met de tien weetjes als kaartjes', weet);
  await F.tapSel('#bBookBack'); await sleep(400); await F.tapSel('#bDoneMenu'); await sleep(500);
  await F.tapSel('#bScores'); await sleep(400);
  const sc5 = await fp.evaluate(() => ({ t: document.querySelector('#scrScores .card').textContent, badges: document.querySelectorAll('#allBadges .badge').length, past: document.querySelector('#scrScores .card').scrollHeight <= document.querySelector('#scrScores .card').clientHeight + 1 }));
  check(/Badges uit Korrelval/.test(sc5.t) && /Jouw meel in Korrelval/.test(sc5.t) && /De tijdlijn heeft geen score/.test(sc5.t) && /Je ontdekte 28 van 28 dingen/.test(sc5.t) && sc5.badges === 6 && sc5.past && !/Uitmalingen gezien/.test(sc5.t), 'F Scores: tijdlijn zonder score; top 5, badges en meel horen bij Korrelval', { badges: sc5.badges, past: sc5.past });
  await F.tapSel('#bScoresBack'); await sleep(300); await F.tapSel('#bSettings'); await sleep(400);
  const in5 = await fp.evaluate(() => { const s = document.getElementById('bGezel').closest('.sect'); return { kop: s ? s.querySelector('.sect-h').textContent : '', geluid: !document.getElementById('bSound').closest('.sect') }; });
  check(in5.kop === 'Alleen voor Korrelval' && in5.geluid, 'F Instellingen: Gezel-modus staat onder Alleen voor Korrelval, Geluid erboven', in5);
  await F.tapSel('#bSettingsBack'); await sleep(300);
  F.korrelval(); await F.tapSel('#bNight'); await sleep(500); await F.tapSel('#bNbDaily'); await sleep(600); await F.tap(180, 400);
  await fp.evaluate(() => { window.__kvAuto = 1; window.__kvFast = 4; });
  await F.tot(async () => ['level', 'over'].includes(await F.scr()), 90000); await fp.evaluate(() => { window.__kvAuto = 0; window.__kvFast = 1; }); await sleep(1300);
  const eind5 = await fp.evaluate(() => { const s = window.__korrelval.state().screen, sec = document.getElementById(s === 'level' ? 'scrLevel' : 'scrOver'), c = sec.querySelector('.card'), kg = sec.querySelector('.bon.kg tr.big td:last-child'), ul = sec.querySelector('.bon-regels');
    return { s, kg: kg ? kg.textContent.trim() : '', px: kg ? parseFloat(getComputedStyle(kg).fontSize) : 0, rijen: sec.querySelectorAll('.bon tr').length, regels: ul ? ul.children.length : -1, extra: sec.querySelectorAll('.fact, .badges, .uit').length, past: c.scrollHeight <= c.clientHeight + 1, knop: !!sec.querySelector('[data-primary]').offsetWidth }; });
  check(/^(level|over)$/.test(eind5.s) && /kg/.test(eind5.kg) && eind5.px >= 28 && eind5.rijen === 1 && eind5.regels >= 1 && eind5.regels <= 3 && eind5.extra === 0 && eind5.past && eind5.knop, 'F Korrelval, weegbon of game-over: de kilo\'s groot, hooguit drie regels, dan de knoppen (360x640 zonder scrollen)', eind5);
  await F.shot('F01-korrelval-eind');
  check(!F.fouten.length && !F.extern.length, 'F geen fouten, niets van buiten', F.fouten.slice(0, 3));
  F.stop(); await F.ctx.close();

  // ============================== G: ronde 6 (aantekeningen in plaats van ringen) ==============================
  // Om elk ding stond een gouden ring. Nu: een kleine oranje stip op het ding, een potloodlijntje en een naamkaartje in handschrift.
  const G = await maak(browser, { vp: { width: 360, height: 640 }, touch: true });
  const gp = G.page;
  await gp.goto('file://' + wrapped); await sleep(600);
  await gp.evaluate(() => localStorage.setItem('korrelval-b-v2', JSON.stringify({ introSeen: true, oxUitleg: 1 }))); await gp.reload(); await sleep(1000);
  const raakt = (A, B) => Math.min(A[0] + A[2], B[0] + B[2]) > Math.max(A[0], B[0]) && Math.min(A[1] + A[3], B[1] + B[3]) > Math.max(A[1], B[1]);
  const gMis = [], gRing = []; let gDingen = 0, gKaart = 0, gTik = null, gAf = null, gAdem = '', gVlug = 0;
  for (let j = 0; j < 6; j++) {
    await gp.evaluate(i => window.__korrelval.jaar(i, 'tijd'), j); await sleep(450);
    for (const sh of [0, 1]) {
      await G.tapSel('#bIntroNext'); await sleep(sh ? 450 : 300); if (sh) { await G.tapSel('#bIntroNext'); await sleep(300); }
      await stand(G); await sleep(900);
      const g = await gp.evaluate(() => { const o = window.__korrelval.ontdek(), L = document.getElementById('oxLaag'), r = e => { const q = e.getBoundingClientRect(); return [q.left, q.top, q.width, q.height].map(Math.round); };
        return { list: o.list, P: window.__korrelval.jaarState().picH, skip: r(document.getElementById('bIntroSkipTop')), namen: [...L.querySelectorAll('.ox-kaart')].map(e => e.textContent), lijnen: [...L.querySelectorAll('.ox-lijn path.p')].filter(e => (e.getAttribute('d') || '').length > 10).length,
          adem: getComputedStyle(L.querySelector('.ox-spot i')).animationName,
          ring: [...L.querySelectorAll('.ox-spot, .ox-spot i')].filter(e => { const c = getComputedStyle(e); return c.backgroundImage !== 'none' || (e.tagName === 'I' && parseFloat(c.width) > 16); }).length + L.querySelectorAll('.ox-ring, .ox-gloed').length }; });
      const naam = `${1846 + [0, 21, 74, 130, 162, 180][j]} shot ${sh + 1}`; gDingen += g.list.length; gAdem = gAdem || g.adem;
      if (g.ring) gRing.push(naam);
      if (g.namen.length !== g.list.length || g.namen.join('|') !== g.list.map(d => d.naam).join('|') || g.lijnen !== g.list.length) gMis.push(`${naam}: ${g.namen.length} kaartjes en ${g.lijnen} lijntjes voor ${g.list.length} dingen`);
      for (const d of g.list) { const c = d.kaart; if (!c) { gMis.push(`${naam} ${d.id}: geen kaartje`); continue; } gKaart++;
        if (c[0] < 2 || c[1] < 2 || c[0] + c[2] > 358 || c[1] + c[3] > g.P - 2) gMis.push(`${naam} ${d.id}: buiten beeld of over het paneel ${JSON.stringify(c)}`);
        if (raakt(c, g.skip)) gMis.push(`${naam} ${d.id}: over Overslaan`);
        for (const q of g.list) if (q !== d) { if (q.kaart && raakt(c, q.kaart)) gMis.push(`${naam} ${d.id}: over het kaartje van ${q.id}`); if (q.a && !/paard/.test(q.id) && raakt(c, [q.a[0] - 9, q.a[1] - 9, 18, 18])) gMis.push(`${naam} ${d.id}: over de stip van ${q.id}`); } }
      if (!j && !sh) { // een tik op het kaartje opent het ding; daarna houdt het een vinkje en een onderstreept kaartje
        const c = g.list[0].kaart, a0 = (await G.ox()).amb, t0 = Date.now(); await G.tap(c[0] + c[2] / 2, c[1] + c[3] / 2); await sleep(1000); const o1 = await G.ox(); gTik = o1.open;
        gVlug = +(o1.amb - a0 - (Date.now() - t0) / 1000).toFixed(2); // zoveel seconden liep het beeld extra door
        await G.tapSel('#oxTerug'); await sleep(700);
        gAf = await gp.evaluate(() => { const k = document.querySelectorAll('#oxLaag .ox-kaart')[0], s = document.querySelectorAll('#oxLaag .ox-spot')[0]; return { af: k.classList.contains('af'), streep: +(getComputedStyle(k.querySelector('b'), '::after').transform.match(/matrix\(([-\d.]+)/) || [0, 0])[1], vink: getComputedStyle(s, '::before').opacity, stip: getComputedStyle(s.querySelector('i')).opacity }; });
      }
    }
  }
  check(!gRing.length && !/oxPuls|--gw/.test(html), 'G geen ring-element meer: het tikvlak is leeg, de stip is 14 px, geen verloop om het ding', gRing);
  check(gDingen === 28 && gKaart === 28 && !gMis.some(m => /kaartjes en|geen kaartje/.test(m)), 'G per shot evenveel kaartjes en lijntjes als dingen, met de naam erop (12 shots, 28 dingen)', { dingen: gDingen, kaartjes: gKaart });
  check(!gMis.length, 'G 360x640: elk kaartje binnen beeld, boven het paneel, niet over een ander kaartje, een stip of Overslaan', gMis.slice(0, 6));
  check(gTik === 0, 'G een tik op het kaartje opent het ding', gTik);
  check(gVlug > 0.4, 'G het ding reageert zelf: na de tik loopt wat beweegt even sneller (de rosmolen: het paard stapt door)', gVlug);
  check(gAf && gAf.af && gAf.streep > 0.9 && gAf.vink === '1' && gAf.stip === '0', 'G ontdekt: een vinkje op het ding en een potloodstreep onder het kaartje', gAf);
  check(gAdem === 'oxStip, oxAdem', 'G de stip verschijnt en ademt daarna (alleen transform en opacity)', gAdem);
  check(!G.fouten.length && !G.extern.length && G.verboden.size === 0, 'G geen fouten, niets van buiten', G.fouten.slice(0, 3));
  G.stop(); await G.ctx.close();

  await browser.close();
  const fout = checks.filter(c => !c.ok).length;
  console.log(`\n${checks.length - fout} van ${checks.length} GOED${fout ? ', ' + fout + ' FOUT' : ''}. Beelden: ${out}`);
  fs.writeFileSync(path.join(out, 'uitslag.json'), JSON.stringify(checks, null, 1));
  process.exit(fout ? 1 : 0);
})().catch(e => { console.error('TESTFOUT', e); process.exit(2); });
function ph360(j) { return j.picH; }
