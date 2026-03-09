import React, { useState } from 'react';

const questions = [
  {
    question: "Welche Stellung nimmt die PRRC im Unternehmen EMIG GmbH ein?",
    options: ["Unterstellt der Logistikleitung", "Stabstelle direkt unter der Geschäftsführung", "Externer Berater ohne Befugnis"],
    correct: 1,
  },
  {
    question: "Darf die PRRC Weisungen erhalten, die ihre fachliche Urteilsfähigkeit einschränken?",
    options: ["Ja, durch die Verkaufsleitung", "Nein, sie muss weisungsfrei entscheiden können", "Nur in wirtschaftlichen Notfällen"],
    correct: 1,
  },
  {
    question: "Was ist eine Kernaufgabe der PRRC nach Artikel 15 MDR?",
    options: ["Preisverhandlung mit Lieferanten", "Sicherstellung der Berichtspflichten im Vigilanzsystem", "Reinigung der Lagerräume"],
    correct: 1,
  },
  {
    question: "Welche Befugnis hat die PRRC bei Zweifeln an der Produktkonformität?",
    options: ["Keine, sie darf nur beraten", "Sie darf die Freigabe der Produkte stoppen", "Sie muss den Verkaufspreis senken"],
    correct: 1,
  },
  {
    question: "Welche Qualifikation ist für eine PRRC unter anderem zulässig?",
    options: ["Abgeschlossenes Studium (z.B. Ingenieurwesen) + 1 Jahr Berufserfahrung im QM", "Jede kaufmännische Ausbildung", "Mindestens 10 Jahre Erfahrung im Lager"],
    correct: 0,
  }
];

export default function PrrcQuiz() {
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
    <div style={{
      padding: '2rem',
      backgroundColor: '#121212', 
      color: '#e0e0e0',           
      borderRadius: '12px',
      border: '1px solid #333',
      marginTop: '2rem'
    }}>
      {!showResult ? (
        <div>
          <div style={{ color: '#007bff', marginBottom: '1rem' }}>Frage {currentStep + 1} von {questions.length}</div>
          <h3 style={{ marginBottom: '1.5rem' }}>{questions[currentStep].question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {questions[currentStep].options.map((option, idx) => (
              <button 
                key={idx} 
                onClick={() => handleAnswer(idx)}
                style={{
                  padding: '12px', backgroundColor: '#1e1e1e', color: 'white',
                  border: '1px solid #444', borderRadius: '8px', cursor: 'pointer', textAlign: 'left'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: percentage >= 80 ? '#4caf50' : '#f44336' }}>Ergebnis: {percentage}%</h2>
          <p>{percentage >= 80 ? "✅ Bestanden! Sie kennen die Aufgaben der PRRC." : "❌ Nicht bestanden. Bitte lesen Sie SOP-REG-03 erneut."}</p>
          <button onClick={() => {setCurrentStep(0); setScore(0); setShowResult(false);}} className="button button--primary">Test wiederholen</button>
        </div>
      )}
    </div>
  );
}