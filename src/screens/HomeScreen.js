import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../context/LocaleContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();

  const menuItems = [
    {
      key: 'start',
      title: t('menu.start'),
      onPress: () => navigation.navigate('PatientForm'),
      backgroundColor: '#10b981',
    },
    {
      key: 'settings',
      title: t('menu.settings'),
      onPress: () => navigation.navigate('Settings'),
      backgroundColor: '#6366f1',
    },
    {
      key: 'about',
      title: t('menu.about'),
      onPress: () => navigation.navigate('About'),
      backgroundColor: '#8b5cf6',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <View style={styles.header}>
        <Text style={[styles.title, isRTL && styles.rtlText]}>
          {t('app.title')}
        </Text>
      </View>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.menuButton,
              { backgroundColor: item.backgroundColor },
            ]}
            onPress={item.onPress}
            activeOpacity={0.8}
          >
            <Text style={[styles.menuButtonText, isRTL && styles.rtlText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
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
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 20,
  },
  menuButton: {
    width: width - 40,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default HomeScreen;

