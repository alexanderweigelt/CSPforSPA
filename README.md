# Investigate Compliance with Content Security Policies for Single-Page Applications

Achtung: Diese Dokumentation ist nicht final und wird fortlaufend aktualisiert, sobald neue Erkenntnisse aus den Tests vorliegen.

## Einleitung

In diesem Projekt untersuchen wir die Einhaltung der Content Security Policy (CSP) in Single-Page Applications (SPA), die mit Client-Side Rendering (CSR) arbeiten. Unser Ziel ist es, herauszufinden, welche Einschränkungen verschiedene Frontend-Frameworks in Bezug auf CSP mit sich bringen und welche Anpassungen erforderlich sind, um die Sicherheitsrichtlinien einzuhalten.

## Untersuchungsgegenstand

Wir analysieren drei weit verbreitete Frontend-Frameworks:
- **React (Version 19)**
- **Vue.js (Version 3)**
- **Stencil.js (Version 4)**

Jedes dieser Frameworks wird hinsichtlich der Umsetzung der CSP-Richtlinien getestet, insbesondere mit Fokus auf die Vermeidung von Inline-Styles, die in strikten CSP-Umgebungen problematisch sind.

## Methodik

Um eine fundierte Analyse durchzuführen, werden für jedes der drei Frameworks Beispielanwendungen erstellt, die verschiedene CSP-Header testen. Diese Anwendungen beinhalten sowohl Positivbeispiele (regelkonform) als auch Negativbeispiele (die gezielt gegen CSP verstoßen, um die Auswirkungen zu analysieren).

Die getesteten CSP-Header sind:
- `script-src`
- `style-src`
- `object-src`
- `base-uri`
- `require-trusted-types-for`

Beispiel für eine sichere Content Security Policy (CSP) für Browser mit einer Unterstützung von CSP in Version 3

```
script-src 'strict-dynamic' 'nonce-rAnd0m123' 'unsafe-inline' http: https:;
style-src 'self';
object-src 'none';
base-uri 'none';
require-trusted-types-for 'script';
```

Zur Bereitstellung der Testanwendungen wird entweder ein Express-Server oder eine einfache `<meta>`-Tag-Definition im `<head>`-Bereich der HTML-Datei genutzt.

## Bewertungskriterien

