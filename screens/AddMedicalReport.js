import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database } from '../config/firebase';

const AddMedicalReport = ({ navigation }) => {
  const [reportDetails, setReportDetails] = useState('');

  const handleSave = async () => {
    console.log('Saving medical report');
    try {
      await addDoc(collection(database, 'medicalReports'), {
        reportDetails,
        timestamp: serverTimestamp(),
      });
      console.log('Medical report saved successfully.');
      // Clear the form after saving
      setReportDetails('');
      navigation.navigate('MedicalReports');
    } catch (error) {
      console.error('Error saving medical report:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.headerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Text style={styles.headerText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Add Medical Report</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Report Details:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter report details"
          value={reportDetails}
          onChangeText={setReportDetails}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#E9C3BD',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9A2D2D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
  button: {
    backgroundColor: '#9A2D2D',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddMedicalReport;
