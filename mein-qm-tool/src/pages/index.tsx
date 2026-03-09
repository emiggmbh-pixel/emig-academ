import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  const [lang, setLang] = useState('de'); // 'de' oder 'en'

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

  // Fortschritts-Werte (Simulation)
  const [progress] = useState({
    sopReg01: 0, sopReg02: 0, sopReg03: 0, sopReg04: 0, sopReg05: 0,
    sopEink01: 0, sopEink02: 0,
    sopLog01: 0, sopLog02: 0, sopLog03: 0
  });

  const ProgressBar = ({ percent, color }) => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
        <span>{t[lang].progress}</span>
        <span>{percent}%</span>
      </div>
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '8px' }}>
        <div style={{ 
          width: `${percent}%`, 
          backgroundColor: percent === 100 ? '#4caf50' : color, 
          height: '100%', 
          borderRadius: '10px',
          transition: 'width 0.5s ease-in-out'
        }} />
      </div>
    </div>
  );

  return (
    <Layout title={t[lang].title}>
      
      {/* Sprach-Umschalter */}
      <div style={{ position: 'absolute', top: '70px', right: '20px', zIndex: 100, display: 'flex', gap: '10px' }}>
        <button onClick={() => setLang('de')} style={{ padding: '5px 15px', cursor: 'pointer', borderRadius: '20px', border: '1px solid white', background: lang === 'de' ? 'white' : 'transparent', color: lang === 'de' ? 'black' : 'white', fontWeight: 'bold' }}>DE</button>
        <button onClick={() => setLang('en')} style={{ padding: '5px 15px', cursor: 'pointer', borderRadius: '20px', border: '1px solid white', background: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? 'black' : 'white', fontWeight: 'bold' }}>EN</button>
      </div>

      <header style={{
        position: 'relative',
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: '160%', 
        backgroundPosition: '40% center', 
        backgroundRepeat: 'no-repeat',
        color: 'white',
        padding: '10rem 2rem',
        textAlign: 'center',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', textShadow: '2px 2px 15px rgba(0,0,0,0.8)' }}>{t[lang].title}</h1>
          <p style={{ fontSize: '1.6rem', opacity: 0.9 }}>{t[lang].subtitle}</p>
        </div>
      </header>

      <main style={{ padding: '4rem 0', backgroundColor: '#fcfcfc' }}>
        <div style={{ width: '100%', padding: '0 30px' }}>
          
          {/* SEKTION 1: QM PHILOSOPHIE (VOLLE BREITE) */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#1c1e21', fontSize: '2.2rem', borderLeft: `8px solid ${qmGray}`, paddingLeft: '20px' }}>
              {t[lang].qmTitle}
            </h2>
          </div>
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '25px', padding: '3rem', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', border: '1px solid #e1e4e8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem' }}>
              <div style={{ flex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                   <div style={{ backgroundColor: qmGray, color: 'white', padding: '12px 22px', borderRadius: '50%', fontWeight: 'bold', marginRight: '20px', fontSize: '1.4rem' }}>QM</div>
                   <h3 style={{ fontSize: '2rem', color: '#1c1e21', margin: 0 }}>{lang === 'de' ? 'QM-Philosophie & Arbeitsweise' : 'QM Philosophy & Workflow'}</h3>
                </div>
                <p style={{ fontSize: '1.2rem', color: '#444', lineHeight: '1.6' }}>{t[lang].qmDesc}</p>
              </div>
              <div style={{ minWidth: '300px' }}>
                <Link style={{ backgroundColor: qmGray, color: 'white', padding: '1.4rem 2.5rem', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '15px', textAlign: 'center', display: 'block' }} className="button" to="/docs/quality-management/qm-philosophie">
                  {t[lang].qmBtn}
                </Link>
              </div>
            </div>
          </div>

          {/* SEKTION 2: LOGISTIK */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#1c1e21', fontSize: '2.2rem', borderLeft: `8px solid ${logisticsOrange}`, paddingLeft: '20px' }}>{t[lang].logTitle}</h2>
          </div>
          <div style={{ backgroundColor: '#fff3e0', padding: '3rem', borderRadius: '30px', marginBottom: '5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
              {[
                { id: 'sopLog01', de: 'Lagerbedingungen', en: 'Storage Conditions', ref: 'SOP-LOG-01', link: 'SOP_LOG-01' },
                { id: 'sopLog02', de: 'Rückverfolgbarkeit', en: 'Traceability', ref: 'SOP-LOG-02', link: 'SOP_LOG-02' },
                { id: 'sopLog03', de: 'Umgang mit Sperrware', en: 'Blocked Goods', ref: 'SOP-LOG-03', link: 'SOP_LOG-03' }
              ].map((m) => (
                <div key={m.id} style={{ padding: '2rem', borderRadius: '20px', backgroundColor: '#ffffff', textAlign: 'center', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.3rem' }}>{m[lang]}</h3>
                  <ProgressBar percent={progress[m.id]} color={logisticsOrange} />
                  <div style={{ fontSize: '0.9rem', color: '#999', marginBottom: '1.5rem' }}>{m.ref}</div>
                  <Link style={{ backgroundColor: logisticsOrange, color: 'white', padding: '12px', borderRadius: '10px' }} className="button button--block" to={`/docs/logistik-lager/${m.link}`}>{t[lang].startBtn}</Link>
                </div>
              ))}
            </div>
          </div>

          {/* SEKTION 3: EINKAUF */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#1c1e21', fontSize: '2.2rem', borderLeft: `8px solid ${einkaufBlue}`, paddingLeft: '20px' }}>{t[lang].einkaufTitle}</h2>
          </div>
          <div style={{ backgroundColor: '#e3f2fd', padding: '3rem', borderRadius: '30px', marginBottom: '5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
              {[
                { id: 'sopEink01', de: 'Lieferantenqualifizierung', en: 'Supplier Qualification', ref: 'SOP-EINK-01', link: 'SOP_EINK-01' },
                { id: 'sopEink02', de: 'Beschaffungsprozess', en: 'Procurement Process', ref: 'SOP-EINK-02', link: 'SOP_EINK-02' }
              ].map((m) => (
                <div key={m.id} style={{ padding: '2rem', borderRadius: '20px', backgroundColor: '#ffffff', textAlign: 'center', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.3rem' }}>{m[lang]}</h3>
                  <ProgressBar percent={progress[m.id]} color={einkaufBlue} />
                  <div style={{ fontSize: '0.9rem', color: '#999', marginBottom: '1.5rem' }}>{m.ref}</div>
                  <Link style={{ backgroundColor: einkaufBlue, color: 'white', padding: '12px', borderRadius: '10px' }} className="button button--block" to={`/docs/einkauf-lieferanten/${m.link}`}>{t[lang].startBtn}</Link>
                </div>
              ))}
            </div>
          </div>

          {/* SEKTION 4: REGULATORIK */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#1c1e21', fontSize: '2.2rem', borderLeft: `6px solid ${emigGreen}`, paddingLeft: '20px' }}>{t[lang].regTitle}</h2>
          </div>
          <div style={{ backgroundColor: '#f0f4f0', padding: '3rem', borderRadius: '30px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
              {[
                { id: 'sopReg01', de: 'Importeurpflichten', en: 'Importer Obligations', ref: 'SOP-REG-01', link: 'SOP_REG-01' },
                { id: 'sopReg02', de: 'Händlerpflichten', en: 'Distributor Obligations', ref: 'SOP-REG-02', link: 'SOP_REG-02' },
                { id: 'sopReg03', de: 'Rolle der PRRC', en: 'Role of the PRRC', ref: 'SOP-REG-03', link: 'SOP_REG-03' },
                { id: 'sopReg04', de: 'EUDAMED', en: 'EUDAMED', ref: 'SOP-REG-04', link: 'SOP_REG-04' },
                { id: 'sopReg05', de: 'Behörden & Audits', en: 'Authorities & Audits', ref: 'SOP-REG-05', link: 'SOP_REG-05' }
              ].map((m) => (
                <div key={m.id} style={{ padding: '2rem', borderRadius: '20px', backgroundColor: '#ffffff', textAlign: 'center', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.3rem' }}>{m[lang]}</h3>
                  <ProgressBar percent={progress[m.id]} color={emigGreen} />
                  <div style={{ fontSize: '0.9rem', color: '#999', marginBottom: '1.5rem' }}>{m.ref}</div>
                  <Link style={{ backgroundColor: emigGreen, color: 'white', padding: '12px', borderRadius: '10px' }} className="button button--block" to={`/docs/regulatorik-mdr/${m.link}`}>{t[lang].startBtn}</Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}