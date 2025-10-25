import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BookingDetailsScreen = ({ route, navigation }) => {
  const { booking } = route.params || {}; // booking details passed from previous screen

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Booking Details</Text>
      </View>

      {/* Booking Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{booking?.serviceName || "Car Wash Deluxe"}</Text>
        <Text style={styles.subText}>Booking ID: {booking?.id || "#123456"}</Text>
        <Text style={styles.subText}>Date: {booking?.date || "30 Sept, 2025"}</Text>
        <Text style={styles.subText}>Time: {booking?.time || "11:30 AM"}</Text>
        <Text style={styles.subText}>Status: {booking?.status || "Pending"}</Text>
      </View>

      {/* Customer Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <Text style={styles.subText}>Name: {booking?.customerName || "John Doe"}</Text>
        <Text style={styles.subText}>Phone: {booking?.phone || "+91 9876543210"}</Text>
        <Text style={styles.subText}>Car: {booking?.carModel || "Honda City 2022"}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.btnText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.btnText}>Cancel</Text>
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
