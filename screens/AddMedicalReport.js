import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { storage, database } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddMedicine = ({ navigation }) => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [tillDate, setTillDate] = useState(new Date());
  const [showTillDatePicker, setShowTillDatePicker] = useState(false);
  const [timesPerDay, setTimesPerDay] = useState('');
  const [doseTimes, setDoseTimes] = useState([new Date(), new Date()]);
  const [showDoseTimePickers, setShowDoseTimePickers] = useState([false, false]);
  const [image, setImage] = useState(null);

  const handleSave = async () => {
    console.log('Saving medicine');
    try {
      let imageUrl = '';
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, `medicines/${Date.now()}-${medicineName}`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(database, 'medicines'), {
        medicineName,
        dosage,
        tillDate: tillDate.toISOString().split('T')[0],
        timesPerDay,
        doseTimes: doseTimes.map(d => d.toTimeString().split(' ')[0]),
        imageUrl,
        timestamp: serverTimestamp(),
      });

      console.log('Medicine saved successfully.');
      // Clear the form after saving
      setMedicineName('');
      setDosage('');
      setTillDate(new Date());
      setTimesPerDay('');
      setDoseTimes([new Date(), new Date()]);
      setImage(null);
      navigation.navigate('MedicineList');
    } catch (error) {
      console.error('Error saving medicine:', error);
      Alert.alert('Error', 'Failed to save the medicine. Please try again.');
    }
  };

  const onChangeTillDate = (event, selectedDate) => {
    const currentDate = selectedDate || tillDate;
    setShowTillDatePicker(Platform.OS === 'ios');
    setTillDate(currentDate);
  };

  const onChangeDoseTime = (index, event, selectedTime) => {
    const currentTime = selectedTime || doseTimes[index];
    const newDoseTimes = [...doseTimes];
    newDoseTimes[index] = currentTime;
    const newShowDoseTimePickers = [...showDoseTimePickers];
    newShowDoseTimePickers[index] = Platform.OS === 'ios';
    setDoseTimes(newDoseTimes);
    setShowDoseTimePickers(newShowDoseTimePickers);
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
      <Text style={styles.title}>Add Medicine</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name of Medicine:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter medicine name"
          value={medicineName}
          onChangeText={setMedicineName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dosage:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter dosage"
          value={dosage}
          onChangeText={setDosage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Till What Date:</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowTillDatePicker(true)}>
          <Text style={styles.dateText}>{tillDate.toDateString()}</Text>
        </TouchableOpacity>
        {showTillDatePicker && (
          <DateTimePicker
            value={tillDate}
            mode="date"
            display="default"
            onChange={onChangeTillDate}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Times Per Day:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of times per day"
          value={timesPerDay}
          onChangeText={setTimesPerDay}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>1st Dose Time:</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDoseTimePickers([true, showDoseTimePickers[1]])}>
          <Text style={styles.dateText}>{doseTimes[0].toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showDoseTimePickers[0] && (
          <DateTimePicker
            value={doseTimes[0]}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => onChangeDoseTime(0, event, selectedTime)}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>2nd Dose Time:</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDoseTimePickers([showDoseTimePickers[0], true])}>
          <Text style={styles.dateText}>{doseTimes[1].toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showDoseTimePickers[1] && (
          <DateTimePicker
            value={doseTimes[1]}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => onChangeDoseTime(1, event, selectedTime)}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Medicine Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Add Medicine</Text>
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
});

export default AddMedicine;
