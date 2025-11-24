import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DetailRow from "./DetailRow";

export default function BookingDetailsCard({
  booking,
  selectedServices = [],
  totalPrice = 0,
  discount = 0,
  offerTitle = "",
}) {
  if (!booking) return null;

  // Prefer services passed from previous screen; fallback to backend
  const services =
    selectedServices.length > 0
      ? selectedServices
      : booking.services || [];

  // Always calculate total price dynamically
  const computedTotal = services.reduce(
    (sum, s) => sum + Number(s.price || 0),
    0
  );

  // Final price BEFORE discount
  const baseTotal = Number(totalPrice) || computedTotal;

  // Apply discount if exists
  const discountAmount = discount ? (baseTotal * discount) / 100 : 0;
  const finalTotal = baseTotal - discountAmount;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Booking Details</Text>

      {/* Applied Offer */}
      {discount > 0 && (
        <DetailRow
          label="Offer Applied"
          value={`${offerTitle} (${discount}% OFF)`}
        />
      )}

      {/* Services */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
          Services:
        </Text>

        {services.length > 0 ? (
          services.map((s) => (
            <DetailRow
              key={s.id}
              label={s.title}
              value={`₹${s.price}`}
            />
          ))
        ) : (
          <DetailRow label="Services" value="N/A" />
        )}
      </View>

      <DetailRow label="Date" value={booking.appointment_date} />
      <DetailRow label="Time" value={booking.appointment_time} />
      <DetailRow
        label="Vehicle"
        value={`${booking.vehicle_make} ${booking.vehicle_model} (${booking.vehicle_year})`}
      />


      <DetailRow
        label="Vehicle Number"
        value={booking.vehicle_number}
      />


      {/* BASE PRICE */}
      <DetailRow
        label="Base Price"
        value={`₹ ${baseTotal.toFixed(2)}`}
      />

      {/* DISCOUNT */}
      {discount > 0 && (
        <DetailRow
          label="Discount"
          value={`- ₹ ${discountAmount.toFixed(2)}`}
        />
      )}

      {/* FINAL PRICE */}
      <DetailRow
        label="Total Price"
        value={`₹ ${finalTotal.toFixed(2)}`}
      />

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
