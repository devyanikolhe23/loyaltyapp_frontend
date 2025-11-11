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
import ServiceSelection from "../../components/bookingService/ServiceSelection";
import DateTimePickerComponent from "../../components/bookingService/DateTimePicker";
import VehicleDetailsForm from "../../components/bookingService/VehicleDetailsForm";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookingServiceScreen({ navigation, route = {} }) {
  // safe defaults
  const isEdit = !!route.params?.isEdit;
  const existingBooking = route.params?.booking ?? {}; // make it an object

  // lazy initializer to avoid reading potentially undefined values during module evaluation
  const [service, setService] = useState(() => {
    return isEdit && existingBooking?.service
      ? { id: existingBooking.service, title: existingBooking.serviceName ?? "" }
      : { id: null, title: "" };
  });

  const [appointmentDate, setAppointmentDate] = useState(() => {
    return isEdit ? existingBooking?.appointment_date ?? null : null;
  });

  const [appointmentTime, setAppointmentTime] = useState(() => {
    return isEdit ? existingBooking?.appointment_time ?? null : null;
  });

  const [vehicle, setVehicle] = useState(() => {
    return isEdit
      ? {
          make: existingBooking?.vehicle_make ?? "",
          model: existingBooking?.vehicle_model ?? "",
          year: existingBooking?.vehicle_year ?? "",
        }
      : { make: "", model: "", year: "" };
  });

  // small debug to confirm mounting & initial state
  useEffect(() => {
    console.log("BookingServiceScreen mounted", {
      isEdit,
      existingBooking,
      service,
      appointmentDate,
      appointmentTime,
      vehicle,
    });
  }, []);

  const refreshAccessToken = async () => {
    try {
      const refresh = await AsyncStorage.getItem("refresh");
      if (!refresh) return null;

      const response = await axios.post(
        "http://192.168.1.15:8000/api/token/refresh/",
        { refresh }
      );

      const newAccess = response.data.access;
      await AsyncStorage.setItem("access", newAccess);
      return newAccess;
    } catch (err) {
      return null;
    }
  };

  const handleBooking = async () => {
    if (
      !service?.id ||
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

    const bookingPayload = {
      service: service.id,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      vehicle_make: vehicle.make,
      vehicle_model: vehicle.model,
      vehicle_year: vehicle.year,
    };

    try {
      let response;

      if (isEdit && existingBooking?.id) {
        response = await axios.put(
          `http://192.168.1.15:8000/bookings/${existingBooking.id}/`,
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        Alert.alert("Success", "Booking rescheduled successfully!", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Bookings", {
                screen: "Bookings",
                params: { refresh: true },
              });
            },
          },
        ]);
      } else {
        response = await axios.post(
          "http://192.168.1.15:8000/bookings/",
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // CHOOSE the correct navigation depending on your navigator:
        // Option A: If BookingConfirmationScreen is registered at root stack:
        // navigation.navigate("BookingConfirmationScreen", { booking: { ...response.data, service_title: service.title } });

        // Option B: If BookingConfirmationScreen is inside a nested 'Services' stack:
        navigation.navigate("Services", {
          screen: "BookingConfirmationScreen",
          params: { booking: { ...response.data, service_title: service.title } },
        });
      }
    } catch (error) {
      console.log("Booking Error:", error?.response?.data ?? error.message ?? error);
      Alert.alert("Error", "Something went wrong while processing booking.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title={isEdit ? "Reschedule Booking" : "Booking"} showBack={true} navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ServiceSelection selectedService={service} onSelectService={setService} />

        <DateTimePickerComponent
          defaultDate={appointmentDate}
          defaultTime={appointmentTime}
          onSelectDateTime={(d, t) => {
            setAppointmentDate(d);
            setAppointmentTime(t);
          }}
        />

        <VehicleDetailsForm defaultVehicle={vehicle} onChangeVehicle={setVehicle} />
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
    marginTop: 24,
  },
  bookNowText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
