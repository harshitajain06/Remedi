import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const Homepage = ({ navigation }) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
      <Text style={styles.title}>Welcome to Our App</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HealthCheckUpReminders')}>
          <Text style={styles.buttonText}>Health Check-Up Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MedicineReminders')}>
          <Text style={styles.buttonText}>Medicine Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HealthRecord')}>
          <Text style={styles.buttonText}>Health Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MedicineEncyclopedia')}>
          <Text style={styles.buttonText}>Medicine Encyclopedia</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    textAlign:'center'
  },
});

export default Homepage;