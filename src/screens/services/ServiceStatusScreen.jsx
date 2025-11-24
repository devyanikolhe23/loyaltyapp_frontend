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

const BASE_URL = "http://192.168.1.8:8000";

// Progress steps for bookings
const statusSteps = [
  { key: "booked", label: "Service Booked", icon: "checkmark-circle-outline" },
  { key: "in_progress", label: "In Progress", icon: "reload-circle-outline" },
  { key: "completed", label: "Service Completed", icon: "checkmark-done-circle-outline" },
  { key: "ready_for_pickup", label: "Ready for Pickup", icon: "car-outline" },
];

// Map each service title to a unique Ionicons icon
const serviceIcons = {
  "Full car wash": "rainy-outline",
  "Interior Cleaning": "brush-outline",
  "Engine Oil Change": "water-outline",
  "Air Filter Replacement": "cloud-outline",
  "Wheel Alignment & Balancing": "navigate-outline",
  "AC Service": "snow-outline",
  "Clutch Replacement": "cog-outline",
  "Suspension Repair": "hammer-outline",
};

const ServiceStatusScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [servicesMap, setServicesMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch services and return map
  const fetchServices = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/services/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const servicesArray = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.results)
          ? res.data.results
          : [];

      const map = {};
      servicesArray.forEach((s) => {
        map[s.id] = s.title || s.name || "Service";
      });

      setServicesMap(map);
      return map;
    } catch (err) {
      console.error("Error fetching services:", err);
      return {};
    }
  };

  // Fetch bookings using services map
  const fetchBookings = async (token, map) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/bookings/?no_pagination=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const bookingsData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.results)
          ? res.data.results
          : [];

      const formattedBookings = bookingsData.map((b) => ({
        ...b,
        serviceNames: b.services?.map((id) => map[id]) || ["Service"],
      }));

      setBookings(formattedBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data once on mount
  useEffect(() => {
    const loadData = async () => {
      const token = await AsyncStorage.getItem("access");
      if (!token) return;

      const map = await fetchServices(token); // wait for services
      await fetchBookings(token, map);        // then fetch bookings
    };

    loadData();
  }, []);

  // Render progress tracker
  const renderProgress = (status) => {
    const currentIndex = statusSteps.findIndex((s) => s.key === status);
    return (
      <View style={styles.progressContainer}>
        {statusSteps.map((step, index) => {
          const isActive = index <= currentIndex;
          return (
            <View key={index} style={styles.stepContainer}>
              <View style={[styles.circle, isActive ? styles.circleActive : styles.circleInactive]}>
                <Ionicons name={step.icon} size={18} color={isActive ? "#fff" : "#A0AEC0"} />
              </View>
              <Text style={[styles.stepLabel, { color: isActive ? "#007AFF" : "#A0AEC0" }]}>
                {step.label}
              </Text>
              {index < statusSteps.length - 1 && (
                <View style={[styles.line, isActive && styles.lineActive]} />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  // Render each booking
  const renderBooking = ({ item }) => (
    <View style={styles.card}>
      {/* Vehicle info */}
      <View style={styles.vehicleHeader}>
        <Text style={styles.vehicleTitle}>
          {item.vehicle_make} {item.vehicle_model}
        </Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status.replace("_", " ").toUpperCase()}</Text>
        </View>
      </View>

      {/* Progress Tracker */}
      {renderProgress(item.status)}

      {/* Service Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Details</Text>
        {item.serviceNames && item.serviceNames.length > 0 ? (
          item.serviceNames.map((name, index) => {
            const iconName = serviceIcons[name] || "construct-outline";
            return (
              <View key={index} style={styles.serviceRow}>
                <Ionicons name={iconName} size={20} color="#007AFF" style={{ marginRight: 10 }} />
                <Text style={styles.sectionText}>{name}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.sectionText}>No services found</Text>
        )}
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
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#000" },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginVertical: 8, elevation: 2 },
  vehicleHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  vehicleTitle: { fontSize: 18, fontWeight: "700", color: "#000" },
  statusBadge: { backgroundColor: "#E0F0FF", paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10 },
  statusText: { color: "#007AFF", fontWeight: "600" },
  progressContainer: { marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  stepContainer: { alignItems: "center", flex: 1 },
  circle: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  circleActive: { backgroundColor: "#007AFF" },
  circleInactive: { backgroundColor: "#E5E7EB" },
  stepLabel: { fontSize: 12, textAlign: "center", fontWeight: "600" },
  line: { position: "absolute", top: 20, right: -25, width: 50, height: 2, backgroundColor: "#E5E7EB", zIndex: -1 },
  lineActive: { backgroundColor: "#007AFF" },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 6 },
  sectionText: { color: "#333", fontSize: 14 },
  serviceRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
});






