import React, { useState } from 'react';

export default function TraceabilityQuiz() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#121212', color: 'white', borderRadius: '12px' }}>
      {!show ? (
        <div>
          <p><strong>Wie lange müssen UDI-Daten für neurochirurgische Implantate aufbewahrt werden?</strong></p>
          <button onClick={() => setShow(true)} style={{ display: 'block', margin: '10px 0', padding: '10px' }}>5 Jahre</button>
          <button onClick={() => setShow(true)} style={{ display: 'block', margin: '10px 0', padding: '10px' }}>15 Jahre</button>
        </div>
      ) : (
        <p>✅ Korrekt! 15 Jahre für Implantate, sonst 10 Jahre.</p>
      )}
    </div>
  );
}