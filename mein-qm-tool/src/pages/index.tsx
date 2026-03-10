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
  const colorMed = '#d32f2f';

  const t = {
    de: {
      title: "Emig Academy",
      subtitle: "Zentrale Lernplattform der EMIG GmbH",
      catQM: "Quality Management",
      catSAP: "SAP-System Training",
      catMed: "Medizinische Produkte",
      startBtn: "Modul starten",
      backBtn: "Zurück zur Auswahl",
      logTitle: "Logistik & Lager",
      einkaufTitle: "Einkauf & Lieferanten",
      regTitle: "Regulatorik der MDR",
      comingSoon: "Module folgen in Kürze..."
    },
    en: {
      title: "Emig Academy",
      subtitle: "Central Learning Platform of EMIG GmbH",
      catQM: "Quality Management",
      catSAP: "SAP System Training",
      catMed: "Medical Products",
      startBtn: "Start Module",
      backBtn: "Back to selection",
      logTitle: "Logistics & Warehouse",
      einkaufTitle: "Procurement & Suppliers",
      regTitle: "MDR Regulatory Affairs",
      comingSoon: "Modules coming soon..."
    },
    uk: {
      title: "Академія Emig",
      subtitle: "Центральна навчальна платформа EMIG GmbH",
      catQM: "Управління якістю",
      catSAP: "Навчання SAP",
      catMed: "Медичні вироби",
      startBtn: "Запустити",
      backBtn: "Назад",
      logTitle: "Логістика та склад",
      einkaufTitle: "Закупівлі та постачальники",
      regTitle: "Регулювання MDR",
      comingSoon: "Скоро буде..."
    }
  };

  const manufacturers = [
    { id: 'riwo', name: 'RIWOspine', logo: '/img/logo-riwospine.png' },
    { id: 'inomed', name: 'inomed', logo: '/img/logo-inomed.png' },
    { id: 'oncosem', name: 'oncosem', logo: '/img/logo-oncosem.png' },
    { id: 'bfmg', name: 'Black Forest Medical', logo: '/img/logo-bfmg.png' },
    { id: 'meyer', name: 'Meyer-Haake', logo: '/img/logo-meyer.png' },
    { id: 'brainlab', name: 'Brainlab', logo: '/img/logo-brainlab.png' }
  ];

  const ModuleCard = ({ title, refCode, color, link = "#", isDraft = false }) => (
    <div style={{ 
      padding: '1.5rem', borderRadius: '18px', backgroundColor: '#ffffff', 
      display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      flex: '1 1 calc(25% - 20px)', minWidth: '240px', maxWidth: '100%', borderTop: `6px solid ${color}`,
      opacity: isDraft ? 0.7 : 1, margin: '10px'
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
      <Head><title>{t[lang].title}</title></Head>

      <div style={{ position: 'absolute', top: '75px', right: '20px', zIndex: 100, backgroundColor: 'white', padding: '6px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', gap: '4px' }}>
        {['de', 'en', 'uk'].map((l) => (
          <button key={l} onClick={() => setLang(l as any)} style={{ padding: '6px 12px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', border: 'none', backgroundColor: lang === l ? '#333' : 'transparent', color: lang === l ? 'white' : '#333' }}>{l.toUpperCase()}</button>
        ))}
      </div>

      <header style={{ position: 'relative', backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: '50% 30%', color: 'white', padding: '8rem 1rem', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)', fontWeight: '800' }}>{t[lang].title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', opacity: 0.9 }}>{t[lang].subtitle}</p>
        </div>
      </header>

      <main style={{ padding: '3rem 0', backgroundColor: '#f0f2f5', minHeight: '1000px' }}>
        <div style={{ width: '100%', padding: '0 5%' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '4rem', justifyContent: 'center' }}>
            <button onClick={() => {setActiveCategory('QM'); setSelectedManufacturer(null);}} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'QM' ? colorQM : 'white', color: activeCategory === 'QM' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{t[lang].catQM}</button>
            <button onClick={() => {setActiveCategory('SAP'); setSelectedManufacturer(null);}} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'SAP' ? colorSAP : 'white', color: activeCategory === 'SAP' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{t[lang].catSAP}</button>
            <button onClick={() => {setActiveCategory('MED'); setSelectedManufacturer(null);}} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'MED' ? colorMed : 'white', color: activeCategory === 'MED' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{t[lang].catMed}</button>
          </div>

          {activeCategory === 'QM' && (
            <div style={{ paddingBottom: '100px' }}>
              <div style={{ width: '100%', padding: '2.5rem', backgroundColor: 'white', borderRadius: '25px', borderLeft: `12px solid ${colorQM}`, marginBottom: '3rem', boxShadow: '0 6px 15px rgba(0,0,0,0.05)' }}>
                <h2>QM Philosophie & Strategie</h2>
                <Link to="/docs/quality-management/qm-philosophie" style={{ fontWeight: 'bold', color: colorQM }}>Starten →</Link>
              </div>
              
              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>{t[lang].logTitle}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <ModuleCard title="Lagerbedingungen" refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
                <ModuleCard title="Rückverfolgbarkeit" refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
                <ModuleCard title="Sperrware" refCode="SOP-LOG-03" color={colorQM} link="/docs/logistik-lager/SOP_LOG-03" />
                <ModuleCard title="Inventur" refCode="SOP-LOG-04" color={colorQM} isDraft={true} />
              </div>

              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>{t[lang].einkaufTitle}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <ModuleCard title="Lieferanten" refCode="SOP-EINK-01" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-01" />
                <ModuleCard title="Einkaufsprozess" refCode="SOP-EINK-02" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-02" />
              </div>

              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>{t[lang].regTitle}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <ModuleCard title="Importeurpflichten" refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
                <ModuleCard title="Händlerpflichten" refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
                <ModuleCard title="PRRC" refCode="SOP-REG-03" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-03" />
                <ModuleCard title="Audits" refCode="SOP-REG-05" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-05" />
              </div>
            </div>
          )}

          {activeCategory === 'SAP' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '100px' }}>
              <ModuleCard title="SAP Basics" refCode="SAP-01" color={colorSAP} isDraft={true} />
              <ModuleCard title="SAP Warehouse" refCode="SAP-02" color={colorSAP} isDraft={true} />
              <ModuleCard title="SAP Purchasing" refCode="SAP-03" color={colorSAP} isDraft={true} />
              <ModuleCard title="SAP Batch Mgt" refCode="SAP-04" color={colorSAP} isDraft={true} />
            </div>
          )}

          {activeCategory === 'MED' && (
            <div>
              {!selectedManufacturer ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', paddingBottom: '100px', justifyContent: 'center' }}>
                  {manufacturers.map((m) => (
                    <div 
                      key={m.id} 
                      onClick={() => setSelectedManufacturer(m)}
                      style={{ 
                        flex: '1 1 calc(33.33% - 20px)', minWidth: '300px', backgroundColor: 'white', padding: '3rem 2rem', 
                        borderRadius: '25px', textAlign: 'center', cursor: 'pointer', 
                        boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderTop: `8px solid ${colorMed}`,
                        transition: 'transform 0.2s'
                      }}
                    >
                      <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <img 
                          src={useBaseUrl(m.logo)} 
                          alt={m.name}
                          style={{ maxWidth: '80%', maxHeight: '100%', objectFit: 'contain' }}
                          onError={(e) => { 
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const sibling = target.nextSibling as HTMLDivElement;
                            if (sibling) sibling.style.display = 'block';
                          }}
                        />
                        <div style={{ display: 'none', fontWeight: 'bold', color: colorMed, fontSize: '1.4rem' }}>{m.name}</div>
                      </div>
                      <div style={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}>{m.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ paddingBottom: '100px' }}>
                  <button onClick={() => setSelectedManufacturer(null)} style={{ marginBottom: '2rem', padding: '12px 25px', borderRadius: '12px', border: 'none', backgroundColor: '#333', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>← {t[lang].backBtn}</button>
                  <div style={{ backgroundColor: 'white', padding: '5rem', borderRadius: '30px', textAlign: 'center', borderTop: `12px solid ${colorMed}` }}>
                    <h2>{selectedManufacturer.name}</h2>
                    <p style={{ color: '#666' }}>{t[lang].comingSoon}</p>
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