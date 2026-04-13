---
id: isis-iom
title: ISIS IOM — INO-01
sidebar_label: ISIS IOM
---

import Admonition from '@theme/Admonition';
import { LangSwitcherBar } from '@site/src/components/LanguageSwitcher';

<LangSwitcherBar/>

# 🧠 ISIS IOM — INO-01

<div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'1.5rem'}}>
  <span style={{background:'rgba(21,101,192,.12)',border:'1px solid rgba(21,101,192,.3)',color:'#1565c0',fontSize:'.72rem',fontWeight:700,padding:'4px 12px',borderRadius:'99px',letterSpacing:'.06em',textTransform:'uppercase'}}>INO-01</span>
  <span style={{background:'rgba(21,101,192,.08)',border:'1px solid rgba(21,101,192,.2)',color:'#1565c0',fontSize:'.72rem',fontWeight:600,padding:'4px 12px',borderRadius:'99px'}}>Intraoperatives Neuromonitoring</span>
  <span style={{background:'#f0fdf4',border:'1px solid #bbf7d0',color:'#065f46',fontSize:'.72rem',fontWeight:600,padding:'4px 12px',borderRadius:'99px'}}>✅ Freigegeben MDR 2017/745</span>
</div>

## Systemübersicht

Das **ISIS IOM** (Intraoperative Somatosensory & Motor Integrated System) ist das führende Multimodalitäts-Neuromonitoring-System von inomed. Es überwacht simultan alle motorischen und sensorischen Bahnen des Nervensystems — in Echtzeit, während des laufenden Eingriffs.

<Admonition type="tip" title="Klinischer Nutzen">
  Das ISIS IOM reduziert das Risiko postoperativer neurologischer Defizite signifikant. Studien zeigen eine Sensitivität von > 95 % für motorische und sensorische Bahnschäden bei rechtzeitiger Alarmauslösung.
</Admonition>

---

## Modalitäten im Überblick

| Modalität | Abkürzung | Überwachtes System | Typische Anwendung |
|---|---|---|---|
| Motorisch evozierte Potenziale | **MEP** | Pyramidenbahn (motorisch) | Wirbelsäule · Neurochirurgie |
| Somatosensibel evozierte Potenziale | **SSEP** | Hinterstränge (sensorisch) | Wirbelsäule · Gefäßchirurgie |
| Elektromyographie | **EMG** | Periphere Nerven · Nervenwurzeln | Wirbelsäule · HNO · Schilddrüse |
| D-Wellen-Monitoring | **D-Wave** | Kortikospinales System direkt | Intramedullär · Hochrisikoeingriffe |
| Hirnnerven-Monitoring | **CN-EMG** | Hirnnerven III–XII | Schädelbasis · HNO |
| EEG-Monitoring | **EEG** | Kortikale Aktivität | Karotis-TEA · Epilepsiechirurgie |
| Elektrokortikographie | **ECoG** | Direkte kortikale Aktivität | Epilepsiechirurgie |

---

## Technische Spezifikationen

### Hardware

| Parameter | Wert |
|---|---|
| Aufnahmekanäle | Bis zu **64 unabhängige Kanäle** |
| Stimulationskanäle | 4 (kortexnah) + 4 (peripher) |
| Sampling-Rate | 20.000 Hz / Kanal |
| Auflösung | 24 Bit ADC |
| Verstärkung | 100× – 100.000× (auto) |
| Gleichtaktunterdrückung | > 120 dB CMRR |
| Eingangsimpedanz | > 10 GΩ |
| Abmessungen | 43 × 38 × 14 cm · 12 kg |
| Stromversorgung | 100–240 V AC, 50/60 Hz |

### Stimulationsparameter

| Parameter | MEP | SSEP | Nerv-EMG |
|---|---|---|---|
| Stromstärke | 0–200 mA | 0–50 mA | 0–20 mA |
| Pulsbreite | 50–500 µs | 200–1000 µs | 50–300 µs |
| Frequenz | 1–7 Impulse / Train | 2–5 Hz | 1–3 Hz |
| Polizität | Kathode/Anode wählbar | Kathode | Kathode |

---

## iQ-Software

Das ISIS IOM wird durch die **iQ-Software** (Version 4.x) gesteuert — eine klinische Datenmanagement- und Visualisierungsplattform:

### Kernfunktionen iQ-Software

- **Echtzeit-Overlay:** Alle Modalitäten simultan auf einem Screen
- **Automatische Alarmschwellen:** Konfigurierbar pro Modalität (Amplitude ↓ 50 %, Latenz ↑ 10 %)
- **Trend-Analyse:** Kontinuierliche Kurvenüberwachung mit Abweichungsmarkierung
- **DICOM-Export:** Kompatibel mit PACS-Systemen der Klinik
- **Berichterstellung:** Automatischer OP-Bericht nach IOM-Standard (IFCN)
- **Fernübertragung:** Telepresence-Monitoring optional (Remote-Neurophysiologe)

