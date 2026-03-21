import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALL_QM = ['SOP-LOG-01','SOP-LOG-02','SOP-LOG-03','SOP-LOG-04','SOP-EINK-01','SOP-EINK-02','SOP-REG-01','SOP-REG-02','SOP-REG-03','SOP-REG-05'];

// ─── MEDIZINPRODUKTE DATA ────────────────────────────────────────────────────

const MFRS = [
  {
    id: 'riwo',
    name: 'RIWOspine',
    logo: '/img/logo-riwospine.png',
    tagline: 'Endoskopische Wirbelsäulenchirurgie',
    origin: 'Deutschland · Richard Wolf Company',
    accent: '#c0392b',
    bg: 'linear-gradient(160deg,#0f0404 0%,#1e0606 35%,#2a0808 60%,#1e0606 100%)',
    description: 'RIWOspine ist ein führender Spezialist für vollendoskopische Wirbelsäulenchirurgie. Als Teil der Richard Wolf Unternehmensgruppe entwickelt RIWOspine hochpräzise Endoskopiesysteme für minimalinvasive Eingriffe an Hals-, Brust- und Lendenwirbelsäule.',
    focus: ['Vollendoskopische Chirurgie','Minimalinvasive Eingriffe','Spine-Endoskopie','Neurochirurgie'],
    facts: [
      { label: 'Gegründet', value: '1906' },
      { label: 'Hauptsitz', value: 'Knittlingen, DE' },
      { label: 'Mitarbeiter', value: '2.000+' },
      { label: 'Länder', value: '100+' },
    ],
    products: [
      { title: 'Vertebris Stenose',         code: 'RIWO-01', link: '/docs/medizinprodukte/riwospine/stenose',     desc: 'Vollendoskopische Dekompression bei lumbaler und zervikaler Spinalstenose. Minimalinvasive Technik für kürzere Rehabilitation.' },
      { title: 'Vertebris Lumbar',          code: 'RIWO-02', link: '/docs/medizinprodukte/riwospine/lumbar',      desc: 'Endoskopisches System für Bandscheibenchirurgie der Lendenwirbelsäule. Transforaminaler und interaktiver Zugang.' },
      { title: 'Vertebris Cervical',        code: 'RIWO-03', link: '/docs/medizinprodukte/riwospine/cervical',    desc: 'Vollendoskopische Chirurgie der Halswirbelsäule. Anteriorer und posteriorer Zugang für zervikale Pathologien.' },
      { title: 'Instrumentarium & Optiken', code: 'RIWO-04', link: '/docs/medizinprodukte/riwospine/instrumente', desc: 'Hochpräzisions-Endoskope, Optiken und Instrumente für alle Vertebris-Systeme. Optimale Visualisierung und Ergonomie.' },
    ],
  },
  {
    id: 'inomed',
    name: 'inomed',
    logo: '/img/logo-inomed.png',
    tagline: 'Intraoperatives Neuromonitoring',
    origin: 'Deutschland · Emmendingen',
    accent: '#1565c0',
    bg: 'linear-gradient(160deg,#020610 0%,#040c1e 35%,#071428 60%,#040c1e 100%)',
    description: 'inomed Medizintechnik ist Weltmarktführer im Bereich intraoperatives Neuromonitoring (IOM). Die Systeme schützen das Nervensystem während neurochirurgischer, orthopädischer und gefäßchirurgischer Eingriffe.',
    focus: ['Intraoperatives Neuromonitoring','Neurophysiologie','Hirnstimulation','Schlafdiagnostik'],
    facts: [
      { label: 'Gegründet', value: '1989' },
      { label: 'Hauptsitz', value: 'Emmendingen, DE' },
      { label: 'Zertifizierung', value: 'ISO 13485' },
      { label: 'Anwendung', value: 'Weltweit' },
    ],
    products: [],
  },
  {
    id: 'oncosem',
    name: 'oncosem',
    logo: '/img/logo-oncosem.png',
    tagline: 'Onkologische Diagnostik & Therapie',
    origin: 'Deutschland · Hechingen',
    accent: '#00695c',
    bg: 'linear-gradient(160deg,#010e0b 0%,#021810 35%,#032214 60%,#021810 100%)',
    description: 'oncosem Onkologische Systeme entwickelt und vertreibt innovative Lösungen für onkologische Diagnostik und Therapie. Spezialisiert auf Sentinellymphknoten-Biopsie und nuklearmedizinische Verfahren.',
    focus: ['Sentinellymphknoten-Biopsie','Nuklearmedizin','Onkologie','Gammaproben'],
    facts: [
      { label: 'Spezialisierung', value: 'Onkologie' },
      { label: 'Hauptsitz', value: 'Hechingen, DE' },
      { label: 'Zertifizierung', value: 'MDR 2017/745' },
      { label: 'Kernprodukt', value: 'Gammasonden' },
    ],
    products: [],
  },
  {
    id: 'bfmg',
    name: 'Black Forest Medical',
    logo: '/img/logo-bfmg.png',
    tagline: 'Transplantationsmedizin & Gefäßchirurgie',
    origin: 'Deutschland · Freiburg im Breisgau',
    accent: '#4a148c',
    bg: 'linear-gradient(160deg,#080210 0%,#0e0519 35%,#150822 60%,#0e0519 100%)',
    description: 'Black Forest Medical Group spezialisiert sich auf hochwertige Implantate und Instrumente für die Transplantationsmedizin, Gefäßchirurgie und rekonstruktive Chirurgie. Präzisionsfertigung aus dem Schwarzwald.',
    focus: ['Transplantationsmedizin','Gefäßchirurgie','Implantate','Rekonstruktive Chirurgie'],
    facts: [
      { label: 'Region', value: 'Schwarzwald, DE' },
      { label: 'Fokus', value: 'Transplantation' },
      { label: 'Qualität', value: 'Made in Germany' },
      { label: 'Zertifizierung', value: 'ISO 13485' },
    ],
    products: [],
  },
  {
    id: 'meyer',
    name: 'Meyer-Haake',
    logo: '/img/logo-meyer.png',
    tagline: 'Wirbelsäulen-Implantate & Fixationssysteme',
    origin: 'Deutschland · Wehrheim',
    accent: '#e65100',
    bg: 'linear-gradient(160deg,#0e0400 0%,#1c0900 35%,#271200 60%,#1c0900 100%)',
    description: 'Meyer-Haake Medical Innovations entwickelt und fertigt innovative Wirbelsäulen-Implantate und Fixationssysteme. Spezialisiert auf Pedikelschraubensysteme, Cages und dynamische Stabilisierung.',
    focus: ['Pedikelschraubensysteme','Interkorporale Cages','Dynamische Stabilisierung','Minimalinvasive Implantologie'],
    facts: [
      { label: 'Gegründet', value: '1990' },
      { label: 'Hauptsitz', value: 'Wehrheim, DE' },
      { label: 'Fokus', value: 'Spine Implantate' },
      { label: 'Zertifizierung', value: 'ISO 13485' },
    ],
    products: [],
  },
  {
    id: 'brainlab',
    name: 'Brainlab',
    logo: '/img/logo-brainlab.png',
    tagline: 'Digitale Chirurgie & Strahlentherapie',
    origin: 'Deutschland · München',
    accent: '#880e4f',
    bg: 'linear-gradient(160deg,#0b0106 0%,#180410 35%,#220618 60%,#180410 100%)',
    description: 'Brainlab ist ein globaler Technologieführer für softwaregestützte medizinische Technologie. Ihre Lösungen für Neurochirurgie, Orthopädie und Strahlentherapie werden in über 6.000 Krankenhäusern weltweit eingesetzt.',
    focus: ['Navigationsgestützte Chirurgie','Strahlentherapie','Neurochirurgie','Digitale OR-Integration'],
    facts: [
      { label: 'Gegründet', value: '1989' },
      { label: 'Hauptsitz', value: 'München, DE' },
      { label: 'Installationen', value: '6.000+ Kliniken' },
      { label: 'Länder', value: '121' },
    ],
    products: [],
  },
];

const SAP_PROC = [
  { id:'pre',       ph:'0', em:'🌐', title:'Kundenanfrage',            sub:'Webshop / Direktkontakt',        col:'#818cf8', details:[{i:'🛒',t:'Digitaler Katalog — Webshop-API RESTful'},{i:'🔍',t:'Dublettenprüfung: TEU = Tübingen'},{i:'📋',t:'CRM Lead-Anlage automatisch'},{i:'📞',t:'Zuweisung an Fachberater'}] },
  { id:'offer',     ph:'1', em:'📊', title:'Angebot & Kalkulation',    sub:'Quote-to-Order',                 col:'#a78bfa', details:[{i:'💰',t:'Key-Account Preislisten automatisch'},{i:'📦',t:'BOM-Sets: Set-Preis + Einzelkomponenten'},{i:'📈',t:'Echtzeit-Margenanzeige pro Position'},{i:'📄',t:'Proforma-Rechnung für 50% Anzahlung'}] },
  { id:'order',     ph:'2', em:'✅', title:'Kundenauftrag',            sub:'Freigabe & Sperrmanagement',     col:'#38bdf8', details:[{i:'🔒',t:'Auftrag gesperrt bis Anzahlung eingeht'},{i:'📦',t:'Automatische BOM-Bestandsreservierung'},{i:'🏦',t:'Klinik-Saldo-Tracking Echtzeit'},{i:'🚦',t:'Freigabe nur durch GF oder Finanzen'}] },
  { id:'purchase',  ph:'3', em:'🛍️', title:'Einkauf & Bestellung',    sub:'Purchase-to-Pay',                col:'#fbbf24', details:[{i:'🤖',t:'MRP-Lauf: automatische Bestellvorschläge'},{i:'📋',t:'Bestellung → Proforma → 50% → Confirm'},{i:'⏱️',t:'Backorder-Liste mit Ready Dates'},{i:'🏅',t:'Preferred Supplier automatisch bevorzugt'}] },
  { id:'receiving', ph:'4', em:'📬', title:'Wareneingang',             sub:'MDR-Gate & UDI-Scan',            col:'#34d399', details:[{i:'📱',t:'QR/UDI-Scan: Charge + MHD automatisch'},{i:'🛡️',t:'MDR-Gate: CE + DoC fehlt → Sperre'},{i:'🔢',t:'Palette → Karton → Stück Umrechnung'},{i:'🏪',t:'Automatische Lagerplatzzuweisung'}] },
  { id:'warehouse', ph:'5', em:'🏭', title:'Lager & Kommissionierung', sub:'Chargenrückverfolgung',          col:'#2dd4bf', details:[{i:'🔎',t:'Bidirektionale Chargensuche unter 5 Sek'},{i:'🚫',t:'Sperrlager: Gebrauchtware nie verfügbar'},{i:'📲',t:'Pickliste QR-Scan → Charge automatisch'},{i:'⚠️',t:'MHD-Monitoring: proaktive Warnlisten'}] },
  { id:'shipping',  ph:'6', em:'🚚', title:'Versand & Lieferung',      sub:'MDR-konformer Versand',          col:'#fb923c', details:[{i:'📋',t:'Lieferschein + Packliste mit Charge+MHD'},{i:'🏷️',t:'UDI-Barcode-Etiketten MDR-konform'},{i:'🗂️',t:'Equipment Card automatisch eröffnet'},{i:'💳',t:'Abschlussrechnung nach Warenausgang'}] },
  { id:'finance',   ph:'7', em:'💶', title:'Finanzen & DATEV',         sub:'GoBD-konforme Buchhaltung',      col:'#f87171', details:[{i:'📤',t:'DATEV-Export: CSV/ASCII Buchungsstapel'},{i:'🔏',t:'Belege nach Export gesperrt — GoBD'},{i:'🌍',t:'USt: Inland / EU steuerfrei / Drittland'},{i:'📊',t:'Steuerlast + Dividenden in Echtzeit'}] },
  { id:'service',   ph:'8', em:'🔧', title:'Service & RMA',            sub:'After-Sales 3-Stufen-Workflow',  col:'#c084fc', details:[{i:'🎫',t:'Stufe 1 (4h): Ticket via Seriennummer'},{i:'🏠',t:'Szenario A: Vor-Ort Techniker-Cockpit'},{i:'📦',t:'Szenario B: RMA Reparaturlager getrennt'},{i:'📡',t:'Stufe 3 (2h): Rückruf + BfArM auto'}] },
  { id:'retention', ph:'9', em:'🔄', title:'Retention & Wartung',      sub:'Proaktive Kundenbindung',        col:'#f472b6', details:[{i:'⏰',t:'STK-Automatisierung: Klinik-Alarm'},{i:'🖥️',t:'Check-in Portal: Termin + Formulare'},{i:'🔁',t:'Wiederkauf: Verbrauchsanalyse → Folge'},{i:'🏆',t:'SLA-Monitoring: 4h Reaktionszeit'}] },
];

