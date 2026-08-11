#!/usr/bin/env python3
"""Збирає index.html + styles.css + script.js + шрифти та зображення
в один самодостатній файл dist/artifact.html (усі ресурси — data: URI).

Використання:  python3 tools/build-artifact.py
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"

MIME = {
    ".ttf": "font/ttf",
    ".woff2": "font/woff2",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
}


def data_uri(rel_path: str) -> str:
    path = ROOT / rel_path
    mime = MIME.get(path.suffix.lower(), "application/octet-stream")
    payload = base64.b64encode(path.read_bytes()).decode("ascii")
    return "data:%s;base64,%s" % (mime, payload)


def inline_css(css: str) -> str:
    return re.sub(
        r'url\((["\']?)(assets/[^)"\']+)\1\)',
        lambda m: "url(%s)" % data_uri(m.group(2)),
        css,
    )


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = inline_css((ROOT / "styles.css").read_text(encoding="utf-8"))
    js = (ROOT / "script.js").read_text(encoding="utf-8")

    title = re.search(r"<title>(.*?)</title>", html, re.S).group(1)
    body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)

    # <script src="script.js"> -> вбудований скрипт
    body = re.sub(r'\s*<script src="script\.js"></script>', "", body)

    # зображення -> data: URI
    body = re.sub(
        r'src="(assets/[^"]+)"',
        lambda m: 'src="%s"' % data_uri(m.group(1)),
        body,
    )

    out = "\n".join([
        "<title>%s</title>" % title,
        "<style>",
        css,
        "</style>",
        body.strip(),
        "<script>",
        js,
        "</script>",
        "",
    ])

    DIST.mkdir(exist_ok=True)
    target = DIST / "artifact.html"
    target.write_text(out, encoding="utf-8")
    print("%s — %.1f KB" % (target, target.stat().st_size / 1024))


if __name__ == "__main__":
    main()
