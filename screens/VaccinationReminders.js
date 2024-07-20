import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, database } from '../config/firebase';

const VaccinationReminders = ({navigation}) => {
  const [nextVaccinationDate, setNextVaccinationDate] = useState('');
  const [vaccinationInfo, setVaccinationInfo] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDayPress = (day) => {
    setNextVaccinationDate(day.dateString);
    setShowCalendar(false);
  };

  const handleSave = async () => {
    console.log('Next Vaccination Date:', nextVaccinationDate);
    console.log('Vaccination Info:', vaccinationInfo);
    try {
      await addDoc(collection(database, 'vaccinations'), {
        nextVaccinationDate,
        vaccinationInfo,
        timestamp: serverTimestamp(),
      });
      setNextVaccinationDate('');
      setVaccinationInfo('');
      console.log('Vaccination information saved successfully.');
    } catch (error) {
      console.error('Error saving vaccination information:', error);
    }
  };

  const handleShowAllVaccinations = () => {
    console.log('Showing all vaccinations');
    navigation.navigate("AllVaccinations")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Vaccination</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Next Vaccination:</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowCalendar(true)}>
          <Text>{nextVaccinationDate || 'Select Date'}</Text>
        </TouchableOpacity>
      </View>
      {showCalendar && (
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [nextVaccinationDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
        />
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vaccination Info:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter vaccination information"
          value={vaccinationInfo}
          onChangeText={setVaccinationInfo}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.showAllButton} onPress={handleShowAllVaccinations}>
        <Text style={styles.buttonText}>Show All Vaccinations</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9C3BD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 80,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9A2D2D',
    padding: 10,
    borderRadius: 5,
    margin: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  showAllButton: {
    backgroundColor: '#9A2D2D',
    padding: 10,
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default VaccinationReminders;
