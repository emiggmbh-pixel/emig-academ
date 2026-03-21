import React, { useState, useEffect, useRef } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    id: 'pre',
    phase: '0',
    emoji: '🌐',
    title: 'Kundenanfrage',
    subtitle: 'Webshop / Direktkontakt',
    color: '#6366f1',
    bg: '#eef2ff',
    category: 'pre',
    details: [
      { icon: '🛒', text: 'Digitaler Katalog – Anfrage über Webshop-API' },
      { icon: '📞', text: 'Direktkontakt via Klinik / Facharzt' },
      { icon: '🔍', text: 'Sprachenunabhängige Dublettenprüfung (z.B. TEU = Tübingen)' },
      { icon: '📋', text: 'CRM Lead-Anlage & automatische Zuweisung an Fachberater' },
    ],
  },
  {
    id: 'offer',
    phase: '1',
    emoji: '📊',
    title: 'Angebot & Kalkulation',
    subtitle: 'Quote-to-Order',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    category: 'sales',
    details: [
      { icon: '💰', text: 'Key-Account Preislisten automatisch geladen' },
      { icon: '📦', text: 'BOM-Sets: Verkaufspreis + Einzelkomponenten im Hintergrund' },
      { icon: '📈', text: 'Echtzeit-Margenanzeige pro Position' },
      { icon: '📄', text: 'Proforma-Rechnung für 50% Anzahlung generiert' },
    ],
  },
  {
    id: 'order',
    phase: '2',
    emoji: '✅',
    title: 'Kundenauftrag',
    subtitle: 'Freigabe & Sperrmanagement',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    category: 'sales',
    details: [
      { icon: '🔒', text: 'Auftrag gesperrt bis Anzahlungseingang bestätigt' },
      { icon: '📦', text: 'Automatische Bestandsreservierung der BOM-Komponenten' },
      { icon: '🏦', text: 'Klinik-Saldo-Tracking in Echtzeit' },
      { icon: '🚦', text: 'Nur autorisierte Freigabe durch GF/Finanzen' },
    ],
  },
  {
    id: 'purchase',
    phase: '3',
    emoji: '🛍️',
    title: 'Einkauf & Bestellung',
    subtitle: 'Purchase-to-Pay',
    color: '#f59e0b',
    bg: '#fffbeb',
    category: 'purchase',
    details: [
      { icon: '🤖', text: 'MRP-Lauf: automatische Bestellvorschläge bei Unterschreitung Mindestbestand' },
      { icon: '📋', text: 'Bestellung → Proforma → 50% Anzahlung → Order Confirmation' },
      { icon: '⏱️', text: 'Backorder-Liste mit Ready Dates (Srok gotovnosti)' },
      { icon: '🏅', text: 'Preferred Supplier automatisch berücksichtigt' },
    ],
  },
  {
    id: 'receiving',
    phase: '4',
    emoji: '📬',
    title: 'Wareneingang',
    subtitle: 'MDR-Gate & UDI-Scan',
    color: '#10b981',
    bg: '#f0fdf4',
    category: 'warehouse',
    details: [
      { icon: '📱', text: 'QR/UDI-Scan: automatische Charge + MHD Erfassung' },
      { icon: '🛡️', text: 'MDR-Gate: CE-Zertifikat + DoC geprüft – sonst Sperre' },
      { icon: '🔢', text: 'Einheiten-Umrechnung: Palette → Karton → Stück' },
      { icon: '🏪', text: 'Automatische Lagerplatzzuweisung (Haupt-/Sperrlager)' },
    ],
  },
  {
    id: 'warehouse',
    phase: '5',
    emoji: '🏭',
    title: 'Lager & Kommissionierung',
    subtitle: 'Chargenrückverfolgung',
    color: '#14b8a6',
    bg: '#f0fdfa',
    category: 'warehouse',
    details: [
      { icon: '🔎', text: 'Bidirektionale Chargensuche in < 5 Sekunden' },
      { icon: '🚫', text: 'Sperrlager/Quarantäne: Gebrauchtware nie als verfügbar' },
      { icon: '📲', text: 'Pickliste via QR-Scan → korrekte Charge automatisch zugeordnet' },
      { icon: '⚠️', text: 'MHD-Monitoring: proaktive Warnlisten für ablaufende Bestände' },
    ],
  },
  {
    id: 'shipping',
    phase: '6',
    emoji: '🚚',
    title: 'Versand & Lieferung',
    subtitle: 'MDR-konformer Versand',
    color: '#f97316',
    bg: '#fff7ed',
    category: 'warehouse',
    details: [
      { icon: '📋', text: 'Lieferschein + Packliste mit Charge & MHD automatisch generiert' },
      { icon: '🏷️', text: 'UDI-Barcode-Etiketten MDR-konform gedruckt' },
      { icon: '🗂️', text: 'Equipment Card (Geräteakte) automatisch eröffnet' },
      { icon: '💳', text: 'Abschlussrechnung nach Warenausgang generiert' },
    ],
  },
  {
    id: 'finance',
    phase: '7',
    emoji: '💶',
    title: 'Finanzen & DATEV',
    subtitle: 'GoBD-konforme Buchhaltung',
    color: '#dc2626',
    bg: '#fef2f2',
    category: 'finance',
    details: [
      { icon: '📤', text: 'DATEV-Export: CSV/ASCII Buchungsstapel für Steuerberater' },
      { icon: '🔏', text: 'Belege nach Export gesperrt – GoBD-Unveränderbarkeit' },
      { icon: '🌍', text: 'USt-Logik: Inland / EU (steuerfrei) / Drittland automatisch' },
      { icon: '📊', text: 'Steuerlast-Berechnung + Dividenden-Grundlage in Echtzeit' },
    ],
  },
  {
    id: 'service',
    phase: '8',
    emoji: '🔧',
    title: 'Service & RMA',
    subtitle: 'After-Sales 3-Stufen-Workflow',
    color: '#7c3aed',
    bg: '#faf5ff',
    category: 'service',
    details: [
      { icon: '🎫', text: 'Stufe 1: Ticket via Seriennummer → Equipment Card sofort geladen' },
      { icon: '🏠', text: 'Szenario A: Vor-Ort-Einsatz mit Techniker-Cockpit & Fahrzeuglager' },
      { icon: '📦', text: 'Szenario B: RMA-Rücksendung → Reparaturlager (getrennt von Neuware)' },
      { icon: '📡', text: 'Stufe 2/3: Herstellermeldung + MDR-Rückruf-Workflow BfArM' },
    ],
  },
  {
    id: 'retention',
    phase: '9',
    emoji: '🔄',
    title: 'Retention & Wartung',
    subtitle: 'Proaktive Kundenbindung',
    color: '#ec4899',
    bg: '#fdf2f8',
    category: 'service',
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
    id: 'vertrieb',
    icon: '📊',
    title: 'Vertrieb & Preisfindung',
    color: '#6366f1',
    accent: '#eef2ff',
    ref: 'Kap. 3.1',
    highlights: ['Individuelle Preislisten pro Key-Account', 'BOM-Sets: Stücklisten-Verkauf', 'Webshop-Import → Quote-to-Order', 'Anzahlungslogik mit Auftragssperre'],
    kpis: [
      { label: 'Webshop-Sync', value: '≤15min', icon: '⚡' },
      { label: 'Angebote/Monat', value: '3–5', icon: '📄' },
      { label: 'Anzahlung', value: '50%', icon: '💰' },
    ],
    deep: `Die Preisfindung erfolgt vollautomatisch. Für jeden Kunden – insbesondere strategische Key-Accounts wie universitäre Kliniken – werden individuelle Preislisten hinterlegt. 
    
Das BOM-System (Bill of Materials) ermöglicht den Verkauf komplexer Operations-Sets: Der Kunde sieht einen Set-Preis, während SAP im Hintergrund alle Einzelkomponenten reserviert und bei Auslieferung korrekt abbucht.

Der Anzahlungs-Workflow ist als Pflichtprozess implementiert: Ohne Bestätigung des 50%-Vorauszahlungseingangs bleibt der Auftrag systemseitig gesperrt.`,
  },
  {
    id: 'lager',
    icon: '🏭',
    title: 'Lager & MDR-Compliance',
    color: '#10b981',
    accent: '#f0fdf4',
    ref: 'Kap. 3.2',
    highlights: ['UDI/QR-Scan Wareneingang', 'Bidirektionale Chargenrückverfolgung', 'Sperrlager virtuell getrennt', 'CE/DoC MDR-Gate vor Versand'],
    kpis: [
      { label: 'Chargensuche', value: '<5 Sek', icon: '🔍' },
      { label: 'Artikel', value: '~3.000', icon: '📦' },
      { label: 'MDR-Gate', value: '100%', icon: '🛡️' },
    ],
    deep: `Das Herzstück der MDR-Compliance: Jedes Medizinprodukt wird über UDI-Barcode beim Wareneingang erfasst. Das System prüft automatisch CE-Zertifikat und Declaration of Conformity (DoC).

Die bidirektionale Chargenrückverfolgung erlaubt im Rückruffall die sofortige Identifikation aller betroffenen Empfänger (Vorwärtssuche) und des Ursprungslieferanten (Rückwärtssuche) – innerhalb von 5 Sekunden.

Virtuelle Lagerorte trennen Neuware, Sperrlager und RMA-Reparaturlager systemseitig – eine versehentliche Kommissionierung gesperrter Ware ist technisch ausgeschlossen.`,
  },
  {
    id: 'einkauf',
    icon: '🛍️',
    title: 'Einkauf & Disposition',
    color: '#f59e0b',
    accent: '#fffbeb',
    ref: 'Kap. 3.3',
    highlights: ['MRP-Bestellvorschläge automatisch', 'Zertifikats-Ablaufüberwachung 60 Tage', 'Preferred Supplier System', 'Backorder-Liste mit Ready Dates'],
    kpis: [
      { label: 'Zertifikat-Warnung', value: '60 Tage', icon: '⏰' },
      { label: 'Währung', value: 'EUR', icon: '💶' },
      { label: 'MRP-Lauf', value: 'Auto', icon: '🤖' },
    ],
    deep: `Der MRP-Lauf (Material Requirements Planning) generiert vollautomatisch Bestellvorschläge – basierend auf Mindestbeständen, offenen Kundenaufträgen und BOM-Komponenten.

Ein kritisches Feature: SAP überwacht Ablaufdaten von CE-Zertifikaten und DoC aller Lieferanten. 60 Tage vor Ablauf wird automatisch der zuständige Einkäufer benachrichtigt. Abgelaufene Artikel werden für den Wareneingang gesperrt.

Der strukturierte 4-stufige Bestellworkflow (Bestellung → Proforma → 50% Anzahlung → Order Confirmation) bildet die herstellerspezifischen Standards (z.B. RIWOspine) exakt ab.`,
  },
  {
    id: 'service',
    icon: '🔧',
    title: 'Service & RMA',
    color: '#7c3aed',
    accent: '#faf5ff',
    ref: 'Kap. 3.4',
    highlights: ['3-Stufen Eskalations-Workflow', 'Equipment Card (Geräteakte)', 'SLA 4h Reaktionszeit überwacht', 'MDR-Rückruf BfArM-Workflow'],
    kpis: [
      { label: 'SLA Reaktion', value: '4 Std', icon: '⏱️' },
      { label: 'Hersteller-SLA', value: '24 Std', icon: '📡' },
      { label: 'Rückruf-SLA', value: '2 Std', icon: '🚨' },
    ],
    deep: `Der Service-Prozess ist als klar definierter 3-Stufen-Workflow implementiert:

Stufe 1 (4h): Interne Diagnose via Equipment Card + Knowledge Base
Stufe 2 (24h): Formelle Herstellermeldung mit automatisch generiertem Fehlerprotokoll, Seriennummer und Fotos
Stufe 3 (2h): MDR-Rückruf-Workflow – identifiziert alle betroffenen Geräte weltweit und kommuniziert mit BfArM

Zwei Szenarien werden vollständig abgedeckt: Szenario A (Vor-Ort-Einsatz mit mobilem Techniker-Cockpit und Fahrzeuglager) und Szenario B (RMA-Rücksendung in physisch getrenntes Reparaturlager).`,
  },
  {
    id: 'finanzen',
    icon: '💶',
    title: 'Finanzen & DATEV',
    color: '#dc2626',
    accent: '#fef2f2',
    ref: 'Kap. 3.5',
    highlights: ['GoBD-konforme Buchführung', 'DATEV CSV/ASCII Export', 'Automatisches Zahlungssperrmanagement', 'Steuerlast & Dividenden-Reports'],
    kpis: [
      { label: 'Standard', value: 'GoBD', icon: '📋' },
      { label: 'Export', value: 'DATEV', icon: '📤' },
      { label: 'Währung', value: 'EUR/HGB', icon: '⚖️' },
    ],
    deep: `Das Finanzmodul ist das kaufmännische Rückgrat und erfüllt alle deutschen Compliance-Anforderungen nach GoBD und HGB.

Das automatische Zahlungssperrmanagement ist ein Sicherheitsnetz: Bei Über- oder Unterzahlungen werden Lieferungen und Folgeprozesse automatisch blockiert – eine Freigabe erfordert die Geschäftsführung.

Der DATEV-Export generiert GoBD-konforme Buchungsstapel für den Steuerberater. Nach dem Export werden die Datensätze systemseitig gesperrt, um nachträgliche Manipulationen technisch auszuschließen.`,
  },
  {
    id: 'reporting',
    icon: '📈',
    title: 'Reporting & Dashboards',
    color: '#0ea5e9',
    accent: '#f0f9ff',
    ref: 'Kap. 3.6',
    highlights: ['Sales Intelligence Echtzeit', 'MDR-Monitoring & MHD-Warnlisten', 'SLA-Performance-Tracking', 'Intercompany-Konsolidierung'],
    kpis: [
      { label: 'Dashboards', value: 'Echtzeit', icon: '📊' },
      { label: 'Mandanten', value: 'Multi', icon: '🌍' },
      { label: 'Reports', value: 'Rollen', icon: '👤' },
    ],
    deep: `Das Reporting-System liefert rollenbasierte Echtzeit-Dashboards für jede Abteilung:

Sales Intelligence: Umsatz pro Artikel/Kunde/Monat mit historischen Migrationsdaten für langfristige Trendanalysen
Logistik: Lagerreichweite, MHD-Monitoring, Backorder-Übersicht mit Ready Dates
Service Analytics: SLA-Einhaltung, Wartungs-Pipeline, Geräte-Lebensläufe
Financial: Klinik-Salden, Steuerlast, DATEV-Abstimmungsbericht
Intercompany: Gruppen-Konsolidierung EMIG DE ↔ MiaMed UA in EUR/USD/UAH`,
  },
  {
    id: 'intercompany',
    icon: '🌍',
    title: 'Intercompany & MiaMed',
    color: '#0d9488',
    accent: '#f0fdfa',
    ref: 'Kap. 3.8',
    highlights: ['Automatische Beleg-Synchronisation', 'Seriennummern-Übertragung elektronisch', 'Multi-Währung UAH/EUR/USD', 'Gruppen-Konsolidierung auf Knopfdruck'],
    kpis: [
      { label: 'MiaMed Aufträge', value: '~700/J', icon: '📦' },
      { label: 'Währungen', value: '3', icon: '💱' },
      { label: 'Mandanten', value: '2', icon: '🏢' },
    ],
    deep: `Die Multi-Mandanten-Architektur verbindet EMIG GmbH (Deutschland, EUR, HGB) mit MiaMed (Ukraine, UAH, flexibel in EUR/USD) in einer gemeinsamen SAP-Umgebung.

Der automatisierte Intercompany-Prozess: Eine Bestellung in MiaMed generiert automatisch einen Kundenauftrag bei EMIG. Beim Warenausgang EMIG werden Seriennummern elektronisch übertragen – kein manueller Wareneingang bei MiaMed nötig.

Die Gruppen-Konsolidierung erstellt Bilanz und GuV ohne Intercompany-Positionen in Sekundenschnelle.`,
  },
  {
    id: 'compliance',
    icon: '🛡️',
    title: 'MDR Compliance & Qualität',
    color: '#b45309',
    accent: '#fffbeb',
    ref: 'Kap. 3.2–3.4',
    highlights: ['EU MDR 2017/745 vollkonform', 'UDI-Rückverfolgung lückenlos', 'CE/DoC Zertifikats-Überwachung', 'BfArM-Berichtsautomatisierung'],
    kpis: [
      { label: 'Norm', value: 'MDR', icon: '📜' },
      { label: 'ISO', value: '13485', icon: '🏅' },
      { label: 'Rückverfolgung', value: '100%', icon: '🔗' },
    ],
    deep: `MDR-Compliance ist kein Add-on, sondern in jeden Prozessschritt integriert:

Wareneingang: UDI-Scan + CE/DoC-Prüfung → Sperrung bei fehlendem Dokument
Kommissionierung: MDR-Gate prüft Gültigkeit vor jeder Pickliste
Rückruf: Bidirektionale Chargensuche identifiziert alle Betroffenen in < 5 Sekunden
Service: Field Safety Notice löst sofort Stufe-3-Workflow aus, BfArM-Berichte werden automatisch generiert
Zertifikate: Ablaufüberwachung mit 60-Tage-Vorlauf für CE und DoC je Lieferant/Artikel`,
  },
];

