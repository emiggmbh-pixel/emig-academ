import React, { useState } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    id: 'pre', phase: '0', emoji: '🌐',
    title: 'Kundenanfrage', subtitle: 'Webshop / Direktkontakt',
    color: '#818cf8',
    details: [
      { icon: '🛒', text: 'Digitaler Katalog — Anfrage über Webshop-API (RESTful)' },
      { icon: '📞', text: 'Direktkontakt via Klinik / Facharzt' },
      { icon: '🔍', text: 'Sprachenunabhängige Dublettenprüfung (TEU = Tübingen)' },
      { icon: '📋', text: 'CRM Lead-Anlage & automatische Zuweisung an Fachberater' },
    ],
  },
  {
    id: 'offer', phase: '1', emoji: '📊',
    title: 'Angebot & Kalkulation', subtitle: 'Quote-to-Order',
    color: '#a78bfa',
    details: [
      { icon: '💰', text: 'Key-Account Preislisten automatisch geladen' },
      { icon: '📦', text: 'BOM-Sets: Verkaufspreis + Einzelkomponenten im Hintergrund' },
      { icon: '📈', text: 'Echtzeit-Margenanzeige pro Position' },
      { icon: '📄', text: 'Proforma-Rechnung für 50% Anzahlung generiert' },
    ],
  },
  {
    id: 'order', phase: '2', emoji: '✅',
    title: 'Kundenauftrag', subtitle: 'Freigabe & Sperrmanagement',
    color: '#38bdf8',
    details: [
      { icon: '🔒', text: 'Auftrag gesperrt bis Anzahlungseingang bestätigt' },
      { icon: '📦', text: 'Automatische Bestandsreservierung der BOM-Komponenten' },
      { icon: '🏦', text: 'Klinik-Saldo-Tracking in Echtzeit' },
      { icon: '🚦', text: 'Nur autorisierte Freigabe durch GF/Finanzen' },
    ],
  },
  {
    id: 'purchase', phase: '3', emoji: '🛍️',
    title: 'Einkauf & Bestellung', subtitle: 'Purchase-to-Pay',
    color: '#fbbf24',
    details: [
      { icon: '🤖', text: 'MRP-Lauf: automatische Bestellvorschläge bei Mindestbestand-Unterschreitung' },
      { icon: '📋', text: 'Bestellung → Proforma → 50% Anzahlung → Order Confirmation' },
      { icon: '⏱️', text: 'Backorder-Liste mit Ready Dates (Srok gotovnosti)' },
      { icon: '🏅', text: 'Preferred Supplier wird automatisch berücksichtigt' },
    ],
  },
  {
    id: 'receiving', phase: '4', emoji: '📬',
    title: 'Wareneingang', subtitle: 'MDR-Gate & UDI-Scan',
    color: '#34d399',
    details: [
      { icon: '📱', text: 'QR/UDI-Scan: automatische Charge + MHD Erfassung' },
      { icon: '🛡️', text: 'MDR-Gate: CE-Zertifikat + DoC geprüft — sonst Sperre' },
      { icon: '🔢', text: 'Einheiten-Umrechnung: Palette → Karton → Stück automatisch' },
      { icon: '🏪', text: 'Automatische Lagerplatzzuweisung (Haupt-/Sperrlager)' },
    ],
  },
  {
    id: 'warehouse', phase: '5', emoji: '🏭',
    title: 'Lager & Kommissionierung', subtitle: 'Chargenrückverfolgung',
    color: '#2dd4bf',
    details: [
      { icon: '🔎', text: 'Bidirektionale Chargensuche in < 5 Sekunden' },
      { icon: '🚫', text: 'Sperrlager/Quarantäne: Gebrauchtware nie als verfügbar markiert' },
      { icon: '📲', text: 'Pickliste via QR-Scan → korrekte Charge automatisch zugeordnet' },
      { icon: '⚠️', text: 'MHD-Monitoring: proaktive Warnlisten für ablaufende Bestände' },
    ],
  },
  {
    id: 'shipping', phase: '6', emoji: '🚚',
    title: 'Versand & Lieferung', subtitle: 'MDR-konformer Versand',
    color: '#fb923c',
    details: [
      { icon: '📋', text: 'Lieferschein + Packliste mit Charge & MHD automatisch generiert' },
      { icon: '🏷️', text: 'UDI-Barcode-Etiketten MDR-konform gedruckt' },
      { icon: '🗂️', text: 'Equipment Card (Geräteakte) automatisch eröffnet' },
      { icon: '💳', text: 'Abschlussrechnung nach Warenausgang generiert' },
    ],
  },
  {
    id: 'finance', phase: '7', emoji: '💶',
    title: 'Finanzen & DATEV', subtitle: 'GoBD-konforme Buchhaltung',
    color: '#f87171',
    details: [
      { icon: '📤', text: 'DATEV-Export: CSV/ASCII Buchungsstapel für Steuerberater' },
      { icon: '🔏', text: 'Belege nach Export gesperrt — GoBD-Unveränderbarkeit' },
      { icon: '🌍', text: 'USt-Logik: Inland / EU steuerfrei / Drittland automatisch' },
      { icon: '📊', text: 'Steuerlast-Berechnung + Dividenden-Grundlage in Echtzeit' },
    ],
  },
  {
    id: 'service', phase: '8', emoji: '🔧',
    title: 'Service & RMA', subtitle: 'After-Sales 3-Stufen-Workflow',
    color: '#c084fc',
    details: [
      { icon: '🎫', text: 'Stufe 1 (4h): Ticket via Seriennummer → Equipment Card sofort' },
      { icon: '🏠', text: 'Szenario A: Vor-Ort mit Techniker-Cockpit & Fahrzeuglager' },
      { icon: '📦', text: 'Szenario B: RMA → Reparaturlager (getrennt von Neuware)' },
      { icon: '📡', text: 'Stufe 3 (2h): MDR-Rückruf + BfArM-Berichte automatisch' },
    ],
  },
  {
    id: 'retention', phase: '9', emoji: '🔄',
    title: 'Retention & Wartung', subtitle: 'Proaktive Kundenbindung',
    color: '#f472b6',
    details: [
      { icon: '⏰', text: 'STK-Automatisierung: proaktive Klinik-Benachrichtigung' },
      { icon: '🖥️', text: 'Check-in Portal: Termin + Vorab-Formulare digital' },
      { icon: '🔁', text: 'Wiederkauf-Management: Verbrauchsanalyse → Folgeauftrag' },
      { icon: '🏆', text: 'SLA-Monitoring: 4h Reaktionszeit kontinuierlich überwacht' },
    ],
  },
];

