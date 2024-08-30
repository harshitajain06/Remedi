import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { storage, database } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddMedicalReport = ({ navigation }) => {
  const [reportName, setReportName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [image, setImage] = useState(null);

  const handleSave = async () => {
    console.log('Saving medical report');
    try {
      let imageUrl = '';
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, `medicalReports/${Date.now()}-${reportName}`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(database, 'medicalReports'), {
        reportName,
        date: date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        additionalDetails,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      console.log('Medical report saved successfully.');
      // Clear the form after saving
      setReportName('');
      setDate(new Date());
      setAdditionalDetails('');
      setImage(null);
      navigation.navigate('MedicalReports');
    } catch (error) {
      console.error('Error saving medical report:', error);
      Alert.alert('Error', 'Failed to save the report. Please try again.');
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.headerText}>Home</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Add Medical Report</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Report Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter report name"
          value={reportName}
          onChangeText={setReportName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Additional Details:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter additional details"
          value={additionalDetails}
          onChangeText={setAdditionalDetails}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Report Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
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
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#9A2D2D',
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
  dateInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#9A2D2D',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
  },
  uploadButton: {
    backgroundColor: '#9A2D2D',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 15,
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
export default AddMedicalReport;