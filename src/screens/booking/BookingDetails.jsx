import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingDetailsScreen = ({ route, navigation }) => {
  const { booking } = route.params || {};
  const isCancelled = booking?.status === "cancelled"; // ✅ Detect cancelled state

  const handleCancelBooking = async () => {
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

              await axios.post(
                `http://192.168.1.15:8000/bookings/${booking.id}/cancel/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
              );

              Alert.alert("Cancelled", "Your booking has been cancelled.", [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Bookings", {
                      screen: "MyBookingsScreen",
                      params: { refresh: true },
                    });
                  },
                },
              ]);
            } catch (error) {
              console.log("Cancel Error:", error.response?.data || error);
              Alert.alert("Error", "Failed to cancel booking");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Booking Summary */}
        <View style={styles.card}>
          <Text style={styles.title}>
            {booking?.service_title || "Service"}
          </Text>

          <Text style={styles.subText}>Booking ID: {booking?.id}</Text>
          <Text style={styles.subText}>Date: {booking?.appointment_date}</Text>
          <Text style={styles.subText}>Time: {booking?.appointment_time}</Text>

          <Text style={[styles.subText, { fontWeight: "600" }]}>
            Status:{" "}
            <Text
              style={[
                styles.status,
                isCancelled && { color: "#e74c3c", fontWeight: "bold" },
              ]}
            >
              {booking?.status}
            </Text>
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
            style={[
              styles.primaryBtn,
              isCancelled && styles.disabledBtn, // ✅ disable when cancelled
            ]}
            disabled={isCancelled}
            onPress={() =>
              navigation.navigate("Services", {
                screen: "BookingServiceScreen",
                params: { isEdit: true, booking },
              })
            }
          >
            <Text style={styles.btnText}>
              {isCancelled ? "Reschedule (Disabled)" : "Reschedule"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryBtn,
              isCancelled && styles.disabledBtn, // ✅ disable when cancelled
            ]}
            disabled={isCancelled}
            onPress={handleCancelBooking}
          >
            <Text style={styles.btnText}>
              {isCancelled ? "Cancelled" : "Cancel Booking"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#000" },

  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },

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

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
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
  disabledBtn: {
    backgroundColor: "#ccc", // ✅ greyed-out
  },
  btnText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});

export default BookingDetailsScreen;
