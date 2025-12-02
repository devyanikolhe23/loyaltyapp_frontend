
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

  // Pick services safely: must be objects
  const services =
    selectedServices?.length > 0 && typeof selectedServices[0] === "object"
      ? selectedServices
      : booking?.selectedServices?.length > 0
      ? booking.selectedServices
      : [];

  console.log("Services to display:", services);

  // Determine applied label if discount exists
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

  // Calculate totals
  const computedTotal = services.reduce(
    (sum, s) => sum + parseFloat(s?.price || 0),
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
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Services:</Text>
        {services.length > 0 ? (
          services.map((s, index) => (
            <DetailRow
              key={s?.id ? `${s.id}-${index}` : index} // unique key
              label={s?.title || "N/A"}
              value={`₹${s?.price ? Number(s.price).toFixed(2) : "0.00"}`}
            />
          ))
        ) : (
          <DetailRow label="Services" value="N/A" />
        )}
      </View>

      {/* Booking info */}
      <DetailRow label="Date" value={booking?.appointment_date || "N/A"} />
      <DetailRow label="Time" value={booking?.appointment_time || "N/A"} />
      <DetailRow
        label="Vehicle"
        value={`${booking?.vehicle_make || ""} ${booking?.vehicle_model || ""} (${booking?.vehicle_year || ""})`}
      />
      <DetailRow label="Vehicle Number" value={booking?.vehicle_number || "N/A"} />

      {/* Price breakdown */}
      <DetailRow label="Base Price" value={`₹ ${baseTotal.toFixed(2)}`} />
      {discount > 0 && <DetailRow label="Discount" value={`- ₹ ${discountAmount.toFixed(2)}`} />}
      <DetailRow label="Total Price" value={`₹ ${finalTotal.toFixed(2)}`} />
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