import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

// ─── DATEN ─────────────────────────────────────────────────────────────────

const ALL_QM_MODULES = [
  'SOP-LOG-01', 'SOP-LOG-02', 'SOP-LOG-03', 'SOP-LOG-04',
  'SOP-EINK-01', 'SOP-EINK-02',
  'SOP-REG-01', 'SOP-REG-02', 'SOP-REG-03', 'SOP-REG-05',
];

const RIWOSPINE_PRODUCTS = [
  { title: 'Vertebris Stenose', refCode: 'RIWO-01', link: '/docs/medizinprodukte/riwospine/stenose', icon: '🦴', desc: 'Vollendoskopische Dekompression bei spinaler Stenose' },
  { title: 'Vertebris Lumbar', refCode: 'RIWO-02', link: '/docs/medizinprodukte/riwospine/lumbar', icon: '🔬', desc: 'Bandscheibenchirurgie der Lendenwirbelsäule' },
  { title: 'Vertebris Cervical', refCode: 'RIWO-03', link: '/docs/medizinprodukte/riwospine/cervical', icon: '🏥', desc: 'Vollendoskopische Chirurgie der Halswirbelsäule' },
  { title: 'Instrumentarium & Optiken', refCode: 'RIWO-04', link: '/docs/medizinprodukte/riwospine/instrumente', icon: '🔧', desc: 'Hochpräzisions-Endoskope & Instrumente' },
];

const SAP_PHASES = [
  {
    id: 'vertrieb', title: 'Vertrieb & Angebot', icon: '📊', color: '#667eea',
    steps: [
      { label: 'Anfrageeingang', detail: 'Kunde sieht Produkt im digitalen Katalog und sendet Anfrage per E-Mail oder Formular ein.' },
      { label: 'CRM & Kalkulation', detail: 'Auswahl des Kunden und Kalkulation in SAP. Das System zeigt automatisch Einkaufspreis und Marge an.' },
      { label: 'PDF-Angebot', detail: 'Erstellung und Versand des Angebots als PDF direkt aus dem SAP-System.' },
      { label: 'Kundenauftrag', detail: 'Umwandlung des Angebots in einen Kundenauftrag. Bestandsreservierung findet automatisch statt.' },
    ],
  },
  {
    id: 'beschaffung', title: 'Beschaffung & WE', icon: '📦', color: '#f093fb',
    steps: [
      { label: 'Bestellvorschläge', detail: 'SAP prüft Mindestbestände und generiert automatisch Bestellvorschläge für den Einkauf.' },
      { label: 'Lieferantenbestellung', detail: 'Bestellung beim Lieferanten in Einkaufseinheiten (Karton/Palette). Buchung in SAP.' },
      { label: 'Wareneingang', detail: 'LKW liefert Ware. Buchung von z.B. 150 Stück direkt ins Lager-Buchungssystem.' },
      { label: 'MDR-Check', detail: 'Scan von UDI/Barcode, Erfassung von Charge und Verfallsdatum gemäß MDR-Pflicht.' },
    ],
  },
  {
    id: 'lager', title: 'Lager & Versand', icon: '🏭', color: '#4facfe',
    steps: [
      { label: 'Pickliste', detail: 'Trigger: Kundenauftrag freigegeben. SAP generiert automatisch die Entnahmeliste für das Lager.' },
      { label: 'MDR-Pflicht Scan', detail: 'Lagerist scannt beim Entnehmen die konkrete Charge und Seriennummer für den Kunden.' },
      { label: 'Versandpapiere', detail: 'Verpackung und Erstellung aller Lieferpapiere und Etiketten direkt aus SAP.' },
    ],
  },
  {
    id: 'service', title: 'Service-Prozess', icon: '🔩', color: '#43e97b',
    steps: [
      { label: 'Serviceabruf', detail: 'Anlage eines Serviceauftrags: Szenario A (Vor-Ort-Service) oder Szenario B (Rücksendung/RMA).' },
      { label: 'Ersatzteilmanagement', detail: 'Entnahme vom Techniker-Wagen oder direkt vom Hauptlager. Buchung in Echtzeit.' },
      { label: 'Equipment-Update', detail: 'Aktualisierung der Gerätestammkarte bei Austausch von Seriennummern und Komponenten.' },
    ],
  },
];

