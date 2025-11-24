import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Header from "../../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Mailer from "react-native-mail";

const EmailUsScreen = () => {
  const handleEmail = () => {
    Mailer.mail(
      {
        subject: "Need Assistance",
        recipients: ["support@loyaltyapp.com"],
        body: "Hello Support Team,",
        isHTML: false,
      },
      (error, event) => {
        if (error) {
          Alert.alert(
            "Error",
            "Could not open the email app. Please make sure Gmail is installed."
          );
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Email Us" showBack={true} />
      <View style={styles.content}>
        <Text style={styles.title}>We’re happy to assist you!</Text>
        <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
          <Ionicons name="mail-outline" size={20} color="#fff" />
          <Text style={styles.emailText}> Send Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "700", color: "#000", marginBottom: 20, textAlign: "center" },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066FF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  emailText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
