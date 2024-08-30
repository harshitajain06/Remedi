import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { storage, database } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Set the handler for notifications when the app is foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const AddMedicine = ({ navigation }) => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [tillDate, setTillDate] = useState(new Date());
  const [showTillDatePicker, setShowTillDatePicker] = useState(false);
  const [timesPerDay, setTimesPerDay] = useState('');
  const [doseTimes, setDoseTimes] = useState([]);
  const [showDoseTimePickers, setShowDoseTimePickers] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Notification permissions are required for this feature to work.');
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const times = parseInt(timesPerDay, 10);
    if (!isNaN(times) && times > 0) {
      const newDoseTimes = Array(times).fill(new Date());
      const newShowDoseTimePickers = Array(times).fill(false);
      setDoseTimes(newDoseTimes);
      setShowDoseTimePickers(newShowDoseTimePickers);
    } else {
      setDoseTimes([]);
      setShowDoseTimePickers([]);
    }
  }, [timesPerDay]);

  const handleSave = async () => {
    // Validation for all fields
    if (!medicineName || !dosage || !tillDate || !timesPerDay || !doseTimes.length || !image) {
      Alert.alert('Missing Fields', 'Please fill in all required fields and upload an image.');
      return;
    }

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

      doseTimes.forEach((doseTime, index) => {
        console.log(`Scheduling notification for ${doseTime} with message: Time for your ${medicineName} (${dosage}) dose ${index + 1}`);
        alert(`Scheduling notification for ${doseTime} with message: Time for your ${medicineName} (${dosage}) dose ${index + 1}`);
        scheduleNotification(doseTime, `Time for your ${medicineName} (${dosage}) dose ${index + 1}`);
      });

      console.log('Medicine saved successfully.');
      // Clear the form after saving
      setMedicineName('');
      setDosage('');
      setTillDate(new Date());
      setTimesPerDay('');
      setDoseTimes([]);
      setImage(null);
      navigation.navigate('MedicineReminders');
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

  const scheduleNotification = async (time, message) => {
    console.log(`Scheduling notification at ${time} with message: ${message}`);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Medicine Reminder',
        body: message,
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });
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
      {doseTimes.map((doseTime, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{`${index + 1} Dose Time:`}</Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => {
            const newShowDoseTimePickers = [...showDoseTimePickers];
            newShowDoseTimePickers[index] = true;
            setShowDoseTimePickers(newShowDoseTimePickers);
          }}>
            <Text style={styles.dateText}>{doseTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showDoseTimePickers[index] && (
            <DateTimePicker
              value={doseTimes[index]}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => onChangeDoseTime(index, event, selectedTime)}
            />
          )}
        </View>
      ))}
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
    marginTop: 30
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
