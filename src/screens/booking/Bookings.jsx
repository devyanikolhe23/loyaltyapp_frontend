

import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyBookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("access");
      if (!token) return;

      const servicesRes = await axios.get("http://192.168.1.12:8000/services/");
      const bookingsRes = await axios.get("http://192.168.1.12:8000/bookings/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const servicesMap = {};
      servicesRes.data.forEach(s => (servicesMap[s.id] = s.title));

      const formattedBookings = bookingsRes.data.map(b => ({
        ...b,
        serviceName: servicesMap[b.service] || "Unknown Service",
      }));

      setBookings(formattedBookings);
    } catch (error) {
      console.log("Error loading bookings:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Re-fetch data every time screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending": return { color: "#e67e22" };
      case "confirmed": return { color: "#27ae60" };
      case "completed": return { color: "#2980b9" };
      default: return { color: "#555" };
    }
  };

  const renderBooking = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("BookingDetails", { booking: item })}
    >
      <View style={styles.row}>
        <Ionicons name="car-outline" size={24} color="#3498db" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{item.serviceName}</Text>
          <Text style={styles.subText}>{item.appointment_date} • {item.appointment_time}</Text>
          <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#555" />
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Bookings</Text>
      </View>

      {bookings.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40, fontSize: 16, color: "#555" }}>
          No bookings found.
        </Text>
      ) : (
        <FlatList data={bookings} keyExtractor={item => item.id.toString()} renderItem={renderBooking} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 16 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 22, fontWeight: "700", marginLeft: 12 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "600", color: "#2c3e50" },
  subText: { fontSize: 13, color: "#555" },
  status: { fontSize: 13, fontWeight: "600", marginTop: 4 }
});

export default MyBookingsScreen;