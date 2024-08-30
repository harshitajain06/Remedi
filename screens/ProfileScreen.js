import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Profile from '../assets/profile.jpg';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={Profile} style={styles.profileImage} />
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} placeholder="John Doe" />
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} placeholder="john.doe@example.com" />
        <Text style={styles.label}>Phone:</Text>
        <TextInput style={styles.input} placeholder="(123) 456-7890" />
        <Text style={styles.label}>Date of Birth:</Text>
        <TextInput style={styles.input} placeholder="YYYY-MM-DD" />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Homepage')}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E9C3BD",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#9A2D2D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
