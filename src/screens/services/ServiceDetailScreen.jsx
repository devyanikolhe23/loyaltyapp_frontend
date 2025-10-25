import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';

const { width } = Dimensions.get('window');

const ServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Header title="Service Details" />
      
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

     
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('BookingServiceScreen', { service })}
        >
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
  );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F8",
  },
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
