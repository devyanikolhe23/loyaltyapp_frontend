import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function VehicleDetailsForm() {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    license: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Vehicle Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Vehicle Make (e.g., Honda)"
        placeholderTextColor="#888"
        value={form.make}
        onChangeText={(val) => handleChange("make", val)}
      />

      <TextInput
        style={styles.input}
        placeholder="Vehicle Model (e.g., Civic)"
        placeholderTextColor="#888"
        value={form.model}
        onChangeText={(val) => handleChange("model", val)}
      />

      <TextInput
        style={styles.input}
        placeholder="Year (e.g., 2021)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={form.year}
        onChangeText={(val) => handleChange("year", val)}
      />

      {/* <TextInput
        style={styles.input}
        placeholder="License Plate"
        value={form.license}
        onChangeText={(val) => handleChange("license", val)}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
   
  },
});
