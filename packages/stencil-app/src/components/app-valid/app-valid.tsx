import { Component, Host, h } from '@stencil/core';

// Valide Seite (CSP-konform)
@Component({
  tag: 'app-valid',
  styleUrl: 'app-valid.css',
  shadow: true,
})
export class AppValid {
  render() {
    return (
      <Host>
        <article>
          <h2>CSP-konformer Absatz</h2>
          <p>Diese Seite enthält keine Inline-Styles oder unsichere Skripte.</p>
        </article>
        <pre>
          <code>
&lt;article&gt;
  &lt;h2&gt;CSP-konformer Absatz&lt;/h2&gt;
  &lt;p&gt;Diese Seite enthält keine Inline-Styles oder unsichere Skripte.&lt;/p&gt;
&lt;/article&gt;
          </code>
        </pre>
      </Host>
    );
  }
}
