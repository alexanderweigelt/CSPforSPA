import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <Host>
        <header>
            <h1>
              Stencil App Example
            </h1>
        </header>

        <main>
          <app-valid></app-valid>
          <app-invalid></app-invalid>
        </main>
      </Host>
    );
  }
}
