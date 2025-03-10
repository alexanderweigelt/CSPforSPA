import React from 'react';
import ValidExample from './components/ValidExample/ValidExample.tsx';
import InvalidExample from './components/InvalidExample/InvalidExample.tsx';
import './App.css'

const App: React.FC = () => {
  return (
    <>
      <div>
        <header>
          <h1>React CSP Beispiel</h1>
        </header>

        <section className="card">
          <h2>Valides Beispiel</h2>
          <ValidExample />
        </section>

        <section className="card">
          <h2>Beispiel mit CSP-Verletzung</h2>
          <InvalidExample />
        </section>
      </div>
    </>
  )
}

export default App