const SAP_MODS = [
  { id:'vt', em:'📊', title:'Vertrieb & Preisfindung',  col:'#818cf8', ref:'Kap. 3.1',
    hl:['Individuelle Preislisten pro Key-Account','BOM-Sets: Stücklisten-Verkauf','Webshop-Import Quote-to-Order','Anzahlungslogik mit Auftragssperre'],
    kpis:[{v:'≤15min',l:'Webshop-Sync'},{v:'50%',l:'Anzahlung'},{v:'Auto',l:'Preisfindung'}],
    deep:'Vollautomatische Preisfindung für jeden Key-Account. Das BOM-System verkauft komplexe Operations-Sets — Kunde sieht Set-Preis, SAP reserviert alle Einzelkomponenten im Hintergrund.\n\nOhne 50%-Vorauszahlungseingang bleibt der Auftrag systemseitig gesperrt.' },
  { id:'lg', em:'🏭', title:'Lager & MDR-Compliance',   col:'#34d399', ref:'Kap. 3.2',
    hl:['UDI/QR-Scan beim Wareneingang','Bidirektionale Chargensuche unter 5 Sekunden','Sperrlager virtuell getrennt von Neuware','CE/DoC MDR-Gate vor jedem Versand'],
    kpis:[{v:'<5 Sek',l:'Chargensuche'},{v:'~3.000',l:'Artikel'},{v:'100%',l:'MDR-Gate'}],
    deep:'Herzstück der MDR-Compliance: UDI-Barcode beim Wareneingang, automatische CE + DoC-Prüfung.\n\nBidirektionale Chargenrückverfolgung: Alle Empfänger (vorwärts) + Ursprungslieferant (rückwärts) in unter 5 Sekunden.\n\nVirtuelle Lagerorte trennen Neuware, Sperrlager und RMA-Reparaturlager.' },
  { id:'ek', em:'🛍️', title:'Einkauf & Disposition',    col:'#fbbf24', ref:'Kap. 3.3',
    hl:['MRP-Bestellvorschläge vollautomatisch','Zertifikats-Ablaufüberwachung 60 Tage','Preferred Supplier System','Backorder-Liste mit Ready Dates'],
    kpis:[{v:'60 Tage',l:'Zert.-Warn.'},{v:'EUR',l:'Währung'},{v:'Auto',l:'MRP-Lauf'}],
    deep:'MRP-Lauf generiert vollautomatisch Bestellvorschläge basierend auf Mindestbeständen und BOM-Komponenten.\n\nZertifikats-Ablaufüberwachung: 60 Tage vor Ablauf automatische Benachrichtigung. Abgelaufene Artikel für den Wareneingang gesperrt.' },
  { id:'sv', em:'🔧', title:'Service & RMA',            col:'#c084fc', ref:'Kap. 3.4',
    hl:['3-Stufen Eskalations-Workflow','Equipment Card (Geräteakte)','SLA 4h Reaktionszeit garantiert','MDR-Rückruf BfArM-Workflow'],
    kpis:[{v:'4 Std',l:'SLA Stufe 1'},{v:'24 Std',l:'SLA Stufe 2'},{v:'2 Std',l:'SLA Stufe 3'}],
    deep:'Stufe 1 (4h): Interne Diagnose via Equipment Card + Knowledge Base\nStufe 2 (24h): Formelle Herstellermeldung mit Fehlerprotokoll\nStufe 3 (2h): MDR-Rückruf — alle betroffenen Geräte + BfArM\n\nSzenario A: Vor-Ort Techniker-Cockpit mit Fahrzeuglager\nSzenario B: RMA in physisch getrenntes Reparaturlager' },
  { id:'fi', em:'💶', title:'Finanzen & DATEV',         col:'#f87171', ref:'Kap. 3.5',
    hl:['GoBD-konforme Buchführung','DATEV CSV/ASCII Export','Automatisches Zahlungssperrmanagement','Steuerlast & Dividenden-Reports'],
    kpis:[{v:'GoBD',l:'Standard'},{v:'DATEV',l:'Export'},{v:'HGB',l:'Bilanz'}],
    deep:'Zahlungssperrmanagement: Bei Über- oder Unterzahlungen werden Lieferungen automatisch blockiert — Freigabe nur durch Geschäftsführung.\n\nDATEV-Export: GoBD-konforme Buchungsstapel. Nach Export systemseitig gesperrt — Manipulation ausgeschlossen.' },
  { id:'ic', em:'🌍', title:'Intercompany & MiaMed',    col:'#2dd4bf', ref:'Kap. 3.8',
    hl:['Automatische Beleg-Synchronisation','Seriennummern-Übertragung elektronisch','Multi-Währung UAH/EUR/USD','Gruppen-Konsolidierung auf Knopfdruck'],
    kpis:[{v:'~700/J',l:'MiaMed'},{v:'3',l:'Währungen'},{v:'2',l:'Mandanten'}],
    deep:'Multi-Mandanten: EMIG GmbH (DE, EUR, HGB) + MiaMed (Ukraine, UAH, EUR/USD).\n\nBestellung in MiaMed → automatisch Kundenauftrag bei EMIG. Warenausgang EMIG → Seriennummern elektronisch übertragen.\n\nGruppen-Konsolidierung: Bilanz + GuV ohne IC-Positionen in Sekundenschnelle.' },
];

const SAP_UAT = [
  { id:'V-01',mod:'Vertrieb',     title:'Webshop-Anfrage importieren',           p:'P1' },
  { id:'V-02',mod:'Vertrieb',     title:'Angebot mit BOM erstellen',             p:'P1' },
  { id:'V-03',mod:'Vertrieb',     title:'Angebot zu Auftrag (1 Klick)',          p:'P1' },
  { id:'V-04',mod:'Vertrieb',     title:'Sperrmanagement fehlende Zahlung',      p:'P1' },
  { id:'B-01',mod:'Einkauf',      title:'MRP-Bestellvorschlag',                  p:'P1' },
  { id:'B-02',mod:'Einkauf',      title:'Bestellung mit 50% Anzahlung',          p:'P1' },
  { id:'B-03',mod:'Lager',        title:'Wareneingang mit UDI-Scan',             p:'P1' },
  { id:'B-06',mod:'Einkauf',      title:'Zertifikats-Ablaufwarnung',             p:'P2' },
  { id:'L-01',mod:'Lager',        title:'MDR-Gate vor Kommissionierung',         p:'P1' },
  { id:'L-02',mod:'Lager',        title:'MDR-Gate blockiert (kein DoC)',         p:'P1' },
  { id:'L-04',mod:'Lager',        title:'Chargen-Rückverfolgung bidirektional',  p:'P1' },
  { id:'L-05',mod:'Lager',        title:'Sperrlager-Einlagerung',                p:'P1' },
  { id:'F-01',mod:'Finanzen',     title:'Ausgangsrechnung erstellen',            p:'P1' },
  { id:'F-02',mod:'Finanzen',     title:'DATEV-Export',                          p:'P1' },
  { id:'F-04',mod:'Finanzen',     title:'Zahlungssperrmanagement',               p:'P1' },
  { id:'S-01',mod:'Service',      title:'Service-Ticket via Seriennummer',       p:'P1' },
  { id:'S-04',mod:'Service',      title:'RMA-Rücksendung (Szenario B)',          p:'P1' },
  { id:'S-05',mod:'Service',      title:'Hersteller-Meldung (Stufe 2)',          p:'P1' },
  { id:'S-07',mod:'Service',      title:'Stufe-3-Rückruf auslösen',             p:'P1' },
  { id:'IC-01',mod:'Intercompany',title:'Beleg-Synchronisation',                 p:'P1' },
  { id:'IC-02',mod:'Intercompany',title:'Seriennummern-Übertragung',             p:'P1' },
];

const SAP_TL = [
  { ph:'Feb 2026',     em:'✅', title:'Shortlist',         desc:'Top 2–3 Anbieter ausgewählt',           done:true  },
  { ph:'März 2026',    em:'✅', title:'Vertragsabschluss', desc:'Live-Demos + Festpreisangebote',         done:true  },
  { ph:'April 2026',   em:'🚀', title:'Kick-off',          desc:'Blueprint-Workshop + Stammdaten',        done:false },
  { ph:'Mai–Jul 2026', em:'⚙️', title:'Customizing',       desc:'SAP-Konfiguration + Webshop-API',        done:false },
  { ph:'Aug–Sep 2026', em:'📦', title:'Datenmigration',    desc:'Vollständige Migration + UAT-Start',     done:false },
  { ph:'Okt 2026',     em:'🧪', title:'UAT',               desc:'User Acceptance Testing',                done:false },
  { ph:'Nov 2026',     em:'🏁', title:'Go-Live EMIG DE',   desc:'Go-Live + Hypercare 4 Wochen',           done:false },
  { ph:'Q1 2027',      em:'🌍', title:'Go-Live MiaMed UA', desc:'Ukraine-Mandant + Intercompany aktiv',   done:false },
];

// ─── CSS ────────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');

/* ── DESIGN TOKENS ── */
:root{
  --gold:#c8983a;--gold-lt:#e0aa4a;--gold-dim:#c8983a80;
  --cream:#f5f3ee;
  --card:#ffffff;
  --card-border:rgba(0,0,0,.07);
  --text:#18181f;
  --text-dim:#6b7280;
  --text-faint:#9ca3af;
  --bg:#f5f3ee;
  --bg2:#eeebe4;
  --section-bg:#f0ede6;
  --section-border:#e5e0d8;
  --prog-bg:#1a1714;
  --prog-border:rgba(200,160,80,.18);
  --r:14px;
  /* SAP specific */
  --sap-bg:#edeae2;
  --sap-card:#e6e2d8;
  --sap-card2:#dedad0;
  --sap-border:rgba(0,0,0,.09);
  --sap-text:#1a1814;
  --sap-text-dim:#5a5548;
  --sap-text-faint:#8a8070;
  --sap-hd-bg:linear-gradient(160deg,#e8e4dc 0%,#dedad0 50%,#e8e4dc 100%);
  --sap-nav-bg:#dedad0;
  --sap-nav-border:rgba(0,0,0,.08);
  --sap-input:#e0dcd2;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --cream:#0f0e0c;
  --card:#1c1a16;
  --card-border:rgba(255,255,255,.07);
  --text:#e8e4dc;
  --text-dim:#a09880;
  --text-faint:#6b6358;
  --bg:#0f0e0c;
  --bg2:#191714;
  --section-bg:#131109;
  --section-border:rgba(255,255,255,.06);
  --prog-bg:#1a1714;
  --prog-border:rgba(200,160,80,.15);
  /* SAP in dark */
  --sap-bg:#111009;
  --sap-card:#1c1a14;
  --sap-card2:#23201a;
  --sap-border:rgba(255,255,255,.07);
  --sap-text:#e8e4dc;
  --sap-text-dim:#a09880;
  --sap-text-faint:#6b6358;
  --sap-hd-bg:linear-gradient(160deg,#0d0c09 0%,#131109 50%,#0d0c09 100%);
  --sap-nav-bg:#0d0c09;
  --sap-nav-border:rgba(255,255,255,.06);
  --sap-input:#191714;
}

*,*::before,*::after{box-sizing:border-box;}
body{background:var(--bg);}
.ea{font-family:'Outfit',sans-serif;color:var(--text);}

/* ── HERO ── */
.ea-hero{
  position:relative;width:100vw;margin-left:calc(-50vw + 50%);
  min-height:100vh;display:flex;flex-direction:column;
  justify-content:flex-end;overflow:hidden;background:#0a0a0c;
}
.ea-hero-media{position:absolute;inset:0;z-index:0;}
.ea-hero-video{width:100%;height:100%;object-fit:cover;display:block;}
.ea-vignette{position:absolute;inset:0;z-index:1;
  background:linear-gradient(to top,rgba(6,6,8,.94) 0%,rgba(6,6,8,.6) 30%,rgba(6,6,8,.22) 60%,transparent 100%),
             linear-gradient(100deg,rgba(6,6,8,.5) 0%,transparent 55%);}
.ea-grain{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.028;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px;}
.ea-frame-t,.ea-frame-b{position:absolute;left:0;right:0;height:1px;z-index:3;
  background:linear-gradient(90deg,transparent,rgba(200,169,110,.3),transparent);}
.ea-frame-t{top:0;}.ea-frame-b{bottom:0;}
.ea-hero-inner{position:relative;z-index:4;padding:0 5% 8vh;width:100%;max-width:1600px;margin:0 auto;}
.ea-eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:1.4rem;}
.ea-eyebrow::before{content:'';display:block;width:36px;height:1px;background:#c8a96e;opacity:.7;}
.ea-eyebrow span{font-size:.67rem;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:#c8a96e;}
.ea-h1{margin:0;line-height:1;}
.ea-h1-top{display:block;font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,3.5vw,3.2rem);color:rgba(255,255,255,.48);letter-spacing:.22em;}
.ea-h1-main{display:block;font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,11vw,9.5rem);letter-spacing:.05em;line-height:.85;
  background:linear-gradient(135deg,#fff 40%,#e8d5a8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.ea-tagline{font-size:clamp(.82rem,1.2vw,.95rem);color:rgba(238,234,224,.38);font-weight:300;letter-spacing:.14em;text-transform:uppercase;margin:1.2rem 0 0;}
.ea-stats{display:flex;align-items:stretch;gap:0;margin-top:2.5rem;flex-wrap:wrap;}
.ea-stat{padding-right:2rem;margin-right:2rem;border-right:1px solid rgba(200,169,110,.16);}
.ea-stat:last-child{border-right:none;padding-right:0;margin-right:0;}
.ea-stat-n{font-family:'Bebas Neue',sans-serif;font-size:2.6rem;color:#fff;line-height:1;display:block;letter-spacing:.04em;}
.ea-stat-l{font-size:.6rem;color:rgba(238,234,224,.3);text-transform:uppercase;letter-spacing:.18em;font-weight:500;display:block;margin-top:3px;}
.ea-vidctl{position:absolute;bottom:2rem;right:3%;z-index:5;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.4);
  width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .2s;backdrop-filter:blur(14px);font-size:.7rem;}
.ea-vidctl:hover{background:rgba(200,169,110,.15);color:#e8d5a8;border-color:#c8a96e;}

/* ── MAIN WRAPPER ── */
.ea-main{background:var(--bg);padding:2.5rem 0 5rem;}
.ea-wrap{width:100%;max-width:1600px;margin:0 auto;padding:0 4%;}

/* ── WELCOME BAR ── */
.ea-welcome{
  background:var(--card);border:1px solid var(--card-border);
  border-radius:var(--r);padding:1.2rem 1.75rem;
  display:flex;align-items:center;justify-content:space-between;
  gap:1rem;margin-bottom:1.75rem;flex-wrap:wrap;
  box-shadow:0 1px 4px rgba(0,0,0,.05);
}
.ea-welcome-name{font-size:1.05rem;font-weight:600;color:var(--text);}
.ea-welcome-sub{font-size:.77rem;color:var(--text-dim);margin-top:2px;}
.ea-welcome-pill{background:rgba(200,152,58,.12);border:1px solid rgba(200,152,58,.3);color:var(--gold);
  font-size:.77rem;font-weight:600;padding:6px 15px;border-radius:99px;white-space:nowrap;}

/* ── MAIN TABS (QM / SAP / MED) ── */
.ea-tabs{display:flex;background:var(--card);border-radius:var(--r);padding:4px;
  box-shadow:0 1px 5px rgba(0,0,0,.07),0 0 0 1px var(--card-border);
  margin-bottom:2.5rem;overflow-x:auto;gap:0;}
.ea-tabs::-webkit-scrollbar{display:none;}
.ea-tab{flex:1 1 120px;padding:13px 20px;border-radius:10px;border:none;background:transparent;
  font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:500;color:var(--text-dim);
  cursor:pointer;transition:all .2s;text-align:center;white-space:nowrap;}
.ea-tab.active{background:var(--text);color:var(--bg);font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.18);}
.ea-tab:hover:not(.active){background:var(--bg2);color:var(--text);}

/* ── SECTION HEADER ── */
.ea-sh{font-size:.82rem;font-weight:700;color:var(--text);display:flex;align-items:center;gap:12px;
  margin:2.5rem 0 1.2rem;text-transform:uppercase;letter-spacing:.1em;}
.ea-sh-bar{width:18px;height:2px;border-radius:99px;flex-shrink:0;}
.ea-sh-rule{flex:1;height:1px;background:linear-gradient(90deg,var(--section-border),transparent);}

/* ── PROGRESS ── */
.ea-prog{background:var(--prog-bg);border-radius:16px;padding:1.75rem 2rem;display:flex;align-items:center;
  gap:2rem;margin-bottom:1.75rem;border:1px solid var(--prog-border);flex-wrap:wrap;}
.ea-prog-info{flex:1;min-width:160px;}
.ea-prog-lbl{font-size:.6rem;color:var(--gold);text-transform:uppercase;letter-spacing:.22em;font-weight:600;margin-bottom:.8rem;}
.ea-prog-track{height:4px;background:rgba(255,255,255,.07);border-radius:99px;overflow:hidden;}
.ea-prog-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold-lt));border-radius:99px;transition:width 1.5s cubic-bezier(.4,0,.2,1);}
.ea-prog-sub{font-size:.7rem;color:rgba(255,255,255,.22);margin-top:7px;}
.ea-prog-pct{font-family:'Bebas Neue',sans-serif;font-size:3rem;color:var(--gold-lt);line-height:1;min-width:84px;text-align:right;letter-spacing:.04em;}

