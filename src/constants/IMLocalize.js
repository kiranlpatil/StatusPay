import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as RNLocalize from 'react-native-localize';

import en from './translations/en';
import hi from './translations/hi';

const LANGUAGES = {
  en,
  hi
};

const LANG_CODES = Object.keys(LANGUAGES);

const LANGUAGE_DETECTOR = {
    type: 'languageDetector',
    async: true,
    detect: callback => {
      EncryptedStorage.getItem('user-language', (language, err) => {
        // if error fetching stored data or no language was stored
        // display errors when in DEV mode as console statements
        if (err || !language) {
          if (err) {
            console.log('Error fetching Languages from asyncstorage ', err);
          } else {
            console.log('No language is set, choosing English as fallback');
          }
          const findBestAvailableLanguage =
            RNLocalize.findBestAvailableLanguage(LANG_CODES);
  
          callback(findBestAvailableLanguage.languageTag || 'en');
          return;
        }
        callback(language);
      });
    },
    init: () => {},
    cacheUserLanguage: language => {
      EncryptedStorage.setItem('user-language', language);
    }
  };

  i18n
  // detect language
  .use(LANGUAGE_DETECTOR)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // set options
  .init({
    resources: LANGUAGES,
    compatibilityJSON: 'v3',
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    }
  });