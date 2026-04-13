import React, { useState, useEffect } from 'react';

// ─── Constants ───────────────────────────────────────────────────────────────

export const LANGS = [
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
];

const STORAGE_KEY = 'emig_lang';

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useLanguage(): [string, (code: string) => void] {
  const [lang, setLangState] = useState('de');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ['de', 'en', 'ru'].includes(stored)) setLangState(stored);
    } catch {}
  }, []);

  const setLang = (code: string) => {
    setLangState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
  };

  return [lang, setLang];
}

// ─── Translations ────────────────────────────────────────────────────────────

export const SOP_UI: Record<string, Record<string, string>> = {
  de: {
    back:           '← Zurück',
    contents:       'Inhalt',
    progress:       'Fortschritt',
    quizLabel:      'Wissenstest',
    correct:        'Richtig!',
    wrong:          'Leider falsch',
    nextQ:          'Nächste Frage →',
    showResult:     'Ergebnis anzeigen →',
    scoreLabel:     'Score',
    rightLabel:     'Richtig',
    wrongLabel:     'Falsch',
    repeatQuiz:     'Quiz wiederholen',
    questionsOf:    (n: number) => `${n} Fragen · Wählen Sie die richtige Antwort`,
    questionsDone:  (n: number) => `${n} Fragen abgeschlossen`,
    // SOP hero meta
    validFrom:      'Gültig ab',
    chapters:       'Kapitel',
    questions:      'Fragen',
    // SOP titles
    'SOP-REG-01-title': 'Importeurpflichten\ngemäß MDR Art. 13',
    'SOP-REG-01-desc':  'Organisatorische und operative Maßnahmen, mit denen die EMIG GmbH ihre Pflichten als Importeur von Medizinprodukten aus Drittländern gemäß MDR Art. 13 erfüllt — 7-Phasen Prüfprozess, Kennzeichnung, Freigabe und Behördenzusammenarbeit.',
    'SOP-REG-02-title': 'Händlerpflichten\ngemäß MDR Art. 14',
    'SOP-REG-02-desc':  'Sicherstellung dass Medizinprodukte innerhalb der EU während Lagerung, Vertrieb und After-Sales jederzeit konform, sicher und rückverfolgbar bleiben — Stichprobenprüfung, Lagerung, Nichtkonformität und BfArM-Meldung.',
    'SOP-REG-03-title': 'PRRC\nRolle & Aufgaben',
    'SOP-REG-03-desc':  'Anforderungen, Aufgaben und Verantwortlichkeiten der Person Responsible for Regulatory Compliance (PRRC) gemäß MDR Art. 15 — Qualifikation, Befugnisse und Dokumentation.',
    'SOP-REG-04-title': 'Registrierung\nund EUDAMED',
    'SOP-REG-04-desc':  'Pflichten der EMIG GmbH zur Registrierung in der europäischen Datenbank EUDAMED gemäß MDR — Akteurenregistrierung, Produktregistrierung und UDI-Meldung.',
    'SOP-REG-05-title': 'Benannte Stellen\n& Behörden',
    'SOP-REG-05-desc':  'Umgang mit Benannten Stellen und Behörden im Rahmen von Audits und Inspektionen — Vorbereitung, Durchführung, CAPA und Dokumentation.',
    'SOP-EINK-01-title': 'Lieferantenauswahl\nund -bewertung',
    'SOP-EINK-01-desc':  'Systematische Auswahl, Qualifizierung und kontinuierliche Bewertung von Lieferanten — Klassifizierung, Erstqualifizierung, Jahresbewertung und Maßnahmenprozess.',
    'SOP-EINK-02-title': 'Beschaffung von\nMedizinprodukten',
    'SOP-EINK-02-desc':  'Standardisierter Einkaufsprozess für Medizinprodukte — von der Bedarfsmeldung über Bestellung und Wareneingang bis zur Freigabe durch die PRRC.',
    'SOP-LOG-01-title':  'Lagerung von\nMedizinprodukten',
    'SOP-LOG-01-desc':   'Anforderungen an Lagerbedingungen, Temperatur- und Feuchtigkeitsüberwachung sowie FIFO/FEFO-Prinzip für eine ordnungsgemäße und sichere Lagerung von Medizinprodukten.',
    'SOP-LOG-02-title':  'Rückverfolgbarkeit\n& UDI',
    'SOP-LOG-02-desc':   'Gewährleistung der lückenlosen Rückverfolgbarkeit aller Medizinprodukte über UDI — Scan bei Wareneingang, Verknüpfung mit SAP und Dokumentation gemäß MDR.',
    'SOP-LOG-03-title':  'Umgang mit\nSperrware',
    'SOP-LOG-03-desc':   'Identifikation, Kennzeichnung und sichere Lagerung von nicht-konformen oder gesperrten Medizinprodukten — Sperrlager, CAPA-Einleitung und Freigabeprozess.',
  },
  en: {
    back:           '← Back',
    contents:       'Contents',
    progress:       'Progress',
    quizLabel:      'Knowledge Test',
    correct:        'Correct!',
    wrong:          'Incorrect',
    nextQ:          'Next Question →',
    showResult:     'Show Result →',
    scoreLabel:     'Score',
    rightLabel:     'Correct',
    wrongLabel:     'Incorrect',
    repeatQuiz:     'Repeat Quiz',
    questionsOf:    (n: number) => `${n} Questions · Select the correct answer`,
    questionsDone:  (n: number) => `${n} Questions completed`,
    validFrom:      'Valid from',
    chapters:       'Chapters',
    questions:      'Questions',
    'SOP-REG-01-title': 'Importer Obligations\nunder MDR Art. 13',
    'SOP-REG-01-desc':  'Organizational and operational measures by which EMIG GmbH fulfills its obligations as importer of medical devices from third countries under MDR Art. 13 — 7-phase inspection process, labeling, release and authority cooperation.',
    'SOP-REG-02-title': 'Distributor Obligations\nunder MDR Art. 14',
    'SOP-REG-02-desc':  'Ensuring that medical devices within the EU remain compliant, safe and traceable at all times during storage, distribution and after-sales — spot checks, storage, non-conformity and BfArM reporting.',
    'SOP-REG-03-title': 'PRRC\nRole & Responsibilities',
    'SOP-REG-03-desc':  'Requirements, duties and responsibilities of the Person Responsible for Regulatory Compliance (PRRC) under MDR Art. 15 — qualifications, authority and documentation.',
    'SOP-REG-04-title': 'Registration\nand EUDAMED',
    'SOP-REG-04-desc':  'Obligations of EMIG GmbH for registration in the European database EUDAMED under MDR — actor registration, product registration and UDI reporting.',
    'SOP-REG-05-title': 'Notified Bodies\n& Authorities',
    'SOP-REG-05-desc':  'Handling notified bodies and authorities in the context of audits and inspections — preparation, execution, CAPA and documentation.',
    'SOP-EINK-01-title': 'Supplier Selection\nand Evaluation',
    'SOP-EINK-01-desc':  'Systematic selection, qualification and continuous evaluation of suppliers — classification, initial qualification, annual assessment and corrective action process.',
    'SOP-EINK-02-title': 'Procurement of\nMedical Devices',
    'SOP-EINK-02-desc':  'Standardized procurement process for medical devices — from purchase requisition through ordering and goods receipt to PRRC release.',
    'SOP-LOG-01-title':  'Storage of\nMedical Devices',
    'SOP-LOG-01-desc':   'Requirements for storage conditions, temperature and humidity monitoring as well as FIFO/FEFO principles for proper and safe storage of medical devices.',
    'SOP-LOG-02-title':  'Traceability\n& UDI',
    'SOP-LOG-02-desc':   'Ensuring complete traceability of all medical devices via UDI — scanning at goods receipt, linking with SAP and documentation according to MDR.',
    'SOP-LOG-03-title':  'Handling\nBlocked Goods',
    'SOP-LOG-03-desc':   'Identification, labeling and safe storage of non-conforming or blocked medical devices — quarantine stock, CAPA initiation and release process.',
  },
  ru: {
    back:           '← Назад',
    contents:       'Содержание',
    progress:       'Прогресс',
    quizLabel:      'Тест знаний',
    correct:        'Верно!',
    wrong:          'Неверно',
    nextQ:          'Следующий вопрос →',
    showResult:     'Показать результат →',
    scoreLabel:     'Результат',
    rightLabel:     'Верно',
    wrongLabel:     'Неверно',
    repeatQuiz:     'Повторить тест',
    questionsOf:    (n: number) => `${n} вопросов · Выберите правильный ответ`,
    questionsDone:  (n: number) => `${n} вопросов завершено`,
    validFrom:      'Действует с',
    chapters:       'Разделов',
    questions:      'Вопросов',
    'SOP-REG-01-title': 'Обязанности импортёра\nсогласно MDR Ст. 13',
    'SOP-REG-01-desc':  'Организационные и операционные меры, с помощью которых EMIG GmbH выполняет свои обязательства импортёра медицинских изделий из третьих стран согласно MDR Ст. 13 — 7-этапный процесс проверки, маркировка, выпуск и сотрудничество с органами.',
    'SOP-REG-02-title': 'Обязанности дистрибьютора\nсогласно MDR Ст. 14',
    'SOP-REG-02-desc':  'Обеспечение того, чтобы медицинские изделия в ЕС всегда оставались соответствующими, безопасными и прослеживаемыми — выборочный контроль, хранение, несоответствия и уведомления в BfArM.',
    'SOP-REG-03-title': 'PRRC\nРоль и функции',
    'SOP-REG-03-desc':  'Требования, задачи и ответственность лица, ответственного за соответствие нормативным требованиям (PRRC), согласно MDR Ст. 15 — квалификация, полномочия и документация.',
    'SOP-REG-04-title': 'Регистрация\nи EUDAMED',
    'SOP-REG-04-desc':  'Обязательства EMIG GmbH по регистрации в европейской базе данных EUDAMED согласно MDR — регистрация субъектов, регистрация продуктов и отчётность по UDI.',
    'SOP-REG-05-title': 'Нотифицированные органы\nи регуляторы',
    'SOP-REG-05-desc':  'Работа с нотифицированными органами и регуляторами в рамках аудитов и инспекций — подготовка, проведение, CAPA и документация.',
    'SOP-EINK-01-title': 'Выбор и оценка\nпоставщиков',
    'SOP-EINK-01-desc':  'Системный выбор, квалификация и непрерывная оценка поставщиков — классификация, первичная квалификация, годовая оценка и процесс корректирующих действий.',
    'SOP-EINK-02-title': 'Закупка\nмедицинских изделий',
    'SOP-EINK-02-desc':  'Стандартизированный процесс закупки медицинских изделий — от заявки на покупку через заказ и приёмку товара до выпуска PRRC.',
    'SOP-LOG-01-title':  'Хранение\nмедицинских изделий',
    'SOP-LOG-01-desc':   'Требования к условиям хранения, мониторингу температуры и влажности, а также принципам FIFO/FEFO для надлежащего и безопасного хранения медицинских изделий.',
    'SOP-LOG-02-title':  'Прослеживаемость\nи UDI',
    'SOP-LOG-02-desc':   'Обеспечение полной прослеживаемости всех медицинских изделий через UDI — сканирование при приёмке, привязка к SAP и документация согласно MDR.',
    'SOP-LOG-03-title':  'Работа с\nзаблокированным товаром',
    'SOP-LOG-03-desc':   'Идентификация, маркировка и безопасное хранение несоответствующих или заблокированных медицинских изделий — карантинный склад, инициирование CAPA и процесс выпуска.',
  },
};

