// HealthCheckUpReminders.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HealthCheckUpReminders = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Check-Up Reminders</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => navigation.navigate('VaccinationReminders')}
        >
          <Text style={styles.buttonText}>Vaccination Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => navigation.navigate('DentalCheckups')}
        >
          <Text style={styles.buttonText}>Dental Check-ups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => navigation.navigate('PreventiveHealthCheckups')}
        >
          <Text style={styles.buttonText}>Preventive Health Check-ups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => navigation.navigate('LabDiagnostics')}
        >
          <Text style={styles.buttonText}>Lab Diagnostics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => navigation.navigate('AdditionalReminders')}
        >
          <Text style={styles.buttonText}>Additional Reminders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E9C3BD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    margin: '2.5%',
    height: 120,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default HealthCheckUpReminders;
