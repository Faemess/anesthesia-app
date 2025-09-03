import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../context/LocaleContext';
import { usePatient } from '../context/PatientContext';

const { width } = Dimensions.get('window');

const WorkflowScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const { patientData } = usePatient();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Anesthesia Workflow',
    });
  }, [navigation]);

  const workflowItems = [
    {
      key: 'premedication',
      title: t('workflow.premedication'),
      screen: 'PreMedication',
      backgroundColor: '#8b5cf6',
      icon: '💊',
    },
    {
      key: 'induction',
      title: t('workflow.induction'),
      screen: 'Induction',
      backgroundColor: '#06b6d4',
      icon: '🏥',
    },
    {
      key: 'maintenance',
      title: t('workflow.maintenance'),
      screen: 'Maintenance',
      backgroundColor: '#10b981',
      icon: '⚕️',
    },
    {
      key: 'recovery',
      title: t('workflow.recovery'),
      screen: 'Recovery',
      backgroundColor: '#f59e0b',
      icon: '🔄',
    },
    {
      key: 'emergency',
      title: t('workflow.emergency'),
      screen: 'Emergency',
      backgroundColor: '#ef4444',
      icon: '🚨',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Patient Summary */}
        <View style={styles.patientSummary}>
          <Text style={[styles.summaryTitle, isRTL && styles.rtlText]}>
            Patient Information
          </Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, isRTL && styles.rtlText]}>
              {t('patient.age')}:
            </Text>
            <Text style={[styles.summaryValue, isRTL && styles.rtlText]}>
              {patientData.age} years
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, isRTL && styles.rtlText]}>
              {t('patient.sex')}:
            </Text>
            <Text style={[styles.summaryValue, isRTL && styles.rtlText]}>
              {patientData.sex === 'male' ? t('patient.male') : t('patient.female')}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, isRTL && styles.rtlText]}>
              {t('patient.weight')}:
            </Text>
            <Text style={[styles.summaryValue, isRTL && styles.rtlText]}>
              {patientData.weight} kg
            </Text>
          </View>
          {patientData.hematocrit && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, isRTL && styles.rtlText]}>
                {t('patient.hematocrit')}:
              </Text>
              <Text style={[styles.summaryValue, isRTL && styles.rtlText]}>
                {patientData.hematocrit}%
              </Text>
            </View>
          )}
          {patientData.hemoglobin && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, isRTL && styles.rtlText]}>
                {t('patient.hemoglobin')}:
              </Text>
              <Text style={[styles.summaryValue, isRTL && styles.rtlText]}>
                {patientData.hemoglobin} g/dL
              </Text>
            </View>
          )}
        </View>

        {/* Workflow Options */}
        <View style={styles.workflowContainer}>
          <Text style={[styles.workflowTitle, isRTL && styles.rtlText]}>
            Select Workflow Section
          </Text>
          
          {workflowItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.workflowButton,
                { backgroundColor: item.backgroundColor },
              ]}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.8}
            >
              <View style={styles.workflowButtonContent}>
                <Text style={styles.workflowIcon}>{item.icon}</Text>
                <Text style={[styles.workflowButtonText, isRTL && styles.rtlText]}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
  patientSummary: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
  },
  workflowContainer: {
    flex: 1,
  },
  workflowTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  workflowButton: {
    width: width - 40,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  workflowButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  workflowIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  workflowButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
});

export default WorkflowScreen;

