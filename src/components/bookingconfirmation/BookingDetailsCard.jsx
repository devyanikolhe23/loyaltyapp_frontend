import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DetailRow from "./DetailRow";

export default function BookingDetailsCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Booking Details</Text>
      <DetailRow label="Service" value="Car Wash" />
      <DetailRow label="Date" value="Oct 20, 2025" />
      <DetailRow label="Time" value="10:30 AM" />
      <DetailRow label="Vehicle" value="Toyota Innova Crysta" />
      <DetailRow label="Price" value="$25" />
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
