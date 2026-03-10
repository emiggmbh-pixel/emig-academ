import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  const [lang, setLang] = useState('de');
  const [activeCategory, setActiveCategory] = useState('QM');

  const colorQM = '#e65100';  // Orange
  const colorSAP = '#0070f3'; // Blau
  const colorMed = '#d32f2f'; // Rot

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
      logTitle: "Logistik & Lager",
      einkaufTitle: "Einkauf & Lieferanten",
      regTitle: "Regulatorik der MDR",
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
      logTitle: "Logistics & Warehouse",
      einkaufTitle: "Procurement & Suppliers",
      regTitle: "MDR Regulatory Affairs",
      comingSoon: "Coming soon..."
    },
    uk: {
      title: "Академія Emig",
      subtitle: "Центральна навчальна платформа EMIG GmbH",
      catQM: "Управління якістю",
      catSAP: "Навчання SAP",
      catMed: "Медичні вироби",
      startBtn: "Запустити",
      phiTitle: "Філософія та стратегія QM",
      phiDesc: "Основи нашої системи управління якістю та аудити.",
      logTitle: "Логістика та склад",
      einkaufTitle: "Закупівлі та постачальники",
      regTitle: "Регулювання MDR",
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
        {isDraft ? t[lang].comingSoon : "Interaktives Modul"}
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

      <div style={{ position: 'absolute', top: '75px', right: '20px', zIndex: 100, backgroundColor: 'rgba(255,255,255,0.95)', padding: '6px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', gap: '4px' }}>
        {['de', 'en', 'uk'].map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{ padding: '6px 12px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', border: 'none', backgroundColor: lang === l ? '#333' : 'transparent', color: lang === l ? 'white' : '#333' }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <header style={{ position: 'relative', backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: '50% 30%', color: 'white', padding: '8rem 1rem', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)', fontWeight: '800' }}>{t[lang].title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', opacity: 0.9 }}>{t[lang].subtitle}</p>
        </div>
      </header>

      <main style={{ padding: '3rem 0', backgroundColor: '#f0f2f5' }}>
        <div style={{ width: '100%', padding: '0 5%' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '3rem', justifyContent: 'center' }}>
            <button onClick={() => setActiveCategory('QM')} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'QM' ? colorQM : 'white', color: activeCategory === 'QM' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{t[lang].catQM}</button>
            <button onClick={() => setActiveCategory('SAP')} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'SAP' ? colorSAP : 'white', color: activeCategory === 'SAP' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{t[lang].catSAP}</button>
            <button onClick={() => setActiveCategory('MED')} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'MED' ? colorMed : 'white', color: activeCategory === 'MED' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{t[lang].catMed}</button>
          </div>

          {activeCategory === 'QM' && (
            <div>
              {/* Philosophie Sektion */}
              <div style={{ width: '100%', padding: '2.5rem', backgroundColor: 'white', borderRadius: '25px', borderLeft: `12px solid ${colorQM}`, marginBottom: '3rem', boxShadow: '0 6px 15px rgba(0,0,0,0.05)' }}>
                <h2>{t[lang].phiTitle}</h2>
                <p>{t[lang].phiDesc}</p>
                <Link to="/docs/quality-management/qm-philosophie" style={{ fontWeight: 'bold', color: colorQM }}>{lang === 'de' ? 'Starten' : 'Start'} →</Link>
              </div>

              {/* UNTERKATEGORIEN IM QM BEREICH */}
              
              {/* Logistik */}
              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>{t[lang].logTitle}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '3rem' }}>
                <ModuleCard title={lang === 'uk' ? "Умови зберігання" : "Lagerbedingungen"} refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
                <ModuleCard title={lang === 'uk' ? "Простежуваність" : "Rückverfolgbarkeit"} refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
                <ModuleCard title={lang === 'uk' ? "Блоковані товари" : "Sperrware"} refCode="SOP-LOG-03" color={colorQM} link="/docs/logistik-lager/SOP_LOG-03" />
              </div>

              {/* Einkauf */}
              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>{t[lang].einkaufTitle}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '3rem' }}>
                <ModuleCard title={lang === 'uk' ? "Постачальники" : "Lieferanten"} refCode="SOP-EINK-01" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-01" />
                <ModuleCard title={lang === 'uk' ? "Процес закупівлі" : "Einkaufsprozess"} refCode="SOP-EINK-02" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-02" />
              </div>

              {/* Regulatorik */}
              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>{t[lang].regTitle}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <ModuleCard title={lang === 'uk' ? "Обов'язки імпортера" : "Importeurpflichten"} refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
                <ModuleCard title={lang === 'uk' ? "Обов'язки дистриб'ютора" : "Händlerpflichten"} refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
                <ModuleCard title="PRRC" refCode="SOP-REG-03" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-03" />
                <ModuleCard title={lang === 'uk' ? "Аудити" : "Audits"} refCode="SOP-REG-05" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-05" />
              </div>
            </div>
          )}

          {/* SAP & MED Kategorien mit Platzhaltern */}
          {activeCategory === 'SAP' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <ModuleCard title="SAP Basics" refCode="SAP-01" color={colorSAP} isDraft={true} />
              <ModuleCard title="SAP Warehouse" refCode="SAP-02" color={colorSAP} isDraft={true} />
            </div>
          )}
          {activeCategory === 'MED' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <ModuleCard title="Sterile Barrier" refCode="MED-01" color={colorMed} isDraft={true} />
              <ModuleCard title="UDI Labeling" refCode="MED-02" color={colorMed} isDraft={true} />
            </div>
          )}

        </div>
      </main>
    </Layout>
  );
}