import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  const [lang, setLang] = useState('de');
  const [activeCategory, setActiveCategory] = useState('QM');
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  const colorQM = '#e65100'; 
  const colorSAP = '#0070f3';
  const colorMed = '#d32f2f'; // EMIG Rot für Medizinprodukte

  const t = {
    de: {
      title: "Emig Academy",
      subtitle: "Zentrale Lernplattform der EMIG GmbH",
      catQM: "Quality Management",
      catSAP: "SAP-System Training",
      catMed: "Medizinische Produkte",
      startBtn: "Modul starten",
      backBtn: "Zurück zur Übersicht",
      phiTitle: "QM Philosophie & Strategie",
      comingSoon: "Module für diesen Hersteller folgen in Kürze."
    },
    en: {
      title: "Emig Academy",
      subtitle: "Central Learning Platform of EMIG GmbH",
      catQM: "Quality Management",
      catSAP: "SAP System Training",
      catMed: "Medical Products",
      startBtn: "Start Module",
      backBtn: "Back to overview",
      phiTitle: "QM Philosophy & Strategy",
      comingSoon: "Modules for this manufacturer follow soon."
    },
    uk: {
      title: "Академія Emig",
      subtitle: "Центральна навчальна платформа EMIG GmbH",
      catQM: "Управління якістю",
      catSAP: "Навчання SAP",
      catMed: "Медичні вироби",
      startBtn: "Запустити",
      backBtn: "Назад",
      phiTitle: "Філософія та стратегія QM",
      comingSoon: "Модулі для цього виробника з'являться незабаром."
    }
  };

  // Hersteller-Daten basierend auf Ihrer Folie
  const manufacturers = [
    { id: 'riwo', name: 'RIWOspine', logo: 'img/logo-riwospine.png' },
    { id: 'inomed', name: 'inomed', logo: 'img/logo-inomed.png' },
    { id: 'oncosem', name: 'oncosem', logo: 'img/logo-oncosem.png' },
    { id: 'bfmg', name: 'Black Forest Medical Group', logo: 'img/logo-bfmg.png' },
    { id: 'meyer', name: 'Meyer-Haake', logo: 'img/logo-meyer.png' },
    { id: 'brainlab', name: 'Brainlab', logo: 'img/logo-brainlab.png' }
  ];

  return (
    <Layout>
      <Head>
        <title>{t[lang].title}</title>
      </Head>

      {/* Sprachumschalter */}
      <div style={{ position: 'absolute', top: '75px', right: '20px', zIndex: 100, backgroundColor: 'white', padding: '6px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', gap: '4px' }}>
        {['de', 'en', 'uk'].map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{ padding: '6px 12px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', border: 'none', backgroundColor: lang === l ? '#333' : 'transparent', color: lang === l ? 'white' : '#333' }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <header style={{ position: 'relative', backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: '50% 30%', color: 'white', padding: '6rem 1rem', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)', fontWeight: '800' }}>{t[lang].title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', opacity: 0.9 }}>{t[lang].subtitle}</p>
        </div>
      </header>

      <main style={{ padding: '3rem 0', backgroundColor: '#f0f2f5' }}>
        <div style={{ width: '100%', padding: '0 5%' }}>
          
          {/* Haupt-Kategorien */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '3rem', justifyContent: 'center' }}>
            <button onClick={() => {setActiveCategory('QM'); setSelectedManufacturer(null);}} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'QM' ? colorQM : 'white', color: activeCategory === 'QM' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{t[lang].catQM}</button>
            <button onClick={() => {setActiveCategory('SAP'); setSelectedManufacturer(null);}} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'SAP' ? colorSAP : 'white', color: activeCategory === 'SAP' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{t[lang].catSAP}</button>
            <button onClick={() => {setActiveCategory('MED'); setSelectedManufacturer(null);}} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'MED' ? colorMed : 'white', color: activeCategory === 'MED' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{t[lang].catMed}</button>
          </div>

          {/* QM BEREICH */}
          {activeCategory === 'QM' && (
            <div>
              <div style={{ width: '100%', padding: '2rem', backgroundColor: 'white', borderRadius: '25px', borderLeft: `12px solid ${colorQM}`, marginBottom: '2.5rem', boxShadow: '0 6px 15px rgba(0,0,0,0.05)' }}>
                <h2>{t[lang].phiTitle}</h2>
                <Link to="/docs/quality-management/qm-philosophie" style={{ fontWeight: 'bold', color: colorQM }}>Starten →</Link>
              </div>
              {/* Hier folgen Ihre bestehenden QM-Module... */}
            </div>
          )}

          {/* MEDIZINISCHE PRODUKTE BEREICH */}
          {activeCategory === 'MED' && (
            <div>
              {!selectedManufacturer ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  {manufacturers.map((m) => (
                    <div 
                      key={m.id} 
                      onClick={() => setSelectedManufacturer(m)}
                      style={{ 
                        backgroundColor: 'white', padding: '2rem', borderRadius: '20px', textAlign: 'center', 
                        cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '2px solid transparent',
                        transition: '0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = colorMed}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    >
                      {/* Platzhalter für Logos - Pfad: static/img/logo-riwospine.png etc. */}
                      <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontWeight: 'bold', color: colorMed }}>{m.name}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>Produktschulungen</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ animation: 'fadeIn 0.5s' }}>
                  <button onClick={() => setSelectedManufacturer(null)} style={{ marginBottom: '2rem', padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#eee', cursor: 'pointer' }}>
                    ← {t[lang].backBtn}
                  </button>
                  <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '25px', textAlign: 'center', borderTop: `10px solid ${colorMed}` }}>
                    <h2>{selectedManufacturer.name}</h2>
                    <p style={{ color: '#666' }}>{t[lang].comingSoon}</p>
                    <div style={{ fontSize: '4rem', marginTop: '1rem' }}>📦</div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </Layout>
  );
}