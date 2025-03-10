const { randomBytes } = require('node:crypto');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 8080;

// Middleware zur Generierung des Nonce-Werts pro Anfrage
function generateNonce(req, res, next) {
  res.locals.nonce = randomBytes(16).toString("base64"); // Sichere Nonce erzeugen
  next();
}

// CSP-Header setzen
app.use(generateNonce);
app.use((req, res, next) => {
  const nonce = res.locals.nonce;
  res.setHeader(
    "Content-Security-Policy",
    `script-src 'strict-dynamic' 'nonce-${nonce}' 'unsafe-inline' http: https:; style-src 'self' 'nonce-${nonce}'; object-src 'none'; base-uri 'none'; require-trusted-types-for 'script';`
  );
  next();
});

// 💡 Statische Dateien ausliefern, aber `index.html` ausnehmen!
app.use(
  "/",
  express.static(path.join(__dirname, "../www"), { index: false })
);


// Dynamische Lieferung von index.html mit Nonce
app.get("/", (req, res) => {
  const nonce = res.locals.nonce;
  const indexPath = path.join(__dirname, "../www", "index.html");

  fs.readFile(indexPath, "utf8", (err, html) => {
    if (err) {
      console.error("Fehler beim Lesen der index.html:", err);
      return res.status(500).send("Interner Serverfehler");
    }

    // Nonce in <script> und <style> Tags einfügen
    const modifiedHtml = html
      .replace(/<script(.*?)>/g, `<script$1 nonce="${nonce}">`) // Alle <script>-Tags modifizieren
      .replace(/<style(.*?)>/g, `<style$1 nonce="${nonce}">`)   // Alle <style>-Tags modifizieren
      .replace(
        "</head>",
        `<meta name="csp-nonce" content="${nonce}"></head>` // Nonce in <meta>-Tag einfügen
      );

    res.send(modifiedHtml);
  });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
