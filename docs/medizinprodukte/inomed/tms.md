---
id: tms
title: Rapid² TMS — INO-02
sidebar_label: Rapid² TMS
---

import Admonition from '@theme/Admonition';

# ⚡ Rapid² TMS — INO-02

<div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'1.5rem'}}>
  <span style={{background:'rgba(21,101,192,.12)',border:'1px solid rgba(21,101,192,.3)',color:'#1565c0',fontSize:'.72rem',fontWeight:700,padding:'4px 12px',borderRadius:'99px',letterSpacing:'.06em',textTransform:'uppercase'}}>INO-02</span>
  <span style={{background:'rgba(123,31,162,.1)',border:'1px solid rgba(123,31,162,.25)',color:'#7b1fa2',fontSize:'.72rem',fontWeight:600,padding:'4px 12px',borderRadius:'99px'}}>Transkranielle Magnetstimulation</span>
  <span style={{background:'#fef9ee',border:'1px solid #fde68a',color:'#92400e',fontSize:'.72rem',fontWeight:600,padding:'4px 12px',borderRadius:'99px'}}>⚠️ Spezialsystem — Schulung erforderlich</span>
</div>

## Systemübersicht

Das **Rapid²** (Rapid-rate Transcranial Magnetic Stimulator) ist das führende repetitive Transkranielle Magnetstimulations-System von inomed. Es wird sowohl **präoperativ für kortikales Mapping** als auch **therapeutisch** in der Neurologie und Psychiatrie eingesetzt.

<Admonition type="warning" title="Anwendungsvoraussetzung">
  Die Anwendung des Rapid² TMS erfordert eine zertifizierte Schulung durch inomed. Nicht zertifiziertes Personal darf das System nicht selbstständig betreiben.
</Admonition>

---

## Technische Spezifikationen

| Parameter | Wert |
|---|---|
| Max. Feldstärke | **2,2 Tesla** (Spulenoberfläche) |
| Stimulationsfrequenz | 0,1 – 100 Hz (rTMS) |
| Max. Stimulationsintensität | 110 % der motorischen Schwelle |
| Pulsformen | Monophasisch · Biphasisch · Triphasisch |
| Spulentemperatur-Überwachung | Automatisch — Überhitzungsschutz |
| Abkühlsystem | Aktive Luftkühlung (integriert) |
| Betriebsspannung | 200–240 V AC, 50/60 Hz |
| Gewicht | 26 kg (Gerät) + Stativ |
| Zulassung | CE · FDA 510(k) |

---

## Spulentypen

### Figure-8-Spule (Standard)

```
Fokaldurchmesser:  ~10–15 mm (tief 2–3 cm)
Anwendung:         Motorisches Kortex-Mapping
                   Präzise Lokalisation motorischer Areale
                   Präoperative Funktionskartierung
Besonderheit:      Fokale Stimulation — geringe Nebenwirkungen
```

### H-Spule (Deep TMS)

```
Stimulationstiefe: Bis 6 cm (Tiefenhirnstrukturen)
Anwendung:         Depression · OCD · Sucht
                   Therapeutische rTMS-Protokolle
Besonderheit:      Zulassung für psychiatrische Indikationen
```

### Double-Cone-Spule

```
Anwendung:         Beinbereich · tiefer liegender Kortex
                   Mapping bei adipösen Patienten
Tiefe:             3–4 cm
```

---

## Klinische Anwendungen

### 1. Präoperatives Kortex-Mapping (Hauptanwendung)

Vor neurochirurgischen Eingriffen in der Nähe motorischer oder sprachlicher Areale wird das Rapid² TMS eingesetzt, um funktionelle Kortexareale präzise zu lokalisieren:

| Mapping-Typ | Ziel | Methode |
|---|---|---|
| Motorisches Mapping | Handmuskeln · Fußmuskeln · Gesicht | MEP-Auslösung über Figure-8 |
| Sprachmapping | Broca-Areal · Wernicke-Areal | Sprach-Inhibition (rTMS 1 Hz) |
| Somatosensorisches Mapping | Sensorische Rinde | SSEP-gestützt |

### 2. Navigation-gestütztes Mapping (nTMS)

In Kombination mit **BrainSight 2 (Rogue Research)** oder **Localite TMS Navigator**:

