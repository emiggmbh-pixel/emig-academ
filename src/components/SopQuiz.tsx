import React, { useState, useRef, useEffect } from 'react';
import { getSopT } from './LanguageSwitcher';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;        // index of correct option
  explanation: string;   // shown after answering
}

interface SopQuizProps {
  refCode: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  lang?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');

.sq-root {
  font-family: 'DM Sans', sans-serif;
  max-width: 780px;
  margin: 3rem auto 0;
}

/* ── Header ── */
.sq-header {
  background: #111116;
  border-radius: 18px 18px 0 0;
  padding: 2rem 2.5rem 1.75rem;
  position: relative;
  overflow: hidden;
}

.sq-header::before {
  content: '';
  position: absolute;
  top: -40px; right: -40px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(200,169,110,0.12), transparent 65%);
  pointer-events: none;
}

.sq-header-label {
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(200,169,110,0.75);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.6rem;
}

.sq-header-label::before {
  content: '';
  display: block;
  width: 28px;
  height: 1px;
  background: rgba(200,169,110,0.6);
}

.sq-header-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  color: #fff;
  margin: 0 0 0.4rem;
  letter-spacing: 0.06em;
}

.sq-header-sub {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
}

/* Progress bar inside header */
.sq-progress-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 1.25rem;
}

.sq-progress-track {
  flex: 1;
  height: 3px;
  background: rgba(255,255,255,0.07);
  border-radius: 99px;
  overflow: hidden;
}

.sq-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #c8a96e, #e8d5a8);
  border-radius: 99px;
  transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
}

.sq-progress-label {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.35);
  white-space: nowrap;
  font-weight: 500;
  min-width: 48px;
  text-align: right;
}

/* ── Body ── */
.sq-body {
  background: #fff;
  border-radius: 0 0 18px 18px;
  padding: 2rem 2.5rem;
  border: 1px solid #ece9e3;
  border-top: none;
}

/* ── Question ── */
.sq-q-num {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #9ca3af;
  font-weight: 600;
  margin-bottom: 0.65rem;
}

.sq-q-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.45;
  margin: 0 0 1.75rem;
}

/* ── Options ── */
.sq-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.sq-option {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1.5px solid #ece9e3;
  background: #faf9f6;
  cursor: pointer;
  transition: all 0.18s ease;
  text-align: left;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: #374151;
  font-weight: 400;
  line-height: 1.45;
}

.sq-option:hover:not(:disabled) {
  border-color: #c8a96e;
  background: #fffbf3;
  transform: translateX(3px);
}

.sq-option:disabled { cursor: not-allowed; }

/* State variants */
.sq-option.correct {
  border-color: #10b981;
  background: #f0fdf4;
  color: #065f46;
}

.sq-option.wrong {
  border-color: #ef4444;
  background: #fef2f2;
  color: #7f1d1d;
}

.sq-option.revealed {
  border-color: #d1fae5;
  background: #f0fdf4;
  opacity: 0.6;
}

/* Option letter badge */
.sq-opt-badge {
  min-width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #f0ede8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  color: #6b7280;
  flex-shrink: 0;
  margin-top: 1px;
  transition: all 0.18s;
}

.sq-option.correct .sq-opt-badge {
  background: #10b981;
  color: #fff;
}
.sq-option.wrong .sq-opt-badge {
  background: #ef4444;
  color: #fff;
}
.sq-option.revealed .sq-opt-badge {
  background: #d1fae5;
  color: #059669;
}

/* ── Explanation ── */
.sq-explanation {
  border-radius: 12px;
  padding: 1.1rem 1.3rem;
  margin-top: 0.5rem;
  animation: sq-fade 0.3s ease;
  border-left: 3px solid;
}

.sq-explanation.correct {
  background: #f0fdf4;
  border-color: #10b981;
  color: #065f46;
}
.sq-explanation.wrong {
  background: #fef2f2;
  border-color: #ef4444;
  color: #7f1d1d;
}

.sq-exp-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 5px;
  opacity: 0.7;
}

.sq-exp-text {
  font-size: 0.86rem;
  line-height: 1.55;
}

