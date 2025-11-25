import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DetailRow from "./DetailRow";

export default function BookingDetailsCard({
  booking,
  selectedServices = [],
  totalPrice = 0,
  discount = 0,
  offerTitle = "",
  promo = null,
  source = "",
}) {
  if (!booking) return null;

  // FIXED: Detect Promotion correctly
  const isPromotion = !!promo;
  let appliedLabel = "";
  if (discount > 0) {
    if (source === "promotion") {
      appliedLabel = "Promotion Applied";
    } else if (source === "offer") {
      appliedLabel = "Offer Applied";
    } else {
      appliedLabel = "Offer Applied"; // fallback
    }
  }

  // Prefer services from previous screen; fallback to backend
  const services =
    selectedServices.length > 0
      ? selectedServices
      : booking.services || [];

  // Calculate total dynamically
  const computedTotal = services.reduce(
    (sum, s) => sum + Number(s.price || 0),
    0
  );

  const baseTotal = Number(totalPrice) || computedTotal;

  const discountAmount = discount ? (baseTotal * discount) / 100 : 0;
  const finalTotal = baseTotal - discountAmount;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Booking Details</Text>

      {/* Applied Offer / Promotion */}
      {discount > 0 && appliedLabel !== "" && (
        <DetailRow
          label={appliedLabel}
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
