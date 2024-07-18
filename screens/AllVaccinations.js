import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../config/firebase';

const AllVaccinations = () => {
  const [vaccinations, setVaccinations] = useState([]);

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
      <Text style={styles.title}>All Vaccinations</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
