// ReviewScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`;

const ReviewScreen = ({ navigation }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    if (!rating || !comment) {
      Alert.alert("Error", "Please fill both fields.");
      return;
    }

    const access = await AsyncStorage.getItem("access");
    const res = await fetch(`${BASE_URL}/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({ rating: parseInt(rating), comment }),
    });

    const data = await res.json();
    if (res.ok) {
      Alert.alert("Success", "Review submitted! You've earned 50 points 🎉", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert("Error", data.detail || "Failed to submit review");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave a Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Your feedback..."
        multiline
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.button} onPress={submitReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 15 },
  button: { backgroundColor: "#2563EB", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
