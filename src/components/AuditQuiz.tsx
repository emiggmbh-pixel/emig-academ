import React, { useState } from 'react';

const questions = [
  {
    question: "Wer koordiniert fachspezifische Anfragen von Behörden zentral?",
    options: ["Die Buchhaltung", "Die PRRC", "Jeder Mitarbeiter, der den Anruf annimmt"],
    correct: 1,
  },
  {
    question: "Was muss bei einer Inspektion unverzüglich vorgelegt werden können?",
    options: ["Aktuelle Schulungsnachweise und Wareneingangsprotokolle", "Die Marketingstrategie für das nächste Jahr", "Kaffeemaschinen-Wartungsprotokolle"],
    correct: 0,
  },
  {
    question: "Wer begleitet den Inspektor während des gesamten Aufenthalts?",
    options: ["Ein Praktikant", "Niemand, er darf sich frei bewegen", "Die PRRC oder die QMB"],
    correct: 2,
  },
  {
    question: "Was droht bei einem Fristversäumnis von Sicherheitsmeldungen?",
    options: ["Eine mündliche Verwarnung", "Der Entzug der Vertriebsberechtigung", "Es gibt keine festen Fristen"],
    correct: 1,
  },
  {
    question: "Wie werden festgestellte Abweichungen nach einer Inspektion bearbeitet?",
    options: ["Gar nicht", "Über den Korrekturmaßnahmen-Prozess (CAPA)", "Durch Löschen der alten Aufzeichnungen"],
    correct: 1,
  }
];

export default function AuditQuiz() {
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
          <div style={{ color: '#2e7d32', fontWeight: 'bold', marginBottom: '1rem' }}>Audit-Check: Frage {currentStep + 1} von {questions.length}</div>
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
          <h2 style={{ color: percentage >= 80 ? '#4caf50' : '#f44336' }}>Bereitschaft: {percentage}%</h2>
          <p>{percentage >= 80 ? "✅ Sie sind audit-bereit! Die EMIG GmbH ist bei Ihnen in guten Händen." : "❌ Bitte lesen Sie das Audit-Protokoll in SOP-REG-05 erneut."}</p>
          <button onClick={() => {setCurrentStep(0); setScore(0); setShowResult(false);}} className="button button--success">Quiz neu starten</button>
        </div>
      )}
    </div>
  );
}