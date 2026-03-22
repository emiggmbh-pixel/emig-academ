---
id: polysomnographie
title: somno·medics PSG — INO-03
sidebar_label: somno·medics PSG
---

import Admonition from '@theme/Admonition';

# 😴 somno·medics PSG — INO-03

<div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'1.5rem'}}>
  <span style={{background:'rgba(21,101,192,.12)',border:'1px solid rgba(21,101,192,.3)',color:'#1565c0',fontSize:'.72rem',fontWeight:700,padding:'4px 12px',borderRadius:'99px',letterSpacing:'.06em',textTransform:'uppercase'}}>INO-03</span>
  <span style={{background:'rgba(6,95,70,.1)',border:'1px solid rgba(6,95,70,.25)',color:'#065f46',fontSize:'.72rem',fontWeight:600,padding:'4px 12px',borderRadius:'99px'}}>Ambulante Polysomnographie</span>
  <span style={{background:'#f0fdf4',border:'1px solid #bbf7d0',color:'#065f46',fontSize:'.72rem',fontWeight:600,padding:'4px 12px',borderRadius:'99px'}}>✅ AASM-konform · Level I & II</span>
</div>

## Systemübersicht

Das **somno·medics**-System ist eine vollständige ambulante Polysomnographie-Plattform, entwickelt von der somno·medics GmbH (Würzburg) — einem inomed-Partnerunternehmen. Es ermöglicht vollständige Schlaflabordiagnostik nach **AASM-Standard (Level I & II)** — kabellos, im Schlaflabor oder direkt beim Patienten zuhause.

---

## Gerätevarianten

| Variante | Level | Kanäle | Anwendung |
|---|---|---|---|
| **sOMNOscreen™ plus** | Level II | 19 EEG + Atmung + Körperlag | Ambulant zuhause |
| **sOMNOscreen™ EEG** | Level I | 32 EEG + Vollkanal-PSG | Schlaflabor |
| **sOMNOtouch™ RESP** | Level III | Atmung + SpO₂ + Lage | Screening Apnoe |

---

## Technische Spezifikationen (sOMNOscreen™ plus)

| Parameter | Wert |
|---|---|
| EEG-Kanäle | Bis zu **19 (10-20-System)** |
| EOG-Kanäle | 2 |
| EMG-Kanäle | 3 (Kinn + Bein) |
| EKG | 1-Kanal (Ableitung II) |
| Atmungskanäle | Nasaler Luftfluss · Thorax · Abdomen |
| Pulsoxymetrie | SpO₂ + Pulsfrequenz |
| Körperlage | 3-Achsen-Akzelerometer |
| Aufzeichnungsdauer | Bis zu **96 Stunden** |
| Datenübertragung | Bluetooth 4.0 · USB |
| Speicher | 8 GB intern (microSD) |
| Akku-Laufzeit | > 24 Stunden |
| Gewicht | 85 g |

---

## Somnologix-Software

Die **Somnologix**-Auswertungssoftware ist das Herzstück des somno·medics-Systems:

### Funktionen

- **Automatische Schlafstadien-Klassifikation** nach AASM R&K 2007
- **KI-gestützte Apnoe-Detektion** (Sensitivität > 90 %)
- **Hypnogramm-Darstellung** mit Trendanalyse
- **Artefakt-Erkennung** automatisch + manuell korrigierbar
- **Ereignis-Annotation:** Apnoen · Hypopnoen · RERA · PLM · Arousals
- **Berichterstellung:** Standardisierter AASM-Bericht in < 5 Minuten

### DICOM & KIS-Integration

```
Export-Formate:  PDF · EDF · EDF+ · CSV · HL7
KIS-Import:      Patientendaten via HL7 FHIR
PACS-Export:     DICOM-SR kompatibel
Netzwerk:        Serverbasiert (Klinik-Intranet) oder lokal
```

---

## Schlafdiagnostische Parameter

### PSG-Vollprofil (Level I/II)

| Parametergruppe | Gemessene Signale |
|---|---|
| **Schlaf-EEG** | Delta · Theta · Alpha · Beta · Sigma (Schlafspindeln) |
| **Augenbewegungen (EOG)** | REM-Identifikation |
| **Muskeltonus (EMG)** | Kinnmuskel · Tibialis anterior (PLM) |
| **Atmung** | Nasaler Flow · Thoraxexkursion · Abdomenexkursion |
| **Oxygenierung** | SpO₂ · Desaturierungsindex (ODI) |
| **Herz** | Herzfrequenz · RR-Intervall · Arrhythmien |
| **Körperlage** | Rücken · Seite · Bauch · aufrecht |
| **Schnarchen** | Mikrofon (optional) |

