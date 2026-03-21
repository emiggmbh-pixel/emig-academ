import React, { useState } from 'react';

export default function BlockedGoodsQuiz() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#121212', color: 'white', borderRadius: '12px' }}>
      {!show ? (
        <div>
          <p><strong>Woran erkennt man Sperrware im Lager physisch?</strong></p>
          <button onClick={() => setShow(true)} style={{ display: 'block', margin: '10px 0', padding: '10px' }}>An der gelben/roten Kennzeichnung</button>
          <button onClick={() => setShow(true)} style={{ display: 'block', margin: '10px 0', padding: '10px' }}>Gar nicht, nur im System</button>
        </div>
      ) : (
        <p>✅ Richtig! Eine physische Kennzeichnung und Trennung sind zwingend erforderlich.</p>
      )}
    </div>
  );
}