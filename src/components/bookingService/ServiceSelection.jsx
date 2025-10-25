import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ServiceSelection() {
  const [selectedService, setSelectedService] = useState("Oil Change");

  const services = [
    { name: "Oil Change", price: "$79" },
    { name: "Tire Rotation", price: "$49" },
    { name: "Brake Inspection", price: "$59" },
    { name: "Full Service", price: "$199" },
  ];

  return (
    <View>
      <Text style={styles.sectionTitle}>Select Service</Text>
      {services.map((service) => (
        <TouchableOpacity
          key={service.name}
          style={[
            styles.serviceOption,
            selectedService === service.name && styles.selectedService,
          ]}
          onPress={() => setSelectedService(service.name)}
        >
          <Text style={styles.serviceText}>{service.name}</Text>
          <Text style={styles.servicePrice}>Starting at {service.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 10 },
  serviceOption: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  selectedService: { backgroundColor: "#D8E6FF" },
  serviceText: { fontSize: 16 },
  servicePrice: { fontSize: 14, color: "#888" },
});
