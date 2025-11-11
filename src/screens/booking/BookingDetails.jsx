import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BookingDetailsScreen = ({ route, navigation }) => {
  const { booking } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Booking Details</Text>
      </View>

      {/* Booking Summary */}
      <View style={styles.card}>
        <Text style={styles.title}>{booking?.serviceName || "Service"}</Text>

        <Text style={styles.subText}>Booking ID: {booking?.id}</Text>
        <Text style={styles.subText}>Date: {booking?.appointment_date}</Text>
        <Text style={styles.subText}>Time: {booking?.appointment_time}</Text>

        <Text style={[styles.subText, { fontWeight: "600" }]}>
          Status: <Text style={styles.status}>{booking?.status}</Text>
        </Text>
      </View>

      {/* Vehicle Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Vehicle Information</Text>
        <Text style={styles.subText}>Make: {booking?.vehicle_make}</Text>
        <Text style={styles.subText}>Model: {booking?.vehicle_model}</Text>
        <Text style={styles.subText}>Year: {booking?.vehicle_year}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() =>
            navigation.navigate("Services", {
              screen: "BookingServiceScreen",
              params: { isEdit: true, booking },
            })
          }
        >
          <Text style={styles.btnText}>Reschedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => {
            Alert.alert(
              "Cancel Booking",
              "Are you sure you want to cancel this booking?",
              [
                { text: "No" },
                {
                  text: "Yes",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      const token = await AsyncStorage.getItem("access");

                      await axios.delete(
                        `http://192.168.1.15:8000/bookings/${booking.id}/`,
                        { headers: { Authorization: `Bearer ${token}` } }
                      );

                      Alert.alert(
                        "Cancelled",
                        "Your booking has been removed.",
                        [
                          {
                            text: "OK",
                            onPress: () => {
                              navigation.navigate("Bookings", {
                                screen: "MyBookings",
                                params: { refresh: true },
                              });
                            }
                          }
                        ]
                      );
                    } catch (error) {
                      console.log("Delete Error:", error.response?.data || error);
                      Alert.alert("Error", "Failed to cancel booking");
                    }
                  }
                }
              ]
            );
          }}
        >
          <Text style={styles.btnText}>Cancel Booking</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 20, fontWeight: "700", marginLeft: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 6, color: "#2c3e50" },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#34495e" },
  subText: { fontSize: 14, color: "#555", marginBottom: 4 },
  status: { textTransform: "capitalize" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 8,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  btnText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});

export default BookingDetailsScreen;
