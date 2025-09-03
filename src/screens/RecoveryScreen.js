import React, { useState } from 'react';
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

const RecoveryScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const { patientData } = usePatient();
  
  const [checkedItems, setCheckedItems] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('recovery.title'),
    });
  }, [navigation, t]);

  const toggleCheckItem = (itemKey) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const recoveryChecklist = [
    {
      category: 'Airway Management',
      items: [
        { key: 'airway_patent', text: 'Airway patent and clear' },
        { key: 'breathing_adequate', text: 'Adequate spontaneous breathing' },
        { key: 'oxygen_saturation', text: 'Oxygen saturation > 95%' },
        { key: 'extubation_criteria', text: 'Extubation criteria met (if applicable)' },
      ],
    },
    {
      category: 'Cardiovascular',
      items: [
        { key: 'bp_stable', text: 'Blood pressure stable' },
        { key: 'heart_rate', text: 'Heart rate within normal limits' },
        { key: 'perfusion', text: 'Adequate peripheral perfusion' },
        { key: 'ecg_normal', text: 'ECG rhythm normal' },
      ],
    },
    {
      category: 'Neurological',
      items: [
        { key: 'consciousness', text: 'Appropriate level of consciousness' },
        { key: 'motor_function', text: 'Motor function returning' },
        { key: 'pain_controlled', text: 'Pain adequately controlled' },
        { key: 'nausea_vomiting', text: 'No nausea or vomiting' },
      ],
    },
    {
      category: 'Temperature & Fluids',
      items: [
        { key: 'temperature', text: 'Core temperature > 36°C' },
        { key: 'fluid_balance', text: 'Fluid balance appropriate' },
        { key: 'urine_output', text: 'Adequate urine output' },
        { key: 'bleeding', text: 'No excessive bleeding' },
      ],
    },
  ];

  const reversal_agents = [
    {
      name: 'Neostigmine',
      dose: `${Math.round((patientData?.weight || 70) * 0.05 * 10) / 10} mg`,
      indication: 'Reverse neuromuscular blockade',
      notes: 'Give with atropine or glycopyrrolate',
    },
    {
      name: 'Sugammadex',
      dose: `${Math.round((patientData?.weight || 70) * 2 * 10) / 10} mg`,
      indication: 'Reverse rocuronium/vecuronium',
      notes: 'Rapid reversal, expensive',
    },
    {
      name: 'Flumazenil',
      dose: '0.2-1 mg',
      indication: 'Reverse benzodiazepines',
      notes: 'Use cautiously, short duration',
    },
    {
      name: 'Naloxone',
      dose: '0.04-0.4 mg',
      indication: 'Reverse opioids',
      notes: 'May cause pain, hypertension',
    },
  ];

  const ChecklistItem = ({ item, categoryKey }) => {
    const itemKey = `${categoryKey}_${item.key}`;
    const isChecked = checkedItems[itemKey];

    return (
      <TouchableOpacity
        style={styles.checklistItem}
        onPress={() => toggleCheckItem(itemKey)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox,
          isChecked && styles.checkboxChecked,
        ]}>
          {isChecked && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>
        <Text style={[
          styles.checklistText,
          isChecked && styles.checklistTextChecked,
          isRTL && styles.rtlText,
        ]}>
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  };

  const ReversalCard = ({ agent }) => (
    <View style={styles.reversalCard}>
      <View style={styles.reversalHeader}>
        <Text style={[styles.reversalName, isRTL && styles.rtlText]}>
          {agent.name}
        </Text>
        <Text style={[styles.reversalDose, isRTL && styles.rtlText]}>
          {agent.dose}
        </Text>
      </View>
      <Text style={[styles.reversalIndication, isRTL && styles.rtlText]}>
        {agent.indication}
      </Text>
      <Text style={[styles.reversalNotes, isRTL && styles.rtlText]}>
        {agent.notes}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recovery Checklist */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            Recovery Checklist
          </Text>
          
          {recoveryChecklist.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.categoryContainer}>
              <Text style={[styles.categoryTitle, isRTL && styles.rtlText]}>
                {category.category}
              </Text>
              
              {category.items.map((item, itemIndex) => (
                <ChecklistItem
                  key={itemIndex}
                  item={item}
                  categoryKey={category.category.toLowerCase().replace(/\s+/g, '_')}
                />
              ))}
            </View>
          ))}
        </View>

        {/* Reversal Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            Reversal Agents
          </Text>
          
          {reversal_agents.map((agent, index) => (
            <ReversalCard key={index} agent={agent} />
          ))}
        </View>

        {/* Discharge Criteria */}
        <View style={styles.section}>
          <View style={styles.dischargeCard}>
            <Text style={[styles.dischargeTitle, isRTL && styles.rtlText]}>
              📋 Discharge Criteria (Aldrete Score ≥ 9)
            </Text>
            
            <View style={styles.criteriaContainer}>
              <Text style={[styles.criteriaItem, isRTL && styles.rtlText]}>
                • Activity: Able to move 4 extremities voluntarily
              </Text>
              <Text style={[styles.criteriaItem, isRTL && styles.rtlText]}>
                • Respiration: Able to breathe deeply and cough freely
              </Text>
              <Text style={[styles.criteriaItem, isRTL && styles.rtlText]}>
                • Circulation: BP ± 20% of pre-anesthetic level
              </Text>
              <Text style={[styles.criteriaItem, isRTL && styles.rtlText]}>
                • Consciousness: Fully awake and oriented
              </Text>
              <Text style={[styles.criteriaItem, isRTL && styles.rtlText]}>
                • Oxygen Saturation: SpO2 > 92% on room air
              </Text>
            </View>
          </View>
        </View>

        {/* Post-operative Instructions */}
        <View style={styles.section}>
          <View style={styles.instructionsCard}>
            <Text style={[styles.instructionsTitle, isRTL && styles.rtlText]}>
              📝 Post-operative Instructions
            </Text>
            
            <Text style={[styles.instructionText, isRTL && styles.rtlText]}>
              • Monitor vital signs every 15 minutes initially
            </Text>
            <Text style={[styles.instructionText, isRTL && styles.rtlText]}>
              • Assess pain level and provide appropriate analgesia
            </Text>
            <Text style={[styles.instructionText, isRTL && styles.rtlText]}>
              • Check surgical site for bleeding or complications
            </Text>
            <Text style={[styles.instructionText, isRTL && styles.rtlText]}>
              • Ensure patient can tolerate oral fluids before discharge
            </Text>
            <Text style={[styles.instructionText, isRTL && styles.rtlText]}>
              • Provide clear discharge instructions to patient/family
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
  categoryContainer: {
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
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 8,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checklistText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  checklistTextChecked: {
    color: '#10b981',
    textDecorationLine: 'line-through',
  },
  reversalCard: {
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
  reversalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reversalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  reversalDose: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  reversalIndication: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  reversalNotes: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
  },
  dischargeCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  dischargeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 12,
  },
  criteriaContainer: {
    marginTop: 8,
  },
  criteriaItem: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 6,
    lineHeight: 20,
  },
  instructionsCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default RecoveryScreen;

