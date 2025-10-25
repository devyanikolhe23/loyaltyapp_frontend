// src/components/showroom/ShowroomCard.jsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ShowroomCard = ({ showroom }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // Navigate to showroom details if needed
        // navigation.navigate("ShowroomDetail", { showroomId: showroom.id });
      }}
    >
      <Image source={showroom.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{showroom.name}</Text>
        <Text style={styles.address}>{showroom.address}</Text>
        <View style={styles.iconRow}>
          <Ionicons name="location-outline" size={16} color="#555" />
          <Text style={styles.distance}>Nearby</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShowroomCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
  },
});
