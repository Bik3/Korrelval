// =====================================================================================================
// Nieuwkomertest voor Korrelval: speelt zoals een nieuwe collega op een telefoon.
//
// Wat hij doet (400x800, touch, lege opslag, alle verbindingen naar buiten geblokkeerd):
//   titelscherm > It giet oan! > intro (vlucht de maaltoren in: shot 1 en 2 met Verder, It giet oan! op shot 3) > introband wegtikken > molen 1 spelen door te SLEPEN (echte touch-events)
//   > verhaalpauze lezen en Verder malen > weegbon > Molenboek open en terug > Menu > Kies een molen en terug
//   > Nachtploeg (opent het dienstbriefje) > Terug. Daarna het titelscherm nog eens op 360x640.
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
//     Bekijk de intro opnieuw (Over dit spel) werkt en Terug naar het menu brengt je naar de titel.
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
  const knop = (await page.textContent('#bIntroNext')).trim();
  const paneel = await page.evaluate(() => { const p = document.getElementById('introPanel'), r = p.getBoundingClientRect(); return { past: p.scrollHeight <= p.clientHeight + 1 && r.bottom <= innerHeight + 0.5 && r.top >= 0, boven: Math.round(r.top) }; });
  check(s2 && iv.shot === 2 && knop === 'It giet oan!', 'de nieuwkomer kijkt shot 1 en 2 met Verder; op shot 3 heet de knop It giet oan!', { shot: iv.shot, knop });
  check(overslaan.every(Boolean), 'Overslaan staat in elk shot in beeld (rechtsboven en onder Verder)', overslaan);
  check(paneel.past && await geenX(), 'intro: paneel past zonder scrollen, geen horizontaal scrollen', paneel);
  await tapSel('#bIntroNext'); await sleep(1300);
  const f1 = (await intro()).frames; await sleep(600); const na = await intro();
  check(!na.open && !na.loop && na.frames === f1 && na.seen, 'na It giet oan! is de intro dicht, gezien bewaard, en loopt er geen animatielus meer', { open: na.open, loop: na.loop, frames: [f1, na.frames], seen: na.seen });
  s = await st();
  check(s.screen === 'play' && s.intro === 'wait', 'introband wacht op een tik', { screen: s.screen, intro: s.intro });
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
  check(!introTerug, 'na een game-over en Nog een korrel? komt de intro niet terug', { pogingen });
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
    check(await geenX(), 'Molenboek: geen horizontaal scrollen');
    await sleep(2700); // pagina's tellen pas als gezien na 2,5 s
    await tapSel('#bBookBack'); await sleep(300);
    check((await st()).screen === 'level', 'Terug brengt je naar de weegbon');
    // ---------- dienstbriefje van de Nachtploeg ----------
    await tapSel('#bLMenu'); await sleep(500);
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
    check(s.screen === 'play' && s.lvl === 0, 'na herladen (intro gezien) start It giet oan! meteen molen 1, zonder intro', s.screen);
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
    await c2.close();
  }

  // ---------- algemeen ----------
  check(fouten.length === 0, 'geen console- of paginafouten', fouten.slice(0, 5).join(' | ') || undefined);
  check(extern.length === 0, 'geen requests naar een andere host', extern.slice(0, 5).join(' | ') || undefined);
  await browser.close();
  const fout = checks.filter(c => !c.ok).length;
  console.log(`\n${checks.length - fout} van ${checks.length} controles goed. Screenshots: ${out}`);
  process.exit(fout ? 1 : 0);
})().catch(e => { console.error('TEST AFGEBROKEN:', e); process.exit(2); });
