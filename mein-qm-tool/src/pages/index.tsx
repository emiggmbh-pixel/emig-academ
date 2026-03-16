import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

// Liste aller QM-Module für die Berechnung des Fortschritts
const ALL_QM_MODULES = [
  'SOP-LOG-01', 'SOP-LOG-02', 'SOP-LOG-03', 'SOP-LOG-04',
  'SOP-EINK-01', 'SOP-EINK-02',
  'SOP-REG-01', 'SOP-REG-02', 'SOP-REG-03', 'SOP-REG-05'
];

// NEU: Liste der RIWOspine Produkte
const RIWOSPINE_PRODUCTS = [
  { title: 'Vertebris Stenose', refCode: 'RIWO-01', link: '/docs/medizinprodukte/riwospine/stenose' },
  { title: 'Vertebris Lumbar', refCode: 'RIWO-02', link: '/docs/medizinprodukte/riwospine/lumbar' },
  { title: 'Vertebris Cervical', refCode: 'RIWO-03', link: '/docs/medizinprodukte/riwospine/cervical' },
  { title: 'Instrumentarium & Optiken', refCode: 'RIWO-04', link: '/docs/medizinprodukte/riwospine/instrumente' },
];

const ManufacturerCard = ({ m, onClick, colorMed }) => {
  const [imgError, setImgError] = useState(false);
  const logoUrl = useBaseUrl(m.logo);

  return (
    <div 
      onClick={onClick}
      style={{ 
        flex: '1 1 calc(33.33% - 40px)', minWidth: '300px', backgroundColor: 'white', padding: '3rem 2rem', 
        borderRadius: '25px', textAlign: 'center', cursor: 'pointer', 
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderTop: `8px solid ${colorMed}`,
        transition: 'transform 0.2s', margin: '10px'
      }}
    >
      <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
        {!imgError ? (
          <img 
            src={logoUrl} 
            alt={m.name}
            style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{ fontWeight: 'bold', color: colorMed, fontSize: '1.5rem' }}>{m.name}</div>
        )}
      </div>
      <div style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'bold' }}>Produktschulungen →</div>
    </div>
  );
};

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  const [activeCategory, setActiveCategory] = useState('QM');
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('emig_progress');
    if (saved) { try { setCompletedModules(JSON.parse(saved)); } catch (e) {}}
  }, []);

  const progressPercent = Math.round((completedModules.length / ALL_QM_MODULES.length) * 100);
  const isFinalTestReady = progressPercent >= 100;

  const colorQM = '#e65100';
  const colorSAP = '#0070f3';
  const colorMed = '#d32f2f';

  const ModuleCard = ({ title, refCode, color, link = "#", isDraft = false }) => {
    const isDone = completedModules.includes(refCode);
    return (
      <div style={{ 
        padding: '1.5rem', borderRadius: '18px', backgroundColor: '#ffffff', 
        display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        flex: '1 1 calc(25% - 20px)', minWidth: '240px', borderTop: `6px solid ${isDone ? '#4caf50' : color}`,
        opacity: isDraft ? 0.7 : 1, margin: '10px', position: 'relative'
      }}>
        {isDone && <div style={{ position: 'absolute', top: '10px', right: '15px' }}>✅</div>}
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', paddingRight: '25px' }}>{title}</h3>
        <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem' }}>{refCode}</div>
        <div style={{ width: '100%', height: '4px', backgroundColor: '#eee', borderRadius: '2px', marginBottom: '1rem' }}>
          <div style={{ width: isDone ? '100%' : '0%', height: '100%', backgroundColor: isDone ? '#4caf50' : color, borderRadius: '2px' }} />
        </div>
        <Link style={{ backgroundColor: isDraft ? '#ccc' : (isDone ? '#4caf50' : color), color: 'white', padding: '10px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }} to={isDraft ? "#" : link}>
          {isDone ? "Wiederholen" : "Starten"}
        </Link>
      </div>
    );
  };

  return (
    <Layout>
      <Head><title>Emig Academy</title></Head>

      <header style={{ 
        position: 'relative', 
        backgroundImage: `url(${bgImageUrl})`, 
        backgroundSize: '150%', 
        backgroundPosition: '10% 40%', 
        color: 'white', 
        padding: '8rem 1rem', 
        textAlign: 'center' 
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '800' }}>Emig Academy</h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>Lernplattform</p>
        </div>
      </header>

      <main style={{ padding: '3rem 0', backgroundColor: '#f0f2f5', minHeight: '1000px' }}>
        <div style={{ width: '100%', padding: '0 5%' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '3rem', justifyContent: 'center' }}>
            <button onClick={() => {setActiveCategory('QM'); setSelectedManufacturer(null);}} style={{ flex: '1 1 200px', padding: '1rem', borderRadius: '12px', border: 'none', backgroundColor: activeCategory === 'QM' ? colorQM : 'white', color: activeCategory === 'QM' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer' }}>Quality Management</button>
            <button onClick={() => {setActiveCategory('SAP'); setSelectedManufacturer(null);}} style={{ flex: '1 1 200px', padding: '1rem', borderRadius: '12px', border: 'none', backgroundColor: activeCategory === 'SAP' ? colorSAP : 'white', color: activeCategory === 'SAP' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer' }}>SAP-System</button>
            <button onClick={() => {setActiveCategory('MED'); setSelectedManufacturer(null);}} style={{ flex: '1 1 200px', padding: '1rem', borderRadius: '12px', border: 'none', backgroundColor: activeCategory === 'MED' ? colorMed : 'white', color: activeCategory === 'MED' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer' }}>Medizinprodukte</button>
          </div>

          {activeCategory === 'QM' && (
            <div>
              <div style={{ maxWidth: '450px', margin: '0 auto 2.5rem', backgroundColor: 'white', padding: '1.2rem', borderRadius: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  <span>QM Gesamtfortschritt</span>
                  <span>{progressPercent}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#4caf50', transition: 'width 1s' }} />
                </div>
              </div>

              <div style={{ marginBottom: '3rem', padding: '2rem', borderRadius: '25px', backgroundColor: isFinalTestReady ? '#fff' : '#f5f5f5', border: `2px dashed ${isFinalTestReady ? '#4caf50' : '#ccc'}`, textAlign: 'center' }}>
                <h3 style={{ color: isFinalTestReady ? '#2e7d32' : '#999' }}>{isFinalTestReady ? '🏆 Finaler Test & Zertifikat' : '🔒 Finaler Test (Gesperrt)'}</h3>
                <button disabled={!isFinalTestReady} style={{ padding: '10px 25px', borderRadius: '10px', border: 'none', backgroundColor: isFinalTestReady ? '#4caf50' : '#ccc', color: 'white', fontWeight: 'bold', cursor: isFinalTestReady ? 'pointer' : 'not-allowed' }}>Prüfung starten</button>
              </div>

              <div style={{ width: '100%', padding: '2.5rem', backgroundColor: 'white', borderRadius: '25px', borderLeft: `12px solid ${colorQM}`, marginBottom: '3rem', boxShadow: '0 6px 15px rgba(0,0,0,0.05)' }}>
                <h2>QM Philosophie & Strategie</h2>
                <p>Grundpfeiler unseres Qualitätsmanagementsystems.</p>
                <Link to="/docs/quality-management/qm-philosophie" style={{ fontWeight: 'bold', color: colorQM }}>Hier zur Philosophie →</Link>
              </div>

              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>Logistik & Lager</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <ModuleCard title="Lagerbedingungen" refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
                <ModuleCard title="Rückverfolgbarkeit" refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
                <ModuleCard title="Sperrware" refCode="SOP-LOG-03" color={colorQM} link="/docs/logistik-lager/SOP_LOG-03" />
                <ModuleCard title="Inventur" refCode="SOP-LOG-04" color={colorQM} isDraft={true} />
              </div>

              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>Einkauf & Lieferanten</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <ModuleCard title="Lieferanten" refCode="SOP-EINK-01" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-01" />
                <ModuleCard title="Einkaufsprozess" refCode="SOP-EINK-02" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-02" />
              </div>

              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>Regulatorik & MDR</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <ModuleCard title="Importeurpflichten" refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
                <ModuleCard title="Händlerpflichten" refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
                <ModuleCard title="PRRC" refCode="SOP-REG-03" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-03" />
                <ModuleCard title="Audits" refCode="SOP-REG-05" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-05" />
              </div>
            </div>
          )}

          {activeCategory === 'SAP' && (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <ModuleCard title="SAP Basics" refCode="SAP-01" color={colorSAP} isDraft={true} />
              <ModuleCard title="SAP Warehouse" refCode="SAP-02" color={colorSAP} isDraft={true} />
              <ModuleCard title="SAP Purchasing" refCode="SAP-03" color={colorSAP} isDraft={true} />
              <ModuleCard title="SAP Batch Mgt" refCode="SAP-04" color={colorSAP} isDraft={true} />
            </div>
          )}

          {activeCategory === 'MED' && (
            <div>
              {!selectedManufacturer ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                  {[
                    { id: 'riwo', name: 'RIWOspine', logo: '/img/logo-riwospine.png' },
                    { id: 'inomed', name: 'inomed', logo: '/img/logo-inomed.png' },
                    { id: 'oncosem', name: 'oncosem', logo: '/img/logo-oncosem.png' },
                    { id: 'bfmg', name: 'Black Forest Medical', logo: '/img/logo-bfmg.png' },
                    { id: 'meyer', name: 'Meyer-Haake', logo: '/img/logo-meyer.png' },
                    { id: 'brainlab', name: 'Brainlab', logo: '/img/logo-brainlab.png' }
                  ].map((m) => (
                    <ManufacturerCard key={m.id} m={m} onClick={() => setSelectedManufacturer(m)} colorMed={colorMed} />
                  ))}
                </div>
              ) : (
                <div style={{ padding: '2rem' }}>
                  <button 
                    onClick={() => setSelectedManufacturer(null)} 
                    style={{ marginBottom: '2rem', padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#333', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    ← Zurück zur Übersicht
                  </button>

                  <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: colorMed }}>{selectedManufacturer.name}</h2>
                    <p>Wählen Sie ein Produktmodul aus, um die Produktschulung zu starten.</p>
                  </div>

                  {/* Spezielle Logik für RIWOspine Produkte */}
                  {selectedManufacturer.id === 'riwo' ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {RIWOSPINE_PRODUCTS.map((prod) => (
                        <ModuleCard 
                          key={prod.refCode}
                          title={prod.title} 
                          refCode={prod.refCode} 
                          color={colorMed} 
                          link={prod.link} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: '30px' }}>
                      <p>Inhalte für {selectedManufacturer.name} folgen in Kürze.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}