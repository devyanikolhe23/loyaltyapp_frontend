import React from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const recallList = [
  {
    title: "Airbag Inflator",
    code: "NHTSA Recall No: 23V-456",
    desc: "The airbag inflator may rupture during deployment causing sharp fragments that may injure passengers.",
    tag: "URGENT",
    tagColor: "#B91C1C"
  },
  {
    title: "Brake System",
    code: "NHTSA Recall No: 23V-123",
    desc: "Brake master cylinder may leak fluid reducing braking performance.",
    tag: "IMPORTANT",
    tagColor: "#B45309"
  },
];

const VehicleRecallsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.section}>Active Recalls</Text>

        {recallList.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={[styles.tag, { backgroundColor: item.tagColor }]}>{item.tag}</Text>
            </View>
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <TouchableOpacity style={styles.serviceBtn}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Schedule Service</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

    </View>
  );
};

export default VehicleRecallsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    padding: 15, borderBottomWidth: 1, borderColor: "#333", backgroundColor: "#111827"
  },
  headerTitle: { fontSize: 20, color: "#fff", fontWeight: "600" },
  inputRow: { flexDirection: "row", padding: 16, alignItems: "center" },
  input: {
    flex: 1, backgroundColor: "#1F2937", height: 48, borderRadius: 10, paddingHorizontal: 15, color: "#fff"
  },
  checkBtn: {
    backgroundColor: "#0066FF", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, marginLeft: 10
  },
  section: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 10 },
  card: {
    backgroundColor: "#1F2937", padding: 16, borderRadius: 14, marginBottom: 16
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { color: "#fff", fontSize: 18, fontWeight: "600" },
  code: { color: "#9CA3AF", marginVertical: 6 },
  desc: { color: "#E5E7EB", marginBottom: 12, lineHeight: 20 },
  tag: { color: "#fff", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, fontWeight: "700" },
  serviceBtn: {
    backgroundColor: "#007BFF", height: 48, borderRadius: 10, justifyContent: "center", alignItems: "center"
  }
});