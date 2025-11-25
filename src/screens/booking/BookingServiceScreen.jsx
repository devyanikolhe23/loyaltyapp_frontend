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
  const { promo, offer, preselectedServices, discount, source } =
    route.params || {};

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

  const [availableOffers, setAvailableOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

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

  // Fetch all active offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://192.168.1.15:8000/api/offers/");
        if (!res.data) return;

        const now = new Date();
        const validOffers = res.data.filter(
          (offer) =>
            offer.is_active &&
            new Date(offer.valid_from) <= now &&
            new Date(offer.valid_to) >= now
        );

        setAvailableOffers(validOffers);

        if (offerId) {
          const offer = validOffers.find((o) => o.id === offerId);
          if (offer) {
            setSelectedOffer(offer);

            if (offer.offer_type === "fixed" && offer.services.length > 0) {
              // Auto-select fixed services
              setServices(
                offer.services.map((s) => ({
                  id: s.id,
                  title: s.title,
                  price: s.price || 0,
                }))
              );
            } else if (offer.offer_type === "flexible") {
              // Flexible offer → customer picks services freely
              Alert.alert(
                "Special Offer",
                `${offer.title} - ${offer.discount_percentage}% off! Select any service.`
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


  // If user came from an Offer → auto-select the service
  useEffect(() => {
    const serviceIds = route.params?.serviceIds || []; // always array
    if (serviceIds.length > 0) {
      const autoSelectServices = async () => {
        try {
          // Fetch all services in parallel
          const requests = serviceIds.map((id) =>
            axios.get(`http://192.168.1.15:8000/api/services/${id}/`)
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


  // =====================
  // ⭐ PROMOTION AUTO SELECTION (PUT THIS HERE)
  // =====================
  useEffect(() => {
    // Auto-apply banner promotion services
    const promoServices = route.params?.preselectedServices || [];
    const promoDiscount = route.params?.discount || 0;

    if (promoServices.length > 0) {
      setServices(
        promoServices.map(s => ({
          id: s.id,
          title: s.title,
          price: s.price || 0
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


  // ======================================================
  // 🔥 Fetch All User Bookings (used to block booking)
  // ======================================================
  const fetchUserBookings = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return [];

      const res = await axios.get(
        "http://192.168.1.15:8000/api/bookings/?no_pagination=true",
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

    // Determine discount
    let discount = 0;
    let offerTitle = "";

    // 1️⃣ If coming from a preselected banner promotion
    if (route.params?.discount) {
      discount = route.params.discount;
      offerTitle = route.params.offerTitle || "";
    }

    // 2️⃣ Else if coming from a selected offer in the system
    else if (offerId) {
      const selectedOffer = availableOffers.find(o => o.id === offerId);
      if (selectedOffer) {
        discount = selectedOffer.discount_percentage || 0;
        offerTitle = selectedOffer.title || "";
      }
    }

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
      discount,       // include discount in booking payload
      offer_title: offerTitle
    };

    try {
      let response;

      // ========== EDIT BOOKING ==========
      if (isEdit && existingBooking?.id) {
        response = await axios.put(
          `http://192.168.1.15:8000/api/bookings/${existingBooking.id}/`,
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
        "http://192.168.1.15:8000/api/bookings/",
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
              promo: route.params?.promo || null,
              source: route.params?.promo ? "promotion" : "offer",
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
        <ServiceSelection selectedServices={services} onSelectServices={setServices} selectedOffer={selectedOffer} />

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
