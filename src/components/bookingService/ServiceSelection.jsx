
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { MultiSelect } from "react-native-element-dropdown";

export default function ServiceSelection({ selectedServices = [], onSelectServices }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dropdown selected IDs
  const [selectedValues, setSelectedValues] = useState(
    selectedServices.map((s) => s.id)
  );

  // ⭐ FETCH ALL SERVICES
  useEffect(() => {
    axios
      .get("http://192.168.1.8:8000/api/services/?no_pagination=true")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        const formatted = data.map((item) => ({
          label: `${item.title} (₹${item.price})`,
          value: item.id,
          price: item.price,
          title: item.title,
        }));

        setServices(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  // ⭐ NEW — AUTO UPDATE DROPDOWN WHEN PARENT UPDATES SERVICES (OFFER AUTO-SELECT)
  useEffect(() => {
    setSelectedValues(selectedServices.map((s) => s.id));
  }, [selectedServices]);

  return (
    <View>
      <Text style={styles.sectionTitle}>Select Services</Text>

      {loading ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" />
          <Text>Loading services...</Text>
        </View>
      ) : (
        <MultiSelect
          style={styles.dropdown}
          data={services}
          labelField="label"
          valueField="value"
          placeholder="Choose services"
          value={selectedValues}
          onChange={(items) => {
            setSelectedValues(items);

            const selectedDetails = services
              .filter((s) => items.includes(s.value))
              .map((s) => ({
                id: s.value,
                title: s.title,
                price: s.price,
              }));

            onSelectServices(selectedDetails);
          }}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});
