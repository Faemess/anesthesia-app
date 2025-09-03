import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import fa from './fa.json';

const resources = {
  en: { translation: en },
  fa: { translation: fa },
};

// Get device locale
const getDeviceLanguage = () => {
  try {
    const deviceLocale = Localization.locale || 'en-US';
    const languageCode = deviceLocale.split('-')[0];
    return resources[languageCode] ? languageCode : 'en';
  } catch (error) {
    console.log('Error getting device language:', error);
    return 'en';
  }
};

// Language detector for i18next
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      // First try to get saved language
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage && resources[savedLanguage]) {
        callback(savedLanguage);
        return;
      }
      
      // Fall back to device language
      const deviceLanguage = getDeviceLanguage();
      callback(deviceLanguage);
    } catch (error) {
      console.log('Language detection error:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
    } catch (error) {
      console.log('Error caching language:', error);
    }
  },
};

// Initialize i18n
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // Important for React Native
    },
  });

export default i18n;

