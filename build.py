# Убацује src/razred2.css и src/razred2.js у index.html (између ознака), да апликација остане један фајл.
import re, pathlib
root = pathlib.Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "src" / "razred2.css").read_text(encoding="utf-8")
js = (root / "src" / "razred2.js").read_text(encoding="utf-8")
block = "<!--R2-START--><style>\n" + css + "</style><script>\n" + js + "</script><!--R2-END-->"
if "<!--R2-START-->" in html:
    html = re.sub(r"<!--R2-START-->.*?<!--R2-END-->", lambda m: block, html, flags=re.S)
else:
    html = html.replace("</body></html>", block + "</body></html>")
(root / "index.html").write_text(html, encoding="utf-8")
print("ok", len(html))
