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
      subtitle: "Qualität und Sicherheit in Reutlingen",
      qmTitle: "Quality Management",
      qmDesc: "Grundpfeiler unseres QMS: Managementbewertung, Dokumentenlenkung und interne Audits.",
      qmBtn: "Philosophie entdecken",
      logTitle: "Logistik & Lager",
      einkaufTitle: "Einkauf & Lieferanten",
      regTitle: "Regulatorik der MDR",
      startBtn: "Start",
      progress: "Fortschritt"
    },
    en: {
      title: "Emig Academy",
      subtitle: "Quality and Safety in Reutlingen",
      qmTitle: "Quality Management",
      qmDesc: "Cornerstones of our QMS: Management review, document control, and internal audits.",
      qmBtn: "Discover Philosophy",
      logTitle: "Logistics & Warehouse",
      einkaufTitle: "Procurement & Suppliers",
      regTitle: "MDR Regulatory Affairs",
      startBtn: "Start",
      progress: "Progress"
    }
  };

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
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '6px' }}>
        <div style={{ width: `${percent}%`, backgroundColor: percent === 100 ? '#4caf50' : color, height: '100%', borderRadius: '10px' }} />
      </div>
    </div>
  );

  // Hilfskomponente für das responsive Raster
  const GridContainer = ({ children, bgColor }) => (
    <div style={{ 
      backgroundColor: bgColor, 
      padding: '2rem 1.5rem', 
      borderRadius: '20px', 
      marginBottom: '3rem',
      display: 'grid',
      // Das ist der Zauber-Code für Mobile-First:
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '20px' 
    }}>
      {children}
    </div>
  );

  return (
    <Layout title={t[lang].title}>
      {/* Sprach-Umschalter optimiert für Mobile */}
      <div style={{ position: 'absolute', top: '70px', right: '10px', zIndex: 100, display: 'flex', gap: '5px' }}>
        <button onClick={() => setLang('de')} style={{ padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '15px', border: '1px solid white', background: lang === 'de' ? 'white' : 'transparent', color: lang === 'de' ? 'black' : 'white' }}>DE</button>
        <button onClick={() => setLang('en')} style={{ padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '15px', border: '1px solid white', background: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? 'black' : 'white' }}>EN</button>
      </div>

      <header style={{
        position: 'relative', backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        color: 'white', padding: '6rem 1rem', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 'bold' }}>{t[lang].title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.4rem)', opacity: 0.9 }}>{t[lang].subtitle}</p>
        </div>
      </header>

      <main style={{ padding: '2rem 0', backgroundColor: '#fcfcfc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          
          {/* QM SECTION - Responsive Flexbox */}
          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ borderLeft: `6px solid ${qmGray}`, paddingLeft: '15px', fontSize: '1.5rem' }}>{t[lang].qmTitle}</h2>
          </div>
          <div style={{ 
            marginBottom: '3rem', backgroundColor: '#ffffff', borderRadius: '20px', padding: '1.5rem', 
            boxShadow: '0 8px 20px rgba(0,0,0,0.05)', border: '1px solid #e1e4e8',
            display: 'flex', flexDirection: 'column', gap: '1.5rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.3rem' }}>{lang === 'de' ? 'QM-Philosophie' : 'QM Philosophy'}</h3>
              <p style={{ fontSize: '1rem', color: '#444' }}>{t[lang].qmDesc}</p>
            </div>
            <Link style={{ backgroundColor: qmGray, color: 'white', padding: '1rem', textAlign: 'center', fontWeight: 'bold', borderRadius: '12px' }} to="/docs/quality-management/qm-philosophie">
              {t[lang].qmBtn}
            </Link>
          </div>

          {/* LOGISTICS */}
          <h2 style={{ borderLeft: `6px solid ${logisticsOrange}`, paddingLeft: '15px', fontSize: '1.5rem', marginBottom: '1rem' }}>{t[lang].logTitle}</h2>
          <GridContainer bgColor="#fff3e0">
            {[
              { id: 'sopLog01', de: 'Lagerbedingungen', en: 'Storage', ref: 'SOP-LOG-01', link: 'SOP_LOG-01' },
              { id: 'sopLog02', de: 'Rückverfolgbarkeit', en: 'Traceability', ref: 'SOP-LOG-02', link: 'SOP_LOG-02' },
              { id: 'sopLog03', de: 'Sperrware', en: 'Blocked Goods', ref: 'SOP-LOG-03', link: 'SOP_LOG-03' }
            ].map((m) => (
              <div key={m.id} style={{ padding: '1.5rem', borderRadius: '15px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.1rem' }}>{m[lang]}</h3>
                <ProgressBar percent={progress[m.id]} color={logisticsOrange} />
                <Link style={{ backgroundColor: logisticsOrange, color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }} to={`/docs/logistik-lager/${m.link}`}>{t[lang].startBtn}</Link>
              </div>
            ))}
          </GridContainer>

          {/* EINKAUF */}
          <h2 style={{ borderLeft: `6px solid ${einkaufBlue}`, paddingLeft: '15px', fontSize: '1.5rem', marginBottom: '1rem' }}>{t[lang].einkaufTitle}</h2>
          <GridContainer bgColor="#e3f2fd">
            {[
              { id: 'sopEink01', de: 'Lieferanten', en: 'Suppliers', ref: 'SOP-EINK-01', link: 'SOP_EINK-01' },
              { id: 'sopEink02', de: 'Einkauf', en: 'Procurement', ref: 'SOP-EINK-02', link: 'SOP_EINK-02' }
            ].map((m) => (
              <div key={m.id} style={{ padding: '1.5rem', borderRadius: '15px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.1rem' }}>{m[lang]}</h3>
                <ProgressBar percent={progress[m.id]} color={einkaufBlue} />
                <Link style={{ backgroundColor: einkaufBlue, color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }} to={`/docs/einkauf-lieferanten/${m.link}`}>{t[lang].startBtn}</Link>
              </div>
            ))}
          </GridContainer>

          {/* REGULATORY */}
          <h2 style={{ borderLeft: `6px solid ${emigGreen}`, paddingLeft: '15px', fontSize: '1.5rem', marginBottom: '1rem' }}>{t[lang].regTitle}</h2>
          <GridContainer bgColor="#f0f4f0">
            {[
              { id: 'sopReg01', de: 'Importeur', en: 'Importer', ref: 'SOP-REG-01', link: 'SOP_REG-01' },
              { id: 'sopReg02', de: 'Händler', en: 'Distributor', ref: 'SOP-REG-02', link: 'SOP_REG-02' },
              { id: 'sopReg03', de: 'PRRC', en: 'PRRC', ref: 'SOP-REG-03', link: 'SOP_REG-03' },
              { id: 'sopReg05', de: 'Audits', en: 'Audits', ref: 'SOP-REG-05', link: 'SOP_REG-05' }
            ].map((m) => (
              <div key={m.id} style={{ padding: '1.5rem', borderRadius: '15px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.1rem' }}>{m[lang]}</h3>
                <ProgressBar percent={progress[m.id]} color={emigGreen} />
                <Link style={{ backgroundColor: emigGreen, color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }} to={`/docs/regulatorik-mdr/${m.link}`}>{t[lang].startBtn}</Link>
              </div>
            ))}
          </GridContainer>

        </div>
      </main>
    </Layout>
  );
}