Die CSP-Konformität wird anhand folgender Kriterien geprüft:
- Die gesetzte Content Security Policy (CSP) muss den Test des [CSP Evaluator](https://csp-evaluator.withgoogle.com/) bestehen.
- Automatisierte Tests werden mit dem Tool [csp_evaluator](https://www.npmjs.com/package/csp_evaluator) durchgeführt.

## Probleme mit Nonces und Caching

Ein **Nonce** (`'nonce-rAnd0m123'`) ist ein einmaliger, zufällig generierter Wert, der für jede HTTP-Anfrage neu erstellt werden muss. Während Nonces nützlich sind, um Inline-Skripte oder Inline-Styles explizit zu erlauben, bringen sie einige Probleme mit sich:

- **Nicht wiederverwendbar:** Jeder Nonce muss für jede Anfrage neu generiert werden, wodurch Caching auf CDNs oder im Browser nicht funktioniert.
- **Inkonsistenz zwischen Seitenladevorgängen:** Falls eine gecachte HTML-Datei einen veralteten Nonce enthält, wird dieser von der CSP blockiert.
- **Statische HTML-Seiten betroffen:** Bei statischen Webseiten ist die Nutzung von Nonces problematisch, da der CSP-Header mit jeder Anfrage variieren müsste.

### **Empfohlene Alternativen zu Nonces für CSP und Caching**
Um die Kompatibilität mit Caching zu verbessern, sind folgende Alternativen empfehlenswert:

1. **Hashes verwenden:** Anstatt eines Nonces kann ein Hash des Inline-Styles im CSP-Header hinterlegt werden, sodass sich gecachte Inhalte nicht ändern müssen.
   ```http
   Content-Security-Policy: style-src 'sha256-XyZ123...';
   ```
   *Vorteil:* Erlaubt gezielt bestimmte Inline-Styles, ohne einen neuen Wert bei jeder Anfrage zu generieren.

2. **Externe Stylesheets nutzen:** Der sicherste und am besten mit Caching kompatible Ansatz ist, Inline-Styles komplett zu vermeiden und stattdessen alle Stile in externe CSS-Dateien auszulagern.
   ```html
   <link rel="stylesheet" href="styles.css">
   ```
   *Vorteil:* Ermöglicht eine strikte CSP-Policy (`style-src 'self'` oder eine spezifische Domain) und optimiert die Performance durch Caching.

3. **Dynamische CSP-Anpassung mit Server-Side Rendering:** Falls dynamische Inhalte mit Inline-Styles benötigt werden, könnte eine serverseitige Lösung mit CSP-Headern pro Anfrage verwendet werden. Dies ist jedoch nicht mit Client-Side Rendering (CSR) kompatibel.

## Erwartete Probleme

Ein Hauptfokus liegt auf der Analyse von Inline-Styles. Viele Frameworks setzen standardmäßig Inline-Styles, was zu einer CSP-Verletzung führen kann. Wir erwarten, dass:
- Bestimmte Frameworks wie React oder Vue von Haus aus Inline-Styles generieren.
- Einige Lösungen (z. B. CSS-in-JS) zusätzliche Maßnahmen zur CSP-Konformität erfordern.
- Anpassungen notwendig sind, um Inline-Styles vollständig zu vermeiden.

## Alternative Lösungen

Zur Vermeidung von CSP-Verletzungen werden alternative Implementierungsmethoden dokumentiert, darunter:
- Nutzung externer Stylesheets anstelle von Inline-Styles.
- Möglichkeiten zur Deaktivierung von Inline-Styles in den Frameworks.
- Konfigurationseinstellungen, die die Erzeugung unsicherer Stile verhindern.

## 1. CSP-Implementierung mit Stencil.js

Es wurde ein Beispielprojekt mit **Stencil.js (Version 4)** erstellt, das im Verzeichnis `packages/stencil-app` zu finden ist. Ziel war es, die Einhaltung der Content Security Policy (CSP) im Zusammenspiel von Stencil.js und einem Express-Server zu analysieren. Dieses Beispiel implementiert eine sichere CSP-Policy mithilfe von Nonces, die dynamisch für jede Anfrage generiert werden.

### Verhalten von Stencil.js bei ungültigem CSP-Code

Stencil.js bietet von Haus aus Mechanismen, um CSP-Verletzungen beim Build-Prozess zu beheben und dadurch die Einhaltung strikter Richtlinien sicherzustellen. Ein Beispiel für invaliden CSP-Code ist die Verwendung von Inline-Skripten oder Inline-Styles (z. B. ein `<script>alert(...)</script>` oder ein Inline-CSS-Stil). Stencil.js transformiert solchen Code automatisch in externe JavaScript- oder CSS-Dateien.

#### Beispiel:
In einer Komponente wie `app-invalid` mit folgendem Inline-Skript und Stil:
```html
<p style={{ color: 'red' }}>Dieser Text nutzt ein Inline-Style und verletzt die CSP.</p>
<script>alert('Dies ist ein unsicheres Inline-Skript!');</script>
```

erstellt Stencil.js beim Build-Prozess eine separate JavaScript-Datei, beispielsweise `p-01883f97.system.entry.js`, die den (`alert`) enthält, anstelle das Skript direkt in das HTML einzubetten. Ebenso werden Inline-Stile in die definierte CSS-Datei (`app-invalid.css`) ausgelagert, die dann global oder innerhalb des Shadow-DOMs referenziert wird.

#### Vorteil:
- **CSP-Konformität**: Durch diese automatische Transformation vermeidet Stencil.js problematischen Inline-Code, der ohne entsprechende Nonce- oder Hash-Regeln von einer strikten CSP blockiert werden würde.
- **Sicherheit**: Inline-Inhalte werden stets in eigenständigen Dateien verwaltet, was verhindert, dass unsicherer Code sofort im DOM ausgeführt wird.
- **Performance**: Zusätzliche Vorteile ergeben sich durch das Caching der ausgelagerten Dateien, da sie unabhängig von der HTML-Struktur bereitgestellt werden können.

#### Fazit:
Stencil.js verhält sich äußerst robust gegenüber ungültigem CSP-Code. Selbst wenn Entwickler Inline-Styles oder Skripte verwenden, sorgt der Build-Prozess dafür, dass diese Elemente den CSP-Regeln entsprechen, indem sie nach externen und sicheren Ressourcen verschoben werden. Dies ermöglicht eine nahtlose Entwicklung und eine herausragende Sicherheitsunterstützung in produktiven Umgebungen.
