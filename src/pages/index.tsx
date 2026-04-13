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
    website: 'https://www.riwospine.com',
    location: { lat: 49.0316, lng: 8.7702, city: 'Knittlingen', country: 'Baden-Württemberg, DE' },
    description: 'RIWOspine ist ein führender Spezialist für vollendoskopische Wirbelsäulenchirurgie. Als Teil der Richard Wolf Unternehmensgruppe entwickelt RIWOspine hochpräzise Endoskopiesysteme für minimalinvasive Eingriffe an Hals-, Brust- und Lendenwirbelsäule.',
    focus: [
      { icon: '🔬', label: 'Vollendoskopische Chirurgie', desc: 'Kamerageführte Eingriffe durch kleinste Zugänge' },
      { icon: '🩻', label: 'Minimalinvasive Eingriffe', desc: 'Weniger Trauma, schnellere Heilung' },
      { icon: '🧠', label: 'Neurochirurgie', desc: 'Nervenschonende Dekompression' },
      { icon: '🦴', label: 'Spine-Endoskopie', desc: 'HWS, BWS und LWS abgedeckt' },
      { icon: '💡', label: 'Optische Systeme', desc: 'HD-Visualisierung im OP' },
      { icon: '⚙️', label: 'Präzisionsinstrumente', desc: 'Ergonomie & Sterilisierbarkeit' },
    ],
    facts: [
      { label: 'Gegründet', value: '1906' },
      { label: 'Hauptsitz', value: 'Knittlingen, DE' },
      { label: 'Mitarbeiter', value: '2.000+' },
      { label: 'Länder', value: '100+' },
      { label: 'Zertifizierung', value: 'ISO 13485 · CE' },
      { label: 'Gruppe', value: 'Richard Wolf GmbH' },
    ],
    products: [
      {
        title: 'Vertebris Stenose',
        code: 'RIWO-01',
        link: '/docs/medizinprodukte/riwospine/stenose',
        tagline: 'Endoskopische Dekompression',
        image: '/img/riwo-stenose.jpg',
        imagePlaceholderColor: '#7f1d1d',
        desc: 'Vollendoskopische Dekompression bei lumbaler und zervikaler Spinalstenose. Minimalinvasive Technik für kürzere Rehabilitation und weniger postoperative Schmerzen.',
        specs: [
          { icon: '📐', label: 'Zugangsweg', value: 'Interlaminar / Translaminar' },
          { icon: '🔦', label: 'Optik', value: '6,2 mm · HD · 0°/10°' },
          { icon: '🧩', label: 'Indikation', value: 'Lumb. / Zerv. Stenose' },
          { icon: '⏱️', label: 'OP-Zeit', value: 'Ø 45–75 min' },
        ],
        highlights: ['Bilateraler Zugang durch unilateralen Schnitt', 'Kontinuierliche Spülung schützt Nervenstrukturen', 'Kompatibel mit Stryker-Navigation'],
        badge: 'Bestseller',
        badgeColor: '#c0392b',
      },
      {
        title: 'Vertebris Lumbar',
        code: 'RIWO-02',
        link: '/docs/medizinprodukte/riwospine/lumbar',
        tagline: 'Lumbale Bandscheibenchirurgie',
        image: '/img/riwo-lumbar.jpg',
        imagePlaceholderColor: '#7c2d12',
        desc: 'Endoskopisches System für Bandscheibenchirurgie der Lendenwirbelsäule. Transforaminaler und interlaminarer Zugang für präzise Diskektomien mit minimalem Gewebstrauma.',
        specs: [
          { icon: '📐', label: 'Zugangsweg', value: 'Transforaminal / Interlaminar' },
          { icon: '🔦', label: 'Optik', value: '7,5 mm · HD · 25°' },
          { icon: '🧩', label: 'Indikation', value: 'Lumbaler Bandscheibenvorfall' },
          { icon: '⏱️', label: 'OP-Zeit', value: 'Ø 30–60 min' },
        ],
        highlights: ['Anpassbarer Arbeitskanal 3,1–6,3 mm', 'Flexibles Spülsystem integriert', 'Lokale Anästhesie möglich'],
        badge: 'Häufig genutzt',
        badgeColor: '#b45309',
      },
      {
        title: 'Vertebris Cervical',
        code: 'RIWO-03',
        link: '/docs/medizinprodukte/riwospine/cervical',
        tagline: 'Zervikale Wirbelsäulenchirurgie',
        image: '/img/riwo-cervical.jpg',
        imagePlaceholderColor: '#1e3a5f',
        desc: 'Vollendoskopische Chirurgie der Halswirbelsäule. Anteriorer und posteriorer Zugang für zervikale Pathologien — Foraminotomie, Diskektomie und Dekompression.',
        specs: [
          { icon: '📐', label: 'Zugangsweg', value: 'Anterior / Posterior' },
          { icon: '🔦', label: 'Optik', value: '5,7 mm · HD · 0°' },
          { icon: '🧩', label: 'Indikation', value: 'Zerv. Myelopathie / Radikulopathie' },
          { icon: '⏱️', label: 'OP-Zeit', value: 'Ø 40–80 min' },
        ],
        highlights: ['Speziell entwickeltes HWS-Instrumentarium', 'Druckkontrollierte Irrigation', 'Kein Implantat notwendig bei Foraminotomie'],
        badge: 'Spezialsystem',
        badgeColor: '#1d4ed8',
      },
      {
        title: 'Instrumentarium & Optiken',
        code: 'RIWO-04',
        link: '/docs/medizinprodukte/riwospine/instrumente',
        tagline: 'Optiken · Instrumente · Verbrauchsmaterial',
        image: '/img/riwo-instrumente.jpg',
        imagePlaceholderColor: '#1a2e1a',
        desc: 'Hochpräzisions-Endoskope, Optiken und Instrumente für alle Vertebris-Systeme. Optimale Visualisierung, maximale Ergonomie und vollständige Kompatibilität.',
        specs: [
          { icon: '🔭', label: 'Endoskope', value: '3 Durchmesser-Varianten' },
          { icon: '💡', label: 'Beleuchtung', value: 'LED · Xenon · Kaltlicht' },
          { icon: '🔧', label: 'Instrumente', value: '120+ Einzelkomponenten' },
          { icon: '♻️', label: 'Sterilisation', value: 'Autoklavierbar 134 °C' },
        ],
        highlights: ['Set-Konfiguration nach Eingriffstyp', 'Kompatibel mit Vertebris I, II, III', 'Loaner-Sets auf Anfrage verfügbar'],
        badge: 'Komplettset',
        badgeColor: '#065f46',
      },
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
    website: 'https://www.inomed.com',
    location: { lat: 48.1267, lng: 7.8511, city: 'Emmendingen', country: 'Baden-Württemberg, DE' },
    description: 'inomed Medizintechnik ist Weltmarktführer im Bereich intraoperatives Neuromonitoring (IOM). Die Systeme schützen das Nervensystem während neurochirurgischer, orthopädischer und gefäßchirurgischer Eingriffe durch präzise Echtzeit-Überwachung aller motorischen und sensorischen Bahnen.',
    focus: [
      { icon: '🧠', label: 'Intraoperatives Neuromonitoring', desc: 'Echtzeit-Nervenschutz im OP' },
      { icon: '📡', label: 'Neurophysiologie', desc: 'MEP, SSEP, EMG und mehr' },
      { icon: '⚡', label: 'Hirnstimulation', desc: 'TMS und direkte Kortexstimulation' },
      { icon: '😴', label: 'Schlafdiagnostik', desc: 'Polysomnographie-Systeme' },
      { icon: '🔬', label: 'Intraoperative Bildgebung', desc: 'Neurophysiologische Kartierung' },
      { icon: '📊', label: 'Datenmanagement', desc: 'iQ-Software & Archivierung' },
    ],
    facts: [
      { label: 'Gegründet', value: '1989' },
      { label: 'Hauptsitz', value: 'Emmendingen, DE' },
      { label: 'Mitarbeiter', value: '300+' },
      { label: 'Länder', value: '50+' },
      { label: 'Zertifizierung', value: 'ISO 13485 · CE' },
      { label: 'Marktposition', value: 'Weltmarktführer IOM' },
    ],
    products: [
      {
        title: 'ISIS IOM',
        code: 'INO-01',
        link: '/docs/medizinprodukte/inomed/isis-iom',
        tagline: 'Intraoperatives Neuromonitoring',
        image: '/img/inomed-isis.jpg',
        imagePlaceholderColor: '#0a1628',
        desc: 'Das ISIS IOM ist das führende Multimodalitäts-Neuromonitoring-System. MEP, SSEP, EMG, D-Wave und Hirnnervenmonitoring in einem integrierten Gerät — für maximale Nervensicherheit im OP.',
        specs: [
          { icon: '📡', label: 'Modalitäten', value: 'MEP · SSEP · EMG · D-Wave' },
          { icon: '🔌', label: 'Kanäle', value: 'Bis zu 64 Kanäle' },
          { icon: '⚡', label: 'Stimulation', value: 'Kortex · Peripher · Nerv' },
          { icon: '💻', label: 'Software', value: 'iQ-Software · DICOM-Export' },
        ],
        highlights: ['Simultanes Monitoring aller Modalitäten', 'Automatische Alarmfunktion bei Signaländerung', 'Kompatibel mit allen gängigen Navigationsystemen'],
        badge: 'Kernsystem',
        badgeColor: '#1565c0',
      },
      {
        title: 'Rapid² TMS',
        code: 'INO-02',
        link: '/docs/medizinprodukte/inomed/tms',
        tagline: 'Transkranielle Magnetstimulation',
        image: '/img/inomed-tms.jpg',
        imagePlaceholderColor: '#0d1f3c',
        desc: 'Das Rapid² TMS-System ermöglicht präoperatives kortikales Mapping und intraoperative Hirnstimulation. Präzise Lokalisation motorischer und sprachlicher Areale vor neurochirurgischen Eingriffen.',
        specs: [
          { icon: '🧲', label: 'Technologie', value: 'Repetitive TMS (rTMS)' },
          { icon: '⚡', label: 'Max. Feldstärke', value: '2,2 Tesla' },
          { icon: '🎯', label: 'Anwendung', value: 'Kortex-Mapping · Therapie' },
          { icon: '🔋', label: 'Frequenz', value: '0,1 – 100 Hz' },
        ],
        highlights: ['Neuro-Navigation Integration (BrainSight)', 'Figure-8- und H-Spule verfügbar', 'Präoperatives Sprach- und Motorfeld-Mapping'],
        badge: 'Spezialsystem',
        badgeColor: '#7b1fa2',
      },
      {
        title: 'somno·medics PSG',
        code: 'INO-03',
        link: '/docs/medizinprodukte/inomed/polysomnographie',
        tagline: 'Ambulante Polysomnographie',
        image: '/img/inomed-somno.jpg',
        imagePlaceholderColor: '#0a1a2e',
        desc: 'Das somno·medics System ermöglicht vollständige ambulante Polysomnographie nach AASM-Standard. Hochauflösende EEG-, EOG-, EMG- und Atmungsaufzeichnung für präzise Schlafdiagnostik.',
        specs: [
          { icon: '😴', label: 'Standard', value: 'AASM-konform · Level I/II' },
          { icon: '📡', label: 'Kanäle', value: 'Bis zu 32 EEG-Kanäle' },
          { icon: '🏠', label: 'Anwendung', value: 'Klinik & ambulant' },
          { icon: '⏱️', label: 'Aufzeichnung', value: 'Bis 96 Stunden' },
        ],
        highlights: ['Vollständig kabelloses Design (Bluetooth)', 'Automatische AASM-Schlafstadien-Auswertung', 'Somnologix-Software mit KI-gestützter Analyse'],
        badge: 'Diagnostik',
        badgeColor: '#00695c',
      },
      {
        title: 'Elektroden & Zubehör',
        code: 'INO-04',
        link: '/docs/medizinprodukte/inomed/elektroden',
        tagline: 'Elektroden · Kabel · Stimulatoren',
        image: '/img/inomed-elektroden.jpg',
        imagePlaceholderColor: '#111827',
        desc: 'Vollständiges Elektroden- und Zubehörportfolio für alle inomed IOM-Systeme. Nadelelektroden, Klebepads, Korkschraubenelektroden und Stimulationssonden für jede neurochirurgische Anwendung.',
        specs: [
          { icon: '🔌', label: 'Elektroden-Typen', value: 'Nadel · Klebe · Korkschraube' },
          { icon: '⚡', label: 'Stimulatoren', value: 'Kortex · Nerv · Peripher' },
          { icon: '♻️', label: 'Ausführung', value: 'Einweg & Mehrweg' },
          { icon: '🔗', label: 'Kompatibilität', value: 'ISIS IOM · Alle inomed Systeme' },
        ],
        highlights: ['Sets nach Eingriffs-Typ konfigurierbar', 'Steril einzelverpackt — lange Haltbarkeit', 'Direktimport EMIG — kurze Lieferwege'],
        badge: 'Verbrauchsmaterial',
        badgeColor: '#37474f',
      },
    ],
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
    focus: [
      { icon: '🎯', label: 'Sentinellymphknoten-Biopsie', desc: 'Präzise intraoperative Detektion' },
      { icon: '☢️', label: 'Nuklearmedizin', desc: 'Radioaktive Tracerverfahren' },
      { icon: '🩺', label: 'Onkologie', desc: 'Tumorchirurgie-Unterstützung' },
      { icon: '📻', label: 'Gammaproben', desc: 'Hochempfindliche Detektionssonden' },
    ],
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
    description: 'Black Forest Medical Group spezialisiert sich auf hochwertige Implantate und Instrumente für die Transplantationsmedizin, Gefäßchirurgie und rekonstruktive Chirurgie.',
    focus: [
      { icon: '🫀', label: 'Transplantationsmedizin', desc: 'Organ- und Gewebetransplantation' },
      { icon: '🩸', label: 'Gefäßchirurgie', desc: 'Vaskuläre Implantate & Instrumente' },
      { icon: '🔩', label: 'Implantate', desc: 'Präzisionsfertigung Schwarzwald' },
      { icon: '🏗️', label: 'Rekonstruktive Chirurgie', desc: 'Gewebeaufbau & Wiederherstellung' },
    ],
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
    tagline: 'Radiochirurgie · Wundversorgung · Rauchabsaugung',
    origin: 'Deutschland · Ober-Mörlen',
    accent: '#e65100',
    bg: 'linear-gradient(160deg,#0e0400 0%,#1c0900 35%,#271200 60%,#1c0900 100%)',
    website: 'https://www.meyer-haake.com',
    location: { lat: 50.3610, lng: 8.6880, city: 'Ober-Mörlen', country: 'Hessen, DE' },
    description: 'Meyer-Haake GmbH Medical Innovations entwickelt und fertigt seit 1981 innovative Medizinprodukte für Ärzte und Kosmetikinstitute. Das Portfolio umfasst Radiochirurgiegeräte, Gewebekleber, Rauchgasabsaugung und Elektroden — alles Made in Germany, ISO 13485-zertifiziert.',
    focus: [
      { icon: '⚡', label: 'Radiochirurgie', desc: 'Drucklose, kalte Schnitte ohne Nekrosen' },
      { icon: '🩹', label: 'Wundversorgung', desc: 'Kleben statt Nähen — EPIGLU®' },
      { icon: '💨', label: 'Rauchgasabsaugung', desc: 'Schutz vor chirurgischem Rauch' },
      { icon: '🔬', label: 'Elektroden', desc: 'Für alle Fachrichtungen und Anwendungen' },
      { icon: '✨', label: 'RF-ReFacing', desc: 'Anti-Aging mit Radiowellen' },
      { icon: '🏭', label: 'Made in Germany', desc: 'Eigenproduktion Ober-Mörlen seit 1981' },
    ],
    facts: [
      { label: 'Gegründet', value: '1981' },
      { label: 'Hauptsitz', value: 'Ober-Mörlen, DE' },
      { label: 'Produktion', value: 'Made in Germany' },
      { label: 'Zertifizierung', value: 'ISO 13485 · CE' },
      { label: 'Kernprodukte', value: 'radioSURG® · EPIGLU® · smokeSTAR' },
      { label: 'Anwendung', value: 'Ärzte & Kosmetikinstitute' },
    ],
    products: [
      {
        title: 'radioSURG® 2200',
        code: 'MH-01',
        link: '/docs/medizinprodukte/meyer-haake/radiosurg',
        tagline: 'Radiochirurgiegerät',
        image: '/img/medizinprodukte/meyer-haake/MH-01.png',
        imagePlaceholderColor: '#1a0800',
        desc: 'Das radioSURG® 2200 ist ein Hochfrequenz-Radiochirurgiegerät für drucklose, kalte Schnitte ohne Verfärbungen oder Nekrosen. Einsetzbar in allen chirurgischen Fachrichtungen — von der Hautchirurgie bis zur HNO.',
        specs: [
          { icon: '⚡', label: 'Technologie', value: 'Hochfrequenz / Radiochirurgie' },
          { icon: '🔢', label: 'Modelle', value: '6 Modelle verfügbar' },
          { icon: '🎛️', label: 'Koagulation', value: 'Einstellbar Grad 1–9' },
          { icon: '🏥', label: 'Anwendung', value: 'Medical · Dental · Veterinär' },
        ],
        highlights: ['Drucklose kalte Schnitte — keine Nekrosen, keine Verfärbungen', 'Exzidat histologisch bis in die Schnittränder beurteilbar', 'Mono- und bipolare Koagulation — Touchscreen-Steuerung'],
        badge: 'Kernsystem',
        badgeColor: '#e65100',
      },
      {
        title: 'EPIGLU®',
        code: 'MH-02',
        link: '/docs/medizinprodukte/meyer-haake/epiglu',
        tagline: 'Gewebekleber — Kleben statt Nähen',
        image: '/img/medizinprodukte/meyer-haake/MH-02.jpg',
        imagePlaceholderColor: '#1a1000',
        desc: 'EPIGLU® ist ein Ethyl-2-Cyanoacrylat-Gewebekleber der ersten Stunde — sicher, schnell und wirtschaftlicher als Nadel und Faden. Zugelassen für Medical, Dental und Veterinär in über 50 Ländern.',
        specs: [
          { icon: '🧪', label: 'Wirkstoff', value: 'Ethyl-2-Cyanoacrylat' },
          { icon: '🌍', label: 'Zulassung', value: '50+ Länder weltweit' },
          { icon: '⏱️', label: 'Aushärtezeit', value: 'Sekunden' },
          { icon: '🏥', label: 'Anwendung', value: 'Medical · Dental · Veterinär' },
        ],
        highlights: ['Erste Ethyl-2-Cyanoacrylat-Tube auf dem Markt', 'Günstigere Alternative zu Nadel und Faden', 'Erhältlich als Phiole, Single Dose und Tube'],
        badge: 'Bestseller',
        badgeColor: '#b45309',
      },
      {
        title: 'smokeSTAR',
        code: 'MH-03',
        link: '/docs/medizinprodukte/meyer-haake/smokestar',
        tagline: 'Chirurgische Rauchgasabsaugung',
        image: '/img/medizinprodukte/meyer-haake/MH-03.png',
        imagePlaceholderColor: '#0f0f0f',
        desc: 'smokeSTAR ist eine professionelle Rauchgasabsaugung für alle HF-, RF-, Ultraschall- und Laserchirurgischen Eingriffe. Schützt Chirurgen und OP-Team vor toxischen Reaktionen und Viren im chirurgischen Rauch.',
        specs: [
          { icon: '💨', label: 'Technologie', value: 'HEPA + Aktivkohlefilter' },
          { icon: '🦠', label: 'Schutz', value: 'Viren · Toxine · Partikel' },
          { icon: '🔇', label: 'Betrieb', value: 'Geräuscharm' },
          { icon: '🔌', label: 'Kompatibilität', value: 'Alle HF/RF/Laser-Systeme' },
        ],
        highlights: ['RKI-Empfehlung seit 2007 für chirurgische Rauchentsorgung', 'Lokale Absaugung direkt am Schnittpunkt', 'Kompatibel mit radioSURG® und allen HF-Systemen'],
        badge: 'Sicherheit',
        badgeColor: '#37474f',
      },
      {
        title: 'Elektroden & BIO-CONE',
        code: 'MH-04',
        link: '/docs/medizinprodukte/meyer-haake/elektroden',
        tagline: 'Zubehör & Elektroden für radioSURG®',
        image: '/img/medizinprodukte/meyer-haake/MH-04.webp',
        imagePlaceholderColor: '#1a0a00',
        desc: 'Umfangreiches Elektroden-Portfolio für alle Anwendungsfälle des radioSURG® 2200. Inklusive BIO-CONE für Konusbiopsien, Bipolarpinzetten, neue Elektroden für Blepharoplastiken (EELDRA91) und autoklavierbares Mehrwegzubehör.',
        specs: [
          { icon: '🔌', label: 'Elektroden', value: 'Alle Fachrichtungen' },
          { icon: '♻️', label: 'Ausführung', value: 'Einweg steril & autoklavierbar' },
          { icon: '🔬', label: 'BIO-CONE', value: 'Konusbiopsie an der Portio' },
          { icon: '✨', label: 'Neu', value: 'EELDRA91 für Blepharoplastiken' },
        ],
        highlights: ['BIO-CONE: drehbar mit Stabilisierungsdornen zur Zervix-Fixierung', 'EELDRA91: neue Elektrode speziell für Blepharoplastiken', 'Sortiment autoklavierbar oder steril Einweg'],
        badge: 'Verbrauchsmaterial',
        badgeColor: '#4e342e',
      },
    ],
  },
  {
    id: 'brainlab',
    name: 'Brainlab',
    logo: '/img/logo-brainlab.png',
    tagline: 'Digitale Chirurgie & Strahlentherapie',
    origin: 'Deutschland · München',
    accent: '#880e4f',
    bg: 'linear-gradient(160deg,#0b0106 0%,#180410 35%,#220618 60%,#180410 100%)',
    description: 'Brainlab ist ein globaler Technologieführer für softwaregestützte medizinische Technologie. Ihre Lösungen werden in über 6.000 Krankenhäusern weltweit eingesetzt.',
    focus: [
      { icon: '🧭', label: 'Navigationsgestützte Chirurgie', desc: 'Echtzeit-Bildgebung im OP' },
      { icon: '☢️', label: 'Strahlentherapie', desc: 'Präzisionsstrahlung Tumortherapie' },
      { icon: '🧠', label: 'Neurochirurgie', desc: 'Brain Mapping & Navigation' },
      { icon: '🖥️', label: 'Digitale OR-Integration', desc: 'Vernetzter Operationssaal' },
    ],
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
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap');

:root{
  --gold:#d4a340;--gold-lt:#f0be55;--gold-dim:rgba(212,163,64,.75);
  --cream:#f6f4ef;
  --card:#ffffff;
  --card-border:rgba(0,0,0,.08);
  --text:#111118;
  --text-dim:#52596b;
  --text-faint:#8c94a4;
  --bg:#f1eeea;
  --bg2:#e8e4de;
  --section-bg:#edeae4;
  --section-border:#ddd9d0;
  --prog-bg:#0e0d12;
  --prog-border:rgba(212,163,64,.22);
  --r:18px;
  --shadow-sm:0 1px 3px rgba(0,0,0,.08),0 0 0 1px rgba(0,0,0,.04);
  --shadow-md:0 4px 16px rgba(0,0,0,.1),0 1px 4px rgba(0,0,0,.06);
  --shadow-lg:0 16px 48px rgba(0,0,0,.14),0 4px 12px rgba(0,0,0,.08);
  --shadow-xl:0 32px 80px rgba(0,0,0,.18),0 8px 24px rgba(0,0,0,.1);
  --sap-bg:#edebe5;
  --sap-card:#e5e2da;
  --sap-card2:#dbd8ce;
  --sap-border:rgba(0,0,0,.08);
  --sap-text:#141218;
  --sap-text-dim:#524e48;
  --sap-text-faint:#867f75;
  --sap-hd-bg:linear-gradient(160deg,#e8e5dd 0%,#dedad2 50%,#e8e5dd 100%);
  --sap-nav-bg:#dedad2;
  --sap-nav-border:rgba(0,0,0,.07);
  --sap-input:#dedad2;
  --riwo-red:#c0392b;--riwo-red-lt:#e84c3d;--riwo-red-dim:rgba(192,57,43,.14);
  --ino-blue:#1565c0;--ino-blue-lt:#1e88e5;--ino-blue-dim:rgba(21,101,192,.14);
  --mh-orange:#e65100;--mh-orange-lt:#ff6d00;--mh-orange-dim:rgba(230,81,0,.14);
}
[data-theme="dark"]{
  --cream:#07060c;
  --card:rgba(20,18,28,.97);
  --card-border:rgba(255,255,255,.065);
  --text:#ede9f7;
  --text-dim:#7e7890;
  --text-faint:#4a4555;
  --bg:#07060c;
  --bg2:#0d0c14;
  --section-bg:#0b0a11;
  --section-border:rgba(255,255,255,.055);
  --prog-bg:#0d0c14;
  --prog-border:rgba(212,163,64,.18);
  --shadow-sm:0 1px 4px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.04);
  --shadow-md:0 4px 20px rgba(0,0,0,.5),0 1px 6px rgba(0,0,0,.3);
  --shadow-lg:0 16px 56px rgba(0,0,0,.6),0 4px 16px rgba(0,0,0,.4);
  --shadow-xl:0 32px 96px rgba(0,0,0,.7),0 8px 32px rgba(0,0,0,.5);
  --sap-bg:#0a0910;--sap-card:#131120;--sap-card2:#1a1826;
  --sap-border:rgba(255,255,255,.07);--sap-text:#ede9f7;--sap-text-dim:#8a8498;--sap-text-faint:#504a5e;
  --sap-hd-bg:linear-gradient(160deg,#0a0910 0%,#0e0d16 50%,#0a0910 100%);
  --sap-nav-bg:#090810;--sap-nav-border:rgba(255,255,255,.06);--sap-input:#111020;
  --riwo-red-dim:rgba(192,57,43,.25);
  --ino-blue-dim:rgba(21,101,192,.25);
  --mh-orange-dim:rgba(230,81,0,.25);
}

*,*::before,*::after{box-sizing:border-box;}
html{font-size:17px;}
body{background:var(--bg);}
.ea{font-family:'Outfit',sans-serif;color:var(--text);font-size:1rem;line-height:1.6;}

/* ── HERO ── */
.ea-hero{position:relative;width:100vw;margin-left:calc(-50vw + 50%);min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;background:#05040a;}
.ea-hero-media{position:absolute;inset:0;z-index:0;}
.ea-hero-video{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(1.1) contrast(1.05);}
.ea-vignette{position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(5,4,10,.97) 0%,rgba(5,4,10,.72) 30%,rgba(5,4,10,.28) 65%,transparent 100%),linear-gradient(105deg,rgba(5,4,10,.65) 0%,transparent 55%);}
.ea-grain{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.028;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px;}
.ea-frame-t,.ea-frame-b{position:absolute;left:0;right:0;height:1px;z-index:3;background:linear-gradient(90deg,transparent,rgba(200,169,110,.3),transparent);}
.ea-frame-t{top:0;}.ea-frame-b{bottom:0;}
.ea-hero-inner{position:relative;z-index:4;padding:0 5% 8vh;width:100%;max-width:1600px;margin:0 auto;}
/* ── HERO TITLE ── */
@keyframes title-shimmer{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
@keyframes eyebrow-glow{
  0%,100%{opacity:.7}
  50%{opacity:1}
}
.ea-eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:1.6rem;}
.ea-eyebrow::before{content:'';display:block;width:40px;height:1px;background:linear-gradient(90deg,transparent,#c8a96e);opacity:.8;}
.ea-eyebrow span{font-size:.65rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:rgba(200,169,110,.75);animation:eyebrow-glow 4s ease-in-out infinite;}
.ea-h1{margin:0;line-height:1;}
.ea-h1-sub{display:block;font-family:'Outfit',sans-serif;font-size:clamp(.9rem,1.4vw,1.1rem);font-weight:300;color:rgba(255,255,255,.38);letter-spacing:.55em;text-transform:uppercase;margin-bottom:.6rem;}
.ea-h1-main{display:block;font-family:'Bebas Neue',sans-serif;font-size:clamp(6rem,13vw,12rem);letter-spacing:.02em;line-height:.85;background:linear-gradient(110deg,#fff 0%,#ffe8b0 20%,#ffb347 38%,#ff6b35 52%,#e8368e 65%,#a855f7 78%,#60a5fa 90%,#fff 100%);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:title-shimmer 8s ease infinite;filter:drop-shadow(0 0 60px rgba(255,107,53,.15));}
.ea-h1-brand{display:block;font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,4.5vw,4rem);letter-spacing:.35em;color:rgba(255,255,255,.22);line-height:1;margin-bottom:-.4rem;}
.ea-tagline{font-size:clamp(.85rem,1.1vw,.95rem);color:rgba(238,234,224,.32);font-weight:300;letter-spacing:.22em;text-transform:uppercase;margin:1.5rem 0 0;}
.ea-stats{display:flex;align-items:stretch;gap:0;margin-top:2.5rem;flex-wrap:wrap;}
.ea-stat{padding-right:2rem;margin-right:2rem;border-right:1px solid rgba(200,169,110,.16);}
.ea-stat:last-child{border-right:none;padding-right:0;margin-right:0;}
.ea-stat-n{font-family:'Bebas Neue',sans-serif;font-size:2.6rem;color:#fff;line-height:1;display:block;letter-spacing:.04em;}
.ea-stat-l{font-size:.6rem;color:rgba(238,234,224,.3);text-transform:uppercase;letter-spacing:.18em;font-weight:500;display:block;margin-top:3px;}
.ea-vidctl{position:absolute;bottom:2rem;right:3%;z-index:5;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.4);width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;backdrop-filter:blur(14px);font-size:.7rem;}
.ea-vidctl:hover{background:rgba(200,169,110,.15);color:#e8d5a8;border-color:#c8a96e;}

/* ── MAIN ── */
.ea-main{background:var(--bg);padding:2.5rem 0 5rem;}
.ea-wrap{width:100%;max-width:1600px;margin:0 auto;padding:0 4%;}

/* ── WELCOME ── */
.ea-welcome{background:var(--card);border:1px solid var(--card-border);border-radius:var(--r);padding:1.25rem 1.75rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:2rem;flex-wrap:wrap;box-shadow:var(--shadow-sm);}
.ea-welcome-name{font-size:1.08rem;font-weight:700;color:var(--text);}
.ea-welcome-sub{font-size:.77rem;color:var(--text-dim);margin-top:2px;}
.ea-welcome-pill{background:rgba(212,163,64,.13);border:1px solid rgba(212,163,64,.32);color:var(--gold);font-size:.77rem;font-weight:700;padding:7px 16px;border-radius:99px;white-space:nowrap;letter-spacing:.04em;}

/* ── TABS ── */
.ea-tabs{display:flex;background:var(--card);border-radius:var(--r);padding:5px;box-shadow:var(--shadow-md);margin-bottom:2.5rem;overflow-x:auto;gap:0;position:relative;border:1px solid var(--card-border);}
.ea-tabs::-webkit-scrollbar{display:none;}
.ea-tab{flex:1 1 120px;padding:15px 24px;border-radius:12px;border:none;background:transparent;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:500;color:var(--text-dim);cursor:pointer;transition:color .25s,transform .18s;text-align:center;white-space:nowrap;position:relative;z-index:1;}
.ea-tab .tab-icon{display:block;font-size:1rem;margin-bottom:4px;transition:transform .35s cubic-bezier(.34,1.56,.64,1);}
.ea-tab .tab-label{display:block;font-size:.8rem;font-weight:600;letter-spacing:.04em;}
.ea-tab.active{color:#fff;font-weight:700;}
.ea-tab.active .tab-icon{transform:scale(1.2);}
.ea-tab:hover:not(.active){color:var(--text);}
.ea-tab:hover:not(.active) .tab-icon{transform:scale(1.1);}
.ea-tab-slider{position:absolute;top:5px;bottom:5px;border-radius:11px;background:linear-gradient(135deg,#1a1820 0%,#0e0d14 100%);box-shadow:0 4px 20px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.08);transition:left .35s cubic-bezier(.4,0,.2,1),width .35s cubic-bezier(.4,0,.2,1);pointer-events:none;z-index:0;}
[data-theme="dark"] .ea-tab-slider{background:linear-gradient(135deg,#22203a 0%,#16142a 100%);box-shadow:0 4px 20px rgba(0,0,0,.5),0 0 0 1px rgba(212,163,64,.12),inset 0 1px 0 rgba(255,255,255,.06);}
.ea-tab.active .tab-label{background:linear-gradient(135deg,#fff 0%,rgba(212,163,64,.9) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
[data-theme="dark"] .ea-tab.active .tab-label{background:linear-gradient(135deg,#fff 20%,var(--gold-lt) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

/* ── LANGUAGE SWITCHER ── */
.ea-lang{display:flex;align-items:center;gap:3px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);border-radius:99px;padding:4px;backdrop-filter:blur(16px);}
.ea-lang-btn{display:flex;align-items:center;gap:5px;padding:6px 13px;border-radius:99px;border:none;background:transparent;font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:700;cursor:pointer;color:rgba(255,255,255,.5);transition:all .2s;white-space:nowrap;letter-spacing:.05em;}
.ea-lang-btn:hover{color:rgba(255,255,255,.85);}
.ea-lang-btn.active{background:rgba(255,255,255,.14);color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.3);}
.ea-lang-flag{font-size:.85rem;line-height:1;}
/* ── LANG SWITCHER in main (light bg) ── */
.ea-lang-light{background:var(--card);border:1px solid var(--card-border);box-shadow:var(--shadow-sm);}
.ea-lang-light .ea-lang-btn{color:var(--text-dim);}
.ea-lang-light .ea-lang-btn:hover{color:var(--text);background:var(--bg2);}
.ea-lang-light .ea-lang-btn.active{background:var(--text);color:var(--bg);}

/* ── SECTION HEADER ── */
.ea-sh{font-size:.78rem;font-weight:800;color:var(--text);display:flex;align-items:center;gap:12px;margin:2.75rem 0 1.25rem;text-transform:uppercase;letter-spacing:.13em;}
.ea-sh-bar{width:20px;height:3px;border-radius:99px;flex-shrink:0;}
.ea-sh-rule{flex:1;height:1px;background:linear-gradient(90deg,var(--section-border),transparent);}
.ea-sh-count{font-family:'DM Mono',monospace;font-size:.6rem;font-weight:700;padding:3px 10px;border-radius:99px;letter-spacing:.08em;text-transform:none;opacity:.8;border:1px solid;}

/* ── PROGRESS (NEUE VERSION) ── */
.ea-prog-wrap{margin-bottom:2rem;}
.ea-prog-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;gap:1rem;flex-wrap:wrap;}
.ea-prog-title{font-size:.65rem;font-weight:800;text-transform:uppercase;letter-spacing:.22em;color:var(--gold);display:flex;align-items:center;gap:9px;}
.ea-prog-title::before{content:'';display:block;width:20px;height:2px;background:var(--gold);border-radius:99px;}
.ea-prog-count{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:var(--text);letter-spacing:.04em;line-height:1;}
.ea-prog-count span{color:var(--gold-lt);text-shadow:0 0 20px rgba(212,163,64,.3);}
.ea-prog-track{height:6px;background:var(--section-border);border-radius:99px;overflow:hidden;position:relative;}
[data-theme="dark"] .ea-prog-track{background:rgba(255,255,255,.06);}
.ea-prog-fill{height:100%;background:linear-gradient(90deg,#f59e0b,#f0c040,#fff8d0);border-radius:99px;transition:width 1.6s cubic-bezier(.4,0,.2,1);box-shadow:0 0 14px rgba(245,158,11,.4),0 0 4px rgba(245,158,11,.6);}
.ea-prog-tiles{display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:.75rem;}
.ea-prog-tile{height:6px;border-radius:3px;transition:all .4s ease;}
.ea-prog-tile.done{background:linear-gradient(90deg,#f59e0b,#fcd34d);}
.ea-prog-tile.open{background:var(--section-border);}
[data-theme="dark"] .ea-prog-tile.open{background:rgba(255,255,255,.06);}
/* Legacy - keep for ref */
.ea-prog{background:var(--prog-bg);border-radius:22px;padding:2rem 2.25rem;display:flex;align-items:center;gap:2rem;margin-bottom:2rem;border:1px solid var(--prog-border);flex-wrap:wrap;position:relative;overflow:hidden;}
.ea-prog::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 80% 50%,rgba(212,163,64,.06) 0%,transparent 70%);pointer-events:none;}
.ea-prog-info{flex:1;min-width:160px;position:relative;z-index:1;}
.ea-prog-lbl{font-size:.58rem;color:var(--gold);text-transform:uppercase;letter-spacing:.26em;font-weight:700;margin-bottom:.9rem;}
.ea-prog-sub{font-size:.7rem;color:rgba(255,255,255,.2);margin-top:8px;}
.ea-prog-pct{font-family:'Bebas Neue',sans-serif;font-size:3.5rem;color:var(--gold-lt);line-height:1;min-width:88px;text-align:right;letter-spacing:.04em;text-shadow:0 0 32px rgba(212,163,64,.35);position:relative;z-index:1;}

/* ── PHILOSOPHY ── */
.ea-philo{background:var(--card);border:1px solid var(--card-border);border-radius:16px;padding:1.75rem 2.25rem;margin-bottom:1.75rem;position:relative;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.ea-philo::before{content:'QM';position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);font-family:'Bebas Neue',sans-serif;font-size:6rem;color:rgba(200,152,58,.06);line-height:1;pointer-events:none;}
.ea-philo-t{font-size:1.08rem;font-weight:600;color:var(--text);margin:0 0 5px;}
.ea-philo-b{color:var(--text-dim);font-size:.85rem;margin:0 0 1rem;}
.ea-philo-lnk{color:var(--gold);font-size:.82rem;font-weight:600;text-decoration:none;letter-spacing:.04em;transition:color .2s;}
.ea-philo-lnk:hover{color:var(--gold-lt);}

/* ── FINAL TEST ── */
.ea-test{border-radius:16px;padding:1.4rem 1.75rem;margin-bottom:1.75rem;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;border:1.5px solid;transition:all .3s;}
.ea-test-btn{padding:11px 24px;border-radius:10px;border:none;font-family:'Outfit',sans-serif;font-weight:600;font-size:.86rem;cursor:pointer;transition:all .2s;white-space:nowrap;}

/* ── MODULE GRID ── */
.ea-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;margin-bottom:.5rem;}

/* ── MODULE CARD ── */
.ea-card{background:var(--card);border-radius:var(--r);padding:1.5rem;display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform .3s cubic-bezier(.2,.8,.3,1),box-shadow .3s ease,border-color .2s;box-shadow:var(--shadow-sm);border:1px solid var(--card-border);cursor:pointer;}
.ea-card:hover{transform:translateY(-6px) scale(1.01);box-shadow:var(--shadow-lg);}
.ea-card:active{transform:translateY(-2px) scale(.99);}
.ea-card-stripe{position:absolute;top:0;left:0;bottom:0;width:4px;border-radius:var(--r) 0 0 var(--r);}
.ea-card-num{position:absolute;top:.75rem;right:1rem;font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:rgba(0,0,0,.035);line-height:1;letter-spacing:.04em;pointer-events:none;user-select:none;}
[data-theme="dark"] .ea-card-num{color:rgba(255,255,255,.04);}
.ea-card-t{font-weight:700;font-size:.95rem;color:var(--text);margin:0 0 4px;line-height:1.3;padding-left:.25rem;}
.ea-card-code{font-family:'DM Mono',monospace;font-size:.63rem;color:var(--text-faint);background:var(--bg2);border:1px solid var(--section-border);padding:2px 8px;border-radius:5px;display:inline-block;margin-bottom:.9rem;margin-left:.25rem;letter-spacing:.06em;}
.ea-card-status{display:flex;align-items:center;gap:8px;margin-bottom:.9rem;padding-left:.25rem;}
.ea-card-chip{display:inline-flex;align-items:center;gap:5px;font-size:.65rem;font-weight:700;letter-spacing:.07em;padding:3px 10px;border-radius:99px;text-transform:uppercase;}
.ea-card-chip-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.ea-card-bar{height:3px;background:var(--section-border);border-radius:99px;margin:0 .25rem .9rem;overflow:hidden;}
.ea-card-bar-f{height:100%;border-radius:99px;transition:width .9s cubic-bezier(.4,0,.2,1);}
.ea-card-btn{display:flex;align-items:center;justify-content:center;gap:7px;padding:10px 14px;border-radius:11px;font-weight:700;font-size:.82rem;text-decoration:none;font-family:'Outfit',sans-serif;transition:all .22s;margin-top:auto;}
.ea-card-btn:hover{filter:brightness(1.12);transform:translateY(-1px);}
.ea-card-btn-arrow{font-size:.9rem;transition:transform .22s;}
.ea-card-btn:hover .ea-card-btn-arrow{transform:translateX(4px);}
.ea-card-done-glow{box-shadow:0 0 0 1.5px rgba(16,185,129,.3),0 4px 20px rgba(16,185,129,.12);}

/* ── MANUFACTURER BANNERS ── */
.med-list{display:flex;flex-direction:column;gap:0;}
.med-banner{position:relative;width:100%;overflow:hidden;cursor:pointer;border-radius:24px;margin-bottom:16px;min-height:240px;display:flex;align-items:center;transition:transform .4s cubic-bezier(.2,.8,.3,1),box-shadow .4s ease;box-shadow:var(--shadow-md);border:1px solid rgba(255,255,255,.05);}
.med-banner:hover{transform:translateY(-7px) scale(1.005);box-shadow:var(--shadow-xl);}
[data-theme="dark"] .med-banner{box-shadow:0 8px 32px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.04);}
[data-theme="dark"] .med-banner:hover{box-shadow:0 28px 72px rgba(0,0,0,.85),0 0 60px var(--accent-glow,rgba(200,100,0,.08)),0 0 0 1px rgba(255,255,255,.07);}
.med-banner-bg{position:absolute;inset:0;z-index:0;transition:transform .7s cubic-bezier(.25,.46,.45,.94);}
.med-banner:hover .med-banner-bg{transform:scale(1.05);}
.med-banner-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(100deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.45) 40%,rgba(0,0,0,.12) 70%,rgba(0,0,0,.05) 100%),linear-gradient(to bottom,rgba(0,0,0,.2) 0%,rgba(0,0,0,.0) 100%);}
.med-banner-accent{position:absolute;left:0;top:0;bottom:0;width:6px;z-index:3;border-radius:24px 0 0 24px;box-shadow:4px 0 28px rgba(255,255,255,.06);}
.med-banner::before{content:'';position:absolute;left:0;top:0;bottom:0;width:45%;z-index:1;background:linear-gradient(90deg,var(--accent-glow,rgba(200,100,0,.18)) 0%,transparent 100%);pointer-events:none;}
.med-banner::after{content:'';position:absolute;inset:0;z-index:1;background:radial-gradient(ellipse at 15% 50%,var(--accent-glow,rgba(200,100,0,.1)) 0%,transparent 60%);pointer-events:none;}
.med-banner-content{position:relative;z-index:2;padding:2.75rem 3.5rem;display:flex;align-items:center;gap:3rem;width:100%;}
.med-banner-logo-wrap{flex-shrink:0;width:210px;height:92px;display:flex;align-items:center;justify-content:center;background:#ffffff;border-radius:16px;padding:14px 22px;box-shadow:0 8px 32px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.1),inset 0 1px 0 rgba(255,255,255,.8);position:relative;overflow:hidden;transition:transform .3s ease,box-shadow .3s ease;}
.med-banner:hover .med-banner-logo-wrap{transform:scale(1.03) translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.15);}
.med-banner-logo{max-width:100%;max-height:100%;object-fit:contain;display:block;mix-blend-mode:multiply;}
[data-theme="dark"] .med-banner-logo{mix-blend-mode:normal;}
.med-banner-text{flex:1;min-width:0;}
.med-banner-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,3.5vw,3rem);color:#fff;letter-spacing:.06em;line-height:.95;margin-bottom:.5rem;text-shadow:0 2px 16px rgba(0,0,0,.5);}
.med-banner-tagline{font-size:.88rem;color:rgba(255,255,255,.7);font-weight:300;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.9rem;}
.med-banner-origin{display:flex;align-items:center;gap:7px;font-size:.73rem;color:rgba(255,255,255,.5);font-weight:500;}
.med-banner-origin::before{content:'📍';font-size:.75rem;}
.med-banner-arrow{flex-shrink:0;width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.75);font-size:1.2rem;transition:all .28s cubic-bezier(.2,.8,.3,1);backdrop-filter:blur(12px);}
.med-banner:hover .med-banner-arrow{background:rgba(255,255,255,.25);color:#fff;transform:translateX(5px) scale(1.08);box-shadow:0 4px 20px rgba(0,0,0,.3);}
.med-banner-badge{position:absolute;top:1.4rem;right:1.75rem;z-index:3;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;padding:5px 14px;border-radius:99px;background:rgba(0,0,0,.35);color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(12px);}
.med-banner-badge.active{background:rgba(16,185,129,.25);color:#86efac;border-color:rgba(16,185,129,.4);box-shadow:0 0 16px rgba(16,185,129,.15);}

/* ── GENERIC MFR DETAIL (non-RIWO) ── */
.med-detail{}
.med-detail-hero{position:relative;overflow:hidden;border-radius:20px;min-height:280px;display:flex;align-items:flex-end;margin-bottom:2rem;box-shadow:0 8px 40px rgba(0,0,0,.2);}
[data-theme="dark"] .med-detail-hero{box-shadow:0 8px 40px rgba(0,0,0,.5);}
.med-detail-hero-bg{position:absolute;inset:0;z-index:0;}
.med-detail-hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.1) 100%);}
.med-detail-hero-content{position:relative;z-index:2;padding:2.5rem 3rem;width:100%;display:flex;align-items:flex-end;gap:2.5rem;flex-wrap:wrap;}
.med-detail-logo-wrap{width:180px;height:72px;background:#ffffff;border-radius:12px;display:flex;align-items:center;justify-content:center;padding:12px 20px;flex-shrink:0;box-shadow:0 4px 20px rgba(0,0,0,.35),0 1px 0 rgba(255,255,255,.1);}
.med-detail-logo{max-width:100%;max-height:100%;object-fit:contain;mix-blend-mode:multiply;}
[data-theme="dark"] .med-detail-logo{mix-blend-mode:normal;}
.med-detail-hero-text{flex:1;min-width:0;}
.med-detail-hero-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,5vw,3.5rem);color:#fff;letter-spacing:.05em;line-height:.95;margin-bottom:.5rem;}
.med-detail-hero-tag{font-size:.82rem;color:rgba(255,255,255,.6);font-weight:300;letter-spacing:.1em;text-transform:uppercase;}
.med-info-grid{display:grid;grid-template-columns:1fr 2fr;gap:1.5rem;margin-bottom:2rem;}
.med-info-card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;padding:1.75rem;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.med-info-card-t{font-size:.75rem;font-weight:700;color:var(--text-faint);text-transform:uppercase;letter-spacing:.12em;margin-bottom:1rem;}
.med-facts{display:flex;flex-direction:column;gap:.75rem;}
.med-fact{display:flex;align-items:center;justify-content:space-between;padding:.6rem .75rem;background:var(--bg2);border-radius:8px;}
.med-fact-l{font-size:.75rem;color:var(--text-dim);font-weight:500;}
.med-fact-v{font-size:.82rem;color:var(--text);font-weight:700;}
.med-focus-tags{display:flex;flex-wrap:wrap;gap:8px;}
.med-focus-tag{padding:6px 14px;border-radius:99px;font-size:.75rem;font-weight:600;background:var(--bg2);color:var(--text-dim);border:1px solid var(--section-border);}
.med-desc{font-size:.9rem;color:var(--text-dim);line-height:1.75;margin-bottom:.75rem;}
.med-back{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;border:1px solid var(--section-border);background:var(--card);font-family:'Outfit',sans-serif;font-weight:600;font-size:.84rem;cursor:pointer;margin-bottom:2rem;color:var(--text);transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.med-back:hover{background:var(--bg2);}
.med-prod-list{display:flex;flex-direction:column;gap:12px;}
.med-prod-card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;padding:1.75rem 2rem;display:flex;align-items:center;gap:2rem;box-shadow:0 1px 4px rgba(0,0,0,.05);transition:all .22s;text-decoration:none;color:inherit;position:relative;overflow:hidden;}
.med-prod-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.1);border-color:rgba(200,152,58,.3);}
[data-theme="dark"] .med-prod-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.3);}
.med-prod-accent{position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:16px 0 0 16px;}
.med-prod-num{font-family:'Bebas Neue',sans-serif;font-size:2.2rem;color:var(--text-faint);letter-spacing:.04em;line-height:1;min-width:48px;text-align:center;flex-shrink:0;}
.med-prod-divider{width:1px;height:60px;background:var(--section-border);flex-shrink:0;}
.med-prod-body{flex:1;min-width:0;}
.med-prod-code{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--text-faint);background:var(--bg2);border:1px solid var(--section-border);padding:2px 8px;border-radius:4px;display:inline-block;margin-bottom:.5rem;}
.med-prod-title{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:.4rem;line-height:1.3;}
.med-prod-desc{font-size:.82rem;color:var(--text-dim);line-height:1.6;}
.med-prod-cta{flex-shrink:0;padding:10px 20px;border-radius:10px;font-family:'Outfit',sans-serif;font-weight:600;font-size:.82rem;text-decoration:none;transition:all .2s;white-space:nowrap;background:var(--bg2);color:var(--text-dim);border:1px solid var(--section-border);}
.med-prod-card:hover .med-prod-cta{background:var(--gold);color:#fff;border-color:var(--gold);}
.med-draft{text-align:center;padding:5rem 2rem;background:var(--card);border-radius:20px;border:2px dashed var(--section-border);margin-top:1.5rem;}
.med-draft-icon{font-size:3rem;margin-bottom:1rem;display:block;}
.med-draft-t{font-size:1.15rem;font-weight:700;color:var(--text);margin:0 0 .5rem;}
.med-draft-s{font-size:.86rem;color:var(--text-faint);margin:0 auto;max-width:360px;}
.ea-draft{text-align:center;padding:4rem 2rem;background:var(--card);border-radius:16px;border:1.5px dashed var(--section-border);}
.ea-draft-t{font-size:1.1rem;font-weight:600;color:var(--text);margin:0 0 .4rem;}
.ea-draft-s{font-size:.86rem;color:var(--text-faint);margin:0;}

/* ══ RIWOSPINE DETAIL ══ */
.riwo-back{display:inline-flex;align-items:center;gap:9px;padding:10px 20px;border-radius:11px;border:1px solid var(--section-border);background:var(--card);font-family:'Outfit',sans-serif;font-weight:600;font-size:.84rem;cursor:pointer;margin-bottom:2rem;color:var(--text);transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.riwo-back:hover{background:var(--bg2);transform:translateX(-2px);}
.riwo-hero{position:relative;overflow:hidden;border-radius:28px;min-height:360px;display:flex;align-items:flex-end;margin-bottom:2rem;box-shadow:0 24px 72px rgba(0,0,0,.3),0 0 0 1px rgba(192,57,43,.18);}
.riwo-hero-bg{position:absolute;inset:0;z-index:0;background:linear-gradient(160deg,#0f0404 0%,#1e0606 35%,#2a0808 60%,#1e0606 100%);}
.riwo-hero-grid{position:absolute;inset:0;z-index:1;opacity:.07;background-image:linear-gradient(rgba(192,57,43,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(192,57,43,.6) 1px,transparent 1px);background-size:48px 48px;}
.riwo-hero-overlay{position:absolute;inset:0;z-index:2;background:linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.05) 100%),linear-gradient(100deg,rgba(192,57,43,.12) 0%,transparent 60%);}
.riwo-hero-content{position:relative;z-index:3;padding:2.5rem 3rem;width:100%;display:flex;align-items:flex-end;gap:2.5rem;flex-wrap:wrap;}
.riwo-hero-logo-wrap{width:200px;height:80px;background:#fff;border-radius:14px;display:flex;align-items:center;justify-content:center;padding:14px 22px;flex-shrink:0;box-shadow:0 4px 24px rgba(0,0,0,.4),0 0 0 1px rgba(192,57,43,.2);}
.riwo-hero-logo{max-width:100%;max-height:100%;object-fit:contain;mix-blend-mode:multiply;}
[data-theme="dark"] .riwo-hero-logo{mix-blend-mode:normal;}
.riwo-hero-text{flex:1;min-width:0;}
.riwo-hero-eyebrow{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:#e84c3d;font-weight:700;margin-bottom:.5rem;display:flex;align-items:center;gap:8px;}
.riwo-hero-eyebrow::before{content:'';display:block;width:24px;height:1px;background:#e84c3d;}
.riwo-hero-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.2rem,5vw,3.8rem);color:#fff;letter-spacing:.06em;line-height:.95;margin-bottom:.5rem;}
.riwo-hero-tag{font-size:.82rem;color:rgba(255,255,255,.55);font-weight:300;letter-spacing:.1em;text-transform:uppercase;margin-bottom:1.2rem;}
.riwo-hero-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}
.riwo-btn-primary{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;background:#c0392b;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:.82rem;text-decoration:none;letter-spacing:.03em;border:none;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(192,57,43,.4);}
.riwo-btn-primary:hover{background:#e84c3d;transform:translateY(-1px);box-shadow:0 6px 20px rgba(192,57,43,.5);color:#fff;text-decoration:none;}
.riwo-btn-ghost{display:inline-flex;align-items:center;gap:8px;padding:9px 18px;border-radius:10px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.15);font-family:'Outfit',sans-serif;font-weight:600;font-size:.82rem;text-decoration:none;cursor:pointer;transition:all .2s;backdrop-filter:blur(8px);}
.riwo-btn-ghost:hover{background:rgba(255,255,255,.15);color:#fff;text-decoration:none;}
.riwo-hero-stats{position:absolute;top:1.5rem;right:1.5rem;z-index:4;display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;}
.riwo-stat-pill{background:rgba(0,0,0,.35);border:1px solid rgba(192,57,43,.3);backdrop-filter:blur(10px);border-radius:99px;padding:5px 13px;display:flex;align-items:center;gap:6px;}
.riwo-stat-pill-n{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:#e84c3d;line-height:1;}
.riwo-stat-pill-l{font-size:.58rem;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.1em;font-weight:600;}
.riwo-info-grid{display:grid;grid-template-columns:260px 1fr 280px;gap:14px;margin-bottom:1.75rem;}
.riwo-card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.riwo-card-label{font-size:.62rem;font-weight:700;color:var(--text-faint);text-transform:uppercase;letter-spacing:.14em;margin-bottom:1rem;display:flex;align-items:center;gap:8px;}
.riwo-card-label::after{content:'';flex:1;height:1px;background:var(--section-border);}
.riwo-facts{display:flex;flex-direction:column;gap:7px;}
.riwo-fact{display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:var(--bg2);border-radius:9px;}
.riwo-fact-l{font-size:.72rem;color:var(--text-dim);font-weight:500;}
.riwo-fact-v{font-size:.78rem;color:var(--text);font-weight:700;}
.riwo-website-link{display:flex;align-items:center;gap:10px;margin-top:1rem;padding:10px 14px;border-radius:10px;background:var(--riwo-red-dim);border:1px solid rgba(192,57,43,.3);color:#e84c3d;text-decoration:none;font-family:'Outfit',sans-serif;font-weight:600;font-size:.8rem;transition:all .2s;}
.riwo-website-link:hover{background:#c0392b;color:#fff;text-decoration:none;border-color:#c0392b;}
.riwo-website-link-icon{font-size:1rem;}
.riwo-website-link-arrow{margin-left:auto;font-size:.9rem;transition:transform .2s;}
.riwo-website-link:hover .riwo-website-link-arrow{transform:translateX(3px);}
.riwo-focus-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;}
.riwo-focus-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;background:var(--bg2);border:1px solid var(--section-border);transition:all .18s;cursor:default;}
.riwo-focus-item:hover{border-color:rgba(192,57,43,.3);background:var(--riwo-red-dim);}
.riwo-focus-icon{width:32px;height:32px;border-radius:8px;flex-shrink:0;background:var(--riwo-red-dim);display:flex;align-items:center;justify-content:center;font-size:1rem;}
.riwo-focus-name{font-size:.74rem;font-weight:700;color:var(--text);line-height:1.2;}
.riwo-focus-desc{font-size:.64rem;color:var(--text-faint);margin-top:1px;}
.riwo-map-card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.05);display:flex;flex-direction:column;}
.riwo-map-embed{flex:1;min-height:160px;position:relative;overflow:hidden;}
.riwo-map-embed iframe{width:100%;height:100%;border:none;display:block;min-height:185px;filter:grayscale(20%) contrast(1.05);}
.riwo-map-info{padding:1rem 1.25rem;border-top:1px solid var(--section-border);}
.riwo-map-pin{display:flex;align-items:flex-start;gap:9px;}
.riwo-map-pin-icon{font-size:1.1rem;flex-shrink:0;margin-top:1px;}
.riwo-map-city{font-size:.88rem;font-weight:700;color:var(--text);line-height:1.2;}
.riwo-map-region{font-size:.72rem;color:var(--text-faint);margin-top:2px;}
.riwo-map-badge{display:inline-flex;align-items:center;gap:5px;margin-top:8px;padding:3px 10px;border-radius:99px;background:var(--riwo-red-dim);border:1px solid rgba(192,57,43,.25);font-size:.62rem;font-weight:700;color:#e84c3d;text-transform:uppercase;letter-spacing:.1em;}
.riwo-sh{display:flex;align-items:center;gap:12px;margin:2.5rem 0 1.2rem;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--text);}
.riwo-sh-bar{width:3px;height:18px;border-radius:99px;background:#c0392b;flex-shrink:0;}
.riwo-sh-rule{flex:1;height:1px;background:linear-gradient(90deg,var(--section-border),transparent);}
.riwo-sh-count{font-family:'DM Mono',monospace;font-size:.62rem;padding:2px 9px;border-radius:99px;background:var(--riwo-red-dim);border:1px solid rgba(192,57,43,.25);color:#e84c3d;letter-spacing:.06em;}
.riwo-prod-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-bottom:2rem;}
.riwo-prod-card{background:var(--card);border:1px solid var(--card-border);border-radius:24px;overflow:hidden;display:flex;flex-direction:column;box-shadow:var(--shadow-md);transition:transform .4s cubic-bezier(.2,.8,.3,1),box-shadow .4s ease,border-color .25s;text-decoration:none;color:inherit;position:relative;}
.riwo-prod-card:hover{transform:translateY(-10px);box-shadow:0 28px 64px rgba(0,0,0,.22),0 0 0 1.5px rgba(192,57,43,.3),0 0 48px rgba(192,57,43,.07);text-decoration:none;color:inherit;border-color:rgba(192,57,43,.28);}
.riwo-prod-image{position:relative;height:240px;overflow:hidden;flex-shrink:0;}
.riwo-prod-image img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
.riwo-prod-card:hover .riwo-prod-image img{transform:scale(1.06);}
.riwo-prod-image-placeholder{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;position:relative;overflow:hidden;}
.riwo-prod-image-placeholder::before{content:'';position:absolute;inset:0;opacity:.06;background-image:linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px);background-size:32px 32px;}
.riwo-prod-ph-icon{font-size:2.8rem;position:relative;z-index:1;}
.riwo-prod-ph-code{font-family:'DM Mono',monospace;font-size:.68rem;color:rgba(255,255,255,.3);letter-spacing:.12em;position:relative;z-index:1;text-transform:uppercase;}
.riwo-prod-ph-text{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(0,0,0,.8) 0%,transparent 100%);padding:2rem 1.25rem .8rem;font-family:'Bebas Neue',sans-serif;font-size:1.4rem;color:rgba(255,255,255,.18);letter-spacing:.1em;line-height:1;}
.riwo-prod-badge{position:absolute;top:1rem;left:1rem;z-index:2;padding:4px 12px;border-radius:99px;font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#fff;backdrop-filter:blur(8px);box-shadow:0 2px 10px rgba(0,0,0,.3);}
.riwo-prod-num-badge{position:absolute;top:1rem;right:1rem;z-index:2;width:32px;height:32px;border-radius:8px;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:.72rem;font-weight:700;color:rgba(255,255,255,.6);}
.riwo-prod-top-bar{position:absolute;top:0;left:0;right:0;height:3px;background:#c0392b;z-index:1;}
.riwo-prod-body{padding:1.5rem;flex:1;display:flex;flex-direction:column;}
.riwo-prod-code-row{display:flex;align-items:center;gap:8px;margin-bottom:.6rem;}
.riwo-prod-code{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--text-faint);background:var(--bg2);border:1px solid var(--section-border);padding:2px 8px;border-radius:4px;display:inline-block;}
.riwo-prod-tagline{font-size:.68rem;color:#e84c3d;font-weight:600;text-transform:uppercase;letter-spacing:.08em;}
.riwo-prod-title{font-size:1.2rem;font-weight:800;color:var(--text);margin-bottom:.5rem;line-height:1.2;}
.riwo-prod-desc{font-size:.8rem;color:var(--text-dim);line-height:1.65;margin-bottom:1.2rem;}
.riwo-prod-specs{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-bottom:1.2rem;}
.riwo-prod-spec{background:var(--bg2);border-radius:9px;padding:8px 10px;display:flex;align-items:flex-start;gap:7px;border:1px solid var(--section-border);}
.riwo-prod-spec-icon{font-size:.9rem;flex-shrink:0;margin-top:1px;}
.riwo-prod-spec-label{font-size:.58rem;color:var(--text-faint);text-transform:uppercase;letter-spacing:.09em;font-weight:600;}
.riwo-prod-spec-val{font-size:.74rem;color:var(--text);font-weight:700;line-height:1.25;}
.riwo-prod-highlights{display:flex;flex-direction:column;gap:5px;margin-bottom:1.25rem;}
.riwo-prod-hl{display:flex;align-items:flex-start;gap:8px;font-size:.76rem;color:var(--text-dim);line-height:1.45;}
.riwo-prod-hl::before{content:'›';color:#c0392b;font-weight:700;flex-shrink:0;font-size:.9rem;margin-top:-1px;}
.riwo-prod-cta{display:flex;align-items:center;justify-content:space-between;padding:11px 16px;border-radius:11px;margin-top:auto;background:var(--riwo-red-dim);border:1px solid rgba(192,57,43,.25);font-family:'Outfit',sans-serif;font-weight:700;font-size:.82rem;color:#e84c3d;text-decoration:none;transition:all .2s;}
.riwo-prod-card:hover .riwo-prod-cta{background:#c0392b;color:#fff;border-color:#c0392b;}
.riwo-prod-cta-arrow{font-size:1rem;transition:transform .2s;}
.riwo-prod-card:hover .riwo-prod-cta-arrow{transform:translateX(4px);}

/* ══ INOMED DETAIL ══ */
.ino-back{display:inline-flex;align-items:center;gap:9px;padding:10px 20px;border-radius:11px;border:1px solid var(--section-border);background:var(--card);font-family:'Outfit',sans-serif;font-weight:600;font-size:.84rem;cursor:pointer;margin-bottom:2rem;color:var(--text);transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.ino-back:hover{background:var(--bg2);transform:translateX(-2px);}
.ino-hero{position:relative;overflow:hidden;border-radius:28px;min-height:360px;display:flex;align-items:flex-end;margin-bottom:2rem;box-shadow:0 24px 72px rgba(0,0,0,.3),0 0 0 1px rgba(21,101,192,.18);}
.ino-hero-bg{position:absolute;inset:0;z-index:0;background:linear-gradient(160deg,#020610 0%,#040c1e 35%,#071428 60%,#040c1e 100%);}
.ino-hero-grid{position:absolute;inset:0;z-index:1;opacity:.06;background-image:linear-gradient(rgba(30,136,229,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(30,136,229,.6) 1px,transparent 1px);background-size:48px 48px;}
.ino-hero-pulse{position:absolute;inset:0;z-index:1;overflow:hidden;}
.ino-hero-pulse::after{content:'';position:absolute;top:50%;left:50%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(21,101,192,.08) 0%,transparent 70%);transform:translate(-50%,-50%);animation:ino-pulse 4s ease-in-out infinite;}
@keyframes ino-pulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.5}50%{transform:translate(-50%,-50%) scale(1.15);opacity:1}}
.ino-hero-overlay{position:absolute;inset:0;z-index:2;background:linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.45) 50%,rgba(0,0,0,.05) 100%),linear-gradient(100deg,rgba(21,101,192,.1) 0%,transparent 60%);}
.ino-hero-content{position:relative;z-index:3;padding:2.5rem 3rem;width:100%;display:flex;align-items:flex-end;gap:2.5rem;flex-wrap:wrap;}
.ino-hero-logo-wrap{width:200px;height:80px;background:#fff;border-radius:14px;display:flex;align-items:center;justify-content:center;padding:14px 22px;flex-shrink:0;box-shadow:0 4px 24px rgba(0,0,0,.4),0 0 0 1px rgba(21,101,192,.2);}
.ino-hero-logo{max-width:100%;max-height:100%;object-fit:contain;mix-blend-mode:multiply;}
[data-theme="dark"] .ino-hero-logo{mix-blend-mode:normal;}
.ino-hero-text{flex:1;min-width:0;}
.ino-hero-eyebrow{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:#1e88e5;font-weight:700;margin-bottom:.5rem;display:flex;align-items:center;gap:8px;}
.ino-hero-eyebrow::before{content:'';display:block;width:24px;height:1px;background:#1e88e5;}
.ino-hero-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.2rem,5vw,3.8rem);color:#fff;letter-spacing:.06em;line-height:.95;margin-bottom:.5rem;}
.ino-hero-tag{font-size:.82rem;color:rgba(255,255,255,.55);font-weight:300;letter-spacing:.1em;text-transform:uppercase;margin-bottom:1.2rem;}
.ino-hero-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}
.ino-hero-stats{position:absolute;top:1.5rem;right:1.5rem;z-index:4;display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;}
.ino-stat-pill{background:rgba(0,0,0,.35);border:1px solid rgba(21,101,192,.35);backdrop-filter:blur(10px);border-radius:99px;padding:5px 13px;display:flex;align-items:center;gap:6px;}
.ino-stat-pill-n{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:#1e88e5;line-height:1;}
.ino-stat-pill-l{font-size:.58rem;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.1em;font-weight:600;}
.ino-btn-primary{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;background:#1565c0;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:.82rem;text-decoration:none;letter-spacing:.03em;border:none;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(21,101,192,.4);}
.ino-btn-primary:hover{background:#1e88e5;transform:translateY(-1px);box-shadow:0 6px 20px rgba(21,101,192,.5);color:#fff;text-decoration:none;}
.ino-btn-ghost{display:inline-flex;align-items:center;gap:8px;padding:9px 18px;border-radius:10px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.15);font-family:'Outfit',sans-serif;font-weight:600;font-size:.82rem;text-decoration:none;cursor:pointer;transition:all .2s;backdrop-filter:blur(8px);}
.ino-btn-ghost:hover{background:rgba(255,255,255,.15);color:#fff;text-decoration:none;}
.ino-info-grid{display:grid;grid-template-columns:260px 1fr 280px;gap:14px;margin-bottom:1.75rem;}
.ino-card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.ino-card-label{font-size:.62rem;font-weight:700;color:var(--text-faint);text-transform:uppercase;letter-spacing:.14em;margin-bottom:1rem;display:flex;align-items:center;gap:8px;}
.ino-card-label::after{content:'';flex:1;height:1px;background:var(--section-border);}
.ino-facts{display:flex;flex-direction:column;gap:7px;}
.ino-fact{display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:var(--bg2);border-radius:9px;}
.ino-fact-l{font-size:.72rem;color:var(--text-dim);font-weight:500;}
.ino-fact-v{font-size:.78rem;color:var(--text);font-weight:700;}
.ino-website-link{display:flex;align-items:center;gap:10px;margin-top:1rem;padding:10px 14px;border-radius:10px;background:var(--ino-blue-dim);border:1px solid rgba(21,101,192,.3);color:#1e88e5;text-decoration:none;font-family:'Outfit',sans-serif;font-weight:600;font-size:.8rem;transition:all .2s;}
.ino-website-link:hover{background:#1565c0;color:#fff;text-decoration:none;border-color:#1565c0;}
.ino-website-link-arrow{margin-left:auto;font-size:.9rem;transition:transform .2s;}
.ino-website-link:hover .ino-website-link-arrow{transform:translateX(3px);}
.ino-focus-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;}
.ino-focus-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;background:var(--bg2);border:1px solid var(--section-border);transition:all .18s;cursor:default;}
.ino-focus-item:hover{border-color:rgba(21,101,192,.3);background:var(--ino-blue-dim);}
.ino-focus-icon{width:32px;height:32px;border-radius:8px;flex-shrink:0;background:var(--ino-blue-dim);display:flex;align-items:center;justify-content:center;font-size:1rem;}
.ino-focus-name{font-size:.74rem;font-weight:700;color:var(--text);line-height:1.2;}
.ino-focus-desc{font-size:.64rem;color:var(--text-faint);margin-top:1px;}
.ino-map-card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.05);display:flex;flex-direction:column;}
.ino-map-embed{flex:1;min-height:160px;position:relative;overflow:hidden;}
.ino-map-embed iframe{width:100%;height:100%;border:none;display:block;min-height:185px;filter:grayscale(20%) contrast(1.05);}
.ino-map-info{padding:1rem 1.25rem;border-top:1px solid var(--section-border);}
.ino-map-pin{display:flex;align-items:flex-start;gap:9px;}
.ino-map-pin-icon{font-size:1.1rem;flex-shrink:0;margin-top:1px;}
.ino-map-city{font-size:.88rem;font-weight:700;color:var(--text);line-height:1.2;}
.ino-map-region{font-size:.72rem;color:var(--text-faint);margin-top:2px;}
.ino-map-badge{display:inline-flex;align-items:center;gap:5px;margin-top:8px;padding:3px 10px;border-radius:99px;background:var(--ino-blue-dim);border:1px solid rgba(21,101,192,.25);font-size:.62rem;font-weight:700;color:#1e88e5;text-transform:uppercase;letter-spacing:.1em;}
.ino-sh{display:flex;align-items:center;gap:12px;margin:2.5rem 0 1.2rem;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--text);}
.ino-sh-bar{width:3px;height:18px;border-radius:99px;background:#1565c0;flex-shrink:0;}
.ino-sh-rule{flex:1;height:1px;background:linear-gradient(90deg,var(--section-border),transparent);}
.ino-sh-count{font-family:'DM Mono',monospace;font-size:.62rem;padding:2px 9px;border-radius:99px;background:var(--ino-blue-dim);border:1px solid rgba(21,101,192,.25);color:#1e88e5;letter-spacing:.06em;}
.ino-prod-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-bottom:2rem;}
.ino-prod-card{background:var(--card);border:1px solid var(--card-border);border-radius:24px;overflow:hidden;display:flex;flex-direction:column;box-shadow:var(--shadow-md);transition:transform .4s cubic-bezier(.2,.8,.3,1),box-shadow .4s ease,border-color .25s;text-decoration:none;color:inherit;position:relative;}
.ino-prod-card:hover{transform:translateY(-10px);box-shadow:0 28px 64px rgba(0,0,0,.22),0 0 0 1.5px rgba(21,101,192,.3),0 0 48px rgba(21,101,192,.07);text-decoration:none;color:inherit;border-color:rgba(21,101,192,.28);}
.ino-prod-image{position:relative;height:240px;overflow:hidden;flex-shrink:0;}
.ino-prod-image img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
.ino-prod-card:hover .ino-prod-image img{transform:scale(1.06);}
.ino-prod-image-placeholder{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;position:relative;overflow:hidden;}
.ino-prod-image-placeholder::before{content:'';position:absolute;inset:0;opacity:.06;background-image:linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px);background-size:32px 32px;}
.ino-prod-ph-icon{font-size:2.8rem;position:relative;z-index:1;}
.ino-prod-ph-code{font-family:'DM Mono',monospace;font-size:.68rem;color:rgba(255,255,255,.3);letter-spacing:.12em;position:relative;z-index:1;text-transform:uppercase;}
.ino-prod-ph-text{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(0,0,0,.8) 0%,transparent 100%);padding:2rem 1.25rem .8rem;font-family:'Bebas Neue',sans-serif;font-size:1.4rem;color:rgba(255,255,255,.18);letter-spacing:.1em;line-height:1;}
.ino-prod-badge{position:absolute;top:1rem;left:1rem;z-index:2;padding:4px 12px;border-radius:99px;font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#fff;backdrop-filter:blur(8px);box-shadow:0 2px 10px rgba(0,0,0,.3);}
.ino-prod-num-badge{position:absolute;top:1rem;right:1rem;z-index:2;width:32px;height:32px;border-radius:8px;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:.72rem;font-weight:700;color:rgba(255,255,255,.6);}
.ino-prod-top-bar{position:absolute;top:0;left:0;right:0;height:3px;background:#1565c0;z-index:1;}
.ino-prod-body{padding:1.5rem;flex:1;display:flex;flex-direction:column;}
.ino-prod-code-row{display:flex;align-items:center;gap:8px;margin-bottom:.6rem;}
.ino-prod-code{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--text-faint);background:var(--bg2);border:1px solid var(--section-border);padding:2px 8px;border-radius:4px;display:inline-block;}
.ino-prod-tagline{font-size:.68rem;color:#1e88e5;font-weight:600;text-transform:uppercase;letter-spacing:.08em;}
.ino-prod-title{font-size:1.2rem;font-weight:800;color:var(--text);margin-bottom:.5rem;line-height:1.2;}
.ino-prod-desc{font-size:.8rem;color:var(--text-dim);line-height:1.65;margin-bottom:1.2rem;}
.ino-prod-specs{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-bottom:1.2rem;}
.ino-prod-spec{background:var(--bg2);border-radius:9px;padding:8px 10px;display:flex;align-items:flex-start;gap:7px;border:1px solid var(--section-border);}
.ino-prod-spec-icon{font-size:.9rem;flex-shrink:0;margin-top:1px;}
.ino-prod-spec-label{font-size:.58rem;color:var(--text-faint);text-transform:uppercase;letter-spacing:.09em;font-weight:600;}
.ino-prod-spec-val{font-size:.74rem;color:var(--text);font-weight:700;line-height:1.25;}
.ino-prod-highlights{display:flex;flex-direction:column;gap:5px;margin-bottom:1.25rem;}
.ino-prod-hl{display:flex;align-items:flex-start;gap:8px;font-size:.76rem;color:var(--text-dim);line-height:1.45;}
.ino-prod-hl::before{content:'›';color:#1565c0;font-weight:700;flex-shrink:0;font-size:.9rem;margin-top:-1px;}
.ino-prod-cta{display:flex;align-items:center;justify-content:space-between;padding:11px 16px;border-radius:11px;margin-top:auto;background:var(--ino-blue-dim);border:1px solid rgba(21,101,192,.25);font-family:'Outfit',sans-serif;font-weight:700;font-size:.82rem;color:#1e88e5;text-decoration:none;transition:all .2s;}
.ino-prod-card:hover .ino-prod-cta{background:#1565c0;color:#fff;border-color:#1565c0;}
.ino-prod-cta-arrow{font-size:1rem;transition:transform .2s;}
.ino-prod-card:hover .ino-prod-cta-arrow{transform:translateX(4px);}
.ino-anim{animation:ea-up .35s ease both;}
.ino-anim-1{animation:ea-up .35s .05s ease both;}
.ino-anim-2{animation:ea-up .35s .10s ease both;}
.ino-anim-3{animation:ea-up .35s .15s ease both;}
.ino-prod-grid .ino-prod-card:nth-child(1){animation:ea-up .4s .08s ease both;}
.ino-prod-grid .ino-prod-card:nth-child(2){animation:ea-up .4s .16s ease both;}
.ino-prod-grid .ino-prod-card:nth-child(3){animation:ea-up .4s .24s ease both;}
.ino-prod-grid .ino-prod-card:nth-child(4){animation:ea-up .4s .32s ease both;}
@media(min-width:768px) and (max-width:1099px){
  .ino-info-grid{grid-template-columns:240px 1fr 260px;}
  .ino-prod-grid{grid-template-columns:1fr;}
}
@media(min-width:480px) and (max-width:767px){
  .ino-info-grid{grid-template-columns:1fr 1fr;}
  .ino-info-grid > :last-child{grid-column:1/-1;}
  .ino-prod-grid{grid-template-columns:1fr;}
  .ino-hero{min-height:240px;border-radius:14px;}
  .ino-hero-content{padding:1.75rem;flex-direction:column;align-items:flex-start;}
  .ino-hero-logo-wrap{width:150px;height:62px;}
}
@media(max-width:479px){
  .ino-info-grid{grid-template-columns:1fr;}
  .ino-prod-grid{grid-template-columns:1fr;gap:12px;}
  .ino-hero{min-height:200px;border-radius:12px;}
  .ino-hero-content{padding:1.25rem;flex-direction:column;align-items:flex-start;gap:1rem;}
  .ino-hero-logo-wrap{width:130px;height:54px;}
  .ino-hero-stats{top:.75rem;right:.75rem;gap:5px;}
  .ino-prod-image{height:160px;}
  .ino-focus-grid{grid-template-columns:1fr;}
  .ino-prod-specs{grid-template-columns:1fr;}
}

/* ── ANIMATIONS ── */
@keyframes ea-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.riwo-anim{animation:ea-up .35s ease both;}
.riwo-anim-1{animation:ea-up .35s .05s ease both;}
.riwo-anim-2{animation:ea-up .35s .10s ease both;}
.riwo-anim-3{animation:ea-up .35s .15s ease both;}
.riwo-prod-grid .riwo-prod-card:nth-child(1){animation:ea-up .4s .08s ease both;}
.riwo-prod-grid .riwo-prod-card:nth-child(2){animation:ea-up .4s .16s ease both;}
.riwo-prod-grid .riwo-prod-card:nth-child(3){animation:ea-up .4s .24s ease both;}
.riwo-prod-grid .riwo-prod-card:nth-child(4){animation:ea-up .4s .32s ease both;}
@keyframes tab-slide-in-right{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes tab-slide-in-left{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes tab-slide-in-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.tab-enter-right{animation:tab-slide-in-right .38s cubic-bezier(.25,.46,.45,.94) both;}
.tab-enter-left{animation:tab-slide-in-left .38s cubic-bezier(.25,.46,.45,.94) both;}
.tab-enter-up{animation:tab-slide-in-up .3s ease both;}
.ea-grid .ea-card{animation:tab-slide-in-up .3s ease both;}
.ea-grid .ea-card:nth-child(1){animation-delay:.04s;}
.ea-grid .ea-card:nth-child(2){animation-delay:.08s;}
.ea-grid .ea-card:nth-child(3){animation-delay:.12s;}
.ea-grid .ea-card:nth-child(4){animation-delay:.16s;}
.ea-grid .ea-card:nth-child(5){animation-delay:.20s;}
.ea-grid .ea-card:nth-child(6){animation-delay:.24s;}
.ea-grid .ea-card:nth-child(7){animation-delay:.28s;}
.ea-grid .ea-card:nth-child(8){animation-delay:.32s;}

/* ══ SAP ══ */
.sap-section{width:100vw;margin-left:calc(-50vw + 50%);background:var(--sap-bg);color:var(--sap-text);border-top:1px solid var(--section-border);border-bottom:1px solid var(--section-border);}
.sap-hd{background:var(--sap-hd-bg);border-bottom:1px solid var(--sap-nav-border);padding:4rem 5% 3rem;position:relative;overflow:hidden;}
.sap-hd::before{content:'SAP UNIVERSUM';position:absolute;right:2%;bottom:-.5rem;font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,9vw,8rem);color:rgba(200,152,58,.07);line-height:1;pointer-events:none;letter-spacing:.08em;white-space:nowrap;}
.sap-hd-inner{max-width:1600px;margin:0 auto;}
.sap-eyebrow{font-size:.62rem;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);font-weight:600;display:flex;align-items:center;gap:9px;margin-bottom:.7rem;}
.sap-eyebrow::before{content:'';display:block;width:28px;height:1px;background:var(--gold);opacity:.6;}
.sap-hd-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4.2rem);color:var(--sap-text);margin:0 0 .5rem;letter-spacing:.05em;line-height:.92;}
.sap-hd-title span{color:var(--gold);}
.sap-hd-sub{color:var(--sap-text-dim);font-size:.9rem;font-weight:300;line-height:1.65;max-width:640px;margin:0 0 1.5rem;}
.sap-hd-pills{display:flex;gap:10px;flex-wrap:wrap;}
.sap-pill{background:rgba(200,152,58,.1);border:1px solid rgba(200,152,58,.25);color:var(--gold);font-size:.68rem;font-weight:600;padding:5px 13px;border-radius:99px;letter-spacing:.07em;text-transform:uppercase;}
.sap-nav{background:var(--sap-nav-bg);border-bottom:1px solid var(--sap-nav-border);position:sticky;top:0;z-index:100;}
.sap-nav-inner{max-width:1600px;margin:0 auto;padding:0 5%;display:flex;overflow-x:auto;}
.sap-nav-inner::-webkit-scrollbar{display:none;}
.sap-ntab{padding:.95rem 1.5rem;border:none;background:transparent;color:var(--sap-text-faint);font-family:'Outfit',sans-serif;font-size:.86rem;font-weight:500;cursor:pointer;white-space:nowrap;border-bottom:2px solid transparent;transition:all .18s;flex-shrink:0;}
.sap-ntab:hover{color:var(--sap-text);}
.sap-ntab.on{color:var(--gold);border-bottom-color:var(--gold);font-weight:600;}
.sap-content{max-width:1600px;margin:0 auto;padding:3rem 5% 5rem;}
.sap-sh{font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--sap-text);letter-spacing:.07em;margin:0 0 .4rem;display:flex;align-items:center;gap:14px;}
.sap-sh-rule{flex:1;height:1px;background:linear-gradient(90deg,var(--sap-border),transparent);}
.sap-ss{font-size:.84rem;color:var(--sap-text-faint);margin:0 0 2rem;font-weight:300;}
@keyframes sap-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.sap-anim{animation:sap-up .3s ease;}
.sap-flow{display:flex;align-items:center;overflow-x:auto;padding-bottom:1rem;margin-bottom:2rem;gap:0;}
.sap-flow::-webkit-scrollbar{height:3px;}
.sap-flow::-webkit-scrollbar-thumb{background:rgba(200,152,58,.2);border-radius:99px;}
.sap-fc{flex-shrink:0;background:var(--card);border:1px solid var(--sap-border);border-radius:12px;padding:1rem 1.1rem;text-align:center;cursor:pointer;transition:all .2s;min-width:110px;max-width:130px;box-shadow:0 1px 3px rgba(0,0,0,.06);}
.sap-fc:hover,.sap-fc.on{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,.1);}
.sap-fc.on{border-color:var(--fc-col,#c8983a);}
.sap-fc-em{font-size:1.6rem;display:block;margin-bottom:5px;}
.sap-fc-lbl{font-size:.65rem;color:var(--sap-text-dim);line-height:1.3;font-weight:500;}
.sap-arr{color:rgba(200,152,58,.4);font-size:1.1rem;padding:0 3px;flex-shrink:0;margin-bottom:14px;}
.sap-dp{background:var(--card);border:1px solid var(--sap-border);border-radius:16px;padding:2rem;margin-bottom:2rem;border-left:3px solid;box-shadow:0 2px 8px rgba(0,0,0,.06);}
.sap-dp-top{display:flex;align-items:center;gap:14px;margin-bottom:1.25rem;}
.sap-dp-em{font-size:2rem;}
.sap-dp-phase{font-size:.6rem;text-transform:uppercase;letter-spacing:.18em;font-weight:700;margin-bottom:3px;}
.sap-dp-name{font-size:1.05rem;font-weight:700;color:var(--sap-text);}
.sap-dp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;}
.sap-dp-item{background:var(--sap-card);border:1px solid var(--sap-border);border-radius:10px;padding:.9rem 1rem;display:flex;gap:10px;align-items:flex-start;}
.sap-dp-ico{font-size:1rem;flex-shrink:0;margin-top:1px;}
.sap-dp-txt{font-size:.8rem;color:var(--sap-text-dim);line-height:1.5;}
.sap-pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
.sap-pcard{background:var(--card);border:1px solid var(--sap-border);border-radius:16px;padding:1.5rem;cursor:pointer;transition:all .22s;position:relative;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06);}
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
.sap-mgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:14px;}
.sap-mc{background:var(--card);border:1px solid var(--sap-border);border-radius:16px;overflow:hidden;transition:all .22s;box-shadow:0 1px 3px rgba(0,0,0,.06);}
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
.sap-kpi{background:var(--sap-card);border:1px solid var(--sap-border);border-radius:9px;padding:6px 10px;text-align:center;min-width:68px;}
.sap-kpi-v{font-family:'Bebas Neue',sans-serif;font-size:1.05rem;line-height:1;letter-spacing:.03em;}
.sap-kpi-l{font-size:.57rem;color:var(--sap-text-faint);text-transform:uppercase;letter-spacing:.09em;margin-top:2px;}
.sap-mc-deep{padding:1.25rem 1.5rem;border-top:1px solid var(--sap-border);font-size:.8rem;color:var(--sap-text-dim);line-height:1.75;white-space:pre-line;background:var(--sap-card);}
.sap-mdr-chain{display:flex;align-items:center;overflow-x:auto;padding:1.5rem 0 1rem;gap:0;}
.sap-mdr-chain::-webkit-scrollbar{height:3px;}
.sap-mdr-chain::-webkit-scrollbar-thumb{background:rgba(200,152,58,.2);border-radius:99px;}
.sap-mdr-step{flex-shrink:0;background:var(--card);border:1px solid var(--sap-border);border-radius:14px;padding:1.2rem 1rem;text-align:center;min-width:130px;max-width:155px;box-shadow:0 1px 3px rgba(0,0,0,.06);}
.sap-mdr-em{font-size:1.7rem;display:block;margin-bottom:6px;}
.sap-mdr-t{font-size:.75rem;font-weight:700;color:var(--sap-text);margin-bottom:4px;line-height:1.25;}
.sap-mdr-s{font-size:.64rem;color:var(--sap-text-faint);line-height:1.5;white-space:pre-line;}
.sap-mdr-arr{color:rgba(200,152,58,.4);font-size:1.3rem;padding:0 6px;flex-shrink:0;}
.sap-esc{border-radius:14px;padding:1.5rem 1.75rem;margin-bottom:10px;border-left:4px solid;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.sap-esc-hd{display:flex;align-items:center;gap:12px;margin-bottom:1rem;flex-wrap:wrap;}
.sap-esc-badge{font-size:.63rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;padding:3px 10px;border-radius:6px;white-space:nowrap;}
.sap-esc-title{font-size:.97rem;font-weight:700;color:var(--sap-text);margin:2px 0 2px;}
.sap-esc-trig{font-size:.72rem;color:var(--sap-text-faint);}
.sap-esc-acts{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;}
.sap-esc-act{background:var(--card);border:1px solid var(--sap-border);border-radius:9px;padding:.7rem .9rem;font-size:.77rem;color:var(--sap-text-dim);display:flex;gap:8px;}
.sap-rgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;}
.sap-rc{background:var(--card);border:1px solid var(--sap-border);border-radius:14px;padding:1.4rem;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.sap-rc-ico{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:.8rem;}
.sap-rc-badge{display:inline-block;padding:2px 9px;border-radius:5px;font-family:'DM Mono',monospace;font-size:.62rem;font-weight:500;letter-spacing:.07em;margin-bottom:6px;}
.sap-rc-name{font-size:.9rem;font-weight:700;color:var(--sap-text);margin-bottom:4px;}
.sap-rc-mod{font-size:.74rem;color:var(--sap-text-faint);line-height:1.4;}
.sap-sod-grid{display:flex;flex-direction:column;gap:9px;margin-top:1.5rem;}
.sap-sod{background:rgba(220,38,38,.06);border:1px solid rgba(220,38,38,.15);border-radius:12px;padding:1.1rem 1.3rem;display:grid;grid-template-columns:1fr auto 1fr;gap:1rem;align-items:center;}
[data-theme="dark"] .sap-sod{background:rgba(220,38,38,.1);border-color:rgba(220,38,38,.2);}
.sap-sod-c{font-size:.8rem;font-weight:600;color:#b91c1c;}
[data-theme="dark"] .sap-sod-c{color:#fca5a5;}
.sap-sod-b{background:rgba(220,38,38,.12);color:#dc2626;padding:3px 11px;border-radius:99px;font-size:.63rem;font-weight:700;text-transform:uppercase;text-align:center;white-space:nowrap;}
[data-theme="dark"] .sap-sod-b{background:rgba(220,38,38,.2);color:#fca5a5;}
.sap-sod-ctrl{font-size:.75rem;color:#059669;}
[data-theme="dark"] .sap-sod-ctrl{color:#6ee7b7;}
.sap-tl-wrap{display:grid;grid-template-columns:1fr 1fr;gap:2rem 4rem;position:relative;}
.sap-tl-col{position:relative;padding-left:1.8rem;}
.sap-tl-col::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,var(--gold),rgba(200,152,58,.05));}
.sap-tl-item{padding-bottom:1.75rem;position:relative;}
.sap-tl-dot{position:absolute;left:-1.8rem;top:5px;width:13px;height:13px;border-radius:50%;border:2px solid;transform:translateX(-50%);}
.sap-tl-dot.d{background:var(--gold);border-color:var(--gold);}
.sap-tl-dot.t{background:var(--sap-bg);border-color:rgba(200,152,58,.3);}
.sap-tl-ph{font-family:'DM Mono',monospace;font-size:.64rem;color:var(--gold);letter-spacing:.1em;margin-bottom:3px;}
.sap-tl-name{font-size:.94rem;font-weight:700;color:var(--sap-text);margin-bottom:3px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.sap-tl-desc{font-size:.77rem;color:var(--sap-text-faint);}
.sap-tl-badge{font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:2px 7px;border-radius:4px;}
.sap-tl-badge.d{background:rgba(5,150,105,.12);color:#059669;}
[data-theme="dark"] .sap-tl-badge.d{background:rgba(16,185,129,.15);color:#6ee7b7;}
.sap-tl-badge.t{background:rgba(200,152,58,.1);color:var(--gold);}
.sap-proj-bar{background:var(--card);border:1px solid var(--sap-border);border-radius:14px;padding:1.5rem 2rem;margin-bottom:2.5rem;display:flex;align-items:center;gap:2rem;flex-wrap:wrap;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.sap-pbar-info{flex:1;min-width:180px;}
.sap-pbar-lbl{font-size:.6rem;color:var(--gold);text-transform:uppercase;letter-spacing:.2em;font-weight:600;margin-bottom:8px;}
.sap-pbar-track{height:4px;background:var(--sap-card2);border-radius:99px;overflow:hidden;}
.sap-pbar-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold-lt));border-radius:99px;}
.sap-pbar-sub{font-size:.7rem;color:var(--sap-text-faint);margin-top:6px;}
.sap-pbar-pct{font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:var(--gold);line-height:1;letter-spacing:.04em;}
.sap-uat-stats{display:flex;gap:12px;margin-bottom:1.5rem;flex-wrap:wrap;}
.sap-uat-stat{background:var(--card);border:1px solid var(--sap-border);border-radius:12px;padding:.8rem 1.2rem;display:flex;align-items:center;gap:10px;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.sap-uat-n{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;line-height:1;letter-spacing:.03em;}
.sap-uat-l{font-size:.62rem;color:var(--sap-text-faint);text-transform:uppercase;letter-spacing:.1em;font-weight:500;}
.sap-pbar-wrap{flex:1;min-width:180px;background:var(--card);border:1px solid var(--sap-border);border-radius:12px;padding:.8rem 1.2rem;display:flex;align-items:center;gap:14px;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.sap-pb-bg{flex:1;height:4px;background:var(--sap-card2);border-radius:99px;overflow:hidden;}
.sap-pb-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#059669,#10b981);transition:width .5s;}
.sap-filters{display:flex;gap:7px;margin-bottom:1.25rem;flex-wrap:wrap;}
.sap-fb{padding:6px 13px;border-radius:7px;border:1px solid var(--sap-border);background:var(--card);color:var(--sap-text-dim);font-family:'Outfit',sans-serif;font-size:.74rem;font-weight:500;cursor:pointer;transition:all .16s;box-shadow:0 1px 2px rgba(0,0,0,.04);}
.sap-fb:hover{color:var(--sap-text);border-color:rgba(200,152,58,.4);}
.sap-fb.on{background:rgba(200,152,58,.08);border-color:var(--gold);color:var(--gold);}
.sap-table-wrap{background:var(--card);border:1px solid var(--sap-border);border-radius:14px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.sap-table{width:100%;border-collapse:collapse;}
.sap-table th{text-align:left;padding:.7rem 1rem;font-size:.61rem;text-transform:uppercase;letter-spacing:.14em;color:var(--sap-text-faint);font-weight:700;border-bottom:1px solid var(--sap-border);background:var(--sap-card);}
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
.sap-sb{width:28px;height:28px;border-radius:6px;border:1px solid var(--sap-border);background:var(--sap-card);font-size:.72rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .14s;}
.sap-sb:hover{border-color:rgba(200,152,58,.4);}
.sap-sb.pass{background:rgba(5,150,105,.1);border-color:#059669;color:#059669;}
[data-theme="dark"] .sap-sb.pass{background:rgba(16,185,129,.18);border-color:#10b981;color:#6ee7b7;}
.sap-sb.fail{background:rgba(220,38,38,.1);border-color:#dc2626;color:#dc2626;}
[data-theme="dark"] .sap-sb.fail{background:rgba(220,38,38,.18);border-color:#dc2626;color:#fca5a5;}
.sap-sb.pend{background:rgba(200,152,58,.1);border-color:var(--gold);color:var(--gold);}

/* ── RESPONSIVE ── */
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
  .med-banner{min-height:220px;border-radius:24px;}
  .med-banner-content{padding:3rem 4rem;}
  .med-banner-logo-wrap{width:240px;height:100px;}
  .med-banner-name{font-size:2.8rem;}
  .med-info-grid{grid-template-columns:320px 1fr;}
  .riwo-info-grid{grid-template-columns:280px 1fr 300px;}
}
@media(min-width:1100px) and (max-width:1399px){
  .ea-grid{grid-template-columns:repeat(4,1fr);}
  .sap-pgrid{grid-template-columns:repeat(4,1fr);}
  .sap-mgrid{grid-template-columns:repeat(3,1fr);}
  .sap-rgrid{grid-template-columns:repeat(3,1fr);}
  .riwo-info-grid{grid-template-columns:240px 1fr 260px;}
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
  .med-banner{min-height:150px;}
  .med-banner-content{padding:2rem;}
  .med-banner-logo-wrap{width:150px;height:66px;}
  .med-info-grid{grid-template-columns:1fr;}
  .riwo-info-grid{grid-template-columns:1fr 1fr;}
  .riwo-info-grid > :last-child{grid-column:1/-1;}
  .riwo-prod-grid{grid-template-columns:1fr;}
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
  .med-banner{min-height:130px;border-radius:14px;}
  .med-banner-content{padding:1.5rem;gap:1.5rem;}
  .med-banner-logo-wrap{width:120px;height:54px;}
  .med-banner-name{font-size:1.6rem;}
  .med-info-grid{grid-template-columns:1fr;}
  .riwo-info-grid{grid-template-columns:1fr;}
  .riwo-prod-grid{grid-template-columns:1fr;}
  .riwo-hero{min-height:240px;border-radius:14px;}
  .riwo-hero-content{padding:1.75rem;flex-direction:column;align-items:flex-start;}
  .riwo-hero-logo-wrap{width:150px;height:62px;}
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
  .ea-prog-pct{font-size:2.2rem;min-width:56px;}
  .ea-philo{padding:1.35rem 1.2rem;}
  .ea-philo::before{display:none;}
  .ea-test{padding:1.2rem;flex-direction:column;gap:.9rem;}
  .ea-test-btn{width:100%;}
  .med-banner{min-height:120px;border-radius:12px;margin-bottom:10px;}
  .med-banner-content{padding:1.25rem;gap:1rem;}
  .med-banner-logo-wrap{width:90px;height:44px;padding:8px 12px;}
  .med-banner-name{font-size:1.4rem;}
  .med-banner-tagline{display:none;}
  .med-banner-origin{font-size:.65rem;}
  .med-banner-arrow{width:36px;height:36px;font-size:.9rem;}
  .med-banner-badge{font-size:.58rem;padding:3px 9px;top:.9rem;right:1rem;}
  .med-info-grid{grid-template-columns:1fr;}
  .med-prod-card{padding:1.1rem 1.25rem;gap:1rem;flex-wrap:wrap;}
  .med-prod-num{font-size:1.6rem;min-width:36px;}
  .med-prod-divider{display:none;}
  .med-prod-cta{display:none;}
  .riwo-info-grid{grid-template-columns:1fr;}
  .riwo-prod-grid{grid-template-columns:1fr;gap:12px;}
  .riwo-hero{min-height:200px;border-radius:12px;}
  .riwo-hero-content{padding:1.25rem;flex-direction:column;align-items:flex-start;gap:1rem;}
  .riwo-hero-logo-wrap{width:130px;height:54px;}
  .riwo-hero-stats{top:.75rem;right:.75rem;gap:5px;}
  .riwo-stat-pill{padding:3px 8px;}
  .riwo-prod-image{height:160px;}
  .riwo-prod-specs{grid-template-columns:1fr;}
  .riwo-focus-grid{grid-template-columns:1fr;}
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

// ─── I18N ────────────────────────────────────────────────────────────────────

const LANGS = [
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
];

const TRANSLATIONS: Record<string, Record<string, any>> = {
  de: {
    // ── HERO ──
    heroEyebrow:      'Emig GmbH · Interne Lernplattform · Reutlingen',
    heroTagline:      'Qualität · Wissen · Exzellenz',
    statQM:           'QM Module',
    statMfr:          'Hersteller',
    statSAP:          'SAP Phasen',
    // ── GREET ──
    greetMorning:     'Guten Morgen',
    greetDay:         'Guten Tag',
    greetEvening:     'Guten Abend',
    welcomeBack:      'willkommen zurück.',
    progressDone:     (d:number,t:number) => `${d} von ${t} QM-Modulen abgeschlossen`,
    progressStart:    'Starten Sie Ihr erstes Lernmodul.',
    progressPill:     (p:number) => `${p}% abgeschlossen`,
    // ── TABS ──
    tabQM:            'Quality Management',
    tabSAP:           'SAP Universum',
    tabMED:           'Medizinprodukte',
    // ── QM ──
    qmProgressLabel:  'Lernfortschritt',
    qmModulesOf:      (d:number,t:number) => `${d} / ${t} Module`,
    qmPhiloTitle:     'QM Philosophie & Strategie',
    qmPhiloSub:       'Leitbild, PDCA, Rollen, Normen und QM-KPIs — mit umfangreichem Wissenstest.',
    qmPhiloMeta:      ['5 Kapitel','12 Fragen','~15 Min.'],
    qmOpenModule:     'Modul öffnen',
    qmIsoTag:         'ISO 13485:2016 · EU MDR 2017/745',
    finalTestReady:   'Finaler Test & Zertifikat',
    finalTestLocked:  'Finaler Test — gesperrt',
    finalTestReadySub:'Alle Module abgeschlossen. Jetzt testen.',
    finalTestLockedSub:(n:number) => `Noch ${n} Module bis zur Freischaltung.`,
    finalTestBtn:     'Prüfung starten',
    // ── SH LABELS ──
    shLogistik:       'Logistik & Lager',
    shEinkauf:        'Einkauf & Lieferanten',
    shRegulatorik:    'Regulatorik & MDR',
    // ── MODULE NAMES ──
    modLager1:        'Lagerbedingungen',
    modLager2:        'Rückverfolgbarkeit',
    modLager3:        'Sperrware',
    modLager4:        'Inventur',
    modEink1:         'Lieferantenbewertung',
    modEink2:         'Einkaufsprozess',
    modReg1:          'Importeurpflichten',
    modReg2:          'Händlerpflichten',
    modReg3:          'PRRC',
    modReg4:          'Audits',
    // ── CARD ──
    cardDone:         'Abgeschlossen',
    cardDraft:        'In Vorbereitung',
    cardRepeat:       'Wiederholen',
    cardStart:        'Starten',
    // ── MED ──
    medHeading:       'Hersteller & Produktschulungen',
    medBack:          '← Alle Hersteller',
    medOpenModule:    'Modul öffnen',
    // ── SAP ──
    sapEyebrow:        'SAP Business One · Emig GmbH',
    sapTitleHighlight: 'Business One',
    sapSubtitle:       'End-to-End-Digitalisierung aller Geschäftsprozesse — MDR-konform & auditierbar.',
    sapNavTabs:        ['Prozesskarte','Module','MDR-Compliance','Rollen & SoD','Projektzeitplan','UAT-Protokoll'],
    sapMapTitle:       'Prozesskarte',
    sapMapSub:         'Alle Kernprozesse auf einen Blick — von Wareneingang bis Rechnung.',
    sapModTitle:       'SAP-Module',
    sapModSub:         (n:number) => `${n} Module im Einsatz — von Vertrieb bis Service.`,
    sapMdrTitle:       'MDR-Compliance',
    sapMdrSub:         'MDR-Prozesskette von Wareneingang bis Rückverfolgung.',
    sapEscTitle:       'Eskalationsprotokoll',
    sapEscSub:         '3-stufiger Eskalationsprozess bei Servicemeldungen und Field Safety Notices.',
    sapRolesTitle:     'Rollen & Berechtigungen',
    sapRolesSub:       'Rollenbasierte Zugriffssteuerung — kein User erhält mehr Rechte als nötig.',
    sapSodTitle:       'Segregation of Duties',
    sapSodSub:         'Kritische Funktionskombinationen, die systemseitig getrennt sind.',
  },
  en: {
    heroEyebrow:      'Emig GmbH · Internal Learning Platform · Reutlingen',
    heroTagline:      'Quality · Knowledge · Excellence',
    statQM:           'QM Modules',
    statMfr:          'Manufacturers',
    statSAP:          'SAP Phases',
    greetMorning:     'Good Morning',
    greetDay:         'Good Day',
    greetEvening:     'Good Evening',
    welcomeBack:      'welcome back.',
    progressDone:     (d:number,t:number) => `${d} of ${t} QM modules completed`,
    progressStart:    'Start your first learning module.',
    progressPill:     (p:number) => `${p}% complete`,
    tabQM:            'Quality Management',
    tabSAP:           'SAP Universe',
    tabMED:           'Medical Devices',
    qmProgressLabel:  'Learning Progress',
    qmModulesOf:      (d:number,t:number) => `${d} / ${t} Modules`,
    qmPhiloTitle:     'QM Philosophy & Strategy',
    qmPhiloSub:       'Mission, PDCA, roles, standards and QM KPIs — with comprehensive knowledge test.',
    qmPhiloMeta:      ['5 Chapters','12 Questions','~15 Min.'],
    qmOpenModule:     'Open Module',
    qmIsoTag:         'ISO 13485:2016 · EU MDR 2017/745',
    finalTestReady:   'Final Test & Certificate',
    finalTestLocked:  'Final Test — Locked',
    finalTestReadySub:'All modules completed. Start the test now.',
    finalTestLockedSub:(n:number) => `${n} more modules until unlock.`,
    finalTestBtn:     'Start Exam',
    shLogistik:       'Logistics & Warehouse',
    shEinkauf:        'Purchasing & Suppliers',
    shRegulatorik:    'Regulatory & MDR',
    modLager1:        'Storage Conditions',
    modLager2:        'Traceability',
    modLager3:        'Blocked Stock',
    modLager4:        'Inventory',
    modEink1:         'Supplier Evaluation',
    modEink2:         'Purchasing Process',
    modReg1:          'Importer Obligations',
    modReg2:          'Distributor Obligations',
    modReg3:          'PRRC',
    modReg4:          'Audits',
    cardDone:         'Completed',
    cardDraft:        'In Preparation',
    cardRepeat:       'Repeat',
    cardStart:        'Start',
    medHeading:       'Manufacturers & Product Training',
    medBack:          '← All Manufacturers',
    medOpenModule:    'Open Module',
    sapEyebrow:        'SAP Business One · Emig GmbH',
    sapTitleHighlight: 'Business One',
    sapSubtitle:       'End-to-end digitization of all business processes — MDR-compliant & auditable.',
    sapNavTabs:        ['Process Map','Modules','MDR Compliance','Roles & SoD','Project Timeline','UAT Protocol'],
    sapMapTitle:       'Process Map',
    sapMapSub:         'All core processes at a glance — from goods receipt to invoice.',
    sapModTitle:       'SAP Modules',
    sapModSub:         (n:number) => `${n} modules in use — from sales to service.`,
    sapMdrTitle:       'MDR Compliance',
    sapMdrSub:         'MDR process chain from goods receipt to traceability.',
    sapEscTitle:       'Escalation Protocol',
    sapEscSub:         '3-stage escalation process for service reports and Field Safety Notices.',
    sapRolesTitle:     'Roles & Permissions',
    sapRolesSub:       'Role-based access control — no user receives more rights than necessary.',
    sapSodTitle:       'Segregation of Duties',
    sapSodSub:         'Critical function combinations that are separated at system level.',
  },
  ru: {
    heroEyebrow:      'Emig GmbH · Внутренняя учебная платформа · Ройтлинген',
    heroTagline:      'Качество · Знания · Превосходство',
    statQM:           'Модули КМ',
    statMfr:          'Производители',
    statSAP:          'Фазы SAP',
    greetMorning:     'Доброе утро',
    greetDay:         'Добрый день',
    greetEvening:     'Добрый вечер',
    welcomeBack:      'с возвращением.',
    progressDone:     (d:number,t:number) => `${d} из ${t} модулей КМ пройдено`,
    progressStart:    'Начните свой первый учебный модуль.',
    progressPill:     (p:number) => `${p}% выполнено`,
    tabQM:            'Управление качеством',
    tabSAP:           'Вселенная SAP',
    tabMED:           'Медизделия',
    qmProgressLabel:  'Прогресс обучения',
    qmModulesOf:      (d:number,t:number) => `${d} / ${t} модулей`,
    qmPhiloTitle:     'Философия и стратегия КМ',
    qmPhiloSub:       'Миссия, PDCA, роли, стандарты и KPI — с комплексным тестом.',
    qmPhiloMeta:      ['5 глав','12 вопросов','~15 мин.'],
    qmOpenModule:     'Открыть модуль',
    qmIsoTag:         'ISO 13485:2016 · EU MDR 2017/745',
    finalTestReady:   'Финальный тест и сертификат',
    finalTestLocked:  'Финальный тест — заблокирован',
    finalTestReadySub:'Все модули пройдены. Начать тест.',
    finalTestLockedSub:(n:number) => `Ещё ${n} модулей до разблокировки.`,
    finalTestBtn:     'Начать экзамен',
    shLogistik:       'Логистика и склад',
    shEinkauf:        'Закупки и поставщики',
    shRegulatorik:    'Регуляторика и MDR',
    modLager1:        'Условия хранения',
    modLager2:        'Прослеживаемость',
    modLager3:        'Заблокированный товар',
    modLager4:        'Инвентаризация',
    modEink1:         'Оценка поставщиков',
    modEink2:         'Процесс закупок',
    modReg1:          'Обязанности импортёра',
    modReg2:          'Обязанности дистрибьютора',
    modReg3:          'PRRC',
    modReg4:          'Аудиты',
    cardDone:         'Завершено',
    cardDraft:        'В разработке',
    cardRepeat:       'Повторить',
    cardStart:        'Начать',
    medHeading:       'Производители и обучение по продуктам',
    medBack:          '← Все производители',
    medOpenModule:    'Открыть модуль',
    sapEyebrow:        'SAP Business One · Emig GmbH',
    sapTitleHighlight: 'Business One',
    sapSubtitle:       'Комплексная цифровизация всех бизнес-процессов — MDR-совместимо и с возможностью аудита.',
    sapNavTabs:        ['Карта процессов','Модули','MDR-Соответствие','Роли и SoD','График проекта','UAT-Протокол'],
    sapMapTitle:       'Карта процессов',
    sapMapSub:         'Все ключевые процессы: от поступления товара до выставления счёта.',
    sapModTitle:       'Модули SAP',
    sapModSub:         (n:number) => `${n} модулей в работе — от продаж до сервиса.`,
    sapMdrTitle:       'MDR-Соответствие',
    sapMdrSub:         'Цепочка MDR от поступления товара до прослеживаемости.',
    sapEscTitle:       'Протокол эскалации',
    sapEscSub:         '3-уровневый процесс эскалации при сервисных обращениях и уведомлениях FSN.',
    sapRolesTitle:     'Роли и права доступа',
    sapRolesSub:       'Ролевое управление доступом — ни один пользователь не получает лишних прав.',
    sapSodTitle:       'Разделение обязанностей',
    sapSodSub:         'Критические комбинации функций, разделённые на уровне системы.',
  },
};

function getT(lang: string) {
  const d = TRANSLATIONS[lang] ?? TRANSLATIONS['de'];
  return (key: string, ...args: any[]) => {
    const val = d[key];
    if (typeof val === 'function') return val(...args);
    return val ?? (TRANSLATIONS['de'][key] ?? key);
  };
}

// ─── LANGUAGE SWITCHER ───────────────────────────────────────────────────────

function LanguageSwitcher({ lang, setLang }: { lang: string; setLang: (code: string) => void }) {
  return (
    <div className="ea-lang">
      {LANGS.map(l => (
        <button key={l.code} className={`ea-lang-btn${lang===l.code?' active':''}`} onClick={()=>setLang(l.code)}>
          <span className="ea-lang-flag">{l.flag}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── SAP UNIVERSE ────────────────────────────────────────────────────────────

function SAPUniverse({ lang: langProp }: { lang?: string } = {}) {
  const [lang, setLang] = useState(langProp ?? 'de');
  const t = getT(lang);
  const [tab, setTab]    = useState('map');
  const [step, setStep]  = useState<string | null>(null);
  const [mod, setMod]    = useState<string | null>(null);
  const [uf, setUF]      = useState('all');
  const [st, setSt]      = useState(() =>
    Object.fromEntries(SAP_UAT.map(t=>[t.id,'open'])));

  const toggle = (id: string, s: string) =>
    setSt(p=>({...p,[id]:p[id]===s?'open':s}));

  const pass  = Object.values(st).filter(v=>v==='pass').length;
  const fail_ = Object.values(st).filter(v=>v==='fail').length;
  const open_ = Object.values(st).filter(v=>v==='open').length;
  const pct   = Math.round((pass/SAP_UAT.length)*100);

  const MC={Vertrieb:'#818cf8',Einkauf:'#fbbf24',Lager:'#34d399',Finanzen:'#f87171',Service:'#c084fc',Intercompany:'#2dd4bf'};
  const MB={Vertrieb:'#818cf815',Einkauf:'#fbbf2415',Lager:'#34d39915',Finanzen:'#f8717115',Service:'#c084fc15',Intercompany:'#2dd4bf15'};
  const filt = uf==='all'?SAP_UAT:uf==='pass'?SAP_UAT.filter(t=>st[t.id]==='pass'):uf==='fail'?SAP_UAT.filter(t=>st[t.id]==='fail'):uf==='open'?SAP_UAT.filter(t=>st[t.id]==='open'):SAP_UAT.filter(t=>t.mod===uf);

  const TABS=[{id:'map',l:t('sapNavTabs')[0]},{id:'modules',l:t('sapNavTabs')[1]},{id:'mdr',l:t('sapNavTabs')[2]},{id:'roles',l:t('sapNavTabs')[3]},{id:'timeline',l:t('sapNavTabs')[4]},{id:'uat',l:t('sapNavTabs')[5]}];

  return (
    <div className="sap-section">
      <div className="sap-hd">
        <div className="sap-hd-inner">
          <div className="sap-eyebrow">{t('sapEyebrow')}</div>
          <h2 className="sap-hd-title">SAP <span>{t('sapTitleHighlight')}</span></h2>
          <p className="sap-hd-sub">{t('sapSubtitle')}</p>
          <div className="sap-hd-pills">
            <span className="sap-pill">Go-Live Nov 2026</span>
            <span className="sap-pill">MDR 2017/745</span>
            <span className="sap-pill">{SAP_MODS.length} Module</span>
            <span className="sap-pill">{SAP_PROC.length} Prozessschritte</span>
            <span className="sap-pill">MiaMed Q1/2027</span>
          </div>
        </div>
      </div>
      <div className="sap-nav">
        <div className="sap-nav-inner">
          {TABS.map(t=>(
            <button key={t.id} className={`sap-ntab ${tab===t.id?'on':''}`} onClick={()=>setTab(t.id)}>{t.l}</button>
          ))}
        </div>
      </div>
      <div className="sap-content">
        {tab==='map' && (
          <div className="sap-anim">
            <div className="sap-sh">{t('sapMapTitle')} <div className="sap-sh-rule"/></div>
            <p className="sap-ss">{t('sapMapSub')}</p>
            <div className="sap-flow">
              {SAP_PROC.map((s,i)=>(
                <React.Fragment key={s.id}>
                  <div className={`sap-fc ${step===s.id?'on':''}`} style={{'--fc-col':s.col} as React.CSSProperties} onClick={()=>setStep(step===s.id?null:s.id)}>
                    <span className="sap-fc-em">{s.em}</span>
                    <span className="sap-fc-lbl">{s.title}</span>
                  </div>
                  {i<SAP_PROC.length-1&&<div className="sap-arr">&#8594;</div>}
                </React.Fragment>
              ))}
            </div>
            {step && (()=>{
              const s=SAP_PROC.find(x=>x.id===step);
              if (!s) return null;
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
            <div className="sap-pgrid">
              {SAP_PROC.map(s=>(
                <div key={s.id} className={`sap-pcard ${step===s.id?'on':''}`} style={{'--pc':s.col} as React.CSSProperties} onClick={()=>setStep(step===s.id?null:s.id)}>
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
        {tab==='modules' && (
          <div className="sap-anim">
            <div className="sap-sh">{t('sapModTitle')} <div className="sap-sh-rule"/></div>
            <p className="sap-ss">{t('sapModSub',SAP_MODS.length)}</p>
            <div className="sap-mgrid">
              {SAP_MODS.map(m=>(
                <div key={m.id} className="sap-mc">
                  <div className="sap-mc-hd" onClick={()=>setMod(mod===m.id?null:m.id)}>
                    <div className="sap-mc-ico" style={{background:m.col+'1a'}}><span>{m.em}</span></div>
                    <div style={{flex:1}}>
                      <div className="sap-mc-ref">{m.ref}</div>
                      <div className="sap-mc-title">{m.title}</div>
                    </div>
                    <span style={{color:'var(--sap-text-faint)',fontSize:'.8rem'}}>{mod===m.id?'▲':'▼'}</span>
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
        {tab==='mdr' && (
          <div className="sap-anim">
            <div className="sap-sh">{t('sapMdrTitle')} <div className="sap-sh-rule"/></div>
            <p className="sap-ss">{t('sapMdrSub')}</p>
            <div className="sap-mdr-chain">
              {[
                {e:'📦',t:'Wareneingang',s:'UDI-Scan\nCE/DoC-Prüfung\nCharge + MHD'},
                {e:'🛡️',t:'MDR-Gate',s:'CE fehlt?\nAuto-Sperre\nKein WE mögl.'},
                {e:'🏪',t:'Lagerung',s:'Haupt-/Sperrlager\nMHD-Monitoring\n60-Tage-Alarm'},
                {e:'📋',t:'Kommissionierung',s:'DoC-Prüfung\nQR-Scan Pflicht\nCharge zugeord.'},
                {e:'🚚',t:'Versand',s:'UDI-Etiketten\nLieferschein+MHD\nEquip. Card'},
                {e:'🔧',t:'Service',s:'Field Safety\nRückruf-Workflow\nBfArM'},
                {e:'🔍',t:'Rückverfolgung',s:'Vorwärts: Empf.\nRückwärts: Lief.\n< 5 Sek.'},
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
              <div className="sap-sh" style={{fontSize:'1.5rem',marginBottom:'.4rem'}}>{t('sapEscTitle')} <div className="sap-sh-rule"/></div>
              <p className="sap-ss">{t('sapEscSub')}</p>
              {[
                {s:'1',e:'🔍',t:'Interne Diagnose',sla:'4 Stunden',trig:'Eingang Servicemeldung',c:'#34d399',acts:['Geräteakte (Equipment Card) geladen','Knowledge Base durchsucht','Interne Lösung angewendet','Falls keine Lösung: Eskalation Stufe 2']},
                {s:'2',e:'📡',t:'Herstellermeldung',sla:'24 Stunden',trig:'Keine interne Lösung oder sicherheitsrelevant',c:'#fbbf24',acts:['Auto: Seriennummer + Fehlerprotokoll','Fotos/Anhänge am Serviceabruf','Status: Eskaliert — Hersteller informiert','SLA-Uhr für Herstellerantwort gestartet']},
                {s:'3',e:'🚨',t:'Field Safety / Rückruf',sla:'2 Stunden (!)',trig:'Systematischer Defekt oder FSN des Herstellers',c:'#f87171',acts:['Vorwärtssuche: alle Empfänger der Charge','Rückwärtssuche: Ursprungslieferant','Status Under Recall systemweit gesetzt','BfArM-Berichte automatisch generiert']},
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
                      <div className="sap-esc-act" key={i}><span style={{color:esc.c,flexShrink:0}}>›</span>{a}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==='roles' && (
          <div className="sap-anim">
            <div className="sap-sh">{t('sapRolesTitle')} <div className="sap-sh-rule"/></div>
            <p className="sap-ss">{t('sapRolesSub')}</p>
            <div className="sap-rgrid">
              {[
                {i:'👔',t:'Geschäftsführung',c:'#e2e8f0',m:'Vollzugriff + 4-Augen-Freigabe',b:'GF'},
                {i:'💼',t:'Vertrieb',c:'#818cf8',m:'CRM, Angebote, Aufträge',b:'VT'},
                {i:'📦',t:'Lager / Logistik',c:'#34d399',m:'WE, Kommissionierung, Versand',b:'LA'},
                {i:'🔧',t:'Service-Techniker',c:'#c084fc',m:'Tickets, RMA, Equipment Card',b:'ST'},
                {i:'💶',t:'Buchhaltung',c:'#f87171',m:'Rechnungen, DATEV, Controlling',b:'BU'},
                {i:'⚙️',t:'IT-Administrator',c:'#94a3b8',m:'System, Rechte, Schnittstellen',b:'IT'},
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
              <div className="sap-sh" style={{fontSize:'1.5rem',marginBottom:'.4rem'}}>{t('sapSodTitle')} <div className="sap-sh-rule"/></div>
              <p className="sap-ss">{t('sapSodSub')}</p>
              <div className="sap-sod-grid">
                {[
                  {a:'Angebot erstellen + Kundenauftrag freigeben',risk:'Falschbuchung ohne Kontrolle',ctrl:'4-Augen: GF-Freigabe zwingend'},
                  {a:'Warenausgang buchen + Rechnung erstellen',risk:'Fiktive Lieferungen möglich',ctrl:'Trennung Lager und Finanzen'},
                  {a:'Lieferantenstamm anlegen + Bestellung auslösen',risk:'Phantomlieferanten-Betrug',ctrl:'Doppelfreigabe Einkauf + GF'},
                  {a:'DATEV-Export + Buchungen stornieren',risk:'Nachträgliche Manipulation',ctrl:'Nur IT-Admin + Finanzen gemeinsam'},
                  {a:'Zahlungssperre aufheben + Zahlung auslösen',risk:'Unberechtigte Zahlungen',ctrl:'GF-Freigabe zwingend'},
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
              {[SAP_TL.slice(0,4),SAP_TL.slice(4)].map((col,ci)=>(
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
                  <div style={{fontSize:'.6rem',color:'var(--sap-text-faint)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:8}}>Gesamtfortschritt</div>
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
                        <td><span className="sap-mbadge" style={{background:(MB as Record<string,string>)[t.mod]||'#ffffff0d',color:(MC as Record<string,string>)[t.mod]||'#fff'}}>{t.mod}</span></td>
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

// ─── MANUFACTURER BANNER ─────────────────────────────────────────────────────

function MfrBanner({m, onClick}: {m: any; onClick: () => void}) {
  const [err, setErr] = useState(false);
  const logo = useBaseUrl(m.logo);
  const hasProducts = m.products && m.products.length > 0;
  return (
    <div className="med-banner" style={{'--accent-glow': m.accent + '22'} as React.CSSProperties} onClick={onClick}>
      <div className="med-banner-bg" style={{background: m.bg}} />
      <div className="med-banner-overlay" />
      <div className="med-banner-accent" style={{background: m.accent}} />
      <div className={`med-banner-badge ${hasProducts ? 'active' : ''}`}>
        {hasProducts ? 'Module verfügbar' : 'In Vorbereitung'}
      </div>
      <div className="med-banner-content">
        <div className="med-banner-logo-wrap">
          {!err
            ? <img src={logo} alt={m.name} className="med-banner-logo" onError={()=>setErr(true)}/>
            : <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.1rem',color:m.accent,fontWeight:700,letterSpacing:'.04em'}}>{m.name}</span>}
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

// ─── GENERIC MFR DETAIL ───────────────────────────────────────────────────────

function MfrDetail({m, onBack, lang='de'}: {m: any; onBack: () => void; lang?: string}) {
  const t = getT(lang);
  const [err, setErr] = useState(false);
  const logo = useBaseUrl(m.logo);
  const hasProducts = m.products && m.products.length > 0;
  const focusTags = m.focus
    ? m.focus.map((f: any) => (typeof f === 'string' ? f : f.label))
    : [];
  return (
    <div className="med-detail">
      <button className="med-back" onClick={onBack}>&#8592; {t('medBack')}</button>
      <div className="med-detail-hero">
        <div className="med-detail-hero-bg" style={{background: m.bg}} />
        <div className="med-detail-hero-overlay" />
        <div className="med-detail-hero-content">
          <div className="med-detail-logo-wrap">
            {!err
              ? <img src={logo} alt={m.name} className="med-detail-logo" onError={()=>setErr(true)}/>
              : <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.1rem',color:m.accent,fontWeight:700}}>{m.name}</span>}
          </div>
          <div className="med-detail-hero-text">
            <div className="med-detail-hero-name">{m.name}</div>
            <div className="med-detail-hero-tag">{m.tagline}</div>
          </div>
        </div>
      </div>
      <div className="med-info-grid">
        <div className="med-info-card">
          <div className="med-info-card-t">Unternehmensdaten</div>
          <div className="med-facts">
            {m.facts.map((f: any, i: number) => (
              <div className="med-fact" key={i}>
                <span className="med-fact-l">{f.label}</span>
                <span className="med-fact-v">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="med-info-card">
          <div className="med-info-card-t">Über {m.name}</div>
          <p className="med-desc">{m.description}</p>
          <div className="med-info-card-t" style={{marginBottom:'.75rem'}}>Schwerpunkte</div>
          <div className="med-focus-tags">
            {focusTags.map((f: any, i: number) => (
              <span className="med-focus-tag" key={i}>{f}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="ea-sh" style={{marginTop:'2rem'}}>
        <div className="ea-sh-bar" style={{background: m.accent}}/>
        Produktmodule
        <div className="ea-sh-rule"/>
      </div>
      {hasProducts ? (
        <div className="med-prod-list">
          {m.products.map((p: any, i: number) => (
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

// ─── RIWOSPINE DETAIL ─────────────────────────────────────────────────────────

function RiwoMap({ loc }: { loc: any }) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.lng - 0.08}%2C${loc.lat - 0.05}%2C${loc.lng + 0.08}%2C${loc.lat + 0.05}&layer=mapnik&marker=${loc.lat}%2C${loc.lng}`;
  return (
    <div className="riwo-map-card riwo-anim-3">
      <div className="riwo-card-label" style={{padding:'1.25rem 1.5rem 0'}}>
        <span>Standort</span>
      </div>
      <div className="riwo-map-embed">
        <iframe src={mapUrl} title="RIWOspine Standort Knittlingen" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
      </div>
      <div className="riwo-map-info">
        <div className="riwo-map-pin">
          <span className="riwo-map-pin-icon">📍</span>
          <div>
            <div className="riwo-map-city">{loc.city}</div>
            <div className="riwo-map-region">{loc.country}</div>
            <div className="riwo-map-badge"><span>●</span> Richard Wolf Gruppe</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiwoProdCard({ p, idx }: { p: any; idx: number }) {
  const [imgErr, setImgErr] = useState(false);
  const imgSrc = useBaseUrl(p.image);
  return (
    <Link to={p.link} className="riwo-prod-card">
      <div className="riwo-prod-top-bar"/>
      <div className="riwo-prod-image">
        {!imgErr ? (
          <img src={imgSrc} alt={p.title} onError={()=>setImgErr(true)}/>
        ) : (
          <div className="riwo-prod-image-placeholder" style={{background:`linear-gradient(135deg,${p.imagePlaceholderColor} 0%,rgba(0,0,0,.8) 100%)`}}>
            <span className="riwo-prod-ph-icon">🔬</span>
            <span className="riwo-prod-ph-code">{p.code}</span>
            <div className="riwo-prod-ph-text">{p.title}</div>
          </div>
        )}
        <span className="riwo-prod-badge" style={{background:p.badgeColor+'cc'}}>{p.badge}</span>
        <span className="riwo-prod-num-badge">0{idx+1}</span>
      </div>
      <div className="riwo-prod-body">
        <div className="riwo-prod-code-row">
          <span className="riwo-prod-code">{p.code}</span>
          <span className="riwo-prod-tagline">{p.tagline}</span>
        </div>
        <div className="riwo-prod-title">{p.title}</div>
        <div className="riwo-prod-desc">{p.desc}</div>
        <div className="riwo-prod-specs">
          {p.specs.map((s: any,i: number)=>(
            <div className="riwo-prod-spec" key={i}>
              <span className="riwo-prod-spec-icon">{s.icon}</span>
              <div>
                <div className="riwo-prod-spec-label">{s.label}</div>
                <div className="riwo-prod-spec-val">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="riwo-prod-highlights">
          {p.highlights.map((h: any,i: number)=>(
            <div className="riwo-prod-hl" key={i}>{h}</div>
          ))}
        </div>
        <div className="riwo-prod-cta">
          <span>Modul öffnen</span>
          <span className="riwo-prod-cta-arrow">→</span>
        </div>
      </div>
    </Link>
  );
}

function RIWOspineDetail({ onBack, lang='de' }: { onBack: () => void; lang?: string }) {
  const t = getT(lang);
  const m = MFRS.find(x => x.id === 'riwo')!;
  const [logoErr, setLogoErr] = useState(false);
  const logoSrc = useBaseUrl(m.logo);
  return (
    <div>
      <button className="riwo-back riwo-anim" onClick={onBack}>← {t('medBack')}</button>
      <div className="riwo-hero riwo-anim">
        <div className="riwo-hero-bg"/>
        <div className="riwo-hero-grid"/>
        <div className="riwo-hero-overlay"/>
        <div className="riwo-hero-stats">
          {[{n:'1906',l:'Gegründet'},{n:'100+',l:'Länder'},{n:'2k+',l:'Mitarbeiter'}].map((s,i)=>(
            <div className="riwo-stat-pill" key={i}>
              <span className="riwo-stat-pill-n">{s.n}</span>
              <span className="riwo-stat-pill-l">{s.l}</span>
            </div>
          ))}
        </div>
        <div className="riwo-hero-content">
          <div className="riwo-hero-logo-wrap">
            {!logoErr
              ? <img src={logoSrc} alt={m.name} className="riwo-hero-logo" onError={()=>setLogoErr(true)}/>
              : <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.1rem',color:'#c0392b',fontWeight:700}}>{m.name}</span>}
          </div>
          <div className="riwo-hero-text">
            <div className="riwo-hero-eyebrow">Medizinprodukt · Wirbelsäulenchirurgie</div>
            <div className="riwo-hero-name">{m.name}</div>
            <div className="riwo-hero-tag">{m.tagline}</div>
            <div className="riwo-hero-actions">
              <a href={m.website} target="_blank" rel="noopener noreferrer" className="riwo-btn-primary">🌐 riwospine.com ↗</a>
              <span className="riwo-btn-ghost">📍 {m.location?.city}, DE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="riwo-info-grid">
        <div className="riwo-card riwo-anim-1">
          <div className="riwo-card-label">Unternehmensdaten</div>
          <div className="riwo-facts">
            {m.facts.map((f,i)=>(
              <div className="riwo-fact" key={i}>
                <span className="riwo-fact-l">{f.label}</span>
                <span className="riwo-fact-v">{f.value}</span>
              </div>
            ))}
          </div>
          <a href={m.website} target="_blank" rel="noopener noreferrer" className="riwo-website-link">
            <span className="riwo-website-link-icon">🌐</span>
            <span>www.riwospine.com</span>
            <span className="riwo-website-link-arrow">↗</span>
          </a>
        </div>
        <div className="riwo-card riwo-anim-2">
          <div className="riwo-card-label">Über RIWOspine</div>
          <p style={{fontSize:'.86rem',color:'var(--text-dim)',lineHeight:1.75,margin:'0 0 1.25rem'}}>{m.description}</p>
          <div className="riwo-card-label">Schwerpunkte</div>
          <div className="riwo-focus-grid">
            {m.focus.map((f,i)=>(
              <div className="riwo-focus-item" key={i}>
                <div className="riwo-focus-icon">{f.icon}</div>
                <div>
                  <div className="riwo-focus-name">{f.label}</div>
                  <div className="riwo-focus-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <RiwoMap loc={m.location}/>
      </div>
      <div className="riwo-sh">
        <div className="riwo-sh-bar"/>
        Produktmodule
        <span className="riwo-sh-count">{m.products.length} Module</span>
        <div className="riwo-sh-rule"/>
      </div>
      <div className="riwo-prod-grid">
        {m.products.map((p,i)=>(
          <RiwoProdCard key={p.code} p={p} idx={i}/>
        ))}
      </div>
    </div>
  );
}

// ─── INOMED DETAIL ───────────────────────────────────────────────────────────

function InoMap({ loc }: { loc: any }) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.lng - 0.08}%2C${loc.lat - 0.05}%2C${loc.lng + 0.08}%2C${loc.lat + 0.05}&layer=mapnik&marker=${loc.lat}%2C${loc.lng}`;
  return (
    <div className="ino-map-card ino-anim-3">
      <div className="ino-card-label" style={{padding:'1.25rem 1.5rem 0'}}>
        <span>Standort</span>
      </div>
      <div className="ino-map-embed">
        <iframe src={mapUrl} title="inomed Standort Emmendingen" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
      </div>
      <div className="ino-map-info">
        <div className="ino-map-pin">
          <span className="ino-map-pin-icon">📍</span>
          <div>
            <div className="ino-map-city">{loc.city}</div>
            <div className="ino-map-region">{loc.country}</div>
            <div className="ino-map-badge"><span>●</span> Weltmarktführer IOM</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InoProdCard({ p, idx }: { p: any; idx: number }) {
  const [imgErr, setImgErr] = useState(false);
  const imgSrc = useBaseUrl(p.image);
  return (
    <Link to={p.link} className="ino-prod-card">
      <div className="ino-prod-top-bar"/>
      <div className="ino-prod-image">
        {!imgErr ? (
          <img src={imgSrc} alt={p.title} onError={()=>setImgErr(true)}/>
        ) : (
          <div className="ino-prod-image-placeholder" style={{background:`linear-gradient(135deg,${p.imagePlaceholderColor} 0%,rgba(0,0,0,.8) 100%)`}}>
            <span className="ino-prod-ph-icon">🧠</span>
            <span className="ino-prod-ph-code">{p.code}</span>
            <div className="ino-prod-ph-text">{p.title}</div>
          </div>
        )}
        <span className="ino-prod-badge" style={{background:p.badgeColor+'cc'}}>{p.badge}</span>
        <span className="ino-prod-num-badge">0{idx+1}</span>
      </div>
      <div className="ino-prod-body">
        <div className="ino-prod-code-row">
          <span className="ino-prod-code">{p.code}</span>
          <span className="ino-prod-tagline">{p.tagline}</span>
        </div>
        <div className="ino-prod-title">{p.title}</div>
        <div className="ino-prod-desc">{p.desc}</div>
        <div className="ino-prod-specs">
          {p.specs.map((s: any,i: number)=>(
            <div className="ino-prod-spec" key={i}>
              <span className="ino-prod-spec-icon">{s.icon}</span>
              <div>
                <div className="ino-prod-spec-label">{s.label}</div>
                <div className="ino-prod-spec-val">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="ino-prod-highlights">
          {p.highlights.map((h: any,i: number)=>(
            <div className="ino-prod-hl" key={i}>{h}</div>
          ))}
        </div>
        <div className="ino-prod-cta">
          <span>Modul öffnen</span>
          <span className="ino-prod-cta-arrow">→</span>
        </div>
      </div>
    </Link>
  );
}

function InomedDetail({ onBack, lang='de' }: { onBack: () => void; lang?: string }) {
  const t = getT(lang);
  const m = MFRS.find(x => x.id === 'inomed')!;
  const [logoErr, setLogoErr] = useState(false);
  const logoSrc = useBaseUrl(m.logo);
  return (
    <div>
      <button className="ino-back ino-anim" onClick={onBack}>← {t('medBack')}</button>
      <div className="ino-hero ino-anim">
        <div className="ino-hero-bg"/>
        <div className="ino-hero-grid"/>
        <div className="ino-hero-pulse"/>
        <div className="ino-hero-overlay"/>
        <div className="ino-hero-stats">
          {[{n:'1989',l:'Gegründet'},{n:'50+',l:'Länder'},{n:'#1',l:'IOM Welt'}].map((s,i)=>(
            <div className="ino-stat-pill" key={i}>
              <span className="ino-stat-pill-n">{s.n}</span>
              <span className="ino-stat-pill-l">{s.l}</span>
            </div>
          ))}
        </div>
        <div className="ino-hero-content">
          <div className="ino-hero-logo-wrap">
            {!logoErr
              ? <img src={logoSrc} alt={m.name} className="ino-hero-logo" onError={()=>setLogoErr(true)}/>
              : <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.1rem',color:'#1565c0',fontWeight:700}}>{m.name}</span>}
          </div>
          <div className="ino-hero-text">
            <div className="ino-hero-eyebrow">Medizinprodukt · Intraoperatives Neuromonitoring</div>
            <div className="ino-hero-name">{m.name}</div>
            <div className="ino-hero-tag">{m.tagline}</div>
            <div className="ino-hero-actions">
              <a href={m.website} target="_blank" rel="noopener noreferrer" className="ino-btn-primary">🌐 inomed.com ↗</a>
              <span className="ino-btn-ghost">📍 {m.location?.city}, DE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="ino-info-grid">
        <div className="ino-card ino-anim-1">
          <div className="ino-card-label">Unternehmensdaten</div>
          <div className="ino-facts">
            {m.facts.map((f,i)=>(
              <div className="ino-fact" key={i}>
                <span className="ino-fact-l">{f.label}</span>
                <span className="ino-fact-v">{f.value}</span>
              </div>
            ))}
          </div>
          <a href={m.website} target="_blank" rel="noopener noreferrer" className="ino-website-link">
            <span>🌐</span>
            <span>www.inomed.com</span>
            <span className="ino-website-link-arrow">↗</span>
          </a>
        </div>
        <div className="ino-card ino-anim-2">
          <div className="ino-card-label">Über inomed</div>
          <p style={{fontSize:'.86rem',color:'var(--text-dim)',lineHeight:1.75,margin:'0 0 1.25rem'}}>{m.description}</p>
          <div className="ino-card-label">Schwerpunkte</div>
          <div className="ino-focus-grid">
            {m.focus.map((f,i)=>(
              <div className="ino-focus-item" key={i}>
                <div className="ino-focus-icon">{f.icon}</div>
                <div>
                  <div className="ino-focus-name">{f.label}</div>
                  <div className="ino-focus-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <InoMap loc={m.location}/>
      </div>
      <div className="ino-sh">
        <div className="ino-sh-bar"/>
        Produktmodule
        <span className="ino-sh-count">{m.products.length} Module</span>
        <div className="ino-sh-rule"/>
      </div>
      <div className="ino-prod-grid">
        {m.products.map((p,i)=>(
          <InoProdCard key={p.code} p={p} idx={i}/>
        ))}
      </div>
    </div>
  );
}

// ─── MEYER-HAAKE DETAIL ──────────────────────────────────────────────────────

function MhMap({ loc }: { loc: any }) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.lng - 0.08}%2C${loc.lat - 0.05}%2C${loc.lng + 0.08}%2C${loc.lat + 0.05}&layer=mapnik&marker=${loc.lat}%2C${loc.lng}`;
  return (
    <div style={{background:'var(--card)',border:'1px solid var(--card-border)',borderRadius:16,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.05)',display:'flex',flexDirection:'column'}}>
      <div style={{fontSize:'.62rem',fontWeight:700,color:'var(--text-faint)',textTransform:'uppercase',letterSpacing:'.14em',padding:'1.25rem 1.5rem .75rem',display:'flex',alignItems:'center',gap:8}}>
        <span>Standort</span><div style={{flex:1,height:1,background:'var(--section-border)'}}/>
      </div>
      <div style={{flex:1,minHeight:160,overflow:'hidden'}}>
        <iframe src={mapUrl} title="Meyer-Haake Standort Wehrheim" style={{width:'100%',height:185,border:'none',display:'block',filter:'grayscale(20%) contrast(1.05)'}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
      </div>
      <div style={{padding:'1rem 1.25rem',borderTop:'1px solid var(--section-border)'}}>
        <div style={{display:'flex',alignItems:'flex-start',gap:9}}>
          <span style={{fontSize:'1.1rem',flexShrink:0,marginTop:1}}>📍</span>
          <div>
            <div style={{fontSize:'.88rem',fontWeight:700,color:'var(--text)',lineHeight:1.2}}>{loc.city}</div>
            <div style={{fontSize:'.72rem',color:'var(--text-faint)',marginTop:2}}>{loc.country}</div>
            <div style={{display:'inline-flex',alignItems:'center',gap:5,marginTop:8,padding:'3px 10px',borderRadius:99,background:'var(--mh-orange-dim)',border:'1px solid rgba(230,81,0,.25)',fontSize:'.62rem',fontWeight:700,color:'#ff6d00',textTransform:'uppercase',letterSpacing:'.1em'}}>
              <span>●</span> Made in Germany
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MhProdCard({ p, idx }: { p: any; idx: number }) {
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);
  const imgSrc = useBaseUrl(p.image);
  return (
    <Link to={p.link}
      style={{
        background:'var(--card)',
        border:`1px solid ${hovered?'rgba(230,81,0,.35)':'var(--card-border)'}`,
        borderRadius:24,overflow:'hidden',display:'flex',flexDirection:'column',
        boxShadow:hovered?'0 28px 64px rgba(0,0,0,.22),0 0 0 1.5px rgba(230,81,0,.3),0 0 48px rgba(230,81,0,.08)':'var(--shadow-md)',
        transform:hovered?'translateY(-10px)':'none',
        transition:'transform .4s cubic-bezier(.2,.8,.3,1),box-shadow .4s ease,border-color .25s',
        textDecoration:'none',color:'inherit',position:'relative'
      }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>

      {/* IMAGE AREA */}
      <div style={{position:'relative',height:260,overflow:'hidden',flexShrink:0}}>
        {!imgErr ? (
          <img src={imgSrc} alt={p.title} onError={()=>setImgErr(true)}
            style={{width:'100%',height:'100%',objectFit:'cover',display:'block',
              transform:hovered?'scale(1.08)':'scale(1)',transition:'transform .6s cubic-bezier(.25,.46,.45,.94)'}}/>
        ) : (
          <div style={{width:'100%',height:'100%',background:`linear-gradient(145deg,${p.imagePlaceholderColor} 0%,#000 100%)`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,opacity:.07,backgroundImage:'repeating-linear-gradient(45deg,rgba(230,81,0,.4) 0,rgba(230,81,0,.4) 1px,transparent 0,transparent 50%)',backgroundSize:'20px 20px'}}/>
            <span style={{fontSize:'3.5rem',position:'relative',zIndex:1,filter:'drop-shadow(0 4px 12px rgba(230,81,0,.5))'}}>⚡</span>
            <span style={{fontFamily:'DM Mono,monospace',fontSize:'.7rem',color:'rgba(255,255,255,.35)',letterSpacing:'.14em',position:'relative',zIndex:1,textTransform:'uppercase'}}>{p.code}</span>
          </div>
        )}

        {/* Cinematic gradient overlay */}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.3) 45%,transparent 100%)',zIndex:1,transition:'opacity .3s',opacity:hovered?.95:1}}/>
        {/* Subtle color leak from brand */}
        <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 20% 80%,${p.badgeColor}22 0%,transparent 60%)`,zIndex:1,pointerEvents:'none'}}/>

        {/* BADGE */}
        <span style={{position:'absolute',top:'1.1rem',left:'1.1rem',zIndex:3,padding:'5px 14px',borderRadius:99,fontSize:'.6rem',fontWeight:900,textTransform:'uppercase',letterSpacing:'.12em',color:'#fff',background:p.badgeColor,backdropFilter:'blur(8px)',boxShadow:`0 4px 16px ${p.badgeColor}66`}}>{p.badge}</span>

        {/* NUMBER */}
        <span style={{position:'absolute',top:'1.1rem',right:'1.1rem',zIndex:3,width:34,height:34,borderRadius:10,background:'rgba(0,0,0,.5)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,.18)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'DM Mono,monospace',fontSize:'.75rem',fontWeight:700,color:'rgba(255,255,255,.7)'}}>0{idx+1}</span>

        {/* TITLE OVERLAY AT BOTTOM OF IMAGE */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,zIndex:2,padding:'1.5rem 1.5rem .9rem'}}>
          <div style={{fontSize:'.65rem',color:'rgba(255,107,0,.85)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',marginBottom:'.3rem'}}>{p.tagline}</div>
          <div style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.8rem',color:'#fff',letterSpacing:'.06em',lineHeight:.95,textShadow:'0 2px 12px rgba(0,0,0,.6)'}}>{p.title}</div>
        </div>
      </div>

      {/* BODY */}
      <div style={{padding:'1.4rem 1.5rem 1.5rem',flex:1,display:'flex',flexDirection:'column'}}>
        {/* CODE PILL */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:'1rem'}}>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'.62rem',color:'#ff6d00',background:'rgba(230,81,0,.1)',border:'1px solid rgba(230,81,0,.25)',padding:'3px 10px',borderRadius:6,fontWeight:600,letterSpacing:'.07em'}}>{p.code}</span>
        </div>

        {/* DESC */}
        <div style={{fontSize:'.82rem',color:'var(--text-dim)',lineHeight:1.7,marginBottom:'1.2rem',flex:1}}>{p.desc}</div>

        {/* SPECS GRID */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:7,marginBottom:'1.1rem'}}>
          {p.specs.map((s: any,i: number)=>(
            <div key={i} style={{background:'var(--bg2)',borderRadius:11,padding:'9px 11px',display:'flex',alignItems:'flex-start',gap:8,border:`1px solid ${hovered?'rgba(230,81,0,.18)':'var(--section-border)'}`,transition:'border-color .2s'}}>
              <span style={{fontSize:'.95rem',flexShrink:0,marginTop:1}}>{s.icon}</span>
              <div>
                <div style={{fontSize:'.56rem',color:'var(--text-faint)',textTransform:'uppercase',letterSpacing:'.1em',fontWeight:700}}>{s.label}</div>
                <div style={{fontSize:'.76rem',color:'var(--text)',fontWeight:700,lineHeight:1.3,marginTop:1}}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* HIGHLIGHTS */}
        <div style={{display:'flex',flexDirection:'column',gap:5,marginBottom:'1.3rem'}}>
          {p.highlights.map((h: any,i: number)=>(
            <div key={i} style={{display:'flex',alignItems:'flex-start',gap:9,fontSize:'.77rem',color:'var(--text-dim)',lineHeight:1.5}}>
              <span style={{color:'#e65100',fontWeight:900,flexShrink:0,fontSize:'.85rem',marginTop:1,textShadow:`0 0 8px rgba(230,81,0,${hovered?.4:.2})`}}>›</span>{h}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'13px 18px',borderRadius:14,marginTop:'auto',
          background:hovered?'#e65100':'rgba(230,81,0,.1)',
          border:hovered?'1px solid #e65100':'1px solid rgba(230,81,0,.25)',
          fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'.84rem',
          color:hovered?'#fff':'#ff6d00',
          transition:'all .25s ease',
          boxShadow:hovered?'0 4px 20px rgba(230,81,0,.4)':'none'}}>
          <span>Modul öffnen</span>
          <span style={{transform:hovered?'translateX(5px)':'none',transition:'transform .25s',fontSize:'1.1rem'}}>→</span>
        </div>
      </div>
    </Link>
  );
}

function MeyerHaakeDetail({ onBack, lang='de' }: { onBack: () => void; lang?: string }) {
  const t = getT(lang);
  const m = MFRS.find(x => x.id === 'meyer')!;
  const [logoErr, setLogoErr] = useState(false);
  const logoSrc = useBaseUrl(m.logo);
  const cardStyle = {background:'var(--card)',border:'1px solid var(--card-border)',borderRadius:16,padding:'1.5rem',boxShadow:'0 1px 4px rgba(0,0,0,.05)'};
  const labelStyle = {fontSize:'.62rem',fontWeight:700,color:'var(--text-faint)',textTransform:'uppercase',letterSpacing:'.14em',marginBottom:'1rem',display:'flex',alignItems:'center',gap:8};
  return (
    <div>
      <button style={{display:'inline-flex',alignItems:'center',gap:9,padding:'11px 22px',borderRadius:13,border:'1px solid var(--section-border)',background:'var(--card)',fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:'.84rem',cursor:'pointer',marginBottom:'2.25rem',color:'var(--text)',boxShadow:'var(--shadow-sm)',transition:'all .2s',letterSpacing:'.02em'}}
        onClick={onBack}>← {t('medBack')}
      </button>

      {/* HERO */}
      <div style={{position:'relative',overflow:'hidden',borderRadius:28,minHeight:380,display:'flex',alignItems:'flex-end',marginBottom:'2rem',boxShadow:'0 24px 80px rgba(0,0,0,.35),0 0 0 1px rgba(230,81,0,.2),0 0 80px rgba(230,81,0,.05)'}}>
        <div style={{position:'absolute',inset:0,zIndex:0,background:'linear-gradient(160deg,#0a0200 0%,#180600 35%,#221000 60%,#180600 100%)'}}/>
        {/* Grid texture */}
        <div style={{position:'absolute',inset:0,zIndex:1,opacity:.05,backgroundImage:'linear-gradient(rgba(230,81,0,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(230,81,0,.8) 1px,transparent 1px)',backgroundSize:'56px 56px'}}/>
        {/* Ambient glow */}
        <div style={{position:'absolute',top:-60,right:-60,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(230,81,0,.12) 0%,transparent 65%)',zIndex:1,pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:-80,left:-80,width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(230,81,0,.06) 0%,transparent 65%)',zIndex:1,pointerEvents:'none'}}/>
        <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to top,rgba(0,0,0,.95) 0%,rgba(0,0,0,.5) 50%,rgba(0,0,0,.08) 100%),linear-gradient(105deg,rgba(230,81,0,.14) 0%,transparent 55%)'}}/>
        {/* Stats pills */}
        <div style={{position:'absolute',top:'1.75rem',right:'1.75rem',zIndex:4,display:'flex',gap:8,flexWrap:'wrap',justifyContent:'flex-end'}}>
          {[{n:'1981',l:'Gegründet'},{n:'MiG',l:'Produktion'},{n:'50+',l:'Länder'}].map((s,i)=>(
            <div key={i} style={{background:'rgba(0,0,0,.45)',border:'1px solid rgba(230,81,0,.35)',backdropFilter:'blur(14px)',borderRadius:99,padding:'6px 15px',display:'flex',alignItems:'center',gap:7,boxShadow:'0 4px 16px rgba(0,0,0,.3)'}}>
              <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.2rem',color:'#ff6d00',lineHeight:1,textShadow:'0 0 12px rgba(255,109,0,.5)'}}>{s.n}</span>
              <span style={{fontSize:'.57rem',color:'rgba(255,255,255,.4)',textTransform:'uppercase',letterSpacing:'.12em',fontWeight:700}}>{s.l}</span>
            </div>
          ))}
        </div>
        {/* Content */}
        <div style={{position:'relative',zIndex:3,padding:'3rem 3.5rem',width:'100%',display:'flex',alignItems:'flex-end',gap:'2.75rem',flexWrap:'wrap'}}>
          <div style={{width:210,height:86,background:'#fff',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',padding:'14px 22px',flexShrink:0,boxShadow:'0 8px 32px rgba(0,0,0,.5),0 0 0 1px rgba(230,81,0,.25)',transition:'transform .3s ease'}}>
            {!logoErr
              ? <img src={logoSrc} alt={m.name} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',mixBlendMode:'multiply'}} onError={()=>setLogoErr(true)}/>
              : <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1rem',color:'#e65100',fontWeight:700}}>{m.name}</span>}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:'.58rem',letterSpacing:'.26em',textTransform:'uppercase',color:'#ff6d00',fontWeight:700,marginBottom:'.6rem',display:'flex',alignItems:'center',gap:10}}>
              <span style={{display:'block',width:28,height:1,background:'linear-gradient(90deg,#ff6d00,transparent)'}}/>Medizinprodukt · Radiochirurgie & Wundversorgung
            </div>
            <div style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(2.5rem,5.5vw,4.4rem)',color:'#fff',letterSpacing:'.05em',lineHeight:.9,marginBottom:'.6rem',textShadow:'0 4px 24px rgba(0,0,0,.4)'}}>{m.name}</div>
            <div style={{fontSize:'.84rem',color:'rgba(255,255,255,.5)',fontWeight:300,letterSpacing:'.12em',textTransform:'uppercase',marginBottom:'1.4rem'}}>{m.tagline}</div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
              <a href={m.website} target="_blank" rel="noopener noreferrer"
                style={{display:'inline-flex',alignItems:'center',gap:8,padding:'11px 22px',borderRadius:12,background:'#e65100',color:'#fff',fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:'.84rem',textDecoration:'none',boxShadow:'0 6px 24px rgba(230,81,0,.5)',letterSpacing:'.03em'}}>
                🌐 meyer-haake.com ↗
              </a>
              <span style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 20px',borderRadius:12,background:'rgba(255,255,255,.07)',color:'rgba(255,255,255,.65)',border:'1px solid rgba(255,255,255,.14)',fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:'.84rem',backdropFilter:'blur(10px)'}}>
                📍 {m.location?.city}, DE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INFO GRID */}
      <div style={{display:'grid',gridTemplateColumns:'260px 1fr 280px',gap:14,marginBottom:'1.75rem'}}>
        <div style={cardStyle}>
          <div style={labelStyle}><span>Unternehmensdaten</span><div style={{flex:1,height:1,background:'var(--section-border)'}}/></div>
          <div style={{display:'flex',flexDirection:'column',gap:7}}>
            {m.facts.map((f,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'7px 10px',background:'var(--bg2)',borderRadius:9}}>
                <span style={{fontSize:'.72rem',color:'var(--text-dim)',fontWeight:500}}>{f.label}</span>
                <span style={{fontSize:'.78rem',color:'var(--text)',fontWeight:700}}>{f.value}</span>
              </div>
            ))}
          </div>
          <a href={m.website} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',gap:10,marginTop:'1rem',padding:'10px 14px',borderRadius:10,background:'var(--mh-orange-dim)',border:'1px solid rgba(230,81,0,.3)',color:'#ff6d00',textDecoration:'none',fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:'.8rem'}}>
            <span>🌐</span><span>www.meyer-haake.com</span><span style={{marginLeft:'auto'}}>↗</span>
          </a>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}><span>Über Meyer-Haake</span><div style={{flex:1,height:1,background:'var(--section-border)'}}/></div>
          <p style={{fontSize:'.86rem',color:'var(--text-dim)',lineHeight:1.75,margin:'0 0 1.25rem'}}>{m.description}</p>
          <div style={labelStyle}><span>Schwerpunkte</span><div style={{flex:1,height:1,background:'var(--section-border)'}}/></div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
            {m.focus.map((f,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',borderRadius:10,background:'var(--bg2)',border:'1px solid var(--section-border)'}}>
                <div style={{width:32,height:32,borderRadius:8,flexShrink:0,background:'var(--mh-orange-dim)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem'}}>{f.icon}</div>
                <div>
                  <div style={{fontSize:'.74rem',fontWeight:700,color:'var(--text)',lineHeight:1.2}}>{f.label}</div>
                  <div style={{fontSize:'.64rem',color:'var(--text-faint)',marginTop:1}}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MhMap loc={m.location}/>
      </div>

      {/* PRODUCTS HEADER */}
      <div style={{display:'flex',alignItems:'center',gap:12,margin:'2.5rem 0 1.2rem',fontSize:'.75rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.14em',color:'var(--text)'}}>
        <div style={{width:3,height:18,borderRadius:99,background:'#e65100',flexShrink:0}}/>
        Produktmodule
        <span style={{fontFamily:'DM Mono,monospace',fontSize:'.62rem',padding:'2px 9px',borderRadius:99,background:'var(--mh-orange-dim)',border:'1px solid rgba(230,81,0,.25)',color:'#ff6d00',letterSpacing:'.06em'}}>{m.products.length} Module</span>
        <div style={{flex:1,height:1,background:'linear-gradient(90deg,var(--section-border),transparent)'}}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16,marginBottom:'2rem'}}>
        {m.products.map((p,i)=>(
          <MhProdCard key={p.code} p={p} idx={i}/>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const bgImg    = useBaseUrl('/img/emig-gebaeude.png');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [tab, setTab]       = useState('QM');
  const [tabDir, setTabDir] = useState('right');
  const tabOrder            = ['QM','SAP','MED'];
  const [done, setDone]     = useState<string[]>([]);
  const [mfr, setMfr]       = useState<any>(null);
  const [greet, setGreet]   = useState('');
  const [lang, setLang]     = useState('de');
  const t = getT(lang);

  const switchTab = (id: string) => {
    const fromIdx = tabOrder.indexOf(tab);
    const toIdx   = tabOrder.indexOf(id);
    setTabDir(toIdx > fromIdx ? 'right' : 'left');
    setTab(id);
    setMfr(null);
  };

  useEffect(()=>{
    try{
      const s=localStorage.getItem('emig_progress'); if(s) setDone(JSON.parse(s));
      const l=localStorage.getItem('emig_lang'); if(l) setLang(l);
    }catch(_){}
    const h=new Date().getHours();
    setGreet(h<12?'greetMorning':h<17?'greetDay':'greetEvening');
  },[]);

  const handleLang = (code:string) => {
    setLang(code);
    try{ localStorage.setItem('emig_lang',code); }catch(_){}
  };

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

  function ModCard({title,code,color,link='#',draft=false,num='',lang:_l='de'}: {title:string;code:string;color:string;link?:string;draft?:boolean;num?:string;lang?:string}){
    const ct = getT(_l);
    const isDone=done.includes(code);
    const accentBg = draft ? 'var(--text-faint)' : isDone ? '#10b981' : color;
    return (
      <div className={"ea-card"+(isDone?" ea-card-done-glow":"")} style={{opacity:draft?.6:1,paddingLeft:'1.1rem'}}>
        <div className="ea-card-stripe" style={{background:accentBg}}/>
        {num && <div className="ea-card-num">{num}</div>}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
          <h3 className="ea-card-t">{title}</h3>
        </div>
        <div className="ea-card-status">
          <div className="ea-card-code">{code}</div>
          {isDone && (
            <div className="ea-card-chip" style={{background:'rgba(16,185,129,.12)',color:'#059669',border:'1px solid rgba(16,185,129,.25)'}}>
              <div className="ea-card-chip-dot" style={{background:'#10b981'}}/>{ct('cardDone')}
            </div>
          )}
          {draft && (
            <div className="ea-card-chip" style={{background:'var(--bg2)',color:'var(--text-faint)',border:'1px solid var(--section-border)'}}>
              <div className="ea-card-chip-dot" style={{background:'var(--text-faint)'}}/>{ct('cardDraft')}
            </div>
          )}
        </div>
        <div className="ea-card-bar">
          <div className="ea-card-bar-f" style={{width:isDone?'100%':'0%',background:isDone?'#10b981':color}}/>
        </div>
        {!draft && (
          <Link className="ea-card-btn" to={link}
            style={{background:isDone?'rgba(16,185,129,.1)':'var(--bg2)',color:isDone?'#059669':color,border:`1.5px solid ${isDone?'rgba(16,185,129,.3)':color+'33'}`}}>
            <span>{isDone?ct('cardRepeat'):ct('cardStart')}</span>
            <span className="ea-card-btn-arrow">{isDone?'↻':'→'}</span>
          </Link>
        )}
      </div>
    );
  }

  function SH({children,color='#374151',count=''}: {children:React.ReactNode;color?:string;count?:string}){
    return(
      <div className="ea-sh">
        <div className="ea-sh-bar" style={{background:color}}/>
        {children}
        {count&&<span className="ea-sh-count" style={{background:`${color}12`,color,borderColor:`${color}30`}}>{count}</span>}
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
            {/* Language switcher — oben rechts, relativ zum Hero (nicht zur inner Box) */}
            <div style={{position:'absolute',top:'1.5rem',right:'5%',zIndex:20}}>
              <LanguageSwitcher lang={lang} setLang={handleLang}/>
            </div>
            <div className="ea-hero-inner">
              <div className="ea-eyebrow"><span>{t('heroEyebrow')}</span></div>
              <h1 className="ea-h1">
                <span className="ea-h1-brand">EMIG</span>
                <span className="ea-h1-main">ACADEMY</span>
              </h1>
              <p className="ea-tagline">{t('heroTagline')}</p>
              <div className="ea-stats">
                <div className="ea-stat"><span className="ea-stat-n">{ALL_QM.length}</span><span className="ea-stat-l">{t('statQM')}</span></div>
                <div className="ea-stat"><span className="ea-stat-n">{MFRS.length}</span><span className="ea-stat-l">{t('statMfr')}</span></div>
                <div className="ea-stat"><span className="ea-stat-n">10</span><span className="ea-stat-l">{t('statSAP')}</span></div>
              </div>
            </div>
          </div>
        </div>

        <main className="ea-main">
          <div className="ea-wrap">
            {greet&&(
              <div className="ea-welcome">
                <div>
                  <div className="ea-welcome-name">{t(greet)}, {t('welcomeBack')}</div>
                  <div className="ea-welcome-sub">{done.length>0?t('progressDone',done.length,ALL_QM.length):t('progressStart')}</div>
                </div>
                <div className="ea-welcome-pill">{t('progressPill',pct)}</div>
              </div>
            )}

            {(()=>{
              const TABS = [
                {id:'QM',   icon:'◈', label:t('tabQM')},
                {id:'SAP',  icon:'◉', label:t('tabSAP')},
                {id:'MED',  icon:'◎', label:t('tabMED')},
              ];
              const n = TABS.length;
              const activeIdx = TABS.findIndex(t=>t.id===tab);
              return (
                <div className="ea-tabs">
                  <div className="ea-tab-slider" style={{
                    left:`calc(5px + ${activeIdx} * (100% - 10px) / ${n})`,
                    width:`calc((100% - 10px) / ${n})`,
                  }}/>
                  {TABS.map(({id,icon,label}) => (
                    <button key={id} className={`ea-tab${tab===id?' active':''}`} onClick={()=>switchTab(id)} style={{flex:'1 1 0'}}>
                      <span className="tab-icon">{icon}</span>
                      <span className="tab-label">{label}</span>
                    </button>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* QM TAB */}
          {tab==='QM' && (
            <div className={`ea-wrap tab-enter-${tabDir}`} key="qm">
              {/* ── NEUES PROGRESS DESIGN ── */}
              <div className="ea-prog-wrap">
                <div className="ea-prog-header">
                  <div className="ea-prog-title">{t('qmProgressLabel')}</div>
                  <div className="ea-prog-count">
                    <span>{done.length}</span>/{ALL_QM.length}
                  </div>
                </div>
                <div className="ea-prog-track">
                  <div className="ea-prog-fill" style={{width:`${pct}%`}}/>
                </div>
                <div className="ea-prog-tiles">
                  {ALL_QM.map((code,i)=>(
                    <div key={code} className={`ea-prog-tile ${done.includes(code)?'done':'open'}`}
                      title={code} style={{transitionDelay:`${i*60}ms`}}/>
                  ))}
                </div>
              </div>

              <div style={{position:'relative',borderRadius:'22px',overflow:'hidden',marginBottom:'2rem',minHeight:'210px',display:'flex',alignItems:'flex-end',boxShadow:'var(--shadow-lg)'}}>
                <div style={{position:'absolute',inset:0,zIndex:0}}>
                  <img src={bgImg} alt="Emig GmbH Standort Reutlingen" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 40%',display:'block'}}/>
                </div>
                <div style={{position:'absolute',inset:0,zIndex:1,background:'linear-gradient(to top,rgba(6,6,10,0.95) 0%,rgba(6,6,10,0.55) 45%,rgba(6,6,10,0.1) 100%)'}}/>
                <div style={{position:'relative',zIndex:3,padding:'2rem 2.5rem',width:'100%'}}>
                  <div style={{display:'inline-block',background:'rgba(212,163,64,.14)',border:'1px solid rgba(212,163,64,.3)',color:'#e8d5a8',fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',padding:'4px 12px',borderRadius:'6px',marginBottom:'0.8rem'}}>{t('qmIsoTag')}</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(1.6rem,3vw,2.3rem)',color:'#fff',letterSpacing:'0.06em',lineHeight:1,marginBottom:'0.5rem'}}>{t('qmPhiloTitle')}</div>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'0.84rem',margin:'0 0 1.2rem',fontWeight:300,lineHeight:1.6}}>{t('qmPhiloSub')}</p>
                  <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
                    <Link to="/docs/quality-management/qm-philosophie" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#92400e',color:'#fff',padding:'10px 22px',borderRadius:'12px',fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:'0.86rem',textDecoration:'none',boxShadow:'0 4px 16px rgba(146,64,14,.5)'}}>{t('qmOpenModule')} →</Link>
                    {(t('qmPhiloMeta') as string[]).map((m:string)=>(
                      <span key={m} style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.11)',color:'rgba(255,255,255,0.45)',fontSize:'0.68rem',fontWeight:600,padding:'4px 12px',borderRadius:'99px',letterSpacing:'0.08em'}}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ea-test" style={{background:ready?'rgba(16,185,129,.08)':'var(--card)',borderColor:ready?'rgba(16,185,129,.3)':'var(--card-border)',boxShadow:'var(--shadow-sm)'}}>
                <div>
                  <div style={{fontWeight:700,fontSize:'1rem',color:ready?'#10b981':'var(--text-dim)'}}>{ready?t('finalTestReady'):t('finalTestLocked')}</div>
                  <div style={{fontSize:'.8rem',color:'var(--text-faint)',marginTop:4}}>{ready?t('finalTestReadySub'):t('finalTestLockedSub',ALL_QM.length-done.length)}</div>
                </div>
                <button disabled={!ready} className="ea-test-btn" style={{background:ready?'#059669':'var(--bg2)',color:ready?'#fff':'var(--text-faint)',cursor:ready?'pointer':'not-allowed',fontWeight:700}}>{t('finalTestBtn')}</button>
              </div>

              <SH color={CQM} count="4">{t('shLogistik')}</SH>
              <div className="ea-grid">
                <ModCard title={t('modLager1')} code="SOP-LOG-01" num="01" color={CQM} link="/docs/logistik-lager/SOP_LOG-01" lang={lang}/>
                <ModCard title={t('modLager2')} code="SOP-LOG-02" num="02" color={CQM} link="/docs/logistik-lager/SOP_LOG-02" lang={lang}/>
                <ModCard title={t('modLager3')} code="SOP-LOG-03" num="03" color={CQM} link="/docs/logistik-lager/SOP_LOG-03" lang={lang}/>
                <ModCard title={t('modLager4')} code="SOP-LOG-04" num="04" color={CQM} draft lang={lang}/>
              </div>
              <SH color={CQM} count="2">{t('shEinkauf')}</SH>
              <div className="ea-grid">
                <ModCard title={t('modEink1')} code="SOP-EINK-01" num="05" color={CQM} link="/docs/einkauf-lieferanten/SOP_EINK-01" lang={lang}/>
                <ModCard title={t('modEink2')} code="SOP-EINK-02" num="06" color={CQM} link="/docs/einkauf-lieferanten/SOP_EINK-02" lang={lang}/>
              </div>
              <SH color={CQM} count="4">{t('shRegulatorik')}</SH>
              <div className="ea-grid">
                <ModCard title={t('modReg1')} code="SOP-REG-01" num="07" color={CQM} link="/docs/regulatorik-mdr/SOP_REG-01" lang={lang}/>
                <ModCard title={t('modReg2')} code="SOP-REG-02" num="08" color={CQM} link="/docs/regulatorik-mdr/SOP_REG-02" lang={lang}/>
                <ModCard title={t('modReg3')} code="SOP-REG-03" num="09" color={CQM} link="/docs/regulatorik-mdr/SOP_REG-03" lang={lang}/>
                <ModCard title={t('modReg4')} code="SOP-REG-05" num="10" color={CQM} link="/docs/regulatorik-mdr/SOP_REG-05" lang={lang}/>
              </div>
            </div>
          )}

          {/* SAP TAB */}
          {tab==='SAP' && <div className={`tab-enter-${tabDir}`} key="sap"><SAPUniverse lang={lang}/></div>}

          {/* MED TAB */}
          {tab==='MED' && (
            <div className={`ea-wrap tab-enter-${tabDir}`} key="med">
              {!mfr ? (
                <>
                  <SH color={CMED}>{t('medHeading')}</SH>
                  <div className="med-list">
                    {MFRS.map(m => (
                      <MfrBanner key={m.id} m={m} onClick={() => setMfr(m)} />
                    ))}
                  </div>
                </>
              ) : mfr.id === 'riwo' ? (
                <RIWOspineDetail onBack={() => setMfr(null)} lang={lang} />
              ) : mfr.id === 'inomed' ? (
                <InomedDetail onBack={() => setMfr(null)} lang={lang} />
              ) : mfr.id === 'meyer' ? (
                <MeyerHaakeDetail onBack={() => setMfr(null)} lang={lang} />
              ) : (
                <MfrDetail m={mfr} onBack={() => setMfr(null)} lang={lang} />
              )}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}