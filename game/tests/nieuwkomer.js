// =====================================================================================================
// Nieuwkomertest voor Korrelval: speelt zoals een nieuwe collega op een telefoon.
//
// Wat hij doet (400x800, touch, lege opslag, alle verbindingen naar buiten geblokkeerd):
//   titelscherm > It giet oan! > intro (vlucht de maaltoren in: shot 1 en 2 met Verder, Terug in de tijd op shot 3)
//   > jaarintro 1846 (shot 1 met Verder, It giet oan! op shot 2) > introband wegtikken > molen 1 spelen door te SLEPEN (echte touch-events)
//   > verhaalpauze lezen en Verder malen > weegbon > Molenboek open, Bekijk de jaarintro (1846) en terug > Volgende molen: jaarintro 1867
//   > Overslaan > pauze > Naar menu > Kies een molen en terug > Nachtploeg (opent het dienstbriefje) > Terug.
//   Daarna herladen, het titelscherm en de intro's op 360x640, en een bestaande speler (opslag van voor de jaarintro's).
// Wat hij controleert:
//   - geen console-fouten en geen paginafouten;
//   - geen enkele request naar een andere host (geen lettertypen of iets anders van buiten);
//   - de kaarten (titel, ook op 360x640, verhaal, weegbon, Kies een molen, dienstbriefje) passen zonder scrollen, en nergens horizontaal scrollen;
//     het Molenboek mag in zichzelf scrollen, maar Terug moet in beeld staan;
//   - geen leestekst tijdens het spelen: geen kaart of melding in beeld, zwevende teksten en labels hooguit drie woorden,
//     en voor wie sleept geen duimpje;
//   - bij een eerste bezoek staat het geluid uit;
//   - de intro: verschijnt bij lege opslag, Overslaan staat in elk shot in beeld, Verder tijdens de camerabeweging springt eerst
//     naar het eindbeeld, de animatielus stopt na de intro, en de intro komt niet terug na Nog een korrel? of na herladen;
//     Bekijk de intro opnieuw (Over dit spel) werkt en Terug naar het menu brengt je naar de titel;
//   - de jaarintro: komt na de hoofdintro (1846) en na Volgende molen (1867), kicker met plek en jaartal in handschrift, Overslaan in
//     elk shot, Verder tijdens de camerabeweging springt naar het eindbeeld, It giet oan! (ui-fries) op het laatste shot, het paneel past
//     (ook op 360x640), de animatielus stopt erna, hij komt niet terug na Nog een korrel?, na herladen, via Kies een molen als hij al
//     gezien is of in de Nachtploeg; een bestaande speler krijgt hem wel één keer; Bekijk de jaarintro in het Molenboek werkt en keert terug
//     (laatste knop Terug naar het Molenboek); een dubbeltik op Overslaan of op Terug naar het Molenboek slaat niet te veel over; na een
//     jaarintro rolt de jaarteller niet nog eens van 2026; de volgende jaarintro staat al klaar terwijl de weegbon er staat; geen wind binnen.
//
// Zo draai je hem (vanuit de map van de repository, met Playwright en Chromium geïnstalleerd):
//   NODE_PATH="$(npm root -g)" node game/tests/nieuwkomer.js
// Zonder argumenten test hij game/korrelval.html (naast deze map). Een ander bestand en een eigen map voor de
// screenshots kan ook:
//   NODE_PATH="$(npm root -g)" node game/tests/nieuwkomer.js pad/naar/korrelval.html pad/naar/screenshots
// De screenshots komen standaard in de tijdelijke map van het systeem (korrelval-nieuwkomer); het pad staat in de uitvoer.
// Uitkomst: per controle GOED of FOUT, en de afsluitcode is 1 als er iets fout is (handig vóór een publicatie).
// =====================================================================================================
const fs = require('fs');
const os = require('os');
const path = require('path');
const { chromium } = require('playwright');

const game = path.resolve(process.argv[2] || path.join(__dirname, '..', 'korrelval.html'));
const out = path.resolve(process.argv[3] || path.join(os.tmpdir(), 'korrelval-nieuwkomer'));
fs.mkdirSync(out, { recursive: true });
const VP = { width: 400, height: 800 };

