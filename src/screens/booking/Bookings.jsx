import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Header from "../../components/Header";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.15:8000";

const MyBookingsScreen = ({ navigation, route }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { vehicleNumber } = route.params || {};

  const fetchData = async () => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem("access");
    if (!token) {
      setBookings([]);
      return;
    }

    // Always fetch user bookings
    let url = `${BASE_URL}/api/bookings/?no_pagination=true`;

    // Add vehicle filter only if selected
    if (vehicleNumber) {
      url += `&vehicle_number=${vehicleNumber}`;
    }

    const bookingsRes = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const bookingsData = Array.isArray(bookingsRes.data)
      ? bookingsRes.data
      : bookingsRes.data.results || [];

    const formattedBookings = bookingsData.map((b) => ({
      ...b,
      serviceName: b.service_title || "Booked",
    }));

    setBookings(formattedBookings);
  } catch (error) {
    console.log(
      "❌ Error loading bookings:",
      error.response?.data || error.message
    );
    setBookings([]);
  } finally {
    setLoading(false);
  }
};



  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [vehicleNumber])
    //  [vehicleNumber])
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f39c12";
      // case "confirmed":
      case "in_progress":
        return "#27ae60";
      case "ready_for_pickup":
        return "#2980b9";
      case "completed":
        return "#2ecc71";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#f39c12";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Booked";
      // case "confirmed":
      case "in_progress":
        return "In Progress";
      case "ready_for_pickup":
        return "Ready for Pickup";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return "Booked";
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="My Bookings" showBack={false} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {bookings.length === 0 ? (
          <Text style={styles.emptyText}>No bookings found.</Text>
        ) : (
          bookings.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("BookingDetails", { booking: { ...item, service_title: item.serviceName } })
              }
            >
              <View style={styles.iconBox}>
                <Ionicons name="car-outline" size={28} color="#3498db" />
              </View>

              <View style={styles.details}>
                <Text style={styles.serviceTitle}>{item.serviceName}</Text>
                <Text style={styles.dateText}>
                  {item.appointment_date} • {item.appointment_time}
                </Text>

                <View style={styles.statusRow}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={getStatusColor(item.status)}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {getStatusLabel(item.status)}
                  </Text>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MyBookingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  scrollContainer: { padding: 16 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { textAlign: "center", marginTop: 40, fontSize: 16, color: "#555" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  details: { flex: 1 },
  serviceTitle: { fontSize: 16, fontWeight: "700", color: "#2c3e50", marginBottom: 4 },
  dateText: { fontSize: 13, color: "#555" },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  statusText: { fontSize: 13, fontWeight: "600", letterSpacing: 0.5 },
});