const MANUFACTURERS = [
  { id: 'riwo', name: 'RIWOspine', logo: '/img/logo-riwospine.png' },
  { id: 'inomed', name: 'inomed', logo: '/img/logo-inomed.png' },
  { id: 'oncosem', name: 'oncosem', logo: '/img/logo-oncosem.png' },
  { id: 'bfmg', name: 'Black Forest Medical', logo: '/img/logo-bfmg.png' },
  { id: 'meyer', name: 'Meyer-Haake', logo: '/img/logo-meyer.png' },
  { id: 'brainlab', name: 'Brainlab', logo: '/img/logo-brainlab.png' },
];

// ─── STYLES (CSS-in-JS Konstanten) ─────────────────────────────────────────

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; }

  .ea-root { font-family: 'DM Sans', sans-serif; }

  .ea-hero {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    min-height: 560px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .ea-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(10,10,20,0.75) 0%, rgba(30,10,60,0.55) 100%);
    backdrop-filter: blur(1px);
    z-index: 1;
  }

  .ea-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
  }

  .ea-hero-badge {
    display: inline-block;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.9);
    padding: 6px 18px;
    border-radius: 50px;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(10px);
  }

  .ea-hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3rem, 9vw, 6rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.0;
    margin: 0 0 1rem;
    text-shadow: 0 4px 30px rgba(0,0,0,0.4);
    letter-spacing: -0.02em;
  }

  .ea-hero-title span {
    background: linear-gradient(90deg, #a78bfa, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .ea-hero-sub {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.75);
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.05em;
  }

  .ea-hero-stats {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-top: 2.5rem;
    flex-wrap: wrap;
  }

  .ea-stat {
    text-align: center;
    color: #fff;
  }

  .ea-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
  }

  .ea-stat-label {
    font-size: 0.75rem;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }

  .ea-nav {
    display: flex;
    gap: 12px;
    padding: 2rem 0 0;
    flex-wrap: wrap;
    justify-content: center;
  }

  .ea-nav-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: 16px;
    border: 2px solid transparent;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;
    flex: 1 1 160px;
    justify-content: center;
    max-width: 220px;
  }

  .ea-nav-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

  .ea-nav-btn.active { border-color: transparent; }

  .ea-section-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #1a1a2e;
  }

  .ea-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #e2e8f0, transparent);
  }

  .ea-section-accent {
    display: inline-block;
    width: 6px;
    height: 28px;
    border-radius: 3px;
  }

  .ea-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04);
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .ea-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 20px 20px 0 0;
  }

  .ea-card:hover {
    box-shadow: 0 12px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04);
    transform: translateY(-3px);
  }

  .ea-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    margin-bottom: 2.5rem;
  }

  .ea-progress-ring-wrap {
    max-width: 480px;
    margin: 0 auto 2.5rem;
    background: #fff;
    border-radius: 20px;
    padding: 1.5rem 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04);
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .ea-progress-bar-wrap {
    flex: 1;
  }

  .ea-progress-bar-bg {
    background: #f1f5f9;
    border-radius: 99px;
    height: 10px;
    overflow: hidden;
  }

  .ea-progress-bar-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #10b981, #34d399);
    transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ea-progress-percent {
    font-family: 'Syne', sans-serif;
    font-size: 2.2rem;
    font-weight: 800;
    color: #10b981;
    min-width: 70px;
    text-align: right;
  }

  .ea-final-test {
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .ea-philo-card {
    background: linear-gradient(135deg, #fff7ed, #fff);
    border-radius: 20px;
    padding: 2rem 2.5rem;
    border-left: 6px solid #e65100;
    margin-bottom: 2.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .ea-mfr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .ea-mfr-card {
    background: #fff;
    border-radius: 20px;
    padding: 2.5rem 2rem;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04);
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .ea-mfr-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.1);
  }

  .ea-mfr-card::after {
    content: '→';
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
    font-size: 1.2rem;
    opacity: 0;
    transition: all 0.2s;
    transform: translateX(-4px);
  }

  .ea-mfr-card:hover::after {
    opacity: 1;
    transform: translateX(0);
  }

  .ea-sap-phase-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
    margin-bottom: 2rem;
  }

  .ea-sap-phase-btn {
    padding: 1.5rem;
    border-radius: 18px;
    border: 2px solid #e2e8f0;
    background: #fff;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease;
    font-family: 'DM Sans', sans-serif;
  }

  .ea-sap-phase-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  .ea-sap-phase-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.75rem;
  }

  .ea-sap-phase-title {
    font-weight: 700;
    font-size: 0.95rem;
    line-height: 1.3;
  }

  .ea-sap-detail {
    background: #fff;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    animation: fadeSlide 0.3s ease;
  }

  .ea-sap-steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 14px;
    margin-top: 1.5rem;
  }

  .ea-sap-step {
    padding: 1.25rem;
    border-radius: 14px;
    background: #f8fafc;
    border-left: 4px solid;
    transition: background 0.2s;
  }

  .ea-sap-step:hover { background: #f1f5f9; }

  .ea-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    margin-bottom: 2rem;
    color: #374151;
    transition: all 0.2s;
  }

  .ea-back-btn:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    transform: translateX(-2px);
  }

  .ea-link-btn {
    display: block;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    font-weight: 700;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.2s;
    margin-top: auto;
  }

  .ea-link-btn:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  .ea-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .ea-welcome-strip {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    padding: 1.5rem 2rem;
    color: #fff;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    box-shadow: 0 8px 24px rgba(102,126,234,0.35);
  }

  .ea-checklist-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 1.5rem;
  }

  .ea-checklist-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: #f8fafc;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 500;
    color: #374151;
  }

  .ea-checklist-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .ea-skeleton {
    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
  }

  .ea-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #f1f5f9;
    color: #64748b;
    padding: 3px 10px;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    font-family: 'SF Mono', 'Fira Code', monospace;
  }
