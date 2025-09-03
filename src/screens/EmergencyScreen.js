import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../context/LocaleContext';
import { usePatient } from '../context/PatientContext';
import { getEmergencyProtocols, getSeverityColor, getSeverityBackgroundColor } from '../utils/emergencyProtocols';

const EmergencyScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const { patientData } = usePatient();
  
  const [emergencyProtocols, setEmergencyProtocols] = useState({});
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('emergency.title'),
    });
  }, [navigation, t]);

  useEffect(() => {
    if (patientData) {
      const protocols = getEmergencyProtocols(patientData);
      setEmergencyProtocols(protocols);
    }
  }, [patientData]);

  const handleProtocolPress = (protocol) => {
    setSelectedProtocol(protocol);
    setModalVisible(true);
  };

  const EmergencyCard = ({ protocolKey, protocol }) => (
    <TouchableOpacity
      style={[
        styles.emergencyCard,
        { backgroundColor: getSeverityBackgroundColor(protocol.severity) }
      ]}
      onPress={() => handleProtocolPress(protocol)}
      activeOpacity={0.8}
    >
      <View style={styles.emergencyHeader}>
        <Text style={styles.emergencyIcon}>{protocol.icon}</Text>
        <View style={styles.emergencyTextContainer}>
          <Text style={[styles.emergencyTitle, isRTL && styles.rtlText]}>
            {protocol.title}
          </Text>
          <Text style={[
            styles.emergencySeverity,
            { color: getSeverityColor(protocol.severity) },
            isRTL && styles.rtlText,
          ]}>
            {protocol.severity.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.emergencyArrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const ProtocolModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, isRTL && styles.rtl]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedProtocol && (
              <>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalIcon}>{selectedProtocol.icon}</Text>
                    <Text style={[styles.modalTitle, isRTL && styles.rtlText]}>
                      {selectedProtocol.title}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* Treatment Steps */}
                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, isRTL && styles.rtlText]}>
                    Treatment Protocol
                  </Text>
                  {selectedProtocol.steps.map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                      <Text style={[styles.stepText, isRTL && styles.rtlText]}>
                        {step}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Medications */}
                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, isRTL && styles.rtlText]}>
                    Medications
                  </Text>
                  {selectedProtocol.medications.map((med, index) => (
                    <View key={index} style={styles.medicationCard}>
                      <View style={styles.medicationHeader}>
                        <Text style={[styles.medicationName, isRTL && styles.rtlText]}>
                          {med.name}
                        </Text>
                        <View style={styles.medicationDose}>
                          <Text style={[styles.medicationDoseValue, isRTL && styles.rtlText]}>
                            {med.dose}
                          </Text>
                          {med.unit && (
                            <Text style={[styles.medicationDoseUnit, isRTL && styles.rtlText]}>
                              {med.unit}
                            </Text>
                          )}
                        </View>
                      </View>
                      <Text style={[styles.medicationRoute, isRTL && styles.rtlText]}>
                        Route: {med.route}
                      </Text>
                      <Text style={[styles.medicationIndication, isRTL && styles.rtlText]}>
                        {med.indication}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.warningCard}>
          <Text style={[styles.warningTitle, isRTL && styles.rtlText]}>
            ⚠️ Emergency Protocols
          </Text>
          <Text style={[styles.warningText, isRTL && styles.rtlText]}>
            These are emergency guidelines. Always follow your institution's protocols and call for help immediately.
          </Text>
        </View>

        <View style={styles.protocolsContainer}>
          {Object.entries(emergencyProtocols).map(([key, protocol]) => (
            <EmergencyCard
              key={key}
              protocolKey={key}
              protocol={protocol}
            />
          ))}
        </View>
      </ScrollView>

      <ProtocolModal />
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
  warningCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  protocolsContainer: {
    flex: 1,
  },
  emergencyCard: {
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
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  emergencyTextContainer: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  emergencySeverity: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  emergencyArrow: {
    fontSize: 20,
    color: '#64748b',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 16,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: 'bold',
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  stepContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  stepText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  medicationCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  medicationDose: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  medicationDoseValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  medicationDoseUnit: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  medicationRoute: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  medicationIndication: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
  },
});

export default EmergencyScreen;

