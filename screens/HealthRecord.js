import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { database, auth } from '../config/firebase'; // Ensure you have the auth and Firestore imports

const HealthRecord = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [pastHistory, setPastHistory] = useState('');

  useEffect(() => {
    // Fetch user data from Firestore
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const healthRecordRef = doc(database, 'healthRecords', user.uid);
          const docSnapshot = await getDoc(healthRecordRef);

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setName(userData.name || '');
            setGender(userData.gender || '');
            setAge(userData.age || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        await addDoc(collection(database, 'healthRecords'), {
          uid: user.uid,
          name,
          age,
          gender,
          bloodGroup,
          height,
          weight,
          familyHistory,
          pastHistory,
          timestamp: serverTimestamp(),
        });
        console.log('Health record saved successfully.');
        // Clear the form after saving
        setBloodGroup('');
        setHeight('');
        setWeight('');
        setFamilyHistory('');
        setPastHistory('');
      }
    } catch (error) {
      console.error('Error saving health record:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.headerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Text style={styles.headerText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Health Record</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter gender"
          value={gender}
          onChangeText={setGender}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Group:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter blood group"
          value={bloodGroup}
          onChangeText={setBloodGroup}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter height"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Family History:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter family history"
          value={familyHistory}
          onChangeText={setFamilyHistory}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Past History:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter past history"
          value={pastHistory}
          onChangeText={setPastHistory}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MedicalReports")}>
        <Text style={styles.buttonText}>Open Medical Reports</Text>
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
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
  },
  input: {
    width: '70%',
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

export default HealthRecord;
