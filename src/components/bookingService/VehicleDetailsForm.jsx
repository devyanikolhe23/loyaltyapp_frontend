import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function VehicleDetailsForm({ defaultVehicle, onChangeVehicle }) {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    vehicleNumber: "",
  });

  // ✅ Prefill only once when component mounts
  useEffect(() => {
    if (defaultVehicle) {
      const newData = {
        make: defaultVehicle.make || "",
        model: defaultVehicle.model || "",
        year: defaultVehicle.year || "",
        vehicleNumber: defaultVehicle.vehicleNumber || defaultVehicle.vehicle_number || "",
      };

      // 🔥 Only update if data is actually different (prevents infinite loop)
      const isDifferent =
        newData.make !== form.make ||
        newData.model !== form.model ||
        newData.year !== form.year ||
        newData.vehicleNumber !== form.vehicleNumber;

      if (isDifferent) {
        setForm(newData);
        onChangeVehicle && onChangeVehicle(newData);
      }
    }
  }, [defaultVehicle]);


  // useEffect(() => {
  //   if (defaultVehicle) {
  //     setForm(defaultVehicle);
  //     onChangeVehicle(defaultVehicle);
  //   }
  // }, [defaultVehicle]);

  const handleChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    onChangeVehicle({
      ...updatedForm,
      vehicle_number: updatedForm.vehicleNumber,  // backend name
    });
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
        value={form.year ? String(form.year) : ""}
        onChangeText={(val) => handleChange("year", val)}
      />


      <TextInput
        style={styles.input}
        placeholder="Vehicle Number (e.g., MH09AB1234)"
        placeholderTextColor="#888"
        value={form.vehicleNumber}
        onChangeText={(val) => handleChange("vehicleNumber", val)}
      />
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
    color: "#000000ff",
  },
});
