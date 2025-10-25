import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import Header from '../../components/Header';
export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Book Service Banner */}
        <View style={styles.banner}>
          <Image
            source={{ uri: 'https://www.linkpicture.com/q/sportscar.png' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Book Your Next Service</Text>
            <Text style={styles.bannerSubtitle}>
              Quick and easy booking for all your car needs.
            </Text>
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => navigation.navigate("Bookings")}
            >
              <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate("BookingServiceScreen")}
          >
            <Icon name="build-outline" size={24} color="#2B70F7" />
            <Text style={styles.quickActionText}>Book a Service</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard}>
            <Icon name="clipboard-outline" size={24} color="#2B70F7" />
            <Text style={styles.quickActionText}>Service Status</Text>
          </TouchableOpacity>
        </View>

        {/* Promotions */}
        <Text style={styles.sectionTitle}>Recent Promotions</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.promotions}
        >
          <View style={styles.promoCard}>
            <TouchableOpacity
            onPress={() => navigation.navigate("PromotionsScreen", { title: "Exclusive Offer: 20% Off" })}
            >
          <Image
            source={require('../../assets/images/carbanner.jpg')} 
            style={styles.promoImage}
          />
         </TouchableOpacity>
            <Text style={styles.promoTitle}>Exclusive Offer: 20% Off</Text>
            <Text style={styles.promoText}>On your next full service.</Text>
          </View>

          <View style={styles.promoCard}>
            <TouchableOpacity
            onPress={() => navigation.navigate("PromotionsScreen", { title: "Free Tire Check" })}
            >
          <Image
            source={require('../../assets/images/carbanner.jpg')} 
            style={styles.placeholderImage}
          />
         </TouchableOpacity>
            
            <Text style={styles.promoTitle}>Free Tire Check</Text>
            <Text style={styles.promoText}>Ensure your safety today.</Text>
          </View>
        </ScrollView>

        {/* Explore Section */}
        <Text style={styles.sectionTitle}>Explore</Text>
        <View style={styles.exploreGrid}>
          <TouchableOpacity style={styles.exploreCard}
          onPress={() => navigation.navigate("ServiceScreen")}>
            <Icon name="car-outline" size={24} color="#2B70F7" />
            <Text style={styles.exploreText}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exploreCard}
          onPress={() => navigation.navigate("Support")} >
            <Icon name="headset-outline" size={24} color="#2B70F7" />
            <Text style={styles.exploreText}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exploreCard}>
            <Icon name="pricetag-outline" size={24} color="#2B70F7" />
            <Text style={styles.exploreText}>Offers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exploreCard}
            onPress={() => navigation.navigate("Showroom")}  >
          
            <Icon name="location-outline" size={24} color="#2B70F7" />
            <Text style={styles.exploreText}
            >Find Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  
  banner: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  bannerImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    position: 'absolute',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    height: 160,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#fff',
    marginTop: 5,
  },
  bookNowButton: {
    backgroundColor: '#2B70F7',
    padding: 10,
    marginTop: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bookNowText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  quickActionCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickActionText: {
    marginTop: 8,
    fontWeight: '500',
  },
  promotions: {
    marginTop: 15,
    paddingLeft: 20,
  },
  promoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 220,
  },
  promoImage: {
    width: '100%',
    height: 110,
    borderRadius: 8,
  },
  placeholderImage: {
    height: 110,
    backgroundColor: '#ddd',
    borderRadius: 8,
    width: '100%',
  },
  promoTitle: {
    fontWeight: '600',
    marginTop: 10,
  },
  promoText: {
    color: '#555',
    marginTop: 4,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  exploreCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  exploreText: {
    marginTop: 8,
    fontWeight: '500',
  },
});
