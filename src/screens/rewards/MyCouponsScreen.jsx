import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import { API_BASE } from "@env";

const BASE_URL = `${API_BASE}`;

export default function MyCouponsScreen({ navigation }) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      const res = await axios.get(`${BASE_URL}/api/coupons/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Handle both array and paginated object response
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      setCoupons(data);
    } catch (error) {
      console.log("Error fetching coupons:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to load coupons.");
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading Coupons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="My Coupons" showBack={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Array.isArray(coupons) && coupons.length > 0 ? (
          coupons.map((coupon) => (
            <View key={coupon.id} style={styles.card}>
              <ImageBackground
                source={require("../../assets/images/exterior_polishing.jpg")}
                style={styles.imageBackground}
              >
                <View style={styles.overlay}>
                  <Text style={styles.title}>{coupon.title}</Text>
                  <Text style={styles.subtitle}>
                    {coupon.description || "No description"}
                  </Text>
                </View>
              </ImageBackground>
              <View style={styles.cardFooter}>
                <Text style={styles.expiry}>Expires on {coupon.expiry_date}</Text>
                <View style={styles.codeRow}>
                  <Text style={styles.codeLabel}>Code:</Text>
                  <View style={styles.codeBox}>
                    <Text style={styles.codeText}>{coupon.code}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() =>
                    navigation.navigate("BookingServiceScreen", {
                      appliedCouponCode: coupon.code,
                      appliedCouponTitle: coupon.title,
                      appliedCouponId: coupon.id,
                    })
                  }
                >
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noCouponsText}>No coupons available right now.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 10, marginBottom: 20, elevation: 4 },
  imageBackground: { height: 120, justifyContent: "flex-end" },
  overlay: { backgroundColor: "rgba(0,0,0,0.4)", padding: 10 },
  title: { fontSize: 18, fontWeight: "700", color: "#fff" },
  subtitle: { color: "#ddd" },
  cardFooter: { padding: 12 },
  expiry: { fontSize: 12, color: "#777" },
  codeRow: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  codeLabel: { color: "#333", marginRight: 8 },
  codeBox: {
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  codeText: { color: "#fff", fontWeight: "600" },
  applyButton: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyText: { color: "#fff", fontWeight: "700" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  noCouponsText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginTop: 30,
  },
});