/** Renders a translation key that may contain \n as line breaks */
export function SopTitle({ sopT, sopKey }: { sopT: (k: string) => string; sopKey: string }) {
  const parts = sopT(sopKey).split('\n');
  return (
    <>
      {parts.map((p, i) => (
        <React.Fragment key={i}>{i > 0 && <br/>}{p}</React.Fragment>
      ))}
    </>
  );
}

export function getSopT(lang: string) {
  const d = SOP_UI[lang] ?? SOP_UI['de'];
  return (key: string, ...args: any[]) => {
    const val = d[key] ?? SOP_UI['de'][key] ?? key;
    return typeof val === 'function' ? val(...args) : val;
  };
}

// ─── LanguageSwitcher component ───────────────────────────────────────────────

const CSS_SWITCHER = `
.emig-lang-bar{display:flex;align-items:center;gap:3px;background:rgba(0,0,0,.07);border:1px solid rgba(0,0,0,.1);border-radius:99px;padding:4px;backdrop-filter:blur(8px);}
.emig-lang-btn{display:flex;align-items:center;gap:5px;padding:6px 13px;border-radius:99px;border:none;background:transparent;font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:700;cursor:pointer;color:rgba(0,0,0,.45);transition:all .2s;white-space:nowrap;letter-spacing:.05em;}
.emig-lang-btn:hover{color:rgba(0,0,0,.8);background:rgba(0,0,0,.06);}
.emig-lang-btn.active{background:#1a1a2e;color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.2);}
.emig-lang-flag{font-size:.85rem;line-height:1;}
[data-theme='dark'] .emig-lang-bar{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.12);}
[data-theme='dark'] .emig-lang-btn{color:rgba(255,255,255,.5);}
[data-theme='dark'] .emig-lang-btn:hover{color:rgba(255,255,255,.85);background:rgba(255,255,255,.06);}
[data-theme='dark'] .emig-lang-btn.active{background:rgba(255,255,255,.14);color:#fff;}
`;

export function LanguageSwitcher({ lang, setLang }: { lang: string; setLang: (code: string) => void }) {
  return (
    <>
      <style>{CSS_SWITCHER}</style>
      <div className="emig-lang-bar">
        {LANGS.map(l => (
          <button
            key={l.code}
            className={`emig-lang-btn${lang === l.code ? ' active' : ''}`}
            onClick={() => setLang(l.code)}
          >
            <span className="emig-lang-flag">{l.flag}</span>
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── LangSwitcherBar — standalone floating bar for doc pages ─────────────────

export function LangSwitcherBar() {
  const [lang, setLang] = useLanguage();
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
      <LanguageSwitcher lang={lang} setLang={setLang} />
    </div>
  );
}

export default LanguageSwitcher;
