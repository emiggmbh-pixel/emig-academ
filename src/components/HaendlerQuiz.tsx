import React, { useState } from 'react';

const questions = [
  {
    question: "Welche Sprachanforderung gilt für die Gebrauchsanweisung (IFU) bei der Bereitstellung?",
    options: ["Nur Englisch ist ausreichend", "Deutsch ist zwingend erforderlich", "Die Sprache ist beliebig"],
    correct: 1,
  },
  {
    question: "Was muss die Logistik bei der Bereitstellung stichprobenartig prüfen?",
    options: ["Den Verkaufspreis", "Die CE-Kennzeichnung und UDI", "Die Farbe der Umverpackung"],
    correct: 1,
  },
  {
    question: "Darf die EMIG GmbH die Zweckbestimmung eines Produkts ändern?",
    options: ["Ja, nach Rücksprache", "Nein, es dürfen keine Änderungen vorgenommen werden", "Nur bei Klasse I Produkten"],
    correct: 1,
  },
  {
    question: "An wen muss eine Meldung bei einer schwerwiegenden Gefahr erfolgen?",
    options: ["Nur an den Vermieter", "An die Bundesoberbehörde (BfArM)", "An die lokale Presse"],
    correct: 1,
  },
  {
    question: "Wie lange ist die Aufbewahrungsfrist für implantierbare Produkte?",
    options: ["10 Jahre", "15 Jahre", "5 Jahre"],
    correct: 1,
  }
];

export default function HaendlerQuiz() {
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
      backgroundColor: '#121212', 
      color: '#e0e0e0',           
      borderRadius: '12px',
      border: '1px solid #333',
      marginTop: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
    }}>
      {!showResult ? (
        <div>
          <div style={{ marginBottom: '1rem', color: '#007bff', fontWeight: 'bold' }}>
            Frage {currentStep + 1} von {questions.length}
          </div>
          <h3 style={{ marginBottom: '1.5rem', lineHeight: '1.4' }}>{questions[currentStep].question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {questions[currentStep].options.map((option, idx) => (
              <button 
                key={idx}
                onClick={() => handleAnswer(idx)}
                style={{
                  padding: '14px',
                  backgroundColor: '#1e1e1e',
                  color: 'white',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '1rem'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: percentage >= 80 ? '#4caf50' : '#f44336' }}>
            Ergebnis: {percentage}%
          </h2>
          <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
            {percentage >= 80 
              ? "Hervorragend! Sie haben die Händlerpflichten sicher verstanden." 
              : "Das Ziel von 80% wurde nicht erreicht. Bitte wiederholen Sie das Modul."}
          </p>
          <button 
            onClick={() => {setCurrentStep(0); setScore(0); setShowResult(false);}}
            style={{ 
              padding: '12px 25px', 
              cursor: 'pointer', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            Test neu starten
          </button>
        </div>
      )}
    </div>
  );
}