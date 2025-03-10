import React from 'react';
import './InvalidExample.css'; // Referenz auf externe CSS-Datei

const InvalidExample: React.FC = () => {
  const handleUnsafeScript = () => {
    // Dynamisches Hinzufügen eines Inline-Skripts, das von CSP eigentlich geblockt wird
    const script = document.createElement('script');
    script.innerHTML = "alert('Unsicheres Inline-Skript!');";
    document.body.appendChild(script);
  };

  return (
    <div>
      <style>{`.unsafe { color: red; }`}</style>

      <p className="unsafe">
        Dieser Text nutzt ein Inline-Style und verletzt die CSP.
      </p>

      <button onClick={handleUnsafeScript}>
        Klick mich (unsicher)
      </button>

      <p style={{ color: 'red' }}>Dieser Text ist rot.</p>
    </div>
  );
};

export default InvalidExample;
