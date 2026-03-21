import React, { useState } from 'react';

const questions = [
  {
    question: "Was muss jede Bestellanforderung zwingend enthalten?",
    options: [
      "Eindeutige Produktbezeichnungen und Artikelnummern", 
      "Nur den ungefähren Preis", 
      "Die private Adresse des Einkäufers"
    ],
    correct: 0,
  },
  {
    question: "Welche Rolle prüft stichprobenartig die EUDAMED-Daten vor einer Bestellung?",
    options: ["Die Buchhaltung", "Der Lagerist", "Die PRRC"],
    correct: 2,
  },
  {
    question: "Warum werden Auftragsbestätigungen sofort auf Abweichungen geprüft?",
    options: [
      "Um die Rückverfolgbarkeit sicherzustellen", 
      "Um das Papierarchiv zu füllen", 
      "Das ist nicht notwendig"
    ],
    correct: 0,
  }
];

export default function PurchaseQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    if (index === questions[currentStep].correct) setScore(score + 1);
    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#121212', color: '#e0e0e0', borderRadius: '12px', border: '1px solid #333', marginTop: '2rem' }}>
      {!showResult ? (
        <div>
          <div style={{ color: '#1565c0', fontWeight: 'bold', marginBottom: '1rem' }}>Frage {currentStep + 1} von {questions.length}</div>
          <h3 style={{ marginBottom: '1.5rem' }}>{questions[currentStep].question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {questions[currentStep].options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} style={{ padding: '12px', backgroundColor: '#1e1e1e', color: 'white', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: percentage >= 80 ? '#4caf50' : '#f44336' }}>Ergebnis: {percentage}%</h2>
          <p>{percentage >= 80 ? "✅ Beschaffungsprozess verstanden!" : "❌ Bitte prüfen Sie die SOP-EINK-02 erneut."}</p>
          <button onClick={() => {setCurrentStep(0); setScore(0); setShowResult(false);}} className="button button--info">Test wiederholen</button>
        </div>
      )}
    </div>
  );
}