/* ── PHILOSOPHY ── */
.ea-philo{background:var(--card);border:1px solid var(--card-border);border-radius:16px;
  padding:1.75rem 2.25rem;margin-bottom:1.75rem;position:relative;overflow:hidden;
  box-shadow:0 1px 4px rgba(0,0,0,.05);}
.ea-philo::before{content:'QM';position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);
  font-family:'Bebas Neue',sans-serif;font-size:6rem;color:rgba(200,152,58,.06);line-height:1;pointer-events:none;}
.ea-philo-t{font-size:1.08rem;font-weight:600;color:var(--text);margin:0 0 5px;}
.ea-philo-b{color:var(--text-dim);font-size:.85rem;margin:0 0 1rem;}
.ea-philo-lnk{color:var(--gold);font-size:.82rem;font-weight:600;text-decoration:none;letter-spacing:.04em;transition:color .2s;}
.ea-philo-lnk:hover{color:var(--gold-lt);}

/* ── FINAL TEST ── */
.ea-test{border-radius:16px;padding:1.4rem 1.75rem;margin-bottom:1.75rem;display:flex;
  align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;border:1.5px solid;transition:all .3s;}
.ea-test-btn{padding:11px 24px;border-radius:10px;border:none;font-family:'Outfit',sans-serif;
  font-weight:600;font-size:.86rem;cursor:pointer;transition:all .2s;white-space:nowrap;}

/* ── MODULE CARD GRID ── */
.ea-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:.5rem;}
.ea-card{background:var(--card);border-radius:var(--r);padding:1.35rem;display:flex;flex-direction:column;
  position:relative;overflow:hidden;transition:all .22s;
  box-shadow:0 1px 3px rgba(0,0,0,.06),0 0 0 1px var(--card-border);}
.ea-card:hover{transform:translateY(-3px);box-shadow:0 10px 26px rgba(0,0,0,.09);}
.ea-card-stripe{position:absolute;top:0;left:0;right:0;height:2px;}
.ea-card-t{font-weight:600;font-size:.9rem;color:var(--text);margin:0 0 5px;line-height:1.3;}
.ea-card-code{font-family:'DM Mono',monospace;font-size:.64rem;color:var(--text-faint);
  background:var(--bg2);border:1px solid var(--section-border);
  padding:2px 7px;border-radius:4px;display:inline-block;margin-bottom:.85rem;}
.ea-card-bar{height:2px;background:var(--section-border);border-radius:99px;margin-bottom:.85rem;overflow:hidden;}
.ea-card-bar-f{height:100%;border-radius:99px;transition:width .8s ease;}
.ea-card-btn{display:block;text-align:center;padding:10px;border-radius:10px;font-weight:600;
  font-size:.82rem;text-decoration:none;font-family:'Outfit',sans-serif;transition:all .2s;margin-top:auto;}
.ea-card-btn:hover{filter:brightness(1.07);transform:translateY(-1px);}

/* ── MANUFACTURER ── */
/* ── MANUFACTURER LIST — full-width cards ── */
.med-list{display:flex;flex-direction:column;gap:0;}

/* Each manufacturer = full-width banner card */
.med-banner{
  position:relative;width:100%;overflow:hidden;cursor:pointer;
  border-radius:20px;margin-bottom:14px;
  min-height:200px;display:flex;align-items:center;
  transition:transform .35s cubic-bezier(.2,.8,.3,1), box-shadow .35s ease;
  box-shadow:0 2px 12px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.08);
}
.med-banner:hover{
  transform:translateY(-5px);
  box-shadow:0 20px 56px rgba(0,0,0,.18), 0 6px 16px rgba(0,0,0,.1);
}
[data-theme="dark"] .med-banner{box-shadow:0 4px 20px rgba(0,0,0,.5);}
[data-theme="dark"] .med-banner:hover{box-shadow:0 20px 56px rgba(0,0,0,.7);}

/* Dark gradient background */
.med-banner-bg{
  position:absolute;inset:0;z-index:0;
  transition:transform .6s ease;
}
.med-banner:hover .med-banner-bg{transform:scale(1.03);}

/* Overlay for readability */
.med-banner-overlay{
  position:absolute;inset:0;z-index:1;
  background:
    linear-gradient(90deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.3) 45%, rgba(0,0,0,.08) 100%),
    linear-gradient(to bottom, rgba(0,0,0,.15) 0%, rgba(0,0,0,.0) 100%);
}

/* Accent line on left */
.med-banner-accent{
  position:absolute;left:0;top:0;bottom:0;width:5px;z-index:3;
  border-radius:20px 0 0 20px;
  /* Subtle outward glow matching brand color */
  box-shadow:2px 0 18px rgba(255,255,255,.08);
}
/* Ambient glow from accent color into the bg */
.med-banner::before{
  content:'';
  position:absolute;left:0;top:0;bottom:0;width:35%;z-index:1;
  background:linear-gradient(90deg,var(--accent-glow,rgba(200,0,0,.12)) 0%,transparent 100%);
  pointer-events:none;
}

/* Content inside banner */
.med-banner-content{
  position:relative;z-index:2;padding:2.5rem 3rem;
  display:flex;align-items:center;gap:3rem;width:100%;
}
.med-banner-logo-wrap{
  flex-shrink:0;
  width:200px;height:88px;
  display:flex;align-items:center;justify-content:center;
  /* White background so logos with white bg blend naturally */
  background:#ffffff;
  border-radius:14px;
  padding:14px 22px;
  /* Subtle shadow to separate from dark gradient bg */
  box-shadow:0 4px 24px rgba(0,0,0,.3), 0 1px 0 rgba(255,255,255,.15);
  position:relative;overflow:hidden;
}
/* Soft glow behind logo matching brand accent */
.med-banner-logo-wrap::after{
  content:'';
  position:absolute;inset:0;
  border-radius:14px;
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.06);
  pointer-events:none;
}
/* Logo: no filter — keep original colors */
.med-banner-logo{
  max-width:100%;max-height:100%;object-fit:contain;
  display:block;
  /* remove white bg bleed with mix-blend-mode */
  mix-blend-mode:multiply;
}
[data-theme="dark"] .med-banner-logo{mix-blend-mode:normal;}
.med-banner-text{flex:1;min-width:0;}
.med-banner-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.6rem,3vw,2.4rem);
  color:#fff;letter-spacing:.06em;line-height:1;margin-bottom:.4rem;}
.med-banner-tagline{font-size:.85rem;color:rgba(255,255,255,.65);font-weight:300;
  letter-spacing:.06em;text-transform:uppercase;margin-bottom:.8rem;}
.med-banner-origin{display:flex;align-items:center;gap:6px;font-size:.72rem;
  color:rgba(255,255,255,.45);font-weight:500;}
.med-banner-origin::before{content:'📍';font-size:.75rem;}
.med-banner-arrow{
  flex-shrink:0;width:48px;height:48px;border-radius:50%;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
  display:flex;align-items:center;justify-content:center;
  color:rgba(255,255,255,.7);font-size:1.1rem;
  transition:all .25s;
  backdrop-filter:blur(8px);
}
.med-banner:hover .med-banner-arrow{background:rgba(255,255,255,.2);color:#fff;transform:translateX(4px);}

/* Status badge */
.med-banner-badge{
  position:absolute;top:1.25rem;right:1.5rem;z-index:3;
  font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;
  padding:4px 12px;border-radius:99px;
  background:rgba(255,255,255,.12);color:rgba(255,255,255,.7);
  border:1px solid rgba(255,255,255,.15);
  backdrop-filter:blur(8px);
}
.med-banner-badge.active{background:rgba(16,185,129,.2);color:#6ee7b7;border-color:rgba(16,185,129,.3);}

/* ── MANUFACTURER DETAIL PAGE ── */
.med-detail{}

.med-detail-hero{
  position:relative;overflow:hidden;border-radius:20px;
  min-height:280px;display:flex;align-items:flex-end;
  margin-bottom:2rem;
  box-shadow:0 8px 40px rgba(0,0,0,.2);
}
[data-theme="dark"] .med-detail-hero{box-shadow:0 8px 40px rgba(0,0,0,.5);}
.med-detail-hero-bg{position:absolute;inset:0;z-index:0;}
.med-detail-hero-overlay{
  position:absolute;inset:0;z-index:1;
  background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.1) 100%);
}
.med-detail-hero-content{
  position:relative;z-index:2;padding:2.5rem 3rem;width:100%;
  display:flex;align-items:flex-end;gap:2.5rem;flex-wrap:wrap;
}
.med-detail-logo-wrap{
  width:180px;height:72px;
  background:#ffffff;
  border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  padding:12px 20px;flex-shrink:0;
  box-shadow:0 4px 20px rgba(0,0,0,.35), 0 1px 0 rgba(255,255,255,.1);
}
.med-detail-logo{
  max-width:100%;max-height:100%;object-fit:contain;
  mix-blend-mode:multiply;
}
[data-theme="dark"] .med-detail-logo{mix-blend-mode:normal;}
.med-detail-hero-text{flex:1;min-width:0;}
.med-detail-hero-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,5vw,3.5rem);
  color:#fff;letter-spacing:.05em;line-height:.95;margin-bottom:.5rem;}
