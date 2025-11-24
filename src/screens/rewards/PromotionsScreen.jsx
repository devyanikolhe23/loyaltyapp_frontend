import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const BASE_URL = "http://192.168.1.8:8000/api";
const { width } = Dimensions.get("window");

export default function PromotionsPage() {
  const navigation = useNavigation();
  const [banner, setBanner] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      const token = await AsyncStorage.getItem("access");

      const bannerRes = await axios.get(`${BASE_URL}/promotion-banners/`);
      const featuredRes = await axios.get(
        `${BASE_URL}/featured-promotions/`,
        token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {}
      );

      setBanner(bannerRes.data.results?.[0] || null);

      const f = featuredRes.data;
      if (Array.isArray(f)) setFeatured(f);
      else if (Array.isArray(f.results)) setFeatured(f.results);
      else setFeatured([]);
    } catch (error) {
      console.log("Error loading promotions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text style={{ textAlign: "center", marginTop: 40 }}>Loading...</Text>;

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
              onPress={() =>
                navigation.navigate("BookingServiceScreen")
              }
            >
              <Text style={styles.bookNowText}>{banner.button_text || "Book Now"}</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Featured Promotions</Text>

        {featured.map((promo) => {
          const image = promo.image || promo.offer?.image;
          const title = promo.title || promo.offer?.title;
          const description = promo.description || promo.offer?.description;
          const highlight = promo.highlight_text || "";

          const isSelected = selectedId === promo.id;

          return (
            <TouchableOpacity
              key={promo.id}
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => {
                setSelectedId(promo.id);
                setBanner({ image, title, description, button_text: "Book Now" });
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
                      params: { promo },
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
    borderColor: "#F0F0F0"
  },
  headerImg: {
    width: width - 32,
    height: 180,
    borderRadius: 18,
    resizeMode: "cover",
    marginBottom: 18
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center"
  },
  desc: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
    textAlign: "center"
  },
  bookNow: {
    backgroundColor: "#1976D2",
    marginTop: 18,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    padding: 13
  },
  bookNowText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    margin: 18,
    marginBottom: 6
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginVertical: 9,
    borderRadius: 14,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent"
  },
  selectedCard: {
    borderColor: "#1976D2",
  },
  cardImg: {
    width: 72,
    height: 72,
    margin: 14,
    borderRadius: 12
  },
  cardContent: { justifyContent: "center", flex: 1, paddingRight: 14 },
  cardTag: { fontWeight: "bold", color: "#e67e22" },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#111" },
  cardSubtitle: { fontSize: 15, color: "#555", marginVertical: 4 },
  link: { color: "#1976D2", fontWeight: "600", marginTop: 3 }
});
