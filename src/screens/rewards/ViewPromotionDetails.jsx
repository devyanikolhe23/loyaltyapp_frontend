import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function ViewPromotionDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { promo } = route.params; // ✅ use the promo passed
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("access");
      setUserToken(token);
    };
    fetchToken();
  }, []);

  const image = promo.image || promo.offer?.image;
  const title = promo.title || promo.offer?.title;
  const description = promo.description || promo.offer?.description;
  const highlight = promo.highlight_text || "";
  const discount = promo.offer?.discount_percentage;
  const serviceNames = promo.offer?.service_names || [];

  const handleBookNow = () => {
    if (!userToken) {
      // Show login alert for guests
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
    const servicesWithDetails = promo.offer?.services_with_details || [];

    navigation.navigate("BookingServiceScreen", {
      promo,
      preselectedServices: servicesWithDetails.map(s => ({
        id: s.id,
        title: s.title,
        price: s.price
      })),
      discount: parseFloat(promo.offer?.discount_percentage) || 0,
      offerTitle: promo.offer?.title || promo.title,
      lockedServiceIds: servicesWithDetails.map(s => s.id),  // optional for locking
      lockSelected: true, // optional: to prevent removal
      source: "promotion",
    });

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {highlight !== "" && <Text style={styles.highlight}>{highlight}</Text>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {discount && <Text style={styles.discount}>Discount: {discount}%</Text>}
      {promo.offer?.valid_from && promo.offer?.valid_to && (
        <Text style={styles.validity}>
          Valid: {new Date(promo.offer.valid_from).toLocaleDateString()} -{" "}
          {new Date(promo.offer.valid_to).toLocaleDateString()}
        </Text>
      )}

      {serviceNames.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
            Services included:
          </Text>
          {serviceNames.map((service, index) => (
            <Text key={index} style={{ fontSize: 16, marginLeft: 8 }}>
              • {service}
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.bookNow} onPress={handleBookNow}>
        <Text style={styles.bookNowText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  image: { width: width - 32, height: 200, borderRadius: 16, marginBottom: 16 },
  highlight: { color: "#e67e22", fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  description: { fontSize: 16, color: "#555", marginBottom: 12 },
  discount: { fontSize: 16, fontWeight: "bold", color: "#1976D2", marginBottom: 12 },
  validity: { fontSize: 14, color: "#777", marginBottom: 20 },
  bookNow: { backgroundColor: "#1976D2", borderRadius: 8, alignItems: "center", padding: 15, marginTop: 20 },
  bookNowText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
