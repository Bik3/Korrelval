#!/bin/sh
# Maakt docs/index.html (de GitHub Pages-pagina) opnieuw uit game/korrelval.html.
# Typ in de map van de repository:  sh game/build-pages.sh
cd "$(dirname "$0")/.." || exit 1
python3 - <<'PY'
import re, shutil, subprocess, tempfile, os
from urllib.parse import quote
src = open('game/korrelval.html', encoding='utf-8').read()

# De pagina sneller laden: uit het script gaan de commentaarregels en de lege regels (de bron game/korrelval.html blijft zoals hij is).
# Alleen hele regels die na witruimte met // beginnen, en alleen als die regel in gewone code begint: nooit binnen een string, een
# sjabloontekst (`...`), een /* blok */ of een regel met code. Daarvoor loopt kaal() het script één keer door en onthoudt per regel
# waar hij begint. Twijfelt hij (een regex die niet op zijn regel eindigt, of het eind komt niet uit in gewone code), dan blijft het
# script heel. Daarna, als node er is: node --check op het resultaat; faalt dat, dan ook het hele script.
def kaal(js):
    n = len(js); i = 0; start = [True]  # per regel: begint hij in gewone code?
    stapel = []  # open sjabloonteksten: de accoladediepte van de ${ } waarin we zitten, of 'tekst'
    diep = 0; vorig = ''; woord = ''
    regex_na = set('(,=:[!&|?{};+-*%<>~^')
    sleutel = {'return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete', 'void', 'throw', 'case', 'do', 'else', 'yield', 'await'}
    def regel(code): start.append(code)
    while i < n:
        c = js[i]
        if stapel and stapel[-1] == 'tekst':  # in een sjabloontekst
            if c == '\\': i += 2; continue
            if c == '`': stapel.pop(); vorig = '`'; woord = ''; i += 1; continue
            if c == '$' and js[i + 1:i + 2] == '{': stapel.append(diep); diep = 0; vorig = '{'; woord = ''; i += 2; continue
            if c == '\n': regel(False)
            i += 1; continue
        if c == '\n': regel(True); i += 1; continue
        if c in ' \t\r': i += 1; continue
        if c == '/' and js[i + 1:i + 2] == '/':
            j = js.find('\n', i); i = n if j < 0 else j; continue
        if c == '/' and js[i + 1:i + 2] == '*':
            j = js.find('*/', i + 2)
            if j < 0: return None
            for _ in range(js.count('\n', i, j)): regel(False)
            i = j + 2; continue
        if c in '"\'':
            j = i + 1
            while j < n and js[j] != c:
                if js[j] == '\\':
                    if js[j + 1:j + 2] == '\n': regel(False)
                    j += 1
                elif js[j] == '\n': return None
                j += 1
            i = j + 1; vorig = c; woord = ''; continue
        if c == '`': stapel.append('tekst'); i += 1; continue
        if c == '/' and (vorig == '' or vorig in regex_na or woord in sleutel):  # een regex
            j = i + 1; klas = False
            while j < n:
                d = js[j]
                if d == '\\': j += 2; continue
                if d == '\n': return None
                if d == '[': klas = True
                elif d == ']': klas = False
                elif d == '/' and not klas: break
                j += 1
            i = j + 1; vorig = ')'; woord = ''; continue
        if c == '{': diep += 1
        elif c == '}':
            if diep == 0 and stapel: diep = stapel.pop(); vorig = '}'; woord = ''; i += 1; continue  # einde van ${ }: terug in de tekst
            diep -= 1
        if c.isalnum() or c in '_$':
            j = i
            while j < n and (js[j].isalnum() or js[j] in '_$'): j += 1
            woord = js[i:j]; vorig = 'a'; i = j; continue
        vorig = c; woord = ''; i += 1
    if stapel or diep != 0: return None
    regels = js.split('\n')
    if len(regels) != len(start): return None
    uit = [r for r, code in zip(regels, start) if not (code and (r.strip() == '' or r.lstrip().startswith('//')))]
    return '\n'.join(uit)

def node_ok(js):
    node = shutil.which('node')
    if not node: return None
    f = tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8'); f.write(js); f.close()
    try: return subprocess.run([node, '--check', f.name], capture_output=True).returncode == 0
    finally: os.unlink(f.name)

m = re.search(r'<script>\n(.*)</script>', src, re.S)
if m:
    js = m.group(1); k = kaal(js)
    if k is None: print('script niet ingekort: de regels waren niet zeker te herkennen')
    elif node_ok(k) is False: print('script niet ingekort: node --check keurde het resultaat af')
    else:
        print('script ingekort: %d regels en %d kB minder (commentaarregels en lege regels)' % (js.count('\n') - k.count('\n'), (len(js.encode()) - len(k.encode())) // 1024))
        src = src[:m.start(1)] + k + src[m.end(1):]
# Favicon: gouden korenaar op donkere achtergrond, als SVG in een data-URI (geen los bestand nodig).
aar = ("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>"
       "<rect width='32' height='32' rx='7' fill='#1D1E1F'/><g fill='#CFAB00'>"
       "<rect x='15.1' y='9' width='1.8' height='20' rx='.9'/><ellipse cx='16' cy='6.2' rx='1.8' ry='3.2'/>"
       "<g id='p'><ellipse cx='12.6' cy='11.6' rx='1.8' ry='3.1' transform='rotate(-38 12.6 11.6)'/>"
       "<ellipse cx='19.4' cy='11.6' rx='1.8' ry='3.1' transform='rotate(38 19.4 11.6)'/></g>"
       "<use href='#p' y='5.4'/><use href='#p' y='10.8'/></g></svg>")
favicon = 'data:image/svg+xml,' + quote(aar, safe=" '=/:.,-()")
head = '''<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Molenvlucht: vlieg door 180 jaar meelfabriek Royal Koopmans, van de rosmolen in Holwerd tot Molen B in Leeuwarden, en tik de kaartjes aan. Aan het eind de minigame Korrelval. Fan-made browserspel.">
<meta property="og:title" content="Molenvlucht">
<meta property="og:description" content="Vlieg door 180 jaar meelfabriek en ontdek hoe het toen ging. Aan het eind val je zelf als korrel door de molen. Speelbaar op telefoon en laptop.">
<meta property="og:url" content="https://bik3.github.io/Korrelval/">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#1D1E1F">
<link rel="icon" type="image/svg+xml" href="FAVICON">
<style>
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui,sans-serif;background:#f6f6f4}
img{max-width:100%}
[hidden]{display:none!important}
</style>
</head>
<body>
'''.replace('FAVICON', favicon)
open('docs/index.html', 'w', encoding='utf-8').write(head + src + '\n</body>\n</html>\n')
print('docs/index.html bijgewerkt')
PY
