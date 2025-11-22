import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`;
const statusSteps = [
  { key: "booked", label: "Service Booked", icon: "checkmark-circle-outline" },
  { key: "in_progress", label: "In Progress", icon: "reload-circle-outline" },
  { key: "completed", label: "Service Completed", icon: "checkmark-done-circle-outline" },
  { key: "ready_for_pickup", label: "Ready for Pickup", icon: "car-outline" },
];

const ServiceStatusScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      const res = await axios.get(`${BASE_URL}/bookings/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("SERVICE STATUS BOOKINGS:", JSON.stringify(res.data, null, 2));

      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const renderProgress = (status) => {
    const currentIndex = statusSteps.findIndex((s) => s.key === status);

    return (
      <View style={styles.progressContainer}>
        {statusSteps.map((step, index) => {
          const isActive = index <= currentIndex;

          return (
            <View key={index} style={styles.stepContainer}>
              <View
                style={[
                  styles.circle,
                  isActive ? styles.circleActive : styles.circleInactive,
                ]}
              >
                <Ionicons
                  name={step.icon}
                  size={18}
                  color={isActive ? "#fff" : "#A0AEC0"}
                />
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  { color: isActive ? "#007AFF" : "#A0AEC0" },
                ]}
              >
                {step.label}
              </Text>

              {/* Line connector */}
              {index < statusSteps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    isActive && styles.lineActive,
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderBooking = ({ item }) => (
    <View style={styles.card}>
      {/* Vehicle info */}
      <View style={styles.vehicleHeader}>
        <View>
          <Text style={styles.vehicleTitle}>
            {item.vehicle_make} {item.vehicle_model}
          </Text>
          {/* <Text style={styles.vehicleSubtitle}>
            Reg. No: {item.vehicle_registration_number}
          </Text> */}
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {item.status.replace("_", " ").toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Progress Tracker */}
      {renderProgress(item.status)}

      {/* Service Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Details</Text>
        <Text style={styles.sectionText}>
          {item.service_title || "No services found"}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Status</Text>
        <Ionicons name="notifications-outline" size={22} color="#000" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBooking}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default ServiceStatusScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FBFC", padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#000" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  vehicleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleTitle: { fontSize: 18, fontWeight: "700", color: "#000" },
  vehicleSubtitle: { fontSize: 14, color: "#666", marginTop: 2 },
  statusBadge: {
    backgroundColor: "#E0F0FF",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  statusText: { color: "#007AFF", fontWeight: "600" },

  // 🔵 Progress Tracker
  progressContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepContainer: {
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  circleActive: { backgroundColor: "#007AFF" },
  circleInactive: { backgroundColor: "#E5E7EB" },
  stepLabel: { fontSize: 12, textAlign: "center", fontWeight: "600" },
  line: {
    position: "absolute",
    top: 20,
    right: -25,
    width: 50,
    height: 2,
    backgroundColor: "#E5E7EB",
    zIndex: -1,
  },
  lineActive: { backgroundColor: "#007AFF" },

  section: { marginTop: 16 },
  sectionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 6 },
  sectionText: { color: "#333", fontSize: 14 },
});



