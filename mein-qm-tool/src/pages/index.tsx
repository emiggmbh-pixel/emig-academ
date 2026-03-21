import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALL_QM_MODULES = [
  'SOP-LOG-01', 'SOP-LOG-02', 'SOP-LOG-03', 'SOP-LOG-04',
  'SOP-EINK-01', 'SOP-EINK-02',
  'SOP-REG-01', 'SOP-REG-02', 'SOP-REG-03', 'SOP-REG-05',
];

const RIWOSPINE_PRODUCTS = [
  { title: 'Vertebris Stenose',         refCode: 'RIWO-01', link: '/docs/medizinprodukte/riwospine/stenose',     desc: 'Vollendoskopische Dekompression bei spinaler Stenose' },
  { title: 'Vertebris Lumbar',          refCode: 'RIWO-02', link: '/docs/medizinprodukte/riwospine/lumbar',      desc: 'Bandscheibenchirurgie der Lendenwirbelsäule' },
  { title: 'Vertebris Cervical',        refCode: 'RIWO-03', link: '/docs/medizinprodukte/riwospine/cervical',    desc: 'Vollendoskopische Chirurgie der Halswirbelsäule' },
  { title: 'Instrumentarium & Optiken', refCode: 'RIWO-04', link: '/docs/medizinprodukte/riwospine/instrumente', desc: 'Hochpräzisions-Endoskope und Instrumente' },
];

const SAP_PHASES = [
  {
    id: 'vertrieb', title: 'Vertrieb & Angebot', color: '#c8a96e',
    steps: [
      { label: 'Anfrageeingang',    detail: 'Kunde sendet Anfrage per E-Mail oder Formular. Aufnahme im CRM.' },
      { label: 'CRM & Kalkulation', detail: 'Auswahl des Kunden in SAP. System zeigt Einkaufspreis und Marge an.' },
      { label: 'PDF-Angebot',       detail: 'Erstellung und Versand des Angebots direkt aus SAP als PDF.' },
      { label: 'Kundenauftrag',     detail: 'Umwandlung in Auftrag. Bestandsreservierung erfolgt automatisch.' },
    ],
  },
  {
    id: 'beschaffung', title: 'Beschaffung & Wareneingang', color: '#6ea8c8',
    steps: [
      { label: 'Bestellvorschläge',     detail: 'SAP prüft Mindestbestände und generiert automatisch Bestellvorschläge.' },
      { label: 'Lieferantenbestellung', detail: 'Bestellung in Einkaufseinheiten (Karton/Palette). Buchung in SAP.' },
      { label: 'Wareneingang',          detail: 'LKW liefert Ware. Einbuchung ins Lagersystem in Echtzeit.' },
      { label: 'MDR-Check',             detail: 'Scan UDI/Barcode, Erfassung Charge und Verfallsdatum gemäß MDR.' },
    ],
  },
  {
    id: 'lager', title: 'Lager & Versand', color: '#6ec8a0',
    steps: [
      { label: 'Pickliste',      detail: 'Kundenauftrag freigegeben – SAP generiert die Entnahmeliste automatisch.' },
      { label: 'MDR-Pflicht',    detail: 'Lagerist scannt beim Entnehmen die konkrete Charge für den Kunden.' },
      { label: 'Versandpapiere', detail: 'Verpackung und Erstellung aller Lieferpapiere direkt aus SAP.' },
    ],
  },
  {
    id: 'service', title: 'Service-Prozess', color: '#c86e6e',
    steps: [
      { label: 'Serviceabruf',         detail: 'Anlage Serviceauftrag: Szenario A (Vor-Ort) oder Szenario B (Rücksendung).' },
      { label: 'Ersatzteilmanagement', detail: 'Entnahme vom Techniker-Wagen oder Hauptlager. Buchung in Echtzeit.' },
      { label: 'Equipment-Update',     detail: 'Aktualisierung der Gerätestammkarte bei Seriennummern-Tausch.' },
    ],
  },
];

