// =====================================================================================================
// Nieuwkomertest voor Korrelval: speelt zoals een nieuwe collega op een telefoon.
//
// Wat hij doet (400x800, touch, lege opslag, alle verbindingen naar buiten geblokkeerd):
//   titelscherm > It giet oan! > introband wegtikken > molen 1 spelen door te SLEPEN (echte touch-events)
//   > verhaalpauze lezen en Verder malen > weegbon > Molenboek open en terug > Menu > Korrel van de dag
//   (eerste tik opent het dienstbriefje van de Nachtploeg) > Terug.
// Wat hij controleert:
//   - geen console-fouten en geen paginafouten;
//   - geen enkele request naar een andere host (geen lettertypen of iets anders van buiten);
//   - de kaarten (titel, verhaal, weegbon, dienstbriefje) passen zonder scrollen, en nergens horizontaal scrollen;
//     het Molenboek mag in zichzelf scrollen, maar Terug moet in beeld staan;
//   - geen leestekst tijdens het spelen: geen kaart of melding in beeld, zwevende teksten en labels hooguit drie woorden,
//     en voor wie sleept geen duimpje;
//   - bij een eerste bezoek staat het geluid uit.
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
  await tapSel('#bStart'); await sleep(1100);
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
  while (Date.now() - t0 < 150000) {
    s = await stDom();
    if (s.screen === 'story') { // verhaalpauze: even lezen, dan Verder malen
      await lift();
      if (!verhaal) { verhaal = await past('#scrStory'); await shot('03-verhaalpauze'); }
      await sleep(1500); await tapSel('#bStory'); continue;
    }
    if (s.screen === 'level') break;
    if (s.screen === 'over') { // korrels op: nog een keer, zoals een echte speler
      await lift(); await shot(`03-game-over-${pogingen}`);
      if (pogingen >= 4) break;
      pogingen++; await tapSel('#bAgain'); await sleep(300); continue;
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
    await tapSel('#bDaily'); await sleep(500);
    s = await st(); check(s.screen === 'night' && s.nightOpen, 'eerste tik op Korrel van de dag opent het dienstbriefje', { scherm: s.screen, open: s.nightOpen });
    await shot('06-dienstbriefje');
    const brief = await past('#scrNight'); check(brief.past, 'dienstbriefje past zonder scrollen', brief);
    check(await geenX(), 'dienstbriefje: geen horizontaal scrollen');
    await tapSel('#bNbBack'); await sleep(300);
    check((await st()).screen === 'title', 'Terug brengt je naar het titelscherm');
  }

  // ---------- algemeen ----------
  check(fouten.length === 0, 'geen console- of paginafouten', fouten.slice(0, 5).join(' | ') || undefined);
  check(extern.length === 0, 'geen requests naar een andere host', extern.slice(0, 5).join(' | ') || undefined);
  await browser.close();
  const fout = checks.filter(c => !c.ok).length;
  console.log(`\n${checks.length - fout} van ${checks.length} controles goed. Screenshots: ${out}`);
  process.exit(fout ? 1 : 0);
})().catch(e => { console.error('TEST AFGEBROKEN:', e); process.exit(2); });
