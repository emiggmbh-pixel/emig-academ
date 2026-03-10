import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  // State für die Sprache: 'de', 'en' oder 'uk'
  const [lang, setLang] = useState('de');
  const [activeCategory, setActiveCategory] = useState('QM');

  const colorQM = '#e65100';  // Orange
  const colorSAP = '#0070f3'; // Blau
  const colorMed = '#d32f2f'; // Rot

  // Texte für alle Sprachen
  const t = {
    de: {
      title: "Emig Academy",
      subtitle: "Zentrale Lernplattform der EMIG GmbH",
      catQM: "Quality Management",
      catSAP: "SAP-System Training",
      catMed: "Medizinische Produkte",
      startBtn: "Modul starten",
      phiTitle: "QM Philosophie & Strategie",
      phiDesc: "Grundpfeiler unseres QMS: Managementbewertung und Audits.",
      comingSoon: "In Kürze verfügbar..."
    },
    en: {
      title: "Emig Academy",
      subtitle: "Central Learning Platform of EMIG GmbH",
      catQM: "Quality Management",
      catSAP: "SAP System Training",
      catMed: "Medical Products",
      startBtn: "Start Module",
      phiTitle: "QM Philosophy & Strategy",
      phiDesc: "Cornerstones of our QMS: Management review and audits.",
      comingSoon: "Coming soon..."
    },
    uk: {
      title: "Академія Emig",
      subtitle: "Zentrale навчальна платформа EMIG GmbH",
      catQM: "Управління якістю",
      catSAP: "Навчання системі SAP",
      catMed: "Медичні вироби",
      startBtn: "Запустити модуль",
      phiTitle: "Філософія та стратегія QM",
      phiDesc: "Основи нашої системи управління якістю та аудити.",
      comingSoon: "Незабаром..."
    }
  };

  const ModuleCard = ({ title, refCode, color, link = "#", isDraft = false }) => (
    <div style={{ 
      padding: '1.5rem', borderRadius: '18px', backgroundColor: '#ffffff', 
      display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      flex: '1 1 280px', minWidth: '250px', borderTop: `6px solid ${color}`,
      opacity: isDraft ? 0.7 : 1
    }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', minHeight: '2.5rem' }}>{title}</h3>
      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem', fontWeight: 'bold' }}>{refCode}</div>
      <div style={{ flexGrow: 1, fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>
        {isDraft ? t[lang].comingSoon : "Interaktives Modul / Interactive Module"}
      </div>
      <Link 
        style={{ backgroundColor: isDraft ? '#ccc' : color, color: 'white', padding: '12px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }} 
        to={isDraft ? "#" : link}
      >
        {isDraft ? "..." : t[lang].startBtn}
      </Link>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>{t[lang].title}</title>
      </Head>

      {/* DER NEUE NATIVE UMSCHALTER (DE | EN | UK) */}
      <div style={{ 
        position: 'absolute', top: '75px', right: '20px', zIndex: 100,
        backgroundColor: 'rgba(255,255,255,0.95)', padding: '8px', borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', gap: '5px'
      }}>
        {['de', 'en', 'uk'].map((l) => (
          <button 
            key={l}
            onClick={() => setLang(l)}
            style={{ 
              padding: '5px 10px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer',
              borderRadius: '8px', border: 'none',
              backgroundColor: lang === l ? '#333' : 'transparent',
              color: lang === l ? 'white' : '#333'
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <header style={{
        position: 'relative', backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover', backgroundPosition: '50% 30%',
        color: 'white', padding: '8rem 1rem', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)', fontWeight: '800' }}>{t[lang].title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', opacity: 0.9 }}>{t[lang].subtitle}</p>
        </div>
      </header>

      <main style={{ padding: '3rem 0', backgroundColor: '#f0f2f5' }}>
        <div style={{ width: '100%', padding: '0 5%' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '3rem', justifyContent: 'center' }}>
            <button onClick={() => setActiveCategory('QM')} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'QM' ? colorQM : 'white', color: activeCategory === 'QM' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer' }}>{t[lang].catQM}</button>
            <button onClick={() => setActiveCategory('SAP')} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'SAP' ? colorSAP : 'white', color: activeCategory === 'SAP' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer' }}>{t[lang].catSAP}</button>
            <button onClick={() => setActiveCategory('MED')} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'MED' ? colorMed : 'white', color: activeCategory === 'MED' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer' }}>{t[lang].catMed}</button>
          </div>

          {activeCategory === 'QM' && (
            <div>
              <div style={{ width: '100%', padding: '2rem', backgroundColor: 'white', borderRadius: '25px', borderLeft: `12px solid ${colorQM}`, marginBottom: '2.5rem', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h2>{t[lang].phiTitle}</h2>
                <p>{t[lang].phiDesc}</p>
                <Link to="/docs/quality-management/qm-philosophie" style={{ fontWeight: 'bold', color: colorQM }}>{lang === 'de' ? 'Starten' : 'Start'} →</Link>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <ModuleCard title={lang === 'uk' ? "Обов'язки імпортера" : "Importeurpflichten"} refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
                <ModuleCard title={lang === 'uk' ? "Умови зберігання" : "Lagerbedingungen"} refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
                <ModuleCard title={lang === 'uk' ? "Простежуваність" : "Rückverfolgbarkeit"} refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
                <ModuleCard title={lang === 'uk' ? "Обов'язки дистриб'ютора" : "Händlerpflichten"} refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
              </div>
            </div>
          )}

          {/* SAP & MED Kategorien bleiben analog mit t[lang].comingSoon */}
          {activeCategory === 'SAP' && <div style={{ textAlign: 'center', padding: '3rem' }}><h3>{t[lang].comingSoon}</h3></div>}
          {activeCategory === 'MED' && <div style={{ textAlign: 'center', padding: '3rem' }}><h3>{t[lang].comingSoon}</h3></div>}

        </div>
      </main>
    </Layout>
  );
}