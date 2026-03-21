import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

// ─── QM DATA ─────────────────────────────────────────────────────────────────

const ALL_QM_MODULES = [
  'SOP-LOG-01', 'SOP-LOG-02', 'SOP-LOG-03', 'SOP-LOG-04',
  'SOP-EINK-01', 'SOP-EINK-02',
  'SOP-REG-01', 'SOP-REG-02', 'SOP-REG-03', 'SOP-REG-05',
];

const RIWOSPINE_PRODUCTS = [
  { title: 'Vertebris Stenose',         refCode: 'RIWO-01', link: '/docs/medizinprodukte/riwospine/stenose',     desc: 'Vollendoskopische Dekompression bei spinaler Stenose' },
  { title: 'Vertebris Lumbar',          refCode: 'RIWO-02', link: '/docs/medizinprodukte/riwospine/lumbar',      desc: 'Bandscheibenchirurgie der Lendenwirbelsäule' },
  { title: 'Vertebris Cervical',        refCode: 'RIWO-03', link: '/docs/medizinprodukte/riwospine/cervical',    desc: 'Vollendoskopische Chirurgie der Halswirbelsäule' },
  { title: 'Instrumentarium & Optiken', refCode: 'RIWO-04', link: '/docs/medizinprodukte/riwospine/instrumente', desc: 'Hochpraezisions-Endoskope und Instrumente' },
];

const MANUFACTURERS = [
  { id: 'riwo',     name: 'RIWOspine',           logo: '/img/logo-riwospine.png' },
  { id: 'inomed',   name: 'inomed',               logo: '/img/logo-inomed.png' },
  { id: 'oncosem',  name: 'oncosem',              logo: '/img/logo-oncosem.png' },
  { id: 'bfmg',     name: 'Black Forest Medical', logo: '/img/logo-bfmg.png' },
  { id: 'meyer',    name: 'Meyer-Haake',          logo: '/img/logo-meyer.png' },
  { id: 'brainlab', name: 'Brainlab',             logo: '/img/logo-brainlab.png' },
];

// ─── SAP DATA ────────────────────────────────────────────────────────────────

const SAP_PROCESS = [
  { id: 'pre',       phase: '0', emoji: '🌐', title: 'Kundenanfrage',          subtitle: 'Webshop / Direktkontakt',       color: '#818cf8',
    details: [{ icon: '🛒', text: 'Digitaler Katalog — Webshop-API (RESTful)' }, { icon: '🔍', text: 'Dublettenprüfung (TEU = Tübingen)' }, { icon: '📋', text: 'CRM Lead-Anlage automatisch' }, { icon: '📞', text: 'Zuweisung an Fachberater' }] },
  { id: 'offer',     phase: '1', emoji: '📊', title: 'Angebot & Kalkulation',  subtitle: 'Quote-to-Order',                color: '#a78bfa',
    details: [{ icon: '💰', text: 'Key-Account Preislisten automatisch' }, { icon: '📦', text: 'BOM-Sets: Set-Preis + Einzelkomponenten' }, { icon: '📈', text: 'Echtzeit-Margenanzeige pro Position' }, { icon: '📄', text: 'Proforma-Rechnung 50% Anzahlung' }] },
  { id: 'order',     phase: '2', emoji: '✅', title: 'Kundenauftrag',          subtitle: 'Freigabe & Sperrmanagement',    color: '#38bdf8',
    details: [{ icon: '🔒', text: 'Auftrag gesperrt bis Anzahlung eingeht' }, { icon: '📦', text: 'Automatische BOM-Bestandsreservierung' }, { icon: '🏦', text: 'Klinik-Saldo-Tracking Echtzeit' }, { icon: '🚦', text: 'Freigabe nur durch GF/Finanzen' }] },
  { id: 'purchase',  phase: '3', emoji: '🛍️', title: 'Einkauf & Bestellung',  subtitle: 'Purchase-to-Pay',               color: '#fbbf24',
    details: [{ icon: '🤖', text: 'MRP-Lauf: automatische Bestellvorschlaege' }, { icon: '📋', text: 'Bestellung → Proforma → 50% → Confirmation' }, { icon: '⏱️', text: 'Backorder-Liste mit Ready Dates' }, { icon: '🏅', text: 'Preferred Supplier bevorzugt' }] },
  { id: 'receiving', phase: '4', emoji: '📬', title: 'Wareneingang',           subtitle: 'MDR-Gate & UDI-Scan',           color: '#34d399',
    details: [{ icon: '📱', text: 'QR/UDI-Scan: Charge + MHD automatisch' }, { icon: '🛡️', text: 'MDR-Gate: CE + DoC — sonst Sperre' }, { icon: '🔢', text: 'Palette → Karton → Stück automatisch' }, { icon: '🏪', text: 'Automatische Lagerplatzzuweisung' }] },
  { id: 'warehouse', phase: '5', emoji: '🏭', title: 'Lager & Kommissionierung', subtitle: 'Chargenrueckverfolgung',     color: '#2dd4bf',
    details: [{ icon: '🔎', text: 'Bidirektionale Chargensuche < 5 Sek' }, { icon: '🚫', text: 'Sperrlager: Gebrauchtware nie verfuegbar' }, { icon: '📲', text: 'Pickliste QR-Scan → Charge automatisch' }, { icon: '⚠️', text: 'MHD-Monitoring: proaktive Warnlisten' }] },
  { id: 'shipping',  phase: '6', emoji: '🚚', title: 'Versand & Lieferung',    subtitle: 'MDR-konformer Versand',         color: '#fb923c',
    details: [{ icon: '📋', text: 'Lieferschein + Packliste mit Charge + MHD' }, { icon: '🏷️', text: 'UDI-Barcode-Etiketten MDR-konform' }, { icon: '🗂️', text: 'Equipment Card automatisch eroeffnet' }, { icon: '💳', text: 'Abschlussrechnung nach Warenausgang' }] },
  { id: 'finance',   phase: '7', emoji: '💶', title: 'Finanzen & DATEV',       subtitle: 'GoBD-konforme Buchhaltung',     color: '#f87171',
    details: [{ icon: '📤', text: 'DATEV-Export: CSV/ASCII Buchungsstapel' }, { icon: '🔏', text: 'Belege nach Export gesperrt (GoBD)' }, { icon: '🌍', text: 'USt: Inland / EU steuerfrei / Drittland' }, { icon: '📊', text: 'Steuerlast + Dividenden in Echtzeit' }] },
  { id: 'service',   phase: '8', emoji: '🔧', title: 'Service & RMA',          subtitle: 'After-Sales 3-Stufen-Workflow', color: '#c084fc',
    details: [{ icon: '🎫', text: 'Stufe 1 (4h): Ticket via Seriennummer' }, { icon: '🏠', text: 'Szenario A: Vor-Ort Techniker-Cockpit' }, { icon: '📦', text: 'Szenario B: RMA Reparaturlager getrennt' }, { icon: '📡', text: 'Stufe 3 (2h): Rueckruf + BfArM automatisch' }] },
  { id: 'retention', phase: '9', emoji: '🔄', title: 'Retention & Wartung',    subtitle: 'Proaktive Kundenbindung',       color: '#f472b6',
    details: [{ icon: '⏰', text: 'STK-Automatisierung: Klinik-Benachrichtigung' }, { icon: '🖥️', text: 'Check-in Portal: Termin + Formulare digital' }, { icon: '🔁', text: 'Wiederkauf: Verbrauchsanalyse → Folgeauftrag' }, { icon: '🏆', text: 'SLA-Monitoring: 4h Reaktionszeit' }] },
];