const ROLES = [
  { id: 'gf', icon: '👔', title: 'Geschäftsführung', color: '#1e293b', modules: 'Vollzugriff + 4-Augen-Freigabe', badge: 'GF' },
  { id: 'sales', icon: '💼', title: 'Vertrieb', color: '#6366f1', modules: 'CRM, Angebote, Aufträge', badge: 'VT' },
  { id: 'lager', icon: '📦', title: 'Lager / Logistik', color: '#10b981', modules: 'WE, Kommissionierung, Versand', badge: 'LA' },
  { id: 'service', icon: '🔧', title: 'Service-Techniker', color: '#7c3aed', modules: 'Tickets, RMA, Equipment Card', badge: 'ST' },
  { id: 'finanzen', icon: '💶', title: 'Buchhaltung', color: '#dc2626', modules: 'Rechnungen, DATEV, Controlling', badge: 'BU' },
  { id: 'it', icon: '⚙️', title: 'IT-Administrator', color: '#374151', modules: 'System, Berechtigungen, Schnittstellen', badge: 'IT' },
];

const UAT_TESTS = [
  { id: 'V-01', module: 'Vertrieb', title: 'Webshop-Anfrage importieren', prio: 'P1', status: 'open' },
  { id: 'V-02', module: 'Vertrieb', title: 'Angebot mit BOM erstellen', prio: 'P1', status: 'open' },
  { id: 'V-03', module: 'Vertrieb', title: 'Angebot → Auftrag (1 Klick)', prio: 'P1', status: 'open' },
  { id: 'V-04', module: 'Vertrieb', title: 'Sperrmanagement bei fehlender Zahlung', prio: 'P1', status: 'open' },
  { id: 'B-01', module: 'Einkauf', title: 'MRP-Bestellvorschlag', prio: 'P1', status: 'open' },
  { id: 'B-02', module: 'Einkauf', title: 'Bestellung mit 50% Anzahlung', prio: 'P1', status: 'open' },
  { id: 'B-03', module: 'Lager', title: 'Wareneingang mit UDI-Scan', prio: 'P1', status: 'open' },
  { id: 'L-01', module: 'Lager', title: 'MDR-Gate vor Kommissionierung', prio: 'P1', status: 'open' },
  { id: 'L-04', module: 'Lager', title: 'Chargen-Rückverfolgung bidirektional', prio: 'P1', status: 'open' },
  { id: 'F-01', module: 'Finanzen', title: 'Ausgangsrechnung erstellen', prio: 'P1', status: 'open' },
  { id: 'F-02', module: 'Finanzen', title: 'DATEV-Export', prio: 'P1', status: 'open' },
  { id: 'S-01', module: 'Service', title: 'Service-Ticket via Seriennummer', prio: 'P1', status: 'open' },
  { id: 'S-05', module: 'Service', title: 'Hersteller-Meldung (Stufe 2)', prio: 'P1', status: 'open' },
  { id: 'S-07', module: 'Service', title: 'Stufe-3-Rückruf auslösen', prio: 'P1', status: 'open' },
  { id: 'IC-01', module: 'Intercompany', title: 'Beleg-Synchronisation', prio: 'P1', status: 'open' },
];