.med-detail-hero-tag{font-size:.82rem;color:rgba(255,255,255,.6);font-weight:300;
  letter-spacing:.1em;text-transform:uppercase;}

/* Info grid below hero */
.med-info-grid{display:grid;grid-template-columns:1fr 2fr;gap:1.5rem;margin-bottom:2rem;}
.med-info-card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;
  padding:1.75rem;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.med-info-card-t{font-size:.75rem;font-weight:700;color:var(--text-faint);text-transform:uppercase;
  letter-spacing:.12em;margin-bottom:1rem;}
.med-facts{display:flex;flex-direction:column;gap:.75rem;}
.med-fact{display:flex;align-items:center;justify-content:space-between;padding:.6rem .75rem;
  background:var(--bg2);border-radius:8px;}
.med-fact-l{font-size:.75rem;color:var(--text-dim);font-weight:500;}
.med-fact-v{font-size:.82rem;color:var(--text);font-weight:700;}
.med-focus-tags{display:flex;flex-wrap:wrap;gap:8px;}
.med-focus-tag{padding:6px 14px;border-radius:99px;font-size:.75rem;font-weight:600;
  background:var(--bg2);color:var(--text-dim);border:1px solid var(--section-border);}

/* Description */
.med-desc{font-size:.9rem;color:var(--text-dim);line-height:1.75;margin-bottom:.75rem;}

/* Back button */
.med-back{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;
  border:1px solid var(--section-border);background:var(--card);font-family:'Outfit',sans-serif;
  font-weight:600;font-size:.84rem;cursor:pointer;margin-bottom:2rem;color:var(--text);transition:all .2s;
  box-shadow:0 1px 3px rgba(0,0,0,.05);}
.med-back:hover{background:var(--bg2);}

/* Product cards — full width each */
.med-prod-list{display:flex;flex-direction:column;gap:12px;}
.med-prod-card{
  background:var(--card);border:1px solid var(--card-border);border-radius:16px;
  padding:1.75rem 2rem;display:flex;align-items:center;gap:2rem;
  box-shadow:0 1px 4px rgba(0,0,0,.05);transition:all .22s;
  text-decoration:none;color:inherit;position:relative;overflow:hidden;
}
.med-prod-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.1);border-color:rgba(200,152,58,.3);}
[data-theme="dark"] .med-prod-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.3);}
.med-prod-accent{position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:16px 0 0 16px;}
.med-prod-num{
  font-family:'Bebas Neue',sans-serif;font-size:2.2rem;color:var(--text-faint);
  letter-spacing:.04em;line-height:1;min-width:48px;text-align:center;flex-shrink:0;
}
.med-prod-divider{width:1px;height:60px;background:var(--section-border);flex-shrink:0;}
.med-prod-body{flex:1;min-width:0;}
.med-prod-code{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--text-faint);
  background:var(--bg2);border:1px solid var(--section-border);padding:2px 8px;
  border-radius:4px;display:inline-block;margin-bottom:.5rem;}
.med-prod-title{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:.4rem;line-height:1.3;}
.med-prod-desc{font-size:.82rem;color:var(--text-dim);line-height:1.6;}
.med-prod-cta{
  flex-shrink:0;padding:10px 20px;border-radius:10px;
  font-family:'Outfit',sans-serif;font-weight:600;font-size:.82rem;
  text-decoration:none;transition:all .2s;white-space:nowrap;
  background:var(--bg2);color:var(--text-dim);border:1px solid var(--section-border);
}
.med-prod-card:hover .med-prod-cta{background:var(--gold);color:#fff;border-color:var(--gold);}

/* Draft state */
.med-draft{
  text-align:center;padding:5rem 2rem;background:var(--card);
  border-radius:20px;border:2px dashed var(--section-border);
  margin-top:1.5rem;
}
.med-draft-icon{font-size:3rem;margin-bottom:1rem;display:block;}
.med-draft-t{font-size:1.15rem;font-weight:700;color:var(--text);margin:0 0 .5rem;}
.med-draft-s{font-size:.86rem;color:var(--text-faint);margin:0;max-width:360px;margin:0 auto;}

.ea-draft{text-align:center;padding:4rem 2rem;background:var(--card);border-radius:16px;border:1.5px dashed var(--section-border);}
.ea-draft-t{font-size:1.1rem;font-weight:600;color:var(--text);margin:0 0 .4rem;}
.ea-draft-s{font-size:.86rem;color:var(--text-faint);margin:0;}

/* ══════════════════════════════════════════════════════
   SAP UNIVERSUM — full-width, SEAMLESS with page
   Uses same background as page, no dark box
══════════════════════════════════════════════════════ */

.sap-section{
  width:100vw;
  margin-left:calc(-50vw + 50%);
  background:var(--sap-bg);
  color:var(--sap-text);
  border-top:1px solid var(--section-border);
  border-bottom:1px solid var(--section-border);
}

/* ── SAP HEADER — warm parchment, not dark ── */
.sap-hd{
  background:var(--sap-hd-bg);
  border-bottom:1px solid var(--sap-nav-border);
  padding:4rem 5% 3rem;
  position:relative;overflow:hidden;
}
.sap-hd::before{
  content:'SAP UNIVERSUM';
  position:absolute;right:2%;bottom:-.5rem;
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(4rem,9vw,8rem);
  color:rgba(200,152,58,.07);
  line-height:1;pointer-events:none;letter-spacing:.08em;white-space:nowrap;
}
.sap-hd-inner{max-width:1600px;margin:0 auto;}
.sap-eyebrow{font-size:.62rem;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);
  font-weight:600;display:flex;align-items:center;gap:9px;margin-bottom:.7rem;}
.sap-eyebrow::before{content:'';display:block;width:28px;height:1px;background:var(--gold);opacity:.6;}
.sap-hd-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4.2rem);
  color:var(--sap-text);margin:0 0 .5rem;letter-spacing:.05em;line-height:.92;}
.sap-hd-title span{color:var(--gold);}
.sap-hd-sub{color:var(--sap-text-dim);font-size:.9rem;font-weight:300;line-height:1.65;max-width:640px;margin:0 0 1.5rem;}
.sap-hd-pills{display:flex;gap:10px;flex-wrap:wrap;}
.sap-pill{background:rgba(200,152,58,.1);border:1px solid rgba(200,152,58,.25);
  color:var(--gold);font-size:.68rem;font-weight:600;padding:5px 13px;
  border-radius:99px;letter-spacing:.07em;text-transform:uppercase;}

/* ── STICKY NAV — matches page header ── */
.sap-nav{
  background:var(--sap-nav-bg);
  border-bottom:1px solid var(--sap-nav-border);
  position:sticky;top:0;z-index:100;
}
.sap-nav-inner{max-width:1600px;margin:0 auto;padding:0 5%;display:flex;overflow-x:auto;}
.sap-nav-inner::-webkit-scrollbar{display:none;}
.sap-ntab{padding:.95rem 1.5rem;border:none;background:transparent;
  color:var(--sap-text-faint);font-family:'Outfit',sans-serif;font-size:.86rem;font-weight:500;
  cursor:pointer;white-space:nowrap;border-bottom:2px solid transparent;transition:all .18s;flex-shrink:0;}
.sap-ntab:hover{color:var(--sap-text);}
.sap-ntab.on{color:var(--gold);border-bottom-color:var(--gold);font-weight:600;}

/* ── SAP CONTENT AREA ── */
.sap-content{max-width:1600px;margin:0 auto;padding:3rem 5% 5rem;}
.sap-sh{font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--sap-text);
  letter-spacing:.07em;margin:0 0 .4rem;display:flex;align-items:center;gap:14px;}
.sap-sh-rule{flex:1;height:1px;background:linear-gradient(90deg,var(--sap-border),transparent);}
.sap-ss{font-size:.84rem;color:var(--sap-text-faint);margin:0 0 2rem;font-weight:300;}
@keyframes sap-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.sap-anim{animation:sap-up .3s ease;}

/* ── PROCESS FLOW CHIPS ── */
.sap-flow{display:flex;align-items:center;overflow-x:auto;padding-bottom:1rem;margin-bottom:2rem;gap:0;}
.sap-flow::-webkit-scrollbar{height:3px;}
.sap-flow::-webkit-scrollbar-thumb{background:rgba(200,152,58,.2);border-radius:99px;}
.sap-fc{
  flex-shrink:0;background:var(--card);border:1px solid var(--sap-border);border-radius:12px;
  padding:1rem 1.1rem;text-align:center;cursor:pointer;transition:all .2s;
  min-width:110px;max-width:130px;
  box-shadow:0 1px 3px rgba(0,0,0,.06);
}
.sap-fc:hover,.sap-fc.on{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,.1);}
.sap-fc.on{border-color:var(--fc-col,#c8983a);}
.sap-fc-em{font-size:1.6rem;display:block;margin-bottom:5px;}
.sap-fc-lbl{font-size:.65rem;color:var(--sap-text-dim);line-height:1.3;font-weight:500;}
.sap-arr{color:rgba(200,152,58,.4);font-size:1.1rem;padding:0 3px;flex-shrink:0;margin-bottom:14px;}

/* ── DETAIL PANEL ── */
.sap-dp{
  background:var(--card);border:1px solid var(--sap-border);border-radius:16px;
  padding:2rem;margin-bottom:2rem;border-left:3px solid;
  box-shadow:0 2px 8px rgba(0,0,0,.06);
}
.sap-dp-top{display:flex;align-items:center;gap:14px;margin-bottom:1.25rem;}
.sap-dp-em{font-size:2rem;}
.sap-dp-phase{font-size:.6rem;text-transform:uppercase;letter-spacing:.18em;font-weight:700;margin-bottom:3px;}
.sap-dp-name{font-size:1.05rem;font-weight:700;color:var(--sap-text);}
.sap-dp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;}
.sap-dp-item{background:var(--sap-card);border:1px solid var(--sap-border);border-radius:10px;
  padding:.9rem 1rem;display:flex;gap:10px;align-items:flex-start;}
.sap-dp-ico{font-size:1rem;flex-shrink:0;margin-top:1px;}
.sap-dp-txt{font-size:.8rem;color:var(--sap-text-dim);line-height:1.5;}

/* ── PROCESS CARD GRID ── */
.sap-pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
.sap-pcard{
  background:var(--card);border:1px solid var(--sap-border);border-radius:16px;
  padding:1.5rem;cursor:pointer;transition:all .22s;position:relative;overflow:hidden;
  box-shadow:0 1px 3px rgba(0,0,0,.06);
}
.sap-pcard:hover{border-color:rgba(200,152,58,.3);transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.1);}
.sap-pcard.on{box-shadow:0 0 0 1.5px var(--pc,#c8983a),0 8px 24px rgba(0,0,0,.1);}
.sap-pcard-bar{position:absolute;top:0;left:0;right:0;height:2px;opacity:.8;}
.sap-pcard-top{display:flex;gap:12px;align-items:flex-start;margin-bottom:.85rem;}
.sap-pcard-em{font-size:1.75rem;line-height:1;flex-shrink:0;}
.sap-pcard-ph{font-size:.56rem;letter-spacing:.18em;text-transform:uppercase;color:var(--sap-text-faint);margin-bottom:3px;}
.sap-pcard-t{font-size:.94rem;font-weight:700;color:var(--sap-text);line-height:1.25;}
.sap-pcard-s{font-size:.7rem;color:var(--sap-text-faint);margin-top:2px;}
.sap-pcard-list{display:flex;flex-direction:column;gap:5px;}
.sap-pcard-li{display:flex;gap:8px;font-size:.75rem;color:var(--sap-text-dim);line-height:1.4;}

/* ── MODULE CARDS ── */
.sap-mgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:14px;}
.sap-mc{background:var(--card);border:1px solid var(--sap-border);border-radius:16px;overflow:hidden;
  transition:all .22s;box-shadow:0 1px 3px rgba(0,0,0,.06);}
.sap-mc:hover{border-color:rgba(200,152,58,.28);transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.1);}
.sap-mc-hd{padding:1.5rem;display:flex;align-items:flex-start;gap:14px;border-bottom:1px solid var(--sap-border);cursor:pointer;}
.sap-mc-ico{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;}
.sap-mc-ref{font-family:'DM Mono',monospace;font-size:.6rem;color:var(--sap-text-faint);letter-spacing:.07em;margin-bottom:3px;}
.sap-mc-title{font-size:.98rem;font-weight:700;color:var(--sap-text);margin:0;}
.sap-mc-body{padding:1.25rem 1.5rem;}
.sap-mc-hls{display:flex;flex-direction:column;gap:6px;margin-bottom:1.25rem;}
.sap-hl{font-size:.78rem;color:var(--sap-text-dim);display:flex;gap:8px;}
.sap-hl::before{content:'›';color:var(--gold);font-weight:700;flex-shrink:0;}
.sap-kpis{display:flex;gap:8px;flex-wrap:wrap;}
.sap-kpi{background:var(--sap-card);border:1px solid var(--sap-border);border-radius:9px;
  padding:6px 10px;text-align:center;min-width:68px;}
