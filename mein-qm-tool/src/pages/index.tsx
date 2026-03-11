import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

// Liste aller QM-Module für die Prozent-Rechnung
const ALL_QM_MODULES = [
  'SOP-LOG-01', 'SOP-LOG-02', 'SOP-LOG-03', 'SOP-LOG-04',
  'SOP-EINK-01', 'SOP-EINK-02',
  'SOP-REG-01', 'SOP-REG-02', 'SOP-REG-03', 'SOP-REG-05'
];

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  const [activeCategory, setActiveCategory] = useState('QM');
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  // Fortschritt beim Laden aus dem Browser-Speicher abrufen
  useEffect(() => {
    const saved = localStorage.getItem('emig_progress');
    if (saved) {
      try {
        setCompletedModules(JSON.parse(saved));
      } catch (e) {
        console.error("Fehler beim Laden des Fortschritts", e);
      }
    }
  }, []);

  // Berechnung des Fortschritts
  const progressPercent = Math.round((completedModules.length / ALL_QM_MODULES.length) * 100);
  const isFinalTestReady = progressPercent >= 100;

  const colorQM = '#e65100';
  const colorSAP = '#0070f3';
  const colorMed = '#d32f2f';

  // Komponente für ein einzelnes Lernmodul
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
        {/* FIX: paddingRight statt pr verwendet */}
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', paddingRight: '25px' }}>{title}</h3>
        <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem', fontWeight: 'bold' }}>{refCode}</div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.7rem', marginBottom: '4px' }}>{isDone ? 'Abgeschlossen' : 'Status: Offen'}</div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#eee', borderRadius: '3px' }}>
            <div style={{ width: isDone ? '100%' : '0%', height: '100%', backgroundColor: isDone ? '#4caf50' : color, borderRadius: '3px', transition: 'width 0.5s' }} />
          </div>
        </div>

        <Link 
          style={{ 
            backgroundColor: isDraft ? '#ccc' : (isDone ? '#4caf50' : color), 
            color: 'white', padding: '12px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' 
          }} 
          to={isDraft ? "#" : link}
        >
          {isDone ? "Wiederholen" : "Modul starten"}
        </Link>
      </div>
    );
  };

  return (
    <Layout>
      <Head><title>Emig Academy - Lernplattform</title></Head>

      <header style={{ position: 'relative', backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: '50% 30%', color: 'white', padding: '5rem 1rem', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Lern-Dashboard</h1>
          
          <div style={{ marginTop: '2.5rem', backgroundColor: 'rgba(255,255,255,0.15)', padding: '2rem', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 'bold' }}>
              <span>Fortschritt QM-Zertifizierung</span>
              <span>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '16px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#4caf50', transition: 'width 1.5s ease-in-out' }} />
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding: '3rem 0', backgroundColor: '#f0f2f5' }}>
        <div style={{ width: '100%', padding: '0 5%' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '3rem', justifyContent: 'center' }}>
            <button onClick={() => setActiveCategory('QM')} style={{ flex: '1 1 200px', padding: '1rem', borderRadius: '12px', border: 'none', backgroundColor: activeCategory === 'QM' ? colorQM : 'white', color: activeCategory === 'QM' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer' }}>Quality Management</button>
            <button onClick={() => setActiveCategory('SAP')} style={{ flex: '1 1 200px', padding: '1rem', borderRadius: '12px', border: 'none', backgroundColor: activeCategory === 'SAP' ? colorSAP : 'white', color: activeCategory === 'SAP' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer' }}>SAP-System</button>
            <button onClick={() => setActiveCategory('MED')} style={{ flex: '1 1 200px', padding: '1rem', borderRadius: '12px', border: 'none', backgroundColor: activeCategory === 'MED' ? colorMed : 'white', color: activeCategory === 'MED' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer' }}>Medizinprodukte</button>
          </div>

          {activeCategory === 'QM' && (
            <>
              {/* FINALER TEST BEREICH */}
              <div style={{ 
                marginBottom: '4rem', padding: '2rem', borderRadius: '25px', 
                backgroundColor: isFinalTestReady ? '#fff' : '#f0f0f0',
                border: `3px dashed ${isFinalTestReady ? '#4caf50' : '#ccc'}`,
                textAlign: 'center'
              }}>
                <h2 style={{ color: isFinalTestReady ? '#2e7d32' : '#999' }}>
                  {isFinalTestReady ? '🏆 Finaler Test freigeschaltet!' : '🔒 Finaler Test (Gesperrt)'}
                </h2>
                <button disabled={!isFinalTestReady} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', backgroundColor: isFinalTestReady ? '#4caf50' : '#ccc', color: 'white', fontWeight: 'bold', cursor: isFinalTestReady ? 'pointer' : 'not-allowed' }}>
                  Abschlusstest & Zertifikat
                </button>
              </div>

              {/* QM UNTERKATEGORIEN */}
              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>Logistik & Lager</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <ModuleCard title="Lagerbedingungen" refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
                <ModuleCard title="Rückverfolgbarkeit" refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
                <ModuleCard title="Sperrware" refCode="SOP-LOG-03" color={colorQM} link="/docs/logistik-lager/SOP_LOG-03" />
                <ModuleCard title="Inventur" refCode="SOP-LOG-04" color={colorQM} isDraft={true} />
              </div>

              <h2 style={{ borderLeft: `6px solid ${colorQM}`, paddingLeft: '15px', marginBottom: '1.5rem' }}>Regulatorik</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <ModuleCard title="Importeurpflichten" refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
                <ModuleCard title="Händlerpflichten" refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
              </div>
            </>
          )}

          {activeCategory === 'SAP' && <div style={{textAlign: 'center', padding: '5rem'}}>SAP Bereich (In Arbeit)</div>}
          {activeCategory === 'MED' && <div style={{textAlign: 'center', padding: '5rem'}}>Medizinprodukte (In Arbeit)</div>}

        </div>
      </main>
    </Layout>
  );
}