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
import { calculateInductionDoses, calculateEquipmentSize } from '../utils/calculations';

const InductionScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const { patientData } = usePatient();
  
  const [selectedInduction, setSelectedInduction] = useState('tiva');
  const [drugCalculations, setDrugCalculations] = useState({});
  const [equipmentSizes, setEquipmentSizes] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('induction.title'),
    });
  }, [navigation, t]);

  useEffect(() => {
    if (patientData) {
      const equipment = calculateEquipmentSize(patientData);
      setEquipmentSizes(equipment);
      updateDrugCalculations(selectedInduction);
    }
  }, [patientData, selectedInduction]);

  const updateDrugCalculations = (inductionType) => {
    if (patientData) {
      const drugs = calculateInductionDoses(patientData, inductionType);
      setDrugCalculations(drugs);
    }
  };

  const inductionTypes = [
    {
      key: 'tiva',
      name: t('induction.tiva'),
      description: 'Total Intravenous Anesthesia',
      icon: '💉',
    },
    {
      key: 'inhalational',
      name: t('induction.inhalational'),
      description: 'Inhalational Anesthetics',
      icon: '🫁',
    },
    {
      key: 'spinal',
      name: t('induction.spinal'),
      description: 'Regional Anesthesia',
      icon: '🦴',
    },
  ];

  const DrugCard = ({ drug }) => (
    <View style={styles.drugCard}>
      <View style={styles.drugHeader}>
        <Text style={[styles.drugName, isRTL && styles.rtlText]}>
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
      <Text style={[styles.drugRoute, isRTL && styles.rtlText]}>
        Route: {drug.route}
      </Text>
    </View>
  );

  const EquipmentCard = ({ label, value }) => (
    <View style={styles.equipmentCard}>
      <Text style={[styles.equipmentLabel, isRTL && styles.rtlText]}>
        {label}
      </Text>
      <Text style={[styles.equipmentValue, isRTL && styles.rtlText]}>
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Induction Type Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            Select Induction Type
          </Text>
          
          {inductionTypes.map((type) => (
            <TouchableOpacity
              key={type.key}
              style={[
                styles.inductionOption,
                selectedInduction === type.key && styles.inductionOptionSelected,
              ]}
              onPress={() => setSelectedInduction(type.key)}
            >
              <View style={styles.inductionOptionContent}>
                <Text style={styles.inductionIcon}>{type.icon}</Text>
                <View style={styles.inductionTextContainer}>
                  <Text
                    style={[
                      styles.inductionName,
                      selectedInduction === type.key && styles.inductionNameSelected,
                      isRTL && styles.rtlText,
                    ]}
                  >
                    {type.name}
                  </Text>
                  <Text
                    style={[
                      styles.inductionDescription,
                      selectedInduction === type.key && styles.inductionDescriptionSelected,
                      isRTL && styles.rtlText,
                    ]}
                  >
                    {type.description}
                  </Text>
                </View>
              </View>
              {selectedInduction === type.key && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Drug Calculations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            Medications
          </Text>
          
          {Object.keys(drugCalculations).length > 0 ? (
            Object.values(drugCalculations).map((drug, index) => (
              <DrugCard key={index} drug={drug} />
            ))
          ) : (
            <View style={styles.noDrugsCard}>
              <Text style={[styles.noDrugsText, isRTL && styles.rtlText]}>
                No specific medications for this induction type
              </Text>
            </View>
          )}
        </View>

        {/* Equipment Requirements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            {t('induction.equipment')}
          </Text>
          
          <View style={styles.equipmentGrid}>
            <EquipmentCard
              label={t('induction.endotrachealTube')}
              value={equipmentSizes.endotrachealTube}
            />
            <EquipmentCard
              label={t('induction.laryngoscope')}
              value={equipmentSizes.laryngoscopeBlade}
            />
            <EquipmentCard
              label="Oral Airway"
              value={equipmentSizes.oralAirway}
            />
            <EquipmentCard
              label="Nasal Airway"
              value={equipmentSizes.nasalAirway}
            />
          </View>
        </View>

        {/* Special Notes */}
        {selectedInduction === 'spinal' && (
          <View style={styles.section}>
            <View style={styles.noteCard}>
              <Text style={[styles.noteTitle, isRTL && styles.rtlText]}>
                ⚠️ Spinal Anesthesia Notes
              </Text>
              <Text style={[styles.noteText, isRTL && styles.rtlText]}>
                • Check for contraindications (coagulopathy, infection, patient refusal)
              </Text>
              <Text style={[styles.noteText, isRTL && styles.rtlText]}>
                • Monitor for hypotension and bradycardia
              </Text>
              <Text style={[styles.noteText, isRTL && styles.rtlText]}>
                • Assess block level before surgical incision
              </Text>
            </View>
          </View>
        )}
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
  inductionOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inductionOptionSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  inductionOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inductionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  inductionTextContainer: {
    flex: 1,
  },
  inductionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  inductionNameSelected: {
    color: '#2563eb',
  },
  inductionDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  inductionDescriptionSelected: {
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
  drugRoute: {
    fontSize: 14,
    color: '#64748b',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
  },
  noDrugsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  noDrugsText: {
    fontSize: 16,
    color: '#64748b',
    fontStyle: 'italic',
  },
  equipmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  equipmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  equipmentLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  equipmentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  noteCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 4,
    lineHeight: 20,
  },
});

export default InductionScreen;

