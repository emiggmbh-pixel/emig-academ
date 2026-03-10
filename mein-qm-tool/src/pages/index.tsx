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
      qmTitle: "Quality Management",
      qmDesc: "Grundpfeiler unseres QMS: Managementbewertung, Dokumentenlenkung und Audits.",
      qmBtn: "Philosophie entdecken",
      logTitle: "Logistik & Lager",
      einkaufTitle: "Einkauf & Lieferanten",
      regTitle: "Regulatorik der MDR",
      startBtn: "Modul starten",
      progress: "Fortschritt"
    },
    en: {
      title: "Emig Academy",
      subtitle: "Quality and Safety in Reutlingen",
      qmTitle: "Quality Management",
      qmDesc: "Cornerstones of our QMS: Management review, document control, and audits.",
      qmBtn: "Discover Philosophy",
      logTitle: "Logistics & Warehouse",
      einkaufTitle: "Procurement & Suppliers",
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
      {/* Sprach-Umschalter - Fixiert oben rechts */}
      <div style={{ position: 'absolute', top: '75px', right: '15px', zIndex: 100, display: 'flex', gap: '5px' }}>
        <button onClick={() => setLang('de')} style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '10px', border: '1px solid white', background: lang === 'de' ? 'white' : 'transparent', color: lang === 'de' ? 'black' : 'white', fontWeight: 'bold' }}>DE</button>
        <button onClick={() => setLang('en')} style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '10px', border: '1px solid white', background: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? 'black' : 'white', fontWeight: 'bold' }}>EN</button>
      </div>

      <header style={{
        position: 'relative', backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        color: 'white', padding: '6rem 1rem', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', fontWeight: 'bold', margin: '0 0 10px 0' }}>{t[lang].title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.4rem)', opacity: 0.9 }}>{t[lang].subtitle}</p>
        </div>
      </header>

      <main style={{ padding: '2rem 0', backgroundColor: '#f5f7f9' }}>
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 15px' }}>
          
          {/* QM PHILOSOPHIE - Responsive Flexbox */}
          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ borderLeft: `6px solid ${qmGray}`, paddingLeft: '15px', fontSize: '1.4rem' }}>{t[lang].qmTitle}</h2>
          </div>
          <div style={{ 
            marginBottom: '3rem', backgroundColor: '#ffffff', borderRadius: '20px', padding: '1.5rem', 
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)', border: '1px solid #e1e4e8',
            display: 'flex', flexDirection: 'column', gap: '1rem'
          }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{lang === 'de' ? 'QM-Philosophie' : 'QM Philosophy'}</h3>
            <p style={{ fontSize: '0.95rem', color: '#444', margin: 0 }}>{t[lang].qmDesc}</p>
            <Link style={{ backgroundColor: qmGray, color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', borderRadius: '12px' }} to="/docs/quality-management/qm-philosophie">
              {t[lang].qmBtn}
            </Link>
          </div>

          {/* GENERISCHES RESPONSIVE GRID FÜR ALLE SEKTIONEN */}
          {[
            { 
              title: t[lang].logTitle, color: logisticsOrange, bgColor: '#fff3e0',
              items: [
                { de: 'Lagerbedingungen', en: 'Storage', ref: 'SOP-LOG-01', link: 'SOP_LOG-01' },
                { de: 'Rückverfolgbarkeit', en: 'Traceability', ref: 'SOP-LOG-02', link: 'SOP_LOG-02' },
                { de: 'Sperrware', en: 'Blocked Goods', ref: 'SOP-LOG-03', link: 'SOP_LOG-03' },
                { de: 'Inventur', en: 'Inventory', ref: 'SOP-LOG-04', link: 'SOP_LOG-01' }
              ]
            },
            { 
              title: t[lang].einkaufTitle, color: einkaufBlue, bgColor: '#e3f2fd',
              items: [
                { de: 'Lieferanten', en: 'Suppliers', ref: 'SOP-EINK-01', link: 'SOP_EINK-01' },
                { de: 'Einkaufsprozess', en: 'Procurement', ref: 'SOP-EINK-02', link: 'SOP_EINK-02' },
                { de: 'Mahnwesen', en: 'Reminders', ref: 'SOP-EINK-03', link: 'SOP_EINK-01' },
                { de: 'Wareneingang', en: 'Inspection', ref: 'SOP-EINK-04', link: 'SOP_EINK-02' }
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
            <div key={idx} style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderLeft: `6px solid ${section.color}`, paddingLeft: '15px', fontSize: '1.4rem', marginBottom: '1rem' }}>{section.title}</h2>
              <div style={{ 
                backgroundColor: section.bgColor, padding: '1.5rem', borderRadius: '25px',
                display: 'flex', 
                flexWrap: 'wrap', // Das ist der entscheidende Teil für Mobile!
                gap: '15px'
              }}>
                {section.items.map((m, i) => (
                  <div key={i} style={{ 
                    padding: '1.5rem', borderRadius: '18px', backgroundColor: '#ffffff', 
                    display: 'flex', flexDirection: 'column', 
                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                    // Logik für Spaltenbreite:
                    // Mobil: 100% (1 Spalte)
                    // Tablet: calc(50% - 15px) (2 Spalten)
                    // Desktop: calc(25% - 15px) (4 Spalten)
                    flex: '1 1 280px', 
                    minWidth: '250px',
                    maxWidth: '100%'
                  }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', minHeight: '2.5rem' }}>{lang === 'de' ? m.de : m.en}</h3>
                    <div style={{ flexGrow: 1 }}>
                      <ProgressBar percent={0} color={section.color} />
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '1rem' }}>{m.ref}</div>
                    <Link style={{ backgroundColor: section.color, color: 'white', padding: '12px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold' }} to={`/docs/${idx === 0 ? 'logistik-lager' : idx === 1 ? 'einkauf-lieferanten' : 'regulatorik-mdr'}/${m.link}`}>
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