const SAP_MODULES = [
  { id: 'vertrieb',     icon: '📊', title: 'Vertrieb & Preisfindung',   color: '#818cf8', ref: 'Kap. 3.1',
    hl: ['Individuelle Preislisten pro Key-Account', 'BOM-Sets: Stuecklisten-Verkauf', 'Webshop-Import Quote-to-Order', 'Anzahlungslogik mit Auftragssperre'],
    kpis: [{ v: '≤15min', l: 'Webshop-Sync' }, { v: '50%', l: 'Anzahlung' }, { v: 'Auto', l: 'Preisfindung' }],
    deep: 'Vollautomatische Preisfindung: Fuer jeden Key-Account individuelle Preislisten. BOM-System verkauft komplexe Operations-Sets — Kunde sieht Set-Preis, SAP reserviert Einzelkomponenten.\n\nAuszahlungs-Workflow als Pflichtprozess: Ohne 50%-Vorauszahlungseingang bleibt Auftrag systemseitig gesperrt.' },
  { id: 'lager',        icon: '🏭', title: 'Lager & MDR-Compliance',    color: '#34d399', ref: 'Kap. 3.2',
    hl: ['UDI/QR-Scan Wareneingang', 'Bidirektionale Chargenrueckverfolgung < 5 Sek', 'Sperrlager virtuell getrennt', 'CE/DoC MDR-Gate vor Versand'],
    kpis: [{ v: '<5 Sek', l: 'Chargensuche' }, { v: '~3.000', l: 'Artikel' }, { v: '100%', l: 'MDR-Gate' }],
    deep: 'Herzstuck der MDR-Compliance: UDI-Barcode-Erfassung beim Wareneingang, automatische CE + DoC-Pruefung.\n\nBidirektionale Chargenrueckverfolgung: Alle Empfaenger (vorwarts) + Ursprungslieferant (rueckwaerts) in < 5 Sekunden.\n\nVirtuelle Lagerorte trennen Neuware, Sperrlager und RMA-Reparaturlager — Kommissionierung gesperrter Ware technisch ausgeschlossen.' },
  { id: 'einkauf',      icon: '🛍️', title: 'Einkauf & Disposition',     color: '#fbbf24', ref: 'Kap. 3.3',
    hl: ['MRP-Bestellvorschlaege automatisch', 'Zertifikats-Ablaufueberwachung 60 Tage', 'Preferred Supplier System', 'Backorder-Liste mit Ready Dates'],
    kpis: [{ v: '60 Tage', l: 'Zert.-Warnung' }, { v: 'EUR', l: 'Waehrung' }, { v: 'Auto', l: 'MRP-Lauf' }],
    deep: 'MRP-Lauf generiert vollautomatisch Bestellvorschlaege basierend auf Mindestbestaenden, offenen Auftraegen und BOM-Komponenten.\n\nZertifikats-Ablaufueberwachung: 60 Tage vor Ablauf automatische Benachrichtigung. Abgelaufene Artikel fuer Wareneingang gesperrt.\n\n4-stufiger Bestellworkflow: Bestellung → Proforma → 50% Anzahlung → Order Confirmation.' },
  { id: 'service_mod',  icon: '🔧', title: 'Service & RMA',             color: '#c084fc', ref: 'Kap. 3.4',
    hl: ['3-Stufen Eskalations-Workflow', 'Equipment Card (Geraeteakte)', 'SLA 4h Reaktionszeit', 'MDR-Rueckruf BfArM-Workflow'],
    kpis: [{ v: '4 Std', l: 'SLA Stufe 1' }, { v: '24 Std', l: 'SLA Stufe 2' }, { v: '2 Std', l: 'SLA Stufe 3' }],
    deep: 'Stufe 1 (4h): Interne Diagnose via Equipment Card + Knowledge Base\nStufe 2 (24h): Formelle Herstellermeldung mit Fehlerprotokoll + Fotos\nStufe 3 (2h): MDR-Rueckruf — alle betroffenen Geraete + BfArM-Kommunikation\n\nSzenario A: Vor-Ort Techniker-Cockpit mit Fahrzeuglager\nSzenario B: RMA in physisch getrenntes Reparaturlager' },
  { id: 'finanzen_mod', icon: '💶', title: 'Finanzen & DATEV',          color: '#f87171', ref: 'Kap. 3.5',
    hl: ['GoBD-konforme Buchfuehrung', 'DATEV CSV/ASCII Export', 'Automatisches Zahlungssperrmanagement', 'Steuerlast & Dividenden-Reports'],
    kpis: [{ v: 'GoBD', l: 'Standard' }, { v: 'DATEV', l: 'Export' }, { v: 'HGB', l: 'Bilanzierung' }],
    deep: 'Zahlungssperrmanagement: Bei Ueber-/Unterzahlungen werden Lieferungen automatisch blockiert — Freigabe nur durch GF.\n\nDATEV-Export: GoBD-konforme Buchungsstapel. Nach Export systemseitig gesperrt — nachtraegliche Manipulation ausgeschlossen.' },
  { id: 'ic_mod',       icon: '🌍', title: 'Intercompany & MiaMed',     color: '#2dd4bf', ref: 'Kap. 3.8',
    hl: ['Automatische Beleg-Synchronisation', 'Seriennummern-Uebertragung elektronisch', 'Multi-Waehrung UAH/EUR/USD', 'Gruppen-Konsolidierung auf Knopfdruck'],
    kpis: [{ v: '~700/J', l: 'MiaMed Auftr.' }, { v: '3', l: 'Waehrungen' }, { v: '2', l: 'Mandanten' }],
    deep: 'Multi-Mandanten: EMIG GmbH (DE, EUR, HGB) + MiaMed (Ukraine, UAH, EUR/USD) in einer SAP-Umgebung.\n\nBestellung in MiaMed → automatisch Kundenauftrag bei EMIG. Warenausgang EMIG → Seriennummern elektronisch uebertragen.\n\nGruppen-Konsolidierung: Bilanz + GuV ohne IC-Positionen in Sekundenschnelle.' },
];

const SAP_UAT = [
  { id: 'V-01', module: 'Vertrieb',     title: 'Webshop-Anfrage importieren',           prio: 'P1' },
  { id: 'V-02', module: 'Vertrieb',     title: 'Angebot mit BOM erstellen',             prio: 'P1' },
  { id: 'V-03', module: 'Vertrieb',     title: 'Angebot zu Auftrag (1 Klick)',          prio: 'P1' },
  { id: 'V-04', module: 'Vertrieb',     title: 'Sperrmanagement fehlende Zahlung',      prio: 'P1' },
  { id: 'B-01', module: 'Einkauf',      title: 'MRP-Bestellvorschlag',                  prio: 'P1' },
  { id: 'B-02', module: 'Einkauf',      title: 'Bestellung mit 50% Anzahlung',          prio: 'P1' },
  { id: 'B-03', module: 'Lager',        title: 'Wareneingang mit UDI-Scan',             prio: 'P1' },
  { id: 'B-06', module: 'Einkauf',      title: 'Zertifikats-Ablaufwarnung',             prio: 'P2' },
  { id: 'L-01', module: 'Lager',        title: 'MDR-Gate vor Kommissionierung',         prio: 'P1' },
  { id: 'L-02', module: 'Lager',        title: 'MDR-Gate blockiert (kein DoC)',         prio: 'P1' },
  { id: 'L-04', module: 'Lager',        title: 'Chargen-Rueckverfolgung bidirektional', prio: 'P1' },
  { id: 'L-05', module: 'Lager',        title: 'Sperrlager-Einlagerung',                prio: 'P1' },
  { id: 'F-01', module: 'Finanzen',     title: 'Ausgangsrechnung erstellen',            prio: 'P1' },
  { id: 'F-02', module: 'Finanzen',     title: 'DATEV-Export',                          prio: 'P1' },
  { id: 'F-04', module: 'Finanzen',     title: 'Zahlungssperrmanagement',               prio: 'P1' },
  { id: 'S-01', module: 'Service',      title: 'Service-Ticket via Seriennummer',       prio: 'P1' },
  { id: 'S-04', module: 'Service',      title: 'RMA-Ruecksendung (Szenario B)',         prio: 'P1' },
  { id: 'S-05', module: 'Service',      title: 'Hersteller-Meldung (Stufe 2)',          prio: 'P1' },
  { id: 'S-07', module: 'Service',      title: 'Stufe-3-Rueckruf ausloesen',            prio: 'P1' },
  { id: 'IC-01',module: 'Intercompany', title: 'Beleg-Synchronisation',                 prio: 'P1' },
  { id: 'IC-02',module: 'Intercompany', title: 'Seriennummern-Uebertragung',            prio: 'P1' },
];

const SAP_TIMELINE = [
  { phase: 'Feb 2026',     emoji: '✅', title: 'Shortlist',        desc: 'Top 2-3 Anbieter ausgewaehlt',           done: true  },
  { phase: 'Maerz 2026',   emoji: '✅', title: 'Vertragsabschluss',desc: 'Live-Demos + Festpreisangebote',         done: true  },
  { phase: 'April 2026',   emoji: '🚀', title: 'Kick-off',         desc: 'Blueprint-Workshop + Stammdaten',        done: false },
  { phase: 'Mai-Jul 2026', emoji: '⚙️', title: 'Customizing',      desc: 'SAP-Konfiguration + Webshop-API',        done: false },
  { phase: 'Aug-Sep 2026', emoji: '📦', title: 'Datenmigration',   desc: 'Vollstaendige Migration + UAT-Start',    done: false },
  { phase: 'Okt 2026',     emoji: '🧪', title: 'UAT',              desc: 'User Acceptance Testing',                done: false },
  { phase: 'Nov 2026',     emoji: '🏁', title: 'Go-Live EMIG DE',  desc: 'Go-Live + Hypercare 4 Wochen',           done: false },
  { phase: 'Q1 2027',      emoji: '🌍', title: 'Go-Live MiaMed',   desc: 'Ukraine-Mandant + Intercompany aktiv',   done: false },
];

// ─── GLOBAL CSS ──────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');

