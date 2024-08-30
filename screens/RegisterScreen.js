import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';  // Import Firestore functions

const backImage = require("../assets/logo.png");

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateFields = () => {
    if (!name || !gender || !dob || !phone || !email || !password) {
      Alert.alert("Validation Error", "All fields must be filled.");
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert("Validation Error", "Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const onHandleSignup = async () => {
    if (validateFields()) {
      try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store health record in Firestore
        await setDoc(doc(database, 'healthRecords', user.uid), {
          name: name,
          gender: gender,
          dob: dob.toISOString().split('T')[0],
          phone: phone,
          email: email,
          bloodGroup: '',  // You can add more fields as needed
          height: '',
          weight: '',
          familyHistory: '',
          pastHistory: '',
        });

        // Navigate to the Login screen after successful signup and data storage
        Alert.alert("Signup Success", "You have signed up successfully.");
        navigation.navigate("LoginScreen");

      } catch (error) {
        Alert.alert("Signup Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SafeAreaView style={styles.form}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              autoCapitalize="words"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={gender}
                style={styles.picker}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Select gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Select date of birth"
                value={dob.toISOString().split('T')[0]}
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDob(selectedDate);
                  }
                }}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.loginTextContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9C3BD",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: "center",
    paddingBottom: 24,
    color: "#9A2D2D"
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  pickerContainer: {
    backgroundColor: "#F6F7FB",
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    height: 58,
    padding: 12,
  },
  whiteSheet: {
    flex: 1,
    position: "absolute",
    top: 130,
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#9A2D2D',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginTextContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginText: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 14,
  },
  loginLink: {
    color: '#9A2D2D',
    fontWeight: '600',
    fontSize: 14,
  },
  backImage: {
    width: "100%",
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
  },
});
