import React, { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState({
    age: null,
    sex: null,
    weight: null,
    hematocrit: null,
    hemoglobin: null,
  });

  const updatePatientData = (data) => {
    setPatientData(prevData => ({
      ...prevData,
      ...data,
    }));
  };

  const clearPatientData = () => {
    setPatientData({
      age: null,
      sex: null,
      weight: null,
      hematocrit: null,
      hemoglobin: null,
    });
  };

  const value = {
    patientData,
    updatePatientData,
    clearPatientData,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};

