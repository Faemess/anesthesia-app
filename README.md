# Anesthesia Management App

A comprehensive React Native application built with Expo for managing anesthesia procedures in patients. The app provides locale-based text rendering (English/Farsi) and includes all essential anesthesia workflow sections with hardcoded drug dosage calculations.

## Features

### 🌐 Internationalization
- **Dual Language Support**: English and Farsi (Persian) with RTL support
- **Dynamic Language Switching**: Change language from settings
- **Persistent Language Preference**: Language choice saved locally

### 📱 Main Navigation
- **Start**: Begin anesthesia workflow with patient data input
- **Settings**: Configure language preferences
- **About**: Application information

### 👤 Patient Data Management
- **Age Input**: Patient age in years
- **Sex Selection**: Male/Female options
- **Weight Input**: Patient weight in kilograms
- **Hematocrit/Hemoglobin**: Blood parameters for calculations
- **Form Validation**: Comprehensive input validation with error messages

### 🏥 Anesthesia Workflow Sections

#### 1. Premedication 💊
- **Drug Calculations**: Automatic dosage calculations based on patient weight and age
  - Midazolam (anxiolysis and sedation)
  - Atropine (antisialagogue, prevent bradycardia)
  - Ondansetron (antiemetic)
- **Serum Therapy**: Maintenance rate and drops per minute calculations
- **Serum Type Selection**: Normal Saline, Ringer's Lactate, 5% Dextrose
- **Recommendations**: Intelligent serum type recommendations

#### 2. Induction 🏥
- **Anesthesia Options**: TIVA, Spinal, General Anesthesia
- **Drug Dosages**: Weight-based calculations for induction agents
- **Equipment Requirements**: Endotracheal tube sizes and other equipment
- **Route Specifications**: IV, IM, Inhalational routes

#### 3. Maintenance 🔄
- **Anesthesia Types**: Spinal, General Anesthesia, TIVA options
- **Drug Management**: Maintenance drug calculations
- **Blood Loss Monitoring**: Input field for blood loss volume
- **Transfusion Indicators**: Automatic recommendations based on hematocrit and blood loss

#### 4. Recovery 🏃‍♂️
- **Recovery Checklist**: Comprehensive post-operative monitoring
  - Airway Management
  - Cardiovascular Assessment
  - Neurological Evaluation
  - Temperature & Fluid Balance
- **Reversal Agents**: Calculated dosages for:
  - Neostigmine (neuromuscular blockade reversal)
  - Sugammadex (rocuronium/vecuronium reversal)
  - Flumazenil (benzodiazepine reversal)
  - Naloxone (opioid reversal)
- **Discharge Criteria**: Aldrete Score guidelines
- **Post-operative Instructions**: Comprehensive care guidelines

#### 5. Emergency 🚨
- **Emergency Protocols**: Detailed treatment protocols for:
  - **Laryngospasm** (HIGH severity)
  - **Cardiac Arrest** (CRITICAL severity)
  - **Anaphylaxis** (CRITICAL severity)
  - **Malignant Hyperthermia** (CRITICAL severity)
  - **Bronchospasm** (MODERATE severity)
  - **Hypotension** (MODERATE severity)
- **Treatment Steps**: Step-by-step emergency procedures
- **Drug Calculations**: Weight-based emergency medication dosages
- **Severity Indicators**: Color-coded severity levels

## Technical Implementation

### 🛠 Technology Stack
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain
- **React Navigation**: Navigation library
- **React i18next**: Internationalization framework
- **AsyncStorage**: Local data persistence
- **Context API**: State management

### 📁 Project Structure
```
anesthesia-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Application screens
│   │   ├── HomeScreen.js
│   │   ├── SettingsScreen.js
│   │   ├── AboutScreen.js
│   │   ├── PatientFormScreen.js
│   │   ├── WorkflowScreen.js
│   │   ├── PreMedicationScreen.js
│   │   ├── InductionScreen.js
│   │   ├── MaintenanceScreen.js
│   │   ├── RecoveryScreen.js
│   │   └── EmergencyScreen.js
│   ├── context/            # React Context providers
│   │   ├── LocaleContext.js
│   │   └── PatientContext.js
│   ├── localization/       # i18n configuration
│   │   ├── i18n.js
│   │   ├── en.json
│   │   └── fa.json
│   └── utils/              # Utility functions
│       ├── calculations.js
│       └── emergencyProtocols.js
├── App.js                  # Main application component
└── package.json           # Dependencies and scripts
```

### 🧮 Drug Calculation Logic
All drug dosages are calculated using hardcoded medical formulas based on:
- **Patient Weight**: Primary factor for most calculations
- **Patient Age**: Age-specific adjustments
- **Clinical Guidelines**: Standard medical protocols
- **Safety Margins**: Conservative dosing approaches

### 🎨 UI/UX Features
- **Responsive Design**: Works on various screen sizes
- **Color-Coded Sections**: Visual distinction between workflow stages
- **Intuitive Navigation**: Easy-to-use interface
- **Form Validation**: Real-time input validation
- **Modal Dialogs**: Detailed information display
- **RTL Support**: Right-to-left text for Farsi language

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation Steps
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd anesthesia-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Scan QR code with Expo Go app (mobile)
   - Press 'w' for web version
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## Usage Instructions

### Getting Started
1. **Launch the app** and select your preferred language in Settings
2. **Tap "Start"** to begin the anesthesia workflow
3. **Enter patient information**: age, sex, weight, and blood parameters
4. **Navigate through workflow sections** as needed during the procedure

### Workflow Navigation
- Each section provides specific calculations and recommendations
- Use the back button to return to the main workflow menu
- Patient data persists throughout the session
- Emergency protocols are always accessible

### Language Switching
1. Go to **Settings** from the main menu
2. Select your preferred language (English/فارسی)
3. The app will immediately switch to the selected language
4. Language preference is saved for future sessions

## Medical Disclaimer

⚠️ **IMPORTANT MEDICAL DISCLAIMER**

This application is designed as an educational and reference tool for medical professionals. It should NOT be used as the sole basis for medical decisions. Always:

- Follow your institution's protocols and guidelines
- Consult with senior medical staff when in doubt
- Verify all calculations independently
- Call for help immediately in emergency situations
- Use clinical judgment in all situations

The developers assume no responsibility for medical decisions made using this application.

## Development Notes

### Customization
- Drug calculations can be modified in `src/utils/calculations.js`
- Emergency protocols can be updated in `src/utils/emergencyProtocols.js`
- Language translations are in `src/localization/en.json` and `src/localization/fa.json`

### Future Enhancements
- Additional language support
- Offline functionality
- Data export capabilities
- Integration with hospital systems
- Advanced drug interaction checking

## License

This project is developed for educational and professional medical use. Please ensure compliance with local medical software regulations before clinical use.

## Support

For technical support or medical content questions, please contact the development team or your institution's medical informatics department.

---

**Version**: 1.0.0  
**Last Updated**: September 2025  
**Compatibility**: iOS, Android, Web (via Expo)

