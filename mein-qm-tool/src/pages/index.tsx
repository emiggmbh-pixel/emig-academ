import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  const [lang, setLang] = useState('de');
  const [activeCategory, setActiveCategory] = useState('QM');

  // Farbdefinitionen nach Ihren Wünschen
  const colorQM = '#e65100';  // Kräftiges Orange
  const colorSAP = '#0070f3'; // SAP Blau
  const colorMed = '#d32f2f'; // Medizinisches Rot

  const t = {
    de: {
      title: "Emig Academy",
      subtitle: "Zentrale Lernplattform der EMIG GmbH",
      catQM: "Quality Management",
      catSAP: "SAP-System Training",
      catMed: "Medizinische Produkte",
      startBtn: "Modul starten",
      comingSoon: "Dieses Modul wird derzeit entwickelt.",
      preview: "Vorschau"
    },
    en: {
      title: "Emig Academy",
      subtitle: "Central Learning Platform of EMIG GmbH",
      catQM: "Quality Management",
      catSAP: "SAP System Training",
      catMed: "Medical Products",
      startBtn: "Start Module",
      comingSoon: "This module is currently under development.",
      preview: "Preview"
    }
  };

  // Hilfskomponente für Modul-Karten
  const ModuleCard = ({ title, refCode, color, link = "#", isDraft = false }) => (
    <div style={{ 
      padding: '1.5rem', borderRadius: '18px', backgroundColor: '#ffffff', 
      display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      flex: '1 1 280px', minWidth: '260px', borderTop: `6px solid ${color}`,
      opacity: isDraft ? 0.7 : 1
    }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', minHeight: '2.5rem' }}>{title}</h3>
      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem', fontWeight: 'bold' }}>{refCode}</div>
      <div style={{ flexGrow: 1, fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>
        {isDraft ? t[lang].comingSoon : ""}
      </div>
      <Link 
        style={{ 
          backgroundColor: isDraft ? '#ccc' : color, color: 'white', padding: '10px', 
          borderRadius: '10px', textAlign: 'center', fontWeight: 'bold',
          pointerEvents: isDraft ? 'none' : 'auto', textDecoration: 'none'
        }} 
        to={link}
      >
        {isDraft ? t[lang].preview : t[lang].startBtn}
      </Link>
    </div>
  );

  return (
    <Layout title="Emig Academy">
      {/* Sprach-Umschalter */}
      <div style={{ position: 'absolute', top: '75px', right: '15px', zIndex: 100, display: 'flex', gap: '5px' }}>
        <button onClick={() => setLang('de')} style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '10px', border: '1px solid white', background: lang === 'de' ? 'white' : 'transparent', color: lang === 'de' ? 'black' : 'white', fontWeight: 'bold' }}>DE</button>
        <button onClick={() => setLang('en')} style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '10px', border: '1px solid white', background: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? 'black' : 'white', fontWeight: 'bold' }}>EN</button>
      </div>

      <header style={{
        position: 'relative', backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        color: 'white', padding: '6rem 1rem', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)', fontWeight: '800', margin: 0, letterSpacing: '-1px' }}>{t[lang].title}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginTop: '10px' }}>{t[lang].subtitle}</p>
        </div>
      </header>

      <main style={{ padding: '2.5rem 0', backgroundColor: '#f0f2f5' }}>
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* CATEGORY SELECTOR */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '3rem', justifyContent: 'center' }}>
            <button onClick={() => setActiveCategory('QM')} style={{ flex: '1 1 200px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'QM' ? colorQM : 'white', color: activeCategory === 'QM' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: '0.3s' }}>{t[lang].catQM}</button>
            <button onClick={() => setActiveCategory('SAP')} style={{ flex: '1 1 200px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'SAP' ? colorSAP : 'white', color: activeCategory === 'SAP' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: '0.3s' }}>{t[lang].catSAP}</button>
            <button onClick={() => setActiveCategory('MED')} style={{ flex: '1 1 200px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'MED' ? colorMed : 'white', color: activeCategory === 'MED' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: '0.3s' }}>{t[lang].catMed}</button>
          </div>

          {/* QM TRAINING CONTENT */}
          {activeCategory === 'QM' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ width: '100%', padding: '1.5rem', backgroundColor: 'white', borderRadius: '20px', borderLeft: `10px solid ${colorQM}`, marginBottom: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <h2>QM Philosophie & Strategie</h2>
                <p>Grundlagen der EMIG Qualitätspolitik.</p>
                <Link to="/docs/quality-management/qm-philosophie" style={{ fontWeight: 'bold', color: colorQM }}>Hier starten →</Link>
              </div>
              <ModuleCard title="Importeurpflichten" refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
              <ModuleCard title="Lagerbedingungen" refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
              <ModuleCard title="Rückverfolgbarkeit" refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
              <ModuleCard title="Händlerpflichten" refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
            </div>
          )}

          {/* SAP TRAINING CONTENT */}
          {activeCategory === 'SAP' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <ModuleCard title="SAP Grundlagen & Navigation" refCode="SAP-SYS-01" color={colorSAP} isDraft={true} />
              <ModuleCard title="Lagerverwaltung in SAP" refCode="SAP-LOG-01" color={colorSAP} isDraft={true} />
              <ModuleCard title="Bestellwesen & Einkauf" refCode="SAP-PUR-01" color={colorSAP} isDraft={true} />
              <ModuleCard title="Chargenverwaltung" refCode="SAP-BAT-01" color={colorSAP} isDraft={true} />
            </div>
          )}

          {/* MEDICAL PRODUCTS CONTENT */}
          {activeCategory === 'MED' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <ModuleCard title="Sterile Barriere-Systeme" refCode="MED-PROD-01" color={colorMed} isDraft={true} />
              <ModuleCard title="Instrumentenkunde Basis" refCode="MED-INST-01" color={colorMed} isDraft={true} />
              <ModuleCard title="Umgang mit Reklamationen" refCode="MED-POST-01" color={colorMed} isDraft={true} />
              <ModuleCard title="UDI & Kennzeichnung" refCode="MED-LABEL-01" color={colorMed} isDraft={true} />
            </div>
          )}

        </div>
      </main>
    </Layout>
  );
}