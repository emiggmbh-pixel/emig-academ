// static/js/google-translate.js
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'de',
    includedLanguages: 'de,en,uk', // Nur Deutsch, Englisch, Ukrainisch
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
}