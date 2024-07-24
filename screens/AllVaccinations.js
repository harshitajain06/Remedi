import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const AllVaccinations = () => {
  const [vaccinations, setVaccinations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVaccinations = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'vaccinations'));
        const vaccinationData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVaccinations(vaccinationData);
      } catch (error) {
        console.error('Error fetching vaccinations:', error);
      }
    };
    fetchVaccinations();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.vaccinationItem}>
      <Text style={styles.itemTitle}>Next Vaccination Date: {item.nextVaccinationDate}</Text>
      <Text style={styles.itemInfo}>Vaccination Info: {item.vaccinationInfo}</Text>
    </View>
  );

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
        <Text style={styles.title}>All Vaccinations</Text>
        <TouchableOpacity 
          style={styles.addButtonContainer}
          onPress={() => navigation.navigate('VaccinationReminders')}
        >
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={vaccinations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  vaccinationItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemInfo: {
    marginBottom: 5,
  },
});

export default AllVaccinations;
