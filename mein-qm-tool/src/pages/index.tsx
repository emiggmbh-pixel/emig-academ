import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  const [lang, setLang] = useState('de');

  const emigGreen = '#2e7d32'; 
  const qmGray = '#455a64';
  const einkaufBlue = '#1565c0';
  const logisticsOrange = '#e65100';

  const t = {
    de: {
      title: "Emig Academy",
      subtitle: "Qualität und Sicherheit am Standort Reutlingen",
      qmTitle: "Quality Management in EMIG GmbH",
      qmDesc: "Grundpfeiler unseres QMS: Managementbewertung, Dokumentenlenkung und interne Audits.",
      qmBtn: "Philosophie entdecken",
      logTitle: "Logistik, Lager & Rückverfolgbarkeit",
      einkaufTitle: "Einkauf & Lieferantenmanagement",
      regTitle: "Regulatorik der MDR",
      startBtn: "Modul starten",
      progress: "Fortschritt"
    },
    en: {
      title: "Emig Academy",
      subtitle: "Quality and Safety at the Reutlingen Site",
      qmTitle: "Quality Management in EMIG GmbH",
      qmDesc: "Cornerstones of our QMS: Management review, document control, and internal audits.",
      qmBtn: "Discover Philosophy",
      logTitle: "Logistics, Warehouse & Traceability",
      einkaufTitle: "Procurement & Supplier Management",
      regTitle: "MDR Regulatory Affairs",
      startBtn: "Start Module",
      progress: "Progress"
    }
  };

  const ProgressBar = ({ percent, color }) => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
        <span>{t[lang].progress}</span>
        <span>{percent}%</span>
      </div>
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '6px' }}>
        <div style={{ width: `${percent}%`, backgroundColor: percent === 100 ? '#4caf50' : color, height: '100%', borderRadius: '10px' }} />
      </div>
    </div>
  );

  return (
    <Layout title={t[lang].title}>
      {/* Sprach-Umschalter */}
      <div style={{ position: 'absolute', top: '75px', right: '20px', zIndex: 100, display: 'flex', gap: '8px' }}>
        <button onClick={() => setLang('de')} style={{ padding: '5px 12px', cursor: 'pointer', borderRadius: '20px', border: '1px solid white', background: lang === 'de' ? 'white' : 'transparent', color: lang === 'de' ? 'black' : 'white', fontWeight: 'bold' }}>DE</button>
        <button onClick={() => setLang('en')} style={{ padding: '5px 12px', cursor: 'pointer', borderRadius: '20px', border: '1px solid white', background: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? 'black' : 'white', fontWeight: 'bold' }}>EN</button>
      </div>

      <header style={{
        position: 'relative', backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        color: 'white', padding: '10rem 2rem', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 'bold' }}>{t[lang].title}</h1>
          <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.8rem)', opacity: 0.9 }}>{t[lang].subtitle}</p>
        </div>
      </header>

      <main style={{ padding: '4rem 0', backgroundColor: '#fcfcfc' }}>
        {/* Container auf volle Breite gesetzt */}
        <div style={{ width: '100%', padding: '0 40px' }}>
          
          {/* AUSNAHME: QM PHILOSOPHIE (Full Width) */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ borderLeft: `8px solid ${qmGray}`, paddingLeft: '20px', fontSize: '2.2rem' }}>{t[lang].qmTitle}</h2>
          </div>
          <div style={{ 
            marginBottom: '5rem', backgroundColor: '#ffffff', borderRadius: '25px', padding: '3rem', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid #e1e4e8',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem'
          }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h3 style={{ fontSize: '2rem' }}>{lang === 'de' ? 'QM-Philosophie' : 'QM Philosophy'}</h3>
              <p style={{ fontSize: '1.3rem', color: '#444' }}>{t[lang].qmDesc}</p>
            </div>
            <Link style={{ backgroundColor: qmGray, color: 'white', padding: '1.2rem 3rem', fontWeight: 'bold', borderRadius: '15px', fontSize: '1.2rem' }} to="/docs/quality-management/qm-philosophie">
              {t[lang].qmBtn}
            </Link>
          </div>

          {/* GRID SEKTIONEN (Immer 4 pro Reihe auf Desktop) */}
          {[
            { 
              title: t[lang].logTitle, color: logisticsOrange, bgColor: '#fff3e0',
              items: [
                { de: 'Lagerbedingungen', en: 'Storage', ref: 'SOP-LOG-01', link: 'SOP_LOG-01' },
                { de: 'Rückverfolgbarkeit', en: 'Traceability', ref: 'SOP-LOG-02', link: 'SOP_LOG-02' },
                { de: 'Sperrware', en: 'Blocked Goods', ref: 'SOP-LOG-03', link: 'SOP_LOG-03' },
                { de: 'Inventur', en: 'Inventory', ref: 'SOP-LOG-04', link: 'SOP_LOG-01' } // Platzhalter für 4. Modul
              ]
            },
            { 
              title: t[lang].einkaufTitle, color: einkaufBlue, bgColor: '#e3f2fd',
              items: [
                { de: 'Lieferanten', en: 'Suppliers', ref: 'SOP-EINK-01', link: 'SOP_EINK-01' },
                { de: 'Einkaufsprozess', en: 'Procurement', ref: 'SOP-EINK-02', link: 'SOP_EINK-02' },
                { de: 'Mahnwesen', en: 'Reminders', ref: 'SOP-EINK-03', link: 'SOP_EINK-01' },
                { de: 'Wareneingangsprüfung', en: 'Incoming Inspection', ref: 'SOP-EINK-04', link: 'SOP_EINK-02' }
              ]
            },
            { 
              title: t[lang].regTitle, color: emigGreen, bgColor: '#f0f4f0',
              items: [
                { de: 'Importeur', en: 'Importer', ref: 'SOP-REG-01', link: 'SOP_REG-01' },
                { de: 'Händler', en: 'Distributor', ref: 'SOP-REG-02', link: 'SOP_REG-02' },
                { de: 'PRRC', en: 'PRRC', ref: 'SOP-REG-03', link: 'SOP_REG-03' },
                { de: 'Audits', en: 'Audits', ref: 'SOP-REG-05', link: 'SOP_REG-05' }
              ]
            }
          ].map((section, idx) => (
            <div key={idx} style={{ marginBottom: '5rem' }}>
              <h2 style={{ borderLeft: `8px solid ${section.color}`, paddingLeft: '20px', fontSize: '2.2rem', marginBottom: '2rem' }}>{section.title}</h2>
              <div style={{ 
                backgroundColor: section.bgColor, padding: '3rem', borderRadius: '30px',
                display: 'grid', 
                // Erzwingt 4 Spalten auf Desktop, wechselt auf Mobile automatisch
                gridTemplateColumns: 'repeat(auto-fit, minmax(calc(25% - 25px), 1fr))',
                gap: '25px'
              }}>
                {section.items.map((m, i) => (
                  <div key={i} style={{ 
                    padding: '2.5rem', borderRadius: '20px', backgroundColor: '#ffffff', 
                    display: 'flex', flexDirection: 'column', 
                    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                    minHeight: '320px' // Garantiert gleiche Mindesthöhe
                  }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', minHeight: '3.5rem' }}>{lang === 'de' ? m.de : m.en}</h3>
                    <div style={{ flexGrow: 1 }}>
                      <ProgressBar percent={0} color={section.color} />
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#999', marginBottom: '1.5rem' }}>{m.ref}</div>
                    <Link style={{ backgroundColor: section.color, color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }} to={`/docs/${idx === 0 ? 'logistik-lager' : idx === 1 ? 'einkauf-lieferanten' : 'regulatorik-mdr'}/${m.link}`}>
                      {t[lang].startBtn}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}