const MODULES = [
  {
    id: 'vertrieb', icon: '📊', title: 'Vertrieb & Preisfindung',
    color: '#818cf8', ref: 'Kap. 3.1',
    highlights: ['Individuelle Preislisten pro Key-Account', 'BOM-Sets: Stücklisten-Verkauf', 'Webshop-Import → Quote-to-Order', 'Anzahlungslogik mit Auftragssperre'],
    kpis: [{ v: '≤15min', l: 'Webshop-Sync' }, { v: '50%', l: 'Anzahlung' }, { v: 'Auto', l: 'Preisfindung' }],
    deep: 'Vollautomatische Preisfindung: Für jeden Key-Account werden individuelle Preislisten hinterlegt. Das BOM-System (Bill of Materials) verkauft komplexe Operations-Sets — der Kunde sieht einen Set-Preis, SAP reserviert und bucht alle Einzelkomponenten im Hintergrund.\n\nDer Anzahlungs-Workflow ist Pflichtprozess: Ohne Bestätigung des 50%-Vorauszahlungseingangs bleibt der Auftrag systemseitig gesperrt.',
  },
  {
    id: 'lager', icon: '🏭', title: 'Lager & MDR-Compliance',
    color: '#34d399', ref: 'Kap. 3.2',
    highlights: ['UDI/QR-Scan Wareneingang', 'Bidirektionale Chargenrückverfolgung < 5 Sek', 'Sperrlager virtuell getrennt', 'CE/DoC MDR-Gate vor Versand'],
    kpis: [{ v: '<5 Sek', l: 'Chargensuche' }, { v: '~3.000', l: 'Artikel' }, { v: '100%', l: 'MDR-Gate' }],
    deep: 'Das Herzstück der MDR-Compliance: Jedes Medizinprodukt wird über UDI-Barcode beim Wareneingang erfasst. Das System prüft automatisch CE-Zertifikat und DoC.\n\nBidirektionale Chargenrückverfolgung: Im Rückruffall werden alle Empfänger (Vorwärts) und der Ursprungslieferant (Rückwärts) in < 5 Sekunden identifiziert.\n\nVirtuelle Lagerorte trennen Neuware, Sperrlager und RMA-Reparaturlager — versehentliche Kommissionierung gesperrter Ware ist technisch ausgeschlossen.',
  },
  {
    id: 'einkauf', icon: '🛍️', title: 'Einkauf & Disposition',
    color: '#fbbf24', ref: 'Kap. 3.3',
    highlights: ['MRP-Bestellvorschläge automatisch', 'Zertifikats-Ablaufüberwachung 60 Tage', 'Preferred Supplier System', 'Backorder-Liste mit Ready Dates'],
    kpis: [{ v: '60 Tage', l: 'Zert.-Warnung' }, { v: 'EUR', l: 'Währung' }, { v: 'Auto', l: 'MRP-Lauf' }],
    deep: 'Der MRP-Lauf generiert vollautomatisch Bestellvorschläge — basierend auf Mindestbeständen, offenen Kundenaufträgen und BOM-Komponenten.\n\nSAP überwacht Ablaufdaten von CE-Zertifikaten und DoC aller Lieferanten. 60 Tage vor Ablauf wird der Einkäufer automatisch benachrichtigt. Abgelaufene Artikel werden für den Wareneingang gesperrt.\n\nDer strukturierte 4-stufige Bestellworkflow bildet die herstellerspezifischen Standards (z.B. RIWOspine) exakt ab.',
  },
  {
    id: 'service', icon: '🔧', title: 'Service & RMA',
    color: '#c084fc', ref: 'Kap. 3.4',
    highlights: ['3-Stufen Eskalations-Workflow', 'Equipment Card (Geräteakte)', 'SLA 4h Reaktionszeit', 'MDR-Rückruf BfArM-Workflow'],
    kpis: [{ v: '4 Std', l: 'SLA Stufe 1' }, { v: '24 Std', l: 'SLA Stufe 2' }, { v: '2 Std', l: 'SLA Stufe 3' }],
    deep: 'Stufe 1 (4h): Interne Diagnose via Equipment Card + Knowledge Base\nStufe 2 (24h): Formelle Herstellermeldung mit Fehlerprotokoll, Seriennummer und Fotos\nStufe 3 (2h): MDR-Rückruf — identifiziert alle betroffenen Geräte + kommuniziert mit BfArM\n\nSzenario A (Vor-Ort): Techniker-Cockpit mit mobilem Fahrzeuglager\nSzenario B (RMA): Physisch getrenntes Reparaturlager',
  },
  {
    id: 'finanzen', icon: '💶', title: 'Finanzen & DATEV',
    color: '#f87171', ref: 'Kap. 3.5',
    highlights: ['GoBD-konforme Buchführung', 'DATEV CSV/ASCII Export', 'Automatisches Zahlungssperrmanagement', 'Steuerlast & Dividenden-Reports'],
    kpis: [{ v: 'GoBD', l: 'Standard' }, { v: 'DATEV', l: 'Export' }, { v: 'HGB', l: 'Bilanzierung' }],
    deep: 'Das automatische Zahlungssperrmanagement ist ein Sicherheitsnetz: Bei Über- oder Unterzahlungen werden Lieferungen automatisch blockiert — Freigabe nur durch GF.\n\nDer DATEV-Export generiert GoBD-konforme Buchungsstapel. Nach dem Export werden Datensätze systemseitig gesperrt — nachträgliche Manipulation technisch ausgeschlossen.',
  },
  {
    id: 'intercompany', icon: '🌍', title: 'Intercompany & MiaMed',
    color: '#2dd4bf', ref: 'Kap. 3.8',
    highlights: ['Automatische Beleg-Synchronisation', 'Seriennummern-Übertragung elektronisch', 'Multi-Währung UAH/EUR/USD', 'Gruppen-Konsolidierung auf Knopfdruck'],
    kpis: [{ v: '~700/J', l: 'MiaMed Auftr.' }, { v: '3', l: 'Währungen' }, { v: '2', l: 'Mandanten' }],
    deep: 'Multi-Mandanten: EMIG GmbH (DE, EUR, HGB) + MiaMed (Ukraine, UAH, EUR/USD) in einer SAP-Umgebung.\n\nAutomatisierter IC-Prozess: Bestellung in MiaMed → automatisch Kundenauftrag bei EMIG. Warenausgang EMIG → Seriennummern elektronisch übertragen, kein manueller WE bei MiaMed.\n\nGruppen-Konsolidierung: Bilanz + GuV ohne IC-Positionen in Sekundenschnelle.',
  },
];

