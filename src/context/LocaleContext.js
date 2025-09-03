import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocaleContext = createContext();

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

export const LocaleProvider = ({ children }) => {
  const { i18n, ready } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (ready) {
      setCurrentLanguage(i18n.language);
      setIsRTL(i18n.language === 'fa');
      setIsReady(true);
    }
  }, [ready, i18n.language]);

  const changeLanguage = async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
      setCurrentLanguage(languageCode);
      setIsRTL(languageCode === 'fa');
      await AsyncStorage.setItem('selectedLanguage', languageCode);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const value = {
    currentLanguage,
    isRTL,
    changeLanguage,
    isReady,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

