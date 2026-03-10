import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');
  const [activeCategory, setActiveCategory] = useState('QM');

  // Farbdefinitionen
  const colorQM = '#e65100';  // EMIG Orange
  const colorSAP = '#0070f3'; // SAP Blau
  const colorMed = '#d32f2f'; // Medizinisches Rot

  // Hilfskomponente für Modul-Karten (Responsive Flexbox)
  const ModuleCard = ({ title, refCode, color, link = "#", isDraft = false, categoryPath = "regulatorik-mdr" }) => (
    <div style={{ 
      padding: '1.5rem', 
      borderRadius: '18px', 
      backgroundColor: '#ffffff', 
      display: 'flex', 
      flexDirection: 'column', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      flex: '1 1 280px', // Sorgt für 4 Spalten auf Desktop und 1 auf Mobile
      minWidth: '250px',
      borderTop: `6px solid ${color}`,
      opacity: isDraft ? 0.7 : 1,
      transition: 'transform 0.2s'
    }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', minHeight: '2.5rem' }}>{title}</h3>
      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem', fontWeight: 'bold' }}>{refCode}</div>
      <div style={{ flexGrow: 1, fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>
        {isDraft ? "Dieses Modul wird derzeit entwickelt." : "Interaktives Schulungsmodul verfügbar."}
      </div>
      <Link 
        style={{ 
          backgroundColor: isDraft ? '#ccc' : color, 
          color: 'white', 
          padding: '12px', 
          borderRadius: '10px', 
          textAlign: 'center', 
          fontWeight: 'bold',
          pointerEvents: isDraft ? 'none' : 'auto',
          textDecoration: 'none'
        }} 
        to={isDraft ? "#" : link}
      >
        {isDraft ? "Vorschau" : "Modul starten"}
      </Link>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>Emig Academy | EMIG GmbH</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Google Translate Container - Oben Rechts */}
      <div style={{ 
        position: 'absolute', 
        top: '75px', 
        right: '20px', 
        zIndex: 100,
        backgroundColor: 'white',
        padding: '8px 12px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '0.75rem', color: '#666', marginRight: '8px', fontWeight: 'bold' }}>Translate:</span>
        <div id="google_translate_element"></div>
      </div>

      <header style={{
        position: 'relative', 
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover', 
        backgroundPosition: '50% 30%', // Optimiert für Desktop (Gebäude im Fokus)
        color: 'white', 
        padding: '8rem 1rem', 
        textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)', fontWeight: '800', margin: 0 }}>Emig Academy</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', opacity: 0.9, marginTop: '10px' }}>Zentrale Lernplattform der EMIG GmbH Reutlingen</p>
        </div>
      </header>

      <main style={{ padding: '3rem 0', backgroundColor: '#f0f2f5' }}>
        <div style={{ width: '100%', maxWidth: '100%', padding: '0 5%' }}>
          
          {/* KATEGORIEN-AUSWAHL */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '3.5rem', justifyContent: 'center' }}>
            <button onClick={() => setActiveCategory('QM')} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'QM' ? colorQM : 'white', color: activeCategory === 'QM' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: '0.3s' }}>Quality Management</button>
            <button onClick={() => setActiveCategory('SAP')} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'SAP' ? colorSAP : 'white', color: activeCategory === 'SAP' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: '0.3s' }}>SAP-System Training</button>
            <button onClick={() => setActiveCategory('MED')} style={{ flex: '1 1 250px', padding: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: activeCategory === 'MED' ? colorMed : 'white', color: activeCategory === 'MED' ? 'white' : '#444', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: '0.3s' }}>Medizinische Produkte</button>
          </div>

          {/* QM BEREICH */}
          {activeCategory === 'QM' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <div style={{ width: '100%', padding: '2.5rem', backgroundColor: 'white', borderRadius: '25px', borderLeft: `12px solid ${colorQM}`, marginBottom: '2.5rem', boxShadow: '0 6px 15px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>QM Philosophie & Strategie</h2>
                <p style={{ fontSize: '1.1rem', color: '#444' }}>Grundpfeiler unseres QMS: Managementbewertung, Dokumentenlenkung und interne Audits.</p>
                <Link to="/docs/quality-management/qm-philosophie" style={{ fontWeight: 'bold', color: colorQM, fontSize: '1.1rem' }}>Hier zur Philosophie →</Link>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <ModuleCard title="Importeurpflichten" refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
                <ModuleCard title="Lagerbedingungen" refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
                <ModuleCard title="Rückverfolgbarkeit" refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
                <ModuleCard title="Händlerpflichten" refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
              </div>
            </div>
          )}

          {/* SAP BEREICH */}
          {activeCategory === 'SAP' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', animation: 'fadeIn 0.5s' }}>
              <ModuleCard title="SAP Grundlagen & Navigation" refCode="SAP-SYS-01" color={colorSAP} isDraft={true} />
              <ModuleCard title="Lagerverwaltung in SAP" refCode="SAP-LOG-01" color={colorSAP} isDraft={true} />
              <ModuleCard title="Bestellwesen & Einkauf" refCode="SAP-PUR-01" color={colorSAP} isDraft={true} />
              <ModuleCard title="Chargenverwaltung" refCode="SAP-BAT-01" color={colorSAP} isDraft={true} />
            </div>
          )}

          {/* MEDIZIN PRODUKTE BEREICH */}
          {activeCategory === 'MED' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', animation: 'fadeIn 0.5s' }}>
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