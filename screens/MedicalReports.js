import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MedicalReports = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.headerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Text style={styles.headerText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Medical Reports</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddMedicalReport')} style={styles.addButtonContainer}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
      {/* Add your content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Added this line
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    alignItems: 'flex-end', // Added this line
  },
  addButton: {
    fontSize: 24,
    color: '#9A2D2D',
  },
});

export default MedicalReports;
