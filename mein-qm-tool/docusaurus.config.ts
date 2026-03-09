import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Emig Academy',
  tagline: 'Qualität und Sicherheit am Standort Reutlingen',
  favicon: 'img/favicon.ico',

  // WICHTIG: Ersetzen Sie dies durch Ihre tatsächliche Vercel-URL
  url: 'https://emig-academy-v1.vercel.app', 
  baseUrl: '/',

  // GitHub Infos anpassen
  organizationName: 'emiggmbh-pixel', 
  projectName: 'emig-academy-v1',

  // Auf 'warn' gestellt, damit Vercel nicht bei jedem kleinen Link-Fehler abbricht
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Verlinkung zu Ihrem Repo
          editUrl: 'https://github.com/emiggmbh-pixel/emig-academy-v1/tree/main/',
        },
        blog: false, // Blog deaktiviert, falls nicht benötigt
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/emig-gebaeude.png',
    navbar: {
      title: 'Emig Academy',
      logo: {
        alt: 'EMIG GmbH Logo',
        src: 'img/emig-logo-black.png', // Stellen Sie sicher, dass diese Datei in static/img/ liegt
        srcDark: 'img/emig-logo-white.png',
        width: 35,
        height: 35,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Schulungsunterlagen',
        },
        // Sprachumschalter in der Navigationsleiste
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Akademie',
          items: [
            {
              label: 'Qualitätsmanagement',
              to: '/docs/quality-management/qm-philosophie',
            },
            {
              label: 'Logistik & Lager',
              to: '/docs/logistik-lager/SOP_LOG-01',
            },
          ],
        },
        {
          title: 'Rechtliches',
          items: [
            {
              label: 'Impressum',
              href: 'https://www.emig-gmbh.de', // Link zu Ihrer Firmenwebseite
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} EMIG GmbH Reutlingen. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;