`;

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────

function ManufacturerCard({ m, onClick, colorMed }: any) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = useBaseUrl(m.logo);

  return (
    <div
      className="ea-mfr-card"
      onClick={onClick}
      style={{ borderTop: `4px solid ${colorMed}` }}
    >
      <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        {!imgError ? (
          <img src={logoUrl} alt={m.name} style={{ maxWidth: '85%', maxHeight: '100%', objectFit: 'contain' }} onError={() => setImgError(true)} />
        ) : (
          <span style={{ fontWeight: 700, color: colorMed, fontSize: '1.25rem' }}>{m.name}</span>
        )}
      </div>
      <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em' }}>
        Produktschulungen
      </div>
    </div>
  );
}

function SAPDashboard({ colorSAP }: { colorSAP: string }) {
  const [activePhase, setActivePhase] = useState<any>(null);
  const [readSteps, setReadSteps] = useState<string[]>([]);

  const toggleRead = (key: string) => {
    setReadSteps(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="ea-section-title">
          <div className="ea-section-accent" style={{ background: colorSAP }} />
          Interaktive SAP Prozesslandschaft
        </div>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
          Klicken Sie auf eine Prozessphase, um die einzelnen Schritte zu erkunden.
        </p>
      </div>

      <div className="ea-sap-phase-grid">
        {SAP_PHASES.map((phase) => {
          const isActive = activePhase?.id === phase.id;
          return (
            <button
              key={phase.id}
              className="ea-sap-phase-btn"
              onClick={() => setActivePhase(isActive ? null : phase)}
              style={{
                background: isActive ? phase.color : '#fff',
                borderColor: isActive ? phase.color : '#e2e8f0',
                color: isActive ? '#fff' : '#1e293b',
                boxShadow: isActive ? `0 8px 24px ${phase.color}40` : undefined,
              }}
            >
              <span className="ea-sap-phase-icon">{phase.icon}</span>
              <span className="ea-sap-phase-title">{phase.title}</span>
              <div style={{ marginTop: '8px', fontSize: '0.75rem', opacity: 0.7 }}>
                {phase.steps.length} Schritte
              </div>
            </button>
          );
        })}
      </div>

      {activePhase && (
        <div className="ea-sap-detail">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.75rem' }}>{activePhase.icon}</span>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'Syne, sans-serif', color: '#1e293b' }}>{activePhase.title}</h3>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                {readSteps.filter(k => k.startsWith(activePhase.id)).length}/{activePhase.steps.length} Schritte gelesen
              </div>
            </div>
          </div>

          {/* Mini progress for this phase */}
          <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '99px', marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: activePhase.color,
              borderRadius: '99px',
              width: `${(readSteps.filter(k => k.startsWith(activePhase.id)).length / activePhase.steps.length) * 100}%`,
              transition: 'width 0.5s ease',
            }} />
          </div>

          <div className="ea-sap-steps-grid">
            {activePhase.steps.map((step: any, i: number) => {
              const key = `${activePhase.id}-${i}`;
              const done = readSteps.includes(key);
              return (
                <div
                  key={i}
                  className="ea-sap-step"
                  style={{
                    borderLeftColor: done ? '#10b981' : activePhase.color,
                    background: done ? '#f0fdf4' : '#f8fafc',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleRead(key)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: done ? '#10b981' : activePhase.color }}>
                      {i + 1}. {step.label}
                    </span>
                    {done && <span style={{ fontSize: '1rem' }}>✅</span>}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.5 }}>{step.detail}</p>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', color: done ? '#10b981' : '#94a3b8', fontWeight: 600 }}>
                    {done ? 'Gelesen ✓' : '→ Klicken zum Abhaken'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!activePhase && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontStyle: 'italic' }}>
          Wählen Sie eine Phase oben aus, um zu beginnen.
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  const [activeCategory, setActiveCategory] = useState('QM');
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<any>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('emig_progress');
    if (saved) { try { setCompletedModules(JSON.parse(saved)); } catch (_) {} }

    const h = new Date().getHours();
    if (h < 12) setGreeting('Guten Morgen');
    else if (h < 17) setGreeting('Guten Tag');
    else setGreeting('Guten Abend');
  }, []);

  const toggleModule = (refCode: string) => {
    setCompletedModules(prev => {
      const next = prev.includes(refCode) ? prev.filter(r => r !== refCode) : [...prev, refCode];
      localStorage.setItem('emig_progress', JSON.stringify(next));
      return next;
    });
  };

  const progressPercent = Math.round((completedModules.length / ALL_QM_MODULES.length) * 100);
  const isFinalTestReady = progressPercent >= 100;

  const colorQM = '#e65100';
  const colorSAP = '#4f46e5';
  const colorMed = '#dc2626';

  // ── Module Card ──
  function ModuleCard({ title, refCode, color, link = '#', isDraft = false }: any) {
    const isDone = completedModules.includes(refCode);

    return (
      <div
        className="ea-card"
        style={{ opacity: isDraft ? 0.6 : 1 }}
      >
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            borderRadius: '20px 20px 0 0',
            background: isDone ? '#10b981' : color,
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: 600, color: '#1e293b', lineHeight: 1.3 }}>{title}</h3>
          {isDone && <span style={{ fontSize: '1.1rem', flexShrink: 0, marginLeft: '8px' }}>✅</span>}
        </div>

        <div className="ea-tag" style={{ marginBottom: '1rem' }}>{refCode}</div>

        {/* Mini progress bar */}
        <div style={{ height: '3px', background: '#f1f5f9', borderRadius: '99px', marginBottom: '1rem', overflow: 'hidden' }}>
          <div style={{
            width: isDone ? '100%' : '0%',
            height: '100%',
            background: isDone ? '#10b981' : color,
            borderRadius: '99px',
            transition: 'width 0.6s ease',
          }} />
        </div>

        <Link
          className="ea-link-btn"
          style={{
            background: isDraft ? '#e2e8f0' : isDone ? '#10b981' : color,
            color: isDraft ? '#94a3b8' : '#fff',
          }}
          to={isDraft ? '#' : link}
        >
          {isDraft ? '🔒 In Vorbereitung' : isDone ? 'Wiederholen' : 'Modul starten →'}
        </Link>
      </div>
    );
  }

  // ── Section Header ──
  function SectionHeader({ label, color }: { label: string; color: string }) {
    return (
      <div className="ea-section-title" style={{ marginTop: '2.5rem' }}>
        <div className="ea-section-accent" style={{ background: color }} />
        {label}
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Emig Academy – Lernplattform</title>
        <style>{STYLES}</style>
      </Head>

      <div className="ea-root">
        {/* ── HERO ── */}
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <header
            className="ea-hero"
            style={{ backgroundImage: `url(${bgImageUrl})` }}
          >
            <div className="ea-hero-overlay" />
            <div className="ea-hero-content">
              <div className="ea-hero-badge">✦ Interne Lernplattform</div>
              <h1 className="ea-hero-title">
                Emig <span>Academy</span>
              </h1>
              <p className="ea-hero-sub">Ihr Wissen. Ihr Wachstum. Ihr Erfolg.</p>

              <div className="ea-hero-stats">
                <div className="ea-stat">
                  <div className="ea-stat-num">{ALL_QM_MODULES.length}</div>
                  <div className="ea-stat-label">QM Module</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', margin: '4px 0' }} />
                <div className="ea-stat">
                  <div className="ea-stat-num">{MANUFACTURERS.length}</div>
                  <div className="ea-stat-label">Hersteller</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', margin: '4px 0' }} />
                <div className="ea-stat">
                  <div className="ea-stat-num">{SAP_PHASES.length}</div>
                  <div className="ea-stat-label">SAP Phasen</div>
                </div>
              </div>
            </div>
          </header>
        </div>

        {/* ── MAIN ── */}
        <main style={{ padding: '2.5rem 0 4rem', background: '#f8fafc', minHeight: '80vh' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>

            {/* Welcome strip */}
            {greeting && (
              <div className="ea-welcome-strip">
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700 }}>
                    {greeting}, willkommen zurück! 👋
                  </div>
                  <div style={{ fontSize: '0.88rem', opacity: 0.8, marginTop: '4px' }}>
                    {completedModules.length > 0
                      ? `Sie haben bereits ${completedModules.length} von ${ALL_QM_MODULES.length} QM-Modulen abgeschlossen.`
                      : 'Starten Sie Ihr erstes Lernmodul.'}
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(10px)',
                  whiteSpace: 'nowrap',
                }}>
                  {progressPercent}% abgeschlossen
                </div>
              </div>
            )}

            {/* Category Navigation */}
            <div className="ea-nav" style={{ marginBottom: '2.5rem' }}>
              {[
                { id: 'QM', label: 'Quality Management', icon: '📋', color: colorQM },
                { id: 'SAP', label: 'SAP-System', icon: '💻', color: colorSAP },
                { id: 'MED', label: 'Medizinprodukte', icon: '🏥', color: colorMed },
              ].map(({ id, label, icon, color }) => {
                const isActive = activeCategory === id;
                return (
                  <button
                    key={id}
                    className={`ea-nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => { setActiveCategory(id); setSelectedManufacturer(null); }}
                    style={{
                      background: isActive ? color : '#fff',
                      color: isActive ? '#fff' : '#374151',
                      border: `2px solid ${isActive ? color : '#e2e8f0'}`,
                      boxShadow: isActive ? `0 8px 20px ${color}35` : undefined,
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                    {label}
                  </button>
                );
              })}
            </div>

            {/* ─── QM SECTION ─── */}
            {activeCategory === 'QM' && (
              <div style={{ animation: 'fadeSlide 0.35s ease' }}>
                {/* Progress */}
                <div className="ea-progress-ring-wrap">
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      QM Gesamtfortschritt
                    </div>
                    <div className="ea-progress-bar-bg">
                      <div className="ea-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '6px' }}>
                      {completedModules.length} von {ALL_QM_MODULES.length} Modulen abgeschlossen
                    </div>
                  </div>
                  <div className="ea-progress-percent">{progressPercent}%</div>
                </div>

                {/* Final test */}
                <div
                  className="ea-final-test"
                  style={{
                    background: isFinalTestReady
                      ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
                      : '#fff',
                    border: `2px dashed ${isFinalTestReady ? '#10b981' : '#e2e8f0'}`,
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: isFinalTestReady ? '#065f46' : '#94a3b8' }}>
                      {isFinalTestReady ? '🏆 Finaler Test & Zertifikat' : '🔒 Finaler Test'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                      {isFinalTestReady ? 'Alle Module abgeschlossen – Sie können jetzt die Prüfung starten.' : `Noch ${ALL_QM_MODULES.length - completedModules.length} Module bis zur Freischaltung.`}
                    </div>
                  </div>
                  <button
                    disabled={!isFinalTestReady}
                    style={{
                      padding: '12px 28px',
                      borderRadius: '14px',
                      border: 'none',
                      background: isFinalTestReady ? 'linear-gradient(135deg, #10b981, #059669)' : '#e2e8f0',
                      color: isFinalTestReady ? '#fff' : '#94a3b8',
                      fontWeight: 700,
                      fontFamily: 'DM Sans, sans-serif',
                      cursor: isFinalTestReady ? 'pointer' : 'not-allowed',
                      fontSize: '0.95rem',
                      boxShadow: isFinalTestReady ? '0 8px 20px rgba(16,185,129,0.35)' : undefined,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Prüfung starten →
                  </button>
                </div>

                {/* Philosophy */}
                <div className="ea-philo-card">
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
                    QM Philosophie & Strategie
                  </div>
                  <p style={{ color: '#4b5563', margin: '0 0 1rem', fontSize: '0.95rem' }}>
                    Grundpfeiler unseres Qualitätsmanagementsystems nach ISO 13485.
                  </p>
                  <Link to="/docs/quality-management/qm-philosophie" style={{ fontWeight: 700, color: colorQM, textDecoration: 'none', fontSize: '0.9rem' }}>
                    Zur QM-Philosophie →
                  </Link>
                </div>

                {/* Modules */}
                <SectionHeader label="Logistik & Lager" color={colorQM} />
                <div className="ea-card-grid">
                  <ModuleCard title="Lagerbedingungen" refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
                  <ModuleCard title="Rückverfolgbarkeit" refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
                  <ModuleCard title="Sperrware" refCode="SOP-LOG-03" color={colorQM} link="/docs/logistik-lager/SOP_LOG-03" />
                  <ModuleCard title="Inventur" refCode="SOP-LOG-04" color={colorQM} isDraft />
                </div>

                <SectionHeader label="Einkauf & Lieferanten" color={colorQM} />
                <div className="ea-card-grid">
                  <ModuleCard title="Lieferantenbewertung" refCode="SOP-EINK-01" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-01" />
                  <ModuleCard title="Einkaufsprozess" refCode="SOP-EINK-02" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-02" />
                </div>

                <SectionHeader label="Regulatorik & MDR" color={colorQM} />
                <div className="ea-card-grid">
                  <ModuleCard title="Importeurpflichten" refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
                  <ModuleCard title="Händlerpflichten" refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
                  <ModuleCard title="PRRC" refCode="SOP-REG-03" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-03" />
                  <ModuleCard title="Audits & Inspektionen" refCode="SOP-REG-05" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-05" />
                </div>
              </div>
            )}

            {/* ─── SAP SECTION ─── */}
            {activeCategory === 'SAP' && (
              <div style={{ animation: 'fadeSlide 0.35s ease' }}>
                <SectionHeader label="SAP Lernmodule" color={colorSAP} />
                <div className="ea-card-grid" style={{ marginBottom: '3rem' }}>
                  <ModuleCard title="SAP Basics" refCode="SAP-01" color={colorSAP} isDraft />
                  <ModuleCard title="SAP Warehouse Management" refCode="SAP-02" color={colorSAP} isDraft />
                  <ModuleCard title="SAP Purchasing" refCode="SAP-03" color={colorSAP} isDraft />
                  <ModuleCard title="SAP Batch Management" refCode="SAP-04" color={colorSAP} isDraft />
                </div>

                <SAPDashboard colorSAP={colorSAP} />
              </div>
            )}

            {/* ─── MED SECTION ─── */}
            {activeCategory === 'MED' && (
              <div style={{ animation: 'fadeSlide 0.35s ease' }}>
                {!selectedManufacturer ? (
                  <>
                    <SectionHeader label="Hersteller & Produktschulungen" color={colorMed} />
                    <div className="ea-mfr-grid">
                      {MANUFACTURERS.map((m) => (
                        <ManufacturerCard
                          key={m.id}
                          m={m}
                          onClick={() => setSelectedManufacturer(m)}
                          colorMed={colorMed}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div>
                    <button className="ea-back-btn" onClick={() => setSelectedManufacturer(null)}>
                      ← Zurück zur Übersicht
                    </button>

                    <div style={{
                      background: `linear-gradient(135deg, ${colorMed}12, #fff)`,
                      border: `1px solid ${colorMed}25`,
                      borderRadius: '20px',
                      padding: '1.75rem 2rem',
                      marginBottom: '2rem',
                    }}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#1e293b' }}>
                        {selectedManufacturer.name}
                      </div>
                      <p style={{ color: '#64748b', margin: '8px 0 0', fontSize: '0.95rem' }}>
                        Wählen Sie ein Produktmodul, um die Schulung zu starten.
                      </p>
                    </div>

                    {selectedManufacturer.id === 'riwo' ? (
                      <>
                        <SectionHeader label="RIWOspine Produktmodule" color={colorMed} />
                        <div className="ea-card-grid">
                          {RIWOSPINE_PRODUCTS.map((prod) => (
                            <div key={prod.refCode} className="ea-card">
                              <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                                borderRadius: '20px 20px 0 0', background: colorMed,
                              }} />
                              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{prod.icon}</div>
                              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 4px' }}>{prod.title}</h3>
                              <div className="ea-tag" style={{ marginBottom: '0.75rem' }}>{prod.refCode}</div>
                              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>{prod.desc}</p>
                              <Link
                                className="ea-link-btn"
                                style={{ background: colorMed, color: '#fff' }}
                                to={prod.link}
                              >
                                Modul starten →
                              </Link>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '20px', border: '2px dashed #e2e8f0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
                        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
                          In Vorbereitung
                        </div>
                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
                          Die Schulungsinhalte für <strong>{selectedManufacturer.name}</strong> werden gerade vorbereitet.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}