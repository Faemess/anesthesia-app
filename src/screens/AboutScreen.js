import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../context/LocaleContext';

const AboutScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('about.title'),
    });
  }, [navigation, t]);

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.title, isRTL && styles.rtlText]}>
            {t('app.title')}
          </Text>
          
          <Text style={[styles.version, isRTL && styles.rtlText]}>
            {t('about.version')}
          </Text>
          
          <Text style={[styles.description, isRTL && styles.rtlText]}>
            {t('about.description')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            Features
          </Text>
          <View style={styles.featureList}>
            <Text style={[styles.featureItem, isRTL && styles.rtlText]}>
              • {t('workflow.premedication')}
            </Text>
            <Text style={[styles.featureItem, isRTL && styles.rtlText]}>
              • {t('workflow.induction')}
            </Text>
            <Text style={[styles.featureItem, isRTL && styles.rtlText]}>
              • {t('workflow.maintenance')}
            </Text>
            <Text style={[styles.featureItem, isRTL && styles.rtlText]}>
              • {t('workflow.recovery')}
            </Text>
            <Text style={[styles.featureItem, isRTL && styles.rtlText]}>
              • {t('workflow.emergency')}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.disclaimer, isRTL && styles.rtlText]}>
            ⚠️ This application is for educational purposes only. Always consult with qualified medical professionals for patient care decisions.
          </Text>
        </View>
      </ScrollView>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 10,
  },
  version: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    textAlign: 'center',
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
  featureList: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  featureItem: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 22,
  },
  disclaimer: {
    fontSize: 14,
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default AboutScreen;

