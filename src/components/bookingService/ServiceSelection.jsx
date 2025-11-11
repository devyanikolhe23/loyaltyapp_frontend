import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

export default function ServiceSelection({ selectedService, onSelectService }) {
  const [services, setServices] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(selectedService?.id || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios
    .get("http://192.168.1.15:8000/services/")
    .then(res => {
      console.log("Fetched services response:", res.data);
      setServices(res.data.results); // ✅ Access array inside results
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching services:", err);
      setLoading(false);
    });
}, []);


  useEffect(() => {
    // ✅ When editing, auto-select existing service
    if (selectedService?.id) {
      setCurrentSelected(selectedService.id);
    }
  }, [selectedService]);

  const handleSelect = (service) => {
    setCurrentSelected(service.id);
    onSelectService({
      id: service.id,
      title: service.title,
      price: service.price,
    });
  };

  if (loading) {
    return (
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading services...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>Select Service</Text>

      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[
            styles.serviceOption,
            currentSelected === service.id && styles.selectedService,
          ]}
          onPress={() => handleSelect(service)}
        >
          <Text style={styles.serviceText}>{service.title}</Text>
          <Text style={styles.servicePrice}>₹{service.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  serviceOption: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedService: { borderColor: "#007AFF", backgroundColor: "#E6F0FF" },
  serviceText: { fontSize: 16, fontWeight: "500" },
  servicePrice: { fontSize: 16, fontWeight: "700" },
});
