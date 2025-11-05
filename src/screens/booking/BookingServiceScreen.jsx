import React, { useState } from "react";
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

export default function BookingServiceScreen({ navigation, route }) {
  const isEdit = route?.params?.isEdit || false;
  const existingBooking = route?.params?.booking || null;

  const [service, setService] = useState(
    isEdit
      ? { id: existingBooking.service, title: existingBooking.serviceName }
      : { id: null, title: "" }
  );

  const [appointmentDate, setAppointmentDate] = useState(
    isEdit ? existingBooking.appointment_date : null
  );

  const [appointmentTime, setAppointmentTime] = useState(
    isEdit ? existingBooking.appointment_time : null
  );

  const [vehicle, setVehicle] = useState(
    isEdit
      ? {
        make: existingBooking.vehicle_make,
        model: existingBooking.vehicle_model,
        year: existingBooking.vehicle_year,
      }
      : { make: "", model: "", year: "" }
  );

  const refreshAccessToken = async () => {
    try {
      const refresh = await AsyncStorage.getItem("refresh");
      if (!refresh) return null;

      const response = await axios.post(
        "http://192.168.1.12:8000/api/token/refresh/",
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
    if (!service.id || !appointmentDate || !appointmentTime || !vehicle.make || !vehicle.model || !vehicle.year) {
      Alert.alert("Missing Information", "Please fill all details before proceeding.");
      return;
    }

    let token = await AsyncStorage.getItem("access");

    if (!token) {
      Alert.alert("Authentication Error", "Please login again.");
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

      if (isEdit) {
        response = await axios.put(
          `http://192.168.1.12:8000/bookings/${existingBooking.id}/`,
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        Alert.alert(
          "Success",
          "Booking rescheduled successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Bookings", {
                  screen: "Bookings",
                  params: { refresh: true },
                });

              },
            },
          ]
        );

      } else {
        response = await axios.post(
          "http://192.168.1.12:8000/bookings/",
          bookingPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        navigation.navigate("BookingConfirmationScreen", {
          booking: { ...response.data, service_title: service.title },
        });
      }

    } catch (error) {
      console.log("Booking Error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong while processing booking.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title={isEdit ? "Reschedule Booking" : "Booking"} showBack={true} navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ServiceSelection
          selectedService={service}
          onSelectService={setService}
        />

        <DateTimePickerComponent
          defaultDate={appointmentDate}
          defaultTime={appointmentTime}
          onSelectDateTime={(d, t) => {
            setAppointmentDate(d);
            setAppointmentTime(t);
          }}
        />

        <VehicleDetailsForm
          defaultVehicle={vehicle}
          onChangeVehicle={setVehicle}
        />
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