### Schnittstellen & Integration

```
HL7 FHIR:       Patientendatenübernahme aus KIS
DICOM 3.0:      Bildspeicherung & PACS-Export
Navigation:     Brainlab · Stryker · Medtronic kompatibel
Anästhesie:     BIS-Monitor-Synchronisation möglich
Netzwerk:       LAN · WLAN · VPN-gesichert
```

---

## Klinische Anwendungsfelder

### Wirbelsäulenchirurgie (Hauptanwendung bei EMIG-Kunden)

| Eingriff | Empfohlene Modalitäten | Alarmkriterium |
|---|---|---|
| Lumbale Dekompression | MEP + SSEP + frei-laufendes EMG | MEP Amplitude < 50 % |
| Zervikale Diskektomie/Fusion | MEP + SSEP + EMG (C5–C8) | MEP Amplitude < 50 % |
| Skoliosekorrektur | MEP + SSEP + D-Wave | MEP < 50 % UND/ODER D-Wave < 50 % |
| Intramedullär (Tumor/AVM) | D-Wave + MEP + SSEP | D-Wave < 50 % |
| Pedikelschrauben | EMG (Widerstand + frei-laufend) | EMG-Burst bei Stimulation |

### Neurochirurgie

- **Hirntumore:** ECoG + EMG + MEP für funktionelle Areale
- **Schädelbasis:** CN-Monitoring (VII, X, XI, XII)
- **AVM-Resektion:** MEP + D-Wave + SSEP

### Gefäßchirurgie

- **Karotis-TEA:** SSEP + EEG (Ischämiemarker)
- **Aortenaneurysma:** MEP + SSEP (Rückenmarksperfusion)

---

## Pedikelschrauben-Stimulationsmodul

Speziell für die Wirbelsäulenchirurgie verfügt das ISIS IOM über ein **dediziertes Pedikelschrauben-Testmodul**:

```
Methode:        Impedanz-Test + direkte Stromstimulation
Stimulationsstrom: 5–20 mA (Schwelle)
Auswertung:     Schwellenstrom > 8 mA = korrekte Lage
                Schwellenstrom < 6 mA = Kortex-Verletzung → Alarm
Elektroden:     Kompatibel mit allen gängigen Schraubenköpfen
```

---

## Alarmsystem

<Admonition type="warning" title="Alarmkriterien — Klinisch validiert">
  Alle Standardalarme basieren auf IFCN-Leitlinien (International Federation of Clinical Neurophysiology) und sind in der iQ-Software voreingestellt.
</Admonition>

| Alarm-Typ | Standard-Schwelle | Aktion |
|---|---|---|
| MEP Amplitudenabfall | > 50 % Reduktion | Sofortmeldung Chirurg |
| MEP Latenzanstieg | > 10 % Zunahme | Warnmeldung |
| SSEP Amplitudenabfall | > 50 % Reduktion | Sofortmeldung |
| D-Wave Abfall | > 50 % | Sofortmeldung — höchste Priorität |
| Elektroden-Impedanz | > 10 kΩ | Technische Warnung |
| Stimulations-Ausfall | Kein Ansprechen | Technische Warnung |

---

## MDR-Konformität & Dokumentation

```
Klassifizierung:   Klasse IIb (Aktives Medizinprodukt, impliziert)
CE-Kennzeichnung:  CE 0123
Benannte Stelle:   TÜV Rheinland
Softwareversion:   iQ 4.x (validated, IEC 62304)
EMV-Zertifizierung: IEC 60601-1-2
Sicherheitsnorm:   IEC 60601-1 (Medizinische elektrische Geräte)
```

---

## Lagerung & Handhabung (EMIG-intern)

| Kriterium | Vorgabe |
|---|---|
| Betriebstemperatur | +10 °C bis +40 °C |
| Lagertemperatur | -20 °C bis +60 °C |
| Luftfeuchtigkeit | 15–95 % rH (nicht kondensierend) |
| Reinigung Gerät | Wischdesinfektion (Isopropanol 70 %) |
| Kabel-Prüfung | Sichtprüfung vor jedem Einsatz |
| Wartungsintervall | Jährlich durch inomed-Service |
| Equipment Card | SAP — Seriennummer + nächste Wartung |

---

## Weiterführende Links

- 🌐 [Herstellerseite inomed](https://www.inomed.com)
- 📄 [ISIS IOM Produktseite](https://www.inomed.com/produkte/intraoperatives-neuromonitoring/)
- 🔗 [← Zurück zur inomed Übersicht](/docs/medizinprodukte/inomed/isis-iom)