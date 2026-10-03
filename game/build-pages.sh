#!/bin/sh
# Maakt docs/index.html (de GitHub Pages-pagina) opnieuw uit game/korrelval.html.
# Typ in de map van de repository:  sh game/build-pages.sh
cd "$(dirname "$0")/.." || exit 1
python3 - <<'PY'
src = open('game/korrelval.html', encoding='utf-8').read()
head = '''<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Korrelval: val als tarwekorrel door 180 jaar meelfabriek Royal Koopmans, van de rosmolen in Holwerd tot Molen B in Leeuwarden. Fan-made browserspel.">
<meta property="og:title" content="Korrelval">
<meta property="og:description" content="Val als tarwekorrel door 180 jaar meelfabriek. Speelbaar op telefoon en laptop.">
<style>
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui,sans-serif;background:#f6f6f4}
img{max-width:100%}
[hidden]{display:none!important}
</style>
</head>
<body>
'''
open('docs/index.html', 'w', encoding='utf-8').write(head + src + '\n</body>\n</html>\n')
print('docs/index.html bijgewerkt')
PY
