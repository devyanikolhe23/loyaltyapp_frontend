import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const BASE_URL = "http://192.168.1.15:8000/api";
const { width } = Dimensions.get("window");

export default function PromotionsPage({ route = {} }) {
  const { promo: selectedPromo } = route.params || {};
  const navigation = useNavigation();

  const [banner, setBanner] = useState(null); // currently shown banner (full promo object)
  const [featured, setFeatured] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);


  useEffect(() => {
    const initialize = async () => {
      const token = await AsyncStorage.getItem("access");
      setUserToken(token);
      loadPromotions(token);
    };
    initialize();
  }, []);


  const loadPromotions = async (token) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("access");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [bannerRes, featuredRes] = await Promise.all([
        axios.get(`${BASE_URL}/promotion-banners/`, { headers }),
        axios.get(`${BASE_URL}/featured-promotions/`, { headers }),
      ]);

      // If route passed a promo, prefer it (it should already be a full object)
      if (selectedPromo) {
        setBanner(selectedPromo);
      } else {
        // bannerRes.data may be paginated or array
        const bannerData = Array.isArray(bannerRes.data)
          ? bannerRes.data
          : bannerRes.data.results || [];
        setBanner(bannerData[0] || null);
      }

      // featured promotions: normalize
      const featuredData = Array.isArray(featuredRes.data)
        ? featuredRes.data
        : featuredRes.data.results || [];

      setFeatured(featuredData);
    } catch (error) {
      console.log("Error loading promotions:", error);
      Alert.alert("Error", "Failed to load promotions. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Robust helper: given an offer object, return services in {id, title, price} format
  const resolveServicesFromOffer = async (offer) => {
    if (!offer) return [];

    // If offer already supplies services with details
    if (Array.isArray(offer.services_with_details) && offer.services_with_details.length) {
      return offer.services_with_details.map((s) => ({
        id: s.id,
        title: s.title || s.name || "",
        price: s.price || 0,
      }));
    }

    // If offer.services is an array of objects containing id/title/price
    if (Array.isArray(offer.services) && offer.services.length && typeof offer.services[0] === "object") {
      return offer.services.map((s) => ({
        id: s.id,
        title: s.title || s.name || "",
        price: s.price || 0,
      }));
    }

    // If offer.services is an array of IDs, fetch them
    if (Array.isArray(offer.services) && offer.services.length && typeof offer.services[0] === "number") {
      try {
        const requests = offer.services.map((id) => axios.get(`${BASE_URL}/services/${id}/`));
        const responses = await Promise.all(requests);
        return responses.map((res) => ({
          id: res.data.id,
          title: res.data.title,
          price: res.data.price || 0,
        }));
      } catch (err) {
        console.log("Error fetching service details for offer:", err);
        return [];
      }
    }

    // Last resort: try to fetch offer details from API to see fields
    try {
      const res = await axios.get(`${BASE_URL}/offers/${offer.id}/`);
      const fetchedOffer = res.data;
      // try the above logic again
      if (Array.isArray(fetchedOffer.services_with_details) && fetchedOffer.services_with_details.length) {
        return fetchedOffer.services_with_details.map((s) => ({
          id: s.id,
          title: s.title || s.name || "",
          price: s.price || 0,
        }));
      }
      if (Array.isArray(fetchedOffer.services) && typeof fetchedOffer.services[0] === "object") {
        return fetchedOffer.services.map((s) => ({
          id: s.id,
          title: s.title || s.name || "",
          price: s.price || 0,
        }));
      }
      if (Array.isArray(fetchedOffer.services) && typeof fetchedOffer.services[0] === "number") {
        const requests = fetchedOffer.services.map((id) => axios.get(`${BASE_URL}/services/${id}/`));
        const responses = await Promise.all(requests);
        return responses.map((res) => ({
          id: res.data.id,
          title: res.data.title,
          price: res.data.price || 0,
        }));
      }
    } catch (err) {
      console.log("Error resolving services by re-fetching offer:", err);
    }

    return [];
  };

  // BOOK NOW handler: uses same shape as ViewPromotionDetails
  const handleBannerBookNow = async (promoObj) => {
    if (!userToken) {
      // Guest: show alert
      Alert.alert(
        "Login Required",
        "You need to log in to book this promotion.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Login",
            onPress: () => {
              navigation.navigate('AuthStack', { screen: "Login" });
            }
          },
        ]
      );

      return;
    }

    // Logged-in user: proceed
    handleBannerBookNow(promoObj);

    // promoObj should be the full promotion object (banner or featured promo)
    const promo = promoObj || banner;
    if (!promo) return;

    // Try to use promo.services_with_details first
    let preselectedServices = Array.isArray(promo.services_with_details)
      ? promo.services_with_details.map((s) => ({
        id: s.id,
        title: s.title,
        price: s.price || 0,
      }))
      : [];

    // If none, try resolve from promo.offer
    if (preselectedServices.length === 0 && promo.offer) {
      // If promo.offer is a full object that contains services, use it; else fetch
      let offer = promo.offer;
      if (typeof offer === "number" || typeof offer === "string") {
        // offer is an ID; fetch full offer
        try {
          const offerRes = await axios.get(`${BASE_URL}/offers/${offer}/`);
          offer = offerRes.data;
        } catch (err) {
          console.log("Error fetching offer:", err);
          Alert.alert("Error", "Failed to load offer details.");
          return;
        }
      }

      preselectedServices = await resolveServicesFromOffer(offer);
    }

    // Discount value (try promo.offer.discount_percentage if available)
    const discount =
      promo.offer?.discount_percentage ??
      (promo.offer && promo.offer.discount_percentage) ??
      0;

    // Navigate with the exact same param shape as ViewPromotionDetails
    navigation.navigate("BookingServiceScreen", {
      promo,
      preselectedServices,
      discount,
      source: "promotion",
    });
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Banner */}
        {banner && (
          <View style={styles.headerBox}>
            <Image source={{ uri: banner.image }} style={styles.headerImg} />
            <Text style={styles.headerText}>{banner.title}</Text>
            <Text style={styles.desc}>{banner.description}</Text>

            <TouchableOpacity
              style={styles.bookNow}
              onPress={() => handleBannerBookNow(banner)}
            >
              <Text style={styles.bookNowText}>
                {banner.button_text || "Book Now"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Featured Promotions</Text>

        {featured.map((promoItem) => {
          const image = promoItem.image || promoItem.offer?.image;
          const title = promoItem.title || promoItem.offer?.title;
          const description = promoItem.description || promoItem.offer?.description;
          const highlight = promoItem.highlight_text || "";

          const isSelected = selectedId === promoItem.id;

          return (
            <TouchableOpacity
              key={promoItem.id}
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => {
                setSelectedId(promoItem.id);
                // keep full object so Book Now can use services_with_details etc.
                setBanner(promoItem);
              }}
            >
              <Image source={{ uri: image }} style={styles.cardImg} />
              <View style={styles.cardContent}>
                {highlight !== "" && <Text style={styles.cardTag}>{highlight}</Text>}
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardSubtitle}>{description}</Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RewardsStack", {
                      screen: "ViewPromotionDetails",
                      params: { promo: promoItem },
                    })
                  }
                >
                  <Text style={styles.link}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  headerBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  headerImg: {
    width: width - 32,
    height: 180,
    borderRadius: 18,
    resizeMode: "cover",
    marginBottom: 18,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
  },
  desc: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
    textAlign: "center",
  },
  bookNow: {
    backgroundColor: "#1976D2",
    marginTop: 18,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    padding: 13,
  },
  bookNowText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    margin: 18,
    marginBottom: 6,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginVertical: 9,
    borderRadius: 14,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#1976D2",
  },
  cardImg: {
    width: 72,
    height: 72,
    margin: 14,
    borderRadius: 12,
  },
  cardContent: { justifyContent: "center", flex: 1, paddingRight: 14 },
  cardTag: { fontWeight: "bold", color: "#e67e22" },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#111" },
  cardSubtitle: { fontSize: 15, color: "#555", marginVertical: 4 },
  link: { color: "#1976D2", fontWeight: "600", marginTop: 3 },
});
