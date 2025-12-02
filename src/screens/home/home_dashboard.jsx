import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import Header from '../../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE } from "@env"; // Use env for consistency

const BASE_URL = `${API_BASE}`;

export default function HomeScreen() {
  const navigation = useNavigation();

  // ===== Recall Data =====
  const [recalls, setRecalls] = useState([]);

  // ===== Promotions =====
  const [featuredPromotions, setFeaturedPromotions] = useState([]);
  const [banner, setBanner] = useState(null);

  const [loading, setLoading] = useState(true);

  // ===== FETCH RECALLS AND PROMOTIONS =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("access");

        // Fetch recalls
        const recallsRes = await axios.get(`${BASE_URL}/api/home/recalls`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setRecalls(recallsRes.data || []);

        // Fetch promotions
        const promoRes = await axios.get(`${BASE_URL}/api/promotion-banners/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (Array.isArray(promoRes.data)) {
          setFeaturedPromotions(promoRes.data);
        } else if (Array.isArray(promoRes.data.results)) {
          setFeaturedPromotions(promoRes.data.results);
        }
      } catch (error) {
        console.log("❌ Fetch Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ===== HANDLE RECALL STATUS =====
  const handleCheckStatus = (item) => {
    if (item.status === "completed") {
      Alert.alert("Recall Status", "✅ This recall service was already completed.");
    } else {
      Alert.alert("Recall Status", "⚙️ This recall service is still active or pending.");
    }
  };

  // ===== HANDLE SCHEDULE SERVICE =====
  const handleScheduleService = async (item) => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) {
        Alert.alert("Login Required", "Please login again.");
        navigation.navigate("LoginScreen");
        return;
      }

      let prefillData = {
        vehicle_make: item.vehicle.split(" ")[0],
        vehicle_model: item.vehicle.split(" ").slice(1, -1).join(" "),
        vehicle_year: item.vehicle.match(/\d{4}/)?.[0] || "",
        service_name: item.recall_title,
        notes: `Recall: ${item.recall_number} - ${item.recall_title}`,
      };

      const endpoint =
        item.status === "completed"
          ? `${BASE_URL}/api/vehicle-recalls/${item.id}/service_again/`
          : `${BASE_URL}/api/vehicle-recalls/${item.id}/schedule_service/`;

      try {
        const response = await axios.post(endpoint, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data?.prefill_data) {
          prefillData = { ...prefillData, ...response.data.prefill_data };
        }
      } catch (apiError) {
        console.log("Recall endpoint failed (optional):", apiError.response?.data);
      }

      navigation.navigate("BookingServiceScreen", { prefillData });
    } catch (error) {
      console.log("Navigation error:", error);
      Alert.alert("Error", "Failed to open booking form.");
    }
  };

  // ===== HANDLE PROMOTION BOOKING =====
  const handleBookService = async () => {
    const guest = await AsyncStorage.getItem("guest");
    const user = await AsyncStorage.getItem("user");

    if (guest === "true" && !user) {
      Alert.alert(
        "Login Required",
        "Please login first to book a service.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Login", onPress: () => navigation.navigate("Login") }
        ]
      );
      return;
    }

    navigation.navigate("BookingServiceScreen");
  };

  // ===== LOADING STATE =====
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2B70F7" />
        <Text style={{ color: '#555', marginTop: 10 }}>Loading your dashboard...</Text>
      </View>
    );
  }

return (
  <SafeAreaView style={styles.container}>
    <Header title="Home" />
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* 🚗 Vehicle Recalls Slider */}
      {
        recalls.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Vehicle Recalls</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recallsSlider}
            >
              {recalls.map((item, index) => (
                <View key={item.id} style={styles.recallCard}>
                  <View style={styles.recallHeader}>
                    <Text style={styles.recallTitle}>{item.recall_title}</Text>
                    <Text style={[styles.recallTag, {
                      backgroundColor:
                        item.urgency === "urgent" ? "#B91C1C" :
                          item.urgency === "important" ? "#B45309" : "#2563EB",
                    }]}>
                      {item.urgency.toUpperCase()}
                    </Text>
                  </View>

                  <Text style={styles.recallVehicle}>{item.vehicle}</Text>
                  <Text style={styles.recallDesc} numberOfLines={3}>
                    {item.description}
                  </Text>

                  {/* Show green checkmark if completed */}
                  {item.status === 'completed' && (
                    <Text style={styles.completedText}>
                      This recall was completed on {item.last_service_date || 'recently'}
                    </Text>
                  )}

                  <View style={styles.recallBtnRow}>
                    {/* Always show Schedule / Service Again */}
                    <TouchableOpacity
                      style={[styles.recallButton, {
                        backgroundColor: item.status === 'completed' ? "#16A34A" : "#2B70F7"
                      }]}
                      onPress={() => handleScheduleService(item)}
                    >
                      <Text style={styles.recallBtnText}>
                        {item.status === 'completed' ? "Service Again" : "Schedule Service"}
                      </Text>
                    </TouchableOpacity>

                    {/* Optional: Check Status button */}
                    <TouchableOpacity
                      style={[styles.recallButton, { backgroundColor: "#6B7280" }]}
                      onPress={() => handleCheckStatus(item)}
                    >
                      <Text style={styles.recallBtnText}>Check Status</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        )
      }

      {/* 🏎️ Book Service Banner (unchanged) */}
      {
        recalls.length === 0 && (
          <View style={styles.banner}>
            <Image
              source={{ uri: 'https://www.linkpicture.com/q/sportscar.png' }}
              style={styles.bannerImage}
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>Book Your Next Service</Text>
              <Text style={styles.bannerSubtitle}>
                Quick and easy booking for all your car needs.
              </Text>
              <TouchableOpacity
                style={styles.bookNowButton}
                onPress={() => navigation.navigate("BookingServiceScreen")}
              >
                <Text style={styles.bookNowText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }

      {/* ⚙️ Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickActionCard}
          onPress={handleBookService}
        >
          <Icon name="build-outline" size={24} color="#2B70F7" />
          <Text style={styles.quickActionText}>Book a Service</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Services', { screen: 'ServiceStatusScreen' })}
        >
          <Icon name="clipboard-outline" size={24} color="#2B70F7" />
          <Text style={styles.quickActionText}>Service Status</Text>
        </TouchableOpacity>
      </View>

      {/* 🎯 Recent Promotions (unchanged) */}
      <Text style={styles.sectionTitle}>Recent Promotions</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.promotions}
      >
        {featuredPromotions.length === 0 ? (
          <Text style={{ marginLeft: 20, color: "#555" }}>No promotions available</Text>
        ) : (
          featuredPromotions.map((promo) => (
            <View key={promo.id} style={styles.promoCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PromotionsScreen", { promo })
                }
              >
                <Image
                  source={{ uri: promo.image }}
                  style={styles.promoImage}
                />
              </TouchableOpacity>

              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoText}>
                {promo.short_description || promo.description}
              </Text>
            </View>
          ))
        )}
      </ScrollView >

      {/* 🔍 Explore Section (unchanged) */}
      < Text style={styles.sectionTitle} > Explore</Text >
      <View style={styles.exploreGrid}>
        <TouchableOpacity style={styles.exploreCard} onPress={() => navigation.navigate("Services")}>
          <Icon name="car-outline" size={24} color="#2B70F7" />
          <Text style={styles.exploreText}>Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exploreCard} onPress={() => navigation.navigate("Support")}>
          <Icon name="headset-outline" size={24} color="#2B70F7" />
          <Text style={styles.exploreText}>Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exploreCard}
          onPress={() => navigation.navigate('OfferScreen')}
        >
          <Icon name="pricetag-outline" size={24} color="#2B70F7" />
          <Text style={styles.exploreText}>Offers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exploreCard} onPress={() => navigation.navigate("Showroom")}>
          <Icon name="location-outline" size={24} color="#2B70F7" />
          <Text style={styles.exploreText}>Find Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView >
  </SafeAreaView >
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },

  /* --------------------------------------
     🔹 RECALL SLIDER
  -------------------------------------- */
  recallsSlider: {
    marginTop: 10,
    paddingLeft: 20,
  },

  recallCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 15,
    width: 260,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  recallHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  recallTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  recallTag: {
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    fontWeight: '700',
    fontSize: 12,
  },

  recallVehicle: {
    color: '#6B7280',
    marginTop: 6,
    fontSize: 13,
  },

  recallDesc: {
    color: '#374151',
    marginTop: 6,
    lineHeight: 18,
  },

  completedText: {
    color: '#16A34A',
    marginTop: 6,
    fontWeight: '500',
  },

  recallBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  recallButton: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },

  recallBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  /* --------------------------------------
     🔹 BOOK NOW BANNER
  -------------------------------------- */
  banner: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },

  bannerImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    position: 'absolute',
  },

  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    height: 160,
    justifyContent: 'center',
  },

  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  bannerSubtitle: {
    color: '#fff',
    marginTop: 5,
  },

  bookNowButton: {
    backgroundColor: '#2B70F7',
    padding: 10,
    marginTop: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  bookNowText: {
    color: '#fff',
    fontWeight: '600',
  },

  /* --------------------------------------
     🔹 SECTION TITLES
  -------------------------------------- */
  sectionTitle: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '600',
  },

  /* --------------------------------------
     🔹 QUICK ACTIONS
  -------------------------------------- */
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },

  quickActionCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  quickActionText: {
    marginTop: 8,
    fontWeight: '500',
  },

  /* --------------------------------------
     🔹 PROMOTIONS
  -------------------------------------- */
  promotions: {
    marginTop: 15,
    paddingLeft: 20,
  },

  promoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 220,
  },

  promoImage: {
    width: '100%',
    height: 110,
    borderRadius: 8,
  },

  promoTitle: {
    fontWeight: '600',
    marginTop: 10,
  },

  promoText: {
    color: '#555',
    marginTop: 4,
  },

  /* --------------------------------------
     🔹 EXPLORE GRID
  -------------------------------------- */
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginTop: 15,
    justifyContent: 'space-between',
  },

  exploreCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  exploreText: {
    marginTop: 8,
    fontWeight: '500',
  },
});
