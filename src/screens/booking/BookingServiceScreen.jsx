import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ServiceSelection from "../../components/bookingService/ServiceSelection";
import DateTimePickerComponent from "../../components/bookingService/DateTimePicker";
import VehicleDetailsForm from "../../components/bookingService/VehicleDetailsForm";
import Header from "../../components/Header";
import { API_BASE } from '@env';

const BASE_URL = `${API_BASE}`;

export default function BookingServiceScreen({ navigation, route = {} }) {
  const isEdit = !!route.params?.isEdit;
  const existingBooking = route.params?.booking ?? {};
  const prefillData = route.params?.prefillData || {};
  const rewardId = route.params?.rewardId || null;
  const rewardTitle = route.params?.rewardTitle || null;
  const rewardPoints = route.params?.rewardPoints || null;
  const rewardServiceId = route.params?.serviceId || null;

  const appliedCouponCode = route.params?.appliedCouponCode || null;
  const appliedCouponTitle = route.params?.appliedCouponTitle || null;

  // Earning rule params
  const { earningRuleId, rewardType, rewardTitle: earningRuleTitle, minSpend } = route.params || {};

  useEffect(() => {
    console.log("Route params →", route.params);
  }, [route.params]);

  // === State Management ===
  const [services, setServices] = useState(() => {
    if (rewardServiceId) {
      return [{ id: rewardServiceId }];
    } else if (isEdit && Array.isArray(existingBooking?.services)) {
      return existingBooking.services.map((s) => ({ id: s.id, title: s.title }));
    } else {
      return [];
    }
  });

  const [appointmentDate, setAppointmentDate] = useState(
    isEdit ? existingBooking?.appointment_date ?? null : null
  );
  const [appointmentTime, setAppointmentTime] = useState(
    isEdit ? existingBooking?.appointment_time ?? null : null
  );

  const [vehicle, setVehicle] = useState(() => {
    if (prefillData.vehicle_make) {
      return {
        make: prefillData.vehicle_make,
        model: prefillData.vehicle_model,
        year: prefillData.vehicle_year,
      };
    } else if (isEdit) {
      return {
        make: existingBooking?.vehicle_make ?? "",
        model: existingBooking?.vehicle_model ?? "",
        year: existingBooking?.vehicle_year ?? "",
      };
    } else {
      return { make: "", model: "", year: "" };
    }
  });
  const [originalPrice, setOriginalPrice] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [bookingId, setBookingId] = useState(null);

 
  const handleApplyCoupon = async () => {
    if (!appliedCouponCode) {
      Alert.alert("No Coupon", "Please select a coupon first.");
      return;
    }
    let token = await AsyncStorage.getItem("access");
    if (!token) {
      Alert.alert("Login Required", "Please login again.");
      return;
    }

    try {
      const payload = {
        services: services.map((s) => s.id),
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        vehicle_make: vehicle.make,
        vehicle_model: vehicle.model,
        vehicle_year: vehicle.year,
      };

      // 🔹 Create booking if not exists
      let tempBookingId = bookingId;
      if (!tempBookingId) {
        const bookingRes = await axios.post(`${BASE_URL}/bookings/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        tempBookingId = bookingRes.data.id;
        setBookingId(tempBookingId);
      }

      // 🔹 Apply coupon
      const res = await axios.post(
        `${BASE_URL}/api/coupons/apply/`,
        { coupon_code: appliedCouponCode, booking_id: tempBookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOriginalPrice(res.data.original_price);
      setDiscountedPrice(res.data.discounted_price);
      Alert.alert("Coupon Applied", res.data.message);
    } catch (error) {
      console.log("Full Coupon Error →", error.response?.data);

      // Extract the exact message from backend
      const backendError = error.response?.data;

      let userMessage = "Coupon application failed.";

      // Check ALL possible places where backend puts the message
      const errorText = 
        backendError?.detail || 
        backendError?.error || 
        backendError?.message || 
        backendError?.non_field_errors?.[0] ||
        backendError?.coupon_code?.[0] ||
        JSON.stringify(backendError);

      // Now match the actual text
      const lowerText = errorText.toLowerCase();

      if (lowerText.includes("expired")) {
        userMessage = `Sorry, coupon "${appliedCouponCode}" has expired.`;
      }
      else if (lowerText.includes("invalid") || lowerText.includes("not found") || lowerText.includes("does not exist")) {
        userMessage = `Coupon code "${appliedCouponCode}" is invalid.`;
      }
      else if (lowerText.includes("already used") || lowerText.includes("already applied")) {
        userMessage = `Coupon "${appliedCouponCode}" has already been used.`;
      }
      else if (lowerText.includes("minimum") || lowerText.includes("spend")) {
        userMessage = errorText; // Keep backend's clear message
      }
      else if (lowerText.includes("not applicable") || lowerText.includes("service")) {
        userMessage = `Coupon "${appliedCouponCode}" is not valid for selected services.`;
      }
      else {
        userMessage = errorText.includes("Coupon") ? errorText : "Unable to apply coupon.";
      }

      Alert.alert("Coupon Error", userMessage, [{ text: "OK" }]);
    }};


  useEffect(() => {
    console.log("BookingServiceScreen mounted", {
      isEdit,
      existingBooking,
      services,
      appointmentDate,
      appointmentTime,
      vehicle,
    });
  }, []);

  // === Refresh Token Helper ===
  const refreshAccessToken = async () => {
    try {
      const refresh = await AsyncStorage.getItem("refresh");
      if (!refresh) return null;

      const response = await axios.post(
        `${BASE_URL}/api/token/refresh/`,
        { refresh }
      );

      const newAccess = response.data.access;
      await AsyncStorage.setItem("access", newAccess);
      return newAccess;
    } catch {
      return null;
    }
  };
  const handleBooking = async () => {
    if (
      services.length === 0 ||
      !appointmentDate ||
      !appointmentTime ||
      !vehicle.make ||
      !vehicle.model ||
      !vehicle.year
    ) {
      Alert.alert("Missing Information", "Please fill all details before proceeding.");
      return;
    }

    let token = await AsyncStorage.getItem("access");
    if (!token) {
      Alert.alert("Authentication Error", "Please login again.");
      return;
    }

    const bookingPayload = {
      services: services.map((s) => s.id),
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      vehicle_make: vehicle.make,
      vehicle_model: vehicle.model,
      vehicle_year: vehicle.year,
      ...(rewardId ? { reward_id: rewardId } : {}),
      ...(earningRuleId ? { earningRuleId: earningRuleId } : {}),
    };

    try {
      let finalBookingData;
      let finalTotalPrice = null;
      let originalPriceForDisplay = originalPrice;

      // ——————— RESCHEDULE CASE ———————
      if (isEdit && existingBooking?.id) {
        const res = await axios.put(
          `${BASE_URL}/bookings/${existingBooking.id}/`,
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Alert.alert("Success", "Booking rescheduled successfully!");
        navigation.navigate("MyBookingsScreen", { refresh: true });
        return;
      }

      // ——————— COUPON ALREADY APPLIED (bookingId exists) ———————
      if (bookingId) {
        // Re-fetch the booking that already has the discount applied
        const latestRes = await axios.get(`${BASE_URL}/bookings/${bookingId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        finalBookingData = latestRes.data;
        finalTotalPrice = discountedPrice || latestRes.data.total_price;
      }
      // ——————— NORMAL BOOKING (no coupon yet) ———————
      else {
        const res = await axios.post(`${BASE_URL}/bookings/`, bookingPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        finalBookingData = res.data;
        finalTotalPrice = res.data.total_price;
      }

      // ——————— Build Alert Message ———————
      let title = "Booking Confirmed";
      let message = `Your service has been booked successfully!`;

      if (rewardId) {
        title = "Reward Booking Confirmed";
        message = `${rewardTitle} booked!\nFinal Price: ₹${parseFloat(finalTotalPrice).toFixed(2)}`;
      }
      else if (earningRuleId) {
        const total = parseFloat(finalTotalPrice);
        const min = parseFloat(minSpend || 0);
        if (total >= min) {
          title = "Earn Points Booking Confirmed";
          message = `You qualified for bonus points!\nFinal Price: ₹${total.toFixed(2)}`;
        } else {
          const shortBy = (min - total).toFixed(2);
          message = `₹${shortBy} more to earn points!\nFinal Price: ₹${total.toFixed(2)}`;
        }
      }
      else if (appliedCouponCode) {
        title = "Coupon Applied!";
        const saved = (originalPriceForDisplay - finalTotalPrice).toFixed(2);
        message = `Coupon ${appliedCouponCode} applied!\nYou saved ₹${saved}\nFinal Price: ₹${parseFloat(finalTotalPrice).toFixed(2)}`;
      }

      Alert.alert(title, message, [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Services", {
              screen: "BookingConfirmationScreen",
              params: {
                booking: finalBookingData,
                totalPrice: finalTotalPrice,
                originalPrice: originalPriceForDisplay,
                couponApplied: appliedCouponCode || null,
              },
            });
          },
        },
      ]);
    } catch (error) {
      console.log("Booking Error →", error.response?.data || error);
      Alert.alert(
        "Error",
        error.response?.data?.detail || "Something went wrong. Please try again."
      );
    }
  };
  // === Booking Handler ===
  // const handleBooking = async () => {
  //   if (
  //     services.length === 0 ||
  //     !appointmentDate ||
  //     !appointmentTime ||
  //     !vehicle.make ||
  //     !vehicle.model ||
  //     !vehicle.year
  //   ) {
  //     Alert.alert("Missing Information", "Please fill all details before proceeding.");
  //     return;
  //   }

  //   let token = await AsyncStorage.getItem("access");
  //   if (!token) {
  //     Alert.alert("Authentication Error", "Please login again.", [
  //       { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
  //     ]);
  //     return;
  //   }

  //   const bookingPayload = {
  //     services: services.map((s) => s.id),
  //     appointment_date: appointmentDate,
  //     appointment_time: appointmentTime,
  //     vehicle_make: vehicle.make,
  //     vehicle_model: vehicle.model,
  //     vehicle_year: vehicle.year,
  //     ...(rewardId ? { reward_id: rewardId } : {}),
  //     ...(earningRuleId ? { earningRuleId: earningRuleId } : {}),
  //   };

  //   console.log("Booking Payload:", bookingPayload);
  //   if (bookingId) {
  //     try {
  //       const finalToken = await AsyncStorage.getItem("access");
  //       const finalBooking = await axios.get(`${BASE_URL}/bookings/${bookingId}/`, {
  //         headers: { Authorization: `Bearer ${finalToken}` },
  //       });

  //     const finalPrice = discountedPrice ?? response.data.total_price;

  //       Alert.alert(
  //         "Booking Confirmed",
  //         `Your booking has been confirmed successfully.\n\nFinal Price: ₹${finalPrice.toFixed(2)}`,
  //         [
  //           {
  //             text: "OK",
  //             onPress: () =>
  //               navigation.navigate("Services", {
  //                 screen: "BookingConfirmationScreen",
  //                 params: {
  //                   booking: finalBooking.data,
  //                   totalPrice: finalPrice,
  //                   rewardType: route.params?.rewardType,
  //                   couponApplied: appliedCouponCode,
  //                 },
  //               }),
  //           },
  //         ]
  //       );
  //       return; 
  //     } catch (err) {
  //       console.log("Coupon booking fetch error:", err.response?.data || err.message);
  //     }
  //   }
  //   try {
  //     let response;

  //     if (isEdit && existingBooking?.id) {
  //       response = await axios.put(
  //         `${BASE_URL}/bookings/${existingBooking.id}/`,
  //         bookingPayload,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );

  //       Alert.alert("Success", "Booking rescheduled successfully!", [
  //         {
  //           text: "OK",
  //           onPress: () =>
  //             navigation.navigate("MyBookingsScreen", { refresh: true }),
  //         },
  //       ]);
  //     } else {
  //       response = await axios.post(
  //         `${BASE_URL}/bookings/`,
  //         bookingPayload,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );

  //       let alertTitle = "Booking Confirmed";
  //       let alertMessage = "Your service has been booked successfully!";

  //       if (rewardId) {
  //         alertTitle = "Reward Booking Confirmed";
  //         alertMessage = `Your booking for "${rewardTitle}" has been created successfully!\n\nTotal Price: ₹${response.data.total_price}\nPoints will be deducted after service completion.`;
  //       }
  //       else if (earningRuleId) {
  //         const totalPrice = parseFloat(response.data.total_price || 0);
  //         const minRequired = parseFloat(minSpend || 0);

  //         if (totalPrice >= minRequired) {
  //           // User WILL get points → celebrate!
  //           alertTitle = "Earn Points Booking Confirmed";
  //           alertMessage = `Congratulations! You've qualified for bonus points!\n\nMinimum spend: ₹${minSpend}\nYour total: ₹${totalPrice.toFixed(2)}\nPoints will be awarded after service completion.`;
  //         } else {
  //           // User did NOT qualify → be honest
  //           const shortBy = (minRequired - totalPrice).toFixed(2);
  //           alertTitle = "Booking Confirmed";
  //           alertMessage = `Booking successful!\n\nYou're ₹${shortBy} short of earning bonus points.\nAdd more services next time to earn rewards!`;
  //         }
  //       }
  //       else {
  //         alertMessage = "Your service has been booked successfully!";
  //       }

  //       Alert.alert(alertTitle, alertMessage, [
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             navigation.navigate("Services", {
  //               screen: "BookingConfirmationScreen",
  //               params: {
  //                 booking: response.data,
  //                 totalPrice: response.data.total_price,
  //                 rewardType: route.params?.rewardType,
  //               },
  //             });
  //           },
  //         },
  //       ]);


  //     }
  //   } catch (error) {
  //     console.log("Booking Error:", error?.response?.data ?? error.message);
  //     Alert.alert(
  //       "Error",
  //       `Booking failed: ${error?.response?.data?.detail || error.message}`
  //     );
  //   }
  // };

  return (
    <View style={styles.container}>
      <Header
        title={isEdit ? "Reschedule Booking" : "Booking"}
        showBack={true}
        navigation={navigation}
      />

      {/* ===== BANNER: Works for BOTH Rewards AND Recall Services ===== */}
      {(rewardId || prefillData?.service_name) && (
        <View style={styles.rewardBanner}>
          <Text style={styles.rewardBannerText}>
            {prefillData?.service_name
              ? `Recall Service: ${prefillData.service_name}`
              : `🎁Reward Applied: ${rewardTitle}`}
          </Text>

          {rewardPoints && (
            <Text style={styles.rewardBannerSub}>
              Points to be deducted: {rewardPoints}
            </Text>
          )}

          {route.params?.rewardType === "discount" && (
            <Text style={styles.rewardBannerSub}>
              Discount: {route.params.rewardDiscountValue <= 1
                ? `${(route.params.rewardDiscountValue * 100).toFixed(0)}% off`
                : `₹${route.params.rewardDiscountValue} off`}
            </Text>
          )}

          {route.params?.rewardType === "flat" && (
            <Text style={styles.rewardBannerSub}>
              Flat Discount: ₹{route.params.rewardDiscountValue}
            </Text>
          )}

          {route.params?.rewardType === "free" && (
            <Text style={styles.rewardBannerSub}>
              This service is 100% FREE!
            </Text>
          )}
        </View>
      )}

      {/* ===== EARNING RULE NOTE ===== */}
      {earningRuleId && (
        <Text style={{ marginBottom: 10, color: "#1E40AF", fontWeight: "500", marginHorizontal: 20 }}>
          Earn points on this booking! Minimum spend: ₹{minSpend}
        </Text>
      )}
      {/* ===== COUPON BANNER (Added) ===== */}
      {appliedCouponCode && (
        <View style={styles.couponBanner}>
          <Text style={styles.couponText}>
            Coupon Applied: {appliedCouponCode}
          </Text>
          <TouchableOpacity
            style={styles.couponButton}
            onPress={handleApplyCoupon}
          >
            <Text style={styles.couponButtonText}>Apply Coupon</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ===== DISCOUNTED PRICE ===== */}
      {discountedPrice && (
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>
            Original: ₹{originalPrice?.toFixed(2)} →{" "}
            <Text style={styles.discounted}>₹{discountedPrice?.toFixed(2)}</Text>
          </Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ServiceSelection
          selectedServices={services}
          onSelectServices={rewardId ? () => { } : setServices} // disable change if reward applied
          prefillServiceName={prefillData.service_name}
        />

        <DateTimePickerComponent
          defaultDate={appointmentDate}
          defaultTime={appointmentTime}
          onSelectDateTime={(date, time) => {
            setAppointmentDate(date);
            setAppointmentTime(time);
          }}
        />

        <VehicleDetailsForm
          defaultVehicle={vehicle}
          onChangeVehicle={setVehicle}
        />
      </ScrollView>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookNowText}>
          {isEdit ? "Reschedule" : "Book Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 20 },
  bookButton: {
    backgroundColor: "#007AFF",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 24,
  },
  bookNowText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  rewardBanner: {
    backgroundColor: "#E0F2FE",
    margin: 16,
    padding: 12,
    borderRadius: 10,
    borderColor: "#3B82F6",
    borderWidth: 1,
  },
  rewardBannerText: { fontWeight: "700", fontSize: 16, color: "#1E3A8A" },
  couponBanner: {
    backgroundColor: "#E8F5E9",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    borderColor: "#43A047",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  couponText: { color: "#1B5E20", fontWeight: "600" },
  couponButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  couponButtonText: { color: "#fff", fontWeight: "700" },
  priceBox: { alignItems: "center", marginVertical: 10 },
  priceText: { fontSize: 16 },
  discounted: { color: "#2E7D32", fontWeight: "700" },
});

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   ScrollView,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ServiceSelection from "../../components/bookingService/ServiceSelection";
// import DateTimePickerComponent from "../../components/bookingService/DateTimePicker";
// import VehicleDetailsForm from "../../components/bookingService/VehicleDetailsForm";
// import Header from "../../components/Header";
// import { API_BASE } from '@env';
// const BASE_URL = `${API_BASE}`;
// export default function BookingServiceScreen({ navigation, route = {} }) {

//   const isEdit = !!route.params?.isEdit;
//   const existingBooking = route.params?.booking ?? {};
//   const prefillData = route.params?.prefillData || {};
//   const rewardId = route.params?.rewardId || null;
//   const rewardTitle = route.params?.rewardTitle || null;
//   const rewardPoints = route.params?.rewardPoints || null;
//   const rewardServiceId = route.params?.serviceId || null;

//   useEffect(() => {
//     console.log("Route params →", route.params);
//   }, [route.params]);

//   // === State Management ===
//   const [services, setServices] = useState(() => {
//     if (rewardServiceId) {
//       // ✅ If reward passed → lock that service
//       return [{ id: rewardServiceId }];
//     } else if (isEdit && Array.isArray(existingBooking?.services)) {
//       return existingBooking.services.map((s) => ({ id: s.id, title: s.title }));
//     } else {
//       return [];
//     }
//   });
//   const [appointmentDate, setAppointmentDate] = useState(
//     isEdit ? existingBooking?.appointment_date ?? null : null
//   );
//   const [appointmentTime, setAppointmentTime] = useState(
//     isEdit ? existingBooking?.appointment_time ?? null : null
//   );

//   const [vehicle, setVehicle] = useState(() => {
//     if (prefillData.vehicle_make) {
//       return {
//         make: prefillData.vehicle_make,
//         model: prefillData.vehicle_model,
//         year: prefillData.vehicle_year,
//       };
//     } else if (isEdit) {
//       return {
//         make: existingBooking?.vehicle_make ?? "",
//         model: existingBooking?.vehicle_model ?? "",
//         year: existingBooking?.vehicle_year ?? "",
//       };
//     } else {
//       return { make: "", model: "", year: "" };
//     }
//   });

//   // Debug mount info
//   useEffect(() => {
//     console.log("BookingServiceScreen mounted", {
//       isEdit,
//       existingBooking,
//       services,
//       appointmentDate,
//       appointmentTime,
//       vehicle,
//     });
//   }, []);

//   // === Refresh Token Helper ===
//   const refreshAccessToken = async () => {
//     try {
//       const refresh = await AsyncStorage.getItem("refresh");
//       if (!refresh) return null;

//       const response = await axios.post(
//         `${BASE_URL}/api/token/refresh/`,
//         { refresh }
//       );

//       const newAccess = response.data.access;
//       await AsyncStorage.setItem("access", newAccess);
//       return newAccess;
//     } catch {
//       return null;
//     }
//   };

//   // === Booking Handler ===
//   const handleBooking = async () => {
//     if (
//       services.length === 0 ||
//       !appointmentDate ||
//       !appointmentTime ||
//       !vehicle.make ||
//       !vehicle.model ||
//       !vehicle.year
//     ) {
//       Alert.alert("Missing Information", "Please fill all details before proceeding.");
//       return;
//     }

//     let token = await AsyncStorage.getItem("access");
//     if (!token) {
//       Alert.alert("Authentication Error", "Please login again.", [
//         { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
//       ]);
//       return;
//     }

//     // ✅ Ensure we send an array of IDs only
//     const bookingPayload = {
//       services: services.map((s) => s.id), // <--- array of service IDs
//       appointment_date: appointmentDate,
//       appointment_time: appointmentTime,
//       vehicle_make: vehicle.make,
//       vehicle_model: vehicle.model,
//       vehicle_year: vehicle.year,
//       ...(rewardId ? { reward_id: rewardId } : {}),
//       ...(route.params?.earningRuleId ? { earning_rule_id: route.params.earningRuleId } : {}),
//     };

//     console.log("Booking Payload:", bookingPayload);

//     try {
//       let response;

//       if (isEdit && existingBooking?.id) {
//         response = await axios.put(
//           `${BASE_URL}/bookings/${existingBooking.id}/`,
//           bookingPayload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         Alert.alert("Success", "Booking rescheduled successfully!", [
//           {
//             text: "OK",
//             onPress: () =>
//               navigation.navigate("MyBookingsScreen", { refresh: true }),
//           },
//         ]);
//       } else {
//         response = await axios.post(
//           `${BASE_URL}/bookings/`,
//           bookingPayload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (rewardId) {
//           Alert.alert(
//             "Reward Booking Confirmed",
//             `Your booking for "${rewardTitle}" has been created successfully!\n\nTotal Price:₹${response.data.total_price} . Points will be deducted after service completion.`,
//             [
//               {
//                 text: "OK",
//                 onPress: () => {
//                   navigation.navigate("Services", {
//                     screen: "BookingConfirmationScreen",
//                     params: { booking: response.data },
//                     totalPrice: response.data.total_price,
//                     rewardType: route.params?.rewardType,
//                   });
//                 },
//               },
//             ]
//           );
//         } else {
//           Alert.alert("Booking Successful", "Your service has been booked successfully!", [
//             {
//               text: "OK",
//               onPress: () => {
//                 navigation.navigate("Services", {
//                   screen: "BookingConfirmationScreen",
//                   params: { booking: response.data },
//                   totalPrice: response.data.total_price,
//                   rewardType: route.params?.rewardType,
//                 });
//               },
//             },
//           ]);
//         }
//       }
//     } catch (error) {
//       console.log("Booking Error:", error?.response?.data ?? error.message);
//       Alert.alert(
//         "Error",
//         `Booking failed: ${error?.response?.data?.detail || error.message}`
//       );
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Header
//         title={isEdit ? "Reschedule Booking" : "Booking"}
//         showBack={true}
//         navigation={navigation}
//       />
//       {/* ===== BANNER: Works for BOTH Rewards AND Recall Services ===== */}
//       {(rewardId || prefillData?.service_name) && (
//         <View style={styles.rewardBanner}>
//           {/* Title */}
//           <Text style={styles.rewardBannerText}>
//             {prefillData?.service_name
//               ? `Recall Service: ${prefillData.service_name}`
//               : `🎁Reward Applied: ${rewardTitle}`}
//           </Text>

//           {/* Points only for real rewards */}
//           {rewardPoints && (
//             <Text style={styles.rewardBannerSub}>
//               Points to be deducted: {rewardPoints}
//             </Text>
//           )}

//           {/* Discount type info */}
//           {route.params?.rewardType === "discount" && (
//             <Text style={styles.rewardBannerSub}>
//               Discount: {route.params.rewardDiscountValue <= 1
//                 ? `${(route.params.rewardDiscountValue * 100).toFixed(0)}% off`
//                 : `₹${route.params.rewardDiscountValue} off`}
//             </Text>
//           )}

//           {route.params?.rewardType === "flat" && (
//             <Text style={styles.rewardBannerSub}>
//               Flat Discount: ₹{route.params.rewardDiscountValue}
//             </Text>
//           )}

//           {route.params?.rewardType === "free" && (
//             <Text style={styles.rewardBannerSub}>
//               This service is 100% FREE!
//             </Text>
//           )}
//           {route.params?.earningRuleId && (
//             <Text style={{ marginBottom: 10, color: "#1E40AF", fontWeight: "500" }}>
//               Earn points on this booking! Minimum spend: ₹{route.params.minSpend}
//             </Text>
//           )}

//           {/* FINAL PRICE — NOW SHOWS FOR RECALLS TOO */}
//           {/* <Text style={styles.finalPriceText}>
//             Final Price: ₹
//             {route.params?.finalPrice !== undefined
//               ? parseFloat(route.params.finalPrice).toFixed(2)
//               : route.params?.totalPrice
//                 ? parseFloat(route.params.totalPrice).toFixed(2)
//                 : "0.00"}
//           </Text> */}
//         </View>
//       )}

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         keyboardShouldPersistTaps="handled"
//       >
//         <ServiceSelection
//           selectedServices={services}
//           onSelectServices={rewardId ? () => { } : setServices} // disable change if reward applied
//           prefillServiceName={prefillData.service_name}
//         />

//         <DateTimePickerComponent
//           defaultDate={appointmentDate}
//           defaultTime={appointmentTime}
//           onSelectDateTime={(date, time) => {
//             setAppointmentDate(date);
//             setAppointmentTime(time);
//           }}
//         />

//         <VehicleDetailsForm
//           defaultVehicle={vehicle}
//           onChangeVehicle={setVehicle}
//         />
//       </ScrollView>

//       <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
//         <Text style={styles.bookNowText}>
//           {isEdit ? "Reschedule" : "Book Now"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   scrollContent: { padding: 20 },
//   bookButton: {
//     backgroundColor: "#007AFF",
//     borderRadius: 14,
//     paddingVertical: 18,
//     alignItems: "center",
//     marginHorizontal: 20,
//     marginVertical: 24,
//   },
//   bookNowText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   rewardBanner: {
//     backgroundColor: "#E0F2FE",
//     margin: 16,
//     padding: 12,
//     borderRadius: 10,
//     borderColor: "#3B82F6",
//     borderWidth: 1,
//   },
//   rewardBannerText: {
//     fontWeight: "700",
//     fontSize: 16,
//     color: "#1E3A8A",
//   },
//   rewardBannerSub: {
//     fontSize: 14,
//     color: "#1E40AF",
//   },
//   finalPriceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#16A34A",
//     marginTop: 8,
//   },

// });