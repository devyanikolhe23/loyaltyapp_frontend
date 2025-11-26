import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

const AddVehicleForm = ({ onSubmit }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vin, setVin] = useState('');

  const handleAdd = () => {
    // Validate required fields
    if (!make || !model) {
      Alert.alert('Error', 'Please enter at least Make and Model');
      return;
    }

    // Validate VIN length if provided
    if (vin && vin.length !== 17) {
      Alert.alert('Error', 'VIN must be 17 characters long');
      return;
    }

    const vehicleData = {
      make: make,
      model: model,
      year: year ? parseInt(year) : null,
      vehicle_number: vehicleNumber || null,
      vin: vin || null,
    };

    onSubmit(vehicleData);

    // Clear fields
    setMake('');
    setModel('');
    setYear('');
    setVehicleNumber('');
    setVin('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Make *"
        placeholderTextColor="#888"
        style={styles.input}
        value={make}
        onChangeText={setMake}
      />
      <TextInput
        placeholder="Model *"
        placeholderTextColor="#888"
        style={styles.input}
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        placeholder="Year"
        placeholderTextColor="#888"
        style={styles.input}
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Vehicle Number"
        placeholderTextColor="#888"
        style={styles.input}
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
      />
      <TextInput
        placeholder="VIN (17 chars)"
        placeholderTextColor="#888"
        style={styles.input}
        value={vin}
        onChangeText={setVin}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#000', // ensure typed text is visible
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default AddVehicleForm;
