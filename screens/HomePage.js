import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Profile from '../assets/profile.jpg';

const Homepage = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    // Set profile icon in the header right
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image 
            source={Profile} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.profileImageContainer}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Image 
          source={Profile} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome to Our App</Text>
      <Text style={styles.title}>What would you like to do today?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PreventiveHealthCheckUps')}>
          <Text style={styles.buttonText}>Preventive Health Check-Ups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MedicineReminders')}>
          <Text style={styles.buttonText}>Medicine Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HealthRecord')}>
          <Text style={styles.buttonText}>Health Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AllVaccinations')}>
          <Text style={styles.buttonText}>Vaccinations</Text>
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
    backgroundColor: "#E9C3BD"
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    margin: '2.5%',
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  profileImageContainer: {
    position: 'absolute',
    top: 30,
    right: 30,
    width: 30,
    height: 30,
  },
});

export default Homepage;
