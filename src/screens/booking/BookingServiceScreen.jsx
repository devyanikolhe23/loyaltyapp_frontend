
import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ServiceSelection from "../../components/bookingService/ServiceSelection";
import DateTimePicker from "../../components/bookingService/DateTimePicker";
import VehicleDetailsForm from "../../components/bookingService/VehicleDetailsForm";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
export default function BookingServiceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Bookings" showBack={false} />
      {/* Header — same style as ServiceScreen */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Service</Text>
        <View style={styles.rightSpacer} /> 
      </View> */}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ServiceSelection />
        <DateTimePicker />
        <VehicleDetailsForm />
      </ScrollView>
      <TouchableOpacity
  style={styles.bookButton}
  onPress={() => navigation.navigate('BookingConfirmationScreen')}>
  <Text style={styles.bookNowText}>Book Now</Text>
</TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // header: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   padding: 16,
  //   backgroundColor: "#fff",
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#eee",
  // },
  // headerTitle: {
  //   fontSize: 18, // match ServiceScreen
  //   fontWeight: "700",
  //   color: "#000",
  // },
  scrollContent: {
    padding: 20,
  
  },
   bookButton: {
    backgroundColor: '#007AFF',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
    shadowOffset: { width: 0, height: 3 },
    
  },
  bookNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // rightSpacer: {
  //   width: 24,
  // },
});