const UAT_TESTS = [
  { id: 'V-01', module: 'Vertrieb',      title: 'Webshop-Anfrage importieren',          prio: 'P1' },
  { id: 'V-02', module: 'Vertrieb',      title: 'Angebot mit BOM erstellen',            prio: 'P1' },
  { id: 'V-03', module: 'Vertrieb',      title: 'Angebot → Auftrag (1 Klick)',          prio: 'P1' },
  { id: 'V-04', module: 'Vertrieb',      title: 'Sperrmanagement bei fehlender Zahlung',prio: 'P1' },
  { id: 'B-01', module: 'Einkauf',       title: 'MRP-Bestellvorschlag',                 prio: 'P1' },
  { id: 'B-02', module: 'Einkauf',       title: 'Bestellung mit 50% Anzahlung',         prio: 'P1' },
  { id: 'B-03', module: 'Lager',         title: 'Wareneingang mit UDI-Scan',            prio: 'P1' },
  { id: 'B-06', module: 'Einkauf',       title: 'Zertifikats-Ablaufwarnung',            prio: 'P2' },
  { id: 'L-01', module: 'Lager',         title: 'MDR-Gate vor Kommissionierung',        prio: 'P1' },
  { id: 'L-02', module: 'Lager',         title: 'MDR-Gate blockiert (kein DoC)',        prio: 'P1' },
  { id: 'L-04', module: 'Lager',         title: 'Chargen-Rückverfolgung bidirektional', prio: 'P1' },
  { id: 'L-05', module: 'Lager',         title: 'Sperrlager-Einlagerung',               prio: 'P1' },
  { id: 'F-01', module: 'Finanzen',      title: 'Ausgangsrechnung erstellen',           prio: 'P1' },
  { id: 'F-02', module: 'Finanzen',      title: 'DATEV-Export',                         prio: 'P1' },
  { id: 'F-04', module: 'Finanzen',      title: 'Zahlungssperrmanagement',              prio: 'P1' },
  { id: 'S-01', module: 'Service',       title: 'Service-Ticket via Seriennummer',      prio: 'P1' },
  { id: 'S-04', module: 'Service',       title: 'RMA-Rücksendung (Szenario B)',         prio: 'P1' },
  { id: 'S-05', module: 'Service',       title: 'Hersteller-Meldung (Stufe 2)',         prio: 'P1' },
  { id: 'S-07', module: 'Service',       title: 'Stufe-3-Rückruf auslösen',            prio: 'P1' },
  { id: 'IC-01',module: 'Intercompany',  title: 'Beleg-Synchronisation',                prio: 'P1' },
  { id: 'IC-02',module: 'Intercompany',  title: 'Seriennummern-Übertragung',            prio: 'P1' },
];

const TIMELINE = [
  { phase: 'Feb 2026',      emoji: '✅', title: 'Shortlist',         desc: 'Top 2–3 Anbieter ausgewählt',            done: true  },
  { phase: 'März 2026',     emoji: '✅', title: 'Vertragsabschluss', desc: 'Live-Demos + Festpreisangebote',         done: true  },
  { phase: 'April 2026',    emoji: '🚀', title: 'Projekt Kick-off',  desc: 'Blueprint-Workshop + Stammdaten-Vorb.', done: false },
  { phase: 'Mai–Jul 2026',  emoji: '⚙️', title: 'Customizing',       desc: 'SAP-Konfiguration + Webshop-API',       done: false },
  { phase: 'Aug–Sep 2026',  emoji: '📦', title: 'Datenmigration',    desc: 'Vollständige Migration + UAT-Start',    done: false },
  { phase: 'Oktober 2026',  emoji: '🧪', title: 'UAT',               desc: 'User Acceptance Testing',               done: false },
  { phase: 'Nov 2026',      emoji: '🏁', title: 'Go-Live EMIG DE',   desc: 'Go-Live + Hypercare 4 Wochen',          done: false },
  { phase: 'Q1 2027',       emoji: '🌍', title: 'Go-Live MiaMed UA', desc: 'Ukraine-Mandant + Intercompany aktiv',  done: false },
];

