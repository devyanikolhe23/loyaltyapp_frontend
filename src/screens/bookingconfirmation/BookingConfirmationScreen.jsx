
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BookingDetailsCard from "../../components/bookingconfirmation/BookingDetailsCard";
import ActionButtons from "../../components/bookingconfirmation/ActionButtons";

export default function BookingConfirmationScreen({ route }) {
  const booking = route?.params?.booking;

  // ✅ Extract all possible params safely
  const selectedServices = route?.params?.selectedServices || booking?.services || [];
  const totalPrice = route?.params?.totalPrice || booking?.total_price || 0;
  const originalPrice = route?.params?.originalPrice || booking?.total_price || 0;
  const couponApplied = route?.params?.couponApplied || null;
  const discount = route?.params?.discount || 0;
  const offerTitle = route?.params?.offerTitle || "";

  // ✅ Debug Block (safe + detailed)
  useEffect(() => {
    console.log("🔥 BOOKING DEBUG START 🔥");
    console.log("booking object:", JSON.stringify(booking, null, 2));
    console.log("services field:", booking?.services);
    console.log("services type:", typeof booking?.services);
    console.log("is array?", Array.isArray(booking?.services));
    console.log("service_title exists?", !!booking?.service_title);
    console.log("selectedServices:", selectedServices);
    console.log("total_price:", booking?.total_price);
    console.log("discount:", discount);
    console.log("offerTitle:", offerTitle);
    console.log("couponApplied:", couponApplied);
    console.log("🔥 BOOKING DEBUG END 🔥");
  }, [booking]);

  // ...rest of your screen JSX
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

        {/* ✅ Final merged BookingDetailsCard props */}
        <BookingDetailsCard
          booking={booking}
          selectedServices={selectedServices}
          totalPrice={totalPrice}
          originalPrice={originalPrice}
          discount={discount}
          offerTitle={offerTitle}
          couponApplied={couponApplied}
        />
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