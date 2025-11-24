import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const historyData = [
  {
    title: "Oil Change",
    date: "August 15, 2023",
    notes: "Standard synthetic oil change and filter replacement. Checked all fluid levels and tire pressure. Vehicle in good condition.",
    price: "$75"
  },
  {
    title: "Tire Rotation",
    date: "May 22, 2023",
    notes: "Rotated all four tires to ensure even wear. Inspected tread depth and found it to be adequate.",
    price: "$50"
  },
  {
    title: "Brake Inspection",
    date: "February 10, 2023",
    notes: "Inspected brake pads and rotors. Pad life at 70%. No immediate concerns.",
    price: "$30"
  },
  {
    title: "Battery Replacement",
    date: "November 3, 2022",
    notes: "Old battery failed testing. Replaced with new Duralast Gold battery. Cleaned terminals and connections.",
    price: "$150"
  },
];

const ServiceHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Service History</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        {historyData.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.notes}>
              <Text style={styles.bold}>Service Notes: </Text>{item.notes}
            </Text>
          </View>
        ))}
      </ScrollView>

    </View>
  );
};

export default ServiceHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  headerText: { fontSize: 20, fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 18, fontWeight: "600", color: "#1C1C1C" },
  price: { fontSize: 18, fontWeight: "600", color: "#007BFF" },
  date: { color: "#6B7280", marginVertical: 8 },
  notes: { color: "#1E1E1E", lineHeight: 20 },
  bold: { fontWeight: "600" },
});
