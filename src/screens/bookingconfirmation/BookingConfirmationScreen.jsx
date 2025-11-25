

import { View, ScrollView, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BookingDetailsCard from "../../components/bookingconfirmation/BookingDetailsCard";
import MapCard from "../../components/bookingconfirmation/MapCard";
import ActionButtons from "../../components/bookingconfirmation/ActionButtons";
import DetailRow from "../../components/bookingconfirmation/DetailRow";
import React, { useEffect } from "react";
export default function BookingConfirmationScreen({ route }) {
  const booking = route?.params?.booking;

  // Extract price & coupon info
  const totalPrice = route?.params?.totalPrice;
  const originalPrice = route?.params?.originalPrice;
  const couponApplied = route?.params?.couponApplied;
  
  // ADD THIS DEBUG BLOCK HERE
  useEffect(() => {
    console.log("🔥 BOOKING DEBUG START 🔥");
    console.log("booking object:", JSON.stringify(booking, null, 2));
    console.log("services field:", booking?.services);
    console.log("services type:", typeof booking?.services);
    console.log("is array?", Array.isArray(booking?.services));
    console.log("service_title exists?", !!booking?.service_title);
    console.log("total_price:", booking?.total_price);
    console.log("🔥 BOOKING DEBUG END 🔥");
  }, [booking]);
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

        {/* Pass everything to BookingDetailsCard */}
        <BookingDetailsCard
          booking={booking}
          totalPrice={totalPrice}
          originalPrice={originalPrice}
          couponApplied={couponApplied}
        />

        
        <ActionButtons />
      </ScrollView>
    </View>
  );
}
// export default function BookingConfirmationScreen({ route }) {
//   // ✅ Extract booking object safely
//   const booking = route?.params?.booking;

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.title}>Booking Confirmed</Text>

//         <View style={styles.iconContainer}>
//           <Icon name="checkmark-circle-outline" size={64} color="#007AFF" />
//         </View>

//         <Text style={styles.confirmText}>Your appointment is confirmed</Text>
//         <Text style={styles.subText}>
//           We’ve received your booking and it’s scheduled. You’ll get a reminder
//           24 hours before.
//         </Text>

//         {/* ✅ Only Fetch Details Inside BookingDetailsCard */}
//         <BookingDetailsCard booking={booking} />

//         {/* Map */}
//         <MapCard />

//         {/* Action Buttons (Home / View Bookings etc.) */}
//         <ActionButtons />
//       </ScrollView>
//     </View>
//   );
// }


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