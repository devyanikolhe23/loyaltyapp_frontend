import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function InsurancePolicy() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Insurance Policy</Text>

      {/* Policy Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Policy Details</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Coverage Type</Text>
          <Text style={styles.value}>Comprehensive</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Effective Date</Text>
          <Text style={styles.value}>2023-01-15</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Expiration Date</Text>
          <Text style={styles.value}>2024-01-14</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Deductible</Text>
          <Text style={styles.value}>$500</Text>
        </View>
      </View>

      {/* Vehicle Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Information</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Make & Model</Text>
          <Text style={styles.value}>Toyota Camry, 2020</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Color</Text>
          <Text style={styles.value}>Blue</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>License Plate</Text>
          <Text style={styles.value}>XYZ123</Text>
        </View>
      </View>

      {/* Coverage Limits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coverage Limits</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Bodily Injury Liability</Text>
          <Text style={styles.value}>$100,000</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Property Damage Liability</Text>
          <Text style={styles.value}>$50,000</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Uninsured Motorist</Text>
          <Text style={styles.value}>$25,000</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.claimButton}>
          <Text style={styles.buttonText}>File a Claim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Provider</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White background
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 16,
  },
  section: {
    backgroundColor: "#f9f9f9", // Light card background
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    color: "#555",
    fontSize: 14,
  },
  value: {
    color: "#111",
    fontSize: 14,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  claimButton: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  contactButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  contactButtonText: {
    color: "#111",
    fontWeight: "600",
    fontSize: 14,
  },
});