const MANUFACTURERS = [
  { id: 'riwo',     name: 'RIWOspine',           logo: '/img/logo-riwospine.png' },
  { id: 'inomed',   name: 'inomed',               logo: '/img/logo-inomed.png' },
  { id: 'oncosem',  name: 'oncosem',              logo: '/img/logo-oncosem.png' },
  { id: 'bfmg',     name: 'Black Forest Medical', logo: '/img/logo-bfmg.png' },
  { id: 'meyer',    name: 'Meyer-Haake',          logo: '/img/logo-meyer.png' },
  { id: 'brainlab', name: 'Brainlab',             logo: '/img/logo-brainlab.png' },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
/* ── Fonts: Bebas Neue (bold display) + DM Sans (body) ── */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

:root {
  --gold:    #c8a96e;
  --gold-lt: #e8d5a8;
  --dark:    #0a0a0c;
  --dark2:   #111116;
  --dark3:   #1a1a22;
  --border:  rgba(200,169,110,0.16);
  --cream:   #f5f3ee;
  --text:    #18181f;
  --radius:  14px;
}

*, *::before, *::after { box-sizing: border-box; }
body { background: var(--cream); }
.ea  { font-family: 'DM Sans', sans-serif; color: var(--text); }

/* ════════════════════════════════════════
   HERO
════════════════════════════════════════ */
.ea-hero {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background: var(--dark);
}

/* ── Video / poster layer ── */
.ea-hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.ea-hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

/* ── Cinematic gradient – heavier at bottom for legibility ── */
.ea-hero-vignette {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(to top,
      rgba(6,6,8,0.94) 0%,
      rgba(6,6,8,0.65) 28%,
      rgba(6,6,8,0.25) 58%,
      rgba(6,6,8,0.05) 82%,
      transparent 100%
    ),
    linear-gradient(100deg,
      rgba(6,6,8,0.55) 0%,
      transparent 52%
    );
}

/* ── Film grain ── */
.ea-hero-grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
}

/* ── Thin gold lines – top & bottom frame ── */
.ea-hero-frame-t,
.ea-hero-frame-b {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  z-index: 3;
  background: linear-gradient(90deg, transparent, rgba(200,169,110,0.35), transparent);
}
.ea-hero-frame-t { top: 0; }
.ea-hero-frame-b { bottom: 0; }

/* ── Text block ── */
.ea-hero-content {
  position: relative;
  z-index: 4;
  padding: 0 7% 9vh;
  max-width: 820px;
}

/* Eyebrow label */
.ea-hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.6rem;
}
.ea-hero-eyebrow::before {
  content: '';
  display: block;
  width: 36px;
  height: 1px;
  background: var(--gold);
  opacity: 0.7;
  flex-shrink: 0;
}
.ea-hero-eyebrow span {
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--gold);
}

/*
  TITLE – Bebas Neue gives a strong, architectural feel.
  Split into two sizes: company name smaller, "ACADEMY" dominant.
*/
.ea-hero-title {
  margin: 0;
  line-height: 1;
}
.ea-hero-title-top {
  display: block;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.22em;
  font-weight: 400;
}
.ea-hero-title-main {
  display: block;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5.5rem, 14vw, 11rem);
  color: #ffffff;
  letter-spacing: 0.06em;
  font-weight: 400;
  line-height: 0.85;
  /* Subtle gold gradient on the text */
  background: linear-gradient(135deg, #ffffff 40%, var(--gold-lt) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ea-hero-tagline {
  font-size: clamp(0.88rem, 1.6vw, 1.05rem);
  color: rgba(238,234,224,0.45);
  font-weight: 300;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 1.4rem 0 0;
}

/* Stats */
.ea-hero-stats {
  display: flex;
  align-items: stretch;
  gap: 0;
  margin-top: 3rem;
  flex-wrap: wrap;
}
.ea-hero-stat {
  padding-right: 2.2rem;
  margin-right: 2.2rem;
  border-right: 1px solid rgba(200,169,110,0.18);
}
.ea-hero-stat:last-child { border-right: none; padding-right: 0; margin-right: 0; }
.ea-stat-n {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.8rem;
  color: #fff;
  line-height: 1;
  display: block;
  letter-spacing: 0.04em;
}
.ea-stat-l {
  font-size: 0.65rem;
  color: rgba(238,234,224,0.35);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 500;
  display: block;
  margin-top: 4px;
}

/* Video toggle button */
.ea-vid-btn {
  position: absolute;
  bottom: 2.5rem;
  right: 4%;
  z-index: 5;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.45);
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(14px);
  font-size: 0.7rem;
}
.ea-vid-btn:hover {
  background: rgba(200,169,110,0.18);
  color: var(--gold-lt);
  border-color: var(--gold);
}

