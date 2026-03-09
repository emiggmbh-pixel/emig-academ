import React, { useState } from 'react';

const content = {
  de: {
    questions: [
      { q: "Wer trägt die Gesamtverantwortung für die Importeurpflichten?", o: ["Logistikleiter", "Geschäftsführung", "Einkauf"], c: 1 },
      { q: "Wie lange müssen Checklisten aufbewahrt werden?", o: ["2 Jahre", "5 Jahre", "10 Jahre"], c: 2 },
      { q: "Wer darf die finale Freigabe zur Distribution erteilen?", o: ["Nur die PRRC", "Jeder Lagermitarbeiter", "Der Lieferant"], c: 0 },
      { q: "Was muss EMIG auf der Verpackung anbringen?", o: ["CE-Logo", "Name und Anschrift der EMIG GmbH", "Foto des Herstellers"], c: 1 }
    ],
    result: "Ergebnis",
    pass: "✅ Bestanden! Schulung erfolgreich abgeschlossen.",
    fail: "❌ Nicht bestanden. Bitte erneut lesen.",
    retry: "Test wiederholen",
    step: "Frage"
  },
  en: {
    questions: [
      { q: "Who carries overall responsibility for importer obligations?", o: ["Logistics Manager", "Management", "Procurement"], c: 1 },
      { q: "How long must checklists be archived?", o: ["2 years", "5 years", "10 years"], c: 2 },
      { q: "Who is allowed to grant the final release?", o: ["PRRC only", "Any warehouse staff", "The supplier"], c: 0 },
      { q: "What must EMIG add to the packaging?", o: ["CE Logo", "Name and address of EMIG GmbH", "Manufacturer photo"], c: 1 }
    ],
    result: "Result",
    pass: "✅ Passed! Training completed successfully.",
    fail: "❌ Failed. Please read the SOP again.",
    retry: "Retry Test",
    step: "Question"
  }
};

export default function SopQuiz() {
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const activeContent = content[lang];
  const questions = activeContent.questions;

  const handleAnswer = (index: number) => {
    if (index === questions[currentStep].c) {
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
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#ffffff', borderRadius: '12px', border: '1px solid #333', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '15px' }}>
        <button onClick={() => setLang('de')} style={{ cursor: 'pointer', opacity: lang === 'de' ? 1 : 0.5 }}>DE</button>
        <button onClick={() => setLang('en')} style={{ cursor: 'pointer', opacity: lang === 'en' ? 1 : 0.5 }}>EN</button>
      </div>

      {!showResult ? (
        <div>
          <span style={{ color: '#aaa', fontSize: '0.8rem' }}>{activeContent.step} {currentStep + 1} / {questions.length}</span>
          <h3 style={{ margin: '1rem 0' }}>{questions[currentStep].q}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions[currentStep].o.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} style={{ padding: '12px', backgroundColor: '#333', color: 'white', border: '1px solid #444', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>{activeContent.result}: {percentage}%</h2>
          <p>{percentage >= 80 ? activeContent.pass : activeContent.fail}</p>
          <button onClick={() => {setCurrentStep(0); setScore(0); setShowResult(false);}} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
            {activeContent.retry}
          </button>
        </div>
      )}
    </div>
  );
}