.sap-kpi-v{font-family:'Bebas Neue',sans-serif;font-size:1.05rem;line-height:1;letter-spacing:.03em;}
.sap-kpi-l{font-size:.57rem;color:var(--sap-text-faint);text-transform:uppercase;letter-spacing:.09em;margin-top:2px;}
.sap-mc-deep{padding:1.25rem 1.5rem;border-top:1px solid var(--sap-border);
  font-size:.8rem;color:var(--sap-text-dim);line-height:1.75;white-space:pre-line;
  background:var(--sap-card);}

/* ── MDR CHAIN ── */
.sap-mdr-chain{display:flex;align-items:center;overflow-x:auto;padding:1.5rem 0 1rem;gap:0;}
.sap-mdr-chain::-webkit-scrollbar{height:3px;}
.sap-mdr-chain::-webkit-scrollbar-thumb{background:rgba(200,152,58,.2);border-radius:99px;}
.sap-mdr-step{flex-shrink:0;background:var(--card);border:1px solid var(--sap-border);
  border-radius:14px;padding:1.2rem 1rem;text-align:center;min-width:130px;max-width:155px;
  box-shadow:0 1px 3px rgba(0,0,0,.06);}
.sap-mdr-em{font-size:1.7rem;display:block;margin-bottom:6px;}
.sap-mdr-t{font-size:.75rem;font-weight:700;color:var(--sap-text);margin-bottom:4px;line-height:1.25;}
.sap-mdr-s{font-size:.64rem;color:var(--sap-text-faint);line-height:1.5;white-space:pre-line;}
.sap-mdr-arr{color:rgba(200,152,58,.4);font-size:1.3rem;padding:0 6px;flex-shrink:0;}

/* ── ESCALATION ── */
.sap-esc{border-radius:14px;padding:1.5rem 1.75rem;margin-bottom:10px;border-left:4px solid;
  box-shadow:0 1px 4px rgba(0,0,0,.05);}
.sap-esc-hd{display:flex;align-items:center;gap:12px;margin-bottom:1rem;flex-wrap:wrap;}
.sap-esc-badge{font-size:.63rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;
  padding:3px 10px;border-radius:6px;white-space:nowrap;}
.sap-esc-title{font-size:.97rem;font-weight:700;color:var(--sap-text);margin:2px 0 2px;}
.sap-esc-trig{font-size:.72rem;color:var(--sap-text-faint);}
.sap-esc-acts{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;}
.sap-esc-act{background:var(--card);border:1px solid var(--sap-border);border-radius:9px;
  padding:.7rem .9rem;font-size:.77rem;color:var(--sap-text-dim);display:flex;gap:8px;}

/* ── ROLES ── */
.sap-rgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;}
.sap-rc{background:var(--card);border:1px solid var(--sap-border);border-radius:14px;padding:1.4rem;
  box-shadow:0 1px 3px rgba(0,0,0,.05);}
.sap-rc-ico{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;
  justify-content:center;font-size:1.4rem;margin-bottom:.8rem;}
.sap-rc-badge{display:inline-block;padding:2px 9px;border-radius:5px;font-family:'DM Mono',monospace;
  font-size:.62rem;font-weight:500;letter-spacing:.07em;margin-bottom:6px;}
.sap-rc-name{font-size:.9rem;font-weight:700;color:var(--sap-text);margin-bottom:4px;}
.sap-rc-mod{font-size:.74rem;color:var(--sap-text-faint);line-height:1.4;}
.sap-sod-grid{display:flex;flex-direction:column;gap:9px;margin-top:1.5rem;}
.sap-sod{background:rgba(220,38,38,.06);border:1px solid rgba(220,38,38,.15);border-radius:12px;
  padding:1.1rem 1.3rem;display:grid;grid-template-columns:1fr auto 1fr;gap:1rem;align-items:center;}