const TIMELINE = [
  { phase: 'Feb 2026', emoji: '✅', title: 'Shortlist', desc: 'Top 2–3 Anbieter ausgewählt', done: true },
  { phase: 'März 2026', emoji: '🔄', title: 'Vertragsabschluss', desc: 'Live-Demos + Festpreisangebote', done: true },
  { phase: 'April 2026', emoji: '🚀', title: 'Kick-off', desc: 'Blueprint-Workshop + Stammdaten', done: false },
  { phase: 'Mai–Juli 2026', emoji: '⚙️', title: 'Customizing', desc: 'SAP-Konfiguration + Webshop-API', done: false },
  { phase: 'Aug–Sep 2026', emoji: '📦', title: 'Datenmigration', desc: 'Vollständige Migration + UAT-Start', done: false },
  { phase: 'Oktober 2026', emoji: '🧪', title: 'UAT', desc: 'User Acceptance Testing + Fehlerbehebung', done: false },
  { phase: 'November 2026', emoji: '🏁', title: 'Go-Live EMIG', desc: 'Go-Live Deutschland + Hypercare 4 Wochen', done: false },
  { phase: 'Q1 2027', emoji: '🌍', title: 'Go-Live MiaMed', desc: 'Ukraine-Mandant + Intercompany aktiv', done: false },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');

:root {
  --dark: #0d0d14;
  --dark2: #13131e;
  --dark3: #1a1a2e;
  --border: rgba(255,255,255,0.07);
  --gold: #f59e0b;
  --gold-lt: #fcd34d;
  --cream: #f5f3ee;
  --text: #e8e4dc;
  --muted: rgba(232,228,220,0.45);
  --r: 14px;
}

* { box-sizing: border-box; }
body { background: var(--dark) !important; }
.sap-root { font-family: 'Outfit', sans-serif; background: var(--dark); min-height: 100vh; }

/* ── Scrollbar ── */
.sap-root ::-webkit-scrollbar { width: 4px; height: 4px; }
.sap-root ::-webkit-scrollbar-track { background: var(--dark2); }
.sap-root ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 99px; }