/* ── Next button ── */
.sq-next-btn {
  display: block;
  width: 100%;
  margin-top: 1.5rem;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #111116;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.02em;
}
.sq-next-btn:hover { background: #222230; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,0.14); }

/* ── Results screen ── */
.sq-result {
  text-align: center;
  padding: 1rem 0 0.5rem;
  animation: sq-fade 0.4s ease;
}

.sq-result-score-wrap {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
}

.sq-result-circle-bg {
  fill: none;
  stroke: #f0ede8;
  stroke-width: 8;
}

.sq-result-circle-fill {
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 60px 60px;
  transition: stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1);
}

.sq-result-score-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sq-result-pct {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.4rem;
  color: #111;
  line-height: 1;
  letter-spacing: 0.04em;
}

.sq-result-pct-label {
  font-size: 0.65rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
  margin-top: 2px;
}

.sq-result-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 0.4rem;
}

.sq-result-sub {
  font-size: 0.88rem;
  color: #6b7280;
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.sq-result-breakdown {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.sq-rb-item { text-align: center; }
.sq-rb-num  { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; line-height: 1; letter-spacing: 0.04em; }
.sq-rb-lbl  { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.12em; color: #9ca3af; font-weight: 600; margin-top: 3px; }

.sq-restart-btn {
  padding: 13px 32px;
  border-radius: 12px;
  border: 1.5px solid #dedad4;
  background: #fff;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  color: #374151;
  transition: all 0.2s;
  margin-right: 10px;
}
.sq-restart-btn:hover { background: #f7f5f0; }

.sq-cert-btn {
  padding: 13px 32px;
  border-radius: 12px;
  border: none;
  background: #111116;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
}
.sq-cert-btn:hover { background: #222230; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,0.14); }

@keyframes sq-fade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

// ─── Component ───────────────────────────────────────────────────────────────

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function SopQuiz({ refCode, questions, onComplete, lang: langProp }: SopQuizProps) {
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers]   = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [lang, setLang]         = useState(langProp ?? 'de');
  const bodyRef = useRef<HTMLDivElement>(null);
  const qt = getSopT(lang);

  useEffect(() => {
    if (langProp) { setLang(langProp); return; }
    try { const s = localStorage.getItem('emig_lang'); if (s && ['de','en','ru'].includes(s)) setLang(s); } catch {}
  }, [langProp]);

  const q         = questions[current];
  const answered  = selected !== null;
  const isCorrect = selected === q.correct;
  const score     = answers.filter((a, i) => a === questions[i].correct).length;
  const pct       = Math.round((score / questions.length) * 100);

  // Circle stroke math
  const r          = 52;
  const circumf    = 2 * Math.PI * r;
  const strokePct  = finished ? circumf * (1 - pct / 100) : circumf;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      bodyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      setFinished(true);
      onComplete?.(score + (isCorrect ? 1 : 0), questions.length);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setFinished(false);
  };

  const progressPct = ((current + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <>
      <style>{CSS}</style>
      <div className="sq-root" id="wissenstest">
        {/* Header */}
        <div className="sq-header">
          <div className="sq-header-label">{qt('quizLabel')}</div>
          <div className="sq-header-title">{refCode} — Quiz</div>
          <div className="sq-header-sub">
            {finished
              ? qt('questionsDone', questions.length)
              : qt('questionsOf', questions.length)}
          </div>
          <div className="sq-progress-row">
            <div className="sq-progress-track">
              <div className="sq-progress-fill" style={{ width: `${finished ? 100 : progressPct}%` }} />
            </div>
            <div className="sq-progress-label">
              {finished ? '✓' : `${current + 1} / ${questions.length}`}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="sq-body" ref={bodyRef}>
          {!finished ? (
            <div style={{ animation: 'sq-fade 0.28s ease' }} key={current}>
              <div className="sq-q-num">{`${current + 1} / ${questions.length}`}</div>
              <p className="sq-q-text">{q.question}</p>

              <div className="sq-options">
                {q.options.map((opt, i) => {
                  let cls = 'sq-option';
                  if (answered) {
                    if (i === q.correct)               cls += ' correct';
                    else if (i === selected)           cls += ' wrong';
                    else                               cls += ' revealed';
                  }
                  return (
                    <button
                      key={i}
                      className={cls}
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                    >
                      <span className="sq-opt-badge">
                        {answered && i === q.correct ? '✓'
                         : answered && i === selected ? '✗'
                         : LETTERS[i]}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className={`sq-explanation ${isCorrect ? 'correct' : 'wrong'}`}>
                  <div className="sq-exp-label">
                    {isCorrect ? qt('correct') : qt('wrong')}
                  </div>
                  <div className="sq-exp-text">{q.explanation}</div>
                </div>
              )}

              {answered && (
                <button className="sq-next-btn" onClick={handleNext}>
                  {current < questions.length - 1 ? qt('nextQ') : qt('showResult')}
                </button>
              )}
            </div>
          ) : (
            <div className="sq-result">
              {/* Score circle */}
              <div className="sq-result-score-wrap">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle className="sq-result-circle-bg" cx="60" cy="60" r={r} />
                  <circle
                    className="sq-result-circle-fill"
                    cx="60" cy="60" r={r}
                    stroke={pct >= 80 ? '#10b981' : pct >= 50 ? '#c8a96e' : '#ef4444'}
                    strokeDasharray={circumf}
                    strokeDashoffset={strokePct}
                  />
                </svg>
                <div className="sq-result-score-text">
                  <span className="sq-result-pct">{pct}%</span>
                  <span className="sq-result-pct-label">{qt('scoreLabel')}</span>
                </div>
              </div>

              <div className="sq-result-title">
                {pct >= 80
                  ? ({de:'Ausgezeichnet!',en:'Excellent!',ru:'Отлично!'}[lang]||'Ausgezeichnet!')
                  : pct >= 50
                  ? ({de:'Gut gemacht!',en:'Well done!',ru:'Хорошо!'}[lang]||'Gut gemacht!')
                  : ({de:'Nochmal versuchen',en:'Try again',ru:'Попробуйте ещё раз'}[lang]||'Nochmal versuchen')}
              </div>
              <p className="sq-result-sub">
                {pct >= 80
                  ? ({de:'Sie haben das Modul erfolgreich abgeschlossen. Ihr Wissen ist auf einem sehr guten Niveau.',en:'You have successfully completed the module. Your knowledge is at a very good level.',ru:'Вы успешно завершили модуль. Ваши знания на очень высоком уровне.'}[lang]||'')
                  : pct >= 50
                  ? ({de:'Sie sind auf dem richtigen Weg. Lesen Sie die markierten Abschnitte nochmals durch.',en:'You are on the right track. Please review the highlighted sections again.',ru:'Вы на правильном пути. Пожалуйста, повторите отмеченные разделы.'}[lang]||'')
                  : ({de:'Lesen Sie das Modul bitte erneut durch und versuchen Sie es dann nochmal.',en:'Please review the module again and then try once more.',ru:'Пожалуйста, повторно изучите модуль и попробуйте снова.'}[lang]||'')}
              </p>

              <div className="sq-result-breakdown">
                <div className="sq-rb-item">
                  <div className="sq-rb-num" style={{ color: '#10b981' }}>{score}</div>
                  <div className="sq-rb-lbl">{qt('rightLabel')}</div>
                </div>
                <div className="sq-rb-item">
                  <div className="sq-rb-num" style={{ color: '#ef4444' }}>{questions.length - score}</div>
                  <div className="sq-rb-lbl">{qt('wrongLabel')}</div>
                </div>
                <div className="sq-rb-item">
                  <div className="sq-rb-num" style={{ color: '#111' }}>{questions.length}</div>
                  <div className="sq-rb-lbl">Total</div>
                </div>
              </div>

              <div>
                <button className="sq-restart-btn" onClick={handleRestart}>
                  {qt('repeatQuiz')}
                </button>
                {pct >= 80 && (
                  <button className="sq-cert-btn">
                    Modul als abgeschlossen markieren ✓
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}