// Het spelbestand is een pagina zonder html/head/body (zoals de artifact-host en build-pages.sh hem inpakken)
const page0 = fs.readFileSync(game, 'utf8');
const wrapped = path.join(out, 'nieuwkomer-pagina.html');
fs.writeFileSync(wrapped, '<!doctype html><html lang="nl"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
  '<style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + page0 + '</body></html>');

const checks = [];
const check = (ok, wat, detail) => { checks.push({ ok: !!ok, wat, detail }); console.log(`${ok ? 'GOED' : 'FOUT'}  ${wat}${detail !== undefined ? '  (' + (typeof detail === 'string' ? detail : JSON.stringify(detail)) + ')' : ''}`); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: VP, hasTouch: true, isMobile: true, deviceScaleFactor: 2, colorScheme: 'light' });
  // alles buiten het bestand zelf blokkeren en noteren
  const extern = [];
  await ctx.route('**/*', r => { const u = r.request().url(); if (/^(file|data|blob|about):/.test(u)) return r.continue(); extern.push(u); return r.abort('blockedbyclient'); });
  const page = await ctx.newPage();
  const fouten = [];
  page.on('pageerror', e => fouten.push('paginafout: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') fouten.push('console: ' + m.text()); });

  // echte touch-events via het DevTools-protocol (Playwright kent zelf alleen tikken)
  const cdp = await ctx.newCDPSession(page);
  const touch = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y, id: 1 }] });
  const tap = async (x, y) => { await touch('touchStart', x, y); await sleep(60); await touch('touchEnd', x, y); await sleep(200); };
  const tapSel = async sel => { const e = await page.$(sel); const b = e && await e.boundingBox(); if (!b) throw new Error('niet in beeld: ' + sel); await tap(b.x + b.width / 2, b.y + b.height / 2); };
  const st = () => page.evaluate(() => ({ ...window.__korrelval.state(), fl: window.__korrelval.floors() }));
  const shot = name => page.screenshot({ path: path.join(out, name + '.png') });
  const past = sel => page.evaluate(s => { const c = document.querySelector(s + ' .card'); return { past: c.scrollHeight <= c.clientHeight + 1, hoog: c.scrollHeight, ruimte: c.clientHeight }; }, sel);
  const geenX = () => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);

  await page.goto('file://' + wrapped);
  await sleep(1200);

  // ---------- titelscherm ----------
  let s = await st();
  check(s.screen === 'title', 'titelscherm staat er', s.screen);
  await shot('01-titel');
  const titel = await past('#scrTitle'); check(titel.past, 'titelkaart past zonder scrollen', titel);
  check(await geenX(), 'titelscherm: geen horizontaal scrollen');
  check(/^Geluid:? uit$/.test(await page.textContent('#bSound')), 'eerste bezoek: geluid staat uit', await page.textContent('#bSound'));

  // ---------- molen 1 spelen door te slepen ----------
  await tapSel('#bStart'); await sleep(300);
  const intro = () => page.evaluate(() => window.__korrelval.intro());
  const inBeeld = sel => page.evaluate(q => { const e = document.querySelector(q); if (!e || e.hidden) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.top >= 0 && r.bottom <= innerHeight + 0.5 && r.left >= 0 && r.right <= innerWidth + 0.5 && r.height >= 44; }, sel);
  const stil = async () => { for (let i = 0; i < 80; i++) { if (!(await intro()).moving) return true; await sleep(100); } return false; };
  let iv = await intro();
  check(iv.open && iv.shot === 0, 'intro verschijnt bij lege opslag', iv);
  const overslaan = [];
  overslaan.push(await inBeeld('#bIntroSkipTop') && await inBeeld('#bIntroSkip'));
  await shot('02a-intro-shot1-begin');
  // shot 1: Verder terwijl de camera nog beweegt > eerst het eindbeeld, nog niet door
  const voor = await intro();
  await tapSel('#bIntroNext'); await sleep(150);
  iv = await intro();
  check(voor.moving && iv.shot === 0 && !iv.moving, 'Verder tijdens de camerabeweging springt naar het eindbeeld, niet meteen door', { voor: { t: voor.t, moving: voor.moving }, na: { shot: iv.shot, t: iv.t, moving: iv.moving } });
  await shot('02b-intro-shot1-eind');
  await tapSel('#bIntroNext'); await sleep(150);
  iv = await intro(); overslaan.push(await inBeeld('#bIntroSkipTop') && await inBeeld('#bIntroSkip'));
  const s2 = iv.shot === 1;
  await stil(); await shot('02c-intro-shot2-eind');
  await tapSel('#bIntroNext'); await sleep(150);
  iv = await intro(); overslaan.push(await inBeeld('#bIntroSkipTop') && await inBeeld('#bIntroSkip'));
  await stil(); await shot('02d-intro-shot3-eind');
  const knop = (await page.textContent('#bIntroNext')).trim(), knopFries = await page.evaluate(() => document.getElementById('bIntroNext').classList.contains('ui-fries'));
  const paneel = await page.evaluate(() => { const p = document.getElementById('introPanel'), r = p.getBoundingClientRect(); return { past: p.scrollHeight <= p.clientHeight + 1 && r.bottom <= innerHeight + 0.5 && r.top >= 0, boven: Math.round(r.top) }; });
  check(s2 && iv.shot === 2 && knop === 'Terug in de tijd' && knopFries, 'de nieuwkomer kijkt shot 1 en 2 met Verder; op shot 3 heet de knop Terug in de tijd (ui-fries), want jaarintro 1846 komt nog', { shot: iv.shot, knop, fries: knopFries });
  check(overslaan.every(Boolean), 'Overslaan staat in elk shot in beeld (rechtsboven en onder Verder)', overslaan);
  check(paneel.past && await geenX(), 'intro: paneel past zonder scrollen, geen horizontaal scrollen', paneel);
  await tapSel('#bIntroNext'); await sleep(1300); // Terug in de tijd: de duik (0,85 s), dan de jaarintro van 1846
  // ---------- jaarintro 1846, meteen na de hoofdintro ----------
  const jaar = () => page.evaluate(() => window.__korrelval.jaarState());
  const jstil = async () => { for (let i = 0; i < 80; i++) { if (!(await jaar()).moving) return true; await sleep(100); } return false; };
  const knopTekst = () => page.evaluate(() => ({ verder: document.getElementById('bIntroNext').textContent.trim(), fries: document.getElementById('bIntroNext').classList.contains('ui-fries'),
    skip: document.getElementById('bIntroSkip').textContent.trim(), top: document.getElementById('bIntroSkipTop').textContent.trim() }));
  const na = await intro(); let jv = await jaar();
  check(!na.open && na.seen && jv.open && jv.year === 1846 && jv.shot === 0 && jv.from === 'auto', 'na de hoofdintro (dicht en gezien) komt de jaarintro van 1846',
    { hoofd: { open: na.open, seen: na.seen }, jaar: { open: jv.open, year: jv.year, shot: jv.shot, from: jv.from } });
  check(jv.t > 0.15 && jv.moving, 'geen stilstand na de hoofdintro: de sluier gaat open over een beeld dat al beweegt', { t: jv.t, moving: jv.moving });
  const jover = [await inBeeld('#bIntroSkipTop') && await inBeeld('#bIntroSkip')];
  const kick = await page.evaluate(() => { const k = document.getElementById('introKicker'), h = k.querySelector('.hand'); return { tekst: k.textContent, hand: h ? h.textContent : null, font: h ? getComputedStyle(h).fontFamily : '' }; });
  check(kick.tekst === 'Holwerd 1846' && kick.hand === '1846' && /Belle Aurore/.test(kick.font), 'jaarintro: de kicker toont plek en jaartal zonder komma (Holwerd 1846), het jaartal in handschrift', kick);
  await shot('02e-jaar1846-shot1-begin');
  await sleep(450); // voorbij de bescherming tegen een dubbeltik; de camera beweegt nog
  const jvoor = await jaar(); await tapSel('#bIntroNext'); await sleep(150); jv = await jaar();
  check(jvoor.moving && jv.shot === 0 && !jv.moving, 'jaarintro: Verder tijdens de camerabeweging springt naar het eindbeeld', { voor: { t: jvoor.t, moving: jvoor.moving }, na: { shot: jv.shot, t: jv.t, moving: jv.moving } });
  await sleep(400);
  { const bx = await (await page.$('#bIntroNext')).boundingBox(), cx = bx.x + bx.width / 2, cy = bx.y + bx.height / 2; // tik, en meteen kijken (tap() wacht 200 ms)
    await touch('touchStart', cx, cy); await sleep(60); await touch('touchEnd', cx, cy); await sleep(60); }
  jv = await jaar(); await sleep(150); jover.push(await inBeeld('#bIntroSkipTop') && await inBeeld('#bIntroSkip'));
  check(jv.shot === 1 && jv.fade < 0.25 && jv.kicker === 'In de rosmolen 1846', 'jaarintro: shot 1 vloeit over in shot 2 (geen harde knip); kicker In de rosmolen 1846', { shot: jv.shot, overvloeien: jv.fade, kicker: jv.kicker });
  await jstil(); await shot('02f-jaar1846-shot2-eind');
  const jknop = await knopTekst();
  const jpaneel = await page.evaluate(() => { const p = document.getElementById('introPanel'), r = p.getBoundingClientRect(); return { past: p.scrollHeight <= p.clientHeight + 1 && r.bottom <= innerHeight + 0.5 && r.top >= 0, boven: Math.round(r.top) }; });
  check(jv.shot === 1 && jv.shots === 2 && jknop.verder === 'It giet oan!' && jknop.fries, 'jaarintro: twee shots; op het laatste heet de knop It giet oan! (ui-fries)', { shot: jv.shot, shots: jv.shots, knop: jknop.verder, fries: jknop.fries });
  check(jover.every(Boolean), 'jaarintro: Overslaan staat in elk shot in beeld (rechtsboven en onder Verder)', jover);
  check(jpaneel.past && await geenX(), 'jaarintro: paneel past zonder scrollen, geen horizontaal scrollen', jpaneel);
  await tapSel('#bIntroNext'); await sleep(1300); // It giet oan!: korte duik (0,7 s), dan de introband
  const jf1 = (await jaar()).frames; await sleep(600); jv = await jaar();
  check(!jv.open && !jv.loop && jv.frames === jf1 && jv.seen, 'na It giet oan! is de jaarintro dicht, gezien bewaard, en loopt er geen animatielus meer', { open: jv.open, loop: jv.loop, frames: [jf1, jv.frames], seen: jv.seen });
  s = await st();
  check(s.screen === 'play' && s.lvl === 0 && s.intro === 'wait', 'daarna wacht de introband van 1846 op een tik', { screen: s.screen, lvl: s.lvl, intro: s.intro });
  check(jv.teller === 1800, 'na jaarintro 1846 rolt de jaarteller niet nog eens van 2026 terug (van 1800, zoals vroeger)', jv.teller);
  await shot('02-introband');
  await tap(VP.width / 2, VP.height * 0.8); await sleep(400);

  const k = Math.min(VP.width / 400, VP.height / 720); // schaal van het speelveld (logische px > css px)
  let fx = VP.width / 2, fy = VP.height * 0.75, down = false, pogingen = 1, verhaal = null, maxWoorden = 0, leestekst = [], duim = 0;
  const lift = async () => { if (down) { await touch('touchEnd', fx, fy); down = false; } };
  const t0 = Date.now();
  // status en DOM in één evaluate, zodat ze bij hetzelfde moment horen (anders telt een weegbon die er net tussen komt als kaart tijdens het spelen)
  const stDom = () => page.evaluate(() => ({ ...window.__korrelval.state(), fl: window.__korrelval.floors(),
    dom: [...document.querySelectorAll('.screen')].filter(e => !e.hidden).map(e => e.id).concat(document.getElementById('toast').hidden ? [] : ['toast']) }));
  let introTerug = false;
  while (Date.now() - t0 < 150000) {
    s = await stDom();
    if (s.screen === 'intro') introTerug = true;
    if (s.screen === 'story') { // verhaalpauze: even lezen, dan Verder malen
      await lift();
      if (!verhaal) { verhaal = await past('#scrStory'); await shot('03-verhaalpauze'); }
      await sleep(1500); await tapSel('#bStory'); continue;
    }
    if (s.screen === 'level') break;
    if (s.screen === 'over') { // korrels op: nog een keer, zoals een echte speler
      await lift(); await shot(`03-game-over-${pogingen}`);
      if (pogingen >= 4) break;
      pogingen++; await tapSel('#bAgain'); await sleep(300); if ((await st()).screen === 'intro') introTerug = true; continue;
    }
    if (s.screen !== 'play' || s.intro === 'wait') { await lift(); await sleep(100); continue; }
    // tijdens het spelen: geen kaart of melding in beeld, korte zwevende teksten en labels, geen duimpje
    if (s.dom.length) leestekst.push('in beeld: ' + s.dom.join(','));
    for (const t of [...s.texts, ...s.labels.map(l => l.text)]) { const n = t.trim().split(/\s+/).length; maxWoorden = Math.max(maxWoorden, n); if (n > 3) leestekst.push(t); }
    duim = Math.max(duim, s.thumb || 0);
    // slepen naar het midden van de volgende spleet (de korrel volgt de beweging van de duim, niet de plek)
    const gy = s.camY + 252, next = s.fl.map(q => q.split(':')).map(([kind, y, cx]) => ({ y: +y, cx: +cx })).filter(f => f.y > gy + 4).sort((a, b) => a.y - b.y)[0];
    const doel = next ? next.cx : 200, dx = Math.max(-16, Math.min(16, (doel - s.x) / 1.15)) * k;
    if (!down) { fx = VP.width / 2; await touch('touchStart', fx, fy); down = true; }
    if (fx + dx < 8 || fx + dx > VP.width - 8) { await lift(); fx = VP.width / 2; await touch('touchStart', fx, fy); down = true; }
    fx += dx; await touch('touchMove', fx, fy);
    await sleep(40);
  }
  await lift();
  s = await st();
  check(s.screen === 'level', 'molen 1 gehaald met slepen (weegbon)', { scherm: s.screen, pogingen });
  check(!introTerug, 'na een game-over en Nog een korrel? komt geen intro of jaarintro terug', { pogingen });
  check(!!verhaal, 'verhaalpauze verscheen');
  if (verhaal) check(verhaal.past, 'verhaalkaart past zonder scrollen', verhaal);
  check(leestekst.length === 0, 'geen leestekst tijdens het spelen', leestekst.slice(0, 5).join(' | ') || `langste zwevende tekst of label: ${maxWoorden} woorden`);
  check(duim === 0, 'wie sleept, krijgt geen duimpje', duim);

  // ---------- weegbon ----------
  if (s.screen === 'level') {
    await shot('04-weegbon');
    const bon = await past('#scrLevel'); check(bon.past, 'weegbon past zonder scrollen', bon);
    check(await geenX(), 'weegbon: geen horizontaal scrollen');
    // ---------- Molenboek ----------
    await tapSel('#bLBook'); await sleep(500);
    s = await st(); check(s.screen === 'boek', 'Molenboek gaat open vanaf de weegbon', s.screen);
    await shot('05-molenboek');
    const terug = await page.evaluate(() => { const b = document.getElementById('bBookBack').getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight; });
    check(terug, 'Molenboek: Terug staat in beeld (de kaart scrolt in zichzelf)');
    const bbBack = await (await page.$('#bBookBack')).boundingBox(); // vastgezet: na terugkijken op dezelfde plek (voor de dubbeltik hieronder)
    check(await geenX(), 'Molenboek: geen horizontaal scrollen');
    const tBoek = Date.now();
    // Bekijk de jaarintro: alleen op de pagina van een bereikt jaar (1846 wel, 1867 nog niet)
    const kijk = await page.evaluate(() => [...document.querySelectorAll('#scrBoek .jx-kijk')].map(b => b.dataset.jaar));
    check(kijk.length === 1 && kijk[0] === '0', 'Molenboek: Bekijk de jaarintro staat alleen bij 1846 (1867 is nog niet bereikt)', kijk);
    const boekTop = await page.evaluate(() => { const b = document.querySelector('#scrBoek .jx-kijk[data-jaar="0"]'); b.scrollIntoView({ block: 'center' }); return document.querySelector('#scrBoek .card').scrollTop; });
    await sleep(200); await shot('05b-molenboek-jaarknop');
    await tapSel('#scrBoek .jx-kijk[data-jaar="0"]'); await sleep(450);
    jv = await jaar(); const bk = await knopTekst();
    check(jv.open && jv.year === 1846 && jv.from === 'boek' && bk.skip === 'Terug naar het Molenboek', 'Bekijk de jaarintro opent de jaarintro van 1846, met Terug naar het Molenboek', { open: jv.open, year: jv.year, from: jv.from, skip: bk.skip, top: bk.top });
    { // dubbeltik op Terug naar het Molenboek: de tweede tik (circa 200 ms later) valt op de Terug-knop van het boek, en die mag het boek dan niet sluiten
      const sk = await (await page.$('#bIntroSkip')).boundingBox(), sx = sk.x + sk.width / 2, sy = sk.y + sk.height / 2;
      await touch('touchStart', sx, sy); await sleep(60); await touch('touchEnd', sx, sy); await sleep(150);
      await tap(bbBack.x + bbBack.width / 2, bbBack.y + bbBack.height / 2); await sleep(200);
      const na2 = await page.evaluate(() => window.__korrelval.state().screen);
      check(na2 === 'boek', 'dubbeltik op Terug naar het Molenboek: het boek blijft open', na2);
      await page.evaluate(() => document.querySelector('#scrBoek .jx-kijk[data-jaar="0"]').scrollIntoView({ block: 'center' })); await sleep(200);
      await tapSel('#scrBoek .jx-kijk[data-jaar="0"]'); await sleep(450);
    }
    await tapSel('#bIntroNext'); await sleep(400); await tapSel('#bIntroNext'); await sleep(400); await tapSel('#bIntroNext'); await sleep(400); // eindbeeld, shot 2, eindbeeld
    const bk2 = await knopTekst(), linkWeg = await page.evaluate(() => getComputedStyle(document.getElementById('bIntroSkip')).visibility === 'hidden');
    check(bk2.verder === 'Terug naar het Molenboek' && !bk2.fries && linkWeg, 'terugkijken: de laatste knop heet Terug naar het Molenboek (gewone knop, de link eronder is dan weg)', { knop: bk2.verder, fries: bk2.fries, link: linkWeg });
    await tapSel('#bIntroNext'); await sleep(1300); // Terug naar het Molenboek: duik, dan terug
    const bf = (await jaar()).frames; await sleep(400); jv = await jaar();
    const terugBoek = await page.evaluate(() => ({ scherm: window.__korrelval.state().screen, top: document.querySelector('#scrBoek .card').scrollTop }));
    check(terugBoek.scherm === 'boek' && !jv.open && !jv.loop && jv.frames === bf && Math.abs(terugBoek.top - boekTop) <= 2, 'terugkijken eindigt weer in het Molenboek, op dezelfde plek, zonder animatielus', { ...terugBoek, voor: boekTop, loop: jv.loop });
    await sleep(Math.max(0, 2700 - (Date.now() - tBoek))); // pagina's tellen pas als gezien na 2,5 s
    await tapSel('#bBookBack'); await sleep(300);
    check((await st()).screen === 'level', 'Terug brengt je naar de weegbon');
    // ---------- Volgende molen: jaarintro 1867 ----------
    const voor = await jaar();
    check(voor.pre && voor.pre.jaar === 1 && voor.pre.gebouwd, 'terwijl de weegbon staat, wordt jaarintro 1867 al voorgebouwd', voor.pre);
    await tapSel('#bNext'); await sleep(500);
    jv = await jaar();
    check(jv.open && jv.year === 1867 && jv.from === 'auto' && /1867/.test(jv.kicker) && jv.voorgebouwd, 'na molen 1 en Volgende molen komt de jaarintro van 1867 (voorgebouwd)', { open: jv.open, year: jv.year, from: jv.from, kicker: jv.kicker, voorgebouwd: jv.voorgebouwd });
    await shot('05c-jaar1867');
    await tapSel('#bIntroSkip'); await sleep(400);
    s = await st(); jv = await jaar();
    check(s.screen === 'play' && s.lvl === 1 && s.intro === 'wait' && !jv.loop && jv.seen && jv.teller === 1846, 'Overslaan: de jaarintro is gezien en de introband van 1867 wacht (teller van 1846)', { screen: s.screen, lvl: s.lvl, intro: s.intro, loop: jv.loop, seen: jv.seen, teller: jv.teller });
    await tapSel('#btnPause'); await sleep(300); await tapSel('#bPMenu'); await sleep(500); // via de pauze naar het menu
    // ---------- Kies een molen (alleen na molen 1) ----------
    check(await page.isVisible('#bPick'), 'na molen 1 staat Kies een molen op het titelscherm');
    await tapSel('#bPick'); await sleep(400);
    const kies = await page.evaluate(() => [...document.querySelectorAll('#lvlChips button')].map(b => b.textContent));
    s = await st(); check(s.screen === 'pick' && kies.length === 2, 'Kies een molen toont de gehaalde molens', { scherm: s.screen, molens: kies });
    await shot('06-kies-een-molen');
    const kp = await past('#scrPick'); check(kp.past, 'Kies een molen past zonder scrollen', kp);
    await tapSel('#bPickBack'); await sleep(300);
    // ---------- dienstbriefje van de Nachtploeg ----------
    await tapSel('#bNight'); await sleep(500);
    s = await st(); check(s.screen === 'night' && s.nightOpen, 'tik op Nachtploeg opent het dienstbriefje', { scherm: s.screen, open: s.nightOpen });
    await shot('07-dienstbriefje');
    const brief = await past('#scrNight'); check(brief.past, 'dienstbriefje past zonder scrollen', brief);
    check(await geenX(), 'dienstbriefje: geen horizontaal scrollen');
    await tapSel('#bNbBack'); await sleep(300);
    check((await st()).screen === 'title', 'Terug brengt je naar het titelscherm');
  }

  // ---------- herladen: de intro komt niet terug; opnieuw bekijken via Over dit spel ----------
  {
    await page.reload(); await sleep(1200);
    await tapSel('#bAbout'); await sleep(300);
    await tapSel('#bIntroAgain'); await sleep(300);
    let iv2 = await intro();
    const link = (await page.textContent('#bIntroSkip')).trim();
    check(iv2.open && iv2.from === 'again' && link === 'Terug naar het menu', 'Bekijk de intro opnieuw opent de intro, met Terug naar het menu', { open: iv2.open, from: iv2.from, link });
    await tapSel('#bIntroSkip'); await sleep(300);
    s = await st(); iv2 = await intro();
    check(s.screen === 'title' && !iv2.loop, 'Terug naar het menu brengt je naar de titel', { scherm: s.screen, loop: iv2.loop });
    await tapSel('#bStart'); await sleep(500);
    s = await st();
    check(s.screen === 'play' && s.lvl === 0, 'na herladen (intro en jaarintro gezien) start It giet oan! meteen molen 1, zonder intro of jaarintro', s.screen);
  }

  // ---------- titelscherm op een kleine telefoon (360x640, lege opslag) ----------
  {
    const c2 = await browser.newContext({ viewport: { width: 360, height: 640 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2, colorScheme: 'light' });
    await c2.route('**/*', r => { const u = r.request().url(); if (/^(file|data|blob|about):/.test(u)) return r.continue(); extern.push(u); return r.abort('blockedbyclient'); });
    const p2 = await c2.newPage();
    p2.on('pageerror', e => fouten.push('paginafout (360x640): ' + e.message));
    p2.on('console', m => { if (m.type() === 'error') fouten.push('console (360x640): ' + m.text()); });
    await p2.goto('file://' + wrapped); await sleep(1000);
    const klein = await p2.evaluate(() => { const c = document.querySelector('#scrTitle .card'); return { past: c.scrollHeight <= c.clientHeight + 1, hoog: c.scrollHeight, ruimte: c.clientHeight, x: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1 }; });
    await p2.screenshot({ path: path.join(out, '08-titel-360x640.png') });
    check(klein.past && klein.x, 'titelscherm past zonder scrollen op 360x640', klein);
    await p2.click('#bStart'); await sleep(400);
    const ki = await p2.evaluate(() => { const p = document.getElementById('introPanel'), r = p.getBoundingClientRect(), i = window.__korrelval.intro();
      return { open: i.open, past: p.scrollHeight <= p.clientHeight + 1 && r.bottom <= innerHeight + 0.5, beeld: Math.round(i.picH), x: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1 }; });
    await p2.screenshot({ path: path.join(out, '09-intro-360x640.png') });
    check(ki.open && ki.past && ki.x && ki.beeld >= 300, 'intro past zonder scrollen op 360x640, met minstens 300 px beeld boven het paneel', ki);
    await p2.click('#bIntroSkip'); await sleep(150); await p2.click('#bIntroSkip'); await sleep(450); // dubbeltik op Overslaan: alleen de hoofdintro
    const dub = await p2.evaluate(() => window.__korrelval.jaarState());
    check(dub.open && dub.year === 1846 && !dub.seen, 'dubbeltik op Overslaan in de hoofdintro slaat jaarintro 1846 niet over', { open: dub.open, year: dub.year, seen: dub.seen });
    const kj = await p2.evaluate(() => { const p = document.getElementById('introPanel'), r = p.getBoundingClientRect(), j = window.__korrelval.jaarState();
      const vis = id => { const e = document.getElementById(id), q = e.getBoundingClientRect(); return q.width > 0 && q.top >= 0 && q.bottom <= innerHeight + 0.5 && q.right <= innerWidth + 0.5; };
      return { open: j.open, year: j.year, past: p.scrollHeight <= p.clientHeight + 1 && r.bottom <= innerHeight + 0.5, beeld: Math.round(j.picH), skip: vis('bIntroSkip') && vis('bIntroSkipTop'), x: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1 }; });
    await p2.screenshot({ path: path.join(out, '09b-jaar1846-360x640.png') });
    check(kj.open && kj.year === 1846 && kj.past && kj.x && kj.skip && kj.beeld >= 300, 'jaarintro past zonder scrollen op 360x640, met Overslaan en minstens 300 px beeld', kj);
    await c2.close();
  }

  // ---------- bestaande speler: opslag van voor de jaarintro's (molen 3 bereikt, intro gezien, geen jaarSeen) ----------
  {
    const c3 = await browser.newContext({ viewport: VP, hasTouch: true, isMobile: true, deviceScaleFactor: 1, colorScheme: 'dark' });
    await c3.route('**/*', r => { const u = r.request().url(); if (/^(file|data|blob|about):/.test(u)) return r.continue(); extern.push(u); return r.abort('blockedbyclient'); });
    await c3.addInitScript(() => { try { if (!sessionStorage.getItem('kv-init')) { sessionStorage.setItem('kv-init', '1');
      localStorage.setItem('korrelval-b-v2', JSON.stringify({ maxLvl: 2, introSeen: true, night: true, nightBrief: true, sound: true, best: 1200 })); } } catch (e) { } });
    const p3 = await c3.newPage();
    p3.on('pageerror', e => fouten.push('paginafout (bestaande speler): ' + e.message));
    p3.on('console', m => { if (m.type() === 'error') fouten.push('console (bestaande speler): ' + m.text()); });
    const st3 = () => p3.evaluate(() => ({ ...window.__korrelval.state(), jaar: window.__korrelval.jaarState(), hoofd: window.__korrelval.intro() }));
    await p3.goto('file://' + wrapped); await sleep(1200);
    await p3.keyboard.press('Shift'); // een toets: het geluid mag starten (AudioContext na een eigen handeling)
    await p3.tap('#bStart'); await sleep(500);
    let q = await st3();
    check(q.screen === 'intro' && q.jaar.open && q.jaar.year === 1846 && !q.hoofd.open, 'bestaande speler: It giet oan! geeft één keer de jaarintro van 1846 (niet de hoofdintro)', { scherm: q.screen, jaar: q.jaar.year, open: q.jaar.open, hoofd: q.hoofd.open });
    { // geluid staat aan: wind in shot 1 (buiten), niet in shot 2 (binnen)
      await sleep(400); const w1 = (await st3()).jaar.wind;
      await p3.tap('#bIntroNext'); await sleep(450); await p3.tap('#bIntroNext'); await sleep(900); const q2 = (await st3()).jaar;
      check(q2.shot === 1 && !q2.wind && (w1 || !q2.wind), 'geluid aan: wind buiten (shot 1), niet binnen (shot 2)', { shot1: w1, shot2: q2.wind, shot: q2.shot });
    }
    await p3.keyboard.press('Escape'); await sleep(400); // Esc slaat over
    q = await st3();
    check(q.screen === 'play' && q.lvl === 0 && q.jaar.seen, 'Esc slaat de jaarintro over: molen 1 begint, de jaarintro is gezien', { scherm: q.screen, lvl: q.lvl, seen: q.jaar.seen });
    // geen sturen: korrels kwijt tot de game-over (sneller met __kvFast), dan Nog een korrel?
    await p3.evaluate(() => { window.__kvFast = 4; }); await p3.tap('#cv'); let over = false;
    for (let i = 0; i < 60 && !over; i++) {
      await sleep(500); q = await st3();
      if (q.screen === 'story') { await sleep(700); await p3.tap('#bStory').catch(() => {}); continue; }
      if (q.screen === 'intro') break;
      over = q.screen === 'over';
    }
    await p3.evaluate(() => { window.__kvFast = 1; });
    check(over, 'bestaande speler: game-over in molen 1 (zonder sturen)', q.screen);
    if (over) {
      await p3.tap('#bAgain'); await sleep(500); q = await st3();
      check(q.screen === 'play' && q.lvl === 0 && !q.jaar.open, 'na Nog een korrel? komt de jaarintro niet terug', { scherm: q.screen, jaar: q.jaar.open });
    }
    // Kies een molen: 1920 is nog niet gezien (wel de jaarintro), 1846 al wel (meteen spelen)
    await p3.evaluate(() => { const b = document.getElementById('btnPause'); if (!b.hidden) b.click(); }); await sleep(300);
    await p3.evaluate(() => { const b = document.getElementById('bPMenu'); if (b.offsetParent) b.click(); }); await sleep(500);
    await p3.tap('#bPick'); await sleep(400);
    await p3.tap('#lvlChips button:nth-child(3)'); await sleep(500); q = await st3();
    check(q.screen === 'intro' && q.jaar.open && q.jaar.year === 1920, 'Kies een molen: 1920 is nog niet gezien, dus eerst de jaarintro van 1920', { scherm: q.screen, jaar: q.jaar.year });
    await p3.screenshot({ path: path.join(out, '10-jaar1920-donker.png') });
    await p3.tap('#bIntroSkipTop'); await sleep(400); q = await st3();
    check(q.screen === 'play' && q.lvl === 2, 'Overslaan rechtsboven: daarna molen 3 (1920)', { scherm: q.screen, lvl: q.lvl });
    await p3.evaluate(() => document.getElementById('btnPause').click()); await sleep(300); await p3.evaluate(() => document.getElementById('bPMenu').click()); await sleep(500);
    await p3.tap('#bPick'); await sleep(400);
    await p3.tap('#lvlChips button:nth-child(1)'); await sleep(500); q = await st3();
    check(q.screen === 'play' && q.lvl === 0 && !q.jaar.open, 'Kies een molen: 1846 is al gezien, dus meteen de molen', { scherm: q.screen, lvl: q.lvl, jaar: q.jaar.open });
    // Nachtploeg: nooit een jaarintro
    await p3.evaluate(() => document.getElementById('btnPause').click()); await sleep(300); await p3.evaluate(() => document.getElementById('bPMenu').click()); await sleep(500);
    await p3.tap('#bNight'); await sleep(400); await p3.tap('#bNbFree'); await sleep(500); q = await st3();
    check(q.screen === 'play' && q.mode === 'night' && !q.jaar.open, 'de Nachtploeg start zonder jaarintro', { scherm: q.screen, mode: q.mode, jaar: q.jaar.open });
    await c3.close();
  }

  // ---------- algemeen ----------
  check(fouten.length === 0, 'geen console- of paginafouten', fouten.slice(0, 5).join(' | ') || undefined);
  check(extern.length === 0, 'geen requests naar een andere host', extern.slice(0, 5).join(' | ') || undefined);
  await browser.close();
  const fout = checks.filter(c => !c.ok).length;
  console.log(`\n${checks.length - fout} van ${checks.length} controles goed. Screenshots: ${out}`);
  process.exit(fout ? 1 : 0);
})().catch(e => { console.error('TEST AFGEBROKEN:', e); process.exit(2); });
