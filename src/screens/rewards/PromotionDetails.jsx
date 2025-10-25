import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function PromotionDetailsScreen({ route }) {
  const { promo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: promo.image }} style={styles.bannerImage} />
      <Text style={styles.title}>{promo.title}</Text>
      <Text style={styles.desc}>{promo.desc}</Text>

      <TouchableOpacity style={styles.bookBtn}>
        <Text style={styles.bookBtnText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  bannerImage: { width: '100%', height: 220 },
  title: { fontSize: 22, fontWeight: 'bold', margin: 16 },
  desc: { fontSize: 16, color: '#555', marginHorizontal: 16, marginBottom: 20 },
  bookBtn: { backgroundColor: '#1976D2', margin: 18, borderRadius: 10, padding: 16, alignItems: 'center' },
  bookBtnText: { color: '#fff', fontSize: 18 }
});
