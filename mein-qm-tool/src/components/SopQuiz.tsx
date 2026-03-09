import React, { useState } from 'react';

const questions = [
  {
    question: "Wer trägt die Gesamtverantwortung für die Einhaltung der Importeurpflichten?",
    options: ["Logistikleiter", "Geschäftsführung", "Einkauf"],
    correct: 1,
  },
  {
    question: "Wie lange müssen Importeur-Checklisten aufbewahrt werden?",
    options: ["2 Jahre", "5 Jahre", "10 Jahre"],
    correct: 2,
  },
  {
    question: "Wer darf die finale Freigabe zur Distribution erteilen?",
    options: ["Nur die PRRC", "Jeder Lagermitarbeiter", "Der externe Lieferant"],
    correct: 0,
  },
  {
    question: "Was muss die EMIG GmbH auf dem Produkt/Verpackung anbringen?",
    options: ["Nur das CE-Logo", "Name und Anschrift der EMIG GmbH", "Ein Foto des Herstellers"],
    correct: 1,
  }
];

export default function SopQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[currentStep].correct) {
      setScore(score + 1);
    }

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#1a1a1a', // Dunkler Hintergrund
      color: '#ffffff',           // Weiße Schrift
      borderRadius: '12px',
      border: '1px solid #333',
      marginTop: '2rem',
      fontFamily: 'sans-serif'
    }}>
      {!showResult ? (
        <div>
          <span style={{ color: '#aaa', fontSize: '0.8rem' }}>Frage {currentStep + 1} von {questions.length}</span>
          <h3 style={{ margin: '1rem 0' }}>{questions[currentStep].question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions[currentStep].options.map((option, idx) => (
              <button 
                key={idx}
                onClick={() => handleAnswer(idx)}
                style={{
                  padding: '12px',
                  backgroundColor: '#333',
                  color: 'white',
                  border: '1px solid #444',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#444')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#333')}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>Ergebnis: {percentage}%</h2>
          <p>{percentage >= 80 ? "✅ Bestanden! Sie haben die Schulung erfolgreich abgeschlossen." : "❌ Nicht bestanden. Bitte lesen Sie die SOP erneut."}</p>
          <button 
            onClick={() => {setCurrentStep(0); setScore(0); setShowResult(false);}}
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Test wiederholen
          </button>
        </div>
      )}
    </div>
  );
}