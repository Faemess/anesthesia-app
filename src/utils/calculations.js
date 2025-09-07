// Drug calculation utilities for anesthesia management

export const calculatePremedication = (patientData) => {
  const { age, weight, sex } = patientData;
  
  const calculations = {
    midazolam: {
      name: 'Midazolam',
      dose: Math.round((weight * 0.05) * 10) / 10, // 0.05 mg/kg
      unit: 'mg',
      route: 'IV',
      notes: 'Anxiolysis and sedation',
    },
    atropine: {
      name: 'Atropine',
      dose: age < 12 ? Math.round((weight * 0.02) * 100) / 100 : Math.round((weight * 0.01) * 100) / 100,
      unit: 'mg',
      route: 'IV/IM',
      notes: 'Antisialagogue, prevent bradycardia',
    },
    ondansetron: {
      name: 'Ondansetron',
      dose: age < 12 ? Math.round((weight * 0.15) * 10) / 10 : 4,
      unit: 'mg',
      route: 'IV',
      notes: 'Antiemetic',
    },
  };

  return calculations;
};

export const calculateSerumTherapy = (patientData) => {
  const { age, weight } = patientData;
  
  // Maintenance fluid calculation (Holliday-Segar method)
  let maintenanceRate;
  if (weight <= 10) {
    maintenanceRate = weight * 100; // 100 mL/kg for first 10 kg
  } else if (weight <= 20) {
    maintenanceRate = 1000 + ((weight - 10) * 50); // 50 mL/kg for next 10 kg
  } else {
    maintenanceRate = 1500 + ((weight - 20) * 20); // 20 mL/kg for each kg > 20
  }

  // Convert to drops per minute (assuming 20 drops/mL)
  const dropsPerMinute = Math.round((maintenanceRate / 24 / 60) * 20);

  return {
    maintenanceRate: Math.round(maintenanceRate), // mL/24h
    dropsPerMinute,
    recommendedSerum: age < 2 ? 'dextrose5' : 'normalSaline',
  };
};

export const calculateInductionDoses = (patientData, inductionType) => {
  const { age, weight, sex } = patientData;
  
  const calculations = {};

  switch (inductionType) {
    case 'tiva':
      calculations.propofol = {
        name: 'Propofol',
        dose: calculatePropofolDosageInduction(age, weight),
        unit: 'mg',
        route: 'IV',
      };
      calculations.thiopental = {
        name: 'Thiopental',
        dose: calculateThiopentalDosageInduction(age, weight),
        unit: 'mg',
        route: 'IV',
      };
      calculations.fentanyl = {
        name: 'Fentanyl',
        dose: Math.round((weight * 2) * 10) / 10,
        unit: 'mcg',
        route: 'IV',
      };
      calculations.rocuronium = {
        name: 'Rocuronium',
        dose: Math.round((weight * 0.6) * 10) / 10,
        unit: 'mg',
        route: 'IV',
      };
      break;

    case 'general':
      calculations.thiopental = {
        name: 'Thiopental',
        dose: Math.round((weight * (age < 12 ? 6 : 5)) * 10) / 10,
        unit: 'mg',
        route: 'IV',
      };
      calculations.succinylcholine = {
        name: 'Succinylcholine',
        dose: Math.round((weight * (age < 12 ? 2 : 1.5)) * 10) / 10,
        unit: 'mg',
        route: 'IV',
      };
      break;

    case 'spinal':
      calculations.bupivacaine = {
        name: 'Bupivacaine 0.5%',
        dose: age < 12 ? Math.round((weight * 0.3) * 10) / 10 : 15,
        unit: 'mg',
        route: 'Intrathecal',
      };
      break;
  }

  return calculations;
};

export const calculateEquipmentSize = (patientData) => {
  const { age, weight } = patientData;
  
  let endotrachealTube;
  let laryngoscopeBlade;

  if (age < 1) {
    endotrachealTube = '3.0-3.5';
    laryngoscopeBlade = 'Miller 0-1';
  } else if (age < 2) {
    endotrachealTube = '3.5-4.0';
    laryngoscopeBlade = 'Miller 1';
  } else if (age < 8) {
    endotrachealTube = `${Math.round((age / 4 + 4) * 10) / 10}`;
    laryngoscopeBlade = 'Miller 1-2';
  } else {
    endotrachealTube = `${Math.round(((age + 16) / 4) * 10) / 10}`;
    laryngoscopeBlade = 'Macintosh 2-3';
  }

  return {
    endotrachealTube,
    laryngoscopeBlade,
    oralAirway: age < 12 ? `${Math.round((age + 6) / 3)}` : '4-5',
    nasalAirway: age < 12 ? `${Math.round((age + 15) / 2)}` : '7-8',
  };
};

