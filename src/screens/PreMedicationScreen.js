import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../context/LocaleContext';
import { usePatient } from '../context/PatientContext';
import { calculatePremedication, calculateSerumTherapy } from '../utils/calculations';

const PreMedicationScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const { patientData } = usePatient();
  
  const [selectedSerum, setSelectedSerum] = useState('normalSaline');
  const [drugCalculations, setDrugCalculations] = useState({});
  const [serumCalculations, setSerumCalculations] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('premedication.title'),
    });
  }, [navigation, t]);

  useEffect(() => {
    if (patientData) {
      const drugs = calculatePremedication(patientData);
      const serum = calculateSerumTherapy(patientData);
      setDrugCalculations(drugs);
      setSerumCalculations(serum);
      setSelectedSerum(serum.recommendedSerum);
    }
  }, [patientData]);

  const serumTypes = [
    {
      key: 'normalSaline',
      name: t('premedication.normalSaline'),
      composition: 'NaCl 0.9%',
    },
    {
      key: 'ringerLactate',
      name: t('premedication.ringerLactate'),
      composition: 'Ringer Lactate',
    },
    {
      key: 'dextrose5',
      name: t('premedication.dextrose5'),
      composition: 'D5W',
    },
  ];

  const DrugCard = ({ drug }) => (
    <View style={styles.drugCard}>
      <View style={styles.drugHeader}>
        <Text style={[styles.drugName]}>
          {drug.name}
        </Text>
        <View style={styles.doseContainer}>
          <Text style={[styles.doseValue, isRTL && styles.rtlText]}>
            {drug.dose}
          </Text>
          <Text style={[styles.doseUnit, isRTL && styles.rtlText]}>
            {drug.unit}
          </Text>
        </View>
      </View>
      <View style={styles.drugDetails}>
        <Text style={[styles.drugRoute, isRTL && styles.rtlText]}>
          Route: {drug.route}
        </Text>
        {drug.notes && (
          <Text style={[styles.drugNotes, isRTL && styles.rtlText]}>
            {drug.notes}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Medications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            {t('premedication.drugs')}
          </Text>
          
          {Object.values(drugCalculations).map((drug, index) => (
            <DrugCard key={index} drug={drug} />
          ))}
        </View>

        {/* Serum Therapy Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            {t('premedication.serumTherapy')}
          </Text>
          
          <View style={styles.serumCard}>
            <View style={styles.serumInfo}>
              <Text style={[styles.serumLabel, isRTL && styles.rtlText]}>
                Maintenance Rate:
              </Text>
              <Text style={[styles.serumValue, isRTL && styles.rtlText]}>
                {serumCalculations.maintenanceRate} mL/24h
              </Text>
            </View>
            
            <View style={styles.serumInfo}>
              <Text style={[styles.serumLabel, isRTL && styles.rtlText]}>
                {t('premedication.dropsPerMinute')}:
              </Text>
              <Text style={[styles.serumValue, isRTL && styles.rtlText]}>
                {serumCalculations.dropsPerMinute} drops/min
              </Text>
            </View>
          </View>

          {/* Serum Type Selection */}
          <View style={styles.serumSelection}>
            <Text style={[styles.serumSelectionTitle, isRTL && styles.rtlText]}>
              {t('premedication.serumType')}
            </Text>
            
            {serumTypes.map((serum) => (
              <TouchableOpacity
                key={serum.key}
                style={[
                  styles.serumOption,
                  selectedSerum === serum.key && styles.serumOptionSelected,
                ]}
                onPress={() => setSelectedSerum(serum.key)}
              >
                <View style={styles.serumOptionContent}>
                  <Text
                    style={[
                      styles.serumOptionName,
                      selectedSerum === serum.key && styles.serumOptionNameSelected,
                      isRTL && styles.rtlText,
                    ]}
                  >
                    {serum.name}
                  </Text>
                  <Text
                    style={[
                      styles.serumOptionComposition,
                      selectedSerum === serum.key && styles.serumOptionCompositionSelected,
                      isRTL && styles.rtlText,
                    ]}
                  >
                    {serum.composition}
                  </Text>
                </View>
                {selectedSerum === serum.key && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Recommended Serum Note */}
          {serumCalculations.recommendedSerum && (
            <View style={styles.recommendationNote}>
              <Text style={[styles.recommendationText, isRTL && styles.rtlText]}>
                💡 Recommended: {serumTypes.find(s => s.key === serumCalculations.recommendedSerum)?.name}
              </Text>
            </View>
          )}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  drugCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
  drugHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  drugName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  doseContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  doseValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  doseUnit: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  drugDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
  },
  drugRoute: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  drugNotes: {
    fontSize: 14,
    color: '#475569',
    fontStyle: 'italic',
  },
  serumCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serumInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serumLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  serumValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  serumSelection: {
    marginBottom: 16,
  },
  serumSelectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  serumOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  serumOptionSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  serumOptionContent: {
    flex: 1,
  },
  serumOptionName: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  serumOptionNameSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
  serumOptionComposition: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  serumOptionCompositionSelected: {
    color: '#3b82f6',
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
  recommendationNote: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  recommendationText: {
    fontSize: 14,
    color: '#92400e',
    fontWeight: '500',
  },
});

export default PreMedicationScreen;

