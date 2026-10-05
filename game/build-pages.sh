#!/bin/sh
# Maakt docs/index.html (de GitHub Pages-pagina) opnieuw uit game/korrelval.html.
# Typ in de map van de repository:  sh game/build-pages.sh
cd "$(dirname "$0")/.." || exit 1
python3 - <<'PY'
from urllib.parse import quote
src = open('game/korrelval.html', encoding='utf-8').read()
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
<meta name="description" content="Korrelval: val als tarwekorrel door 180 jaar meelfabriek Royal Koopmans, van de rosmolen in Holwerd tot Molen B in Leeuwarden. Fan-made browserspel.">
<meta property="og:title" content="Korrelval">
<meta property="og:description" content="Val als tarwekorrel door 180 jaar meelfabriek. Speelbaar op telefoon en laptop.">
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
