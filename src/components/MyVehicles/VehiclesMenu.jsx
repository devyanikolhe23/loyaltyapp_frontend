import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.8:8000'; // your backend URL

const VehiclesMenu = ({ vehicle, navigation, onDelete }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const handleOptionPress = (option) => {
        setMenuVisible(false);

        switch (option) {
            case 'view':
                navigation.navigate('BookingStack', {
                    screen: 'MyBookingsScreen',
                    params: { vehicleNumber: vehicle.vehicle_number },
                });
                break;

            case 'book':
                navigation.navigate("ServiceStack", {
                    screen: "BookingServiceScreen",
                    params: {
                        defaultVehicle: {
                            make: vehicle.make,
                            model: vehicle.model,
                            year: vehicle.year,
                            vehicleNumber: vehicle.vehicle_number,
                        },
                    },
                });
                break;

            case 'delete':
                Alert.alert(
                    "Delete Vehicle",
                    "Are you sure you want to delete this vehicle?",
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Delete",
                            style: "destructive",
                            onPress: async () => {
                                try {
                                    const token = await AsyncStorage.getItem("access");
                                    if (!token) {
                                        Alert.alert("Error", "You are not logged in");
                                        return;
                                    }

                                    const res = await axios.delete(`${BASE_URL}/api/vehicles/${vehicle.id}/`, {
                                        headers: { Authorization: `Bearer ${token}` }
                                    });

                                    Alert.alert("Success", "Vehicle deleted successfully");

                                    // Optional: notify parent to remove from list
                                    if (onDelete) onDelete(vehicle.id);

                                } catch (err) {
                                    console.log("Delete error:", err.response?.data || err.message);
                                    Alert.alert("Error", "Failed to delete vehicle");
                                }
                            }
                        },
                    ]
                );
                break;
        }
    };

    return (
        <View>
            <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
                <Text style={styles.menuText}>...</Text>
            </TouchableOpacity>

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.dropdown}>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOptionPress('view')}>
                                <Text>View Bookings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOptionPress('book')}>
                                <Text>Book a Service</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOptionPress('delete')}>
                                <Text style={{ color: 'red' }}>Delete My Vehicle</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    menuButton: { padding: 10, marginLeft: 10 },
    menuText: { fontSize: 20, color: '#333' },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        minWidth: 180,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
});

export default VehiclesMenu;
