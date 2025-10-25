import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const dummyBookings = [
  { id: "1", serviceName: "Full Car Wash", date: "30 Sept", time: "11:00 AM", status: "Pending" },
  { id: "2", serviceName: "Interior Cleaning", date: "02 Oct", time: "3:00 PM", status: "Confirmed" },
  { id: "3", serviceName: "Polishing", date: "05 Oct", time: "1:00 PM", status: "Completed" },
];

const MyBookingsScreen = ({ navigation }) => {
  const renderBooking = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("BookingDetails", { booking: item })}
    >
      <View style={styles.row}>
        <Ionicons name="car-outline" size={24} color="#3498db" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{item.serviceName}</Text>
          <Text style={styles.subText}>
            {item.date} • {item.time}
          </Text>
          <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#555" />
    </TouchableOpacity>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { color: "#e67e22" };
      case "Confirmed":
        return { color: "#27ae60" };
      case "Completed":
        return { color: "#2980b9" };
      default:
        return { color: "#555" };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      <FlatList
        data={dummyBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBooking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 16 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
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
  status: { fontSize: 13, fontWeight: "600", marginTop: 4 },
});

export default MyBookingsScreen;