/* ── Page Header ── */
.sap-header {
  background: linear-gradient(135deg, var(--dark2) 0%, var(--dark3) 100%);
  border-bottom: 1px solid var(--border);
  padding: 3rem 5% 2.5rem;
  position: relative;
  overflow: hidden;
}
.sap-header::before {
  content: 'SAP';
  position: absolute;
  right: 3%;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Bebas Neue', sans-serif;
  font-size: 12rem;
  color: rgba(245,158,11,0.04);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.sap-header-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.75rem;
}
.sap-header-eyebrow::before {
  content: '';
  display: block;
  width: 32px;
  height: 1px;
  background: var(--gold);
  opacity: 0.6;
}
.sap-header h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  color: #fff;
  margin: 0 0 0.5rem;
  letter-spacing: 0.05em;
  line-height: 0.95;
}
.sap-header h1 span {
  color: var(--gold-lt);
}
.sap-header-sub {
  color: var(--muted);
  font-size: 0.95rem;
  font-weight: 300;
  max-width: 600px;
  line-height: 1.6;
}
.sap-header-meta {
  display: flex;
  gap: 2rem;
  margin-top: 1.75rem;
  flex-wrap: wrap;
}
.sap-meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  color: var(--muted);
}
.sap-meta-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--gold);
}

