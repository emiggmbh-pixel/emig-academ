export const sapProcessPhases = [
  {
    id: 'vertrieb',
    title: 'Vertrieb & Angebot',
    color: '#e65100',
    steps: [
      { label: 'Anfrageeingang', detail: 'Kunde sieht Produkt im digitalen Katalog und sendet Anfrage per E-Mail/Formular.' },
      { label: 'SAP CRM Auswahl', detail: 'Auswahl des Kunden und Kalkulation. SAP zeigt Einkaufspreis und Marge an.' },
      { label: 'PDF-Angebot', detail: 'Erstellung und Versand des Angebots direkt aus SAP an den Kunden.' },
      { label: 'Kundenauftrag', detail: 'Umwandlung des Angebots in einen Auftrag mit einem Klick. Bestandsreservierung findet statt.' }
    ]
  },
  {
    id: 'beschaffung',
    title: 'Beschaffung & Wareneingang',
    color: '#0070f3',
    steps: [
      { label: 'Bestellvorschlag', detail: 'SAP prüft Mindestbestände und generiert automatische Vorschläge.' },
      { label: 'Lieferantenbestellung', detail: 'Bestellung erfolgt in Einkaufseinheiten (z.B. Karton/Palette).' },
      { label: 'Wareneingang', detail: 'LKW liefert Ware. Buchung von z.B. 150 Stück ins Lager.' },
      { label: 'MDR-Check', detail: 'Scan von UDI/Barcode, Erfassung von Charge und Verfallsdatum.' }
    ]
  },
  {
    id: 'lager',
    title: 'Lager & Versand',
    color: '#4caf50',
    steps: [
      { label: 'Pickliste', detail: 'Trigger: Kundenauftrag ist freigegeben. Erstellung der Entnahmeliste.' },
      { label: 'MDR-Pflicht', detail: 'Lagerist scannt beim Entnehmen die konkrete Charge für den Kunden.' },
      { label: 'Versand', detail: 'Verpackung und Erstellung der Lieferpapiere in SAP.' }
    ]
  },
  {
    id: 'service',
    title: 'Service-Prozess',
    color: '#d32f2f',
    steps: [
      { label: 'Serviceabruf', detail: 'Anlage eines Serviceauftrags (Szenario A: Vor-Ort oder Szenario B: Rücksendung).' },
      { label: 'Ersatzteilmanagement', detail: 'Entnahme vom Techniker-Wagen oder Hauptlager.' },
      { label: 'Equipment-Update', detail: 'Aktualisierung der Stammkarte bei Austausch von Seriennummern.' }
    ]
  }
];