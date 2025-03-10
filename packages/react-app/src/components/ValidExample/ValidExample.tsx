import React from 'react';
import './ValidExample.css'; // Referenz auf externe CSS-Datei

const ValidExample: React.FC = () => (
  <div>
    <p className="safe-style">Dieser Text nutzt eine gültige externe CSS-Datei.</p>
    <button onClick={() => alert('Sicheres Skript aufgerufen!')}>
      Klick mich
    </button>
  </div>
);

export default ValidExample;
