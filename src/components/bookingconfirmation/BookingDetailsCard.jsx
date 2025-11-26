import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BookingDetailsCard({
  booking,
  totalPrice,
  originalPrice,
  couponApplied,
  selectedServices = [],
  discount = 0,
  offerTitle = "",
  promo = null,
  source = "",
}) {
  if (!booking) return null;
  // Prefer services from previous screen; fallback to backend
  const services =
    selectedServices.length > 0
      ? selectedServices
      : booking?.services && Array.isArray(booking.services)
        ? booking.services
        : [];

  const finalPrice = totalPrice || booking?.total_price || 0;
  const showDiscount = originalPrice && originalPrice > finalPrice;

  // Detect Promotion / Offer
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
      <Text style={styles.sectionTitle}>Booking Summary</Text>

      {/* ✅ Applied Offer / Promotion */}
      {discount > 0 && appliedLabel !== "" && (
        <DetailRow
          label={appliedLabel}
          value={`${offerTitle} (${discount}% OFF)`}
        />
      )}

      {/* ✅ Services Section */}
      <Text style={styles.serviceText}>
        Service: {booking?.service_title}
      </Text>

      {Array.isArray(booking?.services) && booking.services.length > 1 && (
        <Text style={[styles.serviceText, { color: "#666", marginTop: 4 }]}>
          + {booking.services.length} services included
        </Text>
      )}

      {services.length > 0 && (
        <View style={{ marginVertical: 8 }}>
          {services.map((s) => (
            <DetailRow key={s.id} label={s.title} value={`₹${s.price}`} />
          ))}
        </View>
      )}

      <View style={styles.divider} />

      {/* ✅ Price Breakdown */}
      <View style={styles.priceRow}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>₹{parseFloat(finalPrice).toFixed(2)}</Text>
      </View>

      {showDiscount && (
        <>
          <View style={styles.priceRow}>
            <Text style={styles.label}>Original Price</Text>
            <Text style={[styles.value, styles.strikethrough]}>
              ₹{parseFloat(originalPrice).toFixed(2)}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.label, styles.discountLabel]}>Discount Applied</Text>
            <Text style={[styles.value, styles.saved]}>
              -₹{(originalPrice - finalPrice).toFixed(2)}
            </Text>
          </View>
        </>
      )}

      {couponApplied && (
        <View style={styles.couponRow}>
          <Text style={styles.couponText}>Coupon Applied: {couponApplied}</Text>
        </View>
      )}

      {/* ✅ Final Price */}
      <View style={styles.finalPriceRow}>
        <Text style={styles.finalLabel}>Final Amount</Text>
        <Text style={styles.finalPrice}>
          ₹{parseFloat(finalPrice).toFixed(2)}
        </Text>
      </View>

      <View style={styles.divider} />

      {/* ✅ Vehicle Info */}
      <DetailRow
        label="Vehicle"
        value={`${booking.vehicle_make} ${booking.vehicle_model} (${booking.vehicle_year})`}
      />
      <DetailRow label="Vehicle Number" value={booking.vehicle_number} />

      {/* ✅ Booking Info */}
      <Text style={styles.info}>Booking ID: #{booking?.id}</Text>
      <Text style={styles.info}>Date: {booking?.appointment_date}</Text>
      <Text style={styles.info}>Time: {booking?.appointment_time}</Text>
      <Text style={styles.info}>
        Status: <Text style={styles.status}>{booking?.status}</Text>
      </Text>
    </View>
  );}
const styles = StyleSheet.create({
      card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginVertical: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
        color: "#1E3A8A",
      },
      serviceText: {
        fontSize: 15,
        color: "#333",
        marginBottom: 6,
      },
      divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 12,
      },
      priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
      },
      label: {
        fontSize: 15,
        color: "#555",
      },
      value: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
      },
      strikethrough: {
        textDecorationLine: "line-through",
        color: "#999",
      },
      discountLabel: {
        color: "#16A34A",
        fontWeight: "600",
      },
      saved: {
        color: "#16A34A",
        fontWeight: "700",
      },
      couponRow: {
        backgroundColor: "#E8F5E9",
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: "center",
      },
      couponText: {
        color: "#1B5E20",
        fontWeight: "700",
        fontSize: 14,
      },
      finalPriceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
      },
      finalLabel: {
        fontSize: 18,
        fontWeight: "800",
        color: "#000",
      },
      finalPrice: {
        fontSize: 22,
        fontWeight: "800",
        color: "#16A34A",
      },
      info: {
        fontSize: 14,
        color: "#555",
        marginTop: 6,
      },
      status: {
        fontWeight: "600",
        textTransform: "capitalize",
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
      }
    },});
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import DetailRow from "./DetailRow";

// export default function BookingDetailsCard({ booking }) {
//   if (!booking) {
//     return (
//       <View style={styles.card}>
//         <Text style={styles.title}>Booking Details</Text>
//         <Text style={{ color: "red" }}>No booking data available.</Text>
//       </View>
//     );
//   }

//   // ✅ Use service_title from API directly
//   const servicesText = booking.service_title || "N/A";

//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>Booking Details</Text>

//       {/* Services */}
//       <DetailRow label="Services" value={servicesText} />

//       {/* Date & Time */}
//       <DetailRow label="Date" value={booking.appointment_date || "N/A"} />
//       <DetailRow label="Time" value={booking.appointment_time || "N/A"} />

//       {/* Vehicle Info */}
//       <DetailRow
//         label="Vehicle"
//         value={
//           booking.vehicle_make && booking.vehicle_model && booking.vehicle_year
//             ? `${booking.vehicle_make} ${booking.vehicle_model} (${booking.vehicle_year})`
//             : "N/A"
//         }
//       />

//       {/* Price */}
//       {booking.total_price && (
//         <DetailRow label="Total Price" value={`₹${booking.total_price}`} />
//       )}

//       {/* Status */}
//       {booking.status && (
//         <DetailRow
//           label="Status"
//           value={
//             booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
//           }
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 12,
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 10,
//   },
// });