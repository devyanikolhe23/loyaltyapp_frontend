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

  // ✅ Use service_title from API directly
  const servicesText = booking.service_title || "N/A";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Booking Details</Text>

      {/* Services */}
      <DetailRow label="Services" value={servicesText} />

      {/* Date & Time */}
      <DetailRow label="Date" value={booking.appointment_date || "N/A"} />
      <DetailRow label="Time" value={booking.appointment_time || "N/A"} />

      {/* Vehicle Info */}
      <DetailRow
        label="Vehicle"
        value={
          booking.vehicle_make && booking.vehicle_model && booking.vehicle_year
            ? `${booking.vehicle_make} ${booking.vehicle_model} (${booking.vehicle_year})`
            : "N/A"
        }
      />

      {/* Price */}
      {booking.total_price && (
        <DetailRow label="Total Price" value={`₹${booking.total_price}`} />
      )}

      {/* Status */}
      {booking.status && (
        <DetailRow
          label="Status"
          value={
            booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
});