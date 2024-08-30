import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../config/firebase';

const MedicineReminders = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const medicinesCollection = collection(database, 'medicines');
        const medicineSnapshot = await getDocs(medicinesCollection);
        const medicineList = medicineSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMedicines(medicineList);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const renderMedicine = ({ item }) => (
    <View style={styles.medicineContainer}>
      <Text style={styles.medicineName}>{item.medicineName}</Text>
      <Text style={styles.medicineDosage}>Dosage: {item.dosage}</Text>
      <Text style={styles.medicineTimesPerDay}>Times per day: {item.timesPerDay}</Text>
      <Text style={styles.medicineTillDate}>Till Date: {item.tillDate}</Text>
      <Text style={styles.medicineDoseTimes}>1st Dose Time: {item.doseTimes[0]}</Text>
      <Text style={styles.medicineDoseTimes}>2nd Dose Time: {item.doseTimes[1]}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9A2D2D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.headerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Text style={styles.headerText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Medicine Reminders</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddMedicine')} style={styles.addButtonContainer}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={medicines}
        renderItem={renderMedicine}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E9C3BD', // Light background color
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9A2D2D',
    marginTop: 30
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Darker text for contrast
  },
  addButtonContainer: {
    backgroundColor: '#9A2D2D',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    fontSize: 24,
    color: '#FFF',
  },
  listContainer: {
    flexGrow: 1,
  },
  medicineContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // Shadow for Android
  },
  medicineName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  medicineDosage: {
    fontSize: 16,
    color: '#9A2D2D',
    marginBottom: 5,
  },
  medicineTimesPerDay: {
    fontSize: 16,
    color: '#9A2D2D',
    marginBottom: 5,
  },
  medicineTillDate: {
    fontSize: 16,
    color: '#9A2D2D',
    marginBottom: 5,
  },
  medicineDoseTimes: {
    fontSize: 16,
    color: '#555',
  },
});

export default MedicineReminders;
