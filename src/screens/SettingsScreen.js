import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../context/LocaleContext';

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { currentLanguage, isRTL, changeLanguage } = useLocale();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('settings.title'),
    });
  }, [navigation, t]);

  const handleLanguageChange = (languageCode) => {
    Alert.alert(
      t('settings.language'),
      `${t('settings.language')}: ${languageCode === 'en' ? t('settings.english') : t('settings.farsi')}`,
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.save'),
          onPress: () => changeLanguage(languageCode),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            {t('settings.language')}
          </Text>
          
          <TouchableOpacity
            style={[
              styles.languageButton,
              currentLanguage === 'en' && styles.activeLanguageButton,
            ]}
            onPress={() => handleLanguageChange('en')}
          >
            <Text
              style={[
                styles.languageButtonText,
                currentLanguage === 'en' && styles.activeLanguageButtonText,
                isRTL && styles.rtlText,
              ]}
            >
              {t('settings.english')}
            </Text>
            {currentLanguage === 'en' && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.languageButton,
              currentLanguage === 'fa' && styles.activeLanguageButton,
            ]}
            onPress={() => handleLanguageChange('fa')}
          >
            <Text
              style={[
                styles.languageButtonText,
                currentLanguage === 'fa' && styles.activeLanguageButtonText,
                isRTL && styles.rtlText,
              ]}
            >
              {t('settings.farsi')}
            </Text>
            {currentLanguage === 'fa' && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  rtl: {
    direction: 'rtl',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 15,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeLanguageButton: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  languageButtonText: {
    fontSize: 16,
    color: '#475569',
  },
  activeLanguageButtonText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

