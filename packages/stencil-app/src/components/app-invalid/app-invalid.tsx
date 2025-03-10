import { Component, Host, h } from '@stencil/core';

// Fehlerhafte Seite (CSP-Verletzungen)
@Component({
  tag: 'app-invalid',
  styleUrl: 'app-invalid.css',
  shadow: true,
})
export class AppInvalid {
  render() {
    return (
      <Host>
        <article>
          <h2>Fehlerhafte CSP</h2>
          <p style={{ color: 'red' }}>Dieser Text nutzt ein Inline-Style und verletzt die CSP.</p>
          <script>alert('Dies ist ein unsicheres Inline-Skript!');</script>
        </article>
        <pre>
          <code>
&lt;article&gt;
  &lt;h2&gt;Fehlerhafte CSP&lt;/h2&gt;
  &lt;p style={{ color: 'red' }}&gt;Dieser Text nutzt ein Inline-Style und verletzt die CSP.&lt;/p&gt;
  &lt;script&gt;alert('Dies ist ein unsicheres Inline-Skript!');&lt;/script&gt;
&lt;/article&gt;
          </code>
        </pre>
      </Host>
    );
  }
}
