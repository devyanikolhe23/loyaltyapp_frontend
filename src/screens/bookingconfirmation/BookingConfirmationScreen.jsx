import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import BookingDetailsCard from "../../components/bookingconfirmation/BookingDetailsCard";
import MapCard from "../../components/bookingconfirmation/MapCard";
import ActionButtons from "../../components/bookingconfirmation/ActionButtons";
import DetailRow from "../../components/bookingconfirmation/DetailRow";

export default function BookingConfirmationScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Booking Confirmed</Text>

        <View style={styles.iconContainer}>
          <Icon name="checkmark-circle-outline" size={64} color="#007AFF" />
        </View>

        <Text style={styles.confirmText}>Your appointment is confirmed</Text>
        <Text style={styles.subText}>
          We’ve received your booking and it’s scheduled. You’ll get a reminder
          24 hours before.
        </Text>
        <DetailRow/>
        <MapCard />
        <BookingDetailsCard />
        <ActionButtons />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, paddingBottom: 100 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  iconContainer: { alignItems: "center", marginVertical: 10 },
  confirmText: { fontSize: 18, fontWeight: "600", textAlign: "center" },
  subText: { textAlign: "center", color: "#555", marginVertical: 10 },
});