/* ── Nav Tabs ── */
.sap-nav {
  background: var(--dark2);
  border-bottom: 1px solid var(--border);
  padding: 0 5%;
  display: flex;
  gap: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.sap-nav::-webkit-scrollbar { height: 2px; }
.sap-nav-btn {
  padding: 1rem 1.4rem;
  border: none;
  background: transparent;
  color: var(--muted);
  font-family: 'Outfit', sans-serif;
  font-size: 0.84rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.sap-nav-btn:hover { color: #fff; }
.sap-nav-btn.active {
  color: var(--gold-lt);
  border-bottom-color: var(--gold);
  font-weight: 600;
}

/* ── Content wrapper ── */
.sap-content {
  padding: 2.5rem 5% 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* ── Section heading ── */
.sap-section-h {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  color: #fff;
  letter-spacing: 0.08em;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 14px;
}
.sap-section-sub {
  font-size: 0.85rem;
  color: var(--muted);
  margin: 0 0 2rem;
  font-weight: 300;
}

/* ════════════════════════════════════
   PROCESS MAP
════════════════════════════════════ */
.proc-map {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
  margin-bottom: 1rem;
}

.proc-step {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.22s ease;
  position: relative;
  overflow: hidden;
}
.proc-step::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  border-radius: var(--r) var(--r) 0 0;
  opacity: 0.8;
}
.proc-step:hover {
  border-color: rgba(255,255,255,0.15);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
}
.proc-step.active {
  box-shadow: 0 0 0 2px var(--active-color, #f59e0b), 0 12px 32px rgba(0,0,0,0.4);
}

.proc-step-top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 0.75rem;
}
.proc-emoji {
  font-size: 1.8rem;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 0 8px rgba(255,255,255,0.15));
}
.proc-phase {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--muted);
  margin-bottom: 2px;
}
.proc-title {
  font-size: 0.97rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.proc-subtitle {
  font-size: 0.73rem;
  color: var(--muted);
  margin-top: 2px;
}

.proc-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.proc-detail-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.78rem;
  color: rgba(232,228,220,0.6);
  line-height: 1.4;
}
.proc-detail-icon { flex-shrink: 0; font-size: 0.85rem; }

/* Expanded detail panel */
.proc-detail-panel {
  background: var(--dark3);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 1.75rem;
  margin-bottom: 1.5rem;
  animation: sap-up 0.28s ease;
  border-left: 3px solid;
}
.proc-dp-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}
.proc-dp-emoji { font-size: 2rem; }
.proc-dp-h { font-size: 1.1rem; font-weight: 700; color: #fff; }
.proc-dp-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
}
.proc-dp-item {
  background: rgba(255,255,255,0.04);
  border-radius: 10px;
  padding: 0.9rem 1rem;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.proc-dp-item-icon { font-size: 1.1rem; flex-shrink: 0; }
.proc-dp-item-text { font-size: 0.83rem; color: rgba(232,228,220,0.75); line-height: 1.5; }

/* Flow connector arrows */
.proc-flow-row {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2.5rem;
  -webkit-overflow-scrolling: touch;
}
.proc-flow-card {
  flex-shrink: 0;
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 110px;
  max-width: 130px;
}
.proc-flow-card:hover, .proc-flow-card.active {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.proc-flow-card.active { border-color: var(--gold); }
.proc-flow-emoji { font-size: 1.6rem; display: block; margin-bottom: 5px; }
.proc-flow-label { font-size: 0.7rem; color: var(--muted); line-height: 1.3; font-weight: 500; }
.proc-flow-arrow {
  color: rgba(245,158,11,0.5);
  font-size: 1.2rem;
  flex-shrink: 0;
  padding: 0 4px;
  margin-top: -12px;
}

/* ════════════════════════════════════
   MODULE CARDS
════════════════════════════════════ */
.mod-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 14px;
}
.mod-card {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--r);
  overflow: hidden;
  transition: all 0.22s ease;
  cursor: pointer;
}
.mod-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); }
.mod-card.expanded { border-color: rgba(255,255,255,0.15); }
.mod-card-header {
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border-bottom: 1px solid var(--border);
}
.mod-icon {
  font-size: 2rem;
  width: 50px; height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.mod-ref {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  color: var(--muted);
  letter-spacing: 0.08em;
  margin-bottom: 3px;
}
.mod-title { font-size: 1rem; font-weight: 700; color: #fff; margin: 0 0 2px; }
.mod-card-body { padding: 1.25rem 1.5rem; }
.mod-highlights {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 1.25rem;
}
.mod-hl {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: rgba(232,228,220,0.65);
}
.mod-hl::before { content: '›'; color: var(--gold); font-weight: 700; flex-shrink: 0; }
.mod-kpis {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.mod-kpi {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px 10px;
  text-align: center;
  min-width: 70px;
}
.mod-kpi-val {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.1rem;
  line-height: 1;
  letter-spacing: 0.04em;
}
.mod-kpi-label {
  font-size: 0.6rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 2px;
}
.mod-expand-btn {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255,255,255,0.03);
  border: none;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.2s;
}
.mod-expand-btn:hover { background: rgba(255,255,255,0.06); color: #fff; }
.mod-deep {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.83rem;
  color: rgba(232,228,220,0.65);
  line-height: 1.7;
  white-space: pre-line;
  animation: sap-up 0.25s ease;
}

/* ════════════════════════════════════
   ROLES / PERMISSIONS
════════════════════════════════════ */
.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}
.role-card {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 1.5rem;
  transition: all 0.2s;
}
.role-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
.role-icon {
  font-size: 1.75rem;
  width: 44px; height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}
.role-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 5px;
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}
.role-title { font-size: 0.94rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
.role-modules { font-size: 0.75rem; color: var(--muted); line-height: 1.4; }

/* SoD conflicts */
.sod-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1.5rem;
}
.sod-item {
  background: rgba(220,38,38,0.08);
  border: 1px solid rgba(220,38,38,0.2);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}
.sod-item-conflict { font-size: 0.82rem; font-weight: 600; color: rgba(252,165,165,0.9); }
.sod-item-badge {
  background: rgba(220,38,38,0.2);
  color: #fca5a5;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  white-space: nowrap;
}
.sod-item-control { font-size: 0.78rem; color: var(--muted); }

/* ════════════════════════════════════
   TIMELINE
════════════════════════════════════ */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-left: 2rem;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--gold), rgba(245,158,11,0.1));
}
.tl-item {
  padding-bottom: 2rem;
  position: relative;
  padding-left: 1.5rem;
}
.tl-dot {
  position: absolute;
  left: -2rem;
  top: 4px;
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 2px solid;
  transform: translateX(-50%);
}
.tl-dot.done { background: var(--gold); border-color: var(--gold); }
.tl-dot.todo { background: var(--dark2); border-color: rgba(245,158,11,0.3); }
.tl-phase {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  color: var(--gold);
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}
.tl-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 3px; display: flex; align-items: center; gap: 8px; }
.tl-desc { font-size: 0.8rem; color: var(--muted); }
.tl-badge {
  background: rgba(245,158,11,0.15);
  color: var(--gold-lt);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.tl-badge.done { background: rgba(16,185,129,0.15); color: #6ee7b7; }

/* ════════════════════════════════════
   UAT TABLE
════════════════════════════════════ */
.uat-filters {
  display: flex;
  gap: 8px;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}
.uat-filter-btn {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--dark2);
  color: var(--muted);
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
}
.uat-filter-btn:hover { border-color: rgba(255,255,255,0.2); color: #fff; }
.uat-filter-btn.active { background: var(--dark3); border-color: var(--gold); color: var(--gold-lt); }

.uat-table {
  width: 100%;
  border-collapse: collapse;
}
.uat-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--muted);
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}
.uat-table td {
  padding: 0.85rem 1rem;
  font-size: 0.82rem;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  vertical-align: middle;
}
.uat-table tr:hover td { background: rgba(255,255,255,0.02); }
.uat-id {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  color: var(--gold);
  font-weight: 500;
}
.uat-title { color: rgba(232,228,220,0.85); }
.uat-module {
  font-size: 0.72rem;
  padding: 3px 10px;
  border-radius: 5px;
  font-weight: 600;
  white-space: nowrap;
}
.uat-p1 { background: rgba(220,38,38,0.15); color: #fca5a5; }
.uat-p2 { background: rgba(245,158,11,0.12); color: #fcd34d; }
.uat-status-wrap { display: flex; gap: 6px; }
.uat-status-btn {
  width: 28px; height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.04);
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.uat-status-btn:hover { border-color: rgba(255,255,255,0.2); }
.uat-status-btn.pass  { background: rgba(16,185,129,0.2); border-color: #10b981; color: #6ee7b7; }
.uat-status-btn.fail  { background: rgba(220,38,38,0.2);  border-color: #dc2626; color: #fca5a5; }
.uat-status-btn.open  { background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.3); color: #fcd34d; }

/* ── Stats bar at top ── */
.uat-stats {
  display: flex;
  gap: 14px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.uat-stat {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.75rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}
.uat-stat-n {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.6rem;
  line-height: 1;
  letter-spacing: 0.04em;
}
.uat-stat-l { font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }

/* ── Animations ── */
@keyframes sap-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.sap-anim { animation: sap-up 0.35s ease; }

/* ── MDR Map special ── */
.mdr-chain {
  display: flex;
  align-items: stretch;
  gap: 0;
  overflow-x: auto;
  padding: 1.5rem 0;
  -webkit-overflow-scrolling: touch;
}
.mdr-step {
  flex: 1;
  min-width: 130px;
  max-width: 160px;
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.1rem;
  text-align: center;
  flex-shrink: 0;
}
.mdr-step-emoji { font-size: 1.75rem; display: block; margin-bottom: 6px; }
.mdr-step-title { font-size: 0.78rem; font-weight: 700; color: #fff; margin-bottom: 4px; line-height: 1.3; }
.mdr-step-sub { font-size: 0.65rem; color: var(--muted); line-height: 1.4; }
.mdr-arrow {
  color: rgba(245,158,11,0.4);
  font-size: 1.4rem;
  padding: 0 6px;
  align-self: center;
  flex-shrink: 0;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .proc-map { grid-template-columns: 1fr; }
  .mod-grid  { grid-template-columns: 1fr; }
  .roles-grid { grid-template-columns: repeat(2, 1fr); }
  .sod-item { grid-template-columns: 1fr; }
  .sap-header h1 { font-size: 2.5rem; }
}
`;

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function SAPUniverse() {
  const [activeTab, setActiveTab] = useState('map');
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [expandedMod, setExpandedMod] = useState<string | null>(null);
  const [uatFilter, setUatFilter] = useState('all');
  const [uatStatuses, setUatStatuses] = useState<Record<string, 'open' | 'pass' | 'fail'>>(() =>
    Object.fromEntries(UAT_TESTS.map(t => [t.id, 'open']))
  );

  const tabs = [
    { id: 'map',      label: '🗺️  Prozesslandschaft' },
    { id: 'modules',  label: '📦  SAP Module' },
    { id: 'mdr',      label: '🛡️  MDR-Compliance' },
    { id: 'roles',    label: '👥  Rollen & Rechte' },
    { id: 'timeline', label: '📅  Zeitplan' },
    { id: 'uat',      label: '🧪  UAT Tracker' },
  ];

  const uatFiltered = uatFilter === 'all'
    ? UAT_TESTS
    : UAT_TESTS.filter(t =>
        uatFilter === 'pass' ? uatStatuses[t.id] === 'pass'
        : uatFilter === 'fail' ? uatStatuses[t.id] === 'fail'
        : uatFilter === 'open' ? uatStatuses[t.id] === 'open'
        : t.module === uatFilter
      );

  const passCnt = Object.values(uatStatuses).filter(s => s === 'pass').length;
  const failCnt = Object.values(uatStatuses).filter(s => s === 'fail').length;
  const openCnt = Object.values(uatStatuses).filter(s => s === 'open').length;
  const progress = Math.round((passCnt / UAT_TESTS.length) * 100);

  const setUatStatus = (id: string, status: 'pass' | 'fail' | 'open') => {
    setUatStatuses(prev => ({ ...prev, [id]: prev[id] === status ? 'open' : status }));
  };

  return (
    <Layout>
      <Head>
        <title>SAP Universum – EMIG GmbH</title>
        <style>{CSS}</style>
      </Head>

      <div className="sap-root">
        {/* ── Header ── */}
        <div className="sap-header">
          <div className="sap-header-eyebrow">SAP Business One Cloud · EMIG GmbH</div>
          <h1>SAP <span>Universum</span></h1>
          <p className="sap-header-sub">
            Interaktive Prozesslandschaft, Module und UAT-Tracker für die vollständige SAP-Implementierung der EMIG GmbH Deutschland.
          </p>
          <div className="sap-header-meta">
            <div className="sap-meta-item"><div className="sap-meta-dot" /> Go-Live: November 2026</div>
            <div className="sap-meta-item"><div className="sap-meta-dot" /> MDR 2017/745 konform</div>
            <div className="sap-meta-item"><div className="sap-meta-dot" /> {MODULES.length} Module · {PROCESS_STEPS.length} Prozessschritte</div>
            <div className="sap-meta-item"><div className="sap-meta-dot" /> MiaMed Ukraine Q1/2027</div>
          </div>
        </div>

        {/* ── Nav ── */}
        <nav className="sap-nav">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`sap-nav-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="sap-content">

          {/* ════════════════════════════════════
              TAB: PROCESS MAP
          ════════════════════════════════════ */}
          {activeTab === 'map' && (
            <div className="sap-anim">
              <div className="sap-section-h">Vollständige Prozesslandschaft</div>
              <p className="sap-section-sub">
                Klicken Sie auf einen Prozessschritt, um Details zu sehen. Der gesamte Kreislauf von Kundenanfrage bis proaktiver Kundenbindung.
              </p>

              {/* Flow row - scrollable horizontal */}
              <div className="proc-flow-row">
                {PROCESS_STEPS.map((step, i) => (
                  <React.Fragment key={step.id}>
                    <div
                      className={`proc-flow-card ${activeStep === step.id ? 'active' : ''}`}
                      onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                      style={{ borderColor: activeStep === step.id ? step.color : undefined }}
                    >
                      <span className="proc-flow-emoji">{step.emoji}</span>
                      <div className="proc-flow-label">{step.title}</div>
                    </div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="proc-flow-arrow">→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Expanded detail */}
              {activeStep && (() => {
                const step = PROCESS_STEPS.find(s => s.id === activeStep)!;
                return (
                  <div className="proc-detail-panel" style={{ borderLeftColor: step.color }}>
                    <div className="proc-dp-title">
                      <span className="proc-dp-emoji">{step.emoji}</span>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: step.color, textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 2 }}>
                          Phase {step.phase}
                        </div>
                        <div className="proc-dp-h">{step.title} — {step.subtitle}</div>
                      </div>
                    </div>
                    <div className="proc-dp-items">
                      {step.details.map((d, i) => (
                        <div className="proc-dp-item" key={i}>
                          <span className="proc-dp-item-icon">{d.icon}</span>
                          <span className="proc-dp-item-text">{d.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Card grid */}
              <div className="proc-map">
                {PROCESS_STEPS.map(step => (
                  <div
                    key={step.id}
                    className={`proc-step ${activeStep === step.id ? 'active' : ''}`}
                    style={{ ['--active-color' as any]: step.color }}
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: step.color, borderRadius: '14px 14px 0 0', opacity: 0.7 }} />
                    <div className="proc-step-top">
                      <span className="proc-emoji">{step.emoji}</span>
                      <div>
                        <div className="proc-phase">Phase {step.phase}</div>
                        <div className="proc-title">{step.title}</div>
                        <div className="proc-subtitle">{step.subtitle}</div>
                      </div>
                    </div>
                    <div className="proc-details">
                      {step.details.slice(0, 3).map((d, i) => (
                        <div className="proc-detail-item" key={i}>
                          <span className="proc-detail-icon">{d.icon}</span>
                          <span>{d.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              TAB: MODULES
          ════════════════════════════════════ */}
          {activeTab === 'modules' && (
            <div className="sap-anim">
              <div className="sap-section-h">SAP Module & Kernfunktionen</div>
              <p className="sap-section-sub">
                Alle {MODULES.length} SAP Business One Module der EMIG GmbH. Klicken Sie auf „Mehr erfahren" für eine Tiefenanalyse.
              </p>
              <div className="mod-grid">
                {MODULES.map(mod => (
                  <div
                    key={mod.id}
                    className={`mod-card ${expandedMod === mod.id ? 'expanded' : ''}`}
                    style={{ ['--mod-color' as any]: mod.color }}
                  >
                    <div className="mod-card-header" onClick={() => setExpandedMod(expandedMod === mod.id ? null : mod.id)}>
                      <div className="mod-icon" style={{ background: mod.accent }}>
                        <span style={{ fontSize: '1.5rem' }}>{mod.icon}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="mod-ref">{mod.ref}</div>
                        <div className="mod-title">{mod.title}</div>
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
                        {expandedMod === mod.id ? '▲' : '▼'}
                      </div>
                    </div>

                    <div className="mod-card-body">
                      <div className="mod-highlights">
                        {mod.highlights.map((h, i) => (
                          <div className="mod-hl" key={i}>{h}</div>
                        ))}
                      </div>
                      <div className="mod-kpis">
                        {mod.kpis.map((k, i) => (
                          <div className="mod-kpi" key={i}>
                            <div className="mod-kpi-val" style={{ color: mod.color }}>
                              {k.icon} {k.value}
                            </div>
                            <div className="mod-kpi-label">{k.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {expandedMod === mod.id && (
                      <div className="mod-deep" style={{ borderTopColor: `${mod.color}30` }}>
                        {mod.deep}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              TAB: MDR COMPLIANCE
          ════════════════════════════════════ */}
          {activeTab === 'mdr' && (
            <div className="sap-anim">
              <div className="sap-section-h">🛡️ MDR-Compliance Kette</div>
              <p className="sap-section-sub">
                EU Medical Device Regulation 2017/745 — lückenlose Integration in jeden SAP-Prozessschritt.
              </p>

              {/* Chain */}
              <div className="mdr-chain">
                {[
                  { emoji: '📦', title: 'Wareneingang', sub: 'UDI-Scan\nCE/DoC-Prüfung\nCharge + MHD' },
                  { emoji: '🛡️', title: 'MDR-Gate', sub: 'CE fehlt?\n→ Automatische Sperre\nKein WE möglich' },
                  { emoji: '🏪', title: 'Lagerung', sub: 'Haupt-/Sperrlager\nMHD-Monitoring\n60-Tage-Alarm' },
                  { emoji: '📋', title: 'Kommissionierung', sub: 'DoC-Prüfung\nQR-Scan Pflicht\nCharge zugeordnet' },
                  { emoji: '🚚', title: 'Versand', sub: 'UDI-Etiketten\nLieferschein+MHD\nEquip. Card eröffnet' },
                  { emoji: '🔧', title: 'Service', sub: 'Field Safety Notice\nRückruf-Workflow\nBfArM-Berichte' },
                  { emoji: '🔍', title: 'Rückverfolgung', sub: 'Vorwärts: Empfänger\nRückwärts: Lieferant\n< 5 Sekunden' },
                ].map((item, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="mdr-step">
                      <span className="mdr-step-emoji">{item.emoji}</span>
                      <div className="mdr-step-title">{item.title}</div>
                      <div className="mdr-step-sub">{item.sub}</div>
                    </div>
                    {i < arr.length - 1 && <div className="mdr-arrow">→</div>}
                  </React.Fragment>
                ))}
              </div>

              {/* Escalation table */}
              <div style={{ marginTop: '2.5rem' }}>
                <div className="sap-section-h" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚨 Eskalations-Workflow</div>
                <p className="sap-section-sub">3-Stufen Service + MDR-Rückruf mit verbindlichen SLA-Fristen</p>

                {[
                  { stufe: '1', emoji: '🔍', title: 'Interne Diagnose', sla: '4 Stunden', trigger: 'Eingang Servicemeldung', color: '#10b981',
                    actions: ['Geräteakte (Equipment Card) geladen', 'Knowledge Base durchsucht', 'Interne Problemlösung angewendet', 'Falls keine Lösung: Eskalation zu Stufe 2'] },
                  { stufe: '2', emoji: '📡', title: 'Herstellermeldung', sla: '24 Stunden', trigger: 'Keine interne Lösung / sicherheitsrelevant', color: '#f59e0b',
                    actions: ['Automatisch: Seriennummer + Fehlerprotokoll', 'Fotos/Anhänge direkt am Serviceabruf', 'Status: "Eskaliert – Hersteller informiert"', 'SLA-Uhr für Herstellerantwort gestartet'] },
                  { stufe: '3', emoji: '🚨', title: 'Field Safety / Rückruf', sla: '2 Stunden (!)', trigger: 'Systematischer Defekt / FSN des Herstellers', color: '#dc2626',
                    actions: ['Vorwärtssuche: alle Empfänger der Charge', 'Rückwärtssuche: Ursprungslieferant', 'Status "Under Recall" systemweit', 'BfArM-Berichte automatisch generiert'] },
                ].map(s => (
                  <div key={s.stufe} style={{
                    background: 'var(--dark2)',
                    border: `1px solid ${s.color}30`,
                    borderLeft: `4px solid ${s.color}`,
                    borderRadius: 12,
                    padding: '1.5rem',
                    marginBottom: 10,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.75rem' }}>{s.emoji}</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: s.color, fontWeight: 600 }}>Stufe {s.stufe}</span>
                          <span style={{ background: `${s.color}20`, color: s.color, padding: '2px 10px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700 }}>SLA: {s.sla}</span>
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginTop: 2 }}>{s.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Auslöser: {s.trigger}</div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
                      {s.actions.map((a, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '0.7rem 0.9rem', fontSize: '0.8rem', color: 'rgba(232,228,220,0.7)', display: 'flex', gap: 8 }}>
                          <span style={{ color: s.color, flexShrink: 0 }}>›</span>
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              TAB: ROLES
          ════════════════════════════════════ */}
          {activeTab === 'roles' && (
            <div className="sap-anim">
              <div className="sap-section-h">Rollen & Berechtigungen</div>
              <p className="sap-section-sub">
                Rollenbasiertes Berechtigungskonzept nach DSGVO & GoBD — Prinzip der minimalen Privilegien
              </p>

              <div className="roles-grid">
                {ROLES.map(r => (
                  <div className="role-card" key={r.id}>
                    <div className="role-icon" style={{ background: `${r.color}20` }}>
                      <span style={{ fontSize: '1.4rem' }}>{r.icon}</span>
                    </div>
                    <div className="role-badge" style={{ background: `${r.color}20`, color: r.color }}>{r.badge}</div>
                    <div className="role-title">{r.title}</div>
                    <div className="role-modules">{r.modules}</div>
                  </div>
                ))}
              </div>

              {/* SoD conflicts */}
              <div style={{ marginTop: '2.5rem' }}>
                <div className="sap-section-h" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⛔ Segregation of Duties</div>
                <p className="sap-section-sub">Kritische Berechtigungskombinationen — systemseitig gesperrt</p>

                <div className="sod-grid">
                  {[
                    { a: 'Angebot erstellen', b: 'Kundenauftrag freigeben (selbe Person)', risk: 'Falschbuchung ohne Kontrolle', ctrl: '4-Augen: GF-Freigabe zwingend' },
                    { a: 'Warenausgang buchen', b: 'Rechnung erstellen', risk: 'Fiktive Lieferungen möglich', ctrl: 'Trennung: Lager ↔ Finanzen' },
                    { a: 'Lieferantenstamm anlegen', b: 'Bestellung auslösen', risk: 'Phantomlieferanten-Betrug', ctrl: 'Doppelfreigabe: Einkauf + GF' },
                    { a: 'DATEV-Export', b: 'Buchungen stornieren', risk: 'Nachträgliche Manipulation', ctrl: 'Nur IT-Admin + Finanzen gemeinsam' },
                    { a: 'Zahlungssperre aufheben', b: 'Zahlung auslösen', risk: 'Unberechtigte Zahlungen', ctrl: 'GF-Freigabe zwingend' },
                  ].map((item, i) => (
                    <div className="sod-item" key={i}>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(252,165,165,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>Verbotene Kombination</div>
                        <div className="sod-item-conflict">🚫 {item.a}<br /><span style={{ opacity: 0.7 }}>+ {item.b}</span></div>
                      </div>
                      <div>
                        <div className="sod-item-badge">Risiko: {item.risk}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(110,231,183,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>Kontrolle</div>
                        <div style={{ fontSize: '0.8rem', color: '#6ee7b7' }}>✓ {item.ctrl}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Onboarding */}
                <div style={{ marginTop: '2rem' }}>
                  <div className="sap-section-h" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👤 Onboarding-Prozess</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                    {[
                      { n: '1', emoji: '📋', t: 'Antragstellung', d: 'Abteilungsleiter beantragt Rolle' },
                      { n: '2', emoji: '🔍', t: 'SoD-Prüfung', d: 'IT-Admin prüft Konflikte' },
                      { n: '3', emoji: '✅', t: 'GF-Genehmigung', d: 'Finale Freigabe durch GF' },
                      { n: '4', emoji: '⚙️', t: 'SAP-Anlage', d: 'Technische Einrichtung' },
                      { n: '5', emoji: '🎓', t: 'Schulung', d: 'Fachspezifische Systemschulung' },
                      { n: '6', emoji: '🔑', t: 'Erstlogin', d: 'Passwort sofort ändern' },
                    ].map(s => (
                      <div key={s.n} style={{ background: 'var(--dark2)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: 'rgba(245,158,11,0.4)', letterSpacing: '0.04em' }}>0{s.n}</div>
                        <div style={{ fontSize: '1.4rem', margin: '4px 0' }}>{s.emoji}</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: 3 }}>{s.t}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{s.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              TAB: TIMELINE
          ════════════════════════════════════ */}
          {activeTab === 'timeline' && (
            <div className="sap-anim">
              <div className="sap-section-h">Projektzeitplan 2026–2027</div>
              <p className="sap-section-sub">
                8 Monate bis Go-Live EMIG Deutschland · Q1/2027 MiaMed Ukraine
              </p>

              {/* Progress bar */}
              <div style={{ background: 'var(--dark2)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, marginBottom: 8 }}>Projektfortschritt</div>
                  <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: '25%', height: '100%', background: 'linear-gradient(90deg, var(--gold), var(--gold-lt))', borderRadius: 99, transition: 'width 1s' }} />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 6 }}>Phase 2 von 8 abgeschlossen (Feb–März 2026)</div>
                </div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', color: 'var(--gold-lt)', letterSpacing: '0.04em' }}>25%</div>
              </div>

              <div className="timeline">
                {TIMELINE.map((item, i) => (
                  <div className="tl-item" key={i}>
                    <div className={`tl-dot ${item.done ? 'done' : 'todo'}`} />
                    <div className="tl-phase">{item.phase}</div>
                    <div className="tl-title">
                      <span>{item.emoji}</span>
                      {item.title}
                      <span className={`tl-badge ${item.done ? 'done' : ''}`}>
                        {item.done ? 'Abgeschlossen' : 'Geplant'}
                      </span>
                    </div>
                    <div className="tl-desc">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Budget / scope */}
              <div style={{ marginTop: '2rem' }}>
                <div className="sap-section-h" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋 Rahmenbedingungen</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                  {[
                    { emoji: '💰', t: 'Festpreis', d: 'Implementierung + Customizing + Schulung als Festpreis' },
                    { emoji: '☁️', t: 'SaaS / Cloud', d: 'Deutsches Rechenzentrum — keine eigene Hardware' },
                    { emoji: '🗣️', t: 'Sprache', d: 'Vollständig Deutsch: UI, Doku, Schulung' },
                    { emoji: '👤', t: 'Fester PM', d: 'Ein dedizierter Projektleiter je Seite' },
                    { emoji: '🧪', t: 'Testsystem', d: 'Bereitstellung vor Go-Live zwingend' },
                    { emoji: '📊', t: 'Echtdaten', d: 'Schulung mit echten EMIG-Stammdaten' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: 'var(--dark2)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.1rem' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{item.emoji}</div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem', marginBottom: 3 }}>{item.t}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.5 }}>{item.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              TAB: UAT TRACKER
          ════════════════════════════════════ */}
          {activeTab === 'uat' && (
            <div className="sap-anim">
              <div className="sap-section-h">🧪 UAT Test-Tracker</div>
              <p className="sap-section-sub">
                Interaktiver Abnahme-Tracker — klicken Sie ✓ / ✗ um den Teststatus zu setzen.
              </p>

              {/* Stats */}
              <div className="uat-stats">
                <div className="uat-stat">
                  <div className="uat-stat-n" style={{ color: '#6ee7b7' }}>{passCnt}</div>
                  <div><div className="uat-stat-l">Bestanden</div></div>
                </div>
                <div className="uat-stat">
                  <div className="uat-stat-n" style={{ color: '#fca5a5' }}>{failCnt}</div>
                  <div><div className="uat-stat-l">Fehler</div></div>
                </div>
                <div className="uat-stat">
                  <div className="uat-stat-n" style={{ color: '#fcd34d' }}>{openCnt}</div>
                  <div><div className="uat-stat-l">Offen</div></div>
                </div>
                <div className="uat-stat" style={{ flex: 1 }}>
                  <div style={{ flex: 1 }}>
                    <div className="uat-stat-l" style={{ marginBottom: 8 }}>Gesamtfortschritt</div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: 99, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                  <div className="uat-stat-n" style={{ color: '#34d399', minWidth: 56, textAlign: 'right' }}>{progress}%</div>
                </div>
              </div>

              {/* Filters */}
              <div className="uat-filters">
                {['all', 'open', 'pass', 'fail', 'Vertrieb', 'Einkauf', 'Lager', 'Finanzen', 'Service', 'Intercompany'].map(f => (
                  <button
                    key={f}
                    className={`uat-filter-btn ${uatFilter === f ? 'active' : ''}`}
                    onClick={() => setUatFilter(f)}
                  >
                    {f === 'all' ? 'Alle' : f === 'open' ? '⏳ Offen' : f === 'pass' ? '✓ Bestanden' : f === 'fail' ? '✗ Fehler' : f}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div style={{ background: 'var(--dark2)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                <table className="uat-table">
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
                    {uatFiltered.map(test => {
                      const status = uatStatuses[test.id];
                      return (
                        <tr key={test.id}>
                          <td><span className="uat-id">{test.id}</span></td>
                          <td>
                            <span className="uat-module" style={{
                              background: {Vertrieb:'#6366f120',Einkauf:'#f59e0b20',Lager:'#10b98120',Finanzen:'#dc262620',Service:'#7c3aed20',Intercompany:'#0d948820'}[test.module] || '#ffffff10',
                              color: {Vertrieb:'#a5b4fc',Einkauf:'#fcd34d',Lager:'#6ee7b7',Finanzen:'#fca5a5',Service:'#c4b5fd',Intercompany:'#5eead4'}[test.module] || '#fff',
                            }}>
                              {test.module}
                            </span>
                          </td>
                          <td><span className="uat-title">{test.title}</span></td>
                          <td><span className={test.prio === 'P1' ? 'uat-module uat-p1' : 'uat-module uat-p2'}>{test.prio}</span></td>
                          <td>
                            <div className="uat-status-wrap">
                              <button
                                className={`uat-status-btn ${status === 'pass' ? 'pass' : ''}`}
                                onClick={() => setUatStatus(test.id, 'pass')}
                                title="Bestanden"
                              >✓</button>
                              <button
                                className={`uat-status-btn ${status === 'fail' ? 'fail' : ''}`}
                                onClick={() => setUatStatus(test.id, 'fail')}
                                title="Fehler"
                              >✗</button>
                              <button
                                className={`uat-status-btn ${status === 'open' ? 'open' : ''}`}
                                onClick={() => setUatStatus(test.id, 'open')}
                                title="Offen"
                              >⏳</button>
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
    </Layout>
  );
}