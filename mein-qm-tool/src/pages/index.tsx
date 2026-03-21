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
  { title: 'Vertebris Stenose',         refCode: 'RIWO-01', link: '/docs/medizinprodukte/riwospine/stenose',      desc: 'Vollendoskopische Dekompression bei spinaler Stenose' },
  { title: 'Vertebris Lumbar',          refCode: 'RIWO-02', link: '/docs/medizinprodukte/riwospine/lumbar',       desc: 'Bandscheibenchirurgie der Lendenwirbelsäule' },
  { title: 'Vertebris Cervical',        refCode: 'RIWO-03', link: '/docs/medizinprodukte/riwospine/cervical',     desc: 'Vollendoskopische Chirurgie der Halswirbelsäule' },
  { title: 'Instrumentarium & Optiken', refCode: 'RIWO-04', link: '/docs/medizinprodukte/riwospine/instrumente',  desc: 'Hochpräzisions-Endoskope und Instrumente' },
];

const SAP_PHASES = [
  {
    id: 'vertrieb', title: 'Vertrieb & Angebot', color: '#c8a96e',
    steps: [
      { label: 'Anfrageeingang',    detail: 'Kunde sendet Anfrage per E-Mail oder Formular. Aufnahme im CRM.' },
      { label: 'CRM & Kalkulation', detail: 'Auswahl des Kunden in SAP. System zeigt Einkaufspreis und Marge an.' },
      { label: 'PDF-Angebot',       detail: 'Erstellung und Versand des Angebots direkt aus SAP als PDF.' },
      { label: 'Kundenauftrag',     detail: 'Umwandlung in Auftrag mit einem Klick. Bestandsreservierung erfolgt automatisch.' },
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
      { label: 'Serviceabruf',          detail: 'Anlage Serviceauftrag: Szenario A (Vor-Ort) oder Szenario B (Rücksendung).' },
      { label: 'Ersatzteilmanagement',  detail: 'Entnahme vom Techniker-Wagen oder Hauptlager. Buchung in Echtzeit.' },
      { label: 'Equipment-Update',      detail: 'Aktualisierung der Gerätestammkarte bei Seriennummern-Tausch.' },
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

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --gold:      #c8a96e;
  --gold-lt:   #e8d5a8;
  --dark:      #0a0a0e;
  --dark2:     #12121a;
  --dark3:     #1c1c28;
  --border-d:  rgba(200,169,110,0.18);
  --cream:     #f7f5f0;
  --text-body: #1a1a22;
  --radius:    16px;
}

*, *::before, *::after { box-sizing: border-box; }
body { background: var(--cream); }

.ea { font-family: 'Outfit', sans-serif; color: var(--text-body); }

/* ════════════════════════════
   HERO
════════════════════════════ */
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

.ea-hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/* Video stretches to fill, shows poster while loading or if no src */
.ea-hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
}

/* Cinematic multi-stop gradient: deep bottom, lighter top */
.ea-hero-vignette {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(to top,
      rgba(8,8,12,0.96) 0%,
      rgba(8,8,12,0.70) 30%,
      rgba(8,8,12,0.30) 60%,
      rgba(8,8,12,0.08) 85%,
      transparent 100%
    ),
    linear-gradient(to right,
      rgba(8,8,12,0.45) 0%,
      transparent 55%
    );
}

/* Film grain texture for cinematic feel */
.ea-hero-grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 220px;
}

/* Letterbox bars – top and bottom thin lines for cinematic framing */
.ea-hero-letterbox-top,
.ea-hero-letterbox-bottom {
  position: absolute;
  left: 0; right: 0;
  z-index: 3;
  height: 3px;
  background: rgba(200,169,110,0.12);
}
.ea-hero-letterbox-top    { top: 0; }
.ea-hero-letterbox-bottom { bottom: 0; }

.ea-hero-content {
  position: relative;
  z-index: 4;
  padding: 0 7% 8vh;
  max-width: 860px;
}

.ea-hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 2rem;
}

.ea-hero-eyebrow-line {
  display: block;
  width: 40px;
  height: 1px;
  background: var(--gold);
  opacity: 0.75;
}

