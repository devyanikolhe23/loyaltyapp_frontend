import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import Header from '../../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredPromotions, setFeaturedPromotions] = useState([]);
  const [banner, setBanner] = useState(null);


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

  useEffect(() => {
    fetchFeaturedPromotions();
  }, []);

  const fetchFeaturedPromotions = async () => {
    try {
      const token = await AsyncStorage.getItem("access");

      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const response = await axios.get(
        "http://192.168.1.15:8000/api/promotion-banners/",
        { headers }
      );

      if (Array.isArray(response.data)) {
        setFeaturedPromotions(response.data);
      } else if (Array.isArray(response.data.results)) {
        setFeaturedPromotions(response.data.results);
      }
    } catch (error) {
      console.log("Error fetching promotions:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Book Service Banner */}
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
              onPress={handleBookService}
            >
              <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
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

        {/* Recent Promotions */}
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
        </ScrollView>

        {/* Explore Section */}
        <Text style={styles.sectionTitle}>Explore</Text>
        <View style={styles.exploreGrid}>
          <TouchableOpacity
            style={styles.exploreCard}
            onPress={() => navigation.navigate("Services")}
          >
            <Icon name="car-outline" size={24} color="#2B70F7" />
            <Text style={styles.exploreText}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exploreCard}
            onPress={() => navigation.navigate("Support")}
          >
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

          <TouchableOpacity
            style={styles.exploreCard}
            onPress={() => navigation.navigate("Showroom")}
          >
            <Icon name="location-outline" size={24} color="#2B70F7" />
            <Text style={styles.exploreText}>Find Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },

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

  sectionTitle: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '600',
  },

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
