import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../context/LocaleContext';
import { usePatient } from '../context/PatientContext';

const PatientFormScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isRTL } = useLocale();
  const { updatePatientData } = usePatient();

  const [formData, setFormData] = useState({
    age: '25',
    sex: 'male',
    weight: '70',
    hematocrit: '33',
    hemoglobin: '13.5',
  });

  const [errors, setErrors] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('patient.title'),
    });
  }, [navigation, t]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.age || isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = t('patient.validation.ageRequired');
    }

    if (!formData.sex) {
      newErrors.sex = 'Sex is required';
    }

    if (!formData.weight || isNaN(formData.weight) || formData.weight <= 0) {
      newErrors.weight = t('patient.validation.weightRequired');
    }

    if (!formData.hematocrit && !formData.hemoglobin) {
      newErrors.hematocrit = t('patient.validation.hematocritRequired');
    }

    if (formData.hematocrit && (isNaN(formData.hematocrit) || formData.hematocrit <= 0 || formData.hematocrit > 100)) {
      newErrors.hematocrit = 'Hematocrit must be between 1-100%';
    }

    if (formData.hemoglobin && (isNaN(formData.hemoglobin) || formData.hemoglobin <= 0 || formData.hemoglobin > 25)) {
      newErrors.hemoglobin = 'Hemoglobin must be between 1-25 g/dL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const patientData = {
        age: parseInt(formData.age),
        sex: formData.sex,
        weight: parseFloat(formData.weight),
        hematocrit: formData.hematocrit ? parseFloat(formData.hematocrit) : null,
        hemoglobin: formData.hemoglobin ? parseFloat(formData.hemoglobin) : null,
      };

      updatePatientData(patientData);
      navigation.navigate('Workflow');
    } else {
      Alert.alert('Validation Error', 'Please correct the errors and try again.');
    }
  };

  const handleSexSelection = (sex) => {
    setFormData(prev => ({ ...prev, sex }));
    if (errors.sex) {
      setErrors(prev => ({ ...prev, sex: null }));
    }
  };

  // Clear form function to reset all input fields
  const clearForm = () => {
    setFormData({
      age: '',
      sex: '',
      weight: '',
      hematocrit: '',
      hemoglobin: '',
    });
    setErrors({});
  };

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtl]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            {/* Age Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label]}>
                {t('patient.age')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.age && styles.inputError,
                  isRTL && styles.rtlInput,
                ]}
                value={formData.age}
                onChangeText={(text) => {
                  setFormData(prev => ({ ...prev, age: text }));
                  if (errors.age) setErrors(prev => ({ ...prev, age: null }));
                }}
                placeholder="25"
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
              />
              {errors.age && (
                <Text style={[styles.errorText]}>
                  {errors.age}
                </Text>
              )}
            </View>

            {/* Sex Selection */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label]}>
                {t('patient.sex')}
              </Text>
              <View style={styles.sexContainer}>
                <TouchableOpacity
                  style={[
                    styles.sexButton,
                    formData.sex === 'male' && styles.sexButtonActive,
                  ]}
                  onPress={() => handleSexSelection('male')}
                >
                  <Text
                    style={[
                      styles.sexButtonText,
                      formData.sex === 'male' && styles.sexButtonTextActive,
                      isRTL && styles.rtlText,
                    ]}
                  >
                    {t('patient.male')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sexButton,
                    formData.sex === 'female' && styles.sexButtonActive,
                  ]}
                  onPress={() => handleSexSelection('female')}
                >
                  <Text
                    style={[
                      styles.sexButtonText,
                      formData.sex === 'female' && styles.sexButtonTextActive,
                      isRTL && styles.rtlText,
                    ]}
                  >
                    {t('patient.female')}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.sex && (
                <Text style={[styles.errorText]}>
                  {errors.sex}
                </Text>
              )}
            </View>

            {/* Weight Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label]}>
                {t('patient.weight')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.weight && styles.inputError,
                  isRTL && styles.rtlInput,
                ]}
                value={formData.weight}
                onChangeText={(text) => {
                  setFormData(prev => ({ ...prev, weight: text }));
                  if (errors.weight) setErrors(prev => ({ ...prev, weight: null }));
                }}
                placeholder="70"
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
              />
              {errors.weight && (
                <Text style={[styles.errorText]}>
                  {errors.weight}
                </Text>
              )}
            </View>

            {/* Hematocrit Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label]}>
                {t('patient.hematocrit')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.hematocrit && styles.inputError,
                  isRTL && styles.rtlInput,
                ]}
                value={formData.hematocrit}
                onChangeText={(text) => {
                  setFormData(prev => ({ ...prev, hematocrit: text }));
                  if (errors.hematocrit) setErrors(prev => ({ ...prev, hematocrit: null }));
                }}
                placeholder="40"
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
              />
              {errors.hematocrit && (
                <Text style={[styles.errorText]}>
                  {errors.hematocrit}
                </Text>
              )}
            </View>

            {/* Hemoglobin Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label]}>
                {t('patient.hemoglobin')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.hemoglobin && styles.inputError,
                  isRTL && styles.rtlInput,
                ]}
                value={formData.hemoglobin}
                onChangeText={(text) => {
                  setFormData(prev => ({ ...prev, hemoglobin: text }));
                  if (errors.hemoglobin) setErrors(prev => ({ ...prev, hemoglobin: null }));
                }}
                placeholder="13.5"
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
              />
              {errors.hemoglobin && (
                <Text style={[styles.errorText]}>
                  {errors.hemoglobin}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={[styles.submitButtonText]}>
                {t('patient.submit')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearForm}
              activeOpacity={0.8}
            >
              <Text style={[styles.clearButtonText]}>
                {t('patient.clearForm')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  input: {
    backgroundColor: '#ffffff',
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
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
  sexContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  sexButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  sexButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  sexButtonText: {
    fontSize: 16,
    color: '#374151',
  },
  sexButtonTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  clearButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default PatientFormScreen;