[data-theme="dark"] .sap-sod{background:rgba(220,38,38,.1);border-color:rgba(220,38,38,.2);}
.sap-sod-c{font-size:.8rem;font-weight:600;color:#b91c1c;}
[data-theme="dark"] .sap-sod-c{color:#fca5a5;}
.sap-sod-b{background:rgba(220,38,38,.12);color:#dc2626;padding:3px 11px;border-radius:99px;
  font-size:.63rem;font-weight:700;text-transform:uppercase;text-align:center;white-space:nowrap;}
[data-theme="dark"] .sap-sod-b{background:rgba(220,38,38,.2);color:#fca5a5;}
.sap-sod-ctrl{font-size:.75rem;color:#059669;}
[data-theme="dark"] .sap-sod-ctrl{color:#6ee7b7;}

/* ── TIMELINE ── */
.sap-tl-wrap{display:grid;grid-template-columns:1fr 1fr;gap:2rem 4rem;position:relative;}
.sap-tl-col{position:relative;padding-left:1.8rem;}
.sap-tl-col::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;
  background:linear-gradient(to bottom,var(--gold),rgba(200,152,58,.05));}
.sap-tl-item{padding-bottom:1.75rem;position:relative;}
.sap-tl-dot{position:absolute;left:-1.8rem;top:5px;width:13px;height:13px;border-radius:50%;
  border:2px solid;transform:translateX(-50%);}
.sap-tl-dot.d{background:var(--gold);border-color:var(--gold);}
.sap-tl-dot.t{background:var(--sap-bg);border-color:rgba(200,152,58,.3);}
.sap-tl-ph{font-family:'DM Mono',monospace;font-size:.64rem;color:var(--gold);letter-spacing:.1em;margin-bottom:3px;}
.sap-tl-name{font-size:.94rem;font-weight:700;color:var(--sap-text);margin-bottom:3px;
  display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.sap-tl-desc{font-size:.77rem;color:var(--sap-text-faint);}
.sap-tl-badge{font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:2px 7px;border-radius:4px;}
.sap-tl-badge.d{background:rgba(5,150,105,.12);color:#059669;}
[data-theme="dark"] .sap-tl-badge.d{background:rgba(16,185,129,.15);color:#6ee7b7;}
.sap-tl-badge.t{background:rgba(200,152,58,.1);color:var(--gold);}
.sap-proj-bar{background:var(--card);border:1px solid var(--sap-border);border-radius:14px;
  padding:1.5rem 2rem;margin-bottom:2.5rem;display:flex;align-items:center;gap:2rem;flex-wrap:wrap;
  box-shadow:0 1px 4px rgba(0,0,0,.05);}
.sap-pbar-info{flex:1;min-width:180px;}
.sap-pbar-lbl{font-size:.6rem;color:var(--gold);text-transform:uppercase;letter-spacing:.2em;font-weight:600;margin-bottom:8px;}
.sap-pbar-track{height:4px;background:var(--sap-card2);border-radius:99px;overflow:hidden;}
.sap-pbar-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold-lt));border-radius:99px;}
.sap-pbar-sub{font-size:.7rem;color:var(--sap-text-faint);margin-top:6px;}
.sap-pbar-pct{font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:var(--gold);line-height:1;letter-spacing:.04em;}

/* ── UAT TRACKER ── */
.sap-uat-stats{display:flex;gap:12px;margin-bottom:1.5rem;flex-wrap:wrap;}
.sap-uat-stat{background:var(--card);border:1px solid var(--sap-border);border-radius:12px;
  padding:.8rem 1.2rem;display:flex;align-items:center;gap:10px;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.sap-uat-n{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;line-height:1;letter-spacing:.03em;}
.sap-uat-l{font-size:.62rem;color:var(--sap-text-faint);text-transform:uppercase;letter-spacing:.1em;font-weight:500;}
.sap-pbar-wrap{flex:1;min-width:180px;background:var(--card);border:1px solid var(--sap-border);
  border-radius:12px;padding:.8rem 1.2rem;display:flex;align-items:center;gap:14px;
  box-shadow:0 1px 3px rgba(0,0,0,.05);}
.sap-pb-bg{flex:1;height:4px;background:var(--sap-card2);border-radius:99px;overflow:hidden;}
.sap-pb-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#059669,#10b981);transition:width .5s;}
.sap-filters{display:flex;gap:7px;margin-bottom:1.25rem;flex-wrap:wrap;}
.sap-fb{padding:6px 13px;border-radius:7px;border:1px solid var(--sap-border);
  background:var(--card);color:var(--sap-text-dim);font-family:'Outfit',sans-serif;
  font-size:.74rem;font-weight:500;cursor:pointer;transition:all .16s;
  box-shadow:0 1px 2px rgba(0,0,0,.04);}
.sap-fb:hover{color:var(--sap-text);border-color:rgba(200,152,58,.4);}
.sap-fb.on{background:rgba(200,152,58,.08);border-color:var(--gold);color:var(--gold);}
.sap-table-wrap{background:var(--card);border:1px solid var(--sap-border);border-radius:14px;overflow:hidden;
  box-shadow:0 1px 4px rgba(0,0,0,.05);}
.sap-table{width:100%;border-collapse:collapse;}
.sap-table th{text-align:left;padding:.7rem 1rem;font-size:.61rem;text-transform:uppercase;
  letter-spacing:.14em;color:var(--sap-text-faint);font-weight:700;
  border-bottom:1px solid var(--sap-border);background:var(--sap-card);}
.sap-table td{padding:.8rem 1rem;font-size:.8rem;border-bottom:1px solid var(--sap-border);vertical-align:middle;}
.sap-table tr:last-child td{border-bottom:none;}
.sap-table tr:hover td{background:var(--sap-card);}
.sap-tid{font-family:'DM Mono',monospace;font-size:.7rem;color:var(--gold);font-weight:500;}
.sap-ttitle{color:var(--sap-text);}
.sap-mbadge{font-size:.68rem;padding:3px 10px;border-radius:5px;font-weight:600;white-space:nowrap;}
.sap-p1{background:rgba(220,38,38,.1);color:#dc2626;}
[data-theme="dark"] .sap-p1{background:rgba(220,38,38,.18);color:#fca5a5;}
.sap-p2{background:rgba(200,152,58,.1);color:#9a6f20;}
[data-theme="dark"] .sap-p2{background:rgba(251,191,36,.12);color:#fcd34d;}
.sap-sbwrap{display:flex;gap:5px;}
.sap-sb{width:28px;height:28px;border-radius:6px;border:1px solid var(--sap-border);
  background:var(--sap-card);font-size:.72rem;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:all .14s;}
.sap-sb:hover{border-color:rgba(200,152,58,.4);}
.sap-sb.pass{background:rgba(5,150,105,.1);border-color:#059669;color:#059669;}
[data-theme="dark"] .sap-sb.pass{background:rgba(16,185,129,.18);border-color:#10b981;color:#6ee7b7;}
.sap-sb.fail{background:rgba(220,38,38,.1);border-color:#dc2626;color:#dc2626;}
[data-theme="dark"] .sap-sb.fail{background:rgba(220,38,38,.18);border-color:#dc2626;color:#fca5a5;}
.sap-sb.pend{background:rgba(200,152,58,.1);border-color:var(--gold);color:var(--gold);}

/* ══════════════════════════════════════════════════
   RESPONSIVE BREAKPOINTS
══════════════════════════════════════════════════ */

@media(min-width:1400px){
  .ea-wrap{max-width:1600px;padding:0 3%;}
  .sap-content{padding:3.5rem 3% 6rem;}
  .sap-hd{padding:5rem 3% 4rem;}
  .sap-nav-inner{padding:0 3%;}
  .ea-grid{grid-template-columns:repeat(5,1fr);}
  .sap-pgrid{grid-template-columns:repeat(5,1fr);}
  .sap-mgrid{grid-template-columns:repeat(3,1fr);}
  .sap-rgrid{grid-template-columns:repeat(6,1fr);}
  .sap-dp-grid{grid-template-columns:repeat(4,1fr);}
  .sap-esc-acts{grid-template-columns:repeat(4,1fr);}
  /* MED large desktop */
  .med-banner{min-height:220px;border-radius:24px;}
  .med-banner-content{padding:3rem 4rem;}
  .med-banner-logo-wrap{width:240px;height:100px;}
  .med-banner-name{font-size:2.8rem;}
  .med-info-grid{grid-template-columns:320px 1fr;}
}
@media(min-width:1100px) and (max-width:1399px){
  .ea-grid{grid-template-columns:repeat(4,1fr);}
  .ea-mfr-grid{grid-template-columns:repeat(4,1fr);}
  .sap-pgrid{grid-template-columns:repeat(4,1fr);}
  .sap-mgrid{grid-template-columns:repeat(3,1fr);}
  .sap-rgrid{grid-template-columns:repeat(3,1fr);}
}
@media(min-width:768px) and (max-width:1099px){
  .ea-grid{grid-template-columns:repeat(3,1fr);gap:11px;}
  .sap-pgrid{grid-template-columns:repeat(3,1fr);gap:12px;}
  .sap-mgrid{grid-template-columns:repeat(2,1fr);}
  .sap-rgrid{grid-template-columns:repeat(3,1fr);}
  .sap-tl-wrap{grid-template-columns:1fr;}
  .sap-hd{padding:3rem 5% 2.5rem;}
  .sap-content{padding:2.5rem 5% 4rem;}
  .sap-dp-grid{grid-template-columns:repeat(2,1fr);}
  .sap-esc-acts{grid-template-columns:repeat(2,1fr);}
  /* MED tablet */
  .med-banner{min-height:150px;}
  .med-banner-content{padding:2rem;}
  .med-banner-logo-wrap{width:150px;height:66px;}
  .med-info-grid{grid-template-columns:1fr;}
}
@media(min-width:480px) and (max-width:767px){
  .ea-wrap{padding:0 4%;}
  .ea-grid{grid-template-columns:repeat(2,1fr);gap:10px;}
  .sap-pgrid{grid-template-columns:repeat(2,1fr);gap:10px;}
  .sap-mgrid{grid-template-columns:1fr;}
  .sap-rgrid{grid-template-columns:repeat(2,1fr);}
  .sap-tl-wrap{grid-template-columns:1fr;}
  .sap-sod{grid-template-columns:1fr;}
  .sap-hd{padding:2.5rem 4% 2rem;}
  .sap-hd::before{display:none;}
  .sap-content{padding:2rem 4% 3.5rem;}
  .sap-nav-inner{padding:0 4%;}
  .sap-dp-grid{grid-template-columns:1fr;}
  .sap-esc-acts{grid-template-columns:repeat(2,1fr);}
  .ea-tabs{flex-wrap:nowrap;}
  .ea-tab{flex:0 0 auto;padding:11px 16px;}
  .ea-prog{gap:1.25rem;}
  .ea-test{flex-direction:column;align-items:flex-start;}
  .ea-test-btn{width:100%;}
  /* MED small tablet */
  .med-banner{min-height:130px;border-radius:14px;}
  .med-banner-content{padding:1.5rem;gap:1.5rem;}
  .med-banner-logo-wrap{width:120px;height:54px;}
  .med-banner-name{font-size:1.6rem;}
  .med-info-grid{grid-template-columns:1fr;}
  .med-detail-hero{min-height:200px;}
  .med-detail-hero-content{padding:1.75rem;}
  .med-prod-card{padding:1.25rem 1.5rem;gap:1.25rem;}
  .med-prod-cta{display:none;}
}
@media(max-width:479px){
  .ea-wrap{padding:0 16px;}
  .ea-hero-inner{padding:0 5% 10vw;}
  .ea-h1-top{font-size:1.75rem;}
  .ea-h1-main{font-size:clamp(4rem,18vw,5.5rem);}
  .ea-tagline{font-size:.75rem;}
  .ea-stats{gap:0;margin-top:1.5rem;}
  .ea-stat{padding-right:1.25rem;margin-right:1.25rem;}
  .ea-stat-n{font-size:1.9rem;}
  .ea-welcome{padding:1rem 1.2rem;flex-direction:column;gap:.75rem;}
  .ea-welcome-pill{align-self:flex-start;}
  .ea-tabs{flex-wrap:nowrap;padding:3px;}
  .ea-tab{flex:0 0 auto;padding:10px 13px;font-size:.8rem;}
  .ea-grid{grid-template-columns:1fr;gap:9px;}
  .ea-prog{padding:1.2rem;gap:1rem;}
  /* MED mobile */
  .med-banner{min-height:120px;border-radius:12px;margin-bottom:10px;}
  .med-banner-content{padding:1.25rem;gap:1rem;}
  .med-banner-logo-wrap{width:90px;height:44px;padding:8px 12px;}
  .med-banner-name{font-size:1.4rem;}
  .med-banner-tagline{font-size:.72rem;display:none;}
  .med-banner-origin{font-size:.65rem;}
  .med-banner-arrow{width:36px;height:36px;font-size:.9rem;}
  .med-banner-badge{font-size:.58rem;padding:3px 9px;top:.9rem;right:1rem;}
  .med-info-grid{grid-template-columns:1fr;}
  .med-detail-hero{min-height:160px;border-radius:14px;}
  .med-detail-hero-content{padding:1.25rem;gap:1.25rem;flex-direction:column;align-items:flex-start;}
  .med-detail-logo-wrap{width:120px;height:50px;}
  .med-detail-hero-name{font-size:1.8rem;}
  .med-prod-card{padding:1.1rem 1.25rem;gap:1rem;flex-wrap:wrap;}
  .med-prod-num{font-size:1.6rem;min-width:36px;}
  .med-prod-divider{display:none;}
  .med-prod-cta{display:none;}
  .med-draft{padding:3rem 1.5rem;}
  .ea-prog-pct{font-size:2.2rem;min-width:56px;}
  .ea-philo{padding:1.35rem 1.2rem;}
  .ea-philo::before{display:none;}
  .ea-test{padding:1.2rem;flex-direction:column;gap:.9rem;}
  .ea-test-btn{width:100%;}
  .sap-hd{padding:2rem 4% 1.75rem;}
  .sap-hd::before{display:none;}
  .sap-hd-title{font-size:2.2rem;}
  .sap-content{padding:1.5rem 4% 3rem;}
  .sap-nav-inner{padding:0 4%;}
  .sap-ntab{padding:.8rem .9rem;font-size:.74rem;}
  .sap-sh{font-size:1.5rem;}
  .sap-pgrid{grid-template-columns:1fr;gap:9px;}
  .sap-pcard{padding:1.2rem;}
  .sap-dp{padding:1.25rem;}
  .sap-dp-grid{grid-template-columns:1fr;gap:8px;}
  .sap-mgrid{grid-template-columns:1fr;gap:10px;}
  .sap-mdr-step{min-width:105px;max-width:118px;}
  .sap-esc-acts{grid-template-columns:1fr;}
  .sap-rgrid{grid-template-columns:repeat(2,1fr);gap:9px;}
  .sap-sod{grid-template-columns:1fr;gap:.6rem;}
  .sap-tl-wrap{grid-template-columns:1fr;}
  .sap-tl-col{padding-left:1.4rem;}
  .sap-tl-dot{left:-1.4rem;width:11px;height:11px;}
  .sap-uat-stats{gap:8px;}
  .sap-pbar-wrap{flex:1 1 100%;}
  .sap-filters{overflow-x:auto;flex-wrap:nowrap;padding-bottom:4px;}
  .sap-filters::-webkit-scrollbar{display:none;}
  .sap-fb{flex-shrink:0;}
  .sap-table th:nth-child(2),.sap-table td:nth-child(2){display:none;}
}

`;

// ─── SAP UNIVERSE ────────────────────────────────────────────────────────────

function SAPUniverse() {
  const [tab, setTab]    = useState('map');
  const [step, setStep]  = useState<string|null>(null);
  const [mod, setMod]    = useState<string|null>(null);
  const [uf, setUF]      = useState('all');
  const [st, setSt]      = useState<Record<string,'open'|'pass'|'fail'>>(() =>
    Object.fromEntries(SAP_UAT.map(t=>[t.id,'open'])));

  const toggle = (id:string, s:'pass'|'fail'|'open') =>
    setSt(p=>({...p,[id]:p[id]===s?'open':s}));

  const pass  = Object.values(st).filter(v=>v==='pass').length;
  const fail_ = Object.values(st).filter(v=>v==='fail').length;
  const open_ = Object.values(st).filter(v=>v==='open').length;
  const pct   = Math.round((pass/SAP_UAT.length)*100);

  const MC:Record<string,string>={Vertrieb:'#818cf8',Einkauf:'#fbbf24',Lager:'#34d399',Finanzen:'#f87171',Service:'#c084fc',Intercompany:'#2dd4bf'};
  const MB:Record<string,string>={Vertrieb:'#818cf815',Einkauf:'#fbbf2415',Lager:'#34d39915',Finanzen:'#f8717115',Service:'#c084fc15',Intercompany:'#2dd4bf15'};
  const filt = uf==='all'?SAP_UAT:uf==='pass'?SAP_UAT.filter(t=>st[t.id]==='pass'):uf==='fail'?SAP_UAT.filter(t=>st[t.id]==='fail'):uf==='open'?SAP_UAT.filter(t=>st[t.id]==='open'):SAP_UAT.filter(t=>t.mod===uf);

  const TABS=[{id:'map',l:'Prozesslandschaft'},{id:'modules',l:'SAP Module'},{id:'mdr',l:'MDR-Compliance'},{id:'roles',l:'Rollen & Rechte'},{id:'timeline',l:'Zeitplan'},{id:'uat',l:'UAT Tracker'}];

  return (
    <div className="sap-section">

      {/* ── HEADER ── */}
      <div className="sap-hd">
        <div className="sap-hd-inner">
          <div className="sap-eyebrow">SAP Business One Cloud · EMIG GmbH Deutschland</div>
          <h2 className="sap-hd-title">SAP <span>Universum</span></h2>
          <p className="sap-hd-sub">Interaktive Prozesslandschaft, Module und UAT-Tracker für die vollständige SAP B1 Cloud Implementierung der EMIG GmbH.</p>
          <div className="sap-hd-pills">
            <span className="sap-pill">Go-Live Nov 2026</span>
            <span className="sap-pill">MDR 2017/745</span>
            <span className="sap-pill">{SAP_MODS.length} Module</span>
            <span className="sap-pill">{SAP_PROC.length} Prozessschritte</span>
            <span className="sap-pill">MiaMed Q1/2027</span>
          </div>
        </div>
      </div>

      {/* ── STICKY NAV ── */}
      <div className="sap-nav">
        <div className="sap-nav-inner">
          {TABS.map(t=>(
            <button key={t.id} className={`sap-ntab ${tab===t.id?'on':''}`} onClick={()=>setTab(t.id)}>{t.l}</button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="sap-content">

        {/* MAP */}
        {tab==='map' && (
          <div className="sap-anim">
            <div className="sap-sh">Vollständige Prozesslandschaft <div className="sap-sh-rule"/></div>
            <p className="sap-ss">Klicken Sie auf eine Phase für Details — Phase 0 bis 9, vom ersten Kundenkontakt bis zur proaktiven Retention.</p>

            {/* Horizontal flow */}
            <div className="sap-flow">
              {SAP_PROC.map((s,i)=>(
                <React.Fragment key={s.id}>
                  <div className={`sap-fc ${step===s.id?'on':''}`}
                    style={{'--fc-col':s.col} as any}
                    onClick={()=>setStep(step===s.id?null:s.id)}>
                    <span className="sap-fc-em">{s.em}</span>
                    <span className="sap-fc-lbl">{s.title}</span>
                  </div>
                  {i<SAP_PROC.length-1&&<div className="sap-arr">&#8594;</div>}
                </React.Fragment>
              ))}
            </div>

            {/* Detail panel */}
            {step && (()=>{
              const s=SAP_PROC.find(x=>x.id===step)!;
              return (
                <div className="sap-dp" style={{borderLeftColor:s.col}}>
                  <div className="sap-dp-top">
                    <span className="sap-dp-em">{s.em}</span>
                    <div>
                      <div className="sap-dp-phase" style={{color:s.col}}>Phase {s.ph}</div>
                      <div className="sap-dp-name">{s.title} — {s.sub}</div>
                    </div>
                  </div>
                  <div className="sap-dp-grid">
                    {s.details.map((d,i)=>(
                      <div className="sap-dp-item" key={i}>
                        <span className="sap-dp-ico">{d.i}</span>
                        <span className="sap-dp-txt">{d.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Card grid */}
            <div className="sap-pgrid">
              {SAP_PROC.map(s=>(
                <div key={s.id} className={`sap-pcard ${step===s.id?'on':''}`}
                  style={{'--pc':s.col} as any}
                  onClick={()=>setStep(step===s.id?null:s.id)}>
                  <div className="sap-pcard-bar" style={{background:s.col}}/>
                  <div className="sap-pcard-top">
                    <span className="sap-pcard-em">{s.em}</span>
                    <div>
                      <div className="sap-pcard-ph">Phase {s.ph}</div>
                      <div className="sap-pcard-t">{s.title}</div>
                      <div className="sap-pcard-s">{s.sub}</div>
                    </div>
                  </div>
                  <div className="sap-pcard-list">
                    {s.details.slice(0,3).map((d,i)=>(
                      <div className="sap-pcard-li" key={i}><span>{d.i}</span><span>{d.t}</span></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULES */}
        {tab==='modules' && (
          <div className="sap-anim">
            <div className="sap-sh">SAP Module & Kernfunktionen <div className="sap-sh-rule"/></div>
            <p className="sap-ss">Alle {SAP_MODS.length} Kernmodule — Header klicken für die ausführliche Beschreibung.</p>
            <div className="sap-mgrid">
              {SAP_MODS.map(m=>(
                <div key={m.id} className="sap-mc">
                  <div className="sap-mc-hd" onClick={()=>setMod(mod===m.id?null:m.id)}>
                    <div className="sap-mc-ico" style={{background:m.col+'1a'}}><span>{m.em}</span></div>
                    <div style={{flex:1}}>
                      <div className="sap-mc-ref">{m.ref}</div>
                      <div className="sap-mc-title">{m.title}</div>
                    </div>
                    <span style={{color:'rgba(232,228,220,.25)',fontSize:'.8rem'}}>{mod===m.id?'▲':'▼'}</span>
                  </div>
                  <div className="sap-mc-body">
                    <div className="sap-mc-hls">{m.hl.map((h,i)=><div className="sap-hl" key={i}>{h}</div>)}</div>
                    <div className="sap-kpis">{m.kpis.map((k,i)=>(
                      <div className="sap-kpi" key={i}>
                        <div className="sap-kpi-v" style={{color:m.col}}>{k.v}</div>
                        <div className="sap-kpi-l">{k.l}</div>
                      </div>
                    ))}</div>
                  </div>
                  {mod===m.id&&<div className="sap-mc-deep">{m.deep}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MDR */}
        {tab==='mdr' && (
          <div className="sap-anim">
            <div className="sap-sh">MDR-Compliance Kette <div className="sap-sh-rule"/></div>
            <p className="sap-ss">EU Medical Device Regulation 2017/745 — in jeden SAP-Prozessschritt integriert.</p>

            <div className="sap-mdr-chain">
              {[
                {e:'📦',t:'Wareneingang',    s:'UDI-Scan\nCE/DoC-Prüfung\nCharge + MHD'},
                {e:'🛡️',t:'MDR-Gate',        s:'CE fehlt?\nAuto-Sperre\nKein WE mögl.'},
                {e:'🏪',t:'Lagerung',         s:'Haupt-/Sperrlager\nMHD-Monitoring\n60-Tage-Alarm'},
                {e:'📋',t:'Kommissionierung', s:'DoC-Prüfung\nQR-Scan Pflicht\nCharge zugeord.'},
                {e:'🚚',t:'Versand',          s:'UDI-Etiketten\nLieferschein+MHD\nEquip. Card'},
                {e:'🔧',t:'Service',          s:'Field Safety\nRückruf-Workflow\nBfArM'},
                {e:'🔍',t:'Rückverfolgung',   s:'Vorwärts: Empf.\nRückwärts: Lief.\n< 5 Sek.'},
              ].map((item,i,arr)=>(
                <React.Fragment key={i}>
                  <div className="sap-mdr-step">
                    <span className="sap-mdr-em">{item.e}</span>
                    <div className="sap-mdr-t">{item.t}</div>
                    <div className="sap-mdr-s">{item.s}</div>
                  </div>
                  {i<arr.length-1&&<div className="sap-mdr-arr">&#8594;</div>}
                </React.Fragment>
              ))}
            </div>

            <div style={{marginTop:'2.5rem'}}>
              <div className="sap-sh" style={{fontSize:'1.5rem',marginBottom:'.4rem'}}>Eskalations-Workflow <div className="sap-sh-rule"/></div>
              <p className="sap-ss">3 Stufen mit verbindlichen SLA-Fristen</p>
              {[
                {s:'1',e:'🔍',t:'Interne Diagnose',     sla:'4 Stunden',      trig:'Eingang Servicemeldung',                    c:'#34d399', acts:['Geräteakte (Equipment Card) geladen','Knowledge Base durchsucht','Interne Lösung angewendet','Falls keine Lösung: Eskalation Stufe 2']},
                {s:'2',e:'📡',t:'Herstellermeldung',    sla:'24 Stunden',     trig:'Keine interne Lösung oder sicherheitsrelevant',c:'#fbbf24', acts:['Auto: Seriennummer + Fehlerprotokoll','Fotos/Anhänge am Serviceabruf','Status: Eskaliert — Hersteller informiert','SLA-Uhr für Herstellerantwort gestartet']},
                {s:'3',e:'🚨',t:'Field Safety / Rückruf',sla:'2 Stunden (!)', trig:'Systematischer Defekt oder FSN des Herstellers',c:'#f87171', acts:['Vorwärtssuche: alle Empfänger der Charge','Rückwärtssuche: Ursprungslieferant','Status Under Recall systemweit gesetzt','BfArM-Berichte automatisch generiert']},
              ].map(esc=>(
                <div key={esc.s} className="sap-esc" style={{background:esc.c+'0c',borderLeftColor:esc.c}}>
                  <div className="sap-esc-hd">
                    <span style={{fontSize:'1.7rem'}}>{esc.e}</span>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                        <span style={{fontSize:'.6rem',textTransform:'uppercase',letterSpacing:'.18em',color:esc.c,fontWeight:700}}>Stufe {esc.s}</span>
                        <span className="sap-esc-badge" style={{background:esc.c+'20',color:esc.c}}>SLA: {esc.sla}</span>
                      </div>
                      <div className="sap-esc-title">{esc.t}</div>
                      <div className="sap-esc-trig">Auslöser: {esc.trig}</div>
                    </div>
                  </div>
                  <div className="sap-esc-acts">
                    {esc.acts.map((a,i)=>(
                      <div className="sap-esc-act" key={i}>
                        <span style={{color:esc.c,flexShrink:0}}>›</span>{a}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROLES */}
        {tab==='roles' && (
          <div className="sap-anim">
            <div className="sap-sh">Rollen & Berechtigungen <div className="sap-sh-rule"/></div>
            <p className="sap-ss">Rollenbasiertes Konzept nach DSGVO & GoBD — Prinzip der minimalen Privilegien (Kap. 4.4)</p>
            <div className="sap-rgrid">
              {[
                {i:'👔',t:'Geschäftsführung', c:'#e2e8f0', m:'Vollzugriff + 4-Augen-Freigabe', b:'GF'},
                {i:'💼',t:'Vertrieb',         c:'#818cf8', m:'CRM, Angebote, Aufträge',         b:'VT'},
                {i:'📦',t:'Lager / Logistik', c:'#34d399', m:'WE, Kommissionierung, Versand',   b:'LA'},
                {i:'🔧',t:'Service-Techniker',c:'#c084fc', m:'Tickets, RMA, Equipment Card',    b:'ST'},
                {i:'💶',t:'Buchhaltung',      c:'#f87171', m:'Rechnungen, DATEV, Controlling',  b:'BU'},
                {i:'⚙️',t:'IT-Administrator', c:'#94a3b8', m:'System, Rechte, Schnittstellen',  b:'IT'},
              ].map((r,i)=>(
                <div className="sap-rc" key={i}>
                  <div className="sap-rc-ico" style={{background:r.c+'1a'}}>{r.i}</div>
                  <div className="sap-rc-badge" style={{background:r.c+'1a',color:r.c}}>{r.b}</div>
                  <div className="sap-rc-name">{r.t}</div>
                  <div className="sap-rc-mod">{r.m}</div>
                </div>
              ))}
            </div>

            <div style={{marginTop:'2.5rem'}}>
              <div className="sap-sh" style={{fontSize:'1.5rem',marginBottom:'.4rem'}}>Segregation of Duties <div className="sap-sh-rule"/></div>
              <p className="sap-ss">Kritische Funktionskombinationen — systemseitig gesperrt (Kap. 4.4.3)</p>
              <div className="sap-sod-grid">
                {[
                  {a:'Angebot erstellen + Kundenauftrag freigeben',    risk:'Falschbuchung ohne Kontrolle',   ctrl:'4-Augen: GF-Freigabe zwingend'},
                  {a:'Warenausgang buchen + Rechnung erstellen',       risk:'Fiktive Lieferungen möglich',    ctrl:'Trennung Lager und Finanzen'},
                  {a:'Lieferantenstamm anlegen + Bestellung auslösen', risk:'Phantomlieferanten-Betrug',      ctrl:'Doppelfreigabe Einkauf + GF'},
                  {a:'DATEV-Export + Buchungen stornieren',            risk:'Nachträgliche Manipulation',     ctrl:'Nur IT-Admin + Finanzen gemeinsam'},
                  {a:'Zahlungssperre aufheben + Zahlung auslösen',     risk:'Unberechtigte Zahlungen',        ctrl:'GF-Freigabe zwingend'},
                ].map((item,i)=>(
                  <div className="sap-sod" key={i}>
                    <div className="sap-sod-c">🚫 {item.a}</div>
                    <div className="sap-sod-b">{item.risk}</div>
                    <div className="sap-sod-ctrl">✓ {item.ctrl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE */}
        {tab==='timeline' && (
          <div className="sap-anim">
            <div className="sap-sh">Projektzeitplan 2026–2027 <div className="sap-sh-rule"/></div>
            <p className="sap-ss">8 Monate bis Go-Live EMIG Deutschland · Q1/2027 MiaMed Ukraine</p>

            <div className="sap-proj-bar">
              <div className="sap-pbar-info">
                <div className="sap-pbar-lbl">Projektfortschritt — März 2026</div>
                <div className="sap-pbar-track"><div className="sap-pbar-fill" style={{width:'25%'}}/></div>
                <div className="sap-pbar-sub">Phase 2 von 8 abgeschlossen</div>
              </div>
              <div className="sap-pbar-pct">25%</div>
            </div>

            <div className="sap-tl-wrap">
              {[SAP_TL.slice(0,4), SAP_TL.slice(4)].map((col,ci)=>(
                <div className="sap-tl-col" key={ci}>
                  {col.map((item,i)=>(
                    <div className="sap-tl-item" key={i}>
                      <div className={`sap-tl-dot ${item.done?'d':'t'}`}/>
                      <div className="sap-tl-ph">{item.ph}</div>
                      <div className="sap-tl-name">
                        <span>{item.em}</span>{item.title}
                        <span className={`sap-tl-badge ${item.done?'d':'t'}`}>{item.done?'Abgeschlossen':'Geplant'}</span>
                      </div>
                      <div className="sap-tl-desc">{item.desc}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UAT */}
        {tab==='uat' && (
          <div className="sap-anim">
            <div className="sap-sh">UAT Test-Tracker <div className="sap-sh-rule"/></div>
            <p className="sap-ss">Interaktiver Abnahme-Tracker — ✓ Bestanden · ✗ Fehler · ⏳ Offen klicken zum Setzen.</p>

            <div className="sap-uat-stats">
              <div className="sap-uat-stat"><div className="sap-uat-n" style={{color:'#6ee7b7'}}>{pass}</div><div className="sap-uat-l">Bestanden</div></div>
              <div className="sap-uat-stat"><div className="sap-uat-n" style={{color:'#fca5a5'}}>{fail_}</div><div className="sap-uat-l">Fehler</div></div>
              <div className="sap-uat-stat"><div className="sap-uat-n" style={{color:'#fcd34d'}}>{open_}</div><div className="sap-uat-l">Offen</div></div>
              <div className="sap-pbar-wrap">
                <div style={{flex:1}}>
                  <div style={{fontSize:'.6rem',color:'rgba(232,228,220,.28)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:8}}>Gesamtfortschritt</div>
                  <div className="sap-pb-bg"><div className="sap-pb-fill" style={{width:`${pct}%`}}/></div>
                </div>
                <div style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'2.2rem',color:'#34d399',lineHeight:1,letterSpacing:'.03em',minWidth:56,textAlign:'right'}}>{pct}%</div>
              </div>
            </div>

            <div className="sap-filters">
              {['all','open','pass','fail','Vertrieb','Einkauf','Lager','Finanzen','Service','Intercompany'].map(f=>(
                <button key={f} className={`sap-fb ${uf===f?'on':''}`} onClick={()=>setUF(f)}>
                  {f==='all'?'Alle':f==='open'?'⏳ Offen':f==='pass'?'✓ Bestanden':f==='fail'?'✗ Fehler':f}
                </button>
              ))}
            </div>

            <div className="sap-table-wrap">
              <table className="sap-table">
                <thead>
                  <tr><th>Test-ID</th><th>Modul</th><th>Testfall</th><th>Prio</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {filt.map(t=>{
                    const s=st[t.id];
                    return (
                      <tr key={t.id}>
                        <td><span className="sap-tid">{t.id}</span></td>
                        <td><span className="sap-mbadge" style={{background:MB[t.mod]||'#ffffff0d',color:MC[t.mod]||'#fff'}}>{t.mod}</span></td>
                        <td><span className="sap-ttitle">{t.title}</span></td>
                        <td><span className={`sap-mbadge ${t.p==='P1'?'sap-p1':'sap-p2'}`}>{t.p}</span></td>
                        <td>
                          <div className="sap-sbwrap">
                            <button className={`sap-sb ${s==='pass'?'pass':''}`} onClick={()=>toggle(t.id,'pass')} title="Bestanden">✓</button>
                            <button className={`sap-sb ${s==='fail'?'fail':''}`} onClick={()=>toggle(t.id,'fail')} title="Fehler">✗</button>
                            <button className={`sap-sb ${s==='open'?'pend':''}`} onClick={()=>toggle(t.id,'open')} title="Offen">⏳</button>
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

// ─── MANUFACTURER BANNER CARD ────────────────────────────────────────────────

function MfrBanner({m, onClick}:any) {
  const [err, setErr] = useState(false);
  const logo = useBaseUrl(m.logo);
  const hasProducts = m.products && m.products.length > 0;

  return (
    <div className="med-banner"
      style={{'--accent-glow': m.accent + '22'} as any}
      onClick={onClick}>
      {/* Background gradient */}
      <div className="med-banner-bg" style={{background: m.bg}} />
      {/* Overlay */}
      <div className="med-banner-overlay" />
      {/* Accent stripe */}
      <div className="med-banner-accent" style={{background: m.accent}} />
      {/* Status badge */}
      <div className={`med-banner-badge ${hasProducts ? 'active' : ''}`}>
        {hasProducts ? 'Module verfügbar' : 'In Vorbereitung'}
      </div>
      {/* Content */}
      <div className="med-banner-content">
        <div className="med-banner-logo-wrap">
          {!err
            ? <img src={logo} alt={m.name} className="med-banner-logo"
                style={{filter: m.invertLogo ? 'none' : undefined}}
                onError={()=>setErr(true)}/>
            : <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.1rem',
                color:m.accent,fontWeight:700,letterSpacing:'.04em'}}>{m.name}</span>}
        </div>
        <div className="med-banner-text">
          <div className="med-banner-name">{m.name}</div>
          <div className="med-banner-tagline">{m.tagline}</div>
          <div className="med-banner-origin">{m.origin}</div>
        </div>
        <div className="med-banner-arrow">&#8594;</div>
      </div>
    </div>
  );
}

// ─── MANUFACTURER DETAIL ──────────────────────────────────────────────────────

function MfrDetail({m, onBack}:any) {
  const [err, setErr] = useState(false);
  const logo = useBaseUrl(m.logo);
  const hasProducts = m.products && m.products.length > 0;

  return (
    <div className="med-detail">
      <button className="med-back" onClick={onBack}>&#8592; Alle Hersteller</button>

      {/* Hero banner */}
      <div className="med-detail-hero">
        <div className="med-detail-hero-bg" style={{background: m.bg}} />
        <div className="med-detail-hero-overlay" />
        <div className="med-detail-hero-content">
          <div className="med-detail-logo-wrap">
            {!err
              ? <img src={logo} alt={m.name} className="med-detail-logo" onError={()=>setErr(true)}/>
              : <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.1rem',
                  color:m.accent,fontWeight:700}}>{m.name}</span>}
          </div>
          <div className="med-detail-hero-text">
            <div className="med-detail-hero-name">{m.name}</div>
            <div className="med-detail-hero-tag">{m.tagline}</div>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="med-info-grid">
        {/* Left: facts */}
        <div className="med-info-card">
          <div className="med-info-card-t">Unternehmens­daten</div>
          <div className="med-facts">
            {m.facts.map((f:any, i:number) => (
              <div className="med-fact" key={i}>
                <span className="med-fact-l">{f.label}</span>
                <span className="med-fact-v">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: description + focus */}
        <div className="med-info-card">
          <div className="med-info-card-t">Über {m.name}</div>
          <p className="med-desc">{m.description}</p>
          <div className="med-info-card-t" style={{marginBottom:'.75rem'}}>Schwerpunkte</div>
          <div className="med-focus-tags">
            {m.focus.map((f:string, i:number) => (
              <span className="med-focus-tag" key={i}>{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="ea-sh" style={{marginTop:'2rem'}}>
        <div className="ea-sh-bar" style={{background: m.accent}}/>
        Produktmodule
        <div className="ea-sh-rule"/>
      </div>

      {hasProducts ? (
        <div className="med-prod-list">
          {m.products.map((p:any, i:number) => (
            <Link key={p.code} to={p.link} className="med-prod-card">
              <div className="med-prod-accent" style={{background: m.accent}}/>
              <div className="med-prod-num">0{i+1}</div>
              <div className="med-prod-divider"/>
              <div className="med-prod-body">
                <div className="med-prod-code">{p.code}</div>
                <div className="med-prod-title">{p.title}</div>
                <div className="med-prod-desc">{p.desc}</div>
              </div>
              <span className="med-prod-cta">Modul starten &#8594;</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="med-draft">
          <span className="med-draft-icon">🔬</span>
          <div className="med-draft-t">Module in Vorbereitung</div>
          <p className="med-draft-s">Die Produktschulungen für {m.name} werden aktuell erstellt und sind bald verfügbar.</p>
        </div>
      )}
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

export default function Home() {
  const bgImg    = useBaseUrl('/img/emig-gebaeude.png');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [tab, setTab]       = useState<'QM'|'SAP'|'MED'>('QM');
  const [done, setDone]     = useState<string[]>([]);
  const [mfr, setMfr]       = useState<any>(null);
  const [greet, setGreet]   = useState('');

  useEffect(()=>{
    try{ const s=localStorage.getItem('emig_progress'); if(s) setDone(JSON.parse(s)); }catch(_){}
    const h=new Date().getHours();
    setGreet(h<12?'Guten Morgen':h<17?'Guten Tag':'Guten Abend');
  },[]);

  useEffect(()=>{
    const v=videoRef.current; if(!v) return;
    let dead=false;
    const t=setTimeout(()=>{ if(!dead) v.play().catch(()=>{}); },150);
    return()=>{ dead=true; clearTimeout(t); if(!v.paused) v.pause(); };
  },[]);

  const toggleVid=()=>{
    const v=videoRef.current; if(!v) return;
    if(v.paused){v.play().catch(()=>{}); setPaused(false);}
    else{v.pause(); setPaused(true);}
  };

  const pct   = Math.round((done.length/ALL_QM.length)*100);
  const ready = pct>=100;
  const CQM   = '#92400e';
  const CMED  = '#dc2626';

  function ModCard({title,code,color,link='#',draft=false}:any){
    const isDone=done.includes(code);
    return (
      <div className="ea-card" style={{opacity:draft?.65:1}}>
        <div className="ea-card-stripe" style={{background:isDone?'#10b981':color}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:5}}>
          <h3 className="ea-card-t">{title}</h3>
          {isDone&&<span style={{color:'#10b981',fontSize:'.88rem',marginLeft:6,flexShrink:0}}>✓</span>}
        </div>
        <div className="ea-card-code">{code}</div>
        <div className="ea-card-bar">
          <div className="ea-card-bar-f" style={{width:isDone?'100%':'0%',background:isDone?'#10b981':color}}/>
        </div>
        <Link className="ea-card-btn" to={draft?'#':link}
          style={{background:draft?'#f0ede8':isDone?'#ecfdf5':color,
            color:draft?'#9ca3af':isDone?'#059669':'#fff',
            border:isDone?'1px solid #d1fae5':'none'}}>
          {draft?'In Vorbereitung':isDone?'Wiederholen':'Starten'}
        </Link>
      </div>
    );
  }

  function SH({children,color='#374151'}:any){
    return(
      <div className="ea-sh">
        <div className="ea-sh-bar" style={{background:color}}/>
        {children}
        <div className="ea-sh-rule"/>
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

        {/* ── HERO ── */}
        <div style={{width:'100%',overflow:'hidden'}}>
          <div className="ea-hero">
            <div className="ea-hero-media">
              <video ref={videoRef} className="ea-hero-video" autoPlay={false} muted loop playsInline poster={bgImg} preload="auto">
                <source src="/video/emig-hero.mp4" type="video/mp4"/>
                <source src="/video/5762407-uhd_3840_2160_24fps%20(1).mp4" type="video/mp4"/>
              </video>
            </div>
            <div className="ea-vignette"/>
            <div className="ea-grain"/>
            <div className="ea-frame-t"/>
            <div className="ea-frame-b"/>
            <button className="ea-vidctl" onClick={toggleVid} title={paused?'Play':'Pause'}>{paused?'▶':'⏸'}</button>
            <div className="ea-hero-inner">
              <div className="ea-eyebrow"><span>Emig GmbH · Interne Lernplattform · Reutlingen</span></div>
              <h1 className="ea-h1">
                <span className="ea-h1-top">EMIG</span>
                <span className="ea-h1-main">ACADEMY</span>
              </h1>
              <p className="ea-tagline">Qualität · Wissen · Exzellenz</p>
              <div className="ea-stats">
                <div className="ea-stat"><span className="ea-stat-n">{ALL_QM.length}</span><span className="ea-stat-l">QM Module</span></div>
                <div className="ea-stat"><span className="ea-stat-n">{MFRS.length}</span><span className="ea-stat-l">Hersteller</span></div>
                <div className="ea-stat"><span className="ea-stat-n">10</span><span className="ea-stat-l">SAP Phasen</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <main className="ea-main">
          <div className="ea-wrap">

            {greet&&(
              <div className="ea-welcome">
                <div>
                  <div className="ea-welcome-name">{greet}, willkommen zurück.</div>
                  <div className="ea-welcome-sub">{done.length>0?`${done.length} von ${ALL_QM.length} QM-Modulen abgeschlossen`:'Starten Sie Ihr erstes Lernmodul.'}</div>
                </div>
                <div className="ea-welcome-pill">{pct}% abgeschlossen</div>
              </div>
            )}

            {/* MAIN TABS */}
            <div className="ea-tabs">
              {([{id:'QM',l:'Quality Management'},{id:'SAP',l:'SAP Universum'},{id:'MED',l:'Medizinprodukte'}] as const).map(({id,l})=>(
                <button key={id} className={`ea-tab ${tab===id?'active':''}`}
                  onClick={()=>{setTab(id);setMfr(null);}}>
                  {l}
                </button>
              ))}
            </div>

          </div>{/* end ea-wrap — SAP needs full width */}

          {/* ── QM TAB ── */}
          {tab==='QM' && (
            <div className="ea-wrap">
              <div className="ea-prog">
                <div className="ea-prog-info">
                  <div className="ea-prog-lbl">QM Gesamtfortschritt</div>
                  <div className="ea-prog-track"><div className="ea-prog-fill" style={{width:`${pct}%`}}/></div>
                  <div className="ea-prog-sub">{done.length} von {ALL_QM.length} Modulen abgeschlossen</div>
                </div>
                <div className="ea-prog-pct">{pct}%</div>
              </div>

              <div className="ea-philo">
                <div className="ea-philo-t">QM Philosophie & Strategie</div>
                <p className="ea-philo-b">Grundpfeiler unseres Qualitätsmanagementsystems nach ISO 13485.</p>
                <Link to="/docs/quality-management/qm-philosophie" className="ea-philo-lnk">Zur QM-Philosophie →</Link>
              </div>

              <div className="ea-test" style={{background:ready?'#f0fdf4':'#f8f7f3',borderColor:ready?'#bbf7d0':'#dedad4'}}>
                <div>
                  <div style={{fontWeight:600,fontSize:'1rem',color:ready?'#065f46':'#9ca3af'}}>
                    {ready?'Finaler Test & Zertifikat':'Finaler Test — gesperrt'}
                  </div>
                  <div style={{fontSize:'.77rem',color:'#9ca3af',marginTop:4}}>
                    {ready?'Alle Module abgeschlossen. Jetzt testen.':
                      `Noch ${ALL_QM.length-done.length} Module bis zur Freischaltung.`}
                  </div>
                </div>
                <button disabled={!ready} className="ea-test-btn"
                  style={{background:ready?'#059669':'#e5e1da',color:ready?'#fff':'#9ca3af',cursor:ready?'pointer':'not-allowed'}}>
                  Prüfung starten
                </button>
              </div>

              <SH color={CQM}>Logistik & Lager</SH>
              <div className="ea-grid">
                <ModCard title="Lagerbedingungen"    code="SOP-LOG-01" color={CQM} link="/docs/logistik-lager/SOP_LOG-01"/>
                <ModCard title="Rückverfolgbarkeit"  code="SOP-LOG-02" color={CQM} link="/docs/logistik-lager/SOP_LOG-02"/>
                <ModCard title="Sperrware"            code="SOP-LOG-03" color={CQM} link="/docs/logistik-lager/SOP_LOG-03"/>
                <ModCard title="Inventur"             code="SOP-LOG-04" color={CQM} draft/>
              </div>

              <SH color={CQM}>Einkauf & Lieferanten</SH>
              <div className="ea-grid">
                <ModCard title="Lieferantenbewertung" code="SOP-EINK-01" color={CQM} link="/docs/einkauf-lieferanten/SOP_EINK-01"/>
                <ModCard title="Einkaufsprozess"      code="SOP-EINK-02" color={CQM} link="/docs/einkauf-lieferanten/SOP_EINK-02"/>
              </div>

              <SH color={CQM}>Regulatorik & MDR</SH>
              <div className="ea-grid">
                <ModCard title="Importeurpflichten" code="SOP-REG-01" color={CQM} link="/docs/regulatorik-mdr/SOP_REG-01"/>
                <ModCard title="Händlerpflichten"   code="SOP-REG-02" color={CQM} link="/docs/regulatorik-mdr/SOP_REG-02"/>
                <ModCard title="PRRC"               code="SOP-REG-03" color={CQM} link="/docs/regulatorik-mdr/SOP_REG-03"/>
                <ModCard title="Audits"             code="SOP-REG-05" color={CQM} link="/docs/regulatorik-mdr/SOP_REG-05"/>
              </div>
            </div>
          )}

          {/* ── SAP TAB — full width, no wrap ── */}
          {tab==='SAP' && <SAPUniverse/>}

          {/* ── MED TAB — full-width, no wrap ── */}
          {tab==='MED' && (
            <div className="ea-wrap">
              {!mfr ? (
                <>
                  <SH color={CMED}>Hersteller & Produktschulungen</SH>
                  <div className="med-list">
                    {MFRS.map(m => (
                      <MfrBanner key={m.id} m={m} onClick={() => setMfr(m)} />
                    ))}
                  </div>
                </>
              ) : (
                <MfrDetail m={mfr} onBack={() => setMfr(null)} />
              )}
            </div>
          )}

        </main>
      </div>
    </Layout>
  );
}