```
① MRT-Import (DICOM) ins Navigationssystem
② Koregistrierung Patient ↔ MRT (Landmarks/Marker)
③ Spulenposition in Echtzeit auf MRT projiziert
④ MEP-Antworten werden direkt auf 3D-Hirnmodell kartiert
⑤ Ergebnis: Funktionelle Risikokarte für OP-Planung
```

<Admonition type="tip" title="Klinischer Vorteil nTMS">
  Navigiertes TMS-Mapping reduziert intraoperative Mapping-Zeit und schützt Areale, die ohne Mapping unentdeckt bleiben würden. Besonders wertvoll bei Tumoren in der Nähe motorischer oder sprachlicher Zentren.
</Admonition>

### 3. Therapeutische rTMS

| Indikation | Protokoll | Evidenzgrad |
|---|---|---|
| Majore Depression | HF-rTMS DLPFC links · 10 Hz | Level A (Leitlinie) |
| Therapieresistente Depression | Deep TMS (H-Spule) | FDA-zugelassen |
| OCD | Deep TMS H7-Spule | FDA-zugelassen |
| Chronischer Schmerz | 1 Hz inhibitorisch | Level B |
| Tinnitus | 1 Hz auditiver Kortex | Off-label · Level C |

---

## Sicherheitsprotokoll

<Admonition type="danger" title="Absolute Kontraindikationen">
  - Metallische Implantate im Kopfbereich (Aneurysmclips, Cochlea-Implantate, Hirnschrittmacher)
  - Aktive Herzschrittmacher oder implantierbare Defibrillatoren
  - Epilepsie oder erhöhte Krampfschwelle (relative KI — Risiko-Nutzen-Abwägung)
  - Schwangerschaft (präoperatives Mapping: individuell abzuwägen)
</Admonition>

### Vor jeder Anwendung

1. ✅ Kontraindikations-Checkliste vollständig ausgefüllt
2. ✅ Motorische Schwelle bestimmt (Standard: 10 Pulse à 1 Hz)
3. ✅ Notfallausrüstung (Antiepileptika) griffbereit
4. ✅ Patient über Risiken aufgeklärt — schriftliche Einwilligung
5. ✅ Spulentemperatur < 41 °C (automatische Überwachung)

---

## Stimulationsprotokolle (Kurzübersicht)

| Protokoll | Frequenz | Pulszahl | Pause | Indikation |
|---|---|---|---|---|
| Einzelpuls | 0,25 Hz | 1–10 | — | Motorische Schwelle |
| Niedrigfrequenz | 1 Hz | 900/Sitzung | — | Inhibition · Schmerz |
| Hochfrequenz | 10 Hz | 2.000/Sitzung | 30 s inter-Train | Depression |
| Theta-Burst (TBS) | 50 Hz / 5 Hz | 600 | — | Schnellprotokoll |
| iTBS | 50 Hz · 5 Hz | 600 | Wechsel | Exzitatorisch |

---

## MDR-Konformität & Dokumentation

```
Klassifizierung:   Klasse IIb (Aktives Medizinprodukt · nicht implantierbar)
CE-Kennzeichnung:  CE 0123 · FDA 510(k) K163146
Zulassung DE:      BfArM-Meldung bei Anwendung (Klasse IIb)
Schulungspflicht:  Zertifikat inomed TMS Academy erforderlich
Wartungsintervall: 12 Monate durch inomed-Servicetechniker
Kalibrierung:      Spulenkalibrierung jährlich
```

---

## Lagerung & Handhabung (EMIG-intern)

| Kriterium | Vorgabe |
|---|---|
| Betriebstemperatur | +15 °C bis +35 °C |
| Spulenlagerung | Aufgehängt oder liegend — kein Druck auf Spulenkabel |
| Reinigung Spule | Wischdesinfektion (Alkohol-frei!) — nur Hersteller-Tuch |
| Kabelprüfung | Vor jedem Einsatz — keine Knicke, keine Risse |
| Equipment Card | SAP — Seriennummer · Kalibrierungsdatum |
| Loaner-Verfügbarkeit | Auf Anfrage EMIG — 48 h Vorlauf |

---

## Weiterführende Links

- 🌐 [Herstellerseite inomed TMS](https://www.inomed.com/produkte/magnetstimulation/)
- 📄 [Rapid² Produktseite](https://www.inomed.com)
- 🔗 [← Zurück zur inomed Übersicht](/docs/medizinprodukte/inomed/tms)