:root {
  --gold: #fbbf24;
  --gold-lt: #fcd34d;
  --dk: #0d0d14;
  --dk2: #13131e;
  --dk3: #1a1a2e;
  --border: rgba(255,255,255,.07);
  --cream: #f5f3ee;
  --r: 14px;
}
*, *::before, *::after { box-sizing: border-box; }
body { background: var(--cream); }
.ea { font-family: 'Outfit', sans-serif; color: #18181f; }

/* ── VIDEO HERO ── */
.ea-hero {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background: #0a0a0c;
}
.ea-hero-media { position: absolute; inset: 0; z-index: 0; }
.ea-hero-video { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
.ea-hero-vignette {
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(to top, rgba(6,6,8,.94) 0%, rgba(6,6,8,.65) 28%, rgba(6,6,8,.25) 58%, transparent 100%),
              linear-gradient(100deg, rgba(6,6,8,.55) 0%, transparent 52%);
}
.ea-hero-grain {
  position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: .028;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
}
.ea-hero-frame-t, .ea-hero-frame-b {
  position: absolute; left: 0; right: 0; height: 1px; z-index: 3;
  background: linear-gradient(90deg, transparent, rgba(200,169,110,.35), transparent);
}
.ea-hero-frame-t { top: 0; } .ea-hero-frame-b { bottom: 0; }
.ea-hero-content { position: relative; z-index: 4; padding: 0 7% 9vh; max-width: 820px; }
.ea-hero-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 1.6rem; }
.ea-hero-eyebrow::before { content: ''; display: block; width: 36px; height: 1px; background: #c8a96e; opacity: .7; flex-shrink: 0; }
.ea-hero-eyebrow span { font-size: .67rem; font-weight: 600; letter-spacing: .26em; text-transform: uppercase; color: #c8a96e; }
.ea-hero-title { margin: 0; line-height: 1; }
.ea-hero-title-top { display: block; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.2rem,5vw,3.8rem); color: rgba(255,255,255,.55); letter-spacing: .22em; font-weight: 400; }
.ea-hero-title-main {
  display: block; font-family: 'Bebas Neue', sans-serif; font-size: clamp(5.5rem,14vw,11rem); color: #fff; letter-spacing: .06em; font-weight: 400; line-height: .85;
  background: linear-gradient(135deg,#fff 40%,#e8d5a8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.ea-hero-tagline { font-size: clamp(.88rem,1.6vw,1.05rem); color: rgba(238,234,224,.45); font-weight: 300; letter-spacing: .12em; text-transform: uppercase; margin: 1.4rem 0 0; }
.ea-hero-stats { display: flex; align-items: stretch; gap: 0; margin-top: 3rem; flex-wrap: wrap; }
.ea-hero-stat { padding-right: 2.2rem; margin-right: 2.2rem; border-right: 1px solid rgba(200,169,110,.18); }
.ea-hero-stat:last-child { border-right: none; padding-right: 0; margin-right: 0; }
.ea-stat-n { font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; color: #fff; line-height: 1; display: block; letter-spacing: .04em; }
.ea-stat-l { font-size: .65rem; color: rgba(238,234,224,.35); text-transform: uppercase; letter-spacing: .18em; font-weight: 500; display: block; margin-top: 4px; }
.ea-vid-btn {
  position: absolute; bottom: 2.5rem; right: 4%; z-index: 5;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.45);
  width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .2s; backdrop-filter: blur(14px); font-size: .7rem;
}
.ea-vid-btn:hover { background: rgba(200,169,110,.18); color: #e8d5a8; border-color: #c8a96e; }

/* ── MAIN ── */
.ea-main { background: var(--cream); padding: 3rem 0 6rem; }
.ea-wrap { max-width: 1360px; margin: 0 auto; padding: 0 5%; }

/* ── Welcome ── */
.ea-welcome { background: #111116; border: 1px solid rgba(200,169,110,.16); border-radius: var(--r); padding: 1.3rem 1.75rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.ea-welcome-name { font-size: 1.05rem; font-weight: 600; color: #fff; }
.ea-welcome-sub { font-size: .78rem; color: rgba(255,255,255,.3); margin-top: 3px; }
.ea-welcome-pill { background: rgba(200,169,110,.12); border: 1px solid rgba(200,169,110,.28); color: #e8d5a8; font-size: .78rem; font-weight: 600; padding: 7px 16px; border-radius: 99px; white-space: nowrap; }

/* ── Category tabs ── */
.ea-tabs { display: flex; background: #fff; border-radius: var(--r); padding: 4px; box-shadow: 0 1px 5px rgba(0,0,0,.07), 0 0 0 1px rgba(0,0,0,.05); margin-bottom: 3rem; flex-wrap: wrap; gap: 0; }
.ea-tab { flex: 1 1 130px; padding: 12px 16px; border-radius: 10px; border: none; background: transparent; font-family: 'Outfit', sans-serif; font-size: .88rem; font-weight: 500; color: #6b7280; cursor: pointer; transition: all .2s; text-align: center; }
.ea-tab.active { background: #111116; color: #fff; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,.16); }
.ea-tab:hover:not(.active) { background: #f0ede8; color: #1f2937; }

/* ── Section heading ── */
.ea-h { font-size: 1rem; font-weight: 600; color: #111; display: flex; align-items: center; gap: 12px; margin: 2.5rem 0 1.25rem; text-transform: uppercase; letter-spacing: .08em; }
.ea-h-bar { width: 20px; height: 2px; border-radius: 99px; flex-shrink: 0; }
.ea-h-rule { flex: 1; height: 1px; background: linear-gradient(90deg,#dedad4,transparent); }

/* ── Progress card ── */
.ea-prog { background: #111116; border-radius: 16px; padding: 1.75rem 2rem; display: flex; align-items: center; gap: 2rem; margin-bottom: 1.75rem; border: 1px solid rgba(200,169,110,.16); flex-wrap: wrap; }
.ea-prog-info { flex: 1; min-width: 160px; }
.ea-prog-label { font-size: .65rem; color: rgba(200,169,110,.7); text-transform: uppercase; letter-spacing: .22em; font-weight: 600; margin-bottom: .8rem; }
.ea-prog-track { height: 4px; background: rgba(255,255,255,.07); border-radius: 99px; overflow: hidden; }
.ea-prog-fill { height: 100%; background: linear-gradient(90deg,#fbbf24,#fcd34d); border-radius: 99px; transition: width 1.5s cubic-bezier(.4,0,.2,1); }
.ea-prog-sub { font-size: .73rem; color: rgba(255,255,255,.25); margin-top: 8px; }
.ea-prog-pct { font-family: 'Bebas Neue', sans-serif; font-size: 3.2rem; color: #fcd34d; line-height: 1; min-width: 90px; text-align: right; letter-spacing: .04em; }

/* ── Philosophy ── */
.ea-philo { background: #111116; border: 1px solid rgba(200,169,110,.16); border-radius: 16px; padding: 1.75rem 2.25rem; margin-bottom: 1.75rem; position: relative; overflow: hidden; }
.ea-philo::before { content: 'QM'; position: absolute; right: 1.5rem; top: 50%; transform: translateY(-50%); font-family: 'Bebas Neue', sans-serif; font-size: 6rem; color: rgba(200,169,110,.05); line-height: 1; pointer-events: none; }
.ea-philo-title { font-size: 1.1rem; font-weight: 600; color: #fff; margin: 0 0 5px; }
.ea-philo-body { color: rgba(255,255,255,.38); font-size: .86rem; margin: 0 0 1.1rem; }
.ea-philo-link { color: #e8d5a8; font-size: .82rem; font-weight: 600; text-decoration: none; letter-spacing: .04em; transition: color .2s; }
.ea-philo-link:hover { color: #fff; }

/* ── Final test ── */
.ea-test { border-radius: 16px; padding: 1.5rem 1.75rem; margin-bottom: 1.75rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; border: 1.5px solid; transition: all .3s; }
.ea-test-btn { padding: 11px 24px; border-radius: 10px; border: none; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: .86rem; cursor: pointer; transition: all .2s; white-space: nowrap; }

/* ── Module grid ── */
.ea-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(225px,1fr)); gap: 12px; margin-bottom: .5rem; }
.ea-card { background: #fff; border-radius: var(--r); padding: 1.4rem; display: flex; flex-direction: column; position: relative; overflow: hidden; transition: all .22s ease; box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 0 0 1px rgba(0,0,0,.048); }
.ea-card:hover { transform: translateY(-3px); box-shadow: 0 10px 26px rgba(0,0,0,.09); }
.ea-card-stripe { position: absolute; top: 0; left: 0; right: 0; height: 2px; }
.ea-card-title { font-weight: 600; font-size: .94rem; color: #111; margin: 0 0 5px; line-height: 1.35; }
.ea-card-code { font-family: 'SF Mono','Fira Code',monospace; font-size: .67rem; color: #9ca3af; background: #f7f5f0; border: 1px solid #ece9e3; padding: 2px 8px; border-radius: 5px; display: inline-block; margin-bottom: 1rem; }
.ea-card-bar { height: 2px; background: #f0ede8; border-radius: 99px; margin-bottom: 1rem; overflow: hidden; }
.ea-card-bar-fill { height: 100%; border-radius: 99px; transition: width .8s ease; }
.ea-card-btn { display: block; text-align: center; padding: 11px; border-radius: 10px; font-weight: 600; font-size: .84rem; text-decoration: none; font-family: 'Outfit', sans-serif; transition: all .2s; margin-top: auto; }
.ea-card-btn:hover { filter: brightness(1.07); transform: translateY(-1px); }

/* ── Manufacturer ── */
.ea-mfr-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(255px,1fr)); gap: 12px; }
.ea-mfr-card { background: #fff; border-radius: var(--r); padding: 2.25rem 1.75rem 1.75rem; text-align: center; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 0 0 1px rgba(0,0,0,.048); transition: all .22s ease; position: relative; overflow: hidden; }
.ea-mfr-card:hover { transform: translateY(-4px); box-shadow: 0 14px 32px rgba(0,0,0,.08); }
.ea-mfr-top { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #dc2626; border-radius: var(--r) var(--r) 0 0; }
.ea-mfr-label { font-size: .72rem; color: #9ca3af; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; margin-top: 1rem; }
.ea-back { display: inline-flex; align-items: center; gap: 7px; padding: 9px 16px; border-radius: 10px; border: 1px solid #dedad4; background: #fff; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: .84rem; cursor: pointer; margin-bottom: 1.75rem; color: #374151; transition: all .2s; }
.ea-back:hover { background: #f7f5f0; }
.ea-manu-hd { background: #111116; border: 1px solid rgba(200,169,110,.16); border-radius: 16px; padding: 1.75rem 2.25rem; margin-bottom: 1.75rem; }
.ea-manu-hd-title { font-size: 1.7rem; font-weight: 700; color: #fff; margin: 0 0 4px; }
.ea-manu-hd-sub { font-size: .84rem; color: rgba(255,255,255,.32); margin: 0; }
.ea-draft { text-align: center; padding: 4rem 2rem; background: #fff; border-radius: 16px; border: 1.5px dashed #dedad4; }
.ea-draft-title { font-size: 1.1rem; font-weight: 600; color: #374151; margin: 0 0 .4rem; }
.ea-draft-sub { font-size: .86rem; color: #9ca3af; margin: 0; }

/* ── SAP Universe styles ── */
.su-wrap { background: #0d0d14; border-radius: 20px; overflow: hidden; font-family: 'Outfit', sans-serif; }
.su-hd { background: linear-gradient(135deg,#0d0d14,#1a1a2e); padding: 2.5rem; position: relative; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,.06); }
.su-hd::after { content: 'SAP'; position: absolute; right: 1.5rem; top: 50%; transform: translateY(-50%); font-family: 'Bebas Neue', sans-serif; font-size: 9rem; color: rgba(251,191,36,.04); line-height: 1; pointer-events: none; }
.su-eyebrow { font-size: .62rem; letter-spacing: .26em; text-transform: uppercase; color: #fbbf24; font-weight: 600; display: flex; align-items: center; gap: 9px; margin-bottom: .6rem; }
.su-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: #fbbf24; opacity: .6; }
.su-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem,5vw,3.8rem); color: #fff; margin: 0 0 .4rem; letter-spacing: .05em; line-height: .95; }
.su-title span { color: #fcd34d; }
.su-sub { color: rgba(232,228,220,.42); font-size: .88rem; font-weight: 300; max-width: 560px; line-height: 1.6; }
.su-meta { display: flex; gap: 1.5rem; margin-top: 1.4rem; flex-wrap: wrap; }
.su-meta-item { display: flex; align-items: center; gap: 7px; font-size: .73rem; color: rgba(232,228,220,.4); }
.su-meta-item::before { content: ''; display: block; width: 5px; height: 5px; border-radius: 50%; background: #fbbf24; flex-shrink: 0; }
.su-nav { background: #13131e; border-bottom: 1px solid rgba(255,255,255,.06); display: flex; overflow-x: auto; }
.su-nav::-webkit-scrollbar { height: 2px; }
.su-tab { padding: .85rem 1.2rem; border: none; background: transparent; color: rgba(232,228,220,.4); font-family: 'Outfit', sans-serif; font-size: .82rem; font-weight: 500; cursor: pointer; white-space: nowrap; border-bottom: 2px solid transparent; transition: all .18s; flex-shrink: 0; }
.su-tab:hover { color: #fff; }
.su-tab.on { color: #fcd34d; border-bottom-color: #fbbf24; font-weight: 600; }
.su-body { padding: 2rem 2.5rem 3rem; color: #e8e4dc; }
.su-sh { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; color: #fff; letter-spacing: .07em; margin: 0 0 .35rem; }
.su-ss { font-size: .82rem; color: rgba(232,228,220,.4); margin: 0 0 1.75rem; font-weight: 300; }
.su-anim { animation: su-up .3s ease; }
@keyframes su-up { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

/* SAP flow */
.su-flow { display: flex; align-items: center; overflow-x: auto; padding-bottom: .75rem; margin-bottom: 1.75rem; }
.su-flow::-webkit-scrollbar { height: 2px; }
.su-fc { flex-shrink: 0; background: #1a1a2e; border: 1px solid rgba(255,255,255,.07); border-radius: 11px; padding: .9rem 1rem; text-align: center; cursor: pointer; transition: all .2s; min-width: 100px; max-width: 120px; }
.su-fc:hover, .su-fc.on { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,0,0,.4); }
.su-fc-em { font-size: 1.5rem; display: block; margin-bottom: 4px; }
.su-fc-lbl { font-size: .62rem; color: rgba(232,228,220,.5); line-height: 1.3; font-weight: 500; }
.su-arr { color: rgba(251,191,36,.35); font-size: 1.1rem; padding: 0 3px; flex-shrink: 0; margin-bottom: 12px; }
.su-sgrid { display: grid; grid-template-columns: repeat(auto-fill,minmax(265px,1fr)); gap: 12px; }
.su-scard { background: #1a1a2e; border: 1px solid rgba(255,255,255,.07); border-radius: 14px; padding: 1.3rem; cursor: pointer; transition: all .2s; position: relative; overflow: hidden; }
.su-scard:hover { border-color: rgba(255,255,255,.14); transform: translateY(-2px); }
.su-scard.on { box-shadow: 0 0 0 1.5px var(--sc,#fbbf24); }
.su-scard-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; opacity: .75; }
.su-scard-top { display: flex; gap: 11px; align-items: flex-start; margin-bottom: .7rem; }
.su-big-em { font-size: 1.7rem; line-height: 1; flex-shrink: 0; }
.su-ph { font-size: .58rem; letter-spacing: .18em; text-transform: uppercase; color: rgba(232,228,220,.35); margin-bottom: 2px; }
.su-ttl { font-size: .92rem; font-weight: 700; color: #fff; line-height: 1.2; }
.su-sub-txt { font-size: .68rem; color: rgba(232,228,220,.4); margin-top: 2px; }
.su-dlist { display: flex; flex-direction: column; gap: 4px; }
.su-di { display: flex; gap: 7px; font-size: .73rem; color: rgba(232,228,220,.55); line-height: 1.4; }
.su-dp { background: #13131e; border: 1px solid rgba(255,255,255,.08); border-radius: 14px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 3px solid; }
.su-dp-hd { display: flex; align-items: center; gap: 11px; margin-bottom: 1rem; }
.su-dp-em { font-size: 1.8rem; }
.su-dp-name { font-size: 1rem; font-weight: 700; color: #fff; }
.su-dp-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(230px,1fr)); gap: 9px; }
.su-dp-item { background: rgba(255,255,255,.03); border-radius: 9px; padding: .8rem .95rem; display: flex; gap: 9px; }
.su-dp-ico { font-size: 1rem; flex-shrink: 0; }
.su-dp-txt { font-size: .78rem; color: rgba(232,228,220,.7); line-height: 1.5; }

/* SAP module cards */
.su-mgrid { display: grid; grid-template-columns: repeat(auto-fill,minmax(320px,1fr)); gap: 12px; }
.su-mc { background: #1a1a2e; border: 1px solid rgba(255,255,255,.07); border-radius: 14px; overflow: hidden; transition: all .2s; }
.su-mc:hover { border-color: rgba(255,255,255,.12); transform: translateY(-2px); }
.su-mc-hd { padding: 1.3rem; display: flex; align-items: flex-start; gap: 12px; border-bottom: 1px solid rgba(255,255,255,.06); cursor: pointer; }
.su-mc-ico { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0; }
.su-mc-ref { font-family: 'DM Mono', monospace; font-size: .6rem; color: rgba(232,228,220,.35); letter-spacing: .07em; margin-bottom: 2px; }
.su-mc-title { font-size: .94rem; font-weight: 700; color: #fff; margin: 0; }
.su-mc-body { padding: 1.1rem 1.3rem; }
.su-mc-hls { display: flex; flex-direction: column; gap: 5px; margin-bottom: 1.1rem; }
.su-hl { font-size: .75rem; color: rgba(232,228,220,.6); display: flex; gap: 7px; }
.su-hl::before { content: '›'; color: #fbbf24; font-weight: 700; flex-shrink: 0; }
.su-kpis { display: flex; gap: 7px; flex-wrap: wrap; }
.su-kpi { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.06); border-radius: 8px; padding: 5px 9px; text-align: center; min-width: 64px; }
.su-kpi-v { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; line-height: 1; letter-spacing: .03em; }
.su-kpi-l { font-size: .56rem; color: rgba(232,228,220,.4); text-transform: uppercase; letter-spacing: .09em; margin-top: 1px; }
.su-mc-deep { padding: 1.1rem 1.3rem; border-top: 1px solid rgba(255,255,255,.05); font-size: .78rem; color: rgba(232,228,220,.6); line-height: 1.72; white-space: pre-line; }

/* MDR chain */
.su-mdr-chain { display: flex; align-items: center; overflow-x: auto; padding: 1.2rem 0 1rem; }
.su-mdr-step { flex-shrink: 0; background: #1a1a2e; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 1rem; text-align: center; min-width: 120px; max-width: 145px; }
.su-mdr-em { font-size: 1.6rem; display: block; margin-bottom: 5px; }
.su-mdr-t { font-size: .73rem; font-weight: 700; color: #fff; margin-bottom: 3px; line-height: 1.25; }
.su-mdr-s { font-size: .63rem; color: rgba(232,228,220,.4); line-height: 1.45; white-space: pre-line; }
.su-mdr-arr { color: rgba(251,191,36,.35); font-size: 1.2rem; padding: 0 5px; flex-shrink: 0; }

/* Escalation */
.su-esc { border-radius: 12px; padding: 1.3rem 1.4rem; margin-bottom: 9px; border-left: 4px solid; }
.su-esc-hd { display: flex; align-items: center; gap: 11px; margin-bottom: .9rem; flex-wrap: wrap; }
.su-esc-badge { font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: .15em; padding: 2px 9px; border-radius: 5px; white-space: nowrap; }
.su-esc-title { font-size: .94rem; font-weight: 700; color: #fff; margin: 2px 0 1px; }
.su-esc-trigger { font-size: .7rem; color: rgba(232,228,220,.38); }
.su-esc-acts { display: grid; grid-template-columns: repeat(auto-fill,minmax(210px,1fr)); gap: 7px; }
.su-esc-act { background: rgba(255,255,255,.03); border-radius: 8px; padding: .65rem .85rem; font-size: .75rem; color: rgba(232,228,220,.65); display: flex; gap: 7px; }

/* Roles */
.su-rgrid { display: grid; grid-template-columns: repeat(auto-fill,minmax(190px,1fr)); gap: 11px; }
.su-rc { background: #1a1a2e; border: 1px solid rgba(255,255,255,.07); border-radius: 13px; padding: 1.3rem; }
.su-rc-ico { width: 40px; height: 40px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: .7rem; }
.su-rc-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-family: 'DM Mono', monospace; font-size: .6rem; font-weight: 500; letter-spacing: .07em; margin-bottom: 5px; }
.su-rc-name { font-size: .88rem; font-weight: 700; color: #fff; margin-bottom: 3px; }
.su-rc-mod { font-size: .72rem; color: rgba(232,228,220,.38); line-height: 1.4; }
.su-sod { background: rgba(220,38,38,.07); border: 1px solid rgba(220,38,38,.18); border-radius: 11px; padding: 1rem 1.2rem; margin-bottom: 8px; display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: center; }
.su-sod-c { font-size: .78rem; font-weight: 600; color: rgba(252,165,165,.88); }
.su-sod-b { background: rgba(220,38,38,.18); color: #fca5a5; padding: 3px 10px; border-radius: 99px; font-size: .62rem; font-weight: 700; text-transform: uppercase; text-align: center; white-space: nowrap; }
.su-sod-ctrl { font-size: .73rem; color: #6ee7b7; }

/* Timeline */
.su-tl { padding-left: 1.8rem; position: relative; }
.su-tl::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom,#fbbf24,rgba(251,191,36,.08)); }
.su-tl-item { padding-bottom: 1.8rem; position: relative; padding-left: 1.4rem; }
.su-tl-dot { position: absolute; left: -1.8rem; top: 4px; width: 13px; height: 13px; border-radius: 50%; border: 2px solid; transform: translateX(-50%); }
.su-tl-dot.d { background: #fbbf24; border-color: #fbbf24; }
.su-tl-dot.t { background: #13131e; border-color: rgba(251,191,36,.28); }
.su-tl-ph { font-family: 'DM Mono', monospace; font-size: .63rem; color: #fbbf24; letter-spacing: .1em; margin-bottom: 3px; }
.su-tl-name { font-size: .92rem; font-weight: 700; color: #fff; margin-bottom: 2px; display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
.su-tl-desc { font-size: .75rem; color: rgba(232,228,220,.38); }
.su-tl-badge { font-size: .58rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; padding: 2px 7px; border-radius: 4px; }
.su-tl-badge.d { background: rgba(16,185,129,.15); color: #6ee7b7; }
.su-tl-badge.t { background: rgba(251,191,36,.12); color: #fcd34d; }

/* UAT */
.su-uat-stats { display: flex; gap: 11px; margin-bottom: 1.4rem; flex-wrap: wrap; }
.su-uat-stat { background: #1a1a2e; border: 1px solid rgba(255,255,255,.07); border-radius: 11px; padding: .7rem 1.1rem; display: flex; align-items: center; gap: 9px; }
.su-uat-n { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; line-height: 1; letter-spacing: .03em; }
.su-uat-l { font-size: .6rem; color: rgba(232,228,220,.35); text-transform: uppercase; letter-spacing: .1em; font-weight: 500; }
.su-uat-pbar-wrap { flex: 1; min-width: 160px; background: #1a1a2e; border: 1px solid rgba(255,255,255,.07); border-radius: 11px; padding: .7rem 1.1rem; display: flex; align-items: center; gap: 12px; }
.su-uat-pbar-bg { flex: 1; height: 4px; background: rgba(255,255,255,.06); border-radius: 99px; overflow: hidden; }
.su-uat-pbar-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg,#10b981,#34d399); transition: width .5s; }
.su-filters { display: flex; gap: 7px; margin-bottom: 1.1rem; flex-wrap: wrap; }
.su-fb { padding: 5px 12px; border-radius: 7px; border: 1px solid rgba(255,255,255,.07); background: #1a1a2e; color: rgba(232,228,220,.4); font-family: 'Outfit', sans-serif; font-size: .73rem; font-weight: 500; cursor: pointer; transition: all .16s; }
.su-fb:hover { color: #fff; border-color: rgba(255,255,255,.18); }
.su-fb.on { background: #13131e; border-color: #fbbf24; color: #fcd34d; }
.su-table-wrap { background: #1a1a2e; border: 1px solid rgba(255,255,255,.07); border-radius: 13px; overflow: hidden; }
.su-table { width: 100%; border-collapse: collapse; }
.su-table th { text-align: left; padding: .65rem .9rem; font-size: .6rem; text-transform: uppercase; letter-spacing: .14em; color: rgba(232,228,220,.3); font-weight: 600; border-bottom: 1px solid rgba(255,255,255,.06); }
.su-table td { padding: .75rem .9rem; font-size: .78rem; border-bottom: 1px solid rgba(255,255,255,.028); vertical-align: middle; }
.su-table tr:last-child td { border-bottom: none; }
.su-table tr:hover td { background: rgba(255,255,255,.018); }
.su-tid { font-family: 'DM Mono', monospace; font-size: .68rem; color: #fbbf24; }
.su-ttitle { color: rgba(232,228,220,.8); }
.su-mod-badge { font-size: .67rem; padding: 2px 9px; border-radius: 5px; font-weight: 600; white-space: nowrap; }
.su-p1 { background: rgba(220,38,38,.14); color: #fca5a5; }
.su-p2 { background: rgba(251,191,36,.11); color: #fcd34d; }
.su-sbwrap { display: flex; gap: 5px; }
.su-sb { width: 27px; height: 27px; border-radius: 6px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); font-size: .7rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .14s; }
.su-sb:hover { border-color: rgba(255,255,255,.2); }
.su-sb.pass { background: rgba(16,185,129,.18); border-color: #10b981; color: #6ee7b7; }
.su-sb.fail { background: rgba(220,38,38,.18); border-color: #dc2626; color: #fca5a5; }
.su-sb.pend { background: rgba(251,191,36,.1); border-color: rgba(251,191,36,.3); color: #fcd34d; }

@media(max-width:600px){
  .ea-tabs { overflow-x: auto; }
  .ea-grid { grid-template-columns: 1fr; }
  .ea-mfr-grid { grid-template-columns: 1fr; }
  .su-sgrid { grid-template-columns: 1fr; }
  .su-mgrid { grid-template-columns: 1fr; }
  .su-rgrid { grid-template-columns: repeat(2,1fr); }
  .su-sod { grid-template-columns: 1fr; }
  .su-body { padding: 1.5rem 1.25rem 2rem; }
  .su-hd { padding: 1.75rem 1.25rem 1.5rem; }
}
`;

// ─── SAP UNIVERSE COMPONENT (embedded) ───────────────────────────────────────

function SAPUniverse() {
  const [sapTab, setSapTab]     = useState('map');
  const [activeStep, setStep]   = useState<string | null>(null);
  const [expandedMod, setMod]   = useState<string | null>(null);
  const [uatFilter, setFilter]  = useState('all');
  const [statuses, setStatuses] = useState<Record<string, 'open'|'pass'|'fail'>>(() =>
    Object.fromEntries(SAP_UAT.map(t => [t.id, 'open']))
  );

  const sapTabs = [
    { id: 'map',      label: 'Prozesslandschaft' },
    { id: 'modules',  label: 'SAP Module'        },
    { id: 'mdr',      label: 'MDR-Compliance'    },
    { id: 'roles',    label: 'Rollen & Rechte'   },
    { id: 'timeline', label: 'Zeitplan'          },
    { id: 'uat',      label: 'UAT Tracker'       },
  ];

  const setStatus = (id: string, s: 'pass'|'fail'|'open') =>
    setStatuses(prev => ({ ...prev, [id]: prev[id] === s ? 'open' : s }));

  const pass  = Object.values(statuses).filter(s => s === 'pass').length;
  const fail  = Object.values(statuses).filter(s => s === 'fail').length;
  const open_ = Object.values(statuses).filter(s => s === 'open').length;
  const pct   = Math.round((pass / SAP_UAT.length) * 100);

  const MC: Record<string,string> = { Vertrieb:'#818cf8', Einkauf:'#fbbf24', Lager:'#34d399', Finanzen:'#f87171', Service:'#c084fc', Intercompany:'#2dd4bf' };
  const MB: Record<string,string> = { Vertrieb:'#818cf820', Einkauf:'#fbbf2420', Lager:'#34d39920', Finanzen:'#f8717120', Service:'#c084fc20', Intercompany:'#2dd4bf20' };

  const filtered = uatFilter === 'all' ? SAP_UAT
    : uatFilter === 'pass' ? SAP_UAT.filter(t => statuses[t.id] === 'pass')
    : uatFilter === 'fail' ? SAP_UAT.filter(t => statuses[t.id] === 'fail')
    : uatFilter === 'open' ? SAP_UAT.filter(t => statuses[t.id] === 'open')
    : SAP_UAT.filter(t => t.module === uatFilter);

  return (
    <div className="su-wrap">
      {/* Header */}
      <div className="su-hd">
        <div className="su-eyebrow">SAP Business One Cloud · EMIG GmbH Deutschland</div>
        <h2 className="su-title">SAP <span>Universum</span></h2>
        <p className="su-sub">Interaktive Prozesslandschaft, Module und UAT-Tracker fuer die vollstaendige SAP-Implementierung.</p>
        <div className="su-meta">
          <span className="su-meta-item">Go-Live: November 2026</span>
          <span className="su-meta-item">MDR 2017/745 konform</span>
          <span className="su-meta-item">{SAP_MODULES.length} Module - {SAP_PROCESS.length} Prozessschritte</span>
          <span className="su-meta-item">MiaMed Ukraine Q1/2027</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="su-nav">
        {sapTabs.map(t => (
          <button key={t.id} className={`su-tab ${sapTab === t.id ? 'on' : ''}`} onClick={() => setSapTab(t.id)}>{t.label}</button>
        ))}
      </nav>

      <div className="su-body">

        {/* ── PROCESS MAP ── */}
        {sapTab === 'map' && (
          <div className="su-anim">
            <div className="su-sh">Vollstaendige Prozesslandschaft</div>
            <p className="su-ss">Klicken Sie auf einen Schritt fuer Details. Prozessfluss Phase 0 bis 9.</p>

            <div className="su-flow">
              {SAP_PROCESS.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div className={`su-fc ${activeStep === s.id ? 'on' : ''}`}
                    style={{ borderColor: activeStep === s.id ? s.color : undefined }}
                    onClick={() => setStep(activeStep === s.id ? null : s.id)}>
                    <span className="su-fc-em">{s.emoji}</span>
                    <span className="su-fc-lbl">{s.title}</span>
                  </div>
                  {i < SAP_PROCESS.length - 1 && <div className="su-arr">&#8594;</div>}
                </React.Fragment>
              ))}
            </div>

            {activeStep && (() => {
              const s = SAP_PROCESS.find(x => x.id === activeStep)!;
              return (
                <div className="su-dp" style={{ borderLeftColor: s.color }}>
                  <div className="su-dp-hd">
                    <span className="su-dp-em">{s.emoji}</span>
                    <div>
                      <div style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.18em', color: s.color, fontWeight: 600, marginBottom: 2 }}>Phase {s.phase}</div>
                      <div className="su-dp-name">{s.title} — {s.subtitle}</div>
                    </div>
                  </div>
                  <div className="su-dp-grid">
                    {s.details.map((d, i) => (
                      <div className="su-dp-item" key={i}>
                        <span className="su-dp-ico">{d.icon}</span>
                        <span className="su-dp-txt">{d.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="su-sgrid">
              {SAP_PROCESS.map(s => (
                <div key={s.id} className={`su-scard ${activeStep === s.id ? 'on' : ''}`}
                  style={{ ['--sc' as any]: s.color }}
                  onClick={() => setStep(activeStep === s.id ? null : s.id)}>
                  <div className="su-scard-bar" style={{ background: s.color }} />
                  <div className="su-scard-top">
                    <span className="su-big-em">{s.emoji}</span>
                    <div>
                      <div className="su-ph">Phase {s.phase}</div>
                      <div className="su-ttl">{s.title}</div>
                      <div className="su-sub-txt">{s.subtitle}</div>
                    </div>
                  </div>
                  <div className="su-dlist">
                    {s.details.slice(0, 3).map((d, i) => (
                      <div className="su-di" key={i}><span>{d.icon}</span><span>{d.text}</span></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MODULES ── */}
        {sapTab === 'modules' && (
          <div className="su-anim">
            <div className="su-sh">SAP Module & Kernfunktionen</div>
            <p className="su-ss">Alle {SAP_MODULES.length} Kernmodule — Header klicken fuer Details.</p>
            <div className="su-mgrid">
              {SAP_MODULES.map(m => (
                <div key={m.id} className="su-mc">
                  <div className="su-mc-hd" onClick={() => setMod(expandedMod === m.id ? null : m.id)}>
                    <div className="su-mc-ico" style={{ background: m.color + '22' }}><span>{m.icon}</span></div>
                    <div style={{ flex: 1 }}>
                      <div className="su-mc-ref">{m.ref}</div>
                      <div className="su-mc-title">{m.title}</div>
                    </div>
                    <span style={{ color: 'rgba(232,228,220,.3)', fontSize: '.8rem' }}>{expandedMod === m.id ? '▲' : '▼'}</span>
                  </div>
                  <div className="su-mc-body">
                    <div className="su-mc-hls">{m.hl.map((h, i) => <div className="su-hl" key={i}>{h}</div>)}</div>
                    <div className="su-kpis">{m.kpis.map((k, i) => (
                      <div className="su-kpi" key={i}>
                        <div className="su-kpi-v" style={{ color: m.color }}>{k.v}</div>
                        <div className="su-kpi-l">{k.l}</div>
                      </div>
                    ))}</div>
                  </div>
                  {expandedMod === m.id && <div className="su-mc-deep">{m.deep}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MDR ── */}
        {sapTab === 'mdr' && (
          <div className="su-anim">
            <div className="su-sh">MDR-Compliance Kette</div>
            <p className="su-ss">EU Medical Device Regulation 2017/745 — in jeden Prozessschritt integriert.</p>
            <div className="su-mdr-chain">
              {[
                { e: '📦', t: 'Wareneingang',    s: 'UDI-Scan\nCE/DoC-Pruefung\nCharge + MHD' },
                { e: '🛡️', t: 'MDR-Gate',        s: 'CE fehlt?\nAuto-Sperre\nKein WE moegl.' },
                { e: '🏪', t: 'Lagerung',         s: 'Haupt-/Sperrlager\nMHD-Monitoring\n60-Tage-Alarm' },
                { e: '📋', t: 'Kommissionierung', s: 'DoC-Pruefung\nQR-Scan Pflicht\nCharge zugeord.' },
                { e: '🚚', t: 'Versand',          s: 'UDI-Etiketten\nLieferschein+MHD\nEquip. Card' },
                { e: '🔧', t: 'Service',          s: 'Field Safety\nRueckruf-Workflow\nBfArM' },
                { e: '🔍', t: 'Rueckverfolgung',  s: 'Vorwaerts: Empf.\nRueckwaerts: Lief.\n< 5 Sek.' },
              ].map((item, i, arr) => (
                <React.Fragment key={i}>
                  <div className="su-mdr-step">
                    <span className="su-mdr-em">{item.e}</span>
                    <div className="su-mdr-t">{item.t}</div>
                    <div className="su-mdr-s">{item.s}</div>
                  </div>
                  {i < arr.length - 1 && <div className="su-mdr-arr">&#8594;</div>}
                </React.Fragment>
              ))}
            </div>
            <div style={{ marginTop: '2rem' }}>
              <div className="su-sh" style={{ fontSize: '1.5rem', marginBottom: '.3rem' }}>Eskalations-Workflow</div>
              <p className="su-ss">3 Stufen mit verbindlichen SLA-Fristen</p>
              {[
                { s: '1', e: '🔍', t: 'Interne Diagnose',    sla: '4 Stunden',      trig: 'Eingang Servicemeldung',                   c: '#34d399', acts: ['Geraeteakte geladen', 'Knowledge Base durchsucht', 'Interne Loesung angewendet', 'Falls keine Loesung: Eskalation Stufe 2'] },
                { s: '2', e: '📡', t: 'Herstellermeldung',   sla: '24 Stunden',     trig: 'Keine interne Loesung / sicherheitsrelevant',c: '#fbbf24', acts: ['Auto: Seriennummer + Fehlerprotokoll', 'Fotos/Anhaenge am Serviceabruf', 'Status: Eskaliert - Hersteller info.', 'SLA-Uhr fuer Herstellerantwort laeuft'] },
                { s: '3', e: '🚨', t: 'Field Safety/Rueckruf',sla: '2 Stunden (!)', trig: 'Systematischer Defekt / FSN',               c: '#f87171', acts: ['Vorwaertssuche: alle Empfaenger', 'Rueckwaertssuche: Ursprungslieferant', 'Status Under Recall systemweit', 'BfArM-Berichte automatisch generiert'] },
              ].map(esc => (
                <div key={esc.s} className="su-esc" style={{ background: esc.c + '0d', borderLeftColor: esc.c }}>
                  <div className="su-esc-hd">
                    <span style={{ fontSize: '1.6rem' }}>{esc.e}</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.18em', color: esc.c, fontWeight: 600 }}>Stufe {esc.s}</span>
                        <span className="su-esc-badge" style={{ background: esc.c + '22', color: esc.c }}>SLA: {esc.sla}</span>
                      </div>
                      <div className="su-esc-title">{esc.t}</div>
                      <div className="su-esc-trigger">Ausloser: {esc.trig}</div>
                    </div>
                  </div>
                  <div className="su-esc-acts">
                    {esc.acts.map((a, i) => (
                      <div className="su-esc-act" key={i}><span style={{ color: esc.c, flexShrink: 0 }}>›</span>{a}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ROLES ── */}
        {sapTab === 'roles' && (
          <div className="su-anim">
            <div className="su-sh">Rollen & Berechtigungen</div>
            <p className="su-ss">Rollenbasiertes Konzept nach DSGVO & GoBD — Prinzip der minimalen Privilegien.</p>
            <div className="su-rgrid">
              {[
                { i: '👔', t: 'Geschaeftsfuehrung', c: '#e2e8f0', m: 'Vollzugriff + 4-Augen-Freigabe', b: 'GF' },
                { i: '💼', t: 'Vertrieb',           c: '#818cf8', m: 'CRM, Angebote, Auftraege',        b: 'VT' },
                { i: '📦', t: 'Lager / Logistik',   c: '#34d399', m: 'WE, Kommissionierung, Versand',   b: 'LA' },
                { i: '🔧', t: 'Service-Techniker',  c: '#c084fc', m: 'Tickets, RMA, Equipment Card',    b: 'ST' },
                { i: '💶', t: 'Buchhaltung',         c: '#f87171', m: 'Rechnungen, DATEV, Controlling',  b: 'BU' },
                { i: '⚙️', t: 'IT-Administrator',   c: '#94a3b8', m: 'System, Rechte, Schnittstellen',  b: 'IT' },
              ].map((r, i) => (
                <div className="su-rc" key={i}>
                  <div className="su-rc-ico" style={{ background: r.c + '22' }}>{r.i}</div>
                  <div className="su-rc-badge" style={{ background: r.c + '22', color: r.c }}>{r.b}</div>
                  <div className="su-rc-name">{r.t}</div>
                  <div className="su-rc-mod">{r.m}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2rem' }}>
              <div className="su-sh" style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>Segregation of Duties</div>
              <p className="su-ss">Kritische Funktionskombinationen — systemseitig gesperrt (Kap. 4.4.3)</p>
              {[
                { a: 'Angebot erstellen + Auftrag freigeben',     risk: 'Falschbuchung ohne Kontrolle',   ctrl: '4-Augen: GF-Freigabe zwingend' },
                { a: 'Warenausgang buchen + Rechnung erstellen',  risk: 'Fiktive Lieferungen moeglich',   ctrl: 'Trennung Lager + Finanzen' },
                { a: 'Lieferantenstamm anlegen + Bestellung',     risk: 'Phantomlieferanten-Betrug',      ctrl: 'Doppelfreigabe Einkauf + GF' },
                { a: 'DATEV-Export + Buchungen stornieren',       risk: 'Nachtragliche Manipulation',     ctrl: 'Nur IT-Admin + Finanzen gemeinsam' },
                { a: 'Zahlungssperre aufheben + Zahlung',         risk: 'Unberechtigte Zahlungen',        ctrl: 'GF-Freigabe zwingend' },
              ].map((item, i) => (
                <div className="su-sod" key={i}>
                  <div className="su-sod-c">🚫 {item.a}</div>
                  <div className="su-sod-b">{item.risk}</div>
                  <div className="su-sod-ctrl">✓ {item.ctrl}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TIMELINE ── */}
        {sapTab === 'timeline' && (
          <div className="su-anim">
            <div className="su-sh">Projektzeitplan 2026–2027</div>
            <p className="su-ss">8 Monate bis Go-Live EMIG Deutschland - Q1/2027 MiaMed Ukraine</p>
            <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,.07)', borderRadius: 13, padding: '1.2rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.4rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: '.6rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '.2em', fontWeight: 600, marginBottom: 7 }}>Projektfortschritt (Maerz 2026)</div>
                <div style={{ height: 4, background: 'rgba(255,255,255,.06)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: '25%', height: '100%', background: 'linear-gradient(90deg,#fbbf24,#fcd34d)', borderRadius: 99 }} />
                </div>
                <div style={{ fontSize: '.68rem', color: 'rgba(232,228,220,.3)', marginTop: 5 }}>Phase 2 von 8 abgeschlossen</div>
              </div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.4rem', color: '#fcd34d', letterSpacing: '.04em', lineHeight: 1 }}>25%</div>
            </div>
            <div className="su-tl">
              {SAP_TIMELINE.map((item, i) => (
                <div className="su-tl-item" key={i}>
                  <div className={`su-tl-dot ${item.done ? 'd' : 't'}`} />
                  <div className="su-tl-ph">{item.phase}</div>
                  <div className="su-tl-name">
                    <span>{item.emoji}</span>{item.title}
                    <span className={`su-tl-badge ${item.done ? 'd' : 't'}`}>{item.done ? 'Abgeschlossen' : 'Geplant'}</span>
                  </div>
                  <div className="su-tl-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── UAT ── */}
        {sapTab === 'uat' && (
          <div className="su-anim">
            <div className="su-sh">UAT Test-Tracker</div>
            <p className="su-ss">Interaktiver Abnahme-Tracker — Bestanden / Fehler / Offen setzen.</p>
            <div className="su-uat-stats">
              <div className="su-uat-stat"><div className="su-uat-n" style={{ color: '#6ee7b7' }}>{pass}</div><div className="su-uat-l">Bestanden</div></div>
              <div className="su-uat-stat"><div className="su-uat-n" style={{ color: '#fca5a5' }}>{fail}</div><div className="su-uat-l">Fehler</div></div>
              <div className="su-uat-stat"><div className="su-uat-n" style={{ color: '#fcd34d' }}>{open_}</div><div className="su-uat-l">Offen</div></div>
              <div className="su-uat-pbar-wrap">
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '.6rem', color: 'rgba(232,228,220,.3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 7 }}>Gesamtfortschritt</div>
                  <div className="su-uat-pbar-bg"><div className="su-uat-pbar-fill" style={{ width: `${pct}%` }} /></div>
                </div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: '#34d399', lineHeight: 1, letterSpacing: '.03em', minWidth: 52, textAlign: 'right' }}>{pct}%</div>
              </div>
            </div>
            <div className="su-filters">
              {['all','open','pass','fail','Vertrieb','Einkauf','Lager','Finanzen','Service','Intercompany'].map(f => (
                <button key={f} className={`su-fb ${uatFilter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
                  {f==='all'?'Alle':f==='open'?'Offen':f==='pass'?'Bestanden':f==='fail'?'Fehler':f}
                </button>
              ))}
            </div>
            <div className="su-table-wrap">
              <table className="su-table">
                <thead><tr><th>Test-ID</th><th>Modul</th><th>Testfall</th><th>Prio</th><th>Status</th></tr></thead>
                <tbody>
                  {filtered.map(test => {
                    const s = statuses[test.id];
                    return (
                      <tr key={test.id}>
                        <td><span className="su-tid">{test.id}</span></td>
                        <td><span className="su-mod-badge" style={{ background: MB[test.module]||'#ffffff10', color: MC[test.module]||'#fff' }}>{test.module}</span></td>
                        <td><span className="su-ttitle">{test.title}</span></td>
                        <td><span className={`su-mod-badge ${test.prio==='P1'?'su-p1':'su-p2'}`}>{test.prio}</span></td>
                        <td>
                          <div className="su-sbwrap">
                            <button className={`su-sb ${s==='pass'?'pass':''}`} onClick={() => setStatus(test.id,'pass')} title="Bestanden">✓</button>
                            <button className={`su-sb ${s==='fail'?'fail':''}`} onClick={() => setStatus(test.id,'fail')} title="Fehler">✗</button>
                            <button className={`su-sb ${s==='open'?'pend':''}`} onClick={() => setStatus(test.id,'open')} title="Offen">⏳</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
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
      <div style={{ height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.75rem' }}>
        {!err
          ? <img src={logo} alt={m.name} style={{ maxWidth: '80%', maxHeight: '100%', objectFit: 'contain' }} onError={() => setErr(true)} />
          : <span style={{ fontWeight: 700, color: '#dc2626', fontSize: '1rem' }}>{m.name}</span>}
      </div>
      <div className="ea-mfr-label">Produktschulungen</div>
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

export default function Home() {
  const bgImg    = useBaseUrl('/img/emig-gebaeude.png');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  const [tab, setTab]   = useState<'QM'|'SAP'|'MED'>('QM');
  const [done, setDone] = useState<string[]>([]);
  const [mfr,  setMfr]  = useState<any>(null);
  const [greet, setGreet] = useState('');

  useEffect(() => {
    try { const s = localStorage.getItem('emig_progress'); if (s) setDone(JSON.parse(s)); } catch (_) {}
    const h = new Date().getHours();
    setGreet(h < 12 ? 'Guten Morgen' : h < 17 ? 'Guten Tag' : 'Guten Abend');
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    let cancelled = false;
    const start = () => { if (cancelled) return; vid.play().catch(() => {}); };
    const timer = setTimeout(start, 150);
    return () => { cancelled = true; clearTimeout(timer); if (!vid.paused) vid.pause(); };
  }, []);

  const toggleVideo = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play().catch(() => {}); setPaused(false); }
    else { vid.pause(); setPaused(true); }
  };

  const pct   = Math.round((done.length / ALL_QM_MODULES.length) * 100);
  const ready = pct >= 100;
  const colorQM  = '#92400e';
  const colorMed = '#dc2626';

  function ModCard({ title, refCode, color, link = '#', draft = false }: any) {
    const isDone = done.includes(refCode);
    return (
      <div className="ea-card" style={{ opacity: draft ? 0.5 : 1 }}>
        <div className="ea-card-stripe" style={{ background: isDone ? '#10b981' : color }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
          <h3 className="ea-card-title">{title}</h3>
          {isDone && <span style={{ color: '#10b981', fontSize: '.88rem', marginLeft: '6px', flexShrink: 0 }}>✓</span>}
        </div>
        <div className="ea-card-code">{refCode}</div>
        <div className="ea-card-bar">
          <div className="ea-card-bar-fill" style={{ width: isDone ? '100%' : '0%', background: isDone ? '#10b981' : color }} />
        </div>
        <Link className="ea-card-btn" to={draft ? '#' : link}
          style={{ background: draft ? '#f0ede8' : isDone ? '#ecfdf5' : color, color: draft ? '#9ca3af' : isDone ? '#059669' : '#fff', border: isDone ? '1px solid #d1fae5' : 'none' }}>
          {draft ? 'In Vorbereitung' : isDone ? 'Wiederholen' : 'Starten'}
        </Link>
      </div>
    );
  }

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
        <style>{GLOBAL_CSS}</style>
      </Head>
      <div className="ea">

        {/* ── HERO ── */}
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <div className="ea-hero">
            <div className="ea-hero-media">
              <video ref={videoRef} className="ea-hero-video" autoPlay={false} muted loop playsInline poster={bgImg} preload="auto">
                <source src="/video/emig-hero.mp4" type="video/mp4" />
                <source src="/video/5762407-uhd_3840_2160_24fps%20(1).mp4" type="video/mp4" />
              </video>
            </div>
            <div className="ea-hero-vignette" />
            <div className="ea-hero-grain" />
            <div className="ea-hero-frame-t" />
            <div className="ea-hero-frame-b" />
            <button className="ea-vid-btn" onClick={toggleVideo} title={paused ? 'Abspielen' : 'Pause'}>{paused ? '▶' : '⏸'}</button>
            <div className="ea-hero-content">
              <div className="ea-hero-eyebrow"><span>Emig GmbH · Interne Lernplattform</span></div>
              <h1 className="ea-hero-title">
                <span className="ea-hero-title-top">EMIG</span>
                <span className="ea-hero-title-main">ACADEMY</span>
              </h1>
              <p className="ea-hero-tagline">Qualitaet · Wissen · Exzellenz</p>
              <div className="ea-hero-stats">
                <div className="ea-hero-stat"><span className="ea-stat-n">{ALL_QM_MODULES.length}</span><span className="ea-stat-l">QM Module</span></div>
                <div className="ea-hero-stat"><span className="ea-stat-n">{MANUFACTURERS.length}</span><span className="ea-stat-l">Hersteller</span></div>
                <div className="ea-hero-stat"><span className="ea-stat-n">10</span><span className="ea-stat-l">SAP Phasen</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <main className="ea-main">
          <div className="ea-wrap">

            {greet && (
              <div className="ea-welcome">
                <div>
                  <div className="ea-welcome-name">{greet}, willkommen zurueck.</div>
                  <div className="ea-welcome-sub">{done.length > 0 ? `${done.length} von ${ALL_QM_MODULES.length} QM-Modulen abgeschlossen` : 'Starten Sie Ihr erstes Lernmodul.'}</div>
                </div>
                <div className="ea-welcome-pill">{pct}% abgeschlossen</div>
              </div>
            )}

            {/* ── CATEGORY TABS ── */}
            <div className="ea-tabs">
              {([
                { id: 'QM',  label: 'Quality Management' },
                { id: 'SAP', label: 'SAP Universum'      },
                { id: 'MED', label: 'Medizinprodukte'    },
              ] as const).map(({ id, label }) => (
                <button key={id} className={`ea-tab ${tab === id ? 'active' : ''}`}
                  onClick={() => { setTab(id); setMfr(null); }}>{label}</button>
              ))}
            </div>

            {/* ── QM ── */}
            {tab === 'QM' && (
              <div>
                <div className="ea-prog">
                  <div className="ea-prog-info">
                    <div className="ea-prog-label">QM Gesamtfortschritt</div>
                    <div className="ea-prog-track"><div className="ea-prog-fill" style={{ width: `${pct}%` }} /></div>
                    <div className="ea-prog-sub">{done.length} von {ALL_QM_MODULES.length} Modulen abgeschlossen</div>
                  </div>
                  <div className="ea-prog-pct">{pct}%</div>
                </div>

                <div className="ea-philo">
                  <div className="ea-philo-title">QM Philosophie & Strategie</div>
                  <p className="ea-philo-body">Grundpfeiler unseres Qualitaetsmanagementsystems nach ISO 13485.</p>
                  <Link to="/docs/quality-management/qm-philosophie" className="ea-philo-link">Zur QM-Philosophie →</Link>
                </div>

                <div className="ea-test" style={{ background: ready ? '#f0fdf4' : '#f8f7f3', borderColor: ready ? '#bbf7d0' : '#dedad4' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: ready ? '#065f46' : '#9ca3af' }}>{ready ? 'Finaler Test & Zertifikat' : 'Finaler Test — gesperrt'}</div>
                    <div style={{ fontSize: '.77rem', color: '#9ca3af', marginTop: '4px' }}>{ready ? 'Alle Module abgeschlossen.' : `Noch ${ALL_QM_MODULES.length - done.length} Module bis zur Freischaltung.`}</div>
                  </div>
                  <button disabled={!ready} className="ea-test-btn"
                    style={{ background: ready ? '#059669' : '#e5e1da', color: ready ? '#fff' : '#9ca3af', cursor: ready ? 'pointer' : 'not-allowed' }}>
                    Pruefung starten
                  </button>
                </div>

                <H color={colorQM}>Logistik & Lager</H>
                <div className="ea-grid">
                  <ModCard title="Lagerbedingungen"   refCode="SOP-LOG-01" color={colorQM} link="/docs/logistik-lager/SOP_LOG-01" />
                  <ModCard title="Rueckverfolgbarkeit" refCode="SOP-LOG-02" color={colorQM} link="/docs/logistik-lager/SOP_LOG-02" />
                  <ModCard title="Sperrware"           refCode="SOP-LOG-03" color={colorQM} link="/docs/logistik-lager/SOP_LOG-03" />
                  <ModCard title="Inventur"            refCode="SOP-LOG-04" color={colorQM} draft />
                </div>

                <H color={colorQM}>Einkauf & Lieferanten</H>
                <div className="ea-grid">
                  <ModCard title="Lieferantenbewertung" refCode="SOP-EINK-01" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-01" />
                  <ModCard title="Einkaufsprozess"      refCode="SOP-EINK-02" color={colorQM} link="/docs/einkauf-lieferanten/SOP_EINK-02" />
                </div>

                <H color={colorQM}>Regulatorik & MDR</H>
                <div className="ea-grid">
                  <ModCard title="Importeurpflichten" refCode="SOP-REG-01" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-01" />
                  <ModCard title="Haendlerpflichten"  refCode="SOP-REG-02" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-02" />
                  <ModCard title="PRRC"               refCode="SOP-REG-03" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-03" />
                  <ModCard title="Audits"             refCode="SOP-REG-05" color={colorQM} link="/docs/regulatorik-mdr/SOP_REG-05" />
                </div>
              </div>
            )}

            {/* ── SAP UNIVERSUM ── direkt eingebettet, kein Import nötig */}
            {tab === 'SAP' && <SAPUniverse />}

            {/* ── MED ── */}
            {tab === 'MED' && (
              <div>
                {!mfr ? (
                  <>
                    <H color={colorMed}>Hersteller & Produktschulungen</H>
                    <div className="ea-mfr-grid">
                      {MANUFACTURERS.map(m => <ManufacturerCard key={m.id} m={m} onClick={() => setMfr(m)} />)}
                    </div>
                  </>
                ) : (
                  <div>
                    <button className="ea-back" onClick={() => setMfr(null)}>← Zurueck</button>
                    <div className="ea-manu-hd">
                      <div className="ea-manu-hd-title">{mfr.name}</div>
                      <p className="ea-manu-hd-sub">Waehlen Sie ein Produktmodul.</p>
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
                              <p style={{ fontSize: '.81rem', color: '#6b7280', lineHeight: 1.55, margin: '0 0 1rem', flex: 1 }}>{p.desc}</p>
                              <Link className="ea-card-btn" style={{ background: colorMed, color: '#fff' }} to={p.link}>Modul starten</Link>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="ea-draft">
                        <div className="ea-draft-title">In Vorbereitung</div>
                        <p className="ea-draft-sub">Inhalte fuer <strong>{mfr.name}</strong> werden erstellt.</p>
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