import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
// import { API_BASE } from '@env';
// const BASE_URL = `${API_BASE}`;

const { width } = Dimensions.get('window');

const ServiceDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { service } = route.params;

  const handleBookService = async () => {
    const guest = await AsyncStorage.getItem("guest");
    const user = await AsyncStorage.getItem("user");

    if (guest === "true" && !user) {
      Alert.alert(
        "Login Required",
        "Please login first to book an appointment.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Login", onPress: () => navigation.navigate("LoginScreen") }
        ]
      );
      return;
    }

    navigation.navigate("BookingServiceScreen", { service });
  };

  return (
    <View style={styles.container}>
      {/* ✅ Custom Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: service.image }} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent']}
            style={styles.imageOverlay}
          />
          {service.is_popular && (
            <View style={styles.popularTag}>
              <Icon name="flame-outline" size={16} color="#fff" />
              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.title}>{service.title}</Text>
          <View style={styles.priceRow}>
            <Icon name="cash-outline" size={20} color="#007AFF" />
            <Text style={styles.price}> ₹{service.price}</Text>
          </View>
          <Text style={styles.description}>{service.description}</Text>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.bookButton} onPress={handleBookService}>
            <LinearGradient
              colors={['#007AFF', '#0056D2']}
              style={styles.gradientButton}
            >
              <Icon name="calendar-outline" size={20} color="#fff" />
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F8",
  },

  // ✅ Back Header (copied style from Terms & Conditions)
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  headerSpacer: { width: 24 },

  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: width,
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  popularTag: {
    position: 'absolute',
    top: 30,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  popularText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    marginBottom: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 12,
  },
  bookButton: {
    marginTop: 10,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: '#007AFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
