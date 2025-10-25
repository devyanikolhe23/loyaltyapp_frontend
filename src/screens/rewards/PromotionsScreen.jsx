import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const PROMOTIONS = [
  {
    id: 'main',
    tag: '',
    title: 'Exclusive Offer: 20% Off Your Next Service',
    subtitle: 'Book your next car service with us and enjoy a 20% discount on all services. This offer is valid for a limited time only, so don’t miss out!',
    img: require('../../assets/images/carbanner.jpg'), // Replace with main car image
    details: '',
  },
  {
    id: 'summer',
    tag: 'Limited Time',
    title: 'Summer Service Package',
    subtitle: 'Get your car ready for summer with our comprehensive service package.',
    img: require('../../assets/images/carbanner.jpg'), // Replace with your asset
    details: 'Includes summer checkup, fluid top-ups, tire & AC service.',
  },
  {
    id: 'first',
    tag: 'New Customers',
    title: 'First Service Discount',
    subtitle: 'Enjoy a special discount on your first service with us.',
    img: require('../../assets/images/carbanner.jpg'), // Replace with your asset
    details: 'Special discount on the initial service for all new customers.',
  },
];

export default function PromotionsPage() {
  const [originalPromo] = useState(PROMOTIONS[0]);
  const [selectedPromo, setSelectedPromo] = useState(originalPromo);

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.headerBox}>
          <Image source={selectedPromo.img} style={styles.headerImg} />
          <Text style={styles.headerText}>{selectedPromo.title}</Text>
          <Text style={styles.desc}>{selectedPromo.subtitle}</Text>
          <TouchableOpacity style={styles.bookNow}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        {selectedPromo.id !== originalPromo.id && (
          <TouchableOpacity onPress={() => setSelectedPromo(originalPromo)} style={styles.backBtn}>
            <Text style={styles.backText}>← Back to main offer</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>Featured Promotions</Text>
        {PROMOTIONS.slice(1).map(promo => (
          <TouchableOpacity
            key={promo.id}
            style={[
              styles.card,
              selectedPromo.id === promo.id && styles.selectedCard
            ]}
            onPress={() => setSelectedPromo(promo)}
          >
            <Image source={promo.img} style={styles.cardImg} />
            <View style={styles.cardContent}>
              <Text style={[
                styles.cardTag,
                promo.tag === 'Limited Time' ? styles.limitedTag : styles.newTag
              ]}>
                {promo.tag}
              </Text>
              <Text style={styles.cardTitle}>{promo.title}</Text>
              <Text style={styles.cardSubtitle}>{promo.subtitle}</Text>
              <Text style={styles.link}>View Details</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  headerBox: { backgroundColor: '#fff', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderColor: '#F0F0F0' },
  headerImg: { width: width - 32, height: 180, borderRadius: 18, resizeMode: 'cover', marginBottom: 18 },
  headerText: { fontSize: 26, fontWeight: 'bold', color: '#111', textAlign: 'center' },
  desc: { fontSize: 16, color: '#666', marginTop: 12, textAlign: 'center', marginHorizontal: 12 },
  bookNow: { backgroundColor: '#1976D2', marginTop: 18, borderRadius: 8, width: '60%', alignItems: 'center', alignSelf: 'center', padding: 13 },
  bookNowText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 21, fontWeight: 'bold', margin: 18, marginBottom: 6 },
  card: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 14, marginVertical: 9, borderRadius: 14, shadowColor: '#999', shadowOpacity: 0.08, shadowRadius: 7, elevation: 2 },
  selectedCard: { borderColor: '#1976D2', borderWidth: 2 },
  cardImg: { width: 72, height: 72, margin: 14, borderRadius: 12 },
  cardContent: { justifyContent: 'center', flex: 1, paddingRight: 14 },
  cardTag: { fontWeight: 'bold', marginBottom: 3 },
  limitedTag: { color: '#e67e22' },
  newTag: { color: '#43a047' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  cardSubtitle: { fontSize: 15, color: '#555', marginVertical: 4 },
  link: { color: '#1976D2', fontWeight: '600', marginTop: 3 },
  backBtn: { alignSelf: 'center', marginVertical: 8 },
  backText: { color: '#1976D2', fontWeight: 'bold', fontSize: 16 },
});