.ea-hero-eyebrow-text {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
}

/* Display title uses Cormorant for editorial elegance */
.ea-hero-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(4rem, 10vw, 8rem);
  color: #fff;
  line-height: 0.9;
  margin: 0;
  letter-spacing: -0.015em;
}

.ea-hero-h1 em {
  font-style: italic;
  font-weight: 600;
  color: var(--gold-lt);
}

.ea-hero-tagline {
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  color: rgba(240,236,228,0.5);
  font-weight: 300;
  letter-spacing: 0.06em;
  margin: 1.6rem 0 0;
}

/* Stats row */
.ea-hero-stats {
  display: flex;
  align-items: stretch;
  gap: 0;
  margin-top: 3.5rem;
  flex-wrap: wrap;
}

.ea-hero-stat {
  padding-right: 2.5rem;
  margin-right: 2.5rem;
  border-right: 1px solid rgba(200,169,110,0.2);
}
.ea-hero-stat:last-child { border-right: none; margin-right: 0; padding-right: 0; }

.ea-hero-stat-n {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.6rem;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  display: block;
}

.ea-hero-stat-l {
  font-size: 0.68rem;
  color: rgba(240,236,228,0.38);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 500;
  display: block;
  margin-top: 5px;
}

/* Video pause button */
.ea-video-toggle {
  position: absolute;
  bottom: 2.5rem;
  right: 4%;
  z-index: 5;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.55);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(12px);
  font-size: 0.75rem;
  letter-spacing: 0;
}
.ea-video-toggle:hover {
  background: rgba(200,169,110,0.2);
  color: var(--gold-lt);
  border-color: var(--gold);
}

/* ════════════════════════════
   MAIN AREA
════════════════════════════ */
.ea-main {
  background: var(--cream);
  padding: 3rem 0 6rem;
  min-height: 60vh;
}

.ea-wrap {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 5%;
}

/* ── Welcome bar ── */
.ea-welcome {
  background: var(--dark2);
  border: 1px solid var(--border-d);
  border-radius: 14px;
  padding: 1.35rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.ea-welcome-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
}

.ea-welcome-sub { font-size: 0.8rem; color: rgba(255,255,255,0.35); margin-top: 3px; }

.ea-welcome-pill {
  background: rgba(200,169,110,0.12);
  border: 1px solid rgba(200,169,110,0.28);
  color: var(--gold-lt);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 99px;
  white-space: nowrap;
}

/* ── Tab navigation ── */
.ea-tabs {
  display: flex;
  gap: 0;
  background: #fff;
  border-radius: 14px;
  padding: 5px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05);
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.ea-tab {
  flex: 1 1 140px;
  padding: 13px 18px;
  border-radius: 10px;
  border: none;
  background: transparent;
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.ea-tab.active {
  background: var(--dark2);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

.ea-tab:hover:not(.active) { background: #f5f4f0; color: #1f2937; }

/* ── Section heading ── */
.ea-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.45rem;
  font-weight: 600;
  color: #111;
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 2.5rem 0 1.5rem;
  letter-spacing: -0.01em;
}

.ea-heading-bar {
  width: 22px;
  height: 2px;
  border-radius: 99px;
  flex-shrink: 0;
}

.ea-heading-rule {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #e2ded8, transparent);
}

/* ── Progress card ── */
.ea-prog-card {
  background: var(--dark2);
  border-radius: 18px;
  padding: 1.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-d);
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
}

.ea-prog-card::after {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 240px; height: 240px;
  background: radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.ea-prog-info { flex: 1; min-width: 160px; }

.ea-prog-label {
  font-size: 0.68rem;
  color: rgba(200,169,110,0.75);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.ea-prog-track {
  height: 5px;
  background: rgba(255,255,255,0.07);
  border-radius: 99px;
  overflow: hidden;
}

.ea-prog-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold), #edd9a3);
  border-radius: 99px;
  transition: width 1.5s cubic-bezier(0.4,0,0.2,1);
}

.ea-prog-sub { font-size: 0.75rem; color: rgba(255,255,255,0.28); margin-top: 8px; }

.ea-prog-pct {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.2rem;
  font-weight: 600;
  color: var(--gold-lt);
  line-height: 1;
  min-width: 88px;
  text-align: right;
}

/* ── Philosophy card ── */
.ea-philo {
  background: var(--dark2);
  border: 1px solid var(--border-d);
  border-radius: 18px;
  padding: 2rem 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.ea-philo::before {
  content: 'QM';
  position: absolute;
  right: 1.5rem; top: 50%;
  transform: translateY(-50%);
  font-family: 'Cormorant Garamond', serif;
  font-size: 7rem;
  font-weight: 700;
  color: rgba(200,169,110,0.06);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.ea-philo-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.5rem;
}

.ea-philo-body { color: rgba(255,255,255,0.4); font-size: 0.88rem; margin: 0 0 1.25rem; }

.ea-philo-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--gold-lt);
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s;
}
.ea-philo-link:hover { color: #fff; }

/* ── Final test ── */
.ea-test-box {
  border-radius: 18px;
  padding: 1.6rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  border: 1.5px solid;
  transition: all 0.3s;
}

.ea-test-btn {
  padding: 12px 26px;
  border-radius: 11px;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

/* ── Module grid ── */
.ea-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(228px, 1fr));
  gap: 13px;
  margin-bottom: 2rem;
}

