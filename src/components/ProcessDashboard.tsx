import React, { useState } from 'react';
import { sapProcessPhases } from './ProcessData';

export default function ProcessDashboard() {
  const [activePhase, setActivePhase] = useState(null);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '20px', marginTop: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Interaktive SAP Prozesslandschaft</h2>
      
      {/* Phasen-Übersicht */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
        {sapProcessPhases.map((phase) => (
          <div 
            key={phase.id}
            onClick={() => setActivePhase(phase)}
            style={{ 
              padding: '1.5rem', 
              backgroundColor: activePhase?.id === phase.id ? phase.color : 'white',
              color: activePhase?.id === phase.id ? 'white' : '#333',
              borderRadius: '15px',
              cursor: 'pointer',
              flex: '1 1 200px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              borderBottom: `5px solid ${phase.color}`,
              transition: 'all 0.3s ease'
            }}
          >
            <strong style={{ fontSize: '1.1rem' }}>{phase.title}</strong>
          </div>
        ))}
      </div>

      {/* Detail-Ansicht der Schritte */}
      {activePhase && (
        <div style={{ marginTop: '3rem', animation: 'fadeIn 0.5s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: activePhase.color }} />
            <h3 style={{ margin: 0 }}>Details: {activePhase.title}</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {activePhase.steps.map((step, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '1.2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  borderLeft: `5px solid ${activePhase.color}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: activePhase.color }}>
                  {index + 1}. {step.label}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.4' }}>
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!activePhase && (
        <p style={{ textAlign: 'center', marginTop: '3rem', color: '#888', fontStyle: 'italic' }}>
          Klicken Sie auf eine Phase, um die SAP-Prozessschritte zu erkunden.
        </p>
      )}
    </div>
  );
}