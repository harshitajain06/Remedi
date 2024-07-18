import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './screens/SplashScreen';
import HomePage from './screens/HomePage';
import HealthCheckUpReminders from './screens/HealthCheckUpReminders';
import VaccinationReminders from './screens/VaccinationReminders';
import AllVaccinations from './screens/AllVaccinations';
import HealthRecord from './screens/HealthRecord';
import MedicalReports from './screens/MedicalReports';
import AddMedicalReport from './screens/AddMedicalReport';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="HealthCheckUpReminders" component={HealthCheckUpReminders} options={{ headerShown: false }} />
      <Stack.Screen name="VaccinationReminders" component={VaccinationReminders} options={{ headerShown: false }} />
      <Stack.Screen name="AllVaccinations" component={AllVaccinations} />
      <Stack.Screen name="HealthRecord" component={HealthRecord} options={{ headerShown: false }} />
      <Stack.Screen name="MedicalReports" component={MedicalReports} options={{ headerShown: false }} />
      <Stack.Screen name="AddMedicalReport" component={AddMedicalReport} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
