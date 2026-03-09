import React, { useState } from 'react';

const questions = [
  {
    question: "Was ist die SRN?",
    options: [
      "Eine interne Lagernummer", 
      "Die Single Registration Number zur Identifikation als Wirtschaftsakteuer", 
      "Die Seriennummer eines Medizinprodukts"
    ],
    correct: 1,
  },
  {
    question: "Welche Behörde validiert den Registrierungsantrag der EMIG GmbH in Deutschland?",
    options: ["Das Gewerbeamt Reutlingen", "Die EU-Kommission", "Das BfArM"],
    correct: 2,
  },
  {
    question: "Innerhalb welcher Frist müssen Datenänderungen in EUDAMED gemeldet werden?",
    options: ["Innerhalb von 24 Stunden", "Innerhalb von einer Woche", "Innerhalb von drei Monaten"],
    correct: 1,
  },
  {
    question: "Wer ist primär für die Richtigkeit der EUDAMED-Daten verantwortlich?",
    options: ["Die IT-Abteilung", "Die PRRC", "Der externe Logistikpartner"],
    correct: 1,
  },
  {
    question: "Was droht bei einer fehlenden oder falschen SRN?",
    options: ["Nichts, die SRN ist freiwillig", "Ein Importstopp durch den Zoll", "Lediglich ein kleiner Hinweis im nächsten Audit"],
    correct: 1,
  }
];

export default function EudamedQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
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
          <div style={{ color: '#2e7d32', fontWeight: 'bold', marginBottom: '1rem' }}>Frage {currentStep + 1} von {questions.length}</div>
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
          <p>{percentage >= 80 ? "✅ Exzellent! Sie sind bereit für die EUDAMED-Administration." : "❌ Das reicht noch nicht ganz. Bitte prüfen Sie die Fristen in SOP-REG-04 erneut."}</p>
          <button onClick={() => {setCurrentStep(0); setScore(0); setShowResult(false);}} className="button button--success">Test wiederholen</button>
        </div>
      )}
    </div>
  );
}