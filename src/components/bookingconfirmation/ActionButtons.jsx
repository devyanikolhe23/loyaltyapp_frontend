import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ActionButtons() {
  const navigation = useNavigation(); // ✅ Get navigation here

  return (
    <View style={styles.container}>

      {/* Go to Home */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")} // 👈 Check name
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>

      {/* View Bookings */}
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() =>
          navigation.navigate("Bookings", {
            screen: "MyBookings",
            params: { refresh: true },
          })
        }
      >
        <Text style={[styles.buttonText, styles.secondaryText]}>View Bookings</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  secondaryText: {
    color: "#007AFF",
  },
});
