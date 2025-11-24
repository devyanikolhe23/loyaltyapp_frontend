import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PromotionDetailsScreen({ route, navigation }) {
  const { promo } = route.params;

  const handleBook = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      Alert.alert(
        "Login Required",
        "Please login first to continue booking.",
        [{ text: "Login", onPress: () => navigation.navigate("Login") }]
      );
      return;
    }


    navigation.navigate('ServiceStack', {
      screen: 'BookingServiceScreen',
      params: { promo }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: promo.image }} style={styles.bannerImage} />
      <Text style={styles.title}>{promo.title}</Text>
      <Text style={styles.desc}>{promo.description}</Text>

      <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
        <Text style={styles.bookBtnText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
