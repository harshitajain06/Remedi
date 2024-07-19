import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
const backImage = require("../assets/logo.png");

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');

  const onHandleSignup = async () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert("Signup error", err.message));
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
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter gender"
              autoCapitalize="none"
              value={gender}
              onChangeText={(text) => setGender(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter date of birth (YYYY-MM-DD)"
              autoCapitalize="none"
              value={dob}
              onChangeText={(text) => setDob(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              autoCapitalize="none"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.loginTextContainer}>
              <Text style={styles.loginText}>Don't have an account? </Text>
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
