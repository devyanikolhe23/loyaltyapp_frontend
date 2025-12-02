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

import { API_BASE } from "@env";
const BASE_URL = `${API_BASE}`;

export default function BookingServiceScreen({ navigation, route = {} }) {
  // ============================
  // ROUTE PARAMS
  // ============================
  const defaultVehicle = route?.params?.defaultVehicle || null;

  const {
    promo,
    offer,
    preselectedServices,
    discount,
    source,
    serviceId: incomingServiceId,
    offerId,
    discount: incomingDiscount,
    offerTitle: incomingOfferTitle,
    prefillData = {},
    rewardId,
    rewardTitle,
    rewardPoints,
    appliedCouponCode,
    appliedCouponTitle,
    earningRuleId,
    rewardType,
    rewardTitle: earningRuleTitle,
    minSpend,
  } = route.params || {};

  const isEdit = !!route.params?.isEdit;
  const existingBooking = route.params?.booking ?? {};

  // ============================
  // DATE & TIME
  // ============================
  const [appointmentDate, setAppointmentDate] = useState(
    isEdit ? existingBooking?.appointment_date ?? null : null
  );
  const [appointmentTime, setAppointmentTime] = useState(
    isEdit ? existingBooking?.appointment_time ?? null : null
  );

  // ============================
  // SERVICE SELECTION
  // ============================
  const [services, setServices] = useState(() => {
    if (rewardId) return [{ id: route.params?.serviceId }];
    if (isEdit && Array.isArray(existingBooking?.services)) {
      return existingBooking.services.map((s) => ({
        id: s.id,
        title: s.title,
      }));
    }
    if (incomingServiceId) return [{ id: incomingServiceId }];
    if (Array.isArray(preselectedServices) && preselectedServices.length > 0) {
      return preselectedServices.map((s) => ({
        id: s.id,
        title: s.title,
        price: s.price,
      }));
    }
    return [];
  });

  // ============================
  // VEHICLE STATE
  // ============================
  const [vehicle, setVehicle] = useState(() => {
    if (defaultVehicle) {
      return {
        make: defaultVehicle.make || "",
        model: defaultVehicle.model || "",
        year: defaultVehicle.year || "",
        vehicleNumber: defaultVehicle.vehicleNumber || "",
      };
    } else if (prefillData?.vehicle_make) {
      return {
        make: prefillData.vehicle_make || "",
        model: prefillData.vehicle_model || "",
        year: prefillData.vehicle_year || "",
        vehicleNumber: prefillData.vehicle_number || "",
      };
    } else if (isEdit) {
      return {
        make: existingBooking?.vehicle_make ?? "",
        model: existingBooking?.vehicle_model ?? "",
        year: existingBooking?.vehicle_year ?? "",
        vehicleNumber: existingBooking?.vehicle_number ?? "",
      };
    }
    return { id: null, make: "", model: "", year: "", vehicleNumber: "" };
  });

  // ============================
  // PRICE STATES
  // ============================
  const [originalPrice, setOriginalPrice] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  // ============================
  // OFFERS
  // ============================
  const [availableOffers, setAvailableOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    console.log("Route params →", route.params);
  }, [route.params]);

  // ============================
  // APPLY COUPON
  // ============================
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

      // Create booking if needed
      let tempBookingId = bookingId;
      if (!tempBookingId) {
        const bookingRes = await axios.post(`${BASE_URL}/bookings/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        tempBookingId = bookingRes.data.id;
        setBookingId(tempBookingId);
      }

      // Apply coupon
      const res = await axios.post(
        `${BASE_URL}/api/coupons/apply/`,
        { coupon_code: appliedCouponCode, booking_id: tempBookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOriginalPrice(res.data.original_price);
      setDiscountedPrice(res.data.discounted_price);

      Alert.alert("Coupon Applied", res.data.message);
    } catch (error) {
      const backendError = error.response?.data;
      console.log("Full Coupon Error →", backendError);

      let errorText =
        backendError?.detail ||
        backendError?.error ||
        backendError?.message ||
        backendError?.non_field_errors?.[0] ||
        backendError?.coupon_code?.[0] ||
        JSON.stringify(backendError);

      const lowerText = errorText.toLowerCase();
      let userMessage = "Coupon application failed.";

      if (lowerText.includes("expired")) {
        userMessage = `Sorry, coupon "${appliedCouponCode}" has expired.`;
      } else if (
        lowerText.includes("invalid") ||
        lowerText.includes("not found") ||
        lowerText.includes("does not exist")
      ) {
        userMessage = `Coupon code "${appliedCouponCode}" is invalid.`;
      } else if (
        lowerText.includes("already used") ||
        lowerText.includes("already applied")
      ) {
        userMessage = `Coupon "${appliedCouponCode}" has already been used.`;
      } else if (
        lowerText.includes("minimum") ||
        lowerText.includes("spend")
      ) {
        userMessage = errorText;
      } else if (
        lowerText.includes("not applicable") ||
        lowerText.includes("service")
      ) {
        userMessage = `Coupon "${appliedCouponCode}" is not valid for selected services.`;
      } else {
        userMessage = errorText.includes("Coupon")
          ? errorText
          : "Unable to apply coupon.";
      }

      Alert.alert("Coupon Error", userMessage);
    }
  };

  // Fetch valid offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/api/offers/`);
        if (!res.data) return;

        const now = new Date();
        const validOffers = res.data.filter(
          (o) =>
            o.is_active &&
            new Date(o.valid_from) <= now &&
            new Date(o.valid_to) >= now
        );

        setAvailableOffers(validOffers);

        if (offerId) {
          const offer = validOffers.find((o) => o.id === offerId);
          if (offer) {
            setSelectedOffer(offer);

            if (offer.offer_type === "fixed") {
              setServices(
                offer.services.map((s) => ({
                  id: s.id,
                  title: s.title,
                  price: s.price || 0,
                }))
              );
            } else if (offer.offer_type === "flexible") {
              Alert.alert(
                "Special Offer",
                `${offer.title} - ${offer.discount_percentage}% OFF!`
              );
            }
          }
        }
      } catch (err) {
        console.log("Error fetching offers:", err);
      }
    };

    fetchOffers();
  }, [offerId]);

  // Auto select from promotion
  useEffect(() => {
    const promoServices = route.params?.preselectedServices || [];
    const promoDiscount = route.params?.discount || 0;

    if (promoServices.length > 0) {
      setServices(
        promoServices.map((s) => ({
          id: s.id,
          title: s.title,
          price: s.price || 0,
        }))
      );
    }

    if (promoDiscount > 0) {
      setSelectedOffer({
        title: route.params.offerTitle || "Special Promotion",
        discount_percentage: promoDiscount,
      });
    }
  }, [route.params?.preselectedServices, route.params?.discount]);

  // ============================
  // TOKEN REFRESH
  // ============================
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

  // ============================
  // FETCH USER BOOKINGS
  // ============================
  const fetchUserBookings = async () => {
    try {
      let token = await AsyncStorage.getItem("access");
      if (!token) return [];

      try {
        const res = await axios.post(
          `${BASE_URL}/api/bookings/?no_pagination=true`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
      } catch (err) {
        if (err.response?.status === 401) {
          const newAccess = await refreshAccessToken();
          if (newAccess) {
            const retryRes = await axios.post(
              `${BASE_URL}/api/bookings/?no_pagination=true`,
              { headers: { Authorization: `Bearer ${newAccess}` } }
            );
            return retryRes.data;
          }
        }
        return [];
      }
    } catch (err) {
      console.log("Unexpected Fetch Error:", err);
      return [];
    }
  };

  // ============================
  // BLOCK BOOKING IF SAME CAR HAS ACTIVE BOOKING
  // ============================
  const checkActiveBookingForThisCar = async () => {
    const allBookings = await fetchUserBookings();
    if (!allBookings) return false;

    const activeBooking = allBookings.find(
      (b) =>
        b.vehicle_make === vehicle.make &&
        b.vehicle_model === vehicle.model &&
        b.vehicle_year === vehicle.year &&
        ["in_progress", "completed", "ready_for_pickup"].includes(b.status)
    );

    if (activeBooking) {
      Alert.alert(
        "Booking Not Allowed",
        "You cannot book a new service for this car until your current service is completed."
      );
      return true;
    }

    return false;
  };

  // ============================
  // HANDLE BOOKING
  // ============================
  const handleBooking = async () => {
    if (
      services.length === 0 ||
      !appointmentDate ||
      !appointmentTime ||
      !vehicle.make ||
      !vehicle.model ||
      !vehicle.year
    ) {
      Alert.alert("Missing Information", "Please fill all details.");
      return;
    }

    let token = await AsyncStorage.getItem("access");
    if (!token) {
      Alert.alert("Authentication Error", "Please login again.");
      return;
    }

    // Block if duplicate car service active
    const isBlocked = await checkActiveBookingForThisCar();
    if (isBlocked) return;

    // Determine discount
    let discount = 0;
    let offerTitle = "";

    if (route.params?.discount) {
      discount = route.params.discount;
      offerTitle = route.params.offerTitle || "";
    } else if (offerId) {
      const selectedOffer = availableOffers.find((o) => o.id === offerId);
      if (selectedOffer) {
        discount = selectedOffer.discount_percentage || 0;
        offerTitle = selectedOffer.title || "";
      }
    }

    const bookingPayload = {
      services: services.map((s) => s.id),
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      vehicle: vehicle.id,
      vehicle_make: vehicle.make,
      vehicle_model: vehicle.model,
      vehicle_year: vehicle.year,
      vehicle_number: vehicle.vehicleNumber,
      discount,
      offer_title: offerTitle,
      ...(rewardId ? { reward_id: rewardId } : {}),
      ...(earningRuleId ? { earningRuleId } : {}),
    };

    try {
      let finalBookingData;
      let finalTotalPrice = null;
      let originalPriceForDisplay = originalPrice;

      // EDIT BOOKING
      if (isEdit && existingBooking?.id) {
        await axios.put(
          `${BASE_URL}/api/bookings/${existingBooking.id}/`,
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        Alert.alert("Success", "Booking rescheduled!", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("MyBookingsScreen", { refresh: true }),
          },
        ]);
        return;
      }

      // CREATE NEW BOOKING
      if (bookingId) {
        const latestRes = await axios.get(
          `${BASE_URL}/api/bookings/${bookingId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        finalBookingData = latestRes.data;
        finalTotalPrice =
          discountedPrice || latestRes.data.total_price || 0;
      } else {
        const res = await axios.post(
          `${BASE_URL}/api/bookings/`,
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        finalBookingData = res.data;

        const selectedServicesWithPrice = services.map((s) => ({
          id: s.id,
          title: s.title,
          price: s.price || 0,
        }));

        finalTotalPrice = selectedServicesWithPrice.reduce(
          (sum, s) => sum + s.price,
          0
        );

        finalBookingData.selectedServices = selectedServicesWithPrice;
      }

      // SUCCESS MESSAGES
      let title = "Booking Confirmed";
      let message = `Your service has been booked successfully!`;

      if (rewardId) {
        title = "Reward Booking Confirmed";
        message = `${rewardTitle} booked!\nFinal Price: ₹${finalTotalPrice.toFixed(
          2
        )}`;
      } else if (earningRuleId) {
        const total = parseFloat(finalTotalPrice);
        const min = parseFloat(minSpend || 0);

        if (total >= min) {
          title = "Earn Points Booking Confirmed";
          message = `You earned bonus points!\nFinal Price: ₹${total.toFixed(
            2
          )}`;
        } else {
          const shortBy = (min - total).toFixed(2);
          message = `₹${shortBy} short of earning points!\nFinal Price: ₹${total.toFixed(
            2
          )}`;
        }
      } else if (appliedCouponCode) {
        title = "Coupon Applied!";
        const saved = (
          originalPriceForDisplay - finalTotalPrice
        ).toFixed(2);

        message = `Coupon ${appliedCouponCode} applied!\nYou saved ₹${saved}\nFinal Price: ₹${finalTotalPrice.toFixed(
          2
        )}`;
      }

      // Navigate to Confirmation
      Alert.alert(title, message, [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("Services", {
              screen: "BookingConfirmationScreen",
              params: {
                booking: finalBookingData,
                totalPrice: finalTotalPrice,
                originalPrice: originalPriceForDisplay,
                couponApplied: appliedCouponCode || null,
                discount: route.params?.discount || 0,
                offerTitle: route.params?.offerTitle || "",
                promo,
                source: promo ? "promotion" : "offer",
              },
            }),
        },
      ]);
    } catch (error) {
      console.log("Booking Error →", error.response?.data || error);
      Alert.alert(
        "Error",
        error.response?.data?.detail ||
        "Something went wrong. Please try again."
      );
    }
  };

  // ============================
  // UI / RETURN
  // ============================
  return (
    <View style={styles.container}>
      <Header
        title={isEdit ? "Reschedule Booking" : "Booking"}
        showBack={true}
        navigation={navigation}
      />

      {/* REWARD + RECALL BANNER */}
      {(rewardId || prefillData?.service_name) && (
        <View style={styles.rewardBanner}>
          <Text style={styles.rewardBannerText}>
            {prefillData?.service_name
              ? `Recall Service: ${prefillData.service_name}`
              : `🎁 Reward Applied: ${rewardTitle}`}
          </Text>

          {rewardPoints && (
            <Text style={styles.rewardBannerSub}>
              Points to be deducted: {rewardPoints}
            </Text>
          )}

          {route.params?.rewardType === "discount" && (
            <Text style={styles.rewardBannerSub}>
              Discount:{" "}
              {route.params.rewardDiscountValue <= 1
                ? `${(
                  route.params.rewardDiscountValue * 100
                ).toFixed(0)}% off`
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

      {/* EARNING RULE NOTE */}
      {earningRuleId && (
        <Text
          style={{
            marginBottom: 10,
            color: "#1E40AF",
            fontWeight: "500",
            marginHorizontal: 20,
          }}
        >
          Earn points on this booking! Minimum spend: ₹{minSpend}
        </Text>
      )}

      {/* COUPON BANNER */}
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

      {/* DISCOUNTED PRICE */}
      {discountedPrice && (
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>
            Original: ₹{originalPrice?.toFixed(2)} →{" "}
            <Text style={styles.discounted}>
              ₹{discountedPrice?.toFixed(2)}
            </Text>
          </Text>
        </View>
      )}

      {/* MAIN CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ServiceSelection
          selectedServices={services}
          onSelectServices={setServices}
          prefillServiceName={route.params?.prefillServiceName}   // ⭐ ADD THIS
          selectedOffer={selectedOffer}                           // (you already pass this sometimes)
          preselectedServices={preselectedServices}  // optional
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

      {/* BOOK NOW BUTTON */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookNowText}>
          {isEdit ? "Reschedule" : "Book Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ============================
// STYLES
// ============================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
  },
  bookButton: {
    backgroundColor: "#007AFF",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 24,
  },
  bookNowText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  rewardBanner: {
    backgroundColor: "#E0F2FE",
    padding: 14,
    borderRadius: 12,
    margin: 16,
  },
  rewardBannerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0C4A6E",
  },
  rewardBannerSub: {
    fontSize: 14,
    marginTop: 4,
    color: "#0369A1",
  },

  couponBanner: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  couponText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8A6D3B",
  },
  couponButton: {
    backgroundColor: "#E6B800",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  couponButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  priceBox: {
    backgroundColor: "#DCFCE7",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  priceText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#14532D",
  },
  discounted: {
    fontWeight: "700",
    color: "#166534",
  },
});