/* ════════════════════════════════════════
   MAIN
════════════════════════════════════════ */
.ea-main {
  background: var(--cream);
  padding: 3rem 0 6rem;
}
.ea-wrap {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 5%;
}

/* ── Welcome bar ── */
.ea-welcome {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.3rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.ea-welcome-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: #fff;
}
.ea-welcome-sub { font-size: 0.78rem; color: rgba(255,255,255,0.3); margin-top: 3px; }
.ea-welcome-pill {
  background: rgba(200,169,110,0.12);
  border: 1px solid rgba(200,169,110,0.28);
  color: var(--gold-lt);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 99px;
  white-space: nowrap;
}

/* ── Tabs ── */
.ea-tabs {
  display: flex;
  background: #fff;
  border-radius: var(--radius);
  padding: 4px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05);
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 0;
}
.ea-tab {
  flex: 1 1 130px;
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.ea-tab.active {
  background: var(--dark2);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.16);
}
.ea-tab:hover:not(.active) { background: #f0ede8; color: #1f2937; }

/* ── Section heading ── */
.ea-h {
  font-size: 1rem;
  font-weight: 600;
  color: #111;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 2.5rem 0 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: 'DM Sans', sans-serif;
}
.ea-h-bar  { width: 20px; height: 2px; border-radius: 99px; flex-shrink: 0; }
.ea-h-rule { flex: 1; height: 1px; background: linear-gradient(90deg, #dedad4, transparent); }

/* ── Progress card ── */
.ea-prog {
  background: var(--dark2);
  border-radius: 16px;
  padding: 1.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.75rem;
  border: 1px solid var(--border);
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
}
.ea-prog::after {
  content: '';
  position: absolute;
  top: -50px; right: -50px;
  width: 220px; height: 220px;
  background: radial-gradient(circle, rgba(200,169,110,0.07), transparent 70%);
  pointer-events: none;
}
.ea-prog-info { flex: 1; min-width: 160px; }
.ea-prog-label {
  font-size: 0.65rem;
  color: rgba(200,169,110,0.7);
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-weight: 600;
  margin-bottom: 0.8rem;
}
.ea-prog-track { height: 4px; background: rgba(255,255,255,0.07); border-radius: 99px; overflow: hidden; }
.ea-prog-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold), #edd9a3);
  border-radius: 99px;
  transition: width 1.5s cubic-bezier(0.4,0,0.2,1);
}
.ea-prog-sub { font-size: 0.73rem; color: rgba(255,255,255,0.25); margin-top: 8px; }
.ea-prog-pct {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3.6rem;
  color: var(--gold-lt);
  line-height: 1;
  min-width: 90px;
  text-align: right;
  letter-spacing: 0.04em;
}

/* ── Philosophy panel ── */
.ea-philo {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.75rem 2.25rem;
  margin-bottom: 1.75rem;
  position: relative;
  overflow: hidden;
}
.ea-philo::before {
  content: 'QM';
  position: absolute;
  right: 1.5rem; top: 50%;
  transform: translateY(-50%);
  font-family: 'Bebas Neue', sans-serif;
  font-size: 6rem;
  color: rgba(200,169,110,0.05);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  letter-spacing: 0.1em;
}
.ea-philo-title { font-size: 1.1rem; font-weight: 600; color: #fff; margin: 0 0 5px; }
.ea-philo-body  { color: rgba(255,255,255,0.38); font-size: 0.86rem; margin: 0 0 1.1rem; }
.ea-philo-link  { color: var(--gold-lt); font-size: 0.82rem; font-weight: 600; text-decoration: none; letter-spacing: 0.04em; transition: color 0.2s; }
.ea-philo-link:hover { color: #fff; }

/* ── Final test box ── */
.ea-test {
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  border: 1.5px solid;
  transition: all 0.3s;
}
.ea-test-btn {
  padding: 11px 24px;
  border-radius: 10px;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.86rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

/* ── Module grid ── */
.ea-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  gap: 12px;
  margin-bottom: 0.5rem;
}

/* ── Module card ── */
.ea-card {
  background: #fff;
  border-radius: var(--radius);
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.22s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.048);
}
.ea-card:hover { transform: translateY(-3px); box-shadow: 0 10px 26px rgba(0,0,0,0.09); }
.ea-card-stripe { position: absolute; top: 0; left: 0; right: 0; height: 2px; }
.ea-card-title  { font-weight: 600; font-size: 0.94rem; color: #111; margin: 0 0 5px; line-height: 1.35; }
.ea-card-code   {
  font-family: 'SF Mono','Fira Code',monospace;
  font-size: 0.67rem;
  color: #9ca3af;
  background: #f7f5f0;
  border: 1px solid #ece9e3;
  padding: 2px 8px;
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 1rem;
}
.ea-card-bar { height: 2px; background: #f0ede8; border-radius: 99px; margin-bottom: 1rem; overflow: hidden; }
.ea-card-bar-fill { height: 100%; border-radius: 99px; transition: width 0.8s ease; }
.ea-card-btn {
  display: block;
  text-align: center;
  padding: 11px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.84rem;
  text-decoration: none;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s;
  margin-top: auto;
}
.ea-card-btn:hover { filter: brightness(1.07); transform: translateY(-1px); }

/* ── Manufacturer grid ── */
.ea-mfr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(255px, 1fr)); gap: 12px; }
.ea-mfr-card {
  background: #fff;
  border-radius: var(--radius);
  padding: 2.25rem 1.75rem 1.75rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.048);
  transition: all 0.22s ease;
  position: relative;
  overflow: hidden;
}
.ea-mfr-card:hover { transform: translateY(-4px); box-shadow: 0 14px 32px rgba(0,0,0,0.08); }
.ea-mfr-top { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #dc2626; border-radius: var(--radius) var(--radius) 0 0; }
.ea-mfr-label { font-size: 0.72rem; color: #9ca3af; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 1rem; }

/* ── Back button ── */
.ea-back {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 1px solid #dedad4;
  background: #fff;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.84rem;
  cursor: pointer;
  margin-bottom: 1.75rem;
  color: #374151;
  transition: all 0.2s;
}
.ea-back:hover { background: #f7f5f0; }

/* ── Manufacturer detail header ── */
.ea-manu-hd {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.75rem 2.25rem;
  margin-bottom: 1.75rem;
}
.ea-manu-hd-title { font-size: 1.7rem; font-weight: 700; color: #fff; margin: 0 0 4px; }
.ea-manu-hd-sub   { font-size: 0.84rem; color: rgba(255,255,255,0.32); margin: 0; }

/* ── SAP grid ── */
.ea-sap-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(192px, 1fr)); gap: 11px; margin-bottom: 1.5rem; }
.ea-sap-btn {
  padding: 1.4rem;
  border-radius: var(--radius);
  border: 1px solid #dedad4;
  background: #fff;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  font-family: 'DM Sans', sans-serif;
}
.ea-sap-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.07); }
.ea-sap-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.4rem;
  line-height: 1;
  margin-bottom: 0.4rem;
  letter-spacing: 0.04em;
}
.ea-sap-name  { font-size: 0.85rem; font-weight: 600; line-height: 1.3; }
.ea-sap-count { font-size: 0.68rem; color: #9ca3af; margin-top: 4px; }

.ea-sap-panel {
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.048);
  animation: ea-up 0.28s ease;
}
.ea-sap-panel-hd {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #f0ede8;
  margin-bottom: 1.4rem;
  flex-wrap: wrap;
}
.ea-sap-panel-title { font-size: 1.1rem; font-weight: 600; color: #111; }
.ea-sap-panel-sub   { font-size: 0.72rem; color: #9ca3af; }
.ea-sap-step-grid   { display: grid; grid-template-columns: repeat(auto-fill, minmax(255px,1fr)); gap: 11px; }
.ea-sap-step {
  padding: 1.2rem;
  border-radius: 11px;
  border-left: 3px solid;
  cursor: pointer;
  transition: background 0.18s;
}
.ea-sap-step:hover { filter: brightness(0.97); }
.ea-sap-step-label  { font-weight: 700; font-size: 0.85rem; margin-bottom: 6px; }
.ea-sap-step-body   { font-size: 0.8rem; color: #6b7280; line-height: 1.55; margin: 0; }
.ea-sap-step-action { font-size: 0.68rem; font-weight: 600; margin-top: 9px; opacity: 0.6; }

/* ── Draft box ── */
.ea-draft {
  text-align: center;
  padding: 4rem 2rem;
  background: #fff;
  border-radius: 16px;
  border: 1.5px dashed #dedad4;
}
.ea-draft-title { font-size: 1.1rem; font-weight: 600; color: #374151; margin: 0 0 0.4rem; }
.ea-draft-sub   { font-size: 0.86rem; color: #9ca3af; margin: 0; }

/* ── Animations ── */
@keyframes ea-up {
  from { opacity: 0; transform: translateY(7px); }
  to   { opacity: 1; transform: translateY(0);   }
}
.ea-anim { animation: ea-up 0.33s ease; }
`;

// ─── SAP DASHBOARD ───────────────────────────────────────────────────────────

function SAPDashboard() {
  const [activePhase, setActivePhase] = useState<(typeof SAP_PHASES)[0] | null>(null);
  const [readSteps, setReadSteps] = useState<Set<string>>(new Set());

  const toggle = (key: string) =>
    setReadSteps(prev => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; });

  return (
    <div>
      <div className="ea-sap-grid">
        {SAP_PHASES.map((phase, i) => {
          const active = activePhase?.id === phase.id;
          const cnt = [...readSteps].filter(k => k.startsWith(phase.id + '-')).length;
          return (
            <button
              key={phase.id}
              className="ea-sap-btn"
              onClick={() => setActivePhase(active ? null : phase)}
              style={{
                background:  active ? '#111116' : '#fff',
                borderColor: active ? phase.color : '#dedad4',
                boxShadow:   active ? `0 0 0 1px ${phase.color}55, 0 8px 22px rgba(0,0,0,0.14)` : undefined,
              }}
            >
              <div className="ea-sap-num" style={{ color: active ? phase.color : '#ccc9c2' }}>0{i + 1}</div>
              <div className="ea-sap-name" style={{ color: active ? '#fff' : '#1f2937' }}>{phase.title}</div>
              <div className="ea-sap-count">{cnt}/{phase.steps.length} gelesen</div>
            </button>
          );
        })}
      </div>

      {activePhase && (
        <div className="ea-sap-panel">
          <div className="ea-sap-panel-hd">
            <div>
              <div className="ea-sap-panel-title">{activePhase.title}</div>
              <div className="ea-sap-panel-sub">
                {[...readSteps].filter(k => k.startsWith(activePhase.id + '-')).length} / {activePhase.steps.length} Schritte abgehakt
              </div>
            </div>
            <div style={{ width: '96px' }}>
              <div style={{ height: '3px', background: '#f0ede8', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', background: activePhase.color, borderRadius: '99px',
                  width: `${([...readSteps].filter(k => k.startsWith(activePhase.id + '-')).length / activePhase.steps.length) * 100}%`,
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>
          </div>

          <div className="ea-sap-step-grid">
            {activePhase.steps.map((step, i) => {
              const key = `${activePhase.id}-${i}`;
              const done = readSteps.has(key);
              return (
                <div
                  key={i}
                  className="ea-sap-step"
                  style={{ borderLeftColor: done ? '#10b981' : activePhase.color, background: done ? '#f0fdf4' : '#f8f7f3' }}
                  onClick={() => toggle(key)}
                >
                  <div className="ea-sap-step-label" style={{ color: done ? '#059669' : '#111' }}>
                    {i + 1}. {step.label}{done ? '  ✓' : ''}
                  </div>
                  <p className="ea-sap-step-body">{step.detail}</p>
                  <div className="ea-sap-step-action" style={{ color: done ? '#10b981' : '#9ca3af' }}>
                    {done ? 'Gelesen' : 'Klicken zum Markieren'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!activePhase && (
        <div style={{ textAlign: 'center', padding: '2.5rem', color: '#9ca3af', fontSize: '0.86rem' }}>
          Wählen Sie eine Phase, um die Schritte zu erkunden.
        </div>
      )}
    </div>
  );
}

// ─── MANUFACTURER CARD ───────────────────────────────────────────────────────

function ManufacturerCard({ m, onClick }: any) {
  const [err, setErr] = useState(false);
  const logo = useBaseUrl(m.logo);
  return (
    <div className="ea-mfr-card" onClick={onClick}>
      <div className="ea-mfr-top" />
      <div style={{ height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
        {!err
          ? <img src={logo} alt={m.name} style={{ maxWidth: '80%', maxHeight: '100%', objectFit: 'contain' }} onError={() => setErr(true)} />
          : <span style={{ fontWeight: 700, color: '#dc2626', fontSize: '1rem' }}>{m.name}</span>
        }
      </div>
      <div className="ea-mfr-label">Produktschulungen</div>
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

export default function Home() {
  const bgImg       = useBaseUrl('/img/emig-gebaeude.png');
  const videoRef    = useRef<HTMLVideoElement>(null);
  const [paused, setPaused]     = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const [tab, setTab] = useState<'QM' | 'SAP' | 'MED'>('QM');
  const [done, setDone] = useState<string[]>([]);
  const [mfr,  setMfr]  = useState<any>(null);
  const [greet, setGreet] = useState('');

  /* ── Load progress & greeting ── */
  useEffect(() => {
    try {
      const s = localStorage.getItem('emig_progress');
      if (s) setDone(JSON.parse(s));
    } catch (_) {}
    const h = new Date().getHours();
    setGreet(h < 12 ? 'Guten Morgen' : h < 17 ? 'Guten Tag' : 'Guten Abend');
  }, []);

  /*
   * ── VIDEO AUTOPLAY FIX ──────────────────────────────────────────────────
   * The "play() interrupted by pause()" error happens when React renders
   * the component twice (StrictMode) or Docusaurus re-mounts the page.
   * Solution: never rely on the `autoPlay` attribute alone.
   * We set autoPlay={false}, then call .play() ourselves inside useEffect
   * once the component is stably mounted.
   * A small delay (100ms) lets the browser finish painting before we start.
   */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    let cancelled = false;

    const startVideo = () => {
      if (cancelled) return;
      const p = vid.play();
      if (p !== undefined) {
        p.catch(() => {
          // Autoplay blocked by browser policy – poster image stays visible
        });
      }
    };

    // Wait briefly so React's double-mount in dev mode settles
    const timer = setTimeout(startVideo, 120);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (!vid.paused) vid.pause();
    };
  }, []);

  const toggleVideo = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setPaused(false);
    } else {
      vid.pause();
      setPaused(true);
    }
  };

  const pct   = Math.round((done.length / ALL_QM_MODULES.length) * 100);
  const ready = pct >= 100;

  const colorQM  = '#92400e';
  const colorSAP = '#374151'; // dark slate – NO blue
  const colorMed = '#dc2626';

  /* ── Module card (inline so it can access done/colorQM) ── */
  function ModCard({ title, refCode, color, link = '#', draft = false }: any) {
    const isDone = done.includes(refCode);
    return (
      <div className="ea-card" style={{ opacity: draft ? 0.5 : 1 }}>
        <div className="ea-card-stripe" style={{ background: isDone ? '#10b981' : color }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
          <h3 className="ea-card-title">{title}</h3>
          {isDone && <span style={{ color: '#10b981', fontSize: '0.88rem', marginLeft: '6px', flexShrink: 0 }}>✓</span>}
        </div>
        <div className="ea-card-code">{refCode}</div>
        <div className="ea-card-bar">
          <div className="ea-card-bar-fill" style={{ width: isDone ? '100%' : '0%', background: isDone ? '#10b981' : color }} />
        </div>
        <Link
          className="ea-card-btn"
          to={draft ? '#' : link}
          style={{
            background: draft ? '#f0ede8' : isDone ? '#ecfdf5' : color,
            color:      draft ? '#9ca3af'  : isDone ? '#059669' : '#fff',
            border:     isDone ? '1px solid #d1fae5' : 'none',
          }}
        >
          {draft ? 'In Vorbereitung' : isDone ? 'Wiederholen' : 'Starten'}
        </Link>
      </div>
    );
  }

  /* ── Section heading ── */
  function H({ children, color = '#374151' }: any) {
    return (
      <div className="ea-h">
        <div className="ea-h-bar" style={{ background: color }} />
        {children}
        <div className="ea-h-rule" />
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Emig Academy</title>
        <style>{CSS}</style>
      </Head>

      <div className="ea">

        {/* ════════════════ HERO ════════════════ */}
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <div className="ea-hero">

            {/* Video / fallback poster */}
            <div className="ea-hero-media">
              <video
                ref={videoRef}
                className="ea-hero-video"
                /* autoPlay intentionally omitted – handled by useEffect */
                autoPlay={false}
                muted
                loop
                playsInline
                poster={bgImg}
                preload="auto"
              >
                {/*
                  ── VIDEO FILE ─────────────────────────────────────────────
                  Rename your file to remove spaces & parentheses, e.g.:
                    emig-hero.mp4

                  Then place it at:
                    mein-qm-tool/static/video/emig-hero.mp4

                  If you cannot rename it, use the encoded URL below:
                    /video/5762407-uhd_3840_2160_24fps%20(1).mp4
                  ─────────────────────────────────────────────────────────
                */}
                <source src="/video/emig-hero.mp4" type="video/mp4" />
                {/* Fallback with encoded original filename: */}
                <source src="/video/5762407-uhd_3840_2160_24fps%20(1).mp4" type="video/mp4" />
              </video>
            </div>

            {/* Overlays */}
            <div className="ea-hero-vignette" />
            <div className="ea-hero-grain" />
            <div className="ea-hero-frame-t" />
            <div className="ea-hero-frame-b" />

            {/* Video toggle */}
            <button className="ea-vid-btn" onClick={toggleVideo} title={paused ? 'Abspielen' : 'Pause'}>
              {paused ? '▶' : '⏸'}
            </button>

            {/* Content */}
            <div className="ea-hero-content">
              <div className="ea-hero-eyebrow">
                <span>Emig GmbH · Interne Lernplattform</span>
              </div>

              <h1 className="ea-hero-title">
                <span className="ea-hero-title-top">EMIG</span>
                <span className="ea-hero-title-main">ACADEMY</span>
              </h1>

              <p className="ea-hero-tagline">Qualität · Wissen · Exzellenz</p>

              <div className="ea-hero-stats">
                <div className="ea-hero-stat">
                  <span className="ea-stat-n">{ALL_QM_MODULES.length}</span>
                  <span className="ea-stat-l">QM Module</span>
                </div>
                <div className="ea-hero-stat">
                  <span className="ea-stat-n">{MANUFACTURERS.length}</span>
                  <span className="ea-stat-l">Hersteller</span>
                </div>
                <div className="ea-hero-stat">
                  <span className="ea-stat-n">{SAP_PHASES.length}</span>
                  <span className="ea-stat-l">SAP Phasen</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════ MAIN ════════════════ */}
        <main className="ea-main">
          <div className="ea-wrap">

            {/* Welcome */}
            {greet && (
              <div className="ea-welcome">
                <div>
                  <div className="ea-welcome-name">{greet}, willkommen zurück.</div>
                  <div className="ea-welcome-sub">
                    {done.length > 0
                      ? `${done.length} von ${ALL_QM_MODULES.length} QM-Modulen abgeschlossen`
                      : 'Starten Sie Ihr erstes Lernmodul.'}
                  </div>
                </div>
                <div className="ea-welcome-pill">{pct}% abgeschlossen</div>
              </div>
            )}

            {/* Category tabs */}
            <div className="ea-tabs">
              {(['QM', 'SAP', 'MED'] as const).map(id => (
                <button
                  key={id}
                  className={`ea-tab${tab === id ? ' active' : ''}`}
                  onClick={() => { setTab(id); setMfr(null); }}
                >
                  {{ QM: 'Quality Management', SAP: 'SAP-System', MED: 'Medizinprodukte' }[id]}
                </button>
              ))}
            </div>

            {/* ── QM ── */}
            {tab === 'QM' && (
              <div className="ea-anim">
                <div className="ea-prog">
                  <div className="ea-prog-info">
                    <div className="ea-prog-label">QM Gesamtfortschritt</div>
                    <div className="ea-prog-track">
                      <div className="ea-prog-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="ea-prog-sub">{done.length} von {ALL_QM_MODULES.length} Modulen abgeschlossen</div>
                  </div>
                  <div className="ea-prog-pct">{pct}%</div>
                </div>

                <div className="ea-philo">
                  <div className="ea-philo-title">QM Philosophie & Strategie</div>
                  <p className="ea-philo-body">Grundpfeiler unseres Qualitätsmanagementsystems nach ISO 13485.</p>
                  <Link to="/docs/quality-management/qm-philosophie" className="ea-philo-link">Zur QM-Philosophie →</Link>
                </div>

                <div
                  className="ea-test"
                  style={{
                    background:   ready ? '#f0fdf4' : '#f8f7f3',
                    borderColor:  ready ? '#bbf7d0' : '#dedad4',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: ready ? '#065f46' : '#9ca3af' }}>
                      {ready ? 'Finaler Test & Zertifikat' : 'Finaler Test — gesperrt'}
                    </div>
                    <div style={{ fontSize: '0.77rem', color: '#9ca3af', marginTop: '4px' }}>
                      {ready
                        ? 'Alle Module abgeschlossen – Prüfung jetzt verfügbar.'
                        : `Noch ${ALL_QM_MODULES.length - done.length} Module bis zur Freischaltung.`}
                    </div>
                  </div>
                  <button
                    disabled={!ready}
                    className="ea-test-btn"
                    style={{
                      background: ready ? '#059669' : '#e5e1da',
                      color:      ready ? '#fff'    : '#9ca3af',
                      cursor:     ready ? 'pointer' : 'not-allowed',
                      boxShadow:  ready ? '0 4px 14px rgba(5,150,105,0.28)' : undefined,
                    }}
                  >
                    Prüfung starten
                  </button>
                </div>

                <H color={colorQM}>Logistik & Lager</H>
                <div className="ea-grid">
                  <ModCard title="Lagerbedingungen"   refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
                  <ModCard title="Rückverfolgbarkeit" refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
                  <ModCard title="Sperrware"          refCode="SOP-LOG-03" color={colorQM} link="/docs/logistik-lager/SOP_LOG-03" />
                  <ModCard title="Inventur"           refCode="SOP-LOG-04" color={colorQM} draft />
                </div>

                <H color={colorQM}>Einkauf & Lieferanten</H>
                <div className="ea-grid">
                  <ModCard title="Lieferantenbewertung" refCode="SOP-EINK-01" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-01" />
                  <ModCard title="Einkaufsprozess"      refCode="SOP-EINK-02" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-02" />
                </div>

                <H color={colorQM}>Regulatorik & MDR</H>
                <div className="ea-grid">
                  <ModCard title="Importeurpflichten" refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
                  <ModCard title="Händlerpflichten"   refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
                  <ModCard title="PRRC"               refCode="SOP-REG-03" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-03" />
                  <ModCard title="Audits"             refCode="SOP-REG-05" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-05" />
                </div>
              </div>
            )}

            {/* ── SAP ── */}
            {tab === 'SAP' && (
              <div className="ea-anim">
                <H color={colorSAP}>SAP Lernmodule</H>
                <div className="ea-grid" style={{ marginBottom: '2.5rem' }}>
                  <ModCard title="SAP Basics"           refCode="SAP-01" color={colorSAP} draft />
                  <ModCard title="SAP Warehouse Mgmt."  refCode="SAP-02" color={colorSAP} draft />
                  <ModCard title="SAP Purchasing"       refCode="SAP-03" color={colorSAP} draft />
                  <ModCard title="SAP Batch Management" refCode="SAP-04" color={colorSAP} draft />
                </div>

                <H color={colorSAP}>SAP Prozesslandschaft</H>
                <SAPDashboard />
              </div>
            )}

            {/* ── MED ── */}
            {tab === 'MED' && (
              <div className="ea-anim">
                {!mfr ? (
                  <>
                    <H color={colorMed}>Hersteller & Produktschulungen</H>
                    <div className="ea-mfr-grid">
                      {MANUFACTURERS.map(m => (
                        <ManufacturerCard key={m.id} m={m} onClick={() => setMfr(m)} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div>
                    <button className="ea-back" onClick={() => setMfr(null)}>← Zurück</button>

                    <div className="ea-manu-hd">
                      <div className="ea-manu-hd-title">{mfr.name}</div>
                      <p className="ea-manu-hd-sub">Wählen Sie ein Produktmodul, um die Schulung zu starten.</p>
                    </div>

                    {mfr.id === 'riwo' ? (
                      <>
                        <H color={colorMed}>Produktmodule</H>
                        <div className="ea-grid">
                          {RIWOSPINE_PRODUCTS.map(p => (
                            <div key={p.refCode} className="ea-card">
                              <div className="ea-card-stripe" style={{ background: colorMed }} />
                              <h3 className="ea-card-title">{p.title}</h3>
                              <div className="ea-card-code">{p.refCode}</div>
                              <p style={{ fontSize: '0.81rem', color: '#6b7280', lineHeight: 1.55, margin: '0 0 1rem', flex: 1 }}>{p.desc}</p>
                              <Link className="ea-card-btn" style={{ background: colorMed, color: '#fff' }} to={p.link}>
                                Modul starten
                              </Link>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="ea-draft">
                        <div className="ea-draft-title">In Vorbereitung</div>
                        <p className="ea-draft-sub">
                          Inhalte für <strong>{mfr.name}</strong> werden derzeit erstellt.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>
    </Layout>
  );
}