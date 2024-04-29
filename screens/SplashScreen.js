import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
const backImage = require("../assets/logo.png");

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading time or any other initialization process
    setTimeout(() => {
      // Navigate to the appropriate screen after splash screen
      navigation.navigate('LoginScreen'); // Change 'Home' to your desired screen
    }, 2000); // Change the timeout duration as needed
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={backImage} // Replace with your app logo
        style={styles.logo}
      />
      <Text style={{fontWeight: 'bold', color: '#9A2D2D', fontSize: 18}}>One Stop For All Medicinal Reminders</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9C3BD', // Set your desired background color
  },
  logo: {
    width: 400, // Adjust width and height as needed
    height: 500,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
