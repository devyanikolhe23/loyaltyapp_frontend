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


export default function BookingServiceScreen({ navigation, route = {} }) {
  const defaultVehicle = route?.params?.defaultVehicle || null;
  console.log("Incoming defaultVehicle:", route.params?.defaultVehicle);

  const isEdit = !!route.params?.isEdit;
  const existingBooking = route.params?.booking ?? {};

  // =====================
  // OFFER PARAMS HANDLING
  // =====================
  const offerId = route.params?.offerId || null;
  const incomingServiceId = route.params?.serviceId || null;
  const incomingDiscount = route.params?.discount || 0;
  const incomingOfferTitle = route.params?.offerTitle || "";

  const [services, setServices] = useState(() => {
    return isEdit && Array.isArray(existingBooking?.services)
      ? existingBooking.services.map(s => ({
        id: s.id,
        title: s.title,
      }))
      : [];
  });

  const [appointmentDate, setAppointmentDate] = useState(
    isEdit ? existingBooking?.appointment_date ?? null : null
  );

  const [appointmentTime, setAppointmentTime] = useState(
    isEdit ? existingBooking?.appointment_time ?? null : null
  );

  const [vehicle, setVehicle] = useState(() =>
    isEdit
      ? {
        make: existingBooking?.vehicle_make ?? "",
        model: existingBooking?.vehicle_model ?? "",
        year: existingBooking?.vehicle_year ?? "",
      }
      : { id: null, make: "", model: "", year: "", vehicleNumber: "" }
  );

  useEffect(() => {
    if (route.params?.defaultVehicle) {
      setVehicle({
        id: route.params.defaultVehicle.id,
        make: route.params.defaultVehicle.make || "",
        model: route.params.defaultVehicle.model || "",
        year: route.params.defaultVehicle.year || "",
        vehicleNumber:
          route.params.defaultVehicle.vehicleNumber ||
          route.params.defaultVehicle.vehicle_number ||
          "",
      });
    }
  }, [route.params?.defaultVehicle]);

  // If user came from an Offer → auto-select the service
  useEffect(() => {
    const serviceIds = route.params?.serviceIds || []; // always array
    if (serviceIds.length > 0) {
      const autoSelectServices = async () => {
        try {
          // Fetch all services in parallel
          const requests = serviceIds.map((id) =>
            axios.get(`http://192.168.1.8:8000/api/services/${id}/`)
          );

          const responses = await Promise.all(requests);
          const fetchedServices = responses.map((res) => ({
            id: res.data.id,
            title: res.data.title,
            price: res.data.price,
          }));

          setServices(fetchedServices); // this will auto-update ServiceSelection
        } catch (err) {
          console.log("Error auto-selecting services:", err);
        }
      };

      autoSelectServices();
    }
  }, [route.params?.serviceIds]);




  // ======================================================
  // 🔥 Fetch All User Bookings (used to block booking)
  // ======================================================
  const fetchUserBookings = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return [];

      const res = await axios.get(
        "http://192.168.1.8:8000/api/bookings/?no_pagination=true",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (err) {
      console.log("Fetch Booking Error:", err);
      return [];
    }
  };

  // ======================================================
  // 🔥 BLOCK BOOKING IF SAME CAR HAS ACTIVE SERVICE
  // ======================================================
  const checkActiveBookingForThisCar = async () => {
    const allBookings = await fetchUserBookings();

    if (!allBookings || allBookings.length === 0) return false;

    const activeBooking = allBookings.find(b =>
      b.vehicle_make === vehicle.make &&
      b.vehicle_model === vehicle.model &&
      b.vehicle_year === vehicle.year &&
      ["in_progress", "completed", "ready_for_pickup"].includes(b.status)
    );

    if (activeBooking) {
      Alert.alert(
        "Booking Not Allowed",
        "You cannot book a new service for this car until your current service is completed/closed."
      );
      return true; // ❌ block
    }

    return false; // 👍 allow
  };

  // ======================================================
  // ➕ BOOKING HANDLER
  // ======================================================
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

    // 🚫 BLOCK BOOKING FOR SAME CAR
    const isBlocked = await checkActiveBookingForThisCar();
    if (isBlocked) return;

    // ========== Prepare Payload ==========
    const bookingPayload = {
      services: services.map(s => s.id),
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      vehicle: vehicle.id,
      vehicle_make: vehicle.make,
      vehicle_model: vehicle.model,
      vehicle_year: vehicle.year,
      vehicle_number: vehicle.vehicleNumber,
    };

    try {
      let response;

      // ========== EDIT BOOKING ==========
      if (isEdit && existingBooking?.id) {
        response = await axios.put(
          `http://192.168.1.8:8000/api/bookings/${existingBooking.id}/`,
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        Alert.alert("Success", "Booking rescheduled successfully!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Bookings", { refresh: true }),
          },
        ]);

        return;
      }

      // ========== CREATE NEW BOOKING ==========
      response = await axios.post(
        "http://192.168.1.8:8000/api/bookings/",
        bookingPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const selectedServicesWithPrice = services.map(s => ({
        id: s.id,
        title: s.title,
        price: s.price || 0,
      }));

      // Calculate total price
      const totalPrice = selectedServicesWithPrice.reduce((sum, s) => sum + s.price, 0);

      Alert.alert("Booking Successful", "Your service has been booked!", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("BookingConfirmationScreen", {
              booking: response.data,
              selectedServices: selectedServicesWithPrice,
              totalPrice,
              discount: route.params?.discount || 0,
              offerTitle: route.params?.offerTitle || "",
            }),
        },
      ]);
    } catch (error) {
      console.log("Booking Error:", error?.response?.data ?? error.message);
      Alert.alert(
        "Error",
        `Booking failed: ${error?.response?.data?.detail || error.message || "Unknown error"
        }`
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

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <ServiceSelection selectedServices={services} onSelectServices={setServices} />

        <DateTimePickerComponent
          defaultDate={appointmentDate}
          defaultTime={appointmentTime}
          onSelectDateTime={(date, time) => {
            setAppointmentDate(date);
            setAppointmentTime(time);
          }}
        />

        {/* <VehicleDetailsForm defaultVehicle={vehicle} onChangeVehicle={setVehicle} /> */
          <VehicleDetailsForm defaultVehicle={vehicle} onChangeVehicle={setVehicle} />
        }
      </ScrollView>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookNowText}>{isEdit ? "Reschedule" : "Book Now"}</Text>
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
});
