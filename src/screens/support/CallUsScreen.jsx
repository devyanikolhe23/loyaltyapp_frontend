import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import Header from "../../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";

const CallUsScreen = ({ navigation }) => {
  const phoneNumber = "9876543210"; // 👈 replace with your support number

  const handleCallNow = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => {
      console.error("Error opening dialer:", err);
      Alert.alert("Error", "Unable to open dialer.");
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Call Support" showBack={true} />
      
      <View style={styles.content}>
        <Text style={styles.title}>We're here to help you.</Text>
        <Text style={styles.subtitle}>Speak with an agent right away.</Text>

        <TouchableOpacity style={styles.callButton} onPress={handleCallNow}>
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.callText}> Call Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CallUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: "#000", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#777", marginBottom: 24, textAlign: "center" },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066FF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  callText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
