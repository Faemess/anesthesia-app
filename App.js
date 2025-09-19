import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';

// Import localization
import './src/localization/i18n';

// Import context providers
import { LocaleProvider, useLocale } from './src/context/LocaleContext';
import { PatientProvider } from './src/context/PatientContext';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutScreen from './src/screens/AboutScreen';
import PatientFormScreen from './src/screens/PatientFormScreen';
import WorkflowScreen from './src/screens/WorkflowScreen';
import PreMedicationScreen from './src/screens/PreMedicationScreen';
import InductionScreen from './src/screens/InductionScreen';
import MaintenanceScreen from './src/screens/MaintenanceScreen';
import RecoveryScreen from './src/screens/RecoveryScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';

const Stack = createStackNavigator();

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#2563eb" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

const AppNavigator = () => {
  const { ready } = useTranslation();
  const { isReady } = useLocale();

  if (!ready || !isReady) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Anesthesia Management' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen}
        />
        <Stack.Screen 
          name="PatientForm" 
          component={PatientFormScreen}
        />
        <Stack.Screen 
          name="Workflow" 
          component={WorkflowScreen}
        />
        <Stack.Screen 
          name="PreMedication" 
          component={PreMedicationScreen}
          options={{
            headerStyle: { backgroundColor: "#6a46beff" }, // header background
            headerTintColor: "#fff",                     // text + icons color
            headerTitleStyle: { fontWeight: "bold" },    // optional text styling
          }}
        />
        <Stack.Screen 
          name="Induction" 
          component={InductionScreen}
          options={{
            headerStyle: { backgroundColor: "#06b6d4" }, // header background
            headerTintColor: "#fff",                     // text + icons color
            headerTitleStyle: { fontWeight: "bold" },    // optional text styling
          }}
        />
        <Stack.Screen 
          name="Maintenance" 
          component={MaintenanceScreen}
          options={{
            headerStyle: { backgroundColor: "#10b981" }, // header background
            headerTintColor: "#fff",                     // text + icons color
            headerTitleStyle: { fontWeight: "bold" },    // optional text styling
          }}
        />
        <Stack.Screen 
          name="Recovery" 
          component={RecoveryScreen}
          options={{
            headerStyle: { backgroundColor: "#f59e0b" }, // header background
            headerTintColor: "#fff",                     // text + icons color
            headerTitleStyle: { fontWeight: "bold" },    // optional text styling
          }}
        />
        <Stack.Screen 
          name="Emergency" 
          component={EmergencyScreen}
          options={{
            title: "Premedication",
            headerStyle: { backgroundColor: "#ef4444" }, // header background
            headerTintColor: "#fff",                     // text + icons color
            headerTitleStyle: { fontWeight: "bold" },    // optional text styling
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <LocaleProvider>
      <PatientProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <AppNavigator />
        </View>
      </PatientProvider>
    </LocaleProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2563eb',
  },
});

