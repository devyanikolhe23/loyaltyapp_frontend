import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const vehiclesData = [
  { id: '1', name: 'Civic', brand: 'Honda', year: '2021', image: require('./assets/civic.png') },
  { id: '2', name: 'Camry', brand: 'Toyota', year: '2018', image: require('./assets/camry.png') },
];

const VehicleListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Vehicles</Text>
      <FlatList
        data={vehiclesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.vehicleItem}>
            <Image source={item.image} style={styles.vehicleImage} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{item.name}</Text>
              <Text style={styles.vehicleBrand}>{item.brand}, {item.year}</Text>
            </View>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuText}>...</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark color for text
    marginBottom: 20,
  },
  vehicleItem: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5', // Light grey background for items
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  vehicleBrand: {
    fontSize: 14,
    color: '#666',
  },
  menuButton: {
    padding: 10,
    marginLeft: 10,
  },
  menuText: {
    fontSize: 20,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007BFF', // Blue background for the button
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VehicleListScreen;
