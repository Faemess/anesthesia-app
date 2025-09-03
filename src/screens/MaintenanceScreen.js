import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../context/LocaleContext';
import { usePatient } from '../context/PatientContext';
import { calculateMaintenanceDoses, calculateBloodTransfusionNeed } from '../utils/calculations';

const MaintenanceScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const { patientData } = usePatient();
  
  const [selectedMaintenance, setSelectedMaintenance] = useState('tiva');
  const [bloodLoss, setBloodLoss] = useState('');
  const [drugCalculations, setDrugCalculations] = useState({});
  const [transfusionAnalysis, setTransfusionAnalysis] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('maintenance.title'),
    });
  }, [navigation, t]);

  useEffect(() => {
    if (patientData) {
      updateDrugCalculations(selectedMaintenance);
    }
  }, [patientData, selectedMaintenance]);

  useEffect(() => {
    if (patientData && bloodLoss && !isNaN(bloodLoss)) {
      const analysis = calculateBloodTransfusionNeed(patientData, parseFloat(bloodLoss));
      setTransfusionAnalysis(analysis);
    } else {
      setTransfusionAnalysis(null);
    }
  }, [patientData, bloodLoss]);

  const updateDrugCalculations = (maintenanceType) => {
    if (patientData) {
      const drugs = calculateMaintenanceDoses(patientData, maintenanceType);
      setDrugCalculations(drugs);
    }
  };

  const maintenanceTypes = [
    {
      key: 'tiva',
      name: 'TIVA',
      description: 'Total Intravenous Anesthesia',
      icon: '💉',
    },
    {
      key: 'general',
      name: 'General',
      description: 'Inhalational Anesthesia',
      icon: '🫁',
    },
    {
      key: 'spinal',
      name: 'Spinal',
      description: 'Regional Anesthesia',
      icon: '🦴',
    },
  ];

  const handleBloodLossChange = (text) => {
    setBloodLoss(text);
  };

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

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Maintenance Type Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            Select Maintenance Type
          </Text>
          
          {maintenanceTypes.map((type) => (
            <TouchableOpacity
              key={type.key}
              style={[
                styles.maintenanceOption,
                selectedMaintenance === type.key && styles.maintenanceOptionSelected,
              ]}
              onPress={() => setSelectedMaintenance(type.key)}
            >
              <View style={styles.maintenanceOptionContent}>
                <Text style={styles.maintenanceIcon}>{type.icon}</Text>
                <View style={styles.maintenanceTextContainer}>
                  <Text
                    style={[
                      styles.maintenanceName,
                      selectedMaintenance === type.key && styles.maintenanceNameSelected,
                      isRTL && styles.rtlText,
                    ]}
                  >
                    {type.name}
                  </Text>
                  <Text
                    style={[
                      styles.maintenanceDescription,
                      selectedMaintenance === type.key && styles.maintenanceDescriptionSelected,
                      isRTL && styles.rtlText,
                    ]}
                  >
                    {type.description}
                  </Text>
                </View>
              </View>
              {selectedMaintenance === type.key && (
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
            Maintenance Medications
          </Text>
          
          {Object.keys(drugCalculations).length > 0 ? (
            Object.values(drugCalculations).map((drug, index) => (
              <DrugCard key={index} drug={drug} />
            ))
          ) : (
            <View style={styles.noDrugsCard}>
              <Text style={[styles.noDrugsText, isRTL && styles.rtlText]}>
                Monitor block level and vital signs
              </Text>
            </View>
          )}
        </View>

        {/* Blood Loss Monitoring */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            Blood Loss Monitoring
          </Text>
          
          <View style={styles.bloodLossCard}>
            <Text style={[styles.bloodLossLabel, isRTL && styles.rtlText]}>
              {t('maintenance.bloodLoss')}
            </Text>
            <TextInput
              style={[
                styles.bloodLossInput,
                isRTL && styles.rtlInput,
              ]}
              value={bloodLoss}
              onChangeText={handleBloodLossChange}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Patient Blood Volume Info */}
          {patientData && (
            <View style={styles.bloodVolumeCard}>
              <Text style={[styles.bloodVolumeTitle, isRTL && styles.rtlText]}>
                Patient Blood Volume Information
              </Text>
              <View style={styles.bloodVolumeRow}>
                <Text style={[styles.bloodVolumeLabel, isRTL && styles.rtlText]}>
                  Estimated Blood Volume:
                </Text>
                <Text style={[styles.bloodVolumeValue, isRTL && styles.rtlText]}>
                  {Math.round(patientData.weight * 70)} mL
                </Text>
              </View>
              {transfusionAnalysis && (
                <View style={styles.bloodVolumeRow}>
                  <Text style={[styles.bloodVolumeLabel, isRTL && styles.rtlText]}>
                    Blood Loss Percentage:
                  </Text>
                  <Text style={[styles.bloodVolumeValue, isRTL && styles.rtlText]}>
                    {transfusionAnalysis.bloodLossPercentage}%
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Transfusion Analysis */}
          {transfusionAnalysis && (
            <View style={[
              styles.transfusionCard,
              transfusionAnalysis.transfusionNeeded ? styles.transfusionNeeded : styles.transfusionNotNeeded
            ]}>
              <View style={styles.transfusionHeader}>
                <Text style={[styles.transfusionTitle, isRTL && styles.rtlText]}>
                  {t('maintenance.transfusionNeeded')}
                </Text>
                <Text style={[
                  styles.transfusionStatus,
                  transfusionAnalysis.transfusionNeeded ? styles.transfusionYes : styles.transfusionNo,
                  isRTL && styles.rtlText,
                ]}>
                  {transfusionAnalysis.transfusionNeeded ? t('maintenance.yes') : t('maintenance.no')}
                </Text>
              </View>
              
              {transfusionAnalysis.transfusionNeeded && (
                <View style={styles.transfusionReason}>
                  <Text style={[styles.transfusionReasonTitle, isRTL && styles.rtlText]}>
                    Reason:
                  </Text>
                  <Text style={[styles.transfusionReasonText, isRTL && styles.rtlText]}>
                    {transfusionAnalysis.reason}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Clinical Guidelines */}
        <View style={styles.section}>
          <View style={styles.guidelinesCard}>
            <Text style={[styles.guidelinesTitle, isRTL && styles.rtlText]}>
              📋 Transfusion Guidelines
            </Text>
            <Text style={[styles.guidelinesText, isRTL && styles.rtlText]}>
              • Consider transfusion if blood loss > 15-20% of estimated blood volume
            </Text>
            <Text style={[styles.guidelinesText, isRTL && styles.rtlText]}>
              • Hemoglobin threshold: 7-8 g/dL for most patients
            </Text>
            <Text style={[styles.guidelinesText, isRTL && styles.rtlText]}>
              • Higher threshold (9-10 g/dL) for cardiac patients
            </Text>
            <Text style={[styles.guidelinesText, isRTL && styles.rtlText]}>
              • Always consider patient's clinical condition
            </Text>
          </View>
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
  maintenanceOption: {
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
  maintenanceOptionSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  maintenanceOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  maintenanceIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  maintenanceTextContainer: {
    flex: 1,
  },
  maintenanceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  maintenanceNameSelected: {
    color: '#2563eb',
  },
  maintenanceDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  maintenanceDescriptionSelected: {
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
  bloodLossCard: {
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
  bloodLossLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  bloodLossInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#374151',
  },
  rtlInput: {
    textAlign: 'right',
  },
  bloodVolumeCard: {
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
  bloodVolumeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  bloodVolumeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bloodVolumeLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  bloodVolumeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  transfusionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  transfusionNeeded: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  transfusionNotNeeded: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  transfusionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transfusionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  transfusionStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transfusionYes: {
    color: '#dc2626',
  },
  transfusionNo: {
    color: '#16a34a',
  },
  transfusionReason: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 8,
  },
  transfusionReasonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  transfusionReasonText: {
    fontSize: 14,
    color: '#dc2626',
    lineHeight: 20,
  },
  guidelinesCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  guidelinesText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 4,
    lineHeight: 20,
  },
});

export default MaintenanceScreen;

