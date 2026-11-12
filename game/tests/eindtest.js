// =====================================================================================================
// Eindtest Molenvlucht (ontdekken in de jaarintro's, met de minigame Korrelval aan het eind): het hele pad van een nieuwe speler, en de randen.
//   A  400x800 touch (licht), lege opslag: titel > It giet oan! > hoofdintro (Verder, Terug in de tijd) > jaarintro 1846 shot 1 en 2 met
//      ontdekken (tik op het ding, de camera vliegt erheen (close-up, ronde 7), zin, Nieuw in je Molenboek, Terug, tik ernaast, knop in het paneel, Verder terwijl een ding open
//      staat) > verhaal 1846 > Volgende molen: 1867 > tijdsprong met de kaart Holwerd naar Leeuwarden (ronde 7; tik slaat over) > Overslaan > verhaal >
//      1920 (tijdsprong met de lijn met stippen, geen kaart) > 1976 (de kaart Vliet naar Nieuwe Kanaal, uitgekeken) > Menu > Kies een molen (alle jaren) > 2026 > slot >
//      de slotfilm (ronde 7: speelt, een tik slaat over, Bekijk de film opnieuw op de slotkaart en in het Molenboek) >
//      Molenboek (plakboek per jaar: plaatjes, lege kaders, Ga naar <jaar>, ook daar ontdekken, Terug naar het Molenboek) > Korrelval (kaart vooraf, It giet oan!, game-over, Nog een korrel?)
//   B  herladen: het ontdekte blijft (vinkjes, geen gloed, teller)
//   C  360x640 touch: titel past, paneel past, de dingen staan boven het paneel, tikvlak minstens 44 px
//   D  1280x800 toetsenbord: Enter, Esc, Tab, pijltjes langs de knoppen, Enter opent, Esc gaat terug, voorlezen (aria-live)
//   E  verminderde beweging: geen vlucht en geen pulseren; de close-up staat er meteen (overvloeier)
//   F  ronde 5, 360x640 met alles ontdekt: slotkaart, Kies een molen, plakboek-kaders, Scores, Instellingen, weegbon of game-over van Korrelval
//   G  ronde 6, 360x640, alle 12 shots: aantekeningen in plaats van ringen (stip, potloodlijntje, naamkaartje), een tik op het kaartje opent het ding
//      ronde 7 en 8: van alle 28 dingen de close-up (de camera komt aan, het beeld is opnieuw getekend, het ding staat in het midden, vinkje, Terug vliegt uit)
//   H  ronde 7, 400x800: de slotfilm helemaal uitgekeken (zes jaren op volgorde, stippen van wat je ontdekte, hooguit twee jaren in het geheugen, de slotregel, dan de slotkaart)
//   I  ronde 8, 1280x800: de kijkstand (Bekijk als film): de band met grote ondertitels, de volgorde, vanzelf door een jaar, pauze, volgende en vorige,
//      het verhaal als tussentitel, de eindkaart, stoppen; hij telt niets als ontdekt
//   J  ronde 8, 400x800 met verminderde beweging: ?film start meteen, veeg, het kruisje, ?film&lus begint opnieuw
//   K  ronde 8, 800x450 en 740x360 (liggend en laag, voor het iframe en een liggende telefoon): titel, 1846 met een close-up (het paneel als kolom
//      rechts), verhaal, tijdsprong met de kaart, Molenboek, slotfilm en slotkaart: de hoofdknop en de tekst staan binnen beeld; de draaimelding alleen in Korrelval
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
  const d0 = o.list[0]; await A.tap(d0.box[0] + d0.box[2] / 2, d0.box[1] + d0.box[3] / 2); await sleep(120);
  const oVlucht = await A.ox(); // onderweg: de camera vliegt (CSS-transform op het beeld)
  const cuAan = await A.tot(async () => { const q = (await A.ox()).cu; return q && q.fase === 'aan'; }, 2500); await sleep(450);
  o = await A.ox();
  const tekst = await page.textContent('#introText'), sr = await page.textContent('#sr'), kop = (await page.textContent('#introKicker')).trim();
  check(oVlucht.open === 0 && oVlucht.cu && oVlucht.cu.fase === 'in' && /scale\(/.test(oVlucht.zoom), 'tik op het ding: het gaat open en de camera vliegt erheen', { open: oVlucht.open, cu: oVlucht.cu, zoom: oVlucht.zoom });
  const zoomK = o.cu ? o.cu.z : 0;
  check(cuAan && o.cu && o.zoom === '' && o.cu.scherp && zoomK >= 1.5 && zoomK <= 3.2, 'close-up: de camera komt aan, het beeld is opnieuw getekend op 1,5x tot 3,2x (geen opgeschaald plaatje meer)', { cu: o.cu, zoom: o.zoom });
  const cuBeeld = await page.evaluate(() => ({ P: window.__korrelval.jaarState().picH, W: innerWidth, kaart: getComputedStyle(document.querySelector('#oxLaag .ox-kaart')).opacity, stip: getComputedStyle(document.querySelector('#oxLaag .ox-spot')).opacity, vink: (e => e ? getComputedStyle(e).opacity : null)(document.querySelector('#introKicker .ox-vink.aan')) }));
  check(o.cu && o.cu.midden && Math.abs(o.cu.midden[0] - cuBeeld.W / 2) < cuBeeld.W * 0.2 && Math.abs(o.cu.midden[1] - cuBeeld.P / 2) < cuBeeld.P * 0.2 && o.cu.vul >= 0.5, 'close-up: het ding staat midden in het beeld boven het paneel en vult er ruim de helft van', { midden: o.cu && o.cu.midden, vul: o.cu && o.cu.vul, P: cuBeeld.P });
  check(cuBeeld.kaart === '0' && cuBeeld.stip === '0' && cuBeeld.vink === '1', 'close-up: geen aantekeningen in beeld; het vinkje staat naast de naam als de camera er is', cuBeeld);
  check(kop === d0.naam && !tekst.startsWith(d0.naam) && /Nieuw in je Molenboek/.test(tekst), 'paneel: de naam in handschrift op de plek van het jaartal, één zin en Nieuw in je Molenboek', { kop, tekst });
  check(sr.includes(d0.naam) && sr.length > 20, 'de zin wordt voorgelezen (aria-live)', sr.slice(0, 80));
  check(await A.box('#oxTerug') && await page.evaluate(() => document.getElementById('oxLaag').classList.contains('open')), 'Terug staat er; een tik op het beeld is nu ook Terug');
  const p2 = await A.paneel(); check(p2.past && p2.top <= p1.top + 2, 'het paneel past nog en zakt niet als een ding open is (het mag naar boven groeien: de zin vervangt de ondertitel)', { voor: p1.top, na: p2.top });
  await A.shot('A03-1846-s1-open');
  await A.tapSel('#oxTerug'); await sleep(150); const oUit = await A.ox();
  const cuWeg = await A.tot(async () => !(await A.ox()).cu, 2500); await sleep(500);
  o = await A.ox();
  check(oUit.open === -1 && oUit.cu && oUit.cu.fase === 'uit' && /scale\(/.test(oUit.zoom), 'Terug: de camera vliegt weer uit', { cu: oUit.cu, zoom: oUit.zoom });
  check(cuWeg && o.open === -1 && o.zoom === '' && o.list[0].af && /^1 van 5 ontdekt$/.test(o.tel), 'na de terugvlucht: het gewone beeld, vinkje en 1 van 5 ontdekt', { open: o.open, zoom: o.zoom, tel: o.tel });
  check(await page.evaluate(() => getComputedStyle(document.querySelector('.ox-spot.af i')).opacity === '0'), 'een ontdekt ding heeft geen stip meer (wel een vinkje)');
  // de knop in het paneel, dan tik ernaast
  await A.tapSel('#oxKnoppen .ox-knop:nth-child(2)'); await sleep(650);
  o = await A.ox(); const open2 = o.open;
  await A.tap(20, 60); await sleep(1100); o = await A.ox();
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
  // tijdsprong van 1846 naar 1867 (ronde 7): de eerste verhuizing, dus de kaart Holwerd naar Leeuwarden in plaats van de lijn met stippen.
  // Het jaartal telt in handschrift door, de oranje stip reist over de gestippelde lijn; een tik slaat over
  const kaartStand = () => page.evaluate(() => { const s = window.__korrelval.sprong(), k = document.getElementById('spKaart'), zicht = e => !!e && !e.hidden && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().width > 0;
    const r = k.getBoundingClientRect(), g = document.getElementById('spRegel').getBoundingClientRect();
    return { ...s, kaartZicht: zicht(k) && !!k.querySelector('svg.krt .krt-route') && !!k.querySelector('.krt-nu'), namen: [...k.querySelectorAll('text')].map(t => t.textContent), lijnZicht: zicht(document.getElementById('spLijn')), binnen: r.left >= 0 && r.right <= innerWidth && r.top >= 0 && g.bottom <= innerHeight, hand: s.hand }; });
  await sleep(500); await A.tapSel('#bStory'); await sleep(1500);
  const sp1 = await kaartStand(); await A.shot('A06b-tijdsprong-kaart');
  await A.tap(200, 300); await sleep(200);
  jv = await A.jaar();
  check(sp1.open && sp1.van === '1846' && sp1.naar === '1867' && sp1.hand && +sp1.jaar > 1846 && +sp1.jaar < 1867 && sp1.stip > 0 && sp1.stip < 1 && sp1.t < 3.8 && jv.open && jv.year === 1867,
    'tijdsprong 1846 naar 1867: het jaartal (handschrift) telt door; een tik slaat over', { jaar: sp1.jaar, stip: sp1.stip, t: sp1.t, na: jv.year });
  check(sp1.kaart === 'Van Holwerd naar Leeuwarden' && sp1.kaartZicht && !sp1.lijnZicht && sp1.binnen && ['Waddenzee', 'Holwerd', 'Leeuwarden'].every(n => sp1.namen.includes(n)) && /^translate\(/.test(sp1.kaartStip) && sp1.kaartStip !== 'translate(229.0 59.0)' && sp1.kaartStip !== 'translate(97.0 151.0)',
    'de kaart bij 1846 naar 1867: Holwerd aan de Waddenzee en Leeuwarden, de stip is onderweg over de gestippelde lijn; geen lijn met zes stippen', { kaart: sp1.kaart, namen: sp1.namen, stip: sp1.kaartStip, lijn: sp1.lijnZicht, binnen: sp1.binnen });
  check(sp1.regel === 'In Holwerd konden grote schepen niet komen, in Leeuwarden wel.', 'de kaart: één regel met de reden uit het onderzoek', sp1.regel);
  check(jv.open && jv.year === 1867 && jv.from === 'tijd', 'Volgende molen: de jaarintro van 1867 (elke keer, niet alleen de eerste keer)', { year: jv.year, from: jv.from });
  await sleep(300); await A.tapSel('#bIntroSkipTop'); await sleep(600);
  check(await A.scr() === 'story' && (await page.textContent('#bStory')) === 'Volgende molen: 1920', 'Overslaan: het verhaal van 1867, dan Volgende molen: 1920');
  // van 1867 naar 1920 (geen verhuizing): de lijn met zes stippen zoals voorheen, geen kaart
  await sleep(500); await A.tapSel('#bStory'); await sleep(420);
  const sp2 = await kaartStand(); await A.shot('A06c-tijdsprong-lijn');
  await A.tap(200, 300); await sleep(200); jv = await A.jaar();
  check(sp2.open && !sp2.kaart && !sp2.kaartZicht && sp2.lijnZicht && sp2.regel === '' && sp2.van === '1867' && sp2.naar === '1920' && sp2.stippen === 6 && sp2.jaren.join() === '1846,1867,1920,1976,2008,2026' && +sp2.jaar > 1867 && +sp2.jaar < 1920 && sp2.stip > 1 && sp2.stip < 2 && sp2.t < 1.5 && jv.open && jv.year === 1920,
    'tijdsprong 1867 naar 1920: geen kaart maar de lijn met zes stippen, het jaartal telt door, de stip verspringt; een tik slaat over', { kaart: sp2.kaart, lijn: sp2.lijnZicht, jaar: sp2.jaar, stip: sp2.stip, na: jv.year });
  // van 1920 naar 1976: de tweede verhuizing, de kaart Vliet naar Nieuwe Kanaal; uitgekeken (circa 3,8 s)
  await sleep(300); await A.tapSel('#bIntroSkipTop'); await sleep(600); await sleep(500); await A.tapSel('#bStory'); const kT0 = Date.now(); await sleep(2900);
  const sp3 = await kaartStand(); await A.shot('A06d-tijdsprong-kaart2');
  const k76 = await A.tot(async () => (await A.jaar()).open && (await A.jaar()).year === 1976, 4000), kDuur = (Date.now() - kT0) / 1000;
  check(sp3.open && sp3.kaart === 'Van het Vliet naar het Nieuwe Kanaal' && sp3.kaartZicht && !sp3.lijnZicht && sp3.binnen && ['Leeuwarden', 'Noordvliet', 'Vliet', 'Nieuwe Kanaal', 'De Merodestraat'].every(n => sp3.namen.includes(n)) && sp3.kaartStip === 'translate(236.0 143.0)' && sp3.jaar === '1976',
    'de kaart bij 1920 naar 1976: het Vliet en het Nieuwe Kanaal in Leeuwarden; de stip is aangekomen aan De Merodestraat', { kaart: sp3.kaart, namen: sp3.namen, stip: sp3.kaartStip, jaar: sp3.jaar });
  check(sp3.regel === 'In 1976 staat de fabriek aan het Nieuwe Kanaal. Het oudste deel van de loskade daar stamde uit 1927.' && k76 && kDuur > 3.3 && kDuur < 6, 'de tweede kaart: alleen wat zeker is (geen reden verzonnen); na circa 3,8 s vanzelf door naar 1976', { regel: sp3.regel, duur: +kDuur.toFixed(1) });
  await sleep(300); await A.tapSel('#bIntroSkipTop'); await sleep(600);
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
  // ronde 7: eerst de slotfilm; een tik slaat hem over
  const fl1 = await page.evaluate(() => window.__korrelval.film());
  check(await A.scr() === 'film' && fl1.open && fl1.van === 'slot' && fl1.jaar === 1846, 'na het verhaal van 2026: eerst de slotfilm, die bij 1846 begint', fl1);
  await sleep(1500); const fl2 = await page.evaluate(() => window.__korrelval.film());
  check(fl2.open && fl2.t > fl1.t + 0.8 && fl2.frames > fl1.frames + 20 && fl2.levend <= 2 && fl2.tel === '1846' && !!(await A.box('#bFilmSkip')), 'de film speelt: de tijd loopt, het jaartal staat erbij, Overslaan staat erbij', fl2);
  await A.shot('A06c-slotfilm');
  await A.tap(200, 300); await sleep(500);
  check(await A.scr() === 'done' && (await page.evaluate(() => window.__korrelval.film())).klaar === 'overgeslagen', 'een tik slaat de film over: de slotkaart');
  const slot = await page.evaluate(() => ({ s: window.__korrelval.state().screen, note: document.getElementById('doneNote').textContent, knoppen: ['bDoneBook', 'bDoneNight', 'bDoneMenu'].map(i => !!document.getElementById(i).offsetWidth), bon: !!document.querySelector('#scrDone .bon'), kv: document.getElementById('bDoneNight').textContent, regel: document.querySelector('#scrDone .kv-regel').textContent }));
  check(slot.s === 'done' && /^Je ontdekte 3 van 28 dingen\.$/.test(slot.note) && slot.knoppen.every(Boolean) && !slot.bon && slot.kv === 'Speel Korrelval' && /Nu ben jij de korrel\./.test(slot.regel), 'slotkaart: Je ontdekte 3 van 28 dingen, met Speel Korrelval (en de regel ervoor), Molenboek en Menu (geen weegbon)', slot);
  const slotGa = await page.evaluate(() => [...document.querySelectorAll('#doneJaren .tl-ga')].map(b => { const r = b.getBoundingClientRect(), q = getComputedStyle(b, '::before'); return [b.dataset.jaar, Math.round(r.height - parseFloat(q.top) - parseFloat(q.bottom)), b.getAttribute('aria-label')]; }));
  check(slotGa.length === 6 && slotGa.every(g => g[1] >= 44 && /^Ga naar \d{4}: nog \d te ontdekken$/.test(g[2])) && await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('#doneNote b')).fontSize) >= 28), 'slotkaart: het getal groot in handschrift; elk jaar waar nog iets ligt is een knop naar dat jaar (tikvlak 44+)', slotGa.slice(0, 2));
  const slotPast = await page.evaluate(() => { const c = document.querySelector('#scrDone .card'); return c.scrollHeight <= c.clientHeight + 1; });
  check(slotPast, 'slotkaart past zonder scrollen', slotPast);
  await A.shot('A07-slot');
  // Bekijk de film opnieuw (slotkaart); een toets slaat over
  check(!!(await A.box('#bDoneFilm')) && (await page.textContent('#bDoneFilm')).trim() === 'Bekijk de film opnieuw', 'slotkaart: de knop Bekijk de film opnieuw');
  await A.tapSel('#bDoneFilm'); await sleep(900); const fl3 = await page.evaluate(() => window.__korrelval.film());
  await page.keyboard.press('Escape'); await sleep(500);
  check(fl3.open && fl3.van === 'done' && await A.scr() === 'done', 'Bekijk de film opnieuw speelt de film; een toets slaat over, terug op de slotkaart', { open: fl3.open, van: fl3.van });
  // Molenboek
  await A.tapSel('#bDoneBook'); await sleep(500);
  const boek = await page.evaluate(() => ({ s: window.__korrelval.state().screen, jaar46: (document.querySelector('.pb-jaar[data-jaar="0"]') || { textContent: '' }).textContent, dingen: document.querySelectorAll('.pb-kaart.vol').length, kijk: [...document.querySelectorAll('.jx-kijk')].map(b => b.dataset.jaar), acts: [...document.querySelectorAll('#bookThings .act, #bookMachines .act')].map(p => p.textContent.split(':')[0]) }));
  check(boek.s === 'boek' && boek.dingen >= 3 && /1846.*3 van 5.*Rosmolen/.test(boek.jaar46), 'Molenboek: de ontdekte dingen staan erin, bij hun jaar (1846, 3 van 5)', { dingen: boek.dingen });
  check(boek.kijk.includes('0'), 'Molenboek: Ga naar 1846 op het blad van 1846', boek.kijk);
  const plekken = await page.evaluate(() => [...document.querySelectorAll('#bookPlekken .pb-plek')].map(f => ({ leeg: f.classList.contains('leeg'), svg: !!f.querySelector('svg.krt .krt-route'), kop: (f.querySelector('figcaption b') || {}).textContent, tekst: (f.querySelector('figcaption span') || {}).textContent })));
  check(plekken.length === 2 && plekken.every(q => !q.leeg && q.svg) && plekken[0].kop === 'Van Holwerd naar Leeuwarden' && plekken[1].kop === 'Van het Vliet naar het Nieuwe Kanaal' && /grote schepen/.test(plekken[0].tekst) && /1927/.test(plekken[1].tekst),
    'Molenboek: het blad De plekken met de twee kaarten en hun regel', plekken.map(q => q.kop));
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
  await page.evaluate(() => document.getElementById('bBookFilm').scrollIntoView({ block: 'center' })); await sleep(450);
  const bf = !!(await A.box('#bBookFilm')); if (bf) { await A.tapSel('#bBookFilm'); await sleep(900); }
  const fl4 = await page.evaluate(() => window.__korrelval.film()); if (fl4.open) { await A.tapSel('#bFilmSkip'); await sleep(500); }
  check(bf && fl4.open && fl4.van === 'boek' && await A.scr() === 'boek', 'Molenboek: Bekijk de film opnieuw speelt de film; Overslaan brengt je terug in het Molenboek', { knop: bf, van: fl4.van });
  await sleep(450); await page.evaluate(() => { document.querySelector('#scrBoek .card').scrollTop = 1e6; }); await sleep(200); await A.tapSel('#bBookBack'); await sleep(400);
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
  await E.tapSel('#oxKnoppen .ox-knop:nth-child(1)'); await sleep(60); o = await E.ox();
  check(o.open === 0 && o.zoom === '' && o.cu && o.cu.fase === 'aan' && o.cu.z >= 1.5, 'E geen vlucht: de close-up staat er meteen (het beeld vloeit over)', { zoom: o.zoom, cu: o.cu });
  await sleep(500); await E.shot('E01-reduced-open');
  await E.tapSel('#oxTerug'); await sleep(60); o = await E.ox();
  check(o.open === -1 && o.zoom === '' && !o.cu, 'E Terug: meteen het gewone beeld', { zoom: o.zoom, cu: o.cu });
  await E.tapSel('#bIntroSkipTop'); await sleep(700); await E.tapSel('#bStory'); await sleep(500);
  const spE = await E.page.evaluate(() => window.__korrelval.sprong());
  check(spE.open && spE.kaart === 'Van Holwerd naar Leeuwarden' && spE.kaartStip === 'translate(97.0 151.0)' && spE.jaar === '1867', 'E de kaart staat stil: de stip staat al in Leeuwarden, het jaartal op 1867', { kaart: spE.kaart, stip: spE.kaartStip, jaar: spE.jaar });
  await E.tot(async () => (await E.jaar()).open && (await E.jaar()).year === 1867, 5000);
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
  await F.tapSel('#lvlChips .btn:nth-child(6)'); await sleep(500); await F.tapSel('#bIntroSkipTop'); await sleep(700); await F.tapSel('#bStory'); await sleep(900); await F.tapSel('#bFilmSkip'); await sleep(500); // ronde 7: de slotfilm overslaan
  const slot5 = await fp.evaluate(() => { const c = document.querySelector('#scrDone .card'), r = c.getBoundingClientRect(); return { s: window.__korrelval.state().screen, past: c.scrollHeight <= c.clientHeight + 1, binnen: [...document.querySelectorAll('#doneJaren li')].every(li => { const q = li.getBoundingClientRect(); return q.left >= r.left && q.right <= r.right + 0.5 && li.scrollWidth <= li.clientWidth + 1; }), n: document.querySelectorAll('#doneJaren li.af').length }; });
  check(slot5.s === 'done' && slot5.past && slot5.binnen && slot5.n === 6, 'F slotkaart (360 breed, alles ontdekt): zes jaren met vinkje, niets afgeknipt, geen scrollen', slot5);
  await F.tapSel('#bDoneBook'); await sleep(500); await F.tot(() => fp.evaluate(() => !document.querySelector('#scrBoek canvas[data-wacht]')), 40000);
  // ronde 8: het plaatje is de close-up van het ding (zelfde venster als in de jaarintro), niet meer een uitsnede van het eindbeeld
  const pbk = await fp.evaluate(() => window.__korrelval.plakboek()), kaders = pbk.kader || {}, pcu = pbk.cu || {}, pm = pbk.maat || [0, 0];
  const kMis = sleutels.filter(k => { const q = kaders[k], c = pcu[k]; return !(q && c && q[2] >= 150 && (c.t !== undefined || (Math.abs(c.midden[0] - pm[0] / 2) <= 2 && c.z >= 0.6 && c.z <= 3.2))); });
  check(!kMis.length && pbk.fotos >= 28 && !pbk.mis.length, 'F plakboek (ronde 8): elk van de 28 plaatjes is de close-up van het ding, met het ding in het midden', { mis: kMis.slice(0, 4), fotos: pbk.fotos });
  check(['o46-kamwiel', 'o46-rondsel', 'o20-plansichter'].every(k => pcu[k] && pcu[k].t !== undefined), 'F plakboek: kamwiel, rondsel en plansichter komen uit het moment in het shot waar ze groot in beeld zijn', [pcu['o46-kamwiel'], pcu['o20-plansichter']]);
  const pbBeeld = await fp.evaluate(() => [...document.querySelectorAll('#scrBoek .pb-kaart.vol canvas')].map(c => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, s = new Set(); for (let i = 0; i < d.length; i += 4 * 97) s.add((d[i] >> 4) + '|' + (d[i + 1] >> 4) + '|' + (d[i + 2] >> 4)); return s.size; }));
  check(pbBeeld.length === 28 && pbBeeld.every(n => n >= 6), 'F plakboek: in elk plaatje staat een beeld (geen leeg of egaal vlak)', pbBeeld);
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
  const gMis = [], gRing = [], hMis = []; let gDingen = 0, gKaart = 0, gTik = null, gAf = null, gAdem = '', gVlug = 0, hGoed = 0, hTijd = 0, hBuiten = 0;
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
        const c = g.list[0].kaart, a0 = (await G.ox()).amb, t0 = Date.now(); await G.tap(c[0] + c[2] / 2, c[1] + c[3] / 2); await sleep(1800); const o1 = await G.ox(); gTik = o1.open; // de eigen reactie begint als de camera aankomt (0,7 s) en duurt 0,9 s
        gVlug = +(o1.amb - a0 - (Date.now() - t0) / 1000).toFixed(2); // zoveel seconden liep het beeld extra door
        await G.tapSel('#oxTerug'); await sleep(1500);
        gAf = await gp.evaluate(() => { const k = document.querySelectorAll('#oxLaag .ox-kaart')[0], s = document.querySelectorAll('#oxLaag .ox-spot')[0]; return { af: k.classList.contains('af'), streep: +(getComputedStyle(k.querySelector('b'), '::after').transform.match(/matrix\(([-\d.]+)/) || [0, 0])[1], vink: getComputedStyle(s, '::before').opacity, stip: getComputedStyle(s.querySelector('i')).opacity }; });
      }
      // ronde 7: de close-up van elk ding (knop in het paneel): de camera komt aan, het beeld is opnieuw getekend, vinkje; Terug vliegt uit
      for (let n = 0; n < g.list.length; n++) {
        const id = g.list[n].id; await G.tapSel(`#oxKnoppen .ox-knop:nth-child(${n + 1})`);
        await sleep(110); const vl = await G.ox(); // ronde 8: kijkt de camera opzij, dan ligt tijdens de vlucht het eindbeeld van de close-up onder het beeld
        if (vl.cu && vl.cu.buiten) { hBuiten++; if (vl.cu.fase === 'in' && vl.onder < 1) hMis.push(`${id}: de camera kijkt opzij, maar onder het beeld ligt niets tijdens de vlucht`); }
        const aan = await G.tot(async () => { const q = (await G.ox()).cu; return q && q.fase === 'aan'; }, 3000); await sleep(350);
        const h = await gp.evaluate(() => { const o = window.__korrelval.ontdek(); return { cu: o.cu, zoom: o.zoom, open: o.open, onder: o.onder, kaart: getComputedStyle(document.querySelector('#oxLaag .ox-kaart')).opacity, vink: (e => e ? getComputedStyle(e).opacity : null)(document.querySelector('#introKicker .ox-vink.aan')) }; });
        const inTijd = h.cu && h.cu.t1 !== undefined; if (inTijd) hTijd++;
        if (!aan || !h.cu || h.open !== n || h.zoom !== '') hMis.push(`${id}: de camera komt niet aan ${JSON.stringify(h.cu)} ${h.zoom}`);
        else if (!inTijd && !(h.cu.z >= (id === 'o08-molengebouw' ? 0.6 : 1.2) && h.cu.z <= 3.2 && h.cu.scherp)) hMis.push(`${id}: niet opnieuw getekend of buiten 1,2x tot 3,2x ${JSON.stringify(h.cu)}`);
        else if (!inTijd && !(Math.abs(h.cu.midden[0] - 180) <= 2 && h.cu.midden[1] > 0 && h.cu.midden[1] < g.P)) hMis.push(`${id}: het ding staat niet in het midden ${JSON.stringify(h.cu.midden)}`); // ronde 8: de camera kijkt opzij als het ding aan de rand staat
        else if (h.onder !== 0) hMis.push(`${id}: na aankomst ligt er nog iets onder het beeld`);
        else if (id === 'o08-molengebouw' && !(h.cu.z < 1)) hMis.push(`${id}: de camera gaat niet achteruit ${h.cu.z}`);
        else if (h.kaart !== '0' || h.vink !== '1') hMis.push(`${id}: aantekeningen nog in beeld of geen vinkje ${h.kaart} ${h.vink}`);
        else hGoed++;
        await G.tapSel('#oxTerug'); const weg = await G.tot(async () => !(await G.ox()).cu, 3000); await sleep(320);
        const na = await gp.evaluate(() => ({ zoom: window.__korrelval.ontdek().zoom, kaart: getComputedStyle(document.querySelector('#oxLaag .ox-kaart')).opacity }));
        if (!weg || na.zoom !== '' || +na.kaart < 0.7) hMis.push(`${id}: Terug vliegt niet uit ${JSON.stringify(na)}`);
      }
    }
  }
  check(hGoed === 28 && !hMis.length, 'G ronde 7 en 8: alle 28 close-ups: de camera komt aan, het beeld is opnieuw getekend, het ding staat in het midden, geen aantekeningen, vinkje naast de naam; Terug vliegt uit', { goed: hGoed, mis: hMis.slice(0, 5) });
  check(hTijd === 3, 'G ronde 8: kamwiel en rondsel van 1846 en de plansichter van 1920 zijn close-ups in de tijd (de camera vliegt terug in het shot)', hTijd);
  check(hBuiten >= 4, 'G ronde 8: bij dingen aan de rand kijkt de camera opzij (het venster valt buiten het beeld; tijdens de vlucht ligt het eindbeeld eronder)', hBuiten);
  check(!gRing.length && !/oxPuls|--gw/.test(html), 'G geen ring-element meer: het tikvlak is leeg, de stip is 14 px, geen verloop om het ding', gRing);
  check(gDingen === 28 && gKaart === 28 && !gMis.some(m => /kaartjes en|geen kaartje/.test(m)), 'G per shot evenveel kaartjes en lijntjes als dingen, met de naam erop (12 shots, 28 dingen)', { dingen: gDingen, kaartjes: gKaart });
  check(!gMis.length, 'G 360x640: elk kaartje binnen beeld, boven het paneel, niet over een ander kaartje, een stip of Overslaan', gMis.slice(0, 6));
  check(gTik === 0, 'G een tik op het kaartje opent het ding', gTik);
  check(gVlug > 0.4, 'G het ding reageert zelf: na de tik loopt wat beweegt even sneller (de rosmolen: het paard stapt door)', gVlug);
  check(gAf && gAf.af && gAf.streep > 0.9 && gAf.vink === '1' && gAf.stip === '0', 'G ontdekt: een vinkje op het ding en een potloodstreep onder het kaartje', gAf);
  check(gAdem === 'oxStip, oxAdem', 'G de stip verschijnt en ademt daarna (alleen transform en opacity)', gAdem);
  check(!G.fouten.length && !G.extern.length && G.verboden.size === 0, 'G geen fouten, niets van buiten', G.fouten.slice(0, 3));
  G.stop(); await G.ctx.close();

  // ============================== H: de slotfilm helemaal (ronde 7) ==============================
  const H = await maak(browser, { vp: { width: 400, height: 800 }, touch: true, dpr: 2 }); const hp = H.page;
  await hp.addInitScript(k => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify({ introSeen: true, oxUitleg: 1, ontdekt: { 'o46-rosmolen': 1, 'o67-schoorsteen': 1, 'o20-zeilschip': 1, 'o76-silos': 1, 'o08-schip': 1, 'o26-walsenstoel': 1, 'o26-walsen': 1 } })); } catch (e) { /* zonder opslag */ } }, /SAVE_KEY = '([^']+)'/.exec(html)[1]);
  await hp.goto('file://' + wrapped); await sleep(1300);
  await hp.evaluate(() => window.__korrelval.filmStart('done')); const hT0 = Date.now(), hSt = [];
  while (Date.now() - hT0 < 32000) { const f = await hp.evaluate(() => ({ f: window.__korrelval.film(), regel: getComputedStyle(document.getElementById('sfSlot')).opacity })); if (!f.f.open) break; hSt.push(f); if (hSt.length === 9) await H.shot('H01-slotfilm'); await sleep(300); }
  const hEind = await hp.evaluate(() => ({ f: window.__korrelval.film(), s: window.__korrelval.state().screen })), hDuur = (Date.now() - hT0) / 1000;
  const hJaren = [...new Set(hSt.map(q => q.f.jaar).filter(Boolean))], hStip = hSt.filter(q => q.f.stipAan && q.f.stippen > 0).map(q => q.f.jaar), hLaatste = hSt[hSt.length - 1] || { f: {}, regel: '0' };
  check(hJaren.join(' ') === '1846 1867 1920 1976 2008 2026' && hDuur > 17 && hDuur < 27, 'H de slotfilm speelt de zes jaren op volgorde in circa 20 s', { jaren: hJaren, duur: +hDuur.toFixed(1) });
  check(new Set(hStip).size >= 5, 'H wat je buiten ontdekte, licht op als oranje stip (in elk jaar waar je iets vond)', [...new Set(hStip)]);
  check(hSt.every(q => q.f.levend <= 2) && hEind.f.gebouwd === 6 && hEind.f.vrij === 6 && hEind.f.piek > 0 && hEind.f.piek < 150, 'H hooguit twee jaren tegelijk in het geheugen; alle zes na afloop vrijgegeven', { piekMB: hEind.f.piek, gebouwd: hEind.f.gebouwd, vrij: hEind.f.vrij });
  check(hLaatste.f.slot && +hLaatste.regel > 0.9 && /180 jaar malen\./.test(await hp.textContent('#sfSlot')) && /Van één paard tot Molen B\./.test(await hp.textContent('#sfSlot')), 'H het eindigt op 2026 met de regel 180 jaar malen. Van één paard tot Molen B.', { slot: hLaatste.f.slot, regel: hLaatste.regel });
  check(hEind.s === 'done' && hEind.f.klaar === 'uit' && hEind.f.gezien, 'H daarna de slotkaart', hEind.s);
  check(!H.fouten.length && !H.extern.length, 'H geen fouten, niets van buiten', H.fouten.slice(0, 3));
  H.stop(); await H.ctx.close();

  { // I en J in een eigen blok (eigen namen)
  // ============================== I: de kijkstand (ronde 8) ==============================
  // 1280x800, muis en toetsenbord: de knop op de titel, de band met grote ondertitels, de volgorde, vanzelf van shot naar ding, pauze,
  // volgende en vorige, de bediening die verdwijnt, het verhaal als tussentitel, de kaart, het volgende jaar, de eindkaart, stoppen,
  // en de voortgang die niet verandert.
  const I = await maak(browser, { vp: { width: 1280, height: 800 } }); const ip = I.page;
  await ip.goto('file://' + wrapped); await sleep(500);
  await ip.evaluate(() => localStorage.setItem('korrelval-b-v2', JSON.stringify({ introSeen: true, oxUitleg: 1, ontdekt: { 'o46-paard': 1 }, book: { 'o46-paard': 1 } }))); await ip.reload(); await sleep(1200);
  const iSave = await ip.evaluate(() => localStorage.getItem('korrelval-b-v2')), kj = () => ip.evaluate(() => window.__korrelval.kijk());
  const iKnop = await ip.evaluate(() => ({ tekst: document.getElementById('bKijk').textContent, min: Math.round(window.__korrelval.kijk().duur / 60), duur: window.__korrelval.kijk().duur }));
  check(/^Bekijk als film/.test(iKnop.tekst) && iKnop.tekst.includes(`alles vanzelf, circa ${iKnop.min} minuten`) && iKnop.min >= 6 && iKnop.min <= 9, 'I titel: de knop Bekijk als film, met de duur uit de lijst van stappen', iKnop);
  await ip.click('#bKijk'); await sleep(1200);
  let k = await kj(); const idx = naam => k.stappen.indexOf(naam), vol = k.stappen.join(' ');
  check(k.on && k.stap.k === 'intro' && k.scherm === 'intro', 'I de kijkstand start met de hoofdintro', k.stap);
  check(/^intro\.0 intro\.1 intro\.2 duik sprong shot0\.0 ding0\.0\.0 ding0\.0\.1 shot0\.1 ding0\.1\.0 ding0\.1\.1 ding0\.1\.2 verhaal0 sprong shot1\.0/.test(vol) && /verhaal5 film eind$/.test(vol) && k.stappen.filter(s => /^ding/.test(s)).length === 28,
    'I volgorde: hoofdintro; per jaar shot 1 en zijn dingen, shot 2 en zijn dingen, het verhaal, de tijdsprong; na 2026 de slotfilm en de eindkaart (28 dingen)', k.n);
  const iBand = await ip.evaluate(() => { const p = document.getElementById('introPanel').getBoundingClientRect(), t = getComputedStyle(document.getElementById('introText')), zicht = s => { const e = document.querySelector(s); return !!e && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().width > 0; };
    return { breed: p.left <= 1 && p.right >= innerWidth - 1 && p.bottom >= innerHeight - 1, px: parseFloat(t.fontSize), donker: getComputedStyle(document.getElementById('introPanel')).backgroundColor, knoppen: ['#bIntroNext', '#bIntroSkipTop', '#oxRij', '#introDots'].filter(zicht), bediening: zicht('#kjKnoppen'), stippen: document.querySelectorAll('#kjStippen i').length }; });
  check(iBand.breed && iBand.px >= 22 && iBand.donker === 'rgb(29, 30, 31)' && !iBand.knoppen.length && iBand.bediening && iBand.stippen === 6, 'I ondertitels van minstens 22 px op een donkere band over de hele breedte, zonder knoppen; voortgangslijn met zes stippen', iBand);
  await ip.evaluate(i => window.__korrelval.kijkNaar(i), idx('shot0.0')); await sleep(500);
  const iT1 = Date.now(), naarDing = await I.tot(async () => (await kj()).i === idx('ding0.0.0'), 17000), dShot = (Date.now() - iT1) / 1000; await sleep(1600);
  const iDing = await ip.evaluate(() => { const o = window.__korrelval.ontdek(), kop = document.querySelector('#introKicker .ox-kop'); return { cu: o.cu && o.cu.fase, naam: kop && kop.textContent, hand: !!kop && getComputedStyle(kop).fontFamily.includes('Belle'), zin: document.getElementById('introText').textContent, tag: !!document.querySelector('#introText .tag-new'), kaartjes: getComputedStyle(document.getElementById('oxLaag')).display, ontdekt: o.ontdekt }; });
  check(naarDing && dShot >= 7 && iDing.cu === 'aan' && iDing.naam === 'Rosmolen' && iDing.hand && /^Een rosmolen heeft geen wieken/.test(iDing.zin) && !iDing.tag && iDing.kaartjes === 'none',
    'I na shot 1 (camera stil, ondertitel gelezen) vliegt de camera vanzelf naar het eerste ding: naam in handschrift, zin als ondertitel, geen kaartjes en geen Nieuw in je Molenboek', { s: +dShot.toFixed(1), naam: iDing.naam, cu: iDing.cu });
  check(JSON.stringify(iDing.ontdekt) === '["o46-paard"]', 'I de kijkstand telt niets als ontdekt', iDing.ontdekt);
  await ip.keyboard.press(' '); await sleep(300); const p1 = await kj(), a1 = (await I.ox()).amb; await sleep(1400); const p2 = await kj(), a2 = (await I.ox()).amb;
  check(p1.pauze && p2.pauze && p2.t === p1.t && p2.i === p1.i && a2 === a1, 'I spatie: pauze (de tijd van de stap en het beeld staan stil)', [p1.t, p2.t, a1, a2]);
  await ip.keyboard.press(' '); await sleep(700); const p3 = await kj(), a3 = (await I.ox()).amb;
  check(!p3.pauze && p3.t > p2.t && a3 > a2, 'I spatie nog eens: verder', [p3.t, a3]);
  await ip.mouse.click(400, 300); await sleep(300); const p4 = await kj(); await ip.mouse.click(400, 300); await sleep(300); const p5 = await kj();
  check(p4.pauze && !p5.pauze && p5.i === p3.i, 'I een tik op het beeld: pauze en verder (geen Verder, geen Terug)', [p4.pauze, p5.pauze]);
  await ip.keyboard.press('ArrowRight'); await sleep(1000); const v1 = await kj(); await ip.keyboard.press('ArrowLeft'); await sleep(1000); const v2 = await kj();
  check(v1.i === idx('ding0.0.1') && v2.i === idx('ding0.0.0'), 'I pijltje rechts: volgende; pijltje links: vorige', [v1.i, v2.i]);
  await ip.mouse.move(300, 300); await ip.mouse.move(320, 310); await sleep(300); const r1 = (await kj()).rust; await sleep(3700);
  const r2 = await ip.evaluate(() => ({ rust: window.__korrelval.kijk().rust, dek: getComputedStyle(document.getElementById('kjKnoppen')).opacity }));
  check(!r1 && r2.rust && r2.dek === '0', 'I de bediening is klein en verdwijnt na 3 s zonder beweging', [r1, r2]);
  await ip.evaluate(i => window.__korrelval.kijkNaar(i), idx('ding0.1.2'));
  const naarVerhaal = await I.tot(async () => (await kj()).i === idx('verhaal0'), 17000); await sleep(1600);
  const iTus = await ip.evaluate(() => ({ s: window.__korrelval.state().screen, kop: document.getElementById('kjKop').textContent, lead: document.getElementById('kjLead').textContent, zicht: !document.getElementById('kjTussen').hidden }));
  check(naarVerhaal && iTus.s === 'kijk' && iTus.zicht && iTus.kop === 'Een molen vlak voor de bruiloft' && /^Uilke leende het geld[^.]*Bierma\.$/.test(iTus.lead), 'I het verhaal als tussentitel: alleen de titel en de eerste zin', iTus);
  const naarSprong = await I.tot(async () => (await kj()).stap.k === 'sprong', 9000); await sleep(900); const iSp = await ip.evaluate(() => window.__korrelval.sprong());
  const naar67 = await I.tot(async () => { const q = await kj(); return q.i === idx('shot1.0') && q.scherm === 'intro'; }, 15000); await sleep(600);
  check(naarSprong && /Holwerd naar Leeuwarden/.test(iSp.kaart) && naar67 && (await I.jaar()).year === 1867, 'I daarna vanzelf de kaart van de verhuizing en het volgende jaar (1867)', { kaart: iSp.kaart });
  await ip.evaluate(() => window.__korrelval.kijkNaar(window.__korrelval.kijk().n - 1)); await sleep(1000);
  const iE = await ip.evaluate(() => { const c = document.getElementById('kjEind'), r = c.getBoundingClientRect(); return { zicht: !c.hidden, kop: c.querySelector('h2').textContent, knoppen: [...c.querySelectorAll('button')].map(b => b.textContent), binnen: r.top >= 0 && r.bottom <= innerHeight }; });
  check(iE.zicht && iE.kop === 'Dat was 180 jaar Koopmans' && iE.knoppen.join('|') === 'Speel zelf|Nog een keer' && iE.binnen, 'I de eindkaart: Dat was 180 jaar Koopmans, met Speel zelf en Nog een keer', iE);
  await I.shot('I-eindkaart');
  await ip.click('#bKijkWeer'); await sleep(1000); const iW = await kj();
  check(iW.on && iW.i === 0 && iW.stap.k === 'intro' && iW.scherm === 'intro', 'I Nog een keer: de film begint opnieuw', iW.i);
  await ip.keyboard.press('Escape'); await sleep(800);
  const iNa = await ip.evaluate(() => ({ s: window.__korrelval.state().screen, on: window.__korrelval.kijk().on, save: localStorage.getItem('korrelval-b-v2'), klas: document.getElementById('app').classList.contains('kijk'), laag: document.getElementById('kijkLaag').hidden, voort: document.getElementById('titleVoort').textContent }));
  check(iNa.s === 'title' && !iNa.on && !iNa.klas && iNa.laag, 'I Esc: stoppen, terug op het titelscherm', iNa.s);
  check(iNa.save === iSave && /1 van 28/.test(iNa.voort), 'I de kijkstand veranderde de voortgang niet (opslag gelijk, nog steeds 1 van 28)', iNa.voort);
  check(!I.fouten.length && !I.extern.length && !I.verboden.size, 'I geen fouten, niets van buiten, nooit het valspel', I.fouten.slice(0, 3));
  I.stop(); await I.ctx.close();

  // ============================== J: ?film en ?film&lus, 400x800 touch, verminderde beweging ==============================
  const J = await maak(browser, { vp: { width: 400, height: 800 }, touch: true, dpr: 2, reduced: true }); const jp = J.page, kjJ = () => jp.evaluate(() => window.__korrelval.kijk());
  await jp.goto('file://' + wrapped + '?film'); await sleep(2200);
  let kq = await kjJ(); const jdx = naam => kq.stappen.indexOf(naam);
  check(kq.on && kq.stap.k === 'intro' && !kq.lus, 'J ?film in de adresbalk: de kijkstand start meteen', kq.stap);
  check(Math.abs(kq.duur - iKnop.duur) < 1.5 && kq.kf >= 17, 'J verminderde beweging: hetzelfde tempo (de duur is gelijk, op de duik na)', [kq.duur, iKnop.duur]);
  await jp.evaluate(i => window.__korrelval.kijkNaar(i), jdx('ding1.0.0')); await sleep(900);
  const jD = await jp.evaluate(() => { const o = window.__korrelval.ontdek(); return { cu: o.cu && o.cu.fase, zoom: o.zoom, lus: window.__korrelval.jaarState().loop, naam: (document.querySelector('#introKicker .ox-kop') || {}).textContent }; });
  check(jD.cu === 'aan' && jD.zoom === '' && !jD.lus && jD.naam === 'Schoorsteen', 'J verminderde beweging: geen vlucht en geen lus, de close-up staat er (overvloeier)', jD);
  const veeg = (x0, x1) => jp.evaluate(([a, b]) => { const L = document.getElementById('kijkLaag'), ev = (t, x) => L.dispatchEvent(new PointerEvent(t, { bubbles: true, pointerId: 7, pointerType: 'touch', clientX: x, clientY: 300 })); ev('pointerdown', a); ev('pointermove', (a + b) / 2); ev('pointerup', b); }, [x0, x1]);
  await veeg(320, 90); await sleep(700); const j1 = await kjJ(); await veeg(90, 320); await sleep(700); const j2 = await kjJ();
  check(j1.i === jdx('ding1.0.1') && j2.i === jdx('ding1.0.0'), 'J veeg naar links: volgende; veeg naar rechts: vorige', [j1.i, j2.i]);
  const jT = Date.now(), jDoor = await J.tot(async () => (await kjJ()).i === jdx('ding1.0.1'), 14000), jS = (Date.now() - jT) / 1000;
  check(jDoor && jS >= 3, 'J ook bij verminderde beweging loopt hij vanzelf door, na de leestijd', +jS.toFixed(1));
  await J.tap(200, 300); await sleep(300); const j3 = await kjJ(); await J.tapSel('#bKjPauze'); await sleep(300); const j4 = await kjJ();
  check(j3.pauze && !j4.pauze, 'J tik: pauze; de knop in de bediening: verder', [j3.pauze, j4.pauze]);
  await J.tapSel('#bKjStop'); await sleep(800);
  check(await J.scr() === 'title' && !(await kjJ()).on, 'J het kruisje: stoppen, terug op het titelscherm');
  await jp.goto('file://' + wrapped + '?film&lus'); await sleep(2200); kq = await kjJ();
  await jp.evaluate(() => window.__korrelval.kijkNaar(window.__korrelval.kijk().n - 1)); await sleep(800); const jE = await kjJ();
  const jLus = await J.tot(async () => { const q = await kjJ(); return q.on && q.i === 0 && q.stap.k === 'intro'; }, 16000);
  check(kq.on && kq.lus && jE.stap.k === 'eind' && jLus, 'J ?film&lus: na de eindkaart begint de film vanzelf opnieuw', { lus: kq.lus, opnieuw: jLus });
  await jp.goto('file://' + wrapped); await sleep(1500);
  check(await J.scr() === 'title' && !(await kjJ()).on, 'J zonder ?film start het spel gewoon op het titelscherm');
  check(!J.fouten.length && !J.extern.length && !J.verboden.size, 'J geen fouten, niets van buiten', J.fouten.slice(0, 3));
  J.stop(); await J.ctx.close();
  }

  // ============================== K: liggend en laag (ronde 8) ==============================
  // 800x450 en 740x360 (touch, een liggende telefoon of een laag iframe): titel, 1846 shot 1 met een close-up, verhaal, tijdsprong met
  // de kaart, Molenboek en slotkaart. De hoofdknop en de tekst staan binnen beeld; het paneel staat als kolom rechts naast het beeld;
  // de draaimelding komt alleen bij Korrelval.
  for (const [kw, kh] of (process.env.KV_LIG ? process.env.KV_LIG.split(',').map(q => q.split('x').map(Number)) : [[800, 450], [740, 360]])) { // KV_LIG=960x540,640x360: andere liggende formaten nalopen
    const K = await maak(browser, { vp: { width: kw, height: kh }, touch: true, dpr: 2 }); const kp = K.page, nm = `K ${kw}x${kh}`;
    await kp.goto('file://' + wrapped); await sleep(500);
    await kp.evaluate(ks => { const o = {}, b = {}; for (const k of ks) { o[k] = 1; b[k] = 1; } delete o['o46-zakken']; localStorage.setItem('korrelval-b-v2', JSON.stringify({ introSeen: true, ontdekt: o, book: b, oxUitleg: 1 })); }, [...html.matchAll(/\{ id: "(o\d\d-[a-z]+)", naam:/g)].map(m => m[1]));
    await kp.reload(); await sleep(1300);
    // binnen beeld: de kaart, de hoofdknop en alle zichtbare tekst en knoppen; scrol: de kaart mag in zichzelf scrollen (Molenboek)
    const past = (sel, scrol) => kp.evaluate(([sel, scrol]) => {
      const sc = document.querySelector(sel), card = sc.querySelector('.card') || sc, r = card.getBoundingClientRect(), W = innerWidth, H = innerHeight, uit = [];
      const b = sc.querySelector('[data-primary]'), br = b ? b.getBoundingClientRect() : null;
      if (!(r.left >= -0.5 && r.right <= W + 0.5 && r.top >= -0.5 && r.bottom <= H + 0.5)) uit.push('kaart buiten beeld');
      if (!scrol && card.scrollHeight > card.clientHeight + 1) uit.push('kaart scrolt ' + card.scrollHeight + '>' + card.clientHeight);
      if (!br || !(br.width > 0 && br.left >= -0.5 && br.right <= W + 0.5 && br.top >= -0.5 && br.bottom <= H + 0.5)) uit.push('hoofdknop buiten beeld');
      if (!scrol) for (const e of card.querySelectorAll('h1,h2,p,li,button,figcaption')) { const q = e.getBoundingClientRect(); if (!q.width || !q.height || getComputedStyle(e).visibility === 'hidden' || e.closest('.sr')) continue; if (e.classList.contains('sr')) continue;
        if (q.left < r.left - 1 || q.right > r.right + 1 || q.top < r.top - 1 || q.bottom > r.bottom + 1) uit.push((e.id || e.className || e.tagName) + ' steekt uit'); }
      return { ok: !uit.length, uit: uit.slice(0, 4), lig: document.getElementById('app').classList.contains('lig'), draai: !document.getElementById('rotate').hidden, knop: b ? b.textContent.trim().slice(0, 30) : '' };
    }, [sel, !!scrol]);
    const t1 = await past('#scrTitle');
    check(t1.ok && t1.lig && !t1.draai && await kp.evaluate(() => { const b = document.getElementById('bKijk').getBoundingClientRect(); return b.width > 0 && b.bottom <= innerHeight; }), `${nm} titel: alles binnen beeld zonder scrollen, It giet oan! en Bekijk als film te zien, geen draaimelding`, t1);
    await K.shot(`K-${kw}-titel`);
    await K.tapSel('#bPick'); await sleep(700); const t2 = await past('#scrPick'); check(t2.ok, `${nm} Kies een molen: zes jaren en Terug binnen beeld`, t2);
    await K.tapSel('#lvlChips .btn:nth-child(1)'); await sleep(600); await stand(K); await sleep(500);
    const j1 = await kp.evaluate(() => { const p = document.getElementById('introPanel').getBoundingClientRect(), c = document.getElementById('introCv').getBoundingClientRect(), b = document.getElementById('bIntroNext').getBoundingClientRect(), t = document.getElementById('introText').getBoundingClientRect(), o = window.__korrelval.ontdek(), s = window.__korrelval.jaarState(), sk = document.getElementById('bIntroSkipTop').getBoundingClientRect();
      return { pw: Math.round(p.width), rechts: p.right >= innerWidth - 1 && p.top <= 1 && p.bottom >= innerHeight - 1, beeld: [Math.round(c.left), Math.round(c.width), Math.round(c.height)], naast: Math.abs(c.right - p.left) <= 1.5, knop: b.width > 0 && b.left >= p.left && b.right <= innerWidth && b.bottom <= innerHeight && b.top >= 0, tekst: t.height > 0 && t.left >= p.left && t.right <= innerWidth && t.bottom <= b.top + 1,
        scrolt: document.getElementById('introPanel').scrollHeight > document.getElementById('introPanel').clientHeight + 1, picH: s.picH, skip: sk.right <= innerWidth && sk.top >= 0,
        dingen: o.list.map(d => ({ id: d.id, a: d.a, kaart: d.kaart })), draai: !document.getElementById('rotate').hidden }; });
    check(j1.rechts && j1.naast && j1.pw >= 300 && j1.pw <= 340 && j1.beeld[0] === 0 && j1.beeld[2] === kh && j1.picH === kh, `${nm} jaarintro 1846: het beeld links over de volle hoogte, het paneel als kolom rechts (300 tot 340 px)`, { pw: j1.pw, beeld: j1.beeld });
    check(j1.knop && j1.tekst && !j1.scrolt && j1.skip && !j1.draai, `${nm} jaarintro: de ondertitel, de knoppen en Verder staan in de kolom binnen beeld, zonder scrollen; geen draaimelding`, { knop: j1.knop, tekst: j1.tekst, scrolt: j1.scrolt });
    const jIn = j1.dingen.every(d => d.a && d.a[0] > 12 && d.a[0] < j1.beeld[1] - 12 && d.a[1] > 12 && d.a[1] < kh - 12 && d.kaart && d.kaart[0] >= 0 && d.kaart[0] + d.kaart[2] <= j1.beeld[1] + 1 && d.kaart[1] >= 0 && d.kaart[1] + d.kaart[3] <= kh + 1);
    check(j1.dingen.length === 2 && jIn, `${nm} de dingen en hun kaartjes staan binnen het beeld (niet onder het paneel)`, j1.dingen.map(d => [d.id, d.a && d.a.slice(0, 2), d.kaart]));
    await K.shot(`K-${kw}-1846`);
    await K.tapSel('#oxKnoppen .ox-knop:nth-child(2)'); await K.tot(async () => { const q = (await K.ox()).cu; return q && q.fase === 'aan'; }, 3000); await sleep(450);
    const c1 = await kp.evaluate(() => { const o = window.__korrelval.ontdek(), p = document.getElementById('introPanel').getBoundingClientRect(), t = document.getElementById('introText').getBoundingClientRect(), b = document.getElementById('bIntroNext').getBoundingClientRect(), tb = document.getElementById('oxTerug').getBoundingClientRect(), kop = document.querySelector('#introKicker .ox-kop').getBoundingClientRect();
      return { cu: o.cu, bw: document.getElementById('introCv').getBoundingClientRect().width, tekst: t.left >= p.left && t.right <= innerWidth && t.bottom <= b.top + 1 && t.height > 20, terug: tb.width > 0 && tb.right <= innerWidth + 0.5 && tb.top >= 0, kop: kop.left >= p.left && kop.right <= innerWidth && kop.top >= 0, knop: b.bottom <= innerHeight, ontdekt: o.ontdekt.includes('o46-zakken') }; });
    check(c1.cu && c1.cu.fase === 'aan' && c1.cu.scherp && Math.abs(c1.cu.midden[0] - c1.bw / 2) <= 2 && c1.cu.midden[1] > kh * 0.25 && c1.cu.midden[1] < kh * 0.75, `${nm} close-up (Zakken): scherp, het ding midden in het beeld links`, c1.cu);
    check(c1.tekst && c1.terug && c1.kop && c1.knop && c1.ontdekt, `${nm} close-up: naam, zin, Terug en Verder staan in de kolom binnen beeld`, { tekst: c1.tekst, terug: c1.terug, kop: c1.kop });
    await K.shot(`K-${kw}-closeup`);
    await K.tapSel('#oxTerug'); await K.tot(async () => !(await K.ox()).cu, 3000); await sleep(300);
    await K.tapSel('#bIntroNext'); await sleep(500); await stand(K); await sleep(300);
    const j2 = await kp.evaluate(() => { const o = window.__korrelval.ontdek(), bw = document.getElementById('introCv').getBoundingClientRect().width, p = document.getElementById('introPanel'); return { in: o.list.filter(d => d.a && d.a[0] > 8 && d.a[0] < bw - 8 && d.a[1] > 8 && d.a[1] < innerHeight - 8).length, n: o.list.length, scrolt: p.scrollHeight > p.clientHeight + 1 }; });
    check(j2.n === 3 && j2.in === 3 && !j2.scrolt, `${nm} 1846 binnen: de drie dingen staan in beeld, het paneel past`, j2);
    await K.tapSel('#bIntroNext'); await sleep(900);
    const v1 = await past('#scrStory'); check(await K.scr() === 'story' && v1.ok && /Volgende molen: 1867/.test(v1.knop), `${nm} verhaal: titel, tekst en Volgende molen binnen beeld zonder scrollen`, v1);
    await K.shot(`K-${kw}-verhaal`);
    await K.tot(() => kp.evaluate(() => !document.getElementById('bStory').hasAttribute('aria-disabled')), 3000); await K.tapSel('#bStory'); await sleep(1500);
    const s1 = await kp.evaluate(() => { const st = window.__korrelval.sprong(), bin = s => { const e = document.querySelector(s), r = e.getBoundingClientRect(); return r.width > 0 && r.left >= 0 && r.right <= innerWidth + 0.5 && r.top >= 0 && r.bottom <= innerHeight + 0.5; }, a = document.querySelector('#spKaart').getBoundingClientRect(), b = document.querySelector('#spRegel').getBoundingClientRect(), c = document.querySelector('#spJaar').getBoundingClientRect();
      return { open: st.open, kaart: st.kaart, binnen: bin('#spKaart') && bin('#spJaar') && bin('#spRegel'), los: a.right <= b.left + 1 || a.bottom <= b.top + 1, losJaar: a.right <= c.left + 1 || a.bottom <= c.top + 1, kb: Math.round(a.width) }; });
    check(s1.open && /Holwerd naar Leeuwarden/.test(s1.kaart) && s1.binnen && s1.los && s1.losJaar && s1.kb >= 180, `${nm} tijdsprong met de kaart: kaart, jaartal en regel binnen beeld en niet over elkaar`, s1);
    await K.shot(`K-${kw}-kaart`);
    await K.tot(async () => (await K.scr()) === 'intro', 8000); await sleep(400); await K.tapSel('#bIntroSkipTop'); await sleep(800);
    await kp.evaluate(() => document.getElementById('bStoryMenu').click()); await sleep(600);
    await K.tapSel('#bBook'); await sleep(500); await K.tot(() => kp.evaluate(() => !document.querySelector('#scrBoek canvas[data-wacht]')), 40000);
    const b1 = await past('#scrBoek', true), b2 = await kp.evaluate(() => { const c = document.querySelector('#scrBoek .card'), r = c.getBoundingClientRect(), f = [...document.querySelectorAll('#scrBoek .pb-kaart')].slice(0, 5).map(e => e.getBoundingClientRect()); return { scrolt: c.scrollHeight > c.clientHeight, rij: f.length === 5 && f.every(q => q.left >= r.left && q.right <= r.right + 0.5 && q.width >= 80), breed: Math.round(r.width) }; });
    check(b1.ok && b2.rij && b2.scrolt, `${nm} Molenboek: de kaart past in beeld en scrolt in zichzelf, Terug blijft te zien, de plaatjes van 1846 naast elkaar`, { ...b1, ...b2 });
    await K.shot(`K-${kw}-boek`);
    await K.tapSel('#bBookBack'); await sleep(500);
    await K.tapSel('#bSettings'); await sleep(400); const i1 = await past('#scrSettings'); await K.tapSel('#bSettingsBack'); await sleep(400);
    await K.tapSel('#bScores'); await sleep(400); const i2 = await past('#scrScores'); await K.tapSel('#bScoresBack'); await sleep(400);
    await K.tapSel('#bAbout'); await sleep(400); const i3 = await past('#scrAbout', true); await K.tapSel('#bAboutBack'); await sleep(400);
    check(i1.ok && i2.ok && i3.ok, `${nm} Instellingen en Scores passen zonder scrollen; Over dit spel scrolt in de kaart met Terug in beeld`, [i1.uit, i2.uit, i3.uit]);
    await K.tapSel('#bPick'); await sleep(700); await K.tapSel('#lvlChips .btn:nth-child(6)'); await sleep(600); await K.tapSel('#bIntroSkipTop'); await sleep(800);
    await K.tot(() => kp.evaluate(() => !document.getElementById('bStory').hasAttribute('aria-disabled')), 3000); await K.tapSel('#bStory'); await sleep(1200);
    const f1 = await kp.evaluate(() => { const f = window.__korrelval.film(), o = document.querySelector('.sf-onder').getBoundingClientRect(), j = document.getElementById('sfJaar').getBoundingClientRect(); return { open: f.open, binnen: o.bottom <= innerHeight + 0.5 && j.top >= 0 && j.bottom <= innerHeight, cv: document.getElementById('introCv').getBoundingClientRect().width }; });
    check(f1.open && f1.binnen && f1.cv === kw, `${nm} slotfilm: het beeld over de volle breedte, jaartal en lijn binnen beeld`, f1);
    await K.tapSel('#bFilmSkip'); await sleep(700);
    const d1 = await past('#scrDone'); check(await K.scr() === 'done' && d1.ok && /Speel Korrelval/.test(d1.knop), `${nm} slotkaart: zes jaren, Speel Korrelval, Molenboek en Menu binnen beeld zonder scrollen`, d1);
    await K.shot(`K-${kw}-slot`);
    // Korrelval: de kaart vooraf past; pas in het valspel zelf komt de draaimelding (het spel staat dan op pauze)
    await K.tapSel('#bDoneNight'); await sleep(900); const n1 = await past('#scrNight'); K.korrelval();
    check(await K.scr() === 'night' && n1.ok && !n1.draai, `${nm} de kaart van Korrelval past, nog geen draaimelding`, n1);
    await K.tapSel('#bNbDaily'); await sleep(900);
    const n2 = await kp.evaluate(() => ({ s: window.__korrelval.state().screen, draai: !document.getElementById('rotate').hidden, tekst: document.getElementById('rotate').textContent }));
    check(n2.draai && /Korrelval speelt staand/.test(n2.tekst) && (n2.s === 'pause' || n2.s === 'play'), `${nm} alleen in Korrelval: Draai je telefoon rechtop (het valspel is staand)`, n2);
    check(!K.fouten.length && !K.extern.length && !K.verboden.size, `${nm} geen fouten, niets van buiten`, K.fouten.slice(0, 3));
    K.stop(); await K.ctx.close();
  }

  await browser.close();
  const fout = checks.filter(c => !c.ok).length;
  console.log(`\n${checks.length - fout} van ${checks.length} GOED${fout ? ', ' + fout + ' FOUT' : ''}. Beelden: ${out}`);
  fs.writeFileSync(path.join(out, 'uitslag.json'), JSON.stringify(checks, null, 1));
  process.exit(fout ? 1 : 0);
})().catch(e => { console.error('TESTFOUT', e); process.exit(2); });
function ph360(j) { return j.picH; }
