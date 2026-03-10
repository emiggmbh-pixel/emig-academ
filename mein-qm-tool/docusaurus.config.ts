// docusaurus.config.js
const config = {
  title: 'Emig Academy',
  // ... andere Zeilen ...
  favicon: 'img/favicon.ico',

  // Fügen Sie diesen Block hier ein:
  scripts: [
    {
      src: '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
      async: true,
    },
    {
      src: '/js/google-translate.js',
      async: false,
    },
  ],

  themeConfig: {
    navbar: {
      items: [
        // ENTFERNEN SIE HIER: { type: 'localeDropdown', position: 'right' },
      ],
    },
    // ...
  },
};