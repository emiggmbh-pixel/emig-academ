import React, { useState } from 'react';

// Beispielhaft für SOP-LOG-03
export function BlockedGoodsQuiz() {
  const [show, setShow] = useState(false);
  const handle = () => setShow(true);

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#fff3e0', borderRadius: '10px', border: '1px solid #ffe0b2' }}>
      {!show ? (
        <div>
          <p><strong>Wer darf über die endgültige Vernichtung oder Freigabe von Sperrware entscheiden?</strong></p>
          <button onClick={handle} style={{ display: 'block', margin: '10px 0' }}>Jeder Lagermitarbeiter</button>
          <button onClick={handle} style={{ display: 'block', margin: '10px 0' }}>Die PRRC oder Geschäftsführung</button>
        </div>
      ) : (
        <p>✅ Korrekt! Nur autorisierte Personen wie die PRRC dürfen Sperrungen aufheben[cite: 1274].</p>
      )}
    </div>
  );
}