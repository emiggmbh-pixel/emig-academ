export const sapProcessPhases = [
  {
    id: 'vertrieb',
    title: 'Vertrieb & Angebot',
    icon: '📋',
    color: '#e65100',
    steps: [
      { label: 'Anfrageeingang', detail: 'Kunde sendet Anfrage per E-Mail oder Formular. Erfassung im CRM.' },
      { label: 'CRM & Kalkulation', detail: 'Auswahl des Kunden in SAP. Das System zeigt Einkaufspreis und Marge automatisch an.' },
      { label: 'PDF-Angebot', detail: 'Angebot wird direkt aus SAP als PDF generiert und an den Kunden versendet.' },
      { label: 'Kundenauftrag', detail: 'Umwandlung des Angebots in einen Auftrag per Klick. Bestandsreservierung erfolgt automatisch.' }
    ]
  },
  {
    id: 'beschaffung',
    title: 'Beschaffung & Wareneingang',
    icon: '📦',
    color: '#0070f3',
    steps: [
      { label: 'Bestellvorschläge', detail: 'SAP prüft Mindestbestände und generiert automatische Nachbestellvorschläge.' },
      { label: 'Lieferantenbestellung', detail: 'Bestellung beim Lieferanten in Einkaufseinheiten (Karton/Palette).' },
      { label: 'Wareneingang', detail: 'Physische Lieferung wird gebucht (z.B. 150 Stück ins Lager).' },
      { label: 'MDR-Check', detail: 'Scan von UDI/Barcode, Erfassung von Charge und Mindesthaltbarkeitsdatum.' }
    ]
  },
  {
    id: 'lager',
    title: 'Lager & Versand',
    icon: '🏭',
    color: '#4caf50',
    steps: [
      { label: 'Pickliste', detail: 'Trigger: Kundenauftrag ist freigegeben. Erstellung der Entnahmeliste.' },
      { label: 'MDR-Pflicht', detail: 'Lagerist scannt beim Entnehmen die konkrete Charge für den jeweiligen Kunden.' },
      { label: 'Versand', detail: 'Verpackung und Erstellung der vollständigen Lieferpapiere in SAP.' }
    ]
  },
  {
    id: 'service',
    title: 'Service-Prozess',
    icon: '🔧',
    color: '#7b1fa2',
    steps: [
      { label: 'Serviceabruf', detail: 'Anlage eines Serviceauftrags (Vor-Ort-Einsatz oder Rücksendung/RMA).' },
      { label: 'Ersatzteilmanagement', detail: 'Entnahme vom Techniker-Wagen oder direkt aus dem Hauptlager.' },
      { label: 'Equipment-Update', detail: 'Aktualisierung der Seriennummern in der Gerätestammkarte.' }
    ]
  },
  {
    id: 'faktura',
    title: 'Fakturierung & Abschluss',
    icon: '💶',
    color: '#c62828',
    steps: [
      { label: 'Rechnungserstellung', detail: 'Automatische Rechnungsgenerierung aus dem Lieferschein in SAP.' },
      { label: 'Versand & Archivierung', detail: 'Rechnung per E-Mail an den Kunden, digitale Archivierung GoBD-konform.' },
      { label: 'Zahlungseingang', detail: 'Buchung des Zahlungseingangs und automatischer Abgleich mit offenem Posten.' }
    ]
  }
];