/* ── Module card ── */
.ea-card {
  background: #fff;
  border-radius: 14px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.22s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.048);
}
.ea-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.09);
}

.ea-card-stripe {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
}

.ea-card-title {
  font-weight: 600;
  font-size: 0.94rem;
  color: #111;
  margin: 0 0 5px;
  line-height: 1.35;
}

.ea-card-code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.68rem;
  color: #9ca3af;
  background: #f8f8f6;
  border: 1px solid #edece8;
  padding: 2px 8px;
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 1rem;
}

.ea-card-bar-wrap {
  height: 2px;
  background: #f3f3f0;
  border-radius: 99px;
  margin-bottom: 1rem;
  overflow: hidden;
}
.ea-card-bar-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.8s ease;
}

.ea-card-btn {
  display: block;
  text-align: center;
  padding: 11px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
  font-family: 'Outfit', sans-serif;
  transition: all 0.2s;
  margin-top: auto;
}
.ea-card-btn:hover { filter: brightness(1.07); transform: translateY(-1px); }

/* ── Manufacturer grid ── */
.ea-mfr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  gap: 13px;
}

.ea-mfr-card {
  background: #fff;
  border-radius: 14px;
  padding: 2.25rem 1.75rem 1.75rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.048);
  transition: all 0.22s ease;
  position: relative;
  overflow: hidden;
}
.ea-mfr-card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(0,0,0,0.09); }

.ea-mfr-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  border-radius: 14px 14px 0 0;
}

.ea-mfr-label { font-size: 0.75rem; color: #9ca3af; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 1rem; }

/* ── Back button ── */
.ea-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 1px solid #e2ded8;
  background: #fff;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.84rem;
  cursor: pointer;
  margin-bottom: 2rem;
  color: #374151;
  transition: all 0.2s;
}
.ea-back:hover { background: #f8f7f4; }

/* ── Manufacturer detail header ── */
.ea-manu-hd {
  background: var(--dark2);
  border: 1px solid var(--border-d);
  border-radius: 18px;
  padding: 1.75rem 2.25rem;
  margin-bottom: 2rem;
}
.ea-manu-hd-title { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; font-weight: 600; color: #fff; margin: 0 0 4px; }
.ea-manu-hd-sub { font-size: 0.85rem; color: rgba(255,255,255,0.35); margin: 0; }

/* ── SAP phases ── */
.ea-sap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));
  gap: 11px;
  margin-bottom: 1.5rem;
}

.ea-sap-btn {
  padding: 1.5rem;
  border-radius: 14px;
  border: 1px solid #e2ded8;
  background: #fff;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  font-family: 'Outfit', sans-serif;
}
.ea-sap-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.07); }

