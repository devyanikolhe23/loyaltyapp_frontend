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
  
  useEffect(() => {
    console.log("Route params →", route.params);
  }, [route.params]);

  // === State Management ===
  const [services, setServices] = useState(() => {
    if (rewardServiceId) {
      // ✅ If reward passed → lock that service
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

  // Debug mount info
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

  // === Booking Handler ===
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
      Alert.alert("Authentication Error", "Please login again.", [
        { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
      ]);
      return;
    }

    // ✅ Ensure we send an array of IDs only
    const bookingPayload = {
      services: services.map((s) => s.id), // <--- array of service IDs
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      vehicle_make: vehicle.make,
      vehicle_model: vehicle.model,
      vehicle_year: vehicle.year,
      ...(rewardId ? { reward_id: rewardId } : {}),
    };

    console.log("Booking Payload:", bookingPayload);

    try {
      let response;

      if (isEdit && existingBooking?.id) {
        response = await axios.put(
          `${BASE_URL}/bookings/${existingBooking.id}/`,
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        Alert.alert("Success", "Booking rescheduled successfully!", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("MyBookingsScreen", { refresh: true }),
          },
        ]);
      } else {
        response = await axios.post(
          `${BASE_URL}/bookings/`,
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (rewardId) {
          Alert.alert(
            "Reward Booking Confirmed",
            `Your booking for "${rewardTitle}" has been created successfully!\n\nTotal Price:₹${response.data.total_price} . Points will be deducted after service completion.`,
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("Services", {
                    screen: "BookingConfirmationScreen",
                    params: { booking: response.data },
                    totalPrice: response.data.total_price,
                    rewardType: route.params?.rewardType,
                  });
                },
              },
            ]
          );
        } else {
          Alert.alert("Booking Successful", "Your service has been booked successfully!", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Services", {
                  screen: "BookingConfirmationScreen",
                  params: { booking: response.data },
                  totalPrice: response.data.total_price,
                  rewardType: route.params?.rewardType,
                });
              },
            },
          ]);
        }
      }
    } catch (error) {
      console.log("Booking Error:", error?.response?.data ?? error.message);
      Alert.alert(
        "Error",
        `Booking failed: ${error?.response?.data?.detail || error.message}`
      );
    }
  };
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
          {/* Title */}
          <Text style={styles.rewardBannerText}>
            {prefillData?.service_name
              ? `Recall Service: ${prefillData.service_name}`
              : `🎁Reward Applied: ${rewardTitle}`}
          </Text>

          {/* Points only for real rewards */}
          {rewardPoints && (
            <Text style={styles.rewardBannerSub}>
              Points to be deducted: {rewardPoints}
            </Text>
          )}

          {/* Discount type info */}
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

          {/* FINAL PRICE — NOW SHOWS FOR RECALLS TOO */}
          {/* <Text style={styles.finalPriceText}>
            Final Price: ₹
            {route.params?.finalPrice !== undefined
              ? parseFloat(route.params.finalPrice).toFixed(2)
              : route.params?.totalPrice
                ? parseFloat(route.params.totalPrice).toFixed(2)
                : "0.00"}
          </Text> */}
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
  bookNowText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  rewardBanner: {
    backgroundColor: "#E0F2FE",
    margin: 16,
    padding: 12,
    borderRadius: 10,
    borderColor: "#3B82F6",
    borderWidth: 1,
  },
  rewardBannerText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1E3A8A",
  },
  rewardBannerSub: {
    fontSize: 14,
    color: "#1E40AF",
  },
  finalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16A34A",
    marginTop: 8,
  },

});