import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Emig Academy',
  tagline: 'Qualität und Sicherheit am Standort Reutlingen',
  favicon: 'img/favicon.ico',

  // WICHTIG: Die URL Ihrer Seite (hier korrigiert laut Ihrem Vercel-Log)
  url: 'https://emig-academ.vercel.app', 
  baseUrl: '/',

  // GitHub Infos
  organizationName: 'emiggmbh-pixel', 
  projectName: 'emig-academ', 

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
      defaultLocale: 'de',
      locales: ['de'],
      localeConfigs: {
        de: {
          label: 'Deutsch',
          direction: 'ltr',
          htmlLang: 'de-DE',
        },
      },
    },
    
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/emiggmbh-pixel/emig-academ/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/emig-social-card.jpg',
      navbar: {
        title: 'Emig Academy',
        logo: {
          alt: 'EMIG GmbH Logo',
          src: 'img/emig-logo-black.png',
          srcDark: 'img/emig-logo-white.png',
          width: 35,
          height: 35,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Schulungen',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'QM Philosophie',
                to: '/docs/quality-management/qm-philosophie',
              },
            ],
          },
          {
            title: 'Rechtliches',
            items: [
              {
                label: 'Impressum',
                href: 'https://www.emig-gmbh.de',
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
    }),
};

export default config;