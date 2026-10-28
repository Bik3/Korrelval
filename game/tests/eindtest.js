// =====================================================================================================
// Eindtest Korrelval met de ontdekstand: het hele pad van een nieuwe speler, en de randen.
//   A  400x800 touch (licht), lege opslag: titel > It giet oan! > hoofdintro (Verder, Terug in de tijd) > jaarintro 1846 shot 1 en 2 met
//      ontdekken (tik op het ding, zoom, zin, Nieuw in je Molenboek, Terug, tik ernaast, knop in het paneel, Verder terwijl een ding open
//      staat) > verhaal 1846 > Volgende molen: 1867 > Overslaan > verhaal > Menu > Kies een molen (alle jaren) > 2026 > slot >
//      Molenboek (pagina's per jaar, Bekijk de jaarintro, ook daar ontdekken, Terug naar het Molenboek) > Nachtploeg (game-over, Nog een korrel?)
//   B  herladen: het ontdekte blijft (vinkjes, geen gloed, teller)
//   C  360x640 touch: titel past, paneel past, de dingen staan boven het paneel, tikvlak minstens 44 px
//   D  1280x800 toetsenbord: Enter, Esc, Tab, pijltjes langs de knoppen, Enter opent, Esc gaat terug, voorlezen (aria-live)
//   E  verminderde beweging: geen zoom en geen pulseren, wel gloed en dimmen
// Overal: geen console-fouten, geen request naar buiten, nooit het valspel, de introband of de weegbon in de tijdlijn.
// Gebruik: NODE_PATH="$(npm root -g)" node eindtest.js <korrelval.html> <uitmap>
// =====================================================================================================
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const game = path.resolve(process.argv[2]), out = path.resolve(process.argv[3] || path.join(__dirname, '..', 'uit', 'eindtest'));
fs.mkdirSync(out, { recursive: true });
const html = fs.readFileSync(game, 'utf8');
const wrapped = path.join(out, 'pagina.html');
fs.writeFileSync(wrapped, '<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
  '<style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + html + '</body></html>');
const checks = [];
const check = (ok, wat, detail) => { checks.push({ ok: !!ok, wat }); console.log(`${ok ? 'GOED' : 'FOUT'}  ${wat}${detail !== undefined ? '  (' + (typeof detail === 'string' ? detail : JSON.stringify(detail)) + ')' : ''}`); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
check(/^\s*<title>/.test(html) && !/<(!doctype|html|head|body)\b/i.test(html), 'bestand begint met <title>, geen doctype/html/head/body');

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
  return { ctx, page, extern, fouten, tap, box, tapSel, st, jaar, ox, scr, tot, shot, geenX, paneel, verboden, nachtploeg: () => { tijd = false; }, stop: () => clearInterval(wacht) };
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
  check(await A.box('#bPick') && !/open na molen/.test(await page.textContent('#bNight')), 'titel: Kies een molen staat er, de Nachtploeg is open');
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
  await A.tapSel('#bIntroNext'); await sleep(1400);
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
  check(o.tel === 'Tik op wat oplicht', 'eerste keer: Tik op wat oplicht', o.tel);
  check(p1.past && await A.geenX(), 'paneel past (400x800)', p1);
  await A.shot('A02-1846-s1-gloed');
  // tik op het ding zelf
  const d0 = o.list[0]; await A.tap(d0.box[0] + d0.box[2] / 2, d0.box[1] + d0.box[3] / 2); await sleep(700);
  o = await A.ox();
  const tekst = await page.textContent('#introText'), sr = await page.textContent('#sr');
  check(o.open === 0 && /scale\(/.test(o.zoom), 'tik op het ding: het gaat open en de camera zoomt naar het ding', { open: o.open, zoom: o.zoom });
  const zoomK = +(/scale\(([\d.]+)\)/.exec(o.zoom) || [0, 0])[1];
  check(zoomK > 1 && zoomK <= 1.4, 'zoom hooguit 1,4x', zoomK);
  check(tekst.startsWith(d0.naam + '.') && /Nieuw in je Molenboek/.test(tekst), 'paneel: naam, één zin en Nieuw in je Molenboek', tekst);
  check(sr.includes(d0.naam) && sr.length > 20, 'de zin wordt voorgelezen (aria-live)', sr.slice(0, 80));
  check(await A.box('#oxTerug') && await page.evaluate(() => document.getElementById('oxLaag').classList.contains('open')), 'Terug staat er en de rest is gedimd');
  const p2 = await A.paneel(); check(p2.past && p2.top === p1.top, 'het paneel blijft even hoog als een ding open is', { voor: p1.top, na: p2.top });
  await A.shot('A03-1846-s1-open');
  await A.tapSel('#oxTerug'); await sleep(750);
  o = await A.ox();
  check(o.open === -1 && o.zoom === '' && o.list[0].af && /^1 van 5 ontdekt$/.test(o.tel), 'Terug zoomt uit; vinkje en 1 van 5 ontdekt', { open: o.open, zoom: o.zoom, tel: o.tel });
  check(await page.evaluate(() => getComputedStyle(document.querySelector('.ox-spot.af i')).opacity === '0'), 'een ontdekt ding licht niet meer op');
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
  check(jv.shot === 1 && (await page.textContent('#bIntroNext')).trim() === 'Verder', 'Verder gaat naar shot 2; de laatste knop heet Verder (geen It giet oan!, geen duik)', { shot: jv.shot, knop: await page.textContent('#bIntroNext') });
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
  await sleep(500); await A.tapSel('#bStory'); await sleep(500);
  jv = await A.jaar();
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
  const slot = await page.evaluate(() => ({ s: window.__korrelval.state().screen, note: document.getElementById('doneNote').textContent, knoppen: ['bDoneBook', 'bDoneNight', 'bDoneMenu'].map(i => !!document.getElementById(i).offsetWidth), bon: !!document.querySelector('#scrDone .bon') }));
  check(slot.s === 'done' && /^Je ontdekte 3 van 28 dingen\.$/.test(slot.note) && slot.knoppen.every(Boolean) && !slot.bon, 'slotkaart: Je ontdekte 3 van 28 dingen, met Molenboek, Nachtploeg en Menu (geen weegbon)', slot);
  const slotPast = await page.evaluate(() => { const c = document.querySelector('#scrDone .card'); return c.scrollHeight <= c.clientHeight + 1; });
  check(slotPast, 'slotkaart past zonder scrollen', slotPast);
  await A.shot('A07-slot');
  // Molenboek
  await A.tapSel('#bDoneBook'); await sleep(500);
  const boek = await page.evaluate(() => ({ s: window.__korrelval.state().screen, nieuw: document.getElementById('bookNew').textContent, dingen: document.querySelectorAll('.page.ding').length, kijk: [...document.querySelectorAll('.jx-kijk')].map(b => b.dataset.jaar), acts: [...document.querySelectorAll('#bookThings .act, #bookMachines .act')].map(p => p.textContent.split(':')[0]) }));
  check(boek.s === 'boek' && boek.dingen >= 3 && /Rosmolen/.test(boek.nieuw), 'Molenboek: de ontdekte dingen staan erin, bij hun jaar', { dingen: boek.dingen });
  check(boek.kijk.includes('0'), 'Molenboek: Bekijk de jaarintro bij 1846', boek.kijk);
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
  await sleep(450); await A.tapSel('#bBookBack'); await sleep(400);
  check(await A.scr() === 'done', 'Terug uit het Molenboek: weer de slotkaart');
  // Nachtploeg
  A.nachtploeg();
  await A.tapSel('#bDoneNight'); await sleep(400);
  check(await A.scr() === 'night', 'Nachtploeg op de slotkaart: het dienstbriefje');
  await A.tapSel('#bNbDaily'); await sleep(600);
  check(await A.scr() === 'play', 'de Nachtploeg start');
  await A.tap(200, 500); await page.evaluate(() => { window.__kvFast = 4; });
  const over = await A.tot(async () => (await A.scr()) === 'over', 40000);
  check(over, 'Nachtploeg: game-over (valspel werkt nog)');
  await page.evaluate(() => { window.__kvFast = 1; });
  await A.shot('A09-nachtploeg-over');
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
  check(pulsUit, 'B herladen: ontdekte dingen lichten niet meer op');
  check(A.verboden.size === 0, 'in de tijdlijn nooit het valspel, de introband, de weegbon of de pauze', [...A.verboden]);
  check(!A.fouten.length, 'A/B geen console-fouten', A.fouten.slice(0, 5));
  check(!A.extern.length, 'A/B niets van buiten', A.extern.slice(0, 5));
  A.stop(); await A.ctx.close();

  // ============================== C: 360x640 ==============================
  const C = await maak(browser, { vp: { width: 360, height: 640 }, touch: true, dpr: 2 });
  await C.page.goto('file://' + wrapped); await sleep(1200);
  const tp = await C.page.evaluate(() => { const c = document.querySelector('#scrTitle .card'); return c.scrollHeight <= c.clientHeight + 1; });
  check(tp && await C.geenX(), 'C 360x640: titel past');
  await C.tapSel('#bStart'); await sleep(450); await C.tapSel('#bIntroSkip'); await sleep(900);
  jv = await C.jaar(); check(jv.open && jv.year === 1846, 'C Overslaan in de hoofdintro: 1846', jv.year);
  for (const sh of [0, 1]) {
    if (sh) { await C.tapSel('#bIntroNext'); await sleep(450); }
    await stand(C); o = await C.ox(); const pc = await C.paneel(), ph = (await C.jaar()).picH;
    check(pc.past && o.list.every(d => d.box && d.box[2] >= 44 && d.box[3] >= 44 && d.a[1] > 4 && d.a[1] < ph - 4 && d.a[0] > 0 && d.a[0] < 360), `C shot ${sh + 1}: paneel past, de dingen staan boven het paneel, tikvlak 44+`, { P: ph, plek: o.list.map(d => d.a) });
    await C.tapSel('#oxKnoppen .ox-knop:nth-child(1)'); await sleep(700);
    const po = await C.paneel(); check(po.past && po.top === pc.top, `C shot ${sh + 1}: met een ding open past het paneel nog`, { voor: pc.top, na: po.top });
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
  await E.tapSel('#bStart'); await sleep(450); await E.tapSel('#bIntroSkip'); await sleep(900);
  o = await E.ox(); jv = await E.jaar();
  check(jv.open && o.on, 'E verminderde beweging: meteen het eindbeeld met de ontdekstand', { on: o.on });
  const anim = await E.page.evaluate(() => getComputedStyle(document.querySelector('.ox-spot i')).animationName);
  check(anim === 'none', 'E geen pulseren', anim);
  await E.tapSel('#oxKnoppen .ox-knop:nth-child(1)'); await sleep(400); o = await E.ox();
  const dim = await E.page.evaluate(() => getComputedStyle(document.getElementById('oxDim')).opacity);
  check(o.open === 0 && o.zoom === '' && +dim > 0.9, 'E geen zoom, wel dimmen', { zoom: o.zoom, dim });
  await E.shot('E01-reduced-open');
  check(!E.fouten.length && !E.extern.length, 'E geen fouten, niets van buiten', E.fouten.slice(0, 3));
  E.stop(); await E.ctx.close();

  await browser.close();
  const fout = checks.filter(c => !c.ok).length;
  console.log(`\n${checks.length - fout} van ${checks.length} GOED${fout ? ', ' + fout + ' FOUT' : ''}. Beelden: ${out}`);
  fs.writeFileSync(path.join(out, 'uitslag.json'), JSON.stringify(checks, null, 1));
  process.exit(fout ? 1 : 0);
})().catch(e => { console.error('TESTFOUT', e); process.exit(2); });
function ph360(j) { return j.picH; }
