import React, { useState } from 'react';

const questions = [
  {
    question: "Welche Lieferantenklasse umfasst Hersteller von Medizinprodukten?",
    options: ["Klasse C", "Klasse B", "Klasse A (Kritisch)"],
    correct: 2,
  },
  {
    question: "Welches Dokument ist für die Erstqualifizierung eines Herstellers zwingend?",
    options: ["Marketingplan", "Gültiges CE-Zertifikat", "Mitarbeiterliste"],
    correct: 1,
  }
];

export default function SupplierQuiz() {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (idx) => {
    if (idx === questions[0].correct) setScore(score + 1);
    setShowResult(true);
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '10px', border: '1px solid #ddd' }}>
      {!showResult ? (
        <div>
          <p><strong>{questions[0].question}</strong></p>
          {questions[0].options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)} style={{ display: 'block', margin: '10px 0', padding: '8px', cursor: 'pointer' }}>{opt}</button>
          ))}
        </div>
      ) : (
        <p>Vielen Dank für die Teilnahme! Ihr Ergebnis wird im System vermerkt.</p>
      )}
    </div>
  );
}