export const calculateMaintenanceDoses = (patientData, maintenanceType) => {
  const { age, weight } = patientData;
  
  const calculations = {};

  switch (maintenanceType) {
    case 'tiva':
      calculations.propofolInfusion = {
        name: 'Propofol Infusion',
        dose: `${weight*100}-${weight*200}`,
        unit: 'mcg/min',
        route: 'IV',
      };
      calculations.remifentanil = {
        name: 'Remifentanil',
        dose: Math.round((weight * 0.25) * 100) / 100,
        unit: 'mcg/kg/min',
        route: 'IV',
      };
      break;

    case 'general':
      calculations.sevoflurane = {
        name: 'Sevoflurane',
        dose: age < 12 ? '2-3' : '1.5-2.5',
        unit: 'MAC',
        route: 'Inhalation',
      };
      calculations.fentanyl = {
        name: 'Fentanyl',
        dose: Math.round((weight * 1) * 10) / 10,
        unit: 'mcg/kg/h',
        route: 'IV',
      };
      break;

    case 'spinal':
      calculations.monitoring = {
        name: 'Spinal Block Monitoring',
        dose: 'T6-T10',
        unit: 'Level',
        route: 'Assessment',
      };
      break;
  }

  return calculations;
};

export const calculateBloodTransfusionNeed = (patientData, bloodLoss) => {
  const { weight, hematocrit, hemoglobin } = patientData;
  
  // Calculate estimated blood volume (EBV)
  const ebv = weight * 70; // mL (average 70 mL/kg)
  
  // Calculate percentage of blood loss
  const bloodLossPercentage = (bloodLoss / ebv) * 100;
  
  // Determine transfusion need based on blood loss and hematocrit/hemoglobin
  let transfusionNeeded = false;
  let reason = '';

  if (bloodLossPercentage > 20) {
    transfusionNeeded = true;
    reason = 'Blood loss > 20% of estimated blood volume';
  } else if (hematocrit && hematocrit < 25) {
    transfusionNeeded = true;
    reason = 'Hematocrit < 25%';
  } else if (hemoglobin && hemoglobin < 8) {
    transfusionNeeded = true;
    reason = 'Hemoglobin < 8 g/dL';
  } else if (bloodLossPercentage > 15 && ((hematocrit && hematocrit < 30) || (hemoglobin && hemoglobin < 10))) {
    transfusionNeeded = true;
    reason = 'Significant blood loss with low Hct/Hgb';
  }

  return {
    transfusionNeeded,
    reason,
    bloodLossPercentage: Math.round(bloodLossPercentage * 10) / 10,
    estimatedBloodVolume: Math.round(ebv),
  };
};

// Updated Propofol Dosage Calculation function
export function calculatePropofolDosageInduction(age, weight) {
  let min, max;
  if (age >= 65) {
    // For patients older than 60: 1-1.5 mg/kg
    min = 1 * weight;
    max = 1.75 * weight;
    return `${min}-${max}`;
  } else if (age <= 2) {
    // For patients younger than 2: 2.5-3.5 mg/kg
    min = 2.5 * weight;
    max = 3.5 * weight;
    return `${min}-${max}`;
  } else {
    // For patients between 2 and 60: 1.5-2.5 mg/kg
    min = 1 * weight;
    max = 2.5 * weight;
    return `${min}-${max}`;
  }
}

// Updated Thiopental Dosage Calculation function
export function calculateThiopentalDosageInduction(age, weight) {
  let min, max;
  if (age >= 65) {
    // For patients older than 60: 1-1.5 mg/kg
    min = 2 * weight;
    max = 3 * weight;
    return `${min}-${max}`;
  } else if (age <= 12) {
    // For patients younger than 2: 2.5-3.5 mg/kg
    min = 5 * weight;
    max = 6 * weight;
    return `${min}-${max}`;
  } else {
    // For patients between 2 and 60: 1.5-2.5 mg/kg
    min = 3 * weight;
    max = 5 * weight;
    return `${min}-${max}`;
  }
}