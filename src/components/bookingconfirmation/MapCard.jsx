import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MapCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Service Location</Text>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>[Map Placeholder]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  mapText: {
    color: "#888",
  },
});
