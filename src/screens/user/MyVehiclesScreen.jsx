  import React, { useEffect, useState } from 'react';
  import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import VehiclesMenu from "../../components/MyVehicles/VehiclesMenu";
  import Header from "../../components/Header";



  const BASE_URL = 'http://192.168.1.8:8000'; // backend URL

  const MyVehiclesScreen = ({ navigation }) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
      try {
        const token = await AsyncStorage.getItem('access'); // JWT auth token
        const response = await fetch(`${BASE_URL}/api/vehicles/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log('Failed to fetch vehicles', response.status);
          return;
        }

        const data = await response.json();
        console.log('Vehicles API response:', data);

        setVehicles(data.results ? data.results : data);
      } catch (error) {
        console.log('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>My Vehicles</Text>

        {vehicles.length === 0 ? (
          <Text style={styles.noVehiclesText}>No vehicles added yet.</Text>
        ) : (
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.vehicleItem}>
                <Image
                  source={
                    item.image_url
                      ? { uri: item.image_url }
                      : require('../../assets/images/carbanner.jpg')
                  }
                  style={styles.vehicleImage}
                />
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleName}>{item.make} {item.model}</Text>
                  <Text style={styles.vehicleBrand}>
                    {item.vehicle_number ? item.vehicle_number : 'N/A'}, {item.year}
                  </Text>
                </View>

                {/* Replace this with the VehiclesMenu component */}
                <VehiclesMenu vehicle={item} navigation={navigation} />
              </View>
            )}
          />


        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddVehiclesScreen', {
              onVehicleAdded: fetchVehicles, // pass refresh function
            })
          }
        >
          <Text style={styles.addButtonText}>+ Add New Vehicle</Text>
        </TouchableOpacity>

      </View>
    );
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff7f7ff', paddingTop: 40, paddingHorizontal: 20 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
    noVehiclesText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 50 },
    vehicleItem: { flexDirection: 'row', backgroundColor: '#f5f5f5', borderRadius: 10, marginBottom: 10, padding: 10, alignItems: 'center' },
    vehicleImage: { width: 50, height: 50, marginRight: 15, borderRadius: 5 },
    vehicleInfo: { flex: 1 },
    vehicleName: { fontSize: 18, fontWeight: '600', color: '#333' },
    vehicleBrand: { fontSize: 14, color: '#666' },
    menuButton: { padding: 10, marginLeft: 10 },
    menuText: { fontSize: 20, color: '#333' },
    addButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 30, marginTop: 20, alignItems: 'center' },
    addButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  });

  export default MyVehiclesScreen;
