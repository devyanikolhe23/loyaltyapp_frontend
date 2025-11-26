// screens/vehicles/AddVehicleScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddVehicleForm from '../../components/MyVehicles/AddVehicleForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.15:8000';

const AddVehicleScreen = ({ navigation, route }) => {
  const { onVehicleAdded } = route.params || {};

  const handleSubmit = async (vehicleData) => {
    try {
      const token = await AsyncStorage.getItem('access');
      const response = await fetch(`${BASE_URL}/api/vehicles/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        alert('Failed to add vehicle');
        return;
      }

      alert('Vehicle added successfully!');

      if (onVehicleAdded) {
        onVehicleAdded(); // refresh vehicle list in MyVehiclesScreen
      }

      navigation.goBack(); // go back to vehicle list
    } catch (error) {
      console.log(error);
      alert('Error adding vehicle');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Vehicle</Text>
      <AddVehicleForm onSubmit={handleSubmit} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});

export default AddVehicleScreen;
