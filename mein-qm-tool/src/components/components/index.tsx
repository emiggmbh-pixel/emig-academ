import React from 'react';
import Link from '@docusaurus/Link';
import LayoutBase from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

const Layout = LayoutBase as React.ComponentType<{title?: string; description?: string; children: React.ReactNode}>;

export default function Home() {
  const bgImageUrl = useBaseUrl('/img/emig-gebaeude.png');

  return (
    <Layout
      title="Emig Academy"
      description="Zentrale Lernplattform der Emig GmbH für QM und MDR">
      
      <header style={{
        position: 'relative',
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: '140%', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        padding: '10rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 'bold', textShadow: '2px 2px 10px rgba(0,0,0,0.7)' }}>
            Emig Academy
          </h1>
          <p style={{ fontSize: '1.8rem', opacity: 0.9, fontWeight: '300' }}>
            Qualität und Sicherheit am Standort Reutlingen
          </p>
        </div>
      </header>

      <main style={{ padding: '5rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#1c1e21' }}>Verfügbare Schulungsmodule</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            
            <div style={{ padding: '2.5rem', border: '1px solid #e1e4e8', borderRadius: '20px', backgroundColor: '#f8f9fa', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.6rem', color: '#000' }}>Importeurpflichten</h3>
              <p style={{ flexGrow: 1, color: '#666', marginBottom: '0.5rem' }}>Regulatorische Anforderungen gemäß MDR Artikel 13. [cite: 1, 2, 19]</p>
              <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '1.5rem' }}>Referenz: SOP-REG-01</div>
              <Link className="button button--primary button--lg button--block" to="/docs/regulatorik-mdr/SOP_REG-01">Modul starten</Link>
            </div>

            <div style={{ padding: '2.5rem', border: '1px solid #e1e4e8', borderRadius: '20px', backgroundColor: '#f8f9fa', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.6rem', color: '#000' }}>Händlerpflichten</h3>
              <p style={{ flexGrow: 1, color: '#666', marginBottom: '0.5rem' }}>Konformität beim Vertrieb innerhalb der EU gemäß MDR Artikel 14. [cite: 299, 300, 316]</p>
              <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '1.5rem' }}>Referenz: SOP-REG-02</div>
              <Link className="button button--secondary button--lg button--block" to="/docs/regulatorik-mdr/SOP_REG-02">Modul starten</Link>
            </div>

            <div style={{ padding: '2.5rem', border: '1px solid #e1e4e8', borderRadius: '20px', backgroundColor: '#f8f9fa', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.6rem', color: '#000' }}>Rolle der PRRC</h3>
              <p style={{ flexGrow: 1, color: '#666', marginBottom: '0.5rem' }}>Aufgaben der verantwortlichen Person gemäß MDR Artikel 15. [cite: 472, 473, 493]</p>
              <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '1.5rem' }}>Referenz: SOP-REG-03</div>
              <Link className="button button--outline button--primary button--lg button--block" to="/docs/regulatorik-mdr/SOP_REG-03">Modul starten</Link>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
}