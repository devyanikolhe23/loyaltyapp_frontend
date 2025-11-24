import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header"; // Reuse your existing Header
import Ionicons from "react-native-vector-icons/Ionicons";

const coupons = [
  {
    id: 1,
    title: "15% OFF",
    subtitle: "Your Next Service",
    expiry: "12/31/2024",
    code: "SPRING15",
   image: require("../../assets/images/exterior_polishing.jpg"),
    gradientColor: "#007C91",
  },
  {
    id: 2,
    title: "$20 OFF",
    subtitle: "Oil Change",
    expiry: "11/15/2024",
    code: "OIL20",
    image: require("../../assets/images/exterior_polishing.jpg"),
    gradientColor: "#00695C",
  },
  {
    id: 3,
    title: "FREE",
    subtitle: "Tire Rotation",
    expiry: "10/01/2024",
    code: "FREETIRE",
   image: require("../../assets/images/exterior_polishing.jpg"),
    gradientColor: "#01579B",
  },
];

const MyCouponsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="My Coupons" showBack={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Available Coupons</Text>

        {coupons.map((item) => (
          <View key={item.id} style={styles.card}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={styles.imageBackground}
              imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </ImageBackground>

            <View style={styles.cardFooter}>
              <Text style={styles.expiry}>Expires on {item.expiry}</Text>
              <View style={styles.codeRow}>
                <Text style={styles.codeLabel}>Use code:</Text>
                <View style={styles.codeBox}>
                  <Text style={styles.codeText}>{item.code}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyCouponsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffffff" },
  scrollContainer: { padding: 16, paddingBottom: 80 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },

  // Coupon card
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
  },
  imageBackground: {
    height: 140,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },

  // Footer content
  cardFooter: {
    padding: 16,
  },
  expiry: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 8,
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  codeLabel: {
    color: "#ccc",
    fontSize: 13,
    marginRight: 8,
  },
  codeBox: {
    backgroundColor: "#2C2C2E",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  codeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 1,
  },
  applyButton: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  applyText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