### Klinische Indizes (automatisch berechnet)

| Index | Bedeutung | Grenzwert |
|---|---|---|
| **AHI** | Apnoe-Hypopnoe-Index | Normal < 5/h |
| **ODI** | Oxygen Desaturation Index | Normal < 5/h |
| **SpO₂ min** | Minimale Sauerstoffsättigung | Normal > 90 % |
| **SE** | Schlafeffizienz | Normal > 85 % |
| **WASO** | Wake after sleep onset | Normal < 30 min |
| **PLM-Index** | Periodic Limb Movement Index | Normal < 15/h |

---

## AASM-Schlafstadien

Das System klassifiziert vollautomatisch nach AASM 2007:

| Stadium | Beschreibung | EEG-Merkmal |
|---|---|---|
| **W** | Wach | Alpha-Wellen · EMG hoch |
| **N1** | Einschlaf | Theta · Verlangsamung |
| **N2** | Leichtschlaf | **Schlafspindeln · K-Komplexe** |
| **N3** | Tiefschlaf | Delta ≥ 20 % |
| **R** | REM-Schlaf | Desynchronisiert · EMG ↓ · REMs |

---

## Klinische Indikationen

| Indikation | Empfohlenes System | EMIG-Relevanz |
|---|---|---|
| Obstruktive Schlafapnoe (OSA) | sOMNOscreen plus / sOMNOtouch RESP | ✅ Häufigste Indikation |
| Zentrale Schlafapnoe | sOMNOscreen EEG (vollständig) | ✅ |
| Narkolepsie-Verdacht | sOMNOscreen EEG + MSLT-Protokoll | ✅ |
| Restless-Legs / PLM | sOMNOscreen plus (Tibialis-EMG) | ✅ |
| REM-Schlaf-Verhaltensstörung | sOMNOscreen EEG (Vollkanal) | ✅ |
| Parasomnien | sOMNOscreen EEG | ✅ |
| CPAP-Titration | sOMNOscreen plus | ✅ |

<Admonition type="info" title="Ambulantes Monitoring">
  Der große Vorteil des somno·medics-Systems liegt im vollständig kabellosen, ambulanten Betrieb. Patienten schlafen in ihrer gewohnten Umgebung — keine Adaptation an Schlaflabor-Umgebung notwendig. Dies verbessert die diagnostische Aussagekraft erheblich.
</Admonition>

---

## Workflow — Ambulante PSG

```
① Gerätevorbereitung (< 20 min)
   → Laden, SD-Karte prüfen, Patientendaten einspielen

② Anlegen beim Patienten
   → Elektroden: EEG (10-20) · EOG · EMG · EKG
   → Sensoren: Atemgurt · SpO₂ · Nasenkanüle
   → Briefing Patient (ca. 10 min)

③ Aufzeichnung (1–4 Nächte)
   → Bluetooth-Monitoring optional
   → Automatische Datenspeicherung intern

④ Rückgabe & Auswertung
   → Datentransfer (USB oder Bluetooth)
   → Automatische Analyse Somnologix
   → Manuelle Überprüfung durch Somnologen (~ 30 min)

⑤ Befunderstellung
   → Standardisierter AASM-Bericht
   → Export PDF · HL7 · DICOM
```

---

## MDR-Konformität & Dokumentation

```
Klassifizierung:   Klasse IIa (aktives Diagnosegerät)
CE-Kennzeichnung:  CE 0123
Norm:              IEC 60601-1 · IEC 60601-1-2 (EMV)
Softwarevalidierung: IEC 62304
Datenstandard:     EDF+ (European Data Format)
Aufbewahrungspflicht: 10 Jahre (Patientendaten DSGVO)
```

---

## Lagerung & Handhabung (EMIG-intern)

| Kriterium | Vorgabe |
|---|---|
| Gerät | Raumtemperatur · trocken · Originalcase |
| Elektroden (Einweg) | Steril einzelverpackt · Ablaufdatum prüfen |
| Elektroden (Mehrweg) | Nach EMIG-Aufbereitungsprotokoll |
| Atemgurte | Handwäsche 30 °C nach jeder Nutzung |
| Akku | Vollständig laden vor Ausgabe |
| Loaner-Service | EMIG-Leihgerät verfügbar · Equipment Card SAP |
| Wartungsintervall | 24 Monate |

---

## Weiterführende Links

- 🌐 [somno·medics Website](https://www.somnomedics.de)
- 🌐 [inomed Schlafdiagnostik](https://www.inomed.com/produkte/schlafdiagnostik/)
- 🔗 [← Zurück zur inomed Übersicht](/docs/medizinprodukte/inomed/polysomnographie)