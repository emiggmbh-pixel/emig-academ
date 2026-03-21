import React, { useState } from 'react';

const questions = [
  {
    question: "Welches Prinzip muss bei der Lagerung zwingend beachtet werden?",
    options: ["LIFO (Last-In-First-Out)", "FIFO (First-In-First-Out)", "Lagerung nach Farbe"],
    correct: 1,
  },
  {
    question: "Ist eine Lagerung direkt auf dem Boden zulässig?",
    options: ["Ja, wenn der Boden sauber ist", "Nur kurzzeitig", "Nein, Ware muss in Regale oder auf Paletten"],
    correct: 2,
  }
];

export default function StorageQuiz() {
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);

  const handle = (idx) => {
    if (idx === questions[0].correct) setScore(1);
    setShow(true);
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#121212', color: 'white', borderRadius: '12px' }}>
      {!show ? (
        <div>
          <p>{questions[0].question}</p>
          {questions[0].options.map((opt, i) => (
            <button key={i} onClick={() => handle(i)} style={{ display: 'block', margin: '10px 0', padding: '10px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>{opt}</button>
          ))}
        </div>
      ) : (
        <p>Ergebnis gespeichert. Vielen Dank!</p>
      )}
    </div>
  );
}