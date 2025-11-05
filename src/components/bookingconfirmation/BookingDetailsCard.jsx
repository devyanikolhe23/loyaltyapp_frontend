import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DetailRow from "./DetailRow";

export default function BookingDetailsCard({ booking }) {
  if (!booking) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Booking Details</Text>
        <Text style={{ color: "red" }}>No booking data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Booking Details</Text>

      <DetailRow label="Service" value={booking?.service_title} />

      <DetailRow label="Date" value={booking.appointment_date} />

      <DetailRow label="Time" value={booking.appointment_time} />

      <DetailRow 
        label="Vehicle" 
        value={`${booking.vehicle_make} ${booking.vehicle_model} (${booking.vehicle_year})`} 
      />

      {/* If your API returns price, include it; otherwise remove */}
      {booking.price && <DetailRow label="Price" value={`₹${booking.price}`} />}

      {booking.status && <DetailRow label="Status" value={booking.status} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
});