// ─── INLINE STYLES ───────────────────────────────────────────────────────────
// Using a style tag injected into head via a small helper
function Styles() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');

    .su-root { font-family:'Outfit',sans-serif; background:#0d0d14; color:#e8e4dc; border-radius:20px; overflow:hidden; }
    .su-root * { box-sizing:border-box; }
    .su-root ::-webkit-scrollbar { width:3px; height:3px; }
    .su-root ::-webkit-scrollbar-track { background:#13131e; }
    .su-root ::-webkit-scrollbar-thumb { background:rgba(251,191,36,.3); border-radius:99px; }

    /* Header */
    .su-hd { background:linear-gradient(135deg,#0d0d14,#1a1a2e); padding:2.5rem 2.5rem 2rem; position:relative; overflow:hidden; border-bottom:1px solid rgba(255,255,255,.06); }
    .su-hd::after { content:'SAP'; position:absolute; right:1.5rem; top:50%; transform:translateY(-50%); font-family:'Bebas Neue',sans-serif; font-size:9rem; color:rgba(251,191,36,.04); line-height:1; pointer-events:none; }
    .su-eyebrow { font-size:.62rem; letter-spacing:.26em; text-transform:uppercase; color:#fbbf24; font-weight:600; display:flex; align-items:center; gap:9px; margin-bottom:.6rem; }
    .su-eyebrow::before { content:''; display:block; width:28px; height:1px; background:#fbbf24; opacity:.6; }
    .su-hd-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,5vw,3.8rem); color:#fff; margin:0 0 .4rem; letter-spacing:.05em; line-height:.95; }
    .su-hd-title span { color:#fcd34d; }
    .su-hd-sub { color:rgba(232,228,220,.42); font-size:.88rem; font-weight:300; max-width:560px; line-height:1.6; }
    .su-hd-meta { display:flex; gap:1.5rem; margin-top:1.4rem; flex-wrap:wrap; }
    .su-meta { display:flex; align-items:center; gap:7px; font-size:.73rem; color:rgba(232,228,220,.4); }
    .su-meta::before { content:''; display:block; width:5px; height:5px; border-radius:50%; background:#fbbf24; flex-shrink:0; }

    /* Nav */
    .su-nav { background:#13131e; border-bottom:1px solid rgba(255,255,255,.06); display:flex; overflow-x:auto; -webkit-overflow-scrolling:touch; }
    .su-nav::-webkit-scrollbar { height:2px; }
    .su-tab { padding:.85rem 1.2rem; border:none; background:transparent; color:rgba(232,228,220,.4); font-family:'Outfit',sans-serif; font-size:.82rem; font-weight:500; cursor:pointer; white-space:nowrap; border-bottom:2px solid transparent; transition:all .18s; flex-shrink:0; }
    .su-tab:hover { color:#fff; }
    .su-tab.on { color:#fcd34d; border-bottom-color:#fbbf24; font-weight:600; }

    /* Content */
    .su-body { padding:2rem 2.5rem 3rem; }
    .su-sh { font-family:'Bebas Neue',sans-serif; font-size:1.8rem; color:#fff; letter-spacing:.07em; margin:0 0 .35rem; }
    .su-ss { font-size:.82rem; color:rgba(232,228,220,.4); margin:0 0 1.75rem; font-weight:300; }

    /* Process flow chips */
    .su-flow { display:flex; align-items:center; gap:0; overflow-x:auto; padding-bottom:.75rem; margin-bottom:1.75rem; -webkit-overflow-scrolling:touch; }
    .su-fc { flex-shrink:0; background:#1a1a2e; border:1px solid rgba(255,255,255,.07); border-radius:11px; padding:.9rem 1rem; text-align:center; cursor:pointer; transition:all .2s; min-width:100px; max-width:120px; }
    .su-fc:hover, .su-fc.on { transform:translateY(-2px); box-shadow:0 8px 22px rgba(0,0,0,.4); }
    .su-fc .em { font-size:1.5rem; display:block; margin-bottom:4px; }
    .su-fc .lbl { font-size:.65rem; color:rgba(232,228,220,.5); line-height:1.3; font-weight:500; }
    .su-arr { color:rgba(251,191,36,.35); font-size:1.1rem; padding:0 3px; flex-shrink:0; margin-bottom:12px; }

    /* Step grid */
    .su-sgrid { display:grid; grid-template-columns:repeat(auto-fill,minmax(265px,1fr)); gap:12px; }
    .su-scard { background:#1a1a2e; border:1px solid rgba(255,255,255,.07); border-radius:14px; padding:1.3rem; cursor:pointer; transition:all .2s; position:relative; overflow:hidden; }
    .su-scard:hover { border-color:rgba(255,255,255,.14); transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,.35); }
    .su-scard.on { box-shadow:0 0 0 1.5px var(--c,#fbbf24), 0 10px 28px rgba(0,0,0,.35); }
    .su-scard-bar { position:absolute; top:0; left:0; right:0; height:2px; border-radius:14px 14px 0 0; opacity:.75; }
    .su-scard-top { display:flex; gap:11px; align-items:flex-start; margin-bottom:.7rem; }
    .su-big-em { font-size:1.7rem; line-height:1; flex-shrink:0; }
    .su-ph { font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:rgba(232,228,220,.35); margin-bottom:2px; }
    .su-ttl { font-size:.92rem; font-weight:700; color:#fff; line-height:1.2; }
    .su-sub { font-size:.68rem; color:rgba(232,228,220,.4); margin-top:2px; }
    .su-dlist { display:flex; flex-direction:column; gap:4px; }
    .su-di { display:flex; gap:7px; font-size:.73rem; color:rgba(232,228,220,.55); line-height:1.4; align-items:flex-start; }

    /* Detail panel */
    .su-dp { background:#13131e; border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:1.5rem; margin-bottom:1.5rem; border-left:3px solid; }
    .su-dp-hd { display:flex; align-items:center; gap:11px; margin-bottom:1rem; }
    .su-dp-em { font-size:1.8rem; }
    .su-dp-name { font-size:1rem; font-weight:700; color:#fff; }
    .su-dp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:9px; }
    .su-dp-item { background:rgba(255,255,255,.03); border-radius:9px; padding:.8rem .95rem; display:flex; gap:9px; align-items:flex-start; }
    .su-dp-ico { font-size:1rem; flex-shrink:0; }
    .su-dp-txt { font-size:.78rem; color:rgba(232,228,220,.7); line-height:1.5; }

    /* Module cards */
    .su-mgrid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:12px; }
    .su-mc { background:#1a1a2e; border:1px solid rgba(255,255,255,.07); border-radius:14px; overflow:hidden; transition:all .2s; }
    .su-mc:hover { border-color:rgba(255,255,255,.12); transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,.35); }
    .su-mc-hd { padding:1.3rem; display:flex; align-items:flex-start; gap:12px; border-bottom:1px solid rgba(255,255,255,.06); cursor:pointer; }
    .su-mc-ico { width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
    .su-mc-ref { font-family:'DM Mono',monospace; font-size:.6rem; color:rgba(232,228,220,.35); letter-spacing:.07em; margin-bottom:2px; }
    .su-mc-title { font-size:.94rem; font-weight:700; color:#fff; margin:0; }
    .su-mc-body { padding:1.1rem 1.3rem; }
    .su-mc-hls { display:flex; flex-direction:column; gap:5px; margin-bottom:1.1rem; }
    .su-hl { font-size:.75rem; color:rgba(232,228,220,.6); display:flex; gap:7px; align-items:flex-start; }
    .su-hl::before { content:'›'; color:#fbbf24; font-weight:700; flex-shrink:0; }
    .su-kpis { display:flex; gap:7px; flex-wrap:wrap; }
    .su-kpi { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.06); border-radius:8px; padding:5px 9px; text-align:center; min-width:64px; }
    .su-kpi-v { font-family:'Bebas Neue',sans-serif; font-size:1rem; line-height:1; letter-spacing:.03em; }
    .su-kpi-l { font-size:.56rem; color:rgba(232,228,220,.4); text-transform:uppercase; letter-spacing:.09em; margin-top:1px; }
    .su-mc-toggle { width:100%; padding:.65rem; background:rgba(255,255,255,.025); border:none; border-top:1px solid rgba(255,255,255,.06); color:rgba(232,228,220,.35); font-family:'Outfit',sans-serif; font-size:.73rem; cursor:pointer; transition:all .18s; }
    .su-mc-toggle:hover { background:rgba(255,255,255,.05); color:#fff; }
    .su-mc-deep { padding:1.1rem 1.3rem; border-top:1px solid rgba(255,255,255,.05); font-size:.78rem; color:rgba(232,228,220,.6); line-height:1.72; white-space:pre-line; }

    /* MDR chain */
    .su-mdr-chain { display:flex; align-items:center; overflow-x:auto; gap:0; padding:1.2rem 0 1rem; -webkit-overflow-scrolling:touch; }
    .su-mdr-step { flex-shrink:0; background:#1a1a2e; border:1px solid rgba(255,255,255,.07); border-radius:12px; padding:1rem; text-align:center; min-width:120px; max-width:145px; }
    .su-mdr-em { font-size:1.6rem; display:block; margin-bottom:5px; }
    .su-mdr-t { font-size:.73rem; font-weight:700; color:#fff; margin-bottom:3px; line-height:1.25; }
    .su-mdr-s { font-size:.63rem; color:rgba(232,228,220,.4); line-height:1.45; white-space:pre-line; }
    .su-mdr-arr { color:rgba(251,191,36,.35); font-size:1.2rem; padding:0 5px; flex-shrink:0; }

    /* Escalation */
    .su-esc { border-radius:12px; padding:1.3rem 1.4rem; margin-bottom:9px; border-left:4px solid; }
    .su-esc-hd { display:flex; align-items:center; gap:11px; margin-bottom:.9rem; flex-wrap:wrap; }
    .su-esc-badge { font-size:.62rem; font-weight:700; text-transform:uppercase; letter-spacing:.15em; padding:2px 9px; border-radius:5px; white-space:nowrap; }
    .su-esc-title { font-size:.94rem; font-weight:700; color:#fff; margin:2px 0 1px; }
    .su-esc-trigger { font-size:.7rem; color:rgba(232,228,220,.38); }
    .su-esc-acts { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:7px; }
    .su-esc-act { background:rgba(255,255,255,.03); border-radius:8px; padding:.65rem .85rem; font-size:.75rem; color:rgba(232,228,220,.65); display:flex; gap:7px; }

    /* Roles */
    .su-rgrid { display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:11px; }
    .su-rc { background:#1a1a2e; border:1px solid rgba(255,255,255,.07); border-radius:13px; padding:1.3rem; }
    .su-rc-ico { width:40px; height:40px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:1.3rem; margin-bottom:.7rem; }
    .su-rc-badge { display:inline-block; padding:2px 8px; border-radius:4px; font-family:'DM Mono',monospace; font-size:.6rem; font-weight:500; letter-spacing:.07em; margin-bottom:5px; }
    .su-rc-name { font-size:.88rem; font-weight:700; color:#fff; margin-bottom:3px; }
    .su-rc-mod { font-size:.72rem; color:rgba(232,228,220,.38); line-height:1.4; }

    /* SoD */
    .su-sod { background:rgba(220,38,38,.07); border:1px solid rgba(220,38,38,.18); border-radius:11px; padding:1rem 1.2rem; margin-bottom:8px; display:grid; grid-template-columns:1fr auto 1fr; gap:1rem; align-items:center; }
    .su-sod-c { font-size:.78rem; font-weight:600; color:rgba(252,165,165,.88); }
    .su-sod-b { background:rgba(220,38,38,.18); color:#fca5a5; padding:3px 10px; border-radius:99px; font-size:.62rem; font-weight:700; text-transform:uppercase; letter-spacing:.09em; text-align:center; white-space:nowrap; }
    .su-sod-ctrl { font-size:.73rem; color:#6ee7b7; }

    /* Timeline */
    .su-tl { padding-left:1.8rem; position:relative; }
    .su-tl::before { content:''; position:absolute; left:0; top:0; bottom:0; width:1px; background:linear-gradient(to bottom,#fbbf24,rgba(251,191,36,.08)); }
    .su-tl-item { padding-bottom:1.8rem; position:relative; padding-left:1.4rem; }
    .su-tl-dot { position:absolute; left:-1.8rem; top:4px; width:13px; height:13px; border-radius:50%; border:2px solid; transform:translateX(-50%); }
    .su-tl-dot.d { background:#fbbf24; border-color:#fbbf24; }
    .su-tl-dot.t { background:#13131e; border-color:rgba(251,191,36,.28); }
    .su-tl-ph { font-family:'DM Mono',monospace; font-size:.63rem; color:#fbbf24; letter-spacing:.1em; margin-bottom:3px; }
    .su-tl-name { font-size:.92rem; font-weight:700; color:#fff; margin-bottom:2px; display:flex; align-items:center; gap:7px; flex-wrap:wrap; }
    .su-tl-desc { font-size:.75rem; color:rgba(232,228,220,.38); }
    .su-tl-badge { font-size:.58rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; padding:2px 7px; border-radius:4px; }
    .su-tl-badge.d { background:rgba(16,185,129,.15); color:#6ee7b7; }
    .su-tl-badge.t { background:rgba(251,191,36,.12); color:#fcd34d; }

    /* UAT */
    .su-uat-stats { display:flex; gap:11px; margin-bottom:1.4rem; flex-wrap:wrap; }
    .su-uat-stat { background:#1a1a2e; border:1px solid rgba(255,255,255,.07); border-radius:11px; padding:.7rem 1.1rem; display:flex; align-items:center; gap:9px; }
    .su-uat-n { font-family:'Bebas Neue',sans-serif; font-size:1.6rem; line-height:1; letter-spacing:.03em; }
    .su-uat-l { font-size:.6rem; color:rgba(232,228,220,.35); text-transform:uppercase; letter-spacing:.1em; font-weight:500; }
    .su-uat-pbar-wrap { flex:1; min-width:160px; background:#1a1a2e; border:1px solid rgba(255,255,255,.07); border-radius:11px; padding:.7rem 1.1rem; display:flex; align-items:center; gap:12px; }
    .su-uat-pbar-bg { flex:1; height:4px; background:rgba(255,255,255,.06); border-radius:99px; overflow:hidden; }
    .su-uat-pbar-fill { height:100%; border-radius:99px; background:linear-gradient(90deg,#10b981,#34d399); transition:width .5s; }
    .su-filters { display:flex; gap:7px; margin-bottom:1.1rem; flex-wrap:wrap; }
    .su-fb { padding:5px 12px; border-radius:7px; border:1px solid rgba(255,255,255,.07); background:#1a1a2e; color:rgba(232,228,220,.4); font-family:'Outfit',sans-serif; font-size:.73rem; font-weight:500; cursor:pointer; transition:all .16s; }
    .su-fb:hover { color:#fff; border-color:rgba(255,255,255,.18); }
    .su-fb.on { background:#13131e; border-color:#fbbf24; color:#fcd34d; }
    .su-table-wrap { background:#1a1a2e; border:1px solid rgba(255,255,255,.07); border-radius:13px; overflow:hidden; }
    .su-table { width:100%; border-collapse:collapse; }
    .su-table th { text-align:left; padding:.65rem .9rem; font-size:.6rem; text-transform:uppercase; letter-spacing:.14em; color:rgba(232,228,220,.3); font-weight:600; border-bottom:1px solid rgba(255,255,255,.06); }
    .su-table td { padding:.75rem .9rem; font-size:.78rem; border-bottom:1px solid rgba(255,255,255,.028); vertical-align:middle; }
    .su-table tr:last-child td { border-bottom:none; }
    .su-table tr:hover td { background:rgba(255,255,255,.018); }
    .su-tid { font-family:'DM Mono',monospace; font-size:.68rem; color:#fbbf24; }
    .su-ttitle { color:rgba(232,228,220,.8); }
    .su-mod-badge { font-size:.67rem; padding:2px 9px; border-radius:5px; font-weight:600; white-space:nowrap; }
    .su-p1 { background:rgba(220,38,38,.14); color:#fca5a5; }
    .su-p2 { background:rgba(251,191,36,.11); color:#fcd34d; }
    .su-sbwrap { display:flex; gap:5px; }
    .su-sb { width:27px; height:27px; border-radius:6px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.03); font-size:.7rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .14s; }
    .su-sb:hover { border-color:rgba(255,255,255,.2); }
    .su-sb.pass { background:rgba(16,185,129,.18); border-color:#10b981; color:#6ee7b7; }
    .su-sb.fail { background:rgba(220,38,38,.18); border-color:#dc2626; color:#fca5a5; }
    .su-sb.pend { background:rgba(251,191,36,.1); border-color:rgba(251,191,36,.3); color:#fcd34d; }

    @keyframes su-up { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
    .su-anim { animation:su-up .3s ease; }

    @media(max-width:600px){
      .su-body{padding:1.5rem 1.25rem 2rem;}
      .su-hd{padding:1.75rem 1.25rem 1.5rem;}
      .su-sgrid{grid-template-columns:1fr;}
      .su-mgrid{grid-template-columns:1fr;}
      .su-rgrid{grid-template-columns:repeat(2,1fr);}
      .su-sod{grid-template-columns:1fr;}
    }
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function SAPUniverseWidget() {
  const [tab, setTab]           = useState('map');
  const [activeStep, setStep]   = useState<string | null>(null);
  const [expandedMod, setMod]   = useState<string | null>(null);
  const [uatFilter, setFilter]  = useState('all');
  const [statuses, setStatuses] = useState<Record<string, 'open'|'pass'|'fail'>>(() =>
    Object.fromEntries(UAT_TESTS.map(t => [t.id, 'open']))
  );

  const tabs = [
    { id: 'map',      label: '🗺️ Prozesslandschaft' },
    { id: 'modules',  label: '📦 SAP Module'        },
    { id: 'mdr',      label: '🛡️ MDR-Compliance'    },
    { id: 'roles',    label: '👥 Rollen & Rechte'    },
    { id: 'timeline', label: '📅 Zeitplan'           },
    { id: 'uat',      label: '🧪 UAT Tracker'        },
  ];

  const setStatus = (id: string, s: 'pass'|'fail'|'open') =>
    setStatuses(prev => ({ ...prev, [id]: prev[id] === s ? 'open' : s }));

  const pass  = Object.values(statuses).filter(s => s === 'pass').length;
  const fail  = Object.values(statuses).filter(s => s === 'fail').length;
  const open_ = Object.values(statuses).filter(s => s === 'open').length;
  const pct   = Math.round((pass / UAT_TESTS.length) * 100);

  const MODULE_COLORS: Record<string, string> = {
    Vertrieb:'#818cf8', Einkauf:'#fbbf24', Lager:'#34d399',
    Finanzen:'#f87171', Service:'#c084fc', Intercompany:'#2dd4bf',
  };
  const MODULE_BG: Record<string, string> = {
    Vertrieb:'#818cf820', Einkauf:'#fbbf2420', Lager:'#34d39920',
    Finanzen:'#f8717120', Service:'#c084fc20', Intercompany:'#2dd4bf20',
  };

  const filtered = uatFilter === 'all' ? UAT_TESTS
    : uatFilter === 'pass' ? UAT_TESTS.filter(t => statuses[t.id] === 'pass')
    : uatFilter === 'fail' ? UAT_TESTS.filter(t => statuses[t.id] === 'fail')
    : uatFilter === 'open' ? UAT_TESTS.filter(t => statuses[t.id] === 'open')
    : UAT_TESTS.filter(t => t.module === uatFilter);

  return (
    <div className="su-root">
      <Styles />

      {/* ── Header ── */}
      <div className="su-hd">
        <div className="su-eyebrow">SAP Business One Cloud · EMIG GmbH Deutschland</div>
        <h1 className="su-hd-title">SAP <span>Universum</span></h1>
        <p className="su-hd-sub">
          Interaktive Prozesslandschaft, Module und UAT-Tracker für die vollständige SAP-Implementierung der EMIG GmbH.
        </p>
        <div className="su-hd-meta">
          <span className="su-meta">Go-Live: November 2026</span>
          <span className="su-meta">MDR 2017/745 konform</span>
          <span className="su-meta">{MODULES.length} Module · {PROCESS_STEPS.length} Prozessschritte</span>
          <span className="su-meta">MiaMed Ukraine Q1/2027</span>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="su-nav">
        {tabs.map(t => (
          <button key={t.id} className={`su-tab ${tab === t.id ? 'on' : ''}`}
            onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </nav>

      <div className="su-body">

        {/* ════ PROCESS MAP ════ */}
        {tab === 'map' && (
          <div className="su-anim">
            <div className="su-sh">Vollständige Prozesslandschaft</div>
            <p className="su-ss">Klicken Sie auf einen Schritt, um Details zu öffnen. Scrollbarer Prozessfluss von Phase 0 → 9.</p>

            {/* Scrollable flow */}
            <div className="su-flow">
              {PROCESS_STEPS.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div className={`su-fc ${activeStep === s.id ? 'on' : ''}`}
                    style={{ borderColor: activeStep === s.id ? s.color : undefined }}
                    onClick={() => setStep(activeStep === s.id ? null : s.id)}>
                    <span className="em">{s.emoji}</span>
                    <span className="lbl">{s.title}</span>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && <div className="su-arr">→</div>}
                </React.Fragment>
              ))}
            </div>

            {/* Detail panel */}
            {activeStep && (() => {
              const s = PROCESS_STEPS.find(x => x.id === activeStep)!;
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

            {/* Card grid */}
            <div className="su-sgrid">
              {PROCESS_STEPS.map(s => (
                <div key={s.id} className={`su-scard ${activeStep === s.id ? 'on' : ''}`}
                  style={{ ['--c' as any]: s.color }}
                  onClick={() => setStep(activeStep === s.id ? null : s.id)}>
                  <div className="su-scard-bar" style={{ background: s.color }} />
                  <div className="su-scard-top">
                    <span className="su-big-em">{s.emoji}</span>
                    <div>
                      <div className="su-ph">Phase {s.phase}</div>
                      <div className="su-ttl">{s.title}</div>
                      <div className="su-sub">{s.subtitle}</div>
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

        {/* ════ MODULES ════ */}
        {tab === 'modules' && (
          <div className="su-anim">
            <div className="su-sh">SAP Module & Kernfunktionen</div>
            <p className="su-ss">Alle {MODULES.length} Kernmodule — klicken Sie auf den Header, um Details zu erweitern.</p>
            <div className="su-mgrid">
              {MODULES.map(m => (
                <div key={m.id} className="su-mc">
                  <div className="su-mc-hd" onClick={() => setMod(expandedMod === m.id ? null : m.id)}>
                    <div className="su-mc-ico" style={{ background: m.color + '22' }}>
                      <span>{m.icon}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="su-mc-ref">{m.ref}</div>
                      <div className="su-mc-title">{m.title}</div>
                    </div>
                    <span style={{ color: 'rgba(232,228,220,.3)', fontSize: '.8rem' }}>
                      {expandedMod === m.id ? '▲' : '▼'}
                    </span>
                  </div>
                  <div className="su-mc-body">
                    <div className="su-mc-hls">
                      {m.highlights.map((h, i) => <div className="su-hl" key={i}>{h}</div>)}
                    </div>
                    <div className="su-kpis">
                      {m.kpis.map((k, i) => (
                        <div className="su-kpi" key={i}>
                          <div className="su-kpi-v" style={{ color: m.color }}>{k.v}</div>
                          <div className="su-kpi-l">{k.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {expandedMod === m.id && (
                    <div className="su-mc-deep">{m.deep}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ MDR ════ */}
        {tab === 'mdr' && (
          <div className="su-anim">
            <div className="su-sh">🛡️ MDR-Compliance Kette</div>
            <p className="su-ss">EU Medical Device Regulation 2017/745 — in jeden SAP-Prozessschritt integriert.</p>

            <div className="su-mdr-chain">
              {[
                { e: '📦', t: 'Wareneingang',     s: 'UDI-Scan\nCE/DoC-Prüfung\nCharge + MHD' },
                { e: '🛡️', t: 'MDR-Gate',         s: 'CE fehlt?\n→ Auto-Sperre\nKein WE mögl.' },
                { e: '🏪', t: 'Lagerung',          s: 'Haupt-/Sperrlager\nMHD-Monitoring\n60-Tage-Alarm' },
                { e: '📋', t: 'Kommissionierung',  s: 'DoC-Prüfung\nQR-Scan Pflicht\nCharge fest' },
                { e: '🚚', t: 'Versand',           s: 'UDI-Etiketten\nLieferschein+MHD\nEquip. Card' },
                { e: '🔧', t: 'Service',           s: 'Field Safety\nRückruf-Workflow\nBfArM' },
                { e: '🔍', t: 'Rückverfolgung',    s: 'Vorwärts: Empf.\nRückwärts: Lief.\n< 5 Sek.' },
              ].map((item, i, arr) => (
                <React.Fragment key={i}>
                  <div className="su-mdr-step">
                    <span className="su-mdr-em">{item.e}</span>
                    <div className="su-mdr-t">{item.t}</div>
                    <div className="su-mdr-s">{item.s}</div>
                  </div>
                  {i < arr.length - 1 && <div className="su-mdr-arr">→</div>}
                </React.Fragment>
              ))}
            </div>

            {/* Escalation */}
            <div style={{ marginTop: '2rem' }}>
              <div className="su-sh" style={{ fontSize: '1.5rem', marginBottom: '.3rem' }}>🚨 Eskalations-Workflow</div>
              <p className="su-ss">3 Stufen mit verbindlichen SLA-Fristen</p>
              {[
                { s: '1', e: '🔍', t: 'Interne Diagnose', sla: '4 Stunden',  trig: 'Eingang Servicemeldung', c: '#34d399',
                  acts: ['Geräteakte (Equipment Card) geladen', 'Knowledge Base durchsucht', 'Interne Problemlösung angewendet', 'Falls keine Lösung → Eskalation Stufe 2'] },
                { s: '2', e: '📡', t: 'Herstellermeldung', sla: '24 Stunden', trig: 'Keine interne Lösung / sicherheitsrelevant', c: '#fbbf24',
                  acts: ['Auto: Seriennummer + Fehlerprotokoll', 'Fotos/Anhänge am Serviceabruf', 'Status: "Eskaliert – Hersteller info."', 'SLA-Uhr für Herstellerantwort läuft'] },
                { s: '3', e: '🚨', t: 'Field Safety / Rückruf', sla: '2 Stunden (!)', trig: 'Systematischer Defekt / FSN des Herstellers', c: '#f87171',
                  acts: ['Vorwärtssuche: alle Empfänger der Charge', 'Rückwärtssuche: Ursprungslieferant', 'Status "Under Recall" systemweit', 'BfArM-Berichte automatisch generiert'] },
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
                      <div className="su-esc-trigger">Auslöser: {esc.trig}</div>
                    </div>
                  </div>
                  <div className="su-esc-acts">
                    {esc.acts.map((a, i) => (
                      <div className="su-esc-act" key={i}>
                        <span style={{ color: esc.c, flexShrink: 0 }}>›</span>{a}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ ROLES ════ */}
        {tab === 'roles' && (
          <div className="su-anim">
            <div className="su-sh">Rollen & Berechtigungen</div>
            <p className="su-ss">Rollenbasiertes Konzept nach DSGVO & GoBD — Prinzip der minimalen Privilegien.</p>

            <div className="su-rgrid">
              {[
                { i: '👔', t: 'Geschäftsführung', c: '#e2e8f0', m: 'Vollzugriff + 4-Augen-Freigabe', b: 'GF' },
                { i: '💼', t: 'Vertrieb',         c: '#818cf8', m: 'CRM, Angebote, Aufträge',         b: 'VT' },
                { i: '📦', t: 'Lager / Logistik', c: '#34d399', m: 'WE, Kommissionierung, Versand',   b: 'LA' },
                { i: '🔧', t: 'Service-Techniker',c: '#c084fc', m: 'Tickets, RMA, Equipment Card',    b: 'ST' },
                { i: '💶', t: 'Buchhaltung',      c: '#f87171', m: 'Rechnungen, DATEV, Controlling',  b: 'BU' },
                { i: '⚙️', t: 'IT-Administrator', c: '#94a3b8', m: 'System, Rechte, Schnittstellen',  b: 'IT' },
              ].map((r, i) => (
                <div className="su-rc" key={i}>
                  <div className="su-rc-ico" style={{ background: r.c + '22' }}>{r.i}</div>
                  <div className="su-rc-badge" style={{ background: r.c + '22', color: r.c }}>{r.b}</div>
                  <div className="su-rc-name">{r.t}</div>
                  <div className="su-rc-mod">{r.m}</div>
                </div>
              ))}
            </div>

            {/* SoD */}
            <div style={{ marginTop: '2rem' }}>
              <div className="su-sh" style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>⛔ Segregation of Duties</div>
              <p className="su-ss">Kritische Funktionskombinationen — systemseitig gesperrt (Kap. 4.4.3)</p>
              {[
                { a: '📄 Angebot erstellen + ✅ Auftrag freigeben', risk: 'Falschbuchung ohne Kontrolle', ctrl: '4-Augen: GF-Freigabe zwingend' },
                { a: '🚚 Warenausgang buchen + 💶 Rechnung erstellen', risk: 'Fiktive Lieferungen möglich', ctrl: 'Trennung Lager ↔ Finanzen' },
                { a: '🏭 Lieferantenstamm anlegen + 🛍️ Bestellung auslösen', risk: 'Phantomlieferanten-Betrug', ctrl: 'Doppelfreigabe Einkauf + GF' },
                { a: '📤 DATEV-Export + 🔄 Buchungen stornieren', risk: 'Nachträgliche Manipulation', ctrl: 'Nur IT-Admin + Finanzen gemeinsam' },
                { a: '🔓 Zahlungssperre aufheben + 💸 Zahlung auslösen', risk: 'Unberechtigte Zahlungen', ctrl: 'GF-Freigabe zwingend' },
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

        {/* ════ TIMELINE ════ */}
        {tab === 'timeline' && (
          <div className="su-anim">
            <div className="su-sh">Projektzeitplan 2026–2027</div>
            <p className="su-ss">8 Monate bis Go-Live EMIG Deutschland · Q1/2027 MiaMed Ukraine</p>

            {/* Progress */}
            <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,.07)', borderRadius: 13, padding: '1.2rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.4rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: '.6rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '.2em', fontWeight: 600, marginBottom: 7 }}>Projektfortschritt (März 2026)</div>
                <div style={{ height: 4, background: 'rgba(255,255,255,.06)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: '25%', height: '100%', background: 'linear-gradient(90deg,#fbbf24,#fcd34d)', borderRadius: 99 }} />
                </div>
                <div style={{ fontSize: '.68rem', color: 'rgba(232,228,220,.3)', marginTop: 5 }}>Phase 2 von 8 abgeschlossen</div>
              </div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.4rem', color: '#fcd34d', letterSpacing: '.04em', lineHeight: 1 }}>25%</div>
            </div>

            <div className="su-tl">
              {TIMELINE.map((item, i) => (
                <div className="su-tl-item" key={i}>
                  <div className={`su-tl-dot ${item.done ? 'd' : 't'}`} />
                  <div className="su-tl-ph">{item.phase}</div>
                  <div className="su-tl-name">
                    <span>{item.emoji}</span>
                    {item.title}
                    <span className={`su-tl-badge ${item.done ? 'd' : 't'}`}>
                      {item.done ? 'Abgeschlossen' : 'Geplant'}
                    </span>
                  </div>
                  <div className="su-tl-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ UAT ════ */}
        {tab === 'uat' && (
          <div className="su-anim">
            <div className="su-sh">UAT Test-Tracker</div>
            <p className="su-ss">Interaktiver Abnahme-Tracker — ✓ Bestanden · ✗ Fehler · ⏳ Offen klicken, um Status zu setzen.</p>

            {/* Stats */}
            <div className="su-uat-stats">
              <div className="su-uat-stat">
                <div className="su-uat-n" style={{ color: '#6ee7b7' }}>{pass}</div>
                <div className="su-uat-l">Bestanden</div>
              </div>
              <div className="su-uat-stat">
                <div className="su-uat-n" style={{ color: '#fca5a5' }}>{fail}</div>
                <div className="su-uat-l">Fehler</div>
              </div>
              <div className="su-uat-stat">
                <div className="su-uat-n" style={{ color: '#fcd34d' }}>{open_}</div>
                <div className="su-uat-l">Offen</div>
              </div>
              <div className="su-uat-pbar-wrap">
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '.6rem', color: 'rgba(232,228,220,.3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 7 }}>Gesamtfortschritt</div>
                  <div className="su-uat-pbar-bg">
                    <div className="su-uat-pbar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: '#34d399', lineHeight: 1, letterSpacing: '.03em', minWidth: 52, textAlign: 'right' }}>{pct}%</div>
              </div>
            </div>

            {/* Filters */}
            <div className="su-filters">
              {['all', 'open', 'pass', 'fail', 'Vertrieb', 'Einkauf', 'Lager', 'Finanzen', 'Service', 'Intercompany'].map(f => (
                <button key={f} className={`su-fb ${uatFilter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'Alle' : f === 'open' ? '⏳ Offen' : f === 'pass' ? '✓ Bestanden' : f === 'fail' ? '✗ Fehler' : f}
                </button>
              ))}
            </div>

            <div className="su-table-wrap">
              <table className="su-table">
                <thead>
                  <tr>
                    <th>Test-ID</th>
                    <th>Modul</th>
                    <th>Testfall</th>
                    <th>Prio</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(test => {
                    const s = statuses[test.id];
                    return (
                      <tr key={test.id}>
                        <td><span className="su-tid">{test.id}</span></td>
                        <td>
                          <span className="su-mod-badge"
                            style={{ background: MODULE_BG[test.module] || '#ffffff10', color: MODULE_COLORS[test.module] || '#fff' }}>
                            {test.module}
                          </span>
                        </td>
                        <td><span className="su-ttitle">{test.title}</span></td>
                        <td><span className={`su-mod-badge ${test.prio === 'P1' ? 'su-p1' : 'su-p2'}`}>{test.prio}</span></td>
                        <td>
                          <div className="su-sbwrap">
                            <button className={`su-sb ${s === 'pass' ? 'pass' : ''}`} onClick={() => setStatus(test.id, 'pass')} title="Bestanden">✓</button>
                            <button className={`su-sb ${s === 'fail' ? 'fail' : ''}`} onClick={() => setStatus(test.id, 'fail')} title="Fehler">✗</button>
                            <button className={`su-sb ${s === 'open' ? 'pend' : ''}`} onClick={() => setStatus(test.id, 'open')} title="Offen">⏳</button>
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