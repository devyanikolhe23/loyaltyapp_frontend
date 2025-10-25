import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const MembershipScreen = () => {
  const memberships = [
    {
      name: 'Silver',
      description: 'Unlock basic benefits and discounts.',
      price: '$9.99/month',
      image: require('./assets/silver_car.png'),
    },
    {
      name: 'Gold',
      description: 'Enjoy enhanced benefits and priority service.',
      price: '$19.99/month',
      image: require('./assets/gold_car.png'),
      popular: true,
    },
    {
      name: 'Platinum',
      description: 'Premium benefits and exclusive offers.',
      price: '$29.99/month',
      image: require('./assets/platinum_car.png'),
    },
    {
      name: 'Diamond',
      description: 'The ultimate membership with unparalleled benefits.',
      price: '$49.99/month',
      image: require('./assets/diamond_car.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Membership</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {memberships.map((membership, index) => (
          <View key={index} style={styles.card}>
            <Image source={membership.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{membership.name}</Text>
              <Text style={styles.description}>{membership.description}</Text>
              <Text style={styles.price}>{membership.price}</Text>
            </View>
            {membership.popular && <Text style={styles.popular}>POPULAR</Text>}
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  popular: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MembershipScreen;