.ea-sap-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 0.4rem;
}
.ea-sap-name { font-size: 0.86rem; font-weight: 600; line-height: 1.3; }
.ea-sap-count { font-size: 0.7rem; color: #9ca3af; margin-top: 4px; }

/* ── SAP detail panel ── */
.ea-sap-panel {
  background: #fff;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.048);
  animation: ea-slide 0.28s ease;
}

.ea-sap-panel-hd {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #f3f3f0;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.ea-sap-panel-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 600; color: #111; }
.ea-sap-panel-sub { font-size: 0.75rem; color: #9ca3af; }

.ea-sap-step-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  gap: 11px;
}

.ea-sap-step {
  padding: 1.25rem;
  border-radius: 12px;
  border-left: 3px solid;
  cursor: pointer;
  transition: background 0.18s;
}
.ea-sap-step:hover { filter: brightness(0.97); }

.ea-sap-step-label { font-weight: 700; font-size: 0.86rem; margin-bottom: 6px; }
.ea-sap-step-body { font-size: 0.81rem; color: #6b7280; line-height: 1.55; margin: 0; }
.ea-sap-step-action { font-size: 0.7rem; font-weight: 600; margin-top: 10px; opacity: 0.65; }

/* ── Draft placeholder ── */
.ea-draft {
  text-align: center;
  padding: 4rem 2rem;
  background: #fff;
  border-radius: 18px;
  border: 1.5px dashed #e2ded8;
}
.ea-draft-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; color: #374151; margin: 0.75rem 0 0.5rem; }
.ea-draft-sub { font-size: 0.88rem; color: #9ca3af; margin: 0; }

/* ── Animations ── */
@keyframes ea-slide {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.ea-animate { animation: ea-slide 0.35s ease; }
`;

// ─── SAP DASHBOARD ───────────────────────────────────────────────────────────

function SAPDashboard() {
  const [activePhase, setActivePhase] = useState<(typeof SAP_PHASES)[0] | null>(null);
  const [readSteps, setReadSteps] = useState<Set<string>>(new Set());

  const toggleStep = (key: string) => {
    setReadSteps(prev => {
      const s = new Set(prev);
      s.has(key) ? s.delete(key) : s.add(key);
      return s;
    });
  };

  return (
    <div>
      <div className="ea-sap-grid">
        {SAP_PHASES.map((phase, i) => {
          const isActive = activePhase?.id === phase.id;
          const done = [...readSteps].filter(k => k.startsWith(phase.id + '-')).length;
          return (
            <button
              key={phase.id}
              className="ea-sap-btn"
              onClick={() => setActivePhase(isActive ? null : phase)}
              style={{
                background:   isActive ? '#12121a' : '#fff',
                borderColor:  isActive ? phase.color : '#e2ded8',
                boxShadow:    isActive ? `0 0 0 1px ${phase.color}50, 0 8px 24px rgba(0,0,0,0.14)` : undefined,
              }}
            >
              <div className="ea-sap-num" style={{ color: isActive ? phase.color : '#d1cec8' }}>0{i + 1}</div>
              <div className="ea-sap-name" style={{ color: isActive ? '#fff' : '#1f2937' }}>{phase.title}</div>
              <div className="ea-sap-count">{done}/{phase.steps.length} gelesen</div>
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
                {[...readSteps].filter(k => k.startsWith(activePhase.id + '-')).length} von {activePhase.steps.length} Schritten abgehakt
              </div>
            </div>
            {/* phase mini bar */}
            <div style={{ width: '100px' }}>
              <div style={{ height: '3px', background: '#f0ede8', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: activePhase.color,
                  borderRadius: '99px',
                  width: `${([...readSteps].filter(k => k.startsWith(activePhase.id + '-')).length / activePhase.steps.length) * 100}%`,
                  transition: 'width 0.45s ease',
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
                  style={{
                    borderLeftColor: done ? '#10b981' : activePhase.color,
                    background: done ? '#f0fdf4' : '#f9f8f5',
                  }}
                  onClick={() => toggleStep(key)}
                >
                  <div className="ea-sap-step-label" style={{ color: done ? '#059669' : '#111827' }}>
                    {i + 1}.  {step.label}{done ? '  ✓' : ''}
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
        <div style={{ textAlign: 'center', padding: '2.5rem', color: '#9ca3af', fontSize: '0.88rem' }}>
          Wählen Sie eine Phase, um die Prozessschritte zu erkunden.
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
      <div className="ea-mfr-top" style={{ background: 'linear-gradient(90deg, #dc2626, #b91c1c)' }} />
      <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
        {!err
          ? <img src={logo} alt={m.name} style={{ maxWidth: '82%', maxHeight: '100%', objectFit: 'contain' }} onError={() => setErr(true)} />
          : <span style={{ fontWeight: 700, color: '#dc2626', fontSize: '1rem' }}>{m.name}</span>
        }
      </div>
      <div className="ea-mfr-label">Produktschulungen</div>
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

export default function Home() {
  const bgImg = useBaseUrl('/img/emig-gebaeude.png');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  const [tab, setTab] = useState<'QM'|'SAP'|'MED'>('QM');
  const [done, setDone] = useState<string[]>([]);
  const [mfr, setMfr] = useState<any>(null);
  const [greet, setGreet] = useState('');

  useEffect(() => {
    try { const s = localStorage.getItem('emig_progress'); if (s) setDone(JSON.parse(s)); } catch (_) {}
    const h = new Date().getHours();
    setGreet(h < 12 ? 'Guten Morgen' : h < 17 ? 'Guten Tag' : 'Guten Abend');
  }, []);

  const pct = Math.round((done.length / ALL_QM_MODULES.length) * 100);
  const ready = pct >= 100;

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setPaused(false); }
    else { videoRef.current.pause(); setPaused(true); }
  };

  const colorQM  = '#92400e';
  const colorSAP = '#1e40af';
  const colorMed = '#dc2626';

  // Module card
  function ModCard({ title, refCode, color, link = '#', draft = false }: any) {
    const done_ = done.includes(refCode);
    return (
      <div className="ea-card" style={{ opacity: draft ? 0.5 : 1 }}>
        <div className="ea-card-stripe" style={{ background: done_ ? '#10b981' : color }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
          <h3 className="ea-card-title">{title}</h3>
          {done_ && <span style={{ color: '#10b981', fontSize: '0.9rem', marginLeft: '6px', flexShrink: 0 }}>✓</span>}
        </div>
        <div className="ea-card-code">{refCode}</div>
        <div className="ea-card-bar-wrap">
          <div className="ea-card-bar-fill" style={{ width: done_ ? '100%' : '0%', background: done_ ? '#10b981' : color }} />
        </div>
        <Link
          className="ea-card-btn"
          to={draft ? '#' : link}
          style={{
            background: draft ? '#f3f3f0' : done_ ? '#ecfdf5' : color,
            color:      draft ? '#9ca3af'  : done_ ? '#059669' : '#fff',
            border:     done_ ? '1px solid #d1fae5' : 'none',
          }}
        >
          {draft ? 'In Vorbereitung' : done_ ? 'Wiederholen' : 'Starten'}
        </Link>
      </div>
    );
  }

  // Section heading
  function H({ children, color = '#111' }: any) {
    return (
      <div className="ea-heading">
        <div className="ea-heading-bar" style={{ background: color }} />
        {children}
        <div className="ea-heading-rule" />
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

        {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <div className="ea-hero">

            {/* Media layer */}
            <div className="ea-hero-media">
              <video
                ref={videoRef}
                className="ea-hero-video"
                autoPlay
                muted
                loop
                playsInline
                poster={bgImg}
              >
                {/*
                  Place your video file at:  static/video/emig-gebaeude.mp4
                  If the file doesn't exist, the poster (building photo) is shown.
                  Recommended: 1920×1080, H.264, 8–15 sec loop, muted
                */}
                <source src="/video/emig-gebaeude.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Cinematic overlays */}
            <div className="ea-hero-vignette" />
            <div className="ea-hero-grain" />
            <div className="ea-hero-letterbox-top" />
            <div className="ea-hero-letterbox-bottom" />

            {/* Video toggle */}
            <button className="ea-video-toggle" onClick={toggleVideo} title={paused ? 'Abspielen' : 'Pause'}>
              {paused ? '▶' : '⏸'}
            </button>

            {/* Hero text */}
            <div className="ea-hero-content">
              <div className="ea-hero-eyebrow">
                <span className="ea-hero-eyebrow-line" />
                <span className="ea-hero-eyebrow-text">Emig GmbH · Interne Lernplattform</span>
              </div>

              <h1 className="ea-hero-h1">
                Emig<br /><em>Academy</em>
              </h1>

              <p className="ea-hero-tagline">Qualität. Wissen. Exzellenz.</p>

              <div className="ea-hero-stats">
                <div className="ea-hero-stat">
                  <span className="ea-hero-stat-n">{ALL_QM_MODULES.length}</span>
                  <span className="ea-hero-stat-l">QM Module</span>
                </div>
                <div className="ea-hero-stat">
                  <span className="ea-hero-stat-n">{MANUFACTURERS.length}</span>
                  <span className="ea-hero-stat-l">Hersteller</span>
                </div>
                <div className="ea-hero-stat">
                  <span className="ea-hero-stat-n">{SAP_PHASES.length}</span>
                  <span className="ea-hero-stat-l">SAP Phasen</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MAIN ════════════════════════════════════════════════════════ */}
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
                <div className="ea-welcome-pill">{pct} % abgeschlossen</div>
              </div>
            )}

            {/* Tabs */}
            <div className="ea-tabs">
              {(['QM', 'SAP', 'MED'] as const).map(id => (
                <button
                  key={id}
                  className={`ea-tab ${tab === id ? 'active' : ''}`}
                  onClick={() => { setTab(id); setMfr(null); }}
                >
                  {{ QM: 'Quality Management', SAP: 'SAP-System', MED: 'Medizinprodukte' }[id]}
                </button>
              ))}
            </div>

            {/* ── QM ──────────────────────────────────────────────────── */}
            {tab === 'QM' && (
              <div className="ea-animate">

                <div className="ea-prog-card">
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
                  <Link to="/docs/quality-management/qm-philosophie" className="ea-philo-link">
                    Zur QM-Philosophie &nbsp;→
                  </Link>
                </div>

                <div
                  className="ea-test-box"
                  style={{
                    background: ready ? '#f0fdf4' : '#faf9f6',
                    borderColor: ready ? '#bbf7d0' : '#e2ded8',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 600, color: ready ? '#065f46' : '#9ca3af' }}>
                      {ready ? 'Finaler Test & Zertifikat' : 'Finaler Test — gesperrt'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '4px' }}>
                      {ready
                        ? 'Alle Module abgeschlossen. Prüfung jetzt verfügbar.'
                        : `Noch ${ALL_QM_MODULES.length - done.length} Module bis zur Freischaltung.`}
                    </div>
                  </div>
                  <button
                    disabled={!ready}
                    className="ea-test-btn"
                    style={{
                      background: ready ? '#059669' : '#e5e1da',
                      color: ready ? '#fff' : '#9ca3af',
                      cursor: ready ? 'pointer' : 'not-allowed',
                      boxShadow: ready ? '0 4px 14px rgba(5,150,105,0.3)' : undefined,
                    }}
                  >
                    Prüfung starten
                  </button>
                </div>

                <H color={colorQM}>Logistik & Lager</H>
                <div className="ea-grid">
                  <ModCard title="Lagerbedingungen"  refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
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

            {/* ── SAP ─────────────────────────────────────────────────── */}
            {tab === 'SAP' && (
              <div className="ea-animate">
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

            {/* ── MED ─────────────────────────────────────────────────── */}
            {tab === 'MED' && (
              <div className="ea-animate">
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
                              <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.55, margin: '0 0 1rem', flex: 1 }}>{p.desc}</p>
                              <Link className="ea-card-btn" style={{ background: colorMed, color: '#fff' }} to={p.link}>
                                Modul starten
                              </Link>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="ea-draft">
                        <div style={{ width: '32px', height: '1px', background: '#e2ded8', margin: '0 auto' }} />
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