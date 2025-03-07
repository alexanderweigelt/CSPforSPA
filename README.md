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
- `object-src`
- `base-uri`
- `require-trusted-types-for`

Beispiel für eine sichere Content Security Policy (CSP) für Browser mit einer Unterstützung von CSP in Version 3

```
script-src 'strict-dynamic' 'nonce-rAnd0m123' 'unsafe-inline' http: https:;
object-src 'none';
base-uri 'none';
require-trusted-types-for 'script';
```

Zur Bereitstellung der Testanwendungen wird entweder ein Express-Server oder eine einfache `<meta>`-Tag-Definition im `<head>`-Bereich der HTML-Datei genutzt.

## Bewertungskriterien

Die CSP-Konformität wird anhand folgender Kriterien geprüft:
- Die gesetzte Content Security Policy (CSP) muss den Test des [CSP Evaluator](https://csp-evaluator.withgoogle.com/) bestehen.
- Automatisierte Tests werden mit dem Tool [csp_evaluator](https://www.npmjs.com/package/csp_evaluator) durchgeführt.

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
