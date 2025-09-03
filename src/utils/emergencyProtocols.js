// Emergency protocols for anesthesia management

export const getEmergencyProtocols = (patientData) => {
  const { age, weight } = patientData;

  return {
    laryngospasm: {
      title: 'Laryngospasm',
      icon: '🫁',
      severity: 'high',
      steps: [
        '1. Remove stimulus, apply 100% O2 with positive pressure',
        '2. Deepen anesthesia if inadequate',
        '3. Apply larson maneuver (pressure behind angle of mandible)',
        '4. If persistent: Succinylcholine 0.1-0.5 mg/kg IV',
        '5. Consider emergency cricothyrotomy if complete obstruction',
      ],
      medications: [
        {
          name: 'Succinylcholine',
          dose: Math.round((weight * 0.5) * 10) / 10,
          unit: 'mg',
          route: 'IV',
          indication: 'If laryngospasm persists',
        },
        {
          name: 'Propofol',
          dose: Math.round((weight * 1) * 10) / 10,
          unit: 'mg',
          route: 'IV',
          indication: 'Deepen anesthesia',
        },
      ],
    },

    cardiacArrest: {
      title: 'Cardiac Arrest',
      icon: '💔',
      severity: 'critical',
      steps: [
        '1. Call for help, start CPR immediately',
        '2. Check rhythm, defibrillate if VF/VT',
        '3. Epinephrine 1 mg IV every 3-5 minutes',
        '4. Consider reversible causes (4 Hs and 4 Ts)',
        '5. Continue ACLS protocol',
      ],
      medications: [
        {
          name: 'Epinephrine',
          dose: age < 12 ? Math.round((weight * 0.01) * 100) / 100 : 1,
          unit: age < 12 ? 'mg' : 'mg',
          route: 'IV',
          indication: 'Every 3-5 minutes during CPR',
        },
        {
          name: 'Amiodarone',
          dose: age < 12 ? Math.round((weight * 5) * 10) / 10 : 300,
          unit: 'mg',
          route: 'IV',
          indication: 'For VF/VT',
        },
      ],
    },

    anaphylaxis: {
      title: 'Anaphylaxis',
      icon: '⚠️',
      severity: 'critical',
      steps: [
        '1. Stop suspected trigger, call for help',
        '2. Epinephrine IM immediately',
        '3. High flow oxygen, IV fluids',
        '4. H1 and H2 antihistamines',
        '5. Corticosteroids',
        '6. Consider vasopressors if hypotensive',
      ],
      medications: [
        {
          name: 'Epinephrine',
          dose: age < 12 ? Math.round((weight * 0.01) * 100) / 100 : 0.5,
          unit: 'mg',
          route: 'IM',
          indication: 'First line treatment',
        },
        {
          name: 'Diphenhydramine',
          dose: age < 12 ? Math.round((weight * 1) * 10) / 10 : 50,
          unit: 'mg',
          route: 'IV',
          indication: 'H1 antihistamine',
        },
        {
          name: 'Ranitidine',
          dose: age < 12 ? Math.round((weight * 1) * 10) / 10 : 50,
          unit: 'mg',
          route: 'IV',
          indication: 'H2 antihistamine',
        },
        {
          name: 'Hydrocortisone',
          dose: age < 12 ? Math.round((weight * 4) * 10) / 10 : 200,
          unit: 'mg',
          route: 'IV',
          indication: 'Corticosteroid',
        },
      ],
    },

    malignantHyperthermia: {
      title: 'Malignant Hyperthermia',
      icon: '🌡️',
      severity: 'critical',
      steps: [
        '1. Discontinue triggering agents immediately',
        '2. Hyperventilate with 100% O2',
        '3. Dantrolene 2.5 mg/kg IV, repeat as needed',
        '4. Cool patient aggressively',
        '5. Treat hyperkalemia and acidosis',
        '6. Monitor for complications',
      ],
      medications: [
        {
          name: 'Dantrolene',
          dose: Math.round((weight * 2.5) * 10) / 10,
          unit: 'mg',
          route: 'IV',
          indication: 'Initial dose, repeat as needed',
        },
        {
          name: 'Sodium Bicarbonate',
          dose: Math.round((weight * 1) * 10) / 10,
          unit: 'mEq',
          route: 'IV',
          indication: 'For acidosis',
        },
        {
          name: 'Insulin + Glucose',
          dose: '10 units regular insulin + 50 mL D50W',
          unit: '',
          route: 'IV',
          indication: 'For hyperkalemia',
        },
      ],
    },

    bronchospasm: {
      title: 'Bronchospasm',
      icon: '🫁',
      severity: 'moderate',
      steps: [
        '1. Deepen anesthesia, 100% O2',
        '2. Albuterol via ETT or mask',
        '3. Consider epinephrine if severe',
        '4. Steroids if persistent',
        '5. Rule out other causes',
      ],
      medications: [
        {
          name: 'Albuterol',
          dose: '2.5-5',
          unit: 'mg',
          route: 'Nebulized',
          indication: 'Bronchodilator',
        },
        {
          name: 'Epinephrine',
          dose: age < 12 ? Math.round((weight * 0.01) * 1000) / 1000 : 0.1,
          unit: 'mg',
          route: 'IV',
          indication: 'If severe bronchospasm',
        },
        {
          name: 'Methylprednisolone',
          dose: age < 12 ? Math.round((weight * 1) * 10) / 10 : 60,
          unit: 'mg',
          route: 'IV',
          indication: 'Anti-inflammatory',
        },
      ],
    },

    hypotension: {
      title: 'Hypotension',
      icon: '📉',
      severity: 'moderate',
      steps: [
        '1. Check depth of anesthesia',
        '2. IV fluid bolus',
        '3. Vasopressors if needed',
        '4. Rule out bleeding, cardiac causes',
        '5. Consider inotropes if poor contractility',
      ],
      medications: [
        {
          name: 'Ephedrine',
          dose: age < 12 ? Math.round((weight * 0.1) * 10) / 10 : 5,
          unit: 'mg',
          route: 'IV',
          indication: 'Mixed alpha/beta agonist',
        },
        {
          name: 'Phenylephrine',
          dose: age < 12 ? Math.round((weight * 1) * 10) / 10 : 100,
          unit: 'mcg',
          route: 'IV',
          indication: 'Pure alpha agonist',
        },
        {
          name: 'Normal Saline',
          dose: age < 12 ? Math.round((weight * 10) * 10) / 10 : 500,
          unit: 'mL',
          route: 'IV',
          indication: 'Fluid resuscitation',
        },
      ],
    },
  };
};

export const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical':
      return '#dc2626';
    case 'high':
      return '#ea580c';
    case 'moderate':
      return '#d97706';
    default:
      return '#64748b';
  }
};

export const getSeverityBackgroundColor = (severity) => {
  switch (severity) {
    case 'critical':
      return '#fef2f2';
    case 'high':
      return '#fff7ed';
    case 'moderate':
      return '#fffbeb';
    default:
      return '#